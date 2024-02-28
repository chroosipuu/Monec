const header = document.querySelector(".header");
let lastScrollY = 0;

window.addEventListener("scroll", () => {
  header.classList.toggle("hide", window.scrollY > 50 && window.scrollY > lastScrollY);
  header.classList.toggle("st", window.scrollY > 50);
  lastScrollY = window.scrollY;
});
