window.addEventListener("DOMContentLoaded", () => {
  const contactFormBtn = document.querySelector("#portfolioContactSubmit");
  if (contactFormBtn) {
    contactFormBtn.addEventListener("click", submitPortfolioContactForm);
  }
});

function enableSubmitButton() {
  return (contactFormBtn.disabled = false);
}

async function submitPortfolioContactForm() {
  const form = document.querySelector("#portfolioContactForm");

  if (form && form.checkValidity()) {
    // fetch post

    const formDataJSON = convertFormDataToJson(form);
    const formRequest = await fetch(
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
  console.log(formData);
  delete formData["g_recaptcha"];
  console.log(formData);
  const json = JSON.stringify(postData);
  return json;
}
