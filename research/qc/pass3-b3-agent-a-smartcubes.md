# Pass 3, Batch 3, Agent A — smart-cube cluster (giiker-supercube, giiker-m3, particula-gocube)

Scope: model enumeration for three families in the smart-cube cluster. Family taxonomy is
frozen and was not touched. No variant records were created (pass 4 is frozen and out of
scope for this agent).

Read first: `research/qc/pass3-admission-policy.md` (S6), DATA_MODEL.md §1.4/§4.2,
`schema/model.schema.json`, RESEARCH_SPEC.md §3.6a. House-style reference used:
`data/models/moyu/moyu-weilong-gts.yml`.

---

## Family: giiker-supercube

### Accepted models

**`giiker-supercube-i3`** (`data/models/giiker/giiker-supercube-i3.yml`)
- Existence: `confirmed` — GiiKER's own founding timeline (`giiker-about-us-2022`, tier 1):
  "March: SUPERCUBE(R) i3 released - The world's 1st smart cube."
- Release date: `2018-03`, `confirmed`, tier 1, explicit month-level statement — meets S6's
  strictest evidence class outright.
- Specs: left entirely unset. No surviving product page or retailer spec table for the bare
  "i3" generation was found anywhere (giiker.com `/products/` prefix — 55 URLs; TheCubicle
  `/products/giiker*` — 18 URLs; SpeedCubeShop `/products/giiker*` — 2 URLs — none of these
  three carriers ever lists a standalone "i3" product, only the later i3S).
