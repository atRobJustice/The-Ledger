// Merit and Flaw Manager
import { merits } from './references/merits.js';
import { TraitManagerUtils } from './manager-utils.js';

class MeritFlawManager {
    constructor() {
        this.selectedMerits = new Map(); // meritKey -> { category: string, level: number, instances: Array }
        this.selectedFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = Object.keys(merits);
        this.init();
    }

    init() {
        this.renderMeritManager();
        this.renderFlawManager();
        this.bindEvents();
        this.initializeTooltips();
    }

    renderMeritManager() {
        const meritContainer = $('.merits-container');
        if (meritContainer.length === 0) {
            console.error('Merits container not found');
            return;
        }

        meritContainer.empty();
        this.renderTraitSection(meritContainer, 'merit', 'Merits', this.selectedMerits);
    }

    renderFlawManager() {
        const flawContainer = $('.flaws-container');
        if (flawContainer.length === 0) {
            console.error('Flaws container not found');
            return;
        }

        flawContainer.empty();
        this.renderTraitSection(flawContainer, 'flaw', 'Flaws', this.selectedFlaws);
    }

    renderTraitSection(container, type, title, selectedTraits) {
        // Add trait selector
        this.renderTraitSelector(container, type, title);
        
        // Add selected traits list
        this.renderSelectedTraits(container, type, selectedTraits);
    }

    renderTraitSelector(container, type, title) {
        const selectorHtml = `
            <div class="${type}-selector mb-3">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <select class="form-select ${type}-category-dropdown" id="${type}CategorySelect">
                        <option value="">Select Category</option>
                        ${this.getCategoryOptions()}
                    </select>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <select class="form-select ${type}-dropdown" id="${type}Select" disabled>
                        <option value="">Select a ${title.slice(0, -1)} to Add</option>
                    </select>
                    <button class="btn btn-success btn-sm" id="add${TraitManagerUtils.capitalizeFirst(type)}Btn" disabled>
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
        `;
        container.append(selectorHtml);
    }

