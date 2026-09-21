// Bridging the two raw-record shapes.
//
// web/src/data/adapter.ts types the bundle's vocabulary fields as `string`,
// deliberately permissive so the adapter never assumes a field is well-formed.
// web/src/three/types.ts types the same fields as narrow unions, deliberately
// strict so the renderer cannot be handed a coating it has no material for.
//
// Both are right for their own job, and neither is assignable to the other. The
// pages used to bridge that with `as never`, which suppressed a real compiler
// error and would have let an unrecognised vocabulary value reach the renderer
// untouched. This narrows at the boundary instead, and an unrecognised value
// becomes `unknown` — which is the honest reading: a coating the renderer does
// not recognise is not a coating it can claim to be showing.

import type { RawVariant, RawModel } from '../data/adapter.ts';
import type { ArchiveVariant, ArchiveModel, FaceNotation } from '../three/types.ts';

const oneOf = <T extends string>(allowed: readonly T[], v: unknown): T | undefined =>
  typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : undefined;

const COATINGS = ['none', 'frosted', 'uv', 'matte', 'aftermarket', 'other', 'unknown'] as const;
const APPLICATIONS = ['stickerless', 'stickered', 'hybrid', 'printed', 'inlaid', 'unknown'] as const;
const TRANSLUCENCIES = ['opaque', 'translucent', 'transparent', 'frosted_translucent', 'unknown'] as const;
const FINISHES = ['matte', 'glossy', 'frosted', 'uv_coated', 'textured', 'soft_touch', 'unknown'] as const;
const PLACEMENTS = ['center_U', 'center_multiple', 'corner', 'internal', 'none', 'unknown'] as const;
const FACES = ['U', 'D', 'F', 'B', 'L', 'R'] as const;

/** Narrowed to what the renderer can actually represent. Unrecognised values are
 *  dropped rather than passed through, so they surface as unknown. */
export function toArchiveVariant(raw: RawVariant): ArchiveVariant {
  const cw = raw.colorway;
  const size = raw.resolved_specs?.['size_mm'];
  const coating = oneOf(COATINGS, raw.config?.['coating']);
  const sizeMm = typeof raw.config?.['size_mm'] === 'number' ? raw.config['size_mm'] : undefined;

  return {
    id: raw.id,
    model_id: raw.model_id,
    ...((coating !== undefined || sizeMm !== undefined) && {
      config: {
        ...(coating !== undefined && { coating }),
        ...(sizeMm !== undefined && { size_mm: sizeMm }),
      },
    }),
    ...(cw && {
      colorway: {
        ...(oneOf(APPLICATIONS, cw.application) !== undefined && {
          application: oneOf(APPLICATIONS, cw.application)!,
        }),
        ...(cw.body && {
          body: {
            ...(cw.body.plastic_color_name !== undefined && { plastic_color_name: cw.body.plastic_color_name }),
            ...(oneOf(TRANSLUCENCIES, cw.body.translucency) !== undefined && {
              translucency: oneOf(TRANSLUCENCIES, cw.body.translucency)!,
            }),
            ...(oneOf(FINISHES, cw.body.finish) !== undefined && {
              finish: oneOf(FINISHES, cw.body.finish)!,
            }),
          },
        }),
        ...(cw.faces && {
          // A face outside standard notation is dropped: the renderer has no
          // surface to put it on, and inventing one would be a guess.
          faces: cw.faces
            .filter((f) => oneOf(FACES, f.face) !== undefined)
            .map((f) => ({
              face: f.face as FaceNotation,
              ...(f.color_name !== undefined && { color_name: f.color_name }),
              ...(f.color_normalized !== undefined && { color_normalized: f.color_normalized }),
            })),
        }),
        ...(cw.logo && oneOf(PLACEMENTS, cw.logo.placement) !== undefined && {
          logo: { placement: oneOf(PLACEMENTS, cw.logo.placement)! },
        }),
      },
    }),
    ...(size && typeof size.value === 'number' && {
      resolved_specs: { size_mm: { value: size.value, from: size.from } },
    }),
    ...(raw.attestations && { attestations: raw.attestations }),
  } as ArchiveVariant;
}

export function toArchiveModel(raw: RawModel | null | undefined): ArchiveModel | undefined {
  if (!raw) return undefined;
  const coating = oneOf(COATINGS, raw.specs?.['coating']);
  return { id: raw.id, ...(coating !== undefined && { specs: { coating } }) };
}
