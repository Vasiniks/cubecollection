# GAN pass 4 — variant enumeration, session log

Scope: DATA_MODEL/RESEARCH_SPEC pass 4 for `gan`/`monster-go`/`swift-block`, 3x3x3 only, across
all 47 canonical models. Output: **90 canonical `data/variants/<manufacturer>/<model-id>/*.yml`
records**, all `status: stub`, covering every one of the 47 models with at least one variant;
**13 new `data/sources/*.yml` records**; **1 new `research/staging/variants/*.yml` file**
(`gan-pass4-boundary-questions.yml`, additive — the 10 pre-existing axis files were read but not
modified, per instruction).

## Prior work read before starting

`PRODUCT.md`, `DATA_MODEL.md`, `RESEARCH_SPEC.md`, `docs/research-agents.md` in full;
`research/notes/models/gan-pass4-prep.md` in full (the work plan for this pass);
`research/notes/models/gan-pass2.md` and `gan-pass3.md` in full; `docs/pilot-audit.md`; all 47
`data/models/*/*.yml` records in full; all 10 `research/staging/variants/gan-axis-*.yml` files
in full; all 97 pre-existing `data/sources/*.yml` records that were cited (not sampled — every
source cited below was read in full before citing it, several were re-verified by direct
`wayback get` even where already canonical, per the instruction to re-source every staged lead).

## Method

`npm run wayback -- list/get/prefix/nearest` throughout. Confirmed early that
`web.archive.org` access, which blocked the agent that produced the 10 staging axis files, was
working this session — re-fetched and independently verified essentially every load-bearing
claim carried over from staging rather than trusting it, and found the staging files'
underlying facts held up well (only one genuine error found and corrected: a citation mixed up
across two similarly-named sources, fixed before it entered canonical data — see "Corrections"
below). One URL (`gancube.cn/en/patents/` and its non-`/en/` sibling) has **zero** wayback
captures under any path checked, confirming the prep file's warning that at least one staged
citation cannot be archived; that source (`gancube-cn-patents-technologies`) was created with
`preservation_method: excerpt` instead, fetched directly via `WebFetch` and independently
verified by me, with the gap stated openly in its own `preservation_note`.

## The two named boundary traps

**GAN16 ui MagLev MAX.** Confirmed the trap exactly as described: a tier-1 product-page source
(`gancube-gan16-ui-maglev-max-product`) exists, it sits in GAN's own "GAN ui Series" navigation,
and `gan-ui-series` contains only 12-series models and a Mini — no `gan-16-ui*` model exists.
**No variant was created under `gan-flagship-16` or anywhere else for it.** Staged as a missing
*model* in `gan-pass4-boundary-questions.yml`, cross-referenced from the two variants that
independently mention its "Minions Edition" sibling by name (`gan-v100-maglev--minions-edition`,
`gan-i4--maglev-minions-edition`) without resolving what family it belongs to.

**GAN356 Air UM.** Resolved, not staged — but resolved by *inheriting* the model-level decision
Pass 3 already made, not by re-deciding it. `gan-356-air.yml`'s own description already
concluded Air UM is a variant of `gan-356-air` (magnetized Air Ultimate, per TheCubicle's own
"GAN356 Air UM is a magnetized GAN356 Air Ultimate"), not a separate model. Pass 4's job was to
instantiate that decision as records, which it did: `gan-356-air--ultimate`,
`gan-356-air--um`, and a `modified_from` aftermarket child,
`gan-356-air--um-max-park-signature`, carrying the run size the prep file flagged as unusual
(639 units, numbered 50001-50639, directly stated by TheCubicle — re-verified this pass with a
fresh `wayback get`, not merely carried over from staging).

## Variant tree per model

### `gan-356` (13 models, 25 variants)

- **gan-356-air** (6): standard (stock Black/White/Primary colours, one variant — see
  "Materiality calls" below), master (stickered), master-unstickered (DIY kit), ultimate, um
  (collaboration_with: cubicle-labs), um-max-park-signature (`modified_from` um,
  `coating_applied_by: cubicle-labs`, limited+signature+commemorative, run_size 639)
- **gan-356-air-s** (4): master (non-magnetic), sm (magnetized, magnet arrangement unknown),
  love-pink-2018, flora-blue-2017 (both discontinued named colourways, evidenced by GAN's own
  archived "for display only, not for sale" museum pages — see "Major edition discoveries")
- **gan-356-s-v2** (1): standard. Lite/Master/Advanced sub-tiers mentioned in the model's own
  description were **not** instantiated — no direct citation found this pass for this specific
  shell (only pattern-analogy from the Air line in the pre-existing model description)
