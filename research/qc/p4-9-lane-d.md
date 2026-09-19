# P4-9 — Lane D: three refused alias candidates, and a test for a fifth mechanism

Lane D. Base commit 460e9df on main. Worktree `agent-a40317071cc636e67`.

## SCOPE

Two tasks, per assignment:

1. Settle the three alias candidates `research/qc/p4-9-alias-blindness-2026-09-12.md` refused
   (`yuxin-little-magic-v2`, `yuxin-little-magic-v3`, `yj-yulong-v2-m`) — each an M-vs-non-M
   ambiguity, because YuXin and YJ both sold magnetic and non-magnetic lines and the missing "M"
   token might denote a genuinely different product rather than a word-order alias.
2. Run `npm run catalogue-gap -- --fetch`, pick the most credible current-generation candidates
   (X-Man Tornado V5, MoYu WeiLong V11, MoYu AoLong V5, QiYi M Pro V3 named as starting points),
   classify each by the four known P4-9 mechanisms (recency, discoverability, stock suppression,
   alias blindness), and answer whether any candidate needs a fifth mechanism.

Taxonomy is FROZEN at 54/132/269. This lane may add `aliases:` to existing model records where
Task 1 justifies it (not a taxonomy change, per the HaiTun ZhanLang / P4-15 precedent) and may
record new `data/sources/*.yml`. It touches no family, manufacturer, ledger, or script file.

## TASK 1 — three refused M-vs-non-M candidates, settled

Method: fetch each host's own vendor/brand facet (`/collections/<brand>/products.json?limit=250`)
live, filter to the family's own titles, and read EVERY 3x3 title returned — not a sample — so
the absence of a bare non-magnetic/non-MagLev title is itself the evidence, not an inference from
silence. Two new sources preserve the full filtered enumeration:
`data/sources/speedcubeshop-yj-yuxin-magnet-facet-p4-9-lane-d-2026.yml` and
`data/sources/thecubicle-yj-yuxin-magnet-facet-p4-9-lane-d-2026.yml`. Both collections are under
Shopify's 250-item page limit (63/45/105/99 total products respectively), so no pagination was
needed and no page was skipped.

**Control run before any verdict was trusted.** Both hosts' YuXin facets list the ORIGINAL
Little Magic generation's non-magnetic ("YuXin Little Magic 3x3") and magnetic ("... 3x3 M" /
"... 3x3 (Magnetic)") configurations as two SEPARATE real SKUs. That proves neither storefront
suppresses or renames a bare non-magnetic title where one genuinely exists — so when the SAME
storefronts show no bare, non-magnetic "V2" or non-MagLev "V3" title anywhere in the SAME
collection, that absence is evidence, not a blind spot in the method.

### `yj-yulong-v2-m`
**Verdict: ALIAS (not a distinct product).** SpeedCubeShop's entire "yj" brand facet (63
products) contains exactly 3 SKUs matching "YuLong" at the V2 generation, and all 3 are
explicitly `(Magnetic)`: `yj-yulong-3x3-v2-magnetic-2025-edition`,
`...-magnetic-uv-coated-2025-edition`, `...-magnetic-uv-coated-clicky-2025-edition`. No bare or
non-magnetic "V2" SKU exists. TheCubicle's own facet independently shows the SAME model at the
handle the archive already cites (`yj-yulong-v2-m`, title "YJ YuLong 3x3 V2 M") — its own naming
already matches the archive's "YJ YuLong V2 M" exactly (word order and all) once "3x3" is
dropped as the already-established non-discriminating token. The catalogue-gap candidate
"YJ YuLong 3x3 V2" (no M) traces entirely to the script's own line-splitting regex, which cuts a
title at its first bracket — stripping SpeedCubeShop's "(Magnetic)" — not to a second product.
Alias added: `"YJ YuLong 3x3 V2 (Magnetic)"`, on the reasoning that "(Magnetic)" is
SpeedCubeShop's spelled-out rendering of the "M" the model's own name already carries — no
attribute is added or removed by writing the word in full, unlike the WR M / WRM case (which
added a wholly new token absent from the base name).

### `yuxin-little-magic-v2`
**Verdict: ALIAS (not a distinct product).** Same evidence pattern. SpeedCubeShop's "yuxin"
facet (45 products) has exactly 2 V2-generation 3x3 SKUs, both `(Magnetic)`. TheCubicle's
"yuxin" facet (99 products) has exactly 2 V2-generation 3x3 SKUs, both carrying "M"
(`yuxin-little-magic-3x3-v2-m`, `...-v2-m-uv`) — the FIRST of which is the exact slug this
model's own description already cites via `thecubicle-yuxin-collection-2025`. No bare or
non-magnetic "V2" title exists at either host. Aliases added: `"YuXin Little Magic 3x3 V2 M"`
(TheCubicle's exact current title — a pure word-order swap of the archive's own "M V2", already
partly evidenced by the pre-existing bound source) and `"YuXin Little Magic 3x3 V2 (Magnetic)"`
(SpeedCubeShop's spelled-out form, same reasoning as the YJ case).

### `yuxin-little-magic-v3`
**Verdict: ALIAS (not a distinct product) — the cleanest of the three.** TheCubicle's "yuxin"
facet has exactly 2 V3-generation 3x3 SKUs, both explicitly `(MagLev)` /
`(MagLev + UV)`. No bare "V3" or non-MagLev title exists. The full, untruncated retailer title
"YuXin Little Magic 3x3 V3 (MagLev)" is an EXACT token-multiset match to the model's own name
"YuXin Little Magic V3 MagLev", modulo word order and the "3x3" token — this is a rule-(a) case
in the strictest sense, not a borrowed reasoning. The only reason it ever appeared as a
catalogue-gap miss is that the script's title-splitting regex drops everything from the first
bracket onward, discarding exactly the "(MagLev)" token that makes the match exact. Alias added:
`"YuXin Little Magic 3x3 V3 (MagLev)"`.

### What this does NOT fix
Adding these aliases does not make `npm run catalogue-gap` stop reporting these three lines.
The script's line-grouping key is built by truncating a title at its first bracket (or "M
- dash), and its generation-token guard (`GENERATION` regex + `a.endsWith(gen[1])`) requires a
KNOWN name to end in the exact version suffix the truncated candidate carries. A truncated
candidate ending in bare "v2" or "v3" will never satisfy that guard against a known name ending
in "v2m" or "v3maglev", no matter what alias is added, because the alias itself would also need
to end in the bare suffix to pass — which would mean asserting the model under a name that omits
its own defining magnetic/MagLev designator, exactly the imprecision the admission rule exists to
prevent. This is a script-level interaction between two independently-reasonable pieces of logic
(bracket-truncation + generation-suffix guard) documented here for whoever next touches
`scripts/catalogue-gap.mjs`, but out of this lane's file allow-list to fix. It does not change
the verdicts above: the underlying products are confirmed the same already-held models by direct
enumeration, independent of whether the script can be made to see that automatically.

## TASK 2 — placeholder, to be filled in per candidate tested

- `--fetch` run: PENDING
- Candidates classified: PENDING
- Fifth-mechanism verdict: PENDING

## PROBE RELIABILITY — placeholder

To be measured and reported, not asserted.

## SCOPE NOT FINISHED — placeholder

To be filled in at close.
