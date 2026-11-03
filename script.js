
// AV SQUAD STUDIOS
// Website interactions

document.addEventListener("DOMContentLoaded", () => {

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(event) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Reveal sections as visitors scroll
  const sections = document.querySelectorAll(
    ".about, .services, .work, .contact"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.15
  });

  sections.forEach(section => {
    observer.observe(section);
  });

});
