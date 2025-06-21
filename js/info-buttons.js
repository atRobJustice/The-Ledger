// Info Buttons for additional sections
// This script appends information buttons to section headings (Disciplines, Merits, Flaws, Backgrounds, Background Flaws, Loresheets)
// and loads data from the corresponding reference files to present in a Bootstrap modal.

// Inject CSS to hide all info buttons by default and reveal in Info Mode
(function(){
  const style = document.createElement('style');
  style.textContent = `
    .ledger-info-btn{display:none !important;}
    body.info-mode .ledger-info-btn{display:inline-flex !important;}
  `;
  document.head.appendChild(style);
})();

// Use window references instead
const infoButtonsAttributes = window.attributes;
const infoButtonsSkills = window.skills;

const mappings = [
  {
    key: 'disciplines',
    heading: 'Disciplines',
    modulePath: './references/disciplines.js',
    buildContent: (data) => {
      let content = '';
      if (data.description) {
        content += `<p>${data.description}</p>`;
      }
      const typeEntries = Object.values(data.types || {});
      if (typeEntries.length) {
        content += '<h5>Discipline List</h5><ul>';
        typeEntries.forEach(d => {
          content += `<li><strong>${d.name || ''}</strong>${d.overview ? `: ${d.overview}` : ''}</li>`;
        });
        content += '</ul>';
      }
      return content;
    },
    titlePrefix: 'Disciplines'
  },
  {
    key: 'merits',
    heading: 'Merits',
    modulePath: './references/merits.js',
    buildContent: (data) => {
      let content = '<p>Merits provide advantages that customise a character.</p>';
      const categories = Object.values(data || {});
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        content += `<li><strong>${cat.name}</strong>: ${cat.description}</li>`;
      });
      content += '</ul>';
      return content;
    },
    titlePrefix: 'Merits'
  },
  {
    key: 'flaws',
    heading: 'Flaws',
    modulePath: './references/merits.js', // same file
    dataKey: 'merits',
    buildContent: (data) => {
      let content = '<p>Flaws represent disadvantages and weaknesses.</p>';
      const categories = Object.values(data || {});
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        if (cat.flaws) {
          content += `<li><strong>${cat.name}</strong>: ${cat.description}</li>`;
        }
      });
      content += '</ul>';
      return content;
    },
    titlePrefix: 'Flaws'
  },
  {
    key: 'backgrounds',
    heading: 'Backgrounds',
    modulePath: './references/backgrounds.js',
    buildContent: (data) => {
      let content = '<p>Background Merits grant social and material advantages.</p>';
      const categories = Object.values(data || {});
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        if (cat.merits) {
          content += `<li><strong>${cat.name}</strong>: ${cat.description}</li>`;
        }
      });
      content += '</ul>';
      return content;
    },
    titlePrefix: 'Background Merits'
  },
  {
    key: 'backgroundFlaws',
    heading: 'Background Flaws',
    modulePath: './references/backgrounds.js',
    dataKey: 'backgrounds',
    buildContent: (data) => {
      let content = '<p>Background Flaws represent social or material hindrances.</p>';
      const categories = Object.values(data || {});
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        if (cat.flaws) {
          content += `<li><strong>${cat.name}</strong>: ${cat.description}</li>`;
        }
      });
      content += '</ul>';
      return content;
    },
    titlePrefix: 'Background Flaws'
  },
  {
    key: 'loresheets',
    heading: 'Loresheets',
    modulePath: './references/loresheets.js',
    buildContent: (data) => {
      let content = '';
      if (data.description) {
        content += `<p>${data.description}</p>`;
      }
      if (data.categories) {
        content += '<h5>Available Categories</h5><ul>';
        Object.values(data.categories).forEach(cat => {
          content += `<li><strong>${cat.name}</strong> <em>Source: ${cat.source || ''}</em></li>`;
        });
        content += '</ul>';
      }
      return content;
    },
    titlePrefix: 'Loresheets'
  },
  {
    key: 'attributes',
    heading: 'Attributes',
    modulePath: './references/attributes.js',
    buildContent: (data) => {
      let content = '';
      if (data.overview?.description) {
        content += `<p>${data.overview.description}</p>`;
      }
      if (data.overview?.distribution) {
        content += `<p>${data.overview.distribution}</p>`;
      }
      
      // Add categories
      const categories = ['physical', 'social', 'mental'];
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        if (data[cat]?.description) {
          content += `<li><strong>${cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>: ${data[cat].description}</li>`;
        }
      });
      content += '</ul>';
      return content;
    },
    titlePrefix: 'Attributes'
  },
  {
    key: 'skills',
    heading: 'Skills',
    modulePath: './references/skills.js',
    buildContent: (data) => {
      let content = '';
      if (data.overview?.description) {
        content += `<p>${data.overview.description}</p>`;
      }
      
      // Add categories
      const categories = ['physical', 'social', 'mental'];
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        if (data[cat]?.description) {
          content += `<li><strong>${cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>: ${data[cat].description}</li>`;
        }
      });
      content += '</ul>';
      return content;
    },
    titlePrefix: 'Skills'
  }
];

