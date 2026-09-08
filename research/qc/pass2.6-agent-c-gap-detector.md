# Pass 2.6, Agent C — mining Pass 3 as a family-gap detector

**Scope:** read-only evidence mining. No family, model, manufacturer, or variant record was
created, renamed, merged, split, or re-parented. Families remain frozen at 122, variants at 104,
entities at 54. This report and its own working notes are the only files written.

**Calibration exclusions, per instruction:** FangShi GuangYing/JieYun (P3-T1) and HaiTun ZhanLang
(P3-T4) are the two known finds and are used only as the shape against which everything else is
tested. They are not re-investigated and do not appear in the ranked table below except as the
comparison baseline.

---

## 0. What I read before mining

`PRODUCT.md`, `RESEARCH_SPEC.md` §§1, 2, 3.6a, 4, 5, `pass3-admission-policy.md` in full, then
every file in the mandatory reading list, plus (because they turned out to be load-bearing)
`pass2-taxonomy-challenge.md` §E (the zero-family audit), `agent-c-swift-block-methodology.md`
(the source of the Cubelelo/Drift lead and the §3.6a amendment), `agent-d-global-second-order-
audit.md` (the `kind: service` precedent), and `pass2-remediation-ledger.yml` in full.

---

## 1. Method and queries run

### Query 1 — brand names in the corpus not in the 54-entity register

Grepped every `data/sources/*.yml` for structured `Manufacturer:` / `Brand:` field values (102
files matched) and cross-checked each distinct value against the register.

**Result: no unregistered manufacturer found.** Every value resolves to a registered entity or a
value the archive has already correctly identified as a retailer-side artifact, not a missing
manufacturer:

- `Manufacturer: XiaoMi` (on two GiiKER sources) — already recorded in both source files'
  `reliability_note`s as "a retailer filing/naming convention... not a claim that Xiaomi itself
  designed or built the product," consistent with `data/manufacturers/giiker.yml`. Correctly not
  escalated.
