#!/usr/bin/env node
// Archive-wide audit — the sweeps that validate.mjs and lint-semantic.mjs cannot express.
//
// validate and lint work record-by-record: they answer "is this record well-formed and
// plausible?". This answers questions that only exist ACROSS records — how much of the archive
// is assessed, which sources nothing cites, whether the coverage metric is interpretable.
// Nothing here blocks. It exists so these checks stop depending on someone remembering to
// write a throwaway script, which is how the tier/confidence defect survived until 2026-09-09.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadVocabularies, loadSchemas, loadRecords, indexRecords, sourceTier, citedSourceIds } from './lib/archive.mjs';

const vocabs = loadVocabularies();
loadSchemas(vocabs);
const records = loadRecords();
const { byEntity, byId } = indexRecords(records);

const of = (e) => (byEntity.get(e) ?? []).filter((r) => r.doc?.id);
const fam = of('family'), mod = of('model'), va = of('variant'), mf = of('manufacturer'), src = of('source');
const srcById = new Map(src.map((r) => [r.doc.id, r.doc]));
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

// ---- 6. dates resting on a documented catalogue artefact ---------------------------------
//
// Four retailer `Added:` values are documented artefacts rather than per-product dates, the
// worst being TheCubicle's 2018-09-11: 29 occurrences across 22 sources and 13 unrelated
// brands. The standing rule is to discard them outright, not even as a bound.
//
// This reports rather than judges, because the distinction that matters cannot be settled
// mechanically. Most records that NAME an artefact date name it in order to refuse it, which is
// the discipline working and must not be flagged. A lint rule would have to detect refusal from
// prose and would false-positive on all 31 of them. So the split below is heuristic and is
// printed for a human to read, not asserted.
//
// One genuinely open question sits underneath and is deliberately left open: whether
// 2018-09-11 bounds CATALOGUE PRESENCE even though it cannot date a release. Products added
// later carry their own distinct `Added:` values, which is consistent with the stamp marking
// everything present at migration — but no product known to launch after 2018-09-11 has been
// found carrying it, so the reading is unconfirmed either way. gan-354-m keeps the date as an
// explicit "weak upper bound" at `uncertain` confidence on exactly that reasoning, which
// contradicts the stated rule while harming nothing. Ledger P4-7.
head('Dates naming a documented artefact date');
const ARTEFACTS = ['2018-09-11', '2018-10-14', '2018-11-07', '2018-07-16'];
const REFUSES = /not used|discard|refus|artefact|artifact|migration|suspect|not treated|excluded|rejected|not admissible|disregard|repeating/i;
let refuses = 0; const uses = [];
for (const r of [...fam, ...mod, ...va]) {
  for (const field of ['introduced', 'released', 'announced', 'discontinued']) {
    const o = r.doc[field];
    if (!o || typeof o !== 'object') continue;
    const text = JSON.stringify(o) + JSON.stringify((r.doc.attestations ?? {})[`/${field}`] ?? {});
    if (!ARTEFACTS.some((a) => text.includes(a))) continue;
    if (REFUSES.test(text)) refuses += 1;
    else uses.push(`${r.doc.id} /${field} = ${o.value}`);
  }
}
line(`  name an artefact date in order to REFUSE it : ${refuses}   <- the discipline working`);
line(`  name one without any refusal language       : ${uses.length}`);
uses.forEach((u) => line(`     ${u}`));
if (!uses.length) line('     (none — every mention is a refusal)');

