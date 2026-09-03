# Pass 2 disputed entity-identity research memo

Research-only audit, no `data/` writes. Prepared for the Pass 2 adjudication gate. Six
disputed entity-identity questions, each investigated against primary/first-party sources
where reachable. Status: COMPLETE.

## Summary table

| # | Question | Recommended interpretation | Confidence |
|---|---|---|---|
| 1 | Valk | QiYi (parallel to, not nested under, X-Man Design) — but the only counter-evidence to this reading is itself discredited (see cross-cutting finding below); genuine 2020-2026 evidentiary gap | Medium |
| 2 | MS/MsCube | DianSheng product line, not an independent manufacturer | Medium-High |
| 3 | Eastsheen 3x3 | Preserve the contradiction; new isolation-pattern evidence leans mildly toward caution but does not resolve it | Unresolved |
| 4 | Meffert's Kokonotsu / "Molecube" | No citable "Molecube" entity found anywhere; no relationship recommended | Unresolved |
| 5 | Maru | Remains `kind: manufacturer` (own cube families justify it); the DIY magnetic-core-kit business is real but does not fit DATA_MODEL's `service`/`modified_from` shape — schema gap, not a workaround | High (facts) / Unresolved (ontology) |
| 6a | Z-Cube | Hybrid, time-varying: a real thin own-line circa 2015-16, a much larger decorator/rebrand catalogue from ~2019 on | Medium |
| 6b | CubeStyle | Plain "CubeStyle 3x3" = genuine brand-of-record product; "Carbon Fiber"/"Hollow Sticker" 3x3s = QiYi Warrior W / YJ GuanLong decorator products, already correctly excluded from the CubeStyle family | High |

