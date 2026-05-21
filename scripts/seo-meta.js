/**
 * Shared SEO head + JSON-LD builder for Hayat Park 3 AVM static pages.
 * Run generators: node scripts/gen-locale-pages.js && node scripts/inject-seo-static.js
 */
const SITE = {
  baseUrl: "https://hayatparkkoordinasyon-ux.github.io/hayat-park-3-avm",
  siteName: "Hayat Park 3 AVM — Owners",
  orgName: "Hayat Park 3 AVM Owner Coordination",
  twitterCard: "summary_large_image",
  defaultOgImage: "/images/lta-shopsforsalefromhayatpark-6.webp",
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

const OG_LOCALE = {
  en: "en_US",
  tr: "tr_TR",
  ar: "ar_SA",
  fa: "fa_IR",
};

const SCHEMA_LANG = {
  en: "en-US",
  tr: "tr-TR",
  ar: "ar-SA",
  fa: "fa-IR",
};

/** Localized title + meta description per page (150–160 char descriptions where possible). */
const PAGE_SEO = {
  "index.html": {
    en: {
      title: "Hayat Park 3 Owner Portal — Updates & Contact | HP3",
      description:
        "Independent Hayat Park 3 AVM owner portal with announcements, meeting notes, project photos, videos, and a contact form. Non-commercial information only.",
      preloadHero: true,
      includeSiteGraph: true,
    },
    tr: {
      title: "Hayat Park 3 Malik Portalı — Duyuru ve İletişim | HP3",
      description:
        "Hayat Park 3 AVM malikleri için bağımsız bilgi portalı: duyurular, toplantı notları, proje fotoğrafları, videolar ve iletişim formu. Ticari amaç gütmez.",
      preloadHero: true,
      includeSiteGraph: true,
    },
    ar: {
      title: "بوابة ملاك حياة بارك 3 — تحديثات وتواصل | HP3",
      description:
        "بوابة معلومات مستقلة لملاك مركز حياة بارك 3: إعلانات، محاضر اجتماعات، صور المشروع، مقاطع فيديو ونموذج تواصل. موقع غير تجاري.",
      preloadHero: true,
      includeSiteGraph: true,
    },
    fa: {
      title: "پرتال مالکان حیات پارک ۳ — به‌روزرسانی و تماس | HP3",
      description:
        "پرتال اطلاع‌رسانی مستقل مالکان حیات پارک ۳: اطلاعیه‌ها، یادداشت جلسات، عکس‌های پروژه، ویدئوها و فرم تماس. بدون هدف تجاری.",
      preloadHero: true,
      includeSiteGraph: true,
    },
  },
  "photos.html": {
    en: {
      title: "Hayat Park 3 Project Photos — Construction & Drone | HP3",
      description:
        "Browse Hayat Park 3 AVM construction progress, meeting photos, official documents, and drone imagery. Filterable gallery with lightbox viewer for owners.",
    },
    tr: {
      title: "Hayat Park 3 Proje Fotoğrafları — İnşaat ve Drone | HP3",
      description:
        "Hayat Park 3 AVM inşaat ilerlemesi, toplantı görselleri, resmi belgeler ve drone fotoğrafları. Malikler için filtrelenebilir galeri ve lightbox görüntüleyici.",
    },
    ar: {
      title: "صور مشروع حياة بارك 3 — الإنشاءات والطائرات | HP3",
      description:
        "تصفح صور تقدم إنشاءات حياة بارك 3، صور الاجتماعات، الوثائق الرسمية والتصوير الجوي. معرض قابل للتصفية مع عارض lightbox للملاك.",
    },
    fa: {
      title: "عکس‌های پروژه حیات پارک ۳ — ساخت و پهپاد | HP3",
      description:
        "پیشرفت ساخت حیات پارک ۳، تصاویر جلسات، اسناد رسمی و عکس‌های پهپادی را مرور کنید. گالری فیلترشونده با lightbox برای مالکان.",
    },
  },
  "videos.html": {
    en: {
      title: "Hayat Park 3 Project Videos — Updates & Meetings | HP3",
      description:
        "Watch Hayat Park 3 AVM project update videos and recorded owner meetings. Embedded playback with a searchable gallery for multilingual stakeholders.",
    },
    tr: {
      title: "Hayat Park 3 Proje Videoları — Güncelleme ve Toplantı | HP3",
      description:
        "Hayat Park 3 AVM proje güncelleme videoları ve kayıtlı malik toplantılarını izleyin. Çok dilli paydaşlar için aranabilir galeri ve gömülü oynatıcı.",
    },
    ar: {
      title: "فيديوهات مشروع حياة بارك 3 — تحديثات واجتماعات | HP3",
      description:
        "شاهد مقاطع تحديث مشروع حياة بارك 3 واجتماعات الملاك المسجلة. معرض قابل للبحث مع تشغيل مدمج لأصحاب المصلحة متعددي اللغات.",
    },
    fa: {
      title: "ویدئوهای پروژه حیات پارک ۳ — به‌روزرسانی و جلسات | HP3",
      description:
        "ویدئوهای به‌روزرسانی پروژه حیات پارک ۳ و جلسات ضبط‌شده مالکان را تماشا کنید. گالری قابل جستجو با پخش تعبیه‌شده برای ذینفعان چندزبانه.",
    },
  },
  "contact.html": {
    en: {
      title: "Contact Hayat Park 3 Owners — Secure Google Form | HP3",
      description:
        "Reach Hayat Park 3 AVM owner coordinators via a moderated Google Form. Submit questions and requests in Turkish, English, Arabic, or Persian.",
    },
    tr: {
      title: "Hayat Park 3 İletişim — Malik Formu Google Form | HP3",
      description:
        "Hayat Park 3 AVM malik koordinatörlerine moderasyonlu Google Form ile ulaşın. Türkçe, İngilizce, Arapça veya Farsça soru ve talep iletin.",
    },
    ar: {
      title: "اتصل بملاك حياة بارك 3 — نموذج Google آمن | HP3",
      description:
        "تواصل مع منسقي ملاك حياة بارك 3 عبر نموذج Google خاضع للإشراف. أرسل الأسئلة والطلبات بالتركية أو الإنجليزية أو العربية أو الفارسية.",
    },
    fa: {
      title: "تماس مالکان حیات پارک ۳ — فرم Google امن | HP3",
      description:
        "از طریق فرم Google نظارت‌شده با هماهنگ‌کنندگان مالکان حیات پارک ۳ تماس بگیرید. سوالات و درخواست‌ها را به ترکی، انگلیسی، عربی یا فارسی ارسال کنید.",
    },
  },
  "announcements.html": {
    en: {
      title: "Hayat Park 3 Announcements — Owner Notices | HP3",
      description:
        "Hayat Park 3 AVM owner announcements: trustee bulletins, site access updates, reporting calendars, and drone schedules. Newest notices listed first.",
    },
    tr: {
      title: "Hayat Park 3 Duyurular — Malik Bildirimleri | HP3",
      description:
        "Hayat Park 3 AVM malik duyuruları: kayyım bültenleri, şantiye erişimi, raporlama takvimi ve drone programı. En güncel bildirimler üstte listelenir.",
    },
    ar: {
      title: "إعلانات حياة بارك 3 — نشرات الملاك | HP3",
      description:
        "إعلانات ملاك حياة بارك 3: نشرات الوصي، تحديثات الدخول للموقع، جداول التقارير وبرامج الطائرات المسيّرة. أحدث الإعلانات في الأعلى.",
    },
    fa: {
      title: "اطلاعیه‌های حیات پارک ۳ — ابلاغیه مالکان | HP3",
      description:
        "اطلاعیه‌های مالکان حیات پارک ۳: بولتن ناظر، دسترسی کارگاه، تقویم گزارش‌دهی و برنامه پهپاد. جدیدترین اطلاعیه‌ها در بالا فهرست شده‌اند.",
    },
  },
  "meetings.html": {
    en: {
      title: "Hayat Park 3 Owner Meetings — Summaries & Notes | HP3",
      description:
        "Hayat Park 3 AVM owner meeting dates, written summaries, and attachment placeholders. Latest coordination calls and regional sessions for stakeholders.",
    },
    tr: {
      title: "Hayat Park 3 Toplantılar — Özetler ve Notlar | HP3",
      description:
        "Hayat Park 3 AVM malik toplantı tarihleri, yazılı özetler ve ek yer tutucuları. Paydaşlar için en güncel koordinasyon görüşmeleri ve bölgesel oturumlar.",
    },
    ar: {
      title: "اجتماعات ملاك حياة بارك 3 — ملخصات ومحاضر | HP3",
      description:
        "تواريخ اجتماعات ملاك حياة بارك 3، ملخصات مكتوبة ومرفقات توضيحية. أحدث مكالمات التنسيق والجلسات الإقليمية لأصحاب المصلحة.",
    },
    fa: {
      title: "جلسات مالکان حیات پارک ۳ — خلاصه و یادداشت | HP3",
      description:
        "تاریخ جلسات مالکان حیات پارک ۳، خلاصه‌های نوشتاری و پیوست‌های نمونه. جدیدترین تماس‌های هماهنگی و نشست‌های منطقه‌ای برای ذینفعان.",
    },
  },
  "about.html": {
    en: {
      title: "About Hayat Park 3 Portal — Owner Coordination | HP3",
      description:
        "Learn how the Hayat Park 3 owner coordination portal works, its multilingual mission, legal-neutral wording, and an illustrative trustee-phase timeline.",
    },
    tr: {
      title: "Hayat Park 3 Hakkında — Malik Koordinasyonu | HP3",
      description:
        "Hayat Park 3 malik koordinasyon portalının amacı, çok dilli misyonu, hukuki tarafsız dil kullanımı ve kayyım sürecine ilişkin örnek zaman çizelgesi.",
    },
    ar: {
      title: "حول بوابة حياة بارك 3 — تنسيق الملاك | HP3",
      description:
        "تعرّف على بوابة تنسيق ملاك حياة بارك 3، مهمتها متعددة اللغات، الصياغة المحايدة قانونياً والجدول الزمني التوضيحي لمرحلة الوصاية.",
    },
    fa: {
      title: "درباره پرتال حیات پارک ۳ — هماهنگی مالکان | HP3",
      description:
        "با پرتال هماهنگی مالکان حیات پارک ۳، مأموریت چندزبانه، بیان خنثی حقوقی و جدول زمانی نمونه فاز ناظر آشنا شوید.",
    },
  },
  "register.html": {
    en: {
      title: "Register — Hayat Park 3 Owner Updates List | HP3",
      description:
        "Register your Hayat Park 3 AVM unit reference to receive curated trustee updates mirrored in Turkish, English, Arabic, and Persian.",
    },
    tr: {
      title: "Kayıt — Hayat Park 3 Malik Güncelleme Listesi | HP3",
      description:
        "Hayat Park 3 AVM birim referansınızı kaydedin; Türkçe, İngilizce, Arapça ve Farsça yansıtılan kayyım güncellemelerini alın.",
    },
    ar: {
      title: "التسجيل — قائمة تحديثات ملاك حياة بارك 3 | HP3",
      description:
        "سجّل مرجع وحدتك في حياة بارك 3 لتلقي تحديثات الوصي المنقحة بالتركية والإنجليزية والعربية والفارسية.",
    },
    fa: {
      title: "ثبت‌نام — فهرست به‌روزرسانی مالکان حیات پارک ۳ | HP3",
      description:
        "مرجع واحد خود در حیات پارک ۳ را ثبت کنید تا به‌روزرسانی‌های ناظر به ترکی، انگلیسی، عربی و فارسی دریافت کنید.",
    },
  },
  "root-index.html": {
    en: {
      title: "Hayat Park 3 AVM — Choose Your Language | HP3",
      description:
        "Multilingual Hayat Park 3 AVM owner portal. Choose Turkish, English, Arabic, or Persian for announcements, photos, videos, meetings, and contact.",
      includeSiteGraph: true,
    },
  },
};

const SITE_GRAPH_COPY = {
  en: {
    websiteDesc: "Independent multilingual information desk for Hayat Park 3 AVM property owners.",
    orgDesc: "Non-commercial owner coordination portal for Hayat Park 3 shopping mall stakeholders.",
  },
  tr: {
    websiteDesc: "Hayat Park 3 AVM malikleri için bağımsız çok dilli bilgilendirme masası.",
    orgDesc: "Hayat Park 3 alışveriş merkezi paydaşları için ticari olmayan malik koordinasyon portalı.",
  },
  ar: {
    websiteDesc: "مكتب معلومات مستقل متعدد اللغات لملاك مركز حياة بارك 3 التجاري.",
    orgDesc: "بوابة تنسيق غير تجارية لملاك ومستثمري مركز حياة بارك 3.",
  },
  fa: {
    websiteDesc: "میز اطلاع‌رسانی مستقل چندزبانه برای مالکان مرکز خرید حیات پارک ۳.",
    orgDesc: "پرتال هماهنگی غیرتجاری ذینفعان و مالکان مرکز خرید حیات پارک ۳.",
  },
};

function getPageSeo(locale, slug) {
  const page = PAGE_SEO[slug];
  if (!page || !page[locale]) {
    throw new Error(`Missing PAGE_SEO entry for ${locale}/${slug}`);
  }
  return page[locale];
}

function absUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.baseUrl}${p}`;
}

function pageUrl(locale, slug) {
  if (slug === "root-index.html") {
    return absUrl("/index.html");
  }
  return absUrl(`${locale}/${slug}`);
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function buildSeoHead(opts) {
  const {
    locale,
    slug,
    title,
    description,
    ogTitle = title,
    ogDescription = description,
    ogImage = SITE.defaultOgImage,
    robots = "index, follow",
    preloadHero = false,
  } = opts;

  const canonical = pageUrl(locale, slug);
  const ogImageAbs = absUrl(ogImage);
  const ogLocale = OG_LOCALE[locale] || "en_US";

  const alternateSlugs =
    slug === "root-index.html"
      ? ["tr", "en", "ar", "fa"].map((loc) => [loc, pageUrl(loc, "index.html")])
      : ["tr", "en", "ar", "fa"].map((loc) => [loc, pageUrl(loc, slug)]);

  const xDefaultSlug = slug === "root-index.html" ? "index.html" : slug;

  const alternates =
    alternateSlugs
      .map(
        ([loc, href]) =>
          `    <link rel="alternate" hreflang="${loc}" href="${escapeAttr(href)}" />`
      )
      .join("\n") +
    `\n    <link rel="alternate" hreflang="x-default" href="${escapeAttr(pageUrl("en", xDefaultSlug))}" />`;

  // Preload must match the hero <img src> exactly (CSS backgrounds do not consume preload).
  const heroPreload = preloadHero
    ? `\n    <link rel="preload" as="image" href="../images/lta-shopsforsalefromhayatpark-6.webp" type="image/webp" fetchpriority="high" />`
    : "";

  return `    <meta name="robots" content="${escapeAttr(robots)}" />
    <meta name="description" content="${escapeAttr(description)}" />
    <title>${escapeAttr(title)}</title>
    <link rel="canonical" href="${escapeAttr(canonical)}" />
