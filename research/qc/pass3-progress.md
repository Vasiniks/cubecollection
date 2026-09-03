# Pass 3 — model enumeration progress

**Started:** 2026-09-03 · **Baseline:** `23ccaf1` · **Policy:** `research/qc/pass3-admission-policy.md`

Live progress record. A fresh session should read this plus the admission policy and be able to
resume without re-reading the research history.

## Invariants (must hold at every commit)

| | Frozen at | Now |
|---|---|---|
| entities | 54 | 54 |
| families | **122 — FROZEN** | 122 |
| variants | **104 — Pass 4, must not change** | 104 |
| models | 48 at start | 71 |
| sources | 289 at start | 289 |

## Status

**Phase:** Agent A (MoYu lane) complete. See `research/qc/pass3-agent-a-moyu.md` for full
per-family reasoning, escalations, and the machine-readable model list.

## Coverage

| Manufacturer | Families | Models | Status |
|---|---|---|---|
| gan | 8 | 40 | pilot complete (Pass 3 done) |
| monster-go | 2 | 5 | pilot complete |
| swift-block | 1 | 3 | pilot complete |
| moyu | 9 | 23 | **Agent A complete** — see pass3-agent-a-moyu.md |
| *all others* | 102 | 0 | **not started** |

## Zero-model families (confirmed, with reasoning)

*none recorded yet*

## Escalations (taxonomy questions — do NOT mutate, record here)

*none from Agent A (MoYu lane). One candidate checked and cleared: the Speedsolving MoYu wiki
article lists a "MoYu YuLong" 3x3 not among moyu's 9 families — confirmed already correctly
handled as `data/families/yj-yulong.yml` (attributed to YJ, "Sometimes bore the MoYu logo," per
`speedsolving-wiki-yongjun-products`). No taxonomy error; not escalated.*

## Open model candidates (discovered, not accepted)

*From Agent A (MoYu lane), pass-4 leads recorded in the relevant model files' descriptions
rather than here (each is tied to a specific model's evidence):*
- *WeiLong AI — expected `smart_version_of` variant of `moyu-weilong-wr-m-2020`, not a model.*
- *WeiLong WR M, GTS2 M/(LE)/(WCA Record Edition), GTS3 M/LM — magnet-configuration variants of
  their respective base models.*
- *WR M 2021 MagLev; V9 Standard/Maglev/Ballcore (+ a Jan-2024 20-magnet Ballcore SKU); Super's
  8/8/20-magnet configurations — all variant leads on their respective model files.*
- *RS3M MagLev and RS3M 2020 UV — variant leads on `moyu-rs3m-2020`. Super RS3M
  Standard/Maglev/Ball Core, Super RS3M V2's three configurations, and RS3M V5's six
  configurations — variant leads on their respective model files.*
- *A possible "RS3M 2021" generation — evidence too thin (one ambiguous mention) to promote to
  a model or even a `revisions[]` entry; recorded as an open question in `moyu-rs3m-2020.yml`.*
