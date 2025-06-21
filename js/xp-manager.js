// XP Manager for Ledger with Component Architecture Integration
class XPManager {
    constructor() {
        this.xpData = {
            total: 0,
            spent: 0,
            history: [] // {amount, date, note, type}
        };
        this.eventListeners = new Map();
        this.isComponentMode = false;
        this.parentComponent = null;
        this.init();
    }

    /**
     * Set component mode and parent component
     */
    setComponentMode(parentComponent) {
        this.isComponentMode = true;
        this.parentComponent = parentComponent;
        console.log('XPManager: Component mode enabled');
    }

    /**
     * Initialize the manager
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    this.injectXPModal();
                    this.setupXPHandlers();
                    this.loadXPFromStorage();
                }, 300);
            });
        } else {
            setTimeout(() => {
                this.injectXPModal();
                this.setupXPHandlers();
                this.loadXPFromStorage();
            }, 300);
        }
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
        // Emit to internal listeners
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in XP manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`xp${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'XPManager' }
        }));
    }

    // Inject modal HTML into body
    injectXPModal() {
        if (document.getElementById('xp-award-modal')) return;
        const modal = `
        <div class="modal fade xp-modal" id="xp-award-modal" tabindex="-1" aria-labelledby="xpAwardModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="xpAwardModalLabel">Award Experience Points</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="xp-input-group mb-3">
                  <button class="btn xp-minus" id="xp-minus" type="button">-</button>
                  <input type="number" id="xp-input" class="form-control xp-input" value="1" min="1">
                  <button class="btn xp-plus" id="xp-plus" type="button">+</button>
                </div>
                <div class="mb-3 xp-quick-btns">
                  <button class="btn btn-outline-primary quick-xp" data-xp="3">3 XP</button>
                  <button class="btn btn-outline-primary quick-xp" data-xp="5">5 XP</button>
                  <button class="btn btn-outline-primary quick-xp" data-xp="10">10 XP</button>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success" id="xp-award-confirm">Award</button>
              </div>
            </div>
          </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modal);
    }

    // Load XP from storage (IndexedDB only)
    async loadXPFromStorage() {
        try {
            // Use IndexedDB exclusively
            if (window.databaseManager) {
                const saved = await window.databaseManager.getSetting('xpData');
                if (saved) {
                    this.xpData = saved;
                    this.updateXPUI();
                    return;
                }
            }
            
            // No XP data found, use defaults
            this.xpData = { total: 0, spent: 0, history: [] };
        } catch (e) { 
            console.error('Failed to load XP data from IndexedDB:', e);
            this.xpData = { total: 0, spent: 0, history: [] }; 
        }
        this.updateXPUI();
    }

    // Save XP to storage (IndexedDB only)
    async saveXPToStorage() {
        try {
            // Use IndexedDB exclusively
            if (window.databaseManager) {
                await window.databaseManager.setSetting('xpData', this.xpData);
                return;
            }
            
            throw new Error('No database manager available for XP storage');
        } catch (err) {
            console.error('Failed to save XP data to IndexedDB:', err);
            throw err;
        }
    }

    // Update XP UI
    updateXPUI() {
        const totalElement = document.getElementById('total-xp');
        const spentElement = document.getElementById('spent-xp');
        const availableElement = document.getElementById('available-xp');
        const historyElement = document.getElementById('experience-history');

        if (totalElement) totalElement.textContent = this.xpData.total;
        if (spentElement) spentElement.textContent = this.xpData.spent;
        if (availableElement) availableElement.textContent = this.xpData.total - this.xpData.spent;
        
        // Update history
        if (historyElement) {
            historyElement.innerHTML = '';
            this.xpData.history.slice().reverse().forEach(entry => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                const verb = entry.type === 'spend' || entry.type === 'spent' ? 'Spent' : 'Awarded';
                li.textContent = `[${entry.date}] ${verb} ${entry.amount} XP${entry.note ? ': ' + entry.note : ''}`;
                historyElement.appendChild(li);
            });
        }
    }

    // Setup handlers
    setupXPHandlers() {
        // Show modal on Award XP click
        const awardBtn = document.getElementById('award-xp');
        if (awardBtn) {
            awardBtn.addEventListener('click', () => {
                document.getElementById('xp-input').value = 1;
                const modal = new bootstrap.Modal(document.getElementById('xp-award-modal'));
                modal.show();
            });
        }

        // +/- buttons
        document.body.addEventListener('click', (e) => {
            if (e.target.id === 'xp-plus') {
                const input = document.getElementById('xp-input');
                input.value = Math.max(1, parseInt(input.value || '1', 10) + 1);
            }
            if (e.target.id === 'xp-minus') {
                const input = document.getElementById('xp-input');
                input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
            }
            if (e.target.classList.contains('quick-xp')) {
                const input = document.getElementById('xp-input');
                input.value = parseInt(e.target.getAttribute('data-xp'), 10);
            }
        });

        // Award confirm
        const confirmBtn = document.getElementById('xp-award-confirm');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                const amt = Math.max(1, parseInt(document.getElementById('xp-input').value, 10));
                this.awardXP(amt);
                bootstrap.Modal.getInstance(document.getElementById('xp-award-modal')).hide();
            });
        }

        // Undo last button (injected if not present)
        if (!document.getElementById('undo-xp')) {
            const experienceActions = document.querySelector('.experience-actions');
            if (experienceActions) {
                const btnUndo = document.createElement('button');
                btnUndo.id = 'undo-xp';
                btnUndo.className = 'btn btn-warning undo-xp ms-2';
                btnUndo.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i> Undo Last';
                experienceActions.appendChild(btnUndo);
            }
        }

        const undoBtn = document.getElementById('undo-xp');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => {
                const ok = this.undoLast();
                if (!ok) { 
                    this.showFeedback('Nothing to undo', 'info'); 
                }
            });
        }
    }

    // Award XP
    async awardXP(amount, note = '', meta = null) {
        this.xpData.total += amount;
        this.xpData.history.push({ 
            type: 'award', 
            amount, 
            date: new Date().toLocaleString(), 
            note, 
            meta 
        });
        await this.saveXPToStorage();
        this.updateXPUI();
        
        // Emit XP awarded event
        this.emit('xpAwarded', {
            amount,
            note,
            meta,
            total: this.xpData.total,
            available: this.getAvailableXP()
        });
    }

    // Spend XP
    async spendXP(amount, note = '', meta = null) {
        // Prevent overspending
        if (amount <= 0 || amount > this.getAvailableXP()) {
            console.warn('Not enough available XP to spend');
            return false;
        }
        this.xpData.spent += amount;
        this.xpData.history.push({ 
            type: 'spend', 
            amount, 
            date: new Date().toLocaleString(), 
            note, 
            meta 
        });
        await this.saveXPToStorage();
        this.updateXPUI();
        
        // Emit XP spent event
        this.emit('xpSpent', {
            amount,
            note,
            meta,
            spent: this.xpData.spent,
            available: this.getAvailableXP()
        });
        
        return true;
    }

    // Helper to get available XP
    getAvailableXP() {
        return this.xpData.total - this.xpData.spent;
    }

    // Undo last history entry
    async undoLast() {
        if (!this.xpData.history.length) return false;
        const last = this.xpData.history.pop();
        if (last.type === 'award') {
            this.xpData.total = Math.max(0, this.xpData.total - last.amount);
        } else if (last.type === 'spend' || last.type === 'spent') {
            this.xpData.spent = Math.max(0, this.xpData.spent - last.amount);
        }
        await this.saveXPToStorage();
        this.updateXPUI();
        
        // Emit XP undone event
        this.emit('xpUndone', {
            lastEntry: last,
            total: this.xpData.total,
            spent: this.xpData.spent,
            available: this.getAvailableXP()
        });
        
        return true;
    }

    /**
     * Component integration methods
     */
    getData() {
        return {
            xpData: { ...this.xpData }
        };
    }

