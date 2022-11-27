const projectAnimationModule = (function () {
  function animate() {
    const projectArticle = document.querySelectorAll('.personal-project');
    const projectSlides = document.querySelectorAll('.project-slide');
    const projectSlideShadows = document.querySelectorAll(
      '.project-slide__shadow'
    );

    if (projectSlides && projectSlideShadows) {
      projectSlides.forEach((element, index) => {
        const timeline = new TimelineMax();
        let triggerElement;
        let triggerHook;

        timeline.fromTo(element, 2, { y: '-25px' }, { y: 0 });
        timeline.fromTo(
          projectSlideShadows[index],
          2,
          { boxShadow: '0 10px 6px -6px #212121' },
          { boxShadow: '0 20px 12px -3px #000000' },
          '-=2'
        );

        if (window.width > 1200) {
          triggerElement = projectArticle[index];
          triggerHook = 0.25;
        } else if (window.innerWidth <= 1024 && window.innerWidth > 768) {
          triggerElement = projectArticle[index];
          triggerHook = 0.3;
        } else if (window.innerWidth <= 768 && window.innerWidth > 576) {
          triggerElement = projectArticle[index];
          triggerHook = 0.15;
        } else if (window.innerWidth <= 576) {
          triggerElement = element;
          triggerHook = 0.1;
        } else {
          triggerElement = projectArticle[index];
          triggerHook = 0.15;
        }

        let portfolioScene = new ScrollMagic.Scene({
          triggerElement: triggerElement,
          triggerHook: triggerHook,
          reverse: true,
        })
          .setTween(timeline)
          //.addIndicators({ name: "portolio-trigger" })
          .addTo(controller);

          portfolioScene.on('start', function(type, target, progress, state, scrollDirection) {
            this.reverse = false;
          });
    
          portfolioScene.on('end', function(type, target, progress, state, scrollDirection) {
            this.reverse = true;
          });

        return portfolioScene;
      });
    }
  }
  function attach() {
    window.addEventListener('DOMContentLoaded', animate);
  }
  return {attached: attach()}
})();
