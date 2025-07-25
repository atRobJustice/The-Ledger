/**
 * @fileoverview XP Spend Manager for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Manages the spending of experience points. Provides a comprehensive interface for
 *             purchasing character improvements including attributes, skills, disciplines, merits,
 *             backgrounds, blood potency, and specialties with proper pricing calculations and
 *             undo functionality.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires xp-pricing.js - Provides pricing calculations for different trait types
 * @requires manager-utils.js - Provides utility functions for trait management (TraitManagerUtils)
 * @requires attributes.js - Reference data for attributes
 * @requires skills.js - Reference data for skills
 * @requires disciplines.js - Reference data for disciplines
 * @requires clans.js - Reference data for clans
 * @requires merits.js - Reference data for merits
 * @requires backgrounds.js - Reference data for backgrounds
 * @requires window.modalManager - For displaying XP spending modals
 * @requires window.xpManager - For XP operations
 * @requires window.disciplineManager - For discipline management
 * @requires window.specialtyManager - For specialty management
 * 
 * @namespace XPSpendManager
 * @description Main namespace for managing XP spending
 * 
 * @function bindClick - Sets up event listener for the spend XP button
 * @function showSpendXPModal - Shows the modal for spending XP
 * @function populateCategoryOptions - Populates category dropdown options
 * @function getTraitOptions - Gets available traits for a category
 * @function extractAttributes - Extracts available attributes from reference data
 * @function extractSkills - Extracts available skills from reference data
 * @function normaliseKey - Normalizes trait keys to consistent format
 * @function extractDisciplines - Extracts available disciplines with clan restrictions
 * @function extractMerits - Extracts available merits from reference data
 * @function extractBackgrounds - Extracts available backgrounds from reference data
 * @function attachDynamicHandlers - Sets up dynamic event handlers for the modal
 * @function updateCost - Updates the cost display based on current selections
 * @function getCurrentLevel - Gets the current level of a trait
 * @function applyTraitChange - Applies trait level changes
 * @function findLabelByKey - Finds display label for a trait key
 * @function buildPricingContext - Builds context for pricing calculations
 * @function addSpecialtyToSkill - Adds a specialty to a skill
 * @function getTraitMeta - Gets metadata for a trait
 * @function parseDots - Parses dot notation strings
 * @function revertTraitChange - Reverts trait changes for undo functionality
 * @function removeSpecialtyFromSkill - Removes a specialty from a skill
 * @function minimalTraitRevert - Reverts trait level changes
 * @function calcMeritBackgroundCost - Calculates merit/background costs
 * 
 * @typedef {Object} TraitOption
 * @property {string} key - Trait key identifier
 * @property {string} label - Display label for the trait
 * 
 * @typedef {Object} PricingContext
 * @property {string} pricingCat - Category for pricing calculations
 * @property {Object} pricingOpts - Pricing options and parameters
 * 
 * @typedef {Object} UndoMetadata
 * @property {string} cat - Category of the trait
 * @property {string} traitKey - Trait key identifier
 * @property {number} from - Previous level
 * @property {number} to - New level
 * @property {string} [specialty] - Specialty name if applicable
 * 
 * @example
 * // Show the XP spending modal
 * showSpendXPModal();
 * 
 * // Apply a trait change
 * await applyTraitChange('attribute', 'strength', 2, 3);
 * 
 * // Parse dot notation
 * const level = parseDots('•••'); // Returns 3
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

// XP Spend Manager (scaffold)
// -------------------------------------------------------------
// This module will orchestrate spending XP via the UI.
// Current step: injects a placeholder modal and opens it when
// the "Spend XP" button is clicked.
// Future steps will extend this with pricing and trait updates.

import { getTotalPrice } from '../utils/xp-pricing.js';
import { TraitManagerUtils } from './manager-utils.js';
import logger from '../utils/logger.js';

// Import references for trait lists
import { attributes as ATTR_REF } from '../../data/attributes.js';
import { skills as SKILL_REF } from '../../data/skills.js';
import { disciplines as DISC_REF } from '../../data/vampire/disciplines.js';
import { clans as CLAN_REF } from '../../data/vampire/clans.js';
import { merits as MERIT_REF } from '../../data/vampire/merits.js';
import { backgrounds as BG_REF } from '../../data/vampire/backgrounds.js';

(function () {
  // Wait until DOM & Bootstrap ready
  document.addEventListener('DOMContentLoaded', () => {
    bindClick();
  });

  function bindClick() {
    const btn = document.getElementById('spend-xp');
    if (!btn) return;
    btn.addEventListener('click', () => {
      showSpendXPModal();
    });
  }

  function showSpendXPModal() {
    const content = `
              <div class="mb-3">
                <label for="xp-category" class="form-label">Category</label>
                <select id="xp-category" class="form-select xp-dropdown">
                  <option value="" disabled selected>Select Category</option>
                </select>
              </div>
              <div class="form-check mb-3 d-none" id="specialty-checkbox-container">
                <input class="form-check-input" type="checkbox" value="1" id="xp-add-specialty">
                <label class="form-check-label" for="xp-add-specialty">
                  Add Specialty (3 XP)
                </label>
              </div>
              <div class="mb-3">
                <label for="xp-trait" class="form-label">Trait</label>
                <select id="xp-trait" class="form-select xp-dropdown" disabled></select>
              </div>
              <div class="mb-3 d-none" id="specialty-name-container">
                <label for="xp-specialty-name" class="form-label">Specialty Name</label>
                <input type="text" id="xp-specialty-name" class="form-control bg-dark text-light"/>
              </div>
              <div class="mb-3" id="xp-level-container" style="display:none">
                <label for="xp-level" class="form-label">New Level: <span id="xp-level-display">1</span></label>
                <input type="range" id="xp-level" class="form-range" min="1" max="5" value="1" step="1">
              </div>
              <div class="alert alert-info" id="xp-cost-info" style="display:none">
                Cost: <span id="xp-cost">0</span> XP <br/>
                Available: <span id="xp-available">0</span> XP
              </div>
    `;

    const footer = `
              <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn theme-btn-primary spend-xp" id="xp-spend-confirm" disabled>Confirm Purchase</button>
    `;

    window.modalManager.showCustom({
      title: 'Spend Experience Points',
      content,
      footer,
      size: 'default',
      centered: true
    }, (element, instance) => {
      // Reset form controls so options update based on latest data
      const catSelect = element.querySelector('#xp-category');
      const traitSelect = element.querySelector('#xp-trait');
      const levelContainer = element.querySelector('#xp-level-container');
      const costInfo = element.querySelector('#xp-cost-info');
      const confirmBtn = element.querySelector('#xp-spend-confirm');

      if(catSelect){ catSelect.value=''; }
      if(traitSelect){
        traitSelect.innerHTML='<option value="" disabled selected>Select Trait</option>';
        traitSelect.disabled = true;
      }
      const specCheckbox=element.querySelector('#xp-add-specialty');
      if(specCheckbox) specCheckbox.checked=false;
      // Always hide specialty container on reset
      const specContainer=element.querySelector('#specialty-checkbox-container');
      if(specContainer) specContainer.classList.add('d-none');
      if(levelContainer) levelContainer.style.display='none';
      if(costInfo){
        costInfo.style.display='none';
        const costSpanEl = element.querySelector('#xp-cost');
        if(costSpanEl) costSpanEl.textContent='0';
      }
      if(confirmBtn) confirmBtn.disabled = true;

      // Refresh available XP display each open
      const availableEl = element.querySelector('#xp-available');
      if(availableEl) availableEl.textContent = window.xpManager?.getAvailableXP() ?? 0;

      // Populate category options
      populateCategoryOptions(element);
      attachDynamicHandlers(element, instance);
    });
  }

  // ----------------------- UI data helpers ----------------------
  function populateCategoryOptions(element) {
    if (!element) return; // Early return if no element provided
    const select = element.querySelector('#xp-category');
    if (!select) return;
    const categories = [
      { key: 'attribute', label: 'Attribute' },
      { key: 'skill', label: 'Skill' },
      { key: 'discipline', label: 'Discipline' },
      { key: 'merit', label: 'Merit' },
      { key: 'background', label: 'Background' },
      { key: 'bloodpotency', label: 'Blood Potency' }
    ];
    categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.key;
      opt.textContent = c.label;
      select.appendChild(opt);
    });
  }

  function getTraitOptions(categoryKey) {
    switch (categoryKey) {
      case 'attribute':
        return extractAttributes();
      case 'skill':
        return extractSkills();
      case 'discipline':
        return extractDisciplines();
      case 'bloodpotency':
        return [{ key: 'bloodpotency', label: 'Blood Potency' }];
      case 'merit':
        return extractMerits();
      case 'background':
        return extractBackgrounds();
      default:
        return [];
    }
  }

  function extractAttributes() {
    const list = [];
    ['physical', 'social', 'mental'].forEach(group => {
      const attrs = ATTR_REF[group]?.attributes || {};
      Object.keys(attrs).forEach(key => list.push({ key, label: attrs[key].name }));
    });
    return list;
  }

  function extractSkills() {
    const list = [];
    ['physical', 'social', 'mental'].forEach(group => {
      const skills = SKILL_REF[group] || {};
      Object.keys(skills).forEach(key => list.push({ key, label: skills[key].name }));
    });
    return list;
  }

  function normaliseKey(str){
    if(!str) return '';
    const withUnderscore = str.replace(/([a-z])([A-Z])/g,'$1_$2');
    return withUnderscore.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z_]/g,'');
  }

  function extractDisciplines() {
    const types = DISC_REF.types || {};
    const clanKey = document.querySelector('.clan-dropdown')?.value || '';
    const isThinblood = clanKey === 'thinblood';

    const hasBloodSorcery = window.disciplineManager?.getDisciplineLevel('bloodSorcery') > 0;
    const hasOblivion = window.disciplineManager?.getDisciplineLevel('oblivion') > 0;

    // Prefer disciplineManager's canonical keys if available
    let keys = window.disciplineManager?.availableDisciplines || Object.keys(types);

    return keys.filter(k => {
      if (k === 'thin_blood_alchemy' || k === 'thinBloodAlchemy') {
        return isThinblood; // Only for Thin-bloods
      }
      if (k === 'blood_sorcery_rituals' || k==='bloodSorceryRituals') {
        return hasBloodSorcery; // Need Blood Sorcery first
      }
      if (k === 'oblivion_ceremonies' || k==='oblivionCeremonies') {
        return hasOblivion; // Need Oblivion first
      }
      return true;
    }).map(k => {
      const snakeKey = normaliseKey(k);
      const label = types[snakeKey]?.name || k.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase());
      return { key: k, label };
    });
  }

  function extractMerits() {
    const list=[];
    Object.keys(MERIT_REF).forEach(catKey=>{
      const cat=MERIT_REF[catKey];
      const parentLabel = cat?.name || TraitManagerUtils.camelToTitle(catKey);
      if(cat?.merits){
        Object.keys(cat.merits).forEach(mk=>{
          const child = cat.merits[mk];
          list.push({key: mk,label: `${parentLabel}: ${child.name}`});
        });
      }
    });
    return list;
  }

  function extractBackgrounds() {
    const list=[];
    Object.keys(BG_REF).forEach(catKey=>{
      const cat=BG_REF[catKey];
      const parentLabel = cat?.name || TraitManagerUtils.camelToTitle(catKey);
      if(cat?.merits){
        Object.keys(cat.merits).forEach(bk=>{
          const child = cat.merits[bk];
          list.push({key: bk,label: `${parentLabel}: ${child.name}`});
        });
      }
    });
    return list;
  }

  // ----------------------- Event handlers -----------------------
  function attachDynamicHandlers(element, instance) {
    if (!element) return; // Early return if no element provided
    
    const catSelect = element.querySelector('#xp-category');
    const traitSelect = element.querySelector('#xp-trait');
    const levelRange = element.querySelector('#xp-level');
    const levelDisplay = element.querySelector('#xp-level-display');
    const levelContainer = element.querySelector('#xp-level-container');
    const costInfo = element.querySelector('#xp-cost-info');
    const costSpan = element.querySelector('#xp-cost');
    const confirmBtn = element.querySelector('#xp-spend-confirm');

    catSelect.addEventListener('change', () => {
      const cat = catSelect.value;
      // Populate trait options
      traitSelect.innerHTML = '';
      // add placeholder
      const ph = document.createElement('option');
      ph.value = '';
      ph.textContent = 'Select Trait';
      ph.disabled = true;
      ph.selected = true;
      traitSelect.appendChild(ph);

      const opts = getTraitOptions(cat);
      opts.forEach(o => {
        const optEl = document.createElement('option');
        optEl.value = o.key;
        optEl.textContent = o.label;
        traitSelect.appendChild(optEl);
      });
      traitSelect.disabled = opts.length === 0;
      levelContainer.style.display = 'none';
      costInfo.style.display = 'none';
      confirmBtn.disabled = true;

      // Show specialty checkbox only when skill category selected
      const specContainer = element.querySelector('#specialty-checkbox-container');
      const specCheckbox = element.querySelector('#xp-add-specialty');
      if(cat === 'skill') {
        specContainer.classList.remove('d-none');
        if(specCheckbox) specCheckbox.checked = false;
        element.querySelector('#specialty-name-container').classList.add('d-none');
        element.querySelector('#xp-specialty-name').value='';
      } else {
        specContainer.classList.add('d-none');
        if(specCheckbox) specCheckbox.checked = false;
        element.querySelector('#specialty-name-container').classList.add('d-none');
      }
    });

    traitSelect.addEventListener('change', () => {
      const addingSpecialty = (catSelect.value === 'skill') && element.querySelector('#xp-add-specialty').checked;

      if(addingSpecialty){
        levelContainer.style.display='none';
      } else {
        // Special handling for merits/backgrounds
        if(catSelect.value==='merit'||catSelect.value==='background'){
          const meta=getTraitMeta(catSelect.value,traitSelect.value);
          const info=TraitManagerUtils.parseDotsNotation(meta?.dots||'•');
          const { currentLevel }=getCurrentLevel(catSelect.value, traitSelect.value);
          const showSlider = info.canRepeat || info.hasOr || (info.min!==info.max);
          if(showSlider){
            levelContainer.style.display='block';
            let minVal, maxVal, stepVal=1;
            if(info.hasOr){
              const sorted=[...info.orValues].sort((a,b)=>a-b);
              minVal=sorted[0];
              maxVal=sorted[sorted.length-1];
              stepVal= sorted.length>1 ? (sorted[1]-sorted[0]) : 1;
            } else if(info.canRepeat){
              minVal=currentLevel+info.min;
              maxVal=minVal+info.min*4; // arbitrary cap
            } else {
              minVal=Math.min(info.max, currentLevel+1);
              maxVal=info.max;
            }
            levelRange.min=minVal;
            levelRange.max=maxVal;
            levelRange.step=stepVal;
            const start=Math.min(maxVal, Math.max(minVal, currentLevel+1));
            levelRange.value=start;
            levelDisplay.textContent=String(start);
          } else {
            levelContainer.style.display='none';
          }
        } else {
          levelContainer.style.display='block';
          const { currentLevel } = getCurrentLevel(catSelect.value, traitSelect.value);
          const startLevel=Math.min(5,currentLevel+1);
          levelRange.min=startLevel; levelRange.value=startLevel; levelDisplay.textContent=String(startLevel);
        }
      }
      updateCost(element);
    });

    levelRange.addEventListener('input', () => {
      levelDisplay.textContent = levelRange.value;
      updateCost(element);
    });

    // Specialty checkbox handler
    element.querySelector('#xp-add-specialty').addEventListener('change', () => {
      const checked = element.querySelector('#xp-add-specialty').checked;
      // Hide level slider if adding specialty
      levelContainer.style.display = checked ? 'none' : (traitSelect.value ? 'block' : 'none');
      const nameCont=element.querySelector('#specialty-name-container');
      if(checked){ nameCont.classList.remove('d-none'); } else { nameCont.classList.add('d-none'); element.querySelector('#xp-specialty-name').value=''; }
      updateCost(element);
    });

    let latestCost = 0;

    confirmBtn.addEventListener('click', async () => {
      const cat = catSelect.value;
      const traitKey = traitSelect.value;
      if (!cat || !traitKey) return;
      const addingSpecialty = (cat === 'skill') && element.querySelector('#xp-add-specialty').checked;

      const { currentLevel } = getCurrentLevel(cat, traitKey);
      let desiredLevel;
      const metaCat = (cat==='merit'||cat==='background');
      let meta, info;
      if(metaCat){
        meta = getTraitMeta(cat, traitKey);
        info = TraitManagerUtils.parseDotsNotation(meta?.dots||'•');
      }

      desiredLevel = addingSpecialty ? currentLevel : (
        metaCat && info && (info.min===info.max&&!info.canRepeat&&!info.hasOr) ? info.max : parseInt(levelRange.value,10)
      );

      let cost;
      if(addingSpecialty){
        cost = 3;
      } else if(metaCat){
        cost = calcMeritBackgroundCost(meta?.dots||'•', currentLevel, desiredLevel);
      } else {
        const { pricingCat, pricingOpts } = buildPricingContext(cat, traitKey);
        cost = getTotalPrice(pricingCat, currentLevel, desiredLevel, pricingOpts);
      }
      latestCost = cost;
      costSpan.textContent = cost;
      const availableEl = element.querySelector('#xp-available');
      if(availableEl) availableEl.textContent = window.xpManager?.getAvailableXP() ?? 0;
      costInfo.style.display = 'block';
      confirmBtn.disabled = cost === 0 || cost > (window.xpManager?.getAvailableXP() ?? 0);

      let note;
      if(addingSpecialty){
        const specName=element.querySelector('#xp-specialty-name').value.trim();
        if(!specName){ window.toastManager.show('Please enter a Specialty name', 'warning', 'XP Spend'); return; }
        note = `Specialty (${specName}) in ${traitKey}`;
      } else {
        note = `Raised ${traitKey} ${currentLevel}→${desiredLevel}`;
      }
      const payload = {cat, traitKey, from: currentLevel, to: desiredLevel, specialty: addingSpecialty ? element.querySelector('#xp-specialty-name').value.trim() : null};
      const ok = window.xpManager?.spendXP(cost, note, payload);
      if (!ok) {
        window.toastManager.show('Not enough XP available.', 'warning', 'XP Spend');
        return;
      }

      if(!addingSpecialty) {
        await applyTraitChange(cat, traitKey, currentLevel, desiredLevel);
      } else {
        // programmatically add specialty to skill row
        const skillLabel = findLabelByKey('skill', traitKey);
        addSpecialtyToSkill(skillLabel, element.querySelector('#xp-specialty-name').value.trim());
      }

      // Close modal
      instance.hide();

      // After applying changes, trigger autosave if available
      if(typeof window.gatherCharacterData==='function'){
        try{
          const data = window.gatherCharacterData();
          logger.debug('[XP] autosave data', data);
          
          // Use IndexedDB exclusively
          if (window.characterManager && window.characterManager.isInitialized) {
            await window.characterManager.saveCurrentCharacter(data);
          } else if (window.databaseManager) {
            await window.databaseManager.saveActiveCharacter(data);
          } else {
            throw new Error('No database manager available for autosave');
          }
        } catch (err) {
          logger.warn('[XP] autosave after trait change failed', err);
        }
      } else {
        // Backup manager not yet loaded – retry shortly
        let attempts = 0;
        const retry = async () => {
          if(typeof window.gatherCharacterData==='function'){
            try{
              const data = window.gatherCharacterData();
              logger.debug('[XP] autosave data', data);
              
              // Use IndexedDB exclusively
              if (window.characterManager && window.characterManager.isInitialized) {
                await window.characterManager.saveCurrentCharacter(data);
              } else if (window.databaseManager) {
                await window.databaseManager.saveActiveCharacter(data);
              } else {
                throw new Error('No database manager available for autosave');
              }
            } catch (err) {
              logger.warn('[XP] autosave after trait change failed', err);
            }
          } else if(attempts < 10){
            attempts++;
            setTimeout(retry, 300);
          }
        };
        setTimeout(retry, 300);
      }
    });

    function updateCost(element) {
      const cat = catSelect.value;
      if (!cat || !traitSelect.value) return;
      const addingSpecialty = (cat === 'skill') && element.querySelector('#xp-add-specialty').checked;

      const { currentLevel } = getCurrentLevel(cat, traitSelect.value);
      let desiredLevel;
      const metaCat = (cat==='merit'||cat==='background');
      let meta, info;
      if(metaCat){
        meta = getTraitMeta(cat, traitSelect.value);
        info = TraitManagerUtils.parseDotsNotation(meta?.dots||'•');
      }

      desiredLevel = addingSpecialty ? currentLevel : (
        metaCat && info && (info.min===info.max&&!info.canRepeat&&!info.hasOr) ? info.max : parseInt(levelRange.value,10)
      );

      let cost;
      if(addingSpecialty){
        cost = 3;
      } else if(metaCat){
        cost = calcMeritBackgroundCost(meta?.dots||'•', currentLevel, desiredLevel);
      } else {
        const { pricingCat, pricingOpts } = buildPricingContext(cat, traitSelect.value);
        cost = getTotalPrice(pricingCat, currentLevel, desiredLevel, pricingOpts);
      }
      latestCost = cost;
      costSpan.textContent = cost;
      const availableEl = element.querySelector('#xp-available');
      if(availableEl) availableEl.textContent = window.xpManager?.getAvailableXP() ?? 0;
      costInfo.style.display = 'block';
      confirmBtn.disabled = cost === 0 || cost > (window.xpManager?.getAvailableXP() ?? 0);
    }

    // Helper returns {currentLevel, label}
    function getCurrentLevel(cat, traitKey) {
      switch (cat) {
        case 'attribute':
        case 'skill': {
          const label = findLabelByKey(cat, traitKey);
          // Try to get the level from the gathered character data first
          if (window.gatherCharacterData) {
            try {
              const characterData = window.gatherCharacterData();
              const key = traitKey.replace(/_/g, ' ');
              const value = characterData[key];
              if (typeof value === 'number') {
                return { currentLevel: value, label };
              }
            } catch (err) {
              logger.warn('[XP] Failed to get level from character data, falling back to DOM:', err);
              // Fallback to DOM
              const row = Array.from(document.querySelectorAll('.stat')).find(r => 
                r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === label.toLowerCase()
              );
              if (row) {
                const dotsEl = row.querySelector('.dots');
                if (dotsEl) {
                  return parseInt(dotsEl.dataset.value || '0', 10);
                }
              }
              return 0;
            }
          }
          
          // Fallback to DOM reading
          const row = Array.from(element.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === label.toLowerCase());
          let lvl = 0;
          if (row) {
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              lvl = parseInt(dotsEl.dataset.value || '0');
            } else {
              const spans = row.querySelectorAll('span');
              if (spans.length > 1) lvl = parseInt(spans[1].textContent.trim() || '0');
            }
          }
          return { currentLevel: isNaN(lvl) ? 0 : lvl, label };
        }
        case 'discipline': {
          const lvl = window.disciplineManager?.getDisciplineLevel(traitKey) || 0;
          const label = DISC_REF.types[traitKey]?.name || traitKey;
          return { currentLevel: lvl, label };
        }
        case 'bloodpotency': {
          // Try to get from character data first
          if (window.gatherCharacterData) {
            try {
              const characterData = window.gatherCharacterData();
              const value = characterData.blood_potency;
              if (typeof value === 'number') {
                return { currentLevel: value, label: 'Blood Potency' };
              }
            } catch (err) {
              logger.warn('[XP] Failed to get blood potency from character data, falling back to DOM:', err);
              // Fallback to DOM
              const row = Array.from(document.querySelectorAll('.stat')).find(r => 
                r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'blood potency'
              );
              if (row) {
                const dotsEl = row.querySelector('.dots');
                if (dotsEl) {
                  return parseInt(dotsEl.dataset.value || '0', 10);
                }
              }
              return 0;
            }
          }
          
          // Fallback to DOM reading
          let lvl = 0;
          const row = Array.from(element.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'blood potency');
          if (row) {
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              lvl = parseInt(dotsEl.dataset.value || '0');
            } else {
              const spans = row.querySelectorAll('span');
              if (spans.length > 1) lvl = parseInt(spans[1].textContent.trim() || '0');
            }
          }
          return { currentLevel: isNaN(lvl) ? 0 : lvl, label: 'Blood Potency' };
        }
        case 'specialty': {
          let lvl = 0;
          const row = Array.from(element.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'specialty');
          if (row) {
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              lvl = parseInt(dotsEl.dataset.value || '0');
            } else {
              const spans = row.querySelectorAll('span');
              if (spans.length > 1) lvl = parseInt(spans[1].textContent.trim() || '0');
            }
          }
          return { currentLevel: isNaN(lvl) ? 0 : lvl, label: 'Specialty' };
        }
        case 'background': {
          const lvl = window.backgroundManager?.getBackgroundLevel ? (window.backgroundManager.getBackgroundLevel(traitKey)||0) : 0;
          const label = TraitManagerUtils.camelToTitle?.(traitKey) || traitKey;
          return { currentLevel: lvl, label };
        }
        case 'merit': {
          const lvl = window.meritFlawManager?.getMeritLevel ? (window.meritFlawManager.getMeritLevel(traitKey)||0) : 0;
          return { currentLevel: lvl, label: traitKey };
        }
        default:
          return { currentLevel: 0, label: traitKey };
      }
    }

    async function applyTraitChange(cat, traitKey, oldLevel, newLevel) {
      logger.debug('[XP] applyTraitChange start', {cat, traitKey, oldLevel, newLevel});
      switch (cat) {
        case 'attribute':
        case 'skill': {
          const label = findLabelByKey(cat, traitKey);
          logger.debug('[XP] attribute/skill label resolved', label);
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === label.toLowerCase());
          logger.debug('[XP] row found for', label, row);
          if (row) {
            logger.debug('[XP] dotsEl exists?', !!row.querySelector('.dots'));
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              logger.debug('[XP] current dataset value', dotsEl.dataset.value, 'updating to', newLevel);
              // update dots
              dotsEl.dataset.value = newLevel;
              dotsEl.setAttribute('data-value', newLevel);
              // Sync jQuery data cache so gatherCharacterData reads the correct value
              if(window.jQuery){ window.jQuery(dotsEl).data('value', newLevel); }
              const dotEls = dotsEl.querySelectorAll('.dot');
              dotEls.forEach((d,i)=> d.classList.toggle('filled', i<newLevel));
              logger.debug('[XP] row dataset value set to', row.dataset.value);
            } else {
              logger.warn('[XP] applyTraitChange: dots element not found for', label);
            }
            row.dataset.value = newLevel;
          } else {
            logger.warn('[XP] applyTraitChange: stat row not found for', label);
          }
          break;
        }
        case 'discipline': {
          if (!window.disciplineManager) break;
          const current = window.disciplineManager.getDisciplineLevel(traitKey) || 0;
          if (current === 0) {
            window.disciplineManager.addDiscipline(traitKey);
          }
          await window.disciplineManager.changeDisciplineLevel(traitKey, current, newLevel);
          break;
        }
        case 'bloodpotency': {
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'blood potency');
          if (row) {
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              dotsEl.dataset.value = newLevel;
              dotsEl.setAttribute('data-value', newLevel);
              // Sync jQuery data cache so gatherCharacterData reads the correct value
              if(window.jQuery){ window.jQuery(dotsEl).data('value', newLevel); }
              const dotEls = dotsEl.querySelectorAll('.dot');
              dotEls.forEach((d,i)=> d.classList.toggle('filled', i<newLevel));
            } else {
              const spans = row.querySelectorAll('span');
              if (spans.length > 1) spans[1].textContent = newLevel;
            }
          }
          break;
        }
        case 'specialty': {
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'specialty');
          if (row) {
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              dotsEl.dataset.value = newLevel;
              dotsEl.setAttribute('data-value', newLevel);
              // Sync jQuery data cache so gatherCharacterData reads the correct value
              if(window.jQuery){ window.jQuery(dotsEl).data('value', newLevel); }
              const dotEls = dotsEl.querySelectorAll('.dot');
              dotEls.forEach((d,i)=> d.classList.toggle('filled', i<newLevel));
            } else {
              const spans = row.querySelectorAll('span');
              if (spans.length > 1) spans[1].textContent = newLevel;
            }
          }
          break;
        }
        case 'merit': {
          if(!window.meritFlawManager) break;
          const mgr = window.meritFlawManager;
          const lvlNow = mgr.getMeritLevel(traitKey)||0;
          if(lvlNow===0){
            const cat = mgr.findTraitCategory ? mgr.findTraitCategory(traitKey,'merit'):null;
            mgr.addTrait('merit', traitKey, cat||'');
          }
          mgr.updateTraitInstanceLevel('merit', traitKey, 0, newLevel);
          break;
        }
        case 'background': {
          if(!window.backgroundManager) break;
          const mgr = window.backgroundManager;
          const lvlNow = mgr.getBackgroundLevel(traitKey)||0;
          if(lvlNow===0){
            const cat = mgr.findTraitCategory ? mgr.findTraitCategory(traitKey,'background'):null;
            mgr.addTrait('background', traitKey, cat||'');
          }
          mgr.updateTraitInstanceLevel('background', traitKey, 0, newLevel);
          break;
        }
      }

      // Expose to outer scope for undo logic
      window.xpSpend_applyTraitChange = applyTraitChange;
    }

    function findLabelByKey(cat, key) {
      switch (cat) {
        case 'attribute': return extractAttributes().find(o => o.key === key)?.label || key;
        case 'skill': return extractSkills().find(o => o.key === key)?.label || key;
        default: return key;
      }
    }

    // ---------------------- Pricing helpers ----------------------
    function buildPricingContext(category, traitKey) {
      // Default
      let pricingCat = category;
      const opts = {};

      // Discipline specifics
      if (category === 'discipline') {
        // Ritual-like disciplines cost differently
        const ritualKeys = ['blood_sorcery_rituals', 'oblivion_ceremonies', 'thin_blood_alchemy'];
        const snakeKey = normaliseKey(traitKey);
        if (ritualKeys.includes(snakeKey)) {
          pricingCat = 'ritual';
        } else {
          // Determine clan match / caitiff
          const clanKey = document.querySelector('.clan-dropdown')?.value || '';
          if (clanKey) {
            opts.caitiff = clanKey === 'caitiff';
            if (!opts.caitiff) {
              const clanObj = CLAN_REF.types[clanKey];
              let discKeys = [];
              if (clanObj?.disciplines) {
                if (Array.isArray(clanObj.disciplines)) {
                  discKeys = clanObj.disciplines.map(n => normaliseKey(n));
                } else {
                  discKeys = Object.keys(clanObj.disciplines).map(normaliseKey);
                }
              }
              opts.clanMatched = discKeys.includes(snakeKey);
            } else {
              opts.clanMatched = false;
            }
          }
        }
      }
      return { pricingCat, pricingOpts: opts };
    }
  }

  function addSpecialtyToSkill(skillLabel, spec){
    if(!spec) return;
    const statRow = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()===skillLabel.toLowerCase());
    if(!statRow) return;
    let list=[];
    try{
      const raw = statRow.dataset.specialties || '[]';
      list = JSON.parse(raw);
      if(!Array.isArray(list)) list=[];
    } catch(err){
      list=[];
    }
    if(!list.includes(spec)){
      list.push(spec);
      statRow.dataset.specialties = JSON.stringify(list);
      // Refresh the specialty manager's display
      if(window.specialtyManager && typeof window.specialtyManager.refreshRow === 'function'){
        window.specialtyManager.refreshRow(skillLabel);
    }
  }
  }

  function getTraitMeta(category,key){
    switch(category){
      case 'attribute': return ATTR_REF?.attributes?.[key] || {};
      case 'skill': return SKILL_REF?.[key] || {};
      case 'discipline': return DISC_REF?.types?.[key] || {};
      case 'merit': {
        // Search through merit categories to find the trait
        for (const [catKey, category] of Object.entries(MERIT_REF)) {
          if (category?.merits && category.merits[key]) {
            return category.merits[key];
          }
        }
        return {};
      }
      case 'background': {
        // Search through background categories to find the trait
        for (const [catKey, category] of Object.entries(BG_REF)) {
          if (category?.merits && category.merits[key]) {
            return category.merits[key];
          }
        }
        return {};
      }
      default: return {};
    }
  }

  function parseDots(dotsStr){
    if(!dotsStr) return {min:0, max:0};
    const clean = dotsStr.replace(/[()]/g,'');
    if(clean.includes(' - ')){
      const parts = clean.split(' - ');
      return {min: parts[0].length, max: parts[1].length};
    }
    return {min: clean.length, max: clean.length};
  }

  // ---- Undo handling ----
  document.addEventListener('xpUndo', async (e)=>{
     const entry=e.detail;
     if(!entry||entry.type!=='spend'||!entry.meta) return;
     await revertTraitChange(entry.meta);
  });

  async function revertTraitChange(meta){
    if(!meta) return;
    const {cat, traitKey, from, to, specialty} = meta;
    if(specialty){
      // Revert specialty addition
      const skillLabel = findLabelByKey('skill', traitKey);
      removeSpecialtyFromSkill(skillLabel, specialty);
    } else {
      // Revert trait level change
        minimalTraitRevert(cat, traitKey, to, from);
    }
  }

  function removeSpecialtyFromSkill(skillLabel, spec){
    if(!spec) return;
    const statRow = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()===skillLabel.toLowerCase());
    if(!statRow) return;
    let list=[];
    try{
      const raw = statRow.dataset.specialties || '[]';
      list = JSON.parse(raw);
      if(!Array.isArray(list)) list=[];
    } catch(err){
      list=[];
    }
    list = list.filter(s => s !== spec);
    statRow.dataset.specialties = JSON.stringify(list);
    // Refresh the specialty manager's display
    if(window.specialtyManager && typeof window.specialtyManager.refreshRow === 'function'){
      window.specialtyManager.refreshRow(skillLabel);
    }
  }

  function minimalTraitRevert(cat, traitKey, oldLevel, newLevel){
    if(cat==='attribute' || cat==='skill'){
      const label = (typeof findLabelByKey==='function') ? findLabelByKey(cat, traitKey) : traitKey.replace(/(^|_)(\w)/g,(_,p1,p2)=>p2.toUpperCase());
      const row = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()===label.toLowerCase());
      if(!row) return;
      const dotsEl = row.querySelector('.dots');
      if(!dotsEl) return;
      // Update dots display
      dotsEl.querySelectorAll('.dot').forEach((dot,i)=>{
        dot.classList.toggle('filled', i<newLevel);
      });
      row.dataset.value=newLevel;
    } else if(cat==='bloodpotency'){
      const row = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()==='blood potency');
      if(!row) return;
      const dotsEl = row.querySelector('.dots');
      if(!dotsEl) return;
      // Update dots display
      dotsEl.querySelectorAll('.dot').forEach((dot,i)=>{
        dot.classList.toggle('filled', i<newLevel);
      });
      row.dataset.value=newLevel;
    }
  }
})(); 

export function parseDots(dotsString){
  const clean = dotsString.replace(/[()]/g,'');
  const variable = /[\+\-]/.test(clean);
  const max = (clean.match(/•/g)||[]).length;
  return { variable, max };
} 

// Helper to calculate Merit/Background XP cost based on dots notation rules
function calcMeritBackgroundCost(dotsString, currentLevel, desiredLevel){
  const info = TraitManagerUtils.parseDotsNotation(dotsString||'•');
  // If repeatable ("+" notation)
  if(info.canRepeat){
    const baseDots = info.min || 1; // cost chunk size
    return (desiredLevel - currentLevel) * baseDots * 3;
  }
  // Choice levels ("or" notation)
  if(info.hasOr){
    const sorted=[...info.orValues].sort((a,b)=>a-b);
    let cost=0;
    for(const lvl of sorted){
      if(lvl>currentLevel && lvl<=desiredLevel){ cost += lvl*3; }
    }
    return cost;
  }
  // Range with dash "-" => escalating cost, each level n costs 3*n
  if(info.min !== info.max){
    let cost = 0;
    for(let lvl=currentLevel+1; lvl<=desiredLevel; lvl++) cost += lvl*3;
    return cost;
  }
  // Fixed level
  return currentLevel>0 ? 0 : info.max*3;
} 