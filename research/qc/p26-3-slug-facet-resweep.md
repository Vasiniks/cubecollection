# P26-3 — slug-form blindness re-sweep (Lane G)

## SCOPE

A previous lane (Lane B, `research/qc/p4-9-enumeration-methods-lane-b.md`) found that
TheCubicle's brand-collection slug for QiYi is `qiyi-mofangge`, not the archive id `qiyi` —
`/collections/qiyi/products.json` returns `{"products":[]}` (HTTP 200, zero products, no
error) despite QiYi being TheCubicle's largest-volume brand tested (247 products). Lane B's
finding was incidental to a methodology comparison run on 4 manufacturers. This lane's job is
to measure how widespread that failure mode is across **all 54 manufacturers in the archive**,
against **both** TheCubicle and SpeedCubeShop, and to repair (via new sourced variant records
and/or documented mismatches) whatever it finds — not to re-run Lane B's methodology work.

Three known severities of slug-form blindness, most to least severe:
1. spelling variants of the same brand token in the *product* slug (`gan356-` vs `gan-356-`);
2. the brand token is absent from the product slug entirely (Ziina Star, Calvin's Puzzle);
3. **the retailer's *collection* slug is not the manufacturer id** (`qiyi` -> `qiyi-mofangge`)
   — this is the one that silently zeroes out a whole manufacturer's collection-based sweep,
   and is this lane's primary target.

## METHOD

STEP 1 — Build the candidate list. For every manufacturer id in `data/manufacturers/`
(54 total), determine the collection slug actually used by TheCubicle and by SpeedCubeShop.
Do not assume the slug equals the archive id. Enumerate each retailer's `/collections.json`
(paginated) rather than guessing one slug at a time, then also probe
`/collections/<candidate>.json` directly for ids that don't appear to have an obvious match,
including a pinyin/full-name variant (this is what caught `qiyi-mofangge`, whose title is
"QiYi (Mofangge)" or similar full-brand naming).

STEP 2 — For each manufacturer where the real collection slug differs from the archive id, or
where no collection exists but the vendor facet does, record the mismatch with evidence
(collection JSON showing zero products at the archive-id slug where applicable, and the real
slug's product count).

STEP 3 — Cross-check with the Shopify vendor facet: `/products/<handle>.json` exposes a
`vendor` field, authoritative for brand attribution where the slug is not. Used to confirm a
mismatch is real (not a coincidentally-named unrelated collection) and to surface products at
that collection not otherwise found.

STEP 4 — For every 3x3 product surfaced this way that is not already in the archive, adjudicate:
3x3 vs other form factor; already in the archive under another name (grep `data/models/` and
`data/variants/`); bundle/service/spare-parts/lubricant; model vs variant per DATA_MODEL §4.2.

## HARD CONSTRAINTS (restated for this file's own discipline)

- Taxonomy frozen at 54 manufacturers / 132 families / 269 models. No manufacturer, family or
  model may be created, renamed or deleted here. A genuinely missing model is recorded as an
  escalation candidate only.
- Variant records may be added only when properly sourced and clearly a variant of an existing
  model.
- No invented release dates, specs, or legality. `unknown` = searched and not found; absence of
  a field = not searched.
- `ziina.com` (UAE payments company) is never cited for the Ziina cube brand.
- Shopify `grams` / "Gross Weight" / "Package Weight" are shipping figures, never product
  weights (rule 45). "Item Weight" is usable.
- TheCubicle `Added:` dates are catalogue-ingestion artefacts, not release dates. Known artefact
  dates: 2018-09-11, 2018-11-07, 2018-10-14, 2018-07-16.
- web.archive.org has been intermittently 503/504 today. Where an archive capture cannot be
  obtained, sources here use `preservation_method: excerpt` with a `preservation_note` flagging
  re-verification, never a fabricated `archive_url`.
- macOS BSD grep does not support `-P`; `grep -E` / awk only.

## TARGETS

All 54 manufacturer ids in `data/manufacturers/` (see full list obtained via
`ls data/manufacturers/*.yml`), x {thecubicle.com, speedcubeshop.com} collection slugs, cross
checked against the Shopify vendor facet. Base commit: e286e3f on main.

## PROBE DISCIPLINE

Every count below is preceded by: inspection of several actual matches by hand, inspection of
the matching logic itself, a known-positive test (a case certain to match) and a known-negative
test (a case certain not to match), with the measured false-positive rate reported alongside
the count. A large probe result without this is recorded as a LEAD, not a finding.

## STATUS

RESEARCH COMPLETE for STEP 1/2 (all 54 manufacturers, both retailers, via full `/collections.json`
enumeration rather than one-slug-at-a-time guessing) and for STEP 3 (vendor-facet search-suggest
checks on every manufacturer with no dedicated collection at a given retailer). STEP 4
adjudication done for every genuinely new candidate surfaced. One variant added. Several
escalation candidates recorded, not admitted. See UNRESOLVED for what a follow-on pass should
still do.

## FINDINGS

### A. Method actually used for STEP 1 (stronger than one-slug-at-a-time guessing)

Rather than probing `/collections/<candidate>.json` one guess at a time, both retailers'
**entire** collection index was fetched and matched against all 54 archive manufacturer ids:
`https://www.thecubicle.com/collections.json?limit=250` (166 collections, fits on one page) and
`https://speedcubeshop.com/collections.json?limit=250&page={1,2}` (354 collections, two pages).
Every collection's `handle` AND `title` were matched against every manufacturer's id and full
name (normalised: lower-cased, non-alphanumerics stripped) — this is what satisfies the
instruction to "try the brand's Chinese/pinyin full name too," since a manufacturer's `name`
field (e.g. "MoFang JiaoShi") was matched against collection *titles*, not just handles, and
this is exactly the mechanism that caught the `qiyi`/`qiyi-mofangge` case in the first place.
Full per-manufacturer classification (EXACT id==handle / SPELLING id!=handle but same
normalised form / TITLE-ONLY match under a wholly different handle / ABSENT):

| id | TheCubicle | SpeedCubeShop |
|---|---|---|
| qiyi | **TITLE-ONLY -> `qiyi-mofangge`** | EXACT `qiyi` |
| mfjs | EXACT `mfjs` | **TITLE-ONLY -> `mofang-jiaoshi`** |
| x-man-design | **TITLE-ONLY -> `x-man-designs`** | **TITLE-ONLY -> `x-man-designs`** |
| monster-go | SPELLING -> `monstergo` | EXACT `monster-go` |
| zcube | EXACT `zcube` | SPELLING -> `z-cube` |
| mohuanshousu | ABSENT | SPELLING -> `mohuan-shousu` |
| cubicle-labs | EXACT `cubicle-labs` | ABSENT (real slug `cubelab`, found via vendor facet, see C) |
| thecubicle | TITLE-ONLY -> `cubicle` | ABSENT |
| all other 47 ids | EXACT or ABSENT (no collection at all) | EXACT or ABSENT (no collection at all) |

An id that is merely ABSENT is not thereby a mismatch — most of the 47 "plain" rows are
manufacturers TheCubicle or SpeedCubeShop simply doesn't carry as a dedicated collection (see C
for which of those are real discoverability gaps vs. genuine non-carriage).

### B. Confirmed severity-3 mismatches (collection exists, real slug != archive id), verified live

Each row below was verified by fetching **both** `/collections/<archive-id>/products.json` and
`/collections/<real-slug>/products.json` directly (not inferred from the collections index
alone), confirming the archive-id slug is genuinely empty and the real slug is genuinely
populated:

| retailer | archive id | archive-id slug result | real slug | real slug result |
|---|---|---|---|---|
| TheCubicle | `qiyi` | 0 products (HTTP 200, `{"products":[]}`) | `qiyi-mofangge` | 247 products, vendor "QiYi" |
| TheCubicle | `x-man-design` | 0 products | `x-man-designs` | 34 products, vendor "X-Man Design" |
| TheCubicle | `monster-go` | 0 products | `monstergo` | 9 products, vendor "MonsterGO" |
| SpeedCubeShop | `zcube` | 0 products | `z-cube` | 31 products, vendor "Z-Cube" |
| SpeedCubeShop | `x-man-design` | 0 products | `x-man-designs` | 17 products, vendor "X-Man Designs" |
| SpeedCubeShop | `cubicle-labs` | 0 products | `cubelab` | 1 product, vendor "CubeLab" |

The `qiyi` case reproduces (independently re-verified, not merely re-cited) the finding already
reported in `research/qc/p4-9-enumeration-methods-lane-b.md` finding 6. The other five are new
to this lane. **Every one of these six would silently read as "brand not carried" to a sweep
that assumes collection-slug == archive-id, exactly the failure mode 3.6a check 3 exists to
name** — and two of them (`x-man-design`/`x-man-designs`, `zcube`/`z-cube`) are pure spelling
variants (plural, hyphenation) of the kind already flagged for product slugs, now shown to
recur at the *collection* level too, at BOTH retailers independently for `x-man-design`.

**Checked negatives — collection exists under a plausible alternate slug but is genuinely
empty, not a hidden miss.** `mfjs` -> SpeedCubeShop's `mofang-jiaoshi` collection exists (it
appears in `/collections.json`) but returns **zero** products at both `mfjs` and
`mofang-jiaoshi`. Investigated further: SpeedCubeShop currently vendors ALL of MFJS's historic
product lines (MeiLong, HuaMeng TG) as **"MoYu"**, not "MFJS" or "MoFang JiaoShi" — confirmed by
reading `/collections/moyu-meilong/products.json` and `/collections/moyu-huameng/products.json`
directly (10/3 products, `vendor: "MoYu"` on every one). TheCubicle, by contrast, still vendors
the identical product lines as `MFJS` (86 products) and `HuaMeng` (7 products) separately,
matching the archive's own manufacturer boundaries. This is a genuine cross-retailer identity
collapse at SpeedCubeShop, not a discoverability bug — nothing is hidden there to find, so
`mfjs`/`mohuanshousu` (same zero-both-slugs result, see below) are recorded as **checked,
negative**, not as misses.

