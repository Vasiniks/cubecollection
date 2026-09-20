# P4-10 — Ziina manufacturer identity — CLOSURE LANE B

## SCOPE
Ledger issue P4-10 ("Seven manufacturers are absent from the 54 entirely"). This lane's mandate
is to CLOSE the research loop on the Ziina/Ziina Star half of P4-10: either confirm a
manufacturer, confirm an OEM/private-label relationship, establish a probable-but-insufficient
finding, or rule the question unresolved and recommend closing it as such. This is a closure
lane, not an open-ended hunt — the project must not stay hostage to an unresolvable manufacturer
identity.

Read first (per task brief): ledger entry P4-10 in full (including the 2026-09-12 and 2026-09-14
addenda and the 2026-09-19 WIPO addendum), `research/qc/p4-10-ziina-lane-a.md` in full, and
`data/sources/wipo-global-brand-database-ziina-2026-09.yml`.

## BASE COMMIT
da8b6eb on main.

## OUT OF SCOPE
Creating any manufacturer/family/model/variant record. Editing the ledger, HANDOFF.md,
scripts/**, or any existing manufacturer/family/model/variant record. Allow-listed: this report
and new `data/sources/*.yml` files only.

## WHAT WAS ALREADY ESTABLISHED BEFORE THIS LANE (not redone here)
- Ziina / Ziina Star sells a genuine BASE speedcube (not just decorated ones), corroborated at
  two independent retailers (TheCubicle, SpeedCubeShop/cubein.cn).
- Retailer "Manufacturer"/"Supplier" vendor fields do not prove manufacturing (tested against
  GAN/Maru/LeFun/MoYu on the same retailer).
- Packaging photography examined at two retailers: no manufacturer mark found; cubein.cn's
  calendar cube ships in a completely unbranded generic box.
- Chinese-language search, 1688, twistypuzzles.com and speedsolving wiki swept — negative or
  blocked.
- WIPO Global Brand Database searched 2026-09-19: 5 "ziina" marks worldwide, none in Nice class
  28 (games/toys/puzzles). China is not among WIPO's 89 offices — a bounded negative.
- CNIPA returns HTTP 200 with correct title but renders an empty document behind JS bot detection
  (attempted again 2026-09-19, same result).
- `ziina.com` is a UAE payments company, positively confirmed as such by its own WIPO trademark
  registrations (classes 9/36/42). NEVER cite it as a manufacturer source.
- A prior search-tool synthesis once asserted "CubeIn is the manufacturer" with no supporting
  page and was explicitly rejected. This lane hit the same failure mode again (see below) and
  applied the same standard.

## AVENUES RUN THIS LANE

### 1. A Chinese name for the brand — NEGATIVE (unchanged)
Re-ran Chinese-language search with new query forms not tried before: the box's own Chinese
product-name text ("星际" / "磁力三阶", "interstellar" / "magnetic 3rd-order", already known from
lane A's packaging photography to be descriptive, not a company name) combined with 阿里巴巴; "Ziina
Star 魔方 厂家" (manufacturer); and the Alibaba model-number prefix "ZNX 魔方 1688 厂家". None
surfaced a native Chinese brand or company name. Also checked non-US specialist retailers not
previously tried: cubezz.com (search returned HTTP 404 for the query path used, and a WebSearch
site-check corroborates cubezz carries no Ziina content), and confirmed store.maru.tw's earlier
negative for Ziina still holds (its brand index does carry VIN Cube — see escalation section —
but not Ziina). No Chinese name found. **Verdict: still unknown, genuinely searched.**

### 2. OEM / private-label evidence — PARTIAL PROGRESS, NEW EVIDENCE CLASS, ATTRIBUTION UNVERIFIED
This is where the lane found something genuinely new. Full detail preserved in
`data/sources/ziina-alibaba-wholesale-listings-2026-09.yml`; summary:

- **New evidence class located**: distinct Alibaba.com wholesale (B2B/export) product-detail
  listings for "Ziina"/"Ziina Star" branded cubes exist and are search-indexed, across four
  regional Alibaba subdomains (www, indonesian, thai, french), sharing a "ZNX" internal
  model-number prefix, with OEM/ODM customization and customer-logo language, place of origin
  stated as Guangdong. This is structurally different from the retail listings already on file:
  Alibaba.com is a wholesale/export marketplace, so a listing there is normally posted by a
  manufacturer or an export trading company, not a downstream retailer. It is the first evidence
  that a commercial actor at the export/wholesale level — not just two Western retail buyers —
  treats "Ziina"/"Ziina Star" as a brand it controls.
- **This does not resolve the admission question.** It is consistent with either (a) a genuine
  Guangdong manufacturer selling its own branded cubes alongside blank/OEM versions of the same
  tooling, or (b) a Chenghai trading company sourcing from an undisclosed factory and applying its
  own label for export while brokering white-label orders on the same tooling. Nothing found this
  pass distinguishes (a) from (b), and that distinction is exactly what P4-10 turns on.
- **A specific attribution was surfaced and is explicitly rejected.** Search-tool summaries
  repeatedly asserted "Ziina Star is supplied by Shantou Chenghai District Paisier Toy Firm"
  (Alibaba storefront `peisier.en.alibaba.com`). Investigated directly: a site-restricted search
  for that exact domain returned **zero** Ziina-related results, and the search tool's own summary
  for that query admitted "the specific Alibaba seller page doesn't exist or is not indexed" — yet
  a later, differently-worded query from the same session re-asserted the same attribution with
  *less* hedging. No single page was ever produced showing both names together; they co-occurred
  only across separate results in the same result set, which is exactly the shape of inference a
  summarizing model can wrongly merge — the same failure mode as the previously-rejected "CubeIn
  is the manufacturer" claim. **This attribution is recorded only to be rejected. It must not be
  cited as fact.**
- **Alibaba is completely inaccessible to direct verification**, confirmed exhaustively this pass:
  curl with desktop and mobile user agents, the WebFetch tool, a third-party read-through proxy
  (r.jina.ai, which returned its own domain-wide 403), and both the main site and three regional
  mirrors all returned Alibaba's anti-bot `punish-component` JS challenge — no usable content, no
  exceptions. This extends the existing "1688.com is inaccessible" finding to alibaba.com's
  international marketplace as well.

### 3. Physical evidence — NO NEW FINDINGS; one avenue newly identified as untried-with-available-tools
Re-read the SpeedSolving thread 94339 in full: no new claim beyond the two already-recorded,
contradictory community claims ("identical to the SCS Pro" vs. "a knockoff of the Meilong 3M made
by a separate company"), neither naming a company or describing new markings. Located but could
not inspect: a YouTube unboxing video ("Ziina Space magnetic 3x3 unboxing") and a TikTok unboxing —
WebFetch returns only YouTube's static page shell, not the description or captions, for a
dynamically-loaded video page, so **video/audio content genuinely could not be inspected by any
tool available this session**. This is recorded as untried-with-available-tools, not as a
negative — it remains the single most concrete "genuinely untried" avenue this report can name.
An eBay search for a dedicated "Ziina" 3x3 listing (which sometimes carries additional seller
photos) returned no listing.

### 4. CNIPA — not re-attempted; deferred to today's own prior result
The 2026-09-19 addendum already at the end of `p4-10-ziina-lane-a.md` ran CNIPA the same day this
lane started and recorded it blocked behind a bot-detection wall rendering an empty document. Per
the task brief's explicit instruction not to spend the lane fighting bot detection, this lane did
not repeat that attempt. One third-party proxy was checked instead (`registrationchina.com`'s
trademark search page) and found to be a marketing page for a paid search service, not a live
queryable database — a dead end, not a result. `gsxt.gov.cn` was not attempted; it needs a company
name to search against, and no company name survived verification this pass.

## ESCALATION MATERIAL — the other six manufacturers named in P4-10
Full detail in `data/sources/p4-10-six-manufacturer-escalation-sweep-2026-09.yml`. No manufacturer,
family, model or variant record was created for any of these. Summary, strongest to weakest
evidenced:

- **VIN Cube / VIN3** — the strongest of the six. Confirmed present in store.maru.tw's brand
  index (`manufacturer_id=58`, brand name "VIN CUBE") with two products, one of them noting it was
  "designed by a former YongJun designer" — a heritage lead worth flagging for future research. At
  least five further independent retailers (TheCubicle, SpeedCubeShop, speedcubing.org, KewbzUK,
  cuboss.com, cubershop.com) carry Nova/Nova Lite/Nova Racer/Nova Flagship SKUs — a materially
  stronger corroboration base than Ziina had before this lane. The ledger's "one line in several
  configurations" reading holds up under this sweep.
- **Cubelelo "Drift"** — needs no new research; already open as C-B1 and independently confirmed
  by two prior methods. Not re-swept.
- **YZ** — two independent retailers (TheCubicle, SpeedCubeShop) carry the "YZ Electroplated
  Metal Alloy 3x3", both describing it as a collector/novelty item, not a competition cube. No
  first-party source or Chinese name found.
- **Smart Cube Labs** — confirmed as a retailer-recognised manufacturer facet on TheCubicle
  (Smart Cubes and Accessories collections). Naming hazard flagged: "Cube Lab", "CubeLab" and
  "Smart Cube Labs" appear as three similarly-named but seemingly distinct retailer facets across
  TheCubicle and SpeedCubeShop — a trap for whoever researches this next.
- **Cube Lab** — one retailer only (TheCubicle "Cube Lab Mini 3x3 (1.0cm)"), not cross-checked
  against a second this pass.
- **ZePuzzles** — weakest fit for eventual manufacturer admission: every product found (1x4x4
  Floppy Cube, Squished 3x3, 1x6x6) is a shape mod or off-format puzzle, one summary describing
  3D-printed PETG construction rather than injection-moulded speedcube manufacturing — a scope
  question (RESEARCH_SPEC 2.4) for whoever adjudicates this, not resolved here.

## EVIDENCE
- `data/sources/ziina-alibaba-wholesale-listings-2026-09.yml` — the new Alibaba wholesale-listing
  evidence class, and the explicit rejection of the unverified supplier attribution.
- `data/sources/ziina-lane-b-closure-sweep-2026-09.yml` — every negative/blocked avenue this lane
  ran (Chinese search, marketplace directories, physical/video evidence, CNIPA deferral).
- `data/sources/p4-10-six-manufacturer-escalation-sweep-2026-09.yml` — escalation material for
  VIN Cube, Drift, YZ, Cube Lab, ZePuzzles, Smart Cube Labs.

## CHANGES
- `research/qc/p4-10-closure-lane-b.md` (this file)
- `data/sources/ziina-alibaba-wholesale-listings-2026-09.yml`
- `data/sources/ziina-lane-b-closure-sweep-2026-09.yml`
- `data/sources/p4-10-six-manufacturer-escalation-sweep-2026-09.yml`

## VERDICT: OUTCOME 4 — UNRESOLVED. ADMISSION NOT JUSTIFIED.
Who manufactures Ziina/Ziina Star remains unestablished. This lane narrowed the question without
closing it: it disproves the hypothesis that "Ziina" exists purely as a Western-retailer-side
label with no upstream commercial reality (the Alibaba wholesale listings rule that out — a real
export-level commercial presence exists), but it cannot name that presence, cannot determine
whether it is a manufacturer or a trading company reselling factory output under its own label,
and cannot connect it to any named existing manufacturer for an OEM/rebrand finding. Every
concrete company-name lead surfaced this pass ("CubeIn is the manufacturer", previously rejected;
"Shantou Chenghai District Paisier/Peisier Toy Firm", rejected this pass) turned out to be
unverifiable search-tool synthesis rather than page content, and this report does not propagate
either.

**Avenues genuinely exhausted** (searched by multiple methods across this lane and its
predecessors, consistently negative or consistently blocked): Chinese-language brand-name search;
1688.com and Alibaba.com direct access (both comprehensively blocked by anti-bot detection across
every technique tried, including proxies and mobile paths); WIPO Global Brand Database (bounded
negative — China not covered); non-US specialist retailer brand indices (store.maru.tw, cubezz.com);
made-in-china.com, globalsources.com, dhgate.com; twistypuzzles.com and the speedsolving wiki;
community forum threads for physical/markings claims.

**Avenues genuinely untried, stated precisely so the next attempt does not repeat this one**:
1. **Video/audio content inspection** of the located Ziina unboxing videos (YouTube, TikTok) —
   this session's tools could not extract dynamically-loaded video descriptions, captions, or
   frame content; a session with actual video-viewing capability (e.g. a browser tool that can
   play and screenshot video, or a transcript-extraction tool) might find a manufacturer mark
   visible in frame that no retailer's own still photography has shown.
2. **CNIPA and gsxt.gov.cn**, if a session with a browser that clears CNIPA's bot-detection
   challenge becomes available — this remains the single most direct way to settle it, since it is
   the one registry that would actually index a China-originated "Ziina" mark, and WIPO's own
   coverage gap is why it has never been checked directly.
3. **1688.com/Alibaba.com access from a different network path or a logged-in session** — every
   method available to an automated research session was exhausted this pass (both platforms are
   now confirmed blocked across every technique tried, not just guessed subdomains), but a human
   researcher with a browser and a real session could plausibly get past the anti-bot wall where
   automation cannot.
4. **Back/bottom panels of the 50+ unphotographed Ziina SKUs** — only two boxes (TheCubicle's
   Space Magnetic front face, cubein.cn's Calendar Cube side panel) have ever been photographed by
   any retailer found; this remains a real, bounded gap rather than an exhausted one.

## CLOSE/DON'T-CLOSE RECOMMENDATION
**Recommend closing the Ziina half of P4-10 as unresolved (outcome 4).** Three independent lanes
now (the two prior sweeps, lane A, and this closure lane) have run every avenue reachable by
automated research and converged on the same result: a real, corroborated brand selling a genuine
base speedcube, with no first-party presence, no China-indexed trademark, no legible packaging
mark, and — as of this lane — a confirmed but unnamed export-level commercial presence on Alibaba
that cannot be resolved to a manufacturer or a trading-company identity. The question is not
unresolved for lack of effort; it is unresolved because the two platforms most likely to answer it
(1688.com and Alibaba.com) are comprehensively and consistently inaccessible to every automated
technique available, and the platform that WOULD answer it definitively (CNIPA) renders nothing to
this session's tools. Continuing to hold P4-10 open for Ziina specifically would keep the project
hostage to a fact that automated research cannot currently reach, which is exactly the situation
this closure lane exists to prevent. The 51 Ziina product lines should remain recorded as P4-9
`missing_manufacturer` candidates — findable, not admitted — pending either a human researcher
with genuine 1688/Alibaba/CNIPA access, or a future session with video-inspection capability.

The other six manufacturers named in P4-10 are NOT part of this recommendation: VIN Cube in
particular now has a stronger evidence base than Ziina ever did and is a reasonable next
Pass-1-style research target; Cubelelo Drift is already independently confirmed and needs no
further research; the remaining four (YZ, Cube Lab, ZePuzzles, Smart Cube Labs) have only light
escalation material recorded and remain open research leads, not closure candidates.
