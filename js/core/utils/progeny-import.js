/**
 * Progeny → Ledger conversion (compat re-export).
 * Prefer importing from ./character-format.js for new code.
 */
export {
  disciplineNameToKey,
  convertProgenyToLedger,
  convertLedgerToProgeny,
  detectCharacterFormat,
  toLedgerCharacter,
  toProgenyCharacter,
} from "./character-format.js";
