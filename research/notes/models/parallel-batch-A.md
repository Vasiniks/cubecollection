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

## Maru — 4 families

**Groundwork inspected first.** Pass 1's `data/manufacturers/maru.yml` had already found and
sourced Maru's original ~2011-era "Maru 3x3," explicitly flagged as pre-dating this archive's
2016 start, and explicitly left open whether Maru had any later, in-window product (a 2020
domain capture with a cube-branded title suggested the company/site persisted, but "no specific
later product was located this pass").

**This pass closes that gap, and it opens up considerably.** A `thecubicle.com/products/maru*`
CDX prefix sweep (67 URLs) found not one but **two entirely separate, previously-undocumented
named Maru 3x3 lines** — "CX3" and "VX-3" — plus a documented "smallest mass-produced 3x3 in the
world" novelty product ("Nano Cube," 15mm) and a wide range of Maru-branded accessories, lube,
and, notably, **aftermarket magnetic core DIY kits for other manufacturers' cubes** (RS3M 2020,
TengYun V1, Tornado V2/V3, WeiLong WR M 2021, YuLong V2) — Maru operates partly as an
aftermarket-parts service for other brands' flagship cubes, a fact worth flagging for a future
pass even though it does not itself produce a new 3x3 family (Maru's *own* cubes are the only
thing in scope for this pass; the DIY core kits modify other manufacturers' variants and belong,
if anywhere, under those manufacturers' own `modified_from`/`service` treatment per DATA_MODEL
§4.3 — not investigated further here, flagged as a lead only).

**Families accepted (4):** `maru-3x3` (the original ~2011 product, already sourced in pass 1,
carried forward with a documented "Special Patterns" sticker-variant lead added this pass),
`maru-cx3` (a design-credited flagship-tier 3x3, "inspired by our friend Cyoubx, who is a
speedcuber himself," existing by at least 2019-2020), `maru-vx-3` (a plain, budget-positioned
3x3, "no frills or fancy features," existing by at least 2022, with magnetic Core M/Core M
MagLev variants left as pass-4 leads), and `maru-nano` (a 15mm novelty DIY-kit cube carrying a
specific "smallest mass-produced 3x3 cube in the world" claim).

**Boundary reasoning — why four separate families, not one evolving lineage.** The temptation
here was to read "3x3 -> CX3 -> VX-3" as one persisting Maru flagship succession the way
moyu-weilong's persisting name was read earlier in this project. Resisted deliberately: no
source anywhere this pass — not TheCubicle's own copy for any of the three, not the (thin)
Speedsolving wiki page — states or implies a succession between them. They are three
completely differently-named products from the same manufacturer with no stated lineage
relationship, which per this project's own standing practice (QiYi Bullfight/Thunderclap, YJ
SuLong/ChiLong/YuLong) is recorded as separate families, not merged into an invented
continuity just because they share a manufacturer and a broad category.

