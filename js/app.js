/**
 * Main Application Entry Point for The Ledger SPA
 * Initializes the component-based architecture and manages the application lifecycle
 */

class LedgerApp {
    constructor() {
        this.initialized = false;
        this.currentView = null;
        this.components = new Map();
        this.errorBoundary = null;
        this.loadingStateManager = null;
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.initialized) {
            console.warn('LedgerApp already initialized');
            return;
        }

        try {
            console.log('Initializing LedgerApp...');

            // Show initial loading state
            this.showAppLoading('Initializing application...');

            // Initialize core systems in order
            await this._initErrorBoundary();
            await this._initLoadingStateManager();
            await this._initCoreSystems();
            await this._initComponentRegistry();
            await this._initAppRouter();
            await this._initViews();
            await this._initEventListeners();
            await this._initManagers();

            this.initialized = true;
            console.log('LedgerApp initialized successfully');

            // Hide loading state
            this.hideAppLoading(true);

            // Start with dashboard view
            this.showView('dashboard');

        } catch (error) {
            console.error('Failed to initialize LedgerApp:', error);
            this.hideAppLoading(false);
            this.showAppError(error);
            throw error;
        }
    }

    /**
     * Initialize ErrorBoundary
     */
    async _initErrorBoundary() {
        // Wait for ErrorBoundary to be available
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.errorBoundary && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.errorBoundary) {
            console.warn('ErrorBoundary not available, continuing without error boundary');
            return;
        }

        this.errorBoundary = window.errorBoundary;
        console.log('ErrorBoundary initialized');
    }

    /**
     * Initialize LoadingStateManager
     */
    async _initLoadingStateManager() {
        // Wait for LoadingStateManager to be available
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.loadingStateManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.loadingStateManager) {
            console.warn('LoadingStateManager not available, continuing without loading state management');
            return;
        }

        this.loadingStateManager = window.loadingStateManager;
        console.log('LoadingStateManager initialized');
    }

    /**
     * Show application loading state
     */
    showAppLoading(message = 'Loading...') {
        if (this.loadingStateManager) {
            this.loadingStateManager.startLoading('app', message);
        }
        
        // Also show loading in app container
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = this.createAppLoadingUI(message);
        }
    }

    /**
     * Hide application loading state
     */
    hideAppLoading(success = true) {
        if (this.loadingStateManager) {
            this.loadingStateManager.endLoading('app', success);
        }
    }

    /**
     * Show application error
     */
    showAppError(error) {
        if (this.loadingStateManager) {
            this.loadingStateManager.showLoadingError('app', error);
        }
        
        // Show error UI in app container
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.innerHTML = this.createAppErrorUI(error);
        }
    }

    /**
     * Create application loading UI
     */
    createAppLoadingUI(message) {
        return `
            <div class="app-loading">
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <h4 class="mt-3">The Ledger</h4>
                    <p class="text-muted">${message}</p>
                </div>
            </div>
        `;
    }

    /**
     * Create application error UI
     */
    createAppErrorUI(error) {
        const errorMessage = this.getUserFriendlyErrorMessage(error);
        
        return `
            <div class="app-error">
                <div class="text-center">
                    <div class="alert alert-danger">
                        <h4><i class="bi bi-exclamation-triangle"></i> Application Error</h4>
                        <p>${errorMessage}</p>
                        <button class="btn btn-primary" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Reload Application
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get user-friendly error message
     */
    getUserFriendlyErrorMessage(error) {
        const errorMessages = {
            'NetworkError': 'Unable to connect to the server. Please check your internet connection.',
            'TimeoutError': 'The application took too long to load. Please try again.',
            'PermissionError': 'You don\'t have permission to access this application.',
            'ValidationError': 'The application configuration is invalid.',
            'NotFoundError': 'Required application resources were not found.',
            'ServerError': 'A server error occurred. Please try again later.',
            'ComponentNotFoundError': 'Required application components could not be loaded.',
            'DependencyError': 'Required dependencies are missing or unavailable.'
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
        return `An unexpected error occurred while loading the application. Please try again or reload the page.`;
    }

    /**
     * Initialize core systems (ScriptManager, etc.)
     */
    async _initCoreSystems() {
        this.updateAppLoading('Loading core systems...');
        
        // Wait for ScriptManager to be available
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.ScriptManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.ScriptManager) {
            throw new Error('ScriptManager not available');
        }

        // Initialize ScriptManager if not already done
        if (!window.ScriptManager.instance) {
            window.ScriptManager.instance = new window.ScriptManager();
            await window.ScriptManager.instance.init();
        }
    }

    /**
     * Initialize ComponentRegistry
     */
    async _initComponentRegistry() {
        this.updateAppLoading('Loading component registry...');
        
        // Wait for ComponentRegistry to be available
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.ComponentRegistry && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.ComponentRegistry) {
            throw new Error('ComponentRegistry not available');
        }

        // Initialize ComponentRegistry if not already done
        if (!window.ComponentRegistry.instance) {
            window.ComponentRegistry.instance = new window.ComponentRegistry();
            await window.ComponentRegistry.instance.init();
        }

        // Register all components
        await this._registerComponents();
    }

    /**
     * Register all application components
     */
    async _registerComponents() {
        this.updateAppLoading('Registering components...');
        
        const registry = window.ComponentRegistry.instance;
        
        // Register dashboard components (already loaded in HTML)
        if (window.DashboardView) {
            await registry.register('DashboardView', window.DashboardView);
        }
        if (window.NavigationPanel) {
            await registry.register('NavigationPanel', window.NavigationPanel);
        }
        if (window.CharacterListPanel) {
            await registry.register('CharacterListPanel', window.CharacterListPanel);
        }
        if (window.QuickActionsPanel) {
            await registry.register('QuickActionsPanel', window.QuickActionsPanel);
        }

        // Register character sheet components (already loaded in HTML)
        if (window.CharacterSheetView) {
            await registry.register('CharacterSheetView', window.CharacterSheetView);
        }
        if (window.InformationPanel) {
            await registry.register('InformationPanel', window.InformationPanel);
        }
        if (window.AttributesPanel) {
            await registry.register('AttributesPanel', window.AttributesPanel);
        }
        if (window.SkillsPanel) {
            await registry.register('SkillsPanel', window.SkillsPanel);
        }
        if (window.VitalsPanel) {
            await registry.register('VitalsPanel', window.VitalsPanel);
        }
        if (window.DisciplinesPanel) {
            await registry.register('DisciplinesPanel', window.DisciplinesPanel);
        }
        if (window.MeritsFlawsPanel) {
            await registry.register('MeritsFlawsPanel', window.MeritsFlawsPanel);
        }
        if (window.BackgroundsPanel) {
            await registry.register('BackgroundsPanel', window.BackgroundsPanel);
        }
        if (window.LoresheetsPanel) {
            await registry.register('LoresheetsPanel', window.LoresheetsPanel);
        }
        if (window.ConvictionsPanel) {
            await registry.register('ConvictionsPanel', window.ConvictionsPanel);
        }
        if (window.ExperiencePanel) {
            await registry.register('ExperiencePanel', window.ExperiencePanel);
        }
    }

    /**
     * Initialize AppRouter
     */
    async _initAppRouter() {
        this.updateAppLoading('Loading application router...');
        
        // Wait for AppRouter to be available
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.AppRouter && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.AppRouter) {
            throw new Error('AppRouter not available');
        }

        // Initialize AppRouter if not already done
        if (!window.AppRouter.instance) {
            window.AppRouter.instance = new window.AppRouter();
            await window.AppRouter.instance.init();
        }
    }

    /**
     * Initialize view containers
     */
    async _initViews() {
        this.updateAppLoading('Setting up application views...');
        
        // Create view containers if they don't exist
        const appContainer = document.getElementById('app');
        if (!appContainer) {
            throw new Error('App container not found');
        }

        // Clear existing content and create new structure
        appContainer.innerHTML = `
            <!-- Navigation Bar for View Switching -->
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Ledger</a>
                    <div>
                        <button id="nav-dashboard" class="btn btn-outline-light me-2" type="button">Dashboard</button>
                        <button id="nav-character-sheet" class="btn btn-outline-light" type="button">Character Sheet</button>
                    </div>
                </div>
            </nav>
            
            <!-- View Containers -->
            <div id="dashboard-view" class="view-container view-hidden"></div>
            <div id="character-sheet-view" class="view-container view-hidden"></div>
        `;
    }

    /**
     * Update application loading message
     */
    updateAppLoading(message) {
        if (this.loadingStateManager) {
            this.loadingStateManager.updateProgress('app', null, message);
        }
        
        // Update loading UI
        const appContainer = document.getElementById('app');
        if (appContainer && appContainer.querySelector('.app-loading')) {
            const messageElement = appContainer.querySelector('.app-loading p');
            if (messageElement) {
                messageElement.textContent = message;
            }
        }
    }

    /**
     * Initialize event listeners
     */
    async _initEventListeners() {
        // Wait for event systems to be available
        await this._waitForEventSystems();

        // Set up event system listeners
        this._setupEventSystemListeners();

        // Navigation event listeners
        document.getElementById('nav-dashboard').addEventListener('click', () => {
            if (window.viewEventSystem) {
                window.viewEventSystem.emitNavigateToDashboard();
            } else {
                this.showView('dashboard');
            }
        });

        document.getElementById('nav-character-sheet').addEventListener('click', () => {
            if (window.viewEventSystem) {
                window.viewEventSystem.emitNavigateToCharacterSheet();
            } else {
                this.showView('character-sheet');
            }
        });
    }

    /**
     * Wait for event systems to be available
     */
    async _waitForEventSystems() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while ((!window.eventBus || !window.characterEventSystem || !window.viewEventSystem || 
                !window.errorBoundary || !window.loadingStateManager) && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.eventBus) {
            console.warn('EventBus not available');
        }
        if (!window.characterEventSystem) {
            console.warn('CharacterEventSystem not available');
        }
        if (!window.viewEventSystem) {
            console.warn('ViewEventSystem not available');
        }
        if (!window.errorBoundary) {
            console.warn('ErrorBoundary not available');
        }
        if (!window.loadingStateManager) {
            console.warn('LoadingStateManager not available');
        }
    }

    /**
     * Set up event system listeners
     */
    _setupEventSystemListeners() {
        if (!window.viewEventSystem) return;

        // Listen for view change requests
        window.viewEventSystem.subscribe(window.viewEventSystem.eventTypes.NAVIGATE_TO_DASHBOARD, (eventData) => {
            this.showView('dashboard');
        });

        window.viewEventSystem.subscribe(window.viewEventSystem.eventTypes.NAVIGATE_TO_CHARACTER_SHEET, (eventData) => {
            this.showView('character-sheet');
        });

        window.viewEventSystem.subscribe(window.viewEventSystem.eventTypes.NAVIGATE_TO_CHARACTER, (eventData) => {
            const { characterId } = eventData.data;
            if (characterId && window.characterManager) {
                window.characterManager.switchCharacter(characterId)
                    .then(() => this.showView('character-sheet'))
                    .catch(error => console.error('Failed to switch character:', error));
            } else {
                this.showView('character-sheet');
            }
        });

        // Listen for view loading events
        window.viewEventSystem.subscribe(window.viewEventSystem.eventTypes.VIEW_LOADING, (eventData) => {
            this._showLoadingIndicator(eventData.data.viewName);
        });

        window.viewEventSystem.subscribe(window.viewEventSystem.eventTypes.VIEW_LOADED, (eventData) => {
            this._hideLoadingIndicator(eventData.data.viewName);
        });

        window.viewEventSystem.subscribe(window.viewEventSystem.eventTypes.VIEW_ERROR, (eventData) => {
            this._handleViewError(eventData.data);
        });
    }

    /**
     * Initialize managers
     */
    async _initManagers() {
        // Wait for DOM ready and app container
        await new Promise(resolve => {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                resolve();
            } else {
                document.addEventListener('DOMContentLoaded', resolve);
            }
        });
        // Ensure all manager containers exist and managers are initialized in order
        if (window.BackgroundManager && typeof window.BackgroundManager.initWhenReady === 'function') {
            window.BackgroundManager.initWhenReady();
        }
        if (window.DisciplineManager && typeof window.DisciplineManager.initWhenReady === 'function') {
            window.DisciplineManager.initWhenReady();
        }
        if (window.MeritFlawManager && typeof window.MeritFlawManager.initWhenReady === 'function') {
            window.MeritFlawManager.initWhenReady();
        }
        if (window.LoresheetManager && typeof window.LoresheetManager.initWhenReady === 'function') {
            window.LoresheetManager.initWhenReady();
        }
    }

    /**
     * Show a specific view
     */
    async showView(viewName) {
        if (this.currentView === viewName) {
            return;
        }

        console.log(`Switching to view: ${viewName}`);

        // Emit view loading event
        if (window.viewEventSystem) {
            window.viewEventSystem.emitViewLoading(viewName);
        }

        try {
            // Hide all views
            document.querySelectorAll('.view-container').forEach(container => {
                container.classList.add('view-hidden');
                container.classList.remove('view-visible');
            });

            // Show target view
            const targetView = document.getElementById(`${viewName}-view`);
            if (targetView) {
                targetView.classList.remove('view-hidden');
                targetView.classList.add('view-visible');
            }

            // Initialize view component
            await this._initViewComponent(viewName);

            this.currentView = viewName;

            // Update navigation state
            this._updateNavigationState(viewName);

            // Emit view loaded event
            if (window.viewEventSystem) {
                window.viewEventSystem.emitViewLoaded(viewName);
                window.viewEventSystem.emitViewChanged(this.previousView, viewName);
            }

        } catch (error) {
            console.error(`Failed to show view ${viewName}:`, error);
            
            // Emit view error event
            if (window.viewEventSystem) {
                window.viewEventSystem.emitViewError(viewName, error);
            }
            
            throw error;
        }
        // Hide all views
        document.querySelectorAll('.view-container').forEach(container => {
            container.classList.add('view-hidden');
            container.classList.remove('view-visible');
        });

        // Show target view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.remove('view-hidden');
            targetView.classList.add('view-visible');
        }

        // Initialize view component
        await this._initViewComponent(viewName);

        this.currentView = viewName;

        // Update navigation state
        this._updateNavigationState(viewName);
    }

    /**
     * Initialize view component
     */
    async _initViewComponent(viewName) {
        const viewContainer = document.getElementById(`${viewName}-view`);
        if (!viewContainer) {
            console.error(`View container not found: ${viewName}-view`);
            return;
        }

        // Clear existing content
        viewContainer.innerHTML = '';

        // Start loading state
        if (window.loadingStateManager) {
            window.loadingStateManager.startLoading(`view-${viewName}`, `Loading ${viewName}...`);
        }

        try {
            // Create component instance
            const componentName = this._getComponentName(viewName);
            const registry = window.ComponentRegistry.instance;
            
            if (!registry) {
                throw new Error('ComponentRegistry not available');
            }

            if (!registry.get(componentName)) {
                throw new Error(`Component not found: ${componentName}`);
            }

            // Create component with error boundary wrapper
            const ComponentClass = registry.get(componentName);
            const component = new ComponentClass();
            
            // Wrap component with error boundary if available
            if (window.errorBoundary) {
                const wrappedComponent = window.errorBoundary.wrapComponent(component, viewContainer);
                await wrappedComponent.init();
                await wrappedComponent.mount(viewContainer);
                this.components.set(viewName, wrappedComponent);
            } else {
                // Fallback to direct initialization
                await component.init();
                await component.mount(viewContainer);
                this.components.set(viewName, component);
            }

            // End loading state successfully
            if (window.loadingStateManager) {
                window.loadingStateManager.endLoading(`view-${viewName}`, true);
            }

            console.log(`View component ${componentName} initialized successfully`);

        } catch (error) {
            console.error(`Failed to initialize ${viewName} view:`, error);
            
            // End loading state with error
            if (window.loadingStateManager) {
                window.loadingStateManager.endLoading(`view-${viewName}`, false);
            }

            // Show fallback UI
            viewContainer.innerHTML = this.createFallbackUI(viewName, error);
            
            // Log error with context
            this.logError(error, {
                viewName,
                componentName: this._getComponentName(viewName),
                context: 'view-initialization'
            });
        }
    }

    /**
     * Create fallback UI for view errors
     */
    createFallbackUI(viewName, error) {
        const errorMessage = this.getUserFriendlyErrorMessage(error, viewName);
        
        return `
            <div class="view-fallback">
                <div class="alert alert-danger">
                    <h4><i class="bi bi-exclamation-triangle"></i> View Loading Error</h4>
                    <p>${errorMessage}</p>
                    <div class="mt-3">
                        <button class="btn btn-primary" onclick="window.ledgerApp.retryView('${viewName}')">
                            <i class="bi bi-arrow-clockwise"></i> Retry
                        </button>
                        <button class="btn btn-outline-secondary ms-2" onclick="location.reload()">
                            <i class="bi bi-arrow-clockwise"></i> Reload Page
                        </button>
                        <button class="btn btn-outline-secondary ms-2" onclick="window.ledgerApp.showView('dashboard')">
                            <i class="bi bi-house"></i> Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Retry view loading
     */
    async retryView(viewName) {
        console.log(`Retrying view: ${viewName}`);
        
        try {
            await this.showView(viewName);
        } catch (error) {
            console.error(`Retry failed for view ${viewName}:`, error);
        }
    }

    /**
     * Log error with context
     */
    logError(error, context = {}) {
        const errorInfo = {
            error: error.message,
            stack: error.stack,
            context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        console.error('Application Error:', errorInfo);
        
        // Send to error reporting service if available
        if (window.errorReportingService) {
            window.errorReportingService.reportError(errorInfo);
        }
    }

    /**
     * Get component name for view
     */
    _getComponentName(viewName) {
        const componentMap = {
            'dashboard': 'DashboardView',
            'character-sheet': 'CharacterSheetView'
        };
        return componentMap[viewName] || `${viewName.charAt(0).toUpperCase() + viewName.slice(1)}View`;
    }

    /**
     * Update navigation state
     */
    _updateNavigationState(viewName) {
        // Update button states
        document.getElementById('nav-dashboard').classList.remove('active');
        document.getElementById('nav-character-sheet').classList.remove('active');
        
        if (viewName === 'dashboard') {
            document.getElementById('nav-dashboard').classList.add('active');
        } else if (viewName === 'character-sheet') {
            document.getElementById('nav-character-sheet').classList.add('active');
        }
    }

    /**
     * Get current view
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * Get component instance
     */
    getComponent(viewName) {
        return this.components.get(viewName);
    }

    /**
     * Cleanup application
     */
    async cleanup() {
        // Cleanup components
        for (const [viewName, component] of this.components) {
            if (component && typeof component.cleanup === 'function') {
                try {
                    await component.cleanup();
                } catch (error) {
                    console.error(`Error cleaning up ${viewName} component:`, error);
                }
            }
        }

        this.components.clear();
        this.initialized = false;
        console.log('LedgerApp cleaned up successfully');
    }
}

// Create global instance
window.LedgerApp = LedgerApp;
window.ledgerApp = new LedgerApp();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.ledgerApp.init();
    } catch (error) {
        console.error('Failed to initialize LedgerApp:', error);
        document.body.innerHTML = `
            <div class="alert alert-danger m-3">
                <h4>Application Error</h4>
                <p>Failed to initialize The Ledger application. Please refresh the page and try again.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LedgerApp;
} 