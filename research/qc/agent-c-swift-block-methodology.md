# Agent C — Swift Block as calibration case, and the real methodology question

**Role:** Pass 2.5 final remediation, methodology stress-test. **Scope:** whether
official-site-first discovery has a systematic blind spot requiring remediation before Pass 3.
**No `data/` file was read for editing and none was edited.** No models, variants, or records
were created. `npm run validate` was not re-run because nothing under `data/` changed.

## 0. Premise check

The task brief's original framing — that Swift Block might have been *missed* by an
official-site-first methodology — is false, and the brief itself says so. I re-read
`data/manufacturers/swift-block.yml`: `kind: sub_brand`, `parent_id: gan`, sourced from GAN's
own brand-story page ("Our Sub-brands") and GAN's own storefront navigation
(`gancube.com/collections/swift-block`). It is exactly what a healthy official-site-first pass
should produce for a **current sub-brand of a large, well-maintained manufacturer**. I did not
re-investigate it further — there is nothing to investigate. It is used below only as the
baseline against which the harder categories are judged.

## 1. Method

Five targeted probes, each mapped to one of the brief's at-risk categories, run against the
live web (WebFetch on live retailer/manufacturer pages) and the Wayback tool
(`node scripts/wayback.mjs`) already present in this worktree. **WebSearch returned "budget
exhausted" on the first call this session** (shared across the environment, per the archive's
own prior notes making the same complaint) — every probe below is therefore evidence from direct
page fetches, not search. I treated HTTP errors, TLS mismatches, and 403s as inconclusive, per
the brief's own instruction, and say so explicitly where they occurred.

