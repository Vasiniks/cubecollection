# DATA_MODEL

The schema of the cubecollection archive. Version 2, implemented.

**No cube data has been collected.** `data/` is empty by design: Phase A builds the structure,
and research begins with the GAN pilot only after this document is in force.

Companion documents:

- [PRODUCT.md](PRODUCT.md) — durable product truth
- [RESEARCH_SPEC.md](RESEARCH_SPEC.md) — scope policy, source practice, the nine research passes, worked boundary examples, and the GAN pilot
- [docs/implementation-manifest.md](docs/implementation-manifest.md) — every file that exists and why

Everything here is enforced by `scripts/`. A rule stated in this document and not enforced
by a script is a rule that will quietly stop being true, so each one names its check.

## Changes in v2

| # | Change | Where |
|---|---|---|
| 1 | Scope classes; conditional admission for non-WCA-legal cubes; rebrands preserved | §1.4, RESEARCH_SPEC.md §2 |
| 2 | Explicit model/variant boundary rule — design/mold/mechanism vs. sold configuration | §4.2 |
| 3 | Colorway expanded from a label to a full renderable description | §3.6 |
| 4 | Media and representation split; procedural geometry is first-class and unpopulated | §3.7 |
| 5 | Legality with historical periods | §3.8 |
| 6 | D3 relaxed: preservation by archive, local capture, **or** excerpt; method recorded | §0 D3, §5.3 |
| 7 | Price kinds made explicit; derived "current value" removed entirely | §3.9 |
| 8 | Rarity stays qualitative; structured evidence factors added; numeric score forbidden | §3.10 |
| 9 | Specimen privacy enforced at the build boundary; two bundles | §8.6 |
| 10 | GAN pilot before any scaling | RESEARCH_SPEC.md §7 |
| 11 | Documents before implementation | this revision |

Two rules were added during implementation, in §7.7, when the schema annotations they
enforce turned out to need enforcing. One rule was corrected: see the inheritance clause in
§7.2 rule 6.

---

## 0. The three founding decisions

**D1 — The atomic unit of the archive is the *variant*, not the model.**
A model is a *design*. The objects are the configurations that were sold. The model holds what those configurations genuinely share, so shared facts are written once. Unchanged from v1, and §4.2 now states the boundary explicitly.

**D2 — Provenance is a sidecar keyed by JSON Pointer, not a wrapper around every value.**
The data stays flat and readable; an `attestations` block in the same file addresses individual fields by pointer. Unchanged from v1.

**D3 — A source is preserved before it is cited. *(revised)***
Manufacturer and retailer pages for discontinued cubes are deleted, not archived, so a 2016–2026 archive built on live URLs decays. v1 required an archival URL and made unarchived sources unusable. That is too rigid: it blocks research on material that cannot be archived at all — a printed manual, a paywalled page, a video, a physical package.

The rule is now that a source backing a critical field must carry **at least one** preservation method, and must record which:

| Method | What it is | Preference |
|---|---|---|
| `archive_url` | Third-party web archive capture | Strongly preferred |
| `local_capture` | Preserved local copy — PDF, screenshot, saved page — with path and checksum | Preferred |
| `excerpt` | Verbatim quotation of the passage that supports the claim, long enough to stand alone | Acceptable |
| `none` | Nothing preserved | Blocks the record from `published` |

The preference order is enforced by reporting, not by blocking: §7.5 reports the preservation mix so weak preservation stays visible instead of quietly accumulating.

---

## 1. The data model

Twelve entities. Six carry the archive, six support it.

### 1.1 Core chain

| Entity | What it is | Example shape |
|---|---|---|
| `manufacturer` | A brand, sub-brand, or aftermarket service | A brand; a sub-brand of a brand; a retailer that services cubes |
| `family` | A named product line persisting across designs | |
| `model` | One design generation — a distinct mechanism and tooling | |
| `variant` | **The atomic record.** One materially distinct configuration as sold | |
| `specimen` | One physical unit the archivist owns. Private by default | |

`manufacturer → family → model → variant → specimen`, each a containment relationship.

### 1.2 Evidence, identity, and rendering

| Entity | What it is |
|---|---|
| `source` | A citable document, with its preservation method |
| `media` | A 2D asset — photograph, manufacturer render, listing image, diagram, video still — with class, role, rights, and provenance. Records live inside the variant; binaries under `assets/` |
| `geometry_profile` | A reusable 3D shell description shared by models built on the same mechanism. **Reserved and unpopulated in this phase** |
| `person` | A named individual behind a signature, collaboration, or design |
| `event` | A named event a commemorative edition refers to |
| `price_observation` | One dated, typed price fact. Lives inside the variant |
| `relationship` | A typed, directional edge between records |

### 1.3 Why aftermarket services are `manufacturer` records

A serviced cube is materially different from the base cube and is collected as a distinct object. Modeling the servicer as a `manufacturer` with `kind: service`, and the serviced product as a variant with a `modified_from` relationship, means the coating axis needs no special case and the base cube's research is not duplicated across service tiers.

### 1.4 Scope classes *(new)*

Every `model` and `variant` carries a `scope_class`. This is the structural answer to "do not let novelty cubes overwhelm the main archive": conditional records exist, are findable, and are excluded from the archive's default view.

| Value | Meaning | Admission requirement |
|---|---|---|
| `core` | WCA-legal 3×3, in the main archive | Meets the scope policy in RESEARCH_SPEC.md §2 |
| `conditional` | Non-WCA-legal 3×3 admitted on historical or collector significance | Requires `scope_justification` prose **and** at least one Tier 1–3 source. Blocks `published` without both |
| `reference_only` | Recorded so researchers can identify and dismiss it, not exhibited | Identity and aliases only; never enters the public bundle's main index |

