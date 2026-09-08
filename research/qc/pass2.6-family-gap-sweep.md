# Pass 2.6 — targeted family-gap sweep

**Run:** 2026-09-07 · **Baseline:** `48cb686` · **Lanes:** 5 (all Sonnet 5, isolated worktrees)
**Taxonomy mutated:** **NONE.** Families 122, models 253, variants 104, entities 54 — unchanged.

## Why this pass ran

Pass 3 completed model enumeration across all 122 frozen families, and in doing so surfaced two
*missing-family* findings it could not act on. The question this pass exists to answer is not
"are those two real" but the one behind it:

> Did Pass 2's family enumeration systematically miss real families, or were those two accidents?

The answer is that Pass 2's methodology was not wrong — **it predates its own discovery
standard**, and was never re-run under it. See §5.

---

## 1. The verdict

| | Question | Answer |
|---|---|---|
| **A** | Is the 122-family taxonomy safe to freeze? | **NO** |
| **B** | Are FangShi GuangYing and JieYun genuine missing families? | **YES** — `confirmed` |
| **C** | Is HaiTun ZhanLang a genuine missing family? | **NO** — alias, rejected |
| **D** | Did the audit reveal additional credible missing families? | **YES** — 2 established, 7+ credible |
| **E** | Is the methodology materially flawed? | **TARGETED AMENDMENT** |
| **F** | Is Pass 4 safe to begin? | **NO** |

**At least four missing families are established and eleven more are credible.** That is not a
tail of edge cases; it is a systematic under-count concentrated in identifiable places.

---

## 2. The three known leads, adjudicated

### P3-T1 — FangShi GuangYing and JieYun · **ESTABLISHED**, raised `probable` → `confirmed`

All four prior sources were re-fetched at their exact archive timestamps and every quoted
excerpt matched verbatim — nothing misquoted or overstated. Three *additional* independent
retailers were then found: **LighTake** (CN), **speedcube.com.au** (AU), and **SpeedCubeShop**
(US, independent of TheCubicle). GuangYing now rests on four independent tier-2 retailers,
JieYun on five.

The four-generation lineage is corroborated rather than overturned: speedcube.com.au's JieYun
copy independently names *"its predecessors (GuanYing and Shuangren)"*.

> **ShuangRen → ShuangRen V2 → GuangYing → JieYun**

Mini ShuangRen and Mini JieYun remain **within-family size variants** (the `dayan-zhanchi` 42mm
precedent), now checked at four retailers rather than one. No Mini GuangYing exists at any.

A genuine dated statement was found — speedcube.com.au's page title reads *"New January 2015
release"* — and correctly **held at `reported`, not adopted**. TheCubicle's GuangYing page
carries the `Added 2018-09-11` migration artifact; it was identified and refused.

**Still open:** no first-party FangShi source exists after five passes, and Chinese-language
search was blocked again. Both recorded as *leads not chased*, never as absence.

### P3-T4 — HaiTun ZhanLang · **REJECTED**. Classification C (alias), `probable`

Cubezz **product ID 8598** carries **SKU HTO02C** under the title *"HAITUN ZhanLang V2"* in a
2026-02-08 capture and *"HAITUN Waverider V2"* in a 2026-05-10 capture, with identical spec
blocks. Same product, same SKU, renamed in place three months apart.

No independent retailer carries ZhanLang as a separate line: TheCubicle, SpeedCubeShop and
Kewbz each carry HaiTun **exclusively** as Waverider (three negative CDX sweeps); Cubelelo
carries no HaiTun at all. SenHuan and MoYu both use "ZhanLang" for unrelated 2×2s, confirming a
generic Chinese name element rather than a HaiTun brand.

**This was a false positive of exactly the kind the archive warns about — reading retailer
naming as product identity. The corroboration bar caught it.** One of the two findings that
motivated this pass dissolved on contact with a second retailer.

*Incidental gain:* cubezz's own field reads `Brand: HAITUN CUBE (Dolphin)` — a sourced
confirmation of the dolphin gloss that `haitun.yml` correctly declined to assert unsourced.

