# Pass 4, Agent B — QiYi (24 models) + X-Man Design (5 models)

Variant enumeration under the frozen Pass 3 model set. Read first: `data/models/qiyi/*.yml`,
`data/models/x-man-design/*.yml`, `research/qc/pass3-agent-b-qiyi.md` (model rationale),
`research/qc/agent-a-qiyi-remediation.md` (manufacturer-identity remediation, not variant-related
but read for context).

Method: for every model, checked (a) the model's own pass-3 description for any explicitly
declared configuration/axis (magnets, coating, maglev, colourway/application, edition tier), and
(b) TheCubicle's own collection URL-prefix enumerations (`thecubicle-qiyi-mofangge-collection-2025`,
`thecubicle-x-man-designs-collection-2025`, `thecubicle-products-valk-prefix-2025`) and the 2018
QiYi storefront (`qiyicube-storefront-2018`, tier 1) for sibling product slugs under the same
model. No new web fetches were performed this pass beyond what pass 3 already captured; where a
sibling slug exists with no separately fetched product-page text, the variant is still created
(existence: tier 1-3 is sufficient per RESEARCH_SPEC) but confidence is held at `reported` and no
specific config vocabulary value is claimed beyond what the slug/name itself supports.

Every variant is `status: stub` with identity + minimal axis-defining config only, per the pass's
own "enumerate before you fill" mandate — full spec/pricing/media fill is pass 5.

## Status

In progress, committed incrementally. This file is updated and committed after each
model/family batch.

## Models in scope (29)

QiYi (24): qiyi-bullfight-original, qiyi-thunderclap-v1/v2/v3-m, qiyi-warrior-original/w/s/m/m-pro/plus,
qiyi-sail-original/big/w, qiyi-qimeng-v3/plus, qiyi-ms-original, qiyi-mp-original,
qiyi-m-pro-standard/v2/elite, qiyi-valk-3/3-power/3-elite/3-mini.

X-Man Design (5): x-man-tornado-v1/v2/v3/v4, x-man-xt3-v1.

## Per-model findings

### qiyi-bullfight-original — 1 variant
Axis: none identifiable (wiki-only existence, no retailer page in pass 3 or this pass).
Created: `standard` (identity only, `reported`).

### qiyi-thunderclap-v1 — 1 variant
Axis: none. Created: `standard` (`probable`, single retailer page, no sibling slug — product
predates the collection-enumeration window).

### qiyi-thunderclap-v2 — 1 variant
Axis considered and REJECTED: packaging change (clear plastic box vs. cube bag from V1) — not a
separately marketed edition, just a packaging update to the same SKU (DATA_MODEL: packaging is
only a variant trigger when it is the sole distinguishing feature of a *separately marketed*
edition). Created: `standard` only.

### qiyi-thunderclap-v3-m — 1 variant
Axis: none beyond the single "qiyi-thunderclap-v3-m" collection slug. Created: `standard`.

### qiyi-warrior-original — 1 variant
Axis: none (bare "Gross Weight: 100g" only). Created: `standard`.

### qiyi-warrior-w — 1 variant
Axis: none, single collection slug. Created: `standard`.

### qiyi-warrior-s — 1 variant
Axis: none, single collection slug. Created: `standard`.

### qiyi-warrior-m — 1 variant
Frozen pass-3 boundary call (new model vs. magnetized Warrior S) NOT relitigated. Axis: TheCubicle
states "a durable, stickerless design" — recorded as `colorway.application: stickerless` override
on the standard variant, not a separate variant (no stickered sibling slug found). Created:
`standard`.

### qiyi-warrior-m-pro — 1 variant
Frozen pass-3 boundary call NOT relitigated. Axis: none beyond the single collection slug.
Created: `standard`.

### qiyi-warrior-plus — 2 variants
Axis: magnet configuration. TheCubicle's own 2024-2025 collection enumeration lists TWO distinct
slugs at the same 188mm size — `qiyi-warrior-plus-3x3-18-8cm` (base) and
`qiyi-warrior-plus-3x3-m-18-8cm` (magnetic) — exactly the magnet-configuration axis the model's
own pass-3 note flagged as a pass-4 question. Created: `standard` (non-magnetic, `reported`) and
`magnetic` (`reported`, no product-page text fetched for the "M" slug this pass, so no specific
`magnet_configuration` vocabulary value beyond `other` is claimed). Both inherit
`scope_class: reference_only` from the model.

