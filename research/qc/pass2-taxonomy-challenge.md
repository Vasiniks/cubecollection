# Pass 2 taxonomy challenge — independent review

Reviewer: qc worktree (`wt-qc`, branch `qc-qc`). Scope: independent adjudication of the 122
`data/families/*.yml` records produced by Pass 2, before Pass 3 (model enumeration) is allowed
to proceed. This is a challenge document, not a summary — every item below either disputes,
qualifies, or stress-tests a conclusion already on file, or reports a defect the authoring
passes did not surface themselves. Where the prior research is sound and well-evidenced, I say
so briefly and move on; I do not restate work that already speaks for itself.

Mechanical floor: `npm run validate` (0 errors, 0 warnings), `npm run lint` (0 errors, 1
advisory warning — `gan-ui-12-sp`, a single-variant model carrying an edition designation,
already a known and expected pattern), `npm run duplicates` (0 errors), `npm run coverage` (122
families, all `drafted`, consistent with Pass 2's expected output status) all ran clean before
this review began. Every finding below is therefore a finding no script catches.

Read in full before starting: `PRODUCT.md`, `DATA_MODEL.md`, `RESEARCH_SPEC.md`,
`schema/family.schema.json`, `vocab/manufacturer-kinds.yml`,
`research/notes/models/global-pass2-families.md` (2,322 lines — the consolidated per-manufacturer
reasoning log for 110 of the 122 families), `research/notes/models/gan-pass2.md` (the GAN-pilot
family session log), and every family/manufacturer/source file cited below was opened directly;
none of the conclusions here rest on the notes files' own framing without checking the
underlying `data/families/*.yml`, `data/manufacturers/*.yml`, and `data/sources/*.yml` records
they describe.

---

## Section A — highest-risk relationship questions

### A1. `qiyi-valk` — manufacturer_id: qiyi vs x-man-design

**Current state.** `data/families/qiyi-valk.yml` sets `manufacturer_id: qiyi`,
`/manufacturer_id: { confidence: uncertain, sources: [speedsolving-wiki-qiyi-products,
qiyicube-storefront-2018, theqiyi-about-us] }`, with a description that states plainly this is
"the pass's least certain family-boundary decision."

**Evidence for `qiyi`.** (1) The Speedsolving wiki's "Sub-Brands" heading lists "X-Man Design"
and "TheValk" as two separate, parallel entries, not one nested in the other
(`data/sources/speedsolving-wiki-qiyi-products.yml`, verified verbatim: "Sub-Brands ... X-Man
Design See X-Man Design. TheValk TheValk is a sub-brand created for the release of the Valk
3..."). (2) A 2018 QiYi storefront's own page `<title>` names "The Valk, MoFangGe, X-Man
Design" as three coordinate terms (`data/sources/qiyicube-storefront-2018.yml`).

**Evidence against.** QiYi's current (2026) first-party "family of brands" page
(`data/sources/theqiyi-about-us.yml`) names QY Cube, QY Toys, MoFangGe, and X-Man Design as its
sub-lines and does not mention Valk at all, despite TheCubicle's own captures showing Valk was
still an actively sold, continuously-updated line (Valk 5 M) through November 2025
(`data/sources/thecubicle-products-valk-prefix-2025.yml`) — i.e. Valk was not a lapsed or
historical line theqiyi-about-us could be excused for omitting as no-longer-relevant.

**Does the conclusion follow?** Only weakly, and the record says so itself. I looked for a
reading the existing note does not consider: a 2018 SEO page `<title>` concatenating three
product names is not evidence of an organisational hierarchy one way or the other — title tags
of this kind (confirmed independently in Section B for MoYu's own homepage) are keyword lists,
not org charts, and treating "three names in one title" as proof of "three parallel, non-nested
brands" reads more into the source than it states. The Speedsolving wiki's "Sub-Brands" section
is somewhat more structurally suggestive (it is prose organised under headings, not a bare
keyword string), but it is still tier 4, uncorroborated, and edited by community volunteers who
may simply not have thought to nest one entry under another. Meanwhile theqiyi-about-us's
omission of Valk from an apparently curated, current "family of brands" list, for a
still-selling flagship-tier product, is the single most surprising fact in the record and is
not explained by any source found — it is at least as consistent with "Valk was folded into
X-Man Design's own range and the About page no longer treats it as a distinct named brand" as
with "Valk was always a QiYi house line running parallel to X-Man Design."

**Recommended state.** Confidence `uncertain` is defensible (this is "a single weak source, or
internally ambiguous," not two sources making opposing direct statements — no source anywhere
states "Valk belongs to X-Man Design" or "Valk does not belong to X-Man Design"). What I would
change: state this explicitly as a genuine two-candidate question in the attestation's `notes`
(it already effectively is, in prose) and flag it for the specific human check the record itself
requests — nobody has yet gone back to the source that would resolve it directly: an archived
capture of theqiyi-about-us's *history* (does an earlier version mention Valk?), or a GAN-style
brand-story page if QiYi has one, or a direct query to whether TheCubicle's own "Valk" collection
page (if one existed, distinct from the bare `/products/` URLs found) files it under an
"X-Man Design" or "QiYi" top-level category.

**Confidence in this assessment.** Medium — the existing uncertain-confidence call is
reasonable; my disagreement is about which piece of evidence is doing the (little) work it does,
not about the bottom-line confidence level.

**Downstream impact on Pass 3.** High. Every model and variant built under `qiyi-valk` inherits
`manufacturer_id: qiyi` by construction (family → model → variant containment, DATA_MODEL §1.1).
If the correct attribution is `x-man-design`, an entire flagship lineage (Valk 2–5, at least
five generations per TheCubicle's own capture) will need every downstream model and variant
record's manufacturer lineage corrected — not a single field, a systemic reattribution across
however many models Pass 3 creates from this family. This is exactly the kind of error DATA_MODEL
§4.2 warns is expensive to walk back if silently assumed.

**Affected records.** `data/families/qiyi-valk.yml`; downstream (not yet created) every
`data/models/qiyi/valk-*.yml` and `data/models/x-man-design/valk-*.yml` Pass 3 would produce.

---

### A2. `diansheng-mscube` — should the family exist, and under this manufacturer_id?

**Current state.** `data/families/diansheng-mscube.yml`: `manufacturer_id: diansheng`,
`/manufacturer_id: { confidence: uncertain, sources: [speedsolving-wiki-diansheng-products] }`.
The sole basis is one sentence: "DianSheng are a manufacturer ... known for ... owning the
Mscube line of puzzles" (`data/sources/speedsolving-wiki-diansheng-products.yml`).

**Evidence for.** The sentence is a direct, specific ownership claim, not an inference from
naming. The underlying product (MsCube MS3L 3x3) is real and durable — TheCubicle's own listing
spans 2023 through at least a 2026-06-11 capture (`data/sources/
thecubicle-mscube-ms3l-3x3-standard-product.yml`).

**Evidence against.** The claim has no citation trail on the wiki's own page, no second source
anywhere corroborates it, and — the point the existing record itself flags but does not fully
weigh — **TheCubicle's own MsCube product page never once names DianSheng.** A retailer selling
a "DianSheng-owned" product would ordinarily be expected to say so in a structured
"Manufacturer" field, the way it does for GuoGuan (`Manufacturer: FangShi` pattern used
elsewhere in this project for LimCube, and `MoYu / PBCube` for PBCube). Its total absence here,
on a product that has been continuously sold for three years, is itself mild evidence against
the DianSheng-ownership reading, not merely an absence of confirmation.

**Does the conclusion follow?** No — or at least, not as far as the `manufacturer_id`
assignment. The family's *existence* is well evidenced (a real, multi-year, specified product).
The family's *placement under DianSheng* rests on exactly one uncorroborated tier-4 sentence,
contradicted by the silence of the one first-party-adjacent retailer record that would be
expected to confirm it if true.

**Recommended state.** Keep the family. Reconsider whether `manufacturer_id: diansheng` should
instead be `manufacturer_id: mscube` (a new, separate `manufacturer` record with `kind:
manufacturer` and country/founding left `unknown`), with the DianSheng-ownership claim recorded
as a `notes` lead pending a first-party or tier 1–2 source, mirroring how this project treated
GuoGuan/MoJue/SenHuan's own open questions the other direction. This is not a demand to flip the
assignment — the wiki claim is not nothing — but the current record's own confidence value
(`uncertain`) already tells you the schema currently encodes a near-guess as a load-bearing
identifier.

**A structural risk specific to this one.** The family's own `id` is `diansheng-mscube` — the
disputed manufacturer attribution is baked into the immutable identifier itself (DATA_MODEL
§3.3, ids are immutable; §8.4). If a future pass determines MsCube is not a DianSheng property,
correcting this is not a one-field edit: it requires a new `manufacturer` record, a new family
id, and `former_ids` on the new family pointing back here (§8.4) — plus reparenting every model
and variant Pass 3 will have built on top of it by then. Compare `mojue-m3.yml` and
`senhuan-mars.yml`, which face the identical mechanism but at least rest on an *SEO-title-tag*
level of MoYu evidence (Section B) rather than a single unconfirmed wiki sentence contradicted
by the product's own retail listing.

**Confidence in this assessment.** Medium-High — the retailer-silence counter-evidence is a new
observation this review adds; the underlying single-source weakness was already flagged
honestly by the record itself.

**Downstream impact on Pass 3.** Medium-High. Same mechanism as A1 (misattribution propagates
through the containment chain), somewhat lower absolute stakes than Valk (a smaller, single-name
product line rather than a five-generation flagship), but a harder-to-reverse cost because it is
encoded in the id.

**Affected records.** `data/families/diansheng-mscube.yml`; `data/manufacturers/diansheng.yml`
(no change needed there — it does not currently assert the MsCube relationship itself).

---

## Section B — MoYu-affiliated labels

### B1. The four "structural analogy" records: `mojue`, `mohuanshousu`, `senhuan`, `yancheng`

**Current state.** All four `data/manufacturers/*.yml` records carry `kind: sub_brand`,
`parent_id: moyu`, at `confidence: uncertain`, explicitly built "by structural analogy to
GuoGuan" (each record says so in its own `notes`).

**What the analogy actually rests on, checked directly.** I opened the cited source,
`data/sources/moyucube-official-home-2022.yml`. Its entire content is one HTML `<title>` tag:

> "魔域文化传播有限公司---二阶魔方|三阶魔方|四阶魔方|...|魔方教室、洋葱设计、国冠、魔爵、
> 魔幻手速、乐涛、森幻、燕成-moyucube.com"

i.e. "MoYu Culture Communication Co., Ltd. — 2x2 cube | 3x3 cube | 4x4 cube | ... | MoFang
JiaoShi, Onion Design, GuoGuan, MoJue, MoHuanShouSu, LeTao, SenHuan, YanCheng." This is SEO
keyword-stuffing: a flat list of product-category terms (2x2, 3x3, fidget spinner, flying cups)
run together with brand-ish names, with **no structural marker distinguishing "brand" from
"product category"** anywhere in the string. The source's own `reliability_note` says as much:
"a title-tag/meta enumeration, not prose describing corporate structure." Every one of the four
"analogy" records nonetheless asserts `kind: sub_brand` — a specific, formal corporate-structure
claim — resting on this string plus one retailer-slug pattern (absence of a "moyu-" prefix on
product URLs).

**Is the reasoning sound, or circular?** Partly circular, and the researcher's own template
record (`data/manufacturers/guoguan.yml`) says the quiet part directly: "None of these slugs
carry a 'moyu-' prefix, unlike MoYu's own product lines (WeiLong, TangLong) ... the same
structural signal ... used for the MFJS sub-brand determination." The entire slug-prefix test is
derived from **one retailer's** (TheCubicle's) own URL-naming habits, compared against the same
retailer's habits for a different, small set of confirmed cases. A retailer's choice of product
slug reflects its own merchandising and SEO conventions at least as much as it reflects any fact
about the manufacturer's legal structure — this is precisely the trap RESEARCH_SPEC and this
review's brief both warn about ("Never trust ... retailer taxonomy"). No second retailer's
naming pattern was checked for any of the four affected records to see whether the "no
moyu-prefix" signal replicates outside TheCubicle.

**New evidence found by the family-enumeration pass that has not yet propagated back.** Two of
the four now have *materially stronger* evidence sitting in family records that the
manufacturer records don't yet reflect:

- `data/families/mojue-m3.yml` quotes TheCubicle's own product copy calling the MoJue M3 "an
  exciting new high-end MoYu **sub-branded** 3x3" (twice, in its own prose) — a direct, specific,
  tier-2 first-party-retailer statement, the same evidentiary shape that justifies `pbcube`'s
  `kind: sub_brand` at `confidence: probable`.
- `data/families/mohuanshousu-chufeng.yml` quotes an equivalent direct statement: "a new MoYu
  **sub-branded** 3x3."

Both family records flag this explicitly ("materially stronger... than the naming-analogy
reasoning [the manufacturer record] currently rests on... a human should look at raising
[confidence] given this new, more direct source") and correctly declined to edit the
manufacturer record themselves (out of that pass's write lane). **This flag has not been acted
on.** `data/manufacturers/mojue.yml` and `data/manufacturers/mohuanshousu.yml` still read
`confidence: uncertain` on `/kind` and `/parent_id`, while their own family children cite
stronger evidence than that.

`senhuan` and `yancheng` got no equivalent corroboration this pass (`senhuan-mars.yml` and
`yancheng-yan3.yml` both say explicitly "no additional corroboration... was found here (nor is
any contradiction)") — these two remain resting on the SEO-title-tag + single-retailer-slug
analogy alone, with nothing stronger.

**Classification, per the taxonomy requested:**

| Entity | Best-supported classification | Basis |
|---|---|---|
| `guoguan` | Formal sub-brand | Dedicated tier-4 wiki page directly states "a MoYu sub-brand," verified verbatim in `speedsolving-wiki-guoguan.yml` — real evidence, still only tier 4, correctly `reported` not `confirmed` |
| `mfjs` | Formal sub-brand | Tier 1 (MoYu's own title-tag listing, though same SEO-caveat applies) + tier 4 wiki + tier 2 retailer taxonomy, three sources agreeing — `confirmed` is defensible here specifically because MFJS additionally has a *dedicated* retailer brand-hierarchy page (`cuboss-mfjs-brand-page`), unlike the four analogy cases |
| `pbcube` | Formal sub-brand (probable) | Direct tier-2 first-party retailer statement naming the relationship outright |
| `mojue` | Sub-brand, understated confidence | Now has a direct tier-2 statement (`mojue-m3.yml`'s source) not yet reflected on the manufacturer record — recommend raising `uncertain` → `probable`, citing `thecubicle-mojue-m3-2020` |
| `mohuanshousu` | Sub-brand, understated confidence | Same as `mojue` — recommend raising via `thecubicle-mohuan-shousu-chufeng-2020` |
| `senhuan` | **Unresolved** (house brand / product line vs. formal sub-brand not distinguished by any source) | SEO title tag + single-retailer slug pattern only; no direct statement either way |
| `yancheng` | **Unresolved**, weakest of the seven | Same evidence class as SenHuan, plus the underlying 3x3 status of its only product was itself unconfirmed until this pass |

**Does the "GuoGuan template" reasoning generalise safely?** No, not uniformly, and the
manufacturer records' own notes already half-admit this by ranking their confidence differently
manufacturer-to-manufacturer — but the `kind` *value* chosen (`sub_brand` in all four cases) does
not reflect that ranking; only the attestation confidence does. The schema has no fourth option
between `sub_brand` and `manufacturer` for "MoYu's own internal product-line name, not a
separate corporate entity" — WeiLong and TangLong, the project's own contrast cases, are handled
by *not creating a manufacturer record at all* and recording them as aliases on `moyu.yml`
instead. That means the real, un-schematised choice being made for SenHuan/YanCheng is binary:
"formal enough to be its own manufacturer record" vs. "just an alias." Given the evidence, I
would not go so far as to say either is wrong — SenHuan in particular has a real multi-year,
two-generation product range (Mars, Mars S) that is harder to wave off as "just a name" — but
recording `kind: sub_brand` states more than the evidence shows, and I recommend the human
reviewer treat `senhuan` and `yancheng`'s `/kind` attestation as the two weakest links in this
whole cluster.

**Recommended state.** (1) Raise `mojue.yml` and `mohuanshousu.yml`'s `/kind` and `/parent_id`
confidence from `uncertain` to `probable`, citing the new family-pass sources, matching the
`pbcube` precedent. (2) Leave `senhuan` and `yancheng` at `uncertain` — do not raise them on the
strength of an unexamined analogy — and flag explicitly for a human to seek a second retailer's
slug pattern or any direct statement before Pass 3 treats their `kind: sub_brand` as settled.
(3) Consider recording, in a shared note, that the "no moyu- prefix ⇒ sub-brand" heuristic used
across this whole cluster is single-retailer-derived and has not been cross-checked at a second
storefront for any of the four analogy cases.

**Confidence in this assessment.** High that the evidentiary gap is real and under-flagged
relative to its own downstream use; Medium on the specific recommended confidence values (a
human weighing the same sources could reasonably land one notch differently).

**Downstream impact on Pass 3.** Medium. Wrong `kind`/`parent_id` here does not misattribute
facts about a product (unlike A1/A2) so much as it misrepresents the *shape* of MoYu's
corporate structure in the archive — four maybe-real, maybe-fictional "sub-brands" would sit in
the manufacturer register indefinitely if Pass 3 builds on top of them without revisiting. Not
critical (it doesn't corrupt any single fact), but a real structural debt that compounds the
longer it goes unexamined, and it affects five families (`mojue-m3`, `mohuanshousu-chufeng`,
`senhuan-mars`, `yancheng-yan3`, plus `guoguan-yuexiao` by association).

**Affected records.** `data/manufacturers/mojue.yml`, `mohuanshousu.yml`, `senhuan.yml`,
`yancheng.yml`, `guoguan.yml` (for contrast/consistency only, no change recommended);
`data/families/mojue-m3.yml`, `mohuanshousu-chufeng.yml`, `senhuan-mars.yml`, `yancheng-yan3.yml`.

---

### B2. The remaining sub-brand relationships named in the brief

Checked directly, not merely re-summarised:

- **`x-man-design` → `qiyi`.** `data/manufacturers/x-man-design.yml`, `/kind: confirmed`,
  resting on QiYi's own About page's explicit "a premium sub brand" statement
  (`theqiyi-about-us.yml`, verified verbatim). This is a genuine first-person tier-1 statement,
  not an inference — the strongest-evidenced relationship in this entire cluster. **No finding.**
- **`monster-go` / `swift-block` → `gan`.** Both `confirmed`, resting on GAN's own "Our
  Sub-brands" page plus, for Monster Go, an independently matching ICP business-registration
  filing number between GAN's and Monster Go's own sites (`monster-go-official-home.yml`) — a
  documentary fact (a government filing identifier), not a resemblance or a naming pattern. This
  is exactly the standard of evidence the MoYu cluster in B1 lacks. **No finding**, and worth
  citing as the positive template: this is what "confirmed, not inferred" sub-brand evidence
  looks like.
- **`limcube` → `fangshi`.** `confirmed`, resting on **two independently-worded retailer
  sources** (TheCubicle's structured `Manufacturer: FangShi` field; SpeedCubeShop's own
  "FangShi limCube..." product titling and collection placement) — genuinely independent
  (different retailers, different presentation), satisfying DATA_MODEL rule 9's two-tier-2 bar
  properly. **No finding.**
- **`cubicle-labs` → `thecubicle`.** Correctly `uncertain`, resting on one tier-4 source
  (Speedsolving wiki) for the parent claim specifically, honestly flagged as unresolved in the
  manufacturer record's own `notes`. Since `parent_id` is not on the manufacturer critical-field
  list, this does not block anything, and the record says so. **No finding** beyond noting the
  gap is already correctly recorded as a gap.

---

## Section C — GAN pilot re-audit

This is the highest-stakes section of this review by the brief's own framing, and rightly so:
**the GAN family layer is not merely a plan** — `npm run coverage` shows 48 models and 104
variants already built on top of these 11 families (`gan`, `monster-go`, `swift-block`
combined). Any family-boundary error here is not a future risk; it is already-realized
contamination that would need retroactive correction, not merely careful onward building.

### C1. `gan-flagship-series` (GAN11 → GAN17 as one family)

Verified directly against three independent citations: GAN's own English-site nav dropdown
literally labelled "Flagship Series" (`gancube-gan17-magdrive-product.yml`, excerpt confirmed
verbatim: "GAN16 Maglev, GAN15, GAN14, GAN12, GAN11 Series..."), GAN's Chinese-domestic site's
parallel "旗舰魔方" (Flagship Cube) heading, and GAN's own technology-history page's "heavyweight
flagship" language for the 2020 GAN 11 M Pro. This is a manufacturer-drawn boundary in two
languages on two of GAN's own domains, independently corroborating each other — genuinely strong
evidence, stronger than anything found in Section B. The record honestly documents and does not
suppress the complication (an older, messier November 2024 "Advanced Series"/"flagship-speed-
cubes" collection that mixed 356-branded products in) and explains why the 2026 nav is preferred
as the operative, more precisely-scoped evidence. **This reasoning holds up under challenge.**
No correction recommended.

### C2. `gan-v100` — excluded from Flagship Series

Three independent facts support exclusion: an "Advanced Series" breadcrumb (English site),
placement under "磁力系列" (Magnetic Series) rather than "旗舰魔方" on the same Chinese-site page
that lists GAN16 under *both* headings (making the omission a real signal, not incomplete
tagging), and TheCubicle's own copy calling GAN16, not V100, "the flagship" in the same sentence
describing V100's shared tension system. **One nuance the existing record does not address**,
found on cross-reading `gan-pass2.md` against `gan-flagship-series.yml`: the same "Advanced
Series" label that is used here as solid evidence to exclude V100 is, in the Flagship Series
record's own words, the label the researcher *dismissed as unstable merchandising noise* when it
appeared (in November 2024) attached to what is now considered core Flagship Series membership
(GAN11 M Pro through GAN15 Maglev). If "Advanced Series" was, at some point, GAN's own label for
what later became "Flagship Series," then V100's October 2025 "Advanced Series" breadcrumb could
in principle mean "V100 was tier-labelled the same way the flagship generations once were,"
rather than "V100 is definitively excluded from flagship." This does not overturn the
conclusion — the Chinese-site "Magnetic Series" placement and TheCubicle's "the flagship GAN16"
phrasing are independent of this concern and still support exclusion on their own — but the
"Advanced Series" data point specifically should not be treated as decisive in isolation, and
the record does not currently note this self-tension.

**Recommended state.** Keep V100 excluded from `gan-flagship-series` (the two other evidence
lines are sufd sufficient on their own). Add a note acknowledging the "Advanced Series" label's
own history of instability, so a future reader does not treat that specific citation as stronger
than it is.

**Confidence.** Medium — a real nuance, not a reversal.

**Downstream impact.** Low-Medium (the conclusion is over-determined by the other two facts; a
correction here would be a documentation clarification, not a re-parenting).

### C3. `gan-356` / `gan-357` / `gan-354` — consistency check

Checked the internal-consistency question directly: is the same principle ("a name the
manufacturer itself gives and markets independently ⇒ its own family") applied uniformly? Yes —
`gan-357` (a single, short-lived 2016 line with its own distinct marketing tagline, distinct
from every 356 tagline on the same 2016 page) and `gan-354` (a persisting 54mm compact-format
line with its own generation-2 product page) are both kept separate from `gan-356` on the
strength of GAN's own naming, not folded in just because they share a decade or a numeral
prefix. This is the same test used for `gan-flagship-series` vs `gan-356` (a positioning shift,
not a naming continuity, keeps them apart) applied in the opposite direction correctly: distinct
names stay distinct families regardless of how small or short-lived the line was. **No
inconsistency found; this is a genuinely well-applied, uniform rule.**

### C4. `gan-i-series` / `gan-i-carry-series` / `gan-ui-series` — three-way split

Supported by GAN's *own* storefront collection structure (three separately-titled collections,
verified in `gancube-collections-i-series.yml`, `-i-carry-series`, `-ui-series`, each an
independent tier-1 source), not merely retailer categorisation. The same "collection structure =
family boundary" rule is applied identically to Monster Go's mechanical/smart split
(`monster-go-3x3` vs `monster-go-smart-cube-series`), so the principle is used consistently
across GAN and its sub-brands, not selectively. **No finding.**

### C5. `monster-go-3x3` / `monster-go-smart-cube-series` / `swift-block-3x3`

Each cites its own GAN-storefront collection page directly, with positioning statements matching
the collection's own self-description (e.g. Monster Go 3x3's collection copy: "Affordable
Magnetic Speed Cube... budget-friendly price"). `swift-block-3x3.yml` honestly records tension
between its own price-derived `budget` positioning and the product's own marketing copy pushing
back against a "budget" framing, and keeps the price-based inference at `uncertain` rather than
resolving the tension by picking the flattering reading. **No finding**; this is good practice
worth naming as such.

---

## Section D — historical contradictions

### D1. `eastsheen-3x3` — the wiki/retailer contradiction, and an unsupported quotation

**Current state.** The family record and `research/notes/models/global-pass2-families.md` both
state, in quotation marks, that the Speedsolving wiki's Eastsheen page says **"East Sheen does
not produce 3x3 cubes"** — cited to `data/sources/speedsolving-wiki-eastsheen.yml` — and treat
that sentence as the substance of the contradiction with TheCubicle's own "a standard Eastsheen
3x3" product listing.

**Checked directly.** I opened `data/sources/speedsolving-wiki-eastsheen.yml` and read its
`excerpt` field in full. **That exact sentence does not appear in it.** The preserved excerpt
contains the infobox (founded 1981, Kaohsiung, "Years Active: 1981-Present") and one descriptive
paragraph about Eastsheen cubes generally ("lighter, smaller and cheaper," "purple/pink face").
It says nothing, verbatim, about 3x3 cubes specifically, let alone denying that Eastsheen makes
them. The claim "does not produce 3×3 cubes" appears three times across
`data/families/eastsheen-3x3.yml` and once in `research/notes/models/
global-pass2-families.md`, always in quotation marks, always attributed to this same source — and
never once actually present in what that source record preserved.

**Does the conclusion follow?** The family/notes' own account of *how* this was checked
(`global-pass2-families.md`, "Eastsheen" section) says the wiki page was "re-fetched live
(WebFetch, no archive.org capture available/used)" and its product list "confirmed... no 3x3
anywhere on the page" — i.e. the *absence of a 3x3 in the product list* was verified by a live
fetch, which is legitimate evidence for the underlying claim ("the page's own product list
doesn't include a 3x3"), but that is a materially weaker and different claim than "the page
states outright, 'East Sheen does not produce 3x3 cubes.'" The quoted sentence, presented as a
direct quotation, is not backed by the source record this archive actually preserved. Per
RESEARCH_SPEC §3.5, "the quotation must carry the claim standing alone" — this excerpt does not
carry this claim at all.

This does not mean the underlying finding (Eastsheen's product list, per the wiki, lacks a 3x3)
is false — the notes' own description of the product-list check is more careful and is plausible
on its own terms — but the archive currently contains a fabricated-looking direct quotation
(quotation marks around text the cited source does not contain) sitting at the center of the one
manufacturer record in this whole pass explicitly built around "a live, unresolved
contradiction." That is precisely the kind of thing this review exists to catch before it
calcifies into an assumed fact.

**Recommended state.** A human should either (a) re-fetch `speedsolving-wiki-eastsheen` (ideally
via `archive_url`, not `excerpt`, per the preservation preference order) and update its `excerpt`
to include the actual sentence, verbatim, if it is really there — or (b) if it cannot be
re-verified verbatim, remove the quotation marks from every place this phrase appears and replace
it with the more defensible, weaker claim the source can actually support ("the wiki's own
product list does not include a 3x3"). Do not treat the quoted sentence as citable until one of
these happens.

**Confidence.** High that the discrepancy is real (a direct textual comparison, not an
inference) — I compared the exact strings. Unresolved as to which underlying claim is true
(whether the sentence exists on the live page and simply wasn't captured, or was
misremembered/paraphrased into quotation marks it doesn't deserve).

**On the substantive question (OEM/rebrand, catalogue period, etc.), addressed as asked.** No
evidence was found this pass, by either the original researchers or this review, that the
Eastsheen-branded 3x3 is an OEM rebrand of another manufacturer's design — TheCubicle's own
"Manufacturer: Eastsheen" structured field is a direct first-party-adjacent attribution, not a
rebrand marker, and no second product or brand name is associated with it anywhere. The
contradiction most plausibly reflects **scope drift over time or catalogue incompleteness**
(the wiki's own product list may simply not have been updated to include a later, minor 3x3
SKU, or "does not produce 3x3 cubes" — if it exists on the live page at all — may describe the
brand's *current* focus rather than its full historical output) rather than a rebrand or a
factual error by either source. Recording it as an unresolved contradiction (rather than picking
a side) remains the correct call regardless of the citation defect above.

**Downstream impact on Pass 3.** Low-Medium on the substantive finding (the family's existence
and boundary look right on the surviving, better-supported evidence — the retailer's durable,
structured, multi-year listing). Medium on precedent: an unverified quotation sitting at the
center of a "genuine judgement call, documented in full" section is a bad model for future
passes to imitate, and worth a general reminder before Pass 3 proceeds.

**Affected records.** `data/families/eastsheen-3x3.yml`, `data/sources/
speedsolving-wiki-eastsheen.yml`, `research/notes/models/global-pass2-families.md` (prose only;
outside this review's write lane).

### D2. `mefferts-kokonotsu` and the "Molecube" lead

**Current state.** `manufacturer_id: mefferts`, no `rebrand_of` relationship recorded. The
record explicitly quotes unattributed customer reviews claiming resemblance to a "Molecube"
product, states plainly that this was not independently researched, and declines to record any
relationship on that basis, per DATA_MODEL §4.4 ("visual resemblance alone is a lead, not a
claim").

**Assessment.** This is the correct classification among the options given: neither confirmed
rebrand, probable rebrand, nor alternate naming — this is **unresolved**, and the record treats
it as exactly that, with no forced conclusion. The `manufacturer_id: mefferts` assignment itself
rests on a direct, structured retailer attribution (not customer-review hearsay), which is a
materially different and stronger evidentiary basis than the Molecube lead, so the two claims
are correctly not conflated. **No correction recommended.** This is worth naming as a positive
example: exactly the discipline the brief asks for ("No `rebrand_of` may be recommended without
decisive evidence").

---

## Section E — zero-family classification

Checked all eight against the four-way taxonomy (A: no in-scope family found; B: products belong
elsewhere; C: out of scope; D: insufficient evidence). Findings:

| Manufacturer | Recorded reason | Verified classification | Evidence depth |
|---|---|---|---|
| `zcube` | Every found "Z-" 3x3 is either an aftermarket mod of a *named* other manufacturer's cube (MFJS MF3RS, QiYi Warrior W) or a non-WCA shape mod | **B** (products belong to other manufacturers' model trees) / partly **C** for the shape mods | Strong — ~90-URL retailer sweep, per-product descriptions read, cross-manufacturer leads explicitly handed off |
| `verypuzzle` | Entire found catalogue is shape mods or non-3x3 twisty types | **C** | Strong — 52-URL sweep, two most-plausible candidates fetched and read individually |
| `limcube` | Entire found catalogue is 2x2/Skewb/10x10-based, no 3x3x3 mechanism anywhere | **C** | Strong — 37-URL sweep, the one deep line (Master Mixup) fetched and confirmed non-3x3x3 |
| `xinlexin` | First-party corporate site directly resolves the one open lead: the only puzzle-adjacent line ("Baibian Mowang") is Magic Snake toys, not cubes | **A**/**C** (no 3x3 exists; explicitly confirmed by tier-1 first-party source) | Strongest in this batch — tier 1, not tier 4 |
| `hellocube` | Two independent retailers, consistent: every product is a Gear Cube or Mirror Cube mechanism | **C** | Strong — 11 + 17 URL cross-retailer sweep |
| `cubetwist` | Every product is a shape mod or DIY bandaging kit; a prior lead (aftermarket/rebrand) explicitly tested and did not hold | **C** | Strong — 40-URL sweep, a genuine URL-reuse trap caught and correctly not acted on |
| `ninja` | Every product is a Ghost Cube (non-WCA shape mod); prior aftermarket lead tested and did not hold | **C** | Strong — cross-retailer, 6 + 16 URLs |
| `lanlan` | "No source found this pass documents a standard, WCA-format LanLan 3x3" | **This is the weak point of the batch — see below** | **Thin. Possible D masquerading as A.** |

**LanLan, examined directly.** `data/manufacturers/lanlan.yml`'s own header states LanLan was
"seen at both retailers in the pass-0 sweep" — i.e. LanLan has a real, known retail footprint.
Yet the Pass 2 zero-family conclusion for LanLan rests on exactly one source, a Speedsolving
wiki page, which itself states LanLan was "**originally known for their standard cubes**, they
now produce many shape mods" (a phrase that, read literally, implies LanLan *did* make ordinary
cubes at some point) alongside a list that names only a 2x2, 4x4, a Skewb, and an undated,
undescribed "LanLan 3x3 Void cube." **No retailer product-slug sweep (`thecubicle.com/products/
lanlan*`, `speedcubeshop.com/products/lanlan*`) was run for LanLan anywhere in this pass or the
prior one** — the exact check that produced strong, multi-source confirmation for every other
zero-family case in this table (Z-Cube, VeryPuzzle, LimCube, HelloCube, CubeTwist, Ninja all got
one or two independent retailer sweeps; Xinlexin got a first-party site check). LanLan is the
only zero-family conclusion in the entire batch resting on a single tier-4 source with no
retailer verification at all, despite pass 1's own note that LanLan has retail presence at both
major retailers this project otherwise uses for exactly this kind of check.

**Does the conclusion follow?** Not with the same confidence as its seven siblings. This reads
as a **D (evidence insufficient) that was recorded as an A (no in-scope family exists)** without
the retailer-sweep step that every comparable case in this same document performed. The "Void
Cube" lead is explicitly left open in the record, which is honest, but the *headline* zero-family
finding itself — "no standard 3x3 exists" — has not been tested against LanLan's own confirmed
retail footprint the way Xinlexin's, HelloCube's, or CubeTwist's zero-family findings were.

**Recommended state.** Before Pass 3 treats `lanlan` as closed, run the same
`thecubicle.com/products/lanlan*` / `speedcubeshop.com/products/lanlan*` prefix sweep applied to
every other manufacturer in this table. If it comes back empty or confirms only shape mods, the
zero-family conclusion is then evidenced to the same standard as its siblings and this finding
resolves itself. If it surfaces a standard 3x3 SKU, a family is missing.

**Confidence.** High that the evidentiary gap is real (a direct comparison of method across nine
similar sections in the same document); Medium on whether a sweep would actually surface a
missed family (the wiki's own framing makes a genuine 3x3 line plausible but far from certain).

**Downstream impact on Pass 3.** Medium. If a real LanLan 3x3 exists and Pass 3 proceeds without
it, that is precisely "a missed family... a systematically missing region of the archive" that
RESEARCH_SPEC §5 warns "nothing downstream will reveal."

**Affected records.** `data/manufacturers/lanlan.yml`; no family record exists yet to correct.

---

## Section F — scope-class review: can the schema represent this cleanly?

Read `schema/family.schema.json` (no `scope_class` field exists on `family` — confirmed by
inspection) against DATA_MODEL §1.4 ("Every `model` and `variant` carries a `scope_class`" —
family is deliberately excluded) and RESEARCH_SPEC §2.2/§2.4.

**Verdict: the schema handles this correctly, and Pass 2 applied it correctly.** Every family
reviewed in this section (`maru-nano`, `calvins-crazy-3x3`, `calvins-crazy-mirror-3x3`,
`calvins-bandaged-3x3-maze-300`, `witeden-mixup-3x3`, `witeden-super-3x3x3`,
`witeden-camouflage-3x3`, `mefferts-kokonotsu`) correctly declines to assign `scope_class` at
the family level (the field does not exist there) and explicitly, repeatedly defers the actual
`conditional` admission decision — which requires `scope_justification` and a Tier 1–3 source
per rule 15 — to Pass 3/4 where `model`/`variant` records will actually carry it. This is not a
workaround; it is the schema working as designed: family records establish identity only, and
the significance-argument-plus-source requirement attaches where it belongs. `witeden-camouflage-
3x3.yml` even records a specific self-correction (catching that Calvin's Puzzle's similarly-named
"Mirror Camouflage 3x3x3" is actually a 4x4x4, and re-checking WitEden's own Camouflage product
specifically to avoid the same trap) — a genuinely good practice this review has no complaint
about.

**One real ambiguity, not a schema defect.** RESEARCH_SPEC §2.4 excludes "puzzles other than
3×3×3," but does not give an operational test for a puzzle that is *visibly and mechanically
3x3x3-shaped but plays by different rules* (a Mixup Cube's edge/center swap; a Crazy cube's
locked centers; a Camouflage cube's off-axis rotation). Pass 2 resolved this consistently and
carefully in every case checked — including rejecting look-alikes that turned out, on direct
inspection, to be built on a different base size (Calvin's "Mirror Camouflage 3x3x3" → actually
4x4; LimCube's "Master Mixup" line → actually 10x10x10-based) rather than trusting product names.
This is the conditional-admission pathway functioning exactly as intended, case by case. I do not
recommend a schema change. I would recommend RESEARCH_SPEC gain one clarifying sentence stating
the test actually used in practice ("a 3x3x3-cut mechanism with an altered move set is
conditionally in scope; a puzzle built on a different N×N×N base is out of scope regardless of
its marketed name"), since that is the de facto rule this pass applied consistently but which is
not written down anywhere for the next researcher to find without reading 2,300 lines of session
notes.

**Confidence.** High — this is a straightforward schema read, not a judgment call.

**Downstream impact on Pass 3.** Low. No correction needed to any record; a documentation
addition only.

---

## Section G — additional findings

### G1. Inconsistent application of `successor_family_id` across near-identical evidence

Cross-checked every family carrying or discussing `successor_family_id`. Two pairs were
explicitly built by the same researcher, in the same document, on the same evidentiary
principle — a single wiki sentence of the form "X was an improved version of Y" — and treated
differently:

- `cyclone-boys-feiwu.yml` → `successor_family_id: cyclone-boys-feichi`, justified: "the wiki's
  own direct statement ... ('An improved version of the FeiWu'), **the same evidentiary bar
  applied to mfjs-mf3/moyu-rs3m and yuxin-fire/yuxin-water this pass**."
- `yuxin-fire.yml` → `successor_family_id: yuxin-water`, same bar, same wording pattern
  ("successor to the YuXin Fire").
- `qiyi-thunderclap`/`qiyi-bullfight`, by contrast: the wiki states, in the *same source* used
  for Cyclone Boys (`speedsolving-wiki-qiyi-products.yml`, verified directly): "QiYi Thunderclap
  ... was an improved version of the Bullfight" — textually the same construction as the
  Cyclone Boys case — yet `qiyi-bullfight.yml` carries **no `successor_family_id` field at all**,
  and the QiYi section of `global-pass2-families.md` instead states this relationship was
  deliberately left as prose only, "flagged for a human to consider setting it directly."

**Does this matter?** Only moderately — DATA_MODEL does not mandate `successor_family_id` be
set whenever evidence permits it, and leaving it as prose is not wrong. But the QiYi section's
own text implies the *researcher's own stated bar* ("improved version of") was met and
deliberately not acted on, while the identical bar was acted on twice elsewhere in the same
document without comment. This is an internal inconsistency in how the same rule was applied,
not a wrong fact — exactly the category of finding the brief asks to surface even without a
severity crisis attached.

**Recommended state.** A human should either (a) set `qiyi-bullfight.yml`'s
`successor_family_id: qiyi-thunderclap` to match the standard applied elsewhere, or (b) if there
is a considered reason QiYi's case is different (e.g. Bullfight/Thunderclap sharing less design
continuity than Fire/Water or MF3/RS3M), state that reason explicitly rather than leaving the
asymmetry unexplained.

**Confidence.** High that the inconsistency exists (a direct textual comparison); Medium on
which side should move, since I cannot independently verify which relationship, if either, is
factually closer to a true "successor."

**Downstream impact on Pass 3.** Low. `successor_family_id` is a navigational/relationship
convenience, not a fact that misattributes specifications; the cost of the current asymmetry is
a slightly less useful lineage graph, not a corrupted one.

**Affected records.** `data/families/qiyi-bullfight.yml`, `qiyi-thunderclap.yml`,
`cyclone-boys-feiwu.yml`, `cyclone-boys-feichi.yml` (not independently re-verified, cited only
for the comparison), `yuxin-fire.yml`, `yuxin-water.yml`.

### G2. `manufacturer.kind` has no vocabulary value for "genuinely unresolved corporate structure"

`vocab/manufacturer-kinds.yml` allows exactly four values: `manufacturer`, `sub_brand`,
`service`, `collaborator`. There is no fifth value for "we cannot tell whether this is a formal
sub-brand or merely an internal product-line name" — the only mechanism available is to pick one
of the four `kind` values and express doubt entirely through the attestation's `confidence`
field. This is what every record in Section B1 correctly does, and it is functionally adequate
(the confidence value does carry the doubt), but it means the schema's structural field (`kind`)
and its evidentiary caveat (`confidence`) can drift apart in how a future consumer reads them —
someone querying "list all MoYu sub-brands" gets `mojue`, `senhuan`, and `yancheng` back with
equal structural weight to `mfjs`, even though the evidence behind them is not remotely
equivalent. I do not recommend adding a vocabulary value for this (it would invite the same
`kind: unresolved` value being used as a substitute for actually researching the question, the
opposite of what this schema is trying to enforce) — flagging it as an observation for the human
reviewer, per the instruction to record schema friction rather than work around it silently.

**Confidence.** High that the gap exists; this is a direct schema read, not an inference.

**Downstream impact on Pass 3.** Low — a modeling observation, not a defect requiring
correction before Pass 3 opens.

### G3. `data/sources/thecubicle-eastsheen-wall-stickers.yml`'s own `reliability_note` disagrees
with the family record it supports

Minor, but worth recording since it was found in the course of verifying D1: the source's
`reliability_note` states the DianSheng-style parallel claim should be "resolved in favour of
this direct, specific, structured-field evidence" without qualification, while the family record
it backs (`eastsheen-3x3.yml`) correctly keeps the contradiction open rather than resolved. Not a
contradiction in substance (the family record is the more careful of the two), but a
documentation-consistency nit a human should tidy when next touching either file.

### G4. `diansheng-mscube`'s source reliability_note also states a confidence value the family
record does not use

`data/sources/speedsolving-wiki-diansheng-products.yml`'s `reliability_note` states the claim
"is recorded at `reported` confidence on diansheng-mscube.yml" — but the actual family record
uses `confidence: uncertain`, not `reported`, on that attestation. `uncertain` is in fact the
better-justified value here (a tier-4-only, uncorroborated claim; RESEARCH_SPEC's confidence
table reserves `reported` for a tier-3 source, and tier 4 "corroborates only... never establishes
alone"). This is a second, independent instance of a source's own `reliability_note` making a
claim about a downstream record that does not match what that record actually says — worth a
human pass across `data/sources/*.yml` `reliability_note` fields generally to check they still
match the records they describe, since two instances found by spot-checking (not an exhaustive
sweep) suggests this may not be isolated.

---

## Pass-3 hazards, ranked by contamination risk

| Rank | Item | Why it matters | Records affected |
|---|---|---|---|
| **Critical** | None found. | No family-boundary error was found that would corrupt a large swath of already-built downstream data with high confidence of being wrong. The closest candidates (below) are either already flagged by the original researchers or bounded to one lineage. | — |
| **High** | A1 — `qiyi-valk` manufacturer_id (qiyi vs x-man-design) | A five-generation flagship lineage's entire manufacturer attribution rests on a title-tag reading and a wiki section heading; no source states the relationship directly either way; wrong now means reparenting every Valk model/variant Pass 3 creates | `data/families/qiyi-valk.yml` |
| **High** | C2 — the "Advanced Series" label's internal inconsistency between `gan-flagship-series` (dismissed as unstable) and `gan-v100` (relied on as decisive) | GAN's family layer already has 48 models / 104 variants built on it; this is realized risk, not future risk, even though the net conclusion is likely still correct on the other two evidence lines | `data/families/gan-v100.yml`, `gan-flagship-series.yml` |
| **Medium-High** | A2 — `diansheng-mscube` manufacturer_id, with the disputed attribution baked into an immutable id | A single uncorroborated wiki sentence, contradicted by the product's own silence on DianSheng branding, sets a permanent identifier; correction later requires an id migration, not a field edit | `data/families/diansheng-mscube.yml` |
| **Medium** | E — `lanlan` zero-family conclusion under-evidenced relative to its own siblings | The one zero-family case in the batch with no retailer-sweep verification, despite pass 1 noting LanLan has real retail presence; a missed family here is invisible downstream by construction | `data/manufacturers/lanlan.yml` |
| **Medium** | B1 — four MoYu "structural analogy" sub-brand records (`mojue`, `mohuanshousu`, `senhuan`, `yancheng`) | `kind: sub_brand` is asserted uniformly across four records whose evidence quality actually varies from "has a direct tier-2 statement" to "SEO title tag plus one retailer's slug habits"; doesn't corrupt a fact but misrepresents corporate structure indefinitely if unexamined | `data/manufacturers/mojue.yml`, `mohuanshousu.yml`, `senhuan.yml`, `yancheng.yml` |
| **Low-Medium** | D1 — unsupported "does not produce 3x3 cubes" quotation | The central dramatic tension of the one Eastsheen family record rests on a quotation the preserved source does not contain; the underlying zero-vs-one-family conclusion still looks right on other grounds, but the citation itself should not be trusted as-is | `data/families/eastsheen-3x3.yml`, `data/sources/speedsolving-wiki-eastsheen.yml` |
| **Low** | G1 — `successor_family_id` inconsistency (QiYi vs. Cyclone Boys/YuXin) | Cosmetic/navigational only; does not misattribute any specification | `data/families/qiyi-bullfight.yml` and siblings |
| **Low** | G2 — no `kind` vocabulary value for unresolved corporate structure | Schema-design observation, not a defect | `vocab/manufacturer-kinds.yml` |

---

## Executive verdict

**Ready after minor corrections — not blocked, and not ready to wave through unconditionally.**

The 122-family layer is, on the whole, unusually well-researched for this stage: multi-source
corroboration where it counts (GAN's two-domain, two-language nav evidence; Monster Go's ICP
filing match), honest, explicit flagging of every genuine judgement call this review re-examined
(Eastsheen, Kokonotsu, GAN V100, MoJue/SenHuan), and — most importantly — a consistent, visible
discipline of *not* silently resolving ambiguity, which is exactly the standard this review was
asked to hold it to. `npm run validate`/`lint`/`duplicates`/`coverage` all pass clean, and the
122 records sit correctly at `status: drafted`, matching the pass they belong to.

Against that: two `manufacturer_id` assignments (`qiyi-valk`, `diansheng-mscube`) carry
meaningfully higher stakes than their `uncertain` confidence markers alone convey, because they
sit at the root of a containment chain and one of them is baked into an immutable id; one
zero-family conclusion (`lanlan`) has not been held to the same evidentiary standard as its seven
siblings; four sub-brand `kind` assignments in the MoYu cluster assert more structural certainty
than their evidence supports, with two of them (`mojue`, `mohuanshousu`) now sitting on stronger
evidence than their own manufacturer records reflect; and one load-bearing quotation
(`eastsheen-3x3`) does not match what its cited source actually preserved.

None of these is a fact silently fabricated into the record — every one was already flagged as
uncertain by the original research, which is the behavior this whole review process exists to
reward — but several are flagged at a lower stakes-level than they deserve given what Pass 3
will build on top of them. **Recommendation: resolve the two High-rank items (A1, C2) and the
Medium-High item (A2) before Pass 3 opens on GAN's Valk-adjacent and MsCube-adjacent lineages
specifically; Pass 3 can proceed on the other ~115 families in parallel without waiting**, since
the remaining findings are bounded, already flagged in some form, or purely navigational.

What the archive currently does not know that it should: **whether "Valk" is QiYi's own house
line or X-Man Design's, and whether "MsCube" is actually a DianSheng property or an independent
brand mistakenly nested under one** — both are root-of-lineage identity questions no source in
the archive currently answers directly, and Pass 3 will inherit whichever answer is on file
whether or not it is correct.
