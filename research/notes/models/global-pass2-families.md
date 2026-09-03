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

## DaYan — 8 families

**Method note.** Unlike QiYi and YJ, DaYan's own official site (`dayancube.com`, captured 2013
in pass 1 as `dayancube-official-2013`) directly lists a **manufacturer-declared numbering
scheme** — "DaYan II GuHong", "DaYan III LingYun", "DaYan IV LunHui", "DaYan V ZhanChi", "Dayan
VI Panshi" — and the Speedsolving wiki's own product-history section independently organises
around the identical numbering ("Dayan 1: TaiYan" through "Dayan 8: TengYun M"). This is the
strongest family-boundary evidence found anywhere in this session: a tier 1 manufacturer source
and a tier 4 community source agree on the same discrete numbered succession, for five of the
eight lines. `speedsolving-wiki-dayan-products` documents this reasoning directly rather than
leaving it implicit.

**Candidates considered:** TaiYan (1), GuHong (2), LingYun (3), LunHui (4), ZhanChi (5, +42mm),
PanShi (6), XiangYun (7), TengYun M (8), DaYan+MF8 4x4, DaYan Megaminx, DaYan NeZha 5x5 M, DaYan
Tengyun 2x2.

**Accepted (8):** `dayan-taiyan`, `dayan-guhong`, `dayan-lingyun`, `dayan-lunhui`,
`dayan-zhanchi`, `dayan-panshi`, `dayan-xiangyun`, `dayan-tengyun` — one family per numbered
line, exactly matching DaYan's own numbering where it is independently attested (1 through 6)
and the wiki's own extension of the same scheme where it is not (7, 8 — dayancube-official-2013
predates both by years, so their "Dayan 7"/"Dayan 8" ordinals are recorded at tier 4 confidence
only, flagged explicitly on each record).

**Rejected/excluded — all for the same reason (wrong puzzle category, not a boundary call):**
DaYan+MF8 4x4 (4x4x4), DaYan Megaminx and its "V2 M" generation (Megaminx), DaYan NeZha 5x5 M
(5x5x5), DaYan Tengyun 2x2/2x2 V2 M (2x2x2), and the wiki's "Other products" list (DaYan 2x2,
Pyraminx, Crazy 3x3x2, Gem Cube, Bermuda Cube, Octahedron, Skewb/F-Skewb, Tanagram, Wheel of
Wisdom, Bagua Cube — shape mods and non-3x3x3 puzzles). None of these needed a boundary
judgement; all are out of this archive's 3x3x3 scope by category.

