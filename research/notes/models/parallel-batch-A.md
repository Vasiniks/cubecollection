# Parallel batch A — Pass 2 family enumeration

Agent A of two parallel Pass 2 researchers. Queue (exclusive, disjoint from Agent B):
giiker, particula, moretry, eastsheen, maru, mefferts, calvins-puzzle, witeden.

Isolated worktree: `wt-a`, branch `pass2-batch-a`. This log is written live, per manufacturer,
as work happens — never batched to the end. Do not confuse with
`research/notes/models/global-pass2-families.md`, which is a different agent's/session's log
and is not touched here.

---

## GiiKER — 2 families

**Groundwork inspected first**, per instructions: `giiker-about-us-2022`,
`giiker-importgenius-address` (pass 1), `giiker-com-supercube-i3s-product-2022`,
`thecubicle-giiker-super-cube-i3s-2019`, `thecubicle-giiker-m3-3x3-2020` (halted prior run).
The last of these already anticipated a `data/families/giiker-m3.yml` in its own
`reliability_note`, written before the family file existed — that reference is now real.

**Question asked: do GiiKER's 3x3 products form genuine named families, or is the output too
product-specific?** Answer: two genuine families, not zero, but the total product range is
thin — this is a real, if narrow, positive finding, not a default "everything gets a family."

**Discovery.** No fresh WebSearch available (budget exhausted per environment warning) — all
discovery ran via `npm run wayback -- prefix` against `giiker.com/products`, `giiker.com/pages`,
`thecubicle.com/products/giiker`, and `speedcubeshop.com/products/giiker`, plus direct
`wayback get` fetches of live-page content.

- `thecubicle.com/products/giiker*` (18 URLs): only 4 distinct products — `giiker-3x3-sticker-set`
  (accessory, not a cube), `giiker-m3-3x3`, `giiker-super-cube-i2-2x2` (2x2, out of scope),
  `giiker-super-cube-i3s`. No other 3x3 line found at this retailer.
- `speedcubeshop.com/products/giiker*`: only `giiker-bluetooth-super-cube-i2-tiled` (2x2, out of
  scope) and `giiker-bluetooth-super-cube-i3s`. Consistent with TheCubicle's picture — no
  additional line.
- `giiker.com/products*` (55 URLs, current site): by 2022-2026 the site has pivoted almost
  entirely to non-cube smart games (Smart Four, Super Blocks, Super Slide, Tic-Tac-Toe Bolt,
  Smart Sudoku, Super Decoder, Super Ludo, Super Reversi). The only surviving cube-shaped
  products are `supercube-electronic-bluetooth-speed-cube-3x3` (i3S, 3x3) and `supercube®-i2`
  (2x2, out of scope). No GiCUBE product page and no separate "i3" (non-S) product page exist in
  the wayback index — `list *gicube*` returns zero captures.
