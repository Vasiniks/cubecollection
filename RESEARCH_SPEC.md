# RESEARCH_SPEC

How research is conducted for the cubecollection archive. [DATA_MODEL.md](DATA_MODEL.md)
defines what a record is; this document defines how one gets made, what may enter the
archive, what counts as evidence, and in what order the work happens.

**No cube research has begun.** Nothing in this document contains a fact about a real
product. Where a worked example is needed it is written as a decision procedure applied to a
described situation, never as a claim about a named cube. Real examples are added during the
GAN pilot (§7), once they are sourced.

Binding on every human and every agent working on this archive.

---

## 1. The five rules that override everything else

1. **Never invent a fact.** Not a date, not a price, not a run size, not a specification, not
   a rarity assessment. A value without a source is `unknown`, and `unknown` is a perfectly
   good answer that took real work to establish.
2. **No large language model is ever a source.** Including the one reading this. Model recall
   about a product is not evidence; it is a lead, recorded in `notes`, pursued to a citable
   source, and never cited itself. This is tier 5 and rule 12 blocks it.
3. **State confidence at the moment you feel it.** Confidence assigned later is confidence
   invented later.
4. **Preserve before you cite.** Archive, capture, or excerpt. The pages this archive depends
   on are being deleted while it is being written.
5. **When two sources disagree, record the disagreement.** Do not pick one quietly. A dispute
   is data.

---

## 2. Scope policy

### 2.1 In scope, researched to full depth

- WCA-legal 3×3×3 speedcubes, approximately 2016 through 2026
- Discontinued and historical products within that period
- Smart and electronic 3×3s
- Limited, signature, collaboration, and commemorative editions
- Retailer-customised and serviced cubes, as aftermarket variants under the base model
- Notable collector editions

These carry `scope_class: core`.

### 2.2 Conditionally in scope

Non-WCA-legal 3×3s enter **only** when they are historically or collector significant, and
they enter under `scope_class: conditional` with:

- `scope_justification` — prose stating what makes this object significant
- an attestation on `/scope_justification` citing at least one tier 1–3 source
- `legality.wca_status` set to `not_legal` or `unknown`, with a `basis`

Rule 15 blocks a conditional record without both. This is the mechanism that stops novelty
cubes from swamping the archive: admission costs an argument and a source, the build keeps
conditional records behind an explicit affordance rather than in the main archive, and the
coverage report flags any manufacturer whose conditional share passes a quarter.

**Significance means documented significance.** "It is interesting" is not a justification.
A documented production first, a documented influence on later designs, a documented
collector market, or a documented place in a manufacturer's history is.

### 2.3 Budget products and rebrands

Budget lines are in scope when the product is **materially identifiable** — it has a name, a
manufacturer, and specifications a record can hold — and historically relevant.

An OEM product sold under a second brand gets its own variant record under the second
brand's model, plus a `rebrand_of` relationship to the original. **Never collapsed.** The
second product had its own name, price, market, and availability, and a collector who
encounters it needs to find it under the name it was sold as.

`rebrand_of` is a claim about the world. Rule 17 requires a tier 1–2 source: a manufacturer
statement, matching mould markings documented by someone, or a documented supply
relationship. Visual resemblance is a lead, not a claim.

### 2.4 Out of scope

Puzzles other than 3×3×3. Products outside roughly 2016–2026, except where a predecessor or
successor must be named to make a lineage intelligible — those get `scope_class:
reference_only`, identity and aliases and nothing more. `reference_only` records never enter
the public bundle; they exist so a researcher can identify something and move on rather than
re-litigating it every six months.

### 2.5 What a scope decision is

`scope_class` is a curation decision, not a fact about the object. It records
`scope_decided_by` and `scope_decided_on`. The *evidence* behind a justification is attested
like any other claim; the *decision* is signed.

---

## 3. Source practice

### 3.1 Tiers

