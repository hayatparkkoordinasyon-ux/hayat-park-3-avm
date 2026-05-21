/**
 * Single global informational footer injected on every page (all locales).
 * Maintain this file when the collective footer message changes.
 */
(function () {
  "use strict";

  var yr = String(new Date().getFullYear());

  /* eslint-disable indent */
  var html =
    '<div class="container py-4 py-lg-5">' +
    '<div class="hp3-footer-mega-kicker">' +
    "Same bilingual notice everywhere · Hayat&nbsp;Park&nbsp;3&nbsp;AVM informational layer" +
    "</div>" +
    '<p class="hp3-muted-link small mb-4">' +
    "This extended footer repeats across Turkish, English, Arabic, and Persian routes so stakeholders always read the exact same foundational narrative." +
    " The site describes how the <strong>Hayat&nbsp;Park&nbsp;3</strong> corridor is envisaged purely as <strong>non-binding information</strong>; it never replaces treaties," +
    " court instruments, fiduciary letters to banks, or other instruments that create legal effects." +
    "</p>" +
    '<hr class="hp3-footer-rule" />' +
    "<h3>Proje özeti · Project snapshot (Turkish)</h3>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>Hayat&nbsp;Park&nbsp;3&nbsp;AVM</strong> planı; karma kullanım poduyla birlikte perakende, ofis blokları,' +
    " lojistik servis çıkışları ve yürüyen ya da konut kullanıcılarını bağlayacak bağlantılar üzerinden kurgulanan bir kütle geliştirmedir." +
    " Farklı diller bu sayfadaki bloklar yüzünden değişse de <strong>aynı fotoğraf arşivi, duyuru notları ve toplantı notları</strong>, mümkün olduğunca eş zamanlı tutulması hedeflenmiştir." +
    "</p>" +
    '<p class="hp3-footer-mega-p">' +
    "<strong>Yapım çizelgesi</strong> resmi olarak yavaşlamış ya da hakim tayin süreçleri sırasında olsa bile bu web yüzünün rolü kolektifi bilgilendirmektir;" +
    " bağlayıcı talimat yazılı olarak hangi makamdan çıktıysa ona uyulur." +
    "</p>" +
    '<p class="hp3-footer-mega-p">' +
    "<strong>Malik topluluğu olarak</strong> yurt dışından gelen hissedarların da dahil olduğu geniş katılımla yönlendirildiğinden Türkçe ve İngilizce bloklar sırayla yayımlanıyor." +
    " Arapça ve Farsça arayüzlerdeki içerik aynı iskelette kalsa da bağlayıcı sürüm sırası yayın zamanınıza bağlı olarak değişebilir." +
    "</p>" +
    "<h3>Mixed-use storyboard (English)</h3>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>Hayat&nbsp;Park&nbsp;3&nbsp;AVM</strong> stitches together programmable retail fronts, speculative office strata,' +
    " service cores delivering operational logistics, plus residential slabs that hinge on podium-level amenity corridors." +
    " The <strong>information architecture</strong> you are browsing was assembled so foreign-national owners witness the identical disclosure package as Istanbul-based peers before involving counsel." +
    "</p>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>Construction dossiers,</strong> UAV corridors, scaffolding logs, moderated Google&nbsp;Forms, PDF annex placeholders, multilingual bullet lists, and moderated meeting minutes' +
    " each serve as explanatory scaffolding—they do not certify financial standing, escrow balances, tenant mix, lift warranties, sprinkler acceptance, façade engineering sign-offs," +
    " or any underwriting statement unless an uploaded attachment explicitly cites a certified issuer." +
    "</p>" +
    '<hr class="hp3-footer-rule" />' +
    "<h3>Editoryal yaklaşım · Editorial safeguards</h3>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>Yayın masası,</strong> uzaktan fotoğraf topluluğundan gelen kareleri sıralayıp gerekiyorsa EXIF tarih kodlarını sade tutar;' +
    " moderatör raporları yalnızca özet çıkar olarak paylaşılır ve ham dosyalar sadece kilitli klasör bağlantılarınızda kalır." +
    "</p>" +
    '<p class="hp3-footer-mega-p">' +
    "<strong>Editörler,</strong> Google Drive ve Workspace yer tutucu adreslerinin kırılıp görünür olabileceği durumu bilerek hazırdır;" +
    " resmi doğrulanmış adresler teslim olana dek boş linkler özellikle tutulmuş olabilir." +
    "</p>" +
    "<h3>Open feedback loop</h3>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>Conflict resolution cues</strong> encourage owners to escalate via moderated forms, multilingual mailboxes listed on Contact," +
    " or fiduciary banks when supporting evidence outweighs anecdotal chatter on messaging apps." +
    " Each escalation path repeats that attachments should avoid leaking national ID numbers openly." +
    "</p>" +
    '<hr class="hp3-footer-rule" />' +
    "<h3>Sorumluluk ve kapsam · Liability framing</h3>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>Bu blokta</strong> yatırım tavsiyesi, hukuki tasvip, güvence veya ekspertiz yorumu yapılmaz;" +
    " resmi bildirimin yerini alacak içerik yoktur;" +
    " platform yalnızca kolektifi haberdar etmek için üretilmiştir." +
    "</p>" +
    '<p class="hp3-footer-mega-p">' +
    '<strong>English recap:</strong> Nothing here constitutes audited engineering sign-off;" +
    " nothing infers banker release of retained amounts; readers must obtain counsel-qualified opinions before wagering positions in cross-border portfolios." +
    "</p>" +
    '<hr class="hp3-footer-rule" />' +
    '<div class="hp3-footer-mega-quick d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">' +
    '<div class="d-flex flex-wrap gap-2 gap-sm-3 justify-content-center justify-content-lg-start small">' +
    '<a href="index.html">Ana · Home</a><span class="text-white-50">|</span>' +
    '<a href="about.html">Hakkında · About</a><span class="text-white-50">|</span>' +
    '<a href="gallery.html">Galeri · Project Photos</a><span class="text-white-50">|</span>' +
    '<a href="announcements.html">Duyurular · Announcements</a><span class="text-white-50">|</span>' +
    '<a href="meetings.html">Toplantılar · Meetings</a><span class="text-white-50">|</span>' +
    '<a href="contact.html">İletişim · Contact</a><span class="text-white-50">|</span>' +
    '<a href="register.html">Kayıt · Register</a>' +
    "</div>" +
    '<p class="hp3-muted-link mb-0 small text-center text-lg-end flex-grow-1">' +
    "&copy;&nbsp;<span id=\"footer-year\">" +
    yr +
    "</span>&nbsp;Hayat&nbsp;Park&nbsp;3&nbsp;mixed-use dossier corpus" +
    "</p>" +
    "</div>" +
    '<p class="hp3-footer-mega-note mb-0">' +
    '<strong>Maintenance cue:</strong> Update this narrative solely inside&nbsp;<code>assets/js/site-footer.js</code> so multilingual pages remain synchronized regardless of whichever language navbar you used above." +
    "</p>" +
    "</div>";
  /* eslint-enable indent */

  var slot = document.getElementById("hp3-footer-mount");
  if (!slot) {
    return;
  }

  slot.innerHTML = html;

  var fy = document.getElementById("footer-year");
  if (fy) {
    fy.textContent = yr;
  }
})();
