# Pass 2.6 — Agent E: lost-lanes recovery (DaYan / YJ / ShengShou)

**Session:** 2026-09-07 · **Branch:** `p26-e` · **Baseline:** `check` green at 0 errors / 5
advisory warnings before and after this session's writes.

This recovers what Pass 3 Batch 1's two rate-limit-killed lanes (Agent C: DaYan, Agent D:
YJ+ShengShou) found but never reported, and adjudicates the one proven escalation
(`thecubicle-shengshou-products-prefix-2026`) plus everything adjacent to it. Written
incrementally, one section per task, each committed on completion — the discipline this
lane exists to enforce.

**No family, model, manufacturer, or variant record was created, renamed, merged, split, or
re-parented in this session**, per the freeze. All new writes are `data/sources/*.yml` plus
this report.

---

## Task 1 — ShengShou YuFeng: verdict

**YuFeng is a genuine missing family. Two generations are established. Recommended for
pass-2 reopening as `established missing family`.**

### Evidence

Both generations' actual product pages were fetched (not just the bare CDX path list the
prior lane had):

- **YuFeng 3x3 M (Magnetic Core)** — `thecubicle-shengshou-yufeng-3x3-m-2023`. TheCubicle,
  captured 2023-02-05: "The ShengShou YuFeng M is a new flagship 3x3 that features a magnetic
  core, piece feet magnets, and adjustable tension system." $19.99, 56.0mm, 223g gross /
  76.2g item weight, magnetic. A customer review adds first-hand detail the manufacturer copy
  omits: ShengShou's own marketing originally called this cube "MagLev" (the URL slug still
  reads `-magelev`), and the retailer removed that claim from the page after a customer
  publicly disputed it — the product is magnetic-core, **not** true MagLev. The review also
  names sibling "YuFeng 4x4 and 5x5" as existing cross-category products.
- **YuFeng V2 3x3 M** — `thecubicle-shengshou-yufeng-v2-3x3-m-2023`. TheCubicle, captured
  2023-06-03: "a magnetic puzzle with vibrant stickerless bright shades, hand-adjustable
  compressions, and decent turning right out of the box." $22.99, 56.0mm, 224g gross / 80.0g
  item weight, magnetic. A distinct product page/slug, not a re-listing.

**Second-retailer corroboration (RESEARCH_SPEC 3.6a):** `speedcubeshop-shengshou-products-prefix-2026`
independently confirms both generations under SpeedCubeShop's own slugging
(`shengshou-yufeng-3x3-magnetic-magnetic-core`, first capture 2023-03-06;
`shengshou-yufeng-v2-3x3-magnetic-magnetic-core`, first capture 2023-09-21), plus later
re-slugged paths (`-v1-magnetic-core-magnets` / `-v2-magnetic-core-magnets`, 2025) showing
both still resolving into 2025. Different publisher, independently worded — genuine
corroboration, not a copied listing (RESEARCH_SPEC 3.2).

**Cubelelo (the required non-US/English retailer) does NOT carry YuFeng** — checked against
the existing `cubelelo-shengshou-products-prefix-2026` source (47 URLs, no YuFeng path).
This is recorded honestly as "checked, not found at this one retailer," not as evidence
against the line's existence — two of three retailers carrying a currently-selling,
multi-generation flagship line is a strong positive finding on its own.

**ShengShou's official domain is dead** (`data/manufacturers/shengshou.yml`), so — exactly as
RESEARCH_SPEC 3.6a anticipates for this manufacturer — the retailer channel is the
evidentiary ceiling. No tier 1 ShengShou source can be reached for this or any other current
ShengShou product.

### Where YuFeng belongs

Read against all 7 existing ShengShou 3x3 families (3x3, Legend, Aurora, FangYuan, Wind,
Pearl, Mr. M): none is described, in either its Speedsolving-wiki basis or its TheCubicle
description, as magnetic-core, flagship-positioned, or dated to 2023. YuFeng is a distinct
named product line, not a variant or later generation of any of the seven. It should be its
own family.

### Proposal (ready to execute, not acted on)