---

## 3. What the audit found that nobody was looking for

### ShengShou YuFeng · **ESTABLISHED** — and it was already in the repo

A **two-generation magnetic-core flagship** (2023-02, 2023-06), still selling in 2025, with no
family record. Both archived product pages were fetched rather than trusting the path list, and
existence corroborated at SpeedCubeShop as an independent publisher.

This finding **required no new research to know about.** It sat inside
`data/sources/thecubicle-shengshou-products-prefix-2026.yml` at `status: sourced` since
2026-09-03 as a verbatim `IMPORTANT ESCALATION`, from a **474-URL non-truncated CDX sweep** —
the strongest discovery evidence this project produces. See §4 for why it went silent.

*Correctly refused:* the `magelev` URL slug is contradicted by a first-hand customer review and
is **not** recorded as a MagLev configuration. `introduced` left `unknown` — the 2023 capture is
a crawl timestamp, not a release date.

### YJ Appari · **ESTABLISHED** — predicted by no one

A flagship 3×3 with a distinct **Speed Micro Bearing / Speed Micro Actuator** mechanism,
corroborated across TheCubicle, SpeedCubeShop and Cubelelo. No existing YJ family fits it.
Found only because this pass created the full YJ `/products/` sweep that never existed.

### CubeTwist 3x3x3 · **CREDIBLE** — overturns a zero-family finding

`data/manufacturers/cubetwist.yml:21` states plainly: *"No standard WCA-legal 3x3 was found
under the CubeTwist name this pass"*, classing the brand a novelty specialist. A standard
57mm/94g 3×3 has been sold continuously at **Cubezz from 2015 and Lightake from 2011**, filed
under each retailer's own dedicated 3x3x3 WCA category.

**The original check only ever reached TheCubicle and Cubelelo, neither of which carries it.**
Held at `reported`, not higher: Lightake mirrors Cubezz's SKU numbers, so per §3.2 it
corroborates *existence*, not specs, independently.

---

## 4. The process defect — why real findings went silent

This matters more than any single family, because it is the mechanism that hid them.

**Two distinct roll-up failures, both verified:**

**(1) Killed lane → no report at all.** Pass 3 Batch 1 ran four lanes: A=MoYu, B=QiYi,
C=DaYan, D=YJ+ShengShou. **Lanes C and D were killed by rate limits.** The established recovery
pattern rescued their *records* — models and sources were committed at family boundaries and
merged — but **their reports were never written.** `research/qc/` holds `pass3-agent-a-moyu.md`
and `pass3-agent-b-qiyi.md` and nothing else from Batch 1.

> **24 families and 56 models were enumerated with no written narrative and no escalation
> roll-up.** The ShengShou escalation survived *only* because that agent also wrote it into a
> source record's notes field.

**(2) Surviving report → escalation written → never propagated.**
`research/qc/pass3-b2-agent-c-cycloneboys-maru.md` (lines 146-149, 186-189, 210-213) explicitly
records six Cyclone Boys lines and four Maru lines as *"real per retailer evidence found this
pass, none has a frozen family"*, flagged *"for a future family-enumeration pass"*. **That
report survived.** The finding still never reached the ledger or `pass3-progress.md`.

Consequently `pass3-progress.md` listed **six** open escalations when the true number was
materially higher. **The defective step is the roll-up, not the research.** Every one of these
findings was made correctly and written down honestly; the archive simply had no mechanism
guaranteeing a finding reached the ledger.

Four silent escalations were recovered this pass, and the DaYan/YJ 3.6a sweeps that never
existed were created (TheCubicle 351 + Cubelelo 39 for DaYan; TheCubicle 489 + Cubelelo 101
for YJ).

---

## 5. The methodology diagnosis — three separable mechanisms

Precision matters here, because each has a different remedy.

