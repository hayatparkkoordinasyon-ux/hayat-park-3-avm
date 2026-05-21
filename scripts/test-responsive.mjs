import { chromium } from "playwright";
import { createServer } from "http";
import { readFile } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const widths = [320, 375, 425, 768, 1024];
const pages = [
  "/index.html",
  "/en/index.html",
  "/en/photos.html",
  "/en/contact.html",
  "/en/about.html",
];

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".webp": "image/webp",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
};

function serveStatic(req, res) {
  let path = decodeURIComponent(req.url.split("?")[0]);
  if (path === "/") path = "/index.html";
  const filePath = join(root, path.replace(/^\//, "").replace(/\.\./g, ""));
  readFile(filePath)
    .then((data) => {
      res.writeHead(200, { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
      res.end(data);
    })
    .catch(() => {
      res.writeHead(404);
      res.end("Not found");
    });
}

const server = createServer(serveStatic);
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
const issues = [];

for (const pagePath of pages) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height: 800 });
    await page.goto(`${base}${pagePath}`, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const viewWidth = document.documentElement.clientWidth;
      const overflow = docWidth > viewWidth + 1;
      const smallText = [];
      document.querySelectorAll("*").forEach((el) => {
        const style = getComputedStyle(el);
        const fs = parseFloat(style.fontSize);
        const text = el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim() : "";
        if (text.length > 8 && fs > 0 && fs < 12) {
          smallText.push({ tag: el.tagName, fs, text: text.slice(0, 40) });
        }
      });
      const smallBtns = [];
      document.querySelectorAll("a.btn, button.btn, .nav-link").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.height < 44 || r.width < 44)) {
          smallBtns.push({ h: Math.round(r.height), w: Math.round(r.width), text: el.textContent.trim().slice(0, 30) });
        }
      });
      return { overflow, docWidth, viewWidth, smallText: smallText.slice(0, 3), smallBtns: smallBtns.slice(0, 5) };
    });
    if (result.overflow || result.smallBtns.length) {
      issues.push({ pagePath, width, ...result });
    }
    await page.close();
  }
}

await browser.close();
server.close();

if (issues.length === 0) {
  console.log("No overflow or small touch target issues found.");
} else {
  console.log(JSON.stringify(issues, null, 2));
}
