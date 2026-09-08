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
                const confirmBtn = modalElement.querySelector('#confirmBtn');
                confirmBtn.addEventListener('click', () => {
                    modalInstance.hide();
                    resolve(true);
                });

                const handleCancel = () => {
                    modalInstance.hide();
                    resolve(false);
                };

                modalElement.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
                    btn.addEventListener('click', handleCancel);
                });

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

        this.hideModal(modalId);

        $('body').append(modalHtml);
        const modalElement = document.getElementById(modalId);
        
        const modalInstance = new bootstrap.Modal(modalElement, {
            backdrop: options.backdrop !== false,
            keyboard: options.keyboard !== false
        });

        // Store active modal
        this.activeModals.set(modalId, { modalElement, modalInstance, options });

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
            if (modalData.modalElement && modalData.modalElement.parentNode) {
                modalData.modalElement.parentNode.removeChild(modalData.modalElement);
            }
            
            // Dispose Bootstrap modal instance
            if (modalData.modalInstance) {
                modalData.modalInstance.dispose();
            }
            
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

const modalManager = new ModalManager();

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
    window.modalManager = modalManager;
}

export { ModalManager, modalManager };
