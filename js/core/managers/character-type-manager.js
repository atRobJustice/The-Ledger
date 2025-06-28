/**
 * @fileoverview Character Type Manager for The Ledger
 * @version 1.0.0
 * @description Manages character type switching between vampire and hunter characters.
 *             Handles UI visibility, data loading, and character type-specific functionality.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires jQuery - Used for DOM manipulation and event handling
 * @requires window.characterManager - For character data management
 * 
 * @class CharacterTypeManager
 * @classdesc Main class for managing character type switching and UI updates
 * 
 * @property {string} currentType - Current character type ('vampire' or 'hunter')
 * @property {boolean} isInitialized - Boolean indicating if the manager is initialized
 * 
 * @method constructor - Initializes the character type manager
 * @method init - Initializes the manager and sets up event listeners
 * @method switchToType - Switches to a specific character type
 * @method updateUI - Updates UI elements based on character type
 * @method showVampireElements - Shows vampire-specific elements
 * @method showHunterElements - Shows hunter-specific elements
 * @method hideAllTypeElements - Hides all character type-specific elements
 * @method updateToolbar - Updates toolbar buttons based on character type
 * @method updateCharacterData - Updates character data structure for new type
 * 
 * @example
 * const characterTypeManager = new CharacterTypeManager();
 * await characterTypeManager.init();
 * await characterTypeManager.switchToType('hunter');
 * 
 * @since 1.0.0
 */

class CharacterTypeManager {
    constructor() {
        this.currentType = 'vampire';
        this.isInitialized = false;
    }

    /**
     * Initialize the character type manager
     */
    async init() {
        if (this.isInitialized) return;

        try {
            // Set up event listeners for character type selection
            this.setupEventListeners();
            
            // Initialize with vampire type (default)
            await this.switchToType('vampire');
            
            this.isInitialized = true;
            console.log('CharacterTypeManager initialized');
            
        } catch (err) {
            console.error('Failed to initialize CharacterTypeManager:', err);
        }
    }

    /**
     * Set up event listeners for character type selection
     */
    setupEventListeners() {
        // Listen for character type radio button changes
        $('input[name="characterType"]').on('change', async (e) => {
            const newType = e.target.value;
            await this.switchToType(newType);
        });

        // Listen for character manager initialization
        $(document).on('characterManagerReady', async () => {
            // Update UI when character manager is ready
            this.updateUI();
        });
    }

    /**
     * Switch to a specific character type
     * @param {string} type - The character type to switch to ('vampire' or 'hunter')
     */
    async switchToType(type) {
        if (type === this.currentType) return;

        console.log(`Switching character type from ${this.currentType} to ${type}`);
        
        // Update current type
        this.currentType = type;
        
        // Set body data attribute for CSS-based visibility
        $('body').attr('data-character-type', this.currentType);
        
        // Update UI elements
        this.updateUI();
        
        // Update toolbar
        this.updateToolbar();
        
        // Update character data structure if needed
        await this.updateCharacterData();
        
        // Trigger custom event for other modules
        $(document).trigger('characterTypeChanged', { type: this.currentType });
    }

    /**
     * Update UI elements based on character type
     */
    updateUI() {
        if (this.currentType === 'vampire') {
            this.showVampireElements();
        } else if (this.currentType === 'hunter') {
            this.showHunterElements();
        }
    }

    /**
     * Show vampire-specific elements
     */
    showVampireElements() {
        // Update radio button
        $('#vampireType').prop('checked', true);
        
        // Show vampire elements (CSS will handle visibility)
        $('.vampire-only').show();
        $('.hunter-only').hide();
    }

    /**
     * Show hunter-specific elements
     */
    showHunterElements() {
        // Update radio button
        $('#hunterType').prop('checked', true);
        
        // Show hunter elements (CSS will handle visibility)
        $('.hunter-only').show();
        $('.vampire-only').hide();
    }

    /**
     * Hide all character type-specific elements
     */
    hideAllTypeElements() {
        $('.vampire-only, .hunter-only').hide();
    }

