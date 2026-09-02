# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Git-tracked structured data files, chosen by the user. One file per record, validated against JSON Schema, with source provenance stored alongside the data so every material fact is reviewable in a diff. The exhibition site (Phase B) builds from that data as a static consumer.

Undecided, and deliberately so: the Phase B site framework and the 3D runtime. The data layer must not assume either. Recording this now so later work does not treat the absence as an oversight.

## Users

**The archivist** (project owner, a 3x3 speedcube collector) — researching, verifying, and curating the archive. Works over long sessions against manufacturer pages, retailer listings, community threads, and physical specimens in hand. Needs to record what is known, how confidently, and on whose authority, and to come back months later and still trust the record.

**The visitor** (speedcubing enthusiast, collector, or historically curious outsider) — exploring the archive as an exhibition. Moves through the collection chronologically, stops at individual cubes, and goes deep on the ones that interest them. Not shopping, not comparing before a purchase.

**The owner-collector** (the archivist, in a second role) — marking which variants are personally owned and recording specimen-level facts about those copies.

## Product Purpose

A collector-grade historical database of 3x3 speedcubes covering approximately 2016 through 2026, presented as an immersive interactive digital exhibition.

The product documents the history and technology of the 3x3 speedcube: how the mechanism evolved, what each manufacturer contributed, and what materially distinguished one release from the next. Success is a record that is historically near-complete for the period, correct at the level a serious collector would check, traceable to its sources, and presented in a way that makes the history worth walking through rather than merely queryable.

Explicitly not an ecommerce site. No cart, no purchase intent, no affiliate posture. Pricing is recorded as historical evidence, not as an offer.

## Positioning

Existing coverage of this domain is split between retail catalogs, which describe what is currently purchasable and discard everything that goes out of stock, and community knowledge, which is accurate but scattered across forum threads, reviews, and video descriptions that decay.

This archive's mechanism is the combination of three commitments a retailer or a wiki does not make:

1. **Variant fidelity.** Materially different products are never collapsed into one entry. A model's editions, coatings, magnet configurations, core systems, and colorways are represented as distinct records that share a parent design rather than as dropdown options on a single product.
2. **Provenance at the level of the individual fact.** Important claims carry their source, when it was accessed, and how confident the record is. Conflicting reports are represented as conflicts, not silently resolved.
3. **Exhibition as the primary interface.** The archive is entered as a spatial, chronological museum rather than a filterable grid.

## Operating Context

Two phases, explicitly separated by the user, with Phase A holding priority:

**Phase A — data collection and research.** Data architecture and research methodology are designed and approved before any individual cube is researched. Research then proceeds against that methodology: source hierarchy, corroboration rules, confidence recording, conflict adjudication, and quality control.

**Phase B — website and digital exhibition.** Not started until Phase A's architecture is established. The eventual site displays physical-looking cubes on virtual exhibition stands in a 3D environment, scrollable chronologically and explorable per cube. 3D is required to be meaningful rather than decorative.

Research operates against: manufacturer product pages and spec sheets, retailer listings across multiple regions and vendors, community reviews and forum archives, and physical specimens the archivist owns. Source material in this domain is unstable — product pages are edited and removed as lines are discontinued — so capture is time-sensitive and archival copies matter.

Retailer naming for the same physical product is inconsistent across vendors and regions, which makes identity resolution and duplicate detection a standing operational problem rather than an edge case.

## Capabilities and Constraints

**Scope.** Approximately 2016–2026. 3x3x3 speedcubes. Aim for very high historical completeness across manufacturers, not only the cubes the archivist owns. Resolved on 2026-09-01:

- **In scope, full depth:** WCA-legal 3x3s; discontinued and historical products; smart 3x3s; limited, signature, collaboration and commemorative editions; retailer-customized cubes as aftermarket variants; notable collector editions.
- **Conditional:** non-WCA-legal 3x3s only where historically or collector significant, admitted individually with a written justification and a source, and kept out of the archive's default view so novelty products cannot swamp it.
- **Budget and OEM rebrands:** in scope where the product is materially identifiable and historically relevant. The rebrand relationship is preserved, never collapsed into the original.

Full policy in RESEARCH_SPEC.md.

