# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  ba87dae
DATE:  2026-09-12

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      517
sources:       575
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
npm run audit:         14 sweeps, advisory only (#14 is new: refused-weight follow-up)
npm run escalations:   23 linked / 2 NOTFINDING / 0 unfiled / 0 unmatched
npm run catalogue-gap: offline by default; --fetch to query three retailers
npm run selftest:      every check behaved as specified

LEDGER: 34 resolved / 16 open / 9 needs_human_decision (of 59)

SESSION 2026-09-12 (in progress) — 3 commits from 6249aac
  Audit sweep #10 printed a MISS rate under a heading that read as a HIT rate, so its
  worst row looked like its best and I worked them in the wrong order. Fixed, and both
  rows were then worked to the end: the 88% row was 8 sound citations defeated by
  `mfjs` vs "MoFang JiaoShi" (manufacturer tokens now resolve through recorded aliases),
  the 26% row was a real defect — gancube-cn-core-technology-history preserved only
  headline sentences while three attestation notes quoted sentences it never captured.
  Re-fetched, excerpt extended, 26% -> 5%. The re-fetch also found GAN's CN nav filing
  GAN356 X/XS under 旗舰魔方 in Jan 2025 while the .com nav excludes them in Aug 2026;
  both now preserved on `families/gan-356 /positioning`, value unchanged.
  THE `disputed` BLIND SPOT IS A CLASS. After rules 45/48 (2026-09-11) and sweep #10 it
  had been written three times, so every `att.sources` reader was classified. Rules 8,
  12 and 42 all leaked; each was proved to leak against a fixture BEFORE being fixed.
  Rule 42 now evaluates PER POSITION. One `citedSourceIds()` in lib/archive.mjs; rules
  43 and 9 deliberately excluded, with reasons in the code. 4 new selftest assertions.
  Archive impact zero — measured: 0 sources are cited ONLY from a disputed block.
  METHODOLOGY: RESEARCH_SPEC 3.6b added — completeness is FOUR dimensions (historical /
  current / generation / variant), each with its detector and its measurement. The
  current dimension had no spec section at all, and that is where P4-9's misses are:
  15 of 20 confirmed-missing first listed 2024-2026. New audit sweep #13 measures it —
  17 of 42 manufacturers have NO 2026 observation, MoYu among them on 79 records.
  Generation completeness got the OPPOSITE treatment: a contiguity probe was tested and
  FAILED (both its hits are renumbering artefacts), so the negative was written into the
  spec and the probe was NOT shipped. P4-9's methodology half is closed; admission is
  still the user's call.
  SWEEP #12 COULD NOT SEE THE LEDGER, so it kept re-reporting DaYan paths rejected the day
  before — commit c6e9c89 wrote that decision to the ledger and nowhere else. Scoping the
  rejection harvest took three tries (too wide / too narrow / too many documents; 872 paths
  at the worst point). Settled: source excerpts whole, ledger per issue, nothing else = 77
  paths. Verified on two known negatives and one known positive, not on the count.
  DEPTH: THE "unverified leads (no Wayback capture)" LIST WAS A RATE-LIMIT ARTEFACT, ALL
  FIVE OF IT. Every path has captures. 4 variants added (DaYan LingYun V2 + LunHui DIY
  kits, MoYu WeiLong DIY kit, MoYu WeiLong GTS Unstickered), 1 refused and escalated
  (WeiLong V10 AI WCU Edition names a model the archive lacks — P4-9).
  NOTE: commit 8141c8a's message says one-config went to 108. It went to 109 — only
  moyu-weilong-original left the bare bucket, as the GTS already had two variants.
  MORE DEPTH: 2 ZhanChi size DIY kits — the evidence was ALREADY in the archive and
  already cited, while the 50mm baseline said "no axis was documented by any source
  located" and cited a source titled "...50mm 3x3x3 DIY Kits". Probed that class
  archive-wide: ZERO others (validated against the pre-fix record from git). NOT shipped
  as a sweep — it keys on note prose, so a future zero would be meaningless.
  YJ APPARI: the two SpeedCubeShop slugs are ONE Shopify product renamed — same product id
  7129765478513 in three places, same SKU. REJECTED as a variant. The fetch also gave the
  baseline its first config: core_corner_plus_piece + adjustment `other`.
  PROBE CAVEAT: reading `"product_id"` page-wide returned a RECOMMENDED product's id and
  would have inverted that answer. Read identity from the block bound to the page's own
  handle, checked against the canonical URL.
  GAN LANE: gan-356-maglev--uv-coated (retailer states the coating in its own sentence);
  gan-i-carry-4--frosted; and the Year of the Horse edition GAINED its coating — it had an
  edition name and NO config at all. Applied the Appari lesson: checked product ids before
  calling them two products (they differ; Appari's matched).
  FIRST-PARTY WIN: gancube.com's own MagLev page gives 81.2g. The archive had NO weight,
  because the only figure was TheCubicle's 250g GROSS, correctly refused. REFUSING A GROSS
  WEIGHT IS NOT THE END OF THE QUESTION.
  THAT GENERALISED INTO SWEEP #14: 193 of 269 models carry no weight; 78 have a gross
  weight in their own sources; 40 have an "Item Weight" IN THE SAME TABLE, already cited,
  never recorded. Six recorded by hand (now 187 / 73 / 34). SHIPPED AS A LEAD COUNTER
  WITH NO "SAFE" AUTO-SUBSET, because three attempts to build one failed: shared sources
  (one GuHong table, six generations), sibling-puzzle sources (valk-3 cites a Valk 4 page,
  142g = a 4x4), and SHORT DISCRIMINATING TOKENS — tokenisers drop <3-char tokens and in
  this domain that token IS the generation number. Same defect as mfjs `3c` in sweep #10.
  WEIGHT QUEUE WORKED: 34 records added/corrected (6 + 18 QiYi + 9 variant-layer + 1
  corrected `unknown`). Queue 40 -> 8; weightless models 193 -> 161. Advisories 26 -> 28,
  both new ones CORRECT (qiyi-qimeng-plus 262g/9cm, qiyi-warrior-plus 981g/18.8cm).
  THE GUARD THAT WORKS is the source's own Dimensions vs the model's size_mm — independent
  of tokenisation. It resolved qiyi-valk-3 (which cites a 4x4 and a 5x5 page for lineage).
  IT ALSO HAS A DOCUMENTED FALSE POSITIVE: dayan-guhong-v3-m is 54mm like the Pro M whose
  table it is. RULE 23 caught the worse error there — GuHong Pro M sells in 54/55/56mm, so
  size is a VARIANT axis and the weight belongs on the 54mm-standard variant, not the model.
  A false `unknown` ("searched and not found" while the value sat in a cited source) turned
  up twice; measured the class = 3 candidates, all now correctly handled. NOT shipped as a
  sweep: post-fix its false-positive rate is 100%, from shared multi-product sources.
  MOYU'S BREADTH GAP IS FULLY CLOSED — both the prefix sweep AND a non-US source
  (cubelelo-moyu-products-prefix-2026, 132 paths, IN). Non-US 23 -> 24. The non-US catalogue
  EARNED it: Cubelelo sells GuoGuan and HuaMeng UNDER the MoYu prefix (independent
  sub-brand attribution) and carries every P4-9 candidate generation — so those are NOT a
  US-market artefact. Both sweeps cited on the 7 older MoYu baselines = two markets searched.
  INDEPENDENCE CASE STUDY: Cubelelo's AoLong V2 LE prose is WORD-FOR-WORD TheCubicle's
  (= one chain, not corroboration) but its STRUCTURED table is its own and independent —
  product weight 93g vs package 146g, and a Color Scheme field that RESOLVED whether the
  CUBE or the STAND is transparent green. Cite the two halves of such a page differently.
  DISCOVERY SWEEPS RUN (3.6a): YJ MGC line, and MOYU — the archive's most-cited
  manufacturer, top of the audit's "no sweep source" list for weeks. 23 -> 24 with a sweep;
  failing both 13 -> 12. CITING IT IS WHAT COUNTED: the breadth check reads sources CITED
  BY a manufacturer's records, so an uncited sweep source is invisible (correctly). Cited
  on 7 MoYu + 6 MGC baselines as a RECORDED SEARCH, not an absence.
  DEPTH FROM THOSE SWEEPS: 3x Super WeiLong LITE (packaging axis, retailer states it),
  moyu-aolong-v2--limited-edition (the Lucas Etter sub-5 collector set — /edition/commemorates
  DELIBERATELY UNSET, linking it would mean creating a person on a product blurb),
  moyu-weilong-v2--unstickered, gan-356-maglev--uv-coated, gan-i-carry-4--frosted.
  MY OWN ERROR, caught by RULE 42: I created a duplicate Sigma source and claimed it as a new
  P4-9 find. Pass 4 Agent C had already found and escalated it on 2026-09-03, and its source
  has a FULLER description than I extracted. Deleted; ledger + commit corrected.
  GREP FOR AN EXISTING SOURCE BEFORE WRITING ONE — second time this class has happened.
  TWO REUSABLE FINDINGS. TheCubicle's "Type: DIY Kits" does NOT mean unassembled — the GTS
  Unstickered page says "This DIY Kit actually comes assembled but without any stickers",
  so that category value alone never evidences assembly state. And "Added: 2018-11-07" now
  appears on FOUR products spanning 2011-2016 releases, which demonstrates the artefact
  rather than asserting it; the same 114g gross weight appears on two different puzzles.

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
