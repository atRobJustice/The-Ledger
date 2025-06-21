# Ledger Refactor Implementation Guide

## Quick Start Prompts

Use these exact prompts to guide the refactor implementation. Each prompt should be executed in sequence.

### Phase 1: Foundation & Infrastructure

#### Prompt 1: Create BaseComponent Class
```
Create the BaseComponent class in js/core/BaseComponent.js with the following features:
- Constructor that takes an id and config object
- Lifecycle methods: init(), mount(container), unmount(), update(data), destroy()
- Event system: on(event, handler), emit(event, data), off(event, handler)
- Rendering methods: render() (returns HTML string), afterRender() (post-render setup)
- Properties: id, config, element, isMounted, eventListeners (Map)
- Proper error handling and logging
- Support for async operations in lifecycle methods
```

#### Prompt 2: Create ComponentRegistry
```
Implement the ComponentRegistry class in js/core/ComponentRegistry.js with:
- Constructor with components (Map) and loadedComponents (Set)
- register(name, componentClass) - register a component class
- async load(name) - dynamically load component script
- async create(name, config) - create component instance
- get(name) - get registered component class
- unregister(name) - remove component registration
- list() - get all registered component names
- Proper error handling for missing components
```

#### Prompt 3: Create ScriptManager
```
Create the ScriptManager class in js/core/ScriptManager.js with:
- Constructor with loadedScripts (Set) and loadingPromises (Map)
- async loadScript(path) - load single script file
- async loadComponent(name) - load component and its dependencies
- async loadView(viewName) - load view and all required components
- isLoaded(path) - check if script is already loaded
- getLoadingPromise(path) - get existing loading promise
- clearCache() - clear loaded scripts cache
- Support for dependency resolution and circular dependency detection
```

#### Prompt 4: Create AppRouter
```
Implement the AppRouter class in js/core/AppRouter.js with:
- Constructor with currentView and views (Map)
- registerView(name, viewClass) - register a view component
- async navigateTo(viewName, params) - navigate to specified view
- getCurrentView() - get current view instance
- getView(name) - get registered view class
- onViewChange(callback) - listen for view changes
- Support for view parameters and state preservation
- Proper cleanup of previous view when navigating
```

#### Prompt 5: Restructure index.html for SPA
```
Restructure index.html to support both dashboard and character sheet views:
- Add a main app container with id "app"
- Create dashboard view container with id "dashboard-view" (initially visible)
- Create character sheet view container with id "character-sheet-view" (initially hidden)
- Move existing character sheet content into character-sheet-view
- Add navigation elements for switching between views
- Keep all existing script tags but organize them better
- Add CSS classes for view switching (show/hide based on display property)
- Ensure the dashboard view loads by default instead of character sheet
```

### Phase 2: Dashboard Implementation

#### Prompt 6: Create DashboardView Component
```
Create the DashboardView component in js/components/dashboard/DashboardView.js:
- Extend BaseComponent
- Render dashboard layout with navigation header
- Include panels for character list, quick actions, and navigation
- Handle view switching to character sheet
- Support for responsive design
- Event handling for character selection
- Integration with AppRouter for navigation
```

#### Prompt 7: Create CharacterListPanel Component
```
Implement the CharacterListPanel component in js/components/dashboard/CharacterListPanel.js:
- Extend BaseComponent
- Display list of all characters with names and basic info
- Support for character creation, editing, and deletion
- Character switching functionality
- Search and filter capabilities
- Character thumbnails or avatars
- Integration with existing character-manager.js
- Event emission for character selection
```

#### Prompt 8: Create QuickActionsPanel Component
```
Create the QuickActionsPanel component in js/components/dashboard/QuickActionsPanel.js:
- Extend BaseComponent
- Show recent characters for quick access
- Quick character creation button
- Import/export functionality
- Recent actions history
- Quick navigation shortcuts
- Integration with backup-manager.js
- Event handling for quick actions
```

#### Prompt 9: Create NavigationPanel Component
```
Implement the NavigationPanel component in js/components/dashboard/NavigationPanel.js:
- Extend BaseComponent
- App-wide navigation menu
- View switching controls
- Settings and preferences access
- Help and documentation links
- User account/profile section
- Responsive navigation design
- Integration with AppRouter
```

### Phase 3: Character Sheet Componentization

