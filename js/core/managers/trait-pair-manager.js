// Config-driven base for paired trait managers (merits/flaws, backgrounds/backgroundFlaws)
import { TraitManagerUtils } from './manager-utils.js';
import logger from '../utils/logger.js';

/**
 * Owns shared pair-manager logic: dual Maps, selectors, selected lists,
 * add/remove/dot handling, load/export, and unified data attributes.
 *
 * Expected config shape:
 * {
 *   dataSource, typeA, typeB,
 *   typeATitle, typeBTitle,          // plural labels ("Merits")
 *   typeANoun, typeBNoun,            // singular for dropdowns/tooltips
 *   typeAContainer, typeBContainer,  // e.g. '.merits-container'
 *   typeAMapProp, typeBMapProp,      // e.g. 'selectedMerits'
 *   typeASelectedClass, typeBSelectedClass, // wrapper class for selected list
 *   traitsKeyResolver: (type) => 'merits'|'flaws'|...,
 *   allowRepeat: (dotsInfo) => boolean,
 *   levelAggregator: (traitData) => number,
 *   managerId: string                // data-manager attr for event scoping
 * }
 */
class TraitPairManager {
    constructor(config) {
        this.config = config;
        this[config.typeAMapProp] = new Map();
        this[config.typeBMapProp] = new Map();
        this.availableCategories = Object.keys(config.dataSource);
    }

    init() {
        this.renderType(this.config.typeA);
        this.renderType(this.config.typeB);
        this.bindEvents();
        this.initializeTooltips();
    }

    // --- helpers -----------------------------------------------------------

    getMap(type) {
        const { typeA, typeB, typeAMapProp, typeBMapProp } = this.config;
        if (type === typeA) return this[typeAMapProp];
        if (type === typeB) return this[typeBMapProp];
        return null;
    }

    getContainerSelector(type) {
        return type === this.config.typeA
            ? this.config.typeAContainer
            : this.config.typeBContainer;
    }

    getSelectedClass(type) {
        return type === this.config.typeA
            ? this.config.typeASelectedClass
            : this.config.typeBSelectedClass;
    }

    getTitle(type) {
        return type === this.config.typeA
            ? this.config.typeATitle
            : this.config.typeBTitle;
    }

    getNoun(type) {
        return type === this.config.typeA
            ? this.config.typeANoun
            : this.config.typeBNoun;
    }

