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
