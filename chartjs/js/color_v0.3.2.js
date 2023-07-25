/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */
!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module ? (module.exports = t()) : 'function' == typeof define && define.amd ? define(t) : ((e = 'undefined' != typeof globalThis ? globalThis : e || self).Color = t());
})(this, function () {
  'use strict';
  function e(e) {
    return (e + 0.5) | 0;
  }
  const t = (e, t, f) => Math.max(Math.min(e, f), t);
  function f(f) {
    return t(e(2.55 * f), 0, 255);
  }
  function r(f) {
    return t(e(255 * f), 0, 255);
  }
  function n(f) {
    return t(e(f / 2.55) / 100, 0, 1);
  }
  function a(f) {
    return t(e(100 * f), 0, 100);
  }
  const i = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 },
    s = [...'0123456789ABCDEF'],
    c = (e) => s[15 & e],
    b = (e) => s[(240 & e) >> 4] + s[15 & e],
    g = (e) => (240 & e) >> 4 == (15 & e);
  function o(e) {
    var t,
      f = e.length;
    return '#' === e[0] && (4 === f || 5 === f ? (t = { r: 255 & (17 * i[e[1]]), g: 255 & (17 * i[e[2]]), b: 255 & (17 * i[e[3]]), a: 5 === f ? 17 * i[e[4]] : 255 }) : (7 !== f && 9 !== f) || (t = { r: (i[e[1]] << 4) | i[e[2]], g: (i[e[3]] << 4) | i[e[4]], b: (i[e[5]] << 4) | i[e[6]], a: 9 === f ? (i[e[7]] << 4) | i[e[8]] : 255 })), t;
  }
  function d(e) {
    var t = ((e) => g(e.r) && g(e.g) && g(e.b) && g(e.a))(e) ? c : b;
    return e ? '#' + t(e.r) + t(e.g) + t(e.b) + ((e, t) => (e < 255 ? t(e) : ''))(e.a, t) : void 0;
  }
  const u = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
  function h(e, t, f) {
    const r = t * Math.min(f, 1 - f),
      n = (t, n = (t + e / 30) % 12) => f - r * Math.max(Math.min(n - 3, 9 - n, 1), -1);
    return [n(0), n(8), n(4)];
  }
  function l(e, t, f) {
    const r = (r, n = (r + e / 60) % 6) => f - f * t * Math.max(Math.min(n, 4 - n, 1), 0);
    return [r(5), r(3), r(1)];
  }
  function p(e, t, f) {
    const r = h(e, 1, 0.5);
    let n;
    for (t + f > 1 && ((n = 1 / (t + f)), (t *= n), (f *= n)), n = 0; n < 3; n++) (r[n] *= 1 - t - f), (r[n] += t);
    return r;
  }
  function m(e) {
    const t = e.r / 255,
      f = e.g / 255,
      r = e.b / 255,
      n = Math.max(t, f, r),
      a = Math.min(t, f, r),
      i = (n + a) / 2;
    let s, c, b;
    return (
      n !== a &&
        ((b = n - a),
        (c = i > 0.5 ? b / (2 - n - a) : b / (n + a)),
        (s = (function (e, t, f, r, n) {
          return e === n ? (t - f) / r + (t < f ? 6 : 0) : t === n ? (f - e) / r + 2 : (e - t) / r + 4;
        })(t, f, r, b, n)),
        (s = 60 * s + 0.5)),
      [0 | s, c || 0, i]
    );
  }
  function y(e, t, f, n) {
    return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, f, n)).map(r);
  }
  function Y(e, t, f) {
    return y(h, e, t, f);
  }
  function v(e, t, f) {
    return y(p, e, t, f);
  }
  function x(e, t, f) {
    return y(l, e, t, f);
  }
  function w(e) {
    return ((e % 360) + 360) % 360;
  }
  function _(e) {
    const t = u.exec(e);
    let n,
      a = 255;
    if (!t) return;
    t[5] !== n && (a = t[6] ? f(+t[5]) : r(+t[5]));
    const i = w(+t[2]),
      s = +t[3] / 100,
      c = +t[4] / 100;
    return (n = 'hwb' === t[1] ? v(i, s, c) : 'hsv' === t[1] ? x(i, s, c) : Y(i, s, c)), { r: n[0], g: n[1], b: n[2], a: a };
  }
  function F(e, t) {
    var f = m(e);
    (f[0] = w(f[0] + t)), (f = Y(f)), (e.r = f[0]), (e.g = f[1]), (e.b = f[2]);
  }
  function M(e) {
    if (!e) return;
    const t = m(e),
      f = t[0],
      r = a(t[1]),
      i = a(t[2]);
    return e.a < 255 ? `hsla(${f}, ${r}%, ${i}%, ${n(e.a)})` : `hsl(${f}, ${r}%, ${i}%)`;
  }
  const k = { x: 'dark', Z: 'light', Y: 're', X: 'blu', W: 'gr', V: 'medium', U: 'slate', A: 'ee', T: 'ol', S: 'or', B: 'ra', C: 'lateg', D: 'ights', R: 'in', Q: 'turquois', E: 'hi', P: 'ro', O: 'al', N: 'le', M: 'de', L: 'yello', F: 'en', K: 'ch', G: 'arks', H: 'ea', I: 'ightg', J: 'wh' },
    X = { OiceXe: 'f0f8ff', antiquewEte: 'faebd7', aqua: 'ffff', aquamarRe: '7fffd4', azuY: 'f0ffff', beige: 'f5f5dc', bisque: 'ffe4c4', black: '0', blanKedOmond: 'ffebcd', Xe: 'ff', XeviTet: '8a2be2', bPwn: 'a52a2a', burlywood: 'deb887', caMtXe: '5f9ea0', KartYuse: '7fff00', KocTate: 'd2691e', cSO: 'ff7f50', cSnflowerXe: '6495ed', cSnsilk: 'fff8dc', crimson: 'dc143c', cyan: 'ffff', xXe: '8b', xcyan: '8b8b', xgTMnPd: 'b8860b', xWay: 'a9a9a9', xgYF: '6400', xgYy: 'a9a9a9', xkhaki: 'bdb76b', xmagFta: '8b008b', xTivegYF: '556b2f', xSange: 'ff8c00', xScEd: '9932cc', xYd: '8b0000', xsOmon: 'e9967a', xsHgYF: '8fbc8f', xUXe: '483d8b', xUWay: '2f4f4f', xUgYy: '2f4f4f', xQe: 'ced1', xviTet: '9400d3', dAppRk: 'ff1493', dApskyXe: 'bfff', dimWay: '696969', dimgYy: '696969', dodgerXe: '1e90ff', fiYbrick: 'b22222', flSOwEte: 'fffaf0', foYstWAn: '228b22', fuKsia: 'ff00ff', gaRsbSo: 'dcdcdc', ghostwEte: 'f8f8ff', gTd: 'ffd700', gTMnPd: 'daa520', Way: '808080', gYF: '8000', gYFLw: 'adff2f', gYy: '808080', honeyMw: 'f0fff0', hotpRk: 'ff69b4', RdianYd: 'cd5c5c', Rdigo: '4b0082', ivSy: 'fffff0', khaki: 'f0e68c', lavFMr: 'e6e6fa', lavFMrXsh: 'fff0f5', lawngYF: '7cfc00', NmoncEffon: 'fffacd', ZXe: 'add8e6', ZcSO: 'f08080', Zcyan: 'e0ffff', ZgTMnPdLw: 'fafad2', ZWay: 'd3d3d3', ZgYF: '90ee90', ZgYy: 'd3d3d3', ZpRk: 'ffb6c1', ZsOmon: 'ffa07a', ZsHgYF: '20b2aa', ZskyXe: '87cefa', ZUWay: '778899', ZUgYy: '778899', ZstAlXe: 'b0c4de', ZLw: 'ffffe0', lime: 'ff00', limegYF: '32cd32', lRF: 'faf0e6', magFta: 'ff00ff', maPon: '800000', VaquamarRe: '66cdaa', VXe: 'cd', VScEd: 'ba55d3', VpurpN: '9370db', VsHgYF: '3cb371', VUXe: '7b68ee', VsprRggYF: 'fa9a', VQe: '48d1cc', VviTetYd: 'c71585', midnightXe: '191970', mRtcYam: 'f5fffa', mistyPse: 'ffe4e1', moccasR: 'ffe4b5', navajowEte: 'ffdead', navy: '80', Tdlace: 'fdf5e6', Tive: '808000', TivedBb: '6b8e23', Sange: 'ffa500', SangeYd: 'ff4500', ScEd: 'da70d6', pOegTMnPd: 'eee8aa', pOegYF: '98fb98', pOeQe: 'afeeee', pOeviTetYd: 'db7093', papayawEp: 'ffefd5', pHKpuff: 'ffdab9', peru: 'cd853f', pRk: 'ffc0cb', plum: 'dda0dd', powMrXe: 'b0e0e6', purpN: '800080', YbeccapurpN: '663399', Yd: 'ff0000', Psybrown: 'bc8f8f', PyOXe: '4169e1', saddNbPwn: '8b4513', sOmon: 'fa8072', sandybPwn: 'f4a460', sHgYF: '2e8b57', sHshell: 'fff5ee', siFna: 'a0522d', silver: 'c0c0c0', skyXe: '87ceeb', UXe: '6a5acd', UWay: '708090', UgYy: '708090', snow: 'fffafa', sprRggYF: 'ff7f', stAlXe: '4682b4', tan: 'd2b48c', teO: '8080', tEstN: 'd8bfd8', tomato: 'ff6347', Qe: '40e0d0', viTet: 'ee82ee', JHt: 'f5deb3', wEte: 'ffffff', wEtesmoke: 'f5f5f5', Lw: 'ffff00', LwgYF: '9acd32' };
  let O;
  function S(e) {
    O ||
      ((O = (function () {
        const e = {},
          t = Object.keys(X),
          f = Object.keys(k);
        let r, n, a, i, s;
        for (r = 0; r < t.length; r++) {
          for (i = s = t[r], n = 0; n < f.length; n++) (a = f[n]), (s = s.replace(a, k[a]));
          (a = parseInt(X[i], 16)), (e[s] = [(a >> 16) & 255, (a >> 8) & 255, 255 & a]);
        }
        return e;
      })()),
      (O.transparent = [0, 0, 0, 0]));
    const t = O[e.toLowerCase()];
    return t && { r: t[0], g: t[1], b: t[2], a: 4 === t.length ? t[3] : 255 };
  }
  const T = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
  function P(e) {
    const r = T.exec(e);
    let n,
      a,
      i,
      s = 255;
    if (r) {
      if (r[7] !== n) {
        const e = +r[7];
        s = r[8] ? f(e) : t(255 * e, 0, 255);
      }
      return (n = +r[1]), (a = +r[3]), (i = +r[5]), (n = 255 & (r[2] ? f(n) : t(n, 0, 255))), (a = 255 & (r[4] ? f(a) : t(a, 0, 255))), (i = 255 & (r[6] ? f(i) : t(i, 0, 255))), { r: n, g: a, b: i, a: s };
    }
  }
  function Z(e) {
    return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${n(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
  }
  const $ = (e) => (e <= 0.0031308 ? 12.92 * e : 1.055 * Math.pow(e, 1 / 2.4) - 0.055),
    E = (e) => (e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4));
  function R(e, t, f) {
    if (e) {
      let r = m(e);
      (r[t] = Math.max(0, Math.min(r[t] + r[t] * f, 0 === t ? 360 : 1))), (r = Y(r)), (e.r = r[0]), (e.g = r[1]), (e.b = r[2]);
    }
  }
  function A(e, t) {
    return e ? Object.assign(t || {}, e) : e;
  }
  function U(e) {
    var t = { r: 0, g: 0, b: 0, a: 255 };
    return Array.isArray(e) ? e.length >= 3 && ((t = { r: e[0], g: e[1], b: e[2], a: 255 }), e.length > 3 && (t.a = r(e[3]))) : ((t = A(e, { r: 0, g: 0, b: 0, a: 1 })).a = r(t.a)), t;
  }
  class V {
    constructor(e) {
      if (e instanceof V) return e;
      const t = typeof e;
      let f;
      var r;
      'object' === t ? (f = U(e)) : 'string' === t && (f = o(e) || S(e) || ('r' === (r = e).charAt(0) ? P(r) : _(r))), (this._rgb = f), (this._valid = !!f);
    }
    get valid() {
      return this._valid;
    }
    get rgb() {
      var e = A(this._rgb);
      return e && (e.a = n(e.a)), e;
    }
    set rgb(e) {
      this._rgb = U(e);
    }
    rgbString() {
      return this._valid ? Z(this._rgb) : void 0;
    }
    hexString() {
      return this._valid ? d(this._rgb) : void 0;
    }
    hslString() {
      return this._valid ? M(this._rgb) : void 0;
    }
    mix(e, t) {
      if (e) {
        const f = this.rgb,
          r = e.rgb;
        let n;
        const a = t === n ? 0.5 : t,
          i = 2 * a - 1,
          s = f.a - r.a,
          c = ((i * s == -1 ? i : (i + s) / (1 + i * s)) + 1) / 2;
        (n = 1 - c), (f.r = 255 & (c * f.r + n * r.r + 0.5)), (f.g = 255 & (c * f.g + n * r.g + 0.5)), (f.b = 255 & (c * f.b + n * r.b + 0.5)), (f.a = a * f.a + (1 - a) * r.a), (this.rgb = f);
      }
      return this;
    }
    interpolate(e, t) {
      return (
        e &&
          (this._rgb = (function (e, t, f) {
            const a = E(n(e.r)),
              i = E(n(e.g)),
              s = E(n(e.b));
            return { r: r($(a + f * (E(n(t.r)) - a))), g: r($(i + f * (E(n(t.g)) - i))), b: r($(s + f * (E(n(t.b)) - s))), a: e.a + f * (t.a - e.a) };
          })(this._rgb, e._rgb, t)),
        this
      );
    }
    clone() {
      return new V(this.rgb);
    }
    alpha(e) {
      return (this._rgb.a = r(e)), this;
    }
    clearer(e) {
      return (this._rgb.a *= 1 - e), this;
    }
    greyscale() {
      const t = this._rgb,
        f = e(0.3 * t.r + 0.59 * t.g + 0.11 * t.b);
      return (t.r = t.g = t.b = f), this;
    }
    opaquer(e) {
      return (this._rgb.a *= 1 + e), this;
    }
    negate() {
      const e = this._rgb;
      return (e.r = 255 - e.r), (e.g = 255 - e.g), (e.b = 255 - e.b), this;
    }
    lighten(e) {
      return R(this._rgb, 2, e), this;
    }
    darken(e) {
      return R(this._rgb, 2, -e), this;
    }
    saturate(e) {
      return R(this._rgb, 1, e), this;
    }
    desaturate(e) {
      return R(this._rgb, 1, -e), this;
    }
    rotate(e) {
      return F(this._rgb, e), this;
    }
  }
  function W(e) {
    return new V(e);
  }
  var j = Object.freeze({
    __proto__: null,
    Color: V,
    default: W,
    round: e,
    lim: t,
    p2b: f,
    b2p: function (f) {
      return t(e(f / 2.55), 0, 100);
    },
    n2b: r,
    b2n: n,
    n2p: a,
    hexParse: o,
    hexString: d,
    rgb2hsl: m,
    hsl2rgb: Y,
    hwb2rgb: v,
    hsv2rgb: x,
    hueParse: _,
    rotate: F,
    hslString: M,
    nameParse: S,
    rgbParse: P,
    rgbString: Z
  });
  return Object.assign(W, j);
});
//# sourceMappingURL=color.min.js.map
