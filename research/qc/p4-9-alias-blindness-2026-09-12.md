# P4-9 — the catalogue-gap miss list is inflated by names the archive never recorded

Main session, 2026-09-12. Base commit e286e3f.

## The claim

`npm run catalogue-gap` compares retailer product titles against archive **model names and
their aliases** (`scripts/catalogue-gap.mjs:61`). 167 of 269 models carry no `aliases` block at
all. Where a retailer's name for a model differs from the archive's name, the sweep reports a
model the archive **already holds** as missing — and the report's own "recency failure" bucket
absorbs it, making the recency finding look larger than it is.

This is a fourth mechanism, alongside the three P4-9 already records (recency, discoverability,
stock suppression). Unlike those, it is not a research failure at all: the product was found,
adjudicated and recorded. Only the *name* is missing.

## Measurement

Against the 57 multi-SKU candidates from a live `--fetch` run, vendor-gated so a candidate is
only ever matched against models of its own manufacturer:

| bucket | n |
|---|---|
| token-identical to a held model, differing only in word order | 1 |
| held model, retailer name evidenced by a source already bound to the record | 2 (one model) |
| in a family the archive holds, generation genuinely absent | many — the real P4-9 signal |
| no family, out of scope, or unmapped vendor | 23 |

## Confirmed and repaired

**`moyu-weilong-super`** — archive name "MoYu WeiLong Super"; every retailer says "MoYu Super
WeiLong". Identical token multiset, nothing added or dropped, so this is one model under two
word orders. Already evidenced inside the archive: this model's own variants cite
`thecubicle-moyu-super-weilong-lite-2024`, titled "MoYu Super WeiLong 3x3 Lite". Alias added.

**`moyu-weilong-v9`** — archive name "MoYu WeiLong V9"; retailers say "MoYu WeiLong WRM V9" and
"MoYu WeiLong WR M V9". Not a word-order case (the retailer name adds a "WR M" token), so it was
admitted on direct evidence instead: the model's own variant `ballcore-uv-special-edition` cites
`thecubicle-moyu-weilong-wrm-v9-ballcore-uv-se-2023`, whose title is "MoYu WeiLong WRM V9 3x3
(Ball-Core UV Special Edition)". The archive had already bound a WRM V9 product page to this
model; only the name was never written down. Both spellings added.

Adding an alias adds no family, changes no membership and changes no identity — the precedent
the ledger sets at the HaiTun ZhanLang entry. **The taxonomy is untouched: 54 / 132 / 269.**

### The admission rule used, stated so it can be applied again

An alias may be added when **either**:
(a) the retailer name's token multiset is identical to the model's modulo word order — nothing
    semantic added or removed; **or**
(b) a source *already bound to that model or one of its variants* carries the retailer name
    verbatim.

Nothing else qualified. In particular the M-vs-non-M pairs were **refused**:
`yuxin-little-magic-v2` is named "YuXin Little Magic M V2" and the catalogue line is "YuXin
Little Magic 3x3 V2"; likewise `yuxin-little-magic-v3` and `yj-yulong-v2-m`. YuXin and YJ both
sold magnetic and non-magnetic versions, so the missing "M" may be a different product. These
stay candidates, not aliases. Guessing here would manufacture a false identity, which is worse
than a false gap.

## Verification — the fix was tested both ways

Before: 275 unmatched lines, 57 warnings.
After:  272 unmatched lines, 54 warnings.

Exactly the three intended lines closed. **And "MoYu WeiLong WRM V10" / "MoYu WeiLong WR M 3x3
V10" are still reported missing**, which is the negative control: the script's generation-token
guard (`catalogue-gap.mjs:141`) refused to let a V9 alias absorb a V10 line. A repair that had
silently swallowed V10 would have destroyed a real, already-escalated finding.

V10 and V11 remain genuinely absent as models. The archive's WeiLong line ends at V9 (2023);
MoYu has since shipped V10 (2024) and V11 (2025). That is the ledger's existing
`confirmed_missing` entry and **the admission decision remains the taxonomy owner's** — nothing
was created here.

## Three probe bugs hit while measuring this, recorded because they all looked like findings

1. **An empty pool that printed as a result.** The first adjudicator loaded families with a
   two-level walk (`dir/manufacturer/file.yml`). `data/models` is nested that way; **`data/families`
   is flat**. The loader threw per-entry, was caught by a `continue`, and built an empty family
   pool — then printed `family 0.00` for all 57 candidates. Read as a finding that would have
   said "no candidate belongs to any known family", the exact opposite of the truth. The tell was
   that the number was *uniform*, not that it was wrong.

2. **Normalisation destroying the discriminating character.** The first probe stripped all
   punctuation, turning MoreTry "Tianma X3+" into "Tianma X3". The archive holds
   `moretry-tianma-x3-plus` **and** `moretry-tianma-x3-v4` as separate models, so the strip
   silently merged two products. Same class as the known short-token problem, where the dropped
   token is the generation number.

3. **zsh does not word-split unquoted parameter expansions.** A `for i in $ids` helper produced
   no output at all, which reads identically to "this model cites no sources". It cites four.

A fourth, caught by inspection rather than by a control: matching without a vendor gate paired
"QiYi Smart Cube" with `giiker-supercube` and "Ziina Rainbow Cube" with `shengshou-rainbow` —
cross-manufacturer matches at 0.50 that look plausible in a list and are meaningless. Gating
every comparison on the catalogue line's own `vendor` field removed them.

Measured false-positive rate of the first source-title probe: **2 of 12 matches (17%)** —
Calvin's Puzzle "Sudoku Cube 3x3" matched a *Lefun* product, and the X3+/X3 merge above. Both
came from containment permitting extra tokens on the archive side.
