/**
 * Generates all locale pages (en/tr/ar/fa): index, photos, videos, contact, announcements, meetings.
 * Run: node scripts/gen-locale-pages.js
 * Then: node scripts/inject-seo-static.js  (about, register, root language picker)
 */
const fs = require("fs");
const path = require("path");
const { buildSeoHead, buildWebPageJsonLd, getPageSeo } = require("./seo-meta");

const LOCALES = ["en", "tr", "ar", "fa"];

const root = path.join(__dirname, "..");

/** Single Google Form embed — same form on every locale contact page. */
const GOOGLE_FORM_IFRAME =
  '<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd-55G298FA8Cd-a4lcKoPI819dg6j_RJKVE_rI_L3l1ASQ4Q/viewform?embedded=true" width="640" height="3213" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>';

/** Site purpose copy — index highlight + footer on every page (per locale). */
const SITE_PURPOSE = {
  tr: {
    kicker: "Bağımsız bilgilendirme",
    title: "Bu sitenin amacı",
    p1: "Bu web sitesi, HayatPark AVM mağdurları ve mal sahiplerinin iletişim kurabilmesi, soru ve taleplerini iletebilmesi amacıyla hazırlanmıştır. Hiçbir ticari amaç gütmemektedir.",
    p2: "AVM'nin geleceğini konuşmak, tartışmak ve mal sahipleri olarak iletişim kurabilmek amacıyla tamamen bağımsız şekilde oluşturulmuştur. Projenin son durumuna ait detaylı fotoğraflar, videolar, toplantı notları ile soru-cevap içerikleri üzerinden mağdur olmuş mal sahiplerini bilgilendirmeyi hedeflemektedir.",
  },
  en: {
    kicker: "Independent information",
    title: "Purpose of this site",
    p1: "This website has been created to enable victims and property owners of HayatPark Shopping Mall to communicate, ask questions, and submit requests. It has no commercial purpose.",
    p2: "It was created entirely independently to discuss and debate the future of the shopping mall and to facilitate communication among property owners. It aims to inform affected property owners through detailed photos, videos, meeting notes, and question-and-answer content regarding the current status of the project.",
  },
  ar: {
    kicker: "معلومات مستقلة",
    title: "غرض هذا الموقع",
    p1: "تم إنشاء هذا الموقع الإلكتروني لتمكين ضحايا ومالكي العقارات في مركز حياة بارك التجاري من التواصل وطرح الأسئلة وتقديم الطلبات. وهو موقع غير ربحي.",
    p2: "وقد أُنشئ الموقع بشكل مستقل تمامًا لمناقشة مستقبل المركز التجاري وتيسير التواصل بين مالكي العقارات. ويهدف إلى إطلاع مالكي العقارات المتضررين على الوضع الراهن للمشروع من خلال صور ومقاطع فيديو مفصلة، ومحاضر اجتماعات، ومحتوى يتضمن أسئلة وأجوبة.",
  },
  fa: {
    kicker: "اطلاع‌رسانی مستقل",
    title: "هدف این وب‌سایت",
    p1: "این وب‌سایت به منظور فراهم کردن امکان ارتباط، پرسیدن سوال و ارسال درخواست توسط قربانیان و مالکان مرکز خرید حیات‌پارک ایجاد شده است. این وب‌سایت هیچ هدف تجاری ندارد.",
    p2: "این وب‌سایت کاملاً مستقل و برای بحث و گفتگو در مورد آینده مرکز خرید و تسهیل ارتباط بین مالکان ایجاد شده است. هدف آن اطلاع‌رسانی به مالکان املاک آسیب‌دیده از طریق عکس‌ها، ویدیوها، یادداشت‌های جلسات و محتوای پرسش و پاسخ در مورد وضعیت فعلی پروژه است.",
  },
};

function footerInner(locale) {
  const x = L[locale];
  const purpose = SITE_PURPOSE[locale];
  const rtl = locale === "ar" || locale === "fa";
  const align = rtl ? " text-lg-end" : "";
  const navAlign = rtl ? "justify-content-md-end" : "justify-content-md-start";
  const copyAlign = rtl ? "text-md-start" : "text-md-end";
  return `        <div class="hp3-footer-purpose${align}">
          <p class="small hp3-footer-notice mb-3 mb-md-0">${purpose.p1}</p>
          <p class="small hp3-footer-notice mb-0">${purpose.p2}</p>
        </div>
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 pt-3 mt-3 border-top border-white border-opacity-25">
          <nav class="hp3-footer-nav flex-wrap justify-content-center ${navAlign}" aria-label="${x.navLabel}">
${x.footerLinks}
          </nav>
          <p class="small hp3-muted-link mb-0 text-center ${copyAlign}">© <span id="footer-year">2026</span> Hayat Park 3 AVM</p>
        </div>`;
}

