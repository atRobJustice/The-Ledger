/**
 * @fileoverview Character Manager for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Manages multiple characters in the application. Provides functionality for creating,
 *             loading, saving, switching, and deleting characters. Handles URL parameter support
 *             for loading specific characters and manages the UI for character selection.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires database-manager.js - Handles all database operations for character persistence
 * @requires manager-utils.js - Provides utility functions for trait management (TraitManagerUtils)
 * @requires jQuery - Used for DOM manipulation and event handling
 * @requires Bootstrap - Used for UI components and modals
 * @requires window.loadCharacterData - Function to load character data into the UI
 * @requires window.gatherCharacterData - Function to collect character data from the UI
 * @requires window.LockManager - Manages the lock state of the character sheet
 * @requires logger.js - Provides logging functionality
 * 
 * @class CharacterManager
 * @classdesc Main class for managing multiple characters in the application
 * 
 * @property {number|null} currentCharacterId - ID of the currently active character
 * @property {Array} characters - Array of all available characters
 * @property {boolean} isInitialized - Boolean indicating if the manager is initialized
 * 
 * @method constructor - Initializes the character manager with empty state
 * @method init - Initializes the character manager, loads characters, and sets up UI
 * @method loadCharacters - Loads all characters from the database
 * @method setCurrentCharacter - Sets the current character based on URL parameters or database
 * @method getCurrentCharacter - Retrieves the current character data from database
 * @method saveCurrentCharacter - Saves the current character data
 * @method createNewCharacter - Creates a new character with default or provided data
 * @method switchCharacter - Switches to a different character
 * @method deleteCharacter - Deletes a character from the database
 * @method initUI - Initializes the character management UI elements
 * @method updateCharacterList - Updates the character list display
 * @method updateCurrentCharacterDisplay - Updates the current character display
 * @method clearCurrentSheet - Clears the current character sheet
 * @method setCharacterName - Sets the name of the current character
 * @method showNewCharacterModal - Shows the modal for creating a new character
 * @method showCharacterManagementModal - Shows the character management modal
 * @method populateCharacterManagementList - Populates the character management list
 * @method confirmDeleteCharacter - Confirms character deletion
 * @method showDeleteConfirmationModal - Shows deletion confirmation modal
 * @method refreshCharacterManagementModal - Refreshes the character management modal
 * 
 * @typedef {Object} Character
 * @property {number} id - Unique identifier for the character
 * @property {string} name - Character name
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string} updatedAt - ISO timestamp of last update
 * @property {Object} [attributes] - Character attributes data
 * @property {Object} [skills] - Character skills data
 * @property {Object} [disciplines] - Character disciplines data
 * @property {Object} [merits] - Character merits data
 * @property {Object} [flaws] - Character flaws data
 * @property {Object} [backgrounds] - Character backgrounds data
 * @property {Object} [backgroundFlaws] - Character background flaws data
 * @property {Object} [coterieMerits] - Character coterie merits data
 * @property {Object} [coterieFlaws] - Character coterie flaws data
 * @property {Array} [loresheets] - Character loresheets data
 * @property {Array} [convictions] - Character convictions data
 * @property {boolean} [locked] - Whether the character sheet is locked
 * @property {string} [theme] - Character theme preference
 * @property {string} [discordWebhook] - Discord webhook URL for the character
 * 
 * @example
 * const characterManager = new CharacterManager();
 * await characterManager.init();
 * await characterManager.createNewCharacter({ name: 'New Character' });
 * await characterManager.switchCharacter(characterId);
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

/**
 * Character Manager for Ledger
 * Handles multiple character management and UI
 */

import databaseManager from './database-manager.js';
import { TraitManagerUtils } from './manager-utils.js';
import logger from '../utils/logger.js';

class CharacterManager {
    constructor() {
        this.currentCharacterId = null;
        this.characters = [];
        this.isInitialized = false;
    }

    /**
     * Initialize the character manager
     */
    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize database
            await databaseManager.init();
            
            // Load all characters
            await this.loadCharacters();
            
            // Set current character
            await this.setCurrentCharacter();
            
