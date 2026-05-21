/**
 * One-off generator for tr/ar/fa inner pages (gallery, contact, announcements, meetings).
 * Run: node scripts/gen-locale-pages.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

/** One short legal notice per locale (same meaning). Shown once per page — no multi-column repeat. */
const FOOTER_NOTICE = {
  tr:
    "Bu site yalnızca Hayat Park 3 maliklerine genel bilgi sunar; resmi tebligat veya bağlayıcı belgelerin yerini tutmaz; hukuki veya mali tavsiye değildir.",
  ar: "يوفّر هذا الموقع معلومات عامة لملاك مشروع حياة بارك 3 فقط، ولا يحلّ محل الإخطارات الرسمية أو الوثائق الملزمة، وليس استشارة قانونية أو مالية.",
  fa: "این وب‌سایت صرفاً برای اطلاع‌رسانی عمومی مالکان حیات پارک ۳ است؛ جایگزین ابلاغ رسمی یا اسناد لازم‌الاجرا نیست و مشاورهٔ حقوقی یا مالی محسوب نمی‌شود.",
};

function footerInner(locale) {
  const x = L[locale];
  const notice = FOOTER_NOTICE[locale];
  return `        <p class="small hp3-footer-notice mb-0">${notice}</p>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 pt-3 mt-3 border-top border-white border-opacity-25">
          <nav class="hp3-footer-nav flex-wrap justify-content-center justify-content-md-start" aria-label="${x.navLabel}">
${x.footerLinks}
          </nav>
          <p class="small hp3-muted-link mb-0 text-center text-md-end">© <span id="footer-year">2026</span> Hayat Park 3 AVM</p>
        </div>`;
}

const L = {
  tr: {
    navLabel: "Alt bilgi menüsü",
    skip: "İçeriğe geç",
    brandSub: "Malikler · Bilgilendirme",
    navToggle: "Menüyü aç/kapat",
    home: "Ana Sayfa",
    photos: "Fotoğraflar",
    ann: "Duyurular",
    mtg: "Toplantılar",
    contact: "İletişim",
    langLabel: "Türkçe",
    footerLinks: `            <a href="index.html">Ana Sayfa</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="gallery.html">Fotoğraflar</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="announcements.html">Duyurular</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="meetings.html">Toplantılar</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="contact.html">İletişim</a>`,
  },
  ar: {
    navLabel: "تذييل التنقل",
    skip: "تخط إلى المحتوى",
    brandSub: "الملاك · مكتب المعلومات",
    navToggle: "فتح القائمة",
    home: "الرئيسية",
    photos: "الصور",
    ann: "الإعلانات",
    mtg: "الاجتماعات",
    contact: "اتصل بنا",
    langLabel: "العربية",
    footerLinks: `            <a href="index.html">الرئيسية</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="gallery.html">الصور</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="announcements.html">الإعلانات</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="meetings.html">الاجتماعات</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="contact.html">اتصل بنا</a>`,
  },
  fa: {
    navLabel: "پانویس",
    skip: "پرش به محتوا",
    brandSub: "مالکان · میز اطلاع‌رسانی",
    navToggle: "بازکردن فهرست",
    home: "خانه",
    photos: "تصاویر",
    ann: "اطلاعیه‌ها",
    mtg: "جلسات",
    contact: "تماس",
    langLabel: "فارسی",
    footerLinks: `            <a href="index.html">خانه</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="gallery.html">تصاویر</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="announcements.html">اطلاعیه‌ها</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="meetings.html">جلسات</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="contact.html">تماس</a>`,
  },
};

function langDropdown(cur) {
  const rows = [
    ["tr", "Türkçe", ""],
    ["en", "English", ""],
    ["ar", "العربية", ' dir="rtl"'],
    ["fa", "فارسی", ' dir="rtl"'],
  ];
  return rows
    .map(([code, label, ddir]) => {
      const active = code === cur ? ' class="dropdown-item fw-semibold active" aria-current="true"' : ' class="dropdown-item"';
      return `                <li><a${active} href="#"${ddir} data-hp3-lang-switch="${code}">${label}</a></li>`;
    })
    .join("\n");
}