- A 2026-08-19 capture of the i3S product page (fetched live via wayback) shows it still titled
  "SUPERCUBE® i3S" at $39.99 but marked "Sold out," and the site nav by that date has dropped
  the standalone "SUPERCUBE" category present in a 2025-07-17 capture of
  `giiker.com/pages/supercube-user-manual` (nav: "SUPER SLIDE SUPER BLOCKS ... SMART FOUR
  SUPERCUBE"). Read together: the SUPERCUBE name persisted as a distinct, named product/category
  from 2018 through at least mid-2025, and by August 2026 the product page survives but is
  unstocked and no longer in primary nav — a decline, not a confirmed discontinuation (no
  explicit "discontinued" statement found), recorded as such rather than guessed at.

**Families accepted (2):**
1. `giiker-supercube` — the smart/electronic 3x3 line. GiiKER's own about-us timeline
   (tier 1, `giiker-about-us-2022`) states directly: "2018 ... March: SUPERCUBE(R) i3 released -
   The world's 1st smart cube" and "2019 Supercube series presented at CES, New York and
   Nuremberg toy fair." TheCubicle's own i3S product copy (tier 2,
   `thecubicle-giiker-super-cube-i3s-2019`) independently states "The Giiker Super Cube i3S is
   an updated version of the previous Giiker Super Cube" — a manufacturer-external succession
   statement corroborating at least two named generations (i3, i3S) under one persisting name.
   `positioning: smart` (the vocab's own literal category, and GiiKER self-describes as "a
   global leader in developing and manufacturing smart cubes").
2. `giiker-m3` — the mechanical, non-electronic 3x3 sharing the SUPERCUBE shell/tooling.
   TheCubicle's own product copy (tier 2, `thecubicle-giiker-m3-3x3-2020`) states directly: "The
   Giiker M3 3x3 retains the feel and sound of the original Giiker Smart Cube but without the
   internal electronics." This is a real, separately-named, separately-specified product (its
   own weight/dimension spec table, "Added: 2018-10-30"), not a bare mention — kept as its own
   family, not folded into `giiker-supercube`, on the same reasoning the global pass-2 log
   applied to Rubik's Connected vs. the classic line and to GAN's smart lines (i Series/i
   Carry/ui Series kept separate from the mechanical flagship family): **smart/electronic
   capability vs. its absence is treated as always family-relevant in this archive**, not a
   variant-level configuration choice, because GiiKER's own retailer source frames it as a
   deliberate parallel product ("without the internal electronics") rather than an option chosen
   at checkout on the same listing.

**Boundary reasoning — why not one family, why not zero:**
- **Not zero**, because both SUPERCUBE and M3 are named, manufacturer/retailer-attested,
  separately specified products with real evidence behind them — this is not a "retailer
  collection page" or "loose marketing series" case the family definition explicitly warns
  against; SUPERCUBE in particular is corroborated by a tier-1 first-party naming/timeline
  source plus an independent tier-2 succession statement.
- **Not one family**, because M3's own defining feature *is* the absence of the thing that
  defines SUPERCUBE (electronics) — collapsing them would erase the exact distinction the
  archive's smart/mechanical treatment elsewhere (GAN, Rubik's) is built to preserve. Whether
  M3 is, at the *model* level, literally the same mold with the electronics compartment simply
  unpopulated, or a genuinely different internal geometry, is explicitly left as a pass-3
  question — the family-level call here is only that the two lines are named and marketed
  distinctly enough to warrant separate family records, not a claim about tooling.
- **GiCUBE (2014) not made a family.** Only a single ambiguous timeline sentence exists — "2014
  GiCUBE(R) released and birth of the idea of smart cube later on" — which does not even state
  GiCUBE was itself a smart cube (arguably implies the opposite: the smart idea came "later on").
  No product page, no spec, no retailer corroboration found anywhere in this pass. Recorded as
  an open lead in `giiker-supercube.yml`'s own description rather than built into a family or
  silently dropped.
- **GiiKER Super Cube i2 (2x2, tiled variants) excluded** — out of this archive's 3x3x3 scope by
  category, not a boundary call.
- **GiiKER 3x3 Sticker Set excluded** — an accessory, not a cube.

**Unresolved for pass 3:**
- Whether "SUPERCUBE i3" (the pre-i3S generation implied by TheCubicle's own succession
  sentence) ever had its own dedicated product page anywhere — not found this pass; the family
  record notes the gap rather than inventing a generation record from the timeline mention alone.
- Whether GiiKER M3 has any generation beyond the single 2018/2020-era product found.
- Current (2026) production/availability status of SUPERCUBE i3S — last captured "Sold out" with
  no explicit discontinuation statement.

**Sources created this session (GiiKER):** `giiker-com-supercube-i3s-2026-soldout` (new, see
below). Reused without modification: `giiker-about-us-2022`, `giiker-importgenius-address`,
`giiker-com-supercube-i3s-product-2022`, `thecubicle-giiker-super-cube-i3s-2019`,
`thecubicle-giiker-m3-3x3-2020`.

---

## Particula — 1 family

