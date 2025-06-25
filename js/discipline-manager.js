// Enhanced Discipline Manager with Powers
import { disciplines } from './disciplines.js';
import { TraitManagerUtils } from './manager-utils.js';

class DisciplineManager {
    constructor() {
        this.selectedDisciplines = new Map(); // disciplineKey -> { level: number, powers: Set<string> }
        this.availableDisciplines = Object.keys(disciplines.types);

        // Ensure all discipline data exposes a common `powers` container, even for Rituals or Ceremonies
        Object.values(disciplines.types).forEach((d) => {
            if (!d.powers) {
                if (d.rituals) {
                    d.powers = d.rituals;
                } else if (d.ceremonies) {
                    d.powers = d.ceremonies;
                }
            }
        });

        this.init();
    }

    init() {
        this.renderDisciplineManager();
        this.bindEvents();
    }

    renderDisciplineManager() {
        const disciplineContainer = $('.disciplines-container');
        if (disciplineContainer.length === 0) {
            console.error('Disciplines container not found');
            return;
        }

        disciplineContainer.empty();

        // Add discipline selector
        this.renderDisciplineSelector(disciplineContainer);
        
        // Add selected disciplines list
        this.renderSelectedDisciplines(disciplineContainer);
    }

    renderDisciplineSelector(container) {
        const selectorHtml = `
            <div class="discipline-selector mb-3">
                <div class="d-flex align-items-center gap-2">
                    <select class="form-select discipline-dropdown" id="disciplineSelect">
                        <option value="">Select a Discipline</option>
                        ${this.getAvailableDisciplineOptions()}
                    </select>
                    <button class="btn btn-success btn-sm" id="addDisciplineBtn" disabled>
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
        `;
        container.append(selectorHtml);
    }

    renderSelectedDisciplines(container) {
        const selectedHtml = `
            <div class="selected-disciplines">
                <div id="disciplinesList" class="disciplines-list">
                    ${this.selectedDisciplines.size === 0 ? 
                        '<div class="fst-italic">No disciplines selected</div>' : 
                        this.getSelectedDisciplinesHtml()
                    }
                </div>
            </div>
        `;
        container.append(selectedHtml);
    }

    getAvailableDisciplineOptions() {
        return this.availableDisciplines
            .filter(disciplineKey => !this.selectedDisciplines.has(disciplineKey))
            .map(disciplineKey => {
                const discipline = disciplines.types[disciplineKey];
                const displayName = discipline.name || TraitManagerUtils.capitalizeFirst(disciplineKey);
                return `<option value="${disciplineKey}">${displayName}</option>`;
            })
            .join('');
    }

    getSelectedDisciplinesHtml() {
        return Array.from(this.selectedDisciplines.entries())
            .map(([disciplineKey, disciplineData]) => {
                const discipline = disciplines.types[disciplineKey];
                const displayName = discipline.name || TraitManagerUtils.capitalizeFirst(disciplineKey);
                return `
                    <div class="discipline-item mb-3" data-discipline="${disciplineKey}">
                        <div class="discipline-header d-flex justify-content-between align-items-center stat">
                            <div class="discipline-info">
                                <span class="stat-label">${displayName}</span>
                            </div>
                            <div class="discipline-controls d-flex align-items-center gap-2">
                                <div class="dots" data-value="${disciplineData.level}" data-discipline="${disciplineKey}">
                                    ${TraitManagerUtils.createDots(disciplineData.level)}
                                </div>
                                <button class="btn theme-btn-primary btn-sm remove-discipline-btn" data-discipline="${disciplineKey}">
                                    <i class="bi bi-dash-circle"></i>
                                </button>
                            </div>
                        </div>
                        ${disciplineData.level > 0 ? this.renderDisciplinePowers(disciplineKey, disciplineData) : ''}
                    </div>
                `;
            })
            .join('');
    }