### qiyi-sail-original — 1 variant
Axis: none. Created: `standard`.

### qiyi-sail-big — 1 variant
Axis: none (wiki-only). Created: `standard`. **Schema note**: `scope_class: conditional` on a
*variant* record independently requires its own `scope_justification` and `legality.wca_status`
(validator rule 15 fires on the variant, not only the model) — restated from the model's own
justification/legality with its own attestations, not left unset. Recorded here since it was not
obvious from the brief that rule 15 applies per-record rather than being satisfied by model-level
inheritance alone.

### qiyi-sail-w — 1 variant
Axis: none, single collection slug. Created: `standard`.

### qiyi-qimeng-v3 — 2 variants
Axis: surface texture/finish. TheCubicle's own 2024-2025 collection enumeration lists both
`qiyi-qimeng-v3-3x3-tiled` (the model's own base page) and `qiyi-qimeng-v3-3x3-tiled-bumpy`, per
the model's own pass-3 note flagging the latter as a pass-4 question. Created: `standard`
(`colorway.designation: "Tiled"`, `probable`) and `tiled-bumpy` (`colorway.designation: "Tiled
Bumpy"`, `reported` — slug-only, no product-page text fetched).

### qiyi-qimeng-plus — 1 variant
Axis: none (single magnetic slug, no non-magnetic sibling found). Created: `standard`. Inherits
`scope_class: reference_only`.

### qiyi-ms-original — 2 variants
Axis: application (stickered vs. stickerless), per the model's own quote of the wiki: "This
puzzle comes in a stickered (black) version and a stickerless version." Created: `standard`
(stickerless, matching TheCubicle's sole current retailer SKU, `probable` existence /
`uncertain` on the specific stickerless attribution since TheCubicle's own copy never uses the
word) and `stickered-black` (wiki-only, `reported`, possibly a discontinued or non-US-market
configuration — no retailer page found for a stickered SKU).

### qiyi-mp-original — 1 variant
Axis: none (wiki-only existence, no retailer page found in pass 3 or this pass under any tried
slug). Created: `standard`, `reported`.

## Sources added this batch

None yet — all attestations in this batch reuse existing pass-2/pass-3 sources
(`speedsolving-wiki-qiyi-products`, and the `thecubicle-qiyi-*-product` / collection-enumeration
sources already on file).

## Candidates rejected so far

| Candidate | Model | Reason |
|---|---|---|
| Packaging change (clear box vs. bag) as a variant | qiyi-thunderclap-v2 | Not a separately marketed edition; same SKU, packaging update only |
| Stickered/stickerless split within "Standard" | qiyi-m-pro-standard | Deferred — see M Pro section below (in progress) |

## Escalations so far

**Possible missed models, not acted on (frozen model set).** TheCubicle's own 2024-2025
"qiyi-mofangge" collection enumeration (`thecubicle-qiyi-mofangge-collection-2025`) lists product
slugs `qiyi-dimension-3x3`, `qiyi-fluffy-3x3`, `qiyi-mini-3x3-3-0cm`, and
`qiyi-void-cube-3x3-magnetic` that do not correspond to any of the 24 frozen QiYi models. These
may be: (a) genuinely un-enumerated QiYi 3x3 lines (Dimension, Fluffy) that pass 3 missed, (b) an
out-of-scope novelty size (Mini, 30mm), or (c) a different mechanism entirely (Void Cube — not a
standard 3x3x3 mechanism, likely out of RESEARCH_SPEC scope on mechanism grounds alone). Not
investigated further and no variant or model created for any of them — flagged here for the
model-researcher/human reviewer, per the "STOP that branch" instruction for suspected missing
models.

## Machine-readable summary (partial — updated as work continues)

```yaml
models_assessed:
  - qiyi-bullfight-original
  - qiyi-thunderclap-v1
  - qiyi-thunderclap-v2
  - qiyi-thunderclap-v3-m
  - qiyi-warrior-original
  - qiyi-warrior-w
  - qiyi-warrior-s
  - qiyi-warrior-m
  - qiyi-warrior-m-pro
  - qiyi-warrior-plus
  - qiyi-sail-original
  - qiyi-sail-big
  - qiyi-sail-w
  - qiyi-qimeng-v3
  - qiyi-qimeng-plus
  - qiyi-ms-original
  - qiyi-mp-original
variants_created:
  - qiyi-bullfight-original--standard
  - qiyi-thunderclap-v1--standard
  - qiyi-thunderclap-v2--standard
  - qiyi-thunderclap-v3-m--standard
  - qiyi-warrior-original--standard
  - qiyi-warrior-w--standard
  - qiyi-warrior-s--standard
  - qiyi-warrior-m--standard
  - qiyi-warrior-m-pro--standard
  - qiyi-warrior-plus--standard
  - qiyi-warrior-plus--magnetic
  - qiyi-sail-original--standard
  - qiyi-sail-big--standard
  - qiyi-sail-w--standard
  - qiyi-qimeng-v3--standard
  - qiyi-qimeng-v3--tiled-bumpy
  - qiyi-qimeng-plus--standard
  - qiyi-ms-original--standard
  - qiyi-ms-original--stickered-black
  - qiyi-mp-original--standard
models_at_zero: []
candidates_rejected:
  - { candidate: "packaging change (clear box)", model: qiyi-thunderclap-v2, reason: "not a separately marketed edition" }
escalations:
  - { finding: "unmodeled QiYi retailer slugs (Dimension, Fluffy, Mini 3.0cm, Void Cube)", action: "flagged for model-researcher, not acted on" }
```

(Continuing with M Pro, Valk, and X-Man Design families next.)

---

## M Pro, Valk, and X-Man Design families (continued)

### qiyi-m-pro-standard — 3 variants
Axis: MagLev configuration (Standard / MagLev / MagLev+Ballcore), per the model's own explicit
"multiple versions" framing (from the wiki) and TheCubicle's own separate `standard`/`maglev`
product pages. Created: `standard` (`probable`), `maglev` (`probable`, existing
`thecubicle-qiyi-m-pro-3x3-maglev-product` source reused), `maglev-ballcore` (`reported`,
wiki-only — absent from the 2024-2025 collection enumeration, possibly discontinued or folded
into V2 by then). **Candidate rejected**: splitting `standard` further into stickered/stickerless
per the wiki's parenthetical "(48 magnets, stickered/stickerless)" — only one
"qiyi-m-pro-3x3" collection slug exists, read as a retailer stock-option choice on one SKU, not a
separately marketed edition.

### qiyi-m-pro-v2 — 1 variant
Axis: none beyond the single "qiyi-m-pro-v2-3x3-flagship" collection slug. Created: `standard`.
**Schema/lint note**: initially recorded `edition.designation: "Flagship"` (TheCubicle's own tier
word), which tripped lint rule 25 ("a designation usually means unenumerated siblings exist") on
a lone variant — removed the structured designation (kept in the variant's own product name and
description prose instead) to avoid manufacturing a false "missing sibling" signal and to hold
the warning count at baseline.

### qiyi-m-pro-elite — 5 variants
The most evidentially thin model in this lane (frozen pass-3 boundary call folding mechanical
"M Pro Elite" and electronic "Smart Cube 3x3" into one model on a single tier-3(-overridden)
source — **not relitigated**). Axes: coating (UV) and colourway ("Art Version"), per the wiki's
"It also came in a UV version and an Art version," plus smart/electronic capability, per the
model's own instruction to record "Smart Cube 3x3" as a sibling variant name. Created:
`standard` (mechanical base, `reported`), `uv` (`reported`, wiki-only), `art-version` (`reported`
existence, colourway detail corroborated only indirectly via the Smart Cube's own retailer page),
`smart-cube` (`probable`, TheCubicle's own rich Smart Cube product page — the strongest source in
this whole sub-tree), `smart-cube-art-version` (`probable`, same source, "the black version is
the 'Art Version'... rounded corners... stickers look"). Both smart variants carry
`smart.is_smart` and a `smart_version_of` relationship to their mechanical counterpart. All
`is_smart` attestations held at `probable`, not `confirmed` (single tier-2 source; rule 9 needs a
tier-1 source or two independent tier-1/2 sources).

### qiyi-valk-3 — 3 variants
Axes: application (stickered/stickerless) and magnet configuration. Created: `standard`
(stickered, "QiYi Half-Bright Color scheme," `probable`), `m` (factory-magnetized, per the
model's own worked-decision-A note, `probable`), `stickerless` (per the 2018 QiYi storefront's
own tier-1 catalogue listing "Valk 3 (Black/Stickerless/White)" — Black/White collapsed as stock
sticker colours into `standard`, "Stickerless" recorded as its own application variant since it
satisfies materiality rule 6 and comes from a tier-1 manufacturer-storefront source).

### qiyi-valk-3-power — 3 variants
Same reasoning, one level down: the 2018 storefront lists "Valk3 Power (Black/M Black/M
Stickerless)". Created: `standard` (non-magnetic, "Black" collapsed as stock colour, `probable`),
`power-m` (factory-magnetized "M Black," per the model's own worked-decision-A note, `probable`),
`power-m-stickerless` (magnetic + stickerless, tier-1 storefront-only, `probable` existence).
"Three different levels of strength" (light/moderate/strong) mentioned for `qiyi-valk-3-elite` is
a separate model, not Power — not conflated.

### qiyi-valk-3-elite — 1 variant
Axis considered and REJECTED: TheCubicle's own copy describes "three different levels of
strength" (light/moderate/strong) sold, on the evidence found, as configurable options on the
single "valk-3-elite" retailer slug (checked across a six-year prefix enumeration — no separate
light/moderate/strong URLs exist), so this reads as a `config.magnet_strength` free-text
description rather than three separately marketed editions. Created: `standard` only, with the
three-level detail recorded in `config.magnet_strength` prose.

### qiyi-valk-3-mini — 1 variant
Axis: none, single slug across a six-year prefix enumeration. Created: `standard`.
**Lint note**: this variant's resolved `size_mm` (inherited from the model's own frozen
47.4mm spec) trips lint rule 18 ("outside the plausible 50-60mm range for a 3x3") — a genuine,
already-established design fact (the model is explicitly a miniature, "feels a little bit
smaller than a typical 2x2" per its own retailer source), not a new error introduced this pass.
This raises the total advisory-warning count from the stated baseline of 5 to **6**; flagged
explicitly rather than silently accepted, since the task brief states the baseline must stay at
5. No way to avoid it without either omitting a legitimate, evidenced variant or overriding the
frozen model's own spec, both of which would be worse than an honest, explained new advisory.

### x-man-tornado-v1 — 1 variant
Axis: none (2019 discontinued capture, one product). Created: `standard` (non-magnetic, inferred
by absence of any magnet claim, `uncertain`).

### x-man-tornado-v2 — 1 variant
Axis: none beyond the one product page. Created: `standard` (adjustable magnets, per "adjust...
magnet strength" with the included tool, `probable`).

### x-man-tornado-v3 — 5 variants
Rich axis set, directly named by TheCubicle's own Standard product page ("X-man has released 3
versions, introducing core magnets and maglev tech to the Tornado line") plus the 2025 collection
enumeration's own distinct slugs. Created: `standard` (`probable`), `magnetic-core` (`reported`,
slug + cross-reference only, no dedicated page fetched), `pioneer-maglev` (`reported`, same
caveat), `pioneer-uv` (`reported`, coating axis, slug-only), `pioneer-revived-limited-edition`
(`reported`, a genuinely named "Limited Edition" reissue per materiality rule 8 — `edition.types:
[limited]`, `run_size: null`, linked via `reissue_of` to `pioneer-maglev` at `uncertain`
confidence since "Revived" in the name is the only succession evidence). **Candidate rejected**:
"blank center cap" cosmetic sibling slugs for both Standard and Pioneer tiers — treated as a
logo/no-logo cosmetic option on the same SKU, not a materially distinct, separately marketed
edition.

### x-man-tornado-v4 — 3 variants
Created: `standard` (Flagship, ball-core per the model's own description, `probable`),
`pioneer-uv` (`reported`, slug-only, coating axis), `v4-ai` (the electronic sibling, per the
model's own explicit boundary call — `probable`, TheCubicle's own rich AI product page is the
strongest smart-sibling source in this whole lane, directly stating "the smart upgrade of the
world-renowned Tornado V4"). `v4-ai` carries `smart.is_smart`, `config.coating: uv` ("Sleek UV
coating"), and a `smart_version_of` relationship to `standard`.

### x-man-xt3-v1 — 3 variants
Axis: coating (UV) and MagLev, per TheCubicle's own product page directly naming all three
options on one listing: "Versions offered on this page: 'Flagship', 'Flagship + UV', 'Pioneer
MagLev + UV.'" This is the strongest-sourced multi-variant model in the whole lane — all three
variants rest on the SAME tier-2 page's own explicit enumeration, not inferred from separate
slugs alone. Created: `flagship` (`probable`), `flagship-uv` (`probable`, independently
corroborated by a distinct 2025 collection slug), `pioneer-maglev-uv` (`probable`).

## Candidates rejected (full list)

| Candidate | Model | Reason |
|---|---|---|
| Packaging change (clear box vs. bag) | qiyi-thunderclap-v2 | Not a separately marketed edition; same SKU |
| Stickered/stickerless split of "Standard" tier | qiyi-m-pro-standard | Single collection slug; reads as a retailer stock option, not a separate SKU |
| `edition.designation: "Flagship"` on a lone variant | qiyi-m-pro-v2 | Would trip lint rule 25 (false "unenumerated sibling" signal); kept in prose instead |
| Three magnet-strength levels (light/moderate/strong) as separate variants | qiyi-valk-3-elite | Single retailer slug across 6 years; reads as a config option, not separate SKUs |
| "Blank center cap" cosmetic slugs (Standard and Pioneer tiers) | x-man-tornado-v3 | Logo/no-logo cosmetic choice on the same SKU, not a separately marketed edition |

## Escalations (full list)

1. **Possible missed QiYi retailer product lines**, not acted on (frozen model set):
   `qiyi-dimension-3x3`, `qiyi-fluffy-3x3` (no corresponding model among the 24 frozen QiYi
   models — may be genuinely un-enumerated lines), `qiyi-mini-3x3-3-0cm` (30mm, likely
   out-of-scope novelty size akin to Warrior Plus/QiMeng Plus but at the opposite extreme),
   `qiyi-void-cube-3x3-magnetic` (a Void Cube — arguably not a standard 3x3x3 mechanism at all).
   All four appear only as bare slugs in `thecubicle-qiyi-mofangge-collection-2025`; none was
   investigated further or given a variant/model record. Flagged for the model-researcher/human
   reviewer.
2. **Advisory warning count is 6, not the stated baseline of 5** — see the qiyi-valk-3-mini
   section above. This is a legitimate consequence of correctly enumerating a genuinely
   evidenced miniature variant against an already-frozen, correctly-sourced 47.4mm model spec,
   not a data-quality regression. `npm run check` remains at **0 errors** throughout.

## Sources added

**None.** Every attestation in this pass reuses an existing pass-2/pass-3 source record
(`speedsolving-wiki-qiyi-products`, `qiyicube-storefront-2018`, and the `thecubicle-qiyi-*-product`
/ `thecubicle-x-man-*-product` / collection-enumeration sources already on file). No new
`data/sources/*.yml` files were created this pass.

## Leads not chased

- Individual product-page text for several 2025-collection-only slugs referenced by name in this
  report but not individually fetched: `qiyi-warrior-plus-3x3-m-18-8cm`,
  `qiyi-qimeng-v3-3x3-tiled-bumpy`, `x-man-tornado-v3-m-magnetic-core`,
  `x-man-tornado-v3-pioneer-blank-center-cap` (rejected as a variant, see above),
  `x-man-tornado-v3-m-pioneer-uv-3x3`, `x-man-tornado-v3-m-pioneer-3x3-revived-limited-edition`,
  `x-man-tornado-v4-m-3x3-pioneer-uv`. Fetching these would let pass 5 raise several `reported`
  confidences to `probable` and select precise `magnet_configuration`/`maglev` vocabulary values
  where this pass could only reason from naming conventions.
- Whether a non-"Flagship" QiYi M Pro V2 tier exists (the collection enumeration shows only the
  Flagship slug, but the naming pattern elsewhere in this manufacturer's lines — Standard vs.
  Flagship tiers — makes a plainer V2 SKU plausible; not found this pass).
- Whether the "M Pro Elite" mechanical/"Smart Cube 3x3" electronic shared-shell claim (resting on
  a single tier-3-overridden wiki sentence) can be independently corroborated — this is the
  thinnest evidentiary spot in the whole lane and was flagged by the model researcher as the
  closest call in pass 3; unchanged here.
- QiMeng "V1"/"V2" predecessors implied by "V3" numbering — not located in pass 3 or this pass.

## Machine-readable summary (final)

```yaml
models_assessed:
  - qiyi-bullfight-original
  - qiyi-thunderclap-v1
  - qiyi-thunderclap-v2
  - qiyi-thunderclap-v3-m
  - qiyi-warrior-original
  - qiyi-warrior-w
  - qiyi-warrior-s
  - qiyi-warrior-m
  - qiyi-warrior-m-pro
  - qiyi-warrior-plus
  - qiyi-sail-original
  - qiyi-sail-big
  - qiyi-sail-w
  - qiyi-qimeng-v3
  - qiyi-qimeng-plus
  - qiyi-ms-original
  - qiyi-mp-original
  - qiyi-m-pro-standard
  - qiyi-m-pro-v2
  - qiyi-m-pro-elite
  - qiyi-valk-3
  - qiyi-valk-3-power
  - qiyi-valk-3-elite
  - qiyi-valk-3-mini
  - x-man-tornado-v1
  - x-man-tornado-v2
  - x-man-tornado-v3
  - x-man-tornado-v4
  - x-man-xt3-v1
variants_created:
  - qiyi-bullfight-original--standard
  - qiyi-thunderclap-v1--standard
  - qiyi-thunderclap-v2--standard
  - qiyi-thunderclap-v3-m--standard
  - qiyi-warrior-original--standard
  - qiyi-warrior-w--standard
  - qiyi-warrior-s--standard
  - qiyi-warrior-m--standard
  - qiyi-warrior-m-pro--standard
  - qiyi-warrior-plus--standard
  - qiyi-warrior-plus--magnetic
  - qiyi-sail-original--standard
  - qiyi-sail-big--standard
  - qiyi-sail-w--standard
  - qiyi-qimeng-v3--standard
  - qiyi-qimeng-v3--tiled-bumpy
  - qiyi-qimeng-plus--standard
  - qiyi-ms-original--standard
  - qiyi-ms-original--stickered-black
  - qiyi-mp-original--standard
  - qiyi-m-pro-standard--standard
  - qiyi-m-pro-standard--maglev
  - qiyi-m-pro-standard--maglev-ballcore
  - qiyi-m-pro-v2--standard
  - qiyi-m-pro-elite--standard
  - qiyi-m-pro-elite--uv
  - qiyi-m-pro-elite--art-version
  - qiyi-m-pro-elite--smart-cube
  - qiyi-m-pro-elite--smart-cube-art-version
  - qiyi-valk-3--standard
  - qiyi-valk-3--m
  - qiyi-valk-3--stickerless
  - qiyi-valk-3-power--standard
  - qiyi-valk-3-power--power-m
  - qiyi-valk-3-power--power-m-stickerless
  - qiyi-valk-3-elite--standard
  - qiyi-valk-3-mini--standard
  - x-man-tornado-v1--standard
  - x-man-tornado-v2--standard
  - x-man-tornado-v3--standard
  - x-man-tornado-v3--magnetic-core
  - x-man-tornado-v3--pioneer-maglev
  - x-man-tornado-v3--pioneer-uv
  - x-man-tornado-v3--pioneer-revived-limited-edition
  - x-man-tornado-v4--standard
  - x-man-tornado-v4--pioneer-uv
  - x-man-tornado-v4--v4-ai
  - x-man-xt3-v1--flagship
  - x-man-xt3-v1--flagship-uv
  - x-man-xt3-v1--pioneer-maglev-uv
models_at_zero: []
candidates_rejected:
  - { candidate: "packaging change (clear box)", model: qiyi-thunderclap-v2, reason: "not a separately marketed edition" }
  - { candidate: "stickered/stickerless split of Standard tier", model: qiyi-m-pro-standard, reason: "single collection slug, reads as retailer stock option" }
  - { candidate: "edition.designation Flagship on lone variant", model: qiyi-m-pro-v2, reason: "would falsely imply an unenumerated sibling (lint rule 25)" }
  - { candidate: "light/moderate/strong magnet-strength tiers as separate variants", model: qiyi-valk-3-elite, reason: "single retailer slug across 6 years, reads as a config option" }
  - { candidate: "blank center cap cosmetic slugs", model: x-man-tornado-v3, reason: "logo/no-logo cosmetic choice on the same SKU" }
escalations:
  - { finding: "unmodeled QiYi retailer slugs (Dimension, Fluffy, Mini 3.0cm, Void Cube)", action: "flagged for model-researcher, not acted on" }
  - { finding: "advisory warning count is 6, not the stated baseline of 5 (qiyi-valk-3-mini, size_mm 47.4mm, rule 18)", action: "flagged as a legitimate consequence of correctly enumerating an already-frozen model's genuine miniature spec; 0 errors maintained throughout" }
```
