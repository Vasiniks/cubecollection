/**
 * types.ts
 *
 * Two things live here:
 *
 * 1. Hand-mirrored slices of the controlled vocabularies under `vocab/*.yml` that bear on visual
 *    rendering (coating, colourway application/translucency/finish, logo placement, face
 *    notation). This lane's file allow-list excludes `vocab/**`, so these unions are copied by
 *    hand from the YAML rather than generated. THE YAML IS THE SOURCE OF TRUTH — if a vocab file
 *    changes, this file drifts until someone updates it by hand. A future improvement (out of
 *    this lane's scope) would be a small script under `scripts/` that emits this file from the
 *    vocab directory the same way `validate.mjs` injects vocab enums into the JSON Schemas.
 *
 * 2. `CubeVisualSpec` — the provenance-typed description of one variant's visual appearance, and
 *    `resolveCubeVisualSpec()`, the adapter that builds one from `dist/public` (or
 *    `dist/preview`) JSON. This is where the single most important requirement of this lane is
 *    operationalised: every field the archive could conceivably not have researched is wrapped
 *    in `Provenance<T>` (see provenance.ts), and this adapter is the only place that decides
 *    whether a given archive record counts as source-backed, convention, or unknown.
 */

import type { BevelTreatment } from './CubeGeometry.ts';
import {
  type Confidence,
  type Provenance,
  type ResolvedFrom,
  convention,
  sourceBacked,
  unknown,
} from './provenance.ts';

// ================================================================== vocab mirrors

/** vocab/coatings.yml */
export type Coating = 'none' | 'frosted' | 'uv' | 'matte' | 'aftermarket' | 'other' | 'unknown';

/** vocab/colorway-application.yml */
export type ColorwayApplication =
  | 'stickerless'
  | 'stickered'
  | 'hybrid'
  | 'printed'
  | 'inlaid'
  | 'unknown';

/** vocab/colorway-translucency.yml */
export type ColorwayTranslucency =
  | 'opaque'
  | 'translucent'
  | 'transparent'
  | 'frosted_translucent'
  | 'unknown';

/** vocab/colorway-finish.yml */
export type ColorwayFinish =
  | 'matte'
  | 'glossy'
  | 'frosted'
  | 'uv_coated'
  | 'textured'
  | 'soft_touch'
  | 'unknown';

/** vocab/logo-placement.yml */
export type LogoPlacement = 'center_U' | 'center_multiple' | 'corner' | 'internal' | 'none' | 'unknown';

/** vocab/logo-treatment.yml */
export type LogoTreatment = 'printed' | 'engraved' | 'sticker' | 'embossed' | 'inlaid' | 'none' | 'unknown';

/** vocab/face-notation.yml */
export type FaceNotation = 'U' | 'D' | 'F' | 'B' | 'L' | 'R';
export const FACE_NOTATIONS: readonly FaceNotation[] = ['U', 'D', 'F', 'B', 'L', 'R'];

/**
 * vocab/piece-classes.yml, restricted to the classes that exist as visible external cubies.
 * `core` and `internal` from the full vocabulary never correspond to a rendered mesh here — see
 * CubeGeometry.ts's module comment on why the hidden core cubie is never built.
 */
export type PieceClass = 'corner' | 'edge' | 'centre';

/** A 6-hex-digit colour, matching schema's `^#[0-9a-fA-F]{6}$` pattern as closely as TS allows. */
export type HexColor = `#${string}`;

// ================================================================== visual spec

export interface FaceColorSpec {
  readonly colorName?: string;
  readonly colorHex?: HexColor;
}

/**
 * One variant's complete visual description, with every field's evidentiary status made
 * explicit. Nothing downstream (CubeGeometry.ts, materials.ts) is allowed to see a bare colour
 * or enum value for these fields — only a `Provenance<T>` wrapping one, so "is this real" is
 * always a type-level question and never an implicit assumption.
 */
