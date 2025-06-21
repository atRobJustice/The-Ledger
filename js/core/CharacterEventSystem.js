/**
 * CharacterEventSystem - Specialized event system for character data changes
 * Provides structured events for character data updates, validation, and synchronization
 */
// Remove ES6 import - use traditional script loading
// import eventBus from './EventBus.js';

// Use window reference instead
const characterEventBus = window.eventBus;

class CharacterEventSystem {
    constructor() {
        this.eventTypes = {
            // Character lifecycle events
            CHARACTER_LOADED: 'character:loaded',
            CHARACTER_SAVED: 'character:saved',
            CHARACTER_CREATED: 'character:created',
            CHARACTER_DELETED: 'character:deleted',
            CHARACTER_SWITCHED: 'character:switched',
            CHARACTER_CLEARED: 'character:cleared',
            
            // Data change events
            DATA_CHANGED: 'character:data:changed',
            FIELD_CHANGED: 'character:field:changed',
            PANEL_UPDATED: 'character:panel:updated',
            
            // Specific field events
            ATTRIBUTE_CHANGED: 'character:attribute:changed',
            SKILL_CHANGED: 'character:skill:changed',
            VITAL_CHANGED: 'character:vital:changed',
            DISCIPLINE_CHANGED: 'character:discipline:changed',
            MERIT_CHANGED: 'character:merit:changed',
            FLAW_CHANGED: 'character:flaw:changed',
            BACKGROUND_CHANGED: 'character:background:changed',
            LORESHEET_CHANGED: 'character:loresheet:changed',
            CONVICTION_CHANGED: 'character:conviction:changed',
            XP_CHANGED: 'character:xp:changed',
            
            // Information events
            NAME_CHANGED: 'character:name:changed',
            CONCEPT_CHANGED: 'character:concept:changed',
            CLAN_CHANGED: 'character:clan:changed',
            GENERATION_CHANGED: 'character:generation:changed',
            
            // State events
            LOCK_STATE_CHANGED: 'character:lock:changed',
            VALIDATION_ERROR: 'character:validation:error',
            AUTO_SAVE: 'character:autosave',
            
            // Panel events
            PANEL_INITIALIZED: 'character:panel:initialized',
            PANEL_DESTROYED: 'character:panel:destroyed',
            PANEL_DATA_LOADED: 'character:panel:data:loaded',
            PANEL_DATA_SAVED: 'character:panel:data:saved'
        };

        this.setupGlobalListeners();
    }

    /**
     * Setup global event listeners for character events
     */
    setupGlobalListeners() {
        // Listen for character data changes and propagate to relevant components
        characterEventBus.on(this.eventTypes.DATA_CHANGED, (eventData) => {
            this.handleDataChanged(eventData);
        }, { priority: 10 });

        // Listen for field changes and update character data
        characterEventBus.on(this.eventTypes.FIELD_CHANGED, (eventData) => {
            this.handleFieldChanged(eventData);
        }, { priority: 5 });

        // Listen for validation errors
        characterEventBus.on(this.eventTypes.VALIDATION_ERROR, (eventData) => {
            this.handleValidationError(eventData);
        }, { priority: 15 });

        // Listen for auto-save events
        characterEventBus.on(this.eventTypes.AUTO_SAVE, (eventData) => {
            this.handleAutoSave(eventData);
        }, { priority: 1 });
    }

