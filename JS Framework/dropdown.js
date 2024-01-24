//<div class="js-dropdown" data-mq="1500">
//    <div class="js-header">Header</div>

//    <div class="js-content" aria-hidden="false">
//        Content
//    </div>
//</div>

var timing = 300;

function toggleDropdown($header, $content) {
  var isExpanded = $content.attr("aria-hidden") === "false";
  var $dropdown = $header.closest(".js-dropdown");

  if (!isExpanded) {
    // Expand the dropdown
    $content.attr("aria-hidden", "false");
    $content.slideDown(timing);
    $dropdown.addClass("active"); // Add the "active" class
    $dropdown
      .siblings(".js-dropdown.active")
      .removeClass("active")
      .children(".js-content")
      .slideUp(timing)
      .attr("aria-hidden", "true");

    var parentContainer = $dropdown.parent(".js-panel-container");
    if (parentContainer && parentContainer.style) {
      parentContainer.style.setProperty(
        "--_height",
        `${parentContainer.scrollHeight}px`
      );
    }
  } else {
    // Collapse the dropdown
    $content.attr("aria-hidden", "true");
    $content.slideUp(timing);
    $dropdown.removeClass("active"); // Remove the "active" class
    var parentContainer = $dropdown.parent(".js-panel-container");
    if (parentContainer && parentContainer.style) {
      parentContainer.style.setProperty(
        "--_height",
        `${parentContainer.scrollHeight}px`
      );
    }
  }
}

function handleResize() {
  $(".js-dropdown").each(function () {
    var $dropdown = $(this);
    var mq = $dropdown.data("mq");
    var $header = $dropdown.find(".js-header");
    var $content = $dropdown.find(".js-content");

    // Store the initial aria-hidden attribute
    if (typeof mq !== "undefined" && !$dropdown.data("initial-aria-hidden")) {
      $dropdown.data("initial-aria-hidden", $content.attr("aria-hidden"));
    }

    // Unbind the click event before binding it again to prevent repeated bindings
    $header.off("click");

    if (typeof mq === "undefined" || window.innerWidth <= mq) {
      $header.on("click", function () {
        toggleDropdown($header, $content);
      });
      $dropdown.addClass("active"); // Add the "active" class
    } else {
      $dropdown.removeClass("active"); // Remove the "active" class
    }

    // Keyboard navigation
    $header.on("keydown", function (e) {
      var key = e.which || e.keyCode;
      if (key === 13 || key === 32) {
        // Enter or Space key
        e.preventDefault();
        toggleDropdown($header, $content);
      }
    });

    // Check if it should be initially hidden
    if (
      ($content.attr("aria-hidden") === "true" && typeof mq === "undefined") ||
      ($content.attr("aria-hidden") === "true" && window.innerWidth <= mq)
    ) {
      $content.slideUp(0); // Hide content
      $dropdown.removeClass("active");
    } else {
      $content.slideDown(0); // Show content
      $dropdown.addClass("active");
    }
  });
}

// Call handleResize on window load and resize
$(window).on("load resize", function () {
  handleResize();
});
