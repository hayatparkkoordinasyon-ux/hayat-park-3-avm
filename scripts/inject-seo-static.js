/**
 * Injects multilingual SEO into hand-maintained pages: about, register, root language picker.
 * Run after: node scripts/gen-locale-pages.js
 */
const fs = require("fs");
const path = require("path");
const { injectSeoIntoHtml } = require("./seo-meta");

const root = path.join(__dirname, "..");
const LOCALES = ["en", "tr", "ar", "fa"];

const BC = {
  en: { home: "Home", about: "About", register: "Registration" },
  tr: { home: "Ana Sayfa", about: "Hakkında", register: "Kayıt" },
  ar: { home: "الرئيسية", about: "حول", register: "التسجيل" },
  fa: { home: "خانه", about: "درباره", register: "ثبت‌نام" },
};

LOCALES.forEach((locale) => {
  const crumbs = BC[locale];

  for (const [slug, breadcrumbs] of [
    ["about.html", [{ name: crumbs.home, url: "index.html" }, { name: crumbs.about }]],
    ["register.html", [{ name: crumbs.home, url: "index.html" }, { name: crumbs.register }]],
  ]) {
    const file = path.join(root, locale, slug);
    if (!fs.existsSync(file)) {
      console.warn("Skip missing:", file);
      continue;
    }
    const html = injectSeoIntoHtml(fs.readFileSync(file, "utf8"), locale, slug, breadcrumbs);
    fs.writeFileSync(file, html);
    console.log("SEO injected:", `${locale}/${slug}`);
  }
});

const rootIndex = path.join(root, "index.html");
if (fs.existsSync(rootIndex)) {
  const html = injectSeoIntoHtml(fs.readFileSync(rootIndex, "utf8"), "en", "root-index.html");
  fs.writeFileSync(rootIndex, html);
  console.log("SEO injected: index.html (language picker)");
}
