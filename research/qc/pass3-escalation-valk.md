# Escalation E-VALK-1 — `qiyi-valk` description misidentifies non-3×3 puzzles as 3×3 generations

**Raised:** 2026-09-03 (Pass 3, Agent B) · **Verified independently:** main session, same day
**Severity:** medium · **Blocks Pass 3:** no · **Family mutation performed:** **NONE**

---

## The claim

`data/families/qiyi-valk.yml`'s `description` (lines 23–24, 35) enumerates the Valk line as:

> "Valk2 M, Valk 3 (with M, Elite, Power, Power M, and Mini sub-versions), **Valk 4 M**
> (Standard and Strong), and **Valk 5 M** — the last still resolving live product pages as of a
> November 2025 capture"

and further reasons:

> "(Valk2 M implies an unlisted original Valk/Valk 1 that this pass did not chase further)"

This reads as a succession of 3×3 generations. **It is not.**

## Verification — done in the main session, not taken on the agent's word

Each product page was fetched directly and the type quoted verbatim:

| Product | Actual puzzle | Verbatim evidence |
|---|---|---|
| **Valk2 M** | **2×2** | "Valk2 M is the **first 2x2** produced in the iconic Valk line… slightly larger than the normal 51mm"; spec type "2x2 Speed Cubes", 51.0mm |
| **Valk 4 M** | **4×4** | "The Valk 4 M is the **first 4x4** in the iconic Valk line. It measures a compact 60mm across"; spec type "4x4 Speed Cube" |
| **Valk 5 M** | **5×5** | "The Valk 5 M is a fast, smooth magnetic **5x5** speed cube from QiYi"; spec type "5x5 Speed Cubes", 62.0mm |

Agent B's finding is **confirmed**. The "Valk2 M implies an unlisted Valk 1" inference is also
void: Valk2 is the *first 2×2*, so it implies no earlier 3×3.

**Consequence:** on the evidence available, **Valk 3 is the only 3×3 generation the Valk brand
has ever carried.** Agent B accordingly created models only under Valk 3 (`qiyi-valk-3`,
`-power`, `-elite`, `-mini`) and created none for the 2×2/4×4/5×5 siblings — the correct call.

## Why this is NOT a taxonomy escalation, and why no family was touched

The error is confined to **`description` prose**. Every structural field is unaffected and
correct:

| Field | Value | Status |
|---|---|---|
| `id` | `qiyi-valk` | correct |
| `manufacturer_id` | `qiyi` | correct — settled at `confirmed` in Pass 2.5 from QiYi's own 2016 company history |
| `name` | "QiYi Valk" | correct |
| `positioning` | `flagship` | correct |
| `aliases` | The Valk / TheValk / Valk | correct — no non-3×3 name leaked in |

No attestation cites the erroneous sentence for a structural claim; the affected lines are
narrative only. The family boundary, its parent, and its identity are all sound.

**So the frozen taxonomy is not wrong — the prose describing it is.** Per the Pass 3 rules, a
suspected error is recorded and escalated rather than silently mutated, and this one does not
even reach the taxonomy layer. **No family record was modified.**

## Recommended remediation (deliberately NOT applied in Pass 3)

Correct the `description` prose in `data/families/qiyi-valk.yml` to state that the Valk brand
spans multiple puzzle *sizes*, that Valk 3 is its only 3×3 generation, and that Valk2 M / Valk 4
M / Valk 5 M are 2×2, 4×4 and 5×5 products outside this archive's 3×3 scope. Remove the "implies
an unlisted Valk 1" inference.

This is a **text edit to a frozen record**. It is left to the adjudicator rather than done here,
because the Pass 3 instruction is not to modify family records during ordinary enumeration, and
nothing downstream depends on the sentence.

## Wider lesson worth carrying

The error entered because a **URL-prefix sweep** (`thecubicle-products-valk-prefix-2025`)
enumerated everything matching `valk*` and the family record treated the whole list as one 3×3
lineage. The prefix sweep is this project's highest-recall discovery technique, and this is its
characteristic failure mode: **it finds names, not puzzle types.** A `valk-4-m` slug says nothing
about whether the product is a 3×3.

Pass 3 should assume nothing about puzzle size from a slug, and check the product type before
creating a model. Agent B did exactly that, which is how the error surfaced at all.

Related precedent already in the archive: the withdrawn DaYan/QiYi "GuHong migration" hypothesis,
which also rested on slug adjacency rather than product evidence.
