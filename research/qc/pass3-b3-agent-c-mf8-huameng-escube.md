# Pass 3, Batch 3, Agent C — MF8 / HuaMeng / ESCube model enumeration

Branch `b3-c`. Read first: `research/qc/pass3-admission-policy.md` (S6), DATA_MODEL §1.4/§4.2,
`schema/model.schema.json`, RESEARCH_SPEC §3.6a, house style `data/models/moyu/moyu-weilong-gts.yml`.

Six frozen families, all Tier 2 evidence only, model records under `data/models/mf8/`,
`data/models/huameng/`, `data/models/escube/`. No family was created, renamed, merged, split,
or re-parented. No variant record was created or touched.

Commits (this branch): `5b61d7c` (MF8), `321cc12` (HuaMeng), `b423a3b` (ESCube + leads note).
`npm run check` is clean at HEAD (validate/lint/duplicates/build/privacy/selftest/coverage all
PASS; 8 new models, 2 new sources).

---

## mf8-legend

**Accepted model:**

- **`mf8-legend-v2`** — "MF8 Legend V2". Tier 2 (`thecubicle-mf8-legend-v2`), structured spec
  table: Type 3x3, 56.0mm, 100g. `scope_class: core` (ordinary WCA-format 3x3, per the family's
  own S6-satisfying evidence). `generation`: label "V2", ordinal 2, basis
  `manufacturer_declared` (the product's own retail name). `specs.size_mm: 56.0`,
  `specs.weight_g: 100`, `specs.shape: standard`. No magnet/core/adjustment field is stated by
  the source; all left unset.

**Candidate, not accepted:**

- **"MF8 Legend"** (unsuffixed, "V1"). The Speedsolving wiki's dated product list places
  "MF8 Legend 3x3x3" at 2011 (Tier 4 — the source's own reliability_note says so explicitly).
  A Tier 5 customer review on the same TheCubicle V2 capture ("Much much better than the V1,
  my V1 died when I tried to lube/tension it, the ball core stripped") independently implies a
  V1 existed and used a ball core, but Tier 5 is inadmissible (rule 12) and is recorded only as
  an uncited lead. **No Tier 1-3 source naming "MF8 Legend" as a distinct product was found
  this pass** despite: a TheCubicle `/products/mf8-leg*` prefix sweep (only `mf8-legend-v2`
  captured), a SpeedCubeShop `/products/mf8-legend*` prefix sweep (no captures), and a
  Cubelelo `/products/mf8*` prefix sweep (Dino Cube, Petaminx ×2, Teraminx — no Legend of any
  generation). This is the S6 policy applied honestly: existence-class evidence requires Tier
  1-3, and none was found. Recorded as a lead in
  `research/notes/models/mf8-huameng-escube-leads.md` for a future pass (a general web search
  was not possible this session — WebSearch budget was exhausted before I reached this family).

No `succeeds` relationship is recorded on `mf8-legend-v2` (it would be an orphan reference,
since no "MF8 Legend" model record exists).

---

## mf8-crazy-3x3x3 — THE CENTRAL BOUNDARY CALL

**Accepted models**, split rather than merged:

- **`mf8-crazy-3x3-planets`** — "MF8 Crazy 3x3 Planets" (aliases: "Mf8 Crazy Planet Assortment
  3x3x3", "mf8 Crazy 3x3 Planets (Assorted)"). Two independent Tier 2 publishers, five years
  apart, describe the same unsuffixed product: SpeedCubeShop 2015-11
  (`speedcubeshop-mf8-crazy-planet-assortment-3x3x3-2015`) and TheCubicle, live 2020-09 and
  re-verified live 2026-09-03 (`thecubicle-mf8-crazy-3x3-planets-assorted`, Type: Cuboids,
  145g). `confidence: confirmed` on name/existence (rule 9, two independent Tier 2 agreeing).
  `scope_class: conditional`, justified by 2015-2020 documented circulation (rule 15
  satisfied). `generation`: label "Planets", ordinal 1, basis `community_convention`
  (deliberately not manufacturer_declared — no manufacturer numbering statement exists).

- **`mf8-crazy-3x3-plus-planet-series`** — "MF8 Crazy 3x3 Plus Planet Series". Tier 2
  (`speedcubeshop-mf8-crazy-3x3-plus-planet-series-earth-2024`, Type: Shape Mod, 57mm, no
  magnets). `scope_class: conditional`, justified by 2023-2025 documented circulation (a
  wayback prefix sweep found per-planet SKUs and an 8-version bundle spanning that range).
  `generation`: label "Plus Planet Series", ordinal 2, basis `community_convention`. A
  `succeeds` relationship points at `mf8-crazy-3x3-planets`, `confidence: uncertain`.

**My answer to the Crazy-3x3 generations question, with evidence:**

Two models, split under genuine uncertainty (RESEARCH_SPEC §4 worked decision G), not
collapsed into one and not treated as three (the 2010 wiki entry is not separately admitted —
see below). Evidence considered:

1. **Naming**: 2015/2020 captures never use "Plus"; 2023-2025 captures consistently do
   ("Mf8 Crazy 3x3 **Plus** Planet Series"). This is the strongest signal, but DATA_MODEL §4.2
   explicitly treats a name/version change as "a strong signal about design change and a weak
   one about configuration" — evidence, not proof.
2. **Retailer taxonomy differs**: TheCubicle (2020) calls it "Type: Cuboids"; SpeedCubeShop
   (2024) calls the "Plus" product "Type: Shape Mod". Different fields from different
   retailers' own taxonomies — suggestive, not conclusive, and RESEARCH_SPEC §3.6a explicitly
   warns against treating retailer taxonomy/slugs as lineage evidence on their own.
3. **No spec contradicts identity**: both are non-magnetic; sizes/weights given (145g gross for
   the earlier, 57mm for the later) don't overlap enough to compare directly, but nothing
   *conflicts*.
4. **Counter-evidence weakening the split**: MF8's parallel 2x2 "Crazy...Plus" line
   (`mf8-crazy-2x2-plus-type-000/001/011`) is *always* sold under the "Plus" name in every
   capture found this pass — there is no unsuffixed "MF8 Crazy 2x2" anywhere in the evidence.
   This suggests "Plus" may just be MF8's standing brand name for this style of shape-mod
   cuboid rather than a generational marker specifically for the 3x3 line — which would argue
   for treating "Plus" as **not** meaningfully different from the earlier "Planets" naming.
5. **No source anywhere states a mould, mechanism, or internal-geometry difference** between
   the two name forms. This is the crux: DATA_MODEL §4.2's actual test ("could the manufacturer
   produce both from the same underlying design by choosing different parts/materials at
   assembly?") cannot be answered affirmatively *or* negatively from the evidence in hand.

Given genuine unresolvable uncertainty on the *design-identity* question, and explicit,
repeated instruction across DATA_MODEL, RESEARCH_SPEC, and the admission policy to
**default to splitting rather than collapsing** when this is the case ("splitting is
recoverable by merge; collapsing loses the distinction silently and nobody ever notices"), I
split into two models and recorded the `succeeds` relationship with `confidence: uncertain`.
**This is a flag for human review, not a settled conclusion** — a future pass with more
evidence (an MF8-side statement, a side-by-side mechanism photo, a reviewer's mechanical
comparison) could merge these back into one model, or confirm the split.

The 2010 Speedsolving wiki entry ("MF8 Crazy 3x3x3 series") is Tier 4 only and is **not**
admitted as a third model. It is folded into `mf8-crazy-3x3-planets`'s description as
unconfirmed background (plausibly the same design's earliest appearance, nothing found
contradicts that reading) rather than treated as evidence of a still-earlier, separately
admitted generation.

**A "Planets assortment" sold as a set is a bundle, not a model; an individually-named planet
is a colourway variant, not a model** — confirmed directly this pass: the 2024 SpeedCubeShop
"Plus Planet Series (Earth)" listing has its own in-page "Version" selector offering Earth,
Jupiter, Mars, Mercury, Neptune, Saturn, Uranus, Venus, and Black as options of **one product
listing** — direct retailer evidence that individual planets are colourway/pattern variants of
one model, not separate models, and the various "8-versions" bundle SKU and standalone
per-planet SKUs found by the wayback sweep are read the same way (bundle/SKU-structure
variation, not design variation).

---

## huameng-tg

**Accepted models:**

- **`huameng-tg-v1`** — "HuaMeng TG". Tier 2 (`thecubicle-huameng-tg-3x3-ball-core`).
  `scope_class: core`. `generation`: label "TG", ordinal 1, basis `manufacturer_declared`
  (ordinal itself is `uncertain`-attested — inferred only from the later "V2" naming, not
  stated). `specs.core_system: dual_adjustment`, `specs.adjustment_system: tri_adjust`, both
  `uncertain` (read from marketing prose — "6 tension settings, 9 compression settings, 5 edge
  magnet adjustments, 6 corner/core magnet adjustments" — not a structured field). A wayback
  prefix sweep of `thecubicle.com/products/huameng` (53 URLs, complete, not limit-truncated)
  found `huameng-tg-3x3-ball-core(-uv)`, `-maglev-ball-core(-uv)`, and
  `-spirit-pearl-limited-edition` as the only other TG-prefixed slugs — all read as
  configuration/edition variants (core-magnet architecture, MagLev, UV coating, limited
  packaging), consistent with worked decision A, not new models.

- **`huameng-tg-v2`** — "HuaMeng TG V2". Tier 2, single source
  (`thecubicle-huameng-tg-v2-3x3-20-magnet-ball-core`, new this pass, capture 2026-05-06). The
  manufacturer's own product name embeds "V2" — the sole basis for the split. The page's own
  description is a placeholder ("more details coming soon!"); **no mould/mechanism-difference
  language exists anywhere in the source**. Per DATA_MODEL §4.2 ("a manufacturer's version
  number is a strong signal about design change") and worked decision G (default to split when
  unclear), admitted as a new model with `succeeds` → `huameng-tg-v1`, `confidence: uncertain`
  throughout the generation and relationship attestations. **This is the thinnest model record
  in this batch and the one most likely to be worth revisiting once TheCubicle's own
  description is filled in** ("more details coming soon" as of the capture date).

---

## huameng-ys3m

**Accepted model:**

- **`huameng-ys3m-v1`** — "HuaMeng YS3M". Tier 2 (`thecubicle-huameng-ys3m-3x3-2023`,
  earliest capture 2023-03-21). `scope_class: core`. `generation`: label "YS3M", ordinal 1,
  basis `manufacturer_declared`. `specs.size_mm: 55.0`, `specs.weight_g: 76.0` (using the
  source's own "Item Weight" field, not "Gross Weight" 217g, which almost certainly includes
  packaging). A wayback sweep of `thecubicle.com/products/huameng` found only
  `huameng-ys3m-3x3` (standard), `-maglev`, `-ball-core-magnetic-core-maglev`, and
  `-ball-core-uv-magnetic-core-maglev` (also under the alternate slug
  `huameng-ys3-m-20-core-magnetic-maglev-ball-core-uv`) — all configuration variants (the base
  page itself cross-links to the Maglev/Ball-core versions as options of one product). **No
  "YS3M V2" or other version-numbered YS3M product was found**, so — unlike TG — no split.

The pre-existing "MoYu HuaMeng" naming lead (flagged at family level before this pass) is
**not** re-opened per the batch brief; it remains a Pass 1 manufacturer-relationship question.

---

## escube-es3

**Accepted model:**

- **`escube-es3-v1`** — "ESCube ES3" (aliases: "ES3", "ES3 3x3 (Magnetic)"). Tier 2
  (`speedcubeshop-es3-debut-brand-2025`). `scope_class: core`. `generation`: label "ES3",
  ordinal 1, basis `manufacturer_declared`, `confidence: reported` (SpeedCubeShop directly
  states "the debut release for the new brand" — a first-party statement of being first, more
  direct than most of this batch's ordinal-1 calls). `specs.core_system: dual_adjustment`,
  `specs.adjustment_system: tension_compression`, both `probable` — read from the same
  capture's "Version comparison" table ("Dual-adjustment core for independent spring
  compression & tension (6 settings)"), which I checked directly against the archived page
  (same `archive_url` as the existing source; the on-file excerpt only quotes the debut-brand
  sentence, not this table). A wayback sweep of `speedcubeshop.com/products/es3*` found only
  `es3-3x3-magnetic`, `-magnetic-core-magnets`, and `-magnetic-20-core-magnets-uv-coated` as
  further ES3-prefixed slugs — magnet-count/UV configuration variants (48/64/76 magnets across
  Standard/8-Core/20-Core, per the version-comparison table), not new models. `size_mm` and
  `weight_g` (which varies 77.6/79.1/79.8g across configs) are left unset at model level.

---

## escube-air — zero-model risk avoided, but a family-boundary escalation found

The batch brief flagged this family as a legitimate candidate for a zero-model outcome. A
wayback prefix sweep of both `thecubicle.com/products/escube` and
`speedcubeshop.com/products/es3*` found citable Tier 2 evidence for one model, so it is **not**
a zero-model finding.

**Accepted model:**

- **`escube-air-v1`** — "ESCube Air" (aliases: "ES3 Air", "ES3 Air 3x3 (Magnetic, 20-Magnet
  Ball-Core)"). Two independent Tier 2 sources: TheCubicle
  (`thecubicle-escube-air-3x3-20-magnet-ball-core`, capture 2026-06-16, nearest listing capture
  2026-02-28) and SpeedCubeShop (`speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`, new
  this pass, capture 2026-04-03). Both agree on a 20-magnet ball-core mechanism →
  `specs.core_system: ball_core`, `confidence: confirmed` (rule 9). `scope_class: core`.
  `size_mm: 56` (single-source, `speedcubeshop`). `magnet_architecture`, `adjustment_system`,
  and `weight_g` are all left **unset** — see the escalation below and the model file's
  description for why each was judged not confidently resolvable from marketing language.

**ESCALATION — family-boundary naming tension (not acted on; families are frozen):**
SpeedCubeShop names this product **"ES3 Air"** — i.e. as an edition/configuration of the "ES3"
line, with its own in-listing "Version: 20-Magnet Ball-Core / 8-Magnet Ball-Core" selector —
while TheCubicle independently names the same physical product **"ESCube Air"** — a
brand-scoped name implying its own line, separate from ES3. This is direct evidence in tension
with the frozen `escube-air` / `escube-es3` family split, which was made on TheCubicle's naming
alone. A Tier 5 customer review on the TheCubicle capture ("The original ESCube was better")
further suggests collectors read this as a successor to "the original ESCube," consistent with
the tension but not citable. **I did not merge, rename, or re-parent either family** — I placed
this model under `escube-air` (the family it was created for) and recorded the naming conflict
in both the model file and `research/notes/models/mf8-huameng-escube-leads.md` for human
review of the family split. This is the escalation this batch is most likely to need follow-up
on.

`weight_g` was additionally left unset because TheCubicle's "Gross Weight: 132g" and
SpeedCubeShop's "~78g" almost certainly use different conventions (gross/shipping vs. net item
weight — the same pattern independently observed for `escube-es3-v1` and `huameng-ys3m-v1` in
this batch) and picking one would misrepresent an unresolved measurement-convention gap as a
settled design fact.

---

## §3.6a discovery-breadth record

**Retailer `/products/` prefix sweeps performed** (both required even though the brands were
already discovered via this exact method in an earlier pass): `thecubicle.com/products/mf8*`,
`/mf8-crazy-3x3*`, `/mf8-crazy-2x2*`, `/mf8-leg*`; `thecubicle.com/products/huameng*` (53 URLs,
complete); `speedcubeshop.com/products/mf8*`, `/mf8-crazy-3x3*`; `thecubicle.com/products/
escube*`; `speedcubeshop.com/products/es3*`, `/escube*`. Full detail and every URL list in
`research/notes/models/mf8-huameng-escube-leads.md`.

**Non-US/English retailer checked**: **Cubelelo** (India). `/products/mf8*`: 4 hits, none a
3x3 (Dino Cube, Petaminx ×2, Teraminx — shape mods outside this batch's families).
`/products/huameng*` and `/products/escube*`: no captures. Recorded per §3.6a as "swept,
nothing new found" for all three brands. A second attempt at a Chinese-language retailer
(CubeZZ) failed to even discover a usable product-URL prefix pattern this pass (its URLs don't
follow a `/products/<slug>` or discoverable `/goods-<slug>` scheme); recorded as a **failed
discovery attempt, not evidence of absence**, in the leads note, with a concrete next step for
a future pass.

**Wayback/CDX reliability**: intermittent `fetch failed` transient connection errors occurred
throughout this session (not timeouts) at a roughly 40-50% rate; every failed call was retried
until it produced a real result. No conclusion in this report rests on an unretried failure.

---

## Sources used / created

**Reused** (pre-existing, created in Pass 2.5 or earlier): `speedcubeshop-mf8-crazy-planet-
assortment-3x3x3-2015`, `thecubicle-mf8-crazy-3x3-planets-assorted`, `speedcubeshop-mf8-crazy-
3x3-plus-planet-series-earth-2024`, `thecubicle-mf8-legend-v2`, `speedsolving-wiki-mf8-
products`, `thecubicle-huameng-tg-3x3-ball-core`, `thecubicle-huameng-ys3m-3x3-2023`,
`thecubicle-escube-air-3x3-20-magnet-ball-core`, `speedcubeshop-es3-debut-brand-2025`.

**Created this pass** (both checked for duplication under alternate URL forms before creation;
neither existed under any URL variant): `thecubicle-huameng-tg-v2-3x3-20-magnet-ball-core`,
`speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`.

---

## Machine-readable summary

```yaml
models:
  - id: mf8-legend-v2
    family_id: mf8-legend
    name: "MF8 Legend V2"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: mf8-crazy-3x3-planets
    family_id: mf8-crazy-3x3x3
    name: "MF8 Crazy 3x3 Planets"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: confirmed
  - id: mf8-crazy-3x3-plus-planet-series
    family_id: mf8-crazy-3x3x3
    name: "MF8 Crazy 3x3 Plus Planet Series"
    scope_class: conditional
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: huameng-tg-v1
    family_id: huameng-tg
    name: "HuaMeng TG"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: huameng-tg-v2
    family_id: huameng-tg
    name: "HuaMeng TG V2"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: uncertain
  - id: huameng-ys3m-v1
    family_id: huameng-ys3m
    name: "HuaMeng YS3M"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: probable
  - id: escube-es3-v1
    family_id: escube-es3
    name: "ESCube ES3"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: reported
  - id: escube-air-v1
    family_id: escube-air
    name: "ESCube Air"
    scope_class: core
    evidence_tier: 2
    date_known: false
    confidence: probable

candidates_not_accepted:
  - name: "MF8 Legend (V1 / unsuffixed)"
    family_id: mf8-legend
    reason: "Only Tier 4 (wiki) and Tier 5 (customer review, uncited) evidence found; no
      Tier 1-3 source names it as a distinct product despite three retailer prefix sweeps."

zero_model_findings: []

escalations:
  - subject: "escube-air vs escube-es3 family boundary"
    finding: "SpeedCubeShop names the escube-air-v1 product 'ES3 Air' (an ES3 edition);
      TheCubicle names it 'ESCube Air' (its own line). Evidence in tension with the frozen
      two-family split. Not acted on; recorded for human review."
  - subject: "MF8 Crazy 3x3 generation boundary"
    finding: "Split into two models (mf8-crazy-3x3-planets, mf8-crazy-3x3-plus-planet-series)
      under genuine, irreducible uncertainty about whether a mould/mechanism change occurred.
      Flagged as the central call of this batch for human review; see full reasoning above."
  - subject: "huameng-tg-v2 evidence thinness"
    finding: "Admitted solely on a manufacturer-named 'V2' product slug with a placeholder
      description. Worth revisiting once TheCubicle fills in the real product description."
```
