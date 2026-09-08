// Import all discipline data
import { animalism } from '../../data/vampire/disciplines/animalism.js';
import { auspex } from '../../data/vampire/disciplines/auspex.js';
import { bloodSorcery } from '../../data/vampire/disciplines/blood_sorcery.js';
import { celerity } from '../../data/vampire/disciplines/celerity.js';
import { dominate } from '../../data/vampire/disciplines/dominate.js';
import { fortitude } from '../../data/vampire/disciplines/fortitude.js';
import { obfuscate } from '../../data/vampire/disciplines/obfuscate.js';
import { oblivion } from '../../data/vampire/disciplines/oblivion.js';
import { potence } from '../../data/vampire/disciplines/potence.js';
import { presence } from '../../data/vampire/disciplines/presence.js';
import { protean } from '../../data/vampire/disciplines/protean.js';
import { thinBloodAlchemy } from '../../data/vampire/disciplines/thin_blood_alchemy.js';
import { bloodSorceryRituals } from '../../data/vampire/disciplines/blood_sorcery_rituals.js';
import { oblivionCeremonies } from '../../data/vampire/disciplines/oblivion_ceremonies.js';

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