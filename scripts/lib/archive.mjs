// Shared loading, schema resolution, and traversal for every check in this repository.
//
// The four custom schema annotations are read here and nowhere else:
//   x-critical  the field gates publication (data-architecture 7.2 rule 6)
//   x-private   the field never reaches the public bundle (8.6)
//   x-derived   the build computes it; authoring it is an error
//   x-reserved  declared for a later phase, must stay unset
//
// Controlled vocabularies are injected into the schemas as `enum` at load time, so a
// vocabulary and its schema cannot drift apart.

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));
// Schemas and vocabularies always come from the repository. Only the record tree can be
// pointed elsewhere, so the self-test can exercise the rules against fixtures without
// putting a single synthetic record inside data/.
export const DATA_ROOT = process.env.CC_DATA_ROOT ? process.env.CC_DATA_ROOT : ROOT;
const SCHEMA_BASE = 'https://cubecollection/schema/';

export const ENTITY_DIRS = {
  manufacturer: 'data/manufacturers',
  family: 'data/families',
  model: 'data/models',
  variant: 'data/variants',
  specimen: 'data/specimens',
  source: 'data/sources',
  person: 'data/people',
  event: 'data/events',
  geometry_profile: 'data/geometry-profiles',
};

export const SCHEMA_FOR_ENTITY = {
  manufacturer: 'manufacturer', family: 'family', model: 'model', variant: 'variant',
  specimen: 'specimen', source: 'source', person: 'person', event: 'event',
  geometry_profile: 'geometry-profile',
};

const PUBLISHABLE = new Set(['sourced', 'reviewed', 'published']);
export const isAtLeastSourced = (status) => PUBLISHABLE.has(status);

// ---------------------------------------------------------------- files

function walkFiles(dir, ext) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walkFiles(full, ext));
    else if (name.endsWith(ext) && !name.startsWith('.')) out.push(full);
  }
  return out.sort();
}

export function loadVocabularies() {
  const dir = join(ROOT, 'vocab');
  const vocabs = new Map();
  for (const file of walkFiles(dir, '.yml')) {
    const doc = yaml.load(readFileSync(file, 'utf8'));
    if (!doc?.id || !Array.isArray(doc.values)) {
      throw new Error(`Malformed vocabulary: ${relative(ROOT, file)} needs an id and a values list.`);
    }
    vocabs.set(doc.id, {
      id: doc.id,
      file: relative(ROOT, file),
      description: doc.description ?? '',
      values: doc.values,
      set: new Set(doc.values.map((v) => v.value)),
      byValue: new Map(doc.values.map((v) => [v.value, v])),
    });
  }
  return vocabs;
}

// ---------------------------------------------------------------- schemas

function injectVocabularies(node, vocabs, used, path) {
  if (Array.isArray(node)) return node.map((n, i) => injectVocabularies(n, vocabs, used, `${path}/${i}`));
  if (!node || typeof node !== 'object') return node;
  const out = {};
  for (const [k, v] of Object.entries(node)) out[k] = injectVocabularies(v, vocabs, used, `${path}/${k}`);
  if (typeof out['x-vocab'] === 'string') {
    const vocab = vocabs.get(out['x-vocab']);
    if (!vocab) throw new Error(`Schema at ${path} references unknown vocabulary "${out['x-vocab']}".`);
    used.add(vocab.id);
    out.enum = [...vocab.set];
  }
  return out;
}

export function loadSchemas(vocabs) {
  const files = walkFiles(join(ROOT, 'schema'), '.json');
  const raw = new Map();
  const usedVocabularies = new Set();
  for (const file of files) {
    const doc = JSON.parse(readFileSync(file, 'utf8'));
    if (!doc.$id) throw new Error(`Schema ${relative(ROOT, file)} has no $id.`);
    raw.set(doc.$id, { file: relative(ROOT, file), schema: injectVocabularies(doc, vocabs, usedVocabularies, doc.$id) });
  }
  const ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });
  addFormats(ajv);
  for (const { schema } of raw.values()) ajv.addSchema(schema);
  const validators = new Map();
  for (const [name, schemaName] of Object.entries(SCHEMA_FOR_ENTITY)) {
    validators.set(name, ajv.getSchema(`${SCHEMA_BASE}${schemaName}.schema.json`));
  }
  return { ajv, raw, validators, usedVocabularies, schemaFiles: files.map((f) => relative(ROOT, f)) };
}

// ---------------------------------------------------------------- records

export function loadRecords() {
  const records = [];
  for (const [entity, dir] of Object.entries(ENTITY_DIRS)) {
    for (const file of walkFiles(join(DATA_ROOT, dir), '.yml')) {
      let doc;
      try {
        doc = yaml.load(readFileSync(file, 'utf8'));
      } catch (err) {
        records.push({ entity, file: relative(DATA_ROOT, file).split(sep).join('/'), doc: null, parseError: err.message });
        continue;
      }
      records.push({ entity, file: relative(DATA_ROOT, file).split(sep).join('/'), doc });
    }
  }
  return records;
}