    /** camelCase type key -> kebab-case for CSS classes (backgroundFlaw -> background-flaw) */
    typeToKebab(type) {
        return String(type).replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    traitsKey(type) {
        return this.config.traitsKeyResolver(type);
    }

    getTraitDef(categoryKey, traitKey, type) {
        const category = this.config.dataSource[categoryKey];
        if (!category) return null;
        const bucket = category[this.traitsKey(type)];
        return bucket ? bucket[traitKey] : null;
    }

    // --- render ------------------------------------------------------------

    renderType(type) {
        const $container = $(this.getContainerSelector(type));
        if ($container.length === 0) {
            logger.error(`${this.getTitle(type)} container not found`);
            return;
        }

        $container.empty();
        this.renderTraitSelector($container, type);
        this.renderSelectedTraits($container, type, this.getMap(type));
    }

    renderTraitSelector(container, type) {
        const kebab = this.typeToKebab(type);
        const noun = this.getNoun(type);
        const cap = TraitManagerUtils.capitalizeFirst(type);

        const selectorHtml = `
            <div class="${kebab}-selector mb-3">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <select class="form-select ${kebab}-category-dropdown" id="${type}CategorySelect" data-manager="${this.config.managerId}">
                        <option value="">Select Category</option>
                        ${this.getCategoryOptions()}
                    </select>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <select class="form-select ${kebab}-dropdown" id="${type}Select" data-manager="${this.config.managerId}" disabled>
                        <option value="">Select a ${noun}</option>
                    </select>
                    <button class="btn btn-success btn-sm" id="add${cap}Btn" data-manager="${this.config.managerId}" disabled>
                        <i class="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
        `;
        container.append(selectorHtml);
    }

    renderSelectedTraits(container, type, selectedTraits) {
        const selectedClass = this.getSelectedClass(type);
        const title = this.getTitle(type).toLowerCase();
        const selectedHtml = `
            <div class="${selectedClass}">
                <div id="${type}sList" class="${this.typeToKebab(type)}s-list">
                    ${selectedTraits.size === 0
                        ? `<div class="fst-italic">No ${title} selected</div>`
                        : this.getSelectedTraitsHtml(type, selectedTraits)}
                </div>
            </div>
        `;
        container.append(selectedHtml);
    }

    getCategoryOptions() {
        return this.availableCategories
            .map(categoryKey => {
                const category = this.config.dataSource[categoryKey];
                const displayName = category.name || TraitManagerUtils.camelToTitle(categoryKey);
                return `<option value="${categoryKey}">${displayName}</option>`;
            })
            .join('');
    }

    getTraitOptions(categoryKey, type) {
        const category = this.config.dataSource[categoryKey];
        const key = this.traitsKey(type);
        if (!category || !category[key]) return '';

        return TraitManagerUtils.generateTraitOptions(
            category[key],
            this.getMap(type),
            categoryKey
        );
    }

    getSelectedTraitsHtml(type, selectedTraits) {
        const html = [];
        const kebab = this.typeToKebab(type);
        const noun = this.getNoun(type);

        selectedTraits.forEach((traitData, traitKey) => {
            const category = this.config.dataSource[traitData.category];
            const trait = this.getTraitDef(traitData.category, traitKey, type);
            if (!trait || !category) return;

            const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
            const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
            const instances = traitData.instances || [{ level: traitData.level }];

            instances.forEach((instance, instanceIndex) => {
                html.push(`
                    <div class="${kebab}-item mb-3" data-trait-key="${traitKey}" data-trait-category="${type}" data-instance="${instanceIndex}">
                        <div class="${kebab}-header d-flex justify-content-between align-items-center stat">
                            <div class="${kebab}-info">
                                <span class="trait-name">${displayName}${instances.length > 1 ? ` #${instanceIndex + 1}` : ''}</span>
                                <span class="type-label">${category.name || TraitManagerUtils.camelToTitle(traitData.category)}</span>
                            </div>
                            <div class="${kebab}-controls d-flex align-items-center gap-2">
                                ${this.renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo, noun)}
                                <button class="btn theme-btn-primary btn-sm remove-trait-btn"
                                        data-manager="${this.config.managerId}"
                                        data-trait-type="${type}"
                                        data-trait-key="${traitKey}"
                                        data-instance="${instanceIndex}">
                                    <i class="bi bi-dash-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="${kebab}-description mt-2">
                            <small>${trait.description}</small>
                        </div>
                    </div>
                `);
            });
        });

        return html.join('');
    }

    renderTraitControls(trait, instance, traitKey, instanceIndex, type, dotsInfo, noun) {
        const { maxDots, traitTypeClass, tooltipText } = TraitManagerUtils.getDotsMeta(dotsInfo, noun);

        return `
            <div class="dots"
                 data-value="${instance.level}"
                 data-trait-key="${traitKey}"
                 data-trait-category="${type}"
                 data-instance="${instanceIndex}"
                 data-trait-type-class="${traitTypeClass}"
                 data-manager="${this.config.managerId}"
                 data-bs-toggle="tooltip"
                 data-bs-placement="top"
                 title="${tooltipText}">
                ${TraitManagerUtils.createDots(instance.level, maxDots)}
            </div>
        `;
    }

    // --- events ------------------------------------------------------------

    bindEvents() {
        const { managerId, typeA, typeB, typeAContainer, typeBContainer } = this.config;
        const kebabA = this.typeToKebab(typeA);
        const kebabB = this.typeToKebab(typeB);

        $(document).on(
            'change',
            `${typeAContainer} .${kebabA}-category-dropdown, ${typeBContainer} .${kebabB}-category-dropdown`,
            (e) => {
                const $select = $(e.currentTarget);
                if ($select.data('manager') !== managerId) return;
                const categoryKey = $select.val();
                const type = $select.hasClass(`${kebabA}-category-dropdown`) ? typeA : typeB;
                this.updateTraitDropdown(categoryKey, type);
            }
        );

        $(document).on(
            'change',
            `${typeAContainer} .${kebabA}-dropdown, ${typeBContainer} .${kebabB}-dropdown`,
            (e) => {
                const $select = $(e.currentTarget);
                if ($select.data('manager') !== managerId) return;
                const type = $select.hasClass(`${kebabA}-dropdown`) ? typeA : typeB;
                const addBtn = $(`#add${TraitManagerUtils.capitalizeFirst(type)}Btn`);
                addBtn.prop('disabled', !$select.val());
            }
        );

        $(document).on(
            'click',
            `#add${TraitManagerUtils.capitalizeFirst(typeA)}Btn, #add${TraitManagerUtils.capitalizeFirst(typeB)}Btn`,
            (e) => {
                e.preventDefault();
                const $btn = $(e.currentTarget);
                if ($btn.data('manager') !== managerId) return;
                const type = $btn.attr('id') === `add${TraitManagerUtils.capitalizeFirst(typeA)}Btn` ? typeA : typeB;
                const $select = $(`#${type}Select`);
                const traitKey = $select.val();
                const categoryKey = $select.find('option:selected').data('category');
                if (traitKey && categoryKey) {
                    this.addTrait(type, traitKey, categoryKey);
                }
            }
        );

        $(document).on(
            'click',
            `${typeAContainer} .remove-trait-btn, ${typeBContainer} .remove-trait-btn`,
            (e) => {
                e.preventDefault();
                const $btn = $(e.currentTarget);
                if ($btn.data('manager') !== managerId) return;
                const type = $btn.data('trait-type');
                const traitKey = $btn.data('trait-key');
                const instanceIndex = $btn.data('instance');
                if (traitKey && (type === typeA || type === typeB)) {
                    this.removeTrait(type, traitKey, instanceIndex);
                }
            }
        );

        $(document).on(
            'click',
            `${typeAContainer} .dot, ${typeBContainer} .dot`,
            (e) => {
                e.preventDefault();
                const $dot = $(e.currentTarget);
                const $dotsContainer = $dot.parent();
                if ($dotsContainer.data('manager') !== managerId) return;
                this.handleDotClick($dot);
            }
        );
    }

    updateTraitDropdown(categoryKey, type) {
        const $dropdown = $(`#${type}Select`);
        const $addBtn = $(`#add${TraitManagerUtils.capitalizeFirst(type)}Btn`);
        const noun = this.getNoun(type);

        if (!categoryKey) {
            $dropdown.prop('disabled', true).html(`<option value="">Select a ${noun}</option>`);
            $addBtn.prop('disabled', true);
            return;
        }

        const options = this.getTraitOptions(categoryKey, type);
        if (options) {
            $dropdown.prop('disabled', false).html(`
                <option value="">Select a ${noun}</option>
                ${options}
            `);
        } else {
            $dropdown.prop('disabled', true).html(`<option value="">No ${this.getTitle(type).toLowerCase()} available in this category</option>`);
        }

        $addBtn.prop('disabled', true);
    }

    // --- mutations ---------------------------------------------------------

    getInitialLevel(dotsInfo) {
        if (dotsInfo.hasOr) {
            return dotsInfo.orValues[0];
        }
        return dotsInfo.min;
    }

    addTrait(type, traitKey, categoryKey) {
        const selectedTraits = this.getMap(type);
        const trait = this.getTraitDef(categoryKey, traitKey, type);
        if (!trait) return;

        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
        const canMulti = this.config.allowRepeat(dotsInfo);
        const initialLevel = this.getInitialLevel(dotsInfo);

        if (canMulti) {
            if (selectedTraits.has(traitKey)) {
                selectedTraits.get(traitKey).instances.push({ level: initialLevel });
            } else {
                selectedTraits.set(traitKey, {
                    category: categoryKey,
                    level: initialLevel,
                    instances: [{ level: initialLevel }]
                });
            }
            const instanceCount = selectedTraits.get(traitKey).instances.length;
            TraitManagerUtils.showFeedback(`Added ${displayName} (Instance #${instanceCount})`, 'success');
        } else {
            if (selectedTraits.has(traitKey)) {
                TraitManagerUtils.showFeedback(`${displayName} is already selected`, 'warning');
                return;
            }
            selectedTraits.set(traitKey, {
                category: categoryKey,
                level: initialLevel,
                instances: [{ level: initialLevel }]
            });
            TraitManagerUtils.showFeedback(`Added ${displayName}`, 'success');
        }

        this.updateDisplay();
    }

    removeTrait(type, traitKey, instanceIndex = null) {
        const selectedTraits = this.getMap(type);
        if (!selectedTraits.has(traitKey)) return;

        const traitData = selectedTraits.get(traitKey);
        const trait = this.getTraitDef(traitData.category, traitKey, type);
        if (!trait) return;

        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);
        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
        const canMulti = this.config.allowRepeat(dotsInfo);

        if (canMulti && instanceIndex !== null && traitData.instances.length > 1) {
            traitData.instances.splice(instanceIndex, 1);
            TraitManagerUtils.showFeedback(`Removed ${displayName} instance`, 'info');
        } else {
            selectedTraits.delete(traitKey);
            TraitManagerUtils.showFeedback(`Removed ${displayName}`, 'info');
        }

        this.updateDisplay();
    }

    handleDotClick($dot) {
        const $dotsContainer = $dot.parent();
        const currentValue = parseInt($dotsContainer.data('value') || '0', 10);
        const clickedValue = parseInt($dot.data('value'), 10);
        const traitTypeClass = $dotsContainer.data('trait-type-class');
        const traitKey = $dotsContainer.data('trait-key');
        const type = $dotsContainer.data('trait-category');
        const instanceIndex = parseInt($dotsContainer.data('instance') || '0', 10);

        if (!traitKey || (type !== this.config.typeA && type !== this.config.typeB)) return;

        const selectedTraits = this.getMap(type);
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const trait = this.getTraitDef(traitData.category, traitKey, type);
        if (!trait) return;

        const dotsInfo = TraitManagerUtils.parseDotsNotation(trait.dots);
        const newValue = TraitManagerUtils.computeNewDotValue(
            dotsInfo,
            traitTypeClass,
            currentValue,
            clickedValue
        );
        if (newValue === null) return;

        this.updateTraitInstanceLevel(type, traitKey, instanceIndex, newValue);
    }

    updateTraitInstanceLevel(type, traitKey, instanceIndex, newLevel) {
        const selectedTraits = this.getMap(type);
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const trait = this.getTraitDef(traitData.category, traitKey, type);
        if (!trait) return;

        const displayName = trait.name || TraitManagerUtils.camelToTitle(traitKey);

        if (traitData.instances && traitData.instances[instanceIndex]) {
            traitData.instances[instanceIndex].level = newLevel;
            traitData.level = newLevel;
            this.updateTraitDisplay(type, traitKey, instanceIndex);

            const instanceSuffix = traitData.instances.length > 1 ? ` #${instanceIndex + 1}` : '';
            TraitManagerUtils.showFeedback(`${displayName}${instanceSuffix} level set to ${newLevel}`, 'info');
        }
    }

    updateTraitDisplay(type, traitKey, instanceIndex = null) {
        const selectedTraits = this.getMap(type);
        const traitData = selectedTraits.get(traitKey);
        if (!traitData) return;

        const refresh = (idx, level) => {
            const $dots = $(`.dots[data-trait-key="${traitKey}"][data-trait-category="${type}"][data-instance="${idx}"][data-manager="${this.config.managerId}"]`);
            TraitManagerUtils.refreshDots($dots, level);
            $dots.attr('data-value', level);
        };

        if (instanceIndex !== null) {
            const instance = traitData.instances[instanceIndex];
            if (!instance) return;
            refresh(instanceIndex, instance.level);
        } else {
            traitData.instances.forEach((instance, idx) => {
                refresh(idx, instance.level);
            });
        }
    }

    updateDisplay() {
        this.updateTraitTypeDisplay(this.config.typeA);
        this.updateTraitTypeDisplay(this.config.typeB);
        this.initializeTooltips();
    }

    updateTraitTypeDisplay(type) {
        const $categorySelect = $(`#${type}CategorySelect`);
        const currentCategory = $categorySelect.val();

        if (currentCategory) {
            this.updateTraitDropdown(currentCategory, type);
        }

        $(`#${type}Select`).val('');
        $(`#add${TraitManagerUtils.capitalizeFirst(type)}Btn`).prop('disabled', true);

        const selectedTraits = this.getMap(type);
        const title = this.getTitle(type).toLowerCase();
        $(`#${type}sList`).html(
            selectedTraits.size === 0
                ? `<div class="fst-italic">No ${title} selected</div>`
                : this.getSelectedTraitsHtml(type, selectedTraits)
        );
    }

    initializeTooltips() {
        TraitManagerUtils.initTooltips([
            this.config.typeAContainer,
            this.config.typeBContainer
        ]);
    }

    // --- public data API ---------------------------------------------------

    getSelectedMapAsObject(type) {
        return TraitManagerUtils.mapToPlainObject(this.getMap(type));
    }

    getTraitLevel(type, traitKey) {
        const traitData = this.getMap(type).get(traitKey);
        if (!traitData) return 0;
        return this.config.levelAggregator(traitData);
    }

    getTotalPoints(type) {
        return TraitManagerUtils.sumLevels(this.getMap(type));
    }

    loadTraits(typeAData, typeBData) {
        const { typeA, typeB, typeAMapProp, typeBMapProp } = this.config;
        this[typeAMapProp].clear();
        this[typeBMapProp].clear();

        this._loadIntoMap(typeAData, typeA);
        this._loadIntoMap(typeBData, typeB);
        this.updateDisplay();
    }

    _loadIntoMap(data, type) {
        if (!data || typeof data !== 'object') return;
        const map = this.getMap(type);
        Object.entries(data).forEach(([traitKey, entry]) => {
            const category = entry.category || this.findTraitCategory(traitKey, type);
            if (!category) return;
            map.set(traitKey, {
                category,
                level: entry.level || 1,
                instances: entry.instances || [{ level: entry.level || 1 }]
            });
        });
    }

    findTraitCategory(traitKey, type) {
        const key = this.traitsKey(type);
        for (const categoryKey of this.availableCategories) {
            const category = this.config.dataSource[categoryKey];
            if (category[key] && category[key][traitKey]) {
                return categoryKey;
            }
        }
        return null;
    }

    exportTraits(typeAExportKey, typeBExportKey) {
        return {
            [typeAExportKey]: this.getSelectedMapAsObject(this.config.typeA),
            [typeBExportKey]: this.getSelectedMapAsObject(this.config.typeB)
        };
    }
}

export { TraitPairManager };
