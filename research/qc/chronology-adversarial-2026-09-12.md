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
