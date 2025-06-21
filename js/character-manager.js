/**
 * Character Manager for Ledger
 * Handles multiple character management and UI with component architecture integration
 */

const charDatabaseManager = window.databaseManager;
const charToastManager = window.toastManager;

class CharacterManager {
    constructor() {
        this.currentCharacterId = null;
        this.characters = [];
        this.isInitialized = false;
        this.characterSheetView = null;
        this.eventListeners = new Map();
        
        // Data validation schemas
        this.validationSchemas = {
            basic: ['name', 'concept', 'clan', 'generation'],
            attributes: ['strength', 'dexterity', 'stamina', 'charisma', 'manipulation', 'composure', 'intelligence', 'wits', 'resolve'],
            vitals: ['health', 'willpower', 'hunger', 'humanity', 'bloodPotency']
        };
    }

    /**
     * Initialize the character manager
     */
    async init() {
        if (this.isInitialized) return;

        try {
            // Initialize database
            await charDatabaseManager.init();
            
            // Load all characters
            await this.loadCharacters();
            
            // Set current character
            await this.setCurrentCharacter();
            
            this.isInitialized = true;
            console.log('CharacterManager initialized');
            
            // Initialize UI
            this.initUI();
            
            // Emit initialization event
            this.emit('initialized', { characters: this.characters, currentCharacterId: this.currentCharacterId });
            
        } catch (err) {
            console.error('Failed to initialize CharacterManager:', err);
            throw err;
        }
    }

    /**
     * Set the character sheet view component
     */
    setCharacterSheetView(view) {
        this.characterSheetView = view;
        console.log('Character sheet view attached to character manager');
    }

    /**
     * Load all characters from database
     */
    async loadCharacters() {
        try {
            this.characters = await charDatabaseManager.getAllCharacters();
            console.log(`CharacterManager: Loaded ${this.characters.length} characters:`, this.characters);
            
            // Emit characters loaded event
            this.emit('charactersLoaded', { characters: this.characters });
            
        } catch (err) {
            console.error('CharacterManager: Failed to load characters:', err);
            this.characters = [];
            throw err;
        }
    }

    /**
     * Set the current character
     */
    async setCurrentCharacter() {
        try {
            this.currentCharacterId = await charDatabaseManager.getActiveCharacterId();
            
            // If no active character, use the first one or create a new one
            if (!this.currentCharacterId && this.characters.length > 0) {
                this.currentCharacterId = this.characters[0].id;
                await charDatabaseManager.setActiveCharacterId(this.currentCharacterId);
            }
            
            console.log('Current character ID:', this.currentCharacterId);
            
            // Emit current character set event
            this.emit('currentCharacterSet', { characterId: this.currentCharacterId });
            
        } catch (err) {
            console.error('Failed to set current character:', err);
            throw err;
        }
    }

    /**
     * Get the current character data
     */
    async getCurrentCharacter() {
        if (!this.currentCharacterId) return null;
        
        try {
            const character = await charDatabaseManager.getCharacter(this.currentCharacterId);
            return this.validateCharacterData(character);
        } catch (err) {
            console.error('Failed to get current character:', err);
            throw err;
        }
    }

    /**
     * Get all characters
     */
    async getCharacters() {
        return this.characters;
    }

