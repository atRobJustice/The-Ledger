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

/**
 * Convert Progeny character export data to Ledger character data format.
 * @param {Object} src - Progeny source object
 * @returns {Object} Ledger character data
 */
export function convertProgenyToLedger(src) {
  const dst = {};
  // Helpers
  const toSnake = (str="")=> str.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
  const toCamel = (str="")=>{
      const parts = str.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(/\s+/);
      return parts[0] + parts.slice(1).map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join("");
  };

  // Identity
  if(src.name) dst.name = src.name;
  if(src.sire) dst.sire = src.sire;
  if(src.clan) dst.clan = toSnake(src.clan);
  if(Object.prototype.hasOwnProperty.call(src,"generation")) dst.generation = src.generation;
  if(src.ambition) dst.ambition = src.ambition;
  if(src.desire) dst.desire = src.desire;
  if(src.predatorType && src.predatorType.name) dst.predator = toCamel(src.predatorType.name);

  // Attributes
  if(src.attributes && typeof src.attributes==='object'){
      Object.entries(src.attributes).forEach(([k,v])=> dst[k.toLowerCase()] = v);
  }

  // Skills
  if(src.skills && typeof src.skills==='object'){
      Object.entries(src.skills).forEach(([k,v])=> dst[k.toLowerCase()] = v);
  }

  // Specialties
  const specialtiesMap = {};
  const addSpec = (skill,name)=>{
      if(!skill || !name) return;
      const key = skill.toLowerCase();
      if(!specialtiesMap[key]) specialtiesMap[key] = new Set();
      specialtiesMap[key].add(name);
  };
  (Array.isArray(src.skillSpecialties)?src.skillSpecialties:[]).forEach(sp=>addSpec(sp.skill,sp.name));
  if(src.predatorType && Array.isArray(src.predatorType.pickedSpecialties)){
      src.predatorType.pickedSpecialties.forEach(sp=>addSpec(sp.skill,sp.name));
  }
  Object.entries(specialtiesMap).forEach(([k,set])=>{ if(set.size) dst[`${k.replace(/\s+/g,'_')}_specialties`] = Array.from(set); });

  // Disciplines
  const discMap = {};
  const ensureDisc = (k)=>{ if(k && !discMap[k]) discMap[k] = {level:0,powers:[]}; };
  if(Array.isArray(src.disciplines)){
      src.disciplines.forEach(p=>{
          const dKey = disciplineNameToKey(p.discipline||"");
          ensureDisc(dKey);
          if(discMap[dKey]){
              if(p.level > discMap[dKey].level) discMap[dKey].level = p.level;
              discMap[dKey].powers.push(p.name);
          }
      });
  }
  if(src.predatorType && src.predatorType.pickedDiscipline){
      const dKey = disciplineNameToKey(src.predatorType.pickedDiscipline);
      ensureDisc(dKey);
      if(discMap[dKey] && discMap[dKey].level < 1) discMap[dKey].level = 1;
  }
  if(Object.keys(discMap).length) dst.disciplines = discMap;

  // Merits & Backgrounds
  const meritsObj={}, flawsObj={}, backgroundsObj={}, backgroundFlawsObj={};
  const addTrait = (col,key,lvl)=>{ if(!col[key]) col[key]={level:lvl, instances:[{level:lvl}]}; };
  const allTraits=[];
  if(Array.isArray(src.merits)) allTraits.push(...src.merits);
  if(Array.isArray(src.flaws)) allTraits.push(...src.flaws);
  if(src.predatorType && Array.isArray(src.predatorType.pickedMeritsAndFlaws)) allTraits.push(...src.predatorType.pickedMeritsAndFlaws);
  allTraits.forEach(t=>{
      if(!t||!t.name) return;
      const keySnake = toSnake(t.name);
      const keyCamel = toCamel(t.name);
      const lvl = t.level||1;
      if(t.type==='flaw'){
          addTrait(flawsObj,keyCamel,lvl);
          addTrait(backgroundFlawsObj,keySnake,lvl);
      }else{
          addTrait(meritsObj,keyCamel,lvl);
          addTrait(backgroundsObj,keySnake,lvl);
      }
  });
  if(Object.keys(meritsObj).length) dst.merits = meritsObj;
  if(Object.keys(flawsObj).length) dst.flaws = flawsObj;
  if(Object.keys(backgroundsObj).length) dst.backgrounds = backgroundsObj;
  if(Object.keys(backgroundFlawsObj).length) dst.backgroundFlaws = backgroundFlawsObj;

  // Track objects
  const staminaVal = src.attributes?.stamina || 0;
  const resolveVal = src.attributes?.resolve || 0;
  const composureVal = src.attributes?.composure || 0;

  const healthMax = staminaVal + 3;
  dst.health = {max: healthMax, current: healthMax, superficial: 0, aggravated: 0, type: 'health'};

  const wpMax = resolveVal + composureVal;
  dst.willpower = {max: wpMax, current: wpMax, superficial: 0, aggravated: 0, type: 'willpower'};

  const humanityCurrent = (src.humanity && src.humanity>0)? src.humanity : 7;
  dst.humanity = {max: 10, current: humanityCurrent, superficial: 0, aggravated: 0, type: 'humanity'};

  // Misc track scores
  if(Object.prototype.hasOwnProperty.call(src,'bloodPotency')) dst.blood_potency = src.bloodPotency;
  if(Object.prototype.hasOwnProperty.call(src,'humanity')) dst.humanity_score = src.humanity;
  if(Object.prototype.hasOwnProperty.call(src,'willpower')) dst.willpower_score = src.willpower;

  return dst;
}
