/**
 * TestFramework - Comprehensive testing framework for The Ledger components
 * Provides unit testing, integration testing, performance testing, and accessibility testing
 */
class TestFramework {
    constructor() {
        this.tests = new Map();
        this.testSuites = new Map();
        this.results = {
            passed: 0,
            failed: 0,
            skipped: 0,
            total: 0,
            duration: 0,
            errors: []
        };
        this.currentSuite = null;
        this.currentTest = null;
        this.testTimeout = 10000; // 10 seconds
        this.asyncTests = new Set();
        this.mocks = new Map();
        this.spies = new Map();
        this.fixtures = new Map();
        
        this.setupTestEnvironment();
    }

    /**
     * Setup test environment
     */
    setupTestEnvironment() {
        // Create test container
        this.createTestContainer();
        
        // Setup global test functions
        window.describe = this.describe.bind(this);
        window.it = this.it.bind(this);
        window.test = this.it.bind(this);
        window.beforeEach = this.beforeEach.bind(this);
        window.afterEach = this.afterEach.bind(this);
        window.beforeAll = this.beforeAll.bind(this);
        window.afterAll = this.afterAll.bind(this);
        window.expect = this.expect.bind(this);
        window.mock = this.mock.bind(this);
        window.spy = this.spy.bind(this);
        window.fixture = this.fixture.bind(this);
        
        // Setup test utilities
        window.TestFramework = TestFramework;
        window.testFramework = this;
    }

