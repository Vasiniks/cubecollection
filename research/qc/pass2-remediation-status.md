# Pass 2 remediation — live status

**Timestamp:** 2026-09-03
**Current SHA:** see `git log -1` (baseline for this effort: `9068899`)
**Phase:** Window 1 — four specialists running, no canonical mutation yet

## Counts (verified from repository)

| | |
|---|---|
| entities | 54 (38 manufacturer · 11 sub_brand · 5 service) |
| families | 122 |
| models | **48** (unchanged — gan 40, monster-go 5, swift-block 3) |
| variants | **104** (unchanged) |
| sources | 284 |
| families with zero models | 111 — the Pass 3 queue |

## Specialists

| Agent | Lane | Worktree / branch | Output | Status |
|---|---|---|---|---|
| A | QiYi / X-Man primary-source identity | `rm-a` / `rem-a` | `agent-a-qiyi-remediation.md` | running |
| B | Evidence-tier / attestation policy | `rm-b` / `rem-b` | `agent-b-evidence-policy.md` + `evidence-tier-remediation-matrix.yml` | running |
| C | GAN boundary / pilot ontology | `rm-c` / `rem-c` | `agent-c-gan-boundary.md` | running |
| D | Second-order global adversarial audit | `rm-d` / `rem-d` | `agent-d-global-second-order-audit.md` | running |

All four are **read-only over `data/`** and write one report each in an isolated worktree. None may push.

## Issue summary

See `pass2-remediation-ledger.yml` for the authoritative machine-readable ledger.

- **Critical (2):** `Q1` theqiyi-about-us provenance · `E1` 111 tier-4-only attestations
- **High (2):** `E2` 21 families on a lone tier-4 source · `G1` GAN 356/i/i-carry boundary
- **Medium (2 open):** `S6` non-WCA scope_class prerequisites · (see ledger)
- **Resolved (4):** `S1` gan-354 artifact · `S2` dayan-panshi · `S3` Eastsheen excerpt · `S4` LanLan sweep · `S5` gan-v100 caveat

## Blocking issues

1. **`Q1`** — blocks Pass 3 for QiYi + X-Man Design (11 families). Not auto-fixable: correcting the
   tier breaks six `confirmed` attestations and would leave validation red. Needs replacement evidence.
2. **`E1`** — needs a human policy decision. Affects ~53 families.

## Proposed changes (none applied yet this window)

Nothing has been mutated in `data/` during this remediation window. All corrections from the
prior gate (`S1`–`S5`) are already committed at or before `9068899`.

## Next exact actions

1. Await the four specialist reports.
2. For each critical finding: reopen the underlying source, challenge the specialist's
   interpretation, verify blast radius with a script, *then* decide.
3. Apply only narrow, evidence-backed corrections that leave `npm run check` green.
4. Update this file and the ledger; commit; push.
5. Write `PASS2_HANDOFF.md` and assign the GREEN/YELLOW/RED gate.

## Last validation

`npm run check` — all green at `9068899`; one pre-existing advisory (rule 25,
`data/variants/gan/gan-ui-12-sp/standard.yml`), not a new failure.

## Hard constraint

**Pass 3 has not started and must not start during this effort.** Models remain 48, variants 104.