// ---- 7. source-class dependence per manufacturer -----------------------------------------
//
// RESEARCH_SPEC 3.6a requires discovery breadth including at least one non-US/English retailer.
// Ledger D-F4 recorded single-publisher dependence at the FAMILY layer; this measures it where
// it actually bites, across every family, model and variant attributed to a manufacturer.
//
// The distinction that makes the number meaningful: a manufacturer resting entirely on its OWN
// official site is well sourced, not narrowly sourced, and a sub-brand resting on its PARENT's
// site is too — Monster Go and Swift Block cite gancube.com because GAN owns them, which is the
// strongest evidence available, not a misattribution. First-party citations are resolved up the
// parent_id chain and excluded before the concentration is computed. Without that step this
// sweep reports 12 manufacturers at "100% one publisher" and three of them are false.
head('Source-class dependence per manufacturer');
const mfById = new Map(mf.map((r) => [r.doc.id, r.doc]));
const hostOf = (u) => ((/https?:\/\/([^/]+)/.exec(u ?? '') ?? [])[1] ?? '').toLowerCase().replace(/^www\./, '');
const isFirstParty = (s, mfr) => {
  if (s.kind !== 'manufacturer_official') return false;
  let cur = mfr;
  for (let hops = 0; cur && hops < 4; hops += 1) {
    const m = mfById.get(cur);
    if (!m) break;
    const own = hostOf(m.website ?? m.url);
    if (own && hostOf(s.url ?? s.archive_url) === own) return true;
    cur = m.parent_id;
  }
  return false;
};
const per = new Map();
for (const r of [...fam, ...mod, ...va]) {
  const doc = r.doc;
  const mfr = doc.manufacturer_id ?? byId.get(doc.model_id)?.doc?.manufacturer_id;
  if (!mfr) continue;
  if (!per.has(mfr)) per.set(mfr, { firstParty: 0, third: new Map(), langs: new Set() });
  const bucket = per.get(mfr);
  const cited = new Set();
  for (const att of Object.values(doc.attestations ?? {})) for (const s of citedSourceIds(att)) cited.add(s);
  for (const id of cited) {
    const s = srcById.get(id);
    if (!s) continue;
    if (s.language) bucket.langs.add(s.language);
    if (isFirstParty(s, mfr)) bucket.firstParty += 1;
    else bucket.third.set(s.publisher ?? '?', (bucket.third.get(s.publisher ?? '?') ?? 0) + 1);
  }
}
const solo = [...per.entries()]
  .filter(([, b]) => b.firstParty === 0 && b.third.size === 1)
  .map(([m, b]) => [m, [...b.third.entries()][0], [...b.langs].join('/') || '-'])
  .sort((a, b) => b[1][1] - a[1][1]);
line(`  manufacturers resting on ONE third-party publisher with NO first-party source : ${solo.length}`);
for (const [m, [pub, n], langs] of solo) line(`     ${m.padEnd(18)}${String(n).padStart(3)} cites   ${pub}   [${langs}]`);
line('  (a manufacturer resting wholly on its own or its parent\'s official site is NOT listed —');
line('   that is first-party evidence, the strongest there is, not narrow sourcing.)');

