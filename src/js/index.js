'use strict';

import '../scss/main.scss';
import { animate as cvAnimations } from './cvAnimations';
import { animate as projectAnimations } from './projectAnimations';
import { navigation } from './nav';
import { lazyLoadImages } from './lazyLoad';
import { contactForm } from './emails';

window.addEventListener('DOMContentLoaded', () => {
  navigation();
  lazyLoadImages();
  contactForm();
});

window.addEventListener('load', () => {
  cvAnimations();
  projectAnimations();
});
