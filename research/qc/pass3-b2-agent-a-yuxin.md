# Pass 3, Batch 2, Agent A — YuXin model enumeration

Lane: 7 frozen zero-model YuXin families — `yuxin-huanglong`, `yuxin-little-magic`,
`yuxin-kylin`, `yuxin-black-kirin`, `yuxin-3x3`, `yuxin-fire`, `yuxin-water`.

Read first: `research/qc/pass3-admission-policy.md` (S6), DATA_MODEL.md §1.4/§4.2,
`schema/model.schema.json`, RESEARCH_SPEC.md §3.6a. House style modelled on
`data/models/moyu/moyu-weilong-v2.yml`, `moyu-rs3m-2020.yml`, `x-man-tornado-v4.yml`.

## Method

Pre-existing evidence position (from the task brief) was: `huanglong`, `little-magic`,
`kylin`, `black-kirin` had `thecubicle-yuxin-collection-2025` (tier 2) + the wiki (tier 4);
`yuxin-3x3`, `fire`, `water` had only the tier-4 wiki.

Rather than stop at that position, I went to YuXin's own live site (666toy.com, verified
live) and crawled its per-line product categories (HuangLong Series, Little Magic Series,
Black Kirin Series) via Wayback captures and direct live fetches, reading full product-page
text (item numbers, spec bullets) rather than just category-listing titles. This is tier 1
manufacturer material and materially raised the evidence bar for four families beyond the
starting tier-2/tier-4 position.

For the three tier-4-only families (`yuxin-3x3`, `fire`, `water`), per §3.6a I added a
non-US/English retailer: **cubezz.com**, a China-based international speedcube retailer,
swept via a full Wayback CDX domain enumeration (~38,900 distinct URLs, collapsed by
urlkey) rather than a `/products/` prefix (cubezz's URL scheme is `/Buy-<id>-<slug>.html`
at the domain root, not a `/products/` path — the prefix sweep required by §3.6a's letter
does not apply to this URL shape, so a full-domain enumeration was substituted and is
recorded as the equivalent check). This resolved `fire`, corroborated the generation
numbering for `huanglong-v2` and `little-magic-v2`/`v3`, and — after an exhaustive search —
did **not** resolve `yuxin-3x3` or `water`.

I also independently re-swept `thecubicle-yuxin-collection-2025`'s own CDX prefix
(reproduced, not just trusted) and confirmed it carries no `fire`, `water`, or bare
`yuxin-3x3` path either.

## Families and models

### yuxin-huanglong — 2 models

- **yuxin-huanglong-original** (gen 1, item 1523/1523M). Tier 1 (666toy): "standard racing
  Rubik's Cube size, 55.5x55.5x55.5mm... corner block with steel balls, three gasket
  design... magnetic positioning design." Identical text between 1523 and 1523M (differing
  only by the word "Magnetic") is the direct evidence for treating "M" as a variant, matching
  the wiki's own "Factory Magnetized version" framing and thecubicle's single
  `yuxin-huanglong-3x3-m` SKU. `core_system: standard`, `maglev: none`.
