// CubeCollection — exhibition view-model types.
//
// This is the OUTPUT contract of the archive -> exhibition adapter (adapter.ts). Nothing in
// web/ that renders UI may read a raw bundle record directly; it reads these types instead.
//
// See README.md in this directory for the full provenance contract this file encodes. In
// short: every value that reaches the UI carries its epistemic basis, and three layers never
// collapse into one:
//
//   1. canonical archival information  -> Value<T> with basis 'source-backed' or 'unknown'
//   2. exhibition interpretation        -> CuratorialFraming<T> (a distinct type, never a Value)
//   3. rendering convention             -> Value<T> with basis 'convention'
//
// Layers 1 and 3 share the Value<T> wrapper because both travel with the UI at the same call
// sites (a spec field is either archive-attested or, if the exhibition chooses, a labelled
// convention) — but the discriminated `basis` field makes them impossible to confuse at compile
// time, and a convention can never claim `confidence` or `sourceIds` because SourceBackedValue
// and ConventionValue are different members of the union. Layer 2 (curatorial framing: groupings,
// emphasis, narrative) is a wholly different type, CuratorialFraming<T>, which has no `basis`
// field at all and can never be mistaken for a Value<T> — see §"Why curatorial framing is not a
// Value" in README.md.

// ---------------------------------------------------------------------------------------------
// Vocabulary-backed enums. These mirror vocab/confidence.yml, vocab/record-status.yml and
// vocab/scope-class.yml (data, read-only; not reimplemented logic, just their value sets).
// ---------------------------------------------------------------------------------------------

/** vocab/confidence.yml. `unknown` = explicitly researched and not found. Never a synonym for
 * "we didn't check" — see UnknownValue.searched for that distinction. */
export type Confidence = 'confirmed' | 'probable' | 'reported' | 'uncertain' | 'disputed' | 'unknown';

/** vocab/record-status.yml. Surfaced verbatim on every view model — see README "record.status". */
export type RecordStatus = 'stub' | 'drafted' | 'sourced' | 'reviewed' | 'published' | 'disputed' | 'deprecated';

/** vocab/scope-class.yml. */
export type ScopeClass = 'core' | 'conditional' | 'reference_only';

export const FACES = ['U', 'D', 'F', 'B', 'L', 'R'] as const;
export type Face = (typeof FACES)[number];

// ---------------------------------------------------------------------------------------------
// THE PROVENANCE CONTRACT — Value<T>
// ---------------------------------------------------------------------------------------------

/** One archival alternative inside a disputed attestation. Mirrors att.disputed[] exactly:
 * the archive records candidate values from disagreeing sources without picking a winner, and
 * the adapter must not pick one either (see adapter.ts attestedValue()). */
export interface DisputedAlternative<T> {
  value: T;
  confidence: Confidence;
  sourceIds: string[];
  note?: string;
}

/** The archive attests this value, with a confidence level and at least the intent of sources
 * (an attestation can carry zero sources only in degenerate/malformed data — the adapter does
 * not enforce that here; schema validation is scripts/validate.mjs's job, not this adapter's). */
export interface SourceBackedValue<T> {
  basis: 'source-backed';
  value: T;
  confidence: Confidence;
  sourceIds: string[];
  note?: string;
  /** Present only when confidence === 'disputed'. Preserves every candidate; the adapter never
   * collapses this to a single winner and never drops it. */
  disputed?: DisputedAlternative<T>[];
  /** The archive's own adjudication note, if any (often "Not adjudicated. ..."). Passed through
   * verbatim; the adapter does not summarise or resolve it. */
  adjudication?: string;
}

/** A value the EXHIBITION supplies where the archive makes no claim at all — e.g. the standard
 * WCA colour-scheme convention offered for faces the archive has not sourced (§10.4 of
 * EXHIBITION_ARCHITECTURE.md). Structurally cannot claim `confidence` or `sourceIds`: it is not
 * evidence, and the type does not allow pretending it is. */
export interface ConventionValue<T> {
  basis: 'convention';
  value: T;
  /** Identifies which documented convention produced this value, e.g.
   * 'wca-standard-color-scheme-v1'. Never omitted: an unlabelled convention is exactly the
   * failure mode EXHIBITION_ARCHITECTURE §10.4 warns against ("must not let a visitor believe
   * the archive sourced that arrangement"). */
  conventionId: string;
  note?: string;
}

