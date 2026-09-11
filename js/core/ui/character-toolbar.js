import { getDiscordWebhook, setDiscordWebhook, createWebhookModal } from "../../integrations/discord-integration.js";
import { TraitManagerUtils } from '../managers/manager-utils.js';
import { bloodPotency as bpData } from "../../data/vampire/blood_potency.js";
import { humanity } from "../../data/vampire/humanity.js";
import logger from '../utils/logger.js';
import { toLedgerCharacter } from '../utils/character-format.js';

/**
 * Initialize the character sheet toolbar
 */
export function initCharacterToolbar() {
    // Load and apply saved theme first
    loadSavedTheme();
    
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
    initXPSpendButton();
    initDashboardButton();
    
    initTooltips();
}

/**
 * Load and apply saved theme
 */
async function loadSavedTheme() {
    try {
        logger.info('Starting theme loading on character sheet...');
        
        // Wait for database manager to be available
        let attempts = 0;
        while (!window.databaseManager && attempts < 100) {
            await new Promise(resolve => setTimeout(resolve, 50));
            attempts++;
        }
        
        if (window.databaseManager) {
            logger.info('Database manager found, loading theme...');
            const savedTheme = await window.databaseManager.getSetting('theme') || await window.databaseManager.getSetting('defaultTheme') || 'wod-dark';
            logger.info('Retrieved theme from database:', savedTheme);
            
            if (savedTheme && savedTheme !== 'wod-dark') {
                document.body.setAttribute('data-theme', savedTheme);
                logger.info('Applied saved theme to character sheet:', savedTheme);
            } else {
                document.body.setAttribute('data-theme', 'wod-dark');
                logger.info('Using default World of Darkness dark theme on character sheet');
            }
            
            // Double-check that the theme was actually applied
            setTimeout(() => {
                const currentTheme = document.body.getAttribute('data-theme');
                logger.info('Theme verification - current data-theme attribute:', currentTheme);
            }, 100);
            
        } else {
            logger.warn('Database manager not available for theme loading after 5 seconds');
        }
    } catch (error) {
        logger.error('Failed to load saved theme on character sheet:', error);
    }
}

/**
 * Initialize Save button
 */
function initSaveButton() {
    const btn = document.getElementById('btn-save');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showSaveInfo();
            return;
        }
        performSave();
    });
}

async function performSave() {
    try {
        if (window.characterManager && window.gatherCharacterData) {
            const characterData = window.gatherCharacterData();
            await window.characterManager.saveCurrentCharacter(characterData);
            if (window.toastManager) {
                window.toastManager.show('Character saved successfully!', 'success', 'Character Toolbar');
            }
        }
    } catch (error) {
        logger.error('Failed to save character:', error);
        if (window.toastManager) {
            window.toastManager.show('Failed to save character', 'error', 'Character Toolbar');
        }
    }
}

/**
 * Initialize Export button
 */
function initExportButton() {
    const btn = document.getElementById('btn-export');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showExportInfo();
            return;
        }
        performExport();
    });
}

async function performExport() {
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
        logger.error('Failed to export character:', error);
        if (window.toastManager) {
            window.toastManager.show('Failed to export character', 'error', 'Character Toolbar');
        }
    }
}

/**
 * Initialize Import button
 */
function initImportButton() {
    const btn = document.getElementById('btn-import');
    if (!btn) return;
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';
    fileInput.className = 'hidden-file-input';
    document.body.appendChild(fileInput);
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showImportInfo(() => fileInput.click());
            return;
        }
        fileInput.click();
    });
    
    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            const text = await file.text();
            const character = toLedgerCharacter(JSON.parse(text));
            
            if (window.loadCharacterData) {
                window.loadCharacterData(character);
                if (window.toastManager) {
                    window.toastManager.show('Character imported successfully!', 'success', 'Character Toolbar');
                }
            }
        } catch (error) {
            logger.error('Failed to import character:', error);
            if (window.toastManager) {
                window.toastManager.show(
                    error?.message || 'Failed to import character',
                    'error',
                    'Character Toolbar'
                );
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
        if (isInfoModeActive()) {
            showRollInfo();
            return;
        }
        performOpenRoll();
    });
}

