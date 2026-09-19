# P4-9 — Lane D: three refused alias candidates, and a test for a fifth mechanism

Lane D. Base commit 460e9df on main. Worktree `agent-a40317071cc636e67`.

## SCOPE

Two tasks, per assignment:

1. Settle the three alias candidates `research/qc/p4-9-alias-blindness-2026-09-12.md` refused
   (`yuxin-little-magic-v2`, `yuxin-little-magic-v3`, `yj-yulong-v2-m`) — each an M-vs-non-M
   ambiguity, because YuXin and YJ both sold magnetic and non-magnetic lines and the missing "M"
   token might denote a genuinely different product rather than a word-order alias.
2. Run `npm run catalogue-gap -- --fetch`, pick the most credible current-generation candidates
   (X-Man Tornado V5, MoYu WeiLong V11, MoYu AoLong V5, QiYi M Pro V3 named as starting points),
   classify each by the four known P4-9 mechanisms (recency, discoverability, stock suppression,
   alias blindness), and answer whether any candidate needs a fifth mechanism.

Taxonomy is FROZEN at 54/132/269. This lane may add `aliases:` to existing model records where
Task 1 justifies it (not a taxonomy change, per the HaiTun ZhanLang / P4-15 precedent) and may
record new `data/sources/*.yml`. It touches no family, manufacturer, ledger, or script file.

## TASK 1 — three refused M-vs-non-M candidates, settled

Method: fetch each host's own vendor/brand facet (`/collections/<brand>/products.json?limit=250`)
live, filter to the family's own titles, and read EVERY 3x3 title returned — not a sample — so
the absence of a bare non-magnetic/non-MagLev title is itself the evidence, not an inference from
silence. Two new sources preserve the full filtered enumeration:
`data/sources/speedcubeshop-yj-yuxin-magnet-facet-p4-9-lane-d-2026.yml` and
`data/sources/thecubicle-yj-yuxin-magnet-facet-p4-9-lane-d-2026.yml`. Both collections are under
Shopify's 250-item page limit (63/45/105/99 total products respectively), so no pagination was
needed and no page was skipped.

**Control run before any verdict was trusted.** Both hosts' YuXin facets list the ORIGINAL
Little Magic generation's non-magnetic ("YuXin Little Magic 3x3") and magnetic ("... 3x3 M" /
"... 3x3 (Magnetic)") configurations as two SEPARATE real SKUs. That proves neither storefront
suppresses or renames a bare non-magnetic title where one genuinely exists — so when the SAME
storefronts show no bare, non-magnetic "V2" or non-MagLev "V3" title anywhere in the SAME
collection, that absence is evidence, not a blind spot in the method.

### `yj-yulong-v2-m`
**Verdict: ALIAS (not a distinct product).** SpeedCubeShop's entire "yj" brand facet (63
products) contains exactly 3 SKUs matching "YuLong" at the V2 generation, and all 3 are
explicitly `(Magnetic)`: `yj-yulong-3x3-v2-magnetic-2025-edition`,
`...-magnetic-uv-coated-2025-edition`, `...-magnetic-uv-coated-clicky-2025-edition`. No bare or
non-magnetic "V2" SKU exists. TheCubicle's own facet independently shows the SAME model at the
handle the archive already cites (`yj-yulong-v2-m`, title "YJ YuLong 3x3 V2 M") — its own naming
already matches the archive's "YJ YuLong V2 M" exactly (word order and all) once "3x3" is
dropped as the already-established non-discriminating token. The catalogue-gap candidate
"YJ YuLong 3x3 V2" (no M) traces entirely to the script's own line-splitting regex, which cuts a
title at its first bracket — stripping SpeedCubeShop's "(Magnetic)" — not to a second product.
Alias added: `"YJ YuLong 3x3 V2 (Magnetic)"`, on the reasoning that "(Magnetic)" is
SpeedCubeShop's spelled-out rendering of the "M" the model's own name already carries — no
attribute is added or removed by writing the word in full, unlike the WR M / WRM case (which
added a wholly new token absent from the base name).

