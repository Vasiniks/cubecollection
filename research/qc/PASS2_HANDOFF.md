# Pass 2 handoff — read this first

**Written:** 2026-09-03 · **Baseline for this effort:** `9068899` · **Current HEAD:** see `git log -1`

This is the primary document for a fresh session. It is written to be sufficient on its own —
you do not need the conversation that produced it.

---

## PASS-3 GATE: 🟢 **GREEN — READY**

*(was YELLOW at `9ec413d`; raised 2026-09-03 after Pass 2.5 closed the remaining blockers)*

Both critical blockers are **resolved**. No unresolved critical or high issue remains that would
materially corrupt model enumeration. Four medium/low issues remain open and are documented below.

**Pass 3 may begin**, subject to the hazards listed at the end.

Not GREEN, because: 9 families still rest on a single tier-4 source with no corroboration
(`E2`), roughly half the family layer is single-source (`D-F4`), and one family
(`mf8-crazy-3x3x3`) will **hard-fail validation** the moment Pass 3 touches it.

---

## Current state

| | |
|---|---|
| entities | 54 (38 manufacturer · 11 sub_brand · 5 service) |
| families | 122 |
| **models** | **48** — unchanged since `9068899` |
| **variants** | **104** — unchanged since `9068899` |
| sources | 289 (+5) |
| families with zero models | 111 — the Pass 3 queue |

**Pass 3 has NOT started.** Models and variants are untouched throughout this effort.

---

## What changed since `9068899`

| Commit | Change |
|---|---|
| `cb23fd2` | E2 classified A/B/C; E2 severity corrected high→medium |
| `16110db` | **Pass 2.5**: 12 held attestations closed · mf8 rule-15 blocker resolved · D-B1/B2/M1/M2 fixed |
| _this_ | Methodology amendment (RESEARCH_SPEC 3.6a) · ledger/status/handoff |
| `e10215d` | Durable ledger + status established |
| `e757007` | Main-session invariant checks (S16–S19) |
| `405e27c` | **Q1 resolved** — QiYi/X-Man re-sourced to the genuine corporate site |
| `bea416b` | **D-F1/F2/F3 closed** — rule 9 publisher independence, date artifacts, dangling refs |
| `27f69c2` | **G1 adjudicated** — GAN boundary rule written; V100 caveat resolved |
| `3b36f10` | **E1 resolved** — differentiated tier policy; 111 violations → 12 |

---

## Resolved blockers

### Q1 — `theqiyi.com` was not QiYi (CRITICAL, resolved)

`theqiyi-about-us` was recorded `kind: manufacturer_official` → **tier 1**, but the site
carries an Amazon Associates affiliate disclosure, no ICP filing, no contact address, no native
checkout, and was registered 2025-10-10.

**Replacement found and independently verified by direct fetch:** `qiyitoys.net` is QiYi's
genuine corporate site — ICP `粤ICP备2021105271号`, legal entity
`广东奇艺魔方格科教实业有限公司`, address in Chenghai District/Shantou, Wayback captures from
2016-07-04. New source: `qiyitoys-company-history`.

Verified verbatim on that page:
- `广东奇艺魔方格科教实业有限公司成立于1998年` — **founding 1998**
- 2015: `奇艺首席设计师张小静创立「XMD」品牌` — XMD founded by **QiYi's own chief designer**
- 2016: `公司携手著名魔方选手 Mats Valk 创立专业速拧魔方品牌「The Valk」` — **QiYi founded The Valk**

Applied: `qiyi` re-sourced and its `website` **value** corrected; `x-man-design` re-sourced
and the affiliate page's "independent designer" framing **withdrawn as factually wrong**;
`x-man-tornado` `/positioning` + `/aliases` **downgraded** confirmed→probable (no
first-party replacement exists for Tornado — an honest reduction, not a substitution);
**`qiyi-valk` `/manufacturer_id` upgraded uncertain→confirmed**; `theqiyi-about-us` demoted
to tier 4 by explicit override and **retained, not deleted**, so a future researcher finds the
determination instead of repeating the mistake. It is now cited by zero attestations.

