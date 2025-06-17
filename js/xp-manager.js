// XP Manager for Ledger
(function(){
    // Wait for DOM
    document.addEventListener('DOMContentLoaded', () => {
        injectXPModal();
        setupXPHandlers();
        loadXPFromStorage();
    });

    // Inject modal HTML into body
    function injectXPModal() {
        if(document.getElementById('xp-award-modal')) return;
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

    // XP state
    let xpData = {
        total: 0,
        spent: 0,
        history: [] // {amount, date, note}
    };

    // Storage key
    const XP_STORAGE_KEY = 'ledger-xp-data';

    // Load XP from localStorage
    function loadXPFromStorage() {
        try {
            const saved = localStorage.getItem(XP_STORAGE_KEY);
            if(saved) {
                xpData = JSON.parse(saved);
            }
        } catch(e) { xpData = {total:0, spent:0, history:[]}; }
        updateXPUI();
    }

    // Save XP to localStorage
    function saveXPToStorage() {
        localStorage.setItem(XP_STORAGE_KEY, JSON.stringify(xpData));
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
            document.getElementById('xp-input').value = 1;
            const modal = new bootstrap.Modal(document.getElementById('xp-award-modal'));
            modal.show();
        });
        // +/- buttons
        document.body.addEventListener('click', function(e){
            if(e.target.id === 'xp-plus') {
                const input = document.getElementById('xp-input');
                input.value = Math.max(1, parseInt(input.value||'1',10)+1);
            }
            if(e.target.id === 'xp-minus') {
                const input = document.getElementById('xp-input');
                input.value = Math.max(1, parseInt(input.value||'1',10)-1);
            }
            if(e.target.classList.contains('quick-xp')) {
                const input = document.getElementById('xp-input');
                input.value = parseInt(e.target.getAttribute('data-xp'),10);
            }
        });
        // Award confirm
        document.getElementById('xp-award-confirm').addEventListener('click', () => {
            const amt = Math.max(1, parseInt(document.getElementById('xp-input').value,10));
            awardXP(amt);
            bootstrap.Modal.getInstance(document.getElementById('xp-award-modal')).hide();
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
            if(!ok){ showToast('Nothing to undo','info'); }
        });
    }

    // Award XP
    function awardXP(amount, note = '', meta=null) {
        xpData.total += amount;
        xpData.history.push({type: 'award', amount, date: new Date().toLocaleString(), note, meta});
        saveXPToStorage();
        updateXPUI();
    }

    // Spend XP
    function spendXP(amount, note = '', meta=null) {
        // Prevent overspending
        if (amount <= 0 || amount > (xpData.total - xpData.spent)) {
            console.warn('Not enough available XP to spend');
            return false;
        }
        xpData.spent += amount;
        xpData.history.push({type: 'spend', amount, date: new Date().toLocaleString(), note, meta});
        saveXPToStorage();
        updateXPUI();
        return true;
    }

    // Helper to get available XP
    function getAvailableXP() {
        return xpData.total - xpData.spent;
    }

    // Export/import helpers for backup-manager.js
    window.getXPData = function() { return xpData; };
    window.setXPData = function(data) {
        xpData = data || {total:0, spent:0, history:[]};
        saveXPToStorage();
        updateXPUI();
    };

    // Undo last history entry
    function undoLast(){
        if(!xpData.history.length) return false;
        const last = xpData.history.pop();
        if(last.type==='award'){
            xpData.total = Math.max(0, xpData.total - last.amount);
        } else if(last.type==='spend' || last.type==='spent'){
            xpData.spent = Math.max(0, xpData.spent - last.amount);
        }
        saveXPToStorage();
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

    // Simple toast helper
    function showToast(message, type='info'){
        // Ensure container exists
        let container=document.getElementById('xpToastContainer');
        if(!container){
            container=document.createElement('div');
            container.id='xpToastContainer';
            container.className='toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(container);
        }
        const bgClass = type==='success' ? 'bg-success' : type==='warning' ? 'bg-warning text-dark' : type==='danger'||type==='error' ? 'bg-danger' : 'bg-info';
        const toast=document.createElement('div');
        toast.className=`toast align-items-center text-white ${bgClass} border-0`;
        toast.setAttribute('role','status');
        toast.setAttribute('aria-live','polite');
        toast.setAttribute('aria-atomic','true');
        toast.innerHTML=`<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;
        container.appendChild(toast);
        const bsToast=new bootstrap.Toast(toast,{delay:3000, autohide:true});
        bsToast.show();
        toast.addEventListener('hidden.bs.toast',()=>toast.remove());
    }
})(); 