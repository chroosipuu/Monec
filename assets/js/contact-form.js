class FormContact {
  form;
  formContainer;
  button;
  emailSecureToken = "75c17f75-91b3-4233-9a7c-1dff913a89ff";
  fromSend;
  email = "getintouch@monec.com";
  constructor(query, fromSend) {
    this.formContainer = document.querySelector(query);
    this.form = document.querySelector(query + " form");
    this.button = document.querySelector(query + " form button");
    this.info = document.querySelector(query + " .info");
    this.fromSend = fromSend;
    this.init();
  }

  init() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData(this.form);
        const value = formData.get("contact").trim();
        const lang = document.querySelector("html").getAttribute("lang") ?? "en-EN";
        const isValid = this.validateContact(value);
        if (isValid) {
          const ip = await this.getIp();
          console.log("ip", ip);
          if (isValid === "email") {
            const body = {
              email: value,
              language: lang,
              formSend: this.fromSend,
              ipAddress: ip,
            };
            const signature = this.createEmailSignature(body);
            this.sendEmail(signature);
            console.log("signature", signature);
          } else if (isValid === "phone") {
            const validNumber = value.startsWith("00") ? "+" + value.slice(2) : value;
            const countryNumber = this.getCountryFromPhoneNumber(validNumber);
            const body = {
              phone: value,
              phoneCountry: countryNumber,
              language: lang,
              formSend: this.fromSend,
              ipAddress: ip,
            };
            const signature = this.createEmailSignature(body);

            this.sendEmail(signature);
            console.log("signature", signature);
          } else {
            return this.addError();
          }
        } else {
          return this.addError();
        }
      } catch (error) {
        console.log(error);
        return this.addError();
      } finally {
        this.removeLoading();
      }
    });
  }

  validateContact(contact) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const spanishRegex = /^(6|7|8|9)(?:\s*\d){8}$/;
    const internationalRegex = /^(00|\+)(?:\s*\d\s*){1,3}\d(?:\s*\d){8}$/;
    if (emailRegex.test(contact)) {
      return "email";
    } else if (spanishRegex.test(contact) || internationalRegex.test(contact)) {
      return "phone";
    }
    return false;
  }
  createEmailSignature(data) {
    let signature = "<table>";
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        signature += `<tr><td><b>${key}</b></td><td>${data[key]}</td></tr>`;
      }
    }
    signature += "</table>";
    return signature;
  }
  addSuccess() {
    this.formContainer.classList.remove("error");
    this.formContainer.classList.add("success");
  }
  addError() {
    this.formContainer.classList.add("error");
    this.formContainer.classList.remove("success");
  }
  addLoading() {
    this.button.disabled = true;
    this.formContainer.classList.add("loading");
  }
  removeLoading() {
    setTimeout(() => {
      this.button.disabled = false;
      this.formContainer.classList.remove("loading");
    }, 200);
  }
  async sendEmail(body) {
    Email.send({
      SecureToken: this.emailSecureToken,
      From: this.email,
      To: this.email,
      Subject: "Contact from Monec website",
      Body: body,
    })
      .then((message) => {
        if (message === "OK") {
          this.addSuccess();
          console.log(message);
        } else {
          this.addError();
        }
      })
      .catch(() => this.addError());
  }
  async getIp() {
    try {
      const data = await fetch(`https://api.ipdata.co?api-key=${this.ipKey}&fields=ip`).then(
        (res) => res.json()
      );
      return data.ip ?? "unknown";
    } catch (error) {
      return "unknown";
    }
  }
  getCountryFromPhoneNumber(phoneNumber) {
    try {
      const parsedPhoneNumber = new libphonenumber.parsePhoneNumber(phoneNumber, "ES");

      if (parsedPhoneNumber) {
        return parsedPhoneNumber.country;
      } else {
        return "Unknown";
      }
    } catch (error) {
      return "Unknown";
    }
  }
}
