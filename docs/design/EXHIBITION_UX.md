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

This is the section the rest of the document has been building toward. `docs/RENDERING_CONVENTIONS.md`
§1 puts the scale of it plainly: measured against all 527 archive variants on 2026-09-21, face
colour is documented on **0**, logo placement on **0**, geometry profile on **0**, body plastic
colour on **22** (505 undocumented), surface application on **122** (405 undocumented), size on
**236** (291 undocumented). A page that renders this archive is, on almost every field of almost
every object, rendering an absence — and the entire argument of this section is that an absence
handled honestly is still a finding, and a finding is not a broken page.

### 5.1 The rule, stated exactly

`web/src/data/types.ts` and `web/src/data/adapter.ts` (`attestedValue()`) already implement the
rule; this is that rule in words, because every future page must implement it the same way rather
than reinventing it per component. For any one field pointer (e.g. `/colorway/body/plastic_color_name`
on a specific variant), the adapter asks, in this order:

1. **Is there an attestation entry at this pointer at all?** If not — the archive never cited
   anything here — the field is `UnknownValue { searched: false }`: **not researched**. This is
   silence, not a finding.
2. **If there is an attestation, does it carry `confidence: unknown`?** If so, the field is
   `UnknownValue { searched: true }`: **researched, not found**. Someone looked, cited nothing
   positive, and said so. This is itself a piece of archival work, not a gap in it.
3. **If there is an attestation but the field's own value is empty** (an attestation can exist
   for a pointer whose value is `null`), the field is also `UnknownValue { searched: true }` —
   the archive attested to the absence, which reads the same as case 2 on screen.
4. **Otherwise** — an attestation exists, carries a confidence other than `unknown`, and the field
   is populated — the field is `SourceBackedValue`, at whatever confidence was actually recorded
   (never invented, never raised: an attestation with no confidence field is reported at
   `uncertain`, the weakest value that still means "attested," rather than promoted).

A **rendering convention** is not a fifth branch of this rule. It is a separate, later, opt-in step
that only ever fires *after* the rule above has already returned `unknown` for one of the six
gap-defined pointers `conventions/rendering-conventions.yml` lists (`when_absent`), and it never
overrides a `source-backed` value at any confidence — `docs/RENDERING_CONVENTIONS.md` §3 states this
as precedence ("the archive always wins") and `scripts/validate-conventions.mjs` enforces it as a
build rule, not a UI convention. Concretely in the shipped code: `resolveCubeVisualSpec()` and
`VariantPage.tsx`'s `inForce` filter only ever apply `cv-body-plastic-neutral` when
`isUnknown(view.colorway.body.plasticColor)` is already true — the convention fills a gap the rule
above already found, it does not create one.

So three states reach a page, and they must never be visually or verbally interchangeable:

| State | Why it happened | What produced it |
|---|---|---|
| **Not researched** | Nobody has looked yet, or (per `RESEARCH_FINAL_HANDOFF.md` item 8) it is a known collection-wide gap never logged per record | No attestation entry (rule 1) |
| **Researched, not found** | Someone looked and found nothing to attest | `confidence: unknown`, or an attested-empty field (rules 2–3) |
| **Rendering convention** | The archive made no claim, and the exhibition drew something anyway so the object could be shown at all | `conventions/rendering-conventions.yml`, applied only where the rule above already returned unknown |

### 5.2 How the three read on screen