    update(data) {
        if (data.xpData) {
            this.xpData = { ...data.xpData };
            this.updateXPUI();
            
            // Emit XP data updated event
            this.emit('xpDataUpdated', {
                xpData: this.xpData
            });
        }
    }

    clear() {
        this.xpData = { total: 0, spent: 0, history: [] };
        this.updateXPUI();
        
        // Emit XP cleared event
        this.emit('xpCleared');
    }

    setLockState(isLocked) {
        const $awardBtn = $('#award-xp');
        const $undoBtn = $('#undo-xp');
        const $modalBtns = $('#xp-award-modal .btn');

        if (isLocked) {
            $awardBtn.prop('disabled', true);
            $undoBtn.prop('disabled', true);
            $modalBtns.prop('disabled', true);
        } else {
            $awardBtn.prop('disabled', false);
            $undoBtn.prop('disabled', false);
            $modalBtns.prop('disabled', false);
        }
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'XP Manager');
        } else {
            console.log(`[XPManager] ${type.toUpperCase()}: ${message}`);
        }
    }

    // Export/import helpers for backup-manager.js (legacy compatibility)
    getXPData() { 
        return this.xpData; 
    }

    async setXPData(data) {
        this.xpData = data || { total: 0, spent: 0, history: [] };
        await this.saveXPToStorage();
        this.updateXPUI();
        
        // Emit XP data set event
        this.emit('xpDataSet', {
            xpData: this.xpData
        });
    }
}

// Create and export the XP manager instance
const xpManager = new XPManager();

// Add to window for global access and legacy compatibility
window.xpManager = xpManager;
window.getXPData = () => xpManager.getXPData();
window.setXPData = (data) => xpManager.setXPData(data);

// Remove ES6 export - use traditional script loading
// export default xpManager; 