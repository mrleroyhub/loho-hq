/* =====================================================================
   LOHO HQ  ·  js/shop.js
   Shop page: reads filters from the URL on load, lets the shopper
   refine with pills/sort, and re-renders the grid.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var P = window.LOHO_PRODUCTS;
  var params = new URLSearchParams(location.search);

  var state = {
    gender: params.get("gender") || "",
    tag: params.get("tag") || "",
    strap: params.get("strap") || "",
    brand: params.get("brand") || "",
    q: (params.get("q") || "").toLowerCase(),
    sort: "featured"
  };

  /* ---- build brand pills from the catalogue ---- */
  var brands = Array.from(new Set(P.map(function (p) { return p.brand; })));
  var brandPillsEl = document.getElementById("brandPills");
  brandPillsEl.innerHTML =
    '<button class="filter-pill' + (state.brand === "" ? " active" : "") + '" data-brand="">All Brands</button>' +
    brands.map(function (b) {
      return '<button class="filter-pill' + (state.brand === b ? " active" : "") + '" data-brand="' + b + '">' + b + "</button>";
    }).join("");

  /* ---- reflect current state onto the visible pills ---- */
  function paintPills() {
    document.querySelectorAll("#genderPills .filter-pill").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-gender") === state.gender);
    });
    document.querySelectorAll("#tagPills .filter-pill").forEach(function (btn) {
      var isTag = btn.hasAttribute("data-tag");
      var isStrap = btn.hasAttribute("data-strap");
      var active = (isTag && btn.getAttribute("data-tag") === state.tag && !state.strap) ||
                   (isStrap && btn.getAttribute("data-strap") === state.strap);
      if (!state.tag && !state.strap && btn.getAttribute("data-tag") === "") active = true;
      btn.classList.toggle("active", active);
    });
    brandPillsEl.querySelectorAll(".filter-pill").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-brand") === state.brand);
    });
  }

  function titleFor() {
    if (state.q) return 'Results for "' + params.get("q") + '"';
    if (state.gender) return state.gender.charAt(0).toUpperCase() + state.gender.slice(1) + "'s Watches";
    if (state.tag === "new") return "New Arrivals";
    if (state.tag === "bestseller") return "Best Sellers";
    if (state.tag === "classic") return "Classic Watches";
    if (state.strap === "rubber") return "Rubber Strap Watches";
    if (state.brand) return state.brand + " Watches";
    return "Shop All Watches";
  }

  function apply() {
    var list = P.filter(function (p) {
      if (state.gender && p.gender !== state.gender) return false;
      if (state.tag && p.tags.indexOf(state.tag) === -1) return false;
      if (state.strap && p.art.strapType !== state.strap) return false;
      if (state.brand && p.brand !== state.brand) return false;
      if (state.q && (p.name + " " + p.brand).toLowerCase().indexOf(state.q) === -1) return false;
      return true;
    });

    if (state.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === "high") list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === "new") list = list.filter(function (p) { return p.tags.indexOf("new") > -1; }).concat(list.filter(function (p) { return p.tags.indexOf("new") === -1; }));

    document.getElementById("shopTitle").textContent = titleFor();
    document.title = titleFor() + " — LOHO HQ";
    renderGrid(document.getElementById("shopGrid"), list);
    paintPills();
  }

  document.getElementById("genderPills").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-gender]");
    if (!btn) return;
    state.gender = btn.getAttribute("data-gender");
    apply();
  });

  document.getElementById("tagPills").addEventListener("click", function (e) {
    var btn = e.target.closest(".filter-pill");
    if (!btn) return;
    if (btn.hasAttribute("data-tag")) { state.tag = btn.getAttribute("data-tag"); state.strap = ""; }
    else if (btn.hasAttribute("data-strap")) { state.strap = btn.getAttribute("data-strap"); state.tag = ""; }
    apply();
  });

  brandPillsEl.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-brand]");
    if (!btn) return;
    state.brand = btn.getAttribute("data-brand");
    apply();
  });

  document.getElementById("sortSelect").addEventListener("change", function (e) {
    state.sort = e.target.value;
    apply();
  });

  apply();
});
