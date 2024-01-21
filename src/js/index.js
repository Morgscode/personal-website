'use strict';

import { animate as cvAnimations } from './cvAnimations';
import { animate as projectAnimations } from './projectAnimations';
import { navigation } from './nav';
import { contactForm } from './emails';
import '@/scss/main.scss';

window.addEventListener('DOMContentLoaded', () => {
  navigation();
  contactForm();
});

window.addEventListener('load', () => {
  cvAnimations();
  projectAnimations();
});
