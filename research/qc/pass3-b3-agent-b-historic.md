# Pass 3, Batch 3, Agent B — historic-makers model enumeration

Branch `b3-b`. Lane: `qj-candy-3x3`, `qj-pillowed-3x3`, `cube4you-3x3`, `eastsheen-3x3`,
`mefferts-kokonotsu`, `fangshi-shuangren`. Six frozen families, zero family/variant mutations
made. Commit: `5852efa`.

Read first: `research/qc/pass3-admission-policy.md` (S6), DATA_MODEL §1.4/§4.2,
`schema/model.schema.json`, RESEARCH_SPEC §3.6a, `data/models/moyu/moyu-weilong-gts.yml` and
`data/models/fanxin/fanxin-3x3-standard.yml` (house style for single-generation, no-date
products) and `data/models/cyclone-boys/cyclone-boys-feiwu-original.yml` (house style for
per-field `unknown` attestations on unset critical specs).

**Operational note:** web.archive.org had several transient full outages during this session
(curl-level connection failures, not rate limits) — each sweep below was retried until it
either returned real data or genuinely reproducible zero results. This is recorded because a
single failed attempt was never treated as an absence finding.

---

## QJ — 2 accepted models

### `qj-candy-3x3` → `qj-candy-3x3-standard` (1 model, `core`)

**Hard call: "Candy" tested and resolved as a colourway/marketing name, not a shape mould.**
TheCubicle's own copy never mentions a pillowed or non-standard shape ("draws inspiration from
other 3x3 cube mechanisms"), unlike its sibling qj-pillowed-3x3, whose copy explicitly names a
"distinct pillowed shape." `specs.shape: standard` (uncertain — inferred from absence of
shape-mod language, not a direct statement).

- Existence/specs: single tier 2 source (`thecubicle-qj-candy-3x3-product-2019`, unchanged from
  pass 2). `size_mm: 57.0`, `weight_g: 95`, both `probable`.
- `generation`: left unset — no naming, successor, or predecessor found anywhere.
- `released`: left unset. The only date evidence is `Added: 2018-09-11` (one of the four
  documented catalogue-migration artifacts named in the admission policy — 29 occurrences, 22
  sources, 13 brands) and a 2019-08-24 crawl timestamp. Neither is admissible even as a
  `qualifier: before` bound per the policy's stricter reading; left fully `unknown`.
- Core/maglev/magnet/adjustment: all `unknown`, researched and not found.

### `qj-pillowed-3x3` → `qj-pillowed-3x3-standard` (1 model, `core`)

**Hard call: "Pillowed" tested and resolved as a genuine shape mould**, the other direction
from Candy. `specs.shape: pillowed` (a real vocab value), `probable`. A pillowed shape does not
by itself disqualify WCA legality, so `scope_class: core` stands.

- `weight_g: 91`, `probable`, single source (`thecubicle-qj-pillowed-3x3-product-2019`).
- `size_mm`: left `unknown` — this listing's spec table has no Dimensions field (unlike its
  Candy sibling), and its figure was not assumed.
- A qjcube.com 2012-2015 catalogue capture shows a "Pillow-Shaped Magic Cube" URL slug
  pre-dating this archive's window — establishes a long-running QJ pillowed-shape line, not a
  specifically-named predecessor of this exact product, so no `succeeds`/`reissue_of` was
  recorded.
- `generation`, `released`: unset, same reasoning as Candy.

### §3.6a compliance, QJ

1. **Archived retailer prefix sweep**: `thecubicle.com/products/qj` — 18 distinct URLs,
   reproducing pass 2's own sweep exactly. Only two standard 3x3x3 products exist under this
   retailer for QJ; the rest are shape mods (Skewb, Megaminx, Pyraminx Crystal, etc.).
2. **Non-US retailer sweep**: Cubelelo (India) `/products/qj*` — 1 URL (`qj-timer`, not a 3x3).
   cubezz.com (China), domain-wide CDX search for `qj` — 24 distinct 200-status URLs (QJ Mini
   3x3, Brain Teaser, Smart Cube, SQ-1 variants, Floppy Cube, Bread Cube) — **no Candy or
   Pillowed product, and no other 57mm QJ speed cube, found at all.** Both products remain
   single-retailer (TheCubicle only) after two independent non-US checks this pass. Recorded
   honestly, not discarded, per admission policy §4.

