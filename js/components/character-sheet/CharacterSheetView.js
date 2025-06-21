/**
 * CharacterSheetView - Main character sheet view component
 * Orchestrates all character sheet panels and manages character data flow
 */
class CharacterSheetView extends BaseComponent {
    constructor(id = 'character-sheet-view', config = {}) {
        super(id, {
            autoReRender: false,
            ...config
        });
        
        this.panels = new Map();
        this.characterData = {};
        this.isLocked = false;
        this.characterManager = null;
        
        // Panel configuration
        this.panelConfig = {
            information: { component: 'InformationPanel', container: 'information-panel-container' },
            vitals: { component: 'VitalsPanel', container: 'vitals-panel-container' },
            attributes: { component: 'AttributesPanel', container: 'attributes-panel-container' },
            skills: { component: 'SkillsPanel', container: 'skills-panel-container' },
            disciplines: { component: 'DisciplinesPanel', container: 'disciplines-panel-container' },
            meritsFlaws: { component: 'MeritsFlawsPanel', container: 'merits-flaws-panel-container' },
            backgrounds: { component: 'BackgroundsPanel', container: 'backgrounds-panel-container' },
            loresheets: { component: 'LoresheetsPanel', container: 'loresheets-panel-container' },
            convictions: { component: 'ConvictionsPanel', container: 'convictions-panel-container' },
            experience: { component: 'ExperiencePanel', container: 'experience-panel-container' }
        };
    }

    /**
     * Initialize the component
     */
    async onInit() {
        // Wait for character manager to be available
        await this._waitForCharacterManager();
        
        // Load component registry
        await this._loadComponentRegistry();
        
        // Set up event listeners for character manager
        this._setupCharacterManagerListeners();
    }

    /**
     * Set up event listeners after rendering
     */
    async afterRender() {
        // Initialize all panels
        await this._initializePanels();
        
        // Set up component-specific event listeners
        this._setupEventListeners();
        
        // Load current character data if available
        await this._loadCurrentCharacter();
    }

    /**
     * Render the character sheet view
     */
    render() {
        return `
            <div class="character-sheet-view">
                <div class="character-sheet container">
                    <!-- Information Section -->
                    <div id="information-panel-container"></div>
                    
                    <!-- Vitals Section -->
                    <div id="vitals-panel-container"></div>
                    
                    <!-- Attributes Section -->
                    <div id="attributes-panel-container"></div>
                    
                    <!-- Skills Section -->
                    <div id="skills-panel-container"></div>
                    
                    <!-- Other Section -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <h3 class="mb-3">&nbsp;</h3>
                        </div>
                        
                        <!-- Left Column -->
                        <div class="col-md-4 d-flex flex-column">
                            <div id="disciplines-panel-container"></div>
                        </div>
                        
                        <!-- Middle Column -->
                        <div class="col-md-4 d-flex flex-column">
                            <div id="merits-flaws-panel-container"></div>
                            <div id="backgrounds-panel-container"></div>
                            <div id="loresheets-panel-container"></div>
                        </div>
                        
                        <!-- Right Column -->
                        <div class="col-md-4 d-flex flex-column">
                            <!-- Merits and Flaws will be handled by MeritsFlawsPanel -->
                        </div>
                    </div>
                    
                    <!-- Convictions Section -->
                    <div id="convictions-panel-container"></div>
                    
                    <!-- Experience Section -->
                    <div id="experience-panel-container"></div>
                </div>
            </div>
        `;
    }

    /**
     * Update the component with new data
     */
    async onUpdate(data) {
        if (data.characterData !== undefined) {
            this.characterData = data.characterData;
            await this._updateAllPanels();
        }
        
        if (data.isLocked !== undefined) {
            this.isLocked = data.isLocked;
            await this._updateLockState();
        }
    }

    /**
     * Initialize all panels
     */
    async _initializePanels() {
        const promises = [];
        
        for (const [panelName, config] of Object.entries(this.panelConfig)) {
            promises.push(this._initializePanel(panelName, config));
        }
        
        await Promise.all(promises);
        console.log('All character sheet panels initialized');
    }

    /**
     * Initialize a single panel
     */
    async _initializePanel(panelName, config) {
        try {
            const container = this.element.querySelector(`#${config.container}`);
            if (!container) {
                console.warn(`Container not found for panel: ${panelName}`);
                return;
            }

            // Get component class from registry
            const ComponentClass = window.ComponentRegistry?.get(config.component);
            if (!ComponentClass) {
                console.warn(`Component not found in registry: ${config.component}`);
                return;
            }

            // Create and mount panel
            const panel = new ComponentClass(`${panelName}-panel`, {
                parentView: this,
                panelName: panelName
            });

            await panel.mount(container);
            this.panels.set(panelName, panel);

            // Set up panel event listeners
            this._setupPanelEventListeners(panel, panelName);

            console.log(`Panel initialized: ${panelName}`);
        } catch (error) {
            console.error(`Failed to initialize panel ${panelName}:`, error);
        }
    }

