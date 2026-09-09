# Pass 4 — Agent D — DaYan + ShengShou Variant Enumeration

Status: COMPLETE. All 46 models (28 DaYan + 18 ShengShou) assessed.

Scope: 28 DaYan models + 18 ShengShou models = 46 models. Low-density lane —
both manufacturers' official sites are dead; many DaYan flagships predate
magnetic variants. Zero-variant results are expected and correct where
evidenced.

findings-so-far: 35 stub variants created across 12 models (27 DaYan, 8 ShengShou); 34 models
left at zero with evidenced reasoning; 6 candidates explicitly rejected; the ShengShou Crazy
"Jelly LE" left unrecorded because its parent generation is genuinely undetermined; 2 rule-18
warnings deliberately surfaced per coordinator directive. See per-model log, Escalations, and
the machine-readable summary at the end.

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

- [x] shengshou-3x3-original — ZERO. Single, long-discontinued configuration; TheCubicle's own
  copy documents liquidation stock, not a configuration axis.
- [x] shengshou-aurora-original — AXIS: sticker application. TheCubicle's own catalogue carries
  both `shengshou-aurora-3x3` (base) and `shengshou-aurora-3x3-unstickered`
  (`thecubicle-shengshou-products-prefix-2026`, capture 2020-09-20) as distinct SKUs. Created 2
  stub variants: `standard` (`colorway.application: stickered`, `uncertain` — inferred only by
  contrast, no direct statement) and `unstickered` (`colorway.application: stickerless`,
  `uncertain` — retailer's own word "unstickered" mapped to the closest vocab value, no
  descriptive paragraph independently fetched).
- [x] shengshou-crazy-original — ZERO real configuration axis, but ONE stub deliberately
  created per coordinator directive: `standard`, reflecting TheCubicle's own single
  "Stickerless" product-option listing. Created specifically so rule 18's plausible-size check
  (which resolves `size_mm` from the model only via an enumerated variant) surfaces this
  model's genuinely out-of-range 60.5mm size as a visible, expected warning rather than an
  invisible gap. See Escalations. **The "Jelly LE" limited edition (transparent stickerless,
  "limited to 1400 units worldwide", `thecubicle-shengshou-crazy-3x3-generations-2026`) was
  explicitly NOT created as a variant of this or any model.** Both this brief and the model
  record itself state the Jelly LE's parent generation (this V1, 8-piece ring, or
  `shengshou-crazy-v2`, 9-piece ring) is not established by any source found — TheCubicle's own
  Jelly LE page states only the unit-count claim, no ring-piece-count or other mechanism detail.
  Since `model_id` is a required, non-optional field on every variant record, and I could not
  determine it without guessing, I left the Jelly LE unrecorded rather than assign it to either
  parent. Recorded here as the clearest single gap in this pass: a well-evidenced, genuinely
  limited product that the current schema cannot represent without a guessed parent. Flagged
  as a lead for a future pass with time to find photographic or descriptive evidence
  distinguishing an 8-piece from a 9-piece ring on the Jelly LE specifically.
- [x] shengshou-crazy-v2 — ZERO variants created. (The Jelly LE is not attached here either,
  for the same reason given above.) No other configuration axis found beyond the base sold
  configuration; a filler "standard" stub was not created for this model because rule 18 is not
  triggered by its 60.0mm size (within the plausible range) and it carries no other config
  distinct from its own model-level description.
- [x] shengshou-fangyuan-original — ZERO axis found for the base cube itself. One candidate
  explicitly considered and REJECTED for lack of evidence: `shengshou-fangyuan-3x3-gift-box`
  exists as its own catalogue path (`thecubicle-shengshou-products-prefix-2026`, capture
  2019-07-18), but no descriptive text was fetched this session confirming whether "gift box"
  denotes (a) the same single FangYuan 3x3 in different packaging (a rule-11 packaging variant)
  or (b) a multi-puzzle gift bundle (explicitly excluded — "bundle membership" is not a
  materiality ground). Left unrecorded rather than guessed; flagged as a lead for a future pass
  with time to fetch the page directly.
- [x] shengshou-fangyuan-v2-m — ZERO. Single sold configuration; no further axis found.
- [x] shengshou-gem-standard — ZERO axis found for the 3x3 configuration itself (checked
  specifically for a stickered/stickerless split per this brief's instruction — none found;
  the base SKU is already described as stickerless with no stickered sibling). One candidate
  considered and REJECTED for the same reason as FangYuan: `shengshou-gem-3x3-gift-box` exists
  as its own catalogue path (`shengshou-gem-tank-metal-cross-retailer-sweep-2026`, per the
  P26-5 adjudication note) but no descriptive text confirms packaging-only vs. bundle. Left
  unrecorded; flagged as a lead.
