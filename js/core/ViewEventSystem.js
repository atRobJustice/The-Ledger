/**
 * ViewEventSystem - Event system for view switching and navigation
 * Manages navigation between dashboard and character sheet views
 */
// Remove ES6 import - use traditional script loading
// import eventBus from './EventBus.js';

// Use window reference instead
const viewEventBus = window.eventBus;

class ViewEventSystem {
    constructor() {
        this.eventTypes = {
            // View switching events
            VIEW_CHANGED: 'view:changed',
            VIEW_LOADING: 'view:loading',
            VIEW_LOADED: 'view:loaded',
            VIEW_ERROR: 'view:error',
            
            // Navigation events
            NAVIGATE_TO_DASHBOARD: 'view:navigate:dashboard',
            NAVIGATE_TO_CHARACTER_SHEET: 'view:navigate:character-sheet',
            NAVIGATE_TO_CHARACTER: 'view:navigate:character',
            
            // Component lifecycle events
            COMPONENT_MOUNTED: 'view:component:mounted',
            COMPONENT_UNMOUNTED: 'view:component:unmounted',
            COMPONENT_ERROR: 'view:component:error',
            
            // State events
            VIEW_STATE_CHANGED: 'view:state:changed',
            NAVIGATION_STATE_CHANGED: 'view:navigation:state:changed'
        };

        this.currentView = null;
        this.previousView = null;
        this.viewHistory = [];
        this.maxHistorySize = 10;
        this.loadingStates = new Map();
        this.viewStates = new Map();

        this.setupGlobalListeners();
    }

    /**
     * Setup global event listeners for view events
     */
    setupGlobalListeners() {
        // Listen for view change requests
        viewEventBus.on(this.eventTypes.NAVIGATE_TO_DASHBOARD, (eventData) => {
            this.handleNavigateToDashboard(eventData);
        }, { priority: 10 });

        viewEventBus.on(this.eventTypes.NAVIGATE_TO_CHARACTER_SHEET, (eventData) => {
            this.handleNavigateToCharacterSheet(eventData);
        }, { priority: 10 });

        viewEventBus.on(this.eventTypes.NAVIGATE_TO_CHARACTER, (eventData) => {
            this.handleNavigateToCharacter(eventData);
        }, { priority: 10 });

        // Listen for component lifecycle events
        viewEventBus.on(this.eventTypes.COMPONENT_MOUNTED, (eventData) => {
            this.handleComponentMounted(eventData);
        }, { priority: 5 });

        viewEventBus.on(this.eventTypes.COMPONENT_UNMOUNTED, (eventData) => {
            this.handleComponentUnmounted(eventData);
        }, { priority: 5 });

        // Listen for view errors
        viewEventBus.on(this.eventTypes.VIEW_ERROR, (eventData) => {
            this.handleViewError(eventData);
        }, { priority: 15 });
    }

    /**
     * Emit view changed event
     */
    emitViewChanged(fromView, toView, data = {}) {
        this.previousView = this.currentView;
        this.currentView = toView;

        // Add to history
        this.addToHistory({
            from: fromView,
            to: toView,
            timestamp: Date.now(),
            data
        });

        viewEventBus.emit(this.eventTypes.VIEW_CHANGED, {
            fromView,
            toView,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 10
        });
    }

    /**
     * Emit view loading event
     */
    emitViewLoading(viewName, data = {}) {
        this.loadingStates.set(viewName, true);

        viewEventBus.emit(this.eventTypes.VIEW_LOADING, {
            viewName,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 8
        });
    }

    /**
     * Emit view loaded event
     */
    emitViewLoaded(viewName, data = {}) {
        this.loadingStates.set(viewName, false);

        viewEventBus.emit(this.eventTypes.VIEW_LOADED, {
            viewName,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 8
        });
    }

    /**
     * Emit view error event
     */
    emitViewError(viewName, error, data = {}) {
        this.loadingStates.set(viewName, false);

        viewEventBus.emit(this.eventTypes.VIEW_ERROR, {
            viewName,
            error,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 15
        });
    }