`scope_class` is a curation decision, not a fact about the object, so it carries an attestation only for the evidence behind its justification, and a `decided_by` / `decided_on` pair for the decision itself.

The build emits `core` as the archive, surfaces `conditional` behind an explicit affordance, and omits `reference_only` from the exhibition entirely.

---

## 2. Entity relationships

```
manufacturer ──< family ──< model ──< variant ──< specimen   (private)
     │                        │          │
     │                        │          ├──< media
     │                        │          ├──< price_observation
     │                        │          └──< relationship >── variant
     │                        ├── revision[]        (inline)
     │                        └──> geometry_profile  (reserved)
     │
     └── parent_manufacturer  (sub-brands)

variant ──> person   (signature / collaboration)
variant ──> event    (commemorative)
any record ──> source (via attestations, by JSON Pointer)
```

### Relationship types

| Type | Meaning | Note |
|---|---|---|
| `succeeds` | Later design in the same lineage | Usually model→model |
| `reissue_of` | Later production of a substantially identical product | |
| `modified_from` | Aftermarket service applied to a base variant | |
| `smart_version_of` | Electronic sibling of a mechanical variant | |
| `rebrand_of` | Same physical product sold under another brand | **Preserved, never collapsed.** Must be evidenced, never inferred from resemblance alone |
| `bundled_with` | Sold together as a set | |
| `commemorates` | Points at an `event` | |
| `signature_of` / `collaboration_with` | Points at a `person` | A signature edition bears a name; a collaboration means the person shaped the product |
| `duplicate_of` | Provisional — may be the same object as another record | |
| `merged_into` | Terminal — resolved as a duplicate and retired | Id retained forever |

Every relationship carries its own attestation. `rebrand_of` and `modified_from` are claims about the world, not bookkeeping.

### Inheritance and override

A variant inherits every specification from its model and overrides only what differs. Resolution is **variant value → model value → unset**, computed at build time. An override is a claim and carries its own attestation.

---

## 3. Field definitions

`?` = optional, `[]` = array, `enum:x` = validated against `vocab/x.yml`.

### 3.1 Common types

**`Date`** — precision-bearing. Never a bare string. The shape of `value` must match the
declared `precision`, which the schema enforces: `2019`, `2019-Q2`, `2019-04`, `2019-04-16`.

```yaml
value: "2019-04"          # ISO 8601, truncated to the precision actually known
precision: month          # year | quarter | month | day
qualifier: exact          # exact | circa | before | after | between
earliest: "2019-04-01"?   # required when qualifier is between
latest: "2019-04-30"?
note: ?
```

**`Money`** — a price as recorded. Converted currency is never stored as a fact.

```yaml
amount: 54.99
currency: USD             # ISO 4217, as originally quoted
region: US?
tax_included: false?
```

**`Attestation`** — the provenance unit, keyed by JSON Pointer.

```yaml
attestations:
  /release/0/date:
    confidence: confirmed
    sources: [src-a, src-b]
  /specs/weight_g:
    confidence: disputed
    disputed:
      - { value: 61.5, sources: [src-a], confidence: probable }
      - { value: 62.0, sources: [src-b, src-c], confidence: reported }
    adjudication: "Manufacturer figure preferred; retailers appear to round."
    adjudicated_by: archivist
    adjudicated_on: "2026-09-01"
```

The main document holds the adjudicated value; the attestation holds the full disagreement. An unadjudicated dispute is legal — the field carries `confidence: disputed` and the record cannot reach `published`.

**`Confidence`** — `confirmed` | `probable` | `reported` | `uncertain` | `disputed` | `unknown`.
`unknown` means researched and not found. Absent means nobody has looked. Coverage reporting depends on the distinction.

**`RecordStatus`** — `stub` | `drafted` | `sourced` | `reviewed` | `published` | `disputed` | `deprecated`.

**`Derivation`** *(new)* — attached to any value that was not stated by a source but produced from one.

```yaml
derived_from: sampled_from_image   # stated | measured | sampled_from_image | inferred
derivation_note: ?
```

A value with `derived_from: sampled_from_image` or `inferred` may never carry `confidence: confirmed`. This exists chiefly for normalized colors (§3.6), where the temptation to treat a pixel sample as a manufacturer specification is real and would corrupt procedural rendering.

### 3.2 `manufacturer`

| Field | Type | Notes |
|---|---|---|
| `id` | slug | Immutable |
| `name` | string | Preferred English name |
| `native_name` | string? | |
| `kind` | enum | `manufacturer` \| `sub_brand` \| `service` \| `collaborator` |
| `parent_id` | ref? | For sub-brands |
| `country` | ISO 3166-1? | |
| `founded` / `ceased` | Date? | |
| `aliases` | string[] | Every name any retailer has used |
| `website` | url? | |
| `notes` | markdown? | |
| `status`, `attestations` | | |

### 3.3 `family`

| Field | Type | Notes |
|---|---|---|
| `id` | slug | |
| `manufacturer_id` | ref | |
| `name`, `aliases` | string, string[] | |
| `introduced` / `discontinued` | Date? | |
| `positioning` | enum? | `flagship` \| `mainline` \| `budget` \| `smart` \| `special` |
| `description` | markdown? | |
| `successor_family_id` | ref? | |
| `status`, `attestations` | | |

### 3.4 `model`

