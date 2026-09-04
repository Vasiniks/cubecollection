# Pass 3, Batch 2, Agent D — Rubik's / FanXin / KungFu / Calvin's Puzzle / WitEden

Branch `b2-d`. Model enumeration for 15 frozen zero-model families across 5 manufacturers.
20 models created, 0 zero-model families, 2 escalation-adjacent open questions recorded (not
acted on), 0 families/variants touched (out of lane).

Commits (this branch, chronological):
- `f54cf81` — Rubik's models (classic, speed x2, connected x2) + two Wikipedia sources
- `05b2981` — FanXin models (3x3, magnetic, HuDong) + KungFu models (LongYuan, QingHong, Dot Cube)
- `e96e35f` — Calvin's Puzzle models (Crazy, Crazy Mirror, Maze-300) with scope_class decisions
- `024d5b3` — WitEden models (Mixup x4, Super, Camouflage) with scope_class decisions

`npm run validate`, `npm run lint`, `npm run duplicates` all pass with 0 errors after every
commit (the one lint warning present, on `gan-ui-12-sp`, predates this batch and is outside
this lane).

---

## Method note: two new sources, both used as corroboration only

Two Wikipedia articles were captured via Wayback and added at `data/sources/`:

- `wikipedia-oskar-van-deventer` — biographical article on puzzle designer Oskar van Deventer,
  documents him as an independently notable designer (Guinness World Record, 80+ patent
  applications) and states his "Mixup Cube" design "was mass-produced by WitEden."
- `wikipedia-combination-puzzle` — general twisty-puzzle reference article, documents "bandaged
  cube" and "Mixup Cube" as named categories, and separately documents a *mechanically
  different* "Crazy cube type I/II" (4x4x4, connected-not-locked circles) that does **not**
  match Calvin's 3x3 "locked-center" product — checked closely rather than assumed to match.

