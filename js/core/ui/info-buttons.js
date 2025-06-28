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

// Import attribute and skill definitions
import { attributes } from '../../data/attributes.js';
import { skills } from '../../data/skills.js';
import logger from '../utils/logger.js';
import { TraitManagerUtils } from '../managers/manager-utils.js';

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

// Helper function to build content for dropdown items
function buildDropdownContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const item = data[key];
  if (!item) return '<p>Item not found.</p>';
  
  let html = '';
  
  if (item.description) {
    html += `<p>${item.description}</p>`;
  }
  
  if (item.effects && Array.isArray(item.effects)) {
    html += list('Effects', item.effects);
  }
  
  if (item.benefits && Array.isArray(item.benefits)) {
    html += list('Benefits', item.benefits);
  }
  
  if (item.drawbacks && Array.isArray(item.drawbacks)) {
    html += list('Drawbacks', item.drawbacks);
  }
  
  if (item.requirements && Array.isArray(item.requirements)) {
    html += list('Requirements', item.requirements);
  }
  
  // Add any other common fields
  const commonFields = ['cost', 'duration', 'range', 'type', 'category'];
  commonFields.forEach(field => {
    if (item[field]) {
      html += badge(field.charAt(0).toUpperCase() + field.slice(1), item[field]);
    }
  });
  
  return html || '<p>No detailed information available.</p>';
}

// Specialized content builders for different dropdown types
function buildResonanceContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const item = data.types?.[key];
  if (!item) return '<p>Resonance not found.</p>';
  
  let html = '';
  
  if (item.description) {
    html += `<p>${item.description}</p>`;
  }
  
  if (item.emotions && Array.isArray(item.emotions)) {
    html += list('Associated Emotions', item.emotions);
  }
  
  if (item.disciplines && Array.isArray(item.disciplines)) {
    html += list('Associated Disciplines', item.disciplines);
  }
  
  return html || '<p>No detailed information available.</p>';
}

function buildTemperamentContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const item = data.temperaments?.[key];
  if (!item) return '<p>Temperament not found.</p>';
  
  let html = '';
  
  if (item.description) {
    html += `<p>${item.description}</p>`;
  }
  
  return html || '<p>No detailed information available.</p>';
}

function buildPredatorContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const item = data.types?.[key];
  if (!item) return '<p>Predator type not found.</p>';
  
  let html = '';
  
  if (item.description) {
    html += `<p>${item.description}</p>`;
  }
  
  if (item.dicePools && Array.isArray(item.dicePools)) {
    html += list('Dice Pools', item.dicePools);
  }
  
  if (item.benefits && Array.isArray(item.benefits)) {
    html += list('Benefits', item.benefits);
  }
  
  if (item.drawbacks && Array.isArray(item.drawbacks)) {
    html += list('Drawbacks', item.drawbacks);
  }
  
  if (item.source) {
    html += badge('Source', item.source);
  }
  
  return html || '<p>No detailed information available.</p>';
}

function buildClanContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const item = data.types?.[key];
  if (!item) return '<p>Clan not found.</p>';
  
  let html = '';
  
  // Clan name and nicknames
  if (item.name) {
    html += `<h5>${item.name}</h5>`;
  }
  
  if (item.nicknames && Array.isArray(item.nicknames)) {
    html += `<p><em>Also known as: ${item.nicknames.join(', ')}</em></p>`;
  }
  
  // Background description
  if (item.background?.description) {
    html += `<p>${item.background.description}</p>`;
  }
  
  // Disciplines
  if (item.disciplines && Array.isArray(item.disciplines)) {
    html += list('Disciplines', item.disciplines);
  }
  
  // Detailed discipline descriptions
  if (item.disciplines && typeof item.disciplines === 'object' && !Array.isArray(item.disciplines)) {
    html += '<h6>Discipline Descriptions</h6>';
    Object.entries(item.disciplines).forEach(([discipline, description]) => {
      html += `<p><strong>${discipline.charAt(0).toUpperCase() + discipline.slice(1)}:</strong> ${description}</p>`;
    });
  }
  
  // Archetypes
  if (item.archetypes && typeof item.archetypes === 'object') {
    html += '<h6>Archetypes</h6>';
    Object.entries(item.archetypes).forEach(([archetype, description]) => {
      const archetypeName = archetype.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      html += `<p><strong>${archetypeName}:</strong> ${description}</p>`;
    });
  }
  
  // Bane
  if (item.bane) {
    if (typeof item.bane === 'object' && item.bane.name && item.bane.description) {
      html += `<hr><h6>${item.bane.name}</h6><p>${item.bane.description}</p>`;
    } else {
      html += badge('Bane', item.bane);
    }
  }
  
  // Variant Bane (if different from main bane)
  if (item.variantBane && typeof item.variantBane === 'object' && item.variantBane.name && item.variantBane.description) {
    html += `<h6>${item.variantBane.name} (Variant Bane)</h6><p>${item.variantBane.description}</p>`;
  }
  
  // Compulsion
  if (item.compulsion) {
    if (typeof item.compulsion === 'object' && item.compulsion.name && item.compulsion.description) {
      html += `<h6>${item.compulsion.name}</h6><p>${item.compulsion.description}</p>`;
    } else {
      html += badge('Compulsion', item.compulsion);
    }
  }
  
  // Culture - Embrace criteria
  if (item.culture?.embrace?.criteria && Array.isArray(item.culture.embrace.criteria)) {
    html += list('Embrace Criteria', item.culture.embrace.criteria);
  }
  
  // Culture - Embrace description
  if (item.culture?.embrace?.description) {
    html += `<h6>Embrace</h6><p>${item.culture.embrace.description}</p>`;
  }
  
  // Culture - Kindred Society
  if (item.culture?.kindredSociety?.description) {
    html += `<h6>In Kindred Society</h6><p>${item.culture.kindredSociety.description}</p>`;
  }
  
  // Factional Differences
  if (item.factionalDifferences) {
    html += '<h6>Factional Differences</h6>';
    Object.entries(item.factionalDifferences).forEach(([faction, info]) => {
      if (typeof info === 'object' && info.description) {
        const factionName = faction.charAt(0).toUpperCase() + faction.slice(1);
        html += `<p><strong>${factionName}:</strong> ${info.description}</p>`;
      }
    });
  }
  
  // Exclusive Loresheets
  if (item.exclusiveLoresheets && Array.isArray(item.exclusiveLoresheets)) {
    html += list('Exclusive Loresheets', item.exclusiveLoresheets);
  }
  
  return html || '<p>No detailed information available.</p>';
}

function buildGenerationContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  let html = '';
  
  // Add overview
  if (data.overview?.description) {
    html += `<p>${data.overview.description}</p>`;
  }
  
  if (data.overview?.note) {
    html += `<p><em>${data.overview.note}</em></p>`;
  }
  
  // Add generation-specific info
  const tier = data.getGenerationTier?.(parseInt(key, 10));
  if (tier) {
    html += '<hr>';
    if (tier.name) {
      html += `<h6>${tier.name}</h6>`;
    }
    if (tier.description) {
      html += `<p>${tier.description}</p>`;
    }
  }
  
  // Add blood potency limits
  const limits = data.getBloodPotencyLimits?.(parseInt(key, 10));
  if (limits) {
    html += '<hr>';
    html += `<h6>Blood Potency Limits</h6>`;
    html += `<p>Range: ${limits.lowest} - ${limits.highest}</p>`;
  }
  
  return html || '<p>No detailed information available.</p>';
}

function buildCompulsionContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const [type, compKey] = key.split('.', 2);
  let item = null;
  
  if (type === 'general') {
    item = data.general?.[compKey];
  } else {
    item = data.clanCompulsions?.[compKey];
  }
  
  if (!item) return '<p>Compulsion not found.</p>';
  
  let html = '';
  
  if (item.description) {
    html += `<p>${item.description}</p>`;
  }
  
  if (item.effects && Array.isArray(item.effects)) {
    html += list('Effects', item.effects);
  }
  
  return html || '<p>No detailed information available.</p>';
}

