/**
 * BaseComponent - Foundation class for all components in The Ledger
 * Provides lifecycle management, event handling, and rendering capabilities
 */
class BaseComponent {
    /**
     * Create a new BaseComponent instance
     * @param {string} id - Unique identifier for the component
     * @param {Object} config - Configuration object for the component
     */
    constructor(id, config = {}) {
        this.id = id;
        this.config = config;
        this.element = null;
        this.isMounted = false;
        this.eventListeners = new Map();
        this._initialized = false;
        this._destroyed = false;
        this._errorBoundary = null;
        
        // Bind methods to preserve context
        this.on = this.on.bind(this);
        this.emit = this.emit.bind(this);
        this.off = this.off.bind(this);
    }

    /**
     * Initialize the component
     * Called before mounting to set up any necessary resources
     * @returns {Promise<void>}
     */
    async init() {
        try {
            if (this._initialized) {
                console.warn(`Component ${this.id} already initialized`);
                return;
            }

            if (this._destroyed) {
                throw new Error(`Cannot initialize destroyed component ${this.id}`);
            }

            // Start loading state
            this.showLoading('Initializing component...');

            // Register with event bus
            if (window.eventBus) {
                window.eventBus.registerComponent(this.id, this);
            }

            // Call custom initialization if defined
            if (typeof this.onInit === 'function') {
                await this.onInit();
            }

            this._initialized = true;
            console.log(`Component ${this.id} initialized successfully`);

            // End loading state
            this.hideLoading(true);

            // Emit component initialized event
            this._emitComponentEvent('initialized');

        } catch (error) {
            console.error(`Failed to initialize component ${this.id}:`, error);
            
            // End loading state with error
            this.hideLoading(false);
            this.showError(error);
            
            this._emitComponentEvent('error', { error });
            throw error;
        }
    }

    /**
     * Mount the component to a container element
     * @param {HTMLElement} container - The container element to mount to
     * @returns {Promise<void>}
     */
    async mount(container) {
        try {
            if (!this._initialized) {
                await this.init();
            }

            if (this.isMounted) {
                console.warn(`Component ${this.id} already mounted`);
                return;
            }

            if (this._destroyed) {
                throw new Error(`Cannot mount destroyed component ${this.id}`);
            }

            if (!container || !(container instanceof HTMLElement)) {
                throw new Error(`Invalid container provided for component ${this.id}`);
            }

            // Start loading state
            this.showLoading('Mounting component...');

            // Render the component
            const html = this.render();
            if (typeof html !== 'string') {
                throw new Error(`Component ${this.id} render() method must return a string`);
            }

            // Create a temporary container to parse HTML
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = html.trim();

            // Get the first child element (the actual component element)
            const componentElement = tempContainer.firstElementChild;
            if (!componentElement) {
                throw new Error(`Component ${this.id} render() method must return valid HTML with a root element`);
            }

            // Set the component element
            this.element = componentElement;
            this.element.setAttribute('data-component-id', this.id);

            // Append to container
            container.appendChild(this.element);

            // Call afterRender for post-render setup
            await this.afterRender();

            this.isMounted = true;
            console.log(`Component ${this.id} mounted successfully`);

            // End loading state
            this.hideLoading(true);

            // Emit component mounted event
            this._emitComponentEvent('mounted');
            if (window.viewEventSystem) {
                window.viewEventSystem.emitComponentMounted(this.id, this.config.viewName || 'unknown');
            }

        } catch (error) {
            console.error(`Failed to mount component ${this.id}:`, error);
            
            // End loading state with error
            this.hideLoading(false);
            this.showError(error);
            
            this._emitComponentEvent('error', { error });
            throw error;
        }
    }