const dropdownMappings = [
  {                // Resonance
    selector : '.resonance-dropdown',
    module   : './references/resonances.js',
    pickData : m => m.resonances.types,        // object keyed by resonance key
    buildContent: res => `
        <h5>${res.name}</h5>
        <p>${res.description}</p>
        <p><strong>Disciplines:</strong> ${res.disciplines?.join(', ')}</p>`
  },
  {                // Temperament
    selector : '.temperament-dropdown',
    module   : './references/resonances.js',
    pickData : m => m.resonances.temperaments,
    buildContent: t => `<h5>${t.name}</h5><p>${t.description}</p>`
  },
  {                // Predator
    selector : '.predator-dropdown',
    module   : './references/predator_types.js',
    pickData : m => m.predatorTypes.types,
    buildContent: p => `
        <h5>${p.name}</h5>
        <p>${p.description}</p>
        ${list('Dice Pools',  p.dicePools)}
        ${list('Benefits',   p.benefits)}
        ${list('Drawbacks',  p.drawbacks)}`
  },
  {                // Clan
    selector : '.clan-dropdown',
    module   : './references/clans.js',
    pickData : m => m.clans.types,
    buildContent: c => `
        <h5>${c.name}</h5>
        <p>${c.background?.description||''}</p>
        ${badge('Nicknames',   c.nicknames?.join(', '))}
        ${badge('Disciplines', Array.isArray(c.disciplines)
                               ? c.disciplines.join(', ')
                               : Object.keys(c.disciplines||{}).join(', '))}
        ${badge('Bane',        c.bane?.description)}
        ${badge('Compulsion',  c.compulsion?.description)}`
  },
  {                // Generation
    selector : '.generation-dropdown',
    module   : './references/generation.js',
    pickData : m => {
      const gen = m.generation;
      // Create a mapping of generation numbers to tier names
      const tierMap = {
        '3': 'third',
        '4': 'fourthAndFifth',
        '5': 'fourthAndFifth',
        '6': 'sixthThroughNinth',
        '7': 'sixthThroughNinth',
        '8': 'sixthThroughNinth',
        '9': 'sixthThroughNinth',
        '10': 'tenthAndEleventh',
        '11': 'tenthAndEleventh',
        '12': 'twelfthAndThirteenth',
        '13': 'twelfthAndThirteenth',
        '14': 'fourteenthThroughSixteenth',
        '15': 'fourteenthThroughSixteenth',
        '16': 'fourteenthThroughSixteenth'
      };
      return {
        tiers: gen.generationTiers,
        tierMap: tierMap
      };
    },
    buildContent: (data, key) => {
      const tierName = data.tierMap[key];
      const tier = data.tiers[tierName];
      if (!tier) return '<p>No information available for this generation.</p>';
      
      let content = `
        <h5>${tier.name || 'Generation Tier'}</h5>
        <p>${tier.description}</p>
      `;
      
      // Add blood potency limits if available
      const limits = data.tiers.bloodPotencyLimits?.[key];
      if (limits) {
        content += `<p><strong>Blood Potency Range:</strong> ${limits.lowest} - ${limits.highest}</p>`;
      }
      
      return content;
    }
  },
  {                // Blood-Potency
    selector : '.blood-potency-dropdown',
    module   : './references/blood_potency.js',
    pickData : m => m.bloodPotency.levels,
    buildContent: bp => `
        <h5>Blood-Potency ${bp.level}</h5>
        <p>${bp.description}</p>
        ${list('Effects', bp.effects)}
        ${badge('Bane Severity',      bp.baneSeverity)}
        ${badge('Surge Bonus',        bp.bloodSurgeBonus && '+'+bp.bloodSurgeBonus+' dice')}
        ${badge('Mend per Rouse',     bp.healingAmount && bp.healingAmount+' Superficial')}
        ${badge('Discipline Bonus',   bp.disciplineBonus && '+'+bp.disciplineBonus+' die')}
    `
  },
  {                // Compulsion
    selector : '.compulsion-dropdown',
    module   : './references/compulsions.js',
    pickData : m => m.compulsions,
    buildContent: (data, key) => {
      // Handle both general and clan compulsions
      const [type, compKey] = key.split('.', 2);
      const comp = type === 'general' ? data.general[compKey] : data.clanCompulsions[compKey];
      if (!comp) return '<p>No information available for this compulsion.</p>';
      
      let content = `
        <h5>${comp.name}</h5>
        <p>${comp.description}</p>
        ${comp.penalty ? `<p><strong>Penalty:</strong> ${comp.penalty}</p>` : ''}
        ${comp.resolution ? `<p><strong>Resolution:</strong> ${comp.resolution}</p>` : ''}
        ${comp.note ? `<p><strong>Note:</strong> ${comp.note}</p>` : ''}`;
      
      // Handle variants if present
      if (comp.variants) {
        content += '<h5>Variants</h5><ul>';
        Object.values(comp.variants).forEach(variant => {
          content += `<li><strong>${variant.name}:</strong> ${variant.description}`;
          if (variant.penalty) content += `<br/>Penalty: ${variant.penalty}`;
          if (variant.resolution) content += `<br/>Resolution: ${variant.resolution}`;
          content += '</li>';
        });
        content += '</ul>';
      }
      
      return content;
    }
  }
];

