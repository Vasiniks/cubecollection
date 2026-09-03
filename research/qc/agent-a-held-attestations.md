# Agent A — adjudication of the 12 held attestations (Pass 2.5 remediation)

Scope: the 12 attestations left `leave_unresolved` in
`research/qc/evidence-tier-remediation-matrix.yml` (the `speedsolving-wiki-mfjs-products`,
`speedsolving-wiki-mf8-products`, and `speedsolving-wiki-mofang-jiaoshi` entries), adjudicated
individually per the assignment brief. No `data/` files were edited. `mf8-crazy-3x3x3`'s
scope_class / Rule-15 question is explicitly left to Agent B; only the evidence tier of its two
attestations is assessed here.

## List verification — one correction to the assigned table

I re-read all six source files before touching anything. Eleven of the twelve rows in the
assignment table match the actual `sources:` arrays in `data/families/*.yml`. One does not:

> `data/families/mfjs-meilong.yml` **`/positioning`** is attested to `speedsolving-wiki-mofang-jiaoshi`,
> **not** `speedsolving-wiki-mfjs-products` as the assignment table states.

Verified directly in the file:

```yaml
  /introduced:
    confidence: reported
    sources: [speedsolving-wiki-mfjs-products]
  /positioning:
    confidence: reported
    sources: [speedsolving-wiki-mofang-jiaoshi]
```

This also matches `evidence-tier-remediation-matrix.yml` itself, which lists
`mfjs-meilong.yml/positioning` under the `speedsolving-wiki-mofang-jiaoshi` entry (count 2, with
`mfjs.yml/native_name`) and lists `mfjs-meilong.yml/introduced` under the separate
`speedsolving-wiki-mfjs-products` entry (count 6). The two source counts in the matrix (6 + 2 = 8)
plus `speedsolving-wiki-mf8-products` (4) correctly sum to 12; the assignment table's row for this
one attestation just names the wrong one of the two sibling sources. Everything below uses the
verified (matrix-consistent) sourcing.

## Central finding: the two MFJS sources are one page, not two

`speedsolving-wiki-mfjs-products` (`url: .../wiki/index.php/MoFang_JiaoShi`, captured 2025-08-18)
and `speedsolving-wiki-mofang-jiaoshi` (`url: .../wiki/index.php?title=MoFang_JiaoShi`, captured
2026-04-05) are **the same wiki page** under two URL forms (path-style vs. query-string), not two
independent pages:

- Live check: fetching the path-style URL redirects/resolves to the identical query-string page;
  identical title, identical banner text, identical infobox.
- Both `npm run wayback -- get` snapshots, taken **eight months apart**, are **byte-for-byte
  identical** in body content (diffed directly — the only difference between the two saved
  captures is the URL/timestamp comment line the script itself prepends). The page did not change
  between the two capture dates, so this is not a case of "different page states worth preserving
  separately" — it is one static page captured twice.
- Both live and both archived captures carry the same self-declared staleness banner (see below),
  which neither existing source record's `reliability_note` mentions.

**No attestation in the archive currently cites both**, so there is no live false-corroboration
today — but this is exactly the latent trap the assignment flagged: if a future researcher ever
cited both records for one claim, two "tier 4 sources agreeing" would in fact be one source
counted twice, which is the independence violation this agent exists to catch (RESEARCH_SPEC
§3.2, DATA_MODEL §5.2 rule 1).

**Recommendation:** merge into a single source record. Concretely (for whoever holds the `data/`
write lane): keep `speedsolving-wiki-mfjs-products` as canonical — its excerpt is the more complete
one (it carries the full dated 3x3 product-line text that six of the eight combined attestations
actually rely on), fold in `speedsolving-wiki-mofang-jiaoshi`'s sub-brand/Meilong-as-product-line
excerpt as additional excerpt content on the same record, and re-point
`mfjs.yml/native_name` and `mfjs-meilong.yml/positioning` at the merged id. Retire
`speedsolving-wiki-mofang-jiaoshi` as `merged_into` (or equivalent) rather than deleting it, so the
id remains resolvable. Do **not** keep both live as "independent" records with only a cross-reference
note — a note is easy to miss at the moment someone is corroborating a claim, and the whole point of
this class of error is that nobody reads both before corroborating. Since the two captures are
provably identical, no evidence is lost by merging.