    /**
     * Unmount the component from its container
     * @returns {Promise<void>}
     */
    async unmount() {
        try {
            if (!this.isMounted) {
                console.warn(`Component ${this.id} not mounted`);
                return;
            }

            // Call custom unmount logic if defined
            if (typeof this.onUnmount === 'function') {
                await this.onUnmount();
            }

            // Remove all event listeners
            this._removeAllEventListeners();

            // Remove from DOM
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }

            this.element = null;
            this.isMounted = false;
            console.log(`Component ${this.id} unmounted successfully`);

            // Emit component unmounted event
            this._emitComponentEvent('unmounted');
            if (window.viewEventSystem) {
                window.viewEventSystem.emitComponentUnmounted(this.id, this.config.viewName || 'unknown');
            }

        } catch (error) {
            console.error(`Failed to unmount component ${this.id}:`, error);
            this._emitComponentEvent('error', { error });
            throw error;
        }
    }

    /**
     * Update the component with new data
     * @param {Object} data - New data to update the component with
     * @returns {Promise<void>}
     */
    async update(data) {
        try {
            if (!this._initialized) {
                console.warn(`Component ${this.id} not initialized, cannot update`);
                return;
            }

            // Call custom update logic if defined
            if (typeof this.onUpdate === 'function') {
                await this.onUpdate(data);
            }

            // Re-render if mounted
            if (this.isMounted && this.element) {
                const newHtml = this.render();
                if (typeof newHtml === 'string') {
                    this.element.innerHTML = newHtml;
                    await this.afterRender();
                }
            }

            // Emit component updated event
            this._emitComponentEvent('updated', { data });

        } catch (error) {
            console.error(`Failed to update component ${this.id}:`, error);
            this.showError(error);
            this._emitComponentEvent('error', { error });
            throw error;
        }
    }

    /**
     * Destroy the component and clean up resources
     * @returns {Promise<void>}
     */
    async destroy() {
        try {
            if (this._destroyed) {
                console.warn(`Component ${this.id} already destroyed`);
                return;
            }

            // Unmount if mounted
            if (this.isMounted) {
                await this.unmount();
            }

            // Call custom destroy logic if defined
            if (typeof this.onDestroy === 'function') {
                await this.onDestroy();
            }

            // Remove all event listeners
            this._removeAllEventListeners();

            // Clear references
            this.element = null;
            this._destroyed = true;

            console.log(`Component ${this.id} destroyed successfully`);

            // Emit component destroyed event
            this._emitComponentEvent('destroyed');

        } catch (error) {
            console.error(`Failed to destroy component ${this.id}:`, error);
            this._emitComponentEvent('error', { error });
            throw error;
        }
    }

    /**
     * Show loading state for this component
     */
    showLoading(message = 'Loading...', timeout = 30000) {
        if (window.loadingStateManager) {
            window.loadingStateManager.startLoading(this.id, message, timeout);
        }
        
        // Also show loading in container if mounted
        if (this.element && this.element.parentNode) {
            this.element.parentNode.innerHTML = this.createLoadingUI(message);
        }
    }

    /**
     * Hide loading state for this component
     */
    hideLoading(success = true) {
        if (window.loadingStateManager) {
            window.loadingStateManager.endLoading(this.id, success);
        }
        
        // Clear loading UI if mounted
        if (this.element && this.element.parentNode && success) {
            this.element.parentNode.innerHTML = '';
            this.element.parentNode.appendChild(this.element);
        }
    }

    /**
     * Update loading progress
     */
    updateLoadingProgress(progress, message = null) {
        if (window.loadingStateManager) {
            window.loadingStateManager.updateProgress(this.id, progress, message);
        }
    }

    /**
     * Show error for this component
     */
    showError(error, canRetry = true) {
        if (window.loadingStateManager) {
            window.loadingStateManager.showLoadingError(this.id, error);
        }
        
        // Show error UI in container if mounted
        if (this.element && this.element.parentNode) {
            this.element.parentNode.innerHTML = this.createFallbackUI(error, canRetry);
        }
        
        // Also emit error event
        this._emitComponentEvent('error', { error, canRetry });
    }

    /**
     * Create fallback UI for component errors
     */
    createFallbackUI(error, canRetry = true) {
        const errorMessage = this.getUserFriendlyErrorMessage(error);
        
        return `
            <div class="component-fallback">
                <div class="alert alert-warning">
                    <h5><i class="bi bi-exclamation-triangle"></i> Component Unavailable</h5>
                    <p>${errorMessage}</p>
                    ${canRetry ? `
                        <button class="btn btn-primary btn-sm retry-button" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Retry
                        </button>
                    ` : ''}
                    <button class="btn btn-outline-secondary btn-sm ms-2" onclick="location.reload()">
                        <i class="bi bi-arrow-clockwise"></i> Reload Page
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Create loading UI
     */
    createLoadingUI(message) {
        return `
            <div class="component-loading">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">${message}</p>
            </div>
        `;
    }

    /**
     * Get user-friendly error message
     */
    getUserFriendlyErrorMessage(error) {
        const errorMessages = {
            'NetworkError': 'Unable to connect to the server. Please check your internet connection.',
            'TimeoutError': 'The operation took too long to complete. Please try again.',
            'PermissionError': 'You don\'t have permission to perform this action.',
            'ValidationError': 'The data provided is invalid. Please check your input.',
            'NotFoundError': 'The requested resource was not found.',
            'ServerError': 'A server error occurred. Please try again later.',
            'ComponentNotFoundError': 'The component could not be loaded.',
            'DependencyError': 'A required dependency is missing or unavailable.'
        };

        // Check for specific error types
        for (const [errorType, message] of Object.entries(errorMessages)) {
            if (error.message.includes(errorType) || error.name === errorType) {
                return message;
            }
        }

        // Check for timeout errors
        if (error.message.includes('timeout') || error.message.includes('timed out')) {
            return errorMessages['TimeoutError'];
        }

        // Check for network errors
        if (error.message.includes('network') || error.message.includes('fetch')) {
            return errorMessages['NetworkError'];
        }

        // Default error message
        return `An unexpected error occurred. Please try again or reload the page.`;
    }

    /**
     * Add an event listener to the component
     * @param {string} event - Event name
     * @param {Function} handler - Event handler function
     * @param {Object} options - Event listener options
     */
    on(event, handler, options = {}) {
        if (!event || typeof event !== 'string') {
            throw new Error(`Invalid event name for component ${this.id}`);
        }

        if (!handler || typeof handler !== 'function') {
            throw new Error(`Invalid event handler for component ${this.id}`);
        }

        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }

        const handlers = this.eventListeners.get(event);
        handlers.push({ handler, options });

        // If component is mounted, also add DOM event listener
        if (this.isMounted && this.element && options.domEvent !== false) {
            this.element.addEventListener(event, handler, options);
        }

        console.log(`Event listener added for ${event} on component ${this.id}`);
    }

    /**
     * Emit an event with enhanced functionality
     * @param {string} event - Event name
     * @param {*} data - Event data
     * @param {Object} options - Event options
     */
    emit(event, data = {}, options = {}) {
        if (!event || typeof event !== 'string') {
            throw new Error(`Invalid event name for component ${this.id}`);
        }

        const eventData = {
            componentId: this.id,
            event,
            data,
            timestamp: Date.now(),
            ...options
        };

        // Emit to global event bus if available
        if (window.eventBus) {
            window.eventBus.emit(event, eventData, {
                sourceComponentId: this.id,
                priority: options.priority || 5,
                propagate: options.propagate !== false
            });
        }

        // Also emit to local event listeners
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            for (const { handler } of handlers) {
                try {
                    handler(eventData);
                } catch (error) {
                    console.error(`Error in event handler for ${event} on component ${this.id}:`, error);
                }
            }
        }

        console.log(`Event ${event} emitted from component ${this.id}`);
    }

    /**
     * Remove an event listener from the component
     * @param {string} event - Event name
     * @param {Function} handler - Event handler function to remove
     */
    off(event, handler) {
        if (!event || typeof event !== 'string') {
            throw new Error(`Invalid event name for component ${this.id}`);
        }

        if (!handler || typeof handler !== 'function') {
            throw new Error(`Invalid event handler for component ${this.id}`);
        }

        if (!this.eventListeners.has(event)) {
            console.warn(`Event ${event} not found on component ${this.id}`);
            return;
        }

        const handlers = this.eventListeners.get(event);
        const index = handlers.findIndex(h => h.handler === handler);

        if (index !== -1) {
            const { handler: removedHandler, options } = handlers[index];
            handlers.splice(index, 1);

            // Remove DOM event listener if mounted
            if (this.isMounted && this.element && options.domEvent !== false) {
                this.element.removeEventListener(event, removedHandler, options);
            }

            console.log(`Event listener removed for ${event} on component ${this.id}`);
        } else {
            console.warn(`Event handler ${handler} not found for event ${event} on component ${this.id}`);
        }
    }

    /**
     * Subscribe to global events
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Subscription options
     */
    subscribe(event, handler, options = {}) {
        if (window.eventBus) {
            return window.eventBus.on(event, handler, {
                componentId: this.id,
                ...options
            });
        }
        return null;
    }

    /**
     * Subscribe once to global events
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Subscription options
     */
    subscribeOnce(event, handler, options = {}) {
        if (window.eventBus) {
            return window.eventBus.once(event, handler, {
                componentId: this.id,
                ...options
            });
        }
        return null;
    }

    /**
     * Unsubscribe from global events
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     */
    unsubscribe(event, handler) {
        if (window.eventBus) {
            window.eventBus.off(event, handler);
        }
    }

    /**
     * Emit character event
     * @param {string} eventType - Character event type
     * @param {*} data - Event data
     */
    emitCharacterEvent(eventType, data = {}) {
        if (window.characterEventSystem) {
            const methodName = `emit${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`;
            if (typeof window.characterEventSystem[methodName] === 'function') {
                window.characterEventSystem[methodName](data, this.id);
            } else {
                console.warn(`Character event method ${methodName} not found`);
            }
        }
    }

    /**
     * Emit view event
     * @param {string} eventType - View event type
     * @param {*} data - Event data
     */
    emitViewEvent(eventType, data = {}) {
        if (window.viewEventSystem) {
            const methodName = `emit${eventType.charAt(0).toUpperCase() + eventType.slice(1)}`;
            if (typeof window.viewEventSystem[methodName] === 'function') {
                window.viewEventSystem[methodName](data, this.id);
            } else {
                console.warn(`View event method ${methodName} not found`);
            }
        }
    }

    /**
     * Handle missing dependencies gracefully
     */
    handleMissingDependency(dependencyName, fallbackValue = null) {
        console.warn(`Missing dependency: ${dependencyName} for component ${this.id}`);
        
        if (window.eventBus) {
            window.eventBus.emit('component:missing-dependency', {
                componentId: this.id,
                dependencyName,
                timestamp: Date.now()
            }, {
                sourceComponentId: this.id,
                priority: 10
            });
        }

        return fallbackValue;
    }

    /**
     * Check if a dependency is available
     */
    isDependencyAvailable(dependencyName) {
        return window[dependencyName] !== undefined;
    }

    /**
     * Wait for a dependency to be available
     */
    async waitForDependency(dependencyName, timeout = 10000) {
        const startTime = Date.now();
        
        while (!this.isDependencyAvailable(dependencyName)) {
            if (Date.now() - startTime > timeout) {
                throw new Error(`Dependency ${dependencyName} not available after ${timeout}ms`);
            }
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        return window[dependencyName];
    }

    /**
     * Execute with timeout
     */
    async executeWithTimeout(operation, timeout = 30000, operationName = 'Operation') {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`${operationName} timed out after ${timeout}ms`));
            }, timeout);
        });

        return Promise.race([operation(), timeoutPromise]);
    }

    /**
     * Retry operation with exponential backoff
     */
    async retryOperation(operation, maxRetries = 3, baseDelay = 1000, operationName = 'Operation') {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                lastError = error;
                console.warn(`${operationName} attempt ${attempt} failed:`, error.message);
                
                if (attempt < maxRetries) {
                    const delay = baseDelay * Math.pow(2, attempt - 1);
                    console.log(`Retrying ${operationName} in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
        
        throw new Error(`${operationName} failed after ${maxRetries} attempts: ${lastError.message}`);
    }

    /**
     * Log error with context
     */
    logError(error, context = {}) {
        const errorInfo = {
            componentId: this.id,
            error: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        console.error(`Component Error: ${this.id}`, errorInfo);
        
        // Send to error reporting service if available
        if (window.errorReportingService) {
            window.errorReportingService.reportError(errorInfo);
        }
    }
}

// Assign to global scope for dynamic loading
window.BaseComponent = BaseComponent;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponent;
}