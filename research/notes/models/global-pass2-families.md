# Global pass 2 — family enumeration across the manufacturer register

Resuming after a prior run completed MoYu (9 families: `moyu-weilong`, `-aolong`,
`-huanying`, `-tanglong`, `-rs3m`, `-ai`, `-hualong`, `-dianma`, `-liying`). That work is not
redone here. This file is the consolidated per-manufacturer reasoning log the prior run did not
produce, per the instruction that accompanied this resumed session. Updated per manufacturer as
work proceeds, not at the end.

Method note: `theqiyi.com`'s own CDX index has essentially no bulk crawl coverage beyond the
single `about-us.html` page already captured in pass 1 (`npm run wayback -- prefix
theqiyi.com` and `matchType=domain` both return zero rows even though the exact URL resolves via
`list`/`nearest` — a live/on-demand capture that has not yet propagated into the bulk CDX index,
not evidence the domain has no other content). `qiyicube.com`'s own bulk crawl is dominated by a
WordPress theme's static assets and, later, unrelated torrent-spam squatting — not usable for
discovery. Retailer collection prefix crawls (TheCubicle's `/collections/qiyi-mofangge` and
`/collections/x-man-designs`) plus the Speedsolving wiki's own product-history section carried
this manufacturer's discovery instead.

---

## QiYi (+ X-Man Design sub-brand) — 11 families

**Candidates considered:** Bullfight, Thunderclap (V1/V2/V3), Sail (+ Big Sail, Sail W),
Warrior (W/S/M/M Pro/Plus), MS, MP, M Pro (+ Elite/V2/Smart Cube), QiMeng (+ Plus/V3), Valk
(2/3/4/5), Black Mamba, X-Man Tornado (V3/V4/AI), X-Man XT3, X-Man Volt.

**Accepted (11):** `qiyi-bullfight`, `qiyi-thunderclap`, `qiyi-sail`, `qiyi-warrior`, `qiyi-ms`,
`qiyi-mp`, `qiyi-m-pro`, `qiyi-qimeng`, `qiyi-valk`, `x-man-tornado`, `x-man-xt3`.

**Rejected/excluded:**
- **X-Man Volt** — checked directly (`thecubicle-x-man-volt-v2-collection-2019`); the
  retailer's own category navigation files it under Square-1, not 3x3. Out of scope entirely,
  not a family.
