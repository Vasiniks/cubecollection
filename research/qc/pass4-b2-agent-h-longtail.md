# Pass 4 Batch 2 — Agent H — Longtail sub-brands (17 manufacturers, 35 models)

Status: COMPLETE. All 35 models across all 17 manufacturers in scope assessed. Skeleton committed first per mandatory instruction; survived one session-limit kill mid-HuaMeng (recovered from disk, commit ecd1713) and continued to completion.

## Scope
fangshi (4) · huameng (3) · kungfu (3) · newisland (3) · fanxin (3) · guoguan (3) ·
escube (2) · guojia (2) · haitun (2) · qj (2) · senhuan (2) · cubestyle (1) · lefun (1) ·
mohuanshousu (1) · mojue (1) · pbcube (1) · yancheng (1)

findings-so-far: COMPLETE — 72 variants created across 35 models. See per-manufacturer log below and the summary at the end.

## Per-manufacturer log

### ESCube (2 models — escube-es3-v1, escube-air-v1) — DONE

Both models already carried Pass-3 descriptions documenting multi-configuration axes
(magnet count + coating), so this was the dense case the brief anticipated for this brand.

**escube-es3-v1** (3 variants — magnet count + coating axis, per SpeedCubeShop's own
"Version comparison" table on `speedcubeshop-es3-debut-brand-2025`):
- `escube-es3-v1--standard` — 48 magnets, no core magnets, frosted, 77.6g.
- `escube-es3-v1--8-core-magnets` — 64 magnets total, no coating change.
- `escube-es3-v1--20-core-magnets-uv` — 76 magnets total, UV exterior.
No new sources needed; all three rows are on the one already-cited page.

