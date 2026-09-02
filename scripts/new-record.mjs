#!/usr/bin/env node
// Scaffolds an empty record from its schema. Creates structure, never facts: every field is
// left blank for a researcher to fill from a source.
//
//   node scripts/new-record.mjs variant <id> [--model <model-id>]

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { ROOT, ENTITY_DIRS, loadVocabularies, loadSchemas, schemaForEntity, derefSchema } from './lib/archive.mjs';

const [entity, id, ...rest] = process.argv.slice(2);
if (!entity || !id || !ENTITY_DIRS[entity]) {
  console.error(`usage: node scripts/new-record.mjs <${Object.keys(ENTITY_DIRS).join('|')}> <id> [--key value ...]`);
  process.exit(2);
}
const opts = {};
for (let i = 0; i < rest.length; i += 2) {
  if (rest[i]?.startsWith('--')) opts[rest[i].slice(2)] = rest[i + 1] ?? '';
}

const vocabs = loadVocabularies();
const { raw } = loadSchemas(vocabs);
const schema = derefSchema(schemaForEntity(entity, raw), raw);
const required = schema.required ?? [];

const lines = [
  `# ${entity}: ${id}`,
  '# Scaffolded by scripts/new-record.mjs. Every value below is a placeholder.',
  '# Fill each field from a source, or delete it. Do not guess.',
  '# Critical fields need an attestation before this record can reach status "sourced";',
  '# attest with confidence "unknown" to record that you looked and found nothing.',
  '',
  `id: ${id}`,
  `entity: ${entity}`,
];
for (const field of required) {
  if (['id', 'entity'].includes(field)) continue;
  if (field === 'status') continue;
  const given = opts[field];
  lines.push(`${field}: ${given ? given : '""   # REQUIRED'}`);
}
lines.push('status: stub', '', 'attestations: {}', '');

const dir = join(ROOT, ENTITY_DIRS[entity], ...(opts.dir ? [opts.dir] : []));
const file = join(dir, `${id}.yml`);
if (existsSync(file)) { console.error(`refusing to overwrite ${file}`); process.exit(1); }
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, lines.join('\n'));
console.log(`created ${file.replace(ROOT, '')}`);