| Tier | What | What it can establish |
|---|---|---|
| 1 | Manufacturer specification sheets and product pages, patents, official announcements, packaging, manuals, **archivist measurement and photography** | A fact alone. `confirmed` |
| 2 | Major retailer listings carrying real spec tables, established press, manufacturer material republished verbatim | `probable` alone; `confirmed` with two independent tier 2 sources |
| 3 | Named reputable reviewers, long-form community documentation, forum threads with corroborating detail | `reported` alone. Never `confirmed` without tier 1–2 support |
| 4 | Marketplace listings, aggregators, unattributed wikis, marketing copy without specifications | Corroborates only. Never establishes |
| 5 | Unsourced social posts, machine-generated content, undated screenshots of unknown origin, **any LLM** | Never cited |

Tier defaults live in `vocab/source-kinds.yml`. Overriding a default requires a
`reliability_note` saying why; rule 7 blocks a silent override.

### 3.2 Independence

Retailers copy manufacturer spec tables, and each other, verbatim. **Two listings with
identical wording are one source.** Before treating two tier 2 sources as independent
corroboration, read both: if the sentences match, you have one source and the confidence
drops accordingly. No script can judge this. It is a human gate (DATA_MODEL §7.6) and the
`source-auditor` agent's central job.

### 3.3 Marketing versus specification

Manufacturer material is tier 1 for its own specifications and tier 4 for comparative or
superlative claims. A dimension in millimetres is a specification. "The fastest cube ever
made" is copy, and copying it into `significance` is how an archive starts lying politely.

### 3.4 Physical evidence

An archivist measurement outranks any published figure, and is recorded as a `specimen`
measurement with an `archivist_measurement` source. When measurement and publication
conflict, record the conflict: the published figure is still the historical claim, and the
difference is often the interesting fact.

### 3.5 Preservation

Every source records `preservation_method`, and a source backing a critical field may not
record `none` (rule 8).

- `archive_url` — strongly preferred. Do this first, while the page is still there.
- `local_capture` — where archiving fails or does not apply: paywalled pages, video, app
  screenshots, packaging photographed in hand. Path plus checksum.
- `excerpt` — where neither is possible. The quotation must carry the claim standing alone.
  "The page said 55.5mm" is not an excerpt; the sentence containing it is.

The coverage report tracks the preservation mix so that a slide into excerpt-only evidence is
visible rather than gradual.

### 3.6 Working with web archives

Most of this archive's evidence for discontinued products lives in web archives, and two
practical facts govern how you reach it.

**`WebFetch` refuses `web.archive.org`.** Use `scripts/wayback.mjs`, which goes over plain
HTTP and wraps the CDX API so nobody has to rediscover this:

```
npm run wayback -- list    <url> [--from YYYY] [--to YYYY] [--limit N]
npm run wayback -- prefix  <url-prefix> [--limit N]
npm run wayback -- nearest <url> <YYYYMMDD>
npm run wayback -- get     <url> [YYYYMMDD]
```

`list` collapses identical digests, so each row is a real change to the page rather than
another crawl of the same content — which makes it a cheap way to find when a product's
specifications or price actually moved.

**`prefix` is the discovery workhorse.** It enumerates every URL ever captured under a path,
including ones the live site has deleted. A manufacturer's or retailer's product path is
therefore a list of what they once sold, and that is where discontinued products, limited
editions, and regional exclusives survive. Start discovery there rather than from the live
catalogue, which by construction shows only what is currently for sale.

`get` returns the snapshot with tags stripped, using the `id_` raw form so the archive's own
banner and rewriting do not contaminate an excerpt.

### 3.7 Translation

Machine-translated material keeps the original text in `excerpt` and gets a
`reliability_note`. Specification numbers survive translation. Product naming, edition names,
and marketing claims frequently do not, and a mistranslated edition name becomes a phantom
variant that takes years to notice.

---

## 4. The model/variant boundary, worked

The rule, from DATA_MODEL §4.2:

> A mechanical difference belongs at **model** level only when it represents a distinct
> underlying design, mould, or mechanism — not merely a sold configuration.
>
> A manufacturer-sold configuration difference belongs at **variant** level even when it
> changes substantial hardware.

The test:

> Could the manufacturer produce both from the same underlying design by choosing different
> parts, materials, or treatment at assembly?
> **Yes → variant. No → model.**

### Worked decisions

