# Ledger Refactor Plan: Single Page Application with Component Architecture

## Overview

This document outlines a comprehensive refactor of The Ledger application to transform it from a single-character sheet application into a modular, component-based Single Page Application (SPA) with a dashboard interface for managing multiple characters.

## Current State Analysis

### Current Architecture
- **Single HTML file** (`index.html`) containing the entire character sheet structure
- **Monolithic JavaScript** with large files like `character-sheet.js` (973 lines)
- **Direct DOM manipulation** using jQuery throughout the codebase
- **No component system** - all functionality is tightly coupled
- **Single character focus** - no dashboard or multi-character management UI
- **Script loading** - all scripts loaded at startup with manual initialization

### Current File Structure
```
js/
├── character-sheet.js (973 lines - monolithic)
├── character-manager.js (726 lines - basic multi-character support)
├── database-manager.js
├── Various manager files (discipline-manager.js, merit-flaw-manager.js, etc.)
└── components/ (empty directories)
    ├── character-sheet/
    ├── dashboard/
    ├── panels/
    ├── shared/
    └── ui/
```

## Target Architecture

### New Application Structure
```
index.html (SPA container)
├── Dashboard View (default)
│   ├── Character List Panel
│   ├── Quick Actions Panel
│   └── Navigation Panel
└── Character Sheet View
    ├── Information Panel Component
    ├── Attributes Panel Component
    ├── Skills Panel Component
    ├── Vitals Panel Component
    ├── Disciplines Panel Component
    ├── Merits/Flaws Panel Component
    ├── Backgrounds Panel Component
    ├── Loresheets Panel Component
    ├── Convictions Panel Component
    └── Experience Panel Component
```

### Component Architecture
- **Base Component Class** - Provides lifecycle management, event handling, and rendering
- **Panel Components** - Reusable UI panels that can be loaded dynamically
- **View Components** - Dashboard and Character Sheet views
- **Shared Components** - Common UI elements (buttons, modals, etc.)
- **Component Registry** - Dynamic component loading and management

### Script Management
- **Script Manager** - Handles component loading, dependency management, and initialization
- **Module System** - ES6 modules with proper dependency injection
- **Lazy Loading** - Components loaded on-demand based on view state

## Refactor Phases

### Phase 1: Foundation & Infrastructure
1. **Create Base Component System**
   - Base Component class with lifecycle methods
   - Component registry and manager
   - Event system for component communication

2. **Implement Script Manager**
   - Dynamic script loading
   - Dependency management
   - Component initialization orchestration

3. **Restructure HTML for SPA**
   - Add dashboard and character sheet containers
   - Implement view switching system
   - Set up CSS display-based view management

### Phase 2: Dashboard Implementation
1. **Create Dashboard View Component**
   - Main dashboard layout
   - Navigation between views
   - Character list management

2. **Implement Character List Panel**
   - Display all characters
   - Character creation/deletion
   - Character switching functionality

3. **Add Quick Actions Panel**
   - Recent characters
   - Quick character creation
   - Import/export functionality

### Phase 3: Character Sheet Componentization
1. **Break Down Character Sheet**
   - Extract each panel into separate components
   - Implement component interfaces
   - Create shared utilities

2. **Create Panel Components**
   - Information Panel
   - Attributes Panel
   - Skills Panel
   - Vitals Panel
   - Disciplines Panel
   - Merits/Flaws Panel
   - Backgrounds Panel
   - Loresheets Panel
   - Convictions Panel
   - Experience Panel

3. **Implement Character Sheet View**
   - Dynamic panel loading
   - Panel state management
   - Character data binding

### Phase 4: Integration & Testing
1. **Connect Components**
   - Data flow between components
   - Event handling and communication
   - State synchronization

2. **Migrate Existing Functionality**
   - Move existing managers to component system
   - Update data binding
   - Preserve existing features

3. **Testing & Optimization**
   - Component testing
   - Performance optimization
   - Bug fixes and refinements

### Phase 5: Cleanup & Optimization
1. **Code Cleanup**
   - Remove legacy monolithic files
   - Clean up unused functions and variables
   - Remove dead code and comments
   - Standardize code formatting and naming

2. **Performance Optimization**
   - Remove unused CSS/SCSS rules
   - Optimize bundle size and loading
   - Fix memory leaks and performance issues
   - Implement code splitting and lazy loading

3. **Dependency Management**
   - Audit and remove unused npm packages
   - Update outdated dependencies
   - Clean up package.json and package-lock.json
   - Optimize dependency tree

