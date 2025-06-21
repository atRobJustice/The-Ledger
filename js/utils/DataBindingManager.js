/**
 * DataBindingManager - Utility for managing data binding between components and character data
 * Provides validation, sanitization, and event coordination for the component architecture
 */

class DataBindingManager {
    constructor() {
        this.bindings = new Map();
        this.validators = new Map();
        this.sanitizers = new Map();
        this.eventListeners = new Map();
        
        // Initialize default validators and sanitizers
        this._initializeDefaults();
    }

    /**
     * Initialize default validators and sanitizers
     */
    _initializeDefaults() {
        // Default validators
        this.addValidator('string', (value) => {
            return typeof value === 'string';
        });

        this.addValidator('number', (value) => {
            return typeof value === 'number' && !isNaN(value);
        });

        this.addValidator('positiveNumber', (value) => {
            return typeof value === 'number' && !isNaN(value) && value >= 0;
        });

        this.addValidator('range', (value, min, max) => {
            return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
        });

        this.addValidator('array', (value) => {
            return Array.isArray(value);
        });

        this.addValidator('object', (value) => {
            return typeof value === 'object' && value !== null && !Array.isArray(value);
        });

        // Default sanitizers
        this.addSanitizer('string', (value, maxLength = 255) => {
            if (typeof value !== 'string') return '';
            return value.trim().substring(0, maxLength);
        });

        this.addSanitizer('number', (value, min = 0, max = 999) => {
            const num = parseInt(value);
            if (isNaN(num)) return min;
            return Math.max(min, Math.min(max, num));
        });

        this.addSanitizer('array', (value, maxLength = 100) => {
            if (!Array.isArray(value)) return [];
            return value.slice(0, maxLength);
        });

        this.addSanitizer('object', (value, maxDepth = 5) => {
            return this._sanitizeObject(value, maxDepth);
        });
    }

    /**
     * Add a custom validator
     */
    addValidator(name, validator) {
        this.validators.set(name, validator);
    }

    /**
     * Add a custom sanitizer
     */
    addSanitizer(name, sanitizer) {
        this.sanitizers.set(name, sanitizer);
    }

    /**
     * Create a data binding between a component and character data
     */
    createBinding(componentId, fieldPath, options = {}) {
        const binding = {
            componentId,
            fieldPath,
            validator: options.validator || 'string',
            sanitizer: options.sanitizer || 'string',
            defaultValue: options.defaultValue || '',
            required: options.required || false,
            transform: options.transform || null,
            onChange: options.onChange || null
        };

        this.bindings.set(`${componentId}:${fieldPath}`, binding);
        return binding;
    }

    /**
     * Remove a data binding
     */
    removeBinding(componentId, fieldPath) {
        this.bindings.delete(`${componentId}:${fieldPath}`);
    }

    /**
     * Get a data binding
     */
    getBinding(componentId, fieldPath) {
        return this.bindings.get(`${componentId}:${fieldPath}`);
    }

    /**
     * Validate data using a validator
     */
    validate(data, validatorName, ...args) {
        const validator = this.validators.get(validatorName);
        if (!validator) {
            throw new Error(`Validator '${validatorName}' not found`);
        }
        return validator(data, ...args);
    }

    /**
     * Sanitize data using a sanitizer
     */
    sanitize(data, sanitizerName, ...args) {
        const sanitizer = this.sanitizers.get(sanitizerName);
        if (!sanitizer) {
            throw new Error(`Sanitizer '${sanitizerName}' not found`);
        }
        return sanitizer(data, ...args);
    }

    /**
     * Validate character data structure
     */
    validateCharacterData(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Character data must be an object');
        }

        const validated = { ...data };

        // Validate basic fields
        const basicFields = {
            name: { validator: 'string', required: false },
            concept: { validator: 'string', required: false },
            clan: { validator: 'string', required: false },
            generation: { validator: 'range', args: [1, 15], required: false }
        };

        for (const [field, config] of Object.entries(basicFields)) {
            if (validated[field] !== undefined) {
                if (!this.validate(validated[field], config.validator, ...config.args)) {
                    throw new Error(`Invalid ${field}: must be a valid ${config.validator}`);
                }
            } else if (config.required) {
                throw new Error(`Required field '${field}' is missing`);
            }
        }

        // Validate attributes
        if (validated.attributes) {
            if (!this.validate(validated.attributes, 'object')) {
                throw new Error('Attributes must be an object');
            }

            const attributeFields = ['strength', 'dexterity', 'stamina', 'charisma', 'manipulation', 'composure', 'intelligence', 'wits', 'resolve'];
            for (const attr of attributeFields) {
                if (validated.attributes[attr] !== undefined) {
                    if (!this.validate(validated.attributes[attr], 'range', 0, 5)) {
                        throw new Error(`Attribute ${attr} must be between 0 and 5`);
                    }
                }
            }
        }

        // Validate skills
        if (validated.skills) {
            if (!this.validate(validated.skills, 'object')) {
                throw new Error('Skills must be an object');
            }

            const skillCategories = ['physical', 'social', 'mental'];
            for (const category of skillCategories) {
                if (validated.skills[category]) {
                    if (!this.validate(validated.skills[category], 'object')) {
                        throw new Error(`Skills category ${category} must be an object`);
                    }
                }
            }
        }

        // Validate vitals
        const vitalFields = ['health', 'willpower', 'hunger', 'humanity', 'bloodPotency'];
        for (const vital of vitalFields) {
            if (validated[vital] !== undefined) {
                if (!this.validate(validated[vital], 'positiveNumber')) {
                    throw new Error(`Vital ${vital} must be a non-negative number`);
                }
            }
        }

