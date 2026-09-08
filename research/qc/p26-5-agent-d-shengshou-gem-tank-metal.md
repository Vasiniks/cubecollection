# P26-5 Agent D — ShengShou Gem / Tank / Metal Cube Adjudication

Status: COMPLETE
Sources created this session: `shengshou-gem-tank-metal-cross-retailer-sweep-2026`
No family/model/manufacturer/variant records created or altered — proposals only, per the
Pass 3 taxonomy freeze.

## Candidate 1 — ShengShou Gem 3x3

### 1. Evidence verified
`thecubicle-shengshou-other-3x3-lines-2026`'s Gem excerpt (TheCubicle, captured 2020-09-18)
confirmed as read: "a new stickerless budget 3x3 that has just hit the market... unique due to
its 3-piece cap design and black plastic interior... shiny exterior... Great for beginners and
intermediate cubers." Spec table: Type "3x3"; Gross Weight 104g. No dimension, no date, no
price recorded in that excerpt. Non-magnetic, standard mechanism — `scope_class: core`
candidate, no WCA-legality question.

The Speedsolving wiki (`speedsolving-wiki-shengshou-products`, tier 4, self-flagged
"may be currently outdated") independently names it: "ShengShou Gem — One of the first 3x3s to
have black internals with capped pieces" — undated, one sentence, but corroborates the
"capped pieces" detail as a real, specific, non-generic design trait rather than retailer
invention.

The DaYan naming-trap is confirmed clear: no DaYan "Gem Cube" family or model exists anywhere
in `data/families/` or `data/models/` in this worktree, so there is no live conflation risk in
the current record set. Kept as a documented distinction regardless.

### 2. Family-vs-model test, including cross-range check
**Cross-range naming CONFIRMED, independently verified this session.** A direct CDX prefix
sweep of `thecubicle.com/products/shengshou-gem` (not merely re-reading the existing source)
returns 7 distinct URLs: `shengshou-gem-2x2` (2019-07-21), `-3x3` (2020-09-18), `-4x4`
(2020-12-03), `-5x5` (2019-07-16), `-gift-box` (2020-09-27), `-megaminx` (2020-09-27), and
`-pyraminx` (2020-09-27). This is the same evidentiary shape (a name reused across the 2x2
through 5x5 range plus Megaminx and Pyraminx, each its own dated product page and SKU) that the
existing `shengshou-legend`, `shengshou-aurora`, `shengshou-wind`, `shengshou-mr-m` and
`shengshou-yufeng` family records rest their line-identity claim on.

Cubelelo (a second, independent, non-US/English publisher) independently corroborates the same
naming pattern from outside TheCubicle: `shengshou-gem-pyraminx` (2021-05-17). This confirms
"Gem" is not a TheCubicle-invented catalogue label — a second retailer recognises and sells a
product under the same name — though it corroborates the *line name*, not the 3x3 SKU
specifically, since Cubelelo carries no `shengshou-gem-3x3` capture. SpeedCubeShop carries no
Gem-named product at all under either name (see §5).

Conclusion: Gem reads as a genuine line identity by the archive's own established test, not a
single-product artifact.

### 3. Existing-family check
Checked against all eight pre-existing ShengShou families. None is named Gem, and none plausibly
subsumes it:
- `shengshou-3x3` is explicitly the brand's *original*, unnamed, pre-2013, long-discontinued
  3x3 — a different era and a different (absent) name.
- The other six (Legend, Aurora, FangYuan, Wind, Pearl, Mr. M) are each their own distinctly
  named line by the same convention Gem itself follows; no source states or implies Gem is sold
  as a configuration option of any of them.

**Tested hard per the brief: is Gem a stickerless/finish variant rather than its own line?**
"Shiny exterior" and "black plastic interior" are appearance/finish language, and DATA_MODEL
§4.2 is explicit that stickerless and colourway differences sit at variant level. But that test
answers a different question than the one at hand: it distinguishes *variant* from *model*
within one already-identified product, not *family* from *no-family*. There is no source
showing Gem sold as a selectable finish option on an existing named product's own page; Gem has
its own independent product page and SKU on TheCubicle, and its own SKU across five further
puzzle types at TheCubicle and a sixth at Cubelelo — structurally identical to how every other
accepted ShengShou family is sold. The "3-piece cap design" is described as a a build trait of
Gem itself, not an option; whether that specific trait is mould-level (model-defining) or a
cosmetic cap (variant-level) cannot be settled from the wiki's one sentence and the retailer's
marketing paragraph, but that question is properly a **pass-4 model/variant question once a
model record exists**, not a reason to withhold the family itself.

