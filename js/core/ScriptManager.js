/**
 * ScriptManager - Manages script loading and dependency resolution
 * Provides centralized script management for The Ledger application
 */
class ScriptManager {
    /**
     * Create a new ScriptManager instance
     */
    constructor() {
        this.loadedScripts = new Set();
        this.loadingPromises = new Map();
        this.dependencies = new Map();
        this.dependencyGraph = new Map();
        this.circularDependencyStack = new Set();
        this._initialized = false;
        
        // Default timeout for script loading (10 seconds)
        this.loadTimeout = 10000;
        
        // Default base path for scripts
        this.basePath = '';
    }

    /**
     * Initialize the script manager
     * @param {Object} config - Configuration options
     * @returns {Promise<void>}
     */
    async init(config = {}) {
        if (this._initialized) {
            console.warn('ScriptManager already initialized');
            return;
        }

        try {
            // Apply configuration
            if (config.loadTimeout) {
                this.loadTimeout = config.loadTimeout;
            }
            if (config.basePath) {
                this.basePath = config.basePath;
            }

            // Set up default dependencies
            this._setupDefaultDependencies();
            
            this._initialized = true;
            console.log('ScriptManager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize ScriptManager:', error);
            throw error;
        }
    }

    /**
     * Load a single script file
     * @param {string} path - Script file path
     * @param {Object} options - Loading options
     * @returns {Promise<void>}
     */
    async loadScript(path, options = {}) {
        try {
            if (!path || typeof path !== 'string') {
                throw new Error('Script path must be a non-empty string');
            }

            // Normalize path
            const normalizedPath = this._normalizePath(path);

            // Check if already loaded
            if (this.isLoaded(normalizedPath)) {
                console.log(`Script '${normalizedPath}' already loaded`);
                return;
            }

            // Check if already loading
            const existingPromise = this.getLoadingPromise(normalizedPath);
            if (existingPromise) {
                console.log(`Script '${normalizedPath}' is already loading`);
                return await existingPromise;
            }

            // Create loading promise
            const loadingPromise = this._loadScriptFile(normalizedPath, options);
            this.loadingPromises.set(normalizedPath, loadingPromise);

            try {
                await loadingPromise;
                
                // Mark as loaded
                this.loadedScripts.add(normalizedPath);
                
                // Clean up loading promise
                this.loadingPromises.delete(normalizedPath);
                
                console.log(`Script '${normalizedPath}' loaded successfully`);
            } catch (error) {
                // Clean up loading promise on error
                this.loadingPromises.delete(normalizedPath);
                throw error;
            }
        } catch (error) {
            console.error(`Failed to load script '${path}':`, error);
            throw error;
        }
    }

    /**
     * Load a component and its dependencies
     * @param {string} name - Component name
     * @param {Object} options - Loading options
     * @returns {Promise<void>}
     */
    async loadComponent(name, options = {}) {
        try {
            if (!name || typeof name !== 'string') {
                throw new Error('Component name must be a non-empty string');
            }

            console.log(`Loading component '${name}' and dependencies...`);

            // Get component dependencies
            const dependencies = this._getComponentDependencies(name);
            
            // Load dependencies first
            await this._loadDependencies(dependencies, options);

            // Load the component itself
            const componentPath = this._getComponentPath(name);
            if (componentPath) {
                await this.loadScript(componentPath, options);
            }

            console.log(`Component '${name}' and dependencies loaded successfully`);
        } catch (error) {
            console.error(`Failed to load component '${name}':`, error);
            throw error;
        }
    }

    /**
     * Load a view and all required components
     * @param {string} viewName - View name
     * @param {Object} options - Loading options
     * @returns {Promise<void>}
     */
    async loadView(viewName, options = {}) {
        try {
            if (!viewName || typeof viewName !== 'string') {
                throw new Error('View name must be a non-empty string');
            }

            console.log(`Loading view '${viewName}' and all components...`);

            // Get view dependencies
            const viewDependencies = this._getViewDependencies(viewName);
            
            // Load all dependencies
            await this._loadDependencies(viewDependencies, options);

            // Load the view itself
            const viewPath = this._getViewPath(viewName);
            if (viewPath) {
                await this.loadScript(viewPath, options);
            }

            console.log(`View '${viewName}' and all components loaded successfully`);
        } catch (error) {
            console.error(`Failed to load view '${viewName}':`, error);
            throw error;
        }
    }

