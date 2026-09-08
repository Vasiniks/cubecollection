# P26-5 Agent A — CubeTwist 3x3x3 adjudication

**Status:** COMPLETE. Researched by the Agent A lane (Sonnet 5), which was killed by a session
rate limit after writing and validating its source records but before committing them or writing
this report. The evidence survived on disk and was recovered; this report was completed by the
main session from those sources rather than by re-running the lane. See ledger `P26-8`.

**Disposition: A — genuine missing family. Confidence: `confirmed`.**

---

## 1. Verification of existing evidence

The candidate was raised because `data/manufacturers/cubetwist.yml` states:

> *"No standard WCA-legal 3x3 was found under the CubeTwist name this pass"*

and classes CubeTwist a **novelty specialist** alongside HelloCube, VeryPuzzle and Calvin's.
Pass 2.6 Agent D contradicted that with two retailer listings (Cubezz 2015, Lightake 2011).

Those two remain valid but were **not** what settled this. Agent D itself flagged the weakness:
**Lightake mirrors Cubezz's SKU numbers**, so under RESEARCH_SPEC §3.2 they corroborate
*existence* without being independent evidence of specs. On that basis alone CubeTwist would sit
at `reported`, which is why it was held as a candidate rather than admitted with the four
established families.

## 2. Retailer-duplication test

The concern was real and is now moot: the case no longer rests on the retailer pair. A third,
structurally independent retailer channel was found — **SpeedCubeShop** maintained a dedicated
`/cubetwist` brand landing page (OpenCart `route=product/manufacturer` pattern) with its own
brand logo asset (first captured 2013-11-21) and its own entry in the site's Brand filter
(`speedcubeshop-cubetwist-brand-page-2014`).

Honest limitation, recorded rather than glossed: the 2014-06-30 capture of that grid reads
*"There are no products to list."* The brand page proves SpeedCubeShop **carried the brand as a
recognised manufacturer** — it does not itself show a 3x3 in stock. A separate "CubeTwist Bag"
accessory SKU (captured 2012-12-08) confirms at least one real CubeTwist SKU was stocked there.

## 3. Independent third channel — **a first-party manufacturer source was found**

This is the finding that settles the candidate, and it is the first first-party CubeTwist source
located by any pass.

**`cubetwist-com-2010-official-site`** — `kind: manufacturer_official`, **tier 1**. The company's
own site, whose `<title>` pairs the Latin brand "cubetwist" with the Chinese brand name
**梯色魔方**, with a Guangzhou address (Room 4009, International Toy City, Yide Road West, Yuexiu
District), phone, QQ and email, and a "版权所有 2009-2010" copyright line.

Its own top-level product navigation reads:

| Category | Meaning |
|---|---|
| 二阶梯色魔方 | 2x2 |
| **三阶梯色魔方** | **3x3x3 — its own category** |
| 四阶梯色魔方 | 4x4 |
| 七阶梯色魔方 | 7x7 |
| **异形梯色魔方** | **shaped/novelty — a SEPARATE category** |
| 梯色魔板 · 梯色贴纸 · 梯色魔方配件 · 梯色魔方教程 | board · stickers · parts · tutorials |

**The manufacturer itself separates its standard 3x3x3 line from its novelty/shape-mod line.**
That is manufacturer-declared structure, not retailer inference, and it is exactly what the
frozen record denied existed.

**`cubetwist-com-2010-3x3-listing`** — tier 1, the products under that category:
`三阶原色` (original colour, updated 2010-07-28), `三阶黑面` (black face, updated 2010-06-07),
`三阶白面` (white face, referenced by adjacent-item navigation), `三阶DIY散件` (3x3 DIY
loose-parts kit), and separately a `4.0cm三阶钥匙扣` (40mm 3x3 keychain).

## 4. Family-vs-model test

> Does "CubeTwist 3x3x3" identify a product LINE, or one product?

**A line, on the manufacturer's own evidence.** The archive's documented signal for line identity
is cross-puzzle-range naming, and CubeTwist's own navigation shows the brand's cube line spanning
2x2 / **3x3** / 4x4 / 7x7 as parallel categories. The 3x3x3 category is not a single SKU: it
holds at least three colourways plus a DIY kit.

Applying DATA_MODEL §4.2 to what sits inside it:
- **Original colour / black face / white face** — colourways. **Variants**, Pass 4 material.
- **DIY loose-parts kit** — assembled vs unassembled is a choice made at assembly from the same
  mould. **Variant**, not a second model. This matches the archive's own `cube4you-3x3`
  precedent and Agent D's independent reading.
