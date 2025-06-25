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