${alternates}
    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeAttr(SITE.siteName)}" />
    <meta property="og:title" content="${escapeAttr(ogTitle)}" />
    <meta property="og:description" content="${escapeAttr(ogDescription)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:image" content="${escapeAttr(ogImageAbs)}" />
    <meta property="og:image:width" content="${SITE.ogImageWidth}" />
    <meta property="og:image:height" content="${SITE.ogImageHeight}" />
    <meta property="og:locale" content="${ogLocale}" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="${SITE.twitterCard}" />
    <meta name="twitter:title" content="${escapeAttr(ogTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(ogDescription)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImageAbs)}" />${heroPreload}`;
}

function buildWebPageJsonLd(opts) {
  const { locale, slug, title, description, breadcrumbs, includeSiteGraph = false } = opts;
  const pageId = `${pageUrl(locale, slug)}#webpage`;
  const websiteId = `${SITE.baseUrl}/#website`;
  const orgId = `${SITE.baseUrl}/#organization`;
  const copy = SITE_GRAPH_COPY[locale] || SITE_GRAPH_COPY.en;

  const graph = [];

  if (includeSiteGraph) {
    graph.push(
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE.baseUrl}/`,
        name: SITE.siteName,
        description: copy.websiteDesc,
        inLanguage: ["tr", "en", "ar", "fa"],
        publisher: { "@id": orgId },
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE.orgName,
        url: `${SITE.baseUrl}/`,
        description: copy.orgDesc,
        areaServed: { "@type": "Country", name: "Turkey" },
      }
    );
  }

  graph.push({
    "@type": "WebPage",
    "@id": pageId,
    url: pageUrl(locale, slug),
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    inLanguage: SCHEMA_LANG[locale] || "en-US",
    about: { "@id": orgId },
  });

  if (breadcrumbs && breadcrumbs.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl(locale, slug)}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url ? pageUrl(locale, item.url) : pageUrl(locale, slug),
      })),
    });
  }

  return `<script type="application/ld+json">
${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2)}
</script>`;
}

/** Replace SEO block in an existing HTML file (for hand-maintained pages). */
function stripLegacySeo(html) {
  let out = html.replace(/<!-- HP3-SEO-START -->[\s\S]*?<!-- HP3-SEO-END -->\s*/g, "");
  out = out.replace(/<meta name="robots"[^>]*>\s*/gi, "");
  out = out.replace(/<meta name="description"[^>]*>\s*/gi, "");
  out = out.replace(/<title>[^<]*<\/title>\s*/gi, "");
  out = out.replace(/<link rel="canonical"[^>]*>\s*/gi, "");
  out = out.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/gi, "");
  out = out.replace(/<meta property="og:[^"]*"[^>]*>\s*/gi, "");
  out = out.replace(/<meta name="twitter:[^"]*"[^>]*>\s*/gi, "");
  out = out.replace(/<!-- Open Graph -->[\s\S]*?<!-- Twitter Card -->[\s\S]*?\n\s*/gi, "");
  out = out.replace(/<link rel="preload" as="image" href="\.\.\/images\/lta-shopsforsalefromhayatpark-6\.webp"[^>]*>\s*/gi, "");
  out = out.replace(/<link rel="preload" as="image" href="\.\/images\/lta-shopsforsalefromhayatpark-6\.webp"[^>]*>\s*/gi, "");
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
  return out;
}

function injectSeoIntoHtml(html, locale, slug, breadcrumbs) {
  const meta = getPageSeo(locale, slug);
  const seoBlock = buildSeoHead({
    locale,
    slug,
    title: meta.title,
    description: meta.description,
    preloadHero: meta.preloadHero,
  });
  const jsonLd = buildWebPageJsonLd({
    locale,
    slug,
    title: meta.title,
    description: meta.description,
    breadcrumbs,
    includeSiteGraph: meta.includeSiteGraph,
  });

  let out = stripLegacySeo(html);

  out = out.replace(
    /(<meta name="viewport"[^>]*>\s*)/,
    `$1<!-- HP3-SEO-START -->\n${seoBlock}\n    <!-- HP3-SEO-END -->\n    `
  );

  if (/<link rel="stylesheet" href="\.\.\/assets\/css\/style\.css" \/>/.test(out)) {
    out = out.replace(
      /(<link rel="stylesheet" href="\.\.\/assets\/css\/style\.css" \/>)/,
      `$1\n    ${jsonLd}`
    );
  } else if (/<link rel="stylesheet" href="\.\/assets\/css\/style\.css" \/>/.test(out)) {
    out = out.replace(
      /(<link rel="stylesheet" href="\.\/assets\/css\/style\.css" \/>)/,
      `$1\n    ${jsonLd}`
    );
  } else {
    out = out.replace(/<\/head>/, `    ${jsonLd}\n  </head>`);
  }

  return out;
}

module.exports = {
  SITE,
  PAGE_SEO,
  getPageSeo,
  absUrl,
  pageUrl,
  buildSeoHead,
  buildWebPageJsonLd,
  injectSeoIntoHtml,
};
