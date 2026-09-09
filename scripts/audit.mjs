#!/usr/bin/env node
// Archive-wide audit — the sweeps that validate.mjs and lint-semantic.mjs cannot express.
//
// validate and lint work record-by-record: they answer "is this record well-formed and
// plausible?". This answers questions that only exist ACROSS records — how much of the archive
// is assessed, which sources nothing cites, whether the coverage metric is interpretable.
// Nothing here blocks. It exists so these checks stop depending on someone remembering to
// write a throwaway script, which is how the tier/confidence defect survived until 2026-09-09.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadVocabularies, loadSchemas, loadRecords, indexRecords, sourceTier } from './lib/archive.mjs';

const vocabs = loadVocabularies();
loadSchemas(vocabs);
const records = loadRecords();
const { byEntity } = indexRecords(records);

const of = (e) => (byEntity.get(e) ?? []).filter((r) => r.doc?.id);
const fam = of('family'), mod = of('model'), va = of('variant'), mf = of('manufacturer'), src = of('source');
const tierOf = (id) => {
  const s = src.find((x) => x.doc.id === id);
  return s ? sourceTier(s.doc, vocabs) : null;
};

const line = (s = '') => console.log(s);
const head = (s) => { line(); line(s); line('─'.repeat(s.length)); };

line(`archive audit — ${mf.length} manufacturers · ${fam.length} families · ${mod.length} models · ${va.length} variants · ${src.length} sources`);

// ---- 1. variant coverage, the P4-3 metric ------------------------------------------------
head('Variant coverage (P4-3 semantics)');
const byModel = new Map();
for (const v of va) {
  if (!byModel.has(v.doc.model_id)) byModel.set(v.doc.model_id, []);
  byModel.get(v.doc.model_id).push(v.doc);
}
let zero = 0, bare = 0, evidenced = 0, multi = 0;
const unassessed = [];
for (const m of mod) {
  const vs = byModel.get(m.doc.id);
  if (!vs) { zero++; unassessed.push(m.doc.id); continue; }
  if (vs.length > 1) { multi++; continue; }
  const v = vs[0];
  const detail = v.edition?.name || v.edition?.designation
    || Object.keys(v.config ?? {}).length || Object.keys(v.colorway ?? {}).length;
  detail ? evidenced++ : bare++;
}
line(`  not yet assessed (zero variants) : ${zero}`);
line(`  assessed, one configuration      : ${bare}`);
line(`  assessed, with config detail     : ${evidenced}`);
line(`  multiple configurations          : ${multi}`);
line(`  => ${mod.length - zero} of ${mod.length} models assessed`);
if (unassessed.length) {
  const byMfr = {};
  for (const id of unassessed) {
    const k = mod.find((m) => m.doc.id === id)?.doc.manufacturer_id ?? '?';
    byMfr[k] = (byMfr[k] ?? 0) + 1;
  }
  line(`  remaining by manufacturer: ${Object.entries(byMfr).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(' · ')}`);
}

// ---- 2. sources nothing cites -------------------------------------------------------------
head('Source usage');
const cited = new Set();
const scan = (o) => {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) return o.forEach(scan);
  for (const [k, v] of Object.entries(o)) {
    if (k === 'sources' && Array.isArray(v)) v.forEach((s) => cited.add(s));
    else if (k === 'source' && typeof v === 'string') cited.add(v);
    else scan(v);
  }
};
[...fam, ...mod, ...va, ...mf].forEach((r) => scan(r.doc));
const orphans = src.filter((s) => !cited.has(s.doc.id));

// An uncited source is not automatically a defect: the archive deliberately preserves evidence
// for findings it REJECTED (the HaiTun ZhanLang sources are exactly that) and for escalations
// no record can yet carry. What matters is whether the evidence is FINDABLE — so split the
// orphans by whether anything at all documents them. Prose includes .md and .yml under
// research/, which is where the ledger lives; an earlier version of this check scanned only .md
// and wrongly reported three escalation sources as unreferenced.
let prose = '';
(function walk(dir) {
  let entries = [];
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(md|yml)$/.test(e.name)) prose += readFileSync(p, 'utf8');
  }
})('research');
for (const s of src) prose += JSON.stringify(s.doc);   // a source may cite a sibling in its note

const documented = [], unreferenced = [];
for (const s of orphans) {
  const hits = prose.split(s.doc.id).length - 1;
  (hits > 1 ? documented : unreferenced).push(s);
}
line(`  cited by a canonical record : ${cited.size}`);
line(`  cited by nothing            : ${orphans.length}`);
line(`     of those, documented in a report, the ledger, or another source's note : ${documented.length}`);
line(`     of those, referenced NOWHERE at all                                    : ${unreferenced.length}`);
line('  (the first group is preserved evidence and correct — evidence for a REJECTED finding has');
line('   nowhere else to live. The second group is the one to read: a source no record and no');
line('   document mentions is either redundant or an escalation whose evidence became unfindable.)');
unreferenced.forEach((s) => line(`     ${s.doc.id}   (${s.doc.kind})`));

// ---- 3. provenance completeness ----------------------------------------------------------
head('Source provenance');
const missingPres = src.filter((s) => !s.doc.preservation_method);
const missingAcc = src.filter((s) => !s.doc.accessed);
const deadNoArchive = src.filter((s) => s.doc.link_status === 'dead' && !s.doc.archive_url);
const unchecked = src.filter((s) => !s.doc.link_status || s.doc.link_status === 'unchecked');
line(`  missing preservation_method     : ${missingPres.length}`);
line(`  missing accessed date           : ${missingAcc.length}`);
line(`  dead link with no archive_url   : ${deadNoArchive.length}   <- these lose the evidence`);
line(`  link_status never checked       : ${unchecked.length} of ${src.length}`);
deadNoArchive.slice(0, 8).forEach((s) => line(`     ${s.doc.id}`));

// ---- 4. confidence resting on tier -------------------------------------------------------
head('Confidence vs source tier');
const dist = {};
for (const r of [...fam, ...mod, ...va, ...mf]) {
  for (const att of Object.values(r.doc.attestations ?? {})) {
    if (att?.confidence) dist[att.confidence] = (dist[att.confidence] ?? 0) + 1;
  }
}
line(`  ${Object.entries(dist).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(' · ')}`);
line('  (rule 43 blocks a confidence its tier cannot support; this is the shape of the archive)');

// ---- 5. duplicate source locators --------------------------------------------------------
head('Duplicate source locators');
const byLoc = new Map();
for (const s of src) {
  const loc = s.doc.archive_url || s.doc.url;
  if (!loc) continue;
  if (!byLoc.has(loc)) byLoc.set(loc, []);
  byLoc.get(loc).push(s.doc.id);
}
const dups = [...byLoc.values()].filter((v) => v.length > 1);
line(`  pages recorded under more than one id : ${dups.length}   (rule 42 warns on each)`);
dups.slice(0, 8).forEach((v) => line(`     ${v.join(' + ')}`));

line();
line('audit complete — advisory only, nothing here blocks a build.');
