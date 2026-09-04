# Finding: 10 models predate their own frozen family's `introduced` date

**Found:** 2026-09-04, during Pass 3 Batch 3 verification · **Issue id:** `P3-D1`
**Severity:** medium · **Blocks Pass 3:** no · **Families mutated:** **NONE**

## How it surfaced

Agent D reported that MoJue M3 is documented in retail circulation by 2017-04, while its frozen
family record reads `circa 2020`. Rather than treat that as a one-off, I swept the whole archive
programmatically. **It is not a one-off: 10 models across all three Pass 3 batches carry a date
earlier than their own family's `introduced`.**

## The gap that let it through

**No rule detects this.** Confirmed by inspection of `scripts/validate.mjs` and
`scripts/lint-semantic.mjs`: nothing compares a model's `released`/`announced` to its family's
`introduced`. A model dated years before the family that contains it is schema-valid and passes
`npm run check` silently.

This is the same shape as the earlier rule-9 defect, where the rule's message claimed an
independence check the code never performed. A rule that cannot fail is not a check.

## The 10 cases, in two classes

### Class A — precision artifacts, NOT errors (3)

| Model | Model date | Family date |
|---|---|---|
| `dayan-panshi-v1` | 2013 circa | 2013-02 circa |
| `mfjs-mf3-v1` | 2016 circa | 2016-10 circa |
| `mfjs-mf3rs` | 2016 circa | 2016-10 circa |

A year-precision date always sorts before a month-precision date in the same year. These describe
the same approximate moment at different precisions and require no action.

### Class B — genuine evidence conflicts (7)

| Model | Model date | Family date | Gap |
|---|---|---|---|
| `mohuanshousu-chufeng-standard` | before 2016-10 | 2020 circa | ~4 yr |
| `mojue-m3-standard` | before 2017-04 | 2020 circa | ~3 yr |
| `senhuan-mars-original` | before 2016-10 | 2019 circa | ~2 yr |
| **`qiyi-valk-3`** | **2016-08 exact** | 2018 circa | ~2 yr |
| `yancheng-yan3-standard` | before 2017-04 | 2018 circa | ~1 yr |
| `newisland-lightning-v2` | before 2019-07 | 2020 circa | ~1 yr |
| `guoguan-yuexiao-original` | 2015 exact | 2016 circa | ~1 yr |

## What this actually means — the healthy reading

**These are not Pass 3 errors. They are evidence of Pass 3 working.**

Pass 2 dated families from whatever was to hand, often a single retailer listing, and recorded
`circa` accordingly. Pass 3 went product by product and found earlier, better-sourced evidence —
first-party pages, non-US retailers, earlier archived captures. The model dates are the stronger
claims.

The consequence is that **seven frozen family records now understate their own introduction
dates.** `qiyi-valk-3` is the clearest: an *exact* 2016-08 model date against a family recorded
`circa 2018`.

## Why nothing was changed

Family records are frozen for Pass 3, and `introduced` is a family-level field. Correcting these
is a **Pass 2 taxonomy action requiring deliberate adjudication**, not something to slip in under
a model-enumeration pass. Every affected model keeps its better-evidenced date; every family keeps
its recorded one; the discrepancy is documented here rather than silently reconciled in either
direction.

## Recommended remediation (not applied)

1. **Add a lint rule** comparing a model's `released`/`announced` against its family's
   `introduced`, warning when the model is earlier by more than the coarser date's precision
   window. That precision allowance is what keeps Class A quiet while surfacing Class B.
2. **Adjudicate the seven Class B families** in a dedicated pass, moving each family's
   `introduced` back to the earliest well-evidenced model date and re-attesting it.
3. Treat this as a **general expectation**, not an anomaly: Pass 3 will keep producing better
   dating evidence than Pass 2 had, and later passes will do the same to Pass 3.
