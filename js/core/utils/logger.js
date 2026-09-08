/**
 * Configurable console logger (enable/disable via localStorage).
 */
class Logger {
    constructor() {
        this.enabled = this.getLoggingState();
        this.prefix = '[The Ledger]';
    }

    /** Read logging preference; default on in development, off in production. */
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

    /** True when hostname looks like a production host. */
    isProduction() {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1' &&
               !window.location.hostname.includes('dev') &&
               !window.location.hostname.includes('test');
    }

    /** Persist enable/disable preference. */
    setLoggingEnabled(enabled) {
        this.enabled = enabled;
        try {
            localStorage.setItem('ledger_logging_enabled', enabled.toString());
        } catch (error) {
            // Silently fail if localStorage is not available
        }
    }

    /** Flip logging on/off; returns new state. */
    toggleLogging() {
        this.setLoggingEnabled(!this.enabled);
        return this.enabled;
    }

    /** Whether logging is currently enabled. */
    isLoggingEnabled() {
        return this.enabled;
    }

    /** Emit to console[level] when enabled. */
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

    log(message, ...args) {
        this._log('log', message, ...args);
    }

    warn(message, ...args) {
        this._log('warn', message, ...args);
    }

    error(message, ...args) {
        this._log('error', message, ...args);
    }

    info(message, ...args) {
        this._log('info', message, ...args);
    }

    debug(message, ...args) {
        this._log('debug', message, ...args);
    }

    /** Run callback inside console.group when enabled. */
    group(label, callback) {
        if (!this.enabled) return;
        
        console.group(`${this.prefix} ${label}`);
        if (typeof callback === 'function') {
            callback();
        }
        console.groupEnd();
    }

    /** Run callback inside console.groupCollapsed when enabled. */
    groupCollapsed(label, callback) {
        if (!this.enabled) return;
        
        console.groupCollapsed(`${this.prefix} ${label}`);
        if (typeof callback === 'function') {
            callback();
        }
        console.groupEnd();
    }

    /** console.table when enabled. */
    table(data, columns) {
        if (!this.enabled) return;
        
        if (columns) {
            console.table(data, columns);
        } else {
            console.table(data);
        }
    }

    /** Start a console.time measurement when enabled. */
    time(label = 'default') {
        if (!this.enabled) return;
        console.time(`${this.prefix} ${label}`);
    }

    /** End a console.time measurement when enabled. */
    timeEnd(label = 'default') {
        if (!this.enabled) return;
        console.timeEnd(`${this.prefix} ${label}`);
    }
}

const logger = new Logger();

if (typeof window !== 'undefined') {
    window.logger = logger;
}

export default logger;

export { Logger };
