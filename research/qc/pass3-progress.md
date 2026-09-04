# Pass 3 — model enumeration progress

**Updated:** 2026-09-04 · **Policy:** `research/qc/pass3-admission-policy.md` (the S6 decision)
**Status: enumeration COMPLETE — every frozen family has been researched.**

## Invariants (verified at this commit)

| | Frozen at | Now | |
|---|---|---|---|
| entities | 54 | **54** | ✓ |
| families | **122 — FROZEN** | **122** | ✓ |
| variants | **104 — Pass 4, must not change** | **104** | ✓ |
| models | 48 at Pass 3 start | **253** | +205 |
| sources | 289 at Pass 3 start | **436** | +147 |

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

## Escalations open for human adjudication

| id | Sev | Item |
|---|---|---|
| **P3-T1** | high | **FangShi GuangYing and JieYun are real 3×3 lines with no family** — `probable`, two independent retailers plus a mould difference; a 61-URL sweep bounds the gap at exactly two |
| **P3-T4** | high | **HaiTun ZhanLang V1 is a real line with no family** — found on Cubezz, `Manufacturer: HAITUN CUBE` |
| **P3-D2** | medium | 7 families understate their own `introduced` date |
| **E-VALK-1** | medium | `qiyi-valk` description prose lists 2×2/4×4/5×5 as 3×3 generations |
| **P3-T2** | low | `escube-es3` / `escube-air` may be one line under two retailer names — model split stands on mechanism evidence regardless |
| **P3-T3** | low | No relationship type for a shared manufacturing platform across brands |

## Is Pass 3 complete?

**Enumeration: yes.** Every frozen family has been researched, and every outcome is either an
admitted model or a documented zero.

**Closure: not yet.** Two independent missing-family findings — **FangShi** (P3-T1) and **HaiTun
ZhanLang** (P3-T4) — surfaced in this session alone. Both are *completeness* gaps rather than
correctness errors: no existing record is invalidated. But two in one session is a pattern, not a
coincidence, and it suggests Pass 2's family enumeration may have missed others that a
family-focused sweep would find.

Neither blocks Pass 4 on correctness grounds. The judgement call for the adjudicator is whether to
run a **targeted Pass 2.6 family-gap sweep** before freezing the model inventory, since models
cannot be enumerated for families that do not exist.

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
