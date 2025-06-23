/**
 * NavigationPanel - App-wide navigation and settings panel
 * Extends BaseComponent and integrates with AppRouter
 */
class NavigationPanel extends BaseComponent {
    constructor(id, config = {}) {
        super(id, config);
        this.currentView = 'dashboard';
        this.userProfile = null;
        this.appSettings = {};
        
        // Bind methods
        this.handleViewSwitch = this.handleViewSwitch.bind(this);
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.loadUserProfile = this.loadUserProfile.bind(this);
        this.loadAppSettings = this.loadAppSettings.bind(this);
    }

    /**
     * Initialize component
     */
    async onInit() {
        await this.loadUserProfile();
        await this.loadAppSettings();
        
        // Listen for view changes from AppRouter
        if (window.AppRouter && typeof window.AppRouter.instance?.onViewChange === 'function') {
            window.AppRouter.instance.onViewChange((viewName) => {
                this.currentView = viewName;
                this.updateActiveView();
            });
        }
    }

    /**
     * Render the navigation panel
     * @returns {string} HTML string
     */
    render() {
        return `
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="mb-0">
                        <i class="bi bi-compass"></i> Navigation
                    </h5>
                </div>
                <div class="card-body p-0">
                    <!-- View Navigation Section -->
                    <div class="p-3 border-bottom">
                        <h6 class="mb-2">
                            <i class="bi bi-window-stack"></i> Views
                        </h6>
                        <div class="nav-list">
                            <button class="nav-item ${this.currentView === 'dashboard' ? 'active' : ''}" 
                                    data-view="dashboard">
                                <i class="bi bi-grid-3x3-gap"></i>
                                <span>Dashboard</span>
                            </button>
                            <button class="nav-item ${this.currentView === 'character-sheet' ? 'active' : ''}" 
                                    data-view="character-sheet">
                                <i class="bi bi-person-lines-fill"></i>
                                <span>Character Sheet</span>
                            </button>
                        </div>
                    </div>

                    <!-- Quick Actions Section -->
                    <div class="p-3 border-bottom">
                        <h6 class="mb-2">
                            <i class="bi bi-lightning"></i> Quick Actions
                        </h6>
                        <div class="nav-list">
                            <button class="nav-item" data-action="new-character">
                                <i class="bi bi-plus-circle"></i>
                                <span>New Character</span>
                            </button>
                            <button class="nav-item" data-action="import-data">
                                <i class="bi bi-upload"></i>
                                <span>Import Data</span>
                            </button>
                            <button class="nav-item" data-action="export-data">
                                <i class="bi bi-download"></i>
                                <span>Export Data</span>
                            </button>
                        </div>
                    </div>

                    <!-- Settings Section -->
                    <div class="p-3 border-bottom">
                        <h6 class="mb-2">
                            <i class="bi bi-gear"></i> Settings
                        </h6>
                        <div class="nav-list">
                            <button class="nav-item" data-action="preferences">
                                <i class="bi bi-sliders"></i>
                                <span>Preferences</span>
                            </button>
                            <button class="nav-item" data-action="backup-settings">
                                <i class="bi bi-cloud-arrow-up"></i>
                                <span>Backup Settings</span>
                            </button>
                            <button class="nav-item" data-action="data-management">
                                <i class="bi bi-database"></i>
                                <span>Data Management</span>
                            </button>
                        </div>
                    </div>

                    <!-- Help & Documentation Section -->
                    <div class="p-3 border-bottom">
                        <h6 class="mb-2">
                            <i class="bi bi-question-circle"></i> Help
                        </h6>
                        <div class="nav-list">
                            <button class="nav-item" data-action="user-guide">
                                <i class="bi bi-book"></i>
                                <span>User Guide</span>
                            </button>
                            <button class="nav-item" data-action="documentation">
                                <i class="bi bi-file-text"></i>
                                <span>Documentation</span>
                            </button>
                            <button class="nav-item" data-action="about">
                                <i class="bi bi-info-circle"></i>
                                <span>About</span>
                            </button>
                        </div>
                    </div>

                    <!-- User Profile Section -->
                    <div class="p-3">
                        <h6 class="mb-2">
                            <i class="bi bi-person-circle"></i> Profile
                        </h6>
                        <div class="user-profile-section">
                            ${this.renderUserProfile()}
                        </div>
                        <div class="nav-list mt-2">
                            <button class="nav-item" data-action="profile-settings">
                                <i class="bi bi-person-gear"></i>
                                <span>Profile Settings</span>
                            </button>
                            <button class="nav-item" data-action="logout">
                                <i class="bi bi-box-arrow-right"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Post-render setup
     */
    async afterRender() {
        // Bind view switching buttons
        const viewButtons = this.element.querySelectorAll('[data-view]');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                this.handleViewSwitch(view);
            });
        });

        // Bind action buttons
        const actionButtons = this.element.querySelectorAll('[data-action]');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.getAttribute('data-action');
                this.handleActionClick(action);
            });
        });

        // Bind theme toggle if present
        const themeToggle = this.element.querySelector('#theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', this.handleThemeToggle);
        }
    }

    /**
     * Render user profile section
     * @returns {string} HTML string
     */
    renderUserProfile() {
        if (!this.userProfile) {
            return `
                <div class="user-profile-placeholder text-center py-3">
                    <i class="bi bi-person-circle display-4 text-muted"></i>
                    <p class="text-muted mt-2">Guest User</p>
                </div>
            `;
        }

        return `
            <div class="user-profile-info d-flex align-items-center p-2 rounded bg-light">
                <div class="user-avatar me-3">
                    <div class="avatar-circle">
                        <span class="avatar-text">${this.getUserInitials()}</span>
                    </div>
                </div>
                <div class="user-details">
                    <div class="fw-bold">${this.userProfile.name || 'User'}</div>
                    <div class="text-muted small">${this.userProfile.email || 'No email'}</div>
                    <div class="text-muted small">Last active: ${this.formatLastActive()}</div>
                </div>
            </div>
        `;
    }

    /**
     * Get user initials
     * @returns {string} User initials
     */
    getUserInitials() {
        if (!this.userProfile || !this.userProfile.name) return 'U';
        return this.userProfile.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
    }

    /**
     * Format last active time
     * @returns {string} Formatted time
     */
    formatLastActive() {
        if (!this.userProfile || !this.userProfile.lastActive) return 'Unknown';
        
        const date = new Date(this.userProfile.lastActive);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return date.toLocaleDateString();
    }

    /**
     * Handle view switching
     * @param {string} view - View name
     */
    handleViewSwitch(view) {
        this.currentView = view;
        this.updateActiveView();
        
        // Use centralized navigation methods
        if (view === 'dashboard') {
            if (window.navigateToDashboard) {
                window.navigateToDashboard();
            } else if (window.AppRouter && window.AppRouter.instance) {
                window.AppRouter.instance.navigateTo('DashboardView');
            }
        } else if (view === 'character-sheet') {
            if (window.navigateToCharacterSheet) {
                window.navigateToCharacterSheet();
            } else if (window.AppRouter && window.AppRouter.instance) {
                window.AppRouter.instance.navigateTo('CharacterSheetView');
            }
        }
        
        // Emit view change event
        this.emit('viewChanged', { view: view });
    }

    /**
     * Handle action button clicks
     * @param {string} action - Action name
     */
    handleActionClick(action) {
        switch (action) {
            case 'new-character':
                this.handleNewCharacter();
                break;
            case 'import-data':
                this.handleImportData();
                break;
            case 'export-data':
                this.handleExportData();
                break;
            case 'preferences':
                this.handlePreferences();
                break;
            case 'backup-settings':
                this.handleBackupSettings();
                break;
            case 'data-management':
                this.handleDataManagement();
                break;
            case 'user-guide':
                this.handleUserGuide();
                break;
            case 'documentation':
                this.handleDocumentation();
                break;
            case 'about':
                this.handleAbout();
                break;
            case 'profile-settings':
                this.handleProfileSettings();
                break;
            case 'logout':
                this.handleLogout();
                break;
        }
        
        // Emit action event
        this.emit('actionTriggered', { action: action });
    }

    /**
     * Handle new character action
     */
    handleNewCharacter() {
        if (window.characterManager && typeof window.characterManager.createCharacter === 'function') {
            window.characterManager.createCharacter().then(character => {
                if (character) {
                    this.handleViewSwitch('character-sheet');
                }
            });
        } else {
            this.handleViewSwitch('character-sheet');
        }
    }

    /**
     * Handle import data action
     */
    handleImportData() {
        if (window.backupManager && typeof window.backupManager.importData === 'function') {
            window.backupManager.importData();
        } else {
            // Fallback: create file input
            this.createFileInput('import');
        }
    }

    /**
     * Handle export data action
     */
    handleExportData() {
        if (window.backupManager && typeof window.backupManager.exportData === 'function') {
            window.backupManager.exportData();
        } else {
            // Fallback: export current data
            this.exportCurrentData();
        }
    }

    /**
     * Handle preferences action
     */
    handlePreferences() {
        this.emit('openPreferences');
        // Could show a preferences modal or navigate to preferences view
        alert('Preferences panel coming soon!');
    }

    /**
     * Handle backup settings action
     */
    handleBackupSettings() {
        if (window.backupManager && typeof window.backupManager.showBackupModal === 'function') {
            window.backupManager.showBackupModal();
        } else {
            alert('Backup manager not available');
        }
    }

    /**
     * Handle data management action
     */
    handleDataManagement() {
        this.emit('openDataManagement');
        alert('Data management panel coming soon!');
    }

    /**
     * Handle user guide action
     */
    handleUserGuide() {
        // Open user guide in new tab
        window.open('USER_GUIDE.md', '_blank');
    }

    /**
     * Handle documentation action
     */
    handleDocumentation() {
        // Open documentation in new tab
        window.open('DOCUMENTATION.md', '_blank');
    }

    /**
     * Handle about action
     */
    handleAbout() {
        this.showAboutModal();
    }

    /**
     * Handle profile settings action
     */
    handleProfileSettings() {
        this.emit('openProfileSettings');
        alert('Profile settings coming soon!');
    }

    /**
     * Handle logout action
     */
    handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            this.emit('logout');
            // Clear user data and redirect to login or reset app state
            localStorage.removeItem('ledger_user_profile');
            location.reload();
        }
    }

    /**
     * Show about modal
     */
    showAboutModal() {
        const modalHtml = `
            <div class="modal fade" id="aboutModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">About The Ledger</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center mb-3">
                                <h4>The Ledger</h4>
                                <p class="text-muted">Vampire: The Masquerade Character Manager</p>
                                <p>Version 1.0.0</p>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <strong>Features:</strong>
                                    <ul class="small">
                                        <li>Character Creation & Management</li>
                                        <li>Multi-Character Support</li>
                                        <li>Import/Export Functionality</li>
                                        <li>Backup & Restore</li>
                                    </ul>
                                </div>
                                <div class="col-6">
                                    <strong>Links:</strong>
                                    <ul class="small">
                                        <li><a href="README.md" target="_blank">README</a></li>
                                        <li><a href="LICENSE.md" target="_blank">License</a></li>
                                        <li><a href="CHANGELOG.md" target="_blank">Changelog</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body if not exists
        if (!document.getElementById('aboutModal')) {
            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('aboutModal'));
        modal.show();
    }

