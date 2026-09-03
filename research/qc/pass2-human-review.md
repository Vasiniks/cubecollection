# Pass 2 adjudication gate — human review

**Date:** 2026-09-03 · **Baseline:** `27f402d` · **Author:** main session (Opus), synthesising
three independent Sonnet specialists working in isolated worktrees.

This is the durable decision record for the Pass 2 family layer. It is the file to read before
opening Pass 3.

**Companion reports** (each written independently, in its own lane, before synthesis):

| File | Author | Lane |
|---|---|---|
| `pass2-taxonomy-challenge.md` | research-qc | challenge boundary decisions |
| `pass2-source-independence.md` | source-auditor | evidence quality and independence |
| `pass2-entity-identity.md` | manufacturer-researcher | primary-source entity questions |
| `pass2-structural-audit.md` | main session | whole-archive structural queries |

---

## Executive conclusion

> **BLOCKED for QiYi and X-Man Design. READY AFTER MINOR CORRECTIONS for everything else.**

The 122-family layer is, in the main, unusually disciplined work: multi-source corroboration
where it matters, honest flagging of judgement calls, no placeholder families, clean referential
integrity, and a consistent refusal to resolve ambiguity silently. Ten of the eleven issues
originally on the worklist survived review or were resolved outright.

**One finding blocks a defined subset.** `data/sources/theqiyi-about-us.yml` is recorded
`kind: manufacturer_official` — deriving to **tier 1**, the archive's strongest evidence class —
but `theqiyi.com` carries an Amazon Associates affiliate disclosure in its own footer, has no
ICP filing, no contact address and no native checkout. It is an affiliate site presenting itself
in QiYi's name. Six `confirmed` attestations depend on it with no other tier-1 support, including
**QiYi's founding year and the entire "family of brands" statement that establishes X-Man Design
as a sub-brand**.

That is a contained blast radius — **11 families across QiYi and X-Man Design** — not an
archive-wide failure. The other **111 families are unaffected and can proceed** once the
confidence-policy decision below is taken.

**One policy decision is required before Pass 3, and only you can take it** (§ Critical decision).

---

## Verified counts

Obtained from the repository, not from prior summaries.

| Entity | Count | Note |
|---|---|---|
| entities | 54 | 38 manufacturer · 11 sub_brand · 5 service |
| families | 122 | all `status: drafted` |
| models | 48 | gan 40 · monster-go 5 · swift-block 3 |
| variants | 104 | gan 92 · monster-go 8 · swift-block 4 |
| sources | 284 | +1 created during this gate |
| people / events | 2 / 3 | |

**Models and variants are unchanged from `27f402d`.** No Pass 3 work occurred.
**111 of 122 families have zero models** — that is the size of the Pass 3 queue.

---

## Critical decision required — 111 attestations vs. the archive's own rule

**111 attestations (107 `reported`, 4 `probable`) rest solely on tier-4 sources**, across ~53
families; 32 are `/introduced` fields. Two independent methods converged on this number.

It contradicts two written rules:

- `vocab/confidence.yml`: `reported` = *"**Tier 3** source, uncontradicted and plausible."*
- `RESEARCH_SPEC.md` line 103: tier 4 *"Corroborates only. **Never establishes.**"*

Almost all of these cite the Speedsolving.com per-manufacturer product-history pages, which
derive to tier 4 via `kind: wiki`.

**Two defensible resolutions, leading to materially different archives:**

| | Option 1 — downgrade | Option 2 — reclassify the source |
|---|---|---|
| Action | move all 111 to `uncertain` | set those specific wiki pages to `tier: 3` via the existing per-source override |
| Faithful to | the rules exactly as written | RESEARCH_SPEC's own tier-3 wording, *"long-form community documentation"* |
| Cost | ~53 families lose standing; ~¼ of dates become explicitly weak | requires justifying that these pages are not *"unattributed wikis"* |
| Data changed | 111 attestations | none |

**Recommendation (offered, not applied): Option 2, scoped narrowly** — per source record, with an
individual written justification, **never** as a blanket rule for `kind: wiki`. A short
unattributed stub genuinely is tier 4 and that distinction must survive. Note that Option 2 does
**not** dissolve the S1 backlog below: promoting a tier does not create corroboration.

---

## Confirmed decisions — survived review

- **`gan-flagship-series`** grouping GAN11–GAN17 as one persistent family: **upheld.** Supported
  by GAN's own two-domain, two-language navigation. Numeric change alone was correctly treated as
  non-decisive.