function nav(locale, activePage) {
  const x = L[locale];
  const rtl = locale === "ar" || locale === "fa";
  const link = (page, href, label) => {
    if (activePage === page) {
      return `            <li class="nav-item"><a class="nav-link active" aria-current="page" href="${href}">${label}</a></li>`;
    }
    return `            <li class="nav-item"><a class="nav-link" href="${href}">${label}</a></li>`;
  };
  const brandCls = rtl ? " navbar-brand text-lg-end pe-2" : " navbar-brand";
  const subCls = rtl ? " hp3-brand-sub text-uppercase text-lg-end d-block" : " hp3-brand-sub text-uppercase";
  const toggCls = rtl ? " navbar-toggler ms-2" : " navbar-toggler";
  const ulCls = rtl ? " navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center text-end text-lg-start" : " navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center";
  return `    <nav class="navbar navbar-expand-lg navbar-light hp3-navbar sticky-top">
      <div class="container">
        <a class="${brandCls.trim()}" href="index.html">
          Hayat Park&nbsp;3&nbsp;AVM
          <span class="${subCls.trim()}">${x.brandSub}</span>
        </a>
        <button class="${toggCls.trim()}" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Nav" aria-controls="hp3Nav" aria-expanded="false" aria-label="${x.navToggle}">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="hp3Nav">
          <ul class="${ulCls.trim()}">
${link("home", "index.html", x.home)}
${link("gallery", "gallery.html", x.photos)}
${link("ann", "announcements.html", x.ann)}
${link("mtg", "meetings.html", x.mtg)}
${link("contact", "contact.html", x.contact)}
            <li class="nav-item dropdown hp3-lang ms-lg-2">
              <button class="btn btn-outline-secondary btn-sm dropdown-toggle" id="langMenu" type="button" data-bs-toggle="dropdown" aria-expanded="false">${x.langLabel}</button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="langMenu">
${langDropdown(locale)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
}

function head(locale, title, desc, extraLinks, bootstrapFile) {
  const rtl = locale === "ar" || locale === "fa";
  const integ =
    bootstrapFile === "bootstrap.min.css"
      ? ' integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"'
      : " crossorigin=\"anonymous\"";
  const rtlCss = rtl ? '\n    <link rel="stylesheet" href="../assets/css/rtl.css" />' : "";
  return `  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content="${desc}" />
    <meta name="theme-color" content="#0a1b2f" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>${title}</title>
    <link rel="manifest" href="../manifest.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&amp;family=Noto+Sans+Arabic:wght@400;600;700&amp;family=Vazirmatn:wght@400;600;700&amp;display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/${bootstrapFile}" rel="stylesheet"${integ} />
    ${extraLinks}
    <link rel="stylesheet" href="../assets/css/style.css" />${rtlCss}
  </head>`;
}

function footer(locale, scriptsExtra) {
  return `    <footer class="hp3-footer hp3-footer-simple pt-4 pb-4 mt-auto" role="contentinfo">
      <div class="container py-3">
${footerInner(locale)}
      </div>
    </footer>
    <script src="../assets/js/language-switcher.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous" defer></script>
${scriptsExtra}
    <script src="../assets/js/main.js" defer></script>`;
}

const GL_CSS = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" />';
const GL_JS =
  '    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js" defer></script>\n    <script src="../assets/js/gallery.js" defer></script>';

const filLabels = {
  tr: ["Tümü", "İnşaat İlerlemesi", "Toplantı Görselleri", "Resmi Belgeler", "Drone Görselleri", "Videolar"],
  ar: ["الكل", "تقدم الإنشاءات", "صور الاجتماعات", "وثائق رسمية", "صور بطائرة مسيّرة", "مقاطع فيديو"],
  fa: ["همه", "پیشرفت ساخت", "تصاویر جلسات", "اسناد رسمی", "تصاویر پهپادی", "ویدئوها"],
};

function galleryPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const titles = {
    tr: "Fotoğraflar — Hayat Park 3 AVM",
    ar: "الصور — Hayat Park 3",
    fa: "تصاویر — حیات پارک ۳",
  };
  const descs = {
    tr: "Hayat Park 3 fotoğraf ve video arşivi — GLightbox",
    ar: "أرشيف صور ومقاطع مشروع حياة بارك 3",
    fa: "آرشیو تصاویر و ویدئوی پروژهٔ حیات پارک ۳",
  };
  const h1s = {
    tr: "Proje fotoğrafları ve videolar",
    ar: "صور ومقاطع المشروع",
    fa: "تصاویر و ویدئوهای پروژه",
  };
  const lead = {
    tr: 'Küçük resme dokunun; tam görüntü açılır. Adresleri <code>assets/js/gallery.js</code> içinden güncelleyin.',
    ar: "اضغط المصغّرة للعرض الكامل. مرّر للتنقّل على الهاتف.",
    fa: "برای مشاهدهٔ کامل روی بندانگشتی بزنید. آدرس رسانه‌ها را در gallery.js قرار دهید.",
  };
  const cnt = { tr: "Öğe sayısı", ar: "عدد العناصر", fa: "تعداد موارد" };
  const bcAria = { tr: "Sayfa konumu", ar: "مسار التصفح", fa: "مسیر صفحه" };
  const [f0, f1, f2, f3, f4, f5] = filLabels[locale];
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, titles[locale], descs[locale], GL_CSS, bs)}
  <body class="hp3-body d-flex flex-column min-vh-100">
${nav(locale, "gallery")}
    <main id="main" class="flex-grow-1 py-4 py-lg-5">
      <div class="container">
        <nav class="hp3-breadcrumb-wrap mb-3" aria-label="${bcAria[locale]}">
          <ol class="breadcrumb hp3-breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="index.html">${x.home}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${x.photos}</li>
          </ol>
        </nav>
        <header class="mb-4">
          <h1 class="h2 hp3-section-title mb-2">${h1s[locale]}</h1>
          <p class="text-secondary mb-2">${lead[locale]}</p>
          <p class="small text-secondary mb-0">${cnt[locale]}: <strong class="hp3-gallery-count-live">0</strong></p>
        </header>
        <div class="hp3-gallery-filters d-flex flex-wrap gap-2 mb-4" role="toolbar">
          <button type="button" class="btn btn-primary hp3-filter-btn active" data-filter="all" data-hp3-filter-all><span>${f0}</span></button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="construction">${f1}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="meetings">${f2}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="documents">${f3}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="drone">${f4}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="videos">${f5}</button>
        </div>
        <div id="hp3-gallery-root" class="row g-4" aria-live="polite"></div>
      </div>
    </main>
${footer(locale, GL_JS)}
  </body>
</html>`;
}

function contactPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const t = {
    tr: "İletişim — Hayat Park 3 AVM",
    ar: "اتصل بنا — Hayat Park 3",
    fa: "تماس — حیات پارک ۳",
  };
  const d = {
    tr: "Hayat Park 3 malik iletişim formu (Google Form gömülü)",
    ar: "نموذج تواصل الملاك عبر Google Forms",
    fa: "فرم تماس مالکان با Google Forms",
  };
  const h1 = { tr: "İletişim", ar: "اتصل بنا", fa: "تماس" };
  const sub = {
    tr: "Mesajınızı aşağıdaki formdan iletin. Yayınlanmış Google Form adresini iframe src olarak yapıştırın (<code>…/viewform?embedded=true</code>).",
    ar: "أرسل رسالتك عبر النموذج أدناه. استبدل عنوان iframe برابط نموذج Google المنشور.",
    fa: "پیام خود را از طریق فرم زیر بفرستید. نشانی embed فرم Google را در ویژگی src قرار دهید.",
  };
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  const skipPos = rtl ? "end-0" : "start-0";
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, t[locale], d[locale], "", bs)}
  <body class="hp3-body d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable position-absolute top-0 ${skipPos} bg-white px-3 py-2 z-3" href="#main">${x.skip}</a>
${nav(locale, "contact")}
    <main id="main" class="flex-grow-1 py-4 py-lg-5">
      <div class="container">
        <nav class="hp3-breadcrumb-wrap mb-3" aria-label="${locale === "tr" ? "Sayfa konumu" : locale === "ar" ? "مسار التصفح" : "مسیر"}">
          <ol class="breadcrumb hp3-breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="index.html">${x.home}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${x.contact}</li>
          </ol>
        </nav>
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-8">
            <header class="mb-4 text-center ${rtl ? "" : "text-lg-start"}">
              <h1 class="h2 hp3-section-title mb-2">${h1[locale]}</h1>
              <p class="text-secondary mb-0">${sub[locale]}</p>
            </header>
            <div class="hp3-form-embed">
              <iframe title="${h1[locale]}" src="about:blank" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
