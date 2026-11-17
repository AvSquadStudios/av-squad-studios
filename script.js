
/* =========================================
   AV SQUAD STUDIOS
   WEBSITE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. INTRO ANIMATION
  ===================================== */

  const introScreen = document.getElementById("introScreen");
  const introSkip = document.getElementById("introSkip");

  function closeIntro() {
    if (!introScreen) return;

    introScreen.classList.add("intro-hidden");

    document.body.style.overflow = "";

    setTimeout(() => {
      introScreen.style.display = "none";
    }, 1100);
  }

  if (introScreen) {
    document.body.style.overflow = "hidden";

    const introTimer = setTimeout(closeIntro, 5500);

    if (introSkip) {
      introSkip.addEventListener("click", () => {
        clearTimeout(introTimer);
        closeIntro();
      });
    }
  }


  /* =====================================
     2. HEADER SCROLL EFFECT
  ===================================== */

  const siteHeader = document.getElementById("siteHeader");

  function updateHeader() {
    if (!siteHeader) return;

    if (window.scrollY > 40) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader);
  updateHeader();


  /* =====================================
     3. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }

    });

    navItems.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

  }


  /* =====================================
     4. ACTIVE NAVIGATION LINK
  ===================================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navItems.forEach(link => {

            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkTarget === `#${currentId}`
            );

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* =====================================
     5. SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =====================================
     6. PORTFOLIO VIDEO MODAL
  ===================================== */

  const videoModal = document.getElementById("videoModal");
  const videoFrame = document.getElementById("videoFrame");
  const modalClose = document.getElementById("modalClose");

  const portfolioVideos = document.querySelectorAll(
    ".portfolio-video[data-video]"
  );

  function openVideo(videoId) {

    if (!videoModal || !videoFrame || !videoId) return;

    videoFrame.src =
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;

    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

  }

  function closeVideo() {

    if (!videoModal || !videoFrame) return;

    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    // Stop video playback when modal closes.
    videoFrame.src = "";

  }

  portfolioVideos.forEach(video => {

    video.addEventListener("click", () => {

      const videoId = video.dataset.video;

      openVideo(videoId);

    });

  });

  if (modalClose) {
    modalClose.addEventListener("click", closeVideo);
  }

  if (videoModal) {

    videoModal.addEventListener("click", event => {

      if (event.target === videoModal) {
        closeVideo();
      }

    });

  }

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closeVideo();
      closeMenu();

    }

  });


  /* =====================================
     7. GENRE BUBBLE ANIMATION
  ===================================== */

  const genreStage = document.getElementById("genreStage");
  const genreBubble = document.getElementById("genreBubble");
  const genreName = document.getElementById("genreName");

  const genres = [
    "Fantasy",
    "Romance",
    "Thriller",
    "Mystery",
    "Science Fiction",
    "Horror",
    "Adventure",
    "Historical Fiction",
    "Drama",
    "Comedy",
    "Paranormal",
    "Crime",
    "Literary Fiction",
    "Young Adult",
    "Children's Fiction",
    "Memoir",
    "Biography",
    "Dystopian",
    "Suspense",
    "Satire"
  ];

  let genreIndex = 0;
  let genreTimer = null;
  let genreObserver = null;
  let genreIsVisible = false;
  let genreSequenceStarted = false;

  function clearGenreTimer() {

    if (genreTimer) {
      clearTimeout(genreTimer);
      genreTimer = null;
    }

  }

  function showNextGenre() {

    if (!genreBubble || !genreName || !genreIsVisible) return;

    clearGenreTimer();

    // Remove previous bubble completely.
    genreBubble.classList.remove("pop");
    genreBubble.classList.add("bubble-exit");

    genreTimer = setTimeout(() => {

      if (!genreIsVisible) return;

      // Select the next genre.
      genreName.textContent = genres[genreIndex];

      genreIndex = (genreIndex + 1) % genres.length;

      // Reveal a fresh bubble.
      genreBubble.classList.remove("bubble-exit");

      void genreBubble.offsetWidth;

      genreBubble.classList.add("pop");

      // Leave it visible before the next transition.
      genreTimer = setTimeout(() => {

        showNextGenre();

      }, 2400);

    }, 450);

  }

  function startGenreSequence() {

    if (
      genreSequenceStarted ||
      !genreBubble ||
      !genreStage
    ) return;

    genreSequenceStarted = true;

    genreIsVisible = true;

    genreIndex = 0;

    showNextGenre();

  }

  function stopGenreSequence() {

    genreIsVisible = false;

    clearGenreTimer();

    if (genreBubble) {
      genreBubble.classList.remove("pop");
      genreBubble.classList.add("bubble-exit");
    }

    genreSequenceStarted = false;

  }

  if (genreStage && "IntersectionObserver" in window) {

    genreObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            if (!genreIsVisible) {
              startGenreSequence();
            }

          } else {

            stopGenreSequence();

          }

        });

      },
      {
        threshold: 0.3
      }
    );

    genreObserver.observe(genreStage);

  } else if (genreStage) {

    startGenreSequence();

  }


  /* =====================================
     8. PACKAGE SELECTION
  ===================================== */

  const packageLinks = document.querySelectorAll(
    ".package-link[data-package]"
  );

  const packageSelect = document.getElementById("package");

  packageLinks.forEach(link => {

    link.addEventListener("click", () => {

      const selectedPackage = link.dataset.package;

      if (!packageSelect) return;

      const matchingOption = Array.from(
        packageSelect.options
      ).find(option => option.textContent.includes(selectedPackage));

      if (matchingOption) {
        packageSelect.value = matchingOption.value;
      }

    });

  });


  /* =====================================
     9. CONTACT FORM
  ===================================== */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);

      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const author = formData.get("author") || "";
      const book = formData.get("book") || "";
      const genre = formData.get("genre") || "";
      const selectedPackage = formData.get("package") || "";
      const budget = formData.get("budget") || "";
      const bookLink = formData.get("bookLink") || "";
      const message = formData.get("message") || "";

      const subject = `Website Enquiry - ${book || "New Enquiry"}`;

      const emailBody = `
NEW AV SQUAD STUDIOS ENQUIRY

Name: ${name}
Email: ${email}

Author / Publishing Name: ${author}
Book Title: ${book}
Genre: ${genre}

Interested Package: ${selectedPackage}
Estimated Budget: ${budget}

Book Link: ${bookLink}

MESSAGE:
${message}

------------------------------
Sent through the AV Squad Studios website.
      `.trim();

      const mailtoURL =
        "mailto:hello.avsquad@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(emailBody);

      window.location.href = mailtoURL;

    });

  }


  /* =====================================
     10. CURRENT YEAR
  ===================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =====================================
     11. SOCIAL LINKS
  ===================================== */

  const externalSocialLinks = document.querySelectorAll(
    '.social-links a[target="_blank"], .footer-socials a[target="_blank"]'
  );

  externalSocialLinks.forEach(link => {

    link.addEventListener("click", () => {

      // External social links are opened in a new tab.

    });

  });


  /* =====================================
     12. SMOOTH ANCHOR NAVIGATION
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

    });

  });


  /* =====================================
     13. IMAGE FALLBACK
  ===================================== */

  document.querySelectorAll(".portfolio-video img").forEach(img => {

    img.addEventListener("error", () => {

      const videoButton = img.closest(".portfolio-video");

      const videoId = videoButton?.dataset.video;

      if (!videoId) return;

      // Try YouTube's standard thumbnail if max resolution is unavailable.
      if (img.src.includes("maxresdefault.jpg")) {

        img.src =
          `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;

      }

    });

  });


  /* =====================================
     14. PAGE INITIALIZATION
  ===================================== */

  updateHeader();

  console.log("AV Squad Studios website initialized successfully.");

});
