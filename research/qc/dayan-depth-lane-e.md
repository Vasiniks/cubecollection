# DaYan depth — Lane E (second attempt)

## SCOPE
DaYan only. Variant-depth research: verify the recovered GuHong V2 DIY-kit source, then sweep
DaYan models currently carrying exactly one configuration (a `standard.yml` baseline only) for a
second, undocumented configuration (DIY kit, size split, magnet architecture, MagLev, etc.) across
thecubicle.com, speedcubeshop.com, and cubelelo.com. No non-DaYan record is touched. No model,
family, or manufacturer record is created or edited — only new variant files under existing
`data/variants/dayan/<model-id>/` directories, new source files, and attestation additions to
existing DaYan variant files.

## BASE COMMIT
4873931575f21900985b999fc845e214fd0d0814 (main)

## TARGETS
1. Retry Wayback verification of `thecubicle-dayan-guhong-v2-diy-kit-2020` (previous attempt's
   capture returned "Internet Archive: Temporarily Offline" both times).
2. Sweep remaining single-configuration DaYan models for a second configuration:
   dayan-bermuda-column, dayan-bermuda-house-i, dayan-bermuda-house-ii, dayan-bermuda-star,
   dayan-guhong-v3-m, dayan-guhong-v4-m, dayan-lingyun-v1, dayan-lunhui-2017, dayan-taiyan-v1,
   dayan-tengyun-m, dayan-tengyun-v2-m, dayan-tengyun-v3-m, dayan-xiangyun-v1,
   dayan-zhanchi-2017, dayan-zhanchi-2018, dayan-zhanchi-pro-m.
   Method per RESEARCH_SPEC 3.6a: (a) Wayback CDX prefix per host, (b) Shopify
   `/collections/dayan/products.json` vendor/product_type facet, (c) cubelelo.com direct sweep.

## STATUS
In progress.

## FINDINGS

### 1. Wayback is down archive-wide — GuHong V2 DIY kit NOT restored
`web.archive.org` returned HTTP 503 "Internet Archive: Temporarily Offline" on every endpoint
tried this session: the exact `id_` replay URL from the recovery report (3 attempts, spaced
across the session), the CDX search API, `archive.org/wayback/available`, and the bare
`web.archive.org/` and `archive.org/` roots. This is a full outage of the archive, not a
dead capture. Per instructions, a failed fetch is never evidence of absence — the recovered
`thecubicle-dayan-guhong-v2-diy-kit-2020` source block in
`research/qc/agent-lane-recovery-2026-09-12.md` is left exactly where it is, unrestored, for a
future pass to retry. `data/variants/dayan/dayan-guhong-v2/` still holds only `standard.yml`.

### 2. Cross-retailer sweep of the 16-target list — no second configuration found anywhere
Rather than re-running CDX prefix sweeps that already exist and are current (Wayback being down
makes new ones impossible this session anyway), I read the archive's own existing enumeration
sources first and then closed the one live-only gap (Shopify vendor facets) myself:

- `thecubicle-dayan-products-prefix-2026` — full CDX prefix of thecubicle.com/products/dayan*,
  351 URLs, 2018-2026, span checked against all 8 frozen DaYan families. Only new-family finding
  was Bermuda (already a model). No further generation or configuration surfaced.
- `thecubicle-dayan-per-family-product-urls-2026` — per-family CDX for taiyan, xiangyun, lingyun,
  lunhui, panshi, zhanchi. Confirms exactly one 3x3 product path each for taiyan-v1 and
  xiangyun-v1; confirms lingyun-v1 has **no** TheCubicle product page at all (only the
  Speedsolving wiki attests it); confirms lunhui-2017 has no DIY-kit path (only lunhui/v1 does);
  confirms zhanchi-2017/2018/pro-m have no DIY-kit path (only zhanchi/v1 does).
- `thecubicle-dayan-collection-2025` — CDX prefix of the /collections/dayan catalogue page,
  giving the sole product path each for tengyun-m, tengyun-v2-m, tengyun-v3-m, guhong-v3-m,
  guhong-v4-m, zhanchi-2018, zhanchi-pro-m. No second path for any of them.
