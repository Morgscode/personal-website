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
      "https://www.luke-morgan.com/.netlify/functions/sendMail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cors: "no-cors",
        },
        body: formDataJSON,
      }
    );

    formRequest
      .then((res) => {
        console.log(res);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        alert("there was a problem submitting your contact form");
      });
  }
}

function convertFormDataToJson(form) {
  const formData = new FormData(form);
  let postData = new Object();
  formData.forEach((value, key) => (postData[key] = value));
  const json = JSON.stringify(postData);
  return json;
}
