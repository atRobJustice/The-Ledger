// Coterie Merit and Flaw Manager
import { coterieBackgrounds } from './references/backgrounds-coterie.js';
import { TraitManagerUtils } from './manager-utils.js';

class CoterieManager {
    constructor() {
        this.selectedCoterieMerits = new Map(); // meritKey -> { category: string, level: number, instances: Array }
        this.selectedCoterieFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = this.getAvailableCategories();
        this.init();
    }

    init() {
        this.renderCoterieMeritManager();
        this.renderCoterieFlawManager();
        this.bindEvents();
        this.initializeTooltips();
    }

    getAvailableCategories() {
        const categories = [];
               
        // Add domain subcategories
        if (coterieBackgrounds.domain && coterieBackgrounds.domain.traits) {
            Object.entries(coterieBackgrounds.domain.traits).forEach(([traitKey, traitData]) => {
                categories.push({
                    key: `domain.${traitKey}`,
                    name: `Domain - ${TraitManagerUtils.camelToTitle(traitKey)}`,
                    description: traitData.description
                });
            });
        }
        
        // Add domain flaws category
        if (coterieBackgrounds.domain && coterieBackgrounds.domain.flaws) {
            categories.push({
                key: 'domain.flaws',
                name: 'Domain Flaws',
                description: 'Flaws that affect the coterie\'s domain'
            });
        }
        
        // Add clan merits category (merits only)
        if (coterieBackgrounds.clanMerits) {
            categories.push({
                key: 'clanMerits',
                name: 'Clan Merits',
                description: coterieBackgrounds.clanMerits.description
            });
        }
        
        return categories;
    }

    renderCoterieMeritManager() {
        const $container = $('.coterie-merits-container');
        if ($container.length === 0) return;

        const html = `
            <div class="coterie-merit-manager">
                <div class="coterie-merit-controls mb-3">
                    <div class="row g-2">
                        <div class="col-md-4">
                            <select class="form-select coterie-merit-category-dropdown" id="coterieMeritCategorySelect">
                                <option value="">Select Category</option>
                                ${this.getCategoryOptions()}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <select class="form-select coterie-merit-dropdown" id="coterieMeritSelect" disabled>
                                <option value="">Select Coterie Merit</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-success btn-sm" id="addCoterieMeritBtn" disabled>
                                <i class="bi bi-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="selected-coterie-merits">
                    ${this.getSelectedTraitsHtml('coterieMerit', this.selectedCoterieMerits)}
                </div>
            </div>
        `;

        $container.html(html);
    }

    renderCoterieFlawManager() {
        const $container = $('.coterie-flaws-container');
        if ($container.length === 0) return;

        const html = `
            <div class="coterie-flaw-manager">
                <div class="coterie-flaw-controls mb-3">
                    <div class="row g-2">
                        <div class="col-md-4">
                            <select class="form-select coterie-flaw-category-dropdown" id="coterieFlawCategorySelect">
                                <option value="">Select Category</option>
                                ${this.getCategoryOptions('flaw')}
                            </select>
                        </div>
                        <div class="col-md-6">
                            <select class="form-select coterie-flaw-dropdown" id="coterieFlawSelect" disabled>
                                <option value="">Select Coterie Flaw</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-success btn-sm" id="addCoterieFlawBtn" disabled>
                                <i class="bi bi-plus-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="selected-coterie-flaws">
                    ${this.getSelectedTraitsHtml('coterieFlaw', this.selectedCoterieFlaws)}
                </div>
            </div>
        `;

        $container.html(html);
    }

    getCategoryOptions(type = 'merit') {
        return this.availableCategories
            .filter(category => {
                // For flaws, only show categories that have flaws
                if (type === 'flaw') {
                    return this.categoryHasFlaws(category.key);
                }
                // For merits, show all categories (they all have merits)
                return true;
            })
            .map(category => {
                return `<option value="${category.key}">${category.name}</option>`;
            })
            .join('');
    }

    categoryHasFlaws(categoryKey) {
        if (categoryKey === 'domain.flaws') {
            return coterieBackgrounds.domain.flaws && Object.keys(coterieBackgrounds.domain.flaws).length > 0;
        }
        // Domain trait subcategories and clan merits don't have flaws
        return false;
    }

