/**
 * @fileoverview Edge Manager for Hunter: The Reckoning Character Sheet
 * @version 1.0.0
 * @description Manages hunter edges (Assets, Aptitudes, and Endowments) for the character sheet.
 *             Provides functionality for adding, removing, and managing edges with their perks.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires jQuery - Used for DOM manipulation and event handling
 * @requires Bootstrap - Used for UI components and modals
 * @requires edges.js - Reference data for hunter edges
 * @requires window.LockManager - For sheet lock state management
 * @requires window.characterManager - For character data management
 * @requires window.TraitManagerUtils - For trait management utilities
 * 
 * @class EdgeManager
 * @classdesc Main class for managing hunter edges in the character sheet
 * 
 * @property {Array} edges - Array of current edges
 * @property {boolean} isInitialized - Boolean indicating if the manager is initialized
 * @property {Object} edgeData - Reference data for all available edges
 * 
 * @method constructor - Initializes the edge manager with empty state
 * @method init - Initializes the edge manager and loads edge data
 * @method loadEdgeData - Loads edge reference data
 * @method render - Renders the edges container
 * @method addEdge - Adds a new edge to the character
 * @method removeEdge - Removes an edge from the character
 * @method updateEdge - Updates an existing edge
 * @method getEdges - Gets all current edges
 * @method setEdges - Sets the edges array
 * @method saveEdges - Saves edges to character data
 * @method loadEdges - Loads edges from character data
 * @method createEdgeItem - Creates HTML for an edge item
 * @method showAddEdgeModal - Shows modal for adding a new edge
 * @method populateEdgeDropdowns - Populates edge selection dropdowns
 * @method validateEdgeRequirements - Validates edge requirements
 * 
 * @typedef {Object} Edge
 * @property {string} name - Edge name
 * @property {string} category - Edge category (Asset, Aptitude, or Endowment)
 * @property {string} description - Edge description
 * @property {Array} perks - Array of edge perks
 * @property {Object} requirements - Edge requirements
 * @property {string} source - Source book reference
 * 
 * @example
 * const edgeManager = new EdgeManager();
 * await edgeManager.init();
 * await edgeManager.addEdge('Combat Reflexes', 'Asset');
 * 
 * @since 1.0.0
 */

import { TraitManagerUtils } from './manager-utils.js';

class EdgeManager {
    constructor() {
        this.edges = [];
        this.isInitialized = false;
        this.edgeData = {};
    }

    /**
     * Initialize the edge manager
     */
    async init() {
        if (this.isInitialized) return;

        try {
            // Load edge data
            await this.loadEdgeData();
            
            // Set up event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('EdgeManager initialized');
            
        } catch (err) {
            console.error('Failed to initialize EdgeManager:', err);
        }
    }

    /**
     * Load edge reference data
     */
    async loadEdgeData() {
        try {
            // Import edge data
            const edgeModule = await import('../data/hunter/edges.js');
            this.edgeData = edgeModule.default;
            console.log('Edge data loaded:', this.edgeData);
        } catch (err) {
            console.error('Failed to load edge data:', err);
            this.edgeData = {};
        }
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Add edge button
        $(document).on('click', '#add-edge', () => {
            this.showAddEdgeModal();
        });

        // Remove edge buttons
        $(document).on('click', '.remove-edge', (e) => {
            const edgeName = $(e.target).closest('.edge-item').data('edge-name');
            this.removeEdge(edgeName);
        });

        // Edge category change
        $(document).on('change', '#edge-category-select', () => {
            this.populateEdgeDropdowns();
        });

        // Add edge from modal
        $(document).on('click', '#confirm-add-edge', () => {
            this.addEdgeFromModal();
        });

        // Listen for character type changes
        $(document).on('characterTypeChanged', (e, data) => {
            if (data.type === 'hunter') {
                this.render();
            }
        });
    }

    /**
     * Render the edges container
     */
    render() {
        const $container = $('.edges-container');
        if ($container.length === 0) return;

        $container.empty();

        // Group edges by category
        const groupedEdges = {
            'Asset': [],
            'Aptitude': [],
            'Endowment': []
        };

        this.edges.forEach(edge => {
            if (groupedEdges[edge.category]) {
                groupedEdges[edge.category].push(edge);
            }
        });

        // Render each category
        Object.keys(groupedEdges).forEach(category => {
            if (groupedEdges[category].length > 0) {
                const $categorySection = this.createCategorySection(category, groupedEdges[category]);
                $container.append($categorySection);
            }
        });

        // Add edge button
        if (!window.LockManager || !window.LockManager.isLocked || !window.LockManager.isLocked()) {
            const $addButton = $(`
                <button type="button" id="add-edge" class="btn btn-sm theme-btn-outline-primary mt-2">
                    <i class="bi bi-plus-circle"></i> Add Edge
                </button>
            `);
            $container.append($addButton);
        }
    }

