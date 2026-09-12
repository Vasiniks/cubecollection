# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  c3075f3
DATE:  2026-09-12

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      509
sources:       562
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
npm run audit:         13 sweeps, advisory only
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

OPEN CRITICALS
  P4-9   adjudicated in full; taxonomy admission is the user's call
  P4-10  Ziina IS a manufacturer not a decorator; WHO MAKES IT is unestablished.
         Untried: packaging photography, Chinese-language search, trademark
         registries, 1688/Taobao. ziina.com is a UAE PAYMENTS COMPANY — never cite it.
  P26-2  mechanism built and all 25 escalations retrofitted; process change remains

NEXT ACTION
  1. DEPTH RESEARCH, continue. One-config models are 106 (was 112 at session start).
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
