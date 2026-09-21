/**
 * materials.ts
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
import { type Provenance, hasValue, isConvention, isUnknown, sourceBacked, unknown } from './provenance.js';
import { FACE_GROUP_ORDER, type CubieLayout } from './CubeGeometry.js';
import type {
  Coating,
  ColorwayTranslucency,
  CubeVisualSpec,
  FaceColorSpec,
  HexColor,
} from './types.js';

// ================================================================== the unknown placeholder

let unknownTexture: THREE.Texture | undefined;

/**
 * A diagonal hatch pattern on a small canvas, tiled across a face. Deliberately not a colour
 * that could be mistaken for a documented cube: no plastic on any real speedcube looks like
 * grey/charcoal hazard hatching. Guarded for non-browser environments (e.g. this module imported
 * under Node for a type-check) — falls back to `undefined`, and callers use a flat colour then.
 */
function getUnknownTexture(): THREE.Texture | undefined {
  if (unknownTexture) return unknownTexture;
  if (typeof document === 'undefined') return undefined;
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;
  ctx.fillStyle = '#9a9a9a';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = '#5b5b5b';
  ctx.lineWidth = size / 8;
  // Diagonal stripes, drawn wide enough either side of the canvas to tile seamlessly.
  for (let offset = -size; offset < size * 2; offset += size / 4) {
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset + size, size);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  unknownTexture = texture;
  return texture;
}

let unknownMaterial: THREE.Material | undefined;

/**
 * The unmistakable "we don't know" placeholder: a neutral grey/charcoal diagonal hatch,
 * deliberately styled after the "no data" hatching convention used on maps and technical
 * drawings — on-brand for an archive whose defining trait is refusing to guess. Generated
 * procedurally so this module needs no image asset (the archive has 0 media records). Cached as
 * a single shared instance: every unknown face or body in the entire exhibition uses this exact
 * material.
 */
export function createUnknownMaterial(): THREE.Material {
  if (unknownMaterial) return unknownMaterial;
  const map = getUnknownTexture();
  unknownMaterial = new THREE.MeshStandardMaterial({
    color: map ? 0xffffff : 0x8a8a8a,
    roughness: 0.9,
    metalness: 0,
    // `map` is only set when a texture was actually produced. Passing an
    // explicit undefined is rejected under exactOptionalPropertyTypes, and the
    // flat colour above is the correct fallback anyway.
    ...(map ? { map } : {}),
  });
  unknownMaterial.userData.provenance = 'unknown';
  return unknownMaterial;
}

// ================================================================== source-backed / convention

export interface ColorMaterialOptions {
  /**
   * When true, `source-backed` and `convention` materials additionally carry a faint, toggleable
   * visual tint distinguishing the two (default off — a convention cube should look plausible by
   * default per §10.4(a); this is for a future curatorial "show me what's sourced" view).
   */
  readonly provenanceTint?: boolean;
}

/** vocab/coatings.yml -> physically-based surface parameters. Judgement calls, not archive
 *  claims: the archive records which coating word applies, never a measured roughness. */
function coatingToPhysicalParams(coating: Coating): { roughness: number; clearcoat: number; sheen: number } {
  switch (coating) {
    case 'uv':
      return { roughness: 0.22, clearcoat: 0.6, sheen: 0 };
    case 'frosted':
      return { roughness: 0.75, clearcoat: 0, sheen: 0.15 };
    case 'matte':
      return { roughness: 0.85, clearcoat: 0, sheen: 0 };
    case 'aftermarket':
      return { roughness: 0.4, clearcoat: 0.3, sheen: 0 };
    case 'none':
    case 'other':
    case 'unknown':
    default:
      return { roughness: 0.55, clearcoat: 0, sheen: 0 };
  }
}

/** vocab/colorway-translucency.yml -> physically-based transmission/opacity parameters. */
function translucencyToPhysicalParams(
  translucency: ColorwayTranslucency,
): { transmission: number; opacity: number; transparent: boolean } {
  switch (translucency) {
    case 'transparent':
      return { transmission: 0.9, opacity: 1, transparent: false };
    case 'translucent':
    case 'frosted_translucent':
      return { transmission: 0.5, opacity: 1, transparent: false };
    case 'opaque':
    case 'unknown':
    default:
      return { transmission: 0, opacity: 1, transparent: false };
  }
}

const materialCache = new Map<string, THREE.Material>();

function cacheKey(...parts: readonly (string | number)[]): string {
  return parts.join('|');
}

/**
 * Builds (or reuses, from cache) a coloured `MeshPhysicalMaterial` for a known hex colour. Never
 * called directly with an `unknown` colour — see `resolveColorMaterial`, the only caller this
 * module expects. `provenanceKind` is tagged onto `material.userData.provenance` so a UI layer
 * (or a future debug view) can distinguish a sourced colour from a museum convention without
 * re-deriving it from the original `CubeVisualSpec`.
 */
