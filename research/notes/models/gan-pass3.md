# GAN pass 3 — model enumeration, session log

**Status: this file was required and missing across two prior interrupted runs of this pass.**
It is written now, at the close of the third (this) run, reconstructing the reasoning already
embedded in the 37 models that existed when this run started (their own `description` and
`attestations` fields carry the primary evidence trail; this file summarises and cross-links
it) and documenting the 10 models this run added itself in full.

Scope: DATA_MODEL/RESEARCH_SPEC pass 3 for GAN, `gan`/`monster-go`/`swift-block`, 3x3x3 only.
Output at the close of this run: **47 canonical `data/models/<manufacturer>/*.yml` records**
across all 11 approved families (37 pre-existing + 10 added this run: 2 under `gan-v100`, 4
under `monster-go-3x3`, 1 under `monster-go-smart-cube-series`, 3 under `swift-block-3x3`).
`monster-go-3x3` and `monster-go-smart-cube-series` and `swift-block-3x3` had zero models before
this run; they are now fully enumerated to the depth this pass's evidence supports.

No variant records were created (pass 4, out of this agent's write lane). `data/families/` and
`data/manufacturers/` were read but not modified.

## Prior work read before starting

`PRODUCT.md`, `DATA_MODEL.md`, `RESEARCH_SPEC.md`, `docs/research-agents.md` in full;
`research/notes/models/gan-pass2.md` in full; `research/staging/models/gan-v100.yml`; all 73
pre-existing `data/sources/*.yml`; all 37 pre-existing `data/models/gan/*.yml` (read completely,
not sampled, since their reasoning had to be reconstructed here); all 11 `data/families/*.yml`;
`data/manufacturers/gan.yml`, `data/manufacturers/monster-go.yml`,
`data/manufacturers/swift-block.yml`; `docs/pilot-audit.md` (referenced by the pre-existing
records but not re-read in full this run beyond what those records already cite).

## The boundary, applied consistently across all 47 models

Every model in this archive was tested against DATA_MODEL §4.2: *could the manufacturer produce
both from the same underlying design by choosing different parts, materials, or treatment at
assembly?* The single evidentiary pattern used most often, on both the pre-existing 37 and this
run's 10, is **the "Versions"/combined-listing test**: when GAN sells two named tiers from one
product page with one variant selector (e.g. GAN12's page selling "GAN12 M Leap" and "GAN12
Maglev" together), that is treated as clean evidence of a variant-level (not model-level)
relationship. When two named tiers are sold at **separate URLs with no combined selector**, and
especially when their own copy states or implies a different mechanism, that is treated as
evidence for a model-level split — recoverable by a human merging them later if evidence
surfaces that they share tooling, per DATA_MODEL's explicit preference for splitting over
collapsing under uncertainty.

This run applied that same test to genuinely new territory (GAN V100, Monster Go, Swift Block)
where the pre-existing 37 could not serve as direct precedent, and is explicit below about where
it is following established precedent exactly versus extending it into thinner evidence.

## Family-by-family summary

### `gan-356` (13 models, all pre-existing, unmodified)

The mainline 356 lineage. Two genuinely separate root designs run in parallel from early on:
"Air" (`gan-356-air`, 2015/2016 flagship shell) and the bare "S"/"S V2" line
(`gan-356-s-v2`), which is **not** a variant of Air — GAN's own 2016 site lists them as
separate products. `gan-356-air-s` is flagged by its own file as "the hardest single boundary
call of this pass": TheCubicle's description of a genuinely redesigned honeycomb piece geometry
(with the magnet slots "removed" relative to Air SM) reads as a mould-level difference,
promoting it to its own model even though "Air S" (non-magnetic) vs. "Air SM" (magnetic) are, in
turn, treated as variants of *that* model. Two clean mechanism-milestone models anchor the
lineage's core-technology history directly from GAN's own Chinese-language history page:
`gan-356-x` (2018, "world's first quantifiable adjustment system core") and `gan-356-xs` (2019,
"upgraded wing-shaped quantifiable adjustment core"). `gan-356-maglev` and `gan-356-m-e` are
recorded as **separate current models**, not maglev/non-maglev variants of one model — the
inverse of the GAN12-16 pattern — specifically because no combined listing was found for them,
unlike the numbered flagship line's own pages.

Succession chain evidenced in `relationships[]` (bracketed = confidence of the succession claim
itself): S V2 → R [probable, TheCubicle: "a modern rework of the classic 356 S"] → RS
[probable, explicit "latest update" language] → RS2 [uncertain, numeral only]. X → XS
[confirmed, GAN's own history page] → X V2 [probable, explicit succession language]. M E → Me V2
[uncertain, numeral + feature match only]. 354 M → 354 M v2 [probable, GAN's own "WHAT'S NEW"
copy].

### `gan-357` (1 model, pre-existing, unmodified)

`gan-357-original` — the only generation found; "GAN357U"/"Ultimate" is a serviced tier
(variant), not a second model, per TheCubicle's own words ("the full-featured version of the
original GAN 357").

### `gan-354` (2 models, pre-existing, unmodified)

`gan-354-m` → `gan-354-m-v2` [probable]. "Explorer" is a re-release/bundle of v2, not a third
model, per TheCubicle's own "a recent re-release of the GAN 354 M V2".

### `gan-flagship-series` (8 models, all pre-existing, unmodified)

GAN11 through GAN17. Anchored by GAN12's own page stating outright "GAN12 Maglev is the 12th
generation of GANCUBE" — the single strongest manufacturer-declared generation statement found
anywhere in this pass, and the reason `generation.basis: manufacturer_declared` is used across
this whole family even where individual generations (e.g. GAN17) lack their own explicit
ordinal statement. `gan-flagship-11` established the "Versions" precedent that this run leaned
on repeatedly (GAN11 M Pro / M / Air / M Duo, one listing). `gan-flagship-13` carries a flagged,
narrowly-dated "disappearance" case: present in one GAN nav capture, absent from another eight
days later — recorded as an open question, not resolved. `gan-flagship-15`'s notes flag a
**dating inversion** (gancube.com's own GAN15 URL floor postdates its GAN16 floor, logically
backwards for sequential numbering) as evidence of a URL restructuring rather than actual
release order, and uses TheCubicle's earlier capture instead. `gan-mini-m-pro` sits in this
family by tier-name borrowing ("M Pro") and its own distinct 53mm size, not the numbered
sequence itself.

### `gan-v100` (2 models, both added this run)

Read `research/staging/models/gan-v100.yml` in full before starting — its `resolution_pass3`
block, added this run, records the outcome in the staging file's own terms; summarised here.

- **`gan-v100-maglev`** ("GAN V100" / "GAN v100 Maglev") — the base MagLev design. GAN's own
  combo-bundle page copy is the only place this pass found GAN stating the base design's own
  size/weight numerically (55mm/64g); TheCubicle (tier 2) additionally reports 76 magnets and a
  tension system "identical to the system found in the flagship GAN16".
- **`gan-v100-leap`** ("GAN V100 Leap") — a spring-based (GAN's own words: "a spring-based GES
  system (no maglev)"), 55mm, 64-magnet design. To date it has only ever been sold under one
  themed edition, retitled once (Chinese New Year Edition → Year of the Horse, identical
  description text both times, confirmed by diffing the two product pages directly).

**Boundary reasoning, stated once here since it recurs across this whole run:** V100's own
"Versions" selector (on the MagLev product page) offers only "UV Coated" — a single item, unlike
GAN12/14/15/16's own combined selectors. Combined with GAN's own explicit "no maglev" statement
for Leap, this matches the `gan-356-maglev`/`gan-356-m-e` precedent (separate URLs, no combined
selector, stated mechanism difference → split) rather than the `gan-flagship-12` precedent
(combined selector → one model, two variants). "GAN V100 Maglev Minions Edition" and "GAN V100
UV Coated 2026 Easter Combo" are recorded as editions/variants of `gan-v100-maglev` (a
cross-line collaboration theme and a probable bundle, respectively), not separate models — the
Minions theme is independently corroborated as cross-line by appearing identically on GAN16 ui
Maglev MAX and GAN i4.

**Left open, and staged:** why V100 exists as a line parallel to the numbered Flagship
succession, and whether GAN intends further V-numbered generations. No second V-number was
found in this pass's discovery. A weight discrepancy on GAN V100 Leap's own page (62g in one FAQ
answer, 64g in the main description, both GAN's own words on the same page) is recorded honestly
as unresolved rather than picked.

### `gan-i-series` (4 models, pre-existing, unmodified)

`gan-356-i` (GAN's first smart cube, "2019, GAN's Year One of intelligence... the
first-generation competitive-tier smart cube" — manufacturer-declared) → `gan-356-i2`
[probable, explicit "latest update" language] → `gan-356-i3-v2` [uncertain, naming-sequence
only; also flagged as the only "i3" listing found, no bare "i3" without "V2"] → `gan-i4`
[uncertain, naming-sequence only, and flagged as possibly not even a strict successor —
`gan-356-i3-v2`'s own file notes the two models' dating floors do not confirm release order].

### `gan-i-carry-series` (5 models, pre-existing, unmodified)

`gan-356-i-carry` (original, coin-battery, no gyroscope) branches into two lines rather than one
strict chain: `gan-356-i-carry-s` [uncertain, battery-life comparison only] and
`gan-356-i-carry-e` [probable, explicit "swaps the CR1632 battery from the original i Carry"] —
both point back at the *original* i Carry, not at each other, per each file's own reasoning
("read as a parallel, lower-cost line rather than a strict successor to the most recent tier").
`gan-356-i-carry-2` succeeds i Carry S specifically [probable, "over 2x the battery life of the
previous versions" (plural), read as encompassing i Carry S as nearest predecessor]. `gan-i-carry-4`
is the current generation (356 prefix dropped), `announced` left `unknown` rather than asserted
from an unverified capture.

### `gan-ui-series` (4 models, pre-existing, unmodified)

Three separate GAN12-based smart listings (`gan-ui-12-freeplay`, `gan-ui-12-maglev`,
`gan-ui-12-sp`), each its own catalogue listing with no shared "Versions" selector — treated as
three models on the same separate-URL logic used throughout this pass, explicitly *not* asserted
as a strict succession chain (`gan-ui-12-sp`'s file notes FreePlay and SP "coexisted for at
least several months"). `gan-ui-mini-freeplay` is the smart sibling of the mechanical
`gan-mini-m-pro`, placed here by the "X ui Y" naming pattern rather than in `gan-i-series`/
`gan-i-carry-series`, which use a different naming convention.

### `monster-go-3x3` (4 models, all added this run)

- **`monster-go-352-m`** — the only Monster Go or Swift Block product this pass found with a
  full manufacturer spec table (52×52×52mm, plastic, 66g). Compact/beginner format, clear
  model-level size difference from the standard line.
- **`monster-go-magnetic-3x3`** — the standard-size magnetic model ("48 magnets", GAN's own
  copy), read as the sub-brand's primary/flagship 3x3 design.
- **`monster-go-standard-3x3`** — the only Monster Go 3x3 this pass found titled
  "Non-Magnetic". **Boundary call flagged as genuinely uncertain**: this could plausibly be the
  same shell as `monster-go-magnetic-3x3` with magnets omitted at assembly (worked decision A's
  textbook case), but no source states that directly, and the two are separate URLs with no
  combined listing — so, per DATA_MODEL's default-to-split instruction under unclear evidence,
  it is recorded as its own model, explicitly flagged in its own `description` for
  reconsideration if a shared-mould statement is ever found.
- **`monster-go-cloud-rainbow-ut-3x3`** — a single listing selling four colourways ("Cloud -
  blue", "Cloud - pink", "Rainbow", "UT", each also a "premium package" tier), a clean
  variant-level colourway case *within* this model (worked decision C). Whether the model
  itself is the same design as `monster-go-magnetic-3x3` under a second marketing URL is
  **explicitly unresolved** — same price band, overlapping URL vocabulary ("magnetic-speed-cube"
  in both), no tooling statement either way. Recorded with a `duplicate_of` relationship back to
  `monster-go-magnetic-3x3`, `confidence: uncertain`, specifically so the duplicate queue keeps
  surfacing it rather than the suspicion being silently dropped.

**Excluded, not enumerated as a model:** "Monster Go 328 Spelling Cube Set" — found on GAN's own
site filed under the "3x3" category with variants literally named "3x3 (Pink & Purple)" / "3x3
(Green & Yellow)", so it is plausibly a lettered/spelling-sticker colourway of an existing
Monster Go 3x3 shell (probably non-WCA-legal by sticker scheme) rather than a distinct design.
No size, weight, or tooling statement was found to determine which base model it modifies, and
no documented significance was found to justify `scope_class: conditional` admission on its own.
Left out of pass 3 entirely and flagged here as a pass-4 lead (which base model's variant is it,
and what `scope_class`/`legality.wca_status` applies) rather than guessed at. URL:
`gancube.com/products/monster-go-328-spelling-cube-set`, captured 2024-11-19.

**Also excluded, confirmed out of 3x3 scope by GAN's own catalogue structure** (checked this run
via `npm run wayback -- prefix 'gancube.com/products/monster-go'`, 100 URLs enumerated): Monster
Go 251 (2x2), Monster Go Cube Premium Set (an accessory/gift-set bundle), Monster Go Flower
Twist Puzzle, Monster Go Mirror/Skewb shape mods. No further Monster Go 3x3 URLs were found
beyond the four models above.

### `monster-go-smart-cube-series` (1 model, added this run)

`monster-go-3ai` ("Monster Go 3 Ai" / "MG3 Ai") — app-connected solve tracking
(time/move/TPS/fluency), online battle matching, replaceable battery (280h play time), 81g
(confirmed identically on both GAN's dedicated product page and its collection listing). No
second Monster Go smart-cube generation was found.

### `swift-block-3x3` (3 models, all added this run)

- **`swift-block-355s`** — the base, non-MagLev model: 48 magnets, a "numerical tension nut"
  with 5 settings, 85g (GAN's own copy; no formal spec table was found for this specific model,
  unlike its MagLev sibling).
- **`swift-block-355-maglev`** — the MagLev-tier model, sold at a separate URL from 355S with no
  combined listing (same split logic as `gan-356-maglev`/`gan-356-m-e` and
  `gan-v100-maglev`/`gan-v100-leap`). The fullest spec table found for any Swift Block product:
  55×55×55mm, 91.8g.
- **`swift-block-super-maglev`** — found at a URL and title that drop the "355" numeral used by
  every other Swift Block 3x3 (captured 2026-08-11). GAN's own copy describes a distinct
  mechanism ("dual magnetic rings") and a substantially lower weight (71g vs. 355 Maglev's
  91.8g) — read as a new design generation, recorded with a `succeeds` relationship back to
  `swift-block-355-maglev` at `confidence: uncertain` (naming/positioning/spec-difference
  inference, not a manufacturer succession statement).

No further Swift Block 3x3 URLs were found (checked via `npm run wayback -- prefix
'gancube.com/products/swift-block'`, 33 URLs enumerated); the only other Swift Block product
line is "wiSlide" (a sliding-block puzzle, out of 3x3 scope by definition).

## `specs` population — a deliberate, pass-wide policy

None of the 37 pre-existing models populate `model.specs` at all — every mechanism spec
(core_system, maglev, magnet_architecture, adjustment_system) found in this family's own
listings varies by tier bundled within a single model (e.g. GAN16's "88 magnets... standard" vs.
"136 magnets... Max"), so no single value could honestly be asserted as *the* model's shared
default without misrepresenting the tiers it covers. This run follows that same policy for
consistency, **with one addition this run introduced**: where a genuine manufacturer spec table
exists and is unambiguous for a whole model (not a bundled tier choice) — `monster-go-352-m`
(52mm/66g), `monster-go-standard-3x3` (magnet_architecture: none), `monster-go-3ai` (81g),
`swift-block-355-maglev` (55mm/91.8g/maglev), `swift-block-super-maglev` (55mm/71g/maglev) — the
`specs` object is populated and attested. Every model added this run explicitly attests every
critical `specs.*` field (size_mm, weight_g, core_system, maglev, magnet_architecture,
adjustment_system) to at least `confidence: unknown` where no value could be established, rather
than leaving the field silently absent — this is why `npm run coverage`'s "absent" column reads
0.0% for `monster-go` and `swift-block` at the close of this run (see Validation below):
"unknown" means this pass looked; "absent" would mean nobody had.

## Release dates

Per instruction, no model's `released` field was set anywhere in this pass (consistent with all
37 pre-existing models, none of which set it either — `released` is not attested at model level
anywhere in this archive as of this run). `announced` was used instead, and only where a source
gives more than gancube.com's own November 2024 site-wide archival event (which would otherwise
falsely stamp many unrelated products with the same date — the pre-existing records already
identified and worked around this; this run continued that discipline for every new Monster
Go/Swift Block source, explicitly noting in each source's own `reliability_note` when a capture
falls inside that event and is therefore not treated as a launch-date floor).

**Dates this run was able to source**, all `announced`, all at reduced confidence
(`circa`/`before`/`uncertain` — none reach `confirmed`, since none are explicit manufacturer
launch-date statements, only capture floors or "Available Now" banners):

- `gan-v100-maglev`: 2025-10, circa (banner "Available Now!" on the earliest capture)
- `gan-v100-leap`: before 2026-01 (earliest capture of either of its two names/URLs)

Every Monster Go and Swift Block model's `announced` is explicitly `unknown` — every capture
found for these products falls inside gancube.com's November 2024 archival event (or, for
`swift-block-super-maglev`, is a 2026-08 floor with no corroborating source), so none could be
treated as a genuine launch-date floor without repeating the exact mistake this instruction
warns against.

## Unresolved questions and leads for later passes

1. **GAN V100's own identity** (why it exists parallel to GAN17, whether further V-numbered
   generations are planned) — staged in `research/staging/models/gan-v100.yml`, not resolved.
2. **`monster-go-standard-3x3` vs. `monster-go-magnetic-3x3`** — may be the same shell with
   magnets added/omitted at assembly (worked decision A), not confirmed either way. Flagged in
   the model's own `description`.
3. **`monster-go-cloud-rainbow-ut-3x3` vs. `monster-go-magnetic-3x3`** — flagged with an explicit
   `duplicate_of` relationship at `confidence: uncertain`, for the duplicate queue to keep
   surfacing.
4. **"Monster Go 328 Spelling Cube Set"** — not enumerated as a model; likely a sticker-scheme
   variant of an existing Monster Go 3x3 model, `scope_class` (probably `conditional` or
   `reference_only` given likely non-WCA-legal lettered stickers) not assessed. A pass-4 lead.
5. **`gan-356-i3-v2` / `gan-i4` release order** — the two models' own dating floors do not
   confirm which came first; already flagged on both pre-existing files, repeated here for
   visibility.
6. **`gan-flagship-13`'s narrow disappearance window** — present in one GAN nav capture, gone
   eight days later in another; already flagged on the pre-existing file.
7. **"Infinity Customize" / "GAN Customize" / "356 X Infinity"** — carried over unresolved from
   pass 2's own notes; not investigated this run (no family exists for it and it was not in this
   run's assigned scope of four families).

## Sources created this run

18 new `data/sources/*.yml` records, all `kind: manufacturer_official` (tier 1) except none at
tier 2/3/4 this run (Monster Go and Swift Block's own retail material was thin enough that this
run relied entirely on GAN's own first-party product pages for these two sub-brands). All
preserved via `archive_url`, fetched and verified directly via `npm run wayback -- get` on
2026-09-02. Several are deliberately new ids citing the *same* archived page as a source created
in an earlier, interrupted run of this pass (`gancube-monster-go-352-m-specifications` alongside
the pre-existing `gancube-monster-go-352-m-product`, etc.) — per the shared-source-lane rule, a
source file not created in this session is never overwritten, so a fuller excerpt from the same
page is recorded as an additional, separate source rather than editing the original.

`research/staging/models/gan-v100.yml` was edited (append-only, a `resolution_pass3` block added)
rather than rewritten, preserving the original pass-2 findings intact.

## Validation

`npm run validate`, `npm run schemas`, and `npm run check` (which runs schemas, validate, lint,
duplicates, build, privacy, selftest, and coverage in sequence) were all run clean at the close
of this session: 148 records, 0 errors, 0 warnings from `validate`; `check-duplicates.mjs`
raised 6 advisory (non-blocking) rule-29 warnings for family/model name collisions, two of them
new this run (`"gan v100"` and `"mg3 ai"`, both a family name colliding with its own sole/lead
model's name or alias) — the same expected, intentional pattern already present before this run
for `gan-357`/`gan-357-original`, `gan-i-series`/`gan-356-i`, and `gan-i-carry-series`/
`gan-356-i-carry`; not treated as errors, left for the duplicate queue exactly as designed.
Coverage report: `monster-go` and `swift-block` both read 0.0% "absent" on critical `specs.*`
fields (all attested, most `unknown`, some `confirmed`/`probable`); `gan` unchanged at 100.0%
absent, matching the pre-existing 37 models' own established policy of leaving `specs` entirely
unset (see "`specs` population" above).
