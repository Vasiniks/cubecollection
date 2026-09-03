# Pass 2 source-independence audit

Scope: `data/sources/*.yml` (283 files) and every attestation that cites them across
`data/families/*.yml` (122), `data/manufacturers/*.yml` (54), and the GAN-pilot
`data/models/gan/**` / `data/variants/gan/**` trees (48 + 104 files, already at pass 3/4 depth
per RESEARCH_SPEC §7). `npm run validate` passes clean at the time of this audit (616 records,
0 errors, 0 warnings) — none of the findings below are things the toolchain can catch; all
were found by reading sources against the claims they back, per the brief.

Method: built a citation graph (which source backs which JSON-Pointer attestation, at what
confidence), ranked every `confirmed`/`probable` attestation on `manufacturer_id`, `parent_id`,
`introduced`, and `positioning` for close reading, cross-publisher shingle-matched every
source's `excerpt` for verbatim copy, and chased the five named leads to source text.

## Executive summary

**The evidence base is sound enough to build on, with one systemic defect that needs a
decision before Pass 3 scales, and two live, specific contaminations that need a one-line
fix each.**

The manufacturer-register and family work is, on the whole, unusually careful: disputes are
genuinely recorded as disputes (not silently picked), tier-1 marketing superlatives are
consistently separated from tier-1 specifications, machine-translated sources uniformly carry
original text plus a `reliability_note`, and several specific known traps (a domain collision,
a URL-reuse trap, a cross-product date artifact) were independently found and correctly
avoided or corrected. See "Sources that are genuinely strong" below — this is not a
hunt-for-problems-only report.

The one systemic defect: **43% of families (53/122) carry at least one `reported`- or
`probable`-confidence attestation resting solely on a source whose default tier is 4** (the
Speedsolving.com wiki's per-manufacturer "numbered products" pages, cited 189 times across the
corpus and among the single most-relied-on sources in the entire register). Per RESEARCH_SPEC
§3.1's own table, tier 4 "corroborates only, never establishes" — a claim resting on tier 4
alone should carry `uncertain`, not `reported`/`probable`. This is not a hypothetical: it
governs 32 of the 122 families' `/introduced` field specifically (26%), the field every variant
beneath a family inherits its earliest-known chronology from. This needs a human decision, not
a silent fix: either the wiki genuinely functions as tier-3 "long-form community documentation"
for these specific pages and should carry an explicit tier override with a `reliability_note`
(rule 7), or the confidence on ~110 attestations should be downgraded to `uncertain`. Recorded
as a finding, not acted on.

Two live, specific contaminations, both instances of the exact catalogue-migration-date
artifact the task brief asked me to verify (lead 1): `data/families/gan-354.yml` and
`data/models/gan/gan-354-m.yml` still hold `probable` confidence on an introduction date that
is provably the same cross-product artifact date the researcher themselves identified and
excluded elsewhere in the same pass. `data/families/qj-candy-3x3.yml` and
`data/families/qj-pillowed-3x3.yml` have a milder version of the same problem. Details below.

## 1. Circular / non-independent corroboration

**No case of true circularity (A cites B, B cites A, or both descending from one undisclosed
origin) was found.** Cross-publisher shingle-matching every source excerpt against every other
source excerpt from a different publisher turned up only two overlaps of ≥2 eight-word
sequences in the whole 283-source corpus:

- `gancube-gan354-m-v2-product` (GANCUBE) / `thecubicle-gan-354-m` (TheCubicle) — expected and
  correctly handled: a retailer's copy plausibly echoing a manufacturer's own marketing
  language for the same product. Not treated as two independent sources for anything beyond
  `probable`/`reported`-level claims already qualified as single-source.
- `speedsolving-wiki-mfjs-products` (Speedsolving.com) / `thecubicle-mofang-jiaoshi-mini-3x3-prefix`
  (TheCubicle) — both cited together on `mfjs-mini-3x3` `/description` at `reported` only, not
  `confirmed`, so no independence is being claimed that the overlap would undermine.