### `yuxin-little-magic-v2`
**Verdict: ALIAS (not a distinct product).** Same evidence pattern. SpeedCubeShop's "yuxin"
facet (45 products) has exactly 2 V2-generation 3x3 SKUs, both `(Magnetic)`. TheCubicle's
"yuxin" facet (99 products) has exactly 2 V2-generation 3x3 SKUs, both carrying "M"
(`yuxin-little-magic-3x3-v2-m`, `...-v2-m-uv`) — the FIRST of which is the exact slug this
model's own description already cites via `thecubicle-yuxin-collection-2025`. No bare or
non-magnetic "V2" title exists at either host. Aliases added: `"YuXin Little Magic 3x3 V2 M"`
(TheCubicle's exact current title — a pure word-order swap of the archive's own "M V2", already
partly evidenced by the pre-existing bound source) and `"YuXin Little Magic 3x3 V2 (Magnetic)"`
(SpeedCubeShop's spelled-out form, same reasoning as the YJ case).

### `yuxin-little-magic-v3`
**Verdict: ALIAS (not a distinct product) — the cleanest of the three.** TheCubicle's "yuxin"
facet has exactly 2 V3-generation 3x3 SKUs, both explicitly `(MagLev)` /
`(MagLev + UV)`. No bare "V3" or non-MagLev title exists. The full, untruncated retailer title
"YuXin Little Magic 3x3 V3 (MagLev)" is an EXACT token-multiset match to the model's own name
"YuXin Little Magic V3 MagLev", modulo word order and the "3x3" token — this is a rule-(a) case
in the strictest sense, not a borrowed reasoning. The only reason it ever appeared as a
catalogue-gap miss is that the script's title-splitting regex drops everything from the first
bracket onward, discarding exactly the "(MagLev)" token that makes the match exact. Alias added:
`"YuXin Little Magic 3x3 V3 (MagLev)"`.

### What this does NOT fix
Adding these aliases does not make `npm run catalogue-gap` stop reporting these three lines.
The script's line-grouping key is built by truncating a title at its first bracket (or "M
- dash), and its generation-token guard (`GENERATION` regex + `a.endsWith(gen[1])`) requires a
KNOWN name to end in the exact version suffix the truncated candidate carries. A truncated
candidate ending in bare "v2" or "v3" will never satisfy that guard against a known name ending
in "v2m" or "v3maglev", no matter what alias is added, because the alias itself would also need
to end in the bare suffix to pass — which would mean asserting the model under a name that omits
its own defining magnetic/MagLev designator, exactly the imprecision the admission rule exists to
prevent. This is a script-level interaction between two independently-reasonable pieces of logic
(bracket-truncation + generation-suffix guard) documented here for whoever next touches
`scripts/catalogue-gap.mjs`, but out of this lane's file allow-list to fix. It does not change
the verdicts above: the underlying products are confirmed the same already-held models by direct
enumeration, independent of whether the script can be made to see that automatically.

## TASK 2 — testing for a fifth mechanism

`npm run catalogue-gap -- --fetch` run 2026-09-19 (network egress required sandbox override —
`www.thecubicle.com`, `speedcubeshop.com`, `www.cubelelo.com` are reachable directly, but this
worktree's default sandbox denied them regardless; `dangerouslyDisableSandbox: true` was used for
every live fetch in this task, consistent with the SANDBOX NOTE). Two runs were taken, one before
and one after the Task 1 commit landed (271 vs 259 unmatched lines, 54 vs 53 warnings — the small
difference is Cubelelo's facet succeeding on one run and failing on the other, not a regression:
aliases can only ever ADD matches, never remove one, and no previously-matched line newly
appeared as missing between the two runs).

**Control, run before any classification below was trusted.** Known negatives — "QiYi Warrior
W", "ShengShou Crazy" (both archive-held, established negatives from Lane B's own discipline
check) — appear ZERO times in the 259-line miss list. Known positive — "MoYu Super WeiLong V2"
(a genuine later generation of the archive's `moyu-weilong-super`, which Task 1's word-order
alias for that exact model does NOT swallow) — appears correctly as its own unmatched line,
confirming the generation-token guard still discriminates correctly in the general case; the
failure mode Task 1 found is specific to a version suffix followed by a further qualifier
("V2 M", "V3 (MagLev)"), not a general defect.

### The four named candidates, verified and classified

