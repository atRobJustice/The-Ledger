function createDots(value, maxDots = 5) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots';
    
    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i < value ? ' filled' : '');
        dot.dataset.value = i + 1;
        dot.addEventListener('click', function() {
            const currentValue = parseInt(this.parentElement.dataset.value || '0');
            const clickedValue = parseInt(this.dataset.value);
            
            // If clicking the last filled dot, decrease by 1
            if (clickedValue === currentValue) {
                this.classList.remove('filled');
                this.parentElement.dataset.value = clickedValue - 1;
            }
            // If clicking an empty dot, fill up to that value
            else if (clickedValue > currentValue) {
                const dots = this.parentElement.querySelectorAll('.dot');
                for (let i = 0; i < clickedValue; i++) {
                    dots[i].classList.add('filled');
                }
                this.parentElement.dataset.value = clickedValue;
            }
            // If clicking a filled dot, set to that value
            else {
                const dots = this.parentElement.querySelectorAll('.dot');
                for (let i = 0; i < dots.length; i++) {
                    dots[i].classList.toggle('filled', i < clickedValue);
                }
                this.parentElement.dataset.value = clickedValue;
            }

            // Update related track boxes if this is a relevant attribute
            updateRelatedTrackBoxes(this);
        });
        dotsContainer.appendChild(dot);
    }
    
    dotsContainer.dataset.value = value;
    return dotsContainer;
}

function createTextInput(value) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.className = 'text-input';
    return input;
}

function createTrackBoxes(maxValue, currentValue = 0, superficial = 0, aggravated = 0, type = 'health') {
    const container = document.createElement('div');
    container.className = 'track-container';
    container.dataset.type = type;
    
    const header = document.createElement('div');
    header.className = 'track-header';
    header.innerHTML = `<span>Current: ${currentValue}</span><span>Max: ${maxValue}</span>`;
    container.appendChild(header);
    
    const boxes = document.createElement('div');
    boxes.className = 'track-boxes';

    let boxValue = 10;
    if (type != 'humanity') {
        boxValue = currentValue;
    }
    
    // Create boxes based on boxValue
    for (let i = 0; i < boxValue; i++) {
        const box = document.createElement('div');
        box.className = 'track-box';
        
        if (type === 'humanity') {
            // For Humanity, fill boxes from left to right based on current value
            if (i < currentValue) {
                box.classList.add('filled');
            }
            // Handle staining for any remaining boxes
            if (i >= currentValue && i < currentValue + superficial) {
                box.classList.add('stained');
            }
        } else {
            // For Health and Willpower, handle superficial and aggravated damage
            if (i < aggravated) {
                box.classList.add('aggravated');
            } else if (i < aggravated + superficial) {
                box.classList.add('superficial');
            }
        }
        
        box.addEventListener('click', function() {
            if (type === 'humanity') {
                const boxes = Array.from(this.parentElement.children);
                const clickedIndex = boxes.indexOf(this)+1;
                const currentFilled = boxes.filter(b => b.classList.contains('filled')).length;
                const currentStained = boxes.filter(b => b.classList.contains('stained')).length;
                
                if (this.classList.contains('filled')) {
                    if (clickedIndex === currentFilled) {
                        this.classList.remove('filled');
                    } else if (clickedIndex < currentFilled) {
                        for (let i = clickedIndex; i < boxes.length; i++) {
                            boxes[i].classList.remove('filled');
                        }
                    }else if (clickedIndex === 1){
                        this.classList.remove('filled');
                    }
                } else if (this.classList.contains('stained')) {  
                    if (clickedIndex === 1){
                        this.classList.remove('stained');
                        this.classList.add('filled');
                    }else if (clickedIndex === 10){
                        if (currentFilled === 9){
                            this.classList.remove('stained');
                            this.classList.add('filled');
                        }else if (clickedIndex === (10 - (currentStained - 1))){
                            this.classList.remove('stained');
                        }else if (clickedIndex > (10 - (currentStained - 1))){
                            for (let i = clickedIndex-2; i > 0; i--) {
                                boxes[i].classList.remove('stained');
                            }
                        }
                    }else if (clickedIndex === (10 - (currentStained - 1))){
                        if(clickedIndex === currentFilled+1){
                            this.classList.add('filled');
                            this.classList.remove('stained');
                        }else{
                            this.classList.remove('stained');
                        }
                    }else if (clickedIndex > (10 - (currentStained - 1))){
                        for (let i = clickedIndex-2; i > 0; i--) {
                            boxes[i].classList.remove('stained');
                        }
                    } 
                }else{
                    if (clickedIndex === 1){
                        if (currentStained === 9){
                            this.classList.add('stained');
                            this.classList.remove('filled');
                        }else{
                            this.classList.add('filled');
                        }
                    }else if (clickedIndex === 10){
                        if (currentStained === 0){
                            this.classList.add('stained');
                            this.classList.remove('filled');
                        }else{
                            this.classList.add('filled');
                        }
                    }else if (clickedIndex === (10 - currentStained)){
                        this.classList.add('stained');
                    }else if (clickedIndex === currentFilled + 1 ){
                        this.classList.add('filled');
                    }
                }
            } else {
                // Original Health/Willpower behavior
                const currentClass = this.className;
                if (currentClass.includes('aggravated')) {
                    this.className = 'track-box';
                } else if (currentClass.includes('superficial')) {
                    this.className = 'track-box aggravated';
                } else {
                    this.className = 'track-box superficial';
                }
            }
            
            updateCurrentValue(container);
        });
        
        boxes.appendChild(box);
    }
    
    container.appendChild(boxes);
    return container;
}

