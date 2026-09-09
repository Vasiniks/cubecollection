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

## P4-3 resolved — the convention question is settled

**Decision: every ASSESSED model carries at least one variant. Zero means NOT ASSESSED.**
Full reasoning in `research/qc/p4-3-variant-semantics.md`; the rule is now binding in
DATA_MODEL §3.5 and RESEARCH_SPEC §4.3.

It was decided on architecture, not preference. `pricing`, `availability`, `rarity`, `colorway`,
`media`, `representation`, `packaging`, `releases` and `smart` are all defined on **variant** and
none on model; a specimen references `variant_id`; and `build.mjs` assembles the public bundle
from variants. **A model with zero variants cannot be priced, photographed, owned or exhibited —
it does not appear in the product at all.**

**56 baselines created**, for exactly the models batch 1 lanes C and D *assessed* and left at
zero (DaYan 20, YJ 19, ShengShou 14, MFJS 3). **The 90 never-assessed models were deliberately
left alone** — a baseline asserts assessment, and creating one for unresearched models would be
a false claim that research happened. Nothing was deleted.

### The four states are now interpretable

| State | Count | Meaning |
|---|---|---|
| zero variants | **90** | **not yet assessed** — and this is exactly batch 2's scope |
| one bare baseline | **99** | assessed, one configuration, nothing differentiated found |
| one evidenced baseline | **27** | assessed, with configuration detail |
| two or more | **53** | multiple documented configurations |

**179 of 269 models assessed.**

## Rules added during Pass 4

| Rule | Catches | Found on real data |
|---|---|---|
| **41** | a lone `--standard` with no `/edition/types` attestation — a placeholder that still counts as coverage | 11, all GAN-pilot (`P4-5`) |
| **42** | two source records of one page, and any attestation citing both as corroboration | 12 (`11` duplicate pairs + 1 citation) |
| **43** | a confidence exceeding what its cited sources' tier supports | 6, now all fixed |

Rule 43's origin is worth keeping: **four of its six findings were introduced by the P4-3
baseline generator itself**, which cited each model's *first* source rather than its *best-tier*
one. A generator can inject that defect in bulk, silently. All four were re-cited to a tier-2
source already present on the record.

## Archive-wide sweeps that came back clean

Negative results, recorded because they are what licenses confidence in the layer:
**zero** tier-5 sources exist and none is cited · **zero** variants redundantly repeat a spec
their model already carries · **zero** variant→model→family chain breaks across all 313 variants ·
**zero** names or aliases shared across different manufacturers · **zero** stale count claims in
canonical record prose.

## Batch 2 — COMPLETE, all four lanes