- `Manufacturer: Z` → `zcube` (register). `Manufacturer: HAITUN CUBE` → `haitun` (register, the
  calibration case). All other values (MoFang JiaoShi, Funs Puzzle, Lefun, SAOCube, KungFu,
  Cyclone Boys, VeryPuzzle, SenHuan, QJ, Ninja, Newisland, mf8, Maru, HuaMeng, HelloCube, GuoJia,
  GuoGuan, GoCube [Particula's own product brand], ESCube, CubeTwist, CubeStyle, Calvin's Puzzle,
  Spin Master [Rubik's corporate parent, not a cube manufacturer], WitEden, FanXin, FangShi,
  Meffert's, GAN, MoreTry, MoJue, MoHuan ShouSu, ES Cube, Rubik's, YanCheng, Valk [QiYi sub-line])
  all map directly to a registered entity.
- "Daqing Bao" (DaYan's founder's name, on `dayancube-official-2013`) is a person, not a brand —
  already handled correctly.

**Conclusion:** the structured-field signal that found HaiTun does not surface a second miss.
Query 1 is genuinely negative, recorded per instruction rather than treated as confirming
completeness beyond what it tested.

### Query 2 — named product lines in the corpus with no family, and Query 3 — zero-model/zero-
family outcomes as a signal

These two queries converged on the same evidence, so I report them together. I grepped every
Pass 3 report and every `data/sources/*.yml`/`data/models/**/*.yml` for the vocabulary the brief
named (`no family exists`, `not enumerated`, `escalation`, `gap`, `candidate`, `for human
review`, `not admitted`, `carried forward`, `did not enumerate`) and, separately, for the literal
strings `no corresponding family`, `no frozen family`, `with no family`, `missing family`, `no
family record`. Results below are grouped by what they actually found, not by which grep line
triggered them, because several genuine findings were phrased differently in prose than in the
brief's example vocabulary.

**2a. Genuinely negative lanes (checked, no finding of any kind).** MoYu (9 families), QiYi +
X-Man (11 families), YuXin (7 families, including a rigorous zero-model conclusion for
`yuxin-3x3`/`yuxin-water`), the smart-cube cluster (GiiKER, Particula), Rubik's/FanXin/KungFu/
Calvin's/WitEden (15 families), MoYu sub-brands + Newisland (8 families), MF8/HuaMeng/ESCube (6
families), and QJ/Cube4You/Eastsheen/Mefferts/FangShi-ShuangRen (6 families, aside from the
calibration case). Every one of these lanes ran and documented both §3.6a checks (an archived
retailer prefix sweep and a non-US/English retailer check) and recorded negative results
explicitly rather than by omission. This is the majority of the corpus, and it is clean.

**2b. Cyclone Boys / Maru — six named products with no family, found and reported, never rolled
up.** `research/qc/pass3-b2-agent-c-cycloneboys-maru.md`'s own `/products/cyclone*` sweep (53
URLs) and Cubezz full-domain sweep surfaced, and its own "Candidates rejected" and "Escalations"
sections explicitly name: **Cyclone Boys FeiHong, FeiXuan, XuanFeng, JisuZhiYun, JisuZhiFeng**
(the wiki's own "older models" list, corroborated as real retailer SKUs this pass) and **FeiKu
3x3 (Tiled)**; and, from Maru, **ShenLan Luminous 3x3x3** (cubezz `Buy-3972/3981/3983`, 2015),
**Maru Maze 3x3x3** (cubezz `Buy-4252/4261`), and a **Maru Mini 3x3 (30mm) / Mini 3x3 Keychain**
line. The lane report is explicit: "real, named products with no frozen family to attach to...
Flagged for a future family-enumeration pass, not mutated into new families here." **This never
reached `pass3-progress.md`'s escalation table or the remediation ledger.** Only the two later
batches' finds (FangShi, HaiTun) did.

**2c. ShengShou YuFeng and ShengShou Crazy 3x3 — a self-flagged "IMPORTANT ESCALATION" that has
no home anywhere else in the archive.** `data/sources/thecubicle-shengshou-products-prefix-2026.yml`
(a full, non-truncated 474-URL CDX sweep of `thecubicle.com/products/shengshou*`) states in its
own `reliability_note`, verbatim: *"ShengShou YuFeng (a magnetic-core/maglev-marketed flagship
3x3, first captured 2023, still selling in 2025) and ShengShou Crazy 3x3 (a shape-mod line) are
both demonstrably real, currently-sold ShengShou 3x3 product lines with NO corresponding family
record in data/families/... this is recorded here and in this agent's report as a finding for
pass-2 re-opening, not acted on."* **The report it refers to does not exist.** See §3 below —
this is the one lane in the corpus whose final write-up was lost to a rate-limit termination and
never reconstructed, so this escalation sat in a single source file's `reliability_note` and
propagated nowhere: not to `pass3-progress.md`, not to the remediation ledger, not to any
`research/qc/*.md` file I could find. I grepped the entire repository for "YuFeng" and
"shengshou-crazy" outside this one source file: **zero other hits.**

