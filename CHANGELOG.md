# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-01-25

### Added
- **Unified Toast Notification System**: Consolidated all toast notifications into a single `ToastManager` class in `manager-utils.js`
- **Multiple Character Support**: Complete refactor from localStorage to IndexedDB storage
  - New `DatabaseManager` class for IndexedDB operations
  - New `CharacterManager` class for multiple character management
- **Character Management UI**:
- **Enhanced Data Persistence**:
  - All character data now stored in IndexedDB exclusively
  - Settings (theme, Discord webhook, lock state) stored separately
- **Discord integration improvements**: Including webhook validation

### Changed
- **Enhanced Visual Design**: Added subtle shadows, backdrop blur, and left border accents
- **Accessibility Improvements**: Proper contrast ratios, color-blind friendly options, and high contrast alternatives
- **Storage System**: Migrated from localStorage to IndexedDB for better data management
  - Character data now stored in separate database records
  - **Removed all localStorage fallbacks** - application now works exclusively with IndexedD.
- New favicon and icon for the application.
- js folder structure

### Removed
- **Duplicate Toast Functions**: Eliminated all local `showToast` wrapper functions

### Fixed
- **Browser Native Pop-ups**: Replaced all `alert()`, `confirm()`, and `prompt()` calls with themed alternatives
- **Toast Styling Issues**: Fixed light text on light background problems
- **Clear Button**: Fixed issue where the clear button (🗑️) wasn't properly clearing specialty badges from the character sheet
- **Character Switching**: Proper state management when switching between characters
- **Data Persistence**: Improved reliability of data saving and loading with IndexedDB-only approach

## [1.2.5] - 2025-01-18

### Added
- Dice Symbols help modal accessible via help icon in the control bar, providing a quick reference guide for dice symbol meanings including Success, Critical Success, Bestial Failure, and Messy Critical.

### Changed
- Dice roller modal layout now displays labels to the left of input fields for improved organization.
- Number inputs in the dice roller modal now have centered text and dark styling.
- Dice breakdown information is now displayed in two columns for better space utilization.

## [1.2.4] - 2025-01-18

### Added
- Difficulty level input to the dice roller modal allowing Storytellers to set the number of successes required for actions.
- Automatic validation ensuring Difficulty input never goes below 1.
- Enhanced Discord message formatting with structured columns for Difficulty, Dice Pool, and Results.

### Changed
- Discord embed color now uses Difficulty-based success/failure determination when applicable.
- Roll button now automatically wipes previous overlay before opening the modal.

### Fixed
- Toast pop-up now correctly displays all roll types including Rouse, Remorse, and Frenzy checks.

## [1.2.3] - 2025-06-17

### Added
- Character **Lock / Play** system powered by a new `LockManager` module.
- Automatic persistence of locked status in autosave, JSON export/import, and localStorage.

### Changed
- Control-bar appearance: Lock icon now grouped with Theme 🎨 and Info-Mode controls, sharing identical tooltip styling.
- Attribute / Skill / Trait UI now respects the locked state: dots dimmed & disabled, add/remove buttons and dropdowns hidden.

### Fixed
- Exported JSON now records accurate `locked` value.

## [1.2.2] - 2025-06-17

### Removed
- Initial Experience Points (XP) tracking system with modal UI.

### Added
- Comprehensive Experience Points (XP) tracking system featuring a dedicated modal interface, and automatic calculation.
- Undo/redo history for XP transactions with autosave and local-storage persistence.
- **Clear Sheet** action now uses a themed Bootstrap modal for confirmation rather than the browser's `confirm()` popup.

### Changed
- Polished XP modal styling and related CSS for improved responsiveness and theme integration.
- Enhanced autosave cadence to provide smoother user experience during rapid XP edits.
- Clearing a sheet now fully resets the Experience Points panel (Total, Spent, Available, history) and wipes any persisted XP data in localStorage.

