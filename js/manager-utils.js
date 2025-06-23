// Shared utilities for managing character traits (Disciplines, Merits, Flaws, etc.)

/**
 * Toast Manager - Consolidated toast notification system
 * Supports application themes and provides consistent styling
 */
class ToastManager {
    constructor() {
        this.containerId = 'toastContainer';
        this.toastCounter = 0;
        this.initContainer();
    }

    /**
     * Initialize the toast container
     */
    initContainer() {
        if (!document.getElementById(this.containerId)) {
            const container = document.createElement('div');
            container.id = this.containerId;
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
    }

    /**
     * Show a toast notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, info, warning, danger)
     * @param {string} title - Optional title for the toast
     * @param {number} delay - Auto-hide delay in milliseconds (default: 5000)
     */
    show(message, type = 'info', title = null, delay = 5000) {
        const toastId = `toast-${++this.toastCounter}-${Date.now()}`;
        const icon = this.getToastIcon(type);
        const themeClass = this.getThemeClass(type);
        
        const toastHtml = `
            <div id="${toastId}" class="toast ${themeClass}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <i class="bi bi-${icon} me-2"></i>
                    <strong class="me-auto">${title || this.getDefaultTitle(type)}</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>`;
        
        // Remove existing toasts to prevent stacking
        this.removeExistingToasts();
        
        // Add toast to container
        const container = document.getElementById(this.containerId);
        container.insertAdjacentHTML('beforeend', toastHtml);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: delay
        });
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
        
        toast.show();
    }

    /**
     * Show success toast
     * @param {string} message - Message to display
     * @param {string} title - Optional title
     * @param {number} delay - Auto-hide delay
     */
    success(message, title = null, delay = 5000) {
        this.show(message, 'success', title, delay);
    }

    /**
     * Show error toast
     * @param {string} message - Message to display
     * @param {string} title - Optional title
     * @param {number} delay - Auto-hide delay
     */
    error(message, title = null, delay = 5000) {
        this.show(message, 'danger', title, delay);
    }

    /**
     * Show warning toast
     * @param {string} message - Message to display
     * @param {string} title - Optional title
     * @param {number} delay - Auto-hide delay
     */
    warning(message, title = null, delay = 5000) {
        this.show(message, 'warning', title, delay);
    }

    /**
     * Show info toast
     * @param {string} message - Message to display
     * @param {string} title - Optional title
     * @param {number} delay - Auto-hide delay
     */
    info(message, title = null, delay = 5000) {
        this.show(message, 'info', title, delay);
    }

    /**
     * Remove existing toasts to prevent stacking
     */
    removeExistingToasts() {
        const container = document.getElementById(this.containerId);
        if (container) {
            const existingToasts = container.querySelectorAll('.toast');
            existingToasts.forEach(toast => {
                const bsToast = bootstrap.Toast.getInstance(toast);
                if (bsToast) {
                    bsToast.hide();
                }
                toast.remove();
            });
        }
    }

    /**
     * Get the appropriate icon for toast type
     * @param {string} type - Toast type
     * @returns {string} Bootstrap icon name
     */
    getToastIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'danger': return 'exclamation-triangle';
            case 'warning': return 'exclamation-triangle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }

    /**
     * Get theme-appropriate CSS class for toast type
     * @param {string} type - Toast type
     * @returns {string} CSS class
     */
    getThemeClass(type) {
        const currentTheme = document.body.getAttribute('data-theme') || 'default';
        
        // For themes that have custom styling, we can use theme-specific classes
        if (currentTheme !== 'default') {
            return `bg-${type}`; // Use Bootstrap classes for now
        }
        
        // Default theme uses standard Bootstrap classes
        return `bg-${type}`;
    }

    /**
     * Get default title for toast type
     * @param {string} type - Toast type
     * @returns {string} Default title
     */
    getDefaultTitle(type) {
        switch (type) {
            case 'success': return 'Success';
            case 'danger': return 'Error';
            case 'warning': return 'Warning';
            case 'info': return 'Information';
            default: return 'Notification';
        }
    }
}

/**
 * Modal Manager - Consolidated modal system
 * Provides consistent modal creation, management, and cleanup
 */
class ModalManager {
    constructor() {
        this.modalCounter = 0;
        this.activeModals = new Map();
    }

    /**
     * Generate a unique modal ID
     * @param {string} prefix - Optional prefix for the modal ID
     * @returns {string} Unique modal ID
     */
    generateModalId(prefix = 'modal') {
        return `${prefix}_${++this.modalCounter}_${Date.now()}`;
    }

