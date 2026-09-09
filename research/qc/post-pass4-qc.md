# Post-Pass-4 QC — provenance and structural integrity

**Started:** 2026-09-09, from `16d0a2f` (Pass 4 complete, 269/269 models assessed).
**Scope:** not enumeration. The taxonomy is frozen at 132 families / 269 models and nothing
here creates, renames, merges, splits or re-parents any of them. This phase asks a different
question:

> What could be wrong while `npm run check` still reports zero errors?

## Baseline verified before any change

`16d0a2f`, clean tree, 0 ahead / 0 behind, one worktree. 54 manufacturers · 132 families ·
269 models · 485 variants · 534 sources. `npm run check`: 0 errors, 40 advisory. Every count
was re-derived from the repository rather than read from a progress document — which is how the
ledger's own stale meta block (variants 313, sources 470, phase "Pass 4 awaiting authorisation")
was found and corrected.

## What this phase found

Every item below was invisible to validation before it was looked for. None of them was a
schema violation; all of them were provenance defects.

### 1. Rule 42 could not see a page captured twice — *fixed*

It grouped source records on the raw `archive_url`, which embeds the Wayback capture timestamp.
Two records of the *same page* never grouped if captured on different dates, and a record
holding only `url` never matched one holding `archive_url` for that page. It also missed
same-capture duplicates differing only by Wayback's `id_` replay flag.

Canonicalising page and capture separately took it from 12 duplicated pages to 15 same-capture
duplicates, and from 1 double-citation to 8.

**But reporting all 8 alike would have been wrong**, and that is the more useful half of this
finding. Two captures of one page are not two records of one capture:
`giiker-com-supercube-i3s-product-2022` (on sale) and `-2026-soldout` (withdrawn) are *how a
discontinuation is evidenced at all*. Collapsing the distinction raises 5 false positives out of
8. The rule now separates double-counting from chronology, and the selftest asserts the
chronological pair is **not** accused of double-counting.

### 2. Locators that pointed at the wrong thing — *fixed*

**15 CDX prefix-sweep records** set `url` to one arbitrary member of the enumeration they
document, so a reader following the locator never reached the evidence and the record collided
with that member's own source record. The archive's own `/collections/` sweeps already did this
right by pointing at the catalogue page; a `/products/<prefix>*` sweep has no such page, so each
locator is now the CDX query that reproduces the enumeration.

**Two multi-page records** pointed at pages they never quote — one named a 2022 capture of a
page whose excerpt quotes three *other* pages captured in 2025.

### 3. Ten archive URLs were requests, not captures — *fixed*

Ten of 480 `archive_url` values carried a midnight-exact timestamp. Chance would put 0.0056 of
them there; `000000` was the most common time-of-day in the archive by a factor of three. Wayback
302s such a URL to whatever capture is nearest, so `preservation_method: archive_url` was
promising a pinned snapshot the record did not have.

**The damage was not only to preservation.** Rule 42 tells same-observation from
same-page-over-time by comparing capture ids, so a rounded timestamp *hides duplicate evidence
from the check built to find it*: `thecubicle-fanxin-3x3-products` (20241009000000) and
`thecubicle-fanxin-hudong-2024` (20241009113827) are one capture — confirmed by request, the
first 302s to the second — but rule 42 saw two strings. Pinning all ten flipped that pair to the
strong branch, where it belonged.

The tenth was worse: a trailing `*` made it a Wayback *calendar search*, preserving nothing.
Pinned, re-fetched, and diffed against its excerpt — which turned out to overstate the page in
three places.

### 4. Six source records were one page split by a lane that would not overwrite — *fixed*

Each of the six `gancube.com` pairs held one page at one capture under two ids, and each absorbed
record said why in its own comment: a later lane found the earlier lane's record present and, per
the shared-source rule, wrote a second record rather than overwriting it. Merged; both excerpts
preserved. **Three of the six absorbed ids were exactly the sources the audit had been reporting
as "referenced NOWHERE at all"** — two findings, one cause.

### 5. Thirteen spec values whose own sources never carried the number — *fixed*

`schema/source.schema.json` requires an excerpt to "carry the claim without the page". Rule 6
checks that a spec *has* an attestation; nothing checked that the attested source *contains the
value*.

