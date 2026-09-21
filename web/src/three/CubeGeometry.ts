/**
 * CubeGeometry.ts — SKELETON. Signatures and types are final; bodies are being implemented in a
 * follow-up commit (see the lane's "commit a skeleton first" instruction).
 *
 * A parametric 3x3x3 built from real parameters. 26 cubies (8 corner + 12 edge + 6 centre); the
 * 27th, always-hidden core cubie is never built at all, not built-and-hidden.
 *
 * SCOPE NOTE — why coating and body colour are not parameters here. The lane brief lists
 * `size_mm`, sticker vs. stickerless, coating, body plastic colour and a bevel/gap treatment
 * together as "real parameters" for the parametric cube. This module owns the ones that are
 * genuinely geometric (`size_mm`, the bevel/gap treatment, and — because a stickered cube's
 * sticker sits as a thin layer proud of the body in reality — `application`). Coating and body
 * colour are surface-appearance concerns with no distinct topology; they are handled by
 * materials.ts, which this module calls into only through the `materialResolver` callback passed
 * to `assembleCube()`. This keeps "material definitions" and "geometry" in the two separate files
 * the brief asks for, while the two compose into exactly the parametric cube described.
 *
 * HARD-CONSTRAINTS NOTE — geometry may use a placeholder; colour may not. "Placeholder GEOMETRY
 * is acceptable; placeholder HISTORY is not." `size_mm` is documented for only 50 of 511 public
 * variants (EXHIBITION_ARCHITECTURE §4.4), and there is no geometry-profile record anywhere in
 * the archive to source a bevel from. Both may fall back to a labelled `convention` value (see
 * types.ts's `DEFAULT_SIZE_MM` / `DEFAULT_BEVEL`), unlike colour, which materials.ts refuses to
 * default at all.
 *
 * COULD NOT VERIFY IN A BROWSER: `RoundedBoxGeometry`'s constructor signature and its material
 * group order are asserted from three.js's documented/historical behaviour, not from a running
 * build (this lane cannot run one — see the lane brief). Re-check both against the installed
 * `three` version before shipping.
 */

import * as THREE from 'three';
import type { BevelTreatment, CubeVisualSpec, FaceNotation, PieceClass } from './types.js';
import type { ProvenanceKind } from './provenance.js';

export type { BevelTreatment };

/** One of the 26 non-core cubies. */
export interface CubieLayout {
  /** e.g. "corner-URF" — stable, derived from piece class + exposed faces. */
  readonly id: string;
  readonly pieceClass: PieceClass;
  /** Each component is -1, 0 or 1. Exactly one of the three axes may repeat across cubies of
   *  the same class; (0,0,0) — the core — never appears in a returned layout. */
  readonly grid: readonly [number, number, number];
  /** 3 for a corner, 2 for an edge, 1 for a centre. Faces not listed are interior and are never
   *  seen; materials.ts still needs a material for them (BoxGeometry has 6 face groups
   *  regardless), but that material is always the plain body material. */
  readonly exposedFaces: readonly FaceNotation[];
}

/**
 * three.js `BoxGeometry`'s material-group order is px, nx, py, ny, pz, nz. Combined with this
 * module's axis convention (R=+X, L=-X, U=+Y, D=-Y, F=+Z, B=-Z — the same convention
 * vocab/face-notation.yml implies but does not itself encode in 3-space, since the archive is a
 * data schema, not a geometry engine), that gives this face order for a cubie's 6 material
 * slots. `RoundedBoxGeometry` is documented to preserve `BoxGeometry`'s group layout.
 */
export const FACE_GROUP_ORDER: readonly FaceNotation[] = ['R', 'L', 'U', 'D', 'F', 'B'];

/**
 * The 26 external cubies of a 3x3x3, positions only (no materials, no THREE objects). Pure and
 * deterministic — safe to call once and cache by the caller if desired, though it is cheap
 * enough that this module does not bother memoising it itself.
 */
export function layoutCube(): CubieLayout[] {
  throw new Error('CubeGeometry.layoutCube: not yet implemented (skeleton commit)');
}

/**
 * Returns the single `BufferGeometry` shared by every cubie of a given size/bevel combination,
 * incrementing an internal reference count. All 26 cubies of one cube — and every other cube in
 * the exhibition built with the same `sizeMm`/`bevel` — share this exact geometry object; only
 * position and material differ per instance. Pair with `releaseSharedCubieGeometry` on teardown.
 */
export function acquireSharedCubieGeometry(sizeMm: number, bevel: BevelTreatment): THREE.BufferGeometry {
  throw new Error('CubeGeometry.acquireSharedCubieGeometry: not yet implemented (skeleton commit)');
}

/** Decrements the reference count for the geometry acquired with the same `sizeMm`/`bevel`,
 *  disposing the underlying GPU buffer once nothing else is using it. */
export function releaseSharedCubieGeometry(sizeMm: number, bevel: BevelTreatment): void {
  throw new Error('CubeGeometry.releaseSharedCubieGeometry: not yet implemented (skeleton commit)');
}

/** Test/teardown escape hatch: disposes every cached geometry regardless of reference count. */
export function disposeAllSharedCubieGeometries(): void {
  throw new Error('CubeGeometry.disposeAllSharedCubieGeometries: not yet implemented (skeleton commit)');
}

export interface AssembleCubeOptions {
  /** Called once per cubie; must return exactly 6 materials (or 1, applied to all faces) in
   *  `FACE_GROUP_ORDER`. materials.ts's `resolveCubieMaterials` is the intended implementation. */
  readonly materialResolver: (cubie: CubieLayout) => THREE.Material | THREE.Material[];
}

export interface AssembleCubeResult {
  readonly group: THREE.Group;
  readonly layout: readonly CubieLayout[];
  /**
   * Releases this cube's claim on its shared geometry and empties the group. Does NOT dispose
   * any material: materials may be shared across many cubes (materials.ts's own cache), so their
   * lifecycle is materials.ts's responsibility via `disposeMaterialCache()`, never this module's.
   */
  dispose(): void;
}

/** Builds the positioned, materialed 26-cubie `THREE.Group` for one cube. */
export function assembleCube(
  sizeMm: number,
  bevel: BevelTreatment,
  options: AssembleCubeOptions,
): AssembleCubeResult {
  throw new Error('CubeGeometry.assembleCube: not yet implemented (skeleton commit)');
}

export interface GeometryInputs {
  readonly sizeMm: number;
  readonly sizeMmProvenanceKind: ProvenanceKind;
  readonly bevel: BevelTreatment;
  readonly bevelProvenanceKind: ProvenanceKind;
  readonly application: import('./types.js').ColorwayApplication;
}

/**
 * Unwraps the geometry-relevant fields of a `CubeVisualSpec` into plain numbers/values, applying
 * the sanctioned geometry placeholders (`DEFAULT_SIZE_MM`, `DEFAULT_BEVEL`) where the archive is
 * silent. The `*ProvenanceKind` fields are carried through so a caller that wants to badge an
 * "estimated size" cube differently from a measured one still can, without this function itself
 * making that UI decision.
 */
export function geometryInputsFromSpec(spec: CubeVisualSpec): GeometryInputs {
  throw new Error('CubeGeometry.geometryInputsFromSpec: not yet implemented (skeleton commit)');
}
