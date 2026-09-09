#!/usr/bin/env node
// Escalation roll-up — ledger P26-2 (critical) and P26-8 (high).
//
// THE FAILURE THIS EXISTS TO PREVENT. Pass 3 Batch 1 lanes C and D were killed by rate limits,
// their reports were never written, and 24 families and 56 models were enumerated with no
// roll-up at all. The ShengShou YuFeng finding survived ONLY because that agent also happened to
// write it into a source record's notes. A lane report that DID survive — Cyclone Boys/Maru —
// recorded ten missing family lines and still never reached the ledger. Nothing detected either,
// because a finding that was never written down breaks no invariant.
//
// THE LINKAGE THIS ENFORCES:
//
//     research report  ->  machine-readable `escalations:` block  ->  ledger issue id  ->  status
//
// Each arrow is checkable and each was previously absent. On 2026-09-09, of 25 declared
// escalation entries across 74 reports, ZERO cited a ledger id — so a report escalation and a
// ledger entry could not be matched by any means even when both had been written correctly.
//
// WHY IT DOES NOT SCAN PROSE FOR FINDINGS. A rule that treated every mention of "escalation" as
// an escalation would flag 37 reports, most of them discussing the concept rather than raising
// one, and a check that cries wolf gets ignored — which is how the archive lost findings in the
// first place. So the contract is narrow and explicit: if you DECLARE an escalation, it must
// carry a ledger id or be marked UNFILED. Declaring nothing is reported separately and softly.
//
// FORMAT. At the end of a report, an `escalations:` block whose every entry carries a ledger id
// or the marker UNFILED, in square brackets before the text:
//
//     escalations:
//       - [P4-9] MoYu WeiLong V11 absent from the frozen inventory
//       - [UNFILED] huameng-tg-v1 core_system vs "Ball-Core" naming
//
//   The bracket form was chosen over a nested `id:`/`summary:` mapping because it retrofits onto
//   the nine reports that already had free-prose blocks WITHOUT rewriting a word of their text.
//   A convention that forces existing findings to be re-typed is a convention that gets skipped.
//
//   UNFILED is a legitimate and useful state — "this finding is real and has no ledger entry
//   yet". It is loud rather than fatal, because the point is that a finding cannot go QUIET, not
//   that an agent must stop to file paperwork mid-lane. A dangling id IS an error: it means the
//   report cites an issue that does not exist.

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { Report } from './lib/archive.mjs';

const LEDGER = 'research/qc/pass2-remediation-ledger.yml';
const DIRS = ['research/qc', 'research/notes'];
const ID = /\b(P\d+-\d+|P26-\d+|P3-[A-Z]\d+|E\d+|D-[A-Z]\d+|C-[A-Z]\d+|S\d+)\b/;
const LANGUAGE = /\bescalat|\bflagged for\b|\bfor human (review|decision)\b/i;

const report = new Report('escalations — report to ledger linkage (P26-2, P26-8)');

const walk = (dir, acc = []) => {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
};

const ledgerIds = new Set();
if (existsSync(LEDGER)) {
  for (const m of readFileSync(LEDGER, 'utf8').matchAll(/^\s*-\s*id:\s*(\S+)/gm)) ledgerIds.add(m[1]);
}
report.note(`${ledgerIds.size} ledger issue(s) on file.`);

const reports = DIRS.flatMap((d) => walk(d));
let declared = 0, linked = 0, unfiled = 0, loose = 0, silent = 0;
const dangling = [];

for (const file of reports) {
  const text = readFileSync(file, 'utf8');
  const block = /^escalations:\s*\n((?:[ \t]+.*\n)*)/m.exec(text);
  if (!block) {
    if (LANGUAGE.test(text)) silent += 1;
    continue;
  }
  for (const raw of block[1].split('\n')) {
    if (!raw.trim().startsWith('-')) continue;
    declared += 1;
    if (/\bUNFILED\b/.test(raw)) { unfiled += 1; continue; }
    const m = ID.exec(raw);
    if (!m) { loose += 1; continue; }
    if (ledgerIds.has(m[1])) linked += 1;
    else { dangling.push([file, m[1]]); }
  }
}

report.note(`${reports.length} report(s) scanned, ${declared} declared escalation entr(ies).`);
report.note(`  linked to a ledger issue : ${linked}`);
report.note(`  marked UNFILED           : ${unfiled}   <- loud on purpose, not an error`);
report.note(`  free prose, no id at all : ${loose}   <- cannot be matched to anything`);
report.note(`  reports with escalation language and no block : ${silent}`);

for (const [file, id] of dangling) report.error('50', file, `declares escalation ${id}, which is not in the ledger. Either the id is wrong or the issue was never filed.`);
if (loose) {
  report.warn('50', LEDGER, `${loose} declared escalation entr(ies) carry no ledger id and no UNFILED marker. They cannot be matched to an issue, which is the exact state that lost findings in Pass 3 — mark each with an id or with UNFILED.`);
}
report.print();
process.exit(report.errors.length ? 1 : 0);
