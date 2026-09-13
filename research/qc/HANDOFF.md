# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  8378e4d   (window 3; 21 commits from e286e3f~1)
DATE:  2026-09-13

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      525
sources:       597
events:        4

VALIDATION
npm run check:         0 errors, 30 advisory — baseline UNCHANGED all window. Breakdown:
                        14 r18  genuine minis and oversized cubes (40mm/42mm/45mm/15mm minis;
                                qiyi-qimeng-plus 90mm+262g; qiyi-warrior-plus 188mm+981g). Each
                                oversized cube raises TWO — one for size, one for mass.
                        10 r42  5 Speedsolving pairs kept deliberately (D-M1) + 5 chronological
                                citations where two captures ARE the claim
                         4 r40  model-predates-family — P3-D2, needs human decision
                         2 r27  Rubik's Phantom/Impossible `core` + `not_legal` — P4-12
npm run audit:         14 sweeps, advisory only
npm run escalations:   23 linked / 2 NOTFINDING / 0 unfiled / 0 dangling
                       "43 reports with escalation language and no block" is VOCABULARY, not
                       lost findings — adjudicated, see below. Do not re-panic over it.
npm run catalogue-gap: --fetch now 272 unmatched / 54 warnings (was 275 / 57)
npm run selftest:      every check behaved as specified, incl. both rule-52 branches
RULES:                 next free lint rule number is 53 (52 added this window)

LEDGER: 35 resolved / 15 open / 9 needs_human_decision (of 59)

