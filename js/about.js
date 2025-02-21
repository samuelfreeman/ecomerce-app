const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links-group");
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});
