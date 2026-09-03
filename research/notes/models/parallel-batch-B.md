# Parallel Pass 2 — Batch B (cube4you, zcube, huameng, guoguan, mojue, mohuanshousu,
# senhuan, yancheng)

Agent B of two parallel pass-2 researchers. Disjoint queue from Agent A (see the task
assignment); this file is Agent B's own live session log, separate from
`global-pass2-families.md` (Agent A's/the main line's file, not touched here) and from
`parallel-batch-A.md` (Agent A's own file, not touched here).

Method note: per-manufacturer sections below are written live, as each manufacturer is
finished, not batched at the end.

---

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
