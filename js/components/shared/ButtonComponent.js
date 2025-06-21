/**
 * ButtonComponent - Shared component for creating interactive buttons
 * Extends BaseComponent to provide button functionality
 */
class ButtonComponent extends BaseComponent {
    constructor(config = {}) {
        super(config);
        this.text = config.text || 'Button';
        this.type = config.type || 'button'; // button, submit, reset
        this.variant = config.variant || 'primary'; // primary, secondary, success, danger, warning, info, light, dark
        this.size = config.size || ''; // sm, lg
        this.outline = config.outline || false;
        this.disabled = config.disabled || false;
        this.loading = config.loading || false;
        this.icon = config.icon || null;
        this.iconPosition = config.iconPosition || 'left'; // left, right
        this.onClick = config.onClick || null;
        this.onMouseEnter = config.onMouseEnter || null;
        this.onMouseLeave = config.onMouseLeave || null;
        this.tooltip = config.tooltip || null;
        this.tooltipPosition = config.tooltipPosition || 'top';
        this.className = config.className || '';
        this.id = config.id || `btn-${Date.now()}`;
        
        this.element = null;
        this.tooltipInstance = null;
    }

    /**
     * Initialize the button component
     */
    async init() {
        try {
            this.element = this.createButtonElement();
            this.setupEventListeners();
            
            if (this.tooltip) {
                this.setupTooltip();
            }
            
            this.emit('button:initialized', { buttonId: this.id });
            return true;
        } catch (error) {
            console.error('ButtonComponent init error:', error);
            this.emit('button:error', { error, buttonId: this.id });
            return false;
        }
    }

    /**
     * Create the button HTML element
     */
    createButtonElement() {
        const button = document.createElement('button');
        button.type = this.type;
        button.id = this.id;
        button.className = this.getButtonClasses();
        button.disabled = this.disabled;
        
        // Add icon if specified
        let content = '';
        if (this.icon && this.iconPosition === 'left') {
            content += `<i class="${this.icon}"></i> `;
        }
        
        content += this.text;
        
        if (this.icon && this.iconPosition === 'right') {
            content += ` <i class="${this.icon}"></i>`;
        }
        
        button.innerHTML = content;
        
        return button;
    }

    /**
     * Get button CSS classes
     */
    getButtonClasses() {
        let classes = ['btn'];
        
        if (this.outline) {
            classes.push(`btn-outline-${this.variant}`);
        } else {
            classes.push(`btn-${this.variant}`);
        }
        
        if (this.size) {
            classes.push(`btn-${this.size}`);
        }
        
        if (this.className) {
            classes.push(this.className);
        }
        
        return classes.join(' ');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.element.addEventListener('click', (event) => {
            if (this.disabled || this.loading) return;
            
            this.emit('button:click', { buttonId: this.id, event });
            if (this.onClick) this.onClick(event);
        });

        this.element.addEventListener('mouseenter', (event) => {
            this.emit('button:mouseenter', { buttonId: this.id, event });
            if (this.onMouseEnter) this.onMouseEnter(event);
        });

        this.element.addEventListener('mouseleave', (event) => {
            this.emit('button:mouseleave', { buttonId: this.id, event });
            if (this.onMouseLeave) this.onMouseLeave(event);
        });
    }

    /**
     * Setup tooltip
     */
    setupTooltip() {
        this.element.setAttribute('data-bs-toggle', 'tooltip');
        this.element.setAttribute('data-bs-placement', this.tooltipPosition);
        this.element.setAttribute('title', this.tooltip);
        
        this.tooltipInstance = new bootstrap.Tooltip(this.element);
    }

    /**
     * Set button text
     */
    setText(text) {
        this.text = text;
        if (this.element) {
            let content = '';
            if (this.icon && this.iconPosition === 'left') {
                content += `<i class="${this.icon}"></i> `;
            }
            content += text;
            if (this.icon && this.iconPosition === 'right') {
                content += ` <i class="${this.icon}"></i>`;
            }
            this.element.innerHTML = content;
        }
    }

    /**
     * Set button variant
     */
    setVariant(variant) {
        this.variant = variant;
        if (this.element) {
            this.element.className = this.getButtonClasses();
        }
    }

    /**
     * Enable/disable button
     */
    setDisabled(disabled) {
        this.disabled = disabled;
        if (this.element) {
            this.element.disabled = disabled;
        }
    }

    /**
     * Set loading state
     */
    setLoading(loading) {
        this.loading = loading;
        if (this.element) {
            if (loading) {
                this.element.disabled = true;
                this.element.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
            } else {
                this.element.disabled = this.disabled;
                this.setText(this.text);
            }
        }
    }

    /**
     * Set icon
     */
    setIcon(icon, position = 'left') {
        this.icon = icon;
        this.iconPosition = position;
        if (this.element) {
            this.setText(this.text);
        }
    }

    /**
     * Update tooltip
     */
    updateTooltip(tooltip, position = null) {
        this.tooltip = tooltip;
        if (position) this.tooltipPosition = position;
        
        if (this.tooltipInstance) {
            this.tooltipInstance.dispose();
        }
        
        if (this.tooltip) {
            this.setupTooltip();
        }
    }

    /**
     * Get button element
     */
    getElement() {
        return this.element;
    }

    /**
     * Destroy the button component
     */
    destroy() {
        if (this.tooltipInstance) {
            this.tooltipInstance.dispose();
        }
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.emit('button:destroyed', { buttonId: this.id });
    }

    /**
     * Static method to create a simple button
     */
    static createSimpleButton(config) {
        const button = new ButtonComponent(config);
        button.init();
        return button;
    }

    /**
     * Static method to create a loading button
     */
    static createLoadingButton(text, onClick) {
        return new ButtonComponent({
            text,
            onClick,
            loading: true
        });
    }

    /**
     * Static method to create an icon button
     */
    static createIconButton(icon, onClick, config = {}) {
        return new ButtonComponent({
            icon,
            onClick,
            variant: config.variant || 'secondary',
            size: config.size || 'sm',
            ...config
        });
    }
}

// Assign to window
window.ButtonComponent = ButtonComponent; 