# Pass 4 — Agent C — YJ + MFJS variant enumeration

Status: COMPLETE

findings-so-far: all 33 models in scope (23 YJ + 10 MFJS) assessed; 23 variant records created
across 11 models; 22 models correctly left at zero variants; 1 model-boundary escalation
(YJ MGC Sigma); 1 Pass-3 model-enumeration gap reported (MFJS Mini 3x3 30mm/35mm missing).

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
models_assessed:
  - yj-appari-original
  - yj-chilong-original
  - yj-guanlong-original
  - yj-guanlong-plus
  - yj-guanlong-v3
  - yj-guanlong-v4
  - yj-jinjiao-original
  - yj-meta3
  - yj-mgc-elite
  - yj-mgc-elite-v2
  - yj-mgc-est
  - yj-mgc-evo
  - yj-mgc-evo-ii
  - yj-mgc-original
  - yj-mgc-repulsion
  - yj-mgc-v2
  - yj-mgc3-beta
  - yj-ruilong-original
  - yj-sulong-original
  - yj-yulong-original
  - yj-yulong-v2-m
  - yj-yulong-v3-m
  - yj-zhilong-mini
  - mfjs-meilong-3c
  - mfjs-meilong-3x3
  - mfjs-meilong-3x3-v2
  - mfjs-mf3-v1
  - mfjs-mf3rs
  - mfjs-mf3rs2
  - mfjs-mf3rs3
  - mfjs-mini-3x3-45mm
  - mfjs-mini-3x3-50mm
  - mfjs-mini-3x3-keychain-40mm
variants_created:
  - yj-meta3--magnetic
  - yj-meta3--8-magnet-ball-core-uv
  - yj-meta3--wing-magnetic-8-magnet-ball-core-uv
  - yj-mgc3-beta--magnetic
  - yj-mgc3-beta--8-magnet-ball-core-uv-coated
  - yj-mgc3-beta--8-magnet-ball-core-uv-coated-maglev
  - yj-mgc3-beta--limited-edition
  - yj-mgc-evo-ii--standard
  - yj-mgc-evo-ii--enhanced-core-positioning-edition
  - yj-yulong-v3-m--magnetic
  - yj-yulong-v3-m--uv-coated
  - yj-yulong-v3-m--uv-coated-clicky
  - mfjs-meilong-3x3--magnetic
  - mfjs-meilong-3x3--non-magnetic
  - mfjs-meilong-3x3-v2--standard
  - mfjs-meilong-3x3-v2--lite
  - mfjs-meilong-3x3-v2--uv-coated
  - mfjs-mf3rs3--non-magnetic
  - mfjs-mf3rs3--magnetic
  - mfjs-mf3-v1--mf3s
  - mfjs-mini-3x3-45mm--standard
  - mfjs-mini-3x3-50mm--standard
  - mfjs-mini-3x3-keychain-40mm--standard
models_at_zero:
  - yj-appari-original
  - yj-chilong-original
  - yj-guanlong-original
  - yj-guanlong-plus
  - yj-guanlong-v3
  - yj-guanlong-v4
  - yj-jinjiao-original
  - yj-mgc-original
  - yj-mgc-v2
  - yj-mgc-elite
  - yj-mgc-elite-v2
  - yj-mgc-evo
  - yj-mgc-est
  - yj-mgc-repulsion
  - yj-ruilong-original
  - yj-sulong-original
  - yj-yulong-original
  - yj-yulong-v2-m
  - yj-zhilong-mini
  - mfjs-meilong-3c
  - mfjs-mf3rs
  - mfjs-mf3rs2
candidates_rejected:
  - { candidate: "yj-guanlong-unstickered (TheCubicle URL)", reason: "identical description/specs to standard GuanLong page; stock colour option, not a separately named edition" }
  - { candidate: "yj-zhilong-m-3x3 (TheCubicle URL)", reason: "identical title/description/specs to the already-modelled ZhiLong Mini 3x3 M; URL-naming duplicate of the same SKU" }
  - { candidate: "YJ MGC EST 3x3 Customization Kit", reason: "spare-parts mod kit (centerpieces, magnets, hardware), an accessory bundle, not a cube configuration" }
  - { candidate: "MF3RS2 3x3 Starter Kit (SpeedCubeShop)", reason: "accessory bundle, not a cube configuration" }
  - { candidate: "MF3RS3 sticker set / MGC 3x3 sticker set", reason: "accessory bundle, not a cube configuration" }
  - { candidate: "\"[CPS Serviced]\" purchase option seen in MFJS Mini 3x3 45mm/50mm 'Related Products' sidebars", reason: "sidebar widget shows a different product listing, not a purchase option of either page's own SKU; not independently fetched/confirmed this pass" }
  - { candidate: "YJ Appari two retailer mechanism names (Speed Micro Bearing / Speed Micro Actuator)", reason: "same single magnetic SKU under two retailers' independent wording, not a magnetic/non-magnetic split" }
escalations:
  - [P4-4] { model_boundary: "YJ MGC Sigma", reason: "TheCubicle sells 'YJ MGC Sigma 3x3' as a standalone product with an explicit first-party mechanism-change statement (magnet architecture, corner caps, finish) matching the pattern already used to admit every other MGC generation as its own model; no model exists for it in the frozen 269-model set. Not created; reported for the model-enumeration owner." }
  - [P4-4] { pass3_gap: "MFJS Mini 3x3 series", reason: "the frozen family reasoning (mfjs-mini-3x3-50mm.yml) states there are five sizes in the series, but only three (45mm/50mm/keychain-40mm) exist as models; this pass's own CDX sweep independently confirms two further TheCubicle SKUs (30mm and 35mm keychain sizes) exist and are undocumented. Not created; reported for the model-enumeration owner." }
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

