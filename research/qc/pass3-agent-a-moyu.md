# Pass 3 (models) — Agent A, MoYu lane

**Scope:** 9 frozen MoYu families — `moyu-weilong`, `moyu-rs3m`, `moyu-aolong`, `moyu-huanying`,
`moyu-tanglong`, `moyu-hualong`, `moyu-liying`, `moyu-dianma`, `moyu-ai`. No family was created,
renamed, merged, split, or re-parented. No variant was created or touched.

**Result:** 23 model records created under `data/models/moyu/`. `npm run check` is clean (0
errors; the one pre-existing lint warning, `gan-ui-12-sp`, is unrelated to this lane). No new
source records were created — every claim rests on three sources already present in
`data/sources/`: `speedsolving-wiki-moyu` (tier 3, override applied in a prior session),
`thecubicle-com-moyu-3x3-collection-2021` (tier 2), and `thecubicle-us-moyu-early-3x3-lines`
(tier 2).

**Primary evidence base.** `speedsolving-wiki-moyu`'s own reliability_note restricts it to
"product existence, naming, line membership, approximate chronology" and forbids
"specifications, corporate ownership or sub-brand relationships, day-precision dates." Every
model record in this batch respects that: no `specs` block is populated anywhere in this lane
(no tier 1-2 spec source was found — `moyucube.com`'s Wayback captures are a Chinese-language
corporate CMS with no clean per-product spec pages located this pass, see "Leads not chased"
below), and every date sourced to the wiki alone is recorded at month/year precision even where
the wiki's own prose gives an apparent day (e.g. WeiLong WR's "4/3/2019").

---

## Family-by-family

### `moyu-huanying`, `moyu-liying`, `moyu-tanglong`, `moyu-hualong`, `moyu-dianma` — one model each

Each is a single-generation family (confirmed in Pass 2). One model per family, id
`<family>-original`, `generation.basis: community_convention` (a bare, unnumbered product name
— no generation scheme exists to be manufacturer-declared or community-numbered), matching the
`gan-357-original` precedent for single-model families. Existence and a retailer-capture date
floor for each rests on `thecubicle-us-moyu-early-3x3-lines` (tier 2, `probable`); narrative
description corroborated by the wiki (tier 3, `reported`). No second generation was found for
any of these five in either source — recorded as a legitimate single-model outcome, not an
underspecified search.

One discrepancy noted, not acted on: `moyu-hualong`'s own Pass 2 family record states an
earliest capture of "2015-05-11", but the cited source's own preserved excerpt gives 2015-10-15
(direct capture) and 2015-07-10 (an indirect cross-sell reference). I used the excerpt's own
dates rather than the family record's, and flagged this here rather than editing the family
file (out of my write lane).

### `moyu-aolong` — 3 models: AoLong → AoLong V2 → AoLong GT

All three names are independently evidenced via `thecubicle-us-moyu-early-3x3-lines`'
image-filename evidence (`moyuaolongb*`, `moyuaolongv2b*`, `moyuaolonggtbtn*`) plus a full
"Cubicle AoLong V2" product page, and via the wiki's own three-generation narrative.

- **AoLong → AoLong V2**: wiki states V2 was "intended to reduce corner twists" after a
  world-record DNF, and that the *first V2 batch used a different plastic outright* before MoYu
  corrected course — a material/tooling change to the design itself, not a configuration choice
  offered in parallel with V1 (V1 was discontinued, not sold alongside V2). Modelled as
  `succeeds`, `reported` confidence on the date (wiki's own "July 2014" controversy date, month
  precision).
- **AoLong V2 → AoLong GT**: wiki states GT has "square corners" versus V2's geometry — a piece
  mould difference. `released` left `unknown`; no dated source found.
- **AoLong (original)**: `released` left `unknown` rather than asserting the family's own
  "circa 2014" — the family's date rests on a broader capture-pattern argument I did not
  independently re-verify at the individual-product level this pass, and no direct dated
  statement about the bare AoLong (as opposed to V2) was found.