### 4. Scope
Standard 3x3x3 shape and mechanism, non-magnetic, no material or size deviation reported.
`scope_class: core`, no conditional burden.

### 5. Corroboration and duplication test
- TheCubicle: fetched product page, tier 2, one publisher, one page directly read.
- TheCubicle CDX (this session): 7 URLs across 6 puzzle types + gift-box, tier 2, same
  publisher.
- Cubelelo CDX (this session): 1 URL (Pyraminx only), tier 2, independent second publisher —
  corroborates the *name* and *line*, not the 3x3 model itself.
- SpeedCubeShop CDX (this session): **no captures** under `products/shengshou-gem` at all. This
  is a clean negative result (the CDX query returned zero rows, not a fetch failure), recorded
  honestly as absence-of-stocking-at-this-retailer, not treated as evidence the product does not
  exist elsewhere.
- Speedsolving wiki: tier 4, corroborates only, one dismissive sentence, no date.
- No SKU/product-ID collision found with any other ShengShou or non-ShengShou line (the
  HaiTun/ZhanLang false-positive pattern was checked for and not found here).

Two publishers (TheCubicle, Cubelelo) independently attest the "Gem" name exists as a ShengShou
product line, satisfying DATA_MODEL/§3's two-independent-source bar for the *line-identity*
claim, though the 3x3 SKU's own detail (weight, description) still rests on TheCubicle alone.

### 6. Disposition + confidence
**Disposition A — genuine missing family.**
- Existence/name: `probable` (two independent tier-2 publishers corroborate the line name;
  3x3-specific spec detail rests on one).
- Cross-range naming / line identity: `probable`.
- Introduced date: `unknown`. No explicit dated statement found anywhere; TheCubicle's earliest
  capture (2020-09-18) is a circulation bound only, not a release date, and is not recorded as
  `introduced` at all rather than smuggled in as one (the wiki gives no date either).
- Positioning: `uncertain` (retailer copy calls it "budget," consistent with the archive's other
  ShengShou lines, but this is thin retailer framing rather than a manufacturer statement).

### 7. Proposal
- `family_id`: `shengshou-gem`
- `name`: "ShengShou Gem"
- `aliases`: none found (no romanised Chinese name surfaced, unlike Legend/ChuanQi,
  Aurora/JiGuang, Wind/Feng, Pearl/MingZhu — record as `unknown`, not invented)
- `introduced`: unset/`unknown` — no explicit dated statement
- `positioning`: `mainline`, confidence `uncertain`, matching the pattern already used for the
  other seven ShengShou families
- `scope_class`: `core`
- `attesting sources`: `thecubicle-shengshou-other-3x3-lines-2026` (`probable`, existence and
  description), `shengshou-gem-tank-metal-cross-retailer-sweep-2026` (`probable`, cross-range
  naming and Cubelelo corroboration), `speedsolving-wiki-shengshou-products` (`uncertain`,
  corroborating detail only)
- Models: one 3x3 generation would enumerate under this family in Pass 3 proper — a single,
  undated 3x3 design, `basis: community_convention` (no manufacturer-declared generation
  number found). Whether the "3-piece cap design" constitutes a distinct model-defining mould
  trait, or is itself a variant-level cosmetic cap, is left as an explicit open question for
  whoever executes this family, flagged `confidence: uncertain` rather than resolved here.

---

## Candidate 2 — ShengShou Tank 3x3

### 1. Evidence verified
`thecubicle-shengshou-other-3x3-lines-2026`'s Tank excerpt (TheCubicle, captured 2020-09-18)
confirmed as read: "a new economy 3x3 speed cube that features a vibrant color scheme, frosted
exterior, and black internals." Spec table: Type "3x3"; Gross Weight 100g; Dimensions 56.0mm.
Non-magnetic, standard mechanism — `scope_class: core` candidate.

