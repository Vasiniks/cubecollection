# GAN family-boundary rule (adjudicated)

**Adjudicated:** 2026-09-03, Pass 2 remediation gate · **Issue:** `G1` · **Status:** decided
**Evidence:** `research/qc/agent-c-gan-boundary.md` (independent re-fetch of primary captures),
verified and adopted by the main session.

This file exists because the archive was applying **two incompatible boundary rules at once**
without stating either. Pass 3 must apply the rule below mechanically. It is short on purpose.

---

## The problem this resolves

Six models whose manufacturer-given names begin **"GAN 356"** (`gan-356-i`, `gan-356-i2`,
`gan-356-i-carry`, `-2`, `-e`, `-s`) sit **outside** the `gan-356` family, in `gan-i-series` and
`gan-i-carry-series`. Meanwhile `gan-flagship-series` deliberately holds GAN11–GAN17 **together**
despite the numbers changing.

Numeric identity was therefore treated as **decisive** in one place and **non-decisive** in the
other. Both readings are individually defensible; holding both without a stated rule is not.

---

## THE RULE

> **A GAN family is a persistent product line identified by the name GAN itself keeps using for
> it. Numeric change within a line does not create a family. A name element that persists while
> the number is dropped IS the family identity.**

Applied:

- **GAN11 → GAN17** are one family (`gan-flagship-series`). The number changes each generation;
  the flagship line persists in GAN's own curated navigation. Numbers here are *generation
  markers within* a line.
- **"i" and "i carry"** are separate families from `gan-356`. The decisive evidence is GAN's own
  naming behaviour: **current-generation products in both lines dropped the "356" prefix while
  keeping "i" / "i carry"** — `gan-i4`, `gan-i-carry-4`. GAN discarded the number and kept the
  letter. The letter is therefore where family identity lives, and "356" in the older names is
  vestigial.

**This is not an inconsistency once stated: in both cases the persisting *name element* controls,
and the number is subordinate.** The two rules were never actually different — only unstated.

### Mechanical test for Pass 3

For a new GAN product, in order:

1. Does GAN's own **curated navigation** (top-nav dropdowns, not auto-tagged breadcrumbs, not
   generic Shopify collection pages) place it in a named line? → that line is the family.
2. Otherwise, strip generation numbers from the product name. Does a **persisting non-numeric
   name element** ("i", "i carry", "ui", "V", "Flagship") match an existing family? → that family.
3. If only a number matches an existing family and no non-numeric element does, it is **not**
   automatically that family — check 1 and 2 again before filing.
4. Still unresolved → leave unfiled and record it. Do **not** default into a numeric family.

---

## Evidence notes that constrain future work

**Curated navigation outranks auto-tagged breadcrumbs, and this is now proven.** A November 2024
`gancube.com` product page carries **both** a curated "Flagship Series" top-nav dropdown *and* an
auto-tagged "Advanced Series" breadcrumb, simultaneously disagreeing about the same product.
"Advanced Series" is a parallel, still-current auto-tag — **not** a superseded predecessor of
"Flagship Series". Never treat a breadcrumb as a family signal.

**GAN's top navigation is not organised by lineage.** Both `gancube.com` and `gancube.cn` group by
feature/price tier (Smart / Magnetic / Flagship), and those buckets cut across families — the
Chinese "Magnetic Series" list mixes GAN356 and GAN16 products, and the Chinese "Flagship" heading
even includes a 2×2. Use the *curated named-line dropdowns*, not these tier buckets.

**Recency caution.** The three collection URLs for `i-series` / `i-carry-series` / `ui-series` each
have exactly **one** Wayback capture, dated 2026-08-11. They evidence GAN's *current* organisation
only. The durable evidence for the split is the naming behaviour above, not those pages.

---

## Downstream impact

**Zero model re-parenting. 0 of 41 GAN-branded models move.** The existing structure is correct;
what was missing was the stated rule. This is the best possible outcome for the highest-impact
open boundary in the archive — the 22 already-built models filed under it stay where they are.

---

## Deliberately left open (Pass 4, not Pass 3)

**Is `gan-ui-series` a genuine independent family, or a smart-electronics modifier applied to
`gan-flagship-series` models?** Unlike "i" and "i carry", which carry their own independent
numbering (`gan-i4`, `gan-i-carry-4`), every `ui` product name is **parasitic on a flagship model
name** (`gan-ui-12-*`, `gan-ui-16-maglev-max`). That asymmetry is real and unresolved.

It does **not** block Pass 3: `gan-ui-series` may be enumerated as it stands. But do not treat its
independence as settled, and do not build a variant structure that would be expensive to unwind if
"ui" turns out to be a modifier rather than a line.

Related and already recorded: the pre-existing rule 25 advisory on
`data/variants/gan/gan-ui-12-sp/standard.yml` sits in this same family.
