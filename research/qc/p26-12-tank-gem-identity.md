# P26-12 — ShengShou Tank vs Gem identity

Status: COMPLETE
No family/model/manufacturer/variant records created, altered, merged, split or re-parented —
this session created source records and this report only, per the P26-12 write lane. Disposition
below is a recommendation for the main session to execute, not an executed change.

## 1. Records and evidence reviewed

- `data/families/shengshou-gem.yml`, `data/models/shengshou/shengshou-gem-standard.yml`
- `data/families/shengshou-tank.yml`, `data/models/shengshou/shengshou-tank-standard.yml`
- `data/sources/thecubicle-shengshou-other-3x3-lines-2026.yml` (both product-page text excerpts)
- `data/sources/shengshou-gem-tank-metal-cross-retailer-sweep-2026.yml` (cross-range URL sweep)
- `data/sources/speedsolving-wiki-shengshou-products.yml` (the "similar to the Gem" clause,
  tier 4, staleness-flagged)
- `research/qc/p26-5-agent-d-shengshou-gem-tank-metal.md` (prior adjudication lane; confirms
  the open question was raised and left open, not resolved)

New evidence obtained and preserved this session (all created as `data/sources/*.yml`):
- `shengshou-gem-3x3-product-photography-2026`
- `shengshou-tank-3x3-product-photography-2026`
- `shengshou-gem-tank-catalog-facets-2026`

## 2. Image comparison (with preserved citable references)

Both products' page snapshots (2020-09-18) reference Shopify CDN image files by a stable,
versioned URL. Those exact files were located via CDX and retrieved directly (`curl -L`) from
their Wayback captures — not merely "looked at a picture" — and are cited with archive URLs and
sha256 checksums in the two photography source records above.

**Gem 3x3** (`shengshou-gem-3x3-product-photography-2026`): a four-panel composite. Box art
prints **"GEM"** with the Chinese characters **"宝石"** and the tagline "Every gem has a
legend" / "THREE-LAYER MAGIC CUBE". One panel shows the assembled cube (red/green/yellow,
stickerless, glossy highlights consistent with "shiny exterior"); another shows the middle
slice twisted 45°, exposing **black internal plastic** at the core, directly confirming the
retailer's "black plastic interior" claim. Piece geometry is a standard rounded-corner
stickerless silhouette; each face centre carries a small dark bowtie/hourglass centre-cap mark.
The retailer's specific "3-piece cap design" claim is **neither confirmed nor contradicted** —
no panel resolves a visibly distinct 3-piece centre-cap assembly beyond the ordinary
logo-plate mark common to many budget stickerless cubes of this era.

**Tank 3x3** (`shengshou-tank-3x3-product-photography-2026`): a single-scene box+cube
photograph, confirmed identical across two separately-crawled asset versions (the pre- and
post-Feb-2020 upload). Box art prints **"TANK"** with the Chinese characters **"坦克"** (the
word for "tank," the armoured vehicle) and "Stickerless Cube" / "3X3X3". The cube shown
(white/yellow/red/green/blue/orange) has the **same generic rounded-corner silhouette and the
same style of bowtie centre-cap mark** as Gem. Surface looks marginally less glossy than Gem's,
loosely consistent with "frosted" vs "shiny," but this is a weak, compression-limited
observation, not a confirmed finish measurement. No exploded/internal shot of Tank was found in
any crawled asset, so the "black internals" claim could not be visually cross-checked against
Gem the way Gem's own claim was internally confirmed.

**Assessment: inconclusive on mould identity, decisive on naming.** At the resolution available
(max 767px, JPEG-compressed retail photography, no macro/close-up shot of either edge-piece
geometry or core architecture), I cannot confirm or rule out a shared underlying mould from
piece shape alone — both show the same *class* of generic late-2010s budget stickerless
silhouette that numerous unrelated ShengShou-tier products share, so similarity here is weak
evidence at best in either direction. **What the photography newly and directly establishes is
that the two products carry genuinely different Chinese names on their own packaging — 宝石
(Gem) versus 坦克 (Tank) — read directly off the box art, not inferred or guessed.** These are
two unrelated Chinese words, not a homophone or a single name transliterated two ways. This is
new tier-2 evidence no prior lane possessed (prior lanes worked from English retailer copy
only), and it argues against "Tank is just a renamed/reconfigured Gem" — a straight rename by
one manufacturer of one product does not usually acquire an entirely unrelated name in the
manufacturer's own language on its own retail packaging.

