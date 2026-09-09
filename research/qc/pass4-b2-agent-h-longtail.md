# Pass 4 Batch 2 — Agent H — Longtail sub-brands (17 manufacturers, 35 models)

Status: IN PROGRESS. Skeleton committed first per mandatory instruction.

## Scope
fangshi (4) · huameng (3) · kungfu (3) · newisland (3) · fanxin (3) · guoguan (3) ·
escube (2) · guojia (2) · haitun (2) · qj (2) · senhuan (2) · cubestyle (1) · lefun (1) ·
mohuanshousu (1) · mojue (1) · pbcube (1) · yancheng (1)

findings-so-far: in progress — see per-manufacturer log below.

## Per-manufacturer log

### ESCube (2 models — escube-es3-v1, escube-air-v1) — DONE

Both models already carried Pass-3 descriptions documenting multi-configuration axes
(magnet count + coating), so this was the dense case the brief anticipated for this brand.

**escube-es3-v1** (3 variants — magnet count + coating axis, per SpeedCubeShop's own
"Version comparison" table on `speedcubeshop-es3-debut-brand-2025`):
- `escube-es3-v1--standard` — 48 magnets, no core magnets, frosted, 77.6g.
- `escube-es3-v1--8-core-magnets` — 64 magnets total, no coating change.
- `escube-es3-v1--20-core-magnets-uv` — 76 magnets total, UV exterior.
No new sources needed; all three rows are on the one already-cited page.

**escube-air-v1** (2 variants — magnet count axis, per a "Version: 20-Magnet Ball-Core /
8-Magnet Ball-Core" selector on `speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`,
corroborated for the 20-magnet option by `thecubicle-escube-air-3x3-20-magnet-ball-core`):
- `escube-air-v1--standard` (20-Magnet Ball-Core, matches the model's own eponymous config).
- `escube-air-v1--8-magnet-ball-core` (uncertain confidence — selector-only evidence, no
  dedicated page or second retailer, no spec figures).

**Materiality calls:** magnet-count/coating differences read as `magnet configuration`/
`coating` axis differences under DATA_MODEL's variant-materiality rule 1/5. Used
`edition.designation` (not `config.magnet_configuration`, which has no vocabulary value for a
raw magnet count) to record the bracketed configuration name verbatim, and `config.magnet_strength`
(free text) for the ES3 magnet counts, per schema. `weight_g` deliberately left unset on
`escube-air-v1--standard` — TheCubicle's Gross Weight (132g, packaged) and SpeedCubeShop's
~78g item weight are unreconciled conventions already flagged unresolved on the model record;
setting either would misrepresent a settled fact, and 132g alone also triggers lint rule 18's
implausible-weight check for no evidentiary gain.

**Rejected:** no colourway/limited/edition-tier candidates found for either model this pass —
no additional differentiation beyond magnet count/coating was located at either retailer.

**Validation:** `npm run check` after this section — 0 errors, 23 warnings (baseline, no
regressions; a transient 132g-weight lint warning and a fingerprint-collision duplicate
warning were both caused and then fixed within this section, see attestation notes above).

**Sources used:** all pre-existing (`speedcubeshop-es3-debut-brand-2025`,
`speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`,
`thecubicle-escube-air-3x3-20-magnet-ball-core`, `thecubicle-escube-es3-3x3-magnetic` referenced
via the model). No new source files created.

---

## Machine-readable summary (placeholder, to be replaced at end)
```yaml
models_assessed: []
variants_created: []
models_left_unassessed: []
candidates_rejected: []
escalations: []
```
