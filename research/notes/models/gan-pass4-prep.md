# Pass 4 preparation — GAN variant enumeration

**Local indexing only.** No web research was performed, no records were created or modified, and
no agent was run. This file exists so the Pass 4 agent starts from the repository's own evidence
instead of rediscovering it.

**Nothing below is a fact.** The leads come from `research/staging/variants/`, written by an agent
that was cut off mid-task across three failed waves. They are unverified, partial, and in at least
one case demonstrably wrong about a URL (Pass 2 found a cited `/en/` technology page with no
archive capture at all). Every lead must be re-sourced before it enters a record.

---

## 1. The 47 models, by family

### `gan-356` — 13 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-356-air` | Air | gan |
| `gan-356-air-s` | Air S | gan |
| `gan-356-m` | M | gan |
| `gan-356-m-e` | M E | gan |
| `gan-356-maglev` | MagLev | gan |
| `gan-356-me-v2` | Me V2 | gan |
| `gan-356-r` | R | gan |
| `gan-356-rs` | RS | gan |
| `gan-356-rs2` | RS2 | gan |
| `gan-356-s-v2` | S V2 | gan |
| `gan-356-x` | X | gan |
| `gan-356-x-v2` | X V2 | gan |
| `gan-356-xs` | XS | gan |

### `gan-357` — 1 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-357-original` | GAN357 | gan |

### `gan-354` — 2 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-354-m` | M | gan |
| `gan-354-m-v2` | M v2 | gan |

### `gan-flagship-series` — 8 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-flagship-11` | 11 | gan |
| `gan-flagship-12` | 12 | gan |
| `gan-flagship-13` | 13 | gan |
| `gan-flagship-14` | 14 | gan |
| `gan-flagship-15` | 15 | gan |
| `gan-flagship-16` | 16 | gan |
| `gan-flagship-17` | 17 | gan |
| `gan-mini-m-pro` | Mini M Pro | gan |

### `gan-v100` — 2 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-v100-leap` | Leap | gan |
| `gan-v100-maglev` | MagLev | gan |

### `gan-i-series` — 4 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-356-i` | i | gan |
| `gan-356-i2` | i2 | gan |
| `gan-356-i3-v2` | i3 V2 | gan |
| `gan-i4` | i4 | gan |

### `gan-i-carry-series` — 5 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-356-i-carry` | i Carry | gan |
| `gan-356-i-carry-2` | i Carry 2 | gan |
| `gan-356-i-carry-e` | i Carry E | gan |
| `gan-356-i-carry-s` | i Carry S | gan |
| `gan-i-carry-4` | i carry 4 | gan |

### `gan-ui-series` — 4 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `gan-ui-12-freeplay` | 12 ui FreePlay | gan |
| `gan-ui-12-maglev` | 12 ui Maglev | gan |
| `gan-ui-12-sp` | 12 ui SP | gan |
| `gan-ui-mini-freeplay` | Mini ui Free Play | gan |

### `monster-go-3x3` — 4 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `monster-go-352-m` | 352 M | monster-go |
| `monster-go-cloud-rainbow-ut-3x3` | Cloud & Rainbow & UT | monster-go |
| `monster-go-magnetic-3x3` | Magnetic | monster-go |
| `monster-go-standard-3x3` | Standard | monster-go |

### `monster-go-smart-cube-series` — 1 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `monster-go-3ai` | 3 Ai | monster-go |

### `swift-block-3x3` — 3 model(s)

| model id | generation | manufacturer |
|---|---|---|
| `swift-block-355-maglev` | 355 Maglev | swift-block |
| `swift-block-355s` | 355S | swift-block |
| `swift-block-super-maglev` | Super Maglev | swift-block |

---

## 2. Candidate leads, by axis

Extracted from 10 staging files, 799 lines, **40 candidate leads**. Grouped by the variant axis
they belong to, with the models they appear to attach to.

