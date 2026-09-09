#!/usr/bin/env node
// Catalogue gap — is the frozen model inventory missing products that are on sale right now?
//
// This exists because of P4-9. On 2026-09-09 a live enumeration of three retailers found at
// least twelve manufacturer-branded 3x3 lines with no model in the frozen 269, including MoYu
// WeiLong V11 and X-Man Tornado V5 — the current flagships of two major manufacturers — some of
// them listed for six years before the model enumeration ran. Nothing in the archive could have
// detected that: every check here validates what the archive CONTAINS, and this is the only one
// that asks what it OMITS.
//
// It found the gap by accident, while chasing an unrelated source-diversity issue. That is the
// argument for making it a command: a defect class discovered by luck should not depend on luck
// to be discovered again.
//
// OFFLINE BY DEFAULT, like check-links: prints what it would query and why. Pass --fetch to hit
// the network. It is deliberately NOT part of `npm run check` — a build must not depend on three
// storefronts being up.
//
// WHAT IT CANNOT DO. It compares retailer product titles against archive names, and both are
// written by humans, so it will never be exact. It is tuned to under-report rather than
// over-report: everything it prints still needs a human to confirm, and things it stays silent
// about are not thereby confirmed present. The filters below encode the false positives that
// actually occurred, each one from a real mis-hit during the P4-9 sweep.

import { loadVocabularies, loadSchemas, loadRecords, Report } from './lib/archive.mjs';

const FETCH = process.argv.includes('--fetch');
const JSON_OUT = process.argv.includes('--json');

// Shopify storefronts expose their own collection as JSON. Using the retailer's structured
// `vendor` field rather than parsing the title is what keeps TheCubicle's own custom setups —
// "Griesser's WeiLong V11", "Tommy Cherry's WeiLong WRM V10" — out of the manufacturer counts.
const CATALOGUES = [
  { name: 'TheCubicle', base: 'https://www.thecubicle.com/collections/3x3-speed-cubes', pages: 3 },
  { name: 'SpeedCubeShop', base: 'https://speedcubeshop.com/collections/3x3-speed-cubes', pages: 2 },
  { name: 'Cubelelo (IN)', base: 'https://www.cubelelo.com/collections/3x3-speed-cubes', pages: 1 },
];

// A retailer's own service tier, collaboration or bundle is not the manufacturer's product. The
// archive files those under the `thecubicle` SERVICE manufacturer.
const SERVICE = /griesser|tommy.cherry|cubicle pro shop|picube|saocube se|lube|setup|refurb|bundle|sticker|lubricant|carrying|timer|mat\b|stand\b|gift card/i;
// The collections include non-3x3 puzzles and shape mods, which are out of this archive's scope.
const NOT_3X3 = /\b(2x2|4x4|5x5|6x6|7x7|8x8|9x9|1[0-3]x1[0-3]|pyraminx|megaminx|skewb|square-?1|clock|fto|cuboid|kilominx|ivy|gear|mirror|redi|axis|dino|barrel|tower|windmill|fisher|ghost|void|mastermorphix)\b/i;

const normalise = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

const report = new Report(`catalogue gap — products on sale with no model in the archive${FETCH ? '' : ' [offline: pass --fetch to query]'}`);
const vocabs = loadVocabularies();
loadSchemas(vocabs);
const records = loadRecords();

// MODEL names only, and that choice is the whole point of this script.
//
// The first version matched family names too, and it was worse than useless: "MoYu WeiLong V11"
// contains the family name "MoYu WeiLong", so every missing GENERATION inside a known family
// matched and vanished — which is precisely the defect class P4-9 is about. A check that hides
// the thing it was written to find is worse than no check, because it reports a clean result.
const known = new Set();
for (const rec of records) {
  if (rec.entity !== 'model' || !rec.doc?.name) continue;
  for (const n of [rec.doc.name, ...(rec.doc.aliases ?? [])]) {
    const k = normalise(n);
    if (k) { known.add(k); known.add(k.replace(/3x3/g, '')); }
  }
}
// FAMILY names are indexed SEPARATELY and never used for matching — using them for matching is
// what swallowed every missing generation in the first version. They are used only to answer the
// question that decides whether P4-9 is a coverage problem or a METHOD problem:
//
//   Does this missing line belong to a product family the archive ALREADY HOLDS?
//
// A miss inside a known family means the enumeration found the line and stopped before its later
// generations — a systematic recency failure. A miss in an unknown family means the line was
// never found at all — a breadth failure. They have different fixes, and the ratio between them
// is the finding.
const families = new Map();
for (const rec of records) {
  if (rec.entity !== 'family' || !rec.doc?.name) continue;
  for (const n of [rec.doc.name, ...(rec.doc.aliases ?? [])]) {
    const k = normalise(n).replace(/3x3/g, '');
    if (k.length >= 5) families.set(k, rec.doc.id);
  }
}

// A generation token makes a name a different product, not a longer spelling of the same one.
// "weilongv11" must never match "weilong" — that is the swallow this script exists to prevent.
const GENERATION = /(v\d+|mk\d+|\d{4})$/;
report.note(`${known.size} distinct archive MODEL name(s) to match against (family names deliberately excluded).`);

