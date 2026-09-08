// HTML/string content builders for info-button modals

export function list(label, items) {
  if (!items || !items.length) return '';
  if (!Array.isArray(items)) items = Array.from(items);
  let html = `<h6>${label}</h6><ul>`;
  items.forEach(it => {
    html += `<li>${it}</li>`;
  });
  html += '</ul>';
  return html;
}

export function badge(label, value) {
  if (!value) return '';
  return `<p><span class="badge bg-secondary me-2">${label}:</span> ${value}</p>`;
}

// Helper function to build content for dropdown items
export function buildDropdownContent(data, key) {
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
  
  const commonFields = ['cost', 'duration', 'range', 'type', 'category'];
  commonFields.forEach(field => {
    if (item[field]) {
      html += badge(field.charAt(0).toUpperCase() + field.slice(1), item[field]);
    }
  });
  
  return html || '<p>No detailed information available.</p>';
}

// Specialized content builders for different dropdown types
export function buildResonanceContent(data, key) {
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

export function buildTemperamentContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  const item = data.temperaments?.[key];
  if (!item) return '<p>Temperament not found.</p>';
  
  let html = '';
  
  if (item.description) {
    html += `<p>${item.description}</p>`;
  }
  
  return html || '<p>No detailed information available.</p>';
}

export function buildPredatorContent(data, key) {
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

export function buildClanContent(data, key) {
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

export function buildGenerationContent(data, key) {
  if (!data || !key) return '<p>No data available.</p>';
  
  let html = '';
  
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
  
  const limits = data.getBloodPotencyLimits?.(parseInt(key, 10));
  if (limits) {
    html += '<hr>';
    html += `<h6>Blood Potency Limits</h6>`;
    html += `<p>Range: ${limits.lowest} - ${limits.highest}</p>`;
  }
  
  return html || '<p>No detailed information available.</p>';
}

export function buildCompulsionContent(data, key) {
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

export function buildDisciplinesSectionContent(data) {
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

export function buildMeritsSectionContent(data) {
  let content = '<p>Merits provide advantages that customise a character.</p>';
  const categories = Object.values(data || {});
  content += '<h5>Categories</h5><ul>';
  categories.forEach(cat => {
    content += `<li><strong>${cat.name}</strong>: ${cat.description}</li>`;
  });
  content += '</ul>';
  return content;
}

export function buildFlawsSectionContent(data) {
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

export function buildBackgroundsSectionContent(data) {
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

export function buildBackgroundFlawsSectionContent(data) {
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

export function buildLoresheetsSectionContent(data) {
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

export function buildAttributesSectionContent(data) {
  let content = '';
  if (data.overview?.description) {
    content += `<p>${data.overview.description}</p>`;
  }
  if (data.overview?.distribution) {
    content += `<p>${data.overview.distribution}</p>`;
  }
  
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

export function buildSkillsSectionContent(data) {
  let content = '';
  if (data.overview?.description) {
    content += `<p>${data.overview.description}</p>`;
  }
  
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

export function generateStatContent(data, currentValue) {  
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
