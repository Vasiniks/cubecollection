# Pass 2 adjudication — main-session structural audit

Author: main session (Opus), 2026-09-03. Repository state verified at HEAD `27f402d`.

This file records **cross-cutting structural findings** obtained by querying the whole archive
programmatically. It is deliberately separate from the three specialist reports
(`pass2-taxonomy-challenge.md`, `pass2-source-independence.md`, `pass2-entity-identity.md`),
which examine individual issues. Findings here are of a kind no per-issue review surfaces:
they are only visible when the archive is queried as a whole.

Every number below was produced by running against the live records, not read from a note.

---

## 0. Verified counts (authoritative, from the repository)

| Entity | Count |
|---|---|
| manufacturers/entities | 54 (38 manufacturer, 11 sub_brand, 5 service) |
| families | 122 |
| models | 48 (gan 40, monster-go 5, swift-block 3) |
| variants | 104 (gan 92, monster-go 8, swift-block 4) |
| sources | 283 |
| people | 2 |
| events | 3 |

`npm run check` at `27f402d`: **all green**, one pre-existing advisory warning
(rule 25, `data/variants/gan/gan-ui-12-sp/standard.yml`).

Note on a common description: models/variants are often called "the GAN pilot only". That is
correct in *scope* terms but imprecise in *entity* terms — the 48 models span three entity ids
(`gan`, `monster-go`, `swift-block`), the latter two being GAN sub-brands.

---

## S1 — CRITICAL: 21 of 122 families rest solely on a single Tier-4 source

**This is the single most important structural finding of the audit.**

Tier is not stored per source; it is **derived from `kind`** via `vocab/source-kinds.yml`
(`sourceTier()` in `scripts/lib/archive.mjs`), with an explicit `tier:` field as an override
(used by exactly one source, `companies-house-rubiks-brand-ltd`). Under that mapping
`kind: wiki` → **tier 4**.

Querying every family's attestation sources and taking the best (lowest) tier available:

| Best available tier | Families |
|---|---|
| Tier 1 | 25 |
| Tier 2 | 76 |
| Tier 3 | 0 |
| **Tier 4 or worse** | **21** |

All 21 are also **single-source**. Each rests on exactly one Speedsolving wiki page:

- Cyclone Boys (5): `cyclone-boys-feichi`, `cyclone-boys-feijue`, `cyclone-boys-feiwu`,
  `cyclone-boys-metallic-3x3`, `cyclone-boys-mini-3x3`
- DianSheng (4): `diansheng-3x3-m`, `diansheng-solar-s3m`, `diansheng-stickerless-3x3`,
  `diansheng-type-e`
- YJ (3): `yj-chilong`, `yj-ruilong`, `yj-sulong`
- YuXin (3): `yuxin-3x3`, `yuxin-fire`, `yuxin-water`
- MF8 (2): `mf8-crazy-3x3x3`, `mf8-legend`
- DaYan (2): `dayan-taiyan`, `dayan-xiangyun`
- MoYu (1): `moyu-ai`
- QiYi (1): `qiyi-bullfight`

**Why this matters.** The project's own source hierarchy admits tier 4 as "leads or weak
corroboration only". These 21 families were admitted on evidence the methodology says is not
sufficient as sole support. They are 17% of the family layer.

**Why validation does not catch it.** The tier rules are conditional on *claimed confidence*,
not on existence. Rule 9 fires only for `confirmed`; rule 12 only rejects tier 5. A family
asserting nothing above `reported` on a lone tier-4 source is schema-valid. The archive is
therefore internally consistent and simultaneously under-evidenced in a way no check reports.

**Pass-3 hazard.** Each of these is a family whose *existence and boundary* is unverified.
Enumerating models beneath one multiplies an unverified premise. Two are specifically exposed:
`mf8-crazy-3x3x3` is almost certainly non-WCA, and rule 15 requires `scope_class: conditional`
to cite **at least one tier 1–3 source** — which this family does not currently have anywhere
in its evidence. Pass 3 on that family will be *blocked by validation*, not merely weak.

**Recommendation.** Do not treat these as errors to delete. Treat them as a **corroboration
backlog**: before or during Pass 3, each needs one tier 1–2 source (manufacturer page or
retailer listing) or an explicit decision to hold it at `reported`. Priority: the 4 DianSheng
and 5 Cyclone Boys clusters, where a single wiki page is currently carrying an entire
manufacturer's family layer.