| Field | Type | Notes |
|---|---|---|
| `id` | slug | |
| `family_id`, `manufacturer_id` | ref | |
| `name`, `aliases` | string, string[] | |
| `scope_class` | enum | §1.4 |
| `scope_justification` | markdown? | Required when `scope_class` is `conditional` |
| `generation` | object | `{ label, ordinal, basis: manufacturer_declared \| community_convention }` |
| `announced` / `released` | Date? | Earliest across regions |
| `designer` | ref[]? | |
| `specs` | object | Design-level defaults, overridable per variant |
| `revisions` | object[] | Production revisions of this design |
| `geometry_profile_id` | ref? | **Reserved.** Left unset in this phase |
| `description` | markdown? | |
| `status`, `attestations` | | |

**`model.specs`**

| Field | Type | Notes |
|---|---|---|
| `size_mm` | number? | Edge length |
| `weight_g` | number? | Belongs on the variant when it varies by configuration |
| `shape` | enum? | `standard` \| `pillowed` \| other |
| `core_system` | enum:core-systems? | |
| `maglev` | enum:maglev? | |
| `magnet_architecture` | enum:magnet-configurations? | |
| `adjustment_system` | enum:adjustment-systems? | |
| `materials` | object? | `{ plastic, hardware, magnets }` |
| `piece_count` | integer? | |

**`model.revisions[]`** — undeclared mid-production changes, almost always community-identified:

```yaml
revisions:
  - id: rev-b
    label: "Second mold"
    approximate_period: { value: "2020-Q3", precision: quarter, qualifier: circa }
    changes: "..."
    distinguishable_by: "..."
    basis: community_reported   # manufacturer_declared | community_reported | archivist_observed
```

A revision is not a separate file layer. A variant may pin `revision_ref`; most will not.

### 3.5 `variant` — the atomic record

| Field | Type | Notes |
|---|---|---|
| `id` | slug | §8.4 |
| `model_id` | ref | |
| `revision_ref` | string? | |
| `name` | string | |
| `aliases` | object[] | `{ name, retailer?, region?, source? }` |
| `scope_class`, `scope_justification` | enum, markdown? | §1.4. Inherits the model's unless overridden |
| `edition` | object | §3.5.1 |
| `config` | object | §3.5.2 — overrides `model.specs` |
| `colorway` | object | §3.6 |
| `legality` | object | §3.8 |
| `smart` | object? | Electronic cubes only |
| `packaging` | object? | `{ form, contents[], notable }` |
| `releases` | object[] | Per-region release facts |
| `pricing` | object | §3.9 |
| `availability` | object | §3.5.3 |
| `rarity` | object | §3.10 |
| `significance` | markdown? | Why a collector cares. Sourced; no fabricated superlatives |
| `media` | object[] | §3.7 |
| `representation` | object | §3.7 |
| `relationships` | object[] | §2 |
| `status`, `attestations` | | |

#### 3.5.1 `variant.edition`

```yaml
edition:
  types: [limited, commemorative]     # enum:edition-types, multi-valued
  name: "..."?
  designation: "..."?                 # the manufacturer's tier word for this configuration
  limited:
    is_limited: true
    run_size: 2000?                   # null when unknown; never estimated
    numbered: true?
    numbering_range: "1–2000"?
  signature_of: [person-id]?
  collaboration_with: [person-id | manufacturer-id]?
  commemorates: [event-id]?
```

Multi-valued because a cube can be limited *and* commemorative *and* a collaboration at once.

#### 3.5.2 `variant.config` — overrides only

```yaml
config:
  magnet_configuration: enum:magnet-configurations?
  magnet_strength: string?          # as described by source; not a normalized number
  core_system: enum:core-systems?
  maglev: enum:maglev?
  adjustment_system: enum:adjustment-systems?
  coating: enum:coatings?
  coating_applied_by: ref?          # an aftermarket coating names its service
  materials: object?
  size_mm: number?
  weight_g: number?
  lubrication: string?
```

#### 3.5.3 `variant.availability`

```yaml
availability:
  production_status: discontinued    # in_production | discontinued | limited_run_complete
                                     # | announced | cancelled | unknown
  discontinued: Date?
  still_purchasable_new: false?      # discontinued but sitting in retailer stock — a distinct state
  last_seen_available: Date?
```

Discontinuation is almost never announced. It is inferred from disappearance, so it defaults to `qualifier: circa` with low confidence, and `last_seen_available` records the evidence behind the inference.

### 3.6 `variant.colorway` *(substantially expanded)*

v1 treated colorway as a label. That is adequate for a catalog and inadequate for an archive whose exhibition may render cubes procedurally. A label cannot be rendered; a description can.

Every field is optional and populated only where evidence exists. An unpopulated colorway is an honest one.

```yaml
colorway:
  # --- identity, verbatim ---
  designation: "..."            # the manufacturer's own name for this colorway, verbatim
  designation_native: "..."?    # original-language name where it differs
  limited_name: "..."?          # marketing name of a special colorway
  scheme: standard?             # standard | bright | pastel | custom | unknown

  # --- application ---
  application: stickerless      # stickerless | stickered | hybrid | printed | inlaid | unknown

  # --- body ---
  body:
    plastic_color_name: "black"       # descriptive term as sourced
    plastic_color_normalized: "#0B0B0B"?
    translucency: opaque              # opaque | translucent | transparent | frosted_translucent
    finish: matte                     # matte | glossy | frosted | uv_coated | textured | soft_touch

  # --- per-face, in standard cube notation ---
  faces:
    - face: U                         # U | D | F | B | L | R
      color_name: "white"             # as the manufacturer or source names it
      color_normalized: "#F5F5F5"?
      material: plastic               # plastic | vinyl_sticker | printed | inlay
      finish: matte?

  # --- piece-level, only where pieces differ from the face scheme ---
  piece_colors:
    - piece_class: corner             # corner | edge | center | core | internal
      color_name: ?
      color_normalized: ?
      note: ?

  # --- surface pattern ---
  pattern:
    kind: none                        # none | gradient | marbled | printed_graphic | split
                                      # | glitter | metallic | glow | camouflage
    description: ?

  # --- logo ---
  logo:
    present: true
    placement: center_U               # center_U | center_multiple | corner | internal | none
    treatment: printed                # printed | engraved | sticker | embossed | inlaid | none
    description: ?

  # --- rendering readiness, derived at build time ---
  completeness: partial               # none | partial | face_complete | render_ready
```