    /**
     * Emit character loaded event
     */
    emitCharacterLoaded(characterData, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.CHARACTER_LOADED, {
            characterData,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 10
        });
    }

    /**
     * Emit character saved event
     */
    emitCharacterSaved(characterData, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.CHARACTER_SAVED, {
            characterData,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 10
        });
    }

    /**
     * Emit field changed event
     */
    emitFieldChanged(fieldName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.FIELD_CHANGED, {
            fieldName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit attribute changed event
     */
    emitAttributeChanged(attributeName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.ATTRIBUTE_CHANGED, {
            attributeName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit skill changed event
     */
    emitSkillChanged(skillName, oldValue, newValue, specialty = null, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.SKILL_CHANGED, {
            skillName,
            oldValue,
            newValue,
            specialty,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit vital changed event
     */
    emitVitalChanged(vitalName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.VITAL_CHANGED, {
            vitalName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit discipline changed event
     */
    emitDisciplineChanged(disciplineName, oldValue, newValue, powers = [], sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.DISCIPLINE_CHANGED, {
            disciplineName,
            oldValue,
            newValue,
            powers,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit merit changed event
     */
    emitMeritChanged(meritName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.MERIT_CHANGED, {
            meritName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit flaw changed event
     */
    emitFlawChanged(flawName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.FLAW_CHANGED, {
            flawName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit background changed event
     */
    emitBackgroundChanged(backgroundName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.BACKGROUND_CHANGED, {
            backgroundName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit loresheet changed event
     */
    emitLoresheetChanged(loresheetName, oldValue, newValue, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.LORESHEET_CHANGED, {
            loresheetName,
            oldValue,
            newValue,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit conviction changed event
     */
    emitConvictionChanged(convictionData, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.CONVICTION_CHANGED, {
            convictionData,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit XP changed event
     */
    emitXPChanged(xpData, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.XP_CHANGED, {
            xpData,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 5
        });
    }

    /**
     * Emit lock state changed event
     */
    emitLockStateChanged(isLocked, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.LOCK_STATE_CHANGED, {
            isLocked,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 8
        });
    }

    /**
     * Emit validation error event
     */
    emitValidationError(fieldName, error, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.VALIDATION_ERROR, {
            fieldName,
            error,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 15
        });
    }

    /**
     * Emit auto-save event
     */
    emitAutoSave(characterData, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.AUTO_SAVE, {
            characterData,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 1
        });
    }

    /**
     * Emit panel initialized event
     */
    emitPanelInitialized(panelName, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.PANEL_INITIALIZED, {
            panelName,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 3
        });
    }

    /**
     * Emit panel destroyed event
     */
    emitPanelDestroyed(panelName, sourceComponentId = null) {
        characterEventBus.emit(this.eventTypes.PANEL_DESTROYED, {
            panelName,
            timestamp: Date.now()
        }, {
            sourceComponentId,
            priority: 3
        });
    }

    /**
     * Handle data changed events
     */
    handleDataChanged(eventData) {
        const { data } = eventData;
        
        // Update character manager if available
        if (window.characterManager) {
            window.characterManager.updateCharacterData(data.characterData);
        }

        // Notify all panels to update
        characterEventBus.emit(this.eventTypes.PANEL_UPDATED, {
            characterData: data.characterData,
            changedFields: data.changedFields || []
        }, {
            priority: 5
        });
    }

    /**
     * Handle field changed events
     */
    handleFieldChanged(eventData) {
        const { data } = eventData;
        
        // Validate the field change
        const validationResult = this.validateFieldChange(data.fieldName, data.newValue);
        
        if (!validationResult.isValid) {
            this.emitValidationError(data.fieldName, validationResult.error, eventData.sourceComponentId);
            return;
        }

        // Update character data
        if (window.characterManager) {
            window.characterManager.updateField(data.fieldName, data.newValue);
        }

        // Trigger auto-save after a delay
        this.scheduleAutoSave();
    }

    /**
     * Handle validation errors
     */
    handleValidationError(eventData) {
        const { data } = eventData;
        
        // Show error message to user
        if (window.toastManager) {
            window.toastManager.show(
                `Validation error: ${data.error}`,
                'error',
                'Character System'
            );
        }

        // Log the error
        console.error(`Validation error for field ${data.fieldName}:`, data.error);
    }

    /**
     * Handle auto-save events
     */
    handleAutoSave(eventData) {
        const { data } = eventData;
        
        // Save character data
        if (window.characterManager) {
            window.characterManager.saveCurrentCharacter(data.characterData)
                .then(() => {
                    characterEventBus.log('debug', 'Auto-save completed successfully');
                })
                .catch((error) => {
                    characterEventBus.log('error', 'Auto-save failed:', error);
                });
        }
    }

    /**
     * Validate field change
     */
    validateFieldChange(fieldName, newValue) {
        // Basic validation rules
        const validations = {
            name: (value) => {
                if (!value || value.trim().length === 0) {
                    return { isValid: false, error: 'Name cannot be empty' };
                }
                if (value.length > 100) {
                    return { isValid: false, error: 'Name is too long' };
                }
                return { isValid: true };
            },
            concept: (value) => {
                if (value && value.length > 200) {
                    return { isValid: false, error: 'Concept is too long' };
                }
                return { isValid: true };
            },
            generation: (value) => {
                const num = parseInt(value);
                if (isNaN(num) || num < 1 || num > 15) {
                    return { isValid: false, error: 'Generation must be between 1 and 15' };
                }
                return { isValid: true };
            }
        };

        const validator = validations[fieldName];
        if (validator) {
            return validator(newValue);
        }

        return { isValid: true };
    }

    /**
     * Schedule auto-save with debouncing
     */
    scheduleAutoSave() {
        if (this.autoSaveTimeout) {
            clearTimeout(this.autoSaveTimeout);
        }

        this.autoSaveTimeout = setTimeout(() => {
            if (window.characterManager) {
                const characterData = window.characterManager.gatherCharacterData();
                this.emitAutoSave(characterData);
            }
        }, 2000); // 2 second delay
    }

    /**
     * Get event types
     */
    getEventTypes() {
        return this.eventTypes;
    }

    /**
     * Subscribe to character events
     */
    subscribe(eventType, handler, options = {}) {
        return characterEventBus.on(eventType, handler, options);
    }

    /**
     * Subscribe once to character events
     */
    subscribeOnce(eventType, handler, options = {}) {
        return characterEventBus.once(eventType, handler, options);
    }

    /**
     * Unsubscribe from character events
     */
    unsubscribe(eventType, handler) {
        characterEventBus.off(eventType, handler);
    }

    /**
     * Get character event history
     */
    getEventHistory(filter = {}) {
        return characterEventBus.getEventHistory(filter);
    }

    /**
     * Clear character event history
     */
    clearEventHistory() {
        characterEventBus.clearEventHistory();
    }
}

// Create global character event system instance
const characterEventSystem = new CharacterEventSystem();

// Remove ES6 export - use traditional script loading
// export default characterEventSystem;

// Assign to window
window.characterEventSystem = characterEventSystem; 