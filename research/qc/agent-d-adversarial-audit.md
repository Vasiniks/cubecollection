# Agent D — adversarial audit of the Pass 2.5 freeze point

**Scope:** `9ec413d`, working tree `p25-d`. Question: what could still make the current
taxonomy unsafe to hand to Pass 3? No `data/` edits made. All commands re-run from this
worktree; counts below are reproducible with the one-off scripts described inline (imported
`scripts/lib/archive.mjs` from this worktree, deleted after use).

`npm run check` equivalent at the start of this audit: `validate` PASS 0/0, `lint` PASS 0/1
(pre-existing rule 25 on `gan-ui-12-sp`), `duplicates` PASS 0/0. These are the floor, not the
audit — everything below is what they cannot see.

---

## Pass-2.5 blockers

### B1 — `qiyi.yml`'s free-text `notes` still narrates the withdrawn affiliate page as QiYi's own voice, and two alias values now cite sources that don't contain them

**File:** `data/manufacturers/qiyi.yml`, field `/notes` (prose, lines ~30–50) and attestations
`/aliases`, `/notes`.

The Q1 remediation (commit `405e27c`) correctly rewrote **every** attestation `note:` field to
disclose that `theqiyi-about-us` was demoted (an Amazon-affiliate site, not QiYi's own), and did
this thoroughly on the sibling records `x-man-design.yml` and `x-man-tornado.yml` — both add an
explicit "corrected, not merely re-sourced" paragraph. `qiyi.yml`'s own `notes` field was **not
touched by that commit** (verified: `git show 405e27c -- data/manufacturers/qiyi.yml` only
diffs `website:` and the `attestations:` block; the `notes:` prose block is untouched). It still
reads, present tense, with no caveat:

> "**Identity and founding.** QiYi's own About page states it was 'founded' in 1998... — tier 1,
> first-party."
> "**QiYi's own stated 'family of brands'.** theqiyi-about-us lists, in QiYi's own words: 'QY
> Cube'... 'QY Toys'... and 'X-Man Design' ('a premium sub brand created in close collaboration
> with an independent designer known as X-Man')."
> "**X-Man Design is treated differently**... because QiYi's own page names an independent
> designer behind it..."

That last sentence directly repeats the claim `x-man-design.yml` explicitly withdrew the same
day as "factually wrong" (XMD was founded internally by QiYi's own chief designer, not an
outside collaborator). A reader of `qiyi.yml` alone gets the debunked story with no pointer to
the correction sitting one file away.

Separately, and more concretely: the `/aliases` attestation's `sources:` list was mechanically
changed from `[theqiyi-about-us, qiyicube-storefront-2018, speedsolving-wiki-qiyi]` to
`[qiyitoys-company-history, qiyicube-storefront-2018, speedsolving-wiki-qiyi]` (a find-and-replace
of the withdrawn id). But the alias **values** `"QY Cube"` and `"QY Toys"` appear in exactly one
place in the whole source corpus: the excerpt of the now-demoted `theqiyi-about-us`
(`grep -rl "QY Cube\|QY Toys" data/sources/*.yml` → only `theqiyi-about-us.yml` and
`qiyicube-storefront-2018.yml`, and in the latter the string only occurs inside that record's
own `reliability_note`, commenting on `theqiyi-about-us` — the *excerpt* of
`qiyicube-storefront-2018` is just the 2018 page title, "QiYi Cube – The Valk, MoFangGe, X-Man
Design Speed Cube", which does not say "QY Cube" or "QY Toys"). `qiyitoys-company-history`'s
own excerpt (read in full) covers only the legal entity, 1998 founding, the 2015 XMD entry, and
the 2016 Valk entry — no brand list, no "QY Cube"/"QY Toys" wording at all.

So the attestation now cites three sources for six alias values, and **two of those six values
are supported by none of the three cited sources** — the source that actually states them was
the one just withdrawn as illegitimate, and its own record says plainly "cited by no attestation
as of 2026-09-03," which is only true if you don't count the alias list it's still silently
backing. This is exactly the shape the role exists to prevent: a citation swap that looks like
faithful re-sourcing but quietly detaches a value from any source that supports it.

**What a human should do:** either find independent tier 1–2 support for "QY Cube" and "QY
Toys" as QiYi brand names, or remove those two values from `/aliases` (or move them to a
`disputed`/`uncertain` sub-note explicitly attributed to the demoted source and excluded from
the confirmed alias list). Rewrite the `notes` prose to carry the same withdrawal caveat that
`x-man-design.yml` and `x-man-tornado.yml` already carry, and delete or correct the sentence
"QiYi's own page names an independent designer behind it," which is now false by the archive's
own adjacent record.

**Blocks Pass 3:** yes — Pass 3 will read `qiyi.yml` for X-Man Design/QY-brand boundary context
and would inherit the debunked narrative and two unsupported values.

---

### B2 — Two `probable` attestations rest on tier-3 sources, which does not satisfy `probable`'s own definition

**Files:** `data/manufacturers/qiyi.yml` `/native_name`; `data/families/moyu-rs3m.yml`
`/positioning`.

Ran an archive-wide check: for every attestation, compute the best (lowest-numbered) tier among
its cited sources and compare against `vocab/confidence.yml`'s stated minimum (`reported` ⇒
tier ≤ 3, `probable` ⇒ tier ≤ 2 — "**One** Tier 2 source"). 14 attestations fail this check
archive-wide (script using `loadRecords`/`loadVocabularies`/`sourceTier`, not caught by
`validate.mjs`, which only cross-checks tier against confidence for `confirmed`, rule 9 — see
`scripts/validate.mjs:253–285`). 12 of the 14 are the already-known, already-documented "held"
set (`mfjs-products`/`mf8-products`/`mofang-jiaoshi`, explicitly `leave_unresolved` in
`evidence-tier-remediation-matrix.yml`) — not new.