**A genuine judgement call on the Nano Cube.** Given the standing warning against "manufacturing
families simply because the manufacturer exists," the Nano Cube's inclusion (and the parallel
exclusion of the "Mini 3x3 30mm" and "Mini 3x3 Keychain Cube" found in the same sweep) turned on
one thing: the Nano Cube carries a specific, falsifiable, documented significance claim ("the
smallest mass-produced 3x3 cube in the world") matching RESEARCH_SPEC §2.2's own "documented
production first" language for conditional admission, where the Mini 3x3 carries only a
comparative-but-unremarkable "almost twice as small as most conventional 3x3 cubes." This is
the same kind of line DianSheng's Stickerless 3x3 (kept, for a named media appearance) and
ShengShou's Gem/Tank (rejected, for a bare dismissive sentence) drew elsewhere in this project —
applied here to a different kind of evidence (a specific claim vs. a media appearance) but the
same underlying test: is there something concrete and specific here, or just a name.

**Dating discipline applied throughout, per the cross-agent correction above.** No family in
this manufacturer uses any TheCubicle in-page "Added:" field as evidence. Every `introduced`
value here is a `qualifier: before` bound derived from genuine external Wayback crawl
timestamps found in this pass's own CDX prefix sweep, and every attestation says so explicitly.

**Unresolved for pass 3:**
- Whether Maru's aftermarket magnetic-core DIY kits for RS3M/TengYun/Tornado/WeiLong WR
  M/YuLong belong anywhere in this archive as `service`/`modified_from` records under those
  *other* manufacturers, and whether Maru itself should also carry `kind: service` alongside
  `kind: manufacturer` on its own record (a manufacturer-record change, not made this pass —
  flagged only).
- VX-3's Core M and Core M MagLev variants' own descriptions (not independently retrieved).
- Whether the Mini 3x3 (30mm) and Mini 3x3 Keychain Cube warrant their own family records in a
  future pass with more time/evidence.
- Exact release years for CX3, VX-3, and Nano — all currently only bounded by Wayback crawl
  timestamps, not stated dates.

**Sources created this session (Maru):** `thecubicle-maru-3x3-special-patterns`,
`thecubicle-maru-cx3`, `thecubicle-maru-vx-3`, `thecubicle-maru-nano-3x3`. Reused without
modification: `thecubicle-maru-3x3`, `speedsolving-wiki-maru` (both pass 1).

---

## Meffert's — 1 family

**Groundwork inspected first.** Pass 1's `data/manufacturers/mefferts.yml` had already run a
49-slug `thecubicle-*` sweep and found the company "overwhelmingly a shape-mod specialist"
(Pyraminx, Skewb, Gear Cube, Ghost Cube, Fisher Cube, Megaminx, Mastermorphix and similar), with
exactly two slugs suggesting non-standard 3x3 variants and no standard WCA-legal 3x3 flagship at
all — the pass-1 `scope_class` decision for either was explicitly deferred here.

**Discovery.** Re-ran the same `thecubicle.com/products/mefferts*` prefix sweep (49 unique
slugs) to check for anything missed and found a third relevant slug beyond pass 1's two:
"Meffert's 3x3 Egg" (a metallized egg-shaped shape mod). Fetched all three product pages
directly.

**Families accepted (1):** `mefferts-kokonotsu` — the "Kokonotsu Pillow 3x3," described in
TheCubicle's own copy as "a non-traditional 3x3 puzzle variant that uses solid-colored blocks as
colors instead of stickers. There are 9 colors in total, and the blocks must be arranged such
that each color only appears once on each side" — a genuinely distinctive puzzle mechanism, not
a bare name.

**Rejected/deferred (2), for a consistent, stated reason:**
- **Hollow Cube 3x3** — described only as "a puzzle with hollow pieces! Turning is very clicky
  due to the ball bearing alignment system. A fun novelty puzzle for any collector." Real but
  generic; no distinguishing mechanism claim beyond "hollow," no significance statement.
- **3x3 Egg** — described only as "a metallized egg puzzle that is a shape modification of a
  3x3... a high quality, metallized finish with the Meffert's logo." Purely a decorative
  shape/finish variant with no further distinguishing detail.

Both are thinner than Kokonotsu on the exact same axis this pass has applied consistently
elsewhere (Maru's Mini/Keychain vs. Nano Cube; ShengShou's rejected Gem/Tank vs. its accepted
thin-but-real families): a bare descriptive name and a generic one-sentence description is not
enough on its own, but a specific, distinctive, well-described mechanism or claim is. Recorded
here rather than built into thin family records that would read as manufactured coverage.

**A significant unresolved lead surfaced by customer reviews, deliberately not acted on: a
possible "Molecube" rebrand/resemblance.** Two independent customer reviews on the Kokonotsu
listing state, unprompted, that the puzzle "is the same as the molecube puzzle that is sold in
many physical stores." This raises a real DATA_MODEL §4.4 `rebrand_of` question — but per that
same rule, "visual resemblance alone is a lead, not a claim," and unattributed customer-review
testimony is weaker evidence than even that. No relationship recorded; the family stays under
`mefferts` per the retailer's own structured attribution, and the lead is flagged explicitly in
both the source's reliability_note and the family record's own description so a future pass can
chase "Molecube" toward a citable source rather than this identity being silently assumed
settled. This is the same discipline Agent B's own Z-Cube finding illustrates from the other
side (a brand's catalogue turning out to belong to a different manufacturer's tree) — here the
evidence is far too weak to make that call, so it is recorded as a question, not an answer.

**Dating discipline applied, per the cross-agent correction above.** No TheCubicle in-page
"Added:" field used as evidence; `introduced` is a `qualifier: before` bound from the genuine
Wayback crawl timestamp only.

**Unresolved for pass 3:**
- The Molecube resemblance lead.
- Kokonotsu's `scope_class: conditional` justification and admission (almost certainly
  non-WCA-legal given the described 9-colour constraint).
