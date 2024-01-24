function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function windowScroll() {
  var parallaxImages = document.querySelectorAll(".js-parallax-img");
  var parallaxContents = document.querySelectorAll(".js-parallax-content");
  var windowScrolled = window.scrollY || document.documentElement.scrollTop;
  var speedImage = 4;
  var speedContent = 6;

  parallaxImages.forEach(function (image) {
    if (isElementInViewport(image)) {
      image.style.transform =
        "translate3d(0, " + windowScrolled / speedImage + "px, 0)";
    }
  });

  parallaxContents.forEach(function (content) {
    if (isElementInViewport(content)) {
      content.style.transform =
        "translate3d(0, " + windowScrolled / speedContent + "px, 0)";
    }
  });
}

window.addEventListener("scroll", windowScroll);
