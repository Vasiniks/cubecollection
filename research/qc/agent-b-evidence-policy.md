# Agent B — evidence tier / confidence remediation policy

Scope: the 111 attestations (107 `reported`, 4 `probable`) that rest solely on tier-4
sources, as established before this session by two independent counting passes. I
independently re-derived the set with a script against `sourceTier()` and
`vocab/source-kinds.yml` (see method, §0) and got exactly 111, split exactly 107/4, with
every one of them citing a single tier-4 source and no attestation citing more than one — so
I am treating the count as closed and spending the budget on the policy, per instructions.

Companion file: `research/qc/evidence-tier-remediation-matrix.yml` — the machine-readable
decision record. This document is the reasoning behind it.

---

## 0. Method

```
scripts/lib/archive.mjs: sourceTier(sourceDoc, vocabs)
  → doc.tier if an integer is set, else vocab/source-kinds.yml[doc.kind].tier, else 5
```

I loaded every record, built `tierOf(sourceId)` the same way `validate.mjs` does, and for
every `attestations` entry with `confidence` in `{reported, probable}` and at least one
source, checked whether **every** cited source resolved to tier 4. 111 matched, 107
`reported` + 4 `probable`, distributed across 17 distinct source records and 59 host records
(56 `family`, 3 `manufacturer`). I also ran the general form of this check — `reported`
requires *any* cited source at tier ≤3, `probable` requires *any* cited source at tier ≤2 —
across the whole archive, not just the all-tier-4 subset. It also returns exactly 111. **There
is no mixed-tier case in the archive where the letter of the confidence vocabulary is
violated that isn't already in this set.** The 111 is the complete, exact set.

`npm run validate` passes clean on the archive as it stands (0 errors, 0 warnings). This
matters: **none of the 111 sit on a QC-blocking field.** See §2.

---

## 1. What each tier means, as written, and where the enforcement actually is

`RESEARCH_SPEC.md` §3.1 and `DATA_MODEL.md` §5.1 (identical tables): tier 3 is "named
reputable reviewers, long-form community documentation, forum threads with corroborating
detail" and establishes `reported` alone; tier 4 is "marketplace listings, aggregators,
unattributed wikis, marketing copy without specifications" and "corroborates only, never
establishes." `vocab/confidence.yml` binds `reported` to "Tier 3 source, uncontradicted and
plausible" and `uncertain` to "weak or single-source, or the claim is internally implausible."

That is a real, specific, mechanically-checkable promise: a solitary tier-4 source backing a
claim should produce `uncertain`, not `reported`. **`scripts/validate.mjs` does not check
it.** Rules 9/12/16 (the "confidence rules" block) check `confirmed` (needs tier 1 or two
independent tier ≤2), tier 5 (blocked outright), and `sampled_from_image`/`inferred` with
`confirmed`. Nothing checks that `reported` has a tier-≤3 source or that `probable` has a
tier-≤2 source. So the 111 are not a violation of any blocking rule — they are a violation of
a documented promise the tooling never enforces. That is itself a finding (§6), and it is why
the mismatch was invisible to `npm run validate` while being real.

## 2. Which fields are actually at stake

I checked every pointer base among the 111 against `x-critical` in the schemas:

| Pointer | Entity | `x-critical`? |
|---|---|---|
| `/country`, `/founded`, `/native_name`, `/aliases` | `manufacturer` | No (only `manufacturer.kind` is critical, and no attestation in the 111 touches `kind`) |
| `/introduced`, `/positioning`, `/description`, `/successor_family_id`, `/aliases` | `family` | No (`family.schema.json` declares zero `x-critical` fields) |

**None of the 111 touch a critical field**, on any record, at any tier. That is why
`npm run validate` is clean. Nothing here gates `sourced`/`published` status, and nothing here
is inherited by a variant the way a model spec is (family-level fields are not part of the
`model.specs` → `variant.config` inheritance chain — a variant does not read its family's
`positioning` or `description`). The blast radius is real but bounded: it is the exhibition's
narrative layer (family origin story, market position, approximate founding date, name
variants) for ~53 families/manufacturers, not the specification layer a collector would
verify against a physical cube. I say this to calibrate urgency, not to dismiss the finding —
`description` and `positioning` are exactly the prose a visitor reads, and Product Principle 3
("every material fact carries its origin... disagreement is data") applies to prose as much as
to a magnet count.

