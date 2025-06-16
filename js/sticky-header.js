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