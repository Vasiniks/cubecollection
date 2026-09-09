# Pass 4 Batch 2 — Agent H — Longtail sub-brands (17 manufacturers, 35 models)

Status: IN PROGRESS. Skeleton committed first per mandatory instruction.

## Scope
fangshi (4) · huameng (3) · kungfu (3) · newisland (3) · fanxin (3) · guoguan (3) ·
escube (2) · guojia (2) · haitun (2) · qj (2) · senhuan (2) · cubestyle (1) · lefun (1) ·
mohuanshousu (1) · mojue (1) · pbcube (1) · yancheng (1)

findings-so-far: in progress — see per-manufacturer log below.

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

## Machine-readable summary (placeholder, to be replaced at end)
```yaml
models_assessed: []
variants_created: []
models_left_unassessed: []
candidates_rejected: []
escalations: []
```