## 3. Dimensions

**Gem's dimension remains unrecorded — but now for a documented reason, not simply because no
one looked.** `shengshou-gem-tank-catalog-facets-2026` reads the embedded Shopify catalogue
JSON directly from both 2020-09-18 page snapshots: Gem's `Dimensions` facet is the literal
string `"Dimensions_Other"` — TheCubicle's own structured catalogue has a fixed vocabulary
of dimension buckets (specific millimetre values, or the fallback "Other") and assigned Gem to
the fallback, i.e. **the retailer itself never recorded a numeric size for this product.**
Tank's facet reads `"Dimensions_56.0"`, matching the value already known from prose. I did not
find a numeric Gem dimension at any other retailer (SpeedCubeShop and Cubelelo do not stock the
Gem 3x3 at all — see §5 of `p26-5-agent-d-shengshou-gem-tank-metal.md`), nor at Cubezz, Lightake
or Kewbz (not reached — web-search budget was exhausted mid-session; see §8).

`gem_dimension_found: null`. This is a genuine "researched, not found, and now we know *why*
the primary source never had it," not an oversight.

## 4. Concurrency and pricing of the parallel size ranges

`shengshou-gem-tank-catalog-facets-2026` confirms, from the same two snapshots (captured six
minutes apart on 2020-09-18): **identical price**, $3.99 (`"price":399`) for both Gem 3x3 and
Tank 3x3 at the same moment — a sustained shared budget price point, not a two-tier pricing
signal in either direction. Weights differ consistently across both the prose descriptions and
the JSON facets: Gem 104g, Tank 100g.

**Availability at that shared snapshot moment differed**: Gem 3x3 was already tagged
`Availability_Discontinued`; Tank 3x3 was tagged `Availability_Available`. Read in isolation
this could suggest a hand-off from Gem to Tank. But read against the full cross-range capture
timeline already established in `shengshou-gem-tank-metal-cross-retailer-sweep-2026`, it does
not: TheCubicle's own Gem-line 4x4 SKU was captured **2020-12-03**, three months *after* this
Gem 3x3 "Discontinued" snapshot — i.e. the retailer was still actively carrying and adding new
Gem-branded SKUs to its catalogue well after the Gem 3x3 unit itself had sold out. That is the
signature of an individual SKU running out of stock within an otherwise still-active line, not
of a line-level rename or succession event. Combined with Tank's own nine-puzzle-type range
persisting in captures from 2019-07 through 2020-12, both lines' size ranges were being
actively sold and expanded across the same eighteen-month window (mid-2019 to end-2020) — a
textbook concurrent-parallel-ranges pattern, which the brief itself flags as the pattern that
argues strongly against a rename and for two distinct lines.

`ranges_concurrent: true` (confirmed via TheCubicle's own capture timeline; not verified at any
second retailer since neither SpeedCubeShop nor Cubelelo stocks Tank at all, and only Cubelelo's
single Gem Pyraminx capture exists outside TheCubicle).

## 5. Direct relationship statements

Only one was found in this session or any prior one: the Speedsolving wiki's "ShengShou Tank
3x3 — A 3x3 similar to the Gem" (`speedsolving-wiki-shengshou-products`, tier 4, self-flagged
stale, held at tier 4 by a prior QC action — see that source's `reliability_note`). No review,
forum thread, YouTube description, or Chinese-language listing stating a relationship was
located. This session's web-search budget was exhausted (200/200 calls used across this
worktree's history before I could run the two targeted searches I attempted — "ShengShou Tank
3x3 vs Gem 3x3 same mold review" and "ShengShou Tank cube review speedsolving forum" — both
returned zero results due to budget exhaustion, not zero hits). This is recorded honestly as
**not searched to completion**, not as "searched and found nothing." No other direct
relationship statement, positive or negative, was located by any lane to date.

## 6. Disposition + confidence + how strongly the evidence leans

**Disposition A — DISTINCT.** Keep both families.

What distinguishes them, by source:
- **Different Chinese product names on packaging** — 宝石 (Gem) vs 坦克 (Tank) — directly read
  from box photography this session, not inferred. Two unrelated words, not a rename artifact.
