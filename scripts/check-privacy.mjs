#!/usr/bin/env node
// The privacy gate. docs/data-architecture.md section 8.6.
//
// The build applies redaction by path. This proves it worked, by reading the emitted public
// bundle back and looking for anything that should not have survived. A build that cannot
// prove the public bundle is clean does not get to produce one.
//
// Guards are path-aware, not name-aware: `notes` is private on a specimen and perfectly
// public on a manufacturer, and a check that cannot tell those apart is a check nobody will
// keep passing.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';
import {
  ROOT, loadVocabularies, loadSchemas, loadRecords, indexRecords,
  collectAnnotated, schemaForEntity, pointerExists, SCHEMA_FOR_ENTITY, Report,
} from './lib/archive.mjs';

const report = new Report('privacy — proving the public bundle carries nothing private (8.6)');
const dirArg = process.argv.find((a) => a.startsWith('--dir='))?.split('=')[1];
const publicDir = dirArg
  ? (dirArg.startsWith('/') ? join(dirArg, 'public') : join(ROOT, dirArg, 'public'))
  : join(ROOT, 'dist', 'public');

if (!existsSync(publicDir)) {
  report.error('privacy', 'dist/public', 'No public bundle. Run the build first.');
  report.exit();
}

const vocabs = loadVocabularies();
const { raw } = loadSchemas(vocabs);
const records = loadRecords().filter((r) => r.doc && !r.parseError);
indexRecords(records);

// Static private pointers per entity, read straight off the schema annotations.
const privatePointers = new Map();
for (const entity of Object.keys(SCHEMA_FOR_ENTITY)) {
  const schema = schemaForEntity(entity, raw);
  if (!schema) continue;
  privatePointers.set(entity, collectAnnotated(schema, {}, raw, 'x-private'));
}
// The one guard that must be name-based: it lives inside an array, so no static pointer
// reaches it, and the name is unambiguous wherever it appears.
const NAME_GUARDS = new Set(['specimen_id']);

const specimenIds = new Set(
  records.filter((r) => r.entity === 'specimen' && r.doc.private !== false).map((r) => r.doc.id),
);

const guarded = [...privatePointers.values()].reduce((n, l) => n + l.length, 0);
report.note(`Guarding ${guarded} private field path(s) across ${privatePointers.size} entities, plus ${specimenIds.size} private specimen id(s).`);

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.json')) files.push(full);
  }
})(publicDir);

let scanned = 0;
let recordsChecked = 0;

for (const file of files) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, 'utf8');
  let data;
  try { data = JSON.parse(text); } catch (err) {
    report.error('privacy', rel, `unreadable: ${err.message}`); continue;
  }
  scanned += 1;

  // Entity files carry records; check each against its own entity's private paths.
  const entity = basename(file, '.json');
  if (privatePointers.has(entity) && Array.isArray(data)) {
    for (const [i, record] of data.entries()) {
      recordsChecked += 1;
      for (const ptr of privatePointers.get(entity)) {
        if (pointerExists(record, ptr)) {
          report.error('privacy', rel, `/${i}${ptr} is private on a ${entity} and must not appear in the public bundle.`);
        }
      }
    }
  }

  // Value-shaped guards apply everywhere, including indexes and meta.
  (function scan(node, path) {
    if (Array.isArray(node)) return node.forEach((n, i) => scan(n, `${path}/${i}`));
    if (!node || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      const p = `${path}/${k}`;
      if (NAME_GUARDS.has(k)) report.error('privacy', rel, `${p} is a private field and must not appear in the public bundle.`);
      if (k === 'entity' && v === 'specimen') report.error('privacy', rel, `${path} is a specimen record. Specimens never enter the public bundle.`);
      if (k === 'kind' && v === 'archivist_paid') report.error('privacy', rel, `${p} is an archivist_paid price observation.`);
      if (k === 'rights_status' && (v === 'unclear' || v === 'do_not_publish')) {
        report.error('privacy', rel, `${p} is media with rights_status "${v}", which is never published.`);
      }
      scan(v, p);
    }
  })(data, '');

  for (const id of specimenIds) {
    if (text.includes(`"${id}"`)) report.error('privacy', rel, `references private specimen "${id}".`);
  }
}

report.note(`${scanned} public bundle file(s) scanned, ${recordsChecked} record(s) checked field by field.`);
report.exit();