    /**
     * Create file input for import
     * @param {string} type - 'import'
     */
    createFileInput(type) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.style.display = 'none';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileImport(file);
            }
        });
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }

    /**
     * Handle file import
     * @param {File} file - File to import
     */
    async handleFileImport(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (data.characters && Array.isArray(data.characters)) {
                localStorage.setItem('ledger_characters', JSON.stringify(data.characters));
                alert(`Successfully imported ${data.characters.length} characters!`);
                location.reload(); // Refresh to show imported data
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            console.error('Failed to import file:', error);
            alert('Failed to import file. Please check the file format.');
        }
    }

    /**
     * Export current data
     */
    exportCurrentData() {
        try {
            const stored = localStorage.getItem('ledger_characters');
            const characters = stored ? JSON.parse(stored) : [];
            
            const data = {
                characters: characters,
                exportedAt: new Date().toISOString(),
                version: '1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `ledger-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            alert(`Successfully exported ${characters.length} characters!`);
        } catch (error) {
            console.error('Failed to export data:', error);
            alert('Failed to export data. Please try again.');
        }
    }

    /**
     * Handle theme toggle
     * @param {Event} event
     */
    handleThemeToggle(event) {
        const isDark = event.target.checked;
        this.setTheme(isDark ? 'dark' : 'light');
        this.emit('themeChanged', { theme: isDark ? 'dark' : 'light' });
    }

    /**
     * Set application theme
     * @param {string} theme - 'light' or 'dark'
     */
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('ledger_theme', theme);
    }

    /**
     * Load user profile from storage
     */
    async loadUserProfile() {
        try {
            const stored = localStorage.getItem('ledger_user_profile');
            this.userProfile = stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Failed to load user profile:', error);
            this.userProfile = null;
        }
    }

    /**
     * Load app settings from storage
     */
    async loadAppSettings() {
        try {
            const stored = localStorage.getItem('ledger_app_settings');
            this.appSettings = stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to load app settings:', error);
            this.appSettings = {};
        }
    }

    /**
     * Update active view styling
     */
    updateActiveView() {
        const navItems = this.element.querySelectorAll('.nav-item[data-view]');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-view') === this.currentView) {
                item.classList.add('active');
            }
        });
    }
}

