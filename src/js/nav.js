window.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav__container");
  const navBtn = document.querySelector(".nav__button");
  const navCloseBtn = document.querySelector(".nav__close");

  let activateNav = () => {
    nav.classList.add("nav__active");
  };

  let hideNav = () => {
    nav.classList.remove("nav__active");
  };

  navBtn.addEventListener("click", activateNav);
  navCloseBtn.addEventListener("click", hideNav);
});
