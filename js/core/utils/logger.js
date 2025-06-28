/**
 * Logger utility for The Ledger
 * Provides configurable console logging with the ability to enable/disable logging
 */
class Logger {
    constructor() {
        this.enabled = this.getLoggingState();
        this.prefix = '[The Ledger]';
    }

    /**
     * Get the current logging state from localStorage or default to true for development
     */
    getLoggingState() {
        try {
            const saved = localStorage.getItem('ledger_logging_enabled');
            if (saved !== null) {
                return saved === 'true';
            }
            // Default to true in development, false in production
            return !this.isProduction();
        } catch (error) {
            // Fallback to false if localStorage is not available
            return false;
        }
    }

    /**
     * Check if we're in production environment
     */
    isProduction() {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1' &&
               !window.location.hostname.includes('dev') &&
               !window.location.hostname.includes('test');
    }

    /**
     * Enable or disable logging
     * @param {boolean} enabled - Whether to enable logging
     */
    setLoggingEnabled(enabled) {
        this.enabled = enabled;
        try {
            localStorage.setItem('ledger_logging_enabled', enabled.toString());
        } catch (error) {
            // Silently fail if localStorage is not available
        }
    }

    /**
     * Toggle logging state
     */
    toggleLogging() {
        this.setLoggingEnabled(!this.enabled);
        return this.enabled;
    }

    /**
     * Get current logging state
     */
    isLoggingEnabled() {
        return this.enabled;
    }

    /**
     * Log a message if logging is enabled
     * @param {string} level - Log level (log, warn, error, info, debug)
     * @param {string} message - Message to log
     * @param {...any} args - Additional arguments to log
     */
    _log(level, message, ...args) {
        if (!this.enabled) return;
        
        const timestamp = new Date().toISOString();
        const formattedMessage = `${this.prefix} [${timestamp}] ${message}`;
        
        if (console[level]) {
            console[level](formattedMessage, ...args);
        } else {
            console.log(formattedMessage, ...args);
        }
    }

    /**
     * Log a standard message
     */
    log(message, ...args) {
        this._log('log', message, ...args);
    }

    /**
     * Log a warning message
     */
    warn(message, ...args) {
        this._log('warn', message, ...args);
    }

    /**
     * Log an error message
     */
    error(message, ...args) {
        this._log('error', message, ...args);
    }

    /**
     * Log an info message
     */
    info(message, ...args) {
        this._log('info', message, ...args);
    }

    /**
     * Log a debug message
     */
    debug(message, ...args) {
        this._log('debug', message, ...args);
    }

    /**
     * Log a group of related messages
     * @param {string} label - Group label
     * @param {Function} callback - Function containing the grouped logs
     */
    group(label, callback) {
        if (!this.enabled) return;
        
        console.group(`${this.prefix} ${label}`);
        if (typeof callback === 'function') {
            callback();
        }
        console.groupEnd();
    }

    /**
     * Log a group of related messages (collapsed)
     * @param {string} label - Group label
     * @param {Function} callback - Function containing the grouped logs
     */
    groupCollapsed(label, callback) {
        if (!this.enabled) return;
        
        console.groupCollapsed(`${this.prefix} ${label}`);
        if (typeof callback === 'function') {
            callback();
        }
        console.groupEnd();
    }

    /**
     * Log a table
     * @param {any} data - Data to display as a table
     * @param {string[]} columns - Optional columns to display
     */
    table(data, columns) {
        if (!this.enabled) return;
        
        if (columns) {
            console.table(data, columns);
        } else {
            console.table(data);
        }
    }

    /**
     * Log the current time
     * @param {string} label - Optional label for the time measurement
     */
    time(label = 'default') {
        if (!this.enabled) return;
        console.time(`${this.prefix} ${label}`);
    }

    /**
     * End a time measurement
     * @param {string} label - Label for the time measurement
     */
    timeEnd(label = 'default') {
        if (!this.enabled) return;
        console.timeEnd(`${this.prefix} ${label}`);
    }
}

// Create a singleton instance
const logger = new Logger();

// Export the logger instance
export default logger;

// Also export the Logger class for testing or custom instances
export { Logger }; 