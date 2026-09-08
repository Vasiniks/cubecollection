# P26-5 Final Mapping Review — Canonical Family/Model Mapping

Status: COMPLETE
Role: Canonical family/model mapping reviewer (read-only). This document is a specification
for the main session to execute; no canonical records are created/modified by this review.
Reviewed: `research/qc/p26-5-family-adjudication.md` and its four lane reports
(`p26-5-agent-a-cubetwist.md`, `-b-bermuda.md`, `-c-shengshou-crazy-rainbow.md`,
`-d-shengshou-gem-tank-metal.md`), `schema/family.schema.json`, `schema/model.schema.json`,
`schema/common/date.schema.json`, `schema/common/legality.schema.json`,
`vocab/family-positioning.yml`, `vocab/scope-class.yml`, `vocab/generation-basis.yml`,
`vocab/confidence.yml`, `vocab/record-status.yml`, `vocab/wca-status.yml`, `DATA_MODEL.md`
§4.2–4.5, `RESEARCH_SPEC.md` §2, `research/qc/pass3-admission-policy.md`, and the precedent
records `data/families/shengshou-yufeng.yml` + its two models,
`data/families/calvins-bandaged-3x3-maze-300.yml` + `calvins-maze-300-cube.yml`,
`data/families/mf8-crazy-3x3x3.yml` + its two models, `data/families/cube4you-3x3.yml` +
its model, `data/models/witeden/witeden-mixup-*.yml` (four parallel models, one family),
`data/families/calvins-crazy-3x3.yml` + `calvins-full-function-crazy-3x3.yml`,
`data/families/fangshi-guangying.yml`, plus every cited source record.

**Bottom line: the mapping is sound. No duplication found anywhere. 11 new models is
independently verified as correct (258 → 269). One correction to the plan (Bermuda's House
I/II relationship — confirm parallel, do not imply succession via the `generation` field) and
one disputed call resolved with a recommendation (Crazy: `reference_only` V1 /
`conditional` V2, matching the exact precedent already in the archive for
`calvins-full-function-crazy-3x3`).**

---

## 1. Duplication check

**No duplication found.** Method: grepped every planned family id, planned model id, and every
planned name/alias word (`cubetwist`, `bermuda`, `rainbow`, `gem`, `tank`, `crazy`, `triangle`,
`house`, `column`, `star`) against `data/families/`, `data/models/`, `data/variants/`, and
`data/manufacturers/` for id collisions, name collisions and alias collisions.

**Family ids** — none of the six exists: `cubetwist-3x3`, `dayan-bermuda`, `shengshou-rainbow`,
`shengshou-gem`, `shengshou-tank`, `shengshou-crazy` all return zero hits as `id:` values
anywhere in `data/`.

**Model ids** — none of the eleven candidate ids (below) exists anywhere in `data/`, checked
against **every** entity type, not just families/models, since `validate.mjs` enforces id
uniqueness globally:

```
cubetwist-3x3-standard
dayan-bermuda-triangle · dayan-bermuda-column · dayan-bermuda-house-i · dayan-bermuda-house-ii · dayan-bermuda-star
shengshou-rainbow-3x3
shengshou-gem-3x3
shengshou-tank-3x3
shengshou-crazy-3x3 · shengshou-crazy-3x3-v2
```

**Near-miss / cross-manufacturer word collisions, checked and cleared:**

- **"Rainbow"**: `monster-go-3x3` family already has a model `monster-go-cloud-rainbow-ut-3x3`
  with a `rainbow` variant (`data/variants/monster-go/monster-go-cloud-rainbow-ut-3x3/rainbow.yml`).
  This is Monster Go / GAN-adjacent branding, not ShengShou — different manufacturer_id, no
  shared source, no alias overlap. Not a duplicate.
- **"Gem"**: DaYan has its own, unrelated "Gem Cube" line (`thecubicle-dayan-gem-cube-i-2019`,
  cited in `cubelelo-dayan-products-prefix-2026` as `dayan-gem-cube-vi-black`) — a
  multifaceted/gem-shaped novelty, structurally and mechanically different from ShengShou's
  Gem 3x3 (a standard cube shape with capped internals). No DaYan Gem family/model record
  currently exists in `data/families/` or `data/models/` at all, so there is no live
  conflation risk regardless. Agent D and the shared source (`thecubicle-shengshou-other-3x3-lines-2026`)
  both flag this explicitly as "same generic English word... used by two unrelated
  manufacturers," and I independently confirm the grep finds no DaYan Gem record to collide
  with. **Recommend the ShengShou Gem model record keep this cross-reference note verbatim
  when it is written, since DaYan's own Gem Cube may be admitted in a future pass.**
- **"Tank"/"Crazy"/"Star"/"House"/"Column"/"Triangle"**: no existing family or model name uses
  these words as its primary identity in a way that could collide (grep hits for "house"/
  "triangle" are all unrelated: `cubestyle-3x3`, GAN V100 MagLev, MoYu RS3M, DianSheng Type E,
  Cube4You, none of which are DaYan or bandaged-cube related).
