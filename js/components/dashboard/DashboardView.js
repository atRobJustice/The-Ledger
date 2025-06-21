/**
 * DashboardView - Main dashboard container component
 * Extends BaseComponent and provides dashboard layout, navigation, and event handling
 */
class DashboardView extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.handleCharacterSelect = this.handleCharacterSelect.bind(this);
        this.handleGoToCharacterSheet = this.handleGoToCharacterSheet.bind(this);
    }

    /**
     * Render the dashboard layout
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="dashboard-view container-fluid py-4">
                <div class="row mb-4">
                    <div class="col-12 d-flex justify-content-between align-items-center">
                        <h2 class="mb-0">Dashboard</h2>
                        <button id="go-to-character-sheet" class="btn btn-primary">
                            <i class="bi bi-person-lines-fill"></i> Character Sheet
                        </button>
                    </div>
                </div>
                <div class="row g-4">
                    <div class="col-lg-4 col-md-6">
                        <div id="character-list-panel"></div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div id="quick-actions-panel"></div>
                    </div>
                    <div class="col-lg-4 col-md-12">
                        <div id="navigation-panel"></div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup: mount panels, bind events
     */
    async afterRender() {
        // Mount panel components (assume registry is available globally)
        if (window.ComponentRegistry) {
            const registry = window.ComponentRegistry.instance || new window.ComponentRegistry();
            window.ComponentRegistry.instance = registry;
            if (!registry.isRegistered('CharacterListPanel')) {
                // Optionally, dynamically load/register if not present
            }
            // Mount panels if available
            if (registry.isRegistered('CharacterListPanel')) {
                const charListPanel = await registry.create('CharacterListPanel', {});
                await charListPanel.mount(this.element.querySelector('#character-list-panel'));
                charListPanel.on('characterSelected', this.handleCharacterSelect);
            }
            if (registry.isRegistered('QuickActionsPanel')) {
                const quickActionsPanel = await registry.create('QuickActionsPanel', {});
                await quickActionsPanel.mount(this.element.querySelector('#quick-actions-panel'));
            }
            if (registry.isRegistered('NavigationPanel')) {
                const navigationPanel = await registry.create('NavigationPanel', {});
                await navigationPanel.mount(this.element.querySelector('#navigation-panel'));
            }
        }
        // Bind navigation button
        const btn = this.element.querySelector('#go-to-character-sheet');
        if (btn) {
            btn.addEventListener('click', this.handleGoToCharacterSheet);
        }
    }

    /**
     * Handle character selection event
     * @param {Event} event
     */
    handleCharacterSelect(event) {
        const detail = event.detail || {};
        const characterId = detail.data && detail.data.characterId;
        // Optionally, store selected character in state or pass to AppRouter
        if (window.AppRouter && typeof window.AppRouter.instance?.navigateTo === 'function') {
            window.AppRouter.instance.navigateTo('CharacterSheetView', { characterId });
        }
    }

    /**
     * Handle navigation to character sheet
     */
    handleGoToCharacterSheet() {
        if (window.AppRouter && typeof window.AppRouter.instance?.navigateTo === 'function') {
            window.AppRouter.instance.navigateTo('CharacterSheetView');
        } else {
            // Fallback: show character sheet view directly
            if (document.getElementById('dashboard-view')) {
                document.getElementById('dashboard-view').classList.add('view-hidden');
                document.getElementById('dashboard-view').classList.remove('view-visible');
            }
            if (document.getElementById('character-sheet-view')) {
                document.getElementById('character-sheet-view').classList.remove('view-hidden');
                document.getElementById('character-sheet-view').classList.add('view-visible');
            }
        }
    }
}

// Attach to global scope for dynamic loading
window.DashboardView = DashboardView;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardView;
} 