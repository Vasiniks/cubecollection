# Leads not acted on — Pass 3, Agent C / Batch 3 (MF8, HuaMeng, ESCube)

Uncited leads only. Nothing here is a source; each is a direction for a future pass to chase
to a citable Tier 1-3 source, per DATA_MODEL §5.2 rule 5 ("a lead is not a source").

## MF8 Legend "V1"

`thecubicle-mf8-legend-v2`'s captured page carries one customer review (Tier 5, inadmissible):

> "Much much better than the V1, my V1 died when I tried to lube/tension it, the ball core
> stripped. This one is a nice upgrade."

This independently suggests (a) an unsuffixed "MF8 Legend" was sold before "V2", corroborating
the Speedsolving wiki's Tier-4 "MF8 Legend 3x3x3" (2011) entry, and (b) it used a ball core
that could strip under tensioning. Neither fact is cited anywhere in this batch's model
records. Searched this pass and found nothing better: TheCubicle `/products/mf8-leg*` prefix
sweep (only `mf8-legend-v2` captured), SpeedCubeShop `/products/mf8-legend*` prefix sweep (no
captures), Cubelelo `/products/mf8*` prefix sweep (Dino Cube, Petaminx, Teraminx only — no
Legend of any generation). A dedicated web search for "MF8 Legend" reviews was not possible
this session (WebSearch budget was exhausted mid-batch). **Next step: retry a general web
search for "MF8 Legend 3x3" once budget resets, and/or a targeted CubeZZ or 666toy.com sweep**
(CubeZZ's `/goods.php?id=NNNN` URL scheme could not be enumerated by prefix this pass — see
below).

## CubeZZ URL structure — a dead end this pass, not evidence of absence

`cubezz.com`'s product URLs do not follow a discoverable `/goods-<slug>.html` or
`/products/<slug>` prefix pattern; a prefix sweep on `cubezz.com/goods` returned only
AJAX price-check URLs (`goods.php?act=price&id=NNNN&...`), and a guessed
`cubezz.com/goods-` prefix returned no captures. This is a **failed discovery attempt**, not a
finding that CubeZZ carries none of MF8/HuaMeng/ESCube's products — per RESEARCH_SPEC §3.6a,
"limit-truncated `prefix` output" and failed guesses are never evidence of absence. A future
pass with more budget should find CubeZZ's actual numeric-id product-page URL scheme (e.g. via
its sitemap or category-listing pages) before concluding anything about its catalogue.

## SpeedCubeShop "ES3 Air" vs TheCubicle "ESCube Air" — see the escalation in escube-air.yml

Recorded formally as an escalation in `data/models/escube/escube-air.yml`'s header comment and
description, not repeated in full here. Short version: SpeedCubeShop's product naming treats
"Air" as an edition of the "ES3" line; TheCubicle's treats "Air" as its own ESCube-branded
line. This is evidence in tension with the frozen `escube-air` / `escube-es3` family split.

## HuaMeng / MoYu pairing — pre-existing lead, not re-opened

`huameng-ys3m`'s TheCubicle description opens "The MoYu HuaMeng YS3M is...". This was already
flagged as an unresolved lead at the family level (`data/families/huameng-ys3m.yml`) before
this pass began, and by explicit batch instruction is **not** re-litigated here: it remains a
lead for manufacturer-relationship research (Pass 1 territory), not a Pass 3 model-boundary
question.

## Non-US/English retailer check performed this pass (RESEARCH_SPEC §3.6a)

Checked: **Cubelelo** (India). `/products/mf8*` prefix sweep: 4 hits, none a 3x3 (Dino Cube,
Petaminx x2, Teraminx — all shape mods outside this batch's families). `/products/huameng*`
and `/products/escube*` prefix sweeps: no captures. Recorded as "swept, nothing new found" for
all three brands per §3.6a's explicit instruction to record the outcome either way.

## Retailer `/products/` prefix sweeps performed this pass (RESEARCH_SPEC §3.6a)

- `thecubicle.com/products/mf8*`, `/mf8-crazy-3x3*`, `/mf8-crazy-2x2*`, `/mf8-leg*` — confirms
  the family's existing four sources are the complete TheCubicle-side picture for 3x3-relevant
  MF8 products (everything else under `/mf8-crazy-*` is a 2x2, pentahedron, octahedron, or
  other non-3x3 shape mod, out of this archive's scope).
- `thecubicle.com/products/huameng*` (53 URLs, one CDX call, not limit-truncated) — full
  picture, see huameng-tg.yml / huameng-tg-v2.yml / huameng-ys3m.yml descriptions.
- `speedcubeshop.com/products/mf8*`, `/mf8-crazy-3x3*` — confirms per-planet and bundle SKUs
  for the "Plus Planet Series" generation (see mf8-crazy-3x3-plus-planet-series.yml).
- `thecubicle.com/products/escube*`, `speedcubeshop.com/products/es3*`,
  `speedcubeshop.com/products/escube*` — see escube-es3.yml / escube-air.yml.

## Wayback/CDX reliability this session

`web.archive.org`'s CDX endpoint returned intermittent `fetch failed` errors throughout this
session (transient connection failures, not timeouts) roughly 40-50% of the time; every
genuinely failed call was retried until it succeeded or a `no captures` / real result was
returned. No absence conclusion in this batch's records rests on an unretried failed call.
