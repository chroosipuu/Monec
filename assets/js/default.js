class Menu {
  burger = document.querySelector(".burger");
  headerContainer = document.querySelector(".header-content-mobile");
  linkList = document.querySelectorAll(".shown-menu a");
  isOpen = false;
  constructor() {
    this.init();
  }
  init() {
    this.linkList.forEach((item) => {
      item.addEventListener("click", () => {
        this.isOpen = false;
        this.headerContainer.classList.remove("show");
        document.body.style.overflow = "visible";
      });
    });
    this.burger.addEventListener("click", () => {
      if (this.isOpen) {
        this.isOpen = false;
        this.headerContainer.classList.remove("show");
        document.body.style.overflow = "visible";
      } else {
        this.isOpen = true;
        document.body.style.overflow = "hidden";
        this.headerContainer.classList.add("show");
      }
    });
  }
}
class Lang {
  lang;
  langCurrent;
  langOptions;
  isOpen = false;
  outsideClickHandler;
  constructor(query) {
    this.lang = document.querySelector(query);
    this.langButton = document.querySelector(query + "-current");
    this.langOptions = document.querySelector(query + "-options");
    this.init();
  }
  init() {
    this.langButton.addEventListener("click", () => {
      if (this.isOpen) {
        this.lang.classList.remove("show");
        this.isOpen = false;
        window.removeEventListener("click", this.outsideClickHandler);
      } else {
        this.lang.classList.add("show");
        this.isOpen = true;
        this.outsideClickHandler = this.outsideClick.bind(this);
        window.addEventListener("click", this.outsideClickHandler);
      }
    });
  }
  outsideClick(event) {
    if (!this.lang.contains(event.target)) {
      this.isOpen = false;
      this.lang.classList.remove("show");
      window.removeEventListener("click", this.outsideClickHandler);
    }
  }
}
const menu = new Menu();

const desktopLang = new Lang(".lcd");
const mobileLang = new Lang(".lcm");

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
