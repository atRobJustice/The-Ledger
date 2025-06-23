// XP Manager for Ledger

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
            console.error('Failed to load XP data from IndexedDB:', e);
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
            console.error('Failed to save XP data to IndexedDB:', err);
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
            btnUndo.className='btn btn-warning undo-xp ms-2';
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
                <button class="btn btn-outline-primary quick-xp" data-xp="3">3 XP</button>
                <button class="btn btn-outline-primary quick-xp" data-xp="5">5 XP</button>
                <button class="btn btn-outline-primary quick-xp" data-xp="10">10 XP</button>
            </div>
        `;

        const footer = `
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" id="xp-award-confirm">Award</button>
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
        if (amount <= 0 || amount > (xpData.total - xpData.spent)) {
            console.warn('Not enough available XP to spend');
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