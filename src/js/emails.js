window.addEventListener("DOMContentLoaded", () => {
  const contactFormBtn = document.querySelector("#portfolioContactSubmit");

  if (contactFormBtn) {
    contactFormBtn.addEventListener("click", submitPortfolioContactForm);
  }
});

function enableSubmitButton() {
  return (contactFormBtn.disabled = false);
}

function submitPortfolioContactForm(event) {
  const form = document.querySelector("#portfolioContactForm");
  const user_id = "user_YHcDmhol6iTgqix2MNQO3";
  const service_id = "portfolio_contact_form";
  const template_id = "landing_site_contact_form_submission";

  if (form && form.checkValidity()) {
    emailjs.init(user_id);

    emailjs.sendForm(service_id, template_id, form).then(
      (response) => {
        if (response.status == 200) {
          contactFormBtn.disabled = true;
          form.reset();
        }
      },
      (error) => {
        alert(
          "there was a problem sending your message through the contact form, try again"
        );
        contactFormBtn.disabled = false;
      }
    );
  } else {
    alert("Please ensure all form fields are valid before submitting...");
  }
}

function convertFormDataToJson(form) {
  const formData = new FormData(form);
  let postData = new Object();
  formData.forEach((value, key) => (postData[key] = value));
  const json = JSON.stringify(postData);
  return json;
}