**The normalization rule.** `*_normalized` never replaces `*_name`. The manufacturer's word for a color is the historical fact; the hex value is a working approximation. Every normalized value carries a `derived_from` (§3.1) in its attestation, and a value sampled from a photograph can never be `confirmed`, because photographs carry the lighting and white balance of whoever took them.

**`completeness`** is derived, never authored: `render_ready` requires body, all six faces, and logo placement; `face_complete` requires the six faces; `partial` is anything less. It tells the eventual exhibition which cubes it can draw and, more usefully, tells research where the gaps are.

### 3.7 Media and representation *(new — replaces `images[]`)*

v1 folded 3D into an image kind, which quietly implies every cube has or will have a scan. Most never will. The model now separates what was *captured in 2D*, what was *captured in 3D*, and what can be *generated*.

#### `variant.media[]` — 2D assets

```yaml
media:
  - id: med-001
    class: photograph        # photograph | manufacturer_render | product_listing_image
                             # | diagram | exploded_diagram | screenshot | video_still | scan_render
    role: internal           # hero | product | packaging | internal | core | mechanism
                             # | exploded | comparison | in_hand | detail
    subject: specimen        # specimen | retail_unit | rendering | unknown
    path: assets/images/...
    view: front?
    caption: ?
    origin: first_party      # first_party | manufacturer | retailer | community | press | marketplace
    creator: ?
    source: source-id?       # required unless origin is first_party
    rights_status: owned     # owned | licensed | permission_granted | fair_use_claimed
                             # | unclear | do_not_publish
    rights_note: ?
    captured: Date?
    specimen_id: ref?        # PRIVATE — stripped from the public bundle (§8.6)
    dimensions: { w, h }?
    checksum: "sha256:…"
```

`class` separates a photograph of a physical object from a manufacturer's CGI. Product imagery in this domain is frequently rendered, and an archive that files a render as a photograph is misrepresenting its own evidence. `role: internal | core | mechanism | exploded` is called out because internal imagery is the scarcest and most valuable material this archive can hold.

#### `variant.representation` — 3D

```yaml
representation:
  procedural:
    geometry_profile_id: ref?     # RESERVED — unset in this phase
    colorway_completeness: partial   # mirrors colorway.completeness, derived
    renderable: false                # derived: profile present AND colorway render_ready
    blockers: ["logo artwork not documented"]   # derived, human-readable
  captured_3d: []                 # empty is the expected state
    # - id: cap-001
    #   class: photogrammetry     # photogrammetry | structured_light | cad | manual_model
    #   status: available         # planned | in_progress | available
    #   path: ?
    #   creator: ?
    #   source: source-id?
    #   rights_status: ?
```

Three commitments here:

1. `captured_3d` defaults to empty and is expected to stay empty for nearly every variant. Nothing in the schema assumes a scan exists.
2. `procedural` describes *whether a cube could be generated*, not an asset. `renderable` and `blockers` are derived from colorway completeness and profile availability, so the gap between "we have data" and "we can draw it" is visible without anyone maintaining it by hand.
3. `geometry_profile` is declared and left unpopulated. **No 3D asset pipeline is built in this phase.** The field exists so that when it is built, models sharing a mechanism reference one shell description rather than each carrying a private copy.

### 3.8 `variant.legality` *(new)*

```yaml
legality:
  wca_status: legal            # legal | not_legal | unknown
  as_of: { value: "2026-09", precision: month }
  basis: ?                     # what makes it legal or not
  historical:
    - status: legal
      from: Date
      to: Date?
      regulation_reference: ?
      source: source-id
      note: ?
```

`wca_status` is the current assessment and carries `as_of`, because regulations change and today's status is not retroactive. `historical[]` records periods where the status differed or where the regulation itself changed; it is populated only when there is evidence, not filled speculatively.

A `scope_class: conditional` record must have `wca_status: not_legal` or `unknown` with a `basis`.

### 3.9 `variant.pricing` *(revised)*

```yaml
pricing:
  msrp: { amount: 54.99, currency: USD, region: US }?
  msrp_native: { amount: 299, currency: CNY, region: CN }?
  observations:
    - date: Date
      kind: retail_list        # see the table below
      price: Money
      retailer: "..."?
      condition: new           # new | used | sealed | incomplete
      quantity_context: ?      # e.g. "single unit", "in a bundle of three"
      source: source-id
```

| `kind` | Means |
|---|---|
| `msrp` | Manufacturer's suggested retail price, stated by the manufacturer |
| `retail_list` | A retailer's listed price at a point in time |
| `sale_actual` | An actual retail transaction, including a discounted sale |
| `auction_sold` | A collector or secondary-market sold price |
| `archivist_paid` | What the archivist actually paid. **Private** (§8.6) |

**No current value is computed.** v1 proposed a derived reference price; that is removed. A defensible current value needs a market-evidence model the archive does not have — sale volume, condition normalization, regional separation, time weighting, and some handle on survivorship. Until that evidence model exists, any computed figure would be a confident-looking guess sitting next to sourced facts, which is precisely the failure mode this archive is built to avoid.