function performOpenRoll() {
    if (window.diceOverlay) {
        window.diceOverlay.show();
    }
}

function isInfoModeActive() {
    if (typeof window.isInfoMode === 'function') {
        return window.isInfoMode();
    }
    return document.body.classList.contains('info-mode');
}

function findStatValue(labelText) {
    const row = Array.from(document.querySelectorAll('.stat')).find((statRow) => {
        const lbl = statRow.querySelector('.stat-label');
        return lbl && lbl.textContent.trim().toLowerCase() === labelText.toLowerCase();
    });
    if (!row) return 0;
    const dots = row.querySelector('.dots');
    if (!dots) return 0;
    const val = parseInt(dots.dataset.value, 10);
    if (!Number.isNaN(val)) return val;
    return dots.querySelectorAll('.dot.filled').length;
}

function getHealthSuperficial() {
    const container = document.querySelector('.track-container[data-type="health"]');
    if (!container) return 0;
    return container.querySelectorAll('.track-box.superficial').length;
}

function showToolbarInfoModal(title, content, onAction, options = {}) {
    if (!window.modalManager) return;

    const actionLabel = options.actionLabel || 'Continue';
    const actionClass = options.actionClass || 'theme-btn-primary';

    const footer = onAction
        ? `<button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="button" class="btn ${actionClass}" id="toolbarInfoActionBtn">${actionLabel}</button>`
        : `<button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Close</button>`;

    window.modalManager.showCustom({
        title,
        content,
        footer,
        size: 'default',
        centered: true,
        scrollable: true
    }, (element, instance) => {
        const actionBtn = element.querySelector('#toolbarInfoActionBtn');
        if (actionBtn && onAction) {
            actionBtn.addEventListener('click', () => {
                instance.hide();
                onAction();
            });
        }
    });
}

function showCheckInfoModal(title, content, onRoll) {
    showToolbarInfoModal(title, content, onRoll, { actionLabel: 'Roll' });
}

function performRouseCheck() {
    if (window.quickRoll) {
        window.quickRoll({ standard: 0, hunger: 0, rouse: 1, remorse: 0, frenzy: 0 });
    }
}

function performRemorseCheck() {
    if (window.computeRemorseDice && window.quickRoll) {
        const dice = window.computeRemorseDice();
        window.quickRoll({ standard: 0, hunger: 0, rouse: 0, remorse: dice, frenzy: 0 });
    }
}

function performFrenzyCheck() {
    if (window.computeFrenzyDice && window.quickRoll) {
        const dice = window.computeFrenzyDice();
        window.quickRoll({ standard: 0, hunger: 0, rouse: 0, remorse: 0, frenzy: dice });
    }
}

function performMend() {
    if (window.mendHealth) {
        window.mendHealth();
    }
}

function showRouseInfo() {
    const hunger = findStatValue('Hunger');
    const content = `
        <p>A Rouse Check stirs the Blood. Roll <strong>1 die</strong>.</p>
        <ul>
            <li><strong>6-10:</strong> success. Hunger stays the same.</li>
            <li><strong>1-5:</strong> failure. Hunger increases by 1.</li>
        </ul>
        <hr>
        <h6>This character</h6>
        <p class="mb-1">Current Hunger: <strong>${hunger} / 5</strong></p>
        <p class="mb-0">You will roll <strong>1 Rouse die</strong>.</p>
    `;
    showCheckInfoModal('Rouse Check', content, performRouseCheck);
}

