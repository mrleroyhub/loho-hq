/* =====================================================================
   LOHO HQ  ·  js/watch-art.js
   Draws placeholder watch illustrations (SVG) from each product's "art"
   settings, so the store looks complete before real photos are added.
   Once a product has photos in products.js, these are no longer shown.
   You should not need to edit this file.
   ===================================================================== */

(function (global) {
  'use strict';

  var uid = 0;
  var CX = 200, CY = 250;                      // watch centre inside the 400 x 500 canvas
  var VIEWS = ['front', 'tilt', 'side', 'dial'];

  var CASES = {
    silver: ['#fbfbfb', '#c3c7cc', '#7f858c'],
    steel:  ['#f0f2f4', '#aeb4bb', '#6b7178'],
    gold:   ['#fff0bd', '#dcae4e', '#93691c'],
    rose:   ['#fbe0d3', '#dea089', '#98624d'],
    black:  ['#6a6e76', '#2b2e33', '#0c0d0f']
  };

  var DIMS = {
    round:  { w: 216, h: 216, rx: 108 },
    small:  { w: 178, h: 178, rx: 89 },
    square: { w: 208, h: 208, rx: 46 },
    tank:   { w: 170, h: 226, rx: 34 }
  };

  var DEFAULTS = {
    style: 'analog', shape: 'round', case: 'silver', dial: '#111111',
    markers: 'baton', marker: '#f2f2f2', hand: '#f2f2f2', second: '#ff5b24',
    strapType: 'leather', strap: '#3a2a20', lcd: 'light', date: false
  };

  /* ---------- colour helpers ---------- */
  function hex2rgb(h) {
    h = String(h).replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function mix(a, b, t) {
    var A = hex2rgb(a), B = hex2rgb(b);
    return '#' + A.map(function (v, i) {
      var x = Math.round(v + (B[i] - v) * t).toString(16);
      return x.length < 2 ? '0' + x : x;
    }).join('');
  }
  function lighten(h, t) { return mix(h, '#ffffff', t); }
  function darken(h, t)  { return mix(h, '#000000', t); }

  /* ---------- shape helper: every shape is a rounded rectangle ---------- */
  function R(cx, cy, w, h, rx, extra) {
    return '<rect x="' + (cx - w / 2).toFixed(1) + '" y="' + (cy - h / 2).toFixed(1) +
      '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) +
      '" rx="' + Math.max(rx, 0).toFixed(1) + '" ' + (extra || '') + '/>';
  }

  /* ---------- gradients, patterns, filters ---------- */
  function defs(a, id, d, sw) {
    var c = CASES[a.case] || CASES.silver;
    var sc = a.strap;
    var o = '';
    o += '<linearGradient id="' + id + 'c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".45" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    o += '<linearGradient id="' + id + 'cv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".5" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    o += '<linearGradient id="' + id + 'b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[1] + '"/><stop offset=".5" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    o += '<radialGradient id="' + id + 'd" cx=".4" cy=".35" r=".9"><stop offset="0" stop-color="' + lighten(a.dial, 0.1) + '"/><stop offset="1" stop-color="' + darken(a.dial, 0.12) + '"/></radialGradient>';
    o += '<linearGradient id="' + id + 's" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="' + darken(sc, 0.28) + '"/><stop offset=".5" stop-color="' + lighten(sc, 0.06) + '"/><stop offset="1" stop-color="' + darken(sc, 0.28) + '"/></linearGradient>';
    o += '<linearGradient id="' + id + 'm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="' + c[2] + '"/><stop offset=".5" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>';
    o += '<linearGradient id="' + id + 'e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".82" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>';
    o += '<linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>';
    // rubber ridges
    o += '<pattern id="' + id + 'rp" patternUnits="userSpaceOnUse" width="10" height="17"><rect width="10" height="2.6" fill="#000" opacity=".16"/><rect y="2.6" width="10" height="1.4" fill="#fff" opacity=".09"/></pattern>';
    // metal links
    o += '<pattern id="' + id + 'mp" patternUnits="userSpaceOnUse" x="' + (CX - sw / 2) + '" y="0" width="' + (sw / 3) + '" height="26"><rect width="' + (sw / 3) + '" height="26" fill="none"/><line x1="0" y1="0" x2="0" y2="26" stroke="#000" stroke-opacity=".28" stroke-width="1.6"/><line x1="0" y1="0" x2="' + (sw / 3) + '" y2="0" stroke="#000" stroke-opacity=".32" stroke-width="1.8"/><line x1="2" y1="3" x2="' + (sw / 3 - 2) + '" y2="3" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/></pattern>';
    // mesh
    o += '<pattern id="' + id + 'me" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)"><rect width="5" height="5" fill="' + c[1] + '"/><line x1="0" y1="0" x2="0" y2="5" stroke="' + c[2] + '" stroke-width="1.5" opacity=".6"/><line x1="2.5" y1="0" x2="2.5" y2="5" stroke="' + c[0] + '" stroke-width="1" opacity=".7"/></pattern>';
    o += '<filter id="' + id + 'sh" x="-40%" y="-30%" width="180%" height="170%"><feDropShadow dx="0" dy="16" stdDeviation="13" flood-color="#000" flood-opacity=".26"/></filter>';
    o += '<filter id="' + id + 'bl" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="9"/></filter>';
    return o;
  }

  /* ---------- straps ---------- */
  function straps(a, id, d, sw) {
    var top = CY - d.h / 2, bot = CY + d.h / 2;
    var far = sw * 0.84, type = a.strapType;
    var c = CASES[a.case] || CASES.silver;
    function poly(y0, y1, w0, w1) {
      return 'M' + (CX - w0 / 2) + ' ' + y0 + 'L' + (CX - w1 / 2) + ' ' + y1 + 'L' + (CX + w1 / 2) + ' ' + y1 + 'L' + (CX + w0 / 2) + ' ' + y0 + 'Z';
    }
    var tp = poly(top + 34, -220, sw, far);
    var bp = poly(bot - 34, 720, sw, far);
    var base = (type === 'metal') ? 'url(#' + id + 'm)' : (type === 'mesh') ? 'url(#' + id + 'me)' : 'url(#' + id + 's)';
    var s = '<path d="' + tp + '" fill="' + base + '"/><path d="' + bp + '" fill="' + base + '"/>';

    if (type === 'metal') {
      s += '<path d="' + tp + '" fill="url(#' + id + 'mp)"/><path d="' + bp + '" fill="url(#' + id + 'mp)"/>';
    }
    if (type === 'rubber') {
      s += '<path d="' + tp + '" fill="url(#' + id + 'rp)"/><path d="' + bp + '" fill="url(#' + id + 'rp)"/>';
    }
    if (type === 'leather') {
      var st = lighten(a.strap, 0.4);
      [-1, 1].forEach(function (k) {
        s += '<line x1="' + (CX + k * (sw / 2 - 8)) + '" y1="' + (top + 34) + '" x2="' + (CX + k * (far / 2 - 8)) + '" y2="-220" stroke="' + st + '" stroke-opacity=".55" stroke-width="1.6" stroke-dasharray="5 4"/>';
        s += '<line x1="' + (CX + k * (sw / 2 - 8)) + '" y1="' + (bot - 34) + '" x2="' + (CX + k * (far / 2 - 8)) + '" y2="720" stroke="' + st + '" stroke-opacity=".55" stroke-width="1.6" stroke-dasharray="5 4"/>';
      });
    }
    if (type === 'leather' || type === 'rubber') {
      var hole = darken(a.strap, 0.5);
      for (var i = 0; i < 7; i++) {
        s += '<circle cx="' + CX + '" cy="' + (bot + 66 + i * 30) + '" r="4.6" fill="' + hole + '" opacity=".85"/>';
      }
    }
    s += '<path d="' + tp + '" fill="url(#' + id + 'e)"/><path d="' + bp + '" fill="url(#' + id + 'e)"/>';
    return s;
  }

  /* ---------- dial furniture ---------- */
  function pos(i, f, rx, ry) {
    var t = i * Math.PI / 6;
    return [CX + Math.sin(t) * rx * f, CY - Math.cos(t) * ry * f];
  }

  function markers(a, rx, ry) {
    var s = '', col = a.marker, m = a.markers, i, p, q;
    if (m === 'numbers') {
      var lbl = { 0: '12', 3: '3', 6: '6', 9: '9' };
      var fs = Math.min(rx, ry) * 0.3;
      [0, 3, 6, 9].forEach(function (k) {
        p = pos(k, 0.72, rx, ry);
        s += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + fs * 0.36).toFixed(1) + '" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-weight="700" font-size="' + fs.toFixed(1) + '" fill="' + col + '">' + lbl[k] + '</text>';
      });
      for (i = 0; i < 12; i++) {
        if (i % 3 === 0) continue;
        p = pos(i, 0.86, rx, ry);
        s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.6" fill="' + col + '"/>';
      }
    } else if (m === 'dots') {
      for (i = 0; i < 12; i++) {
        p = pos(i, 0.85, rx, ry);
        s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (i % 3 === 0 ? 4.4 : 2.8) + '" fill="' + col + '"/>';
      }
    } else {
      for (i = 0; i < 12; i++) {
        p = pos(i, 0.93, rx, ry);
        q = pos(i, i % 3 === 0 ? 0.68 : 0.78, rx, ry);
        s += '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '" stroke="' + col + '" stroke-width="' + (i % 3 === 0 ? 5.5 : 3.6) + '" stroke-linecap="round"/>';
      }
    }
    if (m !== 'dots') {
      for (i = 0; i < 60; i++) {
        if (i % 5 === 0) continue;
        p = pos(i / 5, 0.985, rx, ry);
        q = pos(i / 5, 0.94, rx, ry);
        s += '<line x1="' + p[0].toFixed(1) + '" y1="' + p[1].toFixed(1) + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '" stroke="' + col + '" stroke-opacity=".55" stroke-width="1"/>';
      }
    }
    return s;
  }

  function hand(cls, ang, len, tail, w, col) {
    return '<g class="' + cls + '" transform="rotate(' + ang.toFixed(1) + ' ' + CX + ' ' + CY + ')"><line x1="' + CX + '" y1="' + (CY + tail) + '" x2="' + CX + '" y2="' + (CY - len) + '" stroke="' + col + '" stroke-width="' + w + '" stroke-linecap="round"/></g>';
  }

  function hands(a, rr, t) {
    var ha = ((t[0] % 12) + t[1] / 60) * 30, ma = (t[1] + t[2] / 60) * 6, sa = t[2] * 6;
    return hand('hh', ha, rr * 0.5, 10, 7, a.hand) +
           hand('hm', ma, rr * 0.78, 12, 4.6, a.hand) +
           hand('hs', sa, rr * 0.88, 22, 1.8, a.second) +
           '<circle cx="' + CX + '" cy="' + CY + '" r="5.5" fill="' + a.hand + '"/><circle cx="' + CX + '" cy="' + CY + '" r="2.4" fill="' + a.second + '"/>';
  }

  function subdials(a, rr) {
    var s = '', spots = [[-0.5, 0.02], [0.5, 0.02], [0, 0.52]], r = rr * 0.27;
    spots.forEach(function (p, idx) {
      var x = CX + p[0] * rr, y = CY + p[1] * rr;
      s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="' + darken(a.dial, 0.25) + '" stroke="' + a.marker + '" stroke-opacity=".5" stroke-width="1.2"/>';
      for (var k = 0; k < 12; k++) {
        var t = k * Math.PI / 6;
        s += '<line x1="' + (x + Math.sin(t) * r * 0.82).toFixed(1) + '" y1="' + (y - Math.cos(t) * r * 0.82).toFixed(1) + '" x2="' + (x + Math.sin(t) * r * 0.62).toFixed(1) + '" y2="' + (y - Math.cos(t) * r * 0.62).toFixed(1) + '" stroke="' + a.marker + '" stroke-opacity=".7" stroke-width="1"/>';
      }
      var ang = [40, 130, 250][idx];
      s += '<line x1="' + x.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + (x + Math.sin(ang * Math.PI / 180) * r * 0.7).toFixed(1) + '" y2="' + (y - Math.cos(ang * Math.PI / 180) * r * 0.7).toFixed(1) + '" stroke="' + a.second + '" stroke-width="1.4" stroke-linecap="round"/>';
    });
    return s;
  }

  function digitalFace(a, dw, dh) {
    var lw = dw - 26, lh = dh - 26;
    var dark = a.lcd === 'dark';
    var bg = dark ? '#151a17' : '#c9d3bf';
    var fg = dark ? '#d5efcf' : '#141814';
    var d = new Date();
    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var s = R(CX, CY, lw, lh, 8, 'fill="' + bg + '" stroke="' + darken(bg, 0.35) + '" stroke-width="1.5"');
    s += '<text x="' + (CX - lw / 2 + 10) + '" y="' + (CY - lh / 2 + 22) + '" font-family="\'Courier New\', monospace" font-weight="700" font-size="14" fill="' + fg + '" opacity=".85">' + days[d.getDay()] + ' ' + d.getDate() + '</text>';
    s += '<text x="' + CX + '" y="' + (CY + 14) + '" text-anchor="middle" font-family="\'Courier New\', monospace" font-weight="700" font-size="46" fill="' + fg + '" textLength="' + (lw * 0.74).toFixed(0) + '" lengthAdjust="spacingAndGlyphs">10:10</text>';
    s += '<text x="' + (CX + lw / 2 - 10) + '" y="' + (CY + lh / 2 - 12) + '" text-anchor="end" font-family="\'Courier New\', monospace" font-weight="700" font-size="17" fill="' + fg + '" opacity=".85">35</text>';
    s += '<line x1="' + (CX - lw / 2 + 10) + '" y1="' + (CY + lh / 2 - 22) + '" x2="' + (CX - lw / 2 + 42) + '" y2="' + (CY + lh / 2 - 22) + '" stroke="' + fg + '" stroke-opacity=".5" stroke-width="2"/>';
    return s;
  }

  /* ---------- the case (front view) ---------- */
  function caseBody(a, id, d, o) {
    var c = CASES[a.case] || CASES.silver, s = '', k;
    var dw = d.w - 52, dh = d.h - 52, rr = Math.min(dw, dh) / 2;
    var rx = dw / 2 - 4, ry = dh / 2 - 4;

    if (o.extrude) s += R(CX + 9, CY + 13, d.w, d.h, d.rx, 'fill="' + c[2] + '"');

    // crown and pushers
    if (a.style === 'digital') {
      [-40, 40].forEach(function (dy) {
        s += R(CX + d.w / 2 + 3, CY + dy, 12, 20, 4, 'fill="url(#' + id + 'cv)"');
        s += R(CX - d.w / 2 - 3, CY + dy, 12, 20, 4, 'fill="url(#' + id + 'cv)"');
      });
    } else {
      var cxr = CX + d.w / 2 + 3;
      s += R(cxr, CY, 20, 36, 6, 'fill="url(#' + id + 'cv)"');
      for (k = -1; k <= 1; k++) s += '<line x1="' + (cxr - 3 + k * 5) + '" y1="' + (CY - 15) + '" x2="' + (cxr - 3 + k * 5) + '" y2="' + (CY + 15) + '" stroke="#000" stroke-opacity=".3" stroke-width="1.4"/>';
      if (a.style === 'chrono') {
        var pr = a.shape === 'round' || a.shape === 'small' ? d.w / 2 : d.w / 2 - 6;
        [-1, 1].forEach(function (sg) {
          var px = CX + Math.cos(sg * 0.55) * (pr + 4), py = CY + Math.sin(sg * 0.55) * (pr + 4);
          s += '<g transform="rotate(' + (sg * 31.5) + ' ' + px.toFixed(1) + ' ' + py.toFixed(1) + ')">' + R(px, py, 16, 12, 3, 'fill="url(#' + id + 'cv)"') + '</g>';
        });
      }
    }

    s += R(CX, CY, d.w, d.h, d.rx, 'fill="url(#' + id + 'c)" stroke="#000" stroke-opacity=".22" stroke-width="1.2"');
    var bezelFill = a.bezel ? a.bezel : 'url(#' + id + 'b)';
    s += R(CX, CY, d.w - 16, d.h - 16, d.rx - 8, 'fill="' + bezelFill + '" stroke="#000" stroke-opacity=".25" stroke-width="1"');
    if (a.bezel) s += R(CX, CY, d.w - 16, d.h - 16, d.rx - 8, 'fill="url(#' + id + 'g)" opacity=".5"');
    s += R(CX, CY, d.w - 40, d.h - 40, d.rx - 20, 'fill="none" stroke="#000" stroke-opacity=".28" stroke-width="1.4"');
    s += R(CX, CY, dw, dh, d.rx - 26, 'fill="url(#' + id + 'd)"');

    if (a.style === 'digital') {
      s += digitalFace(a, dw, dh);
    } else {
      s += markers(a, rx, ry);
      if (a.style === 'chrono') {
        s += subdials(a, rr);
      } else if (a.date) {
        var dx = CX + rx * 0.62, day = new Date().getDate();
        s += R(dx, CY, 30, 20, 3, 'fill="#fbfbf8" stroke="#000" stroke-opacity=".4" stroke-width="1"');
        s += '<text x="' + dx + '" y="' + (CY + 5.5) + '" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="15" fill="#111">' + day + '</text>';
      }
      s += hands(a, rr, o.time || [10, 10, 35]);
    }

    // glass glint
    s += '<clipPath id="' + id + 'cl">' + R(CX, CY, dw, dh, d.rx - 26) + '</clipPath>';
    s += '<g clip-path="url(#' + id + 'cl)"><path d="M' + (CX - dw / 2) + ' ' + (CY - dh / 2) + 'H' + (CX + dw * 0.05) + 'L' + (CX - dw / 2) + ' ' + (CY + dh * 0.18) + 'Z" fill="#fff" opacity=".13"/></g>';
    return s;
  }

  /* ---------- views ---------- */
  function frontLayer(a, id, d, sw, o) {
    return '<g filter="url(#' + id + 'sh)">' + straps(a, id, d, sw) + caseBody(a, id, d, o) + '</g>';
  }

  function sideLayer(a, id, d) {
    var c = CASES[a.case] || CASES.silver;
    var w = d.w * 0.86, cy = 200, L = CX - w / 2, Rr = CX + w / 2, s = '';
    var loop = 'M' + (L - 6) + ' ' + (cy + 12) +
      ' C' + (L - 58) + ' ' + (cy + 12) + ' ' + (L - 74) + ' ' + (cy + 95) + ' ' + (L - 58) + ' ' + (cy + 168) +
      ' C' + (L - 44) + ' ' + (cy + 232) + ' ' + (CX - 92) + ' ' + (cy + 262) + ' ' + CX + ' ' + (cy + 262) +
      ' C' + (CX + 92) + ' ' + (cy + 262) + ' ' + (Rr + 44) + ' ' + (cy + 232) + ' ' + (Rr + 58) + ' ' + (cy + 168) +
      ' C' + (Rr + 74) + ' ' + (cy + 95) + ' ' + (Rr + 58) + ' ' + (cy + 12) + ' ' + (Rr + 6) + ' ' + (cy + 12);
    var type = a.strapType;
    var base = type === 'metal' || type === 'mesh' ? c[1] : a.strap;
    s += '<ellipse cx="' + CX + '" cy="' + (cy + 268) + '" rx="120" ry="9" fill="#000" opacity=".2" filter="url(#' + id + 'bl)"/>';
    s += '<path d="' + loop + '" fill="none" stroke="' + darken(base, 0.35) + '" stroke-width="15" stroke-linecap="butt"/>';
    s += '<path d="' + loop + '" fill="none" stroke="' + base + '" stroke-width="11" stroke-linecap="butt"/>';
    if (type === 'metal') s += '<path d="' + loop + '" fill="none" stroke="' + c[2] + '" stroke-opacity=".55" stroke-width="11" stroke-dasharray="2 14"/>';
    if (type === 'rubber') s += '<path d="' + loop + '" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="11" stroke-dasharray="3 9"/>';
    if (type === 'leather') s += '<path d="' + loop + '" fill="none" stroke="' + lighten(a.strap, 0.45) + '" stroke-opacity=".6" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if (type === 'mesh') s += '<path d="' + loop + '" fill="none" stroke="' + c[0] + '" stroke-opacity=".5" stroke-width="3" stroke-dasharray="1 3"/>';

    s += '<g filter="url(#' + id + 'sh)">';
    s += R(L - 6, cy + 4, 22, 28, 8, 'fill="url(#' + id + 'cv)"') + R(Rr + 6, cy + 4, 22, 28, 8, 'fill="url(#' + id + 'cv)"');
    s += R(CX, cy + 40, w - 44, 14, 6, 'fill="' + c[2] + '"');
    s += R(CX, cy, w, 60, 16, 'fill="url(#' + id + 'cv)" stroke="#000" stroke-opacity=".2" stroke-width="1.2"');
    s += R(CX, cy - 34, w - 6, 14, 7, 'fill="' + (a.bezel || 'url(#' + id + 'b)') + '" stroke="#000" stroke-opacity=".22"');
    s += '<path d="M' + (L + 8) + ' ' + (cy - 40) + ' Q' + CX + ' ' + (cy - 74) + ' ' + (Rr - 8) + ' ' + (cy - 40) + 'Z" fill="#cfe3ee" fill-opacity=".42" stroke="#fff" stroke-opacity=".6" stroke-width="1.4"/>';
    s += '<path d="M' + (L + 30) + ' ' + (cy - 46) + ' Q' + (CX - 30) + ' ' + (cy - 62) + ' ' + (CX + 10) + ' ' + (cy - 58) + '" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>';
    if (a.style === 'digital') {
      s += R(CX - 38, cy + 2, 22, 22, 6, 'fill="url(#' + id + 'b)" stroke="#000" stroke-opacity=".25"') + R(CX + 38, cy + 2, 22, 22, 6, 'fill="url(#' + id + 'b)" stroke="#000" stroke-opacity=".25"');
    } else {
      s += '<circle cx="' + CX + '" cy="' + (cy + 2) + '" r="17" fill="url(#' + id + 'b)" stroke="#000" stroke-opacity=".3" stroke-width="1.2"/>';
      s += '<circle cx="' + CX + '" cy="' + (cy + 2) + '" r="12" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3" stroke-dasharray="2 3"/>';
    }
    s += '</g>';
    return s;
  }

  /* ---------- public: build an SVG string ---------- */
  function svg(art, view, opts) {
    var a = {}, k;
    for (k in DEFAULTS) a[k] = DEFAULTS[k];
    for (k in art) if (art[k] != null) a[k] = art[k];
    opts = opts || {};
    view = view || 'front';
    var id = 'w' + (++uid);
    var d = DIMS[a.shape] || DIMS.round;
    var sw = a.shape === 'tank' ? 96 : Math.round(d.w * 0.47);
    var vb = '0 0 400 500', inner = '';

    if (view === 'side') {
      inner = sideLayer(a, id, d);
    } else if (view === 'tilt') {
      inner = '<g transform="translate(10 6) rotate(-26 ' + CX + ' ' + CY + ') scale(.95)" transform-origin="200 250">' +
              frontLayer(a, id, d, sw, { extrude: true, time: opts.time }) + '</g>';
    } else if (view === 'dial') {
      vb = '70 87.5 260 325';
      inner = frontLayer(a, id, d, sw, { time: opts.time });
    } else {
      inner = frontLayer(a, id, d, sw, { time: opts.time });
    }

    return '<svg class="art' + (opts.live ? ' art-live' : '') + '" viewBox="' + vb + '" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + (opts.label || 'Watch illustration').replace(/"/g, '') + '">' +
      '<defs>' + defs(a, id, d, sw) + '</defs>' + inner + '</svg>';
  }

  /* ---------- live clock for the hero watch ---------- */
  function startClock(root) {
    if (!root) return;
    var hh = root.querySelector('.hh'), hm = root.querySelector('.hm'), hs = root.querySelector('.hs');
    if (!hh || !hm || !hs) return;
    var calm = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function set(el, ang) { el.setAttribute('transform', 'rotate(' + ang.toFixed(2) + ' ' + CX + ' ' + CY + ')'); }
    function tick() {
      if (!document.body.contains(root)) return;
      var d = new Date();
      var s = d.getSeconds() + (calm ? 0 : d.getMilliseconds() / 1000);
      var m = d.getMinutes() + s / 60;
      var h = (d.getHours() % 12) + m / 60;
      set(hs, s * 6); set(hm, m * 6); set(hh, h * 30);
      if (calm) setTimeout(tick, 1000); else requestAnimationFrame(tick);
    }
    tick();
  }

  global.LohoArt = { svg: svg, views: VIEWS, startClock: startClock };
})(window);
