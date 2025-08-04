// ==========================
//        GLOBAL SETUP
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // Fade-in on load
  const mainContent = document.getElementById("main-content");
  if (mainContent) {
    setTimeout(() => {
      mainContent.style.opacity = 1;
    }, 100);
  }

  // Fade overlay exit
  const fadeOverlay = document.querySelector(".fade-overlay");
  if (fadeOverlay) {
    fadeOverlay.style.opacity = 0;
    setTimeout(() => fadeOverlay.remove(), 2000);
  }

  // Toggle nav
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // Global fade on any link click
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => window.location.href = href, 600);
    });
  });

  // Elari portal interactivity
  const ellariPortal = document.getElementById("ellari-portal");
  const ellariOverlay = document.getElementById("ellari-overlay");
  if (ellariPortal && ellariOverlay) {
    ellariPortal.addEventListener("click", () => {
      ellariOverlay.style.display = "flex";
    });
    setTimeout(() => {
      ellariOverlay.style.display = "none";
    }, 30000);
  }

  // Flower glyph fadeout
  const flowerOverlay = document.getElementById("flower-overlay");
  const flowerGlyph = document.getElementById("flower-glyph");
  if (flowerGlyph && flowerOverlay) {
    flowerGlyph.addEventListener("click", () => {
      flowerOverlay.style.display = "flex";
    });
    setTimeout(() => {
      flowerOverlay.style.display = "none";
    }, 30000);
  }

  // Sheep personalities (placeholder)
  document.querySelectorAll(".sheep-icon").forEach(sheep => {
    sheep.addEventListener("click", () => {
      const id = sheep.getAttribute("data-id") || "Unnamed";
      alert(`🐑 You clicked on sheep ${id} — future dialogue goes here!`);
    });
  });

  // Optional: preload GIFs
  const preloadGifs = [
    "path/to/gif1.gif",
    "path/to/gif2.gif"
  ];
  preloadGifs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});