### C. STEP 3 — vendor-facet (search-suggest) sweep for every manufacturer with no dedicated collection

For every manufacturer ABSENT from a retailer's collection index, Shopify's own predictive
search API (`/search/suggest.json?q=<name>&resources[type]=product&resources[limit]=10`) was
queried and results filtered to `vendor` **exactly equal** to the manufacturer's name (not "any
result returned" — see PROBE DISCIPLINE below for why that distinction matters and what it
measured). This is the live equivalent of "the retailer's collection slug is not the
manufacturer id... or no collection exists but the vendor facet does."

**Genuine vendor-facet-only presence found (collection absent, real 3x3 products exist under
the exact vendor name):**

TheCubicle — CubeStyle, CubeTwist, Cyclone Boys (also has its own SCS collection), Eastsheen,
GuoGuan (`YueXiao Core`), HelloCube (Gear Cube — shape mod), KungFu (Gear Cube — shape mod),
Newisland, Ninja (Ghost Cube — shape mod), VeryPuzzle (Tuttminx — shape mod), WitEden.
SpeedCubeShop — HaiTun, MoreTry (also has its own TC collection), Swift Block (also has its own
TC collection), Cubicle Labs (as `CubeLab`, see B).

**Confirmed negative (no exact-vendor hit at all, despite the API returning up to 10 unrelated
results per query):** FangShi (TC), GiiKER (both), GuoJia (both), MoJue (both), MoHuanShouSu
(TC — corroborates B's SCS negative), QJ (both), SenHuan (TC — the one apparent hit,
"SenHuan ZhanLang 2x2 Sticker Set," is vendored `TheCubicle`, not `SenHuan`), Xinlexin (both,
zero results), Yancheng (both), Particula (TC), Mefferts (SCS, only shape-mod hits).

