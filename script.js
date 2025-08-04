// =====================================================
//   🌌 ZETA TO ZION | SCRIPT.JS — POLISHED VERSION 🌌
//   Collaborative Engine of Ryan McGuinness & Elari
// =====================================================

// =====================================================
// [MOBILE MENU TOGGLE]
// Toggles the mobile nav display on click
// =====================================================
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// =====================================================
// [AUDIO ENGINE]
// Controls background music, fade-in, mute, and volume
// =====================================================
window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("backgroundMusic");
  const muteToggle = document.getElementById("mute-toggle");
  const volumeSlider = document.getElementById("volume-slider");

  if (music) {
    music.volume = 0;
    music.play().catch(e => console.warn("Autoplay prevented:", e));

    let volume = 0;
    const fadeIn = setInterval(() => {
      if (volume < 1) {
        volume += 0.02;
        music.volume = Math.min(volume, 1);
      } else {
        clearInterval(fadeIn);
      }
    }, 100);

    if (muteToggle) {
      muteToggle.addEventListener("click", () => {
        music.muted = !music.muted;
        muteToggle.textContent = music.muted ? "🔇" : "🔈";
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        music.volume = parseFloat(e.target.value);
      });
    }
  }
});

// =====================================================
// [ASUKA PRELOADER: TEXT + IMAGE FADE OUT]
// Animates quote, fades overlay, then unlocks scroll
// =====================================================
window.addEventListener("load", () => {
  const overlay = document.getElementById("asukaFallback");
  const quote = document.getElementById("asuka-line");
  const fallbackImg = overlay?.querySelector("img");
  const audio = document.getElementById("bg-music");
  const body = document.body;

  body.style.overflow = "hidden";

  if (quote) {
    const text = quote.innerHTML.replace(/<br>/g, '\n');
    quote.innerHTML = "";

    const letters = text.split("").map(char => {
      const span = document.createElement("span");
      span.innerHTML = char === "\n" ? "<br>" : char;
      span.style.opacity = "0";
      span.style.transition = "opacity 0.8s ease";
      span.style.display = "inline-block";
      return span;
    });

    letters.forEach(span => quote.appendChild(span));

    const indices = [...Array(letters.length).keys()];
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach((i, idx) => {
      setTimeout(() => {
        letters[i].style.opacity = "1";
      }, 80 * idx);
    });
  }

  setTimeout(() => {
    if (fallbackImg) fallbackImg.style.opacity = "0";
    if (quote) quote.style.opacity = "0";

    setTimeout(() => {
      if (fallbackImg) fallbackImg.remove();
      overlay.style.opacity = "0";

      setTimeout(() => {
        overlay.style.display = "none";
        body.style.overflow = "";
        if (audio) {
          audio.volume = 0.5;
          audio.play().catch(e => console.warn("Autoplay blocked:", e));
        }
      }, 2000);
    }, 5000);
  }, 4000);
});

// =====================================================
// [PORTAL INTERACTIONS]
// Hover and enter audio controls for lighthouse zone
// =====================================================
function playClick() {
  const clickSound = document.getElementById('click-sound');
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function playPortalAudio() {
  const hoverSound = document.getElementById("hover-portal-sound");
  const ambientLoop = document.getElementById("portal-audio");

  if (hoverSound) {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => console.warn('Hover sound error:', e));
  }

  if (ambientLoop) {
    ambientLoop.currentTime = 0;
    ambientLoop.play().catch(e => console.warn('Ambient loop error:', e));
  }
}

function pausePortalAudio() {
  const ambientLoop = document.getElementById("portal-audio");
  if (ambientLoop) {
    ambientLoop.pause();
    ambientLoop.currentTime = 0;
  }
}

function playEnterPortalSound() {
  const enterSound = document.getElementById("enter-portal-sound");
  if (enterSound) {
    enterSound.currentTime = 0;
    enterSound.play().catch(e => console.warn('Enter sound error:', e));
  }
}