export function indexRecords(records) {
  const byId = new Map();
  const byEntity = new Map();
  for (const rec of records) {
    if (!rec.doc?.id) continue;
    byId.set(rec.doc.id, rec);
    if (!byEntity.has(rec.entity)) byEntity.set(rec.entity, []);
    byEntity.get(rec.entity).push(rec);
  }
  return { byId, byEntity };
}

// ---------------------------------------------------------------- JSON Pointer

export function pointerGet(doc, pointer) {
  if (pointer === '') return doc;
  let cur = doc;
  for (const rawPart of pointer.split('/').slice(1)) {
    const part = rawPart.replace(/~1/g, '/').replace(/~0/g, '~');
    if (cur == null) return undefined;
    cur = Array.isArray(cur) ? cur[Number(part)] : cur[part];
  }
  return cur;
}

export function pointerExists(doc, pointer) {
  if (pointer === '') return true;
  let cur = doc;
  for (const rawPart of pointer.split('/').slice(1)) {
    const part = rawPart.replace(/~1/g, '/').replace(/~0/g, '~');
    if (cur == null || typeof cur !== 'object') return false;
    if (Array.isArray(cur)) {
      const i = Number(part);
      if (!Number.isInteger(i) || i < 0 || i >= cur.length) return false;
      cur = cur[i];
    } else {
      if (!Object.prototype.hasOwnProperty.call(cur, part)) return false;
      cur = cur[part];
    }
  }
  return true;
}

// ---------------------------------------------------------------- annotated traversal

function deref(node, raw) {
  if (!node || typeof node !== 'object') return node;
  if (!node.$ref) return node;
  const target = raw.get(node.$ref);
  if (!target) throw new Error(`Unresolvable $ref: ${node.$ref}`);
  const { $ref, ...siblings } = node;
  return { ...target.schema, ...siblings };
}

/**
 * Collect instance pointers whose schema carries `annotation`.
 *
 * Object properties are traversed whether or not they are present in the document, so a
 * critical field cannot be dodged by omitting its parent. Array items are traversed only
 * at indices that actually exist, because demanding provenance for absent array elements
 * would be meaningless.
 */
export function collectAnnotated(schemaNode, doc, raw, annotation, pointer = '', out = [], seen = new Set()) {
  const node = deref(schemaNode, raw);
  if (!node || typeof node !== 'object') return out;
  if (node[annotation] === true && !seen.has(pointer)) {
    seen.add(pointer);
    out.push(pointer);
  }
  if (node.properties) {
    for (const [key, sub] of Object.entries(node.properties)) {
      const child = doc && typeof doc === 'object' && !Array.isArray(doc) ? doc[key] : undefined;
      collectAnnotated(sub, child, raw, annotation, `${pointer}/${key}`, out, seen);
    }
  }
  if (node.items && Array.isArray(doc)) {
    doc.forEach((item, i) => collectAnnotated(node.items, item, raw, annotation, `${pointer}/${i}`, out, seen));
  }
  return out;
}

export function schemaForEntity(entity, raw) {
  return raw.get(`${SCHEMA_BASE}${SCHEMA_FOR_ENTITY[entity]}.schema.json`)?.schema;
}

export function derefSchema(node, raw) {
  return deref(node, raw);
}

// ---------------------------------------------------------------- sources

export function sourceTier(sourceDoc, vocabs) {
  if (Number.isInteger(sourceDoc?.tier)) return sourceDoc.tier;
  const entry = vocabs.get('source-kinds')?.byValue.get(sourceDoc?.kind);
  return entry?.tier ?? 5;
}

// ---------------------------------------------------------------- dates

const QUARTER_MONTH = { Q1: '01', Q2: '04', Q3: '07', Q4: '10' };

/** Earliest day a precision-bearing date could denote, as YYYY-MM-DD. For ordering only. */
export function dateStart(d) {
  if (!d) return null;
  if (d.earliest) return d.earliest;
  const v = d.value;
  if (typeof v !== 'string') return null;
  const q = v.match(/^(\d{4})-Q([1-4])$/);
  if (q) return `${q[1]}-${QUARTER_MONTH['Q' + q[2]]}-01`;
  if (/^\d{4}$/.test(v)) return `${v}-01-01`;
  if (/^\d{4}-\d{2}$/.test(v)) return `${v}-01`;
  return v;
}

// ---------------------------------------------------------------- identity

