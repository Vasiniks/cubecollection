# Provenance Adversarial Review — Lane D (second attempt)

## SCOPE
Hostile, independent, read-only review of the EVIDENCE layer (sources, attestations,
preservation excerpts, tier claims, source identity/independence). Question: what could
be factually WRONG while `npm run check` passes clean? No repairs — findings only, precise
enough for the main session to fix without redoing this work.

## BASE COMMIT
4873931 (main) — "qc: recover lane C — the escalation checker had no test coverage at all"

## TARGETS
- SOURCE IDENTITY: duplicate source records, one page captured under two ids, one capture
  under two URLs, Wayback CDX query URLs used as pinned captures, archive_url timestamp
  not matching its own path.
- EVIDENCE PRESERVATION (highest value): excerpt too narrow for the claims it backs
  (speedsolving-wiki-moyu class of defect), attestation notes quoting text absent from the
  excerpt, sources cited for claims their excerpt never covers. Grouped multi-capture
  records (archive_url = first capture only, preservation_note names later ones) must be
  read correctly before flagging.
- EVIDENCE STRENGTH: confidence exceeding cited tier, tier 4/5 carrying load-bearing
  claims, false independence between retailers with copied prose (Cubelelo/TheCubicle
  AoLong V2 LE known case — need to check for OTHER instances).

## STATUS
COMPLETE for this pass. 3 CONFIRMED defects (2 distinct root causes), 4 classes swept clean
(2 by validated probe, 2 by targeted manual audit), 2 probes formally discarded with measured
false-positive rates. See SUMMARY below for the ranked list; see UNRESOLVED for what a
follow-on pass should pick up.

## SUMMARY (ranked by severity)

1. **CONFIRMED-1 (HIGH)** — `data/families/moyu-weilong.yml` `/introduced`: attestation note
   asserts a "customers also bought: WeiLong V2" detail on a specific 2015-10-04 capture that
   is (a) absent from the cited source's entire preserved text and (b) not even pinned by that
   source's `archive_url`. Second real instance of the repaired speedsolving-wiki-moyu failure
   class (claim + pointer held without evidence), found by direct full-text reading, confirmed
   by two greps of the whole repository.
2. **CONFIRMED-2 (HIGH/tooling, MODERATE/factual)** — `data/models/fanxin/fanxin-3x3-standard.yml`
   `/description` cites two source ids that are, by the archive's own repair-history comment, one
   observation of one page. Invisible to rule 42 because the disambiguating fact lives in a `#`
   comment no schema field or check parses, and because the record's `archive_url` was
   deliberately repointed elsewhere during an unrelated 2026-09-09 repair.
3. **CONFIRMED-2b (same root cause, HIGH as a process finding)** —
   `data/models/fanxin/fanxin-hudong-3x3.yml` `/description` has the identical double-citation.
   Notable because the archive's own comment already names this exact pointer as the reason the
   2026-09-09 repair happened, but the citation itself was never corrected — the locator was
   fixed, the symptom the fix was written to justify was not.

No CRITICAL-severity defect was found in this pass (nothing that overturns an admitted product,
a taxonomy boundary, or a `confirmed`-confidence claim).

## CLASSES SWEPT CLEAN THIS PASS

- **archive_url vs. declared `url` disagreement** (a pinned capture claiming to be a different
  page than the source says it is): 0/516 real mismatches, using the archive's own
  canonicalizer. (This reproduces a check the main session already tried and discarded at ~90%
  FP — see P2 below; recorded as independently reconfirmed, not as new.)
- **Wayback CDX query URLs used as a pinned `archive_url`**: 0 found archive-wide (the one CDX
  URL in the archive, `cubelelo-moyu-products-prefix-2026`, correctly uses
  `preservation_method: excerpt`, not `archive_url`).
