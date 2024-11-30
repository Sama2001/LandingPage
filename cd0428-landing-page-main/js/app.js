/**
 * Define Global Variables
 */
const navbarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
// Select the toggle button and navbar menu
const toggleButton = document.querySelector('.navbar__toggle');
const navbarMenu = document.querySelector('.navbar__menu');
const navbarLinks = [];

/**
 * Helper Function to Build Navigation
 */
function buildNavigation() {
    sections.forEach((section, index) => {
        // Create a list item for each section
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        link.classList.add('menu__link');
        link.setAttribute('href', `#${section.id}`);
        link.textContent = section.dataset.nav;

        listItem.appendChild(link);

        // Append the list item to the navigation list
        navbarList.appendChild(listItem);

        navbarLinks.push(link);
    });
}

/**
 * Helper Function to Set Active Section
 */
function setActiveSection() {
    sections.forEach((section, index) => {
        // Get the position of the section relative to the viewport
        const sectionRect = section.getBoundingClientRect();

        if (sectionRect.top >= 0 && sectionRect.top <= window.innerHeight / 2) {
            section.classList.add('your-active-class');
            
            navbarLinks[index].classList.add('active');
        } else {
            section.classList.remove('your-active-class');
            
            // Remove the 'active' class from the navbar link
            navbarLinks[index].classList.remove('active');
        }
    });
}

/**
 * Smooth Scrolling to Section (Explicit Method)
 * This method ensures a smooth scroll to a section using scrollIntoView
 */
function smoothScrollToSection(event) {
    event.preventDefault();

    const targetSectionId = event.target.getAttribute('href').substring(1); 
    const targetSection = document.getElementById(targetSectionId);

    // Scroll smoothly to the target section using scrollIntoView
    targetSection.scrollIntoView({
        behavior: 'smooth', //  smooth scrolling
        block: 'start' 
    });
}


// Add click event listener to toggle the active class
toggleButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});



function init() {
    buildNavigation();

    // Add event listener 
    navbarLinks.forEach(link => {
        link.addEventListener('click', smoothScrollToSection);
    });

    window.addEventListener('scroll', setActiveSection);
}

// Initialize the page 
document.addEventListener('DOMContentLoaded', init);