A QC rule (§7.2, rule 13) rejects any computed valuation field. When the evidence supports it, the model gains a `valuation` block with its own methodology and sources, as a deliberate revision rather than a quiet addition.

### 3.10 `variant.rarity` *(revised)*

Qualitative, evidence-driven, and explicitly not scored.

```yaml
rarity:
  level: scarce      # common | uncommon | scarce | rare | very_rare | one_of_a_kind | unknown
  basis: "..."       # required whenever level is above uncommon
  factors:
    - kind: limited_run        # limited_run | single_region | short_production_window
                               # | no_reissue | bundle_exclusive | promotional_only
                               # | prototype | recalled | low_survival_rate
                               # | high_secondary_demand | unconfirmed_production
      detail: ?
      source: source-id
  demand_note: ?
```

`factors[]` is the substance: each is a documented, attested reason, not an opinion. `level` is a human judgment that must be justified by `basis` and supported by the factors.

**No numeric rarity score is stored.** A number would be invented weighting presented as measurement, and once stored it would be sorted on, compared, and cited. The exhibition may later derive a visual rarity indicator from `factors[]` at render time, where the derivation is visible and revisable. A QC rule (§7.2, rule 14) rejects any `rarity.score` field.

### 3.11 `specimen` — the collection layer

Separate files, separate directory, `private: true` by default.

| Field | Type | Notes |
|---|---|---|
| `id`, `variant_id` | slug, ref | |
| `acquired`, `acquired_from`, `acquired_price` | Date?, string?, Money? | Private |
| `condition` | enum | `sealed` \| `mint` \| `excellent` \| `good` \| `used` \| `heavily_used` \| `incomplete` \| `damaged` |
| `condition_note` | markdown? | |
| `completeness` | object? | `{ box, manual, accessories[] }` |
| `modifications` | string[]? | |
| `measurements` | object[]? | First-party measurement — **Tier 1 evidence** |
| `serial`, `location` | string? | Private |
| `private` | boolean | Default `true` |

Archivist measurements are first-party primary evidence and outrank a retailer's spec table. A measurement may be cited publicly as a source even when the specimen record itself stays private (§8.6).

### 3.12 `source`

| Field | Type | Notes |
|---|---|---|
| `id` | slug | |
| `kind` | enum | `manufacturer_official` \| `patent` \| `packaging` \| `manual` \| `retailer` \| `press` \| `review` \| `forum` \| `video` \| `marketplace` \| `wiki` \| `archivist_measurement` \| `archivist_photo` |
| `tier` | 1–5 | Derived from `kind` by default, overridable with justification |
| `title`, `publisher`, `author` | string, string, string? | |
| `url` | url? | |
| `preservation_method` | enum | `archive_url` \| `local_capture` \| `excerpt` \| `none` — **required** |
| `archive_url` | url? | Required when method is `archive_url` |
| `local_capture` | object? | `{ path, checksum, format, captured }` — required when method is `local_capture` |
| `excerpt` | string? | Required when method is `excerpt`; must stand alone without the page |
| `preservation_note` | markdown? | Why a weaker method was used |
| `accessed` | Date | Required for web sources |
| `published` | Date? | |
| `language`, `region` | ISO codes? | |
| `link_status` | enum | `live` \| `dead` \| `redirected` \| `paywalled` \| `altered` — maintained by the link sweep |
| `last_checked` | Date? | |
| `reliability_note` | markdown? | Known biases: marketing copy, copied spec tables, machine translation |

### 3.13 `person`, `event`, `geometry_profile`

`person`: `id`, `name`, `native_name?`, `role[]` (`speedcuber` | `designer` | `collaborator`), `wca_id?`, `notes?`.
`event`: `id`, `name`, `date`, `kind` (`competition` | `anniversary` | `milestone` | `cultural`), `notes?`.
`geometry_profile`: `id`, `name`, `applies_to_models[]`, `description`. **Reserved. Schema defined, no records created, no renderer built.**

---

## 4. Variant rules

### 4.1 The materiality test

**A new `variant` record is created when a difference would make a collector consider it a different object to own.**

A new variant is **required** when any of these differ: magnet configuration or architecture; core system; MagLev configuration; adjustment system; coating, including aftermarket; colorway or sticker type; manufacturer edition designation; limited / commemorative / signature / collaboration status; smart or electronic capability; materials or hardware the manufacturer distinguishes; packaging, *only* when it is the sole distinguishing feature of a separately marketed edition.

A new variant is **not** created for: region of sale (`releases[]`); retailer or retailer naming (`aliases[]`); price differences alone; bundle membership (`bundled_with`); batch or mold changes (`model.revisions[]`) unless sold as a distinct product; factory lubrication differences unless marketed as a distinct edition.

### 4.2 The model/variant boundary *(new explicit rule)*

> **A mechanical difference belongs at model level only when it represents a distinct underlying design, mold, or mechanism — not merely a sold configuration.**
>
> **A manufacturer-sold configuration difference belongs at variant level even when it changes substantial hardware.**

The operative test:

> Could the manufacturer produce both from the same underlying design by choosing different parts, materials, or treatment at assembly?
> **Yes → variant. No → model.**

Consequences worth stating plainly, because they are counterintuitive:

- Substantial hardware differences are **not** sufficient for a new model. A different core assembly, a different magnet set, or a different surface treatment sold as options of one product are variants, however different they feel in the hand.
- Tooling differences **are** sufficient. If the plastic pieces come from different molds, or the internal geometry differs, it is a different design regardless of marketing.
- Marketing is evidence, not authority. A manufacturer's version number is a strong signal about design change and a weak one about configuration.

