// The provenance contract, enforced.
//
// These tests exist because the adapter's job is not to transform data — it is
// to refuse to overstate it. Every case below is a way the adapter could
// quietly turn "not researched" into "historically known".
//
// Run: node --test src/data/*.test.ts   (node strips the types)

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import {
  attestedValue, citedSourceIds, sourceTier, buildEvidenceTrail,
  standardFaceColorConvention, STANDARD_FACE_COLOR_CONVENTION_ID,
  KIND_TIER_DEFAULTS, resolvedSpecValue, adaptVariant, classifyMakerDepth,
  type RawSource, type RawVariant, type RawModel,
} from './adapter.ts';
import { isSourceBacked, isConvention, isUnknown, FACES } from './types.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..', '..', '..');
const BUNDLE = join(REPO, 'dist', 'preview');

// ---------------------------------------------------------------- no fabrication

test('a field with no attestation is never source-backed', () => {
  const v = attestedValue(undefined, '/name', 'GAN');
  assert.equal(v.basis, 'unknown');
  assert.equal(isUnknown(v) && v.searched, false);
});

test('an unattested but populated field keeps its content without claiming evidence', () => {
  const v = attestedValue({}, '/colorway/scheme', 'bright');
  assert.ok(isUnknown(v));
  assert.equal(v.searched, false);
  assert.equal(v.unattestedValue, 'bright');
  assert.equal('confidence' in v, false, 'an unknown value must not carry a confidence');
  assert.equal('sourceIds' in v, false, 'an unknown value must not carry sources');
});

test('searched-and-not-found is distinguished from never-searched', () => {
  const searched = attestedValue({ '/x': { confidence: 'unknown', sources: ['s1'] } }, '/x', undefined);
  const never = attestedValue({}, '/x', undefined);
  assert.ok(isUnknown(searched) && searched.searched === true);
  assert.ok(isUnknown(never) && never.searched === false);
  assert.notDeepEqual(searched, never, 'the two must not collapse into one value');
});

// ---------------------------------------------------------------- confidence

test('confidence is passed through and never raised', () => {
  for (const c of ['confirmed', 'probable', 'reported', 'uncertain'] as const) {
    const v = attestedValue({ '/x': { confidence: c, sources: ['s'] } }, '/x', 1);
    assert.ok(isSourceBacked(v));
    assert.equal(v.confidence, c);
  }
});

test('an attestation with no confidence is not promoted', () => {
  const v = attestedValue({ '/x': { sources: ['s'] } }, '/x', 1);
  assert.ok(isSourceBacked(v));
  assert.equal(v.confidence, 'uncertain');
  assert.notEqual(v.confidence, 'confirmed');
});

test('disputed alternatives are preserved, not resolved to a winner', () => {
  const v = attestedValue({
    '/x': {
      confidence: 'disputed', sources: ['a'],
      disputed: [
        { value: 55.5, confidence: 'reported', sources: ['b'], note: 'retailer' },
        { value: 56, confidence: 'reported', sources: ['c'] },
      ],
      adjudication: 'Not adjudicated.',
    },
  }, '/x', 55.5);
  assert.ok(isSourceBacked(v));
  assert.equal(v.confidence, 'disputed');
  assert.equal(v.disputed?.length, 2);
  assert.equal(v.adjudication, 'Not adjudicated.');
});

test('citedSourceIds reads both halves, including sources cited only in a dispute', () => {
  const ids = citedSourceIds({ sources: ['a'], disputed: [{ sources: ['b', 'c'] }] });
  assert.deepEqual(ids, ['a', 'b', 'c']);
});

// ---------------------------------------------------------------- conventions

test('a convention always carries a conventionId and can never claim evidence', () => {
  const scheme = standardFaceColorConvention();
  for (const face of FACES) {
    const v = scheme[face];
    assert.ok(isConvention(v));
    assert.equal(v.conventionId, STANDARD_FACE_COLOR_CONVENTION_ID);
    assert.equal('confidence' in v, false);
    assert.equal('sourceIds' in v, false);
  }
});

test('the conventionId resolves to a real entry in the published registry', { skip: !existsSync(join(BUNDLE, 'convention.json')) }, () => {
  const registry = JSON.parse(readFileSync(join(BUNDLE, 'convention.json'), 'utf8')) as { id: string }[];
  const ids = registry.map((c) => c.id);
  assert.ok(ids.includes(STANDARD_FACE_COLOR_CONVENTION_ID),
    `${STANDARD_FACE_COLOR_CONVENTION_ID} is not in the registry: ${ids.join(', ')}`);
});