---

## S2 — HIGH: a review flag's premise has drifted from the data (`diansheng-mscube`)

The standing review flag states this family "was ultimately found only through weak evidence"
and rests on "a tier-4 source only".

**Verified against the record — that is no longer accurate.** `data/families/diansheng-mscube.yml`
cites two sources:

- `speedsolving-wiki-diansheng-products` — `kind: wiki` → tier 4
- `thecubicle-mscube-ms3l-3x3-standard-product` — `kind: retailer` → **tier 2**

Its attestations are recorded `reported` ×2 and `uncertain` ×2 — appropriately cautious, and
better-evidenced than the flag asserts.

The *substantive* question the flag raises (is MsCube a DianSheng line, an independent maker,
or a retailer designation?) remains genuinely open and is under primary-source investigation.
But the flag's stated evidentiary basis should be corrected so a future reader does not
downgrade the record against a premise that no longer matches the file.

---

## S3 — MEDIUM: schema cannot express `scope_class` at family level (by design), but 9 families need it

`scope_class` is a **model and variant** field (required on both) and is deliberately **not** a
family property — `schema/family.schema.json` defines only: `id, entity, manufacturer_id, name,
aliases, introduced, discontinued, positioning, description, successor_family_id, former_ids,
status, attestations`.

So the repeated deferral of scope decisions to Pass 3/4 is **correct per schema design**, not an
oversight. `scope_class` appears in 11 family files purely as prose commentary.

The consequence is nonetheless a real Pass-3 gate. These families are wholly or largely
non-WCA-legal, and *every* model created beneath them will require `scope_class` plus, if
`conditional`, a `scope_justification` attested to a tier 1–3 source (rule 15):

`maru-nano`, `calvins-crazy-3x3`, `calvins-crazy-mirror-3x3`, `calvins-bandaged-3x3-maze-300`,
`witeden-mixup-3x3`, `witeden-super-3x3x3`, `witeden-camouflage-3x3`, `mefferts-kokonotsu`,
`mf8-crazy-3x3x3`.

Eight of the nine cite a tier-2 TheCubicle page and so can satisfy rule 15. **`mf8-crazy-3x3x3`
cannot** — see S1.

**No schema change is proposed.** The existing design handles this correctly; what is missing is
a *policy decision* on conditional admission, which is a human call and is listed as a Pass-3
prerequisite rather than a defect.

---

## S4 — MEDIUM: 58 of 122 families are single-source

Independent of tier. 37 of these have a tier 1–2 source and are materially fine; the 21 in S1
are the acute subset. Recorded here so the overall evidentiary shape of the layer is explicit:
roughly half the family layer rests on one document.

---

## S5 — LOW: field-completeness gaps

- **`status`**: all 122 families are `drafted`. None has been promoted to `sourced` or
  `published`. Consistent with an unreviewed layer; worth noting that no family has yet passed
  the archive's own promotion gate.
- **`positioning` unset (4)**: `moyu-hualong`, `moyu-dianma`, `moyu-liying` — already known —
  **plus `gan-357`**, which is *not* on the standing review list and sits inside the GAN pilot,
  the most heavily-built part of the archive.
- **`introduced` unset (29)**: including 8 of the 9 conditional-scope families above. Not a
  defect (absence correctly means "not searched" rather than "not found"), but it means the
  chronological spine the exhibition depends on is absent for roughly a quarter of families.

---

## S6 — Structural risk in tier derivation (for the source auditor to confirm)

Because tier is derived from `kind`, **any source mis-kinded as `manufacturer_official`
silently becomes tier 1**, which is the strongest possible evidence and the only kind that
alone satisfies rule 9 for a `confirmed` claim. 101 of 283 sources carry that kind.

Current distribution: `retailer` 145, `manufacturer_official` 101, `wiki` 33, `press` 3,
`marketplace` 1.

This is a *systemic* amplification path: one mis-kinded record upgrades every claim citing it.
Flagged to the source-independence audit for verification; not asserted here as a defect.

---

## S7 — HIGH: the "GAN 356" name is split across three families (22 models affected)

Querying which models actually sit under each GAN family exposes a boundary question that is
invisible when the families are read one at a time:

| Family | Models | Sample model ids |
|---|---|---|
| `gan-356` | 13 | `gan-356-air-s`, `gan-356-m`, `gan-356-maglev`, … |
| `gan-i-series` | 4 | **`gan-356-i`**, **`gan-356-i2`**, `gan-356-i3-v2`, `gan-i4` |
| `gan-i-carry-series` | 5 | **`gan-356-i-carry`**, **`gan-356-i-carry-2`**, **`gan-356-i-carry-e`**, **`gan-356-i-carry-s`**, `gan-i-carry-4` |
| `gan-flagship-series` | 8 | `gan-flagship-11` … `gan-flagship-17` |
| `gan-ui-series` | 5 | `gan-ui-12-freeplay`, `gan-ui-16-maglev-max`, … |
| `gan-v100` | 2 | `gan-v100-leap`, `gan-v100-maglev` |
| `gan-354` | 2 | `gan-354-m`, `gan-354-m-v2` |
| `gan-357` | 1 | `gan-357-original` |

**Six of the nine models in `gan-i-series` and `gan-i-carry-series` are named "GAN 356".**

So the archive currently holds two incompatible readings simultaneously:

- `gan-356` is treated as a **family** (a numbered product line), yet
- products whose own manufacturer-given name is "GAN 356 i" / "GAN 356 i Carry" are filed
  **outside** it, in smart-cube families.

Both readings are defensible in isolation. Either "356" names a hardware platform and the smart
variants belong inside it, or the smart line is its own lineage and the "356" in its name is
vestigial. What is *not* defensible is holding both without stating the rule.

Compare the treatment of `gan-flagship-series`, where GAN11–GAN17 were deliberately kept as one
family *despite* changing numbers. The stated reasoning there — a manufacturer-drawn navigation
grouping outweighs numeric change — appears to be applied inconsistently: numeric identity is
treated as non-decisive for the flagship line but decisive for 356 vs i vs i-carry.

**Downstream impact.** This is the highest-impact open boundary in the archive, because it is
the only part where models are already built: 22 models and their variants are filed by this
rule. Changing it later means re-parenting real records, not just editing a family.

**This is a question for adjudication, not a defect to fix.** Recorded here so the specialist
review answers it against GAN's own site organisation rather than against retailer categories.

---

## S8 — Confirmed sound: the 22 generic `<maker>-3x3` families are not placeholders

22 families carry a bare `<manufacturer>-3x3`-style id. That pattern is the archive's main
placeholder risk, so it was checked directly rather than assumed.

Sampling their header comments shows they are deliberate and documented — e.g. `yuxin-3x3`
("YuXin's original, unnamed-beyond-the-brand 3x3, its first product in the category"),
`shengshou-3x3` ("first, unnamed-beyond-the-brand 3x3, long discontinued"), `fanxin-3x3`
("base, unnamed-beyond-the-brand standard 3x3"). A real product with no series name is a
legitimate family, not a placeholder. **No action needed.**

One forward risk worth stating: an "unnamed base" family is a *bucket*, and in Pass 3 it can
silently absorb unrelated products that merely lack a better home. These 22 need an explicit
filing rule before model enumeration — specifically that a model may be filed under a generic
family only when no named lineage claims it, and never merely because its name is unknown.

---

## S9 — Referential integrity: clean

Checked programmatically across all 122 families:

- **0** broken `manufacturer_id` references
- **0** broken `successor_family_id` references (4 families set one)
- **0** family-name collisions after normalisation
- **0** orphan `family_id` values on the 48 models
- 17 manufacturers have exactly one family; all were confirmed to be genuine sole lineages
  rather than rule-29 duplicates (that exemption is already lineage-aware)

**111 of 122 families currently have zero models** — that is the size of the Pass 3 queue.

---

## S10 — HIGH, CORRECTED AND FIXED: Eastsheen preservation gap (not a fabricated quotation)

The independent taxonomy review reported that the sentence *"East Sheen does not produce 3x3
cubes"* — quoted three times in `data/families/eastsheen-3x3.yml` and the Pass 2 log — **does
not appear in the cited source's preserved excerpt**.

**The first half is correct; the framing is not.** Verified in two steps:

1. Read `data/sources/speedsolving-wiki-eastsheen.yml` in full. Its `excerpt` covers the
   infobox, the opening paragraph, and a note about weight and the purple/pink face. It
   contains **no** sentence about 3x3 production. Confirmed.
