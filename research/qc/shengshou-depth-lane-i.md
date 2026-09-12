# ShengShou depth — Lane I

## SCOPE
ShengShou only. Variant-depth research on the 15 ShengShou models that carry exactly one
configuration (a `standard.yml` baseline only): shengshou-3x3-original, shengshou-crazy-original,
shengshou-crazy-v2, shengshou-fangyuan-v2-m, shengshou-gem-standard, shengshou-legend-big,
shengshou-mr-m-original, shengshou-mr-m-s, shengshou-mr-m-v2, shengshou-pearl-original,
shengshou-rainbow-standard, shengshou-tank-standard, shengshou-wind-original,
shengshou-yufeng-original, shengshou-yufeng-v2. Searching for real, evidenced configuration axes
per the task brief: size variants, magnetic/non-magnetic, magnet architecture, coating,
stickered/stickerless/tiled, DIY kit vs assembled, special/anniversary/limited editions,
meaningful packaging configurations. DATA_MODEL §4.2 model/variant boundary applied to every
candidate. No non-ShengShou record touched. No model, family, or manufacturer record created or
edited — only new variant files under existing `data/variants/shengshou/<model-id>/`, new source
files under `data/sources/`, and attestation additions to existing ShengShou variant files.

## BASE COMMIT
e286e3f (main)

## METHOD
Per RESEARCH_SPEC 3.6a/3.6b: for each target model, (a) read every existing ShengShou source
already in the archive bearing on that model before doing any new fetching (several sweeps already
exist — `thecubicle-shengshou-products-prefix-2026`, `thecubicle-shengshou-other-3x3-lines-2026`,
`speedcubeshop-shengshou-products-prefix-2026`, `cubelelo-shengshou-products-prefix-2026`,
`shengshou-gem-tank-metal-cross-retailer-sweep-2026`, `thecubicle-shengshou-crazy-3x3-generations-2026`,
etc.); (b) live Shopify `/products/<slug>.json` fetch at TheCubicle for the model's known current
slug, inspecting the `options`/`variants` array for a genuine second sold configuration (not
merely a colour label); (c) a live-page HTML fetch for the retailer's own spec table (Dimensions,
Item Weight — never Gross Weight/`grams`, per rule 45) where the JSON alone is insufficient; (d) a
wayback CDX prefix sweep of the model's slug family where the live catalogue doesn't resolve it,
to check for retired configurations; (e) SpeedCubeShop and Cubelelo as the required non-US/second
retailer check where not already covered by an existing sweep source. Every new variant requires a
source excerpt containing the words the claim rests on. Rejected candidates are recorded with the
reason, not silently dropped.

## STATUS
In progress.

## FINDINGS (running log)

### RESOLVED: shengshou-crazy-original — Jelly LE generation attachment (ledger P4-13)
First pass (before Wayback recovered) found this inconclusive by weight and photography — see
the superseded reasoning below, kept for the record. The coordinator flagged that Wayback's CDX
API had partially recovered and that ledger P4-13 tracked this exact question; re-running the
archived-capture check it named resolved it.

**Superseded initial attempt.** Live Shopify JSON/HTML for `shengshou-crazy-3x3`,
`shengshou-crazy-3x3-v2`, `shengshou-crazy-3x3-jelly-le`: the Jelly LE's spec table has no
Dimensions field and no ring-piece-count statement, only "Gross Weight 123g" (refused, rule 45)
and "Added: 2026-06-04". Shipping weights (also rule-45 material, compared only as an internal
cross-check): V1 116g, Jelly LE 123g, V2 139g — a weak, non-decisive lean toward V1. Product
photography for all three was fetched and compared; two of the Jelly LE's three catalogue images
turned out to be mismatched Magic Tower assets (filename prefix "SSMT04", a retailer catalogue
error), and the remaining image did not permit a confident ring-piece count. Concluded (wrongly,
as it turned out to just be incomplete) that this was unresolvable without new evidence.

