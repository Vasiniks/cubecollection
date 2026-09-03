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
`moyucube-official-home-2022`. The orphaned `speedcubeshop-mfjs-meilong-collections`, named
explicitly in this session's brief as orphaned, is now wired into `mfjs-meilong.yml`'s
provenance. `speedsolving-wiki-mfjs-products` (also named as orphaned in the brief) turned out
not to be cited by any record before this session — it is now wired into both `mfjs-mf3.yml`
and `mfjs-meilong.yml`.

---

## YuXin — 7 families

**Method note.** The Speedsolving wiki's YuXin page carries its own standing editorial warning
("This page may be currently outdated") and, unlike every wiki page used earlier this pass,
gives **no release date for any product**. Every `introduced` field this pass would otherwise
have sourced from it is left unset rather than guessed at a false precision — the first
manufacturer this session where dating had to be dropped almost entirely for lack of source
material, not for lack of trying.

**Candidates considered:** YuXin 3x3 (original), Fire (+Fire S), Water, Little Magic (+M/M V2),
HuangLong (+M/V2 M UV Coated), Black Kirin (+V2), Kylin (V2 M only), plus four newer,
wiki-undocumented 2025-2026 retailer products (Lustrous Cube, Super Hero Cube Mini, 3x3 Treasure
Box, 3x3 Magnetic Sliding Tile Cube).

**Accepted (7):** `yuxin-3x3`, `yuxin-fire`, `yuxin-water`, `yuxin-little-magic`,
`yuxin-huanglong`, `yuxin-black-kirin`, `yuxin-kylin`.

**Deferred, not created:** the four newer 2025-2026 retailer-only products (Lustrous Cube, Super
Hero Cube Mini, 3x3 Treasure Box, 3x3 Magnetic Sliding Tile Cube) — no wiki or manufacturer
coverage, names suggestive of novelty/gift-market products rather than competition cubes, and no
significance evidence found this pass. Recorded as open leads in
`thecubicle-yuxin-collection-2025`'s own excerpt rather than silently dropped or force-fit into
families.

**The boundary call that matters most here: Fire to Water kept as two families, joined by
`successor_family_id`.** The wiki states directly, under Water's own entry, "This puzzle was the
successor to the YuXin Fire" — comparable in directness to the MFJS MF3-to-RS3M succession
recorded earlier this pass, though here at tier 4 only (no tier 1-2 corroboration was found).
Recorded rather than left as prose, on the same reasoning as `mfjs-mf3`.

**Historical/discontinued families preserved:** `yuxin-3x3` (YuXin's first 3x3, explicitly
stated by the wiki to be out of production at both retailers it names) and `yuxin-water` (no
generation after the original found).

**Sources created this session (YuXin):** `speedsolving-wiki-yuxin-products`,
`thecubicle-yuxin-collection-2025`. No pre-existing YuXin-specific sources existed to reuse
beyond the manufacturer-register sources already on `data/manufacturers/yuxin.yml`.

---

## ShengShou — 7 families

**Method note.** Like YuXin, ShengShou's wiki page carries a standing "may be currently
outdated" warning. Unlike YuXin, most entries here do carry a date, but several (Rainbow, Gem,
Tank) do not, and are correspondingly excluded. TheCubicle's current (2025) ShengShou collection
carries no ordinary 3x3 at all — only shape mods and big cubes — corroborating the wiki's own
framing of ShengShou's 3x3 line as largely historical.

**Candidates considered:** ShengShou 3x3 (original), Wind, Aurora, Rainbow, Legend, FangYuan
(+V2 M), Pearl, Gem, Mr. M (+V2/MS), Tank.

**Accepted (7):** `shengshou-3x3`, `shengshou-wind`, `shengshou-aurora`, `shengshou-legend`,
`shengshou-fangyuan`, `shengshou-pearl`, `shengshou-mr-m`.

**Rejected/deferred:**
- **Rainbow** — "Shengshou's first attempt at a stickerless cube," a real historically notable
  fact, but no date and no further detail found. Left as a lead rather than a family this pass,
  a closer call than Gem/Tank below; a future pass with more time should reconsider it.
- **Gem** and **Tank** — undated, single-sentence, explicitly dismissive entries ("why even
  bother buying this?"). Not created as families on a significance/evidence basis, recorded as
  leads in `speedsolving-wiki-shengshou-products`'s own reliability note rather than silently
  dropped.

**No boundary disputes this manufacturer** — every accepted family is its own distinct name with
no stated succession between differently-named products (unlike Fire/Water at YuXin or
Bullfight/Thunderclap at QiYi), so no `successor_family_id` calls were needed.

**Historical/discontinued families preserved:** all seven. This is the first manufacturer this
pass where *every* accepted family reads as historical/discontinued rather than currently sold —
ShengShou's 3x3 presence appears to have genuinely receded in favour of its shape-mod and
big-cube lines, which this pass's scope does not cover.

**Sources created this session (ShengShou):** `speedsolving-wiki-shengshou-products`,
`thecubicle-shengshou-collection-2025`.

---

## DianSheng — 5 families

**The lead closure this manufacturer exists to deliver.** This session's brief flagged
"MsCube → *reported* as a DianSheng line but never sourced, treat as a lead to verify." The
Speedsolving wiki's own DianSheng page states directly, in its opening summary, that DianSheng
is known "for owning the Mscube line of puzzles." This is a real source, but only a tier 4 one
with no citation trail — `diansheng-mscube.yml` records the relationship at `confidence:
uncertain` throughout, deliberately not overclaiming a single weak source into something
stronger just because it happens to confirm a standing lead. A human should look for a tier 1-2
DianSheng or MsCube first-party source before treating this placement as settled.

**Candidates considered:** Type-E (2008), Stickerless 3x3, 3x3 M, Solar S3M, MsCube (MS3L).

**Accepted (5):** `diansheng-type-e`, `diansheng-stickerless-3x3`, `diansheng-3x3-m`,
`diansheng-solar-s3m`, `diansheng-mscube`.

**Kept in, despite thin evidence, for a stated reason:** `diansheng-stickerless-3x3` has no
release date and a single dismissive sentence, the same shape of evidence that led to Gem/Tank
being excluded at ShengShou — but it also carries a specific, named community-media appearance
("YouTuber Cubey Time used this puzzle for his very popular 'Will It Lube?' series"), a concrete
collector-relevant fact rather than an opinion, which tipped this one case toward inclusion.

**No boundary disputes this manufacturer.** Every family here is its own distinct DianSheng name
with no stated succession between differently-named products; MsCube is a separately-branded
line under the same manufacturer_id, not merged with any DianSheng-named family.

**Sources created this session (DianSheng):** `speedsolving-wiki-diansheng-products`,
`thecubicle-mscube-ms3l-3x3-standard-product`.

---

## Cyclone Boys — 5 families

**Candidates considered:** FeiXuan, XuanFeng, FeiHong, JisuZhiYun (four minimally-documented
"older models," dated but with no further description), FeiWu, FeiChi, Mini 3x3, FeiJue M,
Metallic 3x3.

**Accepted (5):** `cyclone-boys-feiwu`, `cyclone-boys-feichi`, `cyclone-boys-mini-3x3`,
`cyclone-boys-feijue`, `cyclone-boys-metallic-3x3`.

**Rejected/deferred:** the four "older models" (FeiXuan, XuanFeng, FeiHong, JisuZhiYun) — each
has a specific release month but literally no further description beyond that in the source
("Some of their older models of 3x3 cubes include: ... [name]. Released [date]."). This is
thinner than even ShengShou's excluded Gem/Tank (which at least got a full sentence of critical
commentary) and thinner than DianSheng's included Stickerless 3x3 (which had a named media
appearance). Not created as families this pass; recorded verbatim as leads in
`speedsolving-wiki-cyclone-boys-products`'s own excerpt.

**Boundary call: FeiWu to FeiChi kept as two families, joined by `successor_family_id`** — the
same "improved version of" wording and the same evidentiary bar used for MFJS MF3/RS3M and YuXin
Fire/Water this pass.

**Sources created this session (Cyclone Boys):** `speedsolving-wiki-cyclone-boys-products`. No
retailer collection prefix crawl was run for this manufacturer — the wiki's own coverage was
judged sufficient and consistent, and Cyclone Boys' current retail presence (per pass 1's own
`cyclone-boys.yml`) is thin enough that a prefix crawl was unlikely to add much for the budget
it would cost.

---

## LanLan — 0 families

The Speedsolving wiki's own summary states LanLan was "Originally known for their standard
cubes, they now produce many shape mods," but its dated/named product list contains no ordinary
3x3x3 at all — only a "2x2x2 Cube," "4x4x4 Cube," "LanLan Skewb," and, under "Other puzzles," a
"LanLan 3x3 Void cube" (a non-standard 3x3x3 mechanism, listed with no further description or
date). No source found this pass documents a standard, WCA-format LanLan 3x3. Consistent with
pass 1's own characterisation of this manufacturer ("known for shape-mod puzzles"). Zero
families created — a genuine finding, not a gap: this manufacturer appears to sit almost
entirely outside this archive's 3x3x3 scope. The Void Cube is left as an open lead (a
`scope_class: conditional` candidate at a future model/variant pass) rather than force-fit into
a family record on no real evidence.

---

## MF8 — 2 families

MF8 is documented primarily as a speedsolving forum/community ("the largest cubing community")
that also manufactures a largely shape-mod puzzle range (Megaminx, Square-1, Gigaminx, Teraminx,
Curvy Copter, and similar). Of its entire dated product list, only two entries are 3x3x3-shaped
products: **MF8 Legend** (2011, +V2 2013 — a standard 3x3, `mf8-legend.yml`) and **MF8 Crazy
3x3x3** (2010, a gimmick series implied by the "Crazy" name to be a non-standard mechanism,
`mf8-crazy-3x3x3.yml`, flagged for a future `scope_class` decision the same way `yj-jinjiao` was).
No boundary disputes — each is its own clearly single-lineage, differently-purposed product.

**Sources created this session (MF8):** `speedsolving-wiki-mf8-products`.

---

## FangShi — 1 family

