# Agent C — GAN family/model boundary audit

Scope: independent ontology audit of the GAN pilot's Pass 2 family boundaries (`data/families/gan-*.yml`,
`data/families/monster-go-*.yml`, `data/families/swift-block-3x3.yml`) and the models currently filed
under each. This is **not** a re-run of Pass 2 or Pass 3 — no `data/` file is edited, no model or variant
is enumerated. All 15 GAN-side family/model claims re-examined below were checked against fresh,
independently-refetched Wayback captures, not against the pilot's own notes-file framing.

Working method: read `data/families/gan-*.yml`, every cited `data/sources/*.yml`, and
`research/notes/models/gan-pass2.md` in full first, to understand what was claimed and on what
evidence. Then independently re-fetched the underlying Wayback captures (not merely re-read the
pilot's excerpts) for the load-bearing nav/collection pages, plus new captures the pilot's notes do
not mention (the Nov 2024 top-nav dropdown on a live `gan14-maglev-pro` product page; the Dec 2025
`flagship-speed-cubes` collection; the Jul 2026 `gan-series` collection; the full `gancube.com/collections/`
and `gancube.cn/` prefix listings). This surfaced material the pilot's own citations do not contain, in
both directions — some strengthening the pilot's calls, one directly contradicting a stated reason for
one of them (see Q1 below).

DATA_MODEL's own definition of `family` (§3.3, §72 in the table): **"A named product line persisting
across designs."** That definition, read literally, is the controlling test applied throughout this
audit — not "does GAN's site file it in the same nav bucket," which turns out to be a materially weaker
and less consistent signal than the pilot's write-up treats it as.

---

## Q1. What actually makes a GAN product a persistent family here? Is `gan-flagship-series` internally consistent?

**Current interpretation** (pilot, `data/families/gan-flagship-series.yml` + `gan-pass2.md`): GAN11
through GAN17 are one family because GAN's own site nav draws a "Flagship Series"/"旗舰魔方" boundary
around the whole numbered succession, on both its English and Chinese domestic sites, independent of a
shared literal product name. This is explicitly held even though the same nav evidence type
("Advanced Series"/"至轻系列") was separately dismissed as unstable merchandising noise when found on
GAN V100. The pilot's own notes acknowledge the tension and resolve it by treating a Nov 2024
`flagship-speed-cubes` collection (which mixed in GAN356) as an early, since-superseded state, and the
Aug 2026 nav dropdown (which excludes GAN356) as the cleaner, operative evidence.

**Strongest alternative interpretation:** GAN gives this succession *no* name of its own beyond "GAN" +
a bare number — unlike every sibling GAN family (356, 354, 357, V100, i, i carry, ui, Swift Block,
Monster Go), which all carry a literal recurring name-word inside every model's own product name.
"Flagship Series"/"旗舰魔方" is a **collection/tier label GAN applies from outside**, not a name any
product itself carries, and is demonstrably unstable in exactly the way "Advanced Series" was. Read
strictly, this succession does not meet DATA_MODEL's "named product line" test at all, and the numbers
should be treated as individually-named single-model families chained by `successor_family_id`
(the reading the pilot explicitly rejected).

**What I found, independently re-verified — this splits into two different questions the pilot's
write-up runs together:**

**(a) Is GAN's own nav/collection evidence for "Flagship Series" reliable?** Partially, and less than
the pilot's write-up implies, but not for the reason the pilot's own caveat gives. I fetched a live
Nov 2024 product page (`gancube.com/products/gan14-maglev-pro-magnetic-speed-cube`, capture
20241127032804) that the pilot's session did not cite. It contains **two simultaneous, disagreeing
GAN-authored taxonomies on the same page for the same product**:
  - The top-nav mega-menu, at that date, already carries a dropdown literally labelled **"Flagship
    Series"**, listing GAN15/14/13/12/11 plus GAN562M/GAN251-M-series/GAN460M (non-3x3 siblings) —
    structurally identical to the Aug 2026 dropdown the pilot cites, **21 months earlier**, and
    likewise excluding every GAN356 product.
  - The same product's own on-page breadcrumb reads **"Advanced Series"** — the exact label the pilot
    dismissed as unstable noise when found on V100.

  So "Advanced Series" and "Flagship Series" are not sequential (an old label superseded by a new
  one, as the pilot's write-up and the V100 caveat both assume) — they are **two parallel,
  independently-maintained GAN taxonomies that disagree about the same product at the same instant**:
  a curated top-nav mega-menu vs. an auto-generated collection/breadcrumb tag. This is a materially
  better finding than either the pilot's original reasoning or its own later caveat supplies, because
  it resolves the ambiguity in a specific direction: **the curated nav dropdown, specifically, has
  been stable for at least 21 months** (Nov 2024 → Aug 2026) in consistently excluding GAN356 and
  including the numbered succession, independently corroborated a third time by the CN site's
  "旗舰魔方" heading (my own fresh fetch of `gancube.cn/gan-v100/`, capture 20251109, confirms this —
  see Q2 for detail). That is a stronger, triply-corroborated, time-durable finding than the pilot's
  own single-snapshot citation, and it directly answers the V100 caveat's open question: **the
  "Advanced Series" breadcrumb on V100 is not ambiguous evidence of a label transition — it is the
  auto-tagged collection/breadcrumb layer, which both my Nov 2024 finding and the pilot's own
  evidence #2–4 show disagrees with the curated nav layer even for products the archive is otherwise
  confident belong in Flagship Series.** The V100 exclusion conclusion is *strengthened*, not
  weakened, by this finding, and the "reduced weight" the record already assigns to breadcrumb
  evidence is correct, now for a better-understood reason (see Q4).

  However, the **generic Shopify collection landing pages** (`/collections/flagship-speed-cubes`,
  `/collections/advanced-speed-cubes`, `/collections/gan-series`) are a third, still messier layer,
  and my fetches show they are **not** an early, superseded state — `/collections/flagship-speed-cubes`
  (page title "GAN Flagship Series | GANCUBE") still mixed in nine separate GAN356-branded products
  (M E, M E Christmas, M E Golden, Maglev, RS2, plus i3/i-carry-2/i-carry-E/i-carry-S smart products)
  alongside GAN11–16 as late as **Dec 2025** (capture 20251204123715), thirteen months after the
  "messy" Nov 2024 capture the pilot's notes treat as superseded. `/collections/gan-series` (Jul 2026,
  capture 20260719144110) is broader still — a catalogue-wide "everything current GAN 3x3" bucket
  including GAN356 Me, GAN356 i-carry, GAN i4, GAN V100, and GAN11–16 together. Neither of these is
  evidence for or against a family boundary; they are storefront SEO/merchandising surfaces and should
  not be cited as boundary evidence at all, in either direction. The pilot's description already
  flags the Nov 2024 case as "messy," but frames it as a resolved, historical complication; it is not
  resolved — it is a live, parallel, still-current taxonomy layer that the family record should
  describe as ongoing, not superseded.

**(b) Is the roster of numbers inside "Flagship Series" itself stable?** No, and this matters more
than the 356-exclusion question. Across the three independent nav-dropdown/heading snapshots now on
file (EN Nov 2024, CN Nov 2025, EN Aug 2026):
  - **GAN13** is present in EN Nov 2024 and CN Nov 2025, but **absent** from EN Aug 2026.
  - **GAN11** is present in EN Nov 2024 and EN Aug 2026, but **absent** from CN Nov 2025's
    "旗舰魔方" heading.
  - The CN "旗舰魔方" heading also includes **GAN251 M pro**, a 2x2, confirming (consistent with the
    EN dropdown's own non-3x3 siblings) that "Flagship"/"旗舰魔方" is a cross-shape-type price/tier
    label, not a 3x3-specific lineage marker, on either site.

  This is a real instability, but it is a **model-roster** question (which generations currently
  count), not a **family-existence** question (whether a "flagship" grouping is real at all) — and the
  pilot's own notes already flag the GAN13 discontinuation asymmetry as an open lead for Pass 3. My
  finding adds the mirror-image GAN11 asymmetry, which was not previously flagged, and confirms this
  is a live, ongoing instability rather than a one-off gap.

**Recommended ontology — the rule, stated so Pass 3 can apply it mechanically:**

> A GAN product line is a `family` when GAN's own **product naming** carries a recurring word or
> infix across multiple design generations (e.g. "356", "354", "357", "V100", "i", "i carry", "ui",
> "Swift Block", "Monster Go"). A bare `GAN<number>` succession with no such recurring word is *not*
> self-evidently one family by naming alone — but it may still be recorded as one family when a
> **curated** (not auto-generated) manufacturer navigation structure durably and consistently groups
> it as such over more than one independent snapshot and more than one site. Distinguish curated nav
> (mega-menu dropdowns, hand-maintained) from auto-generated collection/breadcrumb tags (Shopify
> collection landing pages, SEO tag pages) — the latter are not admissible family-boundary evidence on
> their own; they change with every merchandising campaign and routinely disagree with the former for
> the same product on the same page. When a numbered succession's curated-nav grouping is itself
> unstable at the edges (a generation flickers in and out across snapshots), record the family as a
> whole with `confidence: probable` rather than `confirmed`, and flag the specific edge generations
> for Pass 3 as `succeeds`/discontinuation questions, not as reasons to dissolve the family.

Under this rule, **`gan-flagship-series` survives as one family**, but on materially better and more
specific grounds than the pilot's write-up gives (a 21-month-durable, triply-corroborated curated-nav
finding, not a single 2026 snapshot), *and* with an honesty correction the current record should carry:
the Nov 2024 `flagship-speed-cubes` collection is not a superseded early state, it is a parallel,
still-live taxonomy layer as of Dec 2025, and the roster instability (GAN11/GAN13) is two-directional,
not one.

**Downstream impact / exact records affected:** `data/families/gan-flagship-series.yml` — the
description's "supersession" framing (paragraph beginning "GAN's own 'Series'/collection labelling is
not perfectly stable") should be corrected to describe two parallel taxonomies rather than an
old-vs-new sequence, and the GAN11 CN-absence should be added alongside the already-recorded GAN13
EN-absence. No model re-parenting required — 0 of the 8 models currently under `gan-flagship-series`
would move under this reading.

**Disconfirmation sought:** I looked for any GAN-authored material treating GAN11–17 as *not* one
lineage (e.g. a page treating GAN14 and GAN15 as unrelated products). Found none — GAN's own
technology-history page narrates the magnetic-core lineage as explicitly continuous from GAN11 M Pro
(2020) through MagLev 2.0 (2021) through GAN17 MagDrive (2026, "GAN17 MagDrive is GAN's flagship
maglev 3x3 speed cube"), which is independent of and corroborates the nav evidence. This is the
strongest single piece of evidence for treating the succession as one family, and the pilot's notes
under-cite it relative to its strength.

**Confidence: Medium** (upgraded from what the pilot's single-snapshot citation would support, but not
`High`, because the roster-edge instability (GAN11/GAN13) and the co-existing messy collection layer
mean this is a family whose *existence* is well evidenced but whose *exact current membership* is not
settled by any single source).

---

## Q2. Should `gan-356` absorb the i / i-carry (and ui) lineage?

**Current interpretation:** No — `gan-i-series`, `gan-i-carry-series`, and `gan-ui-series` are kept as
three families, separate from `gan-356`, on the strength of three distinct EN-site collection pages
(`/collections/i-series`, `/collections/i-carry-series`, `/collections/ui-series`) each self-titled as
its own named series. Six model records (`gan-356-i`, `gan-356-i2`, `gan-356-i3-v2`, `gan-356-i-carry`,
`gan-356-i-carry-2`, `gan-356-i-carry-e`, `gan-356-i-carry-s` — seven, not six; see correction below)
carry "GAN356" as a literal name-prefix but are filed under `gan-i-series`/`gan-i-carry-series`, not
`gan-356`.

**Correction to the task brief's count:** the brief states "six" — I count **seven** current model
records whose own name begins "GAN356" and sit outside `gan-356`: `gan-356-i`, `gan-356-i2`,
`gan-356-i3-v2` (under `gan-i-series`), and `gan-356-i-carry`, `gan-356-i-carry-2`,
`gan-356-i-carry-e`, `gan-356-i-carry-s` (under `gan-i-carry-series`).

**Strongest alternative interpretation:** GAN's own naming *did* originally treat the smart line as
part of GAN356 — its own tech-history page states "2019 was GAN's Year One of intelligence... the
first-generation competitive-tier smart cube, the GAN356 i, arrived" (i.e. "GAN356 i" as one
contiguous product name, not "GAN356" + a separate "i" sub-brand), and the earliest smart-carry
generations (`i carry`, `i carry 2`, `i carry E`, `i carry S`, `i3`) all retained the "356" prefix for
years. A family boundary drawn strictly on shared name-prefix, as this archive draws it everywhere
else, would put these seven models inside `gan-356`.

**What I found, independently checked:** GAN's own naming for this line changed over time in a way
that resolves this in the pilot's favour, but the evidence needs to be stated more precisely than the
existing family records do. Every current-generation product in both lines has **dropped** the "356"
prefix while **keeping** the "i"/"i carry" infix: `GAN i4` (not "GAN356 i4"), `GAN i4 Maglev Minions
Edition`, `GAN i carry 4`, `GAN i carry 4 Minions Edition`, `GAN i carry 4 Year of the Horse`, `GAN i
carry 4 SSL Limited` (confirmed directly from `gancube-collections-i-series` and
`gancube-collections-i-carry-series`, both independently refetched and matching the cited source
excerpts exactly). That is a manufacturer naming decision, made over roughly five to six years, about
which word carries the line's own identity going forward: not "356," but "i" and "i carry." Under
DATA_MODEL's own reasoning-by-analogy ("a version number is strong evidence about design change and
weak evidence about configuration" — here, a shared *prefix* is strong evidence about the platform a
product was *originally built on*, and weak evidence about what GAN itself now treats as that
product's own persisting family name once the prefix is later dropped while the *other* infix
persists), this favours keeping `i`/`i carry` as the operative family identity, with "356" recorded
(as the current family descriptions already do) as an early platform-kinship marker, not the family
name.

