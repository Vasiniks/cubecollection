# E2 — single-tier-4-source families: A/B/C classification

**Adjudicated:** 2026-09-03, Pass 2.5 · **Issue:** `E2` · **Baseline:** `9ec413d`

E2 originally covered **21 families** whose best available source was tier 4. The E1 tier-3
overrides reduced that to **9**, verified by re-running the tier query against live records.

Classified per the required scheme:
**A** correct but incomplete (evidence enrichment needed) ·
**B** potential taxonomy concern (boundary unsafe to freeze) ·
**C** genuine blocker (Pass 3 cannot proceed without resolution).

---

## The 9 remaining, with their current confidence state

| Family | Attestation confidences | Class |
|---|---|---|
| `diansheng-3x3-m` | positioning=uncertain · description=uncertain | **A** |
| `diansheng-solar-s3m` | positioning=uncertain · description=uncertain | **A** |
| `diansheng-stickerless-3x3` | positioning=uncertain · description=uncertain | **A** |
| `diansheng-type-e` | introduced · positioning · aliases · description — all uncertain | **A** |
| `yuxin-3x3` | positioning=uncertain · description=uncertain | **A** |
| `yuxin-fire` | successor_family_id · positioning · description — all uncertain | **A** |
| `yuxin-water` | positioning=uncertain · description=uncertain | **A** |
| `mf8-legend` | introduced=**reported** · positioning=uncertain · description=**reported** | **B** |
| `mf8-crazy-3x3x3` | introduced=**reported** · positioning=uncertain · description=**reported** | **C** |

---

## Why 7 of 9 are class A, not a taxonomy risk

**Every claim in the seven DianSheng and YuXin families is already held at `uncertain`** — the
honest level for a single tier-4 source, and exactly what the E1 downgrades were for.

The distinction that matters: **the evidence is weak, but the family boundary is not in doubt.**
Each is a distinctly *named* product line named as such by the source. Nothing about them invites
a wrong merge or a wrong split at Pass 3; a model filed under `yuxin-fire` will not be
mis-parented because the date is unknown. Weak evidence about a family is not the same as
uncertainty about *what the family is*.

**A duplicate-family risk was tested and ruled out.** `diansheng-3x3-m` and
`diansheng-stickerless-3x3` have descriptive rather than lineage names, so they were checked
directly for being one product recorded twice. They are not: the source describes the former as
a recent magnetised release and the latter as "a very bad 3x3 from when Diansheng wasn't a
reputable cube company" — different eras, separately named products.

**Class A is a research backlog, not a gate item.** These carry forward safely.

---

## `mf8-legend` — class B

Still at `reported` on tier-4-only evidence, so it sits outside the honest-labelling that covers
the other seven. Whether that survives is Agent A's adjudication (one of the 12 held
attestations). If those are downgraded to `uncertain`, this becomes class A. It is not known to
be non-WCA, so rule 15 probably does not bite — but that is being confirmed, not assumed.

---

## `mf8-crazy-3x3x3` — class C, the sole genuine blocker

A Crazy 3x3x3 (circle mechanism), almost certainly **not WCA-legal**, resting on **one tier-4
source**. Any model created beneath it at Pass 3 needs `scope_class`; if `conditional`, **rule 15
requires an attestation citing at least one tier 1–3 source**. It has none.

**Pass 3 will hard-fail validation on this family.** Its eight non-WCA siblings each cite a
tier-2 TheCubicle page and can satisfy rule 15; this is the only exception.

It was **deliberately not re-tiered** during E1 — `speedsolving-wiki-mf8-products` was left at
tier 4 rather than overridden, precisely so this blocker stayed visible instead of being
dissolved by a convenient reclassification. Under investigation by Agent B, which may also
conclude the family belongs at `scope_class: reference_only`, dissolving the problem legitimately.

---

## Severity correction

The ledger records `E2` as `severity: high`. That was accurate when 21 families were affected and
their claims were still labelled `reported`. **It is now overstated.** With 7 of 9 correctly
labelled `uncertain` and no boundary risk, the residual high-severity content of E2 is confined
to the single class-C family — which is separately tracked under `S6` and Agent B's lane.

**E2 is downgraded to `medium`**, with the class-C item carried as the real blocker. This is a
correction to the ledger's own metadata, not a softening of the finding.
