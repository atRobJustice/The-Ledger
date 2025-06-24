/*
 * character-toolbar.js
 * Traditional toolbar-style navigation for character sheet
 */

import { getDiscordWebhook, setDiscordWebhook, createWebhookModal } from "./discord-integration.js";
import { TraitManagerUtils } from './manager-utils.js';

/**
 * Initialize the character sheet toolbar
 */
export function initCharacterToolbar() {
    // Load and apply saved theme first
    loadSavedTheme();
    
    // Initialize all toolbar buttons
    initSaveButton();
    initExportButton();
    initImportButton();
    initRollButton();
    initRouseButton();
    initRemorseButton();
    initFrenzyButton();
    initMendButton();
    initWPRerollButton();
    initWipeButton();
    initClearButton();
    initLockButton();
    initThemeButton();
    initDiscordButton();
    initInfoModeButton();
    initHelpButton();
    
    // Initialize tooltips
    initTooltips();
}

/**
 * Load and apply saved theme
 */
async function loadSavedTheme() {
    try {
        console.log('Starting theme loading on character sheet...');
        
        // Wait for database manager to be available
        let attempts = 0;
        while (!window.databaseManager && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
        }
        
        if (window.databaseManager) {
            console.log('Database manager found, loading theme...');
            const savedTheme = await window.databaseManager.getSetting('theme') || await window.databaseManager.getSetting('defaultTheme') || 'wod-dark';
            console.log('Retrieved theme from database:', savedTheme);
            
            if (savedTheme && savedTheme !== 'wod-dark') {
                document.body.setAttribute('data-theme', savedTheme);
                console.log('Applied saved theme to character sheet:', savedTheme);
            } else {
                document.body.setAttribute('data-theme', 'wod-dark');
                console.log('Using default World of Darkness dark theme on character sheet');
            }
            
            // Double-check that the theme was actually applied
            setTimeout(() => {
                const currentTheme = document.body.getAttribute('data-theme');
                console.log('Theme verification - current data-theme attribute:', currentTheme);
            }, 100);
            
        } else {
            console.warn('Database manager not available for theme loading after 5 seconds');
        }
    } catch (error) {
        console.error('Failed to load saved theme on character sheet:', error);
    }
}

/**
 * Initialize Save button
 */
function initSaveButton() {
    const btn = document.getElementById('btn-save');
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        try {
            if (window.characterManager && window.gatherCharacterData) {
                const characterData = window.gatherCharacterData();
                await window.characterManager.saveCurrentCharacter(characterData);
                if (window.toastManager) {
                    window.toastManager.show('Character saved successfully!', 'success', 'Character Toolbar');
                }
            }
        } catch (error) {
            console.error('Failed to save character:', error);
            if (window.toastManager) {
                window.toastManager.show('Failed to save character', 'error', 'Character Toolbar');
            }
        }
    });
}

/**
 * Initialize Export button
 */
function initExportButton() {
    const btn = document.getElementById('btn-export');
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        try {
            if (window.gatherCharacterData) {
                const character = window.gatherCharacterData();
                if (character) {
                    const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${character.name || 'character'}-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    if (window.toastManager) {
                        window.toastManager.show('Character exported successfully!', 'success', 'Character Toolbar');
                    }
                }
            }
        } catch (error) {
            console.error('Failed to export character:', error);
            if (window.toastManager) {
                window.toastManager.show('Failed to export character', 'error', 'Character Toolbar');
            }
        }
    });
}

/**
 * Initialize Import button
 */
function initImportButton() {
    const btn = document.getElementById('btn-import');
    if (!btn) return;
    
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    btn.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const character = JSON.parse(text);
            
            if (window.loadCharacterData) {
                window.loadCharacterData(character);
                if (window.toastManager) {
                    window.toastManager.show('Character imported successfully!', 'success', 'Character Toolbar');
                }
            }
        } catch (error) {
            console.error('Failed to import character:', error);
            if (window.toastManager) {
                window.toastManager.show('Failed to import character', 'error', 'Character Toolbar');
            }
        }
        
        // Clear file input
        fileInput.value = '';
    });
}

