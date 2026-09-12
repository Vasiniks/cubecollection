# Specification Adversarial Review — Lane J

## SCOPE
Hostile, independent review of the SPECIFICATION layer over `data/models/**` and
`data/variants/**`: are the *numbers and config values* right, not merely present and
schema-valid? A prior lane (D, `research/qc/provenance-adversarial-lane-d.md`) attacked the
EVIDENCE layer (are the sources sound, independent, correctly preserved). This lane assumes
sources are what they say they are and asks instead whether the value written into `specs`/
`config` is actually the value the cited source states, for the object it claims to describe.

The archive's own instructive prior failure (rule 45/48 histories): a value can be plausible,
inside every range check, schema-valid, attested, and still not be what the source says —
because it is a gross/package weight, a shipping dimension, false converted precision, absent
from the cited excerpt, a bundled accessory mistaken for a spec, a "you may also like" panel
value, a name-only inference, a disputed value read as settled, a model value duplicated onto
a variant, or a variant-only fact asserted for the whole model.

## BASE COMMIT
e286e3f (main) — "research: merge GAN depth lane F — five missing-axis defects and two closed
slug leads"

## THE TEN ATTACK CLASSES
1. Gross/package weight recorded as item weight (rule 45 already exists — hunt what it misses:
   "Package Weight", "Net Weight" vs gross ambiguity, Shopify `grams`, non-English phrasing,
   values not literally adjacent to the word "Gross").
2. Shipping dimensions recorded as product dimensions (box L x W x H vs cube edge length;
   "Package Size" fields).
3. Converted values with false precision (oz->g, in->mm, cm->mm stated to more sig figs than
   the source supports).
4. Values absent from every cited source excerpt (rule 48 exists for numeric specs cited
   directly; hunt fields rule 48 does not check — non-numeric specs, enum config values,
   materials, `piece_count`, string fields — and disputed-block blind spots per the
   `citedSourceIds()` lesson).
5. Package contents mistaken for specs (a bundled tool/spare/lube bag read as a material or
   accessory spec).
6. Specs copied from a "you may also like" / recommendation panel on the same page rather than
   the product itself.
7. Values asserted from the product name alone (e.g. a size or generation claimed only because
   it appears in a name string, with no source stating the fact).
8. Disputed values bypassing checks (a value living in `disputed[]` presented/treated elsewhere
   as settled, or a main value that silently matches one disputed candidate without
   adjudication).
9. Model-level specs incorrectly copied down into variant overrides (rule 23 flags an override
   with no attestation; this hunts overrides that DO have an attestation but restate the
   model's value verbatim, adding nothing — a distinct defect from rule 23's).
10. Variant-level facts incorrectly stored on the model (a fact true of only one sold
    configuration asserted at model level, contaminating every variant that inherits it).

## METHOD
- Read `DATA_MODEL.md` (schema, rules 6/18/23/43/45/46/48), `RESEARCH_SPEC.md` (source tiers,
  scope), `scripts/lint-semantic.mjs` (existing rules 45/46/48 implementations), and
  `scripts/lib/archive.mjs` (`citedSourceIds`, `resolveSpec`, `sourceTier`).
