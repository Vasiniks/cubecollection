#!/usr/bin/env node
// The honest measures. Rules 32-36 of docs/data-architecture.md section 7.5.
// Reports only; never blocks. Its job is to make weakness visible rather than to hide it.

import {
  loadVocabularies, loadSchemas, loadRecords, indexRecords,
  collectAnnotated, schemaForEntity, isAtLeastSourced, colorwayCompleteness, sourceTier,
} from './lib/archive.mjs';

const vocabs = loadVocabularies();
const { raw } = loadSchemas(vocabs);
const records = loadRecords();
const { byId, byEntity } = indexRecords(records);

const pad = (s, n) => String(s).padEnd(n);
const num = (s, n) => String(s).padStart(n);
const rule = (n = 78) => console.log('─'.repeat(n));
const heading = (t) => { console.log(`\n${t}`); rule(Math.max(t.length, 40)); };

console.log('\ncoverage — the honest measure of how complete this archive actually is');
rule();

const counts = {};
for (const [entity, list] of byEntity) counts[entity] = list.length;
const total = records.length;
if (total === 0) {
  console.log('\n  No records yet. The archive is empty by design: Phase A has built the');
  console.log('  structure, and no cube data has been collected.\n');
}

heading('Records by entity and status');
const statuses = ['stub', 'drafted', 'sourced', 'reviewed', 'published', 'disputed', 'deprecated'];
console.log(`  ${pad('entity', 18)}${statuses.map((s) => num(s.slice(0, 5), 9)).join('')}${num('total', 9)}`);
for (const entity of Object.keys(counts).sort()) {
  const list = byEntity.get(entity);
  const row = statuses.map((s) => num(list.filter((r) => r.doc?.status === s).length, 9)).join('');
  console.log(`  ${pad(entity, 18)}${row}${num(list.length, 9)}`);
}
if (!Object.keys(counts).length) console.log('  (none)');

// 32 — critical-field coverage, and the unknown/absent split that makes it honest
heading('Critical-field coverage (rule 32)');
const perManufacturer = new Map();
const bucket = (m) => {
  if (!perManufacturer.has(m)) {
    perManufacturer.set(m, { records: 0, critical: 0, attested: 0, unknown: 0, absent: 0, conf: {}, scope: {}, render: {} });
  }
  return perManufacturer.get(m);
};
const manufacturerFor = (rec) => {
  if (rec.entity === 'model') return rec.doc.manufacturer_id ?? '(unassigned)';
  if (rec.entity === 'variant') return byId.get(rec.doc.model_id)?.doc?.manufacturer_id ?? '(unassigned)';
  return null;
};

for (const rec of records) {
  const m = manufacturerFor(rec);
  if (!m || !rec.doc) continue;
  const b = bucket(m);
  b.records += 1;
  b.scope[rec.doc.scope_class ?? 'unset'] = (b.scope[rec.doc.scope_class ?? 'unset'] ?? 0) + 1;
  if (rec.entity === 'variant') {
    const c = colorwayCompleteness(rec.doc.colorway);
    b.render[c] = (b.render[c] ?? 0) + 1;
  }
  const schema = schemaForEntity(rec.entity, raw);
  for (const ptr of collectAnnotated(schema, rec.doc, raw, 'x-critical')) {
    b.critical += 1;
    const att = rec.doc.attestations?.[ptr];
    if (!att) b.absent += 1;
    else if (att.confidence === 'unknown') b.unknown += 1;
    else b.attested += 1;
  }
  for (const att of Object.values(rec.doc.attestations ?? {})) {
    b.conf[att.confidence] = (b.conf[att.confidence] ?? 0) + 1;
  }
}

if (!perManufacturer.size) console.log('  (no model or variant records)');
else {
  console.log(`  ${pad('manufacturer', 20)}${num('recs', 7)}${num('crit', 7)}${num('attest', 8)}${num('unknown', 9)}${num('absent', 8)}  absent%`);
  for (const [m, b] of [...perManufacturer].sort()) {
    const pct = b.critical ? ((b.absent / b.critical) * 100).toFixed(1) : '0.0';
    console.log(`  ${pad(m, 20)}${num(b.records, 7)}${num(b.critical, 7)}${num(b.attested, 8)}${num(b.unknown, 9)}${num(b.absent, 8)}${num(pct + '%', 9)}`);
  }
  console.log('\n  "unknown" means someone looked and found nothing. "absent" means nobody has');
  console.log('  looked yet. The gap between them is the work remaining.');
}

// 33 — where a manufacturer's facts actually come from
heading('Confidence distribution (rule 33)');
if (!perManufacturer.size) console.log('  (no attestations)');
for (const [m, b] of [...perManufacturer].sort()) {
  const parts = Object.entries(b.conf).sort().map(([k, v]) => `${k} ${v}`);
  console.log(`  ${pad(m, 20)}${parts.join('  ') || '(none)'}`);
}

// 34 — how much of the evidence would survive the pages disappearing
heading('Preservation mix (rule 34)');
const sources = byEntity.get('source') ?? [];
if (!sources.length) console.log('  (no sources)');
else {
  const mix = {};
  const tiers = {};
  for (const s of sources) {
    mix[s.doc.preservation_method ?? 'unset'] = (mix[s.doc.preservation_method ?? 'unset'] ?? 0) + 1;
    const t = sourceTier(s.doc, vocabs);
    tiers[t] = (tiers[t] ?? 0) + 1;
  }
  for (const [k, v] of Object.entries(mix).sort()) {
    console.log(`  ${pad(k, 20)}${num(v, 6)}${num(((v / sources.length) * 100).toFixed(1) + '%', 9)}`);
  }
  console.log(`\n  by tier: ${Object.entries(tiers).sort().map(([t, c]) => `T${t} ${c}`).join('  ')}`);
  if ((mix.excerpt ?? 0) / sources.length > 0.4) {
    console.log('\n  Note: more than 40% of sources rest on excerpts alone. Excerpts are');
    console.log('  acceptable, not preferred — archive what can still be archived.');
  }
}

// 35 — conditional admissions must not quietly become the archive
heading('Scope mix (rule 35)');
if (!perManufacturer.size) console.log('  (no records)');
for (const [m, b] of [...perManufacturer].sort()) {
  const parts = Object.entries(b.scope).sort().map(([k, v]) => `${k} ${v}`);
  const cond = b.scope.conditional ?? 0;
  const flag = b.records && cond / b.records > 0.25 ? '   <- conditional records exceed a quarter of this brand' : '';
  console.log(`  ${pad(m, 20)}${parts.join('  ')}${flag}`);
}

// 36 — what the exhibition could actually draw
heading('Render readiness (rule 36)');
const allRender = {};
for (const b of perManufacturer.values()) {
  for (const [k, v] of Object.entries(b.render)) allRender[k] = (allRender[k] ?? 0) + v;
}
const variantCount = (byEntity.get('variant') ?? []).length;
if (!variantCount) console.log('  (no variants)');
else {
  for (const k of ['render_ready', 'face_complete', 'partial', 'none']) {
    const v = allRender[k] ?? 0;
    console.log(`  ${pad(k, 20)}${num(v, 6)}${num(((v / variantCount) * 100).toFixed(1) + '%', 9)}`);
  }
  console.log('\n  Nothing renders in this phase. This counts what a renderer would have to work');
  console.log('  with if one existed.');
}

console.log('');
process.exit(0);