    /**
     * Emit navigate to dashboard event
     */
    emitNavigateToDashboard(data = {}) {
        viewEventBus.emit(this.eventTypes.NAVIGATE_TO_DASHBOARD, {
            timestamp: Date.now(),
            ...data
        }, {
            priority: 10
        });
    }

    /**
     * Emit navigate to character sheet event
     */
    emitNavigateToCharacterSheet(data = {}) {
        viewEventBus.emit(this.eventTypes.NAVIGATE_TO_CHARACTER_SHEET, {
            timestamp: Date.now(),
            ...data
        }, {
            priority: 10
        });
    }

    /**
     * Emit navigate to character event
     */
    emitNavigateToCharacter(characterId, data = {}) {
        viewEventBus.emit(this.eventTypes.NAVIGATE_TO_CHARACTER, {
            characterId,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 10
        });
    }

    /**
     * Emit component mounted event
     */
    emitComponentMounted(componentId, viewName, data = {}) {
        viewEventBus.emit(this.eventTypes.COMPONENT_MOUNTED, {
            componentId,
            viewName,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 5
        });
    }

    /**
     * Emit component unmounted event
     */
    emitComponentUnmounted(componentId, viewName, data = {}) {
        viewEventBus.emit(this.eventTypes.COMPONENT_UNMOUNTED, {
            componentId,
            viewName,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 5
        });
    }

    /**
     * Emit component error event
     */
    emitComponentError(componentId, viewName, error, data = {}) {
        viewEventBus.emit(this.eventTypes.COMPONENT_ERROR, {
            componentId,
            viewName,
            error,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 15
        });
    }

    /**
     * Emit view state changed event
     */
    emitViewStateChanged(viewName, state, data = {}) {
        this.viewStates.set(viewName, state);

        viewEventBus.emit(this.eventTypes.VIEW_STATE_CHANGED, {
            viewName,
            state,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 5
        });
    }

    /**
     * Emit navigation state changed event
     */
    emitNavigationStateChanged(navigationState, data = {}) {
        viewEventBus.emit(this.eventTypes.NAVIGATION_STATE_CHANGED, {
            navigationState,
            timestamp: Date.now(),
            ...data
        }, {
            priority: 5
        });
    }

    /**
     * Handle navigate to dashboard
     */
    handleNavigateToDashboard(eventData) {
        const { data } = eventData;
        
        this.emitViewLoading('dashboard', data);
        
        // Trigger view change in app
        if (window.ledgerApp) {
            window.ledgerApp.showView('dashboard')
                .then(() => {
                    this.emitViewLoaded('dashboard', data);
                    this.emitViewChanged(this.currentView, 'dashboard', data);
                })
                .catch((error) => {
                    this.emitViewError('dashboard', error, data);
                });
        }
    }

    /**
     * Handle navigate to character sheet
     */
    handleNavigateToCharacterSheet(eventData) {
        const { data } = eventData;
        
        this.emitViewLoading('character-sheet', data);
        
        // Trigger view change in app
        if (window.ledgerApp) {
            window.ledgerApp.showView('character-sheet')
                .then(() => {
                    this.emitViewLoaded('character-sheet', data);
                    this.emitViewChanged(this.currentView, 'character-sheet', data);
                })
                .catch((error) => {
                    this.emitViewError('character-sheet', error, data);
                });
        }
    }

    /**
     * Handle navigate to character
     */
    handleNavigateToCharacter(eventData) {
        const { data } = eventData;
        const { characterId } = data;
        
        this.emitViewLoading('character-sheet', data);
        
        // Switch character first, then navigate to character sheet
        if (window.characterManager && characterId) {
            window.characterManager.switchCharacter(characterId)
                .then(() => {
                    if (window.ledgerApp) {
                        return window.ledgerApp.showView('character-sheet');
                    }
                })
                .then(() => {
                    this.emitViewLoaded('character-sheet', data);
                    this.emitViewChanged(this.currentView, 'character-sheet', data);
                })
                .catch((error) => {
                    this.emitViewError('character-sheet', error, data);
                });
        } else {
            // Navigate to character sheet without switching character
            this.handleNavigateToCharacterSheet(eventData);
        }
    }

