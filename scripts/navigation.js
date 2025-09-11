// Mobile navigation toggle with aria-expanded
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu");
  const nav = document.getElementById("site-nav");

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    // optional: focus first link inside nav when opened
    if (isOpen) {
      const firstLink = nav.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  });
});
