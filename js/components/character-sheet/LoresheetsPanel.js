/**
 * LoresheetsPanel - Character loresheets panel component
 * Extends BaseComponent and integrates with loresheet-manager.js for comprehensive loresheet management
 */
class LoresheetsPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.selectedLoresheets = new Map(); // loresheetKey -> { category: string, level: number, instances: Array }
        this.availableCategories = [];
        this.loresheetsData = null;
    }

    async onInit() {
        await this.loadLoresheetsData();
        this.availableCategories = Object.keys(this.loresheetsData.categories);
        
        // Wait for loresheet manager to be available and set up component mode
        await this._waitForLoresheetManager();
    }

    /**
     * Wait for loresheet manager to be available
     */
    async _waitForLoresheetManager() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.loresheetManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.loresheetManager) {
            throw new Error('Loresheet Manager not available');
        }

        // Set up component mode for loresheet manager
        if (typeof window.loresheetManager.setComponentMode === 'function') {
            window.loresheetManager.setComponentMode(this);
        }
    }

    render() {
        return `
            <div class="loresheets-panel">
                <h5 class="mb-2">Loresheets</h5>
                <div class="ledger p-3 my-3">
                    <div class="loresheets-container"></div>
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.renderLoresheetManager();
        this.bindEventListeners();
        this.initTooltips();
    }

    async loadLoresheetsData() {
        try {
            const module = await import('../../references/loresheets.js');
            this.loresheetsData = module.loresheets;
        } catch (error) {
            console.error('Failed to load loresheets data:', error);
            this.loresheetsData = { categories: {} };
        }
    }

    renderLoresheetManager() {
        const container = this.element.querySelector('.loresheets-container');
        if (!container) return;
        container.innerHTML = '';
        this.renderLoresheetSection(container);
    }

    renderLoresheetSection(container) {
        this.renderLoresheetSelector(container);
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
        container.insertAdjacentHTML('beforeend', selectorHtml);
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
        container.insertAdjacentHTML('beforeend', selectedHtml);
    }

    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = this.loresheetsData.categories[categoryKey];
                return `<option value="${categoryKey}">${category.name}</option>`;
            })
            .join('');
    }

    // ... (other methods for loresheet options, add/remove, dot click, event emission, benefit tracking, etc.)
}

// Attach to global scope for dynamic loading
window.LoresheetsPanel = LoresheetsPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoresheetsPanel;
} 