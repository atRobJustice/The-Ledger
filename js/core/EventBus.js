/**
 * EventBus - Global event communication system for The Ledger
 * Provides centralized event management, debugging, and memory management
 */
class EventBus {
    constructor() {
        this.listeners = new Map();
        this.onceListeners = new Map();
        this.eventHistory = [];
        this.maxHistorySize = 100;
        this.debugMode = false;
        this.errorHandlers = new Set();
        this.componentRegistry = new Map(); // Track component registrations
    }

    /**
     * Enable or disable debug mode
     */
    setDebugMode(enabled) {
        this.debugMode = enabled;
        this.log('debug', `EventBus debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Register a component with the event bus
     */
    registerComponent(componentId, component) {
        this.componentRegistry.set(componentId, component);
        this.log('debug', `Component registered: ${componentId}`);
    }

    /**
     * Unregister a component from the event bus
     */
    unregisterComponent(componentId) {
        this.componentRegistry.delete(componentId);
        this.log('debug', `Component unregistered: ${componentId}`);
    }

    /**
     * Add an event listener
     */
    on(event, handler, options = {}) {
        const { componentId, priority = 0 } = options;
        
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }

        const listener = {
            handler,
            componentId,
            priority,
            timestamp: Date.now()
        };

        this.listeners.get(event).push(listener);
        
        // Sort by priority (higher priority first)
        this.listeners.get(event).sort((a, b) => b.priority - a.priority);

        this.log('debug', `Event listener added: ${event} (component: ${componentId || 'global'}, priority: ${priority})`);
        
        return () => this.off(event, handler);
    }

    /**
     * Add a one-time event listener
     */
    once(event, handler, options = {}) {
        const { componentId, priority = 0 } = options;
        
        if (!this.onceListeners.has(event)) {
            this.onceListeners.set(event, []);
        }

        const listener = {
            handler,
            componentId,
            priority,
            timestamp: Date.now()
        };

        this.onceListeners.get(event).push(listener);
        
        // Sort by priority (higher priority first)
        this.onceListeners.get(event).sort((a, b) => b.priority - a.priority);

        this.log('debug', `One-time event listener added: ${event} (component: ${componentId || 'global'}, priority: ${priority})`);
        
        return () => this.off(event, handler);
    }

    /**
     * Remove an event listener
     */
    off(event, handler) {
        // Remove from regular listeners
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            const index = listeners.findIndex(l => l.handler === handler);
            if (index !== -1) {
                const removed = listeners.splice(index, 1)[0];
                this.log('debug', `Event listener removed: ${event} (component: ${removed.componentId || 'global'})`);
            }
        }

        // Remove from once listeners
        if (this.onceListeners.has(event)) {
            const listeners = this.onceListeners.get(event);
            const index = listeners.findIndex(l => l.handler === handler);
            if (index !== -1) {
                const removed = listeners.splice(index, 1)[0];
                this.log('debug', `One-time event listener removed: ${event} (component: ${removed.componentId || 'global'})`);
            }
        }
    }

    /**
     * Emit an event
     */
    emit(event, data = {}, options = {}) {
        const { sourceComponentId, priority = 0, propagate = true } = options;
        
        const eventData = {
            event,
            data,
            sourceComponentId,
            timestamp: Date.now(),
            priority
        };

        // Add to history
        this.addToHistory(eventData);

        this.log('debug', `Event emitted: ${event} (source: ${sourceComponentId || 'global'}, priority: ${priority})`);

        // Handle errors during emission
        try {
            // Emit to regular listeners
            if (this.listeners.has(event)) {
                const listeners = this.listeners.get(event);
                for (const listener of listeners) {
                    try {
                        listener.handler(eventData);
                    } catch (error) {
                        this.handleError(error, event, listener);
                    }
                }
            }

            // Emit to once listeners and remove them
            if (this.onceListeners.has(event)) {
                const listeners = this.onceListeners.get(event);
                for (const listener of listeners) {
                    try {
                        listener.handler(eventData);
                    } catch (error) {
                        this.handleError(error, event, listener);
                    }
                }
                this.onceListeners.delete(event);
            }

            // Propagate to parent components if needed
            if (propagate && sourceComponentId) {
                this.propagateToParent(sourceComponentId, eventData);
            }

        } catch (error) {
            this.handleError(error, event, { componentId: sourceComponentId });
        }
    }

    /**
     * Propagate event to parent components
     */
    propagateToParent(componentId, eventData) {
        const component = this.componentRegistry.get(componentId);
        if (component && component.config && component.config.parentComponent) {
            const parentId = component.config.parentComponent.id;
            this.log('debug', `Propagating event ${eventData.event} from ${componentId} to parent ${parentId}`);
            
            // Create new event data for parent
            const parentEventData = {
                ...eventData,
                sourceComponentId: componentId,
                propagated: true
            };
            
            // Emit to parent without further propagation to avoid loops
            this.emit(eventData.event, eventData.data, {
                sourceComponentId: parentId,
                priority: eventData.priority,
                propagate: false
            });
        }
    }

    /**
     * Add error handler
     */
    addErrorHandler(handler) {
        this.errorHandlers.add(handler);
    }

    /**
     * Remove error handler
     */
    removeErrorHandler(handler) {
        this.errorHandlers.delete(handler);
    }

    /**
     * Handle errors during event emission
     */
    handleError(error, event, listener) {
        const errorInfo = {
            error,
            event,
            componentId: listener.componentId,
            timestamp: Date.now()
        };

        this.log('error', `Event error: ${error.message} (event: ${event}, component: ${listener.componentId || 'global'})`);

        // Call all error handlers
        for (const handler of this.errorHandlers) {
            try {
                handler(errorInfo);
            } catch (handlerError) {
                console.error('Error in error handler:', handlerError);
            }
        }
    }

    /**
     * Add event to history
     */
    addToHistory(eventData) {
        this.eventHistory.push(eventData);
        
        // Maintain history size
        if (this.eventHistory.length > this.maxHistorySize) {
            this.eventHistory.shift();
        }
    }

    /**
     * Get event history
     */
    getEventHistory(filter = {}) {
        let history = this.eventHistory;

        if (filter.event) {
            history = history.filter(h => h.event === filter.event);
        }

        if (filter.componentId) {
            history = history.filter(h => h.sourceComponentId === filter.componentId);
        }

        if (filter.since) {
            history = history.filter(h => h.timestamp >= filter.since);
        }

        return history;
    }

    /**
     * Clear event history
     */
    clearEventHistory() {
        this.eventHistory = [];
        this.log('debug', 'Event history cleared');
    }

    /**
     * Get all registered components
     */
    getRegisteredComponents() {
        return Array.from(this.componentRegistry.keys());
    }

    /**
     * Get listeners for an event
     */
    getListeners(event) {
        const regular = this.listeners.get(event) || [];
        const once = this.onceListeners.get(event) || [];
        return [...regular, ...once];
    }

    /**
     * Get all events with listeners
     */
    getActiveEvents() {
        const events = new Set();
        
        for (const event of this.listeners.keys()) {
            events.add(event);
        }
        
        for (const event of this.onceListeners.keys()) {
            events.add(event);
        }
        
        return Array.from(events);
    }

    /**
     * Remove all listeners for an event
     */
    removeAllListeners(event) {
        if (this.listeners.has(event)) {
            this.listeners.delete(event);
        }
        
        if (this.onceListeners.has(event)) {
            this.onceListeners.delete(event);
        }
        
        this.log('debug', `All listeners removed for event: ${event}`);
    }

    /**
     * Remove all listeners for a component
     */
    removeComponentListeners(componentId) {
        let removedCount = 0;

        // Remove from regular listeners
        for (const [event, listeners] of this.listeners) {
            const originalLength = listeners.length;
            const filtered = listeners.filter(l => l.componentId !== componentId);
            this.listeners.set(event, filtered);
            removedCount += originalLength - filtered.length;
        }

        // Remove from once listeners
        for (const [event, listeners] of this.onceListeners) {
            const originalLength = listeners.length;
            const filtered = listeners.filter(l => l.componentId !== componentId);
            this.onceListeners.set(event, filtered);
            removedCount += originalLength - filtered.length;
        }

        this.log('debug', `Removed ${removedCount} listeners for component: ${componentId}`);
    }

    /**
     * Clear all listeners and components
     */
    clear() {
        this.listeners.clear();
        this.onceListeners.clear();
        this.componentRegistry.clear();
        this.eventHistory = [];
        this.log('debug', 'EventBus cleared');
    }

    /**
     * Log messages with debug mode check
     */
    log(level, message, data = null) {
        if (this.debugMode || level === 'error') {
            const timestamp = new Date().toISOString();
            const logMessage = `[EventBus ${timestamp}] ${message}`;
            
            switch (level) {
                case 'debug':
                    console.debug(logMessage, data);
                    break;
                case 'info':
                    console.info(logMessage, data);
                    break;
                case 'warn':
                    console.warn(logMessage, data);
                    break;
                case 'error':
                    console.error(logMessage, data);
                    break;
                default:
                    console.log(logMessage, data);
            }
        }
    }

    /**
     * Get statistics about the event bus
     */
    getStats() {
        const totalListeners = Array.from(this.listeners.values()).reduce((sum, listeners) => sum + listeners.length, 0);
        const totalOnceListeners = Array.from(this.onceListeners.values()).reduce((sum, listeners) => sum + listeners.length, 0);
        
        return {
            totalListeners,
            totalOnceListeners,
            registeredComponents: this.componentRegistry.size,
            activeEvents: this.getActiveEvents().length,
            eventHistorySize: this.eventHistory.length,
            errorHandlers: this.errorHandlers.size
        };
    }
}

// Create and export the event bus instance
const eventBus = new EventBus();

// Add to window for global access
window.EventBus = EventBus;
window.eventBus = eventBus;

// Enable debug mode in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    eventBus.setDebugMode(true);
}

// Add default error handler
eventBus.addErrorHandler((errorInfo) => {
    console.error('EventBus Error:', errorInfo);
    
    // Show user-friendly error message if possible
    if (window.toastManager) {
        window.toastManager.show(
            `Event error: ${errorInfo.error.message}`,
            'error',
            'Event System'
        );
    }
});

// Remove ES6 export - use traditional script loading
// export default eventBus; 