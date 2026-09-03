# Pass 3 — model enumeration progress

**Updated:** 2026-09-03 · **Policy:** `research/qc/pass3-admission-policy.md` (the S6 decision)
**Batch 1: COMPLETE** — all four lanes merged, including two recovered after a rate-limit kill.

## Invariants (verified at this commit)

| | Frozen at | Now | |
|---|---|---|---|
| entities | 54 | **54** | ✓ |
| families | **122 — FROZEN** | **122** | ✓ |
| variants | **104 — Pass 4, must not change** | **104** | ✓ |
| models | 48 at Pass 3 start | **156** | +108 |
| sources | 289 at Pass 3 start | **367** | +78 |

Verified programmatically across all 156 models: every `family_id` resolves, every model's
`manufacturer_id` matches its family's, every model carries `scope_class`, no duplicate ids.

## Coverage

**55 of 122 families now have models. 67 remain unenumerated.**

| Manufacturer | Models | Status |
|---|---|---|
| gan | 40 | pilot (pre-Pass 3) |
| qiyi | 24 | **Batch 1 ✓** |
| dayan | 23 | **Batch 1 ✓** (recovered) |
| moyu | 23 | **Batch 1 ✓** |
| yj | 22 | **Batch 1 ✓** (recovered) |
| shengshou | 11 | **Batch 1 ✓** (recovered) |
| monster-go | 5 | pilot |
| x-man-design | 5 | **Batch 1 ✓** |
| swift-block | 3 | pilot |

`scope_class`: **core 152 · reference_only 3 · conditional 1**

## Batch 1 disposition

| Lane | Outcome |
|---|---|
| **A — MoYu** (9 families) | 23 models. Merged `a1ec16c`. |
| **B — QiYi + X-Man** (11 families) | 29 models, 33 sources. Held for QA, both items reconciled, then merged. |
| **C — DaYan** (8 families) | 23 models. **Terminated by rate limit**; committed work + 3 uncommitted TengYun records recovered from the surviving worktree. |
| **D — YJ + ShengShou** (16 families) | 33 models. **Terminated by rate limit**; committed work + 9 uncommitted MGC records recovered. |

**Nothing was re-researched.** Both killed lanes had intact worktrees; their uncommitted records
validated clean and were committed rather than discarded.

## Escalations

| id | Status |
|---|---|
| **E-VALK-1** | Open — `research/qc/pass3-escalation-valk.md`. Prose-only defect in `qiyi-valk`'s description; **no family mutated**. |

## Scope-class discrimination (worth preserving as precedent)

`qiyi-sail-big` was admitted `conditional` on documented competitive feet-solving use.
`qiyi-warrior-plus` and `qiyi-qimeng-plus` were left `reference_only` — oversized, but with no
documented significance. This is the S6 policy's "significance, not mere unusualness" rule
applied correctly rather than everything being swept into `conditional`.

## Remaining work — 67 zero-model families

Next batch, by evidence strength and historical weight:
**yuxin** (7) · **diansheng** (5) · **cyclone-boys** (5) · **maru** (4) · **rubiks** (3) ·
**mfjs** (3) · **fanxin** (3) · **kungfu** (3) · **calvins-puzzle** (3) · **witeden** (3)

Then the ~28 single- and double-family manufacturers.

## Open questions carried forward

- Several MoYu/QiYi model/variant calls flagged `uncertain` by their agents (WeiLong V2,
  RS3M "2021", `qiyi-warrior-m` vs `-m-pro`, `qiyi-m-pro-v2`) — recorded in the agent reports,
  not silently resolved.
- No `specs` block was created anywhere in Batch 1: no tier 1–2 spec source was found, and the
  policy forbids specs from weaker sources. Left unset rather than guessed.

## Pass 4

**NOT STARTED.** Variants remain at 104.
