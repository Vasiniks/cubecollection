# Pass 2.6 remediation — the authorised taxonomy mutation

**Applied:** 2026-09-08 · **Authorised by:** ledger `P26-1` · **Baseline:** `16b6a82`
**Adjudication:** `research/qc/pass2.6-family-gap-sweep.md`

> The 122-family freeze was lifted **once, deliberately, for exactly four families.** Everything
> else stayed frozen. This document records what changed, what was refused, and why.

---

## 1. The authorised set was four, not five

The request listed five names and flagged the discrepancy itself. The repository settles it:

| Name | Issue | Status | In this remediation? |
|---|---|---|---|
| FangShi GuangYing | `P26-1` | established, `confirmed` | **YES** |
| FangShi JieYun | `P26-1` | established, `confirmed` | **YES** |
| ShengShou YuFeng | `P26-1` | established, `probable` | **YES** |
| YJ Appari | `P26-1` | established, `probable` | **YES** |
| **CubeTwist 3x3x3** | **`P26-4` + `P26-5`** | **credible candidate, `probable`** | **NO** |

`P26-1` — the authorising issue — names four. CubeTwist is a *separate* issue (`P26-4`) and is
also listed first among `P26-5`'s seven credible candidates. The sweep document §6 splits them
under "Established missing families — 4" and "Credible candidates that would block Pass 4 — 7".

**The five-name reading conflated the established set with the candidate set.** CubeTwist is a
strong lead — it overturns a written zero-family finding — but it rests on two retailers of
which one mirrors the other's SKUs, so it corroborates existence rather than independently
confirming it. It remains open for a separate decision.

## 2. What was created

**Families 122 → 126:**

| id | name | positioning | introduced | basis |
|---|---|---|---|---|
| `fangshi-guangying` | FangShi GuangYing | flagship | **2015-01 exact** | explicit dated statement |
| `fangshi-jieyun` | FangShi JieYun | flagship | before 2015-09 | circulation bound |
| `shengshou-yufeng` | ShengShou YuFeng | mainline | before 2023-02 | circulation bound |
| `yj-appari` | YJ Appari | mainline | before 2024-05 | circulation bound |

**Models 253 → 258:** `fangshi-guangying-original` · `fangshi-jieyun-original` ·
`shengshou-yufeng-original` · `shengshou-yufeng-v2` · `yj-appari-original`.

**Variants 104 and manufacturers 54 are unchanged**, and **no source was added** — every piece
of evidence already existed from the Pass 2.6 sweep.

## 3. No model was reassigned, because none existed

Before mutating anything, all models, families and variants were searched for the four line
names. The **only** hits were the escalation *flag comments* inside `fangshi-shuangren.yml` and
`fangshi-shuangren-original.yml`. **Zero model records existed for any of the four lines.**

So this was purely additive: five new models, nothing re-parented, nothing duplicated. The
request's concern about models sitting under "temporary" families did not arise.

## 4. Date decisions, made explicitly

Dates are the strictest claim class and the easiest place to over-reach, so each was decided on
the record rather than inherited.

**GuangYing is the only one with a real date.** speedcube.com.au's page *title* reads
*"New January 2015 release"* and its body repeats *"The all new 2015 release"* — an explicit
dated statement giving month and year, captured contemporaneously (2015-03-16). Cubezz's
independent first capture on 2015-02-05 is consistent with it and would contradict a later date.

**A disagreement is recorded rather than buried.** The source record's own author recommended
this be held at `reported` — "single tier 2 source, marketing-toned". It is recorded at
`probable`, because `vocab/confidence.yml` defines the scale by **source tier and
corroboration, not tone**: `probable` is "One Tier 2 source, uncontradicted", while `reported`
is defined as "Tier 3 source". Calling a tier-2 claim `reported` would misstate the tier. Both
readings are written into the attestation so a reader can adopt either.

**The other three carry `before` circulation bounds**, each labelled in its own note as bounding
*page existence*, not product launch. **Every retailer `Added:` field encountered was refused** —
the archive has four documented catalogue-migration artifacts behind that rule.