4. **File System Organization**
   - Remove temporary and backup files
   - Reorganize assets and resources
   - Clean up development artifacts
   - Optimize file structure

5. **Documentation & Standards**
   - Add comprehensive JSDoc comments
   - Create component documentation
   - Establish coding standards
   - Add ESLint and Prettier configuration

## Detailed Implementation Plan

### 1. Base Component System

**File: `js/core/BaseComponent.js`**
```javascript
class BaseComponent {
    constructor(id, config = {}) {
        this.id = id;
        this.config = config;
        this.element = null;
        this.isMounted = false;
        this.eventListeners = new Map();
    }

    // Lifecycle methods
    async init() { /* Initialize component */ }
    async mount(container) { /* Mount to DOM */ }
    async unmount() { /* Remove from DOM */ }
    async update(data) { /* Update component data */ }
    async destroy() { /* Cleanup resources */ }

    // Event system
    on(event, handler) { /* Add event listener */ }
    emit(event, data) { /* Emit event */ }
    off(event, handler) { /* Remove event listener */ }

    // Rendering
    render() { /* Return HTML string */ }
    afterRender() { /* Post-render setup */ }
}
```

### 2. Component Registry

**File: `js/core/ComponentRegistry.js`**
```javascript
class ComponentRegistry {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    register(name, componentClass) { /* Register component */ }
    async load(name) { /* Load component dynamically */ }
    async create(name, config) { /* Create component instance */ }
    get(name) { /* Get component class */ }
}
```

### 3. Script Manager

**File: `js/core/ScriptManager.js`**
```javascript
class ScriptManager {
    constructor() {
        this.loadedScripts = new Set();
        this.loadingPromises = new Map();
    }

    async loadScript(path) { /* Load single script */ }
    async loadComponent(name) { /* Load component and dependencies */ }
    async loadView(viewName) { /* Load view and all components */ }
    isLoaded(path) { /* Check if script is loaded */ }
}
```

### 4. Application Router

**File: `js/core/AppRouter.js`**
```javascript
class AppRouter {
    constructor() {
        this.currentView = null;
        this.views = new Map();
    }

    registerView(name, viewClass) { /* Register view */ }
    async navigateTo(viewName, params) { /* Navigate to view */ }
    getCurrentView() { /* Get current view */ }
}
```

## Component Breakdown

### Dashboard Components
1. **DashboardView** - Main dashboard container
2. **CharacterListPanel** - List of all characters
3. **QuickActionsPanel** - Recent actions and shortcuts
4. **NavigationPanel** - App navigation

### Character Sheet Components
1. **CharacterSheetView** - Main character sheet container
2. **InformationPanel** - Character basic info
3. **AttributesPanel** - Physical, Social, Mental attributes
4. **SkillsPanel** - All skill categories
5. **VitalsPanel** - Health, Willpower, Hunger, Humanity
6. **DisciplinesPanel** - Discipline management
7. **MeritsFlawsPanel** - Merits and flaws
8. **BackgroundsPanel** - Character backgrounds
9. **LoresheetsPanel** - Loresheet management
10. **ConvictionsPanel** - Convictions and touchstones
11. **ExperiencePanel** - XP tracking and spending

### Shared Components
1. **ModalComponent** - Reusable modal dialogs
2. **ButtonComponent** - Standardized buttons
3. **DropdownComponent** - Dropdown menus
4. **TrackBoxComponent** - Health/willpower tracks
5. **DotTrackComponent** - Attribute/skill dots

## Data Flow Architecture

### State Management
- **Character State** - Current character data
- **View State** - Current view and navigation
- **Component State** - Individual component data
- **Global State** - App-wide settings and preferences

### Event System
- **Component Events** - Internal component communication
- **View Events** - Cross-view communication
- **Global Events** - App-wide events (character switch, save, etc.)

## Migration Strategy

### Step-by-Step Migration
1. **Preserve Current Functionality** - Ensure no features are lost during migration
2. **Incremental Migration** - Move one component at a time
3. **Backward Compatibility** - Maintain existing data structures
4. **Testing at Each Step** - Verify functionality after each migration

### Data Migration
- **Character Data** - Preserve existing character data format
- **Settings** - Migrate user preferences and settings
- **Backup System** - Maintain existing backup functionality

## Implementation Prompts

### Phase 1 Prompts

1. **"Create the BaseComponent class with lifecycle methods, event system, and rendering capabilities"**

2. **"Implement the ComponentRegistry for dynamic component loading and management"**

3. **"Create the ScriptManager for handling script dependencies and dynamic loading"**

4. **"Restructure index.html to support both dashboard and character sheet views with CSS-based view switching"**

