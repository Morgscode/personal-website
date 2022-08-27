const lazyLoadModule = (function () {
  function lazyLoadImages(elements) {
    elements.forEach((image) => {
      if (image.intersectionRatio > 0) {
        image.target.src = image.target.dataset.src;
        image.target.classList.add('visible');
        observer.unobserve(image.target);
      }
    });
  }
  const observer = new IntersectionObserver(lazyLoadImages, {
    rootMargin: '100px',
    threshold: 0,
  });

  function attach() {
    let attached = false;
    window.addEventListener('DOMContentLoaded', () => {
      let documentImages = document.querySelectorAll('img.lazyloaded');
      if (documentImages.length > 0) {
        attached = true;
        documentImages.forEach((img) => {
          observer.observe(img);
        });
      }
    });
    return attached;
  }

  return {attached: attach(), observer, lazyLoadImages}
  
})();
