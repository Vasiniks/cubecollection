#!/usr/bin/env node
// Blocking checks. Rules 1-17 and 37-38 of docs/data-architecture.md section 7.
// Exit code 1 on any error. Warnings never block.

import {
  loadVocabularies, loadSchemas, loadRecords, indexRecords,
  pointerExists, pointerGet, collectAnnotated, schemaForEntity,
  sourceTier, isAtLeastSourced, Report,
} from './lib/archive.mjs';

const report = new Report('validate — structural, provenance, and integrity (rules 1-17, 37-38)');
const vocabs = loadVocabularies();
const { raw, validators, usedVocabularies } = loadSchemas(vocabs);
const records = loadRecords();
const { byId } = indexRecords(records);

report.note(`${records.length} record(s), ${raw.size} schema(s), ${vocabs.size} vocabular(ies).`);

// A variant inherits from its model, so a critical field it does not override is already
// attested upstream. Demanding a second attestation for a value the variant never asserted
// would make every variant restate its model, which is the duplication D1 exists to prevent.
const INHERITED_CRITICAL = {
  '/config/magnet_configuration': '/specs/magnet_architecture',
  '/config/core_system': '/specs/core_system',
  '/config/maglev': '/specs/maglev',
  '/config/adjustment_system': '/specs/adjustment_system',
  '/config/size_mm': '/specs/size_mm',
  '/config/weight_g': '/specs/weight_g',
};

// Entity refs that must resolve to a specific entity type.
const ENTITY_REFS = {
  manufacturer: { parent_id: 'manufacturer' },
  family: { manufacturer_id: 'manufacturer', successor_family_id: 'family' },
  model: { family_id: 'family', manufacturer_id: 'manufacturer' },
  variant: { model_id: 'model' },
  specimen: { variant_id: 'variant' },
};

const sourceRecords = new Map(
  records.filter((r) => r.entity === 'source' && r.doc?.id).map((r) => [r.doc.id, r.doc]),
);
const tierOf = (id) => (sourceRecords.has(id) ? sourceTier(sourceRecords.get(id), vocabs) : null);

// ---------------------------------------------------------------- 1, 3
const seenIds = new Map();
for (const rec of records) {
  if (rec.parseError) {
    report.error('1', rec.file, `YAML parse failed: ${rec.parseError}`);
    continue;
  }
  if (!rec.doc || typeof rec.doc !== 'object') {
    report.error('1', rec.file, 'File is empty or not a mapping.');
    continue;
  }
  const validate = validators.get(rec.entity);
  if (!validate) {
    report.error('1', rec.file, `No schema registered for entity "${rec.entity}".`);
    continue;
  }
  if (!validate(rec.doc)) {
    for (const err of validate.errors ?? []) {
      report.error('1', rec.file, `${err.instancePath || '/'} ${err.message}${
        err.params?.allowedValues ? ` (allowed: ${err.params.allowedValues.join(', ')})` : ''}`);
    }
  }
  if (rec.doc.entity && rec.doc.entity !== rec.entity) {
    report.error('1', rec.file, `entity is "${rec.doc.entity}" but the file sits in the ${rec.entity} directory.`);
  }
  const id = rec.doc.id;
  if (id) {
    if (seenIds.has(id)) report.error('3', rec.file, `Duplicate id "${id}", also in ${seenIds.get(id)}.`);
    else seenIds.set(id, rec.file);
  }
}

// ---------------------------------------------------------------- 4
for (const [id, vocab] of vocabs) {
  if (!vocab.values.length) report.error('4', vocab.file, `Vocabulary "${id}" has no values.`);
  const dupes = vocab.values.map((v) => v.value).filter((v, i, a) => a.indexOf(v) !== i);
  if (dupes.length) report.error('4', vocab.file, `Duplicate value(s): ${[...new Set(dupes)].join(', ')}.`);
}
const unused = [...vocabs.keys()].filter((id) => !usedVocabularies.has(id));
if (unused.length) report.warn('4', 'vocab/', `Vocabular(ies) referenced by no schema: ${unused.join(', ')}.`);

// ---------------------------------------------------------------- generic reference walk (2)
function walkRefs(node, path, out) {
  if (Array.isArray(node)) { node.forEach((n, i) => walkRefs(n, `${path}/${i}`, out)); return; }
  if (!node || typeof node !== 'object') return;
  for (const [key, value] of Object.entries(node)) {
    const p = `${path}/${key}`;
    if (key === 'source' && typeof value === 'string') out.push({ path: p, id: value, entity: 'source' });
    else if (key === 'sources' && Array.isArray(value)) {
      value.forEach((v, i) => typeof v === 'string' && out.push({ path: `${p}/${i}`, id: v, entity: 'source' }));
    } else if (key === 'specimen_id' && typeof value === 'string') {
      out.push({ path: p, id: value, entity: 'specimen' });
    } else walkRefs(value, p, out);
  }
}

