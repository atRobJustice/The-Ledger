/**
 * @fileoverview Lock Manager for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Manages the lock state of the character sheet. Provides functionality to lock and
 *             unlock the character sheet to prevent accidental changes, with persistence to
 *             IndexedDB and keyboard shortcuts for Game Master override functionality.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires window.databaseManager - For persisting lock state to IndexedDB
 * 
 * @namespace LockManager
 * @description Main namespace for managing character sheet lock state
 * 
 * @property {boolean} locked - Boolean indicating if the sheet is currently locked
 * 
 * @function init - Initializes the lock manager with an optional initial state
 * @function lock - Locks the character sheet and persists the state
 * @function unlock - Unlocks the character sheet and persists the state
 * @function isLocked - Returns the current lock state
 * @function applyDOMState - Applies the lock state to DOM elements
 * @function persist - Persists the lock state to IndexedDB
 * @function emit - Emits a custom event when lock state changes
 * 
 * @event ledger-lock-change - Custom event emitted when lock state changes
 * @eventparam {Object} detail - Event detail object
 * @eventparam {boolean} detail.locked - Current lock state
 * 
 * @keyboard Shortcuts
 * @keyboard Shift+L - Unlocks the sheet (GM override)
 * 
 * @example
 * LockManager.init(false); // Initialize unlocked
 * LockManager.lock(); // Lock the sheet
 * LockManager.unlock(); // Unlock the sheet
 * const isLocked = LockManager.isLocked(); // Check current state
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

const LockManager = (() => {
  let locked = false;

  /* --------------------------------------------------
   * Public API
   * --------------------------------------------------*/
  function init(isLocked = false) {
    console.log('LockManager.init called with:', isLocked, 'Current locked state was:', locked);
    locked = !!isLocked;
    console.log('LockManager.init: New locked state is:', locked);
    applyDOMState();
    emit();
  }

  function lock() {
    locked = true;
    applyDOMState();
    persist();
    emit();
  }

  function unlock() {
    locked = false;
    applyDOMState();
    persist();
    emit();
  }

  function isLocked() {
    return locked;
  }

  /* --------------------------------------------------
   * Private helpers
   * --------------------------------------------------*/
  function applyDOMState() {
    console.log('LockManager.applyDOMState: Applying locked state:', locked);
    document.body.classList.toggle('locked-sheet', locked);
    // Toggle class on dot controls
    document.querySelectorAll('.lockable-dot').forEach(el => {
      el.classList.toggle('disabled', locked);
    });

    // Disable / enable any element explicitly marked as lockable
    document.querySelectorAll('[data-lockable="true"]').forEach(el => {
      el.disabled = locked;
    });
    console.log('LockManager.applyDOMState: DOM updated, body has locked-sheet class:', document.body.classList.contains('locked-sheet'));
  }

  async function persist() {
    try {
      // Use IndexedDB exclusively
      if (window.databaseManager) {
        await window.databaseManager.setSetting('locked', locked);
        return;
      }
      
      throw new Error('No database manager available for lock persistence');
    } catch (e) {
      console.error('LockManager persist error', e);
    }
  }

  function emit() {
    document.dispatchEvent(new CustomEvent('ledger-lock-change', { detail: { locked } }));
  }

  /* --------------------------------------------------
   * GM override: Shift+L unlocks the sheet even if UI is disabled
   * --------------------------------------------------*/
  document.addEventListener('keydown', e => {
    if (e.shiftKey && e.code === 'KeyL') {
      unlock();
    }
  });

  /* --------------------------------------------------
   * Self-initialisation on module load
   * --------------------------------------------------*/
  (async function bootstrap() {
    try {
      // Use IndexedDB exclusively
      if (window.databaseManager) {
        const saved = await window.databaseManager.getSetting('locked');
        if (typeof saved === 'boolean') {
          locked = saved;
          applyDOMState();
          emit();
          return;
        }
      }
      
      console.log('No lock state found in IndexedDB, using default (unlocked)');
    } catch (e) {
      console.warn('LockManager bootstrap failed', e);
    }
  })();

  // Expose globally for non-module scripts
  if (typeof window !== 'undefined') {
    window.LockManager = { init, lock, unlock, isLocked };
  }

  return { init, lock, unlock, isLocked };
})(); 