    getTraitOptions(categoryKey, type, excludeSelected = true) {
        let traits = {};

        if (categoryKey.startsWith('domain.') && categoryKey !== 'domain.flaws') {
            // Domain trait subcategories (chasse, lien, portillon)
            const traitName = categoryKey.split('.')[1];
            const traitData = coterieBackgrounds.domain.traits[traitName];
            if (traitData && type === 'coterieMerit') {
                // Combine regular merits and locationMerits
                traits = {
                    ...(traitData.merits || {}),
                    ...(traitData.locationMerits || {})
                };
            }
        } else if (categoryKey === 'domain.flaws' && type === 'coterieFlaw') {
            traits = coterieBackgrounds.domain.flaws || {};
        } else if (categoryKey === 'clanMerits' && type === 'coterieMerit') {
            traits = coterieBackgrounds.clanMerits.merits || {};
        }

        if (!traits || Object.keys(traits).length === 0) return '';

        const selectedTraits = type === 'coterieMerit' ? this.selectedCoterieMerits : this.selectedCoterieFlaws;

        return Object.keys(traits)
            .filter(traitKey => {
                if (!excludeSelected) return true;
                
                const trait = traits[traitKey];
                const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
                
                // If trait can repeat, always show it
                if (dotsInfo.canRepeat) return true;
                
                // Otherwise, only show if not already selected
                return !selectedTraits.has(traitKey);
            })
            .map(traitKey => {
                const trait = traits[traitKey];
                const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
                const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
                
                let suffix = '';
                if (dotsInfo.canRepeat && selectedTraits.has(traitKey)) {
                    const instances = selectedTraits.get(traitKey).instances || [];
                    suffix = ` (${instances.length} taken)`;
                }
                
                return `<option value="${traitKey}" data-category="${categoryKey}">${displayName}${suffix}</option>`;
            })
            .join('');
    }

    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        
        selectedTraits.forEach((traitData, traitKey) => {
            const trait = this.getTraitData(traitData.category, traitKey, type);
            if (!trait) return;
            
            const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
            const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
            const instances = traitData.instances || [{ level: traitData.level }];
            const categoryName = this.availableCategories.find(cat => cat.key === traitData.category)?.name || traitData.category;
            
            instances.forEach((instance, instanceIndex) => {
                html.push(`
                    <div class="${type}-item mb-3" data-${type}="${traitKey}" data-instance="${instanceIndex}">
                        <div class="${type}-header d-flex justify-content-between align-items-center stat">
                            <div class="${type}-info">
                                <span class="stat-label">${displayName}${instances.length > 1 ? ` #${instanceIndex + 1}` : ''}</span>
                                <small class="d-block">${categoryName}</small>
                            </div>
                            <div class="${type}-controls d-flex align-items-center gap-2">
                                ${this.renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo)}
                                <button class="btn btn-danger btn-sm remove-trait-btn" data-trait-type="${type}" data-trait-key="${traitKey}" data-instance="${instanceIndex}">
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

    getTraitData(categoryKey, traitKey, type) {
        if (categoryKey.startsWith('domain.') && categoryKey !== 'domain.flaws') {
            // Domain trait subcategories (chasse, lien, portillon)
            const traitName = categoryKey.split('.')[1];
            const traitData = coterieBackgrounds.domain.traits[traitName];
            if (traitData && type === 'coterieMerit') {
                // Check both regular merits and locationMerits
                return traitData.merits?.[traitKey] || traitData.locationMerits?.[traitKey];
            }
        } else if (categoryKey === 'domain.flaws' && type === 'coterieFlaw') {
            return coterieBackgrounds.domain.flaws?.[traitKey];
        } else if (categoryKey === 'clanMerits' && type === 'coterieMerit') {
            return coterieBackgrounds.clanMerits.merits?.[traitKey];
        }
        
        return null;
    }

    renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo) {
        // Handle special cases for coterie traits
        let maxDots;
        
        if (typeof trait.dots === 'string') {
            if (dotsInfo.hasOr) {
                maxDots = Math.max(...dotsInfo.orValues);
            } else if (dotsInfo.canRepeat) {
                maxDots = dotsInfo.max;
            } else if (dotsInfo.min !== dotsInfo.max) {
                maxDots = dotsInfo.max;
            } else {
                maxDots = dotsInfo.max;
            }
        } else if (typeof trait.dots === 'number') {
            // Fixed number of dots
            maxDots = trait.dots;
        } else {
            // Default to 1 if dots is "Varies" or other string
            maxDots = 1;
        }
        
        // Create tooltip text based on trait type
        let tooltipText = '';
        let traitTypeClass = '';
        
        if (typeof trait.dots === 'string' && trait.dots.toLowerCase() === 'varies') {
            traitTypeClass = 'varies';
            tooltipText = `Variable cost trait. Discuss with Storyteller.`;
        } else if (dotsInfo.hasOr) {
            traitTypeClass = 'or';
            tooltipText = `Can be taken at ${dotsInfo.orValues.join(' or ')} dots. Click valid dot values: ${dotsInfo.orValues.map(v => '•'.repeat(v)).join(' or ')}.`;
        } else if (dotsInfo.canRepeat) {
            traitTypeClass = 'repeat';
            tooltipText = `Repeatable coterie trait (${dotsInfo.min} dot${dotsInfo.min !== 1 ? 's' : ''} each). Can be taken multiple times.`;
        } else if (dotsInfo.min !== dotsInfo.max) {
            traitTypeClass = 'range';
            tooltipText = `Can be taken at ${dotsInfo.min}-${dotsInfo.max} dots. Click dots to set level.`;
        } else {
            traitTypeClass = 'fixed';
            tooltipText = `Fixed cost: ${maxDots} dot${maxDots !== 1 ? 's' : ''}. Cannot be changed.`;
        }
        
        return `
            <div class="dots" 
                 data-value="${instance.level}" 
                 data-trait-key="${traitKey}"
                 data-trait-type-class="${traitTypeClass}"
                 data-trait-category="${type}"
                 data-instance="${instanceIndex}" 
                 data-bs-toggle="tooltip" 
                 data-bs-placement="top" 
                 title="${tooltipText}">
                ${TraitManagerUtils.createDots(instance.level, maxDots)}
            </div>
        `;
    }

    bindEvents() {
        // Category selection events
        $(document).on('change', '#coterieMeritCategorySelect, #coterieFlawCategorySelect', (e) => {
            const $select = $(e.currentTarget);
            const categoryKey = $select.val();
            const isCoterieFlaw = $select.attr('id') === 'coterieFlawCategorySelect';
            const type = isCoterieFlaw ? 'coterieFlaw' : 'coterieMerit';
            
            if (categoryKey) {
                this.updateTraitOptions(categoryKey, type);
            } else {
                this.clearTraitOptions(type);
            }
        });

        // Trait selection events (to enable Add button)
        $(document).on('change', '#coterieMeritSelect, #coterieFlawSelect', (e) => {
            const $select = $(e.currentTarget);
            const traitKey = $select.val();
            const isCoterieFlaw = $select.attr('id') === 'coterieFlawSelect';
            const addBtnId = isCoterieFlaw ? '#addCoterieFlawBtn' : '#addCoterieMeritBtn';
            
            $(addBtnId).prop('disabled', !traitKey);
        });

        // Add trait events
        $(document).on('click', '#addCoterieMeritBtn, #addCoterieFlawBtn', (e) => {
            e.preventDefault();
            const $btn = $(e.currentTarget);
            const isCoterieFlaw = $btn.attr('id') === 'addCoterieFlawBtn';
            const type = isCoterieFlaw ? 'coterieFlaw' : 'coterieMerit';
            const selectId = isCoterieFlaw ? '#coterieFlawSelect' : '#coterieMeritSelect';
            
            const $select = $(selectId);
            const traitKey = $select.val();
            const categoryKey = $select.find('option:selected').data('category');
            
            if (traitKey && categoryKey) {
                this.addTrait(type, traitKey, categoryKey);
            }
        });

        // Remove trait events
        $(document).on('click', '.remove-trait-btn', (e) => {
            e.preventDefault();
            const $btn = $(e.currentTarget);
            const type = $btn.data('trait-type');
            const traitKey = $btn.data('trait-key');
            const instanceIndex = $btn.data('instance');
            
            if (traitKey && type && (type === 'coterieMerit' || type === 'coterieFlaw')) {
                this.removeTrait(type, traitKey, instanceIndex);
            }
        });

        // Dot click events for variable traits
        $(document).on('click', '.coterie-merits-container .dot, .coterie-flaws-container .dot', (e) => {
            e.preventDefault();
            this.handleDotClick($(e.currentTarget));
        });
    }

    updateTraitOptions(categoryKey, type) {
        const selectId = type === 'coterieMerit' ? '#coterieMeritSelect' : '#coterieFlawSelect';
        const addBtnId = type === 'coterieMerit' ? '#addCoterieMeritBtn' : '#addCoterieFlawBtn';
        
        const $select = $(selectId);
        const $addBtn = $(addBtnId);
        
        const options = this.getTraitOptions(categoryKey, type);
        
        if (options) {
            $select.html(`<option value="">Select ${type === 'coterieMerit' ? 'Coterie Merit' : 'Coterie Flaw'}</option>${options}`);
            $select.prop('disabled', false);
        } else {
            $select.html(`<option value="">No ${type === 'coterieMerit' ? 'coterie merits' : 'coterie flaws'} available</option>`);
            $select.prop('disabled', true);
        }
        
        $addBtn.prop('disabled', true);
    }

    clearTraitOptions(type) {
        const selectId = type === 'coterieMerit' ? '#coterieMeritSelect' : '#coterieFlawSelect';
        const addBtnId = type === 'coterieMerit' ? '#addCoterieMeritBtn' : '#addCoterieFlawBtn';
        
        $(selectId).html(`<option value="">Select ${type === 'coterieMerit' ? 'Coterie Merit' : 'Coterie Flaw'}</option>`).prop('disabled', true);
        $(addBtnId).prop('disabled', true);
    }

    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = type === 'coterieMerit' ? this.selectedCoterieMerits : this.selectedCoterieFlaws;
        const trait = this.getTraitData(categoryKey, traitKey, type);
        if (!trait) return;
        
        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);

        // Determine initial level
        let initialLevel;
        if (typeof trait.dots === 'number') {
            initialLevel = trait.dots;
        } else if (dotsInfo.hasOr) {
            initialLevel = dotsInfo.orValues[0];
        } else {
            initialLevel = dotsInfo.min;
        }

        if (selectedTraits.has(traitKey) && dotsInfo.canRepeat) {
            // Add new instance to existing repeatable trait
            const traitData = selectedTraits.get(traitKey);
            traitData.instances.push({ level: initialLevel });
            TraitManagerUtils.showFeedback(`Added another ${displayName}`, 'success');
        } else if (!selectedTraits.has(traitKey)) {
            // Add new trait
            selectedTraits.set(traitKey, {
                category: categoryKey,
                level: initialLevel,
                instances: [{ level: initialLevel }]
            });
            TraitManagerUtils.showFeedback(`Added ${displayName}`, 'success');
        } else {
            TraitManagerUtils.showFeedback(`${displayName} is already selected`, 'warning');
            return;
        }
        
        this.updateDisplay();
    }

    removeTrait(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'coterieMerit' ? this.selectedCoterieMerits : this.selectedCoterieFlaws;
        
        if (!selectedTraits.has(traitKey)) {
            return;
        }

        const traitData = selectedTraits.get(traitKey);
        const trait = this.getTraitData(traitData.category, traitKey, type);
        if (!trait) return;
        
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
        const traitType = $dotsContainer.data('trait-type-class');
        
        // Determine trait type, key, and instance
        const traitKey = $dotsContainer.data('trait-key');
        const type = $dotsContainer.data('trait-category');
        const instanceIndex = parseInt($dotsContainer.data('instance') || '0');
        
        if (!traitKey) return;

        const selectedTraits = type === 'coterieMerit' ? this.selectedCoterieMerits : this.selectedCoterieFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const trait = this.getTraitData(traitData.category, traitKey, type);
        if (!trait) return;
        
        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);

        let newValue;
        
        if (traitType === 'fixed' || traitType === 'varies') {
            // Fixed traits or "varies" traits can't be changed via dots
            return;
        } else if (traitType === 'or') {
            // For "or" traits, only allow specific values
            if (dotsInfo.orValues.includes(clickedValue)) {
                newValue = clickedValue;
            } else {
                return; // Invalid value for "or" trait
            }
        } else {
            // For range and repeatable traits, standard dot logic
            if (clickedValue === currentValue) {
                // Clicking current level reduces by 1 (but not below minimum)
                newValue = Math.max(currentValue - 1, dotsInfo.min);
            } else if (clickedValue < currentValue) {
                // Clicking lower dot sets to that level
                newValue = Math.max(clickedValue, dotsInfo.min);
            } else {
                // Clicking higher dot sets to that level
                newValue = Math.min(clickedValue, dotsInfo.max);
            }
        }

        if (newValue !== currentValue) {
            // Update the instance level
            const instance = traitData.instances[instanceIndex];
            if (instance) {
                instance.level = newValue;
                traitData.level = newValue; // Keep level in sync for single instances
            }
            
            this.updateTraitDisplay(type, traitKey, instanceIndex);
            
            const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
            const instanceSuffix = traitData.instances.length > 1 ? ` #${instanceIndex + 1}` : '';
            TraitManagerUtils.showFeedback(`${displayName}${instanceSuffix} level set to ${newValue}`, 'info');
        }
    }

