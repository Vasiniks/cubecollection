#!/usr/bin/env node
// Semantic plausibility. Rules 18-27 of docs/data-architecture.md section 7.3.
// These are warnings by design: each one is usually wrong, occasionally right, and always
// worth a human look. Nothing here blocks a build.

import {
  loadVocabularies, loadSchemas, loadRecords, indexRecords, resolveSpec, dateStart, sourceTier, Report,
} from './lib/archive.mjs';

const report = new Report('lint — semantic plausibility (rules 18-27, advisory)');
const vocabs = loadVocabularies();
loadSchemas(vocabs);
const records = loadRecords();
const { byId, byEntity } = indexRecords(records);

const variants = byEntity.get('variant') ?? [];
const models = byEntity.get('model') ?? [];
report.note(`${models.length} model(s), ${variants.length} variant(s).`);

const sourceById = new Map(
  (byEntity.get('source') ?? []).filter((r) => r.doc?.id).map((r) => [r.doc.id, r.doc]),
);
const tierOf = (id) => (sourceById.has(id) ? sourceTier(sourceById.get(id), vocabs) : null);

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

// 40 — a model may not predate the family that contains it
//
// Pass 3 kept finding better-sourced dates than Pass 2 had, which is healthy - but it left
// models dated years before their own family's `introduced`, and nothing caught it. A model
// dated 2016 inside a family introduced 2020 is either a family date that needs revising or a
// model filed in the wrong place. Either way a human should look.
//
// The precision allowance is the whole design problem. `2016` and `2016-10` describe the same
// approximate moment at different precisions, and dateStart() expands both to a floor
// (2016-01-01 and 2016-10-01), so a naive comparison fires on every year-vs-month pair in the
// same year. That would be three false positives out of ten in this archive - enough noise to
// get the rule ignored. So the model date is compared against the START of the family's
// precision window, and the warning only fires when the model predates that window entirely.
const familyById = new Map((byEntity.get('family') ?? []).map((r) => [r.doc.id, r.doc]));
const PRECISION_WINDOW = { year: 366, quarter: 92, month: 31, day: 1 };
const daysBetween = (a, b) => (Date.parse(b) - Date.parse(a)) / 86400000;

