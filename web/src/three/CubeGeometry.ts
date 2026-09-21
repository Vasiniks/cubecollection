/**
 * CubeGeometry.ts
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
// three.js ships RoundedBoxGeometry as an "example" module rather than a core export; it is
// still a normal, typed part of the `three` npm package (see web/package.json's pinned version).
// COULD NOT VERIFY IN A BROWSER: this import path and RoundedBoxGeometry's constructor signature
// are asserted from three.js's documented/historical behaviour, not a running build.
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { DEFAULT_BEVEL, DEFAULT_SIZE_MM } from './types.ts';
import type { ColorwayApplication, CubeVisualSpec, FaceNotation, PieceClass } from './types.ts';
import { type ProvenanceKind, resolveValue } from './provenance.ts';

/**
 * A cube's cubie bevel/gap treatment. Defined here, not types.ts, because it is a pure geometry
 * concept: how rounded a cubie's corners are and how much air sits between adjacent cubies.
 * types.ts imports this type to give `CubeVisualSpec.bevel` a `Provenance<BevelTreatment>`.
 */
export interface BevelTreatment {
  /** Corner/edge rounding radius, as a fraction of one cubie's edge length. 0 disables rounding
   *  entirely (a plain box) — see `buildCubieGeometry`. */
  readonly radiusRatio: number;
  /** Bevel tessellation. Higher looks smoother but adds triangles to a shape repeated 26 times
   *  per cube (and once per distinct size/bevel combination in the shared-geometry cache — see
   *  `acquireSharedCubieGeometry` — so this cost is not paid per cube, only per distinct
   *  combination). 0 or fewer also disables rounding. */
  readonly segments: number;
  /** Gap between adjacent cubies, as a fraction of the whole cube's `size_mm`. */
  readonly gapRatio: number;
}

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
  const axis = [-1, 0, 1] as const;
  const layout: CubieLayout[] = [];
  for (const gx of axis) {
    for (const gy of axis) {
      for (const gz of axis) {
        if (gx === 0 && gy === 0 && gz === 0) continue; // the hidden core cubie — never built
        const exposedFaces: FaceNotation[] = [];
        if (gx === 1) exposedFaces.push('R');
        if (gx === -1) exposedFaces.push('L');
        if (gy === 1) exposedFaces.push('U');
        if (gy === -1) exposedFaces.push('D');
        if (gz === 1) exposedFaces.push('F');
        if (gz === -1) exposedFaces.push('B');
        const pieceClass: PieceClass =
          exposedFaces.length === 3 ? 'corner' : exposedFaces.length === 2 ? 'edge' : 'centre';
        layout.push({
          id: `${pieceClass}-${exposedFaces.join('')}`,
          pieceClass,
          grid: [gx, gy, gz],
          exposedFaces,
        });
      }
    }
  }
  return layout; // 8 corners + 12 edges + 6 centres = 26
}

/**
 * All 26 cubies of a real cube are, externally, the same small rounded box: corner, edge and
 * centre pieces differ only in how many of their six faces are ever seen (CubieLayout's
 * `exposedFaces`), not in their outer shape — the internal mechanism that actually distinguishes
 * them is exactly the kind of fact this archive has no source for (0 geometry-profile records
 * exist). So a single geometry, not three, is built and shared here; this is deliberately a
 * stronger claim than the lane brief's "one instanced/shared geometry where possible" — it is
 * one shared geometry, period, per distinct size/bevel combination.
 */
function buildCubieGeometry(sizeMm: number, bevel: BevelTreatment): THREE.BufferGeometry {
  const gapRatio = Math.max(0, bevel.gapRatio);
  const cubieEdge = (sizeMm / 3) * (1 - gapRatio);
  const radiusRatio = Math.max(0, Math.min(0.49, bevel.radiusRatio));
  const radius = radiusRatio * cubieEdge;
  if (radius <= 0 || bevel.segments <= 0) {
    return new THREE.BoxGeometry(cubieEdge, cubieEdge, cubieEdge);
  }
  return new RoundedBoxGeometry(cubieEdge, cubieEdge, cubieEdge, Math.floor(bevel.segments), radius);
}

