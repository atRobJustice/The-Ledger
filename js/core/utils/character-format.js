/**
 * Detect and convert between Ledger and Progeny character JSON formats.
 * Client-side only — no network calls.
 */

const ATTRIBUTE_KEYS = [
  "strength",
  "dexterity",
  "stamina",
  "charisma",
  "manipulation",
  "composure",
  "intelligence",
  "wits",
  "resolve",
];

const SKILL_KEYS = [
  "athletics",
  "brawl",
  "craft",
  "drive",
  "firearms",
  "melee",
  "larceny",
  "stealth",
  "survival",
  "animal ken",
  "etiquette",
  "insight",
  "intimidation",
  "leadership",
  "performance",
  "persuasion",
  "streetwise",
  "subterfuge",
  "academics",
  "awareness",
  "finance",
  "investigation",
  "medicine",
  "occult",
  "politics",
  "science",
  "technology",
];

const CLAN_DISPLAY = {
  brujah: "Brujah",
  gangrel: "Gangrel",
  nosferatu: "Nosferatu",
  malkavian: "Malkavian",
  tremere: "Tremere",
  ventrue: "Ventrue",
  toreador: "Toreador",
  lasombra: "Lasombra",
  banu_haqim: "Banu Haqim",
  ministry: "Ministry",
  ravnos: "Ravnos",
  tzimisce: "Tzimisce",
  hecata: "Hecata",
  salubri: "Salubri",
  caitiff: "Caitiff",
  thin_blood: "Thin-blood",
};

const PREDATOR_DISPLAY = {
  alleycat: "Alleycat",
  extortionist: "Extortionist",
  roadsideKiller: "Roadside Killer",
  montero: "Montero",
  cleaver: "Cleaver",
  consensualist: "Consensualist",
  osiris: "Osiris",
  sceneQueen: "Scene Queen",
  siren: "Siren",
  sandman: "Sandman",
  grimReaper: "Grim Reaper",
  graverobber: "Graverobber",
  pursuer: "Pursuer",
  trapdoor: "Trapdoor",
  bagger: "Bagger",
  bloodLeech: "Blood Leech",
  farmer: "Farmer",
};

const DISCIPLINE_PROGENY = {
  animalism: "animalism",
  auspex: "auspex",
  celerity: "celerity",
  dominate: "dominate",
  fortitude: "fortitude",
  obfuscate: "obfuscate",
  potence: "potence",
  presence: "presence",
  protean: "protean",
  bloodSorcery: "blood sorcery",
  bloodsorcery: "blood sorcery",
  oblivion: "oblivion",
  thinBloodAlchemy: "thin-blood alchemy",
  thinbloodalchemy: "thin-blood alchemy",
};

const PROGENY_SCHEMA_VERSION = 9;