**Task framing.** "Determine whether its smart-cube products form coherent named 3x3 family
lineages. Note a prior run found evidence Particula manufactured the Rubik's smart line — that
relationship already exists; do not restate it as a new finding." Confirmed:
`data/families/rubiks-connected.yml` already exists (created by a different session working
the Rubik's queue) and already cites the Particula manufacturing relationship correctly. Not
touched, not duplicated, not re-attested here.

**Families accepted (1):** `particula-gocube` — Particula's own independently-branded smart 3x3
line, distinct from the Rubik's-branded line it separately manufactures.

**Discovery, and a genuine domain-collision hazard caught before it did damage.** Initial
exploration of `gocube.com` (without "get") looked promising — the domain has Wayback captures
stretching back to 2007 — but fetching actual page content revealed it is, at every capture
examined from 2018 through 2024, an entirely unrelated Quebec moving/storage-container-rental
company also called "Go Cube" (its own 404 page reads "© GoCube 2015"). This is a coincidental
name collision, not a rebrand, predecessor, or shared-ownership situation. **No fact in this
family record is sourced from `gocube.com`.** The correct historical domain, found by checking
`particula-about-us-2024`'s own product-portfolio wording for a matching brand-specific URL
pattern, is `getgocube.com` (used roughly 2019-2022, later folded into the umbrella
`particula-tech.com` storefront visible today). Flagging this prominently in the family
record's own description because it is exactly the kind of trap a future researcher working
faster than this pass did could fall into.

**What `getgocube.com`'s own December 2019 homepage shows, directly (tier 1):** two
concurrently-sold 3x3 SKUs, "GoCube Basic" ($69.95) and "GoCube Edge Full Pack" ($79.95, plus a
"GoCube Edge Fam Pack" bundle). A third model, "GoCube-X," appears at TheCubicle by November
2021, described in the retailer's own copy as "a new, less expensive smart cube from the famous
brand... non-magnetic, but still has all of the tracking of the original GoCube" — a stated
deliberate budget sibling, not an unrelated product. The current (2026) flagship SKU is still
marketed as "GoCube Edge Full Pack" per a live capture of Particula's own site, meaning the
"Edge" name alone has persisted essentially unchanged for at least seven years across every
capture checked.

**Boundary reasoning — one family, not three, and not zero.** All three models (Basic, Edge,
X) share the same manufacturer-first-party name ("GoCube") and functional description (app-
connected, real-time move tracking) across every source found; nothing found treats any of them
as belonging to a different lineage or as an independent product with its own separate identity.
This is the same "persisting shared name across a numbered/tiered range" reasoning used
elsewhere in this project's pass 2 work (e.g. moyu-weilong's persisting "WeiLong" name across
GTS/GTS2/GTS3/WR generations) — a positive family case, not a default. Whether Basic-vs-Edge or
Edge-vs-X represent genuinely different tooling/mechanisms, or configuration differences at the
same design (magnetic vs. non-magnetic, e.g.), is explicitly deferred to pass 3 per DATA_MODEL
§4.2 — this pass only establishes that they are one named family.

**Not created as a separate finding: Rubik's Connected under Particula.** Already exists at
`rubiks-connected.yml`, manufacturer `rubiks`, per the standing instruction. This session's own
new source `particula-tech-com-gocube-2026` incidentally shows Particula's own storefront filing
"Rubik's Connected" under the same "GoCube" shop-navigation category commercially — recorded in
that source's own reliability_note as a merchandising fact only, explicitly not treated as
family-boundary evidence, since `rubiks-connected` is a separately-branded product under a
different manufacturer's brand identity (Rubik's), not a GoCube-branded product.

**GoCube 2x2 excluded** — out of this archive's 3x3x3 scope by category, found alongside every
3x3 model at every retailer/manufacturer source checked.

**Unresolved for pass 3:**
- GoCube's exact original launch year — no source found this pass states it directly; recorded
  at `introduced: before 2019` rather than guessed. A Kickstarter-campaign-page archive or press
  coverage of the original launch, not chased this pass (WebSearch budget exhausted), would
  likely resolve this quickly for a future session.
- Whether "GoCube Basic" and "GoCube-X" are the same design under two names or two separate
  budget-tier designs.
