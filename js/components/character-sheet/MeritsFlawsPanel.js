/**
 * MeritsFlawsPanel - Character merits and flaws panel component
 * Extends BaseComponent and integrates with merit-flaw-manager.js for comprehensive merit/flaw management
 */
class MeritsFlawsPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.selectedMerits = new Map(); // meritKey -> { category: string, level: number, instances: Array }
        this.selectedFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = [];
        this.meritsData = null;
        
        // Bind methods
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleTraitSelect = this.handleTraitSelect.bind(this);
        this.handleAddTrait = this.handleAddTrait.bind(this);
        this.handleRemoveTrait = this.handleRemoveTrait.bind(this);
        this.handleDotClick = this.handleDotClick.bind(this);
        this.renderTraitSection = this.renderTraitSection.bind(this);
        this.renderTraitSelector = this.renderTraitSelector.bind(this);
        this.renderSelectedTraits = this.renderSelectedTraits.bind(this);
        this.renderTraitControls = this.renderTraitControls.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Load merits reference data
        await this.loadMeritsData();
        
        // Initialize available categories
        this.availableCategories = Object.keys(this.meritsData);
        
        // Wait for merit-flaw manager to be available and set up component mode
        await this._waitForMeritFlawManager();
    }

    /**
     * Wait for merit-flaw manager to be available
     */
    async _waitForMeritFlawManager() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.meritFlawManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.meritFlawManager) {
            throw new Error('Merit-Flaw Manager not available');
        }

        // Set up component mode for merit-flaw manager
        if (typeof window.meritFlawManager.setComponentMode === 'function') {
            window.meritFlawManager.setComponentMode(this);
        }
    }

    /**
     * Render the merits and flaws panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="merits-flaws-panel">
                <div class="row">
                    <!-- Merits Column -->
                    <div class="col-md-6">
                        <h5 class="mb-2">Merits</h5>
                        <div class="ledger p-3 my-3">
                            <div class="merits-container">
                                <!-- Merit manager will be rendered here -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Flaws Column -->
                    <div class="col-md-6">
                        <h5 class="mb-2">Flaws</h5>
                        <div class="ledger p-3 my-3">
                            <div class="flaws-container">
                                <!-- Flaw manager will be rendered here -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Point Summary -->
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="ledger p-3">
                            <div class="point-summary d-flex justify-content-between">
                                <div class="merit-points">
                                    <strong>Merit Points:</strong> <span id="totalMeritPoints">0</span>
                                </div>
                                <div class="flaw-points">
                                    <strong>Flaw Points:</strong> <span id="totalFlawPoints">0</span>
                                </div>
                                <div class="net-points">
                                    <strong>Net Points:</strong> <span id="netPoints">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup
     */
    async afterRender() {
        // Initialize merit and flaw managers
        this.renderMeritManager();
        this.renderFlawManager();
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Initialize tooltips
        this.initTooltips();
        
        // Update point summary
        this.updatePointSummary();
    }

    /**
     * Load merits reference data
     */
    async loadMeritsData() {
        try {
            const module = await import('../../references/merits.js');
            this.meritsData = module.merits;
        } catch (error) {
            console.error('Failed to load merits data:', error);
            this.meritsData = {};
        }
    }

    /**
     * Render the merit manager interface
     */
    renderMeritManager() {
        const meritContainer = this.element.querySelector('.merits-container');
        if (!meritContainer) {
            console.error('Merits container not found');
            return;
        }

        meritContainer.innerHTML = '';
        this.renderTraitSection(meritContainer, 'merit', 'Merits', this.selectedMerits);
    }

    /**
     * Render the flaw manager interface
     */
    renderFlawManager() {
        const flawContainer = this.element.querySelector('.flaws-container');
        if (!flawContainer) {
            console.error('Flaws container not found');
            return;
        }

        flawContainer.innerHTML = '';
        this.renderTraitSection(flawContainer, 'flaw', 'Flaws', this.selectedFlaws);
    }

    /**
     * Render trait section (merits or flaws)
     * @param {HTMLElement} container - Container element
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} title - Section title
     * @param {Map} selectedTraits - Selected traits map
     */
    renderTraitSection(container, type, title, selectedTraits) {
        // Add trait selector
        this.renderTraitSelector(container, type, title);
        
        // Add selected traits list
        this.renderSelectedTraits(container, type, selectedTraits);
    }

    /**
     * Render trait selector
     * @param {HTMLElement} container - Container element
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} title - Section title
     */
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
                    <button class="btn btn-success btn-sm" id="add${this.capitalizeFirst(type)}Btn" disabled>
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', selectorHtml);
    }

    /**
     * Render selected traits list
     * @param {HTMLElement} container - Container element
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {Map} selectedTraits - Selected traits map
     */
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
        container.insertAdjacentHTML('beforeend', selectedHtml);
    }

    /**
     * Get category options for dropdown
     * @returns {string} HTML options string
     */
    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = this.meritsData[categoryKey];
                const displayName = category.name || this.camelToTitle(categoryKey);
                return `<option value="${categoryKey}">${displayName}</option>`;
            })
            .join('');
    }

    /**
     * Get trait options for dropdown
     * @param {string} categoryKey - Category key
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {boolean} excludeSelected - Whether to exclude already selected traits
     * @returns {string} HTML options string
     */
    getTraitOptions(categoryKey, type, excludeSelected = true) {
        const category = this.meritsData[categoryKey];
        if (!category || !category[type + 's']) return '';

        const traits = category[type + 's'];
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;

        return this.generateTraitOptions(traits, selectedTraits, categoryKey);
    }

    /**
     * Generate trait options for dropdown
     * @param {Object} traits - Traits object
     * @param {Map} selectedTraits - Selected traits map
     * @param {string} categoryKey - Category key
     * @returns {string} HTML options string
     */
    generateTraitOptions(traits, selectedTraits, categoryKey) {
        return Object.entries(traits)
            .filter(([traitKey, trait]) => {
                if (!excludeSelected) return true;
                
                // Check if trait is already selected
                const selectedTrait = selectedTraits.get(traitKey);
                if (!selectedTrait) return true;
                
                // Check if trait allows multiple instances
                const dotsInfo = this.parseDotsNotation(trait.dots);
                return dotsInfo.allowMultiple;
            })
            .map(([traitKey, trait]) => {
                const displayName = trait.name || this.camelToTitle(traitKey);
                const dotsInfo = this.parseDotsNotation(trait.dots);
                const tooltipText = this.getDotsTooltipText(dotsInfo, type);
                
                return `<option value="${traitKey}" 
                                data-category="${categoryKey}"
                                data-dots="${trait.dots}"
                                data-bs-toggle="tooltip" 
                                data-bs-placement="top" 
                                title="${tooltipText}">
                            ${displayName} (${trait.dots})
                        </option>`;
            })
            .join('');
    }

    /**
     * Get HTML for selected traits
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {Map} selectedTraits - Selected traits map
     * @returns {string} HTML string
     */
    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        
        selectedTraits.forEach((traitData, traitKey) => {
            const category = this.meritsData[traitData.category];
            const trait = category[type + 's'][traitKey];
            const displayName = trait.name || this.camelToTitle(traitKey);
            const dotsInfo = this.parseDotsNotation(trait.dots);
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

    /**
     * Render trait controls (dots)
     * @param {Object} trait - Trait object
     * @param {Object} instance - Trait instance
     * @param {string} traitKey - Trait key
     * @param {number} instanceIndex - Instance index
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {Object} dotsInfo - Dots information
     * @returns {string} HTML string
     */
    renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo) {
        const { maxDots, traitTypeClass, tooltipText } = this.getDotsMeta(dotsInfo, type);
        
        return `
            <div class="dots" 
                 data-value="${instance.level}" 
                 data-${type}="${traitKey}" 
                 data-instance="${instanceIndex}" 
                 data-trait-type="${traitTypeClass}"
                 data-bs-toggle="tooltip" 
                 data-bs-placement="top" 
                 title="${tooltipText}">
                ${this.createDots(instance.level, maxDots)}
            </div>
        `;
    }

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // Category selection events
        this.element.addEventListener('change', '.merit-category-dropdown, .flaw-category-dropdown', (e) => {
            this.handleCategorySelect(e);
        });

        // Trait selection events
        this.element.addEventListener('change', '.merit-dropdown, .flaw-dropdown', (e) => {
            this.handleTraitSelect(e);
        });

        // Add trait events
        this.element.addEventListener('click', '#addMeritBtn, #addFlawBtn', (e) => {
            e.preventDefault();
            this.handleAddTrait(e);
        });

        // Remove trait events
        this.element.addEventListener('click', '.remove-merit-btn, .remove-flaw-btn', (e) => {
            e.preventDefault();
            this.handleRemoveTrait(e);
        });

        // Dot clicks for trait levels
        this.element.addEventListener('click', '.dots .dot', (e) => {
            this.handleDotClick(e);
        });

        // Listen for lock state changes
        if (window.LockManager) {
            window.LockManager.on('lockStateChanged', (locked) => {
                this.setLocked(locked);
            });
        }
    }

    /**
     * Handle category selection
     * @param {Event} event - Change event
     */
    handleCategorySelect(event) {
        const select = event.target;
        const categoryKey = select.value;
        const type = select.classList.contains('merit-category-dropdown') ? 'merit' : 'flaw';
        
        this.updateTraitDropdown(categoryKey, type);
    }

    /**
     * Handle trait selection
     * @param {Event} event - Change event
     */
    handleTraitSelect(event) {
        const select = event.target;
        const type = select.classList.contains('merit-dropdown') ? 'merit' : 'flaw';
        const addBtn = this.element.querySelector(`#add${this.capitalizeFirst(type)}Btn`);
        addBtn.disabled = !select.value;
    }

    /**
     * Handle adding a trait
     * @param {Event} event - Click event
     */
    handleAddTrait(event) {
        const type = event.target.id.includes('Merit') ? 'merit' : 'flaw';
        const select = this.element.querySelector(`#${type}Select`);
        const traitKey = select.value;
        const categoryKey = select.querySelector('option:selected').getAttribute('data-category');
        
        if (traitKey && categoryKey) {
            this.addTrait(type, traitKey, categoryKey);
        }
    }

    /**
     * Handle removing a trait
     * @param {Event} event - Click event
     */
    handleRemoveTrait(event) {
        const button = event.target.closest('.remove-merit-btn, .remove-flaw-btn');
        const type = button.classList.contains('remove-merit-btn') ? 'merit' : 'flaw';
        const traitKey = button.getAttribute(`data-${type}`);
        const instanceIndex = parseInt(button.getAttribute('data-instance'));
        this.removeTrait(type, traitKey, instanceIndex);
    }

    /**
     * Handle dot click for trait level
     * @param {Event} event - Click event
     */
    handleDotClick(event) {
        // Check if character sheet is locked
        if (window.LockManager && window.LockManager.isLocked && window.LockManager.isLocked()) {
            return;
        }
        
        const dot = event.target;
        const dotsContainer = dot.closest('.dots');
        const type = dotsContainer.hasAttribute('data-merit') ? 'merit' : 'flaw';
        const traitKey = dotsContainer.getAttribute(`data-${type}`);
        const instanceIndex = parseInt(dotsContainer.getAttribute('data-instance'));
        const currentLevel = parseInt(dotsContainer.getAttribute('data-value') || '0');
        const clickedValue = parseInt(dot.getAttribute('data-value'));
        
        let newLevel;
        
        // If clicking the last filled dot, decrease by 1
        if (clickedValue === currentLevel) {
            newLevel = clickedValue - 1;
        }
        // If clicking an empty dot, fill up to that value
        else if (clickedValue > currentLevel) {
            newLevel = clickedValue;
        }
        // If clicking a filled dot, set to that value
        else {
            newLevel = clickedValue;
        }
        
        // Update trait level
        this.updateTraitInstanceLevel(type, traitKey, instanceIndex, newLevel);
    }

    /**
     * Update trait dropdown based on category selection
     * @param {string} categoryKey - Category key
     * @param {string} type - Trait type ('merit' or 'flaw')
     */
    updateTraitDropdown(categoryKey, type) {
        const traitSelect = this.element.querySelector(`#${type}Select`);
        const addBtn = this.element.querySelector(`#add${this.capitalizeFirst(type)}Btn`);
        
        if (!categoryKey) {
            traitSelect.innerHTML = `<option value="">Select a ${type === 'merit' ? 'Merit' : 'Flaw'}</option>`;
            traitSelect.disabled = true;
            addBtn.disabled = true;
            return;
        }
        
        const options = this.getTraitOptions(categoryKey, type);
        traitSelect.innerHTML = `<option value="">Select a ${type === 'merit' ? 'Merit' : 'Flaw'}</option>${options}`;
        traitSelect.disabled = false;
        addBtn.disabled = true;
        
        // Re-initialize tooltips for new options
        this.initTooltips();
    }

    /**
     * Add trait
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} traitKey - Trait key
     * @param {string} categoryKey - Category key
     */
    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const category = this.meritsData[categoryKey];
        const trait = category[type + 's'][traitKey];
        
        if (!trait) return;
        
        const dotsInfo = this.parseDotsNotation(trait.dots);
        const initialLevel = dotsInfo.minDots || 1;
        
        // Check if trait already exists
        if (selectedTraits.has(traitKey)) {
            const existingTrait = selectedTraits.get(traitKey);
            
            // Check if trait allows multiple instances
            if (!dotsInfo.allowMultiple) {
                this.showFeedback(`${type === 'merit' ? 'Merit' : 'Flaw'} already selected`, 'warning');
                return;
            }
            
            // Add new instance
            if (!existingTrait.instances) {
                existingTrait.instances = [{ level: existingTrait.level }];
            }
            existingTrait.instances.push({ level: initialLevel });
        } else {
            // Add new trait
            selectedTraits.set(traitKey, {
                category: categoryKey,
                level: initialLevel,
                instances: [{ level: initialLevel }]
            });
        }
        
        // Reset selectors
        const categorySelect = this.element.querySelector(`#${type}CategorySelect`);
        const traitSelect = this.element.querySelector(`#${type}Select`);
        const addBtn = this.element.querySelector(`#add${this.capitalizeFirst(type)}Btn`);
        
        categorySelect.value = '';
        traitSelect.innerHTML = `<option value="">Select a ${type === 'merit' ? 'Merit' : 'Flaw'}</option>`;
        traitSelect.disabled = true;
        addBtn.disabled = true;
        
        // Update display
        this.updateTraitDisplay(type, traitKey);
        this.updatePointSummary();
        
        // Emit change event
        this.emit(`${type}Added`, {
            traitKey: traitKey,
            categoryKey: categoryKey,
            level: initialLevel,
            data: this.getTraitData(type, traitKey)
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Remove trait
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} traitKey - Trait key
     * @param {number} instanceIndex - Instance index
     */
    removeTrait(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        
        if (!selectedTraits.has(traitKey)) return;
        
        const traitData = selectedTraits.get(traitKey);
        
        if (instanceIndex !== null && traitData.instances && traitData.instances.length > 1) {
            // Remove specific instance
            traitData.instances.splice(instanceIndex, 1);
            
            // Update level to highest remaining instance
            traitData.level = Math.max(...traitData.instances.map(inst => inst.level));
        } else {
            // Remove entire trait
            selectedTraits.delete(traitKey);
        }
        
        // Update display
        this.updateTraitDisplay(type, traitKey);
        this.updatePointSummary();
        
        // Emit change event
        this.emit(`${type}Removed`, {
            traitKey: traitKey,
            instanceIndex: instanceIndex
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Update trait instance level
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} traitKey - Trait key
     * @param {number} instanceIndex - Instance index
     * @param {number} newLevel - New level
     */
    updateTraitInstanceLevel(type, traitKey, instanceIndex, newLevel) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        
        if (!selectedTraits.has(traitKey)) return;
        
        const traitData = selectedTraits.get(traitKey);
        const category = this.meritsData[traitData.category];
        const trait = category[type + 's'][traitKey];
        const dotsInfo = this.parseDotsNotation(trait.dots);
        
        // Validate level
        newLevel = Math.max(dotsInfo.minDots || 1, Math.min(dotsInfo.maxDots || 5, newLevel));
        
        if (traitData.instances && traitData.instances[instanceIndex]) {
            traitData.instances[instanceIndex].level = newLevel;
            // Update overall level to highest instance
            traitData.level = Math.max(...traitData.instances.map(inst => inst.level));
        } else {
            traitData.level = newLevel;
        }
        
        // Update display
        this.updateTraitDisplay(type, traitKey);
        this.updatePointSummary();
        
        // Emit change event
        this.emit(`${type}LevelChanged`, {
            traitKey: traitKey,
            instanceIndex: instanceIndex,
            oldLevel: traitData.level,
            newLevel: newLevel,
            data: this.getTraitData(type, traitKey)
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Update trait display
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} traitKey - Trait key
     * @param {number} instanceIndex - Instance index
     */
    updateTraitDisplay(type, traitKey, instanceIndex = null) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        const traitsList = this.element.querySelector(`#${type}sList`);
        
        if (!traitsList) return;
        
        // Re-render entire list to handle instance changes
        traitsList.innerHTML = selectedTraits.size === 0 ? 
            `<div class="fst-italic">No ${type}s selected</div>` : 
            this.getSelectedTraitsHtml(type, selectedTraits);
        
        // Re-initialize tooltips
        this.initTooltips();
    }

    /**
     * Update overall display
     */
    updateDisplay() {
        this.renderMeritManager();
        this.renderFlawManager();
        this.updatePointSummary();
        this.initTooltips();
    }

    /**
     * Update point summary
     */
    updatePointSummary() {
        const totalMeritPoints = this.getTotalMeritPoints();
        const totalFlawPoints = this.getTotalFlawPoints();
        const netPoints = totalMeritPoints - totalFlawPoints;
        
        const meritPointsElement = this.element.querySelector('#totalMeritPoints');
        const flawPointsElement = this.element.querySelector('#totalFlawPoints');
        const netPointsElement = this.element.querySelector('#netPoints');
        
        if (meritPointsElement) meritPointsElement.textContent = totalMeritPoints;
        if (flawPointsElement) flawPointsElement.textContent = totalFlawPoints;
        if (netPointsElement) {
            netPointsElement.textContent = netPoints;
            netPointsElement.className = netPoints >= 0 ? 'text-success' : 'text-danger';
        }
    }

    /**
     * Set locked state
     * @param {boolean} locked - Whether traits should be locked
     */
    setLocked(locked) {
        const buttons = this.element.querySelectorAll('.btn');
        const dots = this.element.querySelectorAll('.dot');
        const selects = this.element.querySelectorAll('select');
        
        buttons.forEach(btn => {
            btn.style.pointerEvents = locked ? 'none' : 'auto';
            btn.disabled = locked;
        });
        
        dots.forEach(dot => {
            dot.style.pointerEvents = locked ? 'none' : 'auto';
        });
        
        selects.forEach(select => {
            select.disabled = locked;
        });
    }

    /**
     * Auto-save character data
     */
    autoSave() {
        if (window.characterManager && typeof window.characterManager.saveCharacter === 'function') {
            // Debounce auto-save
            clearTimeout(this.autoSaveTimeout);
            this.autoSaveTimeout = setTimeout(() => {
                window.characterManager.saveCharacter();
            }, 1000);
        }
    }

    /**
     * Update component with character data
     * @param {Object} data - Character data
     */
    update(data) {
        if (data.merits) {
            this.loadMeritsAndFlaws(data.merits, data.flaws || {});
        }
    }

    /**
     * Load merits and flaws from data
     * @param {Object} meritsData - Merits data
     * @param {Object} flawsData - Flaws data
     */
    loadMeritsAndFlaws(meritsData, flawsData) {
        // Clear existing data
        this.selectedMerits.clear();
        this.selectedFlaws.clear();
        
        // Load merits
        Object.entries(meritsData).forEach(([traitKey, traitData]) => {
            this.selectedMerits.set(traitKey, {
                category: traitData.category,
                level: traitData.level || 1,
                instances: traitData.instances || [{ level: traitData.level || 1 }]
            });
        });
        
        // Load flaws
        Object.entries(flawsData).forEach(([traitKey, traitData]) => {
            this.selectedFlaws.set(traitKey, {
                category: traitData.category,
                level: traitData.level || 1,
                instances: traitData.instances || [{ level: traitData.level || 1 }]
            });
        });
        
        // Update display
        this.updateDisplay();
    }

    /**
     * Initialize tooltips
     */
    initTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = this.element.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }

    /**
     * Show feedback message
     * @param {string} message - Message to show
     * @param {string} type - Message type
     */
    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Get current trait data
     * @returns {Object} Trait data
     */
    getData() {
        const meritsData = {};
        const flawsData = {};
        
        this.selectedMerits.forEach((data, key) => {
            meritsData[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances
            };
        });
        
        this.selectedFlaws.forEach((data, key) => {
            flawsData[key] = {
                category: data.category,
                level: data.level,
                instances: data.instances
            };
        });
        
        return {
            merits: meritsData,
            flaws: flawsData
        };
    }

    /**
     * Get trait data for a specific trait
     * @param {string} type - Trait type ('merit' or 'flaw')
     * @param {string} traitKey - Trait key
     * @returns {Object} Trait data
     */
    getTraitData(type, traitKey) {
        const selectedTraits = type === 'merit' ? this.selectedMerits : this.selectedFlaws;
        
        if (!selectedTraits.has(traitKey)) return null;
        
        const data = selectedTraits.get(traitKey);
        return {
            category: data.category,
            level: data.level,
            instances: data.instances
        };
    }

    /**
     * Get selected merits
     * @returns {Map} Map of selected merits
     */
    getSelectedMerits() {
        return new Map(this.selectedMerits);
    }

    /**
     * Get selected flaws
     * @returns {Map} Map of selected flaws
     */
    getSelectedFlaws() {
        return new Map(this.selectedFlaws);
    }

    /**
     * Get merit level
     * @param {string} meritKey - Merit key
     * @returns {number} Merit level
     */
    getMeritLevel(meritKey) {
        if (!this.selectedMerits.has(meritKey)) return 0;
        return this.selectedMerits.get(meritKey).level;
    }

    /**
     * Get flaw level
     * @param {string} flawKey - Flaw key
     * @returns {number} Flaw level
     */
    getFlawLevel(flawKey) {
        if (!this.selectedFlaws.has(flawKey)) return 0;
        return this.selectedFlaws.get(flawKey).level;
    }

    /**
     * Get total merit points
     * @returns {number} Total merit points
     */
    getTotalMeritPoints() {
        let total = 0;
        this.selectedMerits.forEach((traitData, traitKey) => {
            const category = this.meritsData[traitData.category];
            const trait = category.merits[traitKey];
            const dotsInfo = this.parseDotsNotation(trait.dots);
            
            if (traitData.instances) {
                traitData.instances.forEach(instance => {
                    total += this.calculatePointCost(instance.level, dotsInfo);
                });
            } else {
                total += this.calculatePointCost(traitData.level, dotsInfo);
            }
        });
        return total;
    }

    /**
     * Get total flaw points
     * @returns {number} Total flaw points
     */
    getTotalFlawPoints() {
        let total = 0;
        this.selectedFlaws.forEach((traitData, traitKey) => {
            const category = this.meritsData[traitData.category];
            const trait = category.flaws[traitKey];
            const dotsInfo = this.parseDotsNotation(trait.dots);
            
            if (traitData.instances) {
                traitData.instances.forEach(instance => {
                    total += this.calculatePointCost(instance.level, dotsInfo);
                });
            } else {
                total += this.calculatePointCost(traitData.level, dotsInfo);
            }
        });
        return total;
    }

    /**
     * Export merits and flaws data
     * @returns {Object} Exported data
     */
    exportMeritsAndFlaws() {
        return this.getData();
    }

    // Utility methods
    calculatePointCost(level, dotsInfo) {
        if (dotsInfo.fixedCost !== undefined) {
            return dotsInfo.fixedCost;
        }
        
        // Calculate based on level and dots notation
        if (dotsInfo.costPerDot) {
            return level * dotsInfo.costPerDot;
        }
        
        return level;
    }

    parseDotsNotation(dotsString) {
        if (!dotsString) return { minDots: 1, maxDots: 5, allowMultiple: false };
        
        const result = {
            minDots: 1,
            maxDots: 5,
            allowMultiple: false,
            fixedCost: undefined,
            costPerDot: 1
        };
        
        // Handle fixed cost notation like "(••)"
        if (dotsString.startsWith('(') && dotsString.endsWith(')')) {
            result.fixedCost = dotsString.match(/•/g).length;
            result.minDots = result.maxDots = result.fixedCost;
            return result;
        }
        
        // Handle range notation like "• - ••"
        const rangeMatch = dotsString.match(/(•+)\s*-\s*(•+)/);
        if (rangeMatch) {
            result.minDots = rangeMatch[1].length;
            result.maxDots = rangeMatch[2].length;
            result.allowMultiple = true;
            return result;
        }
        
        // Handle single level notation like "••"
        const dotsMatch = dotsString.match(/•+/);
        if (dotsMatch) {
            result.minDots = result.maxDots = dotsMatch[0].length;
            return result;
        }
        
        return result;
    }

    getDotsMeta(dotsInfo, type) {
        const maxDots = dotsInfo.maxDots || 5;
        const traitTypeClass = type === 'merit' ? 'merit-dots' : 'flaw-dots';
        const tooltipText = `${type === 'merit' ? 'Merit' : 'Flaw'} Level: ${dotsInfo.minDots || 1}-${maxDots}`;
        
        return { maxDots, traitTypeClass, tooltipText };
    }

    getDotsTooltipText(dotsInfo, type) {
        const { minDots, maxDots, fixedCost } = dotsInfo;
        
        if (fixedCost !== undefined) {
            return `${type === 'merit' ? 'Merit' : 'Flaw'} Cost: ${fixedCost} points`;
        }
        
        if (minDots === maxDots) {
            return `${type === 'merit' ? 'Merit' : 'Flaw'} Level: ${minDots}`;
        }
        
        return `${type === 'merit' ? 'Merit' : 'Flaw'} Level: ${minDots}-${maxDots}`;
    }

    findTraitCategory(traitKey, type) {
        for (const [categoryKey, category] of Object.entries(this.meritsData)) {
            if (category[type + 's'] && category[type + 's'][traitKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    camelToTitle(str) {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    createDots(value, maxDots = 5) {
        let dotsHtml = '';
        for (let i = 0; i < maxDots; i++) {
            dotsHtml += `<div class="dot${i < value ? ' filled' : ''}" data-value="${i + 1}"></div>`;
        }
        return dotsHtml;
    }
}

// Attach to global scope for dynamic loading
window.MeritsFlawsPanel = MeritsFlawsPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MeritsFlawsPanel;
} 