    /**
     * Update toolbar buttons based on character type
     */
    updateToolbar() {
        if (this.currentType === 'vampire') {
            $('.toolbar-btn.vampire-only').show();
            $('.toolbar-btn.hunter-only').hide();
        } else if (this.currentType === 'hunter') {
            $('.toolbar-btn.vampire-only').hide();
            $('.toolbar-btn.hunter-only').show();
        }
    }

    /**
     * Update character data structure for new type
     */
    async updateCharacterData() {
        if (!window.characterManager) return;

        try {
            const currentCharacter = await window.characterManager.getCurrentCharacter();
            if (!currentCharacter) return;

            // Add character type to character data
            currentCharacter.characterType = this.currentType;

            // Initialize type-specific data structures if they don't exist
            if (this.currentType === 'hunter') {
                if (!currentCharacter.edges) {
                    currentCharacter.edges = [];
                }
                if (!currentCharacter.drive) {
                    currentCharacter.drive = '';
                }
                if (!currentCharacter.creed) {
                    currentCharacter.creed = '';
                }
                if (!currentCharacter.cell) {
                    currentCharacter.cell = '';
                }
                if (!currentCharacter.archetype) {
                    currentCharacter.archetype = '';
                }
                if (!currentCharacter.danger) {
                    currentCharacter.danger = 0;
                }
                if (!currentCharacter.desperation) {
                    currentCharacter.desperation = 0;
                }
                if (!currentCharacter.touchstones) {
                    currentCharacter.touchstones = [];
                }
                
                // Load edges if edge manager is available
                if (window.edgeManager) {
                    await window.edgeManager.loadEdges();
                }
            } else if (this.currentType === 'vampire') {
                if (!currentCharacter.disciplines) {
                    currentCharacter.disciplines = [];
                }
                if (!currentCharacter.resonance) {
                    currentCharacter.resonance = '';
                }
                if (!currentCharacter.temperament) {
                    currentCharacter.temperament = '';
                }
                if (!currentCharacter.sire) {
                    currentCharacter.sire = '';
                }
                if (!currentCharacter.clan) {
                    currentCharacter.clan = '';
                }
                if (!currentCharacter.generation) {
                    currentCharacter.generation = '';
                }
                if (!currentCharacter.compulsion) {
                    currentCharacter.compulsion = '';
                }
                if (!currentCharacter.ambition) {
                    currentCharacter.ambition = '';
                }
                if (!currentCharacter.desire) {
                    currentCharacter.desire = '';
                }
                if (!currentCharacter.predator) {
                    currentCharacter.predator = '';
                }
                if (!currentCharacter.bloodPotency) {
                    currentCharacter.bloodPotency = 1;
                }
                if (!currentCharacter.hunger) {
                    currentCharacter.hunger = 1;
                }
                if (!currentCharacter.humanity) {
                    currentCharacter.humanity = 7;
                }
                if (!currentCharacter.loresheets) {
                    currentCharacter.loresheets = [];
                }
                if (!currentCharacter.convictions) {
                    currentCharacter.convictions = [];
                }
            }

            // Save the updated character
            await window.characterManager.saveCurrentCharacter(currentCharacter);

        } catch (err) {
            console.error('Failed to update character data for new type:', err);
        }
    }

    /**
     * Get the current character type
     * @returns {string} The current character type
     */
    getCurrentType() {
        return this.currentType;
    }

    /**
     * Check if the current type is vampire
     * @returns {boolean} True if current type is vampire
     */
    isVampire() {
        return this.currentType === 'vampire';
    }

    /**
     * Check if the current type is hunter
     * @returns {boolean} True if current type is hunter
     */
    isHunter() {
        return this.currentType === 'hunter';
    }
}

// Create and export the character type manager instance
const characterTypeManager = new CharacterTypeManager();

// Initialize when DOM is ready
$(document).ready(async () => {
    await characterTypeManager.init();
});

// Expose globally for use by other modules
window.characterTypeManager = characterTypeManager;

export default characterTypeManager; 