**What actually resolved it.** Per the coordinator's tip, re-ran the archived-capture check that
ledger P4-13 explicitly named as never having been tried (Wayback had returned 504 throughout the
prior attempt). Control query against `shengshou-crazy-3x3-v2` returned 4 real captures,
confirming the outage has genuinely lifted. The Jelly LE's own archived page (2026-07-18 capture)
carries TheCubicle's own "Versions" cross-product selector — a structured table naming, verbatim:
`V1 $15.99` / `V1 (Jelly Limited Edition) $13.99 $16.99` / `V2 $21.99`. A live fetch of the
sibling V2 page independently shows the identical table (same three rows, same "V1 (Jelly Limited
Edition)" label, $1 price drift explained by an ordinary price change between the two fetch
dates) — so this is not a rendering artefact of one page. This is the exact same evidentiary
mechanism already accepted elsewhere in this archive for model attachment
(`yj-mgc3-beta--limited-edition` rests on the identical "Versions-selector label" reasoning), not
a new inference rule invented for this record. **Created**
`shengshou-crazy-original--jelly-le` (edition.types: [limited], run_size: 1400 — a directly
stated figure, not estimated; colorway stickerless/transparent). Explicitly did NOT use the
shipping-weight coincidence (123g vs. V2's Gross Weight 124.0g) as evidence for or against — those
are two different quantities, and P4-13's own text already flagged that a prior attempt correctly
refused to act on it.

### ESCALATION CANDIDATE (not a variant): "ShengShou Legend Plus Big 3x3 - 18cm"
Found via a fresh, full, UNSCOPED wayback CDX prefix sweep of speedcubeshop.com/products/shengshou*
(774 URLs — this run completed where the archive's existing
`speedcubeshop-shengshou-products-prefix-2026` explicitly recorded it could not, due to that
session's rate limit). `shengshou-legend-plus-big-3x3-18cm` (captured 2025-07-12): "Type: 3x3",
"Magnets: None", "Size: 180 mm", "Weight: 920 g", "Released: 2024-11-04", screw/spring core,
described as "a fantastic decoration and a fully functional speed cube." This is roughly 2.5x the
size/weight of the archive's existing `shengshou-legend-big` (70mm, itself already split from
`shengshou-legend-original` on a smaller size gap). Per DATA_MODEL §4.2, an 18cm/920g cube cannot
be produced from either existing Legend mould by choosing different parts at assembly — this
reads as a third, larger design in the same naming family, i.e. a MODEL candidate for the
`shengshou-legend` family, not a variant of `shengshou-legend-big`. **No model or variant
created** (taxonomy frozen). Source preserved:
`speedcubeshop-shengshou-legend-plus-big-18cm-2025`. Live SCS fetch of this slug now 404s
(delisted since the 2025 capture).

### NEGATIVE, well-corroborated: 13 of 15 targets carry no undocumented axis
Ran three independent, full, unscoped CDX prefix sweeps this session — thecubicle.com (474 URLs,
re-confirms the existing enumeration), speedcubeshop.com (774 URLs, newly completed unscoped),
cubelelo.com (47 URLs, re-confirms against the raw list) — plus live Shopify JSON fetches of
TheCubicle's current listing for each of the 13 non-Crazy targets (`shengshou-3x3`,
`shengshou-fangyuan-v2-m`, `shengshou-gem-3x3`, `shengshou-big-legend-3x3-7-0cm`,
`shengshou-mr-m-3x3`, `shengshou-mr-m-s-3x3`, `shengshou-mr-m-v2-3x3`, `shengshou-pearl-3x3`,
`shengshou-rainbow-3x3`, `shengshou-tank-3x3`, `shengshou-wind-3x3`,
`shengshou-yufeng-3x3-m-magnetic-core-magelev`, `shengshou-yufeng-v2-3x3-m`). Consolidated into
`shengshou-single-config-models-live-sweep-2026`.

Result: every one of the 13 confirms exactly ONE current 3x3 sold configuration at TheCubicle, no
DIY/unstickered/size/magnet/UV/frosted/MagLev/ball-core/anniversary sibling slug at any of the
three retailers, and Cubelelo carries none of these 13 specific SKUs under this brand prefix at
all (genuine catalogue absence, not a missed-configuration signal — Cubelelo's ShengShou range at
this prefix is base Legend, Mr. M big-cube siblings, and non-3x3 shape mods only).

