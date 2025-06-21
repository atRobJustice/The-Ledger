// Remove ES6 imports - use traditional script loading
// All discipline files should be loaded before this file and assigned to window

// Export combined discipline data
const disciplinesRef = {
  name: "Vampire Disciplines",
  description: "From the moment of the Embrace, Kindred gain access to powers colloquially known as Disciplines. These powers are developed and fueled by the Resonances of the victims they feed from, and allow the vampires to harness their Blood-borne abilities against others.",
  types: {
    animalism: window.animalism,
    auspex: window.auspex,
    bloodSorcery: window.bloodSorcery,
    celerity: window.celerity,
    dominate: window.dominate,
    fortitude: window.fortitude,
    obfuscate: window.obfuscate,
    oblivion: window.oblivion,
    potence: window.potence,
    presence: window.presence,
    protean: window.protean,
    thinBloodAlchemy: window.thinBloodAlchemy,
    bloodSorceryRituals: window.bloodSorceryRituals,
    oblivionCeremonies: window.oblivionCeremonies
  }
};
window.disciplines = disciplinesRef;