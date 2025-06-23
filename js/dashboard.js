// Dashboard functionality
let databaseManager;
let characters = [];

// Initialize dashboard
async function initDashboard() {
    try {
        // Import database manager
        const dbModule = await import('./database-manager.js');
        databaseManager = dbModule.default;
        
        // Initialize database
        await databaseManager.init();
        
        // Load characters
        await loadCharacters();
        
        // Update dashboard
        updateDashboard();
        
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
}

// Load characters from IndexedDB
async function loadCharacters() {
    try {
        characters = await databaseManager.getAllCharacters();
        console.log('Loaded characters:', characters);
    } catch (error) {
        console.error('Failed to load characters:', error);
        characters = [];
    }
}

// Update dashboard display
function updateDashboard() {
    updateCharacterGrid();
    updateDashboardStats();
}

// Update character grid
function updateCharacterGrid() {
    const characterGrid = document.getElementById('character-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (characters.length === 0) {
        characterGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    characterGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    // Clear existing cards
    const existingCards = characterGrid.querySelectorAll('.character-card');
    existingCards.forEach(card => card.remove());
    
    // Add character cards
    characters.forEach(character => {
        const card = createCharacterCard(character);
        characterGrid.appendChild(card);
    });
}

// Create a character card element
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.onclick = () => openCharacter(character.id);
    
    // Determine character system and details
    const system = getCharacterSystem(character);
    const details = getCharacterDetails(character, system);
    const lastModified = formatLastModified(character.updatedAt);
    
    card.innerHTML = `
        <div class="character-header">
            <h3 class="character-name">${character.name || 'Unnamed Character'}</h3>
            <span class="character-system">${system.displayName}</span>
        </div>
        <div class="character-details">
            ${details.map(detail => `
                <div class="character-detail">
                    <span class="detail-label">${detail.label}</span>
                    <span class="detail-value">${detail.value}</span>
                </div>
            `).join('')}
            <div class="character-detail">
                <span class="detail-label">Last Modified</span>
                <span class="detail-value">${lastModified}</span>
            </div>
        </div>
        <div class="character-actions">
            <button class="btn btn-outline-danger btn-character" onclick="event.stopPropagation(); openCharacter(${character.id})">
                <i class="bi bi-eye"></i> View
            </button>
            <button class="btn btn-outline-secondary btn-character" onclick="event.stopPropagation(); editCharacter(${character.id})">
                <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-outline-warning btn-character" onclick="event.stopPropagation(); duplicateCharacter(${character.id})">
                <i class="bi bi-files"></i> Copy
            </button>
        </div>
    `;
    
    return card;
}

// Determine character system and get relevant details
function getCharacterSystem(character) {
    // Check if it's a vampire character
    if (character.clan || character.bloodPotency !== undefined || character.generation) {
        return {
            type: 'vampire',
            displayName: 'Vampire',
            icon: 'bi-droplet-fill'
        };
    }
    
    // Check if it's a hunter character
    if (character.creed || character.virtue || character.conviction !== undefined) {
        return {
            type: 'hunter',
            displayName: 'Hunter',
            icon: 'bi-shield-fill'
        };
    }
    
    // Default to unknown
    return {
        type: 'unknown',
        displayName: 'Unknown',
        icon: 'bi-question-circle'
    };
}

// Get character details based on system
function getCharacterDetails(character, system) {
    const details = [];
    
    switch (system.type) {
        case 'vampire':
            if (character.clan) {
                details.push({ label: 'Clan', value: character.clan });
            }
            if (character.generation) {
                details.push({ label: 'Generation', value: `${character.generation}th` });
            }
            if (character.bloodPotency !== undefined) {
                details.push({ label: 'Blood Potency', value: character.bloodPotency });
            }
            break;
            
        case 'hunter':
            if (character.creed) {
                details.push({ label: 'Creed', value: character.creed });
            }
            if (character.virtue) {
                details.push({ label: 'Virtue', value: character.virtue });
            }
            if (character.conviction !== undefined) {
                details.push({ label: 'Conviction', value: character.conviction });
            }
            break;
            
        default:
            // For unknown systems, show basic info
            if (character.concept) {
                details.push({ label: 'Concept', value: character.concept });
            }
            break;
    }
    
    return details;
}

// Format last modified date
function formatLastModified(dateString) {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) {
        return 'Just now';
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    const totalCharacters = characters.length;
    const vampireCharacters = characters.filter(c => c.clan || c.bloodPotency !== undefined).length;
    const hunterCharacters = characters.filter(c => c.creed || c.virtue).length;
    const sharedCharacters = 0; // TODO: Implement sharing functionality
    
    // Update stat cards
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = totalCharacters;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = vampireCharacters;
    document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = hunterCharacters;
    document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = sharedCharacters;
}

// Character actions
function openCharacter(characterId) {
    window.location.href = 'character-sheet.html?id=' + characterId;
}

function editCharacter(characterId) {
    window.location.href = 'character-sheet.html?id=' + characterId + '&mode=edit';
}

function duplicateCharacter(characterId) {
    // TODO: Implement character duplication
    alert('Character duplication feature coming soon!');
}

function createCharacter(system) {
    document.getElementById('gameSystem').value = system;
    const modal = new bootstrap.Modal(document.getElementById('createCharacterModal'));
    modal.show();
}

function showCreateCharacter() {
    const modal = new bootstrap.Modal(document.getElementById('createCharacterModal'));
    modal.show();
}

async function createNewCharacter() {
    const name = document.getElementById('characterName').value;
    const system = document.getElementById('gameSystem').value;
    const concept = document.getElementById('characterConcept').value;
    
    if (!name || !system) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Prevent creation of disabled systems
    if (system === 'werewolf') {
        alert('Werewolf: The Apocalypse is not yet available. Please select a different system.');
        return;
    }
    
    try {
        // Create basic character structure based on system
        const characterData = {
            name: name,
            concept: concept,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add system-specific default data
        switch (system) {
            case 'vampire':
                characterData.clan = '';
                characterData.generation = 13;
                characterData.bloodPotency = 0;
                characterData.humanity = 7;
                characterData.attributes = {
                    strength: 1, dexterity: 1, stamina: 1,
                    charisma: 1, manipulation: 1, composure: 1,
                    intelligence: 1, wits: 1, resolve: 1
                };
                characterData.skills = {};
                characterData.disciplines = [];
                characterData.merits = [];
                characterData.flaws = [];
                break;
                
            case 'hunter':
                characterData.creed = '';
                characterData.virtue = '';
                characterData.conviction = 5;
                characterData.attributes = {
                    strength: 1, dexterity: 1, stamina: 1,
                    charisma: 1, manipulation: 1, composure: 1,
                    intelligence: 1, wits: 1, resolve: 1
                };
                characterData.skills = {};
                characterData.edges = [];
                characterData.flaws = [];
                break;
                
            default:
                alert('Invalid game system selected. Please choose Vampire or Hunter.');
                return;
        }
        
        // Save character to database
        const characterId = await databaseManager.saveCharacter(characterData);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('createCharacterModal'));
        modal.hide();
        
        // Reload characters and update dashboard
        await loadCharacters();
        updateDashboard();
        
        // Show success message
        alert('Character created successfully!');
        
        // Optionally redirect to character sheet
        if (confirm('Would you like to open the character sheet now?')) {
            window.location.href = 'character-sheet.html?id=' + characterId;
        }
        
    } catch (error) {
        console.error('Failed to create character:', error);
        alert('Failed to create character. Please try again.');
    }
}

// Refresh dashboard
async function refreshDashboard() {
    try {
        await loadCharacters();
        updateDashboard();
        console.log('Dashboard refreshed');
    } catch (error) {
        console.error('Failed to refresh dashboard:', error);
    }
}

// Settings functionality
let settings = {};

// Open settings modal
function openSettings() {
    loadSettings();
    const modal = new bootstrap.Modal(document.getElementById('settingsModal'));
    modal.show();
}

// Load settings from database
async function loadSettings() {
    try {
        // Ensure database manager is available
        if (!databaseManager) {
            console.error('Database manager not available');
            return;
        }
        
        // Load Discord webhook
        const discordWebhook = await databaseManager.getSetting('discordWebhook') || '';
        document.getElementById('discordWebhookInput').value = discordWebhook;
        
        // Load other settings with defaults
        const defaultTheme = await databaseManager.getSetting('defaultTheme') || 'default';
        document.getElementById('defaultTheme').value = defaultTheme;
        
        const autoSaveInterval = await databaseManager.getSetting('autoSaveInterval') || '5';
        document.getElementById('autoSaveInterval').value = autoSaveInterval;
        
        const showTooltips = await databaseManager.getSetting('showTooltips') !== 'false';
        document.getElementById('showTooltips').checked = showTooltips;
        
        const confirmDeletions = await databaseManager.getSetting('confirmDeletions') !== 'false';
        document.getElementById('confirmDeletions').checked = confirmDeletions;
        
        const discordEnabled = await databaseManager.getSetting('discordEnabled') !== 'false';
        document.getElementById('discordEnabled').checked = discordEnabled;
        
        const discordDiceRolls = await databaseManager.getSetting('discordDiceRolls') !== 'false';
        document.getElementById('discordDiceRolls').checked = discordDiceRolls;
        
        const discordCharacterUpdates = await databaseManager.getSetting('discordCharacterUpdates') === 'true';
        document.getElementById('discordCharacterUpdates').checked = discordCharacterUpdates;
        
        const discordSystemMessages = await databaseManager.getSetting('discordSystemMessages') === 'true';
        document.getElementById('discordSystemMessages').checked = discordSystemMessages;
        
    } catch (error) {
        console.error('Failed to load settings:', error);
    }
}

// Save settings to database
async function saveSettings() {
    try {
        // Save Discord webhook
        const discordWebhook = document.getElementById('discordWebhookInput').value.trim();
        if (discordWebhook) {
            await databaseManager.setSetting('discordWebhook', discordWebhook);
        } else {
            await databaseManager.deleteSetting('discordWebhook');
        }
        
        // Save other settings
        await databaseManager.setSetting('defaultTheme', document.getElementById('defaultTheme').value);
        await databaseManager.setSetting('autoSaveInterval', document.getElementById('autoSaveInterval').value);
        await databaseManager.setSetting('showTooltips', document.getElementById('showTooltips').checked.toString());
        await databaseManager.setSetting('confirmDeletions', document.getElementById('confirmDeletions').checked.toString());
        await databaseManager.setSetting('discordEnabled', document.getElementById('discordEnabled').checked.toString());
        await databaseManager.setSetting('discordDiceRolls', document.getElementById('discordDiceRolls').checked.toString());
        await databaseManager.setSetting('discordCharacterUpdates', document.getElementById('discordCharacterUpdates').checked.toString());
        await databaseManager.setSetting('discordSystemMessages', document.getElementById('discordSystemMessages').checked.toString());
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
        modal.hide();
        
        // Show success message
        alert('Settings saved successfully!');
        
    } catch (error) {
        console.error('Failed to save settings:', error);
        alert('Failed to save settings. Please try again.');
    }
}

// Test Discord webhook
async function testDiscordWebhook() {
    const webhookUrl = document.getElementById('discordWebhookInput').value.trim();
    
    if (!webhookUrl) {
        alert('Please enter a Discord webhook URL first.');
        return;
    }
    
    if (!webhookUrl.match(/^https:\/\/discord\.com\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9_-]+$/)) {
        alert('Please enter a valid Discord webhook URL.');
        return;
    }
    
    try {
        const testEmbed = {
            title: "🎲 The Ledger - Discord Integration Test",
            description: "This is a test message from The Ledger character management system.",
            color: 0xa40000,
            fields: [
                {
                    name: "Status",
                    value: "✅ Discord integration is working!",
                    inline: true
                },
                {
                    name: "Time",
                    value: new Date().toLocaleString(),
                    inline: true
                }
            ],
            timestamp: new Date().toISOString()
        };
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [testEmbed] })
        });
        
        if (response.ok) {
            alert('✅ Discord webhook test successful! Check your Discord channel.');
        } else {
            alert('❌ Discord webhook test failed. Please check your webhook URL.');
        }
        
    } catch (error) {
        console.error('Discord webhook test failed:', error);
        alert('❌ Discord webhook test failed. Please check your webhook URL and try again.');
    }
}

