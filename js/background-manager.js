// Background and Background Flaw Manager with Component Architecture Integration
const backgroundManagerBackgrounds = window.backgrounds;
const backgroundTraitUtils = window.TraitManagerUtils;

class BackgroundManager {
    constructor() {
        this.selectedBackgrounds = new Map(); // backgroundKey -> { category: string, level: number, instances: Array }
        this.selectedBackgroundFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = Object.keys(backgroundManagerBackgrounds);
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
        console.log('BackgroundManager: Component mode enabled');
    }

    /**
     * Initialize the manager
     */
    init() {
        this.renderBackgroundManager();
        this.renderBackgroundFlawManager();
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
                    console.error(`Error in background manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`background${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'BackgroundManager' }
        }));
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
                const category = backgroundManagerBackgrounds[categoryKey];
                return `<option value="${categoryKey}">${category.name}</option>`;
            })
            .join('');
    }

    getTraitOptions(categoryKey, type, excludeSelected = true) {
        const category = backgroundManagerBackgrounds[categoryKey];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        if (!category || !category[traitsKey]) return '';

        const traits = category[traitsKey];
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;

        return backgroundTraitUtils.generateTraitOptions(traits, selectedTraits, categoryKey);
    }

    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = backgroundManagerBackgrounds[traitData.category];
            const traitsKey = type === 'background' ? 'merits' : 'flaws';
            const trait = category[traitsKey][traitKey];
            const displayName = trait.name || backgroundTraitUtils.camelToTitle(traitKey);
            const dotsInfo = backgroundTraitUtils.parseDotsNotation(trait.dots);
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
        const { maxDots, traitTypeClass, tooltipText } = backgroundTraitUtils.getDotsMeta(dotsInfo, 'background');
        
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
                ${backgroundTraitUtils.createDots(instance.level, maxDots)}
            </div>
        `;
    }

    bindEvents() {
        // Category selection events
        $(document).on('change', '#backgroundCategorySelect, #backgroundFlawCategorySelect', (e) => {
            const $select = $(e.target);
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
            const $select = $(e.target);
            const traitKey = $select.val();
            const isBackgroundFlaw = $select.attr('id') === 'backgroundFlawSelect';
            const addBtnId = isBackgroundFlaw ? '#addBackgroundFlawBtn' : '#addBackgroundBtn';
            
            $(addBtnId).prop('disabled', !traitKey);
        });

        // Add trait events
        $(document).on('click', '#addBackgroundBtn, #addBackgroundFlawBtn', (e) => {
            e.preventDefault();
            const $btn = $(e.target);
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
            const $btn = $(e.target).closest('.remove-trait-btn');
            const type = $btn.data('trait-type');
            const traitKey = $btn.data('trait-key');
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

    updateTraitOptions(categoryKey, type) {
        const selectId = type === 'backgroundFlaw' ? '#backgroundFlawSelect' : '#backgroundSelect';
        const $select = $(selectId);
        const options = this.getTraitOptions(categoryKey, type);
        
        if (options) {
            $select.prop('disabled', false).html(`
                <option value="">Select ${type === 'backgroundFlaw' ? 'Background Flaw' : 'Background'}</option>
                ${options}
            `);
        } else {
            $select.prop('disabled', true).html(`<option value="">No ${type === 'backgroundFlaw' ? 'background flaws' : 'backgrounds'} available in this category</option>`);
        }
        
        // Disable add button
        const addBtnId = type === 'backgroundFlaw' ? '#addBackgroundFlawBtn' : '#addBackgroundBtn';
        $(addBtnId).prop('disabled', true);
    }

    clearTraitOptions(type) {
        const selectId = type === 'backgroundFlaw' ? '#backgroundFlawSelect' : '#backgroundFlawSelect';
        const addBtnId = type === 'backgroundFlaw' ? '#addBackgroundFlawBtn' : '#addBackgroundBtn';
        
        $(selectId).prop('disabled', true).html(`<option value="">Select ${type === 'backgroundFlaw' ? 'Background Flaw' : 'Background'}</option>`);
        $(addBtnId).prop('disabled', true);
    }

    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        
        if (selectedTraits.has(traitKey)) {
            // Check if we can add another instance
            const traitData = selectedTraits.get(traitKey);
            const category = backgroundManagerBackgrounds[categoryKey];
            const traitsKey = type === 'background' ? 'merits' : 'flaws';
            const trait = category[traitsKey][traitKey];
            const dotsInfo = backgroundTraitUtils.parseDotsNotation(trait.dots);
            
            if (dotsInfo.allowMultiple) {
                // Add another instance
                if (!traitData.instances) {
                    traitData.instances = [{ level: traitData.level }];
                }
                traitData.instances.push({ level: 1 });
            } else {
                this.showFeedback(`${type === 'background' ? 'Background' : 'Background Flaw'} already selected`, 'warning');
                return;
            }
        } else {
            // Add new trait
            const category = backgroundManagerBackgrounds[categoryKey];
            const traitsKey = type === 'background' ? 'merits' : 'flaws';
            const trait = category[traitsKey][traitKey];
            const dotsInfo = backgroundTraitUtils.parseDotsNotation(trait.dots);
            
            selectedTraits.set(traitKey, {
                category: categoryKey,
                level: 1,
                instances: dotsInfo.allowMultiple ? [{ level: 1 }] : undefined
            });
        }

        this.updateDisplay();
        
        // Reset dropdowns
        const categorySelectId = type === 'backgroundFlaw' ? '#backgroundFlawCategorySelect' : '#backgroundCategorySelect';
        $(categorySelectId).val('').trigger('change');
        
        // Emit trait added event
        this.emit(`${type}Added`, {
            traitKey,
            categoryKey,
            level: 1,
            type
        });
    }

    removeTrait(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        
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
        const traitKey = $dots.data('trait-key');
        const type = $dots.data('trait-category');
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
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
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

        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        const traitData = selectedTraits.get(traitKey);
        
        if (!traitData) {
            return;
        }

        const category = backgroundManagerBackgrounds[traitData.category];
        const traitsKey = type === 'background' ? 'merits' : 'flaws';
        const trait = category[traitsKey][traitKey];
        const dotsInfo = backgroundTraitUtils.parseDotsNotation(trait.dots);
        const currentLevel = instanceIndex !== null && traitData.instances ? 
            traitData.instances[instanceIndex].level : traitData.level;

        // Update dots
        const $dots = $traitItem.find('.dots');
        $dots.attr('data-value', currentLevel);
        $dots.html(backgroundTraitUtils.createDots(currentLevel, dotsInfo.maxDots));
    }

    updateDisplay() {
        this.renderBackgroundManager();
        this.renderBackgroundFlawManager();
        this.initializeTooltips();
        
        // Emit display updated event
        this.emit('displayUpdated', {
            backgrounds: this.exportBackgroundsAndFlaws().backgrounds,
            backgroundFlaws: this.exportBackgroundsAndFlaws().backgroundFlaws
        });
    }

    updateTraitTypeDisplay(type) {
        const selectedTraits = type === 'background' ? this.selectedBackgrounds : this.selectedBackgroundFlaws;
        const container = type === 'background' ? '.backgrounds-container' : '.background-flaws-container';
        
        $(container).find(`.selected-${type === 'background' ? 'backgrounds' : 'background-flaws'}`).html(
            selectedTraits.size === 0 ? 
                `<div class="fst-italic">No ${type === 'background' ? 'backgrounds' : 'background flaws'} selected</div>` : 
                this.getSelectedTraitsHtml(type, selectedTraits)
        );
        
        this.initializeTooltips();
    }

    initializeTooltips() {
        // Reinitialize tooltips for new elements
        $('[data-bs-toggle="tooltip"]').tooltip();
    }

    getSelectedBackgrounds() {
        return Array.from(this.selectedBackgrounds.keys());
    }

    getSelectedBackgroundFlaws() {
        return Array.from(this.selectedBackgroundFlaws.keys());
    }

    getBackgroundLevel(backgroundKey) {
        const backgroundData = this.selectedBackgrounds.get(backgroundKey);
        return backgroundData ? backgroundData.level : 0;
    }

    getBackgroundFlawLevel(flawKey) {
        const flawData = this.selectedBackgroundFlaws.get(flawKey);
        return flawData ? flawData.level : 0;
    }

    getTotalBackgroundPoints() {
        return this.calculateTotalPoints(this.selectedBackgrounds, 'background');
    }

    getTotalBackgroundFlawPoints() {
        return this.calculateTotalPoints(this.selectedBackgroundFlaws, 'backgroundFlaw');
    }

    calculateTotalPoints(selectedTraits, type) {
        let total = 0;
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = backgroundManagerBackgrounds[traitData.category];
            const traitsKey = type === 'background' ? 'merits' : 'flaws';
            const trait = category[traitsKey][traitKey];
            const dotsInfo = backgroundTraitUtils.parseDotsNotation(trait.dots);
            
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

    loadBackgroundsAndFlaws(backgroundsData, flawsData) {
        this.selectedBackgrounds.clear();
        this.selectedBackgroundFlaws.clear();
        
        if (backgroundsData && typeof backgroundsData === 'object') {
            Object.entries(backgroundsData).forEach(([backgroundKey, data]) => {
                this.selectedBackgrounds.set(backgroundKey, {
                    category: data.category || this.findTraitCategory(backgroundKey, 'background'),
                    level: data.level || 1,
                    instances: data.instances || undefined
                });
            });
        }
        
        if (flawsData && typeof flawsData === 'object') {
            Object.entries(flawsData).forEach(([flawKey, data]) => {
                this.selectedBackgroundFlaws.set(flawKey, {
                    category: data.category || this.findTraitCategory(flawKey, 'backgroundFlaw'),
                    level: data.level || 1,
                    instances: data.instances || undefined
                });
            });
        }
        
        this.updateDisplay();
        
        // Emit traits loaded event
        this.emit('traitsLoaded', {
            backgrounds: this.exportBackgroundsAndFlaws().backgrounds,
            backgroundFlaws: this.exportBackgroundsAndFlaws().backgroundFlaws
        });
    }

    findTraitCategory(traitKey, type) {
        for (const [categoryKey, category] of Object.entries(backgroundManagerBackgrounds)) {
            const traitsKey = type === 'background' ? 'merits' : 'flaws';
            if (category[traitsKey] && category[traitsKey][traitKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    exportBackgroundsAndFlaws() {
        const exported = {
            backgrounds: {},
            backgroundFlaws: {}
        };
        
        this.selectedBackgrounds.forEach((data, key) => {
            exported.backgrounds[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances
            };
        });
        
        this.selectedBackgroundFlaws.forEach((data, key) => {
            exported.backgroundFlaws[key] = {
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
        return this.exportBackgroundsAndFlaws();
    }

    update(data) {
        if (data.backgrounds || data.backgroundFlaws) {
            this.loadBackgroundsAndFlaws(data.backgrounds, data.backgroundFlaws);
        }
    }

    clear() {
        this.selectedBackgrounds.clear();
        this.selectedBackgroundFlaws.clear();
        this.updateDisplay();
        
        // Emit traits cleared event
        this.emit('traitsCleared');
    }

    setLockState(isLocked) {
        const $backgroundContainer = $('.backgrounds-container');
        const $backgroundFlawContainer = $('.background-flaws-container');
        
        const $backgroundAddBtn = $backgroundContainer.find('#addBackgroundBtn');
        const $backgroundFlawAddBtn = $backgroundFlawContainer.find('#addBackgroundFlawBtn');
        const $removeBtns = $('.remove-trait-btn');
        const $dots = $('.dots');

        if (isLocked) {
            $backgroundAddBtn.prop('disabled', true);
            $backgroundFlawAddBtn.prop('disabled', true);
            $removeBtns.prop('disabled', true);
            $dots.addClass('locked');
        } else {
            $backgroundAddBtn.prop('disabled', false);
            $backgroundFlawAddBtn.prop('disabled', false);
            $removeBtns.prop('disabled', false);
            $dots.removeClass('locked');
        }
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'Background Manager');
        } else {
            console.log(`[BackgroundManager] ${type.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Ensure required containers exist in the DOM
     */
    static ensureContainer() {
        if ($('.backgrounds-container').length === 0) {
            const container = document.createElement('div');
            container.className = 'backgrounds-container';
            (document.getElementById('app') || document.body).appendChild(container);
        }
        if ($('.background-flaws-container').length === 0) {
            const container = document.createElement('div');
            container.className = 'background-flaws-container';
            (document.getElementById('app') || document.body).appendChild(container);
        }
    }

    /**
     * Initialize manager after DOM is ready and containers exist
     */
    static initWhenReady() {
        $(function() {
            BackgroundManager.ensureContainer();
            if (!window.backgroundManager) {
                window.backgroundManager = new BackgroundManager();
            }
            window.backgroundManager.init();
        });
    }
}

// Create and export the background manager instance
const backgroundManager = new BackgroundManager();

// Add to window for global access
window.backgroundManager = backgroundManager;