Same-publisher, different-page pairs are common (e.g. two `getgocube.com` pages, two
`dianshengtoys.com` captures, two SpeedCubeShop product pages, two GAN pages) but these are
**not** independence violations in this archive's terms: DATA_MODEL's confirmation rule for
tier 1 is "a tier 1 source states it" (no second source required), so citing two pages from the
same first-party manufacturer site is redundancy, not manufactured independence. I checked each
of these pairs' actual wording and none paraphrase-launders one page into looking like a second
source; each pair adds genuinely distinct content (e.g. `getgocube-com-2019-basic-edge-skus`
gives SKU/pricing, `getgocube-com-about-2019` gives corporate self-description).

The genuine two-tier-2-source `confirmed` claims I checked for real independence were clean:

- `limcube` `/parent_id` — `thecubicle-limcube-fangshi` (TheCubicle's structured spec field,
  three separate LimCube product pages) and `speedcubeshop-fangshi-collection-2021`
  (SpeedCubeShop's own collection-URL taxonomy, different wording, different products cited).
  Genuinely independent; both sources' own `reliability_note`s explicitly flag the
  cross-check. **Strong.**
- `moyu` sub-brand register (`mfjs`, `guoguan`, etc.) — tier-1 title-tag enumeration plus a
  tier-4 wiki plus a tier-2 retailer catalogue path, three different formats of evidence, none
  copying another's wording.
- `monster-go` / `swift-block` `/parent_id` — GAN's own "Our Sub-brands" page plus an
  independently-checked **ICP filing-number match** between `gancube.cn` and
  `monster-go.com`'s footers. This is documentary-grade corroboration, stronger than the
  typical retailer-copy case this audit is built to catch. **Strong.**
- `x-man-design` `/parent_id` — QiYi's own 2026 "family of brands" page, a 2018 QiYi storefront
  capture (explicitly checked and found to be a *different* page than expected after an earlier
  pass-0 false negative), and the Speedsolving wiki, none overlapping in wording.

## 2. Excerpt-vs-claim mismatches

**`data/families/dayan-panshi.yml`, `/introduced`, currently `confirmed`.** Sources:
`speedsolving-wiki-dayan-products` (tier 4, states "Released February 2013") and
`dayancube-official-2013` (tier 1, DaYan's own August 2013 site capture, which lists "Dayan VI
Panshi" as a product name — it does **not** state a release date at all). The record's own
attestation note admits this directly: "consistent with, though not an independent
confirmation of, the exact February 2013 date." A tier-1 source that only shows a product
existed by a later date is not a tier-1 statement of the claimed date, and the sole source that
actually states "February 2013" is tier 4, which per RESEARCH_SPEC §3.1 cannot establish a
claim alone. **This should be `reported` at best, arguably `uncertain`** (see finding 6, same
underlying tier-4 problem), not `confirmed`. The record's prose is honest about the gap; the
confidence field is not.

**Pattern also present, less severely, in `gan-flagship-11`/`gan-flagship-series`.** These are
*not* mismatches — I read `gancube-cn-core-technology-history`'s excerpt closely and it does
explicitly date the "年度重磅旗舰" (year's flagship) GAN 11 M Pro to 2020 in GAN's own
first-party technology-history timeline, so `confirmed` on `/introduced: 2020` is properly
earned. Flagged here only to show the check was done and passed, since it was on the priority
list for a reason.

## 3. Preservation failures and provenance mismatches

No source in the corpus records `preservation_method: none`. No source declares
`preservation_method: archive_url` with a missing `archive_url` field. No `link_status:
altered` or `redirected` source exists whose preservation rests only on that URL (all use
archive_url/local_capture/excerpt independent of live link health). Preservation discipline is
good structurally.

**One already-found-and-fixed provenance mismatch, confirmed as asked:**
`data/sources/thecubicle-moretry-tianma-x3-v3-snap-2022.yml` explicitly documents its own
correction — an earlier draft assumed a 2022-07-06 capture; the content actually quoted was
from the site's 2025-07-10 capture, and the source's own `archive_url` now points at the
correct snapshot with the discrepancy noted in `reliability_note` rather than silently carried
forward. I did not find a second, unfixed instance of this exact pattern elsewhere in the
corpus (checked all `thecubicle-moretry-*` and spot-checked GAN, QiYi, DaYan bundles).

**One live, structural preservation weakness (lead 5): `rubiks-com-classic-special-editions-2024`.**
This source deliberately bundles six *different* Rubik's product pages (Phantom, Crystal,
Retro, Re-Cube, Coach Cube, Impossible), each captured on a different date, into one source
record, with the stated rationale that all six back one coarse family-level boundary claim
("just like the classic Rubik's Cube, surface/material/sticker difference only"). **For its
current, narrow use — `rubiks-classic.yml`'s `/description` at `probable`, nothing per-product
— this is defensible and honestly scoped**, and the `reliability_note` explicitly warns a
future researcher to split it before pass 3/4 fills individual products. But the structural
problem is real: the record's `url`/`archive_url` fields point at **only one of the six pages**
(Phantom, 2024-06-19). The other five products' only preservation is the inline excerpt text
quoting a date and a snippet; there is no `archive_url` a future tool or human can follow to
verify, say, the Retro-specific sentence independently of trusting this file's transcription.
If this source ID is ever cited (even accidentally, given its generic name) for a per-product
critical field on Crystal, Retro, Re-Cube, Coach Cube, or Impossible, QC rule 8 would pass on
paper (`preservation_method: archive_url` is set) while the archived URL would demonstrably not
correspond to the product being attested — precisely the class of error the MoreTry case above
already produced once. **Recommend splitting into six per-product source records now** — each
capture is already in hand and cheaply re-filed — rather than deferring to pass 3/4 as planned.

I did not find any other bundled multi-page source construction like this one in the corpus.

## 4. Mis-tiered sources

I found no source whose `kind` maps to the wrong default tier, and no source with a `tier:`
override lacking a `reliability_note` (rule 7's silent-override case did not occur — because no
source in the corpus actually sets an explicit `tier:` override at all; every source relies on
the `vocab/source-kinds.yml` default). That absence is itself worth surfacing: **the corpus
never uses the override mechanism**, even in the one place it plausibly should (see next
section) — the Speedsolving.com wiki's per-manufacturer "numbered products" pages are treated
throughout as if they carry more evidentiary weight than a default-tier-4 kind actually
licenses, without ever formally reclassifying them.

## 5. The systemic finding: tier-4 sources doing tier-3 work

`vocab/source-kinds.yml` defaults `kind: wiki` to tier 4 ("unattributed wikis... corroborates
only, never establishes"). Every `speedsolving-wiki-*-products` / `speedsolving-wiki-<brand>`
source in the corpus is filed at this default — none carries a `tier:` override. Several of
these sources' own `reliability_note`s candidly self-describe as "Tier 4, community-edited, no
citation trail for any individual release date" (e.g. `speedsolving-wiki-dayan-products`).

Despite that, **107 attestations carry `confidence: reported` and 4 carry `confidence:
probable` resting on one of these tier-4 wiki sources alone** — no tier 1-3 corroboration.
Per RESEARCH_SPEC §3.1's own table, `reported` requires "a tier 3 source"; a tier-4-only claim
should read `uncertain` ("a single weak source"). This governs:

- **53 of 122 families (43%)** carrying at least one such attestation.
- **32 families' `/introduced` field specifically (26%)**: `cyclone-boys-feichi`,
  `cyclone-boys-feiwu`, `cyclone-boys-mini-3x3`, `dayan-guhong`, `dayan-lingyun`,
  `dayan-lunhui`, `dayan-taiyan`, `dayan-tengyun`, `dayan-xiangyun`, `dayan-zhanchi`,
  `diansheng-type-e`, `mf8-crazy-3x3x3`, `mf8-legend`, `mfjs-meilong`, `mfjs-mf3`,
  `qiyi-m-pro`, `qiyi-mp`, `qiyi-ms`, `qiyi-sail`, `qiyi-thunderclap`, `qiyi-warrior`,
  `shengshou-aurora`, `shengshou-fangyuan`, `shengshou-legend`, `shengshou-pearl`,
  `shengshou-wind`, `yj-chilong`, `yj-guanlong`, `yj-jinjiao`, `yj-mgc`, `yj-ruilong`,
  `yj-sulong`.
- Several `/positioning` and `/aliases` fields on manufacturer records too (`guoguan`, `mfjs`,
  `qiyi` native names at `probable`; `moyu-rs3m` `/positioning` at `probable`).

**This is a defensible research convention, not obviously an error** — these Speedsolving wiki
pages are a maintained, internally-consistent, community-curated reference with real editorial
history, closer in character to RESEARCH_SPEC's tier-3 "long-form community documentation"
bucket than to the "unattributed wiki" example tier 4 is built around, and one of them
(`speedsolving-wiki-dayan-products`) is independently corroborated at tier 1 on its *numbering
scheme* by `dayancube-official-2013`. But that argument was never made explicitly and recorded
as an override, so as filed, the confidence table is not being applied as written. I am
recording this as a finding for human adjudication with two honest options, not silently
picking one:

1. **Downgrade** all tier-4-only `reported`/`probable` attestations to `uncertain` (mechanical,
   consistent with the tables as written), or
2. **Reclassify** the Speedsolving.com per-manufacturer "numbered products" pages specifically
   (not wikis generally) to tier 3 via an explicit `tier: 3` override plus a `reliability_note`
   arguing the "long-form community documentation" case, after which `reported` becomes
   correctly earned wherever it currently sits.

Either is legitimate; the current silent middle state is not.

## 6. Verified leads

**Lead 1 — the `Added: 2018-09-11` artifact.** Verified independently: the exact string
recurs verbatim across 21 source files spanning CubeStyle, GAN, GuoGuan, GuoJia, KungFu, Maru,
MoJue, MoHuanShouSu, NewIsland, QJ, SenHuan, YanCheng, and Z-brand products — a
catalogue-migration artifact, not a per-product date, exactly as the brief described. A
sibling artifact, `Added: 2022-03-14`, recurs across four MoreTry TianMa X3 sources and is
correctly flagged and excluded everywhere it appears.

`giiker-m3` is indeed corrected, with a clear, dated note explaining the cross-agent finding
and replacing the artifact date with an honest Wayback-capture upper bound. Most other affected
families correctly exclude the date and say so explicitly (`kungfu-longyuan`, `kungfu-qinghong`,
`kungfu-dot-cube`, `newisland-phoenix`, `senhuan-mars`, `mohuanshousu-chufeng`, `guojia-type-a-chun`
all state "deliberately not used" or equivalent).

**Two missed instances found, exactly as the brief asked me to search for:**

- **`data/families/gan-354.yml` and `data/models/gan/gan-354-m.yml` — not corrected, live
  contamination, higher-severity than the fixed cases.** Both records' `/introduced` (family)
  and `/announced` (model) attestations rest at `confidence: probable` on
  `data/sources/thecubicle-gan-354-m.yml`, whose excerpt states "Added: 2018-09-11" — the exact
  artifact date. Neither the source's own `reliability_note` nor either attestation's note
  mentions the cross-product recurrence, even though the same researcher documented that exact
  recurrence in `thecubicle-mojue-m3-2020`'s `reliability_note` in the same pass. This is a GAN
  pilot record (full model/variant depth already exists downstream), so the error sits one
  level closer to build output than the family-only cases. **Recommend downgrading both
  attestations to `uncertain` and replacing the evidentiary basis with the archive capture's own
  timestamp as an "existed by" bound, matching the `giiker-m3` correction pattern exactly.**
- **`data/families/qj-candy-3x3.yml` and `data/families/qj-pillowed-3x3.yml` — milder version
  of the same miss.** Both already carry `confidence: uncertain` (so the damage is contained),
  but both still treat "Added: 2018-09-11" as a real, if imprecise, per-product listing date
  ("2018-09" at month precision, `circa`) rather than recognizing it as the same artifact —
  and the underlying source files (`thecubicle-qj-candy-3x3-product-2019`,
  `thecubicle-qj-pillowed-3x3-product-2019`) go further and record `published: { value:
  "2018-09-11", precision: day, qualifier: exact }`, treating the artifact as an exact,
  confirmed publication date at the source level. Recommend the same correction pattern as
  `giiker-m3`: drop the date, keep only the capture date as an upper bound.

**Lead 2 — the `gocube.com` domain collision.** Verified and correctly handled. Every GoCube
source in the corpus uses `getgocube.com` or `particula-tech.com`; `data/families/particula-gocube.yml`
contains an explicit, dated "domain-name hazard" paragraph documenting that `gocube.com`
(without "get") resolves to an unrelated Quebec storage company at every capture checked
2018–2024, and that this is a coincidental collision, not a rebrand. No source cites the wrong
domain. **Correctly avoided.**

**Lead 3 — the `cubetwist-conjoined-3x3` URL-reuse trap.** No family, model, or source record
named `cubetwist-conjoined-3x3` (or citing Calvin's Puzzle content as CubeTwist) exists in
`data/` — confirmed by exhaustive grep. The trap is documented in
`research/notes/models/global-pass2-families.md` (search "cubetwist-conjoined-3x3"): the
researcher found the slug pointed to a page whose own structured spec table read "Manufacturer:
Calvin's Puzzle," correctly identified it as a Shopify-handle reuse rather than a
CubeTwist/Calvin's relationship, and explicitly declined to act on it ("not actioned — belongs
to Agent A"). **Correctly avoided; no record contamination.** This is a good example of a lead
being chased and closed rather than either ignored or wrongly acted on.

**Lead 4 — MoJue / MoHuanShouSu "MoYu sub-branded" retailer copy.** TheCubicle's product
descriptions for `mojue-m3` and `mohuan-shousu-chufeng-3x3` do directly state "MoYu
sub-branded," in wording that does not overlap with `moyucube-official-home-2022`'s
title-tag enumeration (checked by shingle-match, see §1) — so this reads as the retailer's own
characterization, not laundered manufacturer copy, though it remains an unverified retailer
claim about a manufacturer's internal corporate structure rather than a manufacturer's own
statement. **Correctly not yet acted on**: both `data/manufacturers/mojue.yml` and
`data/manufacturers/mohuanshousu.yml` still hold `kind`/`parent_id` at `confidence: uncertain`
resting only on the thin `moyucube-official-home-2022` title-tag reading, and the stronger
retailer evidence is explicitly flagged in `thecubicle-mojue-m3-2020`'s own `reliability_note`
as "flagged... for a human to weigh, not acted on directly (out of this pass's write lane)."
That is the correct call for a research-pass agent to make; I record it here as a recommendation
for the human reviewer to consider upgrading both to `probable` citing both sources, not as
something I am acting on myself.

**Lead 5 — `rubiks-com-classic-special-editions-2024` bundling.** See §3 above: sound for its
current narrow use, but structurally fragile (`archive_url` covers 1 of 6 products) and should
be split into per-product source records before Pass 3/4, sooner than the note itself proposes.

## 7. Claims whose confidence should be downgraded

| Record | Field | Current | Recommended | Why |
|---|---|---|---|---|
| `data/families/dayan-panshi.yml` | `/introduced` | `confirmed` | `reported` or `uncertain` | Tier-1 source shows existence-by-Aug-2013 only, not the stated Feb-2013 date; the only source stating the date is tier 4 |
| `data/families/gan-354.yml` | `/introduced` | `probable` | `uncertain` | Sole basis is the debunked `Added: 2018-09-11` catalogue-migration artifact |
| `data/models/gan/gan-354-m.yml` | `/announced` | `probable` | `uncertain` | Same artifact, model level |
| `data/families/qj-candy-3x3.yml` | `/introduced` | `uncertain` | (keep `uncertain`; fix note + source) | Same artifact; already low confidence but treated as a real approximate date rather than flagged as unusable |
| `data/families/qj-pillowed-3x3.yml` | `/introduced` | `uncertain` | (keep `uncertain`; fix note + source) | Same |
| `data/sources/thecubicle-qj-candy-3x3-product-2019.yml` | `published` | exact, day precision | remove or downgrade to `circa` | Records the artifact date as an exact publication fact |
| `data/sources/thecubicle-qj-pillowed-3x3-product-2019.yml` | `published` | exact, day precision | remove or downgrade to `circa` | Same |
| ~110 attestations across 53 families (§5) | various | `reported`/`probable` | `uncertain`, or reclassify the source to tier 3 with justification | Tier-4-only sourcing; §3.1's own table reserves `reported` for tier 3+ |

## 8. Sources that are genuinely strong

Naming these explicitly, since this audit is not a hunt for problems only:

- **`gancube-cn-core-technology-history`** — a rare case of a researcher going to the
  Chinese-domestic version of a manufacturer's own site after noticing the English version's
  citation had no archive capture, fetching and translating it directly, and correctly
  distinguishing "flagship" as GAN's own self-positioning (admissible) from comparative
  superlatives elsewhere on GAN pages (not admissible). Retained original Chinese in the
  excerpt per RESEARCH_SPEC §3.7.
- **`monster-go-official-home` / `gancube-brand-story-about-us`** — the ICP filing-number match
  between two ostensibly separate company sites is documentary-grade corroboration, well beyond
  what this domain typically offers.
- **`thecubicle-limcube-fangshi` / `speedcubeshop-fangshi-collection-2021`** — a textbook
  correct two-retailer independence case, with each source's own `reliability_note` explicitly
  cross-referencing the other and confirming non-overlapping wording.
- **`data/manufacturers/gan.yml`'s `/founded` dispute** (four genuinely distinct candidate
  dates, four genuinely distinct source sets, explicitly left unadjudicated with reasoning) and
  the equivalent disputes on `dayan`, `moyu`, and `particula` — all checked for the "shared
  source list" trap the brief warned about; **none of the four disputes share a source across
  candidates.** This is the disputed-attestation mechanism working exactly as designed.
- **`data/families/moretry-tianma-x3.yml`** — independently caught its own bad fetch ("one
  fetch attempt returned content that appeared to belong to a different version's page... not
  used as evidence") and its own cross-product date artifact, without being asked.
- **13/13 Chinese-language sources** carry both original-language excerpt text and a
  `reliability_note`, full compliance with RESEARCH_SPEC §3.7.
- **`xinlexin-magic-club-baibian-mowang-2022`** — a well-documented negative finding (this
  brand line is Magic Snake puzzles, not 3x3s), exactly the kind of "researched and not found"
  work the spec asks for rather than a silent gap.

## 9. Priority ranking

**Critical:** none. No fabricated facts, no tier-5 citations, no `preservation_method: none`,
no true circular corroboration.

**High:**
1. The tier-4-wiki-as-tier-3 systemic pattern (§5) — 53 families, 32 `/introduced` fields,
   needs one human decision applied consistently before Pass 3 scales past GAN, because every
   affected family's variants will inherit an over-stated confidence.
2. `gan-354` / `gan-354-m` live artifact contamination (§6, §7) — small in scope but the only
   finding that sits inside the already-built GAN pilot depth, and a `probable`-confidence
   claim resting on a source the same researcher elsewhere proved unreliable.

**Medium:**
3. `dayan-panshi` `/introduced` excerpt-vs-claim mismatch (§2).
4. `rubiks-com-classic-special-editions-2024` bundling's single-archive-URL-for-six-products
   structure (§3) — no damage yet, but a live trap for Pass 3/4.
5. `qj-candy-3x3` / `qj-pillowed-3x3` artifact residue (§6, §7) — already low-confidence, so
   lower urgency than #2, but should be cleaned up on the same pass.

**Low:**
6. `mfjs`/`guoguan`-style `parent_id` confirmations resting on a manufacturer's own title-tag
   name enumeration rather than explicit relationship prose — defensible as filed, worth a
   second look only if a stronger source later surfaces (see Lead 4).

## Verdict per record class

- **Manufacturer register (`data/manufacturers/*.yml`):** **promote.** Disputes are handled
  correctly, tier discipline on marketing-vs-specification is consistently applied, and the two
  sub-brand chains I checked in depth (GAN's, MoYu's) are well-evidenced. The one open item
  (Lead 4) is already correctly parked at low confidence pending human review, not silently
  resolved.
- **Family register (`data/families/*.yml`):** **hold**, specifically on the confidence layer,
  not the content. The family boundaries and descriptions themselves read as careful, honest
  work; what needs a human pass before Pass 3 is the systemic tier-4-as-tier-3 confidence
  question (§5) and the two `gan-354`/`qj-*` artifact residues (§6, §7). Everything else in the
  family layer can proceed.
- **GAN pilot (`data/models/gan/**`, `data/variants/gan/**`):** **hold** on `gan-354-m`
  specifically (fix the one `/announced` attestation); **promote** everything else sampled.
- **`rubiks-com-classic-special-editions-2024`:** **hold** — split before it is relied on for a
  per-product critical field.
