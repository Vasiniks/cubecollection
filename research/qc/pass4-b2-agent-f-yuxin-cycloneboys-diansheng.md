# Pass 4, Batch 2, Agent F — YuXin, Cyclone Boys, DianSheng

Status: IN PROGRESS (skeleton committed first per lane protocol)

Scope: 19 models —
`data/models/yuxin/` (8), `data/models/cyclone-boys/` (5), `data/models/diansheng/` (6).

findings-so-far: YuXin and Cyclone Boys complete (21 variants across 13 models). DianSheng in progress.

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

### DianSheng

## Machine-readable summary (placeholder, updated at completion)

```yaml
models_assessed: []
variants_created: []
models_left_unassessed: []
candidates_rejected: []
escalations: []
```