    /**
     * Create a category section
     */
    createCategorySection(category, edges) {
        const $section = $(`
            <div class="edge-category mb-3">
                <h6 class="edge-category-title">${category}</h6>
                <div class="edge-items"></div>
            </div>
        `);

        edges.forEach(edge => {
            const $edgeItem = this.createEdgeItem(edge);
            $section.find('.edge-items').append($edgeItem);
        });

        return $section;
    }

    /**
     * Create HTML for an edge item
     */
    createEdgeItem(edge) {
        const $item = $(`
            <div class="edge-item" data-edge-name="${edge.name}">
                <div class="edge-header d-flex justify-content-between align-items-start">
                    <div class="edge-info">
                        <h6 class="edge-name">${edge.name}</h6>
                        <p class="edge-description">${edge.description}</p>
                    </div>
                    ${!window.LockManager || !window.LockManager.isLocked || !window.LockManager.isLocked() ? 
                        `<button type="button" class="btn btn-sm btn-outline-danger remove-edge">
                            <i class="bi bi-trash"></i>
                        </button>` : ''
                    }
                </div>
                ${edge.perks && edge.perks.length > 0 ? `
                    <div class="edge-perks">
                        <strong>Perks:</strong>
                        <ul class="edge-perks-list">
                            ${edge.perks.map(perk => `<li>${perk}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${edge.requirements ? `
                    <div class="edge-requirements">
                        <small class="text-muted">
                            <strong>Requirements:</strong> ${edge.requirements}
                        </small>
                    </div>
                ` : ''}
            </div>
        `);

        return $item;
    }

    /**
     * Add a new edge
     */
    async addEdge(edgeName, category = null) {
        try {
            // Find edge data
            let edgeData = null;
            if (category) {
                edgeData = this.edgeData[category]?.find(edge => edge.name === edgeName);
            } else {
                // Search all categories
                for (const cat in this.edgeData) {
                    edgeData = this.edgeData[cat]?.find(edge => edge.name === edgeName);
                    if (edgeData) break;
                }
            }

            if (!edgeData) {
                console.error('Edge not found:', edgeName);
                return false;
            }

            // Check if edge already exists
            if (this.edges.find(edge => edge.name === edgeName)) {
                console.warn('Edge already exists:', edgeName);
                return false;
            }

            // Validate requirements
            if (!this.validateEdgeRequirements(edgeData)) {
                console.warn('Edge requirements not met:', edgeName);
                return false;
            }

            // Add edge
            this.edges.push(edgeData);

            // Save to character data
            await this.saveEdges();

            // Re-render
            this.render();

            console.log('Edge added:', edgeName);
            return true;

        } catch (err) {
            console.error('Failed to add edge:', err);
            return false;
        }
    }

    /**
     * Remove an edge
     */
    async removeEdge(edgeName) {
        try {
            const index = this.edges.findIndex(edge => edge.name === edgeName);
            if (index === -1) {
                console.warn('Edge not found:', edgeName);
                return false;
            }

            this.edges.splice(index, 1);

            // Save to character data
            await this.saveEdges();

            // Re-render
            this.render();

            console.log('Edge removed:', edgeName);
            return true;

        } catch (err) {
            console.error('Failed to remove edge:', err);
            return false;
        }
    }

    /**
     * Validate edge requirements
     */
    validateEdgeRequirements(edgeData) {
        // Basic validation - can be expanded based on requirements
        if (edgeData.requirements) {
            // For now, just check if it's not a duplicate
            return !this.edges.find(edge => edge.name === edgeData.name);
        }
        return true;
    }

    /**
     * Show modal for adding a new edge
     */
    showAddEdgeModal() {
        // Create modal HTML
        const modalHtml = `
            <div class="modal fade" id="addEdgeModal" tabindex="-1" aria-labelledby="addEdgeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addEdgeModalLabel">Add Edge</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="edge-category-select" class="form-label">Category</label>
                                    <select class="form-select" id="edge-category-select">
                                        <option value="">Select Category</option>
                                        <option value="Asset">Asset</option>
                                        <option value="Aptitude">Aptitude</option>
                                        <option value="Endowment">Endowment</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="edge-select" class="form-label">Edge</label>
                                    <select class="form-select" id="edge-select" disabled>
                                        <option value="">Select Edge</option>
                                    </select>
                                </div>
                            </div>
                            <div id="edge-preview" class="mt-3" style="display: none;">
                                <h6>Edge Preview</h6>
                                <div id="edge-preview-content"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn theme-btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" id="confirm-add-edge" class="btn theme-btn-primary" disabled>Add Edge</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        $('#addEdgeModal').remove();

        // Add modal to body
        $('body').append(modalHtml);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('addEdgeModal'));
        modal.show();

        // Set up modal event listeners
        this.setupModalEventListeners();
    }

    /**
     * Set up modal event listeners
     */
    setupModalEventListeners() {
        // Category change
        $('#edge-category-select').on('change', () => {
            this.populateEdgeDropdowns();
        });

        // Edge selection change
        $('#edge-select').on('change', () => {
            this.updateEdgePreview();
        });

        // Modal hidden
        $('#addEdgeModal').on('hidden.bs.modal', () => {
            $('#addEdgeModal').remove();
        });
    }

    /**
     * Populate edge dropdowns
     */
    populateEdgeDropdowns() {
        const category = $('#edge-category-select').val();
        const $edgeSelect = $('#edge-select');

        $edgeSelect.empty().append('<option value="">Select Edge</option>');

        if (category && this.edgeData[category]) {
            this.edgeData[category].forEach(edge => {
                // Check if edge is already added
                if (!this.edges.find(e => e.name === edge.name)) {
                    $edgeSelect.append(`<option value="${edge.name}">${edge.name}</option>`);
                }
            });
        }

        $edgeSelect.prop('disabled', !category);
        $('#confirm-add-edge').prop('disabled', true);
        $('#edge-preview').hide();
    }

    /**
     * Update edge preview
     */
    updateEdgePreview() {
        const category = $('#edge-category-select').val();
        const edgeName = $('#edge-select').val();

        if (!category || !edgeName) {
            $('#edge-preview').hide();
            $('#confirm-add-edge').prop('disabled', true);
            return;
        }

        const edgeData = this.edgeData[category]?.find(edge => edge.name === edgeName);
        if (!edgeData) {
            $('#edge-preview').hide();
            return;
        }

        const previewHtml = `
            <div class="edge-preview-item">
                <h6>${edgeData.name}</h6>
                <p>${edgeData.description}</p>
                ${edgeData.perks && edgeData.perks.length > 0 ? `
                    <div class="edge-perks">
                        <strong>Perks:</strong>
                        <ul>
                            ${edgeData.perks.map(perk => `<li>${perk}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${edgeData.requirements ? `
                    <div class="edge-requirements">
                        <small class="text-muted">
                            <strong>Requirements:</strong> ${edgeData.requirements}
                        </small>
                    </div>
                ` : ''}
            </div>
        `;

        $('#edge-preview-content').html(previewHtml);
        $('#edge-preview').show();
        $('#confirm-add-edge').prop('disabled', false);
    }

    /**
     * Add edge from modal
     */
    async addEdgeFromModal() {
        const category = $('#edge-category-select').val();
        const edgeName = $('#edge-select').val();

        if (!category || !edgeName) return;

        const success = await this.addEdge(edgeName, category);
        if (success) {
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('addEdgeModal'));
            modal.hide();
        }
    }

    /**
     * Get all current edges
     */
    getEdges() {
        return this.edges;
    }

    /**
     * Set the edges array
     */
    setEdges(edges) {
        this.edges = edges || [];
        this.render();
    }

    /**
     * Save edges to character data
     */
    async saveEdges() {
        try {
            if (window.characterManager) {
                const character = await window.characterManager.getCurrentCharacter();
                if (character) {
                    character.edges = this.edges;
                    await window.characterManager.saveCurrentCharacter(character);
                }
            }
        } catch (err) {
            console.error('Failed to save edges:', err);
        }
    }

    /**
     * Load edges from character data
     */
    async loadEdges() {
        try {
            if (window.characterManager) {
                const character = await window.characterManager.getCurrentCharacter();
                if (character && character.edges) {
                    this.edges = character.edges;
                    this.render();
                }
            }
        } catch (err) {
            console.error('Failed to load edges:', err);
        }
    }
}

// Create and export the edge manager instance
const edgeManager = new EdgeManager();

// Initialize when DOM is ready
$(document).ready(async () => {
    await edgeManager.init();
});

// Expose globally for use by other modules
window.edgeManager = edgeManager;

export default edgeManager; 