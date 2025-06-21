// Conviction Manager with Component Architecture Integration
class ConvictionManager {
    constructor() {
        this.convictions = [];
        this.maxConvictions = 3;
        this.eventListeners = new Map();
        this.isComponentMode = false;
        this.parentComponent = null;
        this.initializeEventListeners();
    }

    /**
     * Set component mode and parent component
     */
    setComponentMode(parentComponent) {
        this.isComponentMode = true;
        this.parentComponent = parentComponent;
        console.log('ConvictionManager: Component mode enabled');
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
                    console.error(`Error in conviction manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`conviction${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'ConvictionManager' }
        }));
    }

    initializeEventListeners() {
        $(document).on('click', '#add-conviction', (e) => {
            this.addConviction();
        });
        $(document).on('click', '.remove-conviction', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const convictionId = $(e.target).closest('.conviction-item').data('id');
            this.removeConviction(convictionId);
        });
        $(document).on('change', '.form-check-input', (e) => {
            this.updateAvailableSlots();
            this.emitConvictionUpdated();
        });
        $(document).on('input', '.conviction-description, .touchstone-name, .touchstone-relationship, .touchstone-summary', (e) => {
            this.emitConvictionUpdated();
        });
    }

    emitConvictionUpdated() {
        // Emit conviction updated event with current data
        this.emit('convictionUpdated', {
            convictions: this.saveConvictions()
        });
    }

    getActiveConvictions() {
        return this.convictions.filter(conviction => {
            const $conviction = $(`.conviction-item[data-id="${conviction.id}"]`);
            return !$conviction.find('.form-check-input').is(':checked');
        }).length;
    }

    updateAvailableSlots() {
        const activeConvictions = this.getActiveConvictions();
        const $addButton = $('#add-conviction');
        
        if (activeConvictions >= this.maxConvictions) {
            $addButton.prop('disabled', true);
            $addButton.attr('title', 'Maximum number of active convictions reached (3)');
        } else {
            $addButton.prop('disabled', false);
            $addButton.attr('title', 'Add a new conviction');
        }
    }

    addConviction() {
        const activeConvictions = this.getActiveConvictions();
        if (activeConvictions >= this.maxConvictions) {
            this.showFeedback('Maximum number of active convictions reached (3)', 'warning');
            return;
        }

        const convictionId = Date.now();
        const convictionHtml = `
            <div class="conviction-item ledger p-3 my-3" data-id="${convictionId}">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="mb-0">Conviction ${this.convictions.length + 1}</h5>
                    <button type="button" class="btn btn-sm btn-outline-danger remove-conviction">
                        <i class="bi bi-dash-circle"></i>
                    </button>
                </div>
                <div class="mb-3">
                    <label class="form-label">Conviction</label>
                    <textarea class="form-control bg-dark text-light conviction-description" rows="1"></textarea>
                </div>
                <div class="touchstone-details">
                    <h6 class="mb-2">Touchstone</h6>
                    <div class="mb-2">
                        <label class="form-label">Name</label>
                        <textarea class="form-control bg-dark text-light touchstone-name" rows="1"></textarea>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">Relationship</label>
                        <textarea class="form-control bg-dark text-light touchstone-relationship" rows="1"></textarea>
                    </div>
                    <div class="mb-2">
                        <label class="form-label">What they represent</label>
                        <textarea class="form-control bg-dark text-light touchstone-summary" rows="2"></textarea>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="touchstone-lost-${convictionId}">
                        <label class="form-check-label" for="touchstone-lost-${convictionId}">
                            Touchstone Lost
                        </label>
                    </div>
                </div>
            </div>`;
        
        // Add the new conviction to the appropriate column
        const columnIndex = this.convictions.length % 3;
        $(`#conviction-column-${columnIndex + 1}`).append(convictionHtml);
        
        // Add to our tracking array
        this.convictions.push({
            id: convictionId,
            column: columnIndex
        });
        
        // Set up auto-resize for the new textareas
        const $newConviction = $(`[data-id="${convictionId}"]`);
        $newConviction.find('textarea').each(function() {
            $(this).on('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
        });

        this.updateAvailableSlots();
        
        // Emit conviction added event
        this.emit('convictionAdded', {
            convictionId,
            convictionNumber: this.convictions.length
        });
    }

    removeConviction(id) {
        // Remove only the specific conviction
        const $conviction = $(`.conviction-item[data-id="${id}"]`);
        if ($conviction.length) {
            $conviction.remove();
            this.convictions = this.convictions.filter(c => c.id !== id);
            this.redistributeConvictions();
            this.updateConvictionNumbers();
            this.updateAvailableSlots();
            
            // Emit conviction removed event
            this.emit('convictionRemoved', {
                convictionId: id
            });
        }
    }

    redistributeConvictions() {
        // Store all convictions temporarily with their current order
        const convictions = [];
        this.convictions.forEach(conviction => {
            const $element = $(`.conviction-item[data-id="${conviction.id}"]`);
            if ($element.length) {
                convictions.push({
                    id: conviction.id,
                    element: $element.detach()
                });
            }
        });

        // Clear all columns
        $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
        
        // Redistribute remaining convictions in their original order
        convictions.forEach((conviction, index) => {
            const columnIndex = index % 3;
            const columnId = `conviction-column-${columnIndex + 1}`;
            $(`#${columnId}`).append(conviction.element);
        });
    }

    updateConvictionNumbers() {
        // Update numbers based on the convictions array order
        this.convictions.forEach((conviction, index) => {
            const $element = $(`.conviction-item[data-id="${conviction.id}"]`);
            if ($element.length) {
                $element.find('h5').text(`Conviction ${index + 1}`);
            }
        });
    }

    saveConvictions() {
        const savedConvictions = [];
        
        this.convictions.forEach(conviction => {
            const $conviction = $(`[data-id="${conviction.id}"]`);
            if ($conviction.length) {
                savedConvictions.push({
                    description: $conviction.find('.conviction-description').val() || '',
                    touchstone: {
                        name: $conviction.find('.touchstone-name').val() || '',
                        relationship: $conviction.find('.touchstone-relationship').val() || '',
                        summary: $conviction.find('.touchstone-summary').val() || '',
                        lost: $conviction.find('.form-check-input').prop('checked') || false
                    }
                });
            }
        });
        
        return savedConvictions;
    }

    loadConvictions(convictions) {
        if (!convictions || !Array.isArray(convictions)) {
            return;
        }
        
        // Clear all columns
        $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
        this.convictions = [];
        
        // First, create all conviction elements in order
        convictions.forEach((conviction, index) => {
            const convictionId = Date.now() + index; // Ensure unique IDs
            const convictionHtml = `
                <div class="conviction-item ledger p-3 my-3" data-id="${convictionId}">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h5 class="mb-0">Conviction ${index + 1}</h5>
                        <button type="button" class="btn btn-sm btn-outline-danger remove-conviction">
                            <i class="bi bi-dash-circle"></i>
                        </button>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Conviction</label>
                        <textarea class="form-control bg-dark text-light conviction-description" rows="1">${conviction.description || ''}</textarea>
                    </div>
                    <div class="touchstone-details">
                        <h6 class="mb-2">Touchstone</h6>
                        <div class="mb-2">
                            <label class="form-label">Name</label>
                            <textarea class="form-control bg-dark text-light touchstone-name" rows="1">${conviction.touchstone?.name || ''}</textarea>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Relationship</label>
                            <textarea class="form-control bg-dark text-light touchstone-relationship" rows="1">${conviction.touchstone?.relationship || ''}</textarea>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">What they represent</label>
                            <textarea class="form-control bg-dark text-light touchstone-summary" rows="2">${conviction.touchstone?.summary || ''}</textarea>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="touchstone-lost-${convictionId}" ${conviction.touchstone?.lost ? 'checked' : ''}>
                            <label class="form-check-label" for="touchstone-lost-${convictionId}">
                                Touchstone Lost
                            </label>
                        </div>
                    </div>
                </div>`;
            
            // Add to the appropriate column
            const columnIndex = index % 3;
            $(`#conviction-column-${columnIndex + 1}`).append(convictionHtml);
            
            // Add to our tracking array
            this.convictions.push({
                id: convictionId,
                column: columnIndex
            });
            
            // Set up auto-resize for the new textareas
            const $newConviction = $(`[data-id="${convictionId}"]`);
            $newConviction.find('textarea').each(function() {
                $(this).on('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
                // Trigger initial resize
                $(this).trigger('input');
            });
        });
        
        this.updateAvailableSlots();
        
        // Emit convictions loaded event
        this.emit('convictionsLoaded', {
            convictions: this.saveConvictions()
        });
    }

    /**
     * Component integration methods
     */
    getData() {
        return {
            convictions: this.saveConvictions()
        };
    }

    update(data) {
        if (data.convictions) {
            this.loadConvictions(data.convictions);
        }
    }

    clear() {
        // Clear all columns
        $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
        this.convictions = [];
        this.updateAvailableSlots();
        
        // Emit convictions cleared event
        this.emit('convictionsCleared');
    }

    setLockState(isLocked) {
        const $addBtn = $('#add-conviction');
        const $removeBtns = $('.remove-conviction');
        const $textareas = $('.conviction-description, .touchstone-name, .touchstone-relationship, .touchstone-summary');
        const $checkboxes = $('.form-check-input');

        if (isLocked) {
            $addBtn.prop('disabled', true);
            $removeBtns.prop('disabled', true);
            $textareas.prop('readonly', true);
            $checkboxes.prop('disabled', true);
        } else {
            $addBtn.prop('disabled', false);
            $removeBtns.prop('disabled', false);
            $textareas.prop('readonly', false);
            $checkboxes.prop('disabled', false);
            this.updateAvailableSlots(); // Re-evaluate based on current state
        }
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'Conviction Manager');
        } else {
            console.log(`[ConvictionManager] ${type.toUpperCase()}: ${message}`);
        }
    }
}

// Create and export the conviction manager instance
const convictionManager = new ConvictionManager();

// Add to window for global access
window.convictionManager = convictionManager;

// Remove ES6 export - use traditional script loading
// export default convictionManager; 