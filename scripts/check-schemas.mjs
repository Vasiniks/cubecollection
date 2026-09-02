#!/usr/bin/env node
// Schema and vocabulary self-consistency.
//
// The other checks validate records against schemas. Nothing validated the schemas, and with
// an empty archive a broken $ref or a typo'd annotation would sit undetected until the first
// record hit it. This checks the definitions themselves.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { ROOT, loadVocabularies, loadSchemas, SCHEMA_FOR_ENTITY, Report } from './lib/archive.mjs';

const report = new Report('schemas — definition self-consistency');
const KNOWN_ANNOTATIONS = new Set(['x-vocab', 'x-critical', 'x-private', 'x-derived', 'x-reserved']);
const META_2020 = 'https://json-schema.org/draft/2020-12/schema';

const vocabs = loadVocabularies();
const { raw, validators, usedVocabularies, schemaFiles } = loadSchemas(vocabs);
report.note(`${raw.size} schema(s), ${vocabs.size} vocabular(ies).`);

// 1 — every schema is itself a valid JSON Schema
const metaAjv = new Ajv({ strict: false, allErrors: true });
addFormats(metaAjv);
for (const [id, { file, schema }] of raw) {
  if (schema.$schema !== META_2020) report.error('meta', file, `$schema is "${schema.$schema}", expected draft 2020-12.`);
  if (!metaAjv.validateSchema(schema)) {
    for (const e of metaAjv.errors ?? []) report.error('meta', file, `${e.instancePath || '/'} ${e.message}`);
  }
  if (!schema.title) report.warn('meta', file, 'no title.');
  void id;
}

// 2 — every $ref resolves to a schema that exists
const refs = new Set();
(function collect(node, file) {
  if (Array.isArray(node)) return node.forEach((n) => collect(n, file));
  if (!node || typeof node !== 'object') return;
  if (typeof node.$ref === 'string') {
    refs.add(node.$ref);
    if (!raw.has(node.$ref)) report.error('ref', file, `unresolvable $ref "${node.$ref}".`);
  }
  for (const v of Object.values(node)) collect(v, file);
})([...raw.values()].map((r) => ({ ...r.schema, __file: r.file })), '(all)');
for (const { file, schema } of raw.values()) {
  (function walk(node) {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    if (typeof node.$ref === 'string' && !raw.has(node.$ref)) report.error('ref', file, `unresolvable $ref "${node.$ref}".`);
    for (const v of Object.values(node)) walk(v);
  })(schema);
}

// 3 — every custom annotation is one we actually enforce
for (const { file, schema } of raw.values()) {
  (function walk(node, path) {
    if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}/${i}`));
    if (!node || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith('x-') && !KNOWN_ANNOTATIONS.has(k)) {
        report.error('annotation', file, `${path}/${k} is not an enforced annotation. Known: ${[...KNOWN_ANNOTATIONS].join(', ')}.`);
      }
      if (k === 'x-vocab' && !vocabs.has(v)) report.error('annotation', file, `${path} references unknown vocabulary "${v}".`);
      if (['x-critical', 'x-private', 'x-derived', 'x-reserved'].includes(k) && v !== true) {
        report.error('annotation', file, `${path}/${k} is "${v}"; these annotations are only ever true.`);
      }
      walk(v, `${path}/${k}`);
    }
  })(schema, '');
}

// 4 — every entity has a schema and a compiled validator
for (const [entity, name] of Object.entries(SCHEMA_FOR_ENTITY)) {
  const id = `https://cubecollection/schema/${name}.schema.json`;
  if (!raw.has(id)) report.error('entity', 'schema/', `entity "${entity}" has no schema at ${name}.schema.json.`);
  if (!validators.get(entity)) report.error('entity', 'schema/', `entity "${entity}" has no compiled validator.`);
}

// 5 — every schema file is either an entity schema or reachable by $ref
for (const [id, { file }] of raw) {
  const isEntity = Object.values(SCHEMA_FOR_ENTITY).some((n) => id.endsWith(`/${n}.schema.json`));
  if (!isEntity && !refs.has(id)) report.warn('reach', file, 'defined but referenced by no schema.');
}

// 6 — every vocabulary is well-formed and used
for (const [id, vocab] of vocabs) {
  if (!vocab.description) report.warn('vocab', vocab.file, `"${id}" has no description.`);
  for (const v of vocab.values) {
    if (!v.value) report.error('vocab', vocab.file, 'a value entry has no `value`.');
    if (!v.label) report.warn('vocab', vocab.file, `value "${v.value}" has no label.`);
    if (typeof v.value === 'string' && !/^[A-Za-z0-9_]+$/.test(v.value)) {
      report.error('vocab', vocab.file, `value "${v.value}" is not a plain token.`);
    }
  }
  if (!usedVocabularies.has(id)) report.error('vocab', vocab.file, `"${id}" is referenced by no schema.`);
}

// 7 — every source kind carries a default tier, since tiering drives rules 9 and 12
for (const v of vocabs.get('source-kinds')?.values ?? []) {
  if (!Number.isInteger(v.tier) || v.tier < 1 || v.tier > 5) {
    report.error('vocab', 'vocab/source-kinds.yml', `kind "${v.value}" has no valid default tier.`);
  }
}

// 8 — the four annotations are each actually used somewhere
const annotationUse = Object.fromEntries([...KNOWN_ANNOTATIONS].map((a) => [a, 0]));
for (const { schema } of raw.values()) {
  (function walk(node) {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      if (annotationUse[k] !== undefined) annotationUse[k] += 1;
      walk(v);
    }
  })(schema);
}
for (const [a, n] of Object.entries(annotationUse)) {
  if (n === 0) report.warn('annotation', 'schema/', `"${a}" is enforced by the tooling but used by no schema.`);
}

report.note(`${schemaFiles.length} schema file(s) checked; annotation use: ${
  Object.entries(annotationUse).map(([a, n]) => `${a} ${n}`).join(', ')}.`);
report.note(`${refs.size} distinct $ref target(s), all resolving.`);
report.exit();