FangShi's identity and its ShuangRen flagship were already substantially established in pass 1
(`data/manufacturers/fangshi.yml`'s own notes, plus `thecubicle-fangshi-shuangren-v2` and
`speedsolving-wiki-fangshi`, both already sourced). This pass fetched the wiki page's fuller
content and found no further 3x3 beyond ShuangRen/ShuangRen V2 — `fangshi-shuangren.yml` is kept
as **one** family across both generations (unlike this pass's several "improved version, new
name" splits), because the ShuangRen name itself persists unchanged across the V2 revision. Two
further product names on the same wiki page, "FangShi GuangYing" and "FangShi JieYun," have
section headers but empty body text — recorded as open leads, not families, since nothing is
actually known about them beyond the bare name.

**No new sources created for FangShi** — both sources needed already existed from pass 1.

---

## FanXin — 3 families

No Speedsolving wiki page exists for FanXin (checked both capitalisations, both 404). All
evidence is TheCubicle's own product copy. **Accepted (3):** `fanxin-3x3` (base standard 3x3),
`fanxin-magnetic-3x3` ("FanXin's first attempt at a modern, magnetic puzzle"), `fanxin-hudong`
(2024, retailer-stated flagship, three configurations). A wide range of fruit/novelty shape-mod
3x3s (Apple, Banana, Orange, Peach, Pear, Lemon, Basketball, dinosaur shapes, Nautilus) found in
the same product-URL enumeration were **not** created as families — undated, undescribed beyond
a bare product name, recorded as a group lead in `thecubicle-fanxin-3x3-products`'s own excerpt.

**Sources created this session (FanXin):** `thecubicle-fanxin-3x3-products`.

---

## Session paused here — QJ, Rubik's, GiiKER, Particula, MoreTry, and remaining zero-family
entities not yet reached

Tier 1 (QiYi, X-Man Design, YJ, DaYan, MFJS) complete, plus YuXin, ShengShou, DianSheng, Cyclone
Boys, LanLan (0 families, genuine finding), MF8, FangShi, FanXin. Stopped mid-batch on the
"then" list at the point this log entry was written, due to a session budget constraint flagged
by the operator. Everything through FanXin is committed and pushed; nothing below this line
represents lost work — it is simply not yet started.

## Resuming session (named targets: QJ, Rubik's, GiiKER, Particula, MoreTry, then remaining
## zero-family entities)

Method note: WebSearch budget for this session was already exhausted before this batch began
(200/200 used) — all discovery below uses `npm run wayback` (list/prefix/nearest/get) and
direct WebFetch of live pages only. Flagging this so a future session knows why no fresh
WebSearch leads appear in this section.

---

## QJ — 2 families

**Candidates considered:** QJ Candy 3x3, QJ Pillowed 3x3, QJ KingKong Puzzle ("Armadillo
Cube").

**Accepted (2):** `qj-candy-3x3`, `qj-pillowed-3x3`.

**Evidence base.** The Speedsolving wiki's own QJ page (`speedsolving-wiki-qj-2017`) names no
3x3 sub-products at all — only a bare "QJ 3x3x3" list entry, thinner than every other
manufacturer's wiki page used so far this pass. Discovery instead came from an 18-URL
`thecubicle.com/products/qj*` CDX prefix sweep: of 18 products, 16 are shape-mods (Skewb,
Megaminx, Pyraminx Crystal, Tetrakaidecahedron, Super Floppy 1x3x3, etc.) and exactly 2 are
standard 3x3x3 products — QJ Candy 3x3 and QJ Pillowed 3x3, both added to TheCubicle's catalog
on the same date (2018-09-11) and both already discontinued by their respective 2019
captures. A qjcube.com 2012-2015 catalogue capture (`qjcube-com-catalogue-2012`, URL-slug
level only, not full page content) shows QJ sold a similarly-dimensioned "3x3 Speed Cube"
(5.7cm) and a "3x3x3 Pillow-Shaped Magic Cube" years earlier under its own site, which
corroborates the pillowed-shape line's long-running existence but does **not** establish
either 2012 product as the *same* product as its 2018 TheCubicle namesake — recorded as an
unconfirmed naming lead in both family descriptions, not a claimed continuity.

**Rejected: QJ KingKong Puzzle / "Armadillo Cube".** A single SpeedCubeShop 2016 listing
(`speedcubeshop-qj-kingkong-puzzle-2016`) describes a non-standard, pull-apart-to-reset
3x3x3 variant with one sentence of description, no dimensions, weight, or price captured.
Treated the same way LanLan's Void Cube lead was treated in this same log: recorded as a lead
in the source's own `reliability_note`, not built into a family on evidence this thin. A
future model/variant pass could reconsider it as a `scope_class: conditional` candidate if
better sourcing turns up.

**Boundary reasoning.** Candy and Pillowed are kept as two separate families rather than
merged or treated as variants of one line — nothing found states either succeeded, replaced,
or was marketed as a configuration of the other; they are simply two separate concurrently
sold budget 3x3 products with different shapes (standard-body stickerless vs. pillowed),
different prices, and different weights. Per DATA_MODEL §4.2 a different shape/mould is model-
or family-level, never a same-line configuration choice.

**Sources created this session (QJ):** `thecubicle-qj-candy-3x3-product-2019`,
`thecubicle-qj-pillowed-3x3-product-2019`, `speedsolving-wiki-qj-2017`,
`qjcube-com-catalogue-2012`, `speedcubeshop-qj-kingkong-puzzle-2016` (this last cited only as
a rejected-candidate lead, not backing any family record).

**Unresolved:** whether QJ has any other 3x3 product line not captured in TheCubicle's or
SpeedCubeShop's own catalog history — no other major retailer's QJ collection/product prefix
was swept this pass given the manufacturer's evidently thin scope-window footprint. Both
families carry no confirmed manufacturer-first-party release date (retailer "Added" dates
only), left at `uncertain`/`probable` accordingly.

---

## Rubik's — 3 families

**Method note.** `rubiks.com` was rebuilt at least once inside the scope window (old
PHP-style `/products/3d_puzzles/*.php` URLs through ~2013, a UK/Rubik's-Brand-Ltd-era
Shopify-like site by 2017-2019, then a current-generation site from ~2024 using
`/products/rubiks-<slug>` URLs). A `rubiks.com/products` CDX prefix sweep against the current
URL scheme returned ~60 named products; most (2x2/4x4 puzzles, Race, Snake, Cage, Tower,
Gridlock, Sensory, Color Block, Edge, Pyramid, Roll, Tetris, Apprentice [a 2x2, confirmed by
fetching its page], bundles) are out of scope entirely (not 3x3x3). Of what remained, the
central finding this manufacturer produced was a boundary call, not a discovery gap.

**Candidates considered:** Rubik's 3x3 Cube (classic), Rubik's Speed, Rubik's Connected /
Connected X, Rubik's Crystal, Rubik's Phantom, Rubik's Retro, Rubik's Re-Cube, Rubik's Coach
Cube, Rubik's Impossible, Rubik's Disney 3x3, licensed "Cuber" collaborations (Batman, Iron
Man, Spider-Man, Hulk, Black Panther, Hello Kitty), Mercedes-AMG Petronas F1 Team Cube,
Wednesday Cube.

**Accepted (3):** `rubiks-classic`, `rubiks-speed`, `rubiks-connected`.

**The central boundary call — everything else folded into `rubiks-classic` as variant-level
leads, not separate families.** Six product pages were fetched and read in full (Crystal,
Phantom, Retro, Re-Cube, Coach Cube, Impossible); every one explicitly frames itself as "just
like the classic Rubik's Cube" with a stated surface, material, or sticker difference only
(transparent plastic; thermochromic tiles; boxy 50th-anniversary commemorative shell;
recycled plastic; peel-away numbered stickers that reveal "a regular 3×3 Cube" underneath;
iridescent angle-shifting tiles). None claims a different core, mechanism, or turning system.
Per DATA_MODEL §4.2's test ("could the manufacturer produce both from the same underlying
design by choosing different parts, materials, or treatment at assembly? Yes -> variant"),
these are textbook variants of one shared design, not new families or models — despite each
having its own dedicated product page and marketing name, which on a page-count basis would
suggest six-plus more families. The licensed "Cuber" collaborations and Disney 3x3 were not
individually fetched but are inferred to be the same pattern (character-themed sticker/colour
treatments of the classic mechanism, per the same site's consistent template and the
`edition.collaboration_with` field existing precisely for this case) and are recorded as pass
4 leads in `rubiks-classic.yml`'s description rather than chased individually at this pass —
enumerating every licensed collaboration's own model/variant boundary is pass 3/4 work, not
family enumeration.

**Kept separate: `rubiks-speed`.** The opposite call, made deliberately because the evidence
differs: the current Speed Cube's own product page states genuine mechanism/hardware
differences (magnets, "a stronger, more reliable core"), not colourway or material. A
`rubiks.com` capture from January 2017 shows a "Speed Cube" site category already existing
under the pre-Spin-Master UK entity, years before the 2022 "New... magnetic" relaunch
language — recorded as one family spanning a possible non-magnetic-to-magnetic generational
change, with the exact model/revision boundary explicitly left to pass 3 (no source found
this pass describes the earlier generation's actual mechanism, only its category label).

**Kept separate: `rubiks-connected`.** Smart/electronic capability is treated as always
family-relevant in this archive (consistent with `giiker`, `moyu-ai`, and GAN's smart lines
elsewhere in this project) — the object itself differs materially (electronics, Bluetooth,
battery), not merely a parts/material choice at assembly. This is also the family that
directly answers part of pass 1's "who manufactures Rubik's-branded cubes" open question:
Particula, per its own 2021 press coverage, already sourced in `data/manufacturers/particula.yml`
and `data/manufacturers/rubiks.yml`. No plain "Rubik's Connected" (without "X") product page
exists on the current site — only "Connected X" — so the family spans a persisting name across
a possible generational split, the same pattern as `rubiks-speed`.

**Leads verified/refuted from the task brief:**
- *"Corporate/ownership change mid-window"* — **confirmed**, already fully sourced in pass 1
  (`data/manufacturers/rubiks.yml`): Spin Master's acquisition of Rubik's Brand Ltd, effective
  2021-01-05. Not re-litigated here; the family records cross-reference it rather than
  re-attesting it.
- *"Licensed manufacture"* — **partially confirmed, partially still open.** Confirmed for the
  smart-cube line only (Particula). The mechanical Speed Cube's and classic cube's actual
  manufacturer remain `unknown`, exactly as pass 1 left them — nothing found this pass narrows
  that gap, and both family records say so explicitly rather than silently dropping the
  question.

**Unresolved for pass 3:**
- Whether the 2017-era non-magnetic Speed Cube and the current magnetic Speed Cube are one
  model with a `revisions[]` entry or two models joined by `succeeds` — no source describing
  the actual pre-magnetic mechanism was found this pass, only the category's bare existence.
- Same open question for Connected vs. Connected X.
- The full enumeration and per-product sourcing of the classic line's special/collaboration
  editions (Crystal, Phantom, Retro, Re-Cube, Coach Cube, Impossible, Disney 3x3, the six-plus
  licensed "Cuber" collaborations, the Mercedes-AMG F1 tie-in, the Wednesday Cube) as variants
  — deliberately deferred to pass 4, not attempted here.
- Whether Rubik's Phantom's or Rubik's Impossible's colour-reveal/colour-shift properties bear
  on `legality.wca_status` at the variant level — flagged in `rubiks-classic.yml`, not decided.

**Sources created this session (Rubik's):** `rubiks-com-2017-speedcube-category`,
`rubiks-com-3x3-cube-product-2024`, `rubiks-com-speed-product-2024`,
`rubiks-com-connected-x-product-2025`, `rubiks-com-classic-special-editions-2024` (a
deliberate six-page bundle, see that source's own `reliability_note` for why). Reused from
pass 1 without modification: `rubiks-history-2024`, `rubiks-com-2022`,
`tech-eu-particula-series-a-2021`, `particula-about-us-2024`.

---

# Parallel round — Agents A and B (merged into this canonical log)

The two batches below were researched concurrently by two `model-researcher` agents working in
isolated git worktrees on disjoint, exclusively-owned manufacturer queues, then verified and
merged by the main session. Each agent wrote its own log live; those two logs are reproduced
here verbatim and their separate files removed, so this file remains the single canonical Pass 2
record. The original per-agent files survive in git history on branches `pass2-batch-a` and
`pass2-batch-b`.

Two cross-agent effects are worth noting because neither would have occurred in a sequential run:

1. Agent B discovered that TheCubicle's in-page `Added:` dates repeat verbatim across unrelated
   products from different brands — a catalogue-migration artifact, not a per-product date. The
   main session relayed this to Agent A mid-flight, which then audited and corrected work it had
   already committed (`giiker-m3` dating, and one MoreTry source `archive_url` caught in the same
   audit). All later dating in both batches uses Wayback crawl timestamps as `before` bounds.
2. Agent B established a two-way classification for zero-family results, now used by both agents:
   type (a) scope exclusion (the catalogue holds no standard 3x3x3 mechanism) versus type (b)
   aftermarket/rebrand (the "brand" resells another manufacturer's cube modified, which belongs
   under the original manufacturer's tree per DATA_MODEL 4.3/4.4). The distinction matters: (a)
   means nothing was ever in scope, (b) means product exists but is filed elsewhere.


## Batch A log (giiker, particula, moretry, eastsheen, maru, mefferts, calvins-puzzle, witeden)

## GiiKER — 2 families

**Groundwork inspected first**, per instructions: `giiker-about-us-2022`,
`giiker-importgenius-address` (pass 1), `giiker-com-supercube-i3s-product-2022`,
`thecubicle-giiker-super-cube-i3s-2019`, `thecubicle-giiker-m3-3x3-2020` (halted prior run).
The last of these already anticipated a `data/families/giiker-m3.yml` in its own
`reliability_note`, written before the family file existed — that reference is now real.

**Question asked: do GiiKER's 3x3 products form genuine named families, or is the output too
product-specific?** Answer: two genuine families, not zero, but the total product range is
thin — this is a real, if narrow, positive finding, not a default "everything gets a family."

**Discovery.** No fresh WebSearch available (budget exhausted per environment warning) — all
discovery ran via `npm run wayback -- prefix` against `giiker.com/products`, `giiker.com/pages`,
`thecubicle.com/products/giiker`, and `speedcubeshop.com/products/giiker`, plus direct
`wayback get` fetches of live-page content.

- `thecubicle.com/products/giiker*` (18 URLs): only 4 distinct products — `giiker-3x3-sticker-set`
  (accessory, not a cube), `giiker-m3-3x3`, `giiker-super-cube-i2-2x2` (2x2, out of scope),
  `giiker-super-cube-i3s`. No other 3x3 line found at this retailer.
- `speedcubeshop.com/products/giiker*`: only `giiker-bluetooth-super-cube-i2-tiled` (2x2, out of
  scope) and `giiker-bluetooth-super-cube-i3s`. Consistent with TheCubicle's picture — no
  additional line.
- `giiker.com/products*` (55 URLs, current site): by 2022-2026 the site has pivoted almost
  entirely to non-cube smart games (Smart Four, Super Blocks, Super Slide, Tic-Tac-Toe Bolt,
  Smart Sudoku, Super Decoder, Super Ludo, Super Reversi). The only surviving cube-shaped
  products are `supercube-electronic-bluetooth-speed-cube-3x3` (i3S, 3x3) and `supercube®-i2`
  (2x2, out of scope). No GiCUBE product page and no separate "i3" (non-S) product page exist in
  the wayback index — `list *gicube*` returns zero captures.
- A 2026-08-19 capture of the i3S product page (fetched live via wayback) shows it still titled
  "SUPERCUBE® i3S" at $39.99 but marked "Sold out," and the site nav by that date has dropped
  the standalone "SUPERCUBE" category present in a 2025-07-17 capture of
  `giiker.com/pages/supercube-user-manual` (nav: "SUPER SLIDE SUPER BLOCKS ... SMART FOUR
  SUPERCUBE"). Read together: the SUPERCUBE name persisted as a distinct, named product/category
  from 2018 through at least mid-2025, and by August 2026 the product page survives but is
  unstocked and no longer in primary nav — a decline, not a confirmed discontinuation (no
  explicit "discontinued" statement found), recorded as such rather than guessed at.

**Families accepted (2):**
1. `giiker-supercube` — the smart/electronic 3x3 line. GiiKER's own about-us timeline
   (tier 1, `giiker-about-us-2022`) states directly: "2018 ... March: SUPERCUBE(R) i3 released -
   The world's 1st smart cube" and "2019 Supercube series presented at CES, New York and
   Nuremberg toy fair." TheCubicle's own i3S product copy (tier 2,
   `thecubicle-giiker-super-cube-i3s-2019`) independently states "The Giiker Super Cube i3S is
   an updated version of the previous Giiker Super Cube" — a manufacturer-external succession
   statement corroborating at least two named generations (i3, i3S) under one persisting name.
   `positioning: smart` (the vocab's own literal category, and GiiKER self-describes as "a
   global leader in developing and manufacturing smart cubes").
2. `giiker-m3` — the mechanical, non-electronic 3x3 sharing the SUPERCUBE shell/tooling.
   TheCubicle's own product copy (tier 2, `thecubicle-giiker-m3-3x3-2020`) states directly: "The
   Giiker M3 3x3 retains the feel and sound of the original Giiker Smart Cube but without the
   internal electronics." This is a real, separately-named, separately-specified product (its
   own weight/dimension spec table, "Added: 2018-10-30"), not a bare mention — kept as its own
   family, not folded into `giiker-supercube`, on the same reasoning the global pass-2 log
   applied to Rubik's Connected vs. the classic line and to GAN's smart lines (i Series/i
   Carry/ui Series kept separate from the mechanical flagship family): **smart/electronic
   capability vs. its absence is treated as always family-relevant in this archive**, not a
   variant-level configuration choice, because GiiKER's own retailer source frames it as a
   deliberate parallel product ("without the internal electronics") rather than an option chosen
   at checkout on the same listing.

**Boundary reasoning — why not one family, why not zero:**
- **Not zero**, because both SUPERCUBE and M3 are named, manufacturer/retailer-attested,
  separately specified products with real evidence behind them — this is not a "retailer
  collection page" or "loose marketing series" case the family definition explicitly warns
  against; SUPERCUBE in particular is corroborated by a tier-1 first-party naming/timeline
  source plus an independent tier-2 succession statement.
- **Not one family**, because M3's own defining feature *is* the absence of the thing that
  defines SUPERCUBE (electronics) — collapsing them would erase the exact distinction the
  archive's smart/mechanical treatment elsewhere (GAN, Rubik's) is built to preserve. Whether
  M3 is, at the *model* level, literally the same mold with the electronics compartment simply
  unpopulated, or a genuinely different internal geometry, is explicitly left as a pass-3
  question — the family-level call here is only that the two lines are named and marketed
  distinctly enough to warrant separate family records, not a claim about tooling.
- **GiCUBE (2014) not made a family.** Only a single ambiguous timeline sentence exists — "2014
  GiCUBE(R) released and birth of the idea of smart cube later on" — which does not even state
  GiCUBE was itself a smart cube (arguably implies the opposite: the smart idea came "later on").
  No product page, no spec, no retailer corroboration found anywhere in this pass. Recorded as
  an open lead in `giiker-supercube.yml`'s own description rather than built into a family or
  silently dropped.
- **GiiKER Super Cube i2 (2x2, tiled variants) excluded** — out of this archive's 3x3x3 scope by
  category, not a boundary call.
- **GiiKER 3x3 Sticker Set excluded** — an accessory, not a cube.

**Unresolved for pass 3:**
- Whether "SUPERCUBE i3" (the pre-i3S generation implied by TheCubicle's own succession
  sentence) ever had its own dedicated product page anywhere — not found this pass; the family
  record notes the gap rather than inventing a generation record from the timeline mention alone.
- Whether GiiKER M3 has any generation beyond the single 2018/2020-era product found.
- Current (2026) production/availability status of SUPERCUBE i3S — last captured "Sold out" with
  no explicit discontinuation statement.

**Sources created this session (GiiKER):** `giiker-com-supercube-i3s-2026-soldout` (new, see
below). Reused without modification: `giiker-about-us-2022`, `giiker-importgenius-address`,
`giiker-com-supercube-i3s-product-2022`, `thecubicle-giiker-super-cube-i3s-2019`,
`thecubicle-giiker-m3-3x3-2020`.

---

## Particula — 1 family

**Task framing.** "Determine whether its smart-cube products form coherent named 3x3 family
lineages. Note a prior run found evidence Particula manufactured the Rubik's smart line — that
relationship already exists; do not restate it as a new finding." Confirmed:
`data/families/rubiks-connected.yml` already exists (created by a different session working
the Rubik's queue) and already cites the Particula manufacturing relationship correctly. Not
touched, not duplicated, not re-attested here.

**Families accepted (1):** `particula-gocube` — Particula's own independently-branded smart 3x3
line, distinct from the Rubik's-branded line it separately manufactures.

**Discovery, and a genuine domain-collision hazard caught before it did damage.** Initial
exploration of `gocube.com` (without "get") looked promising — the domain has Wayback captures
stretching back to 2007 — but fetching actual page content revealed it is, at every capture
examined from 2018 through 2024, an entirely unrelated Quebec moving/storage-container-rental
company also called "Go Cube" (its own 404 page reads "© GoCube 2015"). This is a coincidental
name collision, not a rebrand, predecessor, or shared-ownership situation. **No fact in this
family record is sourced from `gocube.com`.** The correct historical domain, found by checking
`particula-about-us-2024`'s own product-portfolio wording for a matching brand-specific URL
pattern, is `getgocube.com` (used roughly 2019-2022, later folded into the umbrella
`particula-tech.com` storefront visible today). Flagging this prominently in the family
record's own description because it is exactly the kind of trap a future researcher working
faster than this pass did could fall into.

**What `getgocube.com`'s own December 2019 homepage shows, directly (tier 1):** two
concurrently-sold 3x3 SKUs, "GoCube Basic" ($69.95) and "GoCube Edge Full Pack" ($79.95, plus a
"GoCube Edge Fam Pack" bundle). A third model, "GoCube-X," appears at TheCubicle by November
2021, described in the retailer's own copy as "a new, less expensive smart cube from the famous
brand... non-magnetic, but still has all of the tracking of the original GoCube" — a stated
deliberate budget sibling, not an unrelated product. The current (2026) flagship SKU is still
marketed as "GoCube Edge Full Pack" per a live capture of Particula's own site, meaning the
"Edge" name alone has persisted essentially unchanged for at least seven years across every
capture checked.

**Boundary reasoning — one family, not three, and not zero.** All three models (Basic, Edge,
X) share the same manufacturer-first-party name ("GoCube") and functional description (app-
connected, real-time move tracking) across every source found; nothing found treats any of them
as belonging to a different lineage or as an independent product with its own separate identity.
This is the same "persisting shared name across a numbered/tiered range" reasoning used
elsewhere in this project's pass 2 work (e.g. moyu-weilong's persisting "WeiLong" name across
GTS/GTS2/GTS3/WR generations) — a positive family case, not a default. Whether Basic-vs-Edge or
Edge-vs-X represent genuinely different tooling/mechanisms, or configuration differences at the
same design (magnetic vs. non-magnetic, e.g.), is explicitly deferred to pass 3 per DATA_MODEL
§4.2 — this pass only establishes that they are one named family.

**Not created as a separate finding: Rubik's Connected under Particula.** Already exists at
`rubiks-connected.yml`, manufacturer `rubiks`, per the standing instruction. This session's own
new source `particula-tech-com-gocube-2026` incidentally shows Particula's own storefront filing
"Rubik's Connected" under the same "GoCube" shop-navigation category commercially — recorded in
that source's own reliability_note as a merchandising fact only, explicitly not treated as
family-boundary evidence, since `rubiks-connected` is a separately-branded product under a
different manufacturer's brand identity (Rubik's), not a GoCube-branded product.

**GoCube 2x2 excluded** — out of this archive's 3x3x3 scope by category, found alongside every
3x3 model at every retailer/manufacturer source checked.

**Unresolved for pass 3:**
- GoCube's exact original launch year — no source found this pass states it directly; recorded
  at `introduced: before 2019` rather than guessed. A Kickstarter-campaign-page archive or press
  coverage of the original launch, not chased this pass (WebSearch budget exhausted), would
  likely resolve this quickly for a future session.
- Whether "GoCube Basic" and "GoCube-X" are the same design under two names or two separate
  budget-tier designs.
- Full current (2026) GoCube model range beyond what the "All Cubes" nav bare listing shows
  (Edge Full Pack, 2x2, Bundle Pack) — not enumerated further since model/variant enumeration is
  out of this pass's scope.

**Sources created this session (Particula):** `getgocube-com-2019-basic-edge-skus`,
`getgocube-com-about-2019`, `thecubicle-gocube-edge-3x3-2020`, `thecubicle-gocube-x-3x3-2022`,
`particula-tech-com-gocube-2026`. Reused without modification: `particula-about-us-2024`,
`tech-eu-particula-series-a-2021` (both already existed on the manufacturer record; not
re-attested at the family level beyond a cross-reference).

---

## MoreTry — 1 family

**Task framing.** "Recovered from a TheCubicle `/products/` prefix sweep; its footprint may be
thin. Do not manufacture families simply because the manufacturer exists." Inspected the
existing `thecubicle-moretry-live-2026` source first, per the standing groundwork-inspection
practice — it already named "MoreTry Tianma X3 (V1 through V4)" and "MoreTry TianMa X3+"
directly, which was enough of a lead to justify a dedicated `thecubicle.com/products/moretry*`
prefix sweep rather than assuming thinness.

**Finding: the footprint is not thin at all — it is unusually rich and completely
single-line.** A `thecubicle.com/products/moretry*` sweep (26 URLs, 19 distinct 3x3 product
slugs after de-duplicating query-string variants) and a parallel `speedcubeshop.com` sweep both
show **every single MoreTry 3x3 product carrying the "Tianma X3" name**, in a real, described,
manufacturer-numbered generation sequence (V1 Standard -> V3 Snap -> V4 MagLev, plus V2
Enhanced, V3 Plus, a "+" suffix range, and a "ZCube Edition" collaboration also tied to the
SAOCube naming lead that originally surfaced MoreTry in pass 1). This is the strongest,
best-corroborated single-family case in this agent's queue so far — direct product-copy
evidence of an actual mechanism change between named versions (V1's plain corner/edge
magnetization vs. V4's "magnetic levitation system... 6 magnetic rings instead of 2," replacing
the spring outright), not merely a retailer's own version numbering.

**Families accepted (1):** `moretry-tianma-x3`.

**Boundary reasoning — one family, not several, and not zero.** Zero was never seriously in
play once the prefix sweep ran: 24 of MoreTry's 27 total TheCubicle SKUs are 3x3s and every one
of them is a "Tianma X3" variant of some kind (the remaining 3 are own-branded lubricants, out
of category). The only real boundary question was whether "V1," "V3/V3 Plus," "V4/MagLev," and
the "+" range should be split into separate families or models — resolved by treating them as
one family per the persisting shared name (the same reasoning moyu-weilong and particula-gocube
in this session use), with the actual model-vs-variant boundary between versions explicitly
left to pass 3, since a mechanism-level change (the V4 MagLev spring replacement) is exactly the
kind of fact §4.2 says should decide a model split, not a family split.

**A data-quality catch worth flagging for pass 3/5.** Every MoreTry product page checked (V1,
V3, V4) carries the identical retailer "Added: 2022-03-14" date regardless of version or actual
capture date — almost certainly a shared brand-onboarding-date templating artifact at
TheCubicle, not each version's real release date. Recorded honestly in each source's own
reliability_note and reflected in the family's `introduced` attestation (`uncertain` despite
three agreeing sources, precisely because the agreement is not independent).

**A fetch-reliability note.** One attempt to retrieve the "V2 (Enhanced)" product page returned
content that read as belonging to a different version (V4's own description text appeared under
the V2 URL on one `wayback get` call without an explicit timestamp) — not used as evidence
anywhere; treated as an unreliable capture rather than cited. Timestamped re-fetches of the same
URL then failed outright ("fetch failed") on three consecutive retries. Per this project's own
wayback-tooling guidance, a failed fetch is not treated as evidence of absence — V2's own
description is simply left unestablished this pass, not guessed at from the (probably
mismatched) content that did load.

**An unconfirmed domain lead, deliberately not chased into a source.** `moretry.com` has
Wayback captures from 2011-2012 and again 2021 — not verified this pass as actually belonging
to this cube manufacturer (the same kind of coincidental-name-collision risk already caught and
ruled out for `gocube.com` earlier in this session). Flagged in the family record's own
description as an open lead, nothing built on it.

**Unresolved for pass 3:**
- Exact release dates for each numbered version (all currently only bounded by the shared,
  unreliable "2022-03-14" retailer date).
- V2 (Enhanced)'s own mechanism description — not reliably retrieved this pass.
- The relationship between the numbered V1-V4 range and the unnumbered "TianMa X3+" /
  track-count-named range (successor tier? parallel budget/premium split? pass 3 question).
- Whether `moretry.com` is genuinely this manufacturer's own domain.

**Sources created this session (MoreTry):** `thecubicle-moretry-tianma-x3-v1-2023`,
`thecubicle-moretry-tianma-x3-v3-snap-2022`, `thecubicle-moretry-tianma-x3-v4-maglev-2022`.
Reused without modification: `thecubicle-moretry-live-2026` (pass 1).

---

## Eastsheen — 1 family (a genuine judgement call, documented in full)

**Groundwork inspected first.** Pass 1's `data/manufacturers/eastsheen.yml` already flags this
manufacturer as a deliberate "bracket case" and had already found and resolved a direct
contradiction: the Speedsolving wiki's own dedicated Eastsheen page states "East Sheen does not
produce 3x3 cubes," while TheCubicle's own structured product listing for an "Eastsheen 3x3x3
Cube with Wall Stickers" (spanning captures 2021-2025) names "Eastsheen" as the manufacturer of
record. Pass 1 preferred the direct retailer evidence; this pass applies that same resolution
at the family level rather than re-litigating it, per the instruction to preserve prior review
flags rather than silently re-deciding them.

**Discovery to check whether the footprint is wider than one SKU.** A
`thecubicle.com/products/eastsheen*` prefix sweep found exactly one 3x3 SKU across the entire
retailer (the same Wall Stickers listing already sourced) plus five 2x2/4x4/5x5 SKUs, all out
of this archive's 3x3x3 scope. A `speedcubeshop.com/products/eastsheen*` sweep found **zero**
3x3 products at all — only 2x2 (mini/keychain, Super), Super 4x4, and Super 5x5 — independently
consistent with the wiki's "does not produce 3x3 cubes" framing rather than contradicting it
further. Re-fetching the wiki page live (WebFetch, no archive.org capture available/used)
confirmed its full product list: 2x2 (Types A/C/E/M), 4x4 and 5x5 (Types A/C/E/M/P), and
keychain mini/multi cubes — no 3x3 anywhere on the page, and no release dates given for
anything.

**Family accepted (1):** `eastsheen-3x3` — the base "standard Eastsheen 3x3" implied directly
by TheCubicle's own product copy ("The Eastsheen 3x3x3 Cube with Wall Stickers is a standard
Eastsheen 3x3 with stickers applied..."), read as the underlying product name, with "Wall
Stickers" left as a pass-4 sticker-variant lead rather than folded into the family name or
split into its own model.

**Boundary reasoning — why one thin family, not zero.** This was the closest call in this
agent's queue so far. Arguments for zero (matching the LanLan precedent): only one retailer
carries it, no second source corroborates it, and a dedicated community wiki page directly and
specifically denies this manufacturer makes 3x3s at all. Arguments for one (which won): unlike
LanLan's Void Cube (a bare undescribed name with no spec table) or ShengShou's rejected Gem/Tank
(a single dismissive sentence), this product has a full structured spec table (weight,
dimensions, a specific retailer-attested manufacturer field), a substantive descriptive
sentence naming an implied base product, and four-plus years of continuous retail listing
(2021-2025) at a major English-language retailer — a genuinely different evidentiary shape from
every case rejected elsewhere in this project's pass 2 work on thinness grounds. The deciding
factor was durability of the retail listing plus real specification data, not name-recognition
or manufacturer prominence.

**Recorded, not resolved: the wiki/retailer contradiction stays live.** The family record's own
`/description` attestation is deliberately set to `reported` rather than `probable`, and its
prose states the contradiction explicitly rather than picking a side quietly. A future pass with
capacity to find an Eastsheen first-party source (the company's own domain has been a parked
page since at least 2011, per pass 1) or a second independent retailer could settle this either
way.

**No new sources created this manufacturer** — both facts needed (the wiki's product list and
the retailer's product copy) were already sourced in pass 1; this pass only re-verified them
(the wiki live, the retailer sweep for corroboration) and applied the family-level boundary call.

---

## Cross-agent correction: TheCubicle "Added:" dates are not reliable per-product evidence

Agent B (working a disjoint queue) flagged that the literal string `Added: 2018-09-11` recurs
verbatim across unrelated products from several different brands on TheCubicle — a
catalogue-migration/onboarding artifact, not a real per-product date — and warned that any
repeated "Added:" date should be treated the same way. Acting on this before continuing:

- **`data/families/giiker-m3.yml` corrected.** Its `/introduced` attestation originally relied
  on TheCubicle's in-page `Added: 2018-10-30` for the GiiKER M3 product. Checked and confirmed:
  that exact string also appears verbatim on the unrelated, later-generation GiiKER Super Cube
  i3S page (thecubicle-giiker-super-cube-i3s-2019) — the same artifact pattern. Corrected to use
  the source's genuine external Wayback crawl timestamp (2020-09-20) as an honest upper bound
  instead, downgraded from `reported` to `uncertain`, and the correction is documented directly
  in the record's own attestation note (not silently fixed).
- **MoreTry's shared `Added: 2022-03-14`** had already been independently caught and correctly
  handled (recorded at `uncertain` specifically because the date recurred identically across
  three different version pages) before this cross-agent note arrived — no change needed there,
  confirmed consistent with the same finding.
- **A related provenance slip caught and fixed while auditing this:** the source
  `thecubicle-moretry-tianma-x3-v3-snap-2022` had recorded an `archive_url` timestamp
  (2022-07-06) that did not match the capture its own quoted excerpt actually came from
  (confirmed via the tool's own snapshot-comment output to be 2025-07-10, since the
  no-timestamp `get` call resolved to the latest capture, not the nearby 2022 one visible in the
  CDX prefix listing). Fixed the `archive_url` to point at the exact 2025-07-10 snapshot and
  added a correction note; the source id keeps its original '-2022' suffix per this project's
  immutable-id policy, flagged explicitly so the mismatch isn't silently carried forward. Two
  further sources (`thecubicle-moretry-tianma-x3-v1-2023`,
  `thecubicle-moretry-tianma-x3-v4-maglev-2022`) had `archive_url` timestamps accurate to the
  day but not the exact captured minute — tightened to the exact snapshot timestamp for
  precision, no content or date claims changed.
- **Going forward (Maru onward in this queue):** no TheCubicle "Added:" field is treated as
  dating evidence at all unless independently cross-checked against unrelated products and
  found not to repeat. Wayback's own external crawl timestamps (the `snapshot:` line the
  `wayback get` tool itself reports) are used instead wherever a bound is needed, and are
  clearly distinguished in every new source's reliability_note as crawl-time evidence, not
  claimed release dates.
- **Zero-family and sub-brand-flagging precedents from Agent B, noted for consistency, not
  acted on outside my own queue:** B returned zero families for Z-Cube because its 3x3 catalogue
  turned out to belong under the original manufacturer's tree (DATA_MODEL §4.3/4.4), and B found
  stronger sub-brand evidence for two entities but deliberately made no manufacturer-record edit,
  flagging for human review instead. Both are the same discipline already being applied in this
  log's own decisions (e.g. Eastsheen's contradiction recorded rather than resolved, GoCube
  never merged into Rubik's Connected). No manufacturer-record edits made outside my own queue.

---

## Maru — 4 families

**Groundwork inspected first.** Pass 1's `data/manufacturers/maru.yml` had already found and
sourced Maru's original ~2011-era "Maru 3x3," explicitly flagged as pre-dating this archive's
2016 start, and explicitly left open whether Maru had any later, in-window product (a 2020
domain capture with a cube-branded title suggested the company/site persisted, but "no specific
later product was located this pass").

**This pass closes that gap, and it opens up considerably.** A `thecubicle.com/products/maru*`
CDX prefix sweep (67 URLs) found not one but **two entirely separate, previously-undocumented
named Maru 3x3 lines** — "CX3" and "VX-3" — plus a documented "smallest mass-produced 3x3 in the
world" novelty product ("Nano Cube," 15mm) and a wide range of Maru-branded accessories, lube,
and, notably, **aftermarket magnetic core DIY kits for other manufacturers' cubes** (RS3M 2020,
TengYun V1, Tornado V2/V3, WeiLong WR M 2021, YuLong V2) — Maru operates partly as an
aftermarket-parts service for other brands' flagship cubes, a fact worth flagging for a future
pass even though it does not itself produce a new 3x3 family (Maru's *own* cubes are the only
thing in scope for this pass; the DIY core kits modify other manufacturers' variants and belong,
if anywhere, under those manufacturers' own `modified_from`/`service` treatment per DATA_MODEL
§4.3 — not investigated further here, flagged as a lead only).

**Families accepted (4):** `maru-3x3` (the original ~2011 product, already sourced in pass 1,
carried forward with a documented "Special Patterns" sticker-variant lead added this pass),
`maru-cx3` (a design-credited flagship-tier 3x3, "inspired by our friend Cyoubx, who is a
speedcuber himself," existing by at least 2019-2020), `maru-vx-3` (a plain, budget-positioned
3x3, "no frills or fancy features," existing by at least 2022, with magnetic Core M/Core M
MagLev variants left as pass-4 leads), and `maru-nano` (a 15mm novelty DIY-kit cube carrying a
specific "smallest mass-produced 3x3 cube in the world" claim).

**Boundary reasoning — why four separate families, not one evolving lineage.** The temptation
here was to read "3x3 -> CX3 -> VX-3" as one persisting Maru flagship succession the way
moyu-weilong's persisting name was read earlier in this project. Resisted deliberately: no
source anywhere this pass — not TheCubicle's own copy for any of the three, not the (thin)
Speedsolving wiki page — states or implies a succession between them. They are three
completely differently-named products from the same manufacturer with no stated lineage
relationship, which per this project's own standing practice (QiYi Bullfight/Thunderclap, YJ
SuLong/ChiLong/YuLong) is recorded as separate families, not merged into an invented
continuity just because they share a manufacturer and a broad category.

**A genuine judgement call on the Nano Cube.** Given the standing warning against "manufacturing
families simply because the manufacturer exists," the Nano Cube's inclusion (and the parallel
exclusion of the "Mini 3x3 30mm" and "Mini 3x3 Keychain Cube" found in the same sweep) turned on
one thing: the Nano Cube carries a specific, falsifiable, documented significance claim ("the
smallest mass-produced 3x3 cube in the world") matching RESEARCH_SPEC §2.2's own "documented
production first" language for conditional admission, where the Mini 3x3 carries only a
comparative-but-unremarkable "almost twice as small as most conventional 3x3 cubes." This is
the same kind of line DianSheng's Stickerless 3x3 (kept, for a named media appearance) and
ShengShou's Gem/Tank (rejected, for a bare dismissive sentence) drew elsewhere in this project —
applied here to a different kind of evidence (a specific claim vs. a media appearance) but the
same underlying test: is there something concrete and specific here, or just a name.

**Dating discipline applied throughout, per the cross-agent correction above.** No family in
this manufacturer uses any TheCubicle in-page "Added:" field as evidence. Every `introduced`
value here is a `qualifier: before` bound derived from genuine external Wayback crawl
timestamps found in this pass's own CDX prefix sweep, and every attestation says so explicitly.

**Unresolved for pass 3:**
- Whether Maru's aftermarket magnetic-core DIY kits for RS3M/TengYun/Tornado/WeiLong WR
  M/YuLong belong anywhere in this archive as `service`/`modified_from` records under those
  *other* manufacturers, and whether Maru itself should also carry `kind: service` alongside
  `kind: manufacturer` on its own record (a manufacturer-record change, not made this pass —
  flagged only).
- VX-3's Core M and Core M MagLev variants' own descriptions (not independently retrieved).
- Whether the Mini 3x3 (30mm) and Mini 3x3 Keychain Cube warrant their own family records in a
  future pass with more time/evidence.
- Exact release years for CX3, VX-3, and Nano — all currently only bounded by Wayback crawl
  timestamps, not stated dates.

**Sources created this session (Maru):** `thecubicle-maru-3x3-special-patterns`,
`thecubicle-maru-cx3`, `thecubicle-maru-vx-3`, `thecubicle-maru-nano-3x3`. Reused without
modification: `thecubicle-maru-3x3`, `speedsolving-wiki-maru` (both pass 1).

---

## Meffert's — 1 family

**Groundwork inspected first.** Pass 1's `data/manufacturers/mefferts.yml` had already run a
49-slug `thecubicle-*` sweep and found the company "overwhelmingly a shape-mod specialist"
(Pyraminx, Skewb, Gear Cube, Ghost Cube, Fisher Cube, Megaminx, Mastermorphix and similar), with
exactly two slugs suggesting non-standard 3x3 variants and no standard WCA-legal 3x3 flagship at
all — the pass-1 `scope_class` decision for either was explicitly deferred here.

**Discovery.** Re-ran the same `thecubicle.com/products/mefferts*` prefix sweep (49 unique
slugs) to check for anything missed and found a third relevant slug beyond pass 1's two:
"Meffert's 3x3 Egg" (a metallized egg-shaped shape mod). Fetched all three product pages
directly.

**Families accepted (1):** `mefferts-kokonotsu` — the "Kokonotsu Pillow 3x3," described in
TheCubicle's own copy as "a non-traditional 3x3 puzzle variant that uses solid-colored blocks as
colors instead of stickers. There are 9 colors in total, and the blocks must be arranged such
that each color only appears once on each side" — a genuinely distinctive puzzle mechanism, not
a bare name.

**Rejected/deferred (2), for a consistent, stated reason:**
- **Hollow Cube 3x3** — described only as "a puzzle with hollow pieces! Turning is very clicky
  due to the ball bearing alignment system. A fun novelty puzzle for any collector." Real but
  generic; no distinguishing mechanism claim beyond "hollow," no significance statement.
- **3x3 Egg** — described only as "a metallized egg puzzle that is a shape modification of a
  3x3... a high quality, metallized finish with the Meffert's logo." Purely a decorative
  shape/finish variant with no further distinguishing detail.

Both are thinner than Kokonotsu on the exact same axis this pass has applied consistently
elsewhere (Maru's Mini/Keychain vs. Nano Cube; ShengShou's rejected Gem/Tank vs. its accepted
thin-but-real families): a bare descriptive name and a generic one-sentence description is not
enough on its own, but a specific, distinctive, well-described mechanism or claim is. Recorded
here rather than built into thin family records that would read as manufactured coverage.

**A significant unresolved lead surfaced by customer reviews, deliberately not acted on: a
possible "Molecube" rebrand/resemblance.** Two independent customer reviews on the Kokonotsu
listing state, unprompted, that the puzzle "is the same as the molecube puzzle that is sold in
many physical stores." This raises a real DATA_MODEL §4.4 `rebrand_of` question — but per that
same rule, "visual resemblance alone is a lead, not a claim," and unattributed customer-review
testimony is weaker evidence than even that. No relationship recorded; the family stays under
`mefferts` per the retailer's own structured attribution, and the lead is flagged explicitly in
both the source's reliability_note and the family record's own description so a future pass can
chase "Molecube" toward a citable source rather than this identity being silently assumed
settled. This is the same discipline Agent B's own Z-Cube finding illustrates from the other
side (a brand's catalogue turning out to belong to a different manufacturer's tree) — here the
evidence is far too weak to make that call, so it is recorded as a question, not an answer.

**Dating discipline applied, per the cross-agent correction above.** No TheCubicle in-page
"Added:" field used as evidence; `introduced` is a `qualifier: before` bound from the genuine
Wayback crawl timestamp only.

**Unresolved for pass 3:**
- The Molecube resemblance lead.
- Kokonotsu's `scope_class: conditional` justification and admission (almost certainly
  non-WCA-legal given the described 9-colour constraint).
- Whether Hollow Cube 3x3 or 3x3 Egg deserve reconsideration in a future pass with more time or
  better sourcing.

**Sources created this session (Meffert's):** `thecubicle-mefferts-kokonotsu-pillow-3x3`.
Reused without modification: `mefferts-official-site-2024` (pass 1, cited only via the
manufacturer record, not directly on this family).

---

## Calvin's Puzzle — 3 families

**Groundwork inspected first.** Pass 1's `data/manufacturers/calvins-puzzle.yml` already
characterised this brand as "primarily a designer/maker of non-WCA shape mods, cuboids, and
novelty twisty puzzles rather than mainstream WCA-legal 3x3 speedcubes," explicitly deferring
`scope_class` decisions to pass 2/4.

**Discovery.** A `thecubicle.com/products/calvins*` CDX prefix sweep returned roughly 90
distinct product slugs — overwhelmingly cuboids (3x3x4, 3x3x5 in a dozen-plus named
sub-variants), 4x4-based "House Cube"/"Glassy House Cube" shape mods, Megaminx/Square-1/Skewb
variants, and slide puzzles, confirming pass 1's characterisation. Of everything with a 3x3x3
mechanism or shape, five candidates stood out on their own described mechanism: "Full-Function
Crazy 3x3 (Center-Locking)," "Bandaged 3x3 (Maze-300 Cube)," "Crazy Mirror 3x3x3" (4- and
6-Circle configurations), "Horror Mirror 3x3 Cube," and "Mirror Camouflage 3x3x3." Fetched and
read all five product pages directly.

**Families accepted (3):** `calvins-crazy-3x3` (locked, non-turning center circles — "It can
still be fully scrambled and offers quite the challenge if you're never solved a Crazy puzzle
before"), `calvins-crazy-mirror-3x3` (the same "Crazy" mechanism concept combined with a
mirror-cube shape, circles independently rotating — 4-Circle and 6-Circle configurations kept
as one family/model per DATA_MODEL §4.2, not split), `calvins-bandaged-3x3-maze-300` (a
"standard 3x3 with 3D printed tiles attached to the pieces" restricting movement).

**Rejected (2), for two different, specific reasons:**
- **Mirror Camouflage 3x3x3** — its own retailer description states directly "Calvin's Mirror
  Camouflage 3x3x3 is a **4x4** with 3D printed pieces attached to the outside to make it
  resemble a standard 3x3 mirror cube." Despite the "3x3x3" in its own product name, this is
  actually a 4x4x4 mechanism — out of this archive's 3x3x3 scope by category, not a boundary
  judgement call. A genuinely useful catch: a product's own name is not reliable evidence of
  its actual mechanism size, and this pass read the full description rather than trusting the
  slug.
- **Horror Mirror 3x3 Cube** — described only as "a standard mirror 3x3, but included in the
  package is a set of two solution stickers. Once applied, you can solve it by shape or by
  color!" This is a real, distinct accessory-bundle idea, but the base object itself is "a
  standard mirror 3x3" (a generic, widely-produced puzzle category, not a Calvin's-specific
  mechanism the way the other three are), and the distinguishing feature (bundled solution
  stickers) reads as a packaging/accessory difference rather than a design difference. Recorded
  as an open lead rather than built into a family, on the same "generic name plus one
  incremental detail" reasoning that excluded Meffert's Hollow Cube 3x3 and 3x3 Egg earlier in
  this queue.