export interface CubeVisualSpec {
  /** Millimetres, edge-to-edge. Geometry only — see CubeGeometry.ts on why a placeholder here
   *  is sanctioned by the lane's HARD CONSTRAINTS ("placeholder GEOMETRY is acceptable"). */
  readonly sizeMm: Provenance<number>;
  readonly application: Provenance<ColorwayApplication>;
  readonly coating: Provenance<Coating>;
  readonly body: {
    readonly colorHex: Provenance<HexColor>;
    readonly translucency: Provenance<ColorwayTranslucency>;
    readonly finish: Provenance<ColorwayFinish>;
  };
  /** Exactly six entries, keyed by standard notation. Each is independently provenanced because
   *  the archive could in principle document some faces and not others. */
  readonly faces: Readonly<Record<FaceNotation, Provenance<FaceColorSpec>>>;
  readonly logoPlacement: Provenance<LogoPlacement>;
  /** Never source-backed today: no geometry-profile record exists anywhere in the archive
   *  (data/geometry-profiles/ is empty). Kept as full `Provenance<T>` rather than a bare
   *  `Convention<T>` so a future geometry-profile record can flow through this same field
   *  without an API change. */
  readonly bevel: Provenance<BevelTreatment>;
}

// ================================================================== documented conventions

/**
 * docs/EXHIBITION_ARCHITECTURE.md §10.4(a): "Adopt the standard scheme as a documented rendering
 * convention, clearly labelled as a convention and not as evidence about any particular cube."
 * This is the exact rationale string attached to every face coloured this way — it is what a UI
 * layer shows a visitor via `provenanceLabel()` (provenance.ts) or by reading this constant.
 */
export const STANDARD_SCHEME_RATIONALE =
  'WCA-standard colour scheme (white opposite yellow, red opposite orange, blue opposite green). ' +
  'Adopted as this museum’s documented rendering convention per ' +
  'docs/EXHIBITION_ARCHITECTURE.md §10.4(a) because the archive deliberately does not record ' +
  'face colours for any of its 511 public variants. This is a museum default, not an archive ' +
  'claim about this specific product.';

/** WCA-standard scheme, opposite-face pairs: U/D white/yellow, F/B green/blue, R/L red/orange. */
/**
 * Mirrors the `value` block of cv-face-colours-wca-standard. Not a palette
 * choice made here: these are the exact hexes the registry publishes and the
 * convention index shows, so the cube on screen is the cube the disclosure
 * describes. src/data/adapter.ts mirrors the same six values, and
 * conventions.test.ts holds all three in agreement.
 */
export const STANDARD_SCHEME_HEX: Readonly<Record<FaceNotation, HexColor>> = {
  U: '#F5F5F0',
  D: '#E6C200',
  F: '#00843D',
  B: '#0051BA',
  L: '#E8620C',
  R: '#C41E3A',
};

/**
 * Mirrors the `value` block of cv-geometry-generic-3x3 in
 * conventions/rendering-conventions.yml, which is the single source of truth
 * for every convention the exhibition applies. These numbers are not a
 * modelling preference: drawing a bevel the registry does not describe would
 * mean the disclosure shown to a visitor no longer matches what is on screen.
 */
export const DEFAULT_BEVEL: BevelTreatment = { radiusRatio: 0.055, segments: 3, gapRatio: 0.012 };

export const DEFAULT_BEVEL_RATIONALE =
  'No geometry-profile record exists for any variant (data/geometry-profiles/ is empty; ' +
  'representation.procedural.geometry_profile_id is reserved and unset for all 511 public ' +
  'variants). This bevel/gap treatment is a modelling default, never an archive claim.';

/** Mirrors cv-size-56mm-fallback. */
export const DEFAULT_SIZE_MM = 56;

export const DEFAULT_SIZE_RATIONALE =
  '`size_mm` resolves for 227 of the 511 public variants (236 of 527 across the whole ' +
  'archive). 56 mm is both the mode and the median of the documented distribution, and is ' +
  'used only where the archive is silent — never presented as the archive\u2019s own figure. ' +
  'See cv-size-56mm-fallback in conventions/rendering-conventions.yml.';

// ================================================================== archive adapter

/** schema/common/attestation.schema.json: JSON-Pointer-keyed provenance sidecar. */
export interface ArchiveAttestation {
  readonly confidence?: Confidence;
  readonly sources?: readonly string[];
}
export type ArchiveAttestations = Readonly<Record<string, ArchiveAttestation>>;

