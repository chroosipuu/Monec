class FormLogin {
  form = document.querySelector(".login-form");
  formErrorMessage = document.querySelector(".error-message");
  lang;
  constructor(lang = "EN") {
    this.init();
    this.lang = lang;
  }
  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const library = {
        ES: "Nombre de usuario o contraseña incorrectos",
        EN: "Wrong Username or Password",
      };
      const formData = new FormData(this.form);
      const isError = true;
      if (isError) {
        this.form.classList.add("error");
        this.formErrorMessage.textContent = library[this.lang];
      }
    });
  }
}