**Boundary reasoning — three separate families, not fewer.** `calvins-crazy-3x3` and
`calvins-crazy-mirror-3x3` share the word "Crazy" and a locked/independently-rotating-circle
concept, but are described as genuinely different objects — one a standard-shape cube with
non-turning centers, the other a mirror-shape cube with independently *rotating* circles glued
on via 3D-printed extensions. Kept separate rather than merged under one "Crazy" family, per
this project's standing "a shared word is not shared design" discipline (QiYi Bullfight/
Thunderclap, YJ SuLong/ChiLong/YuLong).

**A modification/service question flagged, not resolved, on the Bandaged 3x3.** Its own
description ("a standard 3x3 with 3D printed tiles attached to the pieces") reads closer to a
base cube plus an added modification than a from-scratch design — explicitly flagged in the
family record's own description for a future pass to weigh under DATA_MODEL §4.3's
`modified_from`/`service` framing, rather than silently treated as an independent Calvin's
design. Not acted on this pass since the base cube's own manufacturer is not stated by the
source available.

**Dating discipline applied, per the cross-agent correction above.** No TheCubicle in-page
"Added:" field used as evidence anywhere in this manufacturer; every `introduced` is a
`qualifier: before` bound from genuine Wayback crawl timestamps only.

**Unresolved for pass 3:**
- The Bandaged 3x3's possible service/modification framing.
- `scope_class: conditional` justification and admission for all three families (all are
  certainly non-WCA-legal mechanisms).
