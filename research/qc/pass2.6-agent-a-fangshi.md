# Pass 2.6 targeted family-gap sweep — FangShi GuangYing/JieYun (Agent A)

Branch `p26-a`. Taxonomy investigation only. No family, model, or variant record created,
renamed, merged, split, or re-parented. Families remain frozen at 122, variants at 104.

This continues `research/qc/pass3-b4-agent-b-fangshi-taxonomy.md` (Agent B's investigation,
escalation `P3-T1`). That report reached `probable` confidence that both GuangYing and JieYun
are genuine missing families. This pass re-verifies its load-bearing evidence, chases the
open Chinese-language lead, adds independent non-US retailers per RESEARCH_SPEC 3.6a, and
re-states the taxonomy answer at the confidence the fuller evidence now supports.

---

## 1. Re-verification of the four existing sources

All four archived pages were re-fetched via `scripts/wayback.mjs get` at the exact snapshot
timestamps recorded in the existing source files, and the raw text was grepped for every
quoted phrase.

- **`thecubicle-fangshi-guangying`** (20201108112458) — verbatim match. "The FangShi GuangYing
  is now available! It features an assembly similar to that of the FangShi ShuangRen, but with
  some major differences in the pieces..." confirmed exactly, spec table confirmed (Manufacturer
  FangShi, Type 3x3, Gross Weight 95g, Dimensions 57.0mm), the "shuangren and the shuangren v2"
  vs. "the guangying" customer-review contrast confirmed exactly. One addition the prior source
  file did not quote: the spec table also carries an **`Added 2018-09-11`** field — this is one
  of this archive's four documented catalogue-migration artifacts (RESEARCH_SPEC's admission
  policy names it explicitly) and was correctly **not** used as a release date by the prior
  pass. Flagging it here so nobody mistakes it for one later.
- **`thecubicle-fangshi-jieyun`** (20200923001744) — verbatim match, including the "minor
  grooves on the pieces where the stickers are placed" sentence and every quoted customer
  review.
- **`cubezz-fangshi-guangying`** (20150205040343) — verbatim match: "Brand: Funs
  Puzzle(GuangYing)", "Size: 57*57*57mm", "Weight: 86g", SKU `FUNSGY0B`, and the "Related Top
  Sellers" rail listing ShuangRen II and Mini ShuangRen as separate sibling products.
- **`cubezz-fangshi-jieyun`** (20150925020454) — verbatim match: "Funs Puzzle new design",
  "Brand: Funs Puzzle(JieYun)", "Size: 57*57*57mm", "Weight: 91g", SKU `FUNSJY0B`.

**All four archive URLs resolve. Nothing was misquoted or overstated.** The prior pass's
evidentiary floor holds exactly as reported.

---

## 2. New evidence — three additional independent retailers

RESEARCH_SPEC 3.6a requires at least one non-US/English retailer in discovery beyond what was
already used (cubezz.com). Using the same CDX domain-wide filtered-search technique the prior
pass used on cubezz.com (`matchType=domain`, `filter=urlkey:.*<term>.*` — note: the `urlkey`
field is pre-lowercased by the CDX index itself, so this is the reliable way to do a
case-insensitive substring search; filtering on the raw `original` field with a literal
lowercase term silently returns zero rows because that field preserves the retailer's own
mixed case), I swept a set of candidate retailer domains for "guangying", "jieyun", and
"fangshi". Two produced substantial results; several came back empty.

### 2.1 LighTake (China/Hong Kong-based, English-language storefront) — a third independent channel

- **GuangYing**, new source `lightake-fangshi-guangying` (archive_url `20150220050946`):
  "FangShi GuangYing 3 x3x3 Magic Cube Speed Puzzle 57MM ... Brand:FangShi GuangYing ...
  Size:57*57*57mm ... Weight:100g." A third distinct weight figure (86g cubezz / 95g TheCubicle
  / 100g LighTake) — recorded as an unresolved cross-retailer discrepancy, not adjudicated.
  Related-products rail lists "FangShi ShuangRen II" as a separate sibling.