2. Fetched the live wiki page. The sentence **is genuine and appears verbatim**: *"East Sheen
   does not produce 3×3 cubes."* The page lists only 2x2 (Types A, C, E, M), 4x4 and 5x5 (Types
   A, C, E, M, P), Mini cubes and Multi cubes — no 3x3x3 of any kind.

So this was **not** a fabricated or misattributed quotation. It was a **preservation gap**: the
source uses `preservation_method: excerpt` with **no `archive_url`**, so the excerpt *is* the
preservation — and the captured excerpt omitted the one sentence the archive leaned on hardest.
The archive was citing evidence its own preservation did not hold.

Recording the distinction precisely matters: a fabricated quotation would be the most serious
defect class this archive can have (PRODUCT.md forbids fabrication outright), whereas an
incomplete excerpt is a preservation-discipline failure. Conflating them would misstate the
health of the layer.

**Correction applied** (narrow, decisive, no taxonomy change): the excerpt in
`data/sources/speedsolving-wiki-eastsheen.yml` now includes the verbatim sentence and the full
product listing, re-verified against the live page on 2026-09-03, with a `reliability_note`
recording what was missing, why it mattered, and that the sentence is genuine.

**Note on direction of error.** The omitted text is the strongest evidence *against*
`eastsheen-3x3` existing. The gap therefore worked against the archive's own family, not in
favour of it — this was sloppy preservation, not motivated reasoning. The substantive question
(did Eastsheen ever sell a standard 3x3, and was it an OEM/rebrand?) remains open and is
addressed in the entity-identity memo; the family stays at `reported` pending that.

**Systemic follow-up.** Any source with `preservation_method: excerpt` and no `archive_url` has
the same exposure: the excerpt is the whole evidence, so anything quoted from the page but not
captured is unsupported. The source-independence audit should quantify how many sources are in
that position.

---

## S11 — HIGH, VERIFIED AND FIXED: two records still rested `probable` on the catalogue artifact

The source-independence audit reported that `gan-354` and `gan-354-m` still rest on the
`Added: 2018-09-11` TheCubicle catalogue-migration artifact. **Verified and confirmed.**

**The artifact is now proven quantitatively**, not merely asserted: the literal string
`Added: 2018-09-11` occurs **29 times across 22 source records spanning 13 unrelated brands** —
CubeStyle, GAN, GuoGuan, GuoJia, KungFu, Maru, MoHuanShouSu, MoJue, NewIsland, QJ, SenHuan,
YanCheng, Z-Cube. One literal date cannot be the true per-product listing date for products
from thirteen different manufacturers.

**Nine records cite it. Seven were already handling it correctly:**

| Record | Pointer | Confidence | Verdict |
|---|---|---|---|
| `cubestyle-3x3` | `/introduced` | `uncertain` | correct — note says field "deliberately not used" |
| `mohuanshousu-chufeng` | `/introduced` | `uncertain` | correct |
| `senhuan-mars` | `/introduced` | `uncertain` | correct |
| `mojue-m3` | `/introduced` | `uncertain` | correct |
| `newisland-phoenix` | `/introduced` | `uncertain` | correct |
| `qj-candy-3x3` | `/introduced` | `uncertain` | correct |
| `qj-pillowed-3x3` | `/introduced` | `uncertain` | correct |
| **`gan-354`** | `/introduced` | **`probable`** | **contaminated — fixed** |
| **`gan-354-m`** | `/announced` | **`probable`** | **contaminated — fixed** |

The two contaminated records **predate the artifact's discovery**; every record written after it
refuses the field explicitly. This is a straightforward miss, not a methodological failure — and
it is worth stating that the archive's own later discipline is what made the two survivors
visible.

**Correction applied** (narrow, decisive, no taxonomy change): both downgraded `probable` →
`uncertain`, with the full quantified reasoning recorded in each attestation note. The 2018
values are **retained as weak upper bounds** — the products demonstrably existed by then — rather
than deleted, since removing them would lose real information. GAN's own product page states no
introduction date; a tier-1 date remains unfound.

**Why this one mattered more than the other seven.** `gan-354-m` is inside the built model layer.
An artifact date held at `probable` on a model is exactly the kind of value that propagates into
a chronological exhibition and is then very hard to trace back.

---

## S12 — HIGH, VERIFIED AND FIXED: a `confirmed` claim whose own note disowned it (`dayan-panshi`)

