# Pass 3, Agent B — QiYi (9 families) + X-Man Design (2 families)

Model enumeration for the lane assigned in the task brief. Read first:
`research/qc/pass3-admission-policy.md` (the S6 decision), DATA_MODEL.md §1.4/§4.2,
`schema/model.schema.json`. Written live as work proceeded; committed at each family boundary.

**Result: 29 models across 11 families, 33 new sources, one existing source reused, zero
family-taxonomy escalations, one major cross-cutting finding (Valk's non-3x3 siblings), and
several explicit model/variant boundary calls flagged below for review.**

`npm run check` is green (684 records, 0 errors, 0 warnings) as of the final commit.

---

## Method note: primary research this pass

Pass 2's QiYi/X-Man sourcing rested mostly on the Speedsolving wiki (tier 3, overridden) plus
retailer *collection-prefix* enumerations (lists of product slugs, not the products' own
descriptions). This pass fetched the individual TheCubicle product pages themselves — 33 of
them — via direct Wayback snapshot retrieval, which is what let most model/variant boundary
calls below rest on the manufacturer/retailer's own product-specific language ("a factory
magnetized version of...", "an updated version of... features an upgraded mechanism...",
"replacing the rivets with screws...") rather than the wiki's shorter release-log style
sentences alone. Every new source records `preservation_method: archive_url` with the exact
Wayback timestamp fetched.

`web.archive.org` was reachable only over HTTPS in this environment (`scripts/wayback.mjs`'s
own HTTP calls failed consistently); pages were retrieved directly via `curl` against the same
Wayback snapshots the project's own tooling would produce, and each source's `archive_url`
records the real, independently-resolvable snapshot URL a reviewer can re-fetch.

---

## qiyi-bullfight (1 model)

- **qiyi-bullfight-original** — "QiYi Bullfight" (DouNiu). Sole generation. Existence rests on
  the wiki alone (tier 3, overridden); no retailer page was found (checked directly — absent
  from every 2024-2025 QiYi retailer capture, consistent with a long-discontinued 2015 product).
  `specs` entirely unset. `announced: circa 2015, reported`.

## qiyi-thunderclap (3 models)

- **qiyi-thunderclap-v1** — succeeds qiyi-bullfight-original. The Bullfight→Thunderclap
  succession, previously wiki-only, is now **independently corroborated at tier 2**:
  TheCubicle's own copy says "The mechanism appears to be an improved version of the QiYi
  Bullfight" in different words from the wiki's "an improved version of the Bullfight" — genuine
  independent corroboration per RESEARCH_SPEC 3.2, not the same sentence twice.
- **qiyi-thunderclap-v2** — succeeds v1. TheCubicle: "the hotly-anticipated successor to the
  original QiYi Thunderclap" — direct tier-2 succession language.
- **qiyi-thunderclap-v3-m** — succeeds v2 (inferred from sequential numbering only — no direct
  "successor to V2" sentence was found, so this specific edge is `reported` not `probable`).
  TheCubicle names specific internal changes ("all primary plastic internals, a capped design...
  an updated anti-pop mechanism, tracks on the pieces... slots to assure correct magnet
  positioning") — the stronger tooling-description evidence class.

**Rejected candidates:** none beyond what's already in the family record (Newisland's
"Lightning" rebrand suspicion is a variant-level lead for a future pass, not a model here).

## qiyi-warrior (6 models)

- **qiyi-warrior-original** — the un-suffixed "Warrior" implied by Warrior W's "updated version
  of the original Warrior 3x3." Now confirmed to actually have its own retailer page: "The QiYi
  Warrior 3x3 is the 2nd release in QiYi's 'MoFangGe' series of stickerless speedcubes" —
  independent tier-2 evidence it is a real distinct product, not merely an inferred predecessor.
- **qiyi-warrior-w** — succeeds original. TheCubicle: "the new and improved version of the QiYi
  Warrior 3x3."
- **qiyi-warrior-s** — succeeds W. TheCubicle: "An updated version of the Warrior W, the Warrior
  S features an upgraded mechanism for better performance" — explicit mechanism-upgrade claim.
- **qiyi-warrior-m** — **BOUNDARY CALL, flagged for review.** No source states this is a
  magnetized version of W/S (contrast Valk's explicit "factory magnetized version of..."
  phrasing). Item weight (58.0g) is markedly lower than W (81.7g) or S (77.0g) at a similar/
  larger size — read as physical evidence of different piece geometry. Recorded as its own model
  at `uncertain` confidence on the identity claim, per "when unclear, default to new model." No
  `succeeds` relationship asserted.