### Fixed
- Info buttons now reliably open the correct help content when Info Mode is active.

## [1.2.1] - 2025-06-16

### Added
- Initial Experience Points (XP) tracking system with modal UI.

## [1.2.0] - 2025-06-15

### Added
- New Conviction & Touchstone system with a dedicated manager for tracking up to 3 active Convictions

### Changed
- Enhanced form controls with improved textarea behavior and styling
- Improved form styling with better text wrapping and overflow handling

## [1.1.0] - 2025-06-14

### Added
- New Theme system: Control-bar button opens a palette selector (Blood & Roses dark, Ivory Tower light, plus 14 clan-specific schemes).
- Info Mode: New system for displaying detailed information about game mechanics and rules through info buttons on various sections.
- Comprehensive Humanity reference system with detailed effects and descriptions for each rating level.
- New reference system for Attributes, Skills, Disciplines, Merits, Flaws, Backgrounds, and Loresheets.
- Enhanced backup system with improved JSON import/export functionality.
- Sticky header component for improved navigation and accessibility.
- Enhanced typography styles with improved readability and visual hierarchy.

### Changed
- Control Bar deduplication: `dice-overlay.js` now relies on `control-bar.js`, eliminating duplicate UI/button logic and making the bar the single source of truth.
- Refactored SCSS to remove remaining hard-coded colours.  Introduced additional design-token variables (`$color-white`, `$color-black`, grayscale palette, etc.) and CSS custom properties (`--accent`, `--panel-*`, `--form-*`) so that every component inherits the active theme automatically.
- All tracked components (tracks, dots, buttons, form controls, selects, modals, Discipline & Power cards) now pull palette values from the new Theme system.
- Updated hover/focus states and disabled styles to respect the new variables.
- Control Bar redesign: now a fixed footer that never blocks content. Buttons are grouped (Quick Dice, Mend, Data, Integrations, Theme, Info) with dividers, secondary actions use compact icons, detailed tooltips added, WP Reroll pulses when usable, and Progeny/Discord icons are center-aligned. Collapse handle removed.
- Replaced tooltips.js with a new info-buttons.js system for more comprehensive information display.
- Improved responsive design for mobile devices with better control bar layout and button sizing.

### Fixed
- Modal and form text colours now adapt to light themes (Ivory Tower) restoring readability.
- Deleted / remove buttons, checkbox labels, and other previously red/white elements now match the clan accent colour.
- Improved character data import/export reliability with better error handling.

## [1.0.2] - 2025-06-14

### Added
- Roll modal now shows an informational breakdown banner listing attributes, specialties, bonuses, and penalties applied to the dice pool so players understand how their roll is calculated.

### Fixed
- Roll modal now correctly displays the bonus die notice when Intense\Accute Temperament is used with an associated Discipline.
- Roll modal now also shows the bonus die notice when a Skill Specialty provides an extra die.

## [1.0.1] - 2025-06-13

### Added
- Blood Surge mechanic with automatic dice-pool handling.
- Detailed Discipline power information: cost, duration, dice pool, opposing pool, notes and source.
- UI enhancements for selecting Discipline powers.
- "Mend" quick-action button and updated Discipline displays.
- Impairment status tracking including UI indicators.
- New Vitals fields for Resonance and Temperament.
- Blood Potency bonus dice and Rouse rerolls added
- Safeguards against infinite dice and mis-reported results.

## [1.0.0] - 2025-06-13

### Added
- Initial public release of **The Ledger** character sheet.
- Core HTML structure covering Information, Attributes, Skills, Vitals and more.
- SCSS styling pipeline with Bootstrap 5 integration.
- 3-D dice roller overlay adapted from [prncc/vampire-dice-roller](https://github.com/prncc/vampire-dice-roller).
- Rules reference data pulled from the community-maintained [VTM Wiki](https://vtm.paradoxwikis.com/VTM_Wiki).
- Export/import of characters as JSON.