## Central finding: both MFJS URL forms carry a live staleness banner — neither qualifies for tier-3 override

Live WebFetch of `https://www.speedsolving.com/wiki/index.php?title=MoFang_JiaoShi` (and the
path-style URL, which resolves to the same page), 2026-09-03:

> **"This page may be currently outdated (since new cubes/products may be released). Take care
> about information on this page and update it if you know more recent information."**

The page is additionally tagged with the category **"Perhaps Outdated pages"**. Page IS
edit-protected ("This page is protected. You can view its source") and DOES carry a working
History/past-revisions link — two of the four override criteria are met — but the banner is
present, which is disqualifying on its own per the policy ("no self-declared outdated/stub/DNF
banner ... checked on the LIVE page"). No footnote/citation markers are present anywhere on the
page at all (confirmed against the full raw capture, not just the excerpted sections), which
further separates this page from the six pages that already received the override (qiyi, dayan,
yongjun, cyclone-boys, moyu each have at least one numbered external citation).

I went further than "live only" and pulled both archived captures via `npm run wayback -- get`
against the exact timestamps recorded on the two source files (`20250818091604` and
`20260405010335`). **The banner is present in both archived captures too**, word-for-word
identical to the live text, and the page's own footer records "last edited on 15 March 2024" —
before either capture. So this is not a case of the page decaying since capture; the banner was
already there when both sources were captured, and neither existing source record's
`reliability_note` mentions it (`speedsolving-wiki-mfjs-products`: "Tier 4, community-edited wiki
with no named author or citation trail"; `speedsolving-wiki-mofang-jiaoshi`: "Tier 4,
community-edited, no citation trail for the sub-brand claim") — a real gap in the prior session's
verification, the same pattern already documented for `speedsolving-wiki-witeden`.

**Recommendation for both source records:** stay tier 4 (no override). Recommend, as a follow-up
`data/` edit outside this agent's write lane, correcting both `reliability_note` fields to record
the banner explicitly, the same fix already recommended for `speedsolving-wiki-witeden`.

## Central finding: MF8 fails the "substantial/long-form" prong, independent of the banner test

`speedsolving-wiki-mf8-products` (`https://www.speedsolving.com/wiki/index.php?title=MF8`) passes
three of the four override criteria on live check: edit-protected, revision-history-tracked, no
staleness banner or "outdated pages" category. It fails the fourth.

Pulling the full live page and the exact archived capture (`20260302112516`) shows the entire page
is: a company infobox, one description sentence, a bare bulleted list of product names grouped by
year (2007–2016), and an external-links list. The infobox's `Website: [1]` is a plain hyperlink to
the manufacturer's own shop, not a numbered citation/footnote apparatus — there is no "References"
section, no citation attached to any individual product-list entry, and nothing resembling prose
commentary. This is a materially thinner page than any of the six already-verified overrides: qiyi
and yongjun each carry multiple numbered footnotes tied to specific claims; dayan's footnotes are
"concentrated in the product-release sections specifically"; even cyclone-boys, the thinnest of the
six, has one genuine external citation (a China-toy-trade source for a manufacturing-location
claim). MF8 has none. RESEARCH_SPEC's own definition of tier 3 is "long-form community
documentation" — a bare dated list is not long-form documentation, it is a list, and the source's
own existing `reliability_note` already says as much ("no citation trail for any date").

**Recommendation:** stays tier 4. No override. This is a closer call than the two banner-driven
downgrades above (there is no explicit disqualifying signal, just insufficient substance), so I
rate my confidence `medium-high` rather than `high`, but I don't think it clears the bar the six
verified sources cleared, and the assignment is explicit that leaving something held is a
legitimate outcome — I chose to make the call here rather than leave it open a second time,
because the live evidence is now concrete and unambiguous (a 99-line stub, one paragraph, no
citations), which is exactly the kind of thing this pass was meant to resolve.

## Per-attestation adjudication

| # | Record / pointer | Source (verified) | Current confidence | Claim type | Live check result | Recommendation |
|---|---|---|---|---|---|---|
| 1 | `data/manufacturers/mfjs.yml` `/native_name` | mofang-jiaoshi | probable | naming | banner present, no override | **downgrade → uncertain** |
| 2 | `data/families/mf8-crazy-3x3x3.yml` `/introduced` | mf8-products | reported | chronology (year, circa) | thin/stub, no override | **downgrade → uncertain** |
| 3 | `data/families/mf8-crazy-3x3x3.yml` `/description` | mf8-products | reported | descriptive/naming | thin/stub, no override | **downgrade → uncertain** |
| 4 | `data/families/mf8-legend.yml` `/introduced` | mf8-products | reported | chronology (year, circa) | thin/stub, no override | **downgrade → uncertain** |
| 5 | `data/families/mf8-legend.yml` `/description` | mf8-products | reported | descriptive/naming | thin/stub, no override | **downgrade → uncertain** |
| 6 | `data/families/mfjs-meilong.yml` `/introduced` | mfjs-products | reported | chronology (month+circa) | banner present, no override | **downgrade → uncertain** |
| 7 | `data/families/mfjs-meilong.yml` `/positioning` | **mofang-jiaoshi** (assignment table said mfjs-products — corrected) | reported | positioning judgement | banner present, no override; positioning isn't a tier-4-permitted claim type at all | **downgrade → uncertain** |
| 8 | `data/families/mfjs-mf3.yml` `/introduced` | mfjs-products | reported | chronology (month+circa) | banner present, no override | **downgrade → uncertain** |
| 9 | `data/families/mfjs-mf3.yml` `/positioning` | mfjs-products | reported | positioning judgement | banner present, no override; positioning not tier-4-permitted | **downgrade → uncertain** |
| 10 | `data/families/mfjs-mf3.yml` `/successor_family_id` | mfjs-products | reported | **cross-manufacturer lineage claim** (mfjs → moyu) | banner present, no override; claim type doesn't fit any permitted bucket | **remain held for human decision** (see below) |
| 11 | `data/families/mfjs-mf3.yml` `/aliases` | mfjs-products | reported | naming | banner present, no override | **downgrade → uncertain** |
| 12 | `data/families/mfjs-mini-3x3.yml` `/aliases` | mfjs-products | reported | naming | banner present, no override | **downgrade → uncertain** |

### Note on #10 — the one I did not mechanically resolve

`mfjs-mf3.yml/successor_family_id` points at `moyu-rs3m`. I checked
`data/families/moyu-rs3m.yml`: `manufacturer_id: moyu`, while `mfjs-mf3.yml` is
`manufacturer_id: mfjs`. **This is a cross-manufacturer succession claim**, not the
same-manufacturer case the remediation policy's permitted claim type
(`family_succession_same_manufacturer`) actually describes. It also is not "existence and naming"
or "approximate chronology," the only two things a tier-4 wiki source is permitted to support at
all under this policy. Two things point the same direction:

1. The wiki source's own text (quoted in `mfjs-mf3.yml`'s notes) hedges this exact claim with "For
   more information, see MoYu" rather than stating a clean succession — the source itself treats
   the RS3M generations as jointly MoYu/MFJS-associated, not simply "MFJS's product succeeded by
   another MFJS product."
2. `mfjs-meilong.yml`'s own notes independently document the *same* MFJS/MoYu retailer-attribution
   drift for a sibling product line, meaning this is a documented, unresolved brand-boundary
   question in this corner of the archive, not an isolated one-off.

A brand-crossing lineage claim resting on a single disqualified tier-4 wiki source, on exactly the
point where the source's own wording is hedged, and where the archive's own other records already
flag the underlying MFJS/MoYu boundary as unsettled, is not a case I'm comfortable mechanically
downgrading to `uncertain` and moving on — `uncertain` is a confidence label, but the deeper
question of whether a cross-manufacturer `successor_family_id` claim should be held to something
closer to rule 17's tier 1–2 standard for `rebrand_of`/`modified_from` (both explicitly named as
"corporate ownership or sub-brand relationships" in the forbidden list) is a policy question, not
an evidence-tier one, and it is squarely a human call. **This is the single highest-propagation-risk
item of the 12**: it asserts a lineage between two families under two different manufacturers,
which is inherited by every later attempt to place a "successor of MFJS's MF3 line" claim, or to
decide whether RS3M variants belong under MFJS or MoYu histories.

