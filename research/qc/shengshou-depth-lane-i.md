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

### Target: shengshou-crazy-original / shengshou-crazy-v2 — Jelly LE generation-attachment lead
The archive already has an open question on `thecubicle-shengshou-crazy-3x3-generations-2026`:
a "ShengShou Crazy 3x3 (Jelly LE)" (transparent stickerless, "limited to 1400 units worldwide",
TheCubicle product id 7986504597587) is a real, currently-sold limited edition, but which
generation's mechanism it is built on (V1's 8-piece ring or V2's 9-piece ring) was left
unresolved. This session fetched the live Shopify JSON and HTML product pages for all three
(`shengshou-crazy-3x3`, `shengshou-crazy-3x3-v2`, `shengshou-crazy-3x3-jelly-le`) directly:
- The Jelly LE page's own spec table carries no Dimensions field and no ring-piece-count
  statement, only "Gross Weight 123g" (refused, rule 45) and "Added: 2026-06-04" (a catalogue
  ingestion date, not one of the four documented artefact dates but not promoted to a release
  date either way).
- Live Shopify variant shipping weights (`grams`/`weight`, also rule-45-refused, but compared
  here only as an internal cross-check, not recorded as a spec): V1 116g, Jelly LE 123g, V2 139g.
  Jelly LE sits between the two, 7g from V1 and 16g from V2 — a weak lean toward V1, not decisive
  either way, and shipping weight is not a reliable proxy for ring piece count regardless.
- Product photography for all three was fetched and visually compared. V1 and V2 show visibly
  different face-grid patterns consistent with the archive's already-recorded 8-vs-9-piece
  claim. The Jelly LE's own image shows a transparent cube with its internal ring track visible
  but not countable with confidence from the marketing photo at the resolution available — two
  of the Jelly LE's three catalogue images turned out to be mismatched Magic Tower assets
  (filename prefix "SSMT04"), a retailer catalogue error, not evidence of anything about the
  Crazy 3x3 Jelly LE itself.
- **Conclusion: still unresolved.** No source found states which generation the Jelly LE is
  built on. Forcing an attribution from a marketing photo or a shipping-weight proxy would be
  exactly the kind of unsupported claim the evidence-discipline rule forbids. Not creating a
  variant this pass under either `shengshou-crazy-original` or `shengshou-crazy-v2` — doing so
  would require picking a model_id, and neither is evidenced. Recorded here as a confirmed-real,
  still-unattributable lead for a future pass with better evidence (e.g. a community review
  stating piece count, or manufacturer copy naming the base generation).

## EVIDENCE
(see per-model sections above; new source records to follow as targets are completed)

## CHANGES
None yet — skeleton commit only.

## UNRESOLVED
- Jelly LE generation attachment (see above) — real product, cannot be attributed to V1 or V2
  from any evidence found this session.

## NEXT
Work through the remaining 14 targets in the order listed in SCOPE, live-JSON + spec-table check
first, then wayback/second-retailer sweep where the live page doesn't resolve the question.
