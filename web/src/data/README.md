# archive -> exhibition adapter

This directory is the ONLY place presentation code may cross from archive records to exhibition
content. The pipeline is:

```
dist/preview or dist/public (built bundle)
        |  load.ts    — fetch, cache, lazy per-entity-file access
        v
   raw bundle records (RawManufacturer, RawFamily, RawModel, RawVariant, RawSource)
        |  adapter.ts — pure functions, no I/O, no framework imports
        v
   exhibition view models (types.ts): ManufacturerView, FamilyView, ModelView, VariantView
        |
        v
   UI / scene
```

**The UI must never read `data/` and must never re-derive archival semantics.** It reads
`ManufacturerView` / `FamilyView` / `ModelView` / `VariantView` and nothing else. If a component
needs a fact this adapter does not yet surface, the fix is another `attestedValue(...)` call in
`adapter.ts`, not a shortcut into the raw bundle.

## Why this exists

`docs/EXHIBITION_ARCHITECTURE.md` §10 measured the bundle: face colours are undocumented on all
511 public variants, logo placement on 511, geometry profile on 511, body plastic colour on 489.
`unknown` is the **common** case, not the edge case. A naive adapter that fills gaps with
plausible defaults (a standard colour scheme silently applied, a confidence silently assumed)
would misrepresent the one thing this archive is actually for: showing what it knows, how
strongly, and where it stops. This adapter is the enforcement point for that discipline, because
it is the only code between the archive's honest gaps and a renderer that might otherwise want to
paper over them.

## The provenance contract

Every value that reaches a view model is a `Value<T>` (see `types.ts`):

```ts
type Value<T> = SourceBackedValue<T> | ConventionValue<T> | UnknownValue<T>;
```

A discriminated union on `basis`, so the three states are mutually exclusive **in the type
system**, not just by convention:

- **`{ basis: 'source-backed', value, confidence, sourceIds, disputed?, adjudication? }`** — the
  archive attests this. `confidence` is one of the six values in `vocab/confidence.yml`, copied
  verbatim from the attestation that produced it — the adapter never computes or upgrades a
  confidence level.
- **`{ basis: 'convention', value, conventionId }`** — the *exhibition* supplies this because the
  archive makes no claim. Cannot carry `confidence` or `sourceIds`; the type does not have the
  fields. See "Rendering conventions" below.
- **`{ basis: 'unknown', searched, unattestedValue? }`** — no archival claim reaches the UI here,
  and the adapter has not invented one.

### Rules the adapter enforces, and what proves each one (`adapter.test.ts`)

| rule | enforced by | proven by |
|---|---|---|
| An absent archival value becomes `{ basis: 'unknown' }`, never a plausible default | `attestedValue()` returns early when there is no attestation *and* no raw value | `absent field never fabricates a value` |
| A convention value is always `basis: 'convention'` with a `conventionId`, never `source-backed` | `ConventionValue<T>` has no `confidence`/`sourceIds` fields; `standardFaceColorConvention()` is the only function that produces one | `convention values are never tagged source-backed` |
| The adapter never raises a confidence level | `attestedValue()` copies `att.confidence` verbatim; nothing in the adapter compares or ranks confidence values | `attested confidence is copied verbatim, never upgraded` (fixture with `confidence: 'uncertain'` asserted still `'uncertain'` out) |
| The adapter never drops `disputed` | `attestedValue()` maps `att.disputed[]` into `DisputedAlternative<T>[]` unconditionally when `confidence === 'disputed'`, and does not pick a winner | `disputed attestations keep every candidate and never resolve a winner` (real `cyclone-boys-feiwu-original--standard` shape) |
| `unknown` (searched) and absence (not searched) are different | `UnknownValue.searched`: `true` only when an attestation with `confidence: 'unknown'` exists at that pointer; `false` when no attestation exists at all | `searched vs never-examined unknown are distinguishable` |

### Why curatorial framing is not a `Value`

`docs/EXHIBITION_ARCHITECTURE.md` §3 groups manufacturers into "deep / mid / thin" galleries by
model count — a curatorial decision the exhibition makes about how to present evidence, not a
claim the archive itself is making. If this used `Value<T>` with some fourth `basis`, a component
could accidentally read `.confidence` off a curatorial framing and display it as if the archive
had attested "GAN is a deep maker" with some evidentiary strength. It hasn't; nobody sourced that,
because it isn't a historical fact, it's an exhibition design decision computed from a count of
historical facts. `CuratorialFraming<T>` (`types.ts`) is therefore a distinct type with **no**
`basis`, `confidence`, or `sourceIds` field — it cannot satisfy `Value<T>`'s shape, so passing one
where a `Value` is expected is a compile error, not a runtime judgment call.

