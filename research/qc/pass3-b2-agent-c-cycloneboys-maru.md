# Pass 3, Batch 2, Agent C — Cyclone Boys + Maru model enumeration

Branch `b2-c`. Lane: `cyclone-boys-feichi`, `cyclone-boys-feijue`, `cyclone-boys-feiwu`,
`cyclone-boys-metallic-3x3`, `cyclone-boys-mini-3x3`, `maru-3x3`, `maru-cx3`, `maru-vx-3`,
`maru-nano`. Nine frozen families, zero family/variant mutations made.

Read first: `research/qc/pass3-admission-policy.md` (S6), DATA_MODEL §1.4/§4.2,
`schema/model.schema.json`, RESEARCH_SPEC §3.6a, `data/models/moyu/moyu-weilong-gts.yml` (house
style).

---

## Cyclone Boys

### `cyclone-boys-feiwu` → 1 model

**`cyclone-boys-feiwu-original`** (`core`, generation "Original"/1/`community_convention`).
Existence/naming on the tier-3 wiki override; specs on two independent tier 2 retailers found
this pass (Cubezz.com non-US, TheCubicle US) — `confirmed` on size (55-56mm, agreeing), `probable`
on weight (86g TheCubicle vs. 95g Cubezz, same range). **Unresolved date discrepancy**: wiki
says "Released March 2014"; Cubezz.com shows a genuine, full product-page capture dated
2013-12-29 — recorded `disputed` rather than silently resolved.

### `cyclone-boys-feichi` → 2 models

**`cyclone-boys-feichi-original`** (`core`, "Original"/1). Existence/naming on the wiki;
succeeds `cyclone-boys-feiwu-original` on the wiki's direct "An improved version of the FeiWu"
statement. Specs on Cubezz.com; released date upgraded to `probable` because an independent
tier 2 capture (2016-10-06) closely corroborates (not contradicts) the wiki's "October 2016."

**`cyclone-boys-feichi-g3`** (`core`, "G3"/2/`community_convention`) — **new generation found
this pass**, not visible from the wiki or Cubezz.com alone. TheCubicle's own product copy
(`thecubicle-cyclone-boys-g3-feichi`, from a `/products/cyclone*` CDX sweep) states directly:
"The Cyclone Boys G3 FeiChi is **the latest generation** 3x3 from Cyclone Boys. It features an
improved design compared to its predecessor, including more rounded pieces and **a refined
internal mechanism design**." Per DATA_MODEL §4.2 a mechanism-level claim is model-identity
evidence even from a single tier 2 source, and per the same section's "when unclear, default to
new model" guidance this is admitted as a separate model with `succeeds` rather than folded
into the original. **"G3" itself is read as Cyclone Boys' own size-coding prefix** ("G" + cube
order, matching the same retailer's G4/G6/G7/G8 for 4x4/6x6/7x7/8x8 found in the same sweep),
**not** a literal generation count — `generation.basis` is recorded `community_convention`, and
the whole call is flagged `uncertain` on that pointer, precisely because the succession claim
and the "G3" label are two different things being treated together for convenience.

### `cyclone-boys-feijue` → 1 model

