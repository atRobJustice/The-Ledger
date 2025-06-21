// Remove ES6 imports - use traditional script loading
// import { banuHaqim } from './clans/banu_haqim.js';
// import { brujah } from './clans/brujah.js';
// import { caitiff } from './clans/caitiff.js';
// import { gangrel } from './clans/gangrel.js';
// import { hecata } from './clans/hecata.js';
// import { lasombra } from './clans/lasombra.js';
// import { malkavian } from './clans/malkavian.js';
// import { ministry } from './clans/ministry.js';
// import { nosferatu } from './clans/nosferatu.js';
// import { ravnos } from './clans/ravnos.js';
// import { salubri } from './clans/salubri.js';
// import { thinblood } from './clans/thinblood.js';
// import { toreador } from './clans/toreador.js';
// import { tremere } from './clans/tremere.js';
// import { tzimisce } from './clans/tzimisce.js';
// import { ventrue } from './clans/ventrue.js';

// Use window references instead
const banuHaqimRef = window.banuHaqim;
const brujahRef = window.brujah;
const caitiffRef = window.caitiff;
const gangrelRef = window.gangrel;
const hecataRef = window.hecata;
const lasombraRef = window.lasombra;
const malkavianRef = window.malkavian;
const ministryRef = window.ministry;
const nosferatuRef = window.nosferatu;
const ravnosRef = window.ravnos;
const salubriRef = window.salubri;
const thinbloodRef = window.thinblood;
const toreadorRef = window.toreador;
const tremereRef = window.tremere;
const tzimisceRef = window.tzimisce;
const ventrueRef = window.ventrue;

// Export combined clan data
const clans = {
  name: "Vampire Clans",
  description: "Clans are the major vampire lineages in Vampire: The Masquerade. Each clan has its own unique set of disciplines, bane, and compulsion that affects the vampire's existence.",
  types: {
    banu_haqim: banuHaqimRef,
    brujah: brujahRef,
    caitiff: caitiffRef,
    gangrel: gangrelRef,
    hecata: hecataRef,
    lasombra: lasombraRef,
    malkavian: malkavianRef,
    ministry: ministryRef,
    nosferatu: nosferatuRef,
    ravnos: ravnosRef,
    salubri: salubriRef,
    thinblood: thinbloodRef,
    toreador: toreadorRef,
    tremere: tremereRef,
    tzimisce: tzimisceRef,
    ventrue: ventrueRef
  }
};
window.clans = clans;