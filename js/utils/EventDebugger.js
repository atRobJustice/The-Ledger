/**
 * EventDebugger - Utility for debugging and monitoring the event system
 * Provides tools for tracking events, analyzing event flow, and debugging issues
 */
// Use window reference instead
const eventDebuggerBus = window.eventBus;

class EventDebugger {
    constructor() {
        this.isEnabled = false;
        this.eventLog = [];
        this.maxLogSize = 1000;
        this.filters = new Set();
        this.highlightedEvents = new Set();
        this.performanceMetrics = new Map();
        
        this.setupEventListeners();
    }

    /**
     * Enable or disable event debugging
     */
    enable(enabled = true) {
        this.isEnabled = enabled;
        console.log(`Event debugging ${enabled ? 'enabled' : 'disabled'}`);
        
        if (enabled) {
            this.showDebugPanel();
        } else {
            this.hideDebugPanel();
        }
    }

    /**
     * Add event filter
     */
    addFilter(eventName) {
        this.filters.add(eventName);
        console.log(`Added event filter: ${eventName}`);
    }

    /**
     * Remove event filter
     */
    removeFilter(eventName) {
        this.filters.delete(eventName);
        console.log(`Removed event filter: ${eventName}`);
    }

    /**
     * Highlight specific events
     */
    highlightEvent(eventName) {
        this.highlightedEvents.add(eventName);
        console.log(`Highlighted event: ${eventName}`);
    }

    /**
     * Remove event highlight
     */
    removeHighlight(eventName) {
        this.highlightedEvents.delete(eventName);
        console.log(`Removed highlight from event: ${eventName}`);
    }

    /**
     * Setup event listeners for debugging
     */
    setupEventListeners() {
        if (!window.eventBus) return;

        // Listen to all events
        window.eventBus.on('*', (eventData) => {
            this.logEvent(eventData);
        }, { priority: 1000 }); // Very high priority to catch all events
    }

    /**
     * Log an event
     */
    logEvent(eventData) {
        if (!this.isEnabled) return;

        const { event, data, sourceComponentId, timestamp } = eventData;
        
        // Apply filters
        if (this.filters.size > 0 && !this.filters.has(event)) {
            return;
        }

        const logEntry = {
            event,
            data,
            sourceComponentId,
            timestamp,
            timestampFormatted: new Date(timestamp).toLocaleTimeString(),
            isHighlighted: this.highlightedEvents.has(event)
        };

        this.eventLog.push(logEntry);
        
        // Maintain log size
        if (this.eventLog.length > this.maxLogSize) {
            this.eventLog.shift();
        }

        // Update performance metrics
        this.updatePerformanceMetrics(event, timestamp);

        // Log to console with highlighting
        this.logToConsole(logEntry);
    }

    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(event, timestamp) {
        if (!this.performanceMetrics.has(event)) {
            this.performanceMetrics.set(event, {
                count: 0,
                firstSeen: timestamp,
                lastSeen: timestamp,
                averageInterval: 0,
                lastTimestamp: timestamp
            });
        }

        const metrics = this.performanceMetrics.get(event);
        metrics.count++;
        metrics.lastSeen = timestamp;
        
        if (metrics.lastTimestamp) {
            const interval = timestamp - metrics.lastTimestamp;
            metrics.averageInterval = (metrics.averageInterval * (metrics.count - 2) + interval) / (metrics.count - 1);
        }
        
        metrics.lastTimestamp = timestamp;
    }

    /**
     * Log to console with highlighting
     */
    logToConsole(logEntry) {
        const { event, sourceComponentId, timestampFormatted, isHighlighted } = logEntry;
        
        const prefix = isHighlighted ? '🔍' : '📡';
        const componentInfo = sourceComponentId ? `[${sourceComponentId}]` : '[global]';
        
        console.group(`${prefix} ${event} ${componentInfo} (${timestampFormatted})`);
        console.log('Event Data:', logEntry.data);
        console.log('Source Component:', sourceComponentId || 'Global');
        console.log('Timestamp:', new Date(logEntry.timestamp).toISOString());
        console.groupEnd();
    }

