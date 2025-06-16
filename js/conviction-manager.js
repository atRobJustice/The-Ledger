class ConvictionManager {
    constructor() {
        this.convictions = [];
        this.maxConvictions = 3;
        this.initializeEventListeners();
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
            alert('Maximum number of active convictions reached (3)');
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
            });
        });
        
        // Then populate the data and trigger resize
        convictions.forEach((conviction, index) => {
            const convictionId = this.convictions[index].id;
            const $conviction = $(`[data-id="${convictionId}"]`);
            
            // Set values and trigger input event for auto-resize
            $conviction.find('.conviction-description').val(conviction.description || '').trigger('input');
            $conviction.find('.touchstone-name').val(conviction.touchstone?.name || '').trigger('input');
            $conviction.find('.touchstone-relationship').val(conviction.touchstone?.relationship || '').trigger('input');
            $conviction.find('.touchstone-summary').val(conviction.touchstone?.summary || '').trigger('input');
            $conviction.find(`#touchstone-lost-${convictionId}`).prop('checked', conviction.touchstone?.lost || false);
            
            // Force a resize after a short delay to ensure content is rendered
            setTimeout(() => {
                $conviction.find('textarea').each(function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
            }, 0);
        });
    }
}

// Initialize the conviction manager
const convictionManager = new ConvictionManager();

// Add to window for global access
window.convictionManager = convictionManager; 