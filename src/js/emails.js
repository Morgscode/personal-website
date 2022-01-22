const { resolveContent } = require("nodemailer/lib/shared");

window.addEventListener("DOMContentLoaded", () => {
  const contactFormBtn = document.querySelector("#portfolioContactSubmit");
  if (contactFormBtn) {
    contactFormBtn.addEventListener("click", submitPortfolioContactForm);
  }
});

function enableSubmitButton(captchaResult) {
  if (captchaResult) {
    return (contactFormBtn.disabled = false);
    resolve();
  } else {
    reject();
  }
}

function submitPortfolioContactForm() {
  const form = document.querySelector("#portfolioContactForm");

  if (form && form.checkValidity()) {
    // fetch post
    const formDataJSON = convertFormDataToJson(form);
    console.log(window.location);
    const formRequest = fetch(
      `${window.location.origin}/.netlify/functions/sendMail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formDataJSON,
      }
    )
      .then((res) => {
        form.reset();
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}

function convertFormDataToJson(form) {
  const formData = new FormData(form);
  let postData = new Object();
  formData.forEach((value, key) => (postData[key] = value));
  delete postData["g-recaptcha-response"];
  const json = JSON.stringify(postData);
  return json;
}
