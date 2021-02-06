window.addEventListener("load", () => {
  if (document.querySelector(".portfolio-splide")) {
    const portfolioSliderOptions = {
      type: "loop",
      autoplay: true,
      interval: 6000,
      speed: 2500,
      arrows: false,
      pagination: false,
      pauseOnHover: false,
      gap: 0,
    };

    let portfolioSlider = new Splide(
      ".portfolio-splide",
      portfolioSliderOptions
    );

    portfolioSlider.mount();

    const wexSliderOptions = {
      type: "loop",
      autoplay: true,
      interval: 6000,
      speed: 3500,
      gap: 0,
    };

    let wexSliders = document.querySelectorAll(".wex-splide");

    wexSliders.forEach((slider) => {
      new Splide(slider, wexSliderOptions).mount();
    });
  }

  if (document.querySelector(".projects-splide")) {
    const projectSliderOptions = {
      type: "loop",
      autoplay: false,
      speed: 3500,
      gap: 0,
    };

    const projectSlider = new Splide(".projects-splide", projectSliderOptions);

    projectSlider.mount();
  }
});
