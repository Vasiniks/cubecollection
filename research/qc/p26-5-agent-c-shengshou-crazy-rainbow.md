# P26-5 Agent C — ShengShou Crazy 3x3 & ShengShou Rainbow 3x3 Adjudication

Status: complete. Both candidates adjudicated independently, per mission instructions.
No families/models/manufacturers/variants were created or modified — mutation is frozen for
this lane. Two new `data/sources/*.yml` records were added (see section 5 of each candidate
and the file list at the end). `npm run check` is green (0 errors, 5 baseline advisory
warnings, unchanged from before this session's writes).

---

## ShengShou Crazy 3x3

### 1. Evidence verified

Re-verified `thecubicle-shengshou-other-3x3-lines-2026`'s Crazy excerpt directly, then went
further than the brief's given evidence: fetched the base/V1, V2, and Jelly LE TheCubicle
pages myself and ran fresh CDX queries (both `npm run wayback` and raw CDX API, since the
wayback script transiently failed and I fell back to `curl` against
`web.archive.org/cdx/search/cdx`).

- **Base ("V1", `shengshou-crazy-3x3`)**: "a pillowed 3x3 with rings on each face that do not
  turn with their respective faces... While performance isn't as good as standard 3x3s, it is
  well ahead of other 'crazy' puzzles." Type "Shape Mods", 60.5mm, ~103-117g depending on which
  field is read. Earliest TheCubicle capture found: 2023-02-06 (the brief's cited 2022-08-07 is
  also a valid capture of the same page; both post-date TheCubicle's own "Added: 2021-12-15"
  field, itself discarded as non-evidentiary per policy).
- **V2 (`shengshou-crazy-3x3-v2`)**: "The V2 has more pieces (9 total) in each ring, adding yet
  another layer of difficulty." Type "3x3" (inconsistent with V1's own "Shape Mods"
  classification — a retailer inconsistency, not resolved). 60.0mm, 124.0g. **This is a
  documented internal-geometry difference between generations (8-piece vs 9-piece ring), not
  merely a version number** — this independently satisfies DATA_MODEL §4.2's model-identity
  test regardless of what the "V2" label alone would imply.
- **Jelly LE (`shengshou-crazy-3x3-jelly-le`)**: "limited to 1400 units worldwide!" Single
  "Transparent Stickerless" variant. No spec/mechanism claim distinguishing it from V1 or V2 —
  reads as a colourway/material limited edition, not a third design generation, but I could not
  determine from the page which generation's mechanism it uses. Left as an open question.
- **Cross-size naming** (verified independently via a fresh CDX prefix sweep of
  `thecubicle.com/products/shengshou-crazy`, 23 distinct URLs): 2x2, 3x3(+V2, +Jelly LE),
  4x4(+V2,+V3), 5x5(V1-V4), Magic Tower(+V2), Megaminx(+V2). SpeedCubeShop's own sweep
  (`speedcubeshop-shengshou-products-prefix-2026`) independently reports the same core pattern
  plus Pyraminx and Mirror-cube SKUs not seen at TheCubicle — a retailer-coverage difference,
  not a contradiction.
- **A related but distinct lead, not chased**: `shengshou-full-function-crazy-2x2` exists at
  TheCubicle (2022-11-27), echoing Calvin's "Full-Function Crazy...(Center-Locking)" naming.
  No 3x3 version was found. Whether this is the same mechanism concept as plain "Crazy" or a
  second, separate ShengShou shape-mod family is unresolved and out of this lane's scope
  (2x2 only).
- **Deep-history lead, checked and found unrelated**: Cubezz.com carries a "ShengShou Circle
  Ball Crazy Magic Cube" (2x2x2, ball-shaped) as far back as 2014-01-09 — six years before the
  3x3 shape-mod product surfaces anywhere. This shows "Crazy" as a ShengShou naming concept
  predates the 3x3 by years, but the "Ball" product is a different mechanism/shape entirely; no
  ShengShou "Crazy 3x3" (pillowed, locked-ring) SKU was found at Cubezz at any date. Not used
  to backdate the 3x3 line.
