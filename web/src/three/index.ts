/**
 * index.ts — public barrel for `web/src/three`. See README.md for the architecture and how a
 * page composes these modules.
 */

export * from './provenance.js';
export * from './types.js';
export * from './CubeGeometry.js';
export * from './materials.js';
export * from './SceneRig.js';
export * from './CameraStates.js';

import { assembleCube, geometryInputsFromSpec, type AssembleCubeResult } from './CubeGeometry.js';
import { resolveCubieMaterials } from './materials.js';
import type { CubeVisualSpec } from './types.js';

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
