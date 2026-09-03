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
