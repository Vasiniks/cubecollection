# Agent D — global second-order audit

**Role:** adversarial reviewer, Pass 2 remediation gate. **Scope:** whatever `pass2-human-review.md`
did *not* already list. **Method:** scripted, repository-wide analysis against
`scripts/lib/archive.mjs`; every count below is reproducible from the archive as committed at the
start of this session (`617` records: 54 manufacturers, 122 families, 48 models, 104 variants,
284 sources, 2 people, 3 events). No `data/` file was edited. `npm run validate` / `lint` /
`duplicates` all pass clean before and after this audit (no data touched).

I read `pass2-human-review.md` once, at the start, and cross-checked every candidate finding
below against it, `pass2-taxonomy-challenge.md`, `pass2-source-independence.md`,
`pass2-entity-identity.md`, `pass2-structural-audit.md`, and `gan-2026-09-01.md` before writing
it up, specifically to avoid re-reporting the excluded worklist (QiYi identity, `diansheng-mscube`,
Eastsheen, Meffert's/Kokonotsu, Maru core kits, Z-Cube, CubeStyle, the GAN 356/i/i-carry
boundary, the eight zero-family classifications, the 111 tier-4-only attestations,
`theqiyi-about-us`). Several strong-looking leads turned out to already be handled correctly
inside the archive and are recorded below as **ruled out**, with what I checked, so the next
reader does not spend budget re-verifying them.

---

## Findings, ranked by blast radius

### F1 — Rule 9 has a second blind spot: it counts sources, not independent voices — **High**

**What's wrong.** `scripts/validate.mjs`'s rule 9 (lines ~248–261) accepts `confidence: confirmed`
on a non-tier-1 attestation whenever **two or more distinct source IDs** at tier ≤ 2 are cited.
It never checks whether those two source records share a `publisher`. Two different product
pages from the *same retailer* satisfy the check exactly as if they were two independent
retailers — even though `vocab/confidence.yml`'s own definition of `confirmed` requires
"two genuinely independent Tier 2 sources," and RESEARCH_SPEC §5.2 rule 1 states outright:
*"Two listings with identical wording are one source."* This is the same rule, the same shape
of gap already found once (rule 9 tests presence, not support, in the `dayan-panshi` case) —
but a structurally different hole: this one is about **independence**, not **relevance**.

**This is not hypothetical — it has already fired once, unfixed, and fires again now.**
`research/qc/gan-2026-09-01.md` §B1 flagged exactly this shape in the GAN staging files back on
2026-09-01 ("A `confirmed` resting on one tier 2 source, five times over... two × TheCubicle —
**one publisher**"). That was staging material, since rewritten. The same defect now exists in
committed, `sourced`-status data that postdates that report:

| File | Pointer | Confidence | Sources cited | Publisher |
|---|---|---|---|---|
| `data/manufacturers/speedcubeshop.yml` | `/kind` | `confirmed` | `speedcubeshop-cosmic-gan11mpro-2022`, `speedcubeshop-unicube-gan11mpro-2020` | Both SpeedCubeShop |
| `data/manufacturers/thecubicle.yml` | `/kind` | `confirmed` | `thecubicle-cubicle-custom-gan11-m-pro-uv`, `thecubicle-mattys-gan16-maglev-max-uv`, `thecubicle-premium-setup-service` | All three TheCubicle |

Both sources on both records are `kind: retailer` (tier 2 by vocab default; neither carries a
tier override). Both notes describe the sources as "independent" — `speedcubeshop.yml`'s note
even says so in the same sentence that undercuts it: *"two independent tier 2 sources agreeing,
**both first-party to the servicer**."* Being first-party to the same servicer is precisely why
they are not independent evidence — they are one company describing itself twice.

**Repository-wide sweep, so this is a count and not an impression.** I checked every `confirmed`
attestation on every `family`, `manufacturer`, `model`, and `variant` record for: no tier-1
source cited, ≥2 tier ≤2 sources cited, and all of those tier ≤2 sources sharing one publisher.
**Exactly 2 hits, both above.** No other record currently exploits this gap — but the gap itself
is unfixed, will silently accept the same pattern in every future `kind: service` manufacturer
Pass 2/3 adds, and both live instances sit on `kind`, which is `x-critical` on the manufacturer
schema.

**What a human should do.** Two independent choices, not mutually exclusive:
1. **Data fix.** Downgrade both `/kind` attestations to `probable` (the underlying fact —
   both companies modify other manufacturers' cubes and sell the result under their own name —
   is not in doubt; the *evidentiary bar met* is), and correct the notes' "independent" language.
   *Or*, if the archivist judges a servicer's own retailer page is Tier-1-equivalent for a claim
   about the servicer's own business model (the same logic RESEARCH_SPEC §5.2 rule 2 already
   grants manufacturer marketing for its own specifications), re-`kind` these specific sources
   with an explicit override and justification — the same pattern already used correctly at
   `data/sources/lanlantoy-made-in-china-profile.yml` and
   `data/sources/companies-house-rubiks-brand-ltd.yml` (both checked this session; both are
   well-justified overrides, not part of this finding).
