#!/usr/bin/env node
// Semantic plausibility. Rules 18-27 of docs/data-architecture.md section 7.3.
// These are warnings by design: each one is usually wrong, occasionally right, and always
// worth a human look. Nothing here blocks a build.

import {
  loadVocabularies, loadSchemas, loadRecords, indexRecords, resolveSpec, dateStart, Report,
} from './lib/archive.mjs';

const report = new Report('lint — semantic plausibility (rules 18-27, advisory)');
const vocabs = loadVocabularies();
loadSchemas(vocabs);
const records = loadRecords();
const { byId, byEntity } = indexRecords(records);

const variants = byEntity.get('variant') ?? [];
const models = byEntity.get('model') ?? [];
report.note(`${models.length} model(s), ${variants.length} variant(s).`);

const SIZE_MIN = 50, SIZE_MAX = 60;
const WEIGHT_MIN = 50, WEIGHT_MAX = 130;
const EARLIEST_RELEASE = '2014-01-01';
const today = new Date().toISOString().slice(0, 10);

const cmpDate = (a, b) => {
  const x = dateStart(a), y = dateStart(b);
  if (!x || !y) return null;
  return x < y ? -1 : x > y ? 1 : 0;
};

for (const rec of variants) {
  const doc = rec.doc;
  const model = byId.get(doc.model_id)?.doc;

  // 18 — physical plausibility, against the resolved value
  for (const [field, min, max, unit] of [['size_mm', SIZE_MIN, SIZE_MAX, 'mm'], ['weight_g', WEIGHT_MIN, WEIGHT_MAX, 'g']]) {
    const { value } = resolveSpec(doc, model, field);
    if (typeof value === 'number' && (value < min || value > max)) {
      report.warn('18', rec.file, `${field} is ${value}${unit}, outside the plausible ${min}-${max}${unit} range for a 3x3.`);
    }
  }

  // 19 — release dates inside the archive's world
  for (const [i, rel] of (doc.releases ?? []).entries()) {
    const start = dateStart(rel.date);
    if (!start) continue;
    if (start < EARLIEST_RELEASE) report.warn('19', rec.file, `releases/${i} is dated ${start}, before ${EARLIEST_RELEASE}.`);
    if (start > today) report.warn('19', rec.file, `releases/${i} is dated ${start}, in the future.`);
  }

  // 21 — a product cannot be withdrawn before it exists
  const firstRelease = (doc.releases ?? []).map((r) => dateStart(r.date)).filter(Boolean).sort()[0];
  const disc = dateStart(doc.availability?.discontinued);
  if (firstRelease && disc && disc < firstRelease) {
    report.warn('21', rec.file, `discontinued ${disc} precedes first release ${firstRelease}.`);
  }

  // 22 — magnetic levitation replaces springs; a plain screw-and-spring core contradicts it
  const maglev = resolveSpec(doc, model, 'maglev').value;
  const core = resolveSpec(doc, model, 'core_system').value;
  if (maglev && !['none', 'unknown'].includes(maglev) && core === 'standard') {
    report.warn('22', rec.file, `maglev "${maglev}" with core_system "standard". Check whether the core is really conventional.`);
  }

  // 23 — an override is a claim
  for (const field of Object.keys(doc.config ?? {})) {
    if (doc.config[field] === undefined || doc.config[field] === null) continue;
    if (model?.specs?.[field] === undefined) continue;
    if (model.specs[field] === doc.config[field]) {
      report.warn('23', rec.file, `config.${field} restates the model value; an override that changes nothing is noise.`);
      continue;
    }
    if (!doc.attestations?.[`/config/${field}`]) {
      report.warn('23', rec.file, `config.${field} overrides the model without an attestation on the override.`);
    }
  }

  // 24 — a price far above MSRP is a secondary-market fact wearing retail clothes
  const msrp = doc.pricing?.msrp?.amount;
  for (const [i, obs] of (doc.pricing?.observations ?? []).entries()) {
    if (!msrp || !obs.price?.amount) continue;
    if (obs.price.currency !== doc.pricing.msrp.currency) continue;
    if (obs.price.amount > msrp * 10 && obs.kind !== 'auction_sold') {
      report.warn('24', rec.file, `pricing/observations/${i} is ${obs.price.amount} against an MSRP of ${msrp} but is typed "${obs.kind}".`);
    }
  }

  // 26 — a stickerless cube has no stickers
  if (doc.colorway?.application === 'stickerless') {
    for (const [i, face] of (doc.colorway.faces ?? []).entries()) {
      if (face.material === 'vinyl_sticker') {
        report.warn('26', rec.file, `colorway.application is "stickerless" but faces/${i} has material "vinyl_sticker". If both are true the application is "hybrid".`);
      }
    }
  }

  // 27 — a non-legal cube is admitted conditionally, if at all
  if (doc.scope_class === 'core' && doc.legality?.wca_status === 'not_legal') {
    report.warn('27', rec.file, 'scope_class "core" with legality.wca_status "not_legal". Admit it as "conditional" with a justification, or recheck the legality claim.');
  }
}

// 20 — lineage runs forwards
for (const rec of [...models, ...variants]) {
  for (const [i, rel] of (rec.doc.relationships ?? []).entries()) {
    if (rel.type !== 'succeeds') continue;
    const target = byId.get(rel.target)?.doc;
    if (!target) continue;
    const mine = rec.doc.released ?? (rec.doc.releases ?? [])[0]?.date;
    const theirs = target.released ?? (target.releases ?? [])[0]?.date;
    if (cmpDate(mine, theirs) === -1) {
      report.warn('20', rec.file, `relationships/${i} says it succeeds "${rel.target}", but its release date is earlier.`);
    }
  }
}

// 25 — a designated edition implies siblings
const variantsByModel = new Map();
for (const v of variants) {
  if (!variantsByModel.has(v.doc.model_id)) variantsByModel.set(v.doc.model_id, []);
  variantsByModel.get(v.doc.model_id).push(v);
}
for (const [modelId, list] of variantsByModel) {
  if (list.length !== 1) continue;
  if (list[0].doc.edition?.designation) {
    report.warn('25', list[0].file, `${modelId} has one variant, and it carries the edition designation "${list[0].doc.edition.designation}". A designation usually means siblings exist that have not been enumerated.`);
  }
}

report.print();
process.exit(0);
