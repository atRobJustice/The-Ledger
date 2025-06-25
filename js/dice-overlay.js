// New file implementing dice overlay logic

// dice-overlay.js: Adds a floating "Roll Dice" button to the character sheet. Pressing it opens a modal to choose dice pools (standard, hunger, etc.). After confirmation, a full-screen overlay appears and uses the existing dice-roller engine (Three.js, Cannon.js, Teal.js, dice.js, dice-vtm.js) to roll the dice above the sheet.

// NOTE: This file assumes Bootstrap CSS & JS are already loaded on the page (as is the case for index.html).

import { getDiscordWebhook, setDiscordWebhook, sendToDiscord, buildRollEmbed, getCharacterName, createWebhookModal } from "./discord-integration.js";
import { initControlBar } from "./control-bar.js";
import { bloodPotency as bpData } from "./references/blood_potency.js";
import { disciplines } from "./disciplines.js";

// New flag: track whether the most recent roll used Blood Surge
let lastRollHadBloodSurge = false;

// Tracks the latest impairment message to display on overlay
let latestImpairmentMessage = null;

// Tracks latest Blood Potency discipline bonus banner
let latestDisciplineBonusMessage = null;

// NEW: Tracks latest Resonance temperament bonus banner
let latestResonanceBonusMessage = null;

// NEW: Tracks latest Specialty bonus banner
let latestSpecialtyBonusMessage = null;

// declare at top of IIFE maybe near other globals
let bonusMsg = null;