function createColoredMaterial(
  hex: HexColor,
  coating: Coating,
  translucency: ColorwayTranslucency,
  provenanceKind: 'source-backed' | 'convention',
  provenanceTint: boolean,
): THREE.Material {
  const key = cacheKey('color', hex, coating, translucency, provenanceKind, provenanceTint ? 'tint' : 'plain');
  const cached = materialCache.get(key);
  if (cached) return cached;

  const { roughness, clearcoat, sheen } = coatingToPhysicalParams(coating);
  const { transmission, opacity, transparent } = translucencyToPhysicalParams(translucency);
  const color = new THREE.Color(hex);
  // A convention colour is deliberately NOT recoloured — §10.4(a) wants it to look like a
  // plausible, ordinary cube. The tint is a faint emissive nudge, visible only when explicitly
  // requested, never part of the default gallery view.
  const emissive =
    provenanceTint && provenanceKind === 'convention' ? new THREE.Color(0x2a2a55) : new THREE.Color(0x000000);
  const emissiveIntensity = provenanceTint && provenanceKind === 'convention' ? 0.12 : 0;

  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness,
    clearcoat,
    clearcoatRoughness: 0.15,
    sheen,
    sheenColor: color,
    transmission,
    opacity,
    transparent,
    emissive,
    emissiveIntensity,
  });
  material.userData.provenance = provenanceKind;
  materialCache.set(key, material);
  return material;
}

/**
 * The sole function that may turn a `Provenance<HexColor>` into a real, coloured
 * `THREE.Material`. See this file's header: the `unknown` branch is unconditional and cannot be
 * bypassed by supplying a colour, because `Unknown` has no colour to supply — this is an `if`
 * that the type checker, not just this function's author, requires to come first.
 */
export function resolveColorMaterial(
  colorProvenance: Provenance<HexColor>,
  coatingProvenance: Provenance<Coating>,
  translucencyProvenance: Provenance<ColorwayTranslucency>,
  options: ColorMaterialOptions = {},
): THREE.Material {
  if (isUnknown(colorProvenance)) return createUnknownMaterial();
  const coating = hasValue(coatingProvenance) ? coatingProvenance.value : 'unknown';
  const translucency = hasValue(translucencyProvenance) ? translucencyProvenance.value : 'unknown';
  return createColoredMaterial(
    colorProvenance.value,
    coating,
    translucency,
    colorProvenance.kind,
    options.provenanceTint ?? false,
  );
}

/** Narrows a `Provenance<FaceColorSpec>` down to the `Provenance<HexColor>` `resolveColorMaterial`
 *  needs, preserving `kind`/`rationale`/`confidence` rather than collapsing them. A face record
 *  that names a colour without a normalised hex (`colorName` set, `colorHex` unset) still cannot
 *  be rendered, so it is treated as `unknown` — with `researched_not_found` rather than
 *  `not_researched`, since the archive did say something, just not something renderable. */
function faceColorProvenance(face: Provenance<FaceColorSpec>): Provenance<HexColor> {
  if (isUnknown(face)) return face;
  if (!face.value.colorHex) {
    return unknown(face.value.colorName ? 'researched_not_found' : 'not_researched');
  }
  if (isConvention(face)) return { kind: 'convention', value: face.value.colorHex, rationale: face.rationale };
  return sourceBacked(face.value.colorHex, {
    confidence: face.confidence,
    sourceIds: face.sourceIds,
    from: face.from,
  });
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
  options: ColorMaterialOptions = {},
): THREE.Material[] {
  const bodyMaterial = resolveColorMaterial(spec.body.colorHex, spec.coating, spec.body.translucency, options);
  return FACE_GROUP_ORDER.map((face) => {
    if (!cubie.exposedFaces.includes(face)) return bodyMaterial;
    const faceColor = faceColorProvenance(spec.faces[face]);
    return resolveColorMaterial(faceColor, spec.coating, spec.body.translucency, options);
  });
}

/**
 * Frees every cached `THREE.Material` (and the unknown-placeholder texture) this module has
 * created. Call on full exhibition teardown, never per-cube — materials here are shared by
 * colour/coating/translucency/provenance tuple across every cube that uses that exact
 * combination, and `CubeGeometry.assembleCube`'s own `dispose()` deliberately never touches them.
 */
export function disposeMaterialCache(): void {
  for (const material of materialCache.values()) material.dispose();
  materialCache.clear();
  if (unknownMaterial) {
    unknownMaterial.dispose();
    unknownMaterial = undefined;
  }
  if (unknownTexture) {
    unknownTexture.dispose();
    unknownTexture = undefined;
  }
}

export type { FaceColorSpec };