2. **Rule fix.** Add a publisher-distinctness check to rule 9's tier-≤2 branch: the two
   qualifying sources must have different `publisher` values (or, more precisely, must not be
   the same organization under an alias — a check the archive already has the vocabulary for,
   since manufacturer `aliases[]` exist for exactly this purpose).

**Blocks Pass 3:** No — nothing fails `npm run validate` today. But it is a live, critical-field
overclaim on two manufacturers (`thecubicle`, `speedcubeshop`) whose `kind: service` status
gates how every `modified_from` variant under them gets built starting in Pass 3.

---

### F2 — Two more repeating "Added:" catalogue-migration dates, beyond the known one — **Medium**

**What's already known and excluded from this report.** `pass2-human-review.md` documents
`Added: 2018-09-11` as a proven catalogue-migration artifact (29 occurrences, 22 sources, 13
brands) and records that it contaminated exactly two records, both now corrected.

**What I found that isn't in that accounting.** I ran the same detection method — extract every
`Added: YYYY-MM-DD` token from every source's preserved `excerpt`, group by exact date — against
all 284 sources and found **two further dates that repeat verbatim across unrelated products**,
neither discussed in `pass2-human-review.md`:

**`2018-10-14`** — 5 source records, 4 distinct brands, all `Type: Shape Mods` per their own
spec tables (TheCubicle's Shape Mods category evidently migrated as a batch, same as the
09-11 date did for its own category):

- `thecubicle-cubetwist-bandaged-3x3-diy-kit-2019`, `thecubicle-cubetwist-star-cube-2020`
  (CubeTwist)
- `thecubicle-lefun-moyan-i-2021` (Lefun)
- `thecubicle-ninja-ghost-cube-2020` (Ninja)
- `thecubicle-verypuzzle-clover-cube-2020` (VeryPuzzle)

I checked: **none of these five source IDs is cited by any family, manufacturer, model, or
variant attestation** (`grep -rl` against all of `data/` returns nothing). This is contained —
informational, not a live contamination — but it confirms the artifact pattern extends beyond
the one date already fixed, on products belonging to four of the archive's zero-family entities.
A future pass enumerating shape-mod variants under any of these four brands must not trust this
date if it resurfaces.

**`2018-11-07`** — this one is live, and it is the more important of the two. It appears on:

- `data/sources/thecubicle-guojia-type-a-chun2-2020.yml` (GuoJia) — present verbatim in the
  preserved `excerpt`, and its `reliability_note` explicitly reasons about it: *"a plausible,
  distinct per-product date (**not the suspect '2018-09-11' migration artefact** flagged
  elsewhere in this batch)."*
- `data/sources/thecubicle-maru-nano-3x3.yml` (Maru) — **not** present in the preserved excerpt,
  but the source's own `reliability_note` states the page's in-page "Added" field reads
  `2018-11-07`, distrusts it, and does not use it for dating.

