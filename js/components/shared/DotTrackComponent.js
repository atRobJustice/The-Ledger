/**
 * DotTrackComponent - Shared component for creating dot tracks (attributes, skills, etc.)
 * Extends BaseComponent to provide dot track functionality
 */
class DotTrackComponent extends BaseComponent {
    constructor(config = {}) {
        super(config);
        this.value = config.value || 0;
        this.maxDots = config.maxDots || 5;
        this.label = config.label || '';
        this.category = config.category || '';
        this.disabled = config.disabled || false;
        this.lockable = config.lockable !== false;
        this.onValueChange = config.onValueChange || null;
        this.onDotClick = config.onDotClick || null;
        this.className = config.className || '';
        this.id = config.id || `dottrack-${Date.now()}`;
        this.showLabel = config.showLabel !== false;
        this.showValue = config.showValue !== false;
        this.dotsClass = config.dotsClass || 'lockable-dot';
        
        this.element = null;
        this.dots = [];
        this.labelElement = null;
        this.valueElement = null;
    }

    /**
     * Initialize the dot track component
     */
    async init() {
        try {
            this.element = this.createDotTrackElement();
            this.setupEventListeners();
            this.updateDisplay();
            
            this.emit('dottrack:initialized', { dottrackId: this.id });
            return true;
        } catch (error) {
            console.error('DotTrackComponent init error:', error);
            this.emit('dottrack:error', { error, dottrackId: this.id });
            return false;
        }
    }

    /**
     * Create the dot track HTML element
     */
    createDotTrackElement() {
        const container = document.createElement('div');
        container.className = `dot-track-container ${this.className}`;
        container.id = this.id;

        // Create label if needed
        if (this.showLabel) {
            this.labelElement = document.createElement('div');
            this.labelElement.className = 'dot-track-label';
            this.labelElement.textContent = this.label;
            container.appendChild(this.labelElement);
        }

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = `dots ${this.dotsClass}`;
        dotsContainer.dataset.value = this.value;
        dotsContainer.dataset.category = this.category;

        // Create individual dots
        for (let i = 0; i < this.maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.value = i + 1;
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }

        container.appendChild(dotsContainer);

        // Create value display if needed
        if (this.showValue) {
            this.valueElement = document.createElement('div');
            this.valueElement.className = 'dot-track-value';
            this.valueElement.textContent = this.value;
            container.appendChild(this.valueElement);
        }

        return container;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', (event) => {
                if (this.disabled) return;
                
                // Check if locked
                if (this.lockable && window.LockManager && window.LockManager.isLocked()) {
                    return;
                }
                
                const clickedValue = index + 1;
                this.handleDotClick(clickedValue, event);
            });

            dot.addEventListener('mouseenter', (event) => {
                this.handleDotHover(index, true, event);
            });

            dot.addEventListener('mouseleave', (event) => {
                this.handleDotHover(index, false, event);
            });
        });
    }

    /**
     * Handle dot click
     */
    handleDotClick(value, event) {
        let newValue = value;
        
        // If clicking the current value, decrease by 1
        if (value === this.value) {
            newValue = Math.max(0, value - 1);
        }
        
        this.setValue(newValue);
        
        this.emit('dottrack:click', { 
            dottrackId: this.id, 
            value: newValue, 
            event 
        });
        
        if (this.onDotClick) this.onDotClick(newValue, event);
    }

    /**
     * Handle dot hover
     */
    handleDotHover(index, isHovering, event) {
        const dot = this.dots[index];
        if (isHovering) {
            dot.classList.add('hover');
        } else {
            dot.classList.remove('hover');
        }
    }

    /**
     * Update display
     */
    updateDisplay() {
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('filled', index < this.value);
        });

        // Update container data value
        const dotsContainer = this.element.querySelector('.dots');
        if (dotsContainer) {
            dotsContainer.dataset.value = this.value;
        }

        // Update value display
        if (this.valueElement) {
            this.valueElement.textContent = this.value;
        }
    }

    /**
     * Set value
     */
    setValue(value) {
        const oldValue = this.value;
        this.value = Math.max(0, Math.min(value, this.maxDots));
        
        this.updateDisplay();
        
        this.emit('dottrack:change', { 
            dottrackId: this.id, 
            oldValue, 
            newValue: this.value 
        });
        
        if (this.onValueChange) this.onValueChange(this.value, oldValue);
    }

    /**
     * Get value
     */
    getValue() {
        return this.value;
    }

    /**
     * Set label
     */
    setLabel(label) {
        this.label = label;
        if (this.labelElement) {
            this.labelElement.textContent = label;
        }
    }

    /**
     * Set max dots
     */
    setMaxDots(maxDots) {
        this.maxDots = maxDots;
        this.value = Math.min(this.value, maxDots);
        
        // Recreate dots if max dots changed
        this.recreateDots();
    }

    /**
     * Recreate dots
     */
    recreateDots() {
        const dotsContainer = this.element.querySelector('.dots');
        dotsContainer.innerHTML = '';
        this.dots = [];
        
        for (let i = 0; i < this.maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.value = i + 1;
            dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
        
        this.setupEventListeners();
        this.updateDisplay();
    }

    /**
     * Enable/disable dot track
     */
    setDisabled(disabled) {
        this.disabled = disabled;
        if (this.element) {
            this.element.classList.toggle('disabled', disabled);
        }
    }

    /**
     * Add CSS class to dots
     */
    addDotsClass(className) {
        const dotsContainer = this.element.querySelector('.dots');
        if (dotsContainer) {
            dotsContainer.classList.add(className);
        }
    }

    /**
     * Remove CSS class from dots
     */
    removeDotsClass(className) {
        const dotsContainer = this.element.querySelector('.dots');
        if (dotsContainer) {
            dotsContainer.classList.remove(className);
        }
    }

    /**
     * Get dot track element
     */
    getElement() {
        return this.element;
    }

    /**
     * Get dots container
     */
    getDotsContainer() {
        return this.element.querySelector('.dots');
    }

    /**
     * Destroy the dot track component
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.emit('dottrack:destroyed', { dottrackId: this.id });
    }

    /**
     * Static method to create a simple dot track
     */
    static createSimpleDotTrack(label, maxDots, config = {}) {
        const dotTrack = new DotTrackComponent({
            label,
            maxDots,
            ...config
        });
        dotTrack.init();
        return dotTrack;
    }

    /**
     * Static method to create an attribute track
     */
    static createAttributeTrack(label, config = {}) {
        return DotTrackComponent.createSimpleDotTrack(label, 5, {
            category: 'attribute',
            ...config
        });
    }

    /**
     * Static method to create a skill track
     */
    static createSkillTrack(label, config = {}) {
        return DotTrackComponent.createSimpleDotTrack(label, 5, {
            category: 'skill',
            ...config
        });
    }

    /**
     * Static method to create a discipline track
     */
    static createDisciplineTrack(label, config = {}) {
        return DotTrackComponent.createSimpleDotTrack(label, 5, {
            category: 'discipline',
            ...config
        });
    }
}

// Assign to window
window.DotTrackComponent = DotTrackComponent; 