5. **"Implement the AppRouter for handling view navigation and state management"**

### Phase 2 Prompts

6. **"Create the DashboardView component with navigation and layout structure"**

7. **"Implement the CharacterListPanel component for displaying and managing multiple characters"**

8. **"Create the QuickActionsPanel component for recent actions and shortcuts"**

9. **"Implement the NavigationPanel component for app-wide navigation"**

### Phase 3 Prompts

10. **"Extract the Information panel from character-sheet.js into a reusable InformationPanel component"**

11. **"Create the AttributesPanel component for managing Physical, Social, and Mental attributes"**

12. **"Implement the SkillsPanel component for all skill categories and specialties"**

13. **"Create the VitalsPanel component for Health, Willpower, Hunger, and Humanity tracks"**

14. **"Extract the Disciplines panel into a DisciplinesPanel component"**

15. **"Create the MeritsFlawsPanel component for managing merits and flaws"**

16. **"Implement the BackgroundsPanel component for character backgrounds"**

17. **"Create the LoresheetsPanel component for loresheet management"**

18. **"Extract the Convictions panel into a ConvictionsPanel component"**

19. **"Create the ExperiencePanel component for XP tracking and spending"**

20. **"Implement the CharacterSheetView component that dynamically loads all panel components"**

### Phase 4 Prompts

21. **"Migrate existing character data loading and saving to work with the new component system"**

22. **"Update all existing managers (discipline-manager, merit-flaw-manager, etc.) to work with the component architecture"**

23. **"Implement proper event communication between components for data synchronization"**

24. **"Add comprehensive error handling and loading states to all components"**

25. **"Create component testing utilities and verify all functionality works correctly"**

### Phase 5 Prompts

26. **"Remove legacy monolithic files and clean up unused code after component migration"**

27. **"Optimize CSS/SCSS by removing unused rules and implementing better organization"**

28. **"Audit and clean up npm dependencies, removing unused packages and updating outdated ones"**

29. **"Implement code formatting standards with ESLint and Prettier configuration"**

30. **"Add comprehensive JSDoc documentation to all components and core systems"**

31. **"Optimize bundle size and implement code splitting for better performance"**

32. **"Clean up file system by removing temporary files and reorganizing assets"**

33. **"Fix memory leaks and performance issues identified during testing"**

34. **"Create component documentation and establish coding standards"**

35. **"Final testing and validation of all cleanup and optimization changes"**

## Success Criteria

### Functional Requirements
- [ ] Dashboard loads as default view
- [ ] Multiple characters can be managed from dashboard
- [ ] Character sheet loads with all existing functionality
- [ ] All panels are modular and reusable
- [ ] Components can be loaded dynamically
- [ ] No existing features are lost

### Technical Requirements
- [ ] Clean component architecture
- [ ] Proper lifecycle management
- [ ] Event-driven communication
- [ ] Dynamic script loading
- [ ] Maintainable code structure
- [ ] Performance optimization
- [ ] Clean, documented codebase
- [ ] Optimized bundle size

### User Experience Requirements
- [ ] Smooth navigation between views
- [ ] Fast component loading
- [ ] Intuitive character management
- [ ] Preserved user workflows
- [ ] Responsive design maintained
- [ ] Improved performance

## Risk Mitigation

### Potential Risks
1. **Data Loss** - Comprehensive testing of data migration
2. **Feature Regression** - Incremental migration with testing
3. **Performance Issues** - Lazy loading and optimization
4. **Complexity** - Clear documentation and modular design
5. **Code Quality** - Automated linting and formatting

### Mitigation Strategies
1. **Backup System** - Maintain existing backup functionality
2. **Feature Flags** - Ability to rollback to old system
3. **Testing** - Comprehensive testing at each phase
4. **Documentation** - Clear documentation for future development
5. **Code Standards** - Automated quality checks

## Timeline Estimate

- **Phase 1**: 2-3 weeks (Foundation)
- **Phase 2**: 1-2 weeks (Dashboard)
- **Phase 3**: 3-4 weeks (Componentization)
- **Phase 4**: 2-3 weeks (Integration)
- **Phase 5**: 1-2 weeks (Cleanup & Optimization)

**Total Estimated Time**: 9-14 weeks

## Next Steps

1. **Review and approve this plan**
2. **Set up development environment**
3. **Begin Phase 1 implementation**
4. **Create component testing framework**
5. **Start with BaseComponent implementation**

This refactor will transform The Ledger into a modern, maintainable, and extensible application that can easily support future features like Werewolf and Hunter character sheets. 