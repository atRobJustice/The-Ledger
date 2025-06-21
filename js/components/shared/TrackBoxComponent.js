/**
 * TrackBoxComponent - Shared component for creating track boxes (health, willpower, etc.)
 * Extends BaseComponent to provide track box functionality
 */
class TrackBoxComponent extends BaseComponent {
    constructor(config = {}) {
        super(config);
        this.maxValue = config.maxValue || 10;
        this.currentValue = config.currentValue || 0;
        this.superficial = config.superficial || 0;
        this.aggravated = config.aggravated || 0;
        this.type = config.type || 'health'; // health, willpower, hunger, humanity
        this.size = config.size || 'normal'; // small, normal, large
        this.disabled = config.disabled || false;
        this.lockable = config.lockable !== false;
        this.onValueChange = config.onValueChange || null;
        this.onBoxClick = config.onBoxClick || null;
        this.className = config.className || '';
        this.id = config.id || `trackbox-${Date.now()}`;
        
        this.element = null;
        this.boxes = [];
    }

    /**
     * Initialize the track box component
     */
    async init() {
        try {
            this.element = this.createTrackBoxElement();
            this.setupEventListeners();
            this.updateDisplay();
            
            this.emit('trackbox:initialized', { trackboxId: this.id });
            return true;
        } catch (error) {
            console.error('TrackBoxComponent init error:', error);
            this.emit('trackbox:error', { error, trackboxId: this.id });
            return false;
        }
    }

    /**
     * Create the track box HTML element
     */
    createTrackBoxElement() {
        const container = document.createElement('div');
        container.className = `track-box-container ${this.className}`;
        container.id = this.id;
        
        if (this.lockable) {
            container.classList.add('lockable-track');
        }

        const header = document.createElement('div');
        header.className = 'track-box-header';
        header.innerHTML = `
            <span class="track-box-label">${this.getTypeLabel()}</span>
            <span class="track-box-values">
                <span class="current-value">${this.currentValue}</span>
                <span class="separator">/</span>
                <span class="max-value">${this.maxValue}</span>
            </span>
        `;

        const boxesContainer = document.createElement('div');
        boxesContainer.className = `track-boxes track-boxes-${this.size}`;

        // Create individual boxes
        for (let i = 0; i < this.maxValue; i++) {
            const box = document.createElement('div');
            box.className = 'track-box';
            box.dataset.index = i;
            box.dataset.value = i + 1;
            
            if (this.lockable) {
                box.classList.add('lockable-box');
            }
            
            boxesContainer.appendChild(box);
            this.boxes.push(box);
        }

        container.appendChild(header);
        container.appendChild(boxesContainer);

        return container;
    }

    /**
     * Get type label
     */
    getTypeLabel() {
        const labels = {
            health: 'Health',
            willpower: 'Willpower',
            hunger: 'Hunger',
            humanity: 'Humanity'
        };
        return labels[this.type] || this.type;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        this.boxes.forEach((box, index) => {
            box.addEventListener('click', (event) => {
                if (this.disabled) return;
                
                // Check if locked
                if (this.lockable && window.LockManager && window.LockManager.isLocked()) {
                    return;
                }
                
                const clickedValue = index + 1;
                this.handleBoxClick(clickedValue, event);
            });

            box.addEventListener('mouseenter', (event) => {
                this.handleBoxHover(index, true, event);
            });

            box.addEventListener('mouseleave', (event) => {
                this.handleBoxHover(index, false, event);
            });
        });
    }

    /**
     * Handle box click
     */
    handleBoxClick(value, event) {
        let newValue = value;
        
        // If clicking the current value, decrease by 1
        if (value === this.currentValue) {
            newValue = Math.max(0, value - 1);
        }
        
        this.setValue(newValue);
        
        this.emit('trackbox:click', { 
            trackboxId: this.id, 
            value: newValue, 
            event 
        });
        
        if (this.onBoxClick) this.onBoxClick(newValue, event);
    }

