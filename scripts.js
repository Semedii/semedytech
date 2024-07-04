document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service');
    const hamMenu = document.querySelector('.ham-menu');
    const navLinks = document.querySelector('.nav-links');
    const brandLogo = document.getElementById('brand-logo');
    const sections = document.querySelectorAll('section');
    const homeSection = document.getElementById('home');
    const themeSwitch = document.getElementById('theme-switch'); // Theme switch input
    const logoImg = document.getElementById('logo-img'); // Logo image element

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
    window.addEventListener('scroll', () => {
        addAnimationClass();
        adjustLogoSize();
    });

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

    // Intersection Observer callback
    function handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'home') {
                    brandLogo.classList.remove('small');
                } else {
                    brandLogo.classList.add('small');
                }
            }
        });
    }

    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.5
    });

    // Observe all sections
    sections.forEach(section => observer.observe(section));

    // Function to adjust logo size based on current section visibility
    function adjustLogoSize() {
        if (isInViewport(homeSection)) {
            brandLogo.classList.remove('small');
        } else {
            brandLogo.classList.add('small');
        }
    }

    // Initial check on page load
    addAnimationClass();
    adjustLogoSize();

    // Check if the user is on the homepage
    const checkHomePage = () => {
        if (window.location.hash === '#home' || window.location.hash === '' || window.location.pathname === '/') {
            brandLogo.classList.remove('small');
        } else {
            brandLogo.classList.add('small');
        }
    };

    // Add event listener for hash change and page load
    window.addEventListener('hashchange', checkHomePage);
    window.addEventListener('load', checkHomePage);

    // JavaScript for Theme Toggle
    function applyDarkTheme() {
        document.body.classList.add('dark-theme');
        logoImg.src = 'images/logo_black.jpg'; // Change logo to dark theme
    }

    function applyLightTheme() {
        document.body.classList.remove('dark-theme');
        logoImg.src = 'images/logo_blue.jpg'; // Change logo to light theme
    }

    function handleThemeChange() {
        if (themeSwitch.checked && window.innerWidth > 768) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    }

    themeSwitch.addEventListener('change', handleThemeChange);

    // Set initial logo based on current theme on page load
    handleThemeChange();

    // Check for screen resize to adjust theme
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            applyLightTheme();
            themeSwitch.checked = false; // Ensure the switch is unchecked on mobile view
        } else {
            handleThemeChange();
        }
    });

});