`values.tsx`'s `BasisBadge` already renders exactly these three, in exactly this order of
precedence (convention checked first, since a convention-eligible pointer that is *also*
`source-backed` never reaches the convention branch at all — see §5.1's precedence rule):

```
convention   ⬙  Rendering convention          (cool slate, hatched rotated square — never a circle)
unknown      ○  Researched, not found          (neutral grey, dashed outline, no fill)
unknown      ○  Not researched                 (identical glyph — see §5.3 on why the WORDS carry
                                                 the distinction the glyph does not)
confirmed…   ●◕◑◌◐  Confirmed / Probable / Reported / Uncertain / Disputed
                                                 (warm bronze family + rust for disputed — §6 of
                                                 VISUAL_LANGUAGE.md)
```

Two design facts do real work here, both already shipped:

**The convention glyph is a different *shape*, not just a different colour** (a hatched, rotated
square, never a circle) — `VISUAL_LANGUAGE.md` §7's own reasoning: a visitor who has learned "circle
= the confidence system" still sees, correctly, that the convention badge is not part of that system
at all, even in greyscale or with a colour-vision deficiency. A colour-only distinction here would
be exactly the failure this section exists to prevent, because the convention badge sits closest of
anything in this design system to *looking like evidence*.

**"Researched, not found" and "not researched" share a glyph but never share words.**
`BasisBadge` renders `value.searched ? 'Researched, not found' : 'Not researched'` as visible text,
never abbreviated and never behind a tooltip — the two states are visually close (same grey, same
dashed circle) precisely because they are close in what a visitor should feel about them: neither is
evidence, and treating one as more alarming than the other would misstate the archive's own
distinction (a `searched: true` field is *more* work, not less, than a `searched: false` one — the
absence of a magnifying-glass icon or a "coming soon" label matters here: neither reads as
provisional).

### 5.3 The fourth pattern: a real value with no attestation at all

§2.7's own two worked examples (`maglev-max-dual-wr-limited-edition`, `amyth-winter-limited-edition`)
only show the clean cases — a value with a confidence, or a bare `— unknown —` placeholder. The
adapter's rule 1 (§5.1) produces a case neither example shows: **a field the raw document actually
populates, with no attestation ever written for that pointer.** This is real, not hypothetical —
`data/variants/gan/gan-flagship-16/amyth-winter-limited-edition.yml` sets `colorway.scheme: custom`
in its document body, and its `attestations` block cites `/colorway/designation`,
`/colorway/body/plastic_color_name`, and `/edition/limited/run_size`, but never `/colorway/scheme`.
`UnknownValue.unattestedValue` exists exactly for this: the adapter carries `"custom"` through rather
than discarding it, tagged `basis: 'unknown', searched: false`.

On screen this must read as a fourth, distinct pattern from the three in §5.2 — not a new badge, but
a specific combination of the existing ones:

```
 colourway scheme        custom              Not researched     the archive's own document names
                                              ○                  this value, but no source was ever
                                                                  cited for it — shown, not sourced
```

`formatValue()` and `.spec__row[data-basis="unknown"] .spec__value` (`VariantPage.css`) already
produce this correctly — the value prints in the value column, italicised and at `ink-700` rather
than `ink-900`, with the "Not researched" badge sitting beside it exactly as it would beside a bare
`—`. What is thin today is the note column: nothing currently tells a visitor *why* a real word is
sitting next to "not researched" rather than a dash, and a visitor could reasonably read that
combination as a bug. The fix is a one-line rule, not a new component: whenever
`unattestedValue !== undefined`, the note column should read something to the effect of *"named in
the archive's own record; no source was cited for this specific detail"* — distinguishing it from
the bare-dash case, where there is nothing to name at all. This is the one place in §5 where the
built pages are thinner than the rule they implement, and it is a small, named gap rather than a
structural one.

### 5.4 The aggregate view — `/unknowns`

§2.13 already specifies the layout; this is the rule applied at the scale that page exists to show.
`/unknowns` opens on the four headline blocker counts from `docs/RENDERING_CONVENTIONS.md` §1 —
**0 of 527** for face colour, logo placement and geometry profile; **22 of 527** for body plastic
colour — stated against the **archive's 527**, not the research-preview bundle's 511, and that
choice is deliberate, not a rounding difference: `rendering-conventions.yml`'s own header explains
it — "a convention describes a gap in what was researched, and that gap does not change when a
build filter changes." A gap is a fact about the archive, not about which build filter happens to be
active this week; showing 511 here would make the headline number drift every time a curation pass
promotes a record's `status`, for no reason connected to whether that record's face colour is
documented. Per-manufacturer bars beneath the headline split `unknown` (searched) from absent (not
searched) using the same rule 1 vs. rules 2–3 distinction as §5.1, reproducing
`report-coverage.mjs` rule 32's own computation rather than a new one — e.g. GAN: 213 attested / 161
explicitly `unknown` / 1,456 absent, of 1,830 critical-field slots. A visitor clicking any segment
filters straight to the underlying model/variant list — the dashboard is required to be a starting
point for descent, not a terminal chart.

### 5.5 Where the rule extends past a field: roster-level unknown

Everything above is about one field on one record. The same three-way discipline has to survive at
the *roster* level too, or Browse quietly reintroduces the exact confusion §5 exists to prevent —
this was flagged directly against §2.2's original text, which claimed "every manufacturer has ≥1
model by construction." Measured against `data/manufacturers/` and `data/models/`, that is false:
**12 of 54 manufacturers have zero model records**, and — this is the part that matters — they are
not one kind of zero:

- **5 are `kind: service`** (`thecubicle`, `speedcubeshop`, `picube`, `saocube`, `cubicle-labs`) —
  aftermarket modification services and retailers, not model-producing manufacturers at all. Zero
  models is **permanent and correct**, not a gap: PiCube's own work is fully represented in the
  archive, just as a *variant* on someone else's model —
  `gan-flagship-16--picube-20-magnet-ball-core-mod` carries 19 attestations. A roster row reading
  "0 models" for `picube` without saying why would misstate a structural fact as an unfinished one.
- **1 is `kind: sub_brand`** (`limcube`) — a different structural case again: its models, if any are
  ever enumerated, may belong to a parent manufacturer's roster instead, so "0" here is a
  classification fact, not a research outcome.
- **6 are `kind: manufacturer` with zero models** (`hellocube`, `lanlan`, `ninja`, `verypuzzle`,
  `xinlexin`, `zcube`) — and these genuinely **are** research gaps: the manufacturer's identity is
  established (each has its own record, `status: drafted` or `sourced`) but model enumeration has
  not been done. This is the roster-level equivalent of `searched: false` — not researched — and it
  is the only one of the three that should read as an open task rather than a closed fact.

None of the three renders as a thin-maker card (§2.2's third tier: "an archival card, not a
gallery," which promises *one documented model* — a positive claim these records cannot make).
`/makers/picube` instead states the structural fact directly (something in the register of *"PiCube
is a modification service. Its work is documented on the models and variants it modifies —
see: GAN16 Maglev MAX 20-Magnet Mod →"* rather than an empty gallery shell), `/makers/limcube`
states the sub-brand fact, and `/makers/zcube` (etc.) states the research gap in the same words
`/makers/gan`'s founding date does when it is wholly `unknown` (§2.3): *"0 documented models —
researched, not found"* would be wrong here, since these are `drafted`/`sourced` identity records
whose model enumeration was never attempted, which is `searched: false` at the roster level, not
`searched: true` — the correct string is **"No models documented yet."**, not "not found."

### 5.6 What must never happen

Collecting the non-negotiables this section has argued for, so a future page cannot drift from them
one component at a time:

- **A `searched: false` field must never render identically in wording to a `searched: true` one.**
  Same glyph is acceptable (§5.2); same words are not.
- **A convention must never be presented as if it could be evidence**, including by proximity —
  §5.2's shape rule exists because a hue-only distinction was judged insufficient given how
  consequential this one is (`VISUAL_LANGUAGE.md` §7).
- **An unknown value must never be dimmed to the point of being skippable.** `spec__row[data-basis="unknown"]`
  sits at `ink-700`, independently AA-verified at body size (`VISUAL_LANGUAGE.md` §9) — not `ink-500`
  or lighter, which would relegate a finding to the visual status of a footnote.
- **A gap must never be hidden by silently promoting `unknown` to a plausible-looking guess.** This
  is the entire reason a convention exists as a separate, disclosed layer rather than as an
  unlabelled default value slipped into the same field a source-backed value would occupy.
- **A roster-level or aggregate zero must never collapse into one meaning.** §5.5's three-way split
  is the same discipline as §5.1's field-level rule, applied one level up, and both must be built the
  same way for the same reason: a zero that could mean three different things is not a finding until
  the page says which one it is.

---

## 6. Microcopy

The actual strings. Where a string is already shipped in `web/src/`, it is quoted verbatim and
marked **[shipped]** — this document does not get to write a parallel version of copy that already
exists in code, and neither does the next lane. Where a string is specified here for a page or state
that is not yet built, it is marked **[specified]**. Where the registry's own `visitor_disclosure`
is the authoritative wording, it is quoted from `conventions/rendering-conventions.yml` directly,
per this lane's mandate — no paraphrase is offered beside it.

### 6.1 The six confidence values

Badge labels, **[shipped]**, `web/src/exhibit/values.tsx` `CONFIDENCE_LABEL`:

> Confirmed · Probable · Reported · Uncertain · Disputed · Unknown

One-line plain-language glosses, **[specified]**, for `/case`'s tier/confidence vocabulary panel
(§2.12) — grounded in `vocab/confidence.yml`'s own definitions, not a new taxonomy:

- **Confirmed** — "A tier 1 source states this directly, or two independent tier 2 sources agree."
- **Probable** — "One tier 2 source states this, and nothing contradicts it."
- **Reported** — "A tier 3 source states this — plausible and uncontradicted, and nothing stronger
  was found."
- **Uncertain** — "The evidence is weak, single-sourced, or sits oddly with what else is known."
- **Disputed** — "Credible sources disagree. Both readings are kept here; neither is chosen for
  you."
- **Unknown** — "This was searched for and not found. That is not the same as not having been
  searched — see below."

### 6.2 The two unknown kinds

Badge labels, **[shipped]**, `values.tsx` `BasisBadge`:

> Researched, not found.
> Not researched.

Longer form, **[specified]**, for the note column when more room exists (§5.1's rules 2–3 vs.
rule 1 respectively):

- "Researched, not found." → *"This was looked for. No source states it, in either direction."*
- "Not researched." → *"No source has been checked for this yet."*

The unattested-value pattern (§5.3), **[specified]** — the one microcopy gap this lane is leaving
named rather than silently unfixed:

> *"Named in the archive's own record; no source was cited for this specific detail."*

### 6.3 Rendering conventions — the registry's own words, quoted

Per this lane's mandate: the registry is authoritative. These six are `visitor_disclosure`, copied
verbatim from `conventions/rendering-conventions.yml` — **[shipped]**, rendered by
`VariantPage.tsx`'s convention list and `ConventionsPage.tsx` without alteration:

- **`cv-face-colours-wca-standard`** — "Rendering convention. The archive does not document this
  cube's colours. The standard scheme is drawn so the object can be shown at all."
- **`cv-body-plastic-neutral`** — "Rendering convention. Body colour is not documented for this
  cube; a neutral material is shown."
- **`cv-logo-omitted`** — "Rendering convention. Logo placement is not documented for any cube in
  this archive, so no logo is drawn on any of them."
- **`cv-geometry-generic-3x3`** — "Rendering convention. No cube in this archive has a documented
  piece geometry. A generic shell stands in for every one of them."
- **`cv-size-56mm-fallback`** — "Rendering convention. This cube's size is not documented; it is
  drawn at 56 mm so it can sit beside the others. Do not read its scale as a fact."
- **`cv-surface-stickerless-fallback`** — "Rendering convention. This cube's surface type is not
  documented; a stickerless finish is shown."

The badge label beside each, **[shipped]**: "Rendering convention" (never "Convention" alone —
the full noun phrase disambiguates from a museum's other, ordinary sense of "convention" as in
"gathering").

### 6.4 Dispute framing

Real, already-specified strings, consolidated here as the dispute-copy pattern for any future page
to match rather than reinvent:

- GAN's founding record, **[specified, §2.3]** — "DISPUTED ⓘ — four candidate events, not one
  error." The parenthetical is load-bearing: it heads off the reading "the archive doesn't know
  when GAN was founded" in favour of the true one, "the archive knows four candidate answers and
  declines to pick."
- A flagged-but-unresolved chain link, **[specified, §2.4]**, GAN13: "GAN13: seen in one 2025 maker
  listing, absent from a later one — flagged, not resolved." Pattern: state the two observations
  plainly, then name what has *not* happened to them (resolution), rather than implying one is more
  likely correct.
- A maker's own deliberate gap, **[specified, §2.4]**, MoYu WeiLong: "V3–V8 never existed" — printed
  directly on the succession chain, not in a footnote, because this is the one dispute-adjacent case
  that isn't a dispute at all: it is a documented fact about the maker's own numbering, and treating
  it with the same hedging language as a real evidentiary conflict would misrepresent it as less
  certain than it is.
- The refusal case, **[specified, §2.12]**, `gan-354-m`: the page states the rejected reading
  ("Added: 2018-09-11," a catalogue-migration artefact appearing verbatim 29 times across 22
  sources and 13 unrelated brands) and the retained one (`uncertain`) side by side, plus the open
  question it raised, by name — ledger item **P4-7**, "whether such a stamp may be used as a bound
  at all."

### 6.5 Record status vs. confidence — kept in different words on purpose

Per §1.0, these are different axes and must never share vocabulary. Record status, **[specified]**,
plain-language per value (`vocab/record-status.yml`, museum-voice gloss):

- **stub** — "Researched, not yet reviewed by a curator." **[shipped]**, `VariantPage.tsx`'s exact
  status line for the 527 variants and most models currently at this status.
- **drafted** — "Under active research."
- **sourced** — "Cited to at least one source; not yet reviewed."
- **reviewed** — "Checked by a curator against its sources."
- **published** — "Reviewed and released." (Not currently reachable: `meta.json`'s own
  `research-preview` bundle emits zero records at this status.)
- **disputed** (as a *record* status, not a field confidence) — "The record itself, not just one of
  its fields, is contested."
- **deprecated** — "Superseded or withdrawn; kept for the archive's own history."

### 6.6 Empty states

- Search, no match — **[shipped, §2.14]**: "No record matches '_x_' — try a manufacturer or model
  name; aliases are searched too."
- A record with no lead claim — **[shipped]**, `LandingPage.tsx`: "This record carries no
  adjudicated claim yet. That is itself the finding."
- A variant with no cited evidence — **[shipped]**, `VariantPage.tsx`: "No source is cited on this
  record or the model it inherits from."
- A manufacturer whose zero models is structural (§5.5) — **[specified]**, `kind: service`: *"[Name]
  is a modification service. Its work is documented on the models and variants it modifies."*, with
  a direct link to at least one (`picube` → `gan-flagship-16--picube-20-magnet-ball-core-mod`).
- A manufacturer whose zero models is a sub-brand fact (§5.5) — **[specified]**, `kind: sub_brand`:
  *"[Name] is recorded as a sub-brand. Its models, if any are documented, may be listed under its
  parent."*
- A manufacturer whose zero models is a real gap (§5.5) — **[specified]**, `kind: manufacturer`:
  *"No models documented yet."* — never "not found," which in this vocabulary means *searched*; this
  case has not been.
- A family with only one model (§2.4) — no string needed: the chain itself renders as a single node
  with no arrows, which is the honest visual, not a caption explaining the absence of a chain.

### 6.7 Loading states

Every one currently shipped skips a spinner and skips shimmer (`VISUAL_LANGUAGE.md` §5's banned-motion
table: "a shimmering placeholder implies content is *about* to resolve into something specific" —
false, here, more often than it's true) in favour of a short, plain present-participle line:

- `LandingPage.tsx` — **[shipped]**: "Opening the archive…"
- `VariantPage.tsx` — **[shipped]**: "Opening the case…"
- `ConventionsPage.tsx` — **[shipped]**: "Reading the registry…"
- `LazyCube.tsx`'s plinth, while the 3D engine chunk loads — **[shipped]**: "Placing the object…"
- `App.tsx`, while `meta.json` itself is still loading, before any page can render — **[shipped]**:
  "Opening the archive…" (shared with Landing's own loading line, since at this point in the
  lifecycle no page has been selected yet).

Pattern for pages not yet built, **[specified]**: present participle, object of the verb is the
*thing being opened*, never the mechanism ("Opening the archive…", not "Fetching data…" or "Loading
manufacturers.json…") — a visitor is waiting on a door, not a network request.

### 6.8 Error states

**This is a real, named gap, not a polished area.** Every error boundary shipped today
(`LandingPage.tsx`, `VariantPage.tsx`, `ConventionsPage.tsx`) renders the caught JavaScript error's
own `.message` verbatim and nothing else — technically honest (nothing is hidden) but not museum
voice, since a raw `Error: No variant gan-flagship-16--nonexistent in this bundle.` string was
written for a developer's console, not a visitor's eye. The rule this section proposes, **[specified]**,
consistent with §6's "never apologetic, never salesy" constraint (no "Oops!", no "Something went
wrong," no exclamation mark anywhere):

> *"This [record / registry / page] could not be opened. [underlying detail, unedited]."*

e.g. for the one error condition that can currently occur in the shipped code (`VariantPage.tsx`,
a variant id absent from the bundle): *"This variant could not be opened. No variant
gan-flagship-16--nonexistent in this bundle."* — the museum states the failure as a fact about the
archive's own retrieval, then discloses the technical detail rather than swallowing it, the same
posture the rest of this document takes toward every other kind of gap.

---

## 7. Responsive behaviour

Two breakpoints are already shipped, and they disagree with each other on purpose, because they are
solving different problems: `LandingPage.css` collapses at **60rem** (a two-column exhibit becoming
one column is a layout problem, and 60rem is where the label column would otherwise get
uncomfortably narrow beside the object), and `VariantPage.css` collapses its specification table at
**52rem** (a narrower point, because the table transform is triggered by content density — a table
column, not a page layout — and holds out slightly longer than the landing grid before giving up
horizontal space). Every page spec below should pick *its own* breakpoint the same way: by what
actually gets cramped first, not by copying a shared number.

### 7.1 Per page type

| Page type | Desktop (>60rem) | Tablet (~40–60rem) | Mobile (<40rem) |
|---|---|---|---|
| **Landing** (built) | Two-column exhibit: object left, label right, side by side (`grid-template-columns: 5fr 6fr`) | Same two-column layout down to 60rem, object shrinking with the column | **Single column below 60rem** (`LandingPage.css`): object first, capped at 26rem and centred, label follows beneath it — "the object leads and the label follows, rather than the object being squeezed beside text that then has nowhere to go" (the file's own comment). Three-ways-in list and the count row both wrap via `auto-fit`/`flex-wrap`, no horizontal scroll anywhere. |
| **Variant detail** (built) | Single centred column, max 72rem, spec table as a real `<table>` | Same column; table remains a table down to 52rem | **Below 52rem** (`VariantPage.css`): the spec table's `<thead>` is visually hidden (clipped, not `display:none`, so it stays in the accessibility tree) and each row becomes a labelled block — field name as a small caps mono label, value, basis badge and note stacked vertically. This is the one responsive transform this document treats as non-negotiable: **a confidence column a visitor must scroll sideways to find is one that gets missed**, so it is never allowed to become a horizontally-scrolling table at any width. |
| **Makers root** (§2.2, not built) | Three tiers, deep tier as a fixed-size card row, mid tier as a denser row, thin tier as a compact list | Tiers keep their identity but the deep-tier row wraps to two lines of cards rather than one | Tiers **stack, never merge** (§2.2's own hierarchy rule) — each tier header stays, deep-tier cards go to one per row rather than shrinking illegibly, and the 37-entry thin tier becomes a plain scrollable list rather than a card grid at any width, since a 37-card grid was never the right shape even on desktop. |
| **Maker room** (§2.3) | Header + families panel + model roster as three stacked sections, roster in a filterable grid | Same stacking, roster grid narrows to two columns | Roster grid becomes a single column list; the thin-maker archival card (§2.3's YanCheng example) does not change shape at all across breakpoints — it is already small, and further compression would start cutting its one paragraph of archivist's own words, which this document will not allow. |
| **Family/lineage chain** (§2.4) | Horizontal chain, arrows and gap labels inline | Horizontal chain, condensed spacing, gap labels stay inline | **Chain rotates to vertical** — each generation becomes a stacked node top-to-bottom rather than a horizontal scroll, because a horizontally-scrolling succession chain would hide exactly the kind of gap (MoYu WeiLong's "V3–V8 never existed") this document has repeatedly insisted must never require a visitor to scroll to discover. The outlier panel (a family's off-chain model, §2.4) stays below the chain, never beside it, at any width. |
| **Model detail + compare** (§2.5–§2.6) | Compare table as a real table, one column per variant | Compare table remains tabular to a point, then follows the exact §52rem transform already shipped on the variant page — **the same component, same rule, reused rather than redesigned**, since a comparison table's confidence glyphs are exactly the content the variant page's rule already protects | Compare becomes a stacked block per variant (not per axis) — each variant's differing axes listed together, so a visitor reads "this variant" as a unit rather than hunting one axis across N stacked mini-tables. |
| **Mechanism / lineage / timeline roots** (§2.9–§2.10) | Strip/axis view with full population-count labels | Same, tiles narrow | Tiles stack to a single column strip, scrolling vertically (never horizontally-scrolling tile rails, which is the same anti-pattern as a sideways-scrolling spec table, applied to a different content shape) |
| **Edges / Case / Unknowns** (§2.11–§2.13) | Each case/claim as its own full-width block | Same | Same — these pages are already single-column, prose-forward pages at every width the mandate covers; nothing here is a responsive design problem, which is itself worth stating so a future lane doesn't invent breakpoint work these pages don't need. |
| **Evidence drawer** (§2.8, not built) | Slide-in panel from the right, ~28rem wide, page content remains visible and scrollable behind it (§3.3's "never modal-blocking" rule) | Same slide-in behaviour, narrower panel (~22rem) | **The one place this document lets §3.3's own rule bend, and says so explicitly** — see §7.2. |

### 7.2 What mobile sacrifices: the evidence drawer's persistence model, first

§3.3 sets three contracts for the drawer: shareable (`?evidence=`), back-button-safe, and "never
modal-blocking" — the rest of the page stays visible and scrollable behind a slide-in side panel.
The first two survive unchanged at every width; the third is the one this document explicitly
relaxes on mobile, because a ~28rem side panel on a 22rem-wide viewport is not a panel beside the
page, it is the entire page with extra steps, and pretending otherwise would be worse than admitting
it plainly:

- **Below 40rem, the drawer becomes a bottom sheet, not a side panel** — it rises from the bottom to
  roughly 70% of the viewport height, leaving a visible strip of the underlying page above it. That
  strip is the concession that keeps faith with §3.3's spirit even though the letter (page "remains
  visible and scrollable behind") can't hold at full width: a visitor comparing a spec-table row
  against its evidence still sees *something* of the row they came from, even if not the whole table.
- **The sheet itself scrolls independently**, exactly as the desktop panel does — a long excerpt or
  a source with many citing claims (§2.8's `/evidence/:sourceId` reverse index) does not push the
  close button off-screen.
- **Shareable and back-button-safe are non-negotiable at every width**, including mobile — `?evidence=`
  in the URL and one history entry per open/close are cheaper to implement correctly than they are to
  special-case away, and a visitor on a phone sharing a citation is exactly as real a use case as one
  on a desktop.
- **Nothing else about mobile is allowed to touch the drawer's other two contracts.** The temptation
  on a small viewport is often to make an overlay non-dismissable-by-back-button "for simplicity" —
  this document rules that out explicitly, because it is the exact "surprise jump two levels up the
  hierarchy" §3.3 was written to prevent, and a phone visitor is not owed a worse navigation model
  than a desktop one.

No other page in this document sacrifices a *contract* on mobile, only layout — this is deliberate:
a responsive pass that quietly drops a promise (evidence stays reachable, gaps stay visible, a chain
gap never requires horizontal scrolling to find) on the narrowest, most common viewport would let the
mobile experience of this museum be a lesser one precisely where the desktop experience is proudest.

---

## 8. Accessibility

`EXHIBITION_ARCHITECTURE.md` §7 states the fact this whole section has to design around: **0 of 527
variants are `render_ready`.** Every cube this exhibition shows is, in some measure, the non-WebGL
fallback's cousin already — a drawing standing in for a fact nobody has, not a scan. The fallback
this section assesses is therefore not an edge case bolted on for a rare browser; it is a second,
narrower instance of the same honesty problem every other page in this document solves.

### 8.1 Keyboard path, per built page

Only three pages exist to walk today; each is traced completely, since a complete trace of three
real pages is worth more than a speculative one of twelve.

**`/` (Landing):** the preview banner and the cube (`role="img"`) are correctly outside the tab
order — neither is interactive, and a `role="img"` container is not a native focus target. The
walkable path is short: **claim source link** (if the featured record's lead claim carries a URL)
→ **"Everything the archive holds on this object"** → **Browse** → **Interrogate**. The pending
**Trace** entry is a plain `<span>`, not a link (`.landing__way--pending` in `LandingPage.css`
explicitly says so), and correctly never receives focus — an unbuilt path that could still be
tabbed to and activated into nothing would be worse than one that is honestly absent from the tab
order.

**`/models/:modelId/variants/:variantId` (Variant):** **breadcrumb "Archive" link** → any
**evidence citation with a URL** (in tier order, external, `target="_blank"`) → **"Every rendering
convention in force"** link. Two gaps worth naming plainly rather than glossing: the confidence
badges throughout the specification table (`BasisBadge`) are plain `<span>`s today, not buttons —
so §3.4's promised behaviour ("every confidence tag is also an Interrogate entry point") is not yet
keyboard-reachable per claim, only reachable in aggregate via the flat evidence list at the page's
foot. A keyboard visitor can still reach every citation, just not scoped to the one row they were
reading. And the rendering-convention list (`variant__convention-list`) is likewise inert — its
`BasisBadge`s carry no `title`-triggered interaction a keyboard user can invoke, so the convention
detail a mouse user gets from hovering the `title={value.conventionId}` attribute is not reachable
by keyboard at all; the visible `visitor_disclosure` paragraph beside each item is the keyboard
user's only access to that information, which is sufficient content-wise (nothing is withheld) but
means the `title` attribute is decorative rather than a real access path.

**`/conventions`:** **"Back to the archive"** link, then the page is a single long read with no
further interactive elements — appropriate, since nothing on this page currently needs a second
destination (a future "see an example on a real variant" link per convention would be a natural
keyboard stop to add, and is not built).

**What is not built at all:** the persistent header §3.2 specifies (home / entry-path chip /
breadcrumb / search, present on every page) does not exist in `App.tsx` — each page currently
supplies its own ad hoc "get back" link rather than sharing one component. There is also no skip
link (`tokens.css`'s `--z-max` comment reserves the z-index for one — "skip link" — but nothing
consumes it yet). Both are real, load-bearing gaps for keyboard use specifically: without the
persistent header, "Home always returns to `/`... the one link guaranteed present and identical on
every page" (§3.2) is not yet true, and without a skip link every keyboard visitor re-tabs through
the same breadcrumb/banner chrome on every page load before reaching content.

### 8.2 Focus order, restated as a rule for pages not yet built

The pattern the three built pages already agree on, made explicit so the next twelve don't drift:
**structural return-path link first (breadcrumb/back), primary content next in reading order,
outbound citations in evidence order (never DOM-shuffled by hover state), single trailing
cross-reference last.** Nothing in this document's built pages relies on `tabindex` greater than 0
anywhere — source order *is* focus order throughout, which is also why §2's own "reading order" for
every page spec doubles as its keyboard order with no translation needed.

### 8.3 Reduced motion — two mechanisms, not one, because two rendering technologies are in play

`base.css` §4 collapses `--duration-*` to near-zero under `prefers-reduced-motion: reduce`, which
handles every CSS transition in the system (theme cross-fade, link colour, hover states) for free —
a component author never writes a second media query as long as they animate against the tokens.
That mechanism cannot reach into the 3D layer, because a CSS custom property cannot drive a
`requestAnimationFrame` loop inside Three.js — so `CameraChoreographer` (`web/src/three/CameraStates.ts`)
carries its **own**, independent check: `reducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches`,
wired in by `CubeCanvas.tsx`, read fresh at the moment of every `moveTo()` call rather than cached
once. When it reads `true`, the camera **snaps** to the target state instead of tweening across
`--duration-deliberate` (700ms) — the one motion `VISUAL_LANGUAGE.md` §5 calls "museum pacing"
reserved for an object arriving on its plinth. Concretely, this also means the render loop
(`CubeCanvas.tsx`'s on-demand `tick`) never spins up at all for a reduced-motion visitor loading a
page whose camera starts already at its resting state — no animation to skip, so no per-frame cost
either. **Both mechanisms are wired, not just the CSS one** — this is worth stating because it would
have been easy to ship the CSS layer, believe "reduced motion is handled," and miss that the one
piece of motion this design system treats as significant enough to name (§5's "one signature move")
lives entirely outside CSS's reach.

### 8.4 The non-WebGL fallback, assessed

`CubeCanvas.tsx` wraps `new SceneRig(...)` in a `try/catch`; `SceneRig`'s own `THREE.WebGLRenderer`
constructor throws when no WebGL context is available, and the catch sets a `failed` string that
switches the component to `cube-canvas--unavailable`. What that state renders:

> "This browser cannot draw the object. Nothing is lost from the record: the cube was never
> photographed, only drawn, and everything it showed is described in words on this page."

**What is right about it:** it does not apologise for the browser, and it does not treat the failure
as a lesser experience — it reuses the exact honesty framing the rest of the archive uses for a
missing fact ("nothing is lost... described in words") to describe a missing *rendering capability*,
which is the correct move: a visitor who cannot see the cube loses precisely as much as a visitor who
can, since what the cube shows is mostly convention rather than fact regardless. The fallback also
reuses the *same* `aria-label` text the working `CubeCanvas` passes in (`LazyCube`'s `label` prop is
shared across both branches), so a screen-reader visitor receives identical information whether or
not their browser can render WebGL — the fallback is not a second-class description.

**What is thin, on inspection:** three things, named precisely rather than hand-waved —

1. **Only construction failure is caught.** A context that is created successfully and then lost
   mid-session (`webglcontextlost`, a real event on GPU driver resets, especially on lower-end
   mobile hardware) has no listener anywhere in `SceneRig` or `CubeCanvas` — a visitor in that
   situation would be left with a blank or frozen canvas, not the honest fallback text, because the
   `try/catch` already ran and succeeded before the loss occurred.
2. **The fallback's own accessible name may not expose everything a sighted visitor sees.** The
   `cube-canvas--unavailable` div carries `role="img" aria-label={label}` as a single node with two
   visible `<p>` children (the label restated, then the reason). Several screen readers treat a
   `role="img"` element's content as equivalent to an `<img>`'s — exposed only via its accessible
   name, with DOM children not independently announced in browse mode. If that holds for the
   assistive technology a given visitor uses, they would hear the `aria-label` text but not
   necessarily the second paragraph's specific reassurance ("nothing is lost from the record")
   as separate content — the same information is present in `label`, which already states "its
   colours, piece geometry and surface are rendering conventions, not documented facts" (VariantPage)
   or the equivalent (Landing), so nothing is actually withheld, but the two-paragraph structure
   visible on screen is not guaranteed to be two announced units for every AT.
3. **No listener for WebGL becoming unavailable *after* the component has already committed to the
   working branch** at all (point 1's specific case), and no periodic re-check — reasonable for a
   v1, but worth stating as a known boundary rather than an implicit one.

None of the three is a reason to rebuild the fallback; the second is a candidate one-line fix
(`aria-describedby` pointing at the reason paragraph, rather than relying on children of a
`role="img"` node) for whichever lane next touches `CubeCanvas.tsx`, and the first and third are
scoped, named follow-up work rather than an open-ended concern.

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
- [x] §5 unknown experience
- [x] §6 microcopy
- [x] §7 responsive behaviour
- [x] §8 accessibility
- [ ] §9 vertical slice full spec