```yaml
proposed_family:
  id: shengshou-yufeng
  manufacturer_id: shengshou
  name: "ShengShou YuFeng"
  aliases: []
  positioning: mainline   # retailer copy calls it "a new flagship 3x3"; not confirmed as the brand's sole flagship
  introduced: unknown      # no dated statement found; earliest bound is "existed by 2023-01-05" (catalogue date, not a release date)
  scope_class: core        # standard 3x3x3 mechanism and shape; magnetic core is a hardware axis, not a shape-mod concern
  attesting_sources:
    - thecubicle-shengshou-yufeng-3x3-m-2023 (probable)
    - thecubicle-shengshou-yufeng-v2-3x3-m-2023 (probable)
    - speedcubeshop-shengshou-products-prefix-2026 (probable, independent corroboration)
  models_that_would_belong:
    - "ShengShou YuFeng 3x3 M (Magnetic Core)" — generation 1, basis: community_convention (no manufacturer-declared numbering found)
    - "ShengShou YuFeng V2 3x3 M" — generation 2, basis: community_convention
  successor_predecessor: none found
  notes: >
    The URL-slug "magelev" claim is contradicted by a first-hand customer review and should
    NOT be recorded as a MagLev configuration without further evidence; ShengShou's own
    marketing reportedly removed the claim after being disputed.
```

---

## Task 2 — the other ShengShou candidates

| Candidate | Evidence | Classification |
|---|---|---|
| **ShengShou Crazy 3x3** | `thecubicle-shengshou-other-3x3-lines-2026`, `speedcubeshop-shengshou-products-prefix-2026`. Two generations (v1 2025-08-06 slug / v2 2023-09-28), locked-ring mechanism explicitly described ("rings on each face that do not turn with their respective faces"), TheCubicle's own "Type: Shape Mods". Directly parallel to already-admitted `mf8-crazy-3x3x3` and `calvins-crazy-3x3`. | **credible candidate** (conditional scope) — same mechanism class as two precedent families already in the archive; needs a written `scope_justification` at admission, per the S6 policy, but the mechanism evidence itself is solid. |
| **ShengShou Rainbow 3x3** | `thecubicle-shengshou-other-3x3-lines-2026`. "ShengShou's first stickerless 3x3 cube," standard mechanism, non-magnetic, 56.2mm, 100g. Also found at SpeedCubeShop (2016, older, not seen since). | **credible candidate** — standard `core`-scope 3x3, comparable in evidentiary weight to the existing thin-material Pearl/Wind family records. |
| **ShengShou Gem 3x3** | `thecubicle-shengshou-other-3x3-lines-2026`. Budget stickerless 3x3, "3-piece cap design," standard mechanism. **Not the same product as DaYan's "Gem Cube"** — different manufacturer, different shape, coincidental shared English word. | **credible candidate** — `core` scope. |
| **ShengShou Tank 3x3** | `thecubicle-shengshou-other-3x3-lines-2026`. Economy 3x3, "vibrant color scheme, frosted exterior, black internals," standard mechanism, 56.0mm, 100g. "Tank" is also a ShengShou cross-category name (2x2 through 7x7, Megaminx, Pyraminx) — consistent with the naming pattern the 7 existing families already document for Legend/Mr. M/Wind/Aurora. | **credible candidate** — `core` scope. |
| **ShengShou Metal Cube 3x3** | `thecubicle-shengshou-other-3x3-lines-2026`. All-metal exterior over plastic internals, non-magnetic, 56.0mm, 186g (heavy). Standard cube shape/mechanism. | **credible candidate, scope uncertain** — a metal-shelled 3x3 may or may not clear WCA material-safety regulations; this is flagged explicitly rather than guessed at. Whoever admits this record should resolve `scope_class` (core vs conditional) as a first step. |
| **46mm / keychain / novelty 3x3 SKUs** | Not itemised beyond the family name in the original escalation; general naming pattern (small/keychain sizing) matches the same out-of-scope reasoning applied to YJ's own mini/keychain/pocket SKUs (Task 3 below). | **out of scope** — not materially distinct beyond ordinary novelty sizing; RESEARCH_SPEC 2.4. |

None of these five candidates required a "family or model" split decision under DATA_MODEL
§4.2 — each is either a standard-mechanism product with no existing family to belong to, or a
documented shape-mod mechanism with existing precedent. No §4.2 boundary call was close
enough to need a `succeeds`/uncertain split.