- Whether Horror Mirror 3x3 warrants reconsideration with more time/evidence.
- Calvin's Puzzle's own country/founding remain unknown, unchanged from pass 1 — not
  re-investigated this pass since it was outside this pass's scope.

**Sources created this session (Calvin's Puzzle):** `thecubicle-calvins-full-function-crazy-3x3`,
`thecubicle-calvins-bandaged-3x3-maze-300`, `thecubicle-calvins-crazy-mirror-3x3x3`. No pre-
existing product-level sources existed to reuse beyond the manufacturer-register sources already
on `data/manufacturers/calvins-puzzle.yml`.

---

## WitEden — 3 families (final manufacturer in this agent's queue)

**Groundwork inspected first.** Pass 1's `data/manufacturers/witeden.yml` already characterised
WitEden per the Speedsolving wiki as having "since 2010... focused on unusual designs such as
Crazy cubes, Super cubes, cuboids etc.," noted its historically significant pre-2016 "GuoBing
(Type C)" 3x3 (2006-2011, popular circa 2007-2011, not re-confirmed as still sold in-window),
and explicitly deferred any in-window 3x3 finding to pass 2.

**Discovery.** A `thecubicle.com/products/witeden*` CDX prefix sweep (~65 slugs) confirmed the
catalogue is overwhelmingly cuboids (2x2x4 through 3x3x17) — out of 3x3x3 scope by shape — plus
a genuine cluster of 3x3x3-shaped novelty mechanisms matching the wiki's own "Crazy cubes,
Super cubes" language directly: a "3x3x3 Mixup" line (four named variants: Plus, Edge-Split,
30-Degree Turn, and one credited to "Oskar," read as Oskar van Deventer though not
independently verified), a "Super 3x3x3," and a "Camouflage 3x3x3." Fetched and read all of
these plus two more (AI Bandaged Cube, Rainbow Cube) that turned out, on reading the full
description, not to be 3x3x3-shaped at all.

