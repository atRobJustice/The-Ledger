// XP Spend Manager (scaffold)
// -------------------------------------------------------------
// This module will orchestrate spending XP via the UI.
// Current step: injects a placeholder modal and opens it when
// the "Spend XP" button is clicked.
// Future steps will extend this with pricing and trait updates.

import { getTotalPrice } from './xp-pricing.js';
import { TraitManagerUtils } from './manager-utils.js';

// Import references for trait lists
import { attributes as ATTR_REF } from './references/attributes.js';
import { skills as SKILL_REF } from './references/skills.js';
import { disciplines as DISC_REF } from './references/disciplines.js';
import { clans as CLAN_REF } from './references/clans.js';
import { merits as MERIT_REF } from './references/merits.js';
import { backgrounds as BG_REF } from './references/backgrounds.js';

(function () {
  // Wait until DOM & Bootstrap ready
  document.addEventListener('DOMContentLoaded', () => {
    injectModal();
    bindClick();
  });

  function injectModal() {
    if (document.getElementById('xp-spend-modal')) return; // already injected

    const modalHtml = `
      <div class="modal fade" id="xp-spend-modal" tabindex="-1" aria-labelledby="xpSpendModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="xpSpendModalLabel">Spend Experience Points</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger spend-xp" id="xp-spend-confirm" disabled>Confirm Purchase</button>
            </div>
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  function bindClick() {
    const btn = document.getElementById('spend-xp');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const modalEl = document.getElementById('xp-spend-modal');
      if (!modalEl) return;

      // Reset form controls so options update based on latest data
      const catSelect = document.getElementById('xp-category');
      const traitSelect = document.getElementById('xp-trait');
      const levelContainer = document.getElementById('xp-level-container');
      const costInfo = document.getElementById('xp-cost-info');
      const confirmBtn = document.getElementById('xp-spend-confirm');

      if(catSelect){ catSelect.value=''; }
      if(traitSelect){
        traitSelect.innerHTML='<option value="" disabled selected>Select Trait</option>';
        traitSelect.disabled = true;
      }
      const specCheckbox=document.getElementById('xp-add-specialty');
      if(specCheckbox) specCheckbox.checked=false;
      // Always hide specialty container on reset
      const specContainer=document.getElementById('specialty-checkbox-container');
      if(specContainer) specContainer.classList.add('d-none');
      if(levelContainer) levelContainer.style.display='none';
      if(costInfo){
        costInfo.style.display='none';
        const costSpanEl = document.getElementById('xp-cost');
        if(costSpanEl) costSpanEl.textContent='0';
      }
      if(confirmBtn) confirmBtn.disabled = true;

      // Refresh available XP display each open
      document.getElementById('xp-available').textContent = window.xpManager?.getAvailableXP() ?? 0;

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });

    populateCategoryOptions();
    attachDynamicHandlers();
  }

  // ----------------------- UI data helpers ----------------------
  function populateCategoryOptions() {
    const select = document.getElementById('xp-category');
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
  function attachDynamicHandlers() {
    const catSelect = document.getElementById('xp-category');
    const traitSelect = document.getElementById('xp-trait');
    const levelRange = document.getElementById('xp-level');
    const levelDisplay = document.getElementById('xp-level-display');
    const levelContainer = document.getElementById('xp-level-container');
    const costInfo = document.getElementById('xp-cost-info');
    const costSpan = document.getElementById('xp-cost');
    const confirmBtn = document.getElementById('xp-spend-confirm');

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
      const specContainer = document.getElementById('specialty-checkbox-container');
      const specCheckbox = document.getElementById('xp-add-specialty');
      if(cat === 'skill') {
        specContainer.classList.remove('d-none');
        if(specCheckbox) specCheckbox.checked = false;
        document.getElementById('specialty-name-container').classList.add('d-none');
        document.getElementById('xp-specialty-name').value='';
      } else {
        specContainer.classList.add('d-none');
        if(specCheckbox) specCheckbox.checked = false;
        document.getElementById('specialty-name-container').classList.add('d-none');
      }
    });

    traitSelect.addEventListener('change', () => {
      const addingSpecialty = (catSelect.value === 'skill') && document.getElementById('xp-add-specialty').checked;

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
      updateCost();
    });

    levelRange.addEventListener('input', () => {
      levelDisplay.textContent = levelRange.value;
      updateCost();
    });

    // Specialty checkbox handler
    document.getElementById('xp-add-specialty').addEventListener('change', () => {
      const checked = document.getElementById('xp-add-specialty').checked;
      // Hide level slider if adding specialty
      levelContainer.style.display = checked ? 'none' : (traitSelect.value ? 'block' : 'none');
      const nameCont=document.getElementById('specialty-name-container');
      if(checked){ nameCont.classList.remove('d-none'); } else { nameCont.classList.add('d-none'); document.getElementById('xp-specialty-name').value=''; }
      updateCost();
    });

    let latestCost = 0;

    confirmBtn.addEventListener('click', async () => {
      const cat = catSelect.value;
      const traitKey = traitSelect.value;
      if (!cat || !traitKey) return;
      const addingSpecialty = (cat === 'skill') && document.getElementById('xp-add-specialty').checked;

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
      document.getElementById('xp-available').textContent = window.xpManager?.getAvailableXP() ?? 0;
      costInfo.style.display = 'block';
      confirmBtn.disabled = cost === 0 || cost > (window.xpManager?.getAvailableXP() ?? 0);

      let note;
      if(addingSpecialty){
        const specName=document.getElementById('xp-specialty-name').value.trim();
        if(!specName){ window.toastManager.show('Please enter a Specialty name', 'warning', 'XP Spend'); return; }
        note = `Specialty (${specName}) in ${traitKey}`;
      } else {
        note = `Raised ${traitKey} ${currentLevel}→${desiredLevel}`;
      }
      const payload = {cat, traitKey, from: currentLevel, to: desiredLevel, specialty: addingSpecialty ? document.getElementById('xp-specialty-name').value.trim() : null};
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
        addSpecialtyToSkill(skillLabel, document.getElementById('xp-specialty-name').value.trim());
      }

      // Close modal
      bootstrap.Modal.getInstance(document.getElementById('xp-spend-modal')).hide();

      // After applying changes, trigger autosave if available
      if(typeof window.gatherCharacterData==='function'){
        try{
          const data = window.gatherCharacterData();
          console.debug('[XP] autosave data', data);
          
          // Use IndexedDB exclusively
          if (window.characterManager && window.characterManager.isInitialized) {
            await window.characterManager.saveCurrentCharacter(data);
          } else if (window.databaseManager) {
            await window.databaseManager.saveActiveCharacter(data);
          } else {
            throw new Error('No database manager available for autosave');
          }
        }catch(err){ console.warn('[XP] autosave after trait change failed', err); }
      } else {
        // Backup manager not yet loaded – retry shortly
        let attempts = 0;
        const retry = async () => {
          if(typeof window.gatherCharacterData==='function'){
            try{
              const data = window.gatherCharacterData();
              console.debug('[XP] autosave data', data);
              
              // Use IndexedDB exclusively
              if (window.characterManager && window.characterManager.isInitialized) {
                await window.characterManager.saveCurrentCharacter(data);
              } else if (window.databaseManager) {
                await window.databaseManager.saveActiveCharacter(data);
              } else {
                throw new Error('No database manager available for autosave');
              }
            }catch(err){ console.warn('[XP] autosave after trait change failed', err); }
          } else if(attempts < 10){
            attempts++;
            setTimeout(retry, 300);
          }
        };
        setTimeout(retry, 300);
      }
    });

    function updateCost() {
      const cat = catSelect.value;
      if (!cat || !traitSelect.value) return;
      const addingSpecialty = (cat === 'skill') && document.getElementById('xp-add-specialty').checked;

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
      document.getElementById('xp-available').textContent = window.xpManager?.getAvailableXP() ?? 0;
      costInfo.style.display = 'block';
      confirmBtn.disabled = cost === 0 || cost > (window.xpManager?.getAvailableXP() ?? 0);
    }

    // Helper returns {currentLevel, label}
    function getCurrentLevel(cat, traitKey) {
      switch (cat) {
        case 'attribute':
        case 'skill': {
          const label = findLabelByKey(cat, traitKey);
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === label.toLowerCase());
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
          let lvl = 0;
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'blood potency');
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
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'specialty');
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
      console.debug('[XP] applyTraitChange start', {cat, traitKey, oldLevel, newLevel});
      switch (cat) {
        case 'attribute':
        case 'skill': {
          const label = findLabelByKey(cat, traitKey);
          console.debug('[XP] attribute/skill label resolved', label);
          const row = Array.from(document.querySelectorAll('.stat')).find(r => r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === label.toLowerCase());
          console.debug('[XP] row found for', label, row);
          if (row) {
            console.debug('[XP] dotsEl exists?', !!row.querySelector('.dots'));
            const dotsEl = row.querySelector('.dots');
            if (dotsEl) {
              console.debug('[XP] current dataset value', dotsEl.dataset.value, 'updating to', newLevel);
              // update dots
              dotsEl.dataset.value = newLevel;
              dotsEl.setAttribute('data-value', newLevel);
              // Sync jQuery data cache so gatherCharacterData reads the correct value
              if(window.jQuery){ window.jQuery(dotsEl).data('value', newLevel); }
              const dotEls = dotsEl.querySelectorAll('.dot');
              dotEls.forEach((d,i)=> d.classList.toggle('filled', i<newLevel));
              console.debug('[XP] row dataset value set to', row.dataset.value);
            } else {
              console.warn('[XP] applyTraitChange: stat row not found for', label);
            }
            row.dataset.value = newLevel;
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
    const row=document.querySelector(`.stat .stat-label[textContent="${skillLabel}"]`);
    const statRow = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()===skillLabel.toLowerCase());
    if(!statRow) return;
    let list=[];
    try{ list=JSON.parse(statRow.dataset.specialties||'[]'); }catch(e){ list=[]; }
    if(!list.includes(spec)){ list.push(spec); statRow.dataset.specialties=JSON.stringify(list); }
    if(window.specialtyManager?.refreshRow){
        const cap = skillLabel.replace(/\b\w/g, c=>c.toUpperCase());
        window.specialtyManager.refreshRow(cap);
    }
  }

  // ---- helper to fetch trait metadata ----
  function getTraitMeta(category,key){
    let item=null;
    if(category==='merit'){
      Object.values(MERIT_REF).some(cat=>{
        if(cat?.merits && key in cat.merits){ item=cat.merits[key]; return true; }
        return false;
      });
    } else if(category==='background'){
      Object.values(BG_REF).some(cat=>{
        if(cat?.merits && key in cat.merits){ item=cat.merits[key]; return true; }
        return false;
      });
    }
    return item;
  }

  function parseDots(dotsStr){
    if(!dotsStr) return {variable:false,max:1,fixedLevel:1};
    const clean=dotsStr.replace(/[()]/g,'');
    const variable=/[+\-]/.test(clean);
    const max=(clean.match(/•/g)||[]).length;
    return {variable,max,fixedLevel:max};
  }

  // ---- Undo handling ----
  document.addEventListener('xpUndo', async (e)=>{
     const entry=e.detail;
     if(!entry||entry.type!=='spend'||!entry.meta) return;
     await revertTraitChange(entry.meta);
  });

  async function revertTraitChange(meta){
    const {cat, traitKey, from, to, specialty}=meta;
    if(specialty){
      const skillLabel = (typeof findLabelByKey==='function') ? findLabelByKey('skill', traitKey) : traitKey;
      removeSpecialtyFromSkill(skillLabel, specialty);
    } else {
      if(typeof window.xpSpend_applyTraitChange==='function'){
        await window.xpSpend_applyTraitChange(cat, traitKey, to, from);
      } else {
        console.warn('[XP] xpSpend_applyTraitChange not found – applying minimal revert');
        minimalTraitRevert(cat, traitKey, to, from);
      }
      // trigger autosave after undo
      if(typeof window.gatherCharacterData==='function'){
        try{
          const data = window.gatherCharacterData();
          console.debug('[XP] autosave data', data);
          
          // Use IndexedDB exclusively
          if (window.characterManager && window.characterManager.isInitialized) {
            await window.characterManager.saveCurrentCharacter(data);
          } else if (window.databaseManager) {
            await window.databaseManager.saveActiveCharacter(data);
          } else {
            throw new Error('No database manager available for autosave');
          }
        }catch(err){ console.warn('[XP] autosave after undo failed', err); }
      }
    }
  }

  function removeSpecialtyFromSkill(skillLabel, spec){
    if(!spec) return;
    const statRow = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()===skillLabel.toLowerCase());
    if(!statRow) return;
    let list=[];
    try{ list=JSON.parse(statRow.dataset.specialties||'[]'); }catch(e){ list=[]; }
    const idx=list.indexOf(spec);
    if(idx>-1){ list.splice(idx,1); statRow.dataset.specialties=JSON.stringify(list); }
    if(window.specialtyManager?.refreshRow){
        const cap = skillLabel.replace(/\b\w/g, c=>c.toUpperCase());
        window.specialtyManager.refreshRow(cap);
    }
  }

  // Fallback updater if main function unavailable (handles attr/skill only)
  function minimalTraitRevert(cat, traitKey, oldLevel, newLevel){
    if(cat==='attribute' || cat==='skill'){
      const label = (typeof findLabelByKey==='function') ? findLabelByKey(cat, traitKey) : traitKey.replace(/(^|_)(\w)/g,(_,p1,p2)=>p2.toUpperCase());
      const row = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()===label.toLowerCase());
      if(!row) return;
      const dotsEl = row.querySelector('.dots');
      if(dotsEl){
        dotsEl.dataset.value=newLevel;
        dotsEl.setAttribute('data-value', newLevel);
        if(window.jQuery){ window.jQuery(dotsEl).data('value', newLevel); }
        dotsEl.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('filled', i<newLevel));
      } else {
        const spans=row.querySelectorAll('span');
        if(spans.length>1) spans[1].textContent=newLevel;
      }
      row.dataset.value=newLevel;
    } else if(cat==='bloodpotency'){
      const row = Array.from(document.querySelectorAll('.stat')).find(r=>r.querySelector('.stat-label')?.textContent.trim().toLowerCase()==='blood potency');
      if(!row) return;
      const dotsEl = row.querySelector('.dots');
      if(dotsEl){
        dotsEl.dataset.value=newLevel;
        dotsEl.setAttribute('data-value', newLevel);
        if(window.jQuery){ window.jQuery(dotsEl).data('value', newLevel); }
        dotsEl.querySelectorAll('.dot').forEach((d,i)=>d.classList.toggle('filled', i<newLevel));
      } else {
        const spans=row.querySelectorAll('span');
        if(spans.length>1) spans[1].textContent=newLevel;
      }
      row.dataset.value=newLevel;
    } else if(cat==='discipline' && window.disciplineManager){
      window.disciplineManager.changeDisciplineLevel(traitKey, oldLevel, newLevel);
    } else if(cat==='merit' && window.meritFlawManager){
      const mgr=window.meritFlawManager;
      if(newLevel===0){
        // remove trait
        mgr.removeTrait && mgr.removeTrait('merit', traitKey);
      } else {
        mgr.updateTraitInstanceLevel('merit', traitKey, 0, newLevel);
      }
    } else if(cat==='background' && window.backgroundManager){
      const mgr=window.backgroundManager;
      if(newLevel===0){
        mgr.removeTrait && mgr.removeTrait('background', traitKey);
      } else {
        mgr.updateTraitInstanceLevel('background', traitKey, 0, newLevel);
      }
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