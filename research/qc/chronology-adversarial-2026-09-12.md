# Chronology adversarial QC — 2026-09-12 (main session lane)

```
SCOPE: date semantics, date-vs-evidence ordering, succession ordering
BASE COMMIT: 78d0097
STATUS: complete
RESULT: no defects found. Three probes run; one discarded at a 100% false-positive rate.
```

Run in the main session while five specialist lanes worked other scopes. Deliberately chosen to
avoid the provenance lane's territory: that lane audits SOURCE IDENTITY and EVIDENCE
PRESERVATION, this one audits DATES.

## 1. Every `exact`-qualifier date, checked by hand — 16 of 16 sound

`exact` is the archive's strongest date claim, so the whole class is small enough to read. All 16
carry an explicit note distinguishing a stated release date from the retailer `Added:`
catalogue-ingestion artefact, and every confidence is calibrated to its tier: tier 3 wiki ->
`reported`, tier 2 retailer -> `probable`, tier 1 manufacturer -> `confirmed`. No `day`-precision
date rests on anything weaker than an explicitly dated retailer statement.

ONE WAS CHECKED FURTHER because it has the shape of a known trap. `qiyi-valk-3`'s 2016-08
announcement is sourced to `thecubicle-valk-3-mini-product` — a page about a DIFFERENT model,
which is exactly the sibling-source pattern that put a 4x4's mass on the Valk 3 in the weight
queue earlier today. Here it holds: the sentence reads "The Valk 3 Mini is the miniature version
of the highly-acclaimed Valk 3, WHICH was first released to the market in August 2016", and the
relative clause attaches to the Valk 3. Correct as recorded.

## 2. Succession ordering — 58 pairs, 0 contradictions

For every `relationships[].type: succeeds` where both models carry a date, the successor's date
was compared against the predecessor's. 58 pairs qualify; none is inverted. The archive's
succession chronology is internally consistent.

The discontinued-before-released check is VACUOUS and is recorded as such: no model in the
archive carries both a release date and a discontinued date, so the check has nothing to test.
It should be re-run if discontinuation dates are ever populated.

## 3. Date-later-than-its-own-evidence — PROBE DISCARDED, 39 of 39 false

The idea: a product cannot be released after a page selling it was captured. The probe compared
each date against the capture timestamp in its cited source's `archive_url`, over 250
comparisons. It returned 39 hits and EVERY ONE IS A FALSE POSITIVE, from two independent causes.

**Cause 1, mine.** Normalising a bare year to December made every year-precision date later than
any mid-year capture. A cube released in March 2019 and captured in July 2019 is perfectly
consistent, and the probe called it a contradiction.

**Cause 2, and this one is worth keeping.** Several sources are GROUPED MULTI-CAPTURE RECORDS:
one `archive_url` field holds the FIRST capture while the preservation_note lists the others.
`thecubicle-us-moyu-early-3x3-lines` carries a 2013-06-22 `archive_url` and names six snapshots
in its note — 2013-06-22, 2014-03-05, 2015-09-18, 2015-10-04, 2015-05-09, 2015-10-15 — so its
2015-10 release claims rest on the 2015-10 captures, not the 2013 one. Same shape on
`thecubicle-dayan-tengyun-descriptions` (whose note names a 2023-01-31 V3 M capture behind a
2020-09 `archive_url`) and `thecubicle-fanxin-3x3-products`.

**A SINGLE `archive_url` IS NOT THE WHOLE OF A GROUPED SOURCE'S EVIDENCE.** Any future check that
reasons from `archive_url` alone — chronological or otherwise — will be wrong on these records.
That is the durable finding here, and it is the reason this probe is not shipped: it cannot
distinguish a real contradiction from a grouped source without parsing prose out of
preservation notes, and a check that cannot be made precise is a check that gets ignored.

## Unresolved

None from this lane. The grouped-multi-capture observation is handed to whoever next writes a
locator-based check.

---

# Specification coherence — 2026-09-12 (same lane, second sweep)

```
SCOPE: internal contradictions between model specs, variant config, and record names
RESULT: no defects found. Two probes discarded; one refined probe returned a real zero.
```

Chosen to stay clear of the provenance lane, which asks whether a claim is EVIDENCED. This asks
whether the archive's claims are CONSISTENT WITH EACH OTHER, which no source can settle.

## Probes discarded — 9 of 9 false

**"A variant config value that differs from its model's spec."** Eight hits, all correct records.
This is what a variant override is FOR: `fangshi-jieyun-original--mini` is 54.6mm against a
57.0mm model because it IS a mini, and the HuaMeng YS3M maglev variants are 83g against 76g
because MagLev adds mass. Rule 23 already polices the opposite and real error — an override that
RESTATES the model value and therefore changes nothing — and it currently reports zero.

**"magnet_configuration: none on a record whose name says magnetic."** One hit,
`mfjs-meilong-3x3--non-magnetic`, and the probe matched "magnetic" as a substring of
"NON-magnetic". A textbook substring bug in a probe written to find textbook bugs.

