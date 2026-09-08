// Make Vitals section sticky
document.addEventListener('DOMContentLoaded', () => {
    // Locate vitals block by heading text (markup uses h3)
    const vitalsHeading = Array.from(document.querySelectorAll('h3')).find(h3 => h3.textContent.trim() === 'Vitals');
    if (!vitalsHeading) return;
    
    const vitalsSection = vitalsHeading.closest('.row.mb-4');
    if (!vitalsSection) return;

    vitalsSection.classList.add('vitals-section');
}); 