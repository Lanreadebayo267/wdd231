// main.js (ES module)
export function initMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('hidden');
  });
}

export function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

export function showLastVisitMessage(targetId = 'visit-message') {
  const el = document.getElementById(targetId);
  if (!el) return;
  const last = localStorage.getItem('greenplate-lastvisit');
  const now = Date.now();
  if (!last) {
    el.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - Number(last)) / (1000 * 60 * 60 * 24));
    if (days < 1) el.textContent = "Back so soon! Awesome!";
    else if (days === 1) el.textContent = "You last visited 1 day ago.";
    else el.textContent = `You last visited ${days} days ago.`;
  }
  localStorage.setItem('greenplate-lastvisit', String(now));
}

// Auto-run small init when script loaded in pages
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  setFooterYear();
  showLastVisitMessage();
});
