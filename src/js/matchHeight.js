const matchHeightModule = (function () {
  function matchHeight(selector) {
    // lets grab all the elements with the selector arg
    let elements = document.querySelectorAll(selector);
    // lets store the tallest element of the array
    let tallestElement = 0;
    elements.forEach((el) => {
      // for each element, lets grab its offset hight (padding, margin, border and content)
      const elementHeight = el.offsetHeight;
      // is the current element offset height larger than the tallest element so far?
      elementHeight > tallestElement
        ? (tallestElement = elementHeight)
        : (tallestElement = tallestElement);
    });
    elements.forEach((el) => {
      // once we have the tallest element, lets iterate over the array again and set the height
      return (el.style.height = `${tallestElement}px`);
    });
  }

  function attach() {
    let attached = false;
    window.addEventListener('load', () => {
      attached = true;
      if (window.innerWidth >= 768) {
        matchHeight('.panel');
      }
    });
    return attached;
  }

  return { matchHeight, attached: attach() };
})();
