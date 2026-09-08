import { toastManager } from './toast-manager.js';
import { modalManager } from './modal-manager.js';

// Shared utilities for managing character traits (Disciplines, Merits, Flaws, etc.)
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
            tooltipText = `Can be taken at ${dotsInfo.min}-${dotsInfo.max} dots. Click dots to set level. Can be purchased multiple times.`;
        } else {
            traitTypeClass = 'fixed';
            maxDots = dotsInfo.max;
            tooltipText = `Fixed cost: ${dotsInfo.min} dot${dotsInfo.min !== 1 ? 's' : ''}. Can be purchased multiple times.`;
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
            .map(traitKey => {
                const trait = traits[traitKey];
                const displayName = trait.name || this.camelToTitle(traitKey);
                const dotsInfo = this.parseDotsNotation(trait.dots);

                let suffix = '';
                if (selectedTraitsMap.has(traitKey)) {
                    const instances = selectedTraitsMap.get(traitKey).instances || [];
                    suffix = ` (${instances.length} taken)`;
                }

                return `<option value="${traitKey}" data-category="${categoryKey}">${displayName}${suffix}</option>`;
            })
            .join('');
    }

    /**
     * Show feedback message using toast notifications
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, info, warning, danger)
     * @param {string} title - Optional title for the toast
     */
    static showFeedback(message, type = 'info', title = null) {
        toastManager.show(message, type, title);
    }

    /**
     * Shared fixed/or/range dot-click logic for trait managers.
     * @param {Object} dotsInfo - output of parseDotsNotation()
     * @param {string} traitTypeClass - 'fixed' | 'or' | 'range' | 'repeat' | 'varies'
     * @param {number} currentValue - current instance level
     * @param {number} clickedValue - clicked dot value (1-based)
     * @returns {number|null} new level, or null if fixed/no-op
     */
    static computeNewDotValue(dotsInfo, traitTypeClass, currentValue, clickedValue) {
        if (traitTypeClass === 'fixed' || traitTypeClass === 'varies') {
            return null;
        }

        if (traitTypeClass === 'or') {
            if (dotsInfo.orValues.includes(clickedValue)) {
                return clickedValue;
            }
            const validValues = [...dotsInfo.orValues].sort((a, b) => a - b);
            if (clickedValue < validValues[0]) {
                return currentValue > 0 ? 0 : validValues[0];
            }
            const nextValid = validValues.find(v => v >= clickedValue);
            return nextValid || validValues[validValues.length - 1];
        }

        // range / repeat (and any other adjustable class)
        let newValue;
        if (clickedValue === currentValue) {
            newValue = Math.max(clickedValue - 1, 0);
            if (newValue > 0 && newValue < dotsInfo.min) {
                newValue = 0;
            }
        } else if (clickedValue > currentValue) {
            newValue = Math.min(clickedValue, dotsInfo.max);
            if (newValue > 0 && newValue < dotsInfo.min) {
                newValue = dotsInfo.min;
            }
        } else {
            newValue = Math.max(clickedValue, 0);
            if (newValue > 0 && newValue < dotsInfo.min) {
                newValue = 0;
            }
        }
        return newValue;
    }
}

export { TraitManagerUtils };
