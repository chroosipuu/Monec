document.addEventListener("DOMContentLoaded", () => {
  const imageList = document.querySelectorAll(".images .images-item");
  const navItems = document.querySelectorAll(".nav div");
  const blockList = document.querySelectorAll(".block");
  const logoList = document.querySelectorAll(".logo");
  const anchorList = document.querySelectorAll(".anchor");
  const blockContainer = document.querySelector(".b-con-j");
  const header = document.querySelector(".header");
  const slContainer = document.querySelector(".sl-container");
  const slVh = document.querySelector(".sl-vh");
  const blockButtonList = document.querySelectorAll(".scroll-to-last-slide-trigger");
  let lastScrollY = 0;
  let currentIndex = 0;
  let inSlider = true;
  const lenis = new Lenis({
    smoothWheel: true,
    wheelMultiplier: 0.4,
    touchInertiaMultiplier: 7,
    touchMultiplier: 0.8,
    syncTouch: true,
    smoothTouch: true,
    normalizeWheel: true,
    lerp: 0,
  });

  const hash = window.location.hash;
  if (hash && hash === "#last-slide-form") {
    blockList[blockList.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
  }
  blockButtonList.forEach((b) => {
    b.addEventListener("click", () => {
      blockList[blockList.length - 1].scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
  logoList.forEach((item) => {
    item.addEventListener("click", () => {
      lenis.scrollTo(0, {
        duration: 0,
      });
    });
  });
  anchorList.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      lenis.scrollTo(href, {
        offset: -header.clientHeight,
        duration: 0,
      });
    });
  });
  navItems.forEach((nav, index) => {
    nav.addEventListener("click", () => {
      blockList[index].scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  lenis.on("scroll", (e) => {
    if (lastScrollY !== window.scrollY) {
      const activeIndex = Math.min(Math.round(window.scrollY / blockList[0].clientHeight), 5);
      const slideEnd = window.scrollY + slVh.clientHeight > blockContainer.clientHeight;

      const isAvailableHideHeader =
        window.scrollY + slVh.clientHeight - header.clientHeight > blockContainer.clientHeight;
      if (activeIndex !== currentIndex) {
        handleIndex(activeIndex);
      }
      header.classList.toggle("st", isAvailableHideHeader);
      slContainer.classList.toggle("last", slideEnd);
      header.classList.toggle("hide", window.scrollY > lastScrollY && slideEnd);
      if (!slideEnd !== inSlider) {
        if (slideEnd) {
          e.options.smoothWheel = false;
          e.options.syncTouch = false;
          e.options.smoothTouch = false;
        } else {
          e.options.smoothWheel = true;
          e.options.syncTouch = true;
          e.options.smoothTouch = true;
        }
      }

      currentIndex = activeIndex;
      inSlider = !slideEnd;

      lastScrollY = window.scrollY;
    }
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  window.dispatchEvent(new Event("scroll"));
  function handleIndex(currentIndex) {
    imageList.forEach((img, index) => {
      img.classList.toggle("active", currentIndex >= index);
    });

    blockList.forEach((block, index) => {
      block.classList.toggle("active", index === currentIndex);
    });

    navItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });
  }
  requestAnimationFrame(raf);
});
function flipCard() {
  const card = document.querySelector(".card");
  if (window.innerWidth >= 1024) {
    card.classList.toggle("flipped");
  }
}