I additionally found, and the pilot's session log does not mention, that this three-way EN-site
collection split (`/collections/i-series`, `/collections/i-carry-series`, `/collections/ui-series`) is
**recent**: all three collection URLs have exactly one Wayback capture each, all dated **2026-08-11**,
in the full 102-URL `gancube.com/collections/` prefix listing I pulled directly. A Nov 2024 product
page's own "Smart Cubes" nav dropdown (the same `gan14-maglev-pro` page used for Q1) lists GAN356
i-carry and ui products together in one flat, undifferentiated list with no sub-headings — matching
what I also found on `gancube.cn`'s own nav (`gancube-cn-gan-v100-nav`, independently re-verified): a
single unified "智能系列" (Smart Series) heading listing i-carry and ui products together, with no
sub-category distinguishing "i carry" from "ui" at all. **The three-way collection-page split is,
at minimum, a 2026 formalisation of a distinction that individual product naming had already carried
for years — it is not evidence the distinction is brand-new, but it is also not evidence GAN's own
site has consistently presented these as three separate collections throughout the line's history.**
This is exactly the "distinguish current state from historical state" caution the task brief asks for:
the three-collection evidence is a 2026 snapshot of GAN's current organisation, not a claim about how
GAN organised this line in 2019–2025.

**Recommended ontology:** Keep the three-way split (`gan-i-series`, `gan-i-carry-series`,
`gan-ui-series`), separate from `gan-356`. The operative evidence is the recurring "i"/"i carry"/"ui"
naming infix carried by every generation of each line under its own independent numbering (i, i2, i3,
i4; i carry, i carry 2, i carry E, i carry S, i carry 4), which is present from each line's earliest
generation and has outlived the "356" prefix — not the EN-site collection pages, which are recent and
should not be over-weighted as if they were long-standing. The mechanical/platform kinship to GAN356
(and, for `ui`, to `gan-flagship-series` specifically — see the `ui` note below) should be recorded via
the `smart_version_of` relationship at model/variant level in Pass 3/4, exactly as the existing family
records already anticipate, rather than by merging families.

