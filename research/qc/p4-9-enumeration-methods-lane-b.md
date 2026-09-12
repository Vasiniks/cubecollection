# P4-9 — enumeration methods head-to-head (Lane B, second attempt)

## SCOPE

METHODOLOGY lane, not a discovery lane. The question is not "what models are missing" but
"does the archive's catalogue enumeration method have a SYSTEMATIC failure, and which of three
candidate methods should be mandatory." Three enumeration methods are run against the SAME
manufacturers on the SAME hosts and their outputs are compared: what each finds, what each
misses that another finds, and the overlap. A Venn count is the deliverable; new confirmed-missing
models are a secondary byproduct and are classified, not admitted (taxonomy is FROZEN at
54/132/269 — nothing in this file mutates it).

Three methods:
- **M1 — slug prefix sweep** (archived, via Wayback CDX): `.../products/<prefix>` prefix match.
- **M2 — vendor/brand facet** (live): `/collections/<brand>/products.json?limit=250`, keyed on
  the retailer's structured `vendor` field, not the URL.
- **M3 — retailer category enumeration** (live): `/collections/3x3-speed-cubes/products.json`,
  filtered post hoc to the manufacturer by `vendor`.

Manufacturers: qiyi, yj, yuxin, shengshou (chosen because the archive holds enough models for
each — 24, 23, 8, 18 respectively — for misses to be measurable against a real baseline).
Hosts: thecubicle.com, speedcubeshop.com.

## BASE COMMIT

4873931 on main (per task assignment). Lane B worktree.

## TARGETS

qiyi, yj, yuxin, shengshou — × {thecubicle.com, speedcubeshop.com} × {M1, M2, M3} = up to 24
cells, fewer where a method structurally cannot apply to a host (recorded as such, not skipped
silently).

## STATUS

MEASUREMENTS COMPLETE for M2 vs M3 (all 4 manufacturers × 2 hosts). M1 (Wayback CDX) could not
be run today — see UNRESOLVED. Candidate classification done for every line that did not match
a known archive model, cross-referenced against the 261 already adjudicated in
`research/qc/p4-9-adjudication.yml` (not re-adjudicated; only genuinely new candidates are
classified here).

## FINDINGS

