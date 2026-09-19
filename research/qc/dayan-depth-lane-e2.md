# DaYan depth — Lane E2 (second attempt, wider/deeper sweep)

## SCOPE
DaYan only. Variant-depth research on the 16 single-configuration DaYan models that the prior
lane (`research/qc/dayan-depth-lane-e.md`) already swept clean across TheCubicle, SpeedCubeShop
and Cubelelo (CDX prefix history + live vendor facet). This lane does **not** repeat that method
against those same three hosts. Instead it goes deeper/wider per the mandate: Chinese-language
sources, cubezz/lightake/51morefun and other non-US retailers, the Speedsolving wiki (already
cited for existence/dates on most of these — checked here specifically for *configuration*
detail, not just existence), first-party DaYan material (dayancube.com, historical captures,
Taobao/Weibo if reachable), and archived captures from the 2010s contemporaneous with these
products.

No family, manufacturer, or model record is touched. No non-DaYan record is touched. Only:
new variant files under existing `data/variants/dayan/<model-id>/`, new source files under
`data/sources/`, and attestation additions to existing DaYan variant files.

### The 16 targets (all single-configuration, `--standard` baseline only)
dayan-bermuda-column, dayan-bermuda-house-i, dayan-bermuda-house-ii, dayan-bermuda-star,
dayan-guhong-v3-m, dayan-guhong-v4-m, dayan-lingyun-v1, dayan-lunhui-2017, dayan-taiyan-v1,
dayan-tengyun-m, dayan-tengyun-v2-m, dayan-tengyun-v3-m, dayan-xiangyun-v1, dayan-zhanchi-2017,
dayan-zhanchi-2018, dayan-zhanchi-pro-m.

Confirmed by directory listing at base commit: these 16 model directories hold exactly one
variant file (`standard.yml`); the other 12 DaYan models already carry 2-8 variant files
(DIY-kit/assembled splits on guhong-v1, guhong-v2, zhanchi-v1/42mm/50mm, panshi-v1, lingyun-v2,
lunhui-v1; multi-tier splits on guhong-pro-m, guhong-pro-plus, zhanchi-v5-m; bermuda-triangle's
8 colourway-adjacent files) and are out of scope for this pass.

## WHAT THE PRIOR LANE ALREADY COVERED (do not repeat)
Per `dayan-depth-lane-e.md`: full CDX prefix sweep of thecubicle.com/products/dayan* (351 URLs,
2018-2026), per-family CDX for taiyan/xiangyun/lingyun/lunhui/panshi/zhanchi, the
`/collections/dayan` collection-page CDX, two independent Cubelelo CDX prefix sweeps
(2020-2026), and a live Shopify vendor-facet check of thecubicle.com (68 SKUs), speedcubeshop.com
(16 SKUs), and cubelelo.com (`dayan-speed-cubes` handle, 5 SKUs) run 2026-09-12. Net result:
zero second configurations found for any of the 16 targets across all three hosts by both
historical and live-facet methods. Also on record: a P4-9 model-candidate (DaYan Void Cube,
Limited Edition) reported but not admitted, out of scope for this lane too (taxonomy frozen).

## METHOD
For each of the 16 targets, in order:
1. Speedsolving wiki entry — re-read specifically for configuration language (size options,
   magnetic/non-magnetic choice, DIY vs assembled, coating, colourway count) rather than just
   existence/date, since the prior lane cited the wiki only for dates.
2. cubezz.com, lightake.com, 51morefun.com — direct site search / product page for the model.
3. Wayback CDX prefix sweep of any of the above three that returns a live hit, to catch
   discontinued-generation listings the live site no longer carries.
4. dayancube.com and any other first-party DaYan material (dayancube.com is reported dead in
   `dayan.yml`'s /website attestation — verified live status checked fresh, not assumed).
5. General web search for Chinese-language coverage (Taobao/JD/百度/toy forums) where the above
   turn up nothing, since DaYan is a CN manufacturer and its home-market retail may carry
   configuration detail Western retailers dropped.
6. Record the outcome per model — new variant with evidence, or explicit negative with what was
   searched — before moving to the next model.

## BASE COMMIT
460e9df (main)

## STATUS
Skeleton committed. Research not yet started.

## FINDINGS
(to be filled in per model)

## EVIDENCE
(to be filled in)

## CHANGES
(to be filled in)

## PROBE RELIABILITY
(to be filled in — false-positive rate measured against a known positive/negative pair)

## REJECTED CANDIDATES
(to be filled in)

## ESCALATION CANDIDATES (model gaps, out of this lane's authority)
(to be filled in if found)

## UNRESOLVED / NOT FINISHED
(to be filled in)