    renderDisciplinePowers(disciplineKey, disciplineData) {
        const discipline = disciplines.types[disciplineKey];
        const powers = disciplineData.powers;
        
        let powersHtml = '<div class="discipline-powers mt-2">';
        
        // Show powers by level
        for (let level = 1; level <= disciplineData.level; level++) {
            const levelKey = `level${level}`;
            const availablePowers = discipline.powers[levelKey] || [];
            const selectedPowersAtLevel = Array.from(powers).filter(powerName => 
                availablePowers.some(p => p.name === powerName)
            );

            if (availablePowers.length > 0) {
                powersHtml += `
                    <div class="power-level mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="fw-bold">Level ${level} Powers</small>
                            ${level === disciplineData.level ? `
                                <button class="btn theme-btn-outline-primary btn-sm add-power-btn"
                                        data-discipline="${disciplineKey}" 
                                        data-level="${level}">
                                    <i class="bi bi-plus"></i>
                                </button>
                            ` : ''}
                        </div>
                        <div class="selected-powers mt-1">
                            ${selectedPowersAtLevel.length === 0 ? 
                                '<div class="fst-italic small">No powers selected</div>' :
                                selectedPowersAtLevel.map(powerName => this.renderSelectedPower(disciplineKey, powerName)).join('')
                            }
                        </div>
                    </div>
                `;
            }
        }
        
        powersHtml += '</div>';
        return powersHtml;
    }

    renderSelectedPower(disciplineKey, powerName) {
        const discipline = disciplines.types[disciplineKey];
        const power = this.findPowerByName(discipline, powerName);
        
        if (!power) return '';

        return `
            <div class="selected-power d-flex justify-content-between align-items-center py-1 px-2 mb-1 bg-dark rounded">
                <div class="power-info">
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <span class="power-name small fw-bold">${power.name}</span>
                        ${power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None' ? 
                            `<span class="badge bg-warning text-dark" style="font-size: 0.6em;">Amalgam</span>` : ''}
                    </div>
                    <div class="power-details small">
                        ${power.effect}
                        ${power.cost && power.cost !== 'None' && power.cost !== 'N/A' ? `<br><strong>Cost:</strong> ${power.cost}` : ''}
                        ${power.duration && power.duration !== 'None' && power.duration !== 'N/A' ? `<br><strong>Duration:</strong> ${power.duration}` : ''}
                        ${power.dicePool && power.dicePool !== 'None' && power.dicePool !== 'N/A' ? `<br><strong>Dice Pool:</strong> ${power.dicePool}` : ''}
                        ${power.opposingPool && power.opposingPool !== 'None' && power.opposingPool !== 'N/A' ? `<br><strong>Opposing Pool:</strong> ${power.opposingPool}` : ''}
                        ${power.notes && power.notes !== 'None' && power.notes !== 'N/A' ? `<br><em>${power.notes}</em>` : ''}
                        ${power.prerequisite && power.prerequisite !== 'None' ? `<br><em>Prerequisite: ${power.prerequisite}</em>` : ''}
                        ${power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None' ? `<br><em>Amalgam: ${power.amalgam}</em>` : ''}
                        ${power.source ? `<br><span class="fst-italic" style="font-size: 0.8em;">Source: ${power.source}</span>` : ''}
                    </div>
                </div>
                <button class="btn theme-btn-outline-danger btn-sm remove-power-btn" 
                        data-discipline="${disciplineKey}" 
                        data-power="${powerName}">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `;
    }

