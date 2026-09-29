/* Forces the full desktop layout on every screen size by shrinking it
   with a CSS transform, instead of relying on the viewport meta tag
   (iOS Safari does not reliably honor a fixed viewport width). */
(function () {
  var DESIGN_WIDTH = 1280;
  var KEEP_NATIVE_SELECTOR = ".wa-float, .toast";

  function init() {
    if (document.getElementById("scaleWrap")) return;

    var body = document.body;
    var keepNative = Array.prototype.slice.call(
      document.querySelectorAll(KEEP_NATIVE_SELECTOR)
    );

    var wrap = document.createElement("div");
    wrap.id = "scaleWrap";

    Array.prototype.slice.call(body.childNodes).forEach(function (node) {
      if (keepNative.indexOf(node) === -1) {
        wrap.appendChild(node);
      }
    });
    body.appendChild(wrap);
    keepNative.forEach(function (el) {
      body.appendChild(el);
    });

    function apply() {
      var vw = window.innerWidth;
      var scale = Math.min(1, vw / DESIGN_WIDTH);
      wrap.style.transform = "scale(" + scale + ")";
      var rect = wrap.getBoundingClientRect();
      body.style.height = rect.height + "px";
    }

    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", function () {
      setTimeout(apply, 200);
    });
    window.addEventListener("load", apply);
    setTimeout(apply, 400);
    setTimeout(apply, 1200);
    apply();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