### Coatings — 5 leads
`UV Coated` · `Frosted` · `Matte` · `Soft Texture Coated` · `None / uncoated`

Maps to `vocab/coatings.yml`, which currently offers `none | frosted | uv | matte | aftermarket |
other | unknown`. **"Soft Texture Coated" has no vocabulary value.** If it is real and distinct,
the vocabulary needs a value; if it is marketing language for an existing finish, it is an alias.
Do not force it into `other` without deciding which.

### Sticker application — 4 leads
`Stickered` (a "Master" tier with the sticker set pre-applied) · `Unstickered` (DIY, bare plastic,
sold as its own SKU) · `Stickerless` (GAN's default from circa 2016) · `Hybrid`.

All four exist in `vocab/colorway-application.yml`. The interesting one is **Unstickered sold as
its own SKU** — that is a purchasable configuration, so a variant, not a colourway note.

### Colourways — 7 leads
GAN's own "Limited Edition" colourway roster (tier 1 for the names) · `AQUALIS` (GAN16 MagLev MAX
2026 Summer LE) · `Amyth` (GAN16 MagLev MAX Winter LE) · `Dual-WR Limited Edition` (GAN16 MagLev
MAX UV) · `NewBlack` (an internal plastic colour/material, **not** a coating — do not file it as
one) · `Christmas Edition` (GAN356 ME) · a discontinued 2019–2020 named-colourway wave on the
GAN356 Air S/X family: `Love Pink`, `Flora Blue`, `Crystal Blue`.

**None of these names appears in any model record**, which is correct — they are variants. Pass 4
attaches them.

### Magnet configurations — 3 leads
`GMS` (GAN Magnetic System — interchangeable capsules, user-adjustable without disassembly) ·
corner-core / omnidirectional magnetic core · **`Air S` vs `Air SM` — magnets present or absent as
two named SKUs of nominally the same shell.**

That last one is the textbook §4.2 case: same design, different parts at assembly → **variant**,
not a model. Both currently resolve only to `gan-356-air-s`.

### Core systems — 4 leads
IPG steel-plastic core, non-user-adjustable generations (v1–v4, 2015–2017) · quantifiable-adjustment
IPG core · smart ball core · **GAN V100's "Ball-Core"**, which the staging file itself flags as a
possible naming collision with the smart ball core rather than the same mechanism.

Staging carries an explicit open question: *does the stock, unmodified GAN V100 use a ball-core
mechanism?* No model record mentions "Ball-Core" at all.

### MagLev — 3 leads
MagLev origin as "Magnetic Core 2.0" (2021) · `ball_core_maglev` (combined) · **MagLev sold as an
alternative core choice to spring/non-MagLev on the same product page.**

The third is a direct tension with the model tree: if MagLev is a purchasable option on one page it
is a **variant** axis — yet `gan-356-maglev` and `swift-block-355-maglev` exist as their own
models, split on separate-URL evidence. Both readings may be right for different products. Pass 4
must not resolve this by pattern.

### Adjustment systems — 3 leads
`GES` / `GES+` (Numerical IPG plus GAN Tension Nut) · dual-adjustment / tri-adjust core ·
**GAN356 X's interchangeable IPG version sold as a purchasable configuration line** (IPG v5 named
in the product title).

`gan-356-x` already records this in prose as a `model.revisions[]` candidate. Pass 4 should decide
whether IPG version is a revision, a variant, or both — a revision the manufacturer then sold as a
distinguishable SKU is both, and the schema supports that via `revision_ref` on the variant.

### Smart / electronic — 4 leads
`GAN356 i` as first-generation (2019) · **GAN 12/16 "ui" built on a named mechanical base** ·
the smart line having its own internal variant axis (coating, core and edition all recur inside it) ·
digital-only bundled content (app skins, avatar frames) — **not a physical variant**, and should not
become one.

