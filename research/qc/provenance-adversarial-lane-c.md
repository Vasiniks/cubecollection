# Provenance Adversarial Review — Lane C

## SCOPE
Hostile, independent review of the SOURCE/EVIDENCE layer, hunting the archive's most
instructive recurring failure: **the claim is correct, the pointer is correct, but the
preserved excerpt does not actually carry it** — undetectable once a capture goes dead. Rule
48 exists because of 13 such cases; this lane hunts for more, plus eight adjacent identity/
independence/confidence failure classes named in the brief.

## BASE COMMIT
460e9df (main) — "docs: window-4 checkpoint — two completed units and three external blockers"

## PRIOR WORK READ FIRST
`research/qc/provenance-adversarial-lane-d.md` (second-attempt provenance lane, base
4873931). Its three reported findings were independently re-verified against current HEAD
before this lane started any new probing:

- **CONFIRMED-1** (moyu-weilong `/introduced`, "customers also bought" claim unpreserved) —
  **already repaired**, in commit `6bf638f` (an ancestor of this lane's base). The attestation
  note now carries an explicit "EVIDENCE GAP RECORDED" admission, names the unfetchable
  capture, and keeps the confidence unchanged with a stated reason (the date does not solely
  depend on the unpreserved half). Confirmed by reading the live note in
  `data/families/moyu-weilong.yml` — matches lane D's finding and the repair commit message
  verbatim. **Not re-litigated here.**
- **CONFIRMED-2 / CONFIRMED-2b** (FanXin double-citation via `thecubicle-fanxin-3x3-products`)
  — **verified NOT a live defect.** The same commit `6bf638f` traced the history: a *later*
  repair (`208f274`) had already re-pointed `thecubicle-fanxin-3x3-products`'s `archive_url` a
  second time, to `fanxin-magnetic-3x3`, so the three FanXin source records now cover three
  distinct pages and rule 42 flags none of them. Lane D read a stale `#`-comment (itself later
  corrected) as current fact. Confirmed by reading
  `data/sources/thecubicle-fanxin-3x3-products.yml` (its comment header now narrates its own
  correction) and the current `sources:` lists on `fanxin-3x3-standard.yml` /
  `fanxin-hudong-3x3.yml`, which cite three distinct ids, not a doubled one. **Not
  re-litigated here.**

So both of lane D's substantive findings are closed at this lane's base commit. This lane
starts genuinely new ground rather than re-confirming settled history a third time.

## ATTACK CLASSES (per the brief, numbered as given)
1. Excerpts too narrow for their attestations
2. Brand-history excerpts backing product claims
3. Duplicate source records
4. Same capture, multiple ids (URL-form variance: `www.`, trailing slash, `id_`, query string)
5. Unpinned Wayback locators — what rule 47 (wildcard / midnight-exact) misses
6. Archive locator mismatch (`archive_url` vs `url`, or timestamp implausibility)
7. False independent corroboration between tier-2 retailers
8. Confidence above evidence tier — what rules 9/43 miss
9. Disputed-source blind spots (`att.sources`-only reads that skip `att.disputed[].sources`)

## METHOD
Per PROBE DISCIPLINE: every probe is validated against a known positive and a known negative
before its result count is trusted, matching logic is inspected against the actual YAML
structure (not a mental model of it), and every match batch is hand-inspected before being
reported as a finding. Discarded probes are reported with their measured false-positive rate,
not silently dropped. `scripts/lib/archive.mjs`'s `citedSourceIds()` is used everywhere an
attestation's sources are read, per the mandate.

## STATUS
IN PROGRESS. This is the skeleton commit (scope, classes, method, base, prior-work
reconciliation). Findings and probe results are added and committed incrementally per class
below.

## SUMMARY (ranked by severity)
_(to be filled in as classes are worked)_

## FINDINGS
_(to be filled in)_

## PROBES DISCARDED
_(to be filled in)_

## CLASSES SWEPT CLEAN
_(to be filled in)_

## CHANGES
_(repairs made this lane, if any, listed here with justification)_

## UNRESOLVED
_(to be filled in)_
