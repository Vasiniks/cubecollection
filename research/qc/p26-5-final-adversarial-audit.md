# P26-5 Final Adversarial Audit

Adversarial review of six proposed new families (cubetwist-3x3, dayan-bermuda,
shengshou-rainbow, shengshou-gem, shengshou-tank, shengshou-crazy) prior to canonical creation.
Goal: attempt to disprove at least one candidate. Method: re-verified every cited source file
directly (not just the four lane reports), re-applied DATA_MODEL §4.2 and RESEARCH_SPEC §2.2/
§3.2 myself, and traced every load-bearing claim back to whether it is actually preserved,
independent, and correctly typed as tier 1/2/4 per `RESEARCH_SPEC.md` §3.1 / `DATA_MODEL.md`
§5.1.

**Outcome: no candidate should be refused or collapsed into an existing family.** One genuine,
concrete evidentiary defect was found (DaYan Bermuda's model-boundary claim), one broken
cross-reference was found (ShengShou Gem's DaYan-disambiguation citation), and several
lower-value advisory items are recorded. None of these individually disprove a family, but the
Bermuda defect should block *how* its models get written, not the family record itself.

---

## 1. cubetwist-3x3

**What I attacked.** (a) Whether `cubetwist-com-2010-official-site`'s reading of the Chinese
nav is accurate and whether it is really the same entity as the puzzle-selling "CubeTwist." (b)
Whether the SpeedCubeShop brand page genuinely adds independent weight, as Agent A's own report
claims in §6. (c) Whether a 2010-only tier-1 source plus 2011/2015 retailer listings actually
establish a line reaching into 2016–2026.

**What I found.**
- The nav reading is directly supported by a verbatim archived excerpt: 三阶梯色魔方 (3rd-order/
  3x3x3) is listed as its own category, coordinate with 二阶/四阶/七阶 (2x2/4x4/7x7), and
  separate from 异形梯色魔方 (shaped/novelty). This is a correct reading — 阶 (order) is the
  standard NxNxN term in Chinese cubing usage and 异形 is the standard "irregular shape" term.
  The page `<title>` itself pairs "cubetwist" and "梯色魔方" directly ("梯色魔方三阶原色--
  cubetwist梯色魔方|梯色魔方"), which is first-party self-identification, not a retailer or
  researcher inference. I find no defect here.
- Continuity into the window is real and independently checkable: `cubezz-cubetwist-speed-3x3`'s
  own reliability_note documents a `npm run wayback -- list` check showing captures from
  2015-04-29 through 2026-03-05 with no discontinuation gap, plus a live re-fetch of the
  2026-02-08 capture confirming "Status: In Stock" at the same 57.0mm/94.0g spec. That is a
  real, reproducible continuity check, not an assumption.
- **The SpeedCubeShop claim is overstated in the report's prose, though not in the proposed
  attestations.** `speedcubeshop-cubetwist-brand-page-2014`'s own reliability_note says
  plainly: *"Does NOT independently corroborate the existence of CubeTwist's standard 3x3x3
  product specifically... Recorded as brand-identity corroboration only... do not cite this
  source for the 57mm/94g specification or for the 3x3x3 line's existence on its own."* Agent
  A's report §6 nonetheless states *"Retailer evidence at Cubezz, Lightake and SpeedCubeShop
  corroborates commercial circulation across three publishers and two continents"* — that is not
  what the SpeedCubeShop source supports (its own product grid was captured empty). This does
  **not** propagate into the actual proposed YAML: `/name`, `/introduced`, and `/positioning`
  cite only the two tier-1 CubeTwist-official sources and Cubezz, never SpeedCubeShop. So the
  overclaim is confined to narrative framing, not to what would be written into the record.

**Verdict: SOUND.** Create as proposed, `confirmed`, at `core`. One advisory correction needed
in the report prose (not the record): SpeedCubeShop corroborates brand recognition only, not the
3x3 product's existence — "three publishers" for the product itself should read "two, one of
which (Lightake) shares Cubezz's SKU numbering and is not independent per §3.2."

---

## 2. dayan-bermuda

**What I attacked.** (a) Whether the official category page really names five distinct
sub-products rather than colourways. (b) Whether they are genuinely different exterior moulds
rather than a retailer/researcher over-read. (c) Whether all five are 3x3x3-based. (d) Whether
`conditional` clears the bar for every one of the five individually.

**What I found.**
- `dayancube-official-bermuda-category-2012` is a real, dedicated tier-1 category page (not a
  single line-item) that names, in DaYan's own words, "Dayan Bermuda Triangle" (eight planet
  colourways × Black/White), "Dayan Bermuda House I," "House II," "Column," and "Star" as
  separate named products, sitting coordinate with GuHong/LingYun/LunHui/ZhanChi/Gem Cube in
  DaYan's own nav. This part is solid and correctly overturns the "decorative colourway naming"
  reading recorded in `thecubicle-dayan-bermuda-cube-2020` (whose own excerpt, still on file,
  reads: *"read as decorative colourway naming across a shared bandaged-3x3 design"* — that
  source record's own text was never corrected and now visibly disagrees with the family
  proposal built on top of it; a future editor should add a superseding note to that source
  file, not just to the family record).
- **The load-bearing "these are genuinely different exterior moulds" claim is not properly
  sourced.** Agent B's report states: *"I pulled the actual TheCubicle product photos (2020
  Shopify CDN images, fetched directly this session)... 'Column' is an octagonal-cylinder
  exterior shape, 'House I' and 'House II' are two distinct house/roofline exterior shapes,
  'Star' is a star/flower exterior shape."* This is the single fact that turns four of the five
  Bermuda sub-products from *variants* into *models* under DATA_MODEL §4.2's mould test. But
  **no source record was created for this observation.** `git show --stat` on Agent B's two
  commits shows exactly one new file: `dayancube-official-bermuda-category-2012.yml`. That
  source's own excerpt *paraphrases* the photographic claim in a paragraph headed "Retailer
  product photography (fetched directly this session from TheCubicle's own 2020-2021 Shopify
  CDN image URLs, not reproduced in this excerpt)" — i.e. the images themselves were never
  preserved (no `archive_url` to the image, no `local_capture` with a checksum, no still image
  quoted or embedded). This is exactly the class of finding RESEARCH_SPEC's preservation rule
  exists to catch: "archivist... photography" is admissible as tier 1 only when it is *recorded*
  as a source with a preservation method, not when it is a researcher's own unlogged
  description of images that were viewed once and not kept.
  - This is not fatal to the family. TheCubicle's own tier-2 text (`thecubicle-dayan-bermuda-
    cube-2020`) independently states the Bermuda series covers *"a variety of common 3x3
    puzzles and shape-mods"* (plural, distinct shapes) — a textual, properly-preserved tier-2
    fact that supports "more than one shape" without needing the photo claim. And the
    manufacturer's own choice to give House I, House II, Column and Star *shape-descriptive*
    names (not colour or theme names, unlike the eight Triangle planets) is itself suggestive.
    But neither of those pins down the *specific* geometry claims ("octagonal cylinder,"
    "different rooflines between House I and House II") that a model record would want to state
    as fact. As written, those specific claims rest on an unsourced, unpreserved observation.
  - **Recommendation, not a decision I am making:** before creating House I/House II/Column/
    Star as separate model records with those specific shape descriptions, either (a) create a
    proper source record preserving the product images (archive_url to the Wayback-captured
    product pages showing the images, or a local_capture with checksum), or (b) write the model
    descriptions to rely only on the two properly-sourced facts (distinct official names +
    "variety of...shape-mods" retailer text) and record the specific geometry as `probable`/
    `reported` prose attributed to "researcher description of retailer photography, not
    independently re-verifiable from a preserved source" rather than as a flatly-stated fact.
- All five read as 3x3x3-based on the same tier-2 sentence ("common 3x3 puzzles and shape-mods
  ... bandaged"), which is adequate but generic — it does not confirm shape-by-shape that each
  of the five specifically retains 3x3x3 turning logic rather than some other mechanism. I did
  not find a source that breaks this down per-shape. Left as a minor gap, not a blocker: nothing
  contradicts it, and TheCubicle's own "Shape Mods" retailer category (used identically for the
  already-admitted `mf8-crazy-3x3x3` and `calvins-crazy-3x3`) is the archive's established
  evidentiary bar for this exact class of claim.
- On the `conditional` bar per sub-product: the justification is argued once, at the line level
  (documented manufacturer-history placement + multi-year multi-retailer sales), and applied to
  all five uniformly. I checked whether any of the five is thin enough to fail individually:
  `thecubicle-dayan-bermuda-cube-2020`'s own text confirms TheCubicle's prefix independently
  carries a "barrel" (Column), two "house" variants, and a "sunflower" (Star), so all five do
  have their own retailer presence, not just Triangle. I did not find a basis to fail any one of
  the five individually — the line-level justification transfers reasonably to each.
- A tangential check I ran: the same tier-1 page also names "Dayan Crazy Cube" and "DaYan Gem
  Cube" as further coordinate top-level products, unmentioned in Agent B's report. This looked
  at first like an unflagged lead, but it is **not** — a separate, already-existing source
  (`thecubicle-dayan-non-3x3-lines-2026`, Pass 2.6) already resolved both: DaYan Gem Cube is a
  non-3x3x3 multifaceted puzzle (out of scope) and "DaYan Crazy Cube" names a pentahedron-shaped
  line (also out of scope; the 3x3-shaped "DaYan+MF8 Crazy" collaboration is a different product
  already covered by the existing `mf8-crazy-3x3x3` family). No live gap. I record this only to
  show the check was made, not as a finding.

**Verdict: WEAKENED.** The family itself (`dayan-bermuda`, `confirmed`, five named sub-products)
is well-supported and should be created. But the planned **model-level** split into five models
rests, for four of the five, on a photographic claim that was never preserved as a citable
source. Recommend: **hold the specific mould-geometry language** (octagonal cylinder, distinct
rooflines) at `probable`/`reported` with an honest note about how it was obtained, or add a
proper preserved source before writing it as `confirmed` fact. This is squarely the kind of
under-the-hood defect a build script cannot detect, since nothing in the schema requires an
excerpt to actually correspond to a citable, re-checkable observation.

---

## 3. shengshou-rainbow

**What I attacked.** (a) Whether the `-unstickered` discriminator Agent C used to reject
"Rainbow = stickerless variant of an existing line" is reliable across TheCubicle's own
catalogue, or cherry-picked. (b) Whether "ShengShou's first stickerless cube" is being
overclaimed as fact.

**What I found.**
- The discriminator holds on the evidence available but the sample is thin: exactly two
  confirmed instances of the `-unstickered` suffix pattern for an existing ShengShou line
  (`shengshou-aurora-3x3-unstickered`, `shengshou-legend-3x3-unstickered`), both visible
  independently in the pre-existing `thecubicle-shengshou-products-prefix-2026` sweep (474
  URLs) as well as Agent C's own fresh 288-URL re-sweep. I looked for counter-examples — a
  genuinely separate line using `-unstickered`, or a real variant getting a wholly new top-level
  name — and found none in either sweep. I also found the retailer's naming is **not** perfectly
  systematic (`shengshou-legend-3x3-metallic`, `shengshou-legend-3x3-m-metallic`, and
  `shengshou-big-legend-3x3-7-0cm` use prefix- or different-suffix conventions for other variant
  axes), so the discriminator is reliable *specifically for stickerless*, not proof that
  TheCubicle's naming is uniform in general. That is a fair caveat, not a refutation — Agent
  C's test targeted exactly the axis in question (stickerless) and found no counter-example on
  that axis.
- Independent of the discriminator, Rainbow has its own 2x2 sibling at TheCubicle and Cubelelo,
  giving cross-puzzle-size naming — the archive's own established line-identity test, applied
  consistently to Legend/Aurora/Wind/Mr. M. That alone is a second, independent argument against
  the stickerless-variant reading.
- "ShengShou's first stickerless cube" is correctly downgraded to `probable`, not `confirmed`,
  on the explicit ground that the phrase is near-identical between SpeedCubeShop (2016) and
  TheCubicle (2020) — properly read as one underlying description republished, per §5.2 rule 1.
  This is the right call and matches exactly the caution the audit brief asked me to check for
  ("first cube to use X" claims). Good practice, not a defect.
- **A calibration inconsistency, not an inflation.** Agent C's own prose states *"Family
  existence/identity: confirmed (three independent tier-2 publishers...)"* — which is correct
  under rule 9 (two-or-more independent tier 2 sources agreeing = confirmed) — but the report's
  own machine-readable summary at the bottom instead states `confidence: probable` for the whole
  candidate, and that is the value that propagated into the adjudication table. This
  under-states rather than over-states the evidence for bare existence, so it is not a
  confidence-inflation problem, but it is an internal inconsistency that should be resolved by
  whoever writes the actual record: `/name` should likely be attested `confirmed` (three
  independent, non-mirroring publishers), while `/introduced`, `/positioning`, and the "first
  stickerless" claim in `/description` stay at `uncertain`/`probable` as already argued — mirroring
  how every other ShengShou family already attests different confidence per field rather than
  one blanket value.

**Verdict: SOUND**, with the per-field confidence split above recommended at record-creation
time. This is, if anything, the best-evidenced of the four `probable` ShengShou candidates.

---

## 4. shengshou-gem

**What I attacked.** (a) Whether "shiny exterior... 3-piece cap design" is finish/variant
language that should keep Gem inside an existing line rather than founding a new one. (b) The
DaYan "Gem Cube" name-collision risk.

**What I found.**
- The finish-language test is answered correctly: DATA_MODEL §4.2 distinguishes *model/family
  identity* from *model/variant boundary*, and Gem has its own independent product page and SKU
  across six puzzle types at TheCubicle plus a seventh (Pyraminx) independently at Cubelelo —
  the same structural signal used to justify five of the eight existing ShengShou families. No
  source shows Gem sold as a selectable configuration on another named ShengShou product's own
  page. I agree family status is correct; whether "3-piece cap design" is itself model-defining
  (a mould trait) or a cosmetic cap is properly left open for Pass 4, as Agent D recorded.
- The DaYan name collision is real in name only and already defused: `thecubicle-shengshou-
  other-3x3-lines-2026`'s own excerpt states *"this is a distinct product from DaYan's own,
  differently-shaped 'Gem Cube' series (see thecubicle-dayan-gem-cube-i-2019)."*
  **`thecubicle-dayan-gem-cube-i-2019` does not exist anywhere in `data/sources/`** — I grepped
  the directory and confirmed no such file. The content that *does* resolve this distinction
  lives instead in `thecubicle-dayan-non-3x3-lines-2026.yml` (which correctly documents DaYan's
  Gem Cube as a non-3x3x3 multifaceted puzzle, out of scope). This is a dangling citation inside
  a source file's own excerpt text — not a structural schema violation (it's prose, not a
  `sources:` array reference, so `npm run validate`'s rule 2 will not catch it), but it is a
  real defect: a future researcher following that citation to verify the DaYan-disambiguation
  claim will hit nothing. **Recommend fixing the citation in `thecubicle-shengshou-other-3x3-
  lines-2026.yml`'s excerpt to point at `thecubicle-dayan-non-3x3-lines-2026` before or shortly
  after Gem is created.**

**Verdict: SOUND** at `probable`, with the dangling-citation fix above as a small housekeeping
item, not a blocker to family creation.

---

## 5. shengshou-tank

**What I attacked directly, per the brief's instruction to "push harder":** the wiki's "Tank —
A 3x3 similar to the Gem" line, and whether Tank should instead be a model under `shengshou-gem`
or refused for being a marketing repackaging of Gem.

**What I found.**
- No agent in this round fetched or compared product photography for Gem 3x3 and Tank 3x3,
  despite this being flagged as an open question by *two independent lanes* (Agent C's Rainbow/
  Crazy report and Agent D's Gem/Tank/Metal report both name the same wiki sentence
  independently) and despite the *same technique* being successfully used elsewhere in this
  very round (Agent B fetched and compared Bermuda's product photos). This is a real, avoidable
  evidentiary gap on the single most-flagged open question in this batch.
- The textual evidence available leans toward "genuinely separate," not "same mould relabelled":
  - Weight differs (Gem 104g vs Tank 100g) and finish differs (Gem "shiny exterior" vs Tank
    "frosted exterior") — a shiny vs. frosted surface treatment is a real, physically
    distinguishable trait, not merely different marketing copy for the same object.
  - Gem's description explicitly names its distinguishing "3-piece cap design" as a selling
    point; Tank's description names no cap design at all. If Tank shared Gem's distinguishing
    structural trait, a retailer writing separate marketing copy for a "similar" product would
    plausibly still mention it, since it is Gem's headline differentiator. Its absence is weak
    evidence against a shared mould, not proof.
  - The two lines are sold **in parallel, not in succession**: Gem spans 2x2–5x5 + Megaminx +
    Pyraminx (7 URLs, TheCubicle) while Tank spans 2x2–8x8 + Megaminx + Pyraminx (9 URLs,
    TheCubicle), with both first captured in the same 2019–2020 window and both still-current
    lines rather than one superseding the other. If Tank were a rebadge or successor of Gem, I
    would expect one line to replace the other in the catalogue, not two full, independently
    maintained, overlapping-but-distinct size ranges sold side by side for years. This is
    circumstantial but points toward two real, separate ShengShou budget lines rather than one
    line under two names.
  - Against this: a wide 2x2–8x8 span is also a very ordinary pattern for a generic cheap
    "starter/big-cube" ShengShou line on its own, so cross-range breadth alone does not
    distinguish Tank from a rebadged Gem as strongly as it would for a more curated line.
- Tank's confidence is correctly calibrated: `probable`, single publisher, explicitly disclosed
  as the weakest of the four `probable` candidates. This matches the vocabulary exactly ("one
  Tier 2 source, uncontradicted") — not overstated.

**Verdict: SOUND**, create as proposed at `probable`. But I flag this as **material, not
cosmetic**: the wiki's "similar to the Gem" comparison and the specific textual counter-evidence
above should both be written into the family's `description`/notes (Agent D's proposal already
plans to carry the wiki line forward — confirm this happens), and a photographic comparison of
Gem 3x3 vs Tank 3x3 (fetchable via the same TheCubicle Shopify-CDN technique Agent B used for
Bermuda) should be a near-term follow-up before any Pass 4 model/variant work assumes they are
unrelated designs. I did not find evidence strong enough to merge them now, and DATA_MODEL §4.2's
own instruction ("when unclear, default to new model... splitting is recoverable by merge") argues
for keeping them separate under the current evidence — but this is the single question in the
whole batch most worth another hour of research before it is treated as settled.

---

## 6. shengshou-crazy

**What I attacked.** (a) Whether the V1→V2 "9 pieces per ring vs 8" claim is a real mechanism
difference or a marketing refresh. (b) Whether a third maker's "Crazy" line clears the §2.2
significance bar the way mf8's and Calvin's already-admitted lines did.

**What I found.**
- The ring-piece-count claim is TheCubicle's own structured product copy for V2
  (`thecubicle-shengshou-crazy-3x3-generations-2026`): *"The V2 has more pieces (9 total) in
  each ring, adding yet another layer of difficulty."* This is phrased as a specification
  (a countable, falsifiable physical fact), not a superlative, and is exactly the kind of claim
  RESEARCH_SPEC §3.3 treats as tier-1-for-specifications-even-from-marketing-adjacent-copy —
  here from a tier-2 retailer, so `probable`, single-source, correctly labelled. I found no
  reason to doubt this reading; it satisfies DATA_MODEL §4.2's "tooling/internal geometry
  differs → different model" test independent of the "V2" label. No defect.
- On whether the family clears `conditional`: Agent C's own analysis is unusually careful here
  — it explicitly declines to force a decision, lays out both directions, and defers the V1/V2
  scope_class split to human review, recommending `reference_only` for the base and flagging V2
  as genuinely disputed. I re-ran the comparison against the two existing "Crazy" precedents
  (`mf8-crazy-3x3x3`: documented decade-plus circulation and a joint DaYan+MF8 attribution;
  `calvins-crazy-3x3`: only one capture, no generations, no LE) and agree with Agent C's own
  conclusion: ShengShou Crazy sits between the two, closer to Calvin's than to MF8's. I did not
  find grounds to push the family disposition itself below `probable`, and I did not find
  grounds to force a scope_class decision that a human should be making.
- One naming-adjacency risk, already flagged but worth restating plainly: `shengshou-full-
  function-crazy-2x2` (a separate ShengShou line echoing Calvin's own "Full-Function Crazy...
  Center-Locking" naming) exists and shares the "Crazy" word but not the plain-"Crazy" name.
  This is correctly kept out of the family's aliases in the proposal. No live risk, but a future
  researcher extending "ShengShou Crazy" toward 2x2 should not silently fold this in — it may be
  a second, distinct ShengShou shape-mod concept borrowing Calvin's naming convention, not the
  same line.

**Verdict: SOUND** for family creation at `probable`; the model-level `scope_class` question is
correctly left open for a human decision rather than resolved by either lane or by me.

---

## Confidence-calibration table

| Candidate | Proposed | Per `vocab/confidence.yml` / rule 9 | Verdict on calibration |
|---|---|---|---|
| cubetwist-3x3 | confirmed | Justified — two tier-1 manufacturer-official sources for `/name` | Correct, not inflated |
| dayan-bermuda | confirmed | Justified for family/name (one tier-1 category page naming all five) — **not** justified yet for the specific mould-geometry claims on 4 of 5 sub-products (unpreserved photographic source) | Family confidence correct; **model-level geometry claims should not be `confirmed`** |
| shengshou-rainbow | probable | Understated, if anything — three independent, non-mirroring tier-2 publishers agree on bare existence, which meets rule 9's letter for `confirmed` on `/name` | Not inflated; recommend per-field split at record-creation time |
| shengshou-gem | probable | Justified — one full-detail publisher (TheCubicle), one line-name-only second publisher (Cubelelo) | Correct |
| shengshou-tank | probable | Justified — exactly one publisher, matches vocab's own definition of `probable` precisely | Correct, and honestly disclosed as the weakest of the four |
| shengshou-crazy | probable | Justified — two independent publishers on cross-range naming; V1/V2-specific claims single-publisher | Correct; model-level scope_class correctly left undecided |

**No confidence was found to be overstated anywhere in this batch.** The two apparent
"confirmed" calls both rest on genuine tier-1 sources. The four "probable" calls are calibrated
correctly or, in Rainbow's case, arguably conservative. The one real defect is not a confidence
number but an **unpreserved source** behind a specific factual claim (Bermuda's mould
geometries), which is a different failure mode than confidence inflation — it is a claim that
currently cannot be independently re-checked by anyone who did not personally view the same
CDN images in the same session.

---

## Overall statement

None of the six candidates should be refused, and none should be collapsed into an existing
family — I tried directly to break each one on the specific angle the brief supplied (Tank⊂Gem,
Rainbow-as-variant, Gem-as-variant, Crazy-as-non-significant, Bermuda's mould claims,
CubeTwist's tier-1 reading, confidence inflation) and none of those attacks succeeds as a reason
to refuse or merge. The batch should proceed substantially as adjudicated.

What should change before execution:
1. **DaYan Bermuda (blocking on model-level detail, not on family creation):** do not write
   `confirmed`, or the specific exterior-geometry descriptions (octagonal cylinder, distinct
   rooflines), into the House I/House II/Column/Star model records without either (a) a proper
   preserved source for the product photography, or (b) softening those specific claims to
   `probable`/`reported` with an honest note about how they were obtained. The family record
   itself (five named sub-products, `confirmed`, from the tier-1 category page) is sound.
2. **ShengShou Gem:** fix the dangling citation to `thecubicle-dayan-gem-cube-i-2019` (does not
   exist) inside `thecubicle-shengshou-other-3x3-lines-2026.yml`'s excerpt — point it at
   `thecubicle-dayan-non-3x3-lines-2026`, which actually carries that content.
3. **ShengShou Tank:** treat the Tank/Gem relationship as an open, prioritized follow-up (a
   photographic comparison is feasible and unusually cheap given the technique is already
   proven this round), not a closed question — but this does not block creating Tank as its own
   family now.
4. **CubeTwist:** correct the report's own prose in §6, which overstates SpeedCubeShop's
   contribution beyond what that source's own reliability_note supports; this does not affect
   the proposed record's actual attestations.
5. **ShengShou Rainbow:** when writing the record, split confidence per field rather than using
   one blanket value — `/name` plausibly warrants `confirmed` given three independent,
   non-mirroring publishers, which the report's own prose argues but its summary table
   understates.

**The single strongest objection found in this audit:** DaYan Bermuda's claim that House I,
House II, Column, and Star are four genuinely distinct exterior moulds — the fact that
determines whether this family gets five models or one model with variants — rests on a
researcher's own description of product photography that was viewed once this session and never
preserved as a citable source. That is precisely the "plausible correction applied without
evidence" failure mode this role exists to catch, even though in this case the underlying
conclusion is probably right (the manufacturer's own shape-descriptive naming and TheCubicle's
"variety of...shape-mods" text both point the same way) — the specific geometric descriptions
that would go into the model records are not yet backed by anything a future researcher could
re-check.

---

## Machine-readable verdicts

```yaml
candidates:
  - id: cubetwist-3x3
    verdict: sound
    confidence_should_be: confirmed
    belongs_under: null
    blocking: false
    reasoning_one_line: "Two tier-1 manufacturer sources support family+name; report overstates SpeedCubeShop's contribution in prose only, not in the proposed attestations."

  - id: dayan-bermuda
    verdict: weakened
    confidence_should_be: confirmed_for_family_probable_for_model_geometry
    belongs_under: null
    blocking: true
    reasoning_one_line: "Family is sound (tier-1 category page names all 5 sub-products), but the House I/II/Column/Star distinct-mould claim rests on unpreserved product-photo observation, not a citable source -- hold that specific claim at probable/reported until sourced."

  - id: shengshou-rainbow
    verdict: sound
    confidence_should_be: confirmed_for_name_probable_for_rest
    belongs_under: null
    blocking: false
    reasoning_one_line: "Discriminator against stickerless-variant reading holds under testing (no counter-example found); three independent, non-mirroring publishers actually meet the confirmed bar for bare existence, understated as probable in the summary."

  - id: shengshou-gem
    verdict: sound
    confidence_should_be: probable
    belongs_under: null
    blocking: false
    reasoning_one_line: "Independent SKU/cross-range presence at two publishers supports family status; fix a dangling citation to a nonexistent source used for the DaYan Gem Cube disambiguation."

  - id: shengshou-tank
    verdict: sound
    confidence_should_be: probable
    belongs_under: null
    blocking: false
    reasoning_one_line: "Single-publisher probable is honestly calibrated; textual evidence (differing weight/finish, parallel non-succeeding size ranges, cap-design language absent from Tank) leans toward separate lines over merging with Gem, but a cheap photographic comparison is the highest-value unresolved question in this batch."

  - id: shengshou-crazy
    verdict: sound
    confidence_should_be: probable
    belongs_under: null
    blocking: false
    reasoning_one_line: "V1/V2 ring-piece-count difference is a genuine documented mechanism claim; family-level significance is comparable to Calvin's precedent; model-level scope_class correctly left open for human review, not resolved by either lane."
```
