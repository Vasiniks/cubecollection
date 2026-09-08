# P26-5 Agent B — DaYan Bermuda Adjudication

Status: COMPLETE.

## 1. Tier-1 verification

Confirmed and substantially strengthened beyond what was handed off.

- `dayancube-official-2013` (front page, 2013-08-05 capture) names "Dayan Bermuda Cube"
  once, in a flat product-list line alongside GuHong/LingYun/LunHui/ZhanChi/PanShi/Gem Cube.
  On its own this only proves the *name* is DaYan's own.
- I found and preserved a **dedicated official category page** the earlier pass never
  reached: `http://www.dayancube.com/dayan-bermuda-cube`, captured 2012-06-04 (page 1) and
  2012-07-17 (page 2) — new source `dayancube-official-bermuda-category-2012`. This is DaYan's
  own storefront category page for "Dayan Bermuda Cube," sitting in primary nav beside the
  numbered flagship line, and it enumerates **every** named sub-product itself, in DaYan's own
  words:
  - "Dayan Bermuda Triangle Magic Cube" — Black/White × 8 planet names (Earth, Jupiter, Mars,
    Mercury, Neptune, Saturn, Uranus, Venus)
  - "Dayan Bermuda House I Magic Cube" — Black/White
  - "Dayan Bermuda House II Magic Cube" — Black/White
  - "Dayan Bermuda Column Magic Cube" — Black/White
  - "Dayan Bermuda Star Magic Cube" — Black/White
- An individual product page (`Dayan-Bermuda-Column-Magic-Cube-Black`, 2013-09-10) confirms
  the Column was a real, priced ($21.53), cross-linked SKU sitting alongside "Dayan Bermuda
  Triangle Magic Cube White (Jupiter)" as a "you might also like" sibling — i.e. concurrently
  on sale, not a rename or succession.

This is presented as a **product line** by the manufacturer itself, not a single product —
correcting the framing in the original handoff, which read the tier-1 evidence as naming only
one product. DaYan's own site names five distinct sub-products (Triangle, House I, House II,
Column, Star) under one official "Dayan Bermuda Cube" category. No manufacturer description
of the bandaging mechanism itself was found on the official site — the copy on individual
product pages is generic ABS-plastic boilerplate shared across DaYan's whole catalog. The
"bandaged... shape-mods" mechanism description comes only from TheCubicle
(`thecubicle-dayan-bermuda-cube-2020`, tier 2).

## 2. Line-identity test — the crux, and where I overturned the prior reading

**Agent E's characterization ("decorative colourway naming across a shared bandaged-3x3
design") is wrong for most of the line, and I tested it directly with product photography
rather than inheriting it.**

I pulled the actual TheCubicle product photos (2020 Shopify CDN images, fetched directly this
session) for five of the named items:

- **Earth** and **Jupiter** (both "planet" names): standard cube-shaped exterior, with an
  irregular diagonal bandage-cut pattern. The black colorway of each shows the *same* cut
  pattern — consistent with one shared mold, colorway-only difference. This part of Agent E's
  reading holds.
- **Barrel** (TheCubicle's name; DaYan's own internal image filename and official name is
  "Column"/"Cylinder"): an **octagonal cylinder** exterior — not a cube shape at all.
- **House I**: a **house-shaped** exterior (pentagonal roof over a cube-like base).
- **House II**: a **different house-shaped** exterior (a distinct, taller/asymmetric roofline,
  visibly different piece geometry from House I).