**2d. DaYan Crazy Cube — named by DaYan's own tier-1 official site, never chased at any tier
since.** `data/sources/dayancube-official-2013.yml` (tier 1, `manufacturer_official`, already in
the archive and cited elsewhere) lists DaYan's 2013 product range verbatim: *"Dayan 2X2, Dayan
Crazy Cube, DaYan II GuHong, DaYan III LingYun, DaYan IV LunHui, DaYan V ZhanChi, Dayan VI
Panshi, DaYan Gem Cube, Dayan Bermuda Cube, DaYan Megaminx, DaYan+MF8 4x4."* Eight of these eleven
names became the eight frozen DaYan families. Three did not: **Gem Cube** and **Bermuda Cube**
are independently confirmed non-3×3×3 by a later tier-2 source
(`thecubicle-dayan-collection-2025`'s own excerpt explicitly lists them under "Non-3x3x3 items...
excluded from this archive's scope") — correctly rejected, not a gap. **"Dayan Crazy Cube" is
never mentioned again anywhere in the archive** — not excluded as non-3×3×3, not confirmed as
3×3×3, not searched for at any retailer. I checked: no `data/sources/*.yml` file, no Pass 3
report, and no `dayan-*` model/family file mentions "Crazy" in connection with DaYan. This is a
genuine tier-1-named product with zero downstream disposition either way. The precedent for what
this kind of product *could* become already exists in the archive at `conditional`/
`reference_only` scope class (`calvins-crazy-3x3`, `mf8-crazy-3x3x3`), so "Crazy Cube" is not
automatically out of scope by name alone — it needs the same treatment those two families got,
which nobody has given it.

**2e. Zero-family / zero-model manufacturers as a signal (Query 3).** I re-verified all eight
zero-family manufacturers (`zcube`, `verypuzzle`, `limcube`, `xinlexin`, `hellocube`,
`cubetwist`, `ninja`, `lanlan`) against `pass2-taxonomy-challenge.md`'s own §E audit and
`pass2-structural-audit.md`'s S14 follow-up. **All eight are resolved to a documented standard.**
`lanlan` was the one flagged as under-evidenced (a single tier-4 source, no retailer sweep) in
the taxonomy-challenge pass, but this was independently closed before Pass 3 began: a 59-slug,
99-capture `thecubicle.com/products/lanlan*` sweep found every "3x3"-named LanLan slug to be a
shape mod, gear cube, 3×3×2, or 1×3×3 — a standard 3×3×3 was searched for and not found. No open
zero-family question remains. The `kind: service` manufacturers with zero families
(`cubicle-labs`, `picube`, `saocube`, `speedcubeshop`, `thecubicle`) are a documented,
DATA_MODEL §1.3-mandated structural outcome, not a gap — see Query 4 below, this is directly
relevant to Cubelelo.

The three zero-*model* families (`yuxin-3x3`, `yuxin-water`, `cyclone-boys-metallic-3x3`) are
each individually and rigorously documented (multi-channel sweeps, explicit "swept, nothing new
found" for the first two; an affirmative tier-2 statement that the third is a coating, not a
model, for the last). `cyclone-boys-metallic-3x3` is a genuine, separately-escalated *family-
boundary* defect (Pass 2 over-split a coating treatment into its own family, leaving it
structurally unable to ever receive a variant — see
`research/notes/models/cyclone-boys-metallic-3x3-zero-model.md`), but it is the opposite failure
mode from the one this pass is hunting (over-splitting, not a missing family), so I record it
here for completeness without adding it to the ranked table.

### Query 4 — Cubelelo "Drift" and the retailer-house-brand precedent (C-B1)

I established the archive's actual, already-applied precedent rather than inventing one:
**`agent-d-global-second-order-audit.md`'s own "Ruled out" section states it explicitly** —
`kind: service` manufacturers with zero families (`cubicle-labs`, `picube`, `saocube`,
`speedcubeshop`, `thecubicle`) are "not a coverage gap: DATA_MODEL §1.3 defines a servicer's
products as variants of the *base* manufacturer's model via `modified_from`, not as families of
the servicer's own design. Zero families is the correct structural outcome for `kind: service`."
DATA_MODEL §1.3 and §4.3 confirm this directly: a servicer is a `manufacturer` record with
`kind: service`, and what it sells is recorded as a *variant* (with a `service` block and
`modified_from`) of the base model, never as a new family.

**Applying the precedent to Cubelelo:** if "Drift" turns out to be a house brand of
serviced/rebadged OEM cubes (the same shape as TheCubicle's Cubicle Custom/Premium tiers or
SpeedCubeShop's Cosmic/Supernova/UniCube/SCS tiers, both already `kind: service` with zero
families), then adding Cubelelo to the register would correctly add **zero families** — this is
an **entity gap, not a family gap**, and the archive's own structure already knows how to
represent it once the entity exists. If, on the other hand, Drift's ~60 SKUs are original
tooling commissioned specifically for Cubelelo (not modifications of another maker's cube), the
precedent does not apply and a genuine family gap would exist underneath the entity gap. **This
distinction is exactly what `agent-c-swift-block-methodology.md` and the ledger's `C-B1` entry
both already flag as unresolved** ("not yet verified whether Drift products are 3x3s in scope,
or whether Cubelelo manufactures versus rebadges"), and nothing in this session's mining resolves
it — I have no live-web tool in this session to check Drift's own product pages, so I record the
precedent analysis as the deliverable and leave the underlying factual question open, exactly as
the ledger already does. **Entities are frozen at 54 for this pass regardless of the answer**, so
this cannot be actioned even if resolved; it is recorded for the adjudicator.

### Query 5 — cross-brand / shared-tooling signals

- **FanXin 3x3 vs. FanXin Magnetic 3x3** (`pass3-b2-agent-d-rubiks-cluster.md`): the retailer's
  own copy calls the magnetic line "FanXin's first attempt at a magnetic puzzle" — i.e. a
  separate catalogue development, not a magnet-configuration option of the plain 3x3. Explicitly
  recorded as "escalation-adjacent, not acted on" because resolving it would require a family
  *merge*, which is a different failure mode (over-splitting) from what this pass is hunting.
  Not a missing family; noted for completeness.
- **MoreTry / platform question (P3-T3), GoCube-X ↔ Rubik's Connected X** (`pass3-b4-agent-c-
  identity.md`): thoroughly investigated, correctly resolved as "related products, shared
  platform, unconfirmed identical hardware" with **no relationship recorded** rather than a
  forced `rebrand_of`. This is a schema-vocabulary gap (no relationship type for cross-brand
  shared-manufacturing-platform claims), not a missing-family question.
- **ESCube `es3`/`air` naming tension** (P3-T2, same report): evidence points toward the two
  frozen families possibly being one family with two models (mirroring `particula-gocube`'s
  Basic/Edge/X structure). This is a **suspected over-split**, the opposite direction from a
  missing family, correctly not acted on (families frozen) and already escalated. Not added to
  my table (wrong failure mode for this mission), but worth the adjudicator's attention alongside
  `cyclone-boys-metallic-3x3` as a second known over-split.
- No lines were found attributed to one brand but actually manufactured by another beyond what
  the archive already documents (Particula/Rubik's Connected, XiaoMi/GiiKER retailer mislabeling)
  — both already correctly handled.

### Additional query I ran that was not in the brief: does every Batch-1 lane have a written
report, and does the absence of one correlate with lost findings?

Batch 1 (`pass3-progress.md`) claims four lanes — MoYu, QiYi+X-Man, DaYan, YJ+ShengShou — for 108
models. Only two lane reports exist (`pass3-agent-a-moyu.md`, `pass3-agent-b-qiyi.md`). **No
report was ever committed for DaYan or for YJ+ShengShou.** `git log` on `data/models/dayan/` and
`data/models/yj/` + `data/models/shengshou/` shows why: three of the nine commits that built
these three manufacturers' models are titled "...recovered after rate-limit termination,"
including the single commit `2dbbf16` that added **all 33 YJ+ShengShou models in one shot from
the main session**, not from "agent D" the way every other commit in that lineage is attributed.
The write-up step that every other lane completed (a final report documenting §3.6a compliance,
escalations, and rejected candidates) did not happen for this lane. **This is the direct
mechanism by which the ShengShou YuFeng/Crazy-3x3 escalation (§2c above) got lost**: it was
written into a source file's `reliability_note` by an agent whose session terminated before it
could write the report that would have carried the finding into `pass3-progress.md`.

I also checked whether YJ (paired with ShengShou in the lost lane) received the §3.6a discovery-
breadth checks at all, independent of the missing report: **no `cubelelo-yj-*` or `cubezz-yj-*`
source exists anywhere in the archive**, and no YJ model file's header comment mentions a non-US
retailer or a `youngjoecube.com/products/*` sweep (contrast every other lane, where this is
recorded either in the report or in the model files themselves, including the ShengShou half of
this same lane, which *does* have both `thecubicle-shengshou-products-prefix-2026` and
`cubelelo-shengshou-products-prefix-2026`). **YJ is the one manufacturer in the entire corpus
with zero recorded §3.6a compliance of any kind** — not a negative result, an absent one, which
RESEARCH_SPEC §3.6a itself says must be "treated as not searched, never as nothing there."

---

## 2. Ranked candidate table

| # | Candidate | Manufacturer | Classification | Confidence it is real & unfamilied | Would matter to Pass 4 if unresolved |
|---|---|---|---|---|---|
| 1 | ShengShou YuFeng (magnetic-core/maglev 3x3, currently sold) | shengshou | **credible candidate needing research** | High — self-flagged tier-2 escalation, currently sold, never disposed of | High — a currently-sold flagship line has no model tree at all |
| 2 | ShengShou Crazy 3x3 (shape-mod line) | shengshou | **credible candidate needing research** | Medium-high — same source, real SKU, but may resolve to `conditional`/`reference_only` like `mf8-crazy-3x3x3` rather than `core` | Medium |
| 3 | DaYan Crazy Cube | dayan | **credible candidate needing research** | Medium — named by DaYan's own tier-1 2013 site, never checked at any retailer since; genuinely could be non-3x3x3 (unresolved either way) | Medium — precedent exists (`calvins-crazy-3x3`) for exactly this shape |
| 4 | Cyclone Boys FeiHong / FeiXuan / XuanFeng / JisuZhiYun / JisuZhiFeng / FeiKu (Tiled) | cyclone-boys | **credible candidate needing research** (six names, likely more than one real family among them) | Medium-high — corroborated as real retailer SKUs this pass, wiki names them as a coherent "older models" cohort | Medium — discontinued but a documented, non-trivial slice of one manufacturer's lineage |
| 5 | Maru ShenLan Luminous 3x3x3 / Maru Maze 3x3x3 / Maru Mini 3x3 (30mm) / Mini 3x3 Keychain | maru | **credible candidate needing research** | Medium — real cubezz/TheCubicle SKUs, Mini/Keychain sizes may be novelty-tier | Low-medium |
| 6 | Cubelelo "Drift" house brand | (unregistered; entity gap) | **credible candidate needing research — entity-level, family status conditional on unresolved fact** | Medium (existence of the brand is certain; whether it needs families is not) | Low for Pass 4 directly (entities frozen too), but resolves the open C-B1 question |
| 7 | Missing DaYan/YJ+ShengShou lane report + zero §3.6a compliance for YJ specifically | dayan, yj | **process finding, not a product candidate** | High that the audit trail is incomplete | High as a precedent: any other manufacturer whose sweep never happened would look identical to a genuine zero |
| 8 | QiYi Black Mamba V3 | qiyi | **weak lead** | Low — single tier-4 wiki mention, explicitly framed as pre-dating QiYi's speedcube era (likely pre-scope by date) | Low |
| 9 | FanXin fruit/animal-shaped 3x3 catalogue | fanxin | **weak lead** | Low — unchased since Pass 1, plausibly all non-WCA shape mods out of scope by RESEARCH_SPEC §2.4 unless individually significant | Low |
| 10 | ShengShou Rainbow / Tank / Metal-Cube / Gem 3x3 novelty SKUs | shengshou | **weak lead** | Low — explicitly "not chased this pass" in the same source as #1/#2, likely colourway/novelty variants below family threshold | Low |
| — | FanXin 3x3 vs FanXin Magnetic 3x3 (possible shared tooling) | fanxin | **rejected as a "missing family" — wrong failure mode (over-split candidate, not absence)** | n/a | Low, out of this mission's scope |
| — | ESCube `es3`/`air` naming tension (P3-T2) | escube | **rejected as a "missing family" — same, an over-split candidate (already escalated)** | n/a | Medium, but not this pass's question |
| — | `cyclone-boys-metallic-3x3` zero-model family | cyclone-boys | **rejected as a "missing family" — opposite defect, already fully escalated** | n/a | Already tracked |

Query 1 (register cross-check) and the eight zero-family manufacturers (Query 3) are **both
genuinely negative** and are not represented in the table above beyond what is stated in §1.

---

## 3. The question that actually matters

**(b) — TARGETED BLIND SPOT, and it is precise enough to name.**

The evidence does not support (a). FangShi and HaiTun are not isolated: mining the corpus
surfaced four to six further real, named, retailer-documented 3×3 product lines with no family
(ShengShou ×2, DaYan ×1, Cyclone Boys ×6, Maru ×4 — treating the last two as one candidate each
in the ranked table but they are genuinely six-plus distinct product names), most of which were
already found and written down by the individual Pass 3 researcher who touched that manufacturer
— and then never made it into `pass3-progress.md`'s tracking table, which currently shows only
two open findings when the corpus actually supports at least four to six.

The evidence does not cleanly support (c) either, because the pattern is not universal: the
majority of the corpus (MoYu, QiYi+X-Man, YuXin, the smart-cube cluster, Rubik's/FanXin/KungFu/
Calvin's/WitEden, the MoYu sub-brand cluster, MF8/HuaMeng/ESCube, QJ/Cube4You/Eastsheen/
Mefferts) ran the full §3.6a discovery-breadth protocol and came back genuinely clean. The
122-family taxonomy is not broadly unsafe; it is unsafe in one identifiable corner.

**The corner, named precisely:** every hit (ShengShou, DaYan, Cyclone Boys, Maru) is a
**pre-2018-era, high-historical-SKU-count Chinese manufacturer whose own official web presence is
dead, squatted, or defaced**, where the retailer-sweep discovery method (§3.6a) was, in each
case, being run for the genuinely first time at Pass-3-model-enumeration depth. Manufacturers of
the same general shape whose sweep actually completed and came back negative (QJ, Cube4You,
Eastsheen, Mefferts, LanLan, the seven other zero-family manufacturers) show this is not
automatic — it is specifically manufacturers with a **long back-catalogue** (DaYan founded 2004,
ShengShou and Cyclone Boys both pre-2015, Maru similarly early) where a decade-plus of
discontinued lines is exactly the kind of thing a two-retailer, English-language sweep misses
unless it is run exhaustively (a *full* `/products/`-prefix or domain-wide CDX sweep, not a
narrower per-family or collection-page crawl) — and where, in DaYan's specific case, the earliest
products (2011-2013) predate even the retailers this project uses, and are recoverable, if at
all, only from the manufacturer's own contemporaneous site capture or community forum threads
from that era, the same technique Batch 4 had to use for `diansheng-type-e` and
`diansheng-stickerless-3x3`.

**Compounding, and independently real: a process gap in how findings are rolled up, not just how
they are found.** The Cyclone Boys/Maru findings and the ShengShou findings were not lost because
nobody looked — they were found, by the researcher assigned to that exact manufacturer, using
the exact method the methodology prescribes. They were lost because (a) `pass3-progress.md`'s
escalation table was evidently populated from the two most recent batches' reports rather than
re-derived from every lane's own "Escalations" section, and (b) one lane's report was never
written at all, because its session was terminated by a rate limit and the recovery commit
restored the data but not the write-up. Any future multi-agent pass that hits the same rate-limit
termination pattern will reproduce the same failure mode, invisibly, unless the roll-up step is
made to re-scan every lane's own report/source `reliability_note`s rather than trusting a running
tally.

**Proposed methodology amendment**, for the adjudicator's consideration rather than applied here:

1. Before Pass 4 begins, run a full (not per-family-scoped) `/products/`-prefix or domain-wide
   CDX sweep of at least one US/English and one non-US/English retailer against every
   manufacturer whose `website` attestation is `unknown` or notes a dead/squatted domain — this
   is a short, enumerable list (`data/manufacturers/*.yml` where `/website` is unset or flagged),
   not a re-sweep of the whole register. DaYan and YJ specifically need this because their lane
   never got it at all.
2. Add a standing rule that a lane's escalations/candidates are not considered closed-out until
   they appear in `pass3-progress.md` (or its Pass-4-era successor) by their own name, not by
   batch-level summary — and that a lane whose final report is missing is itself an open item,
   not a silent gap.
3. Treat "DaYan Crazy Cube" specifically as a test case for whether pre-2014 tier-1
   manufacturer-site product names need a dedicated (not retailer-dependent) verification path,
   since the retailer-sweep method structurally cannot see what no retailer this project uses
   ever carried.

---

## Machine-readable summary

```yaml
candidates:
  - name: "ShengShou YuFeng"
    manufacturer: shengshou
    classification: credible_candidate_needing_research
    confidence: high
    evidence:
      - data/sources/thecubicle-shengshou-products-prefix-2026.yml
    blocks_pass4: true

  - name: "ShengShou Crazy 3x3"
    manufacturer: shengshou
    classification: credible_candidate_needing_research
    confidence: medium_high
    evidence:
      - data/sources/thecubicle-shengshou-products-prefix-2026.yml
    blocks_pass4: false

  - name: "DaYan Crazy Cube"
    manufacturer: dayan
    classification: credible_candidate_needing_research
    confidence: medium
    evidence:
      - data/sources/dayancube-official-2013.yml
      - data/sources/thecubicle-dayan-collection-2025.yml
    blocks_pass4: false

  - name: "Cyclone Boys FeiHong / FeiXuan / XuanFeng / JisuZhiYun / JisuZhiFeng / FeiKu (Tiled)"
    manufacturer: cyclone-boys
    classification: credible_candidate_needing_research
    confidence: medium_high
    evidence:
      - research/qc/pass3-b2-agent-c-cycloneboys-maru.md
    blocks_pass4: false

  - name: "Maru ShenLan Luminous 3x3x3 / Maru Maze 3x3x3 / Maru Mini 3x3 (30mm) / Maru Mini 3x3 Keychain"
    manufacturer: maru
    classification: credible_candidate_needing_research
    confidence: medium
    evidence:
      - research/qc/pass3-b2-agent-c-cycloneboys-maru.md
    blocks_pass4: false

  - name: "Cubelelo 'Drift' house brand"
    manufacturer: null
    classification: credible_candidate_needing_research
    confidence: medium
    evidence:
      - research/qc/agent-c-swift-block-methodology.md
      - research/qc/pass2-remediation-ledger.yml#C-B1
      - research/qc/agent-d-global-second-order-audit.md
    blocks_pass4: false
    note: >-
      Entity-level gap primarily; family-level status depends on an unresolved fact (original
      tooling vs. serviced/rebadged OEM cubes) this session had no live-web tool to check.

  - name: "Missing DaYan/YJ+ShengShou Pass-3 lane report; zero recorded 3.6a compliance for YJ"
    manufacturer: [dayan, yj]
    classification: process_finding
    confidence: high
    evidence:
      - "git log -- data/models/dayan data/models/yj data/models/shengshou (three rate-limit-termination-recovery commits)"
      - "absence of any cubelelo-yj-* or cubezz-yj-* source, and absence of any 3.6a note in data/models/yj/*.yml"
      - research/qc/pass3-progress.md
    blocks_pass4: false

  - name: "QiYi Black Mamba V3"
    manufacturer: qiyi
    classification: weak_lead
    confidence: low
    evidence:
      - research/qc/pass3-agent-b-qiyi.md
    blocks_pass4: false

  - name: "FanXin fruit/animal-shaped 3x3 shape-mod catalogue"
    manufacturer: fanxin
    classification: weak_lead
    confidence: low
    evidence:
      - research/qc/pass3-b2-agent-d-rubiks-cluster.md
    blocks_pass4: false

  - name: "ShengShou Rainbow / Tank / Metal-Cube / Gem 3x3 novelty SKUs"
    manufacturer: shengshou
    classification: weak_lead
    confidence: low
    evidence:
      - data/sources/thecubicle-shengshou-products-prefix-2026.yml
    blocks_pass4: false

  - name: "FanXin 3x3 vs FanXin Magnetic 3x3 (possible shared tooling / over-split)"
    manufacturer: fanxin
    classification: rejected
    confidence: n/a
    evidence:
      - research/qc/pass3-b2-agent-d-rubiks-cluster.md
    blocks_pass4: false
    reason: "Wrong failure mode for this mission — a suspected over-split (merge candidate), not an absence."

  - name: "ESCube es3/air naming tension (P3-T2)"
    manufacturer: escube
    classification: rejected
    confidence: n/a
    evidence:
      - research/qc/pass3-b4-agent-c-identity.md
    blocks_pass4: false
    reason: "Already escalated; an over-split candidate, not a missing family."

  - name: "cyclone-boys-metallic-3x3 zero-model family"
    manufacturer: cyclone-boys
    classification: rejected
    confidence: n/a
    evidence:
      - research/notes/models/cyclone-boys-metallic-3x3-zero-model.md
    blocks_pass4: false
    reason: "Opposite defect (over-split, coating treated as its own family); already fully escalated."

verdict: b
verdict_statement: >-
  Targeted blind spot, not isolated (a) and not fully material (c). The corner: pre-2018-era,
  high-SKU-count Chinese manufacturers with dead/squatted/defaced official web presence, where
  the required full-breadth retailer sweep was being run for the first time at Pass 3 depth.
  Compounded by an independent process gap: lane-level escalations (Cyclone Boys/Maru, ShengShou)
  were found correctly but never rolled up into pass3-progress.md's tracking table, and one lane
  (DaYan/YJ+ShengShou) lost its final report entirely to a rate-limit termination, leaving YJ as
  the one manufacturer in the corpus with zero recorded 3.6a compliance of any kind.
```