    bindEvents() {
        // Bind add discipline events
        $(document).on('change', '#disciplineSelect', (e) => {
            const addBtn = $('#addDisciplineBtn');
            addBtn.prop('disabled', !e.target.value);
        });

        $(document).on('click', '#addDisciplineBtn', (e) => {
            e.preventDefault();
            const select = $('#disciplineSelect');
            const disciplineKey = select.val();
            
            if (disciplineKey && !this.selectedDisciplines.has(disciplineKey)) {
                this.addDiscipline(disciplineKey);
            }
        });

        // Bind remove discipline events
        $(document).on('click', '.remove-discipline-btn', (e) => {
            e.preventDefault();
            const disciplineKey = $(e.currentTarget).data('discipline');
            this.removeDiscipline(disciplineKey);
        });

        // Bind dot click events for discipline levels
        $(document).on('click', '.disciplines-container .dot', (e) => {
            e.preventDefault();
            this.handleDotClick($(e.currentTarget));
        });

        // Bind power management events
        $(document).on('click', '.add-power-btn', (e) => {
            e.preventDefault();
            const disciplineKey = $(e.currentTarget).data('discipline');
            const level = $(e.currentTarget).data('level');
            this.showPowerSelectionModal(disciplineKey, level);
        });

        $(document).on('click', '.remove-power-btn', (e) => {
            e.preventDefault();
            const disciplineKey = $(e.currentTarget).data('discipline');
            const powerName = $(e.currentTarget).data('power');
            this.removePower(disciplineKey, powerName);
        });
    }

    addDiscipline(disciplineKey) {
        if (this.selectedDisciplines.has(disciplineKey)) {
            return;
        }

        this.selectedDisciplines.set(disciplineKey, {
            level: 0,
            powers: new Set()
        });
        
        this.updateDisplay();
        
        // Show success feedback
        TraitManagerUtils.showFeedback(`Added ${this.getDisciplineName(disciplineKey)}`, 'success');
    }

    removeDiscipline(disciplineKey) {
        if (!this.selectedDisciplines.has(disciplineKey)) {
            return;
        }

        this.selectedDisciplines.delete(disciplineKey);
        this.updateDisplay();
        
        // Show success feedback
        TraitManagerUtils.showFeedback(`Removed ${this.getDisciplineName(disciplineKey)}`, 'info');
    }

    handleDotClick($dot) {
        const $dotsContainer = $dot.parent();
        const currentValue = parseInt($dotsContainer.data('value') || '0');
        const clickedValue = parseInt($dot.data('value'));
        const disciplineKey = $dotsContainer.data('discipline');

        let newValue;
        
        // If clicking the last filled dot, decrease by 1
        if (clickedValue === currentValue) {
            newValue = clickedValue - 1;
        }
        // If clicking an empty dot
        else if (clickedValue > currentValue) {
            // Restrict increases to only one level at a time
            if (clickedValue === currentValue + 1) {
                newValue = clickedValue;
            } else {
                // Show feedback that they can only increase by one level
                const disciplineName = this.getDisciplineName(disciplineKey);
                TraitManagerUtils.showFeedback(`You can only increase ${disciplineName} by one level at a time. Current level: ${currentValue}`, 'warning');
                return; // Don't change the level
            }
        }
        // If clicking a filled dot (decreasing), allow any decrease
        else {
            newValue = clickedValue;
        }

        // Handle level changes
        this.changeDisciplineLevel(disciplineKey, currentValue, newValue);
    }

    async changeDisciplineLevel(disciplineKey, oldLevel, newLevel) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return;

        // If increasing level, prompt for new power
        if (newLevel > oldLevel) {
            disciplineData.level = newLevel;
            this.updateDisciplineDisplay(disciplineKey);
            
            // Show power selection for the new level
            if (newLevel > 0) {
                this.showPowerSelectionModal(disciplineKey, newLevel);
            }
        }
        // If decreasing level, handle power removal
        else if (newLevel < oldLevel) {
            const powersToRemove = this.getPowersAboveLevel(disciplineKey, newLevel);
            
            if (powersToRemove.length > 0) {
                const shouldRemove = await this.confirmPowerRemoval(disciplineKey, powersToRemove, oldLevel, newLevel);
                if (shouldRemove) {
                    // Remove powers above the new level
                    powersToRemove.forEach(powerName => {
                        disciplineData.powers.delete(powerName);
                    });
                    
                    disciplineData.level = newLevel;
                    this.updateDisciplineDisplay(disciplineKey);
                    
                    TraitManagerUtils.showFeedback(`${this.getDisciplineName(disciplineKey)} level reduced to ${newLevel}. Removed ${powersToRemove.length} power(s).`, 'warning');
                } else {
                    // Revert the level change
                    this.updateDisciplineDisplay(disciplineKey);
                    return;
                }
            } else {
                disciplineData.level = newLevel;
                this.updateDisciplineDisplay(disciplineKey);
            }
        }