The remaining **2 are new and are a residual defect in the E1 remediation itself**:
`speedsolving-wiki-qiyi` and `speedsolving-wiki-moyu` were overridden to `tier: 3` (verified
live, edit-protected, no staleness banner — a legitimate override for `reported`-level claims).
But `qiyi.yml/native_name` and `moyu-rs3m.yml/positioning` were left at `confidence: probable`,
solely citing these now-tier-3 sources. `probable` requires a tier-2 source; tier 3 satisfies
`reported`, not `probable`. The evidence-tier-remediation-matrix.yml itself lists both pointers
under `decision: override_tier` and counts them inside the "63 override_tier" total — but a
tier-3 override cannot make a `probable` claim sound, only a `reported` one. This was true
**before** the override too (both were part of the original "4 probable" in the 111-count), and
the override closed the gap for the six sources' `reported` citations while leaving these two
untouched.

**What a human should do:** relabel both to `reported` (satisfied by the tier-3 override) unless
a genuine tier-2 source can be found, in which case restore `probable` properly sourced.

**Blocks Pass 3:** yes for `moyu-rs3m` (a built model family MoYu will reference), advisory for
`qiyi.yml/native_name` (a Chinese-name field, low stakes) — recommend fixing both together since
they're the same root cause.

---

## Material findings

### M1 — Same underlying Speedsolving wiki page is tier 3 in one source record and tier 4 in its sibling, for 3 manufacturers, with no cross-reference

Swept all 285 sources for duplicate underlying documents: normalized every `url` (protocol,
`www.`, `index.php?title=X` ↔ `index.php/X`, case, trailing slash) and grouped. Found **18
groups of same-normalized-URL source records** (36 of 285 sources, 12.6%). The task's flagged
pair (`speedsolving-wiki-mfjs-products` / `speedsolving-wiki-mofang-jiaoshi`) is one of **7**
such pairs that follow an identical convention across the Speedsolving wiki citations — a plain
per-manufacturer page and a `-products` companion page for the same manufacturer, same URL:

