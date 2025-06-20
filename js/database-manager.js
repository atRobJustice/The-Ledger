/**
 * Database Manager for Ledger
 * Handles IndexedDB operations for character data storage
 */

class DatabaseManager {
    constructor() {
        this.dbName = 'LedgerDB';
        this.dbVersion = 1;
        this.db = null;
        this.isInitialized = false;
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
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores
                if (!db.objectStoreNames.contains('characters')) {
                    const characterStore = db.createObjectStore('characters', { keyPath: 'id', autoIncrement: true });
                    characterStore.createIndex('name', 'name', { unique: false });
                    characterStore.createIndex('createdAt', 'createdAt', { unique: false });
                    characterStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                }

                if (!db.objectStoreNames.contains('settings')) {
                    const settingsStore = db.createObjectStore('settings', { keyPath: 'key' });
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
                console.log('DatabaseManager: Retrieved all characters:', characters);
                resolve(characters);
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
                console.log('DatabaseManager: Character retrieval result for ID:', id, request.result);
                resolve(request.result || null);
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

            const character = {
                ...characterData,
                updatedAt: new Date().toISOString()
            };

            if (characterId) {
                character.id = characterId;
            } else {
                character.createdAt = new Date().toISOString();
            }

            const request = store.put(character);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
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
                resolve(request.result ? request.result.value : null);
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
            const request = store.put({ key, value });

            request.onsuccess = () => {
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
     * Get the current active character ID
     */
    async getActiveCharacterId() {
        return await this.getSetting('activeCharacterId');
    }

    /**
     * Set the current active character ID
     */
    async setActiveCharacterId(id) {
        return await this.setSetting('activeCharacterId', id);
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
     * Clear all data (for testing/debugging)
     */
    async clearAllData() {
        await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters', 'settings'], 'readwrite');
            
            const characterStore = transaction.objectStore('characters');
            const settingsStore = transaction.objectStore('settings');
            
            const charRequest = characterStore.clear();
            const settingsRequest = settingsStore.clear();

            transaction.oncomplete = () => {
                resolve();
            };

            transaction.onerror = () => {
                reject(transaction.error);
            };
        });
    }
}

// Create and export a singleton instance
const databaseManager = new DatabaseManager();

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
    window.databaseManager = databaseManager;
}

export default databaseManager; 