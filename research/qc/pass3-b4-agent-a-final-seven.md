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

(sections 3-7 to follow)
