const emailModule = (function() {

  function submitPortfolioContactForm() {
    contactFormBtn.disabled = true;
    const form = document.querySelector("#portfolioContactForm");
  
    if (form && form.checkValidity()) {
      // fetch post
      const formDataJSON = convertFormDataToJson(form);
      const formRequest = fetch(
        `${window.location.origin}/.netlify/functions/sendMail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: formDataJSON,
        }
      );
      formRequest.then((res) => {
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
    const json = JSON.stringify(postData);
    return json;
  }

  function attach() {
    let attached = false;
    window.addEventListener("DOMContentLoaded", () => {
      const contactFormBtn = document.querySelector("#portfolioContactSubmit");
      if (contactFormBtn) {
        contactFormBtn.addEventListener("click", submitPortfolioContactForm);
        attached = true;
      } 
    });
    return attached;
  }

  return {submitPortfolioContactForm, convertFormDataToJson, attached: attach()}
})();




