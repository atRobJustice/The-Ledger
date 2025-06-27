/**
 * @fileoverview Sticky Header for Vampire: The Masquerade Character Sheet
 * @version 1.3.1
 * @description Makes the Vitals section sticky for better navigation and accessibility.
 *             Automatically identifies the Vitals section and applies sticky positioning
 *             to keep important character information visible while scrolling.
 * 
 * @author The Ledger Development Team
 * @license MIT
 * 
 * @requires None - Pure DOM manipulation, no external dependencies
 * 
 * @namespace StickyHeader
 * @description Main namespace for sticky header functionality
 * 
 * @function initStickyHeader - Initializes sticky header functionality
 * 
 * @typedef {Object} VitalsSection
 * @property {HTMLElement} heading - The Vitals heading element
 * @property {HTMLElement} section - The Vitals section container
 * 
 * @example
 * // The sticky header is automatically initialized on DOMContentLoaded
 * // No manual initialization required
 * 
 * @since 1.0.0
 * @updated 1.3.1
 */

// Make Vitals section sticky
document.addEventListener('DOMContentLoaded', () => {
    // Get the vitals section by finding the h2 with "Vitals" text
    const vitalsHeading = Array.from(document.querySelectorAll('h3')).find(h3 => h3.textContent.trim() === 'Vitals');
    if (!vitalsHeading) return;
    
    const vitalsSection = vitalsHeading.closest('.row.mb-4');
    if (!vitalsSection) return;

    // Add the vitals-section class
    vitalsSection.classList.add('vitals-section');
}); 