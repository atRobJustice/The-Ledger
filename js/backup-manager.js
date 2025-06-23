(function(){
    // Wait for DOM and managers to be ready
    document.addEventListener('DOMContentLoaded', () => {
        // Give the page a short moment to finish dynamic rendering
        setTimeout(initBackupUI, 300);
    });

    function initBackupUI(){
        // Find the existing control bar created by dice-overlay.js
        const $bar = $('#ledger-control-bar');

        // If the control bar isn't on the page yet, retry shortly (dice-overlay may load late)
        if ($bar.length === 0) {
            setTimeout(initBackupUI, 200);
            return;
        }

        // If buttons already exist (added by control-bar.js), do nothing
        if(document.getElementById('exportJsonBtn')) return;

        const $exportBtn = $('<button>', {id: 'exportJsonBtn', class: 'btn btn-outline-light', text: 'Export'});
        const $importBtn = $('<button>', {id: 'importJsonBtn', class: 'btn btn-outline-light', text: 'Import'});
        const $fileInput = $('<input>', {id: 'importJsonInput', type: 'file', accept: 'application/json', style: 'display:none'});

        // Add buttons and hidden file input to the control bar
        $bar.append($exportBtn, $importBtn, $fileInput);

        $exportBtn.on('click', () => {
            const data = gatherCharacterData();
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const filename = `${(data.name || 'character').toString().replace(/[^a-z0-9_\-]/gi,'_')}.json`;
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        $importBtn.on('click', () => $fileInput.trigger('click'));

        $fileInput.on('change', evt => {
            const file = evt.target.files[0];
            if(!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                try{
                    const data = JSON.parse(e.target.result);
                    loadCharacterData(data);
                    window.toastManager.show('Character imported successfully','success', 'Backup Manager');
                    autoSave();
                } catch(err){
                    console.error(err);
                    window.toastManager.show('Failed to import character: invalid JSON','danger', 'Backup Manager');
                }
            };
            reader.readAsText(file);
        });
    }

    function gatherCharacterData(){
        const data = {};

        // Gather visible stats
        $('.stat').each(function() {
            const label = $(this).find('.stat-label').text().trim().toLowerCase();
            let value;
            const $input = $(this).find('input, textarea');
            const $select = $(this).find('select');
            const $dots = $(this).find('.dots');
            const $track = $(this).find('.track-container');

            if($input.length){
                value = $input.val();
            } else if($select.length){
                value = $select.val();
                // Special handling for compulsion to ensure it's properly exported
                if(label === 'compulsion') {
                    value = $select.val() || '';
                }
            } else if($dots.length){
                value = parseInt($dots.data('value') || 0, 10);
            } else if($track.length){
                const trackType = $track.data('type');
                const max = $track.find('.track-box').length;

                if(trackType === 'humanity'){
                    const score = $track.find('.track-box.filled').length;
                    const stains = $track.find('.track-box.stained').length;
                    value = {max, current: score, superficial: stains, aggravated: 0, type: trackType};
                } else {
                    const superficial = $track.find('.track-box.superficial').length;
                    const aggravated = $track.find('.track-box.aggravated').length;
                    const current = parseInt($track.data('value') || (max - superficial - aggravated) || 0, 10);
                    value = {max, current, superficial, aggravated, type: trackType};
                }
            } else {
                value = $(this).find('span:last-child').text().trim();
            }

            // Store the primary value
            data[label.replace(/\s+/g,'_')] = value;

            // Additionally store specialties if present on this stat row
            const specialtiesRaw = $(this).attr('data-specialties');
            if(specialtiesRaw){
                try{
                    const arr = JSON.parse(specialtiesRaw);
                    data[`${label.replace(/\s+/g,'_')}_specialties`] = arr;
                }catch(e){/* ignore malformed */}
            }
        });

        // Manager exports (if present)
        if(window.disciplineManager) data.disciplines = window.disciplineManager.exportDisciplines();
        if(window.meritFlawManager){
            const mf = window.meritFlawManager.exportMeritsAndFlaws();
            data.merits = mf.merits;
            data.flaws = mf.flaws;
        }
        if(window.backgroundManager){
            const bg = window.backgroundManager.exportBackgroundsAndFlaws();
            data.backgrounds = bg.backgrounds;
            data.backgroundFlaws = bg.backgroundFlaws;
        }
        if(window.coterieManager){
            const ct = window.coterieManager.exportCoterieMeritsAndFlaws();
            data.coterieMerits = ct.coterieMerits;
            data.coterieFlaws = ct.coterieFlaws;
        }
        if(window.loresheetManager) data.loresheets = window.loresheetManager.exportLoresheets();
        if(window.convictionManager) data.convictions = window.convictionManager.saveConvictions();

        // --- XP Export ---
        if(window.getXPData) data.xp = window.getXPData();
        // --- End XP Export ---

        // Persist Discord webhook (now using IndexedDB)
        if(window.databaseManager) {
            // This will be handled by the database manager
            // We don't need to include it in character data anymore
        }

        // Persist locked state
        data.locked = (window.LockManager && window.LockManager.isLocked) ? window.LockManager.isLocked() : false;

        // Persist current theme (now using IndexedDB)
        const activeTheme = document.body.getAttribute('data-theme') || 'default';
        data.theme = activeTheme;

        return data;
    }

    function loadCharacterData(data){
        console.log('loadCharacterData called with data:', data);
        console.log('loadCharacterData: data.locked value:', data.locked);
        
        // Basic stats
        Object.entries(data).forEach(([key,val]) => {
            // --- XP Import ---
            if(key === 'xp' && window.setXPData) {
                window.setXPData(val);
                return;
            }
            // --- End XP Import ---
            // Skip manager keys handled later
            if(['disciplines','merits','flaws','backgrounds','backgroundFlaws','coterieMerits','coterieFlaws','loresheets','convictions'].includes(key)) return;

            // First, handle specialties keys so they don't fall through to generic processing
            if(key.endsWith('_specialties')){
                const skillLabel = key.replace('_specialties','');
                const skillLabelReadable = skillLabel.replace(/_/g,' ');
                const $skillStat = $('.stat').filter(function(){
                    return $(this).find('.stat-label').text().trim().toLowerCase() === skillLabelReadable;
                });
                if($skillStat.length){
                    $skillStat.attr('data-specialties', JSON.stringify(val||[]));
                    if(window.specialtyManager && typeof window.specialtyManager.refreshRow==='function'){
                        const cap = skillLabelReadable.replace(/\b\w/g, c=>c.toUpperCase());
                        window.specialtyManager.refreshRow(cap);
                    }
                }
                return;
            }

            const label = key.replace(/_/g,' ');
            const $stat = $('.stat').filter(function(){
                return $(this).find('.stat-label').text().trim().toLowerCase() === label;
            });
            if(!$stat.length) return;

            const $input = $stat.find('input, textarea');
            const $select = $stat.find('select');
            const $dots = $stat.find('.dots');
            const $track = $stat.find('.track-container');

            if($input.length){
                $input.val(val);
                // Trigger input event for textareas to handle auto-resize
                if($input.is('textarea')) {
                    $input.trigger('input');
                }
            } else if($select.length){
                setSelectValueWithRetry($select, val);
            } else if($dots.length && typeof val === 'number'){
                $dots.data('value', val).attr('data-value', val);
                $dots.find('.dot').each((i,el)=>$(el).toggleClass('filled', i<val));
                // Update dependent tracks (health/willpower) if the helper is available
                if(typeof updateRelatedTrackBoxes === 'function'){
                    updateRelatedTrackBoxes($dots.find('.dot').first());
                }
            } else if($track.length && typeof val === 'object'){
                applyTrackState($track, val);
            } else if(label === 'compulsion') {
                // Special handling for compulsion
                const $compulsionSelect = $stat.find('select');
                if($compulsionSelect.length) {
                    setSelectValueWithRetry($compulsionSelect, val);
                }
            }
        });

        // Manager imports
        if(data.disciplines && window.disciplineManager) window.disciplineManager.loadDisciplines(data.disciplines);
        if(window.meritFlawManager) window.meritFlawManager.loadMeritsAndFlaws(data.merits||{}, data.flaws||{});
        if(window.backgroundManager) window.backgroundManager.loadBackgroundsAndFlaws(data.backgrounds||{}, data.backgroundFlaws||{});
        if(window.coterieManager) window.coterieManager.loadCoterieMeritsAndFlaws(data.coterieMerits||{}, data.coterieFlaws||{});
        if(window.loresheetManager) window.loresheetManager.loadLoresheets(data.loresheets||[]);
        if(window.convictionManager) window.convictionManager.loadConvictions(data.convictions||[]);

        // Restore Discord webhook (now using IndexedDB)
        if(Object.prototype.hasOwnProperty.call(data,'discordWebhook') && window.databaseManager){
            if(data.discordWebhook){
                window.databaseManager.setSetting('discordWebhook', data.discordWebhook);
            } else {
                window.databaseManager.deleteSetting('discordWebhook');
            }
        }

        // Restore lock state
        if(Object.prototype.hasOwnProperty.call(data,'locked') && window.LockManager){
            // Check if there's a locked parameter in the URL that should override character data
            const urlParams = new URLSearchParams(window.location.search);
            const lockedFromUrl = urlParams.get('locked');
            
            if (lockedFromUrl !== null) {
                // URL parameter takes precedence
                const shouldLock = lockedFromUrl === 'true';
                console.log('Setting lock state from URL parameter (overriding character data in loadCharacterData):', shouldLock);
                window.LockManager.init(shouldLock);
            } else {
                // Use character data if no URL parameter
                console.log('Setting lock state from character data in loadCharacterData:', data.locked ?? false);
                window.LockManager.init(data.locked ?? false);
            }
        }

        // Restore theme (now using IndexedDB)
        if(Object.prototype.hasOwnProperty.call(data,'theme') && window.databaseManager){
            const t = data.theme || 'default';
            if(t === 'default'){
                document.body.removeAttribute('data-theme');
            } else {
                document.body.setAttribute('data-theme', t);
            }
            window.databaseManager.setSetting('theme', t);
        }

        // Recalculate and apply impairment classes based on imported track states
        if(typeof evaluateImpairmentStatus === 'function') {
            try {
                evaluateImpairmentStatus();
            } catch(err) {
                console.warn('Failed to evaluate impairment status after import', err);
            }
        }
    }

    function applyTrackState($track, state){
        const $boxesContainer = $track.find('.track-boxes');
        const currentBoxes = $boxesContainer.find('.track-box').length;
        // Adjust max boxes
        if(state.max > currentBoxes){
            for(let i=currentBoxes;i<state.max;i++){
                $boxesContainer.append($('<div>',{class:'track-box'}));
            }
        } else if(state.max < currentBoxes){
            $boxesContainer.find('.track-box').slice(state.max).remove();
        }

        const trackType = $track.data('type');

        // Clear previous status classes
        $boxesContainer.find('.track-box').removeClass('superficial aggravated filled stained');

        if(trackType === 'humanity'){
            // Fill score boxes left→right
            $boxesContainer.find('.track-box').each((i,el)=>{
                if(i < state.current) $(el).addClass('filled');
            });

            // Mark stains on the right-most boxes (score fills left →, stains mark right ←)
            const totalBoxes = $boxesContainer.find('.track-box').length;
            $boxesContainer.find('.track-box').each((i,el)=>{
                if(i >= totalBoxes - state.superficial) $(el).addClass('stained');
            });
        } else {
            // Apply aggravated then superficial for health/willpower
            $boxesContainer.find('.track-box').each((i,el)=>{
                if(i < state.aggravated) $(el).addClass('aggravated');
                else if(i < state.aggravated + state.superficial) $(el).addClass('superficial');
            });
        }
        // Update value attributes & header display using local helper
        $track.data('value', state.current);
        recalcTrackCurrent($track);
    }

    // Recalculate and refresh the header "Current" display for a track container
    function recalcTrackCurrent($track){
        const $header = $track.find('.track-header');
        const $boxesContainer = $track.find('.track-boxes');
        const max = $boxesContainer.find('.track-box').length;

        if($track.data('type') === 'humanity'){
            const filled = $boxesContainer.find('.track-box.filled').length;
            $header.find('span:first-child').text(`Current: ${filled}`);
            $track.data('value', filled);
        } else {
            const superficial = $boxesContainer.find('.track-box.superficial').length;
            const aggravated = $boxesContainer.find('.track-box.aggravated').length;
            const current = max - (superficial + aggravated);
            $header.find('span:first-child').text(`Current: ${current}`);
            $track.data('value', current);
        }
    }

    function setSelectValueWithRetry($select, value, attempts=10){
        if(!value) return;
        if($select.find(`option[value="${value}"]`).length){
            $select.val(value).trigger('change');
            return;
        }
        if(attempts>0){
            setTimeout(()=> setSelectValueWithRetry($select, value, attempts-1), 200);
        }
    }

    // --- Autosave Setup ---
    function debounce(fn, delay = 500) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    async function autoSave() {
        try {
            const data = gatherCharacterData();
            
            // Use IndexedDB exclusively
            if (window.characterManager && window.characterManager.isInitialized) {
                await window.characterManager.saveCurrentCharacter(data);
            } else if (window.databaseManager) {
                await window.databaseManager.saveActiveCharacter(data);
            } else {
                throw new Error('No database manager available for autosave');
            }
        } catch (err) {
            console.error('Auto-save failed', err);
        }
    }
    const debouncedAutoSave = debounce(autoSave, 500);

    // Restore any saved data once everything on the page has had a moment to render
    document.addEventListener('DOMContentLoaded', async () => {
        setTimeout(async () => {
            try {
                // Load from IndexedDB exclusively
                if (window.characterManager && window.characterManager.isInitialized) {
                    const character = await window.characterManager.getCurrentCharacter();
                    if (character) {
                        loadCharacterData(character);
                        return;
                    }
                } else if (window.databaseManager) {
                    const character = await window.databaseManager.getActiveCharacter();
                    if (character) {
                        loadCharacterData(character);
                        return;
                    }
                }
                
                console.log('No character data found in IndexedDB');
            } catch (err) {
                console.error('Failed to restore character from IndexedDB', err);
            }
        }, 800); // allow time for other managers to init
    });

    // Listen for user interactions that might change sheet state
    ['input', 'change', 'click'].forEach(evt => {
        document.addEventListener(evt, debouncedAutoSave, true);
    });
    // --- End Autosave Setup ---

    // Expose helpers globally so they can be reused elsewhere
    window.gatherCharacterData = gatherCharacterData;
    window.loadCharacterData = loadCharacterData;

})(); 