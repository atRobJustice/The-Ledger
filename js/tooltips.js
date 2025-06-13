// Import attribute definitions
import { attributes } from './references/attributes.js';
import { skills } from './references/skills.js';

// Store tooltips globally for access
let tooltipInstances = [];

document.addEventListener('DOMContentLoaded', () => {
    // Find sections by looking for all h2 elements
    const headings = document.querySelectorAll('h2');
    let attributesSection = null;
    let skillsSection = null;
    
    // Find both Attributes and Skills sections
    for (const heading of headings) {
        if (heading.textContent.trim() === 'Attributes') {
            attributesSection = heading.closest('.row');
        } else if (heading.textContent.trim() === 'Skills') {
            skillsSection = heading.closest('.row');
        }
    }
    
    // Setup Attributes tooltips
    if (!attributesSection) {
        console.error('Attributes section not found');
    } else {
        // Get the category columns
        const attributeColumns = attributesSection.querySelectorAll('.col-md-4');
        if (attributeColumns.length < 3) {
            console.error('Expected attribute category columns not found');
        } else {
            // Map columns to categories
            const attributeCategories = ['physical', 'social', 'mental'];
            
            // Process each column with its category
            attributeColumns.forEach((column, index) => {
                if (index < attributeCategories.length) {
                    setupAttributeTooltips(column, attributeCategories[index]);
                }
            });
        }
    }
    
    // Setup Skills tooltips
    if (!skillsSection) {
        console.error('Skills section not found');
    } else {
        // Get the category columns
        const skillColumns = skillsSection.querySelectorAll('.col-md-4');
        if (skillColumns.length < 3) {
            console.error('Expected skill category columns not found');
        } else {
            // Map columns to categories
            const skillCategories = ['physical', 'social', 'mental'];
            
            // Process each column with its category
            skillColumns.forEach((column, index) => {
                if (index < skillCategories.length) {
                    setupSkillTooltips(column, skillCategories[index]);
                }
            });
        }
    }
    
    // Initialize all tooltips with click trigger
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipInstances = tooltipTriggerList.map(function (tooltipTriggerEl) {
        // Create new tooltip instance
        const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
            html: true,
            trigger: 'click',
            container: 'body'
        });
        
        // Get category and stat keys
        const category = tooltipTriggerEl.getAttribute('data-category');
        const attributeKey = tooltipTriggerEl.getAttribute('data-attribute-key');
        const skillKey = tooltipTriggerEl.getAttribute('data-skill-key');
        const isSkill = !!skillKey;
        
        // Default to 1 for attributes, 0 for skills if not specified
        const defaultValue = isSkill ? '0' : '1';
        const currentValue = parseInt(tooltipTriggerEl.nextElementSibling?.textContent || defaultValue, 10);
        
        // Make sure _tooltipData is properly initialized
        if (!tooltipTriggerEl._tooltipData) {
            tooltipTriggerEl._tooltipData = {};
        }
        
        // Store tooltip data including the actual tooltip instance
        tooltipTriggerEl._tooltipData.tooltip = tooltip;
        tooltipTriggerEl._tooltipData.category = category;
        tooltipTriggerEl._tooltipData.currentValue = currentValue;
        tooltipTriggerEl._tooltipData.isSkill = isSkill;
        
        if (isSkill) {
            tooltipTriggerEl._tooltipData.skillKey = skillKey;
        } else {
            tooltipTriggerEl._tooltipData.attributeKey = attributeKey;
        }
                
        return tooltip;
    });
    
    // Add mouseout event listeners to close tooltips when mouse leaves
    document.addEventListener('mouseout', (event) => {
        // Get the element being left
        const from = event.target;
        // Get the element being entered
        const to = event.relatedTarget;
        
        // Check if we're leaving a tooltip or tooltip trigger
        if (from.hasAttribute('data-bs-toggle') || from.closest('.tooltip')) {
            // Check that we're not entering another part of the tooltip or the trigger
            if (!to || (!to.hasAttribute('data-bs-toggle') && !to.closest('.tooltip'))) {
                // Hide all tooltips
                tooltipInstances.forEach(tooltip => tooltip.hide());
            }
        }
    });
    
    // Listen for custom attribute value change events from character-sheet.js
    document.addEventListener('attribute:valueChanged', (event) => {
        const { label, value } = event.detail;
        if (label && !isNaN(value)) {
           
            // Use setTimeout to ensure the tooltip has time to finish any animations
            setTimeout(() => {
                // Update tooltip content without showing it
                updateTooltipContentSilently(label, value);
            }, 10);
        }
    });
    
    // Also monitor dot changes directly to catch any missed events
    document.addEventListener('click', (event) => {
        // Check if we clicked a dot
        if (event.target.classList.contains('dot')) {
            // Find the parent stat
            const dotParent = event.target.closest('.dots');
            if (dotParent) {
                const $stat = $(dotParent).closest('.stat');
                const $label = $stat.find('.stat-label');
                
                if ($label.length && $label.attr('data-bs-toggle') === 'tooltip') {
                    // Get the new value
                    const newValue = parseInt(dotParent.getAttribute('data-value'));
                    
                    if (!isNaN(newValue)) {
                        // Update the tooltip data without showing the tooltip
                        setTimeout(() => {
                            // Get the tooltip instance
                            const tooltipInstance = bootstrap.Tooltip.getInstance($label[0]);
                            
                            if (tooltipInstance) {
                                // Hide the tooltip if it's visible
                                tooltipInstance.hide();
                                
                                // Update the tooltip content without showing it
                                updateTooltipContentSilently($label[0], newValue);
                            }
                        }, 50);
                    }
                }
            }
        }
    });
});