SESSION 2026-09-12/13, WINDOW 3 — agent recovery, P4-9 alias mechanism, rule 52, P4-7 evidence

  AGENTS: ALL DEAD, AND DO NOT RELAUNCH BEFORE 4pm AMERICA/TORONTO. Lanes G/H/I/J were all
  killed by a Sonnet SESSION limit (HTTP 429, "resets 4pm"). A new agent launched before that
  reset will die immediately. Worktrees inspected and everything valuable is MERGED:
    F (GAN depth)        merged e286e3f — 5 MagLev missing-axis defects + 2 slug leads closed
    I (ShengShou depth)  merged — Jelly LE resolved, Legend 18cm escalation, 13 negatives
    J (spec adversarial) merged — 3 wrong-configuration weights fixed, 5 classes swept clean
    G (slug/facet)       uncommitted work recovered by hand — Umbreon edition + its source
    H (Ziina challenge)  SKELETON ONLY, nothing recoverable. P4-10 still outcome 4, unresolved.
  Lane worktrees may now be pruned; nothing unmerged remains in them.

  P4-9 GAINED A FOURTH MECHANISM. Alongside recency, discoverability and stock suppression:
  the archive HOLDS the model under a name no retailer uses. 167 of 269 models carry no aliases
  and catalogue-gap matches on names AND aliases, so these surface as false misses inside the
  "recency failure" bucket.
    REPAIRED: moyu-weilong-super <- "MoYu Super WeiLong"; moyu-weilong-v9 <- "MoYu WeiLong
      WRM V9" / "WR M V9". Both evidenced by sources ALREADY BOUND to the record.
    REFUSED: the M-vs-non-M pairs (yuxin-little-magic-v2/v3, yj-yulong-v2-m) — both makers sold
      magnetic and non-magnetic versions, so the absent "M" may be a different product.
    RULE, reusable: an alias is admissible iff (a) token multiset identical modulo word order,
      or (b) a source already bound to that model carries the retailer name verbatim.
    CONTROLLED BOTH WAYS: 275->272 unmatched AND WeiLong V10 still reported missing — the
      generation guard refused to let a V9 alias absorb it.
    ARCHIVE-WIDE: 467 bound retailer titles swept, ZERO further instances.
    Report: research/qc/p4-9-alias-blindness-2026-09-12.md

  WAYBACK IS BACK (CDX 200; /wayback/available still 429s — use CDX). Outage queue cleared:
    UPGRADED to archive_url: thecubicle-gan12-ui-maglev-powerpod-2026-edition
    NEVER ARCHIVED, flags resolved permanently: the DaYan Void page, the ESCube vendor facet,
      and lane G's Umbreon page. Each confirmed with a control query in the same minute.
    RESEARCH_SPEC 3.6a now states that FACET evidence cannot be archived at all — measured,
      34/34 facet URLs are excerpt-only and 5/5 return empty from CDX. Facet excerpts must
      reproduce the enumeration IN FULL; `excerpt` there is permanent, not provisional.

  RULE 52 (new): a date may not rest on a catalogue-ingestion artefact above `uncertain`.
    Zero live violations — that is why it is a rule: the class cost real adjudication once.
    Threshold is the CONFIDENCE, not the dependence. Fixtures zz-added-date (fires) and
    zz-ok-added-date (spared) cite the SAME source so confidence is the only variable.

  P4-7 — THE TEST IT ASKED FOR WAS RUN, ISSUE LEFT OPEN ON PURPOSE. Three strands all point to
  2018-09-11 being a migration stamp that CAN bound catalogue presence: the distribution
  (31/7/6 vs 1-4 for all 37 other values), later products carrying their own Added: dates
  (GAN 11 M Pro 2020-09-30), and no stamped product independently dated after it (7 of 18 have
  independent dates, all pre-2018). Still missing: those 7 are earliest-capture bounds, so one
  stamped product with a first-party post-2018 launch date would overturn it. No record changed.

  P26-2 — the "43 reports with escalation language and no block" number was adjudicated, not
  enforced. 36 of 43 predate the block convention; of the 7 since, zero are lost findings. The
  16 naming no ledger id are vocabulary: a quoted commit message, "flagged for the main session"
  (a write-lane handoff), and escalations recorded in record headers. No rule added.
  ONE ITEM FOR A HUMAN: pass3-escalation-valk.md documents E-VALK-1 and that id is in no ledger.

  SWEPT CLEAN (negative results, all recorded rather than discarded):
    crawl-date dating — 30 of 236 coincide with a capture, 11 survive the qualifier filter,
      0 defects. The discriminator is `qualifier: before`. No rule: legitimate uses dominate.
    name-asserted config axes — 21 gaps archive-wide, 0 are the lane-F defect class. Verified
      with a CONTROL: the same probe run against 0040c5b flags exactly lane F's 5 known defects.
    lane J's "left for a variant" class — only 2 models use that language and both figures are
      correctly placed (59.9g really is the Valk 3 Mini's, and that model records it).


SESSION 2026-09-12, WINDOW 3 — recovery after a session-limit kill, then P4-9

  RECOVERED. Four lanes (F GAN depth, G slug facet, H Ziina challenge, I ShengShou depth) were
  killed by the session limit. Only LANE F had committed: its worktree
  (.claude/worktrees/agent-af92a32654071072c) held 3 commits, all verified and MERGED at e286e3f.
  Lanes G, H and I left NO worktree and NO branch — their worktrees auto-clean when unchanged,
  which means they committed nothing. Nothing was recoverable; their scopes were relaunched.

  LANE F, verified before merge (do not blindly merge): five variants whose own NAME asserts
  MagLev while their config block omitted it — the same class as gan-356-maglev--uv-coated,
  caused by inheritance running MODEL -> VARIANT and the value sitting on a SIBLING. Checked
  that the shared PiCube source really does name all four products (it does, from an explicitly
  recorded collection listing, not a recommendation panel) and that `maglev: maglev` matches all
  five siblings. Two slug leads closed.

  P4-9 GAINED A FOURTH MECHANISM (main session). Alongside recency, discoverability and stock
  suppression: the archive HOLDS the model but under a name no retailer uses, and 167 of 269
  models carry no aliases at all. catalogue-gap matches on names AND aliases, so these surface
  as false misses inside the "recency failure" bucket.
    - REPAIRED: moyu-weilong-super <- "MoYu Super WeiLong"; moyu-weilong-v9 <- "MoYu WeiLong
      WRM V9" / "MoYu WeiLong WR M V9". Both evidenced by sources ALREADY BOUND to the record.
    - REFUSED: the M-vs-non-M pairs (yuxin-little-magic-v2/v3, yj-yulong-v2-m). Both makers sold
      magnetic and non-magnetic versions, so the absent "M" may be a different product.
    - ADMISSION RULE, reusable: alias admissible iff (a) token multiset identical modulo word
      order, or (b) a source already bound to that model carries the retailer name verbatim.
    - CONTROLLED BOTH WAYS: 275->272 unmatched, and WeiLong V10 is STILL reported missing —
      the generation guard refused to let a V9 alias absorb it. V10/V11 remain genuinely absent
      as models; the admission decision is still the taxonomy owner's.
    - ARCHIVE-WIDE SWEEP OF THE SAME CLASS: 467 bound retailer titles, ZERO further instances.
      First run said 79 and all were the probe's own artefacts (token-dropping made "X" and
      "X 3x3" identical; alias membership tested by exact string missed models already covered).
      Tightened probe carries 5 controls, all passing.
    - Report: research/qc/p4-9-alias-blindness-2026-09-12.md


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