- **Black Mamba** — a single wiki mention ("QiYi Black Mamba V3... the 3rd version of the Black
  Mamba line of puzzles from QiYi (although these puzzles were before QiYi was a good
  speedcubing company)") with no retailer corroboration and explicitly framed as pre-dating
  QiYi's speedcube era. Not chased further this pass on a significance basis — flagged as an
  open lead, not created as a family, so it is not silently lost.

**Kept deliberately separate rather than merged (the boundary calls that matter most here):**
- **Bullfight vs. Thunderclap.** The wiki frames Thunderclap as "an improved version of the
  Bullfight" — a stated succession between two *different* names, not one continuous line. Kept
  as two families with the relationship documented in prose (no `successor_family_id` set,
  since that field describes a family superseding another of the *same* manufacturer's line in
  a stronger sense than this evidence supports — flagged for a human to consider setting it
  directly).
- **QiYi MP (2021) vs. QiYi M Pro (2023+).** Visually similar names, no source states a
  succession, and MP does not appear in TheCubicle's 2024-2025 collection captures while M Pro
  does. Kept separate per the standing "when the evidence is unclear, split" instruction rather
  than assume MP was renamed to M Pro.
- **QiYi Smart Cube 3x3 folded into `qiyi-m-pro`, not split out.** Unlike GAN (whose smart lines
  carry their own persisting collection names — i Series, i Carry, ui Series — and were kept as
  separate families in the GAN pilot), QiYi's Smart Cube has no separately-named persisting
  collection evidence, and the wiki explicitly describes M Pro Elite as "the non smart version
  of the Qiyi Smartcube" with "the same adjustment system" — same design generation, smart vs.
  mechanical variant. This is the opposite call from GAN's smart-line split, made deliberately
  because the underlying evidence differs, not by default.
- **X-Man Tornado vs. X-Man XT3.** Genuinely separate X-Man Design lines: XT3 is explicitly
  marketed by the retailer as flagship-*adjacent but cheaper* than Tornado ("gives you flagship
  features without the flagship price"), and customer reviews disagree about whether it shares
  tooling with Tornado V3 — evidence pass 3 will need, not resolved here.

**The single most uncertain boundary call this pass: `qiyi-valk`'s `manufacturer_id`.** Set to
`qiyi`, not `x-man-design`, on the strength of two sources (the Speedsolving wiki's own
"Sub-Brands" heading listing X-Man Design and TheValk as parallel entries, and a 2018 QiYi
storefront page title naming "The Valk, MoFangGe, X-Man Design" as three separate items) against
QiYi's *current* (2026) first-party "family of brands" page, which lists X-Man Design but omits
Valk by name entirely. No source states the relationship directly either way. Recorded at
`confidence: uncertain` on the `/manufacturer_id` attestation — **a human should look at this
directly** before pass 3 opens on Valk, since a wrong manufacturer_id here would misattribute an
entire flagship lineage.

**Historical/discontinued families preserved:** `qiyi-bullfight` (2015, single generation, not
found in any 2024-2025 retailer capture — likely long discontinued) and `qiyi-mp` (2021, single
generation, also absent from 2024-2025 captures) are both kept as their own records per the
standing instruction that absence from a current catalogue is not evidence a family never
existed.

**Unresolved gaps for pass 3 / a future pass:**
- Exact Tornado-line launch date (recorded circa 2018 from indirect evidence only).
- Whether `qiyi-warrior`'s implied "original Warrior" (predating Warrior W, per the wiki's own
  phrasing) is itself a distinct, undocumented early generation.
- QiMeng's native Chinese name and launch date — deliberately left unrecorded rather than
  supplied from unsourced recall (see the family record's own note on this).
- Whether Bullfight/Thunderclap or MP/M Pro should carry a `successor_family_id` once a
  stronger source is found (schema supports it; evidence found this pass does not clear the
  bar).

**Sources created this session (QiYi/X-Man):** `speedsolving-wiki-qiyi-products`,
`thecubicle-qiyi-mofangge-collection-2025`, `thecubicle-x-man-designs-collection-2025`,
`thecubicle-x-man-volt-v2-collection-2019`, `thecubicle-x-man-xt3-v1-3x3-flagship-product`,
`thecubicle-products-valk-prefix-2025`. All tier 2 (retailer) except the wiki source (tier 4).
Reused from pass 1 without modification: `theqiyi-about-us`, `qiyicube-storefront-2018`,
`speedsolving-wiki-qiyi`.

---

## YJ — 9 families

**Method note.** `youngjoecube.com`'s own CDX bulk-crawl coverage is as thin as
`theqiyi.com`'s (see the note above) — only the pass-1 `about-us` page resolves. YJ's earlier
domain, `yjcube.com`, was already captured in pass 1 for a single 2018 snapshot but has no
richer product-listing crawl either. Discovery ran instead off the Speedsolving wiki's YongJun
product-history section (last edited November 2023 — a hard boundary, noted on every family
whose evidence sits partly or wholly after that date) and TheCubicle's own `/collections/yj` and
`/products/yj-mgc*` prefix crawls, which cover 2019 through February 2026 and were essential for
everything the wiki predates.

**Candidates considered:** SuLong, ChiLong, YuLong (+V2 M/V3 M), GuanLong (+V2/Plus/V3/V4), MGC
(+V2/Elite/MGC3 Elite/Evo/Evo II/Est/Beta/Sigma), Meta/Meta3, RuiLong, ZhiLong, JinJiao, four
"Tiled 3x3s" (LingGan, Diamond Cube, Love Cube, Spade Cube).

**Accepted (9):** `yj-sulong`, `yj-chilong`, `yj-yulong`, `yj-guanlong`, `yj-mgc`, `yj-meta`,
`yj-ruilong`, `yj-zhilong`, `yj-jinjiao`.

**Rejected/deferred:**
- **The four "Tiled 3x3s"** (LingGan, Diamond Cube, Love Cube, Spade Cube) — the wiki lists them
  under their own subsection with real, distinct given names, but with no release dates, no
  retailer corroboration, and no indication whether they are separate designs or decorative
  colourway/tile treatments of an existing GuanLong/YuLong-generation mechanism (a model/variant
  question, not obviously a family one). Not created this pass on a significance/evidence basis;
  recorded as an open lead rather than silently dropped.

**The two boundary calls that matter most here:**
- **SuLong / ChiLong / YuLong kept as three separate families**, not one "Long" lineage, even
  though the wiki states YuLong's "mechanism was largely adapted from the ChiLong" and both
  predate YuLong by one and two months respectively in late 2013. Only YuLong received further
  named generations (V2 M, V3 M UV Coated, through 2025); SuLong and ChiLong are each a single
  documented product with no successor found. Splitting here follows the same reasoning as
  QiYi's Bullfight/Thunderclap: a stated mechanical inheritance between two *differently-named*
  products is not the same claim as one persisting family name, and merging would manufacture a
  continuity no source states directly.
- **MGC and Meta/Meta3 kept as two families, not one, despite explicit retailer "successor"
  language.** TheCubicle's own Meta3 product copy calls it "a more refined and controllable
  successor to the MGC Beta 3x3" — the strongest single-sentence succession claim found in this
  entire session. It was **not** treated as sufficient to merge the two families or to set
  `successor_family_id`, because TheCubicle's own MGC product history shows the MGC line
  continuing *after* Meta3's launch (MGC Sigma, first captured 2026-02-16, six months after
  Meta3's earliest capture) — direct evidence against a full-line replacement. Read instead as a
  parallel flagship branch, the same "positioning shift, not discontinuation" shape the GAN pilot
  documented for GAN356 vs. GAN Flagship Series (`docs/pilot-audit.md` F4). **This is the
  session's clearest demonstration that a retailer's own "successor" word is evidence, not
  proof** — flagged for a human to revisit once a manufacturer-first-party YJ source is found for
  either line.

**Historical/discontinued families preserved:** `yj-sulong` and `yj-chilong` (both 2013, single
generation, no post-2019 retailer capture found).

**A conditional-scope flag, not resolved here:** `yj-jinjiao` is explicitly described by its own
source as "non-comp-legal". The family record is created for identity per RESEARCH_SPEC's
"conditional" admission still needing an identity record; whether any model/variant under it
should carry `scope_class: conditional` with a written justification is left to pass 3/4,
flagged explicitly in the record itself so it is not defaulted into `core` scope by omission.

**Sources created this session (YJ):** `speedsolving-wiki-yongjun-products`,
`thecubicle-yj-collection-2025`, `thecubicle-yj-mgc-prefix-2026`,
`thecubicle-yj-meta3-3x3-magnetic-product`, `thecubicle-yj-zhilong-mini-3x3-product`. All tier 2
(retailer) except the wiki source (tier 4). Reused from pass 1 without modification:
`speedsolving-wiki-yongjun`, `youngjoecube-about-us`, `yjcube-com-2018`,
`thecubicle-us-yj-yulong-product` (the last of these was one of the three orphaned sources named
in this session's brief — now wired into `yj-yulong.yml`'s provenance).

---

## DaYan

*(not yet started)*

---

## MFJS

*(not yet started)*