- **gan-356-r, gan-356-rs, gan-356-rs2** (1 each): standard, differentiated by the sourced
  spec facts available (magnet_configuration: none for R; weight_g for RS; adjustment_system
  for RS2)
- **gan-356-x** (2): standard (GMS adjustable magnets, tension_compression), crystal-blue
  (2019 Summer LE)
- **gan-356-xs** (2): standard, evergreen (2019 Winter LE)
- **gan-356-x-v2** (1): standard (matte, reuses XS core)
- **gan-356-m** (1): standard
- **gan-356-m-e** (2): standard, christmas-edition (green internals, red magnet capsules, red
  logo — genuine multi-part colourway change)
- **gan-356-me-v2** (1): standard
- **gan-356-maglev** (1): standard

### `gan-357` (1 model, 2 variants)

standard (GAN357), ultimate (GAN357U — GAN Full Bright, factory serviced)

### `gan-354` (2 models, 3 variants)

gan-354-m: standard. gan-354-m-v2: standard, explorer (re-release + extra GES nut set,
packaging/accessory difference)

### `gan-flagship-series` (8 models, 29 variants)

This family carried the densest single-page variant clusters in the whole archive — every
generation from GAN12 onward sells 3-6 named tiers/coatings from **one** manufacturer listing
via GAN's own "Versions" selector, read per Pass 3's own established precedent as clean
variant-level (not model-level) evidence.

- **gan-flagship-11** (4): m-pro-uv-coated, m-pro-frosted-black, m-duo, air — all four straight
  off GAN's own single GAN11 Series listing (`gancube-gan11-series-product`)
- **gan-flagship-12** (4): m-leap, maglev-uv-coated, maglev-frosted, maglev-sticker-black-internal
- **gan-flagship-13** (3): uv-coated, frosted, maglev-fx
- **gan-flagship-14** (4): maglev-pro-uv-coated, maglev-pro-frosted, maglev-uv-coated,
  maglev-frosted