ACTIVE AGENT LANES (wave 2/3; wave 1 was wiped by a session limit — see
research/qc/agent-lane-recovery-2026-09-12.md)
  RUNNING:
    LANE D  Provenance adversarial, READ-ONLY over data.
    LANE F  GAN variant depth (18 of 40 GAN models bare).
    LANE G  Vendor-facet RE-SWEEP with each retailer's REAL collection slug.
    LANE H  ADVERSARIAL REVIEW of Lane A's Ziina conclusion — told to CHALLENGE it, not repeat it.
  MERGED AND CLOSED:
    LANE C  escalation linkage — finished in main. check-escalations.mjs had ZERO coverage; now
            fixture-backed with 4 selftest assertions. Reverse link MEASURED at 13/59 and
            DELIBERATELY NOT ENFORCED (a rule would fire on 46/59 forever).
    LANE E  DaYan depth — 16 models swept CLEAN across 3 retailers (a documented negative, its
            most valuable output). One P4-9 candidate: a DaYan Void Cube ("no center pieces",
            so it fails the 4.2 separability test and cannot be a variant). On merge I corrected
            its excerpt, which quoted Shopify `grams` as weights — those are SHIPPING weights.
    LANE A  P4-10 Ziina — OUTCOME 4, UNRESOLVED, all five untried avenues worked. Packaging
            photography did NOT resolve it (box logo below legibility even at 8x; all legible
            text reads "ZIINA STAR"). NEW: a cubein.cn Ziina-vendor product ships in a
            COMPLETELY UNBRANDED "SPEED CUBE" box — but the listing itself says "Retail packing
            may vary", which I added as the strongest caution. It also caught and refused a
            FABRICATED search claim ("CubeIn is the manufacturer").
    LANE B  P4-9 enumeration methods — vendor facet (99 lines) vs category (96), 96 overlap,
            3 facet-only, ZERO category-only. Isolated the mechanism: SpeedCubeShop SUPPRESSES a
            "Backordered" listing from its category collection while still serving it via the
            facet — a third mechanism, distinct from recency and discoverability.
            CAUGHT A ONE-DAY-OLD MISS: "QiYi M Pro 3x3 V3", published 2026-09-11, absent from
            all 261 adjudicated candidates.
            AND CORRECTED MY OWN WORK: TheCubicle's QiYi slug is `qiyi-mofangge`, not `qiyi` —
            /collections/qiyi returns ZERO while qiyi-mofangge returns 247 (57 typed 3x3). My
            facet sweep ran on archive ids, so its "returned zero" list must NEVER be read as
            "this retailer does not stock that brand". Lane G is re-running it properly.

  COORDINATION RULE: no agent may touch the ledger or this handoff. MAIN owns both; agents put
  ledger-bound text in their reports and main transcribes at merge.
  MERGE RULE, and it has caught something every time: verify the agent's checkable claims
  yourself before merging. Lane E's grams, Lane A's JSON facts and Lane B's slug were all
  re-fetched independently.

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
  Later: GuoGuan closed (the Cubelelo MoYu sweep enumerates it UNDER the parent's prefix) and
  Calvin's Puzzle closed (both of today's facet enumerations list real products; the brand
  NEEDED the facet method since no product carries the brand in its handle).
  FIVE CANDIDATES WERE INSPECTED AND REJECTED, which is what makes the six closures
  trustworthy: a single product's category membership (yancheng); a single product page
  (newisland); ESCube, whose match was the word "prefix" inside "brand-word PREFIXED onto the
  product name"; and KungFu, which my own sweep source says returned zero products because the
  SLUG was wrong, not because the brand is unstocked. Citing either would have been false.
  ESCUBE THEN CLOSED ON A GENUINELY NEW SWEEP (its earlier match was the rejected false
  positive), and the sweep FOUND A CONFIGURATION: escube-air-v1--20-magnet-ball-core-
  transparent-core. Recorded as `standard` not `limited` (nothing states a bounded run) and
  the transparent core sits in config/materials/plastic, NOT colorway.body.translucency —
  that vocabulary describes the BODY and the claim is about the CORE.
  BREADTH NOW: 32 with a sweep, 24 non-US, 10 remaining (kungfu 10, newisland 9, senhuan 8,
  cubestyle 5, guojia 5, mohuanshousu 5, mojue 5, + 3 more). Slug-form probing found NO
  collection at either retailer for any of those under their archive ids.
  WAYBACK HAS BEEN HTTP 503 ALL DAY. Records made since rest on live fetches with
  preservation_method: excerpt and a note that they need re-verifying against an archive_url.
  Affected: thecubicle-escube-vendor-facet-2026,
  thecubicle-dayan-void-cube-limited-edition-2026, and the UNMERGED GuHong V2 DIY kit.