function showRemorseInfo() {
    const breakdown = typeof window.getRemorseBreakdown === 'function'
        ? window.getRemorseBreakdown()
        : { humanity: 0, stains: 0, totalBoxes: 10, emptySpaces: 0, dice: window.computeRemorseDice?.() || 1, usedMinimum: true };

    const rules = humanity?.track?.remorse?.description
        || 'When Stains remain at the end of a session, roll a Remorse test. The pool is the empty spaces between Humanity and Stains (minimum 1 die). Any success keeps Humanity; failure drops Humanity by 1. Then all Stains are cleared.';

    const emptyLine = breakdown.usedMinimum
        ? `Empty spaces: <strong>0</strong> (the pool cannot drop below 1)`
        : `Empty spaces: ${breakdown.totalBoxes} - ${breakdown.humanity} Humanity - ${breakdown.stains} Stains = <strong>${breakdown.emptySpaces}</strong>`;

    const content = `
        <p>${rules}</p>
        <hr>
        <h6>This character</h6>
        <p class="mb-1">Humanity: <strong>${breakdown.humanity}</strong></p>
        <p class="mb-1">Stains: <strong>${breakdown.stains}</strong></p>
        <p class="mb-1">${emptyLine}</p>
        <p class="mb-0">You will roll <strong>${breakdown.dice} Remorse ${breakdown.dice === 1 ? 'die' : 'dice'}</strong>.</p>
        ${breakdown.stains === 0 ? '<p class="small mt-2 mb-0">No Stains are marked. Remorse is normally tested only when Stains remain at the end of the session.</p>' : ''}
        <hr>
        <h6>Outcome</h6>
        <ul class="mb-0">
            <li>Any success (6+): keep current Humanity</li>
            <li>No successes: Humanity drops by 1</li>
            <li>All Stains are then cleared</li>
        </ul>
    `;
    showCheckInfoModal('Remorse Check', content, performRemorseCheck);
}

function showFrenzyInfo() {
    const breakdown = typeof window.getFrenzyBreakdown === 'function'
        ? window.getFrenzyBreakdown()
        : { willpower: 0, humanity: 0, humanityBonus: 0, dice: window.computeFrenzyDice?.() || 1, usedMinimum: false };

    const sumLine = breakdown.usedMinimum
        ? `${breakdown.willpower} + ${breakdown.humanityBonus} = 0, raised to the minimum of 1`
        : `${breakdown.willpower} Willpower + ${breakdown.humanityBonus} = <strong>${breakdown.dice}</strong>`;

    const content = `
        <p>To resist frenzy, roll current (undamaged) Willpower plus one-third of Humanity, rounded down. The Storyteller sets Difficulty from the trigger: Hunger, Fury, or Terror.</p>
        <hr>
        <h6>This character</h6>
        <p class="mb-1">Willpower (undamaged boxes): <strong>${breakdown.willpower}</strong></p>
        <p class="mb-1">Humanity: <strong>${breakdown.humanity}</strong></p>
        <p class="mb-1">Humanity bonus: floor(${breakdown.humanity} / 3) = <strong>${breakdown.humanityBonus}</strong></p>
        <p class="mb-1">${sumLine}</p>
        <p class="mb-0">You will roll <strong>${breakdown.dice} Frenzy ${breakdown.dice === 1 ? 'die' : 'dice'}</strong>.</p>
        <hr>
        <h6>Outcome</h6>
        <ul class="mb-0">
            <li>Meet or beat the Storyteller's Difficulty to keep control</li>
            <li>Failure: the Beast takes over for that Hunger, Fury, or Terror frenzy</li>
        </ul>
        <p class="small mt-2 mb-0">Clan bane modifiers (such as Brujah Fury Frenzy) are not applied automatically.</p>
    `;
    showCheckInfoModal('Frenzy Check', content, performFrenzyCheck);
}

function showMendInfo() {
    const bpVal = findStatValue('Blood Potency');
    const healAmt = (typeof bpData?.getHealingAmount === 'function') ? (bpData.getHealingAmount(bpVal) || 1) : 1;
    const superficial = getHealthSuperficial();
    const wouldHeal = Math.min(healAmt, superficial);

    const content = `
        <p>Mending removes Superficial Health damage equal to your Blood Potency chart, then requires a Rouse Check.</p>
        <hr>
        <h6>This character</h6>
        <p class="mb-1">Blood Potency: <strong>${bpVal}</strong></p>
        <p class="mb-1">Mend amount: <strong>${healAmt}</strong> Superficial</p>
        <p class="mb-1">Current Superficial damage: <strong>${superficial}</strong></p>
        <p class="mb-0">This Mend would heal <strong>${wouldHeal}</strong> Superficial, then roll 1 Rouse die.</p>
    `;
    showCheckInfoModal('Mend', content, performMend);
}

