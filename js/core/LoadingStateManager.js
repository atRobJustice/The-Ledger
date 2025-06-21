/**
 * LoadingStateManager - Manages loading states, indicators, and progress tracking
 * Provides centralized loading state management with timeouts and progress tracking
 */
// Remove ES6 import - use traditional script loading
// import eventBus from './EventBus.js';

class LoadingStateManager {
    constructor() {
        this.loadingStates = new Map();
        this.progressStates = new Map();
        this.timeoutHandlers = new Map();
        this.defaultTimeout = 30000; // 30 seconds
        this.progressUpdateInterval = 100; // 100ms
        this.loadingIndicators = new Map();
        
        this.setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        if (window.eventBus) {
            // Listen for component loading events
            window.eventBus.on('component:loading:start', (eventData) => {
                this.startLoading(eventData.data.componentId, eventData.data.message);
            });

            window.eventBus.on('component:loading:end', (eventData) => {
                this.endLoading(eventData.data.componentId);
            });

            window.eventBus.on('component:loading:progress', (eventData) => {
                this.updateProgress(eventData.data.componentId, eventData.data.progress);
            });
        }
    }

    /**
     * Start loading for a component
     */
    startLoading(componentId, message = 'Loading...', timeout = this.defaultTimeout) {
        const loadingState = {
            isLoading: true,
            startTime: Date.now(),
            message,
            progress: 0,
            timeout: timeout,
            timeoutId: null
        };

        this.loadingStates.set(componentId, loadingState);

        // Set timeout
        if (timeout > 0) {
            const timeoutId = setTimeout(() => {
                this.handleTimeout(componentId);
            }, timeout);
            loadingState.timeoutId = timeoutId;
        }

        // Create loading indicator
        this.createLoadingIndicator(componentId, loadingState);

        // Emit loading start event
        this.emitLoadingEvent('start', componentId, { message, timeout });

        console.log(`Loading started for ${componentId}: ${message}`);
    }

    /**
     * End loading for a component
     */
    endLoading(componentId, success = true) {
        const loadingState = this.loadingStates.get(componentId);
        if (!loadingState) return;

        // Clear timeout
        if (loadingState.timeoutId) {
            clearTimeout(loadingState.timeoutId);
        }

        // Update state
        loadingState.isLoading = false;
        loadingState.endTime = Date.now();
        loadingState.duration = loadingState.endTime - loadingState.startTime;
        loadingState.success = success;

        // Remove loading indicator
        this.removeLoadingIndicator(componentId);

        // Clear progress state
        this.progressStates.delete(componentId);

        // Emit loading end event
        this.emitLoadingEvent('end', componentId, { 
            success, 
            duration: loadingState.duration 
        });

        console.log(`Loading ended for ${componentId} (${success ? 'success' : 'failed'}) in ${loadingState.duration}ms`);
    }

    /**
     * Update progress for a component
     */
    updateProgress(componentId, progress, message = null) {
        const loadingState = this.loadingStates.get(componentId);
        if (!loadingState) return;

        // Clamp progress between 0 and 100
        progress = Math.max(0, Math.min(100, progress));

        loadingState.progress = progress;
        if (message) {
            loadingState.message = message;
        }

        // Update progress state
        this.progressStates.set(componentId, {
            progress,
            message: loadingState.message,
            timestamp: Date.now()
        });

        // Update loading indicator
        this.updateLoadingIndicator(componentId, loadingState);

        // Emit progress event
        this.emitLoadingEvent('progress', componentId, { progress, message });
    }

    /**
     * Handle timeout for a component
     */
    handleTimeout(componentId) {
        const loadingState = this.loadingStates.get(componentId);
        if (!loadingState) return;

        console.warn(`Loading timeout for ${componentId} after ${loadingState.timeout}ms`);

        // End loading with failure
        this.endLoading(componentId, false);

        // Show timeout error
        this.showTimeoutError(componentId, loadingState);

        // Emit timeout event
        this.emitLoadingEvent('timeout', componentId, { 
            timeout: loadingState.timeout,
            message: loadingState.message 
        });
    }

    /**
     * Create loading indicator
     */
    createLoadingIndicator(componentId, loadingState) {
        const indicator = document.createElement('div');
        indicator.className = 'loading-indicator';
        indicator.id = `loading-${componentId}`;
        indicator.innerHTML = this.createLoadingHTML(loadingState);

        // Add styles if not already added
        this.addLoadingStyles();

        // Find container for component
        const container = this.findComponentContainer(componentId);
        if (container) {
            container.appendChild(indicator);
        } else {
            // Fallback to body
            document.body.appendChild(indicator);
        }

        this.loadingIndicators.set(componentId, indicator);
    }

    /**
     * Update loading indicator
     */
    updateLoadingIndicator(componentId, loadingState) {
        const indicator = this.loadingIndicators.get(componentId);
        if (indicator) {
            indicator.innerHTML = this.createLoadingHTML(loadingState);
        }
    }