- [x] shengshou-legend-big — ZERO real configuration axis, but ONE stub deliberately created
  per coordinator directive: `standard`, reflecting TheCubicle's own single described
  configuration ("a bigger version of the ShengShou Legend 3x3... the same internal mechanism
  as the original"). Created specifically so rule 18's plausible-size check surfaces this
  model's genuinely out-of-range 70mm size as a visible, expected warning. See Escalations.
- [x] shengshou-legend-original — AXIS: sticker application (standard/unstickered) AND
  coating/magnet-configuration (Metallic/M Metallic). The model record itself explicitly
  hands this off to Pass 4: "Metallic and magnetic-metallic SKUs found at TheCubicle
  ... are treated as variants of this model ... not enumerated further here, per this pass's
  model/variant boundary." Created 4 stub variants: `standard` (base, inferred stickered),
  `unstickered` (`thecubicle-shengshou-products-prefix-2026`, capture 2021-09-21), `metallic`
  (capture 2024-02-20, `edition.designation: "Metallic"`), `m-metallic` (capture 2024-04-19,
  `edition.designation: "M Metallic"`). Coating/magnet-configuration fields deliberately left
  unset in `config` for metallic/m-metallic: no descriptive paragraph for either specific SKU
  was independently fetched this session, only catalogue URL paths, and this brief explicitly
  warns against inferring a coating from naming/photography alone. Flagged as the clearest
  Pass-5 fill target in this lane.
- [x] shengshou-mr-m-original — ZERO. TheCubicle's own copy describes "vibrant stickerless
  shades" (plural stock colours, no named editions) — collapses to the implicit single
  configuration per the GAN356 Air stock-colour precedent; no separate SKU found for any
  specific shade.
- [x] shengshou-mr-m-v2 — ZERO. Single sold configuration; no colour/edition axis found.
- [x] shengshou-mr-m-s — ZERO. The model record's own preface notes this generation's sole
  distinguishing trait (a matte finish) was already judged to sit at the *model* boundary
  (uncertain confidence, not revisited here); no further variant-level axis was found within
  this model's own single sold configuration.
- [x] shengshou-pearl-original — ZERO. Single sold configuration; no axis found.
- [x] shengshou-rainbow-standard — ZERO. Checked specifically for stickered/stickerless per
  this brief's instruction (Rainbow is already "ShengShou's first stickerless 3x3" at the model
  level, with no stickered sibling SKU found at any of the three retailers checked in Pass 3).
  No stock-colour explosion warranted; no further axis found.
- [x] shengshou-tank-standard — ZERO. Checked specifically for stickered/stickerless per this
  brief's instruction — no sibling SKU of either application found in any source; the base
  configuration ("vibrant color scheme, frosted exterior") is the only one documented.
- [x] shengshou-wind-original — ZERO. Single sold configuration, no spec table beyond
  description; no axis found.
- [x] shengshou-yufeng-original — ZERO. Single sold configuration (the disputed "magelev" URL
  slug is a specification dispute already fully documented and deliberately left unset at
  model level, not a variant axis — no second, competing YuFeng Original SKU was found).
- [x] shengshou-yufeng-v2 — ZERO. Single sold configuration; the model record itself notes
  what mechanically distinguishes V2 from Original is "not established by anything found," but
  that is a model-level open question already recorded, not evidence of a variant axis within
  V2 itself.

## Sources added