The source-independence audit reported an excerpt-vs-claim mismatch on
`data/families/dayan-panshi.yml` `/introduced`. **Verified and confirmed.**

The attestation was `confidence: confirmed`, citing two sources:

- `speedsolving-wiki-dayan-products` — `kind: wiki` → **tier 4**
- `dayancube-official-2013` — `kind: manufacturer_official` → **tier 1**

Its own note read: the 2013-08-05 capture is *"consistent with, though **not an independent
confirmation of**, the exact February 2013 date."*

So the record simultaneously asserted `confirmed` and admitted in prose that its only tier-1
source does not confirm the claim. The February month rests solely on a tier-4 wiki; the tier-1
manufacturer capture establishes only that the product existed **by August 2013** — an upper
bound on a different question.

**Why validation could not catch this.** Rule 9 requires a `confirmed` attestation to cite a
tier-1 source *or* two independent tier 1–2 sources. A tier-1 source **is** present, so the rule
passes **structurally**. Nothing in the toolchain can test whether the cited source actually
supports the specific sentence — that is a semantic judgement. This is the clearest instance in
the archive of a rule being satisfied in form but not in substance, and it is worth recording as
a general limitation rather than a one-off.

**Correction applied** (narrow, decisive): `confirmed` → `probable`, with the reasoning recorded
inline and the restoration condition stated (a tier 1–2 source giving the month). No source was
removed and no date changed — only the confidence now matches the evidence.

**Generalisation for the source audit backlog.** Any `confirmed` attestation that cites one
tier-1 source *plus* a tier-4 source deserves the same check: is the tier-1 source carrying the
claim, or merely present? This is a small, enumerable set and should be swept before Pass 3.

---

## S13 — CRITICAL DECISION REQUIRED: 111 attestations violate the archive's own confidence rule

Running the generalised sweep recommended in S12 produced two precise results.

### (a) The `dayan-panshi` shape is rare — only 5 instances, and 4 are sound

`confirmed` attestations citing a tier-1 **and** a tier-4 source together:

| Record | Pointer | Sources | Verdict |
|---|---|---|---|
| `dayan-panshi` | `/introduced` | T4 wiki + T1 (bound only) | **was wrong — fixed in S12** |
| `lanlan` | `/founded` | `lanlantoy-made-in-china-profile`=T1 + wiki=T4 | sound — T1 carries it |
| `mfjs` | `/kind` | `moyucube-official-home-2022`=T1 + wiki=T4 + `cuboss-mfjs-brand-page`=T2 | sound |
| `mfjs` | `/parent_id` | same as above | sound |
| `moyu` | `/country` | `moyucube-official-home-2022`=T1 + `baike-baidu-moyu`=T4 | sound |
| `x-man-design` | `/parent_id` | `theqiyi-about-us`=T1 + `qiyicube-storefront-2018`=T1 + wiki=T4 | sound — two T1 |

**`dayan-panshi` was the genuine outlier.** No further downgrades are warranted here, and saying
so matters: a mass-downgrade of this pattern would have damaged four correctly-evidenced claims.

### (b) 111 attestations rest **solely** on tier-4 sources

| Confidence | Count |
|---|---|
| `reported` | 107 |
| `probable` | 4 |
| **Total** | **111** |

This corroborates the source-independence audit's independent estimate (~110) from a different
method, across roughly 53 of 122 families. 32 of them are `/introduced` fields.

**This is not a matter of taste. It contradicts two written rules:**

- `vocab/confidence.yml` defines `reported` as *"**Tier 3 source**, uncontradicted and
  plausible"* — not tier 4.
