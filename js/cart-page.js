/* =====================================================================
   LOHO HQ  ·  js/cart-page.js
   Renders the cart table + summary, and turns the checkout form into a
   pre-filled WhatsApp order message (see cart.js for the message builder).
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("cartContent");

  var removeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';
  var lockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';

  function render() {
    var lines = cartLines();

    if (!lines.length) {
      root.innerHTML =
        '<div class="empty-cart">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>' +
          "<h2 style=\"margin-bottom:10px;\">Your cart is empty</h2>" +
          '<p class="lede" style="margin-inline:auto 0; margin-bottom:24px;">Find a watch you love and it will show up here.</p>' +
          '<a href="shop.html" class="btn btn-primary magnetic">Browse Watches</a>' +
        "</div>";
      return;
    }

    var rowsHtml = lines.map(function (l) {
      return (
        '<div class="cart-row" data-id="' + l.product.id + '" data-variant="' + l.variant + '">' +
          productMediaHTML(l.product) +
          '<div>' +
            '<div class="name">' + l.product.name + "</div>" +
            '<div class="meta">' + l.product.brand + (l.variant ? " · " + l.variant : "") + "</div>" +
          "</div>" +
          '<div class="qty-control">' +
            '<button class="qty-dec" aria-label="Decrease quantity">−</button>' +
            '<span>' + l.qty + "</span>" +
            '<button class="qty-inc" aria-label="Increase quantity">+</button>' +
          "</div>" +
          '<div class="line-total">' + money(l.product.price * l.qty) + "</div>" +
          '<button class="remove" aria-label="Remove item">' + removeIcon + "</button>" +
        "</div>"
      );
    }).join("");

    var subtotal = cartSubtotal();

    root.innerHTML =
      '<div class="cart-layout">' +
        '<div class="cart-items">' + rowsHtml + "</div>" +
        '<div class="summary-card">' +
          "<h3>Order Summary</h3>" +
          '<div class="summary-row"><span>Subtotal</span><span>' + money(subtotal) + "</span></div>" +
          '<div class="summary-row" style="color:var(--muted); font-size:0.85rem;"><span>' + CFG.shop.deliveryNote + "</span></div>" +
          '<div class="summary-row total"><span>Total</span><span>' + money(subtotal) + "</span></div>" +

          '<form class="checkout-form" id="checkoutForm">' +
            '<span class="form-heading">Delivery Details</span>' +
            '<label for="custName">Full name</label>' +
            '<input type="text" id="custName" name="name" placeholder="Your name" required>' +
            '<label for="custPhone">Phone number</label>' +
            '<input type="tel" id="custPhone" name="phone" placeholder="080…" required>' +
            '<label for="custAddress">Delivery address</label>' +
            '<textarea id="custAddress" name="address" placeholder="Street, area, city, state"></textarea>' +
            '<label for="custNote">Note (optional)</label>' +
            '<textarea id="custNote" name="note" placeholder="Any special request"></textarea>' +
            '<button type="submit" class="btn btn-wa btn-block magnetic" style="margin-top:6px;">' +
              '<svg viewBox="0 0 32 32" fill="currentColor" width="18" height="18"><path d="M16.03 3C9.4 3 4 8.34 4 14.9c0 2.27.63 4.4 1.72 6.23L4 29l8.1-2.54a12.9 12.9 0 0 0 3.93.6c6.63 0 12.03-5.34 12.03-11.9C28.06 8.34 22.66 3 16.03 3zm0 21.7c-1.9 0-3.68-.55-5.18-1.5l-.37-.22-4.06 1.27 1.3-3.9-.24-.4a9.63 9.63 0 0 1-1.5-5.05c0-5.33 4.4-9.65 9.85-9.65 5.44 0 9.85 4.32 9.85 9.65 0 5.33-4.4 9.8-9.65 9.8z"/></svg>' +
              "Complete Order via WhatsApp" +
            "</button>" +
          "</form>" +
          '<div class="summary-note">' + lockIcon + "<span>Order confirmed with you on WhatsApp before it ships</span></div>" +
        "</div>" +
      "</div>";

    wireRows();
    wireCheckout();
  }

  function wireRows() {
    root.querySelectorAll(".cart-row").forEach(function (row) {
      var id = row.getAttribute("data-id");
      var variant = row.getAttribute("data-variant");
      var line = cartLines().find(function (l) { return l.product.id === id && l.variant === variant; });

      row.querySelector(".qty-inc").addEventListener("click", function () {
        updateCartQty(id, variant, line.qty + 1);
        render();
      });
      row.querySelector(".qty-dec").addEventListener("click", function () {
        if (line.qty <= 1) { removeFromCart(id, variant); } else { updateCartQty(id, variant, line.qty - 1); }
        render();
      });
      row.querySelector(".remove").addEventListener("click", function () {
        removeFromCart(id, variant);
        render();
      });
    });
  }

  function wireCheckout() {
    var form = document.getElementById("checkoutForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn.classList.contains("is-loading")) return;

      var customer = {
        name: document.getElementById("custName").value.trim(),
        phone: document.getElementById("custPhone").value.trim(),
        address: document.getElementById("custAddress").value.trim(),
        note: document.getElementById("custNote").value.trim()
      };
      var msg = buildOrderMessage(customer);
      var originalHTML = btn.innerHTML;

      btn.classList.add("is-loading");
      btn.disabled = true;
      btn.innerHTML = '<span class="btn-spinner"></span> Preparing your order…';

      setTimeout(function () {
        btn.classList.remove("is-loading");
        btn.classList.add("is-success");
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Opening WhatsApp…';
        window.open(waLink(msg), "_blank");
        setTimeout(function () {
          btn.classList.remove("is-success");
          btn.disabled = false;
          btn.innerHTML = originalHTML;
        }, 1800);
      }, 650);
    });
  }

  render();
});
