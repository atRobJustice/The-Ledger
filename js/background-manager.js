// Background and Background Flaw Manager
import { backgrounds } from './references/backgrounds.js';
import { TraitManagerUtils } from './manager-utils.js';

class BackgroundManager {
    constructor() {
        this.selectedBackgrounds = new Map(); // backgroundKey -> { category: string, level: number, instances: Array }
        this.selectedBackgroundFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = Object.keys(backgrounds);
        this.init();
    }

    init() {
        this.renderBackgroundManager();
        this.renderBackgroundFlawManager();
        this.bindEvents();
        this.initializeTooltips();
    }

    renderBackgroundManager() {
        const $container = $('.backgrounds-container');
        if ($container.length === 0) return;

        const html = `
            <div class="background-manager">
                <div class="background-controls mb-3">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <select class="form-select background-category-dropdown" id="backgroundCategorySelect">
                            <option value="">Select Category</option>
                            ${this.getCategoryOptions()}
                        </select>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <select class="form-select background-dropdown" id="backgroundSelect" disabled>
                            <option value="">Select Background</option>
                        </select>
                        <button class="btn btn-success btn-sm" id="addBackgroundBtn" disabled>
                            <i class="bi bi-plus-circle"></i>
                        </button>
                    </div>
                </div>
                <div class="selected-backgrounds">
                    ${this.selectedBackgrounds.size === 0 ? 
                        `<div class="fst-italic">No backgrounds selected</div>` : 
                        this.getSelectedTraitsHtml('background', this.selectedBackgrounds)
                    }
                </div>
            </div>
        `;

        $container.html(html);
    }

