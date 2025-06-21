/**
 * InformationPanel - Character information panel component
 * Extends BaseComponent and manages character basic information fields
 */
class InformationPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.characterData = {};
        this.fieldElements = new Map();
        
        // Bind methods
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.populateDropdowns = this.populateDropdowns.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Load reference data for dropdowns
        await this.loadReferenceData();
    }

    /**
     * Render the information panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="information-panel">
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="mb-3">Information</h3>
                    </div>
                    
                    <!-- Left Column -->
                    <div class="col-md-4 d-flex flex-column">
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-field="name">
                                <span class="stat-label">Name</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="chronicle">
                                <span class="stat-label">Chronicle</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="resonance">
                                <span class="stat-label">Resonance</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="temperament">
                                <span class="stat-label">Temperament</span>
                                <span class="field-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Middle Column -->
                    <div class="col-md-4 d-flex flex-column">
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-field="concept">
                                <span class="stat-label">Concept</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="ambition">
                                <span class="stat-label">Ambition</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="desire">
                                <span class="stat-label">Desire</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="predator">
                                <span class="stat-label">Predator</span>
                                <span class="field-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Column -->
                    <div class="col-md-4 d-flex flex-column">
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-field="sire">
                                <span class="stat-label">Sire</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="clan">
                                <span class="stat-label">Clan</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="generation">
                                <span class="stat-label">Generation</span>
                                <span class="field-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-field="compulsion">
                                <span class="stat-label">Compulsion</span>
                                <span class="field-value"></span>
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
        // Initialize field elements
        this.initializeFields();
        
        // Populate dropdowns
        await this.populateDropdowns();
        
        // Bind event listeners
        this.bindEventListeners();
    }

    /**
     * Initialize field elements and create appropriate input types
     */
    initializeFields() {
        const fieldElements = this.element.querySelectorAll('[data-field]');
        
        fieldElements.forEach(fieldElement => {
            const fieldName = fieldElement.getAttribute('data-field');
            const valueSpan = fieldElement.querySelector('.field-value');
            
            if (!valueSpan) return;
            
            // Create appropriate input based on field type
            let inputElement;
            
            if (this.isDropdownField(fieldName)) {
                inputElement = this.createDropdown(fieldName, '');
            } else {
                inputElement = this.createTextInput('');
            }
            
            // Replace the span with the input
            valueSpan.replaceWith(inputElement);
            
            // Store reference to the input element
            this.fieldElements.set(fieldName, inputElement);
        });
    }

    /**
     * Check if a field should be a dropdown
     * @param {string} fieldName - Field name
     * @returns {boolean} True if field should be dropdown
     */
    isDropdownField(fieldName) {
        const dropdownFields = ['predator', 'clan', 'generation', 'resonance', 'temperament', 'compulsion'];
        return dropdownFields.includes(fieldName);
    }

    /**
     * Create a text input element
     * @param {string} value - Initial value
     * @returns {HTMLElement} Text input element
     */
    createTextInput(value) {
        const input = document.createElement('textarea');
        input.className = 'form-control bg-dark text-light';
        input.rows = '1';
        input.style.resize = 'none';
        input.style.overflow = 'hidden';
        input.value = value || '';
        
        // Auto-resize functionality
        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Trigger initial resize
        setTimeout(() => {
            input.dispatchEvent(new Event('input'));
        }, 0);
        
        return input;
    }

    /**
     * Create a dropdown element
     * @param {string} fieldName - Field name
     * @param {string} value - Initial value
     * @returns {HTMLElement} Dropdown element
     */
    createDropdown(fieldName, value) {
        const select = document.createElement('select');
        select.className = `form-select ${fieldName}-dropdown`;
        select.setAttribute('aria-label', `Select ${fieldName}`);
        
        // Add placeholder option
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = `Select ${this.capitalizeFirst(fieldName)}`;
        select.appendChild(placeholder);
        
        // Store initial value
        if (value) {
            select.setAttribute('data-value', value);
        }
        
        return select;
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
     * Load reference data for dropdowns
     */
    async loadReferenceData() {
        try {
            // Load all reference data in parallel
            const [
                predatorTypes,
                clans,
                generation,
                resonance,
                temperament,
                compulsions
            ] = await Promise.all([
                import('../../references/predator_types.js').then(m => m.predatorTypes),
                import('../../references/clans.js').then(m => m.clans),
                import('../../references/generation.js').then(m => m.generation),
                import('../../references/resonances.js').then(m => m.resonances),
                import('../../references/resonances.js').then(m => m.temperaments),
                import('../../references/compulsions.js').then(m => m.compulsions)
            ]);
            
            this.referenceData = {
                predatorTypes,
                clans,
                generation,
                resonance,
                temperament,
                compulsions
            };
        } catch (error) {
            console.error('Failed to load reference data:', error);
            this.referenceData = {};
        }
    }

    /**
     * Populate all dropdowns with reference data
     */
    async populateDropdowns() {
        if (!this.referenceData) {
            await this.loadReferenceData();
        }
        
        // Populate each dropdown type
        await Promise.all([
            this.populatePredatorDropdown(),
            this.populateClanDropdown(),
            this.populateGenerationDropdown(),
            this.populateResonanceDropdown(),
            this.populateTemperamentDropdown(),
            this.populateCompulsionDropdown()
        ]);
    }

    /**
     * Populate predator dropdown
     */
    async populatePredatorDropdown() {
        const dropdown = this.fieldElements.get('predator');
        if (!dropdown || !this.referenceData.predatorTypes) return;
        
        const predatorTypes = this.referenceData.predatorTypes;
        const entries = Object.entries(predatorTypes.types).sort((a, b) => 
            a[1].name.localeCompare(b[1].name)
        );
        
        entries.forEach(([key, type]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = type.name;
            option.title = type.description;
            option.setAttribute('data-predator-type', key);
            dropdown.appendChild(option);
        });
        
        // Set initial value if available
        const initialValue = dropdown.getAttribute('data-value');
        if (initialValue) {
            dropdown.value = initialValue;
        }
    }

    /**
     * Populate clan dropdown
     */
    async populateClanDropdown() {
        const dropdown = this.fieldElements.get('clan');
        if (!dropdown || !this.referenceData.clans) return;
        
        const clans = this.referenceData.clans;
        const entries = Object.entries(clans.types).sort((a, b) => 
            a[1].name.localeCompare(b[1].name)
        );
        
        entries.forEach(([key, clan]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = clan.name;
            option.title = clan.background?.description || '';
            option.setAttribute('data-clan', key);
            dropdown.appendChild(option);
        });
        
        // Set initial value if available
        const initialValue = dropdown.getAttribute('data-value');
        if (initialValue) {
            dropdown.value = initialValue;
        }
    }

    /**
     * Populate generation dropdown
     */
    async populateGenerationDropdown() {
        const dropdown = this.fieldElements.get('generation');
        if (!dropdown || !this.referenceData.generation) return;
        
        const generationData = this.referenceData.generation;
        const generations = Object.keys(generationData.bloodPotencyLimits)
            .map(Number)
            .sort((a, b) => a - b);
        
        const getOrdinal = n => {
            const s = ["th", "st", "nd", "rd"];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };
        
        generations.forEach(gen => {
            const tier = generationData.getGenerationTier ? 
                generationData.getGenerationTier(gen) : null;
            
            const option = document.createElement('option');
            option.value = gen;
            option.textContent = getOrdinal(gen);
            option.title = tier?.description || '';
            dropdown.appendChild(option);
        });
        
        // Set initial value if available
        const initialValue = dropdown.getAttribute('data-value');
        if (initialValue) {
            dropdown.value = initialValue;
        }
    }

    /**
     * Populate resonance dropdown
     */
    async populateResonanceDropdown() {
        const dropdown = this.fieldElements.get('resonance');
        if (!dropdown || !this.referenceData.resonance) return;
        
        const resonances = this.referenceData.resonance;
        const entries = Object.entries(resonances).sort((a, b) => 
            a[1].name.localeCompare(b[1].name)
        );
        
        entries.forEach(([key, resonance]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = resonance.name;
            option.title = resonance.description || '';
            dropdown.appendChild(option);
        });
        
        // Set initial value if available
        const initialValue = dropdown.getAttribute('data-value');
        if (initialValue) {
            dropdown.value = initialValue;
        }
    }

    /**
     * Populate temperament dropdown
     */
    async populateTemperamentDropdown() {
        const dropdown = this.fieldElements.get('temperament');
        if (!dropdown || !this.referenceData.temperament) return;
        
        const temperaments = this.referenceData.temperament;
        const entries = Object.entries(temperaments).sort((a, b) => 
            a[1].name.localeCompare(b[1].name)
        );
        
        entries.forEach(([key, temperament]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = temperament.name;
            option.title = temperament.description || '';
            dropdown.appendChild(option);
        });
        
        // Set initial value if available
        const initialValue = dropdown.getAttribute('data-value');
        if (initialValue) {
            dropdown.value = initialValue;
        }
    }

    /**
     * Populate compulsion dropdown
     */
    async populateCompulsionDropdown() {
        const dropdown = this.fieldElements.get('compulsion');
        if (!dropdown || !this.referenceData.compulsions) return;
        
        const compulsions = this.referenceData.compulsions;
        
        // Add general compulsions first
        const generalEntries = Object.entries(compulsions.general || {});
        generalEntries.forEach(([key, comp]) => {
            const option = document.createElement('option');
            option.value = `general.${key}`;
            option.textContent = comp.name;
            option.title = comp.description || '';
            option.setAttribute('data-compulsion-type', 'general');
            dropdown.appendChild(option);
        });
        
        // Add clan compulsions (will be filtered based on selected clan)
        this.updateClanCompulsions();
        
        // Set initial value if available
        const initialValue = dropdown.getAttribute('data-value');
        if (initialValue) {
            dropdown.value = initialValue;
        }
    }

    /**
     * Update clan compulsions based on selected clan
     */
    updateClanCompulsions() {
        const clanDropdown = this.fieldElements.get('clan');
        const compulsionDropdown = this.fieldElements.get('compulsion');
        
        if (!clanDropdown || !compulsionDropdown || !this.referenceData.compulsions) return;
        
        const selectedClan = clanDropdown.value;
        const compulsions = this.referenceData.compulsions;
        
        // Remove existing clan compulsions
        const existingClanOptions = compulsionDropdown.querySelectorAll('[data-compulsion-type="clan"]');
        existingClanOptions.forEach(option => option.remove());
        
        // Add new clan compulsions if clan is selected
        if (selectedClan && compulsions.clanCompulsions[selectedClan]) {
            const comp = compulsions.clanCompulsions[selectedClan];
            const option = document.createElement('option');
            option.value = `clan.${selectedClan}`;
            option.textContent = comp.name;
            option.title = comp.description || '';
            option.setAttribute('data-compulsion-type', 'clan');
            option.setAttribute('data-clan-key', selectedClan);
            compulsionDropdown.appendChild(option);
        }
    }

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // Bind text input changes
        this.fieldElements.forEach((element, fieldName) => {
            if (!this.isDropdownField(fieldName)) {
                element.addEventListener('input', (e) => {
                    this.handleFieldChange(fieldName, e.target.value);
                });
            } else {
                element.addEventListener('change', (e) => {
                    this.handleDropdownChange(fieldName, e.target.value);
                });
            }
        });
        
        // Special handling for clan dropdown to update compulsions
        const clanDropdown = this.fieldElements.get('clan');
        if (clanDropdown) {
            clanDropdown.addEventListener('change', () => {
                this.updateClanCompulsions();
                this.handleDropdownChange('clan', clanDropdown.value);
            });
        }
    }

    /**
     * Handle text field changes
     * @param {string} fieldName - Field name
     * @param {string} value - New value
     */
    handleFieldChange(fieldName, value) {
        this.characterData[fieldName] = value;
        this.emit('fieldChanged', {
            field: fieldName,
            value: value,
            type: 'text'
        });
        
        // Auto-save if character manager is available
        this.autoSave();
    }

    /**
     * Handle dropdown changes
     * @param {string} fieldName - Field name
     * @param {string} value - New value
     */
    handleDropdownChange(fieldName, value) {
        this.characterData[fieldName] = value;
        this.emit('fieldChanged', {
            field: fieldName,
            value: value,
            type: 'dropdown'
        });
        
        // Auto-save if character manager is available
        this.autoSave();
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
    async update(data) {
        this.characterData = { ...this.characterData, ...data };
        
        // Update field values
        this.fieldElements.forEach((element, fieldName) => {
            const value = this.characterData[fieldName] || '';
            
            if (this.isDropdownField(fieldName)) {
                element.value = value;
            } else {
                element.value = value;
                // Trigger auto-resize for text inputs
                element.dispatchEvent(new Event('input'));
            }
        });
        
        // Update clan compulsions if clan changed
        this.updateClanCompulsions();
    }

    /**
     * Get current character data
     * @returns {Object} Character data
     */
    getData() {
        const data = {};
        this.fieldElements.forEach((element, fieldName) => {
            data[fieldName] = element.value || '';
        });
        return data;
    }

    /**
     * Validate character data
     * @returns {Object} Validation result
     */
    validate() {
        const errors = [];
        const warnings = [];
        
        // Check required fields
        const requiredFields = ['name'];
        requiredFields.forEach(field => {
            const value = this.characterData[field];
            if (!value || value.trim() === '') {
                errors.push(`${this.capitalizeFirst(field)} is required`);
            }
        });
        
        // Check field lengths
        const maxLengths = {
            name: 50,
            concept: 100,
            ambition: 100,
            desire: 100,
            sire: 50,
            chronicle: 50
        };
        
        Object.entries(maxLengths).forEach(([field, maxLength]) => {
            const value = this.characterData[field];
            if (value && value.length > maxLength) {
                warnings.push(`${this.capitalizeFirst(field)} is longer than recommended (${maxLength} characters)`);
            }
        });
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * Set field as read-only
     * @param {string} fieldName - Field name
     * @param {boolean} readOnly - Read-only state
     */
    setFieldReadOnly(fieldName, readOnly) {
        const element = this.fieldElements.get(fieldName);
        if (element) {
            element.disabled = readOnly;
            element.classList.toggle('readonly', readOnly);
        }
    }

    /**
     * Set all fields as read-only
     * @param {boolean} readOnly - Read-only state
     */
    setReadOnly(readOnly) {
        this.fieldElements.forEach((element, fieldName) => {
            this.setFieldReadOnly(fieldName, readOnly);
        });
    }

    /**
     * Focus on a specific field
     * @param {string} fieldName - Field name
     */
    focusField(fieldName) {
        const element = this.fieldElements.get(fieldName);
        if (element) {
            element.focus();
        }
    }

    /**
     * Clear all fields
     */
    clear() {
        this.characterData = {};
        this.fieldElements.forEach(element => {
            element.value = '';
        });
    }
}

// Attach to global scope for dynamic loading
window.InformationPanel = InformationPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InformationPanel;
} 