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
