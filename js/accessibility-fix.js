/**
 * Accessibility fix for Bootstrap components
 * 
 * This script fixes accessibility issues including:
 * 1. The "Blocked aria-hidden on an element because its descendant retained focus"
 *    warning for modals by applying the `inert` attribute as recommended by WAI-ARIA
 * 2. Improves dropdown accessibility by ensuring proper focus management
 */

// Create a global accessibility handler that can be used by all scripts


window.accessibilityFix = {
    /**
     * Store the last trigger element for a modal
     * @param {HTMLElement} modal - The modal element
     * @param {HTMLElement} trigger - The trigger button
     */
    storeTrigger: function(modal, trigger) {
        if (modal && trigger) {
            modal._lastTrigger = trigger;
            // Also store globally
            window._lastActiveElement = trigger;
        }
    }
};

/*
 * Automatically upgrade any element that only has a plain `title` attribute
 * into a proper Bootstrap 5 tooltip trigger, unless it already declares
 * `data-bs-toggle="tooltip"` (or is an <option> element, which cannot host
 * a tooltip).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Find all elements with a title but without data-bs-toggle
    const candidates = document.querySelectorAll('[title]:not([data-bs-toggle])');
  
    candidates.forEach(el => {
      // Skip <option> elements – tooltips cannot attach to them and they break
      if (el.tagName.toLowerCase() === 'option') return;
  
      // Convert to tooltip trigger
      el.setAttribute('data-bs-toggle', 'tooltip');
      el.setAttribute('data-bs-placement', el.getAttribute('data-bs-placement') || 'top');
  
      // Initialise immediately
      new bootstrap.Tooltip(el);
    });
  }); 

// Fix specific modals by ID
function fixSpecificModals() {
    // First check if the modals actually exist
    const predatorModal = document.getElementById('predator-info-modal');
    const clanModal = document.getElementById('clan-info-modal');
    
    // Apply fixes if they exist
    if (predatorModal) {
        fixModalAccessibility(predatorModal);
    }
    
    if (clanModal) {
        fixModalAccessibility(clanModal);
    }
    
    // Also set up a global click handler for the specific info buttons
    setupInfoButtonHandlers();
}

// Set up handlers for the clan and predator info buttons
function setupInfoButtonHandlers() {
    document.body.addEventListener('click', function(event) {
        // Check if the click was on an info button
        const target = event.target.closest('.predator-info-button, .clan-info-button');
        if (!target) return;
                
        // Store this button as the last active element
        window._lastActiveElement = target;
        
        // After a small delay, the modal will be open and we can store the trigger
        setTimeout(function() {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                modal._lastTrigger = target;
            }
        }, 50);
    });
}

/**
 * Apply accessibility fixes to a modal
 * @param {HTMLElement} modal - The modal element to fix
 */
function fixModalAccessibility(modal) {
    if (!modal || modal._accessibilityFixed) return;
        
    // Mark as fixed to avoid duplicate handling
    modal._accessibilityFixed = true;
    
    // Replace the close button to prevent focus issues
    replaceCloseButton(modal);
    
    // Set up event handlers for focus management
    setupModalEvents(modal);
    
    // Set initial inert state
    if (!modal.classList.contains('show')) {
        modal.setAttribute('inert', '');
    }
}

/**
 * Replace the close button with one that manages focus properly
 */