const mappings = [
  {
    selector: '.disciplines-container',
    modulePath: '../../data/vampire/disciplines.js',
    dataKey: 'disciplines',
    title: 'Disciplines',
    key: 'disciplines',
    heading: 'Disciplines',
    titlePrefix: 'Disciplines',
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
    }
  },
  {
    selector: '.merits-container',
    modulePath: '../../data/vampire/merits.js',
    dataKey: 'merits',
    title: 'Merits',
    key: 'merits',
    heading: 'Merits',
    titlePrefix: 'Merits',
    buildContent: (data) => {
      let content = '<p>Merits provide advantages that customise a character.</p>';
      const categories = Object.values(data || {});
      content += '<h5>Categories</h5><ul>';
      categories.forEach(cat => {
        content += `<li><strong>${cat.name}</strong>: ${cat.description}</li>`;
      });
      content += '</ul>';
      return content;
    }
  },
  {
    selector: '.merits-container',
    modulePath: '../../data/vampire/merits.js', // same file
    dataKey: 'merits',
    title: 'Flaws',
    key: 'flaws',
    heading: 'Flaws',
    titlePrefix: 'Flaws',
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
    }
  },
  {
    selector: '.backgrounds-container',
    modulePath: '../../data/vampire/backgrounds.js',
    dataKey: 'backgrounds',
    title: 'Backgrounds',
    key: 'backgrounds',
    heading: 'Backgrounds',
    titlePrefix: 'Background Merits',
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
    }
  },
  {
    selector: '.backgrounds-container',
    modulePath: '../../data/vampire/backgrounds.js',
    dataKey: 'backgrounds',
    title: 'Background Flaws',
    key: 'backgroundFlaws',
    heading: 'Background Flaws',
    titlePrefix: 'Background Flaws',
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
    }
  },
  {
    selector: '.loresheets-container',
    modulePath: '../../data/vampire/loresheets.js',
    dataKey: 'loresheets',
    title: 'Loresheets',
    key: 'loresheets',
    heading: 'Loresheets',
    titlePrefix: 'Loresheets',
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
    }
  },
  {
    selector: '.attributes-container',
    modulePath: '../../data/attributes.js',
    dataKey: 'attributes',
    title: 'Attributes',
    key: 'attributes',
    heading: 'Attributes',
    titlePrefix: 'Attributes',
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
    }
  },
  {
    selector: '.skills-container',
    modulePath: '../../data/skills.js',
    dataKey: 'skills',
    title: 'Skills',
    key: 'skills',
    heading: 'Skills',
    titlePrefix: 'Skills',
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
    }
  }
];

const dropdownMappings = [
  {                // Resonance
    selector : '.resonance-dropdown',
    module   : '../../data/vampire/resonances.js',
    dataKey: 'resonances',
    title: 'Resonance',
    buildContent: buildResonanceContent
  },
  {                // Temperament
    selector : '.temperament-dropdown',
    module   : '../../data/vampire/resonances.js',
    dataKey: 'resonances',
    title: 'Temperament',
    buildContent: buildTemperamentContent
  },
  {                // Predator Type
    selector : '.predator-dropdown',
    module   : '../../data/vampire/predator_types.js',
    dataKey: 'predatorTypes',
    title: 'Predator Type',
    buildContent: buildPredatorContent
  },
  {                // Clan
    selector : '.clan-dropdown',
    module   : '../../data/vampire/clans.js',
    dataKey: 'clans',
    title: 'Clan',
    buildContent: buildClanContent
  },
  {                // Generation
    selector : '.generation-dropdown',
    module   : '../../data/vampire/generation.js',
    dataKey: 'generation',
    title: 'Generation',
    buildContent: buildGenerationContent
  },
  {                // Blood Potency
    selector : '.blood-potency-dropdown',
    module   : '../../data/vampire/blood_potency.js',
    dataKey: 'bloodPotency',
    title: 'Blood Potency',
    buildContent: buildDropdownContent
  },
  {                // Compulsion
    selector : '.compulsion-dropdown',
    module   : '../../data/vampire/compulsions.js',
    dataKey: 'compulsions',
    title: 'Compulsion',
    buildContent: buildCompulsionContent
  }
];

