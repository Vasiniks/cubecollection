# Pass 4 (variants) — Agent A, MoYu lane

**Scope:** 23 frozen MoYu models across 9 families (`moyu-weilong`, `moyu-rs3m`, `moyu-aolong`,
`moyu-huanying`, `moyu-tanglong`, `moyu-hualong`, `moyu-liying`, `moyu-dianma`, `moyu-ai`). No
family or model was created, renamed, merged, split, or re-parented. Write lane honoured:
`data/variants/moyu/**` (42 new files) and this report, plus a session-log note at
`research/notes/variants/moyu-pass4.md`. **No new `data/sources/*.yml` records were created** —
every claim rests on the three sources already canonical from passes 2/3
(`speedsolving-wiki-moyu`, tier 3; `thecubicle-com-moyu-3x3-collection-2021`, tier 2;
`thecubicle-us-moyu-early-3x3-lines`, tier 2).

**Result: 42 variant records across all 23 models. `npm run check` clean at 0 errors, 5
warnings (baseline unchanged).**

## Method

Started from the pass-3 MoYu report (`research/qc/pass3-agent-a-moyu.md`), which had already
extracted and flagged every "lead for pass 4" directly inside the 23 model records' own
`description` fields — an unusually well-prepared starting point for this lane. Re-fetched the
full Speedsolving wiki MoYu page via `npm run wayback -- get` against the exact snapshot
already recorded as `speedsolving-wiki-moyu`'s `archive_url`, to check for variant-relevant
detail beyond what pass 3 had quoted; found the full page text matches what was already
extracted, with nothing further recoverable from that source. Cross-checked every claim
against `thecubicle-com-moyu-3x3-collection-2021`'s own preserved excerpt, which independently
names several parallel SKUs (GTS2 M/LE/WCA Record Edition; GTS3/GTS3 M/GTS3 LM; WR/WR M) that
corroborate axes the wiki also describes.

Applied the anti-explosion rules throughout: TangLong's "blue, cyan, pink" stock colours and
AoLong's/DianMa's/HuaLong's/TangLong's generic "$color $size — $name" retailer sticker-page
titles were read as stock options and per-SKU retailer naming, not distinct editions, and
collapsed into one `standard` variant each. TheCubicle's own in-house RS3M tuning tiers
(Angstrom/Mystic/Pro Shop/Celeritas/MAX) were checked against the `thecubicle` manufacturer
record and rejected as variants for lack of any documented material configuration difference
(see "Candidates rejected" below).

**Discovery-breadth gap, disclosed:** RESEARCH_SPEC §3.6a's mandatory archived-retailer
`/products/` prefix sweep and non-US/English retailer check were **not** run this pass. This
lane's leads were unusually pre-identified by pass 3 already, and the two sources in hand
corroborate the same axis set without contradiction, but a Chinese-language retailer sweep
(Taobao/Tmall) is the highest-value follow-up left undone — see the session-log note.

---

## Variant tree per model

### `moyu-huanying` (1 model)

- **moyu-huanying-original**: `standard` only. No coating/magnet/core/colourway axis
  documented in either source.

### `moyu-liying` (1 model)

- **moyu-liying-original**: `standard` only. Sources give only a bare name/price; the wiki
  carries an empty section heading.

### `moyu-dianma` (1 model)

- **moyu-dianma-original**: `standard` only. Retailer sticker-page title uses a generic
  "$color $size — $name" naming convention shared across several early MoYu products at this
  retailer, not a distinct colourway.

### `moyu-hualong` (1 model)

- **moyu-hualong-original**: `standard` only. Same generic naming convention as DianMa.

### `moyu-tanglong` (1 model)

- **moyu-tanglong-original**: `standard` only. Wiki: "came in colors like blue, cyan, and pink"
  — read as stock body-colour options (no per-colour designation given), collapsed per the
  anti-explosion rule, matching the GAN356 Air Black/White/Primary precedent.

### `moyu-aolong` (3 models)

