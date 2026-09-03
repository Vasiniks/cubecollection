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
