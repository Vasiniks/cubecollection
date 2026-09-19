# Audit sweep #9's non-US column understates the archive by twelve

Main session, 2026-09-19. The number was **not** changed. The column heading was.

## How this surfaced

Eleven manufacturers gained non-US sources this window (`store.maru.tw`, Taobao). Sweep #9's
"with at least one non-US source" stayed at **24 of 42** — unchanged. Either they already
counted, or the sweep could not see them.

## The cause

Sweep #9 iterates `[...fam, ...mod, ...va]` — family, model and variant records. It never reads
**manufacturer** records. Its own comment explains that choice, carefully and correctly:
including manufacturer records had been tried for the *sweep* column on 2026-09-12 and reverted
the same day, because `SWEEP_EVIDENCE` matches **prose** ("CDX", "enumerat") and manufacturer
notes mention CDX constantly as a research *method* rather than as a discovery sweep.

**That justification covers the sweep column only.** The non-US check is not prose-based — it
tests `s.region !== 'US'`, a precise field, which is exactly the precision the same comment cites
when explaining why sweep #7 *could* safely read manufacturer records. The non-US column
inherited an exclusion that was never argued for it.

## Measurement

| scope | non-US |
|---|---|
| product records only (what sweep #9 reads) | **24 of 42** |
| including manufacturer records | **36 of 54** |

Twelve manufacturers hold a non-US source cited on their manufacturer record and invisible to
this table:

| manufacturer | the invisible source |
|---|---|
| cubestyle | `maru-tw-brand-index-2026` (TW) |
| diansheng | `dianshengtoys-about-2016` (CN) |
| fanxin | `maru-tw-fanxin-brand-page-2026` (TW) |
| guojia | `baiqiang-guojia-mofang-profile` (CN) |
| lanlan | `lanlantoy-made-in-china-profile` (CN) |
| lefun | `maru-tw-lefun-brand-page-2026` (TW) |
| mefferts | `mefferts-official-site-2024` (HK) |
| mf8 | `cubingchina-about-mf8` (CN) |
| mfjs | `moyucube-official-home-2022` (CN) |
| particula | `tech-eu-particula-series-a-2021` (EU) |
| x-man-design | `qiyitoys-company-history` (CN) |
| xinlexin | `maigoo-xinlexin-brand-profile` (CN) |

**Only four are from this window.** Eight predate it, so the undercount is long-standing rather
than an artefact of the day's additions. Several are **first-party** — a manufacturer's own about
page or company history, the strongest evidence the tier system recognises — and this column
cannot see any of them.

## Why the number was left alone

RESEARCH_SPEC 3.6a check 2 does not ask for "a non-US source". It asks to **"include at least one
non-US/English RETAILER in discovery"**, and its stated reason is that one retailer's regional
catalogue can hold an entity the rest of the method never sees. A corporate about-page is not a
discovery channel. So most of those twelve would **not** satisfy the check as written even once
visible: `dianshengtoys-about-2016` is a company page, not a catalogue anyone enumerated.

Widening the scan would have moved 24/42 to 36/54 — 57% to 67% — by changing what is counted
rather than what was done. That is picking the reading that yields the better number, which this
project has refused three times now (P4-7's bound, P26-2's vocabulary count, the version-contiguity
probe).

## What changed

The **heading**, which was making a true measurement read as a false claim:

```
before:  with at least one non-US source          : 24
after:   with a non-US source ON A PRODUCT RECORD : 24   <- not the same as "has a non-US source"
```

and a block in the sweep's own output recording the twelve, the eight that predate today, and the
open question. This is the same failure mode as sweep #10's miss-rate printed under a hit-rate
heading: the arithmetic was right and the label made it mean something else.

## Open for the owner

Does 3.6a check 2 mean **a non-US retailer used in discovery** (as written, and as measured), or
**any non-US evidence**? They are different questions. The archive currently answers only the
first, and now says so. If the answer is the second, the scan should widen and the twelve above
are the immediate beneficiaries — but that is a methodology decision, not a reporting fix.