| # | Mechanism | What it missed |
|---|---|---|
| **1** | **Retailer-channel narrowness** — only US/English retailers checked | FangShi GuangYing + JieYun · CubeTwist |
| **2** | **URL-pattern narrowness** — a retailer's `/collections/` page instead of its raw `/products/` prefix, *on the same retailer* | ShengShou YuFeng, Crazy, Rainbow, Gem, Tank, Metal Cube |
| **3** | **Escalation roll-up failure** — findings made and written, never propagated | Cyclone Boys ×6 · Maru ×4 |

Mechanism 2 is stated outright by the archive's own source record: the collections page
*"filters differently than the raw /products/ prefix and missed a live, dated 3x3 catalogue."*

**The crucial nuance for question E:** RESEARCH_SPEC **§3.6a already mandates both check 1 and
check 2**. It was added **2026-09-03, after Pass 2's family enumeration completed**, and was
never applied retroactively to the frozen taxonomy.

> The current methodology is **not** materially flawed. The frozen 122-family taxonomy simply
> **predates its own discovery standard.**

That is why the answer to E is *targeted amendment*, not *material remediation* — the fix is to
**apply the existing rule to the existing taxonomy**, not to invent a new one. Mechanism 3 is
the genuinely new gap: nothing in the spec or the scripts covers escalation roll-up at all.

### The negative evidence that licenses an eventual freeze

Three independent probes came back **genuinely empty**, and they are load-bearing:

- **Brand/manufacturer cross-check** against the 54-entity register across all Pass 3 reports
  and 436 source records — **no unrepresented manufacturer found.**
- **Six of seven zero-family findings reinforced** under the broader retailer check (LanLan,
  VeryPuzzle, Z-Cube, HelloCube, Ninja, LimCube). Only CubeTwist failed.
- **Canonical-prose detector** — the same shape that originally caught FangShi (a flag comment
  left in a record), re-run across all 122 families, 253 models and 54 manufacturers. Fifteen
  hits, every one either a Pass-4 variant deferral, the known FangShi flag, or Pass 2
  *explicitly rejecting* a missing-family claim (`yj-chilong`, `qiyi-ms`). **The FangShi flag
  was the only unresolved one in the entire canonical set.**

The gap is **real and bounded**, not open-ended. It concentrates in discontinued lines from
makers with dead official sites, reachable only through non-US retailers or raw product-prefix
sweeps.

---

## 6. The candidate register

### Established missing families — 4

| Family | Manufacturer | Confidence | Evidence |
|---|---|---|---|
| **FangShi GuangYing** | fangshi | **confirmed** (existence) | 4 independent tier-2 retailers |
| **FangShi JieYun** | fangshi | **confirmed** (existence) | 5 independent tier-2 retailers, + stated mould difference |
| **ShengShou YuFeng** | shengshou | **probable** | 2 generations; TheCubicle pages + SpeedCubeShop |
| **YJ Appari** | yj | **probable** | 3 independent retailers; distinct mechanism |

### Credible candidates that would block Pass 4 — 7

| Candidate | Manufacturer | Confidence | Note |
|---|---|---|---|
| CubeTwist 3x3x3 | cubetwist | reported | **Overturns a zero-family finding** |
| DaYan Bermuda | dayan | reported | Bandaged-3×3 series; scope check needed |
| ShengShou Crazy 3x3 | shengshou | reported | Shape-mod; 2 generations; `scope_class` question |
| ShengShou Rainbow 3x3 | shengshou | reported | Standard mechanism |
| ShengShou Gem 3x3 | shengshou | reported | Standard mechanism |
| ShengShou Tank 3x3 | shengshou | reported | Standard mechanism |
| ShengShou Metal Cube 3x3 | shengshou | uncertain | WCA material-rules scope question |

### Recorded but not researched this pass — 11

Surfaced by the detector lane from surviving Pass 3 reports, never independently verified here:
**Cyclone Boys** FeiHong · FeiXuan · XuanFeng · JisuZhiYun · JisuZhiFeng · FeiKu (6) ·
**Maru** ShenLan Luminous · Maze · Mini 30mm · Mini Keychain (4) · **Cubelelo "Drift"**
house brand (1, entity-level — issue `C-B1`).

### Rejected — 2

**HaiTun ZhanLang** (alias; same product ID and SKU) · **LimCube Dual 3x3x3** (oversized/gimmick).