I fetched both archived pages directly (`web.archive.org`, the exact `archive_url` each source
already cites) to check the claims rather than trust the prose: **both genuinely show
`2018-11-07`** on the live capture. So the underlying fact is not fabricated — but the *cross-brand
recurrence itself was never checked by either record*, and each reached the opposite conclusion
about the same date in isolation: GuoJia's source explicitly reasoned the date was
**not** the known artifact type; Maru's source distrusted its own "Added" field generally without
comparing notes. Now that the date is shown to recur across two unrelated brands, GuoJia's
"not the suspect artifact" reasoning is exactly the pattern that made `2018-09-11` suspect in the
first place, and needs re-examination.

**Live impact.** `data/families/guojia-type-a-chun.yml` `/introduced` is `confidence: uncertain`,
`qualifier: circa`, dated from this source, with a note that leans on the "not the suspect
artifact" reasoning to justify treating the date as somewhat meaningful rather than a bare
catalogue-migration floor. That specific leaning is what should be revisited — the confidence
level itself (`uncertain`) is already conservative and does not need to change, but the note's
reasoning currently overstates why.

**What a human should do.** Re-open `data/families/guojia-type-a-chun.yml`'s `/introduced` note:
either find a second, unrelated source confirming `2018-11-07` is a real per-product date for
this specific listing, or rewrite the note to acknowledge the date is now a repeat-pattern
candidate and treat it purely as a Wayback-capture floor, the same treatment `maru-nano.yml`
already gives it. Consider running this exact date-repetition sweep as a standing check before
any pass cites a TheCubicle "Added" field again — it is cheap (one regex over 284 files) and has
now found three distinct artifacts across two independent audits.

**Blocks Pass 3:** No. Affects one `uncertain`-confidence attestation's stated reasoning, not its
value.

---

### F3 — 13 committed records cite a research-notes file that no longer exists at that path — **Low**

`grep -rl "parallel-batch-B" data/` returns 13 files (12 `source` records, 1 `family` record:
`data/families/guoguan-yuexiao.yml`); one further file, `data/sources/thecubicle-maru-cx3.yml`,
cites `parallel-batch-A`. Both are quoted as the place a specific unresolved lead was "flagged...
for a human to weigh" (e.g. the GuoGuan/MoYu and MoJue/MoYu sub-brand evidence). Neither
`research/notes/models/parallel-batch-A.md` nor `-B.md` exists in the working tree.

**This is not data loss** — I checked `git log --all --diff-filter=A --name-only` and found both
files were real, then merged verbatim into `research/notes/models/global-pass2-families.md` by
commit `27f402d` ("Pass 2: merge parallel batch logs into canonical Pass 2 record"), which
deleted the two originals. I confirmed the specific content the citing records point at (e.g. the
GuoGuan/MoJue MoYu sub-brand reasoning) is present in `global-pass2-families.md` under headers
`## GuoGuan` / `## MoJue`. So every lead these 13 records point at is still recoverable — just not
at the path the records themselves state, and not without knowing to look in git history or the
merge commit's message.

**What a human should do.** Either restore thin redirect stubs at the two old paths, or do a bulk
find-and-replace of the 14 citations to point at `global-pass2-families.md` (with the relevant
`##` header if practical). Low cost, and it removes a small but real "the record cites something
that isn't there" defect from 14 files that would otherwise need a git-log detour every time a
future researcher tries to follow the lead.

**Blocks Pass 3:** No.

---

### F4 — Single-source and single-publisher dependence, quantified beyond the known subset — **Medium**

`pass2-human-review.md` already flags **21 families resting on a lone *tier-4* source** as a
High-priority corroboration backlog. I ran the same test across **all** tiers and against
*publisher*, not just source-record count, per hunting ground D5's explicit instruction
("publisher concentration, not just count").

- **58 of 122 families (47.5%)** rest on exactly one distinct cited source, of any tier:
  7 on a single tier-1 source (fine per the rules — tier 1 alone establishes `confirmed`),
  **30 on a single tier-2 source** (compliant with the rules as written — `probable` needs only
  one tier-2 source — but zero corroboration nonetheless), and the already-known 21 on a single
  tier-4 source.
