// Dashboard functionality
let databaseManager;
let characters = [];

// Get global manager instances
const toastManager = window.toastManager;
const modalManager = window.modalManager;

// Import Discord integration functions
let sendToDiscord;

// Initialize dashboard
async function initDashboard() {
    try {
        // Import database manager
        const dbModule = await import('../managers/database-manager.js');
        databaseManager = dbModule.default;
        
        // Import Discord integration
        const discordModule = await import('../../integrations/discord-integration.js');
        sendToDiscord = discordModule.sendToDiscord;
        
        // Initialize database
        await databaseManager.init();
        
        // Load and apply saved theme
        await loadSavedTheme();
        
        // Load characters
        await loadCharacters();
        
        // Update dashboard
        updateDashboard();
        
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
}

// Load and apply saved theme
async function loadSavedTheme() {
    try {
        if (databaseManager) {
            const savedTheme = await databaseManager.getSetting('theme') || await databaseManager.getSetting('defaultTheme') || 'wod-dark';
            if (savedTheme && savedTheme !== 'wod-dark') {
                document.body.setAttribute('data-theme', savedTheme);
                console.log('Applied saved theme:', savedTheme);
            } else {
                document.body.setAttribute('data-theme', 'wod-dark');
                console.log('Using default World of Darkness dark theme');
            }
        }
    } catch (error) {
        console.error('Failed to load saved theme:', error);
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
}

// Update character grid
function updateCharacterGrid() {
    const characterGrid = document.getElementById('character-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (characters.length === 0) {
        characterGrid.classList.add('d-none');
        if (emptyState) {
            emptyState.classList.add('d-block');
        }
    } else {
        characterGrid.classList.remove('d-none');
        characterGrid.classList.add('d-grid');
        if (emptyState) {
            emptyState.classList.remove('d-block');
        }
    }
    
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
                    <span class="detail-value">${detail.value.charAt(0).toUpperCase() + detail.value.slice(1)}</span>
                </div>
            `).join('')}
            <div class="character-detail">
                <span class="detail-label">Last Modified</span>
                <span class="detail-value">${lastModified}</span>
            </div>
        </div>
        <div class="character-actions">
            <button class="btn theme-btn-outline-primary btn-character btn-view">
                <i class="bi bi-eye"></i> View
            </button>
            <button class="btn theme-btn-outline-secondary btn-character btn-edit">
                <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn theme-btn-outline-warning btn-character btn-copy">
                <i class="bi bi-files"></i> Copy
            </button>
            <button class="btn theme-btn-outline-danger btn-character btn-delete">
                <i class="bi bi-trash"></i> Delete
            </button>
        </div>
    `;
    
    // Attach event listeners for action buttons
    card.querySelector('.btn-view').addEventListener('click', function(event) {
        event.stopPropagation();
        openCharacter(character.id);
    });
    card.querySelector('.btn-edit').addEventListener('click', function(event) {
        event.stopPropagation();
        editCharacter(character.id);
    });
    card.querySelector('.btn-copy').addEventListener('click', function(event) {
        event.stopPropagation();
        duplicateCharacter(character.id);
    });
    card.querySelector('.btn-delete').addEventListener('click', function(event) {
        event.stopPropagation();
        deleteCharacter(character.id, character.name || 'Unnamed Character');
    });
    
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

// Character actions
function openCharacter(characterId) {
    window.location.href = 'character-sheet.html?id=' + characterId + '&locked=true';
}

function editCharacter(characterId) {
    window.location.href = 'character-sheet.html?id=' + characterId + '&locked=false';
}

async function duplicateCharacter(characterId) {
    toastManager.info('Character duplication feature coming soon!', 'Coming Soon');
}

async function deleteCharacter(characterId, characterName) {
    // Check if deletion confirmation is enabled
    const confirmDeletions = await databaseManager.getSetting('confirmDeletions');
    const shouldConfirm = confirmDeletions === null || confirmDeletions === 'true';
    let shouldDelete = true;
    if (shouldConfirm) {
        shouldDelete = await modalManager.confirm('Delete Character', `Are you sure you want to delete "${characterName}"? This action cannot be undone.`, {
            confirmText: 'Delete',
            confirmClass: 'theme-btn-danger',
        });
    }
    if (shouldDelete) {
        try {
            await databaseManager.deleteCharacter(characterId);
            characters = characters.filter(c => c.id !== characterId);
            updateDashboard();
            toastManager.success(`Character "${characterName}" has been deleted successfully.`, 'Deleted');
        } catch (error) {
            console.error('Failed to delete character:', error);
            toastManager.error('Failed to delete character. Please try again.', 'Error');
        }
    }
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
        toastManager.warning('Please fill in all required fields.', 'Missing Fields');
        return;
    }
    if (system === 'werewolf') {
        toastManager.info('Werewolf: The Apocalypse is not yet available. Please select a different system.', 'Not Available');
        return;
    }
    try {
        const characterData = {
            name: name,
            concept: concept,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        switch (system) {
            case 'vampire':
                characterData.clan = '';
                break;
            case 'hunter':
                characterData.creed = '';
                break;
            default:
                toastManager.error('Invalid game system selected. Please choose Vampire or Hunter.', 'Error');
                return;
        }
        const characterId = await databaseManager.saveCharacter(characterData);
        await loadCharacters();
        updateDashboard();
        toastManager.success('Character created successfully!', 'Success');
        const openNow = await modalManager.confirm('Character Created', 'Would you like to open the character sheet now?', {
            confirmText: 'Open Sheet',
            cancelText: 'Stay on Dashboard',
            confirmClass: 'btn-success',
        });
        if (openNow) {
            openCharacter(characterId);
        }
    } catch (error) {
        console.error('Failed to create character:', error);
        toastManager.error('Failed to create character. Please try again.', 'Error');
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
        
        // Load theme setting (use 'theme' key from the theme system, fallback to 'defaultTheme')
        const currentTheme = await databaseManager.getSetting('theme') || await databaseManager.getSetting('defaultTheme') || 'wod-dark';
        console.log('Loading theme setting:', currentTheme);
        
        const themeDropdown = document.getElementById('defaultTheme');
        if (themeDropdown) {
            themeDropdown.value = currentTheme;
            console.log('Set theme dropdown value to:', currentTheme);
        } else {
            console.error('Theme dropdown not found');
        }
        
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
        
        // Add event listener for theme dropdown changes (only once)
        if (themeDropdown && !themeDropdown.hasAttribute('data-theme-listener-added')) {
            themeDropdown.setAttribute('data-theme-listener-added', 'true');
            themeDropdown.addEventListener('change', function() {
                console.log('Theme dropdown changed to:', this.value);
                applyThemeFromDropdown(this.value);
            });
            console.log('Added theme dropdown event listener');
        }
        
    } catch (error) {
        console.error('Failed to load settings:', error);
    }
}

// Function to apply theme from dropdown selection
function applyThemeFromDropdown(themeKey) {
    console.log('Applying theme from dropdown:', themeKey);
    
    if (themeKey === "wod-dark") {
        document.body.setAttribute("data-theme", "wod-dark");
    } else {
        document.body.setAttribute("data-theme", themeKey);
    }
    
    // Save to database using the 'theme' key (same as the existing theme system)
    if (window.databaseManager) {
        window.databaseManager.setSetting('theme', themeKey).catch(err => {
            console.error('Failed to save theme to database:', err);
        });
    }
}

async function saveSettings() {
    try {
        await databaseManager.setSetting('discordWebhook', document.getElementById('discordWebhookInput').value.trim());
        
        // Save and apply theme
        const selectedTheme = document.getElementById('defaultTheme').value;
        await databaseManager.setSetting('theme', selectedTheme);
        applyThemeFromDropdown(selectedTheme);
        
        await databaseManager.setSetting('confirmDeletions', document.getElementById('confirmDeletions').checked.toString());
        await databaseManager.setSetting('discordEnabled', document.getElementById('discordEnabled').checked.toString());
        await databaseManager.setSetting('discordDiceRolls', document.getElementById('discordDiceRolls').checked.toString());
        await databaseManager.setSetting('discordCharacterUpdates', document.getElementById('discordCharacterUpdates').checked.toString());
        await databaseManager.setSetting('discordSystemMessages', document.getElementById('discordSystemMessages').checked.toString());
        const modal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
        modal.hide();
        toastManager.success('Settings saved successfully!', 'Success');
    } catch (error) {
        console.error('Failed to save settings:', error);
        toastManager.error('Failed to save settings. Please try again.', 'Error');
    }
}

async function testDiscordWebhook() {
    const webhookUrl = document.getElementById('discordWebhookInput').value.trim();
    if (!webhookUrl) {
        toastManager.warning('Please enter a Discord webhook URL first.', 'Missing URL');
        return;
    }
    if (!webhookUrl.match(/^https:\/\/(discord\.com|discordapp\.com)\/api\/webhooks\/[0-9]+\/[a-zA-Z0-9_-]+$/)) {
        toastManager.warning('Please enter a valid Discord webhook URL.', 'Invalid URL');
        return;
    }
    try {
        const testEmbed = {
            title: "🎲 The Ledger - Discord Integration Test",
            description: "This is a test message from The Ledger character management system.",
            color: 0x00a400,
            fields: [
                { name: "Status", value: "✅ Discord integration is working!", inline: true },
                { name: "Time", value: new Date().toLocaleString(), inline: true }
            ],
            timestamp: new Date().toISOString()
        };
        
        // Use the sendToDiscord function which respects the discordEnabled toggle
        await sendToDiscord(testEmbed);
        toastManager.success('✅ Discord webhook test successful! Check your Discord channel.', 'Success');
    } catch (error) {
        console.error('Discord webhook test failed:', error);
        toastManager.error('❌ Discord webhook test failed. Please check your webhook URL and try again.', 'Error');
    }
}

async function exportAllData() {
    try {
        const characters = await databaseManager.getAllCharacters();
        const settings = {};
        const settingKeys = ['discordWebhook', 'theme', 'confirmDeletions', 'discordEnabled', 'discordDiceRolls', 'discordCharacterUpdates', 'discordSystemMessages'];
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
        toastManager.success('✅ Data exported successfully!', 'Exported');
    } catch (error) {
        console.error('Failed to export data:', error);
        toastManager.error('❌ Failed to export data. Please try again.', 'Error');
    }
}

function importData() {
    document.getElementById('importFile').click();
}

async function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
        const text = await file.text();
        const importData = JSON.parse(text);
        if (!importData.version || !importData.characters) {
            throw new Error('Invalid backup file format');
        }
        const confirmed = await modalManager.confirm('Import Data', `This will import ${importData.characters.length} characters and overwrite existing settings. Continue?`, {
            confirmText: 'Import',
            confirmClass: 'btn-warning',
        });
        if (confirmed) {
            for (const character of importData.characters) {
                await databaseManager.saveCharacter(character, character.id);
            }
            if (importData.settings) {
                for (const [key, value] of Object.entries(importData.settings)) {
                    await databaseManager.setSetting(key, value);
                }
            }
            await loadCharacters();
            updateDashboard();
            toastManager.success(`Successfully imported ${importData.characters.length} characters and settings!`, 'Imported');
        }
    } catch (error) {
        console.error('Failed to import data:', error);
        toastManager.error('Failed to import data. Please check the file format and try again.', 'Error');
    }
    event.target.value = '';
}

async function clearAllData() {
    const confirm1 = await modalManager.confirm('Clear All Data', '⚠️ This will permanently delete ALL characters and settings. This action cannot be undone. Are you absolutely sure?', {
        confirmText: 'Yes, Delete All',
        confirmClass: 'theme-btn-danger',
    });
    if (confirm1) {
        const confirm2 = await modalManager.confirm('Final Warning', '⚠️ Final warning: This will delete everything. Continue?', {
            confirmText: 'Delete Everything',
            confirmClass: 'theme-btn-danger',
        });
        if (confirm2) {
            try {
                await databaseManager.clearAllData();
                characters = [];
                updateDashboard();
                toastManager.success('All data has been cleared.', 'Cleared');
            } catch (error) {
                console.error('Failed to clear data:', error);
                toastManager.error('Failed to clear data. Please try again.', 'Error');
            }
        }
    }
}

// Import character from JSON
function importCharacter() {
    document.getElementById('characterImportFile').click();
}

// Handle character import
async function handleCharacterImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        const text = await file.text();
        const characterData = JSON.parse(text);
        
        // Validate that this looks like a character file
        if (!characterData.name && !characterData.clan && !characterData.attributes) {
            throw new Error('Invalid character file format');
        }
        
        // Generate a new ID for the imported character
        const newId = Date.now();
        characterData.id = newId;
        characterData.createdAt = new Date().toISOString();
        characterData.updatedAt = new Date().toISOString();
        
        // Save the character
        await databaseManager.saveCharacter(characterData, newId);
        
        // Reload dashboard
        await loadCharacters();
        updateDashboard();
        
        toastManager.success(`Successfully imported character: ${characterData.name || 'Unnamed Character'}`, 'Imported');
        
    } catch (error) {
        console.error('Failed to import character:', error);
        toastManager.error('Failed to import character. Please check the file format and try again.', 'Error');
    }
    
    // Clear file input
    event.target.value = '';
}

