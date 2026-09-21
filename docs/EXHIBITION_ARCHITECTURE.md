# CubeCollection — Phase III exhibition architecture

Written 2026-09-19, immediately after the research-to-exhibition handoff
(`research/qc/RESEARCH_FINAL_HANDOFF.md`). This document defines the exhibition *concept* and
*information architecture*. It is deliberately not implementation.

Every structural decision below is justified from a measured property of the archive. Where the
data does not support a section, that is said rather than designed around.

---

## 1. WHAT THIS MUSEUM IS

A 3×3 speedcube archive of 54 manufacturers, 132 families, 269 models and 527 variants, in which
**609 sources carry excerpts, tiers and confidence values** and every single record cites at
least one of them.

That last fact is the whole proposition. Anyone can build a grid of cube photos. Almost nobody
can show, for each claim, *what the evidence is, how strong it is, and where it stops*. The
archive already refuses to state what it cannot support — it holds `unknown` where it searched
and found nothing, distinguishes that from `blocked`, and marks 11 questions as human decisions
rather than guessing them.

**The exhibition's distinguishing idea is therefore: a museum that shows its evidence.**
Provenance is not a footnote panel. It is a primary exhibit.

---

## 2. WHY NOT A TIMELINE-FIRST MUSEUM

The obvious structure for a historical archive is a chronological spine. **The data cannot carry
it.** Only **128 of 269 models (48%)** hold any date at all, and those cluster 2016–2024 with a
peak of 18 in 2019. A timeline-first museum would silently hide half the collection, or worse,
imply the undated half does not exist.

The timeline is therefore **a view, not the spine** — presented over its documented subset, with
the undated remainder visible and explained rather than dropped. That honesty is on-brand for
this archive rather than an apology.

---

## 3. THE SPINE: MAKERS

The archive's depth is concentrated and uneven, and that unevenness is real history rather than
a defect:

| manufacturer | models |
|---|---|
| GAN | 40 |
| DaYan | 28 |
| QiYi | 24 |
| MoYu | 23 |
| YJ | 23 |
| ShengShou | 18 |
| MFJS | 10 |
| …48 others | 1–8 each |

**A uniform room-per-manufacturer plan would produce 54 rooms, most of them nearly empty.** The
architecture must scale presentation to evidence:

- **Deep makers** (GAN, DaYan, QiYi, MoYu, YJ, ShengShou) — full galleries with lineage,
  generations and configuration depth.
- **Mid makers** (roughly 8–15 models) — a single room, lineage without sub-navigation.
- **Thin makers** (1–3 models, often one source) — an archival card, not a gallery. Presenting a
  one-source budget brand as a grand hall would misrepresent the evidence.

---

## 4. SECTIONS, AND THE DATA THAT EARNS EACH

### 4.1 The Case (provenance)
*Earned by: 609 sources, tier vocabulary, six confidence values, 52 lint rules.*
How the archive knows what it knows. Shows a real claim, its excerpt, its tier, its confidence,
and — crucially — examples of claims the archive **refused**: a weight rejected because it was a
shipping figure, a second publisher rejected because its copy was the first one's verbatim, a
date rejected because it was a catalogue-migration stamp. The refusals are more persuasive than
the acceptances.

### 4.2 Makers
*Earned by: the manufacturer distribution above.* The spine. Scaled by depth as in §3.

### 4.3 Lineage
*Earned by: families with real generational depth* — `gan-356` (13 models), `moyu-weilong` (10),
`yj-mgc` (9), `gan-flagship-series` (8), `dayan-zhanchi` (7), `dayan-guhong` (6),
`qiyi-warrior` (6). Successor chains, renames, and the places where a maker renumbered its own
line (MoYu's WeiLong jumps V2 → GTS → WR → V9; V3–V8 never existed, and the archive proved that
rather than assuming it).

### 4.4 Mechanism
*Earned by: the populated configuration axes* — `maglev` 94, `coating` 84, `weight_g` 74,
`magnet_configuration` 62, `size_mm` 50, `magnet_strength` 31, `adjustment_system` 25,
`core_system` 21. The best-evidenced narrative in the archive: springs → magnets → ball cores →
magnetic levitation. This is where the collection genuinely tells a story of engineering
evolution, because those axes are populated densely enough to compare across makers and years.

