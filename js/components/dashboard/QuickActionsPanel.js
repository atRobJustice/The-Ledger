/**
 * QuickActionsPanel - Provides quick access to common actions and recent items
 * Extends BaseComponent and integrates with backup-manager.js
 */
class QuickActionsPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.recentCharacters = [];
        this.recentActions = [];
        this.maxRecentItems = 5;
        
        // Bind methods
        this.handleQuickCreate = this.handleQuickCreate.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleCharacterQuickAccess = this.handleCharacterQuickAccess.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this);
        this.loadRecentData = this.loadRecentData.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        await this.loadRecentData();
        
        // Listen for character manager events to update recent characters
        if (window.characterManager) {
            window.characterManager.on('characterSaved', this.loadRecentData);
            window.characterManager.on('characterDeleted', this.loadRecentData);
        }
    }

    /**
     * Render the quick actions panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="mb-0">
                        <i class="bi bi-lightning-fill"></i> Quick Actions
                    </h5>
                </div>
                <div class="card-body p-0">
                    <!-- Quick Create Section -->
                    <div class="p-3 border-bottom">
                        <div class="d-grid gap-2">
                            <button id="quick-create-btn" class="btn btn-success">
                                <i class="bi bi-plus-circle"></i> Quick Create Character
                            </button>
                            <div class="btn-group" role="group">
                                <button id="import-btn" class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-upload"></i> Import
                                </button>
                                <button id="export-btn" class="btn btn-outline-primary btn-sm">
                                    <i class="bi bi-download"></i> Export
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Characters Section -->
                    <div class="p-3 border-bottom">
                        <h6 class="mb-2">
                            <i class="bi bi-clock-history"></i> Recent Characters
                        </h6>
                        <div id="recent-characters-list">
                            ${this.renderRecentCharacters()}
                        </div>
                    </div>

                    <!-- Quick Navigation Section -->
                    <div class="p-3 border-bottom">
                        <h6 class="mb-2">
                            <i class="bi bi-compass"></i> Quick Navigation
                        </h6>
                        <div class="d-grid gap-1">
                            <button class="btn btn-outline-secondary btn-sm quick-nav-btn" data-target="character-sheet">
                                <i class="bi bi-person-lines-fill"></i> Character Sheet
                            </button>
                            <button class="btn btn-outline-secondary btn-sm quick-nav-btn" data-target="backup">
                                <i class="bi bi-cloud-arrow-up"></i> Backup Manager
                            </button>
                            <button class="btn btn-outline-secondary btn-sm quick-nav-btn" data-target="settings">
                                <i class="bi bi-gear"></i> Settings
                            </button>
                        </div>
                    </div>

                    <!-- Recent Actions Section -->
                    <div class="p-3">
                        <h6 class="mb-2">
                            <i class="bi bi-activity"></i> Recent Actions
                        </h6>
                        <div id="recent-actions-list">
                            ${this.renderRecentActions()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup
     */
    async afterRender() {
        // Bind quick action buttons
        const quickCreateBtn = this.element.querySelector('#quick-create-btn');
        if (quickCreateBtn) {
            quickCreateBtn.addEventListener('click', this.handleQuickCreate);
        }

        const importBtn = this.element.querySelector('#import-btn');
        if (importBtn) {
            importBtn.addEventListener('click', this.handleImport);
        }

        const exportBtn = this.element.querySelector('#export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', this.handleExport);
        }

        // Bind quick navigation buttons
        const navButtons = this.element.querySelectorAll('.quick-nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget.getAttribute('data-target');
                this.handleQuickNavigation(target);
            });
        });

        // Bind recent character click events
        this.bindRecentCharacterEvents();
    }

    /**
     * Render recent characters list
     * @returns {string} HTML string
     */
    renderRecentCharacters() {
        if (this.recentCharacters.length === 0) {
            return `
                <div class="text-center py-2">
                    <small class="text-muted">No recent characters</small>
                </div>
            `;
        }

        return this.recentCharacters.map(character => `
            <div class="recent-character-item d-flex align-items-center p-2 rounded mb-1" 
                 data-character-id="${character.id}">
                <div class="avatar-circle-sm ${this.getClanClass(character.clan)} me-2">
                    <span class="avatar-text-sm">${this.getInitials(character.name)}</span>
                </div>
                <div class="flex-grow-1">
                    <div class="fw-bold small">${character.name || 'Unnamed'}</div>
                    <div class="text-muted small">${character.clan || 'Unknown'} • ${this.formatLastAccessed(character.lastAccessed)}</div>
                </div>
                <button class="btn btn-sm btn-outline-primary quick-access-btn" 
                        data-character-id="${character.id}" title="Quick Access">
                    <i class="bi bi-arrow-right"></i>
                </button>
            </div>
        `).join('');
    }

    /**
     * Render recent actions list
     * @returns {string} HTML string
     */
    renderRecentActions() {
        if (this.recentActions.length === 0) {
            return `
                <div class="text-center py-2">
                    <small class="text-muted">No recent actions</small>
                </div>
            `;
        }

        return this.recentActions.map(action => `
            <div class="recent-action-item d-flex align-items-center p-2 rounded mb-1" 
                 data-action-id="${action.id}">
                <div class="action-icon me-2">
                    <i class="bi ${this.getActionIcon(action.type)}"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="small">${action.description}</div>
                    <div class="text-muted small">${this.formatTimestamp(action.timestamp)}</div>
                </div>
            </div>
        `).join('');
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
     * Get action icon based on action type
     * @param {string} type - Action type
     * @returns {string} Bootstrap icon class
     */
    getActionIcon(type) {
        const iconMap = {
            'create': 'bi-plus-circle',
            'edit': 'bi-pencil',
            'delete': 'bi-trash',
            'save': 'bi-check-circle',
            'import': 'bi-upload',
            'export': 'bi-download',
            'backup': 'bi-cloud-arrow-up',
            'restore': 'bi-cloud-arrow-down'
        };
        return iconMap[type] || 'bi-activity';
    }

    /**
     * Format timestamp for display
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted time
     */
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }

    /**
     * Format last accessed time
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted time
     */
    formatLastAccessed(timestamp) {
        if (!timestamp) return 'Never';
        return this.formatTimestamp(timestamp);
    }

    /**
     * Bind recent character events
     */
    bindRecentCharacterEvents() {
        const quickAccessButtons = this.element.querySelectorAll('.quick-access-btn');
        quickAccessButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const characterId = btn.getAttribute('data-character-id');
                this.handleCharacterQuickAccess(characterId);
            });
        });

        const recentCharacterItems = this.element.querySelectorAll('.recent-character-item');
        recentCharacterItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.quick-access-btn')) {
                    const characterId = item.getAttribute('data-character-id');
                    this.handleCharacterQuickAccess(characterId);
                }
            });
        });
    }

    /**
     * Load recent data from storage
     */
    async loadRecentData() {
        try {
            // Load recent characters
            this.recentCharacters = this.getRecentCharacters();
            
            // Load recent actions
            this.recentActions = this.getRecentActions();
            
            // Update display if mounted
            if (this.isMounted) {
                this.updateDisplay();
            }
        } catch (error) {
            console.error('Failed to load recent data:', error);
        }
    }

    /**
     * Get recent characters from storage
     * @returns {Array} Recent characters array
     */
    getRecentCharacters() {
        try {
            const stored = localStorage.getItem('ledger_recent_characters');
            const recent = stored ? JSON.parse(stored) : [];
            
            // Get current character list to validate recent characters
            let currentCharacters = [];
            if (window.characterManager && typeof window.characterManager.getCharacters === 'function') {
                // This would need to be async, but for now we'll use a fallback
                const storedChars = localStorage.getItem('ledger_characters');
                currentCharacters = storedChars ? JSON.parse(storedChars) : [];
            }
            
            // Filter out characters that no longer exist
            return recent.filter(recentChar => 
                currentCharacters.some(char => char.id === recentChar.id)
            ).slice(0, this.maxRecentItems);
        } catch (error) {
            console.error('Failed to get recent characters:', error);
            return [];
        }
    }

    /**
     * Get recent actions from storage
     * @returns {Array} Recent actions array
     */
    getRecentActions() {
        try {
            const stored = localStorage.getItem('ledger_recent_actions');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to get recent actions:', error);
            return [];
        }
    }

    /**
     * Add action to recent actions
     * @param {string} type - Action type
     * @param {string} description - Action description
     */
    addRecentAction(type, description) {
        const action = {
            id: Date.now().toString(),
            type: type,
            description: description,
            timestamp: Date.now()
        };
        
        this.recentActions.unshift(action);
        this.recentActions = this.recentActions.slice(0, this.maxRecentItems);
        
        // Save to storage
        try {
            localStorage.setItem('ledger_recent_actions', JSON.stringify(this.recentActions));
        } catch (error) {
            console.error('Failed to save recent actions:', error);
        }
        
        // Update display
        this.updateDisplay();
    }

    /**
     * Add character to recent characters
     * @param {Object} character - Character object
     */
    addRecentCharacter(character) {
        const recentChar = {
            id: character.id,
            name: character.name,
            clan: character.clan,
            lastAccessed: Date.now()
        };
        
        // Remove if already exists
        this.recentCharacters = this.recentCharacters.filter(c => c.id !== character.id);
        
        // Add to beginning
        this.recentCharacters.unshift(recentChar);
        this.recentCharacters = this.recentCharacters.slice(0, this.maxRecentItems);
        
        // Save to storage
        try {
            localStorage.setItem('ledger_recent_characters', JSON.stringify(this.recentCharacters));
        } catch (error) {
            console.error('Failed to save recent characters:', error);
        }
        
        // Update display
        this.updateDisplay();
    }

    /**
     * Handle quick character creation
     */
    async handleQuickCreate() {
        try {
            this.addRecentAction('create', 'Created new character');
            
            if (window.characterManager && typeof window.characterManager.createCharacter === 'function') {
                const newCharacter = await window.characterManager.createCharacter();
                
                // Add to recent characters
                if (newCharacter) {
                    this.addRecentCharacter(newCharacter);
                }
                
                // Emit event
                this.emit('characterCreated', { character: newCharacter });
                
                // Navigate to character sheet
                if (window.AppRouter && typeof window.AppRouter.instance?.navigateTo === 'function') {
                    window.AppRouter.instance.navigateTo('CharacterSheetView', { characterId: newCharacter.id });
                }
            } else {
                alert('Character creation not available. Please use the character sheet view.');
            }
        } catch (error) {
            console.error('Failed to create character:', error);
            alert('Failed to create character. Please try again.');
        }
    }

    /**
     * Handle import functionality
     */
    async handleImport() {
        try {
            this.addRecentAction('import', 'Imported character data');
            
            if (window.backupManager && typeof window.backupManager.importData === 'function') {
                await window.backupManager.importData();
                await this.loadRecentData();
                this.emit('dataImported');
            } else {
                // Fallback: create file input
                this.createFileInput('import');
            }
        } catch (error) {
            console.error('Failed to import data:', error);
            alert('Failed to import data. Please try again.');
        }
    }

    /**
     * Handle export functionality
     */
    async handleExport() {
        try {
            this.addRecentAction('export', 'Exported character data');
            
            if (window.backupManager && typeof window.backupManager.exportData === 'function') {
                await window.backupManager.exportData();
                this.emit('dataExported');
            } else {
                // Fallback: export current character data
                this.exportCurrentData();
            }
        } catch (error) {
            console.error('Failed to export data:', error);
            alert('Failed to export data. Please try again.');
        }
    }

    /**
     * Handle character quick access
     * @param {string} characterId - Character ID
     */
    handleCharacterQuickAccess(characterId) {
        const character = this.recentCharacters.find(c => c.id === characterId);
        if (character) {
            // Update last accessed
            character.lastAccessed = Date.now();
            this.addRecentAction('access', `Accessed ${character.name}`);
            
            // Emit character selection event
            this.emit('characterSelected', {
                characterId: characterId,
                character: character
            });
            
            // Navigate to character sheet
            if (window.AppRouter && typeof window.AppRouter.instance?.navigateTo === 'function') {
                window.AppRouter.instance.navigateTo('CharacterSheetView', { characterId });
            }
        }
    }

    /**
     * Handle quick navigation
     * @param {string} target - Navigation target
     */
    handleQuickNavigation(target) {
        switch (target) {
            case 'character-sheet':
                if (window.AppRouter && typeof window.AppRouter.instance?.navigateTo === 'function') {
                    window.AppRouter.instance.navigateTo('CharacterSheetView');
                }
                break;
            case 'backup':
                if (window.backupManager && typeof window.backupManager.showBackupModal === 'function') {
                    window.backupManager.showBackupModal();
                }
                break;
            case 'settings':
                // Emit settings event
                this.emit('openSettings');
                break;
        }
        
        this.addRecentAction('navigate', `Navigated to ${target}`);
    }

    /**
     * Create file input for import/export
     * @param {string} type - 'import' or 'export'
     */
    createFileInput(type) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.style.display = 'none';
        
        if (type === 'import') {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.handleFileImport(file);
                }
            });
        }
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }

    /**
     * Handle file import
     * @param {File} file - File to import
     */
    async handleFileImport(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // Validate data structure
            if (data.characters && Array.isArray(data.characters)) {
                // Store imported data
                localStorage.setItem('ledger_characters', JSON.stringify(data.characters));
                
                this.addRecentAction('import', `Imported ${data.characters.length} characters`);
                this.emit('dataImported', { characters: data.characters });
                
                // Reload recent data
                await this.loadRecentData();
                
                alert(`Successfully imported ${data.characters.length} characters!`);
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Failed to import file:', error);
            alert('Failed to import file. Please check the file format.');
        }
    }

    /**
     * Export current data
     */
    exportCurrentData() {
        try {
            const characters = this.getCharactersFromStorage();
            const data = {
                characters: characters,
                exportedAt: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ledger-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addRecentAction('export', `Exported ${characters.length} characters`);
            this.emit('dataExported', { characters: characters });
        } catch (error) {
            console.error('Failed to export data:', error);
            alert('Failed to export data. Please try again.');
        }
    }

    /**
     * Get characters from storage
     * @returns {Array} Characters array
     */
    getCharactersFromStorage() {
        try {
            const stored = localStorage.getItem('ledger_characters');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to get characters from storage:', error);
            return [];
        }
    }

    /**
     * Update the display
     */
    updateDisplay() {
        const recentCharactersList = this.element.querySelector('#recent-characters-list');
        const recentActionsList = this.element.querySelector('#recent-actions-list');
        
        if (recentCharactersList) {
            recentCharactersList.innerHTML = this.renderRecentCharacters();
            this.bindRecentCharacterEvents();
        }
        
        if (recentActionsList) {
            recentActionsList.innerHTML = this.renderRecentActions();
        }
    }

    /**
     * Cleanup on destroy
     */
    async onDestroy() {
        // Remove event listeners from character manager
        if (window.characterManager) {
            window.characterManager.off('characterSaved', this.loadRecentData);
            window.characterManager.off('characterDeleted', this.loadRecentData);
        }
    }
}

// Add CSS for quick actions panel
const quickActionsStyle = document.createElement('style');
quickActionsStyle.textContent = `
    .avatar-circle-sm {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 10px;
        color: white;
    }
    
    .recent-character-item {
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .recent-character-item:hover {
        background-color: #f8f9fa;
    }
    
    .recent-action-item {
        transition: background-color 0.2s;
    }
    
    .recent-action-item:hover {
        background-color: #f8f9fa;
    }
    
    .action-icon {
        width: 24px;
        text-align: center;
        color: #6c757d;
    }
    
    .quick-nav-btn {
        text-align: left;
    }
    
    .quick-nav-btn:hover {
        background-color: #e9ecef;
    }
`;

document.head.appendChild(quickActionsStyle);

// Attach to global scope for dynamic loading
window.QuickActionsPanel = QuickActionsPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuickActionsPanel;
} 