**Variant model.** A single model must support many generations, revisions, editions, coatings, magnetic configurations, core systems, MagLev versions, colorways, collaborations, commemorative editions, limited editions, smart/electronic versions, and other variants — without duplicating the parent model for each. Materially different variants must not be collapsed.

**Required per-variant coverage.** Manufacturer, model family, generation, revision, exact edition, configuration, colorway, coating, magnet configuration, core system, MagLev, adjustment system, size, weight, materials, release date, launch price, historical prices, current reference price, availability, production status, limited-edition status, collaboration, signature edition, commemorative edition, smart/electronic version, rarity, collector significance, images including internal/mechanical/core images, and source provenance.

**Required schema mechanics.** Source and provenance system, uncertainty and confidence fields, conflicting-information handling, date precision, price history, image provenance, duplicate detection, variant relationships, and discontinued-product handling.

**Ownership.** The archive is a full historical record; ownership is a layer over it, not a gate on inclusion. Owned specimens are marked and can carry first-party photography, measurements, and condition.

**Imagery and representation.** Mixed sourcing for now — first-party photography where the archivist owns the cube, sourced imagery with attribution elsewhere — with per-image provenance and rights status recorded. The stated eventual direction is full 3D models rather than photography as the primary representation. The data model therefore separates photographed media, 2D product imagery, captured 3D assets, and procedurally renderable geometry, and assumes none of them exist. Recorded as direction, not as a settled decision.

**Research sequencing.** After the schema is in force, research does not scale to all manufacturers. One manufacturer — GAN — runs end to end first, deliberately covering multiple generations, coating variants, core and magnet variants, limited editions, smart products, retailer customizations, colorway differences, aliases, and discontinued products. The schema is then audited against what actually happened, and only then does research scale.

**Undecided, do not invent.** Phase B framework and 3D runtime. Whether 3D assets are scanned, modeled, or procedurally generated from specification data. Hosting and deployment. Whether the archive is published publicly, and under what terms.

## Brand Commitments

Project name: `cubecollection`. Repository at `github.com/Vasiniks/cubecollection`, MIT licensed, owned by Eason.

No existing logo, wordmark, palette, typography, or voice has been established. Nothing to preserve.

The user has made one binding qualitative commitment: the eventual exhibition should read as a world-class interactive digital museum — cinematic, experimental, spatial, sophisticated, highly polished, memorable — closer to an award-level interactive exhibition than a conventional product catalog. This is recorded as a product commitment because it constrains what Phase B may ship; the visual world itself is not decided here.

## Evidence on Hand

**Currently in the repository:** nothing but a LICENSE and a placeholder README. No data, no images, no schema, no prior research.

**Available to the project:** the archivist's own physical collection, extent not yet enumerated. Public manufacturer and retailer material. Community documentation.

**Must not be fabricated.** No pricing, release date, specification, production-run size, rarity assessment, or provenance claim may be invented, estimated silently, or filled from model recall presented as fact. A value without a source is recorded as unknown, not guessed. No large language model, including this one, is ever admissible as a source for a claim about a cube.

## Product Principles

1. **The record's trustworthiness outranks its completeness.** A missing field is a stated gap. A wrong field, or a right field nobody can trace, is damage. Coverage that arrives by lowering the evidentiary bar is not coverage.
2. **Distinctions collectors make are distinctions the schema makes.** If two products differ in a way a serious collector would care about, they are separate records with a stated relationship, never one record with a variation note.
3. **Every material fact carries its origin.** Source, access date, and confidence travel with the claim, not with the page. Disagreement between sources is data to be represented, not noise to be resolved by picking one.
4. **The data model outlives the presentation.** The archive is authored as a durable, portable, framework-independent record. Nothing about the exhibition's rendering may bend the schema.
5. **The exhibition earns the archive's ambition.** Depth of research is the substance; the museum is how it becomes worth encountering. Neither is permitted to be the excuse for neglecting the other.

## Accessibility & Inclusion

No product-specific requirement has been established by the user. Noted as a Phase B constraint to resolve rather than a decided fact: a spatial, scroll-driven 3D exhibition raises real questions about keyboard and screen-reader access, motion sensitivity, and low-power devices, and the archive's data being fully readable outside the 3D presentation is the likely answer. To be confirmed before Phase B is designed.
