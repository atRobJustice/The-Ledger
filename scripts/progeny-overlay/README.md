# Progeny Ledger overlay

Patches applied by `scripts/build-progeny.mjs` to a **temp copy** of
`vendor/progeny/frontend` before building the static creator hosted at `/progeny/`.

The git submodule stays clean; only this overlay + the committed `progeny/`
build output ship with Ledger.

| Overlay file | Destination |
|--------------|-------------|
| `index.tsx` | `src/routes/index.tsx` |
| `LedgerReturnLink.tsx` | `src/components/LedgerReturnLink.tsx` |
| `LoadModal.tsx` | `src/components/LoadModal.tsx` (auto-detect Ledger/Progeny JSON) |

Also copied from Ledger: `js/core/utils/character-format.js` → `src/utils/characterFormat.js`.
