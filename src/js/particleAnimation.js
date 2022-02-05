window.addEventListener("DOMContentLoaded", () => {
  const particleDiv = document.querySelector("#particles-js");
  if (particleDiv) {
    particlesJS.load("particles-js", "./dist/resources/particles.json");
  }
});
