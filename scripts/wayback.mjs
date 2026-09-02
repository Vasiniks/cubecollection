#!/usr/bin/env node
// Web-archive access for researchers.
//
// WebFetch refuses web.archive.org, which is where most of this archive's evidence for
// discontinued products lives. This wraps the CDX API and snapshot fetching over plain HTTP
// so every agent uses one route instead of rediscovering the limitation.
//
//   node scripts/wayback.mjs list    <url> [--from 2016] [--to 2026] [--limit 40]
//   node scripts/wayback.mjs prefix  <url-prefix> [--limit 200]   enumerate captured URLs under a path
//   node scripts/wayback.mjs nearest <url> <YYYYMMDD>
//   node scripts/wayback.mjs get     <url> [YYYYMMDD]             snapshot text, tags stripped
//
// `prefix` is the discovery workhorse: it lists product URLs a retailer once had and has
// since deleted, which is exactly where discontinued products survive.

const CDX = 'https://web.archive.org/cdx/search/cdx';
const UA = 'cubecollection-archive-research/0.1 (+https://github.com/Vasiniks/cubecollection)';

const [cmd, target, ...rest] = process.argv.slice(2);
const flag = (name, dflt) => {
  const i = rest.indexOf(`--${name}`);
  return i === -1 ? dflt : rest[i + 1];
};

async function http(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(45000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function cdx(params) {
  const qs = new URLSearchParams({ output: 'json', ...params });
  const rows = JSON.parse((await http(`${CDX}?${qs}`)) || '[]');
  if (!rows.length) return [];
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((k, i) => [k, r[i]])));
}

const snapshotUrl = (ts, original) => `https://web.archive.org/web/${ts}/${original}`;

function usage(code = 2) {
  console.error(`usage:
  node scripts/wayback.mjs list    <url> [--from YYYY] [--to YYYY] [--limit N]
  node scripts/wayback.mjs prefix  <url-prefix> [--limit N]
  node scripts/wayback.mjs nearest <url> <YYYYMMDD>
  node scripts/wayback.mjs get     <url> [YYYYMMDD]`);
  process.exit(code);
}
if (!cmd || !target) usage();

try {
  if (cmd === 'list') {
    const rows = await cdx({
      url: target, fl: 'timestamp,original,statuscode,digest',
      collapse: 'digest', limit: flag('limit', '40'),
      ...(flag('from') ? { from: flag('from') } : {}),
      ...(flag('to') ? { to: flag('to') } : {}),
    });
    if (!rows.length) { console.log('no captures'); process.exit(0); }
    console.log(`${rows.length} distinct capture(s) — identical digests collapsed, so each row is a real change:\n`);
    for (const r of rows) {
      const t = r.timestamp;
      console.log(`  ${t.slice(0, 4)}-${t.slice(4, 6)}-${t.slice(6, 8)}  ${r.statuscode}  ${snapshotUrl(t, r.original)}`);
    }
  } else if (cmd === 'prefix') {
    const rows = await cdx({
      url: target, matchType: 'prefix', fl: 'original,timestamp,statuscode',
      collapse: 'urlkey', filter: 'statuscode:200', limit: flag('limit', '200'),
    });
    if (!rows.length) { console.log('no captures'); process.exit(0); }
    console.log(`${rows.length} distinct URL(s) captured under this prefix:\n`);
    for (const r of rows) console.log(`  ${r.timestamp.slice(0, 8)}  ${r.original}`);
  } else if (cmd === 'nearest') {
    const ts = rest[0] ?? target;
    const rows = await cdx({ url: target, fl: 'timestamp,original,statuscode', limit: '1', from: ts, to: ts.slice(0, 4) + '1231' });
    if (!rows.length) { console.log('no capture near that date'); process.exit(0); }
    console.log(snapshotUrl(rows[0].timestamp, rows[0].original));
  } else if (cmd === 'get') {
    const ts = rest[0];
    let url;
    if (ts) {
      const rows = await cdx({ url: target, fl: 'timestamp,original', limit: '1', from: ts });
      if (!rows.length) throw new Error('no capture at or after that date');
      url = snapshotUrl(`${rows[0].timestamp}id_`, rows[0].original);
    } else {
      const rows = await cdx({ url: target, fl: 'timestamp,original', limit: '-1' });
      if (!rows.length) throw new Error('no captures');
      url = snapshotUrl(`${rows.at(-1).timestamp}id_`, rows.at(-1).original);
    }
    const html = await http(url);
    console.log(`<!-- snapshot: ${url} -->`);
    console.log(html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
      .replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n+/g, '\n\n').trim());
  } else usage();
} catch (err) {
  console.error(`wayback: ${err.message}`);
  process.exit(1);
}