- **moyu-aolong-original**: `standard` only.
- **moyu-aolong-v2**: `standard` only. The wiki's documented first-batch plastic defect
  (corrected on "all new V2s") is an undeclared running production change, not a marketed
  edition — not represented as a variant; flagged as a `model.revisions[]` lead, out of this
  pass's write lane.
- **moyu-aolong-gt**: `standard` only. Wiki's "unusual sticker shades" note is a stock/inherent
  design characteristic, not a second marketed colourway.

### `moyu-ai` (1 model)

- **moyu-ai-original--standard**: the non-magnetic configuration, the only one directly
  evidenced (`config.magnet_configuration: none`, `smart.is_smart: true`). The wiki's "the
  non-magnetic version is... the only non-magnetic smartcube" implies a magnetic counterpart
  may exist, but nothing names, dates, or otherwise evidences it — not created on implication
  alone. Recorded as a lead in the session-log note.

### `moyu-weilong` (10 models, 21 variants) — the archive's densest non-GAN lineage

- **moyu-weilong-original**: `standard` only.
- **moyu-weilong-v2**: `standard` only, at `uncertain` confidence throughout (matching the
  model's own boundary-call uncertainty).
- **moyu-weilong-gts**: `standard` only, with `colorway.application: stickered` recorded at
  `reported` confidence — the wiki states the capped mould makes "a stickerless version...
  not possible," read as sticker-only by elimination rather than a direct SKU statement.
- **moyu-weilong-gts2** (3): `m` (base magnetic, the only bare configuration retailer-listed),
  `m-le` (`edition.designation: "LE"`, limited, run size unknown), `m-wca-record-edition`
  (`edition.types: [commemorative]`, `uncertain` — the retailer names it but never says which
  record it commemorates). All three are distinct TheCubicle 2021-catalogue product titles,
  passing the dedup test. **Not created**: a non-magnetic or stickerless GTS2 SKU — the wiki
  states the mould *permits* stickerless, not that MoYu sold it, and no listing names one.
- **moyu-weilong-gts3** (3): `standard` (non-magnetic, `config.magnet_configuration: none`),
  `m` (full magnets), `lm` (light magnets) — all three directly named as parallel
  TheCubicle-catalogue SKUs and by the wiki's explicit "magnetic, nonmagnetic, or with light
  magnets."
- **moyu-weilong-wr** (2): `standard` (non-magnetic, retailer-listed bare), `m` (magnetic,
  magnet strength noted from the wiki as "the same as the GTS3 LM," a community complaint about
  weak magnets, not adopted as fact beyond the direct quote).
- **moyu-weilong-wr-m-2020** (2): `standard` (`config.coating: frosted`, from the wiki's "new
  color scheme and frosted plastic"), and `ai-smartcube` — "MoYu WeiLong AI," MoYu's first
  smartcube, instantiated as a `smart_version_of` relationship to the standard variant per the
  pass-3 lead recorded directly on the model file. No date is stated by the wiki for WeiLong AI
  specifically.
- **moyu-weilong-wr-m-2021** (2): `standard` (`magnet_configuration: adjustable`, "5 settings"
  per the wiki), `maglev` (`config.maglev: maglev`, purple internals) — the explicit
  "MagLev vs. spring" case from the task brief, directly evidenced by the wiki's own section
  heading naming both configurations.
- **moyu-weilong-v9** (4): `standard`, `maglev`, `ballcore` — all three named directly in the
  wiki's own section heading ("Standard/Maglev/Ballcore") — plus `ballcore-20-magnet`, a
  January 2024 update to the Ballcore configuration ("adding 12 more core magnets"), instantiated
  per the explicit pass-3 lead as a further sold configuration, not a new generation or a silent
  revision. This is the only variant in the lane carrying a `releases[]` date
  (`2024-01`, `qualifier: exact`, direct wiki month-level statement).
- **moyu-weilong-super** (3): the three magnet/spring configurations named directly by the
  wiki ("8-magnet ball-core with spring," "8-magnet ball-core with maglev," "20-magnet
  ball-core with maglev"). The wiki's own packaging/pricing complaints ("egregiously large
  box," "$80–100") describe the whole line, not a separately marketed packaging edition, so no
  packaging variant is created per the materiality rule's own "sole distinguishing feature"
  test.

### `moyu-rs3m` (4 models, 14 variants)

- **moyu-rs3m-2020** (3): `standard` (`adjustment_system: tension_compression`, the line's DAS),
  `maglev` ("MoYu RS3M MagLev" — the task's own explicit MagLev-vs-spring example), `uv`
  ("MoYu RS3M 2020 UV" — coating + magnet-strength axis, "cheapest mass-produced UV-coated
  puzzle at 17.99 USD"). **Rejected**: TheCubicle's five in-house tuning-tier listings
  (Angstrom/Mystic/Pro Shop/Celeritas/MAX "RS3 M 2020+") — see "Candidates rejected."
- **moyu-rs3m-super** (3): `standard`, `maglev`, `ball-core` — all three named directly by the
  wiki, stickerless-only line-wide. The Ball Core configuration's documented early-batch gold-
  plastic defect is an undeclared batch issue, not a variant (flagged as a `model.revisions[]`
  lead, out of lane).
- **moyu-rs3m-super-v2** (3): `standard`, `maglev`, `ballcore` — named by the wiki's own
  section heading (which the wiki itself hedges is "the second version (or fourth, fifth, and
  sixth?)" of the line); UV coating read as line-wide, repelling edge magnets as Ballcore-only,
  per a close reading of the body text's own clause structure. All three recorded at `uncertain`
  confidence on `edition/designation` since the body text does not restate each name
  individually the way the preceding Super RS3M's entry does.
- **moyu-rs3m-v5** (5): `standard`, `das`, `das-with-robot`, `maglev`, `ballcore-uv` — five
  tiers named in the wiki's own section heading, against six stated retail prices. The
  mismatch is recorded, not resolved; no sixth tier is fabricated. "DAS with Robot" is
  preserved verbatim despite reading oddly, since no source supports a substitution.

---

## Materiality calls of note

- **Stock colourways collapsed, not exploded**: TangLong (blue/cyan/pink), and the generic
  "$color $size" retailer sticker-page titles for DianMa/HuaLong/TangLong, all read as either
  stock options or one retailer's SKU-naming convention, not manufacturer-named editions.
- **Design capability vs. sold configuration**: GTS2's "allows for stickerless versions" is a
  mould capability, not evidence of an actual stickerless SKU; not instantiated as a variant.
- **Undeclared batch/production issues excluded**: AoLong V2's first-batch plastic defect and
  Super RS3M Ball Core's early gold-plastic cracking are both `model.revisions[]` territory
  (undeclared, unmarketed), not variants — flagged as leads for whoever owns those model files,
  not acted on (out of write lane).
- **Packaging excluded**: WeiLong Super's oversized box and "gimmicky" wristwatch-holder
  accessory describe the whole line's packaging, not a separately marketed packaging-only
  edition, so no variant was created on that basis.
- **Retailer tuning tiers excluded**: see "Candidates rejected" below.

## Candidates rejected

1. **TheCubicle's RS3M 2020 in-house tuning tiers** — "Angstrom RS3 M 2020+ 3x3", "Mystic RS3 M
   2020+ 3x3", "Pro Shop RS3 M 2020+ 3x3", "Celeritas RS3 M 2020+ 3x3", "MAX RS3 M 2020+ 3x3"
   (all named in `thecubicle-com-moyu-3x3-collection-2021`). "Angstrom", "Mystic", "Pro Shop",
   "Celeritas", and "MAX" are already-registered aliases of the `thecubicle` manufacturer
   record (`kind: service`) — its own in-house setup/tuning programme names. Rejected because
   no source located this pass describes a documented material configuration difference
   (coating, magnet, core, or adjustment-system change) for any of these five tiers on RS3M
   specifically — unlike the GAN-lane precedent (e.g. "Cubicle Pro Shop GAN 11 M Pro 3x3 (UV
   Coated)"), which had its own descriptive product page naming an actual modification. Matches
   the explicit exclusion of retailer SKUs and factory tuning/lubrication tiers absent a
   documented material difference.
2. **A non-magnetic or stickerless GTS2 SKU** — the wiki states the mould *permits* stickerless
   construction; no retailer listing or manufacturer source names an actual sold configuration
   distinct from "GTS2 M". Not created.
3. **A "magnetic" MoYu AI counterpart to the sourced non-magnetic configuration** — implied by
   the wiki's own phrasing but never directly named, dated, or evidenced. Not created.
4. **AoLong V2's corrected-plastic batches and Super RS3M Ball Core's early faulty gold-plastic
   batches** — undeclared production-batch changes, `model.revisions[]` territory, not
   variants.
5. **A sixth RS3M V5 tier** to reconcile the wiki's own five-name/six-price mismatch — not
   fabricated.

## Models left at zero (no variant beyond the base `standard` configuration)

`moyu-huanying-original`, `moyu-liying-original`, `moyu-dianma-original`,
`moyu-hualong-original`, `moyu-tanglong-original`, `moyu-aolong-original`, `moyu-aolong-v2`,
`moyu-aolong-gt`, `moyu-weilong-original`, `moyu-weilong-v2`, `moyu-weilong-gts` — 11 of 23
models. Each still received one `standard` variant record (the model's one atomic sold
configuration), per the same convention the GAN pilot used (e.g. `gan-354-m--standard`,
`gan-357-original--standard`); "zero" here means zero *additional* axis-driven variants were
found beyond that base record, not zero records. Each was checked against both canonical
sources for a coating/magnet/core/maglev/adjustment/colourway/edition axis and none was found.

## Model-boundary escalations

None. No evidence surfaced this pass that contradicts a frozen model boundary. One near-miss
considered and resolved without escalation: MoYu AI's implied "magnetic version" could in
principle turn out to be a genuinely different design rather than a configuration, but there is
currently no evidence for its existence at all, let alone its boundary status — recorded as a
lead, not an escalation.

## Sources

No new source records created. All 42 variants cite one or more of:
`speedsolving-wiki-moyu`, `thecubicle-com-moyu-3x3-collection-2021`,
`thecubicle-us-moyu-early-3x3-lines` — all three already canonical before this pass began.

## Leads not chased

See `research/notes/variants/moyu-pass4.md` in full. Summary:

- No archived-retailer `/products/` prefix sweep or non-US/English retailer check was run this
  pass (RESEARCH_SPEC §3.6a) — flagged as the highest-value follow-up, particularly for
  Chinese-language retail channels (Taobao/Tmall) that could resolve the RS3M V5 tier/price
  mismatch, corroborate the GTS2 LE/WCA Record Edition details, or surface a magnetic MoYu AI
  configuration.
- MoYu's own site (moyucube.com) was not independently re-swept; pass 3 already found it
  unproductive for spec pages.
- TheCubicle's five RS3M tuning-tier names were checked against the `thecubicle` manufacturer
  record but not chased to individual dedicated product-page captures.

## Validation

`npm run check` — 0 errors, 5 warnings (baseline maintained) after every commit in this lane.
Two transient fingerprint-collision warnings (rule 28) were hit and resolved during
authoring — both `edition.designation` was missing where two sibling variants (e.g. GTS2 M vs.
M (LE); GTS3 M vs. LM; WeiLong Super's three magnet tiers) differed only in a field the
fingerprint does not hash (`magnet_strength`, free text) — fixed by adding the manufacturer's
own tier-name string to `edition.designation`, which is both more correct identity data and
resolves the collision honestly rather than suppressing the check.

---

## Machine-readable summary

```yaml
models_assessed:
  - moyu-huanying-original
  - moyu-liying-original
  - moyu-dianma-original
  - moyu-hualong-original
  - moyu-tanglong-original
  - moyu-aolong-original
  - moyu-aolong-v2
  - moyu-aolong-gt
  - moyu-ai-original
  - moyu-weilong-original
  - moyu-weilong-v2
  - moyu-weilong-gts
  - moyu-weilong-gts2
  - moyu-weilong-gts3
  - moyu-weilong-wr
  - moyu-weilong-wr-m-2020
  - moyu-weilong-wr-m-2021
  - moyu-weilong-v9
  - moyu-weilong-super
  - moyu-rs3m-2020
  - moyu-rs3m-super
  - moyu-rs3m-super-v2
  - moyu-rs3m-v5

variants_created:
  - moyu-huanying-original--standard
  - moyu-liying-original--standard
  - moyu-dianma-original--standard
  - moyu-hualong-original--standard
  - moyu-tanglong-original--standard
  - moyu-aolong-original--standard
  - moyu-aolong-v2--standard
  - moyu-aolong-gt--standard
  - moyu-ai-original--standard
  - moyu-weilong-original--standard
  - moyu-weilong-v2--standard
  - moyu-weilong-gts--standard
  - moyu-weilong-gts2--m
  - moyu-weilong-gts2--m-le
  - moyu-weilong-gts2--m-wca-record-edition
  - moyu-weilong-gts3--standard
  - moyu-weilong-gts3--m
  - moyu-weilong-gts3--lm
  - moyu-weilong-wr--standard
  - moyu-weilong-wr--m
  - moyu-weilong-wr-m-2020--standard
  - moyu-weilong-wr-m-2020--ai-smartcube
  - moyu-weilong-wr-m-2021--standard
  - moyu-weilong-wr-m-2021--maglev
  - moyu-weilong-v9--standard
  - moyu-weilong-v9--maglev
  - moyu-weilong-v9--ballcore
  - moyu-weilong-v9--ballcore-20-magnet
  - moyu-weilong-super--8-magnet-ball-core-spring
  - moyu-weilong-super--8-magnet-ball-core-maglev
  - moyu-weilong-super--20-magnet-ball-core-maglev
  - moyu-rs3m-2020--standard
  - moyu-rs3m-2020--maglev
  - moyu-rs3m-2020--uv
  - moyu-rs3m-super--standard
  - moyu-rs3m-super--maglev
  - moyu-rs3m-super--ball-core
  - moyu-rs3m-super-v2--standard
  - moyu-rs3m-super-v2--maglev
  - moyu-rs3m-super-v2--ballcore
  - moyu-rs3m-v5--standard
  - moyu-rs3m-v5--das
  - moyu-rs3m-v5--das-with-robot
  - moyu-rs3m-v5--maglev
  - moyu-rs3m-v5--ballcore-uv

models_at_zero:
  - moyu-huanying-original
  - moyu-liying-original
  - moyu-dianma-original
  - moyu-hualong-original
  - moyu-tanglong-original
  - moyu-aolong-original
  - moyu-aolong-v2
  - moyu-aolong-gt
  - moyu-weilong-original
  - moyu-weilong-v2
  - moyu-weilong-gts

candidates_rejected:
  - candidate: "TheCubicle RS3M 2020 tuning tiers (Angstrom/Mystic/Pro Shop/Celeritas/MAX)"
    reason: "Retailer in-house tuning/setup programme names (aliases of manufacturer record `thecubicle`, kind: service); no documented material configuration difference found for RS3M specifically."
  - candidate: "Non-magnetic or stickerless WeiLong GTS2"
    reason: "Mould capability ('allows for stickerless versions') is not evidence of an actual sold SKU; none found."
  - candidate: "MoYu AI magnetic configuration"
    reason: "Implied by wiki phrasing ('the non-magnetic version') but never directly named, dated, or evidenced."
  - candidate: "AoLong V2 first-batch/corrected-plastic as a variant"
    reason: "Undeclared running production change (model.revisions[] territory), not a marketed edition."
  - candidate: "Super RS3M Ball Core early faulty gold-plastic batch as a variant"
    reason: "Undeclared production-batch defect, not a marketed edition."
  - candidate: "A sixth MoYu RS3M V5 tier to reconcile the wiki's 5-name/6-price mismatch"
    reason: "Never invent a fact — no sixth tier name is stated by any source."
  - candidate: "WeiLong Super packaging (oversized box, wristwatch holder) as its own edition"
    reason: "Describes the whole line's packaging, not a separately marketed packaging-only edition."

escalations: []
```
