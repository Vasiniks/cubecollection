# CubeCollection — research-to-exhibition handoff

Written 2026-09-19. This is the bridge between the research half of the project and the
design/build half. It states what the archive claims, what it explicitly does not claim, what
remains uncertain, and what Phase III can and cannot build on today.

**Status of this document: provisional.** Five closure lanes were running when it was written
(P4-9 methodology sufficiency, P4-10 Ziina, P26-2 escalation infrastructure, P4-12→P4-16, and a
final adversarial QC sweep). Their verdicts belong in the sections marked *pending* and this
document should be updated when they land.

---

## ARCHIVE STATE

```
manufacturers  54      FROZEN
families      132      FROZEN
models        269      FROZEN
variants      527
sources       609
events          4
people          2
specimens       0
media           0
geometry-profiles 0
```

```
npm run check        0 errors, 30 advisories — every one explained, none unexplained
npm run audit        14 sweeps, advisory only
npm run escalations  24 linked · 0 unfiled · 0 dangling · 0 free-prose
npm run selftest     every check behaved as specified
ledger               41 resolved · 7 open · 11 needs_human_decision  (of 59)
```

The 30 advisories are not unfinished work. 14 are rule 18 (genuine minis and oversized cubes —
each oversized cube raises two, one for size and one for mass); 10 are rule 42 (five Speedsolving
pairs kept deliberately, five chronological citations where two captures *are* the claim); 4 are
rule 40 (model-predates-family, tracked as P3-D2); 2 are rule 27 (Rubik's Phantom/Impossible,
tracked as P4-12).

---

## COVERAGE CLAIMS

RESEARCH_SPEC 3.6b defines four independent completeness dimensions. They are separate, and
satisfying one never implies another — the archive learned this the expensive way.

### Historical preservation — *what existed and can be evidenced*
**Strong, and the best-supported dimension.** 42 of 54 manufacturers carry cited sources; 32
carry a 3.6a-style prefix or collection sweep. Every record at every layer cites at least one
source (0 of 269 models and 0 of 527 variants cite nothing). No model and no variant rests on
tier-4-only evidence.

### Current catalogue enumeration — *what is on sale now*
**Adequate and now instrumented, but not exhaustive.** `npm run catalogue-gap` compares three
retailers (TheCubicle, SpeedCubeShop, and Cubelelo as the non-US check 3.6a requires) against
model names and aliases. Five discovery-failure mechanisms are documented and four are
detectable; the fifth was a defect in the tool itself, fixed 2026-09-19. *Pending lane A's
verdict on whether the method is now defensible for stopping.*

### Generation completeness — *were meaningful successors captured*
**Known incomplete, and deliberately so.** The frozen 269 stops short of several current
flagships. Escalated with evidence, not admitted: MoYu WeiLong V10 and V11, MoYu AoLong V5,
X-Man Tornado V5, QiYi M Pro V3, YJ MGC Sigma, ShengShou Legend Plus Big 18cm, MoreTry X3+ V4.
**There is no structural detector for this dimension** and that was tested rather than assumed —
a version-contiguity probe across 132 families flagged two interior gaps and both were false
(MoYu renumbered its WeiLong line, so V3–V8 never existed). Succession must come from
manufacturer statements or dated retail evidence, never from arithmetic.

### Variant completeness — *were meaningful configurations captured*
**Assessed everywhere, uneven in depth.** All 269 models are assessed: 100 hold one
configuration, 57 hold config detail, 112 hold multiple configurations. A single-configuration
record means *searched and nothing further found* only where a report says so; elsewhere it means
not yet examined in depth.

---

## KNOWN LIMITATIONS

Each is measured, not estimated.

1. **The frozen taxonomy predates its own discovery standard.** RESEARCH_SPEC 3.6a was added
   2026-09-03, after Pass 2 family enumeration completed. No family in the frozen 132 was
   enumerated under its three checks. "The taxonomy is frozen" and "the taxonomy was enumerated
   to this standard" are different claims and only the first is true. (3.6a now says this;
   ledger P26-3.)

2. **Single-publisher dependence, and it is partly structural.** 52% of families, 48% of models
   and 80% of variants rest on one publisher. The variant figure is largely a property of the
   subject: a variant is a specific sold configuration and that detail usually exists on exactly
   one retailer's page. Chasing the metric directly *rewards error* — an apparent second
   publisher for newisland turned out to be TheCubicle's copy word for word, which under
   RESEARCH_SPEC 3.2 is one source, not two.

3. **Seven families rest on a single tier-4 source** (four DianSheng, three YuXin). A further
   nine improved only because the Speedsolving wiki was re-tiered 4→3 — a curation judgement,
   not new corroboration; they remain single-source. Only two of the eighteen originally listed
   gained genuine independent corroboration. (Ledger E2.)

