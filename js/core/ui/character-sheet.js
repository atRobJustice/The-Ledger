/**
 * @fileoverview Character Sheet UI for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Provides the core UI functionality for the character sheet. Handles the creation
 *             and management of interactive elements including dots, track boxes, dropdowns, and
 *             form inputs, as well as impairment status evaluation and character data persistence.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires jQuery - Used for DOM manipulation and event handling
 * @requires Bootstrap - Used for UI components and styling
 * @requires clans.js - Reference data for clans
 * @requires predator_types.js - Reference data for predator types
 * @requires compulsions.js - Reference data for compulsions
 * @requires window.LockManager - For sheet lock state management
 * @requires window.convictionManager - For conviction data management
 * 
 * @namespace CharacterSheetUI
 * @description Main namespace for character sheet UI functionality
 * 
 * @function createDots - Creates interactive dot displays for attributes/skills
 * @function createTextInput - Creates auto-resizing textarea inputs
 * @function createPredatorDropdown - Creates predator type selection dropdown
 * @function capitalizeFirst - Capitalizes first letter of a string
 * @function createClanDropdown - Creates clan selection dropdown
 * @function createGenerationDropdown - Creates generation selection dropdown
 * @function createBloodPotencyDropdown - Creates blood potency selection dropdown
 * @function createCompulsionDropdown - Creates compulsion selection dropdown
 * @function createTrackBoxes - Creates track boxes for health/willpower/humanity
 * @function updateRelatedTrackBoxes - Updates dependent track boxes when attributes change
 * @function updateTrackBoxesMax - Updates maximum value for track boxes
 * @function evaluateImpairmentStatus - Evaluates and applies impairment status to tracks
 * @function assessTrack - Assesses individual track for impairment status
 * @function updateCurrentValue - Updates current value display for track boxes
 * @function populatePredatorDropdown - Populates predator dropdown with data
 * @function populateClanDropdown - Populates clan dropdown with data
 * @function populateGenerationDropdown - Populates generation dropdown with data
 * @function populateBloodPotencyDropdown - Populates blood potency dropdown with data
 * @function createResonanceDropdown - Creates resonance selection dropdown
 * @function createTemperamentDropdown - Creates temperament selection dropdown
 * @function populateResonanceDropdown - Populates resonance dropdown with data
 * @function populateTemperamentDropdown - Populates temperament dropdown with data
 * @function populateCompulsionDropdown - Populates compulsion dropdown with data
 * @function populateClanDropdowns - Populates all clan dropdowns with data
 * @function normalizeKey - Normalizes keys for data matching
 * @function saveConvictionsAndTouchstones - Saves conviction data
 * @function loadConvictionsAndTouchstones - Loads conviction data
 * @function saveCharacter - Saves character data
 * @function loadCharacter - Loads character data
 * 
 * @typedef {Object} TrackBoxConfig
 * @property {number} maxValue - Maximum value for the track
 * @property {number} currentValue - Current value
 * @property {number} superficial - Superficial damage (for health/willpower)
 * @property {number} aggravated - Aggravated damage (for health/willpower)
 * @property {string} type - Track type ('health', 'willpower', 'humanity')
 * 
 * @typedef {Object} DotConfig
 * @property {number} value - Current dot value
 * @property {number} maxDots - Maximum number of dots
 * @property {string} className - Additional CSS classes
 * 
 * @typedef {Object} DropdownConfig
 * @property {string} value - Selected value
 * @property {string} type - Dropdown type ('clan', 'predator', 'generation', etc.)
 * @property {Array} options - Available options
 * 
 * @example
 * // Create dots for an attribute
 * const dots = createDots(3, 5);
 * 
 * // Create track boxes for health
 * const trackBoxes = createTrackBoxes(10, 8, 2, 0, 'health');
 * 
 * // Create text input
 * const input = createTextInput('Character name');
 * 
 * // Create dropdown
 * const dropdown = createClanDropdown('brujah');
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

// Inject styles for visual impairment indication
(function(){
    const style = document.createElement('style');
    style.textContent = `
    .track-container.impaired { outline: 2px solid #dc3545; border-radius: 4px; }
    .track-container.impaired .track-header::after { content: " IMPAIRED"; color:#dc3545; font-weight:bold; margin-left:0.5rem; }
    .track-container.torpor { outline: 2px solid #787878; border-radius: 4px; }
    .track-container.torpor .track-header::after { content: " TORPOR"; color:#0d6efd; font-weight:bold; margin-left:0.5rem; }
    .track-container.pariah { outline: 2px solid #787878; border-radius: 4px; }
    .track-container.pariah .track-header::after { content: " PARIAH"; color:#6f42c1; font-weight:bold; margin-left:0.5rem; }
    .track-container.regret { outline: 2px solid #787878; border-radius: 4px; }
    .track-container.regret .track-header::after { content: " REGRET"; color:#ffc107; font-weight:bold; margin-left:0.5rem; }
    `;
    document.head.appendChild(style);
})();

// Import logger
import logger from '../utils/logger.js';

function createDots(value, maxDots = 5) {
    const $dotsContainer = $('<div>', { 
        'class': 'dots lockable-dot',
        'data-value': value
    });
    
    for (let i = 0; i < maxDots; i++) {
        const $dot = $('<div>', {
            'class': 'dot' + (i < value ? ' filled' : ''),
            'data-value': i + 1
        });
        
        $dot.on('click', function() {
            if (window.LockManager && window.LockManager.isLocked && window.LockManager.isLocked()) {
                // Allow edits for hunger dots even when sheet is locked
                if (!$(this).closest('.hunger-dots').length) {
                    return;
                }
            }
            const $this = $(this);
            const $parent = $this.parent();
            const currentValue = parseInt($parent.data('value') || '0');
            const clickedValue = parseInt($this.data('value'));
            
            // If clicking the last filled dot, decrease by 1
            if (clickedValue === currentValue) {
                const newValue = clickedValue - 1;
                $parent.find('.dot').each(function(index) {
                    $(this).toggleClass('filled', index < newValue);
                });
                $parent.data('value', newValue);
                $parent.attr('data-value', newValue);
            }
            // If clicking an empty dot, fill up to that value
            else if (clickedValue > currentValue) {
                $parent.find('.dot').each(function(index) {
                    $(this).toggleClass('filled', index < clickedValue);
                });
                $parent.data('value', clickedValue);
                $parent.attr('data-value', clickedValue);
            }
            // If clicking a filled dot, set to that value
            else {
                $parent.find('.dot').each(function(index) {
                    $(this).toggleClass('filled', index < clickedValue);
                });
                $parent.data('value', clickedValue);
                $parent.attr('data-value', clickedValue);
            }

            // Update related track boxes if this is a relevant attribute
            updateRelatedTrackBoxes($this);
        });
        
        $dotsContainer.append($dot);
    }
    
    return $dotsContainer[0];
}

// Expose functions globally for use by other modules
window.createDots = createDots;
window.createTrackBoxes = createTrackBoxes;
window.createTextInput = createTextInput;

function createTextInput(value) {
    const $input = $('<textarea>', {
        'value': value,
        'class': 'form-control bg-dark text-light',
        'rows': '1',
        'style': 'resize: none; overflow: hidden;'
    });
    
    // Auto-resize the textarea based on content
    $input.on('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Not lockable – these info fields should remain editable in play mode.
    setTimeout(() => {
        $input.trigger('input');
    }, 0);
    
    return $input[0];
}

// Function to create a dropdown for predator types
function createPredatorDropdown(value) {
    const $select = $('<select>', {
        'class': 'form-select predator-dropdown',
        'aria-label': 'Select predator type'
    });
    
    // Add empty option
    $select.append($('<option>', {
        'value': '',
        'text': 'Select Predator Type'
    }));
    
    // We'll populate this with predator types when the dropdown is created
    // This will be done in a separate function that imports the predator_types.js data
    
    // Predator type can still change in play mode, so keep editable.
    return $select[0];
}

// Simple utility to capitalize first letter of string
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to create a dropdown for clans
function createClanDropdown(value) {
    const $select = $('<select>', {
        'class': 'form-select clan-dropdown',
        'aria-label': 'Select clan'
    });
    
    // Add empty option
    $select.append($('<option>', {
        'value': '',
        'text': 'Select Clan'
    }));
    
    // We'll populate this with clan data when the dropdown is created
    // This will be done in a separate function that imports the clans.js data
    
    // Clan selection should likely remain immutable in play mode, keep lockable.
    return $select[0];
}

// Function to create a dropdown for generation
function createGenerationDropdown(value) {
    const dropdown = $('<select>', { 'class': 'form-select generation-dropdown' });
    dropdown.append($('<option>', { 'value': '', 'text': 'Select Generation' }));
    if (value && value.trim() !== '') {
        dropdown.val(value.trim());
    }
    // Generation may shift but typically remains; allow editing even when locked.
    return dropdown;
}

// Function to create a dropdown for blood potency
function createBloodPotencyDropdown(value) {
    const $select = $('<select>', {
        'class': 'form-select blood-potency-dropdown',
        'aria-label': 'Select blood potency'
    });

    // Store initial value so we can preselect later
    if (value !== undefined && value !== null && value !== '') {
        $select.attr('data-value', value);
    }
    $select.attr('data-lockable', 'true');

    // Add empty option
    $select.append($('<option>', {
        'value': '',
        'text': 'Select Blood Potency'
    }));

    return $select[0];
}

// Function to create a dropdown for compulsion
function createCompulsionDropdown(value) {
    const $select = $('<select>', {
        'class': 'form-select compulsion-dropdown',
        'aria-label': 'Select compulsion'
    });

    // Store initial value for preselect
    if (value !== undefined && value !== null && value !== '') {
        $select.attr('data-value', value);
    }
    // Add empty option
    $select.append($('<option>', {
        'value': '',
        'text': 'Select Compulsion'
    }));

    return $select[0];
}

function createTrackBoxes(maxValue, currentValue = 0, superficial = 0, aggravated = 0, type = 'health') {
    const $container = $('<div>', {
        'class': 'track-container',
        'data-type': type
    });
    
    const $header = $('<div>', {
        'class': 'track-header',
        'html': `<span>Current: ${currentValue}</span><span>Max: ${maxValue}</span>`
    });
    $container.append($header);
    
    const $boxes = $('<div>', {
        'class': 'track-boxes',
        'data-type': type
    });

    let boxValue = 10;
    if (type !== 'humanity') {
        boxValue = currentValue;
    }
    
    // Create boxes based on boxValue
    for (let i = 0; i < boxValue; i++) {
        const $box = $('<div>', {
            'class': 'track-box'
        });
        
        if (type === 'humanity') {
            // For Humanity, fill boxes from left to right based on current value
            if (i < currentValue) {
                $box.addClass('filled');
            }
            // Handle staining for any remaining boxes
            if (i >= currentValue && i < currentValue + superficial) {
                $box.addClass('stained');
            }
        } else {
            // For Health and Willpower, handle superficial and aggravated damage
            if (i < aggravated) {
                $box.addClass('aggravated');
            } else if (i < aggravated + superficial) {
                $box.addClass('superficial');
            }
        }
        
        $box.on('click', function() {
            const $this = $(this);
            const $parent = $this.parent();
            const type = $parent.data('type');
            
            if (type === 'humanity') {
                const $allBoxes = $parent.children();
                const clickedIndex = $allBoxes.index($this) + 1;
                const currentFilled = $allBoxes.filter('.filled').length;
                const currentStained = $allBoxes.filter('.stained').length;
                
                if ($this.hasClass('filled')) {
                    if (clickedIndex === currentFilled) {
                        $this.removeClass('filled');
                    } else if (clickedIndex < currentFilled) {
                        $allBoxes.slice(clickedIndex - 1).removeClass('filled');
                    } else if (clickedIndex === 1) {
                        $this.removeClass('filled');
                    }
                } else if ($this.hasClass('stained')) {  
                    if (clickedIndex === 1) {
                        $this.removeClass('stained').addClass('filled');
                    } else if (clickedIndex === 10) {
                        if (currentFilled === 9) {
                            $this.removeClass('stained').addClass('filled');
                        } else if (clickedIndex === (10 - (currentStained - 1))) {
                            $this.removeClass('stained');
                        } else if (clickedIndex > (10 - (currentStained - 1))) {
                            for (let i = clickedIndex - 2; i > 0; i--) {
                                $($allBoxes[i]).removeClass('stained');
                            }
                        }
                    } else if (clickedIndex === (10 - (currentStained - 1))) {
                        if (clickedIndex === currentFilled + 1) {
                            $this.addClass('filled').removeClass('stained');
                        } else {
                            $this.removeClass('stained');
                        }
                    } else if (clickedIndex > (10 - (currentStained - 1))) {
                        for (let i = clickedIndex - 2; i > 0; i--) {
                            $($allBoxes[i]).removeClass('stained');
                        }
                    } 
                } else {
                    if (clickedIndex === 1) {
                        if (currentStained === 9) {
                            $this.addClass('stained').removeClass('filled');
                        } else {
                            $this.addClass('filled');
                        }
                    } else if (clickedIndex === 10) {
                        if (currentStained === 0) {
                            $this.addClass('stained').removeClass('filled');
                        } else {
                            $this.addClass('filled');
                        }
                    } else if (clickedIndex === (10 - currentStained)) {
                        $this.addClass('stained');
                    } else if (clickedIndex === currentFilled + 1) {
                        $this.addClass('filled');
                    }
                }
                
                // Update the data-value based on the filled count after changes
                const newFilledCount = $parent.find('.filled').length;
                $parent.data('value', newFilledCount);
                $container.data('value', newFilledCount);
            } else {
                // Original Health/Willpower behavior
                if ($this.hasClass('aggravated')) {
                    $this.removeClass('aggravated superficial');
                } else if ($this.hasClass('superficial')) {
                    $this.removeClass('superficial').addClass('aggravated');
                } else {
                    $this.addClass('superficial');
                }
                
                // Update the data-value based on unmarked boxes
                const superficialCount = $parent.find('.superficial').length;
                const aggravatedCount = $parent.find('.aggravated').length;
                const newValue = maxValue - (superficialCount + aggravatedCount);
                $parent.data('value', newValue);
                $container.data('value', newValue);
            }
            
            updateCurrentValue($container[0]);
        });
        
        $boxes.append($box);
    }
    
    $container.append($boxes);
    return $container[0];
}

function updateRelatedTrackBoxes($changedDot) {
    const statLabel = $changedDot.closest('.stat').find('.stat-label').text().toLowerCase();
    let $trackBoxes;
    
    if (statLabel === 'stamina') {
        $trackBoxes = $('.track-container[data-type="health"]');
        if ($trackBoxes.length) {
            const staminaValue = parseInt($changedDot.parent().data('value') || '0');
            const newMax = staminaValue + 3;
            updateTrackBoxesMax($trackBoxes[0], newMax);
        }
    } 
    if (statLabel === 'resolve' || statLabel === 'composure') {
        $trackBoxes = $('.track-container[data-type="willpower"]');
        if ($trackBoxes.length) {
            const $resolveDots = $('.stat .stat-label[data-stat="resolve"]').closest('.stat').find('.dots');
            const $composureDots = $('.stat .stat-label[data-stat="composure"]').closest('.stat').find('.dots');
            
            if ($resolveDots.length && $composureDots.length) {
                const resolveValue = parseInt($resolveDots.data('value') || '0');
                const composureValue = parseInt($composureDots.data('value') || '0');
                const newMax = resolveValue + composureValue;
                updateTrackBoxesMax($trackBoxes[0], newMax);
            }
        }
    }
}

function updateTrackBoxesMax(trackBoxes, newMax) {
    const $trackBoxes = $(trackBoxes);
    const $header = $trackBoxes.find('.track-header');
    const $boxes = $trackBoxes.find('.track-boxes');
    const $currentBoxes = $boxes.find('.track-box');
    const currentMax = $currentBoxes.length;
    
    // Update max value display
    $header.find('span:last-child').text(`Max: ${newMax}`);
    
    // Add or remove boxes as needed
    if (newMax > currentMax) {
        for (let i = currentMax; i < newMax; i++) {
            const $box = $('<div>', {
                'class': 'track-box'
            });
            
            $box.on('click', function() {
                const $this = $(this);
                const $parent = $this.parent();
                const type = $parent.data('type');
                
                if (type === 'humanity') {
                    const $allBoxes = $parent.children();
                    const clickedIndex = $allBoxes.index($this);
                    const currentFilled = $allBoxes.filter('.filled').length;
                    
                    if (clickedIndex === currentFilled - 1) {
                        $this.removeClass('filled');
                    } else if (clickedIndex < currentFilled) {
                        $allBoxes.slice(clickedIndex + 1, $allBoxes.length - 3).removeClass('filled');
                    } else {
                        $allBoxes.slice(0, clickedIndex + 1).each(function(i, el) {
                            if (i < $allBoxes.length - 3) {
                                $(el).addClass('filled');
                            }
                        });
                    }
                    
                    // Update data-value for humanity
                    const newFilledCount = $parent.find('.filled').length;
                    $parent.data('value', newFilledCount);
                    $trackBoxes.data('value', newFilledCount);
                } else {
                    if ($this.hasClass('aggravated')) {
                        $this.removeClass('aggravated superficial');
                    } else if ($this.hasClass('superficial')) {
                        $this.removeClass('superficial').addClass('aggravated');
                    } else {
                        $this.addClass('superficial');
                    }
                    
                    // Update data-value for health/willpower
                    const $boxes = $parent.children();
                    const superficialCount = $boxes.filter('.superficial').length;
                    const aggravatedCount = $boxes.filter('.aggravated').length;
                    const newValue = $boxes.length - (superficialCount + aggravatedCount);
                    $parent.data('value', newValue);
                    $trackBoxes.data('value', newValue);
                }
                updateCurrentValue($trackBoxes[0]);
            });
            
            $boxes.append($box);
        }
    } else if (newMax < currentMax) {
        $currentBoxes.slice(newMax).remove();
    }
    
    updateCurrentValue($trackBoxes[0]);
}

function evaluateImpairmentStatus() {
    function assessTrack($track) {
        if(!$track.length) return 'healthy';
        const total = $track.find('.track-box').length;
        const sup = $track.find('.track-box.superficial').length;
        const agg = $track.find('.track-box.aggravated').length;
        if (sup + agg < total) return 'healthy';
        // Track full
        if (agg === total) return 'aggravatedFull';
        return 'superficialFull';
    }

    const $health = $('.track-container[data-type="health"]');
    const $willpower = $('.track-container[data-type="willpower"]');

    const healthStatus = assessTrack($health);
    const willpowerStatus = assessTrack($willpower);

    // Reset classes
    $health.removeClass('impaired torpor');
    $willpower.removeClass('impaired pariah');
    $('body').removeClass('health-impaired health-torpor willpower-impaired willpower-pariah');

    // Apply according to status
    if (healthStatus === 'superficialFull') {
        $health.addClass('impaired');
        $('body').addClass('health-impaired');
    } else if (healthStatus === 'aggravatedFull') {
        $health.addClass('torpor impaired');
        $('body').addClass('health-impaired health-torpor');
    }

    if (willpowerStatus === 'superficialFull') {
        $willpower.addClass('impaired');
        $('body').addClass('willpower-impaired');
    } else if (willpowerStatus === 'aggravatedFull') {
        $willpower.addClass('pariah impaired');
        $('body').addClass('willpower-impaired willpower-pariah');
    }

    const $humanity = $('.track-container[data-type="humanity"]');

    const humanityStatus = (function(){
        if(!$humanity.length) return 'healthy';
        const total = $humanity.find('.track-box').length;
        const filled = $humanity.find('.track-box.filled').length;
        const stained = $humanity.find('.track-box.stained').length;
        return (stained > 0 && (filled + stained === total)) ? 'regret' : 'healthy';
    })();

    // Reset classes for humanity
    $humanity.removeClass('impaired regret');
    $('body').removeClass('humanity-impaired');

    if(humanityStatus === 'regret'){
        $humanity.addClass('regret impaired');
        $('body').addClass('humanity-impaired');
    }
}

// Expose impairment evaluation for external modules (e.g., backup-manager)
if (typeof window !== 'undefined') {
    window.evaluateImpairmentStatus = evaluateImpairmentStatus;
}

function updateCurrentValue(trackBoxes) {
    const $trackBoxes = $(trackBoxes);
    const $header = $trackBoxes.find('.track-header');
    const $boxes = $trackBoxes.find('.track-boxes');
    const maxValue = $boxes.find('.track-box').length;
    
    if ($trackBoxes.data('type') === 'humanity') {
        const filledCount = $boxes.find('.track-box.filled').length;
        const stainedCount = $boxes.find('.track-box.stained').length;
        $header.find('span:first-child').text(`Current: ${filledCount}`);
        
        // Update data-value to reflect the current state
        $trackBoxes.data('value', filledCount);
        $boxes.data('value', filledCount);
    } else {
        const superficialCount = $boxes.find('.superficial').length;
        const aggravatedCount = $boxes.find('.aggravated').length;
        const currentValue = maxValue - (superficialCount + aggravatedCount);
        $header.find('span:first-child').text(`Current: ${currentValue}`);
        
        // Update data-value to reflect the current state
        $trackBoxes.data('value', currentValue);
        $boxes.data('value', currentValue);
    }
    evaluateImpairmentStatus();
}

$(document).ready(function() {
    $('.stat').each(function() {
        const $stat = $(this);
        const $valueSpan = $stat.find('span:last-child');
        
        if ($valueSpan.length) {
            const statLabel = $stat.find('.stat-label').text().toLowerCase();
            const value = $valueSpan.text();
            
            // Fields that should be text inputs
            const textFields = [
                'name', 'concept', 'chronicle', 'ambition', 'desire', 
                'sire'
            ];
            
            // Fields that should have track boxes
            const trackFields = {
                'health': { max: 10, current: 4 },
                'willpower': { max: 10, current: 2 },
                'humanity': { max: 10, current: 7 }
            };
            
            if (statLabel === 'predator') {
                const dropdown = createPredatorDropdown(value);
                $valueSpan.replaceWith(dropdown);
                populatePredatorDropdown(dropdown);
            } else if (statLabel === 'clan') {
                const dropdown = createClanDropdown(value);
                $valueSpan.replaceWith(dropdown);
                populateClanDropdown(dropdown);
            } else if (statLabel === 'generation') {
                const dropdown = createGenerationDropdown(value);
                $valueSpan.replaceWith(dropdown);
                populateGenerationDropdown(dropdown);
            } else if (statLabel === 'blood potency') {
                // Info buttons now handled centrally by info-buttons.js – legacy code removed.
                const maxDots = 5; // BP ranges 0 through 5 (six possible values)
                const dotsContainer = createDots(parseInt(value) || 0, maxDots);
                $valueSpan.replaceWith(dotsContainer);
            } else if (statLabel === 'hunger') {
                const maxDots = 5;
                const dotsContainer = createDots(parseInt(value) || 0, maxDots);
                // Allow interaction even when locked
                $(dotsContainer).removeClass('lockable-dot').addClass('hunger-dots');
                $valueSpan.replaceWith(dotsContainer);
            } else if (textFields.includes(statLabel)) {
                const input = createTextInput(value);
                $valueSpan.replaceWith(input);
                // Set up auto-resize for the new textarea
                $(input).on('input', function() {
                    this.style.height = 'auto';
                    this.style.height = (this.scrollHeight) + 'px';
                });
                // Trigger initial resize
                setTimeout(() => {
                    $(input).trigger('input');
                }, 0);
            } else if (trackFields[statLabel]) {
                const trackBoxes = createTrackBoxes(
                    trackFields[statLabel].max, 
                    trackFields[statLabel].current, 
                    0, 
                    0, 
                    statLabel
                );
                $valueSpan.replaceWith(trackBoxes);
            } else if (statLabel === 'resonance') {
                const dropdown = createResonanceDropdown(value);
                $valueSpan.replaceWith(dropdown);
                populateResonanceDropdown(dropdown);
            } else if (statLabel === 'temperament') {
                const dropdown = createTemperamentDropdown(value);
                $valueSpan.replaceWith(dropdown);
                populateTemperamentDropdown(dropdown);
            } else if (statLabel === 'compulsion') {
                const dropdown = createCompulsionDropdown(value);
                $valueSpan.replaceWith(dropdown);
                populateCompulsionDropdown(dropdown);
            } else {
                // Default to 5 dots for attributes and skills
                const dotsContainer = createDots(parseInt(value) || 0, 5);
                $valueSpan.replaceWith(dotsContainer);
            }
        }
    });
    
    // Function to populate the predator dropdown with values from predator_types.js
    async function populatePredatorDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/predator_types.js');
            const predatorTypes = module.predatorTypes;
            const $dropdown = $(dropdown);
            const predatorEntries = Object.entries(predatorTypes.types).sort((a,b)=>a[1].name.localeCompare(b[1].name));
            predatorEntries.forEach(([key, type]) => {
                $dropdown.append($('<option>', {
                    'value': key,
                    'text': type.name,
                    'title': type.description,
                    'data-predator-type': key
                }));
            });
            // Quick preview tooltip retained
            const $previewTooltip = $('<div>', {'class':'predator-preview-tooltip d-none','id':'predator-preview'});
            $('body').append($previewTooltip);
            $dropdown.on('focus',()=> $previewTooltip.removeClass('d-none'))
                     .on('blur', ()=> $previewTooltip.addClass('d-none'))
                     .on('mouseover','option', function(){
                const predatorKey = $(this).data('predator-type');
                         if(!predatorKey || !predatorTypes.types[predatorKey]) return;
                    const type = predatorTypes.types[predatorKey];
                         $previewTooltip.html(`<h5>${type.name}</h5><p>${type.description.substring(0,100)}${type.description.length>100?'...':''}</p><small>Select for more details</small>`);
                         const pos = $dropdown.offset();
                         $previewTooltip.css({top: pos.top + $dropdown.outerHeight() + 5, left: pos.left});
                     });
            return; // skip legacy modal/button
        } catch (error) {
            logger.error('Error loading predator types:', error);
            $(dropdown).append($('<option>', {'value':'error','text':'Error loading predator types'}));
        }
    }

    // Function to populate an individual clan dropdown with values from clans.js
    async function populateClanDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/clans.js');
            const clans = module.clans;
            const $dropdown = $(dropdown);
            const clanEntries = Object.entries(clans.types).sort((a,b)=>a[1].name.localeCompare(b[1].name));
            clanEntries.forEach(([key, clan])=> {
                $dropdown.append($('<option>', {
                    'value': key,
                    'text': clan.name,
                    'title': clan.background?.description || '',
                    'data-clan': key
                }));
            });
            return; // handled by global utility
        } catch(error){
            logger.error('Error loading clans:', error);
            $(dropdown).append($('<option>', {'value':'error','text':'Error loading clans'}));
        }
    }

    // Function to populate the generation dropdown with values from generation.js
    async function populateGenerationDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/generation.js');
            const generationData = module.generation;
            const $dropdown = $(dropdown);
            const generations = Object.keys(generationData.bloodPotencyLimits).map(Number).sort((a,b)=>a-b);
            const getOrdinal = n => {const s=["th","st","nd","rd"], v=n%100; return n+(s[(v-20)%10]||s[v]||s[0]);};
            generations.forEach(gen=>{
                const tier = generationData.getGenerationTier ? generationData.getGenerationTier(gen):null;
                $dropdown.append($('<option>', {
                    'value': gen,
                    'text': getOrdinal(gen),
                    'title': tier?.description || ''
                }));
            });
            return; // global utility handles details
        } catch(error){
            logger.error('Error loading generation data:', error);
            $(dropdown).append($('<option>', {'value':'error','text':'Error loading generations'}));
        }
    }

    // Function to populate the blood potency dropdown with values from blood_potency.js
    async function populateBloodPotencyDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/blood_potency.js');
            const bpData = module.bloodPotency;
            const $dropdown = $(dropdown);
            const levels = Object.keys(bpData.levels).map(Number).sort((a,b)=>a-b);
            levels.forEach(level=>{
                const info = bpData.levels[level] || {};
                $dropdown.append($('<option>', {
                    'value': level,
                    'text': `BP ${level}`,
                    'title': info.description || ''
                }));
            });
            return; // skip legacy modal & button setup
        } catch(error){
            logger.error('Error loading blood potency:', error);
            $(dropdown).append($('<option>', {'value':'error','text':'Error loading blood potency'}));
        }
    }

    // Create dropdown for Resonance
    function createResonanceDropdown(value) {
        const dropdown = $('<select>', { 'class': 'form-select resonance-dropdown' });
        dropdown.append($('<option>', { 'value': '', 'text': 'Select Resonance' }));
        if (value && value.trim() !== '') {
            dropdown.val(value.trim());
        }
        // Resonance should stay editable; not lockable.
        return dropdown;
    }

    // Create dropdown for Temperament
    function createTemperamentDropdown(value) {
        const dropdown = $('<select>', { 'class': 'form-select temperament-dropdown' });
        dropdown.append($('<option>', { 'value': '', 'text': 'Select Temperament' }));
        if (value && value.trim() !== '') {
            dropdown.val(value.trim());
        }
        // Temperament editable; not lockable.
        return dropdown;
    }

    // Populate Resonance dropdown from references/resonances.js
    async function populateResonanceDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/resonances.js');
            const resonanceData = module.resonances;
            const entries = Object.entries(resonanceData.types);
            // Sort alphabetically by name
            entries.sort((a, b) => a[1].name.localeCompare(b[1].name));
            entries.forEach(([key, data]) => {
                $(dropdown).append($('<option>', {
                    'value': key,
                    'text': data.name,
                    'title': data.description
                }));
            });
            // Global info-button utility now handles detailed info.
            return; // ⬅ Skip legacy modal & button setup
        } catch (err) {
            logger.error('Error loading resonances:', err);
        }
    }

    // Populate Temperament dropdown from references/resonances.js
    async function populateTemperamentDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/resonances.js');
            const temperamentData = module.resonances.temperaments;
            const order = ['fleeting', 'intense', 'acute'];
            const entries = Object.entries(temperamentData);
            entries.sort((a,b)=> order.indexOf(a[0]) - order.indexOf(b[0]));
            entries.forEach(([key, data]) => {
                $(dropdown).append($('<option>', {
                    'value': key,
                    'text': data.name,
                    'title': data.description
                }));
            });
            return; // handled by global utility
        } catch (err) {
            logger.error('Error loading temperaments:', err);
        }
    }

    // Function to populate the compulsion dropdown with values from compulsions.js
    async function populateCompulsionDropdown(dropdown) {
        try {
            const module = await import('../../data/vampire/compulsions.js');
            const compulsionData = module.compulsions;

            const $dropdown = $(dropdown);

            // Remove existing non-placeholder options before repopulating
            $dropdown.find('option:not(:first)').remove();

            // Add General compulsions first
            const generalEntries = Object.entries(compulsionData.general || {});
            generalEntries.forEach(([key, comp]) => {
                $dropdown.append($('<option>', {
                    'value': `general.${key}`,
                    'text': comp.name,
                    'title': comp.description || '',
                    'data-compulsion-type': 'general'
                }));
            });

            // Add Clan compulsions
            const selectedClanKey = ($('.clan-dropdown').val() || '');
            if (selectedClanKey) {
                let compKey = null;
                // direct match first
                if (compulsionData.clanCompulsions[selectedClanKey]) {
                    compKey = selectedClanKey;
                } else {
                    // attempt normalized match
                    const normalizedSelected = normalizeKey(selectedClanKey);
                    for (const key in compulsionData.clanCompulsions) {
                        if (normalizeKey(key) === normalizedSelected) {
                            compKey = key;
                            break;
                        }
                    }
                }

                if (compKey) {
                    const comp = compulsionData.clanCompulsions[compKey];
                    $dropdown.append($('<option>', {
                        'value': `clan.${compKey}`,
                        'text': comp.name,
                        'title': comp.description || '',
                        'data-compulsion-type': 'clan',
                        'data-clan-key': compKey
                    }));
                }
            }

            // Preselect stored value if provided
            const currentValue = $dropdown.data('value') || $dropdown.attr('data-value') || '';
            if (currentValue) {
                $dropdown.val(currentValue);
            }
        } catch (error) {
            logger.error('Error loading compulsion data:', error);
            $(dropdown).append($('<option>', {
                'value': 'error',
                'text': 'Error loading compulsions'
            }));
        }
    }

    // Expose to global scope so external listeners can call it
    window.populateCompulsionDropdown = populateCompulsionDropdown;

    // Evaluate initial impairment state once the sheet is built
    evaluateImpairmentStatus();
});

// Function to populate the clan dropdown with data from clans.js
async function populateClanDropdowns() {
    // Find all clan dropdowns
    const clanDropdowns = document.querySelectorAll('.clan-dropdown');
    
    try {
        // Import the clans module
        const module = await import('../../data/vampire/clans.js');
        
        // Populate each dropdown
        clanDropdowns.forEach(dropdown => {
            try {
                const clans = module.clans;
                
                // Get the clan types and sort them by name
                const $dropdown = $(dropdown);
                const clanEntries = Object.entries(clans.types);
                
                // Sort by name
                clanEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
                
                // Add each clan to the dropdown
                clanEntries.forEach(([key, clan]) => {
                    $dropdown.append($('<option>', {
                        'value': key,
                        'text': clan.name
                    }));
                });
                
                // If the dropdown has an existing value, try to set it
                const currentValue = $dropdown.data('value');
                if (currentValue) {
                    // Find an option with matching name (case-insensitive)
                    const matchingOption = clanEntries.find(entry => 
                        entry[1].name.toLowerCase() === currentValue.toLowerCase()
                    );
                    
                    if (matchingOption) {
                        $dropdown.val(matchingOption[0]);
                    }
                }
                
                // Info buttons now handled centrally by info-buttons.js – legacy code removed.
            } catch (error) {
                logger.error('Error loading clans:', error);
                $(dropdown).append($('<option>', {
                    'value': 'error',
                    'text': 'Error loading clans'
                }));
            }
        });
    } catch (error) {
        logger.error('Error importing clans module:', error);
        clanDropdowns.forEach(dropdown => {
            $(dropdown).append($('<option>', {
                'value': 'error',
                'text': 'Error loading clans'
            }));
        });
    }
}

// Set up event handlers and initialize components when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // This is now handled by our accessibility-fix.js
});

// Accessibility handling is now in accessibility-fix.js

// helper to normalize keys (remove underscores, lowercase)
function normalizeKey(str) {
    return (str || '').toString().replace(/_/g, '').toLowerCase();
}

$(document).ready(function() {
    $('.clan-dropdown').on('change', function() {
        const compDropdownEl = document.querySelector('.compulsion-dropdown');
        if (compDropdownEl) {
            populateCompulsionDropdown(compDropdownEl);
        }
    });
});

// Function to save convictions and touchstones
function saveConvictionsAndTouchstones() {
    if (window.convictionManager) {
        return window.convictionManager.saveConvictions();
    }
    return [];
}

// Function to load convictions and touchstones
function loadConvictionsAndTouchstones(convictions) {
    if (window.convictionManager && convictions) {
        window.convictionManager.loadConvictions(convictions);
    }
}

// Modify the existing saveCharacter function to include convictions
async function saveCharacter() {
    const character = {
        // ... existing character properties ...
        convictions: saveConvictionsAndTouchstones(),
        locked: window.LockManager.isLocked(),
        // ... rest of existing properties ...
    };
    // ... rest of existing save logic ...
}

// Modify the existing loadCharacter function to include convictions
async function loadCharacter(characterData) {
    // ... existing loading logic ...
    if (characterData.convictions) {
        loadConvictionsAndTouchstones(characterData.convictions);
    }

    // Check if there's a locked parameter in the URL that should override character data
    const urlParams = new URLSearchParams(window.location.search);
    const lockedFromUrl = urlParams.get('locked');
    
    if (lockedFromUrl !== null && window.LockManager) {
        // URL parameter takes precedence
        const shouldLock = lockedFromUrl === 'true';
        logger.log('Setting lock state from URL parameter (overriding character data):', shouldLock);
        window.LockManager.init(shouldLock);
    } else if (characterData.locked !== undefined) {
        logger.log('Setting lock state from character data:', characterData.locked ?? false);
        window.LockManager.init(characterData.locked);
    }
    // ... rest of existing loading logic ...
}

// Handle "Back to Dashboard" button
const btnDashboard = document.getElementById('btn-dashboard');
if (btnDashboard) {
    btnDashboard.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}