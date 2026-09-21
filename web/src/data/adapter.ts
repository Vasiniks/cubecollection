// CubeCollection — archive -> exhibition adapter.
//
// SKELETON. Signatures and the core contract are fixed here first (see README.md) so this
// commits before the implementation, per the lane brief: "Commit a skeleton FIRST... before
// implementing — lanes here are killed by session limits regularly and uncommitted work is
// lost." Bodies below are filled in the next commit.
//
// Pure functions only. No I/O, no framework imports, no reading of data/, schema/, or vocab/ at
// runtime — see README.md "What the adapter refuses to do".

import type {
  Confidence, RecordStatus, ScopeClass, Value, SourceBackedValue, ConventionValue, UnknownValue,
  DisputedAlternative, CuratorialFraming, EvidenceRef, ResolvedSpecView, RelationshipView,
  RenderDiagnostics, ManufacturerView, FamilyView, ModelView, VariantView, GenerationInfo,
  ColorwayView, EditionView, RawDate, Face,
} from './types.ts';

// ---------------------------------------------------------------------------------------------
// Raw bundle record shapes — loose, structural types over what build.mjs actually emits into
// dist/preview or dist/public. Not derived from schema/**; these are the adapter's own read-side
// contract with the bundle, kept intentionally permissive (most fields optional) because the
// whole point of this file is to never assume a field is present.
// ---------------------------------------------------------------------------------------------

export interface RawDisputedEntry {
  value?: unknown;
  confidence?: Confidence;
  sources?: string[];
  note?: string;
}

export interface RawAttestation {
  confidence?: Confidence;
  sources?: string[];
  note?: string;
  disputed?: RawDisputedEntry[];
  adjudication?: string;
}

export type RawAttestations = Record<string, RawAttestation>;

export interface RawRelationship {
  type: string;
  target?: string;
  target_entity?: string;
  source?: string;
  source_entity?: string;
  note?: string;
}

export interface RawSource {
  id: string;
  entity: 'source';
  kind?: string;
  tier?: number;
  title?: string;
  publisher?: string;
  url?: string;
  archive_url?: string;
  excerpt?: string;
  accessed?: string;
  status?: RecordStatus;
}

export interface RawManufacturer {
  id: string;
  entity: 'manufacturer';
  name?: string;
  native_name?: string;
  country?: string;
  founded?: RawDate;
  website?: string;
  aliases?: string[];
  status: RecordStatus;
  scope_class?: ScopeClass;
  attestations?: RawAttestations;
}

export interface RawFamily {
  id: string;
  entity: 'family';
  manufacturer_id: string;
  name?: string;
  aliases?: string[];
  introduced?: RawDate;
  positioning?: string;
  description?: string;
  status: RecordStatus;
  scope_class?: ScopeClass;
  attestations?: RawAttestations;
}

export interface RawModel {
  id: string;
  entity: 'model';
  manufacturer_id: string;
  family_id: string | null;
  name?: string;
  generation?: { label?: string; ordinal?: number; basis?: string };
  announced?: RawDate;
  description?: string;
  status: RecordStatus;
  scope_class?: ScopeClass;
  specs?: Record<string, unknown>;
  relationships?: RawRelationship[];
  inbound_relationships?: RawRelationship[];
  attestations?: RawAttestations;
}

export interface RawColorwayFace {
  face: string;
  color_name?: string;
  color_normalized?: string;
}

export interface RawColorway {
  designation?: string;
  application?: string;
  scheme?: string;
  body?: { plastic_color_name?: string; translucency?: string; finish?: string };
  logo?: { placement?: string };
  faces?: RawColorwayFace[];
  completeness?: string;
}

export interface RawEdition {
  designation?: string;
  name?: string;
  types?: string[];
  limited?: { is_limited?: boolean; run_size?: number | null };
}

export interface RawResolvedSpec {
  value: unknown;
  from: 'model' | 'variant';
}