- Whether Hollow Cube 3x3 or 3x3 Egg deserve reconsideration in a future pass with more time or
  better sourcing.

**Sources created this session (Meffert's):** `thecubicle-mefferts-kokonotsu-pillow-3x3`.
Reused without modification: `mefferts-official-site-2024` (pass 1, cited only via the
manufacturer record, not directly on this family).

---

## Calvin's Puzzle — 3 families

**Groundwork inspected first.** Pass 1's `data/manufacturers/calvins-puzzle.yml` already
characterised this brand as "primarily a designer/maker of non-WCA shape mods, cuboids, and
novelty twisty puzzles rather than mainstream WCA-legal 3x3 speedcubes," explicitly deferring
`scope_class` decisions to pass 2/4.

**Discovery.** A `thecubicle.com/products/calvins*` CDX prefix sweep returned roughly 90
distinct product slugs — overwhelmingly cuboids (3x3x4, 3x3x5 in a dozen-plus named
sub-variants), 4x4-based "House Cube"/"Glassy House Cube" shape mods, Megaminx/Square-1/Skewb
variants, and slide puzzles, confirming pass 1's characterisation. Of everything with a 3x3x3
mechanism or shape, five candidates stood out on their own described mechanism: "Full-Function
Crazy 3x3 (Center-Locking)," "Bandaged 3x3 (Maze-300 Cube)," "Crazy Mirror 3x3x3" (4- and
6-Circle configurations), "Horror Mirror 3x3 Cube," and "Mirror Camouflage 3x3x3." Fetched and
read all five product pages directly.

**Families accepted (3):** `calvins-crazy-3x3` (locked, non-turning center circles — "It can
still be fully scrambled and offers quite the challenge if you're never solved a Crazy puzzle
before"), `calvins-crazy-mirror-3x3` (the same "Crazy" mechanism concept combined with a
mirror-cube shape, circles independently rotating — 4-Circle and 6-Circle configurations kept
as one family/model per DATA_MODEL §4.2, not split), `calvins-bandaged-3x3-maze-300` (a
"standard 3x3 with 3D printed tiles attached to the pieces" restricting movement).

**Rejected (2), for two different, specific reasons:**
- **Mirror Camouflage 3x3x3** — its own retailer description states directly "Calvin's Mirror
  Camouflage 3x3x3 is a **4x4** with 3D printed pieces attached to the outside to make it
  resemble a standard 3x3 mirror cube." Despite the "3x3x3" in its own product name, this is
  actually a 4x4x4 mechanism — out of this archive's 3x3x3 scope by category, not a boundary
  judgement call. A genuinely useful catch: a product's own name is not reliable evidence of
  its actual mechanism size, and this pass read the full description rather than trusting the
  slug.