### E1 — 111 attestations violated the archive's own confidence rule (CRITICAL, resolved)

Resolved by a **differentiated per-source policy**, better than either blanket option first framed.
Discriminator verified live on both sides: DaYan page (no banner, edit-protected, long-form) →
eligible; WitEden page (live "may be currently outdated" banner) → not eligible.

- **tier-3 override on 6 Speedsolving pages** → 63 attestations legitimised by editing 6 source
  files, touching no attestation
- **36 attestations downgraded** to `uncertain` across 8 banner-carrying or thin sources
- **12 attestations held** for human decision (below)

**111 → 12.** A tier-3 override cannot create a false `confirmed`: rule 9 still requires tier 1
or two independent tier 1–2 sources.

### G1 — GAN boundary inconsistency (HIGH, resolved)

**The rule is now written: `research/qc/gan-family-boundary-rule.md`.** A GAN family is the
persistent name GAN itself keeps using; numeric change within a line does not create a family, and
a name element persisting while the number is dropped **is** the family identity. Decisive
evidence: current products dropped the "356" prefix while keeping "i"/"i carry" (`gan-i4`,
`gan-i-carry-4`). The two rules were never different — only unstated.

**Zero model re-parenting. 0 of 41 GAN models move.**

---

## Remaining open issues

| id | sev | title |
|---|---|---|
| `E2` | high→**reduced** | 9 families (was 21) rest on a single tier-4 source with no corroboration |
| `D-F4` | medium | 58/122 families single-source; 70/122 single-publisher; **12 have false-looking corroboration** |
| `S6` | medium | 9 non-WCA families need `scope_class` + tier 1–3 source at Pass 3 |
| `D-F5` | low | `cubicle-labs` uses `parent_id` on a non-`sub_brand` record |

---

## Open decisions requiring human judgement

1. **The held 12 attestations** — `speedsolving-wiki-mfjs-products` (6), `-mf8-products` (4),
   `-mofang-jiaoshi` (2). Agent B flagged these `leave_unresolved` pending a live
   banner/protection check (~10 minutes). Decide: override to tier 3, or downgrade to
   `uncertain`.
2. **`mf8-crazy-3x3x3`** — non-WCA and tier-4-only, so it will **hard-fail rule 15** at Pass 3.
   It was deliberately *not* re-tiered to make the problem disappear. Get a tier 1–3 source, or
   consciously defer the family.
3. **Conditional-admission policy** for the 9 wholly non-WCA families (`S6`).
4. **`gan-ui-series`** — independent family, or a smart-electronics modifier on flagship models?
   Deferred to Pass 4; non-blocking, but do not build a variant structure expensive to unwind.
5. **`D-F5`** — widen the `parent_id` description to permit service→parent, or add an operator field.

Still open from the first gate, unchanged: `diansheng-mscube` identity (evidence now points to a
DianSheng product line, `probable`), Eastsheen 3×3 (**preserve the contradiction**),
Kokonotsu/Molecube (**record no relationship**), Maru core-kit ontology, Z-Cube time-varying `kind`.

---

## Evidence-policy decisions — what the archive now considers sufficient

- Tier derives from `kind` via `vocab/source-kinds.yml`; an explicit `tier:` field overrides.
- **`kind: wiki` remains tier 4 archive-wide.** Overrides are **per source**, with individual
  written justification — never kind-wide.
- A Speedsolving page qualifies for a tier-3 override only if **all** hold: edit-protected (not
  open-anonymous), revision-tracked, substantial/long-form, **and no staleness banner** —
  checked on the **live** page, not inferred from the archived excerpt.
- Overridden sources carry **restricted permitted claim types**: product existence, naming, line
  membership, approximate chronology. **Never** specifications, corporate ownership/sub-brand
  relationships, or day-precision dates.
- **Rule 9 now enforces publisher independence.** Several pages from one publisher are one
  evidence chain. Sources lacking a `publisher` are treated as distinct so a missing field
  cannot silently merge two real sources.