The Speedsolving wiki independently names it: "ShengShou Tank 3x3 — A 3x3 similar to the Gem.
It's a pretty average budget cube. With puzzles like the RS3M existing, why even bother buying
this?" — undated, dismissive, but real and specific enough to place it in the RS3M era
(RS3M released ~2017), i.e. later than the pre-2013 original `shengshou-3x3`.

**A documented open question, not resolved here:** the wiki's "similar to the Gem" is a single,
weak (tier 4) comparative statement. It is not evidence the two share a mould — "similar" budget
cubes from the same manufacturer's same market segment is a common and unremarkable occurrence,
and TheCubicle's own descriptions give them different finish language (Gem: "shiny exterior" /
Tank: "frosted exterior") and different weights (104g vs 100g). Per DATA_MODEL's own
"split when unsure" instruction, this is recorded as a flagged relationship to investigate in a
future pass, not acted on by merging or by treating Tank as a Gem variant.

### 2. Family-vs-model test, including cross-range check
**Cross-range naming CONFIRMED, and the broadest of the three candidates, independently
verified this session.** A direct CDX prefix sweep of `thecubicle.com/products/shengshou-tank`
returns distinct product pages for `-2x2` (2019-08-24), `-3x3` (2020-09-18), `-4x4`
(2020-09-22), `-5x5` (2020-08-09), `-6x6` (2019-08-18, still resolving as of 2026-05-26), `-7x7`
(2020-09-21), `-8x8` (2020-03-29), `-megaminx` (2019-07-18), and `-pyraminx` (2019-07-16) — nine
puzzle types, the single broadest cross-range pattern found for any of this session's three
candidates, exceeding even the seven already documented in the brief. This is a stronger
line-identity signal, by the archive's own established test, than several already-accepted
ShengShou families (Pearl and Aurora each show only two or three sibling puzzle types).

### 3. Existing-family check
Same conclusion as Gem: none of the eight pre-existing families is named Tank or plausibly
subsumes it. `shengshou-3x3` is ruled out on the same era/naming grounds. **Tested hard whether
Tank is a finish variant of `shengshou-3x3` or of Gem itself:** no source states Tank is sold as
a selectable option on either product's own page; Tank has its own independent product page and
SKU across all nine puzzle types listed above, the same structural pattern used to justify every
other accepted family. "Vibrant colour scheme" and "frosted exterior" are appearance language
under DATA_MODEL §4.2, but as with Gem, that bears on the model/variant boundary within an
already-identified Tank line, not on whether a Tank line exists at all.

### 4. Scope
Standard 3x3x3 shape and mechanism, non-magnetic, 56.0mm — within normal WCA dimensional range,
no material deviation reported. `scope_class: core`, no conditional burden.

### 5. Corroboration and duplication test
- TheCubicle: fetched product page, tier 2, one publisher.
- TheCubicle CDX (this session): 9 puzzle types, tier 2, same publisher.
- SpeedCubeShop CDX (this session): **no captures** under `products/shengshou-tank` — a clean
  negative, not a fetch failure.
- Cubelelo CDX (this session): **no captures** under `products/shengshou-tank` — a clean
  negative, not a fetch failure.
- Speedsolving wiki: tier 4, corroborates only.

**Tank is the weakest of the three on cross-publisher corroboration despite having the
strongest single-publisher cross-range signal**: every piece of evidence for its existence,
across nine puzzle types and years of catalogue persistence, comes from TheCubicle alone.
Neither of the two other retailers checked stocks it under this name. This does not contradict
existence (a real product can be carried by only one major Western retailer, especially a
budget-tier SKU), but it means the existence claim itself is evidenced by one publisher only.

### 6. Disposition + confidence
**Disposition A — genuine missing family**, but at a lower confidence ceiling than Gem because
of the single-publisher limitation.
- Existence/name: `probable` (one tier-2 source, a first-party retailer spec table, nothing
  contradicting — the ceiling `reported`/`probable` line per the Pass 3 admission policy's claim
  class 2; not `confirmed`, since only one publisher was found despite a genuine attempt at two
  more).
