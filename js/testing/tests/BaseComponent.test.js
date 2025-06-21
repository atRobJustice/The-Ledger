/**
 * Unit tests for BaseComponent
 */
describe('BaseComponent', () => {
    let testContainer;
    let component;
    let mockEventBus;
    let mockCharacterEventSystem;
    let mockViewEventSystem;

    beforeEach(() => {
        // Create test container
        testContainer = document.createElement('div');
        testContainer.id = 'test-container';
        document.body.appendChild(testContainer);

        // Create mock event systems
        mockEventBus = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };

        mockCharacterEventSystem = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };

        mockViewEventSystem = {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
            once: jest.fn()
        };

        // Mock global event systems
        window.eventBus = mockEventBus;
        window.characterEventSystem = mockCharacterEventSystem;
        window.viewEventSystem = mockViewEventSystem;
    });

    afterEach(() => {
        if (component && component.unmount) {
            component.unmount();
        }
        if (testContainer) {
            testContainer.remove();
        }
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        it('should create component with proper element', () => {
            component = new BaseComponent(testContainer);
            
            expect(component).toBeDefined();
            expect(component.element).toBe(testContainer);
            expect(component.isMounted).toBe(false);
            expect(component.isInitialized).toBe(false);
        });

        it('should initialize with options', () => {
            const options = {
                id: 'test-component',
                className: 'test-class',
                data: { test: 'value' }
            };

            component = new BaseComponent(testContainer, options);
            
            expect(component.id).toBe('test-component');
            expect(component.className).toBe('test-class');
            expect(component.data).toEqual({ test: 'value' });
        });

        it('should generate unique ID if not provided', () => {
            component = new BaseComponent(testContainer);
            
            expect(component.id).toBeDefined();
            expect(component.id).toContain('component-');
        });
    });

    describe('Lifecycle Methods', () => {
        beforeEach(() => {
            component = new BaseComponent(testContainer);
        });

        it('should initialize component', async () => {
            await component.init();
            
            expect(component.isInitialized).toBe(true);
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:initialized', {
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should mount component', async () => {
            await component.init();
            await component.mount();
            
            expect(component.isMounted).toBe(true);
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:mounted', {
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should unmount component', async () => {
            await component.init();
            await component.mount();
            await component.unmount();
            
            expect(component.isMounted).toBe(false);
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:unmounted', {
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should render component', async () => {
            await component.init();
            await component.mount();
            await component.render();
            
            expect(component.element.innerHTML).toBeTruthy();
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:rendered', {
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should handle lifecycle in correct order', async () => {
            const lifecycleOrder = [];
            
            // Override lifecycle methods to track order
            component.init = async function() {
                await BaseComponent.prototype.init.call(this);
                lifecycleOrder.push('init');
            };
            
            component.mount = async function() {
                await BaseComponent.prototype.mount.call(this);
                lifecycleOrder.push('mount');
            };
            
            component.render = async function() {
                await BaseComponent.prototype.render.call(this);
                lifecycleOrder.push('render');
            };
            
            await component.init();
            await component.mount();
            await component.render();
            
            expect(lifecycleOrder).toEqual(['init', 'mount', 'render']);
        });
    });

    describe('Event Handling', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should register event listeners on initialization', () => {
            expect(mockEventBus.on).toHaveBeenCalledWith('component:error', expect.any(Function));
            expect(mockCharacterEventSystem.on).toHaveBeenCalledWith('character:updated', expect.any(Function));
            expect(mockViewEventSystem.on).toHaveBeenCalledWith('view:changed', expect.any(Function));
        });

        it('should handle character update events', () => {
            const characterData = { id: 'test', name: 'Test Character' };
            
            // Simulate character update event
            const eventHandler = mockCharacterEventSystem.on.mock.calls.find(
                call => call[0] === 'character:updated'
            )[1];
            
            eventHandler(characterData);
            
            expect(component.characterData).toEqual(characterData);
        });

        it('should handle view change events', () => {
            const viewData = { view: 'character-sheet', characterId: 'test' };
            
            // Simulate view change event
            const eventHandler = mockViewEventSystem.on.mock.calls.find(
                call => call[0] === 'view:changed'
            )[1];
            
            eventHandler(viewData);
            
            expect(component.currentView).toEqual(viewData);
        });

        it('should emit component events', () => {
            component.emit('test:event', { data: 'test' });
            
            expect(mockEventBus.emit).toHaveBeenCalledWith('test:event', {
                data: 'test',
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should clean up event listeners on unmount', async () => {
            await component.mount();
            await component.unmount();
            
            expect(mockEventBus.off).toHaveBeenCalled();
            expect(mockCharacterEventSystem.off).toHaveBeenCalled();
            expect(mockViewEventSystem.off).toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should handle errors gracefully', () => {
            const error = new Error('Test error');
            
            // Simulate error event
            const errorHandler = mockEventBus.on.mock.calls.find(
                call => call[0] === 'component:error'
            )[1];
            
            errorHandler({ error, componentId: component.id });
            
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:error', {
                error,
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should show error UI when error occurs', async () => {
            component.showError('Test error message');
            
            expect(component.element.innerHTML).toContain('Test error message');
            expect(component.element.innerHTML).toContain('error-message');
        });

        it('should handle retry functionality', async () => {
            const retrySpy = jest.fn();
            component.retryAction = retrySpy;
            
            component.showError('Test error', retrySpy);
            
            const retryButton = component.element.querySelector('.retry-button');
            expect(retryButton).toBeDefined();
            
            // Simulate retry click
            retryButton.click();
            
            expect(retrySpy).toHaveBeenCalled();
        });

        it('should clear error when resolved', () => {
            component.showError('Test error');
            component.clearError();
            
            expect(component.element.querySelector('.error-message')).toBeNull();
        });
    });

    describe('Loading States', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should show loading state', () => {
            component.showLoading('Loading...');
            
            expect(component.element.innerHTML).toContain('Loading...');
            expect(component.element.innerHTML).toContain('loading-spinner');
        });

        it('should hide loading state', () => {
            component.showLoading('Loading...');
            component.hideLoading();
            
            expect(component.element.querySelector('.loading-spinner')).toBeNull();
        });

        it('should show progress during loading', () => {
            component.showLoading('Loading...', 50);
            
            const progressBar = component.element.querySelector('.progress-bar');
            expect(progressBar).toBeDefined();
            expect(progressBar.style.width).toBe('50%');
        });
    });

    describe('Data Binding', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should update data and trigger re-render', async () => {
            await component.mount();
            
            const originalHTML = component.element.innerHTML;
            
            component.updateData({ newProperty: 'new value' });
            
            expect(component.data.newProperty).toBe('new value');
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:data:updated', {
                componentId: component.id,
                componentType: 'BaseComponent',
                data: component.data
            });
        });

        it('should bind data to template', () => {
            component.data = { name: 'Test', value: 42 };
            component.template = '<div>Name: {{name}}, Value: {{value}}</div>';
            
            const result = component.bindData();
            
            expect(result).toBe('<div>Name: Test, Value: 42</div>');
        });

        it('should handle missing data gracefully', () => {
            component.template = '<div>Name: {{name}}, Value: {{value}}</div>';
            
            const result = component.bindData();
            
            expect(result).toBe('<div>Name: , Value: </div>');
        });
    });

    describe('Utility Methods', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should find elements within component', () => {
            component.element.innerHTML = '<div id="test">Test</div><span class="item">Item</span>';
            
            const byId = component.findById('test');
            const byClass = component.findByClass('item');
            const byTag = component.findByTag('div');
            
            expect(byId).toBeDefined();
            expect(byClass).toBeDefined();
            expect(byTag).toBeDefined();
            expect(byId.textContent).toBe('Test');
        });

        it('should add and remove CSS classes', () => {
            component.addClass('test-class');
            expect(component.element.classList.contains('test-class')).toBe(true);
            
            component.removeClass('test-class');
            expect(component.element.classList.contains('test-class')).toBe(false);
        });

        it('should set and get attributes', () => {
            component.setAttribute('data-test', 'value');
            expect(component.getAttribute('data-test')).toBe('value');
        });

        it('should handle component state', () => {
            component.setState({ loading: true, error: null });
            expect(component.state.loading).toBe(true);
            expect(component.state.error).toBe(null);
        });
    });

    describe('Integration with Error Boundary', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should be wrapped by error boundary', () => {
            expect(component.errorBoundary).toBeDefined();
            expect(component.errorBoundary.component).toBe(component);
        });

        it('should handle errors through error boundary', async () => {
            const error = new Error('Test error');
            
            // Simulate error in component
            await component.errorBoundary.handleError(error);
            
            expect(component.element.innerHTML).toContain('Test error');
            expect(mockEventBus.emit).toHaveBeenCalledWith('component:error', {
                error,
                componentId: component.id,
                componentType: 'BaseComponent'
            });
        });

        it('should retry through error boundary', async () => {
            const retrySpy = jest.fn();
            component.retryAction = retrySpy;
            
            await component.errorBoundary.handleError(new Error('Test error'), retrySpy);
            
            const retryButton = component.element.querySelector('.retry-button');
            retryButton.click();
            
            expect(retrySpy).toHaveBeenCalled();
        });
    });

    describe('Integration with Loading State Manager', () => {
        beforeEach(async () => {
            component = new BaseComponent(testContainer);
            await component.init();
        });

        it('should use loading state manager', () => {
            expect(component.loadingManager).toBeDefined();
        });

        it('should show loading during initialization', async () => {
            const loadingSpy = jest.spyOn(component.loadingManager, 'showLoading');
            
            await component.init();
            
            expect(loadingSpy).toHaveBeenCalled();
        });

        it('should hide loading after initialization', async () => {
            const hideSpy = jest.spyOn(component.loadingManager, 'hideLoading');
            
            await component.init();
            
            expect(hideSpy).toHaveBeenCalled();
        });
    });

    describe('Memory Management', () => {
        it('should clean up resources on unmount', async () => {
            component = new BaseComponent(testContainer);
            await component.init();
            await component.mount();
            
            const eventListeners = component.eventListeners.length;
            
            await component.unmount();
            
            expect(component.eventListeners.length).toBe(0);
            expect(mockEventBus.off).toHaveBeenCalledTimes(eventListeners);
        });

        it('should prevent memory leaks', async () => {
            component = new BaseComponent(testContainer);
            await component.init();
            
            // Simulate multiple mount/unmount cycles
            for (let i = 0; i < 5; i++) {
                await component.mount();
                await component.unmount();
            }
            
            // Check that event listeners are properly cleaned up
            expect(component.eventListeners.length).toBe(0);
        });
    });

    describe('Performance', () => {
        it('should initialize quickly', async () => {
            const startTime = performance.now();
            
            component = new BaseComponent(testContainer);
            await component.init();
            
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(100); // Should initialize in less than 100ms
        });

        it('should render efficiently', async () => {
            component = new BaseComponent(testContainer);
            await component.init();
            await component.mount();
            
            const startTime = performance.now();
            await component.render();
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            expect(duration).toBeLessThan(50); // Should render in less than 50ms
        });
    });
}); 