    /**
     * Save the current character
     */
    async saveCurrentCharacter(characterData) {
        try {
            // Validate character data
            const validatedData = this.validateCharacterData(characterData);
            
            // Sanitize character data
            const sanitizedData = this.sanitizeCharacterData(validatedData);
            
            const savedId = await charDatabaseManager.saveActiveCharacter(sanitizedData);
            this.currentCharacterId = savedId;
            
            // Update the characters list
            await this.loadCharacters();
            
            // Update UI
            this.updateCharacterList();
            
            // Emit character saved event
            this.emit('characterSaved', { characterId: savedId, characterData: sanitizedData });
            
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
            // Validate and sanitize character data
            const validatedData = this.validateCharacterData(characterData);
            const sanitizedData = this.sanitizeCharacterData(validatedData);
            
            const newCharacter = {
                name: sanitizedData.name || 'New Character',
                ...sanitizedData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            const characterId = await charDatabaseManager.saveCharacter(newCharacter);
            
            // Set as current character
            await charDatabaseManager.setActiveCharacterId(characterId);
            this.currentCharacterId = characterId;
            
            // Reload characters and update UI
            await this.loadCharacters();
            this.updateCharacterList();
            
            // Load the new character into the component system
            if (this.characterSheetView) {
                await this.characterSheetView.loadCharacterData(newCharacter);
            }
            
            // Emit character created event
            this.emit('characterCreated', { characterId, characterData: newCharacter });
            
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
            // Validate character ID
            const id = parseInt(characterId);
            if (isNaN(id)) {
                throw new Error('Invalid character ID');
            }
            
            const character = await charDatabaseManager.getCharacter(id);
            if (!character) {
                throw new Error('Character not found');
            }
            
            // Save current character state before switching
            if (this.currentCharacterId && this.characterSheetView) {
                const currentData = this.characterSheetView.gatherCharacterData();
                await charDatabaseManager.saveCharacter(currentData, this.currentCharacterId);
            }
            
            // Set new active character
            await charDatabaseManager.setActiveCharacterId(id);
            this.currentCharacterId = id;
            
            // Load the new character data into component system
            if (this.characterSheetView) {
                await this.characterSheetView.loadCharacterData(character);
            }
            
            // Update UI
            this.updateCharacterList();
            this.updateCurrentCharacterDisplay();
            
            // Refresh the character management modal if it's open
            this.refreshCharacterManagementModal();
            
            // Emit character switched event
            this.emit('characterSwitched', { characterId: id, characterData: character });
            
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
            const character = await charDatabaseManager.getCharacter(id);
            if (!character) {
                throw new Error('Character not found');
            }
            
            console.log('Found character to delete:', character.name);
            
            await charDatabaseManager.deleteCharacter(id);
            console.log('Character deleted from database');
            
            // Reload characters list to get updated data
            await this.loadCharacters();
            
            // If we deleted the current character, switch to another one
            if (this.currentCharacterId === id) {
                if (this.characters.length > 0) {
                    await this.switchCharacter(this.characters[0].id);
                } else {
                    // No characters left, clear the sheet
                    if (this.characterSheetView) {
                        await this.characterSheetView.clearCharacterData();
                    }
                    this.currentCharacterId = null;
                }
            }
            
            // Update UI
            this.updateCharacterList();
            this.updateCurrentCharacterDisplay();
            
            // Emit character deleted event
            this.emit('characterDeleted', { characterId: id, characterName: character.name });
            
            console.log('Character deletion completed successfully');
            
        } catch (err) {
            console.error('Failed to delete character:', err);
            throw err;
        }
    }

    /**
     * Validate character data
     */
    validateCharacterData(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid character data: must be an object');
        }

        const validated = { ...data };

        // Validate basic fields
        if (validated.name && typeof validated.name !== 'string') {
            throw new Error('Character name must be a string');
        }

        if (validated.generation && (isNaN(validated.generation) || validated.generation < 1 || validated.generation > 15)) {
            throw new Error('Generation must be a number between 1 and 15');
        }

        // Validate attributes
        if (validated.attributes) {
            this.validationSchemas.attributes.forEach(attr => {
                if (validated.attributes[attr] !== undefined) {
                    const value = parseInt(validated.attributes[attr]);
                    if (isNaN(value) || value < 0 || value > 5) {
                        throw new Error(`Attribute ${attr} must be a number between 0 and 5`);
                    }
                    validated.attributes[attr] = value;
                }
            });
        }

        // Validate vitals
        this.validationSchemas.vitals.forEach(vital => {
            if (validated[vital] !== undefined) {
                const value = parseInt(validated[vital]);
                if (isNaN(value) || value < 0) {
                    throw new Error(`Vital ${vital} must be a non-negative number`);
                }
                validated[vital] = value;
            }
        });

        return validated;
    }