// Add CSS for navigation panel
const navigationStyle = document.createElement('style');
navigationStyle.textContent = `
    .nav-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
    
    .nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        border: none;
        background: none;
        border-radius: 0.375rem;
        color: #6c757d;
        text-decoration: none;
        transition: all 0.2s;
        cursor: pointer;
        width: 100%;
        text-align: left;
    }
    
    .nav-item:hover {
        background-color: #f8f9fa;
        color: #495057;
    }
    
    .nav-item.active {
        background-color: #e3f2fd;
        color: #2196f3;
        font-weight: 500;
    }
    
    .nav-item i {
        width: 16px;
        text-align: center;
    }
    
    .user-profile-info {
        transition: background-color 0.2s;
    }
    
    .user-profile-info:hover {
        background-color: #e9ecef !important;
    }
    
    .avatar-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #6c757d;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
    }
    
    .user-profile-placeholder {
        border: 2px dashed #dee2e6;
        border-radius: 0.375rem;
    }
    
    @media (max-width: 768px) {
        .nav-item {
            padding: 0.75rem;
        }
        
        .nav-item span {
            font-size: 0.9rem;
        }
    }
`;

document.head.appendChild(navigationStyle);

// Attach to global scope for dynamic loading
window.NavigationPanel = NavigationPanel;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationPanel;
} 