- **qiyi-warrior-m-pro** — same boundary-call reasoning as Warrior M, distinct 55.0mm size, also
  `uncertain`. **Naming-collision note**, recorded explicitly: this is a Warrior-branded product
  using "M Pro" as a tier suffix, unrelated to the separate `qiyi-m-pro` FAMILY — the two share
  no evidence of any relationship, and the model file says so explicitly to pre-empt a future
  pass mistaking the name match for a connection.
- **qiyi-warrior-plus** — `scope_class: reference_only`. 188mm novelty ("use it as furniture" —
  retailer's own words), no documented significance found.

## qiyi-sail (3 models)

- **qiyi-sail-original** — corroborated at tier 2 independently of the wiki.
- **qiyi-sail-big** — `scope_class: conditional`, with `scope_justification`,
  `scope_decided_by`/`scope_decided_on` set. Unlike the two `reference_only` oversized items
  above, the wiki documents an actual competitive use: "often used for feet solving." Single
  tier-3(-overridden) source; recorded at `reported`.
- **qiyi-sail-w** — TheCubicle names specific design changes ("a reinforced mechanism... a
  rounded off center cap"). **No `succeeds` relationship asserted** — no source states it
  replaces the original Sail by name (the "W" suffix mirroring Warrior W is a naming lead only,
  flagged as an open question).

## qiyi-qimeng (2 models)

- **qiyi-qimeng-v3** — sole tier 1-2-sourced model (wiki doesn't cover this line at all, per the
  family's own notes); `probable` rather than `confirmed`.
- **qiyi-qimeng-plus** — `scope_class: reference_only`, 90mm oversized, same reasoning as
  Warrior Plus.

## qiyi-ms (1 model)

- **qiyi-ms-original** — now corroborated at tier 2 as well as tier 3. `specs.size_mm` left
  **unset** even though both the wiki (56.5mm) and general knowledge would suggest a value,
  because the retailer's own spec table at this capture has no Dimensions row — the S6 policy's
  "tier 1-2 only" bar for specifications is a hard requirement, not merely a confidence cap, and
  a wiki figure may never substitute (RESEARCH_SPEC S6 §1: "A wiki may never establish a
  specification").

## qiyi-mp (1 model)

- **qiyi-mp-original** — existence and all detail rest on the wiki alone. **Checked directly for
  a retailer page and found none** (qiyi-mp, qiyi-mp-3x3, qiyi-mp-3x3-magnetic — no Wayback
  snapshot under any of these slugs), so this is a genuine absence, not an unchecked gap.
  `reported` throughout.

## qiyi-m-pro (3 models)

- **qiyi-m-pro-standard** — base generation; "Standard"/"MagLev"/"MagLev + Ballcore" are
  variants of this one model per the wiki's own explicit "multiple versions" framing (worked
  decision A).
- **qiyi-m-pro-v2** — **BOUNDARY CALL.** The retailer's own "V2" naming and "flagship" framing
  are the only identity evidence; no mechanism-difference statement was found beyond the version
  number itself, so `generation/basis` and the `succeeds` relationship are both `uncertain`
  despite the model being created (version numbering alone is treated as sufficient per
  DATA_MODEL §4.2, but the confidence is held honestly low).
- **qiyi-m-pro-elite** — **BOUNDARY CALL, the closest call in this pass.** Folds "M Pro Elite"
  (mechanical) and "Smart Cube 3x3" (electronic) into ONE model, on the wiki's own claim that
  Elite is "the non smart version of the Qiyi Smartcube... the same adjustment system." This
  rests on a **single tier-3(-overridden) source** — TheCubicle's own rich Smart Cube page never
  uses the name "Elite" or states a shared shell. No retailer page for "Elite" itself was found
  under any slug tried. Flagged explicitly for human review in the model file itself.

## qiyi-valk (4 models) — plus a major cross-cutting finding

- **qiyi-valk-3** — the base configuration. **New, directly-sourced release date**: TheCubicle's
  own Mini page states the parent "was first released to the market in August 2016" — an
  explicit dated statement (not a catalogue "Added" artifact), so `announced: 2016-08` is now
  `probable` rather than the family's prior `circa 2018` estimate. (The frozen family record is
  not edited; this is recorded at model level only.)
- **qiyi-valk-3-power** — distinct model: "a dual vertical core, capped pieces, pure primary
  internals" is a named internal-construction difference, not a magnet option. No succession
  asserted — a 2018 QiYi storefront capture already lists Power *alongside* the base Valk 3, so
  they read as concurrent tiers, not sequential.
- **qiyi-valk-3-elite** — distinct model: "a brand new magnetic system... QiYi introduced its
  own version of an elasticity adjustment system" — a named new mechanism.
- **qiyi-valk-3-mini** — distinct model purely on size (47.4mm vs 55.5mm): a size difference of
  this magnitude cannot be produced from the same tooling.
- Valk 3 M and Valk 3 Power M are explicitly **not** modelled separately — both product pages
  state directly "a factory magnetized version of" their non-magnetic sibling, the textbook
  worked-decision-A case.

**MAJOR FINDING (recorded in `qiyi-valk-3.yml`, not acted on in the frozen family record):**
The qiyi-valk family's own description frames "Valk2 M, Valk 3..., Valk 4 M..., and Valk 5 M" as
if they were sequential 3x3 design generations. Direct product-page fetches this pass show:

| Product | TheCubicle's own "Type" field | 
|---|---|
| Valk2 M | **2x2** ("this 2x2", contrasted directly with "that of a 3x3") |
| Valk 4 M (Standard/Strong) | **4x4** ("the first 4x4 in the iconic Valk line") |
| Valk 5 M | **5x5** ("a fast, smooth 5x5") |

"Valk" reads, on this evidence, as a cross-category QiYi brand where the numeral denotes **puzzle
size**, not a sequence of 3x3 generations. **"Valk 3" appears to be the only 3x3 generation the
Valk brand has ever carried.** No model is created for Valk2 M / Valk 4 M / Valk 5 M (out of
scope per RESEARCH_SPEC 2.4, "puzzles other than 3x3x3"), and four new sources record the
finding (`thecubicle-valk2-m-product`, `thecubicle-valk-4-m-standard-product`,
`thecubicle-valk-4-m-strong-product`, `thecubicle-valk-5-m-product`) so it is not silently lost.
**This is a finding about the frozen family record's own prose, not a taxonomy error** (the
manufacturer_id and family boundary are untouched) — flagged for the human reviewer who owns
that file, not corrected by this agent.

## x-man-tornado (4 models)

- **x-man-tornado-v1** — "the first cube from X-Man Designs" (TheCubicle, tier 2) — X-Man
  Design's literal first product, confirming the family's own `introduced: circa 2018` directly.
- **x-man-tornado-v2** — succeeds v1 (inferred from numbering; `reported`, no direct statement).
  Independently corroborates the qiyi-mp family's own wiki-sourced comparison figure ("54.5mm"),
  though this retailer's own spec table gives 55.0mm — the two figures are **not** reconciled;
  the retailer's own directly-measured number is preferred per source-tier ordering, and the
  wiki's competing figure is recorded but not adopted.
- **x-man-tornado-v3** — succeeds v2, **strongly evidenced**: "It solves some small issues that
  were present in the V2 like replacing the rivets with screws" — an explicit, named mechanical
  change, not just a version bump.
- **x-man-tornado-v4** — succeeds v3, also strongly evidenced: "This one has a ball-core" (a
  named core-system change) plus "a successor to the Tornado V3" stated directly.
  - **BOUNDARY CALL: "Tornado V4 AI" is treated as a variant of V4, not a separate model.**
    TheCubicle: "the smart upgrade of the world-renowned Tornado V4." Consistent with
    DATA_MODEL §4.1 (smart capability is explicitly a variant-level trigger) and with the
    qiyi-m-pro-elite precedent — the opposite of GAN's treatment of its own smart lines as
    separate families, because no separately-named persisting "X-Man smart" collection identity
    exists here, only this one product.

## x-man-xt3 (1 model)

- **x-man-xt3-v1** — the only generation found (checked directly for a V2 under three slug
  patterns; none exists). Positioned explicitly against Tornado by TheCubicle staff ("a simpler
  adjustment system than the Tornado that makes this cube both cheaper and more durable"), which
  is the basis for treating XT3 as its own family/model rather than a Tornado configuration — but
  a customer review in the same thread disagrees ("it even has the same pieces as tv3"), quoted
  rather than adjudicated per the existing source's own reliability note. This tension is
  unresolved and is exactly what a future (variant or corroboration) pass should chase.

---

## Rejected candidates (not created as models)

| Candidate | Reason |
|---|---|
| X-Man Volt | Confirmed (pass 2) to be a Square-1, not a 3x3 — never in this lane |
| QiYi Black Mamba (V3 mentioned by wiki) | Single wiki mention, explicitly framed as pre-dating QiYi's speedcube era; not chased this pass, an open lead (unchanged from pass 2) |
| Valk2 M | 2x2, out of scope — see the major finding above |
| Valk 4 M (Standard, Strong) | 4x4, out of scope |
| Valk 5 M | 5x5, out of scope |
| Warrior M / Warrior S / M Pro maglev-type configs | Treated as variants where a same-shell magnetized-version statement exists (Valk 3 M, Valk 3 Power M, M Pro MagLev); NOT created as separate models |
| XT3 "V2" | Searched directly under three plausible slugs; no snapshot exists |
| M Pro "Elite" retailer page | Searched directly under five plausible slugs; no snapshot exists — existence rests on the wiki alone |
| QiYi MP retailer page | Searched directly under three plausible slugs; no snapshot exists — existence rests on the wiki alone |

---

## Escalations

**None that require stopping a branch of enumeration.** No suspected family-taxonomy error
(wrong manufacturer_id, wrong family boundary, wrong parent) was found this pass. The one
cross-cutting finding — Valk's non-3x3 siblings — is a correction to the frozen family record's
**prose description**, not its `manufacturer_id`, `family_id`, or scope, so it is recorded as a
finding in `qiyi-valk-3.yml` and here, rather than escalated as a blocking taxonomy issue.

## Unresolved questions for a future pass

1. Whether Warrior M / Warrior M Pro are genuinely new moulds or under-evidenced magnetized
   variants of Warrior S — both created as models at `uncertain` confidence; a clearer
   manufacturer statement would resolve this either way.
2. Whether "M Pro Elite" and "Smart Cube 3x3" genuinely share one shell, or whether the wiki's
   single sentence linking them is imprecise — no retailer source names "Elite" directly.
3. Whether XT3 shares any tooling with Tornado V3 (customer reviews on the same page disagree).
4. The Warrior line's implied "original Warrior" predecessor to *that* — none found; treated as
   the family's earliest identified design by elimination.
5. QiMeng's V1/V2 predecessors (implied by "V3" numbering) — not found this pass.
6. Whether Sail W and Thunderclap V2/V3 should carry `successor_family_id`-style stronger
   relationships once better sources exist (schema supports it at the family level; unchanged,
   frozen, not touched here).
7. The Tornado V2 size discrepancy (54.5mm wiki vs. 55.0mm retailer spec table) — not
   reconciled.

## Sources

**33 new sources created** (all `kind: retailer`, `preservation_method: archive_url`, tier 2
except where the underlying product is itself the QiYi/X-Man corporate history already cited):
see `data/sources/thecubicle-qiyi-*-product.yml`, `data/sources/thecubicle-valk-*-product.yml`,
`data/sources/thecubicle-x-man-tornado*-product.yml`.

**Reused without modification:** `speedsolving-wiki-qiyi-products`,
`thecubicle-qiyi-mofangge-collection-2025`, `thecubicle-products-valk-prefix-2025`,
`thecubicle-x-man-designs-collection-2025`, `thecubicle-x-man-xt3-v1-3x3-flagship-product`,
`qiyicube-storefront-2018`. `theqiyi-about-us` was **not** cited (per the binding pass 2.5
remediation — it is demoted to tier 4 and cited by zero attestations, unchanged by this pass).

---

## Machine-readable summary

```yaml
models:
  - { id: qiyi-bullfight-original,  family_id: qiyi-bullfight,  name: "QiYi Bullfight",        scope_class: core,           evidence_tier: 3,   date_known: "circa 2015",   confidence: reported }
  - { id: qiyi-thunderclap-v1,      family_id: qiyi-thunderclap, name: "QiYi Thunderclap",      scope_class: core,           evidence_tier: 2/3, date_known: "circa 2015",   confidence: reported }
  - { id: qiyi-thunderclap-v2,      family_id: qiyi-thunderclap, name: "QiYi Thunderclap V2",   scope_class: core,           evidence_tier: 2,   date_known: "circa 2016",   confidence: probable }
  - { id: qiyi-thunderclap-v3-m,    family_id: qiyi-thunderclap, name: "QiYi Thunderclap V3 M", scope_class: core,           evidence_tier: 2,   date_known: "circa 2019",   confidence: probable }
  - { id: qiyi-warrior-original,    family_id: qiyi-warrior,    name: "QiYi Warrior",          scope_class: core,           evidence_tier: 2/3, date_known: unknown,        confidence: probable }
  - { id: qiyi-warrior-w,           family_id: qiyi-warrior,    name: "QiYi Warrior W",        scope_class: core,           evidence_tier: 2,   date_known: "circa 2016",   confidence: probable }
  - { id: qiyi-warrior-s,           family_id: qiyi-warrior,    name: "QiYi Warrior S",        scope_class: core,           evidence_tier: 2,   date_known: "circa 2019",   confidence: probable }
  - { id: qiyi-warrior-m,           family_id: qiyi-warrior,    name: "QiYi Warrior M",        scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: uncertain }
  - { id: qiyi-warrior-m-pro,       family_id: qiyi-warrior,    name: "QiYi Warrior M Pro",    scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: uncertain }
  - { id: qiyi-warrior-plus,        family_id: qiyi-warrior,    name: "QiYi Warrior Plus",     scope_class: reference_only, evidence_tier: 2,   date_known: unknown,        confidence: reported }
  - { id: qiyi-sail-original,       family_id: qiyi-sail,       name: "QiYi Sail",             scope_class: core,           evidence_tier: 2/3, date_known: "circa 2015",   confidence: probable }
  - { id: qiyi-sail-big,            family_id: qiyi-sail,       name: "QiYi Big Sail",         scope_class: conditional,    evidence_tier: 3,   date_known: "circa 2016",   confidence: reported }
  - { id: qiyi-sail-w,              family_id: qiyi-sail,       name: "QiYi Sail W",           scope_class: core,           evidence_tier: 2,   date_known: "circa 2019",   confidence: probable }
  - { id: qiyi-qimeng-v3,           family_id: qiyi-qimeng,     name: "QiYi QiMeng V3",        scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: probable }
  - { id: qiyi-qimeng-plus,         family_id: qiyi-qimeng,     name: "QiYi QiMeng Plus",      scope_class: reference_only, evidence_tier: 2,   date_known: unknown,        confidence: reported }
  - { id: qiyi-ms-original,         family_id: qiyi-ms,         name: "QiYi MS 3x3",           scope_class: core,           evidence_tier: 2/3, date_known: "circa 2020",   confidence: probable }
  - { id: qiyi-mp-original,         family_id: qiyi-mp,         name: "QiYi MP",               scope_class: core,           evidence_tier: 3,   date_known: "circa 2021-10", confidence: reported }
  - { id: qiyi-m-pro-standard,      family_id: qiyi-m-pro,      name: "QiYi M Pro",            scope_class: core,           evidence_tier: 2/3, date_known: "circa 2023",   confidence: probable }
  - { id: qiyi-m-pro-v2,            family_id: qiyi-m-pro,      name: "QiYi M Pro V2",         scope_class: core,           evidence_tier: 2,   date_known: "circa 2024",   confidence: uncertain }
  - { id: qiyi-m-pro-elite,         family_id: qiyi-m-pro,      name: "QiYi M Pro Elite",      scope_class: core,           evidence_tier: 3,   date_known: "circa 2024",   confidence: reported }
  - { id: qiyi-valk-3,              family_id: qiyi-valk,       name: "Valk 3",                scope_class: core,           evidence_tier: 2,   date_known: "2016-08",      confidence: probable }
  - { id: qiyi-valk-3-power,        family_id: qiyi-valk,       name: "Valk 3 Power",          scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: probable }
  - { id: qiyi-valk-3-elite,        family_id: qiyi-valk,       name: "Valk 3 Elite",          scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: probable }
  - { id: qiyi-valk-3-mini,         family_id: qiyi-valk,       name: "Valk 3 Mini",           scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: probable }
  - { id: x-man-tornado-v1,         family_id: x-man-tornado,   name: "X-Man Tornado",         scope_class: core,           evidence_tier: 2,   date_known: "before 2018",  confidence: reported }
  - { id: x-man-tornado-v2,         family_id: x-man-tornado,   name: "X-Man Tornado V2",      scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: probable }
  - { id: x-man-tornado-v3,         family_id: x-man-tornado,   name: "X-Man Tornado V3",      scope_class: core,           evidence_tier: 2,   date_known: "circa 2022",   confidence: probable }
  - { id: x-man-tornado-v4,         family_id: x-man-tornado,   name: "X-Man Tornado V4",      scope_class: core,           evidence_tier: 2,   date_known: "circa 2024",   confidence: probable }
  - { id: x-man-xt3-v1,             family_id: x-man-xt3,       name: "X-Man XT3 V1",          scope_class: core,           evidence_tier: 2,   date_known: unknown,        confidence: probable }
```