/** schema/common/colorway.schema.json, subset relevant to rendering. */
export interface ArchiveColorwayFace {
  readonly face: FaceNotation;
  readonly color_name?: string;
  readonly color_normalized?: string;
}
export interface ArchiveColorway {
  readonly application?: ColorwayApplication;
  readonly body?: {
    readonly plastic_color_name?: string;
    readonly plastic_color_normalized?: string;
    readonly translucency?: ColorwayTranslucency;
    readonly finish?: ColorwayFinish;
  };
  readonly faces?: readonly ArchiveColorwayFace[];
  readonly logo?: { readonly placement?: LogoPlacement };
}

/** scripts/build.mjs `doc.resolved_specs[field] = { value, from }`. */
export interface ArchiveResolvedSpec<T> {
  readonly value: T;
  readonly from: ResolvedFrom;
}

/** The subset of a public `variant.json` entry this adapter reads. Not the full schema. */
export interface ArchiveVariant {
  readonly id: string;
  readonly model_id: string;
  readonly config?: {
    readonly coating?: Coating;
    readonly size_mm?: number;
  };
  readonly colorway?: ArchiveColorway;
  readonly resolved_specs?: {
    readonly size_mm?: ArchiveResolvedSpec<number>;
  };
  readonly attestations?: ArchiveAttestations;
}

/** The subset of a public `model.json` entry this adapter reads. */
export interface ArchiveModel {
  readonly id: string;
  readonly specs?: {
    readonly coating?: Coating;
  };
}

export interface ResolveCubeVisualSpecOptions {
  /**
   * EXHIBITION_ARCHITECTURE §10.4(a) vs (b). Default `true` applies the recommended (a): the
   * standard scheme, labelled a convention, wherever a face is undocumented. Set `false` for
   * (b): leave those faces `unknown` and render neutrally, reserving colour for sourced faces.
   */
  readonly applyStandardFaceScheme?: boolean;
}

function attestationFor(att: ArchiveAttestations | undefined, pointer: string): ArchiveAttestation | undefined {
  return att?.[pointer];
}

function hexOrUndefined(value: string | undefined): HexColor | undefined {
  return value && /^#[0-9a-fA-F]{6}$/.test(value) ? (value as HexColor) : undefined;
}

/**
 * Builds a `CubeVisualSpec` from one archive variant (and, when available, its parent model) as
 * they appear in `dist/public` / `dist/preview`. This is the ONLY place in this lane that reads
 * archive field presence/absence and decides source-backed vs. convention vs. unknown; every
 * other module only ever consumes the resulting `Provenance<T>` values.
 */