    /**
     * Create a basic modal structure
     * @param {Object} options - Modal configuration options
     * @returns {Object} Object with modalId, modalHtml, and modalElement
     */
    createModal(options = {}) {
        const {
            id = this.generateModalId(),
            title = '',
            content = '',
            size = 'default', // default, sm, lg, xl
            centered = false,
            scrollable = false,
            backdrop = true,
            keyboard = true,
            showCloseButton = true,
            footer = '',
            customClass = '',
            onShow = null,
            onHide = null,
            onHidden = null
        } = options;

        // Size classes
        const sizeClass = size !== 'default' ? `modal-${size}` : '';
        
        // Additional classes
        const additionalClasses = [];
        if (centered) additionalClasses.push('modal-dialog-centered');
        if (scrollable) additionalClasses.push('modal-dialog-scrollable');
        
        const modalHtml = `
            <div class="modal fade ${customClass}" id="${id}" tabindex="-1" aria-labelledby="${id}-label" aria-hidden="true">
                <div class="modal-dialog ${sizeClass} ${additionalClasses.join(' ')}">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${id}-label">${title}</h5>
                            ${showCloseButton ? '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>' : ''}
                        </div>
                        <div class="modal-body" id="${id}-content">
                            ${content}
                        </div>
                        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
                    </div>
                </div>
            </div>`;

        return {
            modalId: id,
            modalHtml: modalHtml,
            modalElement: null,
            options: options
        };
    }

