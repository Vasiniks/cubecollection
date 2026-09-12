# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  (see git log — 46 commits from 6249aac)
DATE:  2026-09-12

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      521
sources:       583
events:        4

VALIDATION
npm run check:         0 errors, 30 advisory — EVERY ONE EXPLAINED:
                        14 r18  genuine minis and oversized cubes. 10 pre-existing; FOUR ARE NEW
                                AND ALL FOUR ARE CORRECT — qiyi-qimeng-plus (90mm AND 262g, a
                                9cm cube) and qiyi-warrior-plus (188mm AND 981g, 18.8cm, "use it
                                as furniture"). NOTE IT IS FOUR, NOT TWO: each oversized cube
                                raises a warning for its size AND for its mass, because both
                                were recorded from the same verified table so a reader meeting
                                the mass sees the dimension beside it. Several commit messages
                                this session said "26 -> 28" — that was my arithmetic slip
                                (14+10+4+2 = 30) and this line is the correct figure.
                        10 r42  5 Speedsolving pairs kept deliberately (D-M1) + 5 chronological
                                citations where two captures ARE the claim
                         4 r40  model-predates-family — P3-D2, needs human decision
                         2 r27  Rubik's Phantom/Impossible `core` + `not_legal`; reclassifying
                                is a frozen-taxonomy call, escalated under P4-12
npm run audit:         14 sweeps, advisory only (#14 is new: refused-weight follow-up)
npm run escalations:   23 linked / 2 NOTFINDING / 0 unfiled / 0 unmatched
npm run catalogue-gap: offline by default; --fetch to query three retailers
npm run selftest:      every check behaved as specified

LEDGER: 34 resolved / 16 open / 9 needs_human_decision (of 59)

SESSION 2026-09-12 — 39 commits from 6249aac
  COUNTS: variants 501->517, sources 555->576, one-config models 112->104,
          weightless models 193->160, audit sweeps 12->14. Advisories 26->30 (all four new
          ones CORRECT: qiyi-qimeng-plus 90mm+262g, qiyi-warrior-plus 188mm+981g — each
          oversized cube raises one for size and one for mass).

  A. PROBE AND RULE FIXES
   - Sweep #10 printed a MISS rate under a heading that read as a HIT rate, so its worst row
     looked like its best and I worked them in the wrong order. Also blind to disputed, and
     ignorant of manufacturer aliases (`mfjs` vs "MoFang JiaoShi" = 88% false miss). All fixed.
   - THE `disputed` BLIND SPOT IS A CLASS. After rules 45/48 and sweep #10 it had been written
     3x, so every `att.sources` reader was classified. RULES 8, 12 and 42 ALL LEAKED; each was
     PROVED to leak against a fixture BEFORE the fix. Rule 42 now evaluates PER POSITION.
     One `citedSourceIds()` in lib/archive.mjs. Rules 43 and 9 deliberately excluded (reasons
     in code). 4 new selftest assertions. Archive impact zero (measured).
   - Sweep #12 could not see the LEDGER, where this project records decisions, so it kept
     re-reporting rejected DaYan paths. Scoping the harvest took THREE tries (too wide / too
     narrow / too many documents — 872 paths at worst). Settled: excerpts whole + ledger per
     issue = 77. Verified on 2 known negatives and 1 known positive, not on the count.

  B. METHODOLOGY (RESEARCH_SPEC)
   - 3.6b ADDED: completeness is FOUR dimensions (historical / current / generation / variant),
     each with detector + measurement. The CURRENT dimension had no section, and that is where
     P4-9's misses are: 15 of 20 confirmed-missing first listed 2024-2026. New sweep #13.
     Generation completeness got the OPPOSITE treatment — a contiguity probe was TESTED and
     FAILED (both hits are renumbering artefacts), so the negative was written and the probe
     NOT shipped.
   - 3.6a THIRD CHECK ADDED: sweep the retailer's BRAND FACET (Shopify `vendor` in
     /products/<handle>.json + brand collection), not only URL slugs. A prefix sweep is
     evidence about slugs, not about stock.
   - Sweep #14 ADDED: rule 45 refuses gross weights and left records with NO weight — 193 of
     269 models. SHIPPED AS A LEAD COUNTER WITH NO AUTO-SUBSET because three attempts to build
     one failed (shared sources / sibling-puzzle sources / short discriminating tokens).

  C. RESEARCH
   - WEIGHT QUEUE: 34 records added or corrected. Queue 40->8. THE GUARD THAT WORKS is the
     source's own Dimensions vs the model's size_mm — independent of tokenisation. It resolved
     qiyi-valk-3 (which cites a 4x4 and a 5x5 page for lineage) AND produced its own documented
     false positive (dayan-guhong-v3-m is 54mm like the Pro M whose table it is). RULE 23 caught
     the worse error there: GuHong Pro M sells in 54/55/56mm, so size is a VARIANT axis.
   - THE "unverified leads (no Wayback capture)" LIST WAS A RATE-LIMIT ARTEFACT, ALL FIVE.
   - 16 new variants incl. 2 DaYan DIY kits, 2 ZhanChi size DIY kits (evidence ALREADY cited by
     the record that said "no axis found"), MoYu WeiLong DIY kit + GTS/V2 Unstickered, 3 Super
     WeiLong LITE, WR M 2021 Lite, MoYu AI magnetic, WeiLong V9 5th config, GAN MagLev UV,
     i Carry 4 Frosted, moyu-aolong-v2--limited-edition (Lucas Etter sub-5 collector set —
     /edition/commemorates DELIBERATELY UNSET; linking it means creating a person on a blurb).
   - MOYU'S BREADTH GAP FULLY CLOSED (prefix sweep + non-US Cubelelo). CITING a sweep is what
     makes it count — the breadth check reads sources CITED BY a manufacturer's records.
   - GAN's own page gave the MagLev's 81.2g. The archive had NO weight because the only figure
     was a 250g GROSS, correctly refused. REFUSING A GROSS WEIGHT IS NOT THE END OF THE QUESTION.

  E. THE BRAND-FACET CHECK'S FIRST RESULTS (3.6a's new third check)
   - Ran on all 42 manufacturers at SpeedCubeShop, then on Calvin's at TheCubicle.
   - CALVIN'S PUZZLE: 23 typed-3x3 at SCS and 24 at TheCubicle, and ALL of them at BOTH have
     NO brand token in the handle. Invisible to every slug-based method. Archive holds 3.
     CFOP/Practice trainers, a 6-generation Sudoku line, World Maps, Calendars, "Yummy" food
     cubes. SAME PRODUCTS ARE NAMED DIFFERENTLY AT THE TWO RETAILERS (CFOP Trainer = Practice
     Special) — adding the catalogues would double-count. TheCubicle's version numbers
     reconcile SCS's five Sudoku names as V2-V6, plus a V1 only TheCubicle has.
   - fanxin 1 hidden (color-brick-speed-cube), qiyi 1 hidden (bubble-3x3, a QiYi 3x3 the
     archive does not hold — rounded ball-shaped pieces, typed 3x3 by the retailer).
   - mf8 CLOSED ON A NEGATIVE: its whole 101-product collection has ZERO typed 3x3 (60 shape
     mods, 29 minx). The archive's 3 mf8 models are NOT a thin sample of a big 3x3 range —
     there isn't one. Its 9 Crazy 3x3 Plus planet variants match the retailer one-for-one.
     Two "Son-Mum 3x3" shape mods are a SCOPE question for the taxonomy owner, not a gap.
     Sweeps 24->25, failing both 12->11. Remaining no-sweep: particula 28, giiker 17,
     guoguan 16, calvins-puzzle 12.
   - ALL ESCALATED UNDER P4-9, NOTHING ADMITTED. These are LIVE queries that preserve nothing.
   - P4-9 SHOULD NOW BE READ AS TWO MECHANISMS, not one: recency (15 of 20 first listed
     2024-2026) AND discoverability (a product invisible to the method, at any date).
   - THE SAME CATALOGUES GAVE 4 NEW QIYI VARIANTS (warrior-m UV, warrior-w Jelly, qimeng-plus
     magnetic, qimeng-v3 Icy Amber). And a useful NEGATIVE: dayan-guhong-pro-plus is complete
     SIX-FOR-SIX against the retailer (3 sizes x maglev/standard), and YuXin Little Magic is
     complete too. Where a line was researched properly it IS complete; the gaps are lines the
     discovery method never reached.

  D. MY OWN ERRORS, both caught by the archive's checks
   - Created a DUPLICATE Ziina Sigma source and claimed it as a new P4-9 find; Pass 4 Agent C
     had found and escalated it on 2026-09-03 with a FULLER description than I extracted.
     RULE 42 caught it on locator+capture. Deleted; ledger and commit corrected.
     GREP FOR AN EXISTING SOURCE BEFORE WRITING ONE.
   - Wrote an attestation into an `availability:` block; the schema caught it.

