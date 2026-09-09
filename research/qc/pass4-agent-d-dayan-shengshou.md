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
- [ ] dayan-guhong-pro-m
- [ ] dayan-guhong-pro-plus
- [ ] dayan-guhong-v1
- [ ] dayan-guhong-v2
- [ ] dayan-guhong-v3-m
- [ ] dayan-guhong-v4-m
- [ ] dayan-lingyun-v1
- [ ] dayan-lingyun-v2
- [ ] dayan-lunhui-2017
- [ ] dayan-lunhui-v1
- [ ] dayan-panshi-v1
- [ ] dayan-taiyan-v1
- [ ] dayan-tengyun-m
- [ ] dayan-tengyun-v2-m
- [ ] dayan-tengyun-v3-m
- [ ] dayan-xiangyun-v1
- [ ] dayan-zhanchi-2017
- [ ] dayan-zhanchi-2018
- [ ] dayan-zhanchi-42mm
- [ ] dayan-zhanchi-50mm
- [ ] dayan-zhanchi-pro-m
- [ ] dayan-zhanchi-v1
- [ ] dayan-zhanchi-v5-m

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
