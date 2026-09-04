# Pass 3, Batch 3, Agent D — MoYu sub-brands + Newisland

Lane: 8 frozen zero-model families — `guoguan-yuexiao`, `mojue-m3`, `pbcube-wr`,
`mohuanshousu-chufeng`, `senhuan-mars`, `yancheng-yan3`, `newisland-lightning`,
`newisland-phoenix`. Written live; commits at each family boundary (see bottom).

## Method note: connectivity and the wayback CLI

`node scripts/wayback.mjs` failed with a bare `fetch failed` in this environment (both
inside and outside the sandbox default network). Root cause was not the CDX API itself —
direct `fetch()` calls to `web.archive.org` worked once and then hit intermittent
`ECONNREFUSED`, consistent with rate limiting rather than a real outage; retrying after a
short wait consistently succeeded. All discovery in this report used the same CDX endpoints
the wayback script wraps (`cdx/search/cdx` for `prefix`/`list`, `web.archive.org/web/<ts>id_/`
for page fetches), via a small retry wrapper, run with the sandbox network restriction lifted
for this research session. This is a environment/tooling finding, not a data finding — flagged
here rather than silently worked around; a future agent hitting the same wall should retry
with backoff rather than concluding the archive has no captures.

## §3.6a discovery-breadth record

**Retailer `/products/` prefix sweeps performed (all via CDX, not live pages):**
- `thecubicle.com/products/guoguan*` — 13 URLs: xinghen 2x2 line (out of scope) plus
  yuexiao / yuexiao-e / yuexiao-edm / yuexiao-pro / yuexiao-pro-m / yuexiao-unstickered.
  Confirms exactly three 3x3 generations; no fourth found.
- `thecubicle.com/products/mojue*` — 1 product (`mojue-m3`) plus its `.js` asset. Confirms
  single-model family.
- `thecubicle.com/products/senhuan*` — Mars, Mars S, Zhanlang 2x2 (×3 variants, out of
  scope). Confirms exactly two 3x3 generations.
- `thecubicle.com/products/mohuan*` — ChuFeng 3x3, Chuwen 2x2 (out of scope). Confirms
  single 3x3 model.
- `thecubicle.com/products/yancheng*` — 1 product (`yancheng-yan3`). Confirms single-model
  family.
- `thecubicle.com/products/pbcube*` — 1 product (`pbcube-wr-3x3-20-magnet-ball-core-maglev-uv`).
  Confirms single-model family.
- `thecubicle.com/products/newisland*` — Lightning, Lightning V2, Phoenix (×2 assets each).
  Confirms exactly three products, no fourth generation.

**Non-US/English retailer checked, per family, outcome recorded either way:**
- **Cubezz.com** (China): domain-wide term sweep found GuoGuan (52 URLs — original,
  Pro, Pro M, E, EDM, plus 2x2 Xinghen), MoJue (8 URLs — M3 colourways), MoHuan (4 URLs — all
  Chuwen 2x2, no ChuFeng 3x3 found there). Zero hits for SenHuan, YanCheng, Newisland, PBCube —
  checked, not found, recorded as absence-of-coverage, not absence-of-product.
- **Cubelelo.com** (India — the retailer RESEARCH_SPEC §3.6a's own audit specifically
  flags as previously unswept): domain-wide term sweep found SenHuan (14), YanCheng (17),
  MoHuan (19), GuoGuan (45), MoJue (20) — all with real product URLs, several years earlier
  than TheCubicle's own captures (see model records for details). Zero hits for Newisland,
  PBCube.
- **MoYu's own site** (moyucube.com): domain sweep returned only generic ASP/CSS
  infrastructure URLs (no clean product-name paths — this is an old ASP-based CMS), consistent
  with the manufacturer records' own existing framing (moyucube-official-home-2022, already
  cited there, lists these sub-brand names on its home page but the site has no per-product
  URL structure this pass could enumerate further). Not re-fetched beyond the domain-wide CDX
  listing; the existing `moyucube-official-home-2022` source already covers what this pass
  could add.

