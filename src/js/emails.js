window.addEventListener("DOMContentLoaded", () => {
  const contactFormBtn = document.querySelector("#portfolioContactSubmit");
  if (contactFormBtn) {
    contactFormBtn.addEventListener("click", submitPortfolioContactForm);
  }
});

function enableSubmitButton() {
  return (contactFormBtn.disabled = false);
}

function submitPortfolioContactForm() {
  const form = document.querySelector("#portfolioContactForm");

  if (form && form.checkValidity()) {
    // fetch post

    const formDataJSON = convertFormDataToJson(form);
    const formRequest = fetch(
      "https://luke-morgan.com/.netlify/functions/sendMail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formDataJSON,
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}

function convertFormDataToJson(form) {
  const formData = new FormData(form);
  let postData = new Object();
  formData.forEach((value, key) => (postData[key] = value));
  console.log(postData);
  delete postData["g_recaptcha"];
  console.log(postData);
  const json = JSON.stringify(postData);
  return json;
}
