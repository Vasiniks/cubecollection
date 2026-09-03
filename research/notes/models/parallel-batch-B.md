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
