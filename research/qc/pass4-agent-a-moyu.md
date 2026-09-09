# Pass 4 (variants) — Agent A, MoYu lane

**Scope:** 23 frozen MoYu models across 9 families (`moyu-weilong`, `moyu-rs3m`, `moyu-aolong`,
`moyu-huanying`, `moyu-tanglong`, `moyu-hualong`, `moyu-liying`, `moyu-dianma`, `moyu-ai`). No
family or model is created, renamed, merged, split, or re-parented in this pass. Write lane:
`data/variants/moyu/**`, `data/sources/*.yml` (create-if-absent), and this report.

**Status: IN PROGRESS.** This is a skeleton committed before research begins, per the
skeleton-first rule (this lane has already been killed once by a rate limit before any
research was recorded).

findings-so-far: none yet

## Method

Starting from the pass-3 MoYu report (`research/qc/pass3-agent-a-moyu.md`), which recorded
explicit "lead for pass 4" notes inside several model records' `description` fields. Working
through each of the 23 models in turn, checking:

1. The model's own `description` for recorded variant leads (magnet/coating/core/maglev
   configurations, named editions, smart siblings).
2. `speedsolving-wiki-moyu`, `thecubicle-com-moyu-3x3-collection-2021`, and
   `thecubicle-us-moyu-early-3x3-lines` (already in `data/sources/`) for corroboration.
3. Whether any further primary/retailer evidence needs discovery (manufacturer site sweeps,
   archived retailer prefixes, non-US/English retailers) per RESEARCH_SPEC §3.6a.

Applying the anti-explosion rules throughout: stock colourway collapses to one `standard`
variant; a retailer SKU alone is not a variant; the axis (not every retailer's representation
of it) is what gets recorded.

## Models assessed so far

(none yet — skeleton only)

## Machine-readable summary (placeholder, updated as work proceeds)

```yaml
models_assessed: []
variants_created: []
models_at_zero: []
candidates_rejected: []
escalations: []
```
