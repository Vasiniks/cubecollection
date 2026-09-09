# cubecollection

A collector-grade historical archive of 3×3 speedcubes, approximately 2016–2026, built to
become an interactive digital exhibition.

**Status: Pass 4 complete — every model in the inventory assessed. The inventory itself is
known to be incomplete.** The archive holds **54 manufacturers · 132 families · 269 models ·
485 variants · 530 sources**. The manufacturer, family and model layers are frozen; the variant
layer beneath them has been populated for all 269 models.

**The known gap, stated up front rather than buried.** A live-catalogue enumeration of three
retailers on 2026-09-09 found at least twelve manufacturer-branded 3×3 lines with no model in the
frozen 269 — including **MoYu WeiLong V11 and X-Man Tornado V5, the current flagships of two
major manufacturers**, and no QiYi smart cube at all. These were on sale for one to six years
before the model enumeration ran. The evidence is preserved and the issue escalated as `P4-9`;
nothing was added to the frozen taxonomy in response. See
[`research/qc/post-pass4-qc.md`](research/qc/post-pass4-qc.md).

Coverage is tracked honestly rather than optimistically: `npm run audit` reports how many models
have actually been **assessed** for configuration axes, and a model at zero variants means *not
yet researched* — never *researched and empty*. That distinction is the subject of
`research/qc/p4-3-variant-semantics.md`. The same principle applies one level up: "269 of 269
models assessed" is a statement about the inventory, not a claim that the inventory is complete.

## Read in this order

1. **[PRODUCT.md](PRODUCT.md)** — what this is, who it is for, what is in scope
2. **[DATA_MODEL.md](DATA_MODEL.md)** — the schema and the quality-control rules (48 and counting; each was added because a defect got past the previous 47)
3. **[RESEARCH_SPEC.md](RESEARCH_SPEC.md)** — how research is done and what counts as evidence
4. [docs/research-agents.md](docs/research-agents.md) — the agent team and what runs in parallel
5. [docs/implementation-manifest.md](docs/implementation-manifest.md) — every file and why

## The three ideas everything rests on

1. **The atomic record is the variant, not the model.** A model is a design; the objects are
   the configurations that were sold. Materially different variants are never collapsed — and
   equally, a retailer's dropdown of stock colours is one variant, not six. Pass 4 re-derived
   this principle from the schema and reached the same answer the project started with: the
   variant carries pricing, media, rarity and specimen ownership, and the public bundle is built
   from variants, so **a model with no variant cannot be exhibited at all.**
2. **Provenance attaches to individual facts**, as a sidecar keyed by JSON Pointer, so records
   stay readable and every material claim carries its source and confidence.
3. **A source is preserved before it is cited.** The pages this archive depends on are being
   deleted while it is being written.

## Two things this archive refuses to store

- **A current value.** It needs a market-evidence model that does not exist yet, and a
  computed figure sitting beside sourced facts is a guess wearing their clothes.
- **A numeric rarity score.** Rarity is qualitative and argued from documented factors. The
  exhibition may derive an indicator at render time, where the derivation is visible.

Both are enforced, not merely intended.

## Commands

```
npm install
npm run check       # everything
npm run validate    # blocking checks
npm run selftest    # proves the checks themselves still fire
npm run coverage    # the honest measure of what is missing
npm run audit       # archive-wide sweeps: assessment coverage, orphaned sources, provenance
```

`npm run build` emits two bundles: `dist/private/` (everything, never deployed) and
`dist/public/` (no specimens, no private fields, no unresolved-rights imagery). The build does
not produce a public bundle it cannot prove is clean.

MIT licensed.
