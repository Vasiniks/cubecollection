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
