document.addEventListener("DOMContentLoaded", () => {
  // ===== Last Visit Message =====
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("last-visit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSince < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysSince === 1) {
      visitMessage.textContent = `You last visited 1 day ago.`;
    } else {
      visitMessage.textContent = `You last visited ${daysSince} days ago.`;
    }
  }
  localStorage.setItem("last-visit", now);

  // ===== Load Discover Data =====
  fetch("data/discover.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("discover-grid");
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("discover-card");

        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button class="learn-more">Learn More</button>
        `;

        grid.appendChild(card);
      });
    });

  // ===== Footer Year =====
  document.getElementById("year").textContent = new Date().getFullYear();

  // ===== Mobile Menu =====
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
});