- **False independence from cross-retailer copied prose** (the Cubelelo/TheCubicle AoLong V2 LE
  class): built a shingle-overlap probe, sanity-checked against that known positive (55%
  overlap, correctly flagged) and a second known case surfaced independently
  (`cubelelo-yancheng-yan3-2017` / `thecubicle-yancheng-yan3-2020`, 77% overlap) — both of which
  the archive had **already** disclosed and correctly quarantined in their own
  `reliability_note`/attestation `note` fields. Swept all 264 cross-publisher tier<=3 source
  pairs ever cited together by the same attestation, down to a 12% overlap floor: no
  undisclosed instance found.
- **Literal duplicate `id:` values across `data/sources/*.yml`**: 0 (grep-verified; also
  structurally guarded elsewhere, though `scripts/check-duplicates.mjs` itself fingerprints
  only variants, not sources — see UNRESOLVED).
- **Grouped multi-page/multi-capture source records** (the `thecubicle-us-moyu-early-3x3-lines`
  shape: one record naming several distinct pages, only the first pinned by `archive_url`):
  identified 6 such records archive-wide
  (`rubiks-com-classic-special-editions-2024`, `thecubicle-us-moyu-early-3x3-lines`,
  `thecubicle-dayan-zhanchi-descriptions`, `thecubicle-dayan-guhong-descriptions`,
  `thecubicle-fanxin-3x3-products`, `thecubicle-dayan-tengyun-descriptions`) and checked each
  for a dedicated single-page source record colliding with one of its named bullets. Only
  `thecubicle-fanxin-3x3-products` collides (twice — CONFIRMED-2/2b); the other five each cover
  pages with no separate dedicated record, so no collision is possible for them today. This
  does not mean they are permanently safe — a later pass adding a dedicated record for one of
  their named pages would need to re-check for the same residual-citation pattern, since
  nothing currently guards against it prospectively.

## FINDINGS

### CONFIRMED-1 (HIGH) — attestation note asserts page content absent from the cited excerpt,
### and the specific capture it names isn't even pinned

**Record / pointer:** `data/families/moyu-weilong.yml`, `/attestations/~1introduced` (JSON
Pointer `/introduced`).

**What is claimed:** confidence `probable`, sourced to
`[thecubicle-us-moyu-early-3x3-lines, speedsolving-wiki-moyu]`. The attestation note reads:
"TheCubicle's AoLong-era captures place the WeiLong V2 as already sold by 2015 (seen as a
'customers also bought' item on the 2015-10-04 TangLong sticker-page capture within
thecubicle-us-moyu-early-3x3-lines)..." — i.e. part of the evidentiary basis for dating MoYu's
flagship WeiLong family to `circa 2014` is a claimed cross-sell ("customers also bought")
widget naming "WeiLong V2" on a specific 2015-10-04 Wayback capture of TheCubicle's TangLong
sticker page.

**What the cited source actually preserves:** `data/sources/thecubicle-us-moyu-early-3x3-lines.yml`
is a grouped multi-page record (the class flagged in this lane's brief — one source record
naming SIX different thecubicle.us product pages, each at its own capture date; the record's
own `archive_url` field pins only the FIRST of the six, the 2013-06-22 HuanYing page). Its
excerpt's entire TangLong bullet reads, verbatim and in full:

> "3x3 Red 56mm - TangLong" sticker page (http://thecubicle.us/56mm-tanglong-p-5127.html,
> captured 2015-10-04), confirming a "TangLong"-named 56mm MoYu 3x3 sold at this retailer by
> October 2015.

That is the entire bullet. Neither the string "WeiLong" nor "customers" (nor any cross-sell /
"also bought" language) appears anywhere in this source record — checked by reading the excerpt
and preservation_note in full, then confirmed by `grep -in "weilong|customers"` against the
source file (zero matches), then `grep -rn` against the whole `data/` and `research/` trees for
the phrase "customers also bought" and for the specific product-page slug
`tanglong-p-5127` (the only two hits are the source's own TangLong bullet and this one
attestation note — nothing else in the archive preserves this claim anywhere).