- Full machine-readable policy: `research/qc/evidence-tier-remediation-matrix.yml`.

---

## Known data traps

- **Three TheCubicle catalogue-migration date artifacts.** Never use as dates:
  `Added: 2018-09-11` (29 occurrences / 22 sources / 13 brands), `Added: 2018-10-14`
  (6 sources / 5 brands), `Added: 2018-11-07` (2 brands, suspected).
- **Curated navigation outranks auto-tagged breadcrumbs.** GAN serves both simultaneously and they
  disagree about the same product. Never treat a breadcrumb as a family signal.
- **Excerpt-only sources** (26 records, 25 cited, **95 citations**): where
  `preservation_method: excerpt` and there is no `archive_url`, the excerpt **is** the
  evidence. Anything on the page but not captured is unsupported, and no check can detect it.

---

## Validation

```
npm run check     # schemas → validate → lint → duplicates → build → privacy → selftest → coverage
```

**Result: all green.** One pre-existing advisory, not a new failure:
`[25] data/variants/gan/gan-ui-12-sp/standard.yml`.

---

## Next session instructions

```bash
cd /Users/admin/Documents/GitHub/cubecollection
git log --oneline -5 && git status --porcelain && npm run check
cat research/qc/PASS2_HANDOFF.md
node -e "const y=require('js-yaml');const d=y.load(require('fs').readFileSync('research/qc/pass2-remediation-ledger.yml','utf8'));d.issues.filter(i=>i.status!=='resolved').forEach(i=>console.log(i.id,i.severity,i.title))"
```

Then, in order:
1. Resolve the **held 12 attestations** (open decision 1) — smallest task, closes E1 completely.
2. Get a tier 1–3 source for **`mf8-crazy-3x3x3`**, or defer it explicitly.
3. Take the **conditional-admission policy** decision (`S6`).
4. **Then** Pass 3 may begin — read `gan-family-boundary-rule.md` before any GAN model work.

---

## Reports

| File | Contents |
|---|---|
| `pass2-human-review.md` | First adjudication gate — matrix, zero-family A/B/C/D audit |
| `pass2-remediation-ledger.yml` | **Machine-readable master ledger** (15 issues, 11 resolved) |
| `pass2-remediation-status.md` | Live status |
| `gan-family-boundary-rule.md` | **The GAN rule Pass 3 must apply** |
| `evidence-tier-remediation-matrix.yml` | **Machine-readable evidence policy** |
| `agent-a-qiyi-remediation.md` | QiYi/X-Man primary-source research |
| `agent-b-evidence-policy.md` | Evidence-tier reasoning |
| `agent-c-gan-boundary.md` | GAN ontology audit |
| `agent-d-global-second-order-audit.md` | Second-order discoveries |
| `pass2-structural-audit.md` | Whole-archive structural findings (S1–S19) |
| `pass2-taxonomy-challenge.md`, `pass2-source-independence.md`, `pass2-entity-identity.md` | First-gate specialists |

---

## Hard constraint

**Pass 3 model enumeration did not begin during this effort and must not begin until the open
decisions above are taken.** Models 48, variants 104, verified unchanged.

---

# PASS 2.5 ADDENDUM (2026-09-03)

## Held attestations — 12 of 12 resolved, **zero remain**

All twelve were checked against the **live** pages, not the archived excerpts.

| Source | Attestations | Verdict |
|---|---|---|
| `speedsolving-wiki-mofang-jiaoshi` (+ its duplicate) | 8 | **Downgraded to `uncertain`** — live "This page may be currently outdated" banner, quoted verbatim; fails the override test |
| `speedsolving-wiki-mf8-products` | 4 | **Downgraded to `uncertain`** — a stub with a bare product list; fails the long-form prong independently of any banner |

**Archive-wide `reported`/`probable` attestations resting solely on tier-4 sources: 0.** E1 is
fully closed.

