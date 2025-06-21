/**
 * AttributesPanel - Character attributes panel component
 * Extends BaseComponent and manages character attributes with dot-based system
 */
class AttributesPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.attributes = {
            physical: {
                strength: 1,
                dexterity: 1,
                stamina: 1
            },
            social: {
                charisma: 1,
                manipulation: 1,
                composure: 1
            },
            mental: {
                intelligence: 1,
                wits: 1,
                resolve: 1
            }
        };
        this.attributeElements = new Map();
        this.maxDots = 5;
        
        // Bind methods
        this.handleDotClick = this.handleDotClick.bind(this);
        this.createDots = this.createDots.bind(this);
        this.updateRelatedTrackBoxes = this.updateRelatedTrackBoxes.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Load attribute reference data
        await this.loadAttributeData();
    }

    /**
     * Render the attributes panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="attributes-panel">
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="mb-3">Attributes</h3>
                    </div>
                    
                    <!-- Physical Attributes -->
                    <div class="col-md-4 d-flex flex-column">
                        <h5 class="mb-2">Physical</h5>
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-attribute="strength" data-category="physical">
                                <span class="stat-label">Strength</span>
                                <span class="attribute-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-attribute="dexterity" data-category="physical">
                                <span class="stat-label">Dexterity</span>
                                <span class="attribute-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-attribute="stamina" data-category="physical">
                                <span class="stat-label">Stamina</span>
                                <span class="attribute-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Attributes -->
                    <div class="col-md-4 d-flex flex-column">
                        <h5 class="mb-2">Social</h5>
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-attribute="charisma" data-category="social">
                                <span class="stat-label">Charisma</span>
                                <span class="attribute-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-attribute="manipulation" data-category="social">
                                <span class="stat-label">Manipulation</span>
                                <span class="attribute-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-attribute="composure" data-category="social">
                                <span class="stat-label">Composure</span>
                                <span class="attribute-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mental Attributes -->
                    <div class="col-md-4 d-flex flex-column">
                        <h5 class="mb-2">Mental</h5>
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-attribute="intelligence" data-category="mental">
                                <span class="stat-label">Intelligence</span>
                                <span class="attribute-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-attribute="wits" data-category="mental">
                                <span class="stat-label">Wits</span>
                                <span class="attribute-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-attribute="resolve" data-category="mental">
                                <span class="stat-label">Resolve</span>
                                <span class="attribute-value"></span>
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
        // Initialize attribute elements
        this.initializeAttributes();
        
        // Bind event listeners
        this.bindEventListeners();
    }

    /**
     * Load attribute reference data
     */
    async loadAttributeData() {
        try {
            const module = await import('../../references/attributes.js');
            this.attributeData = module.attributes;
        } catch (error) {
            console.error('Failed to load attribute data:', error);
            this.attributeData = {};
        }
    }

    /**
     * Initialize attribute elements and create dot containers
     */
    initializeAttributes() {
        const attributeElements = this.element.querySelectorAll('[data-attribute]');
        
        attributeElements.forEach(attributeElement => {
            const attributeName = attributeElement.getAttribute('data-attribute');
            const category = attributeElement.getAttribute('data-category');
            const valueSpan = attributeElement.querySelector('.attribute-value');
            
            if (!valueSpan) return;
            
            // Get current value from attributes object
            const currentValue = this.attributes[category][attributeName] || 1;
            
            // Create dots container
            const dotsContainer = this.createDots(currentValue, this.maxDots);
            
            // Replace the span with the dots container
            valueSpan.replaceWith(dotsContainer);
            
            // Store reference to the dots container
            this.attributeElements.set(attributeName, {
                element: dotsContainer,
                category: category
            });
        });
    }

    /**
     * Create dots container for an attribute
     * @param {number} value - Current attribute value
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
                this.handleDotClick(e, dotsContainer);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        return dotsContainer;
    }

    /**
     * Handle dot click events
     * @param {Event} event - Click event
     * @param {HTMLElement} dotsContainer - Dots container element
     */
    handleDotClick(event, dotsContainer) {
        // Check if character sheet is locked
        if (window.LockManager && window.LockManager.isLocked && window.LockManager.isLocked()) {
            // Allow edits for hunger dots even when sheet is locked
            if (!dotsContainer.closest('.hunger-dots')) {
                return;
            }
        }
        
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
        
        // Find the attribute name from the parent stat element
        const statElement = dotsContainer.closest('[data-attribute]');
        if (statElement) {
            const attributeName = statElement.getAttribute('data-attribute');
            const category = statElement.getAttribute('data-category');
            
            // Update internal data
            this.attributes[category][attributeName] = newValue;
            
            // Emit change event
            this.emit('attributeChanged', {
                attribute: attributeName,
                category: category,
                value: newValue,
                previousValue: currentValue
            });
            
            // Update related track boxes
            this.updateRelatedTrackBoxes(clickedDot);
            
            // Auto-save if character manager is available
            this.autoSave();
        }
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
     * Update related track boxes when attributes change
     * @param {HTMLElement} changedDot - The dot that was clicked
     */
    updateRelatedTrackBoxes(changedDot) {
        // This function would update related track boxes (health, willpower, etc.)
        // based on attribute changes. Implementation depends on existing track box system.
        
        // For now, we'll emit an event that other components can listen to
        this.emit('trackBoxesUpdateNeeded', {
            source: 'attribute',
            element: changedDot
        });
    }

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // Listen for lock state changes
        if (window.LockManager) {
            window.LockManager.on('lockStateChanged', (locked) => {
                this.setLocked(locked);
            });
        }
    }

    /**
     * Set locked state for all attributes
     * @param {boolean} locked - Whether attributes should be locked
     */
    setLocked(locked) {
        this.attributeElements.forEach(({ element }) => {
            element.classList.toggle('locked', locked);
            
            // Disable/enable click events on dots
            const dots = element.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.pointerEvents = locked ? 'none' : 'auto';
            });
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
        if (data.attributes) {
            // Update internal attributes object
            Object.keys(data.attributes).forEach(category => {
                if (this.attributes[category]) {
                    Object.keys(data.attributes[category]).forEach(attribute => {
                        if (this.attributes[category][attribute] !== undefined) {
                            this.attributes[category][attribute] = data.attributes[category][attribute];
                        }
                    });
                }
            });
            
            // Update UI
            this.updateAttributeDisplay();
        }
    }

    /**
     * Update attribute display in UI
     */
    updateAttributeDisplay() {
        this.attributeElements.forEach(({ element, category }, attributeName) => {
            const value = this.attributes[category][attributeName] || 1;
            element.setAttribute('data-value', value);
            this.updateDotsDisplay(element, value);
        });
    }

    /**
     * Get current attribute data
     * @returns {Object} Attribute data
     */
    getData() {
        return {
            attributes: { ...this.attributes }
        };
    }

    /**
     * Validate attribute data
     * @returns {Object} Validation result
     */
    validate() {
        const errors = [];
        const warnings = [];
        
        // Check that all attributes have values
        Object.keys(this.attributes).forEach(category => {
            Object.keys(this.attributes[category]).forEach(attribute => {
                const value = this.attributes[category][attribute];
                if (value === undefined || value === null) {
                    errors.push(`${this.capitalizeFirst(attribute)} is missing a value`);
                } else if (value < 1 || value > this.maxDots) {
                    errors.push(`${this.capitalizeFirst(attribute)} must be between 1 and ${this.maxDots}`);
                }
            });
        });
        
        // Check attribute distribution (V5 rules)
        const allValues = [];
        Object.values(this.attributes).forEach(category => {
            Object.values(category).forEach(value => {
                allValues.push(value);
            });
        });
        
        const distribution = {};
        allValues.forEach(value => {
            distribution[value] = (distribution[value] || 0) + 1;
        });
        
        // V5 distribution: 1 attribute at 1, 4 at 2, 3 at 3, 1 at 4
        if (distribution[1] !== 1) {
            warnings.push('Should have exactly 1 attribute at 1 dot');
        }
        if (distribution[2] !== 4) {
            warnings.push('Should have exactly 4 attributes at 2 dots');
        }
        if (distribution[3] !== 3) {
            warnings.push('Should have exactly 3 attributes at 3 dots');
        }
        if (distribution[4] !== 1) {
            warnings.push('Should have exactly 1 attribute at 4 dots');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * Set attribute value programmatically
     * @param {string} category - Attribute category (physical, social, mental)
     * @param {string} attribute - Attribute name
     * @param {number} value - New value
     */
    setAttribute(category, attribute, value) {
        if (this.attributes[category] && this.attributes[category][attribute] !== undefined) {
            const previousValue = this.attributes[category][attribute];
            this.attributes[category][attribute] = Math.max(1, Math.min(this.maxDots, value));
            
            // Update UI
            const attributeData = this.attributeElements.get(attribute);
            if (attributeData) {
                const { element } = attributeData;
                element.setAttribute('data-value', this.attributes[category][attribute]);
                this.updateDotsDisplay(element, this.attributes[category][attribute]);
            }
            
            // Emit change event
            this.emit('attributeChanged', {
                attribute: attribute,
                category: category,
                value: this.attributes[category][attribute],
                previousValue: previousValue
            });
        }
    }

    /**
     * Get attribute value
     * @param {string} category - Attribute category
     * @param {string} attribute - Attribute name
     * @returns {number} Attribute value
     */
    getAttribute(category, attribute) {
        return this.attributes[category]?.[attribute] || 1;
    }

    /**
     * Get all attributes for a category
     * @param {string} category - Attribute category
     * @returns {Object} Attributes object
     */
    getCategoryAttributes(category) {
        return { ...this.attributes[category] };
    }

    /**
     * Reset all attributes to default values
     */
    reset() {
        Object.keys(this.attributes).forEach(category => {
            Object.keys(this.attributes[category]).forEach(attribute => {
                this.attributes[category][attribute] = 1;
            });
        });
        
        this.updateAttributeDisplay();
    }

    /**
     * Capitalize first letter of string
     * @param {string} str - Input string
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Get attribute description from reference data
     * @param {string} category - Attribute category
     * @param {string} attribute - Attribute name
     * @returns {string} Attribute description
     */
    getAttributeDescription(category, attribute) {
        if (this.attributeData && 
            this.attributeData[category] && 
            this.attributeData[category].attributes &&
            this.attributeData[category].attributes[attribute]) {
            return this.attributeData[category].attributes[attribute].description;
        }
        return '';
    }

    /**
     * Get dot value description
     * @param {string} category - Attribute category
     * @param {string} attribute - Attribute name
     * @param {number} value - Dot value
     * @returns {string} Dot value description
     */
    getDotValueDescription(category, attribute, value) {
        if (this.attributeData && 
            this.attributeData[category] && 
            this.attributeData[category].attributes &&
            this.attributeData[category].attributes[attribute] &&
            this.attributeData[category].attributes[attribute].dotValues &&
            this.attributeData[category].attributes[attribute].dotValues[value]) {
            return this.attributeData[category].attributes[attribute].dotValues[value];
        }
        return '';
    }
}

// Attach to global scope for dynamic loading
window.AttributesPanel = AttributesPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributesPanel;
} 