### D. STEP 4 — adjudication of every genuine candidate

**Added as a new variant (properly sourced, clearly a variant of an existing model):**
`Swift Block Super 3x3 (Umbreon, Pokémon Series)` — found only via SpeedCubeShop's vendor facet
(Swift Block has no collection at SpeedCubeShop at all; its 3 existing archive models rest
entirely on `gancube.com` first-party pages, which do not mention this edition). Stated size
(55mm) and weight (71g, taken from the product's own "Specs at a glance" text, never from
Shopify's `grams`/`weight` fields — those read 84g on this listing and are refused as shipping
weight per rule 45) match the existing `swift-block-super-maglev` model exactly, and the
mechanism description ("dual magnetic ring," "MagLev," "8-level GES") is near-verbatim the same
model's first-party description — read as a Pokémon-licensed colourway/collaboration option of
the same design, not a new model, per DATA_MODEL §4.2. `collaboration_with` left empty and
`collaboration_name: "Pokémon"` used instead, since Pokémon is a licensed property, not a
person or manufacturer the schema can reference — the same treatment already used for
`gan-i-carry-4--minions-edition`. New source:
`data/sources/speedcubeshop-swift-block-super-3x3-umbreon-pokemon-2026.yml`. New variant:
`data/variants/swift-block/swift-block-super-maglev/umbreon-pokemon-edition.yml`.