### `moyu-weilong` — 10 models: WeiLong → V2 → GTS → GTS2 → GTS3 → WR → WR M 2020 → WR M 2021 →
V9 → Super

The archive's most historically important non-GAN 3×3 lineage, per the task brief. Every
transition is backed by a wiki sentence stating a piece/mould-level difference; every
magnet/spring/coating/core option mentioned alongside a generation is recorded as a variant
lead in that model's `description`, not a model, per DATA_MODEL §4.2's materiality test:

| Model | Mould/mechanism evidence for model status | Variant-level siblings folded in (pass-4 leads, not created) |
|---|---|---|
| WeiLong | baseline | — |
| WeiLong V2 | **BOUNDARY CALL — split under uncertainty.** Wiki: "how the pieces are put together... mechanism remains largely unchanged." Genuinely ambiguous; split per worked decision G, `confidence: uncertain` throughout | — |
| GTS (2016) | "caps on the pieces rather than... split into multiple sections" | — |
| GTS2 (2017) | "3-piece corner design" (enables stickerless) | GTS2 M, GTS2 M (LE), GTS2 M (WCA Record Edition) |
| GTS3 (2018) | new user-adjustable spring-compression system | GTS3 (non-M), GTS3 M, GTS3 LM |
| WR (2019) | "a GTS3 without ridges" (piece geometry) | **WR M — the hard case.** Wiki states magnet strength is the only stated difference from non-magnetic WR ("the same as the GTS3 LM"); TheCubicle sells both as parallel SKUs of one line. Recorded as one model, `WR M` as alias/variant lead only |
| WR M 2020 | **BOUNDARY CALL — split under uncertainty.** Wiki: "new color scheme and frosted plastic, along with the MoYu spring adjustment feature" — ambiguous between material/colour (variant) and a genuine mechanism refresh. Split because it is a manufacturer-named yearly generation and the wiki frames it as WR M's direct "successor" | WeiLong AI (see below) |
| WR M 2021 | "switched to using a capped design as opposed to a split-piece" | 2021 MagLev (explicit "MagLev vs. spring" example from task brief) |
| V9 (2023) | "back-to-basics" redesign combining WR M 2020's split-piece with WR M 2019's geometry — a stated redesign | Standard, Maglev, Ballcore; a later "20-magnet Ballcore" (Jan 2024) noted as a further magnet-count variant lead, not a revision (it was marketed as a new SKU, not an undeclared change) |
| Super (late 2023) | "capped design similar to the WRM 2021, departing from the V9" | 8-magnet spring, 8-magnet maglev, 20-magnet maglev ball-core |

**WeiLong AI resolved as NOT a model or family member requiring its own record.** The task
flagged this as the hard case. Per DATA_MODEL §2's `smart_version_of` relationship type
("electronic sibling of a mechanical variant") and the wiki's own statement that it is "regarded
at the time of release as the best-turning smartcube due to sharing pieces with the WRM 2020," I
treat this as an expected `smart_version_of` **variant** of `moyu-weilong-wr-m-2020`, not a new
model. I did not create it (variant creation is pass 4); I recorded the lead directly in
`moyu-weilong-wr-m-2020.yml`'s description so the variant researcher does not have to
re-discover it. `moyu-ai` (the separate family) is unaffected and correctly stays separate — its
own wiki entry explicitly distinguishes it from WeiLong AI.

**Escalation-adjacent, not acted on:** the family record's own note about a 2015 "customers also
bought" cross-sell referencing "WeiLong V2" could not be independently re-verified against the
cited source's own preserved excerpt (the excerpt only documents six *other* named products,
not this cross-sell). I did not treat this as evidence for WeiLong V2's dating; V2's existence
rests on the wiki alone (`reported`).

### `moyu-rs3m` — 4 models: RS3M 2020 → Super → Super V2 → V5

The subtlest call in the lane, per the task brief, resolved as follows:

- **RS3M 2020 = model.** Base generation; existence corroborated tier 2 + tier 3 (`probable`).
- **RS3M MagLev = variant, not a model.** Wiki: "uses MagLev technology, having 2 repelling
  magnets that replicate springs" — exactly the task's own "MagLev vs. spring" variant example.
  Recorded as a description-level lead on `moyu-rs3m-2020.yml`, not created.
- **RS3M 2020 UV = variant, not a model.** UV coating + slightly stronger magnets — both
  variant-level per the materiality test. Also a description-level lead only.
- **"RS3M 2021" = not promoted to a model.** Mentioned exactly once, in passing, inside the
  Super RS3M entry ("An updated version of the RS3M 2020/2021"), with no distinguishing feature
  ever stated for a 2021-specific design. I did not fabricate a model or a `revisions[]` entry
  on this single ambiguous mention; recorded as an open question in `moyu-rs3m-2020.yml`'s
  description instead. This is the one place in the lane where I judged the evidence too thin
  even for a `revisions[]` entry (which still requires *some* stated distinguishing feature per
  `distinguishable_by`), and left it as prose rather than structured data.
- **Super RS3M = model.** Wiki: "a dragon scale design on the pieces" — an external piece
  mould, not a sold configuration. Standard/Maglev/Ball Core folded in as variant leads.
- **Super RS3M V2 = model.** Wiki: "a capped piece design (as opposed to split-piece with a
  separate corner stalk)" — direct mould-construction change. The wiki itself hedges on its own
  ordinal count ("the second version (or fourth, fifth, and sixth?)"), recorded verbatim in the
  description rather than resolved.
- **RS3M V5 = model.** Wiki: "returns back to the original Super V1 split-piece design" — a
  reversal from Super V2's capped design, itself a distinct mould change from the immediately
  preceding model. Standard/DAS/DAS-with-Robot/MagLev/Ballcore-UV folded in as variant leads
  (adjustment-system and coating differences).

### `moyu-ai` — 1 model

Single generation, "MoYu AI," per the wiki's own August 2023 dated statement (month precision,
`reported`; the family record's own attestation for the same claim predates this project's E1
tier-override of `speedsolving-wiki-moyu` from 4 to 3 and still reads `uncertain` citing
"tier 4" — I did not edit the family file, but flag the discrepancy here since a future pass
touching that family record should reconcile it). Magnetic/non-magnetic configurations noted as
variant leads, not created.

---

## Leads not chased (time-bounded, recorded honestly)

- **No tier 1 (manufacturer) spec source was found for any MoYu 3×3 in this lane.**
  `moyucube.com`'s Wayback captures under both `/cn/` and `/en/` paths are a Chinese-language
  corporate CMS (news items, contact forms, image assets) with no clean per-product spec pages
  located within this session's `prefix` queries. Every `specs` block in this batch is
  therefore entirely unset, which is the honest, policy-correct outcome (class-4 evidence,
  tier 1-2 only) rather than a gap I should have closed with more time. A future pass should try
  `moyucube.com`'s product-catalogue subpaths more systematically, or MoYu's Taobao/Tmall
  storefronts, before concluding specs are unrecoverable.
- The 2015 "WeiLong V2 cross-sell" lead on the `moyu-weilong` family record (see above) was not
  chased to its own Wayback capture this session.

## Escalations