function showWPRerollInfo() {
    const content = `
        <p>After a roll, you may spend Willpower to reroll up to 3 regular (non-Hunger) dice.</p>
        <ul>
            <li>Take 1 Superficial Willpower damage. If no undamaged boxes remain, convert a Superficial box to Aggravated.</li>
            <li>You cannot reroll Hunger dice, or any roll that used Blood Surge.</li>
            <li>Tracker tests (Rouse, Remorse, Frenzy) cannot be rerolled this way.</li>
        </ul>
        <p class="mb-0">Turn Info Mode off, select up to 3 standard dice from the last roll, then click this button again.</p>
    `;
    showCheckInfoModal('Willpower Reroll', content);
}

function showSaveInfo() {
    const content = `
        <p>Save writes the current sheet into this browser's IndexedDB so it is waiting when you come back.</p>
        <ul>
            <li>The Ledger also persists many edits as you go. This button forces a full save now.</li>
            <li>Nothing is sent to a server. The copy lives in this browser only.</li>
            <li>Use Export if you want a JSON file you can back up or move to another device.</li>
        </ul>
    `;
    showToolbarInfoModal('Save Character', content, performSave, { actionLabel: 'Save' });
}

function showExportInfo() {
    const content = `
        <p>Export downloads the current character as a JSON file.</p>
        <ul>
            <li>Use it for backups, sharing, or moving a character to another browser.</li>
            <li>The file name uses the character name and today's date.</li>
            <li>This does not remove the copy stored in this browser.</li>
        </ul>
    `;
    showToolbarInfoModal('Export Character', content, performExport, { actionLabel: 'Export' });
}

function showImportInfo(chooseFile) {
    const content = `
        <p>Import loads a Ledger JSON file onto this sheet, replacing the current character data.</p>
        <ul>
            <li>Accepts Ledger exports. Progeny files are converted when possible.</li>
            <li>The current sheet is overwritten. Export first if you want a backup.</li>
            <li>Imported data stays in this browser until you save, export, or clear it.</li>
        </ul>
    `;
    showToolbarInfoModal('Import Character', content, chooseFile, { actionLabel: 'Choose File' });
}

function showRollInfo() {
    const content = `
        <p>Opens the dice pool dialog for a custom roll.</p>
        <ul>
            <li>Standard and Hunger dice can be filled from selected traits on the sheet.</li>
            <li>Difficulty is the number of successes the Storyteller asked for, not the number on the die. 6+ still counts as a success.</li>
            <li>Rouse, Remorse, and Frenzy fields are for those tracker tests. They ignore Difficulty.</li>
            <li>Blood Surge, specialties, and impairment notes appear here when they apply.</li>
        </ul>
        <p class="mb-0">Quick checks (Rouse, Remorse, Frenzy, Mend) have their own toolbar buttons.</p>
    `;
    showToolbarInfoModal('Roll Dice', content, performOpenRoll, { actionLabel: 'Open Roller' });
}

function showWipeInfo() {
    const content = `
        <p>Wipe Overlay removes the 3D dice result from the screen so you can see the sheet again.</p>
        <ul>
            <li>Character data is not changed.</li>
            <li>Willpower reroll is no longer available for that roll once the overlay is gone.</li>
        </ul>
    `;
    showToolbarInfoModal('Wipe Overlay', content, performWipe, { actionLabel: 'Wipe Overlay' });
}

function showClearInfo() {
    const content = `
        <p>Clear Sheet wipes every field on this character. This cannot be undone from the sheet.</p>
        <ul>
            <li>Name, traits, tracks, disciplines, and notes are emptied.</li>
            <li>Export first if you might want this character back.</li>
            <li>Other characters stored in this browser are not deleted.</li>
        </ul>
    `;
    showToolbarInfoModal('Clear Sheet', content, executeClearSheet, {
        actionLabel: 'Clear Sheet',
        actionClass: 'theme-btn-danger'
    });
}

