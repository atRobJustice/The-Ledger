// Merit and Flaw Manager — thin wrapper around TraitPairManager
import { merits } from '../../data/vampire/merits.js';
import { TraitPairManager } from './trait-pair-manager.js';

class MeritFlawManager extends TraitPairManager {
    constructor() {
        super({
            dataSource: merits,
            typeA: 'merit',
            typeB: 'flaw',
            typeATitle: 'Merits',
            typeBTitle: 'Flaws',
            typeANoun: 'merit',
            typeBNoun: 'flaw',
            typeAContainer: '.merits-container',
            typeBContainer: '.flaws-container',
            typeAMapProp: 'selectedMerits',
            typeBMapProp: 'selectedFlaws',
            typeASelectedClass: 'selected-merits',
            typeBSelectedClass: 'selected-flaws',
            managerId: 'merit-flaw',
            traitsKeyResolver: (type) => type + 's',
            allowRepeat: (dotsInfo) => dotsInfo.canRepeat,
            levelAggregator: (traitData) => {
                const instances = traitData.instances || [];
                if (instances.length > 1) {
                    return instances.reduce((total, inst) => total + (inst.level || 0), 0);
                }
                return traitData.level || 0;
            }
        });
        this.init();
    }

    renderMeritManager() {
        this.renderType('merit');
    }

    renderFlawManager() {
        this.renderType('flaw');
    }

    getSelectedMerits() {
        return this.getSelectedMapAsObject('merit');
    }

    getSelectedFlaws() {
        return this.getSelectedMapAsObject('flaw');
    }

    getMeritLevel(meritKey) {
        return this.getTraitLevel('merit', meritKey);
    }

    getFlawLevel(flawKey) {
        return this.getTraitLevel('flaw', flawKey);
    }

    getTotalMeritPoints() {
        return this.getTotalPoints('merit');
    }

    getTotalFlawPoints() {
        return this.getTotalPoints('flaw');
    }

    loadMeritsAndFlaws(meritsData, flawsData) {
        this.loadTraits(meritsData, flawsData);
    }

    exportMeritsAndFlaws() {
        return this.exportTraits('merits', 'flaws');
    }
}

$(document).ready(function() {
    if ($('.merits-container').length > 0 || $('.flaws-container').length > 0) {
        window.meritFlawManager = new MeritFlawManager();
    }
});

export { MeritFlawManager };
