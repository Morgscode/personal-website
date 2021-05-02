window.addEventListener("DOMContentLoaded", () => {
  // instantiate controller
  const controller = new ScrollMagic.Controller();
  // --------------- banner slider animations

  const firstSceneItems = document.querySelectorAll(".firstSceneItem");

  if (firstSceneItems) {
    let bannerTl = new TimelineMax();

    bannerTl
      .staggerFromTo(
        ".firstSceneItem",
        0.6,
        { x: "-50px", opacity: 0 },
        { x: "0%", opacity: 1 },
        "0.15"
      )
      .staggerTo(".secondSceneItem", 0.2, { opacity: 1 }, "0.15", "-=0.15");

    bannerTl.delay(2);
  }

  const textStaggerItems = document.querySelectorAll(".textStagger1");

  if (textStaggerItems) {
    let textTween = new TimelineMax();

    textTween.staggerFromTo(
      ".textStagger1",
      0.6,
      { x: "-50px", opacity: 0 },
      { x: 0, opacity: 1, ease: "power3" },
      "0.15"
    );

    let aboutTextScene = new ScrollMagic.Scene({
      triggerElement: "#aboutSceneTrigger",
      triggerHook: "onCenter",
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
    .to("#html5", 0.2, { scale: 1.3 })
    .to("#html5", 0.2, { scale: 1 })
    .to("#css3", 0.2, { scale: 1.3 }, "-=0.15")
    .to("#css3", 0.2, { scale: 1 })
    .to("#WP", 0.2, { scale: 1.3 }, "-=0.15")
    .to("#WP", 0.2, { scale: 1 });

  setInterval(() => {
    pulseTl.restart();
  }, 3000);

  // ------------------ work history slide animtaions

  const pinContainer = document.querySelector("#pinContainer");

  if (pinContainer && window.innerWidth >= 768) {
    // init
    // define movement of panels
    var wexWipes = new TimelineMax();

    wexWipes
      .to("#slideContainer", 1, { x: "-25%" }) // animate to second panel
      .to("#slideContainer", 1, { x: "-50%" }) // animate to third panel
      .to("#slideContainer", 1, { x: "-75%" }); // animate to fourth panel

    // create pin and link animation
    new ScrollMagic.Scene({
      triggerElement: "#pinContainer",
      triggerHook: "onLeave",
      duration: "400%",
    })
      .setPin("#pinContainer")
      .setTween(wexWipes)
      .addTo(controller);
  }

  //---------- skill col animations

  const skillCols = document.querySelectorAll(".skill-col");

  if (skillCols) {
    skillCols.forEach((element) => {
      const skillColTween = TweenMax.fromTo(
        element,
        1,
        {
          y: "50px",
          opacity: 0,
          scale: 0.8,
          boxShadow: 0,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          boxShadow: "20px 20px 60px #d4d4d4, -20px -20px 60px #ffffff;",
        },
        "0.15"
      );

      new ScrollMagic.Scene({
        triggerElement: element,
        triggerHook: 0.75,
        reverse: true,
      })
        .setTween(skillColTween)
        //.addIndicators({ name: "skill-col-trigger" })
        .addTo(controller);
    });
  }
});
