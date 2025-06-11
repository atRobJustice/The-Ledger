// Load discipline data from JSON files
function loadDisciplineData() {
    const disciplineFiles = [
        'animalism.json',
        'auspex.json',
        'blood_sorcery.json',
        'celerity.json',
        'dominate.json',
        'fortitude.json',
        'obfuscate.json',
        'oblivion.json',
        'potence.json',
        'presence.json',
        'protean.json'
    ];

    const disciplines = {};
    
    for (const file of disciplineFiles) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `reference/json/disciplines/${file}`, false); // false makes it synchronous
            xhr.send();
            
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const disciplineName = data.discipline.name;
                disciplines[disciplineName] = {
                    powers: Object.values(data.discipline.powers).flat().map(power => power.name)
                };
            } else {
                console.warn(`Failed to load ${file}`);
            }
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
        }
    }
    
    return disciplines;
}

// Create a new Discipline element
function createDisciplineElement(disciplineName) {
    const disciplineDiv = document.createElement('div');
    disciplineDiv.className = 'discipline';
    disciplineDiv.innerHTML = `
        <div class="discipline-header">
            <span class="discipline-name">${disciplineName}</span>
            <div class="discipline-controls">
                <button class="add-power-button">Add Power</button>
                <button class="remove-discipline-button">Remove</button>
            </div>
        </div>
        <div class="powers-list"></div>
    `;

    // Add event listeners
    disciplineDiv.querySelector('.add-power-button').addEventListener('click', () => {
        addPower(disciplineDiv, disciplineName);
    });

    disciplineDiv.querySelector('.remove-discipline-button').addEventListener('click', () => {
        disciplineDiv.remove();
    });

    return disciplineDiv;
}

// Add a new Power to a Discipline
function addPower(disciplineElement, disciplineName) {
    const powersList = disciplineElement.querySelector('.powers-list');
    const availablePowers = window.disciplines[disciplineName].powers;
    
    // Create power selection dropdown
    const powerSelect = document.createElement('select');
    powerSelect.className = 'power-select';
    
    // Add empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Select a Power';
    powerSelect.appendChild(emptyOption);
    
    // Add available powers
    availablePowers.forEach(power => {
        const option = document.createElement('option');
        option.value = power;
        option.textContent = power;
        powerSelect.appendChild(option);
    });

    // Create power element
    const powerDiv = document.createElement('div');
    powerDiv.className = 'power';
    powerDiv.appendChild(powerSelect);

    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-power-button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        powerDiv.remove();
    });
    powerDiv.appendChild(removeButton);

    powersList.appendChild(powerDiv);
}

// Initialize the Discipline management system
document.addEventListener('DOMContentLoaded', () => {
    // Load discipline data
    window.disciplines = loadDisciplineData();
    
    const addDisciplineButton = document.getElementById('add-discipline');
    const disciplinesList = document.getElementById('disciplines-list');

    addDisciplineButton.addEventListener('click', () => {
        // Create discipline selection dropdown
        const select = document.createElement('select');
        select.className = 'discipline-select';
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Select a Discipline';
        select.appendChild(emptyOption);
        
        // Add available disciplines
        Object.keys(window.disciplines).forEach(discipline => {
            const option = document.createElement('option');
            option.value = discipline;
            option.textContent = discipline;
            select.appendChild(option);
        });

        // Create modal for discipline selection
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Select a Discipline</h3>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="cancel-button">Cancel</button>
                    <button class="confirm-button">Add</button>
                </div>
            </div>
        `;

        modal.querySelector('.modal-body').appendChild(select);
        document.body.appendChild(modal);

        // Handle modal buttons
        modal.querySelector('.cancel-button').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.confirm-button').addEventListener('click', () => {
            const selectedDiscipline = select.value;
            if (selectedDiscipline) {
                const disciplineElement = createDisciplineElement(selectedDiscipline);
                disciplinesList.appendChild(disciplineElement);
                modal.remove();
            }
        });
    });
}); 