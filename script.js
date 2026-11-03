
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. SMOOTH SCROLLING NAVIGATION
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =====================================
     2. SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealSections = document.querySelectorAll(
    ".about, .services, .work, .pricing, .process, .contact"
  );

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.08
    });

    revealSections.forEach(section => {
      observer.observe(section);
    });

  } else {

    revealSections.forEach(section => {
      section.classList.add("visible");
    });

  }


  /* =====================================
     3. FLOATING BLUE PARTICLES
  ===================================== */

  const particleContainer = document.querySelector(".particles");

  if (particleContainer) {

    for (let i = 0; i < 35; i++) {

      const particle = document.createElement("span");

      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 8;

      particle.style.position = "absolute";
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.background = "#31b8ff";

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      particle.style.opacity =
        `${Math.random() * 0.5 + 0.1}`;

      particle.style.boxShadow = "0 0 10px #087cff";
      particle.style.pointerEvents = "none";

      particle.style.animation =
        `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`;

      particleContainer.appendChild(particle);

    }

  }


  /* =====================================
     4. PARTICLE MOVEMENT ANIMATION
  ===================================== */

  const particleStyle = document.createElement("style");

  particleStyle.textContent = `
    @keyframes floatParticle {

      from {
        transform: translate3d(0, 0, 0);
      }

      to {
        transform: translate3d(25px, -45px, 0);
      }

    }
  `;

  document.head.appendChild(particleStyle);


  /* =====================================
     5. CONTINUOUS GENRE MARQUEE
  ===================================== */

  const genreTrack = document.querySelector(".genre-track");

  if (genreTrack) {

    genreTrack.style.display = "flex";
    genreTrack.style.flexWrap = "nowrap";
    genreTrack.style.width = "max-content";

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

      genreTrack.style.animation =
        "genreScroll 30s linear infinite";

    }

  }


  /* =====================================
     6. FOOTER COPYRIGHT YEAR
  ===================================== */

  const footerCopyright =
    document.querySelector("footer p:last-child");

  if (footerCopyright) {

    footerCopyright.textContent =
      `© ${new Date().getFullYear()} AV SQUAD STUDIOS. ALL RIGHTS RESERVED.`;

  }


  /* =====================================
     7. PAGE LOADED CLASS
  ===================================== */

  document.body.classList.add("page-loaded");


});
