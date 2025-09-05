// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav");

  menuButton.addEventListener("click", () => {
    nav.style.display = nav.style.display === "block" ? "none" : "block";
  });
});
