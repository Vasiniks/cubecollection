/**
 * provenance.ts
 *
 * The single load-bearing idea of this module tree. CubeCollection's archive documents almost no
 * visual facts (docs/EXHIBITION_ARCHITECTURE.md §10.3). Measured across all 511 public variants:
 * face colours undocumented on 511, logo placement on 511, geometry profile on 511, body plastic
 * colour on 489 of 511. A rendering system built on top of that archive must never let "we did
 * not research this" quietly become "we know this cube is white". This file is the mechanism
 * that makes that impossible to do by accident, not just a convention to remember.
 *
 * Every visual input to the three.js layer is wrapped in `Provenance<T>`, a discriminated union
 * with exactly three members:
 *
 *   - `source-backed` — the archive attests this value. Carries the archive's own confidence
 *     vocabulary (vocab/confidence.yml) and the source ids that support it, when the adapter in
 *     types.ts could resolve them from the record's `attestations` sidecar.
 *   - `convention`    — the museum chose this value because the archive makes no claim at all.
 *     Carries a mandatory, human-readable `rationale` so a UI layer can surface *why* this is
 *     being shown next to the rendered object (EXHIBITION_ARCHITECTURE §10.4(a): "the convention
 *     is visible to the visitor" is a hard requirement, not a nice-to-have).
 *   - `unknown`       — nothing to render. This branch deliberately has no `value` field, so
 *     `provenance.value` is a *compile error* until the caller has narrowed on `provenance.kind`.
 *     There is structurally no way to read a colour, a placement, or a coating out of an
 *     `unknown` provenance value — the type checker forbids it, not a runtime `if`.
 *
 * Consumers (materials.ts above all) are expected to switch on `.kind` and let the `unknown`
 * branch fall through to a placeholder that is visibly NOT a plausible archival fact.
 */

/** vocab/confidence.yml, mirrored by hand. See types.ts's header for the sync note. */
export type Confidence =
  | 'confirmed'
  | 'probable'
  | 'reported'
  | 'uncertain'
  | 'disputed'
  | 'unknown';

/** Which record layer a value came from, mirroring scripts/lib/archive.mjs `resolveSpec()`. */
export type ResolvedFrom = 'variant' | 'model';

export type ProvenanceKind = 'source-backed' | 'convention' | 'unknown';

export interface SourceBacked<T> {
  readonly kind: 'source-backed';
  readonly value: T;
  /** vocab/confidence.yml value for this specific claim, when the adapter found one. */
  readonly confidence?: Confidence;
  /** schema/source.schema.json ids backing this value, when known. */
  readonly sourceIds?: readonly string[];
  /** Which layer (variant override vs. model default) resolved to this value. */
  readonly from?: ResolvedFrom;
}

export interface Convention<T> {
  readonly kind: 'convention';
  readonly value: T;
  /**
   * Why the museum chose this default. Never optional: a convention with no stated reason is
   * indistinguishable from evidence, which is exactly what EXHIBITION_ARCHITECTURE §10.4
   * forbids. See types.ts's `STANDARD_SCHEME_RATIONALE` / `DEFAULT_BEVEL_RATIONALE` for the
   * rationales this codebase actually uses.
   */
  readonly rationale: string;
}

export interface Unknown {
  readonly kind: 'unknown';
  /**
   * `not_researched`       — the field has never been examined (archive silence; most of 511).
   * `researched_not_found` — the archive's own `unknown` confidence value: actively searched,
   *   nothing found (vocab/confidence.yml: "Not the same as an absent field.").
   * `blocked`               — a source existed but could not be reached (RESEARCH_FINAL_HANDOFF's
   *   `blocked` state — neither found nor searched-and-absent).
   * Rendering treatment is identical for all three (there is nothing to draw), but the reason is
   * retained because the evidence drawer (EXHIBITION_ARCHITECTURE §6) draws this distinction for
   * every other claim type in the archive, and a future UI layer here may want to as well.
   */
  readonly reason?: 'not_researched' | 'researched_not_found' | 'blocked';
}