Each of these is a situation, not a product. Apply the same procedure to real evidence.

**A. Two products share a name; one has a ball core, one does not; the manufacturer lists
them as options of a single product.**
Same shells, different core parts chosen at assembly. → **Two variants of one model.**
Substantial hardware difference is not the test; separability at assembly is.

**B. Two products share a name and a version number, but the plastic pieces are visibly
different mouldings with different internal geometry.**
Not producible from one design. → **Two models**, with `succeeds` or `reissue_of` as the
evidence supports. Shared marketing name goes in `aliases`.

**C. The manufacturer releases the same design a year later, unchanged mechanically, in new
colours.**
→ **Same model, new variants.** The year suffix goes in `aliases` and in the release dates,
not into a new model record.

**D. A retailer applies a coating and sells the result under its own product name.**
→ **A variant of the base model**, with `config.coating`, `config.coating_applied_by`, and a
`modified_from` relationship to the exact base variant. The retailer is a `manufacturer`
record with `kind: service`.

**E. Two brands sell what appears to be the same physical cube under different names.**
→ **Two variants under their own brands' models**, joined by `rebrand_of` — but only once a
tier 1–2 source establishes it. Until then, record both independently, note the suspicion in
`notes`, and let `check-duplicates.mjs` keep raising it.

**F. Collectors report a mid-production change nobody announced.**
→ **A `model.revisions[]` entry**, `basis: community_reported`, with `distinguishable_by`
recording how to tell them apart. Not a new model, and not a variant unless it was sold as a
distinct product.

**G. The evidence is genuinely unclear whether the mechanism changed.**
→ **Split into two models** with a `succeeds` relationship and `confidence: uncertain` on the
generation claim. Splitting is recoverable by merge; collapsing loses the distinction
silently and nobody ever notices.

### The materiality test for variants

A new variant is **required** when any of these differ: magnet configuration or architecture;
core system; MagLev; adjustment system; coating including aftermarket; colourway or sticker
type; manufacturer edition designation; limited / commemorative / signature / collaboration
status; smart capability; materials the manufacturer distinguishes; packaging, only when it
is the sole distinguishing feature of a separately marketed edition.

A new variant is **not** created for: region of sale, retailer naming, price alone, bundle
membership, undeclared batch changes, or factory lubrication differences.

---

## 5. The nine passes

Depth-first per manufacturer, breadth-first within one. Enumerate before filling, so the
shape of what is missing is visible early instead of discovered at the end.

| Pass | Work | Output status | Gate |
|---|---|---|---|
| 1 | **Manufacturer register.** Manufacturers, sub-brands, aftermarket services active in the period | `drafted` | — |
| 2 | **Family enumeration.** Product lines and their spans | `drafted` | **Human review before pass 3** |
| 3 | **Model enumeration.** Design generations, applying §4 | `stub` | — |
| 4 | **Variant enumeration.** Every materially distinct configuration sold | `stub` | **Human review before pass 5** |
| 5 | **Tier 1 fill.** Primary sources only | `sourced` | — |
| 6 | **Corroboration.** Tier 2–3 for what tier 1 did not cover | `sourced` | — |
| 7 | **Conflict adjudication.** Disputes worked in batches | — | — |
| 8 | **Media.** Imagery with rights and provenance | — | — |
| 9 | **Review and publish.** Full QC per record | `published` | **Human review** |
| — | **Maintenance.** Link sweeps, availability re-checks, duplicate queue | — | — |

**Pass 2 is the pass people skip and regret.** A missed family is not a missing row; it is a
systematically missing region of the archive, and nothing downstream will reveal it.

**Pass 4 is the hardest and the one that decides whether this is collector-grade.** Consult in
this order: manufacturer product pages including archived versions, historical retailer
listings including delisted ones via web archives, community release threads, packaging
photography. Enumerate identity and aliases only — filling comes later. Seeing the whole
variant tree before spending effort on any one variant is the entire point.

### Working rules

- **Never batch-fill from a single retailer.** It is the fastest way to fill the archive and
  the fastest way to make it worthless: one source repeated N times, propagating that
  retailer's errors uniformly and invisibly.