    /**
     * Check if a script is already loaded
     * @param {string} path - Script path
     * @returns {boolean} True if script is loaded
     */
    isLoaded(path) {
        if (!path || typeof path !== 'string') {
            return false;
        }
        const normalizedPath = this._normalizePath(path);
        return this.loadedScripts.has(normalizedPath);
    }

    /**
     * Get existing loading promise for a script
     * @param {string} path - Script path
     * @returns {Promise|null} Loading promise or null if not loading
     */
    getLoadingPromise(path) {
        if (!path || typeof path !== 'string') {
            return null;
        }
        const normalizedPath = this._normalizePath(path);
        return this.loadingPromises.get(normalizedPath) || null;
    }

    /**
     * Clear loaded scripts cache
     * @returns {Promise<void>}
     */
    async clearCache() {
        try {
            console.log('Clearing ScriptManager cache...');
            
            // Clear all collections
            this.loadedScripts.clear();
            this.loadingPromises.clear();
            this.circularDependencyStack.clear();
            
            console.log('ScriptManager cache cleared successfully');
        } catch (error) {
            console.error('Failed to clear ScriptManager cache:', error);
            throw error;
        }
    }

    /**
     * Add a dependency relationship
     * @param {string} script - Script that depends on others
     * @param {Array<string>} dependencies - Array of dependency paths
     */
    addDependencies(script, dependencies) {
        try {
            if (!script || typeof script !== 'string') {
                throw new Error('Script name must be a non-empty string');
            }

            if (!Array.isArray(dependencies)) {
                throw new Error('Dependencies must be an array');
            }

            const normalizedScript = this._normalizePath(script);
            const normalizedDependencies = dependencies.map(dep => this._normalizePath(dep));

            this.dependencies.set(normalizedScript, normalizedDependencies);
            
            // Update dependency graph
            this._updateDependencyGraph(normalizedScript, normalizedDependencies);

            console.log(`Dependencies added for '${normalizedScript}':`, normalizedDependencies);
        } catch (error) {
            console.error(`Failed to add dependencies for '${script}':`, error);
            throw error;
        }
    }

    /**
     * Get all dependencies for a script
     * @param {string} script - Script path
     * @returns {Array<string>} Array of dependency paths
     */
    getDependencies(script) {
        if (!script || typeof script !== 'string') {
            return [];
        }
        const normalizedScript = this._normalizePath(script);
        return this.dependencies.get(normalizedScript) || [];
    }

    /**
     * Check for circular dependencies
     * @param {string} script - Script to check
     * @returns {boolean} True if circular dependency detected
     */
    hasCircularDependencies(script) {
        try {
            if (!script || typeof script !== 'string') {
                return false;
            }

            const normalizedScript = this._normalizePath(script);
            this.circularDependencyStack.clear();
            
            return this._detectCircularDependencies(normalizedScript);
        } catch (error) {
            console.error(`Failed to check circular dependencies for '${script}':`, error);
            return false;
        }
    }

    /**
     * Get loading statistics
     * @returns {Object} Loading statistics
     */
    getStats() {
        return {
            loadedScripts: this.loadedScripts.size,
            currentlyLoading: this.loadingPromises.size,
            totalDependencies: this.dependencies.size,
            dependencyGraphSize: this.dependencyGraph.size
        };
    }

    /**
     * Get list of loaded scripts
     * @returns {Array<string>} Array of loaded script paths
     */
    getLoadedScripts() {
        return Array.from(this.loadedScripts);
    }

    /**
     * Get list of currently loading scripts
     * @returns {Array<string>} Array of loading script paths
     */
    getLoadingScripts() {
        return Array.from(this.loadingPromises.keys());
    }

    // Private methods