- **gan-flagship-15** (6): maglev-uv-coated, maglev-matte-coated,
  maglev-10-years-grand-gift-set-uv-coated, newblack-uv-coated, plus **two variants found only
  on a TheCubicle retailer listing, not on GAN's own captured Versions selector**:
  maglev-uv-10th-anniversary-edition and maglev-uv-zenith-limited-edition (the latter
  corroborated as a GAN-declared name by `gancube-cn-patents-technologies`'s own "Limited
  Edition" nav category, which lists "GAN15 Maglev Zenith")
- **gan-flagship-16** (6): maglev-max-uv-coated, maglev-uv-coated, max-l-uv-coated (all off
  GAN's own listing), maglev-max-dual-wr-limited-edition (1,111 units, not numbered — see
  Editions), aqualis-2026-summer-limited-edition (own full GAN listing, box contents recorded),
  amyth-winter-limited-edition (existence and description from a cross-sell block only, no
  dedicated product page found — reduced confidence, staged for follow-up)
- **gan-flagship-17** (1): standard (MagDrive, 196 magnets, only one configuration found)
- **gan-mini-m-pro** (1): standard. **A UV Coated sibling was drafted, then deliberately
  deleted** when no citation could be found for it at all — see "Materiality calls / discipline"
  below

### `gan-v100` (2 models, 3 variants)

- **gan-v100-maglev** (2): standard-uv-coated (only Version on GAN's own listing; 55mm/64g from
  a separate GAN combo-page, TheCubicle's 76-magnet figure not independently corroborated),
  minions-edition (cross-line collaboration theme, shared with GAN16 ui Maglev MAX and GAN i4)
- **gan-v100-leap** (1): standard — deliberately **one** variant covering both "Chinese New Year
  Edition" and "Year of the Horse" names (GAN's own two product pages carry word-for-word
  identical body copy; read as the same product retitled, not two products, per Pass 3's own
  model-level reasoning applied one level down). Carries a genuine unresolved dispute (GAN's own
  page states both 64g and 62g on the same page in different places) recorded as `uncertain`
  with both figures preserved, not as a formal `disputed` block (rule 11 requires distinct
  sources per candidate; this is one source contradicting itself)

### `gan-i-series` (4 models, 5 variants)

gan-356-i, gan-356-i2, gan-356-i3-v2 (1 each: standard). gan-i4 (2): standard, maglev-minions-
edition (third sibling in the cross-line Minions theme)

### `gan-i-carry-series` (5 models, 8 variants)

gan-356-i-carry, gan-356-i-carry-s, gan-356-i-carry-e, gan-356-i-carry-2 (1 each: standard,
differentiated by battery mechanism per model). gan-i-carry-4 (4): smart-cube, minions-edition
(digital-bundle significance note — see "Schema gaps"), year-of-the-horse, ssl-limited (the
latter two existence-only, from GAN's own collection page, no dedicated product description
independently fetched)

### `gan-ui-series` (4 models, 4 variants)

One standard variant each for gan-ui-12-freeplay, gan-ui-12-maglev, gan-ui-12-sp,
gan-ui-mini-freeplay. **gan-ui-12-sp deliberately triggers lint rule 25** ("one variant, edition
designation set") — accepted as an honest warning rather than suppressed, since "SP" is a real,
directly-attested GAN edition designation and this pass found no siblings to enumerate, not
because none exist.

### `monster-go-3x3` (4 models, 7 variants)

monster-go-352-m (1): standard, inheriting model.specs (52mm/66g) without restating it —
corrected mid-session after lint flagged the restatement as noise (see "Discipline" below).
monster-go-magnetic-3x3 (1): standard (48 magnets, no size/weight found). monster-go-standard-3x3
(1): standard (non-magnetic, per GAN's own page title). monster-go-cloud-rainbow-ut-3x3 (4):
cloud-blue, cloud-pink, rainbow, ut — a clean single-listing colourway case (worked decision C);
each colourway's own "(premium package)" tier was **not** duplicated into an 8th-item variant
set, staged as an open question instead (see boundary-questions file).

### `monster-go-smart-cube-series` (1 model, 1 variant)

monster-go-3ai: standard (app-connected, 280h replaceable battery, 81g — weight inherited from
model.specs, corrected mid-session for the same reason as 352-M above).

### `swift-block-3x3` (3 models, 4 variants)

swift-block-355s (1): standard (48 magnets, numerical tension nut, 85g). swift-block-355-maglev
(1): standard, size/weight/maglev inherited from model.specs without restatement (corrected
mid-session). swift-block-super-maglev (2): standard (dual magnetic rings, 8-setting GES tension,
size/weight/maglev inherited), uv-coated (the one genuinely distinguishing coating fact, kept as
an override).

## Materiality calls, with verdicts

**Stock body colours (Black/White/Primary etc.) are NOT exploded into per-colour variants.**
Verdict, stated once here as it recurs across the whole archive: "same underlying design, sold
configuration differs, but the difference is an ordinary retail stock-colour choice rather than
a named/marketed colourway — one 'standard' variant records the available stock colours in
prose rather than three-plus near-identical records." This is a genuine tension with DATA_MODEL
§4.1 rule 6 (colourway is a required-difference axis) and is flagged explicitly as a judgement
call rather than smoothed over: a human reviewer may reasonably decide GAN356 Air's Black/White/
Primary deserve their own records once pass 5 fills full colourway detail (per-face colours,
translucency) for each. Applied consistently: no model in this pass has separate variants for
ordinary stock colours; every named/marketed colourway (Love Pink, Crystal Blue, AQUALIS,
Minions Edition, Christmas Edition, etc.) got its own variant.

**"Could not source it, did not create it" — enforced, not just stated.** One drafted variant
(`gan-mini-m-pro--uv-coated`) was written and then deleted mid-session when review found it had
zero citation behind it (UV coating is common elsewhere in the family, which is not evidence for
this specific SKU). Recorded here so the discipline is visible, not just claimed. Two similarly
tempting but unsourced candidates — "GAN356 Air Advanced/Grand Master/Pro" — were staged as
leads instead of instantiated, for the same reason (see boundary-questions file).

**Air S vs Air SM magnet-slot removal — inherited, not re-litigated.** Pass 3's own
`gan-356-air-s.yml` already flags this as "the hardest single boundary call of this pass"
(whether removing a magnet slot from a moulded piece is a variant-level or model-level
difference) and explicitly asks Pass 4 to test it. This pass did not re-open the model-level
question (out of this agent's write lane — `data/models/` is not writable here) but did apply
the model-level decision consistently: Master (non-magnetic) and SM (magnetized) recorded as two
variants of the one `gan-356-air-s` model, per the existing model record.

**MagLev: axis vs. design, applied per product, never by pattern.** Confirmed the prep file's
warning holds throughout: GAN12/13/14/15/16's own pages sell MagLev as one Version among several
on **one** listing (variant-level, instantiated as such); `gan-356-maglev`,
`gan-v100-maglev`/`gan-v100-leap`, and `swift-block-355-maglev`/`swift-block-355s` are all
**separate models** (a Pass 3 decision, not re-litigated here) because no combined listing links
each MagLev/non-MagLev pair. Both readings coexist in this pass's own output without being
unified — exactly as instructed.

**GES version numbers (V2, V3, Pro, Pro+) are not separate `adjustment_system` variants.**
Treated as free-text detail on `config.magnet_strength`/prose or the model's own
`revisions[]` entry (GAN356 X's IPG v4/v5 question), not as a vocab-value fork, since the
vocab is a closed enum and GES versioning does not map to distinct enum values without
over-interpreting.

**Aftermarket coverage is deliberately incomplete this pass, not silently skipped.** Only one
`modified_from` variant was instantiated (`gan-356-air--um-max-park-signature`, the single
richest-evidenced case with a stated run size) out of a much larger body of evidence for
TheCubicle's "Signature Series" and "PiCube" collections. Staged explicitly as a follow-up
priority rather than either fabricated in bulk from thin evidence or left invisible.

## Major edition discoveries

- **Four discontinued named colourways survive only as GAN's own "For display only, not for
  sale" museum pages** (Love Pink 2018 and Flora Blue 2017 on `gan-356-air-s`; Crystal Blue 2019
  Summer on `gan-356-x`; Evergreen 2019 Winter on `gan-356-xs`). All four are $0.00, permanently
  "Sold Out" pages GAN itself still hosts — read as first-party historical confirmation, not
  current availability. This is precisely the "delisted product page, evidence survives only in
  archive" scenario RESEARCH_SPEC §3.6 anticipates, except the manufacturer preserved it
  *itself*, which the prep file's staged version of this lead did not know (it had found only
  the URL slugs, not the page content, due to a wayback outage in that earlier session).
- **GAN 356 Air UM Max Park Signature Edition**: 639 units, numbered 50001-50639, directly
  stated by TheCubicle — the single strongest run size found in this pass, re-verified with a
  fresh fetch.
- **GAN16 MagLev MAX UV 3x3 (Dual-WR Limited Edition)**: 1,111 units, commemorating two named
  World Records (3.05s single, 3.84s average) by Team GAN's XuanYi Geng — recorded as
  `[limited, commemorative]`, deliberately **not** `signature`, since the cube itself is not
  described as tuned to Geng's personal setup (contrast Max Park's edition, which explicitly
  is) even though Geng's engraved signature appears on the packaging. Judgement call stated
  directly in the variant's own header comment.
- **GAN356 ME Christmas Edition**: a genuine three-part colourway change (green internals, red
  magnet capsules, red logo) plus themed packaging — a clean materiality case distinguishing it
  from packaging-only bundles.
- **AQUALIS / Amyth** (GAN16's seasonal Summer/Winter LE programme): AQUALIS fully evidenced on
  its own GAN listing (box contents recorded); Amyth evidenced only via cross-sell, flagged for
  follow-up.

## Aftermarket discoveries

One instantiated (`gan-356-air--um-max-park-signature`, `modified_from` →
`gan-356-air--um`, `coating_applied_by: cubicle-labs`). A much larger, systematic body of
evidence for TheCubicle's Signature Series (Matty's, Tymon's, Leo's) and PiCube's 20-magnet
ball-core mod line (GAN V100, GAN12, GAN16, GAN16 MAX) was found but **not** instantiated this
pass — staged explicitly in `gan-pass4-boundary-questions.yml` as a priority follow-up, since
DATA_MODEL/RESEARCH_SPEC explicitly want "retailer customisations" covered as one of the GAN
pilot's nine required cases and this pass's single example does not constitute that coverage.

## Major sources

13 new sources this session, all fetched and independently verified via `npm run wayback --
get` except `gancube-cn-patents-technologies` (no archive capture exists for this URL under any
path; preserved via `excerpt` after direct `WebFetch` verification, gap stated in its own
`preservation_note`):

`gancube-cn-patents-technologies`, `thecubicle-gan356-x-ipg-v5`, `gancube-aqualis-gan16-maglev-
max-product`, `gancube-gan-i-carry-4-minions-edition-product`, `thecubicle-gan16-maglev-max-uv-
dual-wr-limited-edition`, `thecubicle-gan-356-air-um-max-park-signature-edition`, four `gancube-
le-gan356-*` discontinued-colourway sources (Love Pink, Flora Blue, Crystal Blue, Evergreen),
`thecubicle-gan356-me-christmas-edition`, `thecubicle-gans-356-air-master-unstickered`,
`thecubicle-gan15-uv-3x3-newblack`.

## Corrections to my own work mid-session

`gan-flagship-15--newblack-uv-coated` initially cited the wrong source id for its materials
claim (a copy-paste of `thecubicle-gan-v100-maglev-uv-3x3`, which does not describe NewBlack at
all). Caught on review before finishing the model, fixed by creating the correct source
(`thecubicle-gan15-uv-3x3-newblack`) and re-citing properly. Recorded here rather than silently
fixed, per the standing instruction to keep dead ends and corrections visible.

## Validation

`npm run validate` initially failed with 11 errors: one schema violation (`colorway.finish` used
at the wrong nesting level — fixed to `colorway.body.finish`), nine rule-9 violations (single
tier-2 source claims marked `confirmed` instead of `probable` — all fixed by downgrading
confidence, not by finding a second source), and one rule-11 violation (a `disputed` block whose
two candidates shared one source id, which is an internal inconsistency within one source, not a
cross-source dispute — fixed by moving to a plain `uncertain` attestation with both figures
preserved in the note). All fixed; `npm run validate` now passes 251 records, 0 errors, 0
warnings.

`npm run lint` initially raised 13 warnings: 12 were config overrides restating values already
attested at model level (rule 23) on `monster-go-352-m`, `monster-go-3ai`, `swift-block-355-
maglev`, and `swift-block-super-maglev`'s two variants — fixed by removing the redundant
overrides and relying on inheritance, per DATA_MODEL's own stated reason for that rule. One
warning remains and is **accepted, not suppressed**: `gan-ui-12-sp` has one variant carrying an
edition designation ("SP"), rule 25's exact trigger condition — left as-is because "SP" is
directly attested on GAN's own product page and no sibling configuration was found this pass,
which is the honest state of current knowledge, not a data error.

`npm run check` (schemas, validate, lint, duplicates, build, privacy, selftest, coverage) passes
clean: 251 records, 0 blocking errors anywhere, 1 accepted lint warning, 90 variants
fingerprinted with zero collisions, build succeeds (0 records reach `dist/public` since nothing
in the archive is `status: published` yet — expected at this pass), privacy gate passes,
selftest's full fixture suite passes unchanged.

## Unresolved and staged candidates (summary — full detail in `gan-pass4-boundary-questions.yml`)

1. GAN16 ui Maglev MAX — missing model, not a Pass 4 task
2. Amyth — existence confirmed, no dedicated product page found
3. GAN356 Air Advanced/Grand Master/Pro — named in prose, not independently sourced
4. Monster Go 328 Spelling Cube Set — excluded, scope_class undetermined
5. GAN356 X IPG v4-vs-v5 — revision, not split into a variant
6. Digital-bundle content (app skins/avatar frames) — no schema field, recorded in prose
7. "FZ" product-line prefix — plausibly Feliks Zemdegs, unconfirmed, not instantiated
8. Aftermarket coverage (Signature Series, PiCube) — one example only, not systematic
9. `vocab/coatings.yml` "Soft Texture Coated" gap — still open, not this agent's lane
10. "Duo" (GAN11), "fx" (GAN13), "MAX-L" (GAN16), "SP" (GAN12 ui) — existence confirmed, feature
    detail not yet filled (pass 5 territory)
11. No `data/people/` or `data/events/` records exist anywhere in the archive — blocks
    `signature_of`/`commemorates` from ever resolving to real ids on any variant in this or any
    future pass, flagged as a process gap outside every named agent's current write lane

## Likely missing variants (this pass's own honest estimate)

- Further named colourways from GAN's own "Limited Edition" nav category
  (`gancube-cn-patents-technologies`) that were not individually tracked down this pass: Vita
  Cube, Antique Rhyme, GAN11 Kun, GAN11 Summer, GAN330 X ShanHeSheJiTu, GAN12 Cheering, GAN12
  Chan, GAN13 KUNLUN, GAN13 Coloré, GAN14 Maglev Galaxy, GAN14 Maglev Pro Aurora, EmeraldoX. Each
  is a real GAN-declared name; none has a dedicated product-page citation in this pass's output.
- The full TheCubicle Signature Series and PiCube mod catalogues (see "Aftermarket discoveries").
- GAN356 Air's Advanced/Grand Master/Pro tiers, if ever confirmed sold.
- Monster Go's "(premium package)" tier of each Cloud/Rainbow/UT colourway, if it proves
  materially distinct rather than packaging-only.
- Any GAN356 i-carry / i-series / ui-series smart-cube colourway or coating variant beyond the
  handful this pass could directly source — the smart lines' own internal variant axis (flagged
  by the pre-existing `gan-axis-smart-electronic.yml` staging file) is likely deeper than this
  pass's coverage of it.

## Approximate token usage

Reported at the end of the parent agent's overall response.