#### Prompt 10: Extract InformationPanel Component
```
Extract the Information panel from character-sheet.js into InformationPanel component:
- Create js/components/character-sheet/InformationPanel.js
- Extend BaseComponent
- Include name, concept, ambition, desire, predator type fields
- Include sire, clan, generation, compulsion fields
- Include chronicle, resonance, temperament fields
- Support for text inputs, dropdowns, and validation
- Event emission for data changes
- Integration with existing character data structure
- Preserve all existing functionality and styling
```

#### Prompt 11: Create AttributesPanel Component
```
Create the AttributesPanel component in js/components/character-sheet/AttributesPanel.js:
- Extend BaseComponent
- Physical attributes: Strength, Dexterity, Stamina
- Social attributes: Charisma, Manipulation, Composure
- Mental attributes: Intelligence, Wits, Resolve
- Dot-based attribute system with click handlers
- Support for lockable attributes (when character is locked)
- Event emission for attribute changes
- Integration with existing dot creation functions
- Preserve existing styling and behavior
```

#### Prompt 12: Create SkillsPanel Component
```
Implement the SkillsPanel component in js/components/character-sheet/SkillsPanel.js:
- Extend BaseComponent
- All skill categories: Physical, Social, Mental
- Dot-based skill system with specialties
- Support for skill specialties and custom specialties
- Integration with specialty-manager.js
- Event emission for skill changes
- Support for lockable skills
- Preserve existing skill data structure
- Maintain all existing functionality
```

#### Prompt 13: Create VitalsPanel Component
```
Create the VitalsPanel component in js/components/character-sheet/VitalsPanel.js:
- Extend BaseComponent
- Health track with superficial/aggravated damage
- Willpower track
- Hunger track (always editable)
- Humanity track
- Blood Potency display
- Track box system with impairment detection
- Event emission for vital changes
- Integration with existing track box functions
- Preserve impairment status functionality
```

#### Prompt 14: Extract DisciplinesPanel Component
```
Extract the Disciplines panel into DisciplinesPanel component:
- Create js/components/character-sheet/DisciplinesPanel.js
- Extend BaseComponent
- Integration with existing discipline-manager.js
- Support for all discipline types and levels
- Power selection and management
- Clan discipline bonuses
- Event emission for discipline changes
- Preserve all existing discipline functionality
- Maintain discipline data structure
```

#### Prompt 15: Create MeritsFlawsPanel Component
```
Create the MeritsFlawsPanel component in js/components/character-sheet/MeritsFlawsPanel.js:
- Extend BaseComponent
- Integration with existing merit-flaw-manager.js
- Support for merits and flaws
- Merit/flaw selection and management
- Point cost calculations
- Event emission for merit/flaw changes
- Preserve existing merit/flaw functionality
- Maintain data structure compatibility
```

#### Prompt 16: Create BackgroundsPanel Component
```
Implement the BackgroundsPanel component in js/components/character-sheet/BackgroundsPanel.js:
- Extend BaseComponent
- Integration with existing background-manager.js
- Support for individual and coterie backgrounds
- Background point allocation
- Background flaw management
- Event emission for background changes
- Preserve existing background functionality
- Maintain background data structure
```

#### Prompt 17: Create LoresheetsPanel Component
```
Create the LoresheetsPanel component in js/components/character-sheet/LoresheetsPanel.js:
- Extend BaseComponent
- Integration with existing loresheet-manager.js
- Loresheet selection and management
- Loresheet benefit tracking
- Event emission for loresheet changes
- Preserve existing loresheet functionality
- Maintain loresheet data structure
```

#### Prompt 18: Extract ConvictionsPanel Component
```
Extract the Convictions panel into ConvictionsPanel component:
- Create js/components/character-sheet/ConvictionsPanel.js
- Extend BaseComponent
- Integration with existing conviction-manager.js
- Conviction and touchstone management
- Conviction creation and editing
- Event emission for conviction changes
- Preserve existing conviction functionality
- Maintain conviction data structure
```

#### Prompt 19: Create ExperiencePanel Component
```
Create the ExperiencePanel component in js/components/character-sheet/ExperiencePanel.js:
- Extend BaseComponent
- Integration with existing xp-manager.js and xp-spend-manager.js
- XP tracking and display
- XP spending interface
- XP history tracking
- Event emission for XP changes
- Preserve existing XP functionality
- Maintain XP data structure
```