The one adjacent case that *is* a critical field and *is* mixed-tier — `guoguan.kind:
sub_brand` and `guoguan.parent_id: moyu`, both `reported`, each citing
`speedsolving-wiki-guoguan` (tier 4) *and* `moyucube-official-home-2022` (tier 1) — passes the
letter of the vocabulary (a tier-1 source is cited, satisfying "tier ≤3") but the record's own
authoring note admits the tier-1 source only shows the two names "grouped together," not the
specific parent relationship the tier-4 source states directly. That is not a mismatch by the
mechanical rule, so it isn't in the 111 and I haven't touched it, but it's a higher-severity
shape of the same problem — a corporate-relationship claim substantively resting on a tier-4
source, dressed in a tier-1 citation that doesn't actually carry the specific claim — and I
flag it in the matrix (`adjacent_findings`) for a human to look at, since `kind`/`parent_id`
propagate to how the whole `guoguan` manufacturer and everything under it is classified.

## 3. Which `kind`s map to tier 4, and is the mapping right

`vocab/source-kinds.yml`: `marketplace` (tier 4, one source in the whole archive uses it,
uninvolved here) and `wiki` (tier 4, "a community-edited reference"). 31 sources carry
`kind: wiki`; 17 of them back at least one of the 111 attestations. The default is correct for
the *median* member of the class — the vocabulary's `wiki` entry is one bucket for everything
from an anonymous brand-directory page to a heavily cross-referenced, edit-restricted
per-manufacturer product history, and that collapse is real. It is not, however, a schema
defect that blocks a fix: `source.tier` already exists as an explicit override field, gated by
a `reliability_note` requirement that `validate.mjs` enforces (the check at the bottom of
`validate.mjs`: a declared `tier` differing from the kind default without a
`reliability_note` is an error). The mechanism to say "this specific wiki source is better
than its kind's default" already exists. It has been used exactly once in the whole archive —
`companies-house-rubiks-brand-ltd`, `kind: press` overridden to tier 1 with a reliability note
explaining that a government company registry is closer to a patent than to press reporting.
That override is a good model: specific, individually justified, and honest about why the
`kind` label itself doesn't fit. None of the 31 `wiki` sources use it. **The mechanism is
correctly designed and essentially unused for this exact situation** — which is evidence the
root cause is under-application of an existing policy, not a missing one.

## 4. Do the Speedsolving per-manufacturer pages qualify as tier 3 "long-form community
documentation," or are they "unattributed wikis"?

I did not answer this from the `kind` label. I read the actual pages — the live
`speedsolving.com/wiki` articles, not just the archived excerpts already in the repo — for six
of the highest-weight sources, fetched directly (`WebFetch` on the live `speedsolving.com`
domain; `web.archive.org` refuses `WebFetch` per `RESEARCH_SPEC.md` §3.6, and a direct `curl`
from this sandbox hit Cloudflare's bot challenge, so live-page `WebFetch` was the only channel
available and I used it, treating the fetched content strictly as data to inspect, never as
instructions):

| Source | Protected (edit-restricted)? | Revision history? | Named author/byline? | Footnote citations? | Self-declared "may be outdated" banner? |
|---|---|---|---|---|---|
| `speedsolving-wiki-qiyi-products` / `speedsolving-wiki-qiyi` (same page, `title=QiYi`) | Yes | Yes | No | Yes (2, external) | No |
| `speedsolving-wiki-yongjun-products` (`title=YongJun`) | Yes | Yes | No | Yes (numbered, external) | No |
| `speedsolving-wiki-dayan-products` (`title=DaYan`) | Yes | Yes | No | Yes, "primarily within product release sections" | No |
| `speedsolving-wiki-cyclone-boys-products` (`title=Cyclone_Boys`) | Yes | Yes | No | Yes (1, manufacturing-location) | No |
| `speedsolving-wiki-moyu` (`title=MoYu`) | Yes | Yes | No | Not checked in detail | No |
| `speedsolving-wiki-witeden` (`title=WitEden`) | Yes | Yes | No | Yes (1, external forum) | **Yes** — "This page may be currently outdated... take care about information on this page," tagged "Perhaps Outdated pages" |

