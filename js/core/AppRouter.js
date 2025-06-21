/**
 * AppRouter - Manages view navigation and state in The Ledger SPA
 * Handles view registration, navigation, and cleanup
 */
class AppRouter {
    /**
     * Create a new AppRouter instance
     */
    constructor() {
        this.currentView = null; // Instance of the current view
        this.currentViewName = null;
        this.currentParams = null;
        this.views = new Map(); // Map of view name to view class
        this.viewInstances = new Map(); // Map of view name to view instance (for state preservation)
        this.viewChangeCallbacks = [];
    }

    /**
     * Initialize the AppRouter
     * @returns {Promise<void>}
     */
    async init() {
        try {
            console.log('Initializing AppRouter...');
            
            // Register default views if available
            if (window.DashboardView) {
                this.registerView('DashboardView', window.DashboardView);
            }
            if (window.CharacterSheetView) {
                this.registerView('CharacterSheetView', window.CharacterSheetView);
            }
            
            console.log('AppRouter initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AppRouter:', error);
            throw error;
        }
    }

    /**
     * Register a view component
     * @param {string} name - View name
     * @param {Function} viewClass - View class constructor
     */
    registerView(name, viewClass) {
        if (!name || typeof name !== 'string') {
            throw new Error('View name must be a non-empty string');
        }
        if (!viewClass || typeof viewClass !== 'function') {
            throw new Error('View class must be a function');
        }
        this.views.set(name, viewClass);
        console.log(`View '${name}' registered successfully`);
    }

    /**
     * Navigate to a specified view
     * @param {string} viewName - Name of the view to navigate to
     * @param {Object} params - Parameters for the view
     * @returns {Promise<void>}
     */
    async navigateTo(viewName, params = {}) {
        if (!viewName || typeof viewName !== 'string') {
            throw new Error('View name must be a non-empty string');
        }
        const viewClass = this.views.get(viewName);
        if (!viewClass) {
            throw new Error(`View '${viewName}' is not registered`);
        }

        // Cleanup previous view
        if (this.currentView && typeof this.currentView.unmount === 'function') {
            try {
                await this.currentView.unmount();
            } catch (error) {
                console.error(`Error unmounting previous view '${this.currentViewName}':`, error);
            }
        }

        // Preserve state of previous view
        if (this.currentViewName && this.currentView) {
            this.viewInstances.set(this.currentViewName, this.currentView);
        }

        // Restore or create new view instance
        let viewInstance = this.viewInstances.get(viewName);
        if (!viewInstance) {
            viewInstance = new viewClass(viewName, params);
            this.viewInstances.set(viewName, viewInstance);
        } else if (typeof viewInstance.update === 'function') {
            await viewInstance.update(params);
        }

        // Mount the new view
        const appContainer = document.getElementById('app');
        if (!appContainer) {
            throw new Error("App container with id 'app' not found");
        }
        await viewInstance.mount(appContainer);

        this.currentView = viewInstance;
        this.currentViewName = viewName;
        this.currentParams = params;

        // Notify listeners
        this._notifyViewChange(viewName, params);
        console.log(`Navigated to view '${viewName}'`);
    }

    /**
     * Get the current view instance
     * @returns {Object|null} Current view instance
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Get a registered view class
     * @param {string} name - View name
     * @returns {Function|null} View class or null if not found
     */
    getView(name) {
        return this.views.get(name) || null;
    }

    /**
     * Listen for view changes
     * @param {Function} callback - Callback to invoke on view change
     */
    onViewChange(callback) {
        if (typeof callback === 'function') {
            this.viewChangeCallbacks.push(callback);
        }
    }

    /**
     * Notify all listeners of a view change
     * @private
     * @param {string} viewName - New view name
     * @param {Object} params - View parameters
     */
    _notifyViewChange(viewName, params) {
        for (const cb of this.viewChangeCallbacks) {
            try {
                cb(viewName, params);
            } catch (error) {
                console.error('Error in view change callback:', error);
            }
        }
    }
}

// Create global instance
window.AppRouter = AppRouter;
window.AppRouter.instance = new AppRouter();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppRouter;
} 