**A genuine asymmetry worth flagging, not yet resolved:** `ui`-line product names do not carry their
own independent numbering the way `i`/`i carry` do — every `ui` product's name is parasitic on a
specific `gan-flagship-series` model name plus the "ui" infix (`GAN12 ui Maglev` mirrors `GAN12
Maglev`; `GAN16 ui Maglev MAX` mirrors `GAN16 Maglev MAX`). This is structurally different from `i`
and `i carry`, which have their own self-contained numbering unconnected 1:1 to any specific 356 or
flagship generation. `ui` is defensible as its own family (the infix does persist as a naming thread
across GAN12→GAN16), but it is closer to a **recurring smart-electronics option applied to whichever
mechanical model is current** than to an independently-designed product line — worth a second look at
Pass 4 when `smart_version_of` links are actually drawn, since the answer may turn out to be "ui is not
a family at all, only a modifier on gan-flagship-series models," in which case `gan-ui-series` would
need to be retired and its models re-parented as flagship-series models/variants instead. I did not
find sufficient evidence in this pass to resolve it either way; recording it as an open question is
the honest outcome here, not a decision.

**Downstream impact / exact records affected:** No re-parenting recommended. If Pass 4 later decides
`ui` is not an independent family, that would move 5 models (`gan-ui-12-freeplay`, `gan-ui-12-maglev`,
`gan-ui-12-sp`, `gan-ui-16-maglev-max`, `gan-ui-mini-freeplay`) into `gan-flagship-series`, but that
is explicitly a Pass 4 question, not resolved here.

