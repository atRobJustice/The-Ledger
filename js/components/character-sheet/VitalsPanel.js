/**
 * VitalsPanel - Character vitals panel component
 * Extends BaseComponent and manages character vitals with track boxes and impairment detection
 */
class VitalsPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.vitals = {
            health: {
                max: 4,
                current: 4,
                superficial: 0,
                aggravated: 0
            },
            willpower: {
                max: 2,
                current: 2,
                superficial: 0,
                aggravated: 0
            },
            hunger: {
                value: 1
            },
            humanity: {
                max: 7,
                current: 7,
                stained: 0
            },
            bloodPotency: {
                value: 1
            }
        };
        this.trackElements = new Map();
        this.impairmentStatus = {
            health: 'healthy',
            willpower: 'healthy',
            humanity: 'healthy'
        };
        
        // Bind methods
        this.handleTrackBoxClick = this.handleTrackBoxClick.bind(this);
        this.handleHungerDotClick = this.handleHungerDotClick.bind(this);
        this.createTrackBoxes = this.createTrackBoxes.bind(this);
        this.createDots = this.createDots.bind(this);
        this.evaluateImpairmentStatus = this.evaluateImpairmentStatus.bind(this);
        this.updateCurrentValue = this.updateCurrentValue.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Load blood potency reference data
        await this.loadBloodPotencyData();
    }

    /**
     * Render the vitals panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="vitals-panel">
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="mb-3">Vitals</h3>
                    </div>
                    
                    <!-- Left Column -->
                    <div class="col-md-4 d-flex flex-column">
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-vital="health">
                                <span class="stat-label">Health</span>
                                <span class="vital-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-vital="bloodPotency">
                                <span class="stat-label">Blood Potency</span>
                                <span class="vital-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Middle Column -->
                    <div class="col-md-4 d-flex flex-column">
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-vital="willpower">
                                <span class="stat-label">Willpower</span>
                                <span class="vital-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-vital="hunger">
                                <span class="stat-label">Hunger</span>
                                <span class="vital-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column -->
                    <div class="col-md-4 d-flex flex-column">
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-vital="humanity">
                                <span class="stat-label">Humanity</span>
                                <span class="vital-value"></span>
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
        // Initialize vital elements
        this.initializeVitals();
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Evaluate initial impairment status
        this.evaluateImpairmentStatus();
    }

    /**
     * Load blood potency reference data
     */
    async loadBloodPotencyData() {
        try {
            const module = await import('../../references/blood_potency.js');
            this.bloodPotencyData = module.bloodPotency;
        } catch (error) {
            console.error('Failed to load blood potency data:', error);
            this.bloodPotencyData = {};
        }
    }

    /**
     * Initialize vital elements and create appropriate displays
     */
    initializeVitals() {
        const vitalElements = this.element.querySelectorAll('[data-vital]');
        
        vitalElements.forEach(vitalElement => {
            const vitalName = vitalElement.getAttribute('data-vital');
            const valueSpan = vitalElement.querySelector('.vital-value');
            
            if (!valueSpan) return;
            
            let displayElement;
            
            if (vitalName === 'health' || vitalName === 'willpower' || vitalName === 'humanity') {
                // Create track boxes for health, willpower, and humanity
                const vitalData = this.vitals[vitalName];
                displayElement = this.createTrackBoxes(
                    vitalData.max,
                    vitalData.current,
                    vitalData.superficial || 0,
                    vitalData.aggravated || 0,
                    vitalName
                );
            } else if (vitalName === 'hunger') {
                // Create dots for hunger (always editable)
                const vitalData = this.vitals[vitalName];
                displayElement = this.createDots(vitalData.value, 5);
                displayElement.classList.remove('lockable-dot');
                displayElement.classList.add('hunger-dots');
            } else if (vitalName === 'bloodPotency') {
                // Create dots for blood potency
                const vitalData = this.vitals[vitalName];
                displayElement = this.createDots(vitalData.value, 5);
            }
            
            // Replace the span with the display element
            valueSpan.replaceWith(displayElement);
            
            // Store reference to the display element
            this.trackElements.set(vitalName, {
                element: displayElement,
                statElement: vitalElement
            });
        });
    }

    /**
     * Create track boxes for health, willpower, and humanity
     * @param {number} maxValue - Maximum value
     * @param {number} currentValue - Current value
     * @param {number} superficial - Superficial damage
     * @param {number} aggravated - Aggravated damage
     * @param {string} type - Track type
     * @returns {HTMLElement} Track container element
     */
    createTrackBoxes(maxValue, currentValue = 0, superficial = 0, aggravated = 0, type = 'health') {
        const container = document.createElement('div');
        container.className = 'track-container';
        container.setAttribute('data-type', type);
        
        const header = document.createElement('div');
        header.className = 'track-header';
        header.innerHTML = `<span>Current: ${currentValue}</span><span>Max: ${maxValue}</span>`;
        container.appendChild(header);
        
        const boxes = document.createElement('div');
        boxes.className = 'track-boxes';
        boxes.setAttribute('data-type', type);
        
        let boxValue = 10;
        if (type !== 'humanity') {
            boxValue = currentValue;
        }
        
        // Create boxes based on boxValue
        for (let i = 0; i < boxValue; i++) {
            const box = document.createElement('div');
            box.className = 'track-box';
            
            if (type === 'humanity') {
                // For Humanity, fill boxes from left to right based on current value
                if (i < currentValue) {
                    box.classList.add('filled');
                }
                // Handle staining for any remaining boxes
                if (i >= currentValue && i < currentValue + (this.vitals.humanity.stained || 0)) {
                    box.classList.add('stained');
                }
            } else {
                // For Health and Willpower, handle superficial and aggravated damage
                if (i < aggravated) {
                    box.classList.add('aggravated');
                } else if (i < aggravated + superficial) {
                    box.classList.add('superficial');
                }
            }
            
            // Add click handler
            box.addEventListener('click', (e) => {
                this.handleTrackBoxClick(e, boxes, type, maxValue);
            });
            
            boxes.appendChild(box);
        }
        
        container.appendChild(boxes);
        return container;
    }

    /**
     * Create dots for hunger and blood potency
     * @param {number} value - Current value
     * @param {number} maxDots - Maximum number of dots
     * @returns {HTMLElement} Dots container element
     */
    createDots(value, maxDots = 5) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots lockable-dot';
        dotsContainer.setAttribute('data-value', value);
        
        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = `dot${i < value ? ' filled' : ''}`;
            dot.setAttribute('data-value', i + 1);
            
            // Add click handler
            dot.addEventListener('click', (e) => {
                this.handleHungerDotClick(e, dotsContainer);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        return dotsContainer;
    }

    /**
     * Handle track box click events
     * @param {Event} event - Click event
     * @param {HTMLElement} boxes - Track boxes container
     * @param {string} type - Track type
     * @param {number} maxValue - Maximum value
     */
    handleTrackBoxClick(event, boxes, type, maxValue) {
        // Check if character sheet is locked (except for hunger)
        if (window.LockManager && window.LockManager.isLocked && window.LockManager.isLocked()) {
            return;
        }
        
        const clickedBox = event.target;
        const allBoxes = boxes.querySelectorAll('.track-box');
        const clickedIndex = Array.from(allBoxes).indexOf(clickedBox);
        
        if (type === 'humanity') {
            this.handleHumanityBoxClick(clickedBox, allBoxes, clickedIndex);
        } else {
            this.handleHealthWillpowerBoxClick(clickedBox, allBoxes, clickedIndex, maxValue);
        }
        
        // Update current value and evaluate impairment
        this.updateCurrentValue(boxes);
        this.evaluateImpairmentStatus();
        
        // Emit change event
        this.emit('vitalChanged', {
            type: type,
            data: this.getVitalData(type)
        });
        
        // Auto-save if character manager is available
        this.autoSave();
    }

    /**
     * Handle humanity track box clicks
     * @param {HTMLElement} clickedBox - Clicked box element
     * @param {NodeList} allBoxes - All track boxes
     * @param {number} clickedIndex - Index of clicked box
     */
    handleHumanityBoxClick(clickedBox, allBoxes, clickedIndex) {
        const currentFilled = Array.from(allBoxes).filter(box => box.classList.contains('filled')).length;
        const currentStained = Array.from(allBoxes).filter(box => box.classList.contains('stained')).length;
        const clickedIndexOneBased = clickedIndex + 1;
        
        if (clickedBox.classList.contains('filled')) {
            if (clickedIndexOneBased === currentFilled) {
                clickedBox.classList.remove('filled');
            } else if (clickedIndexOneBased < currentFilled) {
                Array.from(allBoxes).slice(clickedIndex).forEach(box => box.classList.remove('filled'));
            } else if (clickedIndexOneBased === 1) {
                clickedBox.classList.remove('filled');
            }
        } else if (clickedBox.classList.contains('stained')) {
            if (clickedIndexOneBased === 1) {
                clickedBox.classList.remove('stained').addClass('filled');
            } else if (clickedIndexOneBased === 10) {
                if (currentFilled === 9) {
                    clickedBox.classList.remove('stained').addClass('filled');
                } else if (clickedIndexOneBased === (10 - (currentStained - 1))) {
                    clickedBox.classList.remove('stained');
                } else if (clickedIndexOneBased > (10 - (currentStained - 1))) {
                    for (let i = clickedIndex - 1; i >= 0; i--) {
                        allBoxes[i].classList.remove('stained');
                    }
                }
            } else if (clickedIndexOneBased === (10 - (currentStained - 1))) {
                if (clickedIndexOneBased === currentFilled + 1) {
                    clickedBox.classList.add('filled').removeClass('stained');
                } else {
                    clickedBox.classList.remove('stained');
                }
            } else if (clickedIndexOneBased > (10 - (currentStained - 1))) {
                for (let i = clickedIndex - 1; i >= 0; i--) {
                    allBoxes[i].classList.remove('stained');
                }
            }
        } else {
            if (clickedIndexOneBased === 1) {
                if (currentStained === 9) {
                    clickedBox.classList.add('stained').removeClass('filled');
                } else {
                    clickedBox.classList.add('filled');
                }
            } else if (clickedIndexOneBased === 10) {
                if (currentStained === 0) {
                    clickedBox.classList.add('stained').removeClass('filled');
                } else {
                    clickedBox.classList.add('filled');
                }
            } else if (clickedIndexOneBased === (10 - currentStained)) {
                clickedBox.classList.add('stained');
            } else if (clickedIndexOneBased === currentFilled + 1) {
                clickedBox.classList.add('filled');
            }
        }
        
        // Update humanity data
        const newFilledCount = Array.from(allBoxes).filter(box => box.classList.contains('filled')).length;
        const newStainedCount = Array.from(allBoxes).filter(box => box.classList.contains('stained')).length;
        
        this.vitals.humanity.current = newFilledCount;
        this.vitals.humanity.stained = newStainedCount;
    }

    /**
     * Handle health/willpower track box clicks
     * @param {HTMLElement} clickedBox - Clicked box element
     * @param {NodeList} allBoxes - All track boxes
     * @param {number} clickedIndex - Index of clicked box
     * @param {number} maxValue - Maximum value
     */
    handleHealthWillpowerBoxClick(clickedBox, allBoxes, clickedIndex, maxValue) {
        if (clickedBox.classList.contains('aggravated')) {
            clickedBox.classList.remove('aggravated', 'superficial');
        } else if (clickedBox.classList.contains('superficial')) {
            clickedBox.classList.remove('superficial').addClass('aggravated');
        } else {
            clickedBox.classList.add('superficial');
        }
        
        // Update vital data
        const superficialCount = Array.from(allBoxes).filter(box => box.classList.contains('superficial')).length;
        const aggravatedCount = Array.from(allBoxes).filter(box => box.classList.contains('aggravated')).length;
        const newValue = maxValue - (superficialCount + aggravatedCount);
        
        const vitalType = clickedBox.closest('.track-boxes').getAttribute('data-type');
        if (vitalType === 'health') {
            this.vitals.health.current = newValue;
            this.vitals.health.superficial = superficialCount;
            this.vitals.health.aggravated = aggravatedCount;
        } else if (vitalType === 'willpower') {
            this.vitals.willpower.current = newValue;
            this.vitals.willpower.superficial = superficialCount;
            this.vitals.willpower.aggravated = aggravatedCount;
        }
    }

    /**
     * Handle hunger dot click events
     * @param {Event} event - Click event
     * @param {HTMLElement} dotsContainer - Dots container element
     */
    handleHungerDotClick(event, dotsContainer) {
        // Hunger is always editable, even when locked
        const clickedDot = event.target;
        const currentValue = parseInt(dotsContainer.getAttribute('data-value') || '0');
        const clickedValue = parseInt(clickedDot.getAttribute('data-value'));
        
        let newValue;
        
        // If clicking the last filled dot, decrease by 1
        if (clickedValue === currentValue) {
            newValue = clickedValue - 1;
        }
        // If clicking an empty dot, fill up to that value
        else if (clickedValue > currentValue) {
            newValue = clickedValue;
        }
        // If clicking a filled dot, set to that value
        else {
            newValue = clickedValue;
        }
        
        // Update dots display
        this.updateDotsDisplay(dotsContainer, newValue);
        
        // Update data attribute
        dotsContainer.setAttribute('data-value', newValue);
        
        // Update internal data
        this.vitals.hunger.value = newValue;
        
        // Emit change event
        this.emit('vitalChanged', {
            type: 'hunger',
            data: this.getVitalData('hunger')
        });
        
        // Auto-save if character manager is available
        this.autoSave();
    }

    /**
     * Update dots display
     * @param {HTMLElement} dotsContainer - Dots container element
     * @param {number} value - New value
     */
    updateDotsDisplay(dotsContainer, value) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('filled', index < value);
        });
    }

    /**
     * Update current value display for track boxes
     * @param {HTMLElement} trackBoxes - Track boxes container
     */
    updateCurrentValue(trackBoxes) {
        const container = trackBoxes.closest('.track-container');
        const header = container.querySelector('.track-header');
        const boxes = trackBoxes;
        const maxValue = boxes.querySelectorAll('.track-box').length;
        const type = trackBoxes.getAttribute('data-type');
        
        if (type === 'humanity') {
            const filledCount = boxes.querySelectorAll('.track-box.filled').length;
            const stainedCount = boxes.querySelectorAll('.track-box.stained').length;
            header.querySelector('span:first-child').textContent = `Current: ${filledCount}`;
            
            // Update data-value to reflect the current state
            container.setAttribute('data-value', filledCount);
            boxes.setAttribute('data-value', filledCount);
        } else {
            const superficialCount = boxes.querySelectorAll('.superficial').length;
            const aggravatedCount = boxes.querySelectorAll('.aggravated').length;
            const currentValue = maxValue - (superficialCount + aggravatedCount);
            header.querySelector('span:first-child').textContent = `Current: ${currentValue}`;
            
            // Update data-value to reflect the current state
            container.setAttribute('data-value', currentValue);
            boxes.setAttribute('data-value', currentValue);
        }
    }

    /**
     * Evaluate impairment status for all tracks
     */
    evaluateImpairmentStatus() {
        const assessTrack = (trackElement, type) => {
            if (!trackElement) return 'healthy';
            
            const boxes = trackElement.querySelectorAll('.track-box');
            const total = boxes.length;
            
            if (type === 'humanity') {
                const filled = trackElement.querySelectorAll('.track-box.filled').length;
                const stained = trackElement.querySelectorAll('.track-box.stained').length;
                return (stained > 0 && (filled + stained === total)) ? 'regret' : 'healthy';
            } else {
                const sup = trackElement.querySelectorAll('.track-box.superficial').length;
                const agg = trackElement.querySelectorAll('.track-box.aggravated').length;
                if (sup + agg < total) return 'healthy';
                // Track full
                if (agg === total) return 'aggravatedFull';
                return 'superficialFull';
            }
        };

        // Get track elements
        const healthTrack = this.trackElements.get('health')?.element;
        const willpowerTrack = this.trackElements.get('willpower')?.element;
        const humanityTrack = this.trackElements.get('humanity')?.element;

        // Assess each track
        const healthStatus = assessTrack(healthTrack, 'health');
        const willpowerStatus = assessTrack(willpowerTrack, 'willpower');
        const humanityStatus = assessTrack(humanityTrack, 'humanity');

        // Reset classes
        if (healthTrack) {
            healthTrack.classList.remove('impaired', 'torpor');
        }
        if (willpowerTrack) {
            willpowerTrack.classList.remove('impaired', 'pariah');
        }
        if (humanityTrack) {
            humanityTrack.classList.remove('impaired', 'regret');
        }
        
        document.body.classList.remove('health-impaired', 'health-torpor', 'willpower-impaired', 'willpower-pariah', 'humanity-impaired');

        // Apply impairment classes
        if (healthStatus === 'superficialFull') {
            if (healthTrack) healthTrack.classList.add('impaired');
            document.body.classList.add('health-impaired');
        } else if (healthStatus === 'aggravatedFull') {
            if (healthTrack) healthTrack.classList.add('torpor', 'impaired');
            document.body.classList.add('health-impaired', 'health-torpor');
        }

        if (willpowerStatus === 'superficialFull') {
            if (willpowerTrack) willpowerTrack.classList.add('impaired');
            document.body.classList.add('willpower-impaired');
        } else if (willpowerStatus === 'aggravatedFull') {
            if (willpowerTrack) willpowerTrack.classList.add('pariah', 'impaired');
            document.body.classList.add('willpower-impaired', 'willpower-pariah');
        }

        if (humanityStatus === 'regret') {
            if (humanityTrack) humanityTrack.classList.add('regret', 'impaired');
            document.body.classList.add('humanity-impaired');
        }

        // Update internal status
        this.impairmentStatus = {
            health: healthStatus,
            willpower: willpowerStatus,
            humanity: humanityStatus
        };

        // Emit impairment status change
        this.emit('impairmentStatusChanged', this.impairmentStatus);
    }

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // Listen for lock state changes
        document.addEventListener('ledger-lock-change', (e) => {
            this.setLocked(e.detail.locked);
        });
    }

    /**
     * Set locked state for vitals (except hunger)
     * @param {boolean} locked - Whether vitals should be locked
     */
    setLocked(locked) {
        this.trackElements.forEach(({ element }, vitalName) => {
            if (vitalName === 'hunger') {
                // Hunger is always editable
                return;
            }
            
            if (vitalName === 'health' || vitalName === 'willpower' || vitalName === 'humanity') {
                // For track boxes, disable click events
                const boxes = element.querySelectorAll('.track-box');
                boxes.forEach(box => {
                    box.style.pointerEvents = locked ? 'none' : 'auto';
                });
            } else {
                // For dots, disable click events
                const dots = element.querySelectorAll('.dot');
                dots.forEach(dot => {
                    dot.style.pointerEvents = locked ? 'none' : 'auto';
                });
            }
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
        if (data.vitals) {
            // Update internal vitals object
            Object.keys(data.vitals).forEach(vitalName => {
                if (this.vitals[vitalName] !== undefined) {
                    this.vitals[vitalName] = { ...this.vitals[vitalName], ...data.vitals[vitalName] };
                }
            });
            
            // Update UI
            this.updateVitalDisplay();
        }
    }

    /**
     * Update vital display in UI
     */
    updateVitalDisplay() {
        this.trackElements.forEach(({ element }, vitalName) => {
            const vitalData = this.vitals[vitalName];
            
            if (vitalName === 'health' || vitalName === 'willpower' || vitalName === 'humanity') {
                // Recreate track boxes with new data
                const newTrackBoxes = this.createTrackBoxes(
                    vitalData.max,
                    vitalData.current,
                    vitalData.superficial || 0,
                    vitalData.aggravated || 0,
                    vitalName
                );
                
                // Replace the old track boxes
                const oldTrackBoxes = element.querySelector('.track-boxes');
                if (oldTrackBoxes) {
                    oldTrackBoxes.replaceWith(newTrackBoxes);
                }
            } else if (vitalName === 'hunger' || vitalName === 'bloodPotency') {
                // Update dots
                element.setAttribute('data-value', vitalData.value);
                this.updateDotsDisplay(element, vitalData.value);
            }
        });
        
        // Re-evaluate impairment status
        this.evaluateImpairmentStatus();
    }

    /**
     * Get current vital data
     * @returns {Object} Vital data
     */
    getData() {
        return {
            vitals: { ...this.vitals }
        };
    }

    /**
     * Get vital data for a specific vital
     * @param {string} vitalName - Vital name
     * @returns {Object} Vital data
     */
    getVitalData(vitalName) {
        return { ...this.vitals[vitalName] };
    }

    /**
     * Set vital value programmatically
     * @param {string} vitalName - Vital name
     * @param {Object} data - Vital data
     */
    setVital(vitalName, data) {
        if (this.vitals[vitalName] !== undefined) {
            this.vitals[vitalName] = { ...this.vitals[vitalName], ...data };
            
            // Update UI
            this.updateVitalDisplay();
            
            // Emit change event
            this.emit('vitalChanged', {
                type: vitalName,
                data: this.getVitalData(vitalName)
            });
        }
    }

    /**
     * Update track max value (for health/willpower based on attributes)
     * @param {string} vitalName - Vital name
     * @param {number} newMax - New maximum value
     */
    updateTrackMax(vitalName, newMax) {
        if (this.vitals[vitalName] && (vitalName === 'health' || vitalName === 'willpower')) {
            this.vitals[vitalName].max = newMax;
            
            // Update UI
            this.updateVitalDisplay();
            
            // Emit change event
            this.emit('vitalChanged', {
                type: vitalName,
                data: this.getVitalData(vitalName)
            });
        }
    }

    /**
     * Get impairment status
     * @returns {Object} Impairment status
     */
    getImpairmentStatus() {
        return { ...this.impairmentStatus };
    }

    /**
     * Reset all vitals to default values
     */
    reset() {
        this.vitals = {
            health: { max: 4, current: 4, superficial: 0, aggravated: 0 },
            willpower: { max: 2, current: 2, superficial: 0, aggravated: 0 },
            hunger: { value: 1 },
            humanity: { max: 7, current: 7, stained: 0 },
            bloodPotency: { value: 1 }
        };
        
        this.updateVitalDisplay();
    }

    /**
     * Get blood potency description
     * @param {number} value - Blood potency value
     * @returns {string} Blood potency description
     */
    getBloodPotencyDescription(value) {
        if (this.bloodPotencyData && this.bloodPotencyData.levels && this.bloodPotencyData.levels[value]) {
            return this.bloodPotencyData.levels[value].description || '';
        }
        return '';
    }
}

// Attach to global scope for dynamic loading
window.VitalsPanel = VitalsPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VitalsPanel;
} 