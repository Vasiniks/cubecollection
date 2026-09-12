# GAN depth — Lane F

## SCOPE
GAN only. Depth research on the 18 GAN models that carry exactly one configuration (17 with a
single variant file, plus `gan-ui-12-maglev` whose second file, `--10th-anniversary`, carries no
`config` block at all and so contributes no second *configuration*). Also: check for further
instances of the known missing-axis defect (a variant whose own name asserts an axis value that
sits only on a sibling variant, never inherited, because inheritance runs model -> variant only).
No non-GAN record touched. No model, family, or manufacturer record created or edited — only new
variant files under existing `data/variants/gan/<model-id>/`, new source files under
`data/sources/`, and attestation additions to existing GAN variant files.

## BASE COMMIT
9879163 (main)

## TARGETS
1. Missing-axis defect fix: `gan-ui-12-maglev--10th-anniversary` (config entirely absent, name
   asserts MagLev).
2. Missing-axis defect fix: PiCube service-mod variants on `gan-flagship-16` (x2: MAX and
   non-MAX), `gan-flagship-12`, and `gan-v100-maglev` — names all begin "GAN... MagLev" but
   `config.maglev` is absent/unknown.
3. Verify `gan356-i-carry-2-uv-3x3-10th-anniversary-edition` is not a third, distinct product
   from the existing `gan-356-i-carry-2--10th-anniversary` + `--uv-coated` pair.
4. Resolve or further bound the open `gan12-ui-maglev-3x3-powerpod-2026-edition` lead.
5. Sweep the 18 single-configuration models for a second, undocumented configuration across
   TheCubicle, GAN's own store (gancube.com), and a non-US retailer (cubelelo.com), per
   RESEARCH_SPEC 3.6a's three checks (CDX prefix, Shopify brand facet, non-US retailer).
6. Record negatives explicitly where a model is swept clean.

## STATUS
In progress. Missing-axis defect batch (target 1-2) done and committed. Moving to targets 3-6.

## FINDINGS

### Missing-axis defect — 5 confirmed instances, all fixed; systematic sweep found no more
Ran a script over every GAN variant file checking whether the record's own `name` states an axis
(maglev, uv, frosted, matte, ball-core) that its `config` block omits. Beyond the 5 instances the
task already flagged, the sweep found none. Treating this defect class as closed for GAN pending
any future record additions.

Fixed, each citing the SAME source already bound to the record (the retailer's own product title,
which states the axis directly — not an inference from a sibling variant):
- `gan-ui-12-maglev--10th-anniversary`: added `config: {maglev: maglev}`. The record previously
  had no `config` block at all. Source: `thecubicle-gan12-ui-maglev-10th-anniversary-2024`, whose
  own excerpt already quotes the page title and description as "GAN 12 UI MagLev 3x3 (10th
  Anniversary Edition)".
- `gan-flagship-16--max-picube-20-magnet-ball-core-mod`: added `config.maglev: maglev`. Source:
  `thecubicle-gan-v100-maglev-uv-picube-mod`, which lists this exact sibling product name,
  "GAN16 MagLev MAX UV 3x3 (PiCube 20-Magnet Ball-Core Mod)", in its own excerpt.
- `gan-flagship-16--picube-20-magnet-ball-core-mod`: same fix, name "GAN16 MagLev UV 3x3 (PiCube
  20-Magnet Ball-Core Mod)", same source.
- `gan-flagship-12--picube-20-magnet-ball-core-mod`: same fix, name "GAN12 MagLev UV 3x3 (PiCube
  20-Magnet Ball-Core Mod)", same source.
- `gan-v100-maglev--picube-20-magnet-ball-core-mod`: same fix. This one IS the source's own
  product page (title "GAN V100 MagLev UV 3x3 (PiCube 20-Magnet Ball-Core Mod)"), the strongest
  of the four.

All four PiCube fixes recorded at `probable` (tier 2, single retailer, per rule 9), matching the
confidence already used for `coating` and `core_system` on the same records. The 10th-anniversary
fix is also `probable`, matching its `--standard` sibling's own confidence for the same axis.

