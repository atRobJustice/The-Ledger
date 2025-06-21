# Manual Testing Checklist for The Ledger SPA

## General
- [ ] Application loads without errors in supported browsers
- [ ] Navigation between dashboard and character sheet works
- [ ] All views render correctly on first load and after navigation
- [ ] Responsive layout works on desktop, tablet, and mobile
- [ ] All error messages are user-friendly and actionable
- [ ] Loading indicators appear and disappear appropriately

## Dashboard
- [ ] Character list loads and displays all characters
- [ ] Can create a new character and it appears in the list
- [ ] Can delete a character and it is removed from the list
- [ ] Can select a character to view/edit
- [ ] Quick actions (import, export, backup) work as expected
- [ ] Search and filter functions work for name and clan
- [ ] Navigation panel links work (character sheet, settings, help)
- [ ] Mobile menu toggles open/close
- [ ] Character list updates after character changes

## Character Sheet
- [ ] Character data loads and displays correctly
- [ ] All panels (attributes, skills, backgrounds, disciplines, merits/flaws, convictions, loresheets, experience, vitals, information) render and update
- [ ] Can edit character attributes, skills, backgrounds, etc.
- [ ] Changes are saved automatically and persist after reload
- [ ] XP spending and tracking works
- [ ] Adding/removing merits, flaws, backgrounds, loresheets, convictions works
- [ ] Disciplines and powers update when changed
- [ ] Error handling for missing/invalid data
- [ ] Loading and error states are shown appropriately

## Event System
- [ ] Events propagate between components (e.g., character update triggers panel updates)
- [ ] EventDebugger shows real-time events and filtering works
- [ ] No memory leaks or duplicate event listeners after navigation

## Error & Loading Management
- [ ] ErrorBoundary catches errors and shows fallback UI
- [ ] Retry button works and recovers from errors
- [ ] LoadingStateManager shows progress and spinner during async operations
- [ ] Timeouts and retries work as expected

## Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] ARIA roles and labels are present where needed
- [ ] Focus management is correct after navigation and actions
- [ ] Screen reader announcements for view changes
- [ ] Sufficient color contrast for text and UI elements

## Performance
- [ ] Dashboard loads in under 200ms with 100+ characters
- [ ] Character sheet loads in under 200ms
- [ ] No significant memory leaks after repeated navigation
- [ ] UI remains responsive during data operations

## Regression
- [ ] All previously working features still function after updates
- [ ] No console errors or warnings during normal use

---

**Instructions:**
- Mark each item as complete after manual verification.
- Note any issues, unexpected behaviors, or UI glitches for follow-up. 