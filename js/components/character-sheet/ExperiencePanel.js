/**
 * ExperiencePanel - Component for managing character experience points
 * Integrates with xp-manager.js and xp-spend-manager.js for data management
 */
class ExperiencePanel extends BaseComponent {
    constructor(id = 'experience-panel', config = {}) {
        super(id, {
            autoReRender: false,
            ...config
        });
        
        this.xpData = {
            total: 0,
            spent: 0,
            history: []
        };
        this.xpManager = null;
        this.isLocked = false;
    }

    /**
     * Initialize the component
     */
    async onInit() {
        // Wait for XP manager to be available
        await this._waitForXPManager();
        
        // Load initial XP data
        await this._loadXPData();
        
        // Set up event listeners for XP manager
        this._setupXPManagerListeners();
    }

    /**
     * Set up event listeners after rendering
     */
    async afterRender() {
        // Set up component-specific event listeners
        this._setupEventListeners();
        
        // Update UI with current data
        this._updateXPUI();
        
        // Set up XP spend modal if not already done
        this._ensureXPModals();
    }

    /**
     * Render the experience panel
     */
    render() {
        return `
            <div class="experience-panel">
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="mb-3">Experience Points</h3>
                        <div class="ledger p-3">
                            <div class="experience-container">
                                <div class="experience-status">
                                    <div class="status-item">
                                        <label>Total XP:</label>
                                        <span id="total-xp">0</span>
                                    </div>
                                    <div class="status-item">
                                        <label>Spent XP:</label>
                                        <span id="spent-xp">0</span>
                                    </div>
                                    <div class="status-item">
                                        <label>Available XP:</label>
                                        <span id="available-xp">0</span>
                                    </div>
                                </div>
                                <div class="experience-actions">
                                    <button id="award-xp" class="btn btn-success award-xp" ${this.isLocked ? 'disabled' : ''}>
                                        <i class="bi bi-plus-circle"></i> Award XP
                                    </button>
                                    <button id="spend-xp" class="btn btn-danger spend-xp" ${this.isLocked ? 'disabled' : ''}>
                                        <i class="bi bi-arrow-bar-up"></i> Spend XP
                                    </button>
                                    <button id="undo-xp" class="btn btn-warning" ${this.isLocked ? 'disabled' : ''}>
                                        <i class="bi bi-arrow-counterclockwise"></i> Undo
                                    </button>
                                </div>
                                <div class="experience-history mt-3">
                                    <h4>Experience History</h4>
                                    <ul id="experience-history" class="list-group"></ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Update the component with new data
     */
    async onUpdate(data) {
        if (data.xpData !== undefined) {
            this.xpData = data.xpData;
            this._updateXPUI();
        }
        
        if (data.isLocked !== undefined) {
            this.isLocked = data.isLocked;
            this._updateLockState();
        }
    }

    /**
     * Set up event listeners for the component
     */
    _setupEventListeners() {
        // Use event delegation for dynamic elements
        if (this.element) {
            // Award XP button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('#award-xp')) {
                    if (!this.isLocked) {
                        this._showAwardXPModal();
                    }
                }
            });

            // Spend XP button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('#spend-xp')) {
                    if (!this.isLocked) {
                        this._showSpendXPModal();
                    }
                }
            });

            // Undo XP button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('#undo-xp')) {
                    if (!this.isLocked && this.xpManager) {
                        const ok = this.xpManager.undoLast();
                        if (!ok) {
                            window.toastManager?.show('Nothing to undo', 'info');
                        } else {
                            this._emitXPChange();
                        }
                    }
                }
            });
        }
    }

    /**
     * Set up event listeners for XP manager
     */
    _setupXPManagerListeners() {
        if (!this.xpManager) return;

        // Listen for XP undo events
        document.addEventListener('xpUndo', (e) => {
            this._handleXPUndo(e.detail);
        });

        // Override XP manager's event listeners to work with our component
        this._overrideXPManagerListeners();
    }

    /**
     * Override XP manager's event listeners
     */
    _overrideXPManagerListeners() {
        // Remove existing listeners
        const awardBtn = document.getElementById('award-xp');
        const spendBtn = document.getElementById('spend-xp');
        const undoBtn = document.getElementById('undo-xp');

        if (awardBtn) {
            awardBtn.replaceWith(awardBtn.cloneNode(true));
        }
        if (spendBtn) {
            spendBtn.replaceWith(spendBtn.cloneNode(true));
        }
        if (undoBtn) {
            undoBtn.replaceWith(undoBtn.cloneNode(true));
        }

        // Re-attach listeners through our component
        this._setupEventListeners();
    }

    /**
     * Show award XP modal
     */
    _showAwardXPModal() {
        const modalEl = document.getElementById('xp-award-modal');
        if (!modalEl) {
            this._injectAwardXPModal();
        }
        
        const modal = new bootstrap.Modal(document.getElementById('xp-award-modal'));
        modal.show();
    }

    /**
     * Show spend XP modal
     */
    _showSpendXPModal() {
        const modalEl = document.getElementById('xp-spend-modal');
        if (!modalEl) {
            // The xp-spend-manager.js should handle this, but ensure it exists
            console.warn('XP spend modal not found - xp-spend-manager.js may not be loaded');
            return;
        }
        
        // Reset form controls
        this._resetSpendXPModal();
        
        // Refresh available XP display
        const availableEl = document.getElementById('xp-available');
        if (availableEl) {
            availableEl.textContent = this.xpManager?.getAvailableXP() ?? 0;
        }
        
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }

    /**
     * Reset spend XP modal
     */
    _resetSpendXPModal() {
        const catSelect = document.getElementById('xp-category');
        const traitSelect = document.getElementById('xp-trait');
        const levelContainer = document.getElementById('xp-level-container');
        const costInfo = document.getElementById('xp-cost-info');
        const confirmBtn = document.getElementById('xp-spend-confirm');
        const specCheckbox = document.getElementById('xp-add-specialty');
        const specContainer = document.getElementById('specialty-checkbox-container');

        if (catSelect) catSelect.value = '';
        if (traitSelect) {
            traitSelect.innerHTML = '<option value="" disabled selected>Select Trait</option>';
            traitSelect.disabled = true;
        }
        if (specCheckbox) specCheckbox.checked = false;
        if (specContainer) specContainer.classList.add('d-none');
        if (levelContainer) levelContainer.style.display = 'none';
        if (costInfo) {
            costInfo.style.display = 'none';
            const costSpanEl = document.getElementById('xp-cost');
            if (costSpanEl) costSpanEl.textContent = '0';
        }
        if (confirmBtn) confirmBtn.disabled = true;
    }

    /**
     * Inject award XP modal if not exists
     */
    _injectAwardXPModal() {
        if (document.getElementById('xp-award-modal')) return;
        
        const modal = `
            <div class="modal fade xp-modal" id="xp-award-modal" tabindex="-1" aria-labelledby="xpAwardModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="xpAwardModalLabel">Award Experience Points</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="xp-input-group mb-3">
                                <button class="btn xp-minus" id="xp-minus" type="button">-</button>
                                <input type="number" id="xp-input" class="form-control xp-input" value="1" min="1">
                                <button class="btn xp-plus" id="xp-plus" type="button">+</button>
                            </div>
                            <div class="mb-3 xp-quick-btns">
                                <button class="btn btn-outline-primary quick-xp" data-xp="3">3 XP</button>
                                <button class="btn btn-outline-primary quick-xp" data-xp="5">5 XP</button>
                                <button class="btn btn-outline-primary quick-xp" data-xp="10">10 XP</button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-success" id="xp-award-confirm">Award</button>
                        </div>
                    </div>
                </div>
            </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modal);
        this._setupAwardXPModalHandlers();
    }

    /**
     * Set up award XP modal handlers
     */
    _setupAwardXPModalHandlers() {
        const modal = document.getElementById('xp-award-modal');
        if (!modal) return;

        // XP input controls
        const xpInput = modal.querySelector('#xp-input');
        const minusBtn = modal.querySelector('#xp-minus');
        const plusBtn = modal.querySelector('#xp-plus');
        const confirmBtn = modal.querySelector('#xp-award-confirm');

        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                const current = parseInt(xpInput.value) || 1;
                xpInput.value = Math.max(1, current - 1);
            });
        }

        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                const current = parseInt(xpInput.value) || 1;
                xpInput.value = current + 1;
            });
        }

        // Quick XP buttons
        modal.querySelectorAll('.quick-xp').forEach(btn => {
            btn.addEventListener('click', () => {
                xpInput.value = btn.dataset.xp;
            });
        });

        // Confirm award
        if (confirmBtn) {
            confirmBtn.addEventListener('click', async () => {
                const amount = parseInt(xpInput.value) || 1;
                if (this.xpManager) {
                    await this.xpManager.awardXP(amount, 'Awarded via UI');
                    this._emitXPChange();
                }
                bootstrap.Modal.getInstance(modal).hide();
            });
        }
    }

    /**
     * Ensure XP modals are available
     */
    _ensureXPModals() {
        // Award XP modal
        if (!document.getElementById('xp-award-modal')) {
            this._injectAwardXPModal();
        }
        
        // Spend XP modal should be handled by xp-spend-manager.js
        if (!document.getElementById('xp-spend-modal')) {
            console.warn('XP spend modal not found - ensure xp-spend-manager.js is loaded');
        }
    }

    /**
     * Wait for XP manager to be available
     */
    async _waitForXPManager() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.xpManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.xpManager) {
            throw new Error('XP Manager not available');
        }

        this.xpManager = window.xpManager;
        
        // Set up component mode for XP manager
        if (typeof this.xpManager.setComponentMode === 'function') {
            this.xpManager.setComponentMode(this);
        }
    }

    /**
     * Load XP data from storage
     */
    async _loadXPData() {
        try {
            if (window.databaseManager) {
                const saved = await window.databaseManager.getSetting('xpData');
                if (saved) {
                    this.xpData = saved;
                    return;
                }
            }
            
            // No XP data found, use defaults
            this.xpData = { total: 0, spent: 0, history: [] };
        } catch (e) {
            console.error('Failed to load XP data:', e);
            this.xpData = { total: 0, spent: 0, history: [] };
        }
    }

    /**
     * Update XP UI
     */
    _updateXPUI() {
        const totalEl = document.getElementById('total-xp');
        const spentEl = document.getElementById('spent-xp');
        const availableEl = document.getElementById('available-xp');
        const historyEl = document.getElementById('experience-history');

        if (totalEl) totalEl.textContent = this.xpData.total;
        if (spentEl) spentEl.textContent = this.xpData.spent;
        if (availableEl) availableEl.textContent = this.xpData.total - this.xpData.spent;

        // Update history
        if (historyEl) {
            historyEl.innerHTML = '';
            this.xpData.history.slice().reverse().forEach(entry => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                const verb = entry.type === 'spend' || entry.type === 'spent' ? 'Spent' : 'Awarded';
                li.textContent = `[${entry.date}] ${verb} ${entry.amount} XP${entry.note ? ': ' + entry.note : ''}`;
                historyEl.appendChild(li);
            });
        }
    }

    /**
     * Update lock state of the component
     */
    _updateLockState() {
        const awardBtn = $(this.element).find('#award-xp');
        const spendBtn = $(this.element).find('#spend-xp');
        const undoBtn = $(this.element).find('#undo-xp');

        if (this.isLocked) {
            awardBtn.prop('disabled', true);
            spendBtn.prop('disabled', true);
            undoBtn.prop('disabled', true);
        } else {
            awardBtn.prop('disabled', false);
            spendBtn.prop('disabled', false);
            undoBtn.prop('disabled', false);
        }
    }

    /**
     * Handle XP undo event
     */
    _handleXPUndo(entry) {
        // Update local data
        if (entry.type === 'award') {
            this.xpData.total = Math.max(0, this.xpData.total - entry.amount);
        } else if (entry.type === 'spend' || entry.type === 'spent') {
            this.xpData.spent = Math.max(0, this.xpData.spent - entry.amount);
        }
        
        // Remove the last history entry
        this.xpData.history.pop();
        
        // Update UI
        this._updateXPUI();
        
        // Emit change event
        this._emitXPChange();
    }

    /**
     * Emit XP change event
     */
    _emitXPChange() {
        this.emit('xpChanged', { xpData: this.xpData });
    }

    /**
     * Get current XP data
     */
    getXPData() {
        return this.xpData;
    }

    /**
     * Load XP data
     */
    async loadXPData(xpData) {
        this.xpData = xpData || { total: 0, spent: 0, history: [] };
        this._updateXPUI();
        
        // Also update the global XP manager
        if (window.setXPData) {
            await window.setXPData(this.xpData);
        }
    }

    /**
     * Clear XP data
     */
    async clearXPData() {
        this.xpData = { total: 0, spent: 0, history: [] };
        this._updateXPUI();
        
        // Also update the global XP manager
        if (window.setXPData) {
            await window.setXPData(this.xpData);
        }
        
        this._emitXPChange();
    }

    /**
     * Award XP
     */
    async awardXP(amount, note = '') {
        if (this.xpManager) {
            await this.xpManager.awardXP(amount, note);
            this._emitXPChange();
        }
    }

    /**
     * Spend XP
     */
    async spendXP(amount, note = '') {
        if (this.xpManager) {
            const success = await this.xpManager.spendXP(amount, note);
            if (success) {
                this._emitXPChange();
            }
            return success;
        }
        return false;
    }

    /**
     * Get available XP
     */
    getAvailableXP() {
        return this.xpData.total - this.xpData.spent;
    }

    /**
     * Set lock state
     */
    setLockState(isLocked) {
        this.isLocked = isLocked;
        this._updateLockState();
    }

    /**
     * Clean up on destroy
     */
    async onDestroy() {
        // Remove XP undo event listener
        document.removeEventListener('xpUndo', this._handleXPUndo);
        
        // Remove component event listeners
        this._removeAllEventListeners();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExperiencePanel;
} else if (typeof window !== 'undefined') {
    window.ExperiencePanel = ExperiencePanel;
} 