// Loresheet Manager with Component Architecture Integration
// import { loresheets } from './references/loresheets.js';
// import { TraitManagerUtils } from './manager-utils.js';

const loresheetManagerLoresheets = window.loresheets;
const loresheetTraitUtils = window.TraitManagerUtils;

class LoresheetManager {
    constructor() {
        this.selectedLoresheets = new Map(); // loresheetKey -> { category: string, level: number, instances: Array }
        this.availableCategories = Object.keys(loresheetManagerLoresheets.categories);
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
        console.log('LoresheetManager: Component mode enabled');
    }

    /**
     * Initialize the manager
     */
    init() {
        this.renderLoresheetManager();
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
                    console.error(`Error in loresheet manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`loresheet${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'LoresheetManager' }
        }));
    }

    renderLoresheetManager() {
        const loresheetContainer = $('.loresheets-container');
        if (loresheetContainer.length === 0) {
            console.error('Loresheets container not found');
            return;
        }

        loresheetContainer.empty();
        this.renderLoresheetSection(loresheetContainer);
    }

    renderLoresheetSection(container) {
        // Add loresheet selector
        this.renderLoresheetSelector(container);
        
        // Add selected loresheets list
        this.renderSelectedLoresheets(container);
    }

    renderLoresheetSelector(container) {
        const selectorHtml = `
            <div class="loresheet-selector mb-3">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <select class="form-select loresheet-category-dropdown" id="loresheetCategorySelect">
                        <option value="">Select Category</option>
                        ${this.getCategoryOptions()}
                    </select>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <select class="form-select loresheet-dropdown" id="loresheetSelect" disabled>
                        <option value="">Select a Loresheet</option>
                    </select>
                    <button class="btn btn-success btn-sm" id="addLoresheetBtn" disabled>
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
        `;
        container.append(selectorHtml);
    }

    renderSelectedLoresheets(container) {
        const selectedHtml = `
            <div class="selected-loresheets">
                <div id="loresheetsList" class="loresheets-list">
                    ${this.selectedLoresheets.size === 0 ? 
                        `<div class="fst-italic">No loresheets selected</div>` : 
                        this.getSelectedLoresheetsHtml()
                    }
                </div>
            </div>
        `;
        container.append(selectedHtml);
    }

    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = loresheetManagerLoresheets.categories[categoryKey];
                return `<option value="${categoryKey}">${category.name}</option>`;
            })
            .join('');
    }

    getLoresheetOptions(categoryKey, excludeSelected = true) {
        const category = loresheetManagerLoresheets.categories[categoryKey];
        if (!category || !category.loresheets) return '';

        const categoryLoresheets = category.loresheets;

        return Object.keys(categoryLoresheets)
            .filter(loresheetKey => {
                if (!excludeSelected) return true;
                return !this.selectedLoresheets.has(loresheetKey);
            })
            .map(loresheetKey => {
                const loresheet = categoryLoresheets[loresheetKey];
                const displayName = loresheet.name;
                const restrictions = loresheet.restrictions !== 'N/A' ? ` (${loresheet.restrictions})` : '';
                
                return `<option value="${loresheetKey}" data-category="${categoryKey}">${displayName}${restrictions}</option>`;
            })
            .join('');
    }

    getSelectedLoresheetsHtml() {
        const html = [];
        
        this.selectedLoresheets.forEach((loresheetData, loresheetKey) => {
            const category = loresheetManagerLoresheets.categories[loresheetData.category];
            const loresheet = category.loresheets[loresheetKey];
            const instances = loresheetData.instances || [{ level: loresheetData.level }];
            
            instances.forEach((instance, instanceIndex) => {
                const instanceId = `${loresheetKey}_${instanceIndex}`;
                
                html.push(`
                    <div class="loresheet-item mb-3" data-loresheet="${loresheetKey}" data-instance="${instanceIndex}">
                        <div class="loresheet-header d-flex justify-content-between align-items-center stat">
                            <div class="loresheet-info">
                                <span class="stat-label">${loresheet.name}${instances.length > 1 ? ` #${instanceIndex + 1}` : ''}</span>
                                <small class="d-block">${category.name}</small>
                                ${loresheet.restrictions !== 'N/A' ? `<small class="d-block">${loresheet.restrictions}</small>` : ''}
                            </div>
                            <div class="loresheet-controls d-flex align-items-center gap-2">
                                <div class="dots" 
                                     data-value="${instance.level}" 
                                     data-loresheet="${loresheetKey}" 
                                     data-instance="${instanceIndex}"
                                     data-bs-toggle="tooltip" 
                                     data-bs-placement="top" 
                                     title="Click dots to set level (1-5)">
                                    ${loresheetTraitUtils.createDots(instance.level, 5)}
                                </div>
                                <button class="btn btn-danger btn-sm remove-loresheet-btn" data-loresheet="${loresheetKey}" data-instance="${instanceIndex}">
                                    <i class="bi bi-dash-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="loresheet-description mt-2">
                            <small>${loresheet.description}</small>
                        </div>
                    </div>
                `);
            });
        });
        
        return html.join('');
    }

    bindEvents() {
        // Category selection events
        $(document).on('change', '.loresheet-category-dropdown', (e) => {
            const $select = $(e.target);
            const categoryKey = $select.val();
            this.updateLoresheetDropdown(categoryKey);
        });

        // Loresheet selection events
        $(document).on('change', '.loresheet-dropdown', (e) => {
            const $select = $(e.target);
            const addBtn = $('#addLoresheetBtn');
            addBtn.prop('disabled', !$select.val());
        });

        // Add loresheet events
        $(document).on('click', '#addLoresheetBtn', (e) => {
            e.preventDefault();
            const select = $('#loresheetSelect');
            const loresheetKey = select.val();
            const categoryKey = select.find('option:selected').data('category');
            
            if (loresheetKey && categoryKey) {
                this.addLoresheet(loresheetKey, categoryKey);
            }
        });

        // Remove loresheet events
        $(document).on('click', '.remove-loresheet-btn', (e) => {
            const $btn = $(e.target).closest('.remove-loresheet-btn');
            const loresheetKey = $btn.data('loresheet');
            const instanceIndex = $btn.data('instance');
            this.removeLoresheet(loresheetKey, instanceIndex);
        });

        // Dot click events
        $(document).on('click', '.dots .dot', (e) => {
            const $dot = $(e.target);
            this.handleDotClick($dot);
        });
    }

    updateLoresheetDropdown(categoryKey) {
        const $select = $('#loresheetSelect');
        const $addBtn = $('#addLoresheetBtn');
        
        if (!categoryKey) {
            $select.prop('disabled', true).html('<option value="">Select a Loresheet</option>');
            $addBtn.prop('disabled', true);
            return;
        }

        // Ensure the placeholder option is always present
        const options = `<option value="">Select a Loresheet</option>${this.getLoresheetOptions(categoryKey)}`;
        $select.prop('disabled', false).html(options);
        $addBtn.prop('disabled', true);
    }

    addLoresheet(loresheetKey, categoryKey) {
        if (this.selectedLoresheets.has(loresheetKey)) {
            // Check if we can add another instance
            const loresheetData = this.selectedLoresheets.get(loresheetKey);
            const category = loresheetManagerLoresheets.categories[categoryKey];
            const loresheet = category.loresheets[loresheetKey];
            
            // Loresheets can have multiple instances
            if (!loresheetData.instances) {
                loresheetData.instances = [{ level: loresheetData.level }];
            }
            loresheetData.instances.push({ level: 1 });
        } else {
            // Add new loresheet
            this.selectedLoresheets.set(loresheetKey, {
                category: categoryKey,
                level: 1,
                instances: [{ level: 1 }]
            });
        }

        this.updateDisplay();
        
        // Reset dropdowns
        $('#loresheetCategorySelect').val('').trigger('change');
        
        // Emit loresheet added event
        this.emit('loresheetAdded', {
            loresheetKey,
            categoryKey,
            level: 1
        });
    }

    removeLoresheet(loresheetKey, instanceIndex = null) {
        if (!this.selectedLoresheets.has(loresheetKey)) {
            return;
        }

        const loresheetData = this.selectedLoresheets.get(loresheetKey);
        
        if (instanceIndex !== null && loresheetData.instances && loresheetData.instances.length > 1) {
            // Remove specific instance
            loresheetData.instances.splice(instanceIndex, 1);
        } else {
            // Remove entire loresheet
            this.selectedLoresheets.delete(loresheetKey);
        }

        this.updateDisplay();
        
        // Emit loresheet removed event
        this.emit('loresheetRemoved', {
            loresheetKey,
            instanceIndex
        });
    }

    handleDotClick($dot) {
        const $dots = $dot.closest('.dots');
        const loresheetKey = $dots.data('loresheet');
        const instanceIndex = $dots.data('instance');
        const currentLevel = parseInt($dots.data('value'));
        const clickedIndex = $dot.index();
        const newLevel = clickedIndex + 1;

        if (newLevel === currentLevel) {
            // Same level clicked, do nothing
            return;
        }

        this.updateLoresheetInstanceLevel(loresheetKey, instanceIndex, newLevel);
    }

    updateLoresheetInstanceLevel(loresheetKey, instanceIndex, newLevel) {
        const loresheetData = this.selectedLoresheets.get(loresheetKey);
        if (!loresheetData) {
            return;
        }

        const oldLevel = loresheetData.instances[instanceIndex].level;
        loresheetData.instances[instanceIndex].level = newLevel;

        // Update display
        const $loresheetItem = $(`.loresheet-item[data-loresheet="${loresheetKey}"][data-instance="${instanceIndex}"]`);
        const $dots = $loresheetItem.find('.dots');
        $dots.attr('data-value', newLevel);
        $dots.html(loresheetTraitUtils.createDots(newLevel, 5));
        
        // Emit loresheet level changed event
        this.emit('loresheetLevelChanged', {
            loresheetKey,
            instanceIndex,
            oldLevel,
            newLevel
        });
    }

    updateDisplay() {
        this.renderLoresheetManager();
        this.initializeTooltips();
        
        // Emit display updated event
        this.emit('displayUpdated', {
            loresheets: this.exportLoresheets()
        });
    }

    initializeTooltips() {
        // Reinitialize tooltips for new elements
        $('[data-bs-toggle="tooltip"]').tooltip();
    }

    getSelectedLoresheets() {
        const result = {};
        this.selectedLoresheets.forEach((data, key) => {
            result[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances || [{ level: data.level }]
            };
        });
        return result;
    }

    getLoresheetLevel(loresheetKey) {
        const loresheetData = this.selectedLoresheets.get(loresheetKey);
        return loresheetData ? loresheetData.level : 0;
    }

    getTotalLoresheetPoints() {
        let total = 0;
        this.selectedLoresheets.forEach((data) => {
            const instances = data.instances || [{ level: data.level }];
            instances.forEach(instance => {
                total += instance.level;
            });
        });
        return total;
    }

    loadLoresheets(loresheetsData) {
        this.selectedLoresheets.clear();
        
        if (loresheetsData && typeof loresheetsData === 'object') {
            Object.entries(loresheetsData).forEach(([loresheetKey, data]) => {
                this.selectedLoresheets.set(loresheetKey, {
                    category: data.category || this.findLoresheetCategory(loresheetKey),
                    level: data.level || 1,
                    instances: data.instances || [{ level: data.level || 1 }]
                });
            });
        }
        
        this.updateDisplay();
        
        // Emit loresheets loaded event
        this.emit('loresheetsLoaded', {
            loresheets: this.exportLoresheets()
        });
    }

    findLoresheetCategory(loresheetKey) {
        for (const [categoryKey, category] of Object.entries(loresheetManagerLoresheets.categories)) {
            if (category.loresheets && category.loresheets[loresheetKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    exportLoresheets() {
        const exported = {};
        this.selectedLoresheets.forEach((data, key) => {
            exported[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances || [{ level: data.level }]
            };
        });
        return exported;
    }

    /**
     * Component integration methods
     */
    getData() {
        return {
            loresheets: this.exportLoresheets()
        };
    }

    update(data) {
        if (data.loresheets) {
            this.loadLoresheets(data.loresheets);
        }
    }

    clear() {
        this.selectedLoresheets.clear();
        this.updateDisplay();
        
        // Emit loresheets cleared event
        this.emit('loresheetsCleared');
    }

    setLockState(isLocked) {
        const $container = $('.loresheets-container');
        const $addBtn = $container.find('#addLoresheetBtn');
        const $removeBtns = $container.find('.remove-loresheet-btn');
        const $dots = $container.find('.dots');

        if (isLocked) {
            $addBtn.prop('disabled', true);
            $removeBtns.prop('disabled', true);
            $dots.addClass('locked');
        } else {
            $addBtn.prop('disabled', false);
            $removeBtns.prop('disabled', false);
            $dots.removeClass('locked');
        }
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'Loresheet Manager');
        } else {
            console.log(`[LoresheetManager] ${type.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Ensure required containers exist in the DOM
     */
    static ensureContainer() {
        if ($('.loresheets-container').length === 0) {
            const container = document.createElement('div');
            container.className = 'loresheets-container';
            (document.getElementById('app') || document.body).appendChild(container);
        }
    }

    /**
     * Initialize manager after DOM is ready and containers exist
     */
    static initWhenReady() {
        $(function() {
            LoresheetManager.ensureContainer();
            if (!window.loresheetManager) {
                window.loresheetManager = new LoresheetManager();
            }
            window.loresheetManager.init();
        });
    }
}

// Create and export the loresheet manager instance
const loresheetManager = new LoresheetManager();

// Add to window for global access
window.loresheetManager = loresheetManager;

// Remove ES6 export - use traditional script loading
// export default loresheetManager; 