**Families accepted (3):** `witeden-mixup-3x3` (bundling the four "3x3x3 Mixup" variants under
one persisting name — see below for why bundled, not split), `witeden-super-3x3x3` (a
"Super cube" mechanism, positioning attested at `probable` rather than `uncertain` because the
wiki independently and specifically names "Super cubes" as one of WitEden's own documented
post-2010 specialties, not just this pass's own inference from a product name), and
`witeden-camouflage-3x3` (a disguised-mechanism 3x3x3).

**Rejected (2), both a shape/category check, not a boundary judgement:**
- **AI Bandaged Cube** — its own description states "It resembles a mix between a 4x4 and a
  2x2," not a 3x3x3.
- **Rainbow Cube** — "The tetradecahedral shape is quite unique," a non-cubic shape entirely.

**A naming trap explicitly caught and cross-referenced.** Earlier this queue, Calvin's Puzzle's
"Mirror Camouflage 3x3x3" turned out, on reading its full description, to actually be a
disguised 4x4x4. WitEden's similarly-named "Camouflage 3x3x3" was checked against exactly this
risk before being accepted — its own description ("a 3x3x3 cube with a thin middle layer...
camouflaged... an irregular center of rotation") confirms a genuine 3x3x3 mechanism. Both the
family record and its source note this check explicitly, as a reusable lesson: **a product's own
name, including a stated cube size, is not reliable evidence of its actual mechanism** — this
pass read every full description rather than filtering by slug/title alone, and it mattered
twice in one queue.

**Boundary reasoning — the Mixup line bundled as one family, unlike this queue's other
"same word, different design" splits.** Unlike Calvin's `calvins-crazy-3x3` vs.
`calvins-crazy-mirror-3x3` (kept separate: same "Crazy" word, genuinely different mechanisms),
all four WitEden "3x3x3 Mixup" variants are explicitly the same base Mixup-type turning concept
with one added mechanical wrinkle each (edge-splitting, a 30-degree unlock, a named designer's
variation) — read as model/variant-level distinctions per DATA_MODEL §4.2, not separate designs,
and bundled into one family accordingly. This is the first case in this agent's entire queue
where a "same name, several variants" pattern was bundled rather than split, and the write-up
explains why the test came out differently here than at Calvin's.

**Dating discipline applied, per the cross-agent correction above.** No TheCubicle in-page
"Added:" field used as evidence anywhere in this manufacturer; every `introduced` is a
`qualifier: before` bound from genuine Wayback crawl timestamps only.

**Unresolved for pass 3:**
- Whether the historically significant pre-2016 "GuoBing (Type C)" 3x3 (2006-2011) was ever
  resold within the archive window, or should be recorded as `scope_class: reference_only`
  identity only per RESEARCH_SPEC §2.4 (not created as a family this pass — no in-window
  evidence found, and pass 1 already flagged this exact gap without closing it).
- `scope_class: conditional` justification and admission for all three families (all certainly
  non-WCA-legal).
- Independent verification of the "Oskar" (van Deventer) design credit on the Mixup variant.
- Model/variant-level split decisions within `witeden-mixup-3x3`.

**Sources created this session (WitEden):** `thecubicle-witeden-mixup-3x3-variants`,
`thecubicle-witeden-super-3x3x3`, `thecubicle-witeden-camouflage-3x3x3`. Reused without
modification: `thecubicle-witeden-mixup-plus`, `speedsolving-wiki-witeden` (both pass 1).

---

## Queue complete

All eight manufacturers in this agent's assigned queue (giiker, particula, moretry, eastsheen,
maru, mefferts, calvins-puzzle, witeden) are now researched, sourced, logged, and committed.
Final tally: 2 + 1 + 1 + 1 + 4 + 1 + 3 + 3 = **16 families** across 8 manufacturers, plus one
cross-agent-triggered correction commit. See the manufacturer report at the end of this
session's final response for the one-line-per-manufacturer summary with commit SHAs.

## Batch B log (cube4you, zcube, huameng, guoguan, mojue, mohuanshousu, senhuan, yancheng, verypuzzle, limcube, escube, pbcube, xinlexin, guojia, lefun, kungfu, hellocube, newisland, cubestyle, cubetwist, haitun, ninja)

## Cube4You — 1 family

**Candidates considered:** the generic house-brand "3x3x3 DIY Speed Cube" (multiple
colourways, sold via cube4you.com's own storefront); the wider reseller catalogue on the same
storefront (DaYan, QJ, ShengShou, Diansheng, Eastsheen, Lanlan, Meffert's, MF8, Shengen, Type
C) — **not Cube4You's own products, excluded**; assorted novelty "blind tile/dice/maze/arrow"
decorated cubes found on the same category page — undated beyond a single 2016/2017 capture,
no distinct model name beyond a decoration description, **not created as a family**, recorded
here as a lead only, same treatment as other thin undocumented product groups in this pass
(cf. Cyclone Boys' four "older models" in `global-pass2-families.md`); an earlier "Gas-Assisted
3x3x3 Cube" naming seen only in pre-window (2007) prefix-crawl hits — noted as a probable
predecessor name for the same generic line, not separately actioned.

**Accepted (1):** `cube4you-3x3` — Cube4You's own-branded, unassembled 57mm ABS 3x3, the only
named 3x3x3 line this pass found Cube4You itself (as opposed to brands it resells) selling
within the archive's 2016-2026 window. Directly evidenced by Cube4You's own storefront
(2017-04-22 capture, tier 1 for its own product's existence/specs per DATA_MODEL §5.1).

**Rejected:** none beyond the leads above — no second named Cube4You house-brand 3x3 line was
found.

**Boundary reasoning:** This is a single generic budget product, not a design succession —
treated the same way `fanxin-3x3` was in the main pass-2 log: a genuine, named,
manufacturer-sold base 3x3 is a family even without further model-name branding or multiple
generations. No `succeeds`/model-generation question arises at this pass; that is pass-3
material.

**Historical context.** Pass 1's own `data/manufacturers/cube4you.yml` already establishes
Cube4You as a circa-2007-founded China-based early online seller of DIY speedcube kits, still
operating a live storefront through at least 2022 but with its later (2019+) product range
shifting toward 3D-printed novelty puzzles. This pass's own wayback browsing (`prefix
cube4you.com`, `list`/`get` on `3x3x3-c-7_9.html`) confirms the classic Zen-Cart-style
storefront, including the house-brand 3x3 line, was still live through at least 2017-04-22;
no equivalent house-brand 3x3 category was found on the later WordPress-era site in the time
available this pass — a further, deeper prefix sweep of the 2019+ site structure was not run.

**Unresolved questions:** exact introduction and discontinuation dates for `cube4you-3x3`
(both `unknown`); whether any of the undated novelty "blind tile" decorated cubes constitute a
separately marketed edition worth a future look; whether the 2019+ WordPress-era site sold any
further 3x3 under a different name (not checked this pass).

**Sources added:** `cube4you-3x3x3-diy-speed-cube-2017`.

**Confidence:** `reported` throughout (single tier 1 manufacturer-storefront source, nothing
contradicting, but thin — no second independent source corroborates this specific product
name).

---
## Z-Cube — 0 families

**Method.** `speedsolving-wiki-zcube` (already in the archive from pass 1) frames this
manufacturer as "a twisty puzzle company that mainly sells budget puzzles and novelty cubes"
that "often, but not always, repackage[s] cubes from other brands such as QiYi and sell[s]
them under a different name," naming a specific example: "the Z Carbon Fiber 3x3 is a QiYi
Warrior W restickered with carbon fiber-style stickers." This pass tested that claim against
TheCubicle's own archived "Z-" product range (`npm run wayback -- prefix
thecubicle.com/products/z-`, ~90 URLs) rather than accepting the wiki's framing at face value.

**Candidates considered, and why each was rejected as a Z-Cube family:**

- **Z Magnetic 3x3** (`thecubicle-z-magnetic-3x3-2020`) — TheCubicle's own product
  description states directly: "The base model for the Z Magnetic 3x3 is the highly acclaimed
  MF3RS from Cubing Classroom, and it was magnetized by Z-Cubes." This is DATA_MODEL §4.3's
  aftermarket pattern exactly — a base cube (MFJS's MF3RS) modified by a service (magnet
  installation) and sold under a trade name ("Z"). Per §4.3, this belongs as a **variant under
  MFJS's own model tree** (`modified_from` the MF3RS base variant, a `service` block naming
  the magnetizer), not as a Z-Cube family. Also notable, and flagged as a lead rather than
  acted on: the same page claims this was "the first commercially-available magnetized 3x3 to
  hit the market" — a comparative/superlative claim (tier 4 per DATA_MODEL §5.2 rule 2 even
  though it is a manufacturer/retailer page), not verified independently this pass, but a
  historically significant lead for whoever researches MFJS's MF3RS variants or the broader
  history of magnetized cubes.
- **Z Carbon Fiber 3x3** and **Z Colorful Carbon Fiber 3x3** (`thecubicle-z-carbon-fiber-3x3-
  2019`) — per the wiki, the former is a restickered QiYi Warrior W. Both are sticker-mod
  decorations of an existing base cube (DATA_MODEL §4.1's materiality test explicitly lists
  "coating... colourway or sticker type" as variant-level, and §4.3 as aftermarket), which
  belongs under the **base cube's own model tree** with a service/coating record, not as a new
  Z-Cube family. The Colorful variant's own base was not independently identified this pass
  (no product page names it, unlike the Magnetic one) but is presumed the same pattern absent
  contrary evidence.
- **Z Rainbow 3x3** — "a pre-stickered 3x3 sticker mod" (TheCubicle's own description) — same
  sticker-mod-of-a-base-cube pattern as Carbon Fiber, base cube not identified this pass.
- **Z Round 3x3**, **Z Concave 3x3**, and (by the same pattern, not individually fetched this
  pass) **Z Wave 3x3**, **Z Maze 3x3**, **Z Penrose 3x3**, **Z Void Cube** — TheCubicle's own
  "Type" field classifies at least Round as **"Shape Mods,"** a separate category from its own
  "3x3" WCA-puzzle category. These are non-WCA-legal shape modifications with no documented
  historical or collector significance found this pass beyond generic novelty-marketing
  description ("appears to be pushed in on all sides") — they fail RESEARCH_SPEC §2.2's
  conditional-admission bar ("'It is interesting' is not a justification") outright, so no
  family (even a `conditional`-scoped one) is created for them. Recorded here as a lead only.
- All remaining "Z-" product-prefix hits found this pass (cube bags, lube, screwdrivers, a
  Luban lock puzzle, a pen holder, a money-cube box, various non-3x3 puzzle types — Skewb,
  Pyraminx, Helicopter Cube, Curvy Copter, Gear Cube, 7x7) are out of this archive's 3x3x3
  scope entirely (RESEARCH_SPEC §2.4) or are accessories, not puzzles.

**Zero families created — a genuine finding, not a gap.** Every Z-branded 3×3×3-shaped product
identified this pass is, on the evidence found, either (a) a decorative or magnet-installation
modification of an already-manufactured cube from a *named* other manufacturer (MFJS, QiYi),
which DATA_MODEL §4.3 places under that other manufacturer's own model tree, not Z-Cube's, or
(b) a non-WCA-legal shape mod with no documented significance clearing the conditional-
admission bar. Z-Cube itself, on this pass's evidence, appears to be a private-label
customisation/rebrand operation rather than a manufacturer with its own persisting 3x3 design
lineage — consistent with, and now substantiated beyond, the wiki's own one-line
characterisation. No `zcube` family record was created.

**Cross-manufacturer leads flagged for a future pass (not actioned by me — out of my write
lane and out of scope for pass 2):** MFJS's MF3RS has a documented magnetized aftermarket
edition ("Z Magnetic 3x3" / magnetized by "Z-Cubes", 2018-09-11) that a future MFJS
variant-enumeration pass should pick up; QiYi's Warrior W has a documented restickered
aftermarket edition ("Z Carbon Fiber 3x3") that a future QiYi variant-enumeration pass should
pick up. Both are recorded in the two new sources below, cited by neither manufacturer's
existing family/model records (MFJS and QiYi are marked complete for pass 2 in this batch's
assignment and were not otherwise touched).

**Unresolved questions:** whether "Z-Cubes" (the servicer named in the Magnetic 3x3
description) and "Z" (the brand name in TheCubicle's own spec-table "Manufacturer" field) are
the same entity as the "Z-Cube/ZCube/Z" described by the Speedsolving wiki, or a related but
distinct trade name TheCubicle used for its own house customisation service — not resolved
this pass; a `kind: service` reading of the existing `zcube` manufacturer register entry (it
is currently `kind: manufacturer`) may deserve reconsideration by whoever holds that record,
but that is a pass-1 manufacturer-register concern, out of this pass's write lane, and is
flagged here rather than acted on.

**Sources added:** `thecubicle-z-magnetic-3x3-2020`, `thecubicle-z-carbon-fiber-3x3-2019`
(neither cited by a family record, per the above — preserved as leads for MFJS/QiYi variant
research). `speedsolving-wiki-zcube` (pass 1, reused, not recreated).

**Confidence:** the zero-family conclusion itself rests on `reported`-tier evidence (one tier
4 wiki source plus two tier 2 retailer product pages, mutually consistent, nothing
contradicting) — thin, but consistent across every product checked.

---
## HuaMeng — 2 families

**Method.** Pass 1's own `data/manufacturers/huameng.yml` already identified two named 3x3
lines from a product-slug enumeration (TG, YS3M) but deferred description to pass 2. This
pass fetched both lines' earliest-found TheCubicle product pages directly.

**Candidates considered:** HuaMeng TG (+ Ball-Core, Maglev Ball-Core, Maglev Ball-Core UV,
Spirit Pearl Limited Edition, TG V2 20-Magnet Ball-Core), HuaMeng YS3M (+ Ball-Core, Maglev,
Ball-Core UV Maglev, YS3-M 20-Core Magnetic Maglev Ball-Core UV).

**Accepted (2):** `huameng-ys3m` (earlier, Added 2023-02-17), `huameng-tg` (later, Added
2024-10-23).

**Boundary call: kept as two separate families, not one line with a naming change.** No
source found this pass frames either line as the other's successor or rename; the two ran
concurrently (YS3M captures continue into 2025 alongside TG's 2024-2026 captures) with
distinct marketing identities (YS3M: dragon-scale surface texture, YuSheng Du endorsement;
TG: a 1620-combination hand-adjustability pitch). Each carries its own further sub-line
succession (TG → TG V2) which is pass-3 generation material, not actioned here.

**Significant unresolved lead, flagged rather than acted on.** TheCubicle's own YS3M product
description opens "The MoYu HuaMeng YS3M is..." — a direct textual pairing of "MoYu" and
"HuaMeng" in the retailer's own copy. This is exactly the kind of evidence the task brief
warned me to treat cautiously: HuaMeng's own pass-1 manufacturer record
(`data/manufacturers/huameng.yml`) is currently `kind: manufacturer` (independent, not a
MoYu sub-brand), and I have **not** changed that reading or its confidence. The pairing could
be a genuine signal or could be a templated-copy artefact (TheCubicle's product descriptions
are known to reuse boilerplate); no second source repeats it (HuaMeng's own TG page says only
"HuaMeng"), so it is recorded as an open lead in `huameng-ys3m.yml`'s own description, not
promoted to a relationship claim anywhere. A human or a future pass with more time should
decide whether this is worth chasing to a first-party HuaMeng or MoYu statement.

**No boundary disputes** beyond the above — each family is its own clearly single-lineage
product with no ambiguity about which family a given product slug belongs to.

**Sources added:** `thecubicle-huameng-ys3m-3x3-2023`. `thecubicle-huameng-tg-3x3-ball-core`
(pass 1, reused — a pre-existing source, not recreated; its "Added: 2024-10-23" field was read
directly off the same preserved archive capture and cited even though the source's own
excerpt text does not separately quote it).

**Confidence:** `reported` throughout (single tier 2 retailer source per family, nothing
contradicting); `uncertain` on `huameng-tg`'s `positioning` specifically, since no source
calls it "flagship" by name the way YS3M's own page does.

---
## GuoGuan — 1 family

**Sub-brand caution applied.** GuoGuan's parent relationship to MoYu is already recorded at
`reported` confidence in `data/manufacturers/guoguan.yml` (a dedicated Speedsolving wiki page,
tier 4, stating the relationship directly, plus MoYu's own site grouping the name). This pass
found **two further, independent tier 2 corroborations** of the same relationship —
TheCubicle's own YueXiao product description ("the first cube from GuoGuan, a new and
exciting brand by MoYu") and the YueXiao Pro M's packaging description ("includes... a
collectible MoYu card"). Per this task's standing instruction, **I have not touched
`data/manufacturers/guoguan.yml` or its confidence** — both corroborations are recorded in
`guoguan-yuexiao.yml`'s own description as findings for a human to weigh, not acted on.

**Candidates considered:** GuoGuan Xinghen (2x2 — **out of this archive's 3x3x3 scope
entirely**, not evaluated as a family), GuoGuan Yuexiao (+ Pro, Pro M, EDM, E).

**Accepted (1):** `guoguan-yuexiao` — the persisting family name across three retailer-
documented generations: original YueXiao (2016), YueXiao Pro (2018, explicitly "a brand new
mechanism... more rounded corner piece design" per TheCubicle — a genuine DATA_MODEL §4.2
model-level change), and YueXiao EDM (2019, "the world's first adjustable... magnetic
system," per the same retailer, not independently verified). "Pro M" and "E" are magnet-
configuration variants of Pro and EDM respectively (TheCubicle's own copy: Pro M is "the
factory-magnetized version of the YueXiao Pro"; E is "the unmagnetized version of the YueXiao
EDM") — variant-level per DATA_MODEL §4.1, not separate generations, and not separately
enumerated at this pass.

**Boundary reasoning.** One family, one persisting name ("YueXiao") carried through direct
retailer-stated generational succession — the same pattern already used for `moyu-weilong` in
this register. No `successor_family_id` needed since all generations share the one family
name; the Pro/EDM succession is pass-3 `model.succeeds` material.

**Rejected:** GuoGuan Xinghen (2x2, not a 3x3x3 product — RESEARCH_SPEC §2.4 scope, not a
family-boundary call).

**Unresolved questions:** exact GuoGuan/MoYu corporate relationship confidence (flagged, not
changed — see above); whether "YueXiao EDM" represents a further mechanism change from "Pro"
or reuses Pro's mechanism with an added magnet system (pass-3 question); the "world's first
adjustable magnetic system" superlative claim, not independently verified.

**Sources added:** `thecubicle-guoguan-yuexiao-2025`, `thecubicle-guoguan-yuexiao-pro-2018`,
`thecubicle-guoguan-yuexiao-edm-2020`.

**Confidence:** `reported` throughout (tier 2 retailer sources, mutually consistent, nothing
contradicting).

---
## MoJue — 1 family

**Sub-brand caution applied — this is the strongest relationship-evidence finding in this
batch.** `data/manufacturers/mojue.yml` currently records `kind: sub_brand` at
`confidence: uncertain`, reasoned entirely from structural analogy to GuoGuan (own product
name, no "moyu-" prefix, grouped in MoYu's own house-name list) because "no source directly
states the relationship type for MoJue specifically." This pass found one: TheCubicle's own
MoJue M3 product description states, twice, that MoJue is "MoYu sub-branded" ("an exciting
new high-end MoYu sub-branded 3x3... among the most promising MoYu sub-brands thus far") — a
direct, specific, tier 2 retailer statement, not an inference. **I have not changed
`data/manufacturers/mojue.yml` or its confidence** — that file is outside my write lane and
the task brief explicitly warns against upgrading corporate relationships on retailer copy
during this family pass. The finding is recorded in `mojue-m3.yml`'s own description and here,
flagged clearly for a human to weigh raising the confidence on `/kind` given this materially
stronger, more direct source than what that record currently cites.

**Candidates considered:** MoJue M3 — the only MoJue product-slug capture found
(`thecubicle.com/products/mojue*` returns exactly one page).

**Accepted (1):** `mojue-m3`, on the same "single generic-but-named product = one family"
precedent as `cube4you-3x3`/`fanxin-3x3`/`mf8-legend`.

**Rejected:** none — no second MoJue product was found to weigh against.

**Method note on a suspect date field.** The product's "Added: 2018-09-11" spec-table field
recurs verbatim across several unrelated products checked this pass (GuoGuan YueXiao Pro,
YueXiao Pro M, several Z-brand items) — almost certainly a one-time catalogue-migration
default at TheCubicle rather than a genuine per-product listing date. Flagged here because it
could otherwise silently poison `introduced` dates across several families in this archive if
taken at face value; not used for `mojue-m3`'s or `guoguan-yuexiao`'s `introduced` fields (see
those records' own attestation notes). Worth a broader check by whoever next relies on
TheCubicle's "Added" field for a launch date.

**Unresolved questions:** exact MoJue/MoYu relationship confidence (flagged above); exact
launch date (only a single, undated-beyond-"soon" 2020 capture found); whether MoJue M3 ever
shipped beyond pre-order (not checked further this pass).

**Sources added:** `thecubicle-mojue-m3-2020`.

**Confidence:** `uncertain` on `introduced`/`positioning` (single weak-dated source);
`reported` on `description`.

---
## MoHuanShouSu — 1 family

**Sub-brand caution applied — same pattern as MoJue.** `data/manufacturers/mohuanshousu.yml`
currently records `kind: sub_brand` at `confidence: uncertain` by structural analogy only.
TheCubicle's own MoHuan ShouSu ChuFeng product description states directly: "The MoHuan ShouSu
ChuFeng is a new **MoYu sub-branded** 3x3 that was designed by Zhang HaiXu, the former 4x4
world record holder." Same treatment as MoJue: **not acted on**, flagged here and in
`mohuanshousu-chufeng.yml`'s own description for a human to weigh.

**Candidates considered:** MoHuan ShouSu ChuFeng — the only 3x3 product-slug capture found
(the manufacturer's other found slug, `mohuan-shousu-chuwen-2x2`, is a 2x2, out of scope).

**Accepted (1):** `mohuanshousu-chufeng`.

**Rejected:** none beyond the out-of-scope 2x2.

**Unresolved questions:** exact MoHuanShouSu/MoYu relationship confidence (flagged above);
exact launch date (only capture-date evidence, earliest 2020-09-18).

**Sources added:** `thecubicle-mohuan-shousu-chufeng-2020`.

**Confidence:** `uncertain` on `introduced` (capture-date only); `reported` on
`positioning`/`description`.

---
## SenHuan — 1 family

**Candidates considered:** SenHuan Mars (+ Mars S), SenHuan Zhanlang (2x2 — out of scope, not
evaluated as a family).

**Accepted (1):** `senhuan-mars` — one family across two generations. TheCubicle's own Mars S
description frames it directly as a successor: "the new and improved version of the original
SenHuan Mars ... a variety of design improvements on top of the unique small inner circle
structure of the original," the same "one persisting name, direct succession language" pattern
used for `guoguan-yuexiao` this session.

**Sub-brand caution note — a non-finding, recorded for completeness.** Unlike MoJue and
MoHuanShouSu this session, **neither** SenHuan product page found this pass restates a "MoYu
sub-branded" claim. This is not evidence against the existing `data/manufacturers/senhuan.yml`
parent-relationship reading (silence is not counter-evidence), but it means this manufacturer
did not produce the same additional corroboration MoJue/MoHuanShouSu did — recorded honestly
rather than implied.

**Rejected:** SenHuan Zhanlang (2x2, out of 3x3x3 scope).

**Unresolved questions:** exact launch date for the original Mars (only capture-date evidence);
whether any further SenHuan 3x3 beyond Mars/Mars S exists (prefix sweep found none).

**Sources added:** `thecubicle-senhuan-mars-3x3-2019`, `thecubicle-senhuan-mars-s-3x3-2019`.

**Confidence:** `uncertain` on `introduced`/`positioning`; `reported` on `description`.

---
## YanCheng — 1 family

**Open question from pass 1 resolved.** `data/manufacturers/yancheng.yml` explicitly flagged
"the basic question of whether 'Yan3' is a 3x3 at all" as unconfirmed, since the product page
had not been fetched. This pass fetched it: TheCubicle's own structured spec table states
"Type: 3x3" and lists it under the site's own "3x3" navigation category — confirmed.

**Candidates considered:** YanCheng YAN3 — the only YanCheng product-slug capture found at all
(`thecubicle.com/products/yancheng*` returns exactly one URL).

**Accepted (1):** `yancheng-yan3`, described by the retailer as "the first cube released by
the YanCheng brand," with no second product, predecessor, or successor found.

**Sub-brand caution note — another non-finding, recorded for completeness.** As with SenHuan,
no "MoYu sub-branded" claim appears on this page — no additional corroboration of the existing
`data/manufacturers/yancheng.yml` parent-relationship reading found here, and none claimed.

**Rejected:** none — no second product to weigh.

**Unresolved questions:** exact launch date (only a single, already-discontinued 2020 capture
found; `circa 2018` recorded on weak, indirect grounds — see the family's own attestation
note).

**Sources added:** `thecubicle-yancheng-yan3-2020`.

**Confidence:** `uncertain` on `introduced`/`positioning`; `reported` on `description`.

---

## Batch B complete — summary

All eight assigned manufacturers researched: `cube4you` (1 family), `zcube` (0 — genuine
finding), `huameng` (2), `guoguan` (1), `mojue` (1), `mohuanshousu` (1), `senhuan` (1),
`yancheng` (1). **8 families total across 8 manufacturers.**

**The single most important cross-cutting finding in this batch:** three of the five
"structural-analogy-only" MoYu-affiliated manufacturers this task flagged for caution
(`mojue`, `mohuanshousu`, and independently `guoguan`, whose relationship was already
better-evidenced) turned out to have **direct, explicit "MoYu sub-branded" statements in
TheCubicle's own retailer copy** — materially stronger evidence than the structural-analogy
reasoning those manufacturer records currently rest on. `senhuan` and `yancheng` did **not**
produce equivalent corroboration (their pages are silent on the relationship, which is not
evidence against it either). **No manufacturer record was changed by me** — this is
deliberately left for a human to review, per the task's explicit caution against upgrading
corporate relationships during a family pass. The relevant sources are
`thecubicle-mojue-m3-2020` and `thecubicle-mohuan-shousu-chufeng-2020`.

**A second cross-cutting methodological finding:** the literal date string "Added: 2018-09-11"
recurs verbatim across many unrelated products from at least six different brands checked this
pass (GuoGuan YueXiao Pro, YueXiao Pro M, MoJue M3, MoHuan ShouSu ChuFeng, SenHuan Mars, SenHuan
Mars S, YanCheng YAN3, several Z-brand items) — almost certainly a one-time TheCubicle
catalogue-migration default rather than a genuine per-product listing date. Every `introduced`
date in this batch was checked against this pattern and, where the only evidence was this
specific date, downgraded to a weaker capture-date-based inference instead. Flagged prominently
here because this same field is likely to mislead any other pass relying on TheCubicle's own
"Added" spec-table field for a launch date without cross-checking for the same repeated value.

**Cross-manufacturer leads not actioned (out of this pass's write lane):** `zcube`'s "Z
Magnetic 3x3" (MFJS MF3RS base, magnetized by "Z-Cubes") and "Z Carbon Fiber 3x3" (QiYi Warrior
W base, restickered) — see the Z-Cube section above.

**Queue exhausted. Ready for reassignment.**

# Second assignment (verypuzzle, limcube, escube, pbcube, xinlexin, guojia, lefun, kungfu)

Merged to main as `cee929f` before this section began; that merge is not re-litigated here.
Continuing to append to this same file per the coordinator's instruction.

## VeryPuzzle — 0 families

**Method.** Pass 1's own `data/manufacturers/verypuzzle.yml` already found, via TheCubicle's
manufacturer-filter page, that VeryPuzzle's catalogue is shape mods and non-3x3 twisty puzzles
with "no standard WCA-legal 3x3 ... seen under this filter," and deferred a final call to pass
2. This pass fetched the full page (52 product URLs via `npm run wayback -- prefix
thecubicle.com/products/verypuzzle`) and specifically checked the two most plausible
candidates for an in-scope product: the one item with "3x3" literally in its own name, and the
one item built on a 3x3x3-derived cutting style.

**Candidates considered:**
- **VeryPuzzle Slip 3x3** — the only product carrying "3x3" in its name. TheCubicle's own
  description: "a 3x3 shape mod where all of the pieces rotate independently of the rest of
  the puzzle" — a fundamentally non-standard mechanism (not a WCA-legal 3x3x3 permutation),
  sold as a DIY/unstickered kit, no documented significance beyond generic description.
  **Rejected.**
- **VeryPuzzle Clover Cube** (+ Plus, Dodecahedron, Icosahedron D1, Octahedron, Octahedron
  Fragmentation) — a 3x3x3-mechanism-based shape mod line, VeryPuzzle's most 3x3-adjacent
  product family by mechanism. TheCubicle's own "Type" field classifies it as "Shape Mods," a
  separate category from its own "3x3" WCA category, and its own product description is
  generic novelty copy ("an ornate, shape-shifting puzzle") with no documented production
  first, collector market, or design influence found this pass. **Rejected** on the same
  evidentiary bar already applied to Z-Cube's shape mods last session (RESEARCH_SPEC §2.2:
  "'It is interesting' is not a justification").
- The remaining ~45 products (Geranium series, Tuttminx series, Lovebird, HATO Puzzle, Hex
  Shaper, Seven Star UFO, Snow Mystery, Super Star, Truncated Icosidodecahedron) are
  Megaminx-family or other non-cube twisty-puzzle types, out of this archive's 3x3x3 scope
  entirely (RESEARCH_SPEC §2.4) — not individually fetched, consistent with their category
  placement on the same manufacturer-filter page.

**Zero families created — a genuine finding, not a gap**, on the same LanLan precedent: a
specialist shape-mod/non-3x3 manufacturer whose entire found catalogue either falls outside
this archive's 3x3x3 scope or fails the conditional-admission significance bar for the one
3x3x3-mechanism line found. No `verypuzzle` family record was created.

**Unresolved questions:** whether a deeper look (a first-party VeryPuzzle site, if one exists,
was not located either pass) would surface documented significance for the Clover Cube line
specifically — VeryPuzzle is a long-running specialist house per the task brief, and "first to
market with a lobed/clover cutting style" is exactly the kind of claim that would flip this
call if a citable source stated it. Recorded as an open lead, not chased further this pass.

**Sources added:** `thecubicle-verypuzzle-slip-3x3-2020`, `thecubicle-verypuzzle-clover-
cube-2020`. `thecubicle-verypuzzle-manufacturer-filter-2021` (pass 1, reused).

**Confidence:** `reported` (tier 2 retailer sources, mutually consistent, nothing
contradicting).

---
## LimCube — 0 families

**Sub-brand caution note.** `data/manufacturers/limcube.yml` already records `kind: sub_brand`
/ `parent_id: fangshi` at `confidence: confirmed`, from two independent tier 2 retailers. This
pass did not touch that record; it only enumerated LimCube's product range for 3x3x3 content.

**Method.** `npm run wayback -- prefix thecubicle.com/products/limcube` (37 URLs) enumerates
LimCube's full found catalogue: 2x2 Ghost Cube, 2x2 Transform Rhombohedron II, CakeZ (2x2x2
Skewb Mech), Circle Pyramorphix I/II, Crucis Cube 3x3 Skewb V2, Fission Skewb, Hexagram
Octahedron, Hollow XO Cube, HyperV 2x2x2 Offset Skewb Plus, Kaleidoscope Hex Prism, Master
Mixup 0/I/II/III/VII, Rhombohedron III, SuperZ and WonderZ 2x2x2 Skewb Cubes.

**Candidates considered:** the Master Mixup series (0 through VII) is the only line with real
depth (5 numbered generations) and was checked directly. TheCubicle's own product description
of Master Mixup I: "This may look like a **bandaged 10x10**, but this cube moves in ways that
you would never expect!" — a 10x10x10-based mixup mechanism, not a 3x3x3 product at all,
confirmed by the same page's own "Type: Shape Mods" field. Every other LimCube product found
is either explicitly Skewb-family (Fission Skewb, Crucis Cube 3x3 **Skewb**, HyperV, SuperZ,
WonderZ), 2x2-based (Ghost Cube, Circle Pyramorphix), or another non-3x3x3 polyhedron
(Rhombohedron, Octahedron, Hex Prism) — none 3x3x3-mechanism-based, all out of this archive's
scope per RESEARCH_SPEC §2.4 ("Puzzles other than 3×3×3").

**Zero families created — a genuine finding.** LimCube's entire found catalogue, across every
line checked, is built on 2x2x2, Skewb, or 10x10x10 mechanisms — none of it is a 3x3x3 product,
so no family-boundary question even arises. No `limcube` family record was created.

**Rejected:** all of the above, on scope grounds rather than a family-boundary judgement call.

**Sources added:** `thecubicle-limcube-master-mixup-i-2023` (also independently corroborates
the existing FangShi parent-manufacturer field, consistent with, not contradicting, the
existing confirmed relationship).

**Confidence:** `confirmed`-adjacent — the scope exclusion rests on direct retailer
"Type"/description statements for the products actually checked, consistent across every one.

---
## ESCube — 2 families

**Method.** Pass 1's own `data/manufacturers/escube.yml` already identified two named 3x3
lines (Air, ES3) via product-slug enumeration and a second independent retailer
(SpeedCubeShop) confirming ES3 as "the debut release for the new brand, ES Cube!" This pass
confirmed the full product-slug range (`npm run wayback -- prefix
thecubicle.com/products/escube`, 4 URLs total — a genuinely thin footprint, exactly the "do
not manufacture families because the manufacturer exists" caution the task brief raised) and
fetched TheCubicle's own Air page directly for its own dating.

**Candidates considered:** ESCube ES3 (+ base magnetic, 8-Magnet Ball-Core, 20-Magnet
Ball-Core UV-Coated configurations), ESCube Air (20-Magnet Ball-Core configuration found).

**Accepted (2):** `escube-es3` (earlier — SpeedCubeShop's own capture, dated 2025-06-17,
calls it "the debut release for the new brand"), `escube-air` (later — TheCubicle's own spec
table reads "Added: 2025-11-13", and its own description calls it "This latest release from
ESCube").

**Boundary call: kept as two families, not one line/generation.** No source frames Air as a
direct successor generation of ES3 by name (unlike, say, `senhuan-mars`/`mars-s` or
`guoguan-yuexiao`'s Pro/EDM progression) — they are two differently-named, differently-priced
lines sold by the same very-recently-launched manufacturer, on the same reasoning already
applied to HuaMeng's TG/YS3M split this session.

**Rejected:** none — the entire found catalogue (4 URLs) resolved cleanly into these two
families with no undated or ambiguous leftover.

**Unresolved questions:** whether ESCube has released anything since (this is an extremely
recently-founded brand per both retailers' own framing, and this pass's captures run only to
around November 2025); exact relationship, if any, between the Air and ES3 lines beyond
sequential release order.

**Sources added:** none new — both families cite pass-1 sources already in the archive
(`thecubicle-escube-air-3x3-20-magnet-ball-core`, `speedcubeshop-es3-debut-brand-2025`); the
Air family's `introduced` date was read directly off the already-preserved capture, per the
same "cite the existing source, don't duplicate the archive_url" practice used for HuaMeng TG
last session.

**Confidence:** `reported` throughout (tier 2 retailer sources, mutually consistent, nothing
contradicting; genuinely recent product with thin but directly-dated evidence).

---
## PBCube — 1 family

**Sub-brand caution note.** `data/manufacturers/pbcube.yml` already records `kind: sub_brand`
/ `parent_id: moyu` at `confidence: probable`, from a direct retailer statement ("MoYu's
specialized sub-brand, PBCube"). This pass found no second product and no reason to revisit
that reading; it is left untouched.

**Candidates considered:** PBCube WR — the only PBCube product-slug capture found at all
(`thecubicle.com/products/pbcube*` returns exactly one URL, confirming the same thin-footprint
caution the task brief raised).

**Accepted (1):** `pbcube-wr`, explicitly "the flagship release from MoYu's specialized
sub-brand, PBCube" per TheCubicle's own copy, added 2026-08-25 and still listed "[Pre-Order]"
on the only capture found — a genuinely brand-new, not-yet-widely-available product.

**Rejected:** none — no second product to weigh.

**Unresolved questions:** whether "WR" echoes MoYu's own WeiLong WR naming in any way beyond
coincidence/shared corporate parent (flagged as an unactioned lead in the family's own
description, not treated as a relationship without evidence).

**Sources added:** none new — cites the existing pass-1 source
(`thecubicle-pbcube-wr-3x3-maglev-uv`); the `introduced` date was read directly off the
already-preserved capture.

**Confidence:** `reported` throughout (single tier 2 source, nothing contradicting).

---
## GuoJia — 1 family

**Method note — a useful discovery technique for the rest of this batch.** TheCubicle's own
manufacturer-filter dropdown (captured in full while checking VeryPuzzle, see that section)
lists every manufacturer value in its own product taxonomy, including several this register
had only found via Chinese-language search or slug-guessing: GuoJia, KungFu, and LeFun are all
independently confirmed present in that dropdown, meaning TheCubicle carried at least one
tagged product from each at some point. This resolved pass 1's own open question for GuoJia
("Activity within the 2016-2026 window is unknown") — it was carried, if thinly.

**Candidates considered:** filtering `thecubicle.com/collections/all/manufacturer_guojia`
(2021 capture) to exactly two products: **GuoJia Square-1** (not a 3x3x3, out of scope,
rejected on scope grounds) and **Type A Chun2 - DIY Kit**.

**Accepted (1):** `guojia-type-a-chun` — TheCubicle's own description confirms this is
genuinely "a 3x3 cube," and its own disclaimer text names an undocumented predecessor
generation directly: "The steel parts provided are designed for the Type A Chun1 since the
Chun2's steel parts are no longer in production" — a real design succession (Chun1 → Chun2)
under one persisting name, the same "one family, direct succession language" pattern used
repeatedly this batch.

**Historically significant, thinly evidenced.** This is the first tier 2 corroboration this
register has for GuoJia at all, beyond the single tier 4 Chinese brand-profile source
(`baiqiang-guojia-mofang-profile`) already in `data/manufacturers/guojia.yml`, which frames
GuoJia as "the earliest domestic 3x3 cube released specifically for speedcubing players"
(2006) with a 19-model range across several series. A plausible but **unconfirmed** link
between this product's "Type A" naming and that source's "甲" (jiǎ, "first/A") series naming
is noted in `guojia-type-a-chun.yml`'s own description as a lead, not asserted as fact.

**Rejected:** GuoJia Square-1 (not a 3x3x3, RESEARCH_SPEC §2.4 scope).

**Unresolved questions:** the relationship (if any) between "Type A" and the brand-profile
source's "甲"-numbered series; whether GuoJia's wider 19-model range includes further 3x3
products not carried by TheCubicle (a Chinese-language retailer sweep was not run this pass —
time budget); exact introduction date for either Chun generation.

**Sources added:** `thecubicle-guojia-manufacturer-filter-2021`,
`thecubicle-guojia-type-a-chun2-2020`.

**Confidence:** `uncertain` on `introduced`/`positioning`; `reported` on `description`.

---
## Xinlexin — 0 families

**Pass 1's own open question resolved, in the negative.** `data/manufacturers/xinlexin.yml`
found a single tier 4 Chinese brand-directory profile naming "百变魔王" (Baibian Mowang) as
Xinlexin's cube-branded product line, but explicitly left open "whether '百变魔王'
specifically includes WCA-legal 3x3 speedcubes, as opposed to non-WCA novelty cubes, snake
puzzles, or other toy categories entirely." This pass went to Xinlexin's own first-party
corporate site (xinlexin.com, still live with wayback captures through at least 2025) and
found the answer directly.

**Method.** Xinlexin's own English-language site has a four-brand navigation menu (GUDI
Building Blocks, Magic Classroom, Magic Club, a spinning-top series), each pairing a Chinese
brand name with an internal product-filter ID. "百变魔王" maps to the "Magic Club" label
(`bid=10`) — fetched directly.

**Finding.** The "百变魔王" (Magic Club) product listing's own caption reads "百变魔王魔尺"
(Baibian Mowang **Moche**) — "Moche" (魔尺) is the Chinese term for a **Magic Snake** puzzle
(a twistable segmented-ruler toy), not a 3x3x3 cube. Every product thumbnail on the page's own
listing is a Moche/Magic Snake SKU. The companion "变形教室"/"Magic Classroom" brand (`bid=9`)
was also checked and found to be spinning tops and toy construction vehicles — also unrelated.

**Zero families created — a genuine finding**, and a cleaner one than most in this batch: this
is not a case of thin evidence or ambiguous scope, but a first-party source directly and
specifically resolving the exact open question pass 1 raised. Xinlexin is a real, verified
general toy manufacturer (confirmed by its own corporate site, independent of the tier 4
brand-directory profile) but has no documented 3x3x3 speedcube product at all — its "百变魔王"
line is Magic Snake puzzles, entirely out of this archive's scope (RESEARCH_SPEC §2.4,
"Puzzles other than 3×3×3"). No `xinlexin` family record was created.

**Unresolved questions:** whether Xinlexin's "GUDI Building Blocks" brand (unrelated to
puzzles, not checked) or any other unlisted brand/product includes a 3x3x3 cube — considered
very unlikely given the company's own four-brand structure is now fully accounted for, but not
exhaustively verified.

**Sources added:** `xinlexin-en-brand-nav-2022`, `xinlexin-magic-club-baibian-mowang-2022` —
both first-party (tier 1) manufacturer sources, an upgrade in evidence quality over pass 1's
single tier 4 source for this manufacturer.

**Confidence:** the zero-family conclusion rests on tier 1 first-party evidence, directly on
point — the strongest-evidenced zero-family finding in this batch.

---
## LeFun — 1 family

**Method and a boundary call worth flagging explicitly.** `npm run wayback -- prefix
thecubicle.com/products/lefun` returns well over 60 URLs — by far the largest single-
manufacturer product sweep in either of my assignments. The great majority are individually-
named print-theme/novelty-gift 3x3x3 SKUs (Sudoku, Calendar, Dollar, Hundred-Dollar, Periodic
Table ×2, Number, Respect, Gradient, Christmas ×2, Halloween, Blue Sudoku), plus a separate
group of genuinely different puzzle types (Fisher Cube, Windmill Cube, Dino Cube,
Pyramorphix, Megamorphix, MoYan I — a 12-sided dodecahedral puzzle confirmed via its own
"Type: Shape Mods" field despite its model-like name — Pyraminx Duo/Ghost/Master, Skewb,
2x2/2x2x3/3x3x2/4x4/7x7 items, Venus Cube, Barrel Cubes, keychains).

**Rather than create one family per printed theme, I fetched three of the plain-3x3-shaped
listings directly and compared them** (Formula, Sudoku, Calendar Cube): all three carry
near-identical dimensions (~55.5-56.0mm) and weight (~77-79g) under the same "Manufacturer:
Lefun / Type: 3x3[...]" spec-table fields, with the only stated difference being the printed
sticker/tile theme. Per DATA_MODEL §4.1 ("colourway or sticker type" is explicitly variant-
level), I treated this as **one family** — a generic base 3x3 mold sold across many decorated
editions — rather than a family per theme, on the same reasoning already used for
`cube4you-3x3`. This is a considered boundary call, not a shortcut: creating 10+ near-identical
single-SKU "families" here would have been the kind of coverage-by-lowering-the-bar the task
brief and PRODUCT.md both warn against, and would have obscured rather than revealed the
actual shape of this manufacturer's catalogue.

**Accepted (1):** `lefun-3x3`, spanning Formula (BLD-training lettering) and the print-theme
gift range, with the genuinely different-mechanism/shape-mod items explicitly excluded in the
family's own description rather than silently dropped.

**Rejected:** every non-3x3x3 item found (listed above) — scope exclusions, not a
model/variant-boundary call.

**Unresolved questions:** whether any of the untested print-theme editions (Dollar, Periodic
Table, etc.) turns out to differ dimensionally or mechanically from the three checked — a
pass-3/4 question when those variants are actually enumerated; whether "Formula" specifically
(a functional BLD-training tool, not merely decorative) should eventually be split into its
own model at that pass, given it serves a different purpose than the purely-decorative gift
editions, even though this pass keeps it in the same family.

**Sources added:** `thecubicle-lefun-sudoku-3x3-2022`, `thecubicle-lefun-calendar-cube-
3x3-2026`, `thecubicle-lefun-moyan-i-2021`. `thecubicle-lefun-formula-3x3` (pass 1, reused).

**Confidence:** `reported` throughout (tier 2 retailer sources, mutually consistent
dimensional/weight evidence across three separate listings).

---
## KungFu — 3 families

**Method.** `data/manufacturers/kungfu.yml` already named two 3x3s (QingHong, LongYuan) via
its single tier 4 Speedsolving wiki source. `npm run wayback -- prefix
thecubicle.com/products/kungfu` (9 URLs) independently corroborated both at a tier 2 retailer
and surfaced a third, undocumented-by-the-wiki 3x3: **Dot Cube**.

**Candidates considered:** KungFu QingHong, KungFu LongYuan, KungFu Dot Cube, KungFu 3x3 Gear
Cube (a gear-mechanism puzzle, not a 3x3x3 — rejected on scope grounds), KungFu YueHun 2x2
(the wiki's own "YueHan" appears to be a transliteration variant of the same product; out of
scope as a 2x2 either way), KungFu CangFeng/JuQue 4x4s (out of scope).

**Accepted (3):** `kungfu-qinghong` ("solid performance at a low price point"),
`kungfu-longyuan` ("a very low price point... inexpensive first speedcube for beginners"),
`kungfu-dot-cube` (a removable-tile novelty colour-scheme 3x3, not previously documented in
this register at all). No source relates any of the three to the others as a succession or
naming variant — each is its own distinctly-named, independently-positioned budget product,
so each is its own family (the same "distinctly named, no stated succession" reasoning used
for ShengShou's several independent lines in the main pass-2 log).

**Rejected:** KungFu 3x3 Gear Cube (a gear-mechanism puzzle — RESEARCH_SPEC §2.4 scope, not a
3x3x3 despite the "3x3" in its own name, the same pattern already seen with Z-Cube's "Slip
3x3" and VeryPuzzle's "Slip 3x3" last/this session); KungFu YueHun/YueHan 2x2 and
CangFeng/JuQue 4x4s (out of 3x3x3 scope entirely).

**Unresolved questions:** exact introduction dates for all three (capture-date evidence only,
and the suspect "Added: 2018-09-11" field appears on all three — not used); whether "YueHun"
(TheCubicle's product slug) and "YueHan" (the wiki's spelling) are the same 2x2 product or two
different ones — immaterial to this pass's 3x3x3 scope either way, but flagged for whoever
eventually researches KungFu's 2x2 range.

**Sources added:** `thecubicle-kungfu-qinghong-3x3-2021`, `thecubicle-kungfu-longyuan-
3x3-2020`, `thecubicle-kungfu-dot-cube-3x3-2020`.

**Confidence:** `reported` on `description`/`positioning` (tier 2 retailer sources,
corroborating the existing tier 4 wiki source for two of three); `uncertain` on `introduced`
throughout.

---

## Second assignment complete — summary

All eight assigned manufacturers researched: `verypuzzle` (0 — genuine finding), `limcube`
(0 — genuine finding), `escube` (2), `pbcube` (1), `xinlexin` (0 — genuine finding, first-party
resolved), `guojia` (1), `lefun` (1, deliberately covering ~12 print-theme editions as one
family), `kungfu` (3). **8 families total across 8 manufacturers, 3 of them genuine
zero-family findings** — exactly the pattern the coordinator's brief predicted for this batch.

**Sub-brand caution:** `limcube` and `pbcube` sub-brand/parent relationships were left
untouched throughout — no new evidence bearing on either surfaced this session (LimCube's
zero-family result reinforces, without changing confidence on, its existing FangShi
attribution; PBCube's single product reinforces, without changing confidence on, its existing
MoYu attribution).

**A useful discovery technique surfaced this session:** TheCubicle's own manufacturer-filter
dropdown, captured in full while researching VeryPuzzle, lists every brand value in its
product taxonomy at once — this is how `guojia`'s and `kungfu`'s TheCubicle footprints were
confirmed to exist at all, rather than by guessing product-slug prefixes blind. Worth reusing
for any future thin/obscure manufacturer in this register.

**The `Added: 2018-09-11` data trap flagged last session recurred throughout this batch**
(KungFu's all three products, again) — continuing to refuse it as a date source per the
coordinator's note that this warning was propagated to Agent A.

**Queue exhausted. Ready for reassignment.**

# Third assignment (hellocube, newisland, cubestyle, cubetwist, haitun, ninja)

Merged to main as `d9dc93c` before this section began; not re-litigated here. Continuing to
append to this same file per the coordinator's instruction. This is the final unassigned pool
per the coordinator's third-assignment message.

## HelloCube — 0 families (scope exclusion, type (a))

**Prior tested, did not hold.** The task brief flagged HelloCube as "likeliest to hold
something real." Tested directly rather than assumed.

**Method.** Pass 1's own manufacturer-filter source (`thecubicle-hellocube-manufacturer-
filter-2021`, 4 products, all Gear Cube/shape-mod) was corroborated with a full product-slug
prefix sweep at the same retailer (`npm run wayback -- prefix
thecubicle.com/products/hellocube`, 11 URLs) and an **independent second retailer**
(`npm run wayback -- prefix speedcubeshop.com/products/hellocube`, 17 URLs).

**Finding.** Both retailers, independently, carry only Gear Cube mechanisms under the
HelloCube name: 2x2 Gear Cube/Gear Shift, 3x3 Gear Cube, 3x3 Gear Cube Extreme (a "different
kind of gear cube mechanism" per its own description, still explicitly "Type: Gear Cubes"),
2x2 Mirror Cube, Flat 2x2. A Gear Cube forces synchronised turning through embedded gearing —
a fundamentally different move mechanic from a 3x3x3, not merely a cosmetic shape mod of one,
and both retailers categorise it as its own type, separate from their own "3x3" categories.

**Zero families created — type (a), scope exclusion**, on stronger evidence than most
zero-results in this register: two independent retailers, several products each, no exception
found. No `hellocube` family record was created.

**Rejected:** every HelloCube product found (all Gear Cube/Mirror Cube/Flat Cube) — scope
exclusion, not a model/variant-boundary call.

**Unresolved questions:** none of substance — this is a clean result across independent
sources, not a thin one.

**Sources added:** `speedcubeshop-hellocube-gear-cube-2019`,
`thecubicle-hellocube-gear-cube-extreme-2022`.

**Confidence:** `confirmed`-adjacent for the scope exclusion itself (two independent tier 2
retailers, mutually consistent, no exception across 11 + 17 product URLs).

---
## Newisland — 2 families

**Prior tested, partially held.** The task brief flagged Newisland as "likeliest to hold
something real" — confirmed: two named, in-scope 3x3 lines, both standard-shaped (56.5-57mm),
neither a scope exclusion.

**Method.** `npm run wayback -- prefix thecubicle.com/products/newisland` (5 URLs) found a
second generation of the already-documented Lightning line (V2) plus a wholly undocumented
second product line, Phoenix. A SpeedCubeShop prefix sweep for this manufacturer returned no
captures — not treated as evidence of absence, simply a retailer this brand does not appear
to have reached.

**Candidates considered:** Newisland Lightning (+ V2), Newisland Phoenix.

**Accepted (2):** `newisland-lightning` (spanning both generations under one persisting name —
TheCubicle's own V2 description is near-identical to the original's, the same "one family,
minor wording change, no stated mechanism change" pattern used elsewhere this register),
`newisland-phoenix` (a separately-named line, no stated relationship to Lightning).

**Rebrand suspicion carried forward, not resolved.** `data/manufacturers/newisland.yml`
already flags a QiYi Thunderclap rebrand suspicion from customer-review opinion alone (tier
4-equivalent, insufficient for DATA_MODEL rule 17). This pass found the Lightning V2 page's
own description states it is "marketed **and created exclusively** by Newisland" — some
retailer-level counter-evidence, but still promotional copy, not a documented supply
relationship. **Left exactly as open as pass 1 left it**, recorded in `newisland-lightning.
yml`'s own description rather than resolved either way. Per the coordinator's framing, this
would be a type (b) finding (aftermarket/rebrand) *if* confirmed — it is not confirmed, so no
`kind` miscategorisation flag is warranted at this pass; simply an open lead.

**Rejected:** none — both found lines are in-scope, standard 3x3x3 products.

**Unresolved questions:** the rebrand suspicion (above); whether Lightning V2 differs
mechanically from V1 or is the same design with a revised accessory bundle (pass 3 question);
exact introduction dates (capture-date evidence only, "Added: 2018-09-11" refused as usual).

**Sources added:** `thecubicle-newisland-lightning-v2-2019`, `thecubicle-newisland-
phoenix-2019`. `thecubicle-newisland-lightning` (pass 1, reused).

**Confidence:** `reported` on `description`; `uncertain` on `introduced`/`positioning`
throughout.

---
## CubeStyle — 1 family + a clean type (b) finding

**A genuine second aftermarket/rebrand case, better-evidenced than Z-Cube's.** `npm run
wayback -- prefix thecubicle.com/products/cubestyle` (72 URLs) found, alongside the
already-known plain "CubeStyle 3x3", two further 3x3-shaped listings — "CubeStyle Carbon Fiber
3x3" and "CubeStyle [Hollow Sticker] 3x3" — whose own TheCubicle descriptions **name their
exact base cube models directly**: "The base cube model for the CubeStyle Carbon Fiber 3x3 is
the QiYi Warrior W 3x3 ... and the YJ GuanLong for the Phantom (Stickerless Pink) version" and
"The base cube model for the CubeStyle 3x3 is the YJ GuanLong 3x3 (Warrior W for the
Stickerless Bright variant)." Unlike the Z-Cube case last batch (which rested on a single tier
4 wiki claim), this is TheCubicle's own tier 2 structured product copy, stating the base model
by name for two separate products.

**Boundary reasoning.** Per DATA_MODEL §4.3, a restickered/recoated base cube sold under a
trade name belongs under the **base manufacturer's own model tree** (QiYi's Warrior W; YJ's
GuanLong) with a `modified_from` relationship and a `service` block naming the servicer
(CubeStyle) — not under CubeStyle's own family tree. **No `cubestyle` family was created for
either of these two products.** They are preserved as cross-manufacturer leads for whoever
researches QiYi's Warrior W or YJ's GuanLong variant trees (neither manufacturer is in my
assigned queue, and QiYi/YJ are both marked complete for pass 2 already).

**The plain "CubeStyle 3x3" is different in kind and was kept as its own family.** Its own
description ("draws inspiration from other modern 3x3 cube mechanisms") does not name one
specific base model the way the decorated listings do — it reads as CubeStyle's/FangGe's own
budget design, not a documented rebrand. **Accepted (1):** `cubestyle-3x3`.

**The open "FangGe" question is not resolved this pass**, on the same terms
`data/manufacturers/cubestyle.yml` already left it (a plausible but unconfirmed reading as
"MoFangGe," QiYi's own historical in-house name) — recorded in `cubestyle-3x3.yml`'s own
description, no `parent_id` implied.

**Rejected:** CubeStyle 2x2, 4x4, 5x5, Pyraminx, Megaminx, Skewb, Square-1, Axis Cube, Fisher
Cube, Windmill Cube, Kilominx, Twist Cube — out of 3x3x3 scope. "CubeStyle Penrose 3x3" and
"CubeStyle Carbon Fiber Penrose 3x3" — despite "3x3" in their own names, these are shape mods
(the same "Penrose" pattern already excluded for Z-Cube last batch), not fetched individually
this pass given the consistent naming signal. "CubeStyle 3x3x2" / "Constrained 3x3x2" — a
different shape, not a 3x3x3.

**Unresolved questions:** the "FangGe" identity; exact introduction date for `cubestyle-3x3`
(only a 2024 capture found despite 18 reviews implying an earlier real launch); whether the
Carbon Fiber/Hollow Sticker products' base-cube attributions should prompt a `rebrand_of` or
`modified_from` lead to be picked up specifically by QiYi's or YJ's next variant pass.

**Sources added:** `thecubicle-cubestyle-carbon-fiber-3x3-2020`, `thecubicle-cubestyle-hollow-
sticker-3x3-2020`. `thecubicle-cubestyle-3x3` (pass 1, reused).

**Confidence:** `reported` on `description`/`positioning`; `uncertain` on `introduced`. The
aftermarket finding itself is `reported`-to-`probable` — a single tier 2 source per product,
directly stated rather than inferred, and internally consistent across two separate listings.

---
## CubeTwist — 0 families (scope exclusion, type (a) — the (b) prior did not hold)

**Prior tested, did not hold.** The task brief flagged CubeTwist as a likely type (b)
(aftermarket/rebrand) candidate on prior signal. Tested directly: no base-model-naming claim
of the kind found for CubeStyle or Z-Cube was found anywhere in CubeTwist's catalogue. This is
a clean type (a) scope exclusion instead.

**Method.** `npm run wayback -- prefix thecubicle.com/products/cubetwist` (40 URLs) enumerates
CubeTwist's full found catalogue: Barrel Cube I/II, Double/Triple/Conjoined Cube variants,
Mirror Blocks/Double Cube, Siamese Mirror Cube I/II, House Cube I/II/III, Star Cube,
Inequilateral 3x3, Bandaged 3x3 DIY Kit, Bandaged 4x4/Pyraminx, Square-1/2, Oskar Gear 5x5,
"Magic"/"Master Magic" (non-cube puzzles). Three of the most 3x3x3-adjacent-sounding products
were fetched directly: **Star Cube** ("Type: Shape Mods", no base-model claim), **Inequilateral
3x3** ("a 3x3 shape mod with unevenly-sized layers... Type: Shape Mods"), and **Bandaged 3x3 -
DIY Kit** ("a non-tiled CubeTwist 3x3 with a full set of special colored tiles... to design
just about any kind of bandaged 3x3" — CubeTwist's own base mould, no external base-model
claim, filed under "DIY Kits" not "3x3"). None names another manufacturer's model the way
CubeStyle's decorated 3x3s did.

**Zero families created — type (a), scope exclusion.** Every CubeTwist product checked is
either a shape mod (non-WCA-legal, no documented significance clearing RESEARCH_SPEC §2.2's
bar) or a bandaged-cube accessory kit (a distinct, non-competitive puzzle category). No
`cubetwist` family record was created.

**A URL-reuse trap worth flagging explicitly, unrelated to the family question but
important.** The product slug `cubetwist-conjoined-3x3` was found in the prefix sweep with
only a single capture, dated 2024-03-04 — but that capture's own page title reads "3x3 Double
Cube I" and its structured spec table states **"Manufacturer: Calvin's Puzzle"**, not
CubeTwist at all. This URL almost certainly changed hands (a deleted CubeTwist product's
Shopify handle reused for an unrelated Calvin's Puzzle product) rather than representing any
CubeTwist/Calvin's Puzzle relationship. **Not actioned** — Calvin's Puzzle belongs to Agent A,
not touched here — but flagged so nobody (on either side of this research effort) misreads
this specific URL as CubeTwist evidence, or as a CubeTwist/Calvin's-Puzzle rebrand lead. This
is also a general methodological caution: a bare product-slug prefix hit is not proof the slug
still belongs to the manufacturer implied by its name; the page content must be checked.

**Rejected:** every CubeTwist product enumerated — scope exclusion (shape mods/DIY accessory
kits), not a model/variant-boundary call.

**Unresolved questions:** none of substance for the zero-family conclusion itself; the
`cubetwist-conjoined-3x3` URL-reuse question is closed (belongs to Calvin's Puzzle, not
CubeTwist, not actioned by me).

**Sources added:** `thecubicle-cubetwist-star-cube-2020`, `thecubicle-cubetwist-bandaged-
3x3-diy-kit-2019`. `thecubicle-cubetwist-star-cube` (pass 1, not superseded, both retained).

**Confidence:** `reported`-to-`probable` for the scope exclusion (single-retailer evidence,
but consistent across every product type checked, with an explicit "Type" field on each).

---
## HaiTun — 1 family

**Prior tested, held.** The task brief flagged HaiTun as "likeliest to hold something real" —
confirmed, and this is the most substantial, cleanly-documented single family in this third
assignment.

**Method.** `npm run wayback -- prefix thecubicle.com/products/haitun` (9 URLs) confirmed
pass 1's own Waverider V1 finding and surfaced the full V2 generation (Standard, Pioneer,
Flagship, Ultimate) plus a V1 Limited Edition and adjustment-tool accessory not previously
documented.

**Candidates considered:** HaiTun Waverider V1 (Flagship/Standard/Limited Edition), HaiTun
Waverider V2 (Standard/Pioneer/Flagship/Ultimate).

**Accepted (1):** `haitun-waverider` — one family across both generations. TheCubicle's own V2
description states directly: "the highly anticipated **second generation** from boutique
manufacturer HaiTun" — an explicit, unambiguous succession statement, the strongest of its
kind found in this entire third assignment.

**No aftermarket/rebrand pattern found** — both generations are described as HaiTun's own
design ("by the emerging brand Haitun Cube"; "Crafted by boutique manufacturer HaiTun"),
unlike this batch's CubeStyle finding. Positive evidence of originality, not merely an absence
of a rebrand claim.

**Rejected:** none — every HaiTun product found belongs cleanly to this one family.

**Unresolved questions:** whether HaiTun has any product beyond Waverider (none found, but a
young/thin brand with a correspondingly thin footprint at this one retailer); exact V1
introduction date precision (month-level from a genuinely trustworthy "Added" field, a rare
case in this register where that field was not the suspect recurring date).

**Sources added:** `thecubicle-haitun-waverider-v2-standard-2026`, `thecubicle-haitun-
waverider-v2-ultimate-2026`. `thecubicle-haitun-waverider-v1-2024` (pass 1, reused).

**Confidence:** `reported` throughout (tier 2 retailer sources, mutually consistent, explicit
succession language, nothing contradicting).

---
## Ninja — 0 families (scope exclusion, type (a) — the (b) prior did not hold)

**Prior tested, did not hold.** The task brief flagged Ninja as a likely type (b)
(aftermarket/rebrand) candidate on prior signal, alongside CubeTwist. Tested directly, same
result as CubeTwist: no base-model-naming claim was found anywhere in Ninja's catalogue,
across two independent retailers.

**Method.** `npm run wayback -- prefix thecubicle.com/products/ninja` (6 URLs: base Ghost
Cube, Starry Sky variant, Unstickered variant) and, independently, `npm run wayback -- prefix
speedcubeshop.com/products/ninja` (16 URLs, all the same single Ghost Cube listing with
tracking-parameter variants). Both the base Ghost Cube and the Starry Sky decorated variant
were fetched directly and checked specifically for a CubeStyle-style base-model attribution;
neither makes one.

**Finding.** "The Ninja Ghost Cube is a very challenging 3x3 shape mod" (base) / "a special
3x3 Ghost Cube with a starry sky pattern printed on all 6 sides" (Starry Sky) — both
"Type: Shape Mods" per TheCubicle's own field, no external manufacturer named. A Ghost Cube is
a non-WCA-legal shape modification (the solved state is not a cube), with no documented
historical or collector significance beyond generic novelty description found at either
retailer — fails RESEARCH_SPEC §2.2's conditional-admission bar.

**Zero families created — type (a), scope exclusion**, corroborated at two independent
retailers with no exception. No `ninja` family record was created.

**A "Ghost Hand" lead noted in pass 1 remains unactioned**, as pass 1 itself flagged — a
separate manufacturer name, not investigated this pass (not in my assigned queue).

**Rejected:** every Ninja product found (base, Starry Sky, Unstickered Ghost Cube) — scope
exclusion.

**Unresolved questions:** none of substance for the zero-family conclusion; "Ghost Hand"
remains an open long-tail lead for whoever is assigned it.

**Sources added:** `thecubicle-ninja-ghost-cube-2020`, `speedcubeshop-ninja-ghost-cube-2019`.

**Confidence:** `confirmed`-adjacent for the scope exclusion (two independent tier 2 retailers,
mutually consistent, no exception).

---

## Third assignment complete — summary

All six final unassigned entities researched: `hellocube` (0 — type (a)), `newisland` (2),
`cubestyle` (1, plus a documented type (b) finding excluded from the family count), `cubetwist`
(0 — type (a), tested and rejected a (b) prior), `haitun` (1), `ninja` (0 — type (a), tested
and rejected a (b) prior). **4 families across 6 manufacturers, 3 zero-family findings, all
type (a) scope exclusions, and one genuine type (b) aftermarket finding (CubeStyle) that
correctly produced fewer families than candidate products, not more.**

**On the task brief's two-kind-of-zero framework:** all three zero-family results this batch
(`hellocube`, `cubetwist`, `ninja`) are **type (a) scope exclusions** — non-3x3x3 mechanisms
(Gear Cubes, shape mods, DIY bandaging kits), each corroborated across independent sources or
multiple product checks. **No pure type (b) zero-family case occurred this batch** — CubeStyle
produced a type (b) finding but the manufacturer itself still had one genuine family
(`cubestyle-3x3`), so it was not a zero-family result. The two entities flagged as likeliest
type (b) candidates (CubeTwist, Ninja) tested negative for that specific pattern and resolved
as ordinary type (a) exclusions instead — the prior was worth testing but did not hold for
either.

**CubeStyle's finding is this session's clearest type (b) case**, better-evidenced than
Z-Cube's (a direct tier 2 retailer statement naming the exact base models — QiYi Warrior W,
YJ GuanLong — for two separate CubeStyle-branded products) rather than a single tier 4 wiki
claim. Neither QiYi nor YJ's manufacturer record was touched; the finding is preserved as a
cross-manufacturer lead in two new sources for whoever next works either brand's variant tree.

**A methodological finding worth flagging on its own:** the `cubetwist-conjoined-3x3` URL
slug was found, on its only capture, to actually belong to a completely different manufacturer
(Calvin's Puzzle) that had since taken over the same product handle. Not acted on (Calvin's
Puzzle is Agent A's), but recorded as a general caution: a product-slug prefix hit naming a
manufacturer is not proof the current page content still belongs to that manufacturer — the
page must be checked, not just the URL.

**Sub-brand caution:** none of these six entities carry an existing sub-brand/parent
relationship, so this specific caution did not apply this batch.

**Sources added:** 10 new sources this batch, reusing 4 existing pass-1 sources rather than
duplicating them.

**Per the coordinator's instruction: this exhausts the entire unassigned pool. Stopping here
and reporting back rather than looking for further work.**
