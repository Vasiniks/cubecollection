#!/usr/bin/env node
// Build. docs/data-architecture.md sections 8.5 and 8.6.
//
// Resolves model->variant inheritance, computes every derived field, mirrors relationships
// so both ends are queryable, and emits two bundles:
//
//   dist/private/  everything, including specimens. Never deployed.
//   dist/public/   the archive with all private data removed.
//
// Phase B consumes dist/public only. No presentation code reads data/.
//
// TWO MODES, AND THE DIRECTORY NAME CARRIES THE CLAIM (added 2026-09-21, Phase III).
//
//   --mode=publication      (default)  -> dist/public/   status filter: published
//   --mode=research-preview            -> dist/preview/  status filter: sourced,drafted,stub
//
// WHY A SEPARATE DIRECTORY RATHER THAN A WIDER FILTER ON dist/public. `published` is not a
// synonym for "finished research": vocab/record-status.yml defines it as "Visible to the
// exhibition", the last step of a nine-pass methodology whose review-and-publish pass has never
// been run. Meanwhile every one of the 527 variants is `stub` ("Identity established, nothing
// else") while ALL 527 carry attestations and 253 carry a config block — the status field never
// tracked the research.
//
// So the exhibition needs to develop against real researched data, and the archive must not
// claim that data is publication-ready. Widening dist/public's filter would have conflated the
// two silently. A separate directory cannot: anything reading dist/public still gets only what
// a curator published, and a preview bundle is impossible to mistake for one. No record's
// status is changed by either mode.

import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import { join, dirname } from 'node:path';
import {
  ROOT, loadVocabularies, loadSchemas, loadRecords, indexRecords,
  collectAnnotated, schemaForEntity, fingerprint, resolveSpec,
  colorwayCompleteness, renderBlockers, dateStart,
} from './lib/archive.mjs';

const MODE = process.argv.find((a) => a.startsWith('--mode='))?.split('=')[1] ?? 'publication';
const MODES = {
  publication: { bundle: 'public', status: ['published'] },
  'research-preview': { bundle: 'preview', status: ['sourced', 'drafted', 'stub'] },
};
if (!MODES[MODE]) {
  console.error(`build: unknown --mode=${MODE}. Use publication or research-preview.`);
  process.exit(2);
}
const PUBLIC_BUNDLE = MODES[MODE].bundle;
// An explicit --public-status= still wins, so the gate stays inspectable and overridable.
const PUBLIC_STATUS = (process.argv.find((a) => a.startsWith('--public-status='))?.split('=')[1]
  ?? MODES[MODE].status.join(','))
  .split(',').map((s) => s.trim());
const PRIVATE_PRICE_KINDS = new Set(['archivist_paid']);
const UNPUBLISHABLE_RIGHTS = new Set(['unclear', 'do_not_publish']);
const PUBLIC_SCOPE = new Set(['core', 'conditional']);

const vocabs = loadVocabularies();
const { raw } = loadSchemas(vocabs);
const records = loadRecords().filter((r) => r.doc && !r.parseError);
const { byId, byEntity } = indexRecords(records);

const clone = (o) => JSON.parse(JSON.stringify(o));

function pointerDelete(doc, pointer) {
  const parts = pointer.split('/').slice(1).map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));
  const last = parts.pop();
  let cur = doc;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return;
    cur = Array.isArray(cur) ? cur[Number(p)] : cur[p];
  }
  if (cur == null || typeof cur !== 'object') return;
  if (Array.isArray(cur)) cur.splice(Number(last), 1);
  else delete cur[last];
}

// ---------------------------------------------------------------- resolve + derive

const SPEC_FIELDS = ['size_mm', 'weight_g', 'shape', 'core_system', 'maglev',
  'magnet_architecture', 'adjustment_system', 'materials', 'piece_count'];

const resolved = new Map();
const mirrors = new Map();
const addMirror = (targetId, edge) => {
  if (!mirrors.has(targetId)) mirrors.set(targetId, []);
  mirrors.get(targetId).push(edge);
};

const INVERSE = {
  succeeds: 'preceded_by', reissue_of: 'reissued_as', modified_from: 'modified_into',
  smart_version_of: 'smart_version', rebrand_of: 'rebranded_as', bundled_with: 'bundled_with',
  commemorates: 'commemorated_by', signature_of: 'signature_on',
  collaboration_with: 'collaborated_on', duplicate_of: 'possible_duplicate',
  merged_into: 'absorbed',
};

