// -----------------------------------------
//      Mobile Menu Toggle Function
// -----------------------------------------
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// =========================================
//         🎵 AUDIO CONTROLS & FADE-IN 🎵
// =========================================
//  - Fades in background music
//  - Adds mute/unmute toggle button
//  - Adds live volume slider
//  - Handles autoplay restrictions gracefully
// =========================================

window.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("backgroundMusic");
  const muteToggle = document.getElementById("mute-toggle");
  const volumeSlider = document.getElementById("volume-slider");

  if (music) {
    music.volume = 0; // Start muted for fade-in
    music.play().catch(e => console.warn("Autoplay prevented:", e));

    // 🔊 Fade In Logic (3 seconds)
    let volume = 0;
    const fadeIn = setInterval(() => {
      if (volume < 1) {
        volume += 0.02;
        music.volume = Math.min(volume, 1);
      } else {
        clearInterval(fadeIn);
      }
    }, 100);

    // 🔇 Mute / Unmute Toggle
    if (muteToggle) {
      muteToggle.addEventListener("click", () => {
        music.muted = !music.muted;
        muteToggle.textContent = music.muted ? "🔇" : "🔈";
      });
    }

    // 🎚️ Volume Slider
    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        music.volume = parseFloat(e.target.value);
      });
    }
  }
});

// -----------------------------------------
//         ASUKA PRELOADER FADE-OUT
// -----------------------------------------
window.addEventListener("load", () => {
  const overlay = document.getElementById("asukaFallback");
  const quote = document.getElementById("asuka-line");
  const audio = document.getElementById("bg-music");
  const body = document.body;

  // Prevent scrolling during preload
  body.style.overflow = "hidden";

  // Animate quote letters
  if (quote) {
    const text = quote.innerHTML.replace(/<br>/g, '\n');
    quote.innerHTML = "";

    const letters = text.split("").map(char => {
      const span = document.createElement("span");
      span.style.opacity = "0";
      span.style.transition = "opacity 0.6s ease";
      span.style.display = "inline-block";

      if (char === "\n") span.innerHTML = "<br>";
      else span.textContent = char;

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
      }, 40 * idx);
    });
  }

  // Wait, fade out, then clean up
  setTimeout(() => {
    if (!overlay) return;

    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1s ease";

    setTimeout(() => {
      // Remove just the fallback image (e.g. giant Asuka)
      const fallbackImg = overlay.querySelector("img");
      if (fallbackImg) fallbackImg.remove();

      overlay.style.display = "none";       // Hide entire overlay (but keep element if needed later)
      body.style.overflow = "";             // Re-enable scroll

      // Start background music safely
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.warn("Autoplay blocked:", e));
      }

      // Optional: reset background if needed
      // body.style.background = "#000"; 
    }, 1000);
  }, 2500);
});

// -----------------------------------------
//      Click Sound Playback
// -----------------------------------------
function playClick() {
  const clickSound = document.getElementById('click-sound');
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

// -----------------------------------------
//  Lighthouse Portal Audio Control (Updated)
// -----------------------------------------
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

// -----------------------------------------
//     Tap Effect + Ripple Animation
// -----------------------------------------
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

document.addEventListener('click', (e) => {
  createTapEffect(e.pageX, e.pageY);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  if (touch) createTapEffect(touch.pageX, touch.pageY);
});

// -----------------------------------------
//    🔐 Asuka Overlay Active State
// -----------------------------------------
let asukaIsActive = true;

// -----------------------------------------
//         ASUKA OVERLAY FADE-OUT
// -----------------------------------------
window.addEventListener("load", () => {
  const overlay = document.getElementById("asukaFallback");
  const fallbackImg = overlay?.querySelector("img"); // 👈 Add this line
  const quote = document.getElementById("asuka-line");
  const audio = document.getElementById("bg-music");
  const body = document.body;

  // Disable scrolling until preload ends
  body.style.overflow = "hidden";

  // Reveal quote letters
  if (quote) {
    const text = quote.innerHTML.replace(/<br>/g, '\n');
    quote.innerHTML = "";

    const letters = text.split("").map(char => {
      const span = document.createElement("span");
      if (char === "\n") {
        span.innerHTML = "<br>";
      } else {
        span.textContent = char;
      }
      span.style.opacity = "0";
      span.style.transition = "opacity 0.6s ease";
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
      }, 40 * idx);
    });
  }

  // Wait 2.5s before fading out
  setTimeout(() => {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1s ease";

    setTimeout(() => {
      // 💥 Remove the fallback image but keep structure if needed
      if (fallbackImg) fallbackImg.remove();

      overlay.style.display = "none"; // optional, keeps DOM cleaner
      body.style.overflow = ""; // re-enable scrolling

      // Start music safely
      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.warn("Autoplay blocked:", e));
      }

    }, 1000);
  }, 2500);
});