function createInfoButton(title) {
  const btn = document.createElement('button');
  btn.className = `btn btn-sm btn-outline-secondary ms-2 ledger-info-btn ${title.toLowerCase().replace(/\s+/g, '-')}-info-button`;
  btn.innerHTML = '<i class="bi bi-info-circle"></i>';
  btn.setAttribute('aria-label', `Show ${title} information`);
  btn.setAttribute('data-bs-toggle', 'tooltip');
  btn.setAttribute('data-bs-placement', 'top');
  return btn;
}

function ensureModal(id, titleText) {
  let modal = document.getElementById(id);
  if (modal) return modal;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}-label" role="dialog" aria-modal="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="${id}-label">${titleText}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="${id}-content"></div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(wrapper.firstElementChild);
  return document.getElementById(id);
}

function list(label, items) {
  if (!items || !items.length) return '';
  if (!Array.isArray(items)) items = Array.from(items);
  let html = `<h6>${label}</h6><ul>`;
  items.forEach(it => {
    html += `<li>${it}</li>`;
  });
  html += '</ul>';
  return html;
}

function badge(label, value) {
  if (!value) return '';
  return `<p><span class="badge bg-secondary me-2">${label}:</span> ${value}</p>`;
}

function showModal(id, contentHtml, titleText = 'Info') {
  const modalEl = ensureModal(id, titleText);
  modalEl.querySelector(`#${id}-label`).textContent = titleText;
  modalEl.querySelector(`#${id}-content`).innerHTML = contentHtml;
  const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
  instance.show();
}

