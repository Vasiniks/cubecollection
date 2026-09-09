# Pass 4 — Agent D — DaYan + ShengShou Variant Enumeration

Status: IN PROGRESS (skeleton committed first per protocol)

Scope: 28 DaYan models + 18 ShengShou models = 46 models. Low-density lane —
both manufacturers' official sites are dead; many DaYan flagships predate
magnetic variants. Zero-variant results are expected and correct where
evidenced.

findings-so-far: Bermuda sub-line done (12 variant stubs across 5 models). See per-model log.

## Per-model log

(to be filled in as each model is assessed)

### DaYan

- [x] dayan-bermuda-triangle — AXIS: colourway (DaYan's own eight planet names). Created 8 stub
  variants (`dayan-bermuda-triangle--earth/jupiter/mars/mercury/neptune/saturn/uranus/venus`),
  `edition.types: [standard]`, `colorway.designation` = planet name verbatim. Evidence: DaYan's
  own 2012 official category page (`dayancube-official-bermuda-category-2012`, tier 1) names
  each planet in both Black and White as separate catalogue lines; TheCubicle
  (`thecubicle-dayan-bermuda-cube-2020`, tier 2) corroborates under simplified "Bermuda Cube
  [Planet]" naming, recorded as an alias.
  MATERIALITY CALL: Black/White are NOT split into a further 16-way variant set. Per the GAN356
  Air precedent (stock black/white/primary options collapse into one variant absent a further
  named edition), the planet name is read as DaYan's own named sub-product/edition, and
  Black/White as the stock body-colour choice within it — the same anti-explosion logic applied
  to Rainbow/Gem/Tank elsewhere in this brief. Flagged explicitly in each stub's attestation for
  Pass 5 to revisit with photographic/retailer confirmation if a source is later found treating
  Black and White as separately named/marketed (not merely separately listed) SKUs.
  Confidence: `confirmed` on planet naming (tier 1), `probable` on edition.types (no
  limited/commemorative language found).
- [x] dayan-bermuda-column — AXIS: none found beyond stock Black/White (no further named theme,
  unlike Triangle). Created ONE `standard` variant (`dayan-bermuda-column--standard`) per the
  same GAN356 Air stock-colour precedent. Alias: TheCubicle's "DaYan Bermuda Barrel".
- [x] dayan-bermuda-house-i — same pattern. ONE `standard` variant
  (`dayan-bermuda-house-i--standard`). No further theme/edition found.
- [x] dayan-bermuda-house-ii — same pattern. ONE `standard` variant
  (`dayan-bermuda-house-ii--standard`). No further theme/edition found. (Confirmed: House I and
  House II are separate MODELS per the frozen taxonomy, not variants of one another or of
  Triangle — model records already state this; not revisited here.)
- [x] dayan-bermuda-star — same pattern. ONE `standard` variant (`dayan-bermuda-star--standard`).
  Alias: TheCubicle's "DaYan Bermuda Sunflower".

VALIDATOR FINDING (all five Bermuda models): rule 15 in `scripts/validate.mjs` checks
`scope_class`/`legality`/`scope_justification` directly on the record being validated and does
NOT resolve model-to-variant inheritance for these fields (unlike `/config/*` fields, which use
the `INHERITED_CRITICAL` map and are additionally gated behind `status: sourced`). Since every
Bermuda variant must itself carry `scope_class: conditional` (a schema-required field on every
variant) and rule 15 runs unconditionally on status, each variant stub had to locally restate
`scope_justification` and `legality.wca_status`/`basis`, in direct tension with this brief's "the
Bermuda models carry legality at model level — variants inherit it, do not restate it"
instruction. I resolved this by restating concisely with an explicit note in each attestation
that the content is inherited in substance and repeated only to satisfy rule 15's direct check,
not a fresh independent claim. Recorded as a schema/validator finding, not worked around
silently — see Escalations.
- [x] dayan-guhong-pro-m — AXIS: size (54/55/56mm) x magnet system (Standard magnetic / MagLev).
  Model record itself already states these are "sold in three sizes ... and two core options
  ... from parallel product-page families ... variant-level configuration choices of one
  design, not separate models." TheCubicle's own catalogue enumerates all six size×system
  combinations as distinct SKU paths (`thecubicle-dayan-collection-2025`:
  `dayan-guhong-pro-m-3x3-{54,55,56}mm-{standard,maglev}`). Created 6 stub variants
  (`dayan-guhong-pro-m--54mm-standard/54mm-maglev/55mm-standard/55mm-maglev/56mm-standard/
  56mm-maglev`), `edition.designation` = "{size}mm {Standard|MagLev}" (size folded into the
  designation string because the archive's fingerprint/duplicate-detection tooling keys off
  `edition.designation`/`config.*`/`colorway.*` only, not `config.size_mm` — see Escalations).
  Confidence `probable` (tier-2 retailer URL enumeration; only the 54mm/Standard SKU's own
  descriptive paragraph was directly fetched, the other five combinations generalised from the
  same catalogue's URL structure).
- [x] dayan-guhong-pro-plus — Same axis, stronger evidence: TheCubicle's own descriptive copy
  states directly "Choose from two magnetic systems: Standard Magnetic (64 magnets) ... or
  MagLev (94 magnets) ... Available in three sizes -- 54mm, 55mm, and 56mm"
  (`thecubicle-dayan-guhong-pro-plus-2026`), independently corroborated by SpeedCubeShop's own
  "Core Magnets"/"MagLev Core Magnets" sibling URLs across all three sizes
  (`speedcubeshop-dayan-guhong-pro-plus`). Created 6 stub variants, same
  naming/designation pattern as Pro M.
- [x] dayan-guhong-v1 — ZERO. Pre-magnet era (2010), single fixed configuration. TheCubicle's
  own capture shows only one SKU, discontinued by 2019, no size/colour/edition options found in
  any source (`thecubicle-dayan-guhong-descriptions`, `speedsolving-wiki-dayan-products`).
- [x] dayan-guhong-v2 — ZERO. Single configuration (adds torpedo pieces vs V1, but that is the
  model-defining mechanism change already captured at model level, not a variant). No further
  axis found.
- [x] dayan-guhong-v3-m — ZERO, with one lead flagged and rejected rather than acted on: a
  Cubelelo CDX sweep lists both `dayan-guhong-v3-m-3x3-magnetic` and
  `dayan-guhong-v3-m-3x3-stickerless-magnetic` (`cubelelo-dayan-products-prefix-2026`) as
  distinct URL paths, which could suggest a stickered/stickerless application axis. REJECTED as
  a variant candidate: no descriptive text was fetched for either Cubelelo path this session,
  the plain "magnetic" path does not itself state an application (stickered vs. stickerless),
  and this is exactly the shape of the HaiTun/ZhanLang false-positive precedent (a naming
  variation at one retailer, unconfirmed as two genuinely distinct physical SKUs) rather than a
  confirmed second configuration. Flagged as a lead for a future pass with time to fetch both
  Cubelelo pages directly, not acted on here.
- [x] dayan-guhong-v4-m — ZERO. Thin retailer copy (existence/naming only); the wiki's 70g
  weight claim is not adopted as a spec (wiki-only, tier 3) and no variant axis is stated by
  any tier 1-2 source.
- [x] dayan-lingyun-v1 — ZERO. Pre-magnet (2010), rests on the wiki alone (tier 3); no retailer
  product page or configuration axis found at all.
- [x] dayan-lingyun-v2 — ZERO. Single configuration (adds torpedo pieces vs V1 at model level).
  No size/colour/edition axis found in TheCubicle's own copy (`thecubicle-dayan-lingyun-v2`).
- [x] dayan-lunhui-v1 — ZERO. Pre-magnet (2011), single configuration; no axis found.
- [x] dayan-lunhui-2017 — ZERO. Single configuration; TheCubicle's own copy gives no
  size/colour/edition detail beyond "retains the same dense feel of the original."
- [x] dayan-panshi-v1 — ZERO. DaYan's sole, short-lived PanShi generation; TheCubicle's own
  copy only documents the (attempted) sturdiness and the 2014 discontinuation, no configuration
  options.
- [x] dayan-taiyan-v1 — ZERO. DaYan's first and rarest cube, single configuration; existence
  alone corroborated, no axis of any kind found.
- [x] dayan-tengyun-m — ZERO. TheCubicle's own copy describes a single 55mm spring-tensioned
  configuration (with two included spare spring sets, a bundled accessory rather than a
  variant per the "bundle membership" exclusion) and no colour/size/edition option.
- [x] dayan-tengyun-v2-m — ZERO. Single configuration (adjustable magnets/tension is the
  model-defining mechanism, already captured at model level); no further axis found.
- [x] dayan-tengyun-v3-m — ZERO. Single configuration; no axis found. (Cubelelo's
  `dayan-tengyun-m-3x3-magnetic-stickerless-spare-parts` vs
  `dayan-tengyun-m-3x3-stickerless-magnetic` paths belong to the base TengYun M, not V3 M, and
  the "spare-parts" suffix reads as an accessory/parts-kit SKU, not a cube configuration —
  rejected as a bundle, not chased further.)
- [x] dayan-xiangyun-v1 — ZERO. DaYan's seventh, single-generation product; existence
  corroborated at tier 2, no configuration axis found in any source.
- [x] dayan-zhanchi-v1 — ZERO. Single configuration (torpedo pieces are the model-defining
  mechanism); no axis found.
- [x] dayan-zhanchi-2017 — ZERO. Single configuration (piece-geometry redesign is model-level);
  no axis found.
- [x] dayan-zhanchi-2018 — ZERO. Single configuration; no axis found.
- [x] dayan-zhanchi-42mm — ZERO. Sold only as a DIY kit at one retailer (2015); no further
  colour/edition/config axis documented beyond the size itself, which is already the model
  boundary (this is a separate MODEL from standard ZhanChi per the frozen taxonomy, not a
  variant — not revisited here).
- [x] dayan-zhanchi-50mm — ZERO. Same structural note as 42mm; evidence here is even thinner
  (title-only capture), so no variant-level claim is made at all.
- [x] dayan-zhanchi-pro-m — ZERO, one candidate explicitly considered and REJECTED: SpeedCubeShop's
  own copy states "Available in a new Light Green color" (`speedcubeshop-dayan-zhanchi-pro-m`).
  Read as a plain stock-colour addition (the phrasing implies one colour option among others,
  not a separately named/marketed edition), so it collapses into the single implicit
  configuration rather than becoming its own variant, per the GAN356 Air stock-colour
  precedent. No "standard" stub was created for this model at all (see note below on when a
  bare "standard" stub is and isn't warranted).
- [x] dayan-zhanchi-v5-m — AXIS: manufacturer edition designation (Standard/Premium/Fancy),
  stated directly by the model record and TheCubicle's own copy: "It comes in three different
  versions with varying degrees of magnetic attraction and repulsion... This is the Standard
  version with white internals, conical spring tensioning system, and edge/corner -
  corner/core magnetization" (`thecubicle-dayan-zhanchi-descriptions`). Confirmed as three
  distinct catalogue SKUs at TheCubicle (`thecubicle-dayan-collection-2025`) and independently
  corroborated at SpeedCubeShop under "ZhanChi Pro V5" naming (soft identification, inherited
  from the model record at `uncertain`). Created 3 stub variants: `standard` (`probable`,
  full descriptive text available), `premium` and `fancy` (`uncertain`, existence/naming only
  — no SKU-specific descriptive paragraph was independently fetched this session for either).

NOTE on "standard" stubs for single-configuration models: per this brief's anti-explosion
doctrine and the GAN356 Air precedent, a bare, unnamed, single-configuration sold product does
not require its own explicit "standard" variant stub merely to exist — the model record itself
already represents "the one thing DaYan sold." I created explicit `--standard` stubs only for
the Bermuda Column/House I/House II/Star models, where `scope_class: conditional` structurally
requires every variant to carry its own restated legality/justification (see Escalations), so a
representable "the sold configuration" placeholder was needed to make the model's condition-al
admission concretely instantiable. For the 16 DaYan flagship zero-variant models above (core
scope, no conditional burden), I did NOT create empty `--standard` placeholder stubs, reading
"zero variants" as the correct, complete answer per the brief's explicit instruction that a
correct zero requires no filler record. Flagged here in case a future reviewer expects one
canonical stub per model regardless of scope_class — recorded as a judgement call, not silently
assumed.

### ShengShou

- [ ] shengshou-3x3-original
- [ ] shengshou-aurora-original
- [ ] shengshou-crazy-original
- [ ] shengshou-crazy-v2
- [ ] shengshou-fangyuan-original
- [ ] shengshou-fangyuan-v2-m
- [ ] shengshou-gem-standard
- [ ] shengshou-legend-big
- [ ] shengshou-legend-original
- [ ] shengshou-mr-m-original
- [ ] shengshou-mr-m-s
- [ ] shengshou-mr-m-v2
- [ ] shengshou-pearl-original
- [ ] shengshou-rainbow-standard
- [ ] shengshou-tank-standard
- [ ] shengshou-wind-original
- [ ] shengshou-yufeng-original
- [ ] shengshou-yufeng-v2

## Sources added

(none yet)

## Escalations

- **Schema/validator finding (not a model-boundary escalation, but reported per instructions to
  flag schema handling issues):** `scripts/validate.mjs` rule 15 checks `scope_class`,
  `scope_justification`, and `legality.wca_status`/`basis` directly on whatever record is being
  validated, with no inheritance resolution from model to variant (contrast `/config/*` fields,
  which use the `INHERITED_CRITICAL` map, and are additionally gated behind `status: sourced` so
  stubs are exempt). Because `scope_class` is schema-required on every variant record and rule 15
  runs regardless of `status`, every `conditional` Bermuda variant stub had to locally restate
  its model's `scope_justification` and `legality`, even though DATA_MODEL §3.5 and this brief
  both describe these fields as inherited. I did not treat this as license to invent — I restated
  the model's already-attested content verbatim in substance, cited the same sources, and flagged
  in each attestation that the restatement exists only to satisfy rule 15's non-inheriting check.
  A future schema/tooling pass may want to extend `INHERITED_CRITICAL`-style resolution to rule
  15, or explicitly document that conditional variants must restate these fields.

## Machine-readable summary (placeholder, updated at end)

```yaml
models_assessed: []
variants_created: []
models_at_zero: []
candidates_rejected: []
escalations: []
```
