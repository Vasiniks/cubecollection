# Agent lane recovery — 2026-09-12

All five specialist lanes (A–E), launched from `78d0097` in isolated worktrees, were terminated
simultaneously by a session rate limit roughly nine minutes in. This is the recovery record.

```
CAUSE:  HTTP 429, "You've hit your session limit", all five within one second of each other.
        Not an agent fault and not a scope fault — a session-wide budget ceiling.
STATE:  every lane had COMMITTED its report skeleton before dying, as instructed, so no lane
        died silently and every scope is recoverable.
```

| Lane | Scope | Commits | Recoverable work beyond the skeleton |
|---|---|---|---|
| A | P4-10 Ziina identity | 1 | none |
| B | P4-9 enumeration methodology | 1 | none |
| C | P26-2 escalation linkage | 1 | **uncommitted, substantial** — see below |
| D | Provenance adversarial audit | 1 | none |
| E | DaYan variant depth | 1 | **uncommitted, one source** — see below |

## Lane C — recovered and merged

`scripts/check-escalations.mjs`, uncommitted but complete enough to run clean. Two real additions:

1. **It made the checker fixture-able.** The script had ZERO selftest coverage because it read
   `research/qc` and the ledger through hardcoded relative paths. It now resolves both through
   `CC_DATA_ROOT`, the same override `lib/archive.mjs` already uses for the record tree, so
   fixtures can exercise it the way every other check is exercised.
2. **It measured the reverse link and deliberately did not enforce it.** The chain ends
   "ledger id -> status -> resolution" and nothing had checked whether a ledger issue cites back
   to the report that raised it. Measured: **13 of 59 issues** are reached by any report's
   escalation block. The other 46 predate the block convention (introduced 2026-09-09) or were
   filed directly by the main session while auditing the ledger. A rule demanding the backlink
   would fire on 46 of 59 — 78% — forever, for structural reasons unrelated to whether any
   finding is sound. Reported as a number, not enforced. That is exactly the judgement the lane
   was asked for.

## Lane E — NOT merged, and why

Lane E produced one complete source record, `thecubicle-dayan-guhong-v2-diy-kit-2020`: a DaYan
GuHong V2 DIY kit, with a verbatim excerpt, the page's embedded Shopify product JSON (id
1820730228809, three colour SKUs, `Dimensions_57.0`, `DIY Kit Type_3x3`), and correct refusals —
it declines to record an item weight because the page carries only `Weight_Other`, and collapses
the three colours as stock colourways.

**It is well-formed and it is NOT in the archive, because I could not verify it.** Both attempts
to fetch its cited capture returned "Internet Archive: Temporarily Offline". The archive's own
rule cuts both ways: a failed fetch is never evidence of absence, and it is never verification
either. An unverified source does not enter `data/` on an agent's word.

The full record is preserved here so it survives worktree cleanup, and the verification is one
command:

```
curl -sL --compressed "https://web.archive.org/web/20200921093233id_/https://www.thecubicle.com/products/dayan-guhong-v2-diy-kit"
```

Confirm the page carries: the title "DaYan GuHong V2 - DIY Kit", the sentence "This is the
Do-It-Yourself (DIY) version of this product", the string `1820730228809`, `Dimensions_57.0`, and
SKU `154_1_1`. If all five are present the source can be restored from the block below and
`dayan-guhong-v2--diy-kit` created against it. `data/variants/dayan/dayan-guhong-v2/` currently
holds only `standard.yml`, so the variant would be new.

<details>
<summary>Full source record, verbatim as Lane E wrote it</summary>

```yaml
# source: thecubicle-dayan-guhong-v2-diy-kit-2020
id: thecubicle-dayan-guhong-v2-diy-kit-2020
entity: source
kind: retailer
title: "DaYan GuHong V2 - DIY Kit — TheCubicle"
publisher: "TheCubicle"
url: "https://www.thecubicle.com/products/dayan-guhong-v2-diy-kit"
preservation_method: archive_url
archive_url: "https://web.archive.org/web/20200921093233id_/https://www.thecubicle.com/products/dayan-guhong-v2-diy-kit"
excerpt: |-
  Page title as captured: "DaYan GuHong V2 - DIY Kit – TheCubicle".

  Meta/OG description, verbatim: "This is the Do-It-Yourself (DIY) version of this product. To
  see the Assembled version of this product, please click here. The GuHong returns with
  torpedoes! This more recent version of the DaYan GuHong feels smoother than its predecessor
  and does not pop."

  THE RETAILER PAIRS THE TWO ITSELF, identically to the V1 DIY kit: this is explicitly named
  as the unassembled form of "this product", with a link back to the assembled version. The
  "torpedoes... does not pop" line is the same identity-establishing copy used on the assembled
  dayan-guhong-v2 page (thecubicle-dayan-guhong-descriptions), confirming this is the V2 DIY
  kit and not a re-listing of the V1 DIY kit under a new handle.

  Embedded product JSON: id 1820730228809, handle "dayan-guhong-v2-diy-kit", vendor "DaYan",
  type "DIY Kits", price $12.99, tags include "Availability_Discontinued", "Dimensions_57.0",
  "DIY Kit Type_3x3". Three colour variants only (Black sku 154_1_1, White sku 154_1_2, Purple
  sku 154_1_76) — a stock-colourway spread, not a further configuration axis. No item weight
  tag is present (only "Weight Range_Other"/"Weight_Other"), so none is recorded.
preservation_note: "`curl -sL --compressed` against the id_ raw Wayback capture, fetched
  2026-09-12. The product JSON block embedded in the page (Shopify's own ProductJson script tag)
  is quoted directly rather than re-derived from a live endpoint, since the live product no
  longer resolves (discontinued)."
accessed: "2026-09-12"
language: en
region: US
link_status: dead
last_checked: "2026-09-12"
reliability_note: |-
  Tier 2, first-party retailer product page with the retailer's own structured product JSON.
  ESTABLISHES: that GuHong V2, like V1, was sold in a DIY (unassembled) configuration alongside
  the assembled one, that the retailer treats them as two forms of one product, the 57.0mm
  dimension tag, and that colour is the only further axis (collapsed per the archive's stock-
  colourway rule). DOES NOT ESTABLISH: a release date, an item weight, or DaYan's own name for
  the configuration — "DIY Kit" is the retailer's product title, as with every other DIY-kit
  source in this archive.
status: sourced
```
</details>

## What the lanes did not get to

A, B and D produced skeletons only. Their scopes are unchanged and fully described in their
prompts and in `research/qc/HANDOFF.md`. Relaunching them is a fresh start, not a resume — there
is nothing partial to preserve.
