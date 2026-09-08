---
name: translate-wod-wiki
description: >-
  Translate approved Vampire V5 wiki mirror pages from reference/vtm into
  Ledger js/data modules with a review gate. Blocks possible_v6-flagged pages
  unless explicitly overridden. Does not fetch live wikis (use refresh-wod-wiki).
  Use when asked to translate wiki dumps into js/data, sync V5 rules from the
  mirror, or review drift between reference/vtm and js/data.
disable-model-invocation: true
---

# Translate WoD wiki → Ledger js/data

Project skill (gitignored). Explicit invoke only.

**Does not fetch live wikis.** Run `refresh-wod-wiki` first if mirrors are missing or stale.

## Goal

1. Read `reference/vtm/` mirror + [consumption-manifest.json](consumption-manifest.json).
2. Propose schema-preserving updates to `js/data/**` under the **full_wiki_dump** contract.
3. Apply only after approval. Quarantine V6 suspects.
4. Record progress in [applied-state.json](applied-state.json) so Full review converges.

## Completeness contract (`full_wiki_dump`, policyVersion 2)

For every field that already exists on a mapped JS module (including culture, archetypes, notables, overviews, and mechanical power fields):

- Wiki text wins after markup strip (`[[ ]]`, `{{ }}`, `<ref>`, `'''`, section tags).
- Do **not** paraphrase for brevity.
- Expand/update entries **within existing keys** (e.g. add `notableCharacters.*` when the wiki has them and the module already has that object).
- Do **not** invent brand-new top-level schema keys unless the app already reads them.
- Out of scope: book-only content the mirrored page does not contain (e.g. loresheet •–••••• effect blocks beyond wiki summary tables); HTR/WTA; `possible_v6` without override.

## Sources

| Layer | Role |
|-------|------|
| `reference/vtm/` | Exact VTM wiki mirror from Refresh |
| [consumption-manifest.json](consumption-manifest.json) | Which pages may enter Ledger (V5 only) |
| [applied-state.json](applied-state.json) | Per-page mirror sha + policyVersion last applied |
| `js/data/**` | App-facing curated modules |

Field mapping: [SCHEMA.md](SCHEMA.md)  
Refresh skill: `../refresh-wod-wiki/SKILL.md`

## Hard rules

1. Only translate pages with `line: "vtm"` and `edition: "v5"` on the consumption manifest.
2. If `reference/vtm/index.json` has `flags` containing `possible_v6` for that title → **do not apply**; report under blocked suspects until user says `treat as V5` or `skip`.
3. Never translate HTR/WTA mirrors into `js/data` in this skill version.
4. Preserve existing ESM schemas; do not invent new top-level keys.
5. No silent writes — propose → approve → apply.
6. After apply, update `applied-state.json` for those manifest ids (`mirrorSha256`, `policyVersion: 2`, `appliedAt` ISO).

## Workflow

```
Translate progress:
- [ ] 1. Confirm mirror exists (reference/vtm/index.json)
- [ ] 2. Load consumption-manifest + index flags + applied-state
- [ ] 3. Select open pages (sha changed / missing state / policyVersion < 2)
- [ ] 4. Propose updates in page-sized batches (1–3 pages)
- [ ] 5. Apply approved updates only
- [ ] 6. Write applied-state for applied pages
- [ ] 7. Sanity check ESM + no leftover wiki markup
```

### 1. Mirror check

If `reference/vtm/index.json` is missing, tell the user to run:

```bash
node .cursor/skills/refresh-wod-wiki/scripts/fetch-wiki.mjs --line vtm
```

Optionally read `reference/vtm/last-refresh.json` and Refresh’s `.last-refresh-summary.json`.

### 2–4. Propose (page batches only)

**Never** attempt all 44 pages in one review. Batch **1–3** manifest pages per propose/apply cycle.

Open a page only if any of:

- No entry in `applied-state.json`
- `applied-state.pages[id].policyVersion` &lt; 2
- `applied-state.pages[id].mirrorSha256` ≠ current `index.pages[wikiTitle].sha256`

For each open page:

- Resolve content from `mirrorPath` (or `index.pages[title].path`).
- Compare to linked `jsData` modules using [SCHEMA.md](SCHEMA.md) under **full_wiki_dump**.
- Output:

```
Policy: full_wiki_dump (policyVersion 2)
Batch open pages: <id1>, <id2>, …

V5 updates:
1. <wikiTitle> → <js path>
   - field: old → new

Blocked V6 suspects:
- <title> (possible_v6) — skip until override

Already applied (skipped this batch):
- <id> @ sha… policy 2

Unmapped discovery (not in consumption-manifest):
- <titles> — informational only

Apply all V5 / select N / skip?
```

**Done criterion:** With unchanged mirror and all manifest pages at policyVersion 2 matching current shas → Full review reports **empty** V5 updates (blocked V6 list may still appear).

### 5–7. Apply + state + sanity

Only after explicit approval. Then:

1. Write `js/data/**` updates.
2. Set `applied-state.json` entries from current index sha256.
3. Verify exports, no `[[` / `{{` / `<ref` in user-facing strings, aggregators still resolve if files were added.

## Extending later

When Ledger gains Hunter/Werewolf data trees, add `edition: "v5"` pages with `line: "htr"` / `"wta"` to the consumption manifest and extend SCHEMA — do not loosen V6 quarantine.

Bump `policyVersion` in this skill + SCHEMA when the completeness contract changes; that re-opens all pages for review.

## Do not

- Call the live wiki API (that is Refresh)
- Auto-apply without approval
- Translate flagged `possible_v6` pages without override
- Commit `reference/` or treat applied-state as a substitute for user approval
- Re-open paraphrase / “concise tone” passes on pages already at policyVersion 2 with matching sha
