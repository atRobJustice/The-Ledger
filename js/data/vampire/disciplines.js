// Import all discipline data
import { animalism } from '../disciplines/animalism.js';
import { auspex } from '../disciplines/auspex.js';
import { bloodSorcery } from '../disciplines/blood_sorcery.js';
import { celerity } from '../disciplines/celerity.js';
import { dominate } from '../disciplines/dominate.js';
import { fortitude } from '../disciplines/fortitude.js';
import { obfuscate } from '../disciplines/obfuscate.js';
import { oblivion } from '../disciplines/oblivion.js';
import { potence } from '../disciplines/potence.js';
import { presence } from '../disciplines/presence.js';
import { protean } from '../disciplines/protean.js';
import { thinBloodAlchemy } from '../disciplines/thin_blood_alchemy.js';
import { bloodSorceryRituals } from '../disciplines/blood_sorcery_rituals.js';
import { oblivionCeremonies } from '../disciplines/oblivion_ceremonies.js';

// Export combined discipline data
export const disciplines = {
  name: "Vampire Disciplines",
  description: "From the moment of the Embrace, Kindred gain access to powers colloquially known as Disciplines. These powers are developed and fueled by the Resonances of the victims they feed from, and allow the vampires to harness their Blood-borne abilities against others.",
  types: {
    animalism: animalism,
    auspex: auspex,
    blood_sorcery: bloodSorcery,
    celerity: celerity,
    dominate: dominate,
    fortitude: fortitude,
    obfuscate: obfuscate,
    oblivion: oblivion,
    potence: potence,
    presence: presence,
    protean: protean,
    thin_blood_alchemy: thinBloodAlchemy,
    blood_sorcery_rituals: bloodSorceryRituals,
    oblivion_ceremonies: oblivionCeremonies
  }
};