**Interim, pending that decision:** treat as `uncertain`, not `reported`, consistent with every
other attestation on this disqualified source — but flag the field itself, not just its confidence,
for a human to decide whether it should be held to a stricter standard than a scalar
`successor_family_id` field currently enforces.

## A second path not taken on #1 (`mfjs.yml/native_name`)

The attestation's own note says the native form "appears in MoYu's own site title
(`moyucube-official-home-2022`) as '魔方教室', matching the wiki's stated native name" — but that
tier 1 source is **not** actually listed in the attestation's `sources:` array, only discussed in
prose. If that tier 1 source genuinely states the native name (even informally, in a page title
rather than a labelled field, as the note itself says), formally citing it could support `probable`
or better without touching the disqualified wiki source at all — a stronger fix than my downgrade
recommendation. I did not re-verify `moyucube-official-home-2022` myself (out of scope — GAN/MoYu
first-party sourcing is not part of this brief, and I should not treat my own reading of a prose
note as sufficient to add a citation), so I'm recording this as a lead for whoever next edits
`mfjs.yml`, not overriding my recommendation with it.

## QC / schema checks

- No pointer among the 12 is in the DATA_MODEL §7.2 rule 6 critical-field list (manufacturer kind,
  edition identity, release date, MSRP, magnet configuration, core system, maglev, adjustment
  system, coating, size, weight, production status, limited-edition status, run size, rarity
  level, WCA legality status) — matches the matrix's own count (`critical_fields_among_the_111: 0`).
