#!/usr/bin/env node
/**
 * Report consumption-manifest pages blocked by possible_v6 flags in the VTM index.
 * Exit 0 always (informational). Used by Translate workflow / smoke tests.
 *
 *   node .cursor/skills/translate-wod-wiki/scripts/check-v6-blocks.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(skillRoot, '../../..');
const manifest = JSON.parse(
  fs.readFileSync(path.join(skillRoot, 'consumption-manifest.json'), 'utf8')
);
const indexPath = path.join(repoRoot, 'reference/vtm/index.json');

if (!fs.existsSync(indexPath)) {
  console.log('No reference/vtm/index.json — run refresh-wod-wiki first.');
  process.exit(0);
}

const indexRaw = fs.readFileSync(indexPath, 'utf8').replace(/^\uFEFF/, '');
const index = JSON.parse(indexRaw);
const blocked = [];
for (const p of manifest.pages) {
  if (p.edition !== 'v5' || p.line !== 'vtm') continue;
  const entry = index.pages?.[p.wikiTitle];
  if (entry?.flags?.includes('possible_v6')) {
    blocked.push(p.wikiTitle);
  }
}

if (!blocked.length) {
  console.log('No consumption-manifest pages currently flagged possible_v6.');
} else {
  console.log(`Blocked V6 suspects (${blocked.length}):`);
  for (const t of blocked) console.log(`  - ${t}`);
  console.log('Translate must not apply these without explicit override.');
}
