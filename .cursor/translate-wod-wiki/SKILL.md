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
2. Propose schema-preserving updates to `js/data/**`.
3. Apply only after approval. Quarantine V6 suspects.

## Sources

| Layer | Role |
|-------|------|
| `reference/vtm/` | Exact VTM wiki mirror from Refresh |
| [consumption-manifest.json](consumption-manifest.json) | Which pages may enter Ledger (V5 only) |
| `js/data/**` | App-facing curated modules |

Field mapping: [SCHEMA.md](SCHEMA.md)  
Refresh skill: `../refresh-wod-wiki/SKILL.md`

## Hard rules

1. Only translate pages with `line: "vtm"` and `edition: "v5"` on the consumption manifest.
2. If `reference/vtm/index.json` has `flags` containing `possible_v6` for that title → **do not apply**; report under blocked suspects until user says `treat as V5` or `skip`.
3. Never translate HTR/WTA mirrors into `js/data` in this skill version.
4. Preserve existing ESM schemas; surgical diffs only.
5. No silent writes — propose → approve → apply.

## Workflow

```
Translate progress:
- [ ] 1. Confirm mirror exists (reference/vtm/index.json)
- [ ] 2. Load consumption-manifest + index flags
- [ ] 3. Diff changed watched pages vs js/data
- [ ] 4. Propose updates (V5 / blocked V6 / unmapped discovery)
- [ ] 5. Apply approved updates only
- [ ] 6. Sanity check ESM + no leftover wiki markup
```

### 1. Mirror check

If `reference/vtm/index.json` is missing, tell the user to run:

```bash
node .cursor/skills/refresh-wod-wiki/scripts/fetch-wiki.mjs --line vtm
```

Optionally read `reference/vtm/last-refresh.json` and Refresh’s `.last-refresh-summary.json`.

### 2–4. Propose

For each consumption-manifest page whose mirror `sha256` / status changed (or when the user asks for a full review):

- Resolve content from `mirrorPath` (or `index.pages[title].path`).
- Compare to linked `jsData` modules using [SCHEMA.md](SCHEMA.md).
- Output:

```
V5 mechanical updates:
1. <wikiTitle> → <js path>
   - field: old → new

Blocked V6 suspects:
- <title> (possible_v6) — skip until override

Unmapped discovery (not in consumption-manifest):
- <new or high_churn titles from last-refresh> — informational only

Apply all V5 / select N / skip?
```

### 5–6. Apply + sanity

Only after explicit approval. Then verify exports, no `[[` / `{{` / `<ref` in user-facing strings, and aggregators still resolve if files were added.

## Extending later

When Ledger gains Hunter/Werewolf data trees, add `edition: "v5"` pages with `line: "htr"` / `"wta"` to the consumption manifest and extend SCHEMA — do not loosen V6 quarantine.

## Do not

- Call the live wiki API (that is Refresh)
- Auto-apply without approval
- Translate flagged `possible_v6` pages without override
- Commit `reference/` or skill runtime summaries