None. No family-taxonomy evidence surfaced in this lane that contradicts the frozen Pass-2
boundaries. (One near-miss checked and cleared: the wiki's own MoYu article lists a "MoYu
YuLong" 3×3 not in my family list. I confirmed this is already correctly handled —
`data/families/yj-yulong.yml` attributes it to YJ, explicitly noting "Sometimes bore the MoYu
logo," per `speedsolving-wiki-yongjun-products`. No action needed, no escalation.)

## Unresolved identity questions (for human review)

1. **WeiLong V2** — boundary between "assembly-time configuration" and "genuine design
   generation" is unresolved on current evidence; split as its own model at `uncertain`
   confidence per the "when unclear, split" rule. A human reviewer with access to physical
   specimens or a manufacturer source could confirm or collapse this into a variant of the
   base WeiLong.
2. **WeiLong WR M 2020** — same ambiguity ("new color scheme and frosted plastic, along with
   the MoYu spring adjustment feature"). Split as its own model at reduced confidence on the
   description field specifically, on the strength of its manufacturer-named yearly generation
   pattern (mirrored later at WR M 2021, which *is* unambiguous).
3. **Super RS3M V2's own ordinal count** — the wiki itself is unsure whether it is the "second"
   or "fourth/fifth/sixth" version of the line; recorded verbatim rather than resolved.
4. **"RS3M 2021"** — genuinely unclear whether a distinct 2021 RS3M generation exists at all,
   or whether the wiki's "2020/2021" phrasing is loose language for one continuous generation.
   Left as an open question, not a model, not a revision.

---

## Machine-readable summary

```yaml
models:
  - id: moyu-huanying-original
    family_id: moyu-huanying
    name: "MoYu HuanYing"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: moyu-liying-original
    family_id: moyu-liying
    name: "MoYu LiYing"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: moyu-tanglong-original
    family_id: moyu-tanglong
    name: "MoYu TangLong"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: moyu-hualong-original
    family_id: moyu-hualong
    name: "MoYu HuaLong"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: moyu-dianma-original
    family_id: moyu-dianma
    name: "MoYu DianMa"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: moyu-aolong-original
    family_id: moyu-aolong
    name: "MoYu AoLong"
    scope_class: core
    evidence_tier: 3
    date_known: false
    confidence: reported
  - id: moyu-aolong-v2
    family_id: moyu-aolong
    name: "MoYu AoLong V2"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-aolong-gt
    family_id: moyu-aolong
    name: "MoYu AoLong GT"
    scope_class: core
    evidence_tier: 3
    date_known: false
    confidence: reported
  - id: moyu-weilong-original
    family_id: moyu-weilong
    name: "MoYu WeiLong"
    scope_class: core
    evidence_tier: 3
    date_known: false
    confidence: reported
  - id: moyu-weilong-v2
    family_id: moyu-weilong
    name: "MoYu WeiLong V2"
    scope_class: core
    evidence_tier: 3
    date_known: false
    confidence: uncertain
  - id: moyu-weilong-gts
    family_id: moyu-weilong
    name: "MoYu WeiLong GTS"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-weilong-gts2
    family_id: moyu-weilong
    name: "MoYu WeiLong GTS2"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: reported
  - id: moyu-weilong-gts3
    family_id: moyu-weilong
    name: "MoYu WeiLong GTS3"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: reported
  - id: moyu-weilong-wr
    family_id: moyu-weilong
    name: "MoYu WeiLong WR"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: uncertain
  - id: moyu-weilong-wr-m-2020
    family_id: moyu-weilong
    name: "MoYu WeiLong WR M 2020"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: reported
  - id: moyu-weilong-wr-m-2021
    family_id: moyu-weilong
    name: "MoYu WeiLong WR M 2021"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-weilong-v9
    family_id: moyu-weilong
    name: "MoYu WeiLong V9"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-weilong-super
    family_id: moyu-weilong
    name: "MoYu WeiLong Super"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-rs3m-2020
    family_id: moyu-rs3m
    name: "MoYu RS3M 2020"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: moyu-rs3m-super
    family_id: moyu-rs3m
    name: "MoYu Super RS3M"
    scope_class: core
    evidence_tier: 3
    date_known: false
    confidence: reported
  - id: moyu-rs3m-super-v2
    family_id: moyu-rs3m
    name: "MoYu Super RS3M V2"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-rs3m-v5
    family_id: moyu-rs3m
    name: "MoYu RS3M V5"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
  - id: moyu-ai-original
    family_id: moyu-ai
    name: "MoYu AI"
    scope_class: core
    evidence_tier: 3
    date_known: true
    confidence: reported
```
