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

const outOfRangeReported = new Set();

for (const rec of variants) {
  const doc = rec.doc;
  const model = byId.get(doc.model_id)?.doc;

  // 18 — physical plausibility, reported where the value actually lives
  //
  // This resolves through inheritance, so a model with an out-of-range size used to produce one
  // warning per variant beneath it: maru-3x3-original fired EIGHT times for a single fact, once
  // per Special Patterns sticker variant, none of which asserts a size at all. That is noise
  // that trains a reader to skim the rule.
  //
  // Now the warning goes to whoever asserted the value. A variant that OVERRIDES a spec owns its
  // number and is warned directly; an inherited value is the MODEL's claim and is warned once on
  // the model, no matter how many variants hang off it. Implements the fix recommended in
  // ledger P4-1, which noted the signal was appearing everywhere except where the data was.
  for (const [field, min, max, unit] of [['size_mm', SIZE_MIN, SIZE_MAX, 'mm'], ['weight_g', WEIGHT_MIN, WEIGHT_MAX, 'g']]) {
    const { value, from } = resolveSpec(doc, model, field);
    if (typeof value !== 'number' || (value >= min && value <= max)) continue;
    if (from === 'variant') {
      report.warn('18', rec.file, `${field} is ${value}${unit}, outside the plausible ${min}-${max}${unit} range for a 3x3. This variant sets the value itself.`);
    } else if (model) {
      const key = `18:${model.id}:${field}`;
      if (!outOfRangeReported.has(key)) {
        outOfRangeReported.add(key);
        const modelFile = byId.get(model.id)?.file ?? rec.file;
        report.warn('18', modelFile, `${field} is ${value}${unit}, outside the plausible ${min}-${max}${unit} range for a 3x3. Reported once here rather than on each of its variants, which inherit it.`);
      }
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

// 42 — records of one page are not independent sources
//
// Found by an archive-wide sweep on 2026-09-09: pairs of source records pointing at the same
// page, most of them a manufacturer page split into a "-product" record and a
// "-specifications" record. Splitting one page across two records by excerpt is a defensible
// modelling choice, but it makes the archive look better-sourced than it is, and an
// attestation citing both halves reads as corroboration when it is a single page agreeing
// with itself.
//
// AMENDED 2026-09-09 (same day, after the first version under-reported). Two faults:
//
//   1. It grouped on the raw `archive_url`, which embeds the Wayback capture timestamp, so two
//      records of the SAME page never grouped if captured on different dates, and a record
//      holding only `url` never matched one holding `archive_url` for the same page.
//   2. It missed same-capture duplicates that differed only by Wayback's `id_` replay flag —
//      the WiteDen Mixup Plus pair share timestamp 20220517171802 exactly and were invisible.
//
// The amendment also forced a DISTINCTION the first version collapsed. Two captures of one
// page are not the same thing as two records of one capture:
//
//   - SAME PAGE, SAME CAPTURE — genuinely redundant records of one observation. Citing both is
//     never anything but double-counting.
//   - SAME PAGE, DIFFERENT CAPTURES — two observations of one publisher's page over time. That
//     is legitimate and sometimes necessary evidence: `giiker-com-supercube-i3s-product-2022`
//     (on sale) and `...-2026-soldout` (withdrawn) are exactly how a discontinuation is shown,
//     and no single capture could carry that claim. They still cannot CORROBORATE each other —
//     one publisher, one page — so the citation is reported, in weaker terms, for a human to
//     confirm the claim is chronological rather than corroborative.
//
// Reporting both branches identically would have raised 5 false positives out of 8.
//
// Rule 9 already blocks the dangerous case (`confirmed` on tier 2-only evidence requires two
// distinct PUBLISHERS, and records of one page share one). This rule covers what rule 9 cannot
// see: the duplication itself, and any attestation resting on more than one record of a page.
{
  const sources = (byEntity.get('source') ?? []).filter((r) => r.doc?.id);
  const WAYBACK = /^https?:\/\/web\.archive\.org\/web\/(\d+)(?:id_|im_|if_|js_|cs_)?\//i;
  // The page a locator points at, independent of how it was preserved or when it was captured.
  const canonicalPage = (raw) => {
    if (!raw) return null;
    const u = String(raw).replace(WAYBACK, '');
    const m = /^https?:\/\/([^/]+)(.*)$/i.exec(u);
    return m ? `${m[1].toLowerCase().replace(/^www\./, '')}${m[2].replace(/\/$/, '')}` : u;
  };
  // Which observation of that page: the capture timestamp, with Wayback's replay flags stripped
  // so `...171802id_/` and `...171802/` are recognised as the one capture they are.
  const captureOf = (doc) => {
    const m = WAYBACK.exec(doc.archive_url ?? '');
    return m ? m[1] : `live:${doc.accessed ?? ''}`;
  };

  const byPage = new Map();
  for (const rec of sources) {
    const page = canonicalPage(rec.doc.archive_url || rec.doc.url);
    if (!page) continue;
    if (!byPage.has(page)) byPage.set(page, []);
    byPage.get(page).push(rec);
  }

  const pageOf = new Map();                 // source id -> ids of every record of that page
  const captureById = new Map();            // source id -> capture identity
  for (const [page, recs] of byPage) {
    for (const r of recs) captureById.set(r.doc.id, captureOf(r.doc));
    if (recs.length < 2) continue;
    const ids = recs.map((r) => r.doc.id).sort();
    for (const id of ids) pageOf.set(id, ids);

    // Only redundant records of ONE capture are reported as duplicate records. Separate
    // records for separate captures are a legitimate way to hold a page's history.
    const byCapture = new Map();
    for (const r of recs) {
      const c = captureOf(r.doc);
      if (!byCapture.has(c)) byCapture.set(c, []);
      byCapture.get(c).push(r);
    }
    for (const [, dupes] of byCapture) {
      if (dupes.length < 2) continue;
      const dids = dupes.map((r) => r.doc.id).sort();
      report.warn('42', dupes[0].file, `shares its locator AND its capture with ${dids.filter((i) => i !== dupes[0].doc.id).join(', ')} — these are ${dids.length} records of ONE observation of ONE page (${page.slice(0, 90)}). Citing more than one of them is not corroboration.`);
    }
  }

  for (const rec of records) {
    for (const [ptr, att] of Object.entries(rec.doc?.attestations ?? {})) {
      const cited = att?.sources ?? [];
      if (cited.length < 2) continue;
      for (const id of cited) {
        const group = pageOf.get(id);
        if (!group) continue;
        const overlap = cited.filter((c) => group.includes(c));
        if (overlap.length < 2) continue;
        const captures = new Set(overlap.map((c) => captureById.get(c)));
        if (captures.size === 1) {
          report.warn('42', rec.file, `${ptr} cites ${overlap.join(' and ')}, which are one capture of one page under different ids. That is one source, not ${overlap.length}.`);
        } else {
          report.warn('42', rec.file, `${ptr} cites ${overlap.join(' and ')} — different captures of ONE page by ONE publisher. Legitimate if the claim is about change over time; they cannot corroborate each other.`);
        }
        break;
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

// 45 — a gross/packaged weight is not a product weight
//
// Retailers publish both: "Gross Weight: 213g / Item Weight: 89.9g". The gross figure includes
// the box and can exceed the puzzle by more than 100%. An archive-wide sweep on 2026-09-09
// found 16 records storing the gross figure as weight_g, seven of them where the item weight
// was stated in the very same source — and rule 18 caught only two, because the rest sit
// comfortably inside the plausible range. A wrong value inside a plausible range is exactly the
// defect a range check cannot see.
//
// Matching on the VALUE rather than on the presence of the phrase keeps this precise: it fires
// only when the number actually recorded is a number the sources call gross.
{
  const grossOf = (text) => [...String(text).matchAll(/Gross Weight[:\s]*([\d.]+)\s*g/gi)].map((m) => parseFloat(m[1]));
  const itemOf = (text) => [...String(text).matchAll(/Item Weight[:\s]*([\d.]+)\s*g/gi)].map((m) => parseFloat(m[1]));

  for (const rec of records) {
    if (!['model', 'variant'].includes(rec.entity)) continue;
    const doc = rec.doc ?? {};
    const w = doc.specs?.weight_g ?? doc.config?.weight_g;
    if (typeof w !== 'number') continue;
    const att = (doc.attestations ?? {})['/specs/weight_g'] ?? (doc.attestations ?? {})['/config/weight_g'];
    const blob = [JSON.stringify(doc), ...(att?.sources ?? []).map((id) => JSON.stringify(sourceById.get(id) ?? {}))].join(' ');
    const gross = grossOf(blob);
    if (!gross.some((g) => Math.abs(g - w) < 0.5)) continue;
    const item = itemOf(blob);
    report.warn('45', rec.file, item.length
      ? `weight_g is ${w}g, which its own sources give as a GROSS (packaged) weight — and those sources also state an item weight of ${item[0]}g. Record the item weight.`
      : `weight_g is ${w}g, which its own sources give as a GROSS (packaged) weight, not the product's. No item weight is stated anywhere, so leave weight_g unset with an "unknown" attestation rather than asserting a boxed figure as a spec.`);
  }
}

// 46 — a size named in a variant's own designation must be expressed in config
//
// Twelve DaYan GuHong Pro variants were named "54mm MagLev", "55mm Standard" and so on, with the
// size living only in the id and the free-text edition.designation. Their model carries no
// size_mm at all — correctly, because the line is sold in three sizes and no single figure
// belongs at model level — so resolveSpec returned UNDEFINED for every one of them. The archive
// knew the sizes in prose and could not answer "what size is this variant?" for any of them.
//
// Deliberately narrow: SIZE only, and only when the designation or slug states an explicit
// millimetre figure. Magnet and coating axes are named far more loosely ("M", "Pro", "Frosted")
// and a rule built on those would be noise. A precise rule that fires rarely beats a broad one
// that gets ignored.
{
  for (const rec of variants) {
    const doc = rec.doc ?? {};
    if (doc.config?.size_mm !== undefined) continue;
    const text = `${doc.edition?.designation ?? ''} ${String(doc.id).split('--')[1] ?? ''}`;
    const m = text.match(/(\d{2}(?:\.\d)?)\s*mm/i);
    if (!m) continue;
    const named = parseFloat(m[1]);
    const model = byId.get(doc.model_id)?.doc;
    const inherited = model?.specs?.size_mm;
    if (inherited !== undefined && Math.abs(inherited - named) < 0.6) continue;   // agrees already
    report.warn('46', rec.file, inherited === undefined
      ? `names "${m[0]}" in its own designation but sets no config.size_mm, and its model sets none either — so this variant's size resolves to nothing. The size is the axis; record it.`
      : `names "${m[0]}" in its own designation but inherits ${inherited}mm from its model. A variant that states a different size must override it in config.size_mm.`);
  }
}

// 47 — an archive_url must name a capture, not ask for one
//
// Wayback treats `/web/<timestamp>/<url>` as a REQUEST: it 302s to whatever capture is nearest
// to that timestamp. A timestamp written to the second names one immutable snapshot. A
// midnight-exact one (HHMMSS = 000000) almost never does — it is a date typed by hand, and the
// capture it resolves to can change as new captures are added. `preservation_method: archive_url`
// is a promise that the evidence is pinned, and a rounded timestamp quietly breaks it.
//
// Found 2026-09-09 in 10 of 480 archive_urls. Chance would put 0.0056 there if capture times were
// uniform across the day, so this is ~1800x chance and `000000` was the single most common
// time-of-day in the archive, three times over the runner-up. Constructed, not observed.
//
// The reason this is a lint rule and not a note in the methodology is that it does REAL damage
// beyond preservation. Rule 42 decides whether two records are the same observation by comparing
// capture ids. `thecubicle-fanxin-3x3-products` (20241009000000) and `thecubicle-fanxin-hudong-2024`
// (20241009113827) are the SAME capture — the first 302s to the second — but rule 42 could only
// see two different strings, so it downgraded a genuine double-citation to the weak
// change-over-time branch. A rounded timestamp does not merely weaken the evidence; it hides
// duplicate evidence from the check built to find it. All 10 were resolved once and pinned.
//
// A wildcard is the same fault, further along: `/web/20250103000000*/` is a calendar SEARCH page,
// not a capture, and preserves nothing at all.
{
  for (const rec of (byEntity.get('source') ?? []).filter((r) => r.doc?.id)) {
    const a = rec.doc.archive_url;
    if (!a) continue;
    const m = /\/web\/(\d{14})(\*)?/.exec(a);
    if (!m) continue;
    if (m[2]) {
      report.warn('47', rec.file, `archive_url ends its timestamp with "*", which is a Wayback calendar search, not a capture. preservation_method claims a pinned snapshot this record does not have.`);
    } else if (m[1].slice(8) === '000000') {
      report.warn('47', rec.file, `archive_url capture ${m[1]} is midnight-exact, so it is a date-rounded request rather than a capture id — Wayback resolves it to whatever is nearest and that can change. Resolve it once and pin the capture it returns.`);
    }
  }
}

report.print();
process.exit(0);