/**
 * No archival claim reaches the UI here, and the adapter has not invented one.
 *
 * `searched` preserves a distinction the archive itself makes and that this contract is
 * required to preserve (see RESEARCH_FINAL_HANDOFF.md "METHODOLOGY" and vocab/confidence.yml):
 *   - searched: true   the archive carries an explicit attestation with confidence 'unknown'
 *                      at this pointer — it looked, and states it found nothing.
 *   - searched: false  no attestation exists at this pointer at all. Either nobody has examined
 *                      this field yet, or (per RESEARCH_FINAL_HANDOFF item 8) it is a
 *                      collection-wide gap that was never logged per-record. Either way this is
 *                      NOT the same claim as `searched: true`, and the adapter does not conflate
 *                      them just because both currently render as "unknown" in a plain UI.
 */
export interface UnknownValue<T = unknown> {
  basis: 'unknown';
  searched: boolean;
  note?: string;
  /**
   * The archive's raw document sometimes carries a real, non-null value at a field pointer
   * that nonetheless has no attestation entry (e.g. a variant's `colorway.scheme` or
   * `edition.name` — populated, but never individually cited). Dropping that content would be
   * needlessly lossy; presenting it as `source-backed` would fabricate a confidence that was
   * never assigned. This field preserves it while the `basis: 'unknown'` tag keeps it from ever
   * being mistaken for an evidenced claim. A caller that ignores this field loses nothing that
   * the provenance contract promises; a caller that reads it must not display it as attested.
   */
  unattestedValue?: T;
}

/** The single wrapper every archival or convention value travels in. A discriminated union on
 * `basis`, so `value.basis === 'source-backed'` narrows to a type that actually has `confidence`
 * and `sourceIds` — there is no way, in TypeScript, to read `.confidence` off a value the
 * adapter tagged `unknown`, because that variant does not have the field. */
export type Value<T> = SourceBackedValue<T> | ConventionValue<T> | UnknownValue<T>;

export function isSourceBacked<T>(v: Value<T>): v is SourceBackedValue<T> {
  return v.basis === 'source-backed';
}
export function isConvention<T>(v: Value<T>): v is ConventionValue<T> {
  return v.basis === 'convention';
}
export function isUnknown<T>(v: Value<T>): v is UnknownValue<T> {
  return v.basis === 'unknown';
}

// ---------------------------------------------------------------------------------------------
// LAYER 2 — exhibition interpretation. Deliberately NOT a Value<T>: it has no `basis` field, no
// `confidence`, no `sourceIds`, and cannot satisfy the Value<T> type. A component that wants to
// render a Value and receives a CuratorialFraming (or vice versa) fails to compile.
// ---------------------------------------------------------------------------------------------

export interface CuratorialFraming<T> {
  readonly curatorial: true;
  value: T;
  /** Human-readable label for the framing, e.g. "Deep maker". */
  label: string;
  /** What archival fact(s) this framing was computed from, e.g. "40 models (GAN)". Always an
   * arithmetic/structural fact already visible elsewhere as archive data — never a new claim. */
  computedFrom: string;
  /** Which curatorial rule produced this, so it can be revised without silently changing old
   * output — see adapter.ts MAKER_DEPTH_THRESHOLDS. */
  frameworkId: string;
}

// ---------------------------------------------------------------------------------------------
// Evidence trail — the evidence drawer's data, per EXHIBITION_ARCHITECTURE §4.1 / §6.
// ---------------------------------------------------------------------------------------------

export interface EvidenceRef {
  sourceId: string;
  /** Resolved via the same rule as scripts/lib/archive.mjs sourceTier(): an explicit per-source
   * override always wins over its kind's default tier. See adapter.ts sourceTier(). */
  tier: number;
  title: string;
  kind: string;
  publisher?: string;
  url?: string;
  archiveUrl?: string;
  excerpt?: string;
  accessed?: string;
  /** True if the sourceId was cited but not found in the loaded source bundle (defensive —
   * should not happen against a consistent bundle, but the adapter never throws over it). */
  missing?: boolean;
}

