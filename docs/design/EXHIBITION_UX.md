# CubeCollection — exhibition UX and information architecture

Written 2026-09-21, as the developer-facing specification that follows from
`docs/EXHIBITION_ARCHITECTURE.md`. That document establishes the concept — makers as spine, three
entry paths, evidence as a primary exhibit, an honest `unknown`. This document is the spec a
developer builds screens from: routes, layouts, states, copy, and the one vertical slice that
proves the chain before anything else is built. It consumes `dist/public` only, per
`EXHIBITION_ARCHITECTURE.md` §8, and invents no archival content — every example below is a real
record from `data/`, named as such.

Status: in progress. Sections are being filled in order; §9 (open items) tracks what is not yet
written.

---

## 1. Route map

### 1.0 Two things every route inherits before its own spec applies

**The bundle is arrays, not per-record files.** `scripts/build.mjs` emits one JSON file *per
entity type* (`manufacturer.json`, `family.json`, `model.json`, `variant.json`, `source.json`,
`event.json`, `person.json`), each holding every public record of that type, plus four indexes
(`index/by-manufacturer.json`, `index/by-family.json`, `index/by-model.json` — each mapping an id
to a list of variant ids — and `index/chronology.json`), plus `meta.json`. There is no
`model/gan-flagship-16.json`. **Every route below therefore depends on a presentation-side build
step — outside `scripts/build.mjs`, which this lane does not touch — that reads the arrays once
and produces an id-keyed lookup** (a static-site generation pass, or a client-side fetch-once-
and-index). "Data dependencies" in the table means *which public array(s) and index(es)*, not
literal files-per-page.

