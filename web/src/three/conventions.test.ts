// The rendering values in code must match the registry that describes them.
//
// conventions/rendering-conventions.yml is the single source of truth, and its
// visitor_disclosure text is shown on screen beside the object. If the code
// draws a bevel or a fallback size the registry does not describe, the
// disclosure a visitor reads stops matching what they are looking at — which
// is a quieter version of exactly the failure the registry exists to prevent.
//
// This drift already happened once: the code carried radiusRatio 0.08 /
// gapRatio 0.01 against the registry's 0.055 / 0.012.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { DEFAULT_BEVEL, DEFAULT_SIZE_MM, STANDARD_SCHEME_HEX, FACE_NOTATIONS } from './types.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
const REGISTRY = join(HERE, '..', '..', '..', 'dist', 'preview', 'convention.json');

interface Conv { id: string; value: Record<string, unknown> }
const load = (): Conv[] => JSON.parse(readFileSync(REGISTRY, 'utf8')) as Conv[];
const byId = (id: string) => {
  const c = load().find((x) => x.id === id);
  assert.ok(c, `${id} missing from the published registry`);
  return c;
};

const skip = !existsSync(REGISTRY);

test('the generic geometry matches cv-geometry-generic-3x3', { skip }, () => {
  const v = byId('cv-geometry-generic-3x3').value;
  assert.equal(DEFAULT_BEVEL.radiusRatio, v['bevel_ratio']);
  assert.equal(DEFAULT_BEVEL.gapRatio, v['gap_ratio']);
});

test('the fallback size matches cv-size-56mm-fallback', { skip }, () => {
  assert.equal(DEFAULT_SIZE_MM, byId('cv-size-56mm-fallback').value['size_mm']);
});

test('the standard face scheme matches cv-face-colours-wca-standard', { skip }, () => {
  const v = byId('cv-face-colours-wca-standard').value as Record<string, { hex: string }>;
  for (const face of FACE_NOTATIONS) {
    const declared = v[face]?.hex?.toUpperCase();
    assert.equal(STANDARD_SCHEME_HEX[face].toUpperCase(), declared,
      `face ${face} differs between the code and the registry`);
  }
});
