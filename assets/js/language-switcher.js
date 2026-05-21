/**
 * Resolves multilingual sibling URLs: ../{lang}/{samePage}.html
 * Works when pages live one level beneath /tr,/en,/ar,/fa.
 */
(function () {
  "use strict";

  var LANGS = ["tr", "en", "ar", "fa"];

  function currentPageFilename() {
    var path = window.location.pathname.replace(/\\/g, "/");
    var last = path.split("/").pop();
    if (!last || last.indexOf(".") === -1) {
      return "index.html";
    }
    return last;
  }

  function applyLinks() {
    var page = currentPageFilename();
    var anchors = document.querySelectorAll("[data-hp3-lang-switch]");
    anchors.forEach(function (anchor) {
      var lang = anchor.getAttribute("data-hp3-lang-switch");
      if (!lang || LANGS.indexOf(lang) === -1) {
        return;
      }
      anchor.setAttribute("href", "../" + lang + "/" + page);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyLinks);
  } else {
    applyLinks();
  }
})();