for (const rec of models) {
  const family = familyById.get(rec.doc.family_id);
  const famDate = family?.introduced;
  const modelDate = rec.doc.released ?? rec.doc.announced;
  if (!famDate || !modelDate) continue;                    // absent dates are not a conflict
  const mStart = dateStart(modelDate), fStart = dateStart(famDate);
  if (!mStart || !fStart || mStart >= fStart) continue;

  // Allow the coarser of the two precisions: a year-precision family date could mean any day
  // in that year, so a model dated earlier within that window is not a contradiction.
  let slack = Math.max(
    PRECISION_WINDOW[famDate.precision] ?? 1,
    PRECISION_WINDOW[modelDate.precision] ?? 1,
  );
  // `circa` on either side widens the window by one further step of the coarser precision.
  // The vocabulary defines circa as "approximate", so a circa-2016 family date genuinely
  // admits late 2015. Without this, guoguan-yuexiao-original (365 days before a circa-year
  // family date) would fire on a one-day margin - a false positive decided by arithmetic
  // luck rather than by evidence, which is exactly how a rule earns being ignored.
  // ...but only when the MODEL date is itself soft. An `exact` model date is a precise claim,
  // and widening the window for it would let a family's vagueness swallow hard evidence -
  // qiyi-valk-3 is announced 2016-08 `exact` against a family recorded circa 2018, which is a
  // real conflict that must stay visible.
  const modelIsSoft = modelDate.qualifier !== 'exact';
  if (modelIsSoft && (famDate.qualifier === 'circa' || modelDate.qualifier === 'circa')) slack *= 2;
  if (daysBetween(mStart, fStart) <= slack) continue;

  const which = rec.doc.released ? 'released' : 'announced';
  report.warn('40', rec.file, `${which} ${modelDate.value} (${modelDate.qualifier}) predates family "${family.id}" introduced ${famDate.value} (${famDate.qualifier}). Either the family date understates its own line, or this model belongs elsewhere.`);
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

// 41 — a baseline variant must say it was assessed, not merely exist
//
// P4-3 makes every assessed model carry at least one variant, so a model sold in one
// configuration gets a bare `--standard`. That record asserts something specific: "this model
// was researched and no differentiated configuration was established." The assertion lives in
// the /edition/types attestation and its note. Without one, the record asserts nothing and is a
// placeholder wearing an assessment's clothes — which is exactly the state P4-3 exists to
// prevent, because it makes the coverage metric lie in the flattering direction.
//
// Advisory, not blocking: a bare baseline is still better than a missing model, and the fix is
// to record what was searched rather than to delete the record.
{
  const variantsByModel = new Map();
  for (const rec of byEntity.get('variant') ?? []) {
    const mid = rec.doc.model_id;
    if (!variantsByModel.has(mid)) variantsByModel.set(mid, []);
    variantsByModel.get(mid).push(rec);
  }
  for (const [, recs] of variantsByModel) {
    if (recs.length !== 1) continue;                      // only a LONE variant is a baseline
    const rec = recs[0];
    const doc = rec.doc;
    if (!/--standard$/.test(doc.id ?? '')) continue;       // only the bare-standard shape
    const ed = doc.edition ?? {};
    const detailed = ed.name || ed.designation
      || Object.keys(doc.config ?? {}).length
      || Object.keys(doc.colorway ?? {}).length;
    if (detailed) continue;                                // carries its own evidence; not bare
    const att = (doc.attestations ?? {})['/edition/types'];
    if (!att) {
      report.warn('41', rec.file, `is the only variant of "${doc.model_id}" and carries no /edition/types attestation. A baseline record claims the model was assessed and nothing differentiated was found; without an attestation it claims nothing. Record what was searched, or add the variants that were.`);
    }
  }
}

// 42 — two source records of the same page are one source
//
// Found by an archive-wide sweep on 2026-09-09: 11 pairs share an archive_url, most of them a
// manufacturer page split into a "-product" record and a "-specifications" record. Splitting one
// page across two records by excerpt is a defensible modelling choice, but it makes the archive
// look better-sourced than it is, and an attestation citing both halves reads as corroboration
// when it is a single page agreeing with itself.
//
// Rule 9 already blocks the dangerous case (`confirmed` on tier 2-only evidence requires two
// distinct PUBLISHERS, and two records of one page share one). This rule covers what rule 9
// cannot see: the duplication itself, and any attestation resting on both halves.
{
  const sources = (byEntity.get('source') ?? []).filter((r) => r.doc?.id);
  const byLocator = new Map();
  for (const rec of sources) {
    const loc = rec.doc.archive_url || rec.doc.url;
    if (!loc) continue;
    if (!byLocator.has(loc)) byLocator.set(loc, []);
    byLocator.get(loc).push(rec);
  }
  const samePage = new Map();               // source id -> the group it belongs to
  for (const [loc, recs] of byLocator) {
    if (recs.length < 2) continue;
    const ids = recs.map((r) => r.doc.id).sort();
    for (const id of ids) samePage.set(id, ids);
    report.warn('42', recs[0].file, `shares its locator with ${ids.filter((i) => i !== recs[0].doc.id).join(', ')} — these are ${ids.length} records of ONE page (${loc.slice(0, 90)}). Citing more than one of them is not corroboration.`);
  }

  for (const rec of records) {
    for (const [ptr, att] of Object.entries(rec.doc?.attestations ?? {})) {
      const cited = att?.sources ?? [];
      if (cited.length < 2) continue;
      for (const id of cited) {
        const group = samePage.get(id);
        if (!group) continue;
        const overlap = cited.filter((c) => group.includes(c));
        if (overlap.length > 1) {
          report.warn('42', rec.file, `${ptr} cites ${overlap.join(' and ')}, which are the same page under different ids. That is one source, not ${overlap.length}.`);
          break;
        }
      }
    }
  }
}

// 43 — a confidence may not exceed what its cited sources' tier can support
//
// vocab/confidence.yml defines the scale by tier: `confirmed` = tier 1 or two independent tier 2;
// `probable` = ONE TIER 2 source, uncontradicted; `reported` = a TIER 3 source. Nothing enforced
// the floor, so an attestation could claim `probable` on a tier-4 wiki and read as stronger than
// its evidence. Six such attestations existed on 2026-09-09 — and four were generated by the
// P4-3 baseline script, which cited each model's FIRST source rather than its BEST-tier one, so
// this is a defect a generator can introduce in bulk without anyone noticing.
//
// rule 9 already governs `confirmed` (tier 1, or two distinct publishers). This covers the rest
// of the scale. Advisory: the honest fix is usually to re-cite a stronger source that already
// exists on the record, which is what those four needed.
{
  const FLOOR = { confirmed: 2, probable: 2, reported: 3 };
  for (const rec of records) {
    for (const [ptr, att] of Object.entries(rec.doc?.attestations ?? {})) {
      const floor = FLOOR[att?.confidence];
      if (floor === undefined) continue;                    // uncertain/unknown/disputed: no floor
      const tiers = (att.sources ?? []).map((id) => tierOf(id)).filter((t) => t != null);
      if (!tiers.length) continue;                          // absent sources are rule 5/9 business
      const best = Math.min(...tiers);
      if (best > floor) {
        report.warn('43', rec.file, `${ptr} is "${att.confidence}" but its best cited source is tier ${best}. vocab/confidence.yml puts "${att.confidence}" at tier ${floor} or better. Re-cite a stronger source if the record already has one, or lower the confidence.`);
      }
    }
  }
}

report.print();
process.exit(0);