/**
 * Initialize Roll button
 */
function initRollButton() {
    const btn = document.getElementById('btn-roll');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger dice overlay
        if (window.diceOverlay) {
            window.diceOverlay.show();
        }
    });
}

/**
 * Initialize Rouse button
 */
function initRouseButton() {
    const btn = document.getElementById('btn-rouse');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger rouse check
        if (window.quickRoll) {
            window.quickRoll({ standard: 0, hunger: 0, rouse: 1, remorse: 0, frenzy: 0 });
        }
    });
}

/**
 * Initialize Remorse button
 */
function initRemorseButton() {
    const btn = document.getElementById('btn-remorse');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger remorse check
        if (window.computeRemorseDice && window.quickRoll) {
            const dice = window.computeRemorseDice();
            window.quickRoll({ standard: 0, hunger: 0, rouse: 0, remorse: dice, frenzy: 0 });
        }
    });
}

/**
 * Initialize Frenzy button
 */
function initFrenzyButton() {
    const btn = document.getElementById('btn-frenzy');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger frenzy check
        if (window.computeFrenzyDice && window.quickRoll) {
            const dice = window.computeFrenzyDice();
            window.quickRoll({ standard: 0, hunger: 0, rouse: 0, remorse: 0, frenzy: dice });
        }
    });
}

/**
 * Initialize Mend button
 */
function initMendButton() {
    const btn = document.getElementById('btn-mend');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger mend functionality
        if (window.mendHealth) {
            window.mendHealth();
        }
    });
}

/**
 * Initialize Willpower Reroll button
 */
function initWPRerollButton() {
    const btn = document.getElementById('btn-wp-reroll');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger willpower reroll
        if (window.handleWPRerollClick) {
            window.handleWPRerollClick();
        }
    });
    
    // Update button state based on willpower reroll availability
    function updateWPRerollButton() {
        if (window.isWPRerollAllowed) {
            const allowed = window.isWPRerollAllowed();
            btn.disabled = !allowed;
            btn.classList.toggle('btn-outline-info', allowed);
            btn.classList.toggle('btn-outline-secondary', !allowed);
        }
    }
    
    // Update button state periodically
    setInterval(updateWPRerollButton, 1000);
    updateWPRerollButton();
}

/**
 * Initialize Wipe button
 */
function initWipeButton() {
    const btn = document.getElementById('btn-wipe');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Trigger wipe functionality
        if (window.clearOverlay) {
            window.clearOverlay();
            if (window.toastManager) {
                window.toastManager.show('Overlay cleared', 'info', 'Character Toolbar');
            }
        }
    });
}

/**
 * Initialize Clear button
 */
function initClearButton() {
    const btn = document.getElementById('btn-clear');
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        // Show confirmation dialog
        if (confirm('Are you sure you want to clear the character sheet? This action cannot be undone.')) {
            try {
                if (window.characterManager) {
                    await window.characterManager.clearCurrentSheet();
                    if (window.toastManager) {
                        window.toastManager.show('Character sheet cleared', 'success', 'Character Toolbar');
                    }
                } else if (window.performClearSheet) {
                    window.performClearSheet();
                    if (window.toastManager) {
                        window.toastManager.show('Character sheet cleared', 'success', 'Character Toolbar');
                    }
                } else {
                    if (window.toastManager) {
                        window.toastManager.show('Clear sheet functionality not available', 'error', 'Character Toolbar');
                    }
                }
            } catch (error) {
                console.error('Failed to clear character sheet:', error);
                if (window.toastManager) {
                    window.toastManager.show('Failed to clear character sheet', 'error', 'Character Toolbar');
                }
            }
        }
    });
}

/**
 * Initialize Lock button
 */