- **Confirmed concurrent, independently-managed size ranges** over an eighteen-month window,
  with Gem's own line still gaining new SKUs three months after its 3x3 unit sold out — the
  signature of two live, separately-stocked lines, not a hand-off.
- **Consistently different weight** across independent extractions (104g vs 100g).
- Different finish language in retailer copy (shiny vs frosted) — weak on its own (marketing
  language), but not contradicted by anything and loosely supported by the photography.
- Identical price ($3.99) — neutral, does not distinguish either way.
- Photographic mould comparison — **inconclusive**, not decisive in either direction; both show
  the same generic class of rounded-corner budget stickerless silhouette common across many
  unrelated ShengShou-tier products of this era. This is the one piece of evidence the brief
  specifically asked me to obtain and it did not settle the question by itself.
- The only comparative statement anywhere ("similar to the Gem") remains a single tier-4,
  self-flagged-stale, one-sentence dismissal — exactly the kind of source the brief says must
  not force a merge.

**Confidence: probable.** Not `confirmed` — the strongest single piece of evidence (the
Chinese box names) is tier-2 retailer photography, not a manufacturer statement, and the
photographic mould comparison that could have pushed this to `confirmed` or reversed it
outright remains genuinely inconclusive at the resolution obtained. Not `uncertain` either —
multiple independent, mutually-reinforcing tier-2 signals (naming, concurrency, weight) now
exist where before there was only retailer prose and a single weak tier-4 clause.

**How strongly it leans:** Distinct, moderately-to-fairly strongly. This session's new evidence
(box-art naming and confirmed concurrency) shifts the balance from "two adjudication lanes
declined to merge but couldn't say why beyond 'thin evidence'" to "two lanes now have
affirmative, if not conclusive, evidence for distinctness on top of the prior default toward
splitting under uncertainty." It does not reach `confirmed`/decisive, and the photographic
technique that resolved DaYan Bermuda did not equally resolve this case — the two products here
are both generic budget-tier cubes sharing a common design vocabulary, which limits what
photography alone can show, unlike Bermuda's evidently distinctive shape.

`leans: distinct`

## 7. Exact reassignment specification if B

Not applicable — disposition is A, not B. No reassignment specification is provided.

## 8. Leads not chased

- **Cubezz, Lightake, Kewbz** — never reached for either product, in this or any prior lane.
  Not searched; absence of a finding is not evidence of absence.
- **Chinese-language forums/listings** for either 宝石 or 坦克 ShengShou cubes — not searched
  (web-search budget exhausted before I reached this).
- **A macro/close-up photograph of either cube's corner or edge-piece geometry** — no such shot
  was found in any crawled Wayback asset for either product; only the retailer's standard
  marketing composites were available. A future pass with access to a physical unit, or a
  higher-resolution retailer image not captured by Wayback's crawler, could attempt the
  decisive mould-level comparison this lane could not complete.
- **Tank's internal/exploded shot** — not found in any crawled asset, unlike Gem's. Cannot
  cross-check the "black internals" claim visually for Tank the way it was confirmed for Gem.
- **Reviews or forum threads directly comparing the two** — not located; web-search budget
  exhausted mid-session before two targeted queries could execute (see §5). This remains the
  single most promising unchased lead: a solver's hands-on comparison (turning feel, exact
  size measured with calipers) would likely settle the dimension and mould questions outright.
- **SpeedCubeShop's "ShengShou Metallic" line** and the unresolved Metal Cube question — out of
  scope for this lane (P26-12 is Tank-vs-Gem only) but flagged again since it sits adjacent to
  this evidence base; see `p26-5-agent-d-shengshou-gem-tank-metal.md` §8 for its own leads.

## Machine-readable summary

```yaml
disposition: A
confidence: probable
evidence:
  - shengshou-gem-3x3-product-photography-2026
  - shengshou-tank-3x3-product-photography-2026
  - shengshou-gem-tank-catalog-facets-2026
  - thecubicle-shengshou-other-3x3-lines-2026
  - shengshou-gem-tank-metal-cross-retailer-sweep-2026
  - speedsolving-wiki-shengshou-products
images_obtained: true
images_preserved_as_sources: true
gem_dimension_found: null
ranges_concurrent: true
leans: distinct
reassignment_required: false
```
