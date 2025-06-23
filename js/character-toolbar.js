/*
 * character-toolbar.js
 * Traditional toolbar-style navigation for character sheet
 */

import { getDiscordWebhook, setDiscordWebhook, createWebhookModal } from "./discord-integration.js";
import { LockManager } from "./lock-manager.js";
import { TraitManagerUtils } from './manager-utils.js';

/**
 * Initialize the character sheet toolbar
 */
export function initCharacterToolbar() {
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
    initLockButton();
    initThemeButton();
    initDiscordButton();
    initInfoModeButton();
    
    // Initialize tooltips
    initTooltips();
}

/**
 * Initialize Save button
 */
function initSaveButton() {
    const btn = document.getElementById('btn-save');
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        try {
            if (window.characterManager) {
                await window.characterManager.saveCharacter();
                showToast('Character saved successfully!', 'success');
            }
        } catch (error) {
            console.error('Failed to save character:', error);
            showToast('Failed to save character', 'error');
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
            if (window.characterManager) {
                const character = await window.characterManager.getCurrentCharacter();
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
                    showToast('Character exported successfully!', 'success');
                }
            }
        } catch (error) {
            console.error('Failed to export character:', error);
            showToast('Failed to export character', 'error');
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
            
            if (window.characterManager) {
                await window.characterManager.loadCharacter(character);
                showToast('Character imported successfully!', 'success');
            }
        } catch (error) {
            console.error('Failed to import character:', error);
            showToast('Failed to import character', 'error');
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
            window.quickRoll('rouse');
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
        if (window.computeRemorseDice) {
            const dice = window.computeRemorseDice();
            if (window.quickRoll) {
                window.quickRoll('remorse', dice);
            }
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
        if (window.computeFrenzyDice) {
            const dice = window.computeFrenzyDice();
            if (window.quickRoll) {
                window.quickRoll('frenzy', dice);
            }
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
 * Initialize Lock button
 */
function initLockButton() {
    const btn = document.getElementById('btn-lock');
    if (!btn) return;
    
    function updateLockButton() {
        if (LockManager.isLocked()) {
            btn.innerHTML = '<i class="bi bi-unlock"></i>';
            btn.title = 'Unlock Character';
        } else {
            btn.innerHTML = '<i class="bi bi-lock"></i>';
            btn.title = 'Lock Character';
        }
    }
    
    btn.addEventListener('click', () => {
        if (LockManager.isLocked()) {
            // Unlock flow
            if (TraitManagerUtils.showConfirmModal("Unlock character for editing?")) {
                LockManager.unlock();
                updateLockButton();
            }
        } else {
            // Lock flow
            if (TraitManagerUtils.showConfirmModal("Lock character for play mode?")) {
                LockManager.lock();
                updateLockButton();
            }
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
        // Show theme modal
        if (window.showThemeModal) {
            window.showThemeModal();
        }
    });
}

/**
 * Initialize Discord button
 */
function initDiscordButton() {
    const btn = document.getElementById('btn-discord');
    if (!btn) return;
    
    btn.addEventListener('click', async () => {
        // Show Discord webhook modal
        const webhookModal = createWebhookModal();
        document.body.appendChild(webhookModal);
        
        const modal = bootstrap.Modal.getOrCreateInstance(webhookModal);
        
        // Load current webhook
        const webhook = await getDiscordWebhook();
        webhookModal.querySelector("#discordWebhookInput").value = webhook || "";
        
        // Handle save
        webhookModal.querySelector("#saveDiscordWebhook").addEventListener("click", () => {
            const url = webhookModal.querySelector("#discordWebhookInput").value.trim();
            setDiscordWebhook(url);
            modal.hide();
            showToast('Discord webhook saved!', 'success');
        });
        
        // Handle delete
        webhookModal.querySelector("#deleteDiscordWebhook").addEventListener("click", () => {
            setDiscordWebhook(null);
            modal.hide();
            showToast('Discord webhook removed!', 'success');
        });
        
        modal.show();
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

/**
 * Show a toast notification
 */
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    toast.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for toast
if (!document.getElementById('toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize toolbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCharacterToolbar();
});

// Character Toolbar Management
class CharacterToolbar {
    constructor() {
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Character Actions
        document.getElementById('btn-save')?.addEventListener('click', () => this.saveCharacter());
        document.getElementById('btn-export')?.addEventListener('click', () => this.exportCharacter());
        document.getElementById('btn-print')?.addEventListener('click', () => this.printCharacter());

        // Game Actions
        document.getElementById('btn-roll')?.addEventListener('click', () => this.rollDice());
        document.getElementById('btn-rouse')?.addEventListener('click', () => this.rouseCheck());
        document.getElementById('btn-xp')?.addEventListener('click', () => this.addExperience());

        // Character Management
        document.getElementById('btn-duplicate')?.addEventListener('click', () => this.duplicateCharacter());
        document.getElementById('btn-reset')?.addEventListener('click', () => this.resetCharacter());
        document.getElementById('btn-delete')?.addEventListener('click', () => this.deleteCharacter());

        // Settings & Navigation
        document.getElementById('btn-settings')?.addEventListener('click', () => this.openSettings());
        document.getElementById('btn-dashboard')?.addEventListener('click', () => this.backToDashboard());
    }

    // Character Actions
    saveCharacter() {
        if (window.characterManager) {
            window.characterManager.saveCharacter();
            this.showNotification('Character saved successfully!', 'success');
        } else {
            this.showNotification('Character manager not available', 'error');
        }
    }

    exportCharacter() {
        if (window.characterManager) {
            window.characterManager.exportCharacter();
        } else {
            this.showNotification('Character manager not available', 'error');
        }
    }

    printCharacter() {
        window.print();
    }

    // Game Actions
    rollDice() {
        if (window.diceOverlay) {
            window.diceOverlay.showDiceOverlay();
        } else {
            this.showNotification('Dice overlay not available', 'error');
        }
    }

    rouseCheck() {
        if (window.diceOverlay) {
            window.diceOverlay.showRouseCheck();
        } else {
            this.showNotification('Dice overlay not available', 'error');
        }
    }

    addExperience() {
        if (window.xpManager) {
            window.xpManager.showAddXPModal();
        } else {
            this.showNotification('XP manager not available', 'error');
        }
    }

    // Character Management
    duplicateCharacter() {
        if (window.characterManager) {
            const character = window.characterManager.getCurrentCharacter();
            if (character) {
                const duplicatedCharacter = { ...character };
                duplicatedCharacter.name = `${character.name} (Copy)`;
                duplicatedCharacter.id = Date.now().toString();
                
                window.characterManager.saveCharacter(duplicatedCharacter);
                this.showNotification('Character duplicated successfully!', 'success');
            }
        } else {
            this.showNotification('Character manager not available', 'error');
        }
    }

    resetCharacter() {
        if (confirm('Are you sure you want to reset this character? This will clear all progress and return to starting values.')) {
            if (window.characterManager) {
                window.characterManager.resetCharacter();
                this.showNotification('Character reset successfully!', 'success');
            } else {
                this.showNotification('Character manager not available', 'error');
            }
        }
    }

    deleteCharacter() {
        if (confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
            if (window.characterManager) {
                const character = window.characterManager.getCurrentCharacter();
                if (character) {
                    window.characterManager.deleteCharacter(character.id);
                    this.showNotification('Character deleted successfully!', 'success');
                    this.backToDashboard();
                }
            } else {
                this.showNotification('Character manager not available', 'error');
            }
        }
    }

    // Settings & Navigation
    openSettings() {
        // Navigate to dashboard settings
        window.location.href = 'index.html#settings';
    }

    backToDashboard() {
        window.location.href = 'index.html';
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize toolbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.characterToolbar = new CharacterToolbar();
});

// Export for global access
window.CharacterToolbar = CharacterToolbar; 