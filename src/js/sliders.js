const sliderModule = (function () {
  const portfolioSliderOptions = {
    type: 'loop',
    autoplay: true,
    interval: 6000,
    speed: 2500,
    arrows: false,
    pagination: false,
    pauseOnHover: false,
    gap: 0,
  };

  function attach() {
    window.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('.portfolio-splide')) {
        const portfolioSlider = new Splide(
          '.portfolio-splide',
          portfolioSliderOptions,
        );
        portfolioSlider.mount();
      }
    });
  }
  return { attached: attach() };
})();
