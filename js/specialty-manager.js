// js/specialty-manager.js
// Adds UI for managing Skill Specialties and integrates with dice overlay

(function(){
  // List of official VtM 5th Edition skills (case-insensitive)
  const SKILL_NAMES = [
    'athletics','brawl','craft','drive','firearms','larceny','melee','stealth','survival',
    'animal ken','etiquette','insight','intimidation','leadership','performance','persuasion','streetwise','subterfuge',
    'academics','awareness','finance','investigation','medicine','occult','politics','science','technology'
  ];

  // Wait until DOM ready & Bootstrap loaded
  document.addEventListener('DOMContentLoaded', init);

  /** Locate .stat row by label text (case-insensitive) */
  function findStatRow(label){
    const rows = Array.from(document.querySelectorAll('.stat'));
    return rows.find(r => {
      const lbl = r.querySelector('.stat-label');
      return lbl && lbl.textContent.trim().toLowerCase() === label.toLowerCase();
    }) || null;
  }

  function init(){
    // For each skill row, insert a second line for specialties with a plus button
    document.querySelectorAll('.stat').forEach(statRow => {
      const labelEl = statRow.querySelector('.stat-label');
      if(!labelEl) return;
      const name = labelEl.textContent.trim();
      if(!SKILL_NAMES.includes(name.toLowerCase())) return; // not a skill

      // Skip if already processed
      if(statRow.nextElementSibling && statRow.nextElementSibling.classList.contains('specialties-row')) return;

      // Build specialties row
      const row = document.createElement('div');
      row.className = 'specialties-row d-flex flex-wrap align-items-center ms-3 mt-1';
      row.dataset.skill = name;

      // Add "+" button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn btn-sm btn-outline-light specialty-add-btn me-2';
      btn.style.padding = '0rem';
      btn.style.border = 'none';
      btn.innerHTML = '<i class="bi bi-plus"></i>';
      btn.dataset.skill = name;
      row.appendChild(btn);

      // Insert row after main stat row
      statRow.insertAdjacentElement('afterend', row);
    });

    injectModal();

    // Delegate click to open modal via plus button
    document.body.addEventListener('click', function(evt){
      const btn = evt.target.closest('.specialty-add-btn');
      if(!btn) return;
      const skill = btn.dataset.skill;
      if(!skill) return;
      openModal(skill);
    });

    // Delegate removal clicks inside modal
    document.body.addEventListener('click', function(evt){
      const rmBtn = evt.target.closest('.remove-specialty-btn');
      if(!rmBtn) return;
      const spec = rmBtn.dataset.spec;
      if(currentSkill && spec) removeSpecialty(spec);
    });

    // Initial display refresh for all skills (if data pre-loaded)
    SKILL_NAMES.forEach(n=>updateSpecialtiesRow(capitalise(n)));
  }

  // Helper to capitalise skill names as written in sheet
  function capitalise(str){
    return str.replace(/\b\w/g, c=>c.toUpperCase());
  }

  let currentSkill = null; // skill currently being edited
  let bsModalInstance = null;

  function injectModal(){
    if(document.getElementById('specialtyModal')) return; // already
    const html = `
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
    document.body.insertAdjacentHTML('beforeend', html);

    const modalEl = document.getElementById('specialtyModal');
    bsModalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);

    // Add event handler for Add button
    modalEl.querySelector('#addSpecialtyBtn').addEventListener('click', () => {
      const input = modalEl.querySelector('#newSpecialtyInput');
      const val = input.value.trim();
      if(val) addSpecialty(val);
      input.value = '';
      input.focus();
    });
  }

  function getSpecialties(skill){
    const row = findStatRow(skill);
    if(!row) return [];
    const raw = row.dataset.specialties || '[]';
    try{
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch(err){
      return [];
    }
  }

  function setSpecialties(skill, list){
    const row = findStatRow(skill);
    if(!row) return;
    row.dataset.specialties = JSON.stringify(list);
    updateSpecialtiesRow(skill);
  }

  function updateSpecialtiesRow(skill){
    const container = document.querySelector(`.specialties-row[data-skill="${skill}"]`);
    if(!container) return;

    // Remove existing badge elements
    container.querySelectorAll('.specialty-badge').forEach(el=>el.remove());

    const specs = getSpecialties(skill);
    specs.forEach(spec=>{
      const badge = document.createElement('span');
      badge.className = 'badge bg-secondary text-light specialty-badge me-1 mb-1';
      badge.textContent = spec;
      container.appendChild(badge);
    });
  }

  function refreshModalList(){
    const listEl = document.getElementById('specialtyList');
    listEl.innerHTML = '';
    const specs = getSpecialties(currentSkill);
    specs.forEach(spec => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `<span>${spec}</span><button type="button" class="btn btn-sm btn-outline-danger remove-specialty-btn" data-spec="${spec}">&times;</button>`;
      listEl.appendChild(li);
    });
    updateSpecialtiesRow(currentSkill);
  }

  function openModal(skill){
    currentSkill = skill;
    document.getElementById('specialtyModalLabel').textContent = `${skill} Specialties`;
    refreshModalList();
    bsModalInstance.show();
  }

  function addSpecialty(spec){
    const list = getSpecialties(currentSkill);
    if(!list.includes(spec)){
      list.push(spec);
      setSpecialties(currentSkill, list);
      refreshModalList();
    }
  }

  function removeSpecialty(spec){
    let list = getSpecialties(currentSkill);
    list = list.filter(s => s !== spec);
    setSpecialties(currentSkill, list);
    refreshModalList();
  }

  // Expose for other modules (e.g., backup manager)
  window.specialtyManager = {
    refreshRow: updateSpecialtiesRow
  };
})(); 