**escube-air-v1** (2 variants — magnet count axis, per a "Version: 20-Magnet Ball-Core /
8-Magnet Ball-Core" selector on `speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`,
corroborated for the 20-magnet option by `thecubicle-escube-air-3x3-20-magnet-ball-core`):
- `escube-air-v1--standard` (20-Magnet Ball-Core, matches the model's own eponymous config).
- `escube-air-v1--8-magnet-ball-core` (uncertain confidence — selector-only evidence, no
  dedicated page or second retailer, no spec figures).

**Materiality calls:** magnet-count/coating differences read as `magnet configuration`/
`coating` axis differences under DATA_MODEL's variant-materiality rule 1/5. Used
`edition.designation` (not `config.magnet_configuration`, which has no vocabulary value for a
raw magnet count) to record the bracketed configuration name verbatim, and `config.magnet_strength`
(free text) for the ES3 magnet counts, per schema. `weight_g` deliberately left unset on
`escube-air-v1--standard` — TheCubicle's Gross Weight (132g, packaged) and SpeedCubeShop's
~78g item weight are unreconciled conventions already flagged unresolved on the model record;
setting either would misrepresent a settled fact, and 132g alone also triggers lint rule 18's
implausible-weight check for no evidentiary gain.

**Rejected:** no colourway/limited/edition-tier candidates found for either model this pass —
no additional differentiation beyond magnet count/coating was located at either retailer.

**Validation:** `npm run check` after this section — 0 errors, 23 warnings (baseline, no
regressions; a transient 132g-weight lint warning and a fingerprint-collision duplicate
warning were both caused and then fixed within this section, see attestation notes above).

**Sources used:** all pre-existing (`speedcubeshop-es3-debut-brand-2025`,
`speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`,
`thecubicle-escube-air-3x3-20-magnet-ball-core`, `thecubicle-escube-es3-3x3-magnetic` referenced
via the model). No new source files created.

---

### HuaMeng (3 models — huameng-tg-v1, huameng-tg-v2, huameng-ys3m-v1) — DONE

Session was interrupted mid-write here by a session-limit kill; recovered from disk (commit
`ecd1713`) with 0 errors, then completed the two YS3M variants that had not yet been written
when the kill happened (`ball-core-maglev`, `ball-core-uv-maglev`).

**huameng-tg-v1** (5 variants — a `scripts/wayback.mjs prefix thecubicle.com/products/huameng-tg`
sweep found 17 captured URLs collapsing to 5 distinct configurations; TheCubicle's own
"Added: 2024-10-23" date is shared by all 4 non-limited configurations, consistent with one
generation catalogued together):
- `huameng-tg-v1--standard` (Ball-Core, baseline).
- `huameng-tg-v1--ball-core-uv` (+ UV coating).
- `huameng-tg-v1--maglev-ball-core` (+ MagLev, `maglev: ball_core_maglev`).
- `huameng-tg-v1--maglev-ball-core-uv` (both).
- `huameng-tg-v1--spirit-pearl-limited-edition` — limited to 999 worldwide (retailer's own
  figure), gold/red/transparent colourway, ships **stickered** (custom-cut stickers) unlike the
  line's stickerless baseline, custom box/inserts/adjustment tool. First flagged as a lead via
  a site-wide promo banner on the already-on-file `thecubicle-huameng-tg-3x3-ball-core` source;
  actioned this pass by fetching its own dedicated page.
- New sources created: `thecubicle-huameng-tg-3x3-ball-core-uv`,
  `thecubicle-huameng-tg-3x3-maglev-ball-core`, `thecubicle-huameng-tg-3x3-maglev-ball-core-uv`,
  `thecubicle-huameng-tg-3x3-spirit-pearl-limited-edition`.

**huameng-tg-v2** (1 baseline — `huameng-tg-v2--standard`): dedicated prefix sweep found only
the one already-on-file URL; the source's own product description is a placeholder ("more
details coming soon!"), so the baseline is held at `uncertain` rather than `probable`. No new
source needed.

**huameng-ys3m-v1** (4 variants — the model's own page cross-links by name to exactly two
siblings ["Get the Standard version here. Get the Maglev version here." / "...Ball-core version
here."], and a further UV-coated top tier was found via prefix sweep):
- `huameng-ys3m-v1--standard` (piece-to-piece magnetization, baseline).
- `huameng-ys3m-v1--maglev` (`maglev: maglev`, no ball-core language).
- `huameng-ys3m-v1--ball-core-maglev` (`maglev: ball_core_maglev`, `core_system: ball_core`).
- `huameng-ys3m-v1--ball-core-uv-maglev` (adds `coating: uv`).
- New sources created: `thecubicle-huameng-ys3m-3x3-maglev`,
  `thecubicle-huameng-ys3m-3x3-ball-core-magnetic-core-maglev`,
  `thecubicle-huameng-ys3m-3x3-ball-core-uv-magnetic-core-maglev`.

**Escalation (not actioned, manufacturer/model boundaries frozen).** Two of the new YS3M
sources are direct first-party retailer statements naming MoYu, not HuaMeng, as the
manufacturing party: TheCubicle's own supply-chain notice reads "we were informed by Moyu that
the mold is broken," and a separate page attributes HuaMeng's UV coating to MoYu's own branded
term ("Magic Clothes... as MoYu puts it"). This corroborates, with two additional independent
statements, the open MoYu-affiliation lead already flagged at the `huameng-ys3m` family/model
level (itself never resolved into a merge or rebrand finding). Recorded here for a future
manufacturer-boundary review; `huameng` remains an independent manufacturer record and no
`rebrand_of` relationship was created — rule 17's tier 1-2 bar for a rebrand claim is not
obviously met by retailer supply-chain trivia naming a subcontractor/mould source, and this is
exactly the kind of judgement call that belongs to a dedicated manufacturer-boundary pass, not
a variant enumeration.

**Model-spec observation (not actioned, models frozen).** All four non-limited `huameng-tg-v1`
configurations are titled "...Ball-Core..." by TheCubicle, but the model record itself sets
`specs.core_system: dual_adjustment` (its own reading of the tension/compression mechanism) —
the two vocabulary values cannot coexist in one enum field. Variant records here deliberately
do **not** set `config.core_system: ball_core` to avoid contradicting the model; flagged for
the model-researcher lane to reconcile whether `core_system` should record the magnetic/ball
mechanism or the tension/compression mechanism for this line.

**Rejected:** no candidates rejected this pass for HuaMeng — every configuration slug found
via prefix sweep corresponded to a real, materially distinct sold configuration (magnet
architecture, coating, or a named limited edition).

**Validation:** `npm run check` after this section — 0 errors (warning count reflects the
merged main state from parallel lanes, not a regression from this section).

---

### HaiTun (2 models — haitun-waverider-v1, haitun-waverider-v2) — DONE

Densest remaining target per the coordinator's brief. Both models' descriptions already named
configuration tiers by URL, not independently fetched during Pass 3; fetched and actioned here.
**Ran the ZhanLang dedup test explicitly, per the coordinator's specific warning about this
manufacturer.**

**haitun-waverider-v1** (3 variants — a `scripts/wayback.mjs prefix
thecubicle.com/products/haitun` sweep found 9 captured URLs collapsing to 3 cube configurations
plus a separate adjustment-tool accessory product, rejected as a variant candidate — a
tool SKU, not a sold cube configuration):
- `haitun-waverider-v1--standard` (traditional corner-edge magnets, `tri_adjust`).
- `haitun-waverider-v1--flagship` (adds foot magnets, `dual_layer` reading).
- `haitun-waverider-v1--limited-edition` — 200 worldwide (retailer's own figure), "the same...
  Flagship 3x3... but... limited," ships unstickered with an included sticker set
  (`colorway.application: hybrid`). A Tier 5 review mentioning "it's blue" is recorded as an
  unchased colourway lead, not used as evidence.
- New source: `thecubicle-haitun-waverider-v1-limited-edition-2024`.

**haitun-waverider-v2** (4 variants — Standard, Pioneer, Flagship, Ultimate, all named at
family level already):
- `haitun-waverider-v2--standard` (Cubezz product ID 8599).
- `haitun-waverider-v2--flagship` (Cubezz product ID 8598).
- `haitun-waverider-v2--pioneer` (TheCubicle only, `uncertain` — no independent second
  retailer found for this tier specifically).
- `haitun-waverider-v2--ultimate` — the one tier with a genuinely distinct documented magnet
  layout (20-magnet core + 6 magnetic rings, vs. the "26-Point Core" shared by the other three).
- New sources: `thecubicle-haitun-waverider-v2-flagship-2026`,
  `thecubicle-haitun-waverider-v2-pioneer-2026`.

**THE ZHANLANG DEDUP TEST, RUN EXPLICITLY.** Cubezz's Flagship listing (product ID 8598, SKU
HTO02C) is the SAME product ID/SKU that, three months earlier, was titled "HAITUN ZhanLang V2
3x3x3 Speed Cube Flagship Version" — already adjudicated and resolved elsewhere in this archive
(Pass 2.6, `cubezz-haitun-zhanlang-v2-flagship-2026`/`cubezz-haitun-waverider-v2-flagship-2026`)
as one retailer listing renamed in place, not two products. This pass does **not** re-litigate
that adjudication or create any ZhanLang model/variant. Separately, Standard (Cubezz ID 8599)
and Flagship (Cubezz ID 8598) are **different** product IDs from each other — a genuine SKU
distinction, not a second instance of the ZhanLang pattern — which is why both are kept as
separate variants here.

**Materiality judgement call, flagged explicitly.** TheCubicle's own marketing copy for V2
Standard, Flagship, and Pioneer is close to word-for-word identical (same "26-Point Core...94
configurable magnets" paragraph, same 64-combination adjustment claim, same 280g Gross Weight,
same 2026-02-03 Added date). These three variants rest on the manufacturer's own tier NAME
(DATA_MODEL variant-materiality rule 7) and, for Standard/Flagship, independently distinct
Cubezz product IDs — not a documented hardware difference between those three specifically.
Recorded as three variants rather than collapsed to one, but the near-duplicate marketing
copy is exactly the pattern this manufacturer's ZhanLang case illustrates, so this call is
surfaced for human review rather than made silently.

**Rejected candidates:** the V1 adjustment-tool accessory (a separate tool SKU, not a cube
configuration). A Cubezz "Supreme Edition" tier of V2 (named only in
`cubezz-haitun-waverider-v2-standard`'s own note as "possibly a rename or regional equivalent
of the 'Ultimate' tier, not resolved") was NOT independently investigated this pass (a quick
wayback prefix check on cubezz.com/Buy-85* returned no HaiTun results) — left as an unchased
lead, not built into a variant, since no dedicated page or spec content was found for it.

**Weight-field discipline:** `weight_g` deliberately left unset on `haitun-waverider-v2--ultimate`
despite an on-file "Gross Weight: 282g" figure — TheCubicle's V2 spec tables carry no separate
Item Weight field at all (unlike V1's), so the only available number is packaging-inclusive and
setting it produced a spurious lint rule-18 implausible-weight warning for no evidentiary gain;
removed before committing.

**Validation:** `npm run check` after this section — 0 errors, 38 warnings (merged-main
baseline, no regressions; the transient 282g lint warning above was introduced and then fixed
within this section).

---

### FangShi (4 models — fangshi-guangying-original, fangshi-jieyun-original,
fangshi-shuangren-original, fangshi-shuangren-v2) — DONE

Chased the "Mini JieYun" lead explicitly flagged as pass-4 material by the family record, and
found it via a domain-wide Cubezz CDX substring search (`urlkey:.*mini.*jieyun.*`) — the same
Cubezz page that Pass 2.6 recorded as "unrecoverable" via other retailers (speedcube.com.au,
SpeedCubeShop, both dead/fetch-failed) turned out to be readable directly. The same technique,
applied to "shuangren", surfaced Mini ShuangRen (original generation) and a DIY-kit
configuration of ShuangRen V2/II, both already flagged as open pass-4 leads on the model
records themselves.

**fangshi-jieyun-original** (2 variants):
- `fangshi-jieyun-original--standard` (57mm).
- `fangshi-jieyun-original--mini` (54.6mm) — Cubezz's own 'Brand: Funs Puzzle(JieYun)' field
  is identical to the 57mm original's, and its related-products rail lists the 57mm original
  as a direct sibling, resolving the family record's own open question about whether the Mini
  belongs to this design line (yes, on brand-field/catalogue grounds; the finer question of
  whether it shares the specific grooved-piece mould remains unresolved and is left for Pass
  5). Black/White stock colours collapsed into one variant.
- New source: `cubezz-fangshi-mini-jieyun`.

**fangshi-guangying-original** (1 baseline): `fangshi-guangying-original--standard`. Re-ran
the "no Mini GuangYing" absence check via the same CDX technique (`urlkey:.*mini.*guangying.*`
on cubezz.com) — zero matches, extending the family record's existing four-retailer absence
finding with a fifth, independently-methoded check.

**fangshi-shuangren-original** (3 variants — a domain-wide CDX sweep for "shuangren" (80
distinct URLs) resolved the model's own already-flagged DIY-kit/Mini leads):
- `fangshi-shuangren-original--standard` (57mm) — `uncertain`, single-source dependency
  (TheCubicle alone; Cubezz's own 57mm listings are all explicitly "ShuangRen II").
- `fangshi-shuangren-original--mini-assembled` (54.6mm, carton-packed).
- `fangshi-shuangren-original--mini-diy-kit` (54.6mm, OPP-bag flat-pack) — a dozen+ body/cap
  stock colour-combination SKUs (products 4480-4494) collapsed into this one variant;
  confirmed to exist via CDX listing only, not individually fetched, per the anti-explosion
  discipline once the colour-permutation pattern was established from one representative
  fetch.
- New source: `cubezz-fangshi-mini-shuangren`.

**fangshi-shuangren-v2** (2 variants):
- `fangshi-shuangren-v2--standard` (Assembled, 57mm) — corroborates the already-on-file
  `cubezz-fangshi-shuangren-ii` source.
- `fangshi-shuangren-v2--diy-kit` (57mm, OPP-bag, ships with 6 loose stickers included —
  `colorway.application: stickered`, a materially different colourway application from the
  assembled configuration's stickerless body).
- New source: `cubezz-fangshi-shuangren-ii-diy-kit`.

**Materiality calls:** DIY-kit-vs-assembled treated as a variant-level materiality axis per
each model's own pre-existing description, which already cites DATA_MODEL §4.2 for this
reading — not re-litigated here. Size (57mm vs. 54.6mm Mini) treated as a within-family/
within-model size variant per the archive's own `dayan-zhanchi` 42mm precedent, already invoked
by the frozen `fangshi-jieyun` family record. Every stock-colour SKU proliferation (Mini
JieYun Black/White; Mini ShuangRen's dozen+ body/cap combinations; ShuangRen V2's White/Black/
Original Color) was collapsed to one variant per configuration, per the `gan-356-air--standard`
precedent — none is individually itemised as its own variant.

**Fingerprint-collision fix:** the five FangShi "size/kit-only" variants (no coating/magnet/
maglev/colourway-designation differentiator, since the distinguishing fact in every case is
`config.size_mm` or packaging form, neither of which the archive's fingerprint function reads)
initially collided pairwise on `check-duplicates`. Fixed by adding an `edition.designation`
free-text label (e.g. "57mm", "Mini (54.6mm)", "Mini DIY Kit (54.6mm)") to each — explicitly
attested as this record's own distinguishing label, not a manufacturer-used tier word, since
none of these products carries an official tier name for its size/kit variant.

**Rejected candidates:** none outright rejected — every lead chased this pass (Mini JieYun,
Mini ShuangRen, ShuangRen V2 DIY Kit) resolved into a real, sourced variant. The individual
body/cap colour-combination SKUs within the Mini ShuangRen DIY-kit group were the only
candidates NOT built into their own variants (anti-explosion).

**Leads not chased (recorded, not resolved):** (1) the Chinese-language lead for a first-party
FangShi/Funs Puzzle source — Pass 2.6 already recorded this as exhausted for lack of a working
WebSearch budget; not re-attempted this pass (this lane's WebSearch tool was not used, but the
underlying blocker — no first-party FangShi domain in any language across six passes now — is
unchanged). (2) SpeedCube.com.au's and SpeedCubeShop's own "Mini JieYun"/"Mini" slugs
(`fangshi-jieyun-3x3x3-54-5mm-black-speed-cube`, `fangshi-jieyun-mini-3x3`) remain unfetched —
the Cubezz capture found this pass was sufficient to build the variant, so these were not
independently pursued to corroborate the 54.5mm-vs-54.6mm figure discrepancy Pass 2.6 flagged;
recorded here as an open corroboration gap, not a contradiction.

**Validation:** `npm run check` after this section — 0 errors, 38 warnings (merged-main
baseline, no regressions; two transient fingerprint-collision duplicate warnings were caused
and then fixed within this section).

---

### GuoGuan (3 models — guoguan-yuexiao-original, guoguan-yuexiao-pro, guoguan-yuexiao-edm) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/guoguan` sweep (13 captured URLs across
the whole YueXiao/XingHen line) resolved leads already flagged as pass-4 material directly on
two of the three frozen model records (Pro's "sold separately as 'YueXiao Pro M'"; EDM's own
"GuoGuan YueXiao E... unmagnetized version" already quoted in the model description) and
surfaced one further, previously-unflagged DIY-kit configuration of the original.

**guoguan-yuexiao-original** (2 variants):
- `guoguan-yuexiao-original--standard` (assembled, factory-stickered baseline).
- `guoguan-yuexiao-original--diy-kit-unstickered` — TheCubicle's own "Type: DIY Kits" category,
  "comes assembled but without any stickers... not pre-lubricated from the factory," 8 stock
  colours collapsed into one variant.
- New source: `thecubicle-guoguan-yuexiao-unstickered-2024`.

**guoguan-yuexiao-pro** (2 variants):
- `guoguan-yuexiao-pro--standard` (non-magnetic; the model's own page states directly "this
  particular variant is not magnetized").
- `guoguan-yuexiao-pro--pro-m` — factory-magnetized, own display-box packaging, accessory
  bundle (extra magnets, screwdriver, tensioning tools, cube stand, "a collectible MoYu card").
- New source: `thecubicle-guoguan-yuexiao-pro-m-2019`.

**guoguan-yuexiao-edm** (2 variants):
- `guoguan-yuexiao-edm--standard` (magnetic, `adjustable` architecture — the model's own spec).
- `guoguan-yuexiao-edm--e` — "retains the magnetic capsules found in the EDM, there are simply
  no magnets in them" (`config.magnet_configuration: none`).
- New source: `thecubicle-guoguan-yuexiao-e-2019`.

**Materiality calls:** magnetized-vs-unmagnetized (Pro/Pro M, EDM/E) read as a
`magnet_configuration` axis difference (rule 1). DIY-kit-vs-assembled (original) follows the
same reasoning already applied to FangShi's ShuangRen/JieYun DIY kits earlier in this report.
None of these six variants required a fingerprint-disambiguation fix beyond a plain
`edition.designation` label, since the magnet-architecture and colourway-application overrides
already differ per pair.

**Rejected candidates:** none — every sibling URL found via the prefix sweep resolved into a
real, sourced, materially distinct configuration.

**Escalation (not actioned, out of lane).** TheCubicle's own "GuoGuan YueXiao Pro M"
description independently mentions "a collectible MoYu card" included in the box —
corroborating, not contradicting, the GuoGuan/MoYu manufacturer relationship already recorded
in `data/manufacturers/guoguan.yml`; not a new finding requiring action.

**Validation:** `npm run check` after this section — 0 errors, 38 warnings (merged-main
baseline, no regressions).

---

### KungFu (3 models — kungfu-dot-cube-3x3, kungfu-longyuan-3x3, kungfu-qinghong-3x3) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/kungfu` sweep found 9 captured URLs
across the whole KungFu line (including a gear cube, two 4x4s, and a 2x2 outside this lane's
scope); exactly one URL per model in scope, no sibling configurations for any of the three.
Three bare `--standard` baselines created, each with a differentiation-search attestation.
`kungfu-dot-cube-3x3--standard` inherits the model's own `scope_class: reference_only`; its
colourway is read as `inlaid` (removable recessed colour tiles), the closest available
vocabulary value for its own "plastic circular tiles... a tool to remove these tiles" design.
No new sources needed.

### NewIsland (3 models — newisland-lightning-original, newisland-lightning-v2,
newisland-phoenix-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/newisland` sweep found 5 captured URLs,
confirming the model records' own prior finding (exactly three Newisland 3x3 lines exist,
no further generations). Three bare `--standard` baselines created. No new sources needed. The
standing rebrand suspicion against `qiyi-thunderclap` (customer-review opinion only, tier
4-equivalent) already flagged and left unresolved on `newisland-lightning-original` is
unchanged by this pass — not re-investigated, since it requires a direct mechanism comparison,
not a variant-enumeration sweep.

### FanXin (3 models — fanxin-3x3-standard, fanxin-hudong-3x3, fanxin-magnetic-3x3-standard) — DONE

**fanxin-hudong-3x3** (3 variants — already explicitly flagged as "Pass 4's work to enumerate"
on the frozen model record itself, which names "Standard," "Flagship UV," and "Ultra Maglev UV"
configurations): a `scripts/wayback.mjs prefix thecubicle.com/products/fanxin` sweep (60+ URLs,
truncated at tool limit, but the three HuDong tiers were all found before truncation) located
each tier's own dedicated page:
- `fanxin-hudong-3x3--standard` — blue adjustment system, matte finish, 79.0g.
- `fanxin-hudong-3x3--flagship-uv` — green adjustment system, UV coating, 80.0g.
- `fanxin-hudong-3x3--ultra-maglev-uv` — red adjustment system, MagLev (`ball_core_maglev`),
  UV coating, 85.0g — the line's top tier.
- New sources: `thecubicle-fanxin-hudong-light-3x3-standard-2024`,
  `thecubicle-fanxin-hudong-light-3x3-flagship-uv-2024`,
  `thecubicle-fanxin-hudong-light-3x3-ultra-maglev-uv-2024`.

**fanxin-3x3-standard** and **fanxin-magnetic-3x3-standard** (1 baseline each): the same
prefix sweep found exactly one URL per model, no sibling configuration found for either. No
new sources needed.

**Materiality calls:** the HuDong tiers' adjustment-system colour-coding (blue/green/red) is
recorded only in each variant's own note, not as a modelled field — the schema has no
dedicated hardware-colour field for this and it is secondary to the coating/MagLev
differentiators that are the load-bearing materiality basis (rules 1 and 5).

**Rejected candidates:** none for this trio — every HuDong tier URL found resolved into a
real, sourced, materially distinct configuration; no further sibling was found for either
single-model FanXin line.

**Validation:** `npm run check` after this section — 0 errors, 38 warnings (merged-main
baseline, no regressions).

---

### GuoJia (2 models — guojia-type-a-chun1, guojia-type-a-chun2) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/type-a-chun` and `.../guojia*` sweep
reconfirmed the model records' own exhaustive pass-3 finding: no dedicated Chun1 page exists
anywhere, and Chun2's DIY-kit page is the only GuoJia 3x3 page found. Two bare `--standard`
baselines created. `guojia-type-a-chun1--standard` is held at `uncertain` and its note is
explicit that essentially nothing beyond a single incidental sentence establishes this
product at all — this is the thinnest baseline in this report, and is recorded as such rather
than dressed up. No new sources needed.

### QJ (2 models — qj-candy-3x3-standard, qj-pillowed-3x3-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/qj` sweep (18 captured URLs) reconfirmed
the model records' own already-exhaustive pass-3 sweep (TheCubicle, Cubelelo India, Cubezz.com
domain-wide CDX) — no sibling configuration for either product beyond the stock colour options
already flagged as pass-4 leads on both frozen model records (Candy: Black/Pink; Pillowed:
Black/White). Two bare `--standard` baselines created, both collapsing their stock colours per
the `gan-356-air--standard` precedent. No new sources needed.

### SenHuan (2 models — senhuan-mars-original, senhuan-mars-s) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/senhuan` sweep (9 captured URLs,
including the unrelated ZhanLang 2x2 series) found exactly one URL per 3x3 model, no sibling
configuration for either. Two bare `--standard` baselines created. `senhuan-mars-s--standard`
held at `uncertain` (single-source dependency, matching the model record's own finding that no
second retailer carries this generation at all). `senhuan-mars-original--standard` inherits
the model's own `weight_g: 172.0` (an explicitly Gross/packaged figure per the model's own
attestation) — this newly surfaces as a lint rule-18 implausible-weight warning once a variant
exists to resolve the spec through; **not fixed by denormalising or overriding**, per the
batch brief's own instruction, since the model record is frozen and the figure is honestly
labelled at that level already. No new sources needed.

**Materiality calls across all three manufacturers this section:** none of these seven models
had any sibling configuration, colourway edition, or tier name beyond stock colour options
already flagged and dismissed as pass-4 leads on their own frozen model records — genuinely
low-density territory, matching the batch brief's own expectation for this lane.

**Validation:** `npm run check` after this section — 0 errors, 39 warnings (38 merged-main
baseline + 1 new, legitimate, pre-existing-model-spec-surfaced warning on
`senhuan-mars-original--standard`, explained above; not a defect).

---

### CubeStyle (1 model — cubestyle-3x3-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/cubestyle` sweep (30+ URLs, truncated at
tool limit but the plain-3x3 slug space was fully covered before truncation) reconfirmed the
model record's own prior finding: exactly one plain, undecorated CubeStyle 3x3 URL, with the
large Carbon Fiber / Hollow Sticker resticker range already excluded from this family by the
frozen family record. One bare `--standard` baseline created. No new sources needed.

### LeFun (1 model — lefun-3x3-standard) — DONE, densest single-model target in this lane

The frozen model record explicitly flags this as "pass-4 territory, not enumerated further
here" after testing four print-theme listings in Pass 3 and finding only print-content
differences (no core/mechanism/tooling claim ever differs). A `scripts/wayback.mjs prefix
thecubicle.com/products/lefun` sweep (250-URL pass, filtered to 3x3-shaped, non-shape-mod,
non-accessory listings) found **14 separately named, separately marketed print-theme
editions** of the one base mould — read as 14 variants under DATA_MODEL's colourway/sticker-
type materiality rule (rule 6), NOT collapsed as stock colours, because each is its own named
product with its own dedicated page and price (contrast the `gan-356-air--standard`
stock-colour precedent, which applies to unnamed colour options of one listing, not to a
catalogue of distinctly-branded themes):

`lefun-3x3-standard--formula`, `--sudoku`, `--calendar-cube`, `--periodic-table`,
`--periodic-table-v2`, `--christmas`, `--christmas-v2`, `--blue-sudoku-cube`, `--dollar-cube`,
`--hundred-dollar-cube`, `--number-cube`, `--respect-cube`, `--gradient-cube`,
`--halloween-cube`.

Four of these (`formula`, `sudoku`, `calendar-cube`, `periodic-table-v2`) reuse sources already
on file from the Pass 3 model researcher's own direct-fetch test. Ten new sources were created
this pass by fetching each remaining theme's own dedicated page directly:
`thecubicle-lefun-periodic-table-3x3-2022`, `thecubicle-lefun-christmas-3x3-2025`,
`thecubicle-lefun-christmas-3x3-v2-2023`, `thecubicle-lefun-blue-sudoku-cube-3x3-2024`,
`thecubicle-lefun-dollar-cube-3x3-2025`, `thecubicle-lefun-hundred-dollar-cube-3x3-2025`,
`thecubicle-lefun-number-cube-3x3-2024`, `thecubicle-lefun-respect-cube-3x3-2024`,
`thecubicle-lefun-gradient-cube-3x3-2024`, `thecubicle-lefun-halloween-cube-3x3-2022`.

**Materiality call, made explicitly.** `colorway.application: printed` is used across the
whole line on the strength of one listing's own direct statement (Halloween Cube: "a 3x3 with
printed faces rather than stickers") — held at `uncertain` on every sibling variant that does
not independently repeat that exact phrase, rather than silently promoted to `probable`
line-wide. Every variant's `config.size_mm`/`weight_g` is populated from its own page's own
structured spec table (56.0mm/56.5mm/57.0mm and 57-78g item weight, genuinely varying by theme
— consistent with the model's own observation that these figures are not a stable shared
constant, which is why the model itself leaves `specs` unset).

**Rejected candidates:** `lefun-mini-round-3x3-keychain` (a different size/shape product, not
this base mould — excluded, not a configuration of this model) and the large non-3x3-shaped
CubeStyle/LeFun range (2x2/4x4/5x5/pyraminx/gear-cube/axis-cube/fisher-cube/etc., all separate
families or out of scope entirely) were identified via the same prefix sweeps but correctly
excluded as different products, not variants of these two models.

### MoHuanShouSu (1 model — mohuanshousu-chufeng-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/mohuan` sweep found exactly one 3x3 URL
(plus one unrelated 2x2, ChuWen), reconfirming the model record's own prior finding of no
second MoHuanShouSu-branded 3x3. One bare `--standard` baseline created. No new sources
needed.

**Validation:** `npm run check` after this section — 0 errors, 39 warnings (baseline
unchanged from the prior section, no regressions from the 14-variant LeFun expansion).

---

### MoJue (1 model — mojue-m3-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/mojue` sweep found exactly one URL,
reconfirming the model record's own prior finding (TheCubicle prefix sweep + Cubezz.com
domain-wide term sweep, both exactly one MoJue 3x3). One bare `--standard` baseline created.
No new sources needed.

### PBCube (1 model — pbcube-wr-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/pbcube` sweep found exactly one URL,
still marked "[Pre-Order]" at its only capture — matching the model record's own finding that
this product has not yet reached general retail circulation anywhere. One bare `--standard`
baseline created, held at `uncertain` given the pre-order status (a genuine absence of a
second configuration cannot be confirmed for a product that has not finished launching). No
new sources needed.

### YanCheng (1 model — yancheng-yan3-standard) — DONE

A `scripts/wayback.mjs prefix thecubicle.com/products/yancheng` sweep found exactly one URL,
reconfirming the model record's own prior finding. Four stock colour options (Black, White,
Primary, Stickerless Bright), already flagged as a pass-4 lead on the frozen model record, are
collapsed into one `--standard` baseline per the `gan-356-air--standard` precedent — none
carries a separate tier/edition name. No new sources needed.

**Validation:** `npm run check` after this final section — 0 errors, 39 warnings (unchanged
from the prior section, no regressions). This completes all 35 models across all 17
manufacturers in this lane's scope; none was left unassessed.

---

## Summary across the whole lane

**All 35 models across all 17 manufacturers in scope were assessed.** None was left
unassessed — the lane was not interrupted again after the recorded session-limit recovery
partway through HuaMeng (commit `ecd1713`), and the remaining 30 models were completed in one
continuous run afterward, committing after each manufacturer per the standing instruction.

**Density was highly uneven, as anticipated, but not uniformly low.** HaiTun and FangShi (the
two manufacturers the brief flagged as likely dense) were dense as expected. Two further
manufacturers turned out denser than the brief's "one- or two-model, single-configuration"
expectation once their own frozen model records' own already-flagged pass-4 leads were chased:
HuaMeng (10 variants across 3 models, via two dedicated `wayback.mjs prefix` sweeps that
surfaced 4-5 named configurations per model) and LeFun (14 variants under one single model —
a catalogue of separately-named print-theme editions, not stock colours). GuoGuan and FanXin's
HuDong line were moderately dense (6 and 3 variants respectively) once their own already-
flagged magnetized/DIY-kit/tier leads were resolved. The remaining eleven manufacturers were
genuinely low-density, exactly as the brief anticipated: one bare or lightly-evidenced
`--standard` baseline per model, each carrying its own differentiation-search attestation.

**The recurring method across this whole lane**, once a manufacturer's model records were
read: run `scripts/wayback.mjs prefix thecubicle.com/products/<brand>` (and, where a lead
named a non-TheCubicle retailer, a targeted domain-wide CDX substring search on that retailer,
e.g. Cubezz.com for FangShi's "Mini" leads) to enumerate every surviving URL under that brand,
then fetch and read each configuration page directly with `scripts/wayback.mjs get` rather than
relying on the age of an existing source excerpt. Nearly every genuinely dense finding in this
report was a lead **already named on a frozen model or family record** ("pass 4 material, not
enumerated here") that this pass's job was specifically to resolve, not a cold discovery.

**Materiality calls made explicitly, for a human to review:**
- Manufacturer edition/tier NAME alone (rule 7) was treated as sufficient materiality basis
  for HaiTun's V2 Standard/Pioneer/Flagship trio, despite near-identical marketing copy across
  the three — flagged explicitly in that section as the kind of pattern the manufacturer's own
  ZhanLang case warns about, not silently accepted.
- DIY-kit-vs-assembled was treated as a variant-level materiality axis (packaging/mechanism of
  sale) for FangShi ShuangRen/JieYun and GuoGuan YueXiao, consistent with each model's own
  pre-existing framing.
- LeFun's 14 print themes were treated as separately-marketed colourway/sticker-type editions
  (rule 6) and NOT collapsed as stock colours, because each carries its own name, page, and
  price — a materially different case from the stock-colour-collapse precedent used everywhere
  else in this report (GAN356 Air Black/White/Primary; QJ Candy Black/Pink; YanCheng's four
  named colours; etc.).
- Magnetized-vs-unmagnetized (GuoGuan Pro/Pro M, EDM/E) was read as a `magnet_configuration`
  axis difference (rule 1).

**Candidates rejected (not built into variants), in full:**
- HaiTun Waverider V1's dedicated adjustment-tool product — a separate accessory SKU, not a
  cube configuration.
- HaiTun's Cubezz-only "Supreme Edition" V2 tier — named only in passing on an existing source
  note; not independently investigated this pass (a quick Cubezz CDX check under the same
  product-ID range returned nothing), left as an unchased lead rather than built without
  evidence.
- Every individual colour-combination SKU within FangShi's Mini ShuangRen DIY-kit range
  (roughly a dozen body/cap permutations) and every stock colour within GuoGuan's Unstickered
  DIY kit (eight colours) — anti-explosion; the configuration category (DIY kit) is the
  variant, not each colour.
- LeFun's `mini-round-3x3-keychain` — a different size/shape product, not this base mould.
- The large CubeStyle Carbon Fiber / Hollow Sticker resticker range and every non-3x3-shaped
  LeFun/CubeStyle/FanXin/KungFu product (2x2s, 4x4s, pyraminx, gear cubes, axis cubes,
  fisher cubes, etc.) found in the same prefix sweeps — correctly out of scope for these
  models, not variants of them.

**Escalations (recorded, not actioned — all require either a human decision or a different
pass's write lane):**
- HuaMeng TG: the model's own `specs.core_system: dual_adjustment` may not be the intended
  reading given all four non-limited configurations are titled "...Ball-Core..." — a possible
  model-spec gap for the model-researcher lane, not corrected here (models frozen).
- HuaMeng YS3M: two new sources this pass independently corroborate (a supply-chain notice
  naming MoYu directly, and MoYu's own "Magic Clothes" UV-coating branding applied to this
  product) the already-open MoYu-affiliation lead at the family/model level. Not acted on
  (manufacturer/family boundaries frozen); recorded for a manufacturer-boundary review.
- HaiTun V2 Standard/Pioneer/Flagship's near-identical marketing copy (see materiality calls
  above) — surfaced for human review of whether all three should stand as separate variants.
- FangShi's still-unresolved Chinese-language sourcing gap (no first-party FangShi/Funs Puzzle
  source exists in any language, across six passes now including this one) — not re-attempted
  this pass; the underlying blocker (no working translation/search route found so far) is
  unchanged.
- The pre-existing HaiTun ZhanLang V1 escalation (a second, real HaiTun product line with no
  family record) is unchanged by this pass — not actioned, since family enumeration is frozen
  and this pass's own evidence (Cubezz product IDs 7600/7601, genuinely distinct from the
  Waverider V2 product ID range) does not resolve whether it needs its own family.

## Machine-readable summary
```yaml
models_assessed:
  - escube-es3-v1
  - escube-air-v1
  - huameng-tg-v1
  - huameng-tg-v2
  - huameng-ys3m-v1
  - haitun-waverider-v1
  - haitun-waverider-v2
  - fangshi-guangying-original
  - fangshi-jieyun-original
  - fangshi-shuangren-original
  - fangshi-shuangren-v2
  - guoguan-yuexiao-original
  - guoguan-yuexiao-pro
  - guoguan-yuexiao-edm
  - kungfu-dot-cube-3x3
  - kungfu-longyuan-3x3
  - kungfu-qinghong-3x3
  - newisland-lightning-original
  - newisland-lightning-v2
  - newisland-phoenix-standard
  - fanxin-3x3-standard
  - fanxin-hudong-3x3
  - fanxin-magnetic-3x3-standard
  - guojia-type-a-chun1
  - guojia-type-a-chun2
  - qj-candy-3x3-standard
  - qj-pillowed-3x3-standard
  - senhuan-mars-original
  - senhuan-mars-s
  - cubestyle-3x3-standard
  - lefun-3x3-standard
  - mohuanshousu-chufeng-standard
  - mojue-m3-standard
  - pbcube-wr-standard
  - yancheng-yan3-standard
variants_created: 72
models_left_unassessed: []
candidates_rejected:
  - haitun-waverider-v1-adjustment-tool (accessory SKU, not a cube configuration)
  - haitun cubezz "Supreme Edition" V2 tier (unchased lead, not evidenced)
  - fangshi mini-shuangren-diy-kit individual body/cap colour SKUs (~12, anti-explosion)
  - guoguan-yuexiao-original-diy-kit-unstickered individual stock colours (8, anti-explosion)
  - lefun-mini-round-3x3-keychain (different product, not this base mould)
  - cubestyle carbon-fiber/hollow-sticker resticker range (different, already-excluded family)
  - non-3x3-shaped products surfaced in the same prefix sweeps across every manufacturer
    (2x2/4x4/5x5/pyraminx/gear-cube/axis-cube/fisher-cube/etc.)
escalations:
  - huameng-tg-v1 core_system vs. "Ball-Core" naming — possible model-spec gap, not corrected (models frozen)
  - huameng-ys3m-v1 MoYu-affiliation lead further corroborated by 2 new sources — not actioned (manufacturer/family frozen)
  - haitun-waverider-v2 Standard/Pioneer/Flagship near-identical marketing copy — materiality call flagged for review
  - fangshi Chinese-language sourcing gap — still unresolved across 6 passes, not re-attempted
  - haitun ZhanLang V1 (pre-existing, unchanged) — real second HaiTun line, no family record, not actioned (families frozen)
```
