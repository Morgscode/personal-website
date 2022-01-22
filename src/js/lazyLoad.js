window.addEventListener("load", () => {
  let documentImages = document.querySelectorAll("img.lazyloaded");

  function lazyLoadImages(elements) {
    elements.forEach((image) => {
      if (image.intersectionRatio > 0) {
        image.target.src = image.target.dataset.src;
        image.target.classList.add("visible"); 
        observer.unobserve(image.target);
      }
    });
  }

  const observer = new IntersectionObserver(lazyLoadImages, {
    rootMargin: "100px",
    threshold: 0,
  });

  documentImages.forEach((img) => {
    observer.observe(img);
  });
});
