# Adversarial QC sweep — 2026-09-11

**Question:** what can be wrong while `npm run check` reports zero errors?

Six deterministic sweeps were run against the whole archive. **Every one came back clean**, and
the interesting part is *why* — four of them produced large hit counts that turned out to be
defects in the probe rather than in the data. That is recorded here because a future sweep will
hit the same traps.

## Result

| Sweep | Raw hits | Real defects |
|---|---|---|
| A · exact-precision date absent from its sources | 1 | **0** |
| B · variant spec implausibly far from its model | 1 | **0** |
| C · confidence stronger than the best available tier | 353 | **0** |
| D · variant name implies an axis the config omits | 31 | **0** |
| E · two variants of one model structurally identical | 18 | **0** |
| F · service variant with a broken parent chain | 0 | **0** |

## What each false positive taught

**C — 353 hits from one wrong line.** `loadVocabularies()` returns a **Map**, not a plain object,
so `v['source-kinds']` was silently `undefined` and every tier defaulted to 5. The output claimed
"tier 5" for `manufacturer_official` sources, which is impossible — that impossibility is what
exposed the bug. Using the archive's own `sourceTier()` resolver: **zero hits**. No confidence in
the archive exceeds its evidence.

**E — 18 pairs that differ in fields I did not compare.** The key covered `config`,
`edition.types`, `colorway` and `smart`, but not `edition.name`, `packaging`, `releases` or
`service`. MFJS MeiLong V2 *Standard* and *Lite* differ **solely by packaging** — "Accessories:
Yes" versus "None" — which DATA_MODEL §4.1 axis 11 explicitly admits as a distinguishing axis.
Comparing every field: **zero**.

**D — 31 hits, and the last 25 needed a judgement rather than a code fix.** Six were service
variants that record a modification in `service.modifications` and *deliberately decline* to infer
a config value from it — `gan-flagship-16--picube-20-magnet-ball-core-mod` says so in its own
note. Two more were the model-level `magnet_architecture` field, which encodes the same axis under
a different name.

The remaining 25 are variants whose name contains "Magnetic" with no `magnet_configuration` set.
**That is the archive's discipline, not a gap.** Only 5 of 31 such variants set the field, and
checking all five settles it: every one was set because a *source described the arrangement*
("Balanced corner-edge magnets", "introducing core magnets", a purchase option named
"Non-Magnetic") — never because the name said "Magnetic". Recording `single_layer` from a product
name would be inference from a name, which this archive refuses.

**A — a date format, not a missing date.** `mfjs-meilong-3c` claims `2019-11-13 exact` and its
source states `"Released: 11/13/19"`. The probe searched for the four-digit year.

**B — a Mini is lighter than its parent.** `fangshi-jieyun-original--mini` at 80 g against a 91 g
model, 12% apart, is a 54.6 mm variant of a 57 mm cube with the weight directly sourced.

## Nothing was promoted to a rule

None of the six describes an invariant the archive violates, so adding any of them would encode
today's data rather than a real constraint — the failure mode DATA_MODEL §7 warns against. Sweeps
C and E are worth re-running after any large variant import; both are cheap and both now have
their traps documented.

**The one thing worth carrying forward:** a probe that reports an *impossible* value is more
trustworthy than one that reports a plausible one. Sweep C was caught because tier 5 on a
manufacturer's own page cannot happen. Sweep D's 25 survivors looked entirely plausible and were
still wrong.