- **CubeTwist "Star Cube"**: `thecubicle-cubetwist-star-cube.yml` / `-2020.yml` exist as
  *sources* already in the archive (from the CubeTwist manufacturer's own novelty catalogue),
  but **no family or model record cites them**, and they are explicitly the 异形 (shaped/
  novelty) side of CubeTwist's catalogue that Agent A's report says stays **out** of
  `cubetwist-3x3`. Confirm this stays a lead, not folded in — see §7.

**`shengshou-gem-tank-metal-cross-retailer-sweep-2026`** is a *source* id, correctly containing
"gem" and "tank" as substrings — not a family/model id, no collision risk.

**Verdict: `duplicates_found: false`.**

---

## 2. Per-family model mapping — exact ids and names

### CubeTwist 3x3 — 1 model (matches plan)

| id | name |
|---|---|
| `cubetwist-3x3-standard` | "CubeTwist 3x3x3 Speed Cube" |

Agree with Agent A: **one model.** Applying DATA_MODEL §4.2's test directly —

- **原色/黑面/白面 (original/black/white colourways)**: could CubeTwist produce all three from
  the same mould by choosing a different plastic colour at assembly? Yes. **Variants**
  (Pass 4), exactly the `cube4you-3x3` precedent (assembled-from-colourways is a variant axis,
  not a model axis).
- **三阶DIY散件 (DIY loose-parts kit)**: same mould, unassembled at the point of sale.
  **Variant**, not a model — again the `cube4you-3x3` precedent (that record explicitly
  resolved "DIY-kit vs assembled... as a variant axis, not two models").
- **4.0cm三阶钥匙扣 (40mm keychain)**: **recommend leaving this OUT of the family, not folding
  it in, and not creating a second model for it.** The brief raises `dayan-zhanchi`'s 42mm
  sibling as a counter-example of a size sibling being folded in, but that precedent doesn't
  transfer cleanly: the ZhanChi 42mm sibling is a *speedcube-format* size variant sold as a
  smaller competitive cube, evidenced with its own spec table. The CubeTwist keychain is named
  in prev/next site navigation only — no independent product page was fetched
  (`cubetwist-com-2010-3x3-listing`'s own reliability_note says so explicitly), no dimensions,
  no price, and a keychain is a categorically different *product class* (a keyring accessory)
  from a WCA-relevant speedcube, not a smaller version of the same competitive object. Treating
  it as in-family would require inventing a claim ("this is a small speedcube") the evidence
  does not support. **Recommend: do not create a model or variant for it. Leave it as an
  explicit lead in the family's description** (worded as Agent A already drafted: "named in
  adjacent catalogue navigation, not independently fetched, relationship to the 3x3 line
  undetermined") **rather than silently admitting or silently dropping it.**

`generation`: single generation, no manufacturer version marker found anywhere. Follow the
house convention (`shengshou-*-original`, `fangshi-guangying-original`, etc.):
`generation: {label: "Original", ordinal: 1, basis: community_convention}`,
attestation `confidence: unknown` ("no manufacturer or community numbering found").

### DaYan Bermuda — 5 models (matches plan, one clarification)

| id | name |
|---|---|
| `dayan-bermuda-triangle` | "DaYan Bermuda Triangle" |
| `dayan-bermuda-column` | "DaYan Bermuda Column" |
| `dayan-bermuda-house-i` | "DaYan Bermuda House I" |
| `dayan-bermuda-house-ii` | "DaYan Bermuda House II" |
| `dayan-bermuda-star` | "DaYan Bermuda Star" |

Agree with Agent B on all five as separate **models** (not variants of one Triangle model):
the operative §4.2 test — *could DaYan produce a House-shaped shell and a cylinder-shaped shell
from the same underlying design by choosing different parts at assembly?* — is answered "no"
directly by product photography (cube-shaped vs. octagonal-cylinder vs. two distinct
house/roofline shapes vs. star/flower shape), which is design-level tooling evidence, not
marketing. This is a genuinely strong case: it clears §4.2 on *physical exterior mold
evidence*, not on naming alone, which is a higher bar than most of this archive's model splits
meet.

**The eight planet names × Black/White are colourways of Triangle only — confirmed correct as
Pass-4 variant material, not models and not a sixth model.** Confirmed independently by the
individual product page cross-link evidence (Column and Triangle-White-Jupiter sold as
concurrent siblings, not renames of each other) and by the photographic comparison of Earth vs.
Jupiter black colourways showing the same cut pattern.

**House I vs House II — recommend PARALLEL models, not a `succeeds` relationship, and I go
further than Agent B: do not set the `generation` field on any of the five at all.** This is
not just "agree with Agent B's default"; there is a closer, more precise, and already-used
precedent in this exact archive for exactly this scenario: `data/models/witeden/witeden-mixup-*.yml`
— four models under one family (`witeden-mixup-3x3`), each a genuinely distinct mold under one
shared line name, sold **concurrently**, with **no** `succeeds` relationship between them and
**no** `generation` field set on any of the four (each carries an explicit
`/generation: {confidence: unknown, note: "...one of four parallel named designs under the
shared family name, not a numbered/sequential generation. Field left unset rather than
invented."}`). Bermuda's own evidence is stronger on this exact point than Mixup's: DaYan's own
2012 category page lists all five sub-products in one page (not staggered captures), and the
2013 individual product page shows Column and Triangle cross-linked as *current* siblings —
i.e. direct evidence of concurrent, not sequential, sale. **Use the identical pattern**:
`generation` unset on all five Bermuda models, with the same "one of five parallel named
designs" wording in each `/generation` attestation. This is a **correction to the plan as
handed off**, not a disagreement with the disposition — Agent B left it as an open
recommendation ("recommend recording as parallel models... per §4.2's split-under-uncertainty
default") without naming the mechanism (no `generation` field, no `succeeds`); I am making that
explicit and pointing at the exact precedent already in the archive so whoever writes these
records does not have to re-derive it.

### ShengShou Rainbow / Gem / Tank — 1 model each (matches plan)

| Family | Model id | Name |
|---|---|---|
| `shengshou-rainbow` | `shengshou-rainbow-3x3` | "ShengShou Rainbow 3x3" |
| `shengshou-gem` | `shengshou-gem-3x3` | "ShengShou Gem 3x3" |
| `shengshou-tank` | `shengshou-tank-3x3` | "ShengShou Tank 3x3" |

No sibling generation was found for any of the three by any lane (no "V2"/"Pro"/second dated
capture with a different mould description). Each gets a single model with
`generation: {label: "Original", ordinal: 1, basis: community_convention}`, matching every
other single-generation ShengShou family already in the archive
(`shengshou-aurora-original`, `-wind-original`, `-pearl-original`, `-fangyuan-original`,
`-mr-m-original`, `-3x3-original`, `-yufeng-original` — seven precedents, zero exceptions).

**Gem/Tank "similar" question (wiki: "ShengShou Tank 3x3 — A 3x3 similar to the Gem"):
recommend NOT merging, and recommend the "flagged, not resolved" note both lanes already
drafted survive verbatim into the model records.** A single tier-4 comparative sentence is far
too thin to collapse two independently-evidenced, differently-described (different weight,
different exterior finish — "shiny" vs "frosted") product lines. Splitting under uncertainty is
correct per §4.2; this is not really a close call.

**No second model should be created for either "ShengShou Metallic" (SpeedCubeShop) or
"ShengShou Full-Function Crazy" (2x2) — these are unresolved leads outside this batch's
evidence, not siblings to fold in now.** See §7.

### ShengShou Crazy — 2 models (matches plan; scope_class dispute resolved, see §3)

| id | name |
|---|---|
| `shengshou-crazy-3x3` | "ShengShou Crazy 3x3" |
| `shengshou-crazy-3x3-v2` | "ShengShou Crazy 3x3 V2" |

Agree with 2 models. The V1→V2 ring-piece-count difference (8 vs 9 pieces per ring) is
documented, tier-2, and independent of the version label itself — this is squarely a
"different internal geometry... a new model, whatever the marketing says" case under §4.2,
stronger evidence than most `succeeds` splits already in this archive (e.g. `mf8-crazy-3x3-plus-planet-series`'s
succession rests on a naming-era gap alone, with **no** stated mechanism difference — Crazy's
V1/V2 split is better evidenced than that accepted precedent). `generation`:
V1 = `{label: "Original", ordinal: 1, basis: community_convention}` (no version marker on its
own name); V2 = `{label: "V2", ordinal: 2, basis: manufacturer_declared}` ("V2" is in the
product's own name/URL, exactly the `shengshou-yufeng-v2`/`shengshou-mr-m-v2` pattern) with a
`succeeds` relationship V2 → V1, `confidence: probable` (a documented mechanism change, not
just a label — this can be `probable`, not merely `uncertain`, unlike the mf8 Plus-series
split which rested on naming alone).

**The Jelly LE must NOT become a third model.** Agree fully with Agent C: a single "Transparent
Stickerless" variant, no mechanism claim distinguishing it, reads exactly as material/colourway
— textbook Pass-4 variant material under §4.1 (colourway, material, limited-edition status are
all named in §4.1's list of variant-triggering differences, none of them model-triggering).
**Open question correctly left for whoever creates the variant record: which generation (V1 or
V2 ring count) the Jelly LE is built on is not determinable from the page fetched — record it
with the parent model unresolved/flagged explicitly rather than guessing.** I recommend
whoever executes Pass 4 treat this as a blocking question for that one variant record, not
resolve it by assuming V2 because it is newer — no source supports that assumption.

**Model count total check: 1 + 5 + 1 + 1 + 1 + 2 = 11. Confirms the plan's arithmetic
independently.** 258 existing + 11 = **269**, matching the plan exactly.

---

## 3. `scope_class` per model, with justification prose where conditional

### `core` (6 models: CubeTwist standard, Rainbow, Gem, Tank, plus Crazy handled separately below)

- **CubeTwist 3x3x3 Speed Cube**: standard 57mm/94g plain-sticker mechanism, manufacturer's own
  category separates it from 异形 (novelty). `core`. No dispute.
- **Rainbow / Gem / Tank 3x3**: all three are described, by every source found (TheCubicle,
  SpeedCubeShop, Cubelelo, the wiki), as standard non-magnetic 3x3x3 mechanisms with no shape
  modification. `core`. No dispute. (Contrast Metal Cube, correctly refused by Agent D on
  unresolved WCA legality — none of these three carries that problem: no metal shell, no
  weight anomaly, no shape claim.)

### `conditional` — DaYan Bermuda, all five models

All five are bandaged and/or non-cubic shape mods ⇒ not WCA-legal ⇒ `conditional`, per the plan.
**Draft justification prose for each, reusing the shape of `calvins-maze-300-cube`'s
(documented category match + retailer description match + continuous multi-year, multi-retailer
circulation) and `witeden-mixup-oskar`'s (documented place in a manufacturer's own official
product history, stated directly rather than inferred):**

**`dayan-bermuda-triangle`** —
> Non-WCA-legal bandaged 3x3 (pieces physically restricted from independent movement, per
> TheCubicle's own description: "The Dayan Bermuda series features a variety of common 3x3
> puzzles and shape-mods but with certain parts 'bandaged' to make each of them a unique
> challenge to solve," `thecubicle-dayan-bermuda-cube-2020`). Admitted on a documented place in
> DaYan's own manufacturer history: DaYan's own 2012 official category page
> (`dayancube-official-bermuda-category-2012`, tier 1) lists "Dayan Bermuda Cube" as a
> top-level product category coordinate with its numbered flagship line (GuHong/LingYun/
> LunHui/ZhanChi) in the manufacturer's own site navigation — not an inferred or retailer-
> invented grouping. Independently, a documented collector market: two genuinely independent
> retailers (TheCubicle US, Cubelelo India) each carry this line under their own naming
> conventions across a six-plus-year span (2019/2020 through at least 2025-08-14). Clears the
> §2.2 bar on either ground alone.

**`dayan-bermuda-column`**, **`-house-i`**, **`-house-ii`**, **`-star`** — same justification
prose, substituting the model's own name and noting each is independently named on the same
2012 tier-1 category page (`dayancube-official-bermuda-category-2012`) and independently
photograph-confirmed as a distinct exterior mold from Triangle. For `-column` specifically, add
the individual 2013 product-page evidence: it was priced and cross-linked as a concurrent
sibling of Triangle, not a rename — direct evidence this is a genuine, separately marketed
product, not a retailer artifact.

`scope_decided_by`/`scope_decided_on`: set per model at the time of creation, per §2.5 — this
review does not set them (that is a curation act, not a mapping-review act).

**Attestation on `/scope_justification`**: cite `dayancube-official-bermuda-category-2012`
(tier 1) and `thecubicle-dayan-bermuda-cube-2020` (tier 2) — confidence `probable` (the tier-1
existence/category-placement claim is strong, but no source states the *specific* WCA-illegality
regulation text, the same open gap Agent B flagged and I confirm is still open — see §7).

### Disputed call, resolved — ShengShou Crazy

**Recommendation: `reference_only` for `shengshou-crazy-3x3` (V1), `conditional` for
`shengshou-crazy-3x3-v2`.**

This is not a split-the-difference compromise; it tracks a real evidentiary asymmetry between
the two records and matches an **exact precedent already in this archive**:
`calvins-full-function-crazy-3x3` was recorded `reference_only` specifically because "no other
source located this pass documents a competitive use, collector market, production first, or
design influence for this specific product" — and V1 here is in that identical position: a
generic locked-ring mechanism ("well ahead of other 'crazy' puzzles" is itself an admission of
being one of several makers of a known mechanism), no production-first claim, no design-
influence claim, and a comparatively short documented circulation window (~2021/2023–2026,
3–5 years, versus `mf8-crazy-3x3x3`'s documented decade-plus that the S6 policy treats as the
clearing bar).

**V2 is different in kind, not just degree**: the 1400-unit-worldwide Jelly LE is a
quantifiable, non-superlative production-run figure — RESEARCH_SPEC §3.3 explicitly treats
manufacturer-stated production numbers as specification-like, not marketing copy — and it is
the concrete "documented collector market" signal §2.2 asks for, something `calvins-crazy-3x3`'s
family never had and `calvins-full-function-crazy-3x3`'s model record never had either. Combined
with the documented ring-count mechanism change (real design evolution, not just a label), V2
clears `conditional` where V1 does not.

Draft justification for `shengshou-crazy-3x3-v2`:
> Non-WCA-legal shape mod (TheCubicle: "Type: Shape Mods" on the base generation; the ring
> mechanism itself — faces with independently non-turning rings — is the same documented
> "Crazy cube" concept already admitted under `mf8-crazy-3x3x3` and `calvins-crazy-3x3`).
> Admitted on a documented collector-market signal: a "ShengShou Crazy 3x3 (Jelly LE)" was
> sold "limited to 1400 units worldwide" (`thecubicle-shengshou-crazy-3x3-generations-2026`),
> a quantified production-run figure, not adjectival marketing copy, layered onto this
> generation's line. Independently, this generation carries a documented mechanism change from
> its predecessor (9 pieces per ring vs. the base generation's 8), evidencing genuine design
> lineage rather than a version-number refresh alone.

**I flag one weakness in this recommendation that a human should weigh**: the Jelly LE's
generation (whether it is built on the V1 8-piece or V2 9-piece mechanism) is **not
established** by any source. If the Jelly LE actually sits on V1's mechanism, the "documented
collector market" signal properly belongs to V1, not V2, and the case above would need
re-examining. **Recommend resolving the Jelly LE's parent generation before finalizing this
call**, or alternatively admitting V2 as `conditional` on the ring-count evidence alone
(design lineage) independent of the Jelly LE question, and treating the Jelly LE's own
significance as a separately-flagged open question at variant-creation time (Pass 4) rather
than baked into the V2 model's justification prose as written above.

---

## 4. Dates — exactly what can be honestly carried

**`cubetwist-3x3` family**: `introduced: {value: "2010", precision: year, qualifier: before}`,
sourced to `cubetwist-com-2010-3x3-listing` (tier 1 page-update timestamp, 2010-07-28 —
bounds page revision, not launch). `confidence: probable` (a page-update bound, not a release
statement — matches Agent A's own proposal exactly). Model `cubetwist-3x3-standard`:
`released: unknown` — no dated statement anywhere; Cubezz's earliest capture (2015-04-29) is a
circulation bound already captured at family level, not restated at model level (would be
noise per the inheritance rule).

**`dayan-bermuda` family**: `introduced: {value: "2012", precision: year, qualifier: before}`,
sourced to `dayancube-official-bermuda-category-2012` (tier 1, 2012-06-04 capture).
`confidence: probable` (existence/circulation bound from a tier-1 category page, not a stated
launch date — correctly not `confirmed`, since no source states a release date at all). All
five models: `released: unknown` — no dated statement found for any individual sub-product; the
2013-09-10 individual Column product page and the 2019/2020 retailer captures are circulation
bounds already carried at family level.

**`shengshou-rainbow` family**: **`introduced: unknown` is defensible, but recommend a
`qualifier: before` bound instead, sourced carefully.** Do **not** use SpeedCubeShop's
2016-01-08 capture without flagging the artifact risk explicitly: the sibling TheCubicle
Rainbow page (`thecubicle-shengshou-other-3x3-lines-2026`) carries the **discarded**
`Added: 2018-09-11` catalogue-migration artifact directly on this exact product's own spec
table, and that source's own reliability_note already states this correctly ("the one
'Added:' date quoted (Rainbow, 2018-09-11)... discarded outright"). Because this specific
product is the one this session's brief calls out as carrying the artifact, and because the
artifact is now proven not to reflect anything about this product's real timeline,
**recommend using the SpeedCubeShop 2016-01-08 capture as the `qualifier: before` bound
instead** (a *different*, non-artifact source) — `introduced: {value: "2016", precision: year,
qualifier: before}`, sourced to `shengshou-rainbow-independent-multi-retailer-2026`,
`confidence: probable`. **State explicitly in the attestation note that the 2018-09-11 `Added:`
field on the same product at a different retailer is the documented artifact and was
discarded, not used even as a bound** — so a future researcher sees the artifact was seen and
rejected, not missed. Model `shengshou-rainbow-3x3`: `released: unknown`.

**`shengshou-gem` / `shengshou-tank` families**: **`introduced: unknown`** for both. No dated
statement of any kind was found by Agent D for either — TheCubicle's 2020-09-18/2020-09-27
captures are circulation bounds only and Agent D correctly declined to smuggle them in as dates
("not recorded as `introduced` at all rather than smuggled in as one"). Models:
`released: unknown` for both.

**`shengshou-crazy` family**: **`introduced: unknown`.** No explicit dated statement anywhere;
TheCubicle's 2022-08-07/2023-02-06 captures for V1 are circulation bounds, and the discarded
`Added: 2021-12-15` field on the same page is **not** used even as a bound (matches the
`shengshou-yufeng` family's own precedent of refusing a same-class "Added:" field outright).
Model `shengshou-crazy-3x3`: `released: unknown`. Model `shengshou-crazy-3x3-v2`:
`released: unknown` (earliest capture 2024-04-16 is a circulation bound only).

**Summary table:**

| Record | Field | Value | Precision | Qualifier | Source | Confidence |
|---|---|---|---|---|---|---|
| `cubetwist-3x3` | introduced | 2010 | year | before | `cubetwist-com-2010-3x3-listing` | probable |
| `dayan-bermuda` | introduced | 2012 | year | before | `dayancube-official-bermuda-category-2012` | probable |
| `shengshou-rainbow` | introduced | 2016 | year | before | `shengshou-rainbow-independent-multi-retailer-2026` | probable |
| `shengshou-gem` | introduced | — | — | — | unknown | unknown |
| `shengshou-tank` | introduced | — | — | — | unknown | unknown |
| `shengshou-crazy` | introduced | — | — | — | unknown | unknown |
| all 11 models | released | — | — | — | unknown | unknown |

---

## 5. Rule 40 pre-check

Rule 40 only fires when **both** a model's `released`/`announced` **and** its family's
`introduced` are set (`if (!famDate || !modelDate) continue;` in `scripts/lint-semantic.mjs`).
Per §4 above, **every one of the 11 planned models has `released: unknown` — no model date is
set at all.** Rule 40 therefore **cannot fire on any of the six new families**, regardless of
what `introduced` value each family carries, because the rule requires a model-side date to
compare against.

**This is not an accident to preserve — it is the honest state of the evidence** (no lane found
a dated release statement for any of the eleven products). If a future pass does establish a
model-level date for any of these eleven (e.g. if the Jelly LE's own capture date, or some
CubeTwist keychain evidence, is later promoted to a model date), it should be checked against
its family's `introduced` bound before being added, since e.g. CubeTwist's family bound is
`before 2010` (tight) and Bermuda's is `before 2012` (tight) — a later-discovered model date
earlier than either bound would need the same rule-40 judgement call already made for
`qiyi-valk-3` (real conflict, kept visible) rather than silently smoothed over.

**Baseline stays at 4 (independently re-verified by running `npm run lint` before writing this
report). No 5th rule-40 warning is introduced by this batch, deliberately, because no new model
carries a date to conflict with.**

---

## 6. Required fields and attestations per record

All six families satisfy the schema-required set (`id, entity, manufacturer_id, name, status`)
trivially — `status: drafted` or `sourced` per the existing house convention (families that
rest on solid but non-tier-1-complete evidence are `drafted`; `shengshou-yufeng` shows
`sourced` is reachable once every critical field is attested-or-unknown). Recommend
`status: sourced` for `cubetwist-3x3` and `dayan-bermuda` (both `confirmed`-level identity
evidence, tier 1) and `status: drafted` for the four `probable` ShengShou families, matching
the adjudication document's own confidence split.

All eleven models satisfy the schema-required set (`id, entity, family_id, manufacturer_id,
name, scope_class, status`). `generation` is optional on the schema but used as house
convention on every existing single- and multi-generation model in this archive — recommend
setting it on all eleven per §2 above (`unset`/`unknown`-attested only for the five Bermuda
models, per the Mixup precedent).

**Critical-field attestation requirement (rule 6) only bites once a record reaches
`status: sourced` or later** (`isAtLeastSourced`). If any of these eleven models is written at
`status: sourced` (matching the `shengshou-yufeng-*` precedent, which is `sourced`), every
`x-critical` field under `specs` (`size_mm`, `weight_g`, `core_system`, `maglev`,
`magnet_architecture`, `adjustment_system`) needs an attestation — either a real value with
sources, or `confidence: unknown` with a "searched and not found" note. Per model:

| Model | specs evidenced | specs needing `unknown` attestation |
|---|---|---|
| `cubetwist-3x3-standard` | `size_mm: 57.0`, `weight_g: 94.0` (both `probable`, single tier-2 source `cubezz-cubetwist-speed-3x3` — **see confidence flag below**) | `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |
| `dayan-bermuda-triangle` | none | `size_mm`, `weight_g`, `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |
| `dayan-bermuda-column` | none | all six |
| `dayan-bermuda-house-i` | none | all six |
| `dayan-bermuda-house-ii` | none | all six |
| `dayan-bermuda-star` | none | all six |
| `shengshou-rainbow-3x3` | `size_mm: 56.2` (`probable`, `thecubicle-shengshou-other-3x3-lines-2026`); `weight_g` **disputed, do not silently pick one** — TheCubicle states 100g, SpeedCubeShop's structured JSON states 119 (unit unstated) — record `confidence: disputed` with both candidates in the `disputed` block, per rule 11, rather than choosing either | `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |
| `shengshou-gem-3x3` | `weight_g: 104.0` (`probable`, one source) | `size_mm`, `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |
| `shengshou-tank-3x3` | `size_mm: 56.0`, `weight_g: 100.0` (`probable`, one source) | `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |
| `shengshou-crazy-3x3` | `size_mm: 60.5`, `weight_g` — TheCubicle gives two different figures across captures (103–117g); **treat as unresolved, do not average or pick one — record `disputed` or the single most-cited figure at `uncertain` with the discrepancy noted, human's call** | `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |
| `shengshou-crazy-3x3-v2` | `size_mm: 60.0`, `weight_g: 124.0` (`probable`) | `core_system`, `maglev`, `magnet_architecture`, `adjustment_system` |

**Confidence flag on CubeTwist's specs**: `cubezz-cubetwist-speed-3x3`'s own reliability_note
recommends downgrading any downstream claim to `reported`, but per `vocab/confidence.yml` a
single, uncontradicted tier-2 source is `probable`, not `reported` (`reported` is defined as a
**tier 3** source). The source record's own `tier` field states `tier: 2` explicitly. **This is
an internal inconsistency in the source record worth flagging to whoever writes the model — the
vocabulary's own table says `probable`, and I recommend following the vocabulary over the
source's informally-worded suggestion**, but note it rather than silently overriding the
source's own words.

**`generation`** (schema requires `label` + `basis` when present): as tabulated in §2 — all
eleven get `basis: community_convention` except `shengshou-crazy-3x3-v2`
(`manufacturer_declared`, "V2" in its own product name/URL) — and the five Bermuda models
should have `generation` **left entirely unset**, matching the Mixup precedent, not filled with
a guessed ordinal.

**`scope_justification`** (rule 15, required when `conditional`): drafted in §3 for all six
conditional Bermuda-class models (five Bermuda + Crazy V2). Each needs its own
`/scope_justification` attestation citing at least one tier 1–3 source — drafted above, citing
`dayancube-official-bermuda-category-2012` + `thecubicle-dayan-bermuda-cube-2020` for Bermuda
and `thecubicle-shengshou-crazy-3x3-generations-2026` for Crazy V2.

**`legality` block — a schema gap, flagged, not worked around (see §7).**

**Manufacturer conditional-share check (advisory, run this session):** `npm run check` shows
DaYan currently at 23 `core` models, 0 `conditional`. Adding 5 `conditional` Bermuda models
gives 5/28 ≈ 17.9% conditional share — under the coverage report's quarter threshold that
already flags `witeden` (conditional 4, reference_only 2, over a quarter). Not a blocker, but
worth re-checking once written, since the coverage report computes this from the built bundle,
not from this review.

---

## 7. Anything that should NOT be created

1. **ShengShou Metal Cube 3x3 — do not create.** Agent D's disposition E (refused) is correct
   and I independently re-confirm it: no cross-range naming, one publisher, and — decisively —
   the only significance language found ("very cool finish," "very satisfying to touch and
   solve") is exactly the class RESEARCH_SPEC §2.2 names as insufficient. WCA legality is
   `unknown` in either direction, which blocks `core` too. Correctly left unrecorded, not even
   `reference_only` (that class is for identity-only lineage anchors, and Metal Cube is not a
   predecessor/successor of anything in scope).

2. **A CubeTwist 40mm keychain model — do not create** (see §2). Record as a lead in the
   family description only.

3. **A sixth CubeTwist product for the DIY kit or a fourth colourway — do not create.** Both
   are Pass-4 variant material under the existing `cube4you-3x3` precedent.

4. **A model or variant for "ShengShou Metallic" (SpeedCubeShop's 2x2–5x5+Pyraminx
   magnetic/non-magnetic finish line) — do not create anything under `shengshou-gem` or any
   other family from this lead.** Agent D's own fetch returned only site chrome — this is
   genuinely unresolved, not even weakly evidenced as related to any of the six families in
   this batch. Leave as a documented lead for a future pass (P26-6-class), not folded into Gem,
   Tank, or a new seventh family now.

5. **ShengShou "Full-Function Crazy" 2x2 — do not fold into `shengshou-crazy`.** No 3x3 SKU was
   found under this name by any lane; whether it is the same mechanism concept as plain "Crazy"
   is unresolved and it is a 2x2-only product regardless (out of this archive's 3x3x3 scope per
   RESEARCH_SPEC §2.4). Leave as a lead.

6. **A `dayan-bermuda` sixth sub-product — do not assume none exists, but also do not block on
   it.** Agent B's own prefix sweep was capped at `--limit 200` and not confirmed exhaustive.
   Recommend a follow-up uncapped sweep before or shortly after creation, but this should not
   hold up creating the five already-confirmed sub-products.

7. **Do not merge ShengShou Tank into ShengShou Gem** on the wiki's "similar to the Gem"
   sentence — a single tier-4 comparative claim, contradicted by different stated weights and
   different stated finishes. Splitting under uncertainty is correct here.

8. **Do not set a `succeeds` relationship between DaYan Bermuda House I and House II.** No
   source states or implies succession; both appear in the same 2012 listing and both persist
   in TheCubicle's catalogue for years concurrently. Record as parallel per §2.

9. **Do not correct `data/manufacturers/cubetwist.yml`'s "novelty specialist" / "no standard
   WCA-legal 3x3 was found" framing as part of this mapping-review's own output** — that record
   is outside this review's write lane and outside the family/model mapping task strictly
   construed, but **flag it explicitly here so the executing session does not forget it**:
   Agent A's finding directly contradicts that manufacturer record's own attested claim, and
   leaving the contradiction unresolved after `cubetwist-3x3` is created would be an
   "unresolved conflict presented as settled" — the manufacturer record needs a companion
   correction in the same execution pass, with its own attestation update, not a silent
   overwrite.

10. **A `legality` block on any of the six `conditional` models (five Bermuda + Crazy V2) —
    cannot be created as things stand, and this is a schema gap, not a researcher choice (see
    below).**

---

## Schema gap found (not worked around)

**`legality` (the block RESEARCH_SPEC §2.2 requires — `wca_status` plus `basis` — for every
non-`core` admission) is defined only on `schema/variant.schema.json`, not on
`schema/model.schema.json`.** `scope_class` is a **model**-level required field (schema), but
the field RESEARCH_SPEC §2.2 names as required alongside it (`legality.wca_status` /
`legality.basis`) has nowhere to live on a model record. This is not new to this batch — I
confirmed the four existing `conditional`/`reference_only` model precedents read in depth
(`calvins-maze-300-cube`, `mf8-crazy-3x3-planets`, `calvins-full-function-crazy-3x3`,
`witeden-mixup-oskar`) **all lack a `legality` block for exactly this reason**, and
`calvins-maze-300-cube`'s own header comment says so explicitly ("the existing
`calvins-maze-300-cube` precedent has the same gap unfilled"). **This review does not invent a
workaround** (e.g. stuffing `wca_status` into `description` prose, which several of the read
precedents already do informally) — it is flagged here as a standing schema defect affecting
every `conditional` model in the archive, not unique to this batch's six new records, and
should be raised to whoever owns `schema/` rather than patched per-record.

---

## Machine-readable summary

```yaml
total_new_models: 11
duplicates_found: false

families:
  - family_id: cubetwist-3x3
    positioning: budget
    introduced: {value: "2010", precision: year, qualifier: before}
    models:
      - id: cubetwist-3x3-standard
        name: "CubeTwist 3x3x3 Speed Cube"
        scope_class: core
        released: null
        specs_evidenced: [size_mm, weight_g]
        specs_needing_unknown_attestation: [core_system, maglev, magnet_architecture, adjustment_system]
        generation: {label: "Original", ordinal: 1, basis: community_convention}

  - family_id: dayan-bermuda
    positioning: special
    introduced: {value: "2012", precision: year, qualifier: before}
    models:
      - id: dayan-bermuda-triangle
        name: "DaYan Bermuda Triangle"
        scope_class: conditional
        released: null
        specs_evidenced: []
        specs_needing_unknown_attestation: [size_mm, weight_g, core_system, maglev, magnet_architecture, adjustment_system]
        generation: null
      - id: dayan-bermuda-column
        name: "DaYan Bermuda Column"
        scope_class: conditional
        released: null
        specs_evidenced: []
        specs_needing_unknown_attestation: [size_mm, weight_g, core_system, maglev, magnet_architecture, adjustment_system]
        generation: null
      - id: dayan-bermuda-house-i
        name: "DaYan Bermuda House I"
        scope_class: conditional
        released: null
        specs_evidenced: []
        specs_needing_unknown_attestation: [size_mm, weight_g, core_system, maglev, magnet_architecture, adjustment_system]
        generation: null
      - id: dayan-bermuda-house-ii
        name: "DaYan Bermuda House II"
        scope_class: conditional
        released: null
        specs_evidenced: []
        specs_needing_unknown_attestation: [size_mm, weight_g, core_system, maglev, magnet_architecture, adjustment_system]
        generation: null
      - id: dayan-bermuda-star
        name: "DaYan Bermuda Star"
        scope_class: conditional
        released: null
        specs_evidenced: []
        specs_needing_unknown_attestation: [size_mm, weight_g, core_system, maglev, magnet_architecture, adjustment_system]
        generation: null

  - family_id: shengshou-rainbow
    positioning: mainline
    introduced: {value: "2016", precision: year, qualifier: before}
    models:
      - id: shengshou-rainbow-3x3
        name: "ShengShou Rainbow 3x3"
        scope_class: core
        released: null
        specs_evidenced: [size_mm]
        specs_needing_unknown_attestation: [core_system, maglev, magnet_architecture, adjustment_system]
        # weight_g is DISPUTED (100g TheCubicle vs 119 SpeedCubeShop, unit unstated) - record
        # confidence: disputed with both candidates, do not pick one
        generation: {label: "Original", ordinal: 1, basis: community_convention}

  - family_id: shengshou-gem
    positioning: mainline
    introduced: null
    models:
      - id: shengshou-gem-3x3
        name: "ShengShou Gem 3x3"
        scope_class: core
        released: null
        specs_evidenced: [weight_g]
        specs_needing_unknown_attestation: [size_mm, core_system, maglev, magnet_architecture, adjustment_system]
        generation: {label: "Original", ordinal: 1, basis: community_convention}

  - family_id: shengshou-tank
    positioning: mainline
    introduced: null
    models:
      - id: shengshou-tank-3x3
        name: "ShengShou Tank 3x3"
        scope_class: core
        released: null
        specs_evidenced: [size_mm, weight_g]
        specs_needing_unknown_attestation: [core_system, maglev, magnet_architecture, adjustment_system]
        generation: {label: "Original", ordinal: 1, basis: community_convention}

  - family_id: shengshou-crazy
    positioning: special
    introduced: null
    models:
      - id: shengshou-crazy-3x3
        name: "ShengShou Crazy 3x3"
        scope_class: reference_only   # RECOMMENDATION, resolving the disputed call - see section 3
        released: null
        specs_evidenced: [size_mm]
        specs_needing_unknown_attestation: [core_system, maglev, magnet_architecture, adjustment_system]
        # weight_g DISPUTED across TheCubicle's own fields (103-117g) - do not average
        generation: {label: "Original", ordinal: 1, basis: community_convention}
      - id: shengshou-crazy-3x3-v2
        name: "ShengShou Crazy 3x3 V2"
        scope_class: conditional      # RECOMMENDATION, resolving the disputed call - see section 3
        released: null
        specs_evidenced: [size_mm, weight_g]
        specs_needing_unknown_attestation: [core_system, maglev, magnet_architecture, adjustment_system]
        generation: {label: "V2", ordinal: 2, basis: manufacturer_declared}
```
