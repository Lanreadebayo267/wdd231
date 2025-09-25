// directory.js - module

// Map membership number to label
function membershipLabel(level) {
  switch (level) {
    case 3: return "Gold";
    case 2: return "Silver";
    default: return "Member";
  }
}

// Fetch members.json and render
async function getMembers() {
  try {
    const resp = await fetch("data/members.json");
    if (!resp.ok) throw new Error(`HTTP error: ${resp.status}`);
    const members = await resp.json();
    displayMembers(members);
  } catch (err) {
    console.error("Failed to load members:", err);
    const container = document.getElementById("members-container");
    if (container) container.innerHTML = `<p class="error">Unable to load directory at this time.</p>`;
  }
}

function displayMembers(members) {
  const container = document.getElementById("members-container");
  if (!container) return;
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("article");
    card.className = "card";

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

// Grid/List toggle
function setGridView() {
  const container = document.getElementById("members-container");
  container.classList.add("grid");
  container.classList.remove("list");

  document.getElementById("grid-view").setAttribute("aria-pressed", "true");
  document.getElementById("list-view").setAttribute("aria-pressed", "false");
}

function setListView() {
  const container = document.getElementById("members-container");
  container.classList.add("list");
  container.classList.remove("grid");

  document.getElementById("grid-view").setAttribute("aria-pressed", "false");
  document.getElementById("list-view").setAttribute("aria-pressed", "true");
}


// Mobile nav toggle
function initMobileNav() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("hidden");
  });
}

// Footer info
function initFooter() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
}

// Init
function initUI() {
  document.getElementById("grid-view").addEventListener("click", setGridView);
  document.getElementById("list-view").addEventListener("click", setListView);
  setGridView(); // default
  initMobileNav();
  initFooter();
}

window.addEventListener("DOMContentLoaded", async () => {
  initUI();
  await getMembers();
});