**Confirmed already in the archive (negative findings — the corrected slug/facet does NOT
surface anything new here):**
- `GuoGuan YueXiao Core` — product_type "Accessories," body text: "the same core that comes
  with the GuoGuan YueXiao... compatible with the YueXiao Hardware Set," weight 2g. A spare
  part, explicitly excluded by the task's own adjudication checklist.
- `CubeStyle Penrose 3x3` — product_type is literally `"Shape Mods"` in Shopify's own field,
  despite "3x3" in the title (same naming pattern already flagged for QiYi Bubble/DNA/Sandwich
  Cube in Lane B). Not a 3x3.
- HaiTun: all four SpeedCubeShop "WaveRider V2 3x3" tiers (Ultimate, Flagship, Standard,
  Pioneer) already exist as `data/variants/haitun/haitun-waverider-v2/{ultimate,flagship,
  standard,pioneer}.yml`. Complete.
- WitEden: TheCubicle's vendor-facet hits `WitEden & Oskar 3x3 Mixup` and `WitEden 3x3 Mixup
  (Edge-Split)` already exist as `witeden-mixup-oskar` / `witeden-mixup-edge-split`. (The
  remaining WitEden hits — 3x3x9, 3x3x7, 3x3x8, 2x2x4, 3x3x17 — are cuboids, out of this
  archive's 3x3 scope.)
- Newisland: all three TheCubicle hits (`Lightning`, `Lightning V2`, `Phoenix`) already exist as
  `newisland-lightning-original`, `newisland-lightning-v2`, `newisland-phoenix-standard`.
  Complete, despite Newisland having no dedicated TheCubicle collection.
- MonsterGO: using the corrected `monstergo` slug (9 products), every 3x3-typed listing —
  `3x3 (UT)`, `3x3 (Magnetic)`, `3x3 (Cloud)`, `3x3 (Traditional)`, `352M 3x3` — already maps
  onto an existing model/variant (`monster-go-cloud-rainbow-ut-3x3`'s `cloud-blue`/`cloud-pink`/
  `ut`/`rainbow` variants, `monster-go-magnetic-3x3`, `monster-go-standard-3x3` — "Traditional"
  reads as TheCubicle's own name for what GAN's own page calls "Standard" — and
  `monster-go-352-m`). Complete; the confirmed slug fix changes nothing here.
- X-Man Design (both retailers, corrected `x-man-designs` slug, 34 TC / 17 SCS products):
  every hit maps onto an existing Tornado V1-V4/XT3-V1 model **except** `X-Man Tornado V5`,
  which is already `confirmed_missing` in `research/qc/p4-9-adjudication.yml` (key
  `xmantornadov5`) — not a new finding, just re-confirmation via the corrected slug.

**Escalation candidates — NOT added, taxonomy is frozen, recorded here for main/model-researcher:**

1. **Z-Cube is a bare manufacturer (zero families, zero models) with a confirmed, populated
   product line at BOTH retailers.** TheCubicle's own `zcube` collection (matches the archive
   id exactly, no slug issue there) has 33 products including at least 9 genuinely 3x3-typed
   ones never enumerated by any prior pass: `Z 3x3 M (Metal Tiles)`, `Z Autograph Cube 3x3 (UV
   Printed)`, `Z Glow in the Dark 3x3` (stickered and unstickered), `Z Maze 3x3`, `Z Rainbow
   3x3`, `ZCube 3x3 (UV Printed)`, `ZCube Golden Mahjong 3x3` (standard and magnetic), `ZCube
   Golden Mogao-Caves 3x3` (standard and magnetic), `ZCube Mahjong 3x3`. SpeedCubeShop's real
   `z-cube` collection (mismatched from the archive id, see B) independently corroborates a `Z
   3x3 (Carbon Fiber)` and `Z Mahjong 3x3 (Magnetic)`. `data/manufacturers/zcube.yml` itself
   already flags that the Speedsolving wiki (its only source) describes Z-Cube as "often...
   repackag[ing] cubes from other brands such as QiYi," naming specifically "the Z Carbon Fiber
   3x3 is a QiYi Warrior W restickered with carbon fiber-style stickers" — TheCubicle's and
   SpeedCubeShop's own live catalogues corroborate that this product still exists, unprompted.
   Z-Cube was registered at Pass 1 (manufacturer-only) and explicitly never carried forward to a
   family/model pass; this is not a slug bug causing silent loss so much as a genuinely
   unstarted manufacturer that this lane's method happens to make very easy to start, since the
   correct-slug evidence is now sitting in this file. **Recorded as an escalation, not
   admitted** — no family or model created.
2. **Cubicle Labs `Mini 1cm 3x3 - World's Smallest Cube!`** (SpeedCubeShop, vendor `CubeLab`,
   product_type "3x3") — Cubicle Labs is `kind: service` in the archive (per its manufacturer
   record, a TheCubicle-linked magnetising/relabelling operation whose products normally attach
   as variants of OTHER manufacturers' base models, e.g. the already-archived
   `gan-356-air--um`). A "world's smallest cube" novelty micro-cube does not obviously fit that
   modified-base-model pattern (no base model was identified this pass), and TheCubicle's own
   `cubicle-labs` collection (which DOES match the archive id) is entirely lubricant products
   under vendor `TheCubicle`, a different line sharing only the name. Left as an escalation
   rather than guessed at.
