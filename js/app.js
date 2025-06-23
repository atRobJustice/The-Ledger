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

            // Clear any lingering loading states
            if (this.loadingStateManager) {
                this.loadingStateManager.clearAllLoadingStates();
            }

            // Hide the static loading indicator from HTML
            const staticLoadingIndicator = document.getElementById('loading-indicator');
            if (staticLoadingIndicator) {
                staticLoadingIndicator.style.display = 'none';
            }

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
        
        // Only clear the loading UI if it actually exists
        const appContainer = document.getElementById('app');
        if (appContainer && appContainer.querySelector('.app-loading')) {
            // Clear only the loading UI, not the entire container
            const loadingElement = appContainer.querySelector('.app-loading');
            if (loadingElement) {
                loadingElement.remove();
            }
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
        
        // Try to register components, but don't fail if they're not available yet
        const componentsToRegister = [
            { name: 'DashboardView', globalName: 'DashboardView' },
            { name: 'NavigationPanel', globalName: 'NavigationPanel' },
            { name: 'CharacterListPanel', globalName: 'CharacterListPanel' },
            { name: 'QuickActionsPanel', globalName: 'QuickActionsPanel' },
            { name: 'CharacterSheetView', globalName: 'CharacterSheetView' },
            { name: 'InformationPanel', globalName: 'InformationPanel' },
            { name: 'AttributesPanel', globalName: 'AttributesPanel' },
            { name: 'SkillsPanel', globalName: 'SkillsPanel' },
            { name: 'VitalsPanel', globalName: 'VitalsPanel' },
            { name: 'DisciplinesPanel', globalName: 'DisciplinesPanel' },
            { name: 'MeritsFlawsPanel', globalName: 'MeritsFlawsPanel' },
            { name: 'BackgroundsPanel', globalName: 'BackgroundsPanel' },
            { name: 'LoresheetsPanel', globalName: 'LoresheetsPanel' },
            { name: 'ConvictionsPanel', globalName: 'ConvictionsPanel' },
            { name: 'ExperiencePanel', globalName: 'ExperiencePanel' }
        ];

        for (const component of componentsToRegister) {
            if (window[component.globalName]) {
                try {
                    await registry.register(component.name, window[component.globalName]);
                    console.log(`Component '${component.name}' registered successfully`);
                } catch (error) {
                    console.warn(`Failed to register component '${component.name}':`, error);
                }
            } else {
                console.log(`Component '${component.name}' not available yet, will register later`);
            }
        }

        // Set up a mechanism to register components when they become available
        this._setupComponentRegistrationObserver();

        console.log('All components registered successfully');
        
        // Register default views in AppRouter after components are loaded
        if (window.AppRouter && window.AppRouter.instance) {
            try {
                await window.AppRouter.instance.registerDefaultViews();
            } catch (error) {
                console.warn('Failed to register default views:', error);
            }
        }
    }

    /**
     * Set up observer to register components when they become available
     */
    _setupComponentRegistrationObserver() {
        const componentMap = {
            'DashboardView': 'DashboardView',
            'NavigationPanel': 'NavigationPanel',
            'CharacterListPanel': 'CharacterListPanel',
            'QuickActionsPanel': 'QuickActionsPanel',
            'CharacterSheetView': 'CharacterSheetView',
            'InformationPanel': 'InformationPanel',
            'AttributesPanel': 'AttributesPanel',
            'SkillsPanel': 'SkillsPanel',
            'VitalsPanel': 'VitalsPanel',
            'DisciplinesPanel': 'DisciplinesPanel',
            'MeritsFlawsPanel': 'MeritsFlawsPanel',
            'BackgroundsPanel': 'BackgroundsPanel',
            'LoresheetsPanel': 'LoresheetsPanel',
            'ConvictionsPanel': 'ConvictionsPanel',
            'ExperiencePanel': 'ExperiencePanel'
        };

        // Check for components periodically
        const checkInterval = setInterval(() => {
            const registry = window.ComponentRegistry.instance;
            if (!registry) return;

            let allRegistered = true;
            for (const [name, globalName] of Object.entries(componentMap)) {
                if (window[globalName] && !registry.isRegistered(name)) {
                    try {
                        registry.register(name, window[globalName]);
                        console.log(`Component '${name}' registered via observer`);
                    } catch (error) {
                        console.warn(`Failed to register component '${name}' via observer:`, error);
                    }
                }
                if (!registry.isRegistered(name)) {
                    allRegistered = false;
                }
            }

            // If all components are registered, stop checking
            if (allRegistered) {
                clearInterval(checkInterval);
                console.log('All components registered successfully');
            }
        }, 100);

        // Stop checking after 10 seconds to prevent infinite checking
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 10000);
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

        // Navigation event listeners - use centralized AppRouter methods
        const navDashboard = document.getElementById('nav-dashboard');
        const navCharacterSheet = document.getElementById('nav-character-sheet');
        
        if (navDashboard) {
            navDashboard.addEventListener('click', () => {
                if (window.navigateToDashboard) {
                    window.navigateToDashboard();
                } else if (window.AppRouter && window.AppRouter.instance) {
                    window.AppRouter.instance.navigateTo('DashboardView');
                }
            });
        }

        if (navCharacterSheet) {
            navCharacterSheet.addEventListener('click', () => {
                if (window.navigateToCharacterSheet) {
                    window.navigateToCharacterSheet();
                } else if (window.AppRouter && window.AppRouter.instance) {
                    window.AppRouter.instance.navigateTo('CharacterSheetView');
                }
            });
        }
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
     * Show loading indicator for a view
     */
    _showLoadingIndicator(viewName) {
        if (this.loadingStateManager) {
            this.loadingStateManager.startLoading(`view-${viewName}`, `Loading ${viewName}...`);
        }
    }

    /**
     * Hide loading indicator for a view
     */
    _hideLoadingIndicator(viewName) {
        if (this.loadingStateManager) {
            this.loadingStateManager.endLoading(`view-${viewName}`, true);
        }
    }

    /**
     * Handle view error
     */
    _handleViewError(data) {
        const { viewName, error } = data;
        if (this.loadingStateManager) {
            this.loadingStateManager.endLoading(`view-${viewName}`, false, error.message);
        }
        const viewContainer = document.getElementById(`${viewName}-view`);
        if (viewContainer) {
            viewContainer.innerHTML = this.createFallbackUI(viewName, error);
        }
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

        // Loading state is handled by the event system via _showLoadingIndicator
        // No need to start loading state here as it's already started by emitViewLoading

        try {
            // Ensure ComponentRegistry is available
            let registry = window.ComponentRegistry?.instance;
            if (!registry) {
                console.log('ComponentRegistry not available, attempting to initialize...');
                
                // Wait for ComponentRegistry class to be available
                let attempts = 0;
                const maxAttempts = 50;
                while (!window.ComponentRegistry && attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }

                if (!window.ComponentRegistry) {
                    throw new Error('ComponentRegistry class not available');
                }

                // Create instance if it doesn't exist
                if (!window.ComponentRegistry.instance) {
                    window.ComponentRegistry.instance = new window.ComponentRegistry();
                    await window.ComponentRegistry.instance.init();
                }

                registry = window.ComponentRegistry.instance;
                if (!registry) {
                    throw new Error('Failed to create ComponentRegistry instance');
                }
            }

            // Create component instance
            const componentName = this._getComponentName(viewName);
            
            // Debug information
            console.log('Debug info:', {
                componentName,
                registry: registry,
                registryType: typeof registry,
                registryGet: registry?.get,
                windowComponentRegistry: window.ComponentRegistry,
                windowComponentRegistryInstance: window.ComponentRegistry?.instance
            });
            
            let component;
            
            // Try to get component from registry first
            if (registry && registry.get) {
                const ComponentClass = registry.get(componentName);
                
                if (ComponentClass) {
                    component = new ComponentClass(componentName);
                } else {
                    // Try to load the component dynamically
                    console.log(`Component '${componentName}' not found in registry, attempting to load...`);
                    try {
                        await registry.load(componentName);
                        const loadedComponentClass = registry.get(componentName);
                        if (loadedComponentClass) {
                            component = new loadedComponentClass(componentName);
                        }
                    } catch (loadError) {
                        console.warn(`Failed to load component '${componentName}':`, loadError);
                    }
                }
            }
            
            // If still no component, create fallback
            if (!component) {
                console.warn(`Component '${componentName}' not available, creating fallback component`);
                const FallbackComponent = class FallbackComponent extends (window.BaseComponent || class {}) {
                    constructor(id, config = {}) {
                        super(id, config);
                    }
                    
                    render() {
                        return `
                            <div class="fallback-component">
                                <div class="alert alert-warning">
                                    <h4>Component Not Available</h4>
                                    <p>The component '${componentName}' could not be loaded.</p>
                                    <p>This might be due to a loading issue or missing dependency.</p>
                                    <p>Registry available: ${!!registry}</p>
                                    <p>ComponentRegistry class available: ${!!window.ComponentRegistry}</p>
                                </div>
                            </div>
                        `;
                    }
                    
                    async init() {
                        console.log(`Fallback component '${componentName}' initialized`);
                    }
                    
                    async mount(container) {
                        if (container) {
                            container.innerHTML = this.render();
                        }
                    }
                };
                
                component = new FallbackComponent(componentName);
            }

            // Wrap component with error boundary if available
            if (window.errorBoundary) {
                console.log(`Wrapping component ${componentName} with error boundary...`);
                console.log('Component:', component);
                console.log('Component methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(component)));
                
                const wrappedComponent = window.errorBoundary.wrapComponent(component, viewContainer);
                console.log('Wrapped component:', wrappedComponent);
                console.log('Wrapped component methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(wrappedComponent)));
                
                await wrappedComponent.init();
                await wrappedComponent.mount(viewContainer);
                this.components.set(viewName, wrappedComponent);
            } else {
                // Fallback to direct initialization
                await component.init();
                await component.mount(viewContainer);
                this.components.set(viewName, component);
            }

            // Loading state is ended by the event system via _hideLoadingIndicator
            // No need to end loading state here as it's handled by emitViewLoaded

            console.log(`View component ${componentName} initialized successfully`);

        } catch (error) {
            console.error(`Failed to initialize ${viewName} view:`, error);
            
            // Loading state is ended by the event system via _handleViewError
            // No need to end loading state here as it's handled by emitViewError

            // Show fallback UI
            viewContainer.innerHTML = this.createFallbackUI(viewName, error);
            
            // Log error with context
            this.logError(error, {
                viewName,
                componentName: this._getComponentName(viewName),
                context: 'view-initialization',
                registryAvailable: !!window.ComponentRegistry?.instance,
                availableComponents: window.ComponentRegistry?.instance ? Array.from(window.ComponentRegistry.instance.list()) : []
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

// Ensure ComponentRegistry is available globally - make it synchronous
if (window.ComponentRegistry && !window.ComponentRegistry.instance) {
    try {
        window.ComponentRegistry.instance = new window.ComponentRegistry();
        // Initialize synchronously to avoid timing issues
        window.ComponentRegistry.instance._setupDefaultPaths();
        window.ComponentRegistry.instance._initialized = true;
        console.log('Global ComponentRegistry instance created and initialized');
    } catch (error) {
        console.warn('Failed to initialize global ComponentRegistry instance:', error);
    }
}

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