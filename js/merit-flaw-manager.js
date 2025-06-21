// Merit and Flaw Manager with Component Architecture Integration
const meritFlawMerits = window.merits;
const meritTraitUtils = window.TraitManagerUtils;

class MeritFlawManager {
    constructor() {
        this.selectedMerits = new Map(); // meritKey -> { category: string, level: number, instances: Array }
        this.selectedFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = Object.keys(meritFlawMerits);
        this.eventListeners = new Map();
        this.isComponentMode = false;
        this.parentComponent = null;
    }

    /**
     * Set component mode and parent component
     */
    setComponentMode(parentComponent) {
        this.isComponentMode = true;
        this.parentComponent = parentComponent;
        console.log('MeritFlawManager: Component mode enabled');
    }

    /**
     * Initialize the manager
     */
    init() {
        this.renderMeritManager();
        this.renderFlawManager();
        this.bindEvents();
        this.initializeTooltips();
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
                    console.error(`Error in merit-flaw manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`meritFlaw${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'MeritFlawManager' }
        }));
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
                        <option value="">Select a ${title.slice(0, -1)}</option>
                    </select>
                    <button class="btn btn-success btn-sm" id="add${meritTraitUtils.capitalizeFirst(type)}Btn" disabled>
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
                const category = meritFlawMerits[categoryKey];
                const displayName = category.name || meritTraitUtils.camelToTitle(categoryKey);
                return `<option value="${categoryKey}">${displayName}</option>`;
            })
            .join('');
    }

    getTraitOptions(categoryKey, type, excludeSelected = true) {
        const category = meritFlawMerits[categoryKey];
        if (!category || !category[type + 's']) return '';

        const traits = category[type + 's'];
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;

        return meritTraitUtils.generateTraitOptions(traits, selectedTraits, categoryKey);
    }

    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = meritFlawMerits[traitData.category];
            const trait = category[type + 's'][traitKey];
            const displayName = trait.name || meritTraitUtils.camelToTitle(traitKey);
            const dotsInfo = meritTraitUtils.parseDotsNotation(trait.dots);
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
        const { maxDots, traitTypeClass, tooltipText } = meritTraitUtils.getDotsMeta(dotsInfo, type);
        
        return `
            <div class="dots" 
                 data-value="${instance.level}" 
                 data-${type}="${traitKey}" 
                 data-instance="${instanceIndex}" 
                 data-trait-type="${traitTypeClass}"
                 data-bs-toggle="tooltip" 
                 data-bs-placement="top" 
                 title="${tooltipText}">
                ${meritTraitUtils.createDots(instance.level, maxDots)}
            </div>
        `;
    }

    bindEvents() {
        // Category selection events
        $(document).on('change', '.merit-category-dropdown, .flaw-category-dropdown', (e) => {
            const $select = $(e.target);
            const categoryKey = $select.val();
            const type = $select.hasClass('merit-category-dropdown') ? 'merit' : 'flaw';
            
            this.updateTraitDropdown(categoryKey, type);
        });

        // Trait selection events
        $(document).on('change', '.merit-dropdown, .flaw-dropdown', (e) => {
            const $select = $(e.target);
            const type = $select.hasClass('merit-dropdown') ? 'merit' : 'flaw';
            const addBtn = $(`#add${meritTraitUtils.capitalizeFirst(type)}Btn`);
            addBtn.prop('disabled', !$select.val());
        });

        // Add trait events
        $(document).on('click', '#addMeritBtn, #addFlawBtn', (e) => {
            e.preventDefault();
            const type = e.target.id.includes('Merit') ? 'merit' : 'flaw';
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
            const $btn = $(e.target).closest('.remove-merit-btn, .remove-flaw-btn');
            const type = $btn.hasClass('remove-merit-btn') ? 'merit' : 'flaw';
            const traitKey = $btn.data(type);
            const instanceIndex = $btn.data('instance');
            this.removeTrait(type, traitKey, instanceIndex);
        });

        // Dot click events
        $(document).on('click', '.dots .dot', (e) => {
            e.preventDefault();
            const $dot = $(e.target);
            this.handleDotClick($dot);
        });
    }

    updateTraitDropdown(categoryKey, type) {
        const $traitSelect = $(`#${type}Select`);
        const $addBtn = $(`#add${meritTraitUtils.capitalizeFirst(type)}Btn`);
        
        if (!categoryKey) {
            $traitSelect.html('<option value="">Select a ' + (type === 'merit' ? 'Merit' : 'Flaw') + '</option>').prop('disabled', true);
            $addBtn.prop('disabled', true);
            return;
        }

        const options = this.getTraitOptions(categoryKey, type);
        $traitSelect.html(options).prop('disabled', false);
        $addBtn.prop('disabled', true);
    }

    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        
        if (selectedTraits.has(traitKey)) {
            // Check if we can add another instance
            const traitData = selectedTraits.get(traitKey);
            const category = meritFlawMerits[categoryKey];
            const trait = category[type + 's'][traitKey];
            const dotsInfo = meritTraitUtils.parseDotsNotation(trait.dots);
            
            if (dotsInfo.allowMultiple) {
                // Add another instance
                if (!traitData.instances) {
                    traitData.instances = [{ level: traitData.level }];
                }
                traitData.instances.push({ level: 1 });
            } else {
                this.showFeedback(`${type === 'merit' ? 'Merit' : 'Flaw'} already selected`, 'warning');
                return;
            }
        } else {
            // Add new trait
            const category = meritFlawMerits[categoryKey];
            const trait = category[type + 's'][traitKey];
            const dotsInfo = meritTraitUtils.parseDotsNotation(trait.dots);
            
            selectedTraits.set(traitKey, {
                category: categoryKey,
                level: 1,
                instances: dotsInfo.allowMultiple ? [{ level: 1 }] : undefined
            });
        }

        this.updateDisplay();
        
        // Reset dropdowns
        $(`#${type}CategorySelect`).val('').trigger('change');
        
        // Emit trait added event
        this.emit(`${type}Added`, {
            traitKey,
            categoryKey,
            level: 1,
            type
        });
    }

    removeTrait(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        
        if (!selectedTraits.has(traitKey)) {
            return;
        }

        const traitData = selectedTraits.get(traitKey);
        
        if (instanceIndex !== null && traitData.instances) {
            // Remove specific instance
            traitData.instances.splice(instanceIndex, 1);
            
            if (traitData.instances.length === 0) {
                selectedTraits.delete(traitKey);
            }
        } else {
            // Remove entire trait
            selectedTraits.delete(traitKey);
        }

        this.updateDisplay();
        
        // Emit trait removed event
        this.emit(`${type}Removed`, {
            traitKey,
            instanceIndex,
            type
        });
    }

    handleDotClick($dot) {
        const $dots = $dot.closest('.dots');
        const type = $dots.data('merit') ? 'merit' : 'flaw';
        const traitKey = $dots.data(type);
        const instanceIndex = $dots.data('instance');
        const currentLevel = parseInt($dots.data('value'));
        const clickedIndex = $dot.index();
        const newLevel = clickedIndex + 1;

        if (newLevel === currentLevel) {
            // Same level clicked, do nothing
            return;
        }

        this.updateTraitInstanceLevel(type, traitKey, instanceIndex, newLevel);
    }

    updateTraitInstanceLevel(type, traitKey, instanceIndex, newLevel) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const traitData = selectedTraits.get(traitKey);
        
        if (!traitData) {
            return;
        }

        const oldLevel = instanceIndex !== null && traitData.instances ? 
            traitData.instances[instanceIndex].level : traitData.level;

        // Update the level
        if (instanceIndex !== null && traitData.instances) {
            traitData.instances[instanceIndex].level = newLevel;
        } else {
            traitData.level = newLevel;
        }

        this.updateTraitDisplay(type, traitKey, instanceIndex);
        
        // Emit trait level changed event
        this.emit(`${type}LevelChanged`, {
            traitKey,
            instanceIndex,
            oldLevel,
            newLevel,
            type
        });
    }

    updateTraitDisplay(type, traitKey, instanceIndex = null) {
        const $traitItem = $(`.${type}-item[data-${type}="${traitKey}"]${instanceIndex !== null ? `[data-instance="${instanceIndex}"]` : ''}`);
        if ($traitItem.length === 0) {
            return;
        }

        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const traitData = selectedTraits.get(traitKey);
        
        if (!traitData) {
            return;
        }

        const category = meritFlawMerits[traitData.category];
        const trait = category[type + 's'][traitKey];
        const dotsInfo = meritTraitUtils.parseDotsNotation(trait.dots);
        const currentLevel = instanceIndex !== null && traitData.instances ? 
            traitData.instances[instanceIndex].level : traitData.level;

        // Update dots
        const $dots = $traitItem.find('.dots');
        $dots.attr('data-value', currentLevel);
        $dots.html(meritTraitUtils.createDots(currentLevel, dotsInfo.maxDots));
    }

    updateDisplay() {
        this.renderMeritManager();
        this.renderFlawManager();
        this.initializeTooltips();
        
        // Emit display updated event
        this.emit('displayUpdated', {
            merits: this.exportMeritsAndFlaws().merits,
            flaws: this.exportMeritsAndFlaws().flaws
        });
    }

    initializeTooltips() {
        // Reinitialize tooltips for new elements
        $('[data-bs-toggle="tooltip"]').tooltip();
    }

    updateTraitTypeDisplay(type) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const container = type === 'merit' ? '.merits-container' : '.flaws-container';
        
        $(container).find(`#${type}sList`).html(
            selectedTraits.size === 0 ? 
                `<div class="fst-italic">No ${type}s selected</div>` : 
                this.getSelectedTraitsHtml(type, selectedTraits)
        );
        
        this.initializeTooltips();
    }

    getSelectedMerits() {
        return Array.from(this.selectedMerits.keys());
    }

    getSelectedFlaws() {
        return Array.from(this.selectedFlaws.keys());
    }

    getMeritLevel(meritKey) {
        const meritData = this.selectedMerits.get(meritKey);
        return meritData ? meritData.level : 0;
    }

    getFlawLevel(flawKey) {
        const flawData = this.selectedFlaws.get(flawKey);
        return flawData ? flawData.level : 0;
    }

    getTotalMeritPoints() {
        return this.calculateTotalPoints(this.selectedMerits, 'merit');
    }

    getTotalFlawPoints() {
        return this.calculateTotalPoints(this.selectedFlaws, 'flaw');
    }

    calculateTotalPoints(selectedTraits, type) {
        let total = 0;
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = meritFlawMerits[traitData.category];
            const trait = category[type + 's'][traitKey];
            const dotsInfo = meritTraitUtils.parseDotsNotation(trait.dots);
            
            if (traitData.instances) {
                traitData.instances.forEach(instance => {
                    total += instance.level * dotsInfo.pointCost;
                });
            } else {
                total += traitData.level * dotsInfo.pointCost;
            }
        });
        
        return total;
    }

    loadMeritsAndFlaws(meritsData, flawsData) {
        this.selectedMerits.clear();
        this.selectedFlaws.clear();
        
        if (meritsData && typeof meritsData === 'object') {
            Object.entries(meritsData).forEach(([meritKey, data]) => {
                this.selectedMerits.set(meritKey, {
                    category: data.category || this.findTraitCategory(meritKey, 'merit'),
                    level: data.level || 1,
                    instances: data.instances || undefined
                });
            });
        }
        
        if (flawsData && typeof flawsData === 'object') {
            Object.entries(flawsData).forEach(([flawKey, data]) => {
                this.selectedFlaws.set(flawKey, {
                    category: data.category || this.findTraitCategory(flawKey, 'flaw'),
                    level: data.level || 1,
                    instances: data.instances || undefined
                });
            });
        }
        
        this.updateDisplay();
        
        // Emit traits loaded event
        this.emit('traitsLoaded', {
            merits: this.exportMeritsAndFlaws().merits,
            flaws: this.exportMeritsAndFlaws().flaws
        });
    }

    findTraitCategory(traitKey, type) {
        for (const [categoryKey, category] of Object.entries(meritFlawMerits)) {
            if (category[type + 's'] && category[type + 's'][traitKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    exportMeritsAndFlaws() {
        const exported = {
            merits: {},
            flaws: {}
        };
        
        this.selectedMerits.forEach((data, key) => {
            exported.merits[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances
            };
        });
        
        this.selectedFlaws.forEach((data, key) => {
            exported.flaws[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances
            };
        });
        
        return exported;
    }

    /**
     * Component integration methods
     */
    getData() {
        return this.exportMeritsAndFlaws();
    }

    update(data) {
        if (data.merits || data.flaws) {
            this.loadMeritsAndFlaws(data.merits, data.flaws);
        }
    }

    clear() {
        this.selectedMerits.clear();
        this.selectedFlaws.clear();
        this.updateDisplay();
        
        // Emit traits cleared event
        this.emit('traitsCleared');
    }

    setLockState(isLocked) {
        const $meritContainer = $('.merits-container');
        const $flawContainer = $('.flaws-container');
        
        const $meritAddBtn = $meritContainer.find('#addMeritBtn');
        const $flawAddBtn = $flawContainer.find('#addFlawBtn');
        const $removeMeritBtns = $meritContainer.find('.remove-merit-btn');
        const $removeFlawBtns = $flawContainer.find('.remove-flaw-btn');
        const $dots = $('.dots');

        if (isLocked) {
            $meritAddBtn.prop('disabled', true);
            $flawAddBtn.prop('disabled', true);
            $removeMeritBtns.prop('disabled', true);
            $removeFlawBtns.prop('disabled', true);
            $dots.addClass('locked');
        } else {
            $meritAddBtn.prop('disabled', false);
            $flawAddBtn.prop('disabled', false);
            $removeMeritBtns.prop('disabled', false);
            $removeFlawBtns.prop('disabled', false);
            $dots.removeClass('locked');
        }
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'Merit/Flaw Manager');
        } else {
            console.log(`[MeritFlawManager] ${type.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Ensure required containers exist in the DOM
     */
    static ensureContainer() {
        if ($('.merits-container').length === 0) {
            const container = document.createElement('div');
            container.className = 'merits-container';
            (document.getElementById('app') || document.body).appendChild(container);
        }
        if ($('.flaws-container').length === 0) {
            const container = document.createElement('div');
            container.className = 'flaws-container';
            (document.getElementById('app') || document.body).appendChild(container);
        }
    }

    /**
     * Initialize manager after DOM is ready and containers exist
     */
    static initWhenReady() {
        $(function() {
            MeritFlawManager.ensureContainer();
            if (!window.meritFlawManager) {
                window.meritFlawManager = new MeritFlawManager();
            }
            window.meritFlawManager.init();
        });
    }
}

// Create and export the merit-flaw manager instance
const meritFlawManager = new MeritFlawManager();

// Add to window for global access
window.meritFlawManager = meritFlawManager;