- scope_class: `core` (smart 3x3, otherwise WCA-format, per this lane's brief).

**`giiker-supercube-i3s`** (`data/models/giiker/giiker-supercube-i3s.yml`) — **the hard call**
- The only documented difference from i3 is software, a Bluetooth chipset revision ("v.4.0"),
  and sticker colour (thecubicle-giiker-super-cube-i3s-2019: "an updated version of the
  previous Giiker Super Cube... updated software, Bluetooth v. 4.0, and bright vibrant
  stickers"). Read in isolation, DATA_MODEL §4.2 would put exactly this class of change at
  **variant** level ("a different core assembly... sold as options of one product... are
  variants, however different they feel in the hand").
- Against that: GiiKER's own official site carries "i3S" as its own standing, separately
  SKU'd product page (`giiker-com-supercube-i3s-product-2022`) — not a firmware push to
  existing i3 units — which is the S6-permitted identity path independent of a shown mould
  difference ("a design/mould/mechanism difference, **OR** a manufacturer-declared
  generation").
- **Resolution: split.** Admitted as a separate model, `generation.basis:
  manufacturer_declared`, but the **identity** attestation (`/generation/basis`) is held at
  `uncertain` — not the existence claim, which is solid — with a `succeeds` relationship to
  i3. This is exactly the DATA_MODEL §4.2 default for unclear cases ("When the evidence is
  unclear, default to new model... confidence: uncertain on the generation claim").
- Specs: `size_mm: 56.5`, `weight_g: 104.6` from TheCubicle's tier 2 spec table (`probable`).
  `magnet_architecture` explicitly left `unknown` — TheCubicle's table for this product has
  **no** "Magnets" row at all (unlike M3's, which says "Magnets: Magnetic"), so magnet
  presence itself, not just arrangement, is unestablished.
- Released: no explicit dated statement found; recorded `2019` `qualifier: before` at
  `uncertain`, sourced to a Wayback crawl-timestamp lower bound (TheCubicle's own capture,
  2019-05-12) per S6 §3's explicit allowance for circulation-only evidence — never presented
  as a release date.

### Candidates considered and not admitted

**"GiiKER Super Cube i3SE"** — named in this task's own brief as a hard call to resolve. No
evidence of its existence was found anywhere swept this pass:
- giiker.com `/products/` prefix (55 URLs) — absent
- giiker.com `/collections/` prefix and a live fetch of `/collections/all` — absent (also
  confirms i3S itself has been delisted from the live site's nav, matching the family
  record's existing decline discussion)
- TheCubicle `/products/giiker*` prefix (18 URLs) — absent
- SpeedCubeShop `/products/giiker*` prefix (2 URLs) — absent
- Cubelelo (non-US retailer, §3.6a) site search for "giiker" — zero GiiKER products of any
  kind found (see §3.6a compliance below)

Classified **not found**, per RESEARCH_SPEC's instruction that a failed/absent sweep is
reported as "not found," never "does not exist." No record created. If a future researcher
finds it (e.g. a Chinese-market listing not covered by this pass's retailer set), it should
be evaluated against the same i3-vs-i3S boundary reasoning above.

### Zero-model finding
None — every candidate found this pass was either admitted (i3, i3S) or is out of 3x3 scope
by category (i2 2x2, excluded, not built into this family; SUPERCUBE charger, an accessory).

---

## Family: giiker-m3

### Accepted models

**`giiker-m3-3x3`** (`data/models/giiker/giiker-m3-3x3.yml`)
- Single-generation family; only one product page for this line survives in any capture
  checked (`thecubicle-giiker-m3-3x3-2020`). Never appears on giiker.com's own captured
  product/collection prefixes at all, nor at SpeedCubeShop.
- Existence: `probable` (single tier 2 source, TheCubicle).
- Identity: this family was already kept separate from `giiker-supercube` at pass 2 on the
  strength of "retains the feel and sound of the original Giiker Smart Cube but without the
  internal electronics" — a deliberate parallel mechanical product, not a checkout
  configuration of the smart cube. No second generation of this specific line was found to
  number this one against, so `generation.ordinal` is left unset.
- `generation.basis` recorded `manufacturer_declared` at `uncertain` — "M3" is TheCubicle's
  own standing product name, not a description phrase, but no giiker.com first-party page
  confirms the name originates with GiiKER itself.
- Specs: `size_mm: 56.5`, `weight_g: 99.0` (`probable`, tier 2). `magnet_architecture` left
  `unknown` — the table says "Magnets: Magnetic" with no arrangement given, following the
  archive's own existing precedent in `dayan-guhong-pro-m.yml` for identical evidence shape.
- Released: `unknown`, explicitly. TheCubicle's in-page "Added: 2018-10-30" field is the same
  kind of catalogue-migration artifact already flagged and rejected on
  `data/families/giiker-m3.yml` (the exact string recurs verbatim on the unrelated i3S page) —
  not used here even as a `before` bound, because it demonstrably does not track this specific
  product.

### Candidates / rejections
None found beyond the single accepted model — no "M3S," "M3 Pro," or other numbered variant
of this line was found at any of the three retailer prefixes checked.

### Zero-model finding
Not applicable — one model admitted.

---

## Family: particula-gocube

### Accepted models

**`particula-gocube-basic`** (`data/models/particula/particula-gocube-basic.yml`)
- The base "GoCube" tier (SKU GC33A), named plainly "GoCube" on the manufacturer's own site,
  sold concurrently with GoCube Edge from the earliest captures found (Sept 2019).
- Existence/identity: `probable`, tier 1 (`getgocube-com-2019-gocube-product`, a new source
  created this pass, plus the already-existing `getgocube-com-2019-basic-edge-skus`).
- Specs: left entirely **unset**. No standalone "GoCube Basic" 3x3 product page was found at
  TheCubicle or SpeedCubeShop (both retailers' captured prefixes carry only Edge and X), and
  GoCube's own page gives no dimensions/weight for this SKU.
- Released: `2019`, `qualifier: before`, `uncertain` — Wayback crawl-timestamp lower bound
  only (page captured 2019-09-16), not a release date.

**`particula-gocube-edge`** (`data/models/particula/particula-gocube-edge.yml`)
- The premium "GoCube Edge" tier (SKU GC33E). Identity evidence against Basic: the
  manufacturer's own "GoCube VS GoCube Edge" comparison table states a **250x tracking-
  accuracy difference** (0.25 sec vs 0.001 sec — read as different sensor/IMU hardware, not a
  firmware toggle) plus a **pillowed shape**, independently stated by TheCubicle ("a novel
  pillowed design") and corroborated by a customer review on GoCube's own tier-1 page ("aside
  from the pillowed shape"). Basic's own page never uses the word "pillowed."
- Specs: `size_mm: 60.0`, `weight_g: 125.0`, `shape: pillowed` — all `probable`, tier 2
  (TheCubicle), shape corroborated at tier 1 via the customer-review route (treated as
  corroboration only, not a standalone tier 1 claim; see that source's reliability_note).
  `magnet_architecture` left `unknown` for the same generic-"Magnetic" reason as M3 and i3S.
- **"GoCube Edge Full Pack" resolved as a bundle, not a fourth model** — exactly the call this
  task's brief flagged as likely. GoCube's own page for that exact name states the box
  "Includes – GoCube EDGE, [a] charging stand... USB charger... [and a] Pouch"
  (`getgocube-com-2019-fullpack-bundle`, new tier-1 source, dispositive). Carried as an alias
  on `particula-gocube-edge`, not a separate record. Particula's current (2026) storefront
  still markets this same model under exactly that bundle name as its flagship SKU.
- Released: `2019`, `qualifier: before`, `uncertain` (crawl bound, page captured 2019-12-16).

**`particula-gocube-x`** (`data/models/particula/particula-gocube-x.yml`)
- A budget-tier sibling first found in captures from late 2021. Three independent, stacking
  pieces of identity evidence against Edge: (1) a **different power architecture** — a
  replaceable CR1225 coin cell vs. Edge's built-in rechargeable-via-MicroUSB cell, a different
  physical assembly, not a component swapped at assembly time; (2) a stated **"classic
  shape"** contrasted against the flagship's pillowed/"Premium" design in the manufacturer's
  own three-way comparison table; (3) **different stated dimensions/weight** (57.0mm/103.0g
  vs. Edge's 60.0mm/125.0g) from two independent tier-1/tier-2 retailer spec tables.
- Specs: `size_mm: 57.0`, `weight_g: 103.0`, `magnet_architecture: none` (TheCubicle states
  directly "This one is non-magnetic," corroborated by the absent "Magnets" row) — all
  `probable`.
- **No `succeeds` relationship recorded, deliberately.** TheCubicle's "still has all of the
  tracking of the original GoCube" is ambiguous between Basic (closest on price/specs) and the
  "GoCube" nav item current as of 2021 (by then the Edge lineage, consolidated under the plain
  "GoCube" name after Basic dropped out of the site nav). No source disambiguates which. Rather
  than assert an unsupported specific lineage, this is recorded as a third sibling model with
  no forced succession claim — flagged in the description for a future researcher with press
  coverage of the 2021 launch to resolve.
- Released: `2021`, `qualifier: before`, `uncertain` — the manufacturer's own page states
  "FIRST BATCH... SOLD OUT... 2nd BATCH AVAILABLE IN EARLY NOVEMBER" as of a 2021-10-27
  capture, used only as a circulation bound.

### Candidates considered and rejected
- **"GoCube Edge Full Pack"** — rejected as a model; see above. Recorded as an alias on
  `particula-gocube-edge`.
- **GoCube 2x2** — out of 3x3x3 scope by puzzle category (already excluded at the family
  level; not re-litigated here).
- **Rubik's Connected** — explicitly **not** built here. Per this lane's brief, it is a
  Particula-manufactured, Rubik's-branded product with its own family/models already recorded
  under the Rubik's manufacturer (Batch 2). Confirmed again this pass: GoCube's own 2021
  site navigation lists "Rubik's Connected" as a sibling shop-category item, and Particula's
  2026 storefront groups it under the same "GoCube" merchandising category — a commercial
  grouping fact, not a family-boundary one (already noted on `data/families/particula-
  gocube.yml`; not duplicated into any model record here).
- **GoDice, GoChess-adjacent accessory pages** (charging cable/stand, carrying pouch, lube) —
  accessories, not cubes; out of scope entirely, not candidates.
- **`/products/gocube-a`, `/products/gocube-full-pack-a`** — Shopify A/B-test URL variants of
  the base and bundle pages (the `-a` suffix is a split-testing convention observed across
  several unrelated product URLs on this domain), not separate products. Not treated as
  candidates.

### Zero-model finding
Not applicable — three models admitted.

---

## §3.6a discovery-breadth compliance record

1. **Retailer `/products/` prefix sweep, even with a healthy official site** — performed for
   both manufacturers:
   - `giiker.com/products/` — 55 URLs, swept, no additional 3x3 candidates beyond i3S/i2/M3
     (M3 itself is absent from this prefix, confirming it is retailer-only).
   - `thecubicle.com/products/giiker*` — 18 URLs, swept.
   - `speedcubeshop.com/products/giiker*` — 2 URLs, swept.
   - `getgocube.com/products*` — swept via full CDX query (collapsed by urlkey); found the
     complete GoCube/GoCube Edge/GoCube-X/Full Pack/2x2/Rubik's Connected/GoDice product set,
     plus the A/B-test and accessory URLs noted above as non-candidates.
   - `thecubicle.com/products/gocube*` — 13 URLs, swept.
   All outcomes recorded above, including the negative ones (e.g. no standalone "GoCube
   Basic" page at either retailer).

2. **At least one non-US/English retailer** — Cubelelo (India) checked for both brands:
   - Search for "giiker" on cubelelo.com: zero GiiKER products of any kind (44 results shown,
     all other brands — GAN, YJ, Cubelelo's own Drift line).
   - Search for "gocube" on cubelelo.com: zero GoCube/Particula products (results were other
     brands plus a blog mention).
   - Also attempted `cubezz.com` (China) search for "giiker": zero GiiKER products listed.
   All three outcomes are genuine "swept, nothing new found" results, recorded here per the
   requirement that an unrecorded sweep counts as not-searched.

3. **`website` live-verification** — not re-litigated here; `giiker.com` and
   `particula-tech.com` were both confirmed live and current at the manufacturer-record level
   in Pass 1, and both were used directly as first-party sources in this pass (giiker.com's
   live `/collections/all` was fetched directly during discovery and found current).

**Network note.** The Wayback CDX API was intermittently unreachable during parts of this
session (`curl: (7) Failed to connect`, and `wayback: fetch failed` from the project script) —
almost certainly transient/load-related given multiple parallel research agents were hitting
the same host concurrently. All such failures were retried until they succeeded or an
alternative route (direct snapshot fetch, live-site WebFetch) confirmed the same fact; no
absence conclusion in this report rests on an unretried timeout.

---

## Escalations
None. No suspected family-taxonomy error was found in this lane. The giiker-supercube /
giiker-m3 family split and the particula-gocube / rubiks-connected family split (both frozen
at pass 2) are consistent with all evidence found this pass and were not challenged.

## Schema/process observations (not fixed, reported per instructions)
- `magnet-configurations` vocab has no value meaning "positioning magnets present, exact
  arrangement unspecified" — a genuinely common real-world source shape ("Magnets: Magnetic"
  with no further detail, seen on GiiKER M3, GoCube Edge, and already on `dayan-guhong-pro-m`
  in the existing archive). The house convention (confirmed by that existing precedent) is to
  leave the field unset with an `unknown` attestation rather than force a guess into `other` or
  `single_layer`. This works, but means `magnet_architecture` is systematically under-recorded
  for products that are known to be magnetic — worth a vocab review if that gap matters to a
  future coverage pass, but not something this agent should decide unilaterally.
- `generation.basis` is a strict binary (`manufacturer_declared` / `community_convention`).
  Several of this lane's hard calls (i3S, M3) are genuinely a third case: a name relayed only
  through a *retailer's* commercial copy, with no first-party manufacturer page to confirm it
  independently, and no evidence it is a *community* numbering convention either. This pass
  handled it by recording `manufacturer_declared` at `uncertain` confidence with an explanatory
  note, which is workable but slightly overloads the vocab's stated meaning. Flagged, not
  changed.

## Sources used (pre-existing, reused)
`giiker-about-us-2022`, `giiker-importgenius-address` (not directly cited in models but
underlies the manufacturer record), `giiker-com-supercube-i3s-product-2022`,
`thecubicle-giiker-super-cube-i3s-2019`, `thecubicle-giiker-m3-3x3-2020`,
`giiker-com-supercube-i3s-2026-soldout`, `getgocube-com-2019-basic-edge-skus`,
`getgocube-com-about-2019`, `thecubicle-gocube-edge-3x3-2020`, `thecubicle-gocube-x-3x3-2022`,
`particula-tech-com-gocube-2026`, `particula-about-us-2024`.

## Sources created this pass
`getgocube-com-2019-gocube-product`, `getgocube-com-2019-gocube-edge-product`,
`getgocube-com-2019-fullpack-bundle`, `getgocube-com-2021-gocube-x-product` — all tier 1,
first-party, `archive_url` preservation, checked against the pre-existing GoCube sources for
URL-form duplication (different paths, not the same page under a different URL) before
creation.

## Validation
`npm run check` passes clean on both commits (`0562d25`, `b0e2cc7`). The one lint warning
present in the repository (`gan-ui-12-sp` single-variant edition designation) predates and is
unrelated to this agent's work.

---

## Machine-readable summary

```yaml
- id: giiker-supercube-i3
  family_id: giiker-supercube
  name: "GiiKER SUPERCUBE i3"
  scope_class: core
  evidence_tier: 1
  date_known: "2018-03"
  confidence: confirmed
- id: giiker-supercube-i3s
  family_id: giiker-supercube
  name: "GiiKER SUPERCUBE i3S"
  scope_class: core
  evidence_tier: 1
  date_known: null
  confidence: uncertain   # identity/generation claim; existence itself is probable/confirmed
- id: giiker-m3-3x3
  family_id: giiker-m3
  name: "GiiKER M3 3x3"
  scope_class: core
  evidence_tier: 2
  date_known: null
  confidence: probable
- id: particula-gocube-basic
  family_id: particula-gocube
  name: "GoCube"
  scope_class: core
  evidence_tier: 1
  date_known: null
  confidence: probable
- id: particula-gocube-edge
  family_id: particula-gocube
  name: "GoCube Edge"
  scope_class: core
  evidence_tier: 1
  date_known: null
  confidence: probable
- id: particula-gocube-x
  family_id: particula-gocube
  name: "GoCube-X"
  scope_class: core
  evidence_tier: 1
  date_known: null
  confidence: probable
```