- Full current (2026) GoCube model range beyond what the "All Cubes" nav bare listing shows
  (Edge Full Pack, 2x2, Bundle Pack) — not enumerated further since model/variant enumeration is
  out of this pass's scope.

**Sources created this session (Particula):** `getgocube-com-2019-basic-edge-skus`,
`getgocube-com-about-2019`, `thecubicle-gocube-edge-3x3-2020`, `thecubicle-gocube-x-3x3-2022`,
`particula-tech-com-gocube-2026`. Reused without modification: `particula-about-us-2024`,
`tech-eu-particula-series-a-2021` (both already existed on the manufacturer record; not
re-attested at the family level beyond a cross-reference).

---

## MoreTry — 1 family

**Task framing.** "Recovered from a TheCubicle `/products/` prefix sweep; its footprint may be
thin. Do not manufacture families simply because the manufacturer exists." Inspected the
existing `thecubicle-moretry-live-2026` source first, per the standing groundwork-inspection
practice — it already named "MoreTry Tianma X3 (V1 through V4)" and "MoreTry TianMa X3+"
directly, which was enough of a lead to justify a dedicated `thecubicle.com/products/moretry*`
prefix sweep rather than assuming thinness.

**Finding: the footprint is not thin at all — it is unusually rich and completely
single-line.** A `thecubicle.com/products/moretry*` sweep (26 URLs, 19 distinct 3x3 product
slugs after de-duplicating query-string variants) and a parallel `speedcubeshop.com` sweep both
show **every single MoreTry 3x3 product carrying the "Tianma X3" name**, in a real, described,
manufacturer-numbered generation sequence (V1 Standard -> V3 Snap -> V4 MagLev, plus V2
Enhanced, V3 Plus, a "+" suffix range, and a "ZCube Edition" collaboration also tied to the
SAOCube naming lead that originally surfaced MoreTry in pass 1). This is the strongest,
best-corroborated single-family case in this agent's queue so far — direct product-copy
evidence of an actual mechanism change between named versions (V1's plain corner/edge
magnetization vs. V4's "magnetic levitation system... 6 magnetic rings instead of 2," replacing
the spring outright), not merely a retailer's own version numbering.

**Families accepted (1):** `moretry-tianma-x3`.

**Boundary reasoning — one family, not several, and not zero.** Zero was never seriously in
play once the prefix sweep ran: 24 of MoreTry's 27 total TheCubicle SKUs are 3x3s and every one
of them is a "Tianma X3" variant of some kind (the remaining 3 are own-branded lubricants, out
of category). The only real boundary question was whether "V1," "V3/V3 Plus," "V4/MagLev," and
the "+" range should be split into separate families or models — resolved by treating them as
one family per the persisting shared name (the same reasoning moyu-weilong and particula-gocube
in this session use), with the actual model-vs-variant boundary between versions explicitly
left to pass 3, since a mechanism-level change (the V4 MagLev spring replacement) is exactly the
kind of fact §4.2 says should decide a model split, not a family split.

**A data-quality catch worth flagging for pass 3/5.** Every MoreTry product page checked (V1,
V3, V4) carries the identical retailer "Added: 2022-03-14" date regardless of version or actual
capture date — almost certainly a shared brand-onboarding-date templating artifact at
TheCubicle, not each version's real release date. Recorded honestly in each source's own
reliability_note and reflected in the family's `introduced` attestation (`uncertain` despite
three agreeing sources, precisely because the agreement is not independent).

**A fetch-reliability note.** One attempt to retrieve the "V2 (Enhanced)" product page returned
content that read as belonging to a different version (V4's own description text appeared under
the V2 URL on one `wayback get` call without an explicit timestamp) — not used as evidence
anywhere; treated as an unreliable capture rather than cited. Timestamped re-fetches of the same
URL then failed outright ("fetch failed") on three consecutive retries. Per this project's own
wayback-tooling guidance, a failed fetch is not treated as evidence of absence — V2's own
description is simply left unestablished this pass, not guessed at from the (probably
mismatched) content that did load.

