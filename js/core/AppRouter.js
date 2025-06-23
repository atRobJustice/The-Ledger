/**
 * AppRouter - Manages view navigation and state in The Ledger SPA
 * Handles view registration, navigation, and cleanup
 * Single source of truth for all navigation in the application
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
        this.navigationHistory = []; // Track navigation history
        this.maxHistorySize = 10;
    }

    /**
     * Initialize the AppRouter
     * @returns {Promise<void>}
     */
    async init() {
        try {
            console.log('Initializing AppRouter...');
            
            // Set up global navigation methods
            this._setupGlobalNavigation();
            
            // Views will be registered after components are loaded
            // This prevents timing issues with component availability
            
            console.log('AppRouter initialized successfully');
        } catch (error) {
            console.error('Failed to initialize AppRouter:', error);
            throw error;
        }
    }

    /**
     * Set up global navigation methods for consistent access
     * @private
     */
    _setupGlobalNavigation() {
        // Make navigation methods globally available
        window.navigateToDashboard = () => this.navigateTo('DashboardView');
        window.navigateToCharacterSheet = (characterId = null) => {
            const params = characterId ? { characterId } : {};
            this.navigateTo('CharacterSheetView', params);
        };
        window.navigateToCharacter = (characterId) => {
            if (!characterId) {
                console.warn('No character ID provided for navigation');
                return;
            }
            // Switch character first, then navigate
            if (window.characterManager && typeof window.characterManager.switchCharacter === 'function') {
                window.characterManager.switchCharacter(characterId)
                    .then(() => this.navigateTo('CharacterSheetView', { characterId }))
                    .catch(error => {
                        console.error('Failed to switch character:', error);
                        // Still navigate to character sheet even if switch fails
                        this.navigateTo('CharacterSheetView', { characterId });
                    });
            } else {
                this.navigateTo('CharacterSheetView', { characterId });
            }
        };
        
        // Add to global AppRouter instance
        if (window.AppRouter && window.AppRouter.instance) {
            window.AppRouter.instance.navigateToDashboard = window.navigateToDashboard;
            window.AppRouter.instance.navigateToCharacterSheet = window.navigateToCharacterSheet;
            window.AppRouter.instance.navigateToCharacter = window.navigateToCharacter;
        }
    }

    /**
     * Register default views (called after components are loaded)
     * @returns {Promise<void>}
     */
    async registerDefaultViews() {
        try {
            console.log('Registering default views...');
            
            // Register default views if available
            if (window.DashboardView) {
                this.registerView('DashboardView', window.DashboardView);
            }
            if (window.CharacterSheetView) {
                this.registerView('CharacterSheetView', window.CharacterSheetView);
            }
            
            console.log('Default views registered successfully');
        } catch (error) {
            console.error('Failed to register default views:', error);
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

        // Add to navigation history
        if (this.currentViewName) {
            this.navigationHistory.push({
                view: this.currentViewName,
                params: this.currentParams,
                timestamp: Date.now()
            });
            
            // Keep history size manageable
            if (this.navigationHistory.length > this.maxHistorySize) {
                this.navigationHistory.shift();
            }
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

        // Update UI to reflect current view
        this._updateNavigationUI(viewName);

        // Notify listeners
        this._notifyViewChange(viewName, params);
        console.log(`Navigated to view '${viewName}'`);
    }

    /**
     * Update navigation UI to reflect current view
     * @private
     * @param {string} viewName - Current view name
     */
    _updateNavigationUI(viewName) {
        // Update top navigation bar
        const navDashboard = document.getElementById('nav-dashboard');
        const navCharacterSheet = document.getElementById('nav-character-sheet');
        
        if (navDashboard) {
            navDashboard.classList.toggle('active', viewName === 'DashboardView');
        }
        if (navCharacterSheet) {
            navCharacterSheet.classList.toggle('active', viewName === 'CharacterSheetView');
        }

        // Update any other navigation elements that might exist
        const allNavButtons = document.querySelectorAll('[data-view], [data-target]');
        allNavButtons.forEach(button => {
            const buttonView = button.getAttribute('data-view') || button.getAttribute('data-target');
            if (buttonView) {
                const isActive = (buttonView === 'dashboard' && viewName === 'DashboardView') ||
                               (buttonView === 'character-sheet' && viewName === 'CharacterSheetView');
                button.classList.toggle('active', isActive);
            }
        });
    }

    /**
     * Navigate back to previous view
     * @returns {Promise<void>}
     */
    async goBack() {
        if (this.navigationHistory.length === 0) {
            console.warn('No navigation history available');
            return;
        }
        
        const previous = this.navigationHistory.pop();
        await this.navigateTo(previous.view, previous.params);
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