**When the evidence is unclear**, default to *new model* with a `succeeds` relationship and `confidence: uncertain` on the generation claim. Splitting is recoverable by merge; collapsing loses the distinction silently and nobody notices.

Worked examples applying this boundary live in [research-methodology.md §3](research-methodology.md), written as decision procedures now and replaced with real, sourced product examples during the GAN pilot.

### 4.3 Aftermarket products

A serviced cube is a variant whose `model_id` is the **base model**, carrying a `modified_from`
relationship to the **exact base variant** and a `service` block recording what was done and by
whom. Specifications inherit from the model except where the service demonstrably changed them.

```yaml
config:
  coating: aftermarket        # what the object IS
  core_system: ball_core      # only where the service demonstrably changed it
service:                      # what was DONE, and by whom
  serviced_by: picube         # a manufacturer record with kind: service
  program: "PiCube 20-Magnet Ball-Core Mod"   # the servicer's own name for the line
  modifications:
    - kind: ball_core_mod     # enum:service-modifications; several per product is normal
      detail: "..."
      source: <source-id>
relationships:
  - type: modified_from
    target: <base-variant-id>
    target_entity: variant
```

**The split is deliberate.** `config` records what the object *is*; `service` records what was
*done to it* and by whom. An earlier schema had only `config.coating_applied_by`, which forced
every service through a coating-shaped hole — and the first real aftermarket record in the archive
was a *tuning* service, with no coating at all. The domain's aftermarket is mostly not coating
work: tuning, magnet swaps, core mods. See F9 in `docs/pilot-audit.md`.

**A servicer is a `manufacturer` record with `kind: service`.** No separate entity class exists,
and none is needed. Where a retailer sells a product another party modified, `serviced_by` names
the party that *did the work*, not the shop.

**Not every service is a variant.** A separately marketed, named product built on a specific base
cube is a variant a collector could own. An optional service selected at checkout on a cube the
buyer already chose is not — it produces a *specimen* with modifications, not an archive record.

Rule 39 enforces the pairing in both directions: a `service` block without `modified_from`
describes work on nothing, and a `modified_from` without a `service` block says a cube was modified
without saying how or by whom.

### 4.4 Rebrands

An OEM product sold under a second brand gets **its own variant record** under the second brand's model, plus a `rebrand_of` relationship to the original. It is never collapsed into the original, because the second product had its own name, price, market, and availability, and a collector encountering it needs to find it under the name it was sold as.

`rebrand_of` requires evidence — a shared manufacturer statement, matching mold markings, or documented supply relationship. Visual resemblance alone is a lead, not a claim.

### 4.5 Naming and identity resolution

The archive's `name` is the manufacturer's own naming where determinable, normalized to a house style. Every observed retailer name goes into `aliases[]` with its retailer and source. No record is created from a retailer name alone before checking aliases across existing records.

---

## 5. Source hierarchy

### 5.1 Tiers

| Tier | Kinds | Establishes |
|---|---|---|
| **1 — Primary** | Manufacturer spec sheets and product pages, patents, official announcements, packaging and manuals, **archivist measurement and photography** | Fact alone. `confirmed` |
| **2 — Authoritative secondary** | Major retailer listings with real spec tables, established press, manufacturer material republished verbatim | `probable` alone; `confirmed` when two independent Tier 2 sources agree |
| **3 — Expert community** | Named reputable reviewers, long-form community documentation, forum threads with corroborating detail | `reported` alone. Never `confirmed` without Tier 1–2 support |
| **4 — Weak** | Marketplace listings, aggregators, unattributed wikis, marketing copy without specifications | Never establishes a fact alone. Corroborates only |
| **5 — Inadmissible** | Unsourced social posts, machine-generated content, undated screenshots of unknown origin, **any LLM including this one** | Never cited. May be recorded as a lead in `notes` |

### 5.2 Standing rules

1. **Independence is real independence.** Retailers copy manufacturer spec tables and each other verbatim. Two listings with identical wording are one source.
2. **Manufacturer marketing is Tier 1 for its own specifications and Tier 4 for comparative or superlative claims.**
3. **Physical evidence beats documentation.** An archivist measurement outranks any published figure; when they conflict, record the conflict.
4. **Translation is a source event.** Machine-translated material keeps the original in `excerpt` with a `reliability_note`.
5. **A lead is not a source.** Something learned from an inadmissible place is a research direction, pursued to a citable source, never cited itself.

### 5.3 Preservation *(revised)*

Every source records a `preservation_method`. A source backing a critical field must use something other than `none`.

- **`archive_url`** — strongly preferred. A third-party archive outlives both the page and this project.
- **`local_capture`** — preferred where archiving fails or does not apply: paywalled pages, video, app screenshots, physical packaging photographed by the archivist. Path plus checksum, so the file cannot silently change.
- **`excerpt`** — acceptable where neither is possible. The quotation must carry the claim on its own; "the page said 55.5mm" is not an excerpt, the sentence containing it is.

`preservation_note` records why a weaker method was chosen. §7.5 reports the preservation mix per manufacturer so that reliance on excerpts is visible rather than accumulating unnoticed.

---

## 6. Research workflow

Nine passes, defined in full in [research-methodology.md §4](research-methodology.md). In summary: manufacturer register → family enumeration *(review checkpoint)* → model enumeration → variant enumeration *(review checkpoint)* → Tier 1 fill → corroboration → conflict adjudication → media → review and publish, with ongoing link sweeps and duplicate queue review.