- **JieYun**, new source `lightake-fangshi-jieyun` (archive_url `20150822000524`, captured
  2015-08-22, earlier than TheCubicle's own JieYun capture): "Fangshi Funs JieYun 3X3X3 Magic
  Cube 5.7cm - Black ... Brand:Fangshi / Funs ... Cube Size: 5.7X5.7X5.7 cm." Related-products
  rail lists "FangShi ShuangRen 3x3x3 Puzzle Speed Cube (54.6mm)" as a separate sibling. Note:
  this listing's own "Brand" field is the generic "Fangshi / Funs" rather than a JieYun-specific
  string (unlike this same retailer's GuangYing listing) — an internal labelling inconsistency,
  not treated as evidence against JieYun's distinctness, since the product's own name, page, and
  sibling context still individuate it.

### 2.2 SpeedCube.com.au (Australian retailer) — a fourth independent channel, genuinely non-US/English-region

- **GuangYing**, new source `speedcube-com-au-fangshi-guangying` (archive_url `20150316071253`).
  Page title: **"FangShi 3X3X3 GuangYing (57mm) BLACK * New January 2015 release *"**. Body:
  "The all new 2015 release Fangshi GuangYing is now in stock! The FangShi GyangYing is similar
  to the popular FangShi ShuangRen and has **some improvements to the core assembly** which
  FangShi (Funs) factory claims delivers greater performance and control."

  Two things flagged rather than resolved unilaterally:
  1. This retailer frames the ShuangRen→GuangYing difference as "improvements to the core
     assembly" — narrower language than TheCubicle's "major differences in the pieces." Both
     still describe GuangYing as a distinct, separately-branded, separately-SKU'd product, not a
     selectable option on the ShuangRen listing, so the model/variant boundary call is
     unaffected by this wording difference — but the *precise physical scope* of the redesign
     (core-only vs. full mould) is not pinned down by either source alone, and I record that
     honestly rather than picking the more convenient phrase.
  2. **"New January 2015 release"** is an explicit, retailer-stated release month in prose — not
     a Wayback crawl timestamp, not an "Added:" database field. This is the strongest
     release-date lead found for either product line in this entire investigation. I record it
     at no higher than `reported` (one tier 2 source, marketing-toned, uncorroborated
     elsewhere) and do **not** adopt it into any record, since this pass creates no model
     records — it is handed to whoever builds `fangshi-guangying` next.

- **JieYun**, new source `speedcube-com-au-fangshi-jieyun` (archive_url `20151103074658`):
  "The Fangshi JieYun 3x3 is an improvement over its predecessors **(GuanYing and Shuangren)**
  delvering a great speed cube with awesome performance and control." This is the clearest
  single-sentence succession statement found this pass — an independent Australian retailer
  names both prior generations, in order, without copying TheCubicle's wording. Read plainly it
  states a lineage, not necessarily a single exclusive immediate parent; it does not resolve as
  finely as TheCubicle's "assembly similar to that of the FangShi GuangYing" does whether
  GuangYing specifically (vs. ShuangRen) is JieYun's *most immediate* design predecessor.

  A CDX search of this same domain also turned up a **Mini JieYun** product slug,
  `fangshi-jieyun-3x3x3-54-5mm-black-speed-cube` (54.5mm — note, a slightly different figure
  than cubezz's "546mm"/54.6mm), first captured 2016-03-02. Repeated fetch attempts against this
  specific URL failed on the network layer every time (`wayback: fetch failed`, including after
  several retries with delay) — **this is recorded as "fetch failed," not as absence.** No
  source was created for it; it is a lead for a future pass with better luck or more patience
  against a flaky CDX/snapshot fetch.

### 2.3 SpeedCubeShop (US, but an independent catalogue/publisher from TheCubicle)

- **JieYun**, new source `speedcubeshop-fangshi-jieyun-2015` (archive_url `20151107020032`,
  distinct from the already-existing `speedcubeshop-fangshi-collection-2021` source, which
  covers a different 2021 LimCube-focused capture of this same retailer): "The JieYun defies
  every characteristic of a FangShi cube except for the vibrant sticker shades... the
  traditional swishy feeling and light weight is not present here. The core is very well
  reinforced and feels solid..." — independently-worded corroboration that JieYun is a
  substantive mechanical departure from prior FangShi products, not a sold configuration.
- A CDX sweep of this domain also surfaced **`fangshi-jieyun-mini-3x3`** as its own product
  slug, first indexed 2022-12-05 with HTTP status `301` (a redirect). The only capture of this
  URL resolves to a dead, generic storefront shell with no recoverable product content. This is
  recorded as a **weak existence lead only** (the slug existed at some point) — no source was
  created, since the underlying claim cannot stand on this capture alone.
- **GuangYing was searched for and not found** on this retailer (`0` matches on `urlkey`).

### 2.4 Domains checked with no relevant results

`mf8-china.com` (0 matches for jieyun; sane — domain resolves and has other captures),
`hknowstore.com` (0 matches for jieyun/guangying), `51fun.com` (query timed out repeatedly —
recorded as *not searched*, not as absence). These are recorded so a future pass does not
re-spend the same budget checking them again from scratch, without over-claiming what a null
result there means.

### 2.5 No "Mini GuangYing" found — now checked at four retailers, not one

Agent B's prior pass checked only cubezz.com and found none. This pass additionally checked
LighTake, SpeedCube.com.au, and SpeedCubeShop with the same technique (`mini-guangying` and
`mini guangying` filters) — **zero matches at all three.** This substantially strengthens (but,
per this archive's own rules, can never fully close) the "no Mini GuangYing exists" finding: it
is now a documented absence across four independent retail catalogues, still recorded at
`reported` confidence for the absence itself (a first-party FangShi catalogue remains the only
source type that could close this definitively), not `confirmed`.

---

## 3. The Chinese-language lead — chased, still not closed

This was the prior pass's explicitly recorded open lead (its §2.5). This session's `WebSearch`
tool budget was **already exhausted globally before this task began** (every `WebSearch` call
this session returned "this session has used its web search budget (200 of 200)"), which is the
same wall the prior pass hit. I could not run a single web search for 光影, 捷云/劫云/杰云, or
any other candidate rendering, and I want to be explicit that no plausible character rendering
is asserted anywhere in this report or in any source file — a transliteration guess is not
evidence and none is recorded as such.

Without `WebSearch`, I attempted to reach Chinese-language cubing sources by directly guessing
plausible community/retailer domain names and running the same CDX domain-sweep technique
against them (this uses only the Wayback CDX API, not `WebSearch`, so it was not blocked):
`rrmc.cc` (resolved, but is an unrelated mountain-biking site — a bad guess, not a cubing
domain), `cnmagic.net` (resolved, but is an unrelated 2004-era site, not cubing), `cn-cuber.com`,
`cubing.net.cn`, `cnmagiccube.com` (no captures at all — either the domains never existed or
were never crawled). **This line of inquiry is genuinely exhausted for this session**: blind
domain-guessing without a working search engine is not a productive way to discover real
Chinese cubing communities, and I stopped rather than continue guessing. No first-party
FangShi/Funs Puzzle domain in any language was found by this pass either — a fifth consecutive
failure to find one, which is itself the reportable finding RESEARCH_SPEC asks for: this
manufacturer's entire record rests on tier 2 retailer evidence with no tier 1 ceiling
achievable so far, in any language, across five independent research passes.

**Recorded explicitly as not chased to completion**, for the next pass: a working `WebSearch`
budget (or a human with direct Baidu/Taobao/WeChat access) searching for "方仕" combined with
"光影" or "捷云"/"杰云"/"劫云" is the one remaining route to either a first-party source or a
genuine Chinese-language retail corroboration.

---

## 4. Per-line classification

### GuangYing — Classification **A** (genuine missing family), confidence raised to **confirmed** for bare existence and distinctness

The prior pass's reasoning for why not B/C/D holds and is not repeated in full here (see
`pass3-b4-agent-b-fangshi-taxonomy.md` §3). What changes this pass:

- **Independent corroboration went from two tier 2 retailers to four**: TheCubicle (US),
  cubezz.com (China), LighTake (China/HK), SpeedCube.com.au (Australia). All four, independently,
  in different wording, with different SKU/price/weight figures, treat "GuangYing" as its own
  named FangShi/Funs Puzzle product, distinct from ShuangRen. This clears DATA_MODEL rule 9's
  `confirmed` bar for bare existence and for "this is a distinct product, not a ShuangRen
  configuration" comfortably — it is no longer resting on two sources, but four, spanning three
  countries and two continents' worth of independent retail catalogues.
- **What is *not* raised to confirmed**: the exact release date (best available: SpeedCube.com.au's
  "New January 2015 release," a single `reported`-grade retailer statement) and the precise
  physical scope of the redesign (TheCubicle says "pieces," SpeedCube.com.au says "core
  assembly" — not necessarily contradictory, since a new mould generation plausibly changes
  both, but no single source states both together). These remain `probable`/`reported` at best
  and should be recorded as such, not silently reconciled to whichever phrase sounds more
  decisive.
- **No Mini GuangYing found, now checked at four retailers** (see §2.5) — this remains the
  working answer, at `reported` confidence for the absence.

### JieYun — Classification **A** (genuine missing family), confidence raised to **confirmed** for bare existence and distinctness

Same structure as GuangYing, now corroborated at **five** independent retailer channels
(TheCubicle, cubezz.com, LighTake, SpeedCube.com.au, SpeedCubeShop's 2015 catalogue) rather than
two. Two of these five (TheCubicle: "minor grooves on the pieces"; SpeedCubeShop 2015: "defies
every characteristic of a FangShi cube... core is very well reinforced") independently describe
a substantive mechanical departure in different, non-copied language — this is now the strongest
model/family-defining evidence in the whole investigation, corroborated at tier 2 twice over
with materially different wording, which is exactly the kind of independent agreement DATA_MODEL
rule 9 rewards with `confirmed`.

**Succession chain, refined not overturned**: SpeedCube.com.au's JieYun copy ("an improvement
over its predecessors (GuanYing and Shuangren)") independently confirms the same
ShuangRen→GuangYing→JieYun ordering the wiki and TheCubicle already implied, from a fourth
source that did not copy either of them. This is now **one four-generation flagship lineage
under four different names** (ShuangRen, ShuangRen V2, GuangYing, JieYun), evidenced at
`probable`-to-`confirmed` depending on which specific link is being asked about:
- ShuangRen → ShuangRen V2: already established (existing family record, same name +
  version suffix).
- ShuangRen V2 / ShuangRen → GuangYing: `probable` (TheCubicle's "assembly similar to that of
  the FangShi ShuangRen"; SpeedCube.com.au's "similar to the popular FangShi ShuangRen").
- GuangYing → JieYun as the *most immediate* predecessor specifically: `probable` on
  TheCubicle's precise phrasing ("assembly similar to that of the FangShi GuangYing"), while
  SpeedCube.com.au's "predecessors (GuanYing and Shuangren)" corroborates the lineage as a whole
  without independently confirming GuangYing as sole immediate parent over ShuangRen. I do not
  treat this as disputed — both statements are consistent with GuangYing being the nearer
  predecessor — but flag that the finer claim ("GuangYing specifically, not ShuangRen, is
  JieYun's direct predecessor") rests on one source's precise wording, not two.

**Mini JieYun**: now documented as its own product slug/SKU at **three** independent retailers
(cubezz "Mini JieYun 546mm", SpeedCube.com.au "fangshi-jieyun-3x3x3-54-5mm...", SpeedCubeShop
"fangshi-jieyun-mini-3x3", the last two newly found this pass but with unrecoverable page
content — see §2.2–2.3). This is unchanged in classification from the prior pass: a **within-family
size variant**, not a new family or model, following this archive's own established
`dayan-zhanchi` 42mm precedent, which the task instructed not to overturn without evidence — and
no evidence surfaced this pass suggesting Mini JieYun uses a different mould/mechanism from its
57mm sibling beyond size. This is recorded as the working answer, not a certainty: it was not
possible to read either of the two new Mini JieYun listings' actual content, so this
classification rests on the *existence of a "Mini + <name>" naming pattern*, the same evidentiary
shape the prior pass already used for Mini ShuangRen.

### "Mini" lines overall — unchanged: not a missing family

No new evidence this pass changes the prior conclusion that Mini ShuangRen and Mini JieYun are
within-family size variants, not separate families.

### Anything else missed? — Still none found, now checked more broadly

Five retailer catalogues (TheCubicle, cubezz.com, LighTake, SpeedCube.com.au, SpeedCubeShop)
were searched for "guangying"/"jieyun"/"fangshi" this pass and the prior one, and no third 3x3
flagship name, no "GuangYing II," and no "JieYun II" appeared anywhere. This remains a
`reported`-confidence absence (broader and better-searched than before, never provable).

---

## 5. Confidence table

| Line | Classification | Confidence (this pass) | Confidence (prior pass) | Decisive evidence |
|---|---|---|---|---|
| GuangYing exists as a distinct FangShi product, not a ShuangRen configuration | A | **confirmed** | probable | 4 independent tier 2 retailers: thecubicle-fangshi-guangying, cubezz-fangshi-guangying, lightake-fangshi-guangying, speedcube-com-au-fangshi-guangying |
| JieYun exists as a distinct FangShi product, not a GuangYing/ShuangRen configuration | A | **confirmed** | probable | 5 independent tier 2 retailers: thecubicle-fangshi-jieyun, cubezz-fangshi-jieyun, lightake-fangshi-jieyun, speedcube-com-au-fangshi-jieyun, speedcubeshop-fangshi-jieyun-2015 |
| GuangYing release date (Jan 2015) | unresolved candidate | **reported** | not found | speedcube-com-au-fangshi-guangying (single source, not adopted) |
| GuangYing→JieYun exact physical redesign scope | unresolved | **probable** at best | probable | thecubicle-fangshi-jieyun ("minor grooves"), speedcubeshop-fangshi-jieyun-2015 ("defies every characteristic") — two independently-worded sources agree on substantive mechanical departure, neither pins down the full scope |
| GuangYing is JieYun's *sole immediate* predecessor (vs. the whole lineage) | uncertain | **probable**, not confirmed | not addressed | thecubicle-fangshi-jieyun vs. speedcube-com-au-fangshi-jieyun (consistent, not independently doubly-confirmed on this specific point) |
| Mini JieYun / Mini ShuangRen = within-family size variant, not new family | D (per prior pass's schema) | **probable**, unchanged | probable | cubezz-fangshi-jieyun + 2 new but content-unrecoverable slugs at SpeedCube.com.au/SpeedCubeShop |
| Mini GuangYing exists | none found | **reported** (absence), stronger than before | reported | 4 retailers checked, 0 matches (cubezz, lightake, speedcube.com.au, speedcubeshop) |
| Chinese-language corroboration / first-party FangShi source | not found | **unknown** | unknown | WebSearch budget exhausted; blind domain-guessing via CDX unproductive |

**What would change any of this further**: a first-party FangShi/Funs Puzzle source (in any
language) would raise the family-existence claims to the archive's highest tier and could
finally resolve the weight/date/scope discrepancies. A working Chinese-language web search is
the single highest-value next step this pass could not take.

---

## 6. Ready-to-execute taxonomy proposal (for human adjudication — no records created by this pass)

Unchanged in substance from the prior pass's recommendation, updated with the new evidence:

**`fangshi-guangying`** (proposed family id)
- `manufacturer_id: fangshi`
- `name`: "FangShi GuangYing"
- `positioning`: flagship-lineage successor to ShuangRen (evidenced at `probable`:
  thecubicle-fangshi-guangying, speedcube-com-au-fangshi-guangying)
- `introduced`: **do not set from "New January 2015 release"** without a human first deciding
  whether a single tier 2 retailer's own marketing-toned prose statement clears this archive's
  bar for "an explicit dated statement" (RESEARCH_SPEC admission policy §3) — the source exists
  now (speedcube-com-au-fangshi-guangying) so the decision is available to make, but this pass
  does not make it.
- `successor_family_id` on `fangshi-shuangren`: proposed `fangshi-guangying`, at `probable`
  (thecubicle-fangshi-guangying, speedcube-com-au-fangshi-guangying — both independently frame
  GuangYing as ShuangRen's successor).
- Sources available: thecubicle-fangshi-guangying, cubezz-fangshi-guangying,
  lightake-fangshi-guangying, speedcube-com-au-fangshi-guangying.
- Model enumeration expectation: very likely exactly one model (no second generation found at
  five retailers total across two passes); no Mini GuangYing variant.

**`fangshi-jieyun`** (proposed family id)
- `manufacturer_id: fangshi`
- `name`: "FangShi JieYun"
- `positioning`: flagship-lineage successor to GuangYing (evidenced at `probable`:
  thecubicle-fangshi-jieyun, speedcube-com-au-fangshi-jieyun)
- `successor_family_id` on `fangshi-guangying`: proposed `fangshi-jieyun`, at `probable`.
  Note for the human: TheCubicle's wording supports GuangYing specifically as the immediate
  predecessor; SpeedCube.com.au's wording supports the lineage as a whole without excluding
  ShuangRen as a joint predecessor. Recommend keeping the single `fangshi-guangying →
  fangshi-jieyun` link (the more precise of the two available statements) rather than a
  dual-parent structure the schema likely does not support anyway.
- Sources available: thecubicle-fangshi-jieyun, cubezz-fangshi-jieyun, lightake-fangshi-jieyun,
  speedcube-com-au-fangshi-jieyun, speedcubeshop-fangshi-jieyun-2015.
- Model enumeration expectation: one base model (mould/grooves difference well evidenced), plus
  a pass-4 question of whether "Mini JieYun" (54.5mm/54.6mm, three retailers, one with an
  unrecoverable page) is a variant of that model or needs its own model record if a future
  source ever states it shares the grooved-piece mould difference at a different scale — not
  adjudicated here.

**Records that would need to change if accepted:**
- `data/families/fangshi-shuangren.yml`: add `successor_family_id: fangshi-guangying`
  attestation; the existing note referencing the two unresolved wiki headers would be resolved
  rather than left open.
- New family file `data/families/fangshi/fangshi-guangying.yml` (or wherever the convention
  places it — I did not check the exact path convention since I am not creating this file).
- New family file for `fangshi-jieyun` with `successor_family_id` pointing back at
  `fangshi-guangying`.
- Pass 3 (model enumeration) would then need to run for both new families using the sources
  already gathered across both investigations.

---

## 7. Leads explicitly not chased

- **Chinese-language search** (§3) — `WebSearch` budget exhausted before this task began;
  blind CDX domain-guessing for Chinese cubing communities was attempted and was unproductive
  (wrong/unrelated domains, or no captures). Needs either a fresh `WebSearch` budget or a human
  with direct access to Baidu/Taobao/WeChat.
- **The `fangshi-jieyun-3x3x3-54-5mm-black-speed-cube` (SpeedCube.com.au Mini JieYun) page
  content** — every fetch attempt failed on the network layer; the URL/slug's existence is
  recorded, its content is not. Worth a retry when the Wayback CDX API is less flaky.
- **The `speedcubeshop.com/products/fangshi-jieyun-mini-3x3` page content** — only capture is a
  dead 301 redirect with no recoverable product body.
- **`51fun.com`** — CDX query timed out repeatedly; genuinely not searched, not confirmed empty.
- **Any retailer beyond the five checked across both investigations** (TheCubicle, cubezz.com,
  LighTake, SpeedCube.com.au, SpeedCubeShop) — e.g. AliExpress, Taobao directly (both poorly
  archived and largely blocked from Wayback crawling), Amazon.cn, or any Japanese/Korean
  retailer — none of these were attempted this pass.
- **Whether GuangYing's "core assembly" wording (SpeedCube.com.au) and "differences in the
  pieces" wording (TheCubicle) describe the same or different scopes of redesign** — flagged as
  an open nuance, not resolved, since no single source states both.

---

## Sources created this session

- `data/sources/lightake-fangshi-guangying.yml` (tier 2, archive_url)
- `data/sources/lightake-fangshi-jieyun.yml` (tier 2, archive_url)
- `data/sources/speedcube-com-au-fangshi-guangying.yml` (tier 2, archive_url)
- `data/sources/speedcube-com-au-fangshi-jieyun.yml` (tier 2, archive_url)
- `data/sources/speedcubeshop-fangshi-jieyun-2015.yml` (tier 2, archive_url)

No existing source file was overwritten. `npm run check`: PASS, 0 errors, 0 warnings.

---

## Machine-readable summary

```yaml
- name: "FangShi GuangYing"
  classification: A
  confidence: confirmed
  decisive_evidence:
    - thecubicle-fangshi-guangying
    - cubezz-fangshi-guangying
    - lightake-fangshi-guangying
    - speedcube-com-au-fangshi-guangying
  changed_from_prior_pass: true   # confidence raised from probable to confirmed; classification (A) unchanged
- name: "FangShi JieYun"
  classification: A
  confidence: confirmed
  decisive_evidence:
    - thecubicle-fangshi-jieyun
    - cubezz-fangshi-jieyun
    - lightake-fangshi-jieyun
    - speedcube-com-au-fangshi-jieyun
    - speedcubeshop-fangshi-jieyun-2015
  changed_from_prior_pass: true   # confidence raised from probable to confirmed; classification (A) unchanged
- name: "Mini ShuangRen (54.6mm)"
  classification: D
  confidence: probable
  decisive_evidence:
    - cubezz-fangshi-shuangren-ii
  changed_from_prior_pass: false
- name: "Mini JieYun (54.5-54.6mm)"
  classification: D
  confidence: probable
  decisive_evidence:
    - cubezz-fangshi-jieyun
  changed_from_prior_pass: false   # existence now also seen at speedcube.com.au and speedcubeshop, but content unrecoverable at both; classification unchanged
- name: "Any other undiscovered FangShi 3x3 line"
  classification: E
  confidence: reported
  decisive_evidence: []
  changed_from_prior_pass: false   # absence now checked at 5 retailers instead of 2, still not provable
- name: "First-party FangShi/Funs Puzzle source (any language)"
  classification: E
  confidence: unknown
  decisive_evidence: []
  changed_from_prior_pass: false   # fifth consecutive pass to fail to find one
```