**An unconfirmed domain lead, deliberately not chased into a source.** `moretry.com` has
Wayback captures from 2011-2012 and again 2021 — not verified this pass as actually belonging
to this cube manufacturer (the same kind of coincidental-name-collision risk already caught and
ruled out for `gocube.com` earlier in this session). Flagged in the family record's own
description as an open lead, nothing built on it.

**Unresolved for pass 3:**
- Exact release dates for each numbered version (all currently only bounded by the shared,
  unreliable "2022-03-14" retailer date).
- V2 (Enhanced)'s own mechanism description — not reliably retrieved this pass.
- The relationship between the numbered V1-V4 range and the unnumbered "TianMa X3+" /
  track-count-named range (successor tier? parallel budget/premium split? pass 3 question).
- Whether `moretry.com` is genuinely this manufacturer's own domain.

**Sources created this session (MoreTry):** `thecubicle-moretry-tianma-x3-v1-2023`,
`thecubicle-moretry-tianma-x3-v3-snap-2022`, `thecubicle-moretry-tianma-x3-v4-maglev-2022`.
Reused without modification: `thecubicle-moretry-live-2026` (pass 1).

---

## Eastsheen — 1 family (a genuine judgement call, documented in full)

**Groundwork inspected first.** Pass 1's `data/manufacturers/eastsheen.yml` already flags this
manufacturer as a deliberate "bracket case" and had already found and resolved a direct
contradiction: the Speedsolving wiki's own dedicated Eastsheen page states "East Sheen does not
produce 3x3 cubes," while TheCubicle's own structured product listing for an "Eastsheen 3x3x3
Cube with Wall Stickers" (spanning captures 2021-2025) names "Eastsheen" as the manufacturer of
record. Pass 1 preferred the direct retailer evidence; this pass applies that same resolution
at the family level rather than re-litigating it, per the instruction to preserve prior review
flags rather than silently re-deciding them.

**Discovery to check whether the footprint is wider than one SKU.** A
`thecubicle.com/products/eastsheen*` prefix sweep found exactly one 3x3 SKU across the entire
retailer (the same Wall Stickers listing already sourced) plus five 2x2/4x4/5x5 SKUs, all out
of this archive's 3x3x3 scope. A `speedcubeshop.com/products/eastsheen*` sweep found **zero**
3x3 products at all — only 2x2 (mini/keychain, Super), Super 4x4, and Super 5x5 — independently
consistent with the wiki's "does not produce 3x3 cubes" framing rather than contradicting it
further. Re-fetching the wiki page live (WebFetch, no archive.org capture available/used)
confirmed its full product list: 2x2 (Types A/C/E/M), 4x4 and 5x5 (Types A/C/E/M/P), and
keychain mini/multi cubes — no 3x3 anywhere on the page, and no release dates given for
anything.

**Family accepted (1):** `eastsheen-3x3` — the base "standard Eastsheen 3x3" implied directly
by TheCubicle's own product copy ("The Eastsheen 3x3x3 Cube with Wall Stickers is a standard
Eastsheen 3x3 with stickers applied..."), read as the underlying product name, with "Wall
Stickers" left as a pass-4 sticker-variant lead rather than folded into the family name or
split into its own model.

**Boundary reasoning — why one thin family, not zero.** This was the closest call in this
agent's queue so far. Arguments for zero (matching the LanLan precedent): only one retailer
carries it, no second source corroborates it, and a dedicated community wiki page directly and
specifically denies this manufacturer makes 3x3s at all. Arguments for one (which won): unlike
LanLan's Void Cube (a bare undescribed name with no spec table) or ShengShou's rejected Gem/Tank
(a single dismissive sentence), this product has a full structured spec table (weight,
dimensions, a specific retailer-attested manufacturer field), a substantive descriptive
sentence naming an implied base product, and four-plus years of continuous retail listing
(2021-2025) at a major English-language retailer — a genuinely different evidentiary shape from
every case rejected elsewhere in this project's pass 2 work on thinness grounds. The deciding
factor was durability of the retail listing plus real specification data, not name-recognition
or manufacturer prominence.

