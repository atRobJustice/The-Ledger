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
            li.textContent = `[${entry.date}] Awarded ${entry.amount} XP${entry.note ? ': ' + entry.note : ''}`;
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
    }

    // Award XP
    function awardXP(amount) {
        xpData.total += amount;
        xpData.history.push({amount, date: new Date().toLocaleString(), note: ''});
        saveXPToStorage();
        updateXPUI();
    }

    // Export/import helpers for backup-manager.js
    window.getXPData = function() { return xpData; };
    window.setXPData = function(data) {
        xpData = data || {total:0, spent:0, history:[]};
        saveXPToStorage();
        updateXPUI();
    };
})(); 