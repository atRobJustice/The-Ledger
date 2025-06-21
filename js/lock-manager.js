// Remove ES6 export - use traditional script loading
// export const LockManager = (() => {
const LockManager = (() => {
  let locked = false;

  /* --------------------------------------------------
   * Public API
   * --------------------------------------------------*/
  function init(isLocked = false) {
    locked = !!isLocked;
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
    document.body.classList.toggle('locked-sheet', locked);
    // Toggle class on dot controls
    document.querySelectorAll('.lockable-dot').forEach(el => {
      el.classList.toggle('disabled', locked);
    });

    // Disable / enable any element explicitly marked as lockable
    document.querySelectorAll('[data-lockable="true"]').forEach(el => {
      el.disabled = locked;
    });
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