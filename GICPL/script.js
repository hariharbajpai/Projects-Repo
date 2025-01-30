// Add animations or interactivity here
document.addEventListener("DOMContentLoaded", function () {
    // Example: Fade-in animation for sections
    const sections = document.querySelectorAll("section");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.5 }
    );
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  });