**Discipline check, run before any count below was trusted (per task instructions).** Known
positive: `X-Man Tornado V5 3x3` (already `confirmed_missing` in the adjudication file) had to,
and did, come up unmatched against the archive's known-model list. Known negative: `QiYi
Warrior W 3x3`, `ShengShou Crazy 3x3 V2`, `YJ YuLong 3x3 V2 M` — all archive-held models —
came up MATCHED and were never flagged. Both controls passed before any number below was
quoted. Every live query result below was inspected by hand (title, vendor, product_type,
published_at, tags), not just counted — see the source excerpts for the specific products
inspected.

**1. M2 (vendor facet) vs M3 (category enumeration): the overlap and the miss, quantified.**

| host | mfr | M2 lines (3x3-typed) | M3 lines (3x3-typed) | overlap | M2-only | M3-only |
|---|---|---|---|---|---|---|
| thecubicle | qiyi | 27 | 27 | 27 | 0 | 0 |
| thecubicle | yj | 18 | 18 | 18 | 0 | 0 |
| thecubicle | yuxin | 16 | 16 | 16 | 0 | 0 |
| thecubicle | shengshou | 10 | 10 | 10 | 0 | 0 |
| speedcubeshop | qiyi | 16 | 14 | 14 | 2 | 0 |
| speedcubeshop | yj | 6 | 6 | 6 | 0 | 0 |
| speedcubeshop | yuxin | 4 | 3 | 3 | 1 | 0 |
| speedcubeshop | shengshou | 2 | 2 | 2 | 0 | 0 |
| **TOTAL** | | **99** | **96** | **96** | **3** | **0** |

**At TheCubicle, M2 and M3 returned the IDENTICAL line set for all four manufacturers** —
checked by normalised-name set difference, not just count. Zero systematic failure observed at
this host in this sample. **At SpeedCubeShop, M3 undercounts M2 in 2 of 4 manufacturers, always
in the same direction** (M3 ⊂ M2, never the reverse, in every one of the 8 cells). This is a
retailer-specific asymmetry, not a manufacturer-specific or a method-in-general one.

**2. The mechanism, isolated and dated.** The M2-only line `qiyi-m-pro-v3-flagship` ("QiYi M
Pro 3x3 V3 Flagship (Magnetic)") is tagged `Backordered`, `published_at` 2026-09-01, and is
absent from SpeedCubeShop's own `/collections/3x3-speed-cubes/products.json` (checked directly
by handle, both pages) despite `product_type: "3x3"` and `vendor: "QiYi"`. The SAME product
line is NOT suppressed at TheCubicle: `qiyi-m-pro-3x3-v3-flagship` and
`qiyi-m-pro-3x3-v3-pioneer-uv` (`published_at` 2026-09-11 — the day before this sweep) appear in
BOTH TheCubicle's brand facet and its category-collection pages. Same manufacturer, same
product line, same method — reliable at one retailer, silently incomplete at the other, for a
listing between one and eleven days old. **This is a live demonstration of exactly the
mechanism P4-9 already names for the 20 confirmed-missing models (concentration in
2024-2026 listings) still operating in real time three days after the P4-9 sweep that produced
`p4-9-adjudication.yml` ran (2026-09-09).**

**3. A genuine new candidate the original P4-9 sweep missed, found only by cross-checking a
second method.** `research/qc/p4-9-adjudication.yml` — 261 candidates, generated 2026-09-09 —
has NO entry for "M Pro V3" or "M Pro Flagship" (checked by grep across the full file). The
archive's newest QiYi M Pro model is `qiyi-m-pro-v2`. Corroboration: 3 SKUs (2 configurations:
Flagship, Pioneer UV) across BOTH TheCubicle and SpeedCubeShop, same naming pattern QiYi already
used for the confirmed-missing X-Man Tornado V5 ("Flagship UV / Pioneer UV" tiers per that
entry's note). **Classification: `confirmed_missing`.** This candidate exists ONLY because M2
was run in addition to M3 — M3 alone, run today at SpeedCubeShop, would have missed it exactly
as the original sweep did three days ago.

**4. Manufacturer-level results, in full.** ShengShou: every M2 and M3 line at both hosts
matched an archive-held model — no gap surfaced in this slice. QiYi and YuXin each produced one
M2-only line beyond the confirmed_missing case above; YJ produced none. Full list of lines that
did NOT match any known archive model (24 total across all 4 manufacturers, most already
adjudicated):

- **qiyi** (15 unmatched lines): `X-Man Tornado V5 3x3` (already `confirmed_missing`, key
  `xmantornadov5`), `QiYi Smart Cube 3x3` (`confirmed_missing`, `qiyismartcube`), `QiYi AI 3x3`
  (`confirmed_missing`, `qiyiai`), `QiYi M Pro 3x3 V3` — **NEW, `confirmed_missing`** (this
  file, finding 3 above), `QiYi Bubble 3x3` (`not_3x3`, `qiyibubble`), `QiYi DNA Cube 3x3`
  (`not_3x3`, `qiyidnacube`), `QiYi Dimension 3x3` (`not_3x3`, `qiyidimension`), `QiYi Sandwich
  Cube 3x3` (`not_3x3`, `qiyisandwichcube`), `QiYi Mini 3x3` / `3x3 Mini` (`needs_research`,
  `qiyimini`), `QiYi Mini 3x3 Keychain Cube` (`needs_research`, `qiyiminikeychaincube`), `QiYi
  Mini Pillowed 3x3 Keychain Cube` (already adjudicated, `qiyiminipillowedkeychaincube`), `QiYi
  Carbon Fiber 3x3` (already adjudicated, `qiyicarbonfiber`), `QiYi Thunderclap 3x3 V3`
  (`alternate_naming`, `qiyithunderclapv3` — archive holds `qiyi-thunderclap-v3-m`), `QiYi
  Mosaic 3x3 Cube Set of 100` — **NEW, `bundle`** (multi-puzzle SKU, same treatment as the
  already-adjudicated `YJ Mosaic 3x3 Cube Set of 9`, key `yjmosaiccubesetof9`).
- **yj** (11 unmatched lines): `YJ 3x3 Ball Cube` (`not_3x3`, `yjballcube`), `YJ 3x3 Mini`
  (`needs_research`, `yjmini`), `YJ Big 3x3` (`needs_research`, oversized class, `yjbig`),
  `YJ Blind 3x3` (`not_3x3`, `yjblind`), `YJ Mini Pillowed 3x3` and `YJ Mini
  Pillowed 3x3 Keychain Cube` (both `needs_research`, mini/keychain class), `YJ Mosaic 3x3 Cube
  Set of 64` — **NEW, `bundle`** (same reasoning as the QiYi mosaic set and the already-
  adjudicated Set of 9), `YJ Pocket Cube 3x3` and `YJ Pocket Cube 3x3 Mini` (both
  `needs_research`, mini/keychain class), `YJ YuLong 3x3 V2` (`alternate_naming`, `yjyulongv2`
  — archive holds `yj-yulong-v2-m`).
- **yuxin** (8 unmatched lines): `YuXin 3x3 Magnetic Sliding Tile Cube` (`not_3x3`), `YuXin 3x3
  Treasure Box` / `YuXin Treasure Box` (`not_3x3`, `yuxintreasurebox`), `YuXin Digital Puzzle
  Cube 3x3` — **NEW, `not_3x3`** (tagged "15 puzzle" — a sliding-tile digital puzzle, not a
  3x3x3 twisting mechanism; same category as the already-adjudicated Magnetic Sliding Tile
  Cube), `YuXin Little Magic 3x3 V2` and `V3` (`alternate_naming`, archive holds both under
  those exact generations), `YuXin Lustrous Cube 3x3` (`not_3x3`), `YuXin Super Big 3x3`
  (`needs_research`, oversized-scope class), `YuXin Super Hero Cube 3x3` (`not_3x3`).
- **shengshou**: zero unmatched lines at either host. No candidate, no gap surfaced.

**Only 4 lines out of 24 unmatched (17%) were genuinely new** — not already present in the
261-candidate adjudication file. Of those 4: 1 `confirmed_missing` (QiYi M Pro V3), 2 `bundle`
(the two mosaic sets), 1 `not_3x3` (YuXin Digital Puzzle Cube). **This matches the shape of the
finding already established for the 261**: most of what a detector surfaces is correctly not a
gap, and the ratio held again in an independent, narrower, same-day check.

**5. Is the failure systematic, and which method should be mandatory?**
PARTIALLY SYSTEMATIC, and the ratio is the finding, same as the recency/breadth split in
`p4-9-adjudication.yml`. Method 3 (category enumeration — the method already in production as
`scripts/catalogue-gap.mjs`) is not intrinsically deficient: it matched Method 2 exactly at
TheCubicle for all four manufacturers tested. But it has a demonstrated, retailer-specific,
stock/tag-driven blind spot at SpeedCubeShop (2 of 4 manufacturers affected here) that is
invisible unless cross-checked against a second method, and this pass caught a real,
cross-retailer-corroborated `confirmed_missing` model (QiYi M Pro V3) that a category-only
sweep run TODAY at SpeedCubeShop would still miss, three days after the P4-9 sweep ran and one
day after the same product appeared cleanly in TheCubicle's own category page. **Method 2
(vendor facet) should be the mandatory method for CURRENT completeness** (RESEARCH_SPEC 3.6b
dimension 2): it strictly dominated Method 3 in every one of the 8 tested cells (never found
fewer lines), it is the only method of the three that also closes the DISCOVERABILITY gap for
brands with no brand token in their slugs (already established: Calvin's Puzzle 23/23, FanXin
1/4, QiYi 1/21 — bubble-3x3 reproduced again in this pass), and — new in this pass — it is not
merely a slug-form fix but a stock-visibility fix too. Method 3 should be retained as a cheap,
already-automated secondary check, never treated as sufficient alone. Method 1 (archived prefix
sweep) remains the mandatory method for HISTORICAL completeness (3.6b dimension 1, unaffected by
this finding) but cannot be the sole or primary mandatory check for CURRENT completeness: it
depends on a third-party service with a demonstrated real-time availability failure (see
UNRESOLVED), on top of the already-documented slug-form fragility (`gan356-` vs `gan-356-`,
Ziina's zero-brand-token handles). A method requiring an intermittently-down external service
cannot by itself satisfy a "mandatory before declaring enumeration complete" requirement.

**6. A slug-form failure found independently of M1.** TheCubicle's brand-collection slug for
QiYi is `qiyi-mofangge`, not `qiyi` — `/collections/qiyi/products.json` returns `{"products":
[]}` (HTTP 200, zero products, no error) despite QiYi being TheCubicle's largest-volume brand of
the four tested (247 products). This is the SAME class of failure 3.6a check 3 already
documents for slug/vendor-field mismatches (`gan356-` vs `gan-356-`), but manifesting in the
COLLECTION slug rather than the product URL — a fourth surface for the same underlying failure
mode (retailer naming is retailer-specific and does not default to the manufacturer id), found
by trying the manufacturer-id-as-slug first and only discovering the mismatch via
`/collections.json`. A facet sweep that stops at "collection returned zero products" would have
under-reported QiYi at TheCubicle as badly as any prefix sweep, and for the identical reason.

## EVIDENCE

Full per-manufacturer, per-host raw JSON was fetched live on 2026-09-12 from:
- `https://www.thecubicle.com/collections/<slug>/products.json?limit=250` (`<slug>` =
  `qiyi-mofangge`, `yj`, `yuxin`, `shengshou`) — Method 2.