- **Sunflower** (DaYan's own name: "Star"): a **star/flower-shaped** exterior.

This is four genuinely distinct exterior molds (cube/Triangle, cylinder/Column, two different
house shapes, star/Sunflower) inside one manufacturer-named line, not one mold in ten
colorways. Applying DATA_MODEL §4.2's test directly: *could DaYan produce a House-shaped shell
and a cylinder-shaped shell from the same underlying design by choosing different parts at
assembly?* No — these require different tooling/molds. **That makes Triangle, Column, House I,
House II, and Star five separate models, not variants of one model or a colourway dropdown.**
Within the Triangle model, the eight planet names plus the Black/White option are colourway
variants of one shared mold — that part of the "decorative naming" reading is correct and
should be preserved for that one sub-product.

All items found are 3x3-based (cube-shaped, or a 3x3-mechanism shape mod per TheCubicle's own
"Shape Mods" category and the retailer's description of "common 3x3 puzzles and shape-mods…
bandaged"). No non-3x3 puzzle was found under the Bermuda name.

## 3. Existing-family check

None of the 8 existing DaYan families (GuHong, LingYun, LunHui, PanShi, TaiYan, TengYun,
XiangYun, ZhanChi) fit. All eight are explicitly DaYan's numbered flagship/mainline speedcube
succession — every one of their family records frames itself against the wiki's or DaYan's own
numbered-product history ("Dayan II," "Dayan V," etc.) and every description concerns
standard-cube-shaped, WCA-relevant speedcube design evolution. Bermuda is:

- Not part of that numbering — DaYan's own official nav lists "Dayan Bermuda Cube" as a
  **separate top-level category**, coordinate with (not nested under) GuHong/LingYun/LunHui/
  ZhanChi/PanShi in the same navigation list.
- A structurally different kind of product (bandaged shape-mod novelty line vs. WCA-competitive
  speedcube line) with its own distinct positioning, own pricing tier, and no shared model
  lineage with any of the eight.

No existing family is a plausible home for Bermuda. A new family is the only fit.

## 4. Scope adjudication — decisive

**None of the Bermuda sub-products are WCA-legal.** The Triangle/Cube sub-product is a
bandaged 3x3 (pieces physically restricted from independent movement, per the retailer's own
description and confirmed by the photographed bandage-cut pattern); the Column, House I/II,
and Star sub-products are additionally non-cubic shape mods. Both properties independently
disqualify a puzzle from WCA competition. `legality.wca_status: not_legal` applies to every
model in this line. (No source stating the WCA regulation text itself was located or cited
this session — flagged as a leftover task in §8, same gap already present in the
`calvins-maze-300-cube` precedent, which also lacks a populated `legality` block.)

This routes the entire line through §2.2's conditional-scope gate: `scope_justification`
prose plus a tier 1–3 attestation, per record. Testing the actual bar ("it is interesting" is
explicitly insufficient; a documented production first, documented influence, documented
collector market, or documented place in a manufacturer's history is required):

- **Documented place in a manufacturer's history: clears the bar directly.** This is not an
  inference from a generic puzzle-category Wikipedia page (the weaker chain the
  `calvins-maze-300-cube` precedent had to rely on) — it is DaYan's own official storefront
  category page, naming five sub-products in the manufacturer's own words, coordinate with its
  numbered flagship line in its own site navigation. That is about as direct as "documented
  place in a manufacturer's history" gets.
- **Documented collector market: also clears the bar independently.** Two genuinely
  independent retailers (TheCubicle US, Cubelelo India — see §5) each carry the line under
  their own naming conventions, with TheCubicle's captures spanning 2019 through 2026 and
  Cubelelo's spanning 2020 through at least 2025-08-14 ("still current"). A named product line
  continuously sold by independent retailers across six-plus years is a documented, not
  asserted, collector market.

**Bermuda clears the conditional bar on either ground alone, and clears it on both.** This is
materially stronger evidence than the `calvins-bandaged-3x3-maze-300` precedent already
admitted into this archive under the same policy, which had only a single retailer and a
generic Wikipedia category match to lean on.

**Window check (§2.4):** DaYan's own official category page bounds the line's existence to "by
2012-06" at the latest (tier 1) — well inside, in fact predating, the archive's ~2016–2026
window, and TheCubicle's captures show it still being sold in 2026. In scope on dating, not
merely `reference_only`.

No stated release date was found anywhere (manufacturer or retailer); `introduced` should be
recorded as `qualifier: before, value: 2012, precision: year` sourced to the new tier-1
capture — a materially earlier and stronger bound than the `existed by 2019/2020` a
retailer-only reading would have produced.

## 5. Retailer-duplication test

No HaiTun/ZhanLang-style false positive found. Checked directly, not assumed:

- **Within TheCubicle:** pulled the raw Shopify product JSON for three Bermuda pages (Earth,
  Jupiter, Barrel). Each carries its own distinct internal Shopify product `id`
  (1689304268873 / 1689304301641 / 1689304137801) and its own SKU prefix (Earth: `2764_1_*`) —
  genuinely separate catalog entries within TheCubicle's own store, not one listing renamed
  across time (the failure mode the HaiTun/ZhanLang precedent required checking for).
- **Across retailers:** TheCubicle slugs shape-first (`dayan-bermuda-cube-earth`,
  `dayan-bermuda-barrel`, `dayan-bermuda-house-i`); Cubelelo slugs colour-first
  (`dayan-bermuda-black-earth`, `dayan-bermuda-sunflower-black`). Different naming
  conventions, different platforms, no shared product-ID scheme — independent catalogues, not
  a mirrored feed.
- DaYan's own 2012–2013 official site independently corroborates the same five-sub-product
  structure both retailers' catalogues echo eight years later, which is the strongest possible
  form of "not a retailer-invented category": the manufacturer named it first.

## 6. Disposition + confidence

**Disposition: A — genuine missing family.**

**Confidence: `confirmed`** on the family's existence and manufacturer-official naming (a
tier-1 source states it directly: DaYan's own official category page). Individual sub-product
identities (Triangle/Column/House I/House II/Star) are each `confirmed` (tier 1, the same
official category page names all five) or `probable` where only retailer sources add detail
(e.g. the specific bandage-cut description, which is tier 2 only). `Introduced` (before 2012)
is `probable` (tier 1 existence bound, but no explicit release-date statement).

## 7. Proposal (ready to execute, not acted on — mutation NOT authorized by this agent)

```yaml
proposed_family:
  id: dayan-bermuda
  manufacturer_id: dayan
  name: "DaYan Bermuda"
  aliases:
    - "Dayan Bermuda Cube"          # DaYan's own official top-level category name
  introduced:
    value: "2012"
    precision: year
    qualifier: before
    note: "Tier-1 upper bound from dayancube-official-bermuda-category-2012 (2012-06-04
      capture); no stated release date found anywhere."
  positioning: special               # "a line outside the regular range" — matches vocab exactly
  scope_note: >
    Family record itself carries no scope_class (schema places scope_class at model/variant
    level only). Every model beneath this family will need scope_class: conditional with its
    own scope_justification and Tier 1-3 attestation — see §4 above for the justification
    prose to reuse (documented manufacturer-history placement AND documented multi-year,
    multi-retailer collector market, either independently sufficient).
  attesting_sources:
    - dayancube-official-bermuda-category-2012 (confirmed, tier 1, new this session)
    - dayancube-official-2013 (confirmed, tier 1, corroborating name only)
    - thecubicle-dayan-bermuda-cube-2020 (probable, tier 2, mechanism description)
    - cubelelo-dayan-products-prefix-2026 (probable, tier 2, independent retailer corroboration)
  models_that_would_belong (NOT enumerated as records by this agent — pass 3/4 territory):
    - "DaYan Bermuda Triangle" (retailers call it "Bermuda Cube [Planet]") — standard
      cube-shaped bandaged 3x3. The 8 planet names x Black/White are variants of ONE model,
      not separate models (photographic comparison of Earth vs. Jupiter black colorways shows
      the same bandage-cut mold).
    - "DaYan Bermuda Column" (TheCubicle calls it "Barrel") — octagonal-cylinder shaped mold.
      Separate model: different exterior geometry from Triangle.
    - "DaYan Bermuda House I" — house-shaped mold, design 1. Separate model.
    - "DaYan Bermuda House II" — house-shaped mold, design 2 (visibly different roofline from
      House I). Separate model. NOT confirmed whether I/II is a generation succession
      (`succeeds`) or two permanently-parallel designs — both appear in DaYan's original 2012
      listing side by side and both continued in TheCubicle's catalogue simultaneously for
      years; recommend recording as parallel models unless a future pass finds evidence of
      succession, per DATA_MODEL §4.2's "when unclear, split" default.
    - "DaYan Bermuda Star" (TheCubicle calls it "Sunflower") — star/flower-shaped mold.
      Separate model.
  successor_predecessor: none found
  notes: >
    A future model-researcher pass should also check whether "Bermuda" carries additional
    named sub-products beyond these five (the wayback prefix sweep against dayancube.com used
    a --limit 200 pass and was not exhaustively re-run past that cap this session — see §8).
```

## 8. Leads not chased

- The `dayancube.com` prefix sweep this session was capped at `--limit 200` and returned
  exactly 200 rows (i.e. it may have been truncated). A full uncapped sweep should be run to
  confirm no sixth Bermuda sub-product exists beyond Triangle/Column/House I/House II/Star.
  Recorded honestly as "not confirmed exhaustive," not as "nothing else found."
- No source describing the specific WCA regulation that disqualifies bandaged/non-cubic-shape
  puzzles was located or cited; the `legality.wca_status: not_legal` / `basis` field for each
  future model record needs a citable source, not just this report's assertion. The existing
  `calvins-maze-300-cube` precedent has the same gap unfilled — worth closing for both at once
  in a future pass.
- Direct photographic comparison across all eight individually named planets (to confirm all
  eight share the Triangle mold, not just Earth and Jupiter) was not done — only two of eight
  were checked. A future pass should confirm the remaining six before treating "one shared
  Triangle mold" as fully closed.
- Whether House I and House II are a generation succession or two parallel designs is
  unresolved (see §7) — deferred explicitly to whoever writes the model records.
- DaYan's own official site is long dead (`link_status: dead`); no further tier-1 material
  beyond the 2012–2013 Wayback captures already used is expected to be reachable.

## Machine-readable summary

```yaml
candidate: dayan-bermuda
disposition: A
confidence: confirmed
evidence:
  - dayancube-official-bermuda-category-2012
  - dayancube-official-2013
  - thecubicle-dayan-bermuda-cube-2020
  - cubelelo-dayan-products-prefix-2026
  - thecubicle-dayan-products-prefix-2026
is_line_identity: true
wca_legal: false
scope_class: conditional
clears_conditional_bar: true
themed_items_are: models
authorize_mutation: false
```
