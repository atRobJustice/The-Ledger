/**
 * Database Manager for Ledger
 * Handles IndexedDB operations for character data storage with component architecture integration
 */

class DatabaseManager {
    constructor() {
        this.dbName = 'LedgerDB';
        this.dbVersion = 2; // Increment version for component architecture
        this.db = null;
        this.isInitialized = false;
        this.eventListeners = new Map();
        
        // Data validation and sanitization
        this.validationRules = {
            maxStringLength: 1000,
            maxArrayLength: 1000,
            maxObjectDepth: 10
        };
    }

    /**
     * Initialize the database
     */
    async init() {
        if (this.isInitialized) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('Failed to open IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.isInitialized = true;
                console.log('IndexedDB initialized successfully');
                
                // Emit initialization event
                this.emit('initialized', { db: this.db });
                
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const oldVersion = event.oldVersion;

                console.log(`Upgrading database from version ${oldVersion} to ${this.dbVersion}`);

                // Create object stores
                if (!db.objectStoreNames.contains('characters')) {
                    const characterStore = db.createObjectStore('characters', { keyPath: 'id', autoIncrement: true });
                    characterStore.createIndex('name', 'name', { unique: false });
                    characterStore.createIndex('createdAt', 'createdAt', { unique: false });
                    characterStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                    characterStore.createIndex('clan', 'clan', { unique: false });
                }

                if (!db.objectStoreNames.contains('settings')) {
                    const settingsStore = db.createObjectStore('settings', { keyPath: 'key' });
                }

                // Add component data store for future use
                if (!db.objectStoreNames.contains('componentData')) {
                    const componentStore = db.createObjectStore('componentData', { keyPath: 'id' });
                    componentStore.createIndex('componentType', 'componentType', { unique: false });
                    componentStore.createIndex('characterId', 'characterId', { unique: false });
                }

                console.log('IndexedDB schema created/updated');
            };
        });
    }

    /**
     * Get all characters
     */
    async getAllCharacters() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters'], 'readonly');
            const store = transaction.objectStore('characters');
            const request = store.getAll();

            request.onsuccess = () => {
                const characters = request.result || [];
                // Validate and sanitize character data
                const validatedCharacters = characters.map(char => this.validateCharacterData(char));
                console.log('DatabaseManager: Retrieved all characters:', validatedCharacters);
                resolve(validatedCharacters);
            };

            request.onerror = () => {
                console.error('DatabaseManager: Failed to retrieve characters:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Get a character by ID
     */
    async getCharacter(id) {
        await this.init();
        console.log('DatabaseManager: Attempting to get character with ID:', id, 'Type:', typeof id);
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters'], 'readonly');
            const store = transaction.objectStore('characters');
            const request = store.get(id);

            request.onsuccess = () => {
                const character = request.result;
                if (character) {
                    const validatedCharacter = this.validateCharacterData(character);
                    console.log('DatabaseManager: Character retrieval result for ID:', id, validatedCharacter);
                    resolve(validatedCharacter);
                } else {
                    console.log('DatabaseManager: No character found for ID:', id);
                    resolve(null);
                }
            };

            request.onerror = () => {
                console.error('DatabaseManager: Character retrieval failed for ID:', id, request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Save a character (create or update)
     */
    async saveCharacter(characterData, characterId = null) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters'], 'readwrite');
            const store = transaction.objectStore('characters');

            // Validate and sanitize character data
            const validatedData = this.validateCharacterData(characterData);
            const sanitizedData = this.sanitizeCharacterData(validatedData);

            const character = {
                ...sanitizedData,
                updatedAt: new Date().toISOString()
            };

            if (characterId) {
                character.id = characterId;
            } else {
                character.createdAt = new Date().toISOString();
            }

            const request = store.put(character);

            request.onsuccess = () => {
                const savedId = request.result;
                console.log('DatabaseManager: Character saved with ID:', savedId);
                
                // Emit character saved event
                this.emit('characterSaved', { characterId: savedId, characterData: character });
                
                resolve(savedId);
            };

            request.onerror = () => {
                console.error('DatabaseManager: Failed to save character:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Delete a character
     */
    async deleteCharacter(id) {
        await this.init();
        console.log('DatabaseManager: Attempting to delete character with ID:', id);
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters'], 'readwrite');
            const store = transaction.objectStore('characters');
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log('DatabaseManager: Character deletion successful for ID:', id);
                
                // Emit character deleted event
                this.emit('characterDeleted', { characterId: id });
                
                resolve();
            };

            request.onerror = () => {
                console.error('DatabaseManager: Character deletion failed for ID:', id, request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Get a setting value
     */
    async getSetting(key) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);

            request.onsuccess = () => {
                const result = request.result;
                const value = result ? result.value : null;
                resolve(this.sanitizeSettingValue(value));
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Set a setting value
     */
    async setSetting(key, value) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            
            const sanitizedValue = this.sanitizeSettingValue(value);
            const request = store.put({ key, value: sanitizedValue });

            request.onsuccess = () => {
                console.log('DatabaseManager: Setting saved:', key, sanitizedValue);
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Delete a setting
     */
    async deleteSetting(key) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            const request = store.delete(key);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Get the active character ID
     */
    async getActiveCharacterId() {
        return await this.getSetting('activeCharacterId');
    }

    /**
     * Set the active character ID
     */
    async setActiveCharacterId(id) {
        await this.setSetting('activeCharacterId', id);
    }

    /**
     * Get the current active character data
     */
    async getActiveCharacter() {
        const activeId = await this.getActiveCharacterId();
        if (!activeId) return null;
        return await this.getCharacter(activeId);
    }

    /**
     * Save the current character data as the active character
     */
    async saveActiveCharacter(characterData) {
        const activeId = await this.getActiveCharacterId();
        const savedId = await this.saveCharacter(characterData, activeId);
        
        // If this is a new character, set it as active
        if (!activeId) {
            await this.setActiveCharacterId(savedId);
        }
        
        return savedId;
    }

    /**
     * Save component data
     */
    async saveComponentData(componentId, componentType, characterId, data) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['componentData'], 'readwrite');
            const store = transaction.objectStore('componentData');
            
            const componentData = {
                id: componentId,
                componentType,
                characterId,
                data: this.sanitizeData(data),
                updatedAt: new Date().toISOString()
            };

            const request = store.put(componentData);

            request.onsuccess = () => {
                console.log('DatabaseManager: Component data saved:', componentId);
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Get component data
     */
    async getComponentData(componentId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['componentData'], 'readonly');
            const store = transaction.objectStore('componentData');
            const request = store.get(componentId);

            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.data : null);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Get all component data for a character
     */
    async getCharacterComponentData(characterId) {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['componentData'], 'readonly');
            const store = transaction.objectStore('componentData');
            const index = store.index('characterId');
            const request = index.getAll(characterId);

            request.onsuccess = () => {
                const results = request.result || [];
                const componentData = {};
                results.forEach(result => {
                    componentData[result.componentType] = result.data;
                });
                resolve(componentData);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Clear all data
     */
    async clearAllData() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters', 'settings', 'componentData'], 'readwrite');
            
            const characterStore = transaction.objectStore('characters');
            const settingsStore = transaction.objectStore('settings');
            const componentStore = transaction.objectStore('componentData');
            
            const characterRequest = characterStore.clear();
            const settingsRequest = settingsStore.clear();
            const componentRequest = componentStore.clear();

            transaction.oncomplete = () => {
                console.log('DatabaseManager: All data cleared');
                this.emit('dataCleared');
                resolve();
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        });
    }

    /**
     * Validate character data
     */
    validateCharacterData(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid character data: must be an object');
        }

        const validated = { ...data };

        // Validate required fields
        if (validated.name && typeof validated.name !== 'string') {
            throw new Error('Character name must be a string');
        }

        if (validated.generation && (isNaN(validated.generation) || validated.generation < 1 || validated.generation > 15)) {
            throw new Error('Generation must be a number between 1 and 15');
        }

        // Validate timestamps
        if (validated.createdAt && !this.isValidTimestamp(validated.createdAt)) {
            validated.createdAt = new Date().toISOString();
        }

        if (validated.updatedAt && !this.isValidTimestamp(validated.updatedAt)) {
            validated.updatedAt = new Date().toISOString();
        }

        return validated;
    }

    /**
     * Sanitize character data
     */
    sanitizeCharacterData(data) {
        const sanitized = { ...data };

        // Sanitize string fields
        const stringFields = ['name', 'concept', 'clan', 'sire', 'chronicle', 'ambition', 'desire', 'predator'];
        stringFields.forEach(field => {
            if (sanitized[field] && typeof sanitized[field] === 'string') {
                sanitized[field] = sanitized[field].trim().substring(0, this.validationRules.maxStringLength);
            }
        });

        // Sanitize arrays
        if (sanitized.skills) {
            Object.keys(sanitized.skills).forEach(category => {
                if (Array.isArray(sanitized.skills[category])) {
                    sanitized.skills[category] = sanitized.skills[category]
                        .slice(0, this.validationRules.maxArrayLength)
                        .filter(skill => skill && typeof skill === 'object' && typeof skill.value === 'number');
                }
            });
        }

        // Sanitize convictions
        if (Array.isArray(sanitized.convictions)) {
            sanitized.convictions = sanitized.convictions
                .slice(0, this.validationRules.maxArrayLength)
                .filter(conviction => conviction && typeof conviction === 'object');
        }

        return sanitized;
    }

    /**
     * Sanitize setting value
     */
    sanitizeSettingValue(value) {
        if (typeof value === 'string') {
            return value.substring(0, this.validationRules.maxStringLength);
        }
        if (Array.isArray(value)) {
            return value.slice(0, this.validationRules.maxArrayLength);
        }
        if (typeof value === 'object' && value !== null) {
            return this.sanitizeData(value);
        }
        return value;
    }

    /**
     * Sanitize general data
     */
    sanitizeData(data, depth = 0) {
        if (depth > this.validationRules.maxObjectDepth) {
            return null;
        }

        if (typeof data === 'string') {
            return data.substring(0, this.validationRules.maxStringLength);
        }

        if (Array.isArray(data)) {
            return data.slice(0, this.validationRules.maxArrayLength)
                .map(item => this.sanitizeData(item, depth + 1));
        }

        if (typeof data === 'object' && data !== null) {
            const sanitized = {};
            for (const [key, value] of Object.entries(data)) {
                if (key.length <= 100) { // Limit key length
                    sanitized[key] = this.sanitizeData(value, depth + 1);
                }
            }
            return sanitized;
        }

        return data;
    }

    /**
     * Check if timestamp is valid
     */
    isValidTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date instanceof Date && !isNaN(date);
    }

    /**
     * Event handling methods
     */
    on(event, handler) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(handler);
    }

    off(event, handler) {
        if (this.eventListeners.has(event)) {
            const handlers = this.eventListeners.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (err) {
                    console.error(`Error in database event handler for ${event}:`, err);
                }
            });
        }
    }

    /**
     * Get database statistics
     */
    async getStats() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters', 'settings', 'componentData'], 'readonly');
            
            const characterStore = transaction.objectStore('characters');
            const settingsStore = transaction.objectStore('settings');
            const componentStore = transaction.objectStore('componentData');
            
            const characterCount = characterStore.count();
            const settingsCount = settingsStore.count();
            const componentCount = componentStore.count();

            transaction.oncomplete = () => {
                resolve({
                    characters: characterCount.result,
                    settings: settingsCount.result,
                    components: componentCount.result,
                    dbSize: this.db.size || 'unknown'
                });
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        });
    }
}

// Create and export the database manager instance
const databaseManager = new DatabaseManager();

// Add to window for global access
window.databaseManager = databaseManager;

// Remove ES6 export - use traditional script loading
// export default databaseManager; 