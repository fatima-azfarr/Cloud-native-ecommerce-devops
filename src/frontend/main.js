// ShopFlow — Main JS
// Highlight active nav link based on current page
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});