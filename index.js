/* ─────────────────────────────
   FLIPPER AUTO + SCROLL
────────────────────────────── */
const container = document.querySelector(".flip-scroll-container");
const items = document.querySelectorAll(".item");

if (container && items.length > 0) {
  let index = 0;
  let autoFlip;
  let isUserScrolling = false;

  function startAutoFlip() {
    autoFlip = setInterval(() => {
      if (!isUserScrolling) {
        index = (index + 1) % items.length;
        container.scrollTo({
          top: index * 50,
          behavior: "smooth",
        });
      }
    }, 2000);
  }
  startAutoFlip();

  let scrollTimeout;
  container.addEventListener("wheel", () => {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      isUserScrolling = false;
      let nearest = Math.round(container.scrollTop / 50);
      index = nearest;
      container.scrollTo({
        top: nearest * 50,
        behavior: "smooth",
      });
    }, 400);
  });
}


/* ─────────────────────────────
   HAMBURGER + NAV OVERLAY
────────────────────────────── */
const hamburger = document.querySelector(".hamburger");
const navOverlay = document.getElementById("nav-overlay");

hamburger.addEventListener("click", () => {
  const open = hamburger.classList.toggle("open");
  navOverlay.classList.toggle("open", open);
});

navOverlay.addEventListener("click", (e) => {
  if (e.target === navOverlay) {
    navOverlay.classList.remove("open");
    hamburger.classList.remove("open");
  }
});

/* ─────────────────────────────
   WORK DROPDOWN
────────────────────────────── */
const workItem = document.querySelector(".has-sub");
const workToggle = document.querySelector(".nav-item-toggle");

workToggle.addEventListener("click", () => {
  workItem.classList.toggle("open");
});

/* ─────────────────────────────
   THEME LOGIC (FIXED & CLEAN)
────────────────────────────── */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("theme-light");
    themeIcon.src = "Sun.svg";
  } else {
    document.body.classList.remove("theme-light");
    themeIcon.src = "Moon.svg";
  }
}

// Load saved theme OR system preference
let savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme ? savedTheme : prefersLight.matches ? "light" : "dark");

// Toggle theme button
themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("theme-light");
  const newTheme = isLight ? "dark" : "light";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Update if system changes *and* user has no saved theme
prefersLight.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "light" : "dark");
  }
});