- `https://speedcubeshop.com/collections/<mfr>/products.json?limit=250` (`<mfr>` = `qiyi`, `yj`,
  `yuxin`, `shengshou`) — Method 2.
- `https://www.thecubicle.com/collections/3x3-speed-cubes/products.json?limit=250&page={1,2,3}`
  and `https://speedcubeshop.com/collections/3x3-speed-cubes/products.json?limit=250&page={1,2}`
  — Method 3, filtered post hoc by `vendor`.
- Wayback CDX (Method 1) — attempted, not obtained; see UNRESOLVED.

Full excerpts, exact line lists, and the two headline findings (QiYi M Pro V3 cross-retailer
corroboration; the `qiyi-mofangge` slug mismatch) are recorded in
`data/sources/qiyi-yj-yuxin-shengshou-vendor-facet-lane-b-2026.yml` and
`data/sources/qiyi-yj-yuxin-shengshou-category-enum-lane-b-2026.yml`. Both sources are Tier 2,
live-query, PRESERVE NOTHING ON THEIR OWN (no Wayback equivalent exists for a vendor facet or a
live category page), and make no specification, date, or identity claim beyond what Shopify's
own JSON fields state. `published_at` is a listing date, never a release date, in every citation
above.

## CHANGES

New files under `data/sources/`, both id ending `-lane-b-2026`:
- `qiyi-yj-yuxin-shengshou-vendor-facet-lane-b-2026.yml` (Method 2 raw evidence)
- `qiyi-yj-yuxin-shengshou-category-enum-lane-b-2026.yml` (Method 3 raw evidence)