## EVIDENCE
No new source records needed for the defect-fix batch — all five fixes cite sources already bound
to the record they corrected (`thecubicle-gan12-ui-maglev-10th-anniversary-2024` and
`thecubicle-gan-v100-maglev-uv-picube-mod`), since the missing claim was already sitting,
unused, in each source's own excerpt.

## CHANGES
- `data/variants/gan/gan-ui-12-maglev/10th-anniversary.yml` — added `config.maglev` + attestation.
- `data/variants/gan/gan-flagship-16/max-picube-20-magnet-ball-core-mod.yml` — added
  `config.maglev` + attestation.
- `data/variants/gan/gan-flagship-16/picube-20-magnet-ball-core-mod.yml` — added `config.maglev`
  + attestation.
- `data/variants/gan/gan-flagship-12/picube-20-magnet-ball-core-mod.yml` — added `config.maglev`
  + attestation.
- `data/variants/gan/gan-v100-maglev/picube-20-magnet-ball-core-mod.yml` — added `config.maglev`
  + attestation.

`npm run check`: 0 errors, 30 warnings after this batch (unchanged from the 30-warning baseline
at base commit).

### Target 3 — i-carry-2 "uv-3x3-10th-anniversary" slug is NOT a third product
Checked whether `gan356-i-carry-2-uv-3x3-10th-anniversary-edition` (from
`thecubicle-gan356-slug-prefix-2026`'s path list) names something beyond the archive's existing
`gan-356-i-carry-2--10th-anniversary` (which already carries `config.coating: uv`) and
`--uv-coated`. It does not: the URL
`https://www.thecubicle.com/products/gan356-i-carry-2-uv-3x3-10th-anniversary-edition` is the
EXACT url already recorded on `thecubicle-gan-356-i-carry-2-10th-anniversary-2026`, the source
already backing `gan-356-i-carry-2--10th-anniversary`. Same page, same product, already a
variant. No action needed — closing this lead as already covered, not new.

### Target 4 — the open PowerPod-2026-edition lead: RESOLVED, REJECTED as a bundle
`gan12-ui-maglev-3x3-powerpod-2026-edition` (Shopify id 7995691008083) was left open because
TheCubicle's 2026 storefront is JS-rendered and the archived capture carried no description.
Wayback is down this session (503/504 on CDX search, `wayback/available`, and a direct replay,
retried across several minutes) so I fetched the live Shopify `.json` endpoint instead, which
carries the same underlying product record the JS page renders from. Its `body_html` opens with
a sentence IDENTICAL, word for word, to the already-rejected `gan12-ui-maglev-with-powerpod`
listing ("The GAN 12 UI MagLev is everything you love about the GAN 12 UI Free Play, but with a
MagLev tensioning system!... It comes with a GAN PowerPod for easy charging and storage."), and
lists the same box contents (cube, PowerPod, manual, power station, USB-C cable, adjustment
tool, swappable magnets, cube bag). Nothing on either page states a material or mechanical
difference between the two listings' cubes. Verdict: "2026 Edition" is a restocked SKU under a
new Shopify id and handle (created 2026-06-11 vs. the sibling's 2024-08-01), not a GAN-declared
edition — the copy is a duplicate of the 2024 bundle description. REJECTED as a configuration of
`gan-ui-12-maglev`, same reasoning as its sibling. New source:
`thecubicle-gan12-ui-maglev-powerpod-2026-edition`, `preservation_method: excerpt` (no
archive_url obtainable this session), explicitly flagged in its `preservation_note` for
re-verification once web.archive.org is reachable again.

## UNRESOLVED
- `thecubicle-gan12-ui-maglev-powerpod-2026-edition` rests on a live fetch, not an archived
  capture — flagged in its own preservation_note for re-verification once Wayback recovers.

## NEXT
- Targets 5-6: sweep the 18 single-configuration models across TheCubicle, gancube.com, and a
  non-US retailer.