PREVIOUS SESSION (2026-09-11) — 35 commits from c78ad75
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

  P4-10 ZIINA — PROGRESS, STILL UNRESOLVED. THE ARCHIVE HAD THE WRONG BRAND STRING: the
  Shopify vendor field is "Ziina Star" (two words); SpeedCubeShop fronts a "Ziina Star (34)"
  collection and cubein.cn (CN domain) has 13 more. AND THE SLUGS CARRY NO BRAND AT ALL —
  cheese-3x3-uv-printed, world-map-3x3-3d-uv-printed, 1x1x2 — so a keyword sweep CANNOT find
  them. Two community origin claims exist and CONTRADICT (OEM rebrand vs separate-maker
  knockoff), which are exactly P4-10's two hypotheses. Strongest remaining avenue is now
  narrower: PACKAGING PHOTOGRAPHY (product images show a box). 1688/Taobao still untried.
  THAT MADE 3.6a's THIRD REQUIRED CHECK: sweep the retailer's BRAND FACET (Shopify `vendor`
  in /products/<handle>.json + the brand collection page), not only URL slugs.

ACTIVE AGENT LANES — ALL FIVE DIED ON A SESSION LIMIT, FOUR RELAUNCHED FROM 4873931
  The first wave (A-E, base 78d0097) was killed simultaneously by an HTTP 429 session ceiling
  ~9 minutes in. Every lane had COMMITTED its skeleton first, so nothing died silently. Full
  recovery record: research/qc/agent-lane-recovery-2026-09-12.md.

  LANE C IS DONE — recovered and FINISHED IN MAIN. check-escalations.mjs had ZERO test coverage
  (hardcoded relative paths); it now resolves through CC_DATA_ROOT, has pass+fail fixtures under
  tests/fixtures/*/research/qc/, and 4 selftest assertions. Rule 51 (ledger status vocabulary)
  added on a CLEAN baseline — all 59 issues already valid. The reverse link (ledger -> report)
  was MEASURED at 13 of 59 and DELIBERATELY NOT ENFORCED: a rule would fire on 46 of 59 forever
  for structural reasons. Report: research/qc/p26-2-escalation-linkage.md.

  RELAUNCHED (Sonnet 5, isolated worktrees, base 4873931), all told to COMMIT AFTER EVERY FINDING:
    LANE A  P4-10 Ziina — packaging photography is now the priority avenue.
    LANE B  P4-9 enumeration METHODOLOGY — three methods head-to-head, measured.
    LANE D  Provenance adversarial, READ-ONLY over data.
    LANE E  DaYan depth — FIRST TASK is re-verifying the recovered GuHong V2 DIY kit source.

  ONE RECOVERED ARTEFACT IS DELIBERATELY NOT IN THE ARCHIVE. Lane E wrote a complete source for
  `thecubicle-dayan-guhong-v2-diy-kit-2020` and I could not verify it — Wayback returned
  "Internet Archive: Temporarily Offline" on both attempts. It is preserved VERBATIM in the
  recovery report with the exact curl and the five strings to confirm. An unverified source does
  not enter data/ on an agent's word.

  COORDINATION RULE IN FORCE: no agent may touch research/qc/pass2-remediation-ledger.yml or
  research/qc/HANDOFF.md. MAIN owns both; agents put ledger-bound text in their own reports and
  main transcribes at merge. This is what stops parallel lanes conflicting on one file.

  IF THIS SESSION RESET: `git worktree list`, then per worktree `git status`, `git log --oneline
  -10`, `git diff`. Recover committed AND uncommitted work before relaunching. Resume only the
  unfinished portion.

MAIN-SESSION WORK SINCE THE RELAUNCH
  BREADTH: manufacturers with a recognised 3.6a sweep 23 -> 30; failing BOTH checks 13 -> 8;
  no-sweep list down to 12 (calvins-puzzle 12, escube 11, kungfu 10, + 9 more).
  GiiKER closed by a NEW first-party enumeration (its own Shopify store: 20 products, exactly
  ONE typed "speed cube"). MoYu closed earlier by two new sweeps. BUT Particula, Cube4you,
  EastSheen and GuoGuan were all closed WITHOUT NEW RESEARCH — the archive already held the
  enumeration and the detector could not read it.
  THAT IS THE DURABLE FINDING. SWEEP_EVIDENCE identifies a research METHOD by VOCABULARY
  ("prefix|enumerat|/collections/|catalogue structure|CDX"), so it mis-sorts in BOTH
  directions: it over-matches notes that merely MENTION CDX as a method (widening it moved the
  count 25->37, almost all false), and it MISSED four real enumerations that never used the
  word — a first-party site navigation, a storefront category page, a wiki product listing,
  and a sub-brand appearing under its parent's prefix. THE FIX WENT IN THE RECORDS, NOT THE
  REGEX: each source now states plainly that it contains an enumeration. Precise, true, one
  note each.
  Two candidates were INSPECTED AND REJECTED (a single product's category membership, and a
  single product page), which is what makes the four trustworthy.

OPEN CRITICALS
  P4-9   adjudicated in full; taxonomy admission is the user's call
  P4-10  Ziina IS a manufacturer not a decorator; WHO MAKES IT is unestablished.
         Untried: packaging photography, Chinese-language search, trademark
         registries, 1688/Taobao. ziina.com is a UAE PAYMENTS COMPANY — never cite it.
  P26-2  mechanism built and all 25 escalations retrofitted; process change remains

NEXT ACTION
  1. DEPTH RESEARCH, continue. Best remaining leads, all from thecubicle-moyu-prefix-2026
     and already enumerated in its excerpt: moyu-weilong-wrm-v9-* (4 config paths vs the 4
     variants v9 already has — check for a 5th, "ball-core-uv-special-edition"),
     — THOSE ARE NOW DONE (v9 5th config, wr-m-2021 lite, moyu-ai magnetic;
     rs3-m-2020-uv was already held; gts3-m-le has NO CDX capture).
     REMAINING NO-SWEEP MANUFACTURERS: particula 28, mf8 26, giiker 17, guoguan 16.
     REMAINING ONE-PUBLISHER MANUFACTURERS (all TheCubicle, no first-party source):
     lefun 34, x-man-design 27, fanxin 13, newisland 9, cubestyle 5, guojia 5, mefferts 3,
     pbcube 3 — a first-party source for any of these is worth more than a variant.
     Sweep #14's weight queue is worked down to 8 (from 40) and
     the remainder are the hard ones. Sweep #12's remaining leads are mostly P4-9 MODEL
     layer = frozen. Best untouched targets are the bare families: yj-mgc 7, dayan-zhanchi,
     witeden-mixup 4, yj-guanlong 4, dayan-bermuda 4, qiyi-warrior 4.
  2. DEPTH RESEARCH, continue. One-config models are 106 (was 112 at session start).
     REMAINING SWEEP-12 LEADS, triaged: gan356-m-e / gan356-maglev on gancube.com are
     FIRST-PARTY pages for models now resting on retailers — best provenance value.
     gan356-me-uv-...-10th-anniversary (me-v2 has uv-coated, no anniversary).
     gan12-ui-maglev powerpod x2 — likely BUNDLES, adjudicate and record the rejection.
     gan356-i-carry-2-uv-...-10th-anniversary — i-carry-2 already has BOTH separately.
     The rest of sweep 12's 20 thecubicle-3x3-collection leads are P4-9 MODEL layer = frozen. Ranked bare families,
     largest first: yj-mgc 7, dayan-zhanchi 5, witeden-mixup 4, yj-guanlong 4,
     dayan-bermuda 4, qiyi-warrior 4. DaYan is the largest manufacturer gap (21 of 28
     models bare) and the most historically significant. Sweep #12's remaining leads are
     now trustworthy — its DaYan entry is `thecubicle-dayan-per-family-product-urls-2026`
     (2 leads incl. speedcubeshop-dayan-zhanchi-size-diy-kits, which may cover 42mm/50mm
     DIY kits). RE-TEST ANY "no capture" NOTE BEFORE BELIEVING IT.
  2. P4-12 items (1),(3),(4),(5),(6) — batch adjudication when the taxonomy opens. One-config models are 112. Run `npm run audit` sweep #12 first;
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
