// -----------------------------------------
//      Mobile Menu Toggle Function
// -----------------------------------------
function toggleMenu() {
  const nav = document.querySelector('nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// -----------------------------------------
//         Click Sound Playback
// -----------------------------------------
function playClick() {
  const clickSound = document.getElementById('click-sound');
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

// -----------------------------------------
//       Tap Effect + Ripple Animation
// -----------------------------------------
let tapImageIndex = 1;
const totalTapImages = 4;
let lastTapTime = 0;
const minTapInterval = 100; // throttle on mobile to prevent overload

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
//       Modal Mirror Interaction
// -----------------------------------------
const lighthousePortal = document.querySelector('.lighthouse-portal-zone');
const mirrorModal = document.getElementById('mirror-modal');
const passInput = document.getElementById('passphrase');
const mirrorResponse = document.getElementById('mirror-response');
const mirrorImage = document.getElementById('mirror-image');

if (lighthousePortal) {
  lighthousePortal.addEventListener('click', () => {
    mirrorModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    passInput.focus();
  });
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
//  Optional: Background Music Fade-In (Preserved)
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
