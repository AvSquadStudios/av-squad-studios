
/* =========================================================
   AV SQUAD STUDIOS — COMPLETE WEBSITE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     1. CINEMATIC INTRO
  ======================================================= */

  const intro = document.querySelector(".intro-screen");
  const skipIntro = document.querySelector(".intro-skip");

  function closeIntro() {
    if (!intro) return;

    intro.classList.add("is-hidden");

    // Remove the intro from interaction after its transition.
    window.setTimeout(() => {
      intro.style.display = "none";
    }, 1100);
  }

  if (intro) {
    // Automatically close after approximately five seconds.
    window.setTimeout(closeIntro, 5000);
  }

  if (skipIntro) {
    skipIntro.addEventListener("click", closeIntro);
  }


  /* =======================================================
     2. MOBILE NAVIGATION
  ======================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.innerHTML = isOpen ? "&times;" : "&#9776;";
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "&#9776;";
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = "&#9776;";
      }
    });
  }


  /* =======================================================
     3. SCROLL REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }


  /* =======================================================
     4. ACTIVE NAVIGATION LINK
  ======================================================= */

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* =======================================================
     5. GENRE BUBBLE SEQUENCE
     
     One bubble appears.
     One genre name is revealed.
     It stays briefly.
     The bubble pops and disappears.
     The next genre appears only after the first is gone.
  ======================================================= */

  const genreStage = document.querySelector(".genre-stage");
  const genreBubble = document.querySelector(".genre-bubble");
  const genreName = document.querySelector(".genre-name");

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

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (genreStage && genreBubble && genreName) {
    let currentGenre = 0;
    let genreTimer = null;

    const particleCount = 12;

    function clearGenreParticles() {
      genreStage
        .querySelectorAll(".genre-particle")
        .forEach((particle) => particle.remove());
    }

    function createPopParticles() {
      clearGenreParticles();

      if (reducedMotion) return;

      const stageRect = genreStage.getBoundingClientRect();
      const bubbleRect = genreBubble.getBoundingClientRect();

      const centerX =
        bubbleRect.left - stageRect.left + bubbleRect.width / 2;

      const centerY =
        bubbleRect.top - stageRect.top + bubbleRect.height / 2;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 65 + Math.random() * 55;

        particle.className = "genre-particle";

        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty(
          "--dx",
          `${Math.cos(angle) * distance}px`
        );
        particle.style.setProperty(
          "--dy",
          `${Math.sin(angle) * distance}px`
        );

        genreStage.appendChild(particle);

        window.setTimeout(() => particle.remove(), 750);
      }
    }

    function showGenre() {
      clearGenreParticles();

      genreBubble.classList.remove("is-popping");
      genreBubble.classList.remove("is-active");

      genreName.textContent = genres[currentGenre];

      // Allow the browser to register the hidden state first.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          genreBubble.classList.add("is-active");
        });
      });

      // Keep the genre visible before popping.
      const displayTime = reducedMotion ? 1600 : 1900;

      genreTimer = window.setTimeout(() => {
        popGenre();
      }, displayTime);
    }

    function popGenre() {
      createPopParticles();

      genreBubble.classList.remove("is-active");
      genreBubble.classList.add("is-popping");

      genreTimer = window.setTimeout(() => {
        genreBubble.classList.remove("is-popping");

        // Wait until the previous bubble is fully gone.
        currentGenre = (currentGenre + 1) % genres.length;

        genreTimer = window.setTimeout(() => {
          showGenre();
        }, reducedMotion ? 700 : 500);

      }, reducedMotion ? 150 : 450);
    }

    // Start the sequence when the section enters the viewport.
    if ("IntersectionObserver" in window) {
      const genreObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!genreBubble.classList.contains("is-active")) {
                showGenre();
              }
            } else {
              window.clearTimeout(genreTimer);
              genreBubble.classList.remove("is-active");
              genreBubble.classList.remove("is-popping");
              clearGenreParticles();
            }
          });
        },
        { threshold: 0.25 }
      );

      genreObserver.observe(genreStage);
    } else {
      showGenre();
    }
  }


  /* =======================================================
     6. PORTFOLIO VIDEO PLAYER
     
     Videos open inside a centered modal.
     YouTube URLs are never displayed as text.
     
     For YouTube:
     data-video="YOUTUBE_VIDEO_ID"
     
     For direct MP4:
     data-video="https://example.com/video.mp4"
     data-video-type="mp4"
  ======================================================= */

  const videoModal = document.querySelector(".video-modal");
  const videoFrame = document.querySelector(".video-frame");
  const videoTriggers = document.querySelectorAll("[data-video]");
  const videoClose = document.querySelector(".video-close");

  function closeVideo() {
    if (!videoModal || !videoFrame) return;

    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");

    // Removing the player stops the video.
    videoFrame.innerHTML = "";

    document.body.style.overflow = "";
  }

  function openVideo(trigger) {
    if (!videoModal || !videoFrame) return;

    const videoSource = trigger.dataset.video;
    const videoType = trigger.dataset.videoType || "youtube";

    if (!videoSource) return;

    videoFrame.innerHTML = "";

    if (videoType === "mp4") {
      const video = document.createElement("video");

      video.src = videoSource;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";

      videoFrame.appendChild(video);

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // The viewer can start playback using the controls.
        });
      }
    } else {
      // Accept a video ID, not a visible YouTube URL.
      const videoId = videoSource.trim();

      if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        console.error("Invalid YouTube video ID:", videoId);
        return;
      }

      const iframe = document.createElement("iframe");

      iframe.src =
        `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

      iframe.title = "AV Squad Studios video project";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      videoFrame.appendChild(iframe);
    }

    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  videoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openVideo(trigger);
    });
  });

  if (videoClose) {
    videoClose.addEventListener("click", closeVideo);
  }

  if (videoModal) {
    videoModal.addEventListener("click", (event) => {
      if (event.target === videoModal) {
        closeVideo();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVideo();
    }
  });


  /* =======================================================
     7. CURRENT YEAR IN FOOTER
  ======================================================= */

  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     8. CONTACT EMAIL COPY BUTTON
     
     Optional: add data-copy-email to a button.
  ======================================================= */

  const copyEmailButtons = document.querySelectorAll("[data-copy-email]");

  copyEmailButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail;

      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);

        const originalText = button.textContent;
        button.textContent = "Copied!";

        window.setTimeout(() => {
          button.textContent = originalText;
        }, 1800);

      } catch (error) {
        window.location.href = `mailto:${email}`;
      }
    });
  });

});
