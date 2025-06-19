/*
 * control-bar.js
 * Bottom-left floating control bar used across Ledger – extracted from dice-overlay.js
 */

import { getDiscordWebhook, setDiscordWebhook, createWebhookModal } from "./discord-integration.js";
import { bloodPotency as bpData } from "./references/blood_potency.js";
import { LockManager } from "./lock-manager.js";
import { TraitManagerUtils } from './manager-utils.js';

/**
 * Create the control bar and wire up all event handlers.
 * The bar is appended to <body> immediately.
 *
 * Expected dependencies are supplied via the `deps` argument so we do not rely on globals.
 */
export function initControlBar(deps) {
  const {
    disableAllTooltips,
    setTooltipEnabled,
    quickRoll,
    computeRemorseDice,
    computeFrenzyDice,
    isWPRerollAllowed,
    handleWPRerollClick,
    clearOverlay,
  } = deps;

  // Guard: avoid creating multiple bars if called twice
  if (document.getElementById("ledger-control-bar")) {
    return document.getElementById("ledger-control-bar");
  }

  // ------------------------------------------------------------------
  //  DOM construction
  // ------------------------------------------------------------------
  const bar = document.createElement("div");
  bar.id = "ledger-control-bar";
  bar.className =
    "position-fixed bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75 d-grid align-items-center";
  bar.style.borderTop = "2px solid rgba(255,255,255,.2)";
  bar.style.zIndex = "2100";
  document.body.appendChild(bar);

  // Full-width anchored bar that uses CSS Grid instead of flexbox
  // Replace rounded corners because the bar now spans the full width
  // Add custom styling (grid, animation, collapsed state, etc.) once per page
  if (!document.getElementById("ledger-control-bar-style")) {
    const style = document.createElement("style");
    style.id = "ledger-control-bar-style";
    style.textContent = `
      #ledger-control-bar {
        grid-auto-flow: column;
        grid-template-rows: repeat(2, auto);
        gap: .25rem .5rem;
      }
      /* Simple vertical divider */
      #ledger-control-bar .vr {
        width: 1px;
        background: rgba(255,255,255,.25);
        align-self: stretch;
      }
      /* Attention pulse when WP-reroll becomes available */
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(13,110,253,0.7); }
        70% { box-shadow: 0 0 0 10px rgba(13,110,253,0); }
        100% { box-shadow: 0 0 0 0 rgba(13,110,253,0); }
      }
      .pulse-once {
        animation: pulse 1s ease-out 0s 2;
      }
      /* Ensure ALL tooltips appear above the control bar */
      .tooltip {
        z-index: 3000 !important;
      }
      /* Responsive layout for smaller screens */
      @media (max-width: 768px) {
        #ledger-control-bar {
          grid-auto-flow: row;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          padding: 0.5rem;
          gap: 0.5rem;
        }
        #ledger-control-bar .btn {
          width: 100%;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        #ledger-control-bar .form-check {
          margin-bottom: 0.5rem;
          grid-column: 1 / -1;
        }
        #ledger-control-bar .vr {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 1) Info-mode toggle ------------------------------------------------
  const toggleWrapper = document.createElement("div");
  toggleWrapper.className = "form-check form-switch mb-3 d-flex flex-column align-items-center";
  toggleWrapper.innerHTML = `
    <div class="d-flex justify-content-center align-items-center w-100" style="height: 32px;">
      <input class="form-check-input mx-auto" type="checkbox" id="toggleInfoMode" title="Show info popups for sheet elements" data-bs-toggle="tooltip">
    </div>
    <label class="form-check-label text-center w-100 mt-1" for="toggleInfoMode">Info Mode</label>
  `;
  bar.appendChild(toggleWrapper);

  const toggleInput = toggleWrapper.querySelector("#toggleInfoMode");

  // Start with tooltips disabled
  disableAllTooltips();
  document.body.classList.remove("info-mode");

  toggleInput.addEventListener("change", () => {
    if (!toggleInput.checked) {
      disableAllTooltips();
      document.body.classList.remove("info-mode");
    } else {
      setTooltipEnabled(true);
      document.body.classList.add("info-mode");
    }
  });

  // 2) Discord webhook configuration ----------------------------------
  const btnDiscord = document.createElement("button");
  btnDiscord.id = "discordWebhookBtn";
  btnDiscord.className = "btn btn-secondary p-1 d-flex align-items-center justify-content-center";
  btnDiscord.setAttribute("title", "Configure Discord Webhook");
  btnDiscord.setAttribute("data-bs-toggle", "tooltip");
  btnDiscord.style.backgroundColor = "transparent";
  btnDiscord.style.border = 0;
  btnDiscord.innerHTML = `<img src="assets/Discord-Symbol-Blurple.png" alt="Discord" style="height:24px;width:auto;">`;
  bar.appendChild(btnDiscord);

  let webhookModalEl;
  let webhookModalInstance;

  function ensureWebhookModal() {
    if (webhookModalEl) return;
    webhookModalEl = createWebhookModal();
    webhookModalInstance = bootstrap.Modal.getOrCreateInstance(webhookModalEl);

    webhookModalEl
      .querySelector("#saveDiscordWebhook")
      .addEventListener("click", () => {
        const url = webhookModalEl
          .querySelector("#discordWebhookInput")
          .value.trim();
        setDiscordWebhook(url);
        webhookModalInstance.hide();
      });

    webhookModalEl
      .querySelector("#deleteDiscordWebhook")
      .addEventListener("click", () => {
        setDiscordWebhook(null);
        webhookModalInstance.hide();
      });
  }

  btnDiscord.addEventListener("click", () => {
    ensureWebhookModal();
    webhookModalEl.querySelector("#discordWebhookInput").value = getDiscordWebhook() || "";
    webhookModalEl.querySelector("#deleteDiscordWebhook").style.display = getDiscordWebhook()
      ? "inline-block"
      : "none";
    webhookModalInstance.show();
  });

  // 2b) Progeny import button ----------------------------------
  const btnProgeny = document.createElement("button");
  btnProgeny.id = "importProgenyBtn";
  btnProgeny.className = "btn btn-secondary p-1 d-flex align-items-center justify-content-center";
  btnProgeny.setAttribute("title", "Import Progeny JSON");
  btnProgeny.setAttribute("data-bs-toggle", "tooltip");
  btnProgeny.style.backgroundColor = "transparent";
  btnProgeny.style.border = 0;
  btnProgeny.innerHTML = `<img src="assets/progeny-icon.svg" alt="Progeny" style="width:24px;height:24px;">`;
  bar.appendChild(btnProgeny);

  const progenyFileInput = document.createElement("input");
  progenyFileInput.type = "file";
  progenyFileInput.accept = "application/json";
  progenyFileInput.style.display = "none";
  bar.appendChild(progenyFileInput);

  btnProgeny.addEventListener("click", () => progenyFileInput.click());

  progenyFileInput.addEventListener("change", (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const progenyData = JSON.parse(e.target.result);
        const ledgerData = convertProgenyToLedger(progenyData);
        if (typeof window.loadCharacterData === "function") {
          window.loadCharacterData(ledgerData);
          window.toastManager.show("Progeny character imported", "success", 'Control Bar');
        } else {
          window.toastManager.show('Import logic unavailable', 'danger', 'Control Bar');
        }
      } catch (err) {
        console.error(err);
        window.toastManager.show("Failed to import Progeny JSON", "danger");
      }
    };
    reader.readAsText(file);
  });

  // 2c) Dice Symbols help button ----------------------------------
  const btnDiceHelp = document.createElement("button");
  btnDiceHelp.id = "diceSymbolsBtn";
  btnDiceHelp.className = "btn btn-secondary p-1 d-flex align-items-center justify-content-center";
  btnDiceHelp.setAttribute("title", "Dice Symbols Guide");
  btnDiceHelp.setAttribute("data-bs-toggle", "tooltip");
  btnDiceHelp.style.backgroundColor = "transparent";
  btnDiceHelp.style.border = 0;
  btnDiceHelp.innerHTML = `<img src="assets/help.png" alt="Help" style="width:24px;height:24px;">`;
  bar.appendChild(btnDiceHelp);

  let diceSymbolsModalEl;
  let diceSymbolsModalInstance;

  function ensureDiceSymbolsModal() {
    if (diceSymbolsModalEl) return;
    diceSymbolsModalEl = createDiceSymbolsModal();
    diceSymbolsModalInstance = bootstrap.Modal.getOrCreateInstance(diceSymbolsModalEl);
  }

  function createDiceSymbolsModal() {
    const modalHtml = `
      <div class="modal fade" id="diceSymbolsModal" tabindex="-1" aria-labelledby="diceSymbolsLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="diceSymbolsLabel">Dice Symbols</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="dice-symbols-guide">
                <div class="mb-3">
                  <strong>● or ✪</strong> - Success (+1)
                </div>
                <div class="mb-3">
                  <strong>✪ + ✪</strong> - Critical Success (+4)
                </div>
                <div class="mb-3">
                  <strong style="color: #dc3545;">⚠</strong> - Bestial Failure (no successes)
                </div>
                <div class="mb-3">
                  <strong style="color: #dc3545;">✪</strong> <strong>+ ✪ or </strong><strong style="color: #dc3545;">✪</strong> - Messy Critical (+4)
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    return document.getElementById('diceSymbolsModal');
  }

  btnDiceHelp.addEventListener("click", () => {
    ensureDiceSymbolsModal();
    diceSymbolsModalInstance.show();
  });

  // 3) Main Roll button ------------------------------------------------
  const btnRoll = document.createElement("button");
  btnRoll.id = "openDiceRoll";
  btnRoll.className = "btn btn-danger";
  btnRoll.setAttribute("title", "Open detailed roll dialog");
  btnRoll.setAttribute("data-bs-toggle", "tooltip");
  btnRoll.textContent = "Roll";
  bar.appendChild(btnRoll);
  // (Actual click handler lives in dice-overlay.js)

  // 4) Utility for creating small quick-action buttons -----------------
  function createQuickBtn(id, text, hexColor, tooltip = text) {
    const b = document.createElement("button");
    b.id = id;
    b.className = "btn";
    b.textContent = text;
    b.style.backgroundColor = hexColor;
    b.style.color = "#fff";
    b.setAttribute("title", tooltip);
    b.setAttribute("data-bs-toggle", "tooltip");
    return b;
  }

  const btnRouse = createQuickBtn(
    "quickRouse",
    "Rouse",
    "#331D43",
    "Rouse Check – Roll 1 die. Failure increases Hunger by 1."
  );
  const btnRemorse = createQuickBtn(
    "quickRemorse",
    "Remorse",
    "#19305B",
    "Remorse Check – Roll dice to resist Humanity loss."
  );
  const btnFrenzy = createQuickBtn(
    "quickFrenzy",
    "Frenzy",
    "#B83B1A",
    "Frenzy Check – Roll dice to resist Frenzy."
  );
  const btnWPReroll = createQuickBtn(
    "quickWPReroll",
    "Reroll",
    "#0d6efd",
    "Willpower Reroll – Take 1 Superficial Willpower damange to reroll up to 3 dice."
  );
  const btnWipe = createQuickBtn(
    "clearOverlay",
    "Wipe",
    "#6c757d",
    "Wipe Overlay – Remove the dice result overlay."
  );
  const btnMend = createQuickBtn(
    "quickMend",
    "Mend",
    "#198754",
    "Mend – Heal superficial Health based on Blood Potency with a Rouse check."
  );

  // --- Export / Import buttons --------------------------------------
  const btnImport = document.createElement("button");
  btnImport.id = "importJsonBtn";
  btnImport.className = "btn btn-outline-light p-1";
  btnImport.innerHTML = "📂";
  btnImport.setAttribute("title", "Import character from JSON");
  btnImport.setAttribute("data-bs-toggle", "tooltip");

  const btnExport = document.createElement("button");
  btnExport.id = "exportJsonBtn";
  btnExport.className = "btn btn-outline-light p-1";
  btnExport.innerHTML = "💾";
  btnExport.setAttribute("title", "Export character to JSON");
  btnExport.setAttribute("data-bs-toggle", "tooltip");


  const btnClear = document.createElement("button");
  btnClear.id = "clearBtn";
  btnClear.className = "btn btn-outline-light p-1";
  btnClear.innerHTML = "🗑️";
  btnClear.setAttribute("title", "Clear the character sheet");
  btnClear.setAttribute("data-bs-toggle", "tooltip");

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "application/json";
  fileInput.style.display = "none";

  bar.appendChild(btnRouse);
  bar.appendChild(btnRemorse);
  bar.appendChild(btnFrenzy);
  bar.appendChild(btnWPReroll);
  bar.appendChild(btnWipe);
  bar.appendChild(btnClear);
  bar.appendChild(btnMend);
  bar.appendChild(btnImport);
  bar.appendChild(btnExport);
  bar.appendChild(fileInput);

  // ------------------------------------------------------------------
  //  Export / Import logic (leverages backup-manager helpers)
  // ------------------------------------------------------------------

  // 5) Quick-roll handlers -------------------------------------------
  btnRouse.addEventListener("click", () => quickRoll({ standard: 0, hunger: 0, rouse: 1, remorse: 0, frenzy: 0 }));

  btnRemorse.addEventListener("click", () => {
    const diceCount = computeRemorseDice();
    quickRoll({ standard: 0, hunger: 0, rouse: 0, remorse: diceCount, frenzy: 0 });
  });

  btnFrenzy.addEventListener("click", () => {
    const diceCount = computeFrenzyDice();
    quickRoll({ standard: 0, hunger: 0, rouse: 0, remorse: 0, frenzy: diceCount });
  });

  // 6) WP Reroll button ----------------------------------------------
  btnWPReroll.addEventListener("click", handleWPRerollClick);

  // Track previous state so we can animate when the button becomes enabled
  let wasWPRerollDisabled = true;
  function refreshWPRerollButton() {
    const nowDisabled = !isWPRerollAllowed();
    btnWPReroll.disabled = nowDisabled;
    if (wasWPRerollDisabled && !nowDisabled) {
      btnWPReroll.classList.add("pulse-once");
      setTimeout(() => btnWPReroll.classList.remove("pulse-once"), 1500);
    }
    wasWPRerollDisabled = nowDisabled;
  }

  // Expose so dice-overlay.js can invoke it after rolls
  window.refreshWPRerollButton = refreshWPRerollButton;

  // 7) Wipe button ----------------------------------------------------
  btnWipe.addEventListener("click", clearOverlay);

  // ----------------------------------------------------
  //  Clear Sheet confirmation modal
  // ----------------------------------------------------
  let clearSheetModalInstance;
  function ensureClearSheetModal() {
    if (clearSheetModalInstance) return clearSheetModalInstance;

    // Only inject the markup once
    if (!document.getElementById('clearSheetModal')) {
      const modalHtml = `
        <div class="modal fade" id="clearSheetModal" tabindex="-1" aria-labelledby="clearSheetModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content bg-dark text-light border-secondary">
              <div class="modal-header border-secondary">
                <h5 class="modal-title" id="clearSheetModalLabel">Clear Character Sheet</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Are you sure you want to clear the character sheet? This will remove all character data.
              </div>
              <div class="modal-footer border-secondary">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-danger" id="confirmClearSheet">Yes, Clear</button>
              </div>
            </div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const el = document.getElementById('clearSheetModal');
    clearSheetModalInstance = bootstrap.Modal.getOrCreateInstance(el);

    // Bind confirm button only once
    const btnYes = el.querySelector('#confirmClearSheet');
    if (!btnYes.dataset.bound) {
      btnYes.addEventListener('click', () => {
        performClearSheet();
        clearSheetModalInstance.hide();
      });
      btnYes.dataset.bound = '1';
    }
    return clearSheetModalInstance;
  }

  // Actual clearing logic extracted into its own function
  function performClearSheet() {
    // Clear all input fields and textareas
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
      input.value = '';
      // Trigger input event for textareas to reset their height
      if (input.tagName.toLowerCase() === 'textarea') {
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';
      }
    });
    document.querySelectorAll('select').forEach(select => select.value = '');
    document.querySelectorAll('.dots').forEach(dots => {
      dots.setAttribute('data-value', '0');
      dots.querySelectorAll('.dot').forEach(dot => dot.classList.remove('filled'));
    });
    
    // Reset tracks
    document.querySelectorAll('.track-container').forEach(track => {
      const max = track.querySelectorAll('.track-box').length;
      track.setAttribute('data-value', max);
      track.querySelectorAll('.track-box').forEach(box => {
        box.classList.remove('superficial', 'aggravated', 'filled', 'stained');
      });
      const header = track.querySelector('.track-header span:first-child');
      if (header) header.textContent = `Current: ${max}`;
    });

    // Clear any specialty data
    document.querySelectorAll('[data-specialties]').forEach(el => el.removeAttribute('data-specialties'));
    
    // Refresh specialty display for all skills
    if (window.specialtyManager && typeof window.specialtyManager.refreshRow === 'function') {
      const SKILL_NAMES = [
        'athletics','brawl','craft','drive','firearms','larceny','melee','stealth','survival',
        'animal ken','etiquette','insight','intimidation','leadership','performance','persuasion','streetwise','subterfuge',
        'academics','awareness','finance','investigation','medicine','occult','politics','science','technology'
      ];
      SKILL_NAMES.forEach(skill => {
        const cap = skill.replace(/\b\w/g, c => c.toUpperCase());
        window.specialtyManager.refreshRow(cap);
      });
    }

    // Reset convictions
    if (window.convictionManager) {
      window.convictionManager.convictions = [];
      $('#conviction-column-1, #conviction-column-2, #conviction-column-3').empty();
    }

    // Clear any manager data if available and reinitialize
    try {
      // Clear and reinitialize each manager
      if (window.disciplineManager) {
        window.disciplineManager.selectedDisciplines = new Map();
        window.disciplineManager.renderDisciplineManager();
      }
      if (window.meritFlawManager) {
        window.meritFlawManager.selectedMerits = new Map();
        window.meritFlawManager.selectedFlaws = new Map();
        window.meritFlawManager.renderMeritManager();
        window.meritFlawManager.renderFlawManager();
      }
      if (window.backgroundManager) {
        window.backgroundManager.selectedBackgrounds = new Map();
        window.backgroundManager.selectedBackgroundFlaws = new Map();
        window.backgroundManager.renderBackgroundManager();
        window.backgroundManager.renderBackgroundFlawManager();
      }
      if (window.coterieManager) {
        window.coterieManager.selectedMerits = new Map();
        window.coterieManager.selectedFlaws = new Map();
        window.coterieManager.renderCoterieMeritManager();
        window.coterieManager.renderCoterieFlawManager();
      }
      if (window.loresheetManager) {
        window.loresheetManager.selectedLoresheets = new Map();
        window.loresheetManager.renderLoresheetManager();
      }

      // Force reinitialize managers if they exist
      if (typeof window.initManagers === 'function') {
        window.initManagers();
      }

      // Clear the file input
      fileInput.value = '';
    } catch (err) {
      console.error('Error clearing managers:', err);
     window.toastManager.show("Error clearing some data. Please refresh the page.", "danger");
    }

    // Clear Experience / XP data
    try {
      if (typeof window.setXPData === 'function') {
        window.setXPData({ total: 0, spent: 0, history: [] });
      } else {
        try {
          // Use IndexedDB exclusively
          if (window.databaseManager) {
            window.databaseManager.setSetting('xpData', { total: 0, spent: 0, history: [] }).catch(err => {
              console.warn('Failed to clear XP data from IndexedDB:', err);
            });
          } else {
            console.error('No database manager available for XP data clearing');
          }
        } catch (e) {
          console.warn('Failed to remove XP data from storage', e);
        }
        ['total-xp', 'spent-xp', 'available-xp'].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.textContent = '0';
        });
        const hist = document.getElementById('experience-history');
        if (hist) hist.innerHTML = '';
      }
    } catch (xpErr) {
      console.error('Error clearing XP data:', xpErr);
    }

    window.toastManager.show("Character sheet cleared", "success");
  }

  // Expose performClearSheet globally
  window.performClearSheet = performClearSheet;

  // 7b) Clear Sheet button --------------------------------------------
  btnClear.addEventListener('click', () => {
    ensureClearSheetModal().show();
  });

  // 5b) Mend button handler -------------------------------------------
  btnMend.addEventListener("click", () => {
    // Helper to find the Blood Potency value from the sheet (0–5)
    function getBloodPotency() {
      const rows = document.querySelectorAll(".stat");
      for (const row of rows) {
        const lbl = row.querySelector(".stat-label");
        if (lbl && lbl.textContent.trim().toLowerCase() === "blood potency") {
          const dots = row.querySelector(".dots");
          if (dots && dots.dataset.value !== undefined) {
            const val = parseInt(dots.dataset.value, 10);
            return isNaN(val) ? 0 : val;
          }
        }
      }
      return 0;
    }

    // Determine how much to heal based on Blood Potency lookup
    const bpVal = getBloodPotency();
    const healAmt = bpData.getHealingAmount ? bpData.getHealingAmount(bpVal) : 1;

    // Heal superficial Health damage
    const container = document.querySelector('.track-container[data-type="health"]');
    if (container) {
      const superficialBoxes = Array.from(container.querySelectorAll('.track-box.superficial'));
      
      // Check if there's any damage to heal
      if (superficialBoxes.length === 0) {
        window.toastManager.show('No superficial damage to mend', 'warning');
        return;
      }

      const toHeal = Math.min(healAmt, superficialBoxes.length);
      // Heal starting from the rightmost (last) superficial box
      superficialBoxes.slice(-toHeal).forEach(box => box.classList.remove('superficial'));

      // Update displayed current health value
      const total = container.querySelectorAll('.track-box').length;
      const damagedNow = container.querySelectorAll('.track-box.superficial, .track-box.aggravated').length;
      const newVal = total - damagedNow;
      container.setAttribute('data-value', newVal);
      const header = container.querySelector('.track-header span:first-child');
      if (header) header.textContent = `Current: ${newVal}`;

      window.toastManager.show(`Mended ${toHeal} superficial Health damage`, 'success');
    } else {
      window.toastManager.show('Health track not found', 'danger');
    }

    // Always perform a Rouse check to see if Hunger increases
    quickRoll({ standard: 0, hunger: 0, rouse: 1, remorse: 0, frenzy: 0 });
  });

  // 8) Export / Import handlers --------------------------------------
  btnExport.addEventListener("click", () => {
    if (typeof window.gatherCharacterData !== "function") {
      console.error("gatherCharacterData is not available");
      window.toastManager.show("Export failed: missing dependency", "danger");
      return;
    }
    try {
      const data = window.gatherCharacterData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const filename = `${(data.name || "character").toString().replace(/[^a-z0-9_\-]/gi, "_")}.json`;
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      window.toastManager.show("Failed to export character", "danger");
    }
  });

  btnImport.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (evt) => {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof window.loadCharacterData === "function") {
          window.loadCharacterData(data);
          window.toastManager.show("Character imported successfully", "success");
        } else {
          window.toastManager.show('Import logic unavailable', 'danger', 'Control Bar');
        }
      } catch (err) {
        console.error(err);
        window.toastManager.show("Failed to import character: invalid JSON", "danger");
      }
      // Clear the file input so it can be reused
      evt.target.value = '';
    };
    reader.readAsText(file);
  });

  // --- Progeny mapping helpers ---------------------------------------
  function disciplineNameToKey(name) {
    if (!name) return "";
    const lower = name.toLowerCase();
    const specialMap = {
      "blood sorcery": "bloodSorcery",
      "thin-blood alchemy": "thinBloodAlchemy",
    };
    return specialMap[lower] || lower.replace(/[^a-z]/g, "");
  }

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

  // Initial state and periodic refresh
  refreshWPRerollButton();
  setInterval(refreshWPRerollButton, 1000);

  // Theme button
  const themeContainer = document.createElement("div");
  themeContainer.className = "form-check form-switch mb-3 d-flex flex-column align-items-center";
  themeContainer.innerHTML = `
    <div class="d-flex justify-content-center w-100" style="height: 32px;">
      <button class="btn btn-sm p-0 d-flex align-items-center justify-content-center" id="openThemeModal" style="width: 32px; max-width: 64px; height: 32px;" title="Choose color theme" data-bs-toggle="tooltip">🎨</button>
    </div>
    <label class="form-check-label text-center w-100 mt-1">Themes</label>
  `;
  bar.appendChild(themeContainer);

  // Theme modal elements
  let themeModalEl;
  let themeModalInstance;

  function ensureThemeModal() {
    // Add CSS once for multi-column layout inside the theme modal
    if (!document.getElementById("theme-modal-style")) {
      const s = document.createElement("style");
      s.id = "theme-modal-style";
      s.textContent = `
        /* Multi-column layout for long radio lists */
        #themeModal .clan-options,
        #themeModal .access-options {
          column-count: 2;
          column-gap: 1rem;
        }
        @media (min-width: 768px) {
          #themeModal .clan-options { column-count: 3; }
        }
        #themeModal .clan-options .form-check,
        #themeModal .access-options .form-check {
          break-inside: avoid;
        }
      `;
      document.head.appendChild(s);
    }
    if (themeModalEl) return;
    const modalHtml = `
      <div class="modal fade" id="themeModal" tabindex="-1" aria-labelledby="themeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header">
              <h5 class="modal-title" id="themeModalLabel">Color Scheme</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body vstack gap-2">
              <h6 class="mt-2">Default Palettes</h6>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="schemeRadios" id="schemeMasquerade" value="default">
                <label class="form-check-label" for="schemeMasquerade">Blood & Roses (Dark)</label>
              </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="schemeRadios" id="schemeIvory" value="ivory">
                <label class="form-check-label" for="schemeIvory">Ivory Tower (Light)</label>
              </div>

              <h6 class="mt-2">Accessibility Palettes</h6>
              <div class="access-options">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="schemeRadios" id="schemeHCDark" value="hc-dark">
                  <label class="form-check-label" for="schemeHCDark">High Contrast – Dark</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="schemeRadios" id="schemeHCLight" value="hc-light">
                  <label class="form-check-label" for="schemeHCLight">High Contrast – Light</label>
                </div>
              <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="schemeRadios" id="schemeDyslexia" value="dyslexia">
                <label class="form-check-label" for="schemeDyslexia">Dyslexia-Friendly</label>
              </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="schemeRadios" id="schemeDaltonic" value="daltonic">
                  <label class="form-check-label" for="schemeDaltonic">Daltonic (Blue/Orange)</label>
                </div>
              </div>

              <h6 class="mt-2">Clan Palettes</h6>
              <div class="clan-options">
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeBanu" value="banu"><label class="form-check-label" for="schemeBanu">Banu Haqim</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeBrujah" value="brujah"><label class="form-check-label" for="schemeBrujah">Brujah</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeGangrel" value="gangrel"><label class="form-check-label" for="schemeGangrel">Gangrel</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeHecata" value="hecata"><label class="form-check-label" for="schemeHecata">Hecata</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeLasombra" value="lasombra"><label class="form-check-label" for="schemeLasombra">Lasombra</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeMalkavian" value="malkavian"><label class="form-check-label" for="schemeMalkavian">Malkavian</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeMinistry" value="ministry"><label class="form-check-label" for="schemeMinistry">The Ministry</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeNosferatu" value="nosferatu"><label class="form-check-label" for="schemeNosferatu">Nosferatu</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeRavnos" value="ravnos"><label class="form-check-label" for="schemeRavnos">Ravnos</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeSalubri" value="salubri"><label class="form-check-label" for="schemeSalubri">Salubri</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeToreador" value="toreador"><label class="form-check-label" for="schemeToreador">Toreador</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeTremere" value="tremere"><label class="form-check-label" for="schemeTremere">Tremere</label></div>
                <div class="form-check"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeTzimisce" value="tzimisce"><label class="form-check-label" for="schemeTzimisce">Tzimisce</label></div>
                <div class="form-check mb-1"><input class="form-check-input" type="radio" name="schemeRadios" id="schemeVentrue" value="ventrue"><label class="form-check-label" for="schemeVentrue">Ventrue</label></div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="saveThemeChoice">Apply</button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
    themeModalEl = document.getElementById("themeModal");
    themeModalInstance = bootstrap.Modal.getOrCreateInstance(themeModalEl);

    themeModalEl.querySelector("#saveThemeChoice").addEventListener("click", () => {
      const selected = themeModalEl.querySelector("input[name='schemeRadios']:checked");
      if (selected) {
        applyTheme(selected.value);
        themeModalInstance.hide();
      }
    });
  }

  function applyTheme(themeKey) {
    if (themeKey === "default") {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", themeKey);
    }
    
    // Use IndexedDB exclusively
    if (window.databaseManager) {
      window.databaseManager.setSetting('theme', themeKey).catch(err => {
        console.error('Failed to save theme to IndexedDB:', err);
      });
    } else {
      console.error('No database manager available for theme storage');
    }
  }

  // Theme auto-detect: if user prefers light mode and has not set a theme, use 'ivory' on first visit
  async function loadTheme() {
    try {
      // Use IndexedDB exclusively
      if (window.databaseManager) {
        const savedTheme = await window.databaseManager.getSetting('theme');
        if (savedTheme && savedTheme !== "default") {
          document.body.setAttribute("data-theme", savedTheme);
          return;
        }
      }
      
      console.log('No theme found in IndexedDB, using default');
    } catch (err) {
      console.error('Failed to load theme from IndexedDB:', err);
    }
  }

  // Check if theme is set (for auto-detect)
  async function isThemeSet() {
    try {
      if (window.databaseManager) {
        const savedTheme = await window.databaseManager.getSetting('theme');
        return !!savedTheme;
      }
      return false;
    } catch (err) {
      console.error('Failed to check theme in IndexedDB:', err);
      return false;
    }
  }

  // Initialize theme
  (async function initTheme() {
    const themeSet = await isThemeSet();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches && !themeSet) {
      document.body.setAttribute('data-theme', 'ivory');
    }
    await loadTheme();
  })();

  themeContainer.querySelector("#openThemeModal").addEventListener("click", () => {
    ensureThemeModal();
    const current = document.body.getAttribute("data-theme") || "default";
    const modal = document.getElementById("themeModal");
    if (modal) {
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) bsModal.show();
    }
  });

  // ------------------------------------------------------------------
  //  Re-arrange buttons into logical groups & add separators
  // ------------------------------------------------------------------

  function makeGroup(...els) {
    const g = document.createElement("div");
    g.className = "btn-group";
    els.forEach(el => g.appendChild(el));
    return g;
  }

  function makeDivider() {
    const d = document.createElement("div");
    return d;
  }

  // Move existing buttons into fresh groups (DOM nodes are re-parented automatically)
  const groupQuick = makeGroup(btnRouse, btnRemorse, btnFrenzy);
  const groupUtility = makeGroup(btnWPReroll, btnMend, btnWipe);
  const groupData = makeGroup(btnImport, btnExport, btnClear);
  const groupIntegrations = makeGroup(btnProgeny, btnDiscord, btnDiceHelp);
  const groupAppearance = makeGroup(themeContainer, toggleWrapper);
  groupIntegrations.style.justifySelf = "center";

  // Clear current order and rebuild layout
  // (File input stays, it's invisible and doesn't affect layout)
  [btnRouse, btnRemorse, btnFrenzy, btnWPReroll, btnWipe, btnClear, btnMend, btnExport, btnImport, themeContainer, toggleWrapper, btnRoll].forEach(el => {
    // They are already in the bar – remove so we can control order
    if (el.parentElement === bar) bar.removeChild(el);
  });

  // Re-append in the desired structured order
  bar.appendChild(btnRoll);
  bar.appendChild(makeDivider());
  bar.appendChild(groupQuick);
  bar.appendChild(makeDivider());
  bar.appendChild(groupUtility);
  bar.appendChild(makeDivider());
  bar.appendChild(groupData);
  bar.appendChild(makeDivider());
  bar.appendChild(groupIntegrations);
  bar.appendChild(makeDivider());
  bar.appendChild(groupAppearance);

  // Activate Bootstrap tooltips on all elements that declared them
  if (window.bootstrap && bootstrap.Tooltip) {
    Array.from(bar.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(el =>
      bootstrap.Tooltip.getOrCreateInstance(el));
  }

  // Reserve space so main content never hides behind the fixed footer
  function adjustBodyPadding() {
    document.body.style.paddingBottom = bar.offsetHeight + "px";
  }
  adjustBodyPadding();
  window.addEventListener("resize", adjustBodyPadding);

  // 2c) Lock / Unlock button with label ---------------------------------------
  const lockContainer = document.createElement("div");
  lockContainer.className = "form-check form-switch mb-3 d-flex flex-column align-items-center";

  const lockBtnWrapper = document.createElement("div");
  lockBtnWrapper.className = "d-flex justify-content-center align-items-center w-100";
  lockBtnWrapper.style.height = "32px";

  const btnLock = document.createElement("button");
  btnLock.id = "btn-lock";
  btnLock.className = "btn btn-secondary p-1 d-flex align-items-center justify-content-center";
  btnLock.style.backgroundColor = "transparent";
  btnLock.style.border = 0;

  lockBtnWrapper.appendChild(btnLock);

  const lockLabel = document.createElement("label");
  lockLabel.className = "form-check-label text-center w-100 mt-1";
  lockLabel.textContent = "Lock";

  lockContainer.appendChild(lockBtnWrapper);
  lockContainer.appendChild(lockLabel);

  updateLockButtonUI();
  // Group lock container with Theme + Info
  groupAppearance.appendChild(lockContainer);

  // React to lock-state changes from elsewhere (e.g., page load)
  document.addEventListener('ledger-lock-change', () => {
    updateLockButtonUI();
  });

  // Ensure Lock confirmation modal exists (added in index.html)
  const lockModalEl = document.getElementById("lockModal");
  let lockModalInstance;
  if (lockModalEl) {
    lockModalInstance = bootstrap.Modal.getOrCreateInstance(lockModalEl);
    const confirmBtn = lockModalEl.querySelector("#confirmLockBtn");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        LockManager.lock();
        updateLockButtonUI();
        lockModalInstance.hide();
      });
    }
  }

  const unlockModalEl = document.getElementById("unlockModal");
  let unlockModalInstance;
  if(unlockModalEl){
    unlockModalInstance = bootstrap.Modal.getOrCreateInstance(unlockModalEl);
    const confirmUnlock = unlockModalEl.querySelector('#confirmUnlockBtn');
    if(confirmUnlock){
      confirmUnlock.addEventListener('click', () => {
        LockManager.unlock();
        updateLockButtonUI();
        unlockModalInstance.hide();
      });
    }
  }

  btnLock.addEventListener("click", () => {
    // Unlock flow -----------------------------------------------------------
    if (LockManager.isLocked()) {
      if (unlockModalInstance) {
        unlockModalInstance.show();
      } else if (TraitManagerUtils.showConfirmModal("Unlock character for editing?")) {
        LockManager.unlock();
        updateLockButtonUI();
      }
      return;
    }

    // Lock flow -------------------------------------------------------------
    if (lockModalInstance) {
      lockModalInstance.show();
    } else {
      // Fallback simple confirm if modal missing
      if (TraitManagerUtils.showConfirmModal("Lock character for play mode?")) {
        LockManager.lock();
        updateLockButtonUI();
      }
    }
  });

  function updateLockButtonUI() {
    if (LockManager.isLocked()) {
      btnLock.innerHTML = `<i class=\"bi bi-unlock\"></i>`;
      lockLabel.textContent = "Unlock";
      lockContainer.setAttribute("title", "Lock Character");
      lockContainer.setAttribute("data-bs-toggle", "tooltip");
    } else {
      btnLock.innerHTML = `<i class=\"bi bi-lock\"></i>`;
      lockLabel.textContent = "Lock";
      lockContainer.setAttribute("title", "Unlock Character");
      lockContainer.setAttribute("data-bs-toggle", "tooltip");
    }
  }
 
  return bar;
} 