        const disciplineName = this.getDisciplineName(disciplineKey);
        TraitManagerUtils.showFeedback(`${disciplineName} level set to ${newLevel}`, 'info');
    }

    updateDisciplineDisplay(disciplineKey) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return;

        // Update dots
        const $dots = $(`.dots[data-discipline="${disciplineKey}"]`);
        $dots.find('.dot').each(function(index) {
            $(this).toggleClass('filled', index < disciplineData.level);
        });
        $dots.data('value', disciplineData.level);
        $dots.attr('data-value', disciplineData.level);

        // Update the entire discipline display
        this.updateDisplay();
    }

    getPowersAboveLevel(disciplineKey, level) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        const discipline = disciplines.types[disciplineKey];
        
        if (!disciplineData || !discipline) return [];

        const powersToRemove = [];
        
        for (const powerName of disciplineData.powers) {
            const powerLevel = this.getPowerLevel(discipline, powerName);
            if (powerLevel > level) {
                powersToRemove.push(powerName);
            }
        }
        
        return powersToRemove;
    }

    async confirmPowerRemoval(disciplineKey, powersToRemove, oldLevel, newLevel) {
        const disciplineName = this.getDisciplineName(disciplineKey);
        
        const message = `
            <p>Reducing <strong>${disciplineName}</strong> from level ${oldLevel} to ${newLevel} will remove the following powers:</p>
            <ul>
                ${powersToRemove.map(power => `<li>${power}</li>`).join('')}
            </ul>
            <p>Do you want to continue?</p>
        `;
        
        return await modalManager.confirm('Confirm Level Reduction', message, {
            confirmText: 'Remove Powers',
            confirmClass: 'theme-btn-primary'
        });
    }

    async showPowerSelectionModal(disciplineKey, level) {
        const availablePowers = this.getAvailablePowersUpToLevel(disciplineKey, level);
        const disciplineName = this.getDisciplineName(disciplineKey);
        
        if (availablePowers.length === 0) {
            TraitManagerUtils.showFeedback(`No available powers up to level ${level} for ${disciplineName}`, 'warning');
            return;
        }

        const renderPowerOption = (power, index) => `
            <div class="power-option mb-3 p-3 border rounded" data-power="${power.name}">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="power-details flex-grow-1">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <h6 class="power-name mb-0">${power.name}</h6>
                            <span class="badge bg-secondary">Level ${power.level}</span>
                            ${power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None' ? 
                                `<span class="badge bg-warning text-dark">Amalgam</span>` : ''}
                        </div>
                        <div class="power-meta small">
                            ${power.effect}
                            ${power.cost && power.cost !== 'None' && power.cost !== 'N/A' ? `<br><strong>Cost:</strong> ${power.cost}` : ''}
                            ${power.duration && power.duration !== 'None' && power.duration !== 'N/A' ? `<br><strong>Duration:</strong> ${power.duration}` : ''}
                            ${power.dicePool && power.dicePool !== 'None' && power.dicePool !== 'N/A' ? `<br><strong>Dice Pool:</strong> ${power.dicePool}` : ''}
                            ${power.opposingPool && power.opposingPool !== 'None' && power.opposingPool !== 'N/A' ? `<br><strong>Opposing Pool:</strong> ${power.opposingPool}` : ''}
                            ${power.notes && power.notes !== 'None' && power.notes !== 'N/A' ? `<br><em>${power.notes}</em>` : ''}
                            ${power.prerequisite && power.prerequisite !== 'None' ? `<br><em>Prerequisite: ${power.prerequisite}</em>` : ''}
                            ${power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None' ? `<br><em>Amalgam: ${power.amalgam}</em>` : ''}
                            ${power.source ? `<br><span class="fst-italic" style="font-size: 0.8em;">Source: ${power.source}</span>` : ''}
                        </div>
                    </div>
                    <button class="btn btn-success btn-sm select-option-btn ms-3" data-index="${index}">
                        Select
                    </button>
                </div>
            </div>
        `;

        const result = await modalManager.select(
            `Select Power - ${disciplineName} (Levels 1-${level})`,
            availablePowers,
            renderPowerOption,
            { size: 'lg', scrollable: true }
        );

        if (result) {
            this.addPower(disciplineKey, result.option.name);
        }
    }

    getAvailablePowersAtLevel(disciplineKey, level) {
        const discipline = disciplines.types[disciplineKey];
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        
        if (!discipline || !disciplineData) return [];

        const levelKey = `level${level}`;
        const allPowersAtLevel = discipline.powers[levelKey] || [];
        
        // Filter out already selected powers and check prerequisites
        return allPowersAtLevel.filter(power => {
            // Skip if already selected
            if (disciplineData.powers.has(power.name)) return false;
            
            // Check prerequisites
            if (power.prerequisite && power.prerequisite !== 'None') {
                if (!this.checkPrerequisites(disciplineKey, power.prerequisite)) return false;
            }
            
            // Check amalgam requirements
            if (power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None') {
                if (!this.checkAmalgamRequirements(power.amalgam)) return false;
            }
            
            return true;
        });
    }

    getAvailablePowersUpToLevel(disciplineKey, maxLevel) {
        const discipline = disciplines.types[disciplineKey];
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        
        if (!discipline || !disciplineData) return [];

        const availablePowers = [];
        
        // Get powers from all levels up to and including maxLevel
        for (let level = 1; level <= maxLevel; level++) {
            const levelKey = `level${level}`;
            const powersAtLevel = discipline.powers[levelKey] || [];
            
            powersAtLevel.forEach(power => {
                // Skip if already selected
                if (disciplineData.powers.has(power.name)) return;
                
                // Check prerequisites
                if (power.prerequisite && power.prerequisite !== 'None') {
                    if (!this.checkPrerequisites(disciplineKey, power.prerequisite)) return;
                }
                
                // Check amalgam requirements
                if (power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None') {
                    if (!this.checkAmalgamRequirements(power.amalgam)) return;
                }
                
                // Add level information to the power object for display
                availablePowers.push({
                    ...power,
                    level: level
                });
            });
        }
        
        // Sort by level, then by name
        return availablePowers.sort((a, b) => {
            if (a.level !== b.level) {
                return a.level - b.level;
            }
            return a.name.localeCompare(b.name);
        });
    }

    checkPrerequisites(disciplineKey, prerequisiteString) {
        // This is a simplified prerequisite check
        // In a full implementation, you'd need to parse more complex prerequisite strings
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return false;

        // Check if the prerequisite power is already selected
        return disciplineData.powers.has(prerequisiteString);
    }

    checkAmalgamRequirements(amalgamString) {
        if (!amalgamString || amalgamString === 'No' || amalgamString === 'None') {
            return true; // No amalgam requirement
        }

        // Parse amalgam string like "Obfuscate ●●" or "Blood Sorcery ●●"
        const amalgamMatch = amalgamString.match(/^(.+?)\s+(●+)$/);
        if (!amalgamMatch) {
            console.warn('Could not parse amalgam requirement:', amalgamString);
            return false;
        }

        const [, disciplineName, dots] = amalgamMatch;
        const requiredLevel = dots.length;

        // Convert discipline name to key format
        const disciplineKey = this.disciplineNameToKey(disciplineName);
        
        // Check if character has the required discipline at the required level
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        return disciplineData && disciplineData.level >= requiredLevel;
    }

    disciplineNameToKey(disciplineName) {
        // Convert display names to internal keys
        const nameMap = {
            'Animalism': 'animalism',
            'Auspex': 'auspex',
            'Blood Sorcery': 'blood_sorcery',
            'Blood Sorcery Rituals': 'blood_sorcery_rituals',
            'Celerity': 'celerity',
            'Dominate': 'dominate',
            'Fortitude': 'fortitude',
            'Obfuscate': 'obfuscate',
            'Oblivion': 'oblivion',
            'Oblivion Ceremonies': 'oblivion_ceremonies',
            'Potence': 'potence',
            'Presence': 'presence',
            'Protean': 'protean',
            'Thin-Blood Alchemy': 'thin_blood_alchemy'
        };

        return nameMap[disciplineName] || disciplineName.toLowerCase().replace(/[^a-z]/g, '');
    }

    addPower(disciplineKey, powerName) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return;

        disciplineData.powers.add(powerName);
        this.updateDisplay();
        
        this.showFeedback(`Added power: ${powerName}`, 'success');
    }

    removePower(disciplineKey, powerName) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return;

        disciplineData.powers.delete(powerName);
        this.updateDisplay();
        
        this.showFeedback(`Removed power: ${powerName}`, 'info');
    }

    findPowerByName(discipline, powerName) {
        for (const levelKey in discipline.powers) {
            const powers = discipline.powers[levelKey];
            const power = powers.find(p => p.name === powerName);
            if (power) return power;
        }
        return null;
    }

    getPowerLevel(discipline, powerName) {
        for (const levelKey in discipline.powers) {
            const powers = discipline.powers[levelKey];
            if (powers.some(p => p.name === powerName)) {
                return parseInt(levelKey.replace('level', ''));
            }
        }
        return 0;
    }

    updateDisplay() {
        // Update the dropdown options
        $('#disciplineSelect').html(`
            <option value="">Select a Discipline</option>
            ${this.getAvailableDisciplineOptions()}
        `).val('');
        
        // Disable add button
        $('#addDisciplineBtn').prop('disabled', true);
        
        // Update the selected disciplines list
        $('#disciplinesList').html(
            this.selectedDisciplines.size === 0 ? 
                '<div class="fst-italic">No disciplines selected</div>' : 
                this.getSelectedDisciplinesHtml()
        );
    }

    getDisciplineName(disciplineKey) {
        const discipline = disciplines.types[disciplineKey];
        return discipline?.name || this.capitalizeFirst(disciplineKey);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'Discipline Manager');
        } else {
            // Fallback to simple alert if toastManager is not available
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Public methods for external access
    getSelectedDisciplines() {
        const result = {};
        this.selectedDisciplines.forEach((data, key) => {
            result[key] = {
                level: data.level,
                powers: Array.from(data.powers)
            };
        });
        return result;
    }

    getDisciplineLevel(disciplineKey) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        return disciplineData ? disciplineData.level : 0;
    }

    getDisciplinePowers(disciplineKey) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        return disciplineData ? Array.from(disciplineData.powers) : [];
    }

    // Load disciplines from data (for character loading)
    loadDisciplines(disciplineData) {
        this.selectedDisciplines.clear();
        
        if (disciplineData && typeof disciplineData === 'object') {
            Object.entries(disciplineData).forEach(([disciplineKey, data]) => {
                if (this.availableDisciplines.includes(disciplineKey)) {
                    this.selectedDisciplines.set(disciplineKey, {
                        level: data.level || 0,
                        powers: new Set(data.powers || [])
                    });
                }
            });
            
            this.updateDisplay();
        }
    }

    // Export disciplines data (for character saving)
    exportDisciplines() {
        return this.getSelectedDisciplines();
    }
}

// Initialize the discipline manager when the DOM is ready
$(document).ready(function() {
    // Only initialize if the disciplines container exists
    if ($('.disciplines-container').length > 0) {
        window.disciplineManager = new DisciplineManager();
    }
});

export { DisciplineManager };