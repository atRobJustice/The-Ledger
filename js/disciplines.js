// Import all discipline data
import { animalism } from './references/disciplines/animalism.js';
import { auspex } from './references/disciplines/auspex.js';
import { bloodSorcery } from './references/disciplines/blood_sorcery.js';
import { celerity } from './references/disciplines/celerity.js';
import { dominate } from './references/disciplines/dominate.js';
import { fortitude } from './references/disciplines/fortitude.js';
import { obfuscate } from './references/disciplines/obfuscate.js';
import { oblivion } from './references/disciplines/oblivion.js';
import { potence } from './references/disciplines/potence.js';
import { presence } from './references/disciplines/presence.js';
import { protean } from './references/disciplines/protean.js';
import { thinBloodAlchemy } from './references/disciplines/thin_blood_alchemy.js';
import { bloodSorceryRituals } from './references/disciplines/blood_sorcery_rituals.js';
import { oblivionCeremonies } from './references/disciplines/oblivion_ceremonies.js';

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