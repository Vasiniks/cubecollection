#!/usr/bin/env node
// Proves the rules actually fire.
//
// The archive holds no records yet, so every check would pass trivially and prove nothing.
// This runs the whole toolchain against tests/fixtures instead: a miniature archive that
// must come out clean, and a set of records engineered to trip named rules. Fixtures are
// loaded through CC_DATA_ROOT and never touch data/.

import { spawnSync } from 'node:child_process';
import { rmSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib/archive.mjs';

const PASS = join(ROOT, 'tests/fixtures/pass');
const FAIL = join(ROOT, 'tests/fixtures/fail');
const TMP = join(ROOT, 'tests/.tmp-dist');

let failures = 0;
const ok = (name, detail = '') => console.log(`  ok    ${name}${detail ? `  — ${detail}` : ''}`);
const bad = (name, detail) => { failures += 1; console.log(`  FAIL  ${name}\n        ${detail}`); };

function run(script, { dataRoot, args = [] } = {}) {
  const res = spawnSync(process.execPath, [join(ROOT, 'scripts', script), ...args], {
    env: { ...process.env, ...(dataRoot ? { CC_DATA_ROOT: dataRoot } : {}) },
    encoding: 'utf8',
  });
  return { code: res.status, out: `${res.stdout}${res.stderr}` };
}
const rulesIn = (out) => new Set([...out.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])));

console.log('\nselftest — proving the checks fire');
console.log('─'.repeat(60));

// ---------------------------------------------------------------- 1. clean fixture
console.log('\n  pass fixture — an internally consistent miniature archive');
{
  const v = run('validate.mjs', { dataRoot: PASS });
  v.code === 0 ? ok('validate is clean') : bad('validate is clean', v.out.trim());
  const l = run('lint-semantic.mjs', { dataRoot: PASS });
  const warnings = [...l.out.matchAll(/\[(\d+)\]/g)].length;
  warnings === 0 ? ok('lint raises nothing') : bad('lint raises nothing', `${warnings} warning(s):\n${l.out}`);
  const d = run('check-duplicates.mjs', { dataRoot: PASS });
  d.code === 0 ? ok('duplicate queue is empty') : bad('duplicate queue is empty', d.out);
  !/\[29\]/.test(d.out)
    ? ok('lineage names are not flagged', 'a one-model family may share its model\'s name')
    : bad('lineage names are not flagged', 'rule 29 fired on a parent/child pair');
}

// ---------------------------------------------------------------- 2. every rule fires
console.log('\n  fail fixture — records engineered to trip named rules');
{
  const v = run('validate.mjs', { dataRoot: FAIL });
  v.code === 1 ? ok('validate exits non-zero') : bad('validate exits non-zero', `exit ${v.code}`);
  const fired = rulesIn(v.out);
  const expected = [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 37, 38, 39];
  const missing = expected.filter((r) => !fired.has(r));
  // Rule 9 has two distinct branches. Firing "9" at all does not prove the
  // publisher-independence branch works, so assert its message specifically.
  /share one publisher/.test(v.out)
    ? ok('rule 9 publisher independence fires', 'same-publisher sources rejected as corroboration')
    : bad('rule 9 publisher independence fires', 'no same-publisher [9] message in fail-fixture output');
  missing.length === 0
    ? ok('blocking rules fire', `${expected.join(', ')}`)
    : bad('blocking rules fire', `never fired: ${missing.join(', ')}`);
  if (!fired.has(1)) bad('schema validation fires', 'rule 1 never fired');
  else ok('schema validation fires');

  const dup = run('check-duplicates.mjs', { dataRoot: FAIL });
  /\[29\]/.test(dup.out)
    ? ok('identity collisions fire', 'rule 29 across unrelated lineages')
    : bad('identity collisions fire', 'the lineage exemption swallowed a real collision');

  const l = run('lint-semantic.mjs', { dataRoot: FAIL });
  const lintFired = rulesIn(l.out);
  const lintExpected = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
  const lintMissing = lintExpected.filter((r) => !lintFired.has(r));
  lintMissing.length === 0
    ? ok('semantic warnings fire', `${lintExpected.join(', ')}`)
    : bad('semantic warnings fire', `never fired: ${lintMissing.join(', ')}`);
  l.code === 0 ? ok('lint never blocks') : bad('lint never blocks', `exit ${l.code}`);
}