OPEN CRITICALS
  P4-9   adjudicated in full; taxonomy admission is the user's call
  P4-10  Ziina IS a manufacturer not a decorator; WHO MAKES IT is unestablished.
         Untried: packaging photography, Chinese-language search, trademark
         registries, 1688/Taobao. ziina.com is a UAE PAYMENTS COMPANY — never cite it.
  P26-2  mechanism built and all 25 escalations retrofitted; process change remains

NEXT ACTION   (ordered; each is startable cold)

  0. AGENTS: the Sonnet session limit resets 4pm America/Toronto. Do NOT launch a specialist
     lane before then — it dies on the first call. Main-session work below needs no agent.
     When agents are available again, the two lanes with unfinished scope are:
       H — the Ziina adversarial challenge (P4-10). It committed a SKELETON ONLY; its whole
           scope is unrun. Untried avenues: Chinese-language sources (Taobao/1688/Tmall),
           trademark and business-registry records, owner photos of packaging and manuals,
           moulded manufacturer marks. NEVER cite ziina.com — UAE payments company.
       G — the slug/facet re-sweep (P26-3). Its Umbreon find is merged; the systematic
           collection-slug-vs-manufacturer-id mismatch survey across all 54 manufacturers
           is NOT done. The known severity-3 case is TheCubicle filing QiYi under
           /collections/qiyi-mofangge.

  1. LANE I LEFT ONE ESCALATION UNADJUDICATED: "ShengShou Legend Plus Big 3x3 - 18cm"
     (180mm, 920g), found by an unscoped SpeedCubeShop CDX prefix sweep. It fails the
     DATA_MODEL 4.2 tooling test against both existing Legend models, so it is a MODEL
     candidate, and the taxonomy is frozen — the admission decision is the user's. Evidence
     is preserved at data/sources/speedcubeshop-shengshou-legend-plus-big-18cm-2025.yml.
     Note it would also raise two rule-18 advisories (size AND mass) if ever admitted.

  2. P4-9 ALIAS MECHANISM, the part deliberately left undone. The two M-vs-non-M pairs were
     REFUSED for want of evidence: yuxin-little-magic-v2 ("YuXin Little Magic M V2" vs the
     catalogue's "Little Magic 3x3 V2"), yuxin-little-magic-v3, yj-yulong-v2-m. Settling any
     one needs a source showing whether the maker sold a non-magnetic version under that
     exact name. Each resolved pair removes a false gap from catalogue-gap's miss list.

  3. DEPTH RESEARCH. Remaining no-sweep manufacturers: particula 28, mf8 26, giiker 17,
     guoguan 16. One-publisher manufacturers (all TheCubicle, no first-party source):
     lefun 34, x-man-design 27, fanxin 13, newisland 9, cubestyle 5, guojia 5, mefferts 3,
     pbcube 3 — a FIRST-PARTY source for any of these is worth more than another variant.
     Bare families, largest first: yj-mgc 7, dayan-zhanchi 5, witeden-mixup 4, yj-guanlong 4,
     dayan-bermuda 4, qiyi-warrior 4. DaYan remains the largest and most historically
     significant manufacturer gap.

  4. P4-12 items (1),(3),(4),(5),(6) and P4-16 — all needs_human_decision, all blocked on the
     taxonomy freeze. Batch-adjudicate only when the user opens it.

  5. P4-7 is one experiment from resolvable. Find ONE product with a FIRST-PARTY launch date
     after 2018-09-11 whose TheCubicle page carries "Added: 2018-09-11". Finding one overturns
     the migration-marker reading; a wider sweep finding none settles it for. Use CDX, and
     extract the value from the <td> AFTER <th>Added</th> — a naive regex returns a clean
     false negative. Validate any extractor against mojue-m3 / kungfu-qinghong-3x3 first.

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