**`cyclone-boys-feijue-original`** (`core`, "Original"/1). Family is named "FeiJue" without a
magnet suffix, but every source found this pass — wiki ("FeiJue M"), Cubezz.com ("Magnetic...
First magnetic 3x3 cube from Cyclone Boys brand"), TheCubicle ("Magnets: Magnetic") — only
documents a magnetic configuration; no non-magnetic base was found. Modelled under the base
"FeiJue" name (matching the family record) with "FeiJue M" as an alias, rather than inventing a
magnetic/non-magnetic split no source supports. Size `confirmed` (two independent tier 2
sources agree exactly at 56mm). `magnet_architecture: single_layer` set at `reported` from
TheCubicle's "magnetized slots in the edges and corners," read as an inference from prose, not
a direct vocabulary match — flagged as such.

### `cyclone-boys-metallic-3x3` → **0 models** (see below)

### `cyclone-boys-mini-3x3` → 1 model

**`cyclone-boys-mini-3x3-original`** (`core`, "Original"/1). A 40mm cube — tested seriously
against the model/variant boundary (a genuinely different mould from the ~55-57mm shells
measured elsewhere in this lane; admitted as a model, not a variant, mirroring
`yj-zhilong-mini.yml`'s precedent for a 50mm cube). Size `confirmed` (three independent
retailer figures — cubezz, TheCubicle, and the wiki's own prose — all state 40mm exactly).
`scope_class: core` recorded provisionally and flagged for human review, same reasoning and
same caveat already applied to `yj-zhilong-mini.yml`.

**Significant unresolved date discrepancy**: wiki states "Released December 2016"; Cubezz.com
shows a genuine, full, size-matching (40mm) product page captured **2015-10-31 — over a year
earlier**. Recorded `disputed`, not adjudicated. A note flags that a future pass should check
whether the wiki's date actually describes a distinct, later batch/colourway rather than the
same 2015 product.

### `cyclone-boys-metallic-3x3` — zero-model finding, in full

TheCubicle's own product copy (`thecubicle-cyclone-boys-metallic-3x3`, tier 2, found via a
`/products/cyclone*` CDX sweep — not previously in the archive) states directly: **"The Cyclone
Boys Metallic 3x3 is a normal 3x3, but rather than the traditional stickerless shades, this one
has glossy metallic (plastic) sides."** This is a tier 2, affirmative statement that the only
distinguishing feature is a coating/finish — DATA_MODEL §4.2's own textbook variant case, and
one the model schema structurally agrees with (`model.specs` has no `coating` field at all;
coating exists only on `variant.config` and `variant.colorway`). Model existence (class 2) is
met; model **identity** (class 3) is not, and is actively contradicted rather than merely
unevidenced. **No model was created.** Full writeup, including the structural problem this
leaves for a future variant with nowhere to attach: `research/notes/models/cyclone-boys-metallic-3x3-zero-model.md`.

**This is flagged as a suspected family-boundary question, not mutated.** With zero models,
this frozen family can never receive a pass-4 variant either (a variant needs a `model_id`,
and a model belongs to exactly one family). Escalated for human review; not fixed here, per
instruction and per the families-frozen-at-122 constraint.

---

## Maru

### `maru-3x3` → 1 model

**`maru-3x3-original`** (`core`, "Original"/1, ~2011 circa, carried from pass 1/2). Specs
`confirmed` on size (two independent tier 2 retailers, TheCubicle 57.0mm / Cubezz.com 56.7mm).
**Weight recorded `disputed`**: TheCubicle's "Gross Weight: 141g" vs. Cubezz.com's "Weight
(including packing): 84g" — a genuine, unexplained ~60g gap not attributable to ordinary
packaging variance (the Special Patterns edition's own 154g figure, which does include a stand
and lube, is only 13g above TheCubicle's plain 141g). Recorded as a live disagreement, not
resolved.

### `maru-cx3` → 1 model

**`maru-cx3-original`** (`core`, "Original"/1). A dedicated `thecubicle.com/products/maru*` CDX
sweep (67 distinct URLs) confirms only Assembled + DIY-kit + a spring-set accessory under this
name — **no "CX3 V2" or any later generation exists**, closing the question the family record
explicitly left open. `weight_g: 95` (Gross Weight) recovered by re-fetching the *same*
`archive_url` capture already recorded on the existing `thecubicle-maru-cx3` source, whose
excerpt had not reproduced the full spec table — cited against the existing source id rather
than manufacturing a near-duplicate. `designer` deliberately left unset: TheCubicle's own copy
credits "our friend Cyoubx" as a design inspiration, but no `person` record exists for them and
creating one is outside this pass's write lane (models/sources only).

### `maru-vx-3` → 1 model

**`maru-vx-3-original`** (`core`, "Original"/1). Same CDX sweep confirms exactly three
magnetic-configuration SKUs (`vx-3-m`, `vx-3-core-m`, `vx-3-core-m-maglev`) of this one design —
recorded as aliases/pass-4 leads per DATA_MODEL §4.2, not new models. `size_mm: 56.0`,
`weight_g: 105` (Gross Weight; a separate "Item Weight: 69.0g" figure recorded in prose only,
per this archive's established gross-weight convention).

### `maru-nano` → 1 model, `conditional`

**`maru-nano-original`** (`conditional`, "Original"/1). `scope_justification` now rests on
**two independent tier 2 sources** making the same specific claim: TheCubicle's "the smallest
mass-produced 3x3 cube in the world" and a fully independent, five-years-earlier Cubezz.com
listing found this pass ("This Maru Nano Cube is the world's smallest cube (mass production)").
`scope_decided_by: model-researcher-agent-c`, `scope_decided_on: 2026-09-03`. Size `confirmed`
(15mm, both sources exact). `piece_count` deliberately left unset rather than defaulted to the
ordinary 26-piece 3x3 assumption for an unusual 15mm DIY-kit novelty product.

---

## §3.6a compliance record

**Archived retailer `/products/` prefix sweeps (mandatory check 1):**
- `thecubicle.com/products/cyclone*` — 53 distinct URLs. Outcome: surfaced
  `thecubicle-cyclone-boys-metallic-3x3` (decisive for the zero-model finding),
  `thecubicle-cyclone-boys-g3-feichi` (a previously-unknown second generation),
  `thecubicle-cyclone-boys-feiwu`, `-feijue`, `-mini-3x3` (corroborating specs). Also surfaced,
  but **not built into records** because no frozen family exists for them: `FeiHong`,
  `FeiXuan`, `XuanFeng`, `JisuZhiYun`, `JisuZhiFeng` (3x3 lines the wiki names as "older
  models" but pass 2 did not turn into families), `FeiKu 3x3 (Tiled)`. Recorded as a gap, not
  acted on (families are frozen).
- `thecubicle.com/products/maru*` — 67 distinct URLs. Outcome: confirmed no later CX3 or VX-3
  generation; confirmed three VX-3 magnetic SKUs; surfaced `Maru ShenLan Luminous 3x3x3`
  (cubezz, see below) and a `Maru Mini 3x3 (30mm)` / `Maru Mini 3x3 Keychain` line — real,
  named products with no frozen family to attach to (already flagged as a lead at the family
  level in `maru-nano.yml`; not re-litigated here).

**Non-US/English retailer (mandatory check 2):** **Cubezz.com** (China-based, English-language
storefront), swept via `Buy-` prefix at limits of 3,000 and 6,000 entries.
- Cyclone Boys: found and used FeiWu, FeiChi, FeiJue, Mini 3x3 listings (all four families that
  received a model). **Explicitly checked and NOT found**: any "Cyclone Boys Metallic" listing
  in either sweep — recorded here as a checked negative, not silence.
- Maru: found and used the base 3x3 (`Buy-4128`, "Maru 56mm 3x3x3"), the Nano Cube (five
  colourway SKUs, `Buy-4663..4668`, used `Buy-4665`), and additionally surfaced **`Maru ShenLan
  Luminous 3x3x3`** (`Buy-3972/3981/3983`, 2015 captures) and a `Maru Maze 3x3x3` sticker
  product (`Buy-4252/4261`) — real, distinctly-named Maru 3x3-adjacent products with **no
  frozen family** to attach to. See "Escalations / open questions" below. Not found: any
  cubezz.com evidence distinguishing a "CX3 V2" or later VX-3 generation (consistent with the
  US-retailer sweep's own null result).

**Live-verification of `website`:** Not applicable — neither manufacturer record's `website`
field was touched this pass (both already correctly `unknown` per pass 1, per the launch
brief's own framing of `cycloneboys.com`'s 2016 defacement).

---

## Candidates rejected, and why

- **A non-magnetic "FeiJue" (without "M")** — no source at any tier describes one; not
  invented. The model is named "FeiJue" (matching the family) with "FeiJue M" as an alias, not
  because a non-magnetic base was found, but because the family itself predates and does not
  presuppose the magnet suffix.
- **"Maru VX-3 M" as a separate model** — a same-name magnetic SKU found in the CDX sweep,
  recorded as an alias/pass-4 lead on `maru-vx-3-original`, not a new model (no mould/mechanism
  claim, only a magnet-configuration difference — DATA_MODEL §4.2's clearest variant case).
- **"Cyclone Boys Metallic 3x3" as a model** — see zero-model writeup above. Existence met,
  identity actively contradicted by tier 2 evidence.
- **Treating the wiki's older "FeiXuan/XuanFeng/FeiHong/JisuZhiYun/JisuZhiFeng" mentions, or
  "Maru ShenLan"/"Maru Maze"/"Maru Mini (30mm)"/"Maru Mini Keychain", as models** — all real
  per retailer evidence found this pass, none has a frozen family to belong to. Not modelled;
  recorded as gaps for a future family-enumeration pass, not mutated into new families here.

---

## Escalations / open questions for human review

1. **`cyclone-boys-metallic-3x3` zero-model outcome and the family-boundary question it
   exposes** (full writeup: `research/notes/models/cyclone-boys-metallic-3x3-zero-model.md`).
   A tier 2 source states this is a coating treatment on "a normal 3x3." If a future pass wants
   to record a metallic-finish variant, it currently has no model to attach to under the
   existing frozen family structure.
2. **`cyclone-boys-mini-3x3-original` released date** — `disputed`, wiki (Dec 2016) vs. a
   cubezz.com capture over a year earlier (Oct 2015). Not adjudicated.
3. **`cyclone-boys-feiwu-original` released date** — `disputed`, wiki (Mar 2014) vs. a cubezz.
   com capture ~2.5 months earlier (Dec 2013). Not adjudicated (smaller gap than #2).
4. **`maru-3x3-original` weight** — `disputed`, TheCubicle 141g vs. Cubezz.com 84g, a gap too
   large to attribute confidently to packaging alone. Not adjudicated.
5. **`cyclone-boys-feichi-g3`'s `generation.basis`** — recorded `uncertain`. The mechanism
   claim is a genuine tier 2 statement; whether "G3" itself is Cyclone Boys' own formal
   generation label (vs. a retailer SKU convention riffing on its own G4/G6/G7/G8 size-coding)
   is not established by any source found this pass.
6. **Gap, not mine to fix**: several real 3x3 product names (Cyclone Boys FeiXuan/XuanFeng/
   FeiHong/JisuZhiYun/FeiKu; Maru ShenLan/Maze/Mini-30mm/Mini-Keychain) were found this pass
   with no frozen family to belong to. Flagged for a future family-enumeration pass; **no
   family was created or altered**.

---

## Sources used or created

**Reused, pre-existing** (per instruction, checked before creating anything new):
`speedsolving-wiki-cyclone-boys-products`, `speedsolving-wiki-cyclone-boys`,
`cycloneboys-com-2015`, `speedsolving-wiki-maru`, `thecubicle-maru-3x3`,
`thecubicle-maru-3x3-special-patterns`, `thecubicle-maru-cx3`, `thecubicle-maru-vx-3`,
`thecubicle-maru-nano-3x3`.

**Created this pass** (all `archive_url` preservation, all tier 2 except none at tier 3/4):
`cubezz-maru-3x3`, `cubezz-maru-nano`, `cubezz-cyclone-boys-feiwu`, `cubezz-cyclone-boys-feichi`,
`cubezz-cyclone-boys-mini-3x3`, `cubezz-cyclone-boys-feijue`, `thecubicle-cyclone-boys-feiwu`,
`thecubicle-cyclone-boys-feijue`, `thecubicle-cyclone-boys-g3-feichi`,
`thecubicle-cyclone-boys-metallic-3x3`, `thecubicle-cyclone-boys-mini-3x3` (11 new sources).

Checked for duplicate-source risk before creating each: different publisher (Cubezz.com vs.
TheCubicle vs. Speedsolving.com), different underlying URL and capture, no near-identical
wording reused across them — no duplicate-source collapse needed.

---

## Validation

`npm run validate`, `npm run lint`, and `npm run check` all pass clean (0 errors) at each commit
boundary in this branch's history. The one pre-existing lint warning
(`data/variants/gan/gan-ui-12-sp/standard.yml`, rule 25) predates this session and is outside
this lane.

Commits on `b2-c`:
1. `1168df7` — Cyclone Boys models (FeiWu, FeiChi, FeiJue, Mini 3x3), first pass.
2. `c5acc38` — Maru models (3x3, CX3, VX-3, Nano Cube).
3. `d278cf3` — Cyclone Boys US-retailer-sweep extension (FeiChi G3, Metallic zero-model
   evidence, spec upgrades for FeiWu/FeiJue/Mini 3x3).

---

## Machine-readable summary

```yaml
- id: cyclone-boys-feiwu-original
  family_id: cyclone-boys-feiwu
  name: "Cyclone Boys FeiWu"
  scope_class: core
  evidence_tier: 2
  date_known: disputed
  confidence: reported
- id: cyclone-boys-feichi-original
  family_id: cyclone-boys-feichi
  name: "Cyclone Boys FeiChi"
  scope_class: core
  evidence_tier: 2
  date_known: "2016-10 (probable)"
  confidence: probable
- id: cyclone-boys-feichi-g3
  family_id: cyclone-boys-feichi
  name: "Cyclone Boys G3 FeiChi"
  scope_class: core
  evidence_tier: 2
  date_known: unknown
  confidence: reported
- id: cyclone-boys-feijue-original
  family_id: cyclone-boys-feijue
  name: "Cyclone Boys FeiJue"
  scope_class: core
  evidence_tier: 2
  date_known: unknown
  confidence: probable
- id: cyclone-boys-mini-3x3-original
  family_id: cyclone-boys-mini-3x3
  name: "Cyclone Boys Mini 3x3"
  scope_class: core
  evidence_tier: 2
  date_known: disputed
  confidence: probable
- id: null
  family_id: cyclone-boys-metallic-3x3
  name: null
  scope_class: null
  evidence_tier: 2
  date_known: null
  confidence: null
  note: "zero-model finding — see research/notes/models/cyclone-boys-metallic-3x3-zero-model.md"
- id: maru-3x3-original
  family_id: maru-3x3
  name: "Maru 3x3"
  scope_class: core
  evidence_tier: 2
  date_known: "2011 (reported)"
  confidence: reported
- id: maru-cx3-original
  family_id: maru-cx3
  name: "Maru CX3"
  scope_class: core
  evidence_tier: 2
  date_known: unknown
  confidence: probable
- id: maru-vx-3-original
  family_id: maru-vx-3
  name: "Maru VX-3"
  scope_class: core
  evidence_tier: 2
  date_known: unknown
  confidence: probable
- id: maru-nano-original
  family_id: maru-nano
  name: "Maru Nano Cube"
  scope_class: conditional
  evidence_tier: 2
  date_known: unknown
  confidence: probable
```