// Import progeny character
function importProgenyCharacter() {
    document.getElementById('progenyImportFile').click();
}

// Handle progeny import
async function handleProgenyImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        const text = await file.text();
        const progenyData = JSON.parse(text);
        
        // Convert progeny data to ledger format
        const ledgerData = convertProgenyToLedger(progenyData);
        
        // Generate a new ID for the imported character
        const newId = Date.now();
        ledgerData.id = newId;
        ledgerData.createdAt = new Date().toISOString();
        ledgerData.updatedAt = new Date().toISOString();
        
        // Save the character
        await databaseManager.saveCharacter(ledgerData, newId);
        
        // Reload dashboard
        await loadCharacters();
        updateDashboard();
        
        toastManager.success(`Successfully imported Progeny character: ${ledgerData.name || 'Unnamed Character'}`, 'Imported');
        
    } catch (error) {
        console.error('Failed to import Progeny character:', error);
        toastManager.error('Failed to import Progeny character. Please check the file format and try again.', 'Error');
    }
    
    // Clear file input
    event.target.value = '';
}

// Convert Progeny data to Ledger format (copied from control-bar.js)
function convertProgenyToLedger(src) {
    const dst = {};
    // Helpers
    const toSnake = (str="")=> str.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"");
    const toCamel = (str="")=>{
        const parts = str.toLowerCase().replace(/[^a-z0-9]+/g," ").trim().split(/\s+/);
        return parts[0] + parts.slice(1).map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join("");
    };

    // Identity
    if(src.name) dst.name = src.name;
    if(src.sire) dst.sire = src.sire;
    if(src.clan) dst.clan = toSnake(src.clan);
    if(Object.prototype.hasOwnProperty.call(src,"generation")) dst.generation = src.generation;
    if(src.ambition) dst.ambition = src.ambition;
    if(src.desire) dst.desire = src.desire;
    if(src.predatorType && src.predatorType.name) dst.predator = toCamel(src.predatorType.name);

    // Attributes
    if(src.attributes && typeof src.attributes==='object'){
        Object.entries(src.attributes).forEach(([k,v])=> dst[k.toLowerCase()] = v);
    }

    // Skills
    if(src.skills && typeof src.skills==='object'){
        Object.entries(src.skills).forEach(([k,v])=> dst[k.toLowerCase()] = v);
    }

    // Specialties
    const specialtiesMap = {};
    const addSpec = (skill,name)=>{
        if(!skill || !name) return;
        const key = skill.toLowerCase();
        if(!specialtiesMap[key]) specialtiesMap[key] = new Set();
        specialtiesMap[key].add(name);
    };
    (Array.isArray(src.skillSpecialties)?src.skillSpecialties:[]).forEach(sp=>addSpec(sp.skill,sp.name));
    if(src.predatorType && Array.isArray(src.predatorType.pickedSpecialties)){
        src.predatorType.pickedSpecialties.forEach(sp=>addSpec(sp.skill,sp.name));
    }
    Object.entries(specialtiesMap).forEach(([k,set])=>{ if(set.size) dst[`${k.replace(/\s+/g,'_')}_specialties`] = Array.from(set); });

    // Disciplines
    const discMap = {};
    const ensureDisc = (k)=>{ if(k && !discMap[k]) discMap[k] = {level:0,powers:[]}; };
    if(Array.isArray(src.disciplines)){
        src.disciplines.forEach(p=>{
            const dKey = disciplineNameToKey(p.discipline||"");
            ensureDisc(dKey);
            if(discMap[dKey]){
                if(p.level > discMap[dKey].level) discMap[dKey].level = p.level;
                discMap[dKey].powers.push(p.name);
            }
        });
    }
    if(src.predatorType && src.predatorType.pickedDiscipline){
        const dKey = disciplineNameToKey(src.predatorType.pickedDiscipline);
        ensureDisc(dKey);
        if(discMap[dKey] && discMap[dKey].level < 1) discMap[dKey].level = 1;
    }
    if(Object.keys(discMap).length) dst.disciplines = discMap;

    // Merits & Backgrounds
    const meritsObj={}, flawsObj={}, backgroundsObj={}, backgroundFlawsObj={};
    const addTrait = (col,key,lvl)=>{ if(!col[key]) col[key]={level:lvl, instances:[{level:lvl}]}; };
    const allTraits=[];
    if(Array.isArray(src.merits)) allTraits.push(...src.merits);
    if(Array.isArray(src.flaws)) allTraits.push(...src.flaws);
    if(src.predatorType && Array.isArray(src.predatorType.pickedMeritsAndFlaws)) allTraits.push(...src.predatorType.pickedMeritsAndFlaws);
    allTraits.forEach(t=>{
        if(!t||!t.name) return;
        const keySnake = toSnake(t.name);
        const keyCamel = toCamel(t.name);
        const lvl = t.level||1;
        if(t.type==='flaw'){
            addTrait(flawsObj,keyCamel,lvl);
            addTrait(backgroundFlawsObj,keySnake,lvl);
        }else{
            addTrait(meritsObj,keyCamel,lvl);
            addTrait(backgroundsObj,keySnake,lvl);
        }
    });
    if(Object.keys(meritsObj).length) dst.merits = meritsObj;
    if(Object.keys(flawsObj).length) dst.flaws = flawsObj;
    if(Object.keys(backgroundsObj).length) dst.backgrounds = backgroundsObj;
    if(Object.keys(backgroundFlawsObj).length) dst.backgroundFlaws = backgroundFlawsObj;

    // Track objects
    const staminaVal = src.attributes?.stamina || 0;
    const resolveVal = src.attributes?.resolve || 0;
    const composureVal = src.attributes?.composure || 0;

    const healthMax = staminaVal + 3;
    dst.health = {max: healthMax, current: healthMax, superficial: 0, aggravated: 0, type: 'health'};

    const wpMax = resolveVal + composureVal;
    dst.willpower = {max: wpMax, current: wpMax, superficial: 0, aggravated: 0, type: 'willpower'};

    const humanityCurrent = (src.humanity && src.humanity>0)? src.humanity : 7;
    dst.humanity = {max: 10, current: humanityCurrent, superficial: 0, aggravated: 0, type: 'humanity'};

    // Misc track scores
    if(Object.prototype.hasOwnProperty.call(src,'bloodPotency')) dst.blood_potency = src.bloodPotency;
    if(Object.prototype.hasOwnProperty.call(src,'humanity')) dst.humanity_score = src.humanity;
    if(Object.prototype.hasOwnProperty.call(src,'willpower')) dst.willpower_score = src.willpower;

    return dst;
}

// Helper function for discipline name to key conversion
function disciplineNameToKey(name) {
    const disciplineMap = {
        'animalism': 'animalism',
        'auspex': 'auspex',
        'blood sorcery': 'blood_sorcery',
        'celerity': 'celerity',
        'dominate': 'dominate',
        'fortitude': 'fortitude',
        'obfuscate': 'obfuscate',
        'oblivion': 'oblivion',
        'potence': 'potence',
        'presence': 'presence',
        'protean': 'protean',
        'thin-blood alchemy': 'thin_blood_alchemy'
    };
    
    const normalizedName = name.toLowerCase().trim();
    return disciplineMap[normalizedName] || normalizedName.replace(/\s+/g, '_');
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
window.importCharacter = importCharacter;
window.handleCharacterImport = handleCharacterImport;
window.importProgenyCharacter = importProgenyCharacter;
window.handleProgenyImport = handleProgenyImport;
window.deleteCharacter = deleteCharacter; 