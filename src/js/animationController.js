import * as ScrollMagic from 'scrollmagic';
import { TimelineMax, TweenMax } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

export const controller = new ScrollMagic.Controller();