- Every probe is written to the scratchpad, run against real data, and its hits inspected by
  hand before any count is reported — per PROBE DISCIPLINE. Known positives/negatives are
  tested where a defect class of this shape already exists in archive history (e.g. rule 45's
  own gross-weight fixtures, rule 48's derived-conversion fixture).
- Repairs are made only where the source excerpt itself, read in full, justifies the repair.
  No repair invents a number; the fix is always removal, confidence reduction, or restoring the
  value the source actually states.

## STATUS
IN PROGRESS. Classes 1, 2, 3, 5, 9 swept (clean). Class 10 produced a CONFIRMED, fixed defect
(three instances, one root cause). Classes 4, 6, 7, 8 not yet attempted.

## SUMMARY (ranked by severity)

1. **CONFIRMED (MODERATE, 3 instances, one root cause)** — a magnetic/MagLev variant silently
   inheriting its non-magnetic model's weight, when the correct variant-specific weight was
   already sitting in a source the archive itself cites, and in two of the three cases the
   model's own attestation note explicitly says the figure "belongs to that configuration" /
   "is the magnetic configuration" and was never transcribed. FIXED: `qiyi-m-pro-standard--maglev`
   (config.weight_g 80.0), `qiyi-valk-3-power--power-m` (94.4), `qiyi-valk-3--m` (85.0). See
   FINDINGS §1.

## FINDINGS

### 1. CONFIRMED — model-baseline weight silently inherited by variants it does not describe
### (class 10: a fact true of only one configuration, propagated by inheritance to others)

**Root cause.** On 2026-09-12, "audit sweep #14" (see `scripts/audit.mjs` ~L696) went through
models that had NO weight at all because rule 45 had correctly refused a gross figure, and
replaced 23 of them with the admissible "Item Weight" figure already sitting, cited, in the same
source. That pass was careful and its own notes are excellent evidence discipline: for models
with more than one weight-bearing source among their citations (a magnetic sibling, a MagLev
page, a Mini), the note explicitly identifies which figure belongs to the model's own baseline
page and which belongs to a *different, sibling configuration* — but the pass fixed the MODEL
record only. In three cases the note names the sibling figure and says outright that it is not
this model's own, and in two of them says explicitly it "is left for a variant that records it" /
"is the magnetic configuration" — and no such variant edit was ever made. The result: the
magnetic/MagLev variant has no `config.weight_g` override, so it silently inherits the
non-magnetic baseline's weight through normal D1 inheritance — a fact genuinely true only of the
`--standard` configuration, applied by inheritance to a sibling it was never measured on.

**Instances (all now fixed):**

| Variant | Was (inherited) | Cited source's own "Item Weight" | Fixed to |
|---|---|---|---|
| `qiyi-m-pro-standard--maglev` (`data/variants/qiyi/qiyi-m-pro-standard/maglev.yml`) | 76.0g (model default) | `thecubicle-qiyi-m-pro-3x3-maglev-product`: "Item Weight: 80.0g" (Dimensions 55.0mm, matches) | `config.weight_g: 80.0` |
| `qiyi-valk-3-power--power-m` (`data/variants/qiyi/qiyi-valk-3-power/power-m.yml`) | 87.4g (model default) | `thecubicle-valk-3-power-m-product`: "Item Weight: 94.4g" (Dimensions 55.5mm, matches) | `config.weight_g: 94.4` |
| `qiyi-valk-3--m` (`data/variants/qiyi/qiyi-valk-3/m.yml`) | 82.3g (model default) | `thecubicle-valk-3-m-product`: "Item Weight: 85.0g" (Dimensions 55.5mm, matches) | `config.weight_g: 85.0` |

Each source's own spec table also carries a "Gross Weight" figure (143g / 231g / 227g
respectively) which is correctly NOT used — the fix takes only the Item Weight, matching the
existing rule-45 discipline. Each repair's `note` states plainly what was wrong (silent
inheritance of the wrong configuration's weight) and cites the exact source and figure, per the
"every repair must leave the mistake visible" constraint.

**How found.** A probe (`probe10_model_vs_variant_weight.mjs`, then tightened as
`probe10b_tight.mjs`) checked every variant that does NOT override `config.weight_g` against
every source cited by ANY of its own attestations, looking for an "Item Weight: Xg" figure
disagreeing with the inherited model value by >1.5g and corroborated by a matching "Dimensions"
figure in the same source (borrowing sweep #14's own validated cross-check, so a sibling-puzzle
or shared-source figure cannot masquerade as evidence about this configuration). Confirmed by
grepping every one of the 23 models touched by "audit sweep #14" for a sibling-configuration
weight mention in the note prose (`grep -rl "audit sweep" data/models/`) — exactly 3 of 23 name
an unclosed sibling figure, and all 3 matched the probe's hits independently.

