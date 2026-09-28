/* =====================================================================
   LOHO HQ  ·  js/config.js
   EDIT THIS FILE to change contact details, social links, delivery notes
   and store wording. No other file needs touching for these.
   ===================================================================== */

window.LOHO_CONFIG = {

  brand: {
    name: "LOHO HQ",
    tagline: "YOUR STYLE. YOUR TIME.",
    // One line shown in the bar at the very top of every page
    announcement: "Order on WhatsApp and we will confirm availability and delivery for you."
  },

  contact: {
    phoneDisplay: "0704 948 1914",        // EDIT: how the number is shown on the site
    phoneTel:     "+2347049481914",       // EDIT: same number, international format, no spaces
    whatsapp:     "2347049481914",        // EDIT: WhatsApp number, digits only, no + sign
    email:        "hello@lohohq.com",     // EDIT
    address:      "Warri, Delta, Nigeria",   // EDIT
    hours:        "Monday to Saturday, 9am to 6pm"             // EDIT
  },

  social: {
    instagram: { handle: "@lohohq", url: "https://instagram.com/lohohq" },       // EDIT
    tiktok:    { handle: "@lohohq", url: "https://www.tiktok.com/@lohohq" }      // EDIT
  },

  shop: {
    currency: "₦",
    // Shown in the cart. Nothing is calculated automatically:
    // the delivery fee is agreed with the customer on WhatsApp.
    deliveryNote: "Delivery fee depends on your location and is confirmed on WhatsApp.",
    // Optional: set a number (for example 50000) to show a "free delivery" progress line in the cart.
    // Leave as null to hide it.
    freeDeliveryOver: null
  },

  hero: {
    // OPTIONAL: put a real photo in the images folder and write its path here, e.g. "images/hero.jpg"
    // Leave empty to show the illustrated watch with the live clock.
    image: "images/brand/IMG_4861 2.WEBP"
  }
};