function initLockButton() {
    const btn = document.getElementById('btn-lock');
    if (!btn) return;
    
    function updateLockButton() {
        if (window.LockManager.isLocked()) {
            btn.innerHTML = '<i class="bi bi-unlock"></i>';
            btn.title = 'Unlock Character';
        } else {
            btn.innerHTML = '<i class="bi bi-lock"></i>';
            btn.title = 'Lock Character';
        }
    }
    
    btn.addEventListener('click', () => {
        if (window.LockManager.isLocked()) {
            // Unlock flow with detailed modal
            const unlockContent = `
                <p>Unlocking will allow manual edits to Traits and other sheet fields.</p>
                <p>Are you sure you want to unlock?</p>
            `;
            
            const unlockFooter = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success" id="confirmUnlockBtn">Unlock Character</button>
            `;
            
            const { modalElement, modalInstance } = window.modalManager.showCustom({
                title: 'Unlock Character for Editing',
                content: unlockContent,
                footer: unlockFooter,
                size: 'default',
                centered: true
            }, (element, instance) => {
                // Add click handler for confirm button
                const confirmBtn = element.querySelector('#confirmUnlockBtn');
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', () => {
                        window.LockManager.unlock();
                        updateLockButton();
                        instance.hide();
                    });
                }
            });
        } else {
            // Lock flow with detailed modal
            const lockContent = `
                <p>Locking the character will disable manual editing of Attributes, Skills, Disciplines, Merits, and other core stats. XP spending will still apply automatically.</p>
                <p>Are you sure you want to continue?</p>
            `;
            
            const lockFooter = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirmLockBtn">Lock Character</button>
            `;
            
            const { modalElement, modalInstance } = window.modalManager.showCustom({
                title: 'Lock Character for Play',
                content: lockContent,
                footer: lockFooter,
                size: 'default',
                centered: true
            }, (element, instance) => {
                // Add click handler for confirm button
                const confirmBtn = element.querySelector('#confirmLockBtn');
                if (confirmBtn) {
                    confirmBtn.addEventListener('click', () => {
                        window.LockManager.lock();
                        updateLockButton();
                        instance.hide();
                    });
                }
            });
        }
    });
    
    // Update button state
    updateLockButton();
    
    // Listen for lock state changes
    document.addEventListener('ledger-lock-change', updateLockButton);
}

/**
 * Initialize Theme button
 */
function initThemeButton() {
    const btn = document.getElementById('btn-theme');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        showThemeModal();
    });
}

/**
 * Show theme selection modal
 */
