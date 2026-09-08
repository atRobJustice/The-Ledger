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
import {
  list,
  badge,
  buildDropdownContent,
  buildResonanceContent,
  buildTemperamentContent,
  buildPredatorContent,
  buildClanContent,
  buildGenerationContent,
  buildCompulsionContent,
  buildDisciplinesSectionContent,
  buildMeritsSectionContent,
  buildFlawsSectionContent,
  buildBackgroundsSectionContent,
  buildBackgroundFlawsSectionContent,
  buildLoresheetsSectionContent,
  buildAttributesSectionContent,
  buildSkillsSectionContent,
  generateStatContent
} from './info-content-builders.js';

const mappings = [
  {
    selector: '.disciplines-container',
    modulePath: '../../data/vampire/disciplines.js',
    dataKey: 'disciplines',
    title: 'Disciplines',
    key: 'disciplines',
    heading: 'Disciplines',
    titlePrefix: 'Disciplines',
    buildContent: buildDisciplinesSectionContent
  },
  {
    selector: '.merits-container',
    modulePath: '../../data/vampire/merits.js',
    dataKey: 'merits',
    title: 'Merits',
    key: 'merits',
    heading: 'Merits',
    titlePrefix: 'Merits',
    buildContent: buildMeritsSectionContent
  },
  {
    selector: '.merits-container',
    modulePath: '../../data/vampire/merits.js', // same file
    dataKey: 'merits',
    title: 'Flaws',
    key: 'flaws',
    heading: 'Flaws',
    titlePrefix: 'Flaws',
    buildContent: buildFlawsSectionContent
  },
  {
    selector: '.backgrounds-container',
    modulePath: '../../data/vampire/backgrounds.js',
    dataKey: 'backgrounds',
    title: 'Backgrounds',
    key: 'backgrounds',
    heading: 'Backgrounds',
    titlePrefix: 'Background Merits',
    buildContent: buildBackgroundsSectionContent
  },
  {
    selector: '.backgrounds-container',
    modulePath: '../../data/vampire/backgrounds.js',
    dataKey: 'backgrounds',
    title: 'Background Flaws',
    key: 'backgroundFlaws',
    heading: 'Background Flaws',
    titlePrefix: 'Background Flaws',
    buildContent: buildBackgroundFlawsSectionContent
  },
  {
    selector: '.loresheets-container',
    modulePath: '../../data/vampire/loresheets.js',
    dataKey: 'loresheets',
    title: 'Loresheets',
    key: 'loresheets',
    heading: 'Loresheets',
    titlePrefix: 'Loresheets',
    buildContent: buildLoresheetsSectionContent
  },
  {
    selector: '.attributes-container',
    modulePath: '../../data/attributes.js',
    dataKey: 'attributes',
    title: 'Attributes',
    key: 'attributes',
    heading: 'Attributes',
    titlePrefix: 'Attributes',
    buildContent: buildAttributesSectionContent
  },
  {
    selector: '.skills-container',
    modulePath: '../../data/skills.js',
    dataKey: 'skills',
    title: 'Skills',
    key: 'skills',
    heading: 'Skills',
    titlePrefix: 'Skills',
    buildContent: buildSkillsSectionContent
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
        const currentValue = dc.querySelectorAll('.dot.filled').length;        
        // Special handling for Generation
        if (statName === 'generation') {
          try {
            const mod = await import('../../data/vampire/generation.js');
            const genData = mod.generation;
            
            let content = `<p>${genData.overview.description}</p>`;
            content += `<p><em>${genData.overview.note}</em></p>`;
            
            const tier = genData.getGenerationTier(currentValue);
            if (tier) {
              content += `<hr/><h6>${tier.name}</h6><p>${tier.description}</p>`;
            }
            
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

if (document.readyState === 'complete') {
  initInfoButtons();
} else {
  // wait until DOMContentLoaded to ensure other scripts (character-sheet) have finished mutations
  document.addEventListener('DOMContentLoaded', initInfoButtons);
}