const QUICK_CARDS = {
  en: [
    { href: "announcements.html", title: "Announcements", desc: "Official notices and short summaries.", btn: "Open", primary: false },
    { href: "photos.html", title: "Photos", desc: "Construction progress, meetings, and drone images.", btn: "Open", primary: false },
    { href: "videos.html", title: "Videos", desc: "Project updates and recorded meetings.", btn: "Open", primary: false },
    { href: "meetings.html", title: "Meetings", desc: "Dates and written summaries.", btn: "Open", primary: false },
    { href: "contact.html", title: "Contact", desc: "Send a message via Google Form.", btn: "Open", primary: true },
  ],
  tr: [
    { href: "announcements.html", title: "Duyurular", desc: "Resmi duyurular ve kısa özetler.", btn: "Aç", primary: false },
    { href: "photos.html", title: "Fotoğraflar", desc: "İlerleme, toplantı ve drone görselleri.", btn: "Aç", primary: false },
    { href: "videos.html", title: "Videolar", desc: "Proje güncellemeleri ve kayıtlı toplantılar.", btn: "Aç", primary: false },
    { href: "meetings.html", title: "Toplantılar", desc: "Tarihler ve yazılı özetler.", btn: "Aç", primary: false },
    { href: "contact.html", title: "İletişim", desc: "Google Form ile mesaj.", btn: "Aç", primary: true },
  ],
  ar: [
    { href: "announcements.html", title: "الإعلانات", desc: "إشعارات رسمية وملخصات قصيرة.", btn: "فتح", primary: false },
    { href: "photos.html", title: "الصور", desc: "تقدم الإنشاءات، الاجتماعات والصور الجوية.", btn: "فتح", primary: false },
    { href: "videos.html", title: "مقاطع فيديو", desc: "تحديثات المشروع واجتماعات مسجلة.", btn: "فتح", primary: false },
    { href: "meetings.html", title: "الاجتماعات", desc: "التواريخ والملخصات المكتوبة.", btn: "فتح", primary: false },
    { href: "contact.html", title: "اتصل بنا", desc: "رسالة عبر Google Form.", btn: "فتح", primary: true },
  ],
  fa: [
    { href: "announcements.html", title: "اطلاعیه‌ها", desc: "اطلاعیه‌های رسمی و خلاصه‌های کوتاه.", btn: "باز کردن", primary: false },
    { href: "photos.html", title: "تصاویر", desc: "پیشرفت ساخت، جلسات و تصاویر پهپادی.", btn: "باز کردن", primary: false },
    { href: "videos.html", title: "ویدئوها", desc: "به‌روزرسانی پروژه و جلسات ضبط‌شده.", btn: "باز کردن", primary: false },
    { href: "meetings.html", title: "جلسات", desc: "تاریخ‌ها و خلاصه‌های نوشتاری.", btn: "باز کردن", primary: false },
    { href: "contact.html", title: "تماس", desc: "پیام از طریق Google Form.", btn: "باز کردن", primary: true },
  ],
};

