/* ZETA TO ZION — Background switcher + basics */

const $ = (sel, ctx = document) => ctx.querySelector(sel);

document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // Nav toggle
  const menuBtn = $('.menu-toggle');
  const nav = $('#site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // Audio toggle
  const audio = $('#ambient');
  const audioBtn = $('#audioToggle');
  if (audio && audioBtn) {
    let enabled = false;
    audioBtn.addEventListener('click', async () => {
      try {
        if (!enabled) {
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
        console.warn('Audio play was blocked until user interaction.', e);
      }
    });
  }

  // Secret portal
  const hotspot = $('#portalHotspot');
  if (hotspot) {
    hotspot.addEventListener('click', () => {
      const pass = prompt('Enter passphrase:');
      const ok = (pass || '').trim().toLowerCase() === 'nagata zero'; // TODO: change
      if (ok) window.location.href = '/secret/index.html';
      else if (pass !== null) alert('That passphrase isn’t recognized.');
    });
  }

  // Background switching
  const bg = document.querySelector('.bg');
  const heroClass = (key) => `hero-${key}`;
  const validKeys = new Set([
    'home','mathematics','biodome','gundam','infrastructure',
    'poetry','resume','events','shop','links'
  ]);

  // Jump-to on hash change (also sets bg)
  const applyForHash = () => {
    const id = (location.hash || '#home').slice(1);
    if (validKeys.has(id) && bg) {
      // remove any previous hero-* class
      bg.className = `bg ${heroClass(id)}`;
    }
  };
  window.addEventListener('hashchange', applyForHash);
  applyForHash();

  // Scroll-based update (the one most in view wins)
  const sections = [...document.querySelectorAll('section[data-hero]')];
  if (bg && 'IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      // pick the entry with highest intersectionRatio
      const top = entries.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
      const key = top?.target?.dataset?.hero;
      if (key && validKeys.has(key)) {
        bg.className = `bg ${heroClass(key)}`;
      }
    }, { root: null, threshold: [0.3, 0.6, 0.9] });
    sections.forEach(s => io.observe(s));
  }

  // Optional click sfx (hook up when you add a file)
  document.querySelectorAll('[data-sfx]').forEach((el) => {
    el.addEventListener('click', () => {
      // const click = new Audio('/assets/audio/click.mp3'); click.play();
    });
  });
});