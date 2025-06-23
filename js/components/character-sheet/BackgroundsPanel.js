/**
 * BackgroundsPanel - Character backgrounds panel component
 * Extends BaseComponent and integrates with background-manager.js for comprehensive background management
 */
class BackgroundsPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.selectedBackgrounds = new Map(); // backgroundKey -> { category: string, level: number, instances: Array }
        this.selectedBackgroundFlaws = new Map(); // flawKey -> { category: string, level: number, instances: Array }
        this.availableCategories = [];
        this.backgroundsData = null;
        this.coterieBackgroundsData = null;
    }

    async onInit() {
        await this.loadBackgroundsData();
        this.availableCategories = Object.keys(this.backgroundsData);
        
        // Wait for background manager to be available and set up component mode
        await this._waitForBackgroundManager();
    }

    /**
     * Wait for background manager to be available
     */
    async _waitForBackgroundManager() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.backgroundManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.backgroundManager) {
            throw new Error('Background Manager not available');
        }

        // Set up component mode for background manager
        if (typeof window.backgroundManager.setComponentMode === 'function') {
            window.backgroundManager.setComponentMode(this);
        }
    }

    render() {
        return `
            <div class="backgrounds-panel">
                <div class="row">
                    <div class="col-md-6">
                        <h5 class="mb-2">Backgrounds</h5>
                        <div class="ledger p-3 my-3">
                            <div class="backgrounds-container"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5 class="mb-2">Background Flaws</h5>
                        <div class="ledger p-3 my-3">
                            <div class="background-flaws-container"></div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="ledger p-3">
                            <div class="point-summary d-flex justify-content-between">
                                <div class="background-points">
                                    <strong>Background Points:</strong> <span id="totalBackgroundPoints">0</span>
                                </div>
                                <div class="background-flaw-points">
                                    <strong>Background Flaw Points:</strong> <span id="totalBackgroundFlawPoints">0</span>
                                </div>
                                <div class="net-background-points">
                                    <strong>Net Points:</strong> <span id="netBackgroundPoints">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.renderBackgroundManager();
        this.renderBackgroundFlawManager();
        this.bindEventListeners();
        this.initTooltips();
        this.updatePointSummary();
    }

    async loadBackgroundsData() {
        try {
            // Wait for backgrounds data to be available
            let attempts = 0;
            const maxAttempts = 50;
            
            while (!window.backgrounds && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (window.backgrounds) {
                this.backgroundsData = window.backgrounds;
            } else {
                console.error('Backgrounds data not available');
                this.backgroundsData = {};
            }
        } catch (error) {
            console.error('Failed to load backgrounds data:', error);
            this.backgroundsData = {};
        }
        
        try {
            // Wait for coterie backgrounds data to be available
            let attempts = 0;
            const maxAttempts = 50;
            
            while (!window.coterieBackgrounds && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (window.coterieBackgrounds) {
                this.coterieBackgroundsData = window.coterieBackgrounds;
            } else {
                this.coterieBackgroundsData = {};
            }
        } catch (error) {
            this.coterieBackgroundsData = {};
        }
    }

    renderBackgroundManager() {
        const container = this.element.querySelector('.backgrounds-container');
        if (!container) return;
        container.innerHTML = '';
        // You can expand this to support coterie backgrounds as well
        this.renderTraitSection(container, 'background', 'Backgrounds', this.selectedBackgrounds);
    }

    renderBackgroundFlawManager() {
        const container = this.element.querySelector('.background-flaws-container');
        if (!container) return;
        container.innerHTML = '';
        this.renderTraitSection(container, 'backgroundFlaw', 'Background Flaws', this.selectedBackgroundFlaws);
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
                    <button class="btn btn-success btn-sm" id="add${this.capitalizeFirst(type)}Btn" disabled>
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', selectorHtml);
    }

    renderSelectedTraits(container, type, selectedTraits) {
        const selectedHtml = `
            <div class="selected-${type}s">
                <div id="${type}sList" class="${type}s-list">
                    ${selectedTraits.size === 0 ? 
                        `<div class="fst-italic">No ${type === 'background' ? 'backgrounds' : 'background flaws'} selected</div>` : 
                        this.getSelectedTraitsHtml(type, selectedTraits)
                    }
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', selectedHtml);
    }

    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = this.backgroundsData[categoryKey];
                const displayName = category.name || this.camelToTitle(categoryKey);
                return `<option value="${categoryKey}">${displayName}</option>`;
            })
            .join('');
    }

    /**
     * Capitalize first letter of string
     * @param {string} str - Input string
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Convert camelCase to Title Case
     * @param {string} str - Input string
     * @returns {string} Title case string
     */
    camelToTitle(str) {
        return str.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // This method will be implemented when needed
        console.log('BackgroundsPanel bindEventListeners called');
    }

    /**
     * Initialize tooltips
     */
    initTooltips() {
        // This method will be implemented when needed
        console.log('BackgroundsPanel initTooltips called');
    }

    /**
     * Update point summary
     */
    updatePointSummary() {
        // This method will be implemented when needed
        console.log('BackgroundsPanel updatePointSummary called');
    }

    /**
     * Get selected traits HTML
     * @param {string} type - Trait type
     * @param {Map} selectedTraits - Selected traits map
     * @returns {string} HTML string
     */
    getSelectedTraitsHtml(type, selectedTraits) {
        // This method will be implemented when needed
        return '<div class="fst-italic">Implementation pending</div>';
    }
}

// Attach to global scope for dynamic loading
window.BackgroundsPanel = BackgroundsPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackgroundsPanel;
} 