    /**
     * Show a confirmation modal
     * @param {string} title - Modal title
     * @param {string} message - Modal message
     * @param {Object} options - Additional options
     * @returns {Promise<boolean>} Promise that resolves to true if confirmed
     */
    async confirm(title, message, options = {}) {
        const {
            confirmText = 'Confirm',
            cancelText = 'Cancel',
            confirmClass = 'btn-primary',
            cancelClass = 'btn-secondary',
            size = 'default',
            centered = true
        } = options;

        const footer = `
            <button type="button" class="btn ${cancelClass}" data-bs-dismiss="modal">${cancelText}</button>
            <button type="button" class="btn ${confirmClass}" id="confirmBtn">${confirmText}</button>
        `;

        const modalConfig = this.createModal({
            title,
            content: message,
            footer,
            size,
            centered,
            ...options
        });

        return new Promise((resolve) => {
            this.showModal(modalConfig, (modalElement, modalInstance) => {
                // Handle confirm button
                const confirmBtn = modalElement.querySelector('#confirmBtn');
                confirmBtn.addEventListener('click', () => {
                    modalInstance.hide();
                    resolve(true);
                });

                // Handle cancel/close
                const handleCancel = () => {
                    modalInstance.hide();
                    resolve(false);
                };

                modalElement.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
                    btn.addEventListener('click', handleCancel);
                });

                // Handle escape key and backdrop click
                modalElement.addEventListener('hidden.bs.modal', () => {
                    resolve(false);
                });
            });
        });
    }

    /**
     * Show an information modal
     * @param {string} title - Modal title
     * @param {string} content - Modal content (HTML)
     * @param {Object} options - Additional options
     * @returns {Promise<void>} Promise that resolves when modal is closed
     */
    async info(title, content, options = {}) {
        const {
            size = 'default',
            centered = true,
            scrollable = true
        } = options;

        const modalConfig = this.createModal({
            title,
            content,
            size,
            centered,
            scrollable,
            ...options
        });

        return new Promise((resolve) => {
            this.showModal(modalConfig, (modalElement, modalInstance) => {
                modalElement.addEventListener('hidden.bs.modal', () => {
                    resolve();
                });
            });
        });
    }

    /**
     * Show a selection modal
     * @param {string} title - Modal title
     * @param {Array} options - Array of options to choose from
     * @param {Function} renderOption - Function to render each option
     * @param {Object} modalOptions - Additional modal options
     * @returns {Promise<Object>} Promise that resolves to selected option and index
     */
    async select(title, options, renderOption, modalOptions = {}) {
        const {
            size = 'lg',
            scrollable = true
        } = modalOptions;

        const content = `
            <div class="selection-options">
                ${options.map((option, index) => renderOption(option, index)).join('')}
            </div>
        `;

        const modalConfig = this.createModal({
            title,
            content,
            size,
            scrollable,
            footer: '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>',
            ...modalOptions
        });

        return new Promise((resolve) => {
            this.showModal(modalConfig, (modalElement, modalInstance) => {
                // Bind selection events
                modalElement.querySelectorAll('.select-option-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const index = parseInt(e.currentTarget.dataset.index);
                        modalInstance.hide();
                        resolve({ option: options[index], index });
                    });
                });

                // Handle cancel
                modalElement.addEventListener('hidden.bs.modal', () => {
                    resolve(null);
                });
            });
        });
    }

    /**
     * Show a custom modal with full control
     * @param {Object} options - Modal configuration
     * @param {Function} onReady - Callback when modal is ready (receives modalElement, modalInstance)
     * @returns {Object} Object with modalElement and modalInstance
     */
    showCustom(options, onReady = null) {
        const modalConfig = this.createModal(options);
        return this.showModal(modalConfig, onReady);
    }

    /**
     * Internal method to show a modal
     * @param {Object} modalConfig - Modal configuration object
     * @param {Function} onReady - Callback when modal is ready
     * @returns {Object} Object with modalElement and modalInstance
     */
    showModal(modalConfig, onReady = null) {
        const { modalId, modalHtml, options } = modalConfig;

        // Remove existing modal if it exists
        this.hideModal(modalId);

        // Add modal to DOM
        $('body').append(modalHtml);
        const modalElement = document.getElementById(modalId);
        
        // Create Bootstrap modal instance
        const modalInstance = new bootstrap.Modal(modalElement, {
            backdrop: options.backdrop !== false,
            keyboard: options.keyboard !== false
        });

        // Store active modal
        this.activeModals.set(modalId, { modalElement, modalInstance, options });

        // Set up event handlers
        if (options.onShow) {
            modalElement.addEventListener('show.bs.modal', options.onShow);
        }
        if (options.onHide) {
            modalElement.addEventListener('hide.bs.modal', options.onHide);
        }
        if (options.onHidden) {
            modalElement.addEventListener('hidden.bs.modal', options.onHidden);
        }

        // Always clean up on hidden
        modalElement.addEventListener('hidden.bs.modal', () => {
            this.cleanupModal(modalId);
        });

        // Call onReady callback if provided
        if (onReady) {
            onReady(modalElement, modalInstance);
        }

        // Show the modal
        modalInstance.show();

        return { modalElement, modalInstance };
    }

    /**
     * Hide a specific modal
     * @param {string} modalId - ID of modal to hide
     */
    hideModal(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (modalData) {
            modalData.modalInstance.hide();
        }
    }

    /**
     * Hide all active modals
     */
    hideAllModals() {
        this.activeModals.forEach((modalData, modalId) => {
            modalData.modalInstance.hide();
        });
    }

    /**
     * Clean up modal resources
     * @param {string} modalId - ID of modal to cleanup
     */
    cleanupModal(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (modalData) {
            // Remove from DOM
            if (modalData.modalElement && modalData.modalElement.parentNode) {
                modalData.modalElement.parentNode.removeChild(modalData.modalElement);
            }
            
            // Dispose Bootstrap modal instance
            if (modalData.modalInstance) {
                modalData.modalInstance.dispose();
            }
            
            // Remove from active modals
            this.activeModals.delete(modalId);
        }
    }

    /**
     * Get modal instance by ID
     * @param {string} modalId - Modal ID
     * @returns {Object|null} Modal data or null if not found
     */
    getModal(modalId) {
        return this.activeModals.get(modalId) || null;
    }

    /**
     * Check if a modal is currently active
     * @param {string} modalId - Modal ID
     * @returns {boolean} True if modal is active
     */
    isModalActive(modalId) {
        return this.activeModals.has(modalId);
    }

    /**
     * Get count of active modals
     * @returns {number} Number of active modals
     */
    getActiveModalCount() {
        return this.activeModals.size;
    }
}

// Create singleton instances
const toastManager = new ToastManager();
const modalManager = new ModalManager();

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
    window.toastManager = toastManager;
    window.modalManager = modalManager;
}

class TraitManagerUtils {
    /**
     * Create dots HTML for displaying trait levels
     * @param {number} value - Current value
     * @param {number} maxDots - Maximum number of dots
     * @param {string} className - Additional CSS class for dots
     * @returns {string} HTML string for dots
     */
    static createDots(value, maxDots = 5, className = '') {
        let dotsHtml = '';
        for (let i = 0; i < maxDots; i++) {
            dotsHtml += `<div class="dot${i < value ? ' filled' : ''} ${className}" data-value="${i + 1}"></div>`;
        }
        return dotsHtml;
    }

