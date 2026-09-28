/* =====================================================================
   LOHO HQ  ·  js/main.js
   Shared across every page: header behaviour, config binding (phone,
   WhatsApp, social links), the product card template, and small helpers.
   Loaded on every page, after config.js / products.js / watch-art.js
   and before any page-specific script.
   ===================================================================== */

var CFG = window.LOHO_CONFIG;

/* ---------- money ---------- */
function money(n) {
  return CFG.shop.currency + Number(n).toLocaleString("en-NG");
}

/* ---------- config binding: fill in phone / WhatsApp / social everywhere ---------- */
function getPath(obj, path) {
  return path.split(".").reduce(function (o, k) { return o && o[k]; }, obj);
}

function waLink(message) {
  return "https://wa.me/" + CFG.contact.whatsapp + "?text=" + encodeURIComponent(message);
}

function applyConfig() {
  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var val = getPath(CFG, el.getAttribute("data-cfg"));
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
    var key = el.getAttribute("data-cfg-href");
    if (key === "tel") el.setAttribute("href", "tel:" + CFG.contact.phoneTel);
    else if (key === "whatsapp") el.setAttribute("href", waLink("Hi LOHO HQ, I'd like to ask about a watch."));
    else if (key === "email") el.setAttribute("href", "mailto:" + CFG.contact.email);
    else if (key === "instagram") el.setAttribute("href", CFG.social.instagram.url);
    else if (key === "tiktok") el.setAttribute("href", CFG.social.tiktok.url);
  });
  document.querySelectorAll("[data-cfg-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- header: mobile nav + shrink shadow ---------- */
function initHeader() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      var open = nav.classList.contains("open");
      toggle.setAttribute("aria-expanded", open);
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.innerHTML = ICONS.menu;
      });
    });
  }

  // mark active nav link
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a[data-page]").forEach(function (a) {
    if (a.getAttribute("data-page") === path) a.classList.add("active");
  });

  var searchForm = document.querySelector(".search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = searchForm.querySelector("input").value.trim();
      window.location.href = "shop.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }
}

/* ---------- small inline icon set (kept out of markup clutter) ---------- */
var ICONS = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-8.8C.7 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.3C10.9 4.7 12.6 3.7 14.6 4c3.4.5 4.7 4 3 7.2C19 15.6 12 20 12 20z"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 17.3 5.9 20.7l1.5-6.7-5.1-4.6 6.8-.7L12 2.5z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.03 3C9.4 3 4 8.34 4 14.9c0 2.27.63 4.4 1.72 6.23L4 29l8.1-2.54a12.9 12.9 0 0 0 3.93.6c6.63 0 12.03-5.34 12.03-11.9C28.06 8.34 22.66 3 16.03 3zm0 21.7c-1.9 0-3.68-.55-5.18-1.5l-.37-.22-4.06 1.27 1.3-3.9-.24-.4a9.63 9.63 0 0 1-1.5-5.05c0-5.33 4.4-9.65 9.85-9.65 5.44 0 9.85 4.32 9.85 9.65 0 5.33-4.4 9.8-9.65 9.8zm5.4-7.3c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.45-2.37-1.44-.87-.77-1.46-1.72-1.63-2.02-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.5.71.3 1.26.48 1.7.62.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.4.25-.7.25-1.3.17-1.4-.07-.12-.27-.2-.57-.34z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3z"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="14" height="11"/><path d="M15 9h4l3 3v5h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/></svg>',
  swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2h3.2c.2 1.7 1.3 3.2 3.8 3.5v3.2c-1.5 0-2.9-.4-4-1.1v6.6a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .9.1v3.3a2.6 2.6 0 1 0 1.9 2.5V2z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>'
};

