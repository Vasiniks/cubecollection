# Pass 4 — Agent C — YJ + MFJS variant enumeration

Status: IN PROGRESS (skeleton committed first per instructions)

findings-so-far: none yet

## Scope
- YJ: 23 models in data/models/yj/
- MFJS: 10 models in data/models/mfjs/

## Method
Enumerate variant axes per model from Pass 3 leads (grepped for "pass 4",
"not enumerated" in model records), manufacturer pages (incl. archived),
retailer listings, community threads. Zero-variant is an accepted outcome.

## Per-model log
(to be filled in as each model is assessed)

## Sources added
(to be filled in)

## Model-boundary escalations
(to be filled in)

## Machine-readable summary
```yaml
models_assessed: []
variants_created: []
models_at_zero: []
candidates_rejected: []
escalations: []
```

## yj-meta3 — DONE
Axes identified: sold configuration tier (magnet count / core system / coating), matching the
model record's own flagged pass-4 note.
Independently re-verified via `npm run wayback -- prefix .../yj-meta3` (4 captures, 3 distinct
product URLs) and full-page fetches of the two configurations the model record names but does
not itself cite a source for.
Variants created:
- yj-meta3--magnetic (base/standard, no config overrides)
- yj-meta3--8-magnet-ball-core-uv (config.core_system: ball_core, config.coating: uv,
  config.magnet_strength free text)
- yj-meta3--wing-magnetic-8-magnet-ball-core-uv (same core/coating overrides plus wing-magnetic
  free-text magnet_strength; retailer's own "flagship version" language recorded only as
  `significance` prose, NOT as edition.designation, since it is retailer framing rather than a
  manufacturer-declared tier word)
Sources added:
- thecubicle-yj-meta3-3x3-8-magnet-ball-core-uv-product
- thecubicle-yj-meta3-3x3-wing-magnetic-8-magnet-ball-core-uv-product
Candidates rejected: none (all three sold configurations correspond to genuine documented
axes; no fourth SKU found in the CDX sweep).

## yj-mgc3-beta — DONE
Axes identified: sold configuration tier (magnet/core/coating/maglev) plus a genuine Limited
Edition (transparent colourway, no stickers). The model record itself named three
configurations as pass-4 material; this pass's own CDX prefix sweep
(`npm run wayback -- prefix .../yj-mgc3-beta`, 15 captures) found a FOURTH: "8-Magnet Ball-Core
+ UV + MagLev" ($24.99), not named in the model record — reported as a finding, not acted on.
Variants created:
- yj-mgc3-beta--magnetic (base, $15.99; no dedicated description page found this pass — existence
  and price corroborated across two independent captures' shared Versions selector;
  config.core_system deliberately left unset/unknown rather than inheriting the model's own
  hedged ball_core value, since the model's own attestation says this is exactly the open
  question)