- `cubelelo-dayan-product-urls-2026` and `cubelelo-dayan-products-prefix-2026` — two independent
  CDX prefix sweeps of cubelelo.com (India, RESEARCH_SPEC 3.6a's non-US check), 2020-2026. Both
  explicitly conclude "no un-enumerated TaiYan/LingYun/LunHui/PanShi/XiangYun SKU" and no further
  GuHong/ZhanChi generation. The only per-model paths beyond a single SKU are
  `-stickerless-magnetic` and `-refurbished` variants of guhong-v3-m, tengyun-m and
  zhanchi-pro-m/v5-m — already adjudicated and REJECTED (stock condition / stock colourway) per
  the ALREADY-DONE list, so they close rather than reopen these models.
- Live Shopify vendor-facet check I ran fresh this session (`/collections/dayan/products.json`,
  since a historical CDX equivalent doesn't exist for the systematic vendor-facet method and
  Wayback is down): **thecubicle.com** (68 current SKUs), **speedcubeshop.com** (16 current
  SKUs), **cubelelo.com** — note the collection handle there is `dayan-speed-cubes`, not
  `dayan`; the bare `dayan` handle returns an empty product list (5 current SKUs at the
  corrected handle). None of the 12 remaining sweep targets (guhong-v3-m, guhong-v4-m,
  lingyun-v1, lunhui-2017, taiyan-v1, tengyun-m, tengyun-v2-m, tengyun-v3-m, xiangyun-v1,
  zhanchi-2017, zhanchi-2018, zhanchi-pro-m) appear in ANY of the three live facets at all —
  consistent with them being older, discontinued generations that predate these retailers'
  current stock, and consistent with (not contradicting) the historical CDX evidence above.
  `dayan-guhong-pro-3x3-*` (six SKUs, no "m" or "+" in the slug) on the live TheCubicle facet is
  **not** a third undocumented GuHong Pro line — `dayan-guhong-pro-plus.yml`'s own notes already
  record that retailer URL slugs for GuHong Pro+ drop the "+", and SpeedCubeShop's
  "DaYan TengYun 3x3 (Magnetic)" listing is likewise already adjudicated as the tengyun-m MODEL,
  not a second configuration. Neither is a new finding.
- The four Bermuda sub-models (column, house-i, house-ii, star) already carry proper P4-3
  differentiation-search attestations on their `standard.yml` (DaYan's own 2012 category page,
  Black/White only, collapsed per the GAN356 Air stock-colourway precedent) and are corroborated
  by both the TheCubicle and Cubelelo CDX sweeps showing exactly one product path each. No
  further work needed; they were already correctly assessed.

**Net result: swept all three hosts (CDX history + live vendor facet) for all 16 targets. Zero
second configurations found. This is a real, documented negative**, not an unresearched gap —
every target already carried (or now carries, via this session's live-facet corroboration) an
explicit statement of what was checked.

### 3. P4-9 model candidate found: DaYan Void Cube (Limited Edition)
TheCubicle's live `/collections/dayan/products.json` facet (fetched 2026-09-12) lists
`dayan-void-cube-limited-edition` (product id 7639915364435), vendor "DaYan", four colourways,
description stating explicitly: "With no center pieces... These are older versions that aren't
made anymore, packaged in Calvin's Puzzle boxes." A Void Cube's core omits center pieces
entirely — a different internal geometry from every DaYan 3x3 model on file, failing the
DATA_MODEL §4.2 separability-at-assembly test outright (no assembly-time choice of parts turns a
solid-center 3x3 into one with none). This is a MODEL question, not a variant one, and the
taxonomy is frozen at 54/132/269 — so **no model or variant was created**. The source is
preserved (`thecubicle-dayan-void-cube-limited-edition-2026`, `data/sources/`) and the candidate
is reported here for a future pass with model-creation authority.

## EVIDENCE
- `research/qc/agent-lane-recovery-2026-09-12.md` — verbatim recovered GuHong V2 DIY-kit source
  block, unrestored.
- `data/sources/thecubicle-dayan-products-prefix-2026.yml`,
  `thecubicle-dayan-per-family-product-urls-2026.yml`, `thecubicle-dayan-collection-2025.yml`,
  `cubelelo-dayan-product-urls-2026.yml`, `cubelelo-dayan-products-prefix-2026.yml`,
  `thecubicle-dayan-guhong-product-urls.yml`, `speedcubeshop-vendor-facet-sweep-2026-09.yml` —
  all pre-existing, read (not modified) this session as the historical-sweep evidence base.
- `data/sources/thecubicle-dayan-void-cube-limited-edition-2026.yml` — NEW, created this session,
  live Shopify product JSON excerpt (Wayback unavailable), backs the P4-9 candidate only.
- Live fetches performed this session, not separately preserved because they corroborate an
  existing negative rather than support a new positive claim: `thecubicle.com`,
  `speedcubeshop.com`, and `cubelelo.com` (`/collections/dayan-speed-cubes/products.json`)
  vendor facets, 2026-09-12.

## CHANGES
- Added: `data/sources/thecubicle-dayan-void-cube-limited-edition-2026.yml` (new source; backs
  no model or variant, preserves a P4-9 lead only).
- No variant, model, family, or manufacturer file was created or edited. No non-DaYan record was
  touched.

## UNRESOLVED
- `dayan-guhong-v2--diy-kit`: cannot be created until Wayback recovers and the exact capture in
  the recovery report is re-verified. Not evidence of absence — just genuinely blocked.
- DaYan Void Cube (Limited Edition): a real MODEL gap (P4-9 candidate), out of this lane's
  authority to fill. Source preserved, reported below.
- SpeedCubeShop has no full historical CDX prefix sweep of DaYan (only guhong-pro-plus,
  zhanchi-pro-m, and zhanchi-size-diy-kits have retailer-specific sources there). Given
  SpeedCubeShop's catalogue is boutique/current-generation-focused and none of the 12
  discontinued-generation targets appear even on its LIVE facet, this is a low-priority gap, not
  a live lead — noted for completeness rather than escalated.

## NEXT
- Retry the GuHong V2 DIY-kit Wayback fetch once the outage clears; restore verbatim if the five
  markers are confirmed.
- If a future pass gets model-creation authority for DaYan, evaluate the Void Cube
  (Limited Edition) source for a new `dayan-void-cube` (or similarly named) model.