// ---------------------------------------------------------------- 2b. vocabulary injection
// Rule 4 is enforced indirectly: vocabularies are injected into the schemas as `enum` at load
// time, and a violation surfaces as rule 1. That indirection needs a positive assertion — if
// injection silently stopped, every vocab-constrained field would accept arbitrary strings,
// validate would pass, and a rejection-only test would stay green.
console.log('\n  vocabularies — injected into the schemas, not merely present on disk');
{
  const { loadVocabularies, loadSchemas } = await import('./lib/archive.mjs');
  const vocabs = loadVocabularies();
  const { raw } = loadSchemas(vocabs);
  const variant = raw.get('https://cubecollection/schema/variant.schema.json')?.schema;
  const coating = variant?.properties?.config?.properties?.coating;
  const expected = vocabs.get('coatings')?.set;

  Array.isArray(coating?.enum) && coating.enum.length === expected?.size
    ? ok('enum injected from vocabulary', `config.coating carries ${coating.enum.length} values`)
    : bad('enum injected from vocabulary', `config.coating enum is ${JSON.stringify(coating?.enum)}`);
  coating?.enum?.every((v) => expected?.has(v))
    ? ok('injected values match the vocabulary file')
    : bad('injected values match the vocabulary file', 'schema and vocab/coatings.yml disagree');

  const fired = rulesIn(run('validate.mjs', { dataRoot: FAIL }).out);
  fired.has(1) ? ok('an out-of-vocabulary value is rejected') : bad('an out-of-vocabulary value is rejected', 'nothing fired');
}

// ---------------------------------------------------------------- 3. build and redaction
console.log('\n  build — inheritance, derived fields, and the two bundles');
rmSync(TMP, { recursive: true, force: true });
{
  const b = run('build.mjs', { dataRoot: PASS, args: [`--out=${TMP}`] });
  b.code === 0 ? ok('build succeeds') : bad('build succeeds', b.out);

  const readJson = (p) => JSON.parse(readFileSync(join(TMP, p), 'utf8'));
  const pub = readJson('public/variant.json');
  const target = pub.find((v) => v.id === 'zz-testbrand-tf-v1--flagship-uv');

  target ? ok('published variant reaches the public bundle') : bad('published variant reaches the public bundle', 'not found');
  if (target) {
    target.resolved_specs?.core_system?.from === 'model'
      ? ok('inheritance resolves', 'core_system comes from the model')
      : bad('inheritance resolves', JSON.stringify(target.resolved_specs?.core_system));
    target.resolved_specs?.weight_g?.from === 'variant'
      ? ok('override wins', 'weight_g comes from the variant')
      : bad('override wins', JSON.stringify(target.resolved_specs?.weight_g));
    target.colorway?.completeness === 'render_ready'
      ? ok('colourway completeness derives')
      : bad('colourway completeness derives', target.colorway?.completeness);
    target.representation?.procedural?.renderable === false
      ? ok('renderable is false', 'geometry profiles are reserved; none exist')
      : bad('renderable is false', 'a variant claims to be renderable in a phase with no geometry profiles');
    /^sha1:[0-9a-f]{40}$/.test(target.fingerprint ?? '')
      ? ok('fingerprint derives') : bad('fingerprint derives', target.fingerprint);
    target.media?.every((m) => !('specimen_id' in m))
      ? ok('specimen linkage stripped from media') : bad('specimen linkage stripped from media', 'specimen_id survived');
    target.media?.every((m) => !['unclear', 'do_not_publish'].includes(m.rights_status))
      ? ok('unclear-rights media withheld') : bad('unclear-rights media withheld', 'unpublishable media survived');
    target.pricing?.observations?.every((o) => o.kind !== 'archivist_paid')
      ? ok('archivist_paid price withheld') : bad('archivist_paid price withheld', 'a private price survived');
  }
  !existsSync(join(TMP, 'public/specimen.json'))
    ? ok('no specimens in the public bundle') : bad('no specimens in the public bundle', 'specimen.json exists');
  existsSync(join(TMP, 'private/specimen.json'))
    ? ok('specimens kept in the private bundle') : bad('specimens kept in the private bundle', 'specimen.json missing');

  const p = run('check-privacy.mjs', { dataRoot: PASS, args: [`--dir=${TMP}`] });
  p.code === 0 ? ok('privacy gate passes a clean bundle') : bad('privacy gate passes a clean bundle', p.out);
}

