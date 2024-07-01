document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelectorAll('.service');

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

  // Add event listeners for scrolling and navigation clicks
  window.addEventListener('scroll', addAnimationClass);

  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (event) => {
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              event.preventDefault();
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth'
              });

              setTimeout(() => {
                  addAnimationClass();
              }, 1000); // Adjust timeout if needed based on scroll animation duration
          }
      });
  });

  // Initial check on page load
  addAnimationClass();
});