**Disconfirmation sought:** I looked for GAN material treating "i"/"i carry" as *still* part of
GAN356's own identity as of 2026 (which would support a merge). Found none — every current-catalogue
product name for both lines has dropped "356." I also looked for evidence the three collection pages
are old (which would strengthen the split further); found the opposite (all three dated 2026-08-11
in Wayback, no earlier captures under those exact URLs).

**Confidence: Medium-High** on keeping the split; **Low/Unresolved** on whether `ui` specifically
deserves independent family status versus being a `gan-flagship-series` modifier.

---

## Q3. How does GAN itself organise these lines — gancube.com vs gancube.cn?

This is where the two sites diverge most informatively, and where I found the clearest single
ontological insight of this audit, worth stating plainly because it should govern how every future
GAN nav/collection citation in this archive is weighted:

**Neither site's top-level navigation is organised by product lineage.** I pulled the full nav
structure from a fresh `gancube.cn/gan-v100/` fetch (independently re-verifying the pilot's
`gancube-cn-gan-v100-nav` source) and it resolves into exactly these top categories: 智能系列 (Smart),
磁力系列 (Magnetic), 旗舰魔方 (Flagship), 定制系列 (Customize), 异型系列 (Shape-mod), 套装 (Sets),
限定系列 (Limited), plus brand-specific top-level entries for 萌刻魔方 (Monster Go) and Swift Block.
Every one of these headings except the last two is a **feature/price tier**, not a lineage — and each
cuts across product lines: the "磁力系列" (Magnetic) list mixes "356 Maglev" and "GAN 356 M" directly
alongside "GAN16 Maglev," "GAN14 Maglev Pro," and even non-3x3 items (GAN Pyraminx, GAN Skewb M); the
"旗舰魔方" (Flagship) list includes a 2x2 (GAN251 M pro); the "智能系列" (Smart) list mixes i-carry and
ui products with no sub-heading. GAN's own site organises for *shopping by feature*, not for *browsing
by lineage*. The only places actual product-line identity survives on either site are (a) individual
product names themselves, and (b) the EN site's specifically-titled, one-line-per-collection pages
(`i-series`, `i-carry-series`, `ui-series`, `swift-block-3x3-cubes`, `monster-go-3x3-cube`,
`monster-go-smart-cube`) — which, notably, **do not exist for GAN356 at all**. I checked the complete
102-URL `gancube.com/collections/` prefix listing directly: there is no `/collections/gan356` or
equivalent, ever, at any capture date. GAN356's family status in this archive rests entirely on (a),
not (b), which is the right call, but it means the "manufacturer's own collection page" standard the
pilot's notes invoke for the smart lines cannot be applied uniformly — GAN356, the single best-attested
and least disputed family in the whole archive, would fail that specific test.