function replaceCloseButton(modal) {
    // Wait for the close button to be available
    waitForElement(modal, '.btn-close').then(closeBtn => {
        if (!closeBtn) return;
                
        // Create a new button with the same appearance
        const newBtn = document.createElement('button');
        newBtn.type = 'button';
        newBtn.className = 'btn-close btn-close-white';
        newBtn.setAttribute('aria-label', 'Close');
        
        // Add our custom click handler
        newBtn.addEventListener('click', function(e) {
            // Prevent the default Bootstrap behavior
            e.preventDefault();
            e.stopPropagation();
                        
            // Immediately move focus away
            document.body.focus();
            
            // Then focus the trigger if available
            if (modal._lastTrigger) {
                modal._lastTrigger.focus();
            } else if (window._lastActiveElement) {
                window._lastActiveElement.focus();
            }
            
            // Apply inert to prevent focus
            modal.setAttribute('inert', '');
            
            // Get the modal instance and hide it
            const instance = bootstrap.Modal.getInstance(modal);
            if (instance) {
                // Use a small delay to ensure focus happens first
                setTimeout(() => instance.hide(), 10);
            }
            
            return false;
        }, true); // Use capture to get the event first
        
        // Replace the old button
        closeBtn.parentNode.replaceChild(newBtn, closeBtn);
    });
}

/**
 * Set up event handlers for the modal
 */
function setupModalEvents(modal) {
    // Before the modal is shown
    modal.addEventListener('show.bs.modal', function(e) {
        // Remove inert so the modal can be interacted with
        this.removeAttribute('inert');
    });
    
    // Before the modal starts to hide
    modal.addEventListener('hide.bs.modal', function(e) {
        
        // Move focus back to the trigger
        if (this._lastTrigger) {
            this._lastTrigger.focus();
        } else if (window._lastActiveElement) {
            window._lastActiveElement.focus();
        }
        
        // Apply inert to prevent focus
        this.setAttribute('inert', '');
    });
}

/**
 * Wait for an element to be available in the DOM
 * @param {HTMLElement} parent - The parent element
 * @param {string} selector - CSS selector to find
 * @returns {Promise<HTMLElement>} - Promise resolving to the element
 */
function waitForElement(parent, selector) {
    return new Promise((resolve) => {
        // First check if it already exists
        const element = parent.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        // Set up an observer to watch for it
        const observer = new MutationObserver((mutations) => {
            const element = parent.querySelector(selector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });
        
        // Start observing
        observer.observe(parent, {
            childList: true,
            subtree: true
        });
        
        // Also resolve after a timeout
        setTimeout(() => {
            observer.disconnect();
            resolve(parent.querySelector(selector));
        }, 2000);
    });
}

/**
 * Fix accessibility issues in dropdowns
 */
function fixDropdownAccessibility() {
    // Find all clan dropdowns
    const clanDropdowns = document.querySelectorAll('.clan-dropdown');
    const predatorDropdowns = document.querySelectorAll('.predator-dropdown');
    
    // Fix clan dropdowns
    clanDropdowns.forEach(fixSingleDropdown);
    
    // Fix predator dropdowns
    predatorDropdowns.forEach(fixSingleDropdown);
    
    // Also set up a global handler for dropdowns
    setupDropdownHandlers();
}

/**
 * Fix accessibility for a single dropdown
 */
function fixSingleDropdown(dropdown) {
    if (!dropdown || dropdown._accessibilityFixed) return;
    
    // Mark as fixed
    dropdown._accessibilityFixed = true;
    
   
    // Add appropriate ARIA attributes
    dropdown.setAttribute('aria-haspopup', 'listbox');
    
    // Look for the info button
    const parent = dropdown.parentElement;
    if (!parent) return;
    
    // Find the info button (it's usually a sibling)
    const infoButton = parent.querySelector('.clan-info-button, .predator-info-button');
    if (infoButton) {
        
        // Make sure the button has proper attributes
        infoButton.setAttribute('aria-haspopup', 'dialog');
        infoButton.setAttribute('aria-expanded', 'false');
        
        // When the button is clicked, store the dropdown as the return focus target
        infoButton.addEventListener('click', function() {
            
            // Store the dropdown as the last active element
            window._lastActiveElement = dropdown;
            
            // Also try to find the associated modal
            const modalId = infoButton.classList.contains('clan-info-button')
                ? 'clan-info-modal'
                : 'predator-info-modal';
                
            const modal = document.getElementById(modalId);
            if (modal) {
                modal._lastTrigger = dropdown;
            }
        });
    }
}

/**
 * Set up global handlers for dropdowns
 */
function setupDropdownHandlers() {
    // Listen for any dropdown change events
    document.body.addEventListener('change', function(event) {
        const target = event.target;
        if (!target) return;
        
        // Check if this is a clan or predator dropdown
        if (target.classList.contains('clan-dropdown') || 
            target.classList.contains('predator-dropdown')) {
                        
            // Find the associated info button
            const parent = target.parentElement;
            if (!parent) return;
            
            const infoButton = parent.querySelector('.clan-info-button, .predator-info-button');
            if (infoButton) {
                // Update aria-expanded
                const hasValue = target.value && target.value !== '';
                infoButton.setAttribute('aria-expanded', hasValue ? 'true' : 'false');
            }
        }
    });
}

// Wait for the DOM to be ready, then apply fixes
document.addEventListener('DOMContentLoaded', function() {
    
    // Run the fixes immediately
    fixSpecificModals();
    fixDropdownAccessibility();
    
    // And again after a delay to catch any dynamic content
    setTimeout(function() {
        fixSpecificModals();
        fixDropdownAccessibility();
    }, 500);
    
    setTimeout(function() {
        fixSpecificModals();
        fixDropdownAccessibility();
    }, 1000);
});

// Also run when the page is fully loaded
window.addEventListener('load', function() {
    fixSpecificModals();
    fixDropdownAccessibility();
});

// Add a special direct fix for the clan modal close button
function fixClanModalCloseButton() {
    const clanModal = document.getElementById('clan-info-modal');
    if (!clanModal) {
        
        // Set up a mutation observer to watch for the modal being added
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.id === 'clan-info-modal') {
                            fixCloseButtonDirectly(node);
                            break;
                        }
                    }
                }
            });
        });
        
        // Start observing the body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        return;
    }
    
    fixCloseButtonDirectly(clanModal);
}