## 5. Claims deliberately refused

Three places where the evidence invited a stronger record than it supported:

- **ShengShou YuFeng MagLev.** TheCubicle's URL slug contains `magelev`, but a first-hand
  customer review disputes it and the marketing reportedly dropped the claim. A URL slug is not
  a specification and one review is not a disproof, so `specs.maglev` is set **neither true nor
  false**, with the conflict recorded so a later pass finds it rather than rediscovers it.
- **YuFeng positioning.** Retailer copy calls it a flagship. All seven pre-existing ShengShou
  families are `mainline` and none is designated flagship, so promoting YuFeng alone would
  implicitly re-rank the other seven — a collateral change this authorisation does not permit.
  Recorded `mainline` at `uncertain` **with the conflict stated**, not resolved by fiat.
- **YJ Appari specifications.** None recorded at all. Only one of its three retailer sources was
  fetched in full. Under the admission policy an unspecified model backed by three independent
  retailers is a legitimate record; an invented one is not.

Critical spec fields that were searched and not found carry explicit `unknown` attestations
rather than being omitted, preserving the archive's distinction between *searched, not found*
and *not searched*.

## 6. Secondary consequences reconciled

| Record | Change |
|---|---|
| `fangshi-shuangren.yml` | `successor_family_id: fangshi-guangying` + attestation; open-leads note marked **RESOLVED** |
| `fangshi-shuangren-original.yml` | escalation comment marked **RESOLVED**, original preserved |
| `thecubicle-shengshou-products-prefix-2026.yml` | marked **PARTIALLY RESOLVED** — YuFeng done; Crazy, Rainbow, Gem, Tank, Metal Cube still open under `P26-5` |
| `thecubicle-yj-appari-3x3-2024.yml` | two "9 existing YJ families" claims contextualised — YJ now has 10 |

The lineage is now complete and machine-readable:
**ShuangRen → ShuangRen V2 → GuangYing → JieYun.**

**Historical research logs under `research/qc/` were left untouched.** They accurately describe
what was true when written, and rewriting them to look as though these families always existed
would destroy the audit trail that found them.

## 7. Verification

Exactly **13 files** changed. No variant, no manufacturer, no unrelated family or model touched.
CubeTwist confirmed absent from every one.

`npm run check`: **0 errors, 5 advisory warnings** — the same five as the baseline, with **no new
rule-40 firing**, confirming the new records are chronologically consistent with their families.

Programmatic invariants, all passing: every `family_id` and `manufacturer_id` resolves · all 12
`successor_family_id` values resolve · no duplicate ids across any entity type · no dangling
attestation source refs · every `relationships.target` resolves.

**On apparent name collisions:** a family sharing its name with its single model is the
archive's pre-existing convention (`dayan-guhong` / "DaYan GuHong"), present on ~100 pairs
before this change. The four new families follow it. Not a defect.

## 8. The reviews that were meant to check this

Two independent lanes — an adversarial scope review and a consistency audit — were dispatched on
Sonnet 5 in isolated worktrees. **Both died to API errors before writing their reports**, and
their worktrees held nothing recoverable.

That is the **third and fourth occurrence of `P26-2`** in two sessions, now recorded as `P26-8`.
It sharpens the remediation: records already survive these kills because agents commit at
boundaries — it is **reports** that die. A lane whose entire deliverable is a document should
commit a skeleton with findings-so-far at each checkpoint, not write it last.

Both audits were completed directly instead. They were mechanical enough to redo by hand; a
research lane would not have been.

## 9. What this does NOT resolve

Pass 4 is **still blocked**. Adding four families closed `P26-1`, not the gap.

Still open: `P26-5` (7 credible candidates, incl. CubeTwist and five ShengShou lines) ·
`P26-6` (11 unverified leads: 6 Cyclone Boys, 4 Maru, Cubelelo Drift) · `P26-2`/`P26-8` (the
roll-up defect) · `P26-3` (§3.6a never applied retroactively) · `P26-7`, `P26-9`.
