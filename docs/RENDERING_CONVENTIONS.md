# Rendering conventions

**Status:** architecture, in force from 2026-09-21.
**Enforced by:** `schema/rendering-convention.schema.json`, `scripts/validate-conventions.mjs` (rules C1–C5), `scripts/check-schemas.mjs` rule 5.
**Registry:** `conventions/rendering-conventions.yml`.

This document resolves Phase III Blocker B: how the exhibition can render a cube
without fabricating historical specifications.

---

## 1. The problem, measured

The archive is strong on identity, lineage and provenance, and almost silent on
appearance. Measured against all 527 variant records on 2026-09-21:

| Visual property | Documented | Undocumented |
|---|---:|---:|
| Face colours (any face) | 0 | 527 |
| Logo placement | 0 | 527 |
| Geometry profile | 0 | 527 |
| Body plastic colour | 22 | 505 |
| Surface application (stickered / stickerless / printed / inlaid / hybrid) | 122 | 405 |
| Size in mm | 236 | 291 |

`representation.procedural.renderable` is `false` on every variant in the
archive. Not most. Every one.

So the exhibition faces a real choice, and only three options exist:

1. **Render nothing.** Honest, and it discards the project's entire visual
   ambition. A museum of cubes that shows no cubes.
2. **Render plausible cubes.** Dishonest. A visitor cannot tell a rendered guess
   from a rendered fact, and the archive's whole value is that distinction.
3. **Render an explicitly conventional cube.** Draw the object, and make the
   basis of every visual property inspectable.

This project takes option 3. Option 2 is the failure mode the directive named:
*do not silently turn "not researched" into "historically known."*

## 2. The three layers

These must never collapse into one data layer, and they are kept apart by
storage location, not by discipline:

| Layer | Lives in | Carries evidence? | Example |
|---|---|---|---|
| **Canonical archival information** | `data/` | Yes — `attestations`, `sources`, `confidence` | "This variant is stickerless" (`uncertain`, 1 source) |
| **Exhibition interpretation** | exhibition code and copy | No — attributed to the museum | Grouping makers by depth of coverage; which model opens a section |
| **Rendering convention** | `conventions/` | **Structurally cannot** | "Draw the standard six colours because none are documented" |

A convention has no property in which a source could be written. That is
deliberate: the schema sets `additionalProperties: false` and simply omits
`sources`, `attestations` and `confidence`. You cannot cite evidence for a
convention because the moment you could, a convention would stop looking like
one.

## 3. Precedence

**The archive always wins.** A convention's `applies_to.when_absent` lists JSON
Pointers; the convention applies only when *every* one of them is absent on the
record. If the archive documents a value — at any confidence, including
`uncertain` and `disputed` — the archival value is used and the convention is
not consulted.

This means a convention's reach shrinks automatically as research advances. It
also means `affected_records` is a live measure of how much of the exhibition is
invented, which is why rule C3 re-measures it on every `npm run check` and fails
on drift. A convention that misstates its own reach misrepresents the museum.

## 4. What every convention must declare

`asserts_nothing_about` and `visitor_disclosure` are required fields, not
documentation. They exist because the danger of a convention is not that it is
wrong — it is that a visitor cannot tell it is a convention at all. The standard
colour scheme is *more* dangerous than an obviously odd one, precisely because
it looks right.

`visitor_disclosure` holds the exact words shown to a visitor wherever the
convention is in force. It is stored as data, not written into a component,
for two reasons: a redesign cannot quietly drop it, and every claim the museum
makes about its own honesty can be reviewed in one file.

`if_removed` makes reversibility a precondition of adoption. "The cube cannot be
drawn" is an acceptable answer — and for `cv-geometry-generic-3x3` it is the
correct one.

## 5. The six conventions in force

| id | Covers | Records |
|---|---|---:|
| `cv-face-colours-wca-standard` | The six face colours | 527 |
| `cv-body-plastic-neutral` | Body plastic colour | 505 |
| `cv-logo-omitted` | Logo placement — omitted, never guessed | 527 |
| `cv-geometry-generic-3x3` | Piece geometry and bevel | 527 |
| `cv-size-56mm-fallback` | Size where unresolved | 291 |
| `cv-surface-stickerless-fallback` | Surface application where undocumented | 405 |

Two of these deserve comment.

**`cv-logo-omitted` is the shape of a good convention.** A logo is not needed to
draw a cube, so nothing is forced. Drawing a manufacturer's mark in a guessed
position would fabricate a specific, checkable and probably wrong detail.
Omission asserts nothing, and the disclosure exists only to stop a visitor
inferring that these cubes carried no logo.

**`cv-geometry-generic-3x3` is deliberately plain.** No sculpted edges, no
ridged corners, no piece design resembling any real mould. Placeholder geometry
is acceptable in this project; placeholder history is not, and an ornate
invented shell would be the latter wearing the costume of the former.

## 6. Consumer contract

Anything reading a bundle must:

- Treat `convention.json` as conventions, never as records.
- Never merge a convention into a record field without carrying its basis.
  Every value reaching the interface is tagged `source-backed`, `convention` or
  `unknown`.
- Surface `visitor_disclosure` wherever a convention is in force.
- Never raise a confidence level, and never present `uncertain` as settled. Of
  the 122 documented surface applications, 70 sit at `uncertain`.
- Distinguish `unknown` (searched, not established) from absent (not searched).
  These are different findings and the archive records them differently.

## 7. Changing a convention

Conventions are superseded, never silently edited. A replacement declares
`supersedes` and a new `introduced` date. The previous entry is retained: the
exhibition's own history of presentation choices is evidence about the
exhibition, and this project does not delete evidence.

When the archive grows, `affected_records` and `measured_on` must be updated.
Rule C3 will fail the build until they are.
