/**
 * ConvictionsPanel - Component for managing character convictions and touchstones
 * Integrates with conviction-manager.js for data management
 */
class ConvictionsPanel extends BaseComponent {
    constructor(id = 'convictions-panel', config = {}) {
        super(id, {
            maxConvictions: 3,
            autoReRender: false,
            ...config
        });
        
        this.convictions = [];
        this.convictionManager = null;
        this.isLocked = false;
    }

    /**
     * Initialize the component
     */
    async onInit() {
        // Wait for conviction manager to be available
        await this._waitForConvictionManager();
        
        // Initialize convictions array
        this.convictions = this.convictionManager?.convictions || [];
        
        // Set up event listeners for conviction manager
        this._setupConvictionManagerListeners();
    }

    /**
     * Set up event listeners after rendering
     */
    async afterRender() {
        // Set up component-specific event listeners
        this._setupEventListeners();
        
        // Initialize conviction manager if not already done
        if (this.convictionManager) {
            this.convictionManager.updateAvailableSlots();
        }
        
        // Set up auto-resize for textareas
        this._setupAutoResize();
    }

    /**
     * Render the convictions panel
     */
    render() {
        return `
            <div class="convictions-panel">
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="mb-3">Convictions & Touchstones</h3>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <div class="col-md-4" id="conviction-column-1">
                                <!-- Convictions will be added here dynamically -->
                            </div>
                            <div class="col-md-4" id="conviction-column-2">
                                <!-- Convictions will be added here dynamically -->
                            </div>
                            <div class="col-md-4" id="conviction-column-3">
                                <!-- Convictions will be added here dynamically -->
                            </div>
                        </div>
                        <div class="text-end mt-3">
                            <button type="button" id="add-conviction" class="btn btn-sm btn-outline-danger" ${this.isLocked ? 'disabled' : ''}>
                                <i class="bi bi-plus-circle"></i> Add Conviction
                            </button>
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
        if (data.convictions !== undefined) {
            this.convictions = data.convictions;
            if (this.convictionManager) {
                this.convictionManager.loadConvictions(this.convictions);
            }
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
        // Add conviction button
        this.on('click', '#add-conviction', (e) => {
            if (!this.isLocked && this.convictionManager) {
                this.convictionManager.addConviction();
                this._emitConvictionChange();
            }
        });

        // Remove conviction button
        this.on('click', '.remove-conviction', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isLocked && this.convictionManager) {
                const convictionId = $(e.target).closest('.conviction-item').data('id');
                this.convictionManager.removeConviction(convictionId);
                this._emitConvictionChange();
            }
        });

        // Touchstone lost checkbox
        this.on('change', '.form-check-input', (e) => {
            if (this.convictionManager) {
                this.convictionManager.updateAvailableSlots();
                this._emitConvictionChange();
            }
        });

        // Conviction and touchstone text changes
        this.on('input', '.conviction-description, .touchstone-name, .touchstone-relationship, .touchstone-summary', (e) => {
            this._emitConvictionChange();
        });
    }

    /**
     * Set up event listeners for conviction manager
     */
    _setupConvictionManagerListeners() {
        if (!this.convictionManager) return;

        // Override conviction manager's event listeners to work with our component
        $(document).off('click', '#add-conviction');
        $(document).off('click', '.remove-conviction');
        $(document).off('change', '.form-check-input');

        // Re-attach event listeners to work with our component
        $(document).on('click', '#add-conviction', (e) => {
            if (!this.isLocked) {
                this.convictionManager.addConviction();
                this._emitConvictionChange();
            }
        });

        $(document).on('click', '.remove-conviction', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!this.isLocked) {
                const convictionId = $(e.target).closest('.conviction-item').data('id');
                this.convictionManager.removeConviction(convictionId);
                this._emitConvictionChange();
            }
        });

        $(document).on('change', '.form-check-input', (e) => {
            this.convictionManager.updateAvailableSlots();
            this._emitConvictionChange();
        });
    }

    /**
     * Set up auto-resize for textareas
     */
    _setupAutoResize() {
        $(this.element).find('textarea').each(function() {
            $(this).on('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });
    }

    /**
     * Wait for conviction manager to be available
     */
    async _waitForConvictionManager() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.convictionManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.convictionManager) {
            throw new Error('Conviction Manager not available');
        }

        this.convictionManager = window.convictionManager;
        
        // Set up component mode for conviction manager
        if (typeof this.convictionManager.setComponentMode === 'function') {
            this.convictionManager.setComponentMode(this);
        }
    }

    /**
     * Update lock state of the component
     */
    _updateLockState() {
        const addButton = $(this.element).find('#add-conviction');
        const removeButtons = $(this.element).find('.remove-conviction');
        const textareas = $(this.element).find('textarea');
        const checkboxes = $(this.element).find('.form-check-input');

        if (this.isLocked) {
            addButton.prop('disabled', true);
            removeButtons.prop('disabled', true);
            textareas.prop('readonly', true);
            checkboxes.prop('disabled', true);
        } else {
            addButton.prop('disabled', false);
            removeButtons.prop('disabled', false);
            textareas.prop('readonly', false);
            checkboxes.prop('disabled', false);
        }
    }

    /**
     * Emit conviction change event
     */
    _emitConvictionChange() {
        const convictions = this.convictionManager ? this.convictionManager.saveConvictions() : [];
        this.emit('convictionsChanged', { convictions });
    }

    /**
     * Get current convictions data
     */
    getConvictions() {
        return this.convictionManager ? this.convictionManager.saveConvictions() : [];
    }

    /**
     * Load convictions data
     */
    loadConvictions(convictions) {
        if (this.convictionManager && convictions) {
            this.convictionManager.loadConvictions(convictions);
            this.convictions = convictions;
        }
    }

    /**
     * Clear all convictions
     */
    clearConvictions() {
        if (this.convictionManager) {
            this.convictionManager.convictions = [];
            $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
            this._emitConvictionChange();
        }
    }

    /**
     * Get active convictions count
     */
    getActiveConvictionsCount() {
        return this.convictionManager ? this.convictionManager.getActiveConvictions() : 0;
    }

    /**
     * Check if can add more convictions
     */
    canAddConviction() {
        return this.getActiveConvictionsCount() < this.config.maxConvictions;
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
        // Remove conviction manager event listeners
        $(document).off('click', '#add-conviction');
        $(document).off('click', '.remove-conviction');
        $(document).off('change', '.form-check-input');
        
        // Remove component event listeners
        this._removeAllEventListeners();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConvictionsPanel;
} else if (typeof window !== 'undefined') {
    window.ConvictionsPanel = ConvictionsPanel;
} 