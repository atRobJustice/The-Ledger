/**
 * @fileoverview XP Manager for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Manages experience points. Provides functionality for awarding, spending, and tracking
 *             XP with a complete history system and integration with the backup manager for data persistence.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires window.databaseManager - For persisting XP data to IndexedDB
 * @requires window.modalManager - For displaying XP award modals
 * @requires window.toastManager - For displaying feedback messages
 * @requires Bootstrap - Used for UI components and styling
 * 
 * @namespace XPManager
 * @description Main namespace for managing experience points
 * 
 * @property {Object} xpData - Object containing XP state
 * @property {number} xpData.total - Total XP awarded
 * @property {number} xpData.spent - Total XP spent
 * @property {Array} xpData.history - Array of transaction records
 * 
 * @function loadXPFromStorage - Loads XP data from IndexedDB on initialization
 * @function saveXPToStorage - Saves XP data to IndexedDB
 * @function updateXPUI - Updates the XP display in the UI
 * @function setupXPHandlers - Sets up event listeners for XP-related buttons
 * @function showAwardXPModal - Shows the modal for awarding XP
 * @function awardXP - Awards XP to the character
 * @function spendXP - Spends XP from the character's pool
 * @function getAvailableXP - Returns the amount of available XP
 * @function undoLast - Undoes the last XP transaction
 * 
 * @typedef {Object} XPData
 * @property {number} total - Total XP awarded
 * @property {number} spent - Total XP spent
 * @property {Array<TransactionRecord>} history - Array of transaction records
 * 
 * @typedef {Object} TransactionRecord
 * @property {string} type - Transaction type ('award' or 'spend')
 * @property {number} amount - XP amount
 * @property {string} date - Transaction timestamp
 * @property {string} [note] - Optional note about the transaction
 * @property {Object} [meta] - Optional metadata
 * 
 * @event xpUndo - Custom event emitted when XP is undone
 * @eventparam {TransactionRecord} detail - The transaction that was undone
 * 
 * @example
 * // Award XP
 * await awardXP(5, 'Session completion');
 * 
 * // Spend XP
 * await spendXP(3, 'Attribute increase');
 * 
 * // Get available XP
 * const available = getAvailableXP();
 * 
 * // Undo last transaction
 * await undoLast();
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

// XP Manager for Ledger

// Use global logger (available from character-sheet.html)
const logger = window.logger || console;

(function(){
    // Wait for DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        loadXPFromStorage();
            setupXPHandlers();
    });

    // XP state
    let xpData = {
        total: 0,
        spent: 0,
        history: [] // {amount, date, note}
    };

    // Load XP from storage (IndexedDB only)
    async function loadXPFromStorage() {
        try {
            // Use IndexedDB exclusively
            if (window.databaseManager) {
                const saved = await window.databaseManager.getSetting('xpData');
                if (saved) {
                    xpData = saved;
                    updateXPUI();
                    return;
                }
            }
            
            // No XP data found, use defaults
            xpData = {total:0, spent:0, history:[]};
        } catch(e) { 
          logger.error('Failed to load XP data from IndexedDB:', e);
          xpData = {total:0, spent:0, history:[]}; 
        }
        updateXPUI();
    }

    // Save XP to storage (IndexedDB only)
    async function saveXPToStorage() {
        try {
            // Use IndexedDB exclusively
            if (window.databaseManager) {
                await window.databaseManager.setSetting('xpData', xpData);
                return;
            }
            
            throw new Error('No database manager available for XP storage');
        } catch (err) {
            logger.error('Failed to save XP data to IndexedDB:', err);
            throw err;
        }
    }

    // Update XP UI
    function updateXPUI() {
        document.getElementById('total-xp').textContent = xpData.total;
        document.getElementById('spent-xp').textContent = xpData.spent;
        document.getElementById('available-xp').textContent = xpData.total - xpData.spent;
        // Update history
        const ul = document.getElementById('experience-history');
        ul.innerHTML = '';
        xpData.history.slice().reverse().forEach(entry => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            const verb = entry.type === 'spend' || entry.type === 'spent' ? 'Spent' : 'Awarded';
            li.textContent = `[${entry.date}] ${verb} ${entry.amount} XP${entry.note ? ': ' + entry.note : ''}`;
            ul.appendChild(li);
        });
    }

    // Setup handlers
    function setupXPHandlers() {
        // Show modal on Award XP click
        document.getElementById('award-xp').addEventListener('click', () => {
            showAwardXPModal();
        });

        // Undo last button (injected if not present)
        if(!document.getElementById('undo-xp')){
            const btnUndo=document.createElement('button');
            btnUndo.id='undo-xp';
            btnUndo.className='btn theme-btn-warning undo-xp ms-2';
            btnUndo.innerHTML='<i class="bi bi-arrow-counterclockwise"></i> Undo Last';
            document.querySelector('.experience-actions').appendChild(btnUndo);
        }

        document.getElementById('undo-xp').addEventListener('click', ()=>{
            const ok = undoLast();
            if(!ok){ window.toastManager.show('Nothing to undo','info'); }
        });
    }

    // Show Award XP modal
    function showAwardXPModal() {
        const content = `
            <div class="xp-input-group mb-3">
                <button class="btn xp-minus" id="xp-minus" type="button">-</button>
                <input type="number" id="xp-input" class="form-control xp-input" value="1" min="1">
                <button class="btn xp-plus" id="xp-plus" type="button">+</button>
            </div>
            <div class="mb-3 xp-quick-btns">
                <button class="btn theme-btn-outline-primary quick-xp" data-xp="3">3 XP</button>
                <button class="btn theme-btn-outline-primary quick-xp" data-xp="5">5 XP</button>
                <button class="btn theme-btn-outline-primary quick-xp" data-xp="10">10 XP</button>
            </div>
        `;

        const footer = `
            <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn theme-btn-primary" id="xp-award-confirm">Award</button>
        `;

        window.modalManager.showCustom({
            title: 'Award Experience Points',
            content,
            footer,
            size: 'default',
            centered: true
        }, (element, instance) => {
            // +/- buttons
            element.addEventListener('click', function(e){
                if(e.target.id === 'xp-plus') {
                    const input = element.querySelector('#xp-input');
                    input.value = Math.max(1, parseInt(input.value||'1',10)+1);
                }
                if(e.target.id === 'xp-minus') {
                    const input = element.querySelector('#xp-input');
                    input.value = Math.max(1, parseInt(input.value||'1',10)-1);
                }
                if(e.target.classList.contains('quick-xp')) {
                    const input = element.querySelector('#xp-input');
                    input.value = parseInt(e.target.getAttribute('data-xp'),10);
                }
            });

            // Award confirm
            element.querySelector('#xp-award-confirm').addEventListener('click', async () => {
                const amt = Math.max(1, parseInt(element.querySelector('#xp-input').value,10));
                await awardXP(amt);
                instance.hide();
            });
        });
    }

    // Award XP
    async function awardXP(amount, note = '', meta=null) {
        xpData.total += amount;
        xpData.history.push({type: 'award', amount, date: new Date().toLocaleString(), note, meta});
        await saveXPToStorage();
        updateXPUI();
    }

    // Spend XP
    async function spendXP(amount, note = '', meta=null) {
        // Prevent overspending
        if (getAvailableXP() < amount) {
          logger.warn('Not enough available XP to spend');
          return false;
        }
        xpData.spent += amount;
        xpData.history.push({type: 'spend', amount, date: new Date().toLocaleString(), note, meta});
        await saveXPToStorage();
        updateXPUI();
        return true;
    }

    // Helper to get available XP
    function getAvailableXP() {
        return xpData.total - xpData.spent;
    }

    // Export/import helpers for backup-manager.js
    window.getXPData = function() { return xpData; };
    window.setXPData = async function(data) {
        xpData = data || {total:0, spent:0, history:[]};
        await saveXPToStorage();
        updateXPUI();
    };

    // Undo last history entry
    async function undoLast(){
        if(!xpData.history.length) return false;
        const last = xpData.history.pop();
        if(last.type==='award'){
            xpData.total = Math.max(0, xpData.total - last.amount);
        } else if(last.type==='spend' || last.type==='spent'){
            xpData.spent = Math.max(0, xpData.spent - last.amount);
        }
        await saveXPToStorage();
        updateXPUI();
        // Emit event so other modules can revert side-effects
        document.dispatchEvent(new CustomEvent('xpUndo', {detail:last}));
        return true;
    }

    // Public interface for other modules
    window.xpManager = {
        awardXP,
        spendXP,
        getAvailableXP,
        undoLast
    };
})(); 