# Final Adversarial Sweep — Lane E

## SCOPE
Last hostile pass before the research phase is declared stable: what could still be wrong while
every current check (`npm run check`, `npm run audit`, `npm run selftest`) passes clean? This is
not a first look — provenance (lane D + lane C before it), specs (lane J), and nine chronology/
taxonomy sweeps (2026-09-12/13) already ran. This lane's only job is what THEY did not reach.
Read in full before starting: `research/qc/provenance-adversarial-lane-d.md`,
`research/qc/spec-adversarial-lane-j.md`, `research/qc/chronology-adversarial-2026-09-12.md` (nine
sub-sweeps), `research/qc/HANDOFF.md`, `scripts/lib/archive.mjs`, `scripts/lint-semantic.mjs`,
`scripts/audit.mjs`, `scripts/validate.mjs`, `scripts/selftest.mjs`, `DATA_MODEL.md` §4
(variant/model boundary).

## BASE COMMIT
da8b6eb (main) — "docs: checkpoint P4-7's sweep and the MoreTry adjudication"

## WHAT PRIOR LANES ALREADY CLOSED (not re-run)
- Source identity: duplicate captures under two ids, archive_url-vs-url mismatch, Wayback CDX
  used as a pinned capture, source-content shingle-overlap dedup (0.56 max, both legitimate) —
  lane D + chronology sweep 6.
- Evidence preservation: attestation-note-quote-vs-excerpt sweep (675 quotes, found CONFIRMED-1,
  98% FP on the rest) — lane D. Grouped multi-capture record handling — lane D + chronology
  sweep 3 (dates).
- False independence / copied retailer prose (RESEARCH_SPEC 3.2): shingle probe validated
  against 2 known positives, both already disclosed — lane D.
- Confidence-vs-tier (rule 43), tier-5-in-disputed (rule 12), critical-field-in-disputed (rule 8),
  same-page-in-disputed (rule 42), gross-weight-in-disputed (rule 45), numeric-absent-in-disputed
  (rule 48), Added-artefact-in-disputed (rule 52): all six deliberately read `citedSourceIds()`
  and are fixture-tested in `selftest.mjs`. Rule 43's OWN tier floor and rule 9's `confirmed`
  arithmetic deliberately read `att.sources` only, by design, documented inline — not a leak.
- Spec classes 1 (gross/package weight), 2 (shipping dims), 3 (false-precision conversion), 5
  (bundle contents), 9 (no-op variant override), 10/weight_g (sibling-configuration weight
  silently inherited, 3 confirmed + fixed) — lane J.
- Chronology: exact-date sweep (16/16 sound), succession ordering (58/0), date-later-than-capture
  (discarded, 39/39 false), spec coherence (9/9 discarded, refined probe returns real 0), taxonomy
  stress test (name collisions 0, brand-in-name 0, model/family mismatch 0, near-name-pairs 160
  discarded as the naming convention itself), variant axis-named-not-recorded (1 real defect,
  fixed same day; 109-gap `none`-vs-absent convention question documented, not bulk-edited),
  source resilience under an IA outage, source-identity content dedup (chronology sweep 6, same
  as lane D's independent build of the same idea), Added-artefact dates (rule 52 shipped),
  crawl-date-as-release-date (0/11 survive qualifier filter), P4-7 catalogue-presence experiment
  (stays `needs_human_decision` on purpose).

## SWEEPS PLANNED THIS LANE (new ground only)
1. **Spec class 6 (lane J, unattempted): recommendation/cross-sell panel contamination of a LIVE
   spec or config value.** HANDOFF records this trap being caught twice during research
   (maru.tw ~20-product panel misattributed to LeFun; a Bermuda Triangle "you might also like"
   sibling) — both caught before they reached a record. This asks whether a THIRD, uncaught
   instance exists in `data/` today.
2. **Spec class 8 (lane J, unattempted): disputed values bypassing checks.** Not the tooling
   blind spot (already closed six ways) but the DATA-level question: does any record's prose,
   derived field, or a different pointer treat one `disputed[]` candidate as settled without the
   attestation itself saying so?
3. **Spec class 4 extension: non-numeric config values absent from their cited source.** Rule 48
   only checks `typeof value === 'number'`. Enum fields (`coating`, `magnet_configuration`,
   `core_system`, `maglev`, `adjustment_system`) and `materials` have no equivalent guard.
4. **Spec class 7 (lane J, unattempted): a spec value asserted from the record's own name/id
   alone**, with no cited source stating the fact independent of the name string.
5. **Variant semantics: two variants of one model with byte-identical `config` AND `colorway`
   but different `edition.designation`/`name`.** `fingerprint()` in `archive.mjs` includes
   designation/name as identity fields BY DESIGN, so two records describing what may be the same
   real object under two marketing names would not collide in `check-duplicates.mjs`. Checking
   whether this theoretical gap has a real instance.
6. **Taxonomy: alias collisions** — an alias of one model equal (normalised) to the canonical
   name or an alias of a DIFFERENT model, especially across a manufacturer boundary. The
   2026-09-12 taxonomy sweep tested normalised NAME collisions and brand-name-inside-model-name;
   it did not test alias-vs-alias or alias-vs-canonical-name.
7. **Provenance: brand/company-history-kind sources cited for a product-specific spec claim**
   (weight/size/config, not description/dating/lineage). Spot-checked five candidates
   (`gancube-cn-core-technology-history`, `cubetwist-com-2010-3x3-listing`,
   `giiker-about-us-2022`, `qiyitoys-company-history`, `rubiks-history-2024`) by hand before
   committing to a mechanical sweep; recording the archive-wide version regardless of what the
   spot check shows.

Each sweep will be run with PROBE DISCIPLINE: known positive/negative tested where one exists,
every hit inspected by hand before a count is reported, and any probe whose false-positive rate
is high will be reported as discarded rather than silently redone until it looks clean.

## STATUS
IN PROGRESS — skeleton committed first per instructions. Sweeps logged below as they run.