    /**
     * Show debug panel
     */
    showDebugPanel() {
        if (document.getElementById('event-debug-panel')) {
            return;
        }

        const panel = document.createElement('div');
        panel.id = 'event-debug-panel';
        panel.className = 'event-debug-panel';
        panel.innerHTML = `
            <div class="event-debug-header">
                <h5>Event Debugger</h5>
                <button class="btn btn-sm btn-outline-secondary" onclick="window.eventDebugger.clearLog()">Clear</button>
                <button class="btn btn-sm btn-outline-secondary" onclick="window.eventDebugger.exportLog()">Export</button>
                <button class="btn btn-sm btn-outline-danger" onclick="window.eventDebugger.enable(false)">Close</button>
            </div>
            <div class="event-debug-content">
                <div class="event-debug-filters">
                    <input type="text" id="event-filter" placeholder="Filter events..." class="form-control form-control-sm">
                    <button class="btn btn-sm btn-outline-primary" onclick="window.eventDebugger.addFilterFromInput()">Add Filter</button>
                </div>
                <div class="event-debug-log" id="event-debug-log"></div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .event-debug-panel {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 600px;
                height: 400px;
                background: #1a1a1a;
                color: #fff;
                border: 1px solid #333;
                border-radius: 8px;
                z-index: 10000;
                font-family: monospace;
                font-size: 12px;
            }
            .event-debug-header {
                background: #333;
                padding: 8px;
                border-bottom: 1px solid #555;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .event-debug-header h5 {
                margin: 0;
                color: #fff;
            }
            .event-debug-content {
                height: calc(100% - 50px);
                display: flex;
                flex-direction: column;
            }
            .event-debug-filters {
                padding: 8px;
                border-bottom: 1px solid #555;
                display: flex;
                gap: 8px;
            }
            .event-debug-log {
                flex: 1;
                overflow-y: auto;
                padding: 8px;
                background: #000;
            }
            .event-log-entry {
                margin-bottom: 4px;
                padding: 4px;
                border-left: 3px solid #666;
                background: #1a1a1a;
            }
            .event-log-entry.highlighted {
                border-left-color: #ff6b6b;
                background: #2a1a1a;
            }
            .event-log-entry .event-name {
                font-weight: bold;
                color: #4ecdc4;
            }
            .event-log-entry .event-source {
                color: #95a5a6;
                font-size: 10px;
            }
            .event-log-entry .event-time {
                color: #7f8c8d;
                font-size: 10px;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(panel);
        this.updateDebugPanel();
    }

    /**
     * Hide debug panel
     */
    hideDebugPanel() {
        const panel = document.getElementById('event-debug-panel');
        if (panel) {
            panel.remove();
        }
    }

    /**
     * Update debug panel content
     */
    updateDebugPanel() {
        if (!this.isEnabled) return;

        const logContainer = document.getElementById('event-debug-log');
        if (!logContainer) return;

        // Show last 50 events
        const recentEvents = this.eventLog.slice(-50);
        
        logContainer.innerHTML = recentEvents.map(entry => `
            <div class="event-log-entry ${entry.isHighlighted ? 'highlighted' : ''}">
                <div class="event-name">${entry.event}</div>
                <div class="event-source">${entry.sourceComponentId || 'global'}</div>
                <div class="event-time">${entry.timestampFormatted}</div>
            </div>
        `).join('');

        // Auto-scroll to bottom
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    /**
     * Add filter from input
     */
    addFilterFromInput() {
        const input = document.getElementById('event-filter');
        if (input && input.value.trim()) {
            this.addFilter(input.value.trim());
            input.value = '';
            this.updateDebugPanel();
        }
    }

    /**
     * Clear event log
     */
    clearLog() {
        this.eventLog = [];
        this.performanceMetrics.clear();
        this.updateDebugPanel();
        console.log('Event log cleared');
    }

    /**
     * Export event log
     */
    exportLog() {
        const exportData = {
            timestamp: new Date().toISOString(),
            eventLog: this.eventLog,
            performanceMetrics: Object.fromEntries(this.performanceMetrics),
            filters: Array.from(this.filters),
            highlightedEvents: Array.from(this.highlightedEvents)
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `event-log-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Get event statistics
     */
    getStats() {
        return {
            totalEvents: this.eventLog.length,
            uniqueEvents: new Set(this.eventLog.map(e => e.event)).size,
            performanceMetrics: Object.fromEntries(this.performanceMetrics),
            filters: Array.from(this.filters),
            highlightedEvents: Array.from(this.highlightedEvents)
        };
    }

    /**
     * Get events by component
     */
    getEventsByComponent(componentId) {
        return this.eventLog.filter(entry => entry.sourceComponentId === componentId);
    }

    /**
     * Get events by type
     */
    getEventsByType(eventType) {
        return this.eventLog.filter(entry => entry.event === eventType);
    }

    /**
     * Get recent events
     */
    getRecentEvents(count = 10) {
        return this.eventLog.slice(-count);
    }

    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        this.performanceMetrics.clear();
        console.log('Performance monitoring started');
    }

    /**
     * Get performance report
     */
    getPerformanceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalEvents: this.eventLog.length,
            eventMetrics: {}
        };

        for (const [event, metrics] of this.performanceMetrics) {
            report.eventMetrics[event] = {
                count: metrics.count,
                frequency: metrics.count / ((metrics.lastSeen - metrics.firstSeen) / 1000), // events per second
                averageInterval: metrics.averageInterval,
                firstSeen: new Date(metrics.firstSeen).toISOString(),
                lastSeen: new Date(metrics.lastSeen).toISOString()
            };
        }

        return report;
    }
}

// Create and export the event debugger instance
const eventDebugger = new EventDebugger();

// Add to window for global access
window.eventDebugger = eventDebugger;

// Enable in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Enable after a short delay to allow systems to initialize
    setTimeout(() => {
        eventDebugger.enable(true);
    }, 2000);
} 