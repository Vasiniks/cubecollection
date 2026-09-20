# P4-9 — closure lane A: is the enumeration methodology defensible for stopping?

Lane A. Base commit da8b6eb on main (HEAD at start; includes 8402590, the 2026-09-19
catalogue-gap generation-token/normalise fix). Worktree `agent-a4297794bb8c6c44c`.

## SCOPE — CLOSURE, NOT DISCOVERY

This is not a discovery lane. The frozen 269-model inventory is not being re-litigated model by
model, and no new SKU hunting is in scope. The question is methodological:

> Is the current `npm run catalogue-gap` methodology (fixed 2026-09-19) good enough that the
> archive has a defensible basis for STOPPING enumeration, and if not, what does it still miss?

Five discovery-failure mechanisms are documented across the ledger's P4-9 entry and its three
companion lane reports:

1. **Recency** — a line was found, enumeration stopped before its later generations shipped.
2. **Discoverability** — the manufacturer's name is absent from the product slug, or a
   retailer's collection slug does not equal the manufacturer id (`qiyi-mofangge` vs `qiyi`),
   so a slug/prefix-based sweep cannot reach the product at all.
3. **Stock suppression** — a backordered listing is hidden from a retailer's live category
   collection while still being served by that retailer's own vendor facet.
4. **Alias blindness** — the archive already holds the model, correctly adjudicated, but under
   a name no retailer currently uses verbatim, so a title-string match against the archive's own
   name fails.
5. **Tool defect** — `catalogue-gap.mjs` itself had a matching defect (suffix-based generation
   guard, punctuation-stripping normalisation) that hid three real archive models from ever
   matching their own retailer listings. Fixed 2026-09-19 in commit 8402590.

## METHOD

1. Read the current `scripts/catalogue-gap.mjs` in full before running it, to understand
   precisely what it queries and how it matches, rather than treating it as a black box.
   **Already done** (see notes below) — it queries a FIXED category collection
   (`/collections/3x3-speed-cubes/products.json`) at three retailers (TheCubicle, SpeedCubeShop,
   Cubelelo), not per-brand vendor facets. This is Lane B's "Method 3" (category enumeration),
   not "Method 2" (vendor facet) — a load-bearing fact for mechanism coverage, since Lane B
   measured M3 ⊆ M2 in every tested cell (M3 never found MORE than M2, and missed stock-
   suppressed and some discoverability-class lines M2 caught).
2. Run `npm run catalogue-gap -- --fetch` (network egress via `dangerouslyDisableSandbox: true`,
   per the SANDBOX note — `$TMPDIR` differs between sandboxed/unsandboxed calls, so any
   comparison file gets written and read in the SAME command context).
3. For each of the five mechanisms, construct a known-positive control (a case that MUST appear
   in / be caught by the tool's output) and a known-negative control (a case that MUST NOT), and
   report pass/fail for each, rather than asserting coverage from the code alone.
4. Sample only as many of the current warning lines as needed to support a conclusion about the
   METHOD (not to close individual candidates) — classify each sampled line by mechanism.
   If any line resists classification under all five, that is a sixth mechanism and the single
   most valuable finding this lane can produce.
5. Write the verdict: defensible for stopping or not, and what remains uncovered regardless.

## PLANNED CONTROLS (filled in as run)

| mechanism | known positive (must be caught / must appear) | known negative (must NOT appear / must be silent) |
|---|---|---|
| recency | a later generation of a held family (e.g. MoYu WeiLong V11, X-Man Tornado V5) | an already-held current model (e.g. QiYi Warrior W, ShengShou Crazy V2) |
| discoverability | TBD — depends on whether category-collection tagging is independent of slug/vendor-facet structure at all three retailers | TBD |
| stock suppression | QiYi M Pro V3 Flagship (SpeedCubeShop "Backordered" tag; Lane B's isolated case) — test whether TheCubicle's un-suppressed listing of the SAME line still surfaces it, and whether a line suppressed at ALL queried retailers would be invisible | a line stocked normally everywhere |
| alias blindness | MoreTry Tianma X3+ V4 (`alternate_naming`, classified 2026-09-09, never aliased — should still appear as a miss) | YJ YuLong V2 M / YuXin Little Magic V2 / V3 (aliased by Lane D 2026-09-19 — should NOT reappear, confirming the alias fix holds) |
| tool defect (fixed) | none of the three previously-swallowed lines should reappear as silently matched-and-hidden | the fix must not have newly swallowed MoreTry X3+ V4 (the `+`/`plus` normalisation control) |

## RESULTS

*(to be filled in after the fetch run)*

## VERDICT

*(to be filled in)*

## PROBE RELIABILITY

*(to be filled in)*