| candidate | SKUs | retailers | archive holds | mechanism |
|---|---|---|---|---|
| MoYu WeiLong V11 | 7 (+5 under a second, word-order-split line key) | TheCubicle; SpeedCubeShop under "MoYu WeiLong 3x3 V11" | up to V9 | **recency** |
| MoYu AoLong V5 | 8 | TheCubicle, SpeedCubeShop | up to V2 / GT | **recency** |
| X-Man Tornado V5 | 3 | TheCubicle | up to V4 | **recency** |
| QiYi M Pro V3 | 2 | TheCubicle only | up to V2 | **recency + stock suppression** |

Verification performed per candidate (product identity / manufacturer / alternate names / model-
vs-variant / generation / evidence), not asserted from the ledger alone:

- **MoYu WeiLong V11.** Manufacturer and identity already well-established in the ledger's P4-9
  entry (14 SKUs on 2026-09-09; this run independently re-confirms it live 10 days later, still
  unadmitted). Model-vs-variant: version-numbered generation per DATA_MODEL §4.2, same treatment
  already given moyu-weilong-v9. Alternate names: none needed beyond word order — see the
  reporting artefact below. Generation: archive's WeiLong line ends at V9; the renumbering
  question (V3-V8 never existed) is already settled by 3.6b and does not apply here — V11 is a
  genuine later generation, not an arithmetic illusion.