    /**
     * Set up default dependencies
     * @private
     */
    _setupDefaultDependencies() {
        // Core dependencies
        this.addDependencies('js/core/BaseComponent.js', []);
        this.addDependencies('js/core/ComponentRegistry.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/core/ScriptManager.js', []);
        this.addDependencies('js/core/AppRouter.js', ['js/core/BaseComponent.js']);

        // Dashboard components
        this.addDependencies('js/components/dashboard/DashboardView.js', [
            'js/core/BaseComponent.js',
            'js/components/dashboard/CharacterListPanel.js',
            'js/components/dashboard/QuickActionsPanel.js',
            'js/components/dashboard/NavigationPanel.js'
        ]);
        this.addDependencies('js/components/dashboard/CharacterListPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/dashboard/QuickActionsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/dashboard/NavigationPanel.js', ['js/core/BaseComponent.js']);

        // Character sheet components
        this.addDependencies('js/components/character-sheet/CharacterSheetView.js', [
            'js/core/BaseComponent.js',
            'js/components/character-sheet/InformationPanel.js',
            'js/components/character-sheet/AttributesPanel.js',
            'js/components/character-sheet/SkillsPanel.js',
            'js/components/character-sheet/VitalsPanel.js',
            'js/components/character-sheet/DisciplinesPanel.js',
            'js/components/character-sheet/MeritsFlawsPanel.js',
            'js/components/character-sheet/BackgroundsPanel.js',
            'js/components/character-sheet/LoresheetsPanel.js',
            'js/components/character-sheet/ConvictionsPanel.js',
            'js/components/character-sheet/ExperiencePanel.js'
        ]);

        // Individual panel dependencies
        this.addDependencies('js/components/character-sheet/InformationPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/AttributesPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/SkillsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/VitalsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/DisciplinesPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/MeritsFlawsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/BackgroundsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/LoresheetsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/ConvictionsPanel.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/character-sheet/ExperiencePanel.js', ['js/core/BaseComponent.js']);

        // Shared components
        this.addDependencies('js/components/shared/ModalComponent.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/shared/ButtonComponent.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/shared/DropdownComponent.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/shared/TrackBoxComponent.js', ['js/core/BaseComponent.js']);
        this.addDependencies('js/components/shared/DotTrackComponent.js', ['js/core/BaseComponent.js']);
    }

    /**
     * Normalize a script path
     * @private
     * @param {string} path - Script path
     * @returns {string} Normalized path
     */
    _normalizePath(path) {
        if (!path) return '';
        
        // Remove leading/trailing whitespace
        let normalized = path.trim();
        
        // Add base path if not absolute
        if (normalized && !normalized.startsWith('http') && !normalized.startsWith('/') && this.basePath) {
            normalized = this.basePath + '/' + normalized;
        }
        
        return normalized;
    }

    /**
     * Load a script file using DOM manipulation
     * @private
     * @param {string} path - Script path
     * @param {Object} options - Loading options
     * @returns {Promise<void>}
     */
    _loadScriptFile(path, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                // Check if script is already loaded in DOM
                const existingScript = document.querySelector(`script[src="${path}"]`);
                if (existingScript) {
                    console.log(`Script '${path}' already exists in DOM`);
                    resolve();
                    return;
                }

                // Create script element
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = path;
                script.async = options.async !== false;
                script.defer = options.defer === true;

                // Set up event handlers
                script.onload = () => {
                    console.log(`Script '${path}' loaded successfully`);
                    resolve();
                };

                script.onerror = () => {
                    reject(new Error(`Failed to load script: ${path}`));
                };

                // Add to document
                document.head.appendChild(script);

                // Set timeout for loading
                const timeout = options.timeout || this.loadTimeout;
                setTimeout(() => {
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                        reject(new Error(`Timeout loading script: ${path}`));
                    }
                }, timeout);

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get component dependencies
     * @private
     * @param {string} name - Component name
     * @returns {Array<string>} Array of dependency paths
     */
    _getComponentDependencies(name) {
        const componentPath = this._getComponentPath(name);
        if (!componentPath) {
            return [];
        }
        return this.getDependencies(componentPath);
    }

    /**
     * Get view dependencies
     * @private
     * @param {string} name - View name
     * @returns {Array<string>} Array of dependency paths
     */
    _getViewDependencies(name) {
        const viewPath = this._getViewPath(name);
        if (!viewPath) {
            return [];
        }
        return this.getDependencies(viewPath);
    }