    /**
     * Capitalize first letter of a string
     * @param {string} str - String to capitalize
     * @returns {string} Capitalized string
     */
    static capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Convert camelCase to Title Case
     * @param {string} str - camelCase string
     * @returns {string} Title Case string
     */
    static camelToTitle(str) {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }

    /**
     * Create a confirmation modal
     * @param {string} title - Modal title
     * @param {string} message - Modal message
     * @param {string} confirmText - Confirm button text
     * @param {string} confirmClass - Confirm button CSS class
     * @returns {Promise<boolean>} Promise that resolves to true if confirmed
     */
    static async showConfirmModal(title, message, confirmText = 'Confirm', confirmClass = 'btn-primary') {
        return await modalManager.confirm(title, message, {
            confirmText,
            confirmClass
        });
    }

    static initTooltips(selectors){
        $(selectors.join(', ') + ' [data-bs-toggle="tooltip"]').each(function(){
           const t = bootstrap.Tooltip.getInstance(this);
           if(t) t.dispose();
           new bootstrap.Tooltip(this);
        });
      }
      
    static refreshDots($dots, level){
        $dots.find('.dot').each((i,el)=>$(el).toggleClass('filled', i<level));
        $dots.data('value',level).attr('data-value',level);
      }
      
    static mapToPlainObject(map){
        const obj={};
        map.forEach((v,k)=>{ obj[k]={...v, instances:v.instances||[{level:v.level}] };});
        return obj;
      }
      
    static sumLevels(map){
        let total=0;
        map.forEach(v=> (v.instances||[{level:v.level}]).forEach(i=> total+=i.level));
        return total;
      }
    /**
     * Parse dots notation (like "••" or "• - •••") to get min/max values and special properties
     * @param {string} dotsString - String containing dots notation
     * @returns {Object} Object with min, max, canRepeat, hasOr, and orValues properties
     */
    static parseDotsNotation(dotsString) {
        if (!dotsString) return { min: 0, max: 0, canRepeat: false, hasOr: false, orValues: [] };
        
        // Convert number to string if needed
        if (typeof dotsString === 'number') {
            return {
                min: dotsString,
                max: dotsString,
                canRepeat: false,
                hasOr: false,
                orValues: []
            };
        }
        
        // Handle parentheses for flaws
        const cleanString = dotsString.replace(/[()]/g, '');
        
        // Check for "or" notation like "•• or ••••"
        if (cleanString.includes(' or ')) {
            const parts = cleanString.split(' or ');
            const orValues = parts.map(part => part.trim().length);
            return {
                min: Math.min(...orValues),
                max: Math.max(...orValues),
                canRepeat: false,
                hasOr: true,
                orValues: orValues
            };
        }
        
        // Check for repeatable notation like "• +"
        if (cleanString.includes(' +')) {
            const baseDots = cleanString.replace(' +', '').length;
            return {
                min: baseDots,
                max: baseDots,
                canRepeat: true,
                hasOr: false,
                orValues: []
            };
        }
        
        // Handle range notation like "• - •••"
        if (cleanString.includes(' - ')) {
            const parts = cleanString.split(' - ');
            return {
                min: parts[0].length,
                max: parts[1].length,
                canRepeat: false,
                hasOr: false,
                orValues: []
            };
        }
        
        // Handle single value like "••"
        const dotCount = cleanString.length;
        return {
            min: dotCount,
            max: dotCount,
            canRepeat: false,
            hasOr: false,
            orValues: []
        };
    }

    /**
     * Format dots notation for display
     * @param {string} dotsString - Original dots string
     * @param {number} currentValue - Current selected value
     * @returns {string} Formatted display string
     */
    static formatDotsDisplay(dotsString, currentValue = 0) {
        const { min, max } = this.parseDotsNotation(dotsString);
        
        if (min === max) {
            return `${dotsString} (${currentValue > 0 ? currentValue : min} dot${min !== 1 ? 's' : ''})`;
        } else {
            return `${dotsString} (${currentValue > 0 ? currentValue : min}-${max} dots)`;
        }
    }

    /**
     * Validate if a value is within the allowed range for a trait
     * @param {number} value - Value to validate
     * @param {string} dotsString - Dots notation string
     * @returns {boolean} True if valid
     */
    static isValidValue(value, dotsString) {
        const { min, max } = this.parseDotsNotation(dotsString);
        return value >= 0 && value <= max && (value === 0 || value >= min);
    }

