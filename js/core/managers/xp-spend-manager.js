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

/**
 * XP Spending Manager - Mode-Based Approach
 * 
 * This provides a "Spend XP" mode that integrates with the existing character sheet UI
 * instead of using complex modals. Players can make changes normally and see real-time
 * XP costs, then confirm all changes at once.
 */

// Import reference data
import { attributes as ATTR_REF } from '../../data/attributes.js';
import { skills as SKILL_REF } from '../../data/skills.js';
import { disciplines as DISC_REF } from '../../data/vampire/disciplines.js';
import { merits as MERIT_REF } from '../../data/vampire/merits.js';
import { backgrounds as BG_REF } from '../../data/vampire/backgrounds.js';
import { clans as CLAN_REF } from '../../data/vampire/clans.js';

(function() {
  'use strict';

  let spendMode = false;
  let originalStates = new Map();
  let pendingChanges = new Map();
  let xpDisplay = null;

  // Initialize when DOM is ready
  $(document).ready(function() {
    // Wait a bit for all components to load
    setTimeout(function() {
      initializeXPSpendMode();
    }, 1000);
  });

  function initializeXPSpendMode() {
    console.log('[XP] Initializing XP Spend Mode...');
    
    // Create XP display element
    createXPDisplay();
    
    // Bind events
    bindXPSpendEvents();
    
    // Expose toggle function globally for toolbar integration
    window.XPSpendManager = {
      toggleXPSpendMode: toggleXPSpendMode
    };
    
    console.log('[XP] XP Spend Mode initialized');
  }

  function addXPSpendButton() {
    // This function is now handled by the character toolbar
    // Keeping it for backward compatibility but it won't do anything
    console.log('[XP] Button creation is now handled by character toolbar');
  }

  function createXPDisplay() {
    // Create XP display overlay
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
    // Confirm button
    $(document).on('click', '#btn-confirm-xp', confirmXPSpend);
    
    // Cancel button
    $(document).on('click', '#btn-cancel-xp', cancelXPSpend);
    
    // Close button
    $(document).on('click', '#btn-close-xp', cancelXPSpend);
    
    // Track changes to character sheet elements
    $(document).on('click', '.dot', handleDotClick);
    $(document).on('click', '#addBackgroundBtn, #addBackgroundFlawBtn, #addMeritBtn, #addFlawBtn', handleAddTrait);
    $(document).on('click', '.remove-trait-btn', handleRemoveTrait);
  }

  function toggleXPSpendMode() {
    console.log('[XP] Toggle XP Spend Mode called, current state:', spendMode);
    
    spendMode = !spendMode;
    const button = document.getElementById('btn-xp-spend');
    
    console.log('[XP] New spend mode state:', spendMode);
    console.log('[XP] Button found:', button);
    
    if (spendMode) {
      // Enter spend mode
      if (button) {
        button.classList.add('active');
        button.title = 'Exit XP Spend Mode';
      }
      xpDisplay.classList.remove('d-none');
      xpDisplay.classList.add('d-block');
      
      // Store original states
      captureOriginalStates();
      
      // Update display
      updateXPDisplay();
      
      // Show feedback
      if (window.toastManager) {
        window.toastManager.show('XP Spend Mode activated. Make changes to your character to see costs.', 'info', 'XP Mode');
      } else {
        console.log('[XP] XP Spend Mode activated. Make changes to your character to see costs.');
      }
    } else {
      // Exit spend mode
      if (button) {
        button.classList.remove('active');
        button.title = 'Spend XP Mode';
      }
      xpDisplay.classList.add('d-none');
      xpDisplay.classList.remove('d-block');
      
      // Clear pending changes
      pendingChanges.clear();
      
      // Show feedback
      if (window.toastManager) {
        window.toastManager.show('XP Spend Mode deactivated.', 'info', 'XP Mode');
      } else {
        console.log('[XP] XP Spend Mode deactivated.');
      }
    }
  }

  function captureOriginalStates() {
    originalStates.clear();
    
    // Capture attribute levels
    $('.stat').each(function() {
      const $stat = $(this);
      const label = $stat.find('.stat-label').text().trim();
      const $dots = $stat.find('.dots');
      if ($dots.length) {
        const level = parseInt($dots.data('value') || '0');
        originalStates.set(`attribute:${label}`, level);
      }
    });
    
    // Capture background levels
    if (window.backgroundManager) {
      const backgrounds = window.backgroundManager.getSelectedBackgrounds();
      Object.entries(backgrounds).forEach(([key, data]) => {
        originalStates.set(`background:${key}`, data.level || 0);
      });
    }
    
    // Capture merit levels
    if (window.meritFlawManager) {
      const merits = window.meritFlawManager.getSelectedMerits();
      Object.entries(merits).forEach(([key, data]) => {
        originalStates.set(`merit:${key}`, data.level || 0);
      });
    }
  }

  function handleDotClick(e) {
    if (!spendMode) return;
    
    const $dot = $(e.currentTarget);
    const $dots = $dot.parent();
    const traitKey = $dots.data('trait-key');
    const traitCategory = $dots.data('trait-category');
    
    if (traitKey && traitCategory) {
      // Calculate the new level based on which dot was clicked
      const clickedValue = parseInt($dot.data('value'));
      const currentValue = parseInt($dots.data('value') || '0');
      let newValue = clickedValue;
      
      // If clicking the same dot, decrease by 1
      if (clickedValue === currentValue) {
        newValue = Math.max(currentValue - 1, 0);
      }
      
      // Track the change
      trackChange(traitCategory, traitKey, currentValue, newValue);
    }
  }

  function handleAddTrait(e) {
    if (!spendMode) return;
    
    const $btn = $(e.currentTarget);
    const traitType = $btn.attr('id');
    let category, key;
    
    // Determine what type of trait is being added
    if (traitType === 'addBackgroundBtn') {
      category = 'background';
      key = $('#backgroundSelect').val();
    } else if (traitType === 'addBackgroundFlawBtn') {
      category = 'backgroundFlaw';
      key = $('#backgroundFlawSelect').val();
    } else if (traitType === 'addMeritBtn') {
      category = 'merit';
      key = $('#meritSelect').val();
    } else if (traitType === 'addFlawBtn') {
      category = 'flaw';
      key = $('#flawSelect').val();
    }
    
    if (category && key) {
      // Get trait info for costing
      const meta = getTraitMeta(category, key);
      const info = TraitManagerUtils.parseDotsNotation(meta?.dots || '•');
      const baseLevel = info.min || 1;
      
      // Track the addition
      trackChange(category, key, 0, baseLevel, true);
    }
  }

  function handleRemoveTrait(e) {
    if (!spendMode) return;
    
    const $btn = $(e.currentTarget);
    const traitType = $btn.data('trait-type');
    const traitKey = $btn.data('trait-key');
    const instanceIndex = $btn.data('instance');
    
    if (traitType && traitKey) {
      // Get current level
      let currentLevel = 0;
      if (traitType === 'background' && window.backgroundManager) {
        currentLevel = window.backgroundManager.getBackgroundLevel(traitKey);
      } else if (traitType === 'merit' && window.meritFlawManager) {
        currentLevel = window.meritFlawManager.getMeritLevel(traitKey);
      }
      
      // Track the removal
      trackChange(traitType, traitKey, currentLevel, 0, false, true);
    }
  }

  function trackChange(category, key, fromLevel, toLevel, isAddition = false, isRemoval = false) {
    const changeKey = `${category}:${key}`;
    const originalLevel = originalStates.get(changeKey) || 0;
    
    // Calculate the effective change
    let effectiveFrom, effectiveTo;
    if (isAddition) {
      effectiveFrom = originalLevel;
      effectiveTo = originalLevel + toLevel;
    } else if (isRemoval) {
      effectiveFrom = originalLevel;
      effectiveTo = 0;
    } else {
      effectiveFrom = originalLevel;
      effectiveTo = originalLevel + (toLevel - fromLevel);
    }
    
    // Calculate cost
    let cost = 0;
    if (category === 'background') {
      cost = calcMeritBackgroundCost(getTraitMeta(category, key)?.dots || '•', effectiveFrom, effectiveTo, true);
    } else if (category === 'merit') {
      cost = calcMeritBackgroundCost(getTraitMeta(category, key)?.dots || '•', effectiveFrom, effectiveTo, false);
    } else if (category === 'attribute' || category === 'skill') {
      const { pricingCat, pricingOpts } = buildPricingContext(category, key);
      cost = getTotalPrice(pricingCat, effectiveFrom, effectiveTo, pricingOpts);
    }
    
    // Store the change
    pendingChanges.set(changeKey, {
      category,
      key,
      from: effectiveFrom,
      to: effectiveTo,
      cost,
      description: getChangeDescription(category, key, effectiveFrom, effectiveTo, isAddition, isRemoval)
    });
    
    // Update display
    updateXPDisplay();
  }

  function getChangeDescription(category, key, from, to, isAddition, isRemoval) {
    const label = TraitManagerUtils.camelToTitle(key);
    
    if (isAddition) {
      return `Add ${label}`;
    } else if (isRemoval) {
      return `Remove ${label}`;
    } else if (from === 0 && to > 0) {
      return `Add ${label} at level ${to}`;
    } else if (to === 0) {
      return `Remove ${label}`;
    } else {
      return `${label} ${from} → ${to}`;
    }
  }

  function updateXPDisplay() {
    if (!xpDisplay) return;
    
    const availableXP = window.xpManager?.getAvailableXP() || 0;
    const totalCost = Array.from(pendingChanges.values()).reduce((sum, change) => sum + change.cost, 0);
    const remainingXP = availableXP - totalCost;
    
    // Update amounts
    $('#xp-available-amount').text(availableXP);
    $('#xp-total-cost').text(totalCost);
    $('#xp-remaining-amount').text(remainingXP);
    
    // Update confirm button
    const confirmBtn = $('#btn-confirm-xp');
    confirmBtn.prop('disabled', totalCost === 0 || totalCost > availableXP);
    
    // Update changes list
    updateChangesList();
    
    // Update styling based on remaining XP
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
    
    if (totalCost > availableXP) {
      if (window.toastManager) {
        window.toastManager.show('Not enough XP available.', 'warning', 'XP Spend');
      }
      return;
    }
    
    // Create summary for confirmation
    const changesSummary = Array.from(pendingChanges.values()).map(change => 
      `${change.description} (${change.cost} XP)`
    ).join('\n');
    
    const confirmed = await showConfirmModal(
      'Confirm XP Spend',
      `Spend ${totalCost} XP on the following changes?\n\n${changesSummary}`,
      'Confirm Spend',
      'btn-primary'
    );
    
    if (!confirmed) return;
    
    // Apply all changes
    for (const [key, change] of pendingChanges) {
      await applyTraitChange(change.category, change.key, change.from, change.to);
    }
    
    // Spend the XP
    const note = `XP Spend: ${Array.from(pendingChanges.values()).map(c => c.description).join(', ')}`;
    const ok = window.xpManager?.spendXP(totalCost, note, { changes: Array.from(pendingChanges.values()) });
    
    if (!ok) {
      if (window.toastManager) {
        window.toastManager.show('Failed to spend XP.', 'error', 'XP Spend');
      }
      return;
    }
    
    // Exit spend mode
    toggleXPSpendMode();
    
    // Show success message
    if (window.toastManager) {
      window.toastManager.show(`Successfully spent ${totalCost} XP.`, 'success', 'XP Spend');
    }
  }

  function cancelXPSpend() {
    // Revert all changes
    for (const [key, change] of pendingChanges) {
      // This would need to revert the changes made to the UI
      // For now, just clear the pending changes
    }
    
    // Exit spend mode
    toggleXPSpendMode();
    
    if (window.toastManager) {
      window.toastManager.show('XP spend cancelled. Changes reverted.', 'info', 'XP Mode');
    }
  }

  // Helper functions
  function getTraitMeta(category, key) {
    switch(category) {
      case 'attribute': return ATTR_REF?.attributes?.[key] || {};
      case 'skill': return SKILL_REF?.[key] || {};
      case 'discipline': return DISC_REF?.types?.[key] || {};
      case 'merit': {
        for (const [catKey, category] of Object.entries(MERIT_REF)) {
          if (category?.merits && category.merits[key]) {
            return category.merits[key];
          }
        }
        return {};
      }
      case 'background': {
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
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  function getTotalPrice(category, fromLevel, toLevel, options = {}) {
    const levelDiff = toLevel - fromLevel;
    if (levelDiff <= 0) return 0;
    
    switch (category) {
      case 'attribute':
        return levelDiff * 5;
      case 'skill':
        return levelDiff * 3;
      case 'discipline':
        const baseCost = options.clanMatched ? 7 : 10;
        return levelDiff * baseCost;
      default:
        return levelDiff * 3;
    }
  }

  function calcMeritBackgroundCost(dotsString, currentLevel, desiredLevel, isBackground = false) {
    const info = TraitManagerUtils.parseDotsNotation(dotsString || '•');
    
    if (info.canRepeat || isBackground) {
      const baseDots = info.min || 1;
      return (desiredLevel - currentLevel) * baseDots * 3;
    }
    
    if (info.hasOr) {
      const sorted = [...info.orValues].sort((a, b) => a - b);
      let cost = 0;
      for (const lvl of sorted) {
        if (lvl > currentLevel && lvl <= desiredLevel) { cost += lvl * 3; }
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
    return new Promise((resolve) => {
      const modalId = 'xp-confirm-modal';
      const modalHtml = `
        <div class="modal fade" id="${modalId}" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content bg-dark text-light">
              <div class="modal-header">
                <h5 class="modal-title">${title}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <pre style="white-space: pre-wrap; font-family: inherit;">${message}</pre>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn ${confirmClass}" id="confirm-btn">${confirmText}</button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Remove existing modal if any
      $(`#${modalId}`).remove();
      
      // Add new modal
      $('body').append(modalHtml);
      
      const modal = new bootstrap.Modal(document.getElementById(modalId));
      
      $(`#${modalId} #confirm-btn`).on('click', () => {
        modal.hide();
        resolve(true);
      });
      
      $(`#${modalId}`).on('hidden.bs.modal', () => {
        resolve(false);
        $(`#${modalId}`).remove();
      });
      
      modal.show();
    });
  }

  // Export functions for external use
  window.xpSpendManager = {
    toggleMode: toggleXPSpendMode,
    isActive: () => spendMode,
    getPendingChanges: () => Array.from(pendingChanges.values()),
    getTotalCost: () => Array.from(pendingChanges.values()).reduce((sum, change) => sum + change.cost, 0)
  };

})(); 