- **Horror Mirror 3x3 Cube** — described only as "a standard mirror 3x3, but included in the
  package is a set of two solution stickers. Once applied, you can solve it by shape or by
  color!" This is a real, distinct accessory-bundle idea, but the base object itself is "a
  standard mirror 3x3" (a generic, widely-produced puzzle category, not a Calvin's-specific
  mechanism the way the other three are), and the distinguishing feature (bundled solution
  stickers) reads as a packaging/accessory difference rather than a design difference. Recorded
  as an open lead rather than built into a family, on the same "generic name plus one
  incremental detail" reasoning that excluded Meffert's Hollow Cube 3x3 and 3x3 Egg earlier in
  this queue.

**Boundary reasoning — three separate families, not fewer.** `calvins-crazy-3x3` and
`calvins-crazy-mirror-3x3` share the word "Crazy" and a locked/independently-rotating-circle
concept, but are described as genuinely different objects — one a standard-shape cube with
non-turning centers, the other a mirror-shape cube with independently *rotating* circles glued
on via 3D-printed extensions. Kept separate rather than merged under one "Crazy" family, per
this project's standing "a shared word is not shared design" discipline (QiYi Bullfight/
Thunderclap, YJ SuLong/ChiLong/YuLong).

**A modification/service question flagged, not resolved, on the Bandaged 3x3.** Its own
description ("a standard 3x3 with 3D printed tiles attached to the pieces") reads closer to a
base cube plus an added modification than a from-scratch design — explicitly flagged in the
family record's own description for a future pass to weigh under DATA_MODEL §4.3's
`modified_from`/`service` framing, rather than silently treated as an independent Calvin's
design. Not acted on this pass since the base cube's own manufacturer is not stated by the
source available.

**Dating discipline applied, per the cross-agent correction above.** No TheCubicle in-page
"Added:" field used as evidence anywhere in this manufacturer; every `introduced` is a
`qualifier: before` bound from genuine Wayback crawl timestamps only.

**Unresolved for pass 3:**
- The Bandaged 3x3's possible service/modification framing.
- `scope_class: conditional` justification and admission for all three families (all are
  certainly non-WCA-legal mechanisms).
- Whether Horror Mirror 3x3 warrants reconsideration with more time/evidence.
- Calvin's Puzzle's own country/founding remain unknown, unchanged from pass 1 — not
  re-investigated this pass since it was outside this pass's scope.

**Sources created this session (Calvin's Puzzle):** `thecubicle-calvins-full-function-crazy-3x3`,
`thecubicle-calvins-bandaged-3x3-maze-300`, `thecubicle-calvins-crazy-mirror-3x3x3`. No pre-
existing product-level sources existed to reuse beyond the manufacturer-register sources already
on `data/manufacturers/calvins-puzzle.yml`.

---

## WitEden — 3 families (final manufacturer in this agent's queue)

**Groundwork inspected first.** Pass 1's `data/manufacturers/witeden.yml` already characterised
WitEden per the Speedsolving wiki as having "since 2010... focused on unusual designs such as
Crazy cubes, Super cubes, cuboids etc.," noted its historically significant pre-2016 "GuoBing
(Type C)" 3x3 (2006-2011, popular circa 2007-2011, not re-confirmed as still sold in-window),
and explicitly deferred any in-window 3x3 finding to pass 2.

**Discovery.** A `thecubicle.com/products/witeden*` CDX prefix sweep (~65 slugs) confirmed the
catalogue is overwhelmingly cuboids (2x2x4 through 3x3x17) — out of 3x3x3 scope by shape — plus
a genuine cluster of 3x3x3-shaped novelty mechanisms matching the wiki's own "Crazy cubes,
Super cubes" language directly: a "3x3x3 Mixup" line (four named variants: Plus, Edge-Split,
30-Degree Turn, and one credited to "Oskar," read as Oskar van Deventer though not
independently verified), a "Super 3x3x3," and a "Camouflage 3x3x3." Fetched and read all of
these plus two more (AI Bandaged Cube, Rainbow Cube) that turned out, on reading the full
description, not to be 3x3x3-shaped at all.