function geometryCacheKey(sizeMm: number, bevel: BevelTreatment): string {
  return `${sizeMm}|${bevel.radiusRatio}|${bevel.segments}|${bevel.gapRatio}`;
}

interface GeometryCacheEntry {
  readonly geometry: THREE.BufferGeometry;
  refCount: number;
}

const geometryCache = new Map<string, GeometryCacheEntry>();

/**
 * Returns the single `BufferGeometry` shared by every cubie of a given size/bevel combination,
 * incrementing an internal reference count. All 26 cubies of one cube — and every other cube in
 * the exhibition built with the same `sizeMm`/`bevel` — share this exact geometry object; only
 * position and material differ per instance. Pair with `releaseSharedCubieGeometry` on teardown.
 */
export function acquireSharedCubieGeometry(sizeMm: number, bevel: BevelTreatment): THREE.BufferGeometry {
  const key = geometryCacheKey(sizeMm, bevel);
  let entry = geometryCache.get(key);
  if (!entry) {
    entry = { geometry: buildCubieGeometry(sizeMm, bevel), refCount: 0 };
    geometryCache.set(key, entry);
  }
  entry.refCount += 1;
  return entry.geometry;
}

/** Decrements the reference count for the geometry acquired with the same `sizeMm`/`bevel`,
 *  disposing the underlying GPU buffer once nothing else is using it. */
export function releaseSharedCubieGeometry(sizeMm: number, bevel: BevelTreatment): void {
  const key = geometryCacheKey(sizeMm, bevel);
  const entry = geometryCache.get(key);
  if (!entry) return;
  entry.refCount -= 1;
  if (entry.refCount <= 0) {
    entry.geometry.dispose();
    geometryCache.delete(key);
  }
}

/** Test/teardown escape hatch: disposes every cached geometry regardless of reference count. */
export function disposeAllSharedCubieGeometries(): void {
  for (const entry of geometryCache.values()) entry.geometry.dispose();
  geometryCache.clear();
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
  const layout = layoutCube();
  const geometry = acquireSharedCubieGeometry(sizeMm, bevel);
  const group = new THREE.Group();
  group.name = 'cube';

  const spacing = sizeMm / 3;
  for (const cubie of layout) {
    const material = options.materialResolver(cubie);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = cubie.id;
    mesh.position.set(cubie.grid[0] * spacing, cubie.grid[1] * spacing, cubie.grid[2] * spacing);
    mesh.userData.cubie = cubie;
    group.add(mesh);
  }

  let disposed = false;
  return {
    group,
    layout,
    dispose() {
      if (disposed) return;
      disposed = true;
      group.clear();
      // Geometry is reference-counted and may still be in use by other cubes built with the
      // same sizeMm/bevel; release this cube's claim rather than disposing it outright.
      releaseSharedCubieGeometry(sizeMm, bevel);
      // Materials are NOT disposed here — see AssembleCubeResult.dispose()'s doc comment.
    },
  };
}

export interface GeometryInputs {
  readonly sizeMm: number;
  readonly sizeMmProvenanceKind: ProvenanceKind;
  readonly bevel: BevelTreatment;
  readonly bevelProvenanceKind: ProvenanceKind;
  readonly application: ColorwayApplication;
}

/**
 * Unwraps the geometry-relevant fields of a `CubeVisualSpec` into plain numbers/values, applying
 * the sanctioned geometry placeholders (`DEFAULT_SIZE_MM`, `DEFAULT_BEVEL`) where the archive is
 * silent. The `*ProvenanceKind` fields are carried through so a caller that wants to badge an
 * "estimated size" cube differently from a measured one still can, without this function itself
 * making that UI decision.
 */
export function geometryInputsFromSpec(spec: CubeVisualSpec): GeometryInputs {
  const sizeMm = resolveValue(spec.sizeMm, DEFAULT_SIZE_MM);
  const bevel = resolveValue(spec.bevel, DEFAULT_BEVEL);
  const application = resolveValue(spec.application, 'unknown' as ColorwayApplication);
  return {
    sizeMm,
    sizeMmProvenanceKind: spec.sizeMm.kind,
    bevel,
    bevelProvenanceKind: spec.bevel.kind,
    application,
  };
}