function toSnake(str = "") {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function toCamel(str = "") {
  const parts = str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/);
  if (!parts[0]) return "";
  return parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

function titleCaseWords(str = "") {
  return str
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function skillKeyToLedger(skill) {
  return String(skill || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
}

function skillKeyToProgeny(skill) {
  const lower = String(skill || "")
    .toLowerCase()
    .trim()
    .replace(/_/g, " ");
  return lower === "animal ken" ? "animal ken" : lower;
}

function traitDisplayName(key) {
  if (!key) return "";
  const spaced = String(key)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();
  return titleCaseWords(spaced);
}

/**
 * Map a Progeny discipline display name to a Ledger discipline key.
 * @param {string} name
 * @returns {string}
 */
export function disciplineNameToKey(name) {
  if (!name) return "";
  const lower = name.toLowerCase();
  const specialMap = {
    "blood sorcery": "bloodSorcery",
    "thin-blood alchemy": "thinBloodAlchemy",
  };
  return specialMap[lower] || lower.replace(/[^a-z]/g, "");
}

function disciplineKeyToProgeny(key) {
  if (!key) return "";
  if (DISCIPLINE_PROGENY[key]) return DISCIPLINE_PROGENY[key];
  const lower = String(key).toLowerCase();
  if (DISCIPLINE_PROGENY[lower]) return DISCIPLINE_PROGENY[lower];
  return lower.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
}

/**
 * @param {unknown} data
 * @returns {"ledger"|"progeny"|"ledger-backup"|"unknown"}
 */
export function detectCharacterFormat(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return "unknown";

  if (Array.isArray(data.characters) && data.version != null) {
    return "ledger-backup";
  }

  const nestedAttrs =
    data.attributes &&
    typeof data.attributes === "object" &&
    !Array.isArray(data.attributes);
  const hasPredatorType =
    data.predatorType && typeof data.predatorType === "object";
  const hasSkillSpecialties = Array.isArray(data.skillSpecialties);
  const hasProgenyDisciplines = Array.isArray(data.disciplines);

  if (nestedAttrs && (hasPredatorType || hasSkillSpecialties || hasProgenyDisciplines)) {
    return "progeny";
  }

  const flatStrength = typeof data.strength === "number";
  const healthTrack =
    data.health && typeof data.health === "object" && !Array.isArray(data.health);
  const hasBloodPotency = Object.prototype.hasOwnProperty.call(data, "blood_potency");
  const mapDisciplines =
    data.disciplines &&
    typeof data.disciplines === "object" &&
    !Array.isArray(data.disciplines);

  if (flatStrength && (healthTrack || hasBloodPotency || mapDisciplines)) {
    return "ledger";
  }

  if (nestedAttrs && data.clan != null) return "progeny";
  if (flatStrength && (data.clan != null || data.name != null)) return "ledger";

  return "unknown";
}

/**
 * Convert Progeny character export data to Ledger character data format.
 * @param {Object} src
 * @returns {Object}
 */
export function convertProgenyToLedger(src) {
  const dst = {};

  if (src.name) dst.name = src.name;
  if (src.sire) dst.sire = src.sire;
  if (src.clan) dst.clan = toSnake(src.clan);
  if (Object.prototype.hasOwnProperty.call(src, "generation")) {
    dst.generation = src.generation;
  }
  if (src.ambition) dst.ambition = src.ambition;
  if (src.desire) dst.desire = src.desire;
  if (src.player) dst.player = src.player;
  if (src.chronicle) dst.chronicle = src.chronicle;
  if (src.predatorType && src.predatorType.name) {
    dst.predator = toCamel(src.predatorType.name);
  }

  if (src.attributes && typeof src.attributes === "object") {
    Object.entries(src.attributes).forEach(([k, v]) => {
      dst[k.toLowerCase()] = v;
    });
  }

  if (src.skills && typeof src.skills === "object") {
    Object.entries(src.skills).forEach(([k, v]) => {
      dst[skillKeyToLedger(k)] = v;
    });
  }

  const specialtiesMap = {};
  const addSpec = (skill, name) => {
    if (!skill || !name) return;
    const key = skillKeyToLedger(skill);
    if (!specialtiesMap[key]) specialtiesMap[key] = new Set();
    specialtiesMap[key].add(name);
  };
  (Array.isArray(src.skillSpecialties) ? src.skillSpecialties : []).forEach((sp) =>
    addSpec(sp.skill, sp.name)
  );
  if (src.predatorType && Array.isArray(src.predatorType.pickedSpecialties)) {
    src.predatorType.pickedSpecialties.forEach((sp) => addSpec(sp.skill, sp.name));
  }
  Object.entries(specialtiesMap).forEach(([k, set]) => {
    if (set.size) dst[`${k}_specialties`] = Array.from(set);
  });

  const discMap = {};
  const ensureDisc = (k) => {
    if (k && !discMap[k]) discMap[k] = { level: 0, powers: [] };
  };
  if (Array.isArray(src.disciplines)) {
    src.disciplines.forEach((p) => {
      const dKey = disciplineNameToKey(p.discipline || "");
      ensureDisc(dKey);
      if (discMap[dKey]) {
        if (p.level > discMap[dKey].level) discMap[dKey].level = p.level;
        if (p.name) discMap[dKey].powers.push(p.name);
      }
    });
  }
  if (src.predatorType && src.predatorType.pickedDiscipline) {
    const dKey = disciplineNameToKey(src.predatorType.pickedDiscipline);
    ensureDisc(dKey);
    if (discMap[dKey] && discMap[dKey].level < 1) discMap[dKey].level = 1;
  }
  if (Object.keys(discMap).length) dst.disciplines = discMap;

  const meritsObj = {};
  const flawsObj = {};
  const backgroundsObj = {};
  const backgroundFlawsObj = {};
  const addTrait = (col, key, lvl) => {
    if (!col[key]) col[key] = { level: lvl, instances: [{ level: lvl }] };
  };
  const allTraits = [];
  if (Array.isArray(src.merits)) allTraits.push(...src.merits);
  if (Array.isArray(src.flaws)) allTraits.push(...src.flaws);
  if (src.predatorType && Array.isArray(src.predatorType.pickedMeritsAndFlaws)) {
    allTraits.push(...src.predatorType.pickedMeritsAndFlaws);
  }
  allTraits.forEach((t) => {
    if (!t || !t.name) return;
    const keySnake = toSnake(t.name);
    const keyCamel = toCamel(t.name);
    const lvl = t.level || 1;
    if (t.type === "flaw") {
      addTrait(flawsObj, keyCamel, lvl);
      addTrait(backgroundFlawsObj, keySnake, lvl);
    } else {
      addTrait(meritsObj, keyCamel, lvl);
      addTrait(backgroundsObj, keySnake, lvl);
    }
  });
  if (Object.keys(meritsObj).length) dst.merits = meritsObj;
  if (Object.keys(flawsObj).length) dst.flaws = flawsObj;
  if (Object.keys(backgroundsObj).length) dst.backgrounds = backgroundsObj;
  if (Object.keys(backgroundFlawsObj).length) dst.backgroundFlaws = backgroundFlawsObj;

  if (Array.isArray(src.touchstones) && src.touchstones.length) {
    dst.convictions = src.touchstones.map((ts) => ({
      description: ts.conviction || "",
      touchstone: {
        name: ts.name || "",
        relationship: "",
        summary: ts.description || "",
        lost: false,
      },
    }));
  }

  const staminaVal = src.attributes?.stamina || 0;
  const resolveVal = src.attributes?.resolve || 0;
  const composureVal = src.attributes?.composure || 0;
  const ephemeral = src.ephemeral && typeof src.ephemeral === "object" ? src.ephemeral : {};

  const healthMax =
    typeof src.maxHealth === "number" && src.maxHealth > 0
      ? src.maxHealth
      : staminaVal + 3;
  dst.health = {
    max: healthMax,
    current: Math.max(0, healthMax - (ephemeral.superficialDamage || 0) - (ephemeral.aggravatedDamage || 0)),
    superficial: ephemeral.superficialDamage || 0,
    aggravated: ephemeral.aggravatedDamage || 0,
    type: "health",
  };

  const wpMax =
    typeof src.willpower === "number" && src.willpower > 0
      ? src.willpower
      : resolveVal + composureVal;
  dst.willpower = {
    max: wpMax,
    current: Math.max(
      0,
      wpMax -
        (ephemeral.superficialWillpowerDamage || 0) -
        (ephemeral.aggravatedWillpowerDamage || 0)
    ),
    superficial: ephemeral.superficialWillpowerDamage || 0,
    aggravated: ephemeral.aggravatedWillpowerDamage || 0,
    type: "willpower",
  };

  const humanityCurrent =
    typeof src.humanity === "number" && src.humanity > 0 ? src.humanity : 7;
  dst.humanity = {
    max: 10,
    current: humanityCurrent,
    superficial: ephemeral.humanityStains || 0,
    aggravated: 0,
    type: "humanity",
  };

  if (Object.prototype.hasOwnProperty.call(src, "bloodPotency")) {
    dst.blood_potency = src.bloodPotency;
  }
  if (Object.prototype.hasOwnProperty.call(src, "humanity")) {
    dst.humanity_score = src.humanity;
  }
  if (Object.prototype.hasOwnProperty.call(src, "willpower")) {
    dst.willpower_score = src.willpower;
  }
  if (typeof ephemeral.hunger === "number") {
    dst.hunger = ephemeral.hunger;
  }

  if (typeof src.experience === "number" && src.experience > 0) {
    dst.xp = {
      total: src.experience,
      spent: ephemeral.experienceSpent || 0,
      history: [],
    };
  }

  return dst;
}

function emptyProgenyCharacter() {
  const skills = {};
  SKILL_KEYS.forEach((k) => {
    skills[k] = 0;
  });
  const attributes = {};
  ATTRIBUTE_KEYS.forEach((k) => {
    attributes[k] = 1;
  });
  return {
    id: "",
    name: "",
    description: "",
    sire: "",
    player: "",
    chronicle: "",
    sect: "",
    clan: "",
    clanBane: "default",
    predatorType: {
      name: "",
      pickedDiscipline: "",
      pickedSpecialties: [],
      pickedMeritsAndFlaws: [],
    },
    touchstones: [],
    ambition: "",
    desire: "",
    attributes,
    skills,
    skillSpecialties: [],
    availableDisciplineNames: [],
    disciplines: [],
    disciplineLevels: {},
    rituals: [],
    ceremonies: [],
    customDisciplines: {},
    bloodPotency: 0,
    generation: 0,
    maxHealth: 0,
    willpower: 0,
    experience: 0,
    humanity: 0,
    merits: [],
    flaws: [],
    notes: "",
    ephemeral: {
      hunger: 0,
      superficialDamage: 0,
      aggravatedDamage: 0,
      superficialWillpowerDamage: 0,
      aggravatedWillpowerDamage: 0,
      humanityStains: 0,
      experienceSpent: 0,
    },
    version: PROGENY_SCHEMA_VERSION,
    characterVersion: 0,
  };
}

function collectLedgerTraits(map, type) {
  if (!map || typeof map !== "object") return [];
  return Object.entries(map).map(([key, val]) => {
    const level =
      val && typeof val === "object"
        ? Number(val.level) || 1
        : Number(val) || 1;
    return {
      name: traitDisplayName(key),
      level,
      type,
      summary: "",
      excludes: [],
    };
  });
}

/**
 * Convert Ledger character data to Progeny export shape.
 * @param {Object} src
 * @returns {Object}
 */
export function convertLedgerToProgeny(src) {
  const dst = emptyProgenyCharacter();

  dst.name = src.name || "";
  dst.sire = src.sire || "";
  dst.ambition = src.ambition || "";
  dst.desire = src.desire || "";
  dst.player = src.player || "";
  dst.chronicle = src.chronicle || "";
  dst.notes = src.concept || src.notes || "";

  if (src.clan) {
    const snake = toSnake(src.clan);
    dst.clan = CLAN_DISPLAY[snake] || titleCaseWords(String(src.clan).replace(/_/g, " "));
  }

  if (src.generation != null && src.generation !== "") {
    dst.generation = Number(src.generation) || 0;
  }

  if (src.predator) {
    dst.predatorType.name =
      PREDATOR_DISPLAY[src.predator] || titleCaseWords(String(src.predator));
  }

  ATTRIBUTE_KEYS.forEach((k) => {
    if (typeof src[k] === "number") dst.attributes[k] = src[k];
  });

  SKILL_KEYS.forEach((progenyKey) => {
    const ledgerKey = skillKeyToLedger(progenyKey);
    if (typeof src[ledgerKey] === "number") {
      dst.skills[progenyKey] = src[ledgerKey];
    } else if (typeof src[progenyKey] === "number") {
      dst.skills[progenyKey] = src[progenyKey];
    }
  });

  const skillSpecialties = [];
  Object.keys(src).forEach((key) => {
    if (!key.endsWith("_specialties")) return;
    const skill = skillKeyToProgeny(key.replace(/_specialties$/, ""));
    const list = Array.isArray(src[key]) ? src[key] : [];
    list.forEach((name) => {
      if (name) skillSpecialties.push({ skill, name: String(name) });
    });
  });
  dst.skillSpecialties = skillSpecialties;

  const disciplines = [];
  const disciplineLevels = {};
  const available = new Set();
  if (src.disciplines && typeof src.disciplines === "object" && !Array.isArray(src.disciplines)) {
    Object.entries(src.disciplines).forEach(([dKey, info]) => {
      const progenyDisc = disciplineKeyToProgeny(dKey);
      if (!progenyDisc) return;
      available.add(progenyDisc);
      const level = Number(info?.level) || 0;
      const powers = Array.isArray(info?.powers) ? info.powers : [];
      disciplineLevels[`official:${progenyDisc}`] = level;
      if (powers.length) {
        powers.forEach((powerName, idx) => {
          disciplines.push({
            name: powerName || `Power ${idx + 1}`,
            description: "",
            summary: "",
            dicePool: "",
            level: Math.min(5, Math.max(1, Math.min(level || powers.length, idx + 1))),
            discipline: progenyDisc,
            rouseChecks: 0,
            amalgamPrerequisites: [],
          });
        });
      } else if (level > 0) {
        for (let i = 1; i <= level; i++) {
          disciplines.push({
            name: `${titleCaseWords(progenyDisc)} ${i}`,
            description: "",
            summary: "",
            dicePool: "",
            level: i,
            discipline: progenyDisc,
            rouseChecks: 0,
            amalgamPrerequisites: [],
          });
        }
      }
    });
  }
  dst.disciplines = disciplines;
  dst.disciplineLevels = disciplineLevels;
  dst.availableDisciplineNames = Array.from(available);

  const meritKeys = new Set();
  const flawKeys = new Set();
  const merits = [];
  const flaws = [];

  const pushUnique = (list, seen, trait) => {
    const key = toSnake(trait.name);
    if (!key || seen.has(key)) return;
    seen.add(key);
    list.push(trait);
  };

  collectLedgerTraits(src.merits, "merit").forEach((t) => pushUnique(merits, meritKeys, t));
  collectLedgerTraits(src.backgrounds, "merit").forEach((t) => pushUnique(merits, meritKeys, t));
  collectLedgerTraits(src.flaws, "flaw").forEach((t) => pushUnique(flaws, flawKeys, t));
  collectLedgerTraits(src.backgroundFlaws, "flaw").forEach((t) => pushUnique(flaws, flawKeys, t));
  dst.merits = merits;
  dst.flaws = flaws;

  if (Array.isArray(src.convictions)) {
    dst.touchstones = src.convictions.map((c) => ({
      name: c?.touchstone?.name || "",
      description: c?.touchstone?.summary || c?.touchstone?.relationship || "",
      conviction: c?.description || "",
    }));
  }

  if (typeof src.blood_potency === "number") dst.bloodPotency = src.blood_potency;

  if (src.health && typeof src.health === "object") {
    dst.maxHealth = Number(src.health.max) || 0;
    dst.ephemeral.superficialDamage = Number(src.health.superficial) || 0;
    dst.ephemeral.aggravatedDamage = Number(src.health.aggravated) || 0;
  } else {
    dst.maxHealth = (dst.attributes.stamina || 0) + 3;
  }

  if (src.willpower && typeof src.willpower === "object") {
    dst.willpower = Number(src.willpower.max) || 0;
    dst.ephemeral.superficialWillpowerDamage = Number(src.willpower.superficial) || 0;
    dst.ephemeral.aggravatedWillpowerDamage = Number(src.willpower.aggravated) || 0;
  } else {
    dst.willpower = (dst.attributes.resolve || 0) + (dst.attributes.composure || 0);
  }

  if (src.humanity && typeof src.humanity === "object") {
    dst.humanity = Number(src.humanity.current) || 0;
    dst.ephemeral.humanityStains = Number(src.humanity.superficial) || 0;
  } else if (typeof src.humanity_score === "number") {
    dst.humanity = src.humanity_score;
  }

  if (typeof src.hunger === "number") dst.ephemeral.hunger = src.hunger;

  if (src.xp && typeof src.xp === "object") {
    dst.experience = Number(src.xp.total) || 0;
    dst.ephemeral.experienceSpent = Number(src.xp.spent) || 0;
  }

  // Best-effort predator pickedDiscipline: first discipline not in clan list is hard;
  // use the lowest-level / first available discipline as a placeholder when present.
  if (!dst.predatorType.pickedDiscipline && dst.availableDisciplineNames.length) {
    dst.predatorType.pickedDiscipline = dst.availableDisciplineNames[0];
  }

  return dst;
}

/**
 * Normalize any supported single-character JSON to Ledger format.
 * @param {Object} data
 * @returns {Object}
 */
export function toLedgerCharacter(data) {
  const format = detectCharacterFormat(data);
  if (format === "ledger") return data;
  if (format === "progeny") return convertProgenyToLedger(data);
  if (format === "ledger-backup") {
    throw new Error(
      "This looks like a full Ledger backup. Use Import Data on the dashboard instead."
    );
  }
  throw new Error("Unrecognized character file format");
}

/**
 * Normalize any supported single-character JSON to Progeny format.
 * @param {Object} data
 * @returns {Object}
 */
export function toProgenyCharacter(data) {
  const format = detectCharacterFormat(data);
  if (format === "progeny") return data;
  if (format === "ledger") return convertLedgerToProgeny(data);
  if (format === "ledger-backup") {
    throw new Error(
      "This looks like a full Ledger backup. Export a single character instead."
    );
  }
  throw new Error("Unrecognized character file format");
}