### 4.5 Configurations
*Earned by: 112 models holding multiple configurations* — richest are `lefun-3x3-standard` (14
variants), `mf8-crazy-3x3-plus-planet-series` (9), `dayan-bermuda-triangle` (8),
`gan-flagship-16` (8), `maru-3x3-original` (8). A comparison interface, offered **only** for
these. The 100 single-configuration models must not be given a comparison UI implying variants
that were never found.

### 4.6 Timeline
*Earned by: 128 dated models.* A view over its subset, honest about the other 141.

### 4.7 Edges
*Earned by: 15 `conditional` + 13 `reference_only` models.* Oversized novelties (QiYi Warrior
Plus at 188 mm and 981 g; ShengShou Legend Plus Big at 180 mm), non-WCA-legal puzzles, shape-mod
adjacents. The margins of a collection are usually its most interesting room, and the archive has
adjudicated each one deliberately.

**Note for implementation:** the 13 `reference_only` models are currently excluded from
`dist/public` by `PUBLIC_SCOPE = {core, conditional}`. All 13 are evidenced *in-window*, and that
exclusion is under review as ledger P4-16. **This section's contents depend on that decision.**

### Rejected as sections
- *Special editions* — the `limited` axis is populated on only 33 variants; too thin for a room,
  better as a cross-cutting tag.
- *Events / people* — 4 events and 2 people. Accent material, not a section.

---

## 5. DATA-TO-EXHIBITION MAPPING

```
Manufacturer   identity, country, founding, sub-brand relationships
               -> gallery header; scaled by model count

Family         a named product line
               -> lineage graph; generation ordering

Model          a distinct design (the frozen unit)
               -> the exhibit object; specs, dates, legality, scope class

Variant        a sold CONFIGURATION — the atomic exhibition record
               -> the thing actually rendered and compared

Source         excerpt, tier, confidence, archive locator
               -> the evidence drawer, attachable at every level above
```

**The variant is the object on the plinth.** This is the single most important mapping decision
and it follows the data model: DATA_MODEL calls the variant "the atomic exhibition/configuration
record". A model is a design; a variant is a thing that was sold, with a colourway, a coating, a
core and a weight. Visitors look at variants.

---

## 6. VISITOR EXPERIENCE

**Landing.** One claim, one object, one piece of evidence — the proposition stated in ten
seconds: *this is a cube, this is what we know about it, this is how we know*.

**Three entry paths**, because three genuinely different visitors exist:
- *Browse* — by maker. The default.
- *Trace* — by lineage or mechanism. The enthusiast path.
- *Interrogate* — by evidence. The archivist path, and the one nobody else offers.

**Model detail.** Specs with their confidence visible. A claim at `uncertain` must not look
identical to one at `confirmed` — confidence is rendered, not hidden in a tooltip.

**Variant comparison.** Only where multiple configurations exist. Diff the axes that actually
differ, not a full spec table of mostly-identical rows.

**Evidence drawer.** Persistent, available at every level, showing the excerpt verbatim with its
tier and link. This is the feature the dataset uniquely supports.

**Navigation.** Return paths must be preserved — a visitor who descends manufacturer → family →
model → variant → source has to get back without losing place.

---

## 7. 3D REQUIREMENTS

**Blocking fact: nothing renders today.** `data/geometry-profiles/` is empty, `data/media/` does
not exist, 0 specimens, and `build.mjs` computes `renderable` as
`Boolean(profile) && completeness === 'render_ready'` — false for all 527 variants. Current
readiness is **0% render_ready, 0% face_complete, 36% partial, 64% none**.

**Recommended: the hybrid.** A parametric 3×3 driven by recorded data (`size_mm`, `colorway`,
`coating`, `core_system`, `maglev`), plus authored assets for a small set of landmark cubes.
Per-model authored geometry for 269 models is not achievable without an asset pipeline and
rights-cleared reference imagery the archive does not have; generic-only would flatten exactly
the mechanical distinctions §4.4 exists to show.

**The honesty constraint, and it is not negotiable.** A parametric cube is an *illustration*, not
a scan. The presentation must not imply visual fidelity the evidence does not carry — the same
standard the archive applies to every other claim. A rendered cube whose colourway is recorded
`unknown` must not silently appear in some plausible colour.

