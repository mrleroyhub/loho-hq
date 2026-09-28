/* =====================================================================
   LOHO HQ  ·  js/home.js
   Homepage-only: hero illustration + live clock, featured grid,
   category tiles, best-seller carousel, about illustration.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var P = window.LOHO_PRODUCTS;

  /* ---- cinematic hero: parallax + scroll cue ---- */
  var heroSection = document.getElementById("cinematicHero");
  var heroMedia = document.getElementById("heroMedia");
  if (heroSection && heroMedia && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var rect = heroSection.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var progress = Math.min(1, Math.max(0, -rect.top / rect.height));
          heroMedia.style.transform = "translateY(" + (progress * 70).toFixed(1) + "px) scale(" + (1 + progress * 0.08).toFixed(3) + ")";
        }
        ticking = false;
      });
    }, { passive: true });
  }
  var scrollCue = document.querySelector(".hero-scrollcue");
  if (scrollCue) {
    scrollCue.addEventListener("click", function () {
      window.scrollTo({ top: window.innerHeight * 0.86, behavior: "smooth" });
    });
  }
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  }

  /* ---- "from ₦x" chip: lowest price in the catalogue ---- */
  var fromPriceEl = document.getElementById("heroFromPrice");
  if (fromPriceEl) {
    var lowest = Math.min.apply(null, P.map(function (p) { return p.price; }));
    fromPriceEl.textContent = money(lowest);
  }

  /* ---- featured watches ---- */
  var featured = P.filter(function (p) { return p.tags.indexOf("featured") > -1; }).slice(0, 8);
  renderGrid(document.getElementById("featuredGrid"), featured);

  /* ---- best sellers carousel ---- */
  var bestsellers = P.filter(function (p) { return p.tags.indexOf("bestseller") > -1; });
  renderGrid(document.getElementById("bestsellerCarousel"), bestsellers);
  var carousel = document.getElementById("bestsellerCarousel");
  var prevBtn = document.getElementById("carouselPrev");
  var nextBtn = document.getElementById("carouselNext");
  if (carousel && prevBtn && nextBtn) {
    var scrollBy = function (dir) { carousel.scrollBy({ left: dir * (carousel.clientWidth * 0.8), behavior: "smooth" }); };
    prevBtn.addEventListener("click", function () { scrollBy(-1); });
    nextBtn.addEventListener("click", function () { scrollBy(1); });
  }

  /* ---- category bento ---- */
  function firstMatch(fn) {
    var m = P.filter(fn);
    if (!m.length) return P[0];
    var photographed = m.find(function (p) { return p.images && p.images.length; });
    return photographed || m[0];
  }
  var categories = [
    { label: "New Arrivals", href: "shop.html?tag=new", size: "large", match: function (p) { return p.tags.indexOf("new") > -1; } },
    { label: "Men", href: "shop.html?gender=men", size: "", match: function (p) { return p.gender === "men"; } },
    { label: "Women", href: "shop.html?gender=women", size: "", match: function (p) { return p.gender === "women"; } },
    { label: "Rubber Strap", href: "shop.html?strap=rubber", size: "tall", match: function (p) { return p.art.strapType === "rubber"; } },
    { label: "Classic", href: "shop.html?tag=classic", size: "", match: function (p) { return p.tags.indexOf("classic") > -1; } },
    { label: "Unisex", href: "shop.html?gender=unisex", size: "", match: function (p) { return p.gender === "unisex"; } }
  ];
  var bentoEl = document.getElementById("categoryBento");
  if (bentoEl) {
    bentoEl.innerHTML = categories.map(function (c) {
      var p = firstMatch(c.match);
      var media = productMediaHTML(p, c.label);
      return '<a class="cat-tile' + (c.size ? " " + c.size : "") + '" href="' + c.href + '">' + media + "<span>" + c.label + "</span></a>";
    }).join("");
  }

  /* ---- about photo ---- */
  var aboutArtEl = document.getElementById("aboutArt");
  if (aboutArtEl && !aboutArtEl.dataset.filled) {
    aboutArtEl.dataset.filled = "1";
    aboutArtEl.innerHTML = '<img src="images/brand/about-photo.webp" alt="Woman wearing a LOHO HQ watch" loading="lazy">';
  }
});
