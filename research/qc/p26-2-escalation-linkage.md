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
