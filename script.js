/* -----------------------------------------
   ZETA TO ZION • Base Script
------------------------------------------ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Nav toggle (mobile)
  const menuBtn = $('.menu-toggle');
  const nav = $('#site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // Audio toggle (off by default)
  const audio = $('#ambient');
  const audioBtn = $('#audioToggle');
  if (audio && audioBtn) {
    let enabled = false;
    audioBtn.addEventListener('click', async () => {
      try {
        if (!enabled) {
          // Start playing
          await audio.play();
          enabled = true;
          audioBtn.textContent = 'Disable ambient audio';
          audioBtn.setAttribute('aria-pressed', 'true');
        } else {
          audio.pause();
          enabled = false;
          audioBtn.textContent = 'Enable ambient audio';
          audioBtn.setAttribute('aria-pressed', 'false');
        }
      } catch (e) {
        console.warn('Audio play was blocked by the browser until user interaction.', e);
      }
    });
  }

  // Secret portal hotspot
  const hotspot = $('#portalHotspot');
  if (hotspot) {
    hotspot.addEventListener('click', () => {
      const pass = prompt('Enter passphrase:');
      // TODO: change this placeholder to your real phrase
      const ok = (pass || '').trim().toLowerCase() === 'nagata zero';
      if (ok) {
        // Replace with your actual secret route/page when ready
        window.location.href = '/secret/index.html';
      } else if (pass !== null) {
        alert('That passphrase isn’t recognized.');
      }
    });
  }

  // Optional: lightweight click sfx hook (wire when you add a file)
  document.querySelectorAll('[data-sfx]').forEach((el) => {
    el.addEventListener('click', () => {
      // const click = new Audio('/assets/audio/click.mp3'); click.play();
    });
  });
});