**Why it is wrong:** the attestation note cites specific page content (a cross-sell widget
naming a completely different product, "WeiLong V2") that this source record's own preserved
excerpt does not contain. This is the same failure class as the repaired
`speedsolving-wiki-moyu` defect (a claim and a pointer held without the evidence to back it),
made worse in two ways: (1) the capture the claim depends on (TangLong page, 2015-10-04) is not
even pinned by this record's `archive_url` field — only the HuanYing capture (2013-06-22) is
schema-pinned, so there is no archive_url on this record a reader could even try for the
TangLong page; and (2) this source's `link_status` is already `dead` (thecubicle.us is
defunct), so the specific observation is permanently unverifiable from anything this archive
holds. If the researcher really did see a "customers also bought: WeiLong V2" widget on that
2015-10-04 capture, it was never transcribed — the archive holds the claim, not the evidence.

**How verified:** direct text comparison — read the full attestation note in
`data/families/moyu-weilong.yml` and the full excerpt/preservation_note of
`data/sources/thecubicle-us-moyu-early-3x3-lines.yml` (both quoted above in full, not
excerpted for this report), then two greps confirming no other record in the archive holds this
text. No probe/tool needed; this is a plain absence-of-string check on two files I read in
their entirety.

**Confidence:** CONFIRMED. This is not a token-matching approximation — the specific words
"WeiLong" and "customers" are demonstrably absent from the one record that is supposed to be
their evidentiary basis.

