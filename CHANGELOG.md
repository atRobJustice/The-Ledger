# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2025-06-14

### Added
- Roll modal now shows an informational breakdown banner listing attributes, specialties, bonuses, and penalties applied to the dice pool so players understand how their roll is calculated.
- New Theme system: Control-bar button opens a palette selector (Blood & Roses dark, Ivory Tower light, plus 14 clan-specific schemes).

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