${footer(locale, "")}
  </body>
</html>`;
}

/** Minimal localized accordion pages — structure mirrors EN */
function announcementsPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  const skipPos = rtl ? "end-0" : "start-0";
  const content = {
    tr: {
      title: "Duyurular — Hayat Park 3 AVM",
      desc: "Malik duyuruları — en yenisi üstte",
      h1: "Duyurular",
      sub: "İlk madde en günceldir. PDF bağlantılarını kendi dosyalarınızla değiştirin.",
      i1d: "16 Mayıs 2026",
      i1t: "Kayyım duyurusu — belge akışı",
      i1p: "Maliklerin soruları ve doğrulanmış eklerin nasıl iletileceği.",
      i1b:
        "Moderatörler başvuruyu İletişim formundan alır, liste ile eşleştirir ve kayyım PDF’leri yayımlandığında özet paylaşır. Resmi başvuru için yalnızca yazılı kanıtlar kullanılır.",
      i2d: "2 Mayıs 2026",
      i2t: "Şantiye erişimi ve güvenlik",
      i2p: "Refakatli ziyaretler ve ekipman kuralları.",
      i2b: "Ziyaretler en az iki iş günü önceden bildirilir; kapı talimatları herkes için geçerlidir.",
      i3d: "21 Nisan 2026",
      i3t: "Raporlama takvimi",
      i3p: "Birleşik şantiye güncellemelerinin planlandığı tarihler.",
      i3b: "Çeyreklik foto paketleri ve özet PDF’leri sabit pencerelerde hedeflenir; gecikmeler burada duyurulur.",
      i4d: "27 Mart 2026",
      i4t: "Drone çekim programı",
      i4p: "Havadan ilerleme fotoğrafları için uçuş pencereleri.",
      i4b: "Uçuşlar yerel havacılık bildirimlerine uyar; galeride yalnızca tarihli küçük resimler yayınlanır.",
      pdf: "PDF yer tutucu",
    },
    ar: {
      title: "الإعلانات — Hayat Park 3",
      desc: "إعلانات الملاك — الأحدث أولاً",
      h1: "الإعلانات",
      sub: "يفتح أحدث بند أولاً. استبدل روابط PDF لاحقًا.",
      i1d: "16 مايو 2026",
      i1t: "نشرة الوصي — مسار الوثائق",
      i1p: "كية طرح الأسئلة واستلام المرفقات الموثقة.",
      i1b:
        "يجمع المنسّقون الطلبات عبر نموذج التواصل، يطابقونها بالقائمة، ثم يشاركون ملخصات PDF عند نشرها من قبل الوصي.",
      i2d: "2 مايو 2026",
      i2t: "الدخول للموقع والسلامة",
      i2p: "زيارات مرافقة ومتطلبات معدات السلامة.",
      i2b: "يُعلَم بالزيارات قبل يومي عمل على الأقل؛ تنطبق قواعد البوابة على الجميع.",
      i3d: "21 أبريل 2026",
      i3t: "جدول التقارير",
      i3p: "مواعيد تحديثات الإنشاءات المجمعة.",
      i3b: "حزم الصور الفصلية ومستندات الملخص تستهدف نوافذ ثابتة؛ يُعلَن عن أي تأخير هنا.",
      i4d: "27 مارس 2026",
      i4t: "جدول التصوير الجوي",
      i4p: "نوافذ الطيران لتصوير التقدم.",
      i4b: "تلتزم الرحلات بإشعارات الطيران المحلية؛ تُعرض في المعرض معاينات مصغّرة بتاريخ فقط.",
      pdf: "PDF تجريبي",
    },
    fa: {
      title: "اطلاعیه‌ها — حیات پارک ۳",
      desc: "اطلاعیه‌های مالکان — جدیدترین بالا",
      h1: "اطلاعیه‌ها",
      sub: "اولین مورد جدیدترین است. پیوندهای PDF را بعداً جایگزین کنید.",
      i1d: "۱۶ مه ۲۰۲۶",
      i1t: "اطلاعیهٔ ناظر — مسیر مدارک",
      i1p: "نحوهٔ پرسش و ثبت پیوست‌های تأییدشده.",
      i1b:
        "هماهنگ‌کنندگان درخواست را از فرم تماس می‌گیرند، با فهرست تطبیق می‌دهند و پس از انتشار PDF از سوی ناظر خلاصه را منتشر می‌کنند.",
      i2d: "۲ مه ۲۰۲۶",
      i2t: "دسترسی به کارگاه و ایمنی",
      i2p: "بازدید همراه و الزامات تجهیزات.",
      i2b: "بازدیدها حداقل دو روز کاری قبل اعلام می‌شود؛ قوانین درِ کارگاه برای همه اعمال است.",
      i3d: "۲۱ آوریل ۲۰۲۶",
      i3t: "تقویم گزارش‌دهی",
      i3p: "زمان‌بندی به‌روزرسانی‌های تجمیعی ساخت.",
      i3b: "بسته‌های تصویری فصلی و PDF خلاصه در بازه‌های ثابت هدف‌گذاری می‌شوند؛ تأخیر اینجا اعلام می‌شود.",
      i4d: "۲۷ مارس ۲۰۲۶",
      i4t: "برنامهٔ تصویربرداری پهپادی",
      i4p: "پنجرهٔ پرواز برای ثبت پیشرفت.",
      i4b: "پروازها مطابق اطلاع‌رسانی هوانوردی محلی است؛ در گالری فقط پیش‌نمایش‌های تاریخ‌دار نشان داده می‌شود.",
      pdf: "PDF جای‌گیر",
    },
  };
  const c = content[locale];
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, c.title, c.desc, "", bs)}
  <body class="hp3-body d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable position-absolute top-0 ${skipPos} bg-white px-3 py-2 z-3" href="#main">${x.skip}</a>
${nav(locale, "ann")}
    <main id="main" class="flex-grow-1 py-4 py-lg-5">
      <div class="container">
        <nav class="hp3-breadcrumb-wrap mb-3" aria-label="breadcrumb">
          <ol class="breadcrumb hp3-breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="index.html">${x.home}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${x.ann}</li>
          </ol>
        </nav>
        <header class="mb-4">
          <h1 class="h2 hp3-section-title mb-2">${c.h1}</h1>
          <p class="text-secondary mb-0">${c.sub}</p>
        </header>
        <div class="accordion shadow-sm rounded-3 overflow-hidden border hp3-card border-0" id="hp3Announcements">
          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Ann1" aria-expanded="true" aria-controls="hp3Ann1">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.i1d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.i1t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.i1p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Ann1" class="accordion-collapse collapse show" data-bs-parent="#hp3Announcements">
              <div class="accordion-body bg-white"><p class="mb-3">${c.i1b}</p><a class="btn hp3-btn-outline btn-sm" href="#">${c.pdf}</a></div>
            </div>
          </div>
          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Ann2" aria-expanded="false" aria-controls="hp3Ann2">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.i2d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.i2t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.i2p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Ann2" class="accordion-collapse collapse" data-bs-parent="#hp3Announcements">
              <div class="accordion-body bg-white"><p class="mb-3">${c.i2b}</p><a class="btn hp3-btn-outline btn-sm" href="#">${c.pdf}</a></div>
            </div>
          </div>
          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Ann3" aria-expanded="false" aria-controls="hp3Ann3">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.i3d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.i3t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.i3p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Ann3" class="accordion-collapse collapse" data-bs-parent="#hp3Announcements">
              <div class="accordion-body bg-white"><p class="mb-3">${c.i3b}</p><a class="btn hp3-btn-outline btn-sm" href="#">${c.pdf}</a></div>
            </div>
          </div>
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Ann4" aria-expanded="false" aria-controls="hp3Ann4">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.i4d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.i4t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.i4p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Ann4" class="accordion-collapse collapse" data-bs-parent="#hp3Announcements">
              <div class="accordion-body bg-white"><p class="mb-3">${c.i4b}</p><a class="btn hp3-btn-outline btn-sm" href="#">${c.pdf}</a></div>
            </div>
          </div>
        </div>
      </div>
    </main>
${footer(locale, "")}
  </body>
</html>`;
}

function meetingsPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  const skipPos = rtl ? "end-0" : "start-0";
  const content = {
    tr: {
      title: "Toplantılar — Hayat Park 3 AVM",
      desc: "Malik toplantıları — özet ve ekler",
      h1: "Toplantılar",
      sub: "En güncel toplantı üstte açılır.",
      m1d: "12 Mayıs 2026 · Çevrim içi",
      m1t: "Aylık koordinasyon görüşmesi",
      m1p: "Sigorta yenilemeleri, iskele durumu, sonraki kontrol penceresi.",
      m1b:
        "Kayyımlar duraklama dönemi lojistiğini gözden geçirdi; bağlayıcı ödemeler yalnızca imzalı duyurularla değişir. Toplantı fotoğrafları galeride “Toplantı Görselleri” altında yer alır.",
      m2d: "28 Nisan 2026 · Karma",
      m2t: "İstişare çalışması",
      m2p: "Taşeronların sahadan çekilmesi ve malik soruları.",
      m2b: "Özet; HSE uyarıları ve kişisel verilerin uygulama yerine İletişim formuyla iletilmesi gerektiğini vurgular.",
      m3d: "15 Mart 2026 · Yüz yüze",
      m3t: "Bölgesel dinleme oturumu",
      m3p: "Tercüman destekli soru-cevap.",
      m3b: "Yurtdışındaki maliklere terminoloji sözlükleri ve duyurularla eşleşen posta kutusu haritası sunuldu.",
      pdf: "PDF özeti (yer tutucu)",
      pdf2: "Tutanaklar · PDF yer tutucu",
      zip: "Ek ZIP · yer tutucu",
      imgAlt: "Toplantı görseli yer tutucu",
    },
    ar: {
      title: "الاجتماعات — Hayat Park 3",
      desc: "اجتماعات الملخصات والمرفقات",
      h1: "الاجتماعات",
      sub: "يفتح أحدث اجتماع أولًا.",
      m1d: "12 مايو 2026 · عبر الإنترنت",
      m1t: "اجتماع التنسيق الشهري",
      m1p: "تجديد التأمين، حالة السقالات، نافذة التفتيش التالية.",
      m1b:
        "راجع الوصاة لوجستيات فترة التوقف؛ لا تتغير الالتزامات المالية إلا بالتعاميم الموقعة. تُعرض صور الاجتماع في المعرض ضمن «صور الاجتماعات».",
      m2d: "28 أبريل 2026 · هجين",
      m2t: "ورشة تصعيد",
      m2p: "انسحاب المقاولين وأسئلة الملاك.",
      m2b: "يلخص المواعيد النهائية للتأمين وتذكيرات السلامة ويطلب إرسال المعرفات الشخصية عبر نموذج التواصل.",
      m3d: "15 مارس 2026 · حضوري",
      m3t: "جلسة استماع إقليمية",
      m3p: "أسئلة وأجوبة بدعم المترجمين.",
      m3b: "قدّمت مسارد مصطلحات لملاك الخارج وخريطة بريد متوافقة مع الإعلانات.",
      pdf: "ملخص PDF (تجريبي)",
      pdf2: "محضر · PDF تجريبي",
      zip: "ملحق ZIP · تجريبي",
      imgAlt: "صورة توضيحية للاجتماع",
    },
    fa: {
      title: "جلسات — حیات پارک ۳",
      desc: "جلسات مالکان — خلاصه و پیوست",
      h1: "جلسات",
      sub: "جدیدترین جلسه ابتدا باز می‌شود.",
      m1d: "۱۲ مه ۲۰۲۶ · آنلاین",
      m1t: "گفت‌وگوی هماهنگی ماهانه",
      m1p: "تمدید بیمه، وضعیت داربست، پنجرهٔ بازرسی بعدی.",
      m1b:
        "ناظران لجستیک دورهٔ توقف را مرور کردند؛ تعهدات پرداخت فقط با ابلاغ امضاشده عوض می‌شود. تصاویر جلسه در گالری زیر «تصاویر جلسات» قرار می‌گیرد.",
      m2d: "۲۸ آوریل ۲۰۲۶ · ترکیبی",
      m2t: "کارگاه رسیدگی",
      m2p: "خروج پیمانکاران و پرسش مالکان.",
      m2b: "خلاصهٔ مهلت‌های بیمه و یادآوری ایمنی؛ هویت شخصی از مسیر فرم تماس ارسال شود.",
      m3d: "۱۵ مارس ۲۰۲۶ · حضوری",
      m3t: "نشست شنیداری منطقه‌ای",
      m3p: "پرسش و پاسخ با مترجم.",
      m3b: "واژه‌نامه برای مالکان خارج از کشور و نقشهٔ ایمیل هم‌راستا با اطلاعیه‌ها ارائه شد.",
      pdf: "خلاصهٔ PDF (جای‌گیر)",
      pdf2: "صورت‌جلسه · PDF جای‌گیر",
      zip: "پیوست ZIP · جای‌گیر",
      imgAlt: "تصویر نمونهٔ جلسه",
    },
  };
  const c = content[locale];
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, c.title, c.desc, "", bs)}
  <body class="hp3-body d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable position-absolute top-0 ${skipPos} bg-white px-3 py-2 z-3" href="#main">${x.skip}</a>
