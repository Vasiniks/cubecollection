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