/**
 * Sets up tooltips for attributes in a specific column
 * @param {Element} column - The column element
 * @param {string} category - The category name (physical, social, mental)
 */
function setupAttributeTooltips(column, category) {
    // Check if the category exists in our data
    if (!attributes[category] || !attributes[category].attributes) {
        console.error(`Category ${category} not found in attributes data`);
        return;
    }
    
    // Get all stat labels in the column
    const statLabels = column.querySelectorAll('.stat-label');
    
    // Process each stat label
    statLabels.forEach(label => {
        // Get attribute name
        const attributeName = label.textContent.trim().toLowerCase();
        const attributeKey = attributeName.replace(/\s+/g, '');
        
        // Check if we have data for this attribute
        if (!attributes[category].attributes[attributeKey]) {
            console.warn(`No data found for attribute: ${attributeName} in category ${category}`);
            return;
        }
        
        // Get attribute data
        const attributeData = attributes[category].attributes[attributeKey];
        
        // Get current value for dot description
        const valueSpan = label.nextElementSibling;
        const currentValue = parseInt(valueSpan ? valueSpan.textContent : '1', 10);
        
        // Create tooltip HTML content
        const tooltipContent = generateTooltipContent(attributeData, currentValue);
        
        // Set up the Bootstrap tooltip
        label.setAttribute('data-bs-toggle', 'tooltip');
        label.setAttribute('data-bs-placement', 'top');
        label.setAttribute('data-bs-title', tooltipContent);
        
        // Store category and key for later reference
        label.setAttribute('data-category', category);
        label.setAttribute('data-attribute-key', attributeKey);
        
        // Store reference to value span
        label._valueSpan = valueSpan;
        
        // Also store data for the tooltip for updates
        label._tooltipData = {
            category,
            attributeKey,
            currentValue
        };
    });
}

/**
 * Sets up tooltips for skills in a specific column
 * @param {Element} column - The column element
 * @param {string} category - The category name (physical, social, mental)
 */
function setupSkillTooltips(column, category) {
    // Check if the category exists in our data
    if (!skills[category]) {
        console.error(`Category ${category} not found in skills data`);
        return;
    }
    
    // Get all stat labels in the column
    const statLabels = column.querySelectorAll('.stat-label');
    
    // Process each stat label
    statLabels.forEach(label => {
        // Get skill name
        const skillName = label.textContent.trim().toLowerCase();
        // Convert "Animal Ken" to "animalKen" for lookup
        const skillKey = skillName.replace(/\s+(.)/g, (match, group) => group.toUpperCase()).replace(/\s+/g, '');
        
        // Check if we have data for this skill
        if (!skills[category][skillKey]) {
            console.warn(`No data found for skill: ${skillName} in category ${category}`);
            return;
        }
        
        // Get skill data
        const skillData = skills[category][skillKey];
        
        // Get current value for dot description
        const valueSpan = label.nextElementSibling;
        const currentValue = parseInt(valueSpan ? valueSpan.textContent : '0', 10);
        
        // Create tooltip HTML content
        const tooltipContent = generateTooltipContent(skillData, currentValue);
        
        // Set up the Bootstrap tooltip
        label.setAttribute('data-bs-toggle', 'tooltip');
        label.setAttribute('data-bs-placement', 'top');
        label.setAttribute('data-bs-title', tooltipContent);
        
        // Store category and key for later reference
        label.setAttribute('data-category', category);
        label.setAttribute('data-skill-key', skillKey);
        
        // Store reference to value span
        label._valueSpan = valueSpan;
        
        // Also store data for the tooltip for updates
        label._tooltipData = {
            category,
            skillKey,
            currentValue,
            isSkill: true // Flag to identify this as a skill (not an attribute)
        };
    });
}

/**
 * Generate tooltip HTML content
 * @param {Object} attributeData - The attribute data object
 * @param {number} currentValue - The current value/rating of the attribute
 * @returns {string} HTML content for the tooltip
 */