    /**
     * Get component path
     * @private
     * @param {string} name - Component name
     * @returns {string|null} Component path
     */
    _getComponentPath(name) {
        // Map component names to their paths
        const componentPaths = {
            'DashboardView': 'js/components/dashboard/DashboardView.js',
            'CharacterListPanel': 'js/components/dashboard/CharacterListPanel.js',
            'QuickActionsPanel': 'js/components/dashboard/QuickActionsPanel.js',
            'NavigationPanel': 'js/components/dashboard/NavigationPanel.js',
            'CharacterSheetView': 'js/components/character-sheet/CharacterSheetView.js',
            'InformationPanel': 'js/components/character-sheet/InformationPanel.js',
            'AttributesPanel': 'js/components/character-sheet/AttributesPanel.js',
            'SkillsPanel': 'js/components/character-sheet/SkillsPanel.js',
            'VitalsPanel': 'js/components/character-sheet/VitalsPanel.js',
            'DisciplinesPanel': 'js/components/character-sheet/DisciplinesPanel.js',
            'MeritsFlawsPanel': 'js/components/character-sheet/MeritsFlawsPanel.js',
            'BackgroundsPanel': 'js/components/character-sheet/BackgroundsPanel.js',
            'LoresheetsPanel': 'js/components/character-sheet/LoresheetsPanel.js',
            'ConvictionsPanel': 'js/components/character-sheet/ConvictionsPanel.js',
            'ExperiencePanel': 'js/components/character-sheet/ExperiencePanel.js',
            'ModalComponent': 'js/components/shared/ModalComponent.js',
            'ButtonComponent': 'js/components/shared/ButtonComponent.js',
            'DropdownComponent': 'js/components/shared/DropdownComponent.js',
            'TrackBoxComponent': 'js/components/shared/TrackBoxComponent.js',
            'DotTrackComponent': 'js/components/shared/DotTrackComponent.js'
        };
        
        return componentPaths[name] || null;
    }

    /**
     * Get view path
     * @private
     * @param {string} name - View name
     * @returns {string|null} View path
     */
    _getViewPath(name) {
        // Map view names to their paths
        const viewPaths = {
            'DashboardView': 'js/components/dashboard/DashboardView.js',
            'CharacterSheetView': 'js/components/character-sheet/CharacterSheetView.js'
        };
        
        return viewPaths[name] || null;
    }

    /**
     * Load dependencies recursively
     * @private
     * @param {Array<string>} dependencies - Array of dependency paths
     * @param {Object} options - Loading options
     * @returns {Promise<void>}
     */
    async _loadDependencies(dependencies, options = {}) {
        for (const dependency of dependencies) {
            // Check for circular dependencies
            if (this.hasCircularDependencies(dependency)) {
                throw new Error(`Circular dependency detected for: ${dependency}`);
            }

            // Load dependency if not already loaded
            if (!this.isLoaded(dependency)) {
                await this.loadScript(dependency, options);
            }
        }
    }

    /**
     * Update dependency graph
     * @private
     * @param {string} script - Script name
     * @param {Array<string>} dependencies - Dependencies
     */
    _updateDependencyGraph(script, dependencies) {
        // Add script to graph if not exists
        if (!this.dependencyGraph.has(script)) {
            this.dependencyGraph.set(script, new Set());
        }

        // Add dependencies to graph
        for (const dependency of dependencies) {
            if (!this.dependencyGraph.has(dependency)) {
                this.dependencyGraph.set(dependency, new Set());
            }
            this.dependencyGraph.get(dependency).add(script);
        }
    }

    /**
     * Detect circular dependencies using DFS
     * @private
     * @param {string} script - Script to check
     * @param {Set} visited - Visited nodes
     * @param {Set} recursionStack - Recursion stack
     * @returns {boolean} True if circular dependency detected
     */
    _detectCircularDependencies(script, visited = new Set(), recursionStack = new Set()) {
        if (recursionStack.has(script)) {
            return true; // Circular dependency found
        }

        if (visited.has(script)) {
            return false; // Already visited, no cycle
        }

        visited.add(script);
        recursionStack.add(script);

        const dependencies = this.getDependencies(script);
        for (const dependency of dependencies) {
            if (this._detectCircularDependencies(dependency, visited, recursionStack)) {
                return true;
            }
        }

        recursionStack.delete(script);
        return false;
    }
}

// Create global instance
window.ScriptManager = ScriptManager;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScriptManager;
} 