function showLockInfo(updateLockButton) {
    const locked = !!(window.LockManager && window.LockManager.isLocked());
    if (locked) {
        const content = `
            <p>The sheet is in play mode. Core traits are frozen so they are not changed by accident during a session.</p>
            <ul>
                <li>Unlocking lets you edit Attributes, Skills, Disciplines, Merits, and similar fields by hand.</li>
                <li>Hunger, Health, Willpower, and Humanity tracks stay usable while locked.</li>
                <li>XP Spend Mode can still raise traits even while locked.</li>
            </ul>
            <p class="mb-0">Current state: <strong>Locked</strong></p>
        `;
        showToolbarInfoModal('Unlock Character', content, () => {
            window.LockManager.unlock();
            if (typeof updateLockButton === 'function') updateLockButton();
        }, { actionLabel: 'Unlock Character' });
        return;
    }

    const content = `
        <p>Lock the sheet for play. Manual editing of core stats is disabled so a session click cannot rewrite the character.</p>
        <ul>
            <li>Attributes, Skills, Disciplines, Merits, Flaws, Backgrounds, and Loresheets stop taking direct edits.</li>
            <li>Hunger, damage tracks, stains, and dice tools stay available.</li>
            <li>XP Spend Mode still applies purchased increases.</li>
        </ul>
        <p class="mb-0">Current state: <strong>Unlocked</strong></p>
    `;
    showToolbarInfoModal('Lock Character', content, () => {
        window.LockManager.lock();
        if (typeof updateLockButton === 'function') updateLockButton();
    }, { actionLabel: 'Lock Character', actionClass: 'theme-btn-danger' });
}

function showXPSpendInfo() {
    const inSpendMode = document.getElementById('btn-xp-spend')?.classList.contains('active');
    const content = `
        <p>XP Spend Mode lets you raise traits on the sheet and see the experience cost before you confirm.</p>
        <ul>
            <li>Click dots or add traits as you normally would. Pending costs appear in the XP overlay.</li>
            <li>Confirm applies every pending change and deducts Available XP.</li>
            <li>Cancel leaves the sheet as it was and spends nothing.</li>
            <li>You cannot confirm a batch that costs more XP than you have.</li>
        </ul>
        <p class="mb-0">Click the dollar button again to leave XP Spend Mode.</p>
    `;
    showToolbarInfoModal('Spend XP Mode', content, () => {
        if (window.XPSpendManager && window.XPSpendManager.toggleXPSpendMode) {
            window.XPSpendManager.toggleXPSpendMode();
        }
    }, { actionLabel: inSpendMode ? 'Exit XP Spend Mode' : 'Enter XP Spend Mode' });
}

function showDashboardInfo() {
    const content = `
        <p>Returns to the dashboard, where you can switch characters, create a new one, or open the guided creator.</p>
        <ul>
            <li>This sheet stays stored in this browser.</li>
            <li>Use Save if you want to force a write before you leave.</li>
        </ul>
    `;
    showToolbarInfoModal('Back to Dashboard', content, goToDashboard, { actionLabel: 'Go to Dashboard' });
}

function goToDashboard() {
    window.location.href = 'index.html';
}

function getDiceSymbolsGuideHtml() {
    return `
        <div class="dice-symbols-guide">
            <p>Each die is a d10. A result of 6 or higher is a success. Two 10s together are a critical worth 4 successes.</p>
            <div class="mb-3">
                <strong>●</strong> - Success (6-9): +1
            </div>
            <div class="mb-3">
                <strong>✪</strong> - 10. A pair of these is a Critical Success (+4). A leftover 10 still counts as +1.
            </div>
            <div class="mb-3">
                <strong style="color: #dc3545;">⚠</strong> - Hunger die showing 1. If the roll has no successes, this is a Bestial Failure.
            </div>
            <div class="mb-3">
                <strong style="color: #dc3545;">✪</strong> - Hunger die showing 10. If the roll also scores a critical, this becomes a Messy Critical.
            </div>
            <p class="small mb-0">Rouse, Remorse, and Frenzy dice only care about success or failure. Hunger symbols do not apply to those checks.</p>
        </div>
    `;
}

/**
 * Initialize Rouse button
 */
function initRouseButton() {
    const btn = document.getElementById('btn-rouse');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showRouseInfo();
            return;
        }
        performRouseCheck();
    });
}

/**
 * Initialize Remorse button
 */
function initRemorseButton() {
    const btn = document.getElementById('btn-remorse');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showRemorseInfo();
            return;
        }
        performRemorseCheck();
    });
}