- **40mm keychain** — a different size in an adjacent catalogue position. Left open; a size
  sibling is normally within-family (the `dayan-zhanchi` 42mm precedent) but this one was not
  fetched, so it is recorded as a lead, not adjudicated.

**Expected model count: one.** That is unremarkable here — single-model families are the archive
norm (`cube4you-3x3`, `eastsheen-3x3`, `shengshou-aurora`, `-wind`, `-pearl` all have exactly one).

## 5. Scope

**`scope_class: core`.** A standard 57mm/94g 3x3x3 with a plain sticker finish is WCA-legal on its
face, and the manufacturer files it in its own standard-cube category, explicitly apart from its
异形 (shaped/novelty) line.

On the archive's 2016–2026 window: the tier-1 site is 2009–2010 and Lightake's listing is 2011,
both earlier — but Cubezz carried the product continuously **from 2015 through at least 2026**, so
circulation spans the window squarely. A pre-2016 origin is not disqualifying in this archive:
`dayan-guhong-v1` (2010), `dayan-zhanchi-v1` (2011) and `dayan-lingyun-v1` are all `core`.

**CubeTwist's other products stay out.** Its shape mods, bandaged kits, mirror blocks and star
cubes belong to the 异形 category by the manufacturer's own classification and are not folded into
this family.

## 6. Disposition + confidence

**A — genuine missing family. `confirmed`.**

`vocab/confidence.yml`: `confirmed` = "Tier 1 source, or two independent Tier 2 sources in
agreement." Two tier-1 manufacturer_official records establish both the brand identity and the
existence of a dedicated 3x3x3 line. Retailer evidence at Cubezz, Lightake and SpeedCubeShop
corroborates commercial circulation across three publishers and two continents.

**What is NOT confirmed, and is not claimed:** no release date (the 2010 page-update timestamps
bound *page* revision, not launch; `introduced` takes a `before` circulation bound). The specs
57mm/94g come from Cubezz, a single retailer — `probable`, not confirmed. The keychain's
relationship to the line is unresolved.

**This finding also overturns `P26-4`:** `cubetwist.yml`'s "novelty specialist" framing and its
"no standard WCA-legal 3x3 was found" statement are contradicted **by the manufacturer's own
site**. The record needs correcting, not merely supplementing.

## 7. Ready-to-execute proposal

```yaml
family:
  id: cubetwist-3x3
  manufacturer_id: cubetwist
  name: "CubeTwist 3x3"
  aliases: ["梯色魔方三阶", "CubeTwist Speed 3x3x3", "CubeTwist Speeding Magic Cube"]
  introduced: {value: "2010", precision: year, qualifier: before}   # circulation bound, NOT a release date
  positioning: budget
  status: sourced
  attestations:
    /name:        {confidence: confirmed, sources: [cubetwist-com-2010-official-site, cubetwist-com-2010-3x3-listing]}
    /introduced:  {confidence: probable,  sources: [cubetwist-com-2010-3x3-listing]}   # page-update bound only
    /positioning: {confidence: probable,  sources: [cubezz-cubetwist-speed-3x3]}
model:
  id: cubetwist-3x3-standard
  scope_class: core
  specs: {size_mm: 57.0, weight_g: 94.0}   # probable, Cubezz only
  # colourways + DIY kit + possible 40mm keychain are PASS 4 variant material, not models
```

## 8. Leads not chased

- The `4.0cm三阶钥匙扣` 40mm keychain — adjacent catalogue position, not fetched. Size sibling or
  separate item, unresolved.
- `三阶白面` (white face) — referenced by adjacent-item navigation, page not independently fetched.
- Whether cubetwist.com survived past 2010 — only the 2010 captures were examined.
- Whether Cubezz and Lightake's shared SKUs originate from CubeTwist's own wholesale numbering
  (which would make the mirroring innocuous) or from one reselling the other.

## Machine-readable summary
```yaml
candidate: cubetwist-3x3
disposition: A
confidence: confirmed
evidence:
  - cubetwist-com-2010-official-site      # tier 1
  - cubetwist-com-2010-3x3-listing        # tier 1
  - cubezz-cubetwist-speed-3x3            # tier 2
  - cubezz-cubetwist-3x3-diy-kit          # tier 2
  - lightake-cubetwist-speeding-3x3       # tier 2, SKU-mirrors cubezz
  - speedcubeshop-cubetwist-brand-page-2014  # tier 2, brand page only
independent_publishers: 3
first_party_source_found: true
is_line_identity: true
scope_class: core
overturns_frozen_record: true    # cubetwist.yml "novelty specialist" / "no standard 3x3"
authorize_mutation: false        # main-session decision, per the adjudication protocol
```