    renderSelectedTraits(container, type, selectedTraits) {
        const selectedHtml = `
            <div class="selected-${type}s">
                <div id="${type}sList" class="${type}s-list">
                    ${selectedTraits.size === 0 ? 
                        `<div class="fst-italic">No ${type}s selected</div>` : 
                        this.getSelectedTraitsHtml(type, selectedTraits)
                    }
                </div>
            </div>
        `;
        container.append(selectedHtml);
    }

    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = merits[categoryKey];
                const displayName = category.name || TraitManagerUtils.camelToTitle(categoryKey);
                return `<option value="${categoryKey}">${displayName}</option>`;
            })
            .join('');
    }

    getTraitOptions(categoryKey, type, excludeSelected = true) {
        const category = merits[categoryKey];
        if (!category || !category[type + 's']) return '';

        const traits = category[type + 's'];
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;

        return TraitManagerUtils.generateTraitOptions(traits, selectedTraits, categoryKey);
    }

    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = merits[traitData.category];
            const trait = category[type + 's'][traitKey];
            const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
            const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
            const instances = traitData.instances || [{ level: traitData.level }];
            
            instances.forEach((instance, instanceIndex) => {
                const instanceId = `${traitKey}_${instanceIndex}`;
                
                html.push(`
                    <div class="${type}-item mb-3" data-${type}="${traitKey}" data-instance="${instanceIndex}">
                        <div class="${type}-header d-flex justify-content-between align-items-center stat">
                            <div class="${type}-info">
                                <span class="stat-label">${displayName}${instances.length > 1 ? ` #${instanceIndex + 1}` : ''}</span>
                                <small class="d-block">${category.name}</small>
                            </div>
                            <div class="${type}-controls d-flex align-items-center gap-2">
                                ${this.renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo)}
                                <button class="btn btn-danger btn-sm remove-${type}-btn" data-${type}="${traitKey}" data-instance="${instanceIndex}">
                                    <i class="bi bi-dash-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="${type}-description mt-2">
                            <small>${trait.description}</small>
                        </div>
                    </div>
                `);
            });
        });
        
        return html.join('');
    }

    renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo) {
        const { maxDots, traitTypeClass, tooltipText } = TraitManagerUtils.getDotsMeta(dotsInfo, type);
        
        return `
            <div class="dots" 
                 data-value="${instance.level}" 
                 data-${type}="${traitKey}" 
                 data-instance="${instanceIndex}" 
                 data-trait-type="${traitTypeClass}"
                 data-bs-toggle="tooltip" 
                 data-bs-placement="top" 
                 title="${tooltipText}">
                ${TraitManagerUtils.createDots(instance.level, maxDots)}
            </div>
        `;
    }

    bindEvents() {
        // Category selection events
        $(document).on('change', '.merit-category-dropdown, .flaw-category-dropdown', (e) => {
            const $select = $(e.currentTarget);
            const categoryKey = $select.val();
            const type = $select.hasClass('merit-category-dropdown') ? 'merit' : 'flaw';
            
            this.updateTraitDropdown(categoryKey, type);
        });

        // Trait selection events
        $(document).on('change', '.merit-dropdown, .flaw-dropdown', (e) => {
            const $select = $(e.currentTarget);
            const type = $select.hasClass('merit-dropdown') ? 'merit' : 'flaw';
            const addBtn = $(`#add${TraitManagerUtils.capitalizeFirst(type)}Btn`);
            addBtn.prop('disabled', !$select.val());
        });

        // Add trait events
        $(document).on('click', '#addMeritBtn, #addFlawBtn', (e) => {
            e.preventDefault();
            const type = e.currentTarget.id.includes('Merit') ? 'merit' : 'flaw';
            const select = $(`#${type}Select`);
            const traitKey = select.val();
            const categoryKey = select.find('option:selected').data('category');
            
            if (traitKey && categoryKey) {
                this.addTrait(type, traitKey, categoryKey);
            }
        });

        // Remove trait events
        $(document).on('click', '.remove-merit-btn, .remove-flaw-btn', (e) => {
            e.preventDefault();
            const $btn = $(e.currentTarget);
            const type = $btn.hasClass('remove-merit-btn') ? 'merit' : 'flaw';
            const traitKey = $btn.data(type);
            const instanceIndex = $btn.data('instance');
            this.removeTrait(type, traitKey, instanceIndex);
        });

        // Dot click events for variable traits
        $(document).on('click', '.merits-container .dot, .flaws-container .dot', (e) => {
            e.preventDefault();
            this.handleDotClick($(e.currentTarget));
        });
    }

    updateTraitDropdown(categoryKey, type) {
        const $dropdown = $(`#${type}Select`);
        const $addBtn = $(`#add${TraitManagerUtils.capitalizeFirst(type)}Btn`);
        
        if (!categoryKey) {
            $dropdown.prop('disabled', true).html(`<option value="">Select a ${type} to Add</option>`);
            $addBtn.prop('disabled', true);
            return;
        }

        const options = this.getTraitOptions(categoryKey, type);
        if (options) {
            $dropdown.prop('disabled', false).html(`
                <option value="">Select a ${type} to Add</option>
                ${options}
            `);
        } else {
            $dropdown.prop('disabled', true).html(`<option value="">No ${type}s available in this category</option>`);
        }
        
        $addBtn.prop('disabled', true);
    }

    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const category = merits[categoryKey];
        const trait = category[type + 's'][traitKey];
        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
        
        if (dotsInfo.canRepeat) {
            // Handle repeatable traits (with +)
            if (selectedTraits.has(traitKey)) {
                // Add another instance
                const traitData = selectedTraits.get(traitKey);
                traitData.instances.push({ level: dotsInfo.min });
            } else {
                // First instance
                selectedTraits.set(traitKey, {
                    category: categoryKey,
                    level: dotsInfo.min,
                    instances: [{ level: dotsInfo.min }]
                });
            }
            
            const instanceCount = selectedTraits.get(traitKey).instances.length;
            TraitManagerUtils.showFeedback(`Added ${displayName} (Instance #${instanceCount})`, 'success');
        } else {
            // Handle non-repeatable traits
            if (selectedTraits.has(traitKey)) {
                TraitManagerUtils.showFeedback(`${displayName} is already selected`, 'warning');
                return;
            }
            
            let initialLevel;
            if (dotsInfo.hasOr) {
                // For "or" traits, start with the minimum value
                initialLevel = dotsInfo.orValues[0];
            } else {
                initialLevel = dotsInfo.min;
            }
            
            selectedTraits.set(traitKey, {
                category: categoryKey,
                level: initialLevel,
                instances: [{ level: initialLevel }]
            });
            
            TraitManagerUtils.showFeedback(`Added ${displayName}`, 'success');
        }
        
        this.updateDisplay();
    }

    removeTrait(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        
        if (!selectedTraits.has(traitKey)) {
            return;
        }

        const traitData = selectedTraits.get(traitKey);
        const category = merits[traitData.category];
        const trait = category[type + 's'][traitKey];
        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);

        if (dotsInfo.canRepeat && instanceIndex !== null && traitData.instances.length > 1) {
            // Remove specific instance of repeatable trait
            traitData.instances.splice(instanceIndex, 1);
            TraitManagerUtils.showFeedback(`Removed ${displayName} instance`, 'info');
        } else {
            // Remove entire trait
            selectedTraits.delete(traitKey);
            TraitManagerUtils.showFeedback(`Removed ${displayName}`, 'info');
        }
        
        this.updateDisplay();
    }

    handleDotClick($dot) {
        const $dotsContainer = $dot.parent();
        const currentValue = parseInt($dotsContainer.data('value') || '0');
        const clickedValue = parseInt($dot.data('value'));
        const traitType = $dotsContainer.data('trait-type');
        
        // Determine trait type, key, and instance
        const traitKey = $dotsContainer.data('merit') || $dotsContainer.data('flaw');
        const type = $dotsContainer.data('merit') ? 'merit' : 'flaw';
        const instanceIndex = parseInt($dotsContainer.data('instance') || '0');
        
        if (!traitKey) return;

        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const category = merits[traitData.category];
        const trait = category[type + 's'][traitKey];
        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);

        let newValue;
        
        if (traitType === 'fixed') {
            // Fixed traits can't be changed - they're always at their fixed value
            return;
        } else if (traitType === 'or') {
            // For "or" traits, only allow the specific values from orValues
            if (dotsInfo.orValues.includes(clickedValue)) {
                newValue = clickedValue;
            } else {
                // If clicked value is not valid, find the closest valid value
                const validValues = dotsInfo.orValues.sort((a, b) => a - b);
                if (clickedValue < validValues[0]) {
                    newValue = currentValue > 0 ? 0 : validValues[0]; // Toggle off or set to first valid
                } else {
                    // Find the next valid value
                    const nextValid = validValues.find(v => v >= clickedValue);
                    newValue = nextValid || validValues[validValues.length - 1];
                }
            }
        } else {
            // For range and repeat traits, use standard dot logic
            // If clicking the last filled dot, decrease by 1 or turn off
            if (clickedValue === currentValue) {
                newValue = Math.max(clickedValue - 1, 0);
                // But don't go below minimum unless turning off completely
                if (newValue > 0 && newValue < dotsInfo.min) {
                    newValue = 0;
                }
            }
            // If clicking an empty dot, increase to that value
            else if (clickedValue > currentValue) {
                newValue = Math.min(clickedValue, dotsInfo.max);
                // But don't allow values below minimum (jump to minimum)
                if (newValue > 0 && newValue < dotsInfo.min) {
                    newValue = dotsInfo.min;
                }
            }
            // If clicking a filled dot (decreasing), set to that value
            else {
                newValue = Math.max(clickedValue, 0);
                // But don't allow values below minimum unless turning off
                if (newValue > 0 && newValue < dotsInfo.min) {
                    newValue = 0;
                }
            }
        }

        // Update the trait instance level
        this.updateTraitInstanceLevel(type, traitKey, instanceIndex, newValue);
    }

    updateTraitInstanceLevel(type, traitKey, instanceIndex, newLevel) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const category = merits[traitData.category];
        const trait = category[type + 's'][traitKey];
        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);

        // Update the specific instance
        if (traitData.instances && traitData.instances[instanceIndex]) {
            traitData.instances[instanceIndex].level = newLevel;
            
            // Update main level for backward compatibility
            traitData.level = newLevel;
            
            this.updateTraitDisplay(type, traitKey, instanceIndex);
            
            const instanceSuffix = traitData.instances.length > 1 ? ` #${instanceIndex + 1}` : '';
            TraitManagerUtils.showFeedback(`${displayName}${instanceSuffix} level set to ${newLevel}`, 'info');
        }
    }

    updateTraitDisplay(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        if (instanceIndex !== null) {
            // Update specific instance
            const instance = traitData.instances[instanceIndex];
            if (!instance) return;

            const $dots = $(`.dots[data-${type}="${traitKey}"][data-instance="${instanceIndex}"]`);
            TraitManagerUtils.refreshDots($dots, instance.level);
            $dots.attr('data-value', instance.level);
        } else {
            // Update all instances
            traitData.instances.forEach((instance, idx) => {
                const $dots = $(`.dots[data-${type}="${traitKey}"][data-instance="${idx}"]`);
                TraitManagerUtils.refreshDots($dots, instance.level);
                $dots.attr('data-value', instance.level);
            });
        }
    }

    updateDisplay() {
        // Update merit display
        this.updateTraitTypeDisplay('merit');
        
        // Update flaw display
        this.updateTraitTypeDisplay('flaw');
        
        // Initialize tooltips for the new elements
        this.initializeTooltips();
    }

    initializeTooltips() {
        TraitManagerUtils.initTooltips(['.merits-container','.flaws-container']);
    }

    updateTraitTypeDisplay(type) {
        // Update the category dropdown to refresh available traits
        const $categorySelect = $(`#${type}CategorySelect`);
        const currentCategory = $categorySelect.val();
        
        if (currentCategory) {
            this.updateTraitDropdown(currentCategory, type);
        }
        
        // Reset trait selection
        $(`#${type}Select`).val('');
        $(`#add${TraitManagerUtils.capitalizeFirst(type)}Btn`).prop('disabled', true);
        
        // Update the selected traits list
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        $(`#${type}sList`).html(
            selectedTraits.size === 0 ? 
                `<div class="fst-italic">No ${type}s selected</div>` : 
                this.getSelectedTraitsHtml(type, selectedTraits)
        );
    }

    // Public methods for external access
    getSelectedMerits() {
        return TraitManagerUtils.mapToPlainObject(this.selectedMerits);
    }

    getSelectedFlaws() {
        const result = {};
        this.selectedFlaws.forEach((data, key) => {
            result[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances || [{ level: data.level }]
            };
        });
        return result;
    }

    getMeritLevel(meritKey) {
        const meritData = this.selectedMerits.get(meritKey);
        return meritData ? meritData.level : 0;
    }

    getFlawLevel(flawKey) {
        const flawData = this.selectedFlaws.get(flawKey);
        return flawData ? flawData.level : 0;
    }

    // Calculate total merit/flaw points
    getTotalMeritPoints() {
        return TraitManagerUtils.sumLevels(this.selectedMerits);
    }

    getTotalFlawPoints() {
        return TraitManagerUtils.sumLevels(this.selectedFlaws);
    }

    // Load merits and flaws from data (for character loading)
    loadMeritsAndFlaws(meritsData, flawsData) {
        this.selectedMerits.clear();
        this.selectedFlaws.clear();
        
        if (meritsData && typeof meritsData === 'object') {
            Object.entries(meritsData).forEach(([meritKey, data]) => {
                // Find the category for this merit
                const category = this.findTraitCategory(meritKey, 'merit');
                if (category) {
                    this.selectedMerits.set(meritKey, {
                        category: category,
                        level: data.level || 1,
                        instances: data.instances || [{ level: data.level || 1 }]
                    });
                }
            });
        }
        
        if (flawsData && typeof flawsData === 'object') {
            Object.entries(flawsData).forEach(([flawKey, data]) => {
                // Find the category for this flaw
                const category = this.findTraitCategory(flawKey, 'flaw');
                if (category) {
                    this.selectedFlaws.set(flawKey, {
                        category: category,
                        level: data.level || 1,
                        instances: data.instances || [{ level: data.level || 1 }]
                    });
                }
            });
        }
        
        this.updateDisplay();
    }

    findTraitCategory(traitKey, type) {
        for (const categoryKey of this.availableCategories) {
            const category = merits[categoryKey];
            if (category[type + 's'] && category[type + 's'][traitKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    // Export merits and flaws data (for character saving)
    exportMeritsAndFlaws() {
        return {
            merits: this.getSelectedMerits(),
            flaws: this.getSelectedFlaws()
        };
    }
}

// Initialize the merit-flaw manager when the DOM is ready
$(document).ready(function() {
    // Only initialize if the containers exist
    if ($('.merits-container').length > 0 || $('.flaws-container').length > 0) {
        window.meritFlawManager = new MeritFlawManager();
    }
});

export { MeritFlawManager };