**The site is a research preview, and every route must say so.** `meta.json` is explicit:
`publication` mode (status filter `published`) emits **zero records** — nothing in the archive
carries that status yet — so the only bundle with content is `research-preview` mode
(`sourced, drafted, stub`), and its own `meta.json.notes` states outright: *"RESEARCH PREVIEW —
NOT A PUBLICATION... Anything consuming this bundle must surface record.status to the viewer
rather than presenting every record as settled."* Concretely: **all 527 variants are `status:
stub`**, all 269 models are `stub`/`drafted` (1 / 253; 15 more are `sourced`), and no record
anywhere is `published`. This is not a launch-day caveat — it is the permanent condition of the
site until a curation pass promotes records, so a global, undismissable notice belongs in every
route's chrome (see §6 for its exact wording), and every model/variant page must render
`record.status` next to, and visually distinct from, its field-level confidence tags. Confusing
the two would be a real error: `gan-flagship-16`'s eight variants are all `status: stub` yet
several of their individual fields are attested at `confirmed` (e.g. `config/maglev` on
`gan-flagship-16--maglev-uv-coated`, sourced to GAN's own product page). *Stub* here means
"not yet reviewed for publication," not "nothing is known" — the two axes must never collapse
into one badge.

### 1.1 Route table

| Route | Purpose | Data dependency (`dist/public`) | Entry points | Exit points |
|---|---|---|---|---|
| `/` | Landing. States the proposition in one claim, one object, one piece of evidence. | `meta.json` (counts, research-preview notice); one curated `variant` + its `attestations`/`sources` | External links, direct visits, "start over" from any page's header | The three entry paths: `/makers` (Browse), `/lineage` or `/mechanism` (Trace), `/case` or `/unknowns` (Interrogate) |
| `/makers` | Browse root. All 54 manufacturers, visually scaled by model count (deep/mid/thin tiers, architecture doc §3). | `manufacturer.json`; `index/by-manufacturer.json` (for counts) | Landing, header nav (always present) | `/makers/:manufacturerId` |
| `/makers/:manufacturerId` | One manufacturer's room. A gallery for deep makers (GAN 40 models, DaYan 28, QiYi 24, MoYu 23, YJ 23, ShengShou 18), a single lineage room for mid makers, an archival card for thin (1–3 model) makers. | `manufacturer.json` (one record); `family.json` filtered by `manufacturer_id`; `index/by-manufacturer.json` → `model.json` for the roster | `/makers`, breadcrumb from any descendant page, search | `/families/:familyId`, `/models/:modelId`, `/case` (via "how we know" link on the manufacturer's own founding claim, see §4) |
| `/families/:familyId` | Lineage page for one family — the successor chain, renames, and gaps a maker itself created (e.g. MoYu WeiLong V2 → GTS → WR → V9, with V3–V8 explicitly never existing). Shared node: reached from both Browse (via a maker room) and Trace (via `/lineage`). | `family.json` (one record); `model.json` filtered by `family_id`, ordered by `generation.ordinal`; each model's `relationships`/`inbound_relationships` for the successor graph | `/makers/:manufacturerId`, `/lineage` | `/models/:modelId` |
| `/models/:modelId` | Model detail — the design. Specs with confidence visible per field, dates, legality, scope class, predecessor/successor links. | `model.json` (one record); `variant.json` filtered by `model_id` (for the variant roster); `index/by-model.json` | `/families/:familyId`, `/makers/:manufacturerId`, `/lineage/:familyId`, `/mechanism/:axis` (a model can be reached from an axis view), `/timeline`, search | `/models/:modelId/variants/:variantId` (single variant if only one exists), `/models/:modelId/compare` (only if ≥2 variants carry differing `config`), evidence drawer for any cited source |
| `/models/:modelId/compare` | Configuration comparison. **Gated**: only rendered for the 112 models holding multiple configurations (richest: `lefun-3x3-standard` 14 variants, `mf8-crazy-3x3-plus-planet-series` 9, `dayan-bermuda-triangle` 8, `gan-flagship-16` 8, `maru-3x3-original` 8, all counts verified against `data/variants/` for this document). Diffs only the axes that actually differ. The other 100 single-configuration models never render this route — there is nothing to route to, not a disabled tab. | `variant.json` filtered by `model_id`; each variant's `resolved_specs` and `config` | `/models/:modelId` | `/models/:modelId/variants/:variantId` for any row |
| `/models/:modelId/variants/:variantId` | Variant detail — **the object on the plinth**. The atomic exhibition record: colourway, coating, core, weight, edition, with `resolved_specs` (already inheritance-resolved, each value tagged `from: "variant"` or `from: "model"`) and the full attestation set. | `variant.json` (one record); `source.json` for every cited id in `attestations.*.sources` and `attestations.*.disputed[].sources` | `/models/:modelId`, `/models/:modelId/compare`, `/mechanism/:axis`, `/timeline`, `/unknowns` (a gap can link to its variant) | Evidence drawer / `/evidence/:sourceId` per claim, sibling variants via `relationships` (e.g. `modified_from`) |
| `/mechanism` | Trace root for the mechanism axes: `maglev` (94 variants), `coating` (84), `weight_g` (74), `magnet_configuration` (62), `size_mm` (50), `magnet_strength` (31), `adjustment_system` (25), `core_system` (21) — the archive's best-evidenced narrative. | `variant.json` (axis population counts) | Landing, header nav | `/mechanism/:axis` |
| `/mechanism/:axis` | One axis, cross-maker and cross-year — e.g. `/mechanism/maglev` traces springs → magnets → ball cores → magnetic levitation. | `variant.json` filtered to records where that axis is populated, joined to `model.json`/`manufacturer.json` for context | `/mechanism` | `/models/:modelId`, `/models/:modelId/variants/:variantId` |
| `/lineage` | Trace root. Families with real generational depth, named directly (`gan-356` 13 models, `moyu-weilong` 10, `yj-mgc` 9, `gan-flagship-series` 8, `dayan-zhanchi` 7, `dayan-guhong` 6, `qiyi-warrior` 6) rather than all 132 undifferentiated. | `family.json` + `index/by-family.json` sizes, pre-filtered to families above a depth threshold | Landing, header nav | `/families/:familyId` |
| `/timeline` | The dated subset, presented as a view, not the spine. **128 of 256 public models (50%) carry a date** (`announced` or `released`); the other 128 are listed in an explicit "undated" register on the same page, not hidden. (Archive-wide, including the 13 `reference_only` models never exhibited, none of which carry a date, the figure is 128 of 269 — 48%, matching `EXHIBITION_ARCHITECTURE.md` §2.) | `model.json` (`announced`/`released` present or absent) | Landing, header nav | `/models/:modelId` |
| `/edges` | The margins: 15 `conditional` models today (oversized novelties, non-WCA-legal puzzles). **Content is provisional**: the architecture doc's own §4.7 flags that the 13 `reference_only` models are currently excluded from `dist/public` by `PUBLIC_SCOPE`, pending ledger decision P4-16; this route must be built to add a second register the day that scope changes, not redesigned then. | `model.json` filtered to `scope_class: conditional` (today); `reference_only` register added if/when P4-16 resolves | Landing, header nav | `/models/:modelId` |
| `/case` | The Case — provenance as exhibit. A real claim, its excerpt, its tier, its confidence, and real *refusals* (a date downgraded because it was a retailer catalogue-migration artefact — `gan-354-m`'s `announced` field is exactly this, see §4). | `source.json` (tier/kind mix); a curated set of attestations chosen for their refusal narrative | Landing, header nav | `/evidence/:sourceId`, `/unknowns` |
| `/evidence/:sourceId` | One source, permalinked. Excerpt verbatim, tier, kind, publisher, archive locator (`archive_url`), and every claim across the archive that cites it. This is the deep-link target the evidence drawer opens to when a visitor wants the full record rather than the inline excerpt. | `source.json` (one record); a reverse index of `attestations.*.sources` → claim, built at presentation-build time (not in `scripts/build.mjs`) since the public bundle does not currently invert this direction | The evidence drawer (persistent, see §3), any inline citation | Back to the referring model/variant/family page (drawer close, not a new descent) |
| `/unknowns` | Interrogate: gaps presented as findings. Aggregates the three-way distinction of §5 — `unknown` (searched, not found), absent (not yet researched), convention (a rendering default, not evidence) — starting from the archive-wide, not-per-maker, picture. | `variant.json` (`representation.procedural.blockers`, all 511 populated); `model.json`/`variant.json` attestations (`confidence: unknown` vs. no attestation entry for an `x-critical` pointer — the distinction `scripts/report-coverage.mjs` rule 32 already computes, reproduced client-side or at presentation-build time over the public bundle) | Landing, header nav, "why is this blank" links from any unknown field on any page | `/models/:modelId`, `/models/:modelId/variants/:variantId`, `/case` |
| `/search` | Cross-cutting utility, not a section. Finds a manufacturer, family, model or variant by name/alias without requiring the visitor to already know which room it lives in. | `manufacturer.json`, `family.json`, `model.json`, `variant.json` name/alias fields, indexed at presentation-build time | Header (always present) | Any detail route |

Route params use descriptive names (`:manufacturerId`, `:modelId`, `:variantId`, `:sourceId`)
rather than a bare `:id` repeated at every level, so `/models/:modelId/variants/:variantId`
resolves unambiguously — the mandate's own example route shape, made concrete.

---

## 2. Page specifications

Every wireframe below uses a real id. None is invented. Loading state, for every route, is the
same pattern unless noted: **skeleton blocks matching the final layout's proportions, no
spinner, no shimmer gradient** (shimmer reads as generic-AI chrome, banned per the project's
aesthetic directive) — text areas hold a flat neutral rule at 60% of their final line length, and
the page's structural chrome (header, breadcrumb) renders immediately since it needs no data.

### 2.1 `/` — Landing

**First thing seen:** one variant, one claim about it, one piece of evidence — not a hero
carousel, not a grid. Using `gan-flagship-16--maglev-max-dual-wr-limited-edition` (a real,
dramatic record: a limited edition commemorating two world records, sourced to TheCubicle's own
retail copy at `probable` confidence):

```
┌──────────────────────────────────────────────────────────────────────┐
│  CUBECOLLECTION                                    [Browse ▾] [Search]│
│  a research preview — 54 makers, 132 families, 256 models, 511       │
│  variants, 609 sources cited. nothing here is published yet.         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│              [ parametric render placeholder — see §8 ]               │
│                                                                        │
│   GAN16 Maglev MAX (Dual-WR Limited Edition)                          │
│   GAN · GAN Flagship Series · 2025                                    │
│                                                                        │
│   "Commemorates a 3.05s single and a 3.84s average world record."     │
│   Confidence: PROBABLE — one retailer source, uncontradicted.  ⓘ      │
│                                                                        │
│   This is a cube. This is what we know about it.                     │
│   This is how we know: [ TheCubicle product listing, 2026-02-15 → ]  │
│                                                                        │
├──────────────────────────────────────────────────────────────────────┤
│   Three ways in:                                                      │
│   [ BROWSE — wander by maker ]  [ TRACE — follow a lineage ]          │
│   [ INTERROGATE — start from the evidence ]                           │
└──────────────────────────────────────────────────────────────────────┘
```

**Reading order:** research-preview notice (must be seen before anything else is trusted) →
object → its one claim → its confidence → its evidence link → the three entry paths.
**Hierarchy:** the confidence tag and the evidence link are set at the same visual weight as the
claim itself — never smaller, never greyed past body-text contrast — because the architecture
doc's founding proposition is that evidence is not a footnote here.
**Interactive:** the confidence tag opens the evidence drawer inline (§3); the three path buttons
are the only primary navigation; the featured object rotates to a different real variant on
reload rather than always showing the same one (a fixed list of ~10 curated ids, not random over
all 511 — an accidental `stub`-with-nothing-attested pick would undercut the landing claim).
**Empty/unknown:** not applicable at this route — the featured-object list is curated precisely
so landing never shows a thin record.
**Loading:** the object image placeholder and text skeleton per the pattern above; the research-
preview notice is static markup and renders with zero data dependency.

### 2.2 `/makers` — Browse root

**First thing seen:** the manufacturer roster, not a search box — Browse is *for wandering*.
Grouped into the three depth tiers from `EXHIBITION_ARCHITECTURE.md` §3, not one undifferentiated
grid of 54 equal tiles (a grid of 54 equal cards is exactly the "card soup" the project's
aesthetic directive bans, and it would misrepresent evidence depth as uniform).

```
┌──────────────────────────────────────────────────────────────────────┐
│  DEEP MAKERS — full galleries, lineage and mechanism depth  (6 of 54) │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────┐│
│  │ GAN     │ │ DaYan   │ │ MoYu    │ │ YJ      │ │ QiYi    │ │Sheng-││
│  │ 40 model│ │ 28 model│ │ 23 model│ │ 22 model│ │ 22 model│ │Shou  ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │17    ││
│                                                                └──────┘│
│  MID MAKERS — one room, lineage without sub-navigation      (11 of 54)│
│   YuXin (8) · MFJS (7) · Diansheng (6) · [ …8 more, 4–5 models each ] │
│                                                                        │
│  THIN MAKERS — an archival card, not a gallery              (37 of 54)│
│   YanCheng (1) · pbcube (1) · mojue (1) · [ …34 others ]              │
└──────────────────────────────────────────────────────────────────────┘
```

**Reading order:** deep → mid → thin, matching evidentiary weight, not alphabetical (alphabetical
would bury GAN's 40 models next to a 1-model card and imply parity). The counts above are the
*public* model counts (`scope_class` core or conditional; the 13 archive-wide `reference_only`
models are excluded from every tier count here exactly as they are excluded from `dist/public` —
this is why QiYi reads 22 rather than the 24 model files in `data/models/qiyi/`, and YJ 22 rather
than 23: each excludes its own `reference_only` models, listed instead at `/edges`).
**Hierarchy:** tier headers are structural, not decorative — they are the honesty mechanism: a
thin-maker card must never be styled to look like it merely *hasn't loaded its gallery yet*. The
tier counts themselves are load-bearing: **37 of 54 manufacturers are thin**, not a residual handful
— a version of this page that visually implies a fuller middle (a wall of similarly-sized mid
cards, say) would misrepresent the archive's actual shape, which is a long thin tail under six deep
makers and eleven mid ones.
**Interactive:** every card/entry routes to `/makers/:manufacturerId`; tier groups collapse on
mobile (§7) but never merge.
**Empty/unknown:** no manufacturer renders as a bare "0 models" without saying which of three
different facts that zero is — see §5.6 for the full three-way treatment. In short: 5 manufacturers
(`thecubicle`, `speedcubeshop`, `picube`, `saocube`, `cubicle-labs`, all `kind: service`) have zero
models *structurally* — they are aftermarket/retail services, not omissions, and their work
surfaces as variants on other makers' models instead (e.g. PiCube's own 20-magnet mod appears as
`gan-flagship-16--picube-20-magnet-ball-core-mod`); 1 (`limcube`, `kind: sub_brand`) is a sub-brand
record whose parent may carry the models; 6 (`hellocube`, `lanlan`, `ninja`, `verypuzzle`,
`xinlexin`, `zcube`, all `kind: manufacturer`) are genuine research gaps — identity established,
model enumeration not yet done. All three read differently on `/makers/:manufacturerId` (§2.3) and
none of the three renders as a thin-maker card, since a thin card promises "one documented model,"
which is a different claim than "no models researched yet" or "this maker doesn't make models."
**Loading:** three skeleton tier-blocks in the same proportions; counts render as soon as
`index/by-manufacturer.json` resolves, before the cards' own content.

### 2.3 `/makers/:manufacturerId` — maker room, at all three depths

**Deep — `/makers/gan`.** First thing seen: manufacturer header (name, native name "GAN魔方",
founding claim) — and the founding claim is itself a live example of `disputed`: GAN's own record
carries **four dated candidates for its founding (2010, 2011, 2013, 2014)**, none contradicting
another about *its own* claim, disagreeing only about which event counts as "founding." This
renders as the confidence tag `disputed`, not as a single silently-chosen year.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Makers / GAN                                                         │
│  GAN  (GAN魔方 · GANCUBE)                            CN                │
│  Founded: 2014  DISPUTED ⓘ — four candidate events, not one error     │
│  40 models across 6 families                                          │
├──────────────────────────────────────────────────────────────────────┤
│  Families (by depth)                                                  │
│   ▸ GAN Flagship Series — 8 models, ongoing (GAN11→GAN17)             │
│   ▸ GAN 356 — 13 models                                               │
│   ▸ GAN 354 — 2 models                                                │
│   ▸ …3 more                                                           │
├──────────────────────────────────────────────────────────────────────┤
│  All models (40)                    [ filter: dated · configured ▾ ]  │
│   GAN16 · GAN17 · GAN15 · GAN356 i3 · …                                │
└──────────────────────────────────────────────────────────────────────┘
```

