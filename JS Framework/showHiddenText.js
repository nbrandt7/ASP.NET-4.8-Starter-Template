const hiddenTextPopup = document.querySelectorAll(".js-hidden-text-popup");
if (hiddenTextPopups.length > 0) {
  const getDescHeights = () => {
    hiddenTextPopups.forEach((x) => {
      let content = x.querySelector(".js-content");
      let desc = content.querySelector(".js-desc");
      content.style.setProperty(
        "--height",
        desc ? `${desc.offsetHeight}px` : "0px"
      );
    });
  };

  window.addEventListener("load", () => {
    getDescHeights();
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => getDescHeights(), 100);
  });
}