    /**
     * Set up event listeners for a panel
     */
    _setupPanelEventListeners(panel, panelName) {
        // Listen for data changes from panels
        panel.on('fieldChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('attributeChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('skillChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('vitalChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('disciplineChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('meritFlawChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('backgroundChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('loresheetChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('convictionsChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });

        panel.on('xpChanged', (data) => {
            this._handlePanelDataChange(panelName, data);
        });
    }

    /**
     * Handle data changes from panels
     */
    _handlePanelDataChange(panelName, data) {
        // Update character data based on panel changes
        this._updateCharacterDataFromPanel(panelName, data);
        
        // Emit character data change event
        this.emit('characterDataChanged', {
            panelName: panelName,
            data: data,
            characterData: this.characterData
        });
        
        // Auto-save if character manager is available
        this._autoSave();
    }

    /**
     * Update character data from panel changes
     */
    _updateCharacterDataFromPanel(panelName, data) {
        switch (panelName) {
            case 'information':
                if (data.field) {
                    this.characterData[data.field] = data.value;
                }
                break;
            case 'attributes':
                if (data.attribute) {
                    if (!this.characterData.attributes) this.characterData.attributes = {};
                    this.characterData.attributes[data.attribute] = data.value;
                }
                break;
            case 'skills':
                if (data.skill) {
                    if (!this.characterData.skills) this.characterData.skills = {};
                    if (!this.characterData.skills[data.category]) this.characterData.skills[data.category] = {};
                    this.characterData.skills[data.category][data.skill] = data.value;
                }
                break;
            case 'vitals':
                if (data.vital) {
                    this.characterData[data.vital] = data.value;
                }
                break;
            case 'disciplines':
                if (data.disciplines) {
                    this.characterData.disciplines = data.disciplines;
                }
                break;
            case 'meritsFlaws':
                if (data.merits) {
                    this.characterData.merits = data.merits;
                }
                if (data.flaws) {
                    this.characterData.flaws = data.flaws;
                }
                break;
            case 'backgrounds':
                if (data.backgrounds) {
                    this.characterData.backgrounds = data.backgrounds;
                }
                if (data.backgroundFlaws) {
                    this.characterData.backgroundFlaws = data.backgroundFlaws;
                }
                break;
            case 'loresheets':
                if (data.loresheets) {
                    this.characterData.loresheets = data.loresheets;
                }
                break;
            case 'convictions':
                if (data.convictions) {
                    this.characterData.convictions = data.convictions;
                }
                break;
            case 'experience':
                if (data.xpData) {
                    this.characterData.xpData = data.xpData;
                }
                break;
        }
    }

    /**
     * Update all panels with character data
     */
    async _updateAllPanels() {
        const promises = [];
        
        for (const [panelName, panel] of this.panels) {
            if (panel && typeof panel.update === 'function') {
                promises.push(panel.update(this.characterData));
            }
        }
        
        await Promise.all(promises);
    }

    /**
     * Update lock state for all panels
     */
    async _updateLockState() {
        const promises = [];
        
        for (const [panelName, panel] of this.panels) {
            if (panel && typeof panel.setLockState === 'function') {
                promises.push(panel.setLockState(this.isLocked));
            }
        }
        
        await Promise.all(promises);
    }

    /**
     * Set up event listeners for the component
     */
    _setupEventListeners() {
        // Listen for character data changes from external sources
        document.addEventListener('characterLoaded', (e) => {
            this._handleCharacterLoaded(e.detail);
        });

        document.addEventListener('characterSaved', (e) => {
            this._handleCharacterSaved(e.detail);
        });

        document.addEventListener('characterCleared', (e) => {
            this._handleCharacterCleared();
        });

        document.addEventListener('lockStateChanged', (e) => {
            this._handleLockStateChanged(e.detail);
        });
    }

    /**
     * Set up event listeners for character manager
     */
    _setupCharacterManagerListeners() {
        if (!this.characterManager) return;

        // Listen for character manager events
        document.addEventListener('characterDataUpdated', (e) => {
            this._handleCharacterDataUpdated(e.detail);
        });
    }

    /**
     * Wait for character manager to be available
     */
    async _waitForCharacterManager() {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds with 100ms intervals
        
        while (!window.characterManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (window.characterManager) {
            this.characterManager = window.characterManager;
            console.log('Character manager found and attached');
        } else {
            console.warn('Character manager not found after waiting');
        }
    }

    /**
     * Load component registry
     */
    async _loadComponentRegistry() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.ComponentRegistry && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        
        if (!window.ComponentRegistry) {
            console.warn('Component registry not found, using fallback');
            // Fallback: load components directly
            await this._loadComponentsDirectly();
        }
    }

    /**
     * Load components directly as fallback
     */
    async _loadComponentsDirectly() {
        const components = [
            'InformationPanel',
            'VitalsPanel', 
            'AttributesPanel',
            'SkillsPanel',
            'DisciplinesPanel',
            'MeritsFlawsPanel',
            'BackgroundsPanel',
            'LoresheetsPanel',
            'ConvictionsPanel',
            'ExperiencePanel'
        ];

        for (const componentName of components) {
            if (!window[componentName]) {
                console.warn(`Component not found: ${componentName}`);
            }
        }
    }

    /**
     * Load current character data
     */
    async _loadCurrentCharacter() {
        if (this.characterManager && this.characterManager.currentCharacter) {
            const characterData = this.characterManager.currentCharacter;
            await this.loadCharacterData(characterData);
        }
    }

    /**
     * Handle character loaded event
     */
    async _handleCharacterLoaded(characterData) {
        await this.loadCharacterData(characterData);
    }

    /**
     * Handle character saved event
     */
    _handleCharacterSaved(characterData) {
        // Update local data if needed
        this.characterData = { ...this.characterData, ...characterData };
    }

    /**
     * Handle character cleared event
     */
    async _handleCharacterCleared() {
        await this.clearCharacterData();
    }

    /**
     * Handle lock state changed event
     */
    async _handleLockStateChanged(data) {
        this.isLocked = data.isLocked;
        await this._updateLockState();
    }

    /**
     * Handle character data updated event
     */
    async _handleCharacterDataUpdated(data) {
        this.characterData = { ...this.characterData, ...data };
        await this._updateAllPanels();
    }

    /**
     * Auto-save character data
     */
    async _autoSave() {
        if (this.characterManager && typeof this.characterManager.saveCurrentCharacter === 'function') {
            try {
                const data = this.gatherCharacterData();
                await this.characterManager.saveCurrentCharacter(data);
            } catch (error) {
                console.warn('Auto-save failed:', error);
            }
        }
    }

    /**
     * Load character data into all panels
     */
    async loadCharacterData(characterData) {
        this.characterData = characterData || {};
        await this._updateAllPanels();
        
        // Emit character loaded event
        this.emit('characterLoaded', { characterData: this.characterData });
    }

    /**
     * Clear character data from all panels
     */
    async clearCharacterData() {
        this.characterData = {};
        
        const promises = [];
        for (const [panelName, panel] of this.panels) {
            if (panel && typeof panel.clear === 'function') {
                promises.push(panel.clear());
            }
        }
        
        await Promise.all(promises);
        
        // Emit character cleared event
        this.emit('characterCleared');
    }

    /**
     * Gather character data from all panels
     */
    gatherCharacterData() {
        const data = { ...this.characterData };
        
        // Gather data from each panel
        for (const [panelName, panel] of this.panels) {
            if (panel && typeof panel.getData === 'function') {
                const panelData = panel.getData();
                Object.assign(data, panelData);
            }
        }
        
        return data;
    }

    /**
     * Get current character data
     */
    getCharacterData() {
        return this.characterData;
    }

    /**
     * Set lock state
     */
    async setLockState(isLocked) {
        this.isLocked = isLocked;
        await this._updateLockState();
        
        // Emit lock state changed event
        this.emit('lockStateChanged', { isLocked: this.isLocked });
    }

    /**
     * Get a specific panel
     */
    getPanel(panelName) {
        return this.panels.get(panelName);
    }

    /**
     * Get all panels
     */
    getAllPanels() {
        return this.panels;
    }

    /**
     * Refresh all panels
     */
    async refresh() {
        await this._updateAllPanels();
    }

    /**
     * Clean up on destroy
     */
    async onDestroy() {
        // Destroy all panels
        const promises = [];
        for (const [panelName, panel] of this.panels) {
            if (panel && typeof panel.destroy === 'function') {
                promises.push(panel.destroy());
            }
        }
        
        await Promise.all(promises);
        this.panels.clear();
        
        // Remove event listeners
        document.removeEventListener('characterLoaded', this._handleCharacterLoaded);
        document.removeEventListener('characterSaved', this._handleCharacterSaved);
        document.removeEventListener('characterCleared', this._handleCharacterCleared);
        document.removeEventListener('lockStateChanged', this._handleLockStateChanged);
        document.removeEventListener('characterDataUpdated', this._handleCharacterDataUpdated);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterSheetView;
} else if (typeof window !== 'undefined') {
    window.CharacterSheetView = CharacterSheetView;
} 