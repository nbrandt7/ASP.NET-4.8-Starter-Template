{
  /* 
<div class="popup js-popup" style="display: none;" role="dialog">
    <span class="popup-bg js-close-btn" aria-label="Close Popup"></span>
    <div class="popup-inner">
        Content
    </div>
</div>

<div class="js-mini-popup mini-popup">
    <div class="js-popup-enable" aria-label="Open Popup">
        Content
    </div>
    <span class="js-close-btn" aria-label="Close Popup"></span>
</div> 
*/
}

// Popups with session storage
    $(document).ready(function () {
      const isNewSession = sessionStorage.getItem("new_session") !== "false";

      function showMainPopup() {
        sessionStorage.setItem("new_session", "false");
        setTimeout(function () {
          $(".js-popup").addClass("active");
          disableBodyScroll();
        }, 2000);
      }

      function showMiniPopup() {
        setTimeout(function () {
          $(".js-mini-popup").addClass("active");
        }, 2000);
      }

      function closePopup() {
        enableBodyScroll();
        $(".js-popup").removeClass("active");
      }

      function closeMiniPopup() {
        $(".js-mini-popup").removeClass("active");
      }

      function enableSwipeClose(element, callback) {
        element.on("keydown", function (event) {
          if (event.key === "Escape") {
            callback();
          }
        });

        let startX, startY;

        element.on("touchstart", function (e) {
          startX = e.originalEvent.touches[0].pageX;
          startY = e.originalEvent.touches[0].pageY;
        });

        element.on("touchend", function (e) {
          const endX = e.originalEvent.changedTouches[0].pageX;
          const endY = e.originalEvent.changedTouches[0].pageY;
          const deltaX = endX - startX;
          const deltaY = endY - startY;
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 100) {
            callback();
          }
        });
      }

      // Initialize swipe handling for popups
      enableSwipeClose($(".js-popup"), closePopup);
      enableSwipeClose($(".js-mini-popup"), closeMiniPopup);

      if (isNewSession) {
        showMainPopup();
      } else {
        showMiniPopup();
      }
    });

    function disableBodyScroll() {
      $("body").css("overflow", "hidden");
    }

    function enableBodyScroll() {
      $("body").css("overflow", "");
    }