### Limited editions — 4 leads
`GAN 356 Air UM Max Park Signature Edition` — **run size explicitly stated and numbered** ·
`GAN16 MagLev MAX UV (Dual-WR Limited Edition)` — run size stated · GAN's flagship seasonal LE
programme (no run size stated) · an earlier 2019–2021 named-colourway LE wave.

Two products with **stated run sizes** are unusual and valuable: `edition.limited.run_size` is
normally `null`. Everything else stays `null` — never estimated, never inferred from a product
being described as rare.

### Signature editions — 3 leads
`GAN 356 Air UM Max Park Signature Edition` (GAN-issued) · `GAN16 MagLev MAX UV Dual-WR` (tribute to
a sponsored athlete's records — **check whether this is a signature edition or a commemorative
one**; they are different `edition.types` and it may be both) · TheCubicle's own signature-style
tuning products, which credit a speedcuber but are **retailer-named**, so `modified_from` variants
with `coating_applied_by`, not GAN signature editions.

---

## 3. High-priority models for Pass 4

Ranked by evidenced variant density — count of product-page sources already in `data/sources/`
crossed with the leads above. This is an empirical ranking from repository material, not a guess.

| Priority | Model(s) | Why |
|---|---|---|
| 1 | `gan-flagship-11` | GAN's own **"GAN11 Series"** single product page carries M Pro / M / Air / M Duo together. One page, several sold configurations — the densest single variant cluster found, and a §4.2 test case |
| 2 | `gan-v100-maglev`, `gan-v100-leap` | 8 sources for 2 models: Minions Edition, Chinese New Year Edition, Year of the Horse, UV-coated Easter combo, plus base pages. Highest source-to-model ratio in the archive |
| 3 | `gan-flagship-16` | AQUALIS, Amyth, Dual-WR LE (run size stated), **and** a `GAN16 ui Maglev MAX` that has no model record — see gap G1 |
| 4 | `monster-go-*` (5 models) | 11 sources, and Pass 3 flagged two of its own boundary calls for reconsideration |
| 5 | `gan-356-air`, `gan-356-air-s` | Air UM, Air SM, Max Park Signature, and the 2019–20 colourway wave all attach here |
| 6 | `gan-356-x`, `gan-356-x-v2` | IPG version as revision-or-variant; the named colourway wave |
| 7 | `swift-block-*` | 8 sources for 3 models |
| 8 | `gan-356-m-e`, `gan-356-me-v2` | Christmas Edition; ME/MEv2 boundary |

---

## 4. Unresolved model/variant boundary questions

Pass 4 must investigate each. **None may be resolved by pattern-matching another product's answer.**

**Q1 — GAN 356 Air UM.** GAN's own brand story names "the GAN Air UM" as a 2016 milestone, and a
retailer source record exists (`thecubicle-gan-356-air-um`). There is **no `gan-356-air-um` model**.
Is UM a separate design, or a magnet configuration of `gan-356-air`? It currently appears only in
prose inside `gan-356-air` and `gan-356-s-v2`.

**Q2 — Air S vs Air SM.** Magnets present or absent, two named SKUs, nominally one shell. Almost
certainly a variant pair under §4.2 — but "almost certainly" needs evidence that the shell is
genuinely shared.

**Q3 — The GAN11 Series sub-configurations.** M Pro, M, Air, M Duo on one manufacturer page. If
they are assembly choices they are variants of `gan-flagship-11`. If any has different tooling it
is its own model. Pass 3 created one model; Pass 4 tests that.

**Q4 — MagLev: axis or design?** Sold as an alternative core choice on a shared page for some
products, and on separate URLs for others (`gan-356-maglev`, `swift-block-355-maglev` were split on
exactly that evidence). Both readings can be correct for different products. Do not unify.

**Q5 — V100 "Ball-Core".** Possibly a naming collision with the smart ball core. Staging raises it
explicitly; no model mentions it. Also still open from Pass 3: why V100 exists parallel to the
numbered flagship line, and an unreconciled 62 g / 64 g weight discrepancy on GAN's own V100 Leap page.