    updateTraitDisplay(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'coterieMerit' ? this.selectedCoterieMerits : this.selectedCoterieFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        if (instanceIndex !== null) {
            // Update specific instance
            const instance = traitData.instances[instanceIndex];
            if (!instance) return;

            const $dots = $(`.dots[data-trait-key="${traitKey}"][data-trait-category="${type}"][data-instance="${instanceIndex}"]`);
            TraitManagerUtils.refreshDots($dots, instance.level);
            $dots.attr('data-value', instance.level);
        } else {
            // Update all instances
            traitData.instances.forEach((instance, idx) => {
                const $dots = $(`.dots[data-trait-key="${traitKey}"][data-trait-category="${type}"][data-instance="${idx}"]`);
                TraitManagerUtils.refreshDots($dots, instance.level);
                $dots.attr('data-value', instance.level);
            });
        }
    }

    updateDisplay() {
        this.renderCoterieMeritManager();
        this.renderCoterieFlawManager();
        this.initializeTooltips();
        
        // Update trait options to reflect current selections
        const $meritCategorySelect = $('#coterieMeritCategorySelect');
        const $flawCategorySelect = $('#coterieFlawCategorySelect');
        
        if ($meritCategorySelect.val()) {
            this.updateTraitOptions($meritCategorySelect.val(), 'coterieMerit');
        }
        
        if ($flawCategorySelect.val()) {
            this.updateTraitOptions($flawCategorySelect.val(), 'coterieFlaw');
        }
    }

