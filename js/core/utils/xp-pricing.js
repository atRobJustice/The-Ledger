// Experience point pricing utilities for Ledger
// -------------------------------------------------
// ES module exposing getDotPrice and getTotalPrice.
// Each cost rule follows VTM5e core book.

// Cost calculator functions keyed by trait type
const COST_RULES = {
  attribute: (lvl) => lvl * 5,
  skill: (lvl) => lvl * 3,
  specialty: () => 3,
  bloodpotency: (lvl) => lvl * 10,
  ritual: (lvl) => lvl * 3, // Blood Sorcery Rituals, Oblivion Ceremonies, Thin-blood Alchemy
  merit: () => 3,
  background: () => 3,
  discipline: (lvl, { clanMatched = false, caitiff = false } = {}) => {
    if (caitiff) return lvl * 6;
    return lvl * (clanMatched ? 5 : 7);
  }
};

// Helper to normalise type keys (case & spaces)
function normaliseType(type) {
  if (!type) return '';
  return String(type).toLowerCase().replace(/\s+/g, '');
}

/**
 * Price for purchasing the specific new level (NOT cumulative).
 * @param {string} type - trait category, e.g. 'attribute', 'skill', 'discipline', 'bloodPotency'.
 * @param {number} newLevel - level being bought (1-5 etc.).
 * @param {object} [opts] - extra flags (clanMatched, caitiff).
 * @returns {number}
 */
export function getDotPrice(type, newLevel, opts = {}) {
  const key = normaliseType(type);
  const rule = COST_RULES[key];
  if (!rule) throw new Error(`Unknown XP cost type: ${type}`);
  return rule(newLevel, opts);
}

/**
 * Cumulative cost from currentLevel → desiredLevel (exclusive of already owned dots).
 * @param {string} type
 * @param {number} currentLevel
 * @param {number} desiredLevel
 * @param {object} [opts]
 * @returns {number}
 */
export function getTotalPrice(type, currentLevel, desiredLevel, opts = {}) {
  if (desiredLevel <= currentLevel) return 0;
  let sum = 0;
  for (let lvl = currentLevel + 1; lvl <= desiredLevel; lvl++) {
    sum += getDotPrice(type, lvl, opts);
  }
  return sum;
}

// Optional default export for convenience
export default { getDotPrice, getTotalPrice }; 