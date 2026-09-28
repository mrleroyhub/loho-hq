/* =====================================================================
   LOHO HQ  ·  js/cart.js
   Cart storage (localStorage) shared by every page, plus the WhatsApp
   checkout message builder used on cart.html.
   No backend is required: "checkout" packages the order into a WhatsApp
   message so a real conversation confirms stock, delivery and payment —
   this is how most Nigerian fashion stores actually take orders.
   ===================================================================== */

var CART_KEY = "loho_cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartBadge();
}

function addToCart(id, variant, qty) {
  var cart = getCart();
  var line = cart.find(function (l) { return l.id === id && l.variant === variant; });
  if (line) line.qty += qty;
  else cart.push({ id: id, variant: variant, qty: qty });
  saveCart(cart);
}

function updateCartQty(id, variant, qty) {
  var cart = getCart();
  var line = cart.find(function (l) { return l.id === id && l.variant === variant; });
  if (!line) return;
  line.qty = Math.max(1, qty);
  saveCart(cart);
}

function removeFromCart(id, variant) {
  var cart = getCart().filter(function (l) { return !(l.id === id && l.variant === variant); });
  saveCart(cart);
}

function cartLines() {
  return getCart().map(function (l) {
    var product = getProductById(l.id);
    return product ? { product: product, variant: l.variant, qty: l.qty } : null;
  }).filter(Boolean);
}

function cartCount() {
  return getCart().reduce(function (n, l) { return n + l.qty; }, 0);
}

function cartSubtotal() {
  return cartLines().reduce(function (sum, l) { return sum + l.product.price * l.qty; }, 0);
}

var _lastCartCount = 0;
function renderCartBadge() {
  var n = cartCount();
  var increased = n > _lastCartCount;
  _lastCartCount = n;
  document.querySelectorAll(".cart-count").forEach(function (el) {
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
    if (increased) {
      el.classList.remove("bump");
      void el.offsetWidth; // restart animation
      el.classList.add("bump");
    }
  });
}

/* ---------- build the WhatsApp order message ---------- */
function buildOrderMessage(customer) {
  var lines = cartLines();
  var msg = "Hi LOHO HQ, I'd like to place an order:\n\n";
  lines.forEach(function (l) {
    msg += "• " + l.product.name + (l.variant ? " (" + l.variant + ")" : "") +
      " x" + l.qty + " — " + money(l.product.price * l.qty) + "\n";
  });
  msg += "\nSubtotal: " + money(cartSubtotal());
  if (customer && customer.name) msg += "\n\nName: " + customer.name;
  if (customer && customer.phone) msg += "\nPhone: " + customer.phone;
  if (customer && customer.address) msg += "\nDelivery address: " + customer.address;
  if (customer && customer.note) msg += "\nNote: " + customer.note;
  return msg;
}