**Correction to the task framing:** the brief states "the Chinese site has proven more structurally
informative" than the English site. My independent findings support the opposite conclusion for the
specific i/i-carry/ui question: the CN site's single, undifferentiated "智能系列" heading is *less*
informative than the EN site's three distinct collection titles, precisely because CN groups
everything smart into one tier bucket with no further structure. The CN site *is* more informative for
the Flagship-vs-Magnetic-vs-356 question (Q1) because "磁力系列"/"旗舰魔方" are two distinct, separately
maintained headings that corroborate the EN nav's flagship/356 split independently. Which site is more
informative depends on which boundary question is being asked — this should not be treated as a
blanket rule for future GAN research.

**Recommended ontology:** Treat GAN's own site navigation (either language) as **tier/feature evidence**
first, and lineage evidence only secondarily and cautiously — specifically, only when (a) a nav item is
a curated mega-menu dropdown maintained over multiple independent snapshots (not a one-off SEO
collection page), and (b) it is cross-checked against the products' own self-contained naming. Product
naming itself — the recurring word or infix carried in every generation's own name — remains the
primary and most reliable evidence for family boundary on this manufacturer, exactly as it already is
for GAN356, GAN354, GAN357, Swift Block, and Monster Go.

**Confidence: High** on the "nav = tier evidence, not lineage evidence" finding itself (directly
observed, multiply corroborated); **Medium** on exactly how much weight the nav evidence should
therefore retain for the specific families that lean on it (`gan-flagship-series`, the three smart
lines).