export type Provenance<T> = SourceBacked<T> | Convention<T> | Unknown;

// ---------------------------------------------------------------- constructors

/**
 * Optional properties that may be passed as an explicit `undefined`.
 *
 * The project compiles with `exactOptionalPropertyTypes`, which distinguishes
 * "key absent" from "key present holding undefined" — the same distinction the
 * archive draws between a field never researched and one searched and not
 * found. Callers naturally build these objects from values that may be
 * undefined, so the constructors accept that and DROP the undefined keys, which
 * keeps the distinction meaningful in the result instead of erasing it.
 */
type MaybeUndefined<T> = { [K in keyof T]?: T[K] | undefined };

export function sourceBacked<T>(
  value: T,
  extra: MaybeUndefined<Pick<SourceBacked<T>, 'confidence' | 'sourceIds' | 'from'>> = {},
): SourceBacked<T> {
  // Assigned key by key rather than spread: a spread would write the key with
  // an explicit undefined, and under exactOptionalPropertyTypes that is not the
  // same as leaving it out.
  const out: {
    kind: 'source-backed';
    value: T;
    // Exclude<..., undefined>: indexing an optional property yields `X | undefined`,
    // which would reintroduce exactly the explicit-undefined this avoids.
    confidence?: Exclude<SourceBacked<T>['confidence'], undefined>;
    sourceIds?: Exclude<SourceBacked<T>['sourceIds'], undefined>;
    from?: Exclude<SourceBacked<T>['from'], undefined>;
  } = { kind: 'source-backed', value };
  if (extra.confidence !== undefined) out.confidence = extra.confidence;
  if (extra.sourceIds !== undefined) out.sourceIds = extra.sourceIds;
  if (extra.from !== undefined) out.from = extra.from;
  return out;
}

export function convention<T>(value: T, rationale: string): Convention<T> {
  return { kind: 'convention', value, rationale };
}

export function unknown(reason?: Unknown['reason']): Unknown {
  // Not `{ kind: 'unknown', reason }`: that writes an explicit undefined, which
  // under exactOptionalPropertyTypes is a different thing from an absent key.
  return reason === undefined ? { kind: 'unknown' } : { kind: 'unknown', reason };
}

// ---------------------------------------------------------------- guards

export function isSourceBacked<T>(p: Provenance<T>): p is SourceBacked<T> {
  return p.kind === 'source-backed';
}

export function isConvention<T>(p: Provenance<T>): p is Convention<T> {
  return p.kind === 'convention';
}

export function isUnknown<T>(p: Provenance<T>): p is Unknown {
  return p.kind === 'unknown';
}

/** True for either populated branch. Narrows away `Unknown`, which has no `.value`. */
export function hasValue<T>(p: Provenance<T>): p is SourceBacked<T> | Convention<T> {
  return p.kind !== 'unknown';
}

/**
 * The only sanctioned way to pull a plain value out of a `Provenance<T>`. There is deliberately
 * no branch that invents a value for `unknown` — callers who need *something* to render must
 * supply `unknownFallback` explicitly at the call site, so the fallback is always visible in the
 * code that requested it rather than buried in this helper. materials.ts never calls this for
 * colour data; it is meant for geometry-only numbers where a placeholder is sanctioned (see
 * CubeGeometry.ts's module comment on why placeholder geometry is acceptable but placeholder
 * colour is not).
 */
export function resolveValue<T, F>(p: Provenance<T>, unknownFallback: F): T | F {
  return hasValue(p) ? p.value : unknownFallback;
}

/** Human-readable label for a UI badge / evidence-drawer chip next to a rendered value. */
export function provenanceLabel(p: Provenance<unknown>): string {
  switch (p.kind) {
    case 'source-backed':
      return p.confidence ? `sourced (${p.confidence})` : 'sourced';
    case 'convention':
      return 'museum convention — not sourced';
    case 'unknown':
      if (p.reason === 'researched_not_found') return 'researched, not found';
      if (p.reason === 'blocked') return 'source blocked';
      return 'not researched';
  }
}