**Assets needed:** base parametric mechanism (core, centres, edges, corners); material treatments
for the recorded coatings (UV, frosted, matte) and body translucency; magnet/core cutaway states
for §4.4; a turntable and an exploded view; neutral studio lighting with a single documented
environment; camera states per exhibit type.

---

## 8. TECHNICAL CONSTRAINTS

- **Consume `dist/public` only.** `build.mjs` already emits `dist/private` (everything, never
  deployed) and `dist/public` (private data removed), and states: *"Phase B consumes dist/public
  only. No presentation code reads data/."* That boundary is already designed; honour it.
- **Do not rebuild graphify.**
- **Budget for 527 variants**, not 527 bespoke scenes — one parametric mechanism instanced with
  per-variant parameters.
- **Provenance travels with the data.** The evidence drawer needs excerpt, tier, confidence and
  locator present in the public bundle.

---

## 9. THE VERTICAL SLICE

Before any breadth, prove the chain end to end:

```
data → 3D object → interaction → historical context → exhibition presentation
```

**Candidate: `gan-flagship-16`** — 8 variants, a deep maker, populated mechanism axes, part of a
13-model lineage. It exercises lineage, configuration comparison, mechanism and provenance in one
object. `dayan-guhong-pro-m` (6 variants) is the historical alternative.

The slice must demonstrate: a variant rendered from recorded parameters; switching configuration
and seeing the model change; confidence rendered rather than hidden; the evidence drawer showing
a real excerpt; and one honest gap — a field the archive records as `unknown`, displayed as
unknown.

**If the slice cannot show an `unknown` honestly, the design is wrong**, because roughly half
this archive's value is in what it declines to claim.

---

## 10. VERIFIED DATA CONTRACT (measured 2026-09-19, not assumed)

The build was run and `dist/public` inspected. Three findings change what Phase III must plan
for, and all three are better news than "nothing renders" suggested.

### 10.1 The public bundle is EMPTY by default, and that is a gate, not a defect
`build.mjs` filters on `--public-status=`, defaulting to **`published`** — and **no record in the
archive has that status**. Statuses in use are `drafted` (manufacturers 32, families 122, models
253), `sourced` (22 / 10 / 15, and all 609 sources) and `stub` (1 model and **all 527 variants**).

So a default build emits **0 records**. Building with `--public-status=sourced,drafted,stub`
emits **1568 of 1597 records, 4.1 MB**, and passes.

**This is a decision Phase III needs before it can consume anything**: either promote records to
`published` through a curation pass, or have the exhibition build declare the status set it
accepts. Note that all 527 variants are `stub`, and the variant is the object on the plinth —
so a gate of `sourced` alone would publish **zero** of the things visitors look at.

### 10.2 The bundle is richer than expected
Public counts: 54 manufacturers · 132 families · **256** models · **511** variants · 609 sources
· 2 people · 4 events. (13 models and 16 variants are excluded by `PUBLIC_SCOPE = {core,
conditional}` — the `reference_only` records discussed in §4.7.)

Output is one JSON file per entity plus prebuilt indexes: `index/by-manufacturer.json`,
`index/by-family.json`, `index/by-model.json`, `index/chronology.json`.

A public **variant** record already carries: `attestations` (each with `confidence` and
`sources`), `config`, **`resolved_specs`** — inheritance already resolved, each value tagged with
where it came from (`"from": "variant"`) — plus `lineage`, `inbound_relationships`,
`first_release`, `scope_class` and `fingerprint`.

**Two consequences.** The evidence drawer of §6 is directly supported: confidence and source ids
are already in the bundle. And the frontend does **not** need to implement model→variant
inheritance — `resolved_specs` has done it, and says which layer each value came from.

### 10.3 The 3D blockers are already enumerated per variant
`representation.procedural` carries `geometry_profile_id`, `colorway_completeness`, `renderable`
and an explicit **`blockers`** list. Measured across all 511 public variants:

| blocker | variants affected |
|---|---|
| face colours undocumented (U, D, F, B, L, R) | **511** |
| logo placement undocumented | **511** |
| no geometry profile (reserved; none exist) | **511** |
| body plastic colour undocumented | 489 (so 22 *are* documented) |

