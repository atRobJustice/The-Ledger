export const LockManager = (() => {
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

  function persist() {
    try {
      const char = JSON.parse(localStorage.getItem('characterData') || '{}');
      char.locked = locked;
      localStorage.setItem('characterData', JSON.stringify(char));
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
  (function bootstrap() {
    try {
      const saved = JSON.parse(localStorage.getItem('characterData') || '{}');
      if (typeof saved.locked === 'boolean') {
        locked = saved.locked;
        applyDOMState();
        emit();
      }
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