function initInfoButtons() {
  mappings.forEach(async mapping => {
    const dataKey = mapping.dataKey || mapping.key;
    // find heading element by exact text match
    const headingEl = Array.from(document.querySelectorAll('h5')).find(h => h.textContent.trim() === mapping.heading);
    if (!headingEl) return;

    const button = createInfoButton(mapping.heading);
    headingEl.appendChild(button);
    new bootstrap.Tooltip(button);

    button.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const module = await import(mapping.modulePath);
        const data = module[dataKey] || module.default || module;
        const contentHtml = mapping.buildContent(data);
        const modalId = `${mapping.key}-heading-info-modal`;
        const modalEl = ensureModal(modalId, mapping.titlePrefix);
        modalEl.querySelector(`#${modalId}-label`).textContent = mapping.titlePrefix;
        modalEl.querySelector(`#${modalId}-content`).innerHTML = contentHtml;
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
        modalInstance.show();
      } catch (err) {
        console.error(`Error loading ${mapping.key} info:`, err);
      }
    });
  });

  dropdownMappings.forEach(async map => {
    try {
      const mod = await import(map.module);
      const data = map.pickData(mod);
      if (!data) {
        console.error(`No data found for ${map.selector}`);
        return;
      }

      const processed = new WeakSet();

      function attachBtn(dd){
        if(processed.has(dd)) return;
        processed.add(dd);

        const baseClass = map.selector.replace('.', '').split('-')[0] + '-info-button';
        if (dd.nextElementSibling?.classList.contains(baseClass) || dd.nextElementSibling?.classList.contains('dd-info-btn')) return;

        const infoBtn = createInfoButton('info');
        infoBtn.classList.add('dd-info-btn', baseClass);
        dd.after(infoBtn);
        new bootstrap.Tooltip(infoBtn);

        infoBtn.addEventListener('click', () => {
          const key = dd.value;
          if (!key || !data) {
            console.error('Invalid data or key:', { key, data });
            return;
          }

          // Special handling for Generation
          if (map.selector === '.generation-dropdown') {
            const tierName = data.tierMap?.[key];
            const tier = data.tiers?.[tierName];
            const html = map.buildContent(data, key);
            const title = (tier?.name || `Generation ${key}`);
            showModal(`${baseClass}-modal`, html, title);
          } else if (map.selector === '.compulsion-dropdown') {
            // Special handling for Compulsions
            const html = map.buildContent(data, key);
            const [type, compKey] = key.split('.', 2);
            const comp = type === 'general' ? data.general[compKey] : data.clanCompulsions[compKey];
            const title = (comp?.name || 'Compulsion');
            showModal(`${baseClass}-modal`, html, title);
          } else {
            // Standard handling for other dropdowns
            const html = map.buildContent(data[key]);
            const title = (data[key].name || data[key].title || 'Info');
            showModal(`${baseClass}-modal`, html, title);
          }
        });
      }

      const dropdowns = document.querySelectorAll(map.selector);
      dropdowns.forEach(attachBtn);

      // Observe future additions
      const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
          m.addedNodes.forEach(node => {
            if(node.nodeType!==1) return;
            if(node.matches && node.matches(map.selector)) {
              attachBtn(node);
            }
            if(node.querySelectorAll){
              node.querySelectorAll(map.selector).forEach(attachBtn);
            }
          });
        }
      });
      observer.observe(document.body, {childList:true, subtree:true});
    } catch (err) {
      console.error(`Error setting up ${map.selector} info buttons:`, err);
    }
  });

  // Humanity track containers
  const humanityProcessed = new WeakSet();
  function attachHumanity(track){
    if(humanityProcessed.has(track)) return;
    humanityProcessed.add(track);
    if (track.nextElementSibling?.classList.contains('humanity-info-button')) return;

    const hBtn = createInfoButton('Humanity');
    hBtn.classList.add('humanity-info-button');
    track.after(hBtn);
    new bootstrap.Tooltip(hBtn);

    hBtn.addEventListener('click', async () => {
      // Determine current Humanity score (filled boxes)
      const current = track.querySelectorAll('.track-box.filled').length;
      // Ensure current is a valid key (0-10)
      const validCurrent = Math.min(Math.max(current, 0), 10);

      try {
        const mod          = await import('./references/humanity.js');
        const humanityData = mod?.humanity || mod?.default || mod || {};

        // Basic overview — always show if present
        let html = '';
        if (humanityData?.overview?.description) {
          html += `<p>${humanityData.overview.description}</p>`;
        }

        // Detailed rating info (if the lookup succeeds)
        const ratingInfo   = humanityData?.ratings?.[validCurrent] || null;
        if (ratingInfo) {
          html += '<hr>';
          if (ratingInfo.description) {
            html += `<p>${ratingInfo.description}</p>`;
          }
          if (Array.isArray(ratingInfo.effects) && ratingInfo.effects.length) {
            html += list('Effects', ratingInfo.effects);
          }
          if (ratingInfo.torporLength) {
            html += `<p><strong>Torpor Length:</strong> ${ratingInfo.torporLength}</p>`;
          }
        }

        // Fallback message when no rating-specific entry was found
        if (!ratingInfo) {
          html += '<p>No detailed information is available for this Humanity rating.</p>';
        }

        showModal('humanity-info-modal', html, `Humanity ${validCurrent}`);

      } catch (err) {
        console.error('Error loading Humanity information:', err);
        showModal('humanity-info-modal', '<p>Error loading Humanity information.</p>', 'Humanity');
      }
    });
  }

  document.querySelectorAll('.track-container[data-type="humanity"]').forEach(attachHumanity);

  // Observe for humanity tracks appearing later
  const humanObs = new MutationObserver(muts=>{
    muts.forEach(m=>{
      m.addedNodes.forEach(node=>{
        if(node.nodeType!==1) return;
        if(node.matches && node.matches('.track-container[data-type="humanity"]')) attachHumanity(node);
        if(node.querySelectorAll) node.querySelectorAll('.track-container[data-type="humanity"]').forEach(attachHumanity);
      });
    });
  });
  humanObs.observe(document.body, {childList:true, subtree:true});

  // Blood Potency dots (stat row uses .dots without a dropdown)
  const bpProcessed = new WeakSet();
  function attachBP(stat){
    if(bpProcessed.has(stat)) return;
    const labelEl = stat.querySelector('.stat-label');
    if(!labelEl) return;
    if(labelEl.textContent.trim().toLowerCase() !== 'blood potency') return;
    
    function addBtn(dots){
      if(bpProcessed.has(stat)) return; // ensure only once after dots present
      if(dots.nextElementSibling?.classList.contains('blood-potency-info-button')) return;
      const bpBtn = createInfoButton('BP');
      bpBtn.classList.add('blood-potency-info-button');
      dots.after(bpBtn);
      new bootstrap.Tooltip(bpBtn);
      bpBtn.addEventListener('click', async ()=>{
        const level = parseInt(dots.dataset.value || '0', 10);
        try {
          const mod = await import('./references/blood_potency.js');
          const bpData = mod.bloodPotency || mod.default || mod;
          const bpLevels = (bpData && bpData.levels) ? bpData.levels : {};
          const bp = bpLevels[level] || {};
          let html = `<p>${bp.description||''}</p>`;
          html += list('Effects', bp.effects);
          html += badge('Bane Severity', bp.baneSeverity);
          html += badge('Surge Bonus', bp.bloodSurgeBonus && '+'+bp.bloodSurgeBonus+' dice');
          html += badge('Mend per Rouse', bp.healingAmount && bp.healingAmount+' Superficial');
          html += badge('Discipline Bonus', bp.disciplineBonus && '+'+bp.disciplineBonus+' die');
          showModal('blood-potency-info-modal', html, `Blood Potency ${level}`);
        } catch(err){ console.error('Error loading Blood Potency info:', err);} 
      });
      bpProcessed.add(stat);
    }

    const dotsNow = stat.querySelector('.dots');
    if(dotsNow){
      addBtn(dotsNow);
    } else {
      // observe for dots being added inside this stat
      const localObs = new MutationObserver(muts=>{
        for(const m of muts){
          m.addedNodes.forEach(node=>{
            if(node.nodeType!==1) return;
            if(node.matches && node.matches('.dots')){ addBtn(node); localObs.disconnect(); }
            if(node.querySelector && node.querySelector('.dots')){ addBtn(node.querySelector('.dots')); localObs.disconnect(); }
          });
        }
      });
      localObs.observe(stat, {childList:true, subtree:true});
    }
  }

  document.querySelectorAll('.stat').forEach(attachBP);

  const bpObs = new MutationObserver(muts=>{
    muts.forEach(m=>{
      m.addedNodes.forEach(node=>{
        if(node.nodeType!==1) return;
        if(node.matches && node.matches('.stat')) attachBP(node);
        if(node.querySelectorAll) node.querySelectorAll('.stat').forEach(attachBP);
      });
    });
  });
  bpObs.observe(document.body, {childList:true, subtree:true});

  // Add info buttons to Attributes and Skills
  const statProcessed = new WeakSet();
  
  function attachStatInfo(stat) {
    if (statProcessed.has(stat)) return;
    
    const labelEl = stat.querySelector('.stat-label');
    if (!labelEl) return;
    
    const statName = labelEl.textContent.trim().toLowerCase();
    let dotsContainer = stat.querySelector('.dots');
    
    // Determine if this stat is an Attribute or Skill
    let statKey = null;
    let statData = null;
    for (const cat of ['physical', 'social', 'mental']) {
      if (infoButtonsAttributes[cat]?.attributes) {
        const key = statName.replace(/\s+/g, '');
        if (infoButtonsAttributes[cat].attributes[key]) {
          statKey = key;
          statData = infoButtonsAttributes[cat].attributes[key];
          break;
        }
      }
    }
    if (!statData) {
      for (const cat of ['physical', 'social', 'mental']) {
        if (infoButtonsSkills[cat]) {
          const key = statName.toLowerCase().replace(/\s+(.)/g, (m,g)=>g.toUpperCase());
          if (infoButtonsSkills[cat][key]) {
            statKey = key;
            statData = infoButtonsSkills[cat][key];
            break;
          }
        }
      }
    }
    if (!statData) return; // not attribute/skill

    // helper to actually insert the button once dots appear
    function insertBtn(dc){
      if(statProcessed.has(stat)) return;
      const infoBtn = createInfoButton(statData.name);
      infoBtn.classList.add('stat-info-button');

      // Build right-aligned group
      const group = document.createElement('div');
      group.className = 'd-flex align-items-center ms-auto gap-2 stat-dots-group';

      // Move dots and append button
      group.appendChild(dc);
      group.appendChild(infoBtn);

      stat.appendChild(group);

      new bootstrap.Tooltip(infoBtn);
      infoBtn.addEventListener('click', async ()=>{
        // Get current value at click time
        const currentValue = dc.querySelectorAll('.dot.filled').length;        
        // Special handling for Generation
        if (statName === 'generation') {
          try {
            const mod = await import('./references/generation.js');
            const genData = mod.generation;
            
            let content = `<p>${genData.overview.description}</p>`;
            content += `<p><em>${genData.overview.note}</em></p>`;
            
            // Add generation tier info
            const tier = genData.getGenerationTier(currentValue);
            if (tier) {
              content += `<hr/><h6>${tier.name}</h6><p>${tier.description}</p>`;
            }
            
            // Add blood potency limits
            const limits = genData.bloodPotencyLimits[currentValue];
            if (limits) {
              content += `<hr/><h6>Blood Potency Limits</h6><p>Range: ${limits.lowest} - ${limits.highest}</p>`;
            }
            
            showModal(`stat-${statKey}-modal`, content, `Generation ${currentValue}`);
            return;
          } catch (err) {
            console.error('Error loading Generation info:', err);
            showModal(`stat-${statKey}-modal`, '<p>Error loading Generation information.</p>', 'Generation');
          }
        }
        
        const content = generateStatContent(statData, currentValue);
        showModal(`stat-${statKey}-modal`, content, statData.name);
      });

      statProcessed.add(stat);
    }

    if(dotsContainer){
      insertBtn(dotsContainer);
    } else {
      // Observe this stat row for the dots container to appear
      const observer = new MutationObserver(muts=>{
        for(const m of muts){
          m.addedNodes.forEach(node=>{
            if(node.nodeType!==1) return;
            if(node.matches && node.matches('.dots')){
              insertBtn(node);
              observer.disconnect();
            } else if(node.querySelector){
              const dc = node.querySelector('.dots');
              if(dc){
                insertBtn(dc);
                observer.disconnect();
              }
            }
          });
        }
      });
      observer.observe(stat, {childList:true, subtree:true});
    }
  }
  
  // Process existing stats
  document.querySelectorAll('.stat').forEach(attachStatInfo);
  
  // Observe for new stats
  const statObs = new MutationObserver(muts => {
    muts.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches && node.matches('.stat')) attachStatInfo(node);
        if (node.querySelectorAll) node.querySelectorAll('.stat').forEach(attachStatInfo);
      });
    });
  });
  statObs.observe(document.body, { childList: true, subtree: true });
}

