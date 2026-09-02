# GAN — Pass 1 (manufacturer register) — session log

This file is the session log required by the pass-1 task brief and is referenced from several
source `reliability_note` fields (`gancube-cn-about-us-en`, `gancube-cn-about-us-en`'s footer
discrepancy note, and others) that predate this file's creation. Consolidates three prior,
session-limit-truncated runs plus this closing session, which fixed a validation failure and
pushed the founding-date question toward citable evidence.

Status at the end of this session: `npm run validate`, `npm run schemas`, `npm run selftest`,
and `npm run check` all pass with 0 errors, 0 warnings, on 25 records (6 manufacturers, 19
sources).

---

## 1. What this pass covers

Per the task brief, this is a scoped pass-1 pilot: **GAN and the organisations directly
entangled with GAN's products** — not the full universe of 3x3 manufacturers (that is the
subject of later manufacturer-register waves once the GAN pilot, per RESEARCH_SPEC §7, is
audited). Six manufacturer records exist:

| id | kind | Relationship to GAN |
|---|---|---|
| `gan` | manufacturer | The subject |
| `monster-go` | sub_brand | `parent_id: gan`, GAN's own children's/brain-training line |
| `swift-block` | sub_brand | `parent_id: gan`, GAN's own casual-puzzle line |
| `thecubicle` | service | US retailer; sells GAN cubes under its own customised-product names |
| `cubicle-labs` | service | Named service, `parent_id: thecubicle` (weakly evidenced); credited on the GAN 356 Air UM |
| `picube` | service | UK-registered company; credited by name on GAN modifications TheCubicle sells |

No family, model, or variant records were created or touched, per the write-lane boundary.

---

## 2. GAN canonical identity

**Naming: "GAN" vs "GANCUBE".** GAN's own brand-story page calls itself "GANCUBE" as a
corporate/storefront brand ("the cube brand, GANCUBE, made its debut"), and gancube.com's page
titles read "GANCUBE Official Website". Every product name found in every source, however, uses
bare "GAN" ("GAN 356 Air", "GAN 11 M Pro", "GAN12"–"GAN16", "GAN V100"), never "GANCUBE
<product>", and the Speedsolving wiki's own article is titled simply "GAN". The record uses
`name: "GAN"` as the archive's house style per DATA_MODEL §4.5 ("normalized to a house style"),
records "GANCUBE" as the top alias, and documents the reasoning in the record's own `notes` so
a later archivist can revisit the call rather than inherit it silently.

**Legal entity.** 广州淦源智能科技有限公司 (Guangzhou Ganyuan Intelligent Technology Co., Ltd.),
founded by Jiang Ganyuan (江淦源), per GAN's own Chinese-domestic site (`gancube-cn-about-us-en`,
`gancube-cn-introduction-zh`).

**Two official domains.** gancube.com (international storefront) and gancube.cn
(Chinese-domestic, English and Chinese versions) are both first-party GAN sites, tied together
by an identical ICP filing number (粤ICP备16068632号) also found on Monster Go's site — a
documentary link, not an inference from naming resemblance. The schema's `manufacturer.website`
field is singular; `gancube.cn` could not be recorded there without displacing `gancube.com`, so
it lives only in `notes`. Flagged in §6 as a minor schema-affordance note, not treated as a
blocker.

---

## 3. The founding date — pushed further, not resolved

The brief's course-correction explicitly asked this session to push the 2011-vs-2014 question
toward a citable source rather than leave the prior two-candidate framing untouched. It did:
the question is now evidenced with four dated tier-1/tier-4 candidates instead of two, and the
new evidence makes clear the question is not "which of two sources is right" but "which of
several genuinely different corporate/brand events counts as the founding."

### Method

1. Re-read the existing evidence: three tier-1 GAN pages agreeing on "2014" (incorporation),
   Speedsolving wiki (tier 4) claiming a 2011 first product ("Ganspuzzle I") and 2014
   incorporation, and both gancube.cn pages carrying a "© 2011-2023" footer that matches
   neither date cleanly.
2. Used `npm run wayback -- list gancube.com --from 2011 --to 2016` to find the earliest
   archived capture of GAN's international site. Result: **2016-08-08**, nothing earlier. That
   capture's own footer reads "Copyright © 2013-2016 GAN Cube Inc." — a third date, tied to the
   same ICP filing number family (`粤ICP备16068632号-1`) as the later domestic/Monster Go sites.