3. **Cyclone Boys "Metallic" 3x3 line** (TheCubicle, vendor `Cyclone Boys`, product_type "3x3,"
   confirmed real spec: 57mm, magnetic, 93g "Item Weight," per the product's own structured spec
   tags) — `Cyclone Boys Metallic 3x3 M`, `(Macaron)`, `(Gradient)`, plus a 2x2 counterpart and
   a `Mirror M`. None of the five existing Cyclone Boys models (`feichi-g3`, `feichi-original`,
   `feijue-original`, `feiwu-original`, `mini-3x3-original`) are named "Metallic" in the
   archive, and the product's own description does not reference any of those names, so this
   was not treated as an unstated variant of a specific existing model — that would be
   guessing which one. Recorded as an escalation candidate (possibly a genuinely missing model
   line), not added.
4. **MoreTry TianMa X3+ has a large, unenumerated depth gap at TheCubicle's OWN `moretry`
   collection** (which has no slug problem — exact match — so this is a byproduct of verifying
   it during this sweep, not a new discoverability mechanism). Of 17 3x3-typed listings there,
   only 5 configurations are represented among the current
   `data/variants/moretry/moretry-tianma-x3-plus/*.yml` files. Not yet represented at all:
   `Single-Magnetic + Frosted`, `Full-Magnetic`, four `8-Magnet Ball-Core` SAOCube-SE tiers
   (MagLev / MagLev+UV / UV / "Year of the Horse Edition"), two `32-Magnet Ball-Core` SAOCube-SE
   tiers (MagLev / Magnetic), `Core-Magnetic + UV ZCube SE`, and a SECOND ZCube-collab SKU split
   into `ZCube Edition 3x3 (Standard)` and `(Enhanced)` against the archive's single existing
   `zcube-edition` variant. This is real depth work (each needs its own spec extraction and a
   materiality call), not something to force through under this lane's slug-mismatch mandate;
   recorded here so it is not rediscovered from scratch. Handles are listed above for whoever
   picks it up.
