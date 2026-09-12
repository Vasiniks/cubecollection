# HANDOFF — read this first after any reset

**This is the recovery entry point.** Kept short and current on purpose. Do not re-read the whole
project after a reset: read this, then `git log --oneline -12`, then continue.

```
CHECKPOINT
HEAD:  db7cf1d
DATE:  2026-09-11

CANONICAL COUNTS  (verify: for d in manufacturers families models variants sources; do
                   find data/$d -name '*.yml' | wc -l; done)
manufacturers: 54
families:      132     FROZEN
models:        269     FROZEN
variants:      500
sources:       553

VALIDATION
npm run check:         0 errors, 27 advisory — EVERY ONE IS EXPLAINED, none is unattended:
                         10 r42  5 Speedsolving pairs kept deliberately (D-M1) + 5 chronological
                                 citations where two captures ARE the claim
                         11 r18  genuinely out-of-range models (minis, oversized) — correct
                          4 r40  model-predates-family conflicts — P3-D2, needs human decision
                          0 r41  P4-5 CLOSED — all 11 baselines searched, none backfilled
                       rules 25, 49 closed; rule 41 11 -> 2. Advisory total 27 -> 27.
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

OPEN ISSUES  (25 of 59 not resolved; ledger research/qc/pass2-remediation-ledger.yml)
  P4-9   crit  adjudicated; taxonomy admission is the user's call
  P4-10  crit  Ziina IS a manufacturer not a decorator (settled); WHO MAKES IT is not
  P26-2  crit  mechanism now built; 18 UNFILED escalations are the remaining work
  P26-3  high  3.6a coverage table in audit; 12 manufacturers fail both checks
  P26-8  high  narrowing confirmed; addressed by the same mechanism
  P4-8   med   9 manufacturers on one US retailer
  plus P4-2/P4-4, P4-5, P4-7, P26-6/7/9/11/14/15, E2, D-F4, D-F5, C-B1, P3-D2/T2/T3

AGENTS
  none running. worktrees: 1 (main only).

ALSO DONE THIS WINDOW
  rule 49 CLOSED — 8 unsigned exclusions: reasoning RECOVERED from lane reports, not
    invented. P4-16 filed: reference_only carries a second, undocumented meaning.
  P4-5 — rule 41 11 -> 2 by real research. Unlocked by SLUG-FORM discovery (gan356- not
    gan-356-, monstergo- not monster-go-, gan12-ui not gan-ui). Recorded under P26-3.
    NOTE: the form must be checked PER BRAND — cyclone-boys is the hyphenated one.
  rule 25 amended — was unsatisfiable; now accepts a recorded sibling search (+ fixtures).
  3 more split-extraction source pairs merged; the 10 remaining r42 findings all explained.
  P26-7 CLOSED — Dolphin gloss + HaiTun ZhanLang alias, both sourced.
  P26-6 VERIFIED — 8 of 11 leads confirmed as real retailer paths; now a queued admission
    decision rather than an unverified-leads issue.
  scripts/ledger-append.mjs — written after three updates misfiled into counterevidence.

THIRD WINDOW (2026-09-11)
  P4-10  Ziina first-party sweep RUN and EMPTY -> admission NOT justified (outcomes 4+5).
         Alibaba subdomains return 200 for ANY name (control-tested) — not evidence.
         `Supplier_REX` is who the RETAILER BUYS FROM, not who makes it (LeFun proves it:
         established manufacturer, Supplier_Wells). Untried: packaging photography,
         Chinese-language search, trademark registries, 1688/Taobao.
  P4-5   CLOSED. rule 41 = 0. Last two closed on GAN FIRST-PARTY storefront sweeps.
         Lesson recorded: model EXISTENCE and model SPECS have different evidence bars —
         monster-go-352-m's specs were already `confirmed`; only the VARIANT-layer
         assessment was missing.
  P4-13  Not a schema gap. data/events/ already existed + rule 2 already enforces the
         link as a BLOCKING error. Created the missing event row; all 3 commemorates
         links resolve. Jelly LE half reclassified Type E (which of 2 generations).
  P4-14  Vocabulary gap `core_corner_plus_piece` added — the archive was splitting one
         described magnet arrangement two ways. THEN the real finding: 172 attestations
         rested on speedsolving-wiki-moyu's 839-char BRAND-HISTORY excerpt while 169 made
         PRODUCT claims. Every claim was CORRECT; only preservation was truncated.
         Excerpt 839 -> 10,380; measure 95% -> 2%. Same repair on -mofang-jiaoshi.
         New audit sweep #10. CubeTwist white-face corroborated from sibling nav.
  P4-16  MEASURED. TOTAL divergence: 0 of 13 reference_only models carry a date, so 2.4's
         criterion is UNTESTABLE against all of them; all 13 are evidenced in circulation
         2019-2026 and none is an identity stub. Audit sweep #11. Policy call = user's.
  P4-12  Item (2) ANSWERED. The archive had NO WCA source at all — 16 legality claims
         all inferred from mechanism. Added wca-regulations-2026-04 (tier 1, the
         governing document). Reg 3d2 makes Phantom/Impossible not_legal. Rule 27 then
         correctly fired on `core` + `not_legal`; reclassification is a frozen-taxonomy
         call, escalated not acted on, and BOTH records explain the warning.
         New `standards_body` source kind so the WCA is not filed as a manufacturer.
  P4-15  CLOSED. Kirin/Kylin are DISTINCT lines (both spellings are separate paths at
         two retailers) — merging would have destroyed a real distinction. Little Magic
         V3 raised uncertain -> probable.

  ADVERSARIAL QC DONE — research/qc/adversarial-sweep-2026-09-11.md. Six sweeps, ZERO real
  defects, four broken probes. No rule added: none describes an invariant the archive
  violates. Traps documented so the next sweep does not rediscover them.

DEPTH RESEARCH (one-config models 118 -> 113; variants 488 -> 496)
  TWO METHODS THAT WORK, both now automated:
   (a) alternate-slug CDX sweep — gan356-* not gan-356-*, monstergo- not monster-go-.
       Form must be checked PER BRAND (cyclone-boys is the hyphenated one).
   (b) `npm run audit` sweep #12 — counts paths enumerated in our OWN sweep sources that
       were never chased. The DaYan DIY-kit axis had sat in those excerpts for years.
  Added: gan-356-me-v2--uv-coated, gan-356-m--lite, gan-356-m--uv-coated,
         gan-356-m-e--brainstorm-voyage, gan-356-m-e--lunar-new-year-2025,
         dayan-{guhong-v1,panshi-v1,zhanchi-v1}--diy-kit,
         moyu-weilong-gts--illusion (SERVICE variant, TheCubicle shell swap),
         moyu-weilong-gts2--diy-kit (at `uncertain` — its page never says DIY),
         shengshou-fangyuan-original--gift-box (retailer calls it a variant itself).
         huameng-tg-v2--8-magnet-ball-core-uv (Cubelelo revealed a 2-config axis).
  VERIFIED COMPLETE: YJ MGC, QiYi, ShengShou Legend/Metallic and GAN flagships 12-15 are
  already fully covered — checked systematically, not assumed. Only yj-mgc-sigma is
  missing and that is the known P4-4 MODEL gap.
  P4-14 CLOSED. P4-8 advanced: huameng resolved via a non-US retailer; the other 8 were
  CHECKED — Cubelelo stocks none of them, Kewbz stocks only LeFun shape mods. Their
  single-source dependence is partly a property of thin international distribution, so
  the remedy is first-party/specialist evidence, not more retailers.
  NEGATIVE RESULTS, both recorded as sources so they are not re-derived:
   - GAN flagships 12-15 are ALREADY complete; every named LE was held.
   - ShengShou YuFeng's 4 retailer paths are 2 products (identical SKUs) — a rename.
  Unchased and capture-less: dayan-lingyun-v2-diy-kit, dayan-lunhui-diy-kit.

NEXT ACTION
  1. Continue depth. Largest remaining one-config gaps: dayan (21), yj (19), qiyi (17),
     shengshou (16). Run `npm run audit` sweep #12 first — it names the leads.
  2. P4-14 remainder: huameng-tg-v2 needs a second independent source.
  3. P4-12 items (1),(3),(4),(5),(6) — batch adjudication when the taxonomy opens.

  P4-14 nearly closed: only huameng-tg-v2 thinness remains (6 attestations on ONE
  TheCubicle source, 4 at `uncertain`; needs a second independent source).

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