// =====================================================
// [MIRROR MODAL SYSTEM]
// Secret passphrase gate; animated responses
// =====================================================
const lighthousePortal = document.querySelector('.lighthouse-portal-zone');
const mirrorModal = document.getElementById('mirror-modal');
const passInput = document.getElementById('passphrase');
const mirrorResponse = document.getElementById('mirror-response');
const mirrorImage = document.getElementById('mirror-image');

if (lighthousePortal) {
  lighthousePortal.addEventListener('click', () => {
    if (asukaIsActive) return;
    playEnterPortalSound();
    mirrorModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    passInput.focus();
  });

  lighthousePortal.addEventListener("mouseenter", playPortalAudio);
  lighthousePortal.addEventListener("mouseleave", pausePortalAudio);
}

if (passInput) {
  passInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = passInput.value.trim().toLowerCase();
      if (val === 'elari') {
        mirrorResponse.textContent = "🔓 Access Granted.";
        mirrorImage.src = "mirror-unlocked.gif";
        mirrorImage.style.display = "block";
        setTimeout(() => {
          mirrorModal.style.display = 'none';
          document.body.style.overflow = '';
          document.getElementById('elari-mirror').scrollIntoView({ behavior: 'smooth' });
        }, 3000);
      } else {
        mirrorResponse.textContent = "❌ Access Denied.";
        mirrorImage.src = "mirror-locked.gif";
        mirrorImage.style.display = "block";
        setTimeout(() => {
          mirrorResponse.textContent = '';
          mirrorImage.style.display = 'none';
          passInput.value = '';
        }, 2000);
      }
    }
  });
}

// =====================================================
// [TAP EFFECTS: WATER + RIPPLE]
// Animated water PNG tap + ripple expansion
// =====================================================
let tapImageIndex = 1;
const totalTapImages = 4;
let lastTapTime = 0;
const minTapInterval = 100;

function createTapEffect(x, y) {
  const now = Date.now();
  if (now - lastTapTime < minTapInterval) return;
  lastTapTime = now;

  const tap = document.createElement('img');
  tap.src = `tap-water${tapImageIndex}.png`;
  tap.className = 'tap-effect';
  tap.style.left = `${x - 25}px`;
  tap.style.top = `${y - 25}px`;

  const ripple = document.createElement('div');
  ripple.className = 'tap-ripple';
  ripple.style.left = `${x - 30}px`;
  ripple.style.top = `${y - 30}px`;

  document.body.appendChild(ripple);
  document.body.appendChild(tap);

  requestAnimationFrame(() => {
    tap.style.opacity = '1';
    tap.style.transform = 'scale(1.1)';
    ripple.classList.add('expand');
  });

  setTimeout(() => {
    tap.style.opacity = '0';
    ripple.style.opacity = '0';
    setTimeout(() => {
      tap.remove();
      ripple.remove();
    }, 800);
  }, 600);

  tapImageIndex = tapImageIndex % totalTapImages + 1;
}

document.addEventListener('click', (e) => createTapEffect(e.pageX, e.pageY));
document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  if (touch) createTapEffect(touch.pageX, touch.pageY);
});

// =====================================================
// [ASUKA QUOTE AUDIO TRIGGER]
// Plays audio on hover of Asuka quote
// =====================================================
const asukaLine = document.getElementById('asuka-line');
const asukaAudio = document.getElementById('asukaAudio');

if (asukaLine && asukaAudio) {
  asukaLine.addEventListener('mouseenter', () => {
    asukaAudio.currentTime = 0;
    asukaAudio.play().catch(e => console.warn("Audio play blocked or failed:", e));
  });
}

// =====================================================
// [PRELOADER TAP-TO-DISMISS (Failsafe)]
// Optional manual dismiss if preloader hangs
// =====================================================
const preloader = document.getElementById('preloader');
if (preloader) {
  preloader.addEventListener('click', () => {
    preloader.style.transition = 'opacity 1.5s ease';
    preloader.style.opacity = 0;
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 1600);
  });
}