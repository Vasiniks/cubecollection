# P26-2 / P26-8 / P26-14 — closure review, Lane C (2026-09-19)

```
SCOPE: finish the escalation-linkage infrastructure and decide, with evidence, whether P26-2
       (critical) and P26-8 (high) can CLOSE. Also measure P26-14 (low) as a concrete, checkable
       invariant and issue a ship/don't-ship call on a lint rule for it.
BASE:  da8b6eb on main. Read pass2-remediation-ledger.yml, p26-2-escalation-linkage.md and
       scripts/check-escalations.mjs in full before touching anything, per the lane brief.
DOES NOT RE-LITIGATE: the 2026-09-12 adjudication that "reports with escalation language and no
       block" is vocabulary, not lost findings. That number is re-measured (it moved) but the
       conclusion is not re-argued.
```

## 1. End-to-end chain measurement

The chain is: research report -> machine-readable `escalations:` block -> ledger issue id ->
status -> resolution. `npm run escalations` on the real archive today (95 reports, up from 74 on
2026-09-09; 59 ledger issues, unchanged since 2026-09-12):

| Link | Measured | Change since last measurement |
|---|---|---|
| Reports with a declared `escalations:` block | 26 entries across the corpus | — |
| ...linked to a real ledger id | 24 | matches the brief's stated baseline |
| ...marked `NOTFINDING` | 2 | unchanged |
| ...marked `UNFILED` | 0 | unchanged |
| ...free prose, no id at all | 0 | unchanged |
| Dangling ids (report cites a ledger id that doesn't exist) | 0 | unchanged |
| Ledger status missing or misspelt (rule 51) | 0 of 59 | unchanged — clean baseline holds |
| Ledger issues reached by at least one report's block (reverse direction) | 13 of 59 | **unchanged** since 2026-09-12, despite +21 reports in between |
| Reports using escalation language with no block | 47 | up from 43 (2026-09-12) |
| ...of those, name a real ledger id in prose (traceable) | 31 | up from 27 |
| ...of those, name no ledger id (untraceable) | 16 | **unchanged, and the same 16 files** |

Two findings from this table matter more than the raw counts:

**The reverse direction is flat, not just low.** 13/59 was measured on 2026-09-12; it is still
13/59 today after a full week of Pass 4 research and 21 new reports. New lane reports are not
adopting the ledger-backlink convention any faster than old ones were retrofitted — which is
exactly what "measured, not enforced" predicts, and confirms the reverse-direction line is
correctly left unenforced rather than quietly rotting into something worse.

**The growth in "silent" reports is entirely in the safe bucket.** All four reports created since
2026-09-12 that use escalation language without a block cite a real ledger id in prose (verified
by diffing the traceable/untraceable file lists against the 2026-09-12 doc's own 16 named
mechanisms — the untraceable set is byte-for-byte identical: the same quoted-commit-message case
(`provenance-adversarial-lane-d.md`), the same write-lane handoffs (`agent-a-qiyi-remediation.md`
and others saying "flagged for the main session"), and the same record-header case
(`mf8-huameng-escube-leads.md`). Nothing new fell into the untraceable bucket. The 2026-09-12
"no rule" decision holds; its residue is not growing.

**Resolved issues are traceable in practice.** All 36 `resolved` issues cite a specific date;
25/36 (69%) also cite an explicit repo path in their evidence/recommendation text. The other 11
(E1, E1b, D-M1, P26-1, P26-5, P26-13, P4-3, P4-5, P4-6, P4-11, P4-15) are cross-cutting
policy/taxonomy resolutions that name bare record ids rather than full paths — spot-checked two
(P26-1's four families; E1's tier-3 overrides) and both point to verifiable, currently-present
artifacts (`data/families/fangshi-guangying.yml`, `fangshi-jieyun.yml`, `shengshou-yufeng.yml`,
`yj-appari.yml` all exist; E1's six re-tiered Speedsolving sources are the ones documented in the
issue). No resolved issue was found asserting a fix with nothing to check it against.

## 2. P26-14 — source ids cited in prose, measured

P26-14's own example: `thecubicle-shengshou-other-3x3-lines-2026.yml` once cited
`thecubicle-dayan-gem-cube-i-2019`, a source id that had never existed. It was fixed by hand; the
class — a prose citation to a nonexistent source id — is what needs measuring.

**Method.** Built the full set of 1,596 real record ids (all entity types) from every `id:` field
under `data/`. Scanned every `data/**/*.yml` and `research/**/*.md` file for backtick-quoted,
hyphen/period-joined tokens (the same charset the id schema itself uses) that do not resolve to
any id in that set. Then narrowed by the most favourable available discriminator: does the
token's leading segment match one of the 51 real prefixes actually used by the 608 source ids on
file (`thecubicle`, `speedcubeshop`, `cubelelo`, `gancube`, `speedsolving`, etc.)? This is
strictly narrower than a bare shape match, and it is the only cheap signal available, because a
"source id" and a "retailer product-page slug" are constructed from the identical charset —
lowercase letters, digits, hyphens — by design.

**Funnel:**

| Stage | n |
|---|---|
| Backtick tokens that don't resolve to any archive id | 761 |
| ...whose leading segment matches a real source-id prefix | 192 |
| ...after dropping literal `.yml`/`.com` references and `NxN` product-size tokens (unambiguous retailer-slug shapes) | 30 |
| Manually read, of the 30: live, uncaught defects | **0** |

**What the surviving 30 actually are**, read one by one:

- **1 instance** is the P26-14 finding itself, already fixed. It now survives in the source
  record's own excerpt as a deliberate, self-disclosing note ("an earlier draft of this note
  cited a `thecubicle-dayan-gem-cube-i-2019` id that was never created"), and is separately quoted
  in three audit-trail reports (`p26-5-final-adversarial-audit.md`,
  `p26-5-final-mapping-review.md`) that document finding and fixing it. All four citations are
  historical record-keeping, not a live broken reference.
- **~13 instances** are two source ids (`thecubicle-maru-cx3-colors-2025`,
  `thecubicle-maru-3x3-special-patterns-list-2020`) retired by a rule-42 duplicate-locator merge
  and renamed to `thecubicle-maru-cx3` / `thecubicle-maru-3x3-special-patterns`. Both retired
  forms appear only inside the one report (`pass4-b2-agent-g-shapemod-historic.md`) that documents
  the merge — again, history, not a dangling live citation.
- **3 instances** (`qiyitoys-net-about-history`, `qiyitoys-net-homepage-current`,
  `qiyitoys-net-2016-catalogue`) are explicitly labelled proposals inside a remediation spec:
  "New source records to create (specification only; not created here)." They are meant not to
  exist yet.
- **The remaining ~13** (`monster-go-352-m-beginner-magnetic-cube`, `qiyi-m-pro-v3-flagship`,
  `shengshou-metal-cube`, `shengshou-rainbow-ball`, `shengshou-gem-pyraminx`,
  `giiker-super-cube-i3s`, six `maru-core-magnetic-diy-kit-for-*` entries, etc.) are retailer
  product-page slugs or handles — quoted verbatim as evidence of what a retailer sweep found —
  that happen to start with a brand name that is coincidentally also a real source-id prefix
  (`shengshou-`, `qiyi-`, `giiker-`, `maru-`). None of them were ever meant to name an archive
  source.

**Decision: do not ship a rule.** The measured false-positive rate is 100% at every filtering
depth tried (0 real defects / 30 candidates after the most aggressive narrowing available; 0/192
and 0/761 at looser depths). This is not a marginal call: a "source id" and a "retailer product
slug" share the exact same charset by construction, so no shape-based heuristic can separate them
— only parsing citation *intent* could, and that is exactly the kind of judgment call the
project's own three prior refusals of generic-word rules already rule out building. P26-14 stays
open at its current severity (low): the underlying class is real (one instance existed and was
fixed by hand), but it is rare enough — and the false-positive cost of automating its detection
high enough — that manual catch during adversarial review (the mechanism that actually found the
one real instance) remains the right tool, not a lint rule. This is now recorded in
`scripts/check-escalations.mjs`'s header so the next reader does not re-run the same funnel.

## 3. Does the mechanism prevent recurrence, or only detect it?

**Detects. Confirmed detecting-only as recently as five days before this review, on a live lane.**

`npm run escalations` (rules 50/51) is a static check over already-committed files. Structurally
it can only see a report that exists. The original P26-2 failure — a lane killed before writing
anything — produces zero bytes for the checker to read; nothing in the repository fails a build
because a file was never created. The mitigation for *that* half is a human/orchestrator
practice ("skeleton-first": commit a report skeleton at the start of a lane, not at the end),
adopted starting `research/qc/pass4-progress.md` (2026-09-08) in direct response to P26-8. It is
not encoded in any hook, CI gate, or script — nothing blocks a lane from being dispatched without
a skeleton commit, and nothing fails a build if one never lands. It works only when an operator
remembers to say it and an agent complies.

The evidence that this is still a live gap, not a closed one:

- **The practice is not universal even when known.** `research/qc/HANDOFF.md`'s "SESSION
  2026-09-14, WINDOW 4" entry: "Agents: lanes K (P4-7), L (Legend) and M (P4-9) all died on a
  WEEKLY limit... K and M committed nothing; L only a method skeleton, now superseded."
  Skeleton-first reduces total loss when followed; it does not compel every lane to follow it,
  and total-zero-commit deaths still happen — five days before this review.
- **A prose-only escalation still gets past the checker into a near-merge state.** The same
  2026-09-14 HANDOFF window: "Lane I's Legend escalation shows the P26-2 gap is still
  live for NEW lane reports: a prose-only escalation is invisible to the checker. Worth a line in
  the lane prompts." This is a fresh, dated recurrence of the exact P26-2 failure mode — a real
  finding (ShengShou Legend Plus Big) written in prose that the mechanized checker could not see —
  caught only because a human read the report before merge and manually filed it to the ledger as
  P4-9 with a retrofitted `escalations:` block. That is the manual-recovery ritual P26-2 exists to
  replace, not the mechanism working as intended.
- **The suggested follow-up was never applied.** Grepped every agent definition
  (`.claude/agents/*.md`), `RESEARCH_SPEC.md` and `DATA_MODEL.md` for any mention of the
  `escalations:` block: zero hits. "Worth a line in the lane prompts" from 2026-09-14 was not
  acted on in the five days between that entry and this review.
- **Three of P26-2's four preferred remediations were never adopted as enforced practice.** Only
  "add a lint rule scanning for escalation language with no matching ledger id" (this file)
  shipped as code. "Require every escalation to also be written into a canonical record's notes",
  "require a ledger entry before a lane counts as merged", and "mark a killed, unrecovered lane
  `report_lost: true`" remain prose recommendations. `report_lost` appears nowhere in the ledger,
  or anywhere else, as an actual field value — only in the three places that recommend adding it.

None of this means the mechanism is worthless — the forward-direction linkage it does check is
completely clean (0 dangling across 95 reports, stable since 2026-09-12), and it turned a genuinely
silent failure mode into a loud, countable one for every report that gets far enough to be
scanned. But "loud and countable, after a human already caught it by reading the report" is
detection, not prevention. Nothing in the codebase would fail if the ShengShou Legend Plus Big
finding had gone unnoticed at merge time; it was only caught because a person happened to read
the prose.

## 4. CLOSE / DO-NOT-CLOSE — P26-2 and P26-8

### P26-2 (critical): **DO NOT CLOSE.**

What closes, and is real: the literal ask in P26-2's recommendation list — "add a lint rule
scanning record prose and reports for escalation language with no matching ledger id" — is done,
shipped, tested (rule 50/51 both have failing and passing fixtures, both fire correctly per
`npm run selftest`), and has run clean (0 dangling, 0 unfiled) since 2026-09-09 across every
report that has reached the point of being scanned.

What does not close: P26-2's title is "real findings went silent twice," and the mechanism that
would make that structurally impossible does not exist. A lane that dies with zero commits is
invisible to `npm run escalations` by construction — there is nothing to scan. This is not
hypothetical: it recurred in a form the checker could not see as recently as 2026-09-14 (the
ShengShou Legend Plus Big prose-only escalation, caught by a human reading a report, not by any
check), and total-zero-commit lane deaths (K, M) were logged in that same HANDOFF window. Three
of the four remediations P26-2 itself specified were never adopted as
enforced practice, and the one follow-up action its own most recent recurrence recommended
("worth a line in the lane prompts") was never applied. Closing P26-2 now would mark as solved a
problem whose namesake failure mode has a dated recurrence five days before this review.

**What would close it:** either (a) put the `escalations:` block convention into the actual lane
prompts/agent definitions so new lane output cannot omit it as easily, plus a documented, applied
policy that a killed lane with zero commits is marked `report_lost: true` in the ledger rather
than silently re-run — or (b) accept, explicitly, that P26-2 is permanently bounded to "detects
after a report exists" and re-scope/re-title it to say so, closing the current issue and opening a
narrower one for the zero-commit case. Neither has happened yet, so status quo (open) is correct.

### P26-8 (high): **DO NOT CLOSE.**

P26-8 narrowed P26-2's fix to "protect reports specifically" via skeleton-first commits, on the
grounds that records already survive. That narrowing is correct and the practice it recommended
is real and does reduce loss when followed (`pass4-progress.md`'s own words: "the two lanes that
had followed it were the two that left something behind"). But the practice is not a technical
control — it is an instruction repeated by whoever briefs each lane, with no enforcement, no
lint, and no hook behind it — and P26-8's own claim that the failure "recurred twice more" already
undercounts the current state: the 2026-09-14 Legend-escalation incident and the K/M
zero-commit deaths are additional occurrences of the same shape after P26-8 was filed and its
fix supposedly applied. Closing P26-8 would certify a mitigation as sufficient when the archive's
own most recent operational logs show it still failing to prevent the thing it was written to
prevent, five days before this review.

**What would close it:** encode skeleton-first as something other than a repeated verbal
instruction — e.g., a documented requirement in the agent definitions themselves (none currently
mention it, checked directly), or an orchestrator-side check that refuses to treat a lane as
"launched" without a skeleton commit within N tool calls. Until skeleton-first is something other
than institutional memory, P26-8 remains open.

## Summary for the record

- Forward-direction linkage (report -> block -> ledger id -> status): clean, stable, 0 dangling.
  This part of P26-2's ask is genuinely done.
- Reverse-direction linkage (ledger -> report): 13/59, flat for a week, correctly left unenforced.
- "Escalation language, no block": grew 43 -> 47, entirely in the traceable/safe bucket; the
  2026-09-12 "vocabulary not state" call still holds and is not re-litigated here.
- P26-14: measured at 0% real-defect rate after the most favourable filtering tried (30
  candidates, 0 live). No rule shipped; documented in the script header instead.
- The mechanism detects; it does not prevent. Confirmed by a dated, named recurrence
  (2026-09-14, ShengShou Legend Plus Big) that the checker could not see and a human caught by
  reading prose — the exact failure P26-2 was filed to eliminate.
- P26-2: DO NOT CLOSE. P26-8: DO NOT CLOSE. Both recommendations are for the main session to act
  on; no ledger `status:` field was changed by this lane.
