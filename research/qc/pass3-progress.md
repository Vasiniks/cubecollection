# Pass 3 — model enumeration progress

**Updated:** 2026-09-04 · **Policy:** `research/qc/pass3-admission-policy.md` (the S6 decision)
**Batch 1: COMPLETE** · **Batch 2: COMPLETE** — all four lanes merged, two recovered after rate-limit kills.

## Invariants (verified at this commit)

| | Frozen at | Now | |
|---|---|---|---|
| entities | 54 | **54** | ✓ |
| families | **122 — FROZEN** | **122** | ✓ |
| variants | **104 — Pass 4, must not change** | **104** | ✓ |
| models | 48 at Pass 3 start | **207** | +159 |
| sources | 289 at Pass 3 start | **400** | +111 |

Verified programmatically across all 207 models: every `family_id` resolves, every model's
`manufacturer_id` matches its family's, every model carries `scope_class`, no duplicate ids.

`scope_class`: **core 189 · reference_only 11 · conditional 7**

## Coverage

**89 of 122 families now have models. 33 remain unenumerated.**

| Manufacturer | Models | Batch |
|---|---|---|
| gan | 40 | pilot |
| qiyi | 24 | 1 |
| moyu | 23 | 1 |
| dayan | 23 | 1 |
| yj | 22 | 1 |
| shengshou | 11 | 1 |
| mfjs | 10 | **2** |
| yuxin | 8 | **2** |
| cyclone-boys | 6 | **2** |
| rubiks | 5 | **2** |
| x-man-design | 5 | 1 |
| monster-go | 5 | pilot |
| witeden | 7 | **2** |
| calvins-puzzle | 3 | **2** |
| kungfu | 3 | **2** |
| fanxin | 3 | **2** |
| maru | 4 | **2** |
| diansheng | 4 | **2** |
| swift-block | 3 | pilot |

## Zero-model families — deliberate findings, not gaps

| Family | Reason |
|---|---|
| `yuxin-3x3` | tier-4-only; full 666toy CDX sweep + TheCubicle + cubezz found no admissible model |
| `yuxin-water` | same |
| `cyclone-boys-metallic-3x3` | "Metallic" reads as a finish treatment — a Pass 4 variant axis, not a model line. Written up in `research/notes/models/cyclone-boys-metallic-3x3-zero-model.md` |

## Escalations

| id | Status |
|---|---|
| **E-VALK-1** | Open — `research/qc/pass3-escalation-valk.md`. Prose-only defect in `qiyi-valk`; no family mutated. |

## Review items raised in Batch 2 (not silently resolved)

- **`yuxin-little-magic-v3` `/name`** at `uncertain` — the manufacturer titles it "Small Magic",
  not "Little Magic". Filed on category placement plus independent retailer naming.
- **Rubik's Speed split** (`original` / `magnetic`) at `uncertain` — sequential replacement plus a
  declared core change, not two simultaneous SKUs. Revisit if a mechanism source appears.
- **`witeden-mixup-plus`** at `uncertain` — name and spec table only, no mechanism evidence.
- **Two orphaned MFJS keychain sources** (30mm, 35mm) with no model record — the agent was killed
  before writing them. Retained per policy.
- **FanXin plain vs magnetic** — a possible shared-tooling question that would need a *family*
  merge. Out of Pass 3 scope; recorded, not acted on.

## Date artifacts — now three retailer plus one manufacturer

`Added: 2018-09-11` (29 occurrences / 22 sources / 13 brands) · `Added: 2018-10-14` ·
`Added: 2018-11-07` · **NEW: `2018-07-16` uniform sidebar date on 666toy.com** — the first such
artifact on a *manufacturer's own* site rather than a retailer's. All refused; none used as a date.

## Remaining work — 33 zero-model families

Next batch candidates, by evidence strength: the ~28 single- and double-family manufacturers
(`escube`, `giiker`, `huameng`, `newisland`, `qj`, `guoguan`, `guojia`, `haitun`, `lefun`,
`mefferts`, `mohuanshousu`, `mojue`, `moretry`, `particula`, `pbcube`, `senhuan`, `yancheng`,
`cube4you`, `cubestyle`, `eastsheen`, `fangshi`, `mf8`) plus the remaining `diansheng` and
`yuxin` families that Batch 2 could not admit.

## Pass 4

**NOT STARTED.** Variants remain at 104.