function updateRelatedTrackBoxes(changedDot) {
    const statLabel = changedDot.closest('.stat').querySelector('.stat-label').textContent.toLowerCase();
    let trackBoxes;
    
    if (statLabel === 'stamina') {
        trackBoxes = document.querySelector('.track-container[data-type="health"]');
        if (trackBoxes) {
            const staminaValue = parseInt(changedDot.parentElement.dataset.value || '0');
            const newMax = staminaValue + 3;
            updateTrackBoxesMax(trackBoxes, newMax);
        }
    } 
    if (statLabel === 'resolve' || statLabel === 'composure') {
        trackBoxes = document.querySelector('.track-container[data-type="willpower"]');
        if (trackBoxes) {
            const resolveDots = document.querySelector('.stat .stat-label[data-stat="resolve"]').closest('.stat').querySelector('.dots');
            const composureDots = document.querySelector('.stat .stat-label[data-stat="composure"]').closest('.stat').querySelector('.dots');
            
            if (resolveDots && composureDots) {
                const resolveValue = parseInt(resolveDots.dataset.value || '0');
                const composureValue = parseInt(composureDots.dataset.value || '0');
                const newMax = resolveValue + composureValue;
                updateTrackBoxesMax(trackBoxes, newMax);
            }
        }
    }
}

function updateTrackBoxesMax(trackBoxes, newMax) {
    const header = trackBoxes.querySelector('.track-header');
    const boxes = trackBoxes.querySelector('.track-boxes');
    const currentBoxes = boxes.querySelectorAll('.track-box');
    const currentMax = currentBoxes.length;
    
    // Update max value display
    header.querySelector('span:last-child').textContent = `Max: ${newMax}`;
    
    // Add or remove boxes as needed
    if (newMax > currentMax) {
        for (let i = currentMax; i < newMax; i++) {
            const box = document.createElement('div');
            box.className = 'track-box';
            box.addEventListener('click', function() {
                if (trackBoxes.dataset.type === 'humanity') {
                    const isStainBox = this.parentElement.children.length - Array.from(this.parentElement.children).indexOf(this) <= 3;
                    
                    if (isStainBox) {
                        const currentStains = this.parentElement.querySelectorAll('.stained').length;
                        const maxStains = 3;
                        
                        if (this.classList.contains('stained')) {
                            this.classList.remove('stained');
                        } else if (currentStains < maxStains) {
                            this.classList.add('stained');
                        }
                    } else {
                        const boxes = Array.from(this.parentElement.children);
                        const clickedIndex = boxes.indexOf(this);
                        const currentFilled = boxes.filter(b => b.classList.contains('filled')).length;
                        
                        if (clickedIndex === currentFilled - 1) {
                            this.classList.remove('filled');
                        } else if (clickedIndex < currentFilled) {
                            for (let i = clickedIndex + 1; i < boxes.length - 3; i++) {
                                boxes[i].classList.remove('filled');
                            }
                        } else {
                            for (let i = 0; i <= clickedIndex; i++) {
                                if (i < boxes.length - 3) {
                                    boxes[i].classList.add('filled');
                                }
                            }
                        }
                    }
                } else {
                    const currentClass = this.className;
                    if (currentClass.includes('aggravated')) {
                        this.className = 'track-box';
                    } else if (currentClass.includes('superficial')) {
                        this.className = 'track-box aggravated';
                    } else {
                        this.className = 'track-box superficial';
                    }
                }
                updateCurrentValue(trackBoxes);
            });
            boxes.appendChild(box);
        }
    } else if (newMax < currentMax) {
        for (let i = currentMax - 1; i >= newMax; i--) {
            boxes.removeChild(currentBoxes[i]);
        }
    }
    
    updateCurrentValue(trackBoxes);
}

function updateCurrentValue(trackBoxes) {
    const header = trackBoxes.querySelector('.track-header');
    const boxes = trackBoxes.querySelector('.track-boxes');
    const maxValue = boxes.querySelectorAll('.track-box').length;
    
    if (trackBoxes.dataset.type === 'humanity') {
        const filledCount = boxes.querySelectorAll('.track-box.filled').length;
        const stainedCount = boxes.querySelectorAll('.track-box.stained').length;
        header.querySelector('span:first-child').textContent = `Current: ${filledCount}`;
    } else {
        const superficialCount = boxes.querySelectorAll('.superficial').length;
        const aggravatedCount = boxes.querySelectorAll('.aggravated').length;
        header.querySelector('span:first-child').textContent = `Current: ${maxValue - (superficialCount + aggravatedCount)}`;
    }
}

// Initialize dots for all stats when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        const valueSpan = stat.querySelector('span:last-child');
        if (valueSpan) {
            const statLabel = stat.querySelector('.stat-label').textContent.toLowerCase();
            const value = valueSpan.textContent;
            
            // Fields that should be text inputs
            const textFields = [
                'name', 'concept', 'chronicle', 'ambition', 'desire', 
                'predator', 'clan', 'generation', 'sire', 'resonance'
            ];
            
            // Fields that should have track boxes
            const trackFields = {
                'health': { max: 10, current: 4 },
                'willpower': { max: 10, current: 2 },
                'humanity': { max: 10, current: 7 }
            };
            
            if (textFields.includes(statLabel)) {
                const input = createTextInput(value);
                valueSpan.replaceWith(input);
            } else if (trackFields[statLabel]) {
                const trackBoxes = createTrackBoxes(
                    trackFields[statLabel].max, 
                    trackFields[statLabel].current, 
                    0, 
                    0, 
                    statLabel
                );
                valueSpan.replaceWith(trackBoxes);
            } else {
                // Default to 5 dots for attributes and skills
                const dotsContainer = createDots(parseInt(value) || 0, 5);
                valueSpan.replaceWith(dotsContainer);
            }
        }
    });
}); 