**Severity: MODERATE.** Not HIGH: the wrong value in each case is still a plausible item weight
for a 3x3 (off by 4-8g, well inside rule 18's range), `confidence` was `probable` not
`confirmed`, and the true figure was never asserted as false anywhere — it was simply absent
where it belonged. But it is exactly the shape RESEARCH_SPEC calls out: correct data, insufficient
transcription, and a QC rule (18's range check) that cannot see it because the wrong number is
perfectly plausible.

## PROBES DISCARDED

**P-weight-generic (class 1, proximity-window bug).** First attempt at finding gross/package
weights beyond rule 45's exact phrase match used a "packaging keyword within 80 characters of a
number+g" window. **108/108 false positives**: every hit was an already-correctly-recorded "Item
Weight: Yg" sitting a few words away from that same source's "Gross Weight: Xg" in one spec-table
sentence — the keyword window caught the *neighbouring* gross figure's vocabulary while the
actual matched number was the correct item figure. Manually verified on
`cubestyle-3x3-standard`, `cyclone-boys-feichi-g3`, and six others — all correct as recorded.
Discarded; not a defect, a proximity-matching artifact.

**P-weight-labeled (class 1, follow-up, label-extraction bug).** Tightened P-weight-generic to
extract a `<label> Weight: Ng` pair directly instead of a window. **21/21 false positives**: the
non-greedy label-capture regex, run left-to-right over JSON-escaped source text, frequently
grabbed a meaningless tail fragment (`"n"`, `"mm) and item"`, `"Plastic."`) immediately before a
BARE, unqualified "Weight: Ng" field (GAN/Swift Block/cubezz sources that report only one weight
figure, with no gross/item split at all — confirmed by reading each source's raw excerpt: e.g.
`gancube-swift-block-355-maglev-specifications` states only "Weight: 91.8g", never a second
figure). A bare unqualified "Weight" field is not evidence of anything but itself; the label
fragment made it look labelled when it was not. Discarded.

**P10-model-vs-variant-weight, first pass (class 10, over-broad citation scope + a second
"Gross Weight" regex bug).** First version scanned EVERY source cited by ANY attestation on a
variant (not just weight-related ones) for any "Weight: Ng" pattern including a bare fallback
branch — which, exactly as in P-weight-generic, matched the number following "Gross" because a
space is not a letter. **88 raw hits, and on manual inspection every single one was either (a)**
the same "Gross Weight" mismatch already characterised above, **or (b)** a source cited on the
variant only for an unrelated reason (e.g. `lightake-fangshi-guangying`, cited on
`fangshi-guangying-original--standard` solely as one of four retailers checked for a second
config, never for weight) whose own incidental weight figure (for a different retailer's
observation of the SAME product, or in one case a genuinely different multi-product grouped
source, `cubezz-yuxin-3x3-collection-2026`, which documents four separate YuXin SKUs in one
record) was flagged as if it were an asserted spec for this record. Tightened to
`probe10b_tight.mjs` (require an explicit "Item Weight" label plus a matching "Dimensions"
figure in the SAME source, per sweep #14's own validated guard) — this dropped the hit count from
88 to 7, and manual review of all 7 found 4 more false positives (`guoguan-yuexiao-pro--standard`,
`mohuanshousu-chufeng-standard--standard`, `mojue-m3-standard--standard`, and
`qiyi-valk-3-power--standard`), all of which are cases the archive had **already** adjudicated
explicitly in the model's own `/specs/weight_g` note as ordinary retailer measurement variance
(2-3g) and deliberately not treated as a dispute — correctly so on inspection. The remaining 3 of
7 are FINDINGS §1 above. **Measured false-positive rate: 81/88 = 92% on the raw probe, 4/7 = 57%
even after tightening** — every surviving hit still required a by-hand read of the model's own
adjudication note to separate "already decided, ordinary variance" from "genuinely never
addressed."

## CLASSES SWEPT CLEAN THIS PASS

- **Class 1 (gross/package weight recorded as item weight, beyond rule 45's exact match).**
  Checked literal-phrase variants ("Package Weight", "Shipping Weight", "Net Weight", "Weight
  (including the packing)", loosened "Gross Weight" punctuation) against every model/variant
  `weight_g` and its cited sources (via `citedSourceIds`, both `att.sources` and
  `disputed[].sources`): **0 hits.** Every instance of "Package Weight" / "Packing Weight" /
  Shopify-`grams`-in-prose found anywhere in `data/sources/` (13 sources) was checked by hand
  against the model/variant that cites it — every one is either already correctly excluded
  (`moyu-huameng-tg-v2`, `dayan-void-cube-limited-edition-2026`, `thecubicle-escube-vendor-facet-2026`
  explicitly refuse the Shopify `grams` figure in their own reliability_note) or correctly uses
  the co-stated item/product figure instead (`cubelelo-moyu-aolong-v2-le-2021`,
  `cubelelo-moretry-tianma-x3-plus-frosted`). A broader keyword-proximity sweep and a
  label-extraction sweep were BOTH built and BOTH discarded at 100% false positives (see PROBES
  DISCARDED) — the residual ground this class might still occupy would need a fundamentally
  different method than text matching, which is explicitly against this project's "do not trust
  numeric range checks" instruction and was not attempted for that reason.
- **Class 2 (shipping dimensions recorded as product dimensions).** Only 2 sources in the entire
  corpus state a "Package Dimensions"/"Packing Size" figure distinct from the product's own size
  (`lightake-fangshi-guangying`, `cubezz-fangshi-mini-shuangren`). Checked the 3 variants citing
  either: all three (`fangshi-shuangren-original--mini-assembled`,
  `fangshi-shuangren-original--mini-diy-kit`, `fangshi-guangying-original--standard`) record the
  product's own size (54.6mm / 57.0mm), never the package figure (60mm / 56x56x56mm /
  190x130x40mm). Clean.
- **Class 3 (converted values with false precision).** Only 5 sources in the corpus state a
  weight in ounces; no source anywhere states inches, pounds, or centimetres-as-a-conversion-unit
  (`grep -lEi` for "inch"/"pound"/"lb" across all of `data/sources/`: 0 hits). Of the 5 oz-only
  sources, 2 are cited by a current model/variant weight (`mfjs-meilong-3x3`, `mfjs-meilong-3c`),
  and both were ALREADY corrected under rule 48's own documented 2026-09-09 sweep (2.2oz recorded
  as 62g/62.4g→62g, with a note stating the honest 2-sig-fig interval, not a spurious decimal).
  The other 3 oz-sourced records (`mfjs-mf3rs3`, `mfjs-mf3rs3-m` at SpeedCubeShop) are NOT cited
  by any current model/variant weight at all. Additionally: **zero** `weight_g` or `size_mm`
  values anywhere in `data/models` or `data/variants` carry more than one decimal place
  (`grep -hoE` for 2+ decimal places: 0 matches archive-wide) — the specific failure mode this
  class describes (a converted figure stated to a precision its source cannot support) cannot
  exist today because no such over-precise value exists in the data at all.
- **Class 5 (package contents mistaken for specs).** Searched `data/models` and `data/variants`
  for accessory/bundle vocabulary (lube, screwdriver, hex key, spare pieces, stand, pouch, etc.)
  outside `packaging`/`description`/note fields. All matches found are prose *discussing* bundle
  contents, correctly kept out of `config`/`specs`: `guoguan-yuexiao-pro--pro-m` stores its
  accessory list in `packaging.contents` (schema-correct); `moretry-tianma-x3-v2` explicitly
  refuses to use a contaminated bundle-contents capture's spec figures ("most plausibly belong to
  the V4 product... not used here"); `qiyi-qimeng-plus--magnetic` explicitly excludes "5ml/10ml/
  15ml" lubricant add-ons from `edition.types`; `thecubicle-gan12-ui-slug-prefix-2026` (a source)
  explicitly documents and rejects treating GAN's PowerPod charging-dock bundles as configurations
  ("a cube packaged with an accessory is a bundle however the retailer titles it"). No instance
  found of bundle contents leaking into a spec field.
- **Class 9 (model spec copied verbatim into a variant override, adding nothing).** Mechanical
  check: for every variant with a `config.<field>` override for any of
  `size_mm/weight_g/magnet_configuration/magnet_strength/core_system/maglev/adjustment_system/
  coating/materials/lubrication`, compare against the model's `specs.<field>`. **0 of 522
  variants** set an override that exactly restates (by strict equality, then re-checked with
  string coercion to catch any type mismatch) its model's own value. Clean — every override in
  the archive changes something.

## PROPOSED RULES
Nothing proposed yet. Under consideration: a durable version of `probe10b_tight.mjs` (an
"item weight cited on this record's own attestations, dimension-corroborated, disagrees with the
inherited value by more than measurement noise") — but its 57% post-tightening false-positive
rate against already-adjudicated ordinary variance means it is not yet precise enough to ship
unattended; see UNFINISHED SCOPE.

## CHANGES TO data/

| File | Pointer | Before | After | Why |
|---|---|---|---|---|
| `data/variants/qiyi/qiyi-m-pro-standard/maglev.yml` | `/config/weight_g` | unset (inherited 76.0g) | `80.0`, attested to `thecubicle-qiyi-m-pro-3x3-maglev-product` | Silent inheritance of the non-magnetic model default; the MagLev page's own "Item Weight: 80.0g" was already cited and named in the model's note but never transcribed. |
| `data/variants/qiyi/qiyi-valk-3-power/power-m.yml` | `/config/weight_g` | unset (inherited 87.4g) | `94.4`, attested to `thecubicle-valk-3-power-m-product` | Same defect: the Power M page's "Item Weight: 94.4g" was named in the model's note ("gives 94.4g for the magnetic configuration") but never written to the variant. |
| `data/variants/qiyi/qiyi-valk-3/m.yml` | `/config/weight_g` | unset (inherited 82.3g) | `85.0`, attested to `thecubicle-valk-3-m-product` | Same defect: the Valk 3 M page's "Item Weight: 85.0g" was named in the model's note ("is the magnetic configuration") but never written to the variant. |

All three repairs: confidence `probable` (matching the tier-2, single-source strength already
used for the model-level figures they parallel); each `note` states the wrong prior state
(silent inheritance), the correct figure, its source, and that the archive had already
identified but not closed this exact gap. Verified with `npm run validate` and `npm run lint`
after each edit — 0 errors, unchanged 30-advisory baseline.

## UNFINISHED SCOPE

- **Classes 4, 6, 7, 8 not yet attempted** at the time of this checkpoint: (4) values absent from
  every cited source excerpt, for NON-numeric config/specs fields — rule 48 only checks fields
  where `typeof value === 'number'`, so enum fields (`core_system`, `maglev`,
  `magnet_configuration`, `adjustment_system`, `coating`) have no equivalent check at all; (6)
  specs copied from a "you may also like"/recommendation panel; (7) values asserted from the
  product name alone; (8) disputed values bypassing checks (a value in `disputed[]` treated as
  settled elsewhere, or the archive's main value silently matching one disputed candidate without
  visible adjudication).
- **Class 10's sweep was scoped to `weight_g` only.** The same "sibling configuration's own
  cited figure never transcribed" shape plausibly exists for `size_mm` (a magnetic/MagLev variant
  measured at a slightly different size on its own dedicated page) and has not been checked.
  `audit.mjs` sweep #14 and this lane's probe are both weight-specific; a `size_mm` analogue of
  `probe10b_tight.mjs` was not built.
- **The 4/7 residual false-positive rate on `probe10b_tight.mjs`** means there may be further
  genuine instances of class 10 among models NOT touched by "audit sweep #14" (this lane's
  targeted grep of 23 models found 3; the tightened probe covers only variants whose own cited
  source states BOTH an explicit "Item Weight" label and a matching "Dimensions" figure, so a
  case using different phrasing, a different retailer's spec-table format, or a source with no
  Dimensions field would not surface). Not re-run against the full corpus without the "audit
  sweep #14" pre-filter for lack of time in this checkpoint.