            this.isInitialized = true;
            logger.log('CharacterManager initialized');
            
            // Initialize UI
            this.initUI();
            
        } catch (err) {
            logger.error('Failed to initialize CharacterManager:', err);
        }
    }

    /**
     * Load all characters from database
     */
    async loadCharacters() {
        try {
            this.characters = await databaseManager.getAllCharacters();
            logger.log(`CharacterManager: Loaded ${this.characters.length} characters:`, this.characters);
        } catch (err) {
            logger.error('CharacterManager: Failed to load characters:', err);
            this.characters = [];
        }
    }

    /**
     * Set the current character
     */
    async setCurrentCharacter() {
        try {
            // Check if there's a character ID in the URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const characterIdFromUrl = urlParams.get('id');
            const lockedFromUrl = urlParams.get('locked');
            
            if (characterIdFromUrl) {
                // Convert to number if it's a string
                const characterId = parseInt(characterIdFromUrl);
                if (!isNaN(characterId)) {
                    // Check if the character exists
                    const character = await databaseManager.getCharacter(characterId);
                    if (character) {
                        this.currentCharacterId = characterId;
                        logger.log('Loading character from URL parameter:', characterId);
                        
                        // Set as active character in database
                        await databaseManager.setActiveCharacterId(characterId);
                        
                        // Initialize lock state from URL parameter if present
                        if (lockedFromUrl !== null && window.LockManager) {
                            const shouldLock = lockedFromUrl === 'true';
                            logger.log('Setting lock state from URL parameter:', shouldLock);
                            window.LockManager.init(shouldLock);
                        }
                        
                        // Load the character data into the UI
                        if (window.loadCharacterData) {
                            logger.log('CharacterManager: Loading character data into UI from URL parameter');
                            window.loadCharacterData(character);
                        }
                        
                        return;
                    } else {
                        logger.warn('Character not found for ID from URL:', characterId);
                    }
                }
            }
            
            // Fall back to active character from database
            this.currentCharacterId = await databaseManager.getActiveCharacterId();
            
            // If no active character, use the first one or create a new one
            if (!this.currentCharacterId && this.characters.length > 0) {
                this.currentCharacterId = this.characters[0].id;
                await databaseManager.setActiveCharacterId(this.currentCharacterId);
            }
            
            // Load the current character data into the UI
            if (this.currentCharacterId && window.loadCharacterData) {
                const character = await databaseManager.getCharacter(this.currentCharacterId);
                if (character) {
                    logger.log('CharacterManager: Loading character data into UI from database');
                    window.loadCharacterData(character);
                }
            }
            
            logger.log('Current character ID:', this.currentCharacterId);
        } catch (err) {
            logger.error('Failed to set current character:', err);
        }
    }

    /**
     * Get the current character data
     */
    async getCurrentCharacter() {
        if (!this.currentCharacterId) return null;
        return await databaseManager.getCharacter(this.currentCharacterId);
    }

    /**
     * Save the current character
     */
    async saveCurrentCharacter(characterData) {
        try {
            const savedId = await databaseManager.saveActiveCharacter(characterData);
            this.currentCharacterId = savedId;
            
            // Update the characters list
            await this.loadCharacters();
            
            // Update UI
            this.updateCharacterList();
            
            return savedId;
        } catch (err) {
            logger.error('Failed to save current character:', err);
            throw err;
        }
    }

    /**
     * Create a new character
     */
    async createNewCharacter(characterData = {}) {
        try {
            const newCharacter = {
                name: characterData.name || 'New Character',
                ...characterData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            const characterId = await databaseManager.saveCharacter(newCharacter);
            
            // Set as current character
            await databaseManager.setActiveCharacterId(characterId);
            this.currentCharacterId = characterId;
            
            // Reload characters and update UI
            await this.loadCharacters();
            this.updateCharacterList();
            
            return characterId;
        } catch (err) {
            logger.error('Failed to create new character:', err);
            throw err;
        }
    }

    /**
     * Switch to a different character
     */
    async switchCharacter(characterId) {
        try {
            const character = await databaseManager.getCharacter(characterId);
            if (!character) {
                throw new Error('Character not found');
            }
            
            // Save current character state before switching
            if (this.currentCharacterId && window.gatherCharacterData) {
                const currentData = window.gatherCharacterData();
                await databaseManager.saveCharacter(currentData, this.currentCharacterId);
            }
            
            // Set new active character
            await databaseManager.setActiveCharacterId(characterId);
            this.currentCharacterId = characterId;
            
            // Load the new character data
            if (window.loadCharacterData) {
                logger.log('CharacterManager: Calling loadCharacterData with character:', character);
                window.loadCharacterData(character);
            } else {
                logger.log('CharacterManager: loadCharacterData function not available');
            }
            
            // Update UI
            this.updateCharacterList();
            this.updateCurrentCharacterDisplay();
            
            // Refresh the character management modal if it's open
            this.refreshCharacterManagementModal();
            
            logger.log(`Switched to character: ${character.name}`);
            
        } catch (err) {
            logger.error('Failed to switch character:', err);
            throw err;
        }
    }

    /**
     * Delete a character
     */
    async deleteCharacter(characterId) {
        try {
            // Ensure characterId is a number
            const id = parseInt(characterId);
            if (isNaN(id)) {
                throw new Error('Invalid character ID');
            }
            
            logger.log('Attempting to delete character with ID:', id);
            
            // Check if character exists before deleting
            const character = await databaseManager.getCharacter(id);
            if (!character) {
                throw new Error('Character not found');
            }
            
            logger.log('Found character to delete:', character.name);
            
            await databaseManager.deleteCharacter(id);
            logger.log('Character deleted from database');
            
            // Reload characters list to get updated data
            await this.loadCharacters();
            
            // If we deleted the current character, switch to another one
            if (id === this.currentCharacterId) {
                if (this.characters.length > 0) {
                    await this.switchCharacter(this.characters[0].id);
                } else {
                    this.currentCharacterId = null;
                    await databaseManager.setActiveCharacterId(null);
                }
            }
            
            // Update UI
            this.updateCharacterList();
            this.updateCurrentCharacterDisplay();
            
            // Refresh the character management modal if it's open
            this.refreshCharacterManagementModal();
            
            logger.log('Character deletion completed successfully');
            
        } catch (err) {
            logger.error('Failed to delete character:', err);
            throw err;
        }
    }

    /**
     * Initialize the character management UI
     */
    initUI() {
        // Character management UI is now handled by the dashboard
        // No need to create control bar UI elements
        
        // Update displays
        this.updateCharacterList();
        this.updateCurrentCharacterDisplay();
    }

    /**
     * Update the character list in the selector
     */
    updateCharacterList() {
        const selector = document.getElementById('character-selector');
        if (!selector) return;

        const currentValue = selector.value;
        
        // Clear existing options
        selector.innerHTML = '';
        
        // Add characters
        this.characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.id;
            option.textContent = character.name || 'Unnamed Character';
            if (character.id === this.currentCharacterId) {
                option.selected = true;
            }
            selector.appendChild(option);
        });
        
        // If no characters, add a placeholder
        if (this.characters.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No characters';
            option.disabled = true;
            selector.appendChild(option);
        }
    }

    /**
     * Update the current character display
     */
    updateCurrentCharacterDisplay() {
        const currentCharacter = this.characters.find(c => c.id === this.currentCharacterId);
        if (currentCharacter) {
            document.title = `Ledger - ${currentCharacter.name}`;
        } else {
            document.title = 'Ledger';
        }
    }

    /**
     * Clear the current character sheet
     */
    async clearCurrentSheet() {
        try {
            // Try to use the existing clear sheet function
            if (window.performClearSheet) {
                window.performClearSheet();
                return;
            }
            
            // Fallback clearing method if performClearSheet is not available
            logger.log('Using fallback sheet clearing method');
            
            // Clear all input fields and textareas
            document.querySelectorAll('input[type="text"], textarea').forEach(input => {
                input.value = '';
                if (input.tagName.toLowerCase() === 'textarea') {
                    input.style.height = 'auto';
                    input.style.height = (input.scrollHeight) + 'px';
                }
            });
            
            // Clear select dropdowns
            document.querySelectorAll('select').forEach(select => select.value = '');
            
            // Clear dots
            document.querySelectorAll('.dots').forEach(dots => {
                dots.setAttribute('data-value', '0');
                dots.querySelectorAll('.dot').forEach(dot => dot.classList.remove('filled'));
            });
            
            // Reset tracks
            document.querySelectorAll('.track-container').forEach(track => {
                const max = track.querySelectorAll('.track-box').length;
                track.setAttribute('data-value', max);
                track.querySelectorAll('.track-box').forEach(box => {
                    box.classList.remove('superficial', 'aggravated', 'filled', 'stained');
                });
                const header = track.querySelector('.track-header span:first-child');
                if (header) header.textContent = `Current: ${max}`;
            });
            
            // Clear specialty data
            document.querySelectorAll('[data-specialties]').forEach(el => el.removeAttribute('data-specialties'));
            
            // Refresh specialty display for all skills
            if (window.specialtyManager && typeof window.specialtyManager.refreshRow === 'function') {
                const SKILL_NAMES = [
                    'athletics','brawl','craft','drive','firearms','larceny','melee','stealth','survival',
                    'animal ken','etiquette','insight','intimidation','leadership','performance','persuasion','streetwise','subterfuge',
                    'academics','awareness','finance','investigation','medicine','occult','politics','science','technology'
                ];
                SKILL_NAMES.forEach(skill => {
                    const cap = skill.replace(/\b\w/g, c => c.toUpperCase());
                    window.specialtyManager.refreshRow(cap);
                });
            }
            
            // Clear convictions
            if (window.convictionManager) {
                window.convictionManager.convictions = [];
                $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
            }
            
            // Clear manager data
            if (window.disciplineManager) {
                window.disciplineManager.selectedDisciplines = new Map();
                window.disciplineManager.renderDisciplineManager();
            }
            if (window.meritFlawManager) {
                window.meritFlawManager.selectedMerits = new Map();
                window.meritFlawManager.selectedFlaws = new Map();
                window.meritFlawManager.renderMeritManager();
                window.meritFlawManager.renderFlawManager();
            }
            if (window.backgroundManager) {
                window.backgroundManager.selectedBackgrounds = new Map();
                window.backgroundManager.selectedBackgroundFlaws = new Map();
                window.backgroundManager.renderBackgroundManager();
                window.backgroundManager.renderBackgroundFlawManager();
            }
            if (window.coterieManager) {
                window.coterieManager.selectedMerits = new Map();
                window.coterieManager.selectedFlaws = new Map();
                window.coterieManager.renderCoterieMeritManager();
                window.coterieManager.renderCoterieFlawManager();
            }
            if (window.loresheetManager) {
                window.loresheetManager.selectedLoresheets = new Map();
                window.loresheetManager.renderLoresheetManager();
            }
            
            // Clear XP data
            if (window.databaseManager) {
                await window.databaseManager.setSetting('xpData', { total: 0, spent: 0, history: [] });
            }
            ['total-xp', 'spent-xp', 'available-xp'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.textContent = '0';
            });
            const hist = document.getElementById('experience-history');
            if (hist) hist.innerHTML = '';
            
            logger.log('Sheet cleared successfully');
            
        } catch (err) {
            logger.error('Error clearing sheet:', err);
            throw err;
        }
    }

    /**
     * Set the character name in the sheet
     */
    setCharacterName(name) {
        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) {
            nameInput.value = name;
            logger.log('Character name set to:', name);
        } else {
            logger.warn('Could not find name input field');
        }
    }

    /**
     * Show the new character creation modal
     */
    showNewCharacterModal() {
        const { modalElement, modalInstance } = window.modalManager.showCustom({
            title: 'Create New Character',
            content: `
                <div class="mb-3">
                    <label for="characterNameInput" class="form-label">Character Name</label>
                    <input type="text" class="form-control" id="characterNameInput" placeholder="Enter character name">
                </div>
            `,
            footer: `
                <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn theme-btn-primary" id="createCharacterBtn">Create</button>
            `,
            size: 'default',
            centered: true
        }, (element, instance) => {
            // Handle create button click
            element.querySelector('#createCharacterBtn').addEventListener('click', async () => {
                const name = element.querySelector('#characterNameInput').value.trim();
                if (!name) {
                    window.toastManager.show('Please enter a character name', 'warning', 'Character Manager');
                    return;
                }

                try {
                    await this.createNewCharacter({ name });
                    instance.hide();
                    window.toastManager.show(`Character "${name}" created successfully!`, 'success', 'Character Manager');
                } catch (err) {
                    window.toastManager.show('Failed to create character: ' + err.message, 'danger', 'Character Manager');
                }
            });
        });
    }

    /**
     * Show the character management modal
     */
    showCharacterManagementModal() {
        const content = `
            <div id="characterList">
                <!-- Character list will be populated here -->
            </div>
        `;

        const footer = `
            <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Close</button>
        `;

        const { modalElement, modalInstance } = modalManager.showCustom({
            title: 'Manage Characters',
            content,
            footer,
            size: 'lg',
            centered: true
        }, (element, instance) => {
            // Populate character list
            this.populateCharacterManagementList();
        });
    }

    /**
     * Populate the character management list
     */
    populateCharacterManagementList() {
        const characterList = document.getElementById('characterList');
        if (!characterList) return;
        
        if (this.characters.length === 0) {
            characterList.innerHTML = '<p>No characters found. Create your first character!</p>';
            return;
        }
        
        const listHtml = this.characters.map(character => {
            const isCurrent = character.id === this.currentCharacterId;
            const createdAt = new Date(character.createdAt).toLocaleDateString();
            const updatedAt = new Date(character.updatedAt).toLocaleDateString();
            
            return `
                <div class="card mb-3 ${isCurrent ? 'border-primary' : ''}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <h6 class="card-title mb-1">
                                    ${character.name || 'Unnamed Character'}
                                    ${isCurrent ? '<span class="badge bg-primary ms-2">Current</span>' : ''}
                                </h6>
                                <p class="card-text small mb-2">
                                    Created: ${createdAt} | Last updated: ${updatedAt}
                                </p>
                            </div>
                            <div class="btn-group btn-group-sm">
                                ${!isCurrent ? `<button class="btn theme-btn-outline-primary" onclick="characterManager.switchCharacter(${character.id})">Switch</button>` : ''}
                                <button class="btn theme-btn-outline-danger" onclick="characterManager.confirmDeleteCharacter(${character.id}, '${character.name || 'Unnamed Character'}')">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        characterList.innerHTML = listHtml;
    }

    /**
     * Show confirmation dialog before deleting a character
     */
    async confirmDeleteCharacter(characterId, characterName) {
        const confirmed = await this.showDeleteConfirmationModal(characterName);
        if (confirmed) {
            try {
                await this.deleteCharacter(characterId);
                window.toastManager.show(`Character "${characterName}" has been deleted successfully.`, 'success', 'Character Manager');
            } catch (err) {
                window.toastManager.show(`Failed to delete character: ${err.message}`, 'danger', 'Character Manager');
            }
        }
    }

    /**
     * Show delete confirmation modal
     */
    async showDeleteConfirmationModal(characterName) {
        const message = `Are you sure you want to delete "${characterName}"? This action cannot be undone.`;
        return await window.modalManager.confirm('Confirm Deletion', message, {
            confirmText: 'Delete Character',
            confirmClass: 'theme-btn-danger',
            centered: true
        });
    }

    /**
     * Refresh the character management modal content
     */
    refreshCharacterManagementModal() {
        const modal = document.getElementById('characterManagementModal');
        if (modal && modal.classList.contains('show')) {
            this.populateCharacterManagementList();
        }
    }
}

// Create and export a singleton instance
const characterManager = new CharacterManager();

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
    window.characterManager = characterManager;
}

export default characterManager; 