The only implementation here is `classifyMakerDepth()` (deep >=16 models, thin <=3, mid
otherwise), matching the manufacturers EXHIBITION_ARCHITECTURE §3 names explicitly (GAN 40, DaYan
28, QiYi 24, MoYu 23, YJ 23, ShengShou 18 as deep; MFJS 10 named as mid in
RESEARCH_FINAL_HANDOFF.md). The document does not specify where 4–7 models fall; folding that
range into "mid" is this adapter's own disclosed judgment call, named as such in the code comment
— in keeping with the archive's own habit of stating judgment calls rather than hiding them.

### Rendering conventions

`docs/EXHIBITION_ARCHITECTURE.md` §10.4 identifies one real candidate: the standard WCA face
colour scheme, offered as a documented convention because the archive has deliberately not
recorded face colours anywhere (511/511 undocumented). §10.4 is explicit that **adopting it is a
decision Phase III has not yet made** ("Phase III must choose, explicitly"). This adapter
therefore does not apply it automatically to every variant's `colorway.faces`. Instead it exposes
`standardFaceColorConvention()` as an opt-in helper a future curatorial layer can call once that
decision is made; every value it returns is tagged `basis: 'convention'`,
`conventionId: 'wca-standard-color-scheme-v1'`, and can never be mistaken for archival evidence
because `ConventionValue<T>` has no `confidence` field to fake one in. Nothing in `adaptVariant()`
calls it — a rendered "unknown" face stays `{ basis: 'unknown' }` until someone decides otherwise.

### Why render diagnostics (`RenderDiagnostics`) are not `Value`s

`renderable`, `colorwayCompleteness`, `blockers` are deterministic functions of colour/logo/
geometry data that already exists elsewhere on the same view model as `Value`s (mirroring
`colorwayCompleteness()`/`renderBlockers()` in `scripts/lib/archive.mjs`, which is where the
*bundle* itself already computed them — the adapter reads `representation.procedural` off the
built record rather than recomputing). They carry no independent confidence to report; wrapping a
pure function of other Values in another Value would be circular, not more honest.

## Inheritance: MODEL -> VARIANT, never variant -> sibling variant

`resolvedSpecs` on `VariantView` mirrors the bundle's own `resolved_specs`, which `build.mjs`
computes via `resolveSpec(variantDoc, modelDoc, field)` — variant's own `config` first, else the
parent model's `specs`, else absent. **It never reads another variant.** `adaptVariant()` takes
exactly one variant document and at most one model document as input — there is no parameter
through which a sibling variant's data could leak in, so the "never variant -> sibling variant"
rule is structural, not a runtime check. Each resolved spec is tagged
`{ from: 'model' | 'variant', value: Value<T> }`, and the `Value` itself is built by looking up
the attestation on whichever record actually supplied the raw value (`/config/<field>` on the
variant, or `/specs/<field>` on the model) — so an inherited spec still carries the model's own
confidence and sources, not a fabricated "inherited, therefore certain" claim.

## `citedSourceIds()` / `sourceTier()` — mirrored, not imported

`scripts/lib/archive.mjs` exports `citedSourceIds()` and `sourceTier()`, and the lane brief that
produced this adapter is explicit that tier logic must not be reimplemented from vocab kind
defaults alone (55+ sources carry a per-source `tier:` override that beats the kind default — see
`companies-house-rubiks-brand-ltd`, `kind: press` but `tier: 1`).

This adapter does **not** `import` `scripts/lib/archive.mjs` directly, for two structural reasons:
it pulls in `node:fs`, `node:crypto`, `ajv` and `js-yaml`, none of which belong in a browser
bundle that `load.ts` fetches over HTTP; and those packages are not installed at the repository
root in this worktree (only `web/package.json` is this lane's to touch, per the lane's hard
constraints, and root `node_modules`/`package-lock.json` are out of scope for a data-adapter
lane). Instead, `adapter.ts` re-implements the exact same two algorithms:

- `citedSourceIds(att)` — structurally identical to `archive.mjs`: reads `att.sources` **and**
  every `att.disputed[].sources`, because a disputed attestation's sources live only in the
  latter. (`archive.mjs`'s own comment documents this exact blind spot biting rules 8, 12, 42 and
  45 before it was closed — the adapter's copy is written to be trivially diffable against that
  function, not independently re-derived.)