- **MoYu AoLong V5.** WebSearch corroboration beyond the retailer catalogues: multiple
  independent sellers (TheCubicle, SpeedCubeShop, Cubelelo, ZiiCube, Cuboss) and a hobbyist video
  titled "The AoLong is BACK!" describing it as a revival of a dormant line, redesigned with a
  carbon-fiber core — consistent with the archive's own AoLong line ending at GT (~2015) with no
  V3 or V4 ever found in the same search. This matters for the ADVERSARIAL REQUIREMENT: a jump
  from GT (ordinal 3) to "V5" looks exactly like the arithmetic-gap trap RESEARCH_SPEC 3.6b
  warns about (MoYu's WeiLong V3-V8 never existed), but here independent corroboration is that
  AoLong went dormant and was REVIVED under a new number, not that V3/V4 quietly exist unfound.
  Either reading is still **recency**, not a new mechanism.
- **X-Man Tornado V5.** Already `confirmed_missing` in `p4-9-adjudication.yml` and independently
  re-confirmed live in this run (3 SKUs, TheCubicle; Cubelelo's independent corroboration from
  the original P4-9 pass could not be re-checked today — its facet fetch failed on this run, a
  fetch failure, not evidence of absence). Version-numbered generation of a family the archive
  holds through V4. **Recency.**
- **QiYi M Pro V3.** Corroborated independently via WebSearch across SpeedCubeShop,
  speedcubing.org, and (for the V2 baseline) mastercubestore — consistent "Flagship"/"Pioneer"
  tiering matching the naming convention the archive's own `qiyi-m-pro-v2.yml` already documents
  for that model, supporting model-level (not variant-level) treatment under the same precedent.
  **This run reproduces Lane B's stock-suppression finding one week later, unchanged**: the JSON
  output's own `retailers` field for this line is `["TheCubicle"]` only — SpeedCubeShop still
  does not surface it through the category-collection endpoint this script queries, exactly the
  mechanism `p4-9-enumeration-methods-lane-b.md` documented on 2026-09-12. **Recency + stock
  suppression, both already-named mechanisms, now confirmed persistent rather than a one-off.**

### Broader scan for a fifth mechanism (all 53 multi-SKU warnings inspected by eye, not individually adjudicated)

Every other multi-SKU line falls cleanly into one of the four named mechanisms or into a
different, already-tracked, non-sweep category:
- **Recency** (later generation of a held family): MoYu Super WeiLong V2, MoYu Super AoLong (+AI),
  MoYu WeiLong WRM V10, MoYu WeiLong Ferrocore V2, MFJS MeiLong 3M V2, SAOCube V56, Cyclone Boys
  Metallic (+M) — several already `confirmed_missing` in `p4-9-adjudication.yml`.
- **Stock suppression / needs_research generation-naming** (already flagged, not re-litigated
  here): MoYu RS3 M 2021, MoYu Super RS3 M 2022, MoYu WeiLong AI V10/V11.
- **Manufacturer-layer breadth, not a sweep-miss mechanism at all (P4-10's territory, checked
  directly against `data/manufacturers/`, 54 files)**: every Ziina line (Gradient, World Map,
  Christmas, Rainbow, Halloween, Mosaic) and "YZ Electroplated Metal Alloy" — confirmed absent
  manufacturers, not even under an alias in any of the 54 files. ZCube's two novelty-print lines
  and SAOCube's V56 sit under manufacturers the archive DOES hold (`zcube.yml`, `saocube.yml`),
  so those two are ordinary recency/scope candidates, not breadth gaps.
- **Scope-policy question, already escalated as P4-11, not a sweep-miss mechanism**: DianSheng
  Big/Giant, YJ 3x3 Mini, GAN330 Keychain Cube, MoYu 3x3 Mini, Pet 3x3 Keychain Cube.
- **Alias blindness, Task 1's own three candidates**: YJ YuLong 3x3 V2, YuXin Little Magic 3x3
  V2, YuXin Little Magic 3x3 V3 — all three STILL appear in this post-fix run (see below).
- **Alias blindness, a second already-known instance neither fixed nor in this lane's scope**:
  "MoreTry Tianma X3+ V4" was classified `alternate_naming` in `p4-9-adjudication.yml` on
  2026-09-09 ("the archive HOLDS moretry-tianma-x3-v4... a '+' is the whole difference") but no
  alias was ever added, and it still appears as a miss in this run. Recorded here as further,
  independent corroboration of the mechanism — not fixed, since `moretry-tianma-x3-v4` is not one
  of this lane's three assigned candidates.
- **Out of scope / novelty, not a model gap at all**: Calvin's Puzzle training/novelty items
  (Practice Special Cube, CFOP Trainer Cube, Sudoku Cube, World Map, VK Sloping Frame), Rubik's
  licensed collaborations (Marvel/Star Wars/Disney Cubers, Phantom Cube), QiYi DNA Cube, DianSheng
  Galaxy Squished.
- **Already `confirmed_missing`, breadth-of-category-not-family** (the manufacturer is held, no
  prior product of this TYPE was ever recorded for it): QiYi Smart Cube, QiYi AI — both already
  adjudicated; this is still recency in the loose sense the original P4-9 pass used it (the
  enumeration found the manufacturer and stopped before this product category), not a new
  mechanism.

**Verdict: no fifth mechanism.** Every credible current-generation candidate tested — the four
named ones in depth, and the remaining ~49 multi-SKU warnings by inspection — is fully explained
by recency, discoverability, stock suppression, or alias blindness, or belongs to a different,
already-named, non-sweep-miss question (P4-10 manufacturer breadth, P4-11 scope policy). This is
a genuine negative result, not an absence of looking: it is written down with the specific
evidence for each bucket above so a later reader can check it rather than trust the paragraph.

### A methodology observation, not a new mechanism: word-order splits one product into two report lines

`MoYu WeiLong V11` is reported as TWO separate warning lines — "MoYu WeiLong V11 3x3" (7 SKUs,
TheCubicle) and "MoYu WeiLong 3x3 V11" (5 SKUs, SpeedCubeShop) — because the two retailers place
the "3x3" token on opposite sides of the version number, and the script's line-grouping map keys
on the raw (pre-normalisation) title string. This does not create or hide a gap: both lines
correctly fail to match the archive's V9 ceiling either way. But it inflates the script's own
"distinct product line" and "warning" counts (both entries counted separately in the 271/259 and
54/53 totals above), and it is an operational trap for whoever eventually admits WeiLong V11 as a
model: an alias covering only one word order would leave the OTHER retailer's spelling reported
missing forever. Not fixed here (`scripts/**` is out of this lane's file allow-list); recorded so
the next lane does not have to rediscover it.

### Confirmed empirically: Task 1's aliases do not silence the automated matcher

The post-Task-1-commit `--fetch` run above still reports "YJ YuLong 3x3 V2", "YuXin Little Magic
3x3 V2", and "YuXin Little Magic 3x3 V3" as missing, exactly as predicted in Task 1's "What this
does NOT fix" note — this was verified by re-running the tool after the alias commit landed,
not merely reasoned about in advance. The archive records are now correct; the automated sweep's
truncation-plus-generation-guard interaction is a separate, documented, unfixed limitation.

## PROBE RELIABILITY

**Task 1.** Two live facet fetches (TheCubicle, SpeedCubeShop; both `yj` and `yuxin` brand
collections, 4 fetches total, 312 products read across them, all under Shopify's 250-item page
cap so no pagination or truncation risk). Every title bearing "YuLong" or "Little Magic" in each
collection was read in full and classified by hand (3x3 vs. non-3x3 sibling, magnetic designator
present/absent) — not sampled, not regex-filtered further than the brand-name substring already
used to scope the collection. Two controls were run before any verdict was trusted (both hosts
independently list the ORIGINAL Little Magic generation's non-magnetic AND magnetic
configurations as separate real SKUs, proving neither host suppresses a bare non-magnetic title
where one exists) — both passed. **Measured false-positive rate: 0 of 3 candidates** — all three
were correctly resolvable as aliases once the full (not truncated) retailer titles were read;
none turned out to be a genuinely distinct product, and none was left unresolved.

**Task 2.** The four named candidates were each independently corroborated beyond the single
`catalogue-gap` run: cross-checked against `p4-9-adjudication.yml` and
`p4-9-enumeration-methods-lane-b.md` for prior classification, against the relevant existing
model file for the archive's own ceiling generation, and (for AoLong V5 and M Pro V3, the two
without deep prior write-ups) against independent WebSearch results from sellers and reviewers
the archive does not already cite. A known-negative control (Warrior W, Crazy V2 — both
archive-held) confirmed absent from the 259-line miss list; a known-positive control (Super
WeiLong V2, not one of the four named candidates but caught in the same sweep) confirmed present
and correctly unmatched by the same generation-token guard Task 1 found a gap in — showing that
gap is narrow (version-suffix-plus-qualifier names only), not a general failure of the guard.
The broader 53-line scan was inspection, not full adjudication (explicitly out of scope per the
task), so its "no fifth mechanism" finding is bounded by that: a candidate requiring per-title
research to distinguish from novelty/bundle/policy classes could in principle hide inside the
~49 lines not independently verified beyond bucket-level classification. Nothing found in that
scan contradicted the four-mechanism framework.

## SCOPE NOT FINISHED

- **Cubelelo (the required non-US retailer, RESEARCH_SPEC 3.6a check 2) could not be
  re-verified for X-Man Tornado V5 in this session's `--fetch` run** — its facet fetch failed
  (`fetch failed`, both attempts) rather than returning an empty result, so this is recorded as a
  fetch failure per the DISCIPLINE rule, not evidence the product disappeared from that retailer.
  The original P4-9 pass's Cubelelo corroboration (2026-09-09) stands; it was not re-run to
  success here.
- **`MoreTry Tianma X3+ V4`** was noticed, in the course of Task 2's broader scan, to be a SECOND
  unfixed instance of the exact alias-blindness mechanism Task 1 closed for three other
  candidates — classified `alternate_naming` in `p4-9-adjudication.yml` on 2026-09-09, still
  unaliased, still reported missing. It is not one of this lane's three assigned candidates and
  was left untouched; flagged here for whoever picks up the alias-blindness class next.
  `moretry-tianma-x3-v4.yml` was not opened or edited by this lane. MoYu WeiLong V11's own
  word-order line-split (documented above) was found the same way — opportunistically, during
  Task 2 — and is likewise recorded rather than fixed: both are `scripts/catalogue-gap.mjs`
  changes and therefore outside this lane's file allow-list.
- **The ~49 non-named multi-SKU candidates in Task 2's broader scan were bucketed, not
  individually adjudicated** to a `confirmed_missing`/`bundle`/`needs_research` classification —
  several were already adjudicated by prior lanes and are cited as such; a handful (DianSheng
  Galaxy Squished, ZCube's two novelty prints, YZ Electroplated Metal Alloy) were bucketed on
  their surface shape (novelty/breadth) without opening a dedicated research thread for each, per
  the task's explicit instruction not to adjudicate all 272 lines.
- **`scripts/catalogue-gap.mjs`'s bracket-truncation-plus-generation-suffix-guard interaction**
  (documented in Task 1's "What this does NOT fix" and empirically confirmed in Task 2) was not
  patched — `scripts/**` is outside this lane's file allow-list. It affects any held model whose
  own name ends in a qualifier AFTER its version number (e.g. "V2 M", "V3 MagLev"); the yj-yulong
  and yuxin-little-magic families are confirmed instances, and `moyu-weilong-wr-m-2020`/`-2021`
  (ending "2020"/"2021" rather than a plain version number) may be a related case not checked
  here.