for (const rec of records) {
  const doc = rec.doc;
  if (!doc || rec.parseError) continue;

  // typed entity refs
  for (const [field, entity] of Object.entries(ENTITY_REFS[rec.entity] ?? {})) {
    const id = doc[field];
    if (!id) continue;
    const target = byId.get(id);
    if (!target) report.error('2', rec.file, `${field} points at unknown id "${id}".`);
    else if (target.entity !== entity) {
      report.error('2', rec.file, `${field} points at "${id}", which is a ${target.entity}, not a ${entity}.`);
    }
  }
  for (const id of doc.designer ?? []) {
    if (byId.get(id)?.entity !== 'person') report.error('2', rec.file, `designer "${id}" is not a person record.`);
  }
  for (const [field, entity] of [['signature_of', 'person'], ['commemorates', 'event']]) {
    for (const id of doc.edition?.[field] ?? []) {
      if (byId.get(id)?.entity !== entity) {
        report.error('2', rec.file, `edition.${field} "${id}" is not a ${entity} record.`);
      }
    }
  }
  for (const id of doc.edition?.collaboration_with ?? []) {
    const e = byId.get(id)?.entity;
    if (e !== 'person' && e !== 'manufacturer') {
      report.error('2', rec.file, `edition.collaboration_with "${id}" is neither a person nor a manufacturer.`);
    }
  }
  if (doc.service?.serviced_by) {
    const t = byId.get(doc.service.serviced_by);
    if (t?.entity !== 'manufacturer') {
      report.error('2', rec.file, `service.serviced_by "${doc.service.serviced_by}" is not a manufacturer record.`);
    } else if (t.doc.kind !== 'service') {
      report.warn('2', rec.file, `service.serviced_by "${doc.service.serviced_by}" has kind "${t.doc.kind}", not "service". A servicer is normally a manufacturer record with kind: service.`);
    }
  }

  // 39 — a serviced product and its origin are one fact recorded twice, and neither half is
  // meaningful alone. A service block without modified_from describes work on nothing; a
  // modified_from without a service block says a cube was modified but not how or by whom.
  {
    const hasService = Boolean(doc.service);
    const hasModifiedFrom = (doc.relationships ?? []).some((r) => r.type === 'modified_from');
    if (hasService && !hasModifiedFrom) {
      report.error('39', rec.file, 'has a service block but no modified_from relationship. Name the exact base variant the service was applied to.');
    }
    if (hasModifiedFrom && !hasService) {
      report.error('39', rec.file, 'has a modified_from relationship but no service block. Record what was done and by whom, or use a different relationship type.');
    }
    // The servicer's identity is a claim about the world, so it carries provenance — but only
    // where a service exists. x-critical would have demanded it from every unserviced cube.
    if (hasService && isAtLeastSourced(doc.status) && !(doc.attestations ?? {})['/service/serviced_by']) {
      report.error('39', rec.file, 'service.serviced_by has no attestation. Who performed a modification is a claim about the world, not bookkeeping.');
    }
  }
  for (const [i, rel] of (doc.relationships ?? []).entries()) {
    const target = byId.get(rel.target);
    if (!target) report.error('2', rec.file, `relationships/${i} points at unknown id "${rel.target}".`);
    else if (target.entity !== rel.target_entity) {
      report.error('2', rec.file, `relationships/${i} declares target_entity "${rel.target_entity}" but "${rel.target}" is a ${target.entity}.`);
    }
  }
  if (doc.revision_ref) {
    const model = byId.get(doc.model_id);
    const ok = (model?.doc?.revisions ?? []).some((r) => r.id === doc.revision_ref);
    if (!ok) report.error('2', rec.file, `revision_ref "${doc.revision_ref}" is not a revision of ${doc.model_id}.`);
  }

  const refs = [];
  walkRefs(doc, '', refs);
  for (const r of refs) {
    const target = byId.get(r.id);
    if (!target) report.error('2', rec.file, `${r.path} references unknown ${r.entity} "${r.id}".`);
    else if (target.entity !== r.entity) {
      report.error('2', rec.file, `${r.path} references "${r.id}", which is a ${target.entity}, not a ${r.entity}.`);
    }
  }
}

