# Phase III Architecture Review — Lane E (Hostile Reviewer)

Status: IN PROGRESS (skeleton committed first per working-style instructions)

Scope: attack the Phase III exhibition/rendering-convention work (data adapter,
three.js convention resolver, exhibit UI) and report defects. Read-only lane;
no repo files modified except a transient, reverted control test (if any).

## Method

- Static reading of the listed files, path-tracing conventions -> records -> UI.
- Commands run verbatim, with actual output captured (not paraphrased).
- Every finding tagged CONFIRMED (reproduced with a command/test/trace) or
  SUSPECTED (reasoned from code but not executed).

## Commands run and raw results

(filled in below as run)

## Claim-by-claim verdicts

1. A convention can never be presented as an archival fact — **TBD**
2. The archive always wins over a convention (when_absent enforced in code) — **TBD**
3. `affected_records` is trustworthy (validator vs renderBlockers vs schema) — **TBD**
4. No record status was changed to make the exhibition work — **TBD**
5. The adapter never fabricates / raises confidence / drops a dispute — **TBD**
6. The three convention values in code match the registry (guarded) — **TBD**
7. The UI invents no disclosure wording — **TBD**
8. Lane B's accessibility claims (contrast ratios, confidence-hue-as-text) — **TBD**

## Additional hunts

- Recomputed counts / denominators — **TBD**
- Dead code / unreachable branches — **TBD**
- `facesAgree()` collapse correctness — **TBD**
- Error paths (missing bundle, absent record id, cited source not in bundle) — **TBD**

## Defect list (severity-tagged)

(filled in below)

## Could not verify

(filled in below)
