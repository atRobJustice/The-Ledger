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

function createDots(value, maxDots = 5) {
    const $dotsContainer = $('<div>', { 
        'class': 'dots',
        'data-value': value
    });
    
    for (let i = 0; i < maxDots; i++) {
        const $dot = $('<div>', {
            'class': 'dot' + (i < value ? ' filled' : ''),
            'data-value': i + 1
        });
        
        $dot.on('click', function() {
            const $this = $(this);
            const $parent = $this.parent();
            const currentValue = parseInt($parent.data('value') || '0');
            const clickedValue = parseInt($this.data('value'));
            
            // If clicking the last filled dot, decrease by 1
            if (clickedValue === currentValue) {
                $this.removeClass('filled');
                $parent.data('value', clickedValue - 1);
                $parent.attr('data-value', clickedValue - 1);
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
function createTextInput(value) {
    const $input = $('<input>', {
        'type': 'text',
        'value': value,
        'class': 'form-control bg-dark text-light'
    });
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
    
    return $select[0];
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
    
    return $select[0];
}

// Function to create a dropdown for generation
function createGenerationDropdown(value) {
    const dropdown = $('<select>', { 'class': 'form-select form-select-sm generation-dropdown' });
    dropdown.append($('<option>', { 'value': '', 'text': 'Select Generation' }));
    if (value && value.trim() !== '') {
        dropdown.val(value.trim());
    }
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

    // Add empty option
    $select.append($('<option>', {
        'value': '',
        'text': 'Select Blood Potency'
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
                // Represent Blood Potency with dots (0–5) instead of a dropdown and add an info button
                const maxDots = 6; // BP ranges 0 through 5 (six possible values)
                const dotsContainer = createDots(parseInt(value) || 0, maxDots);
                $valueSpan.replaceWith(dotsContainer);

                // Create an info button similar to other stats
                const $infoButton = $('<button>', {
                    'class': 'btn btn-sm btn-outline-secondary ms-2 blood-potency-info-button',
                    'html': '<i class="bi bi-info-circle"></i>',
                    'aria-label': 'Show blood potency information',
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                    'title': 'Show detailed information about this blood potency level'
                });

                // Click handler to display modal with blood potency information
                $infoButton.on('click', async function(e) {
                    e.preventDefault();
                    const potency = parseInt($(dotsContainer).data('value') || '0', 10);

                    try {
                        const module = await import('./references/blood_potency.js');
                        const bpData = module.bloodPotency;

                        const levelInfo = bpData.levels[potency] || {};
                        const effects = bpData.getEffects ? bpData.getEffects(potency) : (levelInfo.effects || []);
                        const baneSeverity = bpData.getBaneSeverity ? bpData.getBaneSeverity(potency) : null;
                        const surgeBonus = bpData.getBloodSurgeBonus ? bpData.getBloodSurgeBonus(potency) : null;
                        const disciplineBonus = bpData.getDisciplineBonus ? bpData.getDisciplineBonus(potency) : null;
                        const healingAmount = bpData.getHealingAmount ? bpData.getHealingAmount(potency) : null;
                        const rerollLevel = bpData.getRerollDisciplineLevel ? bpData.getRerollDisciplineLevel(potency) : null;

                        // Ensure modal exists
                        let $modal = $('#blood-potency-info-modal');
                        if ($modal.length === 0) {
                            $modal = $(
                                `<div class="modal fade" id="blood-potency-info-modal" tabindex="-1" aria-labelledby="bloodPotencyModalLabel" role="dialog" aria-modal="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="bloodPotencyModalLabel">Blood Potency</h5>
                                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body" id="blood-potency-info-content"><!-- Content inserted dynamically --></div>
                                            <div class="modal-footer"></div>
                                        </div>
                                    </div>
                                </div>`
                            );

                            $('body').append($modal);
                        }

                        // Build modal content
                        let content = '';

                        if (levelInfo.description) {
                            content += `<p class="blood-potency-description">${levelInfo.description}</p>`;
                        }

                        if (effects && effects.length) {
                            content += '<h5>Effects</h5><ul class="blood-potency-effects">';
                            effects.forEach(effect => {
                                content += `<li>${effect}</li>`;
                            });
                            content += '</ul>';
                        }

                        // Quick reference section
                        content += '<h5>Quick Reference</h5><ul class="blood-potency-quick">';
                        if (surgeBonus !== null) content += `<li><strong>Blood Surge Bonus:</strong> +${surgeBonus} dice</li>`;
                        if (healingAmount !== null) content += `<li><strong>Mend Damage per Rouse:</strong> ${healingAmount} Superficial</li>`;
                        if (baneSeverity !== null) content += `<li><strong>Bane Severity:</strong> ${baneSeverity}</li>`;
                        if (disciplineBonus) content += `<li><strong>Discipline Bonus:</strong> +${disciplineBonus} die</li>`;
                        if (rerollLevel !== null) content += `<li><strong>Discipline Reroll:</strong> Level ${rerollLevel} or below</li>`;
                        content += '</ul>';

                        // Update modal content and title
                        $('#bloodPotencyModalLabel').text(`Blood Potency ${potency}`);
                        $('#blood-potency-info-content').html(content);

                        const modalElement = document.getElementById('blood-potency-info-modal');
                        const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
                        modalInstance.show();
                    } catch (err) {
                        console.error('Error loading blood potency information:', err);
                    }
                });

                // Insert the info button directly after the dots container
                $(dotsContainer).after($infoButton);

                // Initialize Bootstrap tooltip
                new bootstrap.Tooltip($infoButton[0]);
            } else if (textFields.includes(statLabel)) {
                const input = createTextInput(value);
                $valueSpan.replaceWith(input);
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
            // Import the predator_types.js module
            const module = await import('./references/predator_types.js');
            const predatorTypes = module.predatorTypes;
            
            // Get the predator types and sort them by name
            const $dropdown = $(dropdown);
            const predatorEntries = Object.entries(predatorTypes.types);
            
            // Sort by name
            predatorEntries.sort((a, b) => a[1].name.localeCompare(b[1].name));
            
            // Add each predator type to the dropdown
            predatorEntries.forEach(([key, type]) => {
                $dropdown.append($('<option>', {
                    'value': key,
                    'text': type.name,
                    'title': type.description, // Add tooltip with description
                    'data-predator-type': key  // Add data attribute for easy reference
                }));
            });
            
            // Create a small preview tooltip that shows when browsing options
            const $previewTooltip = $('<div>', {
                'class': 'predator-preview-tooltip d-none',
                'id': 'predator-preview'
            });
            $('body').append($previewTooltip);
            
            // Show preview when focusing on dropdown and moving through options
            $dropdown.on('focus', function() {
                // Show preview tooltip when focusing on dropdown
                $previewTooltip.removeClass('d-none');
            }).on('blur', function() {
                // Hide preview tooltip when losing focus
                $previewTooltip.addClass('d-none');
            }).on('mouseover', 'option', function() {
                const predatorKey = $(this).data('predator-type');
                if (predatorKey && predatorTypes.types[predatorKey]) {
                    const type = predatorTypes.types[predatorKey];
                    
                    // Update preview content
                    $previewTooltip.html(`
                        <h5>${type.name}</h5>
                        <p>${type.description.substring(0, 100)}${type.description.length > 100 ? '...' : ''}</p>
                        <small>Select for more details</small>
                    `);
                    
                    // Position the preview tooltip
                    const dropdownPos = $dropdown.offset();
                    $previewTooltip.css({
                        top: dropdownPos.top + $dropdown.outerHeight() + 5,
                        left: dropdownPos.left
                    });
                }
            });
            
            // If the dropdown already had a value, try to select it
            const currentValue = $dropdown.val();
            if (currentValue) {
                // Try to find a matching option by name
                const matchingOption = predatorEntries.find(entry => 
                    entry[1].name.toLowerCase() === currentValue.toLowerCase()
                );
                
                if (matchingOption) {
                    $dropdown.val(matchingOption[0]);
                }
            }
            
            // Create a modal for the predator info if it doesn't exist
            let $infoModal = $('#predator-info-modal');
            if ($infoModal.length === 0) {
                // Create modal structure
                $infoModal = $(`
                    <div class="modal fade" id="predator-info-modal" tabindex="-1" aria-labelledby="predatorModalLabel" role="dialog" aria-modal="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="predatorModalLabel">Predator Type</h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="predator-info-content">
                                    <!-- Content will be inserted here -->
                                </div>
                                <div class="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                
                // Append modal to the body
                $('body').append($infoModal);
                
                // Initialize the Bootstrap modal
                const modalElement = document.getElementById('predator-info-modal');
                window.predatorInfoModal = new bootstrap.Modal(modalElement);
            }
            
            // We'll update the modal title and content when the info button is clicked,
            // not on dropdown change, to avoid showing the modal every time a selection changes
            
            // Add a button next to the dropdown to show info for the current selection
            const $infoButton = $('<button>', {
                'class': 'btn btn-sm btn-outline-secondary ms-2 predator-info-button d-none', // Initially hidden
                'html': '<i class="bi bi-info-circle"></i>',
                'aria-label': 'Show predator type information',
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Show detailed information about this predator type'
            });
            
            // Show/hide info button based on dropdown selection
            $dropdown.on('change', function() {
                const selectedValue = $(this).val();
                if (selectedValue && selectedValue !== '') {
                    $infoButton.removeClass('d-none');
                } else {
                    $infoButton.addClass('d-none');
                }
            });
            
            // Trigger the change event to set initial visibility
            $dropdown.trigger('change');
            
            $infoButton.on('click', function(e) {
                e.preventDefault();
                const selectedValue = $dropdown.val();
                if (selectedValue && predatorTypes.types[selectedValue]) {
                    const type = predatorTypes.types[selectedValue];
                    
                    // Update modal title
                    $('#predatorModalLabel').text(type.name);
                    
                    // Prepare the content for the modal body
                    let content = `
                        <p class="predator-info-description">${type.description}</p>
                    `;
                    
                    // Add dice pools if available
                    if (type.dicePools && type.dicePools.length > 0) {
                        content += '<h5>Dice Pools</h5><ul class="predator-info-list">';
                        type.dicePools.forEach(pool => {
                            content += `<li>${pool}</li>`;
                        });
                        content += '</ul>';
                    }
                    
                    // Add benefits if available
                    if (type.benefits && type.benefits.length > 0) {
                        content += '<h5>Benefits</h5><ul class="predator-info-list">';
                        type.benefits.forEach(benefit => {
                            content += `<li>${benefit}</li>`;
                        });
                        content += '</ul>';
                    }
                    
                    // Add drawbacks if available
                    if (type.drawbacks && type.drawbacks.length > 0) {
                        content += '<h5>Drawbacks</h5><ul class="predator-info-list">';
                        type.drawbacks.forEach(drawback => {
                            content += `<li>${drawback}</li>`;
                        });
                        content += '</ul>';
                    }
                    
                    // Add source if available
                    if (type.source) {
                        content += `<p class="predator-info-source mt-2"><em>Source: ${type.source}</em></p>`;
                    }
                    
                    // Update the modal body content
                    $('#predator-info-content').html(content);
                    
                    // Get the modal element
                    const modalElement = document.getElementById('predator-info-modal');
                    
                    // Store trigger button using our global accessibility fix
                    if (window.accessibilityFix && window.accessibilityFix.storeTrigger) {
                        window.accessibilityFix.storeTrigger(modalElement, this);
                    } else {
                        // Fallback if our fix isn't loaded yet
                        modalElement._lastTrigger = this;
                        window._lastActiveElement = this;
                    }
                    
                    // Show the modal
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                }
            });
            
            // Add the info button after the dropdown
            $dropdown.after($infoButton);
            
            // Initialize Bootstrap tooltip on the info button
            new bootstrap.Tooltip($infoButton[0]);
        } catch (error) {
            console.error('Error loading predator types:', error);
            $(dropdown).append($('<option>', {
                'value': 'error',
                'text': 'Error loading predator types'
            }));
        }
    }

    // Function to populate an individual clan dropdown with values from clans.js
    async function populateClanDropdown(dropdown) {
        try {
            // Import the clans.js module
            const module = await import('./references/clans.js');
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
                    'text': clan.name,
                    'title': clan.background?.description || '', // Add tooltip with description
                    'data-clan': key  // Add data attribute for easy reference
                }));
            });
            
            // Add a button next to the dropdown to show info for the current selection
            const $infoButton = $('<button>', {
                'class': 'btn btn-sm btn-outline-secondary ms-2 clan-info-button d-none', // Initially hidden
                'html': '<i class="bi bi-info-circle"></i>',
                'aria-label': 'Show clan information',
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Show detailed information about this clan'
            });
            
            // Show/hide info button based on dropdown selection
            $dropdown.on('change', function() {
                const selectedValue = $(this).val();
                if (selectedValue && selectedValue !== '') {
                    $infoButton.removeClass('d-none');
                } else {
                    $infoButton.addClass('d-none');
                }
            });
            
            // Trigger the change event to set initial visibility
            $dropdown.trigger('change');
            
            $infoButton.on('click', function(e) {
                e.preventDefault();
                const selectedValue = $dropdown.val();
                if (selectedValue && clans.types[selectedValue]) {
                    const clan = clans.types[selectedValue];
                    
                    // Make sure modal exists first
                    let modalElement = document.getElementById('clan-info-modal');
                    if (!modalElement) {
                        // Create the modal if it doesn't exist
                        const $infoModal = $(`
                        <div class="modal fade" id="clan-info-modal" tabindex="-1" aria-labelledby="clanModalLabel" role="dialog" aria-modal="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="clanModalLabel">Clan</h5>
                                        <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" id="clan-info-content">
                                        <!-- Content will be inserted here -->
                                    </div>
                                    <div class="modal-footer">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                        $('body').append($infoModal);
                        modalElement = document.getElementById('clan-info-modal');
                        
                        // Add custom event handler for the close button
                        const closeBtn = modalElement.querySelector('.btn-close');
                        if (closeBtn) {
                            closeBtn.addEventListener('click', function(e) {
                                // Prevent default behavior
                                e.preventDefault();
                                e.stopPropagation();
                                
                                // Immediately blur the button and move focus to body
                                this.blur();
                                document.body.focus();
                                
                                // Move focus back to the trigger button
                                if (window._lastActiveElement) {
                                    window._lastActiveElement.focus();
                                }
                                
                                // Mark the modal with inert to prevent focus
                                modalElement.setAttribute('inert', '');
                                
                                // Get the Bootstrap modal instance and hide it
                                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                                if (modalInstance) {
                                    setTimeout(() => modalInstance.hide(), 10);
                                }
                                
                                return false;
                            }, true);
                        }
                    }
                    
                    // Update modal title
                    $('#clanModalLabel').text(clan.name);
                    
                    // Prepare the content for the modal body
                    let content = '';
                    
                    // Add nicknames if available
                    if (clan.nicknames && clan.nicknames.length > 0) {
                        content += `<p class="clan-info-nicknames"><strong>Nicknames:</strong> ${clan.nicknames.join(', ')}</p>`;
                    }
                    
                    // Add disciplines if available
                    if (clan.disciplines && Array.isArray(clan.disciplines)) {
                        content += `<p class="clan-info-disciplines"><strong>Disciplines:</strong> ${clan.disciplines.join(', ')}</p>`;
                    }
                    
                    // Add background description if available
                    if (clan.background && clan.background.description) {
                        content += `<h5>Background</h5><p class="clan-info-background">${clan.background.description}</p>`;
                    }
                    
                    // Add bane if available
                    if (clan.bane) {
                        content += `<h5>Clan Bane: ${clan.bane.name}</h5>`;
                        content += `<p class="clan-info-bane">${clan.bane.description}</p>`;
                    }
                    
                    // Add compulsion if available
                    if (clan.compulsion) {
                        content += `<h5>Clan Compulsion: ${clan.compulsion.name}</h5>`;
                        content += `<p class="clan-info-compulsion">${clan.compulsion.description}</p>`;
                    }
                    
                    // Update modal content
                    $('#clan-info-content').html(content);
                    
                    // Store the current button as the trigger for focus management
                    window._lastActiveElement = this;
                    modalElement._lastTrigger = this;
                    
                    // Prepare the modal for showing - remove inert attribute
                    modalElement.removeAttribute('inert');
                    
                    // Make sure we have event listeners for this modal
                    if (!modalElement._eventsAttached) {
                        // Add event listener for the show event
                        $(modalElement).on('show.bs.modal', function() {
                            // Remove inert when showing
                            this.removeAttribute('inert');
                        });
                        
                        // Add event listener for the hide event
                        $(modalElement).on('hide.bs.modal', function() {
                            // Move focus away from any element in modal
                            if (window._lastActiveElement) {
                                window._lastActiveElement.focus();
                            } else {
                                document.body.focus();
                            }
                            
                            // Apply inert to prevent focus issues
                            this.setAttribute('inert', '');
                        });
                        
                        modalElement._eventsAttached = true;
                    }
                    
                    // Show the modal
                    const modal = new bootstrap.Modal(modalElement);
                    modal.show();
                }
            });
            
            // Add the info button after the dropdown
            $dropdown.after($infoButton);
            
            // Initialize Bootstrap tooltip on the info button
            new bootstrap.Tooltip($infoButton[0]);
        } catch (error) {
            console.error('Error loading clans:', error);
            $(dropdown).append($('<option>', {
                'value': 'error',
                'text': 'Error loading clans'
            }));
        }
    }

    // Function to populate the generation dropdown with values from generation.js
    async function populateGenerationDropdown(dropdown) {
        try {
            const module = await import('./references/generation.js');
            const generationData = module.generation;

            const $dropdown = $(dropdown);

            // Collect generations from bloodPotencyLimits keys (numeric)
            const generations = Object.keys(generationData.bloodPotencyLimits).map(Number).sort((a, b) => a - b);

            // Helper to get ordinal suffix
            const getOrdinal = (n) => {
                const s = ["th", "st", "nd", "rd"], v = n % 100;
                return n + (s[(v - 20) % 10] || s[v] || s[0]);
            };

            generations.forEach(gen => {
                const tier = generationData.getGenerationTier ? generationData.getGenerationTier(gen) : null;
                const displayText = `${getOrdinal(gen)}`;
                $dropdown.append($('<option>', {
                    'value': gen,
                    'text': displayText,
                    'title': tier?.description || ''
                }));
            });

            // Preselect value if provided
            const currentValue = $dropdown.data('value') || $dropdown.attr('data-value') || '';
            if (currentValue) {
                // Ensure it matches numeric string
                $dropdown.val(currentValue.toString());
            }

            // Create an info button similar to clan/predator dropdowns
            const $infoButton = $('<button>', {
                'class': 'btn btn-sm btn-outline-secondary ms-2 generation-info-button d-none',
                'html': '<i class="bi bi-info-circle"></i>',
                'aria-label': 'Show generation information',
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Show detailed information about this generation'
            });

            // Show/hide info button based on dropdown selection
            $dropdown.on('change', function() {
                const selectedValue = $(this).val();
                if (selectedValue && selectedValue !== '') {
                    $infoButton.removeClass('d-none');
                } else {
                    $infoButton.addClass('d-none');
                }
            });

            // Trigger change to set initial visibility
            $dropdown.trigger('change');

            // Info button click handler
            $infoButton.on('click', function(e) {
                e.preventDefault();
                const selectedValue = $dropdown.val();
                if (!selectedValue) return;

                const genNum = parseInt(selectedValue, 10);
                const tierInfo = generationData.getGenerationTier ? generationData.getGenerationTier(genNum) : null;
                const limits = generationData.getBloodPotencyLimits ? generationData.getBloodPotencyLimits(genNum) : null;

                // Ensure modal exists or create it
                let $modal = $('#generation-info-modal');
                if ($modal.length === 0) {
                    $modal = $(
                        `<div class="modal fade" id="generation-info-modal" tabindex="-1" aria-labelledby="generationModalLabel" role="dialog" aria-modal="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="generationModalLabel">Generation</h5>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" id="generation-info-content"><!-- Content inserted dynamically --></div>
                                    <div class="modal-footer"></div>
                                </div>
                            </div>
                        </div>`
                    );

                    $('body').append($modal);
                }

                // Build modal content
                let content = '';
                if (tierInfo && tierInfo.description) {
                    content += `<p class="generation-info-description">${tierInfo.description}</p>`;
                }

                if (limits) {
                    content += `<p class="generation-info-bp"><strong>Blood Potency Range:</strong> ${limits.lowest} – ${limits.highest}</p>`;
                }

                // Add general effects section once (static)
                if (generationData.effects) {
                    content += '<h5>Effects</h5><ul class="generation-info-effects">';
                    for (const [key, val] of Object.entries(generationData.effects)) {
                        content += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${val}</li>`;
                    }
                    content += '</ul>';
                }

                // Update modal title with ordinal generation
                $('#generationModalLabel').text(`${getOrdinal(genNum)} Generation`);
                $('#generation-info-content').html(content);

                // Show modal via Bootstrap
                const modalElement = document.getElementById('generation-info-modal');
                const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
                modalInstance.show();
            });

            // Insert info button after dropdown
            $dropdown.after($infoButton);

            // Initialize Bootstrap tooltip
            new bootstrap.Tooltip($infoButton[0]);
        } catch (error) {
            console.error('Error loading generation data:', error);
            $(dropdown).append($('<option>', {
                'value': 'error',
                'text': 'Error loading generations'
            }));
        }
    }

    // Function to populate the blood potency dropdown with values from blood_potency.js
    async function populateBloodPotencyDropdown(dropdown) {
        try {
            const module = await import('./references/blood_potency.js');
            const bpData = module.bloodPotency;

            const $dropdown = $(dropdown);

            // Collect and sort potency levels
            const levels = Object.keys(bpData.levels).map(Number).sort((a, b) => a - b);

            levels.forEach(level => {
                const levelInfo = bpData.levels[level] || {};
                const displayText = `BP ${level}`;
                $dropdown.append($('<option>', {
                    'value': level,
                    'text': displayText,
                    'title': levelInfo.description || ''
                }));
            });

            // Preselect value if provided
            const currentValue = $dropdown.data('value') || $dropdown.attr('data-value') || '';
            if (currentValue !== '') {
                $dropdown.val(currentValue.toString());
            }

            // Create an info button similar to other dropdowns
            const $infoButton = $('<button>', {
                'class': 'btn btn-sm btn-outline-secondary ms-2 blood-potency-info-button d-none',
                'html': '<i class="bi bi-info-circle"></i>',
                'aria-label': 'Show blood potency information',
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Show detailed information about this blood potency level'
            });

            // Show/hide info button based on dropdown selection
            $dropdown.on('change', function() {
                const selectedValue = $(this).val();
                if (selectedValue && selectedValue !== '') {
                    $infoButton.removeClass('d-none');
                } else {
                    $infoButton.addClass('d-none');
                }
            });

            // Trigger change to set initial visibility
            $dropdown.trigger('change');

            // Info button click handler
            $infoButton.on('click', function(e) {
                e.preventDefault();
                const selectedValue = $dropdown.val();
                if (!selectedValue) return;

                const potency = parseInt(selectedValue, 10);
                const levelInfo = bpData.levels[potency] || {};
                const effects = bpData.getEffects ? bpData.getEffects(potency) : (levelInfo.effects || []);
                const baneSeverity = bpData.getBaneSeverity ? bpData.getBaneSeverity(potency) : null;
                const surgeBonus = bpData.getBloodSurgeBonus ? bpData.getBloodSurgeBonus(potency) : null;
                const disciplineBonus = bpData.getDisciplineBonus ? bpData.getDisciplineBonus(potency) : null;
                const healingAmount = bpData.getHealingAmount ? bpData.getHealingAmount(potency) : null;
                const rerollLevel = bpData.getRerollDisciplineLevel ? bpData.getRerollDisciplineLevel(potency) : null;

                // Ensure modal exists or create it
                let $modal = $('#blood-potency-info-modal');
                if ($modal.length === 0) {
                    $modal = $(
                        `<div class="modal fade" id="blood-potency-info-modal" tabindex="-1" aria-labelledby="bloodPotencyModalLabel" role="dialog" aria-modal="true">
                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="bloodPotencyModalLabel">Blood Potency</h5>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" id="blood-potency-info-content"><!-- Content inserted dynamically --></div>
                                    <div class="modal-footer"></div>
                                </div>
                            </div>
                        </div>`
                    );

                    $('body').append($modal);
                }

                // Build modal content
                let content = '';

                if (levelInfo.description) {
                    content += `<p class="blood-potency-description">${levelInfo.description}</p>`;
                }

                if (effects && effects.length) {
                    content += '<h5>Effects</h5><ul class="blood-potency-effects">';
                    effects.forEach(effect => {
                        content += `<li>${effect}</li>`;
                    });
                    content += '</ul>';
                }

                // Additional quick reference information
                content += '<h5>Quick Reference</h5><ul class="blood-potency-quick">';
                if (surgeBonus !== null) content += `<li><strong>Blood Surge Bonus:</strong> +${surgeBonus} dice</li>`;
                if (healingAmount !== null) content += `<li><strong>Mend Damage per Rouse:</strong> ${healingAmount} Superficial</li>`;
                if (baneSeverity !== null) content += `<li><strong>Bane Severity:</strong> ${baneSeverity}</li>`;
                if (disciplineBonus) content += `<li><strong>Discipline Bonus:</strong> +${disciplineBonus} die</li>`;
                if (rerollLevel !== null) content += `<li><strong>Discipline Reroll:</strong> Level ${rerollLevel} or below</li>`;
                content += '</ul>';

                // Update modal title and content
                $('#bloodPotencyModalLabel').text(`Blood Potency ${potency}`);
                $('#blood-potency-info-content').html(content);

                // Show modal via Bootstrap
                const modalElement = document.getElementById('blood-potency-info-modal');
                const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
                modalInstance.show();
            });

            // Insert info button after dropdown
            $dropdown.after($infoButton);

            // Initialize Bootstrap tooltip
            new bootstrap.Tooltip($infoButton[0]);
        } catch (error) {
            console.error('Error loading blood potency data:', error);
            $(dropdown).append($('<option>', {
                'value': 'error',
                'text': 'Error loading blood potency'
            }));
        }
    }

    // Create dropdown for Resonance
    function createResonanceDropdown(value) {
        const dropdown = $('<select>', { 'class': 'form-select form-select-sm resonance-dropdown' });
        dropdown.append($('<option>', { 'value': '', 'text': 'Select Resonance' }));
        if (value && value.trim() !== '') {
            dropdown.val(value.trim());
        }
        return dropdown;
    }

    // Create dropdown for Temperament
    function createTemperamentDropdown(value) {
        const dropdown = $('<select>', { 'class': 'form-select form-select-sm temperament-dropdown' });
        dropdown.append($('<option>', { 'value': '', 'text': 'Select Temperament' }));
        if (value && value.trim() !== '') {
            dropdown.val(value.trim());
        }
        return dropdown;
    }

    // Populate Resonance dropdown from references/resonances.js
    async function populateResonanceDropdown(dropdown) {
        try {
            const module = await import('./references/resonances.js');
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

            // Ensure info modal exists
            let $modal = $('#resonance-info-modal');
            if ($modal.length === 0) {
                $modal = $(
                    `<div class="modal fade" id="resonance-info-modal" tabindex="-1" aria-labelledby="resonanceModalLabel" role="dialog" aria-modal="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="resonanceModalLabel">Resonance</h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="resonance-info-content"><!-- Content inserted dynamically --></div>
                                <div class="modal-footer"></div>
                            </div>
                        </div>
                    </div>`
                );
                $('body').append($modal);
            }

            // Add info button next to dropdown
            const $infoButton = $('<button>', {
                'class': 'btn btn-sm btn-outline-secondary ms-2 resonance-info-button',
                'html': '<i class="bi bi-info-circle"></i>',
                'aria-label': 'Show resonance information',
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Show detailed information about this resonance'
            });

            $infoButton.on('click', function(e) {
                e.preventDefault();
                const selectedValue = $(dropdown).val();
                if (selectedValue && resonanceData.types[selectedValue]) {
                    const res = resonanceData.types[selectedValue];
                    $('#resonanceModalLabel').text(res.name);
                    let content = `<p>${res.description}</p>`;
                    if (res.emotions && res.emotions.length) {
                        content += `<p><strong>Emotions:</strong> ${res.emotions.join(', ')}</p>`;
                    }
                    if (res.disciplines && res.disciplines.length) {
                        content += `<p><strong>Associated Disciplines:</strong> ${res.disciplines.join(', ')}</p>`;
                    }
                    $('#resonance-info-content').html(content);
                    const modalElem = document.getElementById('resonance-info-modal');
                    bootstrap.Modal.getOrCreateInstance(modalElem).show();
                }
            });

            $(dropdown).after($infoButton);
            new bootstrap.Tooltip($infoButton[0]);
        } catch (err) {
            console.error('Error loading resonances:', err);
        }
    }

    // Populate Temperament dropdown from references/resonances.js
    async function populateTemperamentDropdown(dropdown) {
        try {
            const module = await import('./references/resonances.js');
            const temperamentData = module.resonances.temperaments;
            const entries = Object.entries(temperamentData);
            // Keep order: fleeting, intense, acute
            const order = ['fleeting', 'intense', 'acute'];
            entries.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
            entries.forEach(([key, data]) => {
                $(dropdown).append($('<option>', {
                    'value': key,
                    'text': data.name,
                    'title': data.description
                }));
            });

            // Ensure modal exists
            let $modal = $('#temperament-info-modal');
            if ($modal.length === 0) {
                $modal = $(
                    `<div class="modal fade" id="temperament-info-modal" tabindex="-1" aria-labelledby="temperamentModalLabel" role="dialog" aria-modal="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="temperamentModalLabel">Temperament</h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="temperament-info-content"></div>
                                <div class="modal-footer"></div>
                            </div>
                        </div>
                    </div>`
                );
                $('body').append($modal);
            }

            const $infoButton = $('<button>', {
                'class': 'btn btn-sm btn-outline-secondary ms-2 temperament-info-button',
                'html': '<i class="bi bi-info-circle"></i>',
                'aria-label': 'Show temperament information',
                'data-bs-toggle': 'tooltip',
                'data-bs-placement': 'top',
                'title': 'Show detailed information about this temperament'
            });

            $infoButton.on('click', function(e) {
                e.preventDefault();
                const selectedValue = $(dropdown).val();
                if (selectedValue && temperamentData[selectedValue]) {
                    const temp = temperamentData[selectedValue];
                    $('#temperamentModalLabel').text(temp.name);
                    let content = `<p>${temp.description}</p>`;
                    $('#temperament-info-content').html(content);
                    const modalElem = document.getElementById('temperament-info-modal');
                    bootstrap.Modal.getOrCreateInstance(modalElem).show();
                }
            });

            $(dropdown).after($infoButton);
            new bootstrap.Tooltip($infoButton[0]);
        } catch (err) {
            console.error('Error loading temperaments:', err);
        }
    }

    // Evaluate initial impairment state once the sheet is built
    evaluateImpairmentStatus();
});

// Function to populate the clan dropdown with data from clans.js
async function populateClanDropdowns() {
    // Find all clan dropdowns
    const clanDropdowns = document.querySelectorAll('.clan-dropdown');
    
    try {
        // Import the clans module
        const module = await import('./references/clans.js');
        
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
                
                // We'll create the modal on demand when the info button is clicked
                // This avoids potential timing issues with modal initialization
                
                // Add a button next to the dropdown to show info for the current selection
                const $infoButton = $('<button>', {
                    'class': 'btn btn-sm btn-outline-secondary ms-2 clan-info-button',
                    'html': '<i class="bi bi-info-circle"></i>',
                    'aria-label': 'Show clan information',
                    'data-bs-toggle': 'tooltip',
                    'data-bs-placement': 'top',
                    'title': 'Show detailed information about this clan'
                });
                
                $infoButton.on('click', function(e) {
                    e.preventDefault();
                    const selectedValue = $dropdown.val();
                    if (selectedValue && clans.types[selectedValue]) {
                        const clan = clans.types[selectedValue];
                        
                        // Update modal title
                        $('#clanModalLabel').text(clan.name);
                        
                        // Prepare the content for the modal body
                        let content = '';
                        
                        // Add nicknames if available
                        if (clan.nicknames && clan.nicknames.length > 0) {
                            content += `<p class="clan-info-nicknames"><strong>Nicknames:</strong> ${clan.nicknames.join(', ')}</p>`;
                        }
                        
                        // Add disciplines if available
                        if (clan.disciplines && Array.isArray(clan.disciplines)) {
                            content += `<p class="clan-info-disciplines"><strong>Disciplines:</strong> ${clan.disciplines.join(', ')}</p>`;
                        }
                        
                        // Add background description if available
                        if (clan.background && clan.background.description) {
                            content += `<h5>Background</h5><p class="clan-info-background">${clan.background.description}</p>`;
                        }
                        
                        // Add bane if available
                        if (clan.bane) {
                            content += `<h5>Clan Bane: ${clan.bane.name}</h5>`;
                            content += `<p class="clan-info-bane">${clan.bane.description}</p>`;
                        }
                        
                        // Add compulsion if available
                        if (clan.compulsion) {
                            content += `<h5>Clan Compulsion: ${clan.compulsion.name}</h5>`;
                            content += `<p class="clan-info-compulsion">${clan.compulsion.description}</p>`;
                        }
                        
                        // Add discipline descriptions if available
                        if (clan.disciplines && typeof clan.disciplines === 'object' && !Array.isArray(clan.disciplines)) {
                            content += '<h5>Clan Disciplines</h5>';
                            for (const [disc, description] of Object.entries(clan.disciplines)) {
                                if (typeof description === 'string') {
                                    content += `<p><strong>${disc.charAt(0).toUpperCase() + disc.slice(1)}:</strong> ${description}</p>`;
                                }
                            }
                        }
                        
                        // Update modal content
                        $('#clan-info-content').html(content);
                        
                        // Show the modal
                        window.clanInfoModal.show();
                    }
                });
                
                // Add the info button after the dropdown
                $dropdown.after($infoButton);
                
                // Initialize the tooltip
                new bootstrap.Tooltip($infoButton[0]);
            } catch (error) {
                console.error('Error loading clans:', error);
                $(dropdown).append($('<option>', {
                    'value': 'error',
                    'text': 'Error loading clans'
                }));
            }
        });
    } catch (error) {
        console.error('Error importing clans module:', error);
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