function showThemeModal() {
    const currentTheme = document.body.getAttribute('data-theme') || 'default';
    
    const content = `
        <div class="vstack gap-2">
            <h6 class="mt-2">Default Palettes</h6>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="schemeRadios" id="schemeKindredDark" value="kindred-dark" ${currentTheme === 'kindred-dark' ? 'checked' : ''}>
                <label class="form-check-label" for="schemeKindredDark">Blood & Roses (Dark)</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="schemeRadios" id="schemeKindredLight" value="kindred-light" ${currentTheme === 'kindred-light' ? 'checked' : ''}>
                <label class="form-check-label" for="schemeKindredLight">Ivory Tower (Light)</label>
            </div>

            <h6 class="mt-2">World of Darkness</h6>
            <div class="wod-options">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeWodDark" value="wod-dark" ${currentTheme === 'wod-dark' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeWodDark">Shadow Realm (Dark)</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeWodLight" value="wod-light" ${currentTheme === 'wod-light' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeWodLight">Veil of Light (Light)</label>
                </div>
            </div>

            <h6 class="mt-2">Accessibility Palettes</h6>
            <div class="access-options">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeHCDark" value="hc-dark" ${currentTheme === 'hc-dark' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeHCDark">High Contrast – Dark</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeHCLight" value="hc-light" ${currentTheme === 'hc-light' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeHCLight">High Contrast – Light</label>
                </div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeDyslexia" value="dyslexia" ${currentTheme === 'dyslexia' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeDyslexia">Dyslexia-Friendly</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeDaltonic" value="daltonic" ${currentTheme === 'daltonic' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeDaltonic">Daltonic (Blue/Orange)</label>
                </div>
            </div>

            <h6 class="mt-2">Hunter: The Reckoning 5th Edition</h6>
            <div class="hunter-options">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeHunterDark" value="hunter-dark" ${currentTheme === 'hunter-dark' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeHunterDark">Night Watch (Dark)</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="schemeRadios" id="schemeHunterLight" value="hunter-light" ${currentTheme === 'hunter-light' ? 'checked' : ''}>
                    <label class="form-check-label" for="schemeHunterLight">Dawn Patrol (Light)</label>
                </div>
            </div>

            <h6 class="mt-2">Clan Palettes</h6>
            <div class="clan-options">
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeBanu" value="banu" ${currentTheme === 'banu' ? 'checked' : ''}><label class="form-check-label" for="schemeBanu">Banu Haqim</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeBrujah" value="brujah" ${currentTheme === 'brujah' ? 'checked' : ''}><label class="form-check-label" for="schemeBrujah">Brujah</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeGangrel" value="gangrel" ${currentTheme === 'gangrel' ? 'checked' : ''}><label class="form-check-label" for="schemeGangrel">Gangrel</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeHecata" value="hecata" ${currentTheme === 'hecata' ? 'checked' : ''}><label class="form-check-label" for="schemeHecata">Hecata</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeLasombra" value="lasombra" ${currentTheme === 'lasombra' ? 'checked' : ''}><label class="form-check-label" for="schemeLasombra">Lasombra</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeMalkavian" value="malkavian" ${currentTheme === 'malkavian' ? 'checked' : ''}><label class="form-check-label" for="schemeMalkavian">Malkavian</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeMinistry" value="ministry" ${currentTheme === 'ministry' ? 'checked' : ''}><label class="form-check-label" for="schemeMinistry">The Ministry</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeNosferatu" value="nosferatu" ${currentTheme === 'nosferatu' ? 'checked' : ''}><label class="form-check-label" for="schemeNosferatu">Nosferatu</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeRavnos" value="ravnos" ${currentTheme === 'ravnos' ? 'checked' : ''}><label class="form-check-label" for="schemeRavnos">Ravnos</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeSalubri" value="salubri" ${currentTheme === 'salubri' ? 'checked' : ''}><label class="form-check-label" for="schemeSalubri">Salubri</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeToreador" value="toreador" ${currentTheme === 'toreador' ? 'checked' : ''}><label class="form-check-label" for="schemeToreador">Toreador</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeTremere" value="tremere" ${currentTheme === 'tremere' ? 'checked' : ''}><label class="form-check-label" for="schemeTremere">Tremere</label></div>
                <div class="form-check mb-1"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeTzimisce" value="tzimisce" ${currentTheme === 'tzimisce' ? 'checked' : ''}><label class="form-check-label" for="schemeTzimisce">Tzimisce</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeVentrue" value="ventrue" ${currentTheme === 'ventrue' ? 'checked' : ''}><label class="form-check-label" for="schemeVentrue">Ventrue</label></div>
            </div>
        </div>
    `;

    const footer = `
        <button type="button" class="btn btn-primary" id="saveThemeChoice">Apply</button>
    `;

    window.modalManager.showCustom({
        title: 'Color Scheme',
        content,
        footer,
        size: 'default',
        centered: true
    }, (element, instance) => {
        // Set up event handler
        element.querySelector('#saveThemeChoice').addEventListener('click', () => {
            const selected = element.querySelector('input[name="schemeRadios"]:checked');
            if (selected) {
                applyTheme(selected.value);
                instance.hide();
            }
        });
    });
}

/**
 * Apply theme and save to database
 */