No wayback `prefix` result hit its `--limit`; none of these are treated as truncated/complete.

## Per family

### 1. `guoguan-yuexiao` — 3 accepted models

- **`guoguan-yuexiao-original`** (ordinal 1, `community_convention`). Existence/identity:
  TheCubicle + two independent Cubezz captures (2016, and the Pro page's own 2015 history
  recap). `released: 2015` (year, exact) from an explicit dated statement on
  `cubezz-guoguan-yuexiao-pro-2017` ("In 2015, GuoGuan released Yuexiao 3x3") — the only
  dated release statement found this pass, preferred over TheCubicle's vaguer "iconic cube of
  2016" framing (not itself a release-date claim, not treated as contradicting). `specs.size_mm`
  recorded **disputed** (55.0 vs 56.0mm across two tier 2 sources 9 years apart) — both
  candidates kept, not silently resolved.
- **`guoguan-yuexiao-pro`** (ordinal 2, `manufacturer_declared`). HARD CASE, resolved as a
  model boundary: TheCubicle's "brand new mechanism with more internal tracks... more rounded
  corner piece design" is independently corroborated in different wording by Cubezz ("new
  mechanism... 3-segment section and 3-segment round corner") — two independent tier 2 sources
  agreeing on a genuine mould/mechanism change, DATA_MODEL §4.2. `released: before 2017`
  (Cubezz capture 2017-08, over a year earlier than TheCubicle's).
- **`guoguan-yuexiao-edm`** (ordinal 3, `manufacturer_declared`). TheCubicle's "world's first
  adjustable (not interchangeable) magnetic system" — the "world's first" superlative is
  refused as marketing copy per §3.3; the underlying "adjustable" spec is used
  (`magnet_architecture: adjustable`, `probable`, single tier 2 source). `released: before 2019`
  (Cubezz capture 2019-08). "YueXiao E" (unmagnetized) and "YueXiao Pro M" (magnetized Pro)
  are explicitly variant-level per their own source text, not modeled as separate generations
  (pass 4 territory).

**Refused catalogue-date artifacts:** every GuoGuan source's "Added: 2018-09-11" /
"Added: 2019-06-19" field explicitly refused in every model's `/released` attestation note —
including the EDM's 2019-06-19 field, which is *not* the documented 2018-09-11 artifact but is
still refused, per the binding instruction that no retailer "Added:" field is ever used as
release-date evidence regardless of pattern-matching a known artifact.

New sources created: `cubezz-guoguan-yuexiao-2016`, `cubezz-guoguan-yuexiao-pro-2017`,
`cubezz-guoguan-yuexiao-edm-2019`.

**Escalation-adjacent finding, not escalated:** Cubezz's GuoGuan Pro page independently states
the same GuoGuan/MoYu-adjacent framing pattern seen elsewhere this batch, but no new
"sub-brand" language beyond what's already recorded — no manufacturer-record action taken, per
standing flag 1.

### 2. `mojue-m3` — 1 accepted model

- **`mojue-m3-standard`**. Single-model family confirmed by both a TheCubicle slug sweep and
  a Cubezz domain sweep. Significant finding: Cubezz shows this exact product (same "first
  product of MoJue brand" framing) already in established retail circulation — customer
  rating, SKU, bulk pricing — as of **2017-04-02**, three years before TheCubicle's only
  capture describes it as "will soon hit the market... pre-order" (2020-09-27). Model
  `released` set to `before 2017-04` on the earlier, better-evidenced source; the frozen
  family record's own "circa 2020" reading (resting on TheCubicle alone) is now visibly
  superseded at the model level but **not edited** (family frozen, out of lane) — flagged here
  for a human reviewer.

New source: `cubezz-mojue-m3-2017`.

### 3. `pbcube-wr` — 1 accepted model

- **`pbcube-wr-standard`**. Existence/identity on TheCubicle alone (the only source found at
  any retailer this pass — non-US sweep of Cubezz and Cubelelo both returned zero PBCube
  hits, consistent with a genuinely brand-new 2026 pre-order product, not evidence of absence).
  `core_system: ball_core` and `maglev: ball_core_maglev` read from the product's own title
  ("20-Magnet Ball-Core + MagLev + UV"), both `uncertain` (title-only, no repeating body
  text found in the excerpt). **`magnet_architecture` deliberately left unset**: I initially
  drafted `adjustable` by analogy to the "WR" name echoing MoYu's own WeiLong WR line, caught
  this as exactly the naming-based-lineage error the standing flags warn against, and removed
  it — recorded here so the self-correction is visible. No `released` date: the only capture
  is still `[Pre-Order]`.

No new source created (TheCubicle's existing `thecubicle-pbcube-wr-3x3-maglev-uv` sufficed).

### 4. `mohuanshousu-chufeng` — 1 accepted model

- **`mohuanshousu-chufeng-standard`**. Single-model family confirmed by prefix sweep. Cubelelo
  (India) independently carries this product from **2016-10-30** — four years before
  TheCubicle's capture — and independently corroborates (in different wording) the "Zhang
  HaiXu, former [4x4] world-record holder" designer attribution. `designer` field **not**
  populated: no `person` record for this individual exists in `data/people/`, creating one is
  out of this pass's write lane, and a dangling ref is not a legitimate way to record a lead —
  flagged in the model's description prose instead as a lead for a people-focused pass.

New source: `cubelelo-mohuanshousu-chufeng-2016`.

### 5. `senhuan-mars` — 2 accepted models (HARD CASE, both directions tested)

- **`senhuan-mars-original`** (ordinal 1). Cubelelo shows this product in **"Pre-Order"**
  status as of 2016-10-31 — nearly 3 years before TheCubicle's capture, and plausibly at or
  near actual introduction. Description content not independent of TheCubicle's (verbatim
  match), so used only for existence/dating per §3.2.
- **`senhuan-mars-s`** (ordinal 2). **HARD CASE decided as two models, not one model +
  variant.** TheCubicle's own description: Mars S has "more durable and elastic SWP springs
  **and a re-designed center piece**." The spring-material swap alone would be a variant-level
  (assembly-time material choice) fact; the piece redesign is a mould/geometry change under
  DATA_MODEL §4.2 worked decision B ("visibly different mouldings... not producible from one
  design"). This rests on **TheCubicle alone** — no independent retailer names "Mars S" at all
  in this pass's non-US sweep (Cubezz: 0 hits; Cubelelo: 0 hits for "Mars S" specifically,
  only the plain "Mars"). Recorded at `reported` confidence throughout, with the model's own
  description explicitly naming the live alternative (that "re-designed" might understate to a
  material change, making this really a variant) as the thing a better source could overturn.

New source: `cubelelo-senhuan-mars-2016`.

### 6. `yancheng-yan3` — 1 accepted model

- **`yancheng-yan3-standard`**. Single-model family confirmed by prefix sweep and a non-US
  domain sweep. Cubelelo carries the identical (verbatim) description under its own "New
  Arrivals" category as of **2017-04-06** — over 3 years before TheCubicle's capture. Text is
  not independent (§3.2); existence/date is.

New source: `cubelelo-yancheng-yan3-2017`.

### 7. `newisland-lightning` — 2 accepted models (HARD CASE, worked decision G applied)

- **`newisland-lightning-original`** (ordinal 1, `community_convention`).
- **`newisland-lightning-v2`** (ordinal 2, `manufacturer_declared`). **HARD CASE.** The only
  documented differences between V1 and V2 are an accessory-bundle change (no replacement
  edge/corner in V2's box) and the manufacturer's own "V2" version number — no source states a
  mechanism change either way. This is a textbook RESEARCH_SPEC §4 worked-decision-G situation
  ("evidence genuinely unclear whether the mechanism changed"): **split into two models**, with
  a `succeeds` relationship and `confidence: uncertain` explicitly on the identity claim in
  both directions, rather than collapsing V2 into a variant of V1 on the strength of an
  accessory-only difference. Flagged plainly for human review — this is exactly the kind of
  split the task brief asked to be surfaced rather than resolved silently.

**Rebrand suspicion — NOT resolved, NOT acted on.** Both Lightning models carry (in
`description`, not as a `relationship`) the pre-existing customer-review suspicion that this
mechanism is a rebranded QiYi Thunderclap (`qiyi-thunderclap-*` models already exist under
`qiyi` from Batch 1). Evidence is tier-4-equivalent customer opinion only — no tier 1-2
manufacturer statement or documented supply relationship, so DATA_MODEL rule 17's bar for
`rebrand_of` is not met. **No relationship recorded; no duplicate model created for the same
physical product.** Both are recorded independently under their own brands per worked decision
E, with the suspicion documented for whoever can do a direct mechanical/spec comparison against
the existing `qiyi-thunderclap-v1`/`-v2` records (that comparison was not attempted this pass —
concrete next step, not an escalation, since neither side has decisive evidence yet).

### 8. `newisland-phoenix` — 1 accepted model

- **`newisland-phoenix-standard`**. Single-model family confirmed by prefix sweep (exactly
  three Newisland products total: Lightning, Lightning V2, Phoenix — no Phoenix V2). No
  relation to Lightning found; kept independent per the family record's own treatment.

No new source needed beyond the existing `thecubicle-newisland-phoenix-2019`.

## Zero-model findings

None. All 8 families in this lane yielded at least one model on existence-alone admission
(class 2), several with stronger identity/date evidence found this pass. No family was left at
zero models.

## Candidates considered and rejected (not created as models)

- **GuoGuan "YueXiao E"** — TheCubicle's own text: "the unmagnetized version of the YueXiao
  EDM... retains the magnetic capsules found in the EDM, there are simply no magnets in them."
  Rejected as a model; it is a variant of `guoguan-yuexiao-edm` (pass 4).
- **GuoGuan "YueXiao Pro M"** — the factory-magnetized configuration of Pro. Rejected as a
  model; variant of `guoguan-yuexiao-pro` (pass 4).
- **GuoGuan "Xinghen" (2x2) products, "Zhanlang" (SenHuan 2x2), "Chuwen" (MoHuanShouSu 2x2)**
  — all real, all out of this archive's 3x3x3 scope (RESEARCH_SPEC §2.4). Not created.
- **A hypothetical "PBCube WR" ↔ "MoYu WeiLong WR" design relationship** — considered and
  explicitly rejected as unsupported; naming resemblance only, no source states a shared
  mould/mechanism/supply relationship. No `succeeds` or other relationship recorded (see
  `pbcube-wr-standard.yml`'s own header comment).
- **Newisland Lightning ≡ QiYi Thunderclap as the same model** — considered, not accepted;
  see the rebrand-suspicion note under family 7 above. Recorded as an open lead, not a
  rejection of the suspicion itself, just a rejection of acting on it prematurely.

## Escalations

None required. The one genuine taxonomy-adjacent tension found (MoJue M3's true circulation
date being ~2017, materially earlier than the frozen family record's "circa 2020") is a
**model-level correction within my own write lane**, not a family-boundary or manufacturer-
identity problem, so it was actioned directly at the model level and flagged in prose rather
than escalated.

## Sources created this pass

`cubezz-guoguan-yuexiao-2016`, `cubezz-guoguan-yuexiao-pro-2017`,
`cubezz-guoguan-yuexiao-edm-2019`, `cubezz-mojue-m3-2017`,
`cubelelo-mohuanshousu-chufeng-2016`, `cubelelo-senhuan-mars-2016`,
`cubelelo-yancheng-yan3-2017` — all `archive_url` preservation, all tier 2 retailer.

## Sources reused (no new file)

`thecubicle-guoguan-yuexiao-2025`, `thecubicle-guoguan-yuexiao-pro-2018`,
`thecubicle-guoguan-yuexiao-edm-2020`, `thecubicle-mojue-m3-2020`,
`thecubicle-mohuan-shousu-chufeng-2020`, `thecubicle-senhuan-mars-3x3-2019`,
`thecubicle-senhuan-mars-s-3x3-2019`, `thecubicle-yancheng-yan3-2020`,
`thecubicle-newisland-lightning`, `thecubicle-newisland-lightning-v2-2019`,
`thecubicle-newisland-phoenix-2019`, `thecubicle-pbcube-wr-3x3-maglev-uv`.

## Standing flags — confirmed left untouched

1. **MoYu sub-brand relationships** — no manufacturer record touched. Two new pieces of
   evidence surfaced this pass (Cubelelo's own top-level "Brand: MoYu" categorisation field on
   the MoHuanShouSu and SenHuan product pages, alongside their own structured "Brand:
   MoHuanShouSu"/"Brand: SenHuan" sub-fields) are noted in the relevant source
   `reliability_note`s and model descriptions only, explicitly flagged as retailer
   categorisation, not corporate-structure evidence, and explicitly **not** used to move any
   `data/manufacturers/*.yml` confidence value.
2. **`newisland-lightning` rebrand suspicion** — preserved, not resolved. See family 7 above.
3. **`pbcube-wr` naming echo** — preserved, not resolved, and actively guarded against
   over-application (the `magnet_architecture` self-correction above).

## Machine-readable summary

```yaml
models:
  - id: guoguan-yuexiao-original
    family_id: guoguan-yuexiao
    name: "GuoGuan YueXiao"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: guoguan-yuexiao-pro
    family_id: guoguan-yuexiao
    name: "GuoGuan YueXiao Pro"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: guoguan-yuexiao-edm
    family_id: guoguan-yuexiao
    name: "GuoGuan YueXiao EDM"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: mojue-m3-standard
    family_id: mojue-m3
    name: "MoJue M3"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: pbcube-wr-standard
    family_id: pbcube-wr
    name: "PBCube WR"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: mohuanshousu-chufeng-standard
    family_id: mohuanshousu-chufeng
    name: "MoHuan ShouSu ChuFeng"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: senhuan-mars-original
    family_id: senhuan-mars
    name: "SenHuan Mars"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: senhuan-mars-s
    family_id: senhuan-mars
    name: "SenHuan Mars S"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: reported
  - id: yancheng-yan3-standard
    family_id: yancheng-yan3
    name: "YanCheng YAN3"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable
  - id: newisland-lightning-original
    family_id: newisland-lightning
    name: "Newisland Lightning"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: uncertain
  - id: newisland-lightning-v2
    family_id: newisland-lightning
    name: "Newisland Lightning V2"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: uncertain
  - id: newisland-phoenix-standard
    family_id: newisland-phoenix
    name: "Newisland Phoenix"
    scope_class: core
    evidence_tier: 2
    date_known: true
    confidence: probable

zero_model_families: []

escalations: []
```

## Commits (this batch, in order)

1. `a67d5ef` — GuoGuan YueXiao family (3 models).
2. `2a9e7ff` — MoJue, MoHuanShouSu, SenHuan (2 models), YanCheng.
3. `91219c5` — PBCube WR (1 model), Newisland Lightning/Phoenix (3 models).

`npm run check` passes clean (0 errors) as of the final commit; the only warning
(`gan-ui-12-sp` edition-designation warning) predates this batch and is outside its lane.
