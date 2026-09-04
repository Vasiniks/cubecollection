# Pass 3 — model enumeration progress

**Updated:** 2026-09-04 · **Policy:** `research/qc/pass3-admission-policy.md` (the S6 decision)
**Batches 1, 2 and 3: COMPLETE.**

## Invariants (verified at this commit)

| | Frozen at | Now | |
|---|---|---|---|
| entities | 54 | **54** | ✓ |
| families | **122 — FROZEN** | **122** | ✓ |
| variants | **104 — Pass 4, must not change** | **104** | ✓ |
| models | 48 at Pass 3 start | **240** | +192 |
| sources | 289 at Pass 3 start | **414** | +125 |

Verified programmatically across all 240 models: every `family_id` resolves, every model's
`manufacturer_id` matches its family's, every model carries `scope_class`, no duplicate ids.

`scope_class`: **core 219 · reference_only 12 · conditional 9**

## Coverage

**112 of 122 families have models. 10 remain at zero.**

| Batch | Lanes | Models |
|---|---|---|
| **1** | MoYu · QiYi+X-Man · DaYan · YJ+ShengShou | 108 |
| **2** | YuXin · DianSheng+MFJS · CycloneBoys+Maru · Rubik's cluster | 51 |
| **3** | Smart cubes · Historic makers · MF8/HuaMeng/ESCube · MoYu sub-brands+NewIsland | 33 |

## The 10 remaining zero-model families

**Genuinely concluded (3)** — do not re-research:

| Family | Reason |
|---|---|
| `yuxin-3x3` | tier-4-only; full 666toy CDX sweep + TheCubicle + cubezz found nothing admissible |
| `yuxin-water` | same |
| `cyclone-boys-metallic-3x3` | "Metallic" is a finish treatment — a Pass 4 variant axis, not a model line |

**Unresearched (7)** — the Batch 4 queue:

| Family | Tier | Note |
|---|---|---|
| `diansheng-stickerless-3x3` | 4 | **unfinished, not concluded** — Agent B was killed before reaching it |
| `diansheng-type-e` | 4 | same |
| `cubestyle-3x3` | 2 | known type-(b) aftermarket case (QiYi Warrior W / YJ GuanLong base cubes) |
| `guojia-type-a-chun` | 2 | |
| `haitun-waverider` | 2 | |
| `lefun-3x3` | 2 | one base mould across ~60 print-theme SKUs |
| `moretry-tianma-x3` | 2 | |

## Escalations — open, none resolved under the freeze

| id | Item |
|---|---|
| **E-VALK-1** | `qiyi-valk` description prose lists 2×2/4×4/5×5 as 3×3 generations |
| **P3-D1** | **10 models predate their frozen family's `introduced`** — `research/qc/model-predates-family-finding.md` |
| **FangShi missing families** | GuangYing and JieYun are real, separately-named 3×3 lines with no frozen family (2 retailers) |
| **ESCube naming tension** | SpeedCubeShop calls it "ES3 Air" (an ES3 edition); TheCubicle calls it "ESCube Air" (own line) — in tension with the frozen two-family split |
| **GoCube X ↔ Rubik's Connected X** | may be one hardware product under two brands; no `rebrand_of` recorded (evidence not decisive) |

## Rule gap found this batch

**No rule compares a model's date to its family's.** A model dated years before its own family
passes `npm run check` silently. Recommended fix, with a precision allowance so year-vs-month
artifacts stay quiet, is in `model-predates-family-finding.md`. Same shape as the earlier rule-9
publisher-independence gap.

## Review items carried forward

- `yuxin-little-magic-v3` `/name` — manufacturer titles it "Small Magic"
- Rubik's Speed `original`/`magnetic` split — sequential replacement, held `uncertain`
- `witeden-mixup-plus` — name and spec table only, no mechanism evidence
- `giiker-supercube-i3s` — identity held `uncertain`, admitted on the declared-generation path
- `mf8-crazy` Planets vs Plus Planet Series — split `uncertain`, no mould statement either way
- `newisland-lightning` V1/V2 — split `uncertain`, only a version number distinguishes them
- MF8 Legend V1 — **candidate, not admitted**; only tier 4/5 evidence found
- Two orphaned MFJS keychain sources; FanXin shared-tooling question

## Date artifacts — four documented, all refused

`Added: 2018-09-11` (29 occurrences / 22 sources / 13 brands) · `Added: 2018-10-14` ·
`Added: 2018-11-07` · uniform `2018-07-16` sidebar date on **666toy.com** (manufacturer site).

## Pass 4

**NOT STARTED.** Variants remain at 104.
