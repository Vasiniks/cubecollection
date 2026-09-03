# Pass 2 remediation — live status

**Timestamp:** 2026-09-03
**Current SHA:** see `git log -1` (baseline for this effort: `9068899`)
**Phase:** Window 1 COMPLETE — all four specialists reported; verified corrections applied
**Gate:** 🟡 YELLOW — ready with documented risk. See `PASS2_HANDOFF.md`.

## Counts (verified from repository)

| | |
|---|---|
| entities | 54 (38 manufacturer · 11 sub_brand · 5 service) |
| families | 122 |
| models | **48** (unchanged — gan 40, monster-go 5, swift-block 3) |
| variants | **104** (unchanged) |
| sources | 285 |
| families with zero models | 111 — the Pass 3 queue |

## Specialists

| Agent | Lane | Worktree / branch | Output | Status |
|---|---|---|---|---|
| A | QiYi / X-Man primary-source identity | merged | `agent-a-qiyi-remediation.md` | **complete** |
| B | Evidence-tier / attestation policy | merged | `agent-b-evidence-policy.md` + `evidence-tier-remediation-matrix.yml` | **complete** |
| C | GAN boundary / pilot ontology | merged | `agent-c-gan-boundary.md` | **complete** |
| D | Second-order global adversarial audit | merged | `agent-d-global-second-order-audit.md` | **complete** |

All four wrote only to `research/qc/` — verified by diff before merging. Worktrees removed.

All four are **read-only over `data/`** and write one report each in an isolated worktree. None may push.

## Issue summary

See `pass2-remediation-ledger.yml` for the authoritative machine-readable ledger.

**15 issues tracked · 11 resolved · 4 open.**

- **Critical: 0 open.** `Q1` RESOLVED (QiYi re-sourced to qiyitoys.net). `E1` RESOLVED
  (differentiated tier policy; 111 violations → 12 held for human decision).
- **High: 0 open.** `G1` RESOLVED (GAN boundary rule written; zero model re-parenting).
  `E2` reduced from 21 families to 9 by the E1 overrides.
- **Open (4):** `E2` (9 families, corroboration backlog) · `D-F4` (single-source/publisher
  concentration) · `S6` (non-WCA scope_class prerequisites) · `D-F5` (cubicle-labs parent_id).
- **Resolved (11):** `Q1` `E1` `G1` `S1` `S2` `S3` `S4` `S5` `D-F1` `D-F2` `D-F3`.

## Blocking issues

**None.** Both former blockers are resolved and verified. Pass 3 is unblocked subject to the
open decisions in `PASS2_HANDOFF.md`.

## Changes applied this window

All verified in the main session against the underlying evidence before applying — no correction
was made on a specialist's say-so alone.

- New tier-1 source `qiyitoys-company-history`; `qiyi`, `x-man-design`, `x-man-tornado`,
  `qiyi-valk` re-sourced/corrected; `theqiyi-about-us` demoted to tier 4 and retained.
- Rule 9 in `scripts/validate.mjs` extended to enforce publisher independence.
- `thecubicle` and `speedcubeshop` `/kind` downgraded confirmed → probable.
- Tier-3 override on 6 Speedsolving sources; 36 attestations downgraded to `uncertain`.
- `guojia-type-a-chun` note weakened; 14 dangling research-note references repointed.
- `gan-v100` caveat rewritten as resolved; `gan-family-boundary-rule.md` written.

## Next exact actions

See `PASS2_HANDOFF.md` § "Next session instructions". In short:

1. Resolve the 12 held attestations (`mfjs-products`, `mf8-products`, `mofang-jiaoshi`).
2. Source or defer `mf8-crazy-3x3x3` — it will hard-fail rule 15 at Pass 3.
3. Take the conditional-admission policy decision (`S6`).
4. Then Pass 3 may begin, applying `gan-family-boundary-rule.md`.

## Last validation

`npm run check` — all green at `9068899`; one pre-existing advisory (rule 25,
`data/variants/gan/gan-ui-12-sp/standard.yml`), not a new failure.

## Hard constraint

**Pass 3 has not started and must not start during this effort.** Models remain 48, variants 104.