## The refined probe, and its real zero

The sharp version of the first idea is not "does a variant differ from its model" but **"is
there a model spec value that EVERY one of its variants contradicts?"** — because such a value
would describe no product the manufacturer ever sold, while still being inherited by anything
that does not override it.

Zero across the archive. Every model spec value is either left unoverridden or agreed with by at
least one of its own variants.

## Note for the next person

Both discarded probes failed in the same direction: they treated a DIFFERENCE as a DEFECT. In a
model/variant archive the difference is usually the point. A coherence check has to ask what
combination is IMPOSSIBLE, not what combination is unequal.

---

# Taxonomy stress test — 2026-09-12 (same lane, third sweep)

```
SCOPE: duplicate models, naming and transliteration collisions, manufacturer/sub-brand confusion
RESULT: no defects. Three probes clean; a fourth discarded as meaningless in this domain.
```

## Clean, and worth stating as numbers

- **Normalised model-name collisions: 0.** No two of the 269 models reduce to the same
  alphanumeric string. Transliteration collisions — the risk with Chinese brand names rendered
  into Latin script — do not occur.
- **Models whose NAME names a different manufacturer: 0.** The probe expanded every
  manufacturer's name and aliases and looked for one brand's name inside another brand's model
  name, which is how sub-brand confusion shows up. Nothing, related or unrelated.
- **Model/family manufacturer mismatch: 0.** No model sits in a family belonging to a different
  manufacturer.

## The discarded probe, and why its 160 hits mean nothing

"Two model names within one manufacturer differing by two characters or fewer" returned 160
pairs. Every one is a false positive BY CONSTRUCTION, because that is exactly how this domain
names things: GAN12/GAN13/GAN14, Tornado V1/V2/V3, GuHong V2/V3, MF3RS/MF3RS2/MF3RS3, Warrior
S/W/M. A near-identical name inside one line is the naming convention, not a collision.

The lesson is the same one the specification sweep learned an hour earlier: a difference is not
a defect. A useful taxonomy probe has to look for an IMPOSSIBLE relationship, not a small one.

## The one pair that deserved checking, and its answer

`qiyi-mp-original` ("QiYi MP") against `qiyi-m-pro-standard` ("QiYi M Pro") is the shape of a
real duplicate: MP is a plausible abbreviation of M Pro, and a duplicate model inside a frozen
269-model inventory would be a serious finding.

They are two products. QiYi MP is an **October 2021 flagship at 56mm**, described by the wiki as
bearing "a striking resemblance to the X-Man Tornado V2". QiYi M Pro is a **mid-2023 budget
magnetic 3x3 at 55mm**. Different year, different positioning, different size, different family,
and the same source distinguishes them in its own text. Correctly separate.

---

# Variant semantics — configuration axes named but not recorded — 2026-09-12 (fourth sweep)

```
SCOPE: axes asserted in a record's own name/designation but absent from its machine-readable config
RESULT: one defect corrected (my own, made earlier the same day); a 109-gap pattern documented
        and deliberately NOT bulk-edited.
```

## The probe discriminates, which is why its hits are worth reading

Across all variants, for each axis named in a record's `name`, `edition.name` or
`edition.designation`: **UV named in 55 records, missing from config in 0. Frosted named in 9,
missing in 0.** Those zeros are what make the rest meaningful — the probe is not simply firing
everywhere. Against that: **MagLev named in 78, missing in 6.**

## The defect, and it was mine

`gan-356-maglev--uv-coated`, written earlier today, carried only `coating: uv`. The record's own
comment justified that: the maglev value "sits on the baseline variant and is inherited".

**That reasoning is wrong. Inheritance runs MODEL -> VARIANT, never variant -> sibling variant**,
and `gan-356-maglev` carries `specs: None`. So a record whose own name says "MagLev" did not say
anywhere that the cube was MagLev. Rule 23 forbids restating the MODEL's value and has nothing to
say about a sibling's; I applied it one level too far. Corrected, with the mistake left visible
in the record rather than quietly overwritten.

Five others share the shape and are left for a pass that can source them properly:
`gan-ui-12-maglev--10th-anniversary` (config entirely absent), and four PiCube service-mod
variants on `gan-flagship-16`, `gan-flagship-12` and `gan-v100-maglev` whose names all begin
"GAN… MagLev".

## The wider pattern — 109 gaps, 31 models, NOT bulk-edited

The sharper form of the question is not "is the axis in the name" but **"do two or more siblings
record this axis while another omits it, with no model-level value to inherit?"** That returns
109 variant-field gaps across 31 models.

Most are NOT errors. `dayan-guhong-pro-m--54mm-standard` omits `maglev` because it is the
non-MagLev version; `moyu-weilong-v9--standard` omits `core_system` because it has no ball core.
But the archive is inconsistent about how it says that: some records state `maglev: none`
explicitly (`gan-flagship-12--m-leap`, the Super WeiLong Lite spring-tension variants) and others
simply omit the key.