    /**
     * Get available values for a trait based on its dots notation
     * @param {string} dotsString - Dots notation string
     * @returns {Array<number>} Array of valid values
     */
    static getValidValues(dotsString) {
        const { min, max } = this.parseDotsNotation(dotsString);
        const values = [0]; // Always allow 0 (not taken)
        
        for (let i = min; i <= max; i++) {
            values.push(i);
        }
        
        return values;
    }

    /**
     * Create a selection modal for choosing from a list of options
     * @param {string} title - Modal title
     * @param {Array} options - Array of option objects with name, description, etc.
     * @param {Function} renderOption - Function to render each option
     * @param {Function} onSelect - Callback when option is selected
     */
    static async showSelectionModal(title, options, renderOption, onSelect) {
        const result = await modalManager.select(title, options, renderOption);
        if (result) {
            onSelect(result.option, result.index);
        }
    }

    /**
     * Debounce function to limit how often a function can be called
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Deep clone an object
     * @param {Object} obj - Object to clone
     * @returns {Object} Cloned object
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    // NEW HELPERS ----------------------------------------------------------
    /**
     * Common logic used by multiple managers to translate a parsed dotsInfo
     * object into UI metadata (max dots to draw, trait type css-class, and
     * tooltip text).
     * @param {Object} dotsInfo – output of parseDotsNotation()
     * @param {string} nounSingular – word to use in tooltip (e.g. "merit", "background")
     * @returns {{ maxDots:number, traitTypeClass:string, tooltipText:string }}
     */
    static getDotsMeta(dotsInfo, nounSingular = 'trait') {
        let maxDots;
        let traitTypeClass = '';
        let tooltipText = '';

        if (dotsInfo.hasOr) {
            traitTypeClass = 'or';
            maxDots = Math.max(...dotsInfo.orValues);
            tooltipText = `Can be taken at ${dotsInfo.orValues.join(' or ')} dots. Click valid dot values: ${dotsInfo.orValues.map(v => '•'.repeat(v)).join(' or ')}.`;
        } else if (dotsInfo.canRepeat) {
            traitTypeClass = 'repeat';
            maxDots = dotsInfo.max;
            tooltipText = `Repeatable ${nounSingular} (${dotsInfo.min} dot${dotsInfo.min !== 1 ? 's' : ''} each). Can be taken multiple times.`;
        } else if (dotsInfo.min !== dotsInfo.max) {
            traitTypeClass = 'range';
            maxDots = dotsInfo.max;
            tooltipText = `Can be taken at ${dotsInfo.min}-${dotsInfo.max} dots. Click dots to set level.`;
        } else {
            traitTypeClass = 'fixed';
            maxDots = dotsInfo.max;
            tooltipText = `Fixed cost: ${dotsInfo.min} dot${dotsInfo.min !== 1 ? 's' : ''}. Cannot be changed.`;
        }

        return { maxDots, traitTypeClass, tooltipText };
    }

    /**
     * Build <option> HTML elements for a trait select dropdown.
     * Shared across multiple managers so the identical filtering/label logic
     * isn't re-implemented.
     *
     * @param {Object} traits               – object keyed by traitKey
     * @param {Map}    selectedTraitsMap    – Map of currently selected traits
     * @param {string} categoryKey          – category the traits belong to (used for data-category attr)
     * @returns {string} raw HTML string with <option> elements
     */
    static generateTraitOptions(traits, selectedTraitsMap, categoryKey) {
        if (!traits || Object.keys(traits).length === 0) return '';

        return Object.keys(traits)
            .filter(traitKey => {
                const trait = traits[traitKey];
                const dotsInfo = this.parseDotsNotation(trait.dots);

                if (dotsInfo.canRepeat) return true; // always allow repeatables
                return !selectedTraitsMap.has(traitKey);
            })
            .map(traitKey => {
                const trait = traits[traitKey];
                const displayName = trait.name || this.camelToTitle(traitKey);
                const dotsInfo = this.parseDotsNotation(trait.dots);

                let suffix = '';
                if (dotsInfo.canRepeat && selectedTraitsMap.has(traitKey)) {
                    const instances = selectedTraitsMap.get(traitKey).instances || [];
                    suffix = ` (${instances.length} taken)`;
                }

                return `<option value="${traitKey}" data-category="${categoryKey}">${displayName}${suffix}</option>`;
            })
            .join('');
    }
}

// Export the classes and instances
export { TraitManagerUtils, ToastManager, ModalManager, toastManager, modalManager };