// Direct fix for modal close button
function fixCloseButtonDirectly(modal) {
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.btn-close');
    if (!closeBtn) {
        return;
    }
    
    
    // Create a new button with proper behavior
    const newBtn = document.createElement('button');
    newBtn.type = 'button';
    newBtn.className = 'btn-close btn-close-white';
    newBtn.setAttribute('aria-label', 'Close');
    
    // Remove data-bs-dismiss if present
    newBtn.removeAttribute('data-bs-dismiss');
    
    // Add our custom click handler
    newBtn.addEventListener('click', function(e) {
        
        // Prevent default behavior
        e.preventDefault();
        e.stopPropagation();
        
        // Immediately blur and move focus away
        this.blur();
        document.body.focus();
        
        // Find the source element that opened this modal
        if (modal._lastTrigger) {
            modal._lastTrigger.focus();
        } else if (window._lastActiveElement) {
            window._lastActiveElement.focus();
        }
        
        // Add inert to prevent focus
        modal.setAttribute('inert', '');
        
        // Find and use Bootstrap's Modal.hide()
        const instance = bootstrap.Modal.getInstance(modal);
        if (instance) {
            setTimeout(() => instance.hide(), 10);
        }
        
        return false;
    }, true);
    
    // Replace the original button
    closeBtn.parentNode.replaceChild(newBtn, closeBtn);
    
    // Also ensure we have event handlers on the modal
    $(modal).off('hide.bs.modal').on('hide.bs.modal', function() {
        if (this._lastTrigger) {
            this._lastTrigger.focus();
        } else if (window._lastActiveElement) {
            window._lastActiveElement.focus();
        }
        this.setAttribute('inert', '');
    });
}

// Run our direct fix
document.addEventListener('DOMContentLoaded', fixClanModalCloseButton);
setTimeout(fixClanModalCloseButton, 1000);
setTimeout(fixClanModalCloseButton, 2000);