const L = {
  en: {
    navLabel: "Footer navigation",
    skip: "Skip to content",
    brandSub: "Owners · Information desk",
    navToggle: "Toggle navigation",
    home: "Home",
    photos: "Photos",
    videos: "Videos",
    ann: "Announcements",
    mtg: "Meetings",
    contact: "Contact",
    langLabel: "English",
    footerLinks: `            <a href="index.html">Home</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="photos.html">Photos</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="videos.html">Videos</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="announcements.html">Announcements</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="meetings.html">Meetings</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="contact.html">Contact</a>`,
  },
  tr: {
    navLabel: "Alt bilgi menüsü",
    skip: "İçeriğe geç",
    brandSub: "Malikler · Bilgilendirme",
    navToggle: "Menüyü aç/kapat",
    home: "Ana Sayfa",
    photos: "Fotoğraflar",
    videos: "Videolar",
    ann: "Duyurular",
    mtg: "Toplantılar",
    contact: "İletişim",
    langLabel: "Türkçe",
    footerLinks: `            <a href="index.html">Ana Sayfa</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="photos.html">Fotoğraflar</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="videos.html">Videolar</a>
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
    videos: "مقاطع فيديو",
    ann: "الإعلانات",
    mtg: "الاجتماعات",
    contact: "اتصل بنا",
    langLabel: "العربية",
    footerLinks: `            <a href="index.html">الرئيسية</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="photos.html">الصور</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="videos.html">مقاطع فيديو</a>
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
    videos: "ویدئوها",
    ann: "اطلاعیه‌ها",
    mtg: "جلسات",
    contact: "تماس",
    langLabel: "فارسی",
    footerLinks: `            <a href="index.html">خانه</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="photos.html">تصاویر</a>
            <span class="text-white-50 d-none d-sm-inline">&nbsp;·&nbsp;</span>
            <a href="videos.html">ویدئوها</a>
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
${link("photos", "photos.html", x.photos)}
${link("videos", "videos.html", x.videos)}
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

function head(locale, extraLinks, bootstrapFile, slug, breadcrumbs) {
  const rtl = locale === "ar" || locale === "fa";
  const integ =
    bootstrapFile === "bootstrap.min.css"
      ? ' integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"'
      : ' crossorigin="anonymous"';
  const rtlCss = rtl ? '\n    <link rel="stylesheet" href="../assets/css/rtl.css" />' : "";
  const pageSlug = slug || "index.html";
  const meta = getPageSeo(locale, pageSlug);
  const seo = buildSeoHead({
    locale,
    slug: pageSlug,
    title: meta.title,
    description: meta.description,
    preloadHero: meta.preloadHero,
  });
  const jsonLd = buildWebPageJsonLd({
    locale,
    slug: pageSlug,
    title: meta.title,
    description: meta.description,
    breadcrumbs,
    includeSiteGraph: meta.includeSiteGraph,
  });
  return `  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <!-- HP3-SEO-START -->
${seo}
    <!-- HP3-SEO-END -->
    <meta name="theme-color" content="#0a1b2f" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Hayat Park 3" />
    <link rel="manifest" href="../manifest.webmanifest" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&amp;family=Noto+Sans+Arabic:wght@400;600;700&amp;family=Vazirmatn:wght@400;600;700&amp;display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/${bootstrapFile}" rel="stylesheet"${integ} />
    ${extraLinks}
    <link rel="stylesheet" href="../assets/css/style.css" />${rtlCss}
    ${jsonLd}
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

const photoFilLabels = {
  en: ["All", "Construction Progress", "Meeting Photos", "Official Documents", "Drone Imagery"],
  tr: ["Tümü", "İnşaat İlerlemesi", "Toplantı Görselleri", "Resmi Belgeler", "Drone Görselleri"],
  ar: ["الكل", "تقدم الإنشاءات", "صور الاجتماعات", "وثائق رسمية", "صور بطائرة مسيّرة"],
  fa: ["همه", "پیشرفت ساخت", "تصاویر جلسات", "اسناد رسمی", "تصاویر پهپادی"],
};

function photosPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const titles = {
    tr: "Fotoğraflar — Hayat Park 3 AVM",
    ar: "الصور — Hayat Park 3",
    fa: "تصاویر — حیات پارک ۳",
  };
  const descs = {
    tr: "Hayat Park 3 proje fotoğraf arşivi — GLightbox",
    ar: "أرشيف صور مشروع حياة بارك 3",
    fa: "آرشیو تصاویر پروژهٔ حیات پارک ۳",
  };
  const h1s = {
    tr: "Proje fotoğrafları",
    ar: "صور المشروع",
    fa: "تصاویر پروژه",
  };
  const lead = {
    tr: 'Küçük resme dokunun; tam görüntü açılır. Adresleri <code>assets/js/gallery.js</code> içinden güncelleyin.',
    ar: "اضغط المصغّرة للعرض الكامل. مرّر للتنقّل على الهاتف.",
    fa: "برای مشاهدهٔ کامل روی بندانگشتی بزنید. آدرس رسانه‌ها را در gallery.js قرار دهید.",
  };
  const cnt = { tr: "Öğe sayısı", ar: "عدد العناصر", fa: "تعداد موارد" };
  const bcAria = { tr: "Sayfa konumu", ar: "مسار التصفح", fa: "مسیر صفحه" };
  const [f0, f1, f2, f3, f4] = photoFilLabels[locale];
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, GL_CSS, bs, "photos.html", [{ name: x.home, url: "index.html" }, { name: x.photos }])}
  <body class="hp3-body d-flex flex-column min-vh-100" data-hp3-gallery-mode="photos">