- **yuxin-huanglong-v2** (gen 2, item 1524, MagLev). **Boundary call: MagLev vs
  spring/gasket core is a mechanism difference (DATA_MODEL §4.2), so this is a new model,
  not a variant of gen 1**, even though 666toy's own product copy for this item never uses
  the numeral "V2" (only "Maglev Magic Cube"). The "V2" label is corroborated by two
  independent tier-2 retailers using different wording (cubezz: "HuangLong V2 MagLev...VT
  Version"; TheCubicle: `yuxin-huanglong-3x3-v2-m-uv-coated`), so `generation.basis:
  community_convention` (not `manufacturer_declared`, since no tier 1-2 source states "V2"
  in the manufacturer's own prose for this specific item) at `reported` confidence, while
  the identity/existence claim itself sits at `probable`/`confirmed` per the ladder (two
  independent tier 2 sources agreeing).

### yuxin-little-magic — 3 models

- **yuxin-little-magic-original** (gen 1, item 1513). Tier 1: 55.5mm, "Upgraded mold,"
  axis 1.2g, 2mm screws — no magnet mention. 1513M/1513M-UV are magnet/UV-coating variants
  of this one design (`maglev: none`, `core_system: standard`).
- **yuxin-little-magic-v2** (gen 2, item 1673). **Manufacturer's own product title reads
  "Little magic magnetic magic Cube V2" — tier 1 for the "V2" numeral directly**, unlike
  the HuangLong case. New piece-surface geometry ("brick pattern anti-adhesive trough,"
  independently matching the wiki's "brick pattern design on the pieces") plus a new
  spring-tension adjustment handle are the model-boundary basis. `generation.basis:
  manufacturer_declared`, `confirmed`.
- **yuxin-little-magic-v3** (gen 3, item 1722, MagLev). **Hard boundary call, flagged for
  review**: 666toy's own page for this item is filed under the "little-magic-series"
  category but its own title/heading reads **"Small Magic,"** not "Little Magic" — the
  same Kirin/Kylin-style cross-page transliteration inconsistency independently found on
  this manufacturer's Black Kirin pages. I kept it in `yuxin-little-magic` on the strength
  of (a) the manufacturer's own category placement and (b) cubezz's independent, explicit
  "YuXin Little Magic V3 MagLev" naming — but recorded `confidence: uncertain` on `/name`
  specifically, since the product's own manufacturer page title conflicts. This is the
  single largest judgment call in this batch; a human reviewer with more time to search for
  a "Small Magic" identity elsewhere might reasonably split it out instead.

### yuxin-black-kirin — 1 model (not 2)

- **yuxin-black-kirin-original** (item 1541/1553/1740). **Escalation-adjacent finding, not
  a taxonomy change**: 666toy's own site spells this line "Black Kirin" on one product page
  and "Black Kylin" on another, with **word-for-word identical description text** between
  them (55x55x55mm, "built-in adjustment system is adjustable for tightness," "passed
  national certification"). This is direct manufacturer-side proof that "Black Kirin"/
  "Black Kylin" are alternate transliterations of one Chinese name used inconsistently by
  the manufacturer itself, not two products — so I recorded "Black Kylin" as an *alias* on
  the one model, staying inside the already-frozen `yuxin-black-kirin` family rather than
  touching the family layer at all.
- **Black Kirin 3x3 "V2" (tiled), NOT admitted.** The wiki describes a second, tiled 3x3
  generation. I crawled all three category pages on 666toy (55 product URLs total), the
  existing `thecubicle-yuxin-collection-2025` source, and the new cubezz full-domain sweep;
  none show a 3x3-specific "V2" or "tiled" item for this line (only an unrelated 4x4 "V2").
  Per the S6 policy, model identity requires a tier 1-3 source and the wiki alone (tier 4)
  cannot supply it. **Recorded as a documented absence, not fabricated.**

### yuxin-kylin — 1 model

- **yuxin-kylin-v2** (item 1543). 666toy's own title: **"Kylin 1543 Rubik's Cube V2"** —
  tier 1 for "V2" directly. This is a *separate* line from Black Kirin (the wiki itself
  distinguishes them: "It [Kylin V2 M] and the YuXin Black Kirin V2 can be bought with
  transparent plastic" — two related but distinct products), consistent with keeping
  `yuxin-kylin` and `yuxin-black-kirin` as separate frozen families. No "Kylin V1" (without
  "Black") was found by any source — the family's own note that a V1 is implied but
  undocumented stands as an open lead, not fabricated. `generation.basis:
  manufacturer_declared`, `confirmed`.

### yuxin-fire — 1 model

- **yuxin-fire-original**. Not found anywhere on 666toy.com (a full-domain CDX sweep, 6,719
  URLs, returned zero "fire" matches — consistent with the wiki's own "no longer in
  production" framing of this brand era). Found instead at **cubezz.com** (the §3.6a
  non-US retailer), whose product title is **"Fire Kylin,"** not plain "Fire," with a real
  spec table: 56x56x56mm, 68g. Model's primary `name` kept as "YuXin Fire" to match the
  frozen family; "Fire Kylin" recorded as an alias with the discrepancy noted in the
  attestation. **Boundary call: the wiki's "Fire S" is not a separate model** — cubezz
  lists White/Black/Stickerless as three colour options of one consecutive item-number
  triple (4748/4749/4750), so "Fire S" (stickerless) is treated as a variant, not the
  wiki's implied second generation.

### yuxin-3x3 — zero models (concluded)

YuXin's own first, unnamed 3x3, per the wiki "no longer in production... widely replaced by
Little Magic." Searched: 666toy.com full-domain CDX sweep (6,719 URLs, no plain "3x3"
product beyond brand-name pages and unrelated puzzles), `thecubicle-yuxin-collection-2025`
(no bare `yuxin-3x3` path, already documented), cubezz.com full-domain sweep (only
"YuXin 1x3x3 Magic Cube" [a cuboid] and "YuXin 3x3x3 Interlocked Cube Puzzle" [a different
mechanical puzzle] — neither is a 3x3x3 Rubik's-type cube). **No tier 1-3 source naming a
distinct "YuXin 3x3" product was found. Concluded zero models this pass** — a legitimate
outcome per pass3-admission-policy.md §7, not fabricated to fill a count.

### yuxin-water — zero models (concluded)

Per the wiki, the stated successor to Fire. Searched the same three channels as above
(666toy full-domain sweep, thecubicle's existing source, cubezz full-domain sweep) — no
"water" match against YuXin anywhere (cubezz's only "water" hits are an unrelated brand,
"Cubetwist Water Cube"). **No tier 1-3 source found. Concluded zero models this pass.**
The family's own `successor_family_id`/lineage claims are untouched (family layer is out of
my lane); this only means no *model* record could be admitted under this family this pass.

## §3.6a compliance record

- **Non-US/English retailer**: cubezz.com, full-domain CDX sweep (not a `/products/`
  prefix — cubezz's URL scheme doesn't use one; substituted a full-domain enumeration,
  noted above). Outcome recorded per family, positive (fire, huanglong-v2, little-magic-v2/
  v3 corroboration) and negative (3x3, water — explicitly "swept, nothing new found").
- **Archived retailer sweep**: re-verified `thecubicle-yuxin-collection-2025`'s own CDX
  prefix independently rather than trusting the prior record uncritically; confirmed its
  absence claims for fire/water/bare-3x3.
- **Manufacturer's own site**: 666toy.com, live-verified (per the task brief) — crawled
  three product categories (HuangLong, Little Magic, Black Kirin Series) across their own
  pagination, reading full product-page text, not just titles.

## Dates

**No `released`/`announced` date was set on any of the 7 models.** Two distinct
manufacturer-CMS date artifacts were observed and explicitly NOT used:

1. 666toy's "Related products" sidebar module shows a uniform **`2018-07-16`** across
   dozens of unrelated HuangLong products (megaminx, 17x17, pyraminx, 4x4) with no shared
   launch relationship — a manufacturer-side instance of the same catalogue-migration-
   artifact pattern this archive already documents for retailer "Added:" fields.
2. 666toy's category-listing pages show per-item dates that vary more plausibly
   (`2025-07-22`, `2025-01-08`, `2024-10-24`), but these are bare date stamps next to a
   product entry with no accompanying prose — structurally the same risk profile as a
   retailer "Added:" field, not an explicit dated statement. Not used.

Both are recorded in `666toy-huanglong-3x3-products.yml`'s `excerpt`/`preservation_note` so
the next researcher does not re-discover and re-litigate them.

## Escalations

**One, not a taxonomy violation but flagged for awareness**: the Black Kirin/Black Kylin
spelling inconsistency is *within* the single frozen `yuxin-black-kirin` family (I did not
move anything between families), but a reviewer should be aware the manufacturer's own site
is internally inconsistent about which spelling names the family, in case this surfaces
again in variant research (pass 4) under a name I didn't check (e.g. a "Black Kirin V2" SKU
that might in fact be findable under a "Black Kylin"-spelled URL I didn't crawl, or vice
versa — I did crawl all three category pages, but 666toy's site search was not exhaustively
tried).

**One naming uncertainty carried into a model record rather than resolved**:
`yuxin-little-magic-v3`'s `/name` attestation is `uncertain` because the manufacturer's own
product-page title ("Small Magic") conflicts with the family it was ultimately filed under.
Recommend a human check whether "Small Magic" surfaces elsewhere in this archive (other
manufacturers/pass agents) as its own identity before treating this placement as settled.

## Sources created

- `data/sources/666toy-huanglong-3x3-products.yml` (tier 1)
- `data/sources/666toy-little-magic-3x3-products.yml` (tier 1)
- `data/sources/666toy-black-kirin-kylin-3x3-products.yml` (tier 1)
- `data/sources/cubezz-yuxin-3x3-collection-2026.yml` (tier 2)

Reused: `speedsolving-wiki-yuxin-products` (tier 4, corroboration only, per its existing
tier-4 hold), `thecubicle-yuxin-collection-2025` (tier 2), `666toy-about-us` (unused this
pass, already existed).

## `npm run check` status

Full `npm run check` (schemas, validate, lint, duplicates, build, privacy, selftest,
coverage) passes clean at every commit point in this batch. 0 errors, 0 warnings.

## Commits (branch `b2-a`)

- `2112e65` — 7 models (huanglong x2, little-magic x3, black-kirin x1, kylin x1, fire x1)
  plus 4 sources.

## Machine-readable summary

```yaml
models:
  - id: yuxin-huanglong-original
    family_id: yuxin-huanglong
    name: "YuXin HuangLong 3x3"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: probable
  - id: yuxin-huanglong-v2
    family_id: yuxin-huanglong
    name: "YuXin HuangLong V2 MagLev"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: yuxin-little-magic-original
    family_id: yuxin-little-magic
    name: "YuXin Little Magic 3x3"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: probable
  - id: yuxin-little-magic-v2
    family_id: yuxin-little-magic
    name: "YuXin Little Magic M V2"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: confirmed
  - id: yuxin-little-magic-v3
    family_id: yuxin-little-magic
    name: "YuXin Little Magic V3 MagLev"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: reported
  - id: yuxin-black-kirin-original
    family_id: yuxin-black-kirin
    name: "YuXin Black Kirin 3x3"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: confirmed
  - id: yuxin-kylin-v2
    family_id: yuxin-kylin
    name: "YuXin Kylin V2"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: confirmed
  - id: yuxin-fire-original
    family_id: yuxin-fire
    name: "YuXin Fire 3x3"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported

zero_model_families:
  - id: yuxin-3x3
    reasoning: "No tier 1-3 source names a distinct 'YuXin 3x3' product; 666toy full-domain
      sweep, thecubicle, and cubezz full-domain sweep all checked and negative."
  - id: yuxin-water
    reasoning: "No tier 1-3 source names a distinct 'YuXin Water' product; same three
      channels checked and negative."

escalations:
  - topic: "yuxin-black-kirin / yuxin-black-kylin spelling"
    kind: within-family, not a taxonomy violation
    detail: "Manufacturer's own site uses both spellings with identical product text for
      the same item; recorded as an alias, families left untouched."
  - topic: "yuxin-little-magic-v3 naming"
    kind: uncertain-name-attestation, not resolved
    detail: "Manufacturer's own product-page title reads 'Small Magic'; filed under
      yuxin-little-magic on category-placement + retailer-naming grounds; /name attestation
      recorded uncertain for human review."
```
