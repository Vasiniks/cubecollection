// CubeCollection — archive -> exhibition adapter.
//
// The signatures and the provenance contract came from the adapter lane; the implementation
// below was written after that lane was killed by a session limit with its bodies uncommitted.
//
// Pure functions only. No I/O, no framework imports, no reading of data/, schema/, or vocab/ at
// runtime — see README.md "What the adapter refuses to do".

import { FACES } from './types.ts';
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
  const att = attestations?.[pointer];
  const present = rawValue !== null && rawValue !== undefined;

  // No attestation at this pointer. The archive has not cited anything here, so
  // nothing may be presented as evidenced — but a populated field is still
  // carried through as unattestedValue rather than thrown away.
  if (!att) {
    const out: UnknownValue<T> = { basis: 'unknown', searched: false };
    if (present) out.unattestedValue = rawValue;
    return out;
  }

  // An explicit confidence of 'unknown' is the archive saying it LOOKED and
  // found nothing. That is a finding, and it is not the same as silence.
  if (att.confidence === 'unknown') {
    const out: UnknownValue<T> = { basis: 'unknown', searched: true };
    if (att.note !== undefined) out.note = att.note;
    if (present) out.unattestedValue = rawValue;
    return out;
  }

  // An attestation exists but the field itself is empty. Treat as searched:
  // someone cited something at this pointer.
  if (!present) {
    const out: UnknownValue<T> = { basis: 'unknown', searched: true };
    if (att.note !== undefined) out.note = att.note;
    return out;
  }

  const out: SourceBackedValue<T> = {
    basis: 'source-backed',
    value: rawValue,
    // The adapter never invents or raises a confidence. An attestation with no
    // confidence recorded is reported at the weakest value the vocabulary has
    // that still means "attested", never promoted upward.
    confidence: att.confidence ?? 'uncertain',
    sourceIds: citedSourceIds(att),
  };
  if (att.note !== undefined) out.note = att.note;
  if (att.adjudication !== undefined) out.adjudication = att.adjudication;

  // A dispute is preserved in full. The adapter does not pick a winner, and it
  // does not drop the alternatives just because one value sits in the document.
  if (att.disputed && att.disputed.length > 0) {
    out.disputed = att.disputed.map((d): DisputedAlternative<T> => {
      const alt: DisputedAlternative<T> = {
        value: d.value as T,
        confidence: d.confidence ?? 'uncertain',
        sourceIds: d.sources ?? [],
      };
      if (d.note !== undefined) alt.note = d.note;
      return alt;
    });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// citedSourceIds / sourceTier — mirrored from scripts/lib/archive.mjs. See README.md
// "citedSourceIds() / sourceTier() — mirrored, not imported" for why this is a mirror and not
// an import.
// ---------------------------------------------------------------------------------------------

export function citedSourceIds(att: RawAttestation | undefined): string[] {
  if (!att || typeof att !== 'object') return [];
  // Both halves. A source cited only inside a dispute is still a source, and
  // reading att.sources alone under-counts the evidence behind a disputed claim.
  return [...(att.sources ?? []), ...(att.disputed ?? []).flatMap((d) => d?.sources ?? [])];
}

/** vocab/source-kinds.yml tier defaults. Mirrored, not imported — the adapter
 *  may not read vocab/ at runtime. Kept beside the assertion in the test that
 *  it still matches the vocabulary file. */
export const KIND_TIER_DEFAULTS: Readonly<Record<string, number>> = {
  manufacturer_official: 1, patent: 1, packaging: 1, manual: 1, standards_body: 1,
  archivist_measurement: 1, archivist_photo: 1,
  retailer: 2, press: 2,
  review: 3, forum: 3, video: 3,
  marketplace: 4, wiki: 4,
};

export const UNKNOWN_KIND_TIER = 5;

export function sourceTier(source: RawSource | undefined): number {
  // An explicit per-source tier ALWAYS beats its kind's default. 55 sources
  // carry one, and reading kind defaults alone has previously produced badly
  // wrong coverage figures on this project.
  if (source !== undefined && Number.isInteger(source.tier)) return source.tier as number;
  const kind = source?.kind;
  if (kind !== undefined && kind in KIND_TIER_DEFAULTS) {
    return KIND_TIER_DEFAULTS[kind] as number;
  }
  return UNKNOWN_KIND_TIER;
}

// ---------------------------------------------------------------------------------------------
// Evidence trail
// ---------------------------------------------------------------------------------------------

export function buildEvidenceTrail(
  sourceIds: Iterable<string>,
  sourcesById: Map<string, RawSource>,
): EvidenceRef[] {
  const seen = new Set<string>();
  const out: EvidenceRef[] = [];
  for (const id of sourceIds) {
    if (seen.has(id)) continue;
    seen.add(id);
    const src = sourcesById.get(id);
    if (!src) {
      // Never throw over a dangling citation: report it as missing so the gap
      // is visible rather than silently absent from the trail.
      out.push({ sourceId: id, tier: UNKNOWN_KIND_TIER, title: id, kind: 'unknown', missing: true });
      continue;
    }
    const ref: EvidenceRef = {
      sourceId: id,
      tier: sourceTier(src),
      title: src.title ?? id,
      kind: src.kind ?? 'unknown',
    };
    if (src.publisher !== undefined) ref.publisher = src.publisher;
    if (src.url !== undefined) ref.url = src.url;
    if (src.archive_url !== undefined) ref.archiveUrl = src.archive_url;
    if (src.excerpt !== undefined) ref.excerpt = src.excerpt;
    if (src.accessed !== undefined) ref.accessed = src.accessed;
    out.push(ref);
  }
  // Strongest evidence first, then stable by id so output does not churn.
  return out.sort((a, b) => a.tier - b.tier || a.sourceId.localeCompare(b.sourceId));
}

// ---------------------------------------------------------------------------------------------
// Curatorial framing (layer 2) — see README.md "Why curatorial framing is not a Value".
// ---------------------------------------------------------------------------------------------

export const MAKER_DEPTH_THRESHOLDS = { deepAtLeast: 16, thinAtMost: 3 } as const;

export function classifyMakerDepth(modelCount: number): CuratorialFraming<'deep' | 'mid' | 'thin'> {
  const value = modelCount >= MAKER_DEPTH_THRESHOLDS.deepAtLeast ? 'deep'
    : modelCount <= MAKER_DEPTH_THRESHOLDS.thinAtMost ? 'thin'
    : 'mid';
  const label = value === 'deep' ? 'Deep maker' : value === 'thin' ? 'Thinly covered maker' : 'Mid-depth maker';
  return {
    curatorial: true,
    value,
    label,
    // Arithmetic over a count already visible as archive data. This adds no new
    // claim about the manufacturer, only the exhibition's way of grouping them.
    computedFrom: `${modelCount} model record${modelCount === 1 ? '' : 's'} in the archive`,
    frameworkId: 'maker-depth-v1',
  };
}

// ---------------------------------------------------------------------------------------------
// Rendering convention (layer 3) — opt-in only. See README.md "Rendering conventions". Nothing
// in adaptVariant() calls this.
// ---------------------------------------------------------------------------------------------

/**
 * The id of the real registry entry in conventions/rendering-conventions.yml.
 *
 * It is NOT a name invented here. A conventionId that does not resolve to a
 * registry entry would be an unlabelled convention wearing a label, which is
 * the precise failure the registry exists to prevent — and the registry's
 * visitor_disclosure, asserts_nothing_about and if_removed fields are what a
 * UI must show alongside any value produced here.
 */
export const STANDARD_FACE_COLOR_CONVENTION_ID = 'cv-face-colours-wca-standard';

/** Mirrors the `value` block of cv-face-colours-wca-standard. */
const STANDARD_FACE_COLORS: Readonly<Record<Face, string>> = {
  U: '#F5F5F0', D: '#E6C200', F: '#00843D', B: '#0051BA', L: '#E8620C', R: '#C41E3A',
};

export function standardFaceColorConvention(): Record<Face, ConventionValue<string>> {
  const out = {} as Record<Face, ConventionValue<string>>;
  for (const face of Object.keys(STANDARD_FACE_COLORS) as Face[]) {
    out[face] = {
      basis: 'convention',
      value: STANDARD_FACE_COLORS[face],
      conventionId: STANDARD_FACE_COLOR_CONVENTION_ID,
    };
  }
  return out;
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
  if (!resolved) return undefined;
  // The attestation lives on whichever record actually authored the value. A
  // variant that does not override a spec never asserted it, so its evidence is
  // the MODEL's. Inheritance runs model -> variant and stops there: no sibling
  // variant is ever consulted, which is why modelDoc is the only other document
  // this function can see.
  const value = resolved.from === 'model'
    ? attestedValue(modelDoc?.attestations, `/specs/${field}`, resolved.value)
    : attestedValue(variantDoc.attestations, `/config/${field}`, resolved.value);
  return { from: resolved.from, value };
}

// ---------------------------------------------------------------------------------------------
// Relationships
// ---------------------------------------------------------------------------------------------

export function adaptRelationships(
  relationships: RawRelationship[] | undefined,
  attestations: RawAttestations | undefined,
  pointerPrefix: string,
): RelationshipView[] {
  return (relationships ?? []).map((rel, i) => {
    const view: RelationshipView = {
      type: rel.type,
      note: attestedValue(attestations, `${pointerPrefix}/${i}/note`, rel.note),
    };
    if (rel.target !== undefined) view.targetId = rel.target;
    if (rel.target_entity !== undefined) view.targetEntity = rel.target_entity;
    if (rel.source !== undefined) view.sourceId = rel.source;
    if (rel.source_entity !== undefined) view.sourceEntity = rel.source_entity;
    return view;
  });
}

// ---------------------------------------------------------------------------------------------
// View-model builders
// ---------------------------------------------------------------------------------------------

/** Every source cited anywhere on a record, via both halves of every attestation. */
function allCitedIds(attestations: RawAttestations | undefined): string[] {
  return Object.values(attestations ?? {}).flatMap((att) => citedSourceIds(att));
}

export function adaptManufacturer(
  raw: RawManufacturer,
  opts: { modelCount: number; sourcesById?: Map<string, RawSource> },
): ManufacturerView {
  const att = raw.attestations;
  const view: ManufacturerView = {
    id: raw.id,
    status: raw.status,
    name: attestedValue(att, '/name', raw.name),
    nativeName: attestedValue(att, '/native_name', raw.native_name),
    country: attestedValue(att, '/country', raw.country),
    founded: attestedValue(att, '/founded', raw.founded),
    aliases: raw.aliases ?? [],
    modelCount: opts.modelCount,
    evidenceTrail: buildEvidenceTrail(allCitedIds(att), opts.sourcesById ?? new Map()),
    curatorial: { makerDepth: classifyMakerDepth(opts.modelCount) },
  };
  if (raw.scope_class !== undefined) view.scopeClass = raw.scope_class;
  if (raw.website !== undefined) view.website = raw.website;
  return view;
}

export function adaptFamily(
  raw: RawFamily,
  opts: { sourcesById?: Map<string, RawSource> } = {},
): FamilyView {
  const att = raw.attestations;
  const view: FamilyView = {
    id: raw.id,
    manufacturerId: raw.manufacturer_id,
    status: raw.status,
    name: attestedValue(att, '/name', raw.name),
    aliases: raw.aliases ?? [],
    introduced: attestedValue(att, '/introduced', raw.introduced),
    positioning: attestedValue(att, '/positioning', raw.positioning),
    description: attestedValue(att, '/description', raw.description),
    evidenceTrail: buildEvidenceTrail(allCitedIds(att), opts.sourcesById ?? new Map()),
  };
  if (raw.scope_class !== undefined) view.scopeClass = raw.scope_class;
  return view;
}

export function adaptModel(
  raw: RawModel,
  opts: { familyName?: string | null; sourcesById?: Map<string, RawSource> } = {},
): ModelView {
  const att = raw.attestations;
  const view: ModelView = {
    id: raw.id,
    manufacturerId: raw.manufacturer_id,
    familyId: raw.family_id,
    familyName: opts.familyName ?? null,
    status: raw.status,
    // A record's own name is its identity, not a claim needing a citation, so
    // it is a plain string here while every other field travels as a Value.
    name: raw.name ?? raw.id,
    generation: attestedValue(att, '/generation', raw.generation),
    announced: attestedValue(att, '/announced', raw.announced),
    description: attestedValue(att, '/description', raw.description),
    relationships: adaptRelationships(raw.relationships, att, '/relationships'),
    inboundRelationships: adaptRelationships(raw.inbound_relationships, att, '/inbound_relationships'),
    evidenceTrail: buildEvidenceTrail(allCitedIds(att), opts.sourcesById ?? new Map()),
  };
  if (raw.scope_class !== undefined) view.scopeClass = raw.scope_class;
  return view;
}

const COMPLETENESS = new Set(['render_ready', 'face_complete', 'partial', 'none']);
function asCompleteness(v: string | undefined): RenderDiagnostics['colorwayCompleteness'] {
  return (v !== undefined && COMPLETENESS.has(v))
    ? (v as RenderDiagnostics['colorwayCompleteness'])
    : 'none';
}

export function adaptVariant(
  raw: RawVariant,
  opts: { model?: RawModel | null; sourcesById?: Map<string, RawSource> } = {},
): VariantView {
  const att = raw.attestations;
  const cw = raw.colorway;
  const ed = raw.edition;
  const proc = raw.representation?.procedural;

  // Faces are emitted for all six regardless of what the archive holds, so a
  // consumer cannot silently render five and omit the sixth. Undocumented
  // faces arrive as `unknown` — NOT as a colour. Turning them into colours is
  // a rendering convention and is the caller's explicit opt-in, via
  // standardFaceColorConvention(), never something this adapter does for them.
  const faces: ColorwayView['faces'] = FACES.map((face) => {
    const idx = (cw?.faces ?? []).findIndex((f) => f.face === face);
    const rec = idx >= 0 ? cw?.faces?.[idx] : undefined;
    return {
      face,
      color: attestedValue(att, `/colorway/faces/${idx}/color_normalized`,
        rec?.color_normalized ?? rec?.color_name),
    };
  });

  const colorway: ColorwayView = {
    designation: attestedValue(att, '/colorway/designation', cw?.designation),
    application: attestedValue(att, '/colorway/application', cw?.application),
    scheme: attestedValue(att, '/colorway/scheme', cw?.scheme),
    body: {
      plasticColor: attestedValue(att, '/colorway/body/plastic_color_name', cw?.body?.plastic_color_name),
      translucency: attestedValue(att, '/colorway/body/translucency', cw?.body?.translucency),
      finish: attestedValue(att, '/colorway/body/finish', cw?.body?.finish),
    },
    logo: { placement: attestedValue(att, '/colorway/logo/placement', cw?.logo?.placement) },
    faces,
    completeness: asCompleteness(cw?.completeness ?? proc?.colorway_completeness),
  };

  const edition: EditionView = {
    designation: attestedValue(att, '/edition/designation', ed?.designation),
    name: attestedValue(att, '/edition/name', ed?.name),
    types: attestedValue(att, '/edition/types', ed?.types),
    limited: {
      isLimited: attestedValue(att, '/edition/limited/is_limited', ed?.limited?.is_limited),
      runSize: attestedValue(att, '/edition/limited/run_size', ed?.limited?.run_size),
    },
  };

  const resolvedSpecs: Record<string, ResolvedSpecView<unknown>> = {};
  for (const [field, spec] of Object.entries(raw.resolved_specs ?? {})) {
    const v = resolvedSpecValue(field, spec, raw, opts.model);
    if (v) resolvedSpecs[field] = v;
  }

  // The evidence trail spans the variant AND the model it inherits from, because
  // an inherited spec's evidence lives on the model. Without the model's ids a
  // visitor would see an inherited figure with an empty trail behind it.
  const citedIds = [...allCitedIds(att), ...allCitedIds(opts.model?.attestations)];

  const view: VariantView = {
    id: raw.id,
    modelId: raw.model_id,
    status: raw.status,
    name: raw.name ?? raw.id,
    lineage: {
      manufacturerId: raw.lineage?.manufacturer_id ?? opts.model?.manufacturer_id ?? '',
      familyId: raw.lineage?.family_id ?? opts.model?.family_id ?? null,
      familyName: raw.lineage?.family_name ?? null,
      modelId: raw.lineage?.model_id ?? raw.model_id,
      modelName: raw.lineage?.model_name ?? opts.model?.name ?? null,
      generation: raw.lineage?.generation ?? null,
    },
    edition,
    colorway,
    resolvedSpecs,
    firstRelease: attestedValue(att, '/first_release', raw.first_release),
    render: {
      geometryProfileId: proc?.geometry_profile_id ?? null,
      colorwayCompleteness: asCompleteness(proc?.colorway_completeness),
      // Derived by the archive. Defaults to false: a bundle that omits the flag
      // must never be read as "safe to render".
      renderable: proc?.renderable ?? false,
      blockers: proc?.blockers ?? [],
    },
    evidenceTrail: buildEvidenceTrail(citedIds, opts.sourcesById ?? new Map()),
  };
  if (raw.scope_class !== undefined) view.scopeClass = raw.scope_class;
  return view;
}