**Recorded, not resolved: the wiki/retailer contradiction stays live.** The family record's own
`/description` attestation is deliberately set to `reported` rather than `probable`, and its
prose states the contradiction explicitly rather than picking a side quietly. A future pass with
capacity to find an Eastsheen first-party source (the company's own domain has been a parked
page since at least 2011, per pass 1) or a second independent retailer could settle this either
way.

**No new sources created this manufacturer** — both facts needed (the wiki's product list and
the retailer's product copy) were already sourced in pass 1; this pass only re-verified them
(the wiki live, the retailer sweep for corroboration) and applied the family-level boundary call.

---

## Cross-agent correction: TheCubicle "Added:" dates are not reliable per-product evidence

Agent B (working a disjoint queue) flagged that the literal string `Added: 2018-09-11` recurs
verbatim across unrelated products from several different brands on TheCubicle — a
catalogue-migration/onboarding artifact, not a real per-product date — and warned that any
repeated "Added:" date should be treated the same way. Acting on this before continuing:

- **`data/families/giiker-m3.yml` corrected.** Its `/introduced` attestation originally relied
  on TheCubicle's in-page `Added: 2018-10-30` for the GiiKER M3 product. Checked and confirmed:
  that exact string also appears verbatim on the unrelated, later-generation GiiKER Super Cube
  i3S page (thecubicle-giiker-super-cube-i3s-2019) — the same artifact pattern. Corrected to use
  the source's genuine external Wayback crawl timestamp (2020-09-20) as an honest upper bound
  instead, downgraded from `reported` to `uncertain`, and the correction is documented directly
  in the record's own attestation note (not silently fixed).
- **MoreTry's shared `Added: 2022-03-14`** had already been independently caught and correctly
  handled (recorded at `uncertain` specifically because the date recurred identically across
  three different version pages) before this cross-agent note arrived — no change needed there,
  confirmed consistent with the same finding.
- **A related provenance slip caught and fixed while auditing this:** the source
  `thecubicle-moretry-tianma-x3-v3-snap-2022` had recorded an `archive_url` timestamp
  (2022-07-06) that did not match the capture its own quoted excerpt actually came from
  (confirmed via the tool's own snapshot-comment output to be 2025-07-10, since the
  no-timestamp `get` call resolved to the latest capture, not the nearby 2022 one visible in the
  CDX prefix listing). Fixed the `archive_url` to point at the exact 2025-07-10 snapshot and
  added a correction note; the source id keeps its original '-2022' suffix per this project's
  immutable-id policy, flagged explicitly so the mismatch isn't silently carried forward. Two
  further sources (`thecubicle-moretry-tianma-x3-v1-2023`,
  `thecubicle-moretry-tianma-x3-v4-maglev-2022`) had `archive_url` timestamps accurate to the
  day but not the exact captured minute — tightened to the exact snapshot timestamp for
  precision, no content or date claims changed.
- **Going forward (Maru onward in this queue):** no TheCubicle "Added:" field is treated as
  dating evidence at all unless independently cross-checked against unrelated products and
  found not to repeat. Wayback's own external crawl timestamps (the `snapshot:` line the
  `wayback get` tool itself reports) are used instead wherever a bound is needed, and are
  clearly distinguished in every new source's reliability_note as crawl-time evidence, not
  claimed release dates.
- **Zero-family and sub-brand-flagging precedents from Agent B, noted for consistency, not
  acted on outside my own queue:** B returned zero families for Z-Cube because its 3x3 catalogue
  turned out to belong under the original manufacturer's tree (DATA_MODEL §4.3/4.4), and B found
  stronger sub-brand evidence for two entities but deliberately made no manufacturer-record edit,
  flagging for human review instead. Both are the same discipline already being applied in this
  log's own decisions (e.g. Eastsheen's contradiction recorded rather than resolved, GoCube
  never merged into Rubik's Connected). No manufacturer-record edits made outside my own queue.

---
