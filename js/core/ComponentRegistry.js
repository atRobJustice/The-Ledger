/**
 * ComponentRegistry - Manages component registration and dynamic loading
 * Provides a centralized registry for all components in The Ledger
 */
class ComponentRegistry {
    /**
     * Create a new ComponentRegistry instance
     */
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
        this.loadingPromises = new Map();
        this.componentPaths = new Map();
        this._initialized = false;
    }

    /**
     * Initialize the registry
     * @returns {Promise<void>}
     */
    async init() {
        if (this._initialized) {
            console.warn('ComponentRegistry already initialized');
            return;
        }

        try {
            // Set up default component paths
            this._setupDefaultPaths();
            
            this._initialized = true;
            console.log('ComponentRegistry initialized successfully');
        } catch (error) {
            console.error('Failed to initialize ComponentRegistry:', error);
            throw error;
        }
    }

    /**
     * Register a component class
     * @param {string} name - Component name
     * @param {Function} componentClass - Component class constructor
     * @param {Object} options - Registration options
     * @returns {boolean} Success status
     */
    register(name, componentClass, options = {}) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            if (!componentClass || typeof componentClass !== 'function') {
                throw new Error('Component class must be a function');
            }

            if (this.components.has(name)) {
                console.warn(`Component '${name}' is already registered. Overwriting...`);
            }

            // Validate component class has required methods
            if (typeof componentClass.prototype.render !== 'function') {
                throw new Error(`Component class '${name}' must implement render() method`);
            }

            this.components.set(name, {
                class: componentClass,
                options: options,
                registeredAt: Date.now()
            });

            // Mark as loaded if it's already available
            this.loadedComponents.add(name);

            console.log(`Component '${name}' registered successfully`);
            return true;
        } catch (error) {
            console.error(`Failed to register component '${name}':`, error);
            throw error;
        }
    }

    /**
     * Dynamically load a component script
     * @param {string} name - Component name to load
     * @returns {Promise<Function>} Loaded component class
     */
    async load(name) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            // Check if already loaded
            if (this.loadedComponents.has(name)) {
                console.log(`Component '${name}' already loaded`);
                return this.get(name);
            }

            // Check if already loading
            if (this.loadingPromises.has(name)) {
                console.log(`Component '${name}' is already loading`);
                return await this.loadingPromises.get(name);
            }

            // Get component path
            const componentPath = this._getComponentPath(name);
            if (!componentPath) {
                throw new Error(`No path configured for component '${name}'`);
            }

            // Create loading promise
            const loadingPromise = this._loadComponentScript(componentPath, name);
            this.loadingPromises.set(name, loadingPromise);

            try {
                const componentClass = await loadingPromise;
                
                // Register the loaded component
                this.register(name, componentClass);
                
                // Clean up loading promise
                this.loadingPromises.delete(name);
                
                console.log(`Component '${name}' loaded successfully`);
                return componentClass;
            } catch (error) {
                // Clean up loading promise on error
                this.loadingPromises.delete(name);
                throw error;
            }
        } catch (error) {
            console.error(`Failed to load component '${name}':`, error);
            throw error;
        }
    }

    /**
     * Create a component instance
     * @param {string} name - Component name
     * @param {Object} config - Component configuration
     * @returns {Promise<BaseComponent>} Component instance
     */
    async create(name, config = {}) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            // Load component if not already loaded
            if (!this.loadedComponents.has(name)) {
                await this.load(name);
            }

            // Get component class
            const componentInfo = this.components.get(name);
            if (!componentInfo) {
                throw new Error(`Component '${name}' not found in registry`);
            }

            const { class: ComponentClass } = componentInfo;

            // Create instance
            const instance = new ComponentClass(name, config);

            console.log(`Component instance '${name}' created successfully`);
            return instance;
        } catch (error) {
            console.error(`Failed to create component instance '${name}':`, error);
            throw error;
        }
    }

    /**
     * Get a registered component class
     * @param {string} name - Component name
     * @returns {Function|null} Component class or null if not found
     */
    get(name) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            const componentInfo = this.components.get(name);
            if (!componentInfo) {
                console.warn(`Component '${name}' not found in registry`);
                return null;
            }

            return componentInfo.class;
        } catch (error) {
            console.error(`Failed to get component '${name}':`, error);
            throw error;
        }
    }

    /**
     * Get component information
     * @param {string} name - Component name
     * @returns {Object|null} Component info or null if not found
     */
    getInfo(name) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            const componentInfo = this.components.get(name);
            if (!componentInfo) {
                return null;
            }

            return {
                name: name,
                class: componentInfo.class,
                options: componentInfo.options,
                registeredAt: componentInfo.registeredAt,
                isLoaded: this.loadedComponents.has(name),
                isLoading: this.loadingPromises.has(name)
            };
        } catch (error) {
            console.error(`Failed to get component info for '${name}':`, error);
            throw error;
        }
    }

    /**
     * Unregister a component
     * @param {string} name - Component name to unregister
     * @returns {boolean} Success status
     */
    unregister(name) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            if (!this.components.has(name)) {
                console.warn(`Component '${name}' not found in registry`);
                return false;
            }

            // Remove from all collections
            this.components.delete(name);
            this.loadedComponents.delete(name);
            this.loadingPromises.delete(name);

            console.log(`Component '${name}' unregistered successfully`);
            return true;
        } catch (error) {
            console.error(`Failed to unregister component '${name}':`, error);
            throw error;
        }
    }

    /**
     * Get all registered component names
     * @returns {Array<string>} Array of component names
     */
    list() {
        try {
            return Array.from(this.components.keys());
        } catch (error) {
            console.error('Failed to list components:', error);
            throw error;
        }
    }

    /**
     * Get all loaded component names
     * @returns {Array<string>} Array of loaded component names
     */
    listLoaded() {
        try {
            return Array.from(this.loadedComponents);
        } catch (error) {
            console.error('Failed to list loaded components:', error);
            throw error;
        }
    }

    /**
     * Get all currently loading component names
     * @returns {Array<string>} Array of loading component names
     */
    listLoading() {
        try {
            return Array.from(this.loadingPromises.keys());
        } catch (error) {
            console.error('Failed to list loading components:', error);
            throw error;
        }
    }

    /**
     * Check if a component is registered
     * @param {string} name - Component name
     * @returns {boolean} True if registered
     */
    isRegistered(name) {
        return this.components.has(name);
    }

    /**
     * Check if a component is loaded
     * @param {string} name - Component name
     * @returns {boolean} True if loaded
     */
    isLoaded(name) {
        return this.loadedComponents.has(name);
    }

    /**
     * Check if a component is currently loading
     * @param {string} name - Component name
     * @returns {boolean} True if loading
     */
    isLoading(name) {
        return this.loadingPromises.has(name);
    }

    /**
     * Clear all registered components
     * @returns {Promise<void>}
     */
    async clear() {
        try {
            // Cancel any ongoing loading operations
            for (const [name, promise] of this.loadingPromises) {
                console.log(`Cancelling load for component '${name}'`);
            }

            // Clear all collections
            this.components.clear();
            this.loadedComponents.clear();
            this.loadingPromises.clear();

            console.log('ComponentRegistry cleared successfully');
        } catch (error) {
            console.error('Failed to clear ComponentRegistry:', error);
            throw error;
        }
    }

    /**
     * Get registry statistics
     * @returns {Object} Registry statistics
     */
    getStats() {
        return {
            totalRegistered: this.components.size,
            totalLoaded: this.loadedComponents.size,
            currentlyLoading: this.loadingPromises.size,
            componentPaths: this.componentPaths.size
        };
    }

    // Private methods

    /**
     * Set up default component paths
     * @private
     */
    _setupDefaultPaths() {
        // Dashboard components
        this.componentPaths.set('DashboardView', 'js/components/dashboard/DashboardView.js');
        this.componentPaths.set('CharacterListPanel', 'js/components/dashboard/CharacterListPanel.js');
        this.componentPaths.set('QuickActionsPanel', 'js/components/dashboard/QuickActionsPanel.js');
        this.componentPaths.set('NavigationPanel', 'js/components/dashboard/NavigationPanel.js');

        // Character sheet components
        this.componentPaths.set('CharacterSheetView', 'js/components/character-sheet/CharacterSheetView.js');
        this.componentPaths.set('InformationPanel', 'js/components/character-sheet/InformationPanel.js');
        this.componentPaths.set('AttributesPanel', 'js/components/character-sheet/AttributesPanel.js');
        this.componentPaths.set('SkillsPanel', 'js/components/character-sheet/SkillsPanel.js');
        this.componentPaths.set('VitalsPanel', 'js/components/character-sheet/VitalsPanel.js');
        this.componentPaths.set('DisciplinesPanel', 'js/components/character-sheet/DisciplinesPanel.js');
        this.componentPaths.set('MeritsFlawsPanel', 'js/components/character-sheet/MeritsFlawsPanel.js');
        this.componentPaths.set('BackgroundsPanel', 'js/components/character-sheet/BackgroundsPanel.js');
        this.componentPaths.set('LoresheetsPanel', 'js/components/character-sheet/LoresheetsPanel.js');
        this.componentPaths.set('ConvictionsPanel', 'js/components/character-sheet/ConvictionsPanel.js');
        this.componentPaths.set('ExperiencePanel', 'js/components/character-sheet/ExperiencePanel.js');

        // Shared components
        this.componentPaths.set('ModalComponent', 'js/components/shared/ModalComponent.js');
        this.componentPaths.set('ButtonComponent', 'js/components/shared/ButtonComponent.js');
        this.componentPaths.set('DropdownComponent', 'js/components/shared/DropdownComponent.js');
        this.componentPaths.set('TrackBoxComponent', 'js/components/shared/TrackBoxComponent.js');
        this.componentPaths.set('DotTrackComponent', 'js/components/shared/DotTrackComponent.js');
    }

    /**
     * Get component path for a given name
     * @private
     * @param {string} name - Component name
     * @returns {string|null} Component path or null if not found
     */
    _getComponentPath(name) {
        return this.componentPaths.get(name) || null;
    }

    /**
     * Load a component script dynamically
     * @private
     * @param {string} path - Script path
     * @param {string} name - Component name
     * @returns {Promise<Function>} Loaded component class
     */
    async _loadComponentScript(path, name) {
        return new Promise((resolve, reject) => {
            try {
                // Check if script is already loaded
                const existingScript = document.querySelector(`script[src="${path}"]`);
                if (existingScript) {
                    // Script already loaded, try to get the component class
                    const componentClass = this._getComponentClassFromGlobal(name);
                    if (componentClass) {
                        resolve(componentClass);
                        return;
                    }
                }

                // Create script element
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = path;
                script.async = true;

                // Set up event handlers
                script.onload = () => {
                    try {
                        const componentClass = this._getComponentClassFromGlobal(name);
                        if (componentClass) {
                            resolve(componentClass);
                        } else {
                            reject(new Error(`Component class '${name}' not found after script load`));
                        }
                    } catch (error) {
                        reject(error);
                    }
                };

                script.onerror = () => {
                    reject(new Error(`Failed to load script: ${path}`));
                };

                // Add to document
                document.head.appendChild(script);

                // Set timeout for loading
                setTimeout(() => {
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                        reject(new Error(`Timeout loading component script: ${path}`));
                    }
                }, 10000); // 10 second timeout

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get component class from global scope
     * @private
     * @param {string} name - Component name
     * @returns {Function|null} Component class or null if not found
     */
    _getComponentClassFromGlobal(name) {
        // Try different naming conventions
        const possibleNames = [
            name,
            `${name}Component`,
            `${name}View`,
            `${name}Panel`
        ];

        for (const className of possibleNames) {
            if (typeof window[className] === 'function') {
                return window[className];
            }
        }

        return null;
    }
}

// Create global instance
window.ComponentRegistry = ComponentRegistry;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentRegistry;
} 