    /**
     * Handle component mounted
     */
    handleComponentMounted(eventData) {
        const { data } = eventData;
        const { componentId, viewName } = data;
        
        viewEventBus.log('debug', `Component mounted: ${componentId} in view: ${viewName}`);
        
        // Update view state
        const currentState = this.viewStates.get(viewName) || {};
        currentState.components = currentState.components || [];
        currentState.components.push(componentId);
        this.emitViewStateChanged(viewName, currentState);
    }

    /**
     * Handle component unmounted
     */
    handleComponentUnmounted(eventData) {
        const { data } = eventData;
        const { componentId, viewName } = data;
        
        viewEventBus.log('debug', `Component unmounted: ${componentId} from view: ${viewName}`);
        
        // Update view state
        const currentState = this.viewStates.get(viewName) || {};
        currentState.components = currentState.components || [];
        const index = currentState.components.indexOf(componentId);
        if (index !== -1) {
            currentState.components.splice(index, 1);
        }
        this.emitViewStateChanged(viewName, currentState);
    }

    /**
     * Handle view error
     */
    handleViewError(eventData) {
        const { data } = eventData;
        const { viewName, error } = data;
        
        viewEventBus.log('error', `View error in ${viewName}:`, error);
        
        // Show error message to user
        if (window.toastManager) {
            window.toastManager.show(
                `Failed to load ${viewName}: ${error.message}`,
                'error',
                'Navigation'
            );
        }
    }

    /**
     * Add to navigation history
     */
    addToHistory(navigationEntry) {
        this.viewHistory.push(navigationEntry);
        
        // Maintain history size
        if (this.viewHistory.length > this.maxHistorySize) {
            this.viewHistory.shift();
        }
    }

    /**
     * Get navigation history
     */
    getNavigationHistory() {
        return [...this.viewHistory];
    }

    /**
     * Get current view
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Get previous view
     */
    getPreviousView() {
        return this.previousView;
    }

    /**
     * Check if view is loading
     */
    isViewLoading(viewName) {
        return this.loadingStates.get(viewName) || false;
    }

    /**
     * Get view state
     */
    getViewState(viewName) {
        return this.viewStates.get(viewName) || {};
    }

    /**
     * Get all view states
     */
    getAllViewStates() {
        return Object.fromEntries(this.viewStates);
    }

    /**
     * Clear navigation history
     */
    clearNavigationHistory() {
        this.viewHistory = [];
        viewEventBus.log('debug', 'Navigation history cleared');
    }

    /**
     * Get event types
     */
    getEventTypes() {
        return this.eventTypes;
    }

    /**
     * Subscribe to view events
     */
    subscribe(eventType, handler, options = {}) {
        return viewEventBus.on(eventType, handler, options);
    }

    /**
     * Subscribe once to view events
     */
    subscribeOnce(eventType, handler, options = {}) {
        return viewEventBus.once(eventType, handler, options);
    }

    /**
     * Unsubscribe from view events
     */
    unsubscribe(eventType, handler) {
        viewEventBus.off(eventType, handler);
    }

    /**
     * Get view event history
     */
    getEventHistory(filter = {}) {
        return viewEventBus.getEventHistory(filter);
    }

    /**
     * Get statistics about view system
     */
    getStats() {
        return {
            currentView: this.currentView,
            previousView: this.previousView,
            navigationHistorySize: this.viewHistory.length,
            loadingStates: Object.fromEntries(this.loadingStates),
            viewStates: Object.fromEntries(this.viewStates)
        };
    }
}

// Create and export the view event system instance
const viewEventSystem = new ViewEventSystem();

// Add to window for global access
window.ViewEventSystem = ViewEventSystem;
window.viewEventSystem = viewEventSystem;

// Remove ES6 export - use traditional script loading
// export default viewEventSystem; 