/**
 * materials.ts — SKELETON. Signatures and types are final; bodies are being implemented in a
 * follow-up commit (see the lane's "commit a skeleton first" instruction).
 *
 * Material definitions for the coatings and body treatments the archive actually records
 * (vocab/coatings.yml, vocab/colorway-translucency.yml, vocab/colorway-finish.yml), plus one
 * more, clearly separated, family used when the archive documents nothing.
 *
 * THIS IS THE ENFORCEMENT POINT. `resolveColorMaterial()` is the only function in this module
 * that turns a `Provenance<HexColor>` into a `THREE.Material`, and its `unknown` branch is
 * reached by a type guard, not a value check — the `Unknown` variant of `Provenance<T>` has no
 * `.value` field at all (provenance.ts), so there is no colour to read even if this function's
 * body were buggy. A rendered cube whose colourway is `unknown` renders the hatch placeholder
 * below, structurally, not by convention.
 *
 * `convention` values (e.g. the §10.4(a) standard scheme) render with the SAME physical material
 * family as `source-backed` values — EXHIBITION_ARCHITECTURE §10.4(a) wants a convention cube to
 * look like a normal, plausible cube, with the "this is a convention, not evidence" fact carried
 * in `material.userData.provenance` for a UI layer (or this module's optional provenance-tint
 * mode) to surface, not in the object's base colour itself.
 *
 * COULD NOT VERIFY IN A BROWSER: `MeshPhysicalMaterial`'s `sheen`/`transmission` visual result,
 * and the canvas-generated hatch texture's appearance, are asserted from three.js's documented
 * behaviour, not from a running renderer.
 */

import * as THREE from 'three';
import { type Provenance, hasValue, isUnknown } from './provenance.js';
import type { CubieLayout } from './CubeGeometry.js';
import type {
  Coating,
  ColorwayTranslucency,
  CubeVisualSpec,
  FaceColorSpec,
  HexColor,
} from './types.js';

/**
 * The unmistakable "we don't know" placeholder: a neutral grey/charcoal diagonal hatch,
 * deliberately styled after the "no data" hatching convention used on maps and technical
 * drawings — on-brand for an archive whose defining trait is refusing to guess. Generated
 * procedurally so this module needs no image asset (the archive has 0 media records).
 */
export function createUnknownMaterial(): THREE.Material {
  throw new Error('materials.createUnknownMaterial: not yet implemented (skeleton commit)');
}

export interface ColorMaterialOptions {
  /**
   * When true, `source-backed` and `convention` materials additionally carry a faint, toggleable
   * visual tint distinguishing the two (default off — a convention cube should look plausible by
   * default per §10.4(a); this is for a future curatorial "show me what's sourced" view).
   */
  readonly provenanceTint?: boolean;
}

/**
 * The sole function that may turn a `Provenance<HexColor>` into a real, coloured
 * `THREE.Material`. See this file's header: the `unknown` branch is unconditional and cannot be
 * bypassed by supplying a colour, because `Unknown` has no colour to supply.
 */
export function resolveColorMaterial(
  colorProvenance: Provenance<HexColor>,
  coatingProvenance: Provenance<Coating>,
  translucencyProvenance: Provenance<ColorwayTranslucency>,
  options?: ColorMaterialOptions,
): THREE.Material {
  throw new Error('materials.resolveColorMaterial: not yet implemented (skeleton commit)');
}

/**
 * Builds the 6-entry material array (in CubeGeometry's `FACE_GROUP_ORDER`) for one cubie: its
 * exposed faces get their `spec.faces[...]` colour (or the unknown placeholder), and every
 * interior, never-seen face gets the plain body material. This is the function most pages will
 * pass as `assembleCube()`'s `materialResolver`.
 */
export function resolveCubieMaterials(
  cubie: CubieLayout,
  spec: CubeVisualSpec,
  options?: ColorMaterialOptions,
): THREE.Material[] {
  throw new Error('materials.resolveCubieMaterials: not yet implemented (skeleton commit)');
}

/**
 * Frees every cached `THREE.Material` this module has created. Call on full exhibition teardown,
 * never per-cube — materials here are shared by colour/coating/translucency/provenance tuple
 * across every cube that uses that exact combination.
 */
export function disposeMaterialCache(): void {
  throw new Error('materials.disposeMaterialCache: not yet implemented (skeleton commit)');
}

export type { FaceColorSpec };