---

## Task 3 — DaYan and YJ swept to the 3.6a standard

### DaYan

**Before this session: no `/products/` prefix-sweep source existed for DaYan at all.**
Created two, following the ShengShou template exactly:

- `thecubicle-dayan-products-prefix-2026` — full sweep, 351 distinct URLs (2018-2026), not
  truncated.
- `cubelelo-dayan-products-prefix-2026` — non-US/English retailer sweep, 39 distinct URLs
  (2020-2025), not truncated.

| Path family found | Outcome |
|---|---|
| `dayan-guhong-*`, `-lingyun-*`, `-lunhui-*`, `-panshi-*`, `-tengyun-*`, `-xiangyun-*`, `-zhanchi-*` | Matches one of the 8 frozen families. No new finding. |
| `dayan-bermuda-*` (barrel, 8 planet names, 2 house variants, sunflower) | **No existing family.** Description (`thecubicle-dayan-bermuda-cube-2020`): "The DaYan Bermuda series features a variety of common 3x3 puzzles and shape-mods but with certain parts 'bandaged' to make each of them a unique challenge to solve." A bandaged-3x3 series, directly comparable to the already-admitted `calvins-bandaged-3x3-maze-300` precedent. Corroborated at Cubelelo independently. **This resolves the "Dayan Bermuda Cube" name from DaYan's own tier-1 2013 official site (`dayancube-official-2013`) that no earlier pass had chased — see Task 4.** Classified **credible candidate**. |
| `dayan-mf8-crazy-3x3-*` (a joint DaYan+mf8 "Crazy 3x3" listing) | Same locked-ring mechanism already covered by the existing `mf8-crazy-3x3x3` family. **Not a missing family** — a minor pass-4 cross-brand attribution question (should this specific SKU be modelled as a DaYan-sold rebrand of the mf8 product?) rather than a taxonomy gap. |
| `dayan-gem-cube-*` (I-VIII, 9, 10) | "An assortment of bizarre, many-sided puzzles that resemble multifaceted gem stones," retailer's own "Type: Other". **Not a 3x3x3.** Resolves "Dayan Gem Cube" from the 2013 official site — **out of scope**. |
| DaYan-branded "Crazy" pentahedron line (found at SpeedCubeShop, not TheCubicle) | All pentahedron-shaped, not cube-shaped. Resolves "Dayan Crazy Cube" from the 2013 official site — **out of scope** (distinct from the DaYan+mf8 3x3 "Crazy" listing above, which IS cube-shaped). |
| `dayan-jewel-cube` | Same "Other" multifaceted category as Gem. **Out of scope.** |
| `dayan-bagua-cube`, `dayan-tangram-cube(-extreme)` | Cube-shaped shape mods with real customer-review depth, but no documented significance found beyond ordinary novelty. **Weak lead** — not chased further this session. |
| `dayan-hydrangea` | "A hollow 4-axis spherical puzzle" — not cube-shaped at all. **Out of scope.** |
| `dayan-bi-yiniao-cube`, `dayan-shuang-feiyan-cube` | 12/16-axis jumbling mechanisms — cube-shaped but not a 3x3x3 layer-turning puzzle, a fundamentally different mechanism class. **Out of scope.** |
| Everything else (megaminx, pyraminx, skewb variants, FTO, hexadecagon/puzzle-ball/wheels-of-wisdom, accessory/hardware SKUs) | Non-3x3, or accessories. Not itemised as candidates. |