${nav(locale, "mtg")}
    <main id="main" class="flex-grow-1 py-4 py-lg-5">
      <div class="container">
        <nav class="hp3-breadcrumb-wrap mb-3" aria-label="breadcrumb">
          <ol class="breadcrumb hp3-breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="index.html">${x.home}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${x.mtg}</li>
          </ol>
        </nav>
        <header class="mb-4">
          <h1 class="h2 hp3-section-title mb-2">${c.h1}</h1>
          <p class="text-secondary mb-0">${c.sub}</p>
        </header>
        <div class="accordion shadow-sm rounded-3 overflow-hidden border hp3-card border-0" id="hp3Meetings">
          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Mt1" aria-expanded="true" aria-controls="hp3Mt1">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.m1d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.m1t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.m1p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Mt1" class="accordion-collapse collapse show" data-bs-parent="#hp3Meetings">
              <div class="accordion-body bg-white">
                <div class="ratio ratio-16x9 mb-3 rounded overflow-hidden border">
                  <img class="object-fit-cover" src="https://picsum.photos/seed/hp3-meeting-cover/960/540" alt="${c.imgAlt}" loading="lazy" decoding="async" width="960" height="540" />
                </div>
                <a class="btn hp3-btn-outline btn-sm mb-3" href="#">${c.pdf}</a>
                <p class="mb-0">${c.m1b}</p>
              </div>
            </div>
          </div>
          <div class="accordion-item border-0 border-bottom">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Mt2" aria-expanded="false" aria-controls="hp3Mt2">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.m2d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.m2t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.m2p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Mt2" class="accordion-collapse collapse" data-bs-parent="#hp3Meetings">
              <div class="accordion-body bg-white">
                <a class="btn hp3-btn-outline btn-sm mb-3" href="#">${c.pdf2}</a>
                <p class="mb-0">${c.m2b}</p>
              </div>
            </div>
          </div>
          <div class="accordion-item border-0">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hp3Mt3" aria-expanded="false" aria-controls="hp3Mt3">
                <span class="d-block text-start w-100 pe-2">
                  <span class="small text-secondary d-block mb-1">${c.m3d}</span>
                  <span class="fw-semibold hp3-section-title d-block">${c.m3t}</span>
                  <span class="small text-secondary d-block mt-1 mb-0">${c.m3p}</span>
                </span>
              </button>
            </h2>
            <div id="hp3Mt3" class="accordion-collapse collapse" data-bs-parent="#hp3Meetings">
              <div class="accordion-body bg-white">
                <a class="btn hp3-btn-outline btn-sm mb-3" href="#">${c.zip}</a>
                <p class="mb-0">${c.m3b}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
${footer(locale, "")}
  </body>
</html>`;
}

["tr", "ar", "fa"].forEach((loc) => {
  const dir = path.join(root, loc);
  fs.writeFileSync(path.join(dir, "gallery.html"), galleryPage(loc));
  fs.writeFileSync(path.join(dir, "contact.html"), contactPage(loc));
  fs.writeFileSync(path.join(dir, "announcements.html"), announcementsPage(loc));
  fs.writeFileSync(path.join(dir, "meetings.html"), meetingsPage(loc));
});

console.log("Wrote tr/ar/fa gallery, contact, announcements, meetings.");