function generateStatContent(data, currentValue) {  
  let content = `
    <div class="info-description">${data.description}</div>
  `;
  
  // Add dot value description if available
  if (data.dotValues && typeof data.dotValues === 'object') {
    const dotValue = data.dotValues[currentValue];
    if (dotValue) {
      content += `<hr/>
        <div class="info-value">
          <strong>${currentValue} dot${currentValue !== 1 ? 's' : ''}:</strong> ${dotValue}
        </div>
      `;
    } else if (currentValue === 0) {
      content += `<hr/>
        <div class="info-value">
          <strong>0 dots:</strong> No formal training or knowledge in this skill.
        </div>
      `;
    }
  }
  
  // Add specialties if available
  if (data.specialties && data.specialties.length > 0) {
    content += `<hr/>
      <div class="info-specialties">
        <strong>Specialties:</strong>
        <ul>
          ${data.specialties.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Add example pools if available
  if (data.examplePools) {
    content += `<hr/>
      <div class="info-examples">
        <strong>Example Pools:</strong>
        <ul>
          ${Object.entries(data.examplePools).map(([pool, examples]) => {
            const examplesList = Array.isArray(examples) ? examples : [examples];
            return `<li><strong>${pool.charAt(0).toUpperCase() + pool.slice(1)}:</strong> ${examplesList.join(', ')}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }
  
  return content;
}

if (document.readyState === 'complete') {
  initInfoButtons();
} else {
  // wait until DOMContentLoaded to ensure other scripts (character-sheet) have finished mutations
  document.addEventListener('DOMContentLoaded', initInfoButtons);
} 