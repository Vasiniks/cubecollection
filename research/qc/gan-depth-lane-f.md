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
In progress.

## FINDINGS
(populated as work proceeds)

## EVIDENCE
(populated as work proceeds)

## CHANGES
(populated as work proceeds)

## UNRESOLVED
(populated as work proceeds)

## NEXT
(populated as work proceeds)