3. Searched directly for the "Ganspuzzle" predecessor brand's own domain via
   `npm run wayback -- list ganspuzzle.com --from 2010 --to 2018`, since the wiki names a
   specific product ("Ganspuzzle I") rather than just a company name. This found a real site,
   captured from **2011-10-27**, well before any gancube.com capture exists.
4. Enumerated that domain with `npm run wayback -- prefix ganspuzzle.com` and fetched the
   "品牌介绍" (Brand Introduction) and a product page ("GAN2") with
   `npm run wayback -- get`.

### What the Ganspuzzle site says, first-party

The brand-introduction page states outright: **"GANSPUZZLE 淦源 是由国内资深魔方玩家江淦源创立的
自主品牌。成立于2010年。"** ("GANSPUZZLE is an independent brand founded by veteran domestic
speedcuber Jiang Ganyuan. Established in 2010.") This is first-party, tier 1, for the
predecessor brand's own founding claim — a genuinely new, citable, archived source, not a
repetition of the wiki's summary.

A product page for "GAN2" (淦源2号), same capture, names the designer — "设计师：江淦源，网名
gan，资深魔方玩家，06 07广州魔方公开赛3阶速拧冠军，国内首发cfop公式，一般称为gan手法" (designer
Jiang Ganyuan, handle "gan", 2006/07 Guangzhou Cube Open 3x3 champion, first in China to publish
CFOP, known as the "gan technique") — and states this is "其第二款自主设计魔方" (his second
independently designed cube), which corroborates that an earlier design ("Ganspuzzle I",
matching the wiki's claim) already existed by this capture, without independently dating that
earlier design itself.

### The resulting four-candidate picture

| Candidate | Event it actually documents | Tier | Source |
|---|---|---|---|
| 2010 | GANSPUZZLE brand founded (Jiang Ganyuan's own independent brand) | 1 | `ganspuzzle-brand-intro-2011` |
| 2011 | First cube released ("Ganspuzzle I") | 4 (corroborated only) | `speedsolving-wiki-gan`, `ganspuzzle-gan2-product-2011` |
| 2013 | Copyright-range start on gancube.com's own earliest capture | 1 (ambiguous referent) | `gancube-2016-earliest-capture` |
| 2014 | "GANCUBE Inc." formal incorporation | 1, 3 independent GAN pages | `gancube-brand-story-about-us`, `gancube-cn-about-us-en`, `gancube-cn-introduction-zh` |

None of these sources contradicts another's own specific claim — a brand can be founded in
2010, release its first product in 2011, and incorporate formally as a company in 2014, and all
three could be true simultaneously of one continuous history. What is genuinely unresolved is
**which of these events the archive should treat as "the" founding of the organisation this
record represents**, and whether "GANSPUZZLE" (2010–~2014) and "GANCUBE"/"GAN" (2014–) are one
continuous organisation or a predecessor/successor pair — the schema has no
manufacturer-to-manufacturer predecessor relationship type to represent the latter reading even
if the evidence pointed there.

**Decision made this session: do not adjudicate.** `data/manufacturers/gan.yml` `/founded` now
carries `confidence: disputed` with all four candidates recorded in full (value, sources,
confidence, note) per DATA_MODEL's attestation shape. The main document field keeps `2014` as
the most-attested single candidate (three independent tier-1 sources using explicit
founding/incorporation language), stated explicitly in both the record's `notes` and the
attestation's own `note` as *not* an adjudication — no `adjudication` / `adjudicated_by` /
`adjudicated_on` fields were written, precisely so a future researcher does not mistake "we had
to put something in the field" for "this was decided." Per DATA_MODEL, an unadjudicated dispute
blocks `published` but not `sourced`; this record's status remains `sourced`.

The unexplained fifth data point — gancube.cn's "© 2011-2023" footer, which matches none of the
four candidates exactly and sits closest to the 2011 first-product claim — is recorded in the
sources themselves but not treated as an independent fifth candidate, because no source
explains what that specific year refers to.

**Left for pass 2:** whether GAN1/GAN2 (the Ganspuzzle-era products) and the GAN356-onward
naming scheme belong in one family tree or represent a genuine brand discontinuity worth a
`reference_only` predecessor entity. Recorded as a lead, not resolved here.

---

## 4. Sub-brands — the evidence chain for each

**Monster Go** (`kind: sub_brand`, `parent_id: gan`) — established three independent ways:
(1) GAN's own brand-story page names it under a section literally headed "Our Sub-brands"; (2)
Monster Go's own site states "Powered by GANCUBE" in its own title and carries the *identical*
registered legal entity and ICP filing number as gancube.cn's footer — documentary, not
resemblance-based, since an ICP filing is issued to one specific registered operator; (3) GAN's
own international storefront lists "Shop Mosnter GO" [sic, GAN's own typo, preserved as an
alias because it is first-party] as one of only three top-level shop sections on gancube.com
itself. `confidence: confirmed` on `/parent_id`.

**Swift Block** (`kind: sub_brand`, `parent_id: gan`) — established the same way GAN's own
brand-story page names it under "Our Sub-brands", and independently, GAN's own storefront serves
a Swift Block collection directly on GAN's own domain (`gancube.com/collections/swift-block`),
listed as one of the same three top-level shop sections. Unlike Monster Go, no independently
registered Swift Block domain or legal/About page was found — `country` and `website` are now
explicitly attested `confidence: unknown` (added this session) rather than left silently absent,
per the "record unknown, not silence" working rule. All evidence for both sub-brands is
first-party GAN material (single publisher), but the claims themselves are organisational
self-statements and catalogue structure, not comparative marketing claims, so tier 1 still
applies per RESEARCH_SPEC §3.3.

No other candidate GAN sub-brand was found. GAN's own site navigation (checked directly, not
recalled) lists exactly three shop sections: GANCUBE, Monster Go, Swift Block. Nothing else on
gancube.com or gancube.cn reads as a declared sub-brand.

---

## 5. Service entities — the basis for inclusion

**TheCubicle** (`kind: service`, US) — a retailer that modifies GAN (and other manufacturers')
cubes and sells the result under its own named programmes: "Cubicle Pro Shop" branded
center-caps on UV-coated GAN 11 M Pro units (because the GAN logo cannot be removed under the
coating), named "Signature Series" setups credited to individual competitors (Matty Hiroto
Inaba, Tymon Kolasiński), and a catalogue-wide "Premium Cube Setup Service" and "Cubicle Custom"
programme applied across manufacturers. This is the DATA_MODEL §1.3 definition of `kind:
service` directly: a company that modifies cubes produced by others and sells the result as an
identifiable, distinctly named product. "Cubicle Pro Shop" and "Cubicle Custom" are recorded as
aliases, not separate manufacturer records, because both are used in TheCubicle's own
first-person voice on its own domain with no separate founder or legal entity located.

**This session's fix:** `data/sources/thecubicle-about-us.yml` was filed as `kind: retailer`
(tier 2 by default), which left `/country`, `/founded`, and `/website` at `confidence: confirmed`
resting on that single tier-2 source — `npm run validate` correctly blocked this under rule 9.
The fix was reclassification, not a second source: an organisation's own "About Us" page stating
its own founding date, jurisdiction, and operating legal entity is a first-party organisational
statement about itself, the same category already used elsewhere in this exact register for
`gancube-brand-story-about-us` and `picubeshop-about-us` (both `kind: manufacturer_official`
despite one publisher being a "manufacturer" and the other a "retailer" by business type). Kind
now matches that precedent: `manufacturer_official`, tier 1. No claim changed; only the source's
classification did, and both the source file and the manufacturer record document why.

**Cubicle Labs** (`kind: service`, `parent_id: thecubicle`, uncertain) — a named service that
installs magnets, applies its own lubrication, and rebrands cubes made by other manufacturers
(demonstrated directly on a QiYi product, the "Cubicle Labs WuQue M", which is out of GAN's
scope but establishes what kind of organisation Cubicle Labs is). On GAN specifically, credited
as a collaborator on the GAN 356 Air UM's magnetism by both TheCubicle's own product page and
the Speedsolving wiki. **The parent relationship is this register's weakest-evidenced claim** —
the only source stating "division of TheCubicle" outright is the Speedsolving wiki (tier 4);
no first-party TheCubicle statement was found. `confidence: uncertain`, flagged explicitly for
pass 2 to chase toward a citable first-party statement. This session added `founded: 2016` at
`confidence: uncertain` (same single tier-4 source, which also names the founder, Christopher V
Tran — recorded in `notes` for provenance; no `person` record created, out of this lane) and an
explicit `/country: unknown` attestation.

**PiCube** (`kind: service`, GB) — an independently operated company (registered as "Seamoonbaby
Ltd", Bolton, England), not owned by TheCubicle or GAN, credited by name on GAN modifications
TheCubicle sells ("GAN V100 MagLev UV 3x3 (PiCube 20-Magnet Ball-Core Mod)" and siblings).
PiCube's own About page independently confirms it customises/magnetises cubes across several
manufacturers including GAN — the DATA_MODEL §1.3 definition, corroborated by TheCubicle's
credit line. `country: GB` is `probable`, not `confirmed`, because the same About page also
claims recognition "in China" without stating where operations are actually based — recorded as
an unresolved tension, not silently resolved either way. The site's most recent located capture
is from 2023-11-11; current (2026) status was not re-verified this pass and is flagged as a
link-sweep lead.

---

## 6. What was checked and did not change anything

- **Second-retailer search for alias/corroboration diversity.** `npm run wayback -- prefix
  speedcubeshop.com/collections/gan` confirms a second major US retailer (SpeedCubeShop) sells
  GAN products under the plain "GAN" spelling, consistent with everything already on file. The
  collection page itself carried only site navigation, no company-identity text, so nothing new
  was added. This does not close the gap `research/qc/gan-2026-09-01.md` (M9) already
  identified — the register still has exactly one non-GAN, non-wiki publisher (TheCubicle) doing
  any evidentiary work, and no non-US retailer or Chinese-domestic third-party listing appears
  anywhere in `data/sources/`. Flagged again here for pass 6 (corroboration).
- **Corporate-level collaborator search.** Looked for any organisation that would warrant
  `kind: collaborator` on a GAN manufacturer record (credited on an edition without producing
  it). Everything found in this pass's sources is either a production/service relationship
  (Cubicle Labs, PiCube, TheCubicle) or a named individual competitor credited on a signature
  edition (Matty Hiroto Inaba, Tymon Kolasiński, Max Park) — the latter are `person` entities for
  pass 2/4, not `manufacturer` records, and none was created here.
- **"GAN V100" identity.** Confirmed present as its own distinct nav entry on GAN's storefront,
  separate from the numbered GAN11–17 line. This is a model/family-level identity question
  (already flagged by `research/qc/gan-2026-09-01.md` A3) and is out of this pass's scope; noted
  here only so pass 2 does not have to rediscover it.

---

## 7. QC audit — what applied to this lane and what did not

`research/qc/gan-2026-09-01.md` audited `data/sources/` and `research/staging/variants/` as
they stood mid-wave; its "state audited" note says zero manufacturer records existed at the
time it read the tree, even though the six manufacturer files here were being written
concurrently. Its **B1–B5 findings are about `research/staging/variants/`**, which belongs to
`model-researcher`/`variant-researcher` and was not touched in this pass. Its **M1 finding**
(a false "no capture found" premise on `thecubicle-cubicle-labs-wuque-m.yml`) was verified and
fixed this session: `npm run wayback -- list` on that exact URL returns ten captures,
2019-09-30 through 2024-02-24; the most recent was fetched and confirmed verbatim, and the
source now carries `preservation_method: archive_url` instead of `excerpt`. Its **M9 finding**
(single-publisher corroboration risk) and **M10** (this file's own absence) are addressed above.

---

## 8. Unresolved identity questions — the honest list

1. **GAN's founding date** — disputed, four candidates, deliberately unadjudicated (§3).
2. **Whether "GANSPUZZLE" (2010–~2014) and "GANCUBE"/"GAN" (2014–) are one continuous
   organisation or a predecessor/successor pair** — the schema has no manufacturer-level
   predecessor relationship to represent the latter even if evidence pointed there. Currently
   handled by treating "Ganspuzzle"/"GANSPUZZLE"/"淦源魔方" as aliases of the one `gan` record,
   which is itself a judgement call, stated plainly rather than hidden.
3. **Whether Cubicle Labs is genuinely a division of TheCubicle** — single tier-4 source,
   `confidence: uncertain`, needs a first-party TheCubicle statement.
4. **PiCube's actual country of operation** — registered in England; the same source claims
   recognition "in China"; `confidence: probable`, not `confirmed`.
5. **PiCube's current (2026) live status** — last capture located is 2023-11-11; not
   independently re-verified. Link-sweep lead.

---

## 9. Toolchain state at close of session

```
npm run validate   → PASS, 0 errors, 0 warnings, 25 records
npm run schemas    → PASS, 17 schemas, 49 vocabularies, 8 $ref targets resolving
npm run selftest   → PASS, every named check fires
npm run check       → PASS (schemas, validate, lint, duplicates, build, privacy, selftest, coverage)
```

No family, model, or variant record exists anywhere in `data/`. No cube-level fact was created.
