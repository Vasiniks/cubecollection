#!/usr/bin/env node
// The duplicate queue. Rules 28-30 of docs/data-architecture.md section 7.4.
// Nothing is ever auto-merged: an automatic merge would destroy exactly the distinctions
// the variant rules exist to preserve. This reports; a human resolves.

import { loadVocabularies, loadSchemas, loadRecords, indexRecords, fingerprint, Report } from './lib/archive.mjs';

const report = new Report('duplicates — identity collisions for human review (rules 28-30)');
const vocabs = loadVocabularies();
loadSchemas(vocabs);
const records = loadRecords();
const { byId, byEntity } = indexRecords(records);

const variants = byEntity.get('variant') ?? [];
report.note(`${variants.length} variant(s) fingerprinted.`);

const manufacturerOf = (variantDoc) => {
  const model = byId.get(variantDoc.model_id)?.doc;
  return model?.manufacturer_id ?? '';
};

// 28 — fingerprint collisions
const byFingerprint = new Map();
for (const rec of variants) {
  const fp = fingerprint(rec.doc, manufacturerOf(rec.doc));
  if (!byFingerprint.has(fp)) byFingerprint.set(fp, []);
  byFingerprint.get(fp).push(rec);
}
for (const [fp, list] of byFingerprint) {
  if (list.length < 2) continue;
  const resolved = list.every((r) => (r.doc.relationships ?? []).some((x) => ['duplicate_of', 'merged_into'].includes(x.type)));
  const msg = `${list.length} variants share fingerprint ${fp.slice(0, 15)}…: ${list.map((r) => r.doc.id).join(', ')}. Distinguish them, or resolve with duplicate_of then merged_into.`;
  if (resolved) report.note(`  (queued, already flagged) ${msg}`);
  else report.warn('28', list[0].file, msg);
}

// A family and its own only model legitimately answer to the same product name: a
// single-model family IS that product. Flagging those as possible duplicates puts six
// permanent false positives in a human-review queue, and a queue that is always red stops
// being read — the same failure the self-test's stale assertion caused.
const PARENT_FIELD = {
  manufacturer: 'parent_id', family: 'manufacturer_id',
  model: 'family_id', variant: 'model_id', specimen: 'variant_id',
};
function ancestry(rec) {
  const chain = [];
  let cur = rec;
  const guard = new Set();
  while (cur?.doc?.id && !guard.has(cur.doc.id)) {
    guard.add(cur.doc.id);
    chain.push(cur.doc.id);
    const field = PARENT_FIELD[cur.entity];
    cur = field && cur.doc[field] ? byId.get(cur.doc[field]) : null;
  }
  return chain;
}
/** True when every record in the group sits on one containment chain. */
function sameLineage(recs) {
  const chains = recs.map((r) => ancestry(r));
  return recs.every((r, i) => recs.every((other, j) =>
    i === j || chains[i].includes(other.doc.id) || chains[j].includes(r.doc.id)));
}

// 29 — a name in one record's aliases matching another record's identity
const nameIndex = new Map();
const addName = (name, rec, kind) => {
  const key = String(name).trim().toLowerCase();
  if (!key) return;
  if (!nameIndex.has(key)) nameIndex.set(key, []);
  nameIndex.get(key).push({ rec, kind });
};
for (const rec of records) {
  if (!rec.doc?.id) continue;
  if (rec.doc.name) addName(rec.doc.name, rec, 'name');
  for (const a of rec.doc.aliases ?? []) addName(typeof a === 'string' ? a : a.name, rec, 'alias');
}
let lineageShared = 0;
for (const [name, hits] of nameIndex) {
  const uniq = [...new Map(hits.map((h) => [h.rec.doc.id, h.rec])).values()];
  if (uniq.length < 2) continue;
  const ids = uniq.map((r) => r.doc.id);
  if (sameLineage(uniq)) {
    lineageShared += 1;
    continue;
  }
  report.warn('29', uniq[0].file, `"${name}" identifies more than one record: ${ids.join(', ')}. Retailers name the same product differently; check this is two products, not one.`);
}
if (lineageShared) {
  report.note(`${lineageShared} name(s) shared within a single containment chain — a one-model family answering to its own model's name. Not flagged.`);
}

// 30 — the same bytes filed under two variants
const byChecksum = new Map();
for (const rec of variants) {
  for (const m of rec.doc.media ?? []) {
    if (!m.checksum) continue;
    if (!byChecksum.has(m.checksum)) byChecksum.set(m.checksum, []);
    byChecksum.get(m.checksum).push({ rec, media: m });
  }
}
for (const [sum, hits] of byChecksum) {
  const ids = new Set(hits.map((h) => h.rec.doc.id));
  if (ids.size < 2) continue;
  report.warn('30', hits[0].rec.file, `media checksum ${sum.slice(0, 20)}… appears under ${[...ids].join(', ')}. Often legitimate (shared packaging), so confirm rather than assume.`);
}

report.print();
process.exit(0);