// Export all data
async function exportAllData() {
    try {
        const characters = await databaseManager.getAllCharacters();
        const settings = {};
        
        // Get all settings
        const settingKeys = ['discordWebhook', 'defaultTheme', 'autoSaveInterval', 'showTooltips', 
                           'confirmDeletions', 'discordEnabled', 'discordDiceRolls', 
                           'discordCharacterUpdates', 'discordSystemMessages'];
        
        for (const key of settingKeys) {
            const value = await databaseManager.getSetting(key);
            if (value !== null) {
                settings[key] = value;
            }
        }
        
        const exportData = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            characters: characters,
            settings: settings
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ledger-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('✅ Data exported successfully!');
        
    } catch (error) {
        console.error('Failed to export data:', error);
        alert('❌ Failed to export data. Please try again.');
    }
}

// Import data
function importData() {
    document.getElementById('importFile').click();
}

// Handle import file
async function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        const text = await file.text();
        const importData = JSON.parse(text);
        
        if (!importData.version || !importData.characters) {
            throw new Error('Invalid backup file format');
        }
        
        if (confirm(`This will import ${importData.characters.length} characters and overwrite existing settings. Continue?`)) {
            // Import characters
            for (const character of importData.characters) {
                await databaseManager.saveCharacter(character, character.id);
            }
            
            // Import settings
            if (importData.settings) {
                for (const [key, value] of Object.entries(importData.settings)) {
                    await databaseManager.setSetting(key, value);
                }
            }
            
            // Reload dashboard
            await loadCharacters();
            updateDashboard();
            
            alert(`✅ Successfully imported ${importData.characters.length} characters and settings!`);
        }
        
    } catch (error) {
        console.error('Failed to import data:', error);
        alert('❌ Failed to import data. Please check the file format and try again.');
    }
    
    // Clear file input
    event.target.value = '';
}

// Clear all data
async function clearAllData() {
    if (confirm('⚠️ This will permanently delete ALL characters and settings. This action cannot be undone. Are you absolutely sure?')) {
        if (confirm('⚠️ Final warning: This will delete everything. Continue?')) {
            try {
                await databaseManager.clearAllData();
                characters = [];
                updateDashboard();
                alert('✅ All data has been cleared.');
            } catch (error) {
                console.error('Failed to clear data:', error);
                alert('❌ Failed to clear data. Please try again.');
            }
        }
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
});

// Export functions globally for HTML onclick attributes
window.refreshDashboard = refreshDashboard;
window.openSettings = openSettings;
window.saveSettings = saveSettings;
window.testDiscordWebhook = testDiscordWebhook;
window.exportAllData = exportAllData;
window.importData = importData;
window.handleImportFile = handleImportFile;
window.clearAllData = clearAllData;
window.openCharacter = openCharacter;
window.editCharacter = editCharacter;
window.duplicateCharacter = duplicateCharacter;
window.createCharacter = createCharacter;
window.showCreateCharacter = showCreateCharacter;
window.createNewCharacter = createNewCharacter; 