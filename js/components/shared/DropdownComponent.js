/**
 * DropdownComponent - Shared component for creating dropdown menus
 * Extends BaseComponent to provide dropdown functionality
 */
class DropdownComponent extends BaseComponent {
    constructor(config = {}) {
        super(config);
        this.options = config.options || [];
        this.selectedValue = config.selectedValue || '';
        this.placeholder = config.placeholder || 'Select an option';
        this.multiple = config.multiple || false;
        this.searchable = config.searchable || false;
        this.disabled = config.disabled || false;
        this.size = config.size || ''; // sm, lg
        this.variant = config.variant || 'primary'; // primary, secondary, success, danger, warning, info, light, dark
        this.onChange = config.onChange || null;
        this.onFocus = config.onFocus || null;
        this.onBlur = config.onBlur || null;
        this.className = config.className || '';
        this.id = config.id || `dropdown-${Date.now()}`;
        this.allowEmpty = config.allowEmpty !== false;
        
        this.element = null;
        this.selectElement = null;
    }

    /**
     * Initialize the dropdown component
     */
    async init() {
        try {
            this.element = this.createDropdownElement();
            this.selectElement = this.element.querySelector('select');
            this.setupEventListeners();
            this.populateOptions();
            
            this.emit('dropdown:initialized', { dropdownId: this.id });
            return true;
        } catch (error) {
            console.error('DropdownComponent init error:', error);
            this.emit('dropdown:error', { error, dropdownId: this.id });
            return false;
        }
    }

    /**
     * Create the dropdown HTML element
     */
    createDropdownElement() {
        const container = document.createElement('div');
        container.className = `dropdown-component ${this.className}`;
        container.id = this.id;

        const select = document.createElement('select');
        select.className = this.getSelectClasses();
        select.disabled = this.disabled;
        select.multiple = this.multiple;
        
        if (this.searchable) {
            select.setAttribute('data-live-search', 'true');
        }

        container.appendChild(select);
        return container;
    }

    /**
     * Get select CSS classes
     */
    getSelectClasses() {
        let classes = ['form-select'];
        
        if (this.size) {
            classes.push(`form-select-${this.size}`);
        }
        
        return classes.join(' ');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.selectElement.addEventListener('change', (event) => {
            const value = this.multiple ? 
                Array.from(event.target.selectedOptions).map(option => option.value) :
                event.target.value;
            
            this.emit('dropdown:change', { 
                dropdownId: this.id, 
                value, 
                event 
            });
            
            if (this.onChange) this.onChange(value, event);
        });

        this.selectElement.addEventListener('focus', (event) => {
            this.emit('dropdown:focus', { dropdownId: this.id, event });
            if (this.onFocus) this.onFocus(event);
        });

        this.selectElement.addEventListener('blur', (event) => {
            this.emit('dropdown:blur', { dropdownId: this.id, event });
            if (this.onBlur) this.onBlur(event);
        });
    }

    /**
     * Populate options
     */
    populateOptions() {
        this.selectElement.innerHTML = '';
        
        // Add placeholder option if allowed
        if (this.allowEmpty) {
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = this.placeholder;
            placeholderOption.disabled = true;
            placeholderOption.selected = !this.selectedValue;
            this.selectElement.appendChild(placeholderOption);
        }
        
        // Add options
        this.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label || option.value;
            
            if (this.multiple) {
                if (Array.isArray(this.selectedValue) && this.selectedValue.includes(option.value)) {
                    optionElement.selected = true;
                }
            } else {
                if (option.value === this.selectedValue) {
                    optionElement.selected = true;
                }
            }
            
            this.selectElement.appendChild(optionElement);
        });
    }

    /**
     * Set options
     */
    setOptions(options) {
        this.options = options;
        this.populateOptions();
    }

    /**
     * Add option
     */
    addOption(option) {
        this.options.push(option);
        this.populateOptions();
    }

    /**
     * Remove option by value
     */
    removeOption(value) {
        this.options = this.options.filter(option => option.value !== value);
        this.populateOptions();
    }

    /**
     * Set selected value
     */
    setValue(value) {
        this.selectedValue = value;
        this.populateOptions();
    }

    /**
     * Get selected value
     */
    getValue() {
        if (this.multiple) {
            return Array.from(this.selectElement.selectedOptions).map(option => option.value);
        }
        return this.selectElement.value;
    }

    /**
     * Get selected option(s)
     */
    getSelectedOptions() {
        if (this.multiple) {
            return Array.from(this.selectElement.selectedOptions).map(option => ({
                value: option.value,
                label: option.textContent
            }));
        }
        
        const selectedOption = this.selectElement.selectedOptions[0];
        if (selectedOption) {
            return {
                value: selectedOption.value,
                label: selectedOption.textContent
            };
        }
        
        return null;
    }

    /**
     * Enable/disable dropdown
     */
    setDisabled(disabled) {
        this.disabled = disabled;
        if (this.selectElement) {
            this.selectElement.disabled = disabled;
        }
    }

    /**
     * Set placeholder
     */
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        this.populateOptions();
    }

    /**
     * Clear selection
     */
    clear() {
        this.selectedValue = this.multiple ? [] : '';
        this.populateOptions();
    }

    /**
     * Get dropdown element
     */
    getElement() {
        return this.element;
    }

    /**
     * Get select element
     */
    getSelectElement() {
        return this.selectElement;
    }

    /**
     * Destroy the dropdown component
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.emit('dropdown:destroyed', { dropdownId: this.id });
    }

    /**
     * Static method to create a simple dropdown
     */
    static createSimpleDropdown(options, config = {}) {
        const dropdown = new DropdownComponent({
            options,
            ...config
        });
        dropdown.init();
        return dropdown;
    }

    /**
     * Static method to create a multi-select dropdown
     */
    static createMultiSelectDropdown(options, config = {}) {
        const dropdown = new DropdownComponent({
            options,
            multiple: true,
            ...config
        });
        dropdown.init();
        return dropdown;
    }

    /**
     * Static method to create a searchable dropdown
     */
    static createSearchableDropdown(options, config = {}) {
        const dropdown = new DropdownComponent({
            options,
            searchable: true,
            ...config
        });
        dropdown.init();
        return dropdown;
    }
}

// Assign to window
window.DropdownComponent = DropdownComponent; 