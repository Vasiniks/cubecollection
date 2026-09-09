# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  bd10a1c
DATE:  2026-09-09

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      485
sources:       531

VALIDATION
npm run check:         0 errors, 40 advisory  (13 r42 / 11 r41 / 11 r18 / 4 r40 / 1 r25)
                       rule 49 closed: all 8 exclusions signed and reasoned
                       now includes `npm run escalations`
npm run audit:         advisory only, 9 sweeps
npm run escalations:   23 linked / 2 NOTFINDING / 0 unfiled / 0 unmatched  (CLOSED)
npm run catalogue-gap: offline by default; --fetch to query three retailers
npm run selftest:      every check behaved as specified

COMPLETED THIS PHASE  (full detail: research/qc/post-pass4-qc.md)
- rule 42 rewritten (page vs capture identity); rules 47, 48, 49 added, fixtures both ways
- 15 CDX sweep locators repointed; 10 unpinned captures pinned; 6 duplicate sources merged
- 13 spec values preserved into their sources; 1 false-precision conversion corrected
- 2 inverted date qualifiers; 2 artefact-derived dates withdrawn
- P4-6 CLOSED (all 30 Speedsolving sources assessed); P4-11 RESOLVED (raised on a misreading)
- P26-2 / P26-3 measured; P26-2 MECHANISM BUILT (npm run escalations, in check) and all 25
  declared escalations retrofitted — 18 had never been filed; closed via P4-12..P4-15
- P4-9 FULLY ADJUDICATED: research/qc/p4-9-adjudication.yml, 261 of 261 classified

P4-9 ANSWER — "both, at two layers, with different fixes"
  MODEL LAYER  12 of 20 confirmed-missing are later generations of held lines; 8 are MoYu.
               RECENCY failure. `npm run catalogue-gap` covers it.
  MANUFACTURER 7 vendors absent from the 54 (Ziina 51 lines). BREADTH failure. Nothing in
               the archive could ever surface these. Pass 1 work. Escalated as P4-10.
  48% of candidates were correctly NOT gaps. The tool over-reports by design.
  WRM crux settled: "WRM V9" IS the archive's moyu-weilong-v9 under its full retail name.

OPEN ISSUES  (24 of 54 not resolved; ledger research/qc/pass2-remediation-ledger.yml)
  P4-9   crit  adjudicated; taxonomy admission is the user's call
  P4-10  crit  Ziina IS a manufacturer not a decorator (settled); WHO MAKES IT is not
  P26-2  crit  mechanism now built; 18 UNFILED escalations are the remaining work
  P26-3  high  3.6a coverage table in audit; 12 manufacturers fail both checks
  P26-8  high  narrowing confirmed; addressed by the same mechanism
  P4-8   med   9 manufacturers on one US retailer
  plus P4-2/P4-4, P4-5, P4-7, P26-6/7/9/11/14/15, E2, D-F4, D-F5, C-B1, P3-D2/T2/T3

AGENTS
  none running. worktrees: 1 (main only).

NEXT ACTION
  1. Ziina "who makes it" — blocks admission. Needs FIRST-PARTY or specialist evidence,
     not another retailer. SpeedCubeShop says "Ziina Star", TheCubicle says "Ziina"; all
     13 SpeedCubeShop listings are UV-printed, so the ONLY evidence of a base Ziina cube
     anywhere is one TheCubicle listing.
  2. P4-5 — 11 GAN-pilot baselines assert nothing (11 of the 40 remaining warnings).
     Needs real GAN smart-line research; do NOT backfill an unsubstantiated attestation.
  3. P4-12..P4-16 newly filed and untouched — boundary / schema / naming / scope-class.

RECOVERY NOTES
- TAXONOMY IS FROZEN. Research and evidence preservation are allowed; creating or renaming
  a family/model/manufacturer is NOT, however strong the evidence. Escalate instead.
- research/qc/p4-9-adjudication.yml: candidates are regenerable
  (`npm run catalogue-gap -- --fetch --json`), ADJUDICATIONS ARE NOT. Preserve them.
- EDIT THAT FILE LINE-BASED. Two multiline-regex edits with re.S silently rewrote the LAST
  record instead of the target. Both were caught by diffing before commit.
- Wayback rate-limits after ~20 sequential fetches. A failed fetch is NEVER evidence of
  absence — record it as unverified and move on.
- catalogue-gap is INFRASTRUCTURE, not truth. Every line it prints needs confirmation; its
  silence confirms nothing.
- Retailer `vendor` fields are good for attribution; TITLES ARE NOT (splitting "QiYi X-Man"
  on the hyphen invented an 8-SKU product line).
```
