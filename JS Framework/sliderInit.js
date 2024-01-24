/**
 * Swiper sliders need a class of 'js-swiper-slider' on the Swiper init element.
 *
 * The Swiper init element needs a data attribute of 'data-swiper-init' with a
 * value equal to the swiper init function for that specific slider.
 */
(function () {
  let swiperApiLoading = false;

  /**
   * Load and append Swiper script API
   * @param {object} swiperSliders Swiper slider elements to initialize
   */
  const loadSwiperApi = (swiperSliders) => {
    // Only execute once
    if (swiperApiLoading) return;
    swiperApiLoading = true;

    // Load & append swiper API script to page
    const swiperScriptEl = document.createElement("script");
    swiperScriptEl.src = "/Content/js/swiper-bundle.min.js";
    document.body.appendChild(swiperScriptEl);

    // Execute swiper init functions on swiper API script load.
    // Swiper init functions can NOT be arrow function expressions.
    swiperScriptEl.onload = () => {
      swiperSliders.forEach((slider) => {
        const swiperInit = slider.dataset.swiperInit;
        if (typeof window[swiperInit] === "function") window[swiperInit]();
      });
    };
  };

  /**
   * Observe and lazy load slider script
   * @param {object} swiperSliders Swiper slider elements to observe
   */
  const observeSlider = (swiperSliders) => {
    if (!"IntersectionObserver" in window) {
      // Load swiper API script if no IntersectionObserver API support
      loadSwiperApi(swiperSliders);
    } else {
      /**
       * Observe & unobserve swiper sliders and lazy load swiper API script using IntersectionObserver API.
       * @param {object} entries Swiper slider elements to observe
       */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              loadSwiperApi(swiperSliders);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "100% 0px", threshold: 0 }
      );

      swiperSliders.forEach((slider) => observer.observe(slider));
    }
  };

  // Slider init - sliders with more than 1 slide
  const swiperSliders = document.querySelectorAll(".js-swiper-slider");
  const swiperSlidersInit = [...swiperSliders].filter((slider) => {
    let slideCount = slider.querySelectorAll(".swiper-slide").length;
    return slideCount > 1;
  });

  observeSlider([...swiperSlidersInit]);
})();
