# HANDOFF — read this first after any reset

**This is the recovery entry point.** It is kept short and current on purpose. Do not re-read the
whole project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  (see git log -1)
DATE:  2026-09-09

CANONICAL COUNTS (verify with: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      485
sources:       530

VALIDATION
npm run check:         0 errors, 40 advisory
npm run audit:         advisory only, 9 sweeps
npm run catalogue-gap: offline by default; --fetch to query three retailers
npm run selftest:      every check behaved as specified

COMPLETED (post-Pass-4 QC phase — full detail in research/qc/post-pass4-qc.md)
- rule 42 rewritten: page vs capture identity, two citation branches
- rules 47, 48 added, with pass AND fail fixtures for every branch
- 15 CDX sweep locators repointed; 2 multi-page records repointed
- 10 unpinned Wayback captures pinned; 1 calendar-wildcard replaced
- 6 duplicate GAN source pairs merged (534 -> 528 sources)
- 13 spec values preserved into their sources' excerpts
- 1 false-precision conversion corrected (mfjs-meilong-3c)
- 2 inverted date qualifiers corrected; 2 artefact-derived dates withdrawn
- P4-6 CLOSED: all 30 Speedsolving wiki sources assessed
- P26-2, P26-3 measured (were narrative, now coverage tables in npm run audit)
- npm run catalogue-gap built

NEW FINDINGS
- P4-9 (CRITICAL, needs_human_decision): 14 current product lines absent from the
  frozen 269, incl. MoYu WeiLong V11 and X-Man Tornado V5 — the current flagships of
  two major manufacturers. Listed 1-6 years BEFORE Pass 3 ran. Evidence preserved in
  data/sources/thecubicle-3x3-collection-enumeration-2026-09.yml and
  data/sources/cross-retailer-3x3-enumeration-2026-09.yml
- P4-7 (open question): does the 2018-09-11 artefact bound catalogue PRESENCE?
- P4-8: 9 manufacturers rest on one US retailer with no first-party source

OPEN ISSUES (ledger: research/qc/pass2-remediation-ledger.yml)
  P4-9   crit  needs_human_decision  taxonomy admission is the user's call
  P26-2  crit  open                  roll-up linkage measured as ABSENT (0 of 25)
  P26-8  high  open                  same, narrowed to the report layer
  P26-3  high  open                  3.6a coverage table; 12 manufacturers fail both
  P4-8   med   open                  source concentration
  P4-2/4 med   needs_human_decision  model-layer gaps, frozen boundary
  P4-5   low   open                  11 GAN baselines assert nothing
  P4-7   low   needs_human_decision  artefact-as-bound question
  P26-14 low   open                  detector built and DISCARDED (90% FP)
  P26-15 low   open                  Tank/Gem mould geometry unproven

AGENTS
  none running. worktrees: 1 (main only).

P4-9 ADJUDICATION — COMPLETE
  File: research/qc/p4-9-adjudication.yml  — all 261 classified, 0 unadjudicated.
  Regenerate candidates: npm run catalogue-gap -- --fetch --json
  Adjudications are NOT regenerable. Preserve them across any regeneration.
  RESULT: missing_manufacturer 71 / not_3x3 60 / needs_research 44 / service_listing 32
          confirmed_missing 20 / alternate_naming 14 / variant 12 / bundle 6 / other 2
  ANSWER: BOTH, at two layers with different fixes.
    MODEL LAYER   — 12 of 20 confirmed-missing are later generations of held lines,
                    8 of those 12 are MoYu. A RECENCY failure. catalogue-gap covers it.
    MANUFACTURER  — 7 vendors absent from the 54 (Ziina 51 lines). A BREADTH failure.
                    Nothing in the archive could ever surface these. Pass 1 work.
                    Escalated separately as P4-10.
  48% of candidates were correctly NOT gaps. The tool over-reports by design.

NEXT ACTION
  Highest-value unresolved consequence of the above, in order:
  1. P4-11 scope policy (mini/keychain + oversized). Decidable from the archive's OWN
     records with NO new research, and it unblocks ~15 of the 44 needs_research.
  2. P4-10 Ziina: establish decorator-vs-manufacturer from first-party evidence
     BEFORE any entity record. Do not create records from a retailer vendor field.
  3. The WRM V9/V10 naming crux — settles whether P4-9's gap is 20 or 19.

RECOVERY NOTES
- TAXONOMY IS FROZEN. Research and evidence preservation are allowed; creating or
  renaming a family/model is NOT, however strong the evidence. Escalate instead.
- Wayback rate-limits after ~20 sequential fetches. A failed fetch is NEVER evidence
  of absence — record it as unverified and move on.
- catalogue-gap is INFRASTRUCTURE, not truth. It over-reports by design. Every line
  it prints needs human confirmation; its silence confirms nothing.
- Retailer `vendor` fields are trustworthy for manufacturer attribution; titles are
  NOT (splitting "QiYi X-Man" on the hyphen invented an 8-SKU product line).