**DaYan "Crazy Cube" lead (Agent C's flagged item), resolved:** it names the pentahedron
line, not a 3x3. The DaYan+mf8 joint "Crazy 3x3" is a *different*, already-covered product.
These are related only by the shared generic word "Crazy," not the same line — see the
`thecubicle-dayan-non-3x3-lines-2026` source for the full reasoning.

**Result:** DaYan sweep found exactly **one** genuine missing-family candidate (Bermuda),
recorded honestly rather than as a blanket "nothing new found," per the explicit
instruction to record either outcome.

### YJ

**Before this session:** only the narrow `thecubicle-yj-mgc-prefix-2026` existed (scoped to
`/products/yj-mgc*` only). Created two broader sources:

- `thecubicle-yj-products-prefix-2026` — full `/products/yj-*` sweep, 489 distinct URLs
  (2019-2026), not truncated.
- `cubelelo-yj-products-prefix-2026` — non-US/English retailer sweep, 101 distinct URLs
  (2020-2025), not truncated.

| Path family found | Outcome |
|---|---|
| `yj-chilong-*`, `-guanlong-*`, `-jinjiao-*`, `-meta*`, `-mgc-*`, `-ruilong-*`, `-sulong-*`, `-yulong-*`, `-zhilong-*` | Matches one of the 9 frozen families, **with one gap**: `yj-mgc-sigma-3x3` (first capture 2026-02-16) has no corresponding model record under the existing `yj-mgc` family — see Task 4. |
| `yj-appari-3x3-speed-micro-bearing` | **No existing family.** "The YJ Appari (Speed Micro Bearing) is YJ's newest 3x3!... features YJ's innovative washer that carries speed-enhancing ball bearings... core-corner magnets, classic corner-edge magnets, and 6 spring compression settings." Corroborated at **three** independent retailers: TheCubicle (`thecubicle-yj-appari-3x3-2024`, "Speed Micro Bearing"), SpeedCubeShop (`speedcubeshop-yj-appari-3x3-2024`, "Speed Micro Actuator" — independently worded), and Cubelelo (`cubelelo-yj-products-prefix-2026`). Only one generation found across all three. Classified **established missing family** — the same evidentiary strength as YuFeng minus the second generation. |
| `yj-diamond-3x3`, `yj-inequilateral-3x3`, `yj-3x3-ball-cube`, `yj-blind-3x3`, `yj-windmill-v2`, `yj-concave-3x3-stickerless`, `yj-3x3-mirror-cube-golden`, `yj-yileng-v2-fisher` | Shape mods / novelty / accessibility products, each described but none carrying a documented-significance statement beyond ordinary novelty. `yj-blind-3x3` is worth a second look in a future pass (an accessibility-motivated product is a stronger significance argument than a generic shape mod), but not chased to conditional-scope depth this session. **Weak leads.** |
| `yj-pocket-cube-3x3` (50mm), `yj-mini-pillowed-3x3-*`, `yj-mosaic-3x3-cube-set-*`, `yj-super-floppy-1x3x3(-v2)` | TheCubicle's own copy on Pocket Cube: "not a flagship model... a great choice for casual solves." Super Floppy is a 1x3x3, a different puzzle entirely. **Out of scope** — RESEARCH_SPEC 2.4, no documented significance beyond ordinary novelty/travel sizing. |

**Result:** YJ sweep found exactly **one** genuine missing-family candidate (Appari) and one
missing-*model*-under-an-existing-family gap (MGC Sigma), plus several weak shape-mod leads.

### Proposal for YJ Appari (ready to execute, not acted on)

```yaml
proposed_family:
  id: yj-appari
  manufacturer_id: yj
  name: "YJ Appari"
  aliases: []
  positioning: mainline    # retailer copy: "YJ's newest 3x3"; not stated as a flagship tier
  introduced: unknown       # no dated statement found; earliest bound "existed by 2024-05-14" (catalogue date, not a release date)
  scope_class: core
  attesting_sources:
    - thecubicle-yj-appari-3x3-2024 (probable)
    - speedcubeshop-yj-appari-3x3-2024 (probable, independent wording)
    - cubelelo-yj-products-prefix-2026 (probable, third independent retailer)
  models_that_would_belong:
    - "YJ Appari (Speed Micro Bearing)" — single generation found, basis: community_convention
  successor_predecessor: none found
```

---

## Task 4 — recovered silent escalations

| # | Finding | File / line | Prior status | Now |
|---|---|---|---|---|
| 1 | **ShengShou YuFeng + Crazy 3x3 have no family record** | `data/sources/thecubicle-shengshou-products-prefix-2026.yml`, `reliability_note` (the escalation this whole lane exists to recover) | Recorded only in one source file's prose; never reached `research/qc/pass3-progress.md`'s "Escalations open for human adjudication" table | **Adjudicated in Task 1/2 above** with full evidence and a ready-to-execute proposal for YuFeng; Crazy 3x3 classified as a credible candidate. |
| 2 | **DaYan's own tier-1 2013 official site names three products never chased**: "Dayan Crazy Cube," "Dayan Gem Cube," "Dayan Bermuda Cube" | `data/sources/dayancube-official-2013.yml`, line 16 (excerpt: `Product list includes "Dayan 2X2", "Dayan Crazy Cube", ... "DaYan Gem Cube", "Dayan Bermuda Cube"`) | Cited in `data/manufacturers/dayan.yml` for founder/etymology only; the product-list names themselves were never followed up in any family record or escalation ledger | **Resolved this session**: Crazy Cube = pentahedron (out of scope), Gem Cube = multifaceted "Other" shape (out of scope), Bermuda Cube = bandaged 3x3 series (**credible candidate**, see Task 3). This is the same failure mode as finding #1 — a tier-1-named product sitting unchased in a source file's excerpt — just never escalated at all, not even to a single source's `reliability_note`. |
| 3 | **YJ MGC Sigma has no model record** | `data/sources/thecubicle-yj-mgc-prefix-2026.yml` (excerpt already named `yj-mgc-sigma-3x3`, captured 2026-02-16) vs. `data/models/yj/` (stops at `yj-mgc3-beta.yml`) | Named in a source excerpt from the original (non-killed) YJ/ShengShou work but never turned into a model record or escalation | **Flagged here** — a missing model under an *existing, non-frozen-at-model-level* family, out of this agent's write lane (model creation frozen this pass), for pass-3/4 reopening. |
| 4 | **DaYan+mf8 joint "Crazy 3x3" cross-brand attribution** | `data/sources/thecubicle-dayan-non-3x3-lines-2026.yml` (new, this session) | Not previously documented anywhere | Not a missing family (mechanism already covered by `mf8-crazy-3x3x3`); flagged as a pass-4 question of whether TheCubicle's `dayan-mf8-crazy-3x3-*` SKUs should carry a `rebrand_of`/joint-production note. |

**No other silent escalations were found** in a systematic read of `data/models/dayan/*.yml`,
`data/models/yj/*.yml`, `data/models/shengshou/*.yml`, the corresponding family records, and
every `data/sources/*.yml` whose id contains `dayan`, `yj`, or `shengshou` — the existing
in-record notes (soft-identification flags on `dayan-zhanchi-v5-m`, `dayan-zhanchi-50mm`,
`yj-mgc-elite-v2`, `shengshou-legend-big`, `yj-zhilong-mini`, and the family-level notes on
`yj-meta`, `yj-jinjiao`, `yj-chilong`) are all already visible in `pass3-progress.md`'s
open-escalations table or are self-contained "flagged for human review" notes that do not
describe a missing taxonomy region — they are model/variant-boundary calls, not the
"systematically missing region" failure mode this lane targets.

---

## Summary

- **Genuine missing families established this session: 2** (ShengShou YuFeng, YJ Appari —
  both with full ready-to-execute proposals above).
- **Credible candidates (need a human `scope_justification`/admission decision, not more
  discovery): 6** — ShengShou Crazy 3x3, ShengShou Rainbow 3x3, ShengShou Gem 3x3, ShengShou
  Tank 3x3, ShengShou Metal Cube 3x3 (scope uncertain), DaYan Bermuda.
- **Weak leads (documented, not chased further): 8** — DaYan Bagua Cube, DaYan Tangram Cube,
  YJ Diamond 3x3, YJ Inequilateral 3x3, YJ Ball Cube, YJ Blind 3x3, YJ Windmill V2, YJ
  Concave/Mirror/Fisher shape mods (grouped).
- **Rejected / out of scope, resolved with evidence: 7** — DaYan Gem Cube, DaYan Jewel Cube,
  DaYan Crazy (pentahedron) line, DaYan Hydrangea, DaYan Bi YiNiao / Shuang FeiYan, ShengShou
  46mm/keychain/novelty SKUs, YJ Pocket Cube / mini / mosaic / super-floppy SKUs.
- **Sweeps run and recorded:** DaYan (TheCubicle full + Cubelelo), YJ (TheCubicle full +
  Cubelelo) — all four now have 3.6a-compliant source records where none or only a narrow one
  existed before.
- **Silent escalations recovered: 4** (table above), of which one (#1, ShengShou) was the
  proven case that motivated this lane and two (#2 DaYan tier-1 product names, #3 YJ MGC
  Sigma) were newly found this session by systematically reading source excerpts and
  cross-checking them against the model/family tree rather than trusting that a named product
  had already been followed up.

Files written this session (all in write lane):

- `data/sources/thecubicle-shengshou-yufeng-3x3-m-2023.yml`
- `data/sources/thecubicle-shengshou-yufeng-v2-3x3-m-2023.yml`
- `data/sources/speedcubeshop-shengshou-products-prefix-2026.yml`
- `data/sources/thecubicle-shengshou-other-3x3-lines-2026.yml`
- `data/sources/thecubicle-dayan-bermuda-cube-2020.yml`
- `data/sources/thecubicle-dayan-non-3x3-lines-2026.yml`
- `data/sources/thecubicle-dayan-products-prefix-2026.yml`
- `data/sources/cubelelo-dayan-products-prefix-2026.yml`
- `data/sources/thecubicle-yj-products-prefix-2026.yml`
- `data/sources/cubelelo-yj-products-prefix-2026.yml`
- `data/sources/thecubicle-yj-appari-3x3-2024.yml`
- `data/sources/speedcubeshop-yj-appari-3x3-2024.yml`
- `research/qc/pass2.6-agent-e-lost-lanes.md` (this file)

`npm run check` (schemas, validate, lint, duplicates, build, privacy, selftest, coverage) is
green at 0 errors / 5 advisory warnings with all of the above in the tree — unchanged from
the pre-session baseline.

---

## Machine-readable summary

```yaml
candidates:
  - name: "ShengShou YuFeng"
    manufacturer: shengshou
    classification: established_missing_family
    confidence: probable
    evidence: [thecubicle-shengshou-yufeng-3x3-m-2023, thecubicle-shengshou-yufeng-v2-3x3-m-2023, speedcubeshop-shengshou-products-prefix-2026]
    generations_found: 2
    blocks_pass4: true

  - name: "YJ Appari"
    manufacturer: yj
    classification: established_missing_family
    confidence: probable
    evidence: [thecubicle-yj-appari-3x3-2024, speedcubeshop-yj-appari-3x3-2024, cubelelo-yj-products-prefix-2026]
    generations_found: 1
    blocks_pass4: true

  - name: "DaYan Bermuda"
    manufacturer: dayan
    classification: credible_candidate
    confidence: reported
    evidence: [dayancube-official-2013, thecubicle-dayan-bermuda-cube-2020, cubelelo-dayan-products-prefix-2026]
    generations_found: 1
    blocks_pass4: true

  - name: "ShengShou Crazy 3x3"
    manufacturer: shengshou
    classification: credible_candidate
    confidence: reported
    evidence: [thecubicle-shengshou-other-3x3-lines-2026, speedcubeshop-shengshou-products-prefix-2026, wikipedia-combination-puzzle]
    generations_found: 2
    blocks_pass4: true

  - name: "ShengShou Rainbow 3x3"
    manufacturer: shengshou
    classification: credible_candidate
    confidence: reported
    evidence: [thecubicle-shengshou-other-3x3-lines-2026, speedcubeshop-shengshou-products-prefix-2026]
    generations_found: 1
    blocks_pass4: true

  - name: "ShengShou Gem 3x3"
    manufacturer: shengshou
    classification: credible_candidate
    confidence: reported
    evidence: [thecubicle-shengshou-other-3x3-lines-2026]
    generations_found: 1
    blocks_pass4: true

  - name: "ShengShou Tank 3x3"
    manufacturer: shengshou
    classification: credible_candidate
    confidence: reported
    evidence: [thecubicle-shengshou-other-3x3-lines-2026]
    generations_found: 1
    blocks_pass4: true

  - name: "ShengShou Metal Cube 3x3"
    manufacturer: shengshou
    classification: credible_candidate
    confidence: uncertain
    evidence: [thecubicle-shengshou-other-3x3-lines-2026]
    generations_found: 1
    blocks_pass4: true

  - name: "DaYan Bagua Cube"
    manufacturer: dayan
    classification: weak_lead
    confidence: uncertain
    evidence: [thecubicle-dayan-non-3x3-lines-2026]
    generations_found: 1
    blocks_pass4: false

  - name: "DaYan Tangram Cube"
    manufacturer: dayan
    classification: weak_lead
    confidence: uncertain
    evidence: [thecubicle-dayan-non-3x3-lines-2026]
    generations_found: 1
    blocks_pass4: false

  - name: "YJ Diamond 3x3"
    manufacturer: yj
    classification: weak_lead
    confidence: uncertain
    evidence: [thecubicle-yj-products-prefix-2026]
    generations_found: 1
    blocks_pass4: false

  - name: "YJ Inequilateral 3x3"
    manufacturer: yj
    classification: weak_lead
    confidence: uncertain
    evidence: [thecubicle-yj-products-prefix-2026]
    generations_found: 1
    blocks_pass4: false

  - name: "YJ Blind 3x3"
    manufacturer: yj
    classification: weak_lead
    confidence: uncertain
    evidence: [thecubicle-yj-products-prefix-2026]
    generations_found: 1
    blocks_pass4: false

  - name: "YJ Ball Cube / Windmill / Concave / Mirror / Fisher shape mods"
    manufacturer: yj
    classification: weak_lead
    confidence: uncertain
    evidence: [thecubicle-yj-products-prefix-2026, cubelelo-yj-products-prefix-2026]
    generations_found: 1
    blocks_pass4: false

  - name: "DaYan Gem Cube"
    manufacturer: dayan
    classification: out_of_scope
    confidence: confirmed
    evidence: [dayancube-official-2013, thecubicle-dayan-non-3x3-lines-2026]
    generations_found: 0
    blocks_pass4: false

  - name: "DaYan Jewel Cube"
    manufacturer: dayan
    classification: out_of_scope
    confidence: confirmed
    evidence: [thecubicle-dayan-non-3x3-lines-2026]
    generations_found: 0
    blocks_pass4: false

  - name: "DaYan Crazy (pentahedron line)"
    manufacturer: dayan
    classification: out_of_scope
    confidence: confirmed
    evidence: [dayancube-official-2013, thecubicle-dayan-non-3x3-lines-2026]
    generations_found: 0
    blocks_pass4: false

  - name: "DaYan Hydrangea / Bi YiNiao / Shuang FeiYan"
    manufacturer: dayan
    classification: out_of_scope
    confidence: confirmed
    evidence: [thecubicle-dayan-non-3x3-lines-2026]
    generations_found: 0
    blocks_pass4: false

  - name: "ShengShou 46mm/keychain/novelty 3x3 SKUs"
    manufacturer: shengshou
    classification: out_of_scope
    confidence: uncertain
    evidence: [thecubicle-shengshou-products-prefix-2026]
    generations_found: 0
    blocks_pass4: false

  - name: "YJ Pocket Cube / mini / mosaic / super-floppy SKUs"
    manufacturer: yj
    classification: out_of_scope
    confidence: reported
    evidence: [thecubicle-yj-products-prefix-2026]
    generations_found: 0
    blocks_pass4: false

silent_escalations_recovered:
  - id: 1
    finding: "ShengShou YuFeng + Crazy 3x3 named with no family record"
    file: "data/sources/thecubicle-shengshou-products-prefix-2026.yml"
    status: adjudicated_this_session

  - id: 2
    finding: "DaYan tier-1 official site names Crazy/Gem/Bermuda Cube, never chased"
    file: "data/sources/dayancube-official-2013.yml"
    line: 16
    status: resolved_this_session

  - id: 3
    finding: "YJ MGC Sigma named in a retailer sweep source with no model record"
    file: "data/sources/thecubicle-yj-mgc-prefix-2026.yml"
    status: flagged_for_pass3_4_not_created_this_session

  - id: 4
    finding: "DaYan+mf8 joint Crazy 3x3 cross-brand attribution undocumented"
    file: "data/sources/thecubicle-dayan-non-3x3-lines-2026.yml"
    status: documented_this_session_not_a_family_gap

missing_families_established: 2
```
