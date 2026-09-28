/* =====================================================================
   LOHO HQ  ·  js/products.js
   YOUR PRODUCT LIST. Edit names, prices and descriptions here.

   ⚠ The prices below are PLACEHOLDERS. Replace them with your real prices.

   HOW TO ADD YOUR OWN PHOTOS
   1. Save the photo inside  images/products/   (JPG, PNG or WebP).
      Plain white, cream or grey backgrounds look best.
   2. Add its path to the product's  images: []  list, for example:
        images: ["images/products/casio-classic-1.jpg", "images/products/casio-classic-2.jpg"]
      The first photo is the main one; the second shows when someone hovers on the product.
   3. Different photo per colour? Add  images: [...]  inside that variant instead.
   Until a photo is added, the site shows a placeholder illustration so nothing looks broken.

   FIELDS
   id          unique, lowercase, no spaces  (used in the page link)
   brand       shown above the product name and used by the Brands menu
   name        product name
   price       current price in Naira (number only, no commas)
   oldPrice    OPTIONAL. Original price. When higher than price, a discount badge shows.
   gender      "men" | "women" | "unisex"
   tags        "new"         → appears in New Arrivals
               "bestseller"  → appears in Best Sellers
               "featured"    → appears in Featured Watches on the homepage
               "classic"     → appears in the Classic category
   bg          photo tile colour: "stone" | "cream" | "white" | "sand"
   description short text on the product page
   variants    colours/styles the customer can pick
   art         drives the placeholder illustration only (ignored once photos are added)
   ===================================================================== */