// ---------------------------------------------------------------- 4. the gate must be able to fail
console.log('\n  privacy — a gate that cannot fail is not a gate');
{
  const poisoned = join(ROOT, 'tests/.tmp-poison');
  rmSync(poisoned, { recursive: true, force: true });
  mkdirSync(join(poisoned, 'public'), { recursive: true });
  writeFileSync(join(poisoned, 'public/variant.json'), JSON.stringify([{
    id: 'zz-leak', entity: 'variant',
    media: [{ id: 'm', specimen_id: 'zz-spec-0001', rights_status: 'unclear' }],
    pricing: { observations: [{ kind: 'archivist_paid' }] },
  }], null, 2));
  writeFileSync(join(poisoned, 'public/specimen.json'), JSON.stringify([
    { id: 'zz-spec-0001', entity: 'specimen', serial: 'X', location: 'Y', condition: 'mint' },
  ], null, 2));

  const p = run('check-privacy.mjs', { dataRoot: PASS, args: [`--dir=${poisoned}`] });
  const caught = {
    'specimen record': /is a specimen record/.test(p.out),
    'specimen_id': /specimen_id is a private field/.test(p.out),
    'private specimen id by value': /references private specimen/.test(p.out),
    'archivist_paid price': /archivist_paid price observation/.test(p.out),
    'unclear rights': /rights_status "unclear"/.test(p.out),
    'private specimen fields': /private on a specimen/.test(p.out),
  };
  p.code === 1 ? ok('privacy gate rejects a leaking bundle') : bad('privacy gate rejects a leaking bundle', `exit ${p.code}`);
  for (const [what, found] of Object.entries(caught)) {
    found ? ok(`catches ${what}`) : bad(`catches ${what}`, 'not detected');
  }
  rmSync(poisoned, { recursive: true, force: true });
}

// ---------------------------------------------------------------- 5. fixture containment
// This once asserted that data/ was empty, which was true only during Phase A setup and went
// permanently red the moment research began. What it was actually protecting is that synthetic
// fixtures never leak into the real archive — so assert that instead, which stays true forever.
console.log('\n  archive — real records only, no fixture contamination');
{
  const { loadRecords } = await import('./lib/archive.mjs');
  const records = loadRecords();
  const leaked = records.filter((r) => /(^|[^a-z])zz-/.test(r.doc?.id ?? ''));
  leaked.length === 0
    ? ok('no fixture ids in data/', `${records.length} real record(s)`)
    : bad('no fixture ids in data/', `synthetic record(s) leaked: ${leaked.map((r) => r.doc.id).join(', ')}`);

  const stagedInData = records.filter((r) => /^(tests|research)\//.test(r.file ?? ''));
  stagedInData.length === 0
    ? ok('no staging or fixture paths loaded as records')
    : bad('no staging or fixture paths loaded as records', stagedInData.map((r) => r.file).join(', '));
}

rmSync(TMP, { recursive: true, force: true });
console.log(`\n${failures ? `  FAIL — ${failures} check(s) failed` : '  PASS — every check behaved as specified'}\n`);
process.exit(failures ? 1 : 0);