- Cross-range naming / line identity: `probable` (same single-publisher ceiling, but internally
  very strong — nine independently dated, independently slugged product pages persisting across
  seven years of catalogue history is not the profile of a retailer typo or one-off SKU).
- Introduced date: `unknown`. No explicit dated statement; earliest TheCubicle capture
  (2019-07-16, Pyraminx) is a circulation bound only.
- Relationship to Gem: `disputed`-adjacent but not formally disputed — recorded as an open
  question (see §1) rather than a claim either way, since only one weak tier-4 source raises it
  and no source states a shared mould.

### 7. Proposal
- `family_id`: `shengshou-tank`
- `name`: "ShengShou Tank"
- `aliases`: none found — record as `unknown`
- `introduced`: unset/`unknown`
- `positioning`: `mainline`, confidence `uncertain`
- `scope_class`: `core`
- `attesting sources`: `thecubicle-shengshou-other-3x3-lines-2026` (`probable`),
  `shengshou-gem-tank-metal-cross-retailer-sweep-2026` (`probable`, cross-range naming),
  `speedsolving-wiki-shengshou-products` (`uncertain`)
- Models: one 3x3 generation, `basis: community_convention`, undated. The wiki's "similar to
  the Gem" comparison should be carried forward as a note for whoever executes this family, not
  as a resolved relationship.

---

## Candidate 3 — ShengShou Metal Cube 3x3

### 1. Evidence verified
`thecubicle-shengshou-other-3x3-lines-2026`'s Metal Cube excerpt (TheCubicle, captured
2025-08-10) confirmed as read: "a heavy 3x3. This puzzle has plastic internals, but the outside
is metal with a very cool finish on it... a matte-like finish that makes it very satisfying to
touch and solve. The turning is good as well! Especially for a non-magnetic, heavy-weight 3x3."
Spec table: Type "3x3 Speed Cubes"; Added 2024-11-21 (an "Added:" field — categorically
inadmissible as a release date per the Pass 3 admission policy §3, not used even as a bound
beyond "existed by this date"); Gross Weight 186g (roughly double a typical ~90-100g plastic
3x3); Dimensions 56.0mm.

### 2. Family-vs-model test, including cross-range check
**Cross-range naming NOT found.** A direct CDX prefix sweep of
`thecubicle.com/products/shengshou-metal` returns only `shengshou-metal-cube-3x3` and its
tracking-parameter/`.oembed` variants — no 2x2, 4x4, 5x5, Megaminx, or Pyraminx sibling under
this name at TheCubicle. This is the one candidate of the three that reads, on the cross-range
test, as a single product rather than a line — the same test that argues for Gem and Tank argues
against treating Metal Cube as a "line identity" on current evidence. (A same-named sibling may
exist and simply not have been captured by wayback's crawler; this is recorded as an honest
"not found," not "does not exist.")

