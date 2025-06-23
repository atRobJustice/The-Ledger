/**
 * SkillsPanel - Character skills panel component
 * Extends BaseComponent and manages character skills with dot-based system and specialties
 */
class SkillsPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.skills = {
            physical: {
                athletics: { value: 0, specialties: [] },
                brawl: { value: 0, specialties: [] },
                craft: { value: 0, specialties: [] },
                drive: { value: 0, specialties: [] },
                firearms: { value: 0, specialties: [] },
                larceny: { value: 0, specialties: [] },
                melee: { value: 0, specialties: [] },
                stealth: { value: 0, specialties: [] },
                survival: { value: 0, specialties: [] }
            },
            social: {
                animalKen: { value: 0, specialties: [] },
                etiquette: { value: 0, specialties: [] },
                insight: { value: 0, specialties: [] },
                intimidation: { value: 0, specialties: [] },
                leadership: { value: 0, specialties: [] },
                performance: { value: 0, specialties: [] },
                persuasion: { value: 0, specialties: [] },
                streetwise: { value: 0, specialties: [] },
                subterfuge: { value: 0, specialties: [] }
            },
            mental: {
                academics: { value: 0, specialties: [] },
                awareness: { value: 0, specialties: [] },
                finance: { value: 0, specialties: [] },
                investigation: { value: 0, specialties: [] },
                medicine: { value: 0, specialties: [] },
                occult: { value: 0, specialties: [] },
                politics: { value: 0, specialties: [] },
                science: { value: 0, specialties: [] },
                technology: { value: 0, specialties: [] }
            }
        };
        this.skillElements = new Map();
        this.specialtyElements = new Map();
        this.maxDots = 5;
        
        // Bind methods
        this.handleDotClick = this.handleDotClick.bind(this);
        this.handleSpecialtyAdd = this.handleSpecialtyAdd.bind(this);
        this.handleSpecialtyRemove = this.handleSpecialtyRemove.bind(this);
        this.createDots = this.createDots.bind(this);
        this.createSpecialtyRow = this.createSpecialtyRow.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        // Load skill reference data
        await this.loadSkillData();
    }

    /**
     * Render the skills panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="skills-panel">
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="mb-3">Skills</h3>
                    </div>
                    
                    <!-- Physical Skills -->
                    <div class="col-md-4 d-flex flex-column">
                        <h5 class="mb-2">Physical</h5>
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-skill="athletics" data-category="physical">
                                <span class="stat-label">Athletics</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="brawl" data-category="physical">
                                <span class="stat-label">Brawl</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="craft" data-category="physical">
                                <span class="stat-label">Craft</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="drive" data-category="physical">
                                <span class="stat-label">Drive</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="firearms" data-category="physical">
                                <span class="stat-label">Firearms</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="larceny" data-category="physical">
                                <span class="stat-label">Larceny</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="melee" data-category="physical">
                                <span class="stat-label">Melee</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="stealth" data-category="physical">
                                <span class="stat-label">Stealth</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="survival" data-category="physical">
                                <span class="stat-label">Survival</span>
                                <span class="skill-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Skills -->
                    <div class="col-md-4 d-flex flex-column">
                        <h5 class="mb-2">Social</h5>
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-skill="animalKen" data-category="social">
                                <span class="stat-label">Animal Ken</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="etiquette" data-category="social">
                                <span class="stat-label">Etiquette</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="insight" data-category="social">
                                <span class="stat-label">Insight</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="intimidation" data-category="social">
                                <span class="stat-label">Intimidation</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="leadership" data-category="social">
                                <span class="stat-label">Leadership</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="performance" data-category="social">
                                <span class="stat-label">Performance</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="persuasion" data-category="social">
                                <span class="stat-label">Persuasion</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="streetwise" data-category="social">
                                <span class="stat-label">Streetwise</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="subterfuge" data-category="social">
                                <span class="stat-label">Subterfuge</span>
                                <span class="skill-value"></span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mental Skills -->
                    <div class="col-md-4 d-flex flex-column">
                        <h5 class="mb-2">Mental</h5>
                        <div class="ledger p-3 my-3">
                            <div class="d-flex justify-content-between stat" data-skill="academics" data-category="mental">
                                <span class="stat-label">Academics</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="awareness" data-category="mental">
                                <span class="stat-label">Awareness</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="finance" data-category="mental">
                                <span class="stat-label">Finance</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="investigation" data-category="mental">
                                <span class="stat-label">Investigation</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="medicine" data-category="mental">
                                <span class="stat-label">Medicine</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="occult" data-category="mental">
                                <span class="stat-label">Occult</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="politics" data-category="mental">
                                <span class="stat-label">Politics</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="science" data-category="mental">
                                <span class="stat-label">Science</span>
                                <span class="skill-value"></span>
                            </div>
                            <div class="d-flex justify-content-between stat" data-skill="technology" data-category="mental">
                                <span class="stat-label">Technology</span>
                                <span class="skill-value"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup
     */
    async afterRender() {
        // Initialize skill elements
        this.initializeSkills();
        
        // Create specialty rows
        this.createSpecialtyRows();
        
        // Bind event listeners
        this.bindEventListeners();
        
        // Initialize specialty modal
        this.initializeSpecialtyModal();
    }

    /**
     * Load skill reference data
     */
    async loadSkillData() {
        try {
            const module = await import('../../references/skills.js');
            this.skillData = module.skills;
        } catch (error) {
            console.error('Failed to load skill data:', error);
            this.skillData = {};
        }
    }

    /**
     * Initialize skill elements and create dot containers
     */
    initializeSkills() {
        const skillElements = this.element.querySelectorAll('[data-skill]');
        
        skillElements.forEach(skillElement => {
            const skillName = skillElement.getAttribute('data-skill');
            const category = skillElement.getAttribute('data-category');
            const valueSpan = skillElement.querySelector('.skill-value');
            
            if (!valueSpan) return;
            
            // Get current value from skills object
            const currentValue = this.skills[category][skillName]?.value || 0;
            
            // Create dots container
            const dotsContainer = this.createDots(currentValue, this.maxDots);
            
            // Replace the span with the dots container
            valueSpan.replaceWith(dotsContainer);
            
            // Store reference to the dots container
            this.skillElements.set(skillName, {
                element: dotsContainer,
                category: category,
                statElement: skillElement
            });
        });
    }

    /**
     * Create dots container for a skill
     * @param {number} value - Current skill value
     * @param {number} maxDots - Maximum number of dots
     * @returns {HTMLElement} Dots container element
     */
    createDots(value, maxDots = 5) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'dots lockable-dot';
        dotsContainer.setAttribute('data-value', value);
        
        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('div');
            dot.className = `dot${i < value ? ' filled' : ''}`;
            dot.setAttribute('data-value', i + 1);
            
            // Add click handler
            dot.addEventListener('click', (e) => {
                this.handleDotClick(e, dotsContainer);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        return dotsContainer;
    }

    /**
     * Create specialty rows for all skills
     */
    createSpecialtyRows() {
        this.skillElements.forEach((skillData, skillName) => {
            const { statElement } = skillData;
            
            // Skip if already processed
            if (statElement.nextElementSibling && statElement.nextElementSibling.classList.contains('specialties-row')) return;
            
            // Create specialty row
            const specialtyRow = this.createSpecialtyRow(skillName);
            
            // Insert after the stat element
            statElement.insertAdjacentElement('afterend', specialtyRow);
            
            // Store reference
            this.specialtyElements.set(skillName, specialtyRow);
        });
    }

    /**
     * Create specialty row for a skill
     * @param {string} skillName - Skill name
     * @returns {HTMLElement} Specialty row element
     */
    createSpecialtyRow(skillName) {
        const row = document.createElement('div');
        row.className = 'specialties-row d-flex flex-wrap align-items-center ms-3 mt-1';
        row.dataset.skill = skillName;
        
        // Add "+" button
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-sm btn-outline-light specialty-add-btn me-2';
        btn.style.padding = '0rem';
        btn.style.border = 'none';
        btn.innerHTML = '<i class="bi bi-plus"></i>';
        btn.dataset.skill = skillName;
        row.appendChild(btn);
        
        return row;
    }

    /**
     * Initialize specialty modal
     */
    initializeSpecialtyModal() {
        if (document.getElementById('specialtyModal')) return; // already exists
        
        const modalHtml = `
            <div class="modal fade" id="specialtyModal" tabindex="-1" aria-labelledby="specialtyModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="specialtyModalLabel">Specialties</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group mb-3" id="specialtyList"></ul>
                            <div class="input-group">
                                <input type="text" class="form-control" id="newSpecialtyInput" placeholder="New specialty">
                                <button class="btn btn-primary" type="button" id="addSpecialtyBtn">Add</button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        const modalEl = document.getElementById('specialtyModal');
        this.bsModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
        
        // Add event handler for Add button
        modalEl.querySelector('#addSpecialtyBtn').addEventListener('click', () => {
            const input = modalEl.querySelector('#newSpecialtyInput');
            const val = input.value.trim();
            if (val) this.addSpecialty(val);
            input.value = '';
            input.focus();
        });
    }

    /**
     * Handle dot click events
     * @param {Event} event - Click event
     * @param {HTMLElement} dotsContainer - Dots container element
     */
    handleDotClick(event, dotsContainer) {
        // Check if character sheet is locked
        if (window.LockManager && window.LockManager.isLocked && window.LockManager.isLocked()) {
            return; // Skills are lockable
        }
        
        const clickedDot = event.target;
        const currentValue = parseInt(dotsContainer.getAttribute('data-value') || '0');
        const clickedValue = parseInt(clickedDot.getAttribute('data-value'));
        
        let newValue;
        
        // If clicking the last filled dot, decrease by 1
        if (clickedValue === currentValue) {
            newValue = clickedValue - 1;
        }
        // If clicking an empty dot, fill up to that value
        else if (clickedValue > currentValue) {
            newValue = clickedValue;
        }
        // If clicking a filled dot, set to that value
        else {
            newValue = clickedValue;
        }
        
        // Update dots display
        this.updateDotsDisplay(dotsContainer, newValue);
        
        // Update data attribute
        dotsContainer.setAttribute('data-value', newValue);
        
        // Find the skill name from the parent stat element
        const statElement = dotsContainer.closest('[data-skill]');
        if (statElement) {
            const skillName = statElement.getAttribute('data-skill');
            const category = statElement.getAttribute('data-category');
            
            // Update internal data
            if (!this.skills[category][skillName]) {
                this.skills[category][skillName] = { value: 0, specialties: [] };
            }
            this.skills[category][skillName].value = newValue;
            
            // Emit change event
            this.emit('skillChanged', {
                skill: skillName,
                category: category,
                value: newValue,
                previousValue: currentValue
            });
            
            // Auto-save if character manager is available
            this.autoSave();
        }
    }

    /**
     * Update dots display
     * @param {HTMLElement} dotsContainer - Dots container element
     * @param {number} value - New value
     */
    updateDotsDisplay(dotsContainer, value) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('filled', index < value);
        });
    }

    /**
     * Handle specialty add button click
     * @param {Event} event - Click event
     */
    handleSpecialtyAdd(event) {
        const btn = event.target.closest('.specialty-add-btn');
        if (!btn) return;
        
        const skillName = btn.dataset.skill;
        if (!skillName) return;
        
        this.openSpecialtyModal(skillName);
    }

    /**
     * Handle specialty remove button click
     * @param {Event} event - Click event
     */
    handleSpecialtyRemove(event) {
        const rmBtn = event.target.closest('.remove-specialty-btn');
        if (!rmBtn) return;
        
        const spec = rmBtn.dataset.spec;
        if (this.currentSkill && spec) {
            this.removeSpecialty(spec);
        }
    }

    /**
     * Open specialty modal
     * @param {string} skillName - Skill name
     */
    openSpecialtyModal(skillName) {
        this.currentSkill = skillName;
        document.getElementById('specialtyModalLabel').textContent = `${this.capitalizeFirst(skillName)} Specialties`;
        this.refreshModalList();
        this.bsModalInstance.show();
    }

    /**
     * Refresh modal specialty list
     */
    refreshModalList() {
        const listEl = document.getElementById('specialtyList');
        listEl.innerHTML = '';
        
        const specs = this.getSpecialties(this.currentSkill);
        specs.forEach(spec => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `<span>${spec}</span><button type="button" class="btn btn-sm btn-outline-danger remove-specialty-btn" data-spec="${spec}">&times;</button>`;
            listEl.appendChild(li);
        });
        
        this.updateSpecialtiesRow(this.currentSkill);
    }

    /**
     * Get specialties for a skill
     * @param {string} skillName - Skill name
     * @returns {Array} Array of specialties
     */
    getSpecialties(skillName) {
        const skillData = this.skillElements.get(skillName);
        if (!skillData) return [];
        
        const { category } = skillData;
        return this.skills[category][skillName]?.specialties || [];
    }

    /**
     * Set specialties for a skill
     * @param {string} skillName - Skill name
     * @param {Array} specialties - Array of specialties
     */
    setSpecialties(skillName, specialties) {
        const skillData = this.skillElements.get(skillName);
        if (!skillData) return;
        
        const { category } = skillData;
        if (!this.skills[category][skillName]) {
            this.skills[category][skillName] = { value: 0, specialties: [] };
        }
        
        this.skills[category][skillName].specialties = [...specialties];
        this.updateSpecialtiesRow(skillName);
    }

    /**
     * Update specialties row display
     * @param {string} skillName - Skill name
     */
    updateSpecialtiesRow(skillName) {
        const container = this.specialtyElements.get(skillName);
        if (!container) return;
        
        // Remove existing badge elements
        container.querySelectorAll('.specialty-badge').forEach(el => el.remove());
        
        const specs = this.getSpecialties(skillName);
        specs.forEach(spec => {
            const badge = document.createElement('span');
            badge.className = 'badge bg-secondary text-light specialty-badge me-1 mb-1';
            badge.textContent = spec;
            container.appendChild(badge);
        });
    }

    /**
     * Add specialty to current skill
     * @param {string} specialty - Specialty name
     */
    addSpecialty(specialty) {
        if (!this.currentSkill) return;
        
        const list = this.getSpecialties(this.currentSkill);
        if (!list.includes(specialty)) {
            list.push(specialty);
            this.setSpecialties(this.currentSkill, list);
            this.refreshModalList();
            
            // Emit specialty change event
            this.emit('specialtyChanged', {
                skill: this.currentSkill,
                action: 'add',
                specialty: specialty
            });
        }
    }

    /**
     * Remove specialty from current skill
     * @param {string} specialty - Specialty name
     */
    removeSpecialty(specialty) {
        if (!this.currentSkill) return;
        
        let list = this.getSpecialties(this.currentSkill);
        list = list.filter(s => s !== specialty);
        this.setSpecialties(this.currentSkill, list);
        this.refreshModalList();
        
        // Emit specialty change event
        this.emit('specialtyChanged', {
            skill: this.currentSkill,
            action: 'remove',
            specialty: specialty
        });
    }

    /**
     * Bind event listeners
     */
    bindEventListeners() {
        // Listen for lock state changes
        document.addEventListener('ledger-lock-change', (e) => {
            this.setLocked(e.detail.locked);
        });
        
        // Delegate specialty add button clicks
        this.element.addEventListener('click', this.handleSpecialtyAdd);
        
        // Delegate specialty remove button clicks
        document.body.addEventListener('click', this.handleSpecialtyRemove);
    }

    /**
     * Set locked state for all skills
     * @param {boolean} locked - Whether skills should be locked
     */
    setLocked(locked) {
        this.skillElements.forEach(({ element }) => {
            element.classList.toggle('locked', locked);
            
            // Disable/enable click events on dots
            const dots = element.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.style.pointerEvents = locked ? 'none' : 'auto';
            });
        });
        
        // Disable/enable specialty buttons
        this.specialtyElements.forEach(element => {
            const btn = element.querySelector('.specialty-add-btn');
            if (btn) {
                btn.disabled = locked;
                btn.style.pointerEvents = locked ? 'none' : 'auto';
            }
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
        if (data.skills) {
            // Update internal skills object
            Object.keys(data.skills).forEach(category => {
                if (this.skills[category]) {
                    Object.keys(data.skills[category]).forEach(skill => {
                        if (this.skills[category][skill] !== undefined) {
                            this.skills[category][skill] = data.skills[category][skill];
                        }
                    });
                }
            });
            
            // Update UI
            this.updateSkillDisplay();
        }
    }

    /**
     * Update skill display in UI
     */
    updateSkillDisplay() {
        this.skillElements.forEach(({ element, category }, skillName) => {
            const skillData = this.skills[category][skillName];
            if (skillData) {
                const value = skillData.value || 0;
                element.setAttribute('data-value', value);
                this.updateDotsDisplay(element, value);
            }
        });
        
        // Update specialty displays
        this.skillElements.forEach(({ category }, skillName) => {
            this.updateSpecialtiesRow(skillName);
        });
    }

    /**
     * Get current skill data
     * @returns {Object} Skill data
     */
    getData() {
        return {
            skills: { ...this.skills }
        };
    }

    /**
     * Validate skill data
     * @returns {Object} Validation result
     */
    validate() {
        const errors = [];
        const warnings = [];
        
        // Check that all skills have values
        Object.keys(this.skills).forEach(category => {
            Object.keys(this.skills[category]).forEach(skill => {
                const skillData = this.skills[category][skill];
                if (!skillData) {
                    errors.push(`${this.capitalizeFirst(skill)} is missing data`);
                } else if (skillData.value === undefined || skillData.value === null) {
                    errors.push(`${this.capitalizeFirst(skill)} is missing a value`);
                } else if (skillData.value < 0 || skillData.value > this.maxDots) {
                    errors.push(`${this.capitalizeFirst(skill)} must be between 0 and ${this.maxDots}`);
                }
            });
        });
        
        // Check skill distribution (V5 rules)
        const allValues = [];
        Object.values(this.skills).forEach(category => {
            Object.values(category).forEach(skillData => {
                if (skillData && skillData.value !== undefined) {
                    allValues.push(skillData.value);
                }
            });
        });
        
        const totalDots = allValues.reduce((sum, value) => sum + value, 0);
        
        // V5 skill distribution options
        if (totalDots < 11) {
            warnings.push('Should have at least 11 skill dots total');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * Set skill value programmatically
     * @param {string} category - Skill category (physical, social, mental)
     * @param {string} skill - Skill name
     * @param {number} value - New value
     */
    setSkill(category, skill, value) {
        if (this.skills[category] && this.skills[category][skill] !== undefined) {
            if (!this.skills[category][skill]) {
                this.skills[category][skill] = { value: 0, specialties: [] };
            }
            
            const previousValue = this.skills[category][skill].value;
            this.skills[category][skill].value = Math.max(0, Math.min(this.maxDots, value));
            
            // Update UI
            const skillData = this.skillElements.get(skill);
            if (skillData) {
                const { element } = skillData;
                element.setAttribute('data-value', this.skills[category][skill].value);
                this.updateDotsDisplay(element, this.skills[category][skill].value);
            }
            
            // Emit change event
            this.emit('skillChanged', {
                skill: skill,
                category: category,
                value: this.skills[category][skill].value,
                previousValue: previousValue
            });
        }
    }

    /**
     * Get skill value
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @returns {number} Skill value
     */
    getSkill(category, skill) {
        return this.skills[category]?.[skill]?.value || 0;
    }

    /**
     * Get skill specialties
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @returns {Array} Array of specialties
     */
    getSkillSpecialties(category, skill) {
        return this.skills[category]?.[skill]?.specialties || [];
    }

    /**
     * Add specialty to skill
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @param {string} specialty - Specialty name
     */
    addSkillSpecialty(category, skill, specialty) {
        if (this.skills[category] && this.skills[category][skill]) {
            if (!this.skills[category][skill].specialties) {
                this.skills[category][skill].specialties = [];
            }
            
            if (!this.skills[category][skill].specialties.includes(specialty)) {
                this.skills[category][skill].specialties.push(specialty);
                this.updateSpecialtiesRow(skill);
                
                // Emit specialty change event
                this.emit('specialtyChanged', {
                    skill: skill,
                    category: category,
                    action: 'add',
                    specialty: specialty
                });
            }
        }
    }

    /**
     * Remove specialty from skill
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @param {string} specialty - Specialty name
     */
    removeSkillSpecialty(category, skill, specialty) {
        if (this.skills[category] && this.skills[category][skill] && this.skills[category][skill].specialties) {
            this.skills[category][skill].specialties = this.skills[category][skill].specialties.filter(s => s !== specialty);
            this.updateSpecialtiesRow(skill);
            
            // Emit specialty change event
            this.emit('specialtyChanged', {
                skill: skill,
                category: category,
                action: 'remove',
                specialty: specialty
            });
        }
    }

    /**
     * Get all skills for a category
     * @param {string} category - Skill category
     * @returns {Object} Skills object
     */
    getCategorySkills(category) {
        return { ...this.skills[category] };
    }

    /**
     * Reset all skills to default values
     */
    reset() {
        Object.keys(this.skills).forEach(category => {
            Object.keys(this.skills[category]).forEach(skill => {
                this.skills[category][skill] = { value: 0, specialties: [] };
            });
        });
        
        this.updateSkillDisplay();
    }

    /**
     * Capitalize first letter of string
     * @param {string} str - Input string
     * @returns {string} Capitalized string
     */
    capitalizeFirst(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Get skill description from reference data
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @returns {string} Skill description
     */
    getSkillDescription(category, skill) {
        if (this.skillData && 
            this.skillData[category] && 
            this.skillData[category][skill]) {
            return this.skillData[category][skill].description;
        }
        return '';
    }

    /**
     * Get dot value description
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @param {number} value - Dot value
     * @returns {string} Dot value description
     */
    getDotValueDescription(category, skill, value) {
        if (this.skillData && 
            this.skillData[category] && 
            this.skillData[category][skill] &&
            this.skillData[category][skill].dotValues &&
            this.skillData[category][skill].dotValues[value]) {
            return this.skillData[category][skill].dotValues[value];
        }
        return '';
    }

    /**
     * Get available specialties for a skill
     * @param {string} category - Skill category
     * @param {string} skill - Skill name
     * @returns {Array} Array of available specialties
     */
    getAvailableSpecialties(category, skill) {
        if (this.skillData && 
            this.skillData[category] && 
            this.skillData[category][skill] &&
            this.skillData[category][skill].specialties) {
            return [...this.skillData[category][skill].specialties];
        }
        return [];
    }
}

// Attach to global scope for dynamic loading
window.SkillsPanel = SkillsPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsPanel;
} 