// ---------------------------------------------------------------------------------------------
// Inheritance — MODEL -> VARIANT only, never variant -> sibling variant. See adapter.ts
// resolvedSpecView(), which only ever reads the variant's own doc and its one parent model doc.
// ---------------------------------------------------------------------------------------------

export interface ResolvedSpecView<T> {
  from: 'model' | 'variant';
  value: Value<T>;
}

// ---------------------------------------------------------------------------------------------
// Relationships (succession, reissue, etc.)
// ---------------------------------------------------------------------------------------------

export interface RelationshipView {
  type: string;
  targetId?: string;
  targetEntity?: string;
  sourceId?: string;
  sourceEntity?: string;
  note: Value<string>;
}

// ---------------------------------------------------------------------------------------------
// Rendering diagnostics — archive-computed, deterministic functions of data already represented
// as Values elsewhere. Not wrapped in Value<T> themselves: they carry no independent confidence
// to report (see README "Why render diagnostics are not Values").
// ---------------------------------------------------------------------------------------------

export interface RenderDiagnostics {
  geometryProfileId: string | null;
  colorwayCompleteness: 'render_ready' | 'face_complete' | 'partial' | 'none';
  renderable: boolean;
  blockers: string[];
}

// ---------------------------------------------------------------------------------------------
// View models
// ---------------------------------------------------------------------------------------------

export interface ManufacturerView {
  id: string;
  status: RecordStatus;
  scopeClass?: ScopeClass;
  name: Value<string>;
  nativeName: Value<string>;
  country: Value<string>;
  founded: Value<RawDate>;
  website?: string;
  aliases: string[];
  modelCount: number;
  evidenceTrail: EvidenceRef[];
  curatorial: {
    makerDepth: CuratorialFraming<'deep' | 'mid' | 'thin'>;
  };
}

export interface FamilyView {
  id: string;
  manufacturerId: string;
  status: RecordStatus;
  scopeClass?: ScopeClass;
  name: Value<string>;
  aliases: string[];
  introduced: Value<RawDate>;
  positioning: Value<string>;
  description: Value<string>;
  evidenceTrail: EvidenceRef[];
}

export interface GenerationInfo {
  label?: string;
  ordinal?: number;
  basis?: string;
}

export interface ModelView {
  id: string;
  manufacturerId: string;
  familyId: string | null;
  familyName: string | null;
  status: RecordStatus;
  scopeClass?: ScopeClass;
  name: string;
  generation: Value<GenerationInfo>;
  announced: Value<RawDate>;
  description: Value<string>;
  relationships: RelationshipView[];
  inboundRelationships: RelationshipView[];
  evidenceTrail: EvidenceRef[];
}

export interface RawDate {
  value?: string;
  precision?: string;
  qualifier?: string;
  earliest?: string;
}

export interface ColorwayFaceView {
  face: Face;
  color: Value<string>;
}

export interface ColorwayView {
  designation: Value<string>;
  application: Value<string>;
  scheme: Value<string>;
  body: {
    plasticColor: Value<string>;
    translucency: Value<string>;
    finish: Value<string>;
  };
  logo: {
    placement: Value<string>;
  };
  faces: ColorwayFaceView[];
  /** Archive-computed, see RenderDiagnostics comment. */
  completeness: 'render_ready' | 'face_complete' | 'partial' | 'none';
}

export interface EditionView {
  designation: Value<string>;
  name: Value<string>;
  types: Value<string[]>;
  limited: {
    isLimited: Value<boolean>;
    runSize: Value<number>;
  };
}

export interface VariantView {
  id: string;
  modelId: string;
  status: RecordStatus;
  scopeClass?: ScopeClass;
  name: string;
  lineage: {
    manufacturerId: string;
    familyId: string | null;
    familyName: string | null;
    modelId: string;
    modelName: string | null;
    generation: GenerationInfo | null;
  };
  edition: EditionView;
  colorway: ColorwayView;
  /** Keyed by spec field name (size_mm, weight_g, core_system, maglev, ...). Whatever fields the
   * bundle's resolved_specs carries — the adapter does not hardcode the field list, so it never
   * drifts from build.mjs's SPEC_FIELDS. */
  resolvedSpecs: Record<string, ResolvedSpecView<unknown>>;
  firstRelease: Value<string>;
  render: RenderDiagnostics;
  evidenceTrail: EvidenceRef[];
}
