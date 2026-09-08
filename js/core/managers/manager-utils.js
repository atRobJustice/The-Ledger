// Thin barrel re-export for backward compatibility with existing manager-utils imports.
// Side-effect imports ensure window.toastManager / window.modalManager are set when
// this file is loaded as a script entry from character-sheet.html.
import './toast-manager.js';
import './modal-manager.js';
export { ToastManager, toastManager } from './toast-manager.js';
export { ModalManager, modalManager } from './modal-manager.js';
export { TraitManagerUtils } from './trait-utils.js';
