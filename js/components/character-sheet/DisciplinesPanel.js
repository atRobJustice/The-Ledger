/**
 * DisciplinesPanel - Character disciplines panel component
 * Extends BaseComponent and integrates with discipline-manager.js for comprehensive discipline management
 */
class DisciplinesPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.selectedDisciplines = new Map(); // disciplineKey -> { level: number, powers: Set<string> }
        this.availableDisciplines = [];
        this.disciplinesData = null;
        this.clanDisciplineBonuses = new Set();
        
        // Bind methods
        this.handleDisciplineSelect = this.handleDisciplineSelect.bind(this);
        this.handleAddDiscipline = this.handleAddDiscipline.bind(this);
        this.handleRemoveDiscipline = this.handleRemoveDiscipline.bind(this);
        this.handleDotClick = this.handleDotClick.bind(this);
        this.handleAddPower = this.handleAddPower.bind(this);
        this.handleRemovePower = this.handleRemovePower.bind(this);
        this.showPowerSelectionModal = this.showPowerSelectionModal.bind(this);
        this.renderDisciplinePowers = this.renderDisciplinePowers.bind(this);
        this.renderSelectedPower = this.renderSelectedPower.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Load discipline data
        await this.loadDisciplineData();
        
        // Initialize available disciplines
        this.availableDisciplines = Object.keys(this.disciplinesData.types);
        
        // Ensure all discipline data exposes a common `powers` container
        Object.values(this.disciplinesData.types).forEach((d) => {
            if (!d.powers) {
                if (d.rituals) {
                    d.powers = d.rituals;
                } else if (d.ceremonies) {
                    d.powers = d.ceremonies;
                }
            }
        });

        // Wait for discipline manager to be available and set up component mode
        await this._waitForDisciplineManager();
    }

    /**
     * Wait for discipline manager to be available
     */
    async _waitForDisciplineManager() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (!window.disciplineManager && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }

        if (!window.disciplineManager) {
            throw new Error('Discipline Manager not available');
        }

        // Set up component mode for discipline manager
        if (typeof window.disciplineManager.setComponentMode === 'function') {
            window.disciplineManager.setComponentMode(this);
        }
    }

    /**
     * Render the disciplines panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="disciplines-panel">
                <h5 class="mb-2">Disciplines</h5>
                <div class="ledger p-3 my-3">
                    <div class="disciplines-container">
                        <!-- Discipline manager will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup
     */
    async afterRender() {
        // Initialize discipline manager
        this.renderDisciplineManager();
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Initialize tooltips
        this.initTooltips();
    }

    /**
     * Load discipline reference data
     */
    async loadDisciplineData() {
        try {
            // Wait for disciplines data to be available
            let attempts = 0;
            const maxAttempts = 50;
            
            while (!window.disciplines && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (window.disciplines) {
                this.disciplinesData = window.disciplines;
            } else {
                console.error('Disciplines data not available');
                this.disciplinesData = { types: {} };
            }
        } catch (error) {
            console.error('Failed to load discipline data:', error);
            this.disciplinesData = { types: {} };
        }
    }

    /**
     * Render the discipline manager interface
     */
    renderDisciplineManager() {
        const disciplineContainer = this.element.querySelector('.disciplines-container');
        if (!disciplineContainer) {
            console.error('Disciplines container not found');
            return;
        }

        disciplineContainer.innerHTML = '';

        // Add discipline selector
        this.renderDisciplineSelector(disciplineContainer);
        
        // Add selected disciplines list
        this.renderSelectedDisciplines(disciplineContainer);
    }

    /**
     * Render discipline selector dropdown
     * @param {HTMLElement} container - Container element
     */
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
        container.insertAdjacentHTML('beforeend', selectorHtml);
    }

    /**
     * Render selected disciplines list
     * @param {HTMLElement} container - Container element
     */
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
        container.insertAdjacentHTML('beforeend', selectedHtml);
    }

    /**
     * Get available discipline options for dropdown
     * @returns {string} HTML options string
     */
    getAvailableDisciplineOptions() {
        return this.availableDisciplines
            .filter(disciplineKey => !this.selectedDisciplines.has(disciplineKey))
            .map(disciplineKey => {
                const discipline = this.disciplinesData.types[disciplineKey];
                const displayName = discipline.name || this.capitalizeFirst(disciplineKey);
                const isClanBonus = this.clanDisciplineBonuses.has(disciplineKey);
                const bonusIndicator = isClanBonus ? ' (Clan)' : '';
                return `<option value="${disciplineKey}">${displayName}${bonusIndicator}</option>`;
            })
            .join('');
    }

    /**
     * Get HTML for selected disciplines
     * @returns {string} HTML string
     */
    getSelectedDisciplinesHtml() {
        return Array.from(this.selectedDisciplines.entries())
            .map(([disciplineKey, disciplineData]) => {
                const discipline = this.disciplinesData.types[disciplineKey];
                const displayName = discipline.name || this.capitalizeFirst(disciplineKey);
                const isClanBonus = this.clanDisciplineBonuses.has(disciplineKey);
                const clanIndicator = isClanBonus ? ' <span class="badge bg-primary">Clan</span>' : '';
                
                return `
                    <div class="discipline-item mb-3" data-discipline="${disciplineKey}">
                        <div class="discipline-header d-flex justify-content-between align-items-center stat">
                            <div class="discipline-info">
                                <span class="stat-label">${displayName}${clanIndicator}</span>
                            </div>
                            <div class="discipline-controls d-flex align-items-center gap-2">
                                <div class="dots" data-value="${disciplineData.level}" data-discipline="${disciplineKey}">
                                    ${this.createDots(disciplineData.level)}
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

    /**
     * Render discipline powers section
     * @param {string} disciplineKey - Discipline key
     * @param {Object} disciplineData - Discipline data
     * @returns {string} HTML string
     */
    renderDisciplinePowers(disciplineKey, disciplineData) {
        const discipline = this.disciplinesData.types[disciplineKey];
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

    /**
     * Render selected power display
     * @param {string} disciplineKey - Discipline key
     * @param {string} powerName - Power name
     * @returns {string} HTML string
     */
    renderSelectedPower(disciplineKey, powerName) {
        const discipline = this.disciplinesData.types[disciplineKey];
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

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // Use event delegation for dynamic elements
        if (this.element) {
            // Discipline selector change
            this.element.addEventListener('change', (e) => {
                if (e.target.matches('#disciplineSelect')) {
                    this.handleDisciplineSelect(e);
                }
            });

            // Add discipline button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('#addDisciplineBtn')) {
                    e.preventDefault();
                    this.handleAddDiscipline();
                }
            });

            // Remove discipline button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('.remove-discipline-btn')) {
                    e.preventDefault();
                    const disciplineKey = e.target.closest('.remove-discipline-btn').getAttribute('data-discipline');
                    this.handleRemoveDiscipline(disciplineKey);
                }
            });

            // Dot clicks for discipline levels
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('.dots .dot')) {
                    this.handleDotClick(e);
                }
            });

            // Add power button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('.add-power-btn')) {
                    e.preventDefault();
                    const disciplineKey = e.target.closest('.add-power-btn').getAttribute('data-discipline');
                    const level = parseInt(e.target.closest('.add-power-btn').getAttribute('data-level'));
                    this.handleAddPower(disciplineKey, level);
                }
            });

            // Remove power button
            this.element.addEventListener('click', (e) => {
                if (e.target.matches('.remove-power-btn')) {
                    e.preventDefault();
                    const disciplineKey = e.target.closest('.remove-power-btn').getAttribute('data-discipline');
                    const powerName = e.target.closest('.remove-power-btn').getAttribute('data-power');
                    this.handleRemovePower(disciplineKey, powerName);
                }
            });
        }

        // Listen for lock state changes
        document.addEventListener('ledger-lock-change', (e) => {
            this.setLocked(e.detail.locked);
        });
    }

    /**
     * Handle discipline selector change
     * @param {Event} event - Change event
     */
    handleDisciplineSelect(event) {
        const addBtn = this.element.querySelector('#addDisciplineBtn');
        addBtn.disabled = !event.target.value;
    }

    /**
     * Handle adding a discipline
     */
    handleAddDiscipline() {
        const select = this.element.querySelector('#disciplineSelect');
        const disciplineKey = select.value;
        
        if (!disciplineKey) return;
        
        // Check if discipline is already selected
        if (this.selectedDisciplines.has(disciplineKey)) {
            this.showFeedback('Discipline already selected', 'warning');
            return;
        }
        
        // Add discipline with level 0
        this.selectedDisciplines.set(disciplineKey, {
            level: 0,
            powers: new Set()
        });
        
        // Reset selector
        select.value = '';
        this.element.querySelector('#addDisciplineBtn').disabled = true;
        
        // Update display
        this.updateDisplay();
        
        // Emit change event
        this.emit('disciplineAdded', {
            disciplineKey: disciplineKey,
            data: this.getDisciplineData(disciplineKey)
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Handle removing a discipline
     * @param {string} disciplineKey - Discipline key to remove
     */
    handleRemoveDiscipline(disciplineKey) {
        if (!this.selectedDisciplines.has(disciplineKey)) return;
        
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        
        // Check if discipline has powers that would be lost
        if (disciplineData.powers.size > 0) {
            const confirmMessage = `Remove ${this.getDisciplineName(disciplineKey)} and lose all selected powers?`;
            if (!confirm(confirmMessage)) {
                return;
            }
        }
        
        // Remove discipline
        this.selectedDisciplines.delete(disciplineKey);
        
        // Update display
        this.updateDisplay();
        
        // Emit change event
        this.emit('disciplineRemoved', {
            disciplineKey: disciplineKey
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Handle dot click for discipline level
     * @param {Event} event - Click event
     */
    handleDotClick(event) {
        // Check if character sheet is locked
        if (window.LockManager && window.LockManager.isLocked && window.LockManager.isLocked()) {
            return;
        }
        
        const dot = event.target;
        const dotsContainer = dot.closest('.dots');
        const disciplineKey = dotsContainer.getAttribute('data-discipline');
        const currentLevel = parseInt(dotsContainer.getAttribute('data-value') || '0');
        const clickedValue = parseInt(dot.getAttribute('data-value'));
        
        let newLevel;
        
        // If clicking the last filled dot, decrease by 1
        if (clickedValue === currentLevel) {
            newLevel = clickedValue - 1;
        }
        // If clicking an empty dot, fill up to that value
        else if (clickedValue > currentLevel) {
            newLevel = clickedValue;
        }
        // If clicking a filled dot, set to that value
        else {
            newLevel = clickedValue;
        }
        
        // Ensure level is within bounds
        newLevel = Math.max(0, Math.min(5, newLevel));
        
        // Update discipline level
        this.changeDisciplineLevel(disciplineKey, currentLevel, newLevel);
    }

    /**
     * Change discipline level
     * @param {string} disciplineKey - Discipline key
     * @param {number} oldLevel - Old level
     * @param {number} newLevel - New level
     */
    async changeDisciplineLevel(disciplineKey, oldLevel, newLevel) {
        if (!this.selectedDisciplines.has(disciplineKey)) return;
        
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        
        // Check if reducing level would remove powers
        if (newLevel < oldLevel) {
            const powersToRemove = this.getPowersAboveLevel(disciplineKey, newLevel);
            if (powersToRemove.length > 0) {
                const confirmResult = await this.confirmPowerRemoval(disciplineKey, powersToRemove, oldLevel, newLevel);
                if (!confirmResult) {
                    // Restore original level
                    this.updateDisciplineDisplay(disciplineKey);
                    return;
                }
                
                // Remove powers that are above the new level
                powersToRemove.forEach(powerName => {
                    disciplineData.powers.delete(powerName);
                });
            }
        }
        
        // Update level
        disciplineData.level = newLevel;
        
        // Update display
        this.updateDisciplineDisplay(disciplineKey);
        
        // Emit change event
        this.emit('disciplineLevelChanged', {
            disciplineKey: disciplineKey,
            oldLevel: oldLevel,
            newLevel: newLevel,
            data: this.getDisciplineData(disciplineKey)
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Handle adding a power
     * @param {string} disciplineKey - Discipline key
     * @param {number} level - Power level
     */
    handleAddPower(disciplineKey, level) {
        this.showPowerSelectionModal(disciplineKey, level);
    }

    /**
     * Handle removing a power
     * @param {string} disciplineKey - Discipline key
     * @param {string} powerName - Power name
     */
    handleRemovePower(disciplineKey, powerName) {
        if (!this.selectedDisciplines.has(disciplineKey)) return;
        
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        disciplineData.powers.delete(powerName);
        
        // Update display
        this.updateDisciplineDisplay(disciplineKey);
        
        // Emit change event
        this.emit('powerRemoved', {
            disciplineKey: disciplineKey,
            powerName: powerName,
            data: this.getDisciplineData(disciplineKey)
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Show power selection modal
     * @param {string} disciplineKey - Discipline key
     * @param {number} level - Power level
     */
    showPowerSelectionModal(disciplineKey, level) {
        const availablePowers = this.getAvailablePowersAtLevel(disciplineKey, level);
        
        if (availablePowers.length === 0) {
            this.showFeedback('No powers available at this level', 'warning');
            return;
        }
        
        // Create modal content
        const modalContent = `
            <div class="modal fade" id="powerSelectionModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title">Select Power - Level ${level}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="power-options">
                                ${availablePowers.map(power => `
                                    <div class="power-option p-3 mb-2 border rounded" data-power="${power.name}">
                                        <div class="d-flex justify-content-between align-items-start">
                                            <div class="power-info flex-grow-1">
                                                <h6 class="power-name mb-2">${power.name}</h6>
                                                <div class="power-meta small">
                                                    <div><strong>Effect:</strong> ${power.effect}</div>
                                                    ${power.cost && power.cost !== 'None' && power.cost !== 'N/A' ? `<div><strong>Cost:</strong> ${power.cost}</div>` : ''}
                                                    ${power.duration && power.duration !== 'None' && power.duration !== 'N/A' ? `<div><strong>Duration:</strong> ${power.duration}</div>` : ''}
                                                    ${power.dicePool && power.dicePool !== 'None' && power.dicePool !== 'N/A' ? `<div><strong>Dice Pool:</strong> ${power.dicePool}</div>` : ''}
                                                    ${power.prerequisite && power.prerequisite !== 'None' ? `<div><strong>Prerequisite:</strong> ${power.prerequisite}</div>` : ''}
                                                    ${power.amalgam && power.amalgam !== 'No' && power.amalgam !== 'None' ? `<div><strong>Amalgam:</strong> ${power.amalgam}</div>` : ''}
                                                    ${power.notes && power.notes !== 'None' && power.notes !== 'N/A' ? `<div><em>${power.notes}</em></div>` : ''}
                                                </div>
                                            </div>
                                            <button class="btn btn-success btn-sm select-power-btn" data-power="${power.name}">
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
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalContent);
        
        const modal = document.getElementById('powerSelectionModal');
        const bsModal = new bootstrap.Modal(modal);
        
        // Bind power selection
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('select-power-btn')) {
                const powerName = e.target.getAttribute('data-power');
                this.addPower(disciplineKey, powerName);
                bsModal.hide();
            }
        });
        
        // Clean up modal on hide
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
        
        bsModal.show();
    }

    /**
     * Add power to discipline
     * @param {string} disciplineKey - Discipline key
     * @param {string} powerName - Power name
     */
    addPower(disciplineKey, powerName) {
        if (!this.selectedDisciplines.has(disciplineKey)) return;
        
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        disciplineData.powers.add(powerName);
        
        // Update display
        this.updateDisciplineDisplay(disciplineKey);
        
        // Emit change event
        this.emit('powerAdded', {
            disciplineKey: disciplineKey,
            powerName: powerName,
            data: this.getDisciplineData(disciplineKey)
        });
        
        // Auto-save
        this.autoSave();
    }

    /**
     * Update discipline display
     * @param {string} disciplineKey - Discipline key
     */
    updateDisciplineDisplay(disciplineKey) {
        const disciplineItem = this.element.querySelector(`[data-discipline="${disciplineKey}"]`);
        if (!disciplineItem) return;
        
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return;
        
        // Update dots
        const dotsContainer = disciplineItem.querySelector('.dots');
        if (dotsContainer) {
            dotsContainer.setAttribute('data-value', disciplineData.level);
            dotsContainer.innerHTML = this.createDots(disciplineData.level);
        }
        
        // Update powers section
        const powersSection = disciplineItem.querySelector('.discipline-powers');
        if (powersSection) {
            if (disciplineData.level > 0) {
                powersSection.innerHTML = this.renderDisciplinePowers(disciplineKey, disciplineData);
            } else {
                powersSection.remove();
            }
        } else if (disciplineData.level > 0) {
            // Add powers section if it doesn't exist
            const powersHtml = this.renderDisciplinePowers(disciplineKey, disciplineData);
            disciplineItem.insertAdjacentHTML('beforeend', powersHtml);
        }
    }

    /**
     * Update overall display
     */
    updateDisplay() {
        // Update discipline selector
        const select = this.element.querySelector('#disciplineSelect');
        if (select) {
            select.innerHTML = '<option value="">Select a Discipline</option>' + this.getAvailableDisciplineOptions();
        }
        
        // Update disciplines list
        const disciplinesList = this.element.querySelector('#disciplinesList');
        if (disciplinesList) {
            disciplinesList.innerHTML = this.selectedDisciplines.size === 0 ? 
                '<div class="fst-italic">No disciplines selected</div>' : 
                this.getSelectedDisciplinesHtml();
        }
        
        // Re-initialize tooltips
        this.initTooltips();
    }

    /**
     * Set locked state
     * @param {boolean} locked - Whether disciplines should be locked
     */
    setLocked(locked) {
        const buttons = this.element.querySelectorAll('.btn');
        const dots = this.element.querySelectorAll('.dot');
        const selects = this.element.querySelectorAll('select');
        
        buttons.forEach(btn => {
            btn.style.pointerEvents = locked ? 'none' : 'auto';
            btn.disabled = locked;
        });
        
        dots.forEach(dot => {
            dot.style.pointerEvents = locked ? 'none' : 'auto';
        });
        
        selects.forEach(select => {
            select.disabled = locked;
        });
    }

    /**
     * Auto-save character data
     */
    autoSave() {
        if (window.characterManager && typeof window.characterManager.saveCharacter === 'function') {
            // Debounce auto-save
            clearTimeout(this.autoSaveTimeout);
            this.autoSaveTimeout = setTimeout(() => {
                window.characterManager.saveCharacter();
            }, 1000);
        }
    }

    /**
     * Update component with character data
     * @param {Object} data - Character data
     */
    update(data) {
        if (data.disciplines) {
            // Update selected disciplines
            this.selectedDisciplines.clear();
            Object.entries(data.disciplines).forEach(([key, value]) => {
                this.selectedDisciplines.set(key, {
                    level: value.level || 0,
                    powers: new Set(value.powers || [])
                });
            });
            
            // Update display
            this.updateDisplay();
        }
        
        if (data.clan) {
            // Update clan discipline bonuses
            this.updateClanDisciplineBonuses(data.clan);
        }
    }

    /**
     * Update clan discipline bonuses
     * @param {string} clan - Clan name
     */
    updateClanDisciplineBonuses(clan) {
        this.clanDisciplineBonuses.clear();
        
        // Get clan discipline bonuses from clan data
        if (window.clanData && window.clanData[clan]) {
            const clanInfo = window.clanData[clan];
            if (clanInfo.disciplines) {
                clanInfo.disciplines.forEach(discipline => {
                    this.clanDisciplineBonuses.add(discipline.toLowerCase());
                });
            }
        }
        
        // Update display to show clan indicators
        this.updateDisplay();
    }

    /**
     * Initialize tooltips
     */
    initTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = this.element.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
            new bootstrap.Tooltip(el);
        });
    }

    /**
     * Show feedback message
     * @param {string} message - Message to show
     * @param {string} type - Message type
     */
    showFeedback(message, type = 'info') {
        if (window.toastManager) {
            window.toastManager.show(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    /**
     * Get current discipline data
     * @returns {Object} Discipline data
     */
    getData() {
        const disciplinesData = {};
        this.selectedDisciplines.forEach((data, key) => {
            disciplinesData[key] = {
                level: data.level,
                powers: Array.from(data.powers)
            };
        });
        
        return {
            disciplines: disciplinesData
        };
    }

    /**
     * Get discipline data for a specific discipline
     * @param {string} disciplineKey - Discipline key
     * @returns {Object} Discipline data
     */
    getDisciplineData(disciplineKey) {
        if (!this.selectedDisciplines.has(disciplineKey)) return null;
        
        const data = this.selectedDisciplines.get(disciplineKey);
        return {
            level: data.level,
            powers: Array.from(data.powers)
        };
    }

    /**
     * Get discipline level
     * @param {string} disciplineKey - Discipline key
     * @returns {number} Discipline level
     */
    getDisciplineLevel(disciplineKey) {
        if (!this.selectedDisciplines.has(disciplineKey)) return 0;
        return this.selectedDisciplines.get(disciplineKey).level;
    }

    /**
     * Get discipline powers
     * @param {string} disciplineKey - Discipline key
     * @returns {Array} Array of power names
     */
    getDisciplinePowers(disciplineKey) {
        if (!this.selectedDisciplines.has(disciplineKey)) return [];
        return Array.from(this.selectedDisciplines.get(disciplineKey).powers);
    }

    /**
     * Get all selected disciplines
     * @returns {Map} Map of selected disciplines
     */
    getSelectedDisciplines() {
        return new Map(this.selectedDisciplines);
    }

    /**
     * Load disciplines from data
     * @param {Object} disciplineData - Discipline data
     */
    loadDisciplines(disciplineData) {
        this.selectedDisciplines.clear();
        
        Object.entries(disciplineData).forEach(([key, value]) => {
            this.selectedDisciplines.set(key, {
                level: value.level || 0,
                powers: new Set(value.powers || [])
            });
        });
        
        this.updateDisplay();
    }

    /**
     * Export disciplines data
     * @returns {Object} Exported discipline data
     */
    exportDisciplines() {
        return this.getData();
    }

    // Utility methods
    getAvailablePowersAtLevel(disciplineKey, level) {
        const discipline = this.disciplinesData.types[disciplineKey];
        if (!discipline || !discipline.powers) return [];
        
        const levelKey = `level${level}`;
        const availablePowers = discipline.powers[levelKey] || [];
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        const selectedPowers = disciplineData ? disciplineData.powers : new Set();
        
        return availablePowers.filter(power => {
            // Check if power is already selected
            if (selectedPowers.has(power.name)) return false;
            
            // Check prerequisites
            if (power.prerequisite && power.prerequisite !== 'None') {
                return this.checkPrerequisites(disciplineKey, power.prerequisite);
            }
            
            return true;
        });
    }

    getAvailablePowersUpToLevel(disciplineKey, maxLevel) {
        let allPowers = [];
        for (let level = 1; level <= maxLevel; level++) {
            allPowers = allPowers.concat(this.getAvailablePowersAtLevel(disciplineKey, level));
        }
        return allPowers;
    }

    getPowersAboveLevel(disciplineKey, level) {
        const disciplineData = this.selectedDisciplines.get(disciplineKey);
        if (!disciplineData) return [];
        
        const discipline = this.disciplinesData.types[disciplineKey];
        if (!discipline || !discipline.powers) return [];
        
        const powersToRemove = [];
        
        for (let checkLevel = level + 1; checkLevel <= 5; checkLevel++) {
            const levelKey = `level${checkLevel}`;
            const levelPowers = discipline.powers[levelKey] || [];
            
            levelPowers.forEach(power => {
                if (disciplineData.powers.has(power.name)) {
                    powersToRemove.push(power.name);
                }
            });
        }
        
        return powersToRemove;
    }

    async confirmPowerRemoval(disciplineKey, powersToRemove, oldLevel, newLevel) {
        const disciplineName = this.getDisciplineName(disciplineKey);
        const message = `Reducing ${disciplineName} from level ${oldLevel} to ${newLevel} will remove the following powers:\n\n${powersToRemove.join('\n')}\n\nContinue?`;
        
        return confirm(message);
    }

    checkPrerequisites(disciplineKey, prerequisiteString) {
        // Simple prerequisite checking - can be expanded
        if (!prerequisiteString || prerequisiteString === 'None') return true;
        
        // Check for discipline prerequisites
        const disciplineMatch = prerequisiteString.match(/(\w+)\s+●+/);
        if (disciplineMatch) {
            const requiredDiscipline = disciplineMatch[1].toLowerCase();
            const requiredLevel = disciplineMatch[0].match(/●/g).length;
            
            const currentLevel = this.getDisciplineLevel(requiredDiscipline);
            return currentLevel >= requiredLevel;
        }
        
        return true;
    }

    checkAmalgamRequirements(amalgamString) {
        if (!amalgamString || amalgamString === 'No' || amalgamString === 'None') return true;
        
        // Check for amalgam requirements
        const disciplineMatch = amalgamString.match(/(\w+)\s+●+/);
        if (disciplineMatch) {
            const requiredDiscipline = disciplineMatch[1].toLowerCase();
            const requiredLevel = amalgamString.match(/●/g).length;
            
            const currentLevel = this.getDisciplineLevel(requiredDiscipline);
            return currentLevel >= requiredLevel;
        }
        
        return true;
    }

    findPowerByName(discipline, powerName) {
        if (!discipline || !discipline.powers) return null;
        
        for (let level = 1; level <= 5; level++) {
            const levelKey = `level${level}`;
            const levelPowers = discipline.powers[levelKey] || [];
            
            const power = levelPowers.find(p => p.name === powerName);
            if (power) return power;
        }
        
        return null;
    }

    getPowerLevel(discipline, powerName) {
        if (!discipline || !discipline.powers) return 0;
        
        for (let level = 1; level <= 5; level++) {
            const levelKey = `level${level}`;
            const levelPowers = discipline.powers[levelKey] || [];
            
            const power = levelPowers.find(p => p.name === powerName);
            if (power) return level;
        }
        
        return 0;
    }

    getDisciplineName(disciplineKey) {
        const discipline = this.disciplinesData.types[disciplineKey];
        return discipline ? (discipline.name || this.capitalizeFirst(disciplineKey)) : disciplineKey;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    createDots(value, maxDots = 5) {
        let dotsHtml = '';
        for (let i = 0; i < maxDots; i++) {
            dotsHtml += `<div class="dot${i < value ? ' filled' : ''}" data-value="${i + 1}"></div>`;
        }
        return dotsHtml;
    }
}

// Attach to global scope for dynamic loading
window.DisciplinesPanel = DisciplinesPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DisciplinesPanel;
} 