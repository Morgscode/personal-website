const nav = document.querySelector('.nav__container');
const navBtn = document.querySelector('.nav__button');
const navCloseBtn = document.querySelector('.nav__close');

const activateNav = () => {
  nav.classList.add('nav__active');
};
const hideNav = () => {
  nav.classList.remove('nav__active');
};

export function navigation() {
  navBtn.addEventListener('click', activateNav);
  navCloseBtn.addEventListener('click', hideNav);
}
