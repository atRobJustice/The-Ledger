/**
 * @fileoverview XP Pricing Utilities for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Experience point pricing utilities following VTM5e core book rules.
 *             Provides cost calculation functions for purchasing character improvements
 *             including attributes, skills, disciplines, specialties, blood potency,
 *             rituals, merits, and backgrounds.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires None - Pure utility functions, no external dependencies
 * 
 * @namespace XPPricing
 * @description Main namespace for XP pricing functionality
 * 
 * @property {Object} COST_RULES - Cost calculation rules for different trait types
 * 
 * @function normaliseType - Normalizes trait type keys for consistent lookup
 * @function getDotPrice - Calculates price for purchasing a specific new level
 * @function getTotalPrice - Calculates cumulative cost from current to desired level
 * 
 * @typedef {Object} CostRules
 * @property {Function} attribute - Cost function for attributes (level * 5)
 * @property {Function} skill - Cost function for skills (level * 3)
 * @property {Function} specialty - Cost function for specialties (3 XP)
 * @property {Function} bloodpotency - Cost function for blood potency (level * 10)
 * @property {Function} ritual - Cost function for rituals (level * 3)
 * @property {Function} merit - Cost function for merits (3 XP)
 * @property {Function} background - Cost function for backgrounds (3 XP)
 * @property {Function} discipline - Cost function for disciplines (varies by clan)
 * 
 * @typedef {Object} PricingOptions
 * @property {boolean} [clanMatched] - Whether discipline matches character's clan
 * @property {boolean} [caitiff] - Whether character is Caitiff
 * 
 * @typedef {string} TraitType
 * @description Valid trait types: 'attribute', 'skill', 'specialty', 'bloodpotency', 
 *              'ritual', 'merit', 'background', 'discipline'
 * 
 * @example
 * // Calculate cost for a single attribute dot
 * const cost = getDotPrice('attribute', 3); // Returns 15 XP
 * 
 * // Calculate total cost for multiple levels
 * const totalCost = getTotalPrice('skill', 2, 4); // Returns 9 XP (3+6)
 * 
 * // Calculate discipline cost with clan matching
 * const discCost = getDotPrice('discipline', 2, { clanMatched: true }); // Returns 10 XP
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

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