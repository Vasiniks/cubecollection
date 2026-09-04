# Pass 3/4 edge-case remediation — FangShi taxonomy investigation (Agent B)

Branch `b4-b`. Taxonomy investigation only — no family, model, or variant records created,
renamed, merged, split, or re-parented. Families remain frozen at 122; variants at 104.

---

## 1. The claim

Batch 3's historic-makers lane (`research/qc/pass3-b3-agent-b-historic.md`, "Escalation —
recorded, not acted on"):

> **FangShi GuangYing and FangShi JieYun are real, separately-named, currently-documented
> 3x3x3 product lines with no frozen family.** The same cubezz.com sweep that found ShuangRen
> II also surfaced "Funs Puzzle GuangYing 3x3x3 Speed Cube" and "Funs Puzzle JieYun 3x3x3 Speed
> Cube" (57mm, plus a 54.6mm "Mini JieYun") as product lines independent of ShuangRen entirely.
> TheCubicle independently carries the same two names under `/products/fangshi-guangying*` and
> `/products/fangshi-jieyun*`... **No family exists for either. No model was built for either
> name. This is a gap for human review**

Restated as a question: does the 122-family taxonomy have a real gap at FangShi, and if so,
what exactly is missing?

---

## 2. Evidence gathered

### 2.1 First-party / manufacturer-adjacent