#### Prompt 20: Create CharacterSheetView Component
```
Implement the CharacterSheetView component in js/components/character-sheet/CharacterSheetView.js:
- Extend BaseComponent
- Dynamic loading of all panel components
- Panel layout and organization
- Character data binding to all panels
- Event coordination between panels
- Integration with existing character data loading/saving
- Support for character switching
- Preserve all existing character sheet functionality
```

### Phase 4: Integration & Testing

#### Prompt 21: Migrate Character Data System
```
Update the character data loading and saving system to work with the new component architecture:
- Modify character-manager.js to work with component system
- Update database-manager.js for component integration
- Implement character data binding to components
- Ensure data persistence across component updates
- Maintain backward compatibility with existing character data
- Add proper error handling for data operations
- Implement data validation and sanitization
```

#### Prompt 22: Update Existing Managers
```
Update all existing managers to work with the component architecture:
- Modify discipline-manager.js for component integration
- Update merit-flaw-manager.js for component system
- Adapt background-manager.js for component usage
- Update loresheet-manager.js for component integration
- Modify conviction-manager.js for component system
- Update xp-manager.js and xp-spend-manager.js for components
- Ensure all managers emit proper events for components
- Maintain existing functionality while adding component support
```

#### Prompt 23: Implement Component Communication
```
Implement proper event communication between components:
- Create global event bus for component communication
- Implement event system for character data changes
- Add event handling for view switching
- Create event system for panel updates
- Implement proper event cleanup and memory management
- Add event logging and debugging capabilities
- Ensure events are properly propagated between components
- Add error handling for event system
```

#### Prompt 24: Add Error Handling and Loading States
```
Add comprehensive error handling and loading states to all components:
- Implement loading indicators for component initialization
- Add error boundaries for component failures
- Create fallback UI for component errors
- Implement retry mechanisms for failed operations
- Add proper error logging and reporting
- Create user-friendly error messages
- Implement graceful degradation for missing components
- Add timeout handling for long-running operations
```

#### Prompt 25: Create Testing and Verification
```
Create component testing utilities and verify all functionality:
- Implement component testing framework
- Create unit tests for all components
- Add integration tests for component interactions
- Implement automated testing for character data operations
- Create manual testing checklist for all features
- Add performance testing for component loading
- Implement accessibility testing for components
- Create regression testing for existing functionality
```

### Phase 5: Cleanup & Optimization

#### Prompt 26: Remove Legacy Code
```
Remove legacy monolithic files and clean up unused code after component migration:
- Delete or archive the original character-sheet.js file
- Remove unused functions and variables from remaining files
- Clean up dead code and outdated comments
- Remove temporary files created during migration
- Archive old backup files and development artifacts
- Clean up unused imports and dependencies
- Remove deprecated code patterns and functions
- Ensure no broken references remain
```

#### Prompt 27: Optimize CSS/SCSS
```
Optimize CSS/SCSS by removing unused rules and implementing better organization:
- Remove unused CSS classes and rules
- Consolidate duplicate styles
- Organize SCSS files into logical structure
- Implement CSS purging for unused styles
- Optimize CSS selectors for better performance
- Remove vendor prefixes that are no longer needed
- Consolidate media queries
- Implement CSS minification for production
```

#### Prompt 28: Clean Up Dependencies
```
Audit and clean up npm dependencies, removing unused packages and updating outdated ones:
- Run npm audit to identify security vulnerabilities
- Remove unused packages from package.json
- Update outdated dependencies to latest stable versions
- Consolidate duplicate dependencies
- Remove development dependencies that are no longer needed
- Optimize package.json scripts
- Clean up package-lock.json
- Document dependency purposes and usage
```

#### Prompt 29: Implement Code Standards
```
Implement code formatting standards with ESLint and Prettier configuration:
- Create .eslintrc.js with appropriate rules for the project
- Configure .prettierrc for consistent code formatting
- Add pre-commit hooks for automatic formatting
- Create .editorconfig for consistent editor settings
- Implement TypeScript-like type checking with JSDoc
- Add code quality checks to build process
- Create coding standards documentation
- Set up automated code review tools
```

#### Prompt 30: Add Documentation
```
Add comprehensive JSDoc documentation to all components and core systems:
- Document all public methods and properties
- Add usage examples for complex components
- Create API documentation for component interfaces
- Document event system and data flow
- Add inline comments for complex logic
- Create component usage guides
- Document configuration options
- Add troubleshooting and FAQ sections
```

