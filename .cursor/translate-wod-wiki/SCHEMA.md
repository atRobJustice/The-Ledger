# js/data sync notes

When translating mirrored wikitext into Ledger modules, **preserve each file’s existing schema**. Do not invent new top-level keys unless the app already reads them.

## Completeness contract

**Name:** `full_wiki_dump`  
**policyVersion:** `2`

For every mapped field already present on the JS object (mechanical **and** prose — culture, archetypes, notables, overviews, discipline blurbs, merit descriptions, etc.):

1. Wiki text wins after markup strip.
2. Do **not** paraphrase for brevity or “match neighbor tone” if that changes meaning or drops wiki content.
3. Expand/update nested entries within existing keys when the wiki has content (e.g. additional `notableCharacters`).
4. Do **not** invent new top-level keys the app does not already use.
5. Out of scope: content the mirrored wiki page does not contain (e.g. full loresheet dot-by-dot book text when the wiki only has a summary table).

## Edition quarantine

- Only pages with `edition: "v5"` in [consumption-manifest.json](consumption-manifest.json) may be translated.
- If `reference/vtm/index.json` lists `possible_v6` on a mapped title → **block apply** until the user says `treat as V5` or `skip`.
- Never translate `htr` / `wta` mirrors into `js/data` until a future consumption section exists.
- Prefer sources that cite V5 books (Corebook, Players Guide, etc.). Flag ambiguous edition-mixed text in the proposal.

## General rules

- Strip wiki markup: `[[Links]]`, `{{templates}}`, `<ref>...</ref>`, `'''bold'''`, section tags (`<section begin=.../>`).
- Preserve camelCase keys already used (`theoBell`, `bloodLeech`, `level1`).
- Keep `source` strings like `Vampire: The Masquerade Corebook, page N` when present.
- Aggregators (`js/data/vampire/clans.js`, `disciplines.js`) usually only need updates when a **new** clan/discipline module is added.

## By type

| Kind | Typical wiki sections → js fields |
|------|-----------------------------------|
| Clan | `{{Clan}}` nicknames/disciplines/bane/compulsion; `==Bane==`, `==Variant Bane==`, `==Compulsion==`, archetypes, culture, notables → matching object keys |
| Discipline | `{{Discipline}}` header; `==Overview==`; power tables by level → `powers.level1`…`level5` (`name`, `effect`, `cost`, `prerequisite`, `amalgam`, `duration`, `dicePool`, `opposingPool`, `notes`, `source`) |
| Rituals / Ceremonies / Alchemy | Level headings and entries → same power-entry shape as disciplines |
| Predator types | Per-type sections → `types.<key>` with `description`, `dicePools`, `benefits`, `drawbacks`, `source` |
| Merits & Flaws | Category headings → category objects with nested `merits` / `flaws` |
| Attributes / Skills | Category + trait sections → `physical` / `social` / `mental` trees with `dotValues` / examples |
| Backgrounds / Loresheets / Humanity / etc. | Mirror existing module shape; full wiki dump into existing fields (loresheets: summary depth only) |

## Review gate

Before writing `js/data/**`:

1. Load [applied-state.json](applied-state.json); only open pages with missing state, `policyVersion` &lt; 2, or changed `mirrorSha256`.
2. Work in **1–3 page batches** — never a single pass over the full manifest.
3. Show drift list: wiki → proposed js field updates under **full_wiki_dump**.
4. List **blocked V6 suspects** and **unmapped new pages** separately.
5. Wait for user approval (or an explicit “apply all” / implement-plan approval).
6. After apply, update applied-state for those ids.

Prefer field-accurate full dumps over tiny surgical patches when prose is badly drifted; still preserve schema shape.
