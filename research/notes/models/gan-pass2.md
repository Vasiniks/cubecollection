# GAN pass 2 — family enumeration, session log

Scope: DATA_MODEL/RESEARCH_SPEC pass 2 for GAN, `gan`/`monster-go`/`swift-block`. 3x3x3 only.
Output: 11 canonical `data/families/*.yml` records, 1 staged model-identity question
(`research/staging/models/gan-v100.yml`), 15 new `data/sources/*.yml` records.

Prior work read before starting: `data/manufacturers/*.yml` (6 records), all 19 existing
`data/sources/*.yml`, `docs/pilot-audit.md`, `research/qc/gan-2026-09-01.md`, all 10 files in
`research/staging/variants/`. The staging axis files were read for family-name leads only, per
instruction, and are **not** cited as sources anywhere in this pass's canonical output — every
claim below traces to a source record I created or verified myself this session. Two staging
citations turned out to be wrong on independent verification (see "Corrections to staged leads"
below); I did not carry either forward.

## Discovery method

`npm run wayback -- prefix` against `gancube.com/collections/`, `gancube.com/products/`, and
`gancube.cn/` (full unique listings: 102, 160, and 300 URLs respectively — see the raw lists in
this session's tool output if a future pass needs them; I did not save them into the repo since
`research/staging/` file discipline is one-file-per-topic, not one-file-per-crawl). Then
targeted `get`/`list`/`nearest` against the highest-signal candidates: GAN's own collection
pages (read per RESEARCH_SPEC as the manufacturer's own drawn family boundary), GAN's own site
navigation as embedded in ordinary product-page fetches, and two GAN-authored history pages.

## The central call: is GAN11 through GAN17 one family or several?

This is the highest-stakes judgement in this pass — GAN's most historically important 3x3
line, including several world-record cubes — so I document the full reasoning rather than
just the conclusion.

**The alternative reading I rejected:** each bare number (GAN11, GAN12, ... GAN17) is its own
single-generation family, on the theory that GAN gives this succession no persisting proper
name the way "GAN356" or "Swift Block" are actual names.

**Why I did not take that reading.** GAN's own site draws the boundary itself, and it draws it
around the *whole numbered succession*, not around each number individually:

- gancube.com's own site-navigation dropdown, captured August 2026, is literally labelled
  "Flagship Series" and lists GAN16/15/14/12/GAN11-Series together, while excluding every
  356-branded product from that same list (`gancube-gan17-magdrive-product`).
- gancube.cn's own Chinese-language nav, captured August 2025, carries a parallel "旗舰魔方"
  (Flagship Cube) heading listing GAN16/15/14/13/12 together (`gancube-cn-core-technology-history`
  is the technology-history page; the nav grouping itself is documented in
  `gancube-gan17-magdrive-product`'s notes and independently in the discovery session, though I
  ultimately relied on the English-site nav as the cleaner primary citation since it is the more
  recent and more precisely scoped of the two).
- GAN's own technology-history page calls the 2020 GAN 11 M Pro that year's "heavyweight
  flagship" (年度重磅旗舰) in the same breath as narrating the magnetic-core lineage that
  continues explicitly through 2021's MagLev generation and, per GAN17's own current product
  copy, into GAN17 MagDrive ("GAN17 MagDrive is GAN's flagship maglev 3x3 speed cube").

That is a manufacturer-drawn boundary around the succession as a whole, not merely a shared
numbering convention I imposed. I treated it the way RESEARCH_SPEC §5 tells a researcher to
treat a manufacturer's own collection page: as family evidence, not merely as merchandising.

**The complication I did not smooth over.** GAN's own "Series"/collection labelling is not
perfectly stable over time. A November 2024 gancube.com collection at a *different* URL
(`/collections/flagship-speed-cubes`, titled "GAN Flagship Series Speed Cubes") mixed 356-branded
products in with the numbered line, and a sibling "Advanced Series" collection from the same
period listed nearly the same numbered models again under a different tier label. I read this
as evidence that GAN's *merchandising* categories (which cubes are "our best sellers right now")
shift as new numbers launch and older ones get discounted down a tier — not as evidence against
the numbered succession itself being one continuous, named design lineage. I used the newer,
cleaner, more exclusive 2026 site-navigation dropdown as the operative evidence and recorded the
older, messier collection as a documented complication in `data/families/gan-flagship-series.yml`
rather than quietly ignoring it. **This is a judgement call a human reviewer should look at
directly** — the family record's `description` field carries the full comparison.

**Naming the family.** GAN gives this succession no name beyond the bare numbers and the nav
label "Flagship Series"/"旗舰魔方" itself. I used "GAN Flagship Series" as the canonical `name`,
directly sourced from the nav label, rather than inventing a name with no textual basis. This is
recorded as a judgement call in the family's own `description`.

## GAN V100 — resolved boundary, staged deeper question

Whether GAN V100 belongs in GAN Flagship Series was flagged as unresolved in
`docs/pilot-audit.md` (finding A3). I chased it further this pass and found three independent
pieces of evidence, on both of GAN's own sites and from a major retailer, that GAN itself keeps
V100 **out** of its Flagship/旗舰魔方 grouping:

1. GAN's own English product-page breadcrumb for V100 reads "Advanced Series", not "Flagship
   Series".
2. GAN's own Chinese site categorises V100 under "磁力系列" (Magnetic Series), not "旗舰魔方"
   (Flagship Cube) — on the same page that lists GAN16 under *both* headings, so the omission of
   V100 from the flagship heading is not simply incomplete tagging.
3. TheCubicle's own retail copy describes V100 as sharing "the system found in the flagship
   GAN16" — calling GAN16, not V100, "the flagship" in the same sentence.

On the strength of that, I created `data/families/gan-v100.yml` as its own canonical family
(not GAN Flagship Series, and not merely staged) — the *boundary* question is resolved. What
remains genuinely open — what "V100" denotes, why it exists alongside GAN17, whether it will
receive further generations — is staged in `research/staging/models/gan-v100.yml` for pass 3,
per the instruction that model-identity uncertainty (as opposed to family-boundary uncertainty)
belongs there.

## GAN356 vs GAN Flagship Series: parallel, not successive

GAN356 was GAN's flagship line 2015-2019 by its own technology-history page's own language, and
the flagship position moved to the new numbered line in 2020. I did **not** record
`successor_family_id` from gan-356 to gan-flagship-series, because GAN356 did not stop being
sold — it is still current in 2026 (GAN356 Me, GAN356 M e Minions Edition, both present in the
same August 2026 site-navigation capture used to establish Flagship Series). A
`successor_family_id` claim would misrepresent a *positioning* shift as a *discontinuation*, so
I recorded the shift in prose (`gan-356.yml`'s `description`) instead and left the relationship
field unset.

## GAN357 and GAN354: small, easy-to-miss families I did not fold into GAN356

Both are genuinely separate GAN-given names (not colourways or configurations of GAN356), each
evidenced directly on GAN's own site:

- **GAN357** existed by GAN's own earliest archived site capture (2016-08-08) as a headline
  product with its own marketing tagline ("Starts new Corner-Cutting era"), distinct in kind
  from every 356 tagline on the same page. It disappears from every later catalogue capture
  found. I recorded it as its own family, `discontinued` left unset (no source states when),
  rather than silently absorbing it into GAN356 because the two names shared a decade.
- **GAN354** is a persisting, multi-generation compact-format (54mm) line, evidenced by GAN's
  own "GAN354 M v2" product page (implying a prior v1) and dated to circa 2018 by TheCubicle's
  own retailer "Added" field. Recorded as its own family for the same reason: a real,
  GAN-given, standalone name, not a 356 sub-variant.

This is exactly the kind of family RESEARCH_SPEC warns is easy to miss — no current collection
groups either of these with anything else, and GAN357 in particular does not appear on the live
site at all.

## Three smart lines, not one

GAN's own storefront serves three separately-titled smart-cube collections — "i Series",
"i carry Series", "GAN ui Series" — found directly in the site navigation embedded in an
ordinary product-page fetch. I created three families rather than one "GAN smart cubes" family,
on the same "manufacturer draws its own boundary" reasoning used for Flagship Series. I applied
the identical split on the Monster Go side once I found the same pattern there (a separate
"Monster Go Smart Cube Series" collection, distinct from the mechanical "Monster Go 3x3"
collection).

I did **not** attempt to resolve, at this pass, how "GAN ui Series" (smart cubes built on the
numbered Flagship Series mechanism) relates structurally to `gan-flagship-series` itself beyond
noting the relationship exists — that is exactly what the `smart_version_of` relationship type
is for, at the model/variant level, once both sides of the pairing exist as records.

## Corrections to staged leads

Two things in `research/staging/variants/` turned out not to hold up on independent
verification, which I did not carry forward:

1. The staging files cite `https://www.gancube.cn/en/gancubes-core-technology/` (an `/en/`
   URL). `npm run wayback -- list` on that exact URL returns **no captures at all**. Only the
   Chinese-language URL without `/en/` (`gancube.cn/gancubes-core-technology/`) has an archived
   capture. I fetched and read that Chinese page directly myself and created
   `gancube-cn-core-technology-history` from it, translating the load-bearing sentences myself
   per RESEARCH_SPEC §3.6/3.7 (original retained verbatim in the source's `excerpt`). This
   source turned out to be the single richest piece of evidence in this pass, dating GAN356's
   first IPG core (2015), GAN356 X's adjustable core (2018), GAN356 i as the first smart cube
   (2019), and GAN 11 M Pro's explicit "flagship" self-description (2020) all in one place.
2. `docs/pilot-audit.md` (finding A2) reported the live-browsed text "Meet 2026 Flagship GAN17
   MagDrive" from an unarchived fetch by another agent. I did not cite that observation itself
   (it was never preserved). Instead I independently found and archived GAN17's own product
   page, which carries the equivalent, better first-party statement directly ("GAN17 MagDrive is
   GAN's flagship maglev 3x3 speed cube") — see `gancube-gan17-magdrive-product`.

## Excluded from this family list, and why

Everything below was found during discovery and deliberately excluded, not overlooked:

- **GAN Aliens** (`/collections/gan-aliens-series`) — checked directly; every listed product is
  a Megaminx/Pyraminx/Skewb/Mirror-M shape mod (filter facets: "minx cubes", "shape mods" only,
  no "3x3 cube" facet at all). Out of this archive's 3x3 scope entirely.
- **GAN330 and GAN328 "keychain"** products — GAN's own site files these under "Accessories >
  Cube Accessories", not under any "3x3"/"2x2" cube category, alongside lube, stands, and
  stickers. Read as novelty merchandise, not a speedcube product line; not given a family
  record. (`GAN330 X ShanHeSheJiTu` and `GAN330 Antique Rhyme`, which appear in GAN's own
  "Limited Edition" nav category, are a possible exception worth a second look in pass 3 if a
  source ever states they are full-size, not keychain-scale.)
- **2x2, 4x4, 5x5, Megaminx, Pyraminx, Skewb, Square-1, Mirror M** lines (GAN249/251, GAN460,
  GAN562, GAN Megaminx MagLev, GAN Pyraminx M, GAN Skewb M, GAN Square-1, Swift Block wiSlide) —
  out of this archive's 3x3x3 scope by definition (PRODUCT.md/RESEARCH_SPEC §2). Noted here only
  so a future researcher does not waste time re-discovering that they were seen and excluded on
  purpose.
- **"Infinity Customize" / "GAN Customize" / "356 X Infinity"** — reads as a build-your-own
  customisation programme applied to the GAN356 X line, not a separate family. Left as a lead
  for pass 3/4 (it may be a `variant.edition.designation` or a distinct model rather than a new
  family), not resolved here.
- **The Speedsolving wiki's Air-family edition list** ("Air Grand Master / Air Master / Air
  Advanced / Air S / Air S Master / Air Ultimate / Air UM / Air SM") — these are editions/models
  within `gan-356`, per `docs/pilot-audit.md` finding M6(b), not separate families. Flagged for
  whoever runs pass 3 on GAN356 to enumerate as one unit, per that finding's own recommendation.

## Leads for pass 3 (models), not resolved in this pass

- GAN13 appears in GAN's own Flagship grouping as of August 2025 (gancube.cn) but is absent from
  the equivalent August 2026 grouping (gancube.com) — a discontinued-generation case sitting
  ready-made for the pilot's "discontinued products" requirement.
- "GAN3" (2013, on GAN's own core-technology history page, as the first product to carry the
  all-plastic integrated core) is a product name this pass had not otherwise encountered. Not
  chased further — out of this pass's scope (family enumeration, not model dating) — but worth
  checking against the disputed founding-date discussion already on `data/manufacturers/gan.yml`
  if a future pass revisits that question.
- "Leap" recurs as a GAN-wide tier word (GAN i4 Leap, GAN 251 M Leap, GAN12 M Leap per staging
  leads, GAN V100 Leap) denoting "magnetic, large-angle alignment, but not MagLev" — a
  cross-family naming convention pass 3/4 should recognise consistently rather than treat as a
  series of unrelated product names.
- Swift Block's naming may be shifting away from the "355" numeral (a 2026 product, "Swift Block
  3x3 Super Maglev", was found at a URL and title without it) — noted on `swift-block-3x3.yml`,
  not resolved.
- GAN356 i2/i3 and the exact 2020-2022 emergence of "ui" and "i carry" naming were not dated;
  the earliest web-archive captures found for their product URLs (Nov 2024) reflect only when
  gancube.com's current site structure was first archived at scale, not when the products
  themselves launched — recorded as `introduced: unknown` on the relevant families rather than
  asserting a false precision.

## Sources created this session

All 15 are `kind: manufacturer_official` (tier 1) except `thecubicle-gan-v100-maglev-uv-3x3`
and `thecubicle-gan-354-m` (`kind: retailer`, tier 2). Every one preserved via `archive_url`,
verified by direct fetch on 2026-09-01. No excerpt-only sources were created this pass.

## Validation

`npm run validate`, `npm run schemas`, and `npm run check` were run after writing all records;
see the parent agent's report for the result recorded at the end of this session.
