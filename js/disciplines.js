// Remove ES6 imports - use window references
// import { animalism } from './references/disciplines/animalism.js';
// ... (all other imports)

const animalism = window.animalism;
const auspex = window.auspex;
const bloodSorcery = window.bloodSorcery;
const celerity = window.celerity;
const dominate = window.dominate;
const fortitude = window.fortitude;
const obfuscate = window.obfuscate;
const oblivion = window.oblivion;
const potence = window.potence;
const presence = window.presence;
const protean = window.protean;
const thinBloodAlchemy = window.thinBloodAlchemy;
const bloodSorceryRituals = window.bloodSorceryRituals;
const oblivionCeremonies = window.oblivionCeremonies;

// Export combined discipline data
const disciplinesData = {
  name: "Vampire Disciplines",
  description: "From the moment of the Embrace, Kindred gain access to powers colloquially known as Disciplines. These powers are developed and fueled by the Resonances of the victims they feed from, and allow the vampires to harness their Blood-borne abilities against others.",
  types: {
    animalism,
    auspex,
    bloodSorcery,
    celerity,
    dominate,
    fortitude,
    obfuscate,
    oblivion,
    potence,
    presence,
    protean,
    thinBloodAlchemy,
    bloodSorceryRituals,
    oblivionCeremonies
  }
};
window.disciplines = disciplinesData;
// Remove ES6 export - use traditional script loading
// export const disciplines = { ... }