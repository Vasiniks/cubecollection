# P26-5 — adjudication of the seven credible family candidates

**Adjudicated:** 2026-09-08 · **Baseline:** `a987500` · **Lanes:** 4 (all Sonnet 5, isolated worktrees)
**Taxonomy mutated: NONE.** Families 126, models 258, variants 104, manufacturers 54 — unchanged.
This is a **decision checkpoint**, not a mutation. Creation is deliberately deferred.

> **UPDATE 2026-09-08 — the creation this document deferred has since been AUTHORISED and
> APPLIED.** All six families were created in two tranches (`confirmed` and `probable` kept
> separate): families 126 → **132**, models 258 → **269**. Issue `P26-10` is resolved. Everything
> below describes the adjudication as it stood when made and is unchanged. Two new issues came
> out of the creation: `P26-12` (the Tank/Gem mould comparison, still unperformed) and `P26-13`
> (`legality` missing from `model.schema.json`).

---

## 1. The verdict

| # | Candidate | Disposition | Confidence | Basis |
|---|---|---|---|---|
| 1 | **CubeTwist 3x3** | **A** | **confirmed** | Tier-1 manufacturer site: own 3x3x3 category, separate from its novelty category |
| 2 | **DaYan Bermuda** | **A** | **confirmed** | Tier-1 official category page naming five sub-products; four distinct moulds |
| 3 | **ShengShou Rainbow** | **A** | probable | Cross-size naming; 3 publishers; `-unstickered` discriminator |
| 4 | **ShengShou Gem** | **A** | probable | 6 puzzle types / 7 URLs; 2 publishers |
| 5 | **ShengShou Crazy** | **A** | probable | 6–8 puzzle types; documented inter-generation mould difference |
| 6 | **ShengShou Tank** | **A** | probable | 9 puzzle types / 18 URLs — but **one publisher only** |
| 7 | **ShengShou Metal Cube** | **E** | — | No cross-range, one publisher, fails §2.2 |

**Six of seven are genuine missing families. One is refused. None resolved as B, C or D.**

That is a high yield, and it deserves scrutiny rather than celebration — see §4, which explains
why it does **not** mean the discovery methodology is still failing.

---

## 2. The two `confirmed` cases both rest on first-party evidence

### CubeTwist 3x3 — and it overturns a frozen record from the manufacturer's own site

`data/manufacturers/cubetwist.yml` states *"No standard WCA-legal 3x3 was found under the
CubeTwist name this pass"* and classes the brand a novelty specialist. The lane found
**`cubetwist.com`** (tier 1, brand name **梯色魔方**, Guangzhou address, 2009–2010 copyright) —
**the first first-party CubeTwist source located by any pass.** Its own navigation carries
**三阶梯色魔方 (3x3x3) as a product category, separate from 异形梯色魔方 (shaped/novelty)**.

The manufacturer itself draws the line the frozen record says does not exist. Under that category:
three colourways, a DIY loose-parts kit, and (adjacent) a 40mm keychain — colourways and the DIY
kit being Pass-4 variant material per the `cube4you-3x3` precedent, so **one model expected**.