`mfjs-mf3` `/successor_family_id` → `moyu-rs3m` got extra scrutiny: it is the **only
cross-manufacturer successor link in the archive** (swept to confirm). It is structurally
coherent — MFJS *is* a MoYu sub-brand — but the previous note **overstated the evidence**,
claiming an explicit succession the page does not make; it says the RS3M is "an updated version
of the MF3RS3" in a separate section. Link retained at `uncertain`, overstatement corrected.

## `mf8-crazy-3x3x3` — **RESOLVED**, the class-C blocker is gone

Three independent tier-2 retailer sources across three publisher-and-date combinations
(SpeedCubeShop 2015, TheCubicle 2020, SpeedCubeShop 2024), plus one for `mf8-legend`. Live URLs
independently re-verified by the main session. `/description` and `/positioning` upgraded to
`probable`; **`/introduced` deliberately NOT upgraded** — the new sources establish circulation,
not a release date.

`scope_class: reference_only` was considered and **rejected on evidence**: the line was in
retail circulation 2015–2025, inside the archive window, so `conditional` is the honest outcome.
`mf8-legend` turned out to be an ordinary WCA-format 3x3, so rule 15 never applied to it at all.

## Defects found **inside the previous remediation** — all fixed

The adversarial pass was aimed at the freshly-landed fixes, and found four:

- **`D-B1`** — the Q1 fix repointed `qiyi.yml`'s attestations but left its **prose** narrating the
  withdrawn affiliate page as "tier 1, first-party", still repeating the "independent designer"
  claim its own sibling record had withdrawn as wrong the same day. *A mechanical source-swap is
  not a fix if the prose still argues the old case.* Rewritten. Two alias values (`QY Cube`,
  `QY Toys`) exist only in the withdrawn source — `/aliases` downgraded, values retained and flagged.
- **`D-B2`** — two `probable` attestations rested on tier-3-only sources. The E1 overrides fixed
  their *tier* and missed that `probable` requires **tier 2**. Both → `reported`. Now zero.
- **`D-M1`** — three Speedsolving pairs resolve to the **same URL at two different tiers**. One page
  cannot be two tiers. Aligned, with an explicit one-evidence-chain warning, since rule 9's
  publisher check cannot catch a same-publisher duplicate. The MFJS pair (byte-identical captures
  8 months apart) was merged outright.
- **`D-M2`** — rule 9's new publisher branch had **no fixture**, so a regression would have passed
  selftest. Added `zz-samepub-a/b` and an assertion on the branch's own message, not on "9" firing.

## Methodology — **amended**, in `RESEARCH_SPEC.md` § 3.6a

The premise that Swift Block was missed is **false** — it is in the archive and was found *by*
the official-site route. But two probes showed a real, bounded gap: **DaYan** and **ShengShou**
are active companies (2026-dated SKUs at retailers) whose **own domains are dead or squatted**.

Now **mandatory** before enumeration may be called complete, each leaving a written trace:
1. An archived retailer `/products/` prefix sweep **even when the official site is healthy**.
2. **At least one non-US/English retailer.**
3. **Live-verify a domain** before recording `/website: confirmed`; omit the field and record
   `unknown` if it no longer serves the manufacturer. `dayan.yml` corrected under this rule.

## Open issues — 5, none blocking

| id | sev | status |
|---|---|---|
| `E2` | medium | 7 families on a single tier-4 source, all **class A** — enrichment backlog |
| `S6` | medium | Conditional-admission **policy** call for 8 non-WCA families; each already cites tier 2 |
| `D-F4` | medium | Single-source/publisher concentration — completeness backlog |
| `C-B1` | medium | Cubelelo "Drift" — a lead to research, not a defect |
| `D-F5` | low | `cubicle-labs` `parent_id` on a non-`sub_brand` record — schema wording |

## Next action for the Pass 3 session

1. Read `research/qc/gan-family-boundary-rule.md` **before any GAN model work**.
2. Take the `S6` conditional-admission policy decision — it is a scope call, not an evidence gap.
3. Apply `RESEARCH_SPEC.md` § 3.6a to every manufacturer enumerated.
4. Begin Pass 3 model enumeration. **111 of 122 families have zero models.**
