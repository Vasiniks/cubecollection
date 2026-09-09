# Pass 4 — variant enumeration progress

**Started:** 2026-09-08 · **Baseline:** `b1dfcc3` · **Authorised:** by the user, taxonomy frozen
**Frozen and must not change: 132 families · 269 models · 54 manufacturers.**

## The starting position

The archive held **104 variants across 48 models** when Pass 4 opened — and every one of those
48 belongs to the **GAN pilot ecosystem**:

| Manufacturer | models | with variants |
|---|---|---|
| GAN | 40 | **40** |
| Monster Go | 5 | **5** |
| Swift Block | 3 | **3** |
| *everything else* | **221** | **0** |

So Pass 4's real subject is the **221 models that have never been assessed** for configuration
axes. DaYan 28 · QiYi 24 · MoYu 23 · YJ 23 · ShengShou 18 · MFJS 10 · YuXin 8 · and a long tail.

## What Pass 4 is, and is not

Pass 4 populates the **variant layer only**. The definition of done is *not* "every model has a
variant" — it is:

> every model has been **assessed** for meaningful variant axes, all defensible variants are
> recorded, and unresolved model/variant boundaries are documented.

**A model with zero variants is a complete, correct result**, and the record of having assessed
it is as much a deliverable as any variant created.

## The discipline this pass inherits

The GAN pilot already set the anti-explosion precedent, visible in
`data/variants/gan/gan-356-air/standard.yml`: black / white / primary stock colour options
collapse into **one** `standard` variant, because no source treats them as separately marketed
editions. Only a genuinely named, separately marketed edition earns its own record.

Every lane is briefed to run the **dedup test** — product ID, SKU, underlying URL, dimensions,
mechanism, official naming, package contents — before admitting anything. The archive has a
documented false positive from precisely this failure mode (HaiTun ZhanLang: one Cubezz product
ID and SKU appearing under two names three months apart), and it is the reference case.

## Batch 1 lanes — all Sonnet 5, isolated worktrees, skeleton-first

| Lane | Scope | Models | Expected density |
|---|---|---|---|
| **A** | MoYu | 23 | highest — flagship WeiLong lineage, documented config axes |
| **B** | QiYi + X-Man | 29 | high — Valk/Warrior/MS magnetic splits, Tornado tiers |
| **C** | YJ + MFJS | 33 | high — MGC line, RS3M lineage |
| **D** | DaYan + ShengShou | 46 | **low — many zeros expected**, dead official sites, pre-magnetic era |

Lanes were balanced by *expected variant complexity*, not file count: lane D carries the most
models precisely because most of them should end at zero.

**131 of 221 unassessed models** are covered by batch 1. The remaining ~90 (YuXin, DianSheng,
WitEden, Cyclone Boys, MoreTry, Rubik's, FangShi, Maru and the long tail) are batch 2.

## Rate-limit interruption and recovery — 2026-09-08

All four lanes were killed by a session limit within their first few calls, before any wrote a
record. Recovery per the established discipline: worktrees inspected, **nothing substantive lost**
(all still at 104 variants), two skeleton commits had survived (`3323d9f`, `118457d`) and two
lanes had died before even that. All four were **resumed with context intact** rather than
respawned, and the two that had not committed a skeleton were instructed to do so first.

This is the eighth lane death in the project. It is the reason `P26-8`'s skeleton-first rule
exists, and the two lanes that had followed it were the two that left something behind.

## Status

**IN PROGRESS.** Counts at last verification: 132 families · 269 models · **104 variants** ·
470 sources. `npm run check` green (0 errors, 5 advisory).