for (const rec of records) {
  for (const rel of rec.doc.relationships ?? []) {
    addMirror(rel.target, { type: INVERSE[rel.type] ?? `inverse_of_${rel.type}`, source: rec.doc.id, source_entity: rec.entity, note: rel.note });
  }
}

for (const rec of records) {
  const doc = clone(rec.doc);
  doc.__file = rec.file;
  if (mirrors.has(doc.id)) doc.inbound_relationships = mirrors.get(doc.id);

  if (rec.entity === 'variant') {
    const model = byId.get(doc.model_id)?.doc;
    const family = model ? byId.get(model.family_id)?.doc : undefined;
    const manufacturerId = model?.manufacturer_id ?? '';

    doc.resolved_specs = {};
    for (const field of SPEC_FIELDS) {
      const { value, from } = resolveSpec(doc, model, field);
      if (value !== undefined) doc.resolved_specs[field] = { value, from };
    }
    doc.lineage = {
      manufacturer_id: manufacturerId,
      family_id: model?.family_id ?? null,
      model_id: doc.model_id,
      model_name: model?.name ?? null,
      generation: model?.generation ?? null,
      family_name: family?.name ?? null,
    };
    doc.fingerprint = fingerprint(doc, manufacturerId);

    const completeness = colorwayCompleteness(doc.colorway);
    if (doc.colorway) doc.colorway.completeness = completeness;
    const profile = model?.geometry_profile_id ?? doc.representation?.procedural?.geometry_profile_id ?? null;
    doc.representation = doc.representation ?? {};
    doc.representation.captured_3d = doc.representation.captured_3d ?? [];
    doc.representation.procedural = {
      ...(doc.representation.procedural ?? {}),
      geometry_profile_id: profile,
      colorway_completeness: completeness,
      renderable: Boolean(profile) && completeness === 'render_ready',
      blockers: renderBlockers(doc.colorway, profile),
    };
    doc.first_release = (doc.releases ?? []).map((r) => dateStart(r.date)).filter(Boolean).sort()[0] ?? null;
  }
  resolved.set(doc.id, { entity: rec.entity, doc });
}

// ---------------------------------------------------------------- redaction

function redact(entity, doc) {
  const out = clone(doc);
  const schema = schemaForEntity(entity, raw);
  const removed = [];
  for (const ptr of collectAnnotated(schema, out, raw, 'x-private').sort((a, b) => b.length - a.length)) {
    pointerDelete(out, ptr);
    removed.push(ptr);
  }
  if (out.pricing?.observations) {
    out.pricing.observations = out.pricing.observations.filter((o) => !PRIVATE_PRICE_KINDS.has(o.kind));
  }
  if (out.media) {
    out.media = out.media
      .filter((m) => !UNPUBLISHABLE_RIGHTS.has(m.rights_status))
      .map((m) => { const c = { ...m }; delete c.specimen_id; return c; });
  }
  delete out.__file;
  return { doc: out, removed };
}

// ---------------------------------------------------------------- emit

const outArg = process.argv.find((a) => a.startsWith('--out='))?.split('=')[1];
const outDir = outArg ? (outArg.startsWith('/') ? outArg : join(ROOT, outArg)) : join(ROOT, 'dist');
// Clear only the bundles THIS run writes. Wiping all of outDir would make the
// two modes delete each other's output, so `npm run build:preview` would leave
// dist/public missing rather than merely stale — a confusing failure for anything
// pointed at it. Each bundle is still rebuilt from empty, so no stale file survives.
for (const bundle of ['private', PUBLIC_BUNDLE]) {
  rmSync(join(outDir, bundle), { recursive: true, force: true });
}

function write(bundle, relPath, data) {
  const p = join(outDir, bundle, relPath);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, `${JSON.stringify(data, null, 2)}\n`);
}

const privateRecords = [...resolved.values()];
const publicRecords = privateRecords.filter(({ entity, doc }) => {
  if (entity === 'specimen') return false;
  if (!PUBLIC_STATUS.includes(doc.status)) return false;
  if (doc.scope_class && !PUBLIC_SCOPE.has(doc.scope_class)) return false;
  return true;
});

const byEntityOut = (list) => {
  const m = {};
  for (const { entity, doc } of list) (m[entity] ??= []).push(doc);
  return m;
};