| Lane | Scope | Models | Variants |
|---|---|---|---|
| **E** | smart & modern (GiiKER, Particula, Rubik's, MoreTry) | 16 | **26** |
| **F** | YuXin, Cyclone Boys, DianSheng | 19 | **31** |
| **G** | shape-mod & historic (WitEden, MF8, Calvin's, Maru, +4) | 20 | **60** |
| **H** | sub-brands & long tail (17 manufacturers) | 35 | **72** |

> **269 of 269 models assessed. Zero unassessed.**
> 132 families · 269 models · **485 variants** · 534 sources · 54 manufacturers.

### The density estimates were wrong in an instructive direction

Lane G was briefed as the **lowest**-density lane and returned the **highest** per model, because
shape-mod makers sell one design in many named configurations — exactly what the variant layer
is for. Lane H's long tail produced 72 variants from manufacturers expected to yield baselines,
because two of them (HuaMeng, LeFun) had leads sitting unchased in their own frozen model
records since Pass 3.

### All four lanes died to session limits; all four were recovered, none restarted

Every worktree was inspected, validated in place, its uncommitted work committed, and the lane
resumed with context intact — **recovering roughly 50 variants and 19 sources** that would
otherwise have been re-researched. Lane H died twice and still finished 35/35.

### Splits verified rather than trusted

Three large splits were checked against their sources before merge, and the answers differed:

- **MF8's eight planets** — legitimate, and *stronger* than the precedent cited: the source says
  *"crazy cuts that vary by each version"*, so the **mechanism** differs per planet.
- **Maru's seven Special Patterns** — defensible, but **not for the reason given**. The lane
  cited the Bermuda precedent (tier-1 manufacturer naming); this is a tier-2 retailer options
  list. They clear the bar on different grounds: individually named, and some *"require
  additional steps to be taken"*.
- **LeFun's fourteen print themes** — legitimate. Each has its own product page, name and price;
  not a dropdown, which is what the GAN356 Air precedent collapses.

**The ZhanLang dedup test was run on HaiTun itself** — the manufacturer that produced this
archive's reference false positive — and reached the *opposite* conclusion on different products:
Waverider V2 Standard and Flagship carry genuinely distinct Cubezz product IDs. The check working
in both directions is what makes it worth running.

## Rules added during Pass 4

| Rule | Catches | Found on real data |
|---|---|---|
| **41** | a lone `--standard` with no `/edition/types` attestation — a placeholder that still counts as coverage | 11, all GAN-pilot (`P4-5`) |
| **42** | two source records of one page, and any attestation citing both as corroboration | 12 (`11` duplicate pairs + 1 citation) |
| **43** | a confidence exceeding what its cited sources' tier supports | 6, now all fixed |

Rule 43's origin is worth keeping: **four of its six findings were introduced by the P4-3
baseline generator itself**, which cited each model's *first* source rather than its *best-tier*
one. A generator can inject that defect in bulk, silently. All four were re-cited to a tier-2
source already present on the record.

## Archive-wide sweeps that came back clean

Negative results, recorded because they are what licenses confidence in the layer:
**zero** tier-5 sources exist and none is cited · **zero** variants redundantly repeat a spec
their model already carries · **zero** variant→model→family chain breaks across all 313 variants ·
**zero** names or aliases shared across different manufacturers · **zero** stale count claims in
canonical record prose.

## Batch 2 — three of four lanes complete

| Lane | Scope | Models | Variants |
|---|---|---|---|
| **E** | smart & modern (GiiKER, Particula, Rubik's, MoreTry) | 16 | **26** |
| **F** | YuXin, Cyclone Boys, DianSheng | 19 | **31** |
| **G** | shape-mod & historic (WitEden, MF8, Calvin's, Maru, +4) | 20 | **60** |
| **H** | sub-brands & long tail | 30 | *running* |

**Lane G inverted its own brief.** Briefed as the lowest-density lane, it returned the highest —
because shape-mod makers sell one design in many named configurations, which is exactly what the
variant layer is for. MF8's Crazy Plus Planet Series splits into eight versions on the source's
own words: *"crazy cuts that vary by each version"* — the **mechanism** differs per planet, a
stronger case than the DaYan Bermuda precedent it cited.

Lane E closed a deferral Passes 2 and 3 had explicitly left open: **seven Rubik's classic
configurations** (Phantom, Crystal, Retro, Re-Cube, Coach Cube, Impossible, standard).

### All three lanes died to a session limit and all three were recovered, not restarted

Each had committed work plus uncommitted findings on disk. Every worktree was validated in place
(green at 0 errors), the in-progress work committed, and the lanes resumed with context intact —
**recovering ~50 variants and 19 sources that would otherwise have been re-researched.**

## Rules added during Pass 4 — each from a defect actually found

| Rule | Catches | Found |
|---|---|---|
| **41** | a lone `--standard` asserting nothing | 11, all GAN-pilot (`P4-5`) |
| **42** | one page recorded twice; citing both as corroboration | 12, then caught a 13th **in new lane output** |
| **43** | confidence exceeding its sources' tier | 6 — **4 written by my own generator** |
| **44** | variant id/path/model_id drift | 0, added pre-emptively before ~90 records landed |
| **45** | a packaged weight stored as a product spec | **16 across 7 manufacturers** |
| **46** | a size named only in prose, resolving to nothing | **12 GuHong variants** |

**Rules 45 and 46 are the ones worth remembering**, because both describe defects that are
invisible to a human reading the record:

- **45** — `cyclone-boys-feijue` stored 213g, quoting its own source as *"Gross Weight: 213g /
  Item Weight: 89.9g"*. It kept the box and discarded the cube. **Rule 18 caught only 2 of the
  16**, because the rest sit comfortably inside its plausible range: *a wrong value inside a
  plausible range is exactly what a bounds check cannot see.* Seven were corrected to the item
  weight their source already stated (senhuan 172→90, feijue 213→89.9 — both nearly double the
  truth); nine had only a gross figure and are now unset with the figure preserved in prose.
- **46** — twelve GuHong Pro variants named "54mm", "55mm", "56mm" with the size living only in
  the id and a free-text designation. Their model correctly sets no size (the line is sold in
  three), so every variant resolved size to **`undefined`** while reading as fully specified.

One attestation had justified its gross weight as *"this archive's established convention."* It
was the opposite of the convention — and that is the more useful finding: **a wrong practice can
propagate by citing itself.**

## Status

**PASS 4 BATCHES 1 AND 2 COMPLETE. Every model assessed.**

| | |
|---|---|
| manufacturers | 54 |
| families | **132 — frozen, unchanged throughout** |
| models | **269 — frozen, unchanged throughout** |
| variants | **485** (104 at Pass 4 start) |
| sources | 534 |
| models assessed | **269 / 269** |
| one configuration | 119 |
| with config detail | 64 |
| multiple configurations | 86 |

`npm run check`: **0 errors, 40 advisory** — 13 rule-42 duplicate pages · 11 rule-41 GAN-pilot
debt (`P4-5`) · 11 rule-18 out-of-range models, now reported once each at the model rather than
per inheriting variant · 4 rule-40 · 1 rule-25. **Rules 43, 44, 45 and 46 all report zero on real
data**, each having been added in response to defects they no longer find.

All invariants verified across 485 variants: every `model_id` resolves, every id matches its path
and model, no duplicate ids anywhere, no dangling attestation sources.

## What remains

Not completeness of research — **completeness of assessment** was the Pass 4 criterion and it is
met. What is open is depth: 119 models rest on a single-configuration baseline, and a later pass
with better evidence may find axes beneath them. That is the honest state, and the audit reports
it every run rather than leaving it to be rediscovered.

Open issues: `P4-2` and `P4-4` (six model-layer gaps found by variant work, escalated not acted
on) · `P4-5` (11 GAN-pilot baselines asserting nothing) · `P4-6` (the E1 tier override reached 9
of 30 Speedsolving sources) · `P26-12`/`P26-15` (Tank/Gem geometry unproven) · `P26-13` closed.
