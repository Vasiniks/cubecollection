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

## Batch 1 results — all four lanes merged

**Variants 104 → 257.** Families **132** and models **269** unchanged throughout; **no lane
touched a canonical taxonomy file.** Sources 470 → 481.

| Lane | Scope | Models | Variants | Models with variants |
|---|---|---|---|---|
| **A** | MoYu | 23 | **42** | 23 / 23 |
| **B** | QiYi + X-Man | 29 | **50** | 29 / 29 |
| **C** | YJ + MFJS | 33 | **23** | 11 / 33 |
| **D** | DaYan + ShengShou | 46 | **35** | 12 / 46 |
| | **total** | **131** | **150** | |

Archive-wide: **123 of 269 models carry variants**, 146 at zero. `npm run check`: **0 errors,
11 advisory warnings** — the 5-warning baseline plus 6 rule-18 size/weight false positives
(`P4-1`).

## What the lanes refused

The rejections matter as much as the records. Lane A refused TheCubicle's in-house RS3M tuning
tiers (Angstrom, Mystic, Pro Shop, Celeritas, MAX) as aliases of the **`thecubicle` service
manufacturer** rather than MoYu configurations, and refused undeclared batch defects as
`model.revisions[]` territory. Lane B refused a packaging change, a stickered/stickerless split
nobody marketed separately, three magnet-strength tiers, and cosmetic centre-cap slugs. Lane D
refused a stock colour, two gift-box SKUs, a spare-parts SKU, and a stickerless-naming lead
carrying HaiTun/ZhanLang false-positive risk.

Lane D also refused the **ShengShou Crazy "Jelly LE"** — a genuine 1400-unit limited edition —
because which generation it belongs to is unestablished, and left it unrecorded rather than
guessing a parent. That is the correct call, and it exposed a schema gap: there is no affordance
for a variant whose parent is honestly undetermined.

## Two defects this batch found

**Rule 15 forced denormalisation** (fixed, `a7ffb12`). A consequence of the P26-13 change: rule
15 read `scope_justification` and `legality` directly off the record, so all twelve DaYan Bermuda
variants restated their model's entire argument, each with a note saying the validator required
it. Rule 15 now resolves through the parent model, the twelve are stripped back, and fixtures
guard both directions — inheritance must not become an excuse for absence.

**Rule 18 fires late and wide** (`P4-1`). It checks variants only, resolving size and weight from
the parent, so an out-of-range model is invisible until a variant exists beneath it. Eight models
sit outside the window legitimately, from a 15mm `maru-nano` to a 70mm `shengshou-legend-big`.
Both affected lanes were warned mid-flight **not** to dodge it by denormalising a size onto a
variant, and neither did.

## The open convention question — `P4-3`, blocking batch 2

The lanes split on the same brief. **A and B gave every model at least one variant**, so a
single-configuration model carries a bare `--standard`. **C and D left most models at zero.**
Both are defensible: the GAN pilot supports A/B (all 40 GAN models carry one, and
`gan-354-m--standard` is that exact shape), while the Pass 4 brief supports C/D ("a model with
zero variants is a complete correct result").

69 lone `--standard` records now exist, 23 of them predating Pass 4. **"Models at zero" is
therefore not comparable across manufacturers**, and any coverage metric built on it misleads
until this is settled. It should be decided before batch 2, and reconciled either way — not
normalised silently, because it is a real curatorial choice about whether the variant layer
represents *configurations* or *configuration differences*.

## Escalations to the model layer — `P4-2`, `P4-4`

Three model-layer gaps surfaced from variant work in one batch: four QiYi retailer slugs with no
frozen model, **YJ MGC Sigma** (an explicit mechanism-change statement, no model), and the
**MFJS Mini series** (documented as five sizes, three exist, two further SKUs found). All were
escalated, none acted on — a variant pass has no authority over the model layer.

## Remaining — batch 2

~90 models: YuXin 8, DianSheng 6, WitEden 6, Cyclone Boys 5, MoreTry 5, Rubik's 5, FangShi 4,
Maru 4, and the long tail. **Blocked on the `P4-3` convention decision.**

## Status

**BATCH 1 COMPLETE.** 132 families · 269 models · **257 variants** · 481 sources ·
54 manufacturers. All variant `model_id` references resolve, no duplicate ids, no dangling
attestation sources.
