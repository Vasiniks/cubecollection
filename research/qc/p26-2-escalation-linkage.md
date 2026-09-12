# P26-2 — escalation linkage, measured in both directions

```
SCOPE: research report -> machine-readable escalation block -> ledger id -> status -> resolution
ORIGIN: Lane C, 2026-09-12. The lane was terminated by a session limit; its uncommitted work was
        recovered, verified and finished in the main session. See agent-lane-recovery-2026-09-12.md.
```

## What the checker did not do before

`scripts/check-escalations.mjs` policed the FORWARD direction — a report declares an escalation,
the escalation carries a ledger id, the id exists — and two things were missing.

**It had no test coverage at all.** It read `research/qc` and the ledger through hardcoded
relative paths, so it could not be pointed at a synthetic archive, and neither of its rules had
ever been proved to fire. It now resolves both through `CC_DATA_ROOT`, the same override
`lib/archive.mjs` uses for the record tree.

**The chain's last two links were unchecked.** The chain ends "-> status -> resolution", and
`status:` was free text to every tool that read it.

## Rule 51 — the ledger status vocabulary

An issue whose status is missing or misspelt cannot be resolved, reopened or counted: it drops
out of every roll-up silently, which is the exact failure P26-2 exists to prevent.

Measured across all 59 issues before shipping: **every one already holds a documented value**
(open / in_progress / resolved / wont_fix / needs_human_decision). A clean baseline, not a defect
list. The rule has zero false-positive exposure on the real archive and exists to catch the next
typo, not this one.

## The reverse direction — measured, deliberately NOT enforced

Does a ledger issue cite back to the report that raised it? **13 of 59.**

The other 46 are not broken. They predate the escalation-block convention (introduced 2026-09-09)
or are meta-findings the main session filed directly while auditing the ledger itself, rather than
escalated up from an agent's report.

A rule demanding the backlink would fire on **46 of 59 — 78% — forever**, for structural reasons
that have nothing to do with whether any finding is sound. That is the "cries wolf" failure this
file's own header warns about, and a check whose red is uninformative is as useless as one whose
green is. So the number is REPORTED, in the check's own output beside the forward-direction counts
it qualifies, and nothing enforces it.

## Fixtures, and the way they failed first

`tests/fixtures/{pass,fail}/research/qc/` now carry a miniature ledger and a report each, and
`npm run selftest` asserts four things: rule 51 fires on both its branches, rule 50 fires on a
dangling id, the fail fixture exits non-zero, and the pass fixture raises nothing at all.

**Both fixtures were wrong on the first attempt, and instructively so.** Entries were written at
column 0 where the parser requires leading whitespace, and the ids were `ZZ1-1`-style strings that
match no pattern in `ID`. The escalation block therefore parsed as ZERO entries while looking
perfectly correct to a reader — which is precisely the silence this checker exists to prevent,
reproduced by accident inside its own test. That is recorded in the selftest comment.

## Unresolved

`reports with escalation language and no block : 39`. That number is the original P26-2 gap and
is untouched here. Whether those 39 contain real findings that never became escalations is a
reading job, not a tooling job, and no heuristic should be pointed at it — the header's warning
about not converting every sentence containing "issue" or "gap" into an escalation applies.

## 2026-09-12 — the "escalation language and no block" number, adjudicated

This check has printed one bare, unqualified number since it was written: **43 reports with
escalation language and no block**. Read literally it says forty-three findings may have gone
missing, which is the exact failure P26-2 exists to prevent. It was adjudicated rather than
either enforced or ignored, and it does not say that.

### Split 1 — by whether a block was even possible

The machine-readable `escalations:` block convention was introduced **2026-09-09**. Taking each
flagged report's creation date from `git log --diff-filter=A`:

| | n |
|---|---|
| created BEFORE the convention | **36** |
| created on or after it | 7 |

Thirty-six of the forty-three could not have carried a block. They are the population the P26-2
retrofit already swept by hand, which is how eighteen previously unfiled escalations reached the
ledger in the first place.

Of the seven created since, **not one is a lost finding**:

- `HANDOFF.md`, `agent-lane-recovery-2026-09-12.md` — roll-ups that *report* escalation counts.
- `p26-2-escalation-linkage.md` — this file, which is about the mechanism.
- `p4-9-alias-blindness-2026-09-12.md` — refers to an escalation already filed.
- `provenance-adversarial-lane-d.md` — its only match is a **quoted commit message**.
- `post-pass4-qc.md` — names its finding's ledger id in prose: "escalated as **P4-9**". Filed;
  only the block is absent.
- `dayan-depth-lane-e.md` — "a live lead — noted for completeness rather than escalated", an
  explicit and deliberate **non**-escalation.

### Split 2 — by whether the prose is traceable at all

Computable, and now printed by the check itself: does the report name a **real ledger id**
anywhere in its prose?

| | n |
|---|---|
| names ≥1 id that exists in the ledger | **27** |
| names none | 16 |

The 27 reached the ledger; only the mechanisation is missing. The 16 were sampled by hand, and
the residue is still **vocabulary rather than state**. Three distinct false-positive mechanisms:

1. **A quoted commit message.** `provenance-adversarial-lane-d.md` matches solely on the text of
   a commit it cites.
2. **A write-lane handoff, not a ledger escalation.** `agent-a-qiyi-remediation.md` says "out of
   my write lane — flagged for the main session" three times. That is one agent handing work to
   another, a legitimate and different act, and filing it as a ledger issue would be wrong.
3. **Escalation recorded in a RECORD instead of the ledger.** `mf8-huameng-escube-leads.md`:
   "Recorded formally as an escalation in `data/models/escube/escube-air-v1.yml`'s header
   comment". Deliberate, and the check cannot see record headers by construction.

One genuine oddity, recorded and not acted on: `pass3-escalation-valk.md` documents escalation
**E-VALK-1**, and `E-VALK-1` appears nowhere in the ledger. Its id scheme predates the ledger's
`P<pass>-<n>` convention. That is a naming-era artefact rather than an unfiled finding — the
report is self-contained and its subject was resolved — but it is the one item here a human
should confirm.

### Decision: no rule

Per the directive's own instruction not to build a noisy rule over structurally unavoidable
cases, **nothing was enforced.** The check's output line is now qualified with both the warning
that it measures vocabulary rather than state and the traceable/untraceable split, and the
adjudication above is recorded in the script's comment so the next reader does not re-derive it.

This is the same treatment the reverse-direction line already carries, and the same precedent as
the version-contiguity probe under P4-9: a detector that does not work is written down rather
than shipped.
