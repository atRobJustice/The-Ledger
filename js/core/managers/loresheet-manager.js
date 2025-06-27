/**
 * @fileoverview Loresheet Manager for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Manages character loresheets. Provides functionality for selecting, leveling,
 *             and managing loresheets with category-based organization and dot-based leveling system.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires loresheets.js - Contains all loresheet data and categories
 * @requires manager-utils.js - Provides utility functions for trait management (TraitManagerUtils)
 * @requires jQuery - Used for DOM manipulation and event handling
 * @requires Bootstrap - Used for UI components and tooltips
 * 
 * @class LoresheetManager
 * @classdesc Main class for managing character loresheets
 * 
 * @property {Map} selectedLoresheets - Map of loresheetKey -> { category: string, level: number, instances: Array }
 * @property {Array} availableCategories - Array of available loresheet category keys
 * 
 * @method constructor - Initializes the manager with empty collections and available categories
 * @method init - Sets up the UI, binds events, and initializes tooltips
 * @method renderLoresheetManager - Creates the main loresheet management interface
 * @method renderLoresheetSection - Creates the loresheet section with selector and list
 * @method renderLoresheetSelector - Creates the loresheet selection interface
 * @method renderSelectedLoresheets - Creates the selected loresheets display
 * @method getCategoryOptions - Generates HTML options for loresheet categories dropdown
 * @method getLoresheetOptions - Generates HTML options for loresheets within a category
 * @method getSelectedLoresheetsHtml - Creates HTML representation of selected loresheets
 * @method bindEvents - Sets up event listeners for user interactions
 * @method updateLoresheetDropdown - Updates loresheet dropdown options when category changes
 * @method addLoresheet - Adds a new loresheet to the selected collection
 * @method removeLoresheet - Removes a loresheet from the selected collection
 * @method handleDotClick - Handles clicks on dot controls to change loresheet levels
 * @method updateLoresheetInstanceLevel - Updates the level of a loresheet instance
 * @method updateDisplay - Refreshes the entire display
 * @method initializeTooltips - Sets up Bootstrap tooltips
 * @method getSelectedLoresheets - Returns the map of selected loresheets
 * @method getLoresheetLevel - Gets the total level of a specific loresheet
 * @method getTotalLoresheetPoints - Calculates total loresheet points spent
 * @method loadLoresheets - Loads saved loresheet data
 * @method findLoresheetCategory - Finds which category a loresheet belongs to
 * @method exportLoresheets - Exports current loresheet data for saving
 * 
 * @typedef {Object} LoresheetData
 * @property {string} category - Category key the loresheet belongs to
 * @property {number} level - Current loresheet level (1-5)
 * @property {Array} instances - Array of loresheet instances for repeatable loresheets
 * 
 * @typedef {Object} Loresheet
 * @property {string} name - Loresheet name
 * @property {string} description - Loresheet description
 * @property {string} restrictions - Special requirements or restrictions
 * @property {string} category - Category the loresheet belongs to
 * 
 * @example
 * const loresheetManager = new LoresheetManager();
 * loresheetManager.addLoresheet('anarch_philosophy', 'anarch');
 * loresheetManager.getLoresheetLevel('anarch_philosophy'); // Returns total level
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

// Loresheet Manager
import { loresheets } from '../../data/loresheets.js';
import { TraitManagerUtils } from './manager-utils.js';

class LoresheetManager {
    constructor() {
        this.selectedLoresheets = new Map(); // loresheetKey -> { category: string, level: number, instances: Array }
        this.availableCategories = Object.keys(loresheets.categories);
        this.init();
    }

    init() {
        this.renderLoresheetManager();
        this.bindEvents();
        this.initializeTooltips();
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
                const category = loresheets.categories[categoryKey];
                return `<option value="${categoryKey}">${category.name}</option>`;
            })
            .join('');
    }

    getLoresheetOptions(categoryKey, excludeSelected = true) {
        const category = loresheets.categories[categoryKey];
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
            const category = loresheets.categories[loresheetData.category];
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
                                    ${TraitManagerUtils.createDots(instance.level, 5)}
                                </div>
                                <button class="btn theme-btn-primary btn-sm remove-loresheet-btn" data-loresheet="${loresheetKey}" data-instance="${instanceIndex}">
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
            const $select = $(e.currentTarget);
            const categoryKey = $select.val();
            this.updateLoresheetDropdown(categoryKey);
        });

        // Loresheet selection events
        $(document).on('change', '.loresheet-dropdown', (e) => {
            const $select = $(e.currentTarget);
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
            const $btn = $(e.currentTarget);
            const loresheetKey = $btn.data('loresheet');
            const instanceIndex = $btn.data('instance');
            this.removeLoresheet(loresheetKey, instanceIndex);
        });

        // Dot click events
        $(document).on('click', '.loresheet-item .dots .dot', (e) => {
            const $dot = $(e.currentTarget);
            this.handleDotClick($dot);
        });
    }

    updateLoresheetDropdown(categoryKey) {
        const $select = $('#loresheetSelect');
        const $addBtn = $('#addLoresheetBtn');
        
        if (!categoryKey) {
            $select.prop('disabled', true).html('<option value="">Select a Loresheet</option>');
            return;
        }

        // Ensure the placeholder option is always present
        const options = `<option value="">Select a Loresheet</option>${this.getLoresheetOptions(categoryKey)}`;
        $select.prop('disabled', false).html(options).val('');
        $addBtn.prop('disabled', true);
    }

    addLoresheet(loresheetKey, categoryKey) {
        const category = loresheets.categories[categoryKey];
        const loresheet = category.loresheets[loresheetKey];

        if (!this.selectedLoresheets.has(loresheetKey)) {
            this.selectedLoresheets.set(loresheetKey, {
                category: categoryKey,
                level: 1,
                instances: [{ level: 1 }]
            });
        } else {
            const loresheetData = this.selectedLoresheets.get(loresheetKey);
            loresheetData.instances.push({ level: 1 });
        }

        this.updateDisplay();
        this.updateLoresheetDropdown(categoryKey);
    }

    removeLoresheet(loresheetKey, instanceIndex = null) {
        if (!this.selectedLoresheets.has(loresheetKey)) return;

        const loresheetData = this.selectedLoresheets.get(loresheetKey);
        
        if (instanceIndex === null) {
            this.selectedLoresheets.delete(loresheetKey);
        } else {
            loresheetData.instances.splice(instanceIndex, 1);
            if (loresheetData.instances.length === 0) {
                this.selectedLoresheets.delete(loresheetKey);
            }
        }

        this.updateDisplay();
    }

    handleDotClick($dot) {
        const $dots = $dot.parent();
        const loresheetKey = $dots.data('loresheet');
        const instanceIndex = $dots.data('instance');
        const newLevel = $dot.index() + 1;

        this.updateLoresheetInstanceLevel(loresheetKey, instanceIndex, newLevel);
    }

    updateLoresheetInstanceLevel(loresheetKey, instanceIndex, newLevel) {
        if (!this.selectedLoresheets.has(loresheetKey)) return;

        const loresheetData = this.selectedLoresheets.get(loresheetKey);
        const instance = loresheetData.instances[instanceIndex];
        
        if (instance) {
            instance.level = newLevel;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        this.renderLoresheetManager();
        this.initializeTooltips();
    }

    initializeTooltips() {
        TraitManagerUtils.initTooltips(['.loresheets-container']);
    }

    getSelectedLoresheets() {
        return Array.from(this.selectedLoresheets.entries()).map(([key, data]) => ({
            key,
            category: data.category,
            level: data.level,
            instances: data.instances
        }));
    }

    getLoresheetLevel(loresheetKey) {
        const loresheetData = this.selectedLoresheets.get(loresheetKey);
        return loresheetData ? loresheetData.level : 0;
    }

    getTotalLoresheetPoints() {
        return TraitManagerUtils.sumLevels(this.selectedLoresheets);
    }

    loadLoresheets(loresheetsData) {
        this.selectedLoresheets.clear();
        
        if (!loresheetsData) return;

        loresheetsData.forEach(data => {
            this.selectedLoresheets.set(data.key, {
                category: data.category,
                level: data.level,
                instances: data.instances || [{ level: data.level }]
            });
        });

        this.updateDisplay();
    }

    findLoresheetCategory(loresheetKey) {
        for (const [categoryKey, category] of Object.entries(loresheets.categories)) {
            if (category.loresheets && category.loresheets[loresheetKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    exportLoresheets() {
        return this.getSelectedLoresheets();
    }
}

export { LoresheetManager };

// Initialize the manager
window.loresheetManager = new LoresheetManager(); 