This also removed the candidate's original weakness. It had rested on Cubezz and Lightake, whose
**SKUs mirror each other** — corroborating existence but not independent per §3.2. A third
channel (SpeedCubeShop's dedicated `/cubetwist` brand page, logo asset from 2013-11-21) plus the
tier-1 source make the mirroring question moot.

**This overturns `P26-4`, which should be closed as resolved-established.**

### DaYan Bermuda — and it corrects a previous agent

Pass 2.6's Agent E read Bermuda's ~10 themed items as *"decorative colourway naming across a
shared bandaged-3x3 design"*. **That reading is wrong for most of the line.** Agent B fetched the
product photography and DaYan's **own 2012 official category page**
(`dayancube-official-bermuda-category-2012`, tier 1), which lists **"Dayan Bermuda Cube" as a
top-level product category** beside GuHong / LingYun / LunHui / ZhanChi, and names five
sub-products under it:

> **Bermuda Triangle** (eight planet names × Black/White) · **House I** · **House II** ·
> **Column** · **Star**

The eight planet names *are* colourways — of Triangle. **House I, House II, Column and Star are
distinct exterior moulds**, officially named by DaYan. Under DATA_MODEL §4.2 different moulds are
different models, not variants. Retailer-duplication check: distinct Shopify product IDs per
shape, independent slug conventions — no HaiTun/ZhanLang-style false positive.

**Scope:** bandaged ⇒ not WCA-legal ⇒ models take `scope_class: conditional`, following the
existing `calvins-maze-300-cube` precedent, whose justification rests on the bandaged mechanism's
documented significance. **Not `core`.** A 2012 origin is not disqualifying — `dayan-guhong-v1`
(2010) and `dayan-zhanchi-v1` (2011) are both `core` — and circulation runs 2012 → 2026.

---

## 3. The four `probable` ShengShou cases, and their unequal strength

The archive's precedent bar for this manufacturer is exact and worth stating: **all five existing
ShengShou families rest on precisely two sources — the Speedsolving wiki (tier 4) and
TheCubicle.** Every candidate below meets or exceeds that.

- **Rainbow** — the strongest. The obvious hypothesis was *stickerless = variant, not family*, and
  the lane **tested and rejected it on a real discriminator**: TheCubicle marks stickerless
  variants with an `-unstickered` suffix on the base slug (`shengshou-aurora-3x3-unstickered`),
  but Rainbow is *never* suffixed that way — always a top-level name. Plus Cubelelo as a third
  publisher and a Rainbow 2x2 sibling.
- **Gem** — 6 puzzle types over 7 URLs, with Cubelelo independently carrying Gem-Pyraminx. Two
  publishers.
- **Crazy** — cross-range across 6 types (+2 at SpeedCubeShop), and a documented **mechanism**
  difference between generations (V2: "more pieces (9 total) in each ring"), which satisfies
  model identity independent of the version label.
- **Tank** — **the weakest A, and it should be recorded as such.** It has the broadest internal
  signal (9 puzzle types, 18 URLs) but **a single publisher**: SpeedCubeShop and Cubelelo both
  returned clean negatives. `probable` is correct per the vocabulary (one tier-2 source,
  uncontradicted), and it matches the accepted-family bar — but it is carried by cross-range
  naming at one retailer, not by cross-publisher agreement.

**An open question deliberately not resolved:** the tier-4 wiki says *"ShengShou Tank 3x3 — A 3x3
similar to the Gem."* Two lanes flagged that sentence independently. It is far too thin to merge
on, but it means a future mould-level check could yet collapse Tank into Gem.

**Crazy's `scope_class` is left open, not decided.** It is a locked-ring shape mod, so §2.2
requires documented significance. There is no production-first or design-influence claim (weaker
than `mf8-crazy-3x3x3`'s decade of documented circulation), but there *is* a documented
1400-unit-worldwide "Jelly LE" — a real collector-market signal, and more than
`calvins-crazy-3x3` had. Recommendation: `reference_only` for the base generation, V2 flagged
disputed for human review. **Do not invent significance to admit it.**

### Metal Cube — refused, and correctly

Six URLs all resolve to **one** 3x3 page; no cross-range sibling; one publisher; WCA legality
**unknown in either direction** (and the agent correctly declined to use its own background
knowledge, which is inadmissible tier 5). Its copy — *"very cool finish"*, *"satisfying to
solve"* — is exactly the language §2.2 excludes: **"it is interesting" is not a justification.**
It fails `conditional`, and unresolved legality blocks `core`. **Left unrecorded.**

**A new lead, correctly not conflated:** SpeedCubeShop carries a **"ShengShou Metallic"** line
across five puzzle types in magnetic and non-magnetic form (from 2023-09-28) — which reads as a
*finish-naming convention*, not the metal-shelled Metal Cube. The page fetch returned only site
chrome and was reported **inconclusive rather than as corroboration or refutation**. Recorded as
a new P26-6-class lead.

---

## 4. The second-order question: **BOUNDED — no broad sweep justified**

Six of seven candidates surviving looks alarming. It is not, and the reason is specific:
**these were not discovery failures.** Sorting the seven by *why* each was missing:

| Why it was missing | Candidates | Fix |
|---|---|---|
| **Seen and deliberately deferred** for tier-4-only evidence | Rainbow, Gem, Tank | none needed — the deferral was correct at the time |
| **Evidence already in the archive, never followed through** | Bermuda, Crazy | `P26-2`/`P26-8` roll-up remediation |
| **Genuine discovery gap** (first-party source never found) | **CubeTwist** | `P26-3` §3.6a |
| Correctly refused | Metal Cube | — |

The decisive fact: `speedsolving-wiki-shengshou-products` — **the very source all five accepted
ShengShou families rest on** — already lists Rainbow (CaiHong), Gem and Tank in the same
enumeration, at the same level, with native Chinese names in the same style. And that source
record *says so*:

> *"Several entries (Rainbow, Gem, Tank) are undated and given only a single dismissive sentence;
> not created as families this pass on a significance/evidence basis, and recorded as leads
> rather than silently dropped."*

**Pass 2 saw them and declined on the evidence it had.** P26-5 supplied the tier-2 evidence that
was missing. That is the methodology working across passes, not failing. Likewise Bermuda was
named in `dayancube-official-2013`, a source the archive already held.

**Only CubeTwist represents a true discovery gap** — one manufacturer, whose first-party site
had eluded every prior pass.

### Supporting measurement: §3.6a retroactive coverage is near-complete

Across the 41 manufacturers holding at least one family:

- **35** have prefix-sweep evidence in a source record
- **4** have it in a report only (cube4you, guojia, mfjs, mohuanshousu)
- **2** have none anywhere — **calvins-puzzle** (3 families) and **particula** (1) — **4 of 126 families**

And neither outlier fits the failure profile. Calvin's three families are all shape-mod novelties
with **zero `core` models**; Particula/GoCube has four first-party sources and a **live** official
site — the opposite of the dead-site pattern behind every actual miss.

**Verdict: bounded. Another broad family enumeration is not justified.** The residual risk is
*follow-through on evidence already held*, which is `P26-2`/`P26-8`, not a discovery problem.

---

## 5. Recommended mutation — in two separate tranches

Per the adjudication protocol, `confirmed` and `probable` candidates are **not** combined.

**Tranche 1 — `confirmed` (2 families):** `cubetwist-3x3` (models `core`) ·
`dayan-bermuda` (models **`conditional`**, with House I / House II / Column / Star as separate
models and the eight planet names as Pass-4 variants of Triangle).

**Tranche 2 — `probable` (4 families):** `shengshou-rainbow` · `shengshou-gem` ·
`shengshou-tank` · `shengshou-crazy`. Tank's single-publisher weakness and Crazy's unresolved
`scope_class` should be recorded on the records themselves.

**Not authorised:** ShengShou Metal Cube.

Both tranches require explicit authorisation. **No family was created by this adjudication.**

---

## 6. Answers

1. **Genuine missing families:** **6** (2 `confirmed`, 4 `probable`)
2. **Belong under existing families:** **0**
3. **Aliases / rebrands / artifacts:** **0**
4. **Insufficiently evidenced:** **1** (Metal Cube)
5. **Continuing systematic taxonomy gap?** **No — bounded.** Five of six were already visible in
   evidence the archive held; only CubeTwist was a true discovery gap.
6. **Another targeted sweep justified?** **No.** §3.6a coverage is 39/41 manufacturers, and the
   two gaps are off-profile.
7. **Taxonomy safe to freeze for Pass 4?** **Not yet** — six adjudicated families await creation,
   and `P26-6`'s eleven leads are unverified. After both, yes.