### Out of scope — confirmed, not gaps

DaYan Gem · Jewel · Crazy (pentahedron line) · Hydrangea · Bi YiNiao · Shuang FeiYan ·
ShengShou 46mm/keychain/novelty SKUs · YJ Pocket/mini/mosaic/super-floppy SKUs.

Agent C's "DaYan Crazy Cube" lead resolved: it is a **pentahedron line**, out of scope, and
distinct from the joint DaYan/mf8 3×3 already covered by `mf8-crazy-3x3x3`.

### Weak leads — 9

MoreTry × ZCUBE co-branded edition · LanLan Tiled Mini · HuaMeng/MoYu slug pairing ·
DaYan Bagua · DaYan Tangram · YJ Diamond · YJ Inequilateral · YJ Blind · YJ shape-mod cluster.

---

## 7. Why Pass 4 is not safe to begin

Pass 4 enumerates **variants**, which attach to models, which attach to families. Every
established missing family means an entire subtree of variants that cannot be enumerated
because its parent does not exist.

Concretely: **ShengShou YuFeng has two generations and YJ Appari a distinct mechanism** — both
carry configuration tiers that are exactly Pass 4's subject matter. Starting variant enumeration
now would produce a variant inventory that is *internally consistent and externally incomplete*,
and it would have to be redone once the families exist.

This is a **completeness** blocker, not a correctness one. No existing record is invalidated.
Nothing already enumerated is wrong.

---

## 8. Recommended sequence before Pass 4

1. **Adjudicate the 4 established families** and create them, with their models. Deliberate
   taxonomy action, ready-to-execute proposals already written in the lane reports.
2. **Research the 7 blocking candidates** to a decision — particularly the five remaining
   ShengShou lines, which share one under-swept retailer channel.
3. **Verify the 11 unresearched leads** (Cyclone Boys, Maru, Cubelelo Drift).
4. **Apply §3.6a retroactively** to the family register — this is the actual remediation, and it
   is bounded: run both mandated checks per manufacturer and record the outcome either way.
5. **Close mechanism 3** — make escalation roll-up a required, checkable step (see §9).
6. **Re-freeze** and re-enter the Pass 4 gate.

## 9. Methodology amendments proposed

**Amendment 1 — §3.6a is retroactive, not just prospective.** A discovery standard added after a
pass completed does not validate that pass. Any frozen layer enumerated before its own standard
must be re-checked against it before it can be treated as complete.

**Amendment 2 — escalation roll-up must be a checkable step.** An agent's findings currently
reach the ledger only if a human merges its report and transcribes them. Two independent
failures proved that insufficient. Options, in preference order:
- require every escalation to be written into a **canonical record's notes** as well as the
  report (the ShengShou practice, which is the only reason that finding survived);
- add a lint rule scanning record prose and reports for escalation language with no matching
  ledger id;
- make the merge checklist require ledger entry before a lane is considered merged.

**Amendment 3 — a killed lane is not recovered until its report exists.** The current recovery
pattern rescues records and validates them, which proved insufficient: records without narrative
lose exactly the taxonomy-level findings that models cannot express. A recovered lane should
either have its report reconstructed from its commits, or be explicitly marked
`report_lost: true` so the gap is visible rather than silent.

---

## 10. What was verified, and what was not

**Independently verified by the adjudicator (not taken on agent report):** the ShengShou
escalation text verbatim in its source record; the absence of Batch-1 lanes C/D reports; the
HaiTun product-ID/SKU identity; the CubeTwist contradiction against `cubetwist.yml:21`; the
Cyclone Boys/Maru escalation text and line numbers; all five new FangShi retailer sources;
both new YuFeng/Appari source sets; the freeze invariants after every merge.

**Not verified / open:** no first-party FangShi source after five passes · Chinese-language
search blocked in both FangShi passes · SpeedCubeShop corroboration for YuFeng and Appari is
URL-level CDX only, and both records say so · the 11 unresearched leads rest on prior reports,
not on this pass's own evidence.