**Mid — `/makers/mfjs`.** One room, families listed but not sub-navigated into their own gallery
chrome — MFJS is MoYu's sub-brand (`parent_id: moyu`, shown inline), 7 public models (10 model
files exist in `data/models/mfjs/`; 3 — its 40mm/45mm/50mm mini/keychain 3x3s — are
`scope_class: reference_only` and sit at `/edges` instead) in a flat roster under one lineage note,
no "families (by depth)" panel since none of its lines have flagship-scale generational depth.

**Thin — `/makers/yancheng`.** An archival card, deliberately smaller than a gallery shell:

```
┌────────────────────────────────────────────┐
│  Makers / YanCheng                          │
│  YanCheng (燕成) — sub-brand of MoYu · CN    │
│  1 documented model: YanCheng YAN3 (2017)   │
│  "Only a single product slug was found;     │
│   3x3 status not independently confirmed."  │
│  [ View YAN3 → ]                            │
└────────────────────────────────────────────┘
```
The card's own copy states the evidentiary limit in the archivist's own words (from
`data/manufacturers/yancheng.yml`), rather than presenting a confident one-model gallery.

**Reading order (all tiers):** identity → founding/origin claim with its confidence → depth
signal (family/model counts) → roster. **Interactive:** family rows expand to `/families/:id`;
model rows go straight to `/models/:id` (no intermediate step for a maker with no family
structure worth surfacing, e.g. thin makers). **Empty/unknown:** a manufacturer with zero cited
sources cannot occur (every record cites ≥1); a manufacturer whose founding date is wholly
`unknown` (not disputed, not absent — actually researched and not found) states so in the same
slot the date would occupy: *"Founded: unknown — researched, not found."* **Loading:** header
skeleton, then family/model list skeleton rows.

### 2.4 `/families/:familyId` — lineage page

Using `gan-flagship-series` (8 models: GAN11 M Pro through GAN17, plus `gan-mini-m-pro`, a
concurrent mini-format sibling that the family record itself does not order on the main
succession chain — a real example of a family containing an outlier the visitor should see
*as* an outlier, not silently folded into the numbered sequence).