5. **X-Man Tornado V4 has un-adjudicated SKUs** surfaced by the corrected `x-man-designs` slug:
   `10th Anniversary Limited Edition`, `(Flagship) - PiCube Special Edition`, and an `AI 3x3 UV
   (Zephyr LE)` — none clearly matched against the three existing `x-man-tornado-v4` variant
   files (`pioneer-uv`, `standard`, `v4-ai`). Not investigated further this pass; flagged as a
   depth lead, not adjudicated as new or duplicate.

### E. Structural note, not a mismatch

GAN and MoYu have **no single umbrella collection at SpeedCubeShop at all** (confirmed:
`/collections/gan/products.json` returns 0 products; MoYu likewise has no plain `moyu` handle,
only ~13 sub-collections like `moyu-meilong`, `moyu-v10`). This is a genuine structural
difference from TheCubicle (which has one `gan` and one `moyu` collection each), not a
recoverable "correct slug" case — there is no single right answer to substitute. Not actioned;
both manufacturers already have extensive archive coverage and dedicated depth lanes elsewhere.

## PROBE DISCIPLINE

**STEP 1 (collections-index matching).** Known positive: the method's title-normalisation step
was required to, and did, surface `qiyi` -> `qiyi-mofangge` (title "QiYi") and
`mfjs` -> `mofang-jiaoshi` (title "MoFang JiaoShi") — cases where the id itself has zero
relationship to the real handle and only the full manufacturer name recovers it. Known
negative: `moyu` was correctly left ABSENT rather than matched to any of its ~13
`moyu-<something>` sub-collections at SpeedCubeShop, because the matching required either an
exact/normalised handle match or an exact title match — a bare substring match was tried and
immediately produced a clearly-wrong result (`huameng` "matching" `moyu-huameng`, `rubiks`
"matching" 27 unrelated Rubik's-branded merchandise collections), so substring hits were
demoted to manual-inspection-only candidates and none were promoted to a "mismatch" finding
without a live products.json check confirming the archive-id slug is actually populated
elsewhere. **Every one of the 6 severity-3 findings in section B was confirmed by live-fetching
both the archive-id slug and the real slug**, not inferred from the collections index alone —
this is what caught that `mfjs`/`mohuan-shousu` are checked negatives (collection exists, both
slugs return zero) rather than false severity-3 claims.

**STEP 3 (search-suggest vendor facet).** Known positive: querying `qiyi` returned products
with `vendor: "QiYi"` consistent with the independently-confirmed 247-product `qiyi-mofangge`
collection. Known negative: querying `particula` at TheCubicle returned 5 results, ALL fuzzy
(GoCube, Rubik's Connected) — zero with `vendor: "Particula"` — confirming the method correctly
reports absence rather than forcing a match. **Measured false-positive rate of the naive
"any result returned" reading:** of the 22 TheCubicle queries and 24 SpeedCubeShop queries run
for manufacturers absent from that retailer's collection index, a non-empty result set came
back for essentially all of them (the API returns its best fuzzy matches even for brands it
does not carry) — but requiring `vendor` to **exactly equal** the manufacturer's name, not
merely "a result was returned," eliminated the fuzzy matches entirely: FangShi, GiiKER, GuoJia,
MoJue, MoHuanShouSu, QJ, Xinlexin, Yancheng, Particula and Mefferts(SCS) each returned 0
exact-vendor hits out of up to 10 results per query, despite every one of those ten queries
returning SOMETHING. A probe reading "any result" as a hit would have over-reported presence
for roughly 10 of the ~22 zero-collection TheCubicle manufacturers alone (cubestyle,
cyclone-boys, eastsheen, hellocube, kungfu, lefun, mefferts, newisland, ninja, verypuzzle,
witeden all DID have genuine hits, so the true rate of "any-result would have been correct" is
mixed — the point is that vendor-exact matching, not result-count, is what separates them, and
every genuine hit reported in section C was individually read for its `vendor` field, not
counted).

## EVIDENCE

Live JSON fetched 2026-09-12 (all under the session scratchpad, not committed — reproducible
via the URLs quoted throughout):
- `https://www.thecubicle.com/collections.json?limit=250` (166 collections, page 1 of 1)
- `https://speedcubeshop.com/collections.json?limit=250&page={1,2}` (354 collections)
- Direct `/collections/<slug>/products.json?limit=250` fetches for every slug named in section B
- `/search/suggest.json?q=<name>&resources[type]=product&resources[limit]=10` for every
  manufacturer named in section C, both retailers
- `/products/<handle>.json` for every product individually adjudicated in section D

New source file with full excerpt and reasoning:
`data/sources/speedcubeshop-swift-block-super-3x3-umbreon-pokemon-2026.yml`.

## CHANGES

- New source: `data/sources/speedcubeshop-swift-block-super-3x3-umbreon-pokemon-2026.yml`
- New variant: `data/variants/swift-block/swift-block-super-maglev/umbreon-pokemon-edition.yml`
- No manufacturer, family, or model file touched. No existing source or variant file edited.
- `npm run check`: 0 errors (see final commit).

## UNRESOLVED

- **The MoreTry TianMa X3+ depth gap (D.4) and the X-Man Tornado V4 sub-variant leads (D.5) are
  not adjudicated**, only surfaced and listed with handles. Each needs its own spec-extraction
  pass; forcing them through under this lane's time budget risked lower-quality records.
- **Z-Cube (D.1) and Cubicle Labs' micro-cube (D.2) are escalations requiring a taxonomy
  decision** (a first family/model pass for Z-Cube; a base-model or original-product call for
  the Cubicle Labs mini cube) that this lane cannot make under the frozen-taxonomy constraint.
- **web.archive.org returned HTTP 429/503 on every attempt this session** (matching the task's
  own advance warning). The new Swift Block source rests on `preservation_method: excerpt` with
  an explicit `preservation_note` flagging re-verification once the service recovers.
- **Not exhaustively checked:** whether TheCubicle's `guoguan`-vendored products beyond
  `YueXiao Core` (this pass only searched, did not enumerate a full GuoGuan vendor facet at
  TheCubicle the way section C's ten-result cap allows) contain anything else new; whether
  Rubik's has a real single-collection equivalent at SpeedCubeShop beyond the ~27 merchandise
  sub-collections found; a full accounting of GAN's and MoYu's SpeedCubeShop sub-collection
  fragmentation (noted in E, not measured against archive completeness).
- Method 1 (archived Wayback CDX prefix sweep) was not attempted for any manufacturer in this
  lane — STEP 1 was satisfied instead by live-enumerating both retailers' full collection
  indexes directly, which this lane judged a stronger check for the specific "collection slug
  != archive id" failure mode than a prefix sweep would be (a prefix sweep tests *product* URL
  prefixes, not collection slugs). Historical-completeness prefix sweeps remain a separate,
  already-covered requirement (RESEARCH_SPEC 3.6b dimension 1).

## NEXT

For whoever continues this lane or picks up its escalations: (1) route Z-Cube and the Cubicle
Labs micro-cube to a taxonomy decision — both are unusually well-evidenced for a "no model yet"
manufacturer; (2) run a proper variant depth pass on MoreTry TianMa X3+ against TheCubicle's own
`moretry` collection (17 3x3 SKUs, only 5 configurations currently represented) and on X-Man
Tornado V4's three un-adjudicated SKUs; (3) adjudicate the Cyclone Boys "Metallic" line as a
possible missing model; (4) if a future pass re-runs 3.6a check 3 for GAN or MoYu at
SpeedCubeShop, do not read a plain `/collections/gan/` or `/collections/moyu/` 404/empty as
"not carried" — both are real, just organised as many sub-collections instead of one.
