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
