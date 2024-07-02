document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service');
    const hamMenu = document.querySelector('.ham-menu');
    const navLinks = document.querySelector('.nav-links');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add the 'animate' class to services in the viewport
    function addAnimationClass() {
        services.forEach(service => {
            if (isInViewport(service)) {
                service.classList.add('animate');
            }
        });
    }

    // Add event listener for scroll events
    window.addEventListener('scroll', addAnimationClass);

    // Function to toggle 'active' class on ham-menu and nav-links
    function toggleNav() {
        hamMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Add event listener for ham-menu click
    hamMenu.addEventListener('click', toggleNav);

    // Add event listeners for navigation links to close the menu on click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            toggleNav(); // Close the menu
            setTimeout(() => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300); // Adjust timeout if needed based on animation timing
        });
    });

    // Initial check on page load
    addAnimationClass();
});