- **First-party check**: `shengshoutoys.com` (ShengShou's own dead domain) was crawled via CDX
  for the manufacturer register's own archived captures. No product pages survive in the
  archive at all for that domain — only CSS/JS/image assets from a 2018-2020 template. No
  tier-1 evidence exists or can exist for this line short of a different first-party channel
  turning up. This is the structural ceiling the brief anticipated, confirmed rather than
  assumed.

New source created: `data/sources/thecubicle-shengshou-crazy-3x3-generations-2026.yml`.

### 2. Scope adjudication

**WCA legality**: not legal. TheCubicle's own "Type: Shape Mods" classification for V1 matches
the classification already used to admit `mf8-crazy-3x3x3` and `calvins-crazy-3x3` as
`positioning: special` families. Not disputed.

**Does it clear the `conditional` bar (RESEARCH_SPEC §2.2 / the S6 admission policy)?** This is
the harder, genuinely close call the brief asked me to make honestly, and I did not find a
clean answer — I am reporting it as **disputed/uncertain within my own analysis**, with a
recommendation, rather than manufacturing false certainty.

**Case against `conditional` (reference_only reading):**
- TheCubicle's own copy explicitly frames this product by comparison to "other 'crazy'
  puzzles" — an admission that ShengShou is one of several makers of an already-generic
  locked-ring mechanism, not an originator. This is the "third maker's copy of a generic
  mechanism" scenario the brief specifically warned might not clear the bar.
- Wikipedia's documented "Crazy cube type I/II" category (`wikipedia-combination-puzzle`) is
  specifically the 4x4x4 connected-inner-circle mechanism, not the 3x3 locked/non-turning-ring
  mechanism ShengShou (and Calvin's) actually sell — the same mismatch already recorded against
  `calvins-crazy-3x3`, and it applies here identically.
- No source states a production first, a documented design influence on later designs, or a
  ShengShou-specific collector market narrative (contrast Legend: "attempt to modernise the
  brand," or Mr. M: "ShengShou's first attempt at a magnetic cube" — Crazy carries no
  equivalent documented place in ShengShou's own history).
- Documented circulation (~2021/2023-2026, roughly 3-5 years depending which capture is used
  as the floor) is real but shorter than `mf8-crazy-3x3x3`'s documented decade-plus
  (2010/2015-2025), which is the specific precedent the S6 policy cites as clearing the bar.

**Case for `conditional`:**
- The V1→V2 ring-piece-count difference is a genuine, documented mechanism change across
  generations — evidence of an actual design lineage, not just a marketing refresh.
- The Jelly LE's "limited to 1400 units worldwide" is a quantifiable, non-superlative claim
  (a production-run figure, not adjectival copy per RESEARCH_SPEC §3.3) — the only concrete
  "documented collector market" signal found for either candidate in this lane, and RESEARCH_
  SPEC §2.2 explicitly names a documented collector market as sufficient grounds.
- The line has been continuously retailed at at least two independent publishers
  (TheCubicle, SpeedCubeShop) across five size classes for roughly four to five years and is
  still current (2026 capture of the Jelly LE).

**My disposition on this sub-question**: I do **not** think the evidence is strong enough to
declare `conditional` with confidence comparable to `mf8-crazy-3x3x3`, but it is also
meaningfully stronger than `calvins-crazy-3x3` (which rested on one capture, no generations, no
LE). I recommend **`reference_only` for the base/V1 model** (no significance beyond being a
generic-mechanism entrant) and flag **V2 as a genuinely disputed call between `reference_only`
and `conditional`** that a human curator should decide, citing the 1400-unit LE and the
documented ring-count difference as the affirmative case. I am **not** authorized to decide
this myself (mutation frozen) and would not want to even if I were — this is exactly the kind
of close call the mission brief asked me to surface rather than resolve by fiat.

### 3. Family-vs-model test

**Does "Crazy" denote a line, not just one product?** Yes, with primary-source confirmation
independent of the brief's given evidence: my own fresh CDX sweep of
`thecubicle.com/products/shengshou-crazy` found the name spans 2x2, 3x3, 4x4, 5x5, Magic Tower,
and Megaminx at TheCubicle alone, and SpeedCubeShop's existing sweep adds Pyraminx and Mirror
3x3/Pyraminx. This is the same cross-puzzle-size naming pattern already used in this archive to
justify Legend/Mr. M/Wind/Aurora as families (each covering only their own 3x3 instance of a
name that spans the manufacturer's whole range). `is_line_identity: true`,
`cross_range_naming: true` — both independently re-verified, not just inherited from the given
sources.

**V1 vs V2 vs Jelly LE — model or variant?** V1 and V2 carry a documented mechanism difference
(ring piece count) independent of the version label, which is model-level under DATA_MODEL
§4.2 ("different internal geometry... are a new model, whatever the marketing says"). Jelly LE
reads as a colourway/material limited-edition SKU (single "Transparent Stickerless" variant,
no distinguishing mechanism claim) layered onto one of the two generations — most plausibly a
**variant**, not a third model, though I could not confirm which generation it sits under from
the page text alone. I did not enumerate this as a variant record (out of this lane's mandate
and Pass 4's job regardless), only flag it for whoever does.

### 4. Existing-family check

None of the eight existing ShengShou families (`shengshou-3x3`, `-legend`, `-aurora`,
`-fangyuan`, `-wind`, `-pearl`, `-mr-m`, `-yufeng`) is a shape-mod/novelty line; all eight are
standard WCA-legal mainline 3x3s. "Crazy" does not fit under any of them — it is a categorically
different product concept (non-WCA-legal shape mod vs. standard cube), the same reasoning
already used to justify `shengshou-yufeng` as a new family rather than folding it into an
existing one.

### 5. Corroboration + duplication test

- **TheCubicle**: three distinct product pages (V1, V2, Jelly LE), fetched directly this
  session, each with its own SKU/price/spec table — not a duplicate listing.
- **SpeedCubeShop**: independent second publisher, confirms V1/V2 existence and the
  cross-size naming pattern (`speedcubeshop-shengshou-products-prefix-2026`, already in the
  archive).
- **Cubelelo**: no ShengShou Crazy SKU found in a fresh CDX check of `cubelelo.com` for
  "shengshou-crazy" (empty result). This is a genuine "not found," not a search failure — I
  confirmed the query returned successfully with zero rows, distinct from a timeout.
- **Cubezz**: carries a *different* ShengShou "Crazy" product (the 2x2 "Circle Ball," from
  2014) but no 3x3. Recorded as a related lead, not corroboration of the 3x3.
- **No HaiTun/ZhanLang-style false positive found**: SKUs and product IDs differ cleanly
  between V1 (`6670615871571`), V2 (`7049644212307`), and Jelly LE (`7986504597587`) — three
  genuinely distinct Shopify product records, not one relisted product under three names.

`independent_publishers: 2` for direct product-page evidence (TheCubicle, SpeedCubeShop);
Cubezz corroborates the "Crazy" brand concept generally but not this specific 3x3 SKU.

### 6. Disposition + confidence

**Disposition: A (genuine missing family), for the family only.** Model-level scope_class is
left as an explicit open/disputed question (see §2) rather than decided here.

- Family existence/identity: `confirmed` (two independent tier-2 publishers, cross-size naming
  independently re-verified via primary CDX evidence).
- Positioning (`special`): `probable`, by direct analogy to the two precedent Crazy families,
  both of which used an identical retailer "Shape Mods"/"Type: Cuboids" classification as their
  own evidentiary basis.
- V1/V2 generation split: `probable` (documented ring-count difference, not just a label).
- Model-level `scope_class`: **disputed/unresolved by design** — recommend `reference_only` for
  V1, and flag V2 for human adjudication between `reference_only` and `conditional`.
- Introduced date: `unknown` for the family/any model — no explicit dated statement was found
  anywhere; only crawl-timestamp and retailer "Added:" signals exist, both inadmissible as
  dates per policy.

### 7. Proposal if A

- `family.id`: `shengshou-crazy` (3x3-scoped, per this archive's convention of one family per
  manufacturer product-line name, 3x3 instance only)
- `name`: "ShengShou Crazy 3x3"
- `aliases`: none found beyond the version-number product titles themselves
- `introduced`: unknown (no dated statement; earliest usable "existed by" bound is TheCubicle's
  2023-02-06 capture of the base page, or 2021-12-15 if a future researcher decides the
  discarded "Added:" field is worth recording as a qualifier:before bound despite the
  archive's general policy against it — I did not make that call myself)
- `positioning`: special
- `scope_class` note (deferred, not decided): base/V1 recommended `reference_only`; V2
  flagged disputed between `reference_only` and `conditional` citing the 1400-unit Jelly LE and
  the documented ring-count mechanism change
- Models that would belong: base/V1 (`shengshou-crazy-3x3`), V2 (`shengshou-crazy-3x3-v2`),
  with a `succeeds` relationship V2→V1 at `confidence: probable` (documented mechanism change,
  not just a label)
- Attesting sources: `thecubicle-shengshou-crazy-3x3-generations-2026` (new, this session),
  `thecubicle-shengshou-other-3x3-lines-2026`, `speedcubeshop-shengshou-products-prefix-2026`,
  `thecubicle-shengshou-products-prefix-2026`

---

## ShengShou Rainbow 3x3

### 1. Evidence verified

Started from `thecubicle-shengshou-other-3x3-lines-2026`'s excerpt ("ShengShou's first
stickerless 3x3 cube," Type "3x3," 100g, 56.2mm, non-magnetic) and the Pass 2 record
(`speedsolving-wiki-shengshou-products`, tier 4: "ShengShou Rainbow (CaiHong) — Shengshou's
first attempt at a stickerless cube"). Then went well beyond the given evidence, because the
brief specifically flagged this as resting on one publisher, and the original Pass 2 note
(`research/notes/models/global-pass2-families.md` lines 328-330) explicitly deferred Rainbow
for exactly that reason ("no date and no further detail found... a future pass with more time
should reconsider it").

Fresh findings this session (fetched pages and ran CDX queries directly, not inherited):

- **SpeedCubeShop** (`speedcubeshop-shengshou-products-prefix-2026` names the URL but does not
  quote page text; I fetched it): `shengshou-rainbow-3x3x3`, captured 2016-01-08 — "ShengShou
  Rainbow 3x3x3 is ShengShou's first stickerless cube. This item is a bargain for the amount of
  performance that you get." $5.95. A Shopify JSON `weight` field of 119 (unit unstated),
  which does **not** match TheCubicle's later "Gross Weight 100g" — recorded as an unresolved
  spec discrepancy, not reconciled by assumption.
- **Cubelelo** (India, the non-US/English retailer check RESEARCH_SPEC §3.6a requires): a fresh
  CDX query (not covered by the existing `cubelelo-shengshou-products-prefix-2026` sweep, whose
  excerpt does not mention Rainbow) found
  `cubelelo.com/classic-cubes/3x3/shengshou-rainbow-3x3-stickerless` (2016-04-08) and two 2x2
  captures (2017). This is a **third independent publisher**, and the earliest re-fetch attempt
  failed on retry (connection error) — recorded honestly as "page text not obtained," with the
  CDX record itself (URL + timestamp, a distinct domain/SKU) used as existence evidence per
  RESEARCH_SPEC §3.5's allowance for CDX-level evidence.
- **TheCubicle "Rainbow 2x2"** (not previously cited anywhere in the archive): fetched directly,
  capture 2019-07-16 — "ShengShou Rainbow 2x2 is ShengShou's first stickerless 2x2 cube... a
  vibrant stickerless color scheme..." Type "2x2," 50.0mm. **This establishes cross-puzzle-size
  naming for Rainbow** (2x2 + 3x3), independently confirmed by Cubelelo's own 2x2 listings.
  No 4x4/5x5/Megaminx/Pyraminx Rainbow SKU was found anywhere searched.
- **Structural naming check**: a full 288-URL CDX sweep of `thecubicle.com/products/shengshou*`
  (run fresh, not the pre-existing 474-URL sweep) found "Rainbow" appearing *only* as its own
  top-level product name (`shengshou-rainbow-2x2/-3x3/-ball`), never as a `-rainbow` suffix
  appended to any other family's slug — structurally identical to how Aurora/Wind/Legend/Mr. M
  are each named, and structurally distinct from this retailer's own stickerless-variant-suffix
  convention (e.g. `shengshou-aurora-3x3-unstickered`, `shengshou-legend-3x3-unstickered`,
  `shengshou-4x4-v5-unstickered`). This is direct, source-based evidence against the
  "stickerless-variant-of-an-existing-line" reading the brief specifically asked me to test
  hard.
- A separate `shengshou-rainbow-ball` product exists (first capture 2022-10-01) — a non-cube
  novelty item sharing the brand word, not part of this cube line, noted and set aside.

New source created: `data/sources/shengshou-rainbow-independent-multi-retailer-2026.yml`.

### 2. Scope adjudication

Not an issue. Standard 3x3x3 mechanism, non-magnetic, no shape modification stated or implied
by any source. `scope_class: core`.

### 3. Family-vs-model test

**Does "Rainbow" denote a line, not just one product?** Yes — confirmed by primary evidence I
fetched myself (TheCubicle's own Rainbow 2x2 page, plus Cubelelo's independent 2x2 listings),
which the brief's given sources did not surface. This directly overturns the assumption implicit
in the brief's Test 2 framing (that Rainbow might be a single-SKU, single-size product): it is
not. `is_line_identity: true`, `cross_range_naming: true`.

**I specifically tested the "stickerless = variant, therefore Rainbow is a variant not a
family" hypothesis the brief asked me to test hard**, and reject it on structural naming
grounds: this retailer's own catalogue distinguishes a *variant* of an existing named line
(marked with a `-unstickered` suffix on the base family's slug) from a *distinct line name*
(a wholly separate top-level word). Rainbow follows the latter pattern consistently across both
its 2x2 and 3x3 instances, at two independent retailers. If Rainbow were simply "the stickerless
configuration of [some existing ShengShou 3x3]," I would expect to find it slugged as a
suffix on that model's name, the way every other stickerless configuration in this retailer's
ShengShou catalogue is slugged. I did not find that pattern anywhere.

No SpeedCubeShop or Cubelelo product page states which ShengShou mould/mechanism Rainbow
shares with any other named ShengShou 3x3, and the timeline (earliest evidenced circulation is
2015-2016, per the image-asset timestamp and SpeedCubeShop/Cubelelo captures) places it
*after* Wind and Aurora (2013) and *before* Legend and FangYuan (2016) in the wiki's own rough
chronology — i.e., its own era, not overlapping with the pre-2013 "many different versions"
cluster that `shengshou-3x3` (the family for ShengShou's original, unnamed-beyond-the-brand
3x3) explicitly covers.

### 4. Existing-family check

- **`shengshou-3x3`** (the original, unnamed, pre-2013, "many different versions" cube):
  Rainbow's earliest evidenced circulation (2015-2016) postdates this family's own documented
  era; no source connects them; rejected as a merge candidate.
- **The other six**: each is its own distinctly, separately named product in the same wiki
  bullet list Rainbow appears in — the wiki treats Rainbow exactly the same way it treats Wind,
  Aurora, Legend, FangYuan, Pearl, and Mr. M (one bullet, one name, no stated relationship to
  any other bullet). Treating Rainbow differently from its six list-mates, when it now has
  *stronger* multi-retailer, multi-region, cross-size corroboration than several of them
  (e.g. `shengshou-pearl`, which rests on the wiki alone plus one collection-absence check),
  would be an inconsistency, not a principled distinction.

### 5. Corroboration + duplication test

Three independent publishers found across two regions:
- TheCubicle (US), captures 2019 (2x2) and 2020 (3x3)
- SpeedCubeShop (US), capture 2016 (3x3)
- Cubelelo (India — the required non-US/English check), captures 2016-2017 (3x3 and 2x2)

Each is a genuinely distinct listing: different domains, different SKUs/prices, different
image assets, different capture years. This is not a HaiTun/ZhanLang-style same-SKU-different-
name false positive — the three retailers are selling three separately-listed products under
consistent naming, at different points across a four-year window.

**Duplication caveat, stated honestly**: the descriptive claim "ShengShou's first stickerless
cube" is worded nearly identically at SpeedCubeShop (2016) and TheCubicle (2020), and again
when TheCubicle restates the same template for the 2x2. Per RESEARCH_SPEC §3.2 this reads as
one underlying manufacturer/OEM description translated and republished by multiple retailers,
not independent editorial corroboration of the *significance claim itself*. I have therefore
recorded:
- Product **existence**: `confirmed` (three independent listings, DATA_MODEL rule 9)
- The **"first stickerless" significance claim**: `probable` only, not `confirmed`, because
  the wording pattern suggests a shared origin rather than independent verification

`independent_publishers: 3`.

### 6. Disposition + confidence

**Disposition: A (genuine missing family).** This is a stronger evidentiary case than at least
one already-accepted ShengShou family (`shengshou-pearl`, which the record admits is thin: "a
specific, dated, manufacturer-named product is stronger evidence than the pass's other excluded
ShengShou candidates (Rainbow, Gem, Tank)" — that comparison was true when only the bare wiki
line existed; it is no longer true with the multi-retailer, cross-size evidence assembled here).

- Family existence/identity: `confirmed` (three independent tier-2 publishers, two regions,
  four-year span, DATA_MODEL rule 9).
- Cross-size naming (2x2 + 3x3): `confirmed` (TheCubicle and Cubelelo agree independently).
- "First stickerless" significance/positioning claim: `probable` (near-identical wording across
  retailers, likely one underlying manufacturer description; not independently re-verified
  editorial content).
- `introduced`: `unknown`. No explicit dated statement exists anywhere found. The earliest
  usable "existed by" signal is SpeedCubeShop's 2016-01-08 capture (or, more speculatively, the
  ~September 2015 image-asset timestamp, which I deliberately did **not** use as a date per
  policy — it bounds an asset upload, not a stated release). A future record should use
  `qualifier: before` at year precision against the 2016 capture, exactly as `shengshou-yufeng`
  did for its own undated circulation evidence.
- Positioning: `mainline` (a standard low-price stickerless 3x3, consistent with the family's
  own description and with how the other seven ShengShou 3x3 families are positioned).

### 7. Proposal if A

- `family.id`: `shengshou-rainbow`
- `name`: "ShengShou Rainbow"
- `aliases`: ["CaiHong"] (per the Speedsolving wiki's parenthetical, `confidence: uncertain`,
  tier 4 only, not independently corroborated by any tier 1-3 source)
- `introduced`: unknown / `qualifier: before` 2016 (see above), `confidence: uncertain`
- `positioning`: mainline
- `scope_class`: not a family-level field; the one 3x3 model would be `core`
- Models that would belong: a single model, "ShengShou Rainbow 3x3" (no second generation or
  "V2" was found anywhere searched — this reads as a single-generation family, like Aurora,
  Wind, and Pearl)
- Attesting sources: `shengshou-rainbow-independent-multi-retailer-2026` (new, this session),
  `thecubicle-shengshou-other-3x3-lines-2026`, `speedsolving-wiki-shengshou-products` (tier 4,
  corroborates only)

---

## Leads not chased

- `shengshou-full-function-crazy-2x2` — whether this is the same mechanism concept as plain
  ShengShou "Crazy" or a second, distinct shape-mod line (echoing Calvin's naming) — 2x2 only,
  out of this lane's 3x3 scope.
- The Jelly LE's underlying generation (V1 8-piece or V2 9-piece ring) — not determinable from
  the page text fetched; a pass-4 variant researcher chasing this family would need to resolve
  it before assigning the variant to a parent model.
- The 100g (TheCubicle, 2020) vs 119 (SpeedCubeShop, 2016, unit unstated) weight discrepancy for
  Rainbow 3x3 — left unresolved; could reflect a genuine early/late spec difference, a unit
  mismatch, or a "net" vs "gross" weight convention difference between retailers. Not chased
  further this session.
- Cubelelo's 2016-04-08 Rainbow 3x3 page text — CDX record exists but the page itself could not
  be re-fetched this session (connection failure on retry, not a "not found"). A future session
  should retry the fetch rather than assume the failure means anything.
- Whether the ~September 2015 SpeedCubeShop image-asset cache-buster timestamp for Rainbow 3x3
  could support an earlier `qualifier: before` date than the 2016-01-08 page capture — flagged
  as a lead, deliberately not used as a date this session.
- Cubezz's 2014-dated "ShengShou Circle Ball Crazy Magic Cube" (2x2, ball-shaped) — confirms
  "Crazy" as a ShengShou concept since at least 2014, but is a different mechanism/shape from
  the 3x3 shape mod; not chased into whether a "Crazy Ball 3x3" or similar ever existed.

---

## Machine-readable summary

```yaml
- candidate: "ShengShou Crazy 3x3"
  disposition: A
  confidence: probable            # family-level; model-level scope_class left disputed
  evidence:
    - thecubicle-shengshou-other-3x3-lines-2026
    - thecubicle-shengshou-crazy-3x3-generations-2026
    - thecubicle-shengshou-products-prefix-2026
    - speedcubeshop-shengshou-products-prefix-2026
  wca_legal: false
  scope_class: conditional_or_reference_only_disputed   # see section 2; not decided by this agent
  clears_conditional_bar: uncertain
  is_line_identity: true
  cross_range_naming: true
  independent_publishers: 2
  authorize_mutation: false

- candidate: "ShengShou Rainbow 3x3"
  disposition: A
  confidence: probable
  evidence:
    - thecubicle-shengshou-other-3x3-lines-2026
    - shengshou-rainbow-independent-multi-retailer-2026
    - speedsolving-wiki-shengshou-products
  wca_legal: true
  scope_class: core
  clears_conditional_bar: n/a
  is_line_identity: true
  cross_range_naming: true
  independent_publishers: 3
  authorize_mutation: false
```