    /**
     * Remove loading indicator
     */
    removeLoadingIndicator(componentId) {
        const indicator = this.loadingIndicators.get(componentId);
        if (indicator && indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
        this.loadingIndicators.delete(componentId);
    }

    /**
     * Create loading HTML
     */
    createLoadingHTML(loadingState) {
        const { message, progress } = loadingState;
        
        if (progress > 0) {
            return `
                <div class="loading-content">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="loading-message">${message}</p>
                    <div class="progress mt-2">
                        <div class="progress-bar" role="progressbar" 
                             style="width: ${progress}%" 
                             aria-valuenow="${progress}" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                            ${progress}%
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="loading-content">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="loading-message">${message}</p>
                </div>
            `;
        }
    }

    /**
     * Add loading styles
     */
    addLoadingStyles() {
        if (document.getElementById('loading-styles')) return;

        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            .loading-indicator {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(2px);
            }
            .loading-content {
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                max-width: 300px;
            }
            .loading-message {
                margin: 1rem 0 0 0;
                color: #666;
                font-size: 0.9rem;
            }
            .loading-timeout {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 1rem;
                border-radius: 4px;
                margin: 1rem 0;
            }
            .loading-error {
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
                padding: 1rem;
                border-radius: 4px;
                margin: 1rem 0;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Find component container
     */
    findComponentContainer(componentId) {
        // Try to find container by component ID
        let container = document.querySelector(`[data-component-id="${componentId}"]`);
        
        if (!container) {
            // Try to find by component ID in parent elements
            container = document.querySelector(`#${componentId}`);
        }
        
        if (!container) {
            // Try to find by component class
            container = document.querySelector(`.${componentId}`);
        }

        return container;
    }

    /**
     * Show timeout error
     */
    showTimeoutError(componentId, loadingState) {
        const indicator = this.loadingIndicators.get(componentId);
        if (indicator) {
            indicator.innerHTML = `
                <div class="loading-content">
                    <div class="loading-timeout">
                        <h5><i class="bi bi-exclamation-triangle"></i> Loading Timeout</h5>
                        <p>The operation took longer than expected. Please try again.</p>
                        <button class="btn btn-primary btn-sm" onclick="window.loadingStateManager.retryLoading('${componentId}')">
                            <i class="bi bi-arrow-clockwise"></i> Retry
                        </button>
                        <button class="btn btn-outline-secondary btn-sm ms-2" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Reload Page
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Show loading error
     */
    showLoadingError(componentId, error) {
        const indicator = this.loadingIndicators.get(componentId);
        if (indicator) {
            indicator.innerHTML = `
                <div class="loading-content">
                    <div class="loading-error">
                        <h5><i class="bi bi-exclamation-triangle"></i> Loading Error</h5>
                        <p>${error.message || 'An error occurred while loading.'}</p>
                        <button class="btn btn-primary btn-sm" onclick="window.loadingStateManager.retryLoading('${componentId}')">
                            <i class="bi bi-arrow-clockwise"></i> Retry
                        </button>
                        <button class="btn btn-outline-secondary btn-sm ms-2" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Reload Page
                        </button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Retry loading for a component
     */
    retryLoading(componentId) {
        const loadingState = this.loadingStates.get(componentId);
        if (!loadingState) return;

        console.log(`Retrying loading for ${componentId}`);

        // Emit retry event
        this.emitLoadingEvent('retry', componentId, { 
            message: loadingState.message,
            timeout: loadingState.timeout 
        });
    }

    /**
     * Emit loading event
     */
    emitLoadingEvent(type, componentId, data) {
        if (window.eventBus) {
            window.eventBus.emit(`component:loading:${type}`, {
                componentId,
                timestamp: Date.now(),
                ...data
            }, {
                sourceComponentId: componentId,
                priority: 8
            });
        }
    }

    /**
     * Check if component is loading
     */
    isLoading(componentId) {
        const loadingState = this.loadingStates.get(componentId);
        return loadingState?.isLoading || false;
    }

    /**
     * Get loading state
     */
    getLoadingState(componentId) {
        return this.loadingStates.get(componentId);
    }

    /**
     * Get progress state
     */
    getProgressState(componentId) {
        return this.progressStates.get(componentId);
    }

    /**
     * Get all loading states
     */
    getAllLoadingStates() {
        return Object.fromEntries(this.loadingStates);
    }

    /**
     * Get loading statistics
     */
    getLoadingStats() {
        const stats = {
            totalLoading: 0,
            activeLoading: 0,
            averageDuration: 0,
            totalDuration: 0,
            completedCount: 0
        };

        for (const [componentId, loadingState] of this.loadingStates) {
            stats.totalLoading++;
            
            if (loadingState.isLoading) {
                stats.activeLoading++;
            } else if (loadingState.duration) {
                stats.totalDuration += loadingState.duration;
                stats.completedCount++;
            }
        }

        if (stats.completedCount > 0) {
            stats.averageDuration = stats.totalDuration / stats.completedCount;
        }

        return stats;
    }

    /**
     * Clear all loading states
     */
    clearAllLoadingStates() {
        // Clear all timeouts
        for (const [componentId, loadingState] of this.loadingStates) {
            if (loadingState.timeoutId) {
                clearTimeout(loadingState.timeoutId);
            }
        }

        // Remove all indicators
        for (const [componentId, indicator] of this.loadingIndicators) {
            if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }

        this.loadingStates.clear();
        this.progressStates.clear();
        this.loadingIndicators.clear();

        console.log('All loading states cleared');
    }
}

// Create global loading state manager instance
const loadingStateManager = new LoadingStateManager();

// Add to window for global access
window.LoadingStateManager = LoadingStateManager;
window.loadingStateManager = loadingStateManager;

// Remove ES6 export - use traditional script loading
// export default loadingStateManager; 