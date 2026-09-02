# cubecollection

A collector-grade historical archive of 3×3 speedcubes, approximately 2016–2026, built to
become an interactive digital exhibition.

**Phase A — data architecture — is implemented. No cube data has been collected.** `data/` is
empty by design. Research begins with the GAN pilot.

## Read in this order

1. **[PRODUCT.md](PRODUCT.md)** — what this is, who it is for, what is in scope
2. **[DATA_MODEL.md](DATA_MODEL.md)** — the schema and the 38 quality-control rules
3. **[RESEARCH_SPEC.md](RESEARCH_SPEC.md)** — how research is done and what counts as evidence
4. [docs/research-agents.md](docs/research-agents.md) — the agent team and what runs in parallel
5. [docs/implementation-manifest.md](docs/implementation-manifest.md) — every file and why

## The three ideas everything rests on

1. **The atomic record is the variant, not the model.** A model is a design; the objects are
   the configurations that were sold. Materially different variants are never collapsed.
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
```

`npm run build` emits two bundles: `dist/private/` (everything, never deployed) and
`dist/public/` (no specimens, no private fields, no unresolved-rights imagery). The build does
not produce a public bundle it cannot prove is clean.

MIT licensed.