    renderBackgroundFlawManager() {
        const $container = $('.background-flaws-container');
        if ($container.length === 0) return;

        const html = `
            <div class="background-flaw-manager">
                <div class="background-flaw-controls mb-3">
                    <div class="d-flex align-items-center gap-2 mb-2">
                        <select class="form-select background-flaw-category-dropdown" id="backgroundFlawCategorySelect">
                            <option value="">Select Category</option>
                            ${this.getCategoryOptions()}
                        </select>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <select class="form-select background-flaw-dropdown" id="backgroundFlawSelect" disabled>
                            <option value="">Select Background Flaw</option>
                        </select>
                        <button class="btn btn-success btn-sm" id="addBackgroundFlawBtn" disabled>
                            <i class="bi bi-plus-circle"></i>
                        </button>
                    </div>
                </div>
                <div class="selected-background-flaws">
                    ${this.selectedBackgroundFlaws.size === 0 ? 
                        `<div class="fst-italic">No background flaws selected</div>` : 
                        this.getSelectedTraitsHtml('backgroundFlaw', this.selectedBackgroundFlaws)
                    }
                </div>
            </div>
        `;

        $container.html(html);
    }

    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = backgrounds[categoryKey];
                return `<option value="${categoryKey}">${category.name}</option>`;
            })
            .join('');
    }

    getTraitOptions(categoryKey, type, excludeSelected = true) {
        const category = backgrounds[categoryKey];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        if (!category || !category[traitsKey]) return '';

        const traits = category[traitsKey];
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;

        return TraitManagerUtils.generateTraitOptions(traits, selectedTraits, categoryKey);
    }

    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = backgrounds[traitData.category];
            const traitsKey = type === 'background' ? 'merits' : 'flaws';
            const trait = category[traitsKey][traitKey];
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

    renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo) {
        const { maxDots, traitTypeClass, tooltipText } = TraitManagerUtils.getDotsMeta(dotsInfo, 'background');
        
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
        $(document).on('change', '#backgroundCategorySelect, #backgroundFlawCategorySelect', (e) => {
            const $select = $(e.currentTarget);
            const categoryKey = $select.val();
            const isBackgroundFlaw = $select.attr('id') === 'backgroundFlawCategorySelect';
            const type = isBackgroundFlaw ? 'backgroundFlaw' : 'background';
            
            if (categoryKey) {
                this.updateTraitOptions(categoryKey, type);
            } else {
                this.clearTraitOptions(type);
            }
        });

        // Trait selection events (to enable Add button)
        $(document).on('change', '#backgroundSelect, #backgroundFlawSelect', (e) => {
            const $select = $(e.currentTarget);
            const traitKey = $select.val();
            const isBackgroundFlaw = $select.attr('id') === 'backgroundFlawSelect';
            const addBtnId = isBackgroundFlaw ? '#addBackgroundFlawBtn' : '#addBackgroundBtn';
            
            $(addBtnId).prop('disabled', !traitKey);
        });

        // Add trait events
        $(document).on('click', '#addBackgroundBtn, #addBackgroundFlawBtn', (e) => {
            e.preventDefault();
            const $btn = $(e.currentTarget);
            const isBackgroundFlaw = $btn.attr('id') === 'addBackgroundFlawBtn';
            const type = isBackgroundFlaw ? 'backgroundFlaw' : 'background';
            const selectId = isBackgroundFlaw ? '#backgroundFlawSelect' : '#backgroundSelect';
            
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
            
            if (traitKey && type) {
                this.removeTrait(type, traitKey, instanceIndex);
            }
        });

        // Dot click events for variable traits
        $(document).on('click', '.backgrounds-container .dot, .background-flaws-container .dot', (e) => {
            e.preventDefault();
            this.handleDotClick($(e.currentTarget));
        });
    }

    updateTraitOptions(categoryKey, type) {
        const selectId = type === 'background' ? '#backgroundSelect' : '#backgroundFlawSelect';
        const addBtnId = type === 'background' ? '#addBackgroundBtn' : '#addBackgroundFlawBtn';
        
        const $select = $(selectId);
        const $addBtn = $(addBtnId);
        
        const options = this.getTraitOptions(categoryKey, type);
        
        if (options) {
            $select.html(`<option value="">Select ${type === 'background' ? 'Background' : 'Background Flaw'}</option>${options}`);
            $select.prop('disabled', false);
        } else {
            $select.html(`<option value="">No ${type === 'background' ? 'backgrounds' : 'background flaws'} available</option>`);
            $select.prop('disabled', true);
        }
        
        $addBtn.prop('disabled', true);
    }

    clearTraitOptions(type) {
        const selectId = type === 'background' ? '#backgroundSelect' : '#backgroundFlawSelect';
        const addBtnId = type === 'background' ? '#addBackgroundBtn' : '#addBackgroundFlawBtn';
        
        const $select = $(selectId);
        const $addBtn = $(addBtnId);
        
        $select.html(`<option value="">Select ${type === 'background' ? 'Background' : 'Background Flaw'}</option>`);
        $select.prop('disabled', true);
        
        $addBtn.prop('disabled', true);
    }

    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        const category = backgrounds[categoryKey];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        const trait = category[traitsKey][traitKey];
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
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        
        if (!selectedTraits.has(traitKey)) {
            return;
        }

        const traitData = selectedTraits.get(traitKey);
        const category = backgrounds[traitData.category];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        const trait = category[traitsKey][traitKey];
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

        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const category = backgrounds[traitData.category];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        const trait = category[traitsKey][traitKey];
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
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const category = backgrounds[traitData.category];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        const trait = category[traitsKey][traitKey];
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
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
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
        // Update background display
        this.updateTraitTypeDisplay('background');
        
        // Update background flaw display
        this.updateTraitTypeDisplay('backgroundFlaw');
        
        // Initialize tooltips for the new elements
        this.initializeTooltips();
    }

    updateTraitTypeDisplay(type) {
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        const containerClass = type === 'background' ? '.selected-backgrounds' : '.selected-background-flaws';
        
        $(containerClass).html(
                this.getSelectedTraitsHtml(type, selectedTraits)
        );
    }

    initializeTooltips() {
        TraitManagerUtils.initTooltips(['.backgrounds-container','.background-flaws-container']);
    }

    // Public methods for external access
    getSelectedBackgrounds() {
        return TraitManagerUtils.mapToPlainObject(this.selectedBackgrounds);
    }

    getSelectedBackgroundFlaws() {
        return TraitManagerUtils.mapToPlainObject(this.selectedBackgroundFlaws);
    }

    getBackgroundLevel(backgroundKey) {
        const backgroundData = this.selectedBackgrounds.get(backgroundKey);
        return backgroundData ? backgroundData.level : 0;
    }

    getBackgroundFlawLevel(flawKey) {
        const flawData = this.selectedBackgroundFlaws.get(flawKey);
        return flawData ? flawData.level : 0;
    }

    // Calculate total background/flaw points
    getTotalBackgroundPoints() {
        return TraitManagerUtils.sumLevels(this.selectedBackgrounds);
    }

    getTotalBackgroundFlawPoints() {
        return TraitManagerUtils.sumLevels(this.selectedBackgroundFlaws);
    }

    // Load backgrounds and flaws from data (for character loading)
    loadBackgroundsAndFlaws(backgroundsData, flawsData) {
        this.selectedBackgrounds.clear();
        this.selectedBackgroundFlaws.clear();
        
        if (backgroundsData && typeof backgroundsData === 'object') {
            Object.entries(backgroundsData).forEach(([backgroundKey, data]) => {
                // Find the category for this background
                const category = this.findTraitCategory(backgroundKey, 'background');
                if (category) {
                    this.selectedBackgrounds.set(backgroundKey, {
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
                const category = this.findTraitCategory(flawKey, 'backgroundFlaw');
                if (category) {
                    this.selectedBackgroundFlaws.set(flawKey, {
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
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        for (const [categoryKey, category] of Object.entries(backgrounds)) {
            if (category[traitsKey] && category[traitsKey][traitKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    // Export backgrounds and flaws data (for character saving)
    exportBackgroundsAndFlaws() {
        return {
            backgrounds: this.getSelectedBackgrounds(),
            backgroundFlaws: this.getSelectedBackgroundFlaws()
        };
    }
}

// Initialize the background manager when the DOM is ready
$(document).ready(function() {
    // Only initialize if the containers exist
    if ($('.backgrounds-container').length > 0 || $('.background-flaws-container').length > 0) {
        window.backgroundManager = new BackgroundManager();
    }
});

export { BackgroundManager };