**Every one of the 13 was correct** — re-fetching confirmed all thirteen figures to the decimal.
That is the point, not a reprieve: the values had been read off the page and never written down,
so the archive held the claim and a pointer but not the evidence. Wayback began refusing
connections partway through this very session, which is exactly the failure an excerpt exists to
survive.

The ES3 fetch repaid itself twice: the page's header row reads
`Version comparison | Standard | 8-Core Magnets | 20-Core Magnets`, matching three variant
records slug for slug. **That split is retailer-declared, not inferred**, and the record now
shows it.

The sweep also caught a silent over-conversion — a converted value is absent from its source by
construction. `mfjs-meilong-3c` recorded 62.4 g from a page stating "2.2oz": a tenth of a gram
claimed from two significant digits, where the honest interval is 60.9–63.8 g.

### 6. Two dates asserted the inverse of their own notes — *fixed*

`qj-candy-3x3` and `qj-pillowed-3x3` carried `discontinued: qualifier: after` while their notes
said "already discontinued by the capture date". `after` means "No earlier than". A capture
observing a completed state can only bound it `before`.

The same two records were also the *only* two of 33 artefact-naming date fields that **used**
`Added: 2018-09-11` rather than refusing it. Withdrawn, and replaced with a deliberately weaker
`before 2019-08` bound from the earliest surviving capture.

**The sweep's other 48 hits were not defects, and checking that mattered more than the fixes.**
43 use `qualifier: before`, the documented method for a circulation bound. Three of the
remaining five are argued on evidence beyond the capture — GAN V100's page carries the banner
"GAN v100 Maglev is Available Now!". Reporting those would have been the false positive.

### 7. P4-6 closed — the tier override that reached 9 of 30 sources

E1 ruled a Speedsolving wiki page tier 3 rather than tier 4 when revision-tracked, substantial
and not flagged stale. It reached 9 of 30. Each remaining page was assessed individually.

E1 read the staleness banner **by eye**. This pass used the page's own machine-readable
MediaWiki maintenance category (`Perhaps Outdated pages` in `wgCategories`) — and used it to
**check E1 rather than replace it**. Every previously overridden page that could be re-fetched is
unflagged; every page E1 downgraded is flagged. E1's judgements are independently confirmed on a
sharper discriminator than the one that produced them. The substance floor likewise came from
E1's own accepted set (390 words, `speedsolving-wiki-cyclone-boys`) rather than being invented.

Two raised to tier 3; **thirteen assessed and explicitly recorded as staying tier 4**, each with
its reason. Recording the negative outcome is the point: "assessed, stays tier 4" and "never
assessed" were previously indistinguishable.

**Nothing was strengthened.** Every attestation citing either raised source already carried a
tier 1–2 co-citation, so both corroborate rather than establish.

It also closed E1's three "held for human decision" pages — and found that two had their held
status recorded in the ledger but **never in their own source files**. Another instance of
P26-2's roll-up gap, found by reading the records instead of the ledger.

## 8. The largest finding: the frozen inventory is missing current flagships — *escalated, not acted on*

Attacking P4-8's single-retailer dependence led somewhere I did not expect. Checking whether a
non-US retailer carried X-Man products surfaced a **QiYi X-Man Tornado V5** — live, in stock, three
SKUs, its own version-comparison table — against an archive whose newest Tornado is V4.

A complete enumeration of TheCubicle's live 3x3 collection (578 products, via the storefront's own
`products.json`) then found **nine manufacturer-branded lines with no model in the frozen 269**,
including **MoYu WeiLong V11 — MoYu's current flagship, 14 SKUs** — against an archive whose newest
WeiLong is V9.

**It is not a recency horizon.** The listing dates place WRM V10 on sale from 2024-05-09 and
WeiLong V11 from 2025-06-06 — both more than a year before Pass 3's MoYu lane ran on 2026-09-03
and recorded a *"full WeiLong succession"* ending at V9. The products were on sale, at a retailer
this archive cites 115 times, while the enumeration was running.

**It is not caused by P4-8 either**, and saying so matters more than the tidier story. TheCubicle
stocks every missing line, so retailer *breadth* would not have helped. The indicated mechanism is
source-class **recency**: `moyu-weilong-v9`'s succession evidence is `speedsolving-wiki-moyu`,
whose stored excerpt mentions no year later than 2019. A wiki-led enumeration that never checked
the current catalogue produces exactly this gap.

