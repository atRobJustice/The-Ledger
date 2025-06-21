// Enhanced Discipline Manager with Powers and Component Architecture Integration
const disciplines = window.disciplines;
const disciplineTraitUtils = window.TraitManagerUtils;

class DisciplineManager {
    constructor() {
        this.selectedDisciplines = new Map(); // disciplineKey -> { level: number, powers: Set<string> }
        this.availableDisciplines = Object.keys(disciplines.types);
        this.eventListeners = new Map();
        this.isComponentMode = false;
        this.parentComponent = null;

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

        // Do not call init() here
    }

    /**
     * Set component mode and parent component
     */
    setComponentMode(parentComponent) {
        this.isComponentMode = true;
        this.parentComponent = parentComponent;
        console.log('DisciplineManager: Component mode enabled');
    }

    /**
     * Initialize the manager
     */
    init() {
        this.renderDisciplineManager();
        this.bindEvents();
    }

    /**
     * Event handling methods
     */
    on(event, handler) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(handler);
    }

    off(event, handler) {
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        // Emit to internal listeners
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in discipline manager event handler for ${event}:`, err);
                }
            });
        }

        // Emit to parent component if in component mode
        if (this.isComponentMode && this.parentComponent) {
            this.parentComponent.emit(event, data);
        }

        // Emit to document for legacy compatibility
        document.dispatchEvent(new CustomEvent(`discipline${event.charAt(0).toUpperCase() + event.slice(1)}`, {
            detail: { ...data, source: 'DisciplineManager' }
        }));
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
                const displayName = discipline.name || disciplineTraitUtils.capitalizeFirst(disciplineKey);
                return `<option value="${disciplineKey}">${displayName}</option>`;
            })
            .join('');
    }

    getSelectedDisciplinesHtml() {
        return Array.from(this.selectedDisciplines.entries())
            .map(([disciplineKey, disciplineData]) => {
                const discipline = disciplines.types[disciplineKey];
                const displayName = discipline.name || disciplineTraitUtils.capitalizeFirst(disciplineKey);
                return `
                    <div class="discipline-item mb-3" data-discipline="${disciplineKey}">
                        <div class="discipline-header d-flex justify-content-between align-items-center stat">
                            <div class="discipline-info">
                                <span class="stat-label">${displayName}</span>
                            </div>
                            <div class="discipline-controls d-flex align-items-center gap-2">
                                <div class="dots" data-value="${disciplineData.level}" data-discipline="${disciplineKey}">
                                    ${disciplineTraitUtils.createDots(disciplineData.level)}
                                </div>
                                <button class="btn btn-danger btn-sm remove-discipline-btn" data-discipline="${disciplineKey}">
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
                                <button class="btn btn-outline-success btn-sm add-power-btn" 
                                        data-discipline="${disciplineKey}" 
                                        data-level="${disciplineData.level}"
                                        ${this.getAvailablePowersUpToLevel(disciplineKey, disciplineData.level).length === 0 ? 'disabled' : ''}>
                                    <i class="bi bi-plus"></i> Add Power
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
                <button class="btn btn-outline-danger btn-sm remove-power-btn" 
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
            const disciplineKey = $('#disciplineSelect').val();
            if (disciplineKey) {
                this.addDiscipline(disciplineKey);
            }
        });

        // Bind remove discipline events
        $(document).on('click', '.remove-discipline-btn', (e) => {
            e.preventDefault();
            const disciplineKey = $(e.target).closest('.remove-discipline-btn').data('discipline');
            this.removeDiscipline(disciplineKey);
        });

        // Bind dot click events
        $(document).on('click', '.dots .dot', (e) => {
            e.preventDefault();
            const $dot = $(e.target);
            this.handleDotClick($dot);
        });

        // Bind add power events
        $(document).on('click', '.add-power-btn', (e) => {
            e.preventDefault();
            const disciplineKey = $(e.target).closest('.add-power-btn').data('discipline');
            const level = $(e.target).closest('.add-power-btn').data('level');
            this.showPowerSelectionModal(disciplineKey, level);
        });

        // Bind remove power events
        $(document).on('click', '.remove-power-btn', (e) => {
            e.preventDefault();
            const disciplineKey = $(e.target).closest('.remove-power-btn').data('discipline');
            const powerName = $(e.target).closest('.remove-power-btn').data('power');
            this.removePower(disciplineKey, powerName);
        });
    }

    addDiscipline(disciplineKey) {
        if (this.selectedDisciplines.has(disciplineKey)) {
            this.showFeedback('Discipline already selected', 'warning');
            return;
        }

        this.selectedDisciplines.set(disciplineKey, {
            level: 1,
            powers: new Set()
        });

        this.updateDisplay();
        $('#disciplineSelect').val('').trigger('change');
        
        // Emit discipline added event
        this.emit('disciplineAdded', {
            disciplineKey,
            level: 1,
            powers: []
        });
    }

    removeDiscipline(disciplineKey) {
        if (!this.selectedDisciplines.has(disciplineKey)) {
            return;
        }

        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        this.selectedDisciplines.delete(disciplineKey);
        this.updateDisplay();
        
        // Emit discipline removed event
        this.emit('disciplineRemoved', {
            disciplineKey,
            level: disciplineData.level,
            powers: Array.from(disciplineData.powers)
        });
    }

    handleDotClick($dot) {
        const $dots = $dot.closest('.dots');
        const disciplineKey = $dots.data('discipline');
        const currentLevel = parseInt($dots.data('value'));
        const clickedIndex = $dot.index();
        const newLevel = clickedIndex + 1;

        if (newLevel === currentLevel) {
            // Same level clicked, do nothing
            return;
        }

        this.changeDisciplineLevel(disciplineKey, currentLevel, newLevel);
    }

    async changeDisciplineLevel(disciplineKey, oldLevel, newLevel) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) {
            return;
        }

        // Check if we're reducing level and have powers that would be lost
        if (newLevel < oldLevel) {
            const powersToRemove = this.getPowersAboveLevel(disciplineKey, newLevel);
            if (powersToRemove.length > 0) {
                const confirmed = await this.confirmPowerRemoval(disciplineKey, powersToRemove, oldLevel, newLevel);
                if (!confirmed) {
                    return;
                }
            }
        }

        // Update level
        disciplineData.level = newLevel;

        // Remove powers above new level
        if (newLevel < oldLevel) {
            const powersToRemove = this.getPowersAboveLevel(disciplineKey, newLevel);
            powersToRemove.forEach(powerName => {
                disciplineData.powers.delete(powerName);
            });
        }

        this.updateDisciplineDisplay(disciplineKey);
        
        // Emit discipline level changed event
        this.emit('disciplineLevelChanged', {
            disciplineKey,
            oldLevel,
            newLevel,
            powers: Array.from(disciplineData.powers)
        });
    }

    updateDisciplineDisplay(disciplineKey) {
        const $disciplineItem = $(`.discipline-item[data-discipline="${disciplineKey}"]`);
        if ($disciplineItem.length === 0) {
            return;
        }

        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) {
            return;
        }

        // Update dots
        const $dots = $disciplineItem.find('.dots');
        $dots.attr('data-value', disciplineData.level);
        $dots.html(disciplineTraitUtils.createDots(disciplineData.level));

        // Update powers section
        const $powersSection = $disciplineItem.find('.discipline-powers');
        if (disciplineData.level > 0) {
            $powersSection.html(this.renderDisciplinePowers(disciplineKey, disciplineData));
        } else {
            $powersSection.remove();
        }
    }

    getPowersAboveLevel(disciplineKey, level) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) {
            return [];
        }

        const discipline = disciplines.types[disciplineKey];
        const powersToRemove = [];

        for (let i = level + 1; i <= disciplineData.level; i++) {
            const levelKey = `level${i}`;
            const availablePowers = discipline.powers[levelKey] || [];
            
            availablePowers.forEach(power => {
                if (disciplineData.powers.has(power.name)) {
                    powersToRemove.push(power.name);
                }
            });
        }

        return powersToRemove;
    }

    async confirmPowerRemoval(disciplineKey, powersToRemove, oldLevel, newLevel) {
        const discipline = disciplines.types[disciplineKey];
        const displayName = discipline.name || disciplineTraitUtils.capitalizeFirst(disciplineKey);
        
        const message = `Reducing ${displayName} from level ${oldLevel} to ${newLevel} will remove the following powers:\n\n${powersToRemove.join('\n')}\n\nContinue?`;
        
        return new Promise((resolve) => {
            if (window.confirm(message)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }

    showPowerSelectionModal(disciplineKey, level) {
        const availablePowers = this.getAvailablePowersAtLevel(disciplineKey, level);
        
        if (availablePowers.length === 0) {
            this.showFeedback('No powers available at this level', 'warning');
            return;
        }

        // Create modal HTML
        const modalHtml = `
            <div class="modal fade" id="powerSelectionModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Select Power - Level ${level}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="power-list">
                                ${availablePowers.map(power => `
                                    <div class="power-option mb-3 p-3 border rounded">
                                        <div class="d-flex justify-content-between align-items-start">
                                            <div class="flex-grow-1">
                                                <h6 class="power-name">${power.name}</h6>
                                                <p class="power-effect mb-2">${power.effect}</p>
                                                ${power.cost && power.cost !== 'None' ? `<p><strong>Cost:</strong> ${power.cost}</p>` : ''}
                                                ${power.duration && power.duration !== 'None' ? `<p><strong>Duration:</strong> ${power.duration}</p>` : ''}
                                                ${power.dicePool && power.dicePool !== 'None' ? `<p><strong>Dice Pool:</strong> ${power.dicePool}</p>` : ''}
                                                ${power.prerequisite && power.prerequisite !== 'None' ? `<p><em>Prerequisite: ${power.prerequisite}</em></p>` : ''}
                                                ${power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None' ? `<p><em>Amalgam: ${power.amalgam}</em></p>` : ''}
                                            </div>
                                            <button class="btn btn-success btn-sm select-power-btn" 
                                                    data-power="${power.name}">
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal and add new one
        $('#powerSelectionModal').remove();
        $('body').append(modalHtml);

        // Bind events
        $('#powerSelectionModal').on('click', '.select-power-btn', (e) => {
            const powerName = $(e.target).data('power');
            this.addPower(disciplineKey, powerName);
            $('#powerSelectionModal').modal('hide');
        });

        // Show modal
        $('#powerSelectionModal').modal('show');
    }

    getAvailablePowersAtLevel(disciplineKey, level) {
        const discipline = disciplines.types[disciplineKey];
        const levelKey = `level${level}`;
        const availablePowers = discipline.powers[levelKey] || [];
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        
        if (!disciplineData) {
            return availablePowers;
        }

        // Filter out already selected powers
        return availablePowers.filter(power => !disciplineData.powers.has(power.name));
    }

    getAvailablePowersUpToLevel(disciplineKey, maxLevel) {
        const discipline = disciplines.types[disciplineKey];
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        const availablePowers = [];

        for (let level = 1; level <= maxLevel; level++) {
            const levelKey = `level${level}`;
            const levelPowers = discipline.powers[levelKey] || [];
            
            levelPowers.forEach(power => {
                if (!disciplineData.powers.has(power.name)) {
                    availablePowers.push(power);
                }
            });
        }

        return availablePowers;
    }

    checkPrerequisites(disciplineKey, prerequisiteString) {
        if (!prerequisiteString || prerequisiteString === 'None') {
            return true;
        }

        // Simple prerequisite checking - can be enhanced
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData || disciplineData.level < 1) {
            return false;
        }

        return true;
    }

    checkAmalgamRequirements(amalgamString) {
        if (!amalgamString || amalgamString === 'No' || amalgamString === 'None') {
            return true;
        }

        // Simple amalgam checking - can be enhanced
        return true;
    }

    disciplineNameToKey(disciplineName) {
        const normalizedName = disciplineName.toLowerCase().replace(/\s+/g, '');
        
        for (const [key, discipline] of Object.entries(disciplines.types)) {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
            const normalizedDisciplineName = discipline.name.toLowerCase().replace(/\s+/g, '');
            
            if (normalizedKey === normalizedName || normalizedDisciplineName === normalizedName) {
                return key;
            }
        }
        
        return null;
    }

    addPower(disciplineKey, powerName) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) {
            return;
        }

        disciplineData.powers.add(powerName);
        this.updateDisciplineDisplay(disciplineKey);
        
        // Emit power added event
        this.emit('powerAdded', {
            disciplineKey,
            powerName,
            level: disciplineData.level
        });
    }

    removePower(disciplineKey, powerName) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) {
            return;
        }

        disciplineData.powers.delete(powerName);
        this.updateDisciplineDisplay(disciplineKey);
        
        // Emit power removed event
        this.emit('powerRemoved', {
            disciplineKey,
            powerName,
            level: disciplineData.level
        });
    }

    findPowerByName(discipline, powerName) {
        for (const levelKey of Object.keys(discipline.powers)) {
            const levelPowers = discipline.powers[levelKey];
            const power = levelPowers.find(p => p.name === powerName);
            if (power) {
                return power;
            }
        }
        return null;
    }

    getPowerLevel(discipline, powerName) {
        for (const levelKey of Object.keys(discipline.powers)) {
            const levelPowers = discipline.powers[levelKey];
            const power = levelPowers.find(p => p.name === powerName);
            if (power) {
                return parseInt(levelKey.replace('level', ''));
            }
        }
        return null;
    }

    updateDisplay() {
        this.renderDisciplineManager();
        
        // Emit display updated event
        this.emit('displayUpdated', {
            disciplines: this.exportDisciplines()
        });
    }

    getDisciplineName(disciplineKey) {
        const discipline = disciplines.types[disciplineKey];
        return discipline ? discipline.name : disciplineTraitUtils.capitalizeFirst(disciplineKey);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type, 'Discipline Manager');
        } else {
            console.log(`[DisciplineManager] ${type.toUpperCase()}: ${message}`);
        }
    }

    getSelectedDisciplines() {
        return Array.from(this.selectedDisciplines.keys());
    }

    getDisciplineLevel(disciplineKey) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        return disciplineData ? disciplineData.level : 0;
    }

    getDisciplinePowers(disciplineKey) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        return disciplineData ? Array.from(disciplineData.powers) : [];
    }

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
        
        // Emit disciplines loaded event
        this.emit('disciplinesLoaded', {
            disciplines: this.exportDisciplines()
        });
    }

    exportDisciplines() {
        const exported = {};
        this.selectedDisciplines.forEach((data, key) => {
            exported[key] = {
                level: data.level,
                powers: Array.from(data.powers)
            };
        });
        return exported;
    }

    /**
     * Component integration methods
     */
    getData() {
        return {
            disciplines: this.exportDisciplines()
        };
    }

    update(data) {
        if (data.disciplines) {
            this.loadDisciplines(data.disciplines);
        }
    }

    clear() {
        this.selectedDisciplines.clear();
        this.updateDisplay();
        
        // Emit disciplines cleared event
        this.emit('disciplinesCleared');
    }

    setLockState(isLocked) {
        const $container = $('.disciplines-container');
        const $addBtn = $container.find('#addDisciplineBtn');
        const $removeBtns = $container.find('.remove-discipline-btn');
        const $addPowerBtns = $container.find('.add-power-btn');
        const $removePowerBtns = $container.find('.remove-power-btn');
        const $dots = $container.find('.dots');

        if (isLocked) {
            $addBtn.prop('disabled', true);
            $removeBtns.prop('disabled', true);
            $addPowerBtns.prop('disabled', true);
            $removePowerBtns.prop('disabled', true);
            $dots.addClass('locked');
        } else {
            $addBtn.prop('disabled', false);
            $removeBtns.prop('disabled', false);
            $addPowerBtns.prop('disabled', false);
            $removePowerBtns.prop('disabled', false);
            $dots.removeClass('locked');
        }
    }

    /**
     * Ensure required containers exist in the DOM
     */
    static ensureContainer() {
        if ($('.disciplines-container').length === 0) {
            const container = document.createElement('div');
            container.className = 'disciplines-container';
            (document.getElementById('app') || document.body).appendChild(container);
        }
    }

    /**
     * Initialize manager after DOM is ready and containers exist
     */
    static initWhenReady() {
        $(function() {
            DisciplineManager.ensureContainer();
            if (!window.disciplineManager) {
                window.disciplineManager = new DisciplineManager();
            }
            window.disciplineManager.init();
        });
    }
}

// Create and export the discipline manager instance
const disciplineManager = new DisciplineManager();

// Add to window for global access
window.disciplineManager = disciplineManager;