- All three sources record `preservation_method: archive_url` — preservation itself is not the
  problem here, evidentiary weight is.
- `npm run validate` passes clean on the current tree (no `data/` edits made by this agent, so
  this is confirming the baseline is unaffected, not that anything was fixed).

## Verdict per record

- `data/manufacturers/mfjs.yml` — **hold**. `/native_name` should downgrade to `uncertain` (or be
  re-sourced against the tier 1 MoYu page per the lead above); not ready to move status forward
  until that's resolved.
- `data/families/mf8-crazy-3x3x3.yml` — **hold**. Both attestations here downgrade to `uncertain`;
  additionally out of scope for me is Agent B's Rule-15 `scope_class` question, which independently
  blocks this record.
- `data/families/mf8-legend.yml` — **hold**. Both attestations downgrade to `uncertain`.
- `data/families/mfjs-meilong.yml` — **hold**. Both attestations downgrade to `uncertain`; the
  `/positioning` sourcing itself needs correcting to point at the actually-cited source (already
  correct in the file, just mis-stated in the assignment brief — no action needed there).
- `data/families/mfjs-mf3.yml` — **hold**, and flagged: `/successor_family_id` needs a human
  decision on evidentiary standard for cross-manufacturer lineage claims before this record can be
  considered settled, independent of the mechanical confidence downgrade on its other three
  attestations.
- `data/families/mfjs-mini-3x3.yml` — **hold**. `/aliases` downgrades to `uncertain`.

No record here is ready to **promote**. None of the underlying facts are wrong as far as I can
tell — MF8's Crazy/Legend lines, MFJS's MF3 succession, and the Meilong line are all plausible and
uncontradicted — the issue throughout is that a single disqualified tier-4 wiki source cannot carry
`reported` confidence under the remediation policy, and one attestation (`successor_family_id`)
raises a question the policy doesn't cleanly answer.

