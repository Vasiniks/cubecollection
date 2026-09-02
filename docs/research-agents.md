# The research agent team

Seven Claude Code subagents in `.claude/agents/`. Each starts cold, so each one reads
`PRODUCT.md`, `DATA_MODEL.md`, and `RESEARCH_SPEC.md` before doing anything, and each carries
the full non-negotiable rules rather than a reference to them.

Invoke one by name, or let Claude Code delegate from the `description` field.

## Roster

| Agent | Pass | Purpose | Can edit records |
|---|---|---|---|
| `manufacturer-researcher` | 1 | Enumerates manufacturers, sub-brands, and aftermarket services; establishes official and historical sources | yes |
| `model-researcher` | 2–3 | Enumerates families, generations, revisions, and lineage; applies the model/variant boundary | yes |
| `variant-researcher` | 4 | Identifies materially distinct variants and editions across coatings, magnets, cores, MagLev, smart versions, colourways, limited editions, collaborations, and retailer modifications | yes |
| `pricing-researcher` | 5–6 | MSRP, historical and current retail, sold and auction prices, purchase evidence; preserves original currencies | **no** — proposes sidecars |
| `media-researcher` | 8 | Imagery per variant, prioritising internal, core, mechanism, exploded, and packaging views; records provenance and rights | **no** — proposes sidecars |
| `source-auditor` | 5–9 | Verifies tiers, independence, preservation, and conflicting claims; detects copied retailer spec tables | **no** — reports only |
| `research-qc` | 9 | Audits for missing fields, unsupported claims, duplicate identities, wrong variant boundaries, unresolved conflicts, schema violations | **no** — reports only |

The last four have **no `Edit` tool**. That is the enforcement, not the etiquette: an auditor
that can quietly fix what it finds is not an auditor, and a plausible correction applied
without evidence is indistinguishable from a fabricated fact once it carries an attestation.

## Write lanes

One writer per path. This is what makes parallelism safe.

| Path | Owner |
|---|---|
| `data/manufacturers/` | `manufacturer-researcher` |
| `data/families/`, `data/models/` | `model-researcher` |
| `data/variants/` | `variant-researcher` |
| `research/pricing/` | `pricing-researcher` |
| `research/media/` | `media-researcher` |
| `research/audits/` | `source-auditor` |
| `research/qc/` | `research-qc` |
| `research/notes/<domain>/` | the agent for that domain |
| `assets/images/` | `media-researcher` |
| `data/sources/` | **shared**, create-if-absent, never overwrite |
| `schema/`, `vocab/`, `scripts/`, `dist/`, root documents | **nobody** — humans only |

`data/sources/` is the one shared lane, and it is shared by necessity: a source cited by three
agents should exist once. The protocol is check-then-create, one file per source id, never
overwrite a file you did not create this session. Two agents creating near-duplicate source
records is a merge for a human, caught by `check-duplicates.mjs` — not a lost edit.

## What runs in parallel

**Across manufacturers, almost everything.** The archive partitions cleanly by brand: GAN's
families, models, and variants touch none of another manufacturer's files. Once the pilot has
validated the schema, running one full pipeline per manufacturer in parallel is the natural
shape of the work.

**Within one manufacturer, after the variant tree exists:**

- `pricing-researcher` and `media-researcher` — different sidecar directories, no overlap
- `source-auditor` — read-only over records
- `research-qc` — read-only over records
- Any number of `variant-researcher` instances working on **different models**, since each
  writes into its own `data/variants/<manufacturer>/<model-id>/` directory

**Always safe:** every read-only agent, at any time, alongside anything.

## What must stay sequential

Four dependencies are real, and three of them are human gates rather than technical locks.

1. **Manufacturers before families.** A family record needs `manufacturer_id` to resolve;
   rule 2 blocks a dangling reference.
2. **Families before models, models before variants.** Same reason, and the same rule.
3. **Variant enumeration before pricing and media.** Both write sidecars keyed by
   `variant_id`. A sidecar for a variant nobody has enumerated has nothing to attach to.
4. **Enumeration before filling, inside pass 4.** Create every variant as a stub first. Seeing
   the whole variant tree before spending effort on any one variant is the point of the pass;
   filling as you go hides the shape of what is missing until the end.

Two human review gates suspend all downstream work by design, not by tooling:

- **After pass 2**, before models open. A missed family is a systematically missing region of
  the archive, and nothing downstream reveals it.
- **After pass 4**, before filling. A wrong variant boundary propagates into every field,
  price, and image attached to it.

And one sequencing rule that is not about files at all: **the GAN pilot completes and is
audited before any second manufacturer starts.** Scaling before that audit is how a schema
flaw gets replicated across ten thousand records instead of ten.

## The folding step

Pricing and media sidecars are proposals. A human folds one into its variant record and runs
`npm run validate`. Sidecars are deliberately not schema-validated on their own — that is the
reason a human is in the loop rather than a script.

## Before any agent runs

```
npm run selftest    # proves the checks still fire
npm run validate    # proves the tree is clean to start from
```

And after: `npm run check` runs the whole toolchain.