- `RESEARCH_SPEC.md` line 103 defines tier 4 (*"marketplace listings, aggregators, unattributed
  wikis, marketing copy"*) as **"Corroborates only. Never establishes."**

By the archive's own definitions the correct value for a claim resting only on tier 4 is
`uncertain` (*"weak or single-source"*).

### The decision — and why I am not making it

There are **two defensible resolutions, and they lead to very different archives.**

**Option 1 — downgrade.** Move all 111 to `uncertain`. Faithful to the rules as written.
Consequence: ~53 families lose their `reported` standing, and roughly a quarter of the archive's
dates become explicitly weak. Honest, but it makes the chronological spine much thinner.

**Option 2 — reclassify the source.** Use the existing `tier:` override field (already present in
the schema and used once, by `companies-house-rubiks-brand-ltd`) to set the Speedsolving.com
per-manufacturer product-history pages to **tier 3**, with a written justification. This is
genuinely arguable: RESEARCH_SPEC line 102 defines tier 3 as *"named reputable reviewers,
**long-form community documentation**, forum threads with corroborating detail"* — and these
pages are long-form community documentation, maintained and revision-tracked. Tier 4's wording
targets *"unattributed wikis"*. Whether Speedsolving's curated product histories are
"unattributed wikis" or "long-form community documentation" is a real, unresolved question about
this specific source, not a loophole.

Under Option 2, `reported` becomes correct by definition for all 107, and no data changes.

**This is the single most consequential decision in the Pass 2 gate.** It is a policy call about
what the archive considers evidence — it changes the meaning of ~111 claims and the standing of
53 families either way. It is explicitly **not** the kind of narrow, decisive correction this
audit is authorised to apply unilaterally, so it is documented and left to the human.

**My recommendation, offered but not applied: Option 2, scoped narrowly.** The Speedsolving
per-manufacturer product-history pages are substantive, long-form, and revision-tracked, which
fits the tier-3 definition better than "unattributed wiki". But the override should be applied
**per source record with an individual justification**, never as a blanket rule for
`kind: wiki` — a short unattributed wiki stub genuinely is tier 4, and the distinction must
survive. Applying it narrowly also leaves S1's 21 single-tier-4-source families still flagged,
since promoting the tier does not create corroboration.

---

## S14 — RESOLVED BY DIRECT TEST: LanLan's zero-family finding was under-evidenced but is correct

The taxonomy challenge argued that `lanlan` was the **only one of eight zero-family conclusions
reached without a retailer prefix sweep** — the exact check that corroborated all seven siblings
— and was therefore plausibly a **D (evidence insufficient) recorded as an A (no in-scope family
exists)**. The wiki's own phrasing ("originally known for their standard cubes") made a genuine
3x3 line plausible.

**The gap was real. I ran the missing sweep rather than leaving it open.**

`npm run wayback -- prefix thecubicle.com/products/lanlan --limit 400` returned **99 captures
spanning 2019-07-18 to 2026-03-29, resolving to 59 distinct product slugs**, and the list was
**not truncated** (99 rows against a limit of 400, no truncation warning) — which matters,
because a truncated list would not have been evidence of absence.

**Result: the original conclusion is correct.** Every slug containing "3x3" is a non-standard
mechanism:

| Slug | What it actually is |
|---|---|
| `lanlan-3x3-diamond` | shape mod |
| `lanlan-3x3-geary-cube` | gear cube |
| `lanlan-3x3x2`, `lanlan-3x3x2-pie` | 3x3x2 — a different puzzle |
| `lanlan-ddr-pillowed-3x3-rhombohedron` | shape mod |
| `lanlan-gear-3x3-hexagonal-dipyramid` | gear/shape mod |
| `lanlan-super-floppy-1x3x3` | 1x3x3 |

The rest of the 59 are 2x2, 4x4, 5x5, 7x7, skewbs, gear puzzles, shape mods and the Void Cube.
**No standard 3x3x3 LanLan product appears anywhere.**

**Classification: A — no in-scope 3x3 family found** (previously A on weaker evidence; now
evidenced to the same standard as its seven siblings).

Evidence preserved as `data/sources/thecubicle-products-lanlan-prefix-2026.yml`, with the full
59-slug list, the non-truncation fact recorded explicitly, and a `reliability_note` stating the
honest limit: this is one retailer, so it raises the finding to its siblings' standard but
cannot prove LanLan never made a standard 3x3x3 for another market.

This is the model outcome for the gate: a specialist identified a methodological gap, the gap
was real, the test was cheap, and running it converted an assumption into evidence — in this
case confirming rather than overturning the original call.

---

## S15 — **CRITICAL / BLOCKING**: `theqiyi-about-us` is not a manufacturer source

The entity-identity research flagged that `theqiyi.com` may not be QiYi's real site. **Verified
directly, and confirmed. This is the most serious finding of the gate.**

### The evidence

Fetching `https://theqiyi.com/about-us.html` returns a footer reading, verbatim:

> *"QIYI is a participant in the Amazon Services LLC Associates Program, an advertising program
> designed to provide a means for sites to earn advertising fees by advertising and linking to
> Amazon.com © 2025 QIYI. All rights reserved."*

Plus: **no ICP filing number** (mandatory for a legitimate mainland-Chinese company site), no
contact address, no native checkout, products linking out to Amazon, and a 2025 copyright.

**A manufacturer does not run an Amazon affiliate programme to earn commission on its own
products.** This is an affiliate/content site that presents itself in QiYi's name.

Corroborating: the Speedsolving wiki gives QiYi's site as `qiyitoys.net` and its founding year as
**"unknown"** — while `theqiyi.com` asserts a specific "1998 Founded" narrative found nowhere
else.

### Why this is severe

The record is `kind: manufacturer_official`, which **derives to tier 1** — the strongest evidence
class, and the only one that alone satisfies rule 9 for a `confirmed` claim. This is precisely
the systemic amplification path predicted in S6, now observed in a real record.

`data/manufacturers/qiyi.yml` also records `website: "https://theqiyi.com/"` at `confirmed` —
i.e. the archive currently states that an Amazon affiliate site *is* QiYi's official website.

### Blast radius — measured, not estimated

Six `confirmed` attestations cite it **with no other tier-1 support** and would fail rule 9 if
its tier were corrected:

| Record | Pointer | Other sources | Rule 9 without it |
|---|---|---|---|
| `qiyi` | `/country` | none | **FAILS** |
| `qiyi` | `/founded` | none | **FAILS** |
| `qiyi` | `/website` | none | **FAILS** |
| `x-man-design` | `/kind` | none | **FAILS** |
| `x-man-tornado` | `/positioning` | none | **FAILS** |
| `x-man-tornado` | `/aliases` | none | **FAILS** |
| `qiyi` | `/kind` | `qiyicube-storefront-2018`=T1 | survives |
| `x-man-design` | `/parent_id` | `qiyicube-storefront-2018`=T1 | survives |

Also cited at lower confidence by `qiyi-valk` and in two other source records.

**The QiYi founding date (1998) and the entire "family of brands" corporate structure — the
evidence that X-Man Design is a QiYi sub-brand — currently rest on this source.**

### Why I did **not** apply the fix

Re-kinding it is decisive in principle but **not a narrow correction**: it breaks six `confirmed`
attestations across two manufacturer records and one family, turning `npm run check` red, and
Phase 18 requires the repository to be left green. It also needs replacement research (what *is*
QiYi's real domain — `qiyicube.com`, `qiyitoys.net`, or another?) that is beyond an audit pass.

Per the gate's own rule for ambiguous manufacturer relationships — *document first, adjudicate
deliberately* — it is recorded here in full rather than applied.

### Recommended remediation (in order)

1. **Re-kind `theqiyi-about-us`.** `kind: manufacturer_official` is factually false. The vocab
   has no "affiliate site" value; the honest route is the explicit `tier: 4` override (already
   supported, used by `companies-house-rubiks-brand-ltd`) with a written justification, since
   RESEARCH_SPEC tier 4 covers *"marketing copy without specifications"*.
2. **Downgrade the six orphaned `confirmed` attestations** to `uncertain`, or re-source them.
3. **Correct `qiyi.website`** — do not record an affiliate domain as the manufacturer's site.
4. **Re-source QiYi's founding year.** It is currently unsupported; the wiki says "unknown".
   Note `qiyicube-storefront-2018` (`qiyicube.com`, 2018 capture) appears genuine and survives as
   real tier-1 evidence for QiYi's own storefront and product lines.
5. **Re-verify `x-man-design` `/kind`** against a genuine first-party source. Its `/parent_id`
   survives independently on `qiyicube-storefront-2018`, so the QiYi→X-Man relationship itself is
   not in doubt — only the "sub brand" characterisation sourced from the affiliate page.

### Effect on the gate's verdict

This alone moves QiYi and X-Man Design — **11 families between them, including the disputed
`qiyi-valk` and `x-man-tornado`** — from "ready after minor corrections" to **blocked pending
correction**. The remaining ~111 families are unaffected.

There is one silver lining for `qiyi-valk`: the counter-evidence that made its attribution look
shaky (*"QiYi's own about-us page doesn't mention Valk"*) came **from this same unreliable
page**, and is now much weaker. The `manufacturer_id: qiyi` assignment is therefore *better*
supported than it appeared, resting on the genuine 2018 `qiyicube.com` storefront.
