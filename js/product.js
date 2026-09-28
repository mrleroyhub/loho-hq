/* =====================================================================
   LOHO HQ  ·  js/product.js
   Renders a single product page from ?id= in the URL, using the shared
   product data (products.js) and, where no real photo exists yet, the
   procedural illustration (watch-art.js).
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var id = new URLSearchParams(location.search).get("id");
  var product = getProductById(id);

  if (!product) {
    window.location.href = "shop.html";
    return;
  }

  var variantIndex = 0;
  var qty = 1;
  var hasPhotos = product.images && product.images.length;

  /* ---------- gallery ---------- */
  function paintGallery() {
    var main = document.getElementById("galleryMain");
    var thumbs = document.getElementById("galleryThumbs");

    if (hasPhotos) {
      main.innerHTML = '<img id="mainImg" src="' + product.images[0] + '" alt="' + product.name + '">';
      thumbs.innerHTML = product.images.map(function (src, i) {
        return '<button class="' + (i === 0 ? "active" : "") + '" data-src="' + src + '"><img src="' + src + '" alt=""></button>';
      }).join("");
      thumbs.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          thumbs.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          document.getElementById("mainImg").src = btn.getAttribute("data-src");
        });
      });
    } else {
      var art = artFor(product, variantIndex);
      var views = LohoArt.views; // front, tilt, side, dial
      main.innerHTML = LohoArt.svg(art, views[0], { label: product.name });
      thumbs.innerHTML = views.map(function (v, i) {
        return '<button class="' + (i === 0 ? "active" : "") + '" data-view="' + v + '">' + LohoArt.svg(art, v, { label: product.name + " " + v }) + "</button>";
      }).join("");
      thumbs.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          thumbs.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
          btn.classList.add("active");
          main.innerHTML = LohoArt.svg(artFor(product, variantIndex), btn.getAttribute("data-view"), { label: product.name });
        });
      });
    }
  }

  /* ---------- variant swatches ---------- */
  function paintVariants() {
    var block = document.getElementById("colorBlock");
    if (!product.variants || product.variants.length < 2) { block.style.display = "none"; return; }
    block.style.display = "block";
    document.getElementById("colorName").textContent = product.variants[variantIndex].name;
    document.getElementById("colorSwatches").innerHTML = product.variants.map(function (v, i) {
      return '<button class="swatch' + (i === variantIndex ? " active" : "") + '" style="background:' + v.swatch + '" data-i="' + i + '" aria-label="' + v.name + '"></button>';
    }).join("");
    document.querySelectorAll("#colorSwatches .swatch").forEach(function (btn) {
      btn.addEventListener("click", function () {
        variantIndex = Number(btn.getAttribute("data-i"));
        paintVariants();
        if (!hasPhotos) paintGallery();
      });
    });
  }

  /* ---------- static info ---------- */
  document.title = product.name + " — LOHO HQ";
  document.getElementById("crumbName").textContent = product.name;
  document.getElementById("pdpBrand").textContent = product.brand;
  document.getElementById("pdpName").textContent = product.name;
  document.getElementById("pdpDesc").textContent = product.description;

  var fullStars = Math.round(product.rating || 4.5);
  document.getElementById("pdpStars").textContent = "★★★★★".slice(0, fullStars) + "☆☆☆☆☆".slice(0, 5 - fullStars);
  document.getElementById("pdpReviews").textContent = "(" + (product.reviews || 0) + " reviews)";

  document.getElementById("pdpPrice").innerHTML =
    '<span class="price-now">' + money(product.price) + "</span>" +
    (product.oldPrice ? '<span class="price-was">' + money(product.oldPrice) + "</span>" : "");

  document.getElementById("pdpHighlights").innerHTML =
    (product.highlights || []).map(function (h) { return "<li>" + h + "</li>"; }).join("") ||
    "<li>Quality-checked before shipping</li><li>Confirmed with you on WhatsApp before it ships</li>";

  document.getElementById("pdpDelivery").textContent =
    CFG.shop.deliveryNote + " We ship nationwide across Nigeria.";

  paintGallery();
  paintVariants();

  /* ---------- quantity ---------- */
  var qtyValueEl = document.getElementById("qtyValue");
  document.getElementById("qtyMinus").addEventListener("click", function () { qty = Math.max(1, qty - 1); qtyValueEl.textContent = qty; });
  document.getElementById("qtyPlus").addEventListener("click", function () { qty = qty + 1; qtyValueEl.textContent = qty; });

  /* ---------- actions ---------- */
  function currentVariantName() { return product.variants ? product.variants[variantIndex].name : ""; }

  document.getElementById("addToCartBtn").addEventListener("click", function () {
    addToCart(product.id, currentVariantName(), qty);
    showToast(product.name + " added to cart");
  });

  document.getElementById("buyNowBtn").addEventListener("click", function () {
    addToCart(product.id, currentVariantName(), qty);
    window.location.href = "cart.html";
  });

  var waBtn = document.getElementById("waOrderBtn");
  function refreshWaLink() {
    var msg = "Hi LOHO HQ, I'd like to order the " + product.name +
      (currentVariantName() ? " (" + currentVariantName() + ")" : "") +
      " x" + qty + " — " + money(product.price * qty) + ". Is it available?";
    waBtn.href = waLink(msg);
  }
  refreshWaLink();
  ["qtyMinus", "qtyPlus"].forEach(function (id) { document.getElementById(id).addEventListener("click", refreshWaLink); });
  document.getElementById("colorSwatches").addEventListener("click", refreshWaLink);

  /* ---------- related products ---------- */
  var related = window.LOHO_PRODUCTS.filter(function (p) {
    return p.id !== product.id && (p.brand === product.brand || p.gender === product.gender);
  }).slice(0, 4);
  renderGrid(document.getElementById("relatedGrid"), related);
});
