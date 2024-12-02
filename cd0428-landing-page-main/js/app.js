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
// Script for highlighting active section and nav link
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar__menu li');
    const sections = document.querySelectorAll('section');
  
    // Function to remove active class
    function removeActive() {
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('your-active-class'));

    }

    // Function to add active class
    function addActive(link, section) {
        link.classList.add('active');
        section.classList.add('your-active-class');

    }

    // Listen for scroll events to highlight active section and link
    window.addEventListener('scroll', function() {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });
      
        // Highlight corresponding link based on scroll position
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.classList.contains(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // Add click event listener for each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            removeActive();
            const sectionId = link.getAttribute("class");
            const section = document.getElementById(sectionId);
            addActive(link, section);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

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
 * Function to Set Active Section
 */
function setActiveSection() {
    sections.forEach((section, index) => {
        const sectionRect = section.getBoundingClientRect();

        // Adjust logic to account for smaller viewports
        if (sectionRect.top >= 0 && sectionRect.top <= window.innerHeight / 2) {
            section.classList.add('your-active-class');
            navbarLinks[index].classList.add('active');
        } else {
            section.classList.remove('your-active-class');
            navbarLinks[index].classList.remove('active');
        }
    });
}

// Attach this function to scroll events
window.addEventListener('scroll', setActiveSection);


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

    // Close the navbar menu after selecting a section
    navbarMenu.classList.remove('active');
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

//update