I read the existing register and its own research notes first
(`research/notes/manufacturers/global-pass0.md`, `research/qc/agent-d-global-second-order-audit.md`)
specifically so I would not re-run work already done — several of the findings below build
directly on facts that pass already established (the MoreTry/HuaMeng/ESCube/PBCube discovery via
`/products/` prefix sweep, and the pass's own stated limitation that discovery covered "two
retailers, both English-language and both US-facing").

## 2. Probes and results

### Probe 1 — Discontinued-looking official site of a manufacturer that is actually still active (DaYan)

`data/manufacturers/dayan.yml` records `website: "http://dayancube.com/"` at
`confidence: confirmed`, sourced from a 2013 capture. I pulled the **current** state of that
domain: `node scripts/wayback.mjs nearest dayancube.com 20260101` returned a capture dated
**2026-03-09**, which I then fetched directly. It is not DaYan. It is a generic dropshipping
storefront ("Home Page 4") selling YIWA electric motorcycles, THINKMAX RC cars, and ACEKOOL
popcorn makers — the domain has been squatted/repurposed since the 2013 capture the record
cites. Meanwhile I fetched TheCubicle's live `/collections/dayan` page: **61 items in stock**,
actively maintained (a "NEW" tag on a 2026-era Megaminx Pro+ LM), and a current catalogue that
includes GuHong Pro+, TengYun M, ZhanChi Pro M — i.e. the same flagship lines the archive's 8
existing DaYan families already document, still in production.

**Finding.** DaYan-the-company is thriving; DaYan's own website is dead and squatted by an
unrelated business. The archive's family-level coverage for DaYan (8 families) is *not* missing
anything as a result — TheCubicle's retailer catalogue already carries the full current and
historical line — but the record's `/website` attestation is stale and, unlike the sibling
`shengshou.yml` and `cyclone-boys.yml` records (both of which correctly demote `website` to
`unknown` on discovering domain rot), `dayan.yml` still asserts `confirmed`. This is an
inconsistency in how the same known risk is handled across records, not a new discovery gap.
**Revealing source class: retailer** (TheCubicle's live collection page). The manufacturer's own
site is actively misleading here, not merely silent.

### Probe 2 — Defunct-site, live-company pattern re-tested independently (ShengShou)

`shengshou.yml`'s own notes already record that `shengshoutoys.com` "no longer resolves to the
manufacturer as of 2026." I re-verified this independently rather than trusting the note: a live
fetch of `http://www.shengshoutoys.com/` returns a **TLS certificate mismatch** — the certificate
is issued for `xjtianshan.com`, an unrelated domain — confirming the record's own claim rather
than superseding it. I then fetched TheCubicle's live `/collections/shengshou`: **178 items**,
several tagged "NEW" (Master Kilominx V3, Gigaminx V3, Timer V3) — a company shipping new SKUs
in 2026 with no working official site at all. The archive already has 7 ShengShou families and
already records `website: unknown` correctly (this is the record doing the right thing).

**Finding.** Two independent confirmations of the same pattern (DaYan, ShengShou) is enough to
call it a real, recurring shape in this manufacturer population, not a one-off: **a dead or
squatted official domain is not evidence a Chinese speedcube manufacturer has ceased
operating**, and the archive's retailer-catalogue channel is what actually carries current
truth for these two. **Revealing source class: retailer**, confirmed twice.

### Probe 3 — Budget/OEM sub-brand lead, tested and found not to pan out (YuXin's "six major brands")

`yuxin.yml`'s own notes flag an unverified lead: YuXin's About page lists five sibling brand
names (Yizhi Play Palace, **Zhisheng**, Sudie Cup, Qiuya, Quan Brain Doctor) never individually
checked. I tested the most plausible cube-shaped name, "Zhisheng," directly against TheCubicle's
live search. Result: 171 hits, but every one is fuzzy-matched noise (DianSheng, ShengShou,
YiSheng — names that merely share the "-sheng" syllable), not a real "Zhisheng" cube brand.

**Finding.** This specific flagged lead does **not** resolve to a missing family — a useful
negative result, and a reminder that not every open lead the register carries is a live gap.
I am not marking this lead closed in `data/` (out of my write lane), but a future pass can treat
"Zhisheng" as checked-and-not-found rather than re-deriving the same dead end.
**Revealing source class: retailer search** (used here to rule a lead out, not in).

### Probe 4 — Retailer-only entity outside the two US/English retailers already swept (Cubelelo / "Drift")

This is the probe that matters most. The archive's own pass-0 notes state the discovery method's
known limitation in plain language: *"Two retailers, both English-language and both US-facing...
Brands sold only in China, or only through Chinese platforms, are systematically invisible to
this method."* I tested whether that limitation is live risk or theoretical, against a **third**
major retailer never swept by either the collection-URL or `/products/`-prefix method: Cubelelo,
which self-describes as "India's leading cubestore," founded 2014.

`cubelelo.com/collections/brands` lists GAN, QiYi, MoYu, YJ, DianSheng — all already in the
register — plus **"Drift,"** filtered in Cubelelo's own product data as **"Brand: Cubelelo"**
across all 60 SKUs (2x2 through 6x6, Pyraminx, Megaminx, Skewb, Square-1, mirror cubes). This is
structurally identical to the two `kind: service` house-brand patterns the archive has *already*
canonicalised — TheCubicle's Cubicle Custom/Premium tiers and SpeedCubeShop's
Cosmic/Supernova/UniCube/SCS tiers (`data/manufacturers/thecubicle.yml`,
`data/manufacturers/speedcubeshop.yml`) — but Cubelelo itself has **no record in the 54-entry
register at all.** One targeted WebFetch call, no archive access needed, surfaced a real,
concrete, currently-selling entity of a shape the archive's own rules already know how to
represent.

I also checked a second Cubelelo house name from the same brand list, "TinkerBox," specifically
to confirm I was not pattern-matching noise: it resolved to wooden Montessori toys for children
aged 3–7, correctly out of scope — a discriminating negative alongside the positive.

**This is a genuine lead. Count: 1.** Per the hard scope limit, I am not creating
`data/manufacturers/cubelelo.yml` or any record — this is reported as a lead only.
**Revealing source class: retailer** (a live, non-archived fetch of a retailer never previously
in scope — did not even require Wayback).

### Probe 5 — Specialist-database source class, tooling access re-checked

The brief asks which source class reveals each probe's product; "specialist database" is one of
the five listed. I attempted to reach `twistypuzzles.com`'s museum/puzzle-database pages
(`/cgi-bin/puzzlelist.cgi`, `/museum/`) directly — the single most relevant specialist database
for identifying and dating obscure or discontinued twisty-puzzle brands. Both returned **HTTP
403** to WebFetch. This is not new: `research/qc/pass2-entity-identity.md` and
`research/qc/pass2-human-review.md` already flag the exact same block, on the exact same site,
for an unresolved Kokonotsu/Molecube lineage question, and explicitly recommend a browser-capable
tool for it. I re-confirmed the block is still in effect this session rather than assuming the
prior note was still accurate.

**Finding.** This is a **standing, twice-independently-confirmed tooling gap**, not a discovery
failure per se: the entire "specialist database" source class the brief asks about is currently
unreachable by any automated pass in this environment. No probe in this session could test what
that source class would actually reveal, because the tooling cannot reach it. This bounds how
confident anyone can be that the register's defunct/historical-brand coverage is complete —
`twistypuzzles.com` is exactly the kind of resource that would catalogue a brand no retailer
ever carried and no manufacturer ever self-documented.

## 3. Assessment against the retailer-sweep compensation the brief points at

The brief asks me to assess *how reliably* the MoreTry/HuaMeng/ESCube/PBCube-style compensation
(archived retailer `/products/`-prefix sweeps) was applied across the register, not just whether
it exists. Based on `global-pass0.md`'s own addenda: it was run exactly **twice** — once against
TheCubicle, once against SpeedCubeShop — both US-facing, English-language, general speedcube
retailers. It was never run against a non-US retailer, a non-English retailer, or a Chinese
platform. Probe 4 above demonstrates directly that this is not a hypothetical residual risk: the
first non-US retailer I checked, checked in a single request, produced one clean miss of exactly
the shape the technique was invented to catch. That does not mean the register is badly wrong —
GAN, MoYu, QiYi, YJ, DaYan, ShengShou and the other volume manufacturers are extremely
well-attested and cross-corroborated — but it does mean **the "have we found every
manufacturer-shaped entity" question is not closed**, and closing it costs one WebFetch call per
additional retailer checked, which is cheap relative to what a missed `kind: service` entity
would cost once Pass 3 starts building `modified_from` variant trees.

## 4. Leads found this session (do not action; report only)

1. **Cubelelo ("Drift")** — a real, currently-selling `kind: service`-shaped house-brand at a
   major Indian retailer, structurally analogous to TheCubicle/SpeedCubeShop's own already-
   canonicalised house lines, entirely absent from the 54-manufacturer register. Not created as
   a record. **Lead count from this session: 1.**

No other probe surfaced a missing family or manufacturer; Probes 1–2 surfaced a
`website`-attestation staleness/inconsistency (not a missing-entity lead — see §5), Probe 3 was a
negative result on an existing flagged lead, and Probe 5 confirmed a pre-existing tooling
limitation rather than surfacing new missing content.

## 5. Secondary finding: inconsistent handling of a known risk, not a new one

`data/manufacturers/dayan.yml`'s `/website` attestation is `confidence: confirmed` on a 2013
capture, with no caveat that the domain is now squatted. `data/manufacturers/shengshou.yml` and
`data/manufacturers/cyclone-boys.yml` already handle this exact same risk correctly — both
demote `website` to `unknown` on discovering domain death/hijack. `dayan.yml` should get the same
treatment (I did not edit it; out of my write lane this session, and the brief asks for leads,
not fixes). This is a one-record inconsistency, not a systemic defect in the rule — the rule
(demote to `unknown` on domain death) already exists and is applied correctly twice out of three
times I checked it.

## 6. Verdict

**Methodology requires a targeted amendment.**

The core finding is not that official-site-first is broken — Swift Block, DaYan, and ShengShou
all show the archive's actual practice is retailer-first with manufacturer-site corroboration,
which is the right shape and already catches domain rot correctly in most cases. The gap is
narrower and more specific: **discovery was only ever run against a two-retailer, US/English
universe**, a limitation the archive's own notes already stated in words but never followed up
on, and one live probe against a third retailer immediately produced a concrete miss of the
exact shape (`kind: service` house-brand) the archive already knows how to represent correctly.
This is real, bounded, and cheap to close — not a flaw that makes Pass 3 unsafe to *start*, since
Pass 3 operates on manufacturers already in the register and nothing found this session
contradicts any existing family/model attestation.

**Proposed amendment, for `RESEARCH_SPEC.md`'s discovery-method section:**

> **Retailer discovery must not be limited to a single national/language market.** Manufacturer-
> universe discovery via retailer collection-URL and `/products/`-prefix sweeps (§ the technique
> that surfaced MoreTry, HuaMeng, ESCube, and PBCube) must be additionally run, at least once
> each, against one major retailer outside the US/English-language market already covered
> (e.g. a major India-, EU-, UK-, or China-facing retailer). For each such retailer, record
> either (a) a new manufacturer/service candidate with the same evidentiary bar as any other, or
> (b) an explicit note of the retailer checked, the date, and "no candidates beyond the existing
> register found" — so the check is auditable and is not silently skipped or silently repeated.
> This is a one-time discovery-completeness step per retailer, not a standing per-family
> requirement, and does not block Pass 3 for manufacturers already in the register.

A second, smaller and already-precedented amendment:

> **A manufacturer's `website` attestation must be re-verified for current liveness before being
> recorded at `confidence: confirmed`, and demoted to `unknown` with a note if the domain no
> longer resolves to the manufacturer** (parked, squatted, TLS-mismatched, or repurposed) —
> matching the treatment `shengshou.yml` and `cyclone-boys.yml` already apply, and correcting the
> `dayan.yml` case where the same check was not applied.

## 7. What I did not do

- Did not create, edit, or propose creating any `data/` record (Cubelelo/Drift is a lead only).
- Did not enumerate any manufacturer's models or variants — Pass 3 remains untouched.
- Did not treat any HTTP error, 403, or Wayback timeout as evidence of absence; each inconclusive
  result is reported as inconclusive above (the `twistypuzzles.com` 403s specifically).
- Did not use WebSearch (unavailable this session) or my own recall as a source for any claim
  above; every finding traces to a specific fetch performed this session or an existing,
  re-checked archive record.