- **`gan-v100` excluded from the flagship lineage: upheld**, on Chinese-site placement under
  磁力系列 but not 旗舰魔方 (on a page listing GAN16 Maglev under both), retailer copy naming GAN16
  as "the flagship", and the Aug-2026 nav. *One evidence point was demoted* — see Corrections.
- **Monster Go and Swift Block as GAN sub-brands: upheld**, on an ICP-filing-number match — the
  strongest corporate evidence in the archive.
- **LimCube → FangShi: upheld**, clean two-retailer independence.
- **CubeStyle's plain-vs-decorated split: upheld** and independently re-verified.
- **Maru remains `kind: manufacturer`** — its four cube families are genuine, independent designs.
- **The 22 generic `<maker>-3x3` families are not placeholders** — each documents a real
  "unnamed-beyond-the-brand" base product.
- **Referential integrity: clean** — 0 broken `manufacturer_id`, 0 broken `successor_family_id`,
  0 name collisions, 0 orphan `family_id` on models.
- **No circular corroboration anywhere.** Cross-publisher shingle-matching of every excerpt pair
  found only 2 overlaps, both benign and both already held at low confidence.

---

## Corrections applied during this gate

All narrow, evidence-decisive, and leaving validation green. None altered taxonomy.

| # | Record | Change | Basis |
|---|---|---|---|
| 1 | `speedsolving-wiki-eastsheen` | excerpt extended | quoted sentence was missing from the preservation |
| 2 | `gan-354` `/introduced` | `probable` → `uncertain` | rested on the catalogue-migration artifact |
| 3 | `gan-354-m` `/announced` | `probable` → `uncertain` | same artifact, inside the built model layer |
| 4 | `dayan-panshi` `/introduced` | `confirmed` → `probable` | its own note disowned the claim |
| 5 | `gan-v100` | caveat added | label relied on here, dismissed as noise elsewhere |
| 6 | `thecubicle-products-lanlan-prefix-2026` | **created** | evidence closing the LanLan gap |

**On correction 1 — a reported finding was downgraded after verification.** The taxonomy review
reported that *"East Sheen does not produce 3x3 cubes"* — quoted three times — does not appear in
the cited source's preserved excerpt. True. But fetching the live page showed **the sentence is
genuine and verbatim**. So this was a *preservation gap*, not a fabricated quotation. The
distinction is not pedantic: fabrication is the one thing PRODUCT.md forbids outright, and
reporting it as such would have badly misstated the layer's health. The omitted text is also the
strongest evidence *against* the archive's own `eastsheen-3x3` family — the gap worked against
the archive's interest, which is sloppiness, not motivated reasoning.

**On corrections 2–3 — the artifact is now proven, not asserted.** `Added: 2018-09-11` occurs
**29 times across 22 sources and 13 unrelated brands**. Nine records cite it; **seven already
held it correctly at `uncertain`** and say the field is deliberately unused. Only the two written
*before* the artifact was discovered were contaminated. The 2018 values were retained as weak
upper bounds rather than deleted.

**On correction 4 — and a mistake avoided.** `dayan-panshi` asserted `confirmed` while its own
note admitted the tier-1 source was *"not an independent confirmation of"* the date. Rule 9
passed **structurally** (a tier-1 source is cited) but not **substantively** (it doesn't carry
the claim) — no toolchain can test that. Sweeping for the same shape found only **5 instances,
and 4 are sound** (`mfjs`, `moyu`, `x-man-design`, `lanlan` have tier-1 sources genuinely
carrying their claims). A mass-downgrade would have damaged four correct records.

---

## Adjudication matrix