**Cross-cutting finding (surfaced while researching Q1, affects records beyond this memo's six
questions):** `data/sources/theqiyi-about-us.yml`, currently treated as a Tier 1 manufacturer
source backing several `confirmed` attestations on `data/manufacturers/qiyi.yml` and
`data/manufacturers/x-man-design.yml`, is sourced from `theqiyi.com` — a domain registered
2025-10-10 (over a year after most of this archive's research), hotlinking Amazon product
photography, carrying "Buy on Amazon" links, showing incoherent prices, and reading as
AI-generated marketing prose. This is very unlikely to be QiYi's own site. See Q1 for full
detail. **I did not edit the affected records — out of my write lane — but this needs review
before Pass 3 treats any of those fields as settled.**

---

## 1. Valk — QiYi or X-Man Design?

**Current archive state.** `data/families/qiyi-valk.yml` sets `manufacturer_id: qiyi`,
`/manufacturer_id` confidence `uncertain`. The record's own reasoning: the Speedsolving wiki
lists "X-Man Design" and "TheValk" as parallel entries under QiYi's "Sub-Brands" heading; a
2018 QiYi storefront (`qiyicube-storefront-2018`) page-titles "The Valk, MoFangGe, X-Man
Design" as three separate names. Counter-evidence recorded: QiYi's "current (2026)" about-us
page (`theqiyi-about-us`) names X-Man Design as a sub brand but never mentions Valk.

**CRITICAL PRIMARY-SOURCE FINDING, cross-cutting beyond Q1: `theqiyi-about-us` is not a
credible manufacturer source.** I fetched `https://theqiyi.com/` and `/about-us.html` and
`/contact-us.html` directly (raw HTML, not just the AI-summarized WebFetch pass) and checked
the domain's registration:

- `theqiyi.com` was registered **2025-10-10** via Unstoppable Domains Inc. (`whois theqiyi.com`,
  checked 2026-09-03) — fourteen months before this research, and long after QiYi's claimed
  1998/2008 founding. No manufacturer that has operated for two decades has its "official
  site" appear for the first time in the Wayback index as a single live-capture snapshot from
  2026-09-02 with **zero prior captures at any date** (`node scripts/wayback.mjs list
  theqiyi.com` → "no captures"; CDX `matchType=domain` query → `[]`).
- The collections page (`https://theqiyi.com/collections/all`, fetched raw 2026-09-03) hotlinks
  product photography directly from `m.media-amazon.com` (Amazon's own CDN), and individual
  product pages carry "Buy on Amazon" call-to-action buttons alongside a JSON-LD `Brand` schema
  whose `sameAs` array points at an Amazon storefront search URL, an Instagram handle, and a
  YouTube channel — not a company registration, a factory address with street/phone, or any
  verifiable corporate identity.
- Listed prices are incoherent for the product category ("QiYi 2x2 Speed Cube — $239", "QiYi
  3x3 Magic Cube — $1,193", "QiYi Skew Corner Twist Black Speed Cube — $2,554"), consistent
  with mis-mapped/garbled data from an automated Amazon-scraping pipeline, not a real storefront
  price list.
- The "About Us" prose ("born in the heart of China's toy industry", "Help cube culture grow
  from a hobby into a global movement") reads as generic AI-generated marketing copy with no
  checkable specifics beyond what is already public knowledge about QiYi, and none of it can be
  cross-checked against a verified QiYi-controlled channel.

**Conclusion on this sub-finding:** `theqiyi.com` is almost certainly a **freshly-registered,
Amazon-affiliate/AI-content storefront that scrapes and re-narrates QiYi's public product
catalogue** — not QiYi's own site. It should not be treated as a Tier 1 manufacturer source at
all; on the tier table it more plausibly falls at Tier 4-5 ("aggregators… marketing copy
without specifications… machine-generated content"). This means:
- `data/manufacturers/qiyi.yml`'s `/kind`, `/country`, `/founded`, `/website` attestations,
  and `data/manufacturers/x-man-design.yml`'s `/kind` and `/parent_id` attestations, currently
  recorded `confirmed` on the strength of `theqiyi-about-us`, rest on a source that likely
  should not carry Tier 1 weight. **I did not edit these records** (out of my write lane and
  outside my mandate), but this needs to be flagged to whoever owns `data/sources/
  theqiyi-about-us.yml` before Pass 3 treats any of those fields as settled. It happens that
  X-Man Design's `sub_brand`/`parent_id: qiyi` claim is independently corroborated by the 2018
  `qiyicube-storefront-2018` capture and the Speedsolving wiki, so it likely survives at a
  lower confidence (`probable`, not `confirmed`) even with `theqiyi-about-us` discounted — but
  that is a judgment call for the record's owner, not this memo.
- Specifically for Q1: the "counter-evidence" that "QiYi's current about-us page omits Valk"
  **is not evidence of anything** — it is a scraped/spun site's incidental omission, not a
  corporate decision to exclude Valk from a family-of-brands page. This removes the only
  evidence pointing away from treating Valk as parallel to X-Man Design, and leaves the 2018
  storefront + wiki as the only real signal.

**Further primary-source checks on the 2018 storefront (the one genuinely first-party
source).** I re-fetched the archived `qiyicube.com` snapshot directly
(`web.archive.org/web/20181210034501id_/https://www.qiyicube.com/`, "Powered by Shopify",
copyright "© 2018 QIYI CUBE"). Confirmed the source record's excerpt verbatim: page title "QiYi
Cube – The Valk, MoFangGe, X-Man Design Speed Cube"; the storefront's own category taxonomy is
by *product type* (2x2/3x3/4x4/5x5/6x6), not by brand; and it sells, on the same front page,
Valk-prefixed 3x3 products (Valk 2 M, Valk 3 Black/Stickerless/White, Valk3 Power variants) and
an **"XMD Shadow M 6×6"** — i.e. the same storefront directly sold both "Valk"-named and
"XMD" (X-Man Design)-abbreviated products side by side, under one umbrella ("QIYI CUBE") but
without nesting one brand name inside the other in any visible taxonomy.

**Domain history, checked to see if the answer changed over time.** `qiyicube.com` itself
is dead: a 2024-03-21 capture shows it already reduced to a Sedo/GoDaddy-style parking page
("window.park" ad-park script), and as of 2026-09-03 it is a fresh "this domain may be for
sale" park page under a **new registration dated 2025-09-02** (`whois qiyicube.com`) — meaning
the *original* legitimate QiYi Shopify storefront that existed in 2018-2019 (Wayback shows
captures continuing at least into that window) had already lapsed and been dropped before 2024,
and the domain has since been recycled by an unrelated squatter. **No legitimate QiYi-operated
capture of any storefront exists in the Wayback record between roughly 2019 and today** — I
could not find one via `wayback list`/`prefix` on either `qiyicube.com` or `theqiyi.com`. This
means the "did the relationship change over time" question cannot be answered with primary
evidence for the 2020-2026 period at all: there is a real, positive 2018 answer (parallel
lines under one storefront) and then a **gap**, not a documented change.

**Strongest evidence for `manufacturer_id: qiyi`, Valk as parallel/independent-of-X-Man-Design
product line:** the 2018 first-party Shopify storefront's own page title and simultaneous
Valk/XMD product listing, corroborated by the Speedsolving wiki's parallel "Sub-Brands"
listing (Tier 4, corroboration only).

**Strongest evidence against (i.e., for nesting Valk under X-Man Design):** none found at
Tier 1-3. The only prior "against" evidence (`theqiyi-about-us`) is unreliable per the finding
above. No source anywhere — wiki, retailer, or manufacturer-adjacent — states that Valk is
legally or organizationally a product of X-Man Design specifically (as opposed to QiYi
generally, or X-Man Design and Valk both being QiYi lines that happen not to be nested in
each other).

**What primary evidence does and does not establish.** It establishes that in 2018, QiYi's own
storefront treated "The Valk" as one of (at least) three named lines it sold directly, not
subordinate to X-Man Design. It does **not** establish current (2020s) ownership, does not
establish a registered trademark holder, and does not rule out an internal corporate
reorganization since 2019 that this pass could not observe (no source exists either way for
that period).

**Recommended interpretation:** `manufacturer_id: qiyi` for the Valk family is **better
supported than previously documented**, now that the sole counter-source is discredited.
Recommend raising `/manufacturer_id` confidence from `uncertain` to `probable` (not
`confirmed` — still only one genuinely first-party source, the 2018 storefront, plus one Tier 4
corroboration; RESEARCH_SPEC's confidence table reserves `confirmed` for a Tier 1 source
stating the fact directly or two independent Tier 2 sources, and "X-Man Design and Valk are
both QiYi lines, not nested" is an inference from a page title and a taxonomy, not a direct
statement). Recommend the family record's prose be corrected to remove reliance on
`theqiyi-about-us` as counter-evidence and instead note the 2018-to-2026 evidentiary gap
honestly.

**Confidence: Medium.** The 2018 evidence is genuinely first-party and fairly clear about the
*2018* structure; the total absence of verifiable QiYi-operated web presence from
~2019-2026 means the *current* structure is Unresolved on primary evidence, even though no
contrary claim exists either.

**Affected record paths:**
- `data/families/qiyi-valk.yml` (`/manufacturer_id` attestation, description prose)
- `data/manufacturers/qiyi.yml` (`/kind`, `/country`, `/founded`, `/website`, `/notes` —
  all cite `theqiyi-about-us`)
- `data/manufacturers/x-man-design.yml` (`/kind`, `/parent_id` — cite `theqiyi-about-us`
  alongside the still-good 2018/wiki sources)
- `data/sources/theqiyi-about-us.yml` (the source record itself needs a reliability
  downgrade/flag; I did not edit it — out of my write lane)

## 2. MS / MsCube — what is it?

**Current archive state.** `data/families/diansheng-mscube.yml` sets `manufacturer_id:
diansheng`, `/manufacturer_id` confidence `uncertain`, citing only the Tier 4
`speedsolving-wiki-diansheng-products` ("DianSheng… now known for… owning the Mscube line of
puzzles"). Notably, `data/manufacturers/diansheng.yml`'s own notes already cite a *stronger*,
Tier 1 source for the same claim (`dianshengtoys-home-2025`) at `probable` — but the family
record's own attestation does not draw on it. This mismatch is itself worth flagging: the
better evidence exists in the sourcebase but was not carried into the family-level attestation.

**Independent-company hypothesis, tested directly.** I checked whether "MsCube"/"MS" could be
its own manufacturer with its own domain or legal identity:
- `mscube.com` (registered 2015-01-03) resolves, in every Wayback capture checked (2011-2023)
  and live, to an unrelated Indian web-hosting/domain-registrar page (Net4.in) — a coincidental
  name collision, not the cube brand.
- `ms-cube.com` (registered 2018-04-03) resolves, in a 2018 capture, to "MS-Cube Consulting" —
  a German business-consulting firm — again unrelated.
- No `mscube.net`/`.cn`/`.store`/`.shop` domain, no company-registration record, no factory
  address, and no named founder/designer for "MsCube" as an independent entity was found
  anywhere this pass. **This is meaningful negative evidence**, not just an absence: a
  manufacturer selling dozens of SKUs across at least three retailers (TheCubicle,
  SpeedCubeShop) over 2021-2026 with genuinely no discoverable independent web presence at all
  is far more consistent with "in-house product line of an established manufacturer that
  doesn't need its own storefront" than with "independent company."

**Primary DianSheng-side evidence, verified directly (not just via the existing excerpt).** I
fetched the archived DianSheng homepage myself
(`web.archive.org/web/20250421195521id_/http://www.dianshengtoys.com/`, raw HTML, 2026-09-03)
and found stronger structure than the existing source excerpt captures:
- The site's own **navigation/product-collection menu** ("产品集合" / "Product Collections")
  lists, as siblings: "点盛 星系团" (DianSheng Galaxy Cluster), **"MSCUBE旗舰魔方" (MSCUBE
  Flagship Cube)**, "点盛太阳系魔方" (DianSheng Solar System Cube), "银河系超高阶魔方" (Galaxy
  ultra-high-order cube), "点盛特色魔方" (DianSheng Featured Cube), "点盛异形魔方" (DianSheng
  shape-mod cube), "点盛魔尺" (DianSheng Magic Ruler). This is DianSheng's own site treating
  "MSCUBE" as one of its own named in-house product-collection categories, structurally
  identical to its other DianSheng-prefixed lines — not a "we also sell/carry this other
  brand" placement (there is no separate "distributed brands" or "other brands we carry"
  section on the page).
- The **"产品推荐" (Recommended Products) section** on the same homepage lists **"MS3X 双系统
  三定位 三阶魔方" (MS3X Dual-System Triple-Positioning 3x3)** in the same list, with the same
  "详情 >" (Details) link styling, as unambiguous DianSheng-branded products ("点盛 银河系11M",
  "太阳系S3M 2022磁悬浮版", etc.).
- DianSheng's own NxN magnetic product SKUs use codes ending in "**MS**" for products that are
  *not* MsCube-branded at all — e.g. "银河系9M 九阶魔方磁力版**T22009MS**", "银河系8M 八阶魔方
  磁力版**T22008MS**" — consistent with "MS" functioning as an internal DianSheng naming/SKU
  convention rather than a separate company's initials.
- The "点盛&MS'疯狂奖学金'" (DianSheng & MS "Crazy Scholarship") program name uses "&", which
  read in isolation could suggest two separate parties co-sponsoring a bounty — this is the one
  piece of language that could support the independent-company reading, and I flag it rather
  than explain it away. But it sits inside a page that elsewhere treats MSCUBE as DianSheng's
  own product-collection category, which weighs against reading the "&" as inter-company.

**Retailer-side evidence (corroborating, not primary).** SpeedCubeShop's own structured field
for the MsCube MS3X (fetched via Wayback, 2022-12-17 capture) records `Brand: MsCUBE` — the
retailer treats "MsCUBE" as the brand-facing name, exactly as other retailers do for
acknowledged sub-brands (e.g. "X-Man Design" rather than "QiYi"). This is retailer taxonomy and
carries no ownership authority per the task's own instruction, but it is consistent with, not
contrary to, a sub-brand/product-line reading. No retailer page checked (TheCubicle,
SpeedCubeShop) names DianSheng directly anywhere in MsCube product copy.

**What this does and does not establish.** It establishes that DianSheng's own official
website, as of an April 2025 capture, organizes "MSCUBE" as one of its own named product
collections alongside its other in-house lines, and separately recommends an "MS3X" product on
the same terms as unambiguous DianSheng products. It does **not** produce a sentence anywhere
stating "MsCube is DianSheng's own brand/sub-brand" in so many words, and it does not resolve
the ambiguous "DianSheng & MS" bounty-program phrasing.

**Recommended interpretation:** DianSheng product line, at **`probable`** confidence — a
genuine upgrade from the current `uncertain`, on the strength of the Tier 1 homepage's own
navigational self-categorization (a stronger fact pattern than the wiki claim it currently
rests on), while stopping short of `confirmed` because no source states the relationship in a
direct declarative sentence and the "&" bounty-naming leaves a small, honestly-recorded crack
in the record. The independent-manufacturer hypothesis was tested seriously and found no
supporting evidence at all (both obvious domains are unrelated businesses; no other MsCube-only
web presence exists).

**Confidence: Medium-High** for "DianSheng product line, not independent manufacturer,"
**Low/Unresolved** for "is this legally the same corporate entity or a formally licensed
sister brand" (the archive's schema does not require that distinction — see DATA_MODEL's
`family.manufacturer_id` — but it is worth naming as the genuine remaining unknown).

**Affected record paths:**
- `data/families/diansheng-mscube.yml` (`/manufacturer_id` attestation — recommend adding
  `dianshengtoys-home-2025` as a second, stronger source and raising confidence to `probable`)
- `data/manufacturers/diansheng.yml` (notes already correctly flag this; no change needed)

## 3. Eastsheen — did it produce a standard 3x3?

**Current archive state.** `data/families/eastsheen-3x3.yml` exists at `status: drafted`,
`/description` confidence `reported`, explicitly recording a live, unresolved contradiction
between TheCubicle's structured listing and the Speedsolving wiki's flat denial.

**Wiki claim, re-verified directly and found even stronger than the existing source record
shows.** I fetched the live Speedsolving wiki page myself
(`speedsolving.com/wiki/index.php/East_Sheen`, 2026-09-03). The existing source record
(`speedsolving-wiki-eastsheen`) does not actually contain the "does not produce 3×3 cubes"
sentence in its own excerpt (a gap in that source record, not a fabrication in the family
description — I confirmed the sentence is genuinely on the live page). Beyond the sentence
itself, the page's **own product taxonomy structurally excludes 3x3 entirely**: the infobox
"Products" field lists only "2x2 cubes, 4x4 cubes, 5x5 cubes, Mini cubes, Multi cubes," and the
article's own table of contents runs 2x2x2 → 4x4x4 → 5x5x5 → Mini Cubes → Multi Cubes with no
3x3 heading anywhere — this is an actively-maintained, comprehensively-organized page (complete
with community smoothness/lockup/corner-cutting ratings per size) that omits 3x3 by its own
structure, not merely by one sentence. This is still Tier 4 (unattributed wiki), but it is a
more comprehensive and specific negative claim than the family record's prose fully conveys.

**TheCubicle listing, re-verified directly.** I fetched the archived product page myself
(2023-01-29 capture) and confirmed the structured field `Manufacturer: Eastsheen`, `Type: 3x3`,
plus a genuine, non-generic product photograph (a real, physically photographed 57mm cube with
"marble/crack texture" stickers over all six colours, black-bodied). This is a real, sellable,
photographed product, not a placeholder or dead listing — I viewed the image directly.

**The isolation pattern, not previously surfaced.** I ran the retailer product-prefix sweep on
both TheCubicle and SpeedCubeShop for every `eastsheen-*` product. The result is stark: **every
other Eastsheen size (2x2, 4x4, 5x5) has both a plain "Super" listing and a separate "DIY
Stickers" listing at TheCubicle**, and SpeedCubeShop independently carries Eastsheen 2x2/4x4/5x5
("Super") plus a mini 2x2 keychain — **but neither retailer has a plain "Eastsheen 3x3" or
"Eastsheen Super 3x3" listing anywhere**. The "Wall Stickers" 3x3 is the *only* 3x3-anything
found across two major retailers' full Eastsheen catalogues, and it is structurally an outlier:
every other size comes in a matched pair of plain + decorated editions; the 3x3 has only the
decorated edition, with no plain sibling ever found. This is circumstantial but real: it is the
pattern you would expect either from (a) a single genuinely rare/limited Eastsheen 3x3 that
never got a plain edition, or (b) a novelty decorative-sticker product whose base cube and
"Manufacturer" attribution TheCubicle got wrong or oversimplified, with no plain counterpart
because there never was an Eastsheen-branded undecorated base to list.

**OEM/rebrand and period-scoping questions, directly addressed.** No source located this pass
— not TheCubicle's product copy, not the wiki, not Eastsheen's own site (see below) — states or
implies that this product is an OEM base cube made by a third party and merely restickered
under Eastsheen's name; equally, none states it is Eastsheen's own original tooling. No source
scopes the wiki's "does not produce 3×3 cubes" claim to a specific date range either — the wiki
gives one continuous "Years Active: 1981-Present" with no period-specific carve-out, and the
claim reads as a general, current-tense statement about the company's whole known catalogue.
**I could not resolve either question from primary evidence.**

**Eastsheen's own site, checked directly for a historical catalogue.** I fetched
`eastsheen.com` across its Wayback history (2004, 2008, 2009, 2011 captures). Every one is
unusable as a manufacturer source: the 2004 capture is a meta-refresh redirect to an unrelated
link-farm domain (`town-index.net/agencies2.htm`); the 2008-2011 captures are Smartname/Sedo
domain-parking templates. **No genuine Eastsheen-operated catalogue page survives in the
Wayback record at any date** — this pass could not find a period when Eastsheen's own site
listed its product range, so the "was there ever an Eastsheen-catalogued 3x3, even before
2016" question cannot be settled from the manufacturer's own historical material either.

**What primary evidence does and does not establish.** It establishes that a real, physically
photographed 3x3 product was sold continuously by a major retailer under a structured
"Manufacturer: Eastsheen" attribution for at least 2021-2025, and that community documentation
elsewhere flatly and structurally denies Eastsheen makes 3x3 cubes at all. It does not
establish which is correct, does not establish an OEM relationship, does not establish
Eastsheen's own historical catalogue (unrecoverable), and does not establish that either
source's claim is period-scoped.

**Strongest evidence for "Eastsheen genuinely made a 3x3":** TheCubicle's structured
`Manufacturer` field plus a real product photograph, sold continuously for 4+ years.

**Strongest evidence against:** the Speedsolving wiki's structurally complete product taxonomy
excluding 3x3 entirely (not just one sentence), corroborated by the *absence* of any plain
"Eastsheen 3x3" companion listing at either of two major retailers who both carry Eastsheen's
2x2/4x4/5x5 lines in full plain+decorated pairs.

**Recommended interpretation:** **Unresolved — preserve the contradiction, do not pick a
side.** If forced to weight it, the isolation pattern (no plain sibling, unlike every other
Eastsheen size, at two independent retailers) is new evidence this pass surfaced that leans
*slightly* toward treating this specific product with more suspicion than the current
`reported` confidence implies — but "slightly more suspicious" is not the same as a resolution,
and I did not find a source stating a rebrand, an OEM relationship, or a mislabeling directly.
Recommend the family record's `status` remain `drafted`/`uncertain` rather than advance toward
`sourced`, and recommend the isolation-pattern finding be added to the record's own notes as a
documented reason for caution, without asserting a `rebrand_of` or changing `manufacturer_id`.

**Confidence: Unresolved** (genuinely — this is the correct answer, not a hedge).

**Affected record paths:**
- `data/families/eastsheen-3x3.yml` (recommend adding the isolation-pattern finding to notes;
  no confidence change recommended beyond what is already recorded, since primary sources did
  not newly resolve the contradiction)
- `data/manufacturers/eastsheen.yml` (`/ceased`, `/website` already correctly `unknown`; this
  pass's direct re-check of eastsheen.com across 2004-2011 confirms no recoverable catalogue
  exists at any date, worth citing explicitly rather than only noting the domain is "parked")
- `data/sources/speedsolving-wiki-eastsheen.yml` (the source record's own excerpt should be
  extended to include the "does not produce 3×3 cubes" sentence and the full product-list
  infobox, which it currently omits despite the family record quoting it)

## 4. Meffert's Kokonotsu / "Molecube"

**Current archive state.** `data/families/mefferts-kokonotsu.yml` correctly declines to record
a `rebrand_of` relationship, citing unattributed customer-review testimony only, per
DATA_MODEL §4.4's "visual resemblance alone is a lead, not a claim" rule.

**Search for an independent "Molecube" entity — negative result.** I tried to establish
"Molecube" as a real, citable product:
- `molecube.com` (currently registered 2009, GoDaddy) is, in every Wayback capture checked
  (2018, and consistent with the general pattern across its whole capture history), a
  domain-parking/"Buy this domain" page via ParkingCrew — **not** a real puzzle company's site.
  No other plausible domain (`themolecube.com`, `molecubepuzzle.com`) is even registered.
- `twistypuzzles.com` (the community puzzle museum/database, which would be the natural place
  to find a named independent designer puzzle like this) returned HTTP 403 to direct fetch and
  had no matching URLs in a Wayback prefix sweep of its domain for "molecube" or "kokonotsu" —
  inconclusive (a blocked/limited fetch, not evidence of absence, per the task's own standing
  instruction on this point). **This needs the browser tool available in the main session**:
  specifically `twistypuzzles.com`'s puzzle-database search for "Molecube" would be the single
  highest-value next check and I could not perform it from this environment.
- Wayback prefix sweeps of three specialty retailers plausible for carrying an independent
  designer puzzle (`puzzlemaster.ca`, `cubezz.com`, `calvinpuzzle.com`) found no "molecube" or
  "kokonotsu" URL match — a weak negative (prefix sweeps are capped and may not surface a
  deeply-nested product URL), not treated as proof of absence.

**A previously-unsurfaced detail in the same review text, worth weighing.** The full customer
review (already in `thecubicle-mefferts-kokonotsu-pillow-3x3`'s excerpt, re-read closely here)
says: "The molecule [sic, Molecube] is a puzzle that isn't very much fun to solve because it is
loud and clicks with ball bearings, but this puzzle [Kokonotsu] looks more smooth." This
distinguishes the two products' *mechanism feel* (ball-bearing clicking vs. smooth) — if
Kokonotsu were literally the identical manufactured object merely rebranded (DATA_MODEL's
`rebrand_of` scenario: same tooling, same mechanism, different name), independent reviewers
would not typically describe a mechanism-level quality difference this specific. This is still
Tier 4-5 unattributed UGC and does not establish anything on its own, but it is a small piece of
**disconfirming** evidence against a strict "same physical product, different name" rebrand,
and mildly supports "alternate/independent design sharing the same underlying concept (a
9-colour, ball-bearing-free block puzzle)" instead — exactly the kind of question DATA_MODEL
§4.4 says needs "a shared manufacturer statement, matching mold markings, or documented supply
relationship," none of which I could find in either direction.

**What primary evidence does and does not establish.** It establishes that "Molecube" cannot
currently be tied to any discoverable company, designer, or citable Tier 1-3 record — the name
exists only inside unattributed customer reviews on one retailer's page. It does not establish
that Molecube doesn't exist as a real product sold under a different, undiscovered spelling or
regional name (reviewers describe it as "sold in many physical stores," implying it was a
real, physically-encountered item, likely a novelty/gift-shop product rather than a
speedcubing-retailer product — which would also explain why it left no trace in the speedcubing
retailer/wiki ecosystem this pass searched).

**Strongest evidence for a rebrand relationship:** none at citable tier. Only the shared
functional concept (9-colour, sticker-free block 3x3) as described by reviewers.

**Strongest evidence against:** no independent company/product record found anywhere;
reviewers' own mechanism-feel comparison suggesting a difference, not identity.

**Recommended interpretation: Unresolved — record as an open lead, take no relationship
action.** This pass could not upgrade the lead to any citable tier. Do **not** record
`rebrand_of`; "alternate naming" is not supported either (nothing establishes Molecube and
Kokonotsu share a manufacturer); "OEM/private label" and "unrelated" are equally unsupported.
The honest position is: a real product apparently called "Molecube" exists in the wild
(consistent, independent customer testimony from more than one reviewer), its relationship to
Meffert's Kokonotsu is undetermined, and the next step is a `twistypuzzles.com` museum search
via a browser tool, which this pass could not perform.

**Confidence: Unresolved.**

**Affected record paths:**
- `data/families/mefferts-kokonotsu.yml` — no change recommended; its existing treatment
  (flagging the lead, not acting on it) is already correct and should not be strengthened
  toward any relationship without the `twistypuzzles.com` check.
- Next-step flag for the main session: visually inspect `twistypuzzles.com`'s puzzle database
  search for "Molecube" (blocked to this pass's fetch tooling at HTTP 403).

## 5. Maru — what kind of entity is it?

**Current archive state.** `data/manufacturers/maru.yml` is `kind: manufacturer`, backing four
genuine own-design 3x3 families (`maru-3x3`, `maru-cx3`, `maru-vx-3`, `maru-nano`) already
documented in Pass 2. The reported aftermarket accessory business was not yet investigated.

**Primary evidence, verified directly.** A `thecubicle.com/products/maru*` prefix sweep (67
distinct URLs) confirms the claim precisely: TheCubicle sells six separate products under the
naming pattern "Maru Core Magnetic DIY Kit for **[other manufacturer's cube]**":
- `maru-core-magnetic-diy-kit-for-rs3-m-2020` (MoYu RS3 M 2020)
- `maru-core-magnetic-diy-kit-for-tengyun-v1` (YJ TengYun V1)
- `maru-core-magnetic-diy-kit-for-tornado-v2` (X-Man/QiYi Tornado V2)
- `maru-core-magnetic-diy-kit-for-tornado-v3` (X-Man/QiYi Tornado V3)
- `maru-core-magnetic-diy-kit-for-weilong-wr-m-2021` (MoYu WeiLong WR M 2021)
- `maru-core-magnetic-diy-kit-for-yulong-v2` (YJ YuLong V2)

I fetched the RS3 M 2020 kit's full product page (2023-02-05 capture) directly. Its own product
copy: **"The popular MoYu RS3 M 2020 can now be made core magnetic at home! This Maru DIY kit
allows you to attach magnets to the corner bases and core... You will need superglue for
installation. Note: There has been a recent change to the MoYu RS3 M 2020 corners that could
affect the compatibility of this kit. Please make sure to only use this kit on RS3 M 2020s with
the original corner design."** TheCubicle's own structured fields: `Manufacturer: Maru`, `Type:
Accessories`, `Gross Weight: 14g`.

**Nature and scale of the business, established directly.** This is decisively **not** a
serviced-cube business in DATA_MODEL §4.3's sense. Three things TheCubicle's own copy
establishes, all pointing the same direction:
1. **Maru never touches the customer's actual cube.** The end user installs the kit themselves
   ("at home," "you will need superglue for installation"). Maru performs no work on any
   specific unit before sale.
2. **The kit is not tied to one base variant.** It is compatible with a *range* of units of the
   named base cube (explicitly conditioned on "the original corner design," warning that a
   running production change may break compatibility) — there is no single "exact base variant"
   for a `modified_from` relationship to point at, which DATA_MODEL §4.3 requires ("a
   `modified_from` relationship to the **exact base variant**").
3. **It is a tiny, generic parts product, not a cube.** 14g gross weight is consistent with a
   small bag of magnets and adhesive/instructions, not a cube-containing product. TheCubicle's
   own `Type` field calls it "Accessories," not "3x3."

**Scale.** Six SKUs found, spanning four base-cube manufacturers' flagship/mainline lines
(MoYu, YJ, X-Man/QiYi) and two cube generations for Tornado (V2, V3) — a genuine, sustained,
multi-brand accessory product line, not a one-off. Corroboration is currently single-retailer:
a parallel `speedcubeshop.com/products/maru*` prefix sweep found none of these kits (only a
2015-era `maru-cx3-3x3x3`, lubricant, and a mousepad) — this pass could not corroborate the kit
line at a second retailer, which should be recorded as a real limit on the evidence rather than
assumed to generalize.

**The ontology question, per DATA_MODEL §4.3/§4.4, read closely.** §4.3 already anticipates and
excludes exactly this shape of case: *"Not every service is a variant. A separately marketed,
named product built on a specific base cube is a variant a collector could own. An optional
service selected at checkout on a cube the buyer already chose is not — it produces a
*specimen* with modifications, not an archive record."* Maru's kits are further outside the
variant/service model than even that checkout example: the checkout-service example at least
involves the *servicer* performing labor on a *specific unit* the buyer already selected; here,
Maru performs no labor at all, sells no cube, and the resulting modified object is a specimen
the *collector* creates in their own home, on a base-cube unit whose exact identity Maru never
sees or determines. Per DATA_MODEL §4.3's own logic generalized one step further: **this is not
a service-block-and-`modified_from`-relationship case; it produces no archive-level model,
variant, or specimen record for the modification itself.**

**Recommended interpretation — a combination, but not the combination DATA_MODEL currently has
a slot for.** Maru itself should remain `kind: manufacturer` — its own four cube families
(`maru-3x3`, `maru-cx3`, `maru-vx-3`, `maru-nano`) are real, independently-designed products
that justify that classification on their own, unaffected by the accessory line. The accessory
kit business is real and belongs in Maru's manufacturer-level notes as a documented fact about
its business (per the mandate: report, don't hide it), but **the kits themselves should not be
built into the archive's family/model/variant/service structure** — not as new families under
Maru (they are not cubes), not as variants or `modified_from`/`service`-block records under the
*other* manufacturers' models (no exact base variant exists to point at, and Maru performs no
work), and not by inventing a new `kind` value. The task's own framing anticipated this
correctly: **"a core kit is not a cube: it may not belong in a model/variant tree at all"** —
confirmed.

**Schema finding, stated plainly per the instructions.** DATA_MODEL has no first-class way to
record "manufacturer X sells a compatibility accessory for manufacturer Y's cube, installed by
the end user, not tied to a specific sold unit." This is a real gap, not a workaround-shaped
problem: §4.3's `service` block assumes the servicer performs the modification and the archive
collects the *resulting modified object*; Maru's kits invert both assumptions (no servicer
labor, no single resulting object). If Pass 3 wants this fact preserved at all beyond
manufacturer-level prose, it needs either (a) a deliberate decision that accessory/compatibility
parts are out of scope for the model/variant/specimen chain entirely (my recommendation — they
are not "an object a collector could own" in the sense DATA_MODEL §4.1's materiality test uses;
the *specimen* the collector ends up with is a personal modification of a *different*
manufacturer's variant, not a new sellable configuration), or (b) a new, explicitly-scoped
entity/relationship type for third-party compatibility accessories, which I am not proposing
myself, per the instruction to report rather than invent.

**Confidence: High** that the accessory-kit business is real and correctly characterized
(direct Tier 1-adjacent retailer structured-field evidence, unambiguous product copy). **High**
that it does not fit DATA_MODEL's existing `service`/`modified_from` shape. **Unresolved** on
what Pass 3 should do about it, by design — that is a modeling decision for the schema owner,
not a fact this research can settle.

**Affected record paths:**
- `data/manufacturers/maru.yml` (recommend adding the accessory-kit business to `notes` as a
  documented fact; no `kind` change)
- No family/model/variant/service records recommended for the kits themselves
- Cross-reference for whoever owns the base-cube records: MoYu RS3 M 2020, MoYu WeiLong WR M
  2021, YJ TengYun V1, YJ YuLong V2, X-Man Tornado V2/V3 — none of these need a
  `modified_from`/`service` entry for Maru's kits under the reasoning above, but a note on
  third-party aftermarket accessory availability could be added to those manufacturers'
  `notes` prose if a future pass wants the fact preserved somewhere queryable.

## 6. Z-Cube and CubeStyle — manufacturer, decorator, or service?

### 6a. Z-Cube

**Current archive state.** `data/manufacturers/zcube.yml` is `kind: manufacturer` at `drafted`,
zero families, resting on a single Tier 4 wiki source describing it as a company that "often,
but not always, repackage[s] cubes from other brands."

**Primary evidence, newly gathered.** I ran `products/z-cube*` and `products/z-carbon*` prefix
sweeps against both TheCubicle and SpeedCubeShop:
- **Z-Cube did sell what reads as its own mainline 3x3 in the mid-2010s.** SpeedCubeShop
  carried a plain "Z-Cube 3x3x3" (captured 2015-12-29) and a "Z-Cube Concave 3x3x3" (captured
  2016-01-08) — genuine, non-decorative, standard-looking budget 3x3 listings, sold in
  Stickerless/Transparent colourways at $5.95. The product copy: **"The Z-Cube 3x3x3 feels a lot
  like the popular Type (F) series cubes. This item has a 'bubbly' feeling and very smooth
  layer rotations."** This is retailer copy comparing it to a known budget-mechanism class, not
  naming a specific named base-cube product the way the CubeStyle listings do — it reads as an
  independent (if unremarkable) budget cube of its era, not a documented rebrand.
- **By ~2019 onward, Z-Cube's catalogue at both retailers is overwhelmingly "Z Carbon Fiber"
  decorative products** across nearly every puzzle type (2x2 through 5x5, Megaminx, Pyraminx,
  Skewb, Mastermorphix, Kilominx, Mirror Blocks, gift boxes) — the pattern the Speedsolving wiki
  describes. I fetched the "Z Carbon Fiber 3x3" product page directly (TheCubicle, 2019-09-19
  capture): **"The Z Carbon Fiber 3x3 is a budget-friendly stickerless 3x3 with carbon fiber
  black stickers applied on all 6 sides, which gives the cube a unique look and texture."
  Manufacturer: Z. Colour options: "Phantom (Stickerless Pink)" / "Phantom (Stickerless
  Bright)."**
- **This description and colourway naming is not merely similar to CubeStyle's Carbon Fiber
  3x3 — it is a template match.** The `thecubicle-cubestyle-carbon-fiber-3x3-2020` source
  (already in the archive, Q6b below) reads: "The CubeStyle Carbon Fiber 3x3 is a
  budget-friendly stickerless 3x3 with carbon fiber black stickers applied on all 6 sides,
  which gives the cube a unique look and texture. The base cube model for the CubeStyle Carbon
  Fiber 3x3 is the QiYi Warrior W 3x3 for the Phantom (Stickerless Bright) version and the YJ
  GuanLong for the Phantom (Stickerless Pink) version." **The sentence structure is verbatim
  identical up to the brand name, and the two colourway names — "Phantom (Stickerless Pink)"
  and "Phantom (Stickerless Bright)" — match exactly**, including the shared, non-obvious
  "Phantom" label. This is strong circumstantial evidence that "Z Carbon Fiber 3x3" and
  "CubeStyle Carbon Fiber 3x3" are **the same underlying decorated product (same OEM base
  cubes, same colour-option naming from whatever factory/wholesaler supplies both), sold under
  two different retailer-assigned brand names** — not that the retailer's own copy for the "Z"
  listing states the QiYi Warrior W/YJ GuanLong base directly (it doesn't; only the CubeStyle
  listing does). I did not find a version of the "Z Carbon Fiber 3x3" page that itself names a
  base cube, so the QiYi Warrior W attribution is inferred by the wiki, corroborated
  circumstantially by the template/colourway match, but not independently retailer-confirmed
  for the Z-branded listing specifically.

**What this does and does not establish.** It establishes that Z-Cube's business genuinely
changed character over the archive's window: **a real, if unremarkable, own-labeled 3x3
existed circa 2015-2016**, and **by ~2019 the "3x3" catalogue under the Z name is dominated by
decorative carbon-fibre-sticker products sharing telltale naming with a documented CubeStyle
rebrand of QiYi/YJ base cubes.** It does not by itself prove every Z-branded 3x3 is a rebrand
(the 2015-2016 "Z-Cube 3x3x3" is not shown to be one), and it does not independently confirm
the specific "QiYi Warrior W" attribution for the Z-branded Carbon Fiber listing (that specific
sentence exists only in the wiki and, by strong inference, the CubeStyle sibling listing).

**Recommended interpretation: hybrid, and time-varying — do not force a single label.**
Z-Cube is not purely "a manufacturer with zero families" (it plausibly did have at least one
own/OEM-sourced mainline 3x3 design worth a `reference_only` or thin `drafted` family, circa
2015-2016) and not purely "a rebrander" either (that characterization fits its later,
much larger decorative-novelty catalogue far better than its earlier mainline listings).
Recommend: retain `kind: manufacturer` (it is not a `service` in DATA_MODEL's sense — it does
not modify a named base variant on request and sell the result with a `service` block the way
PiCube does; it appears to be a **repeat purchaser/private-labeler of OEM decorated stock**,
which DATA_MODEL does not yet have a clean slot for — see the rebrand framework note below).
The individual "Z Carbon Fiber 3x3" product, if pursued in a future pass, is a `rebrand_of`
candidate against QiYi Warrior W per DATA_MODEL §4.4, but needs a source that states the base
cube for the *Z-branded* listing directly (the wiki, or a clearer retailer capture) before that
relationship is recorded — the template/colourway match is compelling but is not itself "a
shared manufacturer statement, matching mold markings, or documented supply relationship"
stated for the Z listing.

**Confidence: Medium** that Z-Cube's catalogue is a hybrid of a thin early own-line and a later,
larger rebrand/decorator business. **Low** on the specific Warrior W attribution for the
Z-branded product (inferred, not directly retailer-stated for that listing).

**Affected record paths:**
- `data/manufacturers/zcube.yml` (recommend adding the 2015-2016 own-3x3 finding and the
  template/colourway-match finding to notes; `kind` unchanged)
- No family record recommended yet for either the 2015-16 "Z-Cube 3x3x3"/"Concave 3x3x3" or
  the "Z Carbon Fiber 3x3" — both are Pass 2 (family enumeration) decisions, outside this
  audit's write lane; flagged here as leads with sources identified.

### 6b. CubeStyle

**Current archive state.** `data/families/cubestyle-3x3.yml` already correctly separates the
plain "CubeStyle 3x3" (kept as its own family) from the "Carbon Fiber" and "Hollow Sticker"
decorated 3x3s (excluded, documented as QiYi Warrior W / YJ GuanLong reskins). I verified all
three source pages directly (`thecubicle-cubestyle-3x3`, `-carbon-fiber-3x3-2020`,
`-hollow-sticker-3x3-2020`) and confirm the existing excerpts are accurate verbatim quotes of
the archived pages — no discrepancy found.

**New corroborating/complicating detail from direct re-verification.** The plain "CubeStyle
3x3" listing's own structured spec table (fetched directly, 2024-05-30 capture): `Gross Weight
82g`, `Item Weight 73.6g`, `Dimensions 56.0mm`. The two named-base-cube decorated listings
record `Gross Weight 77g`, `Item Weight 66.9g`/`66.2g`, same `56.0mm` dimension. The ~7-10g
difference across every weight field is modest but consistent across both comparisons, and is
at least mildly positive evidence that **the plain "CubeStyle 3x3" is a physically different
product from the QiYi Warrior W/YJ GuanLong-based decorated pair** — supporting, not
undermining, the existing family record's decision to keep it separate. This is retailer
catalogue data (Tier 2, single-publisher), not a manufacturer spec sheet, and weight fields at
this retailer are not always reliable (see the `Added: 2018-09-11` artifact both this plain
listing and both decorated listings all carry identically, confirming this pass's own finding
that the date field is untrustworthy — the weight fields did **not** show the same suspicious
repetition, so they are treated as more likely genuine, but still single-source).

**"FangGe" identity, checked and still unresolved.** I checked whether "FangGe" is a
discoverable independent entity: `fangge.com` (registered 2008) is a Sedo domain-parking page
("This website is for sale!") in every capture checked (2018 and effectively the whole
Wayback history pattern), unrelated to any cube company. No `fangge-cube.com`/`fangge-toy.com`
registration exists. No Speedsolving wiki page exists for "CubeStyle" or "FangGe" (404). This
is a further negative check consistent with, but not proof of, the existing manufacturer
record's own hypothesis that "FangGe" is a garbled/shorthand reference to QiYi's historical
"MoFangGe" in-house name rather than an independently discoverable company — I could not
confirm or refute this any further than pass 1 already had.

**Recommended interpretation, per-product, matching the existing family record's own
structure:** "CubeStyle 3x3" (plain) = genuine, if generic, budget manufacturer/brand-of-record
product — keep as its own family under `cubestyle`, unresolved parentage to "FangGe"/MoFangGe.
"CubeStyle Carbon Fiber 3x3" and "CubeStyle [Hollow Sticker] 3x3" = decorator/private-label
products with a directly and specifically named base cube each (QiYi Warrior W; YJ GuanLong) —
these are `modified_from`/`service`-block candidates under **QiYi's** and **YJ's** own model
trees respectively, with CubeStyle recorded as the servicer, exactly as DATA_MODEL §4.3
describes, and exactly as the existing source records already recommend. **How this would
work concretely:** each decorated colourway needs its own base-variant match (QiYi Warrior W
"Stickerless Bright"; YJ GuanLong "Stickerless Pink" or similar) before a `modified_from`
relationship can be written — the two source records already identify the right base models
but not yet the exact base *variant* IDs, which is Pass 3/4 work under QiYi's and YJ's own
family trees, not CubeStyle's. I did not create any such variant, per the mandate.

**Confidence: High** for the plain/decorated split (already well-sourced, re-verified
directly). **Medium** for "FangGe" remaining a genuine unknown rather than being resolvable to
MoFangGe — no new evidence either way.

**Affected record paths:**
- `data/families/cubestyle-3x3.yml` (no change recommended; existing treatment confirmed
  correct on re-verification; could add the weight-comparison finding to notes as further
  support)
- `data/manufacturers/cubestyle.yml` (no change recommended; "FangGe" open question confirmed
  still open, `fangge.com` negative-check finding could be added to notes)
- Cross-reference for Pass 3/4 owners of QiYi's Warrior W and YJ's GuanLong model trees: two
  ready-to-use `modified_from`/`service` leads exist, sourced, awaiting exact base-variant
  matching.

