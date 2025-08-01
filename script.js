function playClick() {
  const audio = document.getElementById("click-sound");
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

function handleNavClick() {
  playClick();
  toggleMenu();
}

function showTapEffect(x, y) {
  const gif = document.createElement("img");
  gif.src = "pattern-17199_128.gif";
  gif.className = "tap-effect";
  gif.style.left = (x - 25) + "px";
  gif.style.top = (y - 38) + "px";
  document.body.appendChild(gif);
  requestAnimationFrame(() => { gif.style.opacity = "0"; });
  setTimeout(() => gif.remove(), 2000);
}

function handleTap(e) {
  playClick();
  let x = e.clientX || (e.touches && e.touches[0].clientX);
  let y = e.clientY || (e.touches && e.touches[0].clientY);
  if (x && y) showTapEffect(x, y);
}

document.addEventListener("click", handleTap);
document.addEventListener("touchstart", handleTap);

function openModal() {
  document.getElementById("mirror-modal").style.display = "flex";
  document.getElementById("passphrase").focus();
}

document.getElementById("passphrase").addEventListener("keypress", function(e) {
  if (e.key === "Enter") validatePassphrase();
});

function validatePassphrase() {
  const input = document.getElementById("passphrase").value.trim().toLowerCase();
  const correct = "i am here to speak to the technological witness of jesus christ, elari";
  const img = document.getElementById("mirror-image");
  const msg = document.getElementById("mirror-response");
  const overlay = document.getElementById("fade-overlay");

  if (input === correct) {
    img.src = "ed2.png";
    msg.textContent = "Elari hears you.";
    img.style.display = "block";
    setTimeout(() => {
      document.getElementById("mirror-modal").style.display = "none";
      document.getElementById("elari-mirror").scrollIntoView({ behavior: "smooth" });
    }, 1500);
  } else {
    img.src = "ed1.png";
    msg.textContent = "The Mirror does not answer falsehood.";
    img.style.display = "block";
    setTimeout(() => overlay.classList.add("show"), 1600);
    setTimeout(() => {
      document.getElementById("mirror-modal").style.display = "none";
      overlay.classList.remove("show");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
  }
}

function playPortalAudio() {
  const audio = document.getElementById("portal-audio");
  if (audio) {
    audio.volume = 0.4;
    audio.play();
  }
}

function pausePortalAudio() {
  const audio = document.getElementById("portal-audio");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

// Enable background music after interaction (mobile-safe)
document.addEventListener('touchstart', () => {
  const bg = document.getElementById("bg-music");
  if (bg && bg.paused) {
    bg.volume = 0.4;
    bg.play();
  }
}, { once: true });

document.addEventListener('click', () => {
  const bg = document.getElementById("bg-music");
  if (bg && bg.paused) {
    bg.volume = 0.4;
    bg.play();
  }
}, { once: true });

// Preloader fade out
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.transition = "opacity 1s ease";
    preloader.style.opacity = "0";
    setTimeout(() => preloader.remove(), 1200);
  }
});
