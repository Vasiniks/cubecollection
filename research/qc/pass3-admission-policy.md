# Pass 3 model-admission policy (the S6 decision)

**Decided:** 2026-09-03 · **Issue:** `S6` · **Baseline:** `23ccaf1` · **Status:** binding for Pass 3

This resolves the open `S6` conditional-admission question and, more broadly, states what
evidence Pass 3 requires before a **model** record may be created. It is binding: a model that
does not meet the bar for its claim class is not created, or is created with the confidence its
evidence actually supports.

---

## 1. The core principle: different claims need different evidence

The mistake this policy exists to prevent is treating "this model existed" and "this model
launched in March 2017" as one claim requiring one standard. They are not. Pass 2 already
learned this the expensive way — retailer catalogue dates were mistaken for release dates in
three separate incidents, and 111 attestations once rested on evidence the archive's own rules
called inadmissible.

**Claim classes, weakest requirement first:**

| # | Claim | Minimum evidence | Max confidence on that evidence |
|---|---|---|---|
| 1 | **Family existence** | *(frozen — settled in Pass 2, not re-litigated)* | — |
| 2 | **Model existence** — this product was made and sold | **One tier 1–3 source** naming it as a distinct product | `reported` (T3) · `probable` (T2) · `confirmed` (T1, or two independent T1–2) |
| 3 | **Model identity** — it is a *distinct model*, not a variant | Evidence of a **design/mould/mechanism difference**, or a manufacturer-declared generation | same ladder as #2 |
| 4 | **Model specifications** — size, weight, magnets, core | **Tier 1–2 only.** A wiki may never establish a specification | `probable` from a retailer spec table; `confirmed` needs T1 |
| 5 | **Release / introduction date** | **An explicit dated statement.** Never a crawl timestamp, never an "Added:" field | see §3 — the strictest class |
| 6 | **Variant / configuration existence** | *(out of scope — Pass 4)* | — |

**A model may be admitted on class 2 alone.** Existence is the low bar; specification and date
are separate, higher bars that are simply left unset when unmet. An undated model with no specs
is a legitimate, honest record. A model with an invented date is not.

---

## 2. The S6 conditional-admission decision

`scope_class` is **required** on every model (schema), and rule 15 enforces: `conditional`
requires `scope_justification` prose **and** an attestation on `/scope_justification` citing at
least one **tier 1–3** source.

**Decision, per class:**

- **`core`** — WCA-legal 3×3 meeting RESEARCH_SPEC §2. The default. No extra burden.
- **`conditional`** — non-WCA-legal, admitted on documented historical or collector
  significance. **Requires the rule-15 evidence, and the justification must state the
  significance, not merely restate that the puzzle is unusual.** "It is a shape mod" is not a
  justification; "it is the only mass-produced 3×3 of its mechanism and was in continuous retail
  circulation 2015–2025" is.
- **`reference_only`** — recorded so a researcher can identify and dismiss it. Identity and
  aliases only; never exhibited. **Use this rather than inventing significance** for a product
  that is real but carries no historical weight.

**The nine non-WCA families** (`maru-nano`, `calvins-crazy-3x3`, `calvins-crazy-mirror-3x3`,
`calvins-bandaged-3x3-maze-300`, `witeden-mixup-3x3`, `witeden-super-3x3x3`,
`witeden-camouflage-3x3`, `mefferts-kokonotsu`, `mf8-crazy-3x3x3`) each already cite a tier 1–3
source, so all nine **can** satisfy rule 15. That does not make `conditional` automatic: the
justification must still be written per model and must clear the significance bar above.

`scope_decided_by` and `scope_decided_on` are set on every `conditional` record, because a
curation decision must be attributable.

---

## 3. Dates — the strictest class, and the one most often got wrong

**An explicit dated statement is required.** Acceptable: a manufacturer announcement, a dated
company-history entry, a dated press item, a specialist reference giving a release month/year.

**Never acceptable as a release date:**

- a Wayback **crawl timestamp** — it bounds when a page *existed*, not when a product launched
- a retailer **"Added:" field** — this archive has three documented catalogue-migration
  artifacts: `Added: 2018-09-11` (29 occurrences, 22 sources, **13 unrelated brands**),
  `Added: 2018-10-14` (6 sources, 5 brands), `Added: 2018-11-07` (2 brands, suspected)
- a copyright year, a review date, or a "first seen at retailer" date

Where circulation is known but launch is not, record `released`/`announced` with
`qualifier: before` at the coarsest honest precision, and say so in the attestation note.
**Circulation evidence is not release-date evidence.** Leaving a date unset is correct and
preferred over a fabricated one.

---

## 4. Retailer listings — candidate ≠ model

A retailer listing **discovers** a candidate. It does not, by itself, accept one. Before a
candidate becomes a model, rule out: a colourway or stickerless option · packaging · a bundle ·
a retailer-invented name · a regional listing of a known model · a duplicate under an alternate
romanisation · an aftermarket-serviced version of another maker's cube.

**Where corroboration is unavailable but existence is genuinely established, create the record
with `uncertain`/`reported` confidence — do not inflate, and do not discard.** An honestly
weak record is a contribution; a confidently wrong one is a defect.

---

## 5. Model vs variant — the frozen boundary test

From DATA_MODEL §4.2, unchanged:

> Could the manufacturer produce both from the same underlying design by choosing different
> parts, materials, or treatment at assembly? **Yes → variant. No → model.**

Magnets vs non-magnets, MagLev vs spring, UV coating, stickerless, colourways, limited packaging
and retailer bundles are **variants**, not models — even when they change substantial hardware.
Numbered generations, redesigned moulds and new mechanisms are **models**.

A wrong split is recoverable by merge; a wrong merge is not. When genuinely unsure, keep them
separate and record the question.

---

## 6. Taxonomy freeze

Manufacturer identities, family identities, family boundaries and manufacturer→family
relationships are **frozen**. Pass 3 does not create, rename, merge, split or re-parent
families. Apparent taxonomy errors are **escalated as issues with evidence**, and that branch of
enumeration stops rather than proceeding on a suspect parent.

---

## 7. Zero-model families are a legitimate outcome

111 families currently have no models. Some will legitimately end with none — a family may be
real and documented while its individual products are not separately identifiable. **Record the
reasoning; do not manufacture models to fill a count.** This mirrors the eight zero-family
findings that Pass 2 correctly kept.