- **Keep a session log.** What was searched, what was not found, what leads remain. A dead
  end that is not recorded gets walked again in three months.
- **Record `unknown`, not silence.** `unknown` means someone looked. Absent means nobody has.
  The coverage report separates them, and that separation is the archive's honest measure of
  itself.

---

## 6. Confidence, in practice

| Value | Use when |
|---|---|
| `confirmed` | A tier 1 source states it, or two genuinely independent tier 2 sources agree |
| `probable` | One tier 2 source, nothing contradicting |
| `reported` | A tier 3 source, nothing contradicting, and it is plausible |
| `uncertain` | Single weak source, or the claim is internally implausible |
| `disputed` | Credible sources disagree. Record every candidate with its own sources |
| `unknown` | You looked and did not find it |

A normalised colour read off a photograph carries `derived_from: sampled_from_image` and can
never be `confirmed` (rule 16) — a photograph carries the lighting and white balance of
whoever took it, and procedural rendering built on sampled pixels would silently encode a
stranger's camera settings as manufacturer specification.

Adjudicating a dispute means writing `adjudication` prose explaining the reasoning, plus
`adjudicated_by` and `adjudicated_on`. An unresolved dispute is a permanent honest state, not
a failure; it simply blocks `published`.

---

## 7. The GAN pilot

**After the schema is in force, research does not scale to all manufacturers.** One
manufacturer goes end to end first, and then the schema is audited against what actually
happened.

### 7.1 Scope of the pilot

GAN, complete: manufacturer → families → models → variants → sources → prices → media →
relationships → QC → build output. Every pass, in order, with both human gates observed.

### 7.2 The pilot must deliberately include

The pilot is not finished until it has found, researched, and represented at least one
documented instance of each of these — or has recorded, with evidence, that no instance
exists within GAN:

| Case | Why it is in the pilot |
|---|---|
| Multiple generations | Exercises §4.2 and `succeeds` lineage |
| Coating variants | Exercises the coating axis and the materiality test |
| Core and magnet variants | The hardest boundary call: substantial hardware, same design |
| MagLev configurations | Exercises the maglev/core compatibility warning |
| Limited editions | Exercises `edition.limited`, run size, and rarity factors |
| Smart products | Exercises the `smart` block and `smart_version_of` |
| Retailer customisations | Exercises `modified_from` and service manufacturers |
| Colourway differences | Exercises the expanded colourway and completeness derivation |
| Aliases | Exercises identity resolution and the duplicate queue |
| Discontinued products | Exercises inferred discontinuation and `last_seen_available` |

### 7.3 The audit

At the end of the pilot, `docs/pilot-audit.md` is written, answering per case:

1. Did the schema represent it without contortion?
2. What was forced into `notes` that deserves a field?
3. Which QC rule fired incorrectly, and which should have fired and did not?
4. Where did the model/variant boundary produce an answer that felt wrong, and why?
5. What did the coverage report say, and is that honest?

Then a go/no-go: **either** the schema is amended and the pilot re-run, **or** research
scales to the next manufacturer. Scaling before that audit is how a schema flaw gets
replicated across ten thousand records.

---

## 8. Where research output goes

| Kind of output | Destination |
|---|---|
| Records | `data/<entity>/…` only |
| New sources | `data/sources/…` |
| Local captures | `assets/captures/…` |
| Images | `assets/images/…` |
| Session logs, leads, open questions | `research/notes/…` |
| Pilot audit | `docs/pilot-audit.md` |

Research never edits `schema/`, `vocab/`, `scripts/`, `dist/`, or the documents at the
repository root. A schema that will not represent something is a finding, written up as a
finding, and changed deliberately by a human — not worked around in the middle of a
research session.

---

## 9. Definition of done, per record

A record is `published` when:

- `npm run validate` passes with it in the tree
- every critical field is attested, or attested `unknown`, or inherited from an attested model
- every source backing a critical field preserves its evidence
- disputes are adjudicated or honestly left `disputed`
- `npm run lint` raises nothing unexplained
- it is not sitting in the duplicate queue
- `significance` prose, if present, carries no unsourced superlative
- a human has read it