Record statuses and their meanings are in §3.1.

---

## 7. Quality control rules

### 7.1 Structural — blocking

1. Every file validates against its JSON Schema
2. Every reference resolves; no orphans
3. Every `id` is unique across its entity type
4. Every enum value exists in its `vocab/` file
5. Every JSON Pointer in `attestations` addresses a path that exists in the document

### 7.2 Provenance and integrity — blocking at `sourced` and above

6. **Critical fields carry an attestation or the explicit value `unknown`.** Critical set: manufacturer kind, edition identity, release date, MSRP, magnet configuration, core system, maglev, adjustment system, coating, size, weight, production status, limited-edition status, run size, rarity level, WCA legality status. Marked in the schema as `x-critical`, so the list lives beside the fields rather than in prose that drifts from them.

   **Inheritance clause.** A variant that does not override a spec is covered by its model's attestation of the same fact. Requiring a second attestation would force every variant to restate its model, which is the duplication D1 exists to prevent. An override, by contrast, is a fresh claim and always needs its own attestation. Only `coating` has no model counterpart, so it is always attested on the variant.
7. Every cited source exists, and every web source has `accessed`
8. Every source backing a critical field has `preservation_method` other than `none`, and the field required by that method is populated *(revised)*
9. `confidence: confirmed` requires Tier 1, or two independent Tier 2 sources
10. `rarity.level` above `uncommon` requires `basis`
11. Every `disputed` attestation carries at least two candidates with distinct sources
12. No source of tier 5 is cited anywhere
13. **No computed valuation field exists anywhere in the data** *(new)*
14. **No numeric rarity score exists anywhere in the data** *(new)*
15. **`scope_class: conditional` requires `scope_justification` and at least one Tier 1–3 source** *(new)*
16. **A normalized color with `derived_from: sampled_from_image` or `inferred` may not carry `confidence: confirmed`** *(new)*
17. **`rebrand_of` and `modified_from` relationships carry an attestation with at least one Tier 1–2 source** *(new)*

### 7.3 Semantic — warnings, reviewed not auto-blocked

18. `size_mm` outside 50–60, or `weight_g` outside 50–130
19. Release date outside 2014-01-01 … today
20. A successor released before its predecessor
21. A discontinuation date before a release date
22. `maglev` set while `core_system` is incompatible
23. A variant overriding a model spec with no attestation on the override
24. A price observation more than 10× the MSRP without `kind: auction_sold`
25. A model with exactly one variant *and* an edition designation set — usually a missed variant
26. **`colorway.application: stickerless` with populated `faces[].material: vinyl_sticker`** *(new)*
27. **A variant with `legality.wca_status: not_legal` and `scope_class: core`** *(new)*

### 7.4 Identity — the duplicate queue

28. Fingerprint collision across variants → duplicate queue
29. An alias string matching another record's name or alias → duplicate queue
30. Media checksum collision across variants → flagged; often correct, so reviewed rather than blocked

Nothing is auto-merged. Resolution is `duplicate_of` → human review → `merged_into`, with the retired id kept forever.

### 7.5 Health — reported, non-blocking

31. **Link sweep.** `link_status` refreshed on a schedule; dead links on published records reported
32. **Coverage report.** Per manufacturer and family: counts by status, and the ratio of `unknown` to absent on critical fields — the honest measure of completeness
33. **Confidence distribution** per manufacturer, surfacing brands researched from weak sources
34. **Preservation mix** — share of critical sources at each `preservation_method`, so excerpt-only reliance stays visible *(new)*
35. **Scope mix** — count of `core` vs `conditional` vs `reference_only` per manufacturer, so conditional admissions cannot quietly dominate *(new)*
36. **Render readiness** — distribution of `colorway.completeness`, showing what the eventual exhibition could draw *(new)*

### 7.7 Annotation enforcement — blocking

The schema carries four annotations, and two of them are promises that need keeping.

37. **No `x-derived` field is authored.** `colorway.completeness`, `representation.procedural.renderable`, `representation.procedural.blockers`, and `fingerprint` are computed by the build. A hand-written value would be a guess wearing a computed field's clothes.
38. **No `x-reserved` field is set.** `geometry_profile_id` is declared for a later phase. Setting it now would imply a 3D pipeline that does not exist.

The other two annotations are enforced elsewhere: `x-critical` by rule 6, `x-private` by §8.6
and `scripts/check-privacy.mjs`.

### 7.8 Aftermarket coherence — blocking

39. **A `service` block and a `modified_from` relationship require each other**, and where a
    service is present at `sourced` or above, `service.serviced_by` carries an attestation. Who
    performed a modification is a claim about the world, not bookkeeping. The servicer is *not*
    marked `x-critical`: that annotation means "always applies", and most cubes were never
    serviced — demanding provenance for an inapplicable field is how a rule gets worked around.

### 7.9 Chronological coherence — advisory

