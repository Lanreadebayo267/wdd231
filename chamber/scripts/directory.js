// scripts/directory.js
gridBtn.setAttribute('aria-pressed', 'false');
listBtn.setAttribute('aria-pressed', 'true');



if (membershipFilter) {
  membershipFilter.addEventListener('change', (e) => {
	const value = e.target.value;
	if (value === 'all') {
	  displayMembers(allMembers);
	  displaySpotlights(allMembers);
	} else {
	  const level = Number(value);
	  const filtered = allMembers.filter((m) => Number(m.membershipLevel) === level);
	  displayMembers(filtered);
	  displaySpotlights(filtered);
	}
  });
}


// Mobile nav toggle
if (navToggle && mainNav) {
navToggle.addEventListener('click', () => {
mainNav.classList.toggle('open');
const expanded = navToggle.getAttribute('aria-expanded') === 'true';
navToggle.setAttribute('aria-expanded', String(!expanded));
});
}

// Add year and last modified
function applyPageMeta() {
const yearEl = document.getElementById('year');
const lastEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastEl) lastEl.textContent = document.lastModified || '—';
}


// Initialize
document.addEventListener('DOMContentLoaded', () => {
applyPageMeta();
wireUpControls();
loadMembers();
});