window.addEventListener("load", () => {
  const particleDiv = document.querySelector("#particles-js");
  if (particleDiv) {
    particlesJS.load("particles-js", "./dist/resources/particles.json");
  }
});