// -----------------------------------------
//       Modal Mirror Interaction
// -----------------------------------------
const lighthousePortal = document.querySelector('.lighthouse-portal-zone');
const mirrorModal = document.getElementById('mirror-modal');
const passInput = document.getElementById('passphrase');
const mirrorResponse = document.getElementById('mirror-response');
const mirrorImage = document.getElementById('mirror-image');

if (lighthousePortal) {
  lighthousePortal.addEventListener('click', () => {
    if (asukaIsActive) return; // 🔒 Block if Asuka hasn't faded yet

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

// -----------------------------------------
//     Preloader Click-To-Dismiss Logic
// -----------------------------------------
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

// -----------------------------------------
//  Optional: Background Music Fade-In
// -----------------------------------------
window.addEventListener('click', () => {
  const bgMusic = document.getElementById('bg-music');
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0;
    bgMusic.play().then(() => {
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          bgMusic.volume = Math.min(vol, 1);
        } else {
          clearInterval(fade);
        }
      }, 200);
    }).catch(e => console.warn('Autoplay blocked:', e));
  }
}, { once: true });

// -----------------------------------------
//     Asuka Fallback Logic
// -----------------------------------------
window.addEventListener("load", () => {
  const overlay = document.getElementById("asukaFallback");
  if (!overlay) return;

  function fadeOutAsuka() {
    asukaIsActive = false;
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 1500);
    document.body.style.overflow = "auto";
  }

  const quote = document.getElementById("asuka-line");
  if (quote) {
    quote.style.opacity = "1";
  }

  if (location.protocol === "https:") {
    setTimeout(() => fadeOutAsuka(), 15000);
  } else {
    const bypass = document.getElementById("asukabypass");
    let clicks = 0;
    let resetTimer;

    if (bypass) {
      bypass.addEventListener("click", () => {
        clicks++;
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => (clicks = 0), 2000);
        if (clicks >= 3) fadeOutAsuka();
      });
    }
  }
});

// -----------------------------------------
// 💧 Asuka Ripple Tap Effect
// -----------------------------------------
document.addEventListener('click', function (e) {
  const ripple = document.createElement('div');
  ripple.className = 'tap-ripple';
  ripple.style.left = `${e.pageX - 30}px`;
  ripple.style.top = `${e.pageY - 30}px`;
  document.body.appendChild(ripple);
  requestAnimationFrame(() => {
    ripple.classList.add('expand');
  });
  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// -----------------------------------------
// 🔊 ASUKA LINE AUDIO TRIGGER
// -----------------------------------------
const asukaLine = document.getElementById('asuka-line');
const asukaAudio = document.getElementById('asukaAudio');

if (asukaLine && asukaAudio) {
  asukaLine.addEventListener('mouseenter', () => {
    asukaAudio.currentTime = 0;
    asukaAudio.play().catch(e => {
      console.warn("Audio play blocked or failed:", e);
    });
  });
}