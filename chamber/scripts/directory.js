// directory.js - module

// Utility: map membership number to label
function membershipLabel(level) {
  switch (level) {
    case 3:
      return 'Gold';
    case 2:
      return 'Silver';
    default:
      return 'Member';
  }
}

// Async fetch members.json and render
async function getMembers() {
  try {
    const resp = await fetch('data/members.json');
    if (!resp.ok) throw new Error(`Network response was not ok: ${resp.status}`);
    const members = await resp.json();
    displayMembers(members);
  } catch (err) {
    console.error('Failed to load members:', err);
    const container = document.getElementById('members-container');
    if (container) container.innerHTML = `<p class="error">Unable to load directory at this time.</p>`;
  }
}

function displayMembers(members) {
  const container = document.getElementById('members-container');
  if (!container) return;
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <div class="logo-wrap">
        <img src="images/${member.image}" alt="${member.name} logo" width="96" height="96">
      </div>
      <div class="card-body">
        <h2>${member.name}</h2>
        <p class="muted">${member.address}</p>
        <p class="muted">📞 ${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        <p class="muted"><strong>Level:</strong> ${membershipLabel(member.membership)}</p>
        <p class="muted">${member.info}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// Toggle grid/list view
function setGridView() {
  const container = document.getElementById('members-container');
  if (!container) return;
  container.classList.add('grid');
  container.classList.remove('list');
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  if (gridBtn) gridBtn.setAttribute('aria-pressed', 'true');
  if (listBtn) listBtn.setAttribute('aria-pressed', 'false');
}

function setListView() {
  const container = document.getElementById('members-container');
  if (!container) return;
  container.classList.add('list');
  container.classList.remove('grid');
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  if (gridBtn) gridBtn.setAttribute('aria-pressed', 'false');
  if (listBtn) listBtn.setAttribute('aria-pressed', 'true');
}

// Mobile nav toggle
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!menuToggle || !navLinks) return;
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('hidden');
  });
}

// Footer year + last modified
function initFooter() {
  const yearEl = document.getElementById('year');
  const lastModifiedEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModifiedEl) {
    const lm = document.lastModified ? new Date(document.lastModified) : new Date();
    lastModifiedEl.textContent = lm.toLocaleString();
  }
}

// Wire up UI
function initUI() {
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');
  if (gridBtn) gridBtn.addEventListener('click', setGridView);
  if (listBtn) listBtn.addEventListener('click', setListView);

  // default to grid
  setGridView();

  initMobileNav();
  initFooter();
}

// Start
window.addEventListener('DOMContentLoaded', async () => {
  initUI();
  await getMembers();
});
// End of directory.js