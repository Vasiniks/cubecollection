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