// ---------------------------------------------------------------- tiers

test('an explicit per-source tier beats its kind default', () => {
  // The real control from the archive: a wiki (default 4) declaring tier 3.
  const s: RawSource = { id: 'speedsolving-wiki-moyu', entity: 'source', kind: 'wiki', tier: 3 };
  assert.equal(sourceTier(s), 3);
  assert.equal(sourceTier({ id: 'x', entity: 'source', kind: 'wiki' }), 4);
});

test('an unknown kind falls to the weakest tier, never the strongest', () => {
  assert.equal(sourceTier({ id: 'x', entity: 'source', kind: 'not-a-kind' }), 5);
  assert.equal(sourceTier(undefined), 5);
});

test('the mirrored kind tiers still match vocab/source-kinds.yml', () => {
  const yml = readFileSync(join(REPO, 'vocab', 'source-kinds.yml'), 'utf8');
  const actual: Record<string, number> = {};
  let current: string | null = null;
  for (const line of yml.split('\n')) {
    const v = /^\s*-\s*value:\s*(\S+)/.exec(line);
    if (v && v[1]) { current = v[1]; continue; }
    const t = /^\s*tier:\s*(\d+)/.exec(line);
    if (t && t[1] && current) { actual[current] = Number(t[1]); current = null; }
  }
  assert.deepEqual(KIND_TIER_DEFAULTS, actual,
    'the adapter mirrors the vocabulary; they have drifted apart');
});

test('a cited source missing from the bundle is reported, not dropped or thrown over', () => {
  const trail = buildEvidenceTrail(['ghost'], new Map());
  assert.equal(trail.length, 1);
  assert.equal(trail[0]?.missing, true);
});

// ---------------------------------------------------------------- inheritance

test('an inherited spec reads its evidence from the model, not the variant', () => {
  const model: RawModel = {
    id: 'm', entity: 'model', manufacturer_id: 'mf', family_id: 'f', status: 'stub',
    attestations: { '/specs/size_mm': { confidence: 'confirmed', sources: ['official'] } },
  };
  const variant: RawVariant = {
    id: 'v', entity: 'variant', model_id: 'm', status: 'stub',
    attestations: { '/config/size_mm': { confidence: 'reported', sources: ['retailer'] } },
  };
  const inherited = resolvedSpecValue('size_mm', { value: 56, from: 'model' }, variant, model);
  assert.equal(inherited?.from, 'model');
  assert.ok(inherited && isSourceBacked(inherited.value));
  assert.equal(isSourceBacked(inherited!.value) && inherited!.value.confidence, 'confirmed');

  const own = resolvedSpecValue('size_mm', { value: 55, from: 'variant' }, variant, model);
  assert.equal(isSourceBacked(own!.value) && own!.value.confidence, 'reported');
});

// ---------------------------------------------------------------- curatorial layer

test('curatorial framing is not a Value and carries no basis', () => {
  const f = classifyMakerDepth(40);
  assert.equal(f.curatorial, true);
  assert.equal('basis' in f, false);
  assert.equal('confidence' in f, false);
  assert.equal('sourceIds' in f, false);
});

// ---------------------------------------------------------------- against the real bundle

test('every variant in the real bundle emits six faces, none of them source-backed',
  { skip: !existsSync(join(BUNDLE, 'variant.json')) }, () => {
  const variants = JSON.parse(readFileSync(join(BUNDLE, 'variant.json'), 'utf8')) as RawVariant[];
  assert.ok(variants.length > 0);
  let sourceBackedFaces = 0;
  let renderable = 0;
  for (const raw of variants) {
    const view = adaptVariant(raw, {});
    assert.equal(view.colorway.faces.length, 6,
      `${raw.id} must emit all six faces so none can be silently omitted`);
    for (const f of view.colorway.faces) {
      if (isSourceBacked(f.color)) sourceBackedFaces += 1;
      assert.notEqual(f.color.basis, 'convention',
        'the adapter must never apply a rendering convention on its own');
    }
    if (view.render.renderable) renderable += 1;
  }
  // The archive documents a face colour on zero variants. If this ever fails,
  // either real colourway research landed (update the figure) or the adapter
  // started inventing evidence.
  assert.equal(sourceBackedFaces, 0,
    `${sourceBackedFaces} face colours claimed evidence; the archive documents none`);
  assert.equal(renderable, 0, 'no variant is renderable from archival data alone');
});
