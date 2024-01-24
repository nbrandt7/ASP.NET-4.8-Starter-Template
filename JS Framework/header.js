const mainNavInput = document.getElementById('site-nav-toggle');
const navBlur = document.querySelector('.js-mobile-nav-blur');
let timeout;
mainNavInput.checked = false; // Uncheck on initial page load

mainNavInput.addEventListener('change', function (event) {
    if (event.target.checked) {
        navBlur.classList.add('show'); // Show, animate in

        // Animate in, clear timeout for rapid clicks
        clearTimeout(timeout);
        timeout = setTimeout(() => navBlur.classList.add('animate'), 100); // Short delay for animation

        disablePageScroll();
    } else {
        navBlur.classList.remove('animate'); // Animate out

        // Animate out, clear timeout for rapid clicks
        clearTimeout(timeout);
        timeout = setTimeout(() => navBlur.classList.remove('show'), 600); // Delay for animation out

        enablePageScroll();
    }
});

// Sticky Header on scroll
const siteHeader = document.querySelector(".js-site-header");
window.addEventListener("scroll", () =>
  window.scrollY > 0
    ? siteHeader.classList.add("scrolling")
    : siteHeader.classList.remove("scrolling")
);
window.dispatchEvent(new Event("scroll"));

// Active nav link state
const navlinks = [...document.querySelectorAll(".js-nav-list a")];
const activeNavLink = navlinks.find(
  (link) => new URL(link.href).pathname === window.location.pathname
);
if (activeNavLink) activeNavLink.classList.add("active");

// Reset nav styles on resize
const topNavMobileMq = getComputedStyle(
  document.documentElement
).getPropertyValue("--nav-mobile-mq"); // top nav switches to mobile layout
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > topNavMobileMq && mainNavInput.checked) {
      mainNavInput.checked = false;
      mainNavInput.dispatchEvent(new Event("change"));
    }
  }, 300);
});

/**
 * Prevent page scrolling. E.g. Dialogs, when mobile nav is expanded, etc.
 */
function disablePageScroll() {
    document.documentElement.style.setProperty('--window-position', `${window.scrollY}`);
    document.documentElement.classList.add('scroll-lock');
};

/**
 * Re-enable page scrolling
 */
function enablePageScroll() {
    const prevPosition = document.documentElement.style.getPropertyValue('--window-position');
    document.documentElement.classList.remove('scroll-lock');
    window.scrollTo(0, parseInt(prevPosition));
};

promosSwiper = new Swiper('.promos-slider', {
    slidesPerView: 1,
    a11y: false,
    rewind: true,
    freeMode: {
        enabled: true,
        sticky: true,
        momentumRatio: 0.5,
        momentumVelocityRatio: 0.5,
    },
    centeredSlides: true,
    centeredSlidesBounds: true,
    autoplay: {
        delay: 10000,
    },
    spaceBetween: 10,
});
