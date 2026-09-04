# Pass 3, batch 4, Agent A — the final seven zero-model families

Written live, one section per family in the order worked. Binding references: the S6 policy
(`research/qc/pass3-admission-policy.md`), DATA_MODEL §1.4/§4.2/§4.3/§4.4, `schema/model.schema.json`,
RESEARCH_SPEC §3.6a. House style followed: `data/models/moyu/moyu-weilong-gts.yml` and, for the
thin single-model cases in this lane specifically, the Agent D KungFu precedent
(`data/models/kungfu/kungfu-qinghong-3x3.yml`, `kungfu-longyuan-3x3.yml`, `kungfu-dot-cube-3x3.yml`)
and the Cube4You precedent (`data/models/cube4you/cube4you-3x3-standard.yml`).

Classification key used throughout: **accepted model** · **candidate** (interesting,
insufficient) · **rejected** (shown not distinct) · **zero-model finding**.

---

## 1. `cubestyle-3x3` — accepted, one model

**Search performed.** Re-ran a `thecubicle.com/products/cubestyle*` Wayback prefix sweep (this
pass; confirms the family record's own sweep) — exactly one plain-3x3-shaped URL
(`cubestyle-3x3`), two captures (2024-05-30, 2025-03-16), no V2/second-generation naming
anywhere. Fetched the full archived page (not just the existing source's excerpt) and found its
"Product Specifications" table, previously unquoted: `Dimensions: 56.0mm³ / Gross Weight: 82g /
Item Weight: 73.6g`. Checked two non-US/English retailers directly (§3.6a requirement): **Cubelelo**
search for "cubestyle" (574 generic results, no CubeStyle-branded product) and **Cubezz.com**
search for "cubestyle" ("Total 0 records") — both swept, both negative, recorded.

**Accepted:** `cubestyle-3x3-standard` — "CubeStyle 3x3". Existence: tier 2
(`thecubicle-cubestyle-3x3`), `probable` per the ladder (single tier 2, nothing contradicting —
recorded `reported`/`probable` per field, see the record). Identity: sole model, no boundary
question since there is only one candidate design. Specs: `size_mm: 56.0` at `probable` (tier 2
spec table); `weight_g` deliberately left unset — the table gives both a Gross Weight (82g,
likely packaging-inclusive) and an Item Weight (73.6g) with no way to confirm which, if either,
is the naked cube's weight, the same ambiguity Agent D resolved the same way on the KungFu
models. Generation: `unknown` (no version found). Released: `unknown` — the page's own `Added:
2018-09-11` is the documented 13-brand catalogue-migration artifact and is explicitly not used.

**Rejected as part of this family (not created here at all, confirmed correct per the frozen
family record):** CubeStyle Carbon Fiber 3x3 and CubeStyle [Hollow Sticker] 3x3 — both name a
specific base cube directly (QiYi Warrior W / YJ GuanLong) in their own retailer copy and belong,
per DATA_MODEL §4.3, under those manufacturers' own model trees as aftermarket/serviced
products, not under CubeStyle. No action taken on QiYi/YJ trees (out of this lane's write scope);
flagged again here as a live cross-manufacturer lead for whoever researches QiYi's Warrior W and
YJ's GuanLong model trees.

**§3.6a record.** Retailer `/products/` prefix sweep: done (thecubicle.com, re-confirmed).
Non-US/English retailer: Cubelelo and Cubezz, both checked, both negative — recorded above.

**Sources used:** `thecubicle-cubestyle-3x3` (existing, reused, not overwritten — its full
archived page content was read directly rather than editing the source record's excerpt field).
No new source created.

---

## 2. `guojia-type-a-chun` — accepted, two models

**Search performed.** `thecubicle.com/products/type-a-chun*` and `.../guojia*` Wayback prefix
sweeps — the *only* GuoJia-branded 3x3-relevant URL anywhere in this pass's sweeps is
`type-a-chun2-diy-kit`; no dedicated "Chun1" URL exists at TheCubicle. Checked two non-US
retailers directly: Cubelelo search "guojia" (no GuoJia products of any kind; 42 unrelated
results) and Cubezz.com search "guojia" ("Total 0 records") — both negative, recorded.

**Boundary call.** The Chun2 page's own disclaimer names "Type A Chun1" as a real predecessor
product and describes a genuine hardware difference: Chun1's steel edge parts do not perfectly
fit Chun2 ("still fit, but glue may be required to hold all of the steel pieces in place") —
i.e. the steel-part tooling itself differs between the two, not merely a sold configuration.
Per DATA_MODEL §4.2 this is a design/hardware difference, not an assembly-time choice, so **two
models**, connected by `succeeds`, rather than one model with two "versions." This is a genuine
edge case: the *only* evidence for Chun1 is one incidental sentence on Chun2's own page. Per the
policy ("where corroboration is unavailable but existence is genuinely established, create the
record with uncertain/reported confidence — do not inflate, and do not discard") Chun1 is
admitted, not discarded, at deliberately weak confidence throughout.

**Accepted:**
- `guojia-type-a-chun2` — "GuoJia Type A Chun2". Existence/identity: tier 2 (`thecubicle-guojia-
  type-a-chun2-2020`), `reported`. Specs: left entirely unset — the source's only figure is a
  lone `Gross Weight: 103g` on a DIY-kit listing with no companion Item Weight and no
  dimensions, judged not confidently the assembled cube's net weight. Released: `unknown` — the
  page's own `Added: 2018-11-07` is flagged in the frozen family record as a *suspected* (not
  proven) catalogue artifact and is not used.
- `guojia-type-a-chun1` — "GuoJia Type A Chun1". Admitted on S6 class-2 existence alone from the
  single incidental Chun2-page sentence. `confidence: uncertain` on its own description (weaker
  than Chun2's `reported`, since the sentence was not written to describe Chun1 itself). All
  specs and dates unset. `generation.basis: community_convention` on both models — the
  retailer, not GuoJia itself, is the source of the numbered pair; no tier 1 GuoJia-own-voice
  confirmation of the numbering was found this pass, and this is stated explicitly rather than
  blurred into `manufacturer_declared`.

**§3.6a record.** Retailer prefix sweep: done. Non-US/English retailer: Cubelelo and Cubezz,
both checked, both negative — recorded above.

**Sources used:** `thecubicle-guojia-type-a-chun2-2020`, `thecubicle-guojia-manufacturer-filter-2021`
(existing, reused). No new source created.

---

## 3. `haitun-waverider` — accepted, two models. One escalation.

**Search performed.** Re-ran a `thecubicle.com/products/haitun*` prefix sweep (confirms the
family record: V1 Flagship/Standard/Limited-Edition/adjustment-tool, V2
Standard/Pioneer/Flagship/Ultimate, no V3). Fetched full archived pages for V1 Flagship, V1
Standard, V2 Standard, V2 Ultimate, V2 Flagship, and V2 Pioneer directly (not just existing
sources' excerpts) specifically hunting for a dimensions figure, since none of the V2 sources
already in the archive quote one. **Non-US retailer check: Cubezz.com**, searched for "haitun" —
found, and fetched, a Waverider V2 Standard listing giving `56x56x56mm` (the only dimension
figure found for V2 at all) and, unexpectedly, a **second HaiTun product line, "ZhanLang"**
(Standard/Flagship, tier 2, `Manufacturer: HAITUN CUBE`) not represented by any family record in
this archive — see Escalations below.

**Boundary call — the task's own framing verified.** TheCubicle's V2 Standard page states
directly: "the highly anticipated second generation from boutique manufacturer HaiTun" — a
genuine generation claim, not a bare version-number coincidence, satisfying the manufacturer-
declared-generation identity test cleanly. **Two models**, `haitun-waverider-v1` and
`haitun-waverider-v2`, connected by `succeeds`. Within each generation, the configuration tiers
(Flagship/Standard/Limited Edition for V1; Standard/Pioneer/Flagship/Ultimate/the Cubezz-only
"Supreme Edition" for V2) are variants — sold options with different magnet counts, not
different tooling — left to pass 4.

**Accepted:**
- `haitun-waverider-v1` — `generation.basis: manufacturer_declared`, `probable` (the V1/V2
  naming is the product's own name throughout, read as passed through from HaiTun). Specs:
  `size_mm: 56.0`, `probable`, corroborated identically across two configuration tiers
  (Flagship 219g gross/82.0g item; Standard 218g gross/81.0g item — both 56.0mm³) — weight left
  unset at model level since it visibly differs by configuration.
- `haitun-waverider-v2` — same generation-basis reasoning, `probable`. Specs: `size_mm: 56.0`
  at `probable`, sourced *only* from the new Cubezz listing since no TheCubicle V2 capture
  checked this pass states a dimension at all — flagged plainly as single-source. `succeeds`
  `haitun-waverider-v1`.

**Dates — a deliberate divergence from the frozen family record, flagged explicitly.** The
frozen family record (written before the S6 policy existed) treats TheCubicle's own `Added:`
field as a `reported`-confidence per-product date for V1's `introduced`, reasoning it is not
one of the three specifically-documented catalogue-migration artifact strings. The S6 policy
(binding for this pass) is categorical — *any* retailer `Added:` field is inadmissible as a
release date, not only the three named strings. Both models here leave `released` `unknown`
rather than import the family record's now-superseded reading, and each model's attestation
says so explicitly rather than silently diverging.

**Escalation — likely missing family.** Cubezz.com carries a distinct HaiTun product line,
"HAITUN ZhanLang V1" (Standard $15.99 / Flagship $18.99, `Manufacturer: HAITUN CUBE`,
`56x56x56mm`/79g on the Standard listing), with product IDs (7600/7601) numerically well below
the Waverider V2 IDs found on the same site (8597-8599) — suggestive of an earlier or parallel
line, not investigated further since family creation is frozen for this lane. **No family or
model was created for ZhanLang.** Preserved as `cubezz-haitun-zhanlang-v1-standard` (source
only) for a future family-enumeration pass to action. This is not a taxonomy *error* (nothing
here is mis-assigned) but a probable taxonomy *gap* — recorded per the same "record evidence,
stop the branch, escalate" instruction.

**§3.6a record.** Retailer prefix sweep: done (re-confirmed). Non-US/English retailer: Cubezz,
checked, positive (V2 dimensions + the ZhanLang escalation) — recorded above.

**Sources used:** `thecubicle-haitun-waverider-v1-2024`, `thecubicle-haitun-waverider-v2-
standard-2026`, `thecubicle-haitun-waverider-v2-ultimate-2026` (existing, reused). **Sources
created:** `thecubicle-haitun-waverider-v1-standard-2024`, `cubezz-haitun-waverider-v2-standard`,
`cubezz-haitun-zhanlang-v1-standard`.

---

## 4. `lefun-3x3` — accepted, one model

**Search performed.** Re-ran the `thecubicle.com/products/lefun*` prefix sweep (119 URLs,
confirms the family record). Specifically targeted the two "V2"-suffixed print themes flagged
by the family record as unresolved (Periodic Table 3x3 V2, and by pattern Christmas 3x3 V2) to
test whether "V2" here means a mechanism generation or a print revision — fetched Periodic
Table 3x3 V2 in full: "a standard, non-magnetic 3x3 with different elements on each face,"
56.0mm³/79g, no mechanism claim of any kind. **Non-US retailer check:** Cubelelo ("lefun" — 74
generic results, no LeFun-branded product) and Cubezz ("lefun" — "Total 0 records"), both
negative, recorded.

**Boundary call.** Confirms, rather than assumes, the frozen family record's own one-base-mould
reading: four listings fetched in full this pass (Formula, Sudoku, Calendar, Periodic Table V2)
all describe "a standard, non-magnetic 3x3" differing only in printed face content. **One
model**, `lefun-3x3-standard`.

**Accepted:** `lefun-3x3-standard` — "LeFun 3x3". Existence/description: `reported` (four tier
2 sources agreeing on the generic base-mould framing). **Specs left unset**, and this is worth
stating plainly rather than glossing over: the four listings actually checked do not agree on
dimension (55.5mm³ on Formula vs 56.0mm³ on the other three) — read as ordinary retail
rounding/tolerance noise on one mould, consistent with the family record's own reasoning, but
not confidently a single shared value, so no `size_mm` default is recorded. Weight similarly
varies by theme and is left unset. Generation and released both `unknown`.

**§3.6a record.** Retailer prefix sweep: done (re-confirmed). Non-US/English retailer: Cubelelo
and Cubezz, both checked, both negative — recorded above.

**Sources used:** `thecubicle-lefun-formula-3x3`, `thecubicle-lefun-sudoku-3x3-2022`,
`thecubicle-lefun-calendar-cube-3x3-2026` (existing, reused). **Source created:**
`thecubicle-lefun-periodic-table-3x3-v2-2024`.

---

## 5. `moretry-tianma-x3` — accepted, five models. Genuine, disclosed uncertainty on two of them.

**Search performed.** Re-ran the `thecubicle.com/products/moretry*` prefix sweep (26 URLs,
confirms and extends the family record) and fetched, in full, every version-numbered page not
already cleanly quoted in an existing source: V2 (Enhanced), V3 Plus, and a Triple-Track
Magnetic Frosted "X3+" configuration page. **Non-US retailer check:** Cubezz ("moretry" — three
base-line magnet-tier listings, no "+") and **Cubelelo** ("moretry" — found a **ZCube Edition**
listing, a plain **"MoreTry Tianma X3 (Frosted)"**, and, independently, a **"MoreTry Tianma X3+
(Frosted)"** at a separate URL/price) — both positive and directly useful for the model
boundary below, recorded.

**Boundary calls, the hard case in this lane.**

1. **V1, V3 (Snap), V4 (MagLev) — confirmed, described mechanism progression**, already
   established by the frozen family record and re-verified here: V1 (plain corner/edge
   magnets) → V3 (adds enlarged corner base magnets + a repelling centre-magnet system) → V4
   (replaces the spring entirely with a 6-ring MagLev system). All three share an identical
   55.5mm³ shell dimension across every listing checked. Three models, chained by `succeeds`.

2. **V2 (Enhanced) — admitted on existence alone, at deliberately weak confidence.** The only
   capture found under its own URL is internally contaminated: the body text is verbatim the
   V4 listing's copy, with "Moretry Tianma X3 V2 3x3 (Enhanced)" appearing only inside a
   bundle-contents list. This is the exact templating/redirect artifact the frozen family
   record already flagged and declined to use — re-confirmed, not newly discovered, this pass.
   Per S6 §4 ("create the record with uncertain/reported confidence — do not inflate, and do
   not discard"), V2 is admitted on the bundle-mention alone (S6 class 2), with everything else
   — description, specs, date, even the strength of its `succeeds` link to V1 — left at
   `uncertain`. This is the thinnest model admitted in this lane.

3. **"TianMa X3+" — admitted as its own model on an explicit tooling claim, not on the "+"
   naming.** TheCubicle's own copy: "The Moretry Tianma X3+ is a more refined version of the
   original X3. This one has magnet capsules that are easier to install, **more precise molds**
   that make turning quieter and more predictable." Per DATA_MODEL §4.2 ("if the internal
   geometry differs, it is a different design regardless of marketing"), "more precise molds"
   is direct tooling-level identity evidence — the clearest single sentence in this family for
   a model split, stronger than the numbered-V hardware differences alone would have been.
   Cubelelo independently sells "MoreTry Tianma X3+ (Frosted)" and a plain "MoreTry Tianma X3
   (Frosted)" as two separate listings, corroborating that a second retailer also treats X3 and
   X3+ as distinct products. A customer review on the X3+ page reports retaining V4's MagLev
   centre system when modifying an X3+ unit — used, at `uncertain` confidence (informal
   testimony, not retailer copy), as the sole basis for a `succeeds` link to V4 specifically
   rather than V1 or V3. **Left genuinely open, not resolved by guesswork:** the X3+ page's own
   title is "Moretry Tianma X3+ **V3** 3x3," raising the unanswered question of whether "+" is
   its own versioned sub-line (with unfound +V1/+V2/+V4 siblings) rather than a single flat
   model — stated as an open question in the model record itself.

**Rejected as models (correctly treated as variants, not investigated further):** the "Limited
Edition" configuration of V3; the Single/Double/Triple-Track Magnetic Frosted and UV-coated
configurations of X3+; the "ZCube Edition"/"SAOCube SE"/"SAOCube Special Edition"
collaborations on both the base line and X3+ — all are DATA_MODEL §4.1 configuration/
collaboration-status differences (magnet architecture, coating, collaboration status), not
tooling differences, and were confirmed by spot-checking their own thin/templated product
copy to carry no mould or mechanism claim.

**Dates.** All five models leave `released` `unknown`. Every "Added:" field found across this
family (2022-03-14 on V1/V3/V4 identically regardless of version; 2024-09-09 on X3+) is
categorically inadmissible under the S6 policy §3, and the V1/V3/V4 date's own cross-version
identity is independently suspicious on its own terms (already flagged by the family record as
a likely brand-onboarding artifact).

**§3.6a record.** Retailer prefix sweep: done (re-confirmed, extended). Non-US/English
retailer: Cubezz and Cubelelo, both checked, both positive and load-bearing on the model
boundary — recorded above.

**Sources used:** `thecubicle-moretry-tianma-x3-v1-2023`, `thecubicle-moretry-tianma-x3-v3-
snap-2022`, `thecubicle-moretry-tianma-x3-v4-maglev-2022` (existing, reused). **Sources
created:** `thecubicle-moretry-tianma-x3-v2-enhanced-2023` (contaminated capture, documented as
such), `thecubicle-moretry-tianma-x3-plus-v3-2025`, `cubelelo-moretry-tianma-x3-plus-frosted`,
`cubezz-moretry-tianma-x3-magnetic-variants`.

---

(sections 6-7 to follow)