None. Every variant in this lane was evidenced entirely from sources already present in
`data/sources/` from Pass 2/2.6/3 work (DaYan and ShengShou model-enumeration passes and the
P26-5 family adjudications). No new `data/sources/*.yml` files were created this session — the
existing retailer CDX sweeps and product-description captures were sufficient for every
identity-level claim made here. Alias-collision check: none noticed (no two variants across
either manufacturer's scope shared a name or SKU that would collide).

## Escalations

- **Schema/validator finding (rule 15, not a model-boundary escalation):**
  `scripts/validate.mjs` rule 15 checks `scope_class`, `scope_justification`, and
  `legality.wca_status`/`basis` directly on whatever record is being validated, with no
  inheritance resolution from model to variant (contrast `/config/*` fields, which use the
  `INHERITED_CRITICAL` map, and are additionally gated behind `status: sourced` so stubs are
  exempt). Because `scope_class` is schema-required on every variant record and rule 15 runs
  regardless of `status`, every `conditional` Bermuda variant stub had to locally restate its
  model's `scope_justification` and `legality`, even though DATA_MODEL §3.5 and this brief both
  describe these fields as inherited. I did not treat this as license to invent — I restated the
  model's already-attested content verbatim in substance, cited the same sources, and flagged in
  each attestation that the restatement exists only to satisfy rule 15's non-inheriting check. A
  future schema/tooling pass may want to extend `INHERITED_CRITICAL`-style resolution to rule 15,
  or explicitly document that conditional variants must restate these fields.

- **Rule 18 exposure (coordinator-directed, not a defect I introduced):** rule 18's plausible
  3x3 size check (50-60mm) resolves `size_mm` from the parent model via an enumerated variant,
  so a model with an out-of-range size is invisible to the check until a variant exists under
  it. Two models in this lane have genuinely correct, well-evidenced sizes outside that range:
  `shengshou-crazy-original` (60.5mm, a pillowed locked-ring shape mod) and
  `shengshou-legend-big` (70mm, a documented oversized "Big Legend"). Per the coordinator's
  explicit direction, I enumerated a `standard` stub variant under each specifically so the
  check surfaces these two warnings rather than staying invisible, instead of suppressing them
  by avoiding variant creation or altering the frozen model specs. `npm run check` therefore
  reports **0 errors, 7 warnings** for the full archive at the end of this session (the
  documented 5-warning baseline plus these 2 expected rule-18 exposures) — not the 5-warning
  figure originally given, per the coordinator's correction.

- **Schema gap, not worked around (ShengShou Crazy "Jelly LE"):** a genuinely limited, well-
  evidenced product ("limited to 1400 units worldwide", transparent stickerless,
  `thecubicle-shengshou-crazy-3x3-generations-2026`) cannot be entered because its parent
  generation (`shengshou-crazy-original` vs `shengshou-crazy-v2`) is not established by any
  source, and `model_id` is a required, non-optional field on every variant. I left it
  unrecorded rather than guess. This is not a rule violation, but it is a case where the schema
  has no way to represent "a real product whose parent is genuinely disputed/unknown" other
  than omission — flagged in case a future schema revision wants a `model_id: unknown` /
  candidate-parent affordance for exactly this situation.

## Machine-readable summary

```yaml
models_assessed:
  - dayan-bermuda-column
  - dayan-bermuda-house-i
  - dayan-bermuda-house-ii
  - dayan-bermuda-star
  - dayan-bermuda-triangle
  - dayan-guhong-pro-m
  - dayan-guhong-pro-plus
  - dayan-guhong-v1
  - dayan-guhong-v2
  - dayan-guhong-v3-m
  - dayan-guhong-v4-m
  - dayan-lingyun-v1
  - dayan-lingyun-v2
  - dayan-lunhui-2017
  - dayan-lunhui-v1
  - dayan-panshi-v1
  - dayan-taiyan-v1
  - dayan-tengyun-m
  - dayan-tengyun-v2-m
  - dayan-tengyun-v3-m
  - dayan-xiangyun-v1
  - dayan-zhanchi-2017
  - dayan-zhanchi-2018
  - dayan-zhanchi-42mm
  - dayan-zhanchi-50mm
  - dayan-zhanchi-pro-m
  - dayan-zhanchi-v1
  - dayan-zhanchi-v5-m
  - shengshou-3x3-original
  - shengshou-aurora-original
  - shengshou-crazy-original
  - shengshou-crazy-v2
  - shengshou-fangyuan-original
  - shengshou-fangyuan-v2-m
  - shengshou-gem-standard
  - shengshou-legend-big
  - shengshou-legend-original
  - shengshou-mr-m-original
  - shengshou-mr-m-s
  - shengshou-mr-m-v2
  - shengshou-pearl-original
  - shengshou-rainbow-standard
  - shengshou-tank-standard
  - shengshou-wind-original
  - shengshou-yufeng-original
  - shengshou-yufeng-v2
variants_created:
  - dayan-bermuda-triangle--earth
  - dayan-bermuda-triangle--jupiter
  - dayan-bermuda-triangle--mars
  - dayan-bermuda-triangle--mercury
  - dayan-bermuda-triangle--neptune
  - dayan-bermuda-triangle--saturn
  - dayan-bermuda-triangle--uranus
  - dayan-bermuda-triangle--venus
  - dayan-bermuda-column--standard
  - dayan-bermuda-house-i--standard
  - dayan-bermuda-house-ii--standard
  - dayan-bermuda-star--standard
  - dayan-guhong-pro-m--54mm-standard
  - dayan-guhong-pro-m--54mm-maglev
  - dayan-guhong-pro-m--55mm-standard
  - dayan-guhong-pro-m--55mm-maglev
  - dayan-guhong-pro-m--56mm-standard
  - dayan-guhong-pro-m--56mm-maglev
  - dayan-guhong-pro-plus--54mm-standard
  - dayan-guhong-pro-plus--54mm-maglev
  - dayan-guhong-pro-plus--55mm-standard
  - dayan-guhong-pro-plus--55mm-maglev
  - dayan-guhong-pro-plus--56mm-standard
  - dayan-guhong-pro-plus--56mm-maglev
  - dayan-zhanchi-v5-m--standard
  - dayan-zhanchi-v5-m--premium
  - dayan-zhanchi-v5-m--fancy
  - shengshou-legend-original--standard
  - shengshou-legend-original--unstickered
  - shengshou-legend-original--metallic
  - shengshou-legend-original--m-metallic
  - shengshou-aurora-original--standard
  - shengshou-aurora-original--unstickered
  - shengshou-crazy-original--standard
  - shengshou-legend-big--standard
models_at_zero:
  - dayan-guhong-v1
  - dayan-guhong-v2
  - dayan-guhong-v3-m
  - dayan-guhong-v4-m
  - dayan-lingyun-v1
  - dayan-lingyun-v2
  - dayan-lunhui-v1
  - dayan-lunhui-2017
  - dayan-panshi-v1
  - dayan-taiyan-v1
  - dayan-tengyun-m
  - dayan-tengyun-v2-m
  - dayan-tengyun-v3-m
  - dayan-xiangyun-v1
  - dayan-zhanchi-v1
  - dayan-zhanchi-2017
  - dayan-zhanchi-2018
  - dayan-zhanchi-42mm
  - dayan-zhanchi-50mm
  - dayan-zhanchi-pro-m
  - shengshou-3x3-original
  - shengshou-crazy-v2
  - shengshou-fangyuan-original
  - shengshou-fangyuan-v2-m
  - shengshou-gem-standard
  - shengshou-mr-m-original
  - shengshou-mr-m-v2
  - shengshou-mr-m-s
  - shengshou-pearl-original
  - shengshou-rainbow-standard
  - shengshou-tank-standard
  - shengshou-wind-original
  - shengshou-yufeng-original
  - shengshou-yufeng-v2
candidates_rejected:
  - candidate: "DaYan GuHong V3 M — stickerless vs. plain 'magnetic' Cubelelo SKU naming"
    reason: "Only a URL-slug naming difference at one retailer CDX sweep; no descriptive text
      fetched confirming two genuinely distinct physical SKUs. HaiTun/ZhanLang-style false
      positive risk, not acted on."
  - candidate: "DaYan TengYun M — 'spare-parts' Cubelelo SKU"
    reason: "Reads as an accessory/spare-parts kit SKU, not a distinct cube configuration; a
      bundle-adjacent listing, excluded per the bundle-membership exclusion."
  - candidate: "DaYan ZhanChi Pro M — 'a new Light Green color'"
    reason: "Plain stock-colour addition per SpeedCubeShop's own phrasing (implies one option
      among others), not a separately named/marketed edition; collapses per the GAN356 Air
      stock-colour precedent."
  - candidate: "ShengShou FangYuan — 'gift-box' SKU"
    reason: "Existence-only evidence (catalogue URL path); no descriptive text confirms
      packaging-only vs. multi-puzzle bundle. Left unrecorded rather than guessed."
  - candidate: "ShengShou Gem — 'gift-box' SKU"
    reason: "Same as FangYuan gift-box: existence-only, packaging-vs-bundle ambiguity
      unresolved."
  - candidate: "ShengShou Crazy 'Jelly LE' (transparent stickerless, 1400 units worldwide)"
    reason: "Genuinely limited edition with strong existence evidence, but its parent generation
      (V1 8-piece ring vs. V2 9-piece ring) is not established by any source. model_id is
      required and non-optional; left unrecorded rather than guessed, per explicit coordinator
      instruction."
escalations:
  - [UNFILED] rule: 15
    finding: "validate.mjs checks scope_class/scope_justification/legality directly on the
      variant record with no model-to-variant inheritance resolution (unlike /config/* via
      INHERITED_CRITICAL), forcing every conditional Bermuda variant to restate its model's
      justification/legality verbatim despite DATA_MODEL describing these as inherited."
  - [P4-1] rule: 18
    finding: "Coordinator-directed: enumerated standard variants under shengshou-crazy-original
      (60.5mm) and shengshou-legend-big (70mm) specifically to surface genuinely correct,
      out-of-range sizes as visible rule-18 warnings rather than leaving them invisible at zero
      variants. Raises the archive-wide npm run check warning count from 5 to 7 by design."
  - [UNFILED] schema_gap: "ShengShou Crazy 'Jelly LE' cannot be recorded because model_id is required and
      its parent generation is genuinely undetermined by any source; no 'candidate parent' or
      'model_id: unknown' affordance exists in the current schema."
```