40. **A model may not predate the family that contains it.** *(added 2026-09-04, Pass 3)*
    A model whose `released`/`announced` date falls before its family's `introduced` date is
    either a family date that understates its own line, or a model filed in the wrong family.
    Both need a human, so the rule warns rather than blocks.

    The rule exists because Pass 3 found ten such cases and **nothing detected them** — a model
    dated years before its own family was schema-valid and passed every check silently. That is
    the same shape as the earlier rule-9 defect, where the message claimed an independence test
    the code never performed.

    **The precision allowance is the substance of the rule, not a detail.** `2016` and `2016-10`
    describe the same approximate moment at different precisions, and `dateStart()` expands both
    to a floor, so a naive comparison fires on every year-vs-month pair in the same year — three
    of the archive's ten cases. A rule that noisy gets ignored, which is worse than no rule. So
    the model date is compared against the *start of the family's precision window*, widened
    once more when either date is `circa`, since the vocabulary defines that as "approximate".

    One deliberate asymmetry: the `circa` widening applies **only when the model date is itself
    soft**. An `exact` model date is a precise claim, and letting a family's vagueness swallow it
    would hide the archive's clearest conflict — `qiyi-valk-3`, announced `2016-08 exact`
    against a family recorded `circa 2018`.

    Both branches carry fixtures. `zz-bad-chronology` proves the conflict fires;
    `zz-ok-chronology-precision` exists to be **ignored**, and the selftest asserts its absence
    from the output. A branch no fixture exercises is not a guard.

### 7.6 Human gates

- Family list reviewed before model enumeration opens
- Variant enumeration reviewed per model before Tier 1 fill
- Every `scope_class: conditional` admission reviewed individually
- `significance` prose reviewed for unsourced superlatives
- Every `rebrand_of` and `modified_from` reviewed individually

---

## 8. File structure

### 8.1 Format

**YAML for authored data. JSON Schema for validation. A built JSON bundle for consumption.**

Controlled vocabularies live in `vocab/` as data, not as enums inside the schemas. At load
time `scripts/lib/archive.mjs` injects each vocabulary's values as the `enum` of every
property annotated `x-vocab`, so a vocabulary and its schema cannot drift apart. Adding a
permitted value is a one-line edit to a reviewable data file.

YAML because this data is hand-authored and hand-reviewed for years: it takes comments, its diffs are readable, and multi-line prose stays legible. The build emits plain JSON so Phase B never parses YAML and the data layer stays framework-independent.

### 8.2 Tree

See [docs/implementation-manifest.md](docs/implementation-manifest.md) for every file that
exists and what it is for.

### 8.3 One variant, one file

A variant file is complete: identity, config, colorway, pricing, media, provenance. A pull request touching one product touches one file, and its full evidentiary state is visible in a single diff. Sources are the exception — shared across records, so they live once and are referenced by id.

### 8.4 Identity scheme

```
manufacturer   <brand-slug>
family         <brand>-<family>
model          <brand>-<family>-<generation>
variant        <model-id>--<configuration-tokens>
source         <publisher>-<subject>-<qualifier>
specimen       spec-0001
```

Ids are **never renamed**. A name correction updates `name` and adds to `aliases`; `former_ids[]` exists for the case where a rename is genuinely unavoidable.

**Fingerprint** for duplicate detection — derived, never authored:

```
sha1( manufacturer_id | model_id | edition.designation | edition.name |
      config.coating | config.magnet_configuration | config.core_system |
      config.maglev | colorway.designation | colorway.application )
```

Collisions go to the queue rather than blocking, because legitimate near-identical records exist and an automatic merge would destroy exactly the distinctions §4 was built to preserve.

### 8.5 Build output

`scripts/build.mjs` resolves model→variant inheritance, mirrors relationships bidirectionally, computes derived fields (`colorway.completeness`, `representation.procedural.renderable`, coverage statistics), and emits flat JSON plus indexes by chronology, manufacturer, and family. **Phase B consumes only the build output.** No presentation code reads `data/`.

### 8.6 Privacy and the two bundles *(new)*

The build emits two bundles:

| Bundle | Contains |
|---|---|
| `dist/private/` | Everything, including specimen records. Never deployed |
| `dist/public/` | The archive with all private data removed |

**What the public bundle excludes, unconditionally:**

- Every `specimen` record, in whole
- `media[].specimen_id` — the image survives, the linkage to an owned unit does not
- Every `price_observation` with `kind: archivist_paid`
- `acquired`, `acquired_from`, `acquired_price`, `serial`, `location`, `condition`, `condition_note`
- Any field marked `private: true` at any depth

**What survives.** A first-party measurement or photograph remains citable as a source with its evidentiary weight intact; only the fact that it came from *this* collection, and which unit, is removed. The archive keeps its best evidence without disclosing the collection.

**Enforcement.** Redaction is a deny-list applied by path plus a positive check: after building, `scripts/check-privacy.mjs` scans `dist/public/` for every private field name and for every specimen id, and the build fails if any appears. A build that cannot prove the public bundle is clean does not produce one.

A specimen may be published deliberately by setting `private: false` on that record.

**Repository scope.** This governs the published bundle, not the repository. Specimen files are git-tracked in a private repository. If the repository itself is ever made public, specimen storage needs a separate decision — that is flagged, not solved, here.

---

## 9. Verification

`npm run check` runs the whole toolchain. Because the archive holds no records, every check
would otherwise pass trivially and prove nothing, so `scripts/selftest.mjs` runs the same
tooling against `tests/fixtures`: a miniature archive that must come out clean, and records
engineered to trip each named rule. The self-test asserts that every blocking rule fires,
that the semantic warnings fire, that inheritance and every derived field resolve, and that
the privacy gate both passes a clean bundle and rejects a leaking one.

Fixtures load through `CC_DATA_ROOT` and never enter `data/`. The last thing the self-test
checks is that `data/` still holds nothing.

## 10. What this document does not decide

- **The 3D pipeline.** Geometry profiles and procedural representation are declared and unpopulated. No renderer, no asset pipeline, no scanning workflow in this phase.
- **Current value.** Removed until an evidence model supports it (§3.9).
- **Publication and licensing.** Whether the archive is public, and under what terms, which sets how strictly `rights_status` gates display.
- **Phase B framework.** Unaffected by anything here, by design.
