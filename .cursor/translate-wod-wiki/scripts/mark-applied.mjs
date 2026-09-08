#!/usr/bin/env node
/**
 * Mark consumption-manifest page ids as applied at current mirror sha + policyVersion 2.
 *
 *   node .cursor/translate-wod-wiki/scripts/mark-applied.mjs <id> [id...]
 *   node .cursor/translate-wod-wiki/scripts/mark-applied.mjs --all
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(skillRoot, '../..');
const POLICY_VERSION = 2;

const manifest = JSON.parse(
  fs.readFileSync(path.join(skillRoot, 'consumption-manifest.json'), 'utf8')
);
const indexPath = path.join(repoRoot, 'reference/vtm/index.json');
const statePath = path.join(skillRoot, 'applied-state.json');

if (!fs.existsSync(indexPath)) {
  console.error('Missing reference/vtm/index.json');
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8').replace(/^\uFEFF/, ''));
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
state.pages ??= {};

const args = process.argv.slice(2);
const ids =
  args[0] === '--all'
    ? manifest.pages.map((p) => p.id)
    : args;

if (!ids.length) {
  console.error('Usage: mark-applied.mjs <id> [id...] | --all');
  process.exit(1);
}

const byId = Object.fromEntries(manifest.pages.map((p) => [p.id, p]));
const now = new Date().toISOString();

for (const id of ids) {
  const page = byId[id];
  if (!page) {
    console.error(`Unknown manifest id: ${id}`);
    process.exit(1);
  }
  const entry = index.pages?.[page.wikiTitle];
  const sha = entry?.sha256;
  if (!sha) {
    console.error(`No sha256 in index for wikiTitle: ${page.wikiTitle}`);
    process.exit(1);
  }
  state.pages[id] = {
    wikiTitle: page.wikiTitle,
    mirrorSha256: sha,
    policyVersion: POLICY_VERSION,
    appliedAt: now,
  };
  console.log(`marked ${id} @ ${sha.slice(0, 12)}…`);
}

fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
