// Background and Background Flaw Manager — thin wrapper around TraitPairManager
import { backgrounds } from '../../data/vampire/backgrounds.js';
import { TraitPairManager } from './trait-pair-manager.js';

class BackgroundManager extends TraitPairManager {
    constructor() {
        super({
            dataSource: backgrounds,
            typeA: 'background',
            typeB: 'backgroundFlaw',
            typeATitle: 'Backgrounds',
            typeBTitle: 'Background Flaws',
            typeANoun: 'background',
            typeBNoun: 'background flaw',
            typeAContainer: '.backgrounds-container',
            typeBContainer: '.background-flaws-container',
            typeAMapProp: 'selectedBackgrounds',
            typeBMapProp: 'selectedBackgroundFlaws',
            typeASelectedClass: 'selected-backgrounds',
            typeBSelectedClass: 'selected-background-flaws',
            managerId: 'background',
            traitsKeyResolver: (type) => (type === 'background' ? 'merits' : 'flaws'),
            allowRepeat: () => true,
            levelAggregator: (traitData) => {
                if (traitData.instances && traitData.instances.length > 0) {
                    return traitData.instances.reduce((total, inst) => total + (inst.level || 0), 0);
                }
                return traitData.level || 0;
            }
        });
        this.init();
    }

    renderBackgroundManager() {
        this.renderType('background');
    }

    renderBackgroundFlawManager() {
        this.renderType('backgroundFlaw');
    }

    getSelectedBackgrounds() {
        return this.getSelectedMapAsObject('background');
    }

    getSelectedBackgroundFlaws() {
        return this.getSelectedMapAsObject('backgroundFlaw');
    }

    getBackgroundLevel(backgroundKey) {
        return this.getTraitLevel('background', backgroundKey);
    }

    getBackgroundFlawLevel(flawKey) {
        return this.getTraitLevel('backgroundFlaw', flawKey);
    }

    getTotalBackgroundPoints() {
        return this.getTotalPoints('background');
    }

    getTotalBackgroundFlawPoints() {
        return this.getTotalPoints('backgroundFlaw');
    }

    loadBackgroundsAndFlaws(backgroundsData, flawsData) {
        this.loadTraits(backgroundsData, flawsData);
    }

    exportBackgroundsAndFlaws() {
        return this.exportTraits('backgrounds', 'backgroundFlaws');
    }
}

$(document).ready(function() {
    if ($('.backgrounds-container').length > 0 || $('.background-flaws-container').length > 0) {
        window.backgroundManager = new BackgroundManager();
    }
});

export { BackgroundManager };