/**
 * Initialize Frenzy button
 */
function initFrenzyButton() {
    const btn = document.getElementById('btn-frenzy');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showFrenzyInfo();
            return;
        }
        performFrenzyCheck();
    });
}

/**
 * Initialize Mend button
 */
function initMendButton() {
    const btn = document.getElementById('btn-mend');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showMendInfo();
            return;
        }
        performMend();
    });
}

/**
 * Initialize Willpower Reroll button
 */
function initWPRerollButton() {
    const btn = document.getElementById('btn-wp-reroll');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showWPRerollInfo();
            return;
        }
        if (window.handleWPRerollClick) {
            window.handleWPRerollClick();
        }
    });
    
    function updateWPRerollButton() {
        if (window.isWPRerollAllowed) {
            const allowed = window.isWPRerollAllowed();
            btn.disabled = !allowed;
            
            // Remove any theme classes that don't apply to toolbar buttons
            btn.classList.remove('theme-btn-outline-primary', 'theme-btn-outline-secondary');
            
            if (!allowed) {
                btn.classList.add('toolbar-btn-disabled');
            } else {
                btn.classList.remove('toolbar-btn-disabled');
            }
        }
    }
    
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
        if (isInfoModeActive()) {
            showWipeInfo();
            return;
        }
        performWipe();
    });
}

function performWipe() {
    if (window.clearOverlay) {
        window.clearOverlay();
        if (window.toastManager) {
            window.toastManager.show('Overlay cleared', 'info', 'Character Toolbar');
        }
    }
}

/**
 * Initialize Clear button
 */
function initClearButton() {
    const btn = document.getElementById('btn-clear');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showClearInfo();
            return;
        }
        performClearSheet();
    });
}

async function executeClearSheet() {
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
        logger.error('Failed to clear character sheet:', error);
        if (window.toastManager) {
            window.toastManager.show('Failed to clear character sheet', 'error', 'Character Toolbar');
        }
    }
}