- `sourceTier(source)` — explicit per-source `tier` always wins; falls back to a kind-default
  table only when absent, and to `5` if the kind itself is unrecognised, exactly like
  `archive.mjs`. The kind-default table is necessarily a duplicate of `vocab/source-kinds.yml`
  (this bundle format has no reflection into YAML at runtime); `adapter.test.ts` reads that vocab
  file directly (Node-only, at test time) and asserts the two agree, field for field, as a guard
  against drift.

## Lazy loading (`load.ts`)

The bundle `build.mjs` emits is **one JSON file per entity type** (`manufacturer.json`,
`family.json`, `model.json`, `variant.json`, `source.json`) plus small prebuilt indexes
(`index/by-manufacturer.json`, `by-family.json`, `by-model.json`, `chronology.json`). There is no
per-record file to fetch — `build.mjs` is out of this lane's file allow-list, so this is the
chunk boundary available without a build change.

`load.ts` therefore chunks **per entity-type file**, not per record:

1. `meta.json` and every `index/*.json` are tiny (a few KB to tens of KB) and safe to fetch
   eagerly — they're what a landing/browse page needs before anything else.
2. `manufacturer.json` (~220 KB in the measured preview bundle) and `family.json` (~360 KB) are
   fetched on first access to manufacturer/family data, not on module load.
3. `model.json` (~870 KB), `variant.json` (~1.34 MB) and `source.json` (~1.36 MB) — the three
   files that would otherwise pull all 269 models, 511 variants, and 616 sources into a page that
   only wants one of them — are fetched **only** the first time something asks for a record of
   that type, and the parsed array is memoised per `(baseUrl, file)` so a second request never
   re-fetches or re-parses.
4. Narrow accessors (`getModelsForManufacturer`, `getVariantsForModel`, `getSourcesByIds`, …)
   combine an index file with a memoised entity-file fetch, so a model-detail page's variant list
   never depends on having model.json or the full manufacturer list in memory first.

This is the honest limit of "lazy" without touching `build.mjs`: it is lazy and cached **per
entity-type file**, not per individual record — fetching a single variant still means fetching all
of `variant.json` (1.34 MB) once, the first time any variant is requested. That first fetch is not
avoidable inside this lane's file allow-list. A follow-up to `build.mjs` (out of scope here) that
emitted either per-id files or a slim index carrying the fields most list views need (name,
manufacturer, first_release — already close to what `index/chronology.json` provides) would let
`load.ts` avoid ever pulling the full 1.34 MB for a browse view. That gap is disclosed here rather
than silently accepted as "lazy enough."

## What the adapter refuses to do

- It does not invent a release date, spec value, or manufacturer fact. Every `Value<T>` with
  `basis: 'source-backed'` traces to a real attestation on a real record.
- It does not pick a winner among disputed sources. `adjudication` is passed through verbatim,
  including the common case where it literally says "Not adjudicated."
- It does not apply the standard face-colour convention automatically. That is a decision
  EXHIBITION_ARCHITECTURE §10.4 leaves open; the helper exists, nothing calls it by default.
- It does not read `data/`, `schema/`, or `vocab/` at runtime. Those are read-only reference
  material used while writing this adapter (to get the confidence/status/scope-class value sets
  and the source-kind tier defaults right); nothing in `adapter.ts` or `load.ts` opens them.
- It does not let a variant inherit from a sibling variant. `adaptVariant()`'s only inputs are one
  variant document and (at most) one parent model document.
- It does not throw when a cited source id is missing from the loaded `source.json` (defensive:
  the evidence trail marks that entry `missing: true` instead of crashing a page over a bundle
  inconsistency it did not cause).

## A real, measured gap this adapter had to design around

Running `node scripts/build.mjs --mode=publication` (the default mode, `dist/public`) in this
worktree on 2026-09-21 emits **zero source records**, not just zero manufacturers/models/variants:
`published` is the status filter, and no source in the archive currently carries that status
either (`meta.json` for that run: `"public": {}`, against `"private": { "source": 616, ... }`).
A true publication-mode bundle today would produce empty evidence trails for everything, since
there would be no `source.json` entries to resolve `sourceIds` against. `--mode=research-preview`
(`dist/preview`) retains all 616 sources because they carry `sourced`/`drafted`/`stub` statuses
that the preview filter accepts. This adapter and its test were built and measured against the
preview bundle for that reason; `load.ts` takes the bundle's base URL as a parameter rather than
hardcoding `dist/public`, so pointing it at a future, actually-populated `dist/public` requires no
code change here — but until sources themselves get promoted to `published`, a publication-mode
build cannot support the evidence drawer at all. That is a curation decision (ledger territory),
not something this adapter can or should paper over.