**Kept deliberately separate, not merged:**
- **ZhanChi 42mm folded into `dayan-zhanchi`** (a stated size variant, "a smaller version of
  the Zhanchi... used as the core for the DaYan Zhanchi 2x2"), the same reasoning applied to
  QiYi Big Sail within `qiyi-sail`.
- **No family was collapsed across numbered lines.** Even where the wiki's own prose states a
  mechanical inheritance between adjacent numbers (e.g. GuHong's edges/corners informing later
  designs), each numbered product is DaYan's own distinct, separately-numbered release — the
  numbering itself *is* the family boundary here, not evidence for merging.

**Historical/discontinued families preserved:** `dayan-taiyan`, `dayan-lingyun`, `dayan-lunhui`,
`dayan-panshi`, `dayan-xiangyun` are all single-or-two-generation lines with no retailer capture
found after 2019 (LunHui's 2017 revival is its most recent evidence). Kept per the standing
instruction against letting current-catalogue absence erase a documented historical line.

**Unresolved gaps:** exact TaiYan original-release date (only the 2011 official-naming date is
sourced); whether TengYun and ZhanChi's newest generations (V3 M, V5 M respectively — both newer
than the wiki's September 2023 edit) carry a DaYan-declared ordinal or are retailer/community
naming only, a pass-3 question.

**Sources created this session (DaYan):** `speedsolving-wiki-dayan-products`,
`thecubicle-dayan-collection-2025`. Reused from pass 1 without modification:
`dayancube-official-2013`, `speedsolving-wiki-dayan`, `thecubicle-dayan-guhong-product-urls`,
`thecubicle-celeritas-dayan-guhong-v4-m-3x3`.

---

## MFJS — 3 families

**Method note.** MFJS's identity, sub-brand relationship, and the Meilong/RS3M product-line
questions were substantially pre-resolved in pass 1 (`data/manufacturers/mfjs.yml`'s own notes)
and by the prior session's `moyu-rs3m.yml`. This pass's job was narrower than for QiYi/YJ/DaYan:
enumerate what pass 1 had already flagged as belonging here, and resolve the RS3M boundary
question `moyu-rs3m.yml` itself left open ("a future pass revisiting MFJS specifically should
check this again").

**Candidates considered:** MF3/MF3RS/MF3RS2/MF3RS3, RS3M (2020 onward), Meilong (+3x3 M/3C/V2
generations), MoFang JiaoShi Mini 3x3 Series.

**Accepted (3):** `mfjs-mf3`, `mfjs-meilong`, `mfjs-mini-3x3`.

**Deliberately not created: a separate MFJS-side RS3M family.** `moyu-rs3m` already exists
(manufacturer_id: `moyu`, created in the prior MoYu session) and this pass did not duplicate it.
Instead, `mfjs-mf3.yml` sets `successor_family_id: moyu-rs3m` directly, backed by the wiki's own
explicit sentence — "RS3M 2020 — An updated version of the MF3RS3... For more information, see
MoYu" — the single clearest stated family-to-family succession found anywhere in this session,
and stronger evidence than either the QiYi Bullfight/Thunderclap or YJ MGC/Meta cases, where no
comparably direct wording existed. This is the first `successor_family_id` set anywhere in this
pass's output.

**The RS3M/Meilong manufacturer-attribution question, closed for RS3M, left open for Meilong.**
Both lines show a retailer filing products under "MoYu" in some captures and under "MoFang
JiaoShi"/MFJS in others. For RS3M, the prior session already adjudicated this (kept at `moyu`,
per TheCubicle's own consistent attribution) and this pass did not reopen it. For Meilong, the
pass-1 manufacturer register already made an explicit finding (`mfjs.yml`: "Meilong is a product
line, not a further sub-brand... belongs to pass 2 as a MFJS family") that this pass followed
rather than re-litigated, even though a newer SpeedCubeShop capture (2025-11 onward) shows the
same MoYu-collection drift RS3M shows. `mfjs-meilong.yml` documents this complication in full
rather than silently picking a side.

**The MF3/RS3M parallel-currency finding.** TheCubicle's own product-URL history shows the base
MF3RS3 tier still resolving as of a 2026-06-26 capture — six years after RS3M's own 2020 debut.
This is the third instance this session of a "successor" line launching without its predecessor
being discontinued (after QiYi MP/M Pro and YJ MGC/Meta), now with the added twist that here a
`successor_family_id` genuinely was set, precisely because the source's wording was more direct
than in the other two cases — the pattern is the same, but the evidentiary bar this pass applied
was met here and not there.

**Sources created this session (MFJS):** `thecubicle-mofang-jiaoshi-mf3-prefix-2026`,
`thecubicle-mofang-jiaoshi-mini-3x3-prefix`. Reused from pass 1 without modification:
`speedsolving-wiki-mfjs-products`, `speedsolving-wiki-mofang-jiaoshi`, `cuboss-mfjs-brand-page`,
`moyucube-official-home-2022`. The orphaned `speedcubeshop-mfjs-meilong-collections`, named explicitly in this session's brief as orphaned,
is now wired into `mfjs-meilong.yml`'s provenance. `speedsolving-wiki-mfjs-products` (also named
as orphaned in the brief) turned out not to be cited by any record before this session — it is
now wired into both `mfjs-mf3.yml` and `mfjs-meilong.yml`.