(function () {
  "use strict";

  // -------------------------------------------------------------
  //  Helper: Dynamically load external script files exactly once.
  // -------------------------------------------------------------
  const loadedScripts = new Set();
  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      if (loadedScripts.has(src)) {
        // Already loaded (or in progress). Wait until load event fires.
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing && existing.dataset.loaded === "true") {
          resolve();
        } else {
          existing?.addEventListener("load", () => resolve());
        }
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        script.dataset.loaded = "true";
        loadedScripts.add(src);
        resolve();
      };
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  async function ensureDiceEngineLoaded() {
    await loadScriptOnce(`js/lib/three.min.js`);
    await loadScriptOnce(`js/lib/cannon.min.js`);
    await loadScriptOnce(`js/lib/teal.min.js`);
    await loadScriptOnce(`js/dice.js`);
    await loadScriptOnce(`js/dice-vtm.js`);
  }

  // -------------------------------------------------------------
  //  Discord integration helpers have been moved to "discord-integration.js" and are imported at the top of this file.
  // -------------------------------------------------------------

  // ----------------------------------------
  //  UI MARKUP helpers (Bootstrap 5 classes)
  // ----------------------------------------
  function createModal() {
    const content = `
      <div class="alert alert-danger d-none" id="impairmentNote" role="alert"></div>
      <div class="alert alert-success d-none" id="bonusNote" role="alert"></div>
      <div class="alert alert-info d-none" id="breakdownNote" role="alert"></div>
      <form id="diceRollForm">
        <!-- Blood Surge toggle -->
        <div class="form-check form-switch mb-3" id="bloodSurgeToggleWrapper">
          <input class="form-check-input" type="checkbox" id="bloodSurgeToggle">
          <label class="form-check-label" for="bloodSurgeToggle">Blood Surge</label>
          <span class="badge" style="background-color: var(--accent); color: white;" id="bloodSurgeBonus">+0</span>
        </div>
        <!-- Specialty selection (hidden if not applicable) -->
        <div class="mb-3 d-none" id="specialtySection">
          <label for="specialtySelect" class="form-label">Specialty (optional)</label>
          <select class="form-select" id="specialtySelect"></select>
          <div class="form-check form-switch mt-2">
            <input class="form-check-input" type="checkbox" id="applySpecialtyCheckbox">
            <label class="form-check-label" for="applySpecialtyCheckbox">Apply +1 die</label>
          </div>
          <hr/>
        </div>
        <!-- Difficulty input -->
        <div class="mb-3 row">
          <label for="difficultyInput" class="col-sm-4 col-form-label fw-bold">Difficulty</label>
          <div class="col-sm-8">
            <input type="number" class="form-control bg-dark text-light text-center" id="difficultyInput" min="1" value="1">
          </div>
          <div class="fst-italic small">Number of successes set by Storyteller to accomplish the action. Rouse, Remorse, & Frenzy checks ignore Difficulty.</div>
        </div>
        ${generateNumberInput("standard", "Standard")}
        ${generateNumberInput("hunger", "Hunger")}
        ${generateNumberInput("rouse", "Rouse")}
        ${generateNumberInput("remorse", "Remorse")}
        ${generateNumberInput("frenzy", "Frenzy")}
      </form>
    `;

    const footer = `
      <button type="button" class="btn theme-btn-primary" id="rollDiceConfirm">Roll</button>
    `;

    const { modalElement, modalInstance } = modalManager.showCustom({
      title: 'Roll Dice',
      content,
      footer,
      size: 'default',
      centered: false,
      showCloseButton: true
    }, (element, instance) => {
      // Add keyboard event listener for Enter key
      element.querySelector("#diceRollForm").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          element.querySelector("#rollDiceConfirm").click();
        }
      });

      // Prevent form submission from reloading or re-triggering modal
      element.querySelector("#diceRollForm").addEventListener("submit", (e) => {
        e.preventDefault();
      });

      // Ensure Difficulty input never goes below 1
      const difficultyInput = element.querySelector("#difficultyInput");
      difficultyInput.addEventListener("input", () => {
        const value = parseInt(difficultyInput.value);
        if (isNaN(value) || value < 1) {
          difficultyInput.value = 1;
        }
      });
      difficultyInput.addEventListener("blur", () => {
        const value = parseInt(difficultyInput.value);
        if (isNaN(value) || value < 1) {
          difficultyInput.value = 1;
        }
      });

      // Attach confirm handler only once
      element.querySelector("#rollDiceConfirm").addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pools = {
          standard: parseInt(element.querySelector("#standardInput").value) || 0,
          hunger: parseInt(element.querySelector("#hungerInput").value) || 0,
          rouse: parseInt(element.querySelector("#rouseInput").value) || 0,
          remorse: parseInt(element.querySelector("#remorseInput").value) || 0,
          frenzy: parseInt(element.querySelector("#frenzyInput").value) || 0,
          difficulty: parseInt(element.querySelector("#difficultyInput").value) || 1,
        };

        // ----------------------------------------------------
        //  Blood Surge – adds dice & a mandatory Rouse check
        // ----------------------------------------------------
        const bloodSurgeToggle = element.querySelector("#bloodSurgeToggle");
        const bloodSurgeOn = bloodSurgeToggle && bloodSurgeToggle.checked;
        if (bloodSurgeOn) {
          const bpVal = getStatValueByName("Blood Potency");
          const surgeBonus = (typeof bpData?.getBloodSurgeBonus === "function") ? (bpData.getBloodSurgeBonus(bpVal) || 0) : 0;
          pools.standard += surgeBonus;
          pools.rouse += 1;
          lastRollHadBloodSurge = true;
        } else {
          lastRollHadBloodSurge = false;
        }

        instance.hide();

        // Ensure libs loaded
        await ensureDiceEngineLoaded();

        // Create overlay & roll
        const canvasContainer = createOverlay();
        if (latestImpairmentMessage) {
          const banner = document.createElement('div');
          banner.className = 'position-absolute top-0 start-50 translate-middle-x bg-danger bg-opacity-75 text-white fw-bold py-1 px-3 rounded dice-banner';
          banner.textContent = latestImpairmentMessage;
          canvasContainer.appendChild(banner);
        }
        rollVtmDice(canvasContainer, pools, () => {});
        // Update WP reroll availability after roll
        if (typeof window.refreshWPRerollButtonLocal === "function") {
          window.refreshWPRerollButtonLocal();
        }
      });
    });

    return modalElement;
  }

  function generateNumberInput(id, label) {
    return `
      <div class="mb-3 row">
        <label for="${id}Input" class="col-sm-4 col-form-label fw-bold">${label} dice</label>
        <div class="col-sm-8">
          <input type="number" class="form-control bg-dark text-light text-center" id="${id}Input" min="0" value="0">
        </div>
      </div>`;
  }

  function createOverlay() {
    // Ensure no duplicate overlays
    const existing = document.getElementById("dice-overlay");
    if (existing) existing.remove();
    const overlay = document.createElement("div");
    overlay.id = "dice-overlay";

    const canvas = document.createElement("div");
    canvas.id = "dice-canvas";
    overlay.appendChild(canvas);

    document.body.appendChild(overlay);
    return canvas;
  }

  // Get existing overlay if present; otherwise create a new one WITHOUT deleting any current overlay.
  function getOrCreateOverlay() {
    const canvas = document.getElementById("dice-canvas");
    if (canvas) return canvas;
    return createOverlay();
  }

  // --------------------------------------------------
  //  Stat selection & dice pool calculation helpers
  // --------------------------------------------------
  // List of Attribute names (case-insensitive)
  const ATTRIBUTE_NAMES = [
    "strength",
    "dexterity",
    "stamina",
    "charisma",
    "manipulation",
    "composure",
    "intelligence",
    "wits",
    "resolve",
  ];

  // List of Skill names (case-insensitive)
  const SKILL_NAMES = [
    'athletics','brawl','craft','drive','firearms','larceny','melee','stealth','survival',
    'animal ken','etiquette','insight','intimidation','leadership','performance','persuasion','streetwise','subterfuge',
    'academics','awareness','finance','investigation','medicine','occult','politics','science','technology'
  ];

  // Currently selected stats
  let firstStatName = null;   // must be attribute
  let secondStatName = null;  // attribute, skill, or skill/discipline
  let thirdStatName = null;   // skill or discipline (only if second stat is skill/discipline)
  var selectedSpecialty = null; // globally accessible; will hold {skill, name} or null
  // Currently selected Discipline power (if any)
  //  Structure: { element, disciplineKey, powerName, rouseDice }
  let activePower = null;

  // -------------------------------------------------------------
  //  Helper: given a discipline key and power name, return numeric
  //  level (1,2,3,...) or null. Declared at top-level so both the
  //  power-selection handler and roll logic can use it.
  // -------------------------------------------------------------
  function findPowerLevelGlobal(disciplineKey, powerName) {
    const disc = disciplines?.types?.[disciplineKey];
    if (!disc || !disc.powers || typeof disc.powers !== 'object') return null;
    for (const [lvlKey, arr] of Object.entries(disc.powers)) {
      if (!Array.isArray(arr)) continue;
      if (arr.some(p => p.name === powerName)) {
        const m = lvlKey.match(/level\s*(\d+)/i) || lvlKey.match(/level(\d+)/i);
        if (m) {
          const num = parseInt(m[1]);
          return isNaN(num) ? null : num;
        }
      }
    }
    return null;
  }

  // Helper: Check if a stat name is a valid second stat (attribute, skill, or discipline)
  function isValidSecondStat(statName) {
    const name = statName.toLowerCase();
    return ATTRIBUTE_NAMES.includes(name) || 
           SKILL_NAMES.includes(name) || 
           Object.keys(disciplines?.types || {}).includes(name);
  }

  // Helper: Check if a stat name is a valid third stat (skill or discipline)
  function isValidThirdStat(statName) {
    const name = statName.toLowerCase();
    return SKILL_NAMES.includes(name) || 
           Object.keys(disciplines?.types || {}).includes(name);
  }

  // Helper: Check if a stat is a skill
  function isSkill(statName) {
    return SKILL_NAMES.includes(statName.toLowerCase());
  }

  // Helper: Check if a stat is a discipline
  function isDiscipline(statName) {
    return Object.keys(disciplines?.types || {}).includes(statName.toLowerCase());
  }

  // Helper: return the effective dot/value for a stat row given its label text
  function getStatValueByName(statLabel) {
    const statEls = Array.from(document.querySelectorAll(".stat"));
    const matching = statEls.find((el) => {
      const lbl = el.querySelector(".stat-label");
      return lbl && lbl.textContent.trim().toLowerCase() === statLabel.toLowerCase();
    });
    if (!matching) return 0;

    // Dots representation
    const dots = matching.querySelector(".dots");
    if (dots && dots.dataset.value !== undefined) {
      return parseInt(dots.dataset.value) || 0;
    }

    // Track container representation (health/humanity etc.)
    const track = matching.querySelector(".track-container");
    if (track && track.dataset.value !== undefined) {
      return parseInt(track.dataset.value) || 0;
    }

    // Fallback: numeric span (initially static before user interaction)
    const spans = matching.querySelectorAll("span");
    if (spans.length >= 2) {
      const raw = spans[spans.length - 1].textContent.trim();
      const num = parseInt(raw);
      if (!isNaN(num)) return num;
    }

    return 0;
  }

  // -----------------------------
  //  Specialty helpers (modal)
  // -----------------------------
  function updateSpecialtySection(modalEl) {
    const section = modalEl.querySelector('#specialtySection');
    if(section) section.classList.add('d-none'); // hide feature; Specialty handled via badge click
  }

  // Click handler allowing users to select their first/second/third stats directly from the sheet
  document.addEventListener("click", (evt) => {
    const labelEl = evt.target.closest(".stat-label");
    if (!labelEl) return;

    const statRow = labelEl.closest(".stat");
    if (!statRow) return;

    const name = labelEl.textContent.trim();
    const isAttribute = ATTRIBUTE_NAMES.includes(name.toLowerCase());

    // Selection logic
    if (!firstStatName) {
      if (!isAttribute) {
        // Must pick an attribute first
        return;
      }
      firstStatName = name;
      statRow.classList.add("dice-first-stat");
      return;
    }

    if (firstStatName === name) {
      // Toggle off first stat
      firstStatName = null;
      statRow.classList.remove("dice-first-stat");
      // Clear second and third stats if they exist
      if (secondStatName) {
        const secondEl = document.querySelector(".stat.dice-second-stat");
        if (secondEl) secondEl.classList.remove("dice-second-stat");
        secondStatName = null;
      }
      if (thirdStatName) {
        const thirdEl = document.querySelector(".stat.dice-third-stat");
        if (thirdEl) thirdEl.classList.remove("dice-third-stat");
        thirdStatName = null;
      }
      return;
    }

    // Handle second stat selection
    if (!secondStatName) {
      if (!isValidSecondStat(name)) {
        // Must pick a valid second stat (attribute, skill, or discipline)
        return;
      }
      secondStatName = name;
      statRow.classList.add("dice-second-stat");
      // Clear any selected specialty (new skill may differ)
      if(selectedSpecialty){
        document.querySelectorAll('.specialty-badge.selected-specialty').forEach(el=>el.classList.remove('selected-specialty'));
        selectedSpecialty = null;
      }
      return;
    }

    if (secondStatName === name) {
      // Toggle off second stat
      secondStatName = null;
      statRow.classList.remove("dice-second-stat");
      // Clear third stat if it exists
      if (thirdStatName) {
        const thirdEl = document.querySelector(".stat.dice-third-stat");
        if (thirdEl) thirdEl.classList.remove("dice-third-stat");
        thirdStatName = null;
      }
      if(selectedSpecialty){
        document.querySelectorAll('.specialty-badge.selected-specialty').forEach(el=>el.classList.remove('selected-specialty'));
        selectedSpecialty = null;
      }
      return;
    }

    // Handle third stat selection
    if (!thirdStatName) {
      // Only allow third stat if second stat is a skill or discipline
      if (!isSkill(secondStatName) && !isDiscipline(secondStatName)) {
        return;
      }
      // Third stat must be a skill or discipline
      if (!isValidThirdStat(name)) {
        return;
      }
      // If second stat is a skill, third stat must be a discipline and vice versa
      if ((isSkill(secondStatName) && !isDiscipline(name)) || 
          (isDiscipline(secondStatName) && !isSkill(name))) {
        return;
      }
      thirdStatName = name;
      statRow.classList.add("dice-third-stat");
      return;
    }

    if (thirdStatName === name) {
      // Toggle off third stat
      thirdStatName = null;
      statRow.classList.remove("dice-third-stat");
      return;
    }

    // Replace existing second stat with new selection
    if (!isValidSecondStat(name)) {
      // Must pick a valid second stat (attribute, skill, or discipline)
      return;
    }
    const prevSecondEl = document.querySelector(".stat.dice-second-stat");
    if (prevSecondEl) prevSecondEl.classList.remove("dice-second-stat");
    secondStatName = name;
    statRow.classList.add("dice-second-stat");
    // Clear third stat if it exists
    if (thirdStatName) {
      const thirdEl = document.querySelector(".stat.dice-third-stat");
      if (thirdEl) thirdEl.classList.remove("dice-third-stat");
      thirdStatName = null;
    }
    if(selectedSpecialty){
      document.querySelectorAll('.specialty-badge.selected-specialty').forEach(el=>el.classList.remove('selected-specialty'));
      selectedSpecialty = null;
    }
  });

  // --------------------------------
  //  Dice rolling logic
  // --------------------------------
  let currentRollCtx = null; // {box, notation, diceClickable, selected: Set<number>}

  function highlightDie(die, on) {
    if (!die || !die.material) return;
    // Ensure materials are not shared between dice (clone if first time)
    if (!die.userData || !die.userData.uniqueMaterials) {
      if (Array.isArray(die.material)) {
        die.material = die.material.map((mat) => mat.clone());
      } else if (die.material.materials && Array.isArray(die.material.materials)) {
        const cloned = die.material.materials.map((mat) => mat.clone());
        die.material = new THREE.MeshFaceMaterial(cloned);
      } else {
        die.material = die.material.clone();
      }
      if (!die.userData) die.userData = {};
      die.userData.uniqueMaterials = true;
    }

    let mats;
    if (Array.isArray(die.material)) {
      mats = die.material;
    } else if (die.material.materials && Array.isArray(die.material.materials)) {
      mats = die.material.materials;
    } else {
      mats = [die.material];
    }
    mats.forEach((m) => {
      if (!m.emissive) return;
      if (!m.__origEmissive) m.__origEmissive = m.emissive.clone();
      if (on) {
        m.emissive.setHex(0x00ffff);
      } else {
        if (m.__origEmissive) m.emissive.copy(m.__origEmissive);
      }
    });
  }

  function rollVtmDice(canvasContainer, pools, onFinished) {
    // Using $t.* globals from dice engine.
    const box = new $t.dice.dice_box(canvasContainer, {
      w: window.innerWidth,
      h: window.innerHeight,
    });

    // Make renderer background transparent so the sheet stays visible.
    if (box.renderer) {
      if (box.renderer.setClearColor) {
        box.renderer.setClearColor(0x000000, 0);
      }
    }

    // Hide the visual desk plane so we can see sheet behind.
    if (box.desk) {
      box.desk.visible = false;
    }

    const notation = $t.vtm.parse_notation(
      pools.standard,
      pools.hunger,
      pools.rouse,
      pools.remorse,
      pools.frenzy,
    );

    // throw randomly like original start_throw
    const vector = { x: (Math.random() * 2 - 1) * box.w, y: -(Math.random() * 2 - 1) * box.h };
    const dist = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const boost = (Math.random() + 3) * dist;
    const vectors = box.generate_vectors(notation, vector, boost);

    let rouseRerolled = false;
    box.roll(vectors, undefined, function (result) {
      // Compute main results (standard + hunger only)
      const sLen = notation.set.length;
      const hLen = notation.hungerSet.length;
      const baseResults = result.slice(0, sLen + hLen);
      const res = $t.vtm.interpretResults(notation, baseResults);

      // Slice the result array into categories
      const rouseLen = notation.rouseSet.length;
      const remorseLen = notation.remorseSet.length;
      const frenzyLen = notation.frenzySet.length;

      const hungerStart = sLen;
      const rouseStart = hungerStart + hLen;
      const remorseStart = rouseStart + rouseLen;
      const frenzyStart = remorseStart + remorseLen;

      const rouseRolls = result.slice(rouseStart, rouseStart + rouseLen);
      const remorseRolls = result.slice(remorseStart, remorseStart + remorseLen);
      const frenzyRolls = result.slice(frenzyStart, frenzyStart + frenzyLen);

      const countSuccesses = (rollArr, threshold = 6) => rollArr.filter((v) => (v === 0 ? 10 : v) >= threshold).length;

      let rouseSuccess = rouseLen > 0 ? countSuccesses(rouseRolls, 6) > 0 : null;
      // Blood Potency feature: single reroll for failed Rouse when using qualifying Discipline
      let rouseWasRerolled = false;
      if (!rouseRerolled && rouseLen > 0 && rouseSuccess === false) {
        try {
          const bpVal = getStatValueByName("Blood Potency");
          const rerollCap = (typeof bpData?.getRerollDisciplineLevel === "function") ? bpData.getRerollDisciplineLevel(bpVal) : null;
          if (rerollCap !== null && activePower) {
            const powerLevel = findPowerLevelGlobal(activePower.disciplineKey, activePower.powerName);
            if (powerLevel !== null && powerLevel <= rerollCap) {
              // perform a simple reroll (no visual dice) – generate new random results
              const newResults = Array.from({ length: rouseLen }, () => Math.floor(Math.random() * 10) + 1);
              const newSuccess = countSuccesses(newResults, 6) > 0;
              // Remove existing Rouse dice meshes
              const start = rouseStart;
              const end = rouseStart + rouseLen; // exclusive
              box.dices.forEach((d) => {
                const idx = d.userData.rollIndex;
                if (idx>=start && idx<end) {
                  box.scene.remove(d);
                  if(d.body) box.world.remove(d.body);
                }
              });
              box.dices = box.dices.filter(d=> !(d.userData.rollIndex>=start && d.userData.rollIndex<end));

              // Add new Rouse dice visually
              const beforeCount = box.dices.length;
              addRouseDiceToBox(box, rouseLen);
              // assign rollIndex sequentially for newly added dice
              const afterDice = box.dices.slice(beforeCount);
              let idxCounter = start;
              afterDice.forEach(d=>{ d.userData.rollIndex = idxCounter++; });

              if (newSuccess) {
                rouseSuccess = true;
              }
              rouseWasRerolled = true;
              rouseRerolled = true;
            }
          }
        } catch (e) {
          console.error('Error applying Blood Potency Rouse reroll:', e);
        }
      }
      const remorseSuccess = remorseLen > 0 ? countSuccesses(remorseRolls) > 0 : null;
      const frenzySuccess = frenzyLen > 0 ? countSuccesses(frenzyRolls) > 0 : null;

      // Build HTML result string
      let html = '';
      if (sLen + hLen > 0) {
        html = $t.vtm.formatResults(res);
      }

      if (rouseLen > 0) {
        let rTxt = rouseSuccess ? 'Success' : '<span class="failure">Fail</span>';
        if (rouseWasRerolled) {
          rTxt = 'Rerolled – check dice';
        }
        html += `${html ? '<br>' : ''}Rouse: ${rTxt}`;
      }

      if (remorseLen > 0) {
        html += `${html ? '<br>' : ''}Remorse: ${remorseSuccess ? 'Success' : '<span class="failure">Fail</span>'}`;
      }

      if (frenzyLen > 0) {
        html += `${html ? '<br>' : ''}Frenzy: ${frenzySuccess ? 'Success' : '<span class="failure">Fail</span>'}`;
      }

      // Show Difficulty and pass/fail if present, at the top
      let showDifficulty = (pools.difficulty && (pools.standard > 0 || pools.hunger > 0));
      let toastHtml = html;
      if (showDifficulty) {
        toastHtml = `<strong>Difficulty:</strong> ${pools.difficulty} - <strong>${res.successes >= pools.difficulty ? 'Success' : 'Fail'}</strong><br>${html}`;
      }

      // -------------------------------------------------------
      //  Discord webhook notification for this roll (embed)
      // -------------------------------------------------------
      try {
        const poolParts = [];
        if (pools.standard) poolParts.push(`${pools.standard} Regular`);
        if (pools.hunger) poolParts.push(`${pools.hunger} Hunger`);
        if (pools.rouse) poolParts.push(`${pools.rouse} Rouse`);
        if (pools.remorse) poolParts.push(`${pools.remorse} Remorse`);
        if (pools.frenzy) poolParts.push(`${pools.frenzy} Frenzy`);
        const poolText = poolParts.join('\n');

        // Convert <br> tags to newlines, then strip remaining html tags
        const resultPlain = toastHtml
          .replace(/<br\s*\/?\s*>/gi, '\n')
          .replace(/<[^>]+>/g, '')
          .trim();

        const rollData = {
          characterName: getCharacterName() || '',
          successes: res.successes !== undefined ? res.successes : 0,
          poolText,
          resultPlain,
          regularDice: pools.standard,
          hungerDice: pools.hunger,
          rouseDice: pools.rouse,
          remorseDice: pools.remorse,
          frenzyDice: pools.frenzy,
          difficulty: showDifficulty ? pools.difficulty : undefined
        };
        sendToDiscord(buildRollEmbed(rollData));
      } catch(e) {
        console.error('Failed to send Discord webhook for roll', e);
      }

      // Apply mechanical consequences
      if (rouseLen > 0 && !rouseWasRerolled) {
        // Count failed Rouse dice and increase Hunger by 1 for each failure
        const failedRouseDice = rouseRolls.filter((v) => (v === 0 ? 10 : v) < 6).length;
        if (failedRouseDice > 0) {
          increaseHungerBy(failedRouseDice);
        }
      } else if (rouseLen > 0 && rouseWasRerolled) {
        // For rerolled Rouse checks, we need to count the new results
        // The new results are already in rouseRolls after the reroll
        const failedRouseDice = rouseRolls.filter((v) => (v === 0 ? 10 : v) < 6).length;
        if (failedRouseDice > 0) {
          increaseHungerBy(failedRouseDice);
        }
      }

      if (remorseLen > 0) {
        handleRemorseOutcome(remorseSuccess);
      }

      // Prepare dice selection for possible WP reroll (only if standard roll present)
      currentRollCtx = {
        box,
        notation,
        selected: new Set(),
      };

      // Assign rollIndex to each die mesh
      box.dices.forEach((d, idx) => {
        d.userData.rollIndex = idx;
        d.userData.mesh = d;
      });

      // Enable click selection on canvasContainer
      canvasContainer.addEventListener('click', function selectHandler(ev) {
        console.log('Dice click detected:', ev);
        console.log('Mouse coordinates:', ev.clientX, ev.clientY);
        console.log('currentRollCtx:', currentRollCtx);
        console.log('box:', box);
        console.log('Number of dice in box:', box.dices ? box.dices.length : 0);
        
        if (!currentRollCtx || currentRollCtx.box !== box) {
          console.log('No currentRollCtx or box mismatch');
          return;
        }
        
        // Adjust mouse coordinates to account for overlay offset
        const canvasRect = canvasContainer.getBoundingClientRect();
        const relativeX = ev.clientX - canvasRect.left;
        const relativeY = ev.clientY - canvasRect.top;
        
        const adjustedEvent = {
          ...ev,
          clientX: relativeX,
          clientY: relativeY
        };
        
        const data = box.search_dice_by_mouse(adjustedEvent);
        console.log('search_dice_by_mouse result:', data);
        
        if (!data) {
          console.log('No dice found at click position');
          return;
        }
        
        const idx = data.rollIndex;
        const mesh = data.mesh;
        const sLen = notation.set.length;
        const hLen = notation.hungerSet.length;
        
        console.log('Dice index:', idx, 'Standard dice count:', sLen, 'Hunger dice count:', hLen);
        
        if (idx >= sLen) {
          console.log('Dice index >= standard dice count, cannot reroll');
          // Hunger or later dice cannot be rerolled
          return;
        }
        
        // toggle selection up to 3
        const sel = currentRollCtx.selected;
        if (sel.has(idx)) {
          sel.delete(idx);
          highlightDie(mesh, false);
          console.log('Deselected die:', idx);
        } else {
          if (sel.size >= 3) {
            console.log('Already selected 3 dice, cannot select more');
            return; // limit
          }
          sel.add(idx);
          highlightDie(mesh, true);
          console.log('Selected die:', idx, 'Total selected:', sel.size);
        }
        
        // Re-render scene to reflect highlight changes
        if (box && box.renderer) {
          box.renderer.render(box.scene, box.camera);
        }
      });

      // Show as Bootstrap toast or alert – simple alert for now
      if (window.toastManager) {
        window.toastManager.show(toastHtml, 'info', 'Dice Overlay');
      } else {
        // Fallback to simple alert if toastManager is not available
        alert(toastHtml.replace(/<[^>]+>/g, ''));
      }

      if (typeof onFinished === "function") onFinished(res);
    });
  }

  // --------------------------------------------------
  //  Info-Mode toggle helpers
  // --------------------------------------------------

  // Utility to know if Info Mode is currently active
  function isInfoMode() {
    const el = document.getElementById("toggleInfoMode");
    return !!(el && el.checked);
  }

  // Hide every visible Bootstrap tooltip (when turning Info Mode off)
  function setTooltipEnabled(enabled) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      let tip = bootstrap.Tooltip.getInstance(el);
      if (!tip) return;
      if (enabled) {
        tip.enable();
      } else {
        tip.hide();
        tip.disable();
      }
    });
  }

  // Helper alias
  const disableAllTooltips = () => setTooltipEnabled(false);

  // --------------------------------------------------
  //  Sheet mutation helpers (Hunger, Humanity, etc.)
  // --------------------------------------------------
  function findStatRow(labelText) {
    return Array.from(document.querySelectorAll('.stat')).find((row) => {
      const lbl = row.querySelector('.stat-label');
      return lbl && lbl.textContent.trim().toLowerCase() === labelText.toLowerCase();
    });
  }

  function increaseHungerBy(delta) {
    const row = findStatRow('Hunger');
    if (!row) return;
    const dots = row.querySelector('.dots');
    if (!dots) return;
    const maxDots = dots.querySelectorAll('.dot').length;
    let curr = parseInt(dots.dataset.value) || 0;
    const newVal = Math.min(maxDots, curr + delta);
    dots.dataset.value = newVal;
    dots.setAttribute('data-value', newVal);
    dots.querySelectorAll('.dot').forEach((d, idx) => {
      d.classList.toggle('filled', idx < newVal);
    });
  }

  function handleRemorseOutcome(success) {
    const container = document.querySelector('.track-container[data-type="humanity"]');
    if (!container) return;
    const boxes = container.querySelectorAll('.track-box');
    // Remove stains always
    boxes.forEach((b) => b.classList.remove('stained'));

    if (!success) {
      // Drop humanity by removing one filled box from the rightmost filled
      const filled = Array.from(boxes).filter((b) => b.classList.contains('filled'));
      if (filled.length > 0) {
        filled[filled.length - 1].classList.remove('filled');
      }
    }

    // Update data-value counts
    const filledCount = container.querySelectorAll('.track-box.filled').length;
    container.setAttribute('data-value', filledCount);
    const header = container.querySelector('.track-header span:first-child');
    if (header) header.textContent = `Current: ${filledCount}`;
  }

  // --------------------------------------------------
  //  Quick-roll helper functions
  // --------------------------------------------------
  function computeRemorseDice() {
    const container = document.querySelector('.track-container[data-type="humanity"]');
    if (!container) return 1;
    const filled = container.querySelectorAll('.track-box.filled').length;
    const stained = container.querySelectorAll('.track-box.stained').length;
    const totalBoxes = container.querySelectorAll('.track-box').length || 10;
    const spaces = Math.max(0, totalBoxes - filled - stained);
    return spaces === 0 ? 1 : spaces;
  }

  function getTrackCurrent(container, includeStained = false) {
    if (!container) return 0;
    const attr = parseInt(container.getAttribute('data-value'));
    if (!isNaN(attr)) return attr;

    // Fallback: derive from boxes
    const boxes = container.querySelectorAll('.track-box');
    if (container.dataset.type === 'humanity') {
      const filled = container.querySelectorAll('.track-box.filled').length;
      return filled;
    }
    // Willpower / Health: total minus damaged boxes
    const total = boxes.length;
    const damaged = container.querySelectorAll('.track-box.superficial, .track-box.aggravated').length;
    return total - damaged;
  }

  function computeFrenzyDice() {
    const wpContainer = document.querySelector('.track-container[data-type="willpower"]');
    const humanityContainer = document.querySelector('.track-container[data-type="humanity"]');
    const unspentWP = getTrackCurrent(wpContainer);
    const humanityVal = getTrackCurrent(humanityContainer, true);
    const frenzyDice = unspentWP + Math.floor(humanityVal / 3);
    return Math.max(1, frenzyDice);
  }

  // Helper: add N dice of specified type into dice_box
  function addDiceToBox(box, count, dieType='Standard') {
    if (!box || count <= 0) return;
    const rnd = () => Math.random() * 2 - 1;
    for (let i = 0; i < count; i++) {
      let vec = { x: rnd(), y: rnd(), z: rnd() };
      const len = Math.sqrt(vec.x*vec.x + vec.y*vec.y + vec.z*vec.z);
      vec.x/=len; vec.y/=len; vec.z/=len;
      const pos = {
        x: box.w * (vec.x>0? -1:1)*0.9,
        y: box.h * (vec.y>0? -1:1)*0.9,
        z: Math.random()*200+200
      };
      const velvec={x:rnd(),y:rnd(),z:rnd()};
      const velocity={x:velvec.x*200,y:velvec.y*200,z:-10};
      const angle={x:-(rnd()*vec.y*5),y:rnd()*vec.x*5,z:0};
      const axis={x:rnd(),y:rnd(),z:rnd(),a:Math.random()};
      const mesh = box.create_dice('d10',pos,velocity,angle,axis,dieType);
      if(mesh) mesh.userData.dieType = dieType;
    }
    if (!box.running) { box.running = Date.now(); box.last_time=0; box.__animate(box.running);} 
  }

  function addStandardDiceToBox(box,count){addDiceToBox(box,count,'Standard');}
  function addRouseDiceToBox(box,count){addDiceToBox(box,count,'Rouse');}

  // --------------------------------------------------
  //  Helper functions used by Control Bar (moved out)
  // --------------------------------------------------

  // Determine if a Willpower reroll is currently allowed based on aggravated damage
  function isWPRerollAllowed() {
    // Disallow rerolling entirely if the last roll used Blood Surge
    if (lastRollHadBloodSurge) return false;
    const wpContainer = document.querySelector('.track-container[data-type="willpower"]');
    if (!wpContainer) return true; // if WP track not yet present, allow by default
    const total = wpContainer.querySelectorAll('.track-box').length;
    const aggravated = wpContainer.querySelectorAll('.track-box.aggravated').length;
    return aggravated < total;
  }

  // Async convenience wrapper performing an overlay dice roll for the provided pools
  async function quickRoll(pools) {
    await ensureDiceEngineLoaded();
    const canvasContainer = createOverlay(); // createOverlay removes any existing overlay automatically
    if (latestImpairmentMessage) {
      const banner = document.createElement('div');
      banner.className = 'position-absolute top-0 start-50 translate-middle-x bg-danger bg-opacity-75 text-white fw-bold py-1 px-3 rounded dice-banner';
      banner.textContent = latestImpairmentMessage;
      canvasContainer.appendChild(banner);
    }
    rollVtmDice(canvasContainer, pools, () => {});
    lastRollHadBloodSurge = false;
    // Allow Control Bar to refresh WP button if it exposed one
    if (typeof window.refreshWPRerollButton === 'function') {
      window.refreshWPRerollButton();
    }
  }

  // Spend 1 Willpower (superficial → aggravated as required). Returns true on success.
  function spendWillpower() {
    const wpContainer = document.querySelector('.track-container[data-type="willpower"]');
    if (!wpContainer) return false;

    const boxes = Array.from(wpContainer.querySelectorAll('.track-box'));
    const total = boxes.length;
    const aggravated = boxes.filter(b => b.classList.contains('aggravated')).length;
    const superficial = boxes.filter(b => b.classList.contains('superficial')).length;
    const undamaged = total - aggravated - superficial;

    // If all boxes aggravated – cannot spend WP
    if (aggravated >= total) {
      window.toastManager.show('All Willpower is aggravated – you can no longer reroll.', 'danger', 'Dice Overlay');
      return false;
    }

    if (undamaged > 0) {
      const target = boxes.find(b => !b.classList.contains('superficial') && !b.classList.contains('aggravated'));
      if (target) target.classList.add('superficial');
    } else if (superficial > 0) {
      const target = boxes.find(b => b.classList.contains('superficial'));
      if (target) {
        target.classList.remove('superficial');
        target.classList.add('aggravated');
      }
    }

    // Update remaining WP count display
    const damagedNow = wpContainer.querySelectorAll('.superficial, .aggravated').length;
    const newVal = total - damagedNow;
    wpContainer.setAttribute('data-value', newVal);
    const header = wpContainer.querySelector('.track-header span:first-child');
    if (header) header.textContent = `Current: ${newVal}`;

    return true;
  }

  // Click handler for the WP reroll button (expects currentRollCtx from latest roll)
  function handleWPRerollClick() {
    if (!currentRollCtx) {
      window.toastManager.show('No previous roll to reroll.', 'warning', 'Dice Overlay');
      return;
    }

    const selCount = currentRollCtx.selected.size;
    if (selCount === 0) {
      window.toastManager.show('Select up to 3 Standard dice to reroll (click them)', 'info', 'Dice Overlay');
      return;
    }

    if (!spendWillpower()) return; // abort if cannot spend WP

    const box = currentRollCtx.box;
    // Remove selected dice from the scene so they disappear
    box.dices.forEach((d) => {
      if (currentRollCtx.selected.has(d.userData.rollIndex)) {
        box.scene.remove(d);
        if (d.body) box.world.remove(d.body);
      }
    });
    box.dices = box.dices.filter((d) => !currentRollCtx.selected.has(d.userData.rollIndex));

    // Re-render to reflect removals
    if (box.renderer) box.renderer.render(box.scene, box.camera);

    // Clear highlights on remaining dice
    box.dices.forEach((d) => highlightDie(d, false));

    // Add replacement dice
    addStandardDiceToBox(box, selCount);

    // Discord notification
    try {
      const characterName = getCharacterName() || '';
      const discordMessage = {
        name: characterName || 'Dice Roller',
        title: characterName ? `${characterName}'s Willpower Reroll` : '🎲 Willpower Reroll',
        color: 0x787878,
        fields: [ { name: 'Dice Rerolled', value: selCount, inline: true } ],
        timestamp: new Date().toISOString(),
      };
      sendToDiscord(discordMessage);
    } catch (e) {
      console.error('Failed to send Discord webhook for reroll', e);
    }

    // Reset roll context
    currentRollCtx = null;

    // If control bar exposed a refresh helper, call it
    if (typeof window.refreshWPRerollButton === 'function') {
      window.refreshWPRerollButton();
    }
  }

  // --------------------------------
  //  Setup on DOM ready
  // --------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------
    //  Use the shared Control Bar from control-bar.js
    // -------------------------------------------------------------

    // Helper exposed to the bar so it can clear dice results
    function clearOverlay() {
      const ov = document.getElementById("dice-overlay");
      if (ov) ov.remove();
      currentRollCtx = null;
    }

    // Spin up (or retrieve) the bar and wire required callbacks
    // DISABLED: Using new character toolbar instead
    // initControlBar({
    //   disableAllTooltips,
    //   setTooltipEnabled,
    //   quickRoll,
    //   computeRemorseDice,
    //   computeFrenzyDice,
    //   isWPRerollAllowed,
    //   handleWPRerollClick,
    //   clearOverlay,
    // });

    // Make functions available globally for the new toolbar
    window.disableAllTooltips = disableAllTooltips;
    window.setTooltipEnabled = setTooltipEnabled;
    window.quickRoll = quickRoll;
    window.computeRemorseDice = computeRemorseDice;
    window.computeFrenzyDice = computeFrenzyDice;
    window.isWPRerollAllowed = isWPRerollAllowed;
    window.handleWPRerollClick = handleWPRerollClick;
    window.clearOverlay = clearOverlay;
    
    // Add mendHealth function globally
    window.mendHealth = function() {
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
      const healAmt = (typeof bpData?.getHealingAmount === "function") ? (bpData.getHealingAmount(bpVal) || 1) : 1;

      // Heal superficial Health damage
      const container = document.querySelector('.track-container[data-type="health"]');
      if (container) {
        const superficialBoxes = Array.from(container.querySelectorAll('.track-box.superficial'));
        
        // Check if there's any damage to heal
        if (superficialBoxes.length === 0) {
          if (window.toastManager) {
            window.toastManager.show('No superficial damage to mend', 'warning');
          }
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

        if (window.toastManager) {
          window.toastManager.show(`Mended ${toHeal} superficial Health damage`, 'success');
        }
      } else {
        if (window.toastManager) {
          window.toastManager.show('Health track not found', 'danger');
        }
      }

      // Always perform a Rouse check to see if Hunger increases
      if (window.quickRoll) {
        window.quickRoll({ standard: 0, hunger: 0, rouse: 1, remorse: 0, frenzy: 0 });
      }
    };
    
    // Add showDiceSymbolsModal function globally
    window.showDiceSymbolsModal = function() {
      const content = `
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
      `;

      const { modalElement, modalInstance } = window.modalManager.showCustom({
        title: 'Dice Symbols',
        content,
        footer: '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>',
        size: 'default',
        centered: true
      });

      return { modalElement, modalInstance };
    };

    // Add toast function if not already available
    if (!window.showToast) {
      window.showToast = function(message, type = 'info') {
        if (window.toastManager) {
          window.toastManager.show(message, type, 'Dice Overlay');
        } else {
          console.log(`${type.toUpperCase()}: ${message}`);
        }
      };
    }

    // Bridge to the bar's helper so the rest of the overlay logic can stay unchanged
    function refreshWPRerollButton() {
      if (typeof window.refreshWPRerollButton === "function") {
        window.refreshWPRerollButton();
      }
    }

    // Expose refreshWPRerollButton globally so it can be called from other functions
    window.refreshWPRerollButtonLocal = refreshWPRerollButton;

    // Helper used by computeDicePools further below (kept here because the overlay
    // still owns the dice-pool logic).
    function disciplineNameToKey(name = "") {
      const lower = name.toLowerCase();
      const special = {
        "blood sorcery": "bloodSorcery",
        "thin-blood alchemy": "thinBloodAlchemy",
      };
      return special[lower] || lower.replace(/[^a-z]/g, "");
    }

    // Modal lazy creation
    let modalEl; // will be lazily created

    // Initial button state
    refreshWPRerollButton();

    // Periodic refresh in case WP track loads later or changes outside our handlers
    setInterval(refreshWPRerollButton, 1000);

    // -- Specialty selection support ----------------

    (function injectSpecialtyStyles(){
      const style = document.createElement('style');
      style.textContent = `
        .specialty-badge.selected-specialty.second-stat { background-color: var(--bs-primary) !important; }
        .specialty-badge.selected-specialty.third-stat { background-color: var(--bs-warning) !important; }
      `;
      document.head.appendChild(style);
    })();

    document.addEventListener('click',(ev)=>{
      const badge = ev.target.closest('.specialty-badge');
      if(!badge) return;
      const row = badge.closest('.specialties-row');
      if(!row) return;
      const skill = row.dataset.skill;
      if(skill !== secondStatName && skill !== thirdStatName) return; // apply to either chosen skill

      if(selectedSpecialty && selectedSpecialty.skill===skill && selectedSpecialty.name===badge.textContent){
        badge.classList.remove('selected-specialty', 'second-stat', 'third-stat');
        selectedSpecialty = null;
      } else {
        document.querySelectorAll('.specialty-badge.selected-specialty').forEach(el=>el.classList.remove('selected-specialty', 'second-stat', 'third-stat'));
        badge.classList.add('selected-specialty');
        // Add appropriate class based on whether this is second or third stat
        badge.classList.add(skill === secondStatName ? 'second-stat' : 'third-stat');
        selectedSpecialty = {skill, name: badge.textContent};
      }
    });

    // ------------------------------------------------------
    //  Discipline Power selection (for automatic Rouse dice)
    // ------------------------------------------------------

    // Helper: parse number of required Rouse checks from cost string
    function parseRouseChecks(costStr = "") {
      if (!costStr || !/rouse/i.test(costStr)) return 0;

      // First, look for explicit digit e.g. "2 Rouse Checks"
      const numMatch = costStr.match(/(\d+)\s+rouse/i);
      if (numMatch) return parseInt(numMatch[1]);

      // Fallback: word numbers (one, two, three ...)
      const wordMap = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
      const wordMatch = costStr.match(/(one|two|three|four|five|six)\s+rouse/i);
      if (wordMatch) return wordMap[wordMatch[1].toLowerCase()] || 0;

      // Default to 1 if "Rouse" mentioned but no number
      return 1;
    }

    // Helper: locate power object in discipline data
    function findPowerObject(disciplineKey, powerName) {
      const disc = disciplines?.types?.[disciplineKey];
      if (!disc) return null;

      // Search regular level powers
      if (disc.powers && typeof disc.powers === 'object') {
        for (const lvl of Object.values(disc.powers)) {
          const match = lvl.find((p) => p.name === powerName);
          if (match) return match;
        }
      }

      // Search amalgams if any
      if (Array.isArray(disc.amalgams)) {
        const match = disc.amalgams.find((p) => p.name === powerName);
        if (match) return match;
      }
      return null;
    }

    // Click handler for selecting a discipline power row
    document.addEventListener('click', (ev) => {
      const powerEl = ev.target.closest('.selected-power');
      if (!powerEl) return;

      // Determine discipline key from closest discipline-item container
      const discItem = powerEl.closest('.discipline-item');
      if (!discItem) return;
      const disciplineKey = discItem.dataset.discipline;

      const powerNameEl = powerEl.querySelector('.power-name');
      if (!powerNameEl) return;
      const powerName = powerNameEl.textContent.trim();

      // Toggle selection
      const alreadySelected = powerEl.classList.contains('dice-power-selected');

      // Clear previous selection highlight
      document.querySelectorAll('.selected-power.dice-power-selected').forEach(el => el.classList.remove('dice-power-selected'));
      activePower = null;

      if (!alreadySelected) {
        powerEl.classList.add('dice-power-selected');

        // Find power object
        const powerObj = findPowerObject(disciplineKey, powerName);

        // --- Rouse dice based on cost ----------------------------------
        const costStr = powerObj?.cost || '';
        const rouseDice = parseRouseChecks(costStr);
        const pLevel = findPowerLevelGlobal(disciplineKey, powerName);
        activePower = { element: powerEl, disciplineKey, powerName, rouseDice, powerLevel:pLevel };

        // --- Auto-select stats based on Dice Pool ----------------------
        if (powerObj?.dicePool && typeof powerObj.dicePool === 'string') {
          autoSelectStatsFromDicePool(powerObj.dicePool, disciplineKey);
        }
      }
    });

    // Helper: compute VtM dice pools based on currently selected stats & hunger
    function computeDicePools() {
      if (!firstStatName || !secondStatName) {
        return null; // Incomplete selection
      }

      const val1 = getStatValueByName(firstStatName);
      const val2 = getStatValueByName(secondStatName);
      const val3 = thirdStatName ? getStatValueByName(thirdStatName) : 0;
      const extra = selectedSpecialty ? 1 : 0;
      let total = val1 + val2 + val3 + extra;

      // ----------------------------------------------
      //  Impairment penalties (-2 dice)
      // ----------------------------------------------
      const PHYSICAL = ["strength", "dexterity", "stamina"];
      const SOCIAL   = ["charisma", "manipulation", "composure"];
      const MENTAL   = ["intelligence", "wits", "resolve"];

      const attr1 = firstStatName.toLowerCase();
      const attr2 = secondStatName ? secondStatName.toLowerCase() : '';
      const attr3 = thirdStatName ? thirdStatName.toLowerCase() : '';
      let penalty = 0;
      const causes = [];
      if (document.body.classList.contains('health-impaired') && 
          (PHYSICAL.includes(attr1) || PHYSICAL.includes(attr2) || PHYSICAL.includes(attr3))) {
        penalty += 2;
        if(document.body.classList.contains('health-torpor')){
          causes.push('Torpor');
        } else {
          causes.push('Physical Impairment');
        }
      }
      if (document.body.classList.contains('willpower-impaired') && 
          ((SOCIAL.concat(MENTAL)).includes(attr1) || 
           (SOCIAL.concat(MENTAL)).includes(attr2) || 
           (SOCIAL.concat(MENTAL)).includes(attr3))) {
        penalty += 2;
        if(document.body.classList.contains('willpower-pariah')){
          causes.push('Pariah');
        } else {
          causes.push('Willpower Impairment');
        }
      }
      if (document.body.classList.contains('humanity-impaired')) {
        penalty += 2;
        causes.push('Humanity Impairment');
      }
      if (penalty > 0) {
        total = Math.max(0, total - penalty);
      }

      // ----------------------------------------------
      //  Resonance Temperament Bonus (+1 die)
      // ----------------------------------------------
      let totalBonusApplied = false;
      try {
        const resonanceKey = document.querySelector('.resonance-dropdown')?.value || '';
        const temperamentKey = document.querySelector('.temperament-dropdown')?.value || '';
        const intenseBonus = (temperamentKey === 'intense' || temperamentKey === 'acute');
        const resData = window.__resonancesData;
        if (intenseBonus && resonanceKey && resData && resData.types?.[resonanceKey]) {
          const assocDisciplines = resData.types[resonanceKey].disciplines.map(d=>d.toLowerCase());
          if ((secondStatName && assocDisciplines.includes(secondStatName.toLowerCase())) ||
              (thirdStatName && assocDisciplines.includes(thirdStatName.toLowerCase()))) {
            total += 1; // add bonus die
            totalBonusApplied = true;
          }
        }
      } catch (e) {
        console.error('Error applying resonance temperament bonus:', e);
      }
      // --------------------------------------------------------------
      //  (Temp) defer hunger/standard calculation until after all
      //  bonuses have been applied (including Blood Potency below)
      // --------------------------------------------------------------
      let hungerDice; let standardDice; // will compute later

      // ----------------------------------------------
      //  Blood Potency Discipline Bonus (+1 or +2)
      // ----------------------------------------------
      let discBonusMsg = null;
      try {
        const bpVal = getStatValueByName("Blood Potency");
        const bpDiscBonus = (typeof bpData?.getDisciplineBonus === "function") ? (bpData.getDisciplineBonus(bpVal) || 0) : 0;
        if (bpDiscBonus > 0) {
          const discKey2 = disciplineNameToKey(secondStatName);
          const discKey3 = thirdStatName ? disciplineNameToKey(thirdStatName) : null;
          if (disciplines?.types?.[discKey2] || (discKey3 && disciplines?.types?.[discKey3])) {
            total += bpDiscBonus;
            discBonusMsg = `+${bpDiscBonus} die${bpDiscBonus > 1 ? 's' : ''}: Blood Potency bonus`;
          }
        }
      } catch (e) {
        console.error('Error applying Blood Potency discipline bonus:', e);
      }

      window.latestDisciplineBonusMessage = discBonusMsg;

      // Now that all bonuses are applied, compute dice counts
      const hungerScore = getStatValueByName("Hunger");
      hungerDice = Math.min(5, Math.min(hungerScore, total));
      standardDice = total - hungerDice;

      // Discipline Power Cost → Rouse dice (unchanged)
      let rouseDice = 0;
      if (activePower && activePower.rouseDice > 0) {
        rouseDice = activePower.rouseDice;
      }

      // Collect breakdown details for UI
      const breakdownLines = [];
      if(firstStatName) breakdownLines.push(`${firstStatName}: ${val1}`);
      if(secondStatName) breakdownLines.push(`${secondStatName}: ${val2}`);
      if(thirdStatName) breakdownLines.push(`${thirdStatName}: ${val3}`);
      if(extra>0) breakdownLines.push(`Specialty: +${extra}`);
      if(totalBonusApplied) breakdownLines.push('Resonance bonus: +1');
      if(discBonusMsg) breakdownLines.push(discBonusMsg);
      if(penalty>0) breakdownLines.push(`Penalties: -${penalty} (${causes.join(', ')})`);

      // Store globally for modal display
      window.latestDiceBreakdown = breakdownLines.join('<br>');

      return {
        standard: standardDice,
        hunger: hungerDice,
        rouse: rouseDice,
        remorse: 0,
        frenzy: 0,
      };
    }

    // Helper: clear any existing stat selections (visual + state)
    function clearStatSelections() {
      document.querySelectorAll('.stat.dice-first-stat').forEach(el=>el.classList.remove('dice-first-stat'));
      document.querySelectorAll('.stat.dice-second-stat').forEach(el=>el.classList.remove('dice-second-stat'));
      firstStatName = null;
      secondStatName = null;
      // Clear specialties selection as well
      if(selectedSpecialty){
        document.querySelectorAll('.specialty-badge.selected-specialty').forEach(el=>el.classList.remove('selected-specialty'));
        selectedSpecialty = null;
      }
    }

    // Parse dicePool string and auto-select relevant stats
    function autoSelectStatsFromDicePool(dicePoolStr, disciplineKey){
      // Expected formats like "Wits + Auspex", "Wits/Resolve + Auspex", etc.
      const parts = dicePoolStr.split('+').map(p=>p.trim()).filter(Boolean);
      if(parts.length===0) return;

      let attrCandidate = null;
      let secondCandidate = null;

      // First part may contain attribute(s)
      const firstPart = parts[0];
      const firstAlternatives = firstPart.split('/').map(p=>p.trim());
      attrCandidate = firstAlternatives.find(alt => ATTRIBUTE_NAMES.includes(alt.toLowerCase()));

      // If attribute not found yet and we have a second part, check there
      if(!attrCandidate && parts.length>1){
        const secondFirstAlt = parts[1].split('/').map(p=>p.trim());
        attrCandidate = secondFirstAlt.find(alt => ATTRIBUTE_NAMES.includes(alt.toLowerCase()));
      }

      // Decide second stat: typically the part after '+'
      if(parts.length > 1){
        secondCandidate = parts[1];
      } else {
        // If only one part, and it included attribute and something else separated by space? Unlikely
        secondCandidate = firstAlternatives.find(alt => alt !== attrCandidate);
      }

      // Fallback: if secondCandidate equals disciplineKey? ensure proper capitalization later.
      // Clean secondCandidate (if contains alternatives, choose first)
      if(secondCandidate){
        secondCandidate = secondCandidate.split('/')[0].trim();
      }

      // Map discipline key to display name to match stat labels.
      if(secondCandidate && secondCandidate.toLowerCase() === disciplineKey.toLowerCase()){
        // Use configured discipline display name if any
        const discName = disciplines?.types?.[disciplineKey]?.name || disciplineKey;
        secondCandidate = discName;
      }

      // Now perform selection
      if(attrCandidate){
        clearStatSelections();

        // First stat (attribute)
        const attrRow = findStatRow(attrCandidate);
        if(attrRow){
          attrRow.classList.add('dice-first-stat');
          firstStatName = attrCandidate;
        }

        // Second stat
        if(secondCandidate){
          const secRow = findStatRow(secondCandidate);
          if(secRow){
            secRow.classList.add('dice-second-stat');
            secondStatName = secondCandidate;
          } else {
            // Could not find row; leave secondStatName unset
          }
        }
      }
    }

    // -------------------------------------------------------------
    //  Resonance data loading
    // -------------------------------------------------------------
    (async () => {
      try {
        const module = await import('./references/resonances.js');
        window.__resonancesData = module.resonances;
      } catch (err) {
        console.error('Failed to load resonance data:', err);
        window.__resonancesData = null;
      }
    })();

    // Add dice overlay access
    window.diceOverlay = {
      show: async function() {
        // Wipe overlay before showing modal
        if (typeof clearOverlay === "function") clearOverlay();

        // Always create a new modal each time the button is pressed
        modalEl = createModal();

        // Each time the button is pressed, compute & pre-fill the modal fields
        const computed = computeDicePools();
        if (computed) {
          modalEl.querySelector("#standardInput").value = computed.standard;
          modalEl.querySelector("#hungerInput").value = computed.hunger;
          modalEl.querySelector("#rouseInput").value = computed.rouse;
          modalEl.querySelector("#remorseInput").value = computed.remorse;
          modalEl.querySelector("#frenzyInput").value = computed.frenzy;
        }

        // Update impairment note visibility
        const noteBox = modalEl.querySelector('#impairmentNote');
        if (noteBox) {
          if (latestImpairmentMessage) {
            noteBox.textContent = latestImpairmentMessage;
            noteBox.classList.remove('d-none');
          } else {
            noteBox.classList.add('d-none');
          }
        }

        // Update bonus note visibility (resonance & blood potency)
        const bonusBox = modalEl.querySelector('#bonusNote');
        const bonusMessages = [];
        if (window.latestResonanceBonusMessage) bonusMessages.push(window.latestResonanceBonusMessage);
        if (window.latestDisciplineBonusMessage) bonusMessages.push(window.latestDisciplineBonusMessage);
        if (window.latestSpecialtyBonusMessage) bonusMessages.push(window.latestSpecialtyBonusMessage);
        if (bonusBox) {
          if (bonusMessages.length) {
            bonusBox.innerHTML = bonusMessages.join('<br>');
            bonusBox.classList.remove('d-none');
          } else {
            bonusBox.classList.add('d-none');
          }
        }

        // New: Update breakdown note
        const breakdownBox = modalEl.querySelector('#breakdownNote');
        if (breakdownBox) {
          if (window.latestDiceBreakdown) {
            // Split breakdown lines into two columns
            const lines = window.latestDiceBreakdown.split('<br>');
            const midpoint = Math.ceil(lines.length / 2);
            const leftColumn = lines.slice(0, midpoint);
            const rightColumn = lines.slice(midpoint);
            
            const columnHtml = `
              <div class="row">
                <div class="col-6">
                  ${leftColumn.join('<br>')}
                </div>
                <div class="col-6">
                  ${rightColumn.join('<br>')}
                </div>
              </div>
            `;
            
            breakdownBox.innerHTML = columnHtml;
            breakdownBox.classList.remove('d-none');
          } else {
            breakdownBox.classList.add('d-none');
          }
        }

        updateSpecialtySection(modalEl);

        // Enable or disable Blood Surge toggle based on current Hunger (must be <5)
        const hungerScore = getStatValueByName("Hunger");
        const surgeWrapper = modalEl.querySelector("#bloodSurgeToggleWrapper");
        const surgeInput = modalEl.querySelector("#bloodSurgeToggle");
        const surgeBonus = modalEl.querySelector("#bloodSurgeBonus");
        if (surgeWrapper && surgeInput) {
          if (hungerScore >= 5) {
            surgeInput.checked = false;
            surgeInput.disabled = true;
            if (surgeBonus) surgeBonus.textContent = "+0 Standard, +0 Rouse";
          } else {
            surgeInput.disabled = false;
            // Update bonus display based on Blood Potency
            const bpVal = getStatValueByName("Blood Potency");
            const bonus = (typeof bpData?.getBloodSurgeBonus === "function") ? (bpData.getBloodSurgeBonus(bpVal) || 0) : 0;
            if (surgeBonus) surgeBonus.textContent = `+${bonus} Standard, +1 Rouse`;
          }
        }

        // Show the modal
        const modalData = modalManager.getModal(modalEl.id);
        if (modalData) {
          modalData.modalInstance.show();
        }
      }
    };
  });
})(); 