No variant has fewer than three blockers. **Rendering is blocked by missing DATA at least as much
as by missing assets**, and the gaps are uniform rather than a long tail — which makes them
plannable.

### 10.4 The face-colour decision, which is a genuine one
Standard speedcube colour schemes are near-universal (white opposite yellow, red opposite orange,
blue opposite green). The archive has deliberately **not** recorded them, because it does not
assert what it has not sourced — the same discipline that produced 30 explained advisories and 11
declared human decisions.

Phase III must choose, explicitly:
- **(a) Adopt the standard scheme as a documented rendering convention**, clearly labelled as a
  convention and not as evidence about any particular cube. Unblocks all 511 at once.
- **(b) Leave faces undocumented and render neutrally** (uncoloured or schematic), reserving
  colour for the 22 variants with a documented body plastic and any future sourced colourway.

**(a) is recommended, on the condition that the convention is visible to the visitor** — the
exhibition may render a conventional cube, but it must not let a visitor believe the archive
*sourced* that colour arrangement for that product. This is the §7 honesty constraint applied to
the one field that blocks everything.

---

## 11. Blockers A and B, resolved

Phase III could not begin until two decisions were made durable as architecture
rather than as behaviour inside a component. Both are now resolved, enforced and
reversible. Neither changed a single archive record.

> **A note on denominators.** §10.3 counts the **511 variants in the public
> bundle**; §11.2 and `conventions/` count all **527 variants in the archive**.
> Both are correct in their own frame. The convention layer deliberately uses the
> archive as its denominator, because a convention describes a gap in what was
> *researched*, and that gap does not move when a build filter moves.

### 11.1 Blocker A — the public status gate

**Problem.** `dist/public` contained 0 records, because every record sits at
`stub` while the build gate admits only `published`. The exhibition had nothing
to read.

**What was rejected.** Flipping hundreds of records from `stub` to `published`.
Measurement showed all 527 variants carry attestations and 253 carry a config
block, so the status field was never tracking the research — but that is a
**curation gap for a human**, not a bug to be fixed by rewriting records. A
status means "a curator approved this for display"; changing it in bulk would
have destroyed the only signal that distinguishes reviewed from unreviewed work.

**Decision.** Two build modes whose **output directory carries the claim**:

| Mode | Command | Output | Admits |
|---|---|---|---|
| publication | `npm run build` | `dist/public` | `published` only |
| research preview | `npm run build:preview` | `dist/preview` | `sourced`, `drafted`, `stub` |

`dist/preview/meta.json` states in words that the bundle is **not a
publication**, that the records' presence asserts they are *researched* and not
*approved*, and that any consumer must surface `record.status` to the viewer.
An explicit `--public-status=` still overrides, so the gate stays inspectable.
No record status was changed to produce any of this.

### 11.2 Blocker B — visual rendering data

**Problem.** The archive documents almost no visual facts. `renderable` is
`false` on all 527 variants. Face colour, logo placement and geometry profile
are documented on **zero** of them.

**Decision.** Render the object, and make the basis of every visual property
inspectable. **Rendering conventions become a third layer**, stored in
`conventions/` outside `data/`, under a schema that has no `sources`, no
`attestations` and no `confidence` property — so a convention has nowhere to
claim evidence even if someone tried.

Six conventions are in force. The archive always wins: a convention applies only
where every pointer in its `when_absent` is empty, so its reach shrinks
automatically as research advances. Each one declares what it
`asserts_nothing_about`, the exact `visitor_disclosure` a visitor must be shown,
and `if_removed` — reversibility is a precondition of adoption.

§10.4's recommendation (a) is adopted **with its condition met**: the standard
scheme is drawn, and `cv-face-colours-wca-standard` carries the words that stop
a visitor believing the archive sourced it.

Enforced by `scripts/validate-conventions.mjs` rules C1–C5, all control-tested
by mutation. Full rationale and the consumer contract:
**`docs/RENDERING_CONVENTIONS.md`**.

### 11.3 The contract this places on everything downstream

Every value that reaches the interface carries its basis — `source-backed`,
`convention`, or `unknown` — and these three must remain visually and
structurally distinct all the way to the screen. An adapter that flattens them,
or a component that renders a convention as though it were sourced, breaks the
one thing this archive exists to be trusted about.