// ---- 8. escalation roll-up ---------------------------------------------------------------
//
// Ledger P26-2 (critical) and P26-8 (high): "escalation roll-up has no mechanism; real findings
// went silent twice." Pass 3 Batch 1 lanes C and D were killed by rate limits, their reports
// were never written, and 24 families and 56 models were enumerated with no roll-up. The
// ShengShou YuFeng finding survived ONLY because its agent also wrote it into a source record's
// notes. A surviving report (Cyclone Boys/Maru) recorded ten missing family lines and still
// never reached the ledger.
//
// P26-2's own recommendation asks for the gap to be made CHECKABLE. This measures it. It cannot
// tell which findings were lost — nothing can, that is what "went silent" means — but it can
// count reports that talk about escalations without declaring any in a form anything can read.
//
// It also found, on 2026-09-09, that the linkage is not weak but absent: of the escalation
// entries that ARE declared in machine-readable blocks, ZERO reference a ledger id. The blocks
// exist and are free prose, so a ledger entry and a report escalation cannot be matched even
// when both were written.
head('Escalation roll-up (P26-2 / P26-8)');
const REPORT_DIRS = ['research/qc', 'research/notes'];
const walkMd = (dir, acc = []) => {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walkMd(p, acc);
    else if (e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
};
const reports = REPORT_DIRS.flatMap((d) => walkMd(d));
let ledgerIds = new Set();
const LEDGER = 'research/qc/pass2-remediation-ledger.yml';
if (existsSync(LEDGER)) {
  for (const m of readFileSync(LEDGER, 'utf8').matchAll(/^\s*-\s*id:\s*(\S+)/gm)) ledgerIds.add(m[1]);
}
const ID_IN_PROSE = /\b(P26-\d+|P4-\d+|P3-[A-Z]\d+|E\d+|D-[A-Z]\d+|C-[A-Z]\d+)\b/;
const LANGUAGE = /\bescalat|\bflagged for\b|\bfor human (review|decision)\b/i;
let withBlock = 0, languageOnly = 0, neither = 0, entriesLinked = 0, entriesLoose = 0;
const rollupOrphans = [];
for (const f of reports) {
  const text = readFileSync(f, 'utf8');
  const block = /^escalations:\s*\n((?:[ \t]+.*\n)*)/m.exec(text);
  if (block) {
    withBlock += 1;
    for (const raw of block[1].split('\n')) {
      if (!raw.trim().startsWith('-')) continue;
      if (ID_IN_PROSE.test(raw)) entriesLinked += 1; else entriesLoose += 1;
    }
  } else if (LANGUAGE.test(text)) { languageOnly += 1; rollupOrphans.push(f); }
  else neither += 1;
}
line(`  reports scanned                                 : ${reports.length}`);
line(`  declaring escalations in a machine-readable block: ${withBlock}`);
line(`  using escalation LANGUAGE with no such block     : ${languageOnly}   <- the roll-up gap`);
line(`  mentioning neither                               : ${neither}`);
line(`  block entries that cite a ledger id              : ${entriesLinked}`);
line(`  block entries that are free prose only           : ${entriesLoose}`);
line(`  ledger issues on file                            : ${ledgerIds.size}`);
if (!entriesLinked && entriesLoose) {
  line('  NOTE: no declared escalation cites a ledger id, so a report escalation and a ledger');
  line('  entry cannot be matched even when both exist. That is the mechanism P26-2 asks for.');
}
rollupOrphans.slice(0, 6).forEach((f) => line(`     ${f}`));
if (rollupOrphans.length > 6) line(`     ... and ${rollupOrphans.length - 6} more`);

// ---- 9. RESEARCH_SPEC 3.6a discovery breadth, per manufacturer ---------------------------
//
// Ledger P26-3 (high): 3.6a was added 2026-09-03, AFTER Pass 2 family enumeration completed, and
// was never applied retroactively. It mandates two things a narrower search misses: an archived
// retailer /products/ PREFIX sweep (not a /collections/ page, which filters differently and
// missed six live ShengShou lines), and at least one NON-US/English retailer.
//
// The issue was a narrative until 2026-09-09. This makes it a coverage table.
head('Discovery breadth per manufacturer (RESEARCH_SPEC 3.6a, ledger P26-3)');
const SWEEP_EVIDENCE = /prefix|enumerat|\/collections\/|catalogue structure|CDX/i;
const breadth = new Map();
for (const r of [...fam, ...mod, ...va]) {
  const doc = r.doc;
  const mfr = doc.manufacturer_id ?? byId.get(doc.model_id)?.doc?.manufacturer_id;
  if (!mfr) continue;
  if (!breadth.has(mfr)) breadth.set(mfr, { cites: 0, sweep: false, nonUS: false });
  const b = breadth.get(mfr);
  const cited = new Set();
  for (const att of Object.values(doc.attestations ?? {})) for (const s of citedSourceIds(att)) cited.add(s);
  for (const id of cited) {
    const s = srcById.get(id);
    if (!s) continue;
    b.cites += 1;
    if (SWEEP_EVIDENCE.test(`${s.title ?? ''}${s.preservation_note ?? ''}${s.reliability_note ?? ''}`)) b.sweep = true;
    if (s.region && s.region !== 'US') b.nonUS = true;
  }
}
const active = [...breadth.entries()].filter(([, b]) => b.cites > 0);
const noSweep = active.filter(([, b]) => !b.sweep).sort((a, b) => b[1].cites - a[1].cites);
const noNonUS = active.filter(([, b]) => !b.nonUS).sort((a, b) => b[1].cites - a[1].cites);
line(`  manufacturers with cited sources        : ${active.length} of ${mf.length}`);
line(`  with a 3.6a-style prefix/collection sweep: ${active.length - noSweep.length}`);
line(`  with at least one non-US source          : ${active.length - noNonUS.length}`);
line(`  failing BOTH                             : ${active.filter(([, b]) => !b.sweep && !b.nonUS).length}`);
line('');
line(`  no sweep source (${noSweep.length}), heaviest first:`);
noSweep.slice(0, 8).forEach(([m, b]) => line(`     ${m.padEnd(18)}${String(b.cites).padStart(4)} cites${b.nonUS ? '' : '   (also no non-US source)'}`));
if (noSweep.length > 8) line(`     ... and ${noSweep.length - 8} more`);
line('');
line('  MoYu is the entry to read: it is the archive\'s most heavily cited manufacturer and it');
line('  fails BOTH checks — and it accounts for 8 of the 14 lines P4-9 found missing from the');
line('  inventory. The correlation is real but NOT total: 4 of those 14 belong to manufacturers');
line('  that DO satisfy 3.6a, so compliance would not by itself have prevented P4-9. 3.6a asks');
line('  for ARCHIVED sweeps, which look backwards; nothing in it requires a CURRENT catalogue.');
line('  That is what `npm run catalogue-gap` covers, and why it had to be a separate check.');

// ---- 10. sources cited far beyond what they preserve ------------------------------------
//
// The rule-48 defect one level up. Rule 48 asks whether a SPEC VALUE appears in its source's
// preserved text. This asks the broader question: does the source's preserved text mention the
// SUBJECT of the record citing it at all?
//
// Found 2026-09-11 (ledger P4-14) with a striking result. speedsolving-wiki-moyu backed 172
// attestations and its excerpt preserved only the page's BRAND HISTORY - founding, naming,
// sub-brands, 839 characters - while 169 of those attestations made PRODUCT-level claims:
// coatings, magnet configurations, MagLev, release dates, edition designations.
//
// THE CONTROL IS WHAT MADE IT TRUSTWORTHY. The sibling wiki sources scored ZERO on the same
// measure: speedsolving-wiki-dayan-products (88 citations), -qiyi-products (88),
// -yongjun-products (64), -shengshou-products (36), -yuxin-products (32). They preserve
// 2,100-2,500 characters of PRODUCT text. Only the MoYu record captured the wrong section of the
// right page. A measure that fired everywhere would have meant nothing.
//
// The claims were all correct - re-fetching the page confirmed every disputed quote verbatim.
// What was missing was the preservation, so the archive held the claim and a pointer but not the
// evidence, and the moment that capture stopped resolving the claims became unverifiable. Both
// affected sources were repaired by transcribing the product sections they were already citing.
//
// FIXED 2026-09-12, and worth recording because the fix came from the archive rather than from a
// special case. The sweep used to know nothing of the archive's own abbreviations, so
// `mfjs-meilong-3c` cited to a page titled "MoFang JiaoShi MeiLong 3c" scored as a miss: `mfjs`
// and `mofang jiaoshi` share no tokens. That single mismatch put this source at 88% miss over 8
// citations, all eight of which were sound. Manufacturer records already carry `name` and
// `aliases`, so a manufacturer token now counts as present under any recorded spelling.
//
// TWO OTHER DEFECTS FOUND THE SAME DAY. The sweep counted only `att.sources` and was blind to
// `disputed[].sources` - the identical blind spot rules 45 and 48 carried until 2026-09-11. And
// the percentage it prints is a MISS rate, but the heading read as a HIT rate, so the worst row
// looked like the best one and was worked last. Both fixed.
//
// STILL A REPORTED SWEEP, NOT A RULE. Token matching cannot be made precise enough to block, and
// a check that cries wolf gets ignored. After the fixes the whole archive fits under 13% miss,
// so the 25% threshold has real headroom - but read the share, not the row.
// Manufacturer id -> every token of its recorded name and aliases. Built from the archive's own
// manufacturer records, so a new alias needs no change here.
const mfAliasToks = new Map(mf.map((r) => [
  String(r.doc.id).toLowerCase(),
  [...new Set([r.doc.name, ...(r.doc.aliases ?? [])]
    .filter(Boolean)
    .flatMap((n) => String(n).toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' '))
    .filter((x) => x.length > 2))],
]));
head('Sources cited beyond what they preserve');
const subjHits = new Map();
for (const rec of records) {
  for (const att of Object.values(rec.doc?.attestations ?? {})) {
    // Disputed attestations cite sources too. Rules 45 and 48 were both blind to
    // `disputed[].sources` until 2026-09-11; this sweep carried the same blind spot until
    // 2026-09-12. A source cited ONLY from disputed blocks was invisible here.
    const citedIds = citedSourceIds(att);
    for (const id of citedIds) {
      const s = srcById.get(id);
      if (!s) continue;
      if (!subjHits.has(id)) subjHits.set(id, { n: 0, miss: 0, blob: JSON.stringify(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ') });
      const e = subjHits.get(id);
      e.n += 1;
      const toks = String(rec.doc.name ?? rec.doc.id).toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter((x) => x.length > 2);
      // A record id carries the archive's OWN abbreviation for its manufacturer; a source names
      // the manufacturer the way the publisher writes it. `mfjs-meilong-3c` cited to a page
      // titled "MoFang JiaoShi MeiLong 3c" scored 88% miss purely on that mismatch - 8 of 8
      // citations were sound. The archive already stores the mapping, so use it rather than
      // guessing: a manufacturer token counts as present if the source names the manufacturer
      // under ANY of its recorded name/alias spellings.
      const share = toks.length
        ? toks.filter((x) => e.blob.includes(x) || (mfAliasToks.get(x) ?? []).some((a) => e.blob.includes(a))).length / toks.length
        : 1;
      if (share < 0.6) e.miss += 1;
    }
  }
}
const over = [...subjHits.entries()]
  .filter(([, e]) => e.n >= 8 && e.miss / e.n >= 0.25)
  .map(([id, e]) => [id, e.n, Math.round((100 * e.miss) / e.n)])
  .sort((a, b) => b[2] - a[2]);
// The number printed is the MISS rate: the share of citations whose subject the source's
// preserved text does NOT name. It was previously printed under a heading that read as a HIT
// rate, which inverted the ranking for a reader - the worst row looked like the best one. Say
// which direction it runs, in the heading AND on every row.
line(`  sources cited >=8 times that FAIL to name the citing record's subject in at least`);
line(`  25% of those citations : ${over.length}   (higher % = worse; this is a MISS rate)`);
for (const [id, n, pct] of over) line(`     ${String(pct).padStart(3)}% miss  ${String(n).padStart(4)} cites  ${id}`);
line('  Confirm each by hand before acting. Manufacturer abbreviations are resolved through each');
line('  manufacturer\'s recorded aliases, but model and edition wording still matches on tokens.');

// ---- 11. reference_only against its own written criterion ---------------------------------
//
// RESEARCH_SPEC 2.4 defines reference_only for ONE purpose: "Products outside roughly 2016-2026,
// except where a predecessor or successor must be named to make a lineage intelligible - those
// get scope_class: reference_only, identity and aliases and nothing more." build.mjs enforces the
// consequence: PUBLIC_SCOPE is {core, conditional}, so these records never reach the public
// bundle.
//
// Measured 2026-09-11 (ledger P4-16) with a total divergence. NOT ONE reference_only model has a
// release or announcement date, so 2.4's own criterion is untestable against every record using
// the class. Checked another way - source capture years - all 13 were in circulation between 2019
// and 2026, inside the window. Nor are they the identity stubs 2.4 describes: they carry variants,
// specs and in several cases multiple sources.
//
// So a SECOND, UNDOCUMENTED meaning is doing all the work: "in-window product that meets neither
// the core nor the conditional bar". This reports the divergence rather than judging it, because
// closing it either legitimises hiding researched in-window products or forces 13 records to
// argue significance - both curation decisions, not data defects.
head('reference_only vs RESEARCH_SPEC 2.4');
const refOnly = mod.filter((r) => r.doc.scope_class === 'reference_only');
let dated = 0, stubs = 0;
const inWindow = [];
for (const r of refOnly) {
  const d = r.doc.released ?? r.doc.announced;
  const year = typeof d === 'object' ? String(d?.value ?? '').slice(0, 4) : String(d ?? '').slice(0, 4);
  if (/^\d{4}$/.test(year)) dated += 1;
  const hasVariant = va.some((v) => v.doc.model_id === r.doc.id);
  if (!hasVariant && !r.doc.specs) stubs += 1;
  // circulation evidence: the years its own sources were captured
  const ids = new Set();
  for (const att of Object.values(r.doc.attestations ?? {})) for (const s of citedSourceIds(att)) ids.add(s);
  const years = [...ids].map((id) => {
    const s = srcById.get(id) ?? {};
    const m = /\/web\/(\d{4})/.exec(s.archive_url ?? '');
    return m ? Number(m[1]) : Number(String(s.accessed ?? '').slice(0, 4)) || null;
  }).filter(Boolean);
  if (years.some((y) => y >= 2016 && y <= 2026)) inWindow.push(r.doc.id);
}
line(`  reference_only models                                  : ${refOnly.length}`);
line(`  carrying a release or announcement date                : ${dated}   <- 2.4's criterion needs one`);
line(`  that are identity stubs (no variants, no specs)         : ${stubs}   <- 2.4 says "nothing more"`);
line(`  evidenced in circulation INSIDE the 2016-2026 window    : ${inWindow.length}`);
if (dated === 0 && inWindow.length === refOnly.length) {
  line('  TOTAL DIVERGENCE: 2.4 describes a use no current record makes. See ledger P4-16 —');
  line('  the policy question is the user\'s to decide, not a data defect to fix.');
}

// ---- 12. product paths enumerated in our own sources but never chased ---------------------
//
// Found 2026-09-11 during depth research. The archive's sweep sources (CDX prefix enumerations)
// record every product path a retailer published. The pass that created each one acted only on
// what it was looking for at the time, so those excerpts are a QUEUE of leads — and reading them
// is cheaper than new discovery.
//
// The DaYan case: thecubicle-dayan-guhong-product-urls and thecubicle-dayan-products-prefix-2026
// between them named five DIY-kit paths, none of which had a variant record. Three became real
// variants the same day. Archive-wide the DIY axis existed in only 5 variants before that,
// despite having been enumerated in captures years old.
//
// This counts, per sweep source, how many enumerated paths contain a token that looks like a
// CONFIGURATION AXIS this archive models — diy, uv, maglev, coated, frosted, lite, matte — and
// how many of those tokens appear in no variant id for the same manufacturer. It is a lead
// counter, not a defect detector: a path may be out of scope, a bundle, a non-3x3, or a product
// the archive holds under another name. Every number here needs a human.
head('Unchased leads in our own sweep sources');
const AXIS = /\b(diy|uv|maglev|coated|frosted|lite|matte|magnetic|ballcore|ball-core)\b/;
// Paths this archive has already adjudicated and REJECTED, read from the sources that record
// those rejections. Without this the counter re-reports them every run and the reader learns to
// ignore it — the ShengShou YuFeng renames were rejected on 2026-09-11 and would otherwise
// reappear forever.
const rejectedPaths = new Set();
for (const s of src) {
  const text = `${s.doc.excerpt ?? ''}`;
  if (!/REJECTED|rename|not a configuration/i.test(text)) continue;
  for (const m of text.matchAll(/\b([a-z0-9]+(?:-[a-z0-9]+){2,})\b/g)) rejectedPaths.add(m[1]);
}
// Out of 3x3 scope by this archive's own rules. Without this the counter reports pyraminx,
// megaminx and 4x4 paths as "unchased leads", which wastes the reader's attention on products
// the archive correctly excludes — and a lead list nobody trusts is a lead list nobody reads.
const NOT_3X3 = /\b(2x2|4x4|5x5|6x6|7x7|8x8|9x9|1[0-3]x1[0-3]|pyraminx|megaminx|skewb|square|clock|fto|cuboid|kilominx|ivy|gear|mirror|redi|axis|dino|windmill|fisher|ghost|tool|kit-for|sticker|stand|bag|lube)\b/;
const variantIds = new Set(va.map((r) => r.doc.id));
const rows = [];
for (const s of src) {
  const text = `${s.doc.excerpt ?? ''}`;
  if (!/prefix|enumerat|CDX/i.test(`${s.doc.title ?? ''}${s.doc.preservation_note ?? ''}`)) continue;
  const paths = [...new Set([...text.matchAll(/\b([a-z0-9]+(?:-[a-z0-9]+){2,})\b/g)].map((m) => m[1]))];
  // Match on TOKEN SETS, not on a path tail. Retailer slugs reorder tokens freely —
  // `monster-go-3x3-magnetic-cube` is the archive's `monster-go-magnetic-3x3--standard`, and a
  // tail match calls it unchased. Tested: three of the first version's leads were products the
  // archive already held.
  const tokens = (s) => new Set(s.split(/[-_]/).filter((x) => x.length > 1 && !/^(3x3|cube|the|for|and|speed|puzzle|magic)$/.test(x)));
  const variantTokens = va.map((r) => tokens(r.doc.id));
  // A path ADJUDICATED AND REJECTED stays in the sweep source forever — that is the point of
  // preserving a rejection — so the counter must not keep re-reporting it. Any path named in
  // another source's excerpt alongside rejection language is treated as chased.
  const leads = paths.filter((p) => {
    if (!AXIS.test(p) || NOT_3X3.test(p)) return false;
    if (rejectedPaths.has(p)) return false;
    const pt = tokens(p);
    if (pt.size < 2) return false;
    // held if some variant shares at least 70% of this path's tokens
    return !variantTokens.some((vt) => {
      const shared = [...pt].filter((x) => vt.has(x)).length;
      return shared / pt.size >= 0.7;
    });
  });
  if (leads.length) rows.push([s.doc.id, paths.length, leads.length, leads.slice(0, 3)]);
}
rows.sort((a, b) => b[2] - a[2]);
line(`  sweep sources carrying enumerated paths : ${rows.length}`);
line('  ranked by paths naming a configuration axis with no matching variant:');
for (const [id, total, n, sample] of rows.slice(0, 8)) {
  line(`     ${String(n).padStart(3)} of ${String(total).padStart(4)}  ${id}`);
  line(`            e.g. ${sample.join(', ')}`);
}
line('  A LEAD COUNTER, NOT A DEFECT DETECTOR. A path may be a bundle, a retailer service tier,');
line('  or a product held under a name too different to match. Every number needs a human.');
line('  NOTE the largest entries are usually MODEL-layer gaps, not variant work: the WeiLong V11');
line('  and QiYi AI paths belong to P4-9 and cannot be acted on while the taxonomy is frozen.');

line();
line('audit complete — advisory only, nothing here blocks a build.');
