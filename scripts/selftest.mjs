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
  const expected = [2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 37, 38, 39, 44];
  const missing = expected.filter((r) => !fired.has(r));
  // Rule 9 has two distinct branches. Firing "9" at all does not prove the
  // publisher-independence branch works, so assert its message specifically.
  /share one publisher/.test(v.out)
    ? ok('rule 9 publisher independence fires', 'same-publisher sources rejected as corroboration')
    : bad('rule 9 publisher independence fires', 'no same-publisher [9] message in fail-fixture output');
  // Rule 15 has three branches, and until 2026-09-08 two of them did not exist: RESEARCH_SPEC
  // §2.2 claimed the rule blocked a conditional record "without both" a justification and a
  // legality position, while the code checked only the justification. Firing "15" at all proves
  // nothing about the legality half, so assert each branch's own message.
  /requires legality\.wca_status/.test(v.out)
    ? ok('rule 15 legality half fires', 'conditional model without legality is blocked')
    : bad('rule 15 legality half fires', 'no missing-legality [15] message in fail-fixture output');
  /admits conditional records at "not_legal" or "unknown"/.test(v.out)
    ? ok('rule 15 legality value branch fires', 'conditional record claiming "legal" is blocked')
    : bad('rule 15 legality value branch fires', 'no wca_status-value [15] message in fail-fixture output');
  /requires legality\.basis/.test(v.out)
    ? ok('rule 15 legality basis branch fires', 'status asserted without a stated basis is blocked')
    : bad('rule 15 legality basis branch fires', 'no missing-basis [15] message in fail-fixture output');
  // Rule 15 resolves a conditional VARIANT's justification and legality through its parent
  // model, so a variant never restates its model's argument. The pass fixture proves the
  // allowance (a variant supplying nothing validates clean); this proves inheritance does not
  // become an excuse when the parent supplies nothing either.
  /zz-bad-conditional-orphan[^\n]*requires scope_justification, here or on its model/.test(v.out)
    ? ok('rule 15 inheritance still blocks an orphan', 'conditional variant with an empty parent is caught')
    : bad('rule 15 inheritance still blocks an orphan', 'no orphan-variant [15] message in fail-fixture output');
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
  const lintExpected = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 40, 41, 42, 43, 45, 46, 47, 48, 49];
  const lintMissing = lintExpected.filter((r) => !lintFired.has(r));
  lintMissing.length === 0
    ? ok('semantic warnings fire', `${lintExpected.join(', ')}`)
    : bad('semantic warnings fire', `never fired: ${lintMissing.join(', ')}`);
  l.code === 0 ? ok('lint never blocks') : bad('lint never blocks', `exit ${l.code}`);

  // Rule 40's precision allowance is the part that can silently rot. Asserting that "40" fired
  // proves only the conflict branch; a broken allowance would fire on every year-vs-month pair
  // and still pass that check. zz-ok-chronology-precision exists to be IGNORED, so assert its
  // absence too - the same lesson as rule 9, where a branch no fixture exercised was no guard.
  // Rule 44 is a path/id invariant, and its most dangerous branch is the quiet one: a record
  // whose model_id resolves perfectly while sitting in another model's directory. Nothing else
  // catches that, so assert the directory message rather than the rule number.
  /sits in directory .* but its model_id is/.test(v.out)
    ? ok('rule 44 misfiled-variant branch fires', 'variant in the wrong model directory is caught')
    : bad('rule 44 misfiled-variant branch fires', 'no misfiled-directory [44] message in validate output');

  // Rule 46's failure mode is silence: a variant that reads as fully specified to a human while
  // resolving its defining axis to nothing. Assert the message that says so.
  /so this variant's size resolves to nothing/.test(l.out)
    ? ok('rule 46 unresolvable-size branch fires', 'size named only in prose is caught')
    : bad('rule 46 unresolvable-size branch fires', 'no unresolvable-size [46] message in lint output');

  // Rule 45's whole point is catching a wrong value that sits INSIDE rule 18's plausible range,
  // where a bounds check is blind. Assert the branch that names the available item weight.
  /which its own sources give as a GROSS \(packaged\) weight/.test(l.out)
    ? ok('rule 45 gross-weight branch fires', 'packaged weight stored as a product spec is caught')
    : bad('rule 45 gross-weight branch fires', 'no gross-weight [45] message in lint output');

  // Rule 43 must police the whole confidence scale, not just one rung. The fail fixture happens
  // to exercise all three floors — confirmed, probable and reported — so assert the middle one
  // explicitly rather than trusting that firing 43 at all covers them.
  /is "probable" but its best cited source is tier/.test(l.out)
    ? ok('rule 43 confidence floor fires', 'probable on a tier-5 source is caught')
    : bad('rule 43 confidence floor fires', 'no probable-vs-tier [43] message in lint output');

  // Rule 42's duplicate-RECORD branch is the obvious one. The branches that matter are the two
  // CITATION branches, and the rule is only correct if it tells them apart — reporting them
  // alike raised 5 false positives out of 8 on real data. Assert each message specifically,
  // and assert that the chronological pair is NOT accused of double-counting.
  // Rule 25 gained an escape on 2026-09-09 — a recorded sibling search satisfies it. An untested
  // escape is how a rule quietly stops firing on everything, so assert the allowance holds AND
  // that the fail branch still fires beside it.
  /zz-ok-designated[^\n]*\[25\]|\[25\][^\n]*zz-ok-designated/.test(l.out)
    ? bad('rule 25 spares a recorded sibling search', 'fired on a designation whose search is attested')
    : ok('rule 25 spares a recorded sibling search', 'an attested /edition/designation satisfies the prompt');
  /zz-bad-solo[^\n]*\[25\]|\[25\][^\n]*zz-bad-solo/.test(l.out)
    ? ok('rule 25 still fires unsearched', 'a lone designated variant with no attestation is caught')
    : bad('rule 25 still fires unsearched', 'the escape swallowed the fail branch');
  // Rule 49 removes a record from the PUBLIC bundle, so its allowance matters as much as its
  // fail branch: without zz-ok-signed-exclusion the rule would be indistinguishable from one
  // forbidding reference_only outright, and the archive uses that class legitimately.
  /zz-bad-unsigned-exclusion[^\n]*\[49\]|\[49\][^\n]*zz-bad-unsigned-exclusion/.test(l.out)
    ? ok('rule 49 unsigned-exclusion branch fires', 'an unexplained removal from the public archive is caught')
    : bad('rule 49 unsigned-exclusion branch fires', 'no [49] message in lint output');
  /zz-ok-signed-exclusion[^\n]*\[49\]|\[49\][^\n]*zz-ok-signed-exclusion/.test(l.out)
    ? bad('rule 49 spares a signed exclusion', 'fired on a reference_only record that is signed and reasoned')
    : ok('rule 49 spares a signed exclusion', 'a properly recorded lineage exclusion is not flagged');
  // Rule 48's allowance is the half that can silently rot. The fail branch is obvious; what
  // must be proved is that a value DERIVED from a source stating only ounces is not accused of
  // being unevidenced, or the rule degenerates into a ban on unit conversion.
  /zz-ok-derived-conversion[^\n]*\[48\]|\[48\][^\n]*zz-ok-derived-conversion/.test(l.out)
    ? bad('rule 48 derived-value allowance holds', 'fired on a documented conversion whose basis is preserved')
    : ok('rule 48 derived-value allowance holds', 'a gram value converted from ounces is not called unevidenced');
  /zz-bad-model[^\n]*\[48\]|\[48\][^\n]*zz-bad-model/.test(l.out)
    ? ok('rule 48 missing-evidence branch fires', 'a spec absent from every cited source is caught')
    : bad('rule 48 missing-evidence branch fires', 'no [48] message in lint output');
  // Rule 47 has two branches and they fail differently: a midnight timestamp resolves to
  // SOMETHING (just not stably), a calendar wildcard resolves to nothing at all. Assert both,
  // because a rule that only caught the wildcard would have missed all ten real records.
  /zz-unpinned-midnight[^\n]*\[47\]|\[47\][^\n]*zz-unpinned-midnight/.test(l.out)
    ? ok('rule 47 midnight branch fires', 'a date-rounded capture request is caught')
    : bad('rule 47 midnight branch fires', 'no midnight [47] message in lint output');
  /zz-unpinned-wildcard[^\n]*\[47\]|\[47\][^\n]*zz-unpinned-wildcard/.test(l.out)
    ? ok('rule 47 wildcard branch fires', 'a calendar-search url claiming to be a capture is caught')
    : bad('rule 47 wildcard branch fires', 'no wildcard [47] message in lint output');
  /zz-dup-page-[ab][^\n]*one capture of one page under different ids|one capture of one page under different ids[^\n]*zz-dup-page/.test(l.out)
    ? ok('rule 42 false-corroboration branch fires', 'attestation citing one capture twice is caught')
    : bad('rule 42 false-corroboration branch fires', 'no same-capture citation [42] message in lint output');
  /zz-capture-20(20|25)[^\n]*different captures of ONE page/.test(l.out)
    ? ok('rule 42 chronology branch fires', 'two captures of one page reported, in weaker terms')
    : bad('rule 42 chronology branch fires', 'no different-captures [42] message in lint output');
  !/zz-capture-20(20|25)[^\n]*That is one source, not/.test(l.out)
    ? ok('rule 42 spares an honest chronology', 'two captures are not called double-counting')
    : bad('rule 42 spares an honest chronology', 'chronological pair wrongly reported as one source');
  !/zz-ok-chronology-precision[^\n]*\[40\]|\[40\][^\n]*zz-ok-chronology-precision/.test(l.out)
    ? ok('rule 40 precision allowance holds', 'year-vs-month pair not flagged')
    : bad('rule 40 precision allowance holds', 'fired on a model within its family precision window');
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
