// XP Spend Manager with Component Architecture Integration
// -------------------------------------------------------------
// This module orchestrates spending XP via the UI with component integration.

const xpGetTotalPrice = window.getTotalPrice;
const xpTraitUtils = window.TraitManagerUtils;
const ATTR_REF = window.attributes;
const SKILL_REF = window.skills;
const DISC_REF = window.disciplines;
const CLAN_REF = window.clans;
const MERIT_REF = window.merits;
const BG_REF = window.backgrounds;

class XPSpendManager {
    constructor() {
        this.eventListeners = new Map();
        this.isComponentMode = false;
        this.parentComponent = null;
        this.init();
    }

    /**
     * Set component mode and parent component
     */
    setComponentMode(parentComponent) {
        this.isComponentMode = true;
        this.parentComponent = parentComponent;
        console.log('XPSpendManager: Component mode enabled');
    }

    /**
     * Initialize the manager
     */
    init() {
  // Wait until DOM & Bootstrap ready
        if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
                this.injectModal();
                this.bindClick();
            });
        } else {
            this.injectModal();
            this.bindClick();
        }
    }

    /**
     * Event handling methods
     */
    on(event, handler) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(handler);
    }

    off(event, handler) {
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        // Emit to internal listeners
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in XP spend manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`xpSpend${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'XPSpendManager' }
        }));
    }

    injectModal() {
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

    bindClick() {
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

            if (catSelect) { catSelect.value = ''; }
            if (traitSelect) {
                traitSelect.innerHTML = '<option value="" disabled selected>Select Trait</option>';
        traitSelect.disabled = true;
      }
            const specCheckbox = document.getElementById('xp-add-specialty');
            if (specCheckbox) specCheckbox.checked = false;
      // Always hide specialty container on reset
            const specContainer = document.getElementById('specialty-checkbox-container');
            if (specContainer) specContainer.classList.add('d-none');
            if (levelContainer) levelContainer.style.display = 'none';
            if (costInfo) {
                costInfo.style.display = 'none';
        const costSpanEl = document.getElementById('xp-cost');
                if (costSpanEl) costSpanEl.textContent = '0';
      }
            if (confirmBtn) confirmBtn.disabled = true;

      // Refresh available XP display each open
      document.getElementById('xp-available').textContent = window.xpManager?.getAvailableXP() ?? 0;

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    });

        this.populateCategoryOptions();
        this.attachDynamicHandlers();
  }

  // ----------------------- UI data helpers ----------------------
    populateCategoryOptions() {
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

    getTraitOptions(categoryKey) {
    switch (categoryKey) {
      case 'attribute':
                return this.extractAttributes();
      case 'skill':
                return this.extractSkills();
      case 'discipline':
                return this.extractDisciplines();
      case 'bloodpotency':
        return [{ key: 'bloodpotency', label: 'Blood Potency' }];
      case 'merit':
                return this.extractMerits();
      case 'background':
                return this.extractBackgrounds();
      default:
        return [];
    }
  }

    extractAttributes() {
    const list = [];
    ['physical', 'social', 'mental'].forEach(group => {
      const attrs = ATTR_REF[group]?.attributes || {};
      Object.keys(attrs).forEach(key => list.push({ key, label: attrs[key].name }));
    });
    return list;
  }

    extractSkills() {
    const list = [];
    ['physical', 'social', 'mental'].forEach(group => {
      const skills = SKILL_REF[group] || {};
      Object.keys(skills).forEach(key => list.push({ key, label: skills[key].name }));
    });
    return list;
  }

    normaliseKey(str) {
        if (!str) return '';
        const withUnderscore = str.replace(/([a-z])([A-Z])/g, '$1_$2');
        return withUnderscore.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    }

    extractDisciplines() {
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
            if (k === 'blood_sorcery_rituals' || k === 'bloodSorceryRituals') {
        return hasBloodSorcery; // Need Blood Sorcery first
      }
            if (k === 'oblivion_ceremonies' || k === 'oblivionCeremonies') {
        return hasOblivion; // Need Oblivion first
      }
      return true;
    }).map(k => {
            const discipline = types[k] || {};
            return { key: k, label: discipline.name || k };
        });
    }

    extractMerits() {
        const list = [];
        Object.keys(MERIT_REF).forEach(categoryKey => {
            const category = MERIT_REF[categoryKey];
            if (category.merits) {
                Object.keys(category.merits).forEach(meritKey => {
                    const merit = category.merits[meritKey];
                    list.push({ key: meritKey, label: merit.name || meritKey });
        });
      }
    });
    return list;
  }

    extractBackgrounds() {
        const list = [];
        Object.keys(BG_REF).forEach(categoryKey => {
            const category = BG_REF[categoryKey];
            if (category.merits) {
                Object.keys(category.merits).forEach(bgKey => {
                    const bg = category.merits[bgKey];
                    list.push({ key: bgKey, label: bg.name || bgKey });
        });
      }
    });
    return list;
  }

    attachDynamicHandlers() {
        // Category selection
    const catSelect = document.getElementById('xp-category');
        if (catSelect) {
            catSelect.addEventListener('change', (e) => {
                const categoryKey = e.target.value;
                this.populateTraitOptions(categoryKey);
            });
        }

        // Trait selection
    const traitSelect = document.getElementById('xp-trait');
        if (traitSelect) {
            traitSelect.addEventListener('change', (e) => {
                const traitKey = e.target.value;
                const categoryKey = catSelect.value;
                this.handleTraitSelection(categoryKey, traitKey);
            });
        }

        // Level slider
        const levelSlider = document.getElementById('xp-level');
        if (levelSlider) {
            levelSlider.addEventListener('input', (e) => {
                const newLevel = parseInt(e.target.value);
                document.getElementById('xp-level-display').textContent = newLevel;
                this.updateCost();
            });
        }

        // Specialty checkbox
      const specCheckbox = document.getElementById('xp-add-specialty');
        if (specCheckbox) {
            specCheckbox.addEventListener('change', (e) => {
                const specContainer = document.getElementById('specialty-name-container');
                if (e.target.checked) {
        specContainer.classList.remove('d-none');
      } else {
        specContainer.classList.add('d-none');
                }
                this.updateCost();
            });
        }

        // Confirm purchase
        const confirmBtn = document.getElementById('xp-spend-confirm');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmPurchase();
            });
        }
    }

    populateTraitOptions(categoryKey) {
        const traitSelect = document.getElementById('xp-trait');
        if (!traitSelect) return;

        traitSelect.innerHTML = '<option value="" disabled selected>Select Trait</option>';
        traitSelect.disabled = false;

        const options = this.getTraitOptions(categoryKey);
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.key;
            opt.textContent = option.label;
            traitSelect.appendChild(opt);
        });
    }

    handleTraitSelection(categoryKey, traitKey) {
        if (!traitKey) return;

        const currentLevel = this.getCurrentLevel(categoryKey, traitKey);
        const levelContainer = document.getElementById('xp-level-container');
        const levelSlider = document.getElementById('xp-level');
        const levelDisplay = document.getElementById('xp-level-display');
        const specialtyContainer = document.getElementById('specialty-checkbox-container');

        // Show level slider for non-specialty purchases
        if (categoryKey === 'skill' && currentLevel >= 1) {
            specialtyContainer.classList.remove('d-none');
      } else {
            specialtyContainer.classList.add('d-none');
            levelContainer.style.display = 'block';
            levelSlider.max = 5;
            levelSlider.value = Math.min(currentLevel + 1, 5);
            levelDisplay.textContent = levelSlider.value;
        }

        this.updateCost();
    }

    updateCost() {
        const categoryKey = document.getElementById('xp-category').value;
        const traitKey = document.getElementById('xp-trait').value;
        const levelSlider = document.getElementById('xp-level');
        const specCheckbox = document.getElementById('xp-add-specialty');
        const costInfo = document.getElementById('xp-cost-info');
        const costSpan = document.getElementById('xp-cost');
        const confirmBtn = document.getElementById('xp-spend-confirm');

        if (!categoryKey || !traitKey) {
            costInfo.style.display = 'none';
            confirmBtn.disabled = true;
        return;
      }

        let cost = 0;
        const currentLevel = this.getCurrentLevel(categoryKey, traitKey);

        if (categoryKey === 'skill' && specCheckbox && specCheckbox.checked) {
            cost = 3; // Specialty cost
        } else if (levelSlider) {
            const newLevel = parseInt(levelSlider.value);
            const context = this.buildPricingContext(categoryKey, traitKey);
            cost = xpGetTotalPrice(context, currentLevel, newLevel);
        }

        const available = window.xpManager?.getAvailableXP() ?? 0;
      costSpan.textContent = cost;
        document.getElementById('xp-available').textContent = available;
      costInfo.style.display = 'block';
        confirmBtn.disabled = cost <= 0 || cost > available;
    }

    getCurrentLevel(categoryKey, traitKey) {
        switch (categoryKey) {
        case 'attribute':
                // Check character sheet for current attribute levels
                const attrGroup = this.findAttributeGroup(traitKey);
                if (attrGroup) {
                    const dots = document.querySelector(`.${attrGroup} .dots[data-attribute="${traitKey}"]`);
                    return dots ? parseInt(dots.getAttribute('data-value') || '0') : 0;
                }
                return 0;

            case 'skill':
                // Check character sheet for current skill levels
                const skillGroup = this.findSkillGroup(traitKey);
                if (skillGroup) {
                    const dots = document.querySelector(`.${skillGroup} .dots[data-skill="${traitKey}"]`);
                    return dots ? parseInt(dots.getAttribute('data-value') || '0') : 0;
                }
                return 0;

            case 'discipline':
                return window.disciplineManager?.getDisciplineLevel(traitKey) ?? 0;

            case 'merit':
                return window.meritFlawManager?.getMeritLevel(traitKey) ?? 0;

            case 'background':
                return window.backgroundManager?.getBackgroundLevel(traitKey) ?? 0;

            case 'bloodpotency':
                // Check character sheet for blood potency
                const bpDots = document.querySelector('.dots[data-vital="bloodPotency"]');
                return bpDots ? parseInt(bpDots.getAttribute('data-value') || '0') : 0;

            default:
                return 0;
        }
    }

    findAttributeGroup(traitKey) {
        const groups = ['physical', 'social', 'mental'];
        for (const group of groups) {
            const attrs = ATTR_REF[group]?.attributes || {};
            if (attrs[traitKey]) {
                return group;
            }
        }
        return null;
    }

    findSkillGroup(traitKey) {
        const groups = ['physical', 'social', 'mental'];
        for (const group of groups) {
            const skills = SKILL_REF[group] || {};
            if (skills[traitKey]) {
                return group;
            }
        }
        return null;
    }

    buildPricingContext(categoryKey, traitKey) {
        const context = {
            category: categoryKey,
            traitKey: traitKey,
            clan: document.querySelector('.clan-dropdown')?.value || '',
            generation: document.querySelector('.generation-dropdown')?.value || '',
            predatorType: document.querySelector('.predator-dropdown')?.value || ''
        };

        // Add trait-specific context
        switch (categoryKey) {
            case 'discipline':
                context.disciplineLevel = this.getCurrentLevel(categoryKey, traitKey);
          break;
            case 'merit':
            case 'background':
                // Add merit/background specific context if needed
          break;
        }

        return context;
    }

    async confirmPurchase() {
        const categoryKey = document.getElementById('xp-category').value;
        const traitKey = document.getElementById('xp-trait').value;
        const levelSlider = document.getElementById('xp-level');
        const specCheckbox = document.getElementById('xp-add-specialty');
        const specName = document.getElementById('xp-specialty-name')?.value || '';

        if (!categoryKey || !traitKey) return;

        const currentLevel = this.getCurrentLevel(categoryKey, traitKey);
        let cost = 0;
        let note = '';

        try {
            if (categoryKey === 'skill' && specCheckbox && specCheckbox.checked) {
                // Add specialty
                cost = 3;
                note = `Added specialty "${specName}" to ${this.findLabelByKey(categoryKey, traitKey)}`;
                await this.addSpecialtyToSkill(traitKey, specName);
            } else if (levelSlider) {
                // Increase trait level
                const newLevel = parseInt(levelSlider.value);
                const context = this.buildPricingContext(categoryKey, traitKey);
                cost = xpGetTotalPrice(context, currentLevel, newLevel);
                note = `Increased ${this.findLabelByKey(categoryKey, traitKey)} from ${currentLevel} to ${newLevel}`;
                await this.applyTraitChange(categoryKey, traitKey, currentLevel, newLevel);
            }

            // Spend XP
            if (cost > 0) {
                const success = await window.xpManager?.spendXP(cost, note, {
                    category: categoryKey,
                    traitKey: traitKey,
                    oldLevel: currentLevel,
                    newLevel: levelSlider ? parseInt(levelSlider.value) : currentLevel
                });

                if (success) {
                    this.showFeedback(`Successfully spent ${cost} XP: ${note}`, 'success');
                    
                    // Emit XP spent event
                    this.emit('xpSpent', {
                        category: categoryKey,
                        traitKey: traitKey,
                        cost: cost,
                        note: note,
                        oldLevel: currentLevel,
                        newLevel: levelSlider ? parseInt(levelSlider.value) : currentLevel
                    });

                    // Close modal
                    bootstrap.Modal.getInstance(document.getElementById('xp-spend-modal')).hide();
                } else {
                    this.showFeedback('Failed to spend XP - insufficient funds', 'error');
                }
            }
        } catch (error) {
            console.error('Error during XP purchase:', error);
            this.showFeedback('Error during purchase. Please try again.', 'error');
        }
    }

    findLabelByKey(categoryKey, traitKey) {
        const options = this.getTraitOptions(categoryKey);
        const option = options.find(opt => opt.key === traitKey);
        return option ? option.label : traitKey;
    }

    async applyTraitChange(categoryKey, traitKey, oldLevel, newLevel) {
        // This would integrate with the appropriate manager to update the trait
        // For now, we'll emit an event that components can listen to
        this.emit('traitChangeRequested', {
            category: categoryKey,
            traitKey: traitKey,
            oldLevel: oldLevel,
            newLevel: newLevel
        });
    }

    async addSpecialtyToSkill(skillKey, specialtyName) {
        // This would integrate with the skill manager to add the specialty
        // For now, we'll emit an event that components can listen to
        this.emit('specialtyAddRequested', {
            skillKey: skillKey,
            specialtyName: specialtyName
        });
    }

    /**
     * Component integration methods
     */
    getData() {
        return {
            // XP spend manager doesn't maintain its own data
            // It works with other managers
        };
    }

    update(data) {
        // XP spend manager doesn't maintain its own data
        // It works with other managers
    }

    clear() {
        // XP spend manager doesn't maintain its own data
        // It works with other managers
    }

    setLockState(isLocked) {
        const $spendBtn = $('#spend-xp');
        const $modalBtns = $('#xp-spend-modal .btn');

        if (isLocked) {
            $spendBtn.prop('disabled', true);
            $modalBtns.prop('disabled', true);
          } else {
            $spendBtn.prop('disabled', false);
            $modalBtns.prop('disabled', false);
        }
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'XP Spend Manager');
      } else {
            console.log(`[XPSpendManager] ${type.toUpperCase()}: ${message}`);
        }
    }
}

// Create and export the XP spend manager instance
const xpSpendManager = new XPSpendManager();

// Add to window for global access
window.xpSpendManager = xpSpendManager;

// Remove ES6 export - use traditional script loading
// export default xpSpendManager; 