**REJECTED candidates, explicitly, with reason (colourway-only, per hard constraint):**
- `shengshou-3x3-original`: live TheCubicle listing offers Black/White, identical price and
  weight, no description differentiates them. Body-colour-only.
- `shengshou-legend-big`: same pattern, Black/White, identical price/weight. Body-colour-only.
- `shengshou-pearl-original`: same pattern, Black/White, identical price/weight. Body-colour-only.
- `shengshou-wind-original`: same pattern, Black/White. Body-colour-only.
- `shengshou-rainbow-standard`: "Stickerless (Dark)" vs. "Stickerless", identical price/weight;
  the product description mentions neither option by name. Body-colour-only (a plastic-tone
  difference within one stickerless line, not a distinct colourway per DATA_MODEL 4.1's own
  worked precedents).

**No split at all (single option, not even colour) confirmed for:** `shengshou-fangyuan-v2-m`
(Black only), `shengshou-gem-standard` (Stickerless only), `shengshou-mr-m-original` (Stickerless
only), `shengshou-mr-m-s` (Stickerless only), `shengshou-mr-m-v2` (Black only),
`shengshou-tank-standard` (Stickerless only), `shengshou-yufeng-original` (Stickerless only),
`shengshou-yufeng-v2` (Stickerless only).

FangYuan V2 M specifically: confirmed it does NOT share the base FangYuan's gift-box packaging
configuration (`shengshou-fangyuan-3x3-gift-box` is a distinct slug belonging only to
`shengshou-fangyuan-original`, already a separate multi-variant model out of this lane's scope) —
no equivalent gift-box slug exists for V2 M.

## EVIDENCE
- `thecubicle-shengshou-crazy-jelly-le-versions-selector-2026` (new) — resolves the Jelly LE
  generation attachment.
- `speedcubeshop-shengshou-legend-plus-big-18cm-2025` (new) — Legend Plus Big 18cm escalation
  candidate.
- `shengshou-single-config-models-live-sweep-2026` (new) — consolidated live-JSON + full unscoped
  three-retailer prefix sweep backing all 13 negative findings above.
- Pre-existing, read not modified: `thecubicle-shengshou-products-prefix-2026`,
  `thecubicle-shengshou-crazy-3x3-generations-2026`, `speedcubeshop-shengshou-products-prefix-2026`,
  `cubelelo-shengshou-products-prefix-2026`, `thecubicle-shengshou-other-3x3-lines-2026`,
  `shengshou-gem-tank-metal-cross-retailer-sweep-2026`, `shengshou-gem-tank-catalog-facets-2026`,
  `shengshou-gem-3x3-product-photography-2026`, `shengshou-tank-3x3-product-photography-2026`,
  `thecubicle-shengshou-fangyuan-gift-box-2019`, `speedsolving-wiki-shengshou-products`,
  `speedcubeshop-shengshou-yufeng-rename-2026`, ledger entry P4-13.

## CHANGES
- Added: `data/variants/shengshou/shengshou-crazy-original/jelly-le.yml` (new variant).
- Added: `data/sources/thecubicle-shengshou-crazy-jelly-le-versions-selector-2026.yml`.
- Added: `data/sources/speedcubeshop-shengshou-legend-plus-big-18cm-2025.yml`.
- Added: `data/sources/shengshou-single-config-models-live-sweep-2026.yml`.
- `npm run check`: 0 errors, 30 warnings (unchanged baseline) after this batch.

## UNRESOLVED
- None outstanding from this batch. Jelly LE attachment (previously unresolved) is now resolved.

## NEXT
Remaining targets not yet given a dedicated finding write-up above but already covered by the
consolidated negative sweep: confirm nothing was missed for `shengshou-mr-m-s` and
`shengshou-mr-m-v2` specifically (their own distinguishing "matte finish"/"spring compression"
traits are already correctly recorded at MODEL level, not variant level — no further variant-axis
work needed there). Then close out the report with a final per-model summary table and full
"searched and not found" accounting for the remaining unlisted axes (DIY kit, anniversary
editions) across all 15, which the sweeps above already cover but have not yet been stated
per-axis in one place.