**The control matters as much as the finding.** The same enumeration confirms MoYu RS3 M V5, QiYi
M Pro V2, YuXin Kylin V2, YuXin HuangLong V2 and YuXin Little Magic V3 are all present. The gap is
specific, not a wholesale coverage failure — and two entries on my first candidate list were
name-matcher false positives, removed after checking the files directly.

Attribution is read from the retailer's own structured `vendor` field, not parsed from titles.
That is what keeps *"Griesser's WeiLong V11"* and *"Tommy Cherry's WeiLong WRM V10"* out of the
count — they are TheCubicle's own custom setups, belonging to the `thecubicle` service
manufacturer.

**No model or family was created.** The taxonomy is frozen and this overturns it, so the evidence
is preserved (`thecubicle-3x3-collection-enumeration-2026-09`) and escalated as **P4-9
(critical, needs human decision)**. The ledger records why nine hand-added records would be the
wrong response — WeiLong V11's 14 SKUs are plainly variants of one model — and names the question
this raises about the other 268: the same wiki-led method was used across Pass 3, and this
enumeration covers *one* retailer's collection.

Pass 4's "269 of 269 models assessed" remains true exactly as stated. The inventory it assessed is
what is incomplete.

## Rules added, each from a real defect

| Rule | Catches | On real data |
|---|---|---|
| **47** | an `archive_url` that names a request, not a capture — midnight-exact, or a calendar wildcard | 0 |
| **48** | a spec value that appears in none of the sources its attestation cites | 0 |

Both were added *after* the defects they describe were fixed, so both report zero — and both
carry a fixture per branch. Rule 48's **allowance** is fixtured separately and asserted to stay
silent: without `zz-ok-derived-conversion`, the rule would be indistinguishable from a ban on
unit conversion.

The pass fixtures tripped rule 48 and deserved to — neither `zz-src-official` nor
`zz-src-retailer` had any excerpt at all. A pass fixture should model the discipline, not merely
avoid the checks.

Rules 47 and 48 are now in the selftest's expected-rules list. They were absent, so their firing
was never asserted archive-wide.

## Deliberately not turned into rules

- **Artefact-derived dates.** The distinction that decides it — does a record name the artefact
  to *use* it or to *refuse* it? — cannot be read from prose reliably, and a rule would
  false-positive on all 31 honest records. It is an **audit sweep** that prints the split every
  run instead.
- **`url` vs `archive_url` disagreement.** 42 hits, of which 38 are a benign explicit `:80` and
  the rest normalisation noise. ~90% false positives earns no rule. The port normalisation it
  *did* justify is now in rule 42's canonicaliser.

## Open, and deliberately left open

- **P4-7** (new) — is `2018-09-11` worthless as a date, or only as a *release* date? A migration
  stamp cannot date a release but may still evidence catalogue *presence*, which would be a
  tighter bound than any capture. `gan-354-m` retains it on exactly that reasoning, at
  `uncertain`, in open tension with the stated rule. **The ledger names the cheap test that
  would settle it** — find a product independently dated after 2018-09-11 and check its page for
  the stamp — and leaves the strict reading as default, since it can only lose information,
  never assert a wrong one.
- **P4-5** — 11 GAN-pilot lone baselines assert nothing (rule 41). Unchanged, and must stay so:
  writing "assessed, nothing found" without assessing would fabricate the exact claim rule 41
  exists to protect.
- **P4-2 / P4-4** — six model-layer gaps. Frozen-taxonomy boundary; escalated, not acted on.
- **P26-15** — Tank/Gem mould geometry rests on naming, not moulds.

## Not verified, and said so

Seven Speedsolving pages could not be re-fetched: Wayback began refusing connections partway
through the sweep. **A failed fetch is not evidence**, so they are recorded as unverified rather
than assumed — and every one of them is already decided, so nothing is blocked.

## State at last checkpoint

54 manufacturers · 132 families · 269 models · 485 variants · **528 sources** (534 − 6 merged
duplicates). `npm run check`: **0 errors, 40 advisory**. Selftest: every check behaved as
specified.
