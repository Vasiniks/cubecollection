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
//   NOTFINDING is for the other honest case: a lane recording something true about its own RUN
//   rather than about the archive — "WebSearch reported its budget exhausted", "wayback prefix
//   failed on every attempt". Those belong in a report and belong in no ledger, and without a
//   marker for them the only options were to file noise or to leave them looking unfiled.
//
//   UNFILED is a legitimate and useful state — "this finding is real and has no ledger entry
//   yet". It is loud rather than fatal, because the point is that a finding cannot go QUIET, not
//   that an agent must stop to file paperwork mid-lane. A dangling id IS an error: it means the
//   report cites an issue that does not exist.
//
// P26-2 LANE C, 2026-09-12. Two additions, both to the direction the check above does not cover.
//
// 1. FIXTURE-ABLE. This script had zero selftest coverage — it read `research/qc` and the real
//    ledger by a hardcoded relative path, so nothing could exercise it against a synthetic
//    archive the way every other check is exercised. It now resolves both through CC_DATA_ROOT
//    (the same override lib/archive.mjs uses for the record tree), so tests/fixtures/{pass,fail}
//    can carry their own `research/qc/` and prove rule 50 and rule 51 actually fire, and don't
//    fire on the clean case. A rule that passes a test it never failed is testing nothing.
//
// 2. RULE 51 — LEDGER STATUS VOCABULARY. The chain this file checks ends "-> ledger id -> status
//    -> resolution", and nothing had ever checked the "status" link: `status:` is free text to
//    every tool that reads it. Measured 2026-09-12 across all 59 ledger issues: every one
//    currently holds one of the five documented values (open / in_progress / resolved / wont_fix
//    / needs_human_decision) — a clean baseline, not a defect list — so this rule has zero
//    false-positive exposure on the real archive and exists to catch the next typo, not this one.
//
// WHAT WAS MEASURED AND NOT SHIPPED. The reverse link this file's own header calls out as
// unmeasured — "does a ledger issue cite back to the report that raised it" — was measured, not
// built into a rule. Of 59 ledger issues, only 13 are cited by any report's `escalations:` block
// anywhere in the archive; the other 46 predate the block convention (introduced 2026-09-09) or
// are meta-findings the main session filed directly while auditing the ledger itself rather than
// escalated up from an agent's report. A rule requiring the backlink would fire on 46 of 59
// issues — 78% — forever, for structural reasons that have nothing to do with whether the finding
// is sound. That is exactly the "cries wolf" failure mode this file's own header warns about, so
// it is reported as the "reverse direction" line in this check's own output and NOT enforced.
// See research/qc/p26-2-escalation-linkage.md for the full measurement. (No audit sweep was
// added for it: the number belongs next to the forward-direction counts it qualifies, not in a
// separate place a reader has to know to look.)

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { Report, DATA_ROOT } from './lib/archive.mjs';

const disp = (p) => relative(DATA_ROOT, p).split(sep).join('/');

const LEDGER = join(DATA_ROOT, 'research/qc/pass2-remediation-ledger.yml');
const DIRS = ['research/qc', 'research/notes'].map((d) => join(DATA_ROOT, d));
const ID = /\b(P\d+-\d+|P26-\d+|P3-[A-Z]\d+|E\d+|D-[A-Z]\d+|C-[A-Z]\d+|S\d+)\b/;
const LANGUAGE = /\bescalat|\bflagged for\b|\bfor human (review|decision)\b/i;
// vocab/ is reserved for controlled vocabularies that constrain SCHEMA fields (see
// lib/archive.mjs loadVocabularies). The ledger is hand-maintained YAML outside data/ and schema/
// entirely, so its status vocabulary is documented only in its own header comment, not in a file
// this script can load — it is repeated here rather than invented.
const LEDGER_STATUSES = new Set(['open', 'in_progress', 'resolved', 'wont_fix', 'needs_human_decision']);

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
const ledgerText = existsSync(LEDGER) ? readFileSync(LEDGER, 'utf8') : '';
for (const m of ledgerText.matchAll(/^\s*-\s*id:\s*(\S+)/gm)) ledgerIds.add(m[1]);
report.note(`${ledgerIds.size} ledger issue(s) on file.`);

// Rule 51. Each issue's own block runs from its `- id:` line to the next one (or EOF), which is
// the same delimiter ledger-append.mjs uses to find a field's true end — reusing it here rather
// than a fresh convention for "where one issue's text stops".
const statusCounts = {};
if (ledgerText) {
  for (const block of ledgerText.split(/\n(?=  - id: )/).slice(1)) {
    const id = /^\s*- id:\s*(\S+)/.exec(block)?.[1];
    if (!id) continue;
    const statusMatch = /\n\s*status:\s*(\S+)/.exec(block);
    const status = statusMatch?.[1]?.replace(/^["']|["']$/g, '');
    statusCounts[status ?? '(missing)'] = (statusCounts[status ?? '(missing)'] ?? 0) + 1;
    if (!status) {
      report.error('51', disp(LEDGER), `ledger issue ${id} has no status: field. The chain this file checks ends "-> status -> resolution" and an issue with no status cannot be resolved, reopened, or counted.`);
    } else if (!LEDGER_STATUSES.has(status)) {
      report.error('51', disp(LEDGER), `ledger issue ${id} has status "${status}", which is not one of open / in_progress / resolved / wont_fix / needs_human_decision. Either it is a typo or the vocabulary needs a sixth value added deliberately, not by accident.`);
    }
  }
}
report.note(`ledger status distribution: ${Object.entries(statusCounts).map(([k, n]) => `${k} ${n}`).join(' · ') || '(no issues)'}`);

const reports = DIRS.flatMap((d) => walk(d));
let declared = 0, linked = 0, unfiled = 0, loose = 0, silent = 0, notfinding = 0;
const dangling = [];
const reachedLedgerIds = new Set();

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
    if (/\bNOTFINDING\b/.test(raw)) { notfinding += 1; continue; }
    if (/\bUNFILED\b/.test(raw)) { unfiled += 1; continue; }
    const m = ID.exec(raw);
    if (!m) { loose += 1; continue; }
    if (ledgerIds.has(m[1])) { linked += 1; reachedLedgerIds.add(m[1]); }
    else { dangling.push([file, m[1]]); }
  }
}

report.note(`${reports.length} report(s) scanned, ${declared} declared escalation entr(ies).`);
report.note(`  linked to a ledger issue : ${linked}`);
report.note(`  marked UNFILED           : ${unfiled}   <- loud on purpose, not an error`);
report.note(`  marked NOTFINDING        : ${notfinding}   <- a run condition, not an archive defect`);
report.note(`  free prose, no id at all : ${loose}   <- cannot be matched to anything`);
report.note(`  reports with escalation language and no block : ${silent}`);
// The reverse direction (ledger -> report), measured but deliberately not enforced — see the
// P26-2 LANE C header comment above for why a rule here would be noise, not signal.
report.note(`  ledger issues reached by at least one block (reverse direction) : ${reachedLedgerIds.size} of ${ledgerIds.size}   <- measured, NOT enforced (see the header)`);

for (const [file, id] of dangling) report.error('50', disp(file), `declares escalation ${id}, which is not in the ledger. Either the id is wrong or the issue was never filed.`);
if (loose) {
  report.warn('50', disp(LEDGER), `${loose} declared escalation entr(ies) carry no ledger id and no UNFILED marker. They cannot be matched to an issue, which is the exact state that lost findings in Pass 3 — mark each with an id or with UNFILED.`);
}
report.print();
process.exit(report.errors.length ? 1 : 0);