**Q6 — Monster Go standard vs magnetic.** Pass 3 **split these under acknowledged uncertainty** and
flagged them for reconsideration: they may be one shell with and without magnets, which would make
them a variant pair. Splitting was the correct direction to err — it is recoverable by merge — but
the question is live.

**Q7 — `monster-go-cloud-rainbow-ut-3x3`.** Carries a `duplicate_of` relationship at `uncertain`
confidence pointing at `monster-go-magnetic-3x3`. Resolve or leave queued; do not merge silently.

**Q8 — Monster Go 328 Spelling Cube Set.** Excluded by Pass 3 as probably a lettered-sticker variant
of an existing shell. Confirm which shell, or confirm it is out of scope.

**Q9 — IPG version.** Revision, variant, or a revision that was sold as a distinguishable SKU? The
schema supports the third via `revision_ref` on a variant.

---

## 5. Reusable sources

**84 source records, all archive-preserved**, none needing re-fetch. Cite by id.

| kind | count | tier | use in Pass 4 |
|---|---|---|---|
| `manufacturer_official` | 49 | 1 | Primary for configuration, colourway names, edition status |
| `retailer` | 33 | 2 | Corroboration, aftermarket variants, alias harvesting |
| `wiki` | 2 | 4 | Leads only |

**63 are product pages** — directly reusable for variant enumeration. Highest-value clusters:

- V100: `gan-v100-maglev-product`, `-leap-year-of-the-horse-product`, `-leap-chinese-new-year-edition-product`, `-maglev-minions-edition-product`, `-uv-coated-2026-easter-combo-product`
- Flagship: `gan11-series-product`, `gan12-maglev-product`, `gan13-maglev-product`, `gan14-maglev-product`, `gan15-product`, `gan16-maglev-product`, `gan17-magdrive-product`
- Smart: `gan-i4-smart-cube-product`, `gan12-ui-freeplay-product`, `gan12-ui-sp-product`, **`gan16-ui-maglev-max-product`**
- Sub-brands: `monster-go-352-m-product`, `gan354-m-v2-product`

**F3 still applies:** rule 9 counts distinct source ids but cannot detect two retailers copying one
spec table. Matching wording means one source. The `source-auditor` independence map that would
catch this has never survived a session, so `confirmed` claims resting on two tier-2 sources remain
provisional.

---

## 6. Known gaps

**G1 — `GAN16 ui Maglev MAX` has a source but no model.** `data/sources/gancube-gan16-ui-maglev-max-product.yml`
records GAN's own product page, titled "GAN16 ui Maglev MAX | GANCUBE", appearing in GAN's own
"GAN ui Series" navigation. The `gan-ui-series` family contains only 12-series models and a Mini.
**This is a Pass 3 gap, not a Pass 4 task** — a missing model record, and the model-researcher owns
that lane. Flag it rather than creating a variant under the wrong parent.

**G2 — Zero `model.revisions[]` entries across all 47 models.** The revision layer is entirely
unpopulated, despite `gan-356-x` describing an IPG-version revision candidate in prose. Undeclared
mid-production changes are collector-relevant and community-identified; nothing has captured any.

**G3 — 45 of 47 models are undated.** Only `gan-v100-maglev` and `gan-v100-leap` carry `announced`
dates, and none carries `released`. Prior passes correctly refused to infer dates from gancube.com's
November 2024 site-wide archival event. This is a real gap for a chronological exhibition and needs
a dedicated dating effort against retailer listings and press, not more capture-mining.

**G4 — Vocabulary gap: "Soft Texture Coated"** has no value in `vocab/coatings.yml`. Decide whether
it is a distinct finish or an alias before a variant needs it.

**G5 — Specs convention split.** The 37 `gan` models leave `model.specs` absent; the 10 sub-brand
models record explicit `unknown`. Both accurate, differently shaped. Pass 5 must reconcile before
coverage figures compare like with like.
