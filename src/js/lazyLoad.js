function observerCallback(elements) {
  elements.forEach((image) => {
    if (image.intersectionRatio > 0) {
      image.target.src = image.target.dataset.src;
      setTimeout(function () {
        image.target.classList.add('visible');
      }, 300);
      observer.unobserve(image.target);
    }
  });
}

const observer = new IntersectionObserver(observerCallback);

export function lazyLoadImages() {
  let documentImages = document.querySelectorAll('img.lazyloaded');
  if (documentImages.length > 0) {
    documentImages.forEach((img) => {
      observer.observe(img);
    });
  }
}
