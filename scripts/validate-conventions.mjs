#!/usr/bin/env node
// Blocking checks for the RENDERING CONVENTION layer (conventions/).
//
// A convention is a visual default the exhibition chose because the archive
// makes no claim. The whole point of putting them in their own directory, under
// their own schema, behind their own validator is that a convention can never
// be mistaken for — or quietly promoted into — an archival fact.
//
// This file enforces five things the schema alone cannot:
//   C1  every convention validates against schema/rendering-convention.schema.json
//   C2  a cv- id never collides with an archive record id, and is unique
//   C3  affected_records matches a live re-measurement of the archive
//   C4  convention_basis never names an archive source id (no laundering a
//       convention into evidence by citation)
//   C5  nothing under data/ references a cv- id (the archive must not depend on
//       the exhibition's presentation choices)
//
// Exit code 1 on any error.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { ROOT, DATA_ROOT, loadRecords, indexRecords, pointerGet, Report } from './lib/archive.mjs';

const report = new Report('validate-conventions — the rendering convention layer (rules C1-C5)');

const REGISTRY = path.join(ROOT, 'conventions', 'rendering-conventions.yml');
const SCHEMA = path.join(ROOT, 'schema', 'rendering-convention.schema.json');

const registry = yaml.load(fs.readFileSync(REGISTRY, 'utf8'));
const conventions = registry?.conventions ?? [];
const schema = JSON.parse(fs.readFileSync(SCHEMA, 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const records = loadRecords();
const { byId } = indexRecords(records);
const variants = records.filter((r) => r.entity === 'variant' && r.doc);
const models = new Map(records.filter((r) => r.entity === 'model' && r.doc?.id).map((r) => [r.doc.id, r.doc]));
const sourceIds = new Set(records.filter((r) => r.entity === 'source' && r.doc?.id).map((r) => r.doc.id));

report.note(`${conventions.length} convention(s), measured against ${variants.length} variant record(s).`);

// ---------------------------------------------------------------- C1 schema
for (const c of conventions) {
  if (!validate(c)) {
    for (const e of validate.errors) {
      report.error('C1', 'conventions/rendering-conventions.yml', `${c?.id ?? '(no id)'}${e.instancePath}: ${e.message}`);
    }
  }
}

// ---------------------------------------------------------------- C2 id namespace
const seen = new Set();
for (const c of conventions) {
  if (!c?.id) continue;
  if (seen.has(c.id)) report.error('C2', 'conventions/rendering-conventions.yml', `duplicate convention id "${c.id}".`);
  seen.add(c.id);
  if (byId.has(c.id)) {
    report.error('C2', 'conventions/rendering-conventions.yml',
      `convention id "${c.id}" collides with an archive record id. The cv- namespace is reserved so that a convention and a fact can never share an address.`);
  }
}

// ---------------------------------------------------------------- C3 re-measure
//
// A convention applies to a variant when EVERY pointer in when_absent fails to
// resolve. Pointers beginning /specs/ are looked up on the variant's model,
// which is how an inheritable spec is actually stored (inheritance runs
// MODEL -> VARIANT, never variant -> sibling variant). An empty array counts as
// absent: a colorway with no faces documents no face.
const absent = (v) => v === undefined || v === null || (Array.isArray(v) && v.length === 0);

const measure = (conv) => {
  const pointers = conv?.applies_to?.when_absent ?? [];
  let n = 0;
  for (const rec of variants) {
    const model = models.get(rec.doc.model_id);
    const anyPresent = pointers.some((p) => {
      const doc = p.startsWith('/specs/') ? model : rec.doc;
      return doc ? !absent(pointerGet(doc, p)) : false;
    });
    if (!anyPresent) n += 1;
  }
  return n;
};

for (const c of conventions) {
  if (!c?.applies_to) continue;
  const actual = measure(c);
  const declared = c.applies_to.affected_records;
  if (actual !== declared) {
    report.error('C3', 'conventions/rendering-conventions.yml',
      `${c.id}: affected_records says ${declared}, live archive measures ${actual}. A convention that misstates its own reach misrepresents how much of the exhibition is invented. Re-measure and update measured_on.`);
  }
}

// ---------------------------------------------------------------- C4 no laundering
for (const c of conventions) {
  const basis = c?.convention_basis;
  if (!basis) continue;
  for (const id of sourceIds) {
    // Word-boundary match: a source id is kebab-case, so a bare substring hit is
    // enough to catch an attempt to cite one, without flagging ordinary prose.
    if (new RegExp(`(^|[^a-z0-9-])${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9-]|$)`).test(basis)) {
      report.error('C4', 'conventions/rendering-conventions.yml',
        `${c.id}: convention_basis names the archive source "${id}". A convention justifies a default in general; it may never cite evidence, because citing evidence is how a convention stops looking like one.`);
    }
  }
}

// ---------------------------------------------------------------- C5 one-way dependency
const dataDir = path.join(DATA_ROOT, 'data');
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && /\.(ya?ml|json)$/.test(e.name)) out.push(p);
  }
  return out;
};
if (fs.existsSync(dataDir)) {
  for (const file of walk(dataDir)) {
    const text = fs.readFileSync(file, 'utf8');
    const hit = text.match(/\bcv-[a-z0-9]+(?:-[a-z0-9]+)*\b/g);
    if (hit) {
      const named = [...new Set(hit)].filter((h) => seen.has(h));
      if (named.length) {
        report.error('C5', path.relative(ROOT, file),
          `references rendering convention(s) ${named.join(', ')}. The dependency runs one way: the exhibition reads the archive, the archive never reads the exhibition.`);
      }
    }
  }
}

report.exit();