**Families accepted (3):** `witeden-mixup-3x3` (bundling the four "3x3x3 Mixup" variants under
one persisting name — see below for why bundled, not split), `witeden-super-3x3x3` (a
"Super cube" mechanism, positioning attested at `probable` rather than `uncertain` because the
wiki independently and specifically names "Super cubes" as one of WitEden's own documented
post-2010 specialties, not just this pass's own inference from a product name), and
`witeden-camouflage-3x3` (a disguised-mechanism 3x3x3).

**Rejected (2), both a shape/category check, not a boundary judgement:**
- **AI Bandaged Cube** — its own description states "It resembles a mix between a 4x4 and a
  2x2," not a 3x3x3.
- **Rainbow Cube** — "The tetradecahedral shape is quite unique," a non-cubic shape entirely.

**A naming trap explicitly caught and cross-referenced.** Earlier this queue, Calvin's Puzzle's
"Mirror Camouflage 3x3x3" turned out, on reading its full description, to actually be a
disguised 4x4x4. WitEden's similarly-named "Camouflage 3x3x3" was checked against exactly this
risk before being accepted — its own description ("a 3x3x3 cube with a thin middle layer...
camouflaged... an irregular center of rotation") confirms a genuine 3x3x3 mechanism. Both the
family record and its source note this check explicitly, as a reusable lesson: **a product's own
name, including a stated cube size, is not reliable evidence of its actual mechanism** — this
pass read every full description rather than filtering by slug/title alone, and it mattered
twice in one queue.

**Boundary reasoning — the Mixup line bundled as one family, unlike this queue's other
"same word, different design" splits.** Unlike Calvin's `calvins-crazy-3x3` vs.
`calvins-crazy-mirror-3x3` (kept separate: same "Crazy" word, genuinely different mechanisms),
all four WitEden "3x3x3 Mixup" variants are explicitly the same base Mixup-type turning concept
with one added mechanical wrinkle each (edge-splitting, a 30-degree unlock, a named designer's
variation) — read as model/variant-level distinctions per DATA_MODEL §4.2, not separate designs,
and bundled into one family accordingly. This is the first case in this agent's entire queue
where a "same name, several variants" pattern was bundled rather than split, and the write-up
explains why the test came out differently here than at Calvin's.

**Dating discipline applied, per the cross-agent correction above.** No TheCubicle in-page
"Added:" field used as evidence anywhere in this manufacturer; every `introduced` is a
`qualifier: before` bound from genuine Wayback crawl timestamps only.

**Unresolved for pass 3:**
- Whether the historically significant pre-2016 "GuoBing (Type C)" 3x3 (2006-2011) was ever
  resold within the archive window, or should be recorded as `scope_class: reference_only`
  identity only per RESEARCH_SPEC §2.4 (not created as a family this pass — no in-window
  evidence found, and pass 1 already flagged this exact gap without closing it).
- `scope_class: conditional` justification and admission for all three families (all certainly
  non-WCA-legal).
- Independent verification of the "Oskar" (van Deventer) design credit on the Mixup variant.
- Model/variant-level split decisions within `witeden-mixup-3x3`.

**Sources created this session (WitEden):** `thecubicle-witeden-mixup-3x3-variants`,
`thecubicle-witeden-super-3x3x3`, `thecubicle-witeden-camouflage-3x3x3`. Reused without
modification: `thecubicle-witeden-mixup-plus`, `speedsolving-wiki-witeden` (both pass 1).

---

## Queue complete

All eight manufacturers in this agent's assigned queue (giiker, particula, moretry, eastsheen,
maru, mefferts, calvins-puzzle, witeden) are now researched, sourced, logged, and committed.
Final tally: 2 + 1 + 1 + 1 + 4 + 1 + 3 + 3 = **16 families** across 8 manufacturers, plus one
cross-agent-triggered correction commit. See the manufacturer report at the end of this
session's final response for the one-line-per-manufacturer summary with commit SHAs.