A structurally similar but almost certainly **unrelated** "ShengShou Metallic" line was found at
SpeedCubeShop spanning 2x2/3x3/4x4/5x5/Pyraminx in both magnetic and non-magnetic form (earliest
capture 2023-09-28, pre-dating TheCubicle's Metal Cube capture by roughly two years). This reads
as a shiny stickerless colourway convention — the same class of appearance language as Gem's
"shiny exterior" — rather than an actual metal-shelled product, but the one page fetched
directly did not yield product-body text in this capture, so this is recorded as an **unresolved
lead**, not a conflation and not a rejection. Whichever way it resolves, it does not currently
supply cross-range corroboration for TheCubicle's Metal Cube, since no source states the two
names denote the same product.

### 3. Existing-family check
Not applicable in the usual sense: no existing ShengShou family carries a metal-exterior product,
and Metal Cube's defining trait (a metal shell over plastic internals) is not a finish/colourway
difference of the kind DATA_MODEL §4.2 assigns to variant level — a change of exterior *material*
from plastic to metal, if it is what it is described as, is a materials/construction difference,
which is the kind of thing that would ordinarily argue for a new family rather than folding it
into an existing plastic-bodied line. This makes existing-family placement not the live question
for Metal Cube; scope is.

### 4. Scope — decisive
This is a WCA-legality question this record cannot itself resolve. TheCubicle's own copy
states plainly that the puzzle is metal-exteriored and heavy (186g, roughly double a standard
3x3's weight). **No source found, tier 1 through tier 4, states whether this specific product is
WCA-legal, WCA-illegal, or has ever been used/permitted in a sanctioned competition.** My own
background knowledge of WCA material regulations is tier 5 and inadmissible per this archive's
own rules, so it is not used here even informally — this is recorded as `unknown`, not guessed.

Applying RESEARCH_SPEC §2.2 directly: a `conditional` record requires (a) `scope_justification`
prose stating *documented* significance, and (b) an attestation on that prose citing a tier 1–3
source. The only material available is TheCubicle's own marketing copy — "a very cool finish,"
"very satisfying to touch and solve" — which is exactly the "it is interesting" / "it is unusual"
class of language the admission policy explicitly rules out as a justification. No documented
production first, no documented influence on later designs, no documented collector market, and
no documented place in ShengShou's own history was found for this product. **It does not clear
the conditional bar on current evidence.**

Nor does it clear `core`: WCA-legality is `unknown`, not affirmatively established, and §2.1
sets `core` for WCA-legal 3×3 speedcubes specifically.

I also weighed, per the brief, whether a heavy metal novelty belongs in this archive under
§2.1/§2.4 at all even if a justification were found later — RESEARCH_SPEC does not exclude
novelties by category, only by the evidentiary bar in §2.2, so that is not an independent
reason to refuse; the evidentiary bar alone is sufficient grounds here.

### 5. Corroboration and duplication test
- TheCubicle: fetched product page, tier 2, one publisher — the only source found anywhere for
  this specific product.
- SpeedCubeShop and Cubelelo: no `shengshou-metal-cube` capture at either. SpeedCubeShop has the
  differently-named, differently-structured "Metallic" line discussed in §2, not treated as
  corroboration.
- Speedsolving wiki: no "Metal Cube" entry found in the 3x3 product-history section quoted in
  `speedsolving-wiki-shengshou-products` — consistent with this being a much more recent product
  (2024/2025-era) than that wiki page's own content, which itself carries a staleness warning.

Metal Cube rests on a single publisher with no independent corroboration of its existence at
all, in addition to failing the scope bar.

### 6. Disposition + confidence
**Disposition E — insufficient evidence for admission under current scope rules.** This is
distinct from disputing that the product exists: TheCubicle's page is a credible tier-2 source
and existence itself would support `reported`/`probable` confidence if scope were resolved.
The blocker is specifically the mandatory rule-15 evidence for `conditional` (not met — no
documented significance beyond marketing copy) combined with unresolved WCA-legality (blocking
`core`). Recording this as a refusal on evidence, per the brief's explicit statement that
refusing a candidate is a legitimate outcome, rather than forcing a `conditional` record on
copy that the admission policy names as the exact kind of language it exists to exclude.
- Existence: `reported` (one tier-2 source, uncontradicted, but genuinely single-publisher).
- WCA-legality: `unknown`.
- Scope: does not clear `conditional`; does not qualify for `core`.

### 7. Proposal
No family proposed. Recommendation for a future pass: seek (a) an explicit statement of this
product's WCA-legal status (material/weight compliance) from any tier 1–3 source, and (b) a
documented significance claim beyond "cool finish" copy — a collector-market signal, a
production-history claim, or a stated place in ShengShou's own catalogue narrative. Absent
either, this candidate should remain unrecorded (not even at `reference_only`, since that class
is reserved for identity-only records needed to make a lineage intelligible, and Metal Cube is
not a predecessor/successor of anything in scope).

---

## Comparison table

| | Gem 3x3 | Tank 3x3 | Metal Cube 3x3 |
|---|---|---|---|
| Cross-range naming | Yes — 6 types (TheCubicle) + Pyraminx (Cubelelo) | Yes — 9 types (TheCubicle only) | No — 3x3 only, no sibling found |
| Independent publishers | 2 (TheCubicle, Cubelelo) | 1 (TheCubicle only) | 1 (TheCubicle only) |
| WCA legality | Yes (standard non-magnetic 3x3) | Yes (standard non-magnetic 3x3) | Unknown |
| Scope class if admitted | `core` | `core` | Does not clear `conditional`; not `core` |
| Existence confidence | `probable` | `probable` | `reported` |
| Line-identity confidence | `probable` | `probable` | n/a (no line found) |
| Disposition | **A** — genuine missing family | **A** — genuine missing family | **E** — insufficient evidence (scope bar) |
| Introduced date | `unknown` | `unknown` | `unknown` |

The three candidates did **not** converge on the same answer, as instructed: Gem and Tank pass
the cross-range/line-identity test that this archive already uses for five of its eight existing
ShengShou families, while Metal Cube fails that same test and additionally fails the scope bar
that is specific to it. Tank has the strongest internal (single-publisher) line evidence of the
three but the weakest external corroboration; Gem has the best cross-publisher corroboration.

## Leads not chased

- **Gem/Tank shared-mould question.** The Speedsolving wiki's "Tank — A 3x3 similar to the Gem"
  is a real, if weak, comparative claim not chased further. A future pass with access to
  measured/photographed units (archivist tier-1 evidence per RESEARCH_SPEC §3.1) could settle
  whether Tank and Gem share an underlying mould, which would bear on whether they should later
  be treated as two models of one family rather than two families — that would be a taxonomy
  change outside this session's authority regardless.
- **SpeedCubeShop "ShengShou Metallic" line.** Spans 2x2/3x3/4x4/5x5/Pyraminx, magnetic and
  non-magnetic, first captured 2023-09-28. Not chased to a full product-page read (the one fetch
  attempted returned only site chrome). Worth a dedicated future check both to confirm it is
  genuinely unrelated to Metal Cube and, independently, because it may itself be an
  under-documented ShengShou budget line with no family record — outside this session's three
  assigned candidates.
- **Metal Cube WCA-legality and significance.** No search for this was completed to a
  conclusive answer (general web search budget was exhausted mid-session at the platform level,
  not specific to this query — recorded honestly as "not chased to completion," not as
  "searched and found nothing"). A future pass should treat this as open, not settled.
- **Cubezz, Lightake, Kewbz** were named in the brief as corroboration candidates for all three
  but were not reached before the session's web-search budget was exhausted. Not searched;
  absence of a finding here is not evidence of absence.
- **DaYan "Gem Cube."** Confirmed absent from current `data/families/`/`data/models/`, so no
  live conflation exists, but the underlying DaYan product itself was not independently
  re-verified this session beyond checking it has no record here.

## Machine-readable summary

```yaml
- candidate: "ShengShou Gem 3x3"
  disposition: A
  confidence: probable
  evidence:
    - thecubicle-shengshou-other-3x3-lines-2026
    - shengshou-gem-tank-metal-cross-retailer-sweep-2026
    - speedsolving-wiki-shengshou-products
  wca_legal: true
  scope_class: core
  clears_conditional_bar: n/a
  is_line_identity: true
  cross_range_naming: true
  independent_publishers: 2
  authorize_mutation: false

- candidate: "ShengShou Tank 3x3"
  disposition: A
  confidence: probable
  evidence:
    - thecubicle-shengshou-other-3x3-lines-2026
    - shengshou-gem-tank-metal-cross-retailer-sweep-2026
    - speedsolving-wiki-shengshou-products
  wca_legal: true
  scope_class: core
  clears_conditional_bar: n/a
  is_line_identity: true
  cross_range_naming: true
  independent_publishers: 1
  authorize_mutation: false

- candidate: "ShengShou Metal Cube 3x3"
  disposition: E
  confidence: reported
  evidence:
    - thecubicle-shengshou-other-3x3-lines-2026
    - shengshou-gem-tank-metal-cross-retailer-sweep-2026
  wca_legal: unknown
  scope_class: n/a
  clears_conditional_bar: false
  is_line_identity: false
  cross_range_naming: false
  independent_publishers: 1
  authorize_mutation: false
```

Note on `authorize_mutation`: this agent has no authority to create, rename, merge, split or
re-parent any family, model, manufacturer or variant record under the Pass 3 taxonomy freeze.
`false` on all three reflects that constraint, not a judgement that Gem/Tank are unworthy of
creation — disposition A on both is precisely the "ready to execute, awaiting a human/authorised
pass" recommendation the brief asked for.
