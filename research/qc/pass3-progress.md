# Pass 3 — model enumeration progress

**Updated:** 2026-09-07 (Pass 2.6) · **Policy:** `research/qc/pass3-admission-policy.md` (the S6 decision)
**Status: enumeration COMPLETE. Closure BLOCKED — see Pass 2.6 below. Pass 4 NOT safe to begin.**

## Invariants (verified at this commit)

| | Frozen at | Now | |
|---|---|---|---|
| entities | 54 | **54** | ✓ |
| families | **122 — FROZEN** | **122** | ✓ |
| variants | **104 — Pass 4, must not change** | **104** | ✓ |
| models | 48 at Pass 3 start | **253** | +205 |
| sources | 289 at Pass 3 start | **460** | +171 (+24 in Pass 2.6) |

Verified programmatically across all 253 models: every `family_id` resolves, every model's
`manufacturer_id` matches its family's, every model carries `scope_class`, no duplicate ids.

`scope_class`: **core 232 · reference_only 12 · conditional 9**

## Coverage — 119 of 122 families have models

| Batch | Scope | Models |
|---|---|---|
| **1** | MoYu · QiYi+X-Man · DaYan · YJ+ShengShou | 108 |
| **2** | YuXin · DianSheng+MFJS · CycloneBoys+Maru · Rubik's cluster | 51 |
| **3** | Smart cubes · Historic makers · MF8/HuaMeng/ESCube · MoYu sub-brands+NewIsland | 33 |
| **4** | Final seven families | 13 |

## The 3 remaining zero-model families — all documented conclusions

| Family | Reason |
|---|---|
| `yuxin-3x3` | tier-4-only; full 666toy CDX sweep + TheCubicle + cubezz found nothing admissible |
| `yuxin-water` | same |
| `cyclone-boys-metallic-3x3` | "Metallic" is a finish treatment — a Pass 4 variant axis, not a model line |

**No family remains unresearched.** The two DianSheng families that were *unfinished* rather than
concluded were completed in Batch 4, using contemporaneous Speedsolving forum evidence (tier 3 by
the archive's own vocabulary) after their tier-4 wiki proved inadmissible.

## Validation rule added this session

**Rule 40 — a model may not predate its own family** (`lint-semantic.mjs`, advisory).
Closes the P3-D1 gap where a model dated years before its family passed every check silently.
Compares against the *start* of the family's precision window, widened for `circa` but **only when
the model date is itself soft**, so an `exact` model date is never swallowed by a family's
vagueness. Fires on 4 genuine conflicts, correctly silent on 6. Both branches carry fixtures and
the selftest asserts the allowance branch stays quiet. Documented as DATA_MODEL §7.9.

## Escalations — status after Pass 2.6 adjudication

| id | Sev | Item |
|---|---|---|
| **P3-T1** | high | **RESOLVED — ESTABLISHED.** FangShi GuangYing and JieYun raised `probable` → `confirmed` on 4 and 5 independent tier-2 retailers |
| **P3-T4** | high | **RESOLVED — REJECTED.** An alias: same Cubezz product ID 8598 / SKU HTO02C under both titles |
| **P3-D2** | medium | 7 families understate their own `introduced` date |
| **E-VALK-1** | medium | `qiyi-valk` description prose lists 2×2/4×4/5×5 as 3×3 generations |
| **P3-T2** | low | `escube-es3` / `escube-air` may be one line under two retailer names — model split stands on mechanism evidence regardless |
| **P3-T3** | low | No relationship type for a shared manufacturing platform across brands |
| **P26-1** | crit | **4 missing families established** — FangShi ×2, ShengShou YuFeng, YJ Appari. Blocks Pass 4 |
| **P26-2** | crit | **Escalation roll-up has no mechanism** — findings went silent twice |
| **P26-3** | high | RESEARCH_SPEC §3.6a never applied retroactively to the frozen taxonomy |
| **P26-4** | high | CubeTwist zero-family finding overturned by evidence |
| **P26-5** | high | 7 credible missing-family candidates await adjudication |
| **P26-6** | med | 11 leads recorded in surviving Pass 3 reports, never verified |
| **P26-7** | low | HaiTun ZhanLang alias + Dolphin gloss now sourced, not yet recorded |

## Is Pass 3 complete? — superseded by Pass 2.6

**Enumeration: yes.** Every frozen family was researched; every outcome is an admitted model or
a documented zero.

**Closure: NO — and for a bigger reason than this document originally recorded.**
See `research/qc/pass2.6-family-gap-sweep.md` (2026-09-07) for the adjudication.

Pass 2.6 ran five lanes against the two missing-family findings recorded below. The results
changed the picture in both directions:

- **P3-T1 FangShi GuangYing / JieYun — ESTABLISHED**, raised `probable` → `confirmed` on four
  and five independent tier-2 retailers.
- **P3-T4 HaiTun ZhanLang — REJECTED.** Same Cubezz product ID and SKU under two titles three
  months apart: a retailer rename, not a second line. A false positive.
- **Two further families established that nobody predicted:** **ShengShou YuFeng** (a
  two-generation magnetic-core flagship still selling in 2025) and **YJ Appari**.
- **CubeTwist's zero-family finding overturned**, plus 7 credible and 11 unverified candidates.

### The escalation table below was incomplete, and that is the real finding

It listed six items. The true number was materially higher, because **escalation roll-up has no
mechanism** (ledger `P26-2`). Two independent failures:

1. Pass 3 Batch 1 lanes **C (DaYan) and D (YJ+ShengShou) were killed by rate limits and their
   reports were never written** — 24 families and 56 models enumerated with no roll-up. The
   ShengShou YuFeng escalation survived *only* because that agent also wrote it into a source
   record's notes, where it sat at `status: sourced` and unpropagated.
2. `pass3-b2-agent-c-cycloneboys-maru.md` **survived**, explicitly recorded six Cyclone Boys and
   four Maru lines as having no frozen family — and still never reached the ledger.

**The defective step is the roll-up, not the research.** Every finding was made correctly and
written down honestly.

### Pass 4 gate: **NOT SAFE TO BEGIN**

Four established missing families are four variant subtrees Pass 4 cannot enumerate. This is a
completeness blocker, not a correctness one — no existing record is invalidated.

## Review items carried forward

`yuxin-little-magic-v3` naming · Rubik's Speed split · `witeden-mixup-plus` · `giiker-supercube-i3s`
identity · `mf8-crazy` Planets vs Plus Planet Series · `newisland-lightning` V1/V2 · MF8 Legend V1
(candidate, not admitted) · MoreTry TianMa X3 V2 (contaminated source, held `uncertain`) ·
two orphaned MFJS keychain sources · FanXin shared-tooling question

## Date artifacts — four documented, all refused

`Added: 2018-09-11` (29 occurrences / 22 sources / 13 brands) · `Added: 2018-10-14` ·
`Added: 2018-11-07` · uniform `2018-07-16` sidebar date on **666toy.com** (a manufacturer site).

## Schema findings

- `validate.mjs` enforces id uniqueness **globally across entity types**, not per-type as the
  schema description implies.
- `vocab/relationship-types.yml` has no value for a shared manufacturing platform short of a
  decisive rebrand (P3-T3).

## Pass 4

**NOT STARTED.** Variants remain at 104.
