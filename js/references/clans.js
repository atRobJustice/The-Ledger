// Import all clan data
import { banuHaqim } from './clans/banu_haqim.js';
import { brujah } from './clans/brujah.js';
import { caitiff } from './clans/caitiff.js';
import { gangrel } from './clans/gangrel.js';
import { hecata } from './clans/hecata.js';
import { lasombra } from './clans/lasombra.js';
import { malkavian } from './clans/malkavian.js';
import { ministry } from './clans/ministry.js';
import { nosferatu } from './clans/nosferatu.js';
import { ravnos } from './clans/ravnos.js';
import { salubri } from './clans/salubri.js';
import { thinblood } from './clans/thinblood.js';
import { toreador } from './clans/toreador.js';
import { tremere } from './clans/tremere.js';
import { tzimisce } from './clans/tzimisce.js';
import { ventrue } from './clans/ventrue.js';

// Export combined clan data
export const clans = {
  name: "Vampire Clans",
  description: "Clans are the major vampire lineages in Vampire: The Masquerade. Each clan has its own unique set of disciplines, bane, and compulsion that affects the vampire's existence.",
  types: {
    banu_haqim: banuHaqim,
    brujah: brujah,
    caitiff: caitiff,
    gangrel: gangrel,
    hecata: hecata,
    lasombra: lasombra,
    malkavian: malkavian,
    ministry: ministry,
    nosferatu: nosferatu,
    ravnos: ravnos,
    salubri: salubri,
    thinblood: thinblood,
    toreador: toreador,
    tremere: tremere,
    tzimisce: tzimisce,
    ventrue: ventrue
  }
};