| Issue | Current state | Evidence for | Evidence against | Recommended state | Confidence | Downstream impact |
|---|---|---|---|---|---|---|
| **`theqiyi-about-us` provenance** | `kind: manufacturer_official` → tier 1 | title/publisher claim to be QiYi | Amazon affiliate disclosure in footer; no ICP; no checkout; © 2025; wiki gives a different domain and "unknown" founding | **Re-kind / `tier: 4` override; re-source 6 confirmed attestations** | **High** | **CRITICAL** — 11 families; QiYi founding + X-Man sub-brand status |
| **111 tier-4-only attestations** | `reported`/`probable` | consistent, plausible, uncontradicted | contradicts `vocab/confidence.yml` and RESEARCH_SPEC §103 | **Human decision — Option 2 recommended** | **High** (that a rule is broken) | **CRITICAL** — ~53 families |
| **21 families on a lone tier-4 source** | admitted, mostly `reported` | products are real | tier 4 "never establishes"; no corroboration at all | **Corroboration backlog before/with Pass 3** | High | High — 17% of layer |
| **`qiyi-valk` → `qiyi`** | `uncertain` | wiki lists Valk and XMD as *parallel* sub-brands; 2018 `qiyicube.com` storefront titles them coordinately | current about-us omits Valk — **but that page is the affiliate site** | **Keep `qiyi`; raise to `probable`** after S15 fix | Medium | High — Pass 3 models inherit `manufacturer_id` |
| **`diansheng-mscube`** | `uncertain`/`reported` | DianSheng's **own homepage** lists "MSCUBE旗舰魔方" as its own category and MS3X among its products; no independent MsCube company or domain exists | original wiki sentence uncorroborated; attribution baked into an immutable id | **DianSheng product line; raise to `probable`** | Medium-High | Medium |
| **`eastsheen-3x3`** | `reported` | a durable retailer listing | wiki denial now verified structurally complete; it is the *only* 3x3 across two retailers' full Eastsheen catalogues, with no plain sibling | **Hold at `reported`; preserve the contradiction** | Unresolved | Medium |
| **Kokonotsu / "Molecube"** | lead only, no relationship | customer-review resemblance | no citable Molecube entity; `molecube.com` is parked | **Record no relationship** | Unresolved | Low |
| **Maru ontology** | `kind: manufacturer` | 4 genuine own designs | 6 real DIY core-kit SKUs for other makers' cubes | **Keep `manufacturer`; do NOT model the kits** — schema gap | High (facts) / Unresolved (ontology) | Medium — Pass 3 must not invent a slot |
| **Z-Cube** | `manufacturer`, 0 families | thin genuine own line c.2015–16 | large decorator/rebrand catalogue from ~2019; template match to CubeStyle's Warrior W rebrand | **Hybrid, time-varying — needs a `kind` that can express change over time** | Medium | Medium |
| **CubeStyle** | 1 family | plain 3x3 is brand-of-record | decorated ones are QiYi Warrior W / YJ GuanLong | **Split upheld; `rebrand_of` at Pass 3/4** | High | Low |
| **MoYu labels** (`mojue`, `mohuanshousu`, `senhuan`, `yancheng`) | `sub_brand`, `uncertain` | MoYu's own site lists them among house names | `kind` asserted from an SEO title tag + single-retailer slug pattern; stronger evidence sits unpropagated in child families | **Hold `uncertain`; propagate child evidence; do not upgrade on retailer copy** | Low-Medium | Medium |
| **GAN 356 / i / i-carry boundary** | 3 families | smart line arguably its own lineage | 6 models *named* "GAN 356" sit outside `gan-356`; numeric identity treated as decisive here, non-decisive for flagship | **Adjudicate and write the rule down** | Unresolved | **High — 22 built models** |
| **LanLan zero-family** | 0 families | **sweep run this gate: 59 slugs, no standard 3×3** | — | **Confirmed A** | High | None — closed |

---

## Zero-family audit (A/B/C/D)

**A** no in-scope 3×3 found · **B** products belong to another entity · **C** out of scope ·
**D** evidence insufficient

| Entity | Class | Basis |
|---|---|---|
| `lanlan` | **A** | **Resolved this gate.** 99 captures, 59 slugs, list not truncated; every "3x3" slug is a shape mod, gear cube, 3x3x2 or 1x3x3 |
| `zcube` | **B** | catalogue is others' cubes magnetised/restickered; belongs under the original maker per §4.3/4.4 |
| `verypuzzle` | **C** | Slip 3x3 / Clover Cube fail conditional admission |
| `limcube` | **C** | catalogue is 2×2 / Skewb / 10×10-based |
| `xinlexin` | **C** | Baibian Mowang is a Magic Snake; **first-party sourced** |
| `hellocube` | **C** | Gear/Mirror/Flat only, corroborated at two retailers |
| `cubetwist` | **C** | shape mods and DIY kits; the B-prior was tested and rejected |
| `ninja` | **C** | Ghost Cube variants, corroborated at two retailers |

**No D remains.** LanLan was the only genuine D-as-A risk and is now closed with preserved
evidence. Note `zcube` is the sole **B**, which is why its `kind` is under review.

---

## Source-independence findings

- **No circular corroboration.** Only 2 excerpt overlaps corpus-wide, both benign.
- **Preservation is structurally sound** — no `preservation_method: none`, no missing
  `archive_url` where required.
- **`theqiyi-about-us`** — the one true provenance failure (above).
- **Excerpt-vs-claim mismatch:** `dayan-panshi` (fixed). The general lesson: rule 9 tests
  *presence* of a tier-1 source, never whether it *supports the sentence*.
- **Latent trap:** `rubiks-com-classic-special-editions-2024` bundles six product pages under one
  id but archives only one URL. Harmless at present use; must be split before Pass 3/4 cites it
  per-product.