${nav(locale, "photos")}
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
        <div class="hp3-gallery-filters d-flex flex-wrap gap-2 mb-4" role="toolbar" aria-label="${x.photos}">
          <button type="button" class="btn btn-primary hp3-filter-btn active" data-filter="all" data-hp3-filter-all><span>${f0}</span></button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="construction">${f1}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="meetings">${f2}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="documents">${f3}</button>
          <button type="button" class="btn btn-outline-secondary hp3-filter-btn" data-filter="drone">${f4}</button>
        </div>
        <div id="hp3-gallery-root" class="row g-4" aria-live="polite"></div>
      </div>
    </main>
${footer(locale, GL_JS)}
  </body>
</html>`;
}

function videosPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const titles = {
    tr: "Videolar — Hayat Park 3 AVM",
    ar: "مقاطع فيديو — Hayat Park 3",
    fa: "ویدئوها — حیات پارک ۳",
  };
  const descs = {
    tr: "Hayat Park 3 proje video arşivi — GLightbox",
    ar: "أرشيف مقاطع فيديو مشروع حياة بارك 3",
    fa: "آرشیو ویدئوهای پروژهٔ حیات پارک ۳",
  };
  const h1s = {
    tr: "Proje videoları",
    ar: "مقاطع فيديو المشروع",
    fa: "ویدئوهای پروژه",
  };
  const lead = {
    tr: "Küçük resme dokunun; video oynatıcı açılır. YouTube bağlantılarını <code>assets/js/gallery.js</code> içinden güncelleyin.",
    ar: "اضغط المصغّرة لتشغيل الفيديو. استبدل روابط يوتيوب في gallery.js.",
    fa: "برای پخش روی بندانگشتی بزنید. لینک‌های یوتوب را در gallery.js به‌روز کنید.",
  };
  const cnt = { tr: "Öğe sayısı", ar: "عدد العناصر", fa: "تعداد موارد" };
  const bcAria = { tr: "Sayfa konumu", ar: "مسار التصفح", fa: "مسیر صفحه" };
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, GL_CSS, bs, "videos.html", [{ name: x.home, url: "index.html" }, { name: x.videos }])}
  <body class="hp3-body d-flex flex-column min-vh-100" data-hp3-gallery-mode="videos">
${nav(locale, "videos")}
    <main id="main" class="flex-grow-1 py-4 py-lg-5">
      <div class="container">
        <nav class="hp3-breadcrumb-wrap mb-3" aria-label="${bcAria[locale]}">
          <ol class="breadcrumb hp3-breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="index.html">${x.home}</a></li>
            <li class="breadcrumb-item active" aria-current="page">${x.videos}</li>
          </ol>
        </nav>
        <header class="mb-4">
          <h1 class="h2 hp3-section-title mb-2">${h1s[locale]}</h1>
          <p class="text-secondary mb-2">${lead[locale]}</p>
          <p class="small text-secondary mb-0">${cnt[locale]}: <strong class="hp3-gallery-count-live">0</strong></p>
        </header>
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
    tr: "Sorularınızı ve taleplerinizi aşağıdaki formdan iletebilirsiniz.",
    ar: "أرسل أسئلتك وطلباتك عبر النموذج أدناه.",
    fa: "سوالات و درخواست‌های خود را از طریق فرم زیر ارسال کنید.",
  };
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  const skipPos = rtl ? "end-0" : "start-0";
  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, "", bs, "contact.html", [{ name: x.home, url: "index.html" }, { name: x.contact }])}
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
              ${GOOGLE_FORM_IFRAME}
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
    en: {
      h1: "Announcements",
      sub: "Newest item opens first. Replace PDF links with your files when ready.",
      i1d: "16 May 2026",
      i1t: "Trustee bulletin — document workflow",
      i1p: "How owners submit questions and receive verified attachments.",
      i1b:
        "Coordinators collect owner references through the Contact form, verify them against the approved list, then share PDF summaries when trustees publish them. Phone screenshots are not treated as official filings.",
      i2d: "2 May 2026",
      i2t: "Site access & safety",
      i2p: "Escorted visits, protective gear, and contractor hours.",
      i2b: "Owners must register escorted visits at least two business days in advance. Updated gate rules apply to all visitors.",
      i3d: "21 April 2026",
      i3t: "Reporting calendar",
      i3p: "When consolidated construction updates are planned.",
      i3b: "Quarterly photo packs and summary PDFs target fixed publication windows; delays are announced here.",
      i4d: "27 March 2026",
      i4t: "Drone capture schedule",
      i4p: "Flight windows for aerial progress photos.",
      i4b: "Flights follow local aviation notices; galleries show dated thumbnails only after moderation.",
      pdf: "PDF placeholder",
    },
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
${head(locale, "", bs, "announcements.html", [{ name: x.home, url: "index.html" }, { name: x.ann }])}
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
    en: {
      h1: "Meetings",
      sub: "Latest meeting opens first. Attachments are illustrative until you upload real files.",
      m1d: "12 May 2026 · Online",
      m1t: "Monthly coordination call",
      m1p: "Insurance renewals, scaffolding status, next inspection window.",
      m1b:
        "Trustees reviewed pause-period logistics, confirmed moderator contacts, and reiterated that only signed circulars change payment obligations. Meeting photos will appear on the Photos page under “Meeting Photos”.",
      m2d: "28 April 2026 · Hybrid",
      m2t: "Escalation workshop",
      m2p: "Contractor demobilization and owner questions.",
      m2b: "Summary highlights insurance deadlines, HSE reminders, and asks owners to route personal identifiers through the Contact form instead of chat apps.",
      m3d: "15 March 2026 · In person",
      m3t: "Regional listening session",
      m3p: "Interpreter-supported Q&amp;A.",
      m3b: "Provided glossary handouts for overseas owners and a mailbox map aligned with announcements.",
      pdf: "PDF summary (placeholder)",
      pdf2: "Minutes · PDF placeholder",
      zip: "Attachment ZIP · placeholder",
      imgAlt: "Meeting overview placeholder image",
    },
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
${head(locale, "", bs, "meetings.html", [{ name: x.home, url: "index.html" }, { name: x.mtg }])}
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

function indexPage(locale) {
  const rtl = locale === "ar" || locale === "fa";
  const x = L[locale];
  const purpose = SITE_PURPOSE[locale];
  const cards = QUICK_CARDS[locale];
  const bs = rtl ? "bootstrap.rtl.min.css" : "bootstrap.min.css";
  const skipPos = rtl ? "end-0" : "start-0";
  const quickCardsHtml = cards
    .map(
      (c) => `            <div class="col-6 col-md-4 col-lg">
              <article class="card hp3-card hp3-quick-card border-0 h-100 bg-white bg-opacity-10 border border-light border-opacity-25">
                <div class="card-body d-flex flex-column">
                  <h2 class="h6 text-white mb-2">${c.title}</h2>
                  <p class="small text-white-50 flex-grow-1 mb-3">${c.desc}</p>
                  <a class="btn ${c.primary ? "hp3-btn-primary" : "btn-light hp3-btn-outline"} stretched-link mt-auto" href="${c.href}">${c.btn}</a>
                </div>
              </article>
            </div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