4. **Dating is thin: 128 of 269 models carry any date at all.** A chronological presentation can
   place fewer than half the models. Where dates exist they cluster 2016–2024, peaking at 2019.

5. **Two manufacturers still rest on one publisher with no first-party source**: newisland (10
   citations) and pbcube (4). Down from nine. (Ledger P4-8.)

6. **Mould geometry is unprovable from reachable sources.** Tank/Gem was resolved as distinct on
   packaging names and catalogue behaviour, explicitly not on geometry; no macro shot exists in
   any crawled asset and no comparison review exists on the indexed web. (Ledger P26-15, closed
   as a limitation rather than a task.)

7. **Facet evidence cannot be archived.** Storefront `/collections/<brand>/products.json`
   endpoints are never crawled — 34 of 34 such sources are excerpt-only and CDX returns nothing
   for any of them. Such excerpts must reproduce their enumeration in full, and
   `preservation_method: excerpt` is permanent there, not provisional.

8. **The archive holds no media, no specimens and no geometry.** 0 media records, 0 specimens,
   0 geometry profiles. Render readiness is **0% render_ready, 0% face_complete, 36% partial,
   64% none**. Nothing in the archive can be rendered today.

---

## OPEN HUMAN DECISIONS (11)

None blocks Phase III. Each is a decision, not a research task — no further evidence will settle
them.

| id | decision |
|---|---|
| P4-9 | whether to admit the escalated current-generation models, reopening the 269 freeze |
| P4-10 | whether to admit up to seven absent manufacturers, incl. Ziina |
| P4-7 | may a catalogue-migration stamp bound *catalogue presence*, having been shown not to date a release |
| P4-16 | `reference_only` carries two meanings; only one is documented |
| P4-12 | six model/variant boundary questions deferred by the freeze |
| P4-2 | four QiYi retailer slugs with no frozen model |
| P4-4 | two Pass 3 model-layer gaps |
| P3-D2 | 7 families understate their own introduced date (source of the 4 rule-40 advisories) |
| P3-T2 | escube-es3 and escube-air may be one line under two retailer names |
| P3-T3 | whether to add a `manufactured_by` / `shared_platform_with` relationship type |
| C-B1 | whether to admit Cubelelo's "Drift" — i.e. whether a retailer house brand is a manufacturer |

**P4-7 is the clearest example of the category.** Its empirical half is answered: across 12
products independently dated 2019–2025, none carries the `2018-09-11` stamp, and all twelve carry
their own later dates. Three independent strands converge on the migration-marker reading. What
remains is policy — whether such a stamp may be used as a bound at all — and the issue's own
recommendation forbids settling it by picking the reading that yields more data.

---

## METHODOLOGY

- **Provenance is a JSON-Pointer sidecar.** Every claim carries `confidence` and `sources`;
  sources live in `att.sources` **and** `att.disputed[].sources`, and any sweep must read both
  (`citedSourceIds()`). That blind spot bit rules 8, 12, 42 and 45 before it was closed.
- **Six confidence values**: confirmed / probable / reported / uncertain / disputed / unknown.
  `unknown` means searched-and-not-found; **absence means not searched**; and *blocked* is
  neither — a source that could not be reached is recorded as blocked.
- **Tiers 1–5**, with per-source overrides (55 sources carry one). Any measurement must use
  `sourceTier()` rather than kind defaults, or it will be wrong.
- **Two listings with identical wording are one source** (3.2). No script can judge this.
- **52 lint rules**, each with a failing and a passing fixture, asserted by `npm run selftest`.
- **Probe discipline**, learned repeatedly: a large result is a lead, not a finding. Inspect real
  matches, test a known positive *and* a known negative, and report the measured false-positive
  rate. Probes have been discarded at 39/39, 9/9, 160/160 and ~98%. A defensible negative is a
  result.

---

## EXHIBITION IMPLICATIONS

Derived from the data as it actually is, not from what a cube museum might generically want.

- **A chronological timeline cannot be the primary spine.** Only 128 of 269 models are dated.
  A timeline works as *a* view, over a documented 48% subset, with the undated visible rather
  than silently dropped.
- **Manufacturer is the strongest spine.** GAN 40 models, DaYan 28, QiYi 24, MoYu 23, YJ 23,
  ShengShou 18 — a natural gallery structure with real depth behind the largest rooms.
- **Configuration exploration is supported for a minority, and that minority is identifiable.**
  112 models hold multiple configurations; the richest are `lefun-3x3-standard` (14 variants),
  `mf8-crazy-3x3-plus-planet-series` (9), `dayan-bermuda-triangle` (8), `gan-flagship-16` (8),
  `maru-3x3-original` (8). These earn a comparison interface; the 100 single-configuration
  models must not pretend to one.
