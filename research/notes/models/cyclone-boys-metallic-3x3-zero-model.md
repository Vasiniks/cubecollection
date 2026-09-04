# cyclone-boys-metallic-3x3 — zero-model finding

Pass 3 (model enumeration), agent C, 2026-09-03/04.

## Question

Does the frozen family `cyclone-boys-metallic-3x3` yield a model?

## Evidence

- `speedsolving-wiki-cyclone-boys-products` (tier 3 override, existence/naming/chronology only):
  "Cyclone Boys Metallic 3x3 — A 3x3 with a shiny metallic coating on the outside. JPerm really
  likes this puzzle."
- `thecubicle-cyclone-boys-metallic-3x3` (tier 2, new this pass, found via a
  `thecubicle.com/products/cyclone*` CDX prefix sweep): "The Cyclone Boys Metallic 3x3 is **a
  normal 3x3**, but rather than the traditional stickerless shades, **this one has glossy
  metallic (plastic) sides**. This reflective 3x3 makes a fantastic display piece and a great
  conversation starter!" Spec table: Manufacturer Cyclone Boys, Type 3x3, Gross Weight 180g,
  Dimensions 57.0mm, Item Weight 86.0g.
- The same CDX sweep also found sibling SKUs `cyclone-boys-metallic-3x3-m` (magnetic),
  `...-m-gradient`, and `...-m-macaron` (colourway/finish variants) at the same retailer, none
  independently retrieved.
- A `cubezz.com/Buy-` prefix sweep (6,000-entry limit) for "Cyclone Boys Metallic" returned no
  results — checked, not found, recorded per RESEARCH_SPEC §3.6a rather than left silent.

## Analysis

DATA_MODEL §4.2's own materiality test: "Could the manufacturer produce both from the same
underlying design by choosing different parts, materials, or treatment at assembly? Yes →
variant. No → model." TheCubicle's own copy answers this directly and in the affirmative: it
is explicitly "a normal 3x3" whose only stated difference from an ordinary Cyclone Boys 3x3 is
a surface coating/finish ("glossy metallic (plastic) sides"). This is precisely the model
schema's own coating rule: `model.specs` carries no `coating` field at all — coating exists
only as `variant.config.coating` and `variant.colorway.finish` — because a coating cannot,
structurally, be what distinguishes one *model* from another in this data model. No source
found this pass — at any tier, including the two independent retailer sweeps — describes a
distinct mould, mechanism, or internal geometry for "Metallic 3x3" as opposed to Cyclone Boys'
other contemporary 3x3 shells (FeiWu, FeiChi, FeiJue — all independently measured 55-57mm this
pass, the same range as this product's own 57.0mm).

Model existence (class 2) is trivially met — this is a real, named, tier 1-3-sourced product.
Model **identity** (class 3, "a design/mould/mechanism difference, or a manufacturer-declared
generation") is not met, and — unusually — is actively contradicted by an affirmative tier 2
statement that it is "a normal 3x3." This is a stronger basis for a zero-model finding than mere
absence of evidence: the evidence found points the other way.

## Outcome

**Zero models for `cyclone-boys-metallic-3x3`.** This is not "no model was findable"; it is "the
evidence found says this is a coating, and this archive's own schema puts coatings at variant
level, never model level."

## The structural problem this leaves, and why it is escalated rather than resolved here

Pass 2 (frozen, not re-litigated by this pass) gave "Cyclone Boys Metallic 3x3" its own family,
separate from FeiWu, FeiChi, and FeiJue. A `variant` record's `model_id` must point at a model,
and a model belongs to exactly one family (§8.4's identity scheme; the model schema's own
`family_id` field). **With zero models under this family, no variant can ever be attached to it
either** — a metallic-coated FeiWu, FeiChi, or FeiJue (which is what the evidence suggests this
product actually is) has no record it can be filed under without either (a) inventing a model
here on identity grounds the evidence itself argues against, or (b) a family being able to house
a variant whose base model lives under a *different* family, which nothing in DATA_MODEL
provides for.

This is recorded here as a **suspected family-boundary question**, not mutated: per this task's
own instruction ("Suspected family-taxonomy error → record evidence, stop that branch,
escalate. Do not mutate"), this branch stops at zero models. A human reviewer choosing between
family-relabelling `cyclone-boys-metallic-3x3` as `positioning: special` metadata on an existing
FeiWu/FeiChi/FeiJue family, versus deciding this schema gap needs a documented exception, is
outside this pass's write lane (families are frozen at 122).

## What would resolve it

A source directly stating which base Cyclone Boys 3x3 (if any) the metallic coating was applied
to, or a source describing a genuinely distinct mould/mechanism for this product specifically
(neither of which was found in either retailer sweep run this pass).