**Severity:** HIGH. It backs the `/introduced` date of MoYu's flagship, most historically
significant family in the archive (per the family record's own description). Not CRITICAL only
because: the attestation is `probable` (not `confirmed`), and the note's own `circa 2014`
conclusion leans at least as much on the second cited source (`speedsolving-wiki-moyu`'s "WeiLong
created after HuanYing" narrative) as on this specific unpreserved detail — so the date itself
may well still be right, but this citation currently contributes nothing checkable to it.

**Suggested repair (NOT performed — read-only lane):** either re-fetch the 2015-10-04 TangLong
capture and transcribe the cross-sell text into the source's excerpt (if it still resolves via
Wayback despite `link_status: dead`), or strike the "customers also bought" clause from the
attestation note and let the date rest on the wiki narrative alone with an adjusted confidence.

---

### CONFIRMED-2 (HIGH) — SOURCE IDENTITY: one page cited under two ids, invisible to rule 42
### because the disambiguating fact lives in a `#` comment, not in any field a check can read

**Record / pointer:** `data/models/fanxin/fanxin-3x3-standard.yml`, `/attestations/~1description`
(JSON Pointer `/description`).

**What is claimed:** `confidence: reported`, `sources: [thecubicle-fanxin-3x3,
thecubicle-fanxin-3x3-products]` — i.e. two retailer source records, presented as two
citations, for the model's description sentence.

**What the cited sources actually are:** `data/sources/thecubicle-fanxin-3x3-products.yml`
carries an unusually long `#`-comment header (not the `excerpt`, `preservation_note`, or any
other schema field — a plain source-code comment above the YAML document) that narrates its own
2026-09-09 repair history verbatim:

> "This record covers three FanXin product pages; its archive_url named only the HuDong Light
> one, and once pinned that turned out to be the very capture thecubicle-fanxin-hudong-2024
> already holds — one capture under two ids... Repointed to the 2020-09-27 capture of
> `fanxin-3x3`, the record's ONLY genuinely unique evidence: of the three pages this record
> covers, **`fanxin-3x3` is already thecubicle-fanxin-3x3's record** ... so pointing at either
> would only have moved the collision."

In other words: the archive's own repair history states outright, in its own words, that the
"fanxin-3x3" bullet inside `thecubicle-fanxin-3x3-products`'s excerpt and the entirety of
`thecubicle-fanxin-3x3` are **the same page, the same observation**. Both records' excerpts
quote the identical sentence verbatim: "The FanXin 3x3 draws inspiration from other 3x3 cube
mechanisms, yet it strikes a good balance between affordability and performance." — confirmed
by direct comparison of the two `excerpt` fields.

**Why it is wrong:** `fanxin-3x3-standard.yml`'s `/description` attestation cites both ids
together as if they were two retailer observations. They are one. This is precisely the class
rule 42 exists to catch ("shares its locator AND its capture... citing more than one of them is
not corroboration") — and rule 42 misses it, because rule 42 reasons entirely from the
`archive_url`/`url` fields (`canonicalPage()`), and as part of the very 2026-09-09 repair
described above, `thecubicle-fanxin-3x3-products`'s `archive_url` was deliberately **repointed
away** from the fanxin-3x3 URL to the fanxin-magnetic-3x3 capture specifically to stop it
colliding on `canonicalPage` with `thecubicle-fanxin-hudong-2024`. That repair fixed the
locator-level collision it was aimed at (hudong) but left the record's *excerpt* still carrying
the fanxin-3x3 page's content as descriptive context — and nothing rechecked whether any
downstream attestation was still citing that residual content as if it were independent of
`thecubicle-fanxin-3x3` itself. This is exactly the "grouped multi-capture record" complication
named in this lane's brief: a check reasoning from `archive_url` alone is wrong on a record
whose excerpt holds more pages than its one pinned locator. The disambiguating fact — that
these two ids are one observation — exists ONLY in a `#` comment above the YAML document, which
no schema field, no lint rule, and no audit sweep ever parses. It is invisible to every
automated check in this repository by construction, not by an oversight in one rule.

**How verified:**
1. `grep -n "sources:.*thecubicle-fanxin-3x3\b" data/models/fanxin/fanxin-3x3-standard.yml`
   found the co-citation.
2. Read `data/sources/thecubicle-fanxin-3x3-products.yml` in full, including its `#`-comment
   header, which explicitly states "`fanxin-3x3` is already thecubicle-fanxin-3x3's record".
3. Read `data/sources/thecubicle-fanxin-3x3.yml` in full and confirmed its `excerpt` is the
   verbatim sentence quoted inside `-products`'s first bullet.
4. Confirmed rule 42 does not fire on this pair: `thecubicle-fanxin-3x3`'s `archive_url` embeds
   `thecubicle.com/products/fanxin-3x3`; `thecubicle-fanxin-3x3-products`'s `archive_url` now
   embeds `thecubicle.com/products/fanxin-magnetic-3x3` — different `canonicalPage()`, so rule
   42's grouping never puts them in the same bucket. `npm run lint` output (already captured
   this session) confirms no rule-42 warning exists for this pair.
5. Cross-checked all seven records citing either id (`fanxin-3x3-standard.yml`,
   `fanxin-hudong-3x3.yml`, `fanxin-magnetic-3x3-standard.yml` + variant,
   `fanxin-3x3.yml`/`fanxin-hudong.yml`/`fanxin-magnetic-3x3.yml` families) — this is the ONLY
   pointer that cites both ids together; the rest correctly cite only one or the other (the
   families and the hudong/magnetic models were NOT affected — only this one model record's
   `/description` double-cites).

**Confidence:** CONFIRMED — the archive's own repair-history comment states the two ids are one
observation, in its own words, and the excerpts corroborate it verbatim.

**Severity:** HIGH as a methodology/tooling finding (it demonstrates a permanent, structural
blind spot: a `canonicalPage`-based rule cannot see a duplication carried only in a grouped
record's prose, even right after that exact record was hand-repaired for a related collision).
MODERATE as a factual-harm finding on this specific record, since the confidence is only
`reported` (not `confirmed`, so rule 9's independent-corroboration gate never engages) and the
underlying claim (a generic, unremarkable marketing sentence) is not otherwise consequential —
but the pattern is exactly the mechanism by which a more consequential claim could look
doubly-sourced elsewhere in this archive without any check able to notice.

**Suggested repair (NOT performed — read-only lane):** drop `thecubicle-fanxin-3x3-products`
from `fanxin-3x3-standard.yml`'s `/description` `sources` list (keep `thecubicle-fanxin-3x3`
alone), or add a note explaining the two ids are historically one observation if both are kept
for traceability. More generally: any grouped multi-capture/multi-page source record whose
`archive_url` was repointed during a rule-42 repair should have its OWN citers re-audited for
residual double-citation of the page the pointer moved away from — the fix above only prevented
new collisions; it did not check for citations that predated it.

**A SECOND, ALREADY-SELF-DIAGNOSED INSTANCE OF THE SAME PATTERN, STILL UNFIXED:**
`data/models/fanxin/fanxin-hudong-3x3.yml`'s `/description` attestation (around line 42) reads
`sources: [thecubicle-fanxin-hudong-2024, thecubicle-fanxin-3x3-products]` — the identical
shape, one page (the "fanxin-hudong-light-3x3-standard" page, captured 2024-10-09) cited under
both its own id (`thecubicle-fanxin-hudong-2024`) and again via the bullet inside
`thecubicle-fanxin-3x3-products`'s excerpt.

What makes this instance notable: `thecubicle-fanxin-3x3-products.yml`'s own repair-history
comment names this EXACT model/pointer as the motivating discovery — "one capture under two
ids, **which let fanxin-hudong-3x3's /description cite the same observation twice as if
corroborated**" — i.e. the main session already found and wrote down this precise defect on
2026-09-09. The archive_url locator collision that caused it was fixed (repointed to
fanxin-magnetic-3x3). **The downstream citation the comment itself describes as the actual harm
was never corrected** — `fanxin-hudong-3x3.yml` still cites both ids together today, exactly as
diagnosed. This is not a new discovery so much as an incompletely-closed one: the plumbing was
repaired, the symptom the plumbing fix was explicitly written down to justify was left in place.
Same suggested repair applies (drop `thecubicle-fanxin-3x3-products` from this pointer's
`sources`, or annotate the shared-observation relationship in a `note`).

## PROBES DISCARDED (methodology discipline — reported per instructions)

### P1 — sweep-10 without its n>=8 floor
Audit sweep #10 (`scripts/audit.mjs` ~L378) only reports a source once it has >=8 citations
AND a >=25% "subject-token miss" rate. I re-ran its exact logic with the n>=8 floor removed,
to see whether a moyu-shaped defect was hiding just under that floor.

Result: 11 sources flagged (n=2..7, miss 33-100%). Manually inspected ALL 11 (not just a
sample, since the set was small):
- 7 are `thecubicle-gan-*` / `gancube-*` / `speedsolving-wiki-gan` sources. Every one is a
  false positive from a single tokenization artifact: the archive spells the model `GAN356`
  (no space) in `name`/`id`, while TheCubicle's own prose and page titles write `GAN 356`
  (space). My tokenizer (copied verbatim from audit.mjs) splits `"gan356 i carry 2"` into
  `["gan356","carry"]` (single/double-char tokens dropped), and `"gan356"` as one token never
  matches a source blob that only ever contains `"gan"` and `"356"` as separate substrings.
  Confirmed by reading `data/sources/thecubicle-gan-356-i-carry-2.yml` and its four citing
  records (`data/models/gan/gan-356-i-carry-2.yml` + 3 variants): the excerpt verbatim
  contains "GAN 356 i Carry 2 offers over 2x the battery life of the previous versions" —
  the citation is sound, my tokenizer's join-vs-split-word convention is not.
- 1 (`wca-regulations-2026-04`, 100% miss, n=2) cites the WCA regulations for a legality
  claim on two Rubik's Classic Cube variants (`impossible`, `phantom`). The source's excerpt
  correctly never names "Rubik's Classic Cube" — it is the governing rulebook, not a product
  page — so a subject-name check is the wrong test for this citation shape entirely.
- 2 (`gancube-cn-patents-technologies`, `gancube-monster-go-magnetic-3x3-specifications`) are
  the same shape: patent/technology sources cited for a technical mechanism claim, not for
  naming a specific retail product.
- 1 (`cubelelo-moyu-products-prefix-2026`, 71% miss, n=7 — the closest to real) is a
  RESEARCH_SPEC 3.6a discovery-breadth CDX enumeration, cited by 7 early MoYu models
  (`moyu-tanglong-original` etc.) as ABSENCE evidence ("this model carries no configuration
  suffix in either market's sweep, so single-configuration is searched, not merely
  unexamined") — read `data/variants/moyu/moyu-tanglong-original/standard.yml`'s own
  attestation note. The source's excerpt need not, and does not, name each individual model;
  the CDX enumeration itself (in which the model's slug is one silent, suffix-free line) is
  the evidence. A token-presence check cannot represent "evidence of absence" citations at
  all.

**False-positive rate: 11/11 = 100%. DISCARDED.** The n>=8 floor in sweep #10 is not
arbitrary noise-suppression — removing it below that floor mainly surfaces citation SHAPES
(succession comparisons, regulatory/technical sources, absence-of-suffix searches) that a
subject-token check cannot represent, not narrow excerpts. No genuine sub-8-citation
moyu-shaped defect was found by this method.

### P2 — archive_url embedded target vs. declared `url` field
Checked whether any source's `archive_url` (`/web/<ts>/<target>`) embeds a target URL that
disagrees with the source's own `url` field — which would mean the pinned capture and the
claimed page are not the same page.

First pass (naive): stripped `:80`/`:443` only at the END of the whole normalized string,
which does nothing for `host:80/path` — 40 "mismatches", ALL of them `:80` explicit-port
artifacts already known to this archive (see `scripts/lib/archive.mjs` L295-299, and
`research/qc/post-pass4-qc.md` "Deliberately not turned into rules": this exact check was
tried before, found ~90% false positive, and folded into rule 42's canonicalizer instead of
becoming its own rule). That is a documented, already-discarded prior-session probe, not a
new one — I independently rediscovered it and record that rather than claim it as new.

Second pass (corrected): split host from path before stripping the default port, exactly as
`scripts/lib/archive.mjs`'s `canonicalPage` does. Result: **0/516 mismatches.** Confirms this
specific class (archive_url pointing at a different page than the source's own url field) is
clean archive-wide, using the archive's own established canonicalization method.

### P3 — attestation-note quotes cross-checked against their cited source's preserved text
### (this is HOW CONFIRMED-1 above was found — reporting its false-positive rate honestly)

Extracted every quoted span (`"..."` always; `'...'` only when NOT a possessive/contraction —
the extractor explicitly guards against the archive's own documented history of 925/1052 false
positives from splitting on bare apostrophes) from every attestation `note` archive-wide, and
checked whether that text appears (allowing ellipsis-joined segments to be checked
independently, and allowing progressive trailing-word truncation to absorb researchers
re-punctuating a truncated quote) in the excerpt/preservation_note/reliability_note/title of
that attestation's OWN cited sources.

675 quotes checked. Even after three rounds of tightening, **171 still flag, and manual
inspection of ~55 of them found exactly ONE genuine defect (CONFIRMED-1, already reported) and
~54 false positives**, from four recurring shapes:
1. Evidence-tier meta-commentary stylistically wrapped in quotes ("one Tier 2 source,
   uncontradicted") — not a source quote at all.
2. Genuine paraphrase of a real (and correctly cited) source fact in different words than the
   source's own excerpt/translation uses — e.g. `gan-356-xs/standard.yml`'s
   `/config/adjustment_system` note paraphrases the (already-repaired, verified-present)
   GAN core-technology-history translation rather than quoting it verbatim.
3. Bracket-templated pattern notation presented with quote marks —
   `dayan-bermuda-triangle/*.yml`'s `/aliases/0/name` notes all read `"Bermuda Triangle
   [Planet]"`/`"Bermuda Cube [Planet]"` as a stated NAMING PATTERN across all eight planet
   variants, not a literal per-page quote; checked against
   `thecubicle-dayan-bermuda-cube-2020.yml`, confirmed intentional shorthand, not fabrication.
4. Self-referential quotes of the archive's OWN process rules or the source's own title/id
   embedded in the note prose (e.g. `x-man-xt3-v1.yml`: "...this pass's 'never overwrite a
   source created in another session' constraint" — a methodology rule, not page text).

**Measured false-positive rate on the manually-reviewed sample: ~54/55 = ~98%.** DISCARDED as
a blocking or even reliably-ranked check — it is not precise enough to trust its remaining
~116 un-reviewed flags without the same per-item manual verification that found CONFIRMED-1,
which this lane's remaining time did not allow for all of them. Recorded per instructions
rather than silently dropped: this probe has real sensitivity (it is what surfaced the one
confirmed defect) but very poor specificity, and a future pass should not re-run it naively
expecting a trustworthy hit list — each flag still needs the same by-hand read.

## EVIDENCE
Probe scripts (not committed; written to the isolated scratchpad per instructions):
`probe10.mjs` (P1, discarded), `probe_brand.mjs` (exploratory, folded into P1 discussion),
`probe_archiveurl.mjs` (P2, reconfirmed already-discarded main-session check),
`probe_quote.mjs` (P3, discarded but produced CONFIRMED-1),
`probe_independence.mjs`/`probe_independence2.mjs` (P4, validated against known positive,
swept clean), `probe_dupcontent.mjs` (produced CONFIRMED-2/2b). All under
`/private/tmp/claude-502/-Users-admin-Documents-GitHub-cubecollection/b190dba9-2656-4115-9d59-35852b4bdaf7/scratchpad/`.

## CHANGES
None. This lane is read-only over data/, scripts/, schema/, vocab/, tests/. Only this
report file is modified.

## UNRESOLVED

- **`scripts/check-duplicates.mjs` fingerprints only variants (rules 28-30), never sources.**
  There is no archive-wide, general-purpose check for "two source records that are actually the
  same observation of the same page under different ids" other than rule 42's
  `archive_url`/`url`-based grouping, which by construction cannot see a duplication carried
  only in a grouped record's prose (exactly how CONFIRMED-2/2b survive today). A content-based
  check (e.g. the shingle-overlap probe built for this lane, `probe_dupcontent.mjs`) is a
  plausible candidate for a future audit sweep, but it needs a materially higher similarity
  threshold and/or a same-model-family scope restriction before it could run unattended — at
  the 50% floor used here it still returned 43 pairs archive-wide, of which manual review found
  most (all same-publisher, different-product pairs like `thecubicle-yj-mgc-evo-ii-3x3-product`
  vs. its "Enhanced Core Positioning Edition" sibling) to be legitimate templated-but-distinct
  retailer listings, not duplicates. I reviewed the highest-overlap ~15 of 43 by hand; the
  remaining ~28 (mostly 50-65% same-publisher pairs) were not individually checked and could
  hide another instance of the same pattern.
- **P3's remaining ~116 unreviewed flags** (of 171 total, after manual review of ~55 found only
  CONFIRMED-1 among them) were not individually checked. Given the ~98% false-positive rate on
  the reviewed sample, I judge further manual review of the same list to be low-yield relative
  to its cost, but I have not proven the remainder is clean — only that finding a second
  genuine defect there would likely take reviewing most of them by hand.
- **Tier 4/5 sources carrying a load-bearing claim outside the `attestations` block.** Rule 12
  makes tier 5 a hard error wherever cited inside an attestation, and rule 43 already prevents
  tier 4 from supporting anything above `uncertain` confidence *when the claim goes through an
  attestation*. I did not find time this pass to check whether any schema field's value is
  effectively asserted (e.g. in a record's free-text `description`) on the strength of a tier
  4/5 source mentioned only in prose, with no corresponding `attestations` entry for a rule to
  inspect at all. This is a plausible blind spot I was not able to rule out or confirm.

## NEXT
1. Fix CONFIRMED-1 (moyu-weilong `/introduced`), CONFIRMED-2 and CONFIRMED-2b (both fanxin
   `/description` double-citations) per the suggested repairs inline above.
2. Decide whether `probe_dupcontent.mjs`'s shingle-overlap method (validated against two known
   positives, tunable threshold) is worth hardening into an audit sweep, given it is the only
   method in this pass that surfaced a genuinely new, previously-unflagged defect (CONFIRMED-2)
   from a mechanical run rather than a targeted manual read.
3. If a future lane continues this hunt: finish the P3 quote-vs-excerpt review (~116 flags
   remaining) and the dupcontent same-publisher tail (~28 pairs remaining) before assuming
   either is clean — both are "reviewed some, not all" rather than "swept clean."
