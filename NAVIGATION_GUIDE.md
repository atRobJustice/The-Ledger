# Navigation Guide - The Ledger

## Overview
The Ledger now uses a **centralized navigation system** to eliminate confusion and provide consistent behavior across all navigation methods.

## Centralized Navigation Methods

### Global Navigation Functions
All navigation should use these centralized methods:

```javascript
// Navigate to dashboard
window.navigateToDashboard()

// Navigate to character sheet (general)
window.navigateToCharacterSheet()

// Navigate to specific character
window.navigateToCharacter(characterId)
```

### AppRouter Instance Methods
Fallback methods if global functions aren't available:

```javascript
// Navigate to dashboard
window.AppRouter.instance.navigateTo('DashboardView')

// Navigate to character sheet
window.AppRouter.instance.navigateTo('CharacterSheetView')

// Navigate to character sheet with specific character
window.AppRouter.instance.navigateTo('CharacterSheetView', { characterId: 'some-id' })
```

## Navigation Points

### 1. Top Navigation Bar
- **Location**: Top of the page
- **Buttons**: Dashboard, Character Sheet
- **Behavior**: Uses centralized navigation methods

### 2. Dashboard Header
- **Location**: Dashboard title bar
- **Button**: "Character Sheet" button
- **Behavior**: Uses centralized navigation methods

### 3. Navigation Panel (Side Panel)
- **Location**: Right side of dashboard
- **Sections**: Views, Quick Actions, Settings, Help
- **Behavior**: Uses centralized navigation methods

### 4. Character List Panel
- **Location**: Left side of dashboard
- **Buttons**: Individual character buttons
- **Behavior**: Uses `navigateToCharacter(characterId)` for specific characters

### 5. Quick Actions Panel
- **Location**: Center of dashboard
- **Sections**: Character Management, Data Management, Recent Characters
- **Behavior**: Uses centralized navigation methods

## Removed Redundant Navigation

### ❌ Removed from QuickActionsPanel
- Quick Navigation section (redundant with Navigation Panel)
- Direct navigation buttons

### ❌ Removed from NavigationPanel
- Direct DOM manipulation fallbacks
- Multiple navigation approaches

### ❌ Removed from app.js
- Multiple event system approaches
- Direct view switching

## Benefits

1. **Consistency**: All navigation works the same way
2. **Maintainability**: Changes only need to be made in one place
3. **Reliability**: Single source of truth for navigation logic
4. **User Experience**: Predictable behavior across the application
5. **Debugging**: Easier to track navigation issues

## Implementation Notes

- All navigation methods automatically update the UI to reflect the current view
- Navigation history is tracked for potential back/forward functionality
- Character switching is handled automatically when navigating to specific characters
- Error handling is consistent across all navigation methods

## Best Practices

1. **Always use centralized methods** instead of direct DOM manipulation
2. **Prefer global functions** (`window.navigateToDashboard()`) over AppRouter instance methods
3. **Include character IDs** when navigating to specific characters
4. **Test navigation** from all entry points to ensure consistency
5. **Update this guide** when adding new navigation methods 