```
┌──────────────────────────────────────────────────────────────────────┐
│  GAN / GAN Flagship Series                                            │
│  Introduced 2020 (circa) · flagship positioning · ongoing              │
├──────────────────────────────────────────────────────────────────────┤
│   GAN11 M Pro ──▶ GAN12 ──▶ GAN13 ──▶ GAN14 ──▶ GAN15 ──▶ GAN16 ──▶ GAN17 │
│    (2020)        (2021)    (2022)*   (2023)    (2024)    (2025)    (2026) │
│                                          * GAN13: seen in one 2025 maker  │
│                                            listing, absent from a later   │
│                                            one — flagged, not resolved.   │
│                                                                          │
│   Also in this family, not on the main chain:                          │
│    GAN Mini M Pro — a concurrent mini-format sibling, no ordinal set    │
├──────────────────────────────────────────────────────────────────────┤
│  [ ● selected: GAN16 ]  8 variants · view model →                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Reading order:** family identity/positioning → the succession chain, left to right by
`generation.ordinal` → any model the family holds that is *not* on that chain, called out
separately rather than inserted. **Hierarchy:** an arrow between two generations is a claim
(`relationships: succeeds`) with its own confidence — rendered as a solid arrow at `confirmed`/
`probable`, a dashed arrow at `uncertain`, and a broken/dotted arrow with a label at a documented
gap (the real MoYu WeiLong case: V2 → GTS → WR → V9, with "V3–V8 never existed" printed on the
chain itself, not left for a visitor to wonder about). **Interactive:** click any node to open
`/models/:modelId`; the outlier panel is not collapsed by default, since hiding it would recreate
the ordering error DATA_MODEL was written to avoid. **Empty/unknown:** a family with only one
model (e.g. `yancheng-yan3`'s family) renders the chain as a single node, no arrows — not an
empty timeline. **Loading:** the chain renders as N skeleton nodes at even spacing, node count
known immediately from `index/by-family.json` even before model details resolve.

### 2.5 `/models/:modelId` — model detail

Using `gan-flagship-16` (the vertical slice — full spec in §9; layout only, here):

```
┌──────────────────────────────────────────────────────────────────────┐
│  GAN / GAN Flagship Series / GAN16                                    │
│  GAN16                                    status: DRAFTED             │
│  Announced: 2025-08 (before)  UNCERTAIN ⓘ    Legality: WCA-legal      │
│  ← GAN15          GAN Flagship Series          GAN17 →                │
├──────────────────────────────────────────────────────────────────────┤
│  8 variants, differing by magnet count, coating and edition:          │
│  [ Compare all 8 → ]                                                  │
│   Maglev (UV Coated)         Maglev MAX (UV Coated)   MAX-L (UV Coated)│
│   Dual-WR Limited Edition    Amyth Winter LE           AQUALIS Summer LE│
│   PiCube 20-Magnet Mod (×2 base variants)                              │
├──────────────────────────────────────────────────────────────────────┤
│  Mechanism (resolved from model + variant)                             │
│   magnet count: 88 standard / 136 MAX · confirmed                     │
├──────────────────────────────────────────────────────────────────────┤
│  Evidence for this page:  GAN's own GAN16 product page (tier 1) →     │
└──────────────────────────────────────────────────────────────────────┘
```

**Reading order:** breadcrumb → identity + status badge (kept visually distinct from confidence,
per §1.0) → date/legality with confidence → predecessor/successor → variant roster → mechanism
summary → evidence. **Hierarchy:** the variant roster is the dominant visual block on a
multi-configuration model — it is the reason a visitor came this deep. **Interactive:** predecessor/
successor arrows navigate directly (no re-entry through the family page required, though the
breadcrumb still reflects family context); each variant name routes to its own page; "Compare
all 8" only renders because this specific model clears the ≥2-variant gate (§1, `/compare` row).
**Empty/unknown:** a single-configuration model (100 of 269 archive-wide) shows one variant inline
with no roster chrome and no "Compare" affordance — never a comparison table of one row, and never
a greyed-out disabled compare button implying a feature that doesn't apply. **Loading:** header
skeleton, then variant-roster row skeletons (count known from `index/by-model.json` immediately).

### 2.6 `/models/:modelId/compare` — configuration comparison

Using `gan-flagship-16`'s 8 variants. Diffs only axes that differ across them — it does **not**
print a full spec table of mostly-identical rows (the founding rule of §4.5).

```
┌──────────────────────────────────────────────────────────────────────┐
│  GAN16 — comparing 8 variants                    [ ← back to model ]  │
├───────────────────────┬──────────┬─────────┬────────┬─────────────────┤
│                       │ maglev   │ coating │ core   │ edition          │
│ Maglev (UV Coated)    │ maglev✓  │ uv ✓    │  —     │ standard         │
│ Maglev MAX (UV Coated)│ maglev✓  │ uv ✓    │  —     │ standard         │
│ MAX-L (UV Coated)     │  —       │ uv ✓    │  —     │ standard         │
│ Dual-WR Ltd Ed.       │ maglev✓  │ uv ✓    │  —     │ limited,         │
│                       │          │         │        │ signature,       │
│                       │          │         │        │ commemorative    │
│ Amyth Winter LE       │ maglev✓  │  —      │  —     │ limited          │
│ AQUALIS Summer LE     │ maglev✓  │  —      │  —     │ limited          │
│ PiCube Mod (base: Ml) │ maglev✓  │ uv ✓    │ ball◐  │ retailer_excl.   │
│ PiCube Mod (base: MAX)│ maglev✓  │ uv ✓    │ ball◐  │ retailer_excl.   │
├───────────────────────┴──────────┴─────────┴────────┴─────────────────┤
│  ✓ confirmed   ◐ probable   — not recorded for this variant           │
│  "—" is not "no core": several variants simply have no core_system    │
│  attestation. Absence and "none fitted" are different claims; only    │
│  the latter would be a positive statement this archive would source.  │
└──────────────────────────────────────────────────────────────────────┘
```

**Reading order:** table first (this route exists to be scanned, not read linearly); legend
pinned below, always visible, not a hover-only tooltip. **Hierarchy:** confidence glyphs
(✓ / ◐ / a lighter mark for `uncertain`) sit inside each cell next to the value, never as a
separate column a visitor could miss. **Interactive:** any row opens its variant page; columns
can be reordered but not hidden below a minimum set (config axes populated for ≥2 of the
compared variants stay pinned). **Empty/unknown:** if an axis is `—` for every compared variant
it is dropped from the table entirely (it isn't a real point of difference among *these* variants,
even if populated elsewhere in the archive) — this is computed per comparison, not per model.
**Loading:** table skeleton with the correct row/column count from `variant.json`'s filtered
length before cell values resolve.

### 2.7 `/models/:modelId/variants/:variantId` — variant detail, the object on the plinth

This is the highest-stakes page in the whole spec — architecture doc §5: "the variant is the
object on the plinth." Two real variants shown to cover the honest range: one mostly-known, one
mostly-unknown.

**Mostly-known — `gan-flagship-16--maglev-max-dual-wr-limited-edition`:**

```
┌──────────────────────────────────────────────────────────────────────┐
│  GAN / GAN Flagship Series / GAN16 / Dual-WR Limited Edition           │
│  status: STUB (not yet reviewed) — see note ⓘ                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│           [ parametric render — maglev, UV coating, standard scheme  ]│
│           [ face colours: STANDARD SCHEME (rendering convention) ⓘ  ] │
│                                                                        │
│  GAN16 Maglev MAX (Dual-WR Limited Edition)                            │
│  Edition: MAX · Limited (1,111 units, not individually numbered)      │
│  Commemorates: 3.05s single WR, 3.84s average WR — Xuanyi Geng         │
│  Signed by: Xuanyi Geng                                                │
│                                                                        │
│  Specification                              confidence   from         │
│   maglev             maglev                 confirmed    model        │
│   coating            uv                      confirmed    model        │
│   edition name       Dual-WR Limited Edition confirmed    variant      │
│   run size           1,111                   probable     variant      │
│   individually numbered   false              UNCERTAIN — absence of a │
│                                               numbering scheme is weak │
│                                               evidence, not silence    │
├──────────────────────────────────────────────────────────────────────┤
│  Evidence (4 citations)     [ open evidence drawer → ]                │
│  Packaging: laser-engraved collector's case, signed postcard          │
└──────────────────────────────────────────────────────────────────────┘
```

**Mostly-unknown — `gan-flagship-16--amyth-winter-limited-edition`:**

```
┌──────────────────────────────────────────────────────────────────────┐
│  GAN / GAN Flagship Series / GAN16 / Amyth Winter Limited Edition      │
│  status: STUB                                                          │
├──────────────────────────────────────────────────────────────────────┤
│           [ body: crystalline purple — UNCERTAIN, single source ]     │
│           [ faces: NOT DOCUMENTED — schematic render, no colour ]     │
│                                                                        │
│  Amyth - GAN16 Maglev MAX Winter Limited Edition                       │
│  Edition: MAX · "Amyth" · Limited (run size: UNKNOWN)                  │
│                                                                        │
│  Specification                              confidence   note         │
│   body plastic colour   crystalline purple   UNCERTAIN    named only  │
│                                               in a cross-sell block on │
│                                               a different product page │
│   maglev                maglev               confirmed    from model  │
│   run size              — unknown —           UNKNOWN      researched,│
│                                               not found. never         │
│                                               estimated.               │
├──────────────────────────────────────────────────────────────────────┤
│  Evidence (1 citation) — the thinnest kind: one cross-sell mention     │
│  [ open evidence drawer → ]                                            │
└──────────────────────────────────────────────────────────────────────┘
```

**Reading order:** breadcrumb → status badge → 3D object (with its own honesty label, §5/§8) →
name/edition → specification table, each row paired with its confidence, never confidence
grouped separately at the bottom → evidence count/drawer entry → packaging/notes.
**Hierarchy:** confidence is a column, not a footnote glyph — `UNCERTAIN` and `UNKNOWN` are
printed as words at the same type size as the value, not smaller or greyed to the point of being
skippable (this is the one non-negotiable hierarchy rule in the whole document: a visitor must
not be able to read this page while missing which claims are weak).
**Interactive:** every specification row's confidence is clickable and opens the evidence drawer
scoped to that row's source(s); `modified_from`/sibling relationships (e.g. the PiCube mod
variants pointing back to their base) render as a link.
**Empty/unknown:** the full §5 treatment applies here field-by-field — see §5 for the exact three-
way rendering rule this page implements.
**Loading:** object placeholder skeleton, then the specification table skeleton with the correct
row count from the variant's own `resolved_specs` + `attestations` key count (both already in the
bundle, no secondary fetch needed).

### 2.8 Evidence drawer (persistent component) and `/evidence/:sourceId`

The drawer is not a route — it is a slide-in panel available from any confidence tag or citation
link on any page, and it can *also* be reached directly at a permalink for sharing/citation.
Using `thecubicle-gan16-maglev-max-uv-dual-wr-limited-edition`:

```
┌───────────────────────── EVIDENCE ─────────────────────────┐
│  Claim: edition name = "Dual-WR Limited Edition"    PROBABLE│
│                                                    [ close ✕]│
│  "Celebrate world-record-shattering speed with the GAN16    │
│   MagLev MAX UV 3x3 (Dual-WR Limited Edition)! ... Limited  │
│   to just 1,111 units worldwide..."                          │
│                                                               │
│  Source: TheCubicle (retailer)              Tier 2           │
│  Captured: 2026-09-02 · archived copy available               │
│  Reliability: "TheCubicle's own retail copy... The run size  │
│   and WR figures are stated as specific facts, not            │
│   comparative marketing language."                            │
│                                                               │
│  [ View full source record → /evidence/thecubicle-gan16- ]   │
│  [ View archived capture ↗ ]                                 │
└───────────────────────────────────────────────────────────┘
```

`/evidence/:sourceId` is the same content promoted to a full page, plus a reverse list: *every
claim across the archive that cites this source* — genuinely useful here, since 52% of families,
48% of models and 80% of variants rest on a single publisher (`RESEARCH_FINAL_HANDOFF.md`), so
one source often anchors many claims at once and a visitor auditing the archive should be able to
see that concentration directly rather than infer it.

**Reading order (both forms):** the claim the drawer was opened *for*, first and bolded → excerpt
verbatim → tier/publisher/date → reliability note → outbound links.
**Hierarchy:** the excerpt is quoted, not paraphrased — this page's entire credibility rests on
showing the archivist's actual working, not a summary of it.
**Interactive:** drawer opens without a page navigation (state preserved, see §3); the full-page
form is a real, bookmarkable, back-button-safe route.
**Empty/unknown:** a claim with a `note` but no independent excerpt (e.g. an inferred-from-naming-
pattern claim like `gan-flagship-16`'s own `/generation/basis`) shows the note in place of an
excerpt, clearly labelled "archivist's reasoning" rather than styled identically to a quoted
source — these are different kinds of evidence and must not look the same.
**Loading:** drawer opens instantly with the citing page's own already-fetched attestation data
(source id, confidence) and back-fills the full source excerpt from `source.json` a beat later —
a genuine two-stage load, skeleton for the excerpt block only.

### 2.9 `/mechanism` and `/mechanism/:axis`

`/mechanism` is a short index — eight rows, one per populated axis, each showing its population
count as the entry point's only real content (`maglev` 94, `coating` 84, `weight_g` 74,
`magnet_configuration` 62, `size_mm` 50, `magnet_strength` 31, `adjustment_system` 25,
`core_system` 21). `/mechanism/maglev` then reads as a cross-maker, roughly-chronological strip
of variants where the axis is populated, grouped by value (`maglev` / not), so a visitor can see
the technology spread across makers rather than within one. **Interactive:** any variant tile
opens its detail page. **Empty/unknown:** an axis view never includes variants where that axis is
unattested — this view's entire purpose is "what we can compare," so silence on the axis means
exclusion from the view, not a null row. **Loading:** count-only skeleton, matching `/makers`'s
pattern.

### 2.10 `/lineage` and `/timeline`

`/lineage` is a short, deliberately non-exhaustive index of the seven families named in
`EXHIBITION_ARCHITECTURE.md` §4.3 (`gan-356` 13, `moyu-weilong` 10, `yj-mgc` 9,
`gan-flagship-series` 8, `dayan-zhanchi` 7, `dayan-guhong` 6, `qiyi-warrior` 6) with a visible
note that 125 other families exist and are reachable through their maker's room, not hidden —
Trace surfaces *depth*, it does not gatekeep the rest of the archive.

`/timeline` renders 128 dated public models on a real axis (clustered 2016–2024, peaking 2019, per
the architecture doc), with an equally-weighted second register beneath it: **"128 more models
carry no date at all"** — not a footnote, a second labelled band the same height as the dated
band, listing them by maker instead of by year, because a maker is the fact the archive *does*
have for them. **Empty/unknown:** this is the primary demonstration, archive-wide, of "we have
not researched this" vs. "we looked" — nearly all 128 undated models are `absent` on their date
field (no attestation entry) rather than `unknown` (see §5's aggregate numbers), and the band
label says so plainly. **Loading:** the dated axis renders its scale immediately (year range is
static); model dots populate as `model.json` resolves.

### 2.11 `/edges`

Using `dayan-bermuda-triangle` — `conditional` scope, bandaged construction, `wca_status:
not_legal`, with its own `scope_justification` field surfaced as museum label copy rather than
paraphrased:

```
┌──────────────────────────────────────────────────────────────────────┐
│  Edges — 15 models admitted on documented significance, not WCA       │
│  legality. Each was adjudicated individually; none is here by default.│
├──────────────────────────────────────────────────────────────────────┤
│  DaYan Bermuda Triangle                          scope: CONDITIONAL   │
│  "Bandaged construction... not WCA-legal."                             │
│  Why admitted: "a recognised, named twisty-puzzle mechanism category  │
│  with documented permutation-group significance... DaYan gave Bermuda │
│  its own top-level product category on its own site in 2012."         │
│  Decided: 2026-09-08, ledger P26-5                                    │
├──────────────────────────────────────────────────────────────────────┤
│  13 further models are documented but not shown here: excluded from   │
│  this bundle pending a naming-scope decision (ledger P4-16). Includes │
│  QiYi Warrior Plus (188mm, 981g) — an oversized novelty, not hidden   │
│  by accident. [ why? → ]                                               │
└──────────────────────────────────────────────────────────────────────┘
```

This page is written to be honest about its *own* incompleteness — the second block above is not
boilerplate, it is required content for as long as P4-16 is open, and the "why?" link goes to a
plain-language explanation of `reference_only` vs. `conditional` (§5's convention/unknown
distinction extends to scope decisions, not only to field values). **Reading order:** section
framing → each conditional model as its own labelled case, not a spec-table row → the pending-
scope note, always last but never omitted. **Interactive:** each case opens its model page.
**Loading:** case-count skeleton (15 fixed blocks) before content.

### 2.12 `/case`

The provenance showcase. Leads with a real refusal rather than a real acceptance, because
`RESEARCH_FINAL_HANDOFF.md` itself observes refusals are more persuasive than acceptances. Using
`gan-354-m`'s `announced` field: GAN354 M's date was **downgraded from `probable` to `uncertain`**
because its only apparent evidence, TheCubicle's "Added: 2018-09-11," is a catalogue-migration
artefact appearing verbatim 29 times across 22 sources and 13 unrelated brands — not a per-product
date at all. The page shows the rejected reading and the retained one side by side, plus the
open policy question this raised (ledger **P4-7**: "whether such a stamp may be used as a bound at
all," still `needs_human_decision`). **Reading order:** the refusal case, in full, first → the
tier/confidence vocabulary (six values, plain-language) → a browsable sample of further sources by
tier mix (T1 112, T2 454, T3 18, T4 32, per `report-coverage.mjs` rule 34). **Interactive:** the
refusal case links to `gan-354-m` and to the open ledger item's plain-language framing (not the
raw ledger YAML). **Empty/unknown:** not applicable — this page is curated, not data-driven per
record. **Loading:** static text renders first (the refusal narrative is authored copy, not a
bundle fetch); the tier-mix chart loads from `source.json` a beat later.

### 2.13 `/unknowns`

Full spec in §5. Layout only, here: an archive-wide dashboard opening on the render-blocker
picture (face colours undocumented on all 511 public variants; body plastic colour on 489 of
511 — 22 documented), then per-manufacturer bars for the `unknown` vs. absent split (e.g. GAN:
213 attested / 161 explicitly `unknown` / 1,456 absent, of 1,830 critical-field slots — the
`report-coverage.mjs` rule-32 numbers, reproduced over the public bundle rather than the private
one). **Interactive:** any bar segment filters to the underlying model/variant list.
**Loading:** the two headline blocker counts (511 / 511 / 511 / 489) are static constants derived
at presentation-build time and render immediately; per-manufacturer bars load progressively.

### 2.14 `/search`

A single input, results grouped by entity type (manufacturer / family / model / variant), each
result showing its breadcrumb path so a visitor lands oriented rather than dropped into a variant
page with no context. **Empty:** "No record matches ‘_x_’ — try a manufacturer or model name;
aliases are searched too" (the archive records aliases explicitly, e.g. GAN's own "GANCUBE",
"Gan Cube"; search must include them or it will silently fail on real, sourced alternate names).

---

## 3. Navigation model

### 3.1 Every page is a real URL

Every route in §1 is a real, bookmarkable, server-renderable URL — not a client-side view swap
behind one path. This is the load-bearing decision the rest of §3 follows from: the browser's own
back/forward, history, and bookmark mechanisms do most of "how a visitor doesn't get lost," for
free, as long as the app does not fight them. A visitor who descends `/makers/gan` →
`/families/gan-flagship-series` → `/models/gan-flagship-16` →
`/models/gan-flagship-16/variants/gan-flagship-16--amyth-winter-limited-edition` can hit the
browser's back button four times and land exactly where they started, with no app-level state to
reconcile, because there is none — the URL *is* the state.

### 3.2 The persistent header

Every page carries the same header, three parts, always in this order:

```
┌──────────────────────────────────────────────────────────────────────┐
│  CUBECOLLECTION      [ ● BROWSE ]      Makers ▸ GAN ▸ GAN16      [⌕]  │
└──────────────────────────────────────────────────────────────────────┘
     ^ home              ^ entry-path      ^ breadcrumb          ^search
       (never lost)         chip             trail