No independent FangShi/Funs Puzzle official domain has ever been located in this archive
(`data/manufacturers/fangshi.yml`: "No FangShi- or Funs-branded official domain was located
this pass; `fangshi.net` is confirmed unrelated, a domain-parking page"). This investigation
did not find one either — no first-party manufacturer source exists for FangShi at all, for
any of its products, which sets the evidentiary ceiling for this whole manufacturer at tier 2
(retailer) and tier 4 (wiki). This is a pre-existing, structural limitation of this
manufacturer's record, not something new found here.

### 2.2 TheCubicle (tier 2, US retailer)

CDX prefix sweep `thecubicle.com/products/fangshi*` — **61 distinct URLs, complete (not
truncated at any limit)**. Full catalogue of every FangShi-attributed product TheCubicle has
ever listed. Grouped:

- ShuangRen: `fangshi-shuangren`, `-diy-kit`, `-v2`, `-v2-diy-kit` (4 URLs)
- **GuangYing: `fangshi-guangying`, `-diy-kit` (2 URLs)**
- **JieYun: `fangshi-jieyun`, `-unstickered` (2 URLs)**
- ShiShuang / XingYu 2x2 (3 URLs) — not 3x3, out of scope for this investigation
- `fangshi-mini-6x6` (1 URL) — not 3x3
- `fangshi-57-54-6mm-core` / `-hardware` (2 URLs) — spare-parts listings, not standalone
  products (the 57mm/54.6mm split matches ShuangRen's own two documented sizes)
- Everything else (≈47 URLs): `fangshi-limcube-*`, `fangshi-ghostz-cube`,
  `fangshi-kaleidoscope-hex-prism` — all shape mods, already resolved as the `limcube`
  sub-brand (`data/manufacturers/limcube.yml`, `parent_id: fangshi`, `kind: sub_brand`,
  `confirmed`)

**No GuangYing II / V2, no JieYun II / V2, and no other 3x3 name were found anywhere in this
sweep.** This is the decisive negative-evidence sweep for "did pass 2 miss anything beyond
these two": at this retailer, for FangShi 3x3 speed cubes specifically, the complete set is
ShuangRen (2 generations), GuangYing (1), JieYun (1).

**GuangYing** (`thecubicle-fangshi-guangying`, new source, archive_url
`20201108112458`): "The FangShi GuangYing is now available! It features an assembly similar to
that of the FangShi ShuangRen, but with some major differences in the pieces that are widely
expected to make it perform even better than the FangShi ShuangRen." Spec table: Manufacturer
FangShi, Type 3x3, Gross Weight 95g, Dimensions 57.0mm. $14.99, 7 colourways, discontinued at
capture. A customer review contrasts "the shuangren and the shuangren v2" against "the
guangying" as separate, successive products.

**JieYun** (`thecubicle-fangshi-jieyun`, new source, archive_url `20200923001744`): "The
FangShi JieYun is now available! It features an assembly similar to that of the FangShi
GuangYing, but with some major differences in the pieces that are expected to make it perform
even better than the FangShi GuangYing. **It also features minor grooves on the pieces where
the stickers are placed.**" Manufacturer FangShi, Type 3x3. Discontinued at capture. Reviews:
"unlike the flimsier feeling GuangYing and ShuangRen"; "much less sandy than previous
FangshiCubes"; "The cube feels much heavier than the fangshi shuangren v2"; "By far the best
cube in the fangshi line, which is my favorite line of cubes... going to have to buy... the
mini version as well" (confirming a Mini JieYun existed commercially).

### 2.3 Cubezz.com (tier 2, China-based retailer, independent of TheCubicle)

CDX domain-wide search (`matchType=domain`, filtered for case-insensitive "guangying" /
"jieyun" in the URL) — a fully independent discovery route from Batch 3's own sweep,
re-derived from scratch this session:

- **GuangYing**: `Buy-4635-Funs+Puzzle+GuangYing+3x3x3+Speed+Cube+Black.html` (2015-02-05),
  `Buy-4647-...+Original+Color.html` (2015-03-24), `Buy-4648-...+White.html` (2015-03-25).
  Fetched `cubezz-fangshi-guangying` (new source): "Funs Puzzle GuangYing 3x3x3 Speed Cube
  Black... Brand: Funs Puzzle(GuangYing)... Size: 57*57*57mm... Weight: 86g." SKU
  `FUNSGY0B`. "Related Top Sellers" rail lists ShuangRen II and Mini ShuangRen listings as
  *separate* sibling products, not variants of this listing.
- **JieYun**: `Buy-4719-Funs+Puzzle+JieYun+3x3x3+Speed+Cube+57mm+Black.html` (2015-09-25),
  `Buy-4720-...+Mini+JieYun...+546mm+Black.html` (2015-09-25), `Buy-4759-...+Mini+...+White`
  (2016-02-26), `Buy-4760-...+57mm+Original+Color` / `...+White` (2016-01-25). Fetched
  `cubezz-fangshi-jieyun` (new source): "Funs Puzzle JieYun 3x3x3 Speed Cube 57mm Black...
  **Funs Puzzle new design**... Brand: Funs Puzzle(JieYun)... Size: 57*57*57mm... Weight: 91g."
  SKU `FUNSJY0B`.
- No "GuangYing II"/"GuangYing 2" or "JieYun II"/"JieYun 2" found on cubezz.com (case-insensitive
  CDX filter, zero results both times, retried after one transient connection failure).
- No "Mini GuangYing" found (cubezz.com CDX filter, zero results) — GuangYing appears to be a
  single 57mm-only line, unlike ShuangRen and JieYun, both of which have a documented 54.6mm
  "Mini" sibling.

Two independent tier 2 retailers (US and China, different languages of commerce, different
catalogue structures, different SKU conventions) each independently carry both GuangYing and
JieYun as separately named products. This satisfies DATA_MODEL rule 9's `confirmed` bar for
bare existence of both names as real, sold products.

### 2.4 Speedsolving wiki (tier 4, corroborating only)

Re-fetched `speedsolving-wiki-fangshi` in full (previously only its ShuangRen section had been
quoted). The page's own structure:

```
Contents
1 Fangshi ShiShuang 2x2
2 Fangshi XingYu 2x2
3 Fangshi ShuangRen 3x3
4 Fangshi ShuangRen V2 3x3
5 FangShi GuangYing
6 FangShi JieYun
```

GuangYing and JieYun are listed as headers at the **same structural level** as "Fangshi
ShuangRen 3x3" and "Fangshi ShuangRen V2 3x3" — i.e., the wiki editor treated all four as peer
product entries under the company page, in what reads as chronological order. Both GuangYing
and JieYun headers have **no body text** (confirmed stub headers, as Batch 3 already found;
this pass re-verified rather than assumed it). Tier 4, corroborating only — cannot establish
anything alone, but it is *consistent with*, and does not contradict, the retailer evidence
above.

### 2.5 No Chinese-language corroboration found

This investigation attempted to find first-party Chinese naming (the task's suggested
decisive evidence) but could not: no FangShi/Funs Puzzle official domain exists in any capture
checked by this or prior passes, and this session's web-search budget was exhausted globally
before a dedicated search for Chinese product names (光影/疾云-style renderings) could be run.
**This is recorded honestly as a lead not chased, not as a negative finding.** Neither
TheCubicle's nor cubezz.com's English-language listings for either product include Chinese
characters in the excerpts captured. A caveat below quantifies exactly what this open lead
would need to close.

### 2.6 Duplicate-coverage check

`grep -ril "guangying\|jieyun" data/families/ data/models/ data/variants/` returns only the two
already-known flag comments (`data/families/fangshi-shuangren.yml`,
`data/models/fangshi/fangshi-shuangren-original.yml`). No hidden or misfiled coverage exists
anywhere else in the archive.

---

## 3. Per-line classification

### GuangYing — Classification **A** (genuine missing family)

**Why A, and why not the other four:**

- **Not B (belongs to an existing frozen family).** The only candidate absorbing family is
  `fangshi-shuangren`. TheCubicle's own copy explicitly frames GuangYing as a *comparison
  product* to ShuangRen ("assembly similar to... but with some major differences in the
  pieces"), not as a configuration, size, or edition of ShuangRen — the same "major
  differences in the pieces" language that DATA_MODEL §4.2's worked decision B treats as
  decisive for a mechanical, not-producible-from-one-design difference. cubezz.com's own
  structured "Brand: Funs Puzzle(GuangYing)" field (distinct from "Brand: Funs Puzzle" on its
  ShuangRen listings) independently draws the same line. A customer review on TheCubicle's own
  page treats "the shuangren and the shuangren v2" and "the guangying" as three distinct
  things in one sentence.
- **Not C (alias/rebrand).** Both retailers use "GuangYing" as the product's own name, sold at
  its own price point and its own SKU (`FUNSGY0B`, unrelated to ShuangRen's SKUs), not as an
  alternate name for a ShuangRen SKU. No source anywhere calls GuangYing a rebrand or renaming
  of ShuangRen; every source treats it as a successor product.
- **Not D (retailer terminology).** Two retailers, in two languages of commerce, on two
  continents, independently use the identical transliteration "GuangYing" with the identical
  manufacturer attribution ("FangShi" / "Funs Puzzle"). A single retailer inventing a category
  name would not reproduce identically at a second, unrelated retailer with its own separate
  catalogue and translation pipeline.
- **Not E (insufficiently evidenced).** Two independent tier 2 sources agreeing satisfies
  DATA_MODEL rule 9's `confirmed` bar for bare existence as a named product. What remains
  genuinely under-evidenced is *specs and dates*, not existence — the same evidentiary shape
  the rest of this manufacturer's records already carry (fangshi-shuangren itself rests on
  exactly this tier of evidence throughout).
- **Precedent inside this same archive settles the family-vs-model question.** This
  manufacturer's own naming behaviour (renaming an entire product rather than versioning it)
  is not unique to FangShi. DaYan's flagship 3x3 progression — GuHong, ZhanChi, LingYun,
  TengYun, XiangYun, LunHui, PanShi, TaiYan — is each its **own family record** in this
  archive (`data/families/dayan-guhong.yml` through `dayan-taiyan.yml`, 8 families, one
  manufacturer), not one "DaYan flagship" family with eight models. The schema explicitly
  supports this via `successor_family_id` on the family schema, already populated on 11
  families archive-wide (e.g. `gan-356.yml` → its flagship successor). GuangYing, being a
  wholly new name (not a version suffix on "ShuangRen"), fits this established pattern, not
  the "shared name, version number changes" pattern that keeps `fangshi-shuangren` itself as
  one family across V1/V2.

**Recommendation if A is accepted:** a human would create `fangshi-guangying` as a new family
(`manufacturer_id: fangshi`, `positioning`: plausibly a step in the same flagship lineage as
ShuangRen, evidenced by `thecubicle-fangshi-guangying` and `cubezz-fangshi-guangying`), and set
`fangshi-shuangren.successor_family_id: fangshi-guangying` with a `reported` attestation on
TheCubicle's own succession framing. Model enumeration under it would very likely yield exactly
one model (no second GuangYing generation was found anywhere), leaving the Mini-size question
open (no "Mini GuangYing" was found this pass, unlike ShuangRen and JieYun).

### JieYun — Classification **A** (genuine missing family)

**Why A, and why not the other four:** identical structure to GuangYing, with **stronger**
evidence on one axis:

- **Not B.** JieYun's retailer copy names an explicit physical mould difference — "minor
  grooves on the pieces where the stickers are placed" — which is exactly the kind of
  "different mouldings or different internal geometry" that DATA_MODEL §4.2 says "are a new
  model [or family], whatever the marketing says." cubezz.com's own copy independently calls
  it "Funs Puzzle new design," corroborating from an unrelated source that this is not framed
  as a configuration of GuangYing or ShuangRen.
- **Not C.** Own SKU (`FUNSJY0B`), own price, own colourway set at both retailers, framed at
  both as a successor product line, not an alias.
- **Not D.** Same two-retailer, two-continent, two-language independence as GuangYing.
- **Not E.** Same `confirmed`-bar existence evidence as GuangYing, plus the additional,
  stronger physical-difference statement above.
- **Succession chain, not a fork.** TheCubicle's own copy places JieYun after GuangYing
  specifically ("assembly similar to that of the FangShi GuangYing"), and the wiki's Contents
  ordering agrees (ShuangRen → ShuangRen V2 → GuangYing → JieYun). This reads as a single
  four-generation flagship lineage under four different names, exactly the DaYan pattern
  above, not two independent forks off ShuangRen.

**Recommendation if A is accepted:** create `fangshi-jieyun` as a new family, with
`fangshi-guangying.successor_family_id: fangshi-jieyun` (or whichever of ShuangRen/GuangYing a
human decides is the more precise immediate predecessor — this investigation did not find
material to prefer one link over the other beyond the plain reading of TheCubicle's own
"assembly similar to X" statements, which name GuangYing, not ShuangRen, as JieYun's direct
predecessor). Model enumeration would need to separately confirm whether the "Mini JieYun"
54.6mm line is a variant-level size configuration (the working assumption, matching ShuangRen's
own precedent) or, given the grooved-piece difference is already established as model/family
-defining, whether Mini JieYun shares that exact mould — not adjudicated here, a pass-4-level
question once the family exists.

### "Mini" lines (ShuangRen, JieYun) — Classification **D/already-accounted-for**, not a new
missing family

Both "Mini ShuangRen 54.6mm" and "Mini JieYun 546mm/54.6mm" are named at cubezz.com as `Mini +
<existing product name>` — a modifier applied to an existing named line, sold alongside its
57mm sibling under the same brand field, not as an independently-named product. This is not
"retailer terminology" in the D sense (inventing a name); it is the same size-variant pattern
this archive already treats as within-family in `dayan-zhanchi.yml` ("A smaller 'ZhanChi 42mm'
size variant is treated as part of this family, per the same 'size variant of the budget line'
reasoning applied to qiyi-sail's Big Sail") and that Batch 3 already applied to ShuangRen's own
Mini line. **No new family is warranted for either Mini line.** If GuangYing/JieYun families
are created, their Mini siblings become pass-4 variant-enumeration material within those new
families, not a fifth and sixth family.

### Anything else missed? — Checked, none found

The 61-URL complete TheCubicle sweep (§2.2) and the cubezz.com case-insensitive CDX searches
for "guangying"/"jieyun" plus the pre-existing 59/158-URL "shuangren"/"funs" sweeps (Batch 3)
together cover every 3x3-relevant FangShi-attributed URL found at either retailer. No third
name beyond ShuangRen, GuangYing, and JieYun was found. ShiShuang and XingYu are 2x2-only per
the wiki and are out of scope for a 3x3 taxonomy question. LimCube is already correctly
resolved as a shape-mod sub-brand, not a 3x3 line. **No further missing FangShi 3x3 family
beyond GuangYing and JieYun is evidenced.**

---

## 4. Confidence and what would change it

| Line | Classification | Confidence | Decisive evidence | What would raise/change confidence |
|---|---|---|---|---|
| GuangYing | A (missing family) | **probable** | Two independent tier 2 retailers (TheCubicle, cubezz.com), consistent naming, retailer-stated "major differences in the pieces" vs. ShuangRen | A first-party FangShi/Funs Puzzle source (site or catalogue) naming GuangYing directly would raise to `confirmed`; a tier 1-3 source explicitly stating GuangYing is a configuration/edition of ShuangRen (none found) would lower it |
| JieYun | A (missing family) | **probable** | Same as GuangYing, plus an explicit physical-mould statement ("minor grooves on the pieces") and an independent "new design" characterisation at a second retailer | Same as GuangYing |
| Mini ShuangRen / Mini JieYun | Not a missing family (within-family size variant) | **probable** | Named as `Mini + <base line>` at cubezz.com, consistent with the archive's own `dayan-zhanchi` 42mm precedent | A source stating Mini uses a materially different mould from its 57mm sibling would reopen this as a model-level question, still not family-level |
| Any other FangShi 3x3 line beyond these | E (none found) | **reported** (absence, not proof of absence) | Complete 61-URL TheCubicle sweep + cubezz.com CDX searches, both non-truncated | A first-party FangShi catalogue, still unlocated after four passes' worth of searching, is the only source type that could definitively close this open question either way |

I did **not** find a native-language (Chinese) name for either product; this is recorded as an
open lead per §2.5, not treated as absence of evidence for the classification itself, since the
English-language, cross-retailer naming and description evidence already independently clears
the `confirmed` bar for bare existence and the `probable` bar for the family-vs-model
boundary call.

---

## 5. Is a genuine Pass 2 taxonomy defect established?

**Yes, with `probable` confidence, not `confirmed`.** The evidence establishes that GuangYing
and JieYun are real, separately-designed, separately-sold FangShi/Funs Puzzle 3x3 product
lines that Pass 2 did not enumerate as families — a genuine gap of the kind RESEARCH_SPEC
warns about ("a systematically missing region of the archive"). It falls short of `confirmed`
only because no first-party manufacturer source exists for this entire manufacturer (a
structural limitation predating this investigation, not evidence against the finding), and no
Chinese-language corroboration was reachable this session.

This is escalated as a **formal taxonomy finding for human adjudication**, per this
investigation's constraints. No family, model, or variant record was created, renamed, merged,
split, or re-parented.

---

## Sources created this session

- `data/sources/thecubicle-fangshi-guangying.yml` (tier 2, archive_url)
- `data/sources/thecubicle-fangshi-jieyun.yml` (tier 2, archive_url)
- `data/sources/cubezz-fangshi-guangying.yml` (tier 2, archive_url)
- `data/sources/cubezz-fangshi-jieyun.yml` (tier 2, archive_url)

No existing source file was overwritten. `speedsolving-wiki-fangshi`,
`thecubicle-fangshi-shuangren-v2`, `cubezz-fangshi-shuangren-ii`, `thecubicle-limcube-fangshi`,
and `speedcubeshop-fangshi-collection-2021` were reused, unmodified, as already-established
context.

`npm run validate`: PASS, 0 errors, 0 warnings, 943 records.

---

## Machine-readable summary

```yaml
- name: "FangShi GuangYing"
  classification: A
  confidence: probable
  decisive_evidence:
    - thecubicle-fangshi-guangying
    - cubezz-fangshi-guangying
  blocks_pass3: true
- name: "FangShi JieYun"
  classification: A
  confidence: probable
  decisive_evidence:
    - thecubicle-fangshi-jieyun
    - cubezz-fangshi-jieyun
  blocks_pass3: true
- name: "Mini ShuangRen (54.6mm)"
  classification: D
  confidence: probable
  decisive_evidence:
    - cubezz-fangshi-shuangren-ii
  blocks_pass3: false
- name: "Mini JieYun (54.6mm / 546mm)"
  classification: D
  confidence: probable
  decisive_evidence:
    - cubezz-fangshi-jieyun
  blocks_pass3: false
- name: "Any other undiscovered FangShi 3x3 line"
  classification: E
  confidence: reported
  decisive_evidence: []
  blocks_pass3: false
```