        return validated;
    }

    /**
     * Sanitize character data structure
     */
    sanitizeCharacterData(data) {
        const sanitized = { ...data };

        // Sanitize basic string fields
        const stringFields = ['name', 'concept', 'clan', 'sire', 'chronicle', 'ambition', 'desire', 'predator'];
        for (const field of stringFields) {
            if (sanitized[field] !== undefined) {
                sanitized[field] = this.sanitize(sanitized[field], 'string', 255);
            }
        }

        // Sanitize numeric fields
        if (sanitized.generation !== undefined) {
            sanitized.generation = this.sanitize(sanitized.generation, 'number', 1, 15);
        }

        // Sanitize attributes
        if (sanitized.attributes) {
            const attributeFields = ['strength', 'dexterity', 'stamina', 'charisma', 'manipulation', 'composure', 'intelligence', 'wits', 'resolve'];
            for (const attr of attributeFields) {
                if (sanitized.attributes[attr] !== undefined) {
                    sanitized.attributes[attr] = this.sanitize(sanitized.attributes[attr], 'number', 0, 5);
                }
            }
        }

        // Sanitize vitals
        const vitalFields = ['health', 'willpower', 'hunger', 'humanity', 'bloodPotency'];
        for (const vital of vitalFields) {
            if (sanitized[vital] !== undefined) {
                sanitized[vital] = this.sanitize(sanitized[vital], 'number', 0, 999);
            }
        }

        // Sanitize arrays
        if (Array.isArray(sanitized.convictions)) {
            sanitized.convictions = this.sanitize(sanitized.convictions, 'array', 10);
        }

        if (sanitized.skills) {
            for (const category of Object.keys(sanitized.skills)) {
                if (Array.isArray(sanitized.skills[category])) {
                    sanitized.skills[category] = this.sanitize(sanitized.skills[category], 'array', 50);
                }
            }
        }

        return sanitized;
    }

    /**
     * Update character data with component data
     */
    updateCharacterData(characterData, componentId, componentData) {
        const updatedData = { ...characterData };

        // Find all bindings for this component
        for (const [bindingKey, binding] of this.bindings) {
            if (binding.componentId === componentId) {
                const value = this._getNestedValue(componentData, binding.fieldPath);
                
                if (value !== undefined) {
                    // Validate the value
                    if (!this.validate(value, binding.validator)) {
                        console.warn(`Validation failed for ${bindingKey}:`, value);
                        continue;
                    }

                    // Sanitize the value
                    const sanitizedValue = this.sanitize(value, binding.sanitizer);

                    // Apply transform if specified
                    const finalValue = binding.transform ? binding.transform(sanitizedValue) : sanitizedValue;

                    // Update the character data
                    this._setNestedValue(updatedData, binding.fieldPath, finalValue);

                    // Trigger onChange callback
                    if (binding.onChange) {
                        binding.onChange(finalValue, updatedData);
                    }
                }
            }
        }

        return updatedData;
    }

    /**
     * Extract component data from character data
     */
    extractComponentData(characterData, componentId) {
        const componentData = {};

        // Find all bindings for this component
        for (const [bindingKey, binding] of this.bindings) {
            if (binding.componentId === componentId) {
                const value = this._getNestedValue(characterData, binding.fieldPath);
                
                if (value !== undefined) {
                    this._setNestedValue(componentData, binding.fieldPath, value);
                } else if (binding.defaultValue !== undefined) {
                    this._setNestedValue(componentData, binding.fieldPath, binding.defaultValue);
                }
            }
        }

        return componentData;
    }

    /**
     * Get nested object value by path
     */
    _getNestedValue(obj, path) {
        const keys = path.split('.');
        let current = obj;

        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return undefined;
            }
        }

        return current;
    }

    /**
     * Set nested object value by path
     */
    _setNestedValue(obj, path, value) {
        const keys = path.split('.');
        let current = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
                current[key] = {};
            }
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;
    }

    /**
     * Sanitize object recursively
     */
    _sanitizeObject(obj, maxDepth, currentDepth = 0) {
        if (currentDepth >= maxDepth) {
            return null;
        }

        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.slice(0, 100).map(item => this._sanitizeObject(item, maxDepth, currentDepth + 1));
        }

        const sanitized = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key.length <= 100) { // Limit key length
                sanitized[key] = this._sanitizeObject(value, maxDepth, currentDepth + 1);
            }
        }

        return sanitized;
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
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in data binding event handler for ${event}:`, err);
                }
            });
        }
    }

    /**
     * Get all bindings
     */
    getAllBindings() {
        return Array.from(this.bindings.values());
    }

    /**
     * Clear all bindings
     */
    clearBindings() {
        this.bindings.clear();
    }

    /**
     * Get binding statistics
     */
    getStats() {
        const componentBindings = new Map();
        
        for (const [key, binding] of this.bindings) {
            if (!componentBindings.has(binding.componentId)) {
                componentBindings.set(binding.componentId, 0);
            }
            componentBindings.set(binding.componentId, componentBindings.get(binding.componentId) + 1);
        }

        return {
            totalBindings: this.bindings.size,
            componentBindings: Object.fromEntries(componentBindings),
            validators: this.validators.size,
            sanitizers: this.sanitizers.size
        };
    }
}

// Create and export the data binding manager instance
const dataBindingManager = new DataBindingManager();

// Add to window for global access
window.dataBindingManager = dataBindingManager;

// Remove ES6 export - use traditional script loading
// export default dataBindingManager; 