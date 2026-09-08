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
            container.className = 'toast-container position-fixed top-0 end-0 p-3 manager-container';
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
        
        const container = document.getElementById(this.containerId);
        container.insertAdjacentHTML('beforeend', toastHtml);
        
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: delay
        });
        
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

const toastManager = new ToastManager();

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
    window.toastManager = toastManager;
}

export { ToastManager, toastManager };
