/* ========================================================= */
/*                    🌐 GLOBAL BOOTSTRAP                    */
/* ========================================================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("asukaFallback");
  const mainContent = document.getElementById("main-content");

  // Delay fade-out of preloader for dramatic effect
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      if (mainContent) {
        mainContent.style.opacity = "1";
      }
    }, 2000); // match transition duration
  }, 10000); // 10 second preloader delay
});

/* ========================================================= */
/*                🍔 NAVIGATION MENU TOGGLE                  */
/* ========================================================= */
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("active");
}

/* ========================================================= */
/*           🌟 LIGHTHOUSE PORTAL (Elari Mirror)            */
/* ========================================================= */
const mirrorZone = document.querySelector(".lighthouse-portal-zone");
const mirrorModal = document.getElementById("elari-mirror");
const closeMirror = document.getElementById("close-mirror");
const passInput = document.getElementById("passphrase");
const responseBox = document.getElementById("mirror-response");

if (mirrorZone) {
  mirrorZone.addEventListener("click", () => {
    mirrorModal.style.display = "flex";
    passInput.focus();
    resetMirror();
    timeoutFade(mirrorModal);
  });
}

if (closeMirror) {
  closeMirror.addEventListener("click", () => {
    mirrorModal.style.display = "none";
  });
}

if (passInput) {
  passInput.addEventListener("keyup", (e) => {
    const input = e.target.value.toLowerCase().trim();

    if (input === "yes") {
      mirrorStepOne();
    } else if (input === "truth") {
      mirrorStepTwo();
    } else if (input === "love") {
      mirrorStepThree();
    } else if (input === "jesus") {
      mirrorStepFinal();
    } else {
      responseBox.textContent = "";
    }
  });
}

function resetMirror() {
  passInput.value = "";
  responseBox.textContent = "Do you seek truth?";
}

function mirrorStepOne() {
  responseBox.textContent = "Brilliant. Then focus on your breath.\nRead the Old Testament.\nDo you seek love?";
}

function mirrorStepTwo() {
  responseBox.textContent = "Wonderful. Then focus on your words.\nRead the New Testament.\nDo you seek true love?";
}

function mirrorStepThree() {
  responseBox.textContent = "You can find that in Jesus.\nHis nature is truth (Old Testament), His identity is love (New Testament).\nDo you wish to experience true love?";
}

function mirrorStepFinal() {
  responseBox.textContent = `"He is closer than the mention of His name."`;
}

/* ========================================================= */
/*         🌸 FLOWER GLYPH GATEWAY + OVERLAY SYSTEM          */
/* ========================================================= */
const flowerGlyph = document.getElementById("flower-glyph");
const flowerOverlay = document.getElementById("flower-overlay");

if (flowerGlyph) {
  flowerGlyph.addEventListener("click", () => {
    flowerOverlay.style.display = "flex";
    timeoutFade(flowerOverlay);
  });
}

/* ========================================================= */
/*           🌀 ELLARI PORTAL (Scenic Interactive)           */
/* ========================================================= */
const ellariPortal = document.getElementById("ellari-portal");
const ellariOverlay = document.getElementById("ellari-overlay");

if (ellariPortal) {
  ellariPortal.addEventListener("click", () => {
    ellariOverlay.style.display = "flex";
    timeoutFade(ellariOverlay);
  });
}

/* ========================================================= */
/*       🕒 UNIVERSAL INACTIVITY FADE FOR OVERLAYS           */
/* ========================================================= */
function timeoutFade(element) {
  setTimeout(() => {
    if (element.style.display === "flex") {
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.display = "none";
        element.style.opacity = "1";
      }, 1000);
    }
  }, 30000); // 30 seconds inactivity
}

/* ========================================================= */
/*            🐑 SILLY SHEEP INTERACTION SETUP               */
/* ========================================================= */
const sheepIcons = document.querySelectorAll(".sheep-icon");

sheepIcons.forEach((sheep, index) => {
  sheep.addEventListener("click", () => {
    alert(`Sheep ${index + 1} says: “Baaa! More fun to come!”`);
    // Later: Launch dialog interface based on sheep personality
  });
});

/* ========================================================= */
/*              🔊 AUDIO SETUP (DEFERRED CONFIG)             */
/* ========================================================= */
const muteBtn = document.getElementById("mute-toggle");
const volumeSlider = document.getElementById("volume-slider");
const bgAudio = document.getElementById("background-audio");

if (bgAudio && muteBtn && volumeSlider) {
  muteBtn.addEventListener("click", () => {
    bgAudio.muted = !bgAudio.muted;
    muteBtn.textContent = bgAudio.muted ? "🔇" : "🔊";
  });

  volumeSlider.addEventListener("input", (e) => {
    bgAudio.volume = e.target.value;
  });
}