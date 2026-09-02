#!/usr/bin/env node
// Link health. Rule 31 of docs/data-architecture.md section 7.5.
//
// Offline by default: reports which sources are stale or unchecked without touching the
// network, so the check runs anywhere. Pass --fetch to actually request each URL and write
// link_status back into the source files.

import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadVocabularies, loadSchemas, loadRecords, DATA_ROOT, Report } from './lib/archive.mjs';

const FETCH = process.argv.includes('--fetch');
const STALE_DAYS = 180;

const report = new Report(`links — source availability (rule 31)${FETCH ? '' : ' [offline: staleness only, pass --fetch to request]'}`);
const vocabs = loadVocabularies();
loadSchemas(vocabs);
const sources = loadRecords().filter((r) => r.entity === 'source' && r.doc);

const withUrl = sources.filter((s) => s.doc.url);
report.note(`${sources.length} source(s), ${withUrl.length} with a URL.`);

const daysSince = (iso) => (iso ? Math.floor((Date.now() - Date.parse(iso)) / 86400000) : null);

if (!FETCH) {
  for (const rec of withUrl) {
    const age = daysSince(rec.doc.last_checked);
    if (age === null) report.warn('31', rec.file, 'never checked. Run with --fetch.');
    else if (age > STALE_DAYS) report.warn('31', rec.file, `last checked ${age} days ago.`);
    if (rec.doc.link_status && rec.doc.link_status !== 'live' && rec.doc.status === 'published') {
      report.warn('31', rec.file, `link_status is "${rec.doc.link_status}" on a published source. Preservation method is "${rec.doc.preservation_method}".`);
    }
  }
  report.print();
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
for (const rec of withUrl) {
  let status = 'dead';
  try {
    const res = await fetch(rec.doc.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    if (res.status === 401 || res.status === 402 || res.status === 403) status = 'paywalled';
    else if (res.ok) status = res.redirected ? 'redirected' : 'live';
    else status = 'dead';
  } catch {
    status = 'dead';
  }
  if (status !== 'live') {
    report.warn('31', rec.file, `link_status "${status}" — preserved by "${rec.doc.preservation_method}".`);
  }
  const path = join(DATA_ROOT, rec.file);
  const text = readFileSync(path, 'utf8');
  const patched = text
    .replace(/^link_status:.*$/m, `link_status: ${status}`)
    .replace(/^last_checked:.*$/m, `last_checked: "${today}"`);
  const withFields = /^link_status:/m.test(patched)
    ? patched
    : `${patched.trimEnd()}\nlink_status: ${status}\nlast_checked: "${today}"\n`;
  writeFileSync(path, withFields);
}
report.print();
process.exit(0);