async function performClearSheet() {
    if (!confirm('Are you sure you want to clear the character sheet? This action cannot be undone.')) {
        return;
    }
    await executeClearSheet();
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
        
        if (window.bootstrap && bootstrap.Tooltip) {
            const tooltipInstance = bootstrap.Tooltip.getInstance(btn);
            if (tooltipInstance) {
                tooltipInstance.setContent({ '.tooltip-inner': btn.title });
            }
        }
    }
    
    btn.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showLockInfo(updateLockButton);
            return;
        }
        promptLockToggle(updateLockButton);
    });
    
    function promptLockToggle(updateLockButton) {
        if (window.LockManager.isLocked()) {
            const unlockContent = `
                <p>Unlocking will allow manual edits to Traits and other sheet fields.</p>
                <p>Are you sure you want to unlock?</p>
            `;
            
            const unlockFooter = `
                <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn theme-btn-primary" id="confirmUnlockBtn">Unlock Character</button>
            `;
            
            window.modalManager.showCustom({
                title: 'Unlock Character for Editing',
                content: unlockContent,
                footer: unlockFooter,
                size: 'default',
                centered: true
            }, (element, instance) => {
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
            const lockContent = `
                <p>Locking the character will disable manual editing of Attributes, Skills, Disciplines, Merits, and other core stats. XP spending will still apply automatically.</p>
                <p>Are you sure you want to continue?</p>
            `;
            
            const lockFooter = `
                <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn theme-btn-danger" id="confirmLockBtn">Lock Character</button>
            `;
            
            window.modalManager.showCustom({
                title: 'Lock Character for Play',
                content: lockContent,
                footer: lockFooter,
                size: 'default',
                centered: true
            }, (element, instance) => {
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
    }
    
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
        <button type="button" class="btn theme-btn-primary" id="saveThemeChoice">Apply</button>
    `;

    window.modalManager.showCustom({
        title: 'Color Scheme',
        content,
        footer,
        size: 'default',
        centered: true
    }, (element, instance) => {
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
    logger.log('Applying theme from character toolbar:', themeKey);
    
    if (themeKey === "wod-dark") {
        document.body.setAttribute("data-theme", "wod-dark");
    } else {
        document.body.setAttribute("data-theme", themeKey);
    }
    
    // Save to database
    if (window.databaseManager) {
        try {
            await window.databaseManager.setSetting('theme', themeKey);
            logger.log('Theme saved to database:', themeKey);
        } catch (err) {
            logger.error('Failed to save theme to database:', err);
        }
    } else {
        logger.error('No database manager available for theme storage');
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
            <button type="button" class="btn theme-btn-danger" id="deleteDiscordWebhook">Delete</button>
            <button type="button" class="btn theme-btn-primary" id="saveDiscordWebhook">Save</button>
        `;

        window.modalManager.showCustom({
            title: 'Discord Webhook',
            content,
            footer,
            size: 'default',
            centered: true
        }, (element, instance) => {
            element.querySelector("#saveDiscordWebhook").addEventListener("click", async () => {
                const url = element.querySelector("#discordWebhookInput").value.trim();
                await setDiscordWebhook(url);
                instance.hide();
            if (window.toastManager) {
                window.toastManager.show('Discord webhook saved!', 'success', 'Character Toolbar');
            }
        });
        
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
        btn.classList.toggle('active', infoModeEnabled);
        btn.setAttribute('aria-pressed', String(infoModeEnabled));
        
        if (infoModeEnabled) {
            document.body.classList.add('info-mode');
            if (window.setTooltipEnabled) {
                window.setTooltipEnabled(true);
            }
        } else {
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
        if (typeof window.showDiceSymbolsModal === 'function') {
            window.showDiceSymbolsModal();
            return;
        }
        if (window.modalManager) {
            window.modalManager.info('Dice Symbols', getDiceSymbolsGuideHtml(), {
                size: 'default',
                centered: true,
                scrollable: true
            });
        }
    });
}

/**
 * Initialize XP Spend button
 */
function initXPSpendButton() {
    console.log('[Toolbar] Initializing XP Spend button...');
    
    // Try to find the toolbar
    const toolbar = document.querySelector('.character-toolbar-glass');
    if (!toolbar) {
        console.error('[Toolbar] Could not find character toolbar');
        return;
    }
    
    // Try to find the last toolbar group or create one
    let xpGroup = toolbar.querySelector('.toolbar-group:last-child');
    if (!xpGroup) {
        xpGroup = toolbar.querySelector('.toolbar-group');
    }
    if (!xpGroup) {
        // Create a new group if none exists
        xpGroup = document.createElement('div');
        xpGroup.className = 'toolbar-group';
        xpGroup.setAttribute('aria-label', 'Experience Points');
        toolbar.appendChild(xpGroup);
    }
    
    // Check if button already exists
    if (document.getElementById('btn-xp-spend')) {
        console.log('[Toolbar] XP Spend button already exists');
        return;
    }
    
    const xpButton = document.createElement('button');
    xpButton.className = 'toolbar-btn';
    xpButton.id = 'btn-xp-spend';
    xpButton.title = 'Spend XP Mode';
    xpButton.setAttribute('aria-label', 'Spend XP Mode');
    xpButton.innerHTML = '<i class="bi bi-currency-dollar"></i>';
    
    xpButton.addEventListener('click', () => {
        if (isInfoModeActive()) {
            showXPSpendInfo();
            return;
        }
        if (window.XPSpendManager && window.XPSpendManager.toggleXPSpendMode) {
            window.XPSpendManager.toggleXPSpendMode();
        } else {
            console.error('[Toolbar] XP Spend Manager not available');
        }
    });
    
    xpGroup.appendChild(xpButton);
    console.log('[Toolbar] XP Spend button added successfully');
}

function initDashboardButton() {
    const btn = document.getElementById('btn-dashboard');
    if (!btn) return;

    btn.addEventListener('click', (event) => {
        if (isInfoModeActive()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            showDashboardInfo();
        }
    }, true);
}

/**
 * Initialize tooltips for all toolbar buttons
 */
function initTooltips() {
    if (window.bootstrap && bootstrap.Tooltip) {
        const buttons = document.querySelectorAll('.character-toolbar-glass [title]');
        buttons.forEach(button => {
            // Set placement to bottom so tooltips appear below the buttons
            button.setAttribute('data-bs-placement', 'bottom');
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