${head(locale, "", bs, "index.html")}
  <body class="hp3-body d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable position-absolute top-0 ${skipPos} bg-white px-3 py-2 z-3" href="#main">${x.skip}</a>
${nav(locale, "home")}
    <main id="main" class="flex-grow-1">
      <section class="hp3-hero hp3-hero-photo">
        <img
          class="hp3-hero-photo-img"
          src="../images/lta-shopsforsalefromhayatpark-6.webp"
          alt=""
          width="1920"
          height="1080"
          fetchpriority="high"
          decoding="async"
          aria-hidden="true"
        />
        <div class="container">
          <div class="hp3-hero-inner hp3-hero-inner-statement py-lg-2">
            <h1 class="hp3-hero-statement mb-0">${purpose.p1}</h1>
          </div>
          <div class="row g-3 mt-4">
${quickCardsHtml}
          </div>
        </div>
      </section>

      <section class="hp3-purpose-section py-5" aria-labelledby="hp3-purpose-title">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <article class="hp3-purpose-card">
                <span class="hp3-purpose-kicker">${purpose.kicker}</span>
                <h2 id="hp3-purpose-title" class="h4 hp3-section-title mb-4">${purpose.title}</h2>
                <p class="hp3-purpose-lead mb-3">${purpose.p1}</p>
                <p class="hp3-purpose-text mb-0">${purpose.p2}</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
${footer(locale, "")}
  </body>
</html>`;
}

LOCALES.forEach((loc) => {
  const dir = path.join(root, loc);
  fs.writeFileSync(path.join(dir, "index.html"), indexPage(loc));
  fs.writeFileSync(path.join(dir, "photos.html"), photosPage(loc));
  fs.writeFileSync(path.join(dir, "videos.html"), videosPage(loc));
  fs.writeFileSync(path.join(dir, "contact.html"), contactPage(loc));
  fs.writeFileSync(path.join(dir, "announcements.html"), announcementsPage(loc));
  fs.writeFileSync(path.join(dir, "meetings.html"), meetingsPage(loc));
});

console.log("Wrote en/tr/ar/fa index, photos, videos, contact, announcements, meetings.");