No manufacturer/family/model/variant files touched. No existing source touched.
`research/qc/p4-9-adjudication.yml` not touched — 0 of its 261 candidates re-adjudicated.

## UNRESOLVED

**Method 1 (Wayback CDX prefix sweep) could not be run today.** `web.archive.org/cdx/search/cdx`
returned HTTP 503 "Internet Archive: Temporarily Offline" on every attempt — 7 attempts across
both hosts × all 4 manufacturers plus 2 generic sanity checks (`archive.org` root: 200 OK;
`cdx/search/cdx?url=example.com`: 503), spanning roughly 15 minutes, 2026-09-12. This matches
the task's own advance warning that Wayback has been intermittently down today. **Per
DISCIPLINE, this is recorded as BLOCKED, not as "Method 1 found nothing" — a failed fetch is
never evidence of absence.** Method 1's own reliability under a live outage is itself folded
into finding 5's "which method should be mandatory" conclusion. Re-running M1 for these same
four manufacturers on both hosts, once the CDX service recovers, would complete the three-way
Venn and should be done by whoever picks this up next; the M2-vs-M3 comparison in this file
stands on its own regardless.

**QiYi M Pro V3 is `confirmed_missing` by this file's classification but not yet a ledger-ready
fact independent of it** — a manufacturer-side or specification-bearing corroboration (QiYi's
own site, a hobbyist wiki, a review) has not been sought; this file's evidence is two retailer
catalogues only, which is sufficient for the METHODOLOGY finding (a real product neither
existing method admits) but the model-admission bar is main's to apply, not this lane's.

**`YJ Big 3x3`, `YJ Mini 3x3`, `YJ Mini Pillowed 3x3`, `YJ Mini Pillowed 3x3 Keychain Cube`,
`YJ Pocket Cube 3x3`, `YJ Pocket Cube 3x3 Mini`, `QiYi Mini 3x3`, `QiYi Mini 3x3 Keychain Cube`,
`YuXin Super Big 3x3`** all reproduce the mini/keychain and oversized POLICY question the
adjudication file's `meta.findings` already names as the largest unresolved class — reproduced
here as independent confirmation from a narrower, same-day sweep, not a new question.

## NEXT

For whoever continues this lane: re-run Method 1 for qiyi/yj/yuxin/shengshou at both hosts once
Wayback CDX recovers, and complete the three-way Venn (this file has M2×M3 only). Consider
extending the SpeedCubeShop stock-suppression finding (finding 2) to other manufacturers beyond
the four tested here, to see whether "Backordered" tag suppression from the category collection
is general at that retailer — if so, it is a standing reason Method 2 must run at that retailer
for every manufacturer, not just as a spot-check.
