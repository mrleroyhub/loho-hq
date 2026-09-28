# LOHO HQ — Website

A multi-page e-commerce site for LOHO HQ, a Nigerian fashion hub selling
affordable watches from Casio, HISLON, Tomi, Scottie, Paedagar and more.

## Opening it

No build step, no install. Just open `index.html` in a browser, or in
VS Code use the **Live Server** extension (right-click `index.html` →
"Open with Live Server") so the pages link to each other correctly.

To publish it, upload the whole folder to any static host (Netlify,
Vercel, GitHub Pages, cPanel, etc.) — there is no backend to configure.

## What's new in this version

- **Brown/cream duotone theme** — the whole palette is now built around a
  warm espresso-brown and milk-cream duotone. The header toggle (sun/moon
  icon) swaps which one is background vs text — cream background with
  brown type by default, brown background with cream type when toggled —
  rather than a neutral light/dark scheme. Choice is remembered per visitor.
- **Cinematic video hero** — the homepage hero is a full-bleed looping
  video (`images/hero/hero-watches.mp4` / `.webm`) with a parallax effect
  on scroll and a 3D-styled headline. Falls back to a static poster image
  on `prefers-reduced-motion`.
- **Hover-to-preview product cards** — hovering a product card crossfades
  to its second photo (or a second generated angle, for watches without
  photos yet), the way BuonoWorld.com's cards do.
- **Real photography** in the "Shop by Category" tiles and the About
  section, replacing the generated illustrations wherever a real product
  photo is available.
- **Redesigned cart** — cleaner item rows, an "Order Summary" card with a
  trust note, and a clearly-grouped delivery-details form.
- **"Worn Well" lifestyle gallery** — a horizontal-scroll section on the
  homepage using real lifestyle photography, above the testimonials.
- **Scroll-reveal animations, 3D card tilt, animated stat counters** —
  site-wide, automatically disabled for reduced-motion or touch devices.
- Real product photography wired in for Casio, HISLON, Tomi and Scottie
  pieces (see `js/products.js`); watches without photos yet still fall
  back to the generated illustration automatically.

## Customizing which photo represents each category tile

The "Shop by Category" tiles (Men, Women, Rubber Strap, etc.) each show
the first product in `products.js` that matches that category **and has
a real photo** (falling back to the first match if none do). To control
which product's photo shows for a given category, either reorder
`products.js` so your preferred product comes first, or open
`js/home.js` and edit the `categories` array's `match` functions.


## File structure

```
loho-hq/
├── index.html          Homepage
├── shop.html           Full catalogue with filters (Men/Women/Unisex, brand, style)
├── product.html         Single product page (reads ?id=... from the URL)
├── cart.html            Cart + WhatsApp checkout
├── css/
│   └── style.css        All styling (one file, organised by section)
├── js/
│   ├── config.js         ← EDIT: phone, WhatsApp, email, social handles
│   ├── products.js       ← EDIT: your watch catalogue (names, prices, photos)
│   ├── watch-art.js       Draws the placeholder watch illustrations for products with no photos yet
│   ├── cart.js            Cart storage + WhatsApp order-message builder
│   ├── main.js            Shared header/footer/theme-toggle/scroll-reveal/tilt behaviour
│   ├── home.js            Homepage rendering + hero video parallax
│   ├── shop.js            Shop page filtering/sorting
│   ├── product.js         Product page rendering
│   └── cart-page.js       Cart page rendering + checkout form
└── images/
    ├── hero/              Hero video (.mp4 + .webm), poster frame
    ├── lifestyle/          Lifestyle photos used in the "Worn Well" section
    ├── products/           Product photos (real photos + generated fallback art)
    └── brand/              Logo or brand imagery
```

## The files you'll actually edit

### 1. `js/config.js` — contact details & social handles
Phone, WhatsApp, email, address, Instagram/TikTok links, and the hero's
fallback still image. Everything on every page pulls from this one file.

### 2. `js/products.js` — your watches
Full instructions are in the comment at the top of the file. Copy an
existing product object, give it a unique `id`, set `brand`, `name`,
`price`, `oldPrice` (optional discount badge), `gender`, and `tags`
(`"featured"`, `"bestseller"`, `"new"`, `"classic"`).

**Photos:** drop files into `images/products/` and list their paths in
that product's `images: []` array. Until photos are added, a generated
illustration is shown automatically so nothing looks empty.

### 3. Hero video
To swap the hero video, replace `images/hero/hero-watches.mp4` (and the
`.webm` version, and `hero-poster.jpg`) with your own — same filenames,
same folder. Keep the video under ~15 seconds and without audio for best
performance; it autoplays muted and loops.

### 4. Lifestyle gallery
The "Worn Well" section on the homepage is a hand-picked set of `<div class="lifestyle-card">`
blocks inside `index.html` (search for `id="lifestyleGallery"`). Swap the
`images/lifestyle/*.jpg` files and the one-line captions to match your
own photography.

## How checkout works

There's no payment gateway. The cart page collects the customer's name,
phone and address, then opens WhatsApp with the full order pre-typed —
you confirm stock, delivery and payment directly in the chat.

## Things worth doing before launch

- [ ] Replace every placeholder phone/WhatsApp/email/social link in `config.js`
- [ ] Confirm all prices in `products.js` are current
- [ ] Swap in your own hero video / lifestyle photos if you'd like different ones
- [ ] Consider adding a real analytics snippet (e.g. Google Analytics) before `</head>` on each page