```

- **Home** always returns to `/`. It is the one link guaranteed present and identical on every
  page in the archive.
- **Entry-path chip** shows which of Browse / Trace / Interrogate the visitor is currently framed
  in. It is not decorative: clicking it returns to *that path's own root* (`/makers`, `/lineage`
  or `/mechanism`, `/case` or `/unknowns`) — a faster return than Home for a visitor mid-session.
  It changes only on an explicit choice (clicking a different chip, or following a cross-path link
  described in §3.4), never silently because of which route the visitor happens to be on — a
  visitor who reaches `/models/gan-flagship-16` from a Trace mechanism view and one who reaches it
  from Browse's maker room see the identical model page, but a different chip, because they are in
  a genuinely different session context and the chip is the honest record of that.
- **Breadcrumb trail** always shows the full entity path — manufacturer ▸ family ▸ model ▸ variant
  — regardless of which entry path produced the visit. This is possible because every variant
  record already carries its resolved `lineage` block (`manufacturer_id`, `family_id`, `model_id`,
  `family_name`, `model_name` — already computed by `scripts/build.mjs`, not something the
  frontend has to derive), so a visitor who arrives at a variant page via `/mechanism/maglev`
  still sees "Makers ▸ GAN ▸ GAN Flagship Series ▸ GAN16 ▸ Dual-WR Limited Edition" and can climb
  out through it even though they never visited `/makers/gan` this session.
- Each breadcrumb segment is a working link to that level, not a label.

### 3.3 The evidence drawer's own navigation contract

The drawer (§2.8) is a same-page overlay, not a route change, but it is not invisible to
navigation either: opening it sets a query parameter (`?evidence=<sourceId>`) rather than only
component state. Consequences, deliberately:

- **Shareable.** A link with `?evidence=` open reproduces the exact citation a visitor was
  looking at — important for an archive whose whole differentiator is showing its evidence; a
  visitor should be able to send someone the claim, not just the page.
- **Back-button-safe.** Pressing back while the drawer is open closes the drawer and keeps the
  visitor on the same page, one history step at a time — never a surprise jump two levels up the
  hierarchy because a drawer-open didn't register as a navigable state.
- **Never modal-blocking.** The rest of the page remains visible and scrollable behind the drawer
  (a slide-in panel, not a full-screen takeover) so a visitor comparing a claim against its
  neighbours in a spec table does not lose sight of the table while reading its evidence.

### 3.4 Cross-path links: how a visitor moves *between* Browse, Trace and Interrogate

The three entry paths are starting doors into the same building, not three separate sites, so
every detail page carries at least one link that reframes the visitor into a different path
without re-deriving context:

- On a **model or variant page** (reached via Browse): a "Trace this lineage →" link beside the
  predecessor/successor arrows switches the chip to Trace and opens `/families/:familyId`.
- On a **variant page**: every confidence tag is also an Interrogate entry point — clicking one
  opens the evidence drawer (chip does *not* switch, since the drawer is a same-page overlay, not
  a path change) but the drawer's "View full source record →" link, which does navigate to
  `/evidence/:sourceId`, switches the chip to Interrogate, because that click is a genuine change
  of what the visitor is doing.
- On `/evidence/:sourceId` or `/unknowns`: "See this claim in context →" links return to the
  originating model/variant page and switch the chip back to whichever of Browse/Trace it came
  from (tracked in the visit's own history state, not guessed).
- On `/mechanism/:axis` (Trace): each tile is simultaneously a Browse exit (its breadcrumb-linked
  maker) and stays in Trace if the visitor clicks the axis strip's own "next" affordance rather
  than the tile.

### 3.5 Preventing dead ends

No detail page in this spec (§2) is a dead end — every model and variant page has, at minimum, a
breadcrumb up, a predecessor/successor or sibling link, and an evidence link. The one deliberate
exception is `/edges` and `/unknowns` cases with no further comparison available (e.g. a
single-source, single-variant thin-maker model) — there the "next" affordance is explicitly the
entry-path chip, not a fabricated related-items rail. **A museum should never manufacture a "you
might also like" rail out of records that have nothing in common beyond both existing** — that
would misrepresent the evidence exactly as a generic recommendation carousel would, and the
project's banned-aesthetics list already rules out template patterns of this shape.

### 3.6 What does *not* persist across navigation

To keep the model simple and debuggable: comparison-table column order (§2.6), mechanism-axis
sort order, and search scroll position reset per visit unless the URL itself encodes them (a
comparison table's chosen column set could be a future query param; not required for the vertical
slice in §9). Only the entry-path chip and the breadcrumb's derived lineage persist as session
context, and both are cheap to reconstruct from the current URL alone — nothing here requires a
client-side store that could drift from the URL and produce the exact "lost" experience this
section exists to prevent.

---

## 4. The three entry paths, made concrete

`EXHIBITION_ARCHITECTURE.md` §6 names three entry paths "because three genuinely different
visitors exist" and gives each one line: Browse is by maker, the default; Trace is by lineage or
mechanism, the enthusiast path; Interrogate is by evidence, the archivist path, and the one nobody
else offers. §1 and §2 of this document already give each path its routes and page specs. This
section makes each path a walk a visitor actually takes — first screen, the promise it opens on,
and the next three or four clicks — using only records already named elsewhere in this document.

A path is a way *in*, not a fence. §3.4 already establishes that every detail page carries a link
that reframes the visitor into a different path (a model page's "Trace this lineage →", a drawer's
"View full source record →"). What follows is each path's *own* shape before that reframing
happens — the room a visitor is standing in when they haven't clicked anything else yet.

### 4.1 Browse — by maker

**First screen:** `/makers` (§2.2), and the promise is stated by the layout before any copy does:
three tiers, deep first, so the first thing a Browse visitor learns is which makers this archive
actually knows in depth. **What it promises:** *you don't need to know a name to start; wander, and
the size of what you find tells you how well it's known.* No search box on this screen — Trace and
Interrogate both open on a specific claim, Browse opens on breadth instead.

**First click:** a deep-tier tile — GAN. **What that click lands on:** not a gallery grid, but
`/makers/gan` (§2.3), and the very first thing under the header is not a roster, it's a dispute:
GAN's own founding record carries four dated candidates (2010, 2011, 2013, 2014) and renders as
`DISPUTED ⓘ — four candidate events, not one error`. A Browse visitor who expected an uncomplicated
identity page gets, in one click, evidence that even "when was this company founded" is not settled
here — which is the whole proposition, delivered before the visitor asked for it.

**Second click:** a family row — GAN Flagship Series (8 models, ongoing). **Lands on:**
`/families/gan-flagship-series` (§2.4), the succession chain GAN11 M Pro → … → GAN17, with GAN13
flagged mid-chain (`* GAN13: seen in one 2025 maker listing, absent from a later one — flagged, not
resolved`) and GAN Mini M Pro called out beside the chain as a sibling that never got an ordinal.
Browse's wandering, two clicks in, has already produced a second unresolved question, presented as
one — not smoothed over to keep the roster page tidy.

**Third click:** GAN16 on the chain. **Lands on:** `/models/gan-flagship-16` (§2.5) — the vertical
slice's model, 8 variants, differing by magnet count, coating and edition. **Fourth click:** any
variant name, e.g. "Dual-WR Limited Edition" → `/models/gan-flagship-16/variants/gan-flagship-16--maglev-max-dual-wr-limited-edition`
(§2.7) — the object on the plinth. Four clicks, no search, no prior knowledge of GAN's product
naming, and the visitor has already met a founding dispute, a chain gap, and a fully-cited variant.

**How a Browse visitor moves on:** back up the breadcrumb to try a different family, sideways via
predecessor/successor arrows on the model page, or out through "Trace this lineage →" (§3.4) if the
chain itself becomes the more interesting object.

### 4.2 Trace — by lineage or mechanism

Trace has two roots (§1: `/lineage` and `/mechanism`), because "follow a lineage" and "follow a
mechanism across makers" are the same *kind* of path — a thread, not a room — but different
threads. Both are described in full at §2.9–§2.10; this section gives each its concrete walk.

**Lineage root — first screen:** `/lineage` (§2.10), seven named families with real generational
depth (`gan-356` 13 models, `moyu-weilong` 10, `yj-mgc` 9, `gan-flagship-series` 8, `dayan-zhanchi`
7, `dayan-guhong` 6, `qiyi-warrior` 6), with a standing note that 125 more families exist and are
reachable through Browse, not hidden. **What it promises:** *depth is not evenly spread across this
archive, and Trace shows you where it actually is, rather than making you guess by clicking through
54 makers.*

**First click:** `moyu-weilong` (10 models). **Lands on:** `/families/moyu-weilong`, the real gap
`EXHIBITION_UX.md` has cited since §2.4's own model: WeiLong V2 → GTS → WR → V9, with **"V3–V8 never
existed" printed on the chain itself** — a maker's own numbering choice, not a data-entry hole, and
the chain says so rather than leaving six missing numbers for a visitor to wonder about. **Second
click:** V9 (or WR) on the chain → `/models/:modelId`, then onward exactly as in §4.1's third/fourth
clicks (variant roster → variant page) if `moyu-weilong` has a multi-configuration model, or
straight to a single variant page (§2.5's "single-configuration model" case) if it doesn't.

**Mechanism root — first screen:** `/mechanism` (§2.9), eight rows, each a population count —
`maglev` 94, `coating` 84, `weight_g` 74, `magnet_configuration` 62, `size_mm` 50,
`magnet_strength` 31, `adjustment_system` 25, `core_system` 21 — and nothing else, because the
count *is* the content at this depth. **What it promises:** *pick a piece of technology, not a
brand, and watch it cross every maker that used it.* **First click:** `maglev` →
`/mechanism/maglev`, a cross-maker strip of the 94 variants where the axis is populated, grouped by
value rather than by manufacturer — `gan-flagship-16--maglev-max-dual-wr-limited-edition` is one
tile among makers Trace never asked the visitor to already know. **Second click:** that tile →
the variant page directly (§2.7) — mechanism is the one root that can drop a Trace visitor straight
onto the plinth with no model-page stop in between, because "what uses this mechanism" is itself
the organizing question, not "what does this model look like."

**How a Trace visitor moves on:** the lineage chain's own predecessor/successor links keep them in
Trace; a mechanism tile's breadcrumb is a Browse exit (§3.4) the moment the visitor wants to see
everything else that maker made, which switches the chip without asking Trace to explain itself.

### 4.3 Interrogate — by evidence

**First screen:** `/case` (§2.12), and it opens on a refusal, not an acceptance, because
`RESEARCH_FINAL_HANDOFF.md` itself observes refusals are more persuasive. **What it promises:**
*start by watching this archive say no to a source, and you'll trust what it says yes to.* The
refusal: `gan-354-m`'s `announced` date, downgraded from `probable` to `uncertain` because its only
apparent evidence — TheCubicle's "Added: 2018-09-11" — is a catalogue-migration artefact appearing
verbatim 29 times across 22 sources and 13 unrelated brands, not a per-product date at all. The page
shows the rejected reading and the retained one side by side, plus the still-open ledger question
(**P4-7**: "whether such a stamp may be used as a bound at all," `needs_human_decision`) that the
refusal raised. An Interrogate visitor's first click is optional by design — the refusal is legible
without one — but the page offers two: the case's own link to `gan-354-m`, and a link to P4-7's
plain-language framing.

**First click (into the archive):** `gan-354-m` → its model page, where the *same* downgraded date
now sits in context, next to the model's other, better-attested fields — the point being that one
refusal does not make the whole record suspect, it makes this one field honestly weaker than its
neighbours. **First click (into the method):** P4-7's framing, which is not the raw ledger YAML but
a plain-language account of the open question — an Interrogate visitor came to test the archive's
reasoning, not to read its issue tracker.

**Second entry, from the same root:** `/unknowns` (§2.13), the archive-wide gap dashboard —
opens on the render-blocker picture (face colour undocumented on all 527 variants; body plastic
colour on 505 of 527) before any per-maker breakdown, because the *scale* of what is undocumented is
itself the finding Interrogate exists to surface. §5 gives this page's full treatment.

**How an Interrogate visitor moves on:** every confidence tag anywhere in the archive is already an
Interrogate entry point (§3.4) — a visitor who arrived via Browse or Trace and clicks one *becomes*
an Interrogate visitor mid-session, chip and all, without having started at `/case`.

### 4.4 What exists today against this spec

Only `/` (Landing), `/conventions`, and one variant page are built (`web/src/app/App.tsx`'s route
switch); `/makers`, `/lineage`, `/mechanism`, `/case`, and `/unknowns` all fall through to a debug
shell today, so none of the three walks above can be taken in the running app yet — §9 assesses this
gap in full, against the vertical slice's own success criteria, rather than repeating it here. Two
things are worth flagging in this section specifically, because they are shortcuts around Browse and
Interrogate's *first screens*, not just missing pages: the built `LandingPage.tsx`'s "Browse" link
goes straight to the featured variant's own page rather than to `/makers`, and its "Interrogate"
link goes to `/conventions` rather than `/case` — both real, useful pages, but neither is the entry
screen this section specifies, and a visitor clicking "Browse" today gets a single object rather
than the wandering §4.1 promises.

---

## 5. The `unknown` experience

*Skeleton.* The hardest part. Distinguishes, on screen, three things the archive's own vocabulary
already distinguishes in data — `unknown` (searched, not found), absent (not yet researched), and
a declared rendering convention (§10.4 of the architecture doc, the standard face-colour scheme)
— using the real blocker set computed by `scripts/build.mjs` (`renderBlockers`): face colours
undocumented on all 511 public variants, logo placement on all 511, geometry profile on all 511,
body plastic colour on 489 of 511.

---

## 6. Microcopy

*Skeleton.* The actual strings: confidence labels, unknown states, the rendering-convention
disclosure, dispute framing. Museum voice — precise, unhedged, never apologetic, never salesy.

---

## 7. Responsive behaviour

*Skeleton.* Desktop / tablet / mobile per page type, and what mobile sacrifices (the evidence
drawer's persistence model changes first).

---

## 8. Accessibility

*Skeleton.* Keyboard path per page, focus order, reduced-motion alternative, and the non-WebGL
fallback — which, per the architecture doc §7, is not a hypothetical: 0 of 511 public variants are
`render_ready` today, so the fallback *is* the current experience for the entire archive, not an
edge case.

---

## 9. The vertical slice

*Skeleton.* One model, end to end. Candidates checked against the real data in `data/variants/`:
`gan-flagship-16` has 8 variant files, `dayan-guhong-pro-m` has 6. Chosen: `gan-flagship-16` — see
§9 for the full justification, including why its specific 8 variants are an unusually good fit for
demonstrating confidence variance and the `unknown` experience, not just variant count.

---

## Open items

Tracked here so a killed session leaves an honest state. Empty once §1–9 are complete in full.

- [x] §1 route map — full table
- [x] §2 page specs — all routes, wireframes
- [x] §3 navigation model
- [x] §4 entry paths made concrete
- [ ] §5 unknown experience
- [ ] §6 microcopy
- [ ] §7 responsive behaviour
- [ ] §8 accessibility
- [ ] §9 vertical slice full spec
