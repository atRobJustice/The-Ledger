# js/data sync notes

When translating mirrored wikitext into Ledger modules, **preserve each file’s existing schema**. Do not invent new top-level keys unless the app already reads them.

## Edition quarantine

- Only pages with `edition: "v5"` in [consumption-manifest.json](consumption-manifest.json) may be translated.
- If `reference/vtm/index.json` lists `possible_v6` on a mapped title → **block apply** until the user says `treat as V5` or `skip`.
- Never translate `htr` / `wta` mirrors into `js/data` until a future consumption section exists.
- Prefer sources that cite V5 books (Corebook, Players Guide, etc.). Flag ambiguous edition-mixed text in the proposal.

## General rules

- Strip wiki markup: `[[Links]]`, `{{templates}}`, `<ref>...</ref>`, `'''bold'''`, section tags (`<section begin=.../>`).
- Keep tone concise; match neighboring entries in the same file.
- Preserve camelCase keys already used (`theoBell`, `bloodLeech`, `level1`).
- Keep `source` strings like `Vampire: The Masquerade Corebook, page N` when present.
- Do **not** auto-add lore/notable-character fluff if the module omitted it on purpose — only update fields that already exist, unless the user asks to expand.
- Aggregators (`js/data/vampire/clans.js`, `disciplines.js`) usually only need updates when a **new** clan/discipline module is added.

## By type

| Kind | Typical wiki sections → js fields |
|------|-----------------------------------|
| Clan | `{{Clan}}` nicknames/disciplines/bane/compulsion; `==Bane==`, `==Variant Bane==`, `==Compulsion==`, archetypes, culture → matching object keys |
| Discipline | `{{Discipline}}` header; `==Overview==`; power tables by level → `powers.level1`…`level5` (`name`, `effect`, `cost`, `prerequisite`, `amalgam`, `duration`, `dicePool`, `opposingPool`, `notes`, `source`) |
| Rituals / Ceremonies / Alchemy | Level headings and entries → same power-entry shape as disciplines |
| Predator types | Per-type sections → `types.<key>` with `description`, `dicePools`, `benefits`, `drawbacks`, `source` |
| Merits & Flaws | Category headings → category objects with nested `merits` / `flaws` |
| Attributes / Skills | Category + trait sections → `physical` / `social` / `mental` trees with `dotValues` / examples |
| Backgrounds / Loresheets / Humanity / etc. | Mirror existing module shape; prefer surgical field updates over rewrites |

## Review gate

Before writing `js/data/**`:

1. Show a short drift list: wiki change → proposed js field updates.
2. List **blocked V6 suspects** and **unmapped new pages** separately.
3. Wait for user approval (or an explicit “apply all”).
4. Prefer minimal diffs. Never replace an entire large module when only one power/bane changed.