- **Mechanical evolution is the best-evidenced narrative axis.** The populated config axes are
  `maglev` (94), `coating` (84), `weight_g` (74), `magnet_configuration` (62), `size_mm` (50),
  `magnet_strength` (31), `adjustment_system` (25), `core_system` (21). Magnetism and core
  architecture carry enough data to tell a real story.
- **Provenance is a first-class exhibit, not a footnote.** 609 sources with excerpts, tiers and
  confidence values are the archive's distinguishing asset. A museum that shows *why it believes
  each claim* is the thing this dataset is uniquely equipped to be.
- **Events are thin but pointed.** 4 events, 2 people — both world-record holders. Enough for
  accent, not for a section.

---

## 3D REQUIREMENTS

**The blocking fact: nothing renders today.** `geometry-profiles/` is empty, `media/` is empty,
and `build.mjs` computes `renderable` as `Boolean(profile) && completeness === 'render_ready'`,
which is currently false for all 527 variants.

Phase III must therefore decide, early and explicitly, between:
- **(a) Generic parametric geometry** — one procedural 3x3 driven by recorded `size_mm`,
  `colorway`, `coating` and `core_system`. Cheap, covers the whole archive uniformly, and is
  honest only if the presentation does not imply it is a scan of the specific product.
- **(b) Per-model authored assets** — faithful, and impossible at 269 models without a large
  asset pipeline and rights-cleared reference imagery the archive does not have.
- **(c) A hybrid** — parametric baseline for everything, authored assets for a small set of
  landmark cubes.

**(c) is the only one the data supports.** Whatever is chosen, the presentation must not assert
visual fidelity the evidence does not carry — the same standard the archive applies to every
other claim.

---

## DATA REQUIRED BY THE FRONTEND

The contract already exists and predates this document: `scripts/build.mjs` emits
`dist/private/` (everything, never deployed) and `dist/public/` (private data removed), with
**"Phase B consumes dist/public only. No presentation code reads data/."** `PUBLIC_SCOPE` is
`{core, conditional}`, so the 13 `reference_only` models are excluded from the public bundle —
which is worth revisiting, since all 13 are evidenced in-window and are excluded by a switch
meant for out-of-window lineage stubs (ledger P4-16).

**Verified by running it, 2026-09-19.** Three things Phase III must know, and the full working is
in `docs/EXHIBITION_ARCHITECTURE.md` §10.

1. **A default build emits ZERO records.** The gate is `--public-status=`, defaulting to
   `published`, and *no record has that status* — everything is `drafted`, `sourced` or `stub`,
   and **all 527 variants are `stub`**. Building with `--public-status=sourced,drafted,stub`
   emits 1568 of 1597 records (4.1 MB) and passes. Either records get promoted through a
   curation pass, or the exhibition build declares the statuses it accepts. A gate of `sourced`
   alone would publish none of the variants, which are the objects visitors look at.

2. **The bundle is richer than expected, and removes work from the frontend.** Public counts:
   54 · 132 · 256 models · 511 variants · 609 sources. One JSON per entity plus prebuilt
   `index/by-manufacturer`, `by-family`, `by-model` and `chronology`. Variant records already
   carry `attestations` with confidence and source ids — so the evidence drawer is directly
   supported — and **`resolved_specs`**, which has already resolved model→variant inheritance and
   tags each value with the layer it came from. The frontend does not need to reimplement that.

3. **The 3D blockers are enumerated per variant.** `representation.procedural.blockers` is
   populated for every record. Across all 511: *face colours undocumented* 511, *logo placement
   undocumented* 511, *no geometry profile* 511, *body plastic colour undocumented* 489 (22 are
   documented). No variant has fewer than three. Rendering is blocked by missing **data** as much
   as by missing assets, and the gaps are uniform rather than a long tail.

   The consequential decision is **face colours**: the standard scheme is near-universal, but the
   archive has deliberately not recorded it because it does not assert what it has not sourced.
   Adopting it as a *documented rendering convention* unblocks all 511 at once and is the
   recommendation — on the condition that the visitor can tell a convention from evidence.

---

## NEXT IMPLEMENTATION STEP

1. Update this document with the five lane verdicts.
2. Write the exhibition architecture document: information architecture, sections, data-to-
   exhibition mapping, visitor journeys, interaction principles.
3. Build **one vertical slice** proving `data → 3D object → interaction → historical context →
   presentation` end to end, on a single well-evidenced model with multiple configurations and a
   real date. `gan-flagship-16` (8 variants) and `dayan-guhong-pro-m` (6) are the strongest
   candidates.
4. Only then consider breadth.