**This is the same distinction the archive already draws carefully one layer up.** In attestations,
`unknown` means searched-and-not-found while absence means not-searched — a distinction the
project treats as load-bearing. At the config layer it is not applied consistently: `none` and
absent are used interchangeably.

Recording `maglev: none` on 109 fields would be asserting 109 claims, each needing a source.
That is a decision about convention, not a cleanup, and it belongs to whoever owns DATA_MODEL
rather than to an adversarial sweep. Documented here as a finding.

---

# Source resilience — what survives if web.archive.org does not — 2026-09-12 (fifth sweep)

```
SCOPE: how much of the archive's evidence depends on a single external service
PROMPTED BY: web.archive.org returning HTTP 503 "Internet Archive: Temporarily Offline"
             for the whole working day, across three independent attempts by two lanes.
RESULT: the archive is substantially resilient. 2 edge cases, both already documented.
```

A preservation archive that cannot be read without one third party is not preserving anything.
Today's outage made the question concrete rather than theoretical, so it was measured.

## The distribution, all 586 sources

| | excerpt ≥ 200 chars | excerpt 1–199 | no excerpt |
|---|---|---|---|
| has `archive_url` | **471** | 43 | 2 |
| no `archive_url` | 67 | 3 | 0 |

**471 of 586 carry a substantial local excerpt alongside their capture.** If the Internet Archive
disappeared tomorrow, those records still hold the words they rest on. That is the archive's
`excerpt` discipline doing exactly what it exists for, and it is worth stating as a number rather
than an assumption.

## The two cited sources with NO excerpt — both explained in their own records

`cuboss-mfjs-brand-page` has no excerpt because its evidence is not prose. Its preservation_note
says so: "The evidentiary content is the URL path itself" — the retailer files "Cubing Classroom
(MFJS)" as a category nested under a `moyu` brand path, and that path is IN THE RECORD, in the
`url` field. It survives a Wayback outage intact. It backs `mfjs` `/kind` and `/parent_id` at
`confirmed`, which was checked: those attestations also cite `moyucube-official-home-2022`, MoYu's
own site at tier 1, so the `confirmed` rests on first-party evidence and Cuboss is corroboration.

`licenseglobal-spinmaster-rubiks` has none because the captured article body was "largely site
navigation in the captured/tag-stripped form". It is cited once, on `rubiks` `/notes` at
`probable`, corroborating `spinmaster-rubiks-acquisition-2021` — Spin Master's own announcement,
tier 1. Low stakes and already redundant.

Neither absence is accidental. Both records say why.

## What this does not clear

The 43 cited sources with a 1–199 character excerpt are thinner, and `ganspuzzle-brand-intro-2011`
is the one to watch: 81 characters, `link_status: dead`, so its live page is already gone and only
the capture stands behind it. That is not a defect today — it is a dependency, and it is the shape
a defect would take if the Internet Archive's outage were permanent rather than a day.

Re-verifying every record created during the outage against a real `archive_url` is listed in
HANDOFF as a follow-up. Three are affected.

---

# Source-identity duplication — the gap is real, the problem is not — 2026-09-12 (sixth sweep)

```
SCOPE: does the archive hold the same source content under two different ids?
ORIGIN: left open by the provenance adversarial lane, which observed that
        check-duplicates.mjs fingerprints VARIANTS and never sources.
RESULT: the gap in the tooling is real. The defect it would catch is not present.
```

## The gap is confirmed

`scripts/check-duplicates.mjs` loads `byEntity.get('variant')` and fingerprints those alone. No
entity other than variant is fingerprinted, so two source records holding the same content under
different ids would collide with nothing. Rule 42 catches duplication by LOCATOR — same page,
same capture — but not duplication carried in prose under two different URLs.

## Measured: 1 pair out of 476 sources, and it is not a duplicate

Every source with a 300+ character excerpt was reduced to 8-word shingles and compared pairwise —
roughly 113,000 pairs. **Exactly one pair exceeds 50% overlap**, at 0.56:
`thecubicle-huameng-tg-3x3-maglev-ball-core` and `thecubicle-huameng-tg-3x3-ball-core-uv`.

They are two different products. Different URLs, different captures, and the archive already
distinguishes them on evidence: the first records an 84.0 g item weight and `maglev:
ball_core_maglev`, the second records 81.0 g and `coating: uv`. What overlaps is the retailer's
shared product copy, which a retailer reuses across configurations of one product by design.

## Why no check is being built

A source-fingerprint check would have exactly one thing to say about this archive today, and that
one thing would be wrong. Shared retailer boilerplate across sibling configurations is the normal
case, not the defect — the same reasoning that stopped the rule-42 `speedsolving-wiki-*-products`
pairs being "fixed", since those are deliberate.

Recorded so the next person does not have to re-derive it. The threshold worth revisiting is
near-identity (0.9+) rather than similarity, and at that threshold today's archive has zero pairs.
