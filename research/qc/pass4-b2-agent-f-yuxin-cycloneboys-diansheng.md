# Pass 4, Batch 2, Agent F — YuXin, Cyclone Boys, DianSheng

Status: COMPLETE — all 19 models assessed, 31 variants created, `npm run check` passes at
0 errors / 26 warnings (baseline 23; +3 legitimate, from cyclone-boys-feijue-original's 213g and
cyclone-boys-mini-3x3-original's 40mm/36g, both inherited from already-frozen model specs).

Scope: 19 models —
`data/models/yuxin/` (8), `data/models/cyclone-boys/` (5), `data/models/diansheng/` (6).

## Per-model log

### YuXin (8 models, 16 variants)

All 8 models assessed. Primary sources: 666toy.com (manufacturer, tier 1, excerpt-preserved),
cubezz.com (non-US retailer, tier 2), thecubicle.com (US retailer, tier 2), Speedsolving wiki
(tier 4, corroboration only) — all already gathered by Pass 3 for these models; no new sources
created for YuXin (existing source excerpts were detailed enough to resolve variant axes).

- **yuxin-black-kirin-original** — axis search: magnet/coating/colourway. None found (item
  numbers 1740/1553/1541 identical spec text). → 1 variant: `--standard`.
- **yuxin-fire-original** — axis: sticker application. cubezz's own item-number split
  (4748 White / 4749 Black / 4750 Stickerless) plus the wiki's parallel "Black, White, and
  stickerless options" framing → 2 variants: `--stickered` (collapsing White/Black),
  `--stickerless` (= wiki's "Fire S").
- **yuxin-huanglong-original** — axis: magnet (1523 vs 1523M, manufacturer's own item-number
  split; "Magnetic" inserted into the M item's title). Genuine ambiguity flagged (both pages
  share "magnetic positioning design" language) → `config.magnet_configuration: unknown` on
  BOTH variants rather than resolving it. → 2 variants: `--standard`, `--magnetic`.
- **yuxin-huanglong-v2** — axis: surface treatment (1524VT vs 1524UV, manufacturer item numbers,
  corroborated independently by cubezz and TheCubicle) → 2 variants: `--vt`, `--uv`.
- **yuxin-kylin-v2** — axis: magnet (cubezz's separate item-number lines, 79g non-magnetic vs
  84g "V2 M") → 2 variants: `--standard`, `--magnetic`.
- **yuxin-little-magic-original** — axis: magnet + coating across three separately-numbered
  666toy items (1513 / 1513M / 1513M-UV) → 3 variants: `--standard`, `--magnetic`,
  `--magnetic-uv-coated`.
- **yuxin-little-magic-v2** — magnet status baked into model identity ("M V2"); remaining axis
  is coating (cubezz items 6754 Stickerless / 7907 UV) → 2 variants: `--standard`,
  `--uv-coated`.
- **yuxin-little-magic-v3** — axis: surface treatment, same VT/UV pattern as HuangLong V2
  (cubezz items 7978/7979) → 2 variants: `--vt`, `--uv`.

**Rejected/collapsed candidates:** Black Kirin "V2 (tiled)" — not admitted at model level (no
tier 1-3 source), therefore not a variant either. Stock colour options (HuangLong's
"fluorescent six colors and black," Kylin V2's "black and clear") collapsed into baselines per
anti-explosion rule.

### Cyclone Boys (5 models, 5 variants)

All 5 models assessed — every one turned out to be a single-documented-configuration model, so
every record is a bare `--standard` baseline carrying its own `/edition/types` differentiation-
search attestation.

- **cyclone-boys-feiwu-original** — genuine conflict found and preserved: cubezz's own real
  listing is titled "...Big Central Axis, **Colored**" (spec table `Color: Colored`), directly
  contradicting the Speedsolving wiki's "Only available as stickerless" framing. Recorded as
  `confidence: disputed` on `/colorway/application` (main field set to `unknown`) rather than
  silently preferring either source or fabricating a second variant record with no product of
  its own.
- **cyclone-boys-feichi-original** — stickerless, single configuration (cubezz).
- **cyclone-boys-feichi-g3** — single configuration; no Magnets field on TheCubicle's spec table
  (`config.magnet_configuration: unknown`, not asserted `none`).
- **cyclone-boys-feijue-original** — magnetic/stickerless baked into model identity already (no
  non-magnetic base FeiJue exists in any source); no further variant axis. Model-level
  `magnet_architecture: single_layer` is NOT restated on the variant (inheritance, DATA_MODEL §7.2
  rule 6).
- **cyclone-boys-mini-3x3-original** — stickerless, single configuration, confirmed by two
  independent tier 2 retailers.

**Escalation — Cyclone Boys "Metallic 3x3" (not created as a variant of any model in scope).**
`cyclone-boys-metallic-3x3` is a documented zero-model family (per brief and
`thecubicle-cyclone-boys-metallic-3x3.yml`'s own reliability_note): TheCubicle's own copy says
"a normal 3x3, but... this one has glossy metallic (plastic) sides" — a finish-treatment claim
with NO stated base-model identity. I live-fetched the sibling "Metallic 3x3 M" page
(`https://www.thecubicle.com/products/cyclone-boys-metallic-3x3-m`, capture 2021-09-29) and it
is equally generic: "a standard magnetic 3x3... instead of the usual stickerless shades, this
one has metallic (plastic) sides," 57.0mm/187g gross. Neither page names FeiWu, FeiChi, FeiJue,
or Mini as the base design. The base (non-M) Metallic's own dimension (57.0mm) matches
`cyclone-boys-feichi-original` exactly, but the source's own prior reliability_note explicitly
declines to treat that as evidence, and I agree with and preserve that judgement — a shared
ordinary speedcube dimension is not proof of a specific base-model relationship. **I did not
create a Metallic variant under any of the five models in this lane's scope.** This is a
gap: the Metallic 3x3/3x3 M line (plus CDX-sweep-only siblings `...-m-gradient`,
`...-m-macaron`, not independently fetched) is real, sold, and currently unattachable to any
frozen model or variant without inventing a base-model relationship no source states. Flagged
for a human/future pass with web access to the physical product or packaging photography, which
might name the base design directly.

Also rejected: no tier 1-3 evidence ties `cyclone-boys-feijue-original` (the one magnetic model
in scope) to the Metallic-M line specifically — considered and rejected on the same
no-stated-relationship grounds.

### DianSheng (6 models, 10 variants)

All 6 models assessed. Three new sources created this pass (existing model-level sources named
these retail paths but had not fetched/quoted them): `thecubicle-diansheng-3x3-m-uv-coated-product`,
`thecubicle-mscube-ms3l-3x3-enhanced-product`, `thecubicle-diansheng-solar-s3m-2022-maglev-product`
— all fetched live via `npm run wayback -- get` and preserved as `archive_url` sources.

- **diansheng-3x3-m-v1** — axis: coating. Base page describes "frosted plastic"; a separate,
  fetched retail path sells a UV-coated, stickerless-bright-shades configuration → 2 variants:
  `--standard`, `--uv-coated`.
- **diansheng-mscube-ms3l** — axis: magnet layout + materials. Fetched the "Enhanced" page
  directly: it states a *different* magnet layout ("magnets in the feet of the corners and
  edges" vs. Standard's "edges and corners") AND different internals materials ("transparent
  blue corner stalks and torpedoes" vs. Standard's "primary plastic internals") — two independent
  materiality triggers on one product → 2 variants: `--standard`, `--enhanced`.
- **diansheng-solar-s3m-2022** — axis: maglev. Fetched the MagLev sibling page directly: "the
  same great hand-adjustment mechanism, but now with MagLev technology" → 2 variants:
  `--standard` (spring), `--maglev`.
- **diansheng-solar-s3m-plus** — axis search: no sibling retail path found (unlike the 2022
  generation) → 1 variant: `--standard`.
- **diansheng-stickerless-3x3-standard** — thin evidence (one 2014 forum thread + tier 4 wiki);
  no configuration axis found → 1 variant: `--standard`.
- **diansheng-type-e-standard** — axis: sticker application, genuinely documented across two
  independent, dated 2008 forum sources: a 2008-06-25 review states the reviewed unit
  "surprisingly...have stickers, not paint," while a 2008-12-23 for-sale listing describes a
  white unit with colour "painted on." The wiki's own "no.222 / no.333" catalogue-number framing
  is NOT used to assign either forum batch to a specific item number (no source ties them) →
  2 variants: `--stickered`, `--painted` (painted mapped to vocab value `printed`, the closest
  fit, flagged at `uncertain` for the mapping itself).

**Rejected/collapsed candidates:** None distinct beyond the above — this manufacturer's models
were each thin enough that every documented detail became either the baseline or a genuine
second axis; no stock-colourway explosion candidates were found (DianSheng's own retail pages
in this set describe function/material differences, not colour options, wherever a second
configuration existed at all).

## Escalations (cross-manufacturer)

1. **Cyclone Boys "Metallic 3x3" / "Metallic 3x3 M"** — real, sold, TheCubicle-documented
   products (plus CDX-sweep-only siblings `-m-gradient`, `-m-macaron`) with NO tier 1-3 source
   naming which of FeiWu/FeiChi/FeiChi G3/FeiJue/Mini they are built on. Not created as a variant
   of any model in this lane's scope. See the Cyclone Boys section above for the full reasoning,
   including the newly-fetched Metallic 3x3 M page. This may belong as its own model once a
   source (packaging, a manufacturer statement, or a retailer explicitly naming the base design)
   is found — flagged for a future pass, not resolved here.
2. **`prefix` wayback subcommand failures.** `npm run wayback -- prefix` failed ("fetch failed")
   on every attempt this pass (tried against both thecubicle.com/products/diansheng and
   cubezz.com/Buy-4750, on separate occasions, several retries each) while `get` and `list`
   against the same hosts worked normally in the same session. This blocked a planned
   `/products/diansheng*` prefix sweep that might have surfaced further DianSheng retail paths
   (e.g. a possible stickerless/coloured split on diansheng-solar-s3m-plus, or further MsCube
   models). Recorded as a failed fetch, per instruction NEVER treated as evidence of absence.
   Worth flagging to whoever owns `scripts/wayback.mjs` — this is a tooling issue, not
   something I can fix from a research lane.

## Machine-readable summary

```yaml
models_assessed:
  - yuxin-black-kirin-original
  - yuxin-fire-original
  - yuxin-huanglong-original
  - yuxin-huanglong-v2
  - yuxin-kylin-v2
  - yuxin-little-magic-original
  - yuxin-little-magic-v2
  - yuxin-little-magic-v3
  - cyclone-boys-feiwu-original
  - cyclone-boys-feichi-original
  - cyclone-boys-feichi-g3
  - cyclone-boys-feijue-original
  - cyclone-boys-mini-3x3-original
  - diansheng-3x3-m-v1
  - diansheng-mscube-ms3l
  - diansheng-solar-s3m-2022
  - diansheng-solar-s3m-plus
  - diansheng-stickerless-3x3-standard
  - diansheng-type-e-standard
variants_created:
  - yuxin-black-kirin-original--standard
  - yuxin-fire-original--stickered
  - yuxin-fire-original--stickerless
  - yuxin-huanglong-original--standard
  - yuxin-huanglong-original--magnetic
  - yuxin-huanglong-v2--vt
  - yuxin-huanglong-v2--uv
  - yuxin-kylin-v2--standard
  - yuxin-kylin-v2--magnetic
  - yuxin-little-magic-original--standard
  - yuxin-little-magic-original--magnetic
  - yuxin-little-magic-original--magnetic-uv-coated
  - yuxin-little-magic-v2--standard
  - yuxin-little-magic-v2--uv-coated
  - yuxin-little-magic-v3--vt
  - yuxin-little-magic-v3--uv
  - cyclone-boys-feiwu-original--standard
  - cyclone-boys-feichi-original--standard
  - cyclone-boys-feichi-g3--standard
  - cyclone-boys-feijue-original--standard
  - cyclone-boys-mini-3x3-original--standard
  - diansheng-3x3-m-v1--standard
  - diansheng-3x3-m-v1--uv-coated
  - diansheng-mscube-ms3l--standard
  - diansheng-mscube-ms3l--enhanced
  - diansheng-solar-s3m-2022--standard
  - diansheng-solar-s3m-2022--maglev
  - diansheng-solar-s3m-plus--standard
  - diansheng-stickerless-3x3-standard--standard
  - diansheng-type-e-standard--stickered
  - diansheng-type-e-standard--painted
models_left_unassessed: []
candidates_rejected:
  - candidate: "YuXin Black Kirin 3x3 V2 (tiled)"
    reason: "Not admitted as a model (no tier 1-3 source); therefore not a variant either."
  - candidate: "Cyclone Boys FeiWu 'stickerless' as a second variant separate from 'Colored'"
    reason: "Only the wiki (tier 3/4) names a stickerless configuration, with no specific
      product/SKU; cubezz's own real listing is titled 'Colored'. Recorded as a disputed
      colourway-application attestation on one baseline variant rather than fabricating a second
      variant record with no product of its own."
  - candidate: "Cyclone Boys Metallic 3x3 / Metallic 3x3 M as a variant of FeiChi or FeiJue"
    reason: "No tier 1-3 source states which base design the metallic finish was applied to;
      dimension match to FeiChi (57.0mm) explicitly treated as non-evidentiary by the prior
      researcher's own reliability_note, a judgement this pass preserves. See escalation 1."
  - candidate: "DianSheng Type-E 'no.222' vs 'no.333' as two variants matching stickered/painted"
    reason: "Only the tier 4 wiki makes this catalogue-number distinction; no source ties either
      forum-documented batch to a specific item number. Split by documented application
      (stickered/painted) instead, without asserting the catalogue-number mapping."
escalations:
  - [P4-9] "Cyclone Boys Metallic 3x3 / Metallic 3x3 M / -m-gradient / -m-macaron: real sold products,
    no evidenced base-model relationship to any of the 5 Cyclone Boys models in scope. Not
    created as a variant anywhere. May warrant its own model once a source names the base
    design."
  - [NOTFINDING] "npm run wayback -- prefix failed on every attempt this session (multiple hosts, multiple
    retries) while get/list worked normally; blocked a planned DianSheng retailer prefix sweep.
    Tooling issue, not evidence of absence, flagged for whoever owns scripts/wayback.mjs."
```
