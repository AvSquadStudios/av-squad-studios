
const genres = [
  "FANTASY",
  "ROMANCE",
  "THRILLER",
  "MYSTERY",
  "SCI-FI",
  "HORROR",
  "ADVENTURE",
  "HISTORICAL",
  "DRAMA",
  "COMEDY",
  "PARANORMAL",
  "CRIME",
  "LITERARY",
  "YOUNG ADULT",
  "CHILDREN'S",
  "MEMOIR",
  "BIOGRAPHY",
  "DYSTOPIAN",
  "SUSPENSE",
  "SATIRE"
];

const container = document.getElementById("bubbleContainer");
const counter = document.getElementById("counter");
const finalMessage = document.getElementById("finalMessage");
const replayButton = document.getElementById("replayButton");

let timers = [];
let currentIndex = 0;

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function createParticles(x, y) {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 65;

    particle.style.left = x + "%";
    particle.style.top = y + "%";
    particle.style.setProperty("--dx",
      Math.cos(angle) * distance + "px");
    particle.style.setProperty("--dy",
      Math.sin(angle) * distance + "px");

    container.appendChild(particle);

    setTimeout(() => particle.remove(), 900);
  }
}

function showGenre(index) {
  if (index >= genres.length) {
    finishAnimation();
    return;
  }

  const positions = [
    [12, 15], [37, 5], [70, 12], [85, 37],
    [64, 65], [33, 70], [8, 48], [47, 37],
    [78, 72], [20, 82], [53, 12], [91, 65],
    [39, 45], [67, 35], [15, 30], [52, 82],
    [82, 18], [29, 22], [73, 83], [46, 57]
  ];

  const [x, y] = positions[index];
  const size = 75 + Math.random() * 45;

  const bubble = document.createElement("div");
  bubble.className = "genre-bubble";

  bubble.style.setProperty("--x", x + "%");
  bubble.style.setProperty("--y", y + "%");
  bubble.style.setProperty("--size", size + "px");

  const name = document.createElement("span");
  name.className = "genre-name";
  name.textContent = genres[index];

  bubble.appendChild(name);
  container.appendChild(bubble);

  requestAnimationFrame(() => {
    bubble.classList.add("pop");
  });

  createParticles(x, y);

  currentIndex++;
  counter.textContent =
    String(currentIndex).padStart(2, "0") + " / 20";

  if (index + 1 < genres.length) {
    const timer = setTimeout(() => {
      showGenre(index + 1);
    }, 650);

    timers.push(timer);
  } else {
    const timer = setTimeout(finishAnimation, 1400);
    timers.push(timer);
  }
}

function finishAnimation() {
  finalMessage.classList.add("show");
}

function startAnimation() {
  clearTimers();

  container.innerHTML = "";
  finalMessage.classList.remove("show");

  currentIndex = 0;
  counter.textContent = "01 / 20";

  const timer = setTimeout(() => {
    showGenre(0);
  }, 700);

  timers.push(timer);
}

replayButton.addEventListener("click", startAnimation);

startAnimation();
