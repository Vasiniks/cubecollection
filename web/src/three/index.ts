/**
 * index.ts — public barrel for `web/src/three`. See README.md for the architecture and how a
 * page composes these modules.
 */

export * from './provenance.ts';
export * from './types.ts';
export * from './CubeGeometry.ts';
export * from './materials.ts';
export * from './SceneRig.ts';
export * from './CameraStates.ts';

import { assembleCube, geometryInputsFromSpec, type AssembleCubeResult } from './CubeGeometry.ts';
import { resolveCubieMaterials } from './materials.ts';
import type { CubeVisualSpec } from './types.ts';

/**
 * The one-call convenience a page reaches for first: geometry + materials, composed, with
 * provenance already resolved into the exact colours/placeholders described by `spec`. Returns
 * the same shape as `CubeGeometry.assembleCube` — add `.group` to a `SceneRig.root`. Not
 * exported from CubeGeometry.ts or materials.ts themselves, precisely because it is the seam
 * between them and belongs to neither.
 */
export function buildExhibitCube(spec: CubeVisualSpec): AssembleCubeResult {
  const { sizeMm, bevel } = geometryInputsFromSpec(spec);
  return assembleCube(sizeMm, bevel, {
    materialResolver: (cubie) => resolveCubieMaterials(cubie, spec),
  });
}
