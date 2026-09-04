# Finding: two zero-family classification schemes with colliding letters

**Found:** 2026-09-03, by the graphify knowledge-graph extraction over `research/`
**Severity:** low — **documentation clarity only. No record is misclassified.**
**Status:** open (documentation fix, not a data fix)

## The problem

The archive uses **two different zero-family classification schemes**, and their letters
partially collide.

**Scheme 1 — the Pass 2 research log** (`research/notes/models/global-pass2-families.md`, line
643), a two-way split:

| Label | Meaning |
|---|---|
| type **(a)** | scope exclusion — the catalogue holds no standard 3×3×3 mechanism |
| type **(b)** | aftermarket/rebrand — the "brand" resells another maker's cube modified |

**Scheme 2 — the adjudication gate** (`research/qc/pass2-human-review.md`, line 173), a four-way
split:

| Label | Meaning |
|---|---|
| **A** | no in-scope 3×3 found |
| **B** | products belong to another entity |
| **C** | out of scope |
| **D** | evidence insufficient |

## The collision

| Log says | Review assigns | Letters agree? |
|---|---|---|
| type **(b)** aftermarket → Z-Cube | **B** belongs to another entity | **yes**, coincidentally |
| type **(a)** scope exclusion → VeryPuzzle, LimCube, Xinlexin, HelloCube, CubeTwist, Ninja | **C** out of scope | **NO** — (a) maps to C |

**This is more dangerous than a clean inversion.** One letter happens to agree (b→B) and the
other does not (a→C). The partial agreement makes the two schemes *look* like one scheme, so a
reader who checks a single entity may conclude they match and then misread every other row.

## What is NOT wrong

**Every classification in both documents is correct on its own terms.** Z-Cube genuinely is an
aftermarket case; VeryPuzzle, LimCube, Xinlexin, HelloCube, CubeTwist and Ninja genuinely are
scope exclusions. No entity is misfiled, and no downstream record depends on the letter. This is
purely a naming hazard between two documents.

## Recommended fix (not applied)

In the Pass 2 log, replace the bare `type (a)` / `type (b)` labels with their meanings —
"scope exclusion" and "aftermarket/rebrand" — or restate them as the review's `C` and `B`.
Prose labels cannot collide; single letters in two schemes always can.

Deliberately not applied here: this session's task was to build a knowledge graph, not to edit
the research record, and the change touches a 2,322-line canonical log that several other
documents cite by line.

## Why the graph found it

The extraction read the log's late region and the adjudication gate as one corpus and had to
reconcile two competing definitions of the same concept. Reading either document alone, the
collision is invisible — which is exactly the class of cross-document inconsistency a knowledge
graph is supposed to surface.