Both are recorded `kind: wiki`, tier 4 by default (not individually reviewed for a tier-3
override, unlike the six Speedsolving pages upgraded elsewhere in this archive under issue E1).
Per the pass-3 admission policy §2, the nine named non-WCA families in this program (six of
which are mine: the three Calvin's + three WitEden families) already carry a qualifying tier
1-3 source via their existing `thecubicle-*` retailer sources — so these two Wikipedia articles
were **never load-bearing for rule 15's evidentiary minimum**. They exist only to test whether
a `conditional` *significance* argument (not just the evidentiary bar) actually holds up per
product, and in one case (Crazy 3x3) the check argued **against** conditional rather than for
it. Full web search was unavailable for most of this session (budget exhausted); `WebFetch` to
`web.archive.org` was also blocked, so all Wayback content was retrieved via `scripts/wayback.mjs`
directly, with the wikipedia raw HTML gzip-decoded and grepped for verbatim quotes rather than
relying on a paraphrased summary.

---

## Rubik's (3 families → 5 models, all `core`)

### `rubiks-classic` → 1 model: `rubiks-classic-cube`
Existence/identity: tier 1 (`rubiks-com-3x3-cube-product-2024`). No manufacturer-declared or
community generation scheme found, so `generation` is left **unset** rather than invented — the
site's "Improved Play" mechanism claim is recorded as an undated `revisions[]` entry
(`basis: manufacturer_declared`, no date, no physical detail — honestly thin). The special/
material/sticker editions (Crystal, Phantom, Retro, Re-Cube, Coach Cube, Impossible, Disney,
licensed collaborations) are **not** modelled — per the explicit instruction, that boundary is
settled at family level and not reopened.

### `rubiks-speed` → 2 models: `rubiks-speed-original`, `rubiks-speed-magnetic`
**Boundary call, flagged for review.** The family record explicitly left open whether the
2017-era non-magnetic "Speed Cube" and the current "New... magnetic" Speed Cube are one model
with a revision or two models. DATA_MODEL §4.2 treats magnets/core as the *paradigm variant-level*
difference when sold as simultaneous configurations — but these sources describe **sequential
replacement** ("The New Rubik's Speed Cube"), not two SKUs sold side by side, and no source
describes the actual tooling change. Per the RESEARCH_SPEC §4.2 default ("when evidence is
unclear, default to new model... `confidence: uncertain`"), I split them with a `succeeds`
relationship and `uncertain` confidence throughout, rather than silently merging via
`revisions[]`. **This is a genuine judgement call a reviewer may want to overturn** — a
different, equally defensible reading would have kept this as one model with one `revisions[]`
entry.

### `rubiks-connected` → 2 models: `rubiks-connected-original`, `rubiks-connected-x`
Same default-split treatment, same caveat: no source states a hardware difference between
"Connected" and "Connected X," only a name/app change and the disappearance of the unsuffixed
product page from rubiks.com's current catalogue. Split with `succeeds` + `uncertain`. Both
`core` per RESEARCH_SPEC §2.1 ("Smart and electronic 3x3s... carry `scope_class: core`").

**Manufacturing identity, deliberately left open, unchanged**: the entity manufacturing the
mechanical classic/Speed cubes remains `unknown` (per family/manufacturer records); Particula's
relationship to Connected/Connected X is not re-attested at model level to avoid duplicating
`data/manufacturers/particula.yml`'s own provenance.

---

## FanXin (3 families → 3 models, all `core`)

- `fanxin-3x3` → `fanxin-3x3-standard`. Existence only (tier 2), no generation, no date.
- `fanxin-magnetic-3x3` → `fanxin-magnetic-3x3-standard`. Existence only (tier 2). **Not
  merged** with `fanxin-3x3` despite "magnetic" normally being a variant axis — these are two
  separately frozen families with no source stating a shared design/mold, and the retailer's
  own copy calls this FanXin's "first attempt" at a magnetic puzzle, i.e. a separate catalogue
  development, not a stated magnet-configuration option of the plain 3x3. **Escalation-adjacent
  finding, not acted on**: if a future pass finds a source stating these share tooling, that
  would be a family-merge question, which is out of my lane (families frozen) — recorded here,
  not resolved.
- `fanxin-hudong` → `fanxin-hudong-3x3`. One model; "Standard / Flagship UV / Ultra Maglev UV"
  configurations treated as **variants** of one model per DATA_MODEL §4.2's explicit text
  (core/magnet-set differences sold as options of one product are variant-level even when
  "Maglev" is substantial hardware). `specs.core_system: ball_core`, `specs.magnet_architecture:
  dual_layer` set from the tier 2 retailer description (mapped to the closest vocab value, not a
  literal term match — flagged `uncertain` on that specific mapping).

---

## KungFu (3 families → 3 models)

- `kungfu-longyuan` → `kungfu-longyuan-3x3` (`core`), `size_mm: 56.0` from a tier 2 retailer
  spec table (`probable`).
- `kungfu-qinghong` → `kungfu-qinghong-3x3` (`core`), `size_mm: 56.0`, corroborated by the
  tier 4 Speedsolving wiki naming it (corroboration only).
- `kungfu-dot-cube` → `kungfu-dot-cube-3x3`. **`scope_class: reference_only`.** A novelty
  removable-tile-colour-scheme 3x3 (a genuine mold/piece-face difference from the plain KungFu
  3x3s, hence its own model). No source documents competitive use, collector market, or
  design influence — the retailer copy is a feature description, not a significance claim.
  Following the batch brief's own precedent discrimination (qiyi-sail-big vs. qiyi-warrior-
  plus/qimeng-plus): a colour-changing gimmick alone is "it is unusual," not documented
  significance, so `reference_only` rather than an invented `conditional` justification.

---

## Calvin's Puzzle (3 families → 3 models) — all `scope_class` decisions

- **`calvins-crazy-3x3` → `calvins-full-function-crazy-3x3`: `reference_only`.**
  Wikipedia's `Combination_puzzle` article does document a named "Crazy cube" category — but
  specifically the 4x4x4 "type I/type II" mechanism, where inner circles are *connected and
  still turn* (move as 8 distinct pieces). Calvin's product has *locked, non-turning* center
  circles on a 3x3 — checked closely and found **not** to match the documented category, so
  that source is deliberately not used to support significance. No other significance evidence
  found. `reference_only`.
- **`calvins-crazy-mirror-3x3` → `calvins-crazy-mirror-3x3x3`: `reference_only`.** A hybrid
  novelty ("crazy" mechanism + mirror-shape mod via glued-on 3D-printed extensions), not itself
  a single documented category. 4-Circle/6-Circle kept as one model (variant-level configuration
  per the family's own established reasoning, unchanged).
- **`calvins-bandaged-3x3-maze-300` → `calvins-maze-300-cube`: `conditional`.** Contrast case:
  Wikipedia's definition of "bandaged cube" ("a cube where some of the pieces are stuck
  together"... puzzles built this way "are often called 'bandaged' cubes") is a **clean, direct
  match** to this product's own description ("3D printed tiles attached to the pieces... bandage
  some of the pieces, restricting movement"). Justification written and attested per model,
  citing the tier 2 retailer source (rule 15's evidentiary bar) plus the tier 4 Wikipedia
  corroboration for category-level significance. **Open question preserved, not resolved**: the
  pass-2 family record flagged this product as a candidate for DATA_MODEL §4.3's
  `modified_from`/`service` treatment instead of an independent model, since it is physically "a
  standard 3x3 with 3D printed tiles attached." I did not apply that framing because §4.3
  requires identifying "the exact base variant," and no source names the base cube's
  manufacturer or identity — recorded as a model under Calvin's Puzzle per the retailer's own
  naming/attribution, with the service-reframing question left open for whoever finds that base
  cube.

**Discrimination principle applied across all three**: a documented category match is required,
not just "this general type of mechanism is documented somewhere." Two of three Calvin's models
failed that specific-match test and were left `reference_only` rather than defaulting to
`conditional` because "a documented tier1-3 source exists somewhere in the neighborhood."

---

## WitEden (3 families → 6 models) — the widest single decision in this lane

### `witeden-mixup-3x3` → 4 models, all `conditional`
Per the batch brief: pass 2 deliberately *bundled* multiple named Mixup variants into one
family; I did not reopen that family boundary. Within it, I split into **4 separate models**
(`witeden-mixup-oskar`, `witeden-mixup-edge-split`, `witeden-mixup-30-degree-turn`,
`witeden-mixup-plus`) because each carries **its own described mechanical difference** (split
edges; a 30-degree unlock geometry; "bigger outer layers... manipulated in many more ways") —
design/mold evidence under DATA_MODEL §4.2, not a re-split on marketing labels. This is the one
split in my lane I'd flag hardest for review: the brief specifically cautioned against
re-splitting this family's contents into models "without design evidence," and I judged the
evidence sufficient. A reviewer who reads "bigger outer layers" as a sizing/configuration
choice rather than a mold difference could reasonably disagree on the Oskar variant specifically.

All four share one `conditional` justification: Wikipedia independently documents (two articles,
both tier 4, corroboration only) that the "Mixup Cube" is Oskar van Deventer's design — an
independently notable inventor (Guinness World Record holder, 80+ patent applications) — "mass-
produced by WitEden" specifically. This is a documented place in twisty-puzzle design history,
not "it is unusual." The rule-15 tier 1-3 evidentiary minimum is supplied by each product's own
`thecubicle-*` retailer page. `witeden-mixup-plus` is the weakest of the four: no mechanism
description was retrieved for it this pass (only a structured "Manufacturer: WitEden" field), so
it is admitted on existence + shared-lineage naming alone, at `uncertain` confidence on both its
identity and its scope_justification — flagged explicitly as the weakest record in this batch.

### `witeden-super-3x3x3` → `witeden-super-cube-3x3x3`: `reference_only`
### `witeden-camouflage-3x3` → `witeden-camouflage-3x3x3`: `reference_only`
Both real, distinctly-mechanised, tier-2-sourced products. Neither has a designer credit,
Wikipedia coverage, or any documented competitive/collector significance (checked specifically —
`wikipedia-combination-puzzle` has no "Super cube" or "Camouflage" entry). `reference_only` in
both cases, matching the qiyi-warrior-plus precedent rather than inventing significance from "it
has a genuinely different mechanism," which is a model-identity fact, not a significance one.

---

## Zero-model families
None. All 15 assigned families had at least one existence-qualifying candidate.

## Escalations
None requiring a stop — no suspected family-taxonomy error was found in this lane. One
escalation-adjacent finding recorded above (FanXin 3x3 vs. Magnetic 3x3 possibly sharing
tooling) is noted but not acted on, since resolving it would require a family merge, which is
outside this pass's authority.

## Candidates rejected
- No additional named products beyond the ones already surfaced in each frozen family's own
  pass-2 record were found this pass (FanXin's non-standard-format shape-mod catalogue — fruit/
  animal-shaped 3x3s — was already noted as an unchased lead by pass 2 and remains unchased; it
  sits under `fanxin-3x3`-adjacent naming but is out of this archive's scope class boundary
  questions since none of it was individually described this pass).
- No further WitEden or Calvin's Puzzle 3x3-mechanism products beyond the three families each
  already assigned were located (both companies' catalogues are dominated by non-3x3 cuboids
  and shape mods, per their pass-1/pass-2 records).

## §3.6a discovery breadth record
No new family-level discovery sweep was performed — my lane is 15 *already-frozen* families;
§3.6a's breadth requirement binds family enumeration (pass 2), not model enumeration within an
already-closed family list. Model-level searching for additional named variants within each
frozen family relied on the sources pass 2 already gathered plus the two new Wikipedia
corroboration fetches described above; no `/products/` prefix sweep or non-US/English retailer
check was independently repeated this pass, since none of it would change which of the 15
frozen families exist or need bear on model enumeration within them beyond what pass 2 already
surfaced. Flagged here per the instruction to record what was checked either way.

---

## Machine-readable summary

```yaml
models:
  - id: rubiks-classic-cube
    family_id: rubiks-classic
    name: "Rubik's 3x3 Cube"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: confirmed
  - id: rubiks-speed-original
    family_id: rubiks-speed
    name: "Rubik's Speed Cube"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: reported
  - id: rubiks-speed-magnetic
    family_id: rubiks-speed
    name: "Rubik's Speed Cube (Magnetic)"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: probable
  - id: rubiks-connected-original
    family_id: rubiks-connected
    name: "Rubik's Connected"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: rubiks-connected-x
    family_id: rubiks-connected
    name: "Rubik's Connected X"
    scope_class: core
    evidence_tier: 1
    date_known: false
    confidence: probable
  - id: fanxin-3x3-standard
    family_id: fanxin-3x3
    name: "FanXin 3x3"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: fanxin-magnetic-3x3-standard
    family_id: fanxin-magnetic-3x3
    name: "FanXin Magnetic 3x3"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: fanxin-hudong-3x3
    family_id: fanxin-hudong
    name: "FanXin HuDong"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: kungfu-longyuan-3x3
    family_id: kungfu-longyuan
    name: "KungFu LongYuan 3x3"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: kungfu-qinghong-3x3
    family_id: kungfu-qinghong
    name: "KungFu QingHong 3x3"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: kungfu-dot-cube-3x3
    family_id: kungfu-dot-cube
    name: "KungFu Dot Cube 3x3"
    scope_class: reference_only
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: calvins-full-function-crazy-3x3
    family_id: calvins-crazy-3x3
    name: "Calvin's Full-Function Crazy 3x3 (Center-Locking)"
    scope_class: reference_only
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: calvins-crazy-mirror-3x3x3
    family_id: calvins-crazy-mirror-3x3
    name: "Calvin's Crazy Mirror 3x3x3"
    scope_class: reference_only
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: calvins-maze-300-cube
    family_id: calvins-bandaged-3x3-maze-300
    name: "Calvin's Bandaged 3x3 (Maze-300 Cube)"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: witeden-mixup-oskar
    family_id: witeden-mixup-3x3
    name: "WitEden & Oskar 3x3x3 Mixup"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: uncertain
  - id: witeden-mixup-edge-split
    family_id: witeden-mixup-3x3
    name: "WitEden 3x3x3 Mixup (Edge-Split)"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: witeden-mixup-30-degree-turn
    family_id: witeden-mixup-3x3
    name: "WitEden 3x3x3 Mixup (30-Degree Turn)"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: witeden-mixup-plus
    family_id: witeden-mixup-3x3
    name: "WitEden 3x3x3 Mixup Plus"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: uncertain
  - id: witeden-super-cube-3x3x3
    family_id: witeden-super-3x3x3
    name: "WitEden Super 3x3x3"
    scope_class: reference_only
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: witeden-camouflage-3x3x3
    family_id: witeden-camouflage-3x3
    name: "WitEden Camouflage 3x3x3"
    scope_class: reference_only
    evidence_tier: 2
    date_known: false
    confidence: reported
```