function createInfoButton(title) {
  const btn = document.createElement('button');
  btn.className = `btn btn-sm theme-btn-outline-secondary ms-2 ledger-info-btn ${title.toLowerCase().replace(/\s+/g, '-')}-info-button`;
  btn.innerHTML = '<i class="bi bi-info-circle"></i>';
  btn.setAttribute('aria-label', `Show ${title} information`);
  btn.setAttribute('data-bs-toggle', 'tooltip');
  btn.setAttribute('data-bs-placement', 'top');
  return btn;
}

function ensureModal(id, titleText) {
  // This function is no longer needed since modalManager handles modal creation
  // Return a dummy element for backward compatibility
  return document.createElement('div');
}

function showModal(id, contentHtml, titleText = 'Info') {
  window.modalManager.info(titleText, contentHtml, {
    size: 'default',
    centered: true
  });
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
        showModal(`${mapping.key}-heading-info-modal`, contentHtml, mapping.titlePrefix);
      } catch (err) {
        logger.error(`Error loading ${mapping.key} info:`, err);
      }
    });
  });

  dropdownMappings.forEach(async map => {
    try {
      const mod = await import(map.module);
      const data = mod[map.dataKey] || mod.default || mod;
      if (!data) {
        logger.error(`No data found for ${map.selector}`);
        return;
      }

      const processed = new WeakSet();

      function attachBtn(dd){
        if(processed.has(dd)) return;
        processed.add(dd);

        const baseClass = map.selector.replace('.', '').split('-')[0] + '-info-button';
        if (dd.nextElementSibling?.classList.contains(baseClass) || dd.nextElementSibling?.classList.contains('dd-info-btn')) return;

        const infoBtn = createInfoButton(map.title);
        infoBtn.classList.add('dd-info-btn', baseClass);
        dd.after(infoBtn);
        new bootstrap.Tooltip(infoBtn);

        infoBtn.addEventListener('click', () => {
          const key = dd.value;
          if (!key || !data) {
            logger.error('Invalid data or key:', { key, data });
            return;
          }

          // Use the specialized content builder for each dropdown type
          const html = map.buildContent ? map.buildContent(data, key) : '<p>No content available.</p>';
          
          // Determine title based on the data structure
          let title = 'Info';
          if (map.selector === '.resonance-dropdown') {
            const item = data.types?.[key];
            title = item?.name || `Resonance ${key}`;
          } else if (map.selector === '.temperament-dropdown') {
            const item = data.temperaments?.[key];
            title = item?.name || `Temperament ${key}`;
          } else if (map.selector === '.predator-dropdown') {
            const item = data.types?.[key];
            title = item?.name || `Predator Type ${key}`;
          } else if (map.selector === '.clan-dropdown') {
            const item = data.types?.[key];
            title = item?.name || `Clan ${key}`;
          } else if (map.selector === '.generation-dropdown') {
            title = `Generation ${key}`;
          } else if (map.selector === '.compulsion-dropdown') {
            const [type, compKey] = key.split('.', 2);
            const item = type === 'general' ? data.general?.[compKey] : data.clanCompulsions?.[compKey];
            title = item?.name || 'Compulsion';
          } else {
            // Fallback for other dropdowns
            const item = data[key];
            title = item?.name || item?.title || 'Info';
          }
          
          showModal(`${baseClass}-modal`, html, title);
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
      logger.error(`Error setting up ${map.selector} info buttons:`, err);
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
        const mod          = await import('../../data/vampire/humanity.js');
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
        logger.error('Error loading Humanity information:', err);
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
          const mod = await import('../../data/vampire/blood_potency.js');
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
        } catch(err){ logger.error('Error loading Blood Potency info:', err);}
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
      if (attributes[cat]?.attributes) {
        const key = statName.replace(/\s+/g, '');
        if (attributes[cat].attributes[key]) {
          statKey = key;
          statData = attributes[cat].attributes[key];
          break;
        }
      }
    }
    if (!statData) {
      for (const cat of ['physical', 'social', 'mental']) {
        if (skills[cat]) {
          const key = statName.toLowerCase().replace(/\s+(.)/g, (m,g)=>g.toUpperCase());
          if (skills[cat][key]) {
            statKey = key;
            statData = skills[cat][key];
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
            const mod = await import('../../data/vampire/generation.js');
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
            
            showModal('generation-info-modal', content, `Generation ${currentValue}`);
          } catch (err) {
            logger.error('Error loading Generation info:', err);
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