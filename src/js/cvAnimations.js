const cvAniamationModule = (function () {
  function textWrap(el) {
    // split heading into words
    const elArray = el.innerText.split(' ');
    // map words into characters
    const wrappedWords = elArray.map((word, wordIndex) => {
      // split each word into a char array
      const chars = word.split('');
      // wrap each character into a span
      const wrappedChars = chars.map(
        (char, chardIndex) => `<span>${char}</span>`,
      );
      // rejoin chards into a word and return
      return wrappedChars.join('');
    });
    // rejoin headings
    el.innerHTML = wrappedWords.join(' ');
    return el;
  }

  function animate() {
    // --------------- banner slider animations
    const firstSceneItems = document.querySelectorAll('.firstSceneItem');

    if (firstSceneItems) {
      let bannerTl = new TimelineMax();

      bannerTl
        .staggerFromTo(
          '.firstSceneItem',
          0.6,
          { x: '-50px', opacity: 0 },
          { x: '15px', opacity: 1, ease: Power2.easeInOut },
          '0.1',
        )
        .staggerFromTo(
          '.firstSceneItem',
          0.6,
          { x: '15px' },
          { x: 0, ease: Power1.easeInOut },
          '0.1',
          '-=0.1',
        );

      bannerTl.delay(1);
    }

    // ---------------- aboutTextStagger

    const textStaggerItems = document.querySelectorAll('.textStagger1');

    if (textStaggerItems) {
      let textTl = new TimelineMax();

      textTl
        .staggerFromTo(
          '.textStagger1',
          0.6,
          { x: '-30px', opacity: 0 },
          { x: '30px', opacity: 1, scale: 1.1, ease: Power2.easeInOut },
          '0.1',
        )
        .staggerFromTo(
          '.textStagger1',
          0.6,
          { x: '30px', scale: 1.1 },
          { x: 0, scale: 1, ease: Power2.easeInOut },
          '0.1',
          '-=0.2',
        );

      let aboutTextScene = new ScrollMagic.Scene({
        triggerElement: '#aboutSceneTrigger',
        triggerHook: 'onCenter',
        reverse: false,
      })
        .setTween(textTl)
        /*.addIndicators()*/
        .addTo(controller);
    }

    // -------------- skill badge pulse animations
    let pulseTl = new TimelineMax({ repeat: -1, yoyo: true });
    pulseTl
      .staggerFromTo(
        '.about__skillBadges .skill-badge',
        3,
        { scale: 1, y: '+15px' },
        { scale: 1.4, y: '-15px', ease: Power2.easeInOut },
        '.5',
      )
      .staggerFromTo(
        '.about__skill-badges .skill-badge',
        3,
        { scale: 1.4, y: '-15px' },
        { scale: 1, y: '+15px', ease: Power2.easeInOut },
        '.5',
        '-=3',
      );

    // ------------------ work history slide animtaions

    const pinContainer = document.querySelector('#pinContainer');

    if (pinContainer && window.innerWidth >= 768) {
      // init
      // define movement of panels
      var wexWipes = new TimelineMax();

      wexWipes
        .to('#slideContainer', 1, { x: '-25%' }) // animate to second panel
        .to('#slideContainer', 1, { x: '-50%' }) // animate to third panel
        .to('#slideContainer', 1, { x: '-75%' }); // animate to fourth panel

      // create pin and link animation
      new ScrollMagic.Scene({
        triggerElement: '#pinContainer',
        triggerHook: 'onLeave',
        duration: '400%',
      })
        .setPin('#pinContainer')
        .setTween(wexWipes)
        .addTo(controller);
    }

    //---------- skill col animations

    const skillCols = document.querySelectorAll('.skill-col');

    if (skillCols) {
      skillCols.forEach((element) => {
        const skillColTween = TweenMax.fromTo(
          element,
          1,
          {
            y: '50px',
            opacity: 0,
            scale: 0.8,
            boxShadow: 0,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            boxShadow: '20px 20px 60px #d4d4d4, -20px -20px 60px #ffffff;',
            ease: Power2.easeOut,
          },
          '0.15',
        );

        new ScrollMagic.Scene({
          triggerElement: element,
          triggerHook: 0.7,
          reverse: true,
        })
          .setTween(skillColTween)
          //.addIndicators({ name: "skill-col-trigger" })
          .addTo(controller);
      });
    }

    const headings = document.querySelectorAll(
      '.heading__primary:not(.anim-false), .heading__secondary:not(.anim-false)',
    );

    if (window.innerWidth >= 576) {
      headings.forEach((heading, headingIndex) => {
        heading = textWrap(heading);
        const spans = heading.querySelectorAll('span');
        const tl = new TimelineMax();
        tl.staggerFromTo(
          spans,
          0.35,
          { y: 20, x: 20, opacity: 0 },
          { y: 0, x: 0, opacity: 1, ease: Power2.easeOut },
          '0.05',
          '-=0.025',
        );

        new ScrollMagic.Scene({
          triggerElement: heading,
          triggerHook: 0.7,
          reverse: false,
        })
          .setTween(tl)
          //.addIndicators({ name: "text-in-trigger" })
          .addTo(controller);
      });
    }
  }

  function attach() {
    window.addEventListener('DOMContentLoaded', animate);
    return true;
  }

  return {
    textWrap,
    animate,
    attached: attach(),
  };
})();