window.LOHO_PRODUCTS = [

  {
    id: "casio-digital-classic",
    brand: "Casio",
    name: "Vintage x PAC-MAN A168WEPC7-7ADR",
    price: 223500,
    oldPrice: 245000,
    gender: "unisex",
    tags: ["featured", "bestseller", "classic"],
    bg: "stone",
    description: "A clean digital watch with a metal bracelet. Easy to wear with anything, from school run to weekend outfit. Message us on WhatsApp to confirm which colours are in stock today.",
    images: ["images/products/vintage.AVIF"],
    variants: [
      { name: "Silver", swatch: "#c9ced4" },
      { name: "Gold",   swatch: "#d6a94a", art: { case: "gold" } },
      { name: "Black",  swatch: "#1d1f22", art: { case: "black", lcd: "dark" } }
    ],
    art: { style: "digital", shape: "square", case: "silver", dial: "#1c1e21", lcd: "light", strapType: "metal" }
  },

  {
    id: "casio-analog-steel",
    brand: "Casio",
    name: "3-Hand Analog EFV-160D-4AVDF",
    price: 206000,
    gender: "men",
    tags: ["featured", "new", "classic"],
    bg: "cream",
    description: "A sharp analog watch on a steel bracelet with a date window. Sharp enough for work, easy enough for every day.",
    images: ["images/products/edifice-analog.WEBP", "images/products/IMG_4890 3.WEBP"],
    variants: [
      { name: "Red dial", swatch: "#6a1823" },
      { name: "Blue dial",  swatch: "#6e9cd7", art: { dial: "#76a7e9" } },
      { name: "White dial", swatch: "#f3f1ec", art: { dial: "#f3f1ec", marker: "#1b1d20", hand: "#1b1d20" } }
    ],
    art: { style: "analog", shape: "round", case: "steel", dial: "#14181f", markers: "baton", marker: "#eef1f4", hand: "#eef1f4", date: true, strapType: "metal" }
  },
  {
    id: "hislon-cl127s-mesh",
    brand: "HISLON",
    name: "CL 127S-24SS Men's Wristwatch",
    price: 382260,
    gender: "unisex",
    tags: ["featured","classic", "new"],
    bg: "white",
    description: "A slim, minimal watch on a fine mesh strap. Light on the wrist, simple to style, and suitable for anyone.",
    images: ["images/products/hislon silver.webp","images/products/Hislon Silver 2.webp","images/products/Hislon Silver 3.webp"],
    variants: [
      { name: "Silver", swatch: "#c9ced4" },
    ],
    art: { style: "analog", shape: "round", case: "silver", dial: "#f5f5f2", markers: "baton", marker: "#222222", hand: "#222222", strapType: "mesh" }
  },

  {
    id: "casio-vintage-classic",
    brand: "Casio",
    name: "Vintage x PAC-MAN A168WGG-1ADF",
    price: 165000,
    gender: "men",
    tags: ["featured", "new", "classic"],
    bg: "cream",
    description: "A sharp analog watch on a steel bracelet with a date window. Sharp enough for work, easy enough for every day.",
    images: ["images/products/vintage-casio.AVIF"],
    variants: [
      { name: "Black dial", swatch: "#14181f" },
      { name: "Blue dial",  swatch: "#1e3a5f", art: { dial: "#1e3a5f" } },
      { name: "White dial", swatch: "#f3f1ec", art: { dial: "#f3f1ec", marker: "#1b1d20", hand: "#1b1d20" } }
    ],
    art: { style: "analog", shape: "round", case: "steel", dial: "#14181f", markers: "baton", marker: "#eef1f4", hand: "#eef1f4", date: true, strapType: "metal" }
  },
  {
    id: "Tomi-rubber-2in1",
    brand: "Tomi",
    name: "T-106 Face Gear Dual Strap",
    price: 56500,
    oldPrice: 70000,
    gender: "men",
    tags: ["featured", "bestseller", "new"],
    bg: "stone",
    description: "A comfortable rubber strap watch built for everyday wear. Soft on the wrist and easy to clean. Ask us on WhatsApp what comes in the set.",
    images: ["images/products/Tomi-strap-dual.PNG", "images/products/TOMI-T-106-face-gear-dual strap.jpg"],
    variants: [
      { name: "Black", swatch: "#1a1b1d" },
      { name: "Olive", swatch: "#4a5238", art: { strap: "#4a5238", dial: "#2f3626" } }
    ],
    art: { style: "analog", shape: "round", case: "black", bezel: "#26282c", dial: "#111214", markers: "baton", marker: "#e9ecef", hand: "#e9ecef", strapType: "rubber", strap: "#1a1b1d" }
  },



  {
    id: "hislon-cl127n-chrono",
    brand: "HISLON",
    name: "HISLON CL127N-11MN Men's Wristwatch",
    price: 374260,
    gender: "men",
    tags: ["classic","bestseller"],
    bg: "cream",
    description: "A bold rubber strap watch with a sporty chronograph-style dial. Made for people who like a watch that stands out.",
    images: ["images/products/Hislon Blue.webp","images/products/Hislon Black.webp","images/products/Hislon Blue 2.webp","images/products/Hislon black 2.webp"],
    variants: [
      { name: "Black", swatch: "#111111" },
      { name: "Blue",  swatch: "#1b3d6d", art: { strap: "#1b3d6d", dial: "#14233d" } },
    ],
    art: { style: "chrono", shape: "round", case: "black", dial: "#15161a", markers: "baton", marker: "#eeeeee", hand: "#f1f1f1", second: "#ff5b24", strapType: "rubber", strap: "#111111" }
  },

  {
    id: "scottie-9570",
    brand: "Scottie",
    name: "Scottie 9570",
    price: 87500,
    oldPrice: 102000,
    gender: "women",
    tags: ["featured", "new", "bestseller"],
    bg: "cream",
    description: "A small, elegant watch made for women, with a slim bracelet and a soft, polished finish. Lovely on its own or stacked with other pieces.",
    images: ["images/products/scottie pink.webp", "images/products/Scottie Gold.webp","images/products/scottie green.webp"],
    variants: [
      { name: "pink", swatch: "#d57db6" },
      { name: "Gold",      swatch: "#d6a94a", art: { case: "gold", dial: "#faf3e0", marker: "#a47c26", hand: "#7d5f1c" } },
      { name: "Green",    swatch: "#61a62d", art: { case: "silver", dial: "#eef1f4", marker: "#6d747b", hand: "#4b5259" } }
    ],
    art: { style: "analog", shape: "small", case: "rose", dial: "#f6efe9", markers: "dots", marker: "#a8735f", hand: "#7a4d3d", second: "#c9705a", strapType: "metal" }
  },

  {
    id: "scottie-pebbles-1771",
    brand: "Scottie",
    name: "Scottie pebbles 1771",
    price: 48150,
    gender: "women",
    tags: ["featured","classic"],
    bg: "white",
    description: "A slim rectangular watch with a classic face and a metal bracelet. Simple, timeless and easy to dress up.",
    images: ["images/products/scottie pebble.webp", "images/products/scottie pebble 2.jpg","images/products/scottie pebble 3.jpg"],
    variants: [
      { name: "Brown",   swatch: "#322304" },
      { name: "Silver", swatch: "#c9ced4", art: { case: "silver", dial: "#ffffff" } },
      { name: "Rose",   swatch: "#dea089", art: { case: "rose", dial: "#f8ece6" } }
    ],
    art: { style: "analog", shape: "tank", case: "gold", dial: "#f6f1e6", markers: "numbers", marker: "#2b2b2b", hand: "#2b2b2b", strapType: "metal" }
  },

  {
    id: "scottie-onyx",
    brand: "Scottie",
    name: "Scottie Onyx Ladies Watch",
    price: 53500,
    oldPrice: 62400,
    gender: "women",
    tags: ["featured","bestseller", "new"],
    bg: "stone",
    description: "A big-face sport watch on a rubber strap, for people who want presence on the wrist. Confirm colours and stock with us on WhatsApp.",
    images: ["images/products/Scottie Onyx.AVIF","images/products/Scottie Onyx 2.AVIF","images/products/Scottie Onyx 3.AVIF"],
    variants: [
      { name: "Black", swatch: "#15171a" },
      { name: "Blue",  swatch: "#12305a", art: { dial: "#12305a", bezel: "#12305a", strap: "#12305a" } },
      { name: "Green", swatch: "#2c3e28", art: { dial: "#20321f", bezel: "#20321f", strap: "#2c3e28" } }
    ],
    art: { style: "chrono", shape: "round", case: "black", bezel: "#2a2d31", dial: "#0f1216", markers: "baton", marker: "#e8e8e8", hand: "#eeeeee", second: "#ff5b24", strapType: "rubber", strap: "#15171a" }
  },

  {
    id: "paedagar-classic-leather",
    brand: "Paedagar",
    name: "Paedagar Classic Leather",
    price: 21500,
    gender: "men",
    tags: ["classic"],
    bg: "cream",
    description: "A dressy analog watch with numerals and a leather strap. A good pick for church, office and events.",
    images: [],
    variants: [
      { name: "Brown and gold",   swatch: "#5a3b26" },
      { name: "Black and silver", swatch: "#151515", art: { case: "silver", dial: "#111111", marker: "#eeeeee", hand: "#eeeeee", strap: "#151515" } },
      { name: "Navy and silver",  swatch: "#2a2f3a", art: { case: "silver", dial: "#1e3350", marker: "#eeeeee", hand: "#eeeeee", strap: "#2a2f3a" } }
    ],
    art: { style: "analog", shape: "round", case: "gold", dial: "#f2ead8", markers: "numbers", marker: "#1c1c1c", hand: "#1c1c1c", second: "#b08a2c", strapType: "leather", strap: "#5a3b26" }
  },

  {
    id: "scottie-ellipse",
    brand: "Scottie",
    name: "Scottie Ellipse Ladies Watch",
    price: 30150,
    oldPrice: 34000,
    gender: "women",
    tags: ["featured","classic", "bestseller"],
    bg: "white",
    description: "A square-faced steel watch with a clean dial and a matching metal bracelet. A smart everyday watch that looks more expensive than it is.",
    images: ["images/products/Scottie Ellipse.AVIF", "images/products/Scottie Ellipse 2.AVIF", "images/products/Scottie Ellipse 3.AVIF"],
    variants: [
      { name: "Silver and navy",     swatch: "#1b2a44", art: { dial: "#14203a" } },
      { name: "Silver and black",    swatch: "#0f1216", art: { dial: "#0f1216" } },
      { name: "Gold and champagne",  swatch: "#d6a94a", art: { case: "gold", dial: "#efe3c2", marker: "#5c4514", hand: "#5c4514" } }
    ],
    art: { style: "analog", shape: "square", case: "steel", dial: "#14203a", markers: "baton", marker: "#eef1f4", hand: "#eef1f4", strapType: "metal" }
  }

];

// Helper: quick lookup by id (used on the product page, cart and related lists)
function getProductById(id) {
  return window.LOHO_PRODUCTS.find(function (p) { return p.id === id; });
}