export interface RawVariant {
  id: string;
  entity: 'variant';
  model_id: string;
  name?: string;
  status: RecordStatus;
  scope_class?: ScopeClass;
  edition?: RawEdition;
  config?: Record<string, unknown>;
  colorway?: RawColorway;
  resolved_specs?: Record<string, RawResolvedSpec>;
  lineage?: {
    manufacturer_id?: string;
    family_id?: string | null;
    model_id?: string;
    model_name?: string | null;
    generation?: GenerationInfo | null;
    family_name?: string | null;
  };
  representation?: {
    procedural?: {
      geometry_profile_id?: string | null;
      colorway_completeness?: string;
      renderable?: boolean;
      blockers?: string[];
    };
  };
  first_release?: string | null;
  relationships?: RawRelationship[];
  inbound_relationships?: RawRelationship[];
  attestations?: RawAttestations;
}

// ---------------------------------------------------------------------------------------------
// Core primitive — every Value<T> in this adapter is built by this one function. See
// README.md's rule table for what each branch proves.
// ---------------------------------------------------------------------------------------------

/**
 * Build a Value<T> for one field, given the attestation map it should be looked up in (the
 * attestations live on the record that authored the field — see resolvedSpecValue() for why
 * that record is not always the same as the record the field is rendered on) and the field's
 * raw value as currently written in the document.
 */
export function attestedValue<T>(
  attestations: RawAttestations | undefined,
  pointer: string,
  rawValue: T | null | undefined,
): Value<T> {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// citedSourceIds / sourceTier — mirrored from scripts/lib/archive.mjs. See README.md
// "citedSourceIds() / sourceTier() — mirrored, not imported" for why this is a mirror and not
// an import.
// ---------------------------------------------------------------------------------------------

export function citedSourceIds(att: RawAttestation | undefined): string[] {
  throw new Error('not implemented');
}

export function sourceTier(source: RawSource | undefined): number {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// Evidence trail
// ---------------------------------------------------------------------------------------------

export function buildEvidenceTrail(
  sourceIds: Iterable<string>,
  sourcesById: Map<string, RawSource>,
): EvidenceRef[] {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// Curatorial framing (layer 2) — see README.md "Why curatorial framing is not a Value".
// ---------------------------------------------------------------------------------------------

export const MAKER_DEPTH_THRESHOLDS = { deepAtLeast: 16, thinAtMost: 3 } as const;

export function classifyMakerDepth(modelCount: number): CuratorialFraming<'deep' | 'mid' | 'thin'> {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// Rendering convention (layer 3) — opt-in only. See README.md "Rendering conventions". Nothing
// in adaptVariant() calls this.
// ---------------------------------------------------------------------------------------------

export const STANDARD_FACE_COLOR_CONVENTION_ID = 'wca-standard-color-scheme-v1';

export function standardFaceColorConvention(): Record<Face, ConventionValue<string>> {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// Inheritance — MODEL -> VARIANT only. See README.md "Inheritance".
// ---------------------------------------------------------------------------------------------

export function resolvedSpecValue(
  field: string,
  resolved: RawResolvedSpec | undefined,
  variantDoc: RawVariant,
  modelDoc: RawModel | null | undefined,
): ResolvedSpecView<unknown> | undefined {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// Relationships
// ---------------------------------------------------------------------------------------------

export function adaptRelationships(
  relationships: RawRelationship[] | undefined,
  attestations: RawAttestations | undefined,
  pointerPrefix: string,
): RelationshipView[] {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// View-model builders
// ---------------------------------------------------------------------------------------------

export function adaptManufacturer(raw: RawManufacturer, opts: { modelCount: number }): ManufacturerView {
  throw new Error('not implemented');
}

export function adaptFamily(raw: RawFamily): FamilyView {
  throw new Error('not implemented');
}

export function adaptModel(raw: RawModel, opts?: { familyName?: string | null }): ModelView {
  throw new Error('not implemented');
}

export function adaptVariant(raw: RawVariant, opts: { model?: RawModel | null }): VariantView {
  throw new Error('not implemented');
}
