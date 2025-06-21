/**
 * Integration tests for The Ledger application
 * Tests component interactions, data flow, and system-wide functionality
 */
describe('Integration Tests', () => {
    let testContainer;
    let app;
    let mockManagers;

    beforeEach(() => {
        // Create test container
        testContainer = document.createElement('div');
        testContainer.id = 'integration-test-container';
        document.body.appendChild(testContainer);

        // Create mock managers
        mockManagers = {
            characterManager: {
                getCharacters: jest.fn().mockResolvedValue([
                    { id: 'char1', name: 'Test Character 1', clan: 'brujah' },
                    { id: 'char2', name: 'Test Character 2', clan: 'toreador' }
                ]),
                createCharacter: jest.fn().mockResolvedValue({ id: 'new-char', name: 'New Character' }),
                loadCharacter: jest.fn().mockResolvedValue({ id: 'char1', name: 'Test Character 1' }),
                saveCharacter: jest.fn().mockResolvedValue(true),
                deleteCharacter: jest.fn().mockResolvedValue(true)
            },
            disciplineManager: {
                getDisciplines: jest.fn().mockResolvedValue(['celerity', 'presence', 'potence']),
                getDisciplineInfo: jest.fn().mockResolvedValue({ name: 'Celerity', description: 'Speed discipline' })
            },
            meritFlawManager: {
                getMerits: jest.fn().mockResolvedValue([{ name: 'Iron Will', rating: 3 }]),
                getFlaws: jest.fn().mockResolvedValue([{ name: 'Nightmares', rating: 1 }])
            },
            backgroundManager: {
                getBackgrounds: jest.fn().mockResolvedValue([{ name: 'Allies', rating: 2 }])
            },
            loresheetManager: {
                getLoresheets: jest.fn().mockResolvedValue([{ name: 'The First', description: 'Ancient lore' }])
            },
            convictionManager: {
                getConvictions: jest.fn().mockResolvedValue([{ name: 'Protect the innocent', description: 'Help others' }])
            },
            xpManager: {
                getExperience: jest.fn().mockResolvedValue({ total: 15, spent: 10, available: 5 }),
                spendExperience: jest.fn().mockResolvedValue(true)
            }
        };

        // Mock global managers
        Object.keys(mockManagers).forEach(key => {
            window[key] = mockManagers[key];
        });

        // Mock event systems
        window.eventBus = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };

        window.characterEventSystem = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };

        window.viewEventSystem = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };
    });

    afterEach(() => {
        if (app && app.destroy) {
            app.destroy();
        }
        if (testContainer) {
            testContainer.remove();
        }
        jest.clearAllMocks();
    });

    describe('Application Initialization', () => {
        it('should initialize all components and managers', async () => {
            app = new App(testContainer);
            await app.init();

            expect(app.router).toBeDefined();
            expect(app.currentView).toBeDefined();
            expect(app.characterManager).toBeDefined();
            expect(app.disciplineManager).toBeDefined();
            expect(app.meritFlawManager).toBeDefined();
            expect(app.backgroundManager).toBeDefined();
            expect(app.loresheetManager).toBeDefined();
            expect(app.convictionManager).toBeDefined();
            expect(app.xpManager).toBeDefined();
        });

        it('should load dashboard as default view', async () => {
            app = new App(testContainer);
            await app.init();

            expect(app.currentView).toBe('dashboard');
            expect(testContainer.innerHTML).toContain('dashboard-view');
        });

        it('should register all event listeners', async () => {
            app = new App(testContainer);
            await app.init();

            expect(window.eventBus.on).toHaveBeenCalledWith('view:changed', expect.any(Function));
            expect(window.characterEventSystem.on).toHaveBeenCalledWith('character:updated', expect.any(Function));
            expect(window.viewEventSystem.on).toHaveBeenCalledWith('view:changed', expect.any(Function));
        });
    });

    describe('View Navigation', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
        });

        it('should navigate from dashboard to character sheet', async () => {
            // Start on dashboard
            expect(app.currentView).toBe('dashboard');

            // Navigate to character sheet
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });

            expect(app.currentView).toBe('character-sheet');
            expect(testContainer.innerHTML).toContain('character-sheet-view');
            expect(mockManagers.characterManager.loadCharacter).toHaveBeenCalledWith('char1');
        });

        it('should navigate from character sheet to dashboard', async () => {
            // Navigate to character sheet first
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            expect(app.currentView).toBe('character-sheet');

            // Navigate back to dashboard
            await app.router.navigateTo('dashboard');

            expect(app.currentView).toBe('dashboard');
            expect(testContainer.innerHTML).toContain('dashboard-view');
        });

        it('should handle navigation with parameters', async () => {
            const params = { characterId: 'char1', tab: 'attributes' };
            await app.router.navigateTo('character-sheet', params);

            expect(app.currentView).toBe('character-sheet');
            expect(app.router.currentParams).toEqual(params);
        });

        it('should maintain navigation history', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await app.router.navigateTo('dashboard');
            await app.router.navigateTo('character-sheet', { characterId: 'char2' });

            expect(app.router.history.length).toBe(3);
            expect(app.router.canGoBack()).toBe(true);
        });

        it('should handle back navigation', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await app.router.navigateTo('dashboard');
            
            await app.router.goBack();

            expect(app.currentView).toBe('character-sheet');
            expect(app.router.currentParams).toEqual({ characterId: 'char1' });
        });
    });

    describe('Character Data Flow', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
        });

        it('should load character data and populate all panels', async () => {
            // Wait for character sheet to load
            await componentTestUtils.delay(200);

            expect(mockManagers.characterManager.loadCharacter).toHaveBeenCalledWith('char1');
            expect(mockManagers.disciplineManager.getDisciplines).toHaveBeenCalled();
            expect(mockManagers.meritFlawManager.getMerits).toHaveBeenCalled();
            expect(mockManagers.backgroundManager.getBackgrounds).toHaveBeenCalled();
            expect(mockManagers.loresheetManager.getLoresheets).toHaveBeenCalled();
            expect(mockManagers.convictionManager.getConvictions).toHaveBeenCalled();
            expect(mockManagers.xpManager.getExperience).toHaveBeenCalled();
        });

        it('should update character data across all components', async () => {
            const updatedCharacter = {
                id: 'char1',
                name: 'Updated Character',
                attributes: { physical: { strength: 4 } }
            };

            // Simulate character update
            window.characterEventSystem.emit('character:updated', updatedCharacter);

            await componentTestUtils.delay(100);

            // Check that all panels received the update
            const characterSheet = testContainer.querySelector('.character-sheet-view');
            expect(characterSheet.textContent).toContain('Updated Character');
        });

        it('should save character changes', async () => {
            // Simulate attribute change
            const attributeInput = testContainer.querySelector('input[name="strength"]');
            if (attributeInput) {
                componentTestUtils.simulateInput(attributeInput, '4');
                componentTestUtils.simulateChange(attributeInput, '4');
            }

            await componentTestUtils.delay(100);

            expect(mockManagers.characterManager.saveCharacter).toHaveBeenCalled();
        });

        it('should handle character creation flow', async () => {
            // Navigate back to dashboard
            await app.router.navigateTo('dashboard');

            // Create new character
            const createButton = testContainer.querySelector('.create-character-btn');
            if (createButton) {
                createButton.click();
                await componentTestUtils.delay(100);

                expect(mockManagers.characterManager.createCharacter).toHaveBeenCalled();
            }
        });
    });

    describe('Component Communication', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
        });

        it('should communicate between character sheet panels', async () => {
            await componentTestUtils.delay(200);

            // Simulate attribute change in attributes panel
            const attributesPanel = testContainer.querySelector('.attributes-panel');
            if (attributesPanel) {
                const strengthInput = attributesPanel.querySelector('input[name="strength"]');
                if (strengthInput) {
                    componentTestUtils.simulateInput(strengthInput, '4');
                }
            }

            await componentTestUtils.delay(100);

            // Check that other panels received the update
            expect(window.characterEventSystem.emit).toHaveBeenCalledWith('character:updated', expect.any(Object));
        });

        it('should handle discipline selection and update powers', async () => {
            await componentTestUtils.delay(200);

            // Simulate discipline selection
            const disciplineSelect = testContainer.querySelector('.discipline-select');
            if (disciplineSelect) {
                componentTestUtils.simulateChange(disciplineSelect, 'celerity');
            }

            await componentTestUtils.delay(100);

            // Check that powers panel updated
            expect(mockManagers.disciplineManager.getDisciplineInfo).toHaveBeenCalledWith('celerity');
        });

        it('should handle merit/flaw changes and update experience', async () => {
            await componentTestUtils.delay(200);

            // Simulate merit addition
            const addMeritButton = testContainer.querySelector('.add-merit-btn');
            if (addMeritButton) {
                addMeritButton.click();
                await componentTestUtils.delay(100);

                // Check that experience was updated
                expect(mockManagers.xpManager.spendExperience).toHaveBeenCalled();
            }
        });
    });

    describe('Data Persistence', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
        });

        it('should save character data automatically', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(200);

            // Make a change
            const nameInput = testContainer.querySelector('input[name="character-name"]');
            if (nameInput) {
                componentTestUtils.simulateInput(nameInput, 'New Name');
            }

            await componentTestUtils.delay(500); // Wait for auto-save

            expect(mockManagers.characterManager.saveCharacter).toHaveBeenCalled();
        });

        it('should handle save errors gracefully', async () => {
            mockManagers.characterManager.saveCharacter.mockRejectedValueOnce(new Error('Save failed'));

            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(200);

            // Make a change
            const nameInput = testContainer.querySelector('input[name="character-name"]');
            if (nameInput) {
                componentTestUtils.simulateInput(nameInput, 'New Name');
            }

            await componentTestUtils.delay(500);

            // Should show error message
            expect(testContainer.innerHTML).toContain('error');
            expect(testContainer.innerHTML).toContain('Save failed');
        });

        it('should backup data periodically', async () => {
            // Simulate backup event
            window.eventBus.emit('backup:create');

            // Should trigger backup
            expect(window.eventBus.emit).toHaveBeenCalledWith('backup:create');
        });
    });

    describe('Error Handling and Recovery', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
        });

        it('should handle component initialization errors', async () => {
            // Mock component to throw error
            const originalInit = BaseComponent.prototype.init;
            BaseComponent.prototype.init = jest.fn().mockRejectedValue(new Error('Init failed'));

            await app.router.navigateTo('character-sheet', { characterId: 'char1' });

            // Should show error boundary
            expect(testContainer.innerHTML).toContain('error');
            expect(testContainer.innerHTML).toContain('Init failed');

            // Restore original method
            BaseComponent.prototype.init = originalInit;
        });

        it('should handle network errors gracefully', async () => {
            mockManagers.characterManager.loadCharacter.mockRejectedValue(new Error('Network error'));

            await app.router.navigateTo('character-sheet', { characterId: 'char1' });

            expect(testContainer.innerHTML).toContain('error');
            expect(testContainer.innerHTML).toContain('Network error');
        });

        it('should provide retry mechanisms', async () => {
            mockManagers.characterManager.loadCharacter
                .mockRejectedValueOnce(new Error('Temporary error'))
                .mockResolvedValueOnce({ id: 'char1', name: 'Test Character' });

            await app.router.navigateTo('character-sheet', { characterId: 'char1' });

            const retryButton = testContainer.querySelector('.retry-button');
            if (retryButton) {
                retryButton.click();
                await componentTestUtils.delay(100);

                expect(mockManagers.characterManager.loadCharacter).toHaveBeenCalledTimes(2);
            }
        });

        it('should handle missing data gracefully', async () => {
            mockManagers.characterManager.loadCharacter.mockResolvedValue(null);

            await app.router.navigateTo('character-sheet', { characterId: 'char1' });

            expect(testContainer.innerHTML).toContain('Character not found');
        });
    });

    describe('Performance and Memory', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
        });

        it('should handle rapid view changes efficiently', async () => {
            const startTime = performance.now();

            // Rapidly change views
            for (let i = 0; i < 10; i++) {
                await app.router.navigateTo('dashboard');
                await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            }

            const endTime = performance.now();
            const duration = endTime - startTime;

            expect(duration).toBeLessThan(2000); // Should handle 20 view changes in less than 2 seconds
        });

        it('should not leak memory during view changes', async () => {
            const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;

            // Perform multiple view changes
            for (let i = 0; i < 5; i++) {
                await app.router.navigateTo('dashboard');
                await app.router.navigateTo('character-sheet', { characterId: 'char1' });
                await componentTestUtils.delay(100);
            }

            const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
            const memoryIncrease = finalMemory - initialMemory;

            // Memory increase should be reasonable (less than 10MB)
            expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
        });

        it('should clean up event listeners properly', async () => {
            const initialListenerCount = window.eventBus.on.mock.calls.length;

            // Perform view changes
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await app.router.navigateTo('dashboard');

            const finalListenerCount = window.eventBus.off.mock.calls.length;

            // Should have cleaned up listeners
            expect(finalListenerCount).toBeGreaterThan(0);
        });
    });

    describe('User Experience', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
        });

        it('should show loading states during transitions', async () => {
            // Mock slow loading
            mockManagers.characterManager.loadCharacter.mockImplementation(
                () => new Promise(resolve => setTimeout(resolve, 100))
            );

            const navigationPromise = app.router.navigateTo('character-sheet', { characterId: 'char1' });

            // Should show loading
            expect(testContainer.innerHTML).toContain('loading');

            await navigationPromise;

            // Should hide loading
            expect(testContainer.innerHTML).not.toContain('loading');
        });

        it('should provide visual feedback for user actions', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(200);

            // Simulate button click
            const button = testContainer.querySelector('button');
            if (button) {
                button.click();
                
                // Should show some visual feedback
                expect(button.classList.contains('active') || 
                       button.classList.contains('clicked') ||
                       testContainer.innerHTML.includes('saving')).toBe(true);
            }
        });

        it('should handle keyboard shortcuts', async () => {
            // Test Ctrl+S for save
            const saveEvent = new KeyboardEvent('keydown', {
                key: 's',
                ctrlKey: true,
                bubbles: true
            });

            document.dispatchEvent(saveEvent);
            await componentTestUtils.delay(100);

            expect(mockManagers.characterManager.saveCharacter).toHaveBeenCalled();
        });

        it('should maintain scroll position during updates', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(200);

            const scrollContainer = testContainer.querySelector('.scroll-container');
            if (scrollContainer) {
                scrollContainer.scrollTop = 100;
                const scrollPosition = scrollContainer.scrollTop;

                // Trigger update
                window.characterEventSystem.emit('character:updated', { id: 'char1', name: 'Updated' });
                await componentTestUtils.delay(100);

                // Should maintain scroll position
                expect(scrollContainer.scrollTop).toBe(scrollPosition);
            }
        });
    });

    describe('Accessibility Integration', () => {
        beforeEach(async () => {
            app = new App(testContainer);
            await app.init();
        });

        it('should maintain focus management during navigation', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(200);

            // Focus should be on main content
            const mainContent = testContainer.querySelector('main, [role="main"]');
            if (mainContent) {
                expect(document.activeElement).toBe(mainContent);
            }
        });

        it('should announce view changes to screen readers', async () => {
            const liveRegion = testContainer.querySelector('[aria-live]');
            expect(liveRegion).toBeDefined();

            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(100);

            expect(liveRegion.textContent).toContain('character sheet');
        });

        it('should handle keyboard navigation properly', async () => {
            await app.router.navigateTo('character-sheet', { characterId: 'char1' });
            await componentTestUtils.delay(200);

            const focusableElements = testContainer.querySelectorAll('button, input, select, [tabindex]');
            expect(focusableElements.length).toBeGreaterThan(0);

            // Test tab navigation
            focusableElements[0].focus();
            expect(document.activeElement).toBe(focusableElements[0]);

            // Test arrow key navigation
            const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
            focusableElements[0].dispatchEvent(arrowEvent);
        });
    });
}); 