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

// Create singleton instance
const toastManager = new ToastManager();

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
    window.toastManager = toastManager;
}

// Export the toast manager for use in other modules
export { toastManager };

export class TraitManagerUtils {
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
    static showConfirmModal(title, message, confirmText = 'Confirm', confirmClass = 'btn-primary') {
        return new Promise((resolve) => {
            const modalId = 'confirmModal_' + Date.now();
            const modalHtml = `
                <div class="modal fade" id="${modalId}" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content bg-dark text-light">
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${message}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelBtn_${modalId}">Cancel</button>
                                <button type="button" class="btn ${confirmClass}" id="confirmBtn_${modalId}">${confirmText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            $('body').append(modalHtml);
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            
            $(`#confirmBtn_${modalId}`).on('click', () => {
                modal.hide();
                resolve(true);
            });
            
            $(`#cancelBtn_${modalId}, .btn-close`).on('click', () => {
                modal.hide();
                resolve(false);
            });
            
            $(`#${modalId}`).on('hidden.bs.modal', function() {
                $(this).remove();
            });
            
            modal.show();
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
    static showSelectionModal(title, options, renderOption, onSelect) {
        const modalId = 'selectionModal_' + Date.now();
        const modalHtml = `
            <div class="modal fade" id="${modalId}" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="selection-options">
                                ${options.map((option, index) => renderOption(option, index)).join('')}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHtml);
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        
        // Bind selection events
        $(`#${modalId} .select-option-btn`).on('click', (e) => {
            const index = parseInt($(e.currentTarget).data('index'));
            onSelect(options[index], index);
            modal.hide();
        });
        
        $(`#${modalId}`).on('hidden.bs.modal', function() {
            $(this).remove();
        });
        
        modal.show();
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