- yj-mgc3-beta--8-magnet-ball-core-uv-coated ($21.99; coating: uv override only — core_system
  matches the model's own value so is NOT restated, per rule 23)
- yj-mgc3-beta--8-magnet-ball-core-uv-coated-maglev ($24.99; NEW finding this pass; coating: uv,
  maglev: ball_core_maglev)
- yj-mgc3-beta--limited-edition ($29.99; edition.types:[limited]; colorway collapses the two
  sold colours "Transparent Green"/"Transparent Pink" into one record per the stock-colourway
  rule; config.coating: none inferred only from the Versions-selector label omitting "+UV",
  held at uncertain)
Sources added:
- thecubicle-yj-mgc3-beta-8-magnet-ball-core-uv-coated-maglev-product
- thecubicle-yj-mgc3-beta-limited-edition-product
Candidates rejected: none additional. No fifth configuration found in the CDX sweep.
Note: `npm run check` returned 8 warnings after first draft (rule 23, redundant core_system
overrides on 3 variants) — corrected by removing the restated field per the anti-denormalisation
rule; back to baseline 5 warnings / 0 errors before commit.

## yj-mgc-evo-ii — DONE
Axes identified: magnet architecture (screwdriver-adjustable-only vs. added corner/core
magnets), matching the model record's own flagged pass-4 note about the "Enhanced Core
Positioning Edition."
CDX prefix sweep (`npm run wayback -- prefix .../yj-mgc-evo-ii`) found exactly 2 URLs — no
further configurations.
Variants created:
- yj-mgc-evo-ii--standard (base, no overrides)
- yj-mgc-evo-ii--enhanced-core-positioning-edition (config.magnet_configuration: core_corner;
  availability.production_status: discontinued per the retailer's own page note)
Sources added: thecubicle-yj-mgc-evo-ii-3x3-enhanced-core-positioning-edition-product
Lead noted (not acted on): this source's own "Similar Products" panel lists "YJ MGC Sigma 3x3"
($29.99) as a separate product — see model-boundary escalation below.
Candidates rejected: none additional.

## mfjs-meilong-3x3-v2 — DONE
Axes identified: coating (Frosted vs UV Coated) and packaging (accessories included vs not),
independently confirmed as three standalone SpeedCubeShop SKUs via
`npm run wayback -- prefix .../moyu-meilong-3x3-v2` (not just a purchase-option toggle).
Variants created:
- mfjs-meilong-3x3-v2--standard (config.weight_g: 65, config.coating: frosted)
- mfjs-meilong-3x3-v2--lite (same weight/finish as standard; differs ONLY by omitted
  accessories — DATA_MODEL 4.1 axis 11, packaging as sole distinguishing feature)
- mfjs-meilong-3x3-v2--uv-coated (config.weight_g: 66, config.coating: uv)
Data quality note: each SKU's own "Product Details" auto-block gives 66g regardless of tier
(appears identically on both the Lite and UV Coated pages), while the page's own
tier-differentiated "Version comparison" table gives 65/65/66 — read as a retailer-template
artifact and NOT preferred; the comparison table values are used instead, at `probable` rather
than `confirmed`, with the conflict documented in each variant's own note (not escalated to a
full `disputed` block since it is one source's internal inconsistency, not two independent
sources disagreeing).
Sources added: speedcubeshop-moyu-meilong-3x3-v2-magnetic-lite-product,
speedcubeshop-moyu-meilong-3x3-v2-magnetic-uv-coated-product
Candidates rejected: none additional (no fourth SKU found).

## mfjs-meilong-3x3 — DONE
Axis: magnet configuration (Magnetic / Non-Magnetic purchase options on one SpeedCubeShop
product page, already documented in the model's own source).
Variants created:
- mfjs-meilong-3x3--magnetic (magnet_configuration left unset/unknown — option name only, no
  architecture detail)
- mfjs-meilong-3x3--non-magnetic (config.magnet_configuration: none)
Sources added: none (reused speedcubeshop-mofang-jiaoshi-meilong-3x3-product).
Candidates rejected: none.

## mfjs-mf3rs3 — DONE
Axis: magnet configuration (non-magnetic base vs. factory-magnetic "M"), already flagged at
tier 4 (Speedsolving wiki) in the model record. This pass independently upgraded the evidence
to tier 2 by finding SpeedCubeShop's own TWO STANDALONE SKUs
("mofang-jiaoshi-mf3rs3-3x3" and "mofang-jiaoshi-mf3rs3-m-3x3") via CDX prefix sweep and
fetching both directly.
Variants created:
- mfjs-mf3rs3--non-magnetic (config.magnet_configuration: none; three stock colours — Black,
  Stickerless (Bright), White — collapsed into one variant per the stock-colourway rule)
- mfjs-mf3rs3--magnetic (config.magnet_configuration: single_layer, uncertain — conservative
  default, no architecture detail stated)
Data-quality note: both SpeedCubeShop pages carry a "trailing spec line" that cross-references
the SIBLING SKU's weight/release date rather than the page's own product (a retailer
comparison-snippet template artifact) — flagged in both new source records and NOT used as an
attestable weight/date claim for either variant.
Sources added: speedcubeshop-mofang-jiaoshi-mf3rs3-3x3-product,
speedcubeshop-mofang-jiaoshi-mf3rs3-m-3x3-product
Candidates rejected: none additional.

## mfjs-mf3-v1 — DONE
Axis: coating + colourway application. "MF3S" was already named and rejected as a MODEL
candidate at mfjs-mf3-v1.yml itself, explicitly as a variant of MF3 — enumerated here as that
variant.
Variants created: mfjs-mf3-v1--mf3s (colorway.application: stickerless, config.coating: frosted)
Sources added: none (reused thecubicle-mofang-jiaoshi-mf3s-product, already on file).
Candidates rejected: "MF3RS2 3x3 Starter Kit" (SpeedCubeShop) — a bundle/kit, not a cube
configuration; not created. MF3 base itself gets no separate "standard" stub (single sold
configuration, MF3S already differentiates as its own record).

## mfjs-mini-3x3-45mm, mfjs-mini-3x3-50mm, mfjs-mini-3x3-keychain-40mm — DONE
Per coordinator correction: enumerated a `standard` variant under each of these three models
even though each has only one sold configuration, specifically so the archive records the
size/colourway facts at variant level rather than leaving these three reference_only models
with zero variants. Each is a single stock-colourway sold configuration (45mm and keychain-40mm
sell only "Stickerless (Bright)"; 50mm sells Black/White/Stickerless(Bright), collapsed into
one variant per the stock-colourway rule).

**Expected rule-18 (advisory) exposure, not a defect:** creating these three variants raises
`npm run check` from the previously-reported baseline of 5 warnings to 8:
- [18] mfjs-mini-3x3-45mm/standard.yml: size_mm 45mm outside the 50-60mm plausibility range
- [18] mfjs-mini-3x3-keychain-40mm/standard.yml: size_mm 40mm outside the 50-60mm range
- [18] mfjs-mini-3x3-keychain-40mm/standard.yml: weight_g 41.3g outside the 50-130g range
All three values are inherited from the frozen, correctly-sourced parent model specs (these are
mini cubes by design) and are NOT overridden or altered on the variant. Per the coordinator's
explicit correction, this is a known rule-18 exposure (rule 18 only evaluates variants,
resolving size/weight from the parent model, so it stays invisible until a variant exists) and
is not to be worked around by omitting the variant or by editing the frozen model.

Lead noted, not chased: both the 45mm and 50mm pages' "Related Products" sidebar widgets show a
"[CPS Serviced]" purchase option (Black/White/Stickerless (Bright)) — this is a DIFFERENT
product listing surfaced by the sidebar widget, not a purchase option on either of these two
SKUs' own pages, and was not independently fetched/confirmed this pass. If real, it would be an
aftermarket-serviced variant of the base model (service: serviced_by a "CPS" manufacturer
record, kind: service) — no such manufacturer record currently exists in the archive. Flagged
for a future pass rather than acted on without direct confirmation.
Sources added: none (reused existing model-level sources for all three).
Candidates rejected: "[CPS Serviced]" sidebar listing (insufficient direct evidence this pass).

## yj-yulong-v3-m — DONE
Axis identified: coating (base vs. UV Coated) plus a further "+ Clicky" turning-feel
configuration, named as pass-4 material in the model's own description. CDX prefix sweep
confirmed the retailer's own shared "Versions" selector spans BOTH yj-yulong-v2-m (a separate,
correctly frozen model) and three yj-yulong-v3-m configurations — corroborating the existing
two-model split rather than contradicting it.
Variants created:
- yj-yulong-v3-m--magnetic (base, $5.99, no overrides)
- yj-yulong-v3-m--uv-coated (config.coating: uv, config.weight_g: 67.0)
- yj-yulong-v3-m--uv-coated-clicky (same coating/weight; "clicky" turning-feel trait recorded
  only as `significance` prose — no vocabulary field exists for it)
Sources added: thecubicle-yj-yulong-3x3-v3-m-uv-coated-product,
thecubicle-yj-yulong-3x3-v3-m-uv-coated-clicky-product (reused the existing Pass 3 source
thecubicle-yj-yulong-3x3-v3-m-product for the base tier rather than duplicating it).
Candidates rejected: none additional. yj-yulong-pyraminx / yj-yulong-square-1 seen in the same
CDX sweep are different puzzle types, out of this archive's 3x3 scope.

## yj-zhilong-mini and yj-guanlong-original — leads checked, zero NEW variants
- "yj-zhilong-m-3x3" (a differently-slugged TheCubicle URL found via CDX sweep) fetched and
  confirmed to be the IDENTICAL product already covered by the model's own source (same title
  "YJ ZhiLong Mini 3x3 M Magnetic Speed Cube", same description, same 50mm/magnetic facts) --
  a URL-naming duplicate, not a second SKU. Dedup test passed; no variant created.
- "yj-guanlong-unstickered" (a differently-slugged TheCubicle URL for the original GuanLong)
  fetched and found to carry the IDENTICAL product description and spec block (56mm, ~82-83g)
  as the standard GuanLong page already used by the model record -- a stickerless colour option
  of the same base product, not a separately named/marketed edition. Collapses per the
  stock-colourway rule; no variant record created (zero-variant assessment for
  yj-guanlong-original stands).
