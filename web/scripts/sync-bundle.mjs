#!/usr/bin/env node
// Copies a BUILT BUNDLE into web/public/bundle/ so the exhibition can fetch it.
//
// This exists to keep one rule enforceable: presentation code reads a bundle,
// never data/. If the frontend imported the archive directly it would end up
// re-deriving archival semantics — inheritance, tiers, confidence — in a
// component, which is precisely the collapse the architecture forbids.
//
//   CC_BUNDLE=preview   (default) dist/preview — research preview, not a publication
//   CC_BUNDLE=public              dist/public  — publication; currently 0 records

import { cpSync, existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB = dirname(dirname(fileURLToPath(import.meta.url)));
const ROOT = dirname(WEB);
const bundle = process.env.CC_BUNDLE ?? 'preview';
const src = join(ROOT, 'dist', bundle);
const dest = join(WEB, 'public', 'bundle');

if (!existsSync(src)) {
  console.error(`sync-bundle: ${src} does not exist.`);
  console.error(bundle === 'preview'
    ? '  Run `npm run build:preview` in the repository root first.'
    : '  Run `npm run build` in the repository root first.');
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

const meta = JSON.parse(readFileSync(join(dest, 'meta.json'), 'utf8'));
const counts = Object.entries(meta.counts.public).filter(([, n]) => n > 0);
console.log(`sync-bundle: dist/${bundle} -> web/public/bundle`);
console.log(`  mode ${meta.mode}, ${meta.rendering_conventions} rendering convention(s)`);
console.log(`  ${counts.map(([k, n]) => `${k} ${n}`).join(', ') || 'no records'}`);
if (meta.mode === 'research-preview') {
  console.log('  NOTE: research preview. Records are researched, not curator-approved.');
}