if (!FETCH) {
  report.note('Would query, and why each is here:');
  for (const c of CATALOGUES) report.note(`  ${c.name} — ${c.base}/products.json?limit=250 (${c.pages} page(s))`);
  report.note('Cubelelo is not optional garnish: RESEARCH_SPEC 3.6a requires a non-US retailer,');
  report.note('and a US-only sweep would corroborate itself. Run with --fetch to compare.');
  report.print();
  process.exit(0);
}

const lines = new Map();                   // product line -> { skus, vendors, first, seenAt }
for (const cat of CATALOGUES) {
  for (let page = 1; page <= cat.pages; page += 1) {
    let products = [];
    try {
      const res = await fetch(`${cat.base}/products.json?limit=250&page=${page}`);
      if (!res.ok) { report.warn('gap', cat.name, `page ${page} returned HTTP ${res.status}. Not evidence of absence.`); continue; }
      ({ products = [] } = await res.json());
    } catch (err) {
      // A failed fetch is never evidence of absence — say so rather than silently shrinking.
      report.warn('gap', cat.name, `page ${page} could not be fetched (${err.message}). Not evidence of absence.`);
      continue;
    }
    for (const p of products) {
      const title = p.title ?? '';
      if (SERVICE.test(title) || NOT_3X3.test(title)) continue;
      // Split only on a bracket or a SPACED dash. Splitting on any hyphen cut "QiYi X-Man ..."
      // down to "QiYi X" and invented an 8-SKU product line that does not exist.
      const m = /^(.{2,44}?)\s*[([]/.exec(title) ?? /^(.{2,44}?)\s+[-–]\s/.exec(title) ?? /^(.{2,44})$/.exec(title);
      if (!m) continue;
      const line = m[1].trim();
      if (!lines.has(line)) lines.set(line, { skus: 0, vendors: new Set(), first: '9999-99-99', seenAt: new Set() });
      const e = lines.get(line);
      e.skus += 1;
      if (p.vendor) e.vendors.add(p.vendor);
      e.seenAt.add(cat.name);
      const pub = (p.published_at ?? '').slice(0, 10);
      if (pub && pub < e.first) e.first = pub;
    }
  }
}
report.note(`${lines.size} distinct product line(s) across ${CATALOGUES.length} catalogue(s).`);

const missing = [];
for (const [line, e] of lines) {
  const k = normalise(line).replace(/3x3/g, '');
  if (k.length < 5) continue;                          // too short to match reliably either way
  let matched = known.has(k);
  const gen = GENERATION.exec(k);
  if (!matched) {
    for (const a of known) {
      if (a.length < 5) continue;
      // If the catalogue line carries a generation token, only an archive name carrying the SAME
      // token counts. Otherwise "MoYu WeiLong V11" matches "MoYu WeiLong V9" and disappears.
      if (gen && !a.endsWith(gen[1])) continue;
      // And a bare archive name must not absorb a versioned catalogue line either.
      if (gen && !GENERATION.test(a)) continue;
      if (a.includes(k) || k.includes(a)) { matched = true; break; }
    }
  }
  if (matched) continue;
  // Which known family, if any, does this line sit inside?
  let family = null;
  for (const [fk, fid] of families) {
    if (k.startsWith(fk) || fk.startsWith(k)) { family = fid; break; }
  }
  missing.push([line, { ...e, family, generation: gen ? gen[1] : null }]);
}
missing.sort((a, b) => b[1].skus - a[1].skus);

const inKnownFamily = missing.filter(([, e]) => e.family);
report.note('');
report.note(`${missing.length} line(s) with no archive name match. Confirm each by hand:`);
report.note(`  of those, inside a family the archive ALREADY HOLDS : ${inKnownFamily.length}`);
report.note(`  in no known family                                  : ${missing.length - inKnownFamily.length}`);
report.note('  The first number is a RECENCY failure — the line was found, its later generations');
report.note('  were not. The second is a BREADTH failure — the line was never found at all.');
for (const [line, e] of missing) {
  if (e.skus < 2) continue;                            // a single SKU is usually a one-off edition
  const where = [...e.seenAt].join(', ');
  report.warn('gap', line, `${e.skus} SKUs, vendor "${[...e.vendors].join('/') || '?'}", first listed ${e.first === '9999-99-99' ? 'unknown' : e.first} — seen at ${where}`);
}
report.note('');
report.note('A line listed at more than one retailer is the stronger signal; a single-SKU line is');
report.note('suppressed above because it is usually a one-off edition of a model already held.');
report.note('published_at is a LISTING date, never a release date — it belongs in no record.');
if (JSON_OUT) {
  // Machine-readable, so an adjudication file can be regenerated rather than retyped.
  process.stdout.write(`${JSON.stringify(missing.map(([line, e]) => ({
    line,
    skus: e.skus,
    vendors: [...e.vendors],
    retailers: [...e.seenAt],
    first_listed: e.first === '9999-99-99' ? null : e.first,
    known_family: e.family,
    generation: e.generation,
  })), null, 2)}\n`);
  process.exit(0);
}
report.print();
process.exit(0);