function generateTooltipContent(attributeData, currentValue) {
    let content = `
        <div class="tooltip-title">${attributeData.name}</div>
        <div class="tooltip-description">${attributeData.description}</div>
    `;
    
    // Add dot value description if available
    if (attributeData.dotValues && attributeData.dotValues[currentValue]) {
        content += `
            <div class="tooltip-value">
                <strong>${currentValue} dot${currentValue !== 1 ? 's' : ''}:</strong> ${attributeData.dotValues[currentValue]}
            </div>
        `;
    }
    
    return content;
}

/**
 * Update tooltip content when value changes
 * @param {Element} label - The stat label element
 * @param {number} newValue - The new value of the attribute or skill
 */
function updateTooltipContent(label, newValue) {
    // Get data from attributes
    const category = label.getAttribute('data-category');
    const attributeKey = label.getAttribute('data-attribute-key');
    const skillKey = label.getAttribute('data-skill-key');
    const isSkill = !!skillKey;
    
    // If we don't have the necessary data, exit
    if (!category || (!attributeKey && !skillKey)) {
        console.warn("Missing category or stat key", label);
        return;
    }
    
    // Get stat data based on whether it's an attribute or skill
    let statData;
    let statName;
    
    if (isSkill) {
        statData = skills[category]?.[skillKey];
        statName = skillKey; // For logging
    } else {
        statData = attributes[category]?.attributes?.[attributeKey];
        statName = attributeKey; // For logging
    }
    
    if (!statData) {
        console.warn(`No data found for ${isSkill ? 'skill' : 'attribute'} ${category}.${isSkill ? skillKey : attributeKey}`);
        return;
    }
    
    // Generate new tooltip content
    const newContent = generateTooltipContent(statData, newValue);
    
    // Update tooltip content in attribute
    label.setAttribute('data-bs-title', newContent);
    
    // Get the tooltip instance directly
    const tooltipInstance = bootstrap.Tooltip.getInstance(label);
    
    // If tooltip is currently shown, update its content
    if (tooltipInstance) {
        try {
            // Force hide and re-show to update with new content
            tooltipInstance.hide();
            
            // Update title before re-showing
            tooltipInstance._config.title = newContent;
            
            // Wait a moment then show the updated tooltip
            setTimeout(() => {
                // Find all active tooltips in the DOM and remove them
                document.querySelectorAll('.tooltip').forEach(el => {
                    el.remove();
                });
                
                // Show the tooltip with new content
                tooltipInstance.show();
            }, 50);
        } catch (err) {
            console.warn("Error updating tooltip:", err);
            
            // Fallback method: dispose and recreate
            try {
                tooltipInstance.dispose();
            } catch (e) {}
            
            // Create a new tooltip
            new bootstrap.Tooltip(label, {
                html: true,
                trigger: 'click',
                container: 'body',
                title: newContent
            });
        }
    }
    
    // Store the current value in a data attribute for future reference
    label.setAttribute('data-current-value', newValue);
}

/**
 * Update tooltip content when value changes without showing the tooltip
 * @param {Element} label - The stat label element
 * @param {number} newValue - The new value of the attribute or skill
 */
function updateTooltipContentSilently(label, newValue) {
    // Get data from attributes
    const category = label.getAttribute('data-category');
    const attributeKey = label.getAttribute('data-attribute-key');
    const skillKey = label.getAttribute('data-skill-key');
    const isSkill = !!skillKey;
    
    // If we don't have the necessary data, exit
    if (!category || (!attributeKey && !skillKey)) {
        console.warn("Missing category or stat key", label);
        return;
    }
    
    // Get stat data based on whether it's an attribute or skill
    let statData;
    let statName;
    
    if (isSkill) {
        statData = skills[category]?.[skillKey];
        statName = skillKey; // For logging
    } else {
        statData = attributes[category]?.attributes?.[attributeKey];
        statName = attributeKey; // For logging
    }
    
    if (!statData) {
        console.warn(`No data found for ${isSkill ? 'skill' : 'attribute'} ${category}.${isSkill ? skillKey : attributeKey}`);
        return;
    }
    
    // Generate new tooltip content
    const newContent = generateTooltipContent(statData, newValue);
    
    // Update tooltip content in attribute
    label.setAttribute('data-bs-title', newContent);
    
    // Get the tooltip instance directly
    const tooltipInstance = bootstrap.Tooltip.getInstance(label);
    
    // Update the tooltip content without showing it
    if (tooltipInstance) {
        try {
            // Just update title without showing
            tooltipInstance._config.title = newContent;
        } catch (err) {
            console.warn("Error updating tooltip silently:", err);
            
            // Fallback method: dispose and recreate
            try {
                tooltipInstance.dispose();
            } catch (e) {}
            
            // Create a new tooltip without showing it
            new bootstrap.Tooltip(label, {
                html: true,
                trigger: 'click',
                container: 'body',
                title: newContent
            });
        }
    }
    
    // Store the current value in a data attribute for future reference
    label.setAttribute('data-current-value', newValue);
}