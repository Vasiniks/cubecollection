# Implementation manifest

Every file created for Phase A, and why it exists. Nothing here contains cube data.

## Documents

| File | Purpose |
|---|---|
| `PRODUCT.md` | Durable product truth: users, purpose, positioning, scope, constraints, principles |
| `DATA_MODEL.md` | The schema: entities, relationships, field definitions, variant rules, source hierarchy, 38 QC rules, file structure, privacy |
| `RESEARCH_SPEC.md` | Scope policy, source practice, the model/variant boundary worked through, the nine passes, confidence in practice, the GAN pilot |
| `docs/research-agents.md` | The seven-agent team, write lanes, and what may run in parallel |
| `docs/implementation-manifest.md` | This file |
| `README.md` | Orientation |
| `tests/fixtures/README.md` | What the fixtures are and why they are not archive data |
| `research/README.md` | Where research output goes and why pricing and media are sidecars |

## Schemas — `schema/`, 17 files

JSON Schema draft 2020-12. Four custom annotations carry the rules that prose would let drift:
`x-critical` (gates publication, rule 6), `x-private` (never reaches the public bundle, §8.6),
`x-derived` (computed by the build, rule 37), `x-reserved` (a later phase, rule 38).

| File | Holds |
|---|---|
| `common/date.schema.json` | Precision-bearing date; `value` shape is tied to declared precision |
| `common/money.schema.json` | A price as originally quoted. No converted currency |
| `common/attestation.schema.json` | The provenance sidecar, keyed by JSON Pointer, including the `disputed` block |
| `common/colorway.schema.json` | Full colourway: designation, application, body, per-face, piece colours, pattern, logo |
| `common/media.schema.json` | 2D assets with class, role, subject, origin, rights, checksum |
| `common/representation.schema.json` | Procedural readiness and captured 3D. Expected empty |
| `common/relationship.schema.json` | Typed, directional edges |
| `common/legality.schema.json` | WCA status with `as_of` and historical periods |
| `manufacturer`, `family`, `model`, `variant`, `specimen`, `source`, `person`, `event` | The entities |
| `geometry-profile.schema.json` | Reserved. No records, no renderer |

## Vocabularies — `vocab/`, 49 files

Controlled vocabularies as data. `scripts/lib/archive.mjs` injects each one's values as the
`enum` of every property annotated `x-vocab`, so a vocabulary and its schema cannot drift.
`source-kinds.yml` additionally carries each kind's default source tier.

Covers: confidence, record status, scope class, derivation, manufacturer kinds, family
positioning, generation and revision basis, shape, core systems, MagLev, magnet
configurations, adjustment systems, coatings, the eight colourway vocabularies, face notation,
piece classes, face materials, logo placement and treatment, edition types, rarity levels and
factors, WCA status, production status, release channels, price kinds and conditions, media
classes / roles / subjects / origins, rights status, 3D capture classes and status, source
kinds, preservation methods, link status, relationship types, person roles, event kinds,
specimen condition, date precision and qualifier.

## Tooling — `scripts/`

| File | Rules | Blocking |
|---|---|---|
| `lib/archive.mjs` | — | Shared loading, vocabulary injection, JSON Pointer, annotated traversal, fingerprint, inheritance, derived-field helpers |
| `validate.mjs` | 1–17, 37–38 | **yes** |
| `lint-semantic.mjs` | 18–27 | no |
| `check-duplicates.mjs` | 28–30 | no |
| `check-links.mjs` | 31 | no. Offline by default; `--fetch` requests and writes back |
| `report-coverage.mjs` | 32–36 | no |
| `build.mjs` | §8.5 | **yes** |
| `check-privacy.mjs` | §8.6 | **yes** |
| `selftest.mjs` | all | **yes** |
| `new-record.mjs` | — | Scaffolds an empty record from its schema. Structure, never facts |

## Fixtures — `tests/fixtures/`

Synthetic records, every id prefixed `zz-`, loaded through `CC_DATA_ROOT` and never from
`data/`. `pass/` is a miniature archive that must validate clean; `fail/` trips named rules.
The self-test asserts every blocking rule fires and that `data/` still holds nothing.

## Agents — `.claude/agents/`, 7 files

See `docs/research-agents.md`.

## Trees left deliberately empty

`data/` (nine entity directories), `research/` (five), `assets/images/`, `assets/captures/`.
Each carries a `.gitkeep` stating why it is empty.

## Supporting

`package.json` (three pinned dependencies: ajv, ajv-formats, js-yaml), `.gitignore`,
`.github/workflows/validate.yml`.

## Commands

```
npm run validate     npm run lint         npm run duplicates
npm run links        npm run coverage     npm run build
npm run privacy      npm run selftest     npm run check
npm run new -- <entity> <id>
```
