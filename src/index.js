function customSliderSetup(containerId, sliderId, dotsContainerId, totalSlides) {
    let customCurrentIndex = 0;
    const customSlides = document.querySelectorAll(`#${containerId} .custom-slide`);
    const customSliderWrapper = document.getElementById(sliderId);
    const customDotsContainer = document.getElementById(dotsContainerId);

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('custom-dot');
        dot.addEventListener('click', () => customMoveToSlide(i));
        customDotsContainer.appendChild(dot);
    }

    function customMoveToSlide(index) {
        customCurrentIndex = index;
        customUpdateSlidePosition();
        customUpdateDots();
    }

    function customMoveToNextSlide() {
        customCurrentIndex = (customCurrentIndex + 1) % totalSlides;
        customUpdateSlidePosition();
        customUpdateDots();
    }

    function customUpdateSlidePosition() {
        const slideWidth = customSlides[0].offsetWidth;
        const slideMarginRight = parseInt(window.getComputedStyle(customSlides[0]).marginRight);
        const newTransformValue = -(slideWidth + slideMarginRight) * customCurrentIndex;
        customSliderWrapper.style.transform = `translateX(${newTransformValue}px)`;
    }

    function customUpdateDots() {
        const dots = customDotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        dots[customCurrentIndex].classList.add('active');
    }

    return {
        customMoveToNextSlide,
        customUpdateDots
    };
}

const slider1 = customSliderSetup('custom-slider-container-1', 'custom-slider-wrapper-1', 'custom-dots-container-1', document.querySelectorAll('#custom-slider-container-1 .custom-slide').length);
const slider2 = customSliderSetup('custom-slider-container-2', 'custom-slider-wrapper-2', 'custom-dots-container-2', document.querySelectorAll('#custom-slider-container-2 .custom-slide').length);

// Auto-slide functionality
setInterval(() => {
    slider1.customMoveToNextSlide();
    slider2.customMoveToNextSlide();
}, 3000); // Adjust time as needed

// Initialize dots
slider1.customUpdateDots();
slider2.customUpdateDots();


// Convert rich text
window.onload = function () {
    var richTextElements = document.querySelectorAll('.richtext');

    // Iterate through each rich text element and convert plain text to HTML
    richTextElements.forEach(function (element) {
        var plainText = element.textContent;
        var htmlContent = convertToHTML(plainText);
        element.innerHTML = htmlContent;
    });
};
// Function to convert plain text to HTML with font size and line height adjustments
function convertToHTML(plainText) {
    // Replace special characters with HTML entities
    plainText = plainText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Apply font size and line height adjustments
    plainText = '<div style="font-size: 16px; line-height: 1.4;">' + plainText + '</div>';

    // Apply formatting elements
    // Bold: **bold text**
    plainText = plainText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Split text into lines
    var lines = plainText.split('\n');

    // Initialize variables to track list status
    var inList = false;
    var listItems = '';

    // Iterate through each line
    lines.forEach(function (line) {
        // Check if the line starts with a bullet point
        if (line.trim().startsWith('*')) {
            // If not already in a list, start a new list
            if (!inList) {
                inList = true;
                listItems += '<ul>';
            }
            // Add the list item
            listItems += '<li>' + line.trim().substring(1).trim() + '</li>';
        } else {
            // If in a list and the line doesn't start with a bullet point, close the list
            if (inList) {
                inList = false;
                listItems += '</ul>';
            }
            // Add the line as regular text
            listItems += line.trim() + '<br>';
        }
    });

    // Close the list if it was still open
    if (inList) {
        listItems += '</ul>';
    }

    // Return the HTML content
    return listItems;
}

// Pill
function generateBadge(className) {
    // Get elements with the specified class name
    var elements = document.querySelectorAll('.' + className);

    // Iterate over elements and replace '[Hot]' with the badge
    elements.forEach(function (element) {
        if (element.innerHTML.includes('[Hot]')) {
            element.innerHTML = element.innerHTML.replace(/\[Hot\]/g, '<span class="badge rounded-pill">Hot</span>');
        }
    });
}

// Call the function to modify elements with the specified class
generateBadge('text-white');