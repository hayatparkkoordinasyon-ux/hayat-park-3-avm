/**
 * Hayat Park 3 AVM — portal interactions (Bootstrap + jQuery)
 */
(function ($) {
  "use strict";

  $(function () {
    $(".navbar-nav .nav-link").on("click", function () {
      if (typeof bootstrap === "undefined") {
        return;
      }
      var navbarCollapse = $(".navbar-collapse");
      if ($(window).width() < 992 && navbarCollapse.hasClass("show")) {
        var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse[0]);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          new bootstrap.Collapse(navbarCollapse[0], { toggle: false }).hide();
        }
      }
    });

    var footerYearEl = document.getElementById("footer-year");
    if (footerYearEl) {
      footerYearEl.textContent = String(new Date().getFullYear());
    }
  });
})(jQuery);
