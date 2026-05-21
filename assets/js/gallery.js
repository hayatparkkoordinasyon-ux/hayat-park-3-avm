/**
 * Hayat Park 3 AVM gallery — Bootstrap grid + GLightbox + jQuery filters
 * Loads 100+ curated items (images + YouTube) with lazy thumbnails.
 */
(function ($) {
  "use strict";

  var CAT_ORDER = [
    "construction",
    "meetings",
    "documents",
    "drone",
    "videos",
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
        construction: "Construction Progress",
        meetings: "Meeting Photos",
        documents: "Official Documents",
        drone: "Drone Images",
        videos: "Videos",
      },
      imageTitle: function (i, cat) {
        return "HP3 site status — item " + i + " (" + this.filters[cat] + ")";
      },
      imageCaption: function (i, cat) {
        var map = {
          construction:
            "Construction documentation for owners: shell works, cores, and façades (archive ID HP3-IMG-" +
            String(i).padStart(4, "0") +
            ").",
          meetings:
            "Archive photo from owner coordination activities and information meetings (ref. HP3-MTG-" +
            String(i).padStart(4, "0") +
            ").",
          documents:
            "Scanned reference from the official documentation set (redacted preview; full PDFs are published separately).",
          drone:
            "Aerial progress capture for transparent monitoring of the development envelope (flight log HP3-UAV-" +
            String(i).padStart(4, "0") +
            ").",
        };
        return map[cat] || map.construction;
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
        construction: "İnşaat İlerlemesi",
        meetings: "Toplantı Görselleri",
        documents: "Resmi Belgeler",
        drone: "Drone Görselleri",
        videos: "Videolar",
      },
      imageTitle: function (i, cat) {
        return "HP3 saha görüntüsü — " + i + " (" + this.filters[cat] + ")";
      },
      imageCaption: function (i, cat) {
        var map = {
          construction:
            "Malikler için yapılmış şeffaf görüntü kaydı (kabuk işleri, çekirdekler ve cephe bileşenleri). Arşiv: HP3-GOR-" +
            String(i).padStart(4, "0") +
            ".",
          meetings:
            "Malik koordinasyonu ve bilgilendirme toplantılarına ilişkin arşiv görseli (ref: HP3-TPL-" +
            String(i).padStart(4, "0") +
            ").",
          documents:
            "Resmi dokümantasyon setine ait tarama önizlemesi (tam PDF’ler ayrıca duyurulur). Kişisel veriler çıkarılmıştır.",
          drone:
            "Gelişim zarfi için şeffaf izleme amaçlı havadan görüntü (uçuş kaydı: HP3-UAV-" +
            String(i).padStart(4, "0") +
            ").",
        };
        return map[cat] || map.construction;
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
        construction: "تقدم الإنشاءات",
        meetings: "صور الاجتماعات",
        documents: "وثائق رسمية",
        drone: "صور بطائرة مسيّرة",
        videos: "مقاطع فيديو",
      },
      imageTitle: function (i, cat) {
        return "توثيق موقع مشروع HP3 — " + i + " (" + this.filters[cat] + ")";
      },
      imageCaption: function (i, cat) {
        var map = {
          construction:
            "صورة توثيقية للمالكين تظهر الأعمال الهيكلية والنوى والواجهات وفق آلية تعقيم شفافة للمشاركة. المرجع: HP3-IMG-" +
            String(i).padStart(4, "0") +
            ".",
          meetings:
            "صورة أرشيفية متعلقة بأنشطة التنسيق جلسات الإعلام للمالكين. المرجع: HP3-MTG-" +
            String(i).padStart(4, "0") +
            ".",
          documents:
            "معاينة ممسوحة ضوئيًا ضمن مجموعة الوثائق الرسمية (يتم إتاحة ملفات PDF الكاملة عبر صفحة الإعلانات).",
          drone:
            "التقاط جوي لمتابعة تقدم الغلاف المعماري بشكل واضح. سجل الطيران: HP3-UAV-" +
            String(i).padStart(4, "0") +
            ".",
        };
        return map[cat] || map.construction;
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
        construction: "پیشرفت ساخت",
        meetings: "تصاویر جلسات",
        documents: "اسناد رسمی",
        drone: "تصاویر پهپادی",
        videos: "ویدئوها",
      },
      imageTitle: function (i, cat) {
        return "مستندسازی پیشرفت پروژه HP3 — " + i + " (" + this.filters[cat] + ")";
      },
      imageCaption: function (i, cat) {
        var map = {
          construction:
            "تصویر مستند برای مالکان از وضعیت اسکلت، هسته‌ها و عناصر نما با شماره آرشیوی HP3-IMG-" +
            String(i).padStart(4, "0") +
            ".",
          meetings:
            "تصویر بایگانی مرتبط با هماهنگی مالکان و جلسات اطلاع‌رسانی. مرجع: HP3-MTG-" +
            String(i).padStart(4, "0") +
            ".",
          documents:
            "پیش‌نمایش از مجموعهٔ اسکن‌شدهٔ اسناد رسمی (فایل‌های PDF کامل در بخش اطلاع‌رسانی منتشر می‌شود).",
          drone:
            "ثبت تصویر هوایی برای پیگیری شفاف پیرامون پیشرفت حجم ساختمان. گزارش پرواز: HP3-UAV-" +
            String(i).padStart(4, "0") +
            ".",
        };
        return map[cat] || map.construction;
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

  function catForImageIndex(idx) {
    return CAT_ORDER[idx % CAT_ORDER.length];
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

  function renderItems(lang) {
    var L = LEX[lang];
    var $grid = $("#hp3-gallery-root");
    if (!$grid.length) return;

    // Localize buttons
    $("[data-hp3-filter-all]").each(function () {
      $(this).find("span").text(L.filters.all);
    });
    CAT_ORDER.forEach(function (cat) {
      $(".hp3-filter-btn[data-filter='" + cat + "']").text(L.filters[cat]);
    });

    var html = "";

    function sanitizeGlightboxText(s) {
      return String(s).replace(/;/g, " — ");
    }

    function imageBlock(i, catKey) {
      var seed =
        "hp3-" +
        catKey +
        "-" +
        String(i).padStart(3, "0") +
        "-hayatpark3";
      var thumbUrl = "https://picsum.photos/seed/" + encodeURIComponent(seed) + "/560/420";
      var fullUrl = "https://picsum.photos/seed/" + encodeURIComponent(seed) + "/1680/1050";

      var title = L.imageTitle.call(L, i, catKey);
      var caption = L.imageCaption.call(L, i, catKey);

      var dataBox =
        "title: " + sanitizeGlightboxText(title) + "; description: " + sanitizeGlightboxText(caption);

      return (
        '<figure class="col-6 col-md-4 col-lg-3 gallery-item hp3-gallery-item" data-category="' +
        catKey +
        '">' +
        '<div class="gallery-thumb-wrapper">' +
        '<a href="' +
        escapeAttr(fullUrl) +
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

    // 103 images keeps total media > 105 with videos
    for (var idx = 1; idx <= 103; idx += 1) {
      html += imageBlock(idx, catForImageIndex(idx - 1));
    }

    var v;
    for (v = 1; v <= 12; v += 1) {
      html += videoBlock(v, "videos");
    }

    $grid.html(html);

    $(".hp3-filter-btn.btn-primary[data-filter]").removeClass(
      "btn-primary active",
    );
    $(".hp3-filter-btn.btn-outline-secondary").removeClass("btn-primary active");
    $('.hp3-filter-btn[data-filter="all"]')
      .addClass("btn-primary active")
      .removeClass("btn-outline-secondary");
    $(".gallery-item.filtered-out").removeClass("filtered-out");
    $("a.glightbox").each(function () {
      $(this)
        .addClass("hp3-gallery-visible")
        .attr("aria-hidden", "false")
        .attr("tabindex", "0");
    });

    rebuildLightbox();
    attachFilters();

    $(".hp3-gallery-count-live").text(String($("#hp3-gallery-root .gallery-item").length));
  }

  $(function () {
    renderItems(langKey());
  });
})(jQuery);
