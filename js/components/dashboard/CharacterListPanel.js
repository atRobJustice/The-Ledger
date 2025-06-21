/**
 * CharacterListPanel - Displays and manages character list
 * Extends BaseComponent and integrates with character-manager.js
 */
class CharacterListPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.characters = [];
        this.filteredCharacters = [];
        this.searchTerm = '';
        this.selectedCharacterId = null;
        
        // Bind methods
        this.handleCharacterClick = this.handleCharacterClick.bind(this);
        this.handleCreateCharacter = this.handleCreateCharacter.bind(this);
        this.handleDeleteCharacter = this.handleDeleteCharacter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.loadCharacters = this.loadCharacters.bind(this);
        this.refreshCharacterList = this.refreshCharacterList.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Listen for character manager events
        if (window.characterManager) {
            window.characterManager.on('characterSaved', this.refreshCharacterList);
            window.characterManager.on('characterDeleted', this.refreshCharacterList);
        }
        
        // Load initial character list
        await this.loadCharacters();
    }

    /**
     * Render the character list panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">
                        <i class="bi bi-people-fill"></i> Characters
                    </h5>
                    <button id="create-character-btn" class="btn btn-sm btn-success">
                        <i class="bi bi-plus-circle"></i> New
                    </button>
                </div>
                <div class="card-body p-0">
                    <!-- Search Bar -->
                    <div class="p-3 border-bottom">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" id="character-search" class="form-control" 
                                   placeholder="Search characters..." value="${this.searchTerm}">
                        </div>
                    </div>
                    
                    <!-- Character List -->
                    <div id="character-list" class="list-group list-group-flush" style="max-height: 400px; overflow-y: auto;">
                        ${this.renderCharacterList()}
                    </div>
                    
                    <!-- Empty State -->
                    ${this.characters.length === 0 ? this.renderEmptyState() : ''}
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup
     */
    async afterRender() {
        // Bind event listeners
        const createBtn = this.element.querySelector('#create-character-btn');
        if (createBtn) {
            createBtn.addEventListener('click', this.handleCreateCharacter);
        }

        const searchInput = this.element.querySelector('#character-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch);
        }

        // Bind character click events
        this.bindCharacterEvents();
    }

    /**
     * Render the character list items
     * @returns {string} HTML string
     */
    renderCharacterList() {
        if (this.filteredCharacters.length === 0) {
            return this.renderEmptyState();
        }

        return this.filteredCharacters.map(character => `
            <div class="list-group-item list-group-item-action character-item" 
                 data-character-id="${character.id}" 
                 data-character-name="${character.name || 'Unnamed Character'}">
                <div class="d-flex align-items-center">
                    <!-- Character Avatar/Thumbnail -->
                    <div class="character-avatar me-3">
                        <div class="avatar-circle ${this.getClanClass(character.clan)}">
                            <span class="avatar-text">${this.getInitials(character.name)}</span>
                        </div>
                    </div>
                    
                    <!-- Character Info -->
                    <div class="flex-grow-1">
                        <h6 class="mb-1 character-name">${character.name || 'Unnamed Character'}</h6>
                        <small class="text-muted">
                            ${character.clan || 'Unknown Clan'} • ${character.generation || 'Unknown'} Generation
                        </small>
                        ${character.concept ? `<br><small class="text-muted">${character.concept}</small>` : ''}
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="character-actions">
                        <button class="btn btn-sm btn-outline-primary edit-character" 
                                data-character-id="${character.id}" title="Edit">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-character" 
                                data-character-id="${character.id}" title="Delete">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Render empty state when no characters
     * @returns {string} HTML string
     */
    renderEmptyState() {
        return `
            <div class="text-center py-4">
                <i class="bi bi-people display-4 text-muted"></i>
                <p class="text-muted mt-2">No characters found</p>
                <button class="btn btn-primary btn-sm" onclick="this.closest('.character-list-panel').querySelector('#create-character-btn').click()">
                    Create Your First Character
                </button>
            </div>
        `;
    }

    /**
     * Get CSS class for clan-based avatar styling
     * @param {string} clan - Character clan
     * @returns {string} CSS class
     */
    getClanClass(clan) {
        if (!clan) return 'clan-unknown';
        
        const clanMap = {
            'Brujah': 'clan-brujah',
            'Gangrel': 'clan-gangrel',
            'Malkavian': 'clan-malkavian',
            'Nosferatu': 'clan-nosferatu',
            'Toreador': 'clan-toreador',
            'Tremere': 'clan-tremere',
            'Ventrue': 'clan-ventrue',
            'Caitiff': 'clan-caitiff',
            'Thin-Blood': 'clan-thinblood'
        };
        
        return clanMap[clan] || 'clan-unknown';
    }

    /**
     * Get initials from character name
     * @param {string} name - Character name
     * @returns {string} Initials
     */
    getInitials(name) {
        if (!name) return '?';
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
    }

    /**
     * Bind character item events
     */
    bindCharacterEvents() {
        // Character selection
        const characterItems = this.element.querySelectorAll('.character-item');
        characterItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.character-actions')) {
                    this.handleCharacterClick(e);
                }
            });
        });

        // Edit buttons
        const editButtons = this.element.querySelectorAll('.edit-character');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const characterId = btn.getAttribute('data-character-id');
                this.handleEditCharacter(characterId);
            });
        });

        // Delete buttons
        const deleteButtons = this.element.querySelectorAll('.delete-character');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const characterId = btn.getAttribute('data-character-id');
                this.handleDeleteCharacter(characterId);
            });
        });
    }

    /**
     * Load characters from character manager
     */
    async loadCharacters() {
        try {
            if (window.characterManager && typeof window.characterManager.getCharacters === 'function') {
                this.characters = await window.characterManager.getCharacters();
            } else {
                // Fallback: try to get from localStorage or other sources
                this.characters = this.getCharactersFromStorage();
            }
            
            this.filteredCharacters = [...this.characters];
            this.updateDisplay();
        } catch (error) {
            console.error('Failed to load characters:', error);
            this.characters = [];
            this.filteredCharacters = [];
        }
    }

    /**
     * Get characters from localStorage as fallback
     * @returns {Array} Character array
     */
    getCharactersFromStorage() {
        try {
            const stored = localStorage.getItem('ledger_characters');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to parse stored characters:', error);
            return [];
        }
    }

    /**
     * Handle character click/selection
     * @param {Event} event
     */
    handleCharacterClick(event) {
        const characterItem = event.currentTarget;
        const characterId = characterItem.getAttribute('data-character-id');
        
        // Update selection
        this.selectedCharacterId = characterId;
        this.updateSelection();
        
        // Emit character selection event
        this.emit('characterSelected', {
            characterId: characterId,
            character: this.characters.find(c => c.id === characterId)
        });
        
        console.log('Character selected:', characterId);
    }

    /**
     * Handle character creation
     */
    async handleCreateCharacter() {
        try {
            if (window.characterManager && typeof window.characterManager.createCharacter === 'function') {
                const newCharacter = await window.characterManager.createCharacter();
                await this.refreshCharacterList();
                
                // Select the new character
                if (newCharacter && newCharacter.id) {
                    this.selectedCharacterId = newCharacter.id;
                    this.emit('characterSelected', {
                        characterId: newCharacter.id,
                        character: newCharacter
                    });
                }
            } else {
                // Fallback: show alert
                alert('Character creation not available. Please use the character sheet view.');
            }
        } catch (error) {
            console.error('Failed to create character:', error);
            alert('Failed to create character. Please try again.');
        }
    }

    /**
     * Handle character editing
     * @param {string} characterId - Character ID
     */
    handleEditCharacter(characterId) {
        // Emit edit event or navigate to character sheet
        this.emit('characterEdit', { characterId });
        
        // Navigate to character sheet with this character
        if (window.AppRouter && typeof window.AppRouter.instance?.navigateTo === 'function') {
            window.AppRouter.instance.navigateTo('CharacterSheetView', { characterId });
        }
    }

    /**
     * Handle character deletion
     * @param {string} characterId - Character ID
     */
    async handleDeleteCharacter(characterId) {
        if (!confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
            return;
        }

        try {
            if (window.characterManager && typeof window.characterManager.deleteCharacter === 'function') {
                await window.characterManager.deleteCharacter(characterId);
                await this.refreshCharacterList();
                
                // Clear selection if deleted character was selected
                if (this.selectedCharacterId === characterId) {
                    this.selectedCharacterId = null;
                }
            } else {
                // Fallback: remove from local storage
                this.removeCharacterFromStorage(characterId);
                await this.refreshCharacterList();
            }
        } catch (error) {
            console.error('Failed to delete character:', error);
            alert('Failed to delete character. Please try again.');
        }
    }

    /**
     * Remove character from localStorage
     * @param {string} characterId - Character ID
     */
    removeCharacterFromStorage(characterId) {
        try {
            const stored = localStorage.getItem('ledger_characters');
            if (stored) {
                const characters = JSON.parse(stored);
                const filtered = characters.filter(c => c.id !== characterId);
                localStorage.setItem('ledger_characters', JSON.stringify(filtered));
            }
        } catch (error) {
            console.error('Failed to remove character from storage:', error);
        }
    }

    /**
     * Handle search input
     * @param {Event} event
     */
    handleSearch(event) {
        this.searchTerm = event.target.value.toLowerCase();
        this.filterCharacters();
    }

    /**
     * Filter characters based on search term
     */
    filterCharacters() {
        if (!this.searchTerm) {
            this.filteredCharacters = [...this.characters];
        } else {
            this.filteredCharacters = this.characters.filter(character => {
                const name = (character.name || '').toLowerCase();
                const clan = (character.clan || '').toLowerCase();
                const concept = (character.concept || '').toLowerCase();
                
                return name.includes(this.searchTerm) || 
                       clan.includes(this.searchTerm) || 
                       concept.includes(this.searchTerm);
            });
        }
        
        this.updateDisplay();
    }

    /**
     * Update character selection styling
     */
    updateSelection() {
        const characterItems = this.element.querySelectorAll('.character-item');
        characterItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-character-id') === this.selectedCharacterId) {
                item.classList.add('active');
            }
        });
    }

    /**
     * Update the display after data changes
     */
    updateDisplay() {
        const characterList = this.element.querySelector('#character-list');
        if (characterList) {
            characterList.innerHTML = this.renderCharacterList();
            this.bindCharacterEvents();
            this.updateSelection();
        }
    }

    /**
     * Refresh character list
     */
    async refreshCharacterList() {
        await this.loadCharacters();
    }

    /**
     * Cleanup on destroy
     */
    async onDestroy() {
        // Remove event listeners from character manager
        if (window.characterManager) {
            window.characterManager.off('characterSaved', this.refreshCharacterList);
            window.characterManager.off('characterDeleted', this.refreshCharacterList);
        }
    }
}

// Add CSS for character avatars
const style = document.createElement('style');
style.textContent = `
    .character-avatar .avatar-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        color: white;
    }
    
    .clan-brujah { background-color: #dc3545; }
    .clan-gangrel { background-color: #fd7e14; }
    .clan-malkavian { background-color: #6f42c1; }
    .clan-nosferatu { background-color: #495057; }
    .clan-toreador { background-color: #e83e8c; }
    .clan-tremere { background-color: #dc3545; }
    .clan-ventrue { background-color: #0d6efd; }
    .clan-caitiff { background-color: #6c757d; }
    .clan-thinblood { background-color: #adb5bd; }
    .clan-unknown { background-color: #6c757d; }
    
    .character-item {
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .character-item:hover {
        background-color: #f8f9fa;
    }
    
    .character-item.active {
        background-color: #e3f2fd;
        border-color: #2196f3;
    }
    
    .character-actions {
        opacity: 0;
        transition: opacity 0.2s;
    }
    
    .character-item:hover .character-actions {
        opacity: 1;
    }
`;

document.head.appendChild(style);

// Attach to global scope for dynamic loading
window.CharacterListPanel = CharacterListPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterListPanel;
} 