const FINGERPRINT_FIELDS = [
  (v) => v.__manufacturer_id ?? '',
  (v) => v.model_id ?? '',
  (v) => v.edition?.designation ?? '',
  (v) => v.edition?.name ?? '',
  (v) => v.config?.coating ?? '',
  (v) => v.config?.magnet_configuration ?? '',
  (v) => v.config?.core_system ?? '',
  (v) => v.config?.maglev ?? '',
  (v) => v.colorway?.designation ?? '',
  (v) => v.colorway?.application ?? '',
  // An aftermarket product's identity includes what it was made from and who made it. Without
  // these, the same modification by the same servicer on two different base cubes collides —
  // which is exactly what happened when the first PiCube mods were enumerated: a GAN16 MagLev
  // UV mod and a GAN16 MagLev MAX UV mod produced one fingerprint for two real products.
  (v) => (v.relationships ?? []).find((r) => r.type === 'modified_from')?.target ?? '',
  (v) => v.service?.serviced_by ?? '',
];

/** Derived, never authored. Collisions go to the duplicate queue; nothing auto-merges. */
export function fingerprint(variantDoc, manufacturerId = '') {
  const subject = { ...variantDoc, __manufacturer_id: manufacturerId };
  const material = FINGERPRINT_FIELDS.map((f) => String(f(subject)).trim().toLowerCase()).join('|');
  return 'sha1:' + createHash('sha1').update(material).digest('hex');
}

/** Variant value, then model value, then undefined. */
export function resolveSpec(variantDoc, modelDoc, field) {
  const v = variantDoc?.config?.[field];
  if (v !== undefined && v !== null) return { value: v, from: 'variant' };
  const m = modelDoc?.specs?.[field];
  if (m !== undefined && m !== null) return { value: m, from: 'model' };
  return { value: undefined, from: null };
}

const COLORWAY_FACES = ['U', 'D', 'F', 'B', 'L', 'R'];

/** Derived. Tells the exhibition what it could draw, and research where the gaps are. */
export function colorwayCompleteness(colorway) {
  if (!colorway || typeof colorway !== 'object') return 'none';
  const faces = new Set((colorway.faces ?? []).filter((f) => f.color_name || f.color_normalized).map((f) => f.face));
  const allFaces = COLORWAY_FACES.every((f) => faces.has(f));
  const hasBody = Boolean(colorway.body?.plastic_color_name || colorway.body?.translucency || colorway.body?.finish);
  const hasLogo = Boolean(colorway.logo?.placement);
  if (allFaces && hasBody && hasLogo) return 'render_ready';
  if (allFaces) return 'face_complete';
  const any = hasBody || faces.size > 0 || colorway.designation || colorway.application;
  return any ? 'partial' : 'none';
}

export function renderBlockers(colorway, geometryProfileId) {
  const blockers = [];
  const faces = new Set((colorway?.faces ?? []).filter((f) => f.color_name || f.color_normalized).map((f) => f.face));
  const missing = COLORWAY_FACES.filter((f) => !faces.has(f));
  if (missing.length) blockers.push(`face colours undocumented: ${missing.join(', ')}`);
  if (!colorway?.body?.plastic_color_name) blockers.push('body plastic colour undocumented');
  if (!colorway?.logo?.placement) blockers.push('logo placement undocumented');
  if (!geometryProfileId) blockers.push('no geometry profile (reserved; none exist in this phase)');
  return blockers;
}

// ---------------------------------------------------------------- reporting

export class Report {
  constructor(title) {
    this.title = title;
    this.errors = [];
    this.warnings = [];
    this.notes = [];
  }
  error(rule, file, message) { this.errors.push({ rule, file, message }); }
  warn(rule, file, message) { this.warnings.push({ rule, file, message }); }
  note(message) { this.notes.push(message); }

  print() {
    const line = (e) => `  ${e.rule ? `[${e.rule}] ` : ''}${e.file ? `${e.file}: ` : ''}${e.message}`;
    console.log(`\n${this.title}`);
    console.log('─'.repeat(Math.max(this.title.length, 40)));
    for (const n of this.notes) console.log(`  ${n}`);
    if (this.warnings.length) {
      console.log(`\n  ${this.warnings.length} warning${this.warnings.length === 1 ? '' : 's'}:`);
      for (const w of this.warnings) console.log(line(w));
    }
    if (this.errors.length) {
      console.log(`\n  ${this.errors.length} error${this.errors.length === 1 ? '' : 's'}:`);
      for (const e of this.errors) console.log(line(e));
    }
    const verdict = this.errors.length ? 'FAIL' : 'PASS';
    console.log(`\n  ${verdict} — ${this.errors.length} error(s), ${this.warnings.length} warning(s)\n`);
    return this.errors.length === 0;
  }
  exit() { process.exit(this.print() ? 0 : 1); }
}