---

## Cube4You — 1 accepted model

### `cube4you-3x3` → `cube4you-3x3-standard` (1 model, `core`)

**Hard call: DIY-kit vs assembled kept as a variant axis, not two models** — moot in practice,
since no separate "assembled" SKU was found on the manufacturer's own site at all (only DIY,
across 7 colourways).

- Existence/specs: tier 1, manufacturer's own storefront (`cube4you-3x3x3-diy-speed-cube-2017`,
  unchanged from pass 2). `size_mm: 57`, `probable`; `materials.plastic: ABS`, `probable`.
- `weight_g`, core/maglev/magnet/adjustment, `generation`, `released`: all `unknown`.

### §3.6a compliance, Cube4You

1. **Archived retailer prefix sweeps**: `thecubicle.com/products/cube4you` (40 URLs) and
   `speedcubeshop.com/products/cube4you` (8 URLs) — both carry Cube4You's well-documented Clock
   line and cuboid shape mods (3x3x4/5/6/7, Teraminx, Roadblock) but **zero standard 3x3x3
   listings**. This generic house-brand line is carried at no third-party English retailer
   found this pass.
2. **Non-US retailer sweep**: Cubelelo `/products/cube4you*` — 0 captures. cubezz.com
   domain-wide CDX search for `cube4you` — 1 unrelated accessory ("Cube4You Magic Cube Base
   Holder"), no cube.

---

## Eastsheen — 1 accepted model (contradiction preserved, not resolved)

### `eastsheen-3x3` → `eastsheen-3x3-standard` (1 model, `core`, `reported`)

**The standing flag is not resolved.** Model existence rests on TheCubicle's structured
"Manufacturer: Eastsheen" field on its one 3x3 listing ("Eastsheen 3x3x3 Cube with Wall
Stickers," continuously listed 2021-2025), whose own copy calls the object "a standard
Eastsheen 3x3." This is squarely contradicted by the Speedsolving wiki's dedicated Eastsheen
page ("East Sheen does not produce 3×3 cubes"), which this archive already holds at **tier 4**
(issue E1 remediation — self-flags as possibly outdated, denied the tier-3 override six
sibling pages received).

**A zero-model finding was seriously considered and rejected.** Rationale: pass 2 already
weighed this exact tension and chose to keep the family at `reported`; overturning that at
model level without new decisive counter-evidence would silently second-guess pass 2's own
judgement. One model is admitted at `reported` — matching the family's own confidence exactly,
neither inflated nor discarded.

- `size_mm: 57.0`, `weight_g: 100` (Gross; Item Weight 98.5g recorded in prose), both
  `reported` — re-fetched the same `archive_url` capture already cited on
  `thecubicle-eastsheen-wall-stickers` rather than creating a duplicate source, per the
  established "cite the existing source id" convention.
- `shape: standard`, `uncertain`.
- **Assessed, not concluded**: whether this is an OEM/rebrand of another maker's cube. No
  source found supports or refutes this; "a standard Eastsheen 3x3" reads as the retailer's own
  understanding that Eastsheen manufactures it, but no manufacturer-side statement exists
  (Eastsheen's own domain has been parked since at least 2011). No `rebrand_of` recorded.
- `generation`, `released`: unset. TheCubicle's `Added: 2021-05-11` is a catalogue-add date,
  explicitly not used as release-date evidence under this policy (contrast the family record's
  own looser pass-2-era `before 2021` reading, made before this policy existed — not repeated
  at model level).

### §3.6a compliance, Eastsheen, and its honest limits

1. **Archived retailer prefix sweep**: `thecubicle.com/products/eastsheen` — 11 distinct URLs.
   Confirms this Wall Stickers listing is the retailer's **only** 3x3 under this brand; every
   other listing is 2x2/4x4/5x5.
2. **Non-US retailer sweep, new this pass**: Cubelelo `/products/eastsheen*` and a cubezz.com
   domain-wide CDX search for `eastsheen` **both returned zero captures of any kind.** This is
   recorded honestly as **non-diagnostic**: neither retailer carries the Eastsheen brand at
   all — not even the undisputed 2x2/4x4/5x5 lines — so the absence cannot discriminate "no 3x3
   specifically" from "no Eastsheen presence whatsoever" at these two storefronts. The single
   most on-point piece of negative evidence remains the pass-2 SpeedCubeShop sweep, which does
   carry other Eastsheen lines but no 3x3.

---

## Meffert's Kokonotsu — 1 accepted model, `reference_only`

### `mefferts-kokonotsu` → `mefferts-kokonotsu-standard` (1 model)

**scope_class decided explicitly: `reference_only`, not `conditional`.** The launch brief
flagged this as "almost certainly not WCA-legal," correctly. Rule 15's bar for `conditional`
requires a tier 1-3 source stating *documented historical or collector significance* — "it is
unusual" is explicitly rejected. The only source found (TheCubicle) describes the mechanism (9
colours, one-per-side constraint) but makes no significance claim. `reference_only` is used
instead of inventing a justification the evidence does not support, per the admission policy's
own instruction.

- `shape: pillowed` (named directly in the product's own title), `weight_g: 128`, both
  `probable`.
- `size_mm`, core/maglev/magnet/adjustment, `generation`, `released`: all `unknown`.

**The Molecube lead — assessed, not acted on, per the standing flag:**
- `molecube.com` has Wayback captures back to 2001, but every capture checked near the
  Kokonotsu era (2018-08-04) is a bare domain-parking page ("Buy this domain..."); an earlier
  2009-08-15 capture returned empty/unrenderable content. **Neither confirms nor refutes**
  what "Molecube" the reviewers meant.
- `twistypuzzles.com` returned **HTTP 403** to both a direct WebFetch
  (`https://www.twistypuzzles.com/cgi-bin/puzzlewiki.cgi?pg=Molecube`) and a `wayback.mjs
  prefix` sweep of the bare domain. Recorded for manual follow-up, not treated as absence.
- No `rebrand_of` relationship recorded. Meffert's own documented history of
  licensing/rebranding other designers' puzzles keeps both readings plausible.

---

## FangShi ShuangRen — 2 accepted models (verified generations, no v3 found)

### `fangshi-shuangren` → `fangshi-shuangren-original` + `fangshi-shuangren-v2`

**Hard call: verified rather than assumed.** The launch brief speculated "expect real
generations (v1/v2/v3)." This pass found and confirmed exactly **two** generations, and
actively searched for and did not find a third:

- **`fangshi-shuangren-original`** (`core`). Existence/specs: single tier 2 source
  (`thecubicle-fangshi-shuangren-v2`, whose page carries the original's own discontinuation
  notice and spec table — `size_mm: 57.0`, `weight_g: 95`, both `probable`). No independent
  second retailer was found selling the plain, non-"II" 57mm original specifically — cubezz's
  57mm ShuangRen listings are all "II"; its non-"II" listings found were the 54.6mm "Mini"
  line only. `generation` left unset (no source numbers this one "V1"/"Original").
- **`fangshi-shuangren-v2`** (`core`, generation "V2"/2/`community_convention`, `probable`).
  **New independent corroboration found this pass**: cubezz.com's own "Funs Puzzle ShuangRen
  II 3x3 Magic Cube" listing (new source `cubezz-fangshi-shuangren-ii`) — a different retailer,
  a different numbering convention ("II" vs. TheCubicle's "V2"), same generation. Two
  independent tier 2 sources agreeing a second generation exists satisfies rule 9:
  `specs/size_mm` is `confirmed` (57.0mm / 57mm, exact agreement); `specs/weight_g` is
  `probable` (95g / 94.0g, ordinary rounding variance). `succeeds` → `fangshi-shuangren-original`,
  attested `reported` on TheCubicle's own direct succession statement ("has been discontinued
  ... being replaced by").
- DIY-kit-vs-assembled and a 54.6mm "Mini ShuangRen" size line (found on cubezz for both
  generations) are read as sold configurations of the same design, per DATA_MODEL §4.2 and the
  wiki's own framing ("released in new sizes... retailers offer numerous colour
  combinations") — left as pass-4 leads, not built into further models.
- `released`: unset for both — no explicit dated statement found anywhere this pass.

### Escalation — recorded, not acted on (families frozen)

**FangShi GuangYing and FangShi JieYun are real, separately-named, currently-documented 3x3x3
product lines with no frozen family.** The same cubezz.com sweep that found ShuangRen II also
surfaced "Funs Puzzle GuangYing 3x3x3 Speed Cube" and "Funs Puzzle JieYun 3x3x3 Speed Cube"
(57mm, plus a 54.6mm "Mini JieYun") as product lines independent of ShuangRen entirely.
TheCubicle independently carries the same two names under `/products/fangshi-guangying*` and
`/products/fangshi-jieyun*` (found in this pass's own 40-URL `fangshi-*` prefix sweep). The
`fangshi-shuangren.yml` family record already flagged these as open leads from the wiki's own
"Contents" list; this pass confirms via **two independent retailers** that they are real,
currently-sold products, not stub wiki headers. **No family exists for either. No model was
built for either name. This is a gap for human review** — a potential missing-family finding
in the sense RESEARCH_SPEC warns about ("a missed family is not a missing row; it is a
systematically missing region of the archive"), not a taxonomy *error* in the existing
`fangshi-shuangren` family, which remains correctly scoped to ShuangRen specifically.

### §3.6a compliance, FangShi

1. **Archived retailer prefix sweep**: `thecubicle.com/products/fangshi-shuangren` — 5 distinct
   URLs (original, its DIY kit, `-v2`, `-v2-diy-kit`, one tracked-parameter duplicate). A
   broader `thecubicle.com/products/fangshi` sweep (40 URLs, truncated at limit) shows the bulk
   of FangShi's catalogue is limCube-branded shape mods, plus GuangYing/JieYun (see escalation
   above).
2. **Non-US retailer sweep**: Cubelelo `/products/fangshi*` — 4 URLs, all limCube shape mods, no
   ShuangRen. cubezz.com domain-wide CDX search for `shuangren` (59 URLs) and `funs` (158 URLs)
   — extensive, genuine independent corroboration for both ShuangRen generations, plus the
   GuangYing/JieYun escalation above.

---

## §3.6a compliance record, full lane summary

| Family | Archived retailer sweep | Non-US retailer sweep | Outcome |
|---|---|---|---|
| qj-candy-3x3 | thecubicle.com/products/qj (18 URLs) | Cubelelo (1, no 3x3); cubezz.com domain search "qj" (24 URLs) | Nothing new; single-retailer status confirmed |
| qj-pillowed-3x3 | same | same | Nothing new; single-retailer status confirmed |
| cube4you-3x3 | thecubicle.com + speedcubeshop.com /products/cube4you (40+8 URLs) | Cubelelo (0); cubezz.com "cube4you" (1, unrelated) | Nothing new; manufacturer-site-only status confirmed |
| eastsheen-3x3 | thecubicle.com/products/eastsheen (11 URLs) | Cubelelo (0, non-diagnostic); cubezz.com "eastsheen" (0, non-diagnostic) | Contradiction preserved, not resolved |
| mefferts-kokonotsu | (existing pass-2 sweep) | Cubelelo "mefferts"/"meffert" (0); cubezz.com "meffert"/"kokonotsu"/"molecube" (0 relevant) | Molecube lead assessed, not resolved; twistypuzzles.com blocked (403) |
| fangshi-shuangren | thecubicle.com/products/fangshi-shuangren (5 URLs) + fangshi (40 URLs) | Cubelelo "fangshi" (4, no ShuangRen); cubezz.com "shuangren"/"funs" (59/158 URLs) | V2 upgraded to independently-corroborated; GuangYing/JieYun gap escalated |

Every sweep above, including negative ones, is recorded in the corresponding model file's
header comment for future researchers, per the "absence of a recorded sweep is treated as not
searched" rule.

---

## Sources used / created

**Reused (no changes made to files not created this session):** `thecubicle-qj-candy-3x3-product-2019`,
`thecubicle-qj-pillowed-3x3-product-2019`, `qjcube-com-catalogue-2012`, `qjcube-official-2013`,
`cube4you-3x3x3-diy-speed-cube-2017`, `speedsolving-wiki-cube4you-2010`,
`thecubicle-eastsheen-wall-stickers`, `speedsolving-wiki-eastsheen`, `mefferts-official-site-2024`,
`thecubicle-mefferts-kokonotsu-pillow-3x3`, `speedsolving-wiki-fangshi`,
`thecubicle-fangshi-shuangren-v2`, `speedcubeshop-fangshi-collection-2021`, `thecubicle-limcube-fangshi`.

**Created:** `data/sources/cubezz-fangshi-shuangren-ii.yml` (tier 2, archive_url) — the only new
formal source record this pass; all other new evidence (negative sweeps, re-fetched spec
tables from existing archive_url captures) is documented in prose within model files and this
report rather than as new source records, per the "cite the existing source id rather than
manufacturing a near-duplicate" convention already established in this archive.

---

## Boundary calls summary (for review)

1. **QJ Candy = variant-level colour name, QJ Pillowed = model-level shape mould.** Tested each
   independently against its own retailer copy rather than assuming either way, per instruction.
2. **Cube4You DIY-kit vs assembled = variant axis.** Not actually tested against conflicting
   evidence (no assembled SKU was found at all), but the policy is stated and would apply.
3. **Eastsheen: one model admitted at `reported`, contradiction preserved, zero-model finding
   considered and explicitly rejected** for lack of new decisive counter-evidence beyond pass 2.
4. **Meffert's Kokonotsu: `reference_only`, not `conditional`.** No tier 1-3 significance
   source found; `conditional` would have required inventing a justification.
5. **FangShi ShuangRen: exactly two generations confirmed, no v3.** V2/II treated as one model
   despite two different retailer numbering conventions, on the strength of matching
   size/weight/succession-framing evidence.
6. **Escalation, not mutation**: FangShi GuangYing and FangShi JieYun are real 3x3x3 lines with
   no frozen family. Flagged for human review; no family created, no model built for either.

---

## Machine-readable summary

```yaml
- id: qj-candy-3x3-standard
  family_id: qj-candy-3x3
  name: "QJ Candy 3x3"
  scope_class: core
  evidence_tier: 2
  date_known: false
  confidence: probable
- id: qj-pillowed-3x3-standard
  family_id: qj-pillowed-3x3
  name: "QJ Pillowed 3x3"
  scope_class: core
  evidence_tier: 2
  date_known: false
  confidence: probable
- id: cube4you-3x3-standard
  family_id: cube4you-3x3
  name: "Cube4You 3x3x3 Speed Cube"
  scope_class: core
  evidence_tier: 1
  date_known: false
  confidence: probable
- id: eastsheen-3x3-standard
  family_id: eastsheen-3x3
  name: "Eastsheen 3x3"
  scope_class: core
  evidence_tier: 2
  date_known: false
  confidence: reported
- id: mefferts-kokonotsu-standard
  family_id: mefferts-kokonotsu
  name: "Meffert's Kokonotsu Pillow 3x3"
  scope_class: reference_only
  evidence_tier: 2
  date_known: false
  confidence: reported
- id: fangshi-shuangren-original
  family_id: fangshi-shuangren
  name: "FangShi ShuangRen"
  scope_class: core
  evidence_tier: 2
  date_known: false
  confidence: probable
- id: fangshi-shuangren-v2
  family_id: fangshi-shuangren
  name: "FangShi ShuangRen V2"
  scope_class: core
  evidence_tier: 2
  date_known: false
  confidence: probable
```

No `candidate` or `rejected` classification was needed this pass — every candidate surfaced
either cleared the S6 existence bar (accepted as a model) or was a configuration-level
difference folded into an existing model's description as a pass-4 lead (colourways, DIY vs
assembled, size lines). No zero-model family resulted, though eastsheen-3x3 came close and is
flagged for review at that boundary.

`npm run validate` and `npm run check`: PASS, 0 errors, 0 warnings (900 records total).
Commit: `5852efa` on branch `b3-b`.
