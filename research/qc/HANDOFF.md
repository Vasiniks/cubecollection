# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  a6a954f
DATE:  2026-09-11

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      500
sources:       554
events:        4

VALIDATION
npm run check:         0 errors, 26 advisory — EVERY ONE EXPLAINED:
                        10 r42  5 Speedsolving pairs kept deliberately (D-M1) + 5 chronological
                                citations where two captures ARE the claim
                        10 r18  genuine minis and oversized cubes — the 11th was a real defect
                                and was fixed (see below)
                         4 r40  model-predates-family — P3-D2, needs human decision
                         2 r27  Rubik's Phantom/Impossible `core` + `not_legal`; reclassifying
                                is a frozen-taxonomy call, escalated under P4-12
npm run audit:         12 sweeps, advisory only
npm run escalations:   23 linked / 2 NOTFINDING / 0 unfiled / 0 unmatched
npm run catalogue-gap: offline by default; --fetch to query three retailers
npm run selftest:      every check behaved as specified

LEDGER: 34 resolved / 16 open / 9 needs_human_decision (of 59)

THIS SESSION (2026-09-11) — 35 commits from c78ad75
  CLOSED   P4-5 (rule 41 11 -> 0, every baseline SEARCHED not backfilled)
           P4-14 (last item closed via a non-US retailer)
           P4-15 (both YuXin naming questions)
  ANSWERED P4-10 Ziina: first-party sweep EMPTY -> admission not justified
           P4-13 was NOT a schema gap; created the missing event row instead
           P4-16 measured: 0 of 13 reference_only models carry a date, so 2.4's
                 criterion is UNTESTABLE against all of them. Policy call = user's.
           P4-12 item (2): archive had NO WCA source; added the Regulations (tier 1),
                 3d2 makes Phantom/Impossible not_legal
  BUILT    `standards_body` source kind; `core_corner_plus_piece` magnet value;
           audit sweeps #10 (over-extended sources), #11 (reference_only vs 2.4),
           #12 (unchased leads in our own sweep sources)
  FIXED    speedsolving-wiki-moyu excerpt 839 -> 10,380 chars (172 attestations rested
           on a BRAND-HISTORY excerpt while 169 made PRODUCT claims); same for
           -mofang-jiaoshi. Verified after: ZERO attributed quotes now unpreserved.
           RULES 45 AND 48 were both blind to `disputed` attestations — a gross weight
           hid inside one for months. Both fixed, fixtured, selftested.
  DEPTH    variants 488 -> 500. Two methods that work: alternate-slug CDX sweeps
           (form differs PER BRAND) and reading our own sweep sources for unchased
           paths. NEGATIVES recorded as sources: GAN flagships already complete;
           ShengShou YuFeng's 4 paths are 2 products (identical SKUs = a rename).

OPEN CRITICALS
  P4-9   adjudicated in full; taxonomy admission is the user's call
  P4-10  Ziina IS a manufacturer not a decorator; WHO MAKES IT is unestablished.
         Untried: packaging photography, Chinese-language search, trademark
         registries, 1688/Taobao. ziina.com is a UAE PAYMENTS COMPANY — never cite it.
  P26-2  mechanism built and all 25 escalations retrofitted; process change remains

NEXT ACTION
  1. Depth research. One-config models 118 -> 112. Run `npm run audit` sweep #12 first;
     it names the leads and now excludes ones already rejected.
  2. P4-12 items (1),(3),(4),(5),(6) — batch adjudication when the taxonomy opens.
  3. 75 models rest on <=1 source AND <=1 variant — the thinnest records.

RECOVERY NOTES
- TAXONOMY IS FROZEN. Research and evidence preservation are allowed; creating or renaming
  a family/model/manufacturer is NOT, however strong the evidence. Escalate instead.
- EDIT THE LEDGER WITH scripts/ledger-append.mjs. Three hand edits silently landed in
  `counterevidence` instead of `evidence`, inverting their meaning.
- EDIT p4-9-adjudication.yml LINE-BASED. Two multiline-regex edits with re.S rewrote the
  LAST record instead of the target.
- A PROBE'S HIT COUNT IS WORTHLESS until you check what it matched. This session: 353
  false hits from a Map indexed as an object; 925 of 1052 from splitting on apostrophes;
  18 "identical variants" that differed in fields the key omitted; 3 "unchased leads"
  the archive already held. Prefer a probe that reports an IMPOSSIBLE value — that is
  what exposes its own bug.
- Wayback rate-limits and returns 503/504 intermittently. A failed fetch is NEVER
  evidence of absence — record it as unverified and move on.
```
