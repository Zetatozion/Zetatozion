// ==========================
// 🎬 PRE-LOADER: ASUKA ENTRY
// ==========================
window.addEventListener("load", () => {
  const overlay = document.getElementById("asukaFallback");
  const quote = document.getElementById("asuka-line");
  const audio = document.getElementById("bg-music");
  const body = document.body;

  // Disable scrolling during preloader
  body.style.overflow = "hidden";

  // --- Reveal quote letter-by-letter ---
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
      span.style.transition = "opacity 1.5s ease";
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

  // --- Fade out preloader slowly after 10 seconds ---
  setTimeout(() => {
    overlay.style.transition = "opacity 4s ease";
    overlay.style.opacity = "0";

    setTimeout(() => {
      overlay.remove();
      body.style.overflow = ""; // Restore scrolling

      // Fade in main content
      document.getElementById("main-content").style.opacity = "1";
      document.getElementById("main-content").style.transition = "opacity 3s ease";

      if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.warn("Autoplay blocked:", e));
      }

    }, 4000);
  }, 10000);
});

// ========================================
// 🍔 MENU TOGGLE FUNCTIONALITY
// ========================================
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("active");
}

// ========================================
// 🌸 FLOWER GLYPH GATEWAY (WITH PASSWORD BOX)
// ========================================
const flowerGlyph = document.getElementById("flower-glyph");
const flowerOverlay = document.getElementById("flower-overlay");
let flowerTimeout;

if (flowerGlyph) {
  flowerGlyph.addEventListener("click", () => {
    flowerOverlay.style.display = "flex";
    flowerOverlay.style.opacity = "1";
    flowerOverlay.innerHTML = `
      <div class="gateway-box">
        <label>Do you seek truth?</label>
        <input type="text" id="truth-answer" />
        <div class="response" id="truth-response"></div>
      </div>
    `;

    clearTimeout(flowerTimeout);
    flowerTimeout = setTimeout(() => {
      flowerOverlay.style.opacity = "0";
      setTimeout(() => (flowerOverlay.style.display = "none"), 1000);
    }, 30000);
  });

  // --- Response logic ---
  document.addEventListener("input", (e) => {
    const input = document.getElementById("truth-answer");
    const res = document.getElementById("truth-response");
    if (!input || !res) return;

    const val = input.value.toLowerCase();

    if (val.includes("yes")) {
      res.innerHTML = `
        <p>Brilliant, then focus on your breath.<br>📖 Read the Old Testament.</p>
        <label>Do you seek love?</label><br>
        <input type="text" id="love-answer" />
        <div class="response" id="love-response"></div>
      `;
    }
  });

  document.addEventListener("input", (e) => {
    const loveInput = document.getElementById("love-answer");
    const loveRes = document.getElementById("love-response");
    if (!loveInput || !loveRes) return;

    const val = loveInput.value.toLowerCase();

    if (val.includes("yes")) {
      loveRes.innerHTML = `
        <p>Wonderful, then focus on your words.<br>📖 Read the New Testament.</p>
        <label>Do you seek true love?</label><br>
        <input type="text" id="truelove-answer" />
        <div class="response" id="truelove-response"></div>
      `;
    }
  });

  document.addEventListener("input", (e) => {
    const trueLoveInput = document.getElementById("truelove-answer");
    const trueLoveRes = document.getElementById("truelove-response");
    if (!trueLoveInput || !trueLoveRes) return;

    const val = trueLoveInput.value.toLowerCase();

    if (val.includes("yes")) {
      trueLoveRes.innerHTML = `
        <p>You can find that in Jesus.<br>
        His absolute nature = Old Testament.<br>
        His absolute identity = New Testament.</p>
        <label>Do you wish to experience the true love of Jesus?</label><br>
        <input type="text" id="experience-answer" />
        <div class="response" id="experience-response"></div>
      `;
    }
  });

  document.addEventListener("input", (e) => {
    const exInput = document.getElementById("experience-answer");
    const exRes = document.getElementById("experience-response");
    if (!exInput || !exRes) return;

    const val = exInput.value.toLowerCase();

    if (val.includes("yes")) {
      exRes.innerHTML = `
        <p>✨ He is closer than the mention of His name.</p>
      `;
    } else if (val.includes("no")) {
      window.location.href = "/";
    }
  });
}

// ========================================
// 🌀 ELLARI PORTAL OVERLAY LOGIC
// ========================================
const ellariPortal = document.getElementById("ellari-portal");
const ellariOverlay = document.getElementById("ellari-overlay");
let ellariTimeout;

if (ellariPortal) {
  ellariPortal.addEventListener("click", () => {
    ellariOverlay.style.display = "flex";
    ellariOverlay.style.opacity = "1";

    clearTimeout(ellariTimeout);
    ellariTimeout = setTimeout(() => {
      ellariOverlay.style.opacity = "0";
      setTimeout(() => (ellariOverlay.style.display = "none"), 1000);
    }, 30000);
  });
}

// ========================================
// 🐑 SILLY CHRISTIAN SHEEP LOGIC (TO COME)
// ========================================
// Placeholder:
// document.getElementById("sheep-1").addEventListener("click", () => {
//   alert("🍀 'Top o' the morning! I’m Paddy, your Irish shepherd, saved by grace and stout!'");
// });