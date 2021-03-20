// javascript of navbar and footer
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
// const links = document.querySelectorAll(".nav-links li");
const logout = document.getElementById("logout");

hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");

  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});
