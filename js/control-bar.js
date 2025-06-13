/*
 * control-bar.js
 * Bottom-left floating control bar used across Ledger – extracted from dice-overlay.js
 */

import { getDiscordWebhook, setDiscordWebhook, createWebhookModal } from "./discord-integration.js";

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
    "position-fixed bottom-0 start-0 m-3 p-2 bg-dark bg-opacity-75 rounded d-flex align-items-center gap-3 flex-wrap";
  bar.style.zIndex = "2100";
  document.body.appendChild(bar);

  // 1) Info-mode toggle ------------------------------------------------
  const toggleWrapper = document.createElement("div");
  toggleWrapper.className = "form-check form-switch d-flex align-items-center text-white";
  toggleWrapper.innerHTML = `
    <input class="form-check-input" type="checkbox" id="toggleInfoMode">
    <label class="form-check-label ms-2" for="toggleInfoMode">Info Mode</label>
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
  btnDiscord.className = "btn btn-secondary p-1 d-flex align-items-center";
  btnDiscord.style.backgroundColor = "transparent";
  btnDiscord.style.border = 0;
  btnDiscord.innerHTML = `<img src="assets/Discord-Symbol-Blurple.png" alt="Discord" style="width:34px;height:24px;">`;
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
  btnProgeny.className = "btn btn-secondary p-1 d-flex align-items-center";
  btnProgeny.style.backgroundColor = "transparent";
  btnProgeny.style.border = 0;
  btnProgeny.innerHTML = `<img src="assets/progeny-icon.svg" alt="Progeny" style="width:28px;height:32px;">`;
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
          showToast("Progeny character imported", "success");
        } else {
          alert("Import logic unavailable");
        }
      } catch (err) {
        console.error(err);
        showToast("Failed to import Progeny JSON", "danger");
      }
    };
    reader.readAsText(file);
  });

  // 3) Main Roll button ------------------------------------------------
  const btnRoll = document.createElement("button");
  btnRoll.id = "openDiceRoll";
  btnRoll.className = "btn btn-danger";
  btnRoll.textContent = "Roll";
  bar.appendChild(btnRoll);
  // (Actual click handler lives in dice-overlay.js)

  // 4) Utility for creating small quick-action buttons -----------------
  function createQuickBtn(id, text, hexColor) {
    const b = document.createElement("button");
    b.id = id;
    b.className = "btn";
    b.textContent = text;
    b.style.backgroundColor = hexColor;
    b.style.color = "#fff";
    return b;
  }

  const btnRouse = createQuickBtn("quickRouse", "Rouse", "#331D43");
  const btnRemorse = createQuickBtn("quickRemorse", "Remorse", "#19305B");
  const btnFrenzy = createQuickBtn("quickFrenzy", "Frenzy", "#B83B1A");
  const btnWPReroll = createQuickBtn("quickWPReroll", "WP Reroll", "#0d6efd");
  const btnClear = createQuickBtn("clearOverlay", "Wipe", "#6c757d");

  // --- Export / Import buttons --------------------------------------
  const btnExport = document.createElement("button");
  btnExport.id = "exportJsonBtn";
  btnExport.className = "btn btn-outline-light";
  btnExport.textContent = "Export";

  const btnImport = document.createElement("button");
  btnImport.id = "importJsonBtn";
  btnImport.className = "btn btn-outline-light";
  btnImport.textContent = "Import";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "application/json";
  fileInput.style.display = "none";

  bar.appendChild(btnRouse);
  bar.appendChild(btnRemorse);
  bar.appendChild(btnFrenzy);
  bar.appendChild(btnWPReroll);
  bar.appendChild(btnClear);
  bar.appendChild(btnExport);
  bar.appendChild(btnImport);
  bar.appendChild(fileInput);

  // ------------------------------------------------------------------
  //  Export / Import logic (leverages backup-manager helpers)
  // ------------------------------------------------------------------

  function showToast(message, type = "info") {
    if (!window.bootstrap) {
      alert(message);
      return;
    }
    const toastHtml = `
      <div class="toast align-items-center text-white bg-${type === "success" ? "success" : "danger"} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>`;
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container position-fixed top-0 end-0 p-3";
      document.body.appendChild(container);
    }
    container.insertAdjacentHTML("beforeend", toastHtml);
    const toastEl = container.lastElementChild;
    const toastInst = new bootstrap.Toast(toastEl, { autohide: true, delay: 3000 });
    toastInst.show();
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  }

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

  function refreshWPRerollButton() {
    btnWPReroll.disabled = !isWPRerollAllowed();
  }

  // Expose so dice-overlay.js can invoke it after rolls
  window.refreshWPRerollButton = refreshWPRerollButton;

  // 7) Wipe button ----------------------------------------------------
  btnClear.addEventListener("click", clearOverlay);

  // 8) Export / Import handlers --------------------------------------
  btnExport.addEventListener("click", () => {
    if (typeof window.gatherCharacterData !== "function") {
      console.error("gatherCharacterData is not available");
      showToast("Export failed: missing dependency", "danger");
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
      showToast("Failed to export character", "danger");
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
          showToast("Character imported successfully", "success");
        } else {
          alert("Import logic unavailable");
        }
      } catch (err) {
        console.error(err);
        showToast("Failed to import character: invalid JSON", "danger");
      }
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

  return bar;
} 