- **Excerpt-only sources carry hidden exposure.** Where `preservation_method: excerpt` and there
  is no `archive_url`, the excerpt *is* the evidence — anything on the page but not captured is
  unsupported. This is exactly how the Eastsheen gap arose.
- **Verified strong evidence:** GAN's Chinese-domestic technology-history page; the
  Monster Go / Swift Block ICP-filing match; LimCube/FangShi two-retailer independence.

---

## Schema gaps — genuinely affecting modelling

1. **Accessory kits that fit another maker's cube have no home.** Maru's 6 core-kit SKUs are not
   cubes (so not families/models/variants) and involve no work on a sold unit (so not a `service`
   block or `modified_from`, both of which presuppose a specific base variant). **Proposed future
   change, not applied:** an `accessory` entity, or an explicit "out of model scope, recorded in
   manufacturer notes" policy. Pass 3 must not improvise a slot.
2. **`kind` cannot express a relationship that changes over time.** Z-Cube was plausibly a real
   manufacturer c.2015–16 and predominantly a decorator from ~2019. One scalar `kind` forces a
   false choice. Same shape as the known F2/F4 time-varying-positioning issue.
3. **No `kind` value for "corporate structure unresolved".** Four MoYu labels sit at
   `kind: sub_brand` + `confidence: uncertain`, which reads as more settled than the evidence is.
4. **`scope_class` is correctly a model/variant field, not a family field** — *this is not a gap*.
   Checked explicitly; the deferrals to Pass 3/4 are right by design. But 9 wholly non-WCA
   families will each need `scope_class` + `scope_justification` + a tier 1–3 source at Pass 3.
   Eight can satisfy it; **`mf8-crazy-3x3x3` cannot** and will fail rule 15.

---

## Pass-3 hazards — read before enumerating

1. **Do not enumerate QiYi or X-Man Design families** until `theqiyi-about-us` is resolved.
   Models inherit `manufacturer_id` by construction; building on a disputed attribution means
   systemic re-parenting later, not a field edit.
2. **Write down the GAN 356 / i / i-carry rule before creating another GAN model.** 22 models are
   already filed by an unstated and internally inconsistent rule.
3. **`mf8-crazy-3x3x3` will hard-fail rule 15.** Get a tier 1–3 source first.
4. **Do not file a model under a generic `<maker>-3x3` family merely because its name is
   unknown.** These 22 buckets will silently absorb unrelated products otherwise.
5. **Do not invent an ontology for Maru's core kits.** Decide the policy first.
6. **Do not upgrade MoYu sub-brand relationships on retailer copy.** Retailer taxonomy is not
   corporate structure.
7. **Take the tier-4 decision first.** Enumerating models beneath 53 families whose confidence
   basis is about to change means redoing the attestations.

---

## Unresolved — deliberately left open

- **Eastsheen 3×3** — did Eastsheen ever sell a standard 3×3, and was it an OEM/rebrand? The one
  listing is the only 3×3 across two retailers' full Eastsheen catalogues and has no plain
  sibling, unlike every other Eastsheen size. Suspicious; unresolved. **Preserve the
  contradiction.**
- **Kokonotsu / Molecube** — no citable entity found. Record nothing. `twistypuzzles.com` (HTTP
  403 to automated fetch) is the outstanding lead, reachable by browser.
- **Maru core-kit ontology** — facts established, representation undecided.
- **Z-Cube's `kind`** — genuinely time-varying.
- **GAN 356 / i / i-carry boundary** — needs a stated rule.
- **QiYi's real domain and founding year** — currently unsupported.

---

## Priority ranking

**Critical** — blocks Pass 3 for the named scope
1. `theqiyi-about-us` provenance + the 6 dependent `confirmed` attestations *(QiYi, X-Man Design)*
2. The 111 tier-4-only attestations *(policy decision, ~53 families)*

**High**
3. GAN 356 / i / i-carry boundary rule *(22 built models)*
4. 21 families on a lone tier-4 source *(corroboration backlog)*
5. `qiyi-valk` attribution *(re-assess after #1 — likely strengthened)*

**Medium**
6. `diansheng-mscube` → DianSheng product line, `probable`
7. MoYu label relationships — propagate child evidence, hold `uncertain`
8. `mf8-crazy-3x3x3` tier 1–3 source before Pass 3
9. Z-Cube `kind` / time-varying representation
10. `rubiks-com-classic-special-editions-2024` bundle split

**Low**
11. Eastsheen — hold and preserve
12. Kokonotsu — record nothing
13. `gan-357` missing `positioning`; 3 MoYu families likewise
14. `successor_family_id` used inconsistently (navigational only)