// ---------------------------------------------------------------- 5-17, 37-38
for (const rec of records) {
  const doc = rec.doc;
  if (!doc || rec.parseError) continue;
  const schema = schemaForEntity(rec.entity, raw);
  if (!schema) continue;
  const atts = doc.attestations ?? {};
  const sourced = isAtLeastSourced(doc.status);

  // 5 — every attestation pointer addresses a real path, unless it records an absence
  for (const [ptr, att] of Object.entries(atts)) {
    if (!pointerExists(doc, ptr)) {
      if (att?.confidence !== 'unknown') {
        report.error('5', rec.file, `attestation "${ptr}" addresses a path that does not exist; only confidence "unknown" may record an absent field.`);
      }
    }
  }

  // 37 — derived fields are computed by the build, never authored
  for (const ptr of collectAnnotated(schema, doc, raw, 'x-derived')) {
    if (pointerExists(doc, ptr)) report.error('37', rec.file, `${ptr} is derived by the build and must not be authored.`);
  }
  // 38 — reserved fields stay unset in this phase
  for (const ptr of collectAnnotated(schema, doc, raw, 'x-reserved')) {
    if (pointerExists(doc, ptr)) report.error('38', rec.file, `${ptr} is reserved for a later phase and must stay unset.`);
  }

  // 6, 8 — critical fields
  if (sourced) {
    const model = rec.entity === 'variant' ? byId.get(doc.model_id)?.doc : null;
    for (const ptr of collectAnnotated(schema, doc, raw, 'x-critical')) {
      const att = atts[ptr];
      if (!att) {
        const inheritedFrom = INHERITED_CRITICAL[ptr];
        const overridden = pointerExists(doc, ptr);
        if (!overridden && inheritedFrom && model?.attestations?.[inheritedFrom]) continue;
        report.error('6', rec.file, overridden
          ? `critical field ${ptr} is set on this variant but has no attestation. An override is a claim.`
          : `critical field ${ptr} has no attestation here and none inherited from ${doc.model_id ?? 'its parent'}. Attest it, or attest it with confidence "unknown" to record that it was searched for.`);
        continue;
      }
      if (att.confidence !== 'unknown' && !(att.sources?.length || att.disputed?.length)) {
        report.error('6', rec.file, `critical field ${ptr} is attested "${att.confidence}" with no sources.`);
      }
      for (const sid of att.sources ?? []) {
        const src = sourceRecords.get(sid);
        if (!src) continue;
        if (!src.preservation_method || src.preservation_method === 'none') {
          report.error('8', rec.file, `critical field ${ptr} relies on source "${sid}", which preserves nothing. Add an archive_url, a local_capture, or an excerpt.`);
        }
      }
    }
  }

  // 7 — cited sources exist and web sources record an access date.
  // Reported once per source, not once per citation: five identical lines teach nothing.
  const citedUndated = new Set();
  for (const att of Object.values(atts)) {
    for (const sid of [...(att.sources ?? []), ...(att.disputed ?? []).flatMap((d) => d.sources ?? [])]) {
      const src = sourceRecords.get(sid);
      if (src?.url && !src.accessed) citedUndated.add(sid);
    }
  }
  for (const sid of citedUndated) {
    report.error('7', rec.file, `cites source "${sid}", which has a url but no accessed date.`);
  }

  // 9, 12, 16 — confidence rules
  for (const [ptr, att] of Object.entries(atts)) {
    const tiers = (att.sources ?? []).map(tierOf).filter((t) => t !== null);
    for (const [i, sid] of (att.sources ?? []).entries()) {
      if (tierOf(sid) === 5) report.error('12', rec.file, `${ptr} cites tier 5 source "${sid}". Tier 5 is inadmissible; record it as a lead in notes instead.`);
      void i;
    }
    if (att.confidence === 'confirmed') {
      const hasTier1 = tiers.includes(1);
      const tier2Plus = new Set((att.sources ?? []).filter((s) => (tierOf(s) ?? 9) <= 2));
      // Rule 9 says "independent", so it must mean it. Counting distinct source ids alone
      // let several pages from ONE publisher pass as mutual corroboration - a publisher
      // repeating itself is one evidence chain, not two. Sources with no publisher recorded
      // are treated as distinct, so a missing field cannot silently merge two real sources.
      const publishersOf = (ids) => {
        const out = new Set();
        for (const id of ids) {
          const p = sourceRecords.get(id)?.publisher;
          out.add(p ? `pub:${String(p).trim().toLowerCase()}` : `src:${id}`);
        }
        return out;
      };
      const independentPublishers = publishersOf(tier2Plus);
      if (!hasTier1 && tier2Plus.size < 2) {
        report.error('9', rec.file, `${ptr} is "confirmed" but has neither a tier 1 source nor two independent tier 1-2 sources.`);
      } else if (!hasTier1 && independentPublishers.size < 2) {
        report.error('9', rec.file, `${ptr} is "confirmed" on ${tier2Plus.size} tier 1-2 sources that all share one publisher (${[...independentPublishers][0].replace(/^pub:/, '')}). One publisher repeating itself is a single evidence chain, not independent corroboration.`);
      }
      if (att.derived_from === 'sampled_from_image' || att.derived_from === 'inferred') {
        report.error('16', rec.file, `${ptr} is "confirmed" but derived_from is "${att.derived_from}". A value read off an image or reasoned out may never be confirmed.`);
      }
    }
    // 11 — a dispute must actually record a disagreement
    if (att.confidence === 'disputed') {
      if ((att.disputed ?? []).length < 2) {
        report.error('11', rec.file, `${ptr} is "disputed" but records fewer than two candidate values.`);
      } else {
        const sets = att.disputed.map((d) => (d.sources ?? []).join('|'));
        if (new Set(sets).size < sets.length) {
          report.error('11', rec.file, `${ptr} has candidate values sharing an identical source list; that is one source, not a dispute.`);
        }
      }
    }
    if ((att.disputed ?? []).length >= 2 && att.confidence !== 'disputed' && !att.adjudication) {
      report.error('11', rec.file, `${ptr} carries candidate values but neither confidence "disputed" nor an adjudication.`);
    }
  }

  // 10 — a rarity level above uncommon is an argument, not a label
  const level = doc.rarity?.level;
  if (level && !['common', 'uncommon', 'unknown'].includes(level) && !doc.rarity?.basis) {
    report.error('10', rec.file, `rarity.level "${level}" requires rarity.basis.`);
  }

  // 13, 14 — the two figures this archive refuses to store
  const forbidden = [];
  (function scan(node, path) {
    if (Array.isArray(node)) return node.forEach((n, i) => scan(n, `${path}/${i}`));
    if (!node || typeof node !== 'object') return;
    for (const [k, v] of Object.entries(node)) {
      const p = `${path}/${k}`;
      if (/^(current_value|estimated_value|market_value|valuation|value_estimate)$/.test(k)) forbidden.push(['13', p]);
      if (path.endsWith('/rarity') && /^(score|rating|index|numeric)$/.test(k)) forbidden.push(['14', p]);
      scan(v, p);
    }
  })(doc, '');
  for (const [rule, p] of forbidden) {
    report.error(rule, rec.file, rule === '13'
      ? `${p} is a computed valuation. No current value is stored until the evidence model supports one.`
      : `${p} is a numeric rarity score. Rarity stays qualitative; the exhibition derives any indicator at render time.`);
  }

  // 15 — conditional admissions are argued, not asserted
  if (doc.scope_class === 'conditional') {
    if (!doc.scope_justification) {
      report.error('15', rec.file, 'scope_class "conditional" requires scope_justification.');
    }
    const att = atts['/scope_justification'];
    const tiers = (att?.sources ?? []).map(tierOf).filter((t) => t !== null);
    if (!tiers.some((t) => t <= 3)) {
      report.error('15', rec.file, 'scope_class "conditional" requires an attestation on /scope_justification citing at least one tier 1-3 source.');
    }
  }

  // 17 — claims about the world, not bookkeeping
  for (const [i, rel] of (doc.relationships ?? []).entries()) {
    if (!['rebrand_of', 'modified_from'].includes(rel.type)) continue;
    const att = atts[`/relationships/${i}`];
    const tiers = (att?.sources ?? []).map(tierOf).filter((t) => t !== null);
    if (!tiers.some((t) => t <= 2)) {
      report.error('17', rec.file, `relationships/${i} asserts "${rel.type}" without an attestation citing a tier 1-2 source. Resemblance is a lead, not a claim.`);
    }
  }
}

// ---------------------------------------------------------------- source self-consistency
for (const rec of records.filter((r) => r.entity === 'source')) {
  const doc = rec.doc;
  if (!doc) continue;
  if (doc.url && !doc.accessed) report.error('7', rec.file, 'source has a url but no accessed date.');
  if (doc.preservation_method === 'none') {
    report.warn('8', rec.file, 'preservation_method is "none". This source cannot back a critical field.');
  }
  const declared = doc.tier;
  const dflt = sourceTier({ kind: doc.kind }, vocabs);
  if (Number.isInteger(declared) && declared !== dflt && !doc.reliability_note) {
    report.error('7', rec.file, `tier ${declared} overrides the default ${dflt} for kind "${doc.kind}" without a reliability_note explaining why.`);
  }
}

report.exit();
