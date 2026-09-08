/**
 * Spend-XP mode: edit the sheet, see costs, confirm to spend (or cancel to restore).
 */
import { attributes as ATTR_REF } from '../../data/attributes.js';
import { skills as SKILL_REF } from '../../data/skills.js';
import { disciplines as DISC_REF } from '../../data/vampire/disciplines.js';
import { merits as MERIT_REF } from '../../data/vampire/merits.js';
import { backgrounds as BG_REF } from '../../data/vampire/backgrounds.js';
import { clans as CLAN_REF } from '../../data/vampire/clans.js';
import { TraitManagerUtils } from './manager-utils.js';
import { getTotalPrice } from '../utils/xp-pricing.js';
import logger from '../utils/logger.js';

(function () {
  'use strict';

  let spendMode = false;
  let snapshot = null;
  let pendingChanges = new Map();
  let xpDisplay = null;

  $(document).ready(function () {
    setTimeout(initializeXPSpendMode, 1000);
  });

  function initializeXPSpendMode() {
    createXPDisplay();
    bindXPSpendEvents();
    const api = {
      toggleXPSpendMode: toggleXPSpendMode,
      toggleMode: toggleXPSpendMode,
      isActive: () => spendMode,
      getPendingChanges: () => Array.from(pendingChanges.values()),
      getTotalCost: () => Array.from(pendingChanges.values()).reduce((sum, c) => sum + c.cost, 0)
    };
    window.XPSpendManager = api;
    window.xpSpendManager = api;
  }

  function createXPDisplay() {
    xpDisplay = document.createElement('div');
    xpDisplay.id = 'xp-spend-display';
    xpDisplay.className = 'xp-spend-overlay d-none';
    xpDisplay.innerHTML = `
      <div class="xp-spend-header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4><i class="bi bi-currency-dollar"></i> Spend XP Mode</h4>
          <button id="btn-close-xp" class="btn-close btn-close-white" style="font-size: 0.8rem;" title="Close"></button>
        </div>
        <div class="xp-info">
          <span class="xp-available">Available: <strong id="xp-available-amount">0</strong> XP</span>
          <span class="xp-cost">Cost: <strong id="xp-total-cost">0</strong> XP</span>
          <span class="xp-remaining">Remaining: <strong id="xp-remaining-amount">0</strong> XP</span>
        </div>
      </div>
      <div class="xp-spend-controls">
        <button id="btn-confirm-xp" class="btn theme-btn-primary" disabled>
          <i class="bi bi-check-circle"></i> Confirm
        </button>
        <button id="btn-cancel-xp" class="btn theme-btn-secondary">
          <i class="bi bi-x-circle"></i> Cancel
        </button>
      </div>
      <div class="xp-changes-list" id="xp-changes-list">
        <p class="text-muted">Make changes to your character to see XP costs here...</p>
      </div>
    `;
    document.body.appendChild(xpDisplay);
  }

  function bindXPSpendEvents() {
    $(document).on('click', '#btn-confirm-xp', confirmXPSpend);
    $(document).on('click', '#btn-cancel-xp, #btn-close-xp', cancelXPSpend);
    $(document).on('click', '.dot', handleDotClick);
    $(document).on(
      'click',
      '#addBackgroundBtn, #addBackgroundFlawBtn, #addMeritBtn, #addFlawBtn',
      handleAddTrait
    );
    $(document).on('click', '.remove-trait-btn, .remove-merit-btn, .remove-flaw-btn', handleRemoveTrait);
  }

  function toast(message, type = 'info', title = 'XP Mode') {
    if (window.toastManager) {
      window.toastManager.show(message, type, title);
    } else {
      logger.log(message);
    }
  }

  function toggleXPSpendMode() {
    spendMode = !spendMode;
    const button = document.getElementById('btn-xp-spend');

    if (spendMode) {
      if (button) {
        button.classList.add('active');
        button.title = 'Exit XP Spend Mode';
      }
      xpDisplay.classList.remove('d-none');
      xpDisplay.classList.add('d-block');
      ensureStatDotMeta();
      snapshot = captureSnapshot();
      pendingChanges.clear();
      updateXPDisplay();
      toast('XP Spend Mode activated. Make changes to see costs.');
    } else {
      if (button) {
        button.classList.remove('active');
        button.title = 'Spend XP Mode';
      }
      xpDisplay.classList.add('d-none');
      xpDisplay.classList.remove('d-block');
      pendingChanges.clear();
      snapshot = null;
      updateXPDisplay();
    }
  }

  function ensureStatDotMeta() {
    $('.stat').each(function () {
      const $stat = $(this);
      const $dots = $stat.find('.dots').first();
      if (!$dots.length) return;
      if ($dots.data('trait-key')) return;

      const $label = $stat.find('.stat-label');
      const labelText = ($label.text() || '').trim().toLowerCase();
      const dataStat = ($label.attr('data-stat') || '').toLowerCase();
      const key = normaliseKey(dataStat || labelText);
      if (!key) return;

      const skip = new Set([
        'name', 'concept', 'chronicle', 'ambition', 'desire', 'sire',
        'health', 'willpower', 'humanity', 'hunger', 'predator', 'clan',
        'generation', 'bloodpotency', 'resonance', 'temperament', 'compulsion'
      ]);
      if (skip.has(key)) return;

      let category = null;
      if (findAttributeKey(key) || findAttributeByLabel(labelText)) {
        category = 'attribute';
      } else if (findSkillKey(key) || findSkillByLabel(labelText)) {
        category = 'skill';
      }
      if (!category) return;

      const traitKey = category === 'attribute'
        ? (findAttributeKey(key) || findAttributeByLabel(labelText))
        : (findSkillKey(key) || findSkillByLabel(labelText));

      $dots.attr('data-trait-key', traitKey);
      $dots.attr('data-trait-category', category);
      $dots.data('trait-key', traitKey);
      $dots.data('trait-category', category);
    });
  }

  function eachAttribute(fn) {
    for (const group of Object.values(ATTR_REF || {})) {
      const attrs = group?.attributes;
      if (!attrs) continue;
      for (const [k, v] of Object.entries(attrs)) {
        if (fn(k, v) === true) return true;
      }
    }
    return false;
  }

  function findAttributeKey(key) {
    let found = null;
    eachAttribute((k) => {
      if (normaliseKey(k) === key) {
        found = k;
        return true;
      }
    });
    return found;
  }

  function findAttributeByLabel(label) {
    let found = null;
    eachAttribute((k, v) => {
      if ((v.name || TraitManagerUtils.camelToTitle(k)).toLowerCase() === label) {
        found = k;
        return true;
      }
    });
    return found;
  }

  function eachSkill(fn) {
    for (const group of Object.values(SKILL_REF || {})) {
      if (!group || typeof group !== 'object') continue;
      for (const [k, v] of Object.entries(group)) {
        if (!v || typeof v !== 'object' || !v.name) continue;
        if (fn(k, v) === true) return true;
      }
    }
    return false;
  }

  function findSkillKey(key) {
    let found = null;
    eachSkill((k) => {
      if (normaliseKey(k) === key) {
        found = k;
        return true;
      }
    });
    return found;
  }

  function findSkillByLabel(label) {
    let found = null;
    eachSkill((k, v) => {
      if ((v.name || TraitManagerUtils.camelToTitle(k)).toLowerCase() === label) {
        found = k;
        return true;
      }
    });
    return found;
  }

  function captureSnapshot() {
    const dots = {};
    $('.dots[data-trait-key][data-trait-category]').each(function () {
      const $d = $(this);
      const cat = $d.data('trait-category');
      const key = $d.data('trait-key');
      const instance = $d.data('instance');
      const changeKey = instance != null && instance !== ''
        ? `${cat}:${key}:${instance}`
        : `${cat}:${key}`;
      dots[changeKey] = parseInt($d.attr('data-value') || $d.data('value') || '0', 10);
    });

    return {
      dots,
      merits: window.meritFlawManager ? structuredClone(window.meritFlawManager.getSelectedMerits()) : {},
      flaws: window.meritFlawManager ? structuredClone(window.meritFlawManager.getSelectedFlaws()) : {},
      backgrounds: window.backgroundManager ? structuredClone(window.backgroundManager.getSelectedBackgrounds()) : {},
      backgroundFlaws: window.backgroundManager ? structuredClone(window.backgroundManager.getSelectedBackgroundFlaws()) : {}
    };
  }

  function restoreSnapshot() {
    if (!snapshot) return;

    if (window.meritFlawManager) {
      window.meritFlawManager.loadMeritsAndFlaws(snapshot.merits, snapshot.flaws);
    }
    if (window.backgroundManager) {
      window.backgroundManager.loadBackgroundsAndFlaws(snapshot.backgrounds, snapshot.backgroundFlaws);
    }

    Object.entries(snapshot.dots).forEach(([changeKey, level]) => {
      const parts = changeKey.split(':');
      const cat = parts[0];
      const key = parts[1];
      const instance = parts[2];
      let $dots = $(`.dots[data-trait-category="${cat}"][data-trait-key="${key}"]`);
      if (instance != null) {
        $dots = $dots.filter(`[data-instance="${instance}"]`);
      }
      if (!$dots.length && (cat === 'attribute' || cat === 'skill')) {
        $dots = $(`.dots[data-trait-category="${cat}"][data-trait-key="${key}"]`);
      }
      $dots.each(function () {
        TraitManagerUtils.refreshDots($(this), level);
      });
    });
  }

  function handleDotClick(e) {
    if (!spendMode) return;

    setTimeout(() => {
      const $dot = $(e.currentTarget);
      const $dots = $dot.parent();
      let traitKey = $dots.data('trait-key');
      let traitCategory = $dots.data('trait-category');

      if (!traitKey || !traitCategory) {
        const merit = $dots.data('merit');
        const flaw = $dots.data('flaw');
        if (merit) {
          traitKey = merit;
          traitCategory = 'merit';
        } else if (flaw) {
          traitKey = flaw;
          traitCategory = 'flaw';
        }
      }

      if (!traitKey || !traitCategory) return;
      if (['hunger'].includes(String(traitCategory))) return;

      const instance = $dots.data('instance');
      const changeKey = instance != null && instance !== ''
        ? `${traitCategory}:${traitKey}:${instance}`
        : `${traitCategory}:${traitKey}`;
      const original = snapshot?.dots?.[changeKey] ?? snapshot?.dots?.[`${traitCategory}:${traitKey}`] ?? 0;
      const current = parseInt($dots.attr('data-value') || $dots.data('value') || '0', 10);

      if (current === original) {
        pendingChanges.delete(changeKey);
      } else {
        trackChange(traitCategory, traitKey, original, current, false, false, changeKey);
      }
      updateXPDisplay();
    }, 0);
  }

  function handleAddTrait(e) {
    if (!spendMode) return;

    setTimeout(() => {
      const id = e.currentTarget.id;
      let category;
      let key;
      if (id === 'addBackgroundBtn') {
        category = 'background';
        key = $('#backgroundSelect').val();
      } else if (id === 'addBackgroundFlawBtn') {
        category = 'backgroundFlaw';
        key = $('#backgroundFlawSelect').val();
      } else if (id === 'addMeritBtn') {
        category = 'merit';
        key = $('#meritSelect').val();
      } else if (id === 'addFlawBtn') {
        category = 'flaw';
        key = $('#flawSelect').val();
      }
      if (!category || !key) return;

      const meta = getTraitMeta(category, key);
      const info = TraitManagerUtils.parseDotsNotation(meta?.dots || '•');
      const baseLevel = info.hasOr ? (info.orValues[0] || info.min || 1) : (info.min || 1);
      const changeKey = `${category}:${key}`;
      const original = levelFromSnapshot(category, key);
      trackChange(category, key, original, Math.max(original, baseLevel) || baseLevel, true, false, changeKey);
      updateXPDisplay();
    }, 50);
  }

  function handleRemoveTrait(e) {
    if (!spendMode) return;

    const $btn = $(e.currentTarget);
    let traitType = $btn.data('trait-type');
    let traitKey = $btn.data('trait-key');
    if (!traitType || !traitKey) {
      if ($btn.hasClass('remove-merit-btn') || $btn.data('merit')) {
        traitType = 'merit';
        traitKey = $btn.data('merit');
      } else if ($btn.hasClass('remove-flaw-btn') || $btn.data('flaw')) {
        traitType = 'flaw';
        traitKey = $btn.data('flaw');
      }
    }
    if (!traitType || !traitKey) return;

    const changeKey = `${traitType}:${traitKey}`;
    const original = levelFromSnapshot(traitType, traitKey);
    trackChange(traitType, traitKey, original, 0, false, true, changeKey);
    updateXPDisplay();
  }

  function levelFromSnapshot(category, key) {
    if (!snapshot) return 0;
    if (category === 'merit') return snapshot.merits?.[key]?.level || sumInstances(snapshot.merits?.[key]) || 0;
    if (category === 'flaw') return snapshot.flaws?.[key]?.level || sumInstances(snapshot.flaws?.[key]) || 0;
    if (category === 'background') {
      return sumInstances(snapshot.backgrounds?.[key]) || snapshot.backgrounds?.[key]?.level || 0;
    }
    if (category === 'backgroundFlaw') {
      return sumInstances(snapshot.backgroundFlaws?.[key]) || snapshot.backgroundFlaws?.[key]?.level || 0;
    }
    return snapshot.dots?.[`${category}:${key}`] || 0;
  }

  function sumInstances(data) {
    if (!data) return 0;
    if (data.instances?.length) {
      return data.instances.reduce((t, i) => t + (i.level || 0), 0);
    }
    return data.level || 0;
  }

  function trackChange(category, key, fromLevel, toLevel, isAddition, isRemoval, changeKey) {
    const ck = changeKey || `${category}:${key}`;
    let cost = 0;
    if (toLevel > fromLevel) {
      if (category === 'background' || category === 'backgroundFlaw') {
        cost = calcMeritBackgroundCost(getTraitMeta(category, key)?.dots || '•', fromLevel, toLevel, true);
      } else if (category === 'merit' || category === 'flaw') {
        cost = calcMeritBackgroundCost(getTraitMeta(category, key)?.dots || '•', fromLevel, toLevel, false);
      } else if (category === 'attribute' || category === 'skill' || category === 'discipline') {
        const { pricingCat, pricingOpts } = buildPricingContext(category, key);
        cost = getTotalPrice(pricingCat, fromLevel, toLevel, pricingOpts);
      }
    }

    if (fromLevel === toLevel && !isAddition && !isRemoval) {
      pendingChanges.delete(ck);
      return;
    }

    pendingChanges.set(ck, {
      category,
      key,
      from: fromLevel,
      to: toLevel,
      cost,
      description: getChangeDescription(category, key, fromLevel, toLevel, isAddition, isRemoval)
    });
  }

  function getChangeDescription(category, key, from, to, isAddition, isRemoval) {
    const label = TraitManagerUtils.camelToTitle(String(key));
    if (isAddition) return `Add ${label}`;
    if (isRemoval || to === 0) return `Remove ${label}`;
    if (from === 0 && to > 0) return `Add ${label} at level ${to}`;
    return `${label} ${from} → ${to}`;
  }

  function updateXPDisplay() {
    if (!xpDisplay) return;

    const availableXP = window.xpManager?.getAvailableXP() || 0;
    const totalCost = Array.from(pendingChanges.values()).reduce((sum, change) => sum + change.cost, 0);
    const remainingXP = availableXP - totalCost;

    $('#xp-available-amount').text(availableXP);
    $('#xp-total-cost').text(totalCost);
    $('#xp-remaining-amount').text(remainingXP);
    $('#btn-confirm-xp').prop('disabled', totalCost === 0 || totalCost > availableXP);
    updateChangesList();
    $('#xp-remaining-amount').removeClass('text-danger text-success').addClass(
      remainingXP < 0 ? 'text-danger' : 'text-success'
    );
  }

  function updateChangesList() {
    const changesList = $('#xp-changes-list');
    if (pendingChanges.size === 0) {
      changesList.html('<p class="text-muted">Make changes to your character to see XP costs here...</p>');
      return;
    }
    const changesHtml = Array.from(pendingChanges.values()).map(change => `
      <div class="xp-change-item">
        <span class="change-description">${change.description}</span>
        <span class="change-cost">${change.cost} XP</span>
      </div>
    `).join('');
    changesList.html(changesHtml);
  }

  async function confirmXPSpend() {
    const totalCost = Array.from(pendingChanges.values()).reduce((sum, change) => sum + change.cost, 0);
    const availableXP = window.xpManager?.getAvailableXP() || 0;

    if (totalCost <= 0) return;
    if (totalCost > availableXP) {
      toast('Not enough XP available.', 'warning', 'XP Spend');
      return;
    }

    const changesSummary = Array.from(pendingChanges.values())
      .map(change => `${change.description} (${change.cost} XP)`)
      .join('\n');

    const confirmed = await showConfirmModal(
      'Confirm XP Spend',
      `Spend ${totalCost} XP on the following changes?\n\n${changesSummary}`,
      'Confirm Spend',
      'btn-primary'
    );
    if (!confirmed) return;

    // Sheet already reflects edits; only spend XP.
    const note = `XP Spend: ${Array.from(pendingChanges.values()).map(c => c.description).join(', ')}`;
    const ok = await window.xpManager?.spendXP(totalCost, note, {
      changes: Array.from(pendingChanges.values())
    });

    if (!ok) {
      toast('Failed to spend XP.', 'error', 'XP Spend');
      return;
    }

    pendingChanges.clear();
    snapshot = null;
    spendMode = true;
    toggleXPSpendMode();
    toast(`Successfully spent ${totalCost} XP.`, 'success', 'XP Spend');
  }

  function cancelXPSpend() {
    restoreSnapshot();
    pendingChanges.clear();
    spendMode = true;
    toggleXPSpendMode();
    toast('XP spend cancelled. Changes reverted.');
  }

  function getTraitMeta(category, key) {
    switch (category) {
      case 'attribute': {
        let meta = {};
        eachAttribute((k, v) => {
          if (k === key) {
            meta = v;
            return true;
          }
        });
        return meta;
      }
      case 'skill': {
        let meta = {};
        eachSkill((k, v) => {
          if (k === key) {
            meta = v;
            return true;
          }
        });
        return meta;
      }
      case 'discipline':
        return DISC_REF?.types?.[key] || {};
      case 'merit':
      case 'flaw': {
        const bucket = category === 'merit' ? 'merits' : 'flaws';
        for (const cat of Object.values(MERIT_REF || {})) {
          if (cat?.[bucket]?.[key]) return cat[bucket][key];
        }
        return {};
      }
      case 'background':
      case 'backgroundFlaw': {
        const bucket = category === 'background' ? 'merits' : 'flaws';
        for (const cat of Object.values(BG_REF || {})) {
          if (cat?.[bucket]?.[key]) return cat[bucket][key];
        }
        return {};
      }
      default:
        return {};
    }
  }

  function buildPricingContext(category, traitKey) {
    let pricingCat = category;
    const opts = {};

    if (category === 'discipline') {
      const ritualKeys = ['blood_sorcery_rituals', 'oblivion_ceremonies', 'thin_blood_alchemy'];
      const snakeKey = normaliseKey(traitKey);
      if (ritualKeys.includes(snakeKey)) {
        pricingCat = 'ritual';
      } else {
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

  function normaliseKey(str) {
    return String(str || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  function calcMeritBackgroundCost(dotsString, currentLevel, desiredLevel, isBackground = false) {
    const info = TraitManagerUtils.parseDotsNotation(dotsString || '•');

    if (info.canRepeat || isBackground) {
      const baseDots = info.min || 1;
      return Math.max(0, desiredLevel - currentLevel) * baseDots * 3;
    }

    if (info.hasOr) {
      const sorted = [...info.orValues].sort((a, b) => a - b);
      let cost = 0;
      for (const lvl of sorted) {
        if (lvl > currentLevel && lvl <= desiredLevel) cost += lvl * 3;
      }
      return cost;
    }

    if (info.min !== info.max) {
      let cost = 0;
      for (let lvl = currentLevel + 1; lvl <= desiredLevel; lvl++) cost += lvl * 3;
      return cost;
    }

    return currentLevel > 0 ? 0 : info.max * 3;
  }

  async function showConfirmModal(title, message, confirmText = 'Confirm', confirmClass = 'btn-primary') {
    if (window.modalManager?.confirm) {
      return window.modalManager.confirm(title, message, { confirmText, confirmClass });
    }
    return TraitManagerUtils.showConfirmModal(title, message, confirmText, confirmClass);
  }
})();