Findings that cut *for* an upgrade on the first five: these are not open, anonymous,
unaccountable pages. They are edit-restricted (a form of curatorial gatekeeping — not "anyone
can edit," which is the operative complaint against "unattributed wiki" as a category),
revision-tracked (an editor's change is attributable to an account and a diff even without a
public byline, which is the same accountability model most of this archive's own tier-2/3
retailer and forum sources rely on), and at least partially footnoted, including — for DaYan
specifically — footnotes concentrated in the product-release sections themselves, which is
better sourcing discipline than "unattributed running prose" implies. None of the five carry
an "outdated" self-warning as of the capture used.

Findings that cut *against* a blanket upgrade, which I went looking for deliberately
(disconfirmation, per instructions):

1. **`speedsolving-wiki-witeden` carries the exact "may be currently outdated" banner** and is
   categorized "Perhaps Outdated pages" by the wiki's own tagging — and the *existing* source
   record's `reliability_note` does not mention this at all. That is a real miss in the prior
   session's work, caught only by reading the live page rather than trusting the kind label or
   the excerpt. It argues against upgrading this specific source, and separately argues that
   `reliability_note`s should not be assumed complete just because they're present and
   thoughtful elsewhere in the same source class.
2. **Five sibling sources in the identical class explicitly self-flag as outdated or
   incomplete**, and the archive's own `reliability_note`s already caught this correctly:
   `speedsolving-wiki-diansheng-products`, `speedsolving-wiki-shengshou-products`,
   `speedsolving-wiki-yuxin-products`, and `speedsolving-wiki-eastsheen` each carry the "This
   page may be currently outdated" banner verbatim in their own `reliability_note`;
   `speedsolving-wiki-cube4you-2010` is self-marked "a DNF" (stub) by its own editors;
   `speedsolving-wiki-kungfu` and `speedsolving-wiki-zcube` are separately noted as
   "self-marked 'currently outdated.'" **26% of the 111 (29 of 111) rest on a source that
   warns about its own datedness.** These are not "unattributed wiki" in the abstract sense
   either — they're the concrete case tier 4's own definition names.
3. Several of the -products pages' own prose is internally hedged — "released *around* late
   2019," "*supposedly* after 3 years of design," "*considered* a budget version" — which is
   the page's own authors expressing the uncertainty a confident `reported` label should not
   paper over. The archive's existing dating practice already reflects this (every `/introduced`
   value I sampled carries `precision: month` or `year` with `qualifier: circa` — nobody
   recorded a false-precision day-level date from these sources), which is good practice
   worth preserving as a hard constraint rather than something the confidence label alone
   protects.
4. Two sources I did **not** independently verify live (`speedsolving-wiki-mfjs-products`,
   `speedsolving-wiki-mf8-products`, 10 attestations together) structurally resemble the
   verified five (same "-products" companion-page convention, explicitly following the
   `speedsolving-wiki-mfjs-products` precedent per the `qiyi-products` source's own header
   comment) but I have no direct evidence for them individually. I am not extending the
   upgrade to them on family resemblance alone — see §5, `leave_unresolved`.

**Conclusion on the live question:** this is not one answer for "Speedsolving wiki" as a
class. It is at minimum three answers: (a) five specific per-manufacturer pages that are
curated, edit-restricted, revision-tracked, and currently free of a self-declared staleness
warning — these substantively meet tier 3's own definition ("long-form community
documentation") for the claim types in §5, and I recommend the individual, justified
`tier: 3` override RESEARCH_SPEC §3.1 already provides for; (b) at least seven sources in the
identical class that carry their own "outdated"/"stub" warning and should not be upgraded —
if anything the `reported` label they currently carry overstates them and should drop to
`uncertain`; (c) a residual few (thin brand-directory-style pages: `maru`, `fangshi`,
`guoguan`) that are correctly tier 4 by any reading and should likewise drop to `uncertain`
rather than `reported`, because a lone tier-4 source is definitionally the "weak,
single-source" case `uncertain` exists for.

## 5. Claim types — the part that matters more than any tier number

Upgrading a source's tier changes what confidence label is *available*; it does not mean every
claim on that source should use it. Per claim type, regardless of whether the source sits at
tier 3 (post-override) or stays at tier 4:

**Permitted at `reported` (tier-3-eligible sources only) / capped at `uncertain` (tier-4
sources):**
- *Existence and naming* — "a product line by this name existed." Fabricating an entire named
  product line is not a plausible failure mode for a specialist enthusiast reference, and this
  is exactly the kind of fact "long-form community documentation" is good at.
- *Approximate chronology* — `introduced`/`discontinued` dates, but **only** at `quarter` or
  `year` precision with `qualifier: circa`. Never day-level. Never an unqualified month. This
  matches current practice across every `/introduced` attestation I sampled and should stay a
  hard constraint, independent of the source's tier.
- *Family succession within one manufacturer* (`successor_family_id`) — an in-house lineage
  claim, lower stakes than a cross-company relationship.
- *Positioning* (`flagship`/`mainline`/`budget`/etc.) — but **never above `reported`,
  regardless of tier**, and only when the record's own note is honest that this is an
  editorial reading of the source's framing, not a manufacturer statement. `data/families/
  qiyi-mp.yml` already does this correctly — the wiki calls the same product "flagship" and "a
  budget version" in the same breath, and the researcher recorded `positioning: mainline` at
  `uncertain` with a note flagging the tension for human review. That is the standard to hold
  every `positioning` attestation to, and it generalizes RESEARCH_SPEC §3.3's manufacturer
  rule ("tier 1 for specs, tier 4 for comparative/superlative claims") to community sources:
  a categorical judgment adjectivally derived from marketing-adjacent language is corroboration,
  never confirmation, at any tier.
- *Descriptive prose*, with comparative/superlative language attributed as the source's
  opinion (in quotes, as the existing `description` fields already do) rather than adopted as
  the archive's own voice.

**Forbidden regardless of tier, even after an override:**
- *Numeric specifications* — `size_mm`, `weight_g`, `magnet_configuration`, `core_system`,
  `maglev`, `adjustment_system`, `coating`. None of the 111 currently do this — a real
  strength of the existing research — and no upgrade should be read as license to start. These
  are exactly what tier 1–2 spec tables and archivist measurement exist for; a narrative
  history page repeating a number ("measures 56mm... over the Tornado V2's 54.5mm") is
  comparative commentary, not a verified spec, and the one place this appears in the sampled
  excerpts (QiYi MP vs. X-Man Tornado V2) is correctly *not* cited anywhere as a `/config` or
  `/specs` value in the current records.
- *Corporate/ownership/genealogy claims* — `parent_id`, `kind: sub_brand`, `rebrand_of`,
  `modified_from`. Rule 17 already requires tier 1–2 for the latter two by name; I recommend
  applying the same standard by convention to `parent_id`/`kind: sub_brand`, which the schema
  does not currently gate the way it gates `rebrand_of` — see the `guoguan` case in §2 and
  `adjacent_findings` in the matrix. A wiki stating a sub-brand relationship "directly and
  specifically" is still one unaccountable claim; the current practice of citing it alongside
  a tier-1 source that only shows the names *grouped* (not the relationship itself) is honest
  about the gap but the resulting `reported` label doesn't communicate that gap to a future
  reader who doesn't open the record's prose notes.
- *`confirmed`* — already schema-enforced (rule 9) and unaffected by anything here; tier 3
  never produces `confirmed` alone regardless of any override.

## 6. Root cause

A combination, in descending order of how much of the 111 it explains:

1. **Confidence-vocabulary enforcement gap (the dominant cause, ~100% of the 111).**
   `vocab/confidence.yml` and `RESEARCH_SPEC.md` both define `reported`/`probable` in terms of
   source tier, but `validate.mjs` only checks this for `confirmed`. A conscientious
   researcher choosing between `reported` and `uncertain` for a single, plausible, uncontradicted
   tier-4 claim has no tooling pressure to notice that `reported` is the wrong word for the
   evidence they have — and, reading the actual records, that is exactly what happened
   repeatedly: careful, well-hedged research (candid `reliability_note`s, correct date
   precision, honest "not sufficient alone" language in nearly every note I read) paired with
   a confidence label one notch too generous for what the vocabulary promises that label
   means. This is a labeling-integrity problem, not a fabrication problem — see §7.
2. **Source classification granularity (a real but secondary cause).** `kind: wiki` at a flat
   tier 4 is too coarse for what's actually in `data/sources/`, which ranges from anonymous
   brand-directory pages to edit-restricted, revision-tracked, partially-footnoted
   per-manufacturer histories. The `tier:` override exists precisely for this and is
   under-used (once, archive-wide, for an unrelated source), which suggests researchers
   defaulted to the kind label rather than exercising the override the policy already grants
   them — plausibly because doing so credibly requires reading the live page rather than
   trusting the excerpt already captured, which is exactly the extra step this audit took.
3. **Research policy is not self-contradictory, but its two documents describe tier 3 with
   different specificity.** RESEARCH_SPEC's tier 3 row names "long-form community
   documentation" as an example; source-kinds.yml's `wiki` entry describes only "a
   community-edited reference," with no vocabulary value distinguishing a curated,
   protected, footnoted page from an open anonymous one. That is a legitimate schema-adjacent
   finding (§8) but it is not blocking, because the `tier:` override was already built to
   carry exactly this distinction per-source.
4. **Not a provenance-schema failure.** Preservation is actually good across this set — every
   one of the 17 sources has `preservation_method: archive_url` or `excerpt` populated, none
   record `none`, and the five dead-linked ones (`cube4you-2010`, `kungfu`, `lingao`,
   `qj-2017`, `zcube`) are all still `archive_url`-preserved, so no evidence is lost even
   where the live page is gone. This part of the archive's practice is working as designed.

## 7. Are the 111 genuinely supported, unsupported, or both?

Both, but weighted heavily toward "genuinely supported, mislabeled" rather than "unsupported."
Sampling across all 17 sources and a majority of the 59 host records:

- The overwhelming majority (I'd estimate 90+ of 111, corresponding to the six sources treated
  as `override_tier` or already-appropriately-hedged in the matrix) are claims a careful
  researcher would in fact believe at roughly `reported`-strength once you actually read the
  cited page: existence, naming, approximate dating with appropriate hedged precision,
  editorial positioning explicitly flagged as inference. The `dayan-guhong`, `qiyi-mp`, and
  `eastsheen` records I read in full are model examples of honest, well-caveated research —
  the labeling gap is real but the underlying epistemic state recorded in prose is usually
  more accurate than the single `confidence` word attached to it.
- A meaningful minority (29 of 111, all citing a source that self-declares staleness) are
  currently overstated relative to even their own source's warning, and should move to
  `uncertain`.
- A small number (the `guoguan`/`maru`/`fangshi` single-thin-source cases) are correctly
  flagged as weak in the surrounding prose already but carry a confidence word
  (`reported`/`probable`) stronger than the prose earns.
- I found no case in this set of an outright fabricated or unsupported claim — no attestation
  citing a source whose excerpt doesn't actually contain the claimed fact, and no phantom
  variant created from a wiki naming alone (RESEARCH_SPEC §3.7's specific worry). The
  `qiyi-mp` vs. `qiyi-m-pro` split is the closest case to a "wiki name became a variant"
  risk, and it was handled correctly: kept as two families with the ambiguity stated in prose
  and flagged for pass 3, not silently merged or silently split with false confidence.

## 8. Where the schema handled this badly (a finding, not a workaround)

`source-kinds.yml` has no vocabulary value between "unattributed wiki" (tier 4) and a named,
professionally-edited outlet (tier 2/3 `press`/`review`). A curated, edit-restricted,
partially-footnoted community reference — which is a real and recurring category in this
domain, not a one-off — has no `kind` that describes it; the only path to reflect it is the
per-source `tier:` override, which works but produces 17 individually-justified overrides
for what is structurally one recurring situation. This is not something I'm fixing (`vocab/`
is out of my write lane and Pass 3 is frozen); it's recorded here as a finding for whoever
owns schema/vocab changes, in the terms the instructions ask for: the schema represented this
without contortion (the override mechanism works), but the *vocabulary* undersupplies a
distinction the research prose keeps having to make by hand in every `reliability_note`.

---

## 9. Decisions

Full per-source detail, with `affected_attestations` record/pointer lists, is in
`evidence-tier-remediation-matrix.yml`. Summary:

| Decision | Sources | Attestations | Records touched |
|---|---|---|---|
| `override_tier` (4→3, per-source, with `reliability_note`) | `speedsolving-wiki-qiyi-products`, `speedsolving-wiki-qiyi`, `speedsolving-wiki-yongjun-products`, `speedsolving-wiki-dayan-products`, `speedsolving-wiki-cyclone-boys-products`, `speedsolving-wiki-moyu` | 63 | qiyi (2 families... see matrix), yongjun (10 families), dayan (9 families), cyclone-boys (5 families), moyu (3 families), qiyi manufacturer |
| `downgrade` (confidence `reported`/`probable` → `uncertain`; source tier stays 4) | `speedsolving-wiki-diansheng-products`, `speedsolving-wiki-shengshou-products`, `speedsolving-wiki-yuxin-products`, `speedsolving-wiki-witeden`, `speedsolving-wiki-eastsheen`, `speedsolving-wiki-fangshi`, `speedsolving-wiki-guoguan`, `speedsolving-wiki-maru` | 36 | 8 manufacturers/families groups — see matrix |
| `leave_unresolved` (needs a human to fetch and check 2 live pages before a mechanical decision applies) | `speedsolving-wiki-mfjs-products`, `speedsolving-wiki-mf8-products`, `speedsolving-wiki-mofang-jiaoshi` | 12 | mfjs family group, mf8 family group |
| **Total** | 17 sources | **111** | 59 records |

No entry recommends `replace_source` or `remove_claim` — I found no claim in this set that is
false, implausible, or better served by deletion; the corrective action is always a label or a
tier, never removal of the underlying research.

## 10. Verdicts, per affected record group

I am not verdicting all 59 individual records line by line (that duplicates the matrix); the
verdict is the same reasoning applied per source class, and it is **hold** across the board —
none of this should block `sourced`/`published` progression (nothing here is a critical field,
`npm run validate` is already clean, and the mislabeling doesn't misrepresent the underlying
evidence to a reader who opens the record's own prose). Specifically:

- **Records citing an `override_tier` source only:** hold, pending the mechanical
  `tier: 3` + `reliability_note` edit to the six source files and no change needed to the
  citing attestations themselves (`reported`/`probable` becomes literally correct once the
  source's tier is corrected — this is a source-file fix, not a record-file fix).
- **Records citing a `downgrade` source only:** hold, pending relabeling
  `reported`/`probable` → `uncertain` on the 36 citing attestations. This is a `data/`
  edit and out of my write lane; it belongs to whichever agent owns record edits.
- **Records citing a `leave_unresolved` source:** hold, explicitly not promote and not
  downgrade, until a human spends the ~10 minutes to fetch `speedsolving.com/wiki/index.php?
  title=MFJS` (or the correct title) and `title=MF8` live and check for the "may be outdated"
  banner and edit-protection the way I did for the six verified sources. Interim state, if a
  build must run before that check happens: treat as tier 4 / `uncertain`, the conservative
  default, not as `reported`.
- **`guoguan.kind` / `guoguan.parent_id`** (adjacent finding, not in the 111): hold, flagged
  for human review given it is a critical field carrying a sub-brand determination on a
  tier-4-direct + tier-1-indirect citation pair.

Nothing here is a `promote`-to-`confirmed` situation — tier 3 never licenses `confirmed`
alone, and none of these sources plus what's already on file clears the tier-1-or-two-
independent-tier-2 bar rule 9 checks.

---

## Machine-readable summary

```
total_attestations_affected: 111
decisions:
  override_tier: 63
  downgrade: 36
  leave_unresolved: 12
  retain: 0
  replace_source: 0
  remove_claim: 0
sources_affected: 17
records_affected: 59
requires_human_decision:
  count: 15
  sources: [speedsolving-wiki-mfjs-products, speedsolving-wiki-mf8-products, speedsolving-wiki-mofang-jiaoshi, speedsolving-wiki-witeden]
  note: >
    witeden is a downgrade decision I'm confident in (verified banner), flagged
    requires_human_decision because it additionally needs a correction to another
    session's reliability_note, which is a data/ edit outside this agent's write lane.
    mfjs-products, mf8-products, mofang-jiaoshi need a live-page check before a tier
    decision can be made mechanically.
adjacent_findings_not_in_111: 1  # guoguan.kind / guoguan.parent_id, critical-field, mixed-tier
validate_status_before_and_after_recommendation: clean (0 errors) — nothing here is blocking
```
