"use strict";

// Initialize the VtM module
(function() {
    // Create or get the existing vtm object
    if (!$t.vtm) $t.vtm = {};
    
    // Define VtM-specific dice labels and colors
    $t.vtm.standard_dice_face_labels  = [' ', ' ', ' ', ' ', ' ', ' ', '●', '●', '●', '●', '✪'];
    $t.vtm.hunger_dice_face_labels    = [' ', '⚠', ' ', ' ', ' ', ' ', '●', '●', '●', '●', '✪'];
    $t.vtm.rouse_dice_face_labels     = [' ', ' ', ' ', ' ', ' ', ' ', '●', '●', '●', '●', '✪'];
    $t.vtm.remorse_dice_face_labels   = [' ', ' ', ' ', ' ', ' ', ' ', '●', '●', '●', '●', '✪'];
    $t.vtm.frenzy_dice_face_labels    = [' ', ' ', ' ', ' ', ' ', ' ', '●', '●', '●', '●', '✪'];
    $t.vtm.label_color = '#aaaaaa';
    $t.vtm.dice_color = '#080206';  // Regular dice - Black
    $t.vtm.hunger_dice_color = '#A41B2E';  // Hunger dice - Madder
    $t.vtm.rouse_dice_color = '#331D43';  // Rouse dice - Dark Purple
    $t.vtm.remorse_dice_color = '#19305B';  // Remorse dice - Delft Blue
    $t.vtm.frenzy_dice_color = '#B83B1A';  // Frenzy dice - Rust    

    // Methods for VtM dice creation
    $t.vtm.createVampireDiceMaterials = function(dieType = "Standard") {
        let faceLabels;
        switch(dieType) {
            case "Hunger":
                faceLabels = $t.vtm.hunger_dice_face_labels;
                break;
            case "Rouse":
                faceLabels = $t.vtm.rouse_dice_face_labels;
                break;
            case "Remorse":
                faceLabels = $t.vtm.remorse_dice_face_labels;
                break;
            case "Frenzy":
                faceLabels = $t.vtm.frenzy_dice_face_labels;
                break;
            default:
                faceLabels = $t.vtm.standard_dice_face_labels;
        }
        return $t.dice.create_dice_materials(
            faceLabels,
            $t.dice.scale / 2,
            1.0,
            dieType
        );
    };

    // VtM notation parsing
    $t.vtm.parse_notation = function(regularCount, hungerCount, rouseCount = 0, remorseCount = 0, frenzyCount = 0) {
        var ret = { 
            set: [], 
            hungerSet: [], 
            rouseSet: [],
            remorseSet: [],
            frenzySet: [],
            constant: 0, 
            result: [], 
            error: false 
        };
        var type = 'd10';
        
        while (regularCount--) { ret.set.push(type); }
        while (hungerCount--) { ret.hungerSet.push(type); }
        while (rouseCount--) { ret.rouseSet.push(type); }
        while (remorseCount--) { ret.remorseSet.push(type); }
        while (frenzyCount--) { ret.frenzySet.push(type); }
        
        return ret;
    };

    // VtM-specific result interpretation
    $t.vtm.interpretResults = function(notation, result) {
        let simpleAnkhs = 0;
        let hungerDoubleAnkhs = 0;
        let regularDoubleAnhks = 0;
        let bestialFailureCandidate = false;
        
        const relevantCount = notation.set.length + notation.hungerSet.length; // only regular & hunger affect success tally

        result.forEach((roll, i) => {
            if (i >= relevantCount) return; // Skip rouse, remorse, frenzy dice entirely

            const isHunger = i >= notation.set.length && i < notation.set.length + notation.hungerSet.length;
            if (6 <= roll && roll <= 9) {
                simpleAnkhs += 1;
            }
            if (isHunger && roll == 1) {
                bestialFailureCandidate = true;
            }
            if (roll == 10) {
                if (isHunger) {
                    hungerDoubleAnkhs += 1;
                } else {
                    regularDoubleAnhks += 1;
                }
            }
        });
        
        const doubleAnkhs = regularDoubleAnhks + hungerDoubleAnkhs;
        const successes = simpleAnkhs + 4 * parseInt(doubleAnkhs / 2) + (doubleAnkhs % 2);
        const critical = parseInt(doubleAnkhs / 2);
        const messyCritical = critical && (hungerDoubleAnkhs > 0);
        const bestialFailure = (successes == 0 && bestialFailureCandidate);
        
        return {
            successes: successes,
            critical: critical,
            messyCritical: messyCritical,
            bestialFailure: bestialFailure
        };
    };

    // Format the results for display
    $t.vtm.formatResults = function(results) {
        let html = '';
        if (results.successes > 0) {
            html += `${results.successes} Success`;
            if (results.successes > 1) { html += 'es'; }
            if (results.messyCritical) {
                html += ', <span class="messy-critical critical">Messy Critical</span>';
            } else if (results.critical) {
                html += ', <span class="critical">Critical</span>';
            }
        } else {
            if (results.bestialFailure) {
                html += '<span class="bestial-failure failure">Bestial Failure</span>';
            } else {
                html += '<span class="failure">Failure</span>';
            }
        }
        return html;
    };
})();
