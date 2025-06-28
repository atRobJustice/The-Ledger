/**
 * @fileoverview Database Manager for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Provides IndexedDB-based data persistence for character data. Handles all database
 *             operations including character storage, settings management, and active character
 *             tracking. Uses a singleton pattern to ensure consistent database access.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires IndexedDB - Browser's built-in database API for client-side storage
 * 
 * @class DatabaseManager
 * @classdesc Main class for managing IndexedDB operations and data persistence
 * 
 * @property {string} dbName - Database name ('LedgerDB')
 * @property {number} dbVersion - Database version for schema management
 * @property {IDBDatabase|null} db - IndexedDB database instance
 * @property {boolean} isInitialized - Boolean indicating if database is ready
 * 
 * @method constructor - Initializes the database manager with database configuration
 * @method init - Initializes the IndexedDB connection and creates object stores
 * @method getAllCharacters - Retrieves all characters from the database
 * @method getCharacter - Retrieves a specific character by ID
 * @method saveCharacter - Saves or updates a character
 * @method deleteCharacter - Deletes a character from the database
 * @method getSetting - Retrieves a setting value from the database
 * @method setSetting - Saves a setting value to the database
 * @method deleteSetting - Deletes a setting from the database
 * @method getActiveCharacterId - Gets the ID of the currently active character
 * @method setActiveCharacterId - Sets the ID of the currently active character
 * @method getActiveCharacter - Gets the data of the currently active character
 * @method saveActiveCharacter - Saves character data as the active character
 * @method clearAllData - Clears all data from the database (for testing/debugging)
 * 
 * @typedef {Object} Character
 * @property {number} id - Unique identifier (auto-generated)
 * @property {string} name - Character name
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string} updatedAt - ISO timestamp of last update
 * @property {Object} [attributes] - Character attributes data
 * @property {Object} [skills] - Character skills data
 * @property {Object} [disciplines] - Character disciplines data
 * @property {Object} [merits] - Character merits data
 * @property {Object} [flaws] - Character flaws data
 * @property {Object} [backgrounds] - Character backgrounds data
 * @property {Object} [backgroundFlaws] - Character background flaws data
 * @property {Object} [coterieMerits] - Character coterie merits data
 * @property {Object} [coterieFlaws] - Character coterie flaws data
 * @property {Array} [loresheets] - Character loresheets data
 * @property {Array} [convictions] - Character convictions data
 * @property {boolean} [locked] - Whether the character sheet is locked
 * @property {string} [theme] - Character theme preference
 * @property {string} [discordWebhook] - Discord webhook URL for the character
 * 
 * @typedef {Object} Setting
 * @property {string} key - Setting key
 * @property {*} value - Setting value (string, number, boolean, object)
 * 
 * @example
 * const dbManager = new DatabaseManager();
 * await dbManager.init();
 * const characters = await dbManager.getAllCharacters();
 * await dbManager.saveCharacter(characterData);
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

/**
 * Database Manager for Ledger
 * Handles IndexedDB operations for character data storage
 */

import logger from '../utils/logger.js';

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
                logger.error('Failed to open IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.isInitialized = true;
                logger.log('IndexedDB initialized successfully');
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

                logger.log('IndexedDB schema created/updated');
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
                logger.log('DatabaseManager: Retrieved all characters:', characters);
                resolve(characters);
            };

            request.onerror = () => {
                logger.error('DatabaseManager: Failed to retrieve characters:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Get a character by ID
     */
    async getCharacter(id) {
        await this.init();
        logger.log('DatabaseManager: Attempting to get character with ID:', id, 'Type:', typeof id);
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters'], 'readonly');
            const store = transaction.objectStore('characters');
            const request = store.get(id);

            request.onsuccess = () => {
                logger.log('DatabaseManager: Character retrieval result for ID:', id, request.result);
                resolve(request.result || null);
            };

            request.onerror = () => {
                logger.error('DatabaseManager: Character retrieval failed for ID:', id, request.error);
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
        logger.log('DatabaseManager: Attempting to delete character with ID:', id);
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['characters'], 'readwrite');
            const store = transaction.objectStore('characters');
            const request = store.delete(id);

            request.onsuccess = () => {
                logger.log('DatabaseManager: Character deletion successful for ID:', id);
                resolve();
            };

            request.onerror = () => {
                logger.error('DatabaseManager: Character deletion failed for ID:', id, request.error);
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