---

## Q4. `gan-v100` boundary — does the exclusion from `gan-flagship-series` still hold?

**Current interpretation:** V100 is its own family, excluded from `gan-flagship-series`, on four
pieces of evidence, with a caveat already recorded that discounts evidence point 1 (the "Advanced
Series" breadcrumb) because the same label was found, and dismissed, on GAN11–GAN15.

**What I found:** My Q1 finding directly resolves the open question in that caveat, and resolves it
**in favour of the existing exclusion, on firmer grounds than the current caveat states.** The
caveat frames "Advanced Series" as possibly an *old label for what became Flagship Series* — implying
V100's "Advanced Series" breadcrumb might just mean V100 predates a later rename into Flagship Series.
That framing is not correct: I found "Advanced Series"/"Flagship Series" co-occurring on the *same*
GAN14 product page in Nov 2024, meaning "Advanced Series" is not a retired predecessor label — it is a
**parallel, currently-still-used auto-tagged breadcrumb category** that disagrees with the curated
Flagship Series nav dropdown for products already firmly inside that dropdown. This means the V100
"Advanced Series" breadcrumb genuinely carries close to **zero** evidentiary weight either way (not
"reduced but still contributing," as the current caveat implies) — it is exactly the kind of
disagreeing auto-tag GAN14 also carries, and GAN14 is undisputed. The exclusion conclusion should now
rest entirely on evidence points 2–4 (the CN 磁力系列-not-旗舰魔方 placement, TheCubicle's "the flagship
GAN16" language, and the flat 3x3 listing excluding V100 from the curated nav dropdown), which I
independently re-verified and which hold up: my own fresh `gancube.cn/gan-v100/` fetch reproduces the
cited 磁力系列/旗舰魔方 split exactly, and confirms GAN V100 appears only under 磁力系列.

**Recommended ontology:** No change to the family boundary — V100 stays excluded from
`gan-flagship-series`. Recommend updating the record's caveat paragraph to reflect the corrected
mechanism (parallel disagreeing taxonomies, not a retired label) rather than leaving the current
"if X was once GAN's own label for what became Y" framing, which is now known to be the wrong
explanation even though it reaches the same practical conclusion.

**Downstream impact / exact records affected:** `data/families/gan-v100.yml` description only —
no re-parenting, no model changes. 0 models affected.

**Confidence: High** (up from the record's own implicit "reduced but still uncertain" framing).

---

## Q5. `gan-i` / `i-carry` / `ui` — GAN's own structure, or retailer categorisation?

Already addressed substantively in Q2. Summary answer: **GAN's own**, on product-naming grounds
(three lines, each with its own multi-generation numbering, recurring across `i`, `i carry`, and `ui`
infixes since each line's earliest generation) — not retailer categorisation, and the archive was
correct not to source this from retailer taxonomy. The EN-site three-collection-page evidence the
pilot leans on most heavily is real but recent (Aug 2026 only); it should be treated as corroboration
of a naming pattern already visible in the products themselves, not as the primary evidence, since on
its own it says nothing about 2019–2025.

**Confidence: Medium-High**, as in Q2.

---

## Q6. Monster Go — smart vs mechanical split (`monster-go-3x3` vs `monster-go-smart-cube-series`)

Briefly audited, not disputed. `monster-go-3x3` and `monster-go-smart-cube-series` mirror the
GAN-side mechanical/smart split (`gan-356` vs the three `i`/`ui` families) on the same underlying
evidence type: two separately-titled GAN-storefront collections (`Monster Go 3x3 Speed Cubes` /
`Monster Go Smart Cube Series`), each a genuine named-collection page (unlike the tier-bucket nav
categories discussed in Q3), each corroborated by product-level description text (app connectivity,
onboard sensors, for the smart line only). I did not find contrary evidence and did not attempt to
independently re-verify every cited source line-by-line given the low apparent risk here relative to
the GAN-side questions the brief asked me to prioritise. Applying this audit's Q3 finding
retroactively — collection pages with a genuine, specific, single-topic title are admissible lineage
evidence; generic tier-bucket nav headings are not — these two Monster Go records pass the stricter
test cleanly. No change recommended. **Confidence: Medium** (not independently re-verified to the same
depth as the GAN-branded questions).

---

## Q7. Swift Block boundary

Briefly audited, not disputed. `swift-block-3x3` is a single family covering "Swift Block 355S",
"Swift Block 355 Maglev", and a 2026 product ("Swift Block 3x3 Super Maglev") that drops the "355"
numeral — already flagged in the existing record as an unresolved naming-shift lead for Pass 3, not
smoothed over. I confirmed via the full `gancube.com/collections/` prefix listing that Swift Block has
three separate collection pages on GAN's storefront (`swift-block`, `swift-block-3x3-cubes`,
`swift-block-klotski`) — the `klotski` page is a distinct, unrelated sliding-block puzzle type, already
correctly excluded from this archive's scope by the existing record. No change recommended.
**Confidence: Medium** (same caveat as Q6 — not independently re-verified to the same depth).

---

## Summary of recommended actions (none touch `data/`)

1. Correct `gan-flagship-series.yml`'s description: the Nov 2024 `flagship-speed-cubes` collection is
   a parallel, still-live taxonomy layer (confirmed live as late as Dec 2025), not a superseded early
   state. Add the GAN11 CN-absence (Nov 2025 capture) alongside the already-recorded GAN13 EN-absence
   as a second, mirror-image roster-instability data point.
2. Correct `gan-v100.yml`'s caveat paragraph: "Advanced Series" is a parallel auto-tagged breadcrumb
   category, not a retired predecessor label for "Flagship Series" — both co-occur on an undisputed
   GAN14 product page in Nov 2024. The practical exclusion conclusion is unchanged and should be
   stated with higher confidence than the current text implies.
3. Flag `gan-ui-series` for a Pass 4 re-examination of whether "ui" is an independent family at all,
   versus a smart-electronics modifier on `gan-flagship-series` models (its product naming is
   parasitic on flagship model names in a way `i`/`i carry` are not). Not resolved in this pass.
4. No family should be merged. No family should be split further. **0 of the 41 GAN-branded model
   records currently on file require re-parenting** under any recommendation in this audit.

---

```yaml
agent: C
scope: gan-family-boundary-audit
worktree: rm-c
date: 2026-09-03
data_edited: false
questions:
  - id: Q1
    topic: gan-flagship-series existence and roster
    current: single family, GAN11-17, curated-nav evidence
    recommendation: keep as one family; correct description (parallel not sequential taxonomies;
      two-directional roster instability GAN11 + GAN13)
    models_reparented: 0
    confidence: medium
  - id: Q2
    topic: gan-356 vs i/i-carry/ui absorption
    current: three separate smart families, kept apart from gan-356
    recommendation: keep split; naming-infix evidence (i/i-carry persist after 356 dropped) is
      primary, EN collection pages (dated 2026-08-11 only) are secondary corroboration not
      historical proof
    correction: seven current model records (not six) begin "GAN356" and sit outside gan-356
    models_reparented: 0
    confidence: medium_high
  - id: Q3
    topic: gancube.com vs gancube.cn as ontology evidence
    finding: neither site's top nav is organised by lineage; both are feature/price tier buckets
      cutting across families; CN is more informative for flagship-vs-356, EN is more informative
      for i/i-carry/ui, contra the brief's blanket claim that CN is generally more informative
    recommendation: weight curated multi-snapshot nav evidence over one-off collection/breadcrumb
      pages; weight product self-naming above both
    confidence: high_on_finding / medium_on_downstream_weighting
  - id: Q4
    topic: gan-v100 exclusion, "Advanced Series" caveat
    finding: "Advanced Series" and "Flagship Series" co-occur simultaneously on an undisputed
      GAN14 product page (Nov 2024) - parallel disagreeing taxonomies, not sequential labels
    recommendation: exclusion conclusion unchanged, confidence raised, caveat text should be
      corrected to state the right mechanism
    models_reparented: 0
    confidence: high
  - id: Q5
    topic: i/i-carry/ui - GAN structure or retailer taxonomy
    recommendation: GAN's own, on naming-infix grounds; same as Q2
    confidence: medium_high
  - id: Q6
    topic: monster-go smart vs mechanical split
    recommendation: no change; genuine named collections, not tier buckets
    confidence: medium
  - id: Q7
    topic: swift-block boundary
    recommendation: no change; naming-shift lead already correctly flagged, not resolved here
    confidence: medium
open_questions_for_pass_4:
  - is gan-ui-series an independent family or a smart-electronics modifier on
    gan-flagship-series models (naming is parasitic on flagship model names)
  - gan13 / gan11 flagship-roster edge instability (discontinuation dating)
total_models_recommended_for_reparenting: 0
```
