# P4-3 — what a variant means, and when a model may have none

**Decided:** 2026-09-09 · **Baseline:** `b291185` · **Status: BINDING for Pass 4 and after**
**Decision: OPTION A — every *assessed* model carries at least one variant.**

---

## The question

Pass 4 batch 1 ran four lanes on one brief and got two incompatible answers. Lanes A and B gave
every model at least one variant, so a single-configuration model carries a bare `--standard`
record (MoYu 23/23, QiYi 24/24, X-Man 5/5). Lanes C and D left most models at zero (YJ 4/23,
DaYan 8/28, ShengShou 4/18).

Both readings were defensible from the brief, which is why this needed deciding rather than
correcting. The consequence was that **"models at zero" meant different things in different
manufacturers**, so any coverage metric built on it was meaningless.

## The decision, and why it is architectural rather than stylistic

**Every model that has been assessed carries at least one variant.**

This is not a preference. It follows from where the archive actually stores things:

| Field | on `model` | on `variant` |
|---|---|---|
| `pricing` · `availability` · `rarity` | ✗ | **✓** |
| `colorway` · `media` · `representation` | ✗ | **✓** |
| `packaging` · `releases` · `smart` | ✗ | **✓** |
| specimen ownership (`specimen.variant_id`) | ✗ | **✓** |
| appears in the public bundle | ✗ | **✓** |

`schema/model.schema.json` carries **none** of those. `scripts/build.mjs` builds the public
bundle and the chronology index from `publicVariants`. A specimen references `variant_id`.

> **A model with zero variants can never be priced, photographed, dated by region, owned as a
> specimen, or displayed. It does not appear in the exhibition at all.**

For a project whose stated purpose is a collector-grade historical database and interactive 3D
exhibition, a model that cannot be exhibited is a hole in the product, not a tidy archive. That
settles it: the variant is the atomic record (DATA_MODEL §3.5), and every model needs one.

## What a baseline variant asserts — and what it does not

This is the distinction that must not blur.

A `--standard` variant asserts:

> **"This model was assessed. Its regular retail configuration is recorded here, and no
> differentiated configuration was established."**

It does **not** assert that a product marketed under the name "Standard" was sold. `edition.types:
[standard]` means "the regular retail configuration" (`vocab/edition-types.yml`), which is true by
construction for any model the archive admits — a model exists in this archive because it was
sold, and a thing that was sold has a regular retail configuration.

**The baseline is therefore not a fabricated product.** It is the model's own sold configuration,
recorded at the layer that can hold pricing, media and specimens.

## Three states, and they must stay distinguishable

| State | Meaning | Machine test |
|---|---|---|
| **zero variants** | **NOT YET ASSESSED.** No claim is made. | no variant references the model |
| **one bare baseline** | Assessed; one configuration; nothing differentiated found | exactly one variant, id ends `--standard`, no `edition.name` or `edition.designation` |
| **one evidenced baseline** | Assessed; one configuration, with documented detail | one `--standard` carrying `config` or `colorway` evidence |
| **two or more** | Assessed; multiple documented configurations | — |

**Zero never means "genuinely single-configuration" under this policy.** That state is now
expressed by a baseline. Zero means only *not yet researched*, which makes the coverage metric
interpretable for the first time.

Every baseline **must** carry an attestation on `/edition/types` whose note records **what
differentiation search was performed**. That attestation is the assessment claim, and it is what
separates a baseline from a placeholder. A baseline without it is a placeholder and is a defect.

## The GAN pilot is preserved, and was right

GAN's 23 lone `--standard` records are **not** placeholders and are not disturbed. They carry
real content — `gan-354-m--standard` records `config.size_mm: 54` with its attestation;
`gan-356-air--standard` records the stickerless colourway and documents in its own note that the
retailer's Black/White/Primary options collapse into this one record rather than exploding into
three. That note is the anti-explosion precedent the whole pass inherits.

The pilot established the convention. This decision ratifies it rather than reversing it.

## Normalisation applied

**56 baseline variants created** — for the models batch 1 lanes C and D *assessed* and left at
zero (DaYan 20, YJ 19, ShengShou 14, MFJS 3). Those models were researched; their zero was a
convention difference, not an absence of assessment.

**90 models left at zero** — never assessed, and they are batch 2's scope. **No baseline was
created for them**, because a baseline asserts assessment and creating one would be a false claim
that research had happened. This is the same discipline the archive applies to `unknown`
(searched and not found) versus an absent field (not searched).

**Nothing was deleted.** The 69 existing lone standards were classified, not mass-removed: all 69
carry either evidence or an assessment attestation, so none was a bare placeholder.

## Binding instruction for future Pass 4 work

1. Assess every model in scope for configuration axes.
2. Where two or more configurations are documented, create a variant for each axis position.
3. Where exactly one configuration is found, create **one** `--standard` baseline carrying an
   `/edition/types` attestation whose note states what was searched.
4. **Never leave an assessed model at zero.** Zero is reserved for not-yet-assessed.
5. **Never create a baseline for a model you did not assess.**
6. Stock colourways collapse into the baseline; only a separately named, separately marketed
   edition earns its own record.
