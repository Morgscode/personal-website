const cvAniamationModule = (function () {
  window.addEventListener('DOMContentLoaded', () => {
    // --------------- banner slider animations
    const firstSceneItems = document.querySelectorAll('.firstSceneItem');

    if (firstSceneItems) {
      let bannerTl = new TimelineMax();

      bannerTl
        .staggerFromTo(
          '.firstSceneItem',
          0.6,
          { x: '-50px', opacity: 0 },
          { x: '0%', opacity: 1, ease: Power2.easeOut },
          '0.15'
        )
        .staggerTo('.secondSceneItem', 0.2, { opacity: 1 }, '0.15', '-=0.15');

      bannerTl.delay(2);
    }

    const textStaggerItems = document.querySelectorAll('.textStagger1');

    if (textStaggerItems) {
      let textTween = new TimelineMax();

      textTween.staggerFromTo(
        '.textStagger1',
        0.6,
        { x: '-50px', opacity: 0 },
        { x: 0, opacity: 1, ease: Power2.easeOut },
        '0.2'
      );

      let aboutTextScene = new ScrollMagic.Scene({
        triggerElement: '#aboutSceneTrigger',
        triggerHook: 'onCenter',
        reverse: false,
      })
        .setTween(textTween)
        /*.addIndicators()*/
        .addTo(controller);
    }

    // ---------------- aboutTextStagger

    // -------------- skill badge pulse animations

    let pulseTl = new TimelineMax();
    pulseTl
      .to('#html5', 0.2, { scale: 1.3, ease: Back.easeOut.config(1.7) })
      .to('#html5', 0.2, { scale: 1, ease: Back.easeOut.config(1.7) })
      .to(
        '#css3',
        0.2,
        { scale: 1.3, ease: Back.easeOut.config(1.7) },
        '-=0.15'
      )
      .to('#css3', 0.2, { scale: 1, ease: Back.easeOut.config(1.7) })
      .to('#WP', 0.2, { scale: 1.3, ease: Back.easeOut.config(1.7) }, '-=0.15')
      .to('#WP', 0.2, { scale: 1, ease: Back.easeOut.config(1.7) });

    setInterval(() => {
      pulseTl.restart();
    }, 3000);

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
          '0.15'
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

    function textWrap(el) {
      // split heading into words
      const elArray = el.innerText.split(' ');
      // map words into characters
      const wrappedWords = elArray.map((word, wordIndex) => {
        // split each word into a char array
        const chars = word.split('');
        // wrap each character into a span
        const wrappedChars = chars.map((char, chardIndex) => `<span>${char}</span>`);
        // rejoin chards into a word and return
        return wrappedChars.join('');
      });
      // rejoin headings
      el.innerHTML = wrappedWords.join(' ');
      return el;
    } 

    const headings = document.querySelectorAll(
      '.heading__primary:not(.anim-false), .heading__secondary:not(.anim-false)'
    );

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
        '-=0.025'
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
  });
})();
