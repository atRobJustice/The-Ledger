/**
 * @fileoverview Discipline Utilities for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Centralized discipline data aggregation and utilities.
 *             Imports all discipline data from individual files and provides
 *             a unified interface for accessing discipline information, powers,
 *             and mechanics across the character sheet.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires animalism.js - Animalism discipline data
 * @requires auspex.js - Auspex discipline data
 * @requires blood_sorcery.js - Blood Sorcery discipline data
 * @requires celerity.js - Celerity discipline data
 * @requires dominate.js - Dominate discipline data
 * @requires fortitude.js - Fortitude discipline data
 * @requires obfuscate.js - Obfuscate discipline data
 * @requires oblivion.js - Oblivion discipline data
 * @requires potence.js - Potence discipline data
 * @requires presence.js - Presence discipline data
 * @requires protean.js - Protean discipline data
 * @requires thin_blood_alchemy.js - Thin Blood Alchemy discipline data
 * @requires blood_sorcery_rituals.js - Blood Sorcery rituals data
 * @requires oblivion_ceremonies.js - Oblivion ceremonies data
 * 
 * @namespace DisciplineUtils
 * @description Main namespace for discipline utilities
 * 
 * @property {Object} disciplines - Combined discipline data object
 * @property {string} disciplines.name - Name of the discipline collection
 * @property {string} disciplines.description - Description of disciplines
 * @property {Object} disciplines.types - Object containing all discipline types
 * 
 * @typedef {Object} DisciplineData
 * @property {string} name - Discipline name
 * @property {string} description - Discipline description
 * @property {string} overview - Discipline overview
 * @property {Object} powers - Discipline powers by level
 * @property {Array<string>} clans - Clans that have access to this discipline
 * @property {string} source - Source book for the discipline
 * 
 * @typedef {Object} DisciplinePower
 * @property {string} name - Power name
 * @property {string} description - Power description
 * @property {number} level - Power level requirement
 * @property {string} cost - Power activation cost
 * @property {string} duration - Power duration
 * @property {string} source - Source book for the power
 * 
 * @typedef {Object} DisciplineTypes
 * @property {DisciplineData} animalism - Animalism discipline
 * @property {DisciplineData} auspex - Auspex discipline
 * @property {DisciplineData} bloodSorcery - Blood Sorcery discipline
 * @property {DisciplineData} celerity - Celerity discipline
 * @property {DisciplineData} dominate - Dominate discipline
 * @property {DisciplineData} fortitude - Fortitude discipline
 * @property {DisciplineData} obfuscate - Obfuscate discipline
 * @property {DisciplineData} oblivion - Oblivion discipline
 * @property {DisciplineData} potence - Potence discipline
 * @property {DisciplineData} presence - Presence discipline
 * @property {DisciplineData} protean - Protean discipline
 * @property {DisciplineData} thinBloodAlchemy - Thin Blood Alchemy discipline
 * @property {DisciplineData} bloodSorceryRituals - Blood Sorcery rituals
 * @property {DisciplineData} oblivionCeremonies - Oblivion ceremonies
 * 
 * @example
 * // Access discipline data
 * const animalismData = disciplines.types.animalism;
 * 
 * // Get discipline powers
 * const powers = animalismData.powers;
 * 
 * // Check clan access
 * const hasAccess = animalismData.clans.includes('Gangrel');
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

// Import all discipline data
import { animalism } from '../../data/disciplines/animalism.js';
import { auspex } from '../../data/disciplines/auspex.js';
import { bloodSorcery } from '../../data/disciplines/blood_sorcery.js';
import { celerity } from '../../data/disciplines/celerity.js';
import { dominate } from '../../data/disciplines/dominate.js';
import { fortitude } from '../../data/disciplines/fortitude.js';
import { obfuscate } from '../../data/disciplines/obfuscate.js';
import { oblivion } from '../../data/disciplines/oblivion.js';
import { potence } from '../../data/disciplines/potence.js';
import { presence } from '../../data/disciplines/presence.js';
import { protean } from '../../data/disciplines/protean.js';
import { thinBloodAlchemy } from '../../data/disciplines/thin_blood_alchemy.js';
import { bloodSorceryRituals } from '../../data/disciplines/blood_sorcery_rituals.js';
import { oblivionCeremonies } from '../../data/disciplines/oblivion_ceremonies.js';

// Export combined discipline data
export const disciplines = {
  name: "Vampire Disciplines",
  description: "From the moment of the Embrace, Kindred gain access to powers colloquially known as Disciplines. These powers are developed and fueled by the Resonances of the victims they feed from, and allow the vampires to harness their Blood-borne abilities against others.",
  types: {
    animalism: animalism,
    auspex: auspex,
    bloodSorcery: bloodSorcery,
    celerity: celerity,
    dominate: dominate,
    fortitude: fortitude,
    obfuscate: obfuscate,
    oblivion: oblivion,
    potence: potence,
    presence: presence,
    protean: protean,
    thinBloodAlchemy: thinBloodAlchemy,
    bloodSorceryRituals: bloodSorceryRituals,
    oblivionCeremonies: oblivionCeremonies
  }
};