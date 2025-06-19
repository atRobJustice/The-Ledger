/**
 * Character Manager for Ledger
 * Handles multiple character management and UI
 */

import databaseManager from './database-manager.js';
import { toastManager } from './manager-utils.js';

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
            console.log('CharacterManager initialized');
            
            // Initialize UI
            this.initUI();
            
        } catch (err) {
            console.error('Failed to initialize CharacterManager:', err);
        }
    }

    /**
     * Load all characters from database
     */
    async loadCharacters() {
        try {
            this.characters = await databaseManager.getAllCharacters();
            console.log(`CharacterManager: Loaded ${this.characters.length} characters:`, this.characters);
        } catch (err) {
            console.error('CharacterManager: Failed to load characters:', err);
            this.characters = [];
        }
    }

    /**
     * Set the current character
     */
    async setCurrentCharacter() {
        try {
            this.currentCharacterId = await databaseManager.getActiveCharacterId();
            
            // If no active character, use the first one or create a new one
            if (!this.currentCharacterId && this.characters.length > 0) {
                this.currentCharacterId = this.characters[0].id;
                await databaseManager.setActiveCharacterId(this.currentCharacterId);
            }
            
            console.log('Current character ID:', this.currentCharacterId);
        } catch (err) {
            console.error('Failed to set current character:', err);
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
            console.error('Failed to save current character:', err);
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
            console.error('Failed to create new character:', err);
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
                window.loadCharacterData(character);
            }
            
            // Update UI
            this.updateCharacterList();
            this.updateCurrentCharacterDisplay();
            
            // Refresh the character management modal if it's open
            this.refreshCharacterManagementModal();
            
            console.log(`Switched to character: ${character.name}`);
            
        } catch (err) {
            console.error('Failed to switch character:', err);
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
            
            console.log('Attempting to delete character with ID:', id);
            
            // Check if character exists before deleting
            const character = await databaseManager.getCharacter(id);
            if (!character) {
                throw new Error('Character not found');
            }
            
            console.log('Found character to delete:', character.name);
            
            await databaseManager.deleteCharacter(id);
            console.log('Character deleted from database');
            
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
            
            console.log('Character deletion completed successfully');
            
        } catch (err) {
            console.error('Failed to delete character:', err);
            throw err;
        }
    }

    /**
     * Initialize the character management UI
     */
    initUI() {
        // Create character management UI
        this.createCharacterManagementUI();
        
        // Update displays
        this.updateCharacterList();
        this.updateCurrentCharacterDisplay();
    }

    /**
     * Create the character management UI
     */
    createCharacterManagementUI() {
        // Find the control bar
        const controlBar = document.getElementById('ledger-control-bar');
        if (!controlBar) {
            console.warn('Control bar not found, retrying...');
            setTimeout(() => this.createCharacterManagementUI(), 1000);
            return;
        }

        // Create character selector container
        const characterContainer = document.createElement('div');
        characterContainer.className = 'character-manager-container';
        characterContainer.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            margin-right: 16px;
        `;

        // Create character selector
        const characterSelect = document.createElement('select');
        characterSelect.id = 'character-selector';
        characterSelect.className = 'form-select form-select-sm';
        characterSelect.style.cssText = `
            min-width: 150px;
            max-width: 200px;
        `;

        // Create new character button
        const newCharacterBtn = document.createElement('button');
        newCharacterBtn.className = 'btn btn-outline-light btn-sm';
        newCharacterBtn.innerHTML = '<i class="bi bi-plus"></i>';
        newCharacterBtn.title = 'Create New Character';
        newCharacterBtn.onclick = () => this.showNewCharacterModal();

        // Create character management button
        const manageBtn = document.createElement('button');
        manageBtn.className = 'btn btn-outline-light btn-sm';
        manageBtn.innerHTML = '<i class="bi bi-gear"></i>';
        manageBtn.title = 'Manage Characters';
        manageBtn.onclick = () => this.showCharacterManagementModal();

        // Add elements to container
        characterContainer.appendChild(characterSelect);
        characterContainer.appendChild(newCharacterBtn);
        characterContainer.appendChild(manageBtn);

        // Insert at the beginning of the control bar
        controlBar.insertBefore(characterContainer, controlBar.firstChild);

        // Add event listener for character selection
        characterSelect.addEventListener('change', (e) => {
            const characterId = parseInt(e.target.value);
            if (characterId && characterId !== this.currentCharacterId) {
                this.switchCharacter(characterId);
            }
        });
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
            console.log('Using fallback sheet clearing method');
            
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
            
            console.log('Sheet cleared successfully');
            
        } catch (err) {
            console.error('Error clearing sheet:', err);
            throw new Error('Failed to clear character sheet: ' + err.message);
        }
    }

    /**
     * Set the character name in the sheet
     */
    setCharacterName(name) {
        const nameRow = Array.from(document.querySelectorAll('.stat')).find(r => 
            r.querySelector('.stat-label')?.textContent.trim().toLowerCase() === 'name'
        );
        if (nameRow) {
            const input = nameRow.querySelector('input');
            if (input) {
                input.value = name;
                input.dispatchEvent(new Event('input'));
                console.log('Character name set to:', name);
            }
        } else {
            console.warn('Could not find name input field');
        }
    }

    /**
     * Show the new character modal
     */
    showNewCharacterModal() {
        const modalHtml = `
            <div class="modal fade" id="newCharacterModal" tabindex="-1" aria-labelledby="newCharacterModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="newCharacterModalLabel">Create New Character</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="newCharacterName" class="form-label">Character Name</label>
                                <input type="text" class="form-control" id="newCharacterName" placeholder="Enter character name">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="createCharacterBtn">Create Character</button>
                        </div>
                    </div>
                </div>
            </div>`;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('newCharacterModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        const modal = document.getElementById('newCharacterModal');
        const modalInstance = new bootstrap.Modal(modal);
        
        // Focus on name input
        const nameInput = document.getElementById('newCharacterName');
        nameInput.focus();
        
        // Handle create button
        document.getElementById('createCharacterBtn').onclick = async () => {
            const name = nameInput.value.trim();
            if (!name) {
                toastManager.show('Please enter a character name', 'warning', 'Character Manager');
                return;
            }
            
            try {
                // Clear the current sheet first
                await this.clearCurrentSheet();
                
                // Create the new character
                await this.createNewCharacter({ name });
                modalInstance.hide();
                
                // Set the character name in the sheet
                this.setCharacterName(name);
                
                // Show success message
                toastManager.show(`Character "${name}" created successfully!`, 'success', 'Character Manager');
                
            } catch (err) {
                toastManager.show('Failed to create character: ' + err.message, 'danger', 'Character Manager');
            }
        };
        
        // Handle Enter key
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('createCharacterBtn').click();
            }
        });
        
        modalInstance.show();
    }

    /**
     * Show the character management modal
     */
    showCharacterManagementModal() {
        const modalHtml = `
            <div class="modal fade" id="characterManagementModal" tabindex="-1" aria-labelledby="characterManagementModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="characterManagementModalLabel">Manage Characters</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="characterList">
                                <!-- Character list will be populated here -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('characterManagementModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        const modal = document.getElementById('characterManagementModal');
        const modalInstance = new bootstrap.Modal(modal);
        
        // Populate character list
        this.populateCharacterManagementList();
        
        modalInstance.show();
    }

    /**
     * Populate the character management list
     */
    populateCharacterManagementList() {
        const characterList = document.getElementById('characterList');
        if (!characterList) return;
        
        if (this.characters.length === 0) {
            characterList.innerHTML = '<p class="text-muted">No characters found. Create your first character!</p>';
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
                                <p class="card-text text-muted small mb-2">
                                    Created: ${createdAt} | Last updated: ${updatedAt}
                                </p>
                            </div>
                            <div class="btn-group btn-group-sm">
                                ${!isCurrent ? `<button class="btn btn-outline-primary" onclick="characterManager.switchCharacter(${character.id})">Switch</button>` : ''}
                                <button class="btn btn-outline-danger" onclick="characterManager.confirmDeleteCharacter(${character.id}, '${character.name || 'Unnamed Character'}')">Delete</button>
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
                toastManager.show(`Character "${characterName}" has been deleted successfully.`, 'success', 'Character Manager');
            } catch (err) {
                toastManager.show(`Failed to delete character: ${err.message}`, 'danger', 'Character Manager');
            }
        }
    }

    /**
     * Show delete confirmation modal
     */
    showDeleteConfirmationModal(characterName) {
        return new Promise((resolve) => {
            const modalHtml = `
                <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content bg-dark text-light">
                            <div class="modal-header border-secondary">
                                <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirm Deletion</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure you want to delete <strong>"${characterName}"</strong>?</p>
                                <p class="text-warning mb-0"><i class="bi bi-exclamation-triangle"></i> This action cannot be undone.</p>
                            </div>
                            <div class="modal-footer border-secondary">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete Character</button>
                            </div>
                        </div>
                    </div>
                </div>`;
            
            // Remove existing modal if present
            const existingModal = document.getElementById('deleteConfirmationModal');
            if (existingModal) {
                existingModal.remove();
            }
            
            // Add modal to page
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            const modal = document.getElementById('deleteConfirmationModal');
            const modalInstance = new bootstrap.Modal(modal);
            
            // Handle confirm button
            document.getElementById('confirmDeleteBtn').onclick = () => {
                modalInstance.hide();
                resolve(true);
            };
            
            // Handle cancel and close
            modal.addEventListener('hidden.bs.modal', () => {
                resolve(false);
                modal.remove();
            });
            
            modalInstance.show();
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