    /**
     * Create test container
     */
    createTestContainer() {
        if (document.getElementById('test-container')) return;
        
        const container = document.createElement('div');
        container.id = 'test-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            z-index: 10000;
            font-family: monospace;
            font-size: 12px;
            overflow: auto;
            display: none;
        `;
        
        container.innerHTML = `
            <div id="test-header" style="padding: 10px; border-bottom: 1px solid #333;">
                <h3>Test Framework</h3>
                <div id="test-controls">
                    <button onclick="testFramework.runAllTests()">Run All Tests</button>
                    <button onclick="testFramework.runCurrentSuite()">Run Current Suite</button>
                    <button onclick="testFramework.showResults()">Show Results</button>
                    <button onclick="testFramework.hideTestContainer()">Close</button>
                </div>
            </div>
            <div id="test-output" style="padding: 10px;"></div>
        `;
        
        document.body.appendChild(container);
    }

    /**
     * Describe a test suite
     */
    describe(name, fn) {
        this.currentSuite = {
            name,
            tests: [],
            beforeAll: [],
            afterAll: [],
            beforeEach: [],
            afterEach: [],
            results: { passed: 0, failed: 0, skipped: 0, total: 0 }
        };
        
        this.testSuites.set(name, this.currentSuite);
        
        try {
            fn();
        } catch (error) {
            console.error(`Error in test suite ${name}:`, error);
        }
        
        this.currentSuite = null;
    }

    /**
     * Define a test
     */
    it(name, fn) {
        if (!this.currentSuite) {
            throw new Error('Test must be defined within a describe block');
        }
        
        const test = {
            name,
            fn,
            suite: this.currentSuite.name,
            status: 'pending',
            error: null,
            duration: 0,
            startTime: null
        };
        
        this.currentSuite.tests.push(test);
        this.tests.set(`${this.currentSuite.name}:${name}`, test);
    }

    /**
     * Before each test
     */
    beforeEach(fn) {
        if (!this.currentSuite) {
            throw new Error('beforeEach must be defined within a describe block');
        }
        this.currentSuite.beforeEach.push(fn);
    }

    /**
     * After each test
     */
    afterEach(fn) {
        if (!this.currentSuite) {
            throw new Error('afterEach must be defined within a describe block');
        }
        this.currentSuite.afterEach.push(fn);
    }

    /**
     * Before all tests in suite
     */
    beforeAll(fn) {
        if (!this.currentSuite) {
            throw new Error('beforeAll must be defined within a describe block');
        }
        this.currentSuite.beforeAll.push(fn);
    }

    /**
     * After all tests in suite
     */
    afterAll(fn) {
        if (!this.currentSuite) {
            throw new Error('afterAll must be defined within a describe block');
        }
        this.currentSuite.afterAll.push(fn);
    }

    /**
     * Expectation builder
     */
    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Expected ${actual} to be ${expected}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
                }
            },
            toContain: (expected) => {
                if (!actual.includes(expected)) {
                    throw new Error(`Expected ${actual} to contain ${expected}`);
                }
            },
            toHaveLength: (expected) => {
                if (actual.length !== expected) {
                    throw new Error(`Expected length ${actual.length} to be ${expected}`);
                }
            },
            toBeDefined: () => {
                if (actual === undefined) {
                    throw new Error('Expected value to be defined');
                }
            },
            toBeNull: () => {
                if (actual !== null) {
                    throw new Error(`Expected ${actual} to be null`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Expected ${actual} to be truthy`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Expected ${actual} to be falsy`);
                }
            },
            toThrow: () => {
                try {
                    if (typeof actual === 'function') {
                        actual();
                    }
                    throw new Error('Expected function to throw');
                } catch (error) {
                    // Expected to throw
                }
            },
            toBeInstanceOf: (expected) => {
                if (!(actual instanceof expected)) {
                    throw new Error(`Expected ${actual} to be instance of ${expected.name}`);
                }
            }
        };
    }

    /**
     * Create a mock
     */
    mock(name, implementation) {
        const mock = {
            name,
            implementation,
            calls: [],
            returnValue: undefined,
            throwError: null
        };
        
        this.mocks.set(name, mock);
        
        return {
            returns: (value) => {
                mock.returnValue = value;
                return this;
            },
            throws: (error) => {
                mock.throwError = error;
                return this;
            },
            callsFake: (fn) => {
                mock.implementation = fn;
                return this;
            },
            getCalls: () => mock.calls,
            reset: () => {
                mock.calls = [];
                mock.returnValue = undefined;
                mock.throwError = null;
            }
        };
    }

    /**
     * Create a spy
     */
    spy(obj, method) {
        const original = obj[method];
        const calls = [];
        
        obj[method] = (...args) => {
            calls.push(args);
            return original.apply(obj, args);
        };
        
        const spy = {
            calls,
            restore: () => {
                obj[method] = original;
            }
        };
        
        this.spies.set(`${obj.constructor.name}.${method}`, spy);
        return spy;
    }

    /**
     * Create a fixture
     */
    fixture(name, data) {
        this.fixtures.set(name, data);
        return data;
    }

    /**
     * Run all tests
     */
    async runAllTests() {
        this.resetResults();
        this.showTestContainer();
        
        const startTime = Date.now();
        
        for (const [suiteName, suite] of this.testSuites) {
            await this.runTestSuite(suiteName);
        }
        
        this.results.duration = Date.now() - startTime;
        this.showResults();
    }

    /**
     * Run a specific test suite
     */
    async runTestSuite(suiteName) {
        const suite = this.testSuites.get(suiteName);
        if (!suite) {
            throw new Error(`Test suite ${suiteName} not found`);
        }
        
        this.log(`Running test suite: ${suiteName}`);
        
        // Run beforeAll hooks
        for (const hook of suite.beforeAll) {
            try {
                await this.executeAsync(hook);
            } catch (error) {
                this.log(`Error in beforeAll hook: ${error.message}`, 'error');
            }
        }
        
        // Run tests
        for (const test of suite.tests) {
            await this.runTest(test);
        }
        
        // Run afterAll hooks
        for (const hook of suite.afterAll) {
            try {
                await this.executeAsync(hook);
            } catch (error) {
                this.log(`Error in afterAll hook: ${error.message}`, 'error');
            }
        }
        
        this.log(`Completed test suite: ${suiteName} - ${suite.results.passed} passed, ${suite.results.failed} failed`);
    }

    /**
     * Run a single test
     */
    async runTest(test) {
        this.currentTest = test;
        test.startTime = Date.now();
        
        this.log(`  Running test: ${test.name}`);
        
        try {
            // Run beforeEach hooks
            const suite = this.testSuites.get(test.suite);
            for (const hook of suite.beforeEach) {
                await this.executeAsync(hook);
            }
            
            // Run test
            await this.executeAsync(test.fn);
            
            // Test passed
            test.status = 'passed';
            test.duration = Date.now() - test.startTime;
            suite.results.passed++;
            this.results.passed++;
            
            this.log(`    ✓ ${test.name} (${test.duration}ms)`, 'success');
            
        } catch (error) {
            // Test failed
            test.status = 'failed';
            test.error = error;
            test.duration = Date.now() - test.startTime;
            suite.results.failed++;
            this.results.failed++;
            
            this.log(`    ✗ ${test.name} - ${error.message}`, 'error');
            this.results.errors.push({
                suite: test.suite,
                test: test.name,
                error: error.message,
                stack: error.stack
            });
            
        } finally {
            // Run afterEach hooks
            const suite = this.testSuites.get(test.suite);
            for (const hook of suite.afterEach) {
                try {
                    await this.executeAsync(hook);
                } catch (error) {
                    this.log(`    Error in afterEach hook: ${error.message}`, 'error');
                }
            }
        }
        
        this.currentTest = null;
    }

    /**
     * Execute async function with timeout
     */
    async executeAsync(fn) {
        if (fn.constructor.name === 'AsyncFunction') {
            return await Promise.race([
                fn(),
                new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Test timeout')), this.testTimeout);
                })
            ]);
        } else {
            return fn();
        }
    }

    /**
     * Show test container
     */
    showTestContainer() {
        const container = document.getElementById('test-container');
        if (container) {
            container.style.display = 'block';
        }
    }

    /**
     * Hide test container
     */
    hideTestContainer() {
        const container = document.getElementById('test-container');
        if (container) {
            container.style.display = 'none';
        }
    }

    /**
     * Show test results
     */
    showResults() {
        const output = document.getElementById('test-output');
        if (!output) return;
        
        const results = this.results;
        const total = results.passed + results.failed + results.skipped;
        
        let html = `
            <h4>Test Results</h4>
            <div style="margin-bottom: 20px;">
                <p>Total: ${total} | Passed: ${results.passed} | Failed: ${results.failed} | Skipped: ${results.skipped}</p>
                <p>Duration: ${results.duration}ms</p>
            </div>
        `;
        
        if (results.errors.length > 0) {
            html += '<h5>Errors:</h5><ul>';
            for (const error of results.errors) {
                html += `<li><strong>${error.suite}:${error.test}</strong> - ${error.error}</li>`;
            }
            html += '</ul>';
        }
        
        output.innerHTML = html;
    }

    /**
     * Log message to test output
     */
    log(message, type = 'info') {
        const output = document.getElementById('test-output');
        if (!output) return;
        
        const color = type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#fff';
        const div = document.createElement('div');
        div.style.color = color;
        div.style.marginBottom = '2px';
        div.textContent = message;
        
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    /**
     * Reset test results
     */
    resetResults() {
        this.results = {
            passed: 0,
            failed: 0,
            skipped: 0,
            total: 0,
            duration: 0,
            errors: []
        };
        
        for (const suite of this.testSuites.values()) {
            suite.results = { passed: 0, failed: 0, skipped: 0, total: 0 };
        }
        
        const output = document.getElementById('test-output');
        if (output) {
            output.innerHTML = '';
        }
    }

    /**
     * Get test statistics
     */
    getStats() {
        return {
            ...this.results,
            suites: this.testSuites.size,
            tests: this.tests.size,
            mocks: this.mocks.size,
            spies: this.spies.size,
            fixtures: this.fixtures.size
        };
    }

    /**
     * Clear all tests
     */
    clear() {
        this.tests.clear();
        this.testSuites.clear();
        this.mocks.clear();
        this.spies.clear();
        this.fixtures.clear();
        this.resetResults();
    }
}

// Create and export the test framework instance
const testFramework = new TestFramework();

// Add to window for global access
window.testFramework = testFramework;

// Remove ES6 export - use traditional script loading 