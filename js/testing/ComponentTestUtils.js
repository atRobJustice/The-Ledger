/**
 * ComponentTestUtils - Utilities for testing components
 * Provides DOM manipulation, event simulation, and component lifecycle testing
 */
class ComponentTestUtils {
    constructor() {
        this.testContainer = null;
        this.originalConsole = { ...console };
        this.consoleSpies = new Map();
    }

    /**
     * Create a test container for component testing
     */
    createTestContainer() {
        if (this.testContainer) {
            this.cleanupTestContainer();
        }

        this.testContainer = document.createElement('div');
        this.testContainer.id = 'component-test-container';
        this.testContainer.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 1000px;
            height: 1000px;
            overflow: hidden;
        `;
        
        document.body.appendChild(this.testContainer);
        return this.testContainer;
    }

    /**
     * Cleanup test container
     */
    cleanupTestContainer() {
        if (this.testContainer) {
            this.testContainer.remove();
            this.testContainer = null;
        }
    }

    /**
     * Create a component instance for testing
     */
    async createComponent(ComponentClass, options = {}) {
        const container = this.createTestContainer();
        const component = new ComponentClass(container, options);
        
        // Wait for component to initialize
        if (component.init) {
            await component.init();
        }
        
        return { component, container };
    }

    /**
     * Simulate user events
     */
    simulateEvent(element, eventType, options = {}) {
        const event = new Event(eventType, {
            bubbles: true,
            cancelable: true,
            ...options
        });
        
        element.dispatchEvent(event);
        return event;
    }

    /**
     * Simulate click event
     */
    simulateClick(element, options = {}) {
        return this.simulateEvent(element, 'click', options);
    }

    /**
     * Simulate input event
     */
    simulateInput(element, value, options = {}) {
        element.value = value;
        return this.simulateEvent(element, 'input', options);
    }

    /**
     * Simulate change event
     */
    simulateChange(element, value, options = {}) {
        element.value = value;
        return this.simulateEvent(element, 'change', options);
    }

    /**
     * Simulate keydown event
     */
    simulateKeydown(element, key, options = {}) {
        return this.simulateEvent(element, 'keydown', {
            key,
            code: `Key${key.toUpperCase()}`,
            ...options
        });
    }

    /**
     * Simulate mouse events
     */
    simulateMouseEvent(element, eventType, options = {}) {
        const event = new MouseEvent(eventType, {
            bubbles: true,
            cancelable: true,
            view: window,
            ...options
        });
        
        element.dispatchEvent(event);
        return event;
    }

    /**
     * Simulate drag and drop
     */
    simulateDragAndDrop(dragElement, dropElement, options = {}) {
        const dragStart = this.simulateMouseEvent(dragElement, 'dragstart', options);
        const dragOver = this.simulateMouseEvent(dropElement, 'dragover', options);
        const drop = this.simulateMouseEvent(dropElement, 'drop', options);
        const dragEnd = this.simulateMouseEvent(dragElement, 'dragend', options);
        
        return { dragStart, dragOver, drop, dragEnd };
    }

    /**
     * Wait for element to be present in DOM
     */
    async waitForElement(selector, timeout = 5000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            const element = document.querySelector(selector);
            if (element) {
                return element;
            }
            await this.delay(100);
        }
        
        throw new Error(`Element ${selector} not found within ${timeout}ms`);
    }

    /**
     * Wait for element to be removed from DOM
     */
    async waitForElementRemoval(selector, timeout = 5000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            const element = document.querySelector(selector);
            if (!element) {
                return true;
            }
            await this.delay(100);
        }
        
        throw new Error(`Element ${selector} still present after ${timeout}ms`);
    }

    /**
     * Wait for condition to be true
     */
    async waitFor(condition, timeout = 5000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeout) {
            if (await condition()) {
                return true;
            }
            await this.delay(100);
        }
        
        throw new Error(`Condition not met within ${timeout}ms`);
    }

    /**
     * Delay execution
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Mock console methods
     */
    mockConsole(methods = ['log', 'warn', 'error']) {
        methods.forEach(method => {
            const spy = jest.fn();
            this.consoleSpies.set(method, spy);
            console[method] = spy;
        });
    }

    /**
     * Restore console methods
     */
    restoreConsole() {
        this.consoleSpies.forEach((spy, method) => {
            console[method] = this.originalConsole[method];
        });
        this.consoleSpies.clear();
    }

    /**
     * Get console calls
     */
    getConsoleCalls(method) {
        const spy = this.consoleSpies.get(method);
        return spy ? spy.mock.calls : [];
    }

    /**
     * Create mock data for testing
     */
    createMockCharacter() {
        return {
            id: 'test-character-1',
            name: 'Test Character',
            clan: 'brujah',
            generation: 13,
            attributes: {
                physical: { strength: 3, dexterity: 2, stamina: 3 },
                social: { charisma: 2, manipulation: 3, composure: 2 },
                mental: { intelligence: 3, wits: 2, resolve: 3 }
            },
            skills: {
                physical: { athletics: 2, brawl: 3, drive: 1 },
                social: { empathy: 2, expression: 1, intimidation: 2 },
                mental: { academics: 1, awareness: 2, investigation: 1 }
            },
            disciplines: {
                celerity: 2,
                presence: 1
            },
            backgrounds: {
                allies: 2,
                contacts: 1
            },
            merits: [
                { name: 'Iron Will', rating: 3 },
                { name: 'Danger Sense', rating: 2 }
            ],
            flaws: [
                { name: 'Nightmares', rating: 1 }
            ],
            convictions: [
                { name: 'Protect the innocent', description: 'Always help those in need' }
            ],
            humanity: 7,
            bloodPotency: 1,
            experience: {
                total: 15,
                spent: 10,
                available: 5
            }
        };
    }

    /**
     * Create mock manager
     */
    createMockManager(methods = {}) {
        const manager = {};
        
        Object.keys(methods).forEach(method => {
            manager[method] = jest.fn().mockImplementation(methods[method]);
        });
        
        return manager;
    }

    /**
     * Test component lifecycle
     */
    async testComponentLifecycle(ComponentClass, options = {}) {
        const { component, container } = await this.createComponent(ComponentClass, options);
        
        // Test initialization
        expect(component).toBeDefined();
        expect(component.element).toBeDefined();
        
        // Test mounting
        if (component.mount) {
            await component.mount();
            expect(component.isMounted).toBe(true);
        }
        
        // Test rendering
        if (component.render) {
            await component.render();
            expect(component.element.innerHTML).toBeTruthy();
        }
        
        // Test unmounting
        if (component.unmount) {
            await component.unmount();
            expect(component.isMounted).toBe(false);
        }
        
        this.cleanupTestContainer();
        return component;
    }

    /**
     * Test component event handling
     */
    async testComponentEvents(ComponentClass, eventTests = [], options = {}) {
        const { component, container } = await this.createComponent(ComponentClass, options);
        
        if (component.mount) {
            await component.mount();
        }
        
        const results = [];
        
        for (const test of eventTests) {
            const { event, element, expected } = test;
            
            // Find element
            const targetElement = typeof element === 'string' 
                ? container.querySelector(element) 
                : element;
            
            if (!targetElement) {
                throw new Error(`Element not found: ${element}`);
            }
            
            // Simulate event
            const eventResult = this.simulateEvent(targetElement, event.type, event.options);
            
            // Wait for any async operations
            await this.delay(100);
            
            // Check expected results
            if (expected) {
                for (const [key, value] of Object.entries(expected)) {
                    if (typeof value === 'function') {
                        expect(value(component)).toBeTruthy();
                    } else {
                        expect(component[key]).toEqual(value);
                    }
                }
            }
            
            results.push({ event: event.type, element, result: eventResult });
        }
        
        this.cleanupTestContainer();
        return results;
    }

    /**
     * Test component data binding
     */
    async testComponentDataBinding(ComponentClass, dataTests = [], options = {}) {
        const { component, container } = await this.createComponent(ComponentClass, options);
        
        if (component.mount) {
            await component.mount();
        }
        
        const results = [];
        
        for (const test of dataTests) {
            const { property, value, expected } = test;
            
            // Set property
            component[property] = value;
            
            // Wait for updates
            await this.delay(100);
            
            // Check expected results
            if (expected) {
                for (const [key, expectedValue] of Object.entries(expected)) {
                    if (typeof expectedValue === 'function') {
                        expect(expectedValue(component)).toBeTruthy();
                    } else {
                        expect(component[key]).toEqual(expectedValue);
                    }
                }
            }
            
            results.push({ property, value, success: true });
        }
        
        this.cleanupTestContainer();
        return results;
    }

    /**
     * Test component accessibility
     */
    async testComponentAccessibility(ComponentClass, options = {}) {
        const { component, container } = await this.createComponent(ComponentClass, options);
        
        if (component.mount) {
            await component.mount();
        }
        
        const results = {
            hasRole: false,
            hasLabel: false,
            hasFocusable: false,
            hasKeyboardNavigation: false,
            hasScreenReaderSupport: false
        };
        
        // Check for ARIA roles
        const elementsWithRole = container.querySelectorAll('[role]');
        results.hasRole = elementsWithRole.length > 0;
        
        // Check for labels
        const elementsWithLabel = container.querySelectorAll('label, [aria-label], [aria-labelledby]');
        results.hasLabel = elementsWithLabel.length > 0;
        
        // Check for focusable elements
        const focusableElements = container.querySelectorAll('button, input, select, textarea, [tabindex]');
        results.hasFocusable = focusableElements.length > 0;
        
        // Test keyboard navigation
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            firstElement.focus();
            results.hasKeyboardNavigation = document.activeElement === firstElement;
        }
        
        // Check for screen reader support
        const screenReaderElements = container.querySelectorAll('[aria-describedby], [aria-live], [aria-hidden]');
        results.hasScreenReaderSupport = screenReaderElements.length > 0;
        
        this.cleanupTestContainer();
        return results;
    }

    /**
     * Test component performance
     */
    async testComponentPerformance(ComponentClass, iterations = 100, options = {}) {
        const results = {
            creationTime: [],
            renderTime: [],
            memoryUsage: []
        };
        
        for (let i = 0; i < iterations; i++) {
            const startTime = performance.now();
            const { component, container } = await this.createComponent(ComponentClass, options);
            
            const creationTime = performance.now() - startTime;
            results.creationTime.push(creationTime);
            
            if (component.render) {
                const renderStart = performance.now();
                await component.render();
                const renderTime = performance.now() - renderStart;
                results.renderTime.push(renderTime);
            }
            
            this.cleanupTestContainer();
            
            // Force garbage collection if available
            if (window.gc) {
                window.gc();
            }
        }
        
        return {
            averageCreationTime: results.creationTime.reduce((a, b) => a + b, 0) / results.creationTime.length,
            averageRenderTime: results.renderTime.reduce((a, b) => a + b, 0) / results.renderTime.length,
            maxCreationTime: Math.max(...results.creationTime),
            maxRenderTime: Math.max(...results.renderTime),
            minCreationTime: Math.min(...results.creationTime),
            minRenderTime: Math.min(...results.renderTime)
        };
    }

    /**
     * Test component error handling
     */
    async testComponentErrorHandling(ComponentClass, errorScenarios = [], options = {}) {
        const results = [];
        
        for (const scenario of errorScenarios) {
            const { name, setup, expectedError } = scenario;
            
            try {
                // Setup error condition
                if (setup) {
                    await setup();
                }
                
                // Try to create component
                const { component, container } = await this.createComponent(ComponentClass, options);
                
                // If we get here, no error was thrown
                results.push({
                    scenario: name,
                    success: true,
                    error: null
                });
                
                this.cleanupTestContainer();
                
            } catch (error) {
                results.push({
                    scenario: name,
                    success: false,
                    error: error.message,
                    expectedError: expectedError
                });
            }
        }
        
        return results;
    }
}

// Create and export the component test utils instance
const componentTestUtils = new ComponentTestUtils();

// Add to window for global access
window.componentTestUtils = componentTestUtils;

// Remove ES6 export - use traditional script loading
// export default componentTestUtils; 