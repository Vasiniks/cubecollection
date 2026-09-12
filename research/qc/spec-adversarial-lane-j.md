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
IN PROGRESS. Skeleton committed before probing per instructions.

## SUMMARY (ranked by severity)
(to be filled in)

## FINDINGS
(to be filled in)

## PROBES DISCARDED
(to be filled in)

## CLASSES SWEPT CLEAN
(to be filled in)

## PROPOSED RULES
(to be filled in, only with both fixtures if actually added)

## CHANGES TO data/
(to be filled in — every repair listed with file, pointer, old value, new value, justification)

## UNFINISHED SCOPE
(to be filled in)
