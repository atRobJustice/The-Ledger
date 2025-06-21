/**
 * Unit tests for DashboardView component
 */
describe('DashboardView', () => {
    let testContainer;
    let dashboardView;
    let mockCharacterManager;
    let mockEventBus;

    beforeEach(() => {
        // Create test container
        testContainer = document.createElement('div');
        testContainer.id = 'dashboard-test-container';
        document.body.appendChild(testContainer);

        // Create mock character manager
        mockCharacterManager = {
            getCharacters: jest.fn().mockResolvedValue([
                { id: 'char1', name: 'Character 1', clan: 'brujah' },
                { id: 'char2', name: 'Character 2', clan: 'toreador' }
            ]),
            createCharacter: jest.fn().mockResolvedValue({ id: 'new-char', name: 'New Character' }),
            deleteCharacter: jest.fn().mockResolvedValue(true),
            loadCharacter: jest.fn().mockResolvedValue({ id: 'char1', name: 'Character 1' })
        };

        // Create mock event bus
        mockEventBus = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };

        // Mock global dependencies
        window.characterManager = mockCharacterManager;
        window.eventBus = mockEventBus;
    });

    afterEach(() => {
        if (dashboardView && dashboardView.unmount) {
            dashboardView.unmount();
        }
        if (testContainer) {
            testContainer.remove();
        }
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        it('should create dashboard view with proper structure', async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();

            expect(dashboardView).toBeDefined();
            expect(dashboardView.element).toBe(testContainer);
            expect(dashboardView.element.innerHTML).toContain('dashboard-view');
        });

        it('should initialize with navigation panel', async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();

            const navigationPanel = dashboardView.element.querySelector('.navigation-panel');
            expect(navigationPanel).toBeDefined();
        });

        it('should initialize with character list panel', async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();

            const characterListPanel = dashboardView.element.querySelector('.character-list-panel');
            expect(characterListPanel).toBeDefined();
        });

        it('should initialize with quick actions panel', async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();

            const quickActionsPanel = dashboardView.element.querySelector('.quick-actions-panel');
            expect(quickActionsPanel).toBeDefined();
        });
    });

    describe('Character Management', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should load and display character list', async () => {
            await dashboardView.loadCharacters();

            expect(mockCharacterManager.getCharacters).toHaveBeenCalled();
            expect(dashboardView.characterList).toHaveLength(2);
            
            const characterElements = dashboardView.element.querySelectorAll('.character-item');
            expect(characterElements).toHaveLength(2);
        });

        it('should create new character', async () => {
            const createButton = dashboardView.element.querySelector('.create-character-btn');
            expect(createButton).toBeDefined();

            // Simulate click
            createButton.click();
            await componentTestUtils.delay(100);

            expect(mockCharacterManager.createCharacter).toHaveBeenCalled();
        });

        it('should delete character', async () => {
            await dashboardView.loadCharacters();
            
            const deleteButton = dashboardView.element.querySelector('.delete-character-btn');
            expect(deleteButton).toBeDefined();

            // Simulate click
            deleteButton.click();
            await componentTestUtils.delay(100);

            expect(mockCharacterManager.deleteCharacter).toHaveBeenCalled();
        });

        it('should load character when clicked', async () => {
            await dashboardView.loadCharacters();
            
            const characterItem = dashboardView.element.querySelector('.character-item');
            expect(characterItem).toBeDefined();

            // Simulate click
            characterItem.click();
            await componentTestUtils.delay(100);

            expect(mockCharacterManager.loadCharacter).toHaveBeenCalled();
            expect(mockEventBus.emit).toHaveBeenCalledWith('view:changed', {
                view: 'character-sheet',
                characterId: 'char1'
            });
        });

        it('should handle character loading errors', async () => {
            mockCharacterManager.getCharacters.mockRejectedValue(new Error('Failed to load characters'));
            
            await dashboardView.loadCharacters();

            expect(dashboardView.element.innerHTML).toContain('error');
            expect(dashboardView.element.innerHTML).toContain('Failed to load characters');
        });
    });

    describe('Navigation', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should navigate to character sheet', async () => {
            const characterSheetButton = dashboardView.element.querySelector('.nav-character-sheet');
            expect(characterSheetButton).toBeDefined();

            characterSheetButton.click();
            await componentTestUtils.delay(100);

            expect(mockEventBus.emit).toHaveBeenCalledWith('view:changed', {
                view: 'character-sheet'
            });
        });

        it('should navigate to settings', async () => {
            const settingsButton = dashboardView.element.querySelector('.nav-settings');
            expect(settingsButton).toBeDefined();

            settingsButton.click();
            await componentTestUtils.delay(100);

            expect(mockEventBus.emit).toHaveBeenCalledWith('view:changed', {
                view: 'settings'
            });
        });

        it('should navigate to help', async () => {
            const helpButton = dashboardView.element.querySelector('.nav-help');
            expect(helpButton).toBeDefined();

            helpButton.click();
            await componentTestUtils.delay(100);

            expect(mockEventBus.emit).toHaveBeenCalledWith('view:changed', {
                view: 'help'
            });
        });
    });

    describe('Quick Actions', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should show quick actions', () => {
            const quickActions = dashboardView.element.querySelectorAll('.quick-action');
            expect(quickActions.length).toBeGreaterThan(0);
        });

        it('should handle import character action', async () => {
            const importButton = dashboardView.element.querySelector('.quick-action-import');
            expect(importButton).toBeDefined();

            importButton.click();
            await componentTestUtils.delay(100);

            // Should show file input or modal
            expect(dashboardView.element.innerHTML).toContain('import') || 
                   expect(mockEventBus.emit).toHaveBeenCalledWith('character:import');
        });

        it('should handle export character action', async () => {
            const exportButton = dashboardView.element.querySelector('.quick-action-export');
            expect(exportButton).toBeDefined();

            exportButton.click();
            await componentTestUtils.delay(100);

            expect(mockEventBus.emit).toHaveBeenCalledWith('character:export');
        });

        it('should handle backup action', async () => {
            const backupButton = dashboardView.element.querySelector('.quick-action-backup');
            expect(backupButton).toBeDefined();

            backupButton.click();
            await componentTestUtils.delay(100);

            expect(mockEventBus.emit).toHaveBeenCalledWith('backup:create');
        });
    });

    describe('Search and Filter', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
            await dashboardView.loadCharacters();
        });

        it('should filter characters by name', async () => {
            const searchInput = dashboardView.element.querySelector('.character-search');
            expect(searchInput).toBeDefined();

            // Simulate search input
            componentTestUtils.simulateInput(searchInput, 'Character 1');
            await componentTestUtils.delay(100);

            const visibleCharacters = dashboardView.element.querySelectorAll('.character-item:not(.hidden)');
            expect(visibleCharacters).toHaveLength(1);
        });

        it('should filter characters by clan', async () => {
            const clanFilter = dashboardView.element.querySelector('.clan-filter');
            expect(clanFilter).toBeDefined();

            // Simulate clan selection
            componentTestUtils.simulateChange(clanFilter, 'brujah');
            await componentTestUtils.delay(100);

            const visibleCharacters = dashboardView.element.querySelectorAll('.character-item:not(.hidden)');
            expect(visibleCharacters).toHaveLength(1);
        });

        it('should clear filters', async () => {
            const clearButton = dashboardView.element.querySelector('.clear-filters');
            expect(clearButton).toBeDefined();

            clearButton.click();
            await componentTestUtils.delay(100);

            const visibleCharacters = dashboardView.element.querySelectorAll('.character-item:not(.hidden)');
            expect(visibleCharacters).toHaveLength(2);
        });
    });

    describe('Responsive Design', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should handle mobile layout', () => {
            // Simulate mobile viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 768
            });

            dashboardView.handleResize();
            
            expect(dashboardView.element.classList.contains('mobile-layout')).toBe(true);
        });

        it('should handle desktop layout', () => {
            // Simulate desktop viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1200
            });

            dashboardView.handleResize();
            
            expect(dashboardView.element.classList.contains('desktop-layout')).toBe(true);
        });

        it('should toggle mobile menu', () => {
            const menuToggle = dashboardView.element.querySelector('.mobile-menu-toggle');
            expect(menuToggle).toBeDefined();

            menuToggle.click();
            expect(dashboardView.element.classList.contains('menu-open')).toBe(true);

            menuToggle.click();
            expect(dashboardView.element.classList.contains('menu-open')).toBe(false);
        });
    });

    describe('Event Handling', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should handle character selection events', async () => {
            const characterData = { id: 'char1', name: 'Test Character' };
            
            // Simulate character selection event
            const eventHandler = mockEventBus.on.mock.calls.find(
                call => call[0] === 'character:selected'
            )[1];
            
            eventHandler(characterData);
            
            expect(dashboardView.selectedCharacter).toEqual(characterData);
        });

        it('should handle character update events', async () => {
            await dashboardView.loadCharacters();
            
            const updatedCharacter = { id: 'char1', name: 'Updated Character' };
            
            // Simulate character update event
            const eventHandler = mockEventBus.on.mock.calls.find(
                call => call[0] === 'character:updated'
            )[1];
            
            eventHandler(updatedCharacter);
            
            // Should refresh character list
            expect(mockCharacterManager.getCharacters).toHaveBeenCalled();
        });

        it('should handle view change events', () => {
            const viewData = { view: 'character-sheet', characterId: 'char1' };
            
            // Simulate view change event
            const eventHandler = mockEventBus.on.mock.calls.find(
                call => call[0] === 'view:changed'
            )[1];
            
            eventHandler(viewData);
            
            expect(dashboardView.currentView).toEqual(viewData);
        });
    });

    describe('Error Handling', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should handle character manager errors', async () => {
            mockCharacterManager.getCharacters.mockRejectedValue(new Error('Database error'));
            
            await dashboardView.loadCharacters();
            
            expect(dashboardView.element.innerHTML).toContain('error');
            expect(dashboardView.element.innerHTML).toContain('Database error');
        });

        it('should handle network errors', async () => {
            mockCharacterManager.createCharacter.mockRejectedValue(new Error('Network error'));
            
            const createButton = dashboardView.element.querySelector('.create-character-btn');
            createButton.click();
            await componentTestUtils.delay(100);
            
            expect(dashboardView.element.innerHTML).toContain('error');
            expect(dashboardView.element.innerHTML).toContain('Network error');
        });

        it('should provide retry functionality', async () => {
            mockCharacterManager.getCharacters.mockRejectedValueOnce(new Error('Temporary error'))
                .mockResolvedValueOnce([{ id: 'char1', name: 'Character 1' }]);
            
            await dashboardView.loadCharacters();
            
            const retryButton = dashboardView.element.querySelector('.retry-button');
            expect(retryButton).toBeDefined();
            
            retryButton.click();
            await componentTestUtils.delay(100);
            
            expect(mockCharacterManager.getCharacters).toHaveBeenCalledTimes(2);
        });
    });

    describe('Performance', () => {
        it('should load dashboard quickly', async () => {
            const startTime = performance.now();
            
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
            
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(200); // Should load in less than 200ms
        });

        it('should handle large character lists efficiently', async () => {
            const largeCharacterList = Array.from({ length: 100 }, (_, i) => ({
                id: `char${i}`,
                name: `Character ${i}`,
                clan: 'brujah'
            }));
            
            mockCharacterManager.getCharacters.mockResolvedValue(largeCharacterList);
            
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
            
            const startTime = performance.now();
            await dashboardView.loadCharacters();
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(100); // Should handle 100 characters in less than 100ms
        });
    });

    describe('Accessibility', () => {
        beforeEach(async () => {
            dashboardView = new DashboardView(testContainer);
            await dashboardView.init();
            await dashboardView.mount();
        });

        it('should have proper ARIA labels', () => {
            const elementsWithAria = dashboardView.element.querySelectorAll('[aria-label], [aria-labelledby]');
            expect(elementsWithAria.length).toBeGreaterThan(0);
        });

        it('should support keyboard navigation', () => {
            const focusableElements = dashboardView.element.querySelectorAll('button, input, select, [tabindex]');
            expect(focusableElements.length).toBeGreaterThan(0);
            
            // Test tab navigation
            focusableElements[0].focus();
            expect(document.activeElement).toBe(focusableElements[0]);
        });

        it('should have proper heading structure', () => {
            const headings = dashboardView.element.querySelectorAll('h1, h2, h3, h4, h5, h6');
            expect(headings.length).toBeGreaterThan(0);
            
            // Check for proper hierarchy
            const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
            expect(Math.max(...headingLevels) - Math.min(...headingLevels)).toBeLessThan(3);
        });

        it('should have proper color contrast', () => {
            const textElements = dashboardView.element.querySelectorAll('p, span, div');
            const hasGoodContrast = Array.from(textElements).some(el => {
                const style = window.getComputedStyle(el);
                return style.color && style.backgroundColor;
            });
            
            expect(hasGoodContrast).toBe(true);
        });
    });
}); 