```yaml
# machine-readable adjudication
- record: data/manufacturers/mfjs.yml
  pointer: /native_name
  current_confidence: probable
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: existence_and_naming
  confidence: high
- record: data/families/mf8-crazy-3x3x3.yml
  pointer: /introduced
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: approximate_chronology_year_circa
  confidence: medium-high
- record: data/families/mf8-crazy-3x3x3.yml
  pointer: /description
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: existence_and_naming
  confidence: medium-high
- record: data/families/mf8-legend.yml
  pointer: /introduced
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: approximate_chronology_year_circa
  confidence: medium-high
- record: data/families/mf8-legend.yml
  pointer: /description
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: existence_and_naming
  confidence: medium-high
- record: data/families/mfjs-meilong.yml
  pointer: /introduced
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: approximate_chronology_month_circa
  confidence: high
- record: data/families/mfjs-meilong.yml
  pointer: /positioning
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: positioning_judgement
  confidence: high
  note: "verified actual source is speedsolving-wiki-mofang-jiaoshi, not speedsolving-wiki-mfjs-products as stated in the assignment table"
- record: data/families/mfjs-mf3.yml
  pointer: /introduced
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: approximate_chronology_month_circa
  confidence: high
- record: data/families/mfjs-mf3.yml
  pointer: /positioning
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: positioning_judgement
  confidence: high
- record: data/families/mfjs-mf3.yml
  pointer: /successor_family_id
  current_confidence: reported
  recommended_action: remain_held_for_human_decision
  recommended_confidence: uncertain (interim only; field itself flagged)
  claim_type: cross_manufacturer_family_succession
  confidence: high
  note: "target moyu-rs3m has manufacturer_id: moyu, source has manufacturer_id: mfjs -- not family_succession_same_manufacturer as the policy's permitted list defines it; source itself hedges with 'For more information, see MoYu'; sibling record mfjs-meilong.yml independently documents the same unresolved MFJS/MoYu attribution boundary"
- record: data/families/mfjs-mf3.yml
  pointer: /aliases
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: existence_and_naming
  confidence: high
- record: data/families/mfjs-mini-3x3.yml
  pointer: /aliases
  current_confidence: reported
  recommended_action: downgrade
  recommended_confidence: uncertain
  claim_type: existence_and_naming
  confidence: high

sources:
  - source_id: speedsolving-wiki-mfjs-products
    recommended_tier: 4
    decision: downgrade
    duplicate_of: speedsolving-wiki-mofang-jiaoshi
    evidence: >-
      Live WebFetch 2026-09-03 and both archived npm-run-wayback captures (20250818091604,
      20260405010335) all show the banner "This page may be currently outdated (since new
      cubes/products may be released)..." and category "Perhaps Outdated pages". Existing
      reliability_note omits this. No footnote/citation markers anywhere on the page.
  - source_id: speedsolving-wiki-mofang-jiaoshi
    recommended_tier: 4
    decision: downgrade
    duplicate_of: speedsolving-wiki-mfjs-products
    evidence: >-
      Same page as speedsolving-wiki-mfjs-products (path-style URL live-redirects to this
      query-string URL; both wayback captures, 8 months apart, are byte-identical in body
      content). Same banner, same gap in reliability_note.
  - source_id: speedsolving-wiki-mf8-products
    recommended_tier: 4
    decision: downgrade
    evidence: >-
      Live WebFetch and archived capture (20260302112516) both confirmed: edit-protected,
      revision-tracked, no staleness banner, but the entire page is a one-sentence description
      plus a bare bulleted product list with no citation apparatus tied to any claim ("[1]" is
      an infobox website hyperlink, not a footnote). Fails the substantial/long-form prong that
      the six already-verified override sources all satisfied.

duplicate_source_recommendation: >-
  Merge speedsolving-wiki-mfjs-products and speedsolving-wiki-mofang-jiaoshi into one source
  record; the two archived captures, taken 8 months apart, are byte-for-byte identical, so no
  evidence is lost by merging and nothing is gained by keeping them as two records with a
  cross-reference note. Re-point the two attestations currently on
  speedsolving-wiki-mofang-jiaoshi (mfjs.yml/native_name, mfjs-meilong.yml/positioning) at the
  merged id.
```