/* ---------- discount % ---------- */
function discountPct(p) {
  if (!p.oldPrice || p.oldPrice <= p.price) return 0;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

/* ---------- product art: merge base art with a variant's overrides ---------- */
function artFor(product, variantIndex) {
  var v = product.variants && product.variants[variantIndex || 0];
  var art = Object.assign({}, product.art, (v && v.art) || {});
  return art;
}

/* ---------- real photo if available, generated illustration otherwise ---------- */
function productMediaHTML(p, altLabel) {
  if (p.images && p.images.length) {
    return '<img src="' + p.images[0] + '" alt="' + (altLabel || p.name) + '" loading="lazy">';
  }
  return '<div class="art-frame">' + LohoArt.svg(artFor(p, 0), "front", { label: altLabel || p.name }) + "</div>";
}

/* ---------- product card (used on home, shop, related) ---------- */
function cardMediaHTML(p) {
  var alt = p.name;
  if (p.images && p.images.length > 1) {
    return {
      html: '<img class="media-a" src="' + p.images[0] + '" alt="' + alt + '" loading="lazy">' +
            '<img class="media-b" src="' + p.images[1] + '" alt="' + alt + '" loading="lazy">',
      hasSecond: true
    };
  }
  if (p.images && p.images.length === 1) {
    return { html: '<img class="media-a" src="' + p.images[0] + '" alt="' + alt + '" loading="lazy">', hasSecond: false };
  }
  var label = p.brand + " " + p.name;
  return {
    html: '<div class="art-frame media-a">' + LohoArt.svg(artFor(p, 0), "front", { label: label }) + "</div>" +
          '<div class="art-frame media-b">' + LohoArt.svg(artFor(p, 0), "tilt", { label: label }) + "</div>",
    hasSecond: true
  };
}

function productCard(p) {
  var media = cardMediaHTML(p);

  var badge = "";
  if (discountPct(p) > 0) badge = '<span class="tag">-' + discountPct(p) + '%</span>';
  else if (p.tags.indexOf("new") > -1) badge = '<span class="tag new">New</span>';

  var priceRow = '<span class="price-now">' + money(p.price) + "</span>" +
    (p.oldPrice ? '<span class="price-was">' + money(p.oldPrice) + "</span>" : "");

  return (
    '<article class="card" data-id="' + p.id + '">' +
      '<div class="card-media' + (media.hasSecond ? " has-second" : "") + '">' +
        '<a href="product.html?id=' + p.id + '" aria-label="' + p.name + '">' + media.html + "</a>" +
        badge +
        '<button class="wish-btn" aria-label="Save to wishlist" data-wish="' + p.id + '">' + ICONS.heart + "</button>" +
      "</div>" +
      '<div class="card-body">' +
        '<span class="card-brand">' + p.brand + "</span>" +
        '<h3 class="card-name"><a href="product.html?id=' + p.id + '">' + p.name + "</a></h3>" +
        '<div class="card-price">' + priceRow + "</div>" +
        '<div class="card-foot">' +
          '<button class="add-btn" data-add="' + p.id + '">Add to Cart</button>' +
        "</div>" +
      "</div>" +
    "</article>"
  );
}

function renderGrid(el, list) {
  if (!el) return;
  el.innerHTML = list.map(productCard).join("") || '<p style="color:var(--muted); padding:40px 0;">No watches match that filter yet — try clearing it.</p>';
}

/* ---------- wishlist (localStorage, simple heart toggle) ---------- */
function getWishlist() { try { return JSON.parse(localStorage.getItem("loho_wishlist")) || []; } catch (e) { return []; } }
function toggleWishlist(id) {
  var w = getWishlist();
  var i = w.indexOf(id);
  if (i > -1) w.splice(i, 1); else w.push(id);
  localStorage.setItem("loho_wishlist", JSON.stringify(w));
  return w.indexOf(id) > -1;
}
function paintWishlistButtons() {
  var w = getWishlist();
  document.querySelectorAll("[data-wish]").forEach(function (btn) {
    btn.classList.toggle("active", w.indexOf(btn.getAttribute("data-wish")) > -1);
  });
}

/* ---------- delegated card interactions (add to cart / wishlist) ---------- */
function initCardInteractions(root) {
  (root || document).addEventListener("click", function (e) {
    var addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      var product = getProductById(addBtn.getAttribute("data-add"));
      addToCart(product.id, (product.variants && product.variants[0].name) || "", 1);
      addBtn.textContent = "Added";
      addBtn.classList.add("added");
      showToast(product.name + " added to cart");
      setTimeout(function () { addBtn.textContent = "Add to Cart"; addBtn.classList.remove("added"); }, 1600);
    }
    var wishBtn = e.target.closest("[data-wish]");
    if (wishBtn) {
      var active = toggleWishlist(wishBtn.getAttribute("data-wish"));
      wishBtn.classList.toggle("active", active);
    }
  });
  paintWishlistButtons();
}

/* ---------- toast ---------- */
function showToast(msg) {
  var t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.innerHTML = ICONS.check + "<span>" + msg + "</span>";
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(function () { t.classList.remove("show"); }, 2200);
}

/* ---------- accordion (product page) ---------- */
function initAccordions() {
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");
    trigger.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });
}

/* ---------- theme toggle (light / dark) ---------- */
function initThemeToggle() {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    try { localStorage.setItem("loho_theme", isDark ? "light" : "dark"); } catch (e) {}
  });
}

/* ---------- scroll-triggered reveal animations ---------- */
function animateStatCounters(root) {
  root.querySelectorAll(".stat-num").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-target"), 10);
    if (!target || el._counted) return;
    el._counted = true;
    var start = null;
    var duration = 1100;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
function initScrollReveal() {
  var targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;
  if (!("IntersectionObserver" in window) || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    targets.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        animateStatCounters(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  targets.forEach(function (el) { io.observe(el); });
}

/* ---------- subtle 3D tilt on product cards ---------- */
function initCardTilt() {
  if (window.matchMedia && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches)) return;
  var raf = null, activeEl = null;
  document.addEventListener("mousemove", function (e) {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      var el = e.target.closest(".card, .lifestyle-card");
      if (activeEl && activeEl !== el) { activeEl.style.transform = ""; activeEl = null; }
      if (el) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(800px) rotateX(" + (py * -6).toFixed(2) + "deg) rotateY(" + (px * 8).toFixed(2) + "deg) translateY(-3px)";
        activeEl = el;
      }
    });
  }, { passive: true });
  document.addEventListener("mouseleave", function () {
    if (activeEl) { activeEl.style.transform = ""; activeEl = null; }
  }, true);
}

/* ---------- magnetic buttons: primary CTAs subtly follow the cursor ---------- */
function bindMagnetic(btn) {
  if (btn._magneticBound) return;
  btn._magneticBound = true;
  var strength = 16;
  btn.addEventListener("mousemove", function (e) {
    var r = btn.getBoundingClientRect();
    var x = (e.clientX - r.left - r.width / 2) / r.width * strength;
    var y = (e.clientY - r.top - r.height / 2) / r.height * strength - 2;
    btn.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
  });
  btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
}
function initMagneticButtons() {
  if (window.matchMedia && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(hover: none)").matches)) return;
  document.querySelectorAll(".magnetic").forEach(bindMagnetic);
  // cart-page.js (and any future render function) rebuilds its checkout button via innerHTML
  // whenever the cart changes, so newly-created .magnetic elements need to be caught too.
  var mo = new MutationObserver(function () {
    document.querySelectorAll(".magnetic").forEach(bindMagnetic);
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", function () {
  applyConfig();
  initHeader();
  initThemeToggle();
  initCardInteractions(document);
  initAccordions();
  initScrollReveal();
  initCardTilt();
  initMagneticButtons();
  if (typeof renderCartBadge === "function") renderCartBadge();
});