    initializeTooltips() {
        TraitManagerUtils.initTooltips(['.coterie-merits-container','.coterie-flaws-container']);
    }

    // Public API methods
    getSelectedCoterieMerits() {
        return TraitManagerUtils.mapToPlainObject(this.selectedCoterieMerits);
    }

    getSelectedCoterieFlaws() {
        return TraitManagerUtils.mapToPlainObject(this.selectedCoterieFlaws);
    }

    getCoterieMeritLevel(meritKey) {
        const merit = this.selectedCoterieMerits.get(meritKey);
        return merit ? merit.level : 0;
    }

    getCoterieFlawLevel(flawKey) {
        const flaw = this.selectedCoterieFlaws.get(flawKey);
        return flaw ? flaw.level : 0;
    }

    getTotalCoterieMeritPoints() {
        return TraitManagerUtils.sumLevels(this.selectedCoterieMerits);
    }

    getTotalCoterieFlawPoints() {
        return TraitManagerUtils.sumLevels(this.selectedCoterieFlaws);
    }

    loadCoterieMeritsAndFlaws(meritsData, flawsData) {
        // Clear existing data
        this.selectedCoterieMerits.clear();
        this.selectedCoterieFlaws.clear();

        // Load merits
        if (meritsData) {
            Object.entries(meritsData).forEach(([key, data]) => {
                this.selectedCoterieMerits.set(key, {
                    category: data.category,
                    level: data.level,
                    instances: data.instances || [{ level: data.level }]
                });
            });
        }

        // Load flaws
        if (flawsData) {
            Object.entries(flawsData).forEach(([key, data]) => {
                this.selectedCoterieFlaws.set(key, {
                    category: data.category,
                    level: data.level,
                    instances: data.instances || [{ level: data.level }]
                });
            });
        }

        this.updateDisplay();
    }

    exportCoterieMeritsAndFlaws() {
        return {
            coterieMerits: this.getSelectedCoterieMerits(),
            coterieFlaws: this.getSelectedCoterieFlaws()
        };
    }
}

// Initialize the coterie manager when the DOM is ready
$(document).ready(() => {
    window.coterieManager = new CoterieManager();
});

export { CoterieManager };