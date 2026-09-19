# P4-7 — the catalogue-presence experiment (does `Added: 2018-09-11` bound anything?)

Base commit: `460e9df` (main). This report is read-only over `data/**` except that it may add
NEW source records under `data/sources/*.yml` if a capture is worth preserving as evidence. It
does not touch the ledger, HANDOFF.md, or any model/family/variant record — see the lane's
allow-list. The ledger status for **P4-7** stays `needs_human_decision`; this document supplies
evidence for that decision, not the decision itself.

## The question

TheCubicle's product spec table carries an `Added:` field. Four values are documented
catalogue-ingestion artefacts (batch stamps from a platform migration), the worst being
`2018-09-11` (31 excerpt-quoted occurrences across unrelated brands). The standing rule
(ledger P4-7, `research/qc/chronology-adversarial-2026-09-12.md`) is to discard the artefact
outright as a release date, "not even as a bound."

P4-7 asks a narrower question: is `2018-09-11` worthless as a date altogether, or does it still
evidence **catalogue presence** — "this product was already in TheCubicle's catalogue by
2018-09-11" — even though it says nothing about when the product was *released*?

## The exact experiment (P4-7's own recommendation)

> Find a product whose launch is independently dated **after** 2018-09-11 and check whether its
> TheCubicle page carries `Added: 2018-09-11`. **One such product settles it AGAINST** the
> bound; **a sweep finding none, across enough later products, settles it FOR.**

Two prior sweeps (2026-09-09, 2026-09-13) ran a narrow version of this (2 and then 7 products)
and found no violation, but explicitly left the issue open because the sample was small and the
recommendation forbids resolving it by picking the reading that yields more data. This report
runs the same test at a much wider scale and tries hard to falsify the migration-marker reading.

## Method

1. Build the extractor: `<th[^>]*>Added</th>\s*<td[^>]*>\s*([0-9]{4}-[0-9]{2}-[0-9]{2})`. A naive
   `Added.{0,40}(\d{4}-\d{2}-\d{2})` fails because TheCubicle's markup puts the value in a `<td>`
   **after** the `<th>Added</th>`, with markup in between — this already produced one false
   negative in a prior sweep.
2. Validate against three controls before drawing any conclusion:
   - `thecubicle.com/products/mojue-m3` → must return `2018-09-11`
   - `thecubicle.com/products/kungfu-qinghong-3x3` → must return `2018-09-11`
   - `thecubicle.com/products/gan-11-m-pro-3x3` → must return `2020-09-30`
3. Assemble a wide set of products (target 15+) whose launch is independently dated after
   2018-09-11 by a NON-TheCubicle source already in this archive (GAN's own technology-history
   page, the Speedsolving wiki, manufacturer first-party pages such as getgocube.com, or a
   competing retailer's dated capture). Obviously-2022-2026 products count without further
   independent dating, since no reading of the artefact could place them before 2018.
4. For each, locate the TheCubicle product handle (from a source already cited in the archive
   where available), fetch via CDX (`https://web.archive.org/cdx/search/cdx?url=<url>&output=json&limit=N&filter=statuscode:200`),
   replay the timestamped capture, and run the validated extractor.
5. Record every result, including no-capture and no-TheCubicle-page cases — a probe's silence is
   not evidence.

## Adversarial requirement

What would make a "settles FOR" conclusion look right while being wrong?
- A stamped product might still have launched before 2018-09-11 after all (its independent date
  could itself be a lower bound, not a launch date) — checked per-product below.
- TheCubicle could have back-filled or re-stamped `Added:` values at some later date, so the
  field reflects a later database action rather than 2018 ingestion — addressed by looking for
  ANY later distinct value and by checking whether the capture date of the tested page is itself
  plausible.
- The stamp could appear on a product whose OWN page states a later release date (a direct
  self-contradiction) — explicitly checked for in the results table.

## Controls

Extractor confirmed working (a naive `Added.{0,40}(\d{4}-\d{2}-\d{2})` would fail here — the
value sits in a `<td>` after `<th>Added</th>` with markup between; verified on the raw HTML that
this is exactly the shape TheCubicle uses).

| control | expected | result | capture used |
|---|---|---|---|
| thecubicle.com/products/mojue-m3 | 2018-09-11 | **2018-09-11** — PASS | `20200927181355` |
| thecubicle.com/products/kungfu-qinghong-3x3 | 2018-09-11 | **2018-09-11** — PASS | `20210121021815` |
| thecubicle.com/products/gan-11-m-pro-3x3 | 2020-09-30 | **2020-09-30** — PASS | `20201113160538` |

All three controls pass. Proceeding to the sweep.

## Sweep candidates (to be filled)

| model | independent date | independent source (non-TheCubicle) | TheCubicle handle | Added: value | capture |
|---|---|---|---|---|---|
| _pending_ | | | | | |

## Verdict

_pending — do not force closure. Settles AGAINST if ≥1 later-dated product carries the stamp;
settles FOR if a wide sweep finds none and later products carry their own distinct values;
otherwise state exactly what remains ambiguous and what would settle it._

## Scope not finished

_pending_