export function resolveCubeVisualSpec(
  variant: ArchiveVariant,
  model: ArchiveModel | undefined,
  options: ResolveCubeVisualSpecOptions = {},
): CubeVisualSpec {
  const applyScheme = options.applyStandardFaceScheme ?? true;
  const att = variant.attestations;

  // size_mm — already inheritance-resolved by scripts/build.mjs into resolved_specs.
  const sizeMmResolved = variant.resolved_specs?.size_mm;
  const sizeMm: Provenance<number> = sizeMmResolved
    ? sourceBacked(sizeMmResolved.value, {
        from: sizeMmResolved.from,
        confidence: attestationFor(att, '/config/size_mm')?.confidence,
        sourceIds: attestationFor(att, '/config/size_mm')?.sources,
      })
    : unknown('not_researched');

  // application — colourway is a variant-only concept (a sold configuration), no model fallback.
  const applicationValue = variant.colorway?.application;
  const application: Provenance<ColorwayApplication> = applicationValue
    ? sourceBacked(applicationValue, {
        from: 'variant',
        confidence: attestationFor(att, '/colorway/application')?.confidence,
        sourceIds: attestationFor(att, '/colorway/application')?.sources,
      })
    : unknown('not_researched');

  // coating — NOT in scripts/lib/archive.mjs's SPEC_FIELDS list, so scripts/build.mjs never
  // resolves model inheritance for it into resolved_specs (verified by reading archive.mjs;
  // SPEC_FIELDS = size_mm, weight_g, shape, core_system, maglev, magnet_architecture,
  // adjustment_system, materials, piece_count — coating is absent). variant.schema.json's own
  // description says config is "Overrides only. Unset means the model's value applies.", so a
  // variant that inherits its model's coating would otherwise misread as `unknown` here. This
  // adapter replicates the same variant-then-model rule by hand for this one field.
  const coatingValue = variant.config?.coating ?? model?.specs?.coating;
  const coatingFrom: ResolvedFrom | undefined = variant.config?.coating
    ? 'variant'
    : model?.specs?.coating
      ? 'model'
      : undefined;
  const coating: Provenance<Coating> = coatingValue
    ? sourceBacked(coatingValue, {
        from: coatingFrom,
        confidence: attestationFor(att, '/config/coating')?.confidence,
        sourceIds: attestationFor(att, '/config/coating')?.sources,
      })
    : unknown('not_researched');

  // body plastic colour / translucency / finish — 489 of 511 undocumented for colour (§10.3).
  const bodyHex = hexOrUndefined(variant.colorway?.body?.plastic_color_normalized);
  const bodyColorHex: Provenance<HexColor> = bodyHex
    ? sourceBacked(bodyHex, {
        from: 'variant',
        confidence: attestationFor(att, '/colorway/body/plastic_color_normalized')?.confidence,
        sourceIds: attestationFor(att, '/colorway/body/plastic_color_normalized')?.sources,
      })
    : unknown(variant.colorway?.body?.plastic_color_name ? 'researched_not_found' : 'not_researched');

  const translucencyValue = variant.colorway?.body?.translucency;
  const bodyTranslucency: Provenance<ColorwayTranslucency> = translucencyValue
    ? sourceBacked(translucencyValue, { from: 'variant' })
    : unknown('not_researched');

  const finishValue = variant.colorway?.body?.finish;
  const bodyFinish: Provenance<ColorwayFinish> = finishValue
    ? sourceBacked(finishValue, { from: 'variant' })
    : unknown('not_researched');

  // faces — undocumented on all 511 public variants at the time EXHIBITION_ARCHITECTURE §10.3
  // was measured. When the archive is silent AND the museum has opted into §10.4(a), fall back
  // to the labelled standard scheme; otherwise stay `unknown` (§10.4(b)).
  const faces = {} as Record<FaceNotation, Provenance<FaceColorSpec>>;
  for (const face of FACE_NOTATIONS) {
    const idx = (variant.colorway?.faces ?? []).findIndex((f) => f.face === face);
    const faceRecord = idx >= 0 ? variant.colorway?.faces?.[idx] : undefined;
    const hex = hexOrUndefined(faceRecord?.color_normalized);
    if (hex) {
      faces[face] = sourceBacked(
        // colorName omitted rather than set to undefined: the archive having no
        // name for a colour it did record is a different state from the name
        // being present, and exactOptionalPropertyTypes keeps them apart.
        {
          colorHex: hex,
          ...(faceRecord?.color_name !== undefined ? { colorName: faceRecord.color_name } : {}),
        },
        {
          from: 'variant',
          confidence: attestationFor(att, `/colorway/faces/${idx}/color_normalized`)?.confidence,
          sourceIds: attestationFor(att, `/colorway/faces/${idx}/color_normalized`)?.sources,
        },
      );
    } else if (applyScheme) {
      faces[face] = convention({ colorHex: STANDARD_SCHEME_HEX[face] }, STANDARD_SCHEME_RATIONALE);
    } else {
      faces[face] = unknown(faceRecord?.color_name ? 'researched_not_found' : 'not_researched');
    }
  }

  const logoValue = variant.colorway?.logo?.placement;
  const logoPlacement: Provenance<LogoPlacement> = logoValue
    ? sourceBacked(logoValue, { from: 'variant' })
    : unknown('not_researched');

  const bevel: Provenance<BevelTreatment> = convention(DEFAULT_BEVEL, DEFAULT_BEVEL_RATIONALE);

  return {
    sizeMm,
    application,
    coating,
    body: { colorHex: bodyColorHex, translucency: bodyTranslucency, finish: bodyFinish },
    faces,
    logoPlacement,
    bevel,
  };
}
