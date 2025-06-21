/**
 * ModalComponent - Shared component for creating Bootstrap modals
 * Extends BaseComponent to provide modal functionality
 */
class ModalComponent extends BaseComponent {
    constructor(config = {}) {
        super(config);
        this.modalId = config.modalId || `modal-${Date.now()}`;
        this.title = config.title || 'Modal';
        this.content = config.content || '';
        this.size = config.size || 'modal-dialog'; // modal-sm, modal-lg, modal-xl
        this.footer = config.footer || null;
        this.onShow = config.onShow || null;
        this.onHide = config.onHide || null;
        this.onConfirm = config.onConfirm || null;
        this.onCancel = config.onCancel || null;
        this.showCloseButton = config.showCloseButton !== false;
        this.showConfirmButton = config.showConfirmButton !== false;
        this.confirmText = config.confirmText || 'Confirm';
        this.cancelText = config.cancelText || 'Cancel';
        this.confirmClass = config.confirmClass || 'btn-primary';
        this.cancelClass = config.cancelClass || 'btn-secondary';
        
        this.modalInstance = null;
        this.element = null;
    }

    /**
     * Initialize the modal component
     */
    async init() {
        try {
            this.element = this.createModalElement();
            document.body.appendChild(this.element);
            this.modalInstance = new bootstrap.Modal(this.element);
            this.setupEventListeners();
            
            this.emit('modal:initialized', { modalId: this.modalId });
            return true;
        } catch (error) {
            console.error('ModalComponent init error:', error);
            this.emit('modal:error', { error, modalId: this.modalId });
            return false;
        }
    }

    /**
     * Create the modal HTML element
     */
    createModalElement() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = this.modalId;
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', `${this.modalId}-label`);
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML = `
            <div class="${this.size}">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${this.modalId}-label">${this.title}</h5>
                        ${this.showCloseButton ? '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>' : ''}
                    </div>
                    <div class="modal-body">
                        ${this.content}
                    </div>
                    ${this.footer || this.createDefaultFooter()}
                </div>
            </div>
        `;

        return modal;
    }

    /**
     * Create default footer with buttons
     */
    createDefaultFooter() {
        if (!this.showConfirmButton && !this.showCloseButton) {
            return '';
        }

        let footerHtml = '<div class="modal-footer">';
        
        if (this.showCloseButton) {
            footerHtml += `<button type="button" class="btn ${this.cancelClass}" data-bs-dismiss="modal">${this.cancelText}</button>`;
        }
        
        if (this.showConfirmButton) {
            footerHtml += `<button type="button" class="btn ${this.confirmClass}" id="${this.modalId}-confirm">${this.confirmText}</button>`;
        }
        
        footerHtml += '</div>';
        return footerHtml;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Show event
        this.element.addEventListener('show.bs.modal', (event) => {
            this.emit('modal:show', { modalId: this.modalId, event });
            if (this.onShow) this.onShow(event);
        });

        // Hide event
        this.element.addEventListener('hide.bs.modal', (event) => {
            this.emit('modal:hide', { modalId: this.modalId, event });
            if (this.onHide) this.onHide(event);
        });

        // Confirm button
        const confirmBtn = this.element.querySelector(`#${this.modalId}-confirm`);
        if (confirmBtn) {
            confirmBtn.addEventListener('click', (event) => {
                this.emit('modal:confirm', { modalId: this.modalId, event });
                if (this.onConfirm) this.onConfirm(event);
                this.hide();
            });
        }

        // Cancel/close events
        this.element.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-close') || 
                event.target.classList.contains(this.cancelClass.split(' ')[1])) {
                this.emit('modal:cancel', { modalId: this.modalId, event });
                if (this.onCancel) this.onCancel(event);
            }
        });
    }

    /**
     * Show the modal
     */
    show() {
        if (this.modalInstance) {
            this.modalInstance.show();
        }
    }

    /**
     * Hide the modal
     */
    hide() {
        if (this.modalInstance) {
            this.modalInstance.hide();
        }
    }

    /**
     * Update modal content
     */
    updateContent(content) {
        const body = this.element.querySelector('.modal-body');
        if (body) {
            body.innerHTML = content;
        }
    }

    /**
     * Update modal title
     */
    updateTitle(title) {
        const titleElement = this.element.querySelector('.modal-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }

    /**
     * Destroy the modal
     */
    destroy() {
        if (this.modalInstance) {
            this.modalInstance.dispose();
        }
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.emit('modal:destroyed', { modalId: this.modalId });
    }

    /**
     * Static method to create a simple modal
     */
    static createSimpleModal(config) {
        const modal = new ModalComponent(config);
        modal.init();
        return modal;
    }

    /**
     * Static method to show a confirmation dialog
     */
    static async showConfirm(title, message, options = {}) {
        return new Promise((resolve) => {
            const modal = new ModalComponent({
                title,
                content: `<p>${message}</p>`,
                showCloseButton: true,
                showConfirmButton: true,
                confirmText: options.confirmText || 'Confirm',
                cancelText: options.cancelText || 'Cancel',
                confirmClass: options.confirmClass || 'btn-danger',
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false),
                onHide: () => resolve(false)
            });
            
            modal.init().then(() => {
                modal.show();
            });
        });
    }

    /**
     * Static method to show an alert dialog
     */
    static showAlert(title, message, options = {}) {
        const modal = new ModalComponent({
            title,
            content: `<p>${message}</p>`,
            showCloseButton: true,
            showConfirmButton: false,
            cancelText: options.buttonText || 'OK',
            cancelClass: options.buttonClass || 'btn-primary'
        });
        
        modal.init().then(() => {
            modal.show();
        });
        
        return modal;
    }
}

// Assign to window
window.ModalComponent = ModalComponent; 