// private bundle — verbatim, plus derived fields
const priv = byEntityOut(privateRecords);
for (const [entity, list] of Object.entries(priv)) write('private', `${entity}.json`, list);

// public bundle — redacted
const publicOut = {};
let redactionCount = 0;
for (const { entity, doc } of publicRecords) {
  const { doc: clean, removed } = redact(entity, doc);
  redactionCount += removed.length;
  (publicOut[entity] ??= []).push(clean);
}
for (const [entity, list] of Object.entries(publicOut)) write(PUBLIC_BUNDLE, `${entity}.json`, list);

// indexes, public bundle only
const publicVariants = publicOut.variant ?? [];
write(PUBLIC_BUNDLE, 'index/chronology.json', [...publicVariants]
  .sort((a, b) => String(a.first_release ?? '9999').localeCompare(String(b.first_release ?? '9999')))
  .map((v) => ({ id: v.id, name: v.name, first_release: v.first_release, manufacturer_id: v.lineage?.manufacturer_id, model_id: v.model_id })));

const groupIndex = (key) => {
  const m = {};
  for (const v of publicVariants) {
    const k = v.lineage?.[key] ?? '(unassigned)';
    (m[k] ??= []).push(v.id);
  }
  return m;
};
write(PUBLIC_BUNDLE, 'index/by-manufacturer.json', groupIndex('manufacturer_id'));
write(PUBLIC_BUNDLE, 'index/by-family.json', groupIndex('family_id'));
write(PUBLIC_BUNDLE, 'index/by-model.json', groupIndex('model_id'));

// ---------------------------------------------------------------- rendering conventions
//
// Conventions ship in a file of their own, never merged into a record. The
// exhibition needs them to draw anything at all (no variant is renderable from
// archival data), but a convention is a presentation choice, not a fact, and
// the bundle layout is where that distinction stops being a promise and starts
// being a file boundary. scripts/validate-conventions.mjs guarantees the
// registry's own honesty; this only copies it across.
const conventionRegistry = yaml.load(readFileSync(join(ROOT, 'conventions', 'rendering-conventions.yml'), 'utf8'));
const conventions = conventionRegistry?.conventions ?? [];
write(PUBLIC_BUNDLE, 'convention.json', conventions);
write('private', 'convention.json', conventions);

const meta = {
  built_at: new Date().toISOString(),
  generator: 'scripts/build.mjs',
  phase: 'A — data architecture. No exhibition consumes this yet.',
  mode: MODE,
  bundle: PUBLIC_BUNDLE,
  public_status_filter: PUBLIC_STATUS,
  counts: {
    private: Object.fromEntries(Object.entries(priv).map(([k, v]) => [k, v.length])),
    public: Object.fromEntries(Object.entries(publicOut).map(([k, v]) => [k, v.length])),
  },
  rendering_conventions: conventions.length,
  private_fields_removed: redactionCount,
  notes: [
    'dist/public excludes every specimen record, every archivist_paid price, every private field, and every image whose rights are unclear.',
    'No valuation and no numeric rarity score exist anywhere in this bundle, by design.',
    'representation.procedural.renderable is false throughout: geometry profiles are reserved and none exist in this phase.',
    'convention.json holds RENDERING CONVENTIONS, not records. Each one is a visual default the exhibition chose because the archive documents nothing; each declares what it asserts nothing about and the words a visitor must be shown. A consumer that merges a convention into a record field without carrying its basis has broken the contract this bundle exists to keep.',
    ...(MODE === 'research-preview' ? [
      'RESEARCH PREVIEW — NOT A PUBLICATION. This bundle deliberately includes records whose status is stub, drafted or sourced. Their presence here asserts that they are RESEARCHED, not that a curator has approved them for display. No record status was changed to produce it.',
      'Anything consuming this bundle must surface record.status to the viewer rather than presenting every record as settled.',
    ] : []),
  ],
};
write(PUBLIC_BUNDLE, 'meta.json', meta);
write('private', 'meta.json', meta);

console.log('\nbuild');
console.log('─'.repeat(40));
console.log(`  records in         ${records.length}`);
console.log(`  private bundle     ${privateRecords.length} record(s)`);
console.log(`  public bundle      ${publicRecords.length} record(s)  [status: ${PUBLIC_STATUS.join(', ')}]`);
console.log(`  private fields cut ${redactionCount}`);
console.log(`  output             dist/private, dist/${PUBLIC_BUNDLE}`);
console.log('\n  PASS\n');