| Manufacturer | Plain source (tier) | `-products` source (tier) | Status |
|---|---|---|---|
| QiYi | `speedsolving-wiki-qiyi` (3) | `speedsolving-wiki-qiyi-products` (3) | consistent — both verified/overridden together, matrix says so explicitly |
| **DaYan** | `speedsolving-wiki-dayan` (**4**) | `speedsolving-wiki-dayan-products` (**3**) | **inconsistent** |
| **Cyclone Boys** | `speedsolving-wiki-cyclone-boys` (**4**) | `speedsolving-wiki-cyclone-boys-products` (**3**) | **inconsistent** |
| **YongJun** | `speedsolving-wiki-yongjun` (**4**) | `speedsolving-wiki-yongjun-products` (**3**) | **inconsistent** |
| MF8 | `speedsolving-wiki-mf8` (4) | `speedsolving-wiki-mf8-products` (4) | consistent (both weak, both held) |
| ShengShou | `speedsolving-wiki-shengshou` (4) | `speedsolving-wiki-shengshou-products` (4) | consistent (both weak) |
| MoFang JiaoShi | `speedsolving-wiki-mofang-jiaoshi` (4) | `speedsolving-wiki-mfjs-products` (4) | consistent (both held — Agent A's assigned pair) |

For DaYan, Cyclone Boys, and YongJun, **the identical live page** was verified
edit-protected/no-banner/tier-3-worthy under one id and never re-checked under its sibling id,
which sits untouched at the tier-4 default. No record anywhere notes these are the same
document. Currently this causes no live rule violation (checked: every attestation citing the
plain, tier-4 twin — `dayan.yml/aliases`, `cyclone-boys.yml/country`, `yj.yml/aliases`, etc. — is
co-cited with an independent tier-1/2 source that already satisfies its confidence level on its
own), but it is a live trap for Pass 3 or a future pass: someone could reasonably infer "this
page was already verified tier-3-worthy for its sibling" and upgrade the plain twin **by
resemblance alone** — exactly the shortcut `evidence-tier-remediation-matrix.yml`'s own
verification procedure explicitly forbids ("the conservative default is tier 4... never
`reported` on the strength of resemblance alone").

The remaining 11 URL-duplicate groups (GanCube product/spec-table splits ×6, Giiker/Rubiks/
TheCubicle multi-year captures ×3, TheCubicle content-focus splits ×2) were individually
inspected and are **deliberately documented** (each carries a note explaining the split or the
multi-year capture purpose) — not defects. One of them, `thecubicle-witeden-mixup-3x3-variants` /
`thecubicle-witeden-mixup-plus`, is also flagged inside the already-open `D-F4` "false
corroboration" list; that overlap just confirms `D-F4`'s existing scope, it isn't new.

**What a human should do:** add a one-line cross-reference on each of the 6 sibling source pairs
(`# same underlying page as <id>`) so a future tier decision on one twin cannot be read as silent
resemblance-evidence for the other, and decide explicitly whether DaYan/Cyclone Boys/YongJun's
plain twins should also be overridden (they were never live-checked this session) or the
`-products` twins should be reverted pending a matching check — either is fine, but the
asymmetry should not persist unexamined.

**Blocks Pass 3:** no hard block today (no live rule violation), but strongly recommended before
freeze — it is precisely the kind of latent inconsistency that becomes an "obviously already
resolved" trap for the next agent.

### M2 — Rule 9's new same-publisher-independence branch has zero test coverage and zero live exercise

`scripts/validate.mjs`'s rule 9 (`D-F1`, this pass's own prior fix) added an `else if
(!hasTier1 && independentPublishers.size < 2)` branch. Checked `tests/fixtures/fail/` for a
fixture that trips specifically this branch (two `confirmed`-supporting tier 1–2 sources, no
tier 1, same publisher) — none exists; the only rule-9 fixture (`zz-bad-brand.yml`) trips the
older "fewer than 2 sources at all" branch. Checked the live archive for any `confirmed`
attestation the branch currently guards — zero (the two records it protects,
`thecubicle.kind`/`speedcubeshop.kind`, were both manually downgraded to `probable` when the
rule was added). So the newly-added logic that makes rule 9 actually enforce publisher
independence is, right now, unexercised by both the test suite and the live data. If it
regressed silently in a future refactor, `npm run selftest` would not catch it, because nothing
currently forces that code path to run and produce an error.

Separately verified the branch is **not currently exploitable**: swept every `confirmed`
attestation with no tier-1 source and ≥2 tier 1–2 sources (5 records: `escube.yml` ×2,
`limcube.yml` ×3) — all cite genuinely distinct publishers (TheCubicle vs SpeedCubeShop). Also
verified 0/285 sources omit `publisher`, so the documented "no-publisher sources are treated as
distinct" fallback is likewise untested in practice.

**What a human should do:** add one `fail` fixture (two `manufacturer_official`-adjacent tier-2
sources, same `publisher`, no tier-1) and one `pass` fixture (same shape, different publishers)
so `npm run selftest` proves this specific branch fires and doesn't over-fire.

**Blocks Pass 3:** no — advisory, but cheap to fix and closes a real regression-safety gap in a
rule Pass 3 will lean on heavily once model-level `confirmed` claims start accumulating.

---

## Research completeness backlog (not new, confirmed still accurate — carried forward, not re-litigated)

- `E2` (9 families single tier-4 source), `D-F4` (58/122 single-source families, 12
  false-corroboration families), `S6` (9 non-WCA families need a tier 1–3 `scope_justification`
  source before Pass 3 touches them), `D-F5` (`cubicle-labs` `parent_id` schema mismatch) — all
  verified still open in `pass2-remediation-ledger.yml` and still accurate against the live data
  (spot-checked `mf8-crazy-3x3x3`'s source remains solely `speedsolving-wiki-mf8-products`,
  tier 4, unresolved — confirmed it will still hard-fail rule 15 the moment a model is
  enumerated under it, exactly as the ledger states). No new dimension found here beyond B1/B2/M1
  above; not re-reported in full.
- The 12 held attestations (`mfjs-products` ×6, `mf8-products` ×4, `mofang-jiaoshi` ×2) are
  confirmed still at their pre-remediation confidence values in the live data (e.g.
  `mfjs-mf3.yml/introduced` is still `reported` on a lone tier-4 source) — this matches
  `PASS2_HANDOFF.md`'s own "next exact actions" item 1, not a new finding.

---

## Harmless observations / false positives — ruled out, save the next reviewer's budget

- **GAN boundary rule (`G1`):** spot-checked `data/families/gan-356.yml`,
  `gan-i-series.yml`, `gan-i-carry-series.yml`, `gan-flagship-series.yml` still exist as
  separate files with no structural merge — the "zero model re-parenting" claim holds on
  inspection; not re-audited in full since models/variants are frozen for this pass.
- **`x-man-design.yml` and `x-man-tornado.yml`'s Q1 handling:** both are thoroughly and
  correctly caveated — every withdrawn claim is marked, every confidence changed is explained,
  the "retained for provenance, superseded" framing in `qiyi-valk.yml`'s `description` is
  explicit and dated. Only `qiyi.yml` (B1) was missed. This is a **contrast**, not a pattern —
  the same session got it right three times out of four.
- **Rule 9 publisher-independence in practice:** verified working, not exploited (see M2).
- **`confirmed` attestations that also cite a now-tier-3-overridden wiki source**
  (`x-man-design.yml/parent_id`, `qiyi-valk.yml/manufacturer_id`): both are independently
  satisfied by a genuine tier-1 source (`qiyitoys-company-history`) already present in the same
  `sources:` list; the wiki citation is superfluous corroboration, not load-bearing. Rule 9
  correctly skips the independence check whenever `hasTier1` is true, which is correct per
  `vocab/confidence.yml` ("Tier 1 source, **or** two independent Tier 2..."). Not a violation.
- **The GanCube product/spec-table source pairs (6), Giiker/Rubiks multi-year captures (2),
  TheCubicle content-focus splits (2):** all individually documented, deliberate, and not
  double-counted toward any `confirmed` claim currently in the archive (checked: the one model
  citing a same-URL GanCube pair, `monster-go-352-m.yml/description confirmed`, cites two tier-1
  `manufacturer_official` records, which needs only one tier-1 source to satisfy rule 9 — the
  second is harmless redundancy).
- **14 repointed research-note references (`D-F3`):** all 4 distinct target files
  (`gan-pass1.md`, `gan-pass2.md`, `global-pass2-families.md`, `gan-pass4.md`) verified to exist
  on disk. No dangling reference found.
- **`qiyi-valk.yml/manufacturer_id` confirmed upgrade:** re-verified against the source excerpt
  directly (`qiyitoys-company-history`'s 2016 entry states verbatim that QiYi itself partnered
  with Mats Valk to found "The Valk") — genuinely satisfies rule 9 on real, checked evidence.
  Sound.
- **`guoguan.yml/aliases` downgrade and `mfjs.yml/native_name` held status:** both applied/left
  exactly as the remediation matrix recommended; internally consistent.
- **8 zero-family entities, 22 generic `<maker>-3x3` families, 24 orphan sources:** per the
  adjudicated-pattern list, not re-examined.

---

## Summary

```yaml
- id: B1
  bucket: pass_2.5_blocker
  severity: high
  title: "qiyi.yml notes still narrate the withdrawn affiliate page as authoritative; two alias values now cite sources that don't state them"
  affected_count: 1
  blocks_pass3: true
- id: B2
  bucket: pass_2.5_blocker
  severity: medium
  title: "Two `probable` attestations rest on tier-3 (not tier-2) sources, failing probable's own definition — residual E1 remediation gap"
  affected_count: 2
  blocks_pass3: true
- id: M1
  bucket: material
  severity: medium
  title: "3 same-document Speedsolving source pairs (DaYan, Cyclone Boys, YongJun) are tier-3 in one twin and tier-4 in the other, with no cross-reference; 7 same-URL pairs exist total in the wiki convention, 18 same-URL groups archive-wide"
  affected_count: 18
  blocks_pass3: false
- id: M2
  bucket: material
  severity: low
  title: "Rule 9's same-publisher-independence branch (D-F1) is untested by selftest and unexercised by live data"
  affected_count: 1
  blocks_pass3: false
- id: FP1
  bucket: false_positive_or_resolved
  severity: none
  title: "x-man-design.yml / x-man-tornado.yml / qiyi-valk.yml Q1 handling is thorough and correct"
  affected_count: 3
  blocks_pass3: false
- id: FP2
  bucket: false_positive_or_resolved
  severity: none
  title: "Rule 9 publisher-independence check verified not exploited by any live confirmed attestation"
  affected_count: 5
  blocks_pass3: false
- id: FP3
  bucket: false_positive_or_resolved
  severity: none
  title: "GanCube/Giiker/Rubiks/TheCubicle same-URL source pairs are deliberate, documented splits, not accidental duplicates"
  affected_count: 11
  blocks_pass3: false
- id: FP4
  bucket: false_positive_or_resolved
  severity: none
  title: "14 repointed research-note references all resolve to existing files"
  affected_count: 14
  blocks_pass3: false
- id: BACKLOG1
  bucket: research_completeness_backlog
  severity: medium
  title: "E2/D-F4/S6/D-F5 confirmed still open and accurate, no new dimension found beyond B1/B2/M1"
  affected_count: 4
  blocks_pass3: false
```

**Per-record verdict for the records touched by this audit:**
- `data/manufacturers/qiyi.yml` — **hold** (B1, B2).
- `data/families/moyu-rs3m.yml` — **hold** (B2).
- `data/manufacturers/x-man-design.yml`, `data/families/x-man-tornado.yml`,
  `data/families/qiyi-valk.yml` — **publish** (verified sound).
- All other records inspected — no change to verdict from this audit; defer to the existing
  ledger.

**What the archive currently does not know that it should:** whether the DaYan, Cyclone Boys,
and YongJun Speedsolving pages that were verified tier-3-worthy under one citation id are
equally sound under their untouched tier-4 sibling ids — an unasked question, not a contradicted
one, and cheap to close with three more live-page checks.