async function applyTheme(themeKey) {
    console.log('Applying theme from character toolbar:', themeKey);
    
    if (themeKey === "wod-dark") {
        document.body.setAttribute("data-theme", "wod-dark");
    } else {
        document.body.setAttribute("data-theme", themeKey);
    }
    
    // Save to database using the 'theme' key (same as the existing theme system)
    if (window.databaseManager) {
        try {
            await window.databaseManager.setSetting('theme', themeKey);
            console.log('Theme saved to database:', themeKey);
        } catch (err) {
            console.error('Failed to save theme to database:', err);
        }
    } else {
        console.error('No database manager available for theme storage');
    }
}

/**
 * Initialize Discord button
 */
function initDiscordButton() {
    const btn = document.getElementById('btn-discord');
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        // Show Discord webhook modal using modalManager
        const webhook = await getDiscordWebhook();
        
        const content = `
            <div class="mb-3">
                <label for="discordWebhookInput" class="form-label">Webhook URL</label>
                <input type="url" class="form-control" id="discordWebhookInput" placeholder="https://discord.com/api/webhooks/..." value="${webhook || ''}">
            </div>
        `;

        const footer = `
            <button type="button" class="btn btn-danger" id="deleteDiscordWebhook">Delete</button>
            <button type="button" class="btn btn-primary" id="saveDiscordWebhook">Save</button>
        `;

        window.modalManager.showCustom({
            title: 'Discord Webhook',
            content,
            footer,
            size: 'default',
            centered: true
        }, (element, instance) => {
        // Handle save
            element.querySelector("#saveDiscordWebhook").addEventListener("click", async () => {
                const url = element.querySelector("#discordWebhookInput").value.trim();
                await setDiscordWebhook(url);
                instance.hide();
            if (window.toastManager) {
                window.toastManager.show('Discord webhook saved!', 'success', 'Character Toolbar');
            }
        });
        
        // Handle delete
            element.querySelector("#deleteDiscordWebhook").addEventListener("click", async () => {
                await setDiscordWebhook(null);
                instance.hide();
            if (window.toastManager) {
                window.toastManager.show('Discord webhook removed!', 'success', 'Character Toolbar');
            }
        });
        });
    });
}

/**
 * Initialize Info Mode button
 */
function initInfoModeButton() {
    const btn = document.getElementById('btn-info-mode');
    if (!btn) return;
    
    let infoModeEnabled = false;
    
    btn.addEventListener('click', () => {
        infoModeEnabled = !infoModeEnabled;
        
        if (infoModeEnabled) {
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('btn-secondary');
            document.body.classList.add('info-mode');
            if (window.setTooltipEnabled) {
                window.setTooltipEnabled(true);
            }
        } else {
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-outline-secondary');
            document.body.classList.remove('info-mode');
            if (window.disableAllTooltips) {
                window.disableAllTooltips();
            }
        }
    });
}

/**
 * Initialize Help button
 */
function initHelpButton() {
    const btn = document.getElementById('btn-help');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        // Show Dice Symbols modal
        if (window.showDiceSymbolsModal) {
            window.showDiceSymbolsModal();
        }
    });
}

/**
 * Initialize tooltips for all toolbar buttons
 */
function initTooltips() {
    if (window.bootstrap && bootstrap.Tooltip) {
        const buttons = document.querySelectorAll('.character-toolbar [title]');
        buttons.forEach(button => {
            bootstrap.Tooltip.getOrCreateInstance(button);
        });
    }
}

// Initialize the toolbar when the module is loaded
initCharacterToolbar();

// Also ensure theme is loaded after page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit more for all other scripts to initialize
    setTimeout(() => {
        loadSavedTheme();
    }, 1000);
});

// Add a mutation observer to detect if theme is being overridden
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            const currentTheme = document.body.getAttribute('data-theme');
            console.log('Theme attribute changed to:', currentTheme);
        }
    });
});

// Start observing the body element for theme changes
if (document.body) {
    themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
} else {
    // If body isn't available yet, wait for it
    document.addEventListener('DOMContentLoaded', () => {
        themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    });
} 