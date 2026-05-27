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

  var YT_IDS = [
    "btMdybxPsLc",
    "aSiVs3qgFJM",
    "WtHTZ__bra8",
    "Wo2b4mTJzOk",
    "YE7VzlLtplA",
    "GpRUUhmEhwY",
    "wbSQoylsKvs",
    "Ga6w7Fp84pI",
    "GPfYDp9mo64",
    "ScMzIvxBSi4",
    "RgKAFKdddjQ",
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
      videoTitle: function (i) {
        return "Project video update #" + i + " (placeholder stream)";
      },
      videoCaption: function (i) {
        return "Placeholder YouTube item for meetings, drone flyovers, or official statements. Replace with your channel link (HP3-VID-" +
          String(i).padStart(3, "0") +
          ").";
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
      videoTitle: function (i) {
        return "Proje video güncellemesi #" + i + " (yer tutucu)";
      },
      videoCaption: function (i) {
        return "Toplantı özeti, drone uçuşu veya resmi açıklamalar için yer tutucu YouTube öğesi. Kanal bağlantınızla değiştirin (HP3-VID-" +
          String(i).padStart(3, "0") +
          ").";
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
      videoTitle: function (i) {
        return "تحديث مرئي رقم " + i + " (ربط تجريبي)";
      },
      videoCaption: function (i) {
        return "عنصر فيديو احتياطي على يوتيوب لمحاضر الاجتماعات أو الطيران الجوي أو البيانات الرسمية؛ يُستبدل برابطكم الرسمي. المرجع: HP3-VID-" +
          String(i).padStart(3, "0") +
          ".";
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
      videoTitle: function (i) {
        return "به‌روزرسانی تصویری شماره " + i + " (لینک جای‌گیر)";
      },
      videoCaption: function (i) {
        return "ویدئوی جای‌گیر یوتوب برای خلاصه جلسات، پرواز پهپادی یا بیانیه رسمی؛ پس از آماده‌شدن کانال رسمی جایگزین شود. شناسه: HP3-VID-" +
          String(i).padStart(3, "0") +
          ".";
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
    var base = filename.replace(/(\.(jpe?g|webp))+$/i, "");
    var dash = base.lastIndexOf("-");
    return dash > 0 ? base.slice(0, dash) : base;
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

  function renderFilterButtons(L) {
    var $filters = $(".hp3-gallery-filters");
    if (!$filters.length) return;

    var html =
      '<button type="button" class="btn btn-primary hp3-filter-btn active" data-filter="all" data-hp3-filter-all><span>' +
      escapeAttr(L.filters.all) +
      "</span></button>";

    PHOTO_FILTER_ORDER.forEach(function (cat) {
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
      $filters.toggle(mode === "photos");
    }

    if (mode === "photos") {
      renderFilterButtons(L);
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

    function videoBlock(vidx, catKeyAlwaysVideos) {
      var id = YT_IDS[(vidx - 1) % YT_IDS.length];
      var yt = "https://www.youtube.com/watch?v=" + id;
      var thumb = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
      var title = L.videoTitle.call(L, vidx);
      var caption = L.videoCaption.call(L, vidx);
      var dataBox =
        "title: " + sanitizeGlightboxText(title) + "; description: " + sanitizeGlightboxText(caption);

      return (
        '<figure class="col-6 col-md-4 col-lg-3 gallery-item hp3-gallery-item" data-category="' +
        catKeyAlwaysVideos +
        '">' +
        '<div class="gallery-thumb-wrapper">' +
        '<a href="' +
        escapeAttr(yt) +
        '" class="glightbox hp3-gallery-visible" data-glightbox="' +
        escapeAttr(dataBox) +
        '" data-type="video">' +
        '<img loading="lazy" decoding="async" src="' +
        escapeAttr(thumb) +
        '" alt="' +
        escapeAttr(title) +
        '" />' +
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
      var v;
      for (v = 1; v <= 12; v += 1) {
        html += videoBlock(v, "videos");
      }
    }

    $grid.html(html);

    if (mode === "photos") {
      $(".gallery-item.filtered-out").removeClass("filtered-out");
      $("a.glightbox").each(function () {
        $(this)
          .addClass("hp3-gallery-visible")
          .attr("aria-hidden", "false")
          .attr("tabindex", "0");
      });
      attachFilters();
    } else {
      $("a.glightbox").each(function () {
        $(this)
          .addClass("hp3-gallery-visible")
          .attr("aria-hidden", "false")
          .attr("tabindex", "0");
      });
    }

    rebuildLightbox();

    $(".hp3-gallery-count-live").text(String($("#hp3-gallery-root .gallery-item").length));
  }

  $(function () {
    renderItems(langKey());
  });
})(jQuery);
