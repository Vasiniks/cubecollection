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

*Skeleton.* For each route in §1: first thing seen, reading order, content hierarchy, what is
interactive, empty/unknown handling, loading state. ASCII wireframes at key levels
(maker → family → model → variant → evidence).

---

## 3. Navigation model

*Skeleton.* How a visitor descends manufacturer → family → model → variant → evidence and returns
without losing place — breadcrumb behaviour, back-button semantics, and what persists across a
descent (the evidence drawer, the current entry-path context).

---

## 4. The three entry paths, made concrete

*Skeleton.* Browse (by maker, the default), Trace (by lineage or mechanism), Interrogate (by
evidence, challenging a claim) — concrete starting screens, concrete first clicks, using real
families and disputes already in the archive (e.g. the GAN founding-date dispute, the MoYu WeiLong
numbering gap, ledger item P4-7's catalogue-artefact date).

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
- [ ] §2 page specs — all routes, wireframes
- [ ] §3 navigation model
- [ ] §4 entry paths made concrete
- [ ] §5 unknown experience
- [ ] §6 microcopy
- [ ] §7 responsive behaviour
- [ ] §8 accessibility
- [ ] §9 vertical slice full spec