#### Prompt 31: Optimize Performance
```
Optimize bundle size and implement code splitting for better performance:
- Implement dynamic imports for component loading
- Add code splitting for different views
- Optimize image and asset loading
- Implement lazy loading for non-critical components
- Add service worker for caching
- Optimize JavaScript bundle size
- Implement tree shaking for unused code
- Add performance monitoring and metrics
```

#### Prompt 32: Clean File System
```
Clean up file system by removing temporary files and reorganizing assets:
- Remove .tmp, .cache, and other temporary directories
- Reorganize assets into logical folders
- Clean up backup files and development artifacts
- Optimize image sizes and formats
- Remove unused asset files
- Organize documentation files
- Clean up build artifacts
- Implement proper .gitignore rules
```

#### Prompt 33: Fix Performance Issues
```
Fix memory leaks and performance issues identified during testing:
- Fix event listener memory leaks
- Optimize DOM manipulation and rendering
- Fix circular references in component relationships
- Optimize data binding and update cycles
- Fix memory leaks in third-party libraries
- Optimize database queries and caching
- Fix performance bottlenecks in component rendering
- Implement proper cleanup in component destroy methods
```

#### Prompt 34: Create Standards Documentation
```
Create component documentation and establish coding standards:
- Create component development guide
- Document component lifecycle and best practices
- Create style guide for component development
- Document testing standards and procedures
- Create deployment and release procedures
- Document troubleshooting guides
- Create contribution guidelines
- Establish code review checklist
```

#### Prompt 35: Final Validation
```
Final testing and validation of all cleanup and optimization changes:
- Run comprehensive test suite
- Validate all functionality still works correctly
- Test performance improvements
- Verify bundle size optimizations
- Test accessibility compliance
- Validate cross-browser compatibility
- Test error handling and edge cases
- Create final deployment checklist
```

## Implementation Notes

### File Organization
```
js/
├── core/
│   ├── BaseComponent.js
│   ├── ComponentRegistry.js
│   ├── ScriptManager.js
│   └── AppRouter.js
├── components/
│   ├── dashboard/
│   │   ├── DashboardView.js
│   │   ├── CharacterListPanel.js
│   │   ├── QuickActionsPanel.js
│   │   └── NavigationPanel.js
│   ├── character-sheet/
│   │   ├── CharacterSheetView.js
│   │   ├── InformationPanel.js
│   │   ├── AttributesPanel.js
│   │   ├── SkillsPanel.js
│   │   ├── VitalsPanel.js
│   │   ├── DisciplinesPanel.js
│   │   ├── MeritsFlawsPanel.js
│   │   ├── BackgroundsPanel.js
│   │   ├── LoresheetsPanel.js
│   │   ├── ConvictionsPanel.js
│   │   └── ExperiencePanel.js
│   ├── shared/
│   │   ├── ModalComponent.js
│   │   ├── ButtonComponent.js
│   │   ├── DropdownComponent.js
│   │   ├── TrackBoxComponent.js
│   │   └── DotTrackComponent.js
│   └── ui/
│       └── (additional UI components)
└── (existing files)
```

### Testing Checklist
After each component implementation, verify:
- [ ] Component loads without errors
- [ ] Component renders correctly
- [ ] Component responds to data changes
- [ ] Component emits proper events
- [ ] Component integrates with existing functionality
- [ ] Component handles errors gracefully
- [ ] Component is accessible
- [ ] Component performs well

### Migration Safety
- Always maintain backward compatibility
- Test existing functionality after each change
- Keep backup of working code before major changes
- Implement feature flags for gradual rollout
- Document all changes and their impact

### Cleanup Checklist
After Phase 5 completion, verify:
- [ ] All legacy files removed or archived
- [ ] No unused code remains
- [ ] CSS/SCSS optimized and organized
- [ ] Dependencies cleaned and updated
- [ ] Code formatting standards implemented
- [ ] Documentation complete and accurate
- [ ] Performance optimized
- [ ] File system organized
- [ ] Memory leaks fixed
- [ ] Coding standards established

This implementation guide provides a structured approach to the refactor with specific, actionable prompts that can be executed sequentially to achieve the desired component-based architecture with comprehensive cleanup and optimization. 