## Zero-variant assessments (checked, correct result, no variant records)

YJ:
- yj-appari-original — two retailer naming conventions ("Speed Micro Bearing" TheCubicle,
  "Speed Micro Actuator" SpeedCubeShop) for the SAME single magnetic SKU, not a
  magnetic/non-magnetic split. No specs recorded per the brief's own instruction not to
  manufacture them. Zero variants.
- yj-chilong-original — CDX prefix: 1 URL only.
- yj-guanlong-original — CDX prefix found a second "yj-guanlong-unstickered" URL; fetched and
  confirmed identical description/specs to the standard page (a stock colour option, not a
  named edition). Zero variants.
- yj-guanlong-plus — CDX prefix: 1 URL only.
- yj-guanlong-v3 — CDX prefix: 1 URL only (plus a query-string duplicate of the same page).
- yj-guanlong-v4 — CDX prefix: 1 URL only.
- yj-jinjiao-original — CDX prefix: 1 URL (plus tracking-query duplicates of the same page).
- yj-mgc-original — CDX prefix on the correct base URL ("yj-mgc", no suffix) plus a checked
  "yj-mgc-3x3" prefix found only a sticker-set accessory (bundle, rejected). Zero variants.
- yj-mgc-v2 — CDX prefix (as "yj-mgc3-ii"): 1 URL only.
- yj-mgc-elite — CDX prefix (as "yj-mgc3-elite"): 1 URL only.
- yj-mgc-elite-v2 — CDX prefix: 1 URL only.
- yj-mgc-evo — CDX prefix: 1 URL only (plus tracking-query duplicates).
- yj-mgc-est — CDX prefix: base URL plus "yj-mgc-est-3x3-customization-kit", fetched and
  confirmed a spare-parts mod kit ("extra centerpieces, extra magnets, extra hardware"), an
  accessory bundle rather than a cube configuration — REJECTED as a variant, matching the
  model's own description. Zero variants.
- yj-mgc-repulsion — CDX prefix: 1 URL only.
- yj-ruilong-original — CDX prefix: 1 URL (pyraminx/skewb siblings are different puzzle types,
  out of scope).
- yj-sulong-original — CDX prefix: 1 URL only.
- yj-yulong-original — CDX prefix: 1 URL only (v2-m/v3-m/pyraminx/square-1 all excluded as
  separate models or different puzzle types).
- yj-yulong-v2-m — CDX prefix: 1 URL only.
- yj-zhilong-mini — CDX prefix found a second "yj-zhilong-m-3x3" URL; fetched and confirmed
  IDENTICAL title/description/specs to the model's own source (a URL-naming duplicate of the
  same SKU, not a second product). Zero variants.

MFJS:
- mfjs-meilong-3c — CDX prefix: 1 URL only.
- mfjs-mf3rs — CDX prefix: 1 URL only.
- mfjs-mf3rs2 — CDX prefix found "mofang-jiaoshi-mf3rs2-3x3-starter-kit"; a starter/accessory
  kit, not a cube configuration — REJECTED as a variant. Zero variants.

## Model-boundary escalation

**YJ MGC Sigma.** TheCubicle sells "YJ MGC Sigma 3x3" ($29.99, sole capture 2026-02-16) as a
standalone product, found via this pass's own CDX prefix sweep of the "mgc" line and confirmed
by direct fetch. Its own product description: "The YJ MGC Sigma is what the Beta was trying to
be. Larger core magnets lock the cube into place with smoother alignment. Lighter corner-edge
magnets create balance without hesitation. Sharper corner caps reduce unwanted twists at the
source. Finished with red accents and a new insignia." This states an explicit mechanism
difference from MGC3 Beta (different magnet architecture, new corner-cap geometry, new
finish/insignia) — the same kind of first-party mechanism-change statement this archive used to
admit every other MGC generation (Elite, Evo, Evo II, Est, Beta) as its own model. No model
currently exists for it in the frozen 269-model set. **Not created** per the frozen boundary —
reported here as a Pass 3 gap for the model-enumeration owner. Source evidence:
`npm run wayback -- prefix https://www.thecubicle.com/products/yj-mgc-sigma` (1 capture) and a
direct fetch of that page (not written to a source file, since no variant/model record cites
it this pass — the finding is reported in prose only, per the instruction not to act on it).

## Other findings for the record

- **MoFang JiaoShi Mini 3x3 series is incomplete at 3 of 5 documented sizes.** The frozen
  family reasoning at mfjs-mini-3x3-50mm.yml itself states "One of five sizes in the MoFang
  JiaoShi Mini 3x3 Series" and gives a shared five-size rationale, but only three models exist
  in data/models/mfjs/ (45mm, 50mm, keychain-40mm). This pass's own CDX sweep of
  "thecubicle.com/products/mofang-jiaoshi-mini-3x3" independently confirms TWO further sizes
  exist at TheCubicle: "mofang-jiaoshi-mini-3x3-keychain-cube-3-0cm" (30mm, capture 2020-09-23)
  and "mofang-jiaoshi-mini-3x3-keychain-cube-3-5cm" (35mm, capture 2019-08-18). This is a Pass 3
  model-enumeration gap (missing models), not a Pass 4 variant question — reported, not acted
  on, since creating models is outside this pass's write lane.
- **"[CPS Serviced]" sidebar lead** on the MFJS Mini 3x3 45mm/50mm pages — see that section
  above. Not chased to a direct source this pass.
