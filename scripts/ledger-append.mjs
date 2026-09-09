#!/usr/bin/env node
// Append lines to a named field of a ledger issue, without a YAML round-trip.
//
// Written 2026-09-09 after making the same mistake three times. The ledger's issues are
// hand-formatted with block scalars and comments, so rewriting them through a YAML parser
// destroys the formatting — which is why every edit has been done as text. But "insert before
// the `recommendation:` line" is wrong whenever the issue has a `counterevidence:` field, and
// three separate updates silently landed in COUNTEREVIDENCE, which inverts their meaning: a
// corroborating measurement filed as evidence against the issue.
//
// Each was caught by reading the parsed field back afterwards. This exists so the next one is
// not caught at all, because it does not happen.
//
//   node scripts/ledger-append.mjs <issue-id> <field> <<'TXT'
//   ...lines, already indented as they should appear...
//   TXT
import { readFileSync, writeFileSync } from 'node:fs';

const [id, field] = process.argv.slice(2);
if (!id || !field) { console.error('usage: ledger-append.mjs <issue-id> <field>  (body on stdin)'); process.exit(2); }
const body = readFileSync(0, 'utf8').replace(/\n$/, '');
if (!body.trim()) { console.error('nothing on stdin'); process.exit(2); }

const path = 'research/qc/pass2-remediation-ledger.yml';
const lines = readFileSync(path, 'utf8').split('\n');

const start = lines.findIndex((l) => l.trim() === `- id: ${id}`);
if (start < 0) { console.error(`no issue ${id}`); process.exit(1); }
const end = lines.findIndex((l, i) => i > start && l.trim().startsWith('- id: '));
const stop = end < 0 ? lines.length : end;

const fieldAt = lines.findIndex((l, i) => i >= start && i < stop && l.startsWith(`    ${field}:`));
if (fieldAt < 0) { console.error(`issue ${id} has no field ${field}`); process.exit(1); }

// The field ends where the NEXT top-level field of the same issue begins — not at some
// hard-coded field name. That is the whole bug this script exists to prevent.
let after = stop;
for (let i = fieldAt + 1; i < stop; i += 1) {
  if (/^ {4}[a-z_]+:/.test(lines[i])) { after = i; break; }
}
lines.splice(after, 0, ...body.split('\n'));
writeFileSync(path, lines.join('\n'));
console.log(`appended ${body.split('\n').length} line(s) to ${id}.${field}`);