- **70 of 122 families (57.4%)** depend on sources from a single publisher only, once multi-source
  families are included. Of those, **12 families cite 2–4 *different* source records that are all
  from the same single publisher** — an appearance of corroboration that publisher-independence
  scrutiny dissolves:

  | Family | # sources cited | Publisher |
  |---|---|---|
  | `moretry-tianma-x3` | 4 | TheCubicle |
  | `cubestyle-3x3`, `guoguan-yuexiao`, `haitun-waverider`, `lefun-3x3` | 3 each | TheCubicle |
  | `maru-3x3`, `newisland-lightning`, `senhuan-mars`, `witeden-mixup-3x3`, `x-man-xt3`, `yj-meta` | 2 each | TheCubicle |
  | `swift-block-3x3` | 2 | GANCUBE |

  (`rubiks-classic` and `rubiks-speed` also cite multiple same-publisher sources, but every
  source is `kind: manufacturer_official` — tier 1 does not require independence to reach
  `confirmed`, so these two are correctly excluded and not part of this finding.)

**What a human should do.** This is a prioritization input, not a rule violation by itself —
none of the 30 tier-2-single-source or 12 same-publisher-multi-source families currently claims
`confirmed` off that basis (checked directly; see F1's sweep, which covers the same ground for
the `confirmed` case specifically). Fold this into the existing corroboration backlog (priority
#4 in `pass2-human-review.md`) with the 12-family "illusion of corroboration" list called out
specifically, since those are the ones most likely to be mistaken for adequately-sourced during
Pass 3 model enumeration.

**Blocks Pass 3:** No.

---

### F5 — `cubicle-labs`: the only manufacturer record using `parent_id` off-label — **Low**

`data/manufacturers/cubicle-labs.yml` sets `parent_id: thecubicle` while `kind: service` (not
`sub_brand`). Across all 54 manufacturer records this is the **only** case where `parent_id` is
set on a non-`sub_brand` record — I checked all 54 programmatically (11 `sub_brand`, all with
`parent_id`; 43 others, all without, except this one).

`schema/manufacturer.schema.json` documents the field in one sentence: *"Parent manufacturer, for
sub-brands."* There is no schema-level constraint tying `parent_id` to `kind: sub_brand`, so this
validates cleanly — but it is a genuinely different relationship than the one the field
documents: Cubicle Labs is not a sub-brand of TheCubicle, it is (on the record's own `uncertain`-
confidence evidence) an operating division of another `kind: service` organization. The record
itself is honest about the weakness of the underlying claim (`/parent_id` is `uncertain` on a
single tier-4 source) — this finding is about the *field's semantics*, not the claim's evidence.

**What a human should do.** Either extend `parent_id`'s documented purpose to cover
service-of-service hierarchies explicitly (a one-line schema description edit, not a structural
change), or decide the relationship belongs in `notes`/a future `relationship` type instead of
overloading a field the schema says is for sub-brands. Either is fine; leaving it undecided means
the next researcher who copies this pattern for, say, a sub-servicer of SpeedCubeShop won't know
which reading is intended.

**Blocks Pass 3:** No.

---

## Ruled out — checked and not findings

Recorded so the next auditor does not re-spend budget on the same leads.

- **`data/sources/lanlantoy-made-in-china-profile.yml`** (`kind: manufacturer_official` on a
  Made-in-China.com vendor profile) looked, at first pass, like a sibling of `theqiyi-about-us`
  (third-party-hosted content re-kinded to tier 1). It is not: the record carries an explicit,
  specific `reliability_note` justifying the override per RESEARCH_SPEC §3.1, and — unlike
  `theqiyi.com` — nothing found this session contradicts the self-description (no affiliate
  disclosure, no reseller markers, no independent-domain contradiction). Good practice, not a gap.
- **`data/sources/companies-house-rubiks-brand-ltd.yml`** (`tier: 1` override on a `kind: press`
  government-registry record) — same check, same conclusion: explicit, well-reasoned, correctly
  distinguishes the corporate-registration date from the brand-founding date it does *not* claim
  to establish.
- **Manufacturer/family name-string collisions** (`fingerprint`-style exact match and Levenshtein
  distance ≤ 1 across all manufacturer names/aliases) — the only near-misses found
  (`MoYou`/`MoYu`, `QY Cube`/`QJ Cube`) are both **already explicitly flagged and
  cross-referenced** inside the archive itself (`data/manufacturers/qj.yml`: *"the same caution
  already applied to 'MoYou'/'MoYu' at data/manufacturers/cyclone-boys.yml"*) — this is the
  archive doing its own D10 check correctly, not a gap. `PBCube`/`PiCube` (distance 1) are two
  well-evidenced, clearly distinct entities (different country, different product class, already
  independently sourced) with no plausible confusion risk.
- **`kind: service` manufacturers with zero families** (`cubicle-labs`, `picube`, `saocube`,
  `speedcubeshop`, `thecubicle` — 5 of the 13 zero-family manufacturers) are not a coverage gap:
  DATA_MODEL §1.3 defines a servicer's products as variants of the *base* manufacturer's model
  via `modified_from`, not as families of the servicer's own design. Zero families is the correct
  structural outcome for `kind: service`. The other 8 zero-family manufacturers are exactly the
  set `pass2-human-review.md` already audits (A/B/C/D table) — no ninth case exists.
- **Copy-paste attestation notes** (D14) — I found 26 groups of byte-identical `note` text reused
  across 2–10 records (e.g. eight GAN seasonal limited editions all noting *"GAN's own page title
  names this a Limited Edition"*). Checked each group: every one covers genuinely parallel
  products in an identical evidentiary situation (same source pattern, same absence, same
  reasoning legitimately applying to each). This is consistent methodology, not fabrication —
  copy-paste prose is a red flag only when the underlying fact differs per record, which I did
  not find.
- **`schema/*.json` `additionalProperties`** — checked whether QC rules 13/14 (no computed
  valuation field, no numeric rarity score) are name-matching denylists that a differently-named
  field could evade. They are (`scripts/validate.mjs` matches a fixed list of key names) — but
  every relevant schema level (`pricing`, `rarity`, and the record root) already sets
  `additionalProperties: false`, so an undeclared field of any name is rejected by rule 1 before
  rules 13/14 would ever need to catch it. Redundant, not exploitable; not reported as a finding.

---

## Verdict

No record was edited. This audit adds five findings to the Pass 3 gate, none of them blocking on
their own:

- **F1** (High) should be resolved alongside the archive's existing tier-4/`theqiyi` decisions,
  since it is the same *kind* of confidence-policy question — same-publisher independence,
  not source count — applied to two `x-critical` manufacturer `/kind` fields.
- **F2** (Medium) is a two-item correction: one contained (no live citation), one live and small
  (one family's `/introduced` note).
- **F3, F4, F5** (Low–Medium) are hygiene and prioritization items, not correctness failures.

**What the archive currently does not know that it should:** whether `TheCubicle`'s and
`SpeedCubeShop`'s own retailer pages about their own service businesses should be read as
first-party evidence about themselves (in which case one page would suffice, the same as a
manufacturer's own spec page) or as ordinary tier-2 retail copy that needs a second, genuinely
independent voice before `kind: service` can stand at `confirmed` — the archive has answered
this question both ways in different records without ever stating the rule.

---

```yaml
findings:
  - id: F1
    severity: High
    title: "Rule 9 accepts two same-publisher tier-2 sources as independent corroboration"
    affected_count: 2  # confirmed attestations exploiting the gap today (thecubicle, speedcubeshop /kind)
    blocks_pass3: false
  - id: F2
    severity: Medium
    title: "Two further 'Added:' catalogue-migration date artifacts beyond the known 2018-09-11 (2018-10-14, 2018-11-07)"
    affected_count: 8  # 5 sources on 2018-10-14 (contained) + 2 sources + 1 live family attestation on 2018-11-07
    blocks_pass3: false
  - id: F3
    severity: Low
    title: "14 records cite research/notes/models/parallel-batch-A.md or -B.md, which no longer exist at that path"
    affected_count: 14
    blocks_pass3: false
  - id: F4
    severity: Medium
    title: "Single-publisher evidentiary concentration beyond the known tier-4 subset (58 single-source, 70 single-publisher families; 12 with only apparent multi-source corroboration)"
    affected_count: 70
    blocks_pass3: false
  - id: F5
    severity: Low
    title: "cubicle-labs is the only manufacturer record using parent_id off-label against its own schema description ('for sub-brands')"
    affected_count: 1
    blocks_pass3: false
```