    /**
     * Handle box hover
     */
    handleBoxHover(index, isHovering, event) {
        const box = this.boxes[index];
        if (isHovering) {
            box.classList.add('hover');
        } else {
            box.classList.remove('hover');
        }
    }

    /**
     * Update display
     */
    updateDisplay() {
        // Update header values
        const currentValueEl = this.element.querySelector('.current-value');
        const maxValueEl = this.element.querySelector('.max-value');
        
        if (currentValueEl) currentValueEl.textContent = this.currentValue;
        if (maxValueEl) maxValueEl.textContent = this.maxValue;

        // Update boxes
        this.boxes.forEach((box, index) => {
            const value = index + 1;
            box.className = 'track-box';
            
            if (this.lockable) {
                box.classList.add('lockable-box');
            }
            
            if (value <= this.currentValue) {
                box.classList.add('filled');
                
                // Add damage types
                if (this.type === 'health') {
                    if (value <= this.aggravated) {
                        box.classList.add('aggravated');
                    } else if (value <= this.aggravated + this.superficial) {
                        box.classList.add('superficial');
                    }
                }
            }
        });
    }

    /**
     * Set current value
     */
    setValue(value) {
        const oldValue = this.currentValue;
        this.currentValue = Math.max(0, Math.min(value, this.maxValue));
        
        this.updateDisplay();
        
        this.emit('trackbox:change', { 
            trackboxId: this.id, 
            oldValue, 
            newValue: this.currentValue 
        });
        
        if (this.onValueChange) this.onValueChange(this.currentValue, oldValue);
    }

    /**
     * Set damage values (for health track)
     */
    setDamage(superficial, aggravated) {
        this.superficial = Math.max(0, superficial);
        this.aggravated = Math.max(0, aggravated);
        
        // Ensure current value reflects damage
        const totalDamage = this.superficial + this.aggravated;
        this.currentValue = Math.max(0, this.maxValue - totalDamage);
        
        this.updateDisplay();
    }

    /**
     * Get current value
     */
    getValue() {
        return this.currentValue;
    }

    /**
     * Get damage values
     */
    getDamage() {
        return {
            superficial: this.superficial,
            aggravated: this.aggravated
        };
    }

    /**
     * Set max value
     */
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
        this.currentValue = Math.min(this.currentValue, maxValue);
        
        // Recreate boxes if max value changed
        this.recreateBoxes();
    }

    /**
     * Recreate boxes
     */
    recreateBoxes() {
        const boxesContainer = this.element.querySelector('.track-boxes');
        boxesContainer.innerHTML = '';
        this.boxes = [];
        
        for (let i = 0; i < this.maxValue; i++) {
            const box = document.createElement('div');
            box.className = 'track-box';
            box.dataset.index = i;
            box.dataset.value = i + 1;
            
            if (this.lockable) {
                box.classList.add('lockable-box');
            }
            
            boxesContainer.appendChild(box);
            this.boxes.push(box);
        }
        
        this.setupEventListeners();
        this.updateDisplay();
    }

    /**
     * Enable/disable track box
     */
    setDisabled(disabled) {
        this.disabled = disabled;
        if (this.element) {
            this.element.classList.toggle('disabled', disabled);
        }
    }

    /**
     * Get track box element
     */
    getElement() {
        return this.element;
    }

    /**
     * Destroy the track box component
     */
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.emit('trackbox:destroyed', { trackboxId: this.id });
    }

    /**
     * Static method to create a simple track box
     */
    static createSimpleTrackBox(type, maxValue, config = {}) {
        const trackBox = new TrackBoxComponent({
            type,
            maxValue,
            ...config
        });
        trackBox.init();
        return trackBox;
    }

    /**
     * Static method to create a health track
     */
    static createHealthTrack(maxValue, config = {}) {
        return TrackBoxComponent.createSimpleTrackBox('health', maxValue, config);
    }

    /**
     * Static method to create a willpower track
     */
    static createWillpowerTrack(maxValue, config = {}) {
        return TrackBoxComponent.createSimpleTrackBox('willpower', maxValue, config);
    }
}

// Assign to window
window.TrackBoxComponent = TrackBoxComponent; 