/**
 * Hayat Park 3 AVM gallery — Bootstrap grid + GLightbox + jQuery filters
 * Photo items are loaded from ../images/; category = filename prefix (tag group).
 */
(function ($) {
  "use strict";

  var PHOTO_FILTER_ORDER = [
    "dis-gorunus",
    "ic-kisim",
    "koridor",
    "tavan",
    "dukkan-ornek",
    "otopark",
  ];

  var PHOTO_FILENAMES = [
    "dis-gorunus-1.jpeg",
    "dis-gorunus-2.jpeg",
    "dis-gorunus-3.jpeg",
    "dis-gorunus-4.jpeg",
    "dis-gorunus-5.jpeg",
    "dis-gorunus-21212.jpeg",
    "dis-gorunus-21111432.jpeg.jpeg",
    "dis-gorunus-211121432.jpeg.jpeg",
    "dis-gorunus-211432.jpeg.jpeg",
    "dis-gorunus-212.jpeg.jpeg",
    "dis-gorunus-2121111432.jpeg.jpeg",
    "dis-gorunus-2122.jpeg.jpeg",
    "dis-gorunus-22111432.jpeg.jpeg",
    "dis-gorunus-2312.jpeg.jpeg",
    "dis-gorunus-2a312.jpeg.jpeg",
    "dis-gorunus-2a3142.jpeg.jpeg",
    "ic-kisim-1.jpeg",
    "ic-kisim-2.jpeg",
    "ic-kisim-3.jpeg",
    "ic-kisim-4.jpeg",
    "ic-kisim-5.jpeg",
    "ic-kisim-6.jpeg",
    "ic-kisim-88.jpeg",
    "ic-kisim-887.jpeg",
    "ic-kisim-777.jpeg",
    "ic-kisim-11212.jpeg",
    "ic-kisim-121239.jpeg",
    "ic-kisim-21123r.jpeg",
    "ic-kisim-22223.jpeg",
    "ic-kisim-32323.jpeg",
    "ic-kisim-121212334234.jpeg",
    "koridor-1.jpeg",
    "tavan-11.jpeg",
    "dukkan-ornek-1.jpeg",
    "dukkan-ornek-1122.jpeg",
    "dukkan-ornek-112232323.jpeg",
    "dukkan-ornek-1122323231.jpeg",
    "dukkan-ornek-1122323234.jpeg",
    "dukkan-ornek-112232323421.jpeg",
    "dukkan-ornek-11223232348.jpeg",
    "dukkan-ornek-2.jpeg",
    "otopark-1.jpeg",
    "otopark-2.jpeg",
    "otopark-3.jpeg",
    "otopark-1555.jpeg",
  ];

  var VIDEO_FILTER_ORDER = [
    "dis-cephe-video",
    "ic-cephe-video",
    "zemin-otopark",
  ];

  var VIDEO_FILENAMES = [
    "dis-cephe-video-1.mp4",
    "ic-cephe-video-1.mp4",
    "zemin-otopark.mp4",
  ];

  var LEX = {
    en: {
      filters: {
        all: "All",
        "dis-gorunus": "Outside View",
        "ic-kisim": "Interior",
        koridor: "Corridor",
        tavan: "Ceiling",
        "dukkan-ornek": "Shop Example",
        otopark: "Parking",
        "dis-cephe-video": "Exterior Façade Video",
        "ic-cephe-video": "Interior Façade Video",
        "zemin-otopark": "Ground Parking",
        videos: "Videos",
      },
      imageTitle: function (i, cat) {
        return this.filters[cat] + " — photo " + i;
      },
      imageCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
      videoTitle: function (i, cat) {
        return this.filters[cat] + " — video " + i;
      },
      videoCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
    },
    tr: {
      filters: {
        all: "Tümü",
        "dis-gorunus": "Dış Görünüm",
        "ic-kisim": "İç Kısım",
        koridor: "Koridor",
        tavan: "Tavan",
        "dukkan-ornek": "Dükkan Örneği",
        otopark: "Otopark",
        "dis-cephe-video": "Dış Cephe Video",
        "ic-cephe-video": "İç Cephe Video",
        "zemin-otopark": "Zemin Otopark",
        videos: "Videolar",
      },
      imageTitle: function (i, cat) {
        return this.filters[cat] + " — fotoğraf " + i;
      },
      imageCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
      videoTitle: function (i, cat) {
        return this.filters[cat] + " — video " + i;
      },
      videoCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
    },
    ar: {
      filters: {
        all: "الكل",
        "dis-gorunus": "المنظر الخارجي",
        "ic-kisim": "الداخل",
        koridor: "الممر",
        tavan: "السقف",
        "dukkan-ornek": "نموذج محل",
        otopark: "موقف السيارات",
        "dis-cephe-video": "فيديو الواجهة الخارجية",
        "ic-cephe-video": "فيديو الواجهة الداخلية",
        "zemin-otopark": "موقف السيارات الأرضي",
        videos: "مقاطع فيديو",
      },
      imageTitle: function (i, cat) {
        return this.filters[cat] + " — صورة " + i;
      },
      imageCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
      videoTitle: function (i, cat) {
        return this.filters[cat] + " — فيديو " + i;
      },
      videoCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
    },
    fa: {
      filters: {
        all: "همه",
        "dis-gorunus": "نمای بیرونی",
        "ic-kisim": "فضای داخلی",
        koridor: "راهرو",
        tavan: "سقف",
        "dukkan-ornek": "نمونه مغازه",
        otopark: "پارکینگ",
        "dis-cephe-video": "ویدئوی نمای بیرونی",
        "ic-cephe-video": "ویدئوی نمای داخلی",
        "zemin-otopark": "پارکینگ همکف",
        videos: "ویدئوها",
      },
      imageTitle: function (i, cat) {
        return this.filters[cat] + " — تصویر " + i;
      },
      imageCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
      videoTitle: function (i, cat) {
        return this.filters[cat] + " — ویدئو " + i;
      },
      videoCaption: function (i, cat) {
        return (
          "Hayat Park 3 AVM — " +
          this.filters[cat] +
          " (" +
          String(i).padStart(2, "0") +
          ")."
        );
      },
    },
  };

  function langKey() {
    var l = (($("html").attr("lang") || "en") + "").toLowerCase();
    if (!LEX[l]) return "en";
    return l;
  }

  function galleryMode() {
    var mode = (
      $("body").attr("data-hp3-gallery-mode") ||
      $("#hp3-gallery-root").attr("data-hp3-gallery-mode") ||
      "photos"
    ).toString();
    return mode === "videos" ? "videos" : "photos";
  }

  function tagFromFilename(filename) {
    var base = filename.replace(/(\.(mp4|jpe?g|webp))+$/i, "");
    if (/^(.+)-(\d+[a-zA-Z]*)$/.test(base)) {
      return base.replace(/-(\d+[a-zA-Z]*)$/, "");
    }
    return base;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  var hp3LightboxInstance = null;

  function rebuildLightbox() {
    if (typeof GLightbox === "undefined") {
      return;
    }
    if (hp3LightboxInstance) {
      try {
        hp3LightboxInstance.destroy();
      } catch (e1) {}
      hp3LightboxInstance = null;
    }
    hp3LightboxInstance = GLightbox({
      selector: ".hp3-gallery-visible.glightbox",
      touchNavigation: true,
      keyboardNavigation: true,
      loop: true,
      draggable: true,
      openEffect: "fade",
      closeEffect: "fade",
      slideEffect: "slide",
      moreLength: 120,
      skin: "clean light",
      closeOnOutsideClick: true,
    });
  }

  function attachFilters() {
    var $buttons = $(".hp3-filter-btn");
    $buttons.off("click.hp3Gallery").on("click.hp3Gallery", function () {
      var chosen = ($(this).data("filter") || "all").toString();
      $buttons.removeClass("btn-primary active").addClass("btn-outline-secondary");
      $(this).addClass("btn-primary active").removeClass("btn-outline-secondary");

      $(".gallery-item").each(function () {
        var cat = ($(this).data("category") || "").toString();
        var visible = chosen === "all" || chosen === cat;
        $(this).toggleClass("filtered-out", !visible);
        $(this)
          .find("a.glightbox")
          .toggleClass("hp3-gallery-visible", visible)
          .attr("aria-hidden", visible ? "false" : "true")
          .attr("tabindex", visible ? "0" : "-1");
      });

      rebuildLightbox();
    });
  }

  function renderFilterButtons(L, filterOrder) {
    var $filters = $(".hp3-gallery-filters");
    if (!$filters.length) return;

    var html =
      '<button type="button" class="btn btn-primary hp3-filter-btn active" data-filter="all" data-hp3-filter-all><span>' +
      escapeAttr(L.filters.all) +
      "</span></button>";

    filterOrder.forEach(function (cat) {
      html +=
        '<button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="' +
        escapeAttr(cat) +
        '">' +
        escapeAttr(L.filters[cat]) +
        "</button>";
    });

    $filters.html(html);
  }

  function renderItems(lang) {
    var L = LEX[lang];
    var mode = galleryMode();
    var $grid = $("#hp3-gallery-root");
    if (!$grid.length) return;

    var $filters = $(".hp3-gallery-filters");
    if ($filters.length) {
      $filters.show();
    }

    if (mode === "photos") {
      renderFilterButtons(L, PHOTO_FILTER_ORDER);
    } else if (mode === "videos") {
      renderFilterButtons(L, VIDEO_FILTER_ORDER);
    }

    var html = "";

    function sanitizeGlightboxText(s) {
      return String(s).replace(/;/g, " — ");
    }

    function galleryFigure(i, catKey, thumbUrl, fullUrl) {
      var title = L.imageTitle.call(L, i, catKey);
      var caption = L.imageCaption.call(L, i, catKey);
      var lightboxUrl = fullUrl || thumbUrl;

      var dataBox =
        "title: " + sanitizeGlightboxText(title) + "; description: " + sanitizeGlightboxText(caption);

      return (
        '<figure class="col-6 col-md-4 col-lg-3 gallery-item hp3-gallery-item" data-category="' +
        catKey +
        '">' +
        '<div class="gallery-thumb-wrapper">' +
        '<a href="' +
        escapeAttr(lightboxUrl) +
        '" class="glightbox hp3-gallery-visible" data-glightbox="' +
        escapeAttr(dataBox) +
        '">' +
        '<img loading="lazy" decoding="async" src="' +
        escapeAttr(thumbUrl) +
        '" sizes="(max-width: 576px) 50vw,(max-width: 992px) 33vw,25vw"' +
        ' alt="' +
        escapeAttr(title) +
        '" />' +
        "</a>" +
        "</div>" +
        "<figcaption>" +
        escapeAttr(caption) +
        "</figcaption>" +
        "</figure>"
      );
    }

    function localVideoBlock(i, catKey, filename) {
      var videoPath = "../videos/" + filename;
      var title = L.videoTitle.call(L, i, catKey);
      var caption = L.videoCaption.call(L, i, catKey);
      var dataBox =
        "title: " + sanitizeGlightboxText(title) + "; description: " + sanitizeGlightboxText(caption);

      return (
        '<figure class="col-6 col-md-4 col-lg-3 gallery-item hp3-gallery-item" data-category="' +
        catKey +
        '">' +
        '<div class="gallery-thumb-wrapper">' +
        '<a href="' +
        escapeAttr(videoPath) +
        '" class="glightbox hp3-gallery-visible" data-glightbox="' +
        escapeAttr(dataBox) +
        '" data-type="video">' +
        '<video class="hp3-video-thumb" preload="metadata" muted playsinline aria-hidden="true">' +
        '<source src="' +
        escapeAttr(videoPath) +
        '" type="video/mp4" />' +
        "</video>" +
        '<span class="hp3-gallery-play" aria-hidden="true">&#9654;</span>' +
        "</a>" +
        "</div>" +
        "<figcaption>" +
        escapeAttr(caption) +
        "</figcaption>" +
        "</figure>"
      );
    }

    if (mode === "photos") {
      var categoryCounts = {};

      PHOTO_FILENAMES.forEach(function (filename) {
        var catKey = tagFromFilename(filename);
        if (!categoryCounts[catKey]) {
          categoryCounts[catKey] = 0;
        }
        categoryCounts[catKey] += 1;
        var imagePath = "../images/" + filename;
        html += galleryFigure(categoryCounts[catKey], catKey, imagePath, imagePath);
      });
    } else {
      var videoCategoryCounts = {};

      VIDEO_FILENAMES.forEach(function (filename) {
        var catKey = tagFromFilename(filename);
        if (!videoCategoryCounts[catKey]) {
          videoCategoryCounts[catKey] = 0;
        }
        videoCategoryCounts[catKey] += 1;
        html += localVideoBlock(videoCategoryCounts[catKey], catKey, filename);
      });
    }

    $grid.html(html);

    if (mode === "photos" || mode === "videos") {
      $(".gallery-item.filtered-out").removeClass("filtered-out");
      $("a.glightbox").each(function () {
        $(this)
          .addClass("hp3-gallery-visible")
          .attr("aria-hidden", "false")
          .attr("tabindex", "0");
      });
      attachFilters();
    }

    rebuildLightbox();

    $(".hp3-gallery-count-live").text(String($("#hp3-gallery-root .gallery-item").length));
  }

  $(function () {
    renderItems(langKey());
  });
})(jQuery);
