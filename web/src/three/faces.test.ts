// A documented face must never be overwritten by a convention.
//
// Found by adversarial review: resolveCubeVisualSpec applied the standard scheme
// whenever a face had no renderable hex — including when the archive DID record
// a colour name for it. The cube then showed a convention colour under a
// disclosure reading "The archive does not document this cube's colours", which
// is false for that face. That is precisely the failure the convention layer
// exists to prevent, arriving through the renderer instead of through the data.

import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveCubeVisualSpec, type ArchiveVariant } from './types.ts';
import { isConvention, isUnknown, isSourceBacked } from './provenance.ts';

const variantWith = (faces: { face: string; color_name?: string; color_normalized?: string }[]): ArchiveVariant =>
  ({ id: 'v', model_id: 'm', colorway: { faces } }) as unknown as ArchiveVariant;

test('a face with a renderable hex is source-backed, never convention', () => {
  const spec = resolveCubeVisualSpec(
    variantWith([{ face: 'U', color_name: 'white', color_normalized: '#FFFFFF' }]),
    undefined, { applyStandardFaceScheme: true });
  assert.ok(isSourceBacked(spec.faces.U));
});

test('a face the archive named but did not normalise is NOT given a convention colour', () => {
  const spec = resolveCubeVisualSpec(
    variantWith([{ face: 'U', color_name: 'midnight purple' }]),
    undefined, { applyStandardFaceScheme: true });
  assert.equal(isConvention(spec.faces.U), false,
    'the archive documented this face; a convention must not overwrite it');
  assert.ok(isUnknown(spec.faces.U), 'it is unknown-to-the-renderer, not unknown-to-the-archive');
  assert.equal(isUnknown(spec.faces.U) && spec.faces.U.reason, 'researched_not_found');
});

test('a face the archive says nothing about still takes the convention', () => {
  const spec = resolveCubeVisualSpec(
    variantWith([{ face: 'U', color_name: 'midnight purple' }]),
    undefined, { applyStandardFaceScheme: true });
  assert.ok(isConvention(spec.faces.D), 'D is undocumented and should take the scheme');
});