    /**
     * Sanitize character data
     */
    sanitizeCharacterData(data) {
        const sanitized = { ...data };

        // Sanitize string fields
        const stringFields = ['name', 'concept', 'clan', 'sire', 'chronicle', 'ambition', 'desire', 'predator'];
        stringFields.forEach(field => {
            if (sanitized[field] && typeof sanitized[field] === 'string') {
                sanitized[field] = sanitized[field].trim().substring(0, 255);
            }
        });

        // Sanitize arrays
        if (sanitized.skills) {
            Object.keys(sanitized.skills).forEach(category => {
                if (Array.isArray(sanitized.skills[category])) {
                    sanitized.skills[category] = sanitized.skills[category].filter(skill => 
                        skill && typeof skill === 'object' && typeof skill.value === 'number'
                    );
                }
            });
        }

        // Sanitize convictions
        if (Array.isArray(sanitized.convictions)) {
            sanitized.convictions = sanitized.convictions.filter(conviction => 
                conviction && typeof conviction === 'object'
            );
        }

        return sanitized;
    }

    /**
     * Gather character data from component system
     */
    async gatherCharacterData() {
        if (this.characterSheetView) {
            return this.characterSheetView.gatherCharacterData();
        }
        
        // Fallback to legacy method if component system not available
        if (window.gatherCharacterData) {
            return window.gatherCharacterData();
        }
        
        return {};
    }

    /**
     * Load character data into component system
     */
    async loadCharacterData(characterData) {
        if (this.characterSheetView) {
            await this.characterSheetView.loadCharacterData(characterData);
        } else if (window.loadCharacterData) {
            // Fallback to legacy method
            window.loadCharacterData(characterData);
        }
    }

    /**
     * Clear current character sheet
     */
    async clearCurrentSheet() {
        try {
            if (this.characterSheetView) {
                await this.characterSheetView.clearCharacterData();
            } else {
                // Fallback to legacy clear method
                await this._legacyClearSheet();
            }
            
            // Emit sheet cleared event
            this.emit('sheetCleared');
            
            console.log('Sheet cleared successfully');
            
        } catch (err) {
            console.error('Error clearing sheet:', err);
            throw new Error('Failed to clear character sheet: ' + err.message);
        }
    }

    /**
     * Legacy clear sheet method (fallback)
     */
    async _legacyClearSheet() {
        // Clear basic fields
        document.querySelectorAll('.stat input, .stat textarea').forEach(input => {
            input.value = '';
        });

        // Clear dropdowns
        document.querySelectorAll('.stat select').forEach(select => {
            select.selectedIndex = 0;
        });

        // Clear specialty data
        document.querySelectorAll('[data-specialties]').forEach(el => el.removeAttribute('data-specialties'));

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

        // Clear convictions
        if (window.convictionManager) {
            window.convictionManager.convictions = [];
            $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
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
    }

    /**
     * Event handling methods
     */
    on(event, handler) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(handler);
    }

    off(event, handler) {
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in event handler for ${event}:`, err);
                }
            });
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
                charToastManager.show('Please enter a character name', 'warning', 'Character Manager');
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
                charToastManager.show(`Character "${name}" created successfully!`, 'success', 'Character Manager');
                
            } catch (err) {
                charToastManager.show('Failed to create character: ' + err.message, 'danger', 'Character Manager');
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
                charToastManager.show(`Character "${characterName}" has been deleted successfully.`, 'success', 'Character Manager');
            } catch (err) {
                charToastManager.show(`Failed to delete character: ${err.message}`, 'danger', 'Character Manager');
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

// Create and export the character manager instance
const characterManager = new CharacterManager();

// Add to window for global access
window.characterManager = characterManager;

// Remove ES6 export - use traditional script loading
// export default characterManager; 