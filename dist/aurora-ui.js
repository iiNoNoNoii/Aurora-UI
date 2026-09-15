/*! Aurora UI v0.5.3-alpha | AGPL-3.0-or-later | Source: https://github.com/iiNoNoNoii/Aurora-UI */
const E = Math.PI * 2;
function x(n, t, e) {
  return n < t ? t : n > e ? e : n;
}
function m(n) {
  return x(n, 0, 1);
}
function _(n, t, e) {
  return n + (t - n) * e;
}
function _i(n, t, e) {
  return n === t ? e < n ? 0 : 1 : m((e - n) / (t - n));
}
function _t(n, t, e) {
  const i = _i(n, t, e);
  return i * i * (3 - 2 * i);
}
function It(n, t, e, i) {
  if (e <= 0)
    return t;
  const s = 1 - Math.pow(2, -i / e);
  return n + (t - n) * s;
}
function K(n) {
  let t = n >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let i = t;
    return i = Math.imul(i ^ i >>> 15, i | 1), i ^= i + Math.imul(i ^ i >>> 7, i | 61), ((i ^ i >>> 14) >>> 0) / 4294967296;
  };
}
function y(n, t, e) {
  return t + n() * (e - t);
}
function it(n, t) {
  const e = n % t;
  return e < 0 ? e + t : e;
}
function L(n) {
  return n * Math.PI / 180;
}
function Ft(n) {
  return n * 180 / Math.PI;
}
const lt = "aurora-background", Si = "Aurora Background", he = "0.5.3-alpha", Qt = ["low", "medium", "high", "ultra"], $i = ["background", "card"], xi = {
  low: {
    level: "low",
    renderScale: 0.6,
    maxDpr: 1,
    starCount: 70,
    cloudCount: 8,
    cloudLayers: 2,
    cloudSpriteSize: 192,
    sunGlowPasses: 1,
    shootingStars: !1,
    rainParticles: 100,
    snowParticles: 50,
    fogLayers: 2,
    lightningBolts: !1,
    maxFps: 30
  },
  medium: {
    level: "medium",
    renderScale: 0.8,
    maxDpr: 1.5,
    starCount: 140,
    cloudCount: 14,
    cloudLayers: 3,
    cloudSpriteSize: 256,
    sunGlowPasses: 2,
    shootingStars: !1,
    rainParticles: 220,
    snowParticles: 110,
    fogLayers: 3,
    lightningBolts: !0,
    maxFps: 45
  },
  high: {
    level: "high",
    renderScale: 1,
    maxDpr: 2,
    starCount: 240,
    cloudCount: 22,
    cloudLayers: 3,
    cloudSpriteSize: 320,
    sunGlowPasses: 3,
    shootingStars: !0,
    rainParticles: 400,
    snowParticles: 200,
    fogLayers: 4,
    lightningBolts: !0,
    maxFps: 60
  },
  ultra: {
    level: "ultra",
    renderScale: 1,
    maxDpr: 2.5,
    starCount: 380,
    cloudCount: 32,
    cloudLayers: 4,
    cloudSpriteSize: 384,
    sunGlowPasses: 4,
    shootingStars: !0,
    rainParticles: 650,
    snowParticles: 320,
    fogLayers: 5,
    lightningBolts: !0,
    maxFps: 60
  }
};
function mt(n) {
  return { ...xi[n] };
}
function me(n, t) {
  const e = Qt.indexOf(n);
  return Qt[x(e + t, 0, Qt.length - 1)];
}
function Ci() {
  if (typeof window > "u")
    return "medium";
  const n = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), i = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return n <= 2 || t <= 2 ? "low" : i && e <= 480 ? "medium" : i ? n >= 6 ? "high" : "medium" : n >= 8 && t >= 8 ? "high" : "medium";
}
function C(n, t) {
  return typeof n == "boolean" ? n : n === "true" ? !0 : n === "false" ? !1 : t;
}
function O(n, t, e, i) {
  const s = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(s) ? x(s, e, i) : t;
}
function ye(n, t) {
  return typeof n == "string" && n.length > 0 ? n : t;
}
function be(n, t, e) {
  return t.includes(n) ? n : e;
}
function Mi(n) {
  const t = {};
  if (n && typeof n == "object" && !Array.isArray(n))
    for (const [e, i] of Object.entries(n)) {
      if (typeof i != "string" && typeof i != "number")
        continue;
      const s = e.startsWith("--") ? e : `--${e}`;
      t[s] = String(i);
    }
  return t;
}
const Ai = "sun.sun";
function ei(n) {
  const t = n ?? {}, e = t.effects ?? {}, i = t.appearance ?? {}, s = t.performance ?? {}, r = t.background ?? {}, a = typeof t.glass == "boolean" ? { enabled: t.glass } : t.glass ?? {}, o = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : Ai, l = be(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: ye(t.type, `custom:${lt}`),
    mode: be(t.mode, $i, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: o,
    quality: l,
    debug: C(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : ye(t.height, "320px"),
    effects: {
      sun: C(e.sun, !0),
      moon: C(e.moon, !0),
      stars: C(e.stars, !0),
      shooting_stars: C(e.shooting_stars, !0),
      constellations: C(e.constellations, !0),
      clouds: C(e.clouds, !0),
      rain: C(e.rain, !0),
      snow: C(e.snow, !0),
      fog: C(e.fog, !0),
      lightning: C(e.lightning, !0),
      season: C(e.season, !0),
      parallax: C(e.parallax, !0)
    },
    appearance: {
      intensity: O(i.intensity, 1, 0, 2),
      saturation: O(i.saturation, 1, 0, 2),
      brightness: O(i.brightness, 1, 0.2, 2),
      blur: O(i.blur, 0, 0, 40),
      ambient_glow: O(i.ambient_glow, 1, 0, 2),
      opacity: O(i.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: O(s.max_fps, 60, 10, 120),
      auto_quality: C(s.auto_quality, !0),
      pause_when_hidden: C(s.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: C(r.transparent_lovelace, !0),
      transparent_header: C(r.transparent_header, !0),
      css_variables: Mi(r.css_variables),
      z_index: O(r.z_index, -1, -100, 100),
      ambient_variables: C(r.ambient_variables, !0)
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: C(a.enabled, !1),
      blur: O(a.blur, 14, 0, 40),
      opacity: O(a.opacity, 0.5, 0, 1),
      saturate: O(a.saturate, 1.4, 1, 3),
      border: C(a.border, !0),
      glow: O(a.glow, 1, 0, 2),
      radius: O(a.radius, 18, -1, 60),
      adaptive_text: C(a.adaptive_text, !1)
    }
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = globalThis, ce = zt.ShadowRoot && (zt.ShadyCSS === void 0 || zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), ve = /* @__PURE__ */ new WeakMap();
let ii = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== de)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ce && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ve.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ve.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ei = (n) => new ii(typeof n == "string" ? n : n + "", void 0, de), Et = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, r) => i + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[r + 1], n[0]);
  return new ii(e, n, de);
}, Ti = (n, t) => {
  if (ce)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), s = zt.litNonce;
      s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
    }
}, we = ce ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Ei(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Pi, defineProperty: ki, getOwnPropertyDescriptor: Ri, getOwnPropertyNames: Oi, getOwnPropertySymbols: Li, getPrototypeOf: Di } = Object, Q = globalThis, _e = Q.trustedTypes, Ii = _e ? _e.emptyScript : "", zi = Q.reactiveElementPolyfillSupport, St = (n, t) => n, Nt = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ii : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, ue = (n, t) => !Pi(n, t), Se = { attribute: !0, type: String, converter: Nt, reflect: !1, useDefault: !1, hasChanged: ue };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Q.litPropertyMetadata ?? (Q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let at = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Se) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && ki(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: r } = Ri(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: s, set(a) {
      const o = s?.call(this);
      r?.call(this, a), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Se;
  }
  static _$Ei() {
    if (this.hasOwnProperty(St("elementProperties")))
      return;
    const t = Di(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(St("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(St("properties"))) {
      const e = this.properties, i = [...Oi(e), ...Li(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, s] of e)
          this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(we(s));
    } else
      t !== void 0 && e.push(we(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ti(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Nt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = i.getPropertyOptions(s), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Nt;
      this._$Em = s;
      const o = a.fromAttribute(e, r.type);
      this[s] = o ?? this._$Ej?.get(s) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ue)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i))))
        return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: r }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, r] of this._$Ep)
          this[s] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [s, r] of i) {
          const { wrapped: a } = r, o = this[s];
          a !== !0 || this._$AL.has(s) || o === void 0 || this.C(s, void 0, r, o);
        }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
at.elementStyles = [], at.shadowRootOptions = { mode: "open" }, at[St("elementProperties")] = /* @__PURE__ */ new Map(), at[St("finalized")] = /* @__PURE__ */ new Map(), zi?.({ ReactiveElement: at }), (Q.reactiveElementVersions ?? (Q.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, $e = (n) => n, Ht = $t.trustedTypes, xe = Ht ? Ht.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ni = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, si = "?" + j, Fi = `<${si}>`, nt = document, Ct = () => nt.createComment(""), Mt = (n) => n === null || typeof n != "object" && typeof n != "function", pe = Array.isArray, Ni = (n) => pe(n) || typeof n?.[Symbol.iterator] == "function", Kt = `[ 	
\f\r]`, yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ce = /-->/g, Me = />/g, J = RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ae = /'/g, Ee = /"/g, ri = /^(?:script|style|textarea|title)$/i, Hi = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), P = Hi(1), st = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Te = /* @__PURE__ */ new WeakMap(), et = nt.createTreeWalker(nt, 129);
function ai(n, t) {
  if (!pe(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return xe !== void 0 ? xe.createHTML(t) : t;
}
const Ui = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = yt;
  for (let o = 0; o < e; o++) {
    const l = n[o];
    let h, c, d = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, c = a.exec(l), c !== null); )
      u = a.lastIndex, a === yt ? c[1] === "!--" ? a = Ce : c[1] !== void 0 ? a = Me : c[2] !== void 0 ? (ri.test(c[2]) && (s = RegExp("</" + c[2], "g")), a = J) : c[3] !== void 0 && (a = J) : a === J ? c[0] === ">" ? (a = s ?? yt, d = -1) : c[1] === void 0 ? d = -2 : (d = a.lastIndex - c[2].length, h = c[1], a = c[3] === void 0 ? J : c[3] === '"' ? Ee : Ae) : a === Ee || a === Ae ? a = J : a === Ce || a === Me ? a = yt : (a = J, s = void 0);
    const f = a === J && n[o + 1].startsWith("/>") ? " " : "";
    r += a === yt ? l + Fi : d >= 0 ? (i.push(h), l.slice(0, d) + ni + l.slice(d) + j + f) : l + j + (d === -2 ? o : f);
  }
  return [ai(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class At {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [h, c] = Ui(t, e);
    if (this.el = At.createElement(h, i), et.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = et.nextNode()) !== null && l.length < o; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes())
          for (const d of s.getAttributeNames())
            if (d.endsWith(ni)) {
              const u = c[a++], f = s.getAttribute(d).split(j), p = /([.?@])?(.*)/.exec(u);
              l.push({ type: 1, index: r, name: p[2], strings: f, ctor: p[1] === "." ? Bi : p[1] === "?" ? qi : p[1] === "@" ? Vi : Gt }), s.removeAttribute(d);
            } else
              d.startsWith(j) && (l.push({ type: 6, index: r }), s.removeAttribute(d));
        if (ri.test(s.tagName)) {
          const d = s.textContent.split(j), u = d.length - 1;
          if (u > 0) {
            s.textContent = Ht ? Ht.emptyScript : "";
            for (let f = 0; f < u; f++)
              s.append(d[f], Ct()), et.nextNode(), l.push({ type: 2, index: ++r });
            s.append(d[u], Ct());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === si)
          l.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = s.data.indexOf(j, d + 1)) !== -1; )
            l.push({ type: 7, index: r }), d += j.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = nt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ht(n, t, e = n, i) {
  if (t === st)
    return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = Mt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(n), s._$AT(n, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = s : e._$Cl = s), s !== void 0 && (t = ht(n, s._$AS(n, t.values), s, i)), t;
}
class Gi {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? nt).importNode(e, !0);
    et.currentNode = s;
    let r = et.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new Tt(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new Wi(r, this, t)), this._$AV.push(h), l = i[++o];
      }
      a !== l?.index && (r = et.nextNode(), a++);
    }
    return et.currentNode = nt, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Tt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = ht(this, t, e), Mt(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== st && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ni(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && Mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(nt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = At.createElement(ai(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s)
      this._$AH.p(e);
    else {
      const r = new Gi(s, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Te.get(t.strings);
    return e === void 0 && Te.set(t.strings, e = new At(t)), e;
  }
  k(t) {
    pe(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new Tt(this.O(Ct()), this.O(Ct()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = $e(t).nextSibling;
      $e(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Gt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = $;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let a = !1;
    if (r === void 0)
      t = ht(this, t, e, 0), a = !Mt(t) || t !== this._$AH && t !== st, a && (this._$AH = t);
    else {
      const o = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = ht(this, o[i + l], e, l), h === st && (h = this._$AH[l]), a || (a = !Mt(h) || h !== this._$AH[l]), h === $ ? t = $ : t !== $ && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Bi extends Gt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class qi extends Gt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Vi extends Gt {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ht(this, t, e, 0) ?? $) === st)
      return;
    const i = this._$AH, s = t === $ && i !== $ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== $ && (i === $ || s);
    s && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wi {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ht(this, t);
  }
}
const Yi = $t.litHtmlPolyfillSupport;
Yi?.(At, Tt), ($t.litHtmlVersions ?? ($t.litHtmlVersions = [])).push("3.3.3");
const ji = (n, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = s = new Tt(t.insertBefore(Ct(), r), r, void 0, e ?? {});
  }
  return s._$AI(n), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis;
let q = class extends at {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ji(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return st;
  }
};
q._$litElement$ = !0, q.finalized = !0, xt.litElementHydrateSupport?.({ LitElement: q });
const Xi = xt.litElementPolyfillSupport;
Xi?.({ LitElement: q });
(xt.litElementVersions ?? (xt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qi = { attribute: !0, type: String, converter: Nt, reflect: !1, hasChanged: ue }, Ki = (n = Qi, t, e) => {
  const { kind: i, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), i === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), i === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, n, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, n, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, n, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function ut(n) {
  return (t, e) => typeof e == "object" ? Ki(n, t, e) : ((i, s, r) => {
    const a = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, i), a ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(n) {
  return ut({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zi = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ji = (n) => (...t) => ({ _$litDirective$: n, values: t });
let tn = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oi = "important", en = " !" + oi, ot = Ji(class extends tn {
  constructor(n) {
    if (super(n), n.type !== Zi.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((t, e) => {
      const i = n[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(n, [t]) {
    const { style: e } = n.element;
    if (this.ft === void 0)
      return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft)
      t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const s = t[i];
      if (s != null) {
        this.ft.add(i);
        const r = typeof s == "string" && s.endsWith(en);
        i.includes("-") || r ? e.setProperty(i, r ? s.slice(0, -11) : s, r ? oi : "") : e[i] = s;
      }
    }
    return st;
  }
});
function G(n) {
  let t = n.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function S(n, t = 1) {
  const e = Math.round(x(n[0], 0, 255)), i = Math.round(x(n[1], 0, 255)), s = Math.round(x(n[2], 0, 255));
  return t >= 1 ? `rgb(${e},${i},${s})` : `rgba(${e},${i},${s},${x(t, 0, 1).toFixed(3)})`;
}
function D(n, t, e) {
  return [_(n[0], t[0], e), _(n[1], t[1], e), _(n[2], t[2], e)];
}
function Bt(n) {
  return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
}
function nn(n, t) {
  const e = Bt(n);
  return D(n, [e, e, e], x(t, 0, 1));
}
function Zt(n, t) {
  return [x(n[0] * t, 0, 255), x(n[1] * t, 0, 255), x(n[2] * t, 0, 255)];
}
function sn(n, t) {
  const e = Bt(n);
  return [
    x(e + (n[0] - e) * t, 0, 255),
    x(e + (n[1] - e) * t, 0, 255),
    x(e + (n[2] - e) * t, 0, 255)
  ];
}
const li = new Float32Array(256);
for (let n = 0; n < 256; n++) {
  const t = n / 255;
  li[n] = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function Jt(n) {
  const t = Math.round(x(n, 0, 255));
  return li[t];
}
function te(n) {
  const t = x(n, 0, 1);
  return (t <= 31308e-7 ? t * 12.92 : 1.055 * Math.pow(t, 1 / 2.4) - 0.055) * 255;
}
function rn(n) {
  return [Jt(n[0]), Jt(n[1]), Jt(n[2])];
}
function an(n) {
  return [te(n[0]), te(n[1]), te(n[2])];
}
function X(n, t) {
  const e = n[0] - t[0], i = n[1] - t[1], s = n[2] - t[2];
  return e * e + i * i + s * s;
}
const hi = Et`
  :host {
    display: block;
    --aurora-card-padding: 14px;
    --aurora-radius: var(--ha-card-border-radius, 18px);
    --aurora-text: var(--aurora-contrast-color, var(--primary-text-color, #f2f6ff));
  }

  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--aurora-radius);
    color: var(--aurora-text);
    transition:
      background-color 0.4s ease,
      box-shadow 0.4s ease;
  }

  /* The tinted fill that expresses the entity's value. Sits under the content
     and never intercepts input. */
  .fill {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
    will-change: transform;
  }

  .content {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: var(--aurora-card-padding);
  }

  .icon-button {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    color: inherit;
    background: rgba(var(--aurora-icon-rgb, 255, 255, 255), 0.14);
    transition:
      background-color 0.25s ease,
      transform 0.12s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .icon-button:hover {
    background: rgba(var(--aurora-icon-rgb, 255, 255, 255), 0.22);
  }

  .icon-button:active {
    transform: scale(0.94);
  }

  .icon-button:focus-visible {
    outline: 2px solid var(--aurora-accent-color, #7ab8ff);
    outline-offset: 2px;
  }

  .icon-button ha-icon {
    --mdc-icon-size: 24px;
  }

  .labels {
    min-width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .state {
    font-size: 13px;
    line-height: 1.25;
    opacity: 0.72;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .error {
    padding: 14px 16px;
    border-radius: var(--aurora-radius);
    background: var(--error-color, #db4437);
    color: #fff;
    font-size: 14px;
  }

  :host([data-unavailable='true']) ha-card {
    opacity: 0.55;
  }

  @media (prefers-reduced-motion: reduce) {
    ha-card,
    .fill,
    .icon-button {
      transition: none;
    }
  }
`, on = 6;
class ci {
  constructor(t) {
    this.options = t, this.element = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.dragging = !1, this.holdTimer = null, this.holdFired = !1, this.onPointerDown = (e) => {
      this.options.isDisabled?.() || !this.element || e.button !== 0 || (this.pointerId = e.pointerId, this.startX = e.clientX, this.startY = e.clientY, this.dragging = !1, this.holdFired = !1, this.element.addEventListener("pointermove", this.onPointerMove), this.element.addEventListener("pointerup", this.onPointerUp), this.element.addEventListener("pointercancel", this.onPointerUp), this.options.onHold && (this.holdTimer = window.setTimeout(() => {
        this.holdTimer = null, !this.dragging && (this.holdFired = !0, this.options.onHold?.());
      }, this.options.holdDelay ?? 500)));
    }, this.onPointerMove = (e) => {
      if (!(e.pointerId !== this.pointerId || !this.element)) {
        if (!this.dragging) {
          if ((this.options.axis === "x" ? Math.abs(e.clientX - this.startX) : Math.abs(e.clientY - this.startY)) < on)
            return;
          this.dragging = !0, this.cancelHold();
          try {
            this.element.setPointerCapture(e.pointerId);
          } catch {
          }
        }
        this.options.onMove?.(this.fraction(e));
      }
    }, this.onPointerUp = (e) => {
      if (e.pointerId !== this.pointerId)
        return;
      const i = this.element;
      if (this.cancelHold(), i) {
        i.removeEventListener("pointermove", this.onPointerMove), i.removeEventListener("pointerup", this.onPointerUp), i.removeEventListener("pointercancel", this.onPointerUp);
        try {
          i.hasPointerCapture(e.pointerId) && i.releasePointerCapture(e.pointerId);
        } catch {
        }
      }
      if (this.pointerId = null, e.type === "pointercancel") {
        this.dragging = !1;
        return;
      }
      this.dragging ? this.options.onCommit?.(this.fraction(e)) : this.holdFired || this.options.onTap?.(), this.dragging = !1;
    };
  }
  /** CSS value the host element must use for `touch-action`. */
  get touchAction() {
    return this.options.axis === "x" ? "pan-y" : "pan-x";
  }
  attach(t) {
    this.element !== t && (this.detach(), this.element = t, t.style.touchAction = this.touchAction, t.addEventListener("pointerdown", this.onPointerDown));
  }
  detach() {
    this.cancelHold(), this.element && (this.element.removeEventListener("pointerdown", this.onPointerDown), this.element.removeEventListener("pointermove", this.onPointerMove), this.element.removeEventListener("pointerup", this.onPointerUp), this.element.removeEventListener("pointercancel", this.onPointerUp), this.element = null), this.pointerId = null, this.dragging = !1;
  }
  fraction(t) {
    const e = this.element;
    if (!e)
      return 0;
    const i = e.getBoundingClientRect();
    return this.options.axis === "x" ? m((t.clientX - i.left) / Math.max(1, i.width)) : m(1 - (t.clientY - i.top) / Math.max(1, i.height));
  }
  cancelHold() {
    this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null);
  }
}
function ln(n, t, e) {
  n.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function di(n, t) {
  ln(n, "hass-more-info", { entityId: t });
}
function ui(n, t) {
  if (!(!n || !t))
    return n.states[t];
}
function H(n) {
  return !n || n.state === "unavailable" || n.state === "unknown";
}
function B(n, t) {
  const e = n?.attributes?.[t];
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string") {
    const i = Number.parseFloat(e);
    if (Number.isFinite(i))
      return i;
  }
  return null;
}
function ae(n, t) {
  const e = n?.attributes?.[t];
  return typeof e == "string" ? e : null;
}
function pi(n, t) {
  const e = n?.attributes?.[t];
  return Array.isArray(e) ? e.filter((i) => typeof i == "string") : [];
}
function fi(n, t) {
  const e = ae(n, "friendly_name");
  if (e)
    return e;
  const i = n?.entity_id ?? t ?? "";
  return (i.split(".")[1] ?? i).replace(/_/g, " ").replace(/\b\w/g, (r) => r.toUpperCase());
}
function Pe(n, t) {
  const e = t < 1 ? 1 : 0, i = n.toFixed(e);
  return e > 0 && i.endsWith(".0") ? i.slice(0, -2) : i;
}
function Ut(n, t, e, i) {
  n?.callService?.(t, e, i);
}
function ke(n) {
  const t = Math.max(1e3, Math.min(4e4, n)) / 100;
  let e, i, s;
  t <= 66 ? (e = 255, i = 99.4708025861 * Math.log(t) - 161.1195681661) : (e = 329.698727446 * Math.pow(t - 60, -0.1332047592), i = 288.1221695283 * Math.pow(t - 60, -0.0755148492)), t >= 66 ? s = 255 : t <= 19 ? s = 0 : s = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const r = (a) => Math.max(0, Math.min(255, a));
  return [r(e), r(i), r(s)];
}
var hn = Object.defineProperty, cn = Object.getOwnPropertyDescriptor, qt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? cn(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(t, e, s) : a(s)) || s);
  return i && s && hn(t, e, s), s;
};
const ct = "aurora-climate", dn = [86, 158, 232], ee = [150, 176, 200], un = [246, 152, 74], pn = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, ie = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan running",
  idle: "Idle",
  off: "Off",
  preheating: "Preheating"
};
class pt extends q {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingTarget = null, this.drag = new ci({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragMove(t, !0),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || H(this.entity) || !this.config.slider
    }), this.sendTimer = null, this.clearPendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-climate: you need to set an "entity"');
    if (!t.entity.startsWith("climate."))
      throw this.errorMessage = `"${t.entity}" is not a climate entity.`, new Error(`aurora-climate: "${t.entity}" is not a climate entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${ct}`,
      entity: t.entity,
      name: t.name,
      icon: t.icon,
      show_modes: t.show_modes !== !1,
      slider: t.slider !== !1
    };
  }
  getCardSize() {
    return this.config?.show_modes ? 4 : 3;
  }
  getGridOptions() {
    return {
      rows: this.config?.show_modes ? 4 : 3,
      columns: 6,
      min_rows: 3,
      min_columns: 4
    };
  }
  getLayoutOptions() {
    return this.getGridOptions();
  }
  static getStubConfig(t) {
    const e = t ? Object.keys(t.states).find((i) => i.startsWith("climate.")) : void 0;
    return { type: `custom:${ct}`, entity: e ?? "climate.example" };
  }
  static getConfigElement() {
    return document.createElement("aurora-climate-editor");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.drag.detach(), this.cancelTimers();
  }
  updated(t) {
    super.updated(t);
    const e = this.renderRoot?.querySelector(".dial");
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(H(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return ui(this.hass, this.config?.entity);
  }
  get minTemp() {
    return B(this.entity, "min_temp") ?? 7;
  }
  get maxTemp() {
    return B(this.entity, "max_temp") ?? 35;
  }
  get step() {
    return B(this.entity, "target_temp_step") ?? 0.5;
  }
  get unit() {
    return ae(this.entity, "temperature_unit") ?? this.hass?.config?.unit_system?.temperature ?? "°C";
  }
  get currentTemp() {
    return B(this.entity, "current_temperature");
  }
  get target() {
    return this.pendingTarget !== null ? this.pendingTarget : B(this.entity, "temperature");
  }
  /** Where the target sits in the thermostat's own range, 0..1. */
  get targetFraction() {
    const t = this.target;
    if (t === null)
      return 0.5;
    const e = this.maxTemp - this.minTemp;
    return e <= 0 ? 0.5 : m((t - this.minTemp) / e);
  }
  /** Blue when cold, amber when warm, muted when the thermostat is off. */
  get accent() {
    if (this.entity?.state === "off" || H(this.entity))
      return ee;
    const t = this.targetFraction;
    return t < 0.5 ? D(dn, ee, t * 2) : D(ee, un, (t - 0.5) * 2);
  }
  get hvacModes() {
    return pi(this.entity, "hvac_modes");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  roundToStep(t) {
    const e = this.step, i = Math.round(t / e) * e, s = e < 1 ? 1 : 0;
    return Number(x(i, this.minTemp, this.maxTemp).toFixed(s));
  }
  onDragMove(t, e = !1) {
    const i = this.roundToStep(_(this.minTemp, this.maxTemp, t));
    this.pendingTarget = i, e ? this.sendTarget(i, 0) : this.sendTarget(i, 400);
  }
  adjust(t) {
    if (!this.config || H(this.entity))
      return;
    const e = this.target ?? this.currentTemp ?? this.minTemp, i = this.roundToStep(e + t * this.step);
    i !== this.target && (this.pendingTarget = i, this.sendTarget(i, 500));
  }
  /**
   * Debounced so a drag or a burst of taps produces one service call.
   * `delay: 0` sends immediately, which is what a released drag wants.
   */
  sendTarget(t, e) {
    if (!this.config)
      return;
    this.sendTimer !== null && window.clearTimeout(this.sendTimer);
    const i = () => {
      this.sendTimer = null, Ut(this.hass, "climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: t
      }), this.clearPendingTimer !== null && window.clearTimeout(this.clearPendingTimer), this.clearPendingTimer = window.setTimeout(() => {
        this.pendingTarget = null, this.clearPendingTimer = null;
      }, 2e3);
    };
    e <= 0 ? i() : this.sendTimer = window.setTimeout(i, e);
  }
  setHvacMode(t) {
    this.config && Ut(this.hass, "climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: t
    });
  }
  openMoreInfo() {
    this.config && di(this, this.config.entity);
  }
  cancelTimers() {
    this.sendTimer !== null && (window.clearTimeout(this.sendTimer), this.sendTimer = null), this.clearPendingTimer !== null && (window.clearTimeout(this.clearPendingTimer), this.clearPendingTimer = null);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  actionText() {
    const t = this.entity;
    if (!t)
      return "Not found";
    if (H(t))
      return "Unavailable";
    const e = ae(t, "hvac_action");
    return e && ie[e] ? ie[e] : ie[t.state] ?? t.state.replace(/_/g, " ");
  }
  render() {
    if (this.errorMessage)
      return P`<div class="error">Aurora Climate: ${this.errorMessage}</div>`;
    if (!this.config)
      return $;
    const t = this.entity, e = H(t), i = this.accent, s = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.target, a = this.currentTemp, o = this.unit, l = this.hvacModes, h = ot({
      "--aurora-climate-rgb": s
    });
    return P`
      <ha-card style=${h}>
        <div class="fill"></div>
        <div class="content">
          <div class="header">
            <button
              class="icon-button"
              type="button"
              aria-label="More information"
              style=${ot({ color: S(i) })}
              @click=${this.openMoreInfo}
            >
              <ha-icon .icon=${this.config.icon ?? "mdi:thermostat"}></ha-icon>
            </button>
            <div class="labels">
              <div class="name">${this.config.name ?? fi(t, this.config.entity)}</div>
              <div class="state">
                ${a !== null ? `Currently ${Pe(a, 0.1)} ${o}` : "No sensor reading"}
              </div>
            </div>
            <div class="action">${this.actionText()}</div>
          </div>

          <div class="dial">
            <button
              class="step"
              type="button"
              aria-label="Decrease target temperature"
              ?disabled=${e || r === null}
              @click=${() => this.adjust(-1)}
            >
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>

            <div class="target">
              ${r !== null ? P`
                    <span class="number">${Pe(r, this.step)}</span
                    ><span class="unit">${o}</span>
                  ` : P`<span class="number">--</span>`}
              <div class="current">
                ${r !== null ? `Target · ${this.minTemp}–${this.maxTemp} ${o}` : ""}
              </div>
            </div>

            <button
              class="step"
              type="button"
              aria-label="Increase target temperature"
              ?disabled=${e || r === null}
              @click=${() => this.adjust(1)}
            >
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>

          <div class="track">
            <div
              class="level"
              style=${ot({ width: `${(this.targetFraction * 100).toFixed(2)}%` })}
            ></div>
          </div>

          ${this.config.show_modes && l.length > 0 ? P`
                <div class="modes">
                  ${l.map(
      (c) => P`
                      <button
                        class="mode"
                        type="button"
                        aria-pressed=${String(t?.state === c)}
                        aria-label=${c.replace(/_/g, " ")}
                        title=${c.replace(/_/g, " ")}
                        ?disabled=${e}
                        @click=${() => this.setHvacMode(c)}
                      >
                        <ha-icon .icon=${pn[c] ?? "mdi:tune"}></ha-icon>
                      </button>
                    `
    )}
                </div>
              ` : $}
        </div>
      </ha-card>
    `;
  }
}
pt.styles = [
  hi,
  Et`
      :host {
        --aurora-card-padding: 16px;
      }

      ha-card {
        user-select: none;
        -webkit-user-select: none;
      }

      .fill {
        background: linear-gradient(
          160deg,
          rgba(var(--aurora-climate-rgb), 0.38),
          rgba(var(--aurora-climate-rgb), 0.08) 65%,
          rgba(var(--aurora-climate-rgb), 0) 100%
        );
      }

      .content {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header .labels {
        flex: 1 1 auto;
      }

      .action {
        flex: 0 0 auto;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.02em;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(var(--aurora-climate-rgb), 0.28);
        white-space: nowrap;
      }

      .dial {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 2px 0 4px;
      }

      .step {
        flex: 0 0 auto;
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: inherit;
        background: rgba(255, 255, 255, 0.14);
        transition:
          background-color 0.2s ease,
          transform 0.12s ease;
        -webkit-tap-highlight-color: transparent;
      }

      .step:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.24);
      }

      .step:active:not(:disabled) {
        transform: scale(0.92);
      }

      .step:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .step:focus-visible {
        outline: 2px solid var(--aurora-accent-color, #7ab8ff);
        outline-offset: 2px;
      }

      .target {
        flex: 1 1 auto;
        text-align: center;
        line-height: 1;
      }

      .target .number {
        font-size: 46px;
        font-weight: 300;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }

      .target .unit {
        font-size: 20px;
        font-weight: 400;
        opacity: 0.7;
        vertical-align: super;
        margin-left: 2px;
      }

      .target .current {
        margin-top: 6px;
        font-size: 13px;
        opacity: 0.72;
        font-variant-numeric: tabular-nums;
      }

      .track {
        position: relative;
        height: 6px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.16);
        overflow: hidden;
      }

      .track .level {
        position: absolute;
        inset: 0 auto 0 0;
        border-radius: 999px;
        background: rgba(var(--aurora-climate-rgb), 0.95);
        transition: width 0.2s ease;
      }

      .modes {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .mode {
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        width: 40px;
        height: 36px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        background: rgba(255, 255, 255, 0.1);
        transition:
          background-color 0.2s ease,
          opacity 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }

      .mode:hover {
        opacity: 0.85;
      }

      .mode[aria-pressed='true'] {
        opacity: 1;
        background: rgba(var(--aurora-climate-rgb), 0.45);
      }

      .mode:focus-visible {
        outline: 2px solid var(--aurora-accent-color, #7ab8ff);
        outline-offset: 2px;
      }

      .mode ha-icon {
        --mdc-icon-size: 20px;
      }

      @media (prefers-reduced-motion: reduce) {
        .step,
        .mode,
        .track .level {
          transition: none;
        }
      }
    `
];
qt([
  ut({ attribute: !1 })
], pt.prototype, "hass", 2);
qt([
  F()
], pt.prototype, "config", 2);
qt([
  F()
], pt.prototype, "errorMessage", 2);
qt([
  F()
], pt.prototype, "pendingTarget", 2);
customElements.get(ct) || customElements.define(ct, pt);
var fn = Object.defineProperty, gn = Object.getOwnPropertyDescriptor, Vt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? gn(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(t, e, s) : a(s)) || s);
  return i && s && fn(t, e, s), s;
};
const dt = "aurora-light", Re = [255, 197, 122], Oe = 1;
class ft extends q {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingBrightness = null, this.drag = new ci({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragCommit(t),
      onTap: () => this.toggle(),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || H(this.entity)
    }), this.pendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-light: you need to set an "entity"');
    if (!t.entity.startsWith("light."))
      throw this.errorMessage = `"${t.entity}" is not a light entity.`, new Error(`aurora-light: "${t.entity}" is not a light entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${dt}`,
      entity: t.entity,
      name: t.name,
      icon: t.icon,
      slider: t.slider !== !1,
      use_light_color: t.use_light_color !== !1
    };
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return { rows: 1, columns: 6, min_rows: 1, min_columns: 3 };
  }
  getLayoutOptions() {
    return this.getGridOptions();
  }
  static getStubConfig(t) {
    const e = t ? Object.keys(t.states).find((i) => i.startsWith("light.")) : void 0;
    return { type: `custom:${dt}`, entity: e ?? "light.example" };
  }
  static getConfigElement() {
    return document.createElement("aurora-light-editor");
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.drag.detach(), this.clearPendingTimer();
  }
  updated(t) {
    super.updated(t);
    const e = this.renderRoot?.querySelector("ha-card");
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(H(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return ui(this.hass, this.config?.entity);
  }
  get isOn() {
    return this.entity?.state === "on";
  }
  /** 0..100. Home Assistant reports 0..255, which nobody wants to read. */
  get brightnessPercent() {
    if (this.pendingBrightness !== null)
      return this.pendingBrightness;
    if (!this.isOn)
      return 0;
    const t = B(this.entity, "brightness");
    return t === null ? 100 : x(Math.round(t / 255 * 100), 0, 100);
  }
  /** The light's real colour, or a warm white when it has none. */
  get lightColor() {
    if (!this.config?.use_light_color)
      return Re;
    const t = this.entity?.attributes?.rgb_color;
    if (Array.isArray(t) && t.length >= 3) {
      const [s, r, a] = t;
      if ([s, r, a].every((o) => typeof o == "number" && Number.isFinite(o)))
        return [s, r, a];
    }
    const e = B(this.entity, "color_temp_kelvin");
    if (e !== null)
      return ke(e);
    const i = B(this.entity, "color_temp");
    return i !== null && i > 0 ? ke(1e6 / i) : Re;
  }
  get supportsBrightness() {
    const t = pi(this.entity, "supported_color_modes");
    return t.length === 0 ? B(this.entity, "brightness") !== null : !(t.length === 1 && t[0] === "onoff");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  onDragMove(t) {
    this.supportsBrightness && (this.pendingBrightness = x(
      Math.round(t * 100),
      Oe,
      100
    ));
  }
  onDragCommit(t) {
    if (!this.config)
      return;
    if (!this.supportsBrightness) {
      this.toggle();
      return;
    }
    const e = x(Math.round(t * 100), Oe, 100);
    this.pendingBrightness = e, Ut(this.hass, "light", "turn_on", {
      entity_id: this.config.entity,
      brightness_pct: e
    }), this.clearPendingTimer(), this.pendingTimer = window.setTimeout(() => {
      this.pendingBrightness = null, this.pendingTimer = null;
    }, 1500);
  }
  toggle() {
    !this.config || H(this.entity) || (Ut(this.hass, "light", "toggle", { entity_id: this.config.entity }), this.pendingBrightness = null, this.clearPendingTimer());
  }
  openMoreInfo() {
    this.config && di(this, this.config.entity);
  }
  clearPendingTimer() {
    this.pendingTimer !== null && (window.clearTimeout(this.pendingTimer), this.pendingTimer = null);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  stateText() {
    const t = this.entity;
    return t ? H(t) ? "Unavailable" : this.isOn ? this.supportsBrightness ? `${this.brightnessPercent}%` : "On" : "Off" : "Entity not found";
  }
  render() {
    if (this.errorMessage)
      return P`<div class="error">Aurora Light: ${this.errorMessage}</div>`;
    if (!this.config)
      return $;
    const t = this.entity, e = !t, i = this.lightColor, s = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.brightnessPercent, a = this.isOn && !e, o = this.config.icon ?? (a ? "mdi:lightbulb" : "mdi:lightbulb-outline"), l = ot({
      "--aurora-light-rgb": s,
      "--aurora-light-glow": a ? String(m(0.25 + r / 100 * 0.55)) : "0",
      "--aurora-icon-alpha": a ? "0.3" : "0.12",
      "--aurora-icon-color": a ? S(i) : "inherit"
    }), h = a && this.supportsBrightness && this.config.slider;
    return P`
      <ha-card style=${l}>
        <div class="glow"></div>
        ${h ? P`
              <div
                class="fill"
                style=${ot({ transform: `scaleX(${(r / 100).toFixed(4)})` })}
              ></div>
              <div class="edge" style=${ot({ left: `${r}%` })}></div>
            ` : $}
        <div class="content">
          <button
            class="icon-button"
            type="button"
            aria-label=${a ? "Turn off" : "Turn on"}
            @click=${this.onIconClick}
          >
            <ha-icon .icon=${o}></ha-icon>
          </button>
          <div class="labels">
            <div class="name">${this.config.name ?? fi(t, this.config.entity)}</div>
            <div class="state">${this.stateText()}</div>
          </div>
          ${a && this.supportsBrightness ? P`<div class="value">${r}%</div>` : $}
        </div>
      </ha-card>
    `;
  }
  onIconClick(t) {
    t.stopPropagation(), this.toggle();
  }
}
ft.styles = [
  hi,
  Et`
      ha-card {
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
      }

      .fill {
        transform-origin: left center;
        background: linear-gradient(
          90deg,
          rgba(var(--aurora-light-rgb), 0.42),
          rgba(var(--aurora-light-rgb), 0.24)
        );
      }

      .glow {
        position: absolute;
        inset: -40% -10%;
        pointer-events: none;
        background: radial-gradient(
          60% 120% at 12% 50%,
          rgba(var(--aurora-light-rgb), 0.5),
          rgba(var(--aurora-light-rgb), 0) 70%
        );
        opacity: var(--aurora-light-glow, 0);
        transition: opacity 0.35s ease;
      }

      .icon-button {
        background: rgba(var(--aurora-light-rgb), var(--aurora-icon-alpha, 0.16));
        color: var(--aurora-icon-color, inherit);
      }

      .icon-button:hover {
        background: rgba(var(--aurora-light-rgb), calc(var(--aurora-icon-alpha, 0.16) + 0.1));
      }

      .value {
        flex: 0 0 auto;
        font-size: 16px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        opacity: 0.9;
        padding-left: 4px;
      }

      /* A hairline that makes the exact brightness readable, which a soft
         gradient alone does not. */
      .edge {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        pointer-events: none;
        background: rgba(var(--aurora-light-rgb), 0.9);
        opacity: 0.55;
      }
    `
];
Vt([
  ut({ attribute: !1 })
], ft.prototype, "hass", 2);
Vt([
  F()
], ft.prototype, "config", 2);
Vt([
  F()
], ft.prototype, "errorMessage", 2);
Vt([
  F()
], ft.prototype, "pendingBrightness", 2);
customElements.get(dt) || customElements.define(dt, ft);
class mn {
  constructor(t) {
    this.callback = t, this.frameHandle = null, this.running = !1, this.lastFrame = 0, this.startTime = 0, this.elapsed = 0, this.minFrameMs = 0, this.accumulator = 0, this.tick = (e) => {
      if (!this.running)
        return;
      if (this.frameHandle = requestAnimationFrame(this.tick), this.startTime === 0) {
        this.startTime = e, this.lastFrame = e;
        return;
      }
      const i = e - this.lastFrame;
      if (this.minFrameMs > 0) {
        if (this.accumulator += i, this.lastFrame = e, this.accumulator < this.minFrameMs)
          return;
        const r = Math.min(this.accumulator, 100) / 1e3;
        this.accumulator = 0, this.elapsed += r, this.callback(r, this.elapsed);
        return;
      }
      this.lastFrame = e;
      const s = Math.min(i, 100) / 1e3;
      this.elapsed += s, this.callback(s, this.elapsed);
    };
  }
  get isRunning() {
    return this.running;
  }
  setMaxFps(t) {
    this.minFrameMs = t > 0 && t < 120 ? 1e3 / t - 1.5 : 0;
  }
  start() {
    this.running || (this.running = !0, this.lastFrame = 0, this.startTime = 0, this.accumulator = 0, this.frameHandle = requestAnimationFrame(this.tick));
  }
  stop() {
    this.running = !1, this.frameHandle !== null && (cancelAnimationFrame(this.frameHandle), this.frameHandle = null);
  }
}
const yn = ["low", "medium", "high", "ultra"];
function Le(n) {
  return yn.indexOf(n);
}
class bn {
  constructor(t, e, i) {
    this.level = t, this.enabled = e, this.targetFps = i, this.frameTimes = [], this.lastDecision = 0, this.fpsSamples = 0, this.fpsAccum = 0, this.fpsWindowStart = 0, this.fps = 0, this.ceiling = "ultra";
  }
  get quality() {
    return this.level;
  }
  setEnabled(t) {
    this.enabled = t;
  }
  /** Force a level (config change / user override) and reset the history. */
  setQuality(t) {
    this.level = t, this.ceiling = "ultra", this.reset();
  }
  reset() {
    this.frameTimes.length = 0, this.lastDecision = performance.now(), this.fpsSamples = 0, this.fpsAccum = 0, this.fpsWindowStart = performance.now();
  }
  /**
   * Feed one frame. Returns the new quality level when it changed, else null.
   * `frameCost` is the time spent inside our own render call, in ms.
   */
  sample(t, e) {
    const i = performance.now();
    if (t > 0 && (this.fpsAccum += 1 / t, this.fpsSamples++), i - this.fpsWindowStart >= 500 && (this.fps = this.fpsSamples > 0 ? this.fpsAccum / this.fpsSamples : 0, this.fpsAccum = 0, this.fpsSamples = 0, this.fpsWindowStart = i), !this.enabled || (this.frameTimes.push(e), this.frameTimes.length > 180 && this.frameTimes.shift(), i - this.lastDecision < 5e3 || this.frameTimes.length < 60))
      return null;
    this.lastDecision = i;
    const s = [...this.frameTimes].sort((o, l) => o - l), r = s[Math.floor(s.length / 2)], a = 1e3 / this.targetFps;
    if (r > a * 0.55) {
      const o = me(this.level, -1);
      if (o !== this.level)
        return this.level = o, this.ceiling = o, this.frameTimes.length = 0, o;
    } else if (r < a * 0.18) {
      const o = me(this.level, 1);
      if (o !== this.level && Le(o) <= Le(this.ceiling))
        return this.level = o, this.frameTimes.length = 0, o;
    }
    return null;
  }
}
function Y(n, t) {
  return {
    elevation: n,
    palette: {
      zenith: G(t.zenith),
      upper: G(t.upper),
      middle: G(t.middle),
      lower: G(t.lower),
      horizon: G(t.horizon),
      sunCore: G(t.sunCore),
      sunGlow: G(t.sunGlow),
      ambient: G(t.ambient),
      cloud: G(t.cloud)
    }
  };
}
const tt = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  Y(-90, {
    zenith: "#020610",
    upper: "#040a1c",
    middle: "#07122e",
    lower: "#0a193c",
    horizon: "#0e2048",
    sunCore: "#0e2048",
    sunGlow: "#12264f",
    ambient: "#16294f",
    cloud: "#1b2a48"
  }),
  // Astronomical / nautical twilight.
  Y(-12, {
    zenith: "#03081a",
    upper: "#061029",
    middle: "#0e1e44",
    lower: "#1b2c58",
    horizon: "#2e3a6b",
    sunCore: "#4a4a80",
    sunGlow: "#3c3f74",
    ambient: "#2a3663",
    cloud: "#28365c"
  }),
  // Civil twilight – the "blue hour".
  Y(-6, {
    zenith: "#061026",
    upper: "#0d1c3f",
    middle: "#222f5e",
    lower: "#4a3a70",
    horizon: "#7d4573",
    sunCore: "#c96a6a",
    sunGlow: "#8f4a73",
    ambient: "#4d3c6a",
    cloud: "#4a3f66"
  }),
  // Sun just under the horizon – violet into rose.
  Y(-2, {
    zenith: "#0c1b3d",
    upper: "#1d2f5c",
    middle: "#4a3f78",
    lower: "#9c4f77",
    horizon: "#e07a5f",
    sunCore: "#ffd9a0",
    sunGlow: "#ff9d63",
    ambient: "#a4587a",
    cloud: "#8d5f7e"
  }),
  // Golden hour.
  Y(3, {
    zenith: "#123468",
    upper: "#2c568f",
    middle: "#6f7ba6",
    lower: "#d99a72",
    horizon: "#ffc182",
    sunCore: "#fff3cf",
    sunGlow: "#ffb267",
    ambient: "#e3a684",
    cloud: "#d8a58f"
  }),
  // Morning / late afternoon.
  Y(12, {
    zenith: "#1a4f9c",
    upper: "#3576bd",
    middle: "#79a6d6",
    lower: "#c3d9ee",
    horizon: "#e9dcc8",
    sunCore: "#fffbe8",
    sunGlow: "#ffe6b0",
    ambient: "#cfe0f2",
    cloud: "#f2f5fa"
  }),
  // Full day.
  Y(35, {
    zenith: "#0f5fc4",
    upper: "#2b86dd",
    middle: "#71bcef",
    lower: "#bcdcf7",
    horizon: "#e3f0fb",
    sunCore: "#ffffff",
    sunGlow: "#fff6d8",
    ambient: "#dcecfb",
    cloud: "#ffffff"
  }),
  // Overhead sun.
  Y(70, {
    zenith: "#0b57bd",
    upper: "#2382e0",
    middle: "#6cbcf2",
    lower: "#bfe2fa",
    horizon: "#eaf6ff",
    sunCore: "#ffffff",
    sunGlow: "#fffbe8",
    ambient: "#e6f3ff",
    cloud: "#ffffff"
  })
], fe = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], vn = [255, 118, 162], wn = [255, 138, 56];
function _n(n, t, e) {
  const i = {};
  for (const s of fe)
    i[s] = D(n[s], t[s], e);
  return i;
}
function Sn(n) {
  if (n <= tt[0].elevation)
    return { ...tt[0].palette };
  const t = tt[tt.length - 1];
  if (n >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < tt.length - 1; e++) {
    const i = tt[e], s = tt[e + 1];
    if (n >= i.elevation && n <= s.elevation) {
      const r = _t(i.elevation, s.elevation, n);
      return _n(i.palette, s.palette, r);
    }
  }
  return { ...t.palette };
}
function gi(n) {
  const t = _t(-4, 8, n), e = 1 - _t(-14, -2, n), i = _t(-16, -3, n) * (1 - _t(0, 10, n));
  return { dayFactor: t, nightFactor: e, twilightFactor: i };
}
const $n = {
  zenith: 0.15,
  upper: 0.3,
  middle: 0.55,
  lower: 0.85,
  horizon: 1,
  sunCore: 0.2,
  sunGlow: 0.6,
  ambient: 0.8,
  cloud: 0.5
}, xn = 0.1;
function ne(n) {
  const { elevation: t, rising: e, weather: i, appearance: s, season: r } = n, a = Sn(t), { twilightFactor: o, dayFactor: l } = gi(t), h = e ? vn : wn, c = o * 0.3, d = {}, u = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, f = m(i.desaturation) * 0.8, p = 1 - m(i.skyDarkness) * 0.75, g = r ? xn * (0.35 + 0.65 * l) : 0, v = r ? r.saturation : 1;
  for (const b of fe) {
    let w = D(a[b], h, c * u[b]);
    r && g > 0 && (w = D(w, r.tint, g * $n[b])), w = nn(w, f), w = Zt(w, p), w = sn(w, s.saturation * v), w = Zt(w, s.brightness), d[b] = w;
  }
  return d.cloud = Zt(d.cloud, _(1, 0.32, m(i.cloudDarkness))), d;
}
function Cn(n, t, e, i) {
  const s = e <= 0 ? 1 : 1 - Math.pow(2, -i / e), r = {};
  for (const a of fe)
    r[a] = D(n[a], t[a], s);
  return r;
}
const De = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: 3 * Math.PI / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1 }
}, Ie = ["summer", "autumn", "winter", "spring"];
function Mn(n) {
  const t = new Date(n.getFullYear(), 0, 0);
  return Math.floor((n.getTime() - t.getTime()) / 864e5);
}
function ze(n, t) {
  const e = (Mn(n) - 172) / 365.25 * E, i = t < 0 ? e + Math.PI : e;
  let s = 0;
  const r = { summer: 0, autumn: 0, winter: 0, spring: 0 };
  for (const f of Ie) {
    const p = Math.max(0, Math.cos(i - De[f].centre)), g = p * p;
    r[f] = g, s += g;
  }
  s <= 0 && (s = 1);
  let a = 0, o = 0, l = 0, h = 0, c = 0, d = "summer", u = -1;
  for (const f of Ie) {
    const p = r[f] / s, g = De[f];
    a += g.tint[0] * p, o += g.tint[1] * p, l += g.tint[2] * p, h += g.haze * p, c += g.saturation * p, p > u && (u = p, d = f);
  }
  return {
    name: d,
    /** −1 at midwinter, +1 at midsummer. */
    warmth: Math.cos(i),
    tint: [a, o, l],
    haze: m(h),
    saturation: c
  };
}
function An(n) {
  return n.getTime() / 864e5 - 10957.5;
}
function En(n, t, e) {
  const i = An(n), s = L(357.5291 + 0.98560028 * i), r = L(280.459 + 0.98564736 * i) + L(1.9148) * Math.sin(s) + L(0.02) * Math.sin(2 * s), a = L(23.4393 - 3563e-10 * i), o = Math.asin(Math.sin(a) * Math.sin(r)), l = Math.atan2(
    Math.cos(a) * Math.sin(r),
    Math.cos(r)
  ), c = L(280.16 + 360.9856235 * i) + L(e) - l, d = L(t), u = Math.sin(d) * Math.sin(o) + Math.cos(d) * Math.cos(o) * Math.cos(c), f = Math.asin(Math.max(-1, Math.min(1, u))), p = Math.atan2(
    Math.sin(c),
    Math.cos(c) * Math.sin(d) - Math.tan(o) * Math.cos(d)
  ), g = c + L(360.9856235 * (10 / 1440)), v = Math.sin(d) * Math.sin(o) + Math.cos(d) * Math.cos(o) * Math.cos(g);
  return {
    elevation: Ft(f),
    azimuth: it(Ft(p) + 180, 360),
    rising: v > u
  };
}
function Tn(n) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, i = n.getTime() / 864e5 - e;
  return it(i / t, 1);
}
function Pn(n, t, e) {
  const r = (n.getHours() + n.getMinutes() / 60 + n.getSeconds() / 3600 - 12) / 24 * E - e * E, a = 70 - Math.min(55, Math.abs(t) * 0.55), o = Math.cos(r) * a, l = (Math.sin(r) + 1) / 2;
  return { altitude: o, azimuthFraction: l };
}
const kn = [
  "clear-night",
  "cloudy",
  "exceptional",
  "fog",
  "hail",
  "lightning",
  "lightning-rainy",
  "partlycloudy",
  "pouring",
  "rainy",
  "snowy",
  "snowy-rainy",
  "sunny",
  "windy",
  "windy-variant"
], Rn = {
  clear: "sunny",
  "clear-day": "sunny",
  clear_night: "clear-night",
  "partly-cloudy": "partlycloudy",
  partly_cloudy: "partlycloudy",
  "partlycloudy-night": "partlycloudy",
  mostlycloudy: "cloudy",
  overcast: "cloudy",
  drizzle: "rainy",
  rain: "rainy",
  showers: "rainy",
  thunderstorm: "lightning-rainy",
  "thunderstorm-rainy": "lightning-rainy",
  storm: "lightning-rainy",
  snow: "snowy",
  sleet: "snowy-rainy",
  mist: "fog",
  haze: "fog",
  wind: "windy"
};
function On(n) {
  if (!n)
    return "unknown";
  const t = n.toLowerCase().trim();
  return kn.includes(t) ? t : Rn[t] ?? "unknown";
}
const Ln = {
  cloudCover: 0.25,
  cloudDarkness: 0.05,
  skyDarkness: 0,
  desaturation: 0,
  fog: 0,
  rain: 0,
  snow: 0,
  lightning: 0,
  wind: 0.25,
  sunVisibility: 1
}, Dn = {
  sunny: { cloudCover: 0.1, cloudDarkness: 0, skyDarkness: 0, wind: 0.2, sunVisibility: 1 },
  "clear-night": { cloudCover: 0.06, cloudDarkness: 0, wind: 0.15, sunVisibility: 1 },
  partlycloudy: { cloudCover: 0.45, cloudDarkness: 0.1, wind: 0.3, sunVisibility: 0.8 },
  cloudy: {
    cloudCover: 0.85,
    cloudDarkness: 0.35,
    skyDarkness: 0.18,
    desaturation: 0.3,
    wind: 0.35,
    sunVisibility: 0.25
  },
  fog: {
    cloudCover: 0.5,
    cloudDarkness: 0.15,
    skyDarkness: 0.15,
    desaturation: 0.6,
    fog: 0.85,
    wind: 0.12,
    sunVisibility: 0.2
  },
  rainy: {
    cloudCover: 0.9,
    cloudDarkness: 0.45,
    skyDarkness: 0.3,
    desaturation: 0.45,
    fog: 0.15,
    rain: 0.45,
    wind: 0.4,
    sunVisibility: 0.1
  },
  pouring: {
    cloudCover: 1,
    cloudDarkness: 0.6,
    skyDarkness: 0.45,
    desaturation: 0.55,
    fog: 0.25,
    rain: 1,
    wind: 0.6,
    sunVisibility: 0.03
  },
  lightning: {
    cloudCover: 0.9,
    cloudDarkness: 0.55,
    skyDarkness: 0.4,
    desaturation: 0.4,
    lightning: 0.6,
    wind: 0.55,
    sunVisibility: 0.08
  },
  "lightning-rainy": {
    cloudCover: 1,
    cloudDarkness: 0.65,
    skyDarkness: 0.5,
    desaturation: 0.5,
    fog: 0.2,
    rain: 0.9,
    lightning: 1,
    wind: 0.7,
    sunVisibility: 0.03
  },
  hail: {
    cloudCover: 1,
    cloudDarkness: 0.6,
    skyDarkness: 0.42,
    desaturation: 0.5,
    rain: 0.7,
    lightning: 0.3,
    wind: 0.65,
    sunVisibility: 0.05
  },
  snowy: {
    cloudCover: 0.9,
    cloudDarkness: 0.25,
    skyDarkness: 0.2,
    desaturation: 0.55,
    fog: 0.25,
    snow: 0.8,
    wind: 0.3,
    sunVisibility: 0.15
  },
  "snowy-rainy": {
    cloudCover: 0.95,
    cloudDarkness: 0.4,
    skyDarkness: 0.3,
    desaturation: 0.55,
    fog: 0.25,
    rain: 0.5,
    snow: 0.5,
    wind: 0.4,
    sunVisibility: 0.08
  },
  windy: { cloudCover: 0.35, cloudDarkness: 0.1, wind: 0.85, sunVisibility: 0.85 },
  "windy-variant": {
    cloudCover: 0.6,
    cloudDarkness: 0.25,
    skyDarkness: 0.1,
    desaturation: 0.2,
    wind: 1,
    sunVisibility: 0.5
  },
  exceptional: {
    cloudCover: 0.7,
    cloudDarkness: 0.4,
    skyDarkness: 0.25,
    desaturation: 0.35,
    wind: 0.7,
    sunVisibility: 0.4
  },
  unknown: {}
};
function mi(n) {
  return { condition: n, ...Ln, ...Dn[n] };
}
const In = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function Ot(n) {
  if (typeof n == "number" && Number.isFinite(n))
    return n;
  if (typeof n == "string") {
    const t = Number.parseFloat(n);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function oe(n) {
  if (n) {
    for (const t of Object.keys(n.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function Fe(n, t, e = /* @__PURE__ */ new Date()) {
  const i = n?.config?.latitude ?? 51.2, s = n?.config?.longitude ?? 6.8;
  let r = null, a = null, o = null, l = "computed";
  const h = t.sun_entity, c = h ? n?.states?.[h] : void 0;
  if (c) {
    const b = Ot(c.attributes.elevation), w = Ot(c.attributes.azimuth);
    b !== null && (r = b, a = w, o = typeof c.attributes.rising == "boolean" ? c.attributes.rising : null, l = "sun.sun");
  }
  if (r === null || a === null || o === null) {
    const b = En(e, i, s);
    r === null && (r = b.elevation), a === null && (a = b.azimuth), o === null && (o = b.rising), l !== "sun.sun" && (l = "computed");
  }
  const d = t.weather_entity ?? oe(n), u = d ? n?.states?.[d] : void 0;
  let f = "unknown", p = null, g = null, v = !1;
  if (u && u.state !== "unavailable" && u.state !== "unknown") {
    f = On(u.state), v = !0;
    const b = Ot(u.attributes.cloud_coverage);
    b !== null && (p = m(b / 100));
    const w = Ot(u.attributes.wind_speed);
    if (w !== null) {
      const A = String(
        u.attributes.wind_speed_unit ?? n?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), R = w * (In[A] ?? 1);
      g = m(R / 70);
    }
  } else
    d || (f = r > -6 ? "sunny" : "clear-night");
  return f === "sunny" && r < -4 && (f = "clear-night"), f === "clear-night" && r > 2 && (f = "sunny"), {
    condition: f,
    cloudCoverage: p,
    wind: g,
    sunElevation: r,
    sunAzimuth: a,
    sunRising: o,
    latitude: i,
    longitude: s,
    sunSource: l,
    weatherEntity: d ?? null,
    weatherAvailable: v
  };
}
function zn(n) {
  const t = mi(n.condition);
  return n.cloudCoverage !== null && (t.cloudCover = _(t.cloudCover, n.cloudCoverage, 0.85), t.sunVisibility = Math.min(t.sunVisibility, 1 - n.cloudCoverage * 0.85)), n.wind !== null && (t.wind = _(t.wind, n.wind, 0.7)), t;
}
const Fn = [
  "cloudCover",
  "cloudDarkness",
  "skyDarkness",
  "desaturation",
  "fog",
  "rain",
  "snow",
  "lightning",
  "wind",
  "sunVisibility"
];
class Nn {
  constructor(t) {
    this.current = { ...t }, this.target = { ...t };
  }
  setTarget(t) {
    this.target = { ...t };
  }
  /** Jump straight to the target (used on first paint and after a config change). */
  snapTo(t) {
    this.current = { ...t }, this.target = { ...t };
  }
  update(t, e = 4) {
    for (const i of Fn)
      this.current[i] = It(this.current[i], this.target[i], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
const Ne = 24, Hn = [0, 0.28, 0.55, 0.82, 1], Un = 128, Gn = 13729298;
class Bn {
  constructor() {
    this.name = "sky", this.gradient = null, this.cacheKey = "", this.noise = null, this.noiseCanvas = null;
  }
  setup() {
    this.gradient = null, this.cacheKey = "";
  }
  resize() {
    this.gradient = null, this.cacheKey = "";
  }
  render(t, e) {
    const { palette: i, width: s, height: r } = e, a = [
      Math.round(r),
      i.zenith.join(),
      i.upper.join(),
      i.middle.join(),
      i.lower.join(),
      i.horizon.join()
    ].join("|");
    (!this.gradient || a !== this.cacheKey) && (this.gradient = this.buildGradient(t, i, r), this.cacheKey = a), t.fillStyle = this.gradient, t.fillRect(0, 0, s, r);
    const o = t.createLinearGradient(0, 0, 0, r * 0.45), l = m(0.12 + e.weather.skyDarkness * 0.2);
    o.addColorStop(0, `rgba(0,0,0,${l.toFixed(3)})`), o.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = o, t.fillRect(0, 0, s, r * 0.45), this.renderDither(t, e);
  }
  buildGradient(t, e, i) {
    const s = [
      e.zenith,
      e.upper,
      e.middle,
      e.lower,
      e.horizon
    ].map(rn), r = t.createLinearGradient(0, 0, 0, i);
    for (let a = 0; a < Ne; a++) {
      const o = a / (Ne - 1);
      r.addColorStop(o, S(an(qn(s, Hn, o))));
    }
    return r;
  }
  /**
   * One pixel of static noise over the whole sky.
   *
   * Drawn with the transform reset, so the tile lands on device pixels rather
   * than being scaled up with everything else – dither only works at 1:1.
   */
  renderDither(t, e) {
    !this.noise && (this.noiseCanvas = Vn(Un), this.noise = t.createPattern(this.noiseCanvas, "repeat"), !this.noise) || (t.save(), t.setTransform(1, 0, 0, 1, 0, 0), t.globalAlpha = 0.5, t.fillStyle = this.noise, t.fillRect(0, 0, e.width * e.pixelRatio, e.height * e.pixelRatio), t.restore());
  }
  destroy() {
    this.gradient = null, this.noise = null, this.noiseCanvas = null;
  }
}
function qn(n, t, e) {
  const i = n.length - 1;
  if (e <= t[0])
    return n[0];
  if (e >= t[i])
    return n[i];
  let s = 0;
  for (; s < i - 1 && e > t[s + 1]; )
    s++;
  const r = t[s], a = t[s + 1], o = a - r || 1, l = (e - r) / o, h = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const d = n[s][c], u = n[s + 1][c], f = n[Math.max(0, s - 1)][c], p = n[Math.min(i, s + 2)][c], g = t[Math.max(0, s - 1)], v = t[Math.min(i, s + 2)], b = (u - f) / (a - g || 1) * o, w = (p - d) / (v - r || 1) * o, A = l * l, R = A * l;
    h[c] = (2 * R - 3 * A + 1) * d + (R - 2 * A + l) * b + (-2 * R + 3 * A) * u + (R - A) * w;
  }
  return [h[0], h[1], h[2]];
}
function Vn(n) {
  const t = document.createElement("canvas");
  t.width = n, t.height = n;
  const e = t.getContext("2d");
  if (!e)
    return t;
  const i = e.createImageData(n, n), s = i.data, r = K(Gn);
  for (let a = 0; a < s.length; a += 4) {
    const l = r() < 0.5 ? 255 : 0;
    s[a] = l, s[a + 1] = l, s[a + 2] = l, s[a + 3] = Math.round(r() * 3);
  }
  return e.putImageData(i, 0, 0), t;
}
const Wn = 6221137;
class Yn {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = K(Wn), i = t.quality.starCount;
    this.stars = new Array(i);
    for (let s = 0; s < i; s++) {
      const r = Math.pow(e(), 1.6) * 0.82;
      this.stars[s] = {
        nx: e(),
        ny: r,
        radius: y(e, 0.4, 1.5),
        baseAlpha: y(e, 0.35, 1),
        twinkleSpeed: y(e, 0.4, 2.2),
        twinklePhase: e() * E,
        tint: e()
      };
    }
  }
  resize() {
  }
  particleCount() {
    return this.stars.length + this.shooting.length;
  }
  render(t, e) {
    const i = m(e.nightFactor) * (1 - m(e.weather.cloudCover) * 0.85) * m(e.appearance.intensity);
    if (i <= 0.01) {
      this.shooting.length = 0;
      return;
    }
    const { width: s, height: r } = e, a = !e.reducedMotion, o = e.parallaxX * 0.15, l = e.parallaxY * 0.15;
    t.save();
    for (let h = 0; h < this.stars.length; h++) {
      const c = this.stars[h], d = c.nx * s + o, u = c.ny * r + l;
      let f = c.baseAlpha * i;
      if (a) {
        const b = Math.sin(e.time * c.twinkleSpeed + c.twinklePhase);
        f *= 0.62 + 0.38 * b;
      }
      if (f <= 0.02)
        continue;
      const p = 255, g = 245 + Math.round(c.tint * 8), v = 225 + Math.round((1 - c.tint) * 30);
      t.fillStyle = `rgba(${p},${g},${v},${f.toFixed(3)})`, c.radius <= 0.7 ? t.fillRect(d, u, 1, 1) : (t.beginPath(), t.arc(d, u, c.radius, 0, E), t.fill());
    }
    t.restore(), e.effects.shooting_stars && e.quality.shootingStars && !e.reducedMotion && this.updateShootingStars(t, e, i);
  }
  updateShootingStars(t, e, i) {
    const { width: s, height: r, dt: a } = e;
    if (this.nextShootingStar -= a, this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const o = 380 + Math.random() * 320, l = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * s * 0.8,
        y: Math.random() * r * 0.35,
        vx: Math.cos(l) * o,
        vy: Math.sin(l) * o,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.5,
        length: 60 + Math.random() * 90
      });
    }
    for (let o = this.shooting.length - 1; o >= 0; o--) {
      const l = this.shooting[o];
      if (l.life += a, l.life >= l.maxLife) {
        this.shooting.splice(o, 1);
        continue;
      }
      l.x += l.vx * a, l.y += l.vy * a;
      const h = l.life / l.maxLife, c = Math.sin(h * Math.PI) * i, d = l.vx === 0 && l.vy === 0 ? 0 : l.vx, u = Math.hypot(d, l.vy) || 1, f = l.x - d / u * l.length, p = l.y - l.vy / u * l.length, g = t.createLinearGradient(l.x, l.y, f, p);
      g.addColorStop(0, `rgba(255,255,255,${c.toFixed(3)})`), g.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = g, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(f, p), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class jn {
  constructor() {
    this.name = "moon", this.buffer = null, this.bufferCtx = null, this.bufferSize = 0, this.drawnPhase = -1;
  }
  setup() {
    this.drawnPhase = -1;
  }
  resize() {
    this.drawnPhase = -1;
  }
  render(t, e) {
    if (!e.moonVisible)
      return;
    const i = m(e.nightFactor) * (1 - m(e.weather.cloudCover) * 0.8);
    if (i <= 0.03)
      return;
    const s = Math.min(e.width, e.height), r = Math.max(12, s * 0.035), a = Math.ceil(r * 2 + 4), o = this.ensureBuffer(a);
    if (!o || !this.buffer)
      return;
    const l = Math.round(e.moonPhase * 200) / 200;
    l !== this.drawnPhase && (this.drawMoon(o, a, r, l), this.drawnPhase = l);
    const h = e.moonX * e.width + e.parallaxX * 0.12, c = e.moonY * e.height + e.parallaxY * 0.12;
    t.save(), t.globalCompositeOperation = "lighter";
    const d = r * 5, u = 0.14 * i * e.appearance.ambient_glow, f = t.createRadialGradient(h, c, r * 0.6, h, c, d);
    f.addColorStop(0, `rgba(200,220,255,${u.toFixed(3)})`), f.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = f, t.beginPath(), t.arc(h, c, d, 0, E), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = i, t.drawImage(this.buffer, h - a / 2, c - a / 2), t.restore();
  }
  ensureBuffer(t) {
    if (this.buffer && this.bufferSize === t)
      return this.bufferCtx;
    const e = document.createElement("canvas");
    return e.width = t, e.height = t, this.buffer = e, this.bufferCtx = e.getContext("2d"), this.bufferSize = t, this.drawnPhase = -1, this.bufferCtx;
  }
  /**
   * Draws the lit part of the moon for `phase`
   * (0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter).
   */
  drawMoon(t, e, i, s) {
    const r = e / 2, a = e / 2;
    t.clearRect(0, 0, e, e);
    const o = t.createRadialGradient(
      r - i * 0.25,
      a - i * 0.25,
      i * 0.1,
      r,
      a,
      i
    );
    o.addColorStop(0, "#fffdf3"), o.addColorStop(0.75, "#eceadd"), o.addColorStop(1, "#cfd3cc"), t.fillStyle = o, t.beginPath(), t.arc(r, a, i, 0, E), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const l = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, u, f] of l)
      t.beginPath(), t.arc(r + d * i, a + u * i, f * i, 0, E), t.fill();
    const h = (1 - Math.cos(s * E)) / 2;
    if (h < 0.99) {
      const u = s < 0.5, f = Math.abs(1 - h * 2) * i;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(r, a, i + 1, -Math.PI / 2, Math.PI / 2, u);
      const p = u ? h < 0.5 : h >= 0.5;
      t.ellipse(
        r,
        a,
        f,
        i + 1,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        p
      ), t.closePath(), t.fill(), t.restore();
    }
    t.save(), t.globalCompositeOperation = "destination-in";
    const c = t.createRadialGradient(r, a, i * 0.88, r, a, i);
    c.addColorStop(0, "rgba(0,0,0,1)"), c.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = c, t.fillRect(0, 0, e, e), t.restore();
  }
  destroy() {
    this.buffer = null, this.bufferCtx = null, this.bufferSize = 0;
  }
}
class Xn {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: i, width: s, height: r, appearance: a } = e, o = m(e.dayFactor * 0.35 + e.twilightFactor) * a.ambient_glow * _(0.45, 1, m(e.weather.sunVisibility));
    if (o > 0.01) {
      const g = m(e.sunX) * s, v = r * _(1.02, 0.55, m(e.dayFactor)), b = Math.max(s, r) * _(0.55, 0.95, e.twilightFactor), w = t.createRadialGradient(g, v, 0, g, v, b);
      w.addColorStop(0, S(i.sunGlow, 0.5 * o)), w.addColorStop(0.35, S(i.sunGlow, 0.22 * o)), w.addColorStop(1, S(i.sunGlow, 0)), t.fillStyle = w, t.fillRect(0, 0, s, r);
    }
    const l = m((e.sunElevation + 1.5) / 4) * m(e.weather.sunVisibility);
    if (l <= 0.02)
      return;
    const h = e.sunX * s + e.parallaxX * 0.12, c = e.sunY * r + e.parallaxY * 0.12, d = Math.min(s, r), u = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const f = e.quality.sunGlowPasses;
    for (let g = f; g >= 1; g--) {
      const v = g / f, b = u * (2.2 + v * 9), w = 0.1 * l * a.ambient_glow * (1 - v * 0.55), A = t.createRadialGradient(h, c, u * 0.4, h, c, b);
      A.addColorStop(0, S(i.sunGlow, w)), A.addColorStop(1, S(i.sunGlow, 0)), t.fillStyle = A, t.beginPath(), t.arc(h, c, b, 0, E), t.fill();
    }
    const p = t.createRadialGradient(h, c, 0, h, c, u);
    p.addColorStop(0, S(i.sunCore, l)), p.addColorStop(0.7, S(i.sunCore, 0.85 * l)), p.addColorStop(1, S(i.sunGlow, 0)), t.fillStyle = p, t.beginPath(), t.arc(h, c, u, 0, E), t.fill(), t.restore();
  }
  destroy() {
  }
}
const Qn = 790741, Kn = 2 * 2 * 3, Zn = 200, Jn = [
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 }
], ts = 0.22, es = 0.5, is = 0.4;
class ns {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.lastTintAt = 0, this.clouds = [];
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: i, cloudLayers: s } = t.quality, r = K(Qn), a = this.clouds;
    this.base = Jn.map(({ style: o, aspect: l, spanScale: h }) => {
      const c = Math.round(e), d = Math.round(c / l);
      return {
        canvas: as(c, d, r, o),
        aspect: l,
        spanScale: h
      };
    }), this.tinted = [], this.tintValid = !1, this.clouds = new Array(i);
    for (let o = 0; o < i; o++) {
      const l = o % s, h = s <= 1 ? 1 : l / (s - 1), c = h < 0.45 ? 3 : 0;
      this.clouds[o] = {
        variant: c + Math.floor(r() * 3),
        nx: r(),
        ny: y(r, -0.04, 0.46) - h * 0.06,
        scale: y(r, 0.82, 1.22),
        layer: h,
        alpha: y(r, 0.6, 1),
        bobPhase: r() * Math.PI * 2,
        bobAmount: y(r, 4e-3, 0.014)
      };
    }
    if (this.clouds.sort((o, l) => o.layer - l.layer), a.length > 0)
      for (let o = 0; o < this.clouds.length; o++)
        this.clouds[o].nx = a[o % a.length].nx;
  }
  resize() {
  }
  particleCount() {
    return this.clouds.length;
  }
  render(t, e) {
    const i = m(e.weather.cloudCover) * m(e.appearance.intensity);
    if (i <= 0.01 || this.clouds.length === 0 || (this.ensureTint(e.palette.cloud), this.tinted.length === 0))
      return;
    const { width: s, height: r, dt: a } = e, o = _(0.82, 1.35, i), l = i * this.clouds.length, h = Math.floor(l), c = l - h, d = _(0.25, 2.6, m(e.weather.wind)), u = e.reducedMotion ? 0.08 : 1, f = m((i - 0.55) / 0.45) * _(0.35, 0.85, m(e.weather.cloudDarkness));
    if (f > 0.01) {
      const p = t.createLinearGradient(0, 0, 0, r);
      p.addColorStop(0, S(e.palette.cloud, f * 0.55)), p.addColorStop(0.55, S(e.palette.cloud, f * 0.4)), p.addColorStop(1, S(e.palette.cloud, f * 0.18)), t.fillStyle = p, t.fillRect(0, 0, s, r);
    }
    t.save();
    for (let p = 0; p < this.clouds.length; p++) {
      const g = this.clouds[p], v = this.tinted[g.variant];
      let b = s * _(ts, es, g.layer) * g.scale * v.spanScale * o, w = b / v.aspect;
      const A = r * is;
      w > A && (w = A, b = w * v.aspect);
      const R = s + b * 1.1, T = s * _(6e-3, 0.028, g.layer) * d * u;
      if (g.nx = it(g.nx + T * a / R, 1), p > h)
        continue;
      const V = p === h ? c : 1;
      if (V <= 0.01)
        continue;
      const kt = _(0.3, 1, g.layer), rt = g.nx * R - b + e.parallaxX * kt, jt = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + g.bobPhase) * g.bobAmount * r, Z = g.ny * r + jt + e.parallaxY * kt;
      if (rt + b < 0 || rt > s)
        continue;
      const k = g.alpha * V * _(0.42, 0.92, i) * _(0.75, 1, g.layer) * _(1, 1.15, m(e.weather.cloudDarkness));
      t.globalAlpha = m(k), t.drawImage(v.canvas, rt, Z, b, w);
    }
    t.restore();
  }
  ensureTint(t) {
    if (this.tintValid) {
      if (X(t, this.tintColor) < Kn)
        return;
      const e = performance.now();
      if (e - this.lastTintAt < Zn)
        return;
      this.lastTintAt = e;
    } else
      this.lastTintAt = performance.now();
    this.tinted = this.base.map((e) => ({
      canvas: os(e.canvas, t),
      aspect: e.aspect,
      spanScale: e.spanScale
    })), this.tintColor = t, this.tintValid = !0;
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
let Lt = null;
function ss() {
  if (Lt !== null)
    return Lt;
  const n = document.createElement("canvas").getContext("2d");
  return Lt = !!n && typeof n.filter == "string", Lt;
}
function rs(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const i = e.getContext("2d");
  if (!i)
    return n;
  if (ss())
    return i.filter = `blur(${t.toFixed(2)}px)`, i.drawImage(n, 0, 0), i.filter = "none", e;
  const s = n.width * 3;
  return i.shadowColor = "rgba(255,255,255,1)", i.shadowBlur = t * 2, i.shadowOffsetX = s, i.drawImage(n, -s, 0), e;
}
function as(n, t, e, i) {
  const s = document.createElement("canvas");
  s.width = n, s.height = t;
  const r = s.getContext("2d");
  if (!r)
    return s;
  const a = i === "cumulus", o = t * (a ? 0.055 : 0.045), l = o * 2.2, h = t - l - t * (a ? 0.04 : 0.06), c = l, d = n - l * 2;
  r.fillStyle = "#ffffff";
  const u = a ? 9 : 14, f = d / (u * 0.85), p = Math.max(d * 0.2, d - f * 2.6), g = l + (d - p) / 2, v = p / Math.max(1, u - 1), b = (h - c) * (a ? 0.3 : 0.4), w = (k, I, N, U) => {
    r.beginPath(), r.ellipse(k, I, N, U, 0, 0, E), r.fill();
  };
  for (let k = 0; k < u; k++) {
    const I = k / (u - 1), N = g + I * p + (e() - 0.5) * v * 0.5, U = 0.34 + 0.66 * Math.pow(Math.sin(Math.PI * m(I)), a ? 0.55 : 0.4), Rt = (h - c) * (a ? 1 : 0.74) * U * y(e, 0.6, 1), Xt = f * y(e, 0.85, 1.25), ge = Math.min(Xt * y(e, 1, 1.45), Math.max(3, Rt * 0.7));
    w(N, h - Rt + ge, Xt, ge), w(
      N,
      h - b * y(e, 0.1, 0.4),
      Xt * y(e, 0.95, 1.2),
      b * U * y(e, 0.8, 1.2)
    );
  }
  const A = a ? 7 : 9;
  for (let k = 0; k < A; k++) {
    const I = (k + y(e, 0.2, 0.8)) / A, N = g + m(I) * p, U = 0.4 + 0.6 * Math.sin(Math.PI * m(I)), W = f * y(e, 0.32, 0.6), Rt = h - (h - c) * U * y(e, 0.35, 0.85) + W * 0.4;
    w(N, Rt, W * y(e, 1, 1.35), W);
  }
  const R = rs(s, o), T = R.getContext("2d");
  if (!T)
    return R;
  T.globalCompositeOperation = "source-atop";
  const V = T.createLinearGradient(0, c, 0, h);
  V.addColorStop(0, "rgb(255,255,255)"), V.addColorStop(0.42, "rgb(238,240,244)"), V.addColorStop(0.78, "rgb(196,201,211)"), V.addColorStop(1, "rgb(152,159,174)"), T.fillStyle = V, T.fillRect(0, 0, n, t);
  const kt = a ? 3 : 2;
  for (let k = 0; k < kt; k++) {
    const I = l + d * y(e, 0.22, 0.78), N = h - (h - c) * y(e, 0.45, 0.85), U = t * y(e, 0.18, 0.32), W = T.createRadialGradient(I, N, 0, I, N, U);
    W.addColorStop(0, "rgba(255,255,255,0.55)"), W.addColorStop(1, "rgba(255,255,255,0)"), T.fillStyle = W, T.beginPath(), T.arc(I, N, U, 0, E), T.fill();
  }
  T.globalCompositeOperation = "destination-in";
  const rt = m((h - o * 1.5) / t), jt = m((h + o * 1.2) / t), Z = T.createLinearGradient(0, 0, 0, t);
  return Z.addColorStop(0, "rgba(0,0,0,1)"), Z.addColorStop(rt, "rgba(0,0,0,1)"), Z.addColorStop(Math.max(jt, rt + 1e-3), "rgba(0,0,0,0)"), Z.addColorStop(1, "rgba(0,0,0,0)"), T.fillStyle = Z, T.fillRect(0, 0, n, t), T.globalCompositeOperation = "source-over", R;
}
function os(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(n, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = S(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(n, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
function ls(n) {
  return n.getTime() / 864e5 + 24405875e-1;
}
function hs(n) {
  const t = ls(n) - 2451545;
  return it(280.46061837 + 360.98564736629 * t, 360);
}
function cs(n, t, e, i, s) {
  const r = hs(s) + i, a = L(it(r - n * 15, 360)), o = L(t), l = L(e), h = Math.sin(o) * Math.sin(l) + Math.cos(o) * Math.cos(l) * Math.cos(a), c = Math.asin(Math.max(-1, Math.min(1, h))), d = Math.atan2(
    Math.sin(a),
    Math.cos(a) * Math.sin(l) - Math.tan(o) * Math.cos(l)
  );
  return {
    altitude: Ft(c),
    // atan2 above measures from south, increasing westward.
    azimuth: it(Ft(d) + 180, 360)
  };
}
const ds = 60, us = 240;
function le(n, t) {
  const e = (t - ds) / us, i = n >= 0 ? 0.94 - Math.pow(m(n / 90), 0.7) * 0.84 : x(0.94 + -n / 20 * 0.18, 0.94, 1.2);
  return { x: e, y: i, inView: e >= -0.05 && e <= 1.05 };
}
function He(n) {
  return m(n.x);
}
const se = [
  /* 0 */
  { name: "Betelgeuse", ra: 5.9195, dec: 7.407, mag: 0.5 },
  /* 1 */
  { name: "Rigel", ra: 5.2423, dec: -8.202, mag: 0.13 },
  /* 2 */
  { name: "Bellatrix", ra: 5.4185, dec: 6.35, mag: 1.64 },
  /* 3 */
  { name: "Mintaka", ra: 5.5334, dec: -0.299, mag: 2.23 },
  /* 4 */
  { name: "Alnilam", ra: 5.6036, dec: -1.202, mag: 1.69 },
  /* 5 */
  { name: "Alnitak", ra: 5.6793, dec: -1.943, mag: 1.77 },
  /* 6 */
  { name: "Saiph", ra: 5.7958, dec: -9.67, mag: 2.06 },
  /* 7 */
  { name: "Dubhe", ra: 11.062, dec: 61.751, mag: 1.79 },
  /* 8 */
  { name: "Merak", ra: 11.031, dec: 56.383, mag: 2.37 },
  /* 9 */
  { name: "Phecda", ra: 11.897, dec: 53.695, mag: 2.44 },
  /* 10 */
  { name: "Megrez", ra: 12.257, dec: 57.033, mag: 3.31 },
  /* 11 */
  { name: "Alioth", ra: 12.9, dec: 55.96, mag: 1.77 },
  /* 12 */
  { name: "Mizar", ra: 13.399, dec: 54.925, mag: 2.27 },
  /* 13 */
  { name: "Alkaid", ra: 13.792, dec: 49.313, mag: 1.86 },
  /* 14 */
  { name: "Caph", ra: 0.153, dec: 59.15, mag: 2.27 },
  /* 15 */
  { name: "Schedar", ra: 0.675, dec: 56.537, mag: 2.24 },
  /* 16 */
  { name: "Gamma Cassiopeiae", ra: 0.945, dec: 60.717, mag: 2.47 },
  /* 17 */
  { name: "Ruchbah", ra: 1.43, dec: 60.235, mag: 2.68 },
  /* 18 */
  { name: "Segin", ra: 1.906, dec: 63.67, mag: 3.38 },
  /* 19 */
  { name: "Deneb", ra: 20.69, dec: 45.28, mag: 1.25 },
  /* 20 */
  { name: "Sadr", ra: 20.37, dec: 40.257, mag: 2.23 },
  /* 21 */
  { name: "Gienah", ra: 20.77, dec: 33.97, mag: 2.48 },
  /* 22 */
  { name: "Delta Cygni", ra: 19.749, dec: 45.131, mag: 2.87 },
  /* 23 */
  { name: "Albireo", ra: 19.512, dec: 27.96, mag: 3.08 },
  /* 24 */
  { name: "Vega", ra: 18.615, dec: 38.784, mag: 0.03 },
  /* 25 */
  { name: "Sheliak", ra: 18.835, dec: 33.363, mag: 3.45 },
  /* 26 */
  { name: "Sulafat", ra: 18.982, dec: 32.69, mag: 3.24 },
  /* 27 */
  { name: "Zeta Lyrae", ra: 18.746, dec: 37.605, mag: 4.3 },
  /* 28 */
  { name: "Altair", ra: 19.846, dec: 8.868, mag: 0.76 },
  /* 29 */
  { name: "Tarazed", ra: 19.771, dec: 10.613, mag: 2.72 },
  /* 30 */
  { name: "Alshain", ra: 19.921, dec: 6.407, mag: 3.71 },
  /* 31 */
  { name: "Antares", ra: 16.49, dec: -26.432, mag: 1.06 },
  /* 32 */
  { name: "Dschubba", ra: 16.005, dec: -22.622, mag: 2.32 },
  /* 33 */
  { name: "Graffias", ra: 16.091, dec: -19.805, mag: 2.62 },
  /* 34 */
  { name: "Shaula", ra: 17.56, dec: -37.104, mag: 1.62 },
  /* 35 */
  { name: "Sargas", ra: 17.622, dec: -42.998, mag: 1.87 },
  /* 36 */
  { name: "Regulus", ra: 10.139, dec: 11.967, mag: 1.4 },
  /* 37 */
  { name: "Denebola", ra: 11.818, dec: 14.572, mag: 2.14 },
  /* 38 */
  { name: "Algieba", ra: 10.333, dec: 19.841, mag: 2.08 },
  /* 39 */
  { name: "Zosma", ra: 11.235, dec: 20.524, mag: 2.56 },
  /* 40 */
  { name: "Epsilon Leonis", ra: 9.764, dec: 23.774, mag: 2.98 },
  /* 41 */
  { name: "Aldebaran", ra: 4.599, dec: 16.509, mag: 0.85 },
  /* 42 */
  { name: "Elnath", ra: 5.438, dec: 28.608, mag: 1.65 },
  /* 43 */
  { name: "Ain", ra: 4.477, dec: 19.18, mag: 3.53 },
  /* 44 */
  { name: "Castor", ra: 7.577, dec: 31.888, mag: 1.58 },
  /* 45 */
  { name: "Pollux", ra: 7.755, dec: 28.026, mag: 1.14 },
  /* 46 */
  { name: "Alhena", ra: 6.629, dec: 16.399, mag: 1.93 },
  /* 47 */
  { name: "Sirius", ra: 6.752, dec: -16.716, mag: -1.46 },
  /* 48 */
  { name: "Mirzam", ra: 6.378, dec: -17.956, mag: 1.98 },
  /* 49 */
  { name: "Wezen", ra: 7.14, dec: -26.393, mag: 1.83 },
  /* 50 */
  { name: "Adhara", ra: 6.977, dec: -28.972, mag: 1.5 },
  /* 51 */
  { name: "Arcturus", ra: 14.261, dec: 19.182, mag: -0.05 },
  /* 52 */
  { name: "Izar", ra: 14.75, dec: 27.074, mag: 2.37 },
  /* 53 */
  { name: "Seginus", ra: 14.535, dec: 38.308, mag: 3.03 },
  /* 54 */
  { name: "Nekkar", ra: 15.032, dec: 40.39, mag: 3.49 },
  /* 55 */
  { name: "Capella", ra: 5.278, dec: 45.998, mag: 0.08 },
  /* 56 */
  { name: "Menkalinan", ra: 5.992, dec: 44.947, mag: 1.9 },
  /* 57 */
  { name: "Mirfak", ra: 3.405, dec: 49.861, mag: 1.79 },
  /* 58 */
  { name: "Algol", ra: 3.136, dec: 40.956, mag: 2.12 },
  /* 59 */
  { name: "Acrux", ra: 12.443, dec: -63.099, mag: 0.77 },
  /* 60 */
  { name: "Mimosa", ra: 12.795, dec: -59.689, mag: 1.25 },
  /* 61 */
  { name: "Gacrux", ra: 12.519, dec: -57.113, mag: 1.63 },
  /* 62 */
  { name: "Delta Crucis", ra: 12.252, dec: -58.749, mag: 2.79 },
  /* 63 */
  { name: "Rigil Kentaurus", ra: 14.66, dec: -60.835, mag: -0.27 },
  /* 64 */
  { name: "Hadar", ra: 14.064, dec: -60.373, mag: 0.61 },
  /* 65 */
  { name: "Procyon", ra: 7.655, dec: 5.225, mag: 0.34 },
  /* 66 */
  { name: "Spica", ra: 13.42, dec: -11.161, mag: 0.98 },
  /* 67 */
  { name: "Fomalhaut", ra: 22.961, dec: -29.622, mag: 1.16 },
  /* 68 */
  { name: "Achernar", ra: 1.629, dec: -57.237, mag: 0.46 },
  /* 69 */
  { name: "Canopus", ra: 6.399, dec: -52.696, mag: -0.74 },
  /* 70 */
  { name: "Polaris", ra: 2.53, dec: 89.264, mag: 1.98 }
], ps = [
  {
    name: "Orion",
    lines: [
      [2, 0],
      // shoulders
      [2, 3],
      // right shoulder to belt
      [0, 5],
      // left shoulder to belt
      [3, 4],
      // belt
      [4, 5],
      [3, 1],
      // belt to knees
      [5, 6],
      [1, 6]
      // lower body
    ]
  },
  {
    name: "Ursa Major",
    lines: [
      [7, 8],
      // bowl
      [8, 9],
      [9, 10],
      [10, 7],
      [10, 11],
      // handle
      [11, 12],
      [12, 13]
    ]
  },
  {
    name: "Cassiopeia",
    lines: [
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 18]
    ]
  },
  {
    name: "Cygnus",
    lines: [
      [19, 20],
      // spine
      [20, 23],
      [22, 20],
      // wings
      [20, 21]
    ]
  },
  {
    name: "Lyra",
    lines: [
      [24, 27],
      [27, 25],
      [25, 26],
      [26, 27]
    ]
  },
  {
    name: "Aquila",
    lines: [
      [29, 28],
      [28, 30]
    ]
  },
  {
    name: "Scorpius",
    lines: [
      [33, 32],
      [32, 31],
      [31, 34],
      [34, 35]
    ]
  },
  {
    name: "Leo",
    lines: [
      [36, 38],
      // sickle
      [38, 40],
      [38, 39],
      [39, 37],
      // back to tail
      [36, 37]
    ]
  },
  {
    name: "Taurus",
    lines: [
      [43, 41],
      [41, 42]
    ]
  },
  {
    name: "Gemini",
    lines: [
      [44, 45],
      [45, 46]
    ]
  },
  {
    name: "Canis Major",
    lines: [
      [48, 47],
      [47, 49],
      [49, 50],
      [50, 48]
    ]
  },
  {
    name: "Boötes",
    lines: [
      [51, 52],
      [52, 54],
      [54, 53],
      [53, 51]
    ]
  },
  {
    name: "Auriga",
    lines: [
      [55, 56],
      [56, 42],
      [42, 55]
    ]
  },
  {
    name: "Perseus",
    lines: [
      [57, 58],
      [57, 55]
    ]
  },
  {
    name: "Crux",
    lines: [
      [59, 61],
      [60, 62]
    ]
  },
  {
    name: "Centaurus",
    lines: [[63, 64]]
  }
], fs = 20;
class gs {
  constructor() {
    this.name = "constellations", this.placed = [], this.sinceRecompute = Number.POSITIVE_INFINITY, this.lastLatitude = Number.NaN, this.lastLongitude = Number.NaN, this.visibleCount = 0;
  }
  setup() {
    this.placed = se.map((t, e) => ({
      x: 0,
      y: 0,
      visible: !1,
      // Magnitude 6 is the naked-eye limit, −1.5 is Sirius. Perceived
      // brightness is logarithmic, so map it as a curve rather than linearly.
      brightness: m((6 - t.mag) / 7.5) ** 1.6,
      radius: _(0.7, 2.3, m((4.5 - t.mag) / 6)),
      twinklePhase: e * 2.399 % E
    })), this.sinceRecompute = Number.POSITIVE_INFINITY;
  }
  resize() {
  }
  particleCount() {
    return this.visibleCount;
  }
  render(t, e) {
    const i = m(e.nightFactor) * (1 - m(e.weather.cloudCover) * 0.9) * m(e.appearance.intensity);
    if (i <= 0.02) {
      this.visibleCount = 0;
      return;
    }
    this.sinceRecompute += e.dt, (this.sinceRecompute >= fs || e.latitude !== this.lastLatitude || e.longitude !== this.lastLongitude) && this.recompute(e);
    const { width: s, height: r } = e;
    t.save(), t.lineWidth = Math.max(0.7, Math.min(s, r) * 12e-4), t.lineCap = "round", t.strokeStyle = `rgba(150,185,255,${(0.24 * i).toFixed(3)})`, t.beginPath();
    for (const o of ps)
      for (const [l, h] of o.lines) {
        const c = this.placed[l], d = this.placed[h];
        !c?.visible || !d?.visible || Math.abs(c.x - d.x) > 0.45 || (t.moveTo(c.x * s, c.y * r), t.lineTo(d.x * s, d.y * r));
      }
    t.stroke(), t.restore();
    let a = 0;
    t.save();
    for (const o of this.placed) {
      if (!o.visible)
        continue;
      a++;
      const l = e.reducedMotion ? 1 : 0.78 + 0.22 * Math.sin(e.time * 1.7 + o.twinklePhase), h = m(o.brightness * i * l);
      if (h <= 0.02)
        continue;
      const c = o.x * s + e.parallaxX * 0.15, d = o.y * r + e.parallaxY * 0.15;
      if (o.radius > 1.5) {
        const u = t.createRadialGradient(c, d, 0, c, d, o.radius * 5);
        u.addColorStop(0, `rgba(198,220,255,${(h * 0.55).toFixed(3)})`), u.addColorStop(1, "rgba(198,220,255,0)"), t.fillStyle = u, t.beginPath(), t.arc(c, d, o.radius * 5, 0, E), t.fill();
      }
      t.fillStyle = `rgba(255,252,246,${h.toFixed(3)})`, t.beginPath(), t.arc(c, d, o.radius, 0, E), t.fill();
    }
    t.restore(), this.visibleCount = a;
  }
  recompute(t) {
    this.sinceRecompute = 0, this.lastLatitude = t.latitude, this.lastLongitude = t.longitude;
    const e = /* @__PURE__ */ new Date();
    for (let i = 0; i < se.length; i++) {
      const s = se[i], r = this.placed[i];
      if (!r)
        continue;
      const { altitude: a, azimuth: o } = cs(
        s.ra,
        s.dec,
        t.latitude,
        t.longitude,
        e
      ), l = le(a, o);
      r.x = l.x, r.y = l.y, r.visible = a > 2 && l.inView;
    }
  }
  destroy() {
    this.placed = [], this.visibleCount = 0;
  }
}
const ms = 3846, Ue = 3, Ge = 512, Be = 128, ys = 6 * 6 * 3;
class bs {
  constructor() {
    this.name = "fog", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.bands = [];
  }
  setup(t) {
    const e = K(ms);
    this.base = [];
    for (let s = 0; s < Ue; s++)
      this.base.push(vs(Ge, Be, e));
    this.tinted = [], this.tintValid = !1;
    const i = t.quality.fogLayers;
    this.bands = new Array(i);
    for (let s = 0; s < i; s++) {
      const r = i <= 1 ? 1 : s / (i - 1);
      this.bands[s] = {
        variant: s % Ue,
        nx: e(),
        ny: _(0.5, 1.02, r) + y(e, -0.05, 0.05),
        thickness: _(0.18, 0.42, r) * y(e, 0.85, 1.2),
        speed: _(4e-3, 0.016, r) * y(e, 0.7, 1.4),
        alpha: _(0.5, 1, r) * y(e, 0.8, 1.1),
        bobPhase: e() * Math.PI * 2
      };
    }
  }
  resize() {
  }
  particleCount() {
    return this.bands.length;
  }
  render(t, e) {
    const i = m(e.weather.fog) * m(e.appearance.intensity);
    if (i <= 0.02 || this.bands.length === 0)
      return;
    const s = e.palette.ambient;
    if (this.ensureTint(s), this.tinted.length === 0)
      return;
    const { width: r, height: a, dt: o } = e, l = e.reducedMotion ? 0.1 : 1;
    t.save();
    for (const d of this.bands) {
      d.nx = it(d.nx + d.speed * l * o, 1);
      const u = this.tinted[d.variant], f = d.thickness * a, p = Math.max(r * 1.6, f * (Ge / Be)), g = e.reducedMotion ? 0 : Math.sin(e.time * 0.07 + d.bobPhase) * a * 0.012, v = d.ny * a - f / 2 + g + e.parallaxY * 1.4, b = -d.nx * p + e.parallaxX * 1.4;
      t.globalAlpha = m(d.alpha * i * 0.55), t.drawImage(u, b, v, p, f), t.drawImage(u, b + p, v, p, f);
    }
    t.restore();
    const h = a * 0.55, c = t.createLinearGradient(0, h, 0, a);
    c.addColorStop(0, S(s, 0)), c.addColorStop(1, S(s, 0.32 * i)), t.fillStyle = c, t.fillRect(0, h, r, a - h);
  }
  ensureTint(t) {
    this.tintValid && X(t, this.tintColor) < ys || (this.tinted = this.base.map((e) => ws(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.bands = [], this.tintValid = !1;
  }
}
function vs(n, t, e) {
  const i = document.createElement("canvas");
  i.width = n, i.height = t;
  const s = i.getContext("2d");
  if (!s)
    return i;
  const r = 14 + Math.floor(e() * 8);
  for (let o = 0; o < r; o++) {
    const l = e() * n, h = t * y(e, 0.3, 0.7), c = n * y(e, 0.08, 0.22), d = t * y(e, 0.3, 0.6), u = y(e, 0.1, 0.28), f = [0];
    l < c ? f.push(n) : l > n - c && f.push(-n);
    for (const p of f) {
      const g = l + p, v = s.createRadialGradient(g, h, 0, g, h, Math.max(c, d));
      v.addColorStop(0, `rgba(255,255,255,${u.toFixed(3)})`), v.addColorStop(0.6, `rgba(255,255,255,${(u * 0.4).toFixed(3)})`), v.addColorStop(1, "rgba(255,255,255,0)"), s.fillStyle = v, s.beginPath(), s.ellipse(g, h, c, d, 0, 0, Math.PI * 2), s.fill();
    }
  }
  s.globalCompositeOperation = "destination-in";
  const a = s.createLinearGradient(0, 0, 0, t);
  return a.addColorStop(0, "rgba(0,0,0,0)"), a.addColorStop(0.35, "rgba(0,0,0,1)"), a.addColorStop(0.7, "rgba(0,0,0,1)"), a.addColorStop(1, "rgba(0,0,0,0)"), s.fillStyle = a, s.fillRect(0, 0, n, t), s.globalCompositeOperation = "source-over", i;
}
function ws(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(n, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = S(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(n, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
const _s = 10783, bt = 3;
class Ss {
  constructor() {
    this.name = "rain", this.drops = [], this.active = 0;
  }
  setup(t) {
    const e = K(_s), i = t.quality.rainParticles;
    this.drops = new Array(i);
    for (let s = 0; s < i; s++) {
      const r = s % bt, a = r / (bt - 1);
      this.drops[s] = {
        nx: e(),
        ny: e(),
        speed: _(0.75, 1.7, a) * y(e, 0.85, 1.15),
        length: _(0.02, 0.058, a) * y(e, 0.8, 1.3),
        band: r
      };
    }
  }
  resize() {
  }
  particleCount() {
    return this.active;
  }
  render(t, e) {
    const i = m(e.weather.rain) * m(e.appearance.intensity);
    if (i <= 0.01 || this.drops.length === 0) {
      this.active = 0;
      return;
    }
    const { width: s, height: r, dt: a } = e, o = Math.round(this.drops.length * i);
    this.active = o;
    const l = _(0.06, 0.5, m(e.weather.wind)) * (e.reducedMotion ? 0.3 : 1), h = e.reducedMotion ? 0.25 : 1, c = D(e.palette.ambient, [225, 238, 255], 0.62);
    for (let d = 0; d < bt; d++) {
      const u = d / (bt - 1);
      t.strokeStyle = S(c, _(0.11, 0.3, u) * i), t.lineWidth = _(0.7, 1.4, u), t.lineCap = "round", t.beginPath();
      for (let f = d; f < o; f += bt) {
        const p = this.drops[f];
        p.ny += p.speed * h * a, p.nx += p.speed * l * h * a * (r / Math.max(1, s)), p.ny > 1.05 && (p.ny -= 1.1, p.nx = Math.random()), p.nx > 1.05 ? p.nx -= 1.1 : p.nx < -0.05 && (p.nx += 1.1);
        const g = p.nx * s, v = p.ny * r, b = p.length * r;
        t.moveTo(g, v), t.lineTo(g - b * l, v - b);
      }
      t.stroke();
    }
    this.renderGroundMist(t, e, i);
  }
  /** Spray hanging over the bottom edge – cheap, and it sells heavy rain. */
  renderGroundMist(t, e, i) {
    if (i < 0.35)
      return;
    const { width: s, height: r } = e, a = r * 0.82, o = (i - 0.35) / 0.65, l = t.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, S(e.palette.ambient, 0)), l.addColorStop(1, S(e.palette.ambient, 0.3 * o)), t.fillStyle = l, t.fillRect(0, a, s, r - a);
  }
  destroy() {
    this.drops.length = 0, this.active = 0;
  }
}
const $s = 6230212, vt = 3;
class xs {
  constructor() {
    this.name = "snow", this.flakes = [], this.active = 0;
  }
  setup(t) {
    const e = K($s), i = t.quality.snowParticles;
    this.flakes = new Array(i);
    for (let s = 0; s < i; s++) {
      const r = s % vt, a = r / (vt - 1);
      this.flakes[s] = {
        nx: e(),
        ny: e(),
        speed: _(0.035, 0.14, a) * y(e, 0.8, 1.25),
        radius: _(16e-4, 5e-3, a) * y(e, 0.8, 1.3),
        driftAmplitude: y(e, 8e-3, 0.035) * _(0.6, 1.4, a),
        driftFrequency: y(e, 0.25, 0.8),
        driftPhase: e() * E,
        band: r
      };
    }
  }
  resize() {
  }
  particleCount() {
    return this.active;
  }
  render(t, e) {
    const i = m(e.weather.snow) * m(e.appearance.intensity);
    if (i <= 0.01 || this.flakes.length === 0) {
      this.active = 0;
      return;
    }
    const { width: s, height: r, dt: a } = e, o = Math.min(s, r), l = Math.round(this.flakes.length * i);
    this.active = l;
    const h = e.reducedMotion ? 0.2 : 1, c = _(4e-3, 0.05, m(e.weather.wind)) * h, d = D(e.palette.ambient, [255, 255, 255], 0.85);
    for (let u = 0; u < vt; u++) {
      const f = u / (vt - 1);
      t.fillStyle = S(d, _(0.4, 0.85, f) * i), t.beginPath();
      for (let p = u; p < l; p += vt) {
        const g = this.flakes[p];
        g.ny += g.speed * h * a, g.nx += c * a, g.ny > 1.05 && (g.ny -= 1.1, g.nx = Math.random()), g.nx > 1.05 ? g.nx -= 1.1 : g.nx < -0.05 && (g.nx += 1.1);
        const v = e.reducedMotion ? 0 : Math.sin(e.time * g.driftFrequency + g.driftPhase) * g.driftAmplitude, b = (g.nx + v) * s, w = g.ny * r, A = g.radius * o;
        t.moveTo(b + A, w), t.arc(b, w, A, 0, E);
      }
      t.fill();
    }
  }
  destroy() {
    this.flakes.length = 0, this.active = 0;
  }
}
const qe = 45079;
class Cs {
  constructor() {
    this.name = "lightning", this.rng = K(qe), this.strike = null, this.cooldown = 6;
  }
  setup() {
    this.rng = K(qe), this.strike = null, this.cooldown = y(this.rng, 4, 12);
  }
  resize() {
  }
  particleCount() {
    return this.strike ? 1 : 0;
  }
  render(t, e) {
    const i = m(e.weather.lightning) * m(e.appearance.intensity);
    if (i <= 0.02 || e.reducedMotion) {
      this.strike = null;
      return;
    }
    const { dt: s, width: r, height: a } = e;
    if (!this.strike) {
      if (this.cooldown -= s * i, this.cooldown > 0)
        return;
      this.strike = this.createStrike(e), this.cooldown = _(26, 3, i) * y(this.rng, 0.7, 1.4);
    }
    const o = this.strike;
    if (o.elapsed += s, o.elapsed > o.total) {
      this.strike = null;
      return;
    }
    let l = 0;
    for (const f of o.flashes) {
      const p = o.elapsed - f.at;
      if (p < 0 || p > f.duration)
        continue;
      const g = p / f.duration, v = g < 0.18 ? g / 0.18 : Math.pow(1 - (g - 0.18) / 0.82, 2);
      l = Math.max(l, f.peak * v);
    }
    if (l <= 4e-3)
      return;
    const h = o.x * r, c = o.y * a, d = Math.max(r, a) * 1.15;
    t.save(), t.globalCompositeOperation = "lighter";
    const u = t.createRadialGradient(h, c, 0, h, c, d);
    u.addColorStop(0, `rgba(214,228,255,${(l * 0.85).toFixed(4)})`), u.addColorStop(0.45, `rgba(188,206,246,${(l * 0.35).toFixed(4)})`), u.addColorStop(1, "rgba(170,190,240,0)"), t.fillStyle = u, t.fillRect(0, 0, r, a), o.bolt && e.quality.lightningBolts && o.elapsed <= o.boltVisibleUntil && l > 0.05 && this.drawBolt(t, e, o, l), t.restore();
  }
  createStrike(t) {
    const e = this.rng, i = 2 + Math.floor(e() * 3), s = [];
    let r = 0;
    for (let d = 0; d < i; d++) {
      const u = y(e, 0.09, 0.22);
      s.push({
        at: r,
        duration: u,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: d === 0 ? y(e, 0.18, 0.3) : y(e, 0.06, 0.14)
      }), r += u + y(e, 0.04, 0.16);
    }
    const a = y(e, 0.12, 0.88), o = y(e, 0.05, 0.3), h = t.quality.lightningBolts && e() < 0.55 ? Ve(e, a, o, y(e, 0.55, 0.85)) : null, c = [];
    if (h) {
      const d = Math.floor(e() * 3);
      for (let u = 0; u < d; u++) {
        const f = h[1 + Math.floor(e() * (h.length - 2))];
        c.push(
          Ve(e, f.x, f.y, f.y + y(e, 0.08, 0.22), 0.45)
        );
      }
    }
    return {
      elapsed: 0,
      total: r + 0.3,
      flashes: s,
      x: a,
      y: o,
      bolt: h,
      branches: c,
      boltVisibleUntil: s[0].duration * 1.6
    };
  }
  drawBolt(t, e, i, s) {
    const { width: r, height: a } = e, o = m(s * 4), l = (c) => {
      t.beginPath(), t.moveTo(c[0].x * r, c[0].y * a);
      for (let d = 1; d < c.length; d++)
        t.lineTo(c[d].x * r, c[d].y * a);
      t.stroke();
    }, h = Math.min(r, a);
    t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = `rgba(150,180,255,${(o * 0.28).toFixed(4)})`, t.lineWidth = Math.max(4, h * 0.012), i.bolt && l(i.bolt), t.strokeStyle = `rgba(240,246,255,${(o * 0.9).toFixed(4)})`, t.lineWidth = Math.max(1.2, h * 22e-4), i.bolt && l(i.bolt), t.strokeStyle = `rgba(225,235,255,${(o * 0.55).toFixed(4)})`, t.lineWidth = Math.max(1, h * 15e-4);
    for (const c of i.branches)
      l(c);
  }
  destroy() {
    this.strike = null;
  }
}
function Ve(n, t, e, i, s = 1) {
  let r = [
    { x: t, y: e },
    { x: t + y(n, -0.06, 0.06) * s, y: i }
  ];
  for (let a = 0; a < 5; a++) {
    const o = [r[0]], l = 0.045 * s * Math.pow(0.62, a);
    for (let h = 1; h < r.length; h++) {
      const c = r[h - 1], d = r[h];
      o.push({
        x: (c.x + d.x) / 2 + y(n, -l, l),
        y: (c.y + d.y) / 2
      }), o.push(d);
    }
    r = o;
  }
  return r;
}
class Ms {
  constructor(t, e, i) {
    this.sky = new Bn(), this.stars = new Yn(), this.constellations = new gs(), this.moon = new jn(), this.sun = new Xn(), this.clouds = new ns(), this.fog = new bs(), this.rain = new Ss(), this.snow = new xs(), this.lightning = new Cs(), this.reducedMotion = !1, this.parallaxTargetX = 0, this.parallaxTargetY = 0, this.parallaxX = 0, this.parallaxY = 0, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = i, this.renderers = [
      this.sky,
      this.stars,
      this.constellations,
      this.moon,
      this.sun,
      this.clouds,
      this.fog,
      this.rain,
      this.snow,
      this.lightning
    ], this.season = ze(/* @__PURE__ */ new Date(), i.latitude), this.blender = new Nn(mi(i.condition)), this.blender.snapTo(this.targetProfile()), this.elevation = i.sunElevation, this.azimuth = i.sunAzimuth, this.palette = ne({
      elevation: this.elevation,
      rising: i.sunRising,
      weather: this.blender.value,
      appearance: t.appearance,
      season: t.effects.season ? this.season : null
    }), this.state = this.createState();
  }
  createState() {
    return {
      time: 0,
      dt: 0,
      width: 1,
      height: 1,
      pixelRatio: 1,
      sunElevation: this.elevation,
      sunAzimuth: this.azimuth,
      sunRising: this.snapshot.sunRising,
      latitude: this.snapshot.latitude,
      longitude: this.snapshot.longitude,
      dayFactor: 0,
      nightFactor: 0,
      twilightFactor: 0,
      sunX: 0.5,
      sunY: 0.5,
      moonVisible: !1,
      moonX: 0.5,
      moonY: 0.3,
      moonPhase: 0.5,
      palette: this.palette,
      weather: this.blender.value,
      season: this.season,
      parallaxX: 0,
      parallaxY: 0,
      quality: this.quality,
      appearance: this.config.appearance,
      effects: this.config.effects,
      reducedMotion: this.reducedMotion
    };
  }
  get sceneState() {
    return this.state;
  }
  get environment() {
    return this.snapshot;
  }
  setReducedMotion(t) {
    this.reducedMotion = t, this.state.reducedMotion = t;
  }
  setConfig(t) {
    const e = t.effects.season !== this.config.effects.season;
    this.config = t, this.state.appearance = t.appearance, this.state.effects = t.effects, e && this.blender.setTarget(this.targetProfile());
  }
  /** Called when the quality level changed – renderers rebuild their buffers. */
  setQuality(t) {
    this.quality = t, this.state.quality = t;
    for (const e of this.renderers)
      e.setup(this.state);
  }
  /** New Home Assistant data. Cheap – the blending happens per frame. */
  setEnvironment(t) {
    this.snapshot = t, this.season = ze(/* @__PURE__ */ new Date(), t.latitude), this.state.season = this.season, this.blender.setTarget(this.targetProfile());
  }
  /**
   * Parallax offset in CSS pixels, supplied by the layer from scroll and
   * pointer input. The scene smooths it so a flicked scroll does not snap.
   */
  setParallaxTarget(t, e) {
    this.parallaxTargetX = t, this.parallaxTargetY = e;
  }
  /**
   * The weather target with the season's haze folded in. Season changes over
   * weeks, so treating it as part of the weather target and letting the normal
   * cross-fade carry it is both correct and free.
   */
  targetProfile() {
    const t = zn(this.snapshot);
    return this.config.effects.season && (t.fog = m(t.fog + this.season.haze * 0.5)), t;
  }
  resize(t, e, i) {
    if (this.state.width = t, this.state.height = e, this.state.pixelRatio = i, !this.initialised) {
      for (const s of this.renderers)
        s.setup(this.state);
      this.initialised = !0;
    }
    for (const s of this.renderers)
      s.resize(this.state);
  }
  /** Skip the smoothing – used on the very first frame. */
  snapToTargets() {
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.parallaxX = this.parallaxTargetX, this.parallaxY = this.parallaxTargetY, this.blender.snapTo(this.targetProfile()), this.palette = ne({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
  }
  update(t, e) {
    const i = this.state;
    i.dt = t, i.time = e, this.elevation = It(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = As(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const s = this.blender.update(t), r = ne({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: s,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
    this.palette = Cn(this.palette, r, 0.6, t), this.config.effects.parallax && !this.reducedMotion ? (this.parallaxX = It(this.parallaxX, this.parallaxTargetX, 0.25, t), this.parallaxY = It(this.parallaxY, this.parallaxTargetY, 0.25, t)) : (this.parallaxX = 0, this.parallaxY = 0), i.parallaxX = this.parallaxX, i.parallaxY = this.parallaxY;
    const { dayFactor: a, nightFactor: o, twilightFactor: l } = gi(this.elevation);
    i.sunElevation = this.elevation, i.sunAzimuth = this.azimuth, i.sunRising = this.snapshot.sunRising, i.dayFactor = a, i.nightFactor = o, i.twilightFactor = l, i.palette = this.palette, i.weather = s, i.latitude = this.snapshot.latitude, i.longitude = this.snapshot.longitude;
    const h = le(this.elevation, this.azimuth);
    i.sunX = He(h), i.sunY = h.y;
    const c = /* @__PURE__ */ new Date(), d = Tn(c), u = Pn(c, this.snapshot.latitude, d), f = le(
      u.altitude,
      // The moon model yields a position along the arc rather than a true
      // azimuth; feed it through the same 240° panorama.
      60 + m(u.azimuthFraction) * 240
    );
    i.moonPhase = d, i.moonX = He(f), i.moonY = f.y, i.moonVisible = this.config.effects.moon && u.altitude > 2 && o > 0.08 && d > 0.03 && d < 0.97;
  }
  render(t) {
    const e = this.state, i = this.config.effects;
    this.sky.render(t, e), i.stars && this.stars.render(t, e), i.constellations && this.constellations.render(t, e), i.moon && this.moon.render(t, e), i.sun && this.sun.render(t, e), i.clouds && this.clouds.render(t, e), i.fog && this.fog.render(t, e), i.rain && this.rain.render(t, e), i.snow && this.snow.render(t, e), i.lightning && this.lightning.render(t, e);
  }
  /** Rough particle count for the debug overlay. */
  particleCount() {
    let t = 0;
    for (const e of this.renderers)
      t += e.particleCount?.() ?? 0;
    return t;
  }
  destroy() {
    for (const t of this.renderers)
      t.destroy();
    this.initialised = !1;
  }
}
function As(n, t, e, i) {
  let s = (t - n + 540) % 360 - 180;
  const r = e <= 0 ? 1 : 1 - Math.pow(2, -i / e);
  return s *= r, (n + s + 360) % 360;
}
const Es = 400, Dt = 4 * 4 * 3, Ts = [
  "--aurora-ambient-color",
  "--aurora-ambient-rgb",
  "--aurora-sky-color",
  "--aurora-horizon-color",
  "--aurora-accent-color",
  "--aurora-accent-rgb",
  "--aurora-glow-strength",
  "--aurora-night",
  "--aurora-day",
  "--aurora-contrast-color",
  "--aurora-card-tint",
  "--aurora-card-border",
  "--aurora-season",
  "--aurora-condition"
];
class Ps {
  constructor() {
    this.last = null, this.lastWrite = 0, this.active = !1;
  }
  /** True while properties are on the document. */
  get isActive() {
    return this.active;
  }
  update(t, e = !1) {
    const i = performance.now();
    if (!e && i - this.lastWrite < Es)
      return;
    const s = {
      ambient: t.palette.ambient,
      sky: t.palette.middle,
      horizon: t.palette.horizon,
      accent: t.palette.sunGlow,
      glow: m(t.dayFactor * 0.6 + t.twilightFactor * 0.8),
      night: m(t.nightFactor)
    };
    if (!e && this.last && !this.changed(this.last, s)) {
      this.lastWrite = i;
      return;
    }
    this.lastWrite = i, this.last = s, this.active = !0;
    const r = document.documentElement.style, a = (h) => `${Math.round(h[0])}, ${Math.round(h[1])}, ${Math.round(h[2])}`;
    r.setProperty("--aurora-ambient-color", S(s.ambient)), r.setProperty("--aurora-ambient-rgb", a(s.ambient)), r.setProperty("--aurora-sky-color", S(s.sky)), r.setProperty("--aurora-horizon-color", S(s.horizon)), r.setProperty("--aurora-accent-color", S(s.accent)), r.setProperty("--aurora-accent-rgb", a(s.accent)), r.setProperty("--aurora-glow-strength", s.glow.toFixed(3)), r.setProperty("--aurora-night", s.night.toFixed(3)), r.setProperty("--aurora-day", (1 - s.night).toFixed(3));
    const o = Bt(s.sky) > 140;
    r.setProperty("--aurora-contrast-color", o ? "#10151f" : "#f2f6ff");
    const l = D(s.ambient, o ? [12, 16, 24] : [235, 243, 255], 0.72);
    r.setProperty("--aurora-card-tint", S(l, o ? 0.5 : 0.14)), r.setProperty(
      "--aurora-card-border",
      S(o ? [255, 255, 255] : [255, 255, 255], o ? 0.28 : 0.16)
    ), r.setProperty("--aurora-season", t.season.name), r.setProperty("--aurora-condition", t.weather.condition);
  }
  changed(t, e) {
    return X(t.ambient, e.ambient) > Dt || X(t.sky, e.sky) > Dt || X(t.horizon, e.horizon) > Dt || X(t.accent, e.accent) > Dt || Math.abs(t.glow - e.glow) > 0.02 || Math.abs(t.night - e.night) > 0.02;
  }
  /** Remove every property again – called when the last Aurora card unmounts. */
  clear() {
    if (!this.active)
      return;
    const t = document.documentElement.style;
    for (const e of Ts)
      t.removeProperty(e);
    this.active = !1, this.last = null;
  }
}
const ks = 500, We = 5 * 5 * 3, Rs = [
  "--ha-card-background",
  "--card-background-color",
  "--ha-card-backdrop-filter",
  "--ha-card-border-color",
  "--ha-card-border-width",
  "--ha-card-box-shadow",
  "--ha-card-border-radius",
  "--aurora-glass-surface"
], Ye = ["--primary-text-color", "--secondary-text-color"];
class Os {
  constructor() {
    this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastWrite = 0, this.active = !1, this.textActive = !1;
  }
  update(t, e, i = !1) {
    if (!e.enabled) {
      this.clear();
      return;
    }
    const s = performance.now();
    if (!i && s - this.lastWrite < ks)
      return;
    const r = Bt(t.palette.middle) > 145, a = D(
      t.palette.ambient,
      r ? [14, 18, 27] : [226, 236, 252],
      0.7
    ), o = t.palette.sunGlow, l = m(t.dayFactor * 0.5 + t.twilightFactor * 0.9 + t.nightFactor * 0.25) * e.glow;
    if (!i && this.lastSurface && this.lastAccent && X(this.lastSurface, a) < We && X(this.lastAccent, o) < We && Math.abs(this.lastGlow - l) < 0.03) {
      this.lastWrite = s;
      return;
    }
    this.lastWrite = s, this.lastSurface = a, this.lastAccent = o, this.lastGlow = l, this.active = !0;
    const h = document.documentElement.style, c = m(e.opacity * (r ? 1.15 : 1)), d = S(a, c);
    h.setProperty("--aurora-glass-surface", d), h.setProperty("--ha-card-background", d), h.setProperty("--card-background-color", d), h.setProperty(
      "--ha-card-backdrop-filter",
      e.blur > 0 ? `blur(${e.blur}px) saturate(${e.saturate})` : "none"
    ), e.border ? (h.setProperty("--ha-card-border-width", "1px"), h.setProperty(
      "--ha-card-border-color",
      S(r ? [255, 255, 255] : [255, 255, 255], r ? 0.3 : 0.16)
    )) : (h.setProperty("--ha-card-border-width", "0px"), h.setProperty("--ha-card-border-color", "transparent"));
    const u = `0 6px 24px rgba(0,0,0,${(0.18 + (r ? 0.06 : 0.14)).toFixed(3)})`, f = l > 0.01 ? `, 0 0 36px ${S(o, m(l * 0.16))}` : "";
    if (h.setProperty("--ha-card-box-shadow", u + f), e.radius >= 0 ? h.setProperty("--ha-card-border-radius", `${e.radius}px`) : h.removeProperty("--ha-card-border-radius"), e.adaptive_text) {
      const p = r ? [16, 21, 31] : [240, 245, 255];
      h.setProperty("--primary-text-color", S(p)), h.setProperty(
        "--secondary-text-color",
        S(D(p, a, 0.35), _(0.75, 0.85, m(l)))
      ), this.textActive = !0;
    } else if (this.textActive) {
      for (const p of Ye)
        h.removeProperty(p);
      this.textActive = !1;
    }
  }
  /** Hand every managed property back to the user's theme. */
  clear() {
    if (!this.active && !this.textActive)
      return;
    const t = document.documentElement.style;
    for (const e of Rs)
      t.removeProperty(e);
    if (this.textActive) {
      for (const e of Ye)
        t.removeProperty(e);
      this.textActive = !1;
    }
    this.active = !1, this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1;
  }
}
const Ls = (n) => `
  position: absolute;
  top: ${n}px;
  left: 12px;
  z-index: 2;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(6, 10, 20, 0.62);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #e8f0ff;
  font: 500 11px/1.5 ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  letter-spacing: 0.02em;
  white-space: pre;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  max-width: calc(100vw - 24px);
  overflow: hidden;
`;
class je {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", Ls(e)), t.appendChild(this.element);
  }
  update(t, e, i, s, r) {
    const a = performance.now();
    if (a - this.lastUpdate < 250)
      return;
    this.lastUpdate = a;
    const o = [
      `AURORA BACKGROUND  v${he}`,
      `fps          ${i.toFixed(0).padStart(3)}${r ? "  (paused)" : ""}`,
      `quality      ${t.quality.level}  ×${t.quality.renderScale} @dpr ${t.pixelRatio.toFixed(2)}`,
      `canvas       ${Math.round(t.width)}×${Math.round(t.height)}`,
      `particles    ${s}`,
      `weather      ${e.condition}${e.weatherAvailable ? "" : "  (no entity)"}`,
      `entity       ${e.weatherEntity ?? "—"}`,
      `sun          ${t.sunElevation.toFixed(2)}° az ${t.sunAzimuth.toFixed(1)}° (${e.sunSource})`,
      `phase        ${t.sunRising ? "rising" : "setting"}`,
      `day/night    ${t.dayFactor.toFixed(2)} / ${t.nightFactor.toFixed(2)}  twilight ${t.twilightFactor.toFixed(2)}`,
      `cloud cover  ${t.weather.cloudCover.toFixed(2)}  wind ${t.weather.wind.toFixed(2)}`,
      `precip       rain ${t.weather.rain.toFixed(2)}  snow ${t.weather.snow.toFixed(2)}  fog ${t.weather.fog.toFixed(2)}  lgt ${t.weather.lightning.toFixed(2)}`,
      `moon         ${t.moonVisible ? "visible" : "hidden"}  phase ${t.moonPhase.toFixed(2)}`,
      `season       ${t.season.name}  warmth ${t.season.warmth.toFixed(2)}`,
      `parallax     ${t.parallaxX.toFixed(1)} / ${t.parallaxY.toFixed(1)} px`,
      `reduced mo.  ${t.reducedMotion ? "yes" : "no"}`
    ];
    this.element.textContent = o.join(`
`);
  }
  destroy() {
    this.element.remove();
  }
}
const Xe = 42e5, Ds = 0.06, Qe = 0.012;
class yi {
  /**
   * `exportsAmbient` is true only for the shared dashboard layer – two layers
   * writing `--aurora-*` on the document would fight each other.
   */
  constructor(t, e, i, s = !1) {
    this.host = t, this.debugOverlay = null, this.resizeObserver = null, this.intersectionObserver = null, this.motionQuery = null, this.cssWidth = 0, this.cssHeight = 0, this.pixelRatio = 1, this.resizePending = !1, this.visible = !0, this.documentVisible = !0, this.destroyed = !1, this.firstFrame = !0, this.environmentTimer = null, this.scrollOffset = 0, this.pointerX = 0, this.pointerY = 0, this.onMotionPreferenceChange = (a) => {
      this.scene.setReducedMotion(a.matches), this.applyFrameCap();
    }, this.onDocumentScroll = (a) => {
      const o = a.target, l = o instanceof Element ? o.scrollTop : document.scrollingElement?.scrollTop ?? window.scrollY;
      this.scrollOffset = Math.min(1, l / Math.max(1, this.cssHeight)), this.pushParallax();
    }, this.onPointerMove = (a) => {
      this.pointerX = x(a.clientX / Math.max(1, window.innerWidth) * 2 - 1, -1, 1), this.pointerY = x(a.clientY / Math.max(1, window.innerHeight) * 2 - 1, -1, 1), this.pushParallax();
    }, this.onVisibilityChange = () => {
      this.documentVisible = document.visibilityState !== "hidden", this.updateRunState();
    }, this.onIntersect = (a) => {
      for (const o of a)
        o.target === this.host && (this.visible = o.isIntersecting);
      this.updateRunState();
    }, this.onResize = () => {
      this.resizePending || this.destroyed || (this.resizePending = !0, requestAnimationFrame(() => {
        if (this.resizePending = !1, this.destroyed)
          return;
        (this.measure() || !this.engine.isRunning) && this.renderOnce();
      }));
    }, this.refreshEnvironment = () => {
      this.destroyed || (this.scene.setEnvironment(Fe(this.hass, this.config)), this.engine.isRunning || this.renderOnce());
    }, this.frame = (a, o) => {
      if (this.destroyed || !this.ctx)
        return;
      const l = performance.now();
      this.firstFrame && (this.scene.snapToTargets(), this.firstFrame = !1), this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.update(a, o), this.scene.render(this.ctx);
      const h = performance.now() - l, c = this.performance.sample(a, h);
      c && this.applyQuality(c), this.ambient && this.config.background.ambient_variables && this.ambient.update(this.scene.sceneState), this.glass?.update(this.scene.sceneState, this.config.glass), this.debugOverlay && this.debugOverlay.update(
        this.scene.sceneState,
        this.scene.environment,
        this.performance.fps,
        this.scene.particleCount(),
        !1
      );
    }, this.config = e, this.hass = i, this.ambient = s ? new Ps() : null, this.glass = s ? new Os() : null, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1 });
    const r = this.resolveQuality();
    this.performance = new bn(
      r,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, mt(r).maxFps)
    ), this.scene = new Ms(
      e,
      mt(r),
      Fe(i, e)
    ), this.engine = new mn(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new je(this.host, this.debugTopOffset())), this.updateRunState();
  }
  /* ---------------------------------------------------------------- *
   * Public API
   * ---------------------------------------------------------------- */
  updateConfig(t) {
    if (this.destroyed)
      return;
    const e = t.quality !== this.config.quality, i = t.debug !== this.config.debug, s = t.appearance.blur !== this.config.appearance.blur, r = t.appearance.opacity !== this.config.appearance.opacity;
    if (this.config = t, this.scene.setConfig(t), e) {
      const a = this.resolveQuality();
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.performance.setQuality(a), this.applyQuality(a);
    } else
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.applyFrameCap();
    (s || r) && this.applyCanvasFilter(), i && (t.debug && !this.debugOverlay ? this.debugOverlay = new je(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.ambient && !t.background.ambient_variables && this.ambient.clear(), this.glass && !t.glass.enabled && this.glass.clear(), this.pushParallax(), this.refreshEnvironment(), this.updateRunState();
  }
  updateHass(t) {
    this.destroyed || (this.hass = t, this.refreshEnvironment());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.engine.stop(), this.detachListeners(), this.debugOverlay?.destroy(), this.debugOverlay = null, this.ambient?.clear(), this.glass?.clear(), this.scene.destroy(), this.canvas.remove());
  }
  /* ---------------------------------------------------------------- *
   * Internals
   * ---------------------------------------------------------------- */
  /** Keep the overlay clear of the Home Assistant toolbar in background mode. */
  debugTopOffset() {
    return this.config.mode === "background" ? 76 : 12;
  }
  resolveQuality() {
    return this.config.quality === "auto" ? Ci() : this.config.quality;
  }
  applyQuality(t) {
    const e = mt(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = mt(this.performance.quality);
    let e = Math.min(this.config.performance.max_fps, t.maxFps);
    this.scene.sceneState.reducedMotion && (e = Math.min(e, 20)), this.engine.setMaxFps(e);
  }
  applyCanvasFilter() {
    const { blur: t, opacity: e } = this.config.appearance;
    this.canvas.style.filter = t > 0 ? `blur(${t}px)` : "", this.canvas.style.transform = t > 0 ? `scale(${1 + t / 120})` : "", this.canvas.style.opacity = e >= 1 ? "" : String(e);
  }
  attachListeners() {
    typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.host)) : window.addEventListener("resize", this.onResize, { passive: !0 }), typeof IntersectionObserver < "u" && (this.intersectionObserver = new IntersectionObserver(this.onIntersect, { threshold: 0 }), this.intersectionObserver.observe(this.host)), document.addEventListener("visibilitychange", this.onVisibilityChange), document.addEventListener("scroll", this.onDocumentScroll, {
      capture: !0,
      passive: !0
    }), (typeof window.matchMedia != "function" || window.matchMedia("(pointer: fine)").matches) && window.addEventListener("pointermove", this.onPointerMove, { passive: !0 }), typeof window.matchMedia == "function" && (this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.scene.setReducedMotion(this.motionQuery.matches), typeof this.motionQuery.addEventListener == "function" ? this.motionQuery.addEventListener("change", this.onMotionPreferenceChange) : typeof this.motionQuery.addListener == "function" && this.motionQuery.addListener(this.onMotionPreferenceChange)), this.environmentTimer = window.setInterval(this.refreshEnvironment, 6e4);
  }
  detachListeners() {
    this.resizeObserver?.disconnect(), this.resizeObserver = null, window.removeEventListener("resize", this.onResize), this.intersectionObserver?.disconnect(), this.intersectionObserver = null, document.removeEventListener("visibilitychange", this.onVisibilityChange), document.removeEventListener("scroll", this.onDocumentScroll, { capture: !0 }), window.removeEventListener("pointermove", this.onPointerMove), this.motionQuery && (typeof this.motionQuery.removeEventListener == "function" ? this.motionQuery.removeEventListener("change", this.onMotionPreferenceChange) : typeof this.motionQuery.removeListener == "function" && this.motionQuery.removeListener(this.onMotionPreferenceChange), this.motionQuery = null), this.environmentTimer !== null && (window.clearInterval(this.environmentTimer), this.environmentTimer = null);
  }
  pushParallax() {
    if (!this.config.effects.parallax) {
      this.scene.setParallaxTarget(0, 0);
      return;
    }
    const t = Math.max(1, Math.min(this.cssWidth, this.cssHeight));
    this.scene.setParallaxTarget(
      this.pointerX * t * Qe,
      this.scrollOffset * t * Ds + this.pointerY * t * Qe * 0.6
    );
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  /** Returns true when the backing store was reallocated. */
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), i = Math.max(1, Math.round(t.height)), s = mt(this.performance.quality);
    let a = Math.min(window.devicePixelRatio || 1, s.maxDpr) * s.renderScale;
    const o = e * i * a * a;
    o > Xe && (a *= Math.sqrt(Xe / o));
    const l = Math.max(1, Math.round(e * a)), h = Math.max(1, Math.round(i * a)), c = this.canvas.width !== l || this.canvas.height !== h || this.cssWidth !== e || this.cssHeight !== i;
    return this.cssWidth = e, this.cssHeight = i, this.pixelRatio = a, c && (this.canvas.width = l, this.canvas.height = h, this.scene.resize(e, i, a)), this.updateRunState(), c;
  }
  /**
   * Paint a single frame while the loop is stopped (resize, or new Home
   * Assistant state while the dashboard is hidden).
   *
   * There is no time passing here, so the usual damping would never converge –
   * a still frame always snaps straight to the current sun and weather.
   */
  renderOnce() {
    this.destroyed || !this.ctx || this.cssWidth === 0 || (this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.snapToTargets(), this.scene.update(0, this.scene.sceneState.time), this.scene.render(this.ctx), this.firstFrame = !1, this.ambient && this.config.background.ambient_variables && this.ambient.update(this.scene.sceneState, !0), this.glass?.update(this.scene.sceneState, this.config.glass, !0), this.debugOverlay?.update(
      this.scene.sceneState,
      this.scene.environment,
      this.performance.fps,
      this.scene.particleCount(),
      !0
    ));
  }
}
const Ke = "aurora-background-root", Ze = "aurora-background-style";
class Is {
  constructor() {
    this.root = null, this.styleElement = null, this.layer = null, this.owners = /* @__PURE__ */ new Map(), this.activeOwner = null;
  }
  acquire(t, e, i) {
    this.owners.set(t, { config: e, hass: i }), this.activeOwner = t, this.ensureMounted(e), this.applyGlobalStyles(e), this.layer?.updateConfig(e), this.layer?.updateHass(i);
  }
  update(t, e, i) {
    this.owners.has(t) && (this.owners.set(t, { config: e, hass: i }), this.activeOwner === t && (this.applyRootStyle(e), this.applyGlobalStyles(e), this.layer?.updateConfig(e), this.layer?.updateHass(i)));
  }
  updateHass(t, e) {
    const i = this.owners.get(t);
    i && (i.hass = e, this.activeOwner === t && this.layer?.updateHass(e));
  }
  release(t) {
    if (this.owners.delete(t)) {
      if (this.owners.size > 0) {
        const [e, i] = [...this.owners.entries()][0];
        this.activeOwner = e, this.applyRootStyle(i.config), this.applyGlobalStyles(i.config), this.layer?.updateConfig(i.config), this.layer?.updateHass(i.hass);
        return;
      }
      this.activeOwner = null, this.layer?.destroy(), this.layer = null, this.root?.remove(), this.root = null, this.styleElement?.remove(), this.styleElement = null;
    }
  }
  ensureMounted(t) {
    if (!this.root) {
      document.getElementById(Ke)?.remove();
      const e = document.createElement("div");
      e.id = Ke, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new yi(this.root, t, e?.hass, !0);
    }
  }
  applyRootStyle(t) {
    this.root && this.root.setAttribute(
      "style",
      [
        "position:fixed",
        "inset:0",
        "width:100%",
        "height:100%",
        "margin:0",
        "padding:0",
        "border:0",
        "overflow:hidden",
        "pointer-events:none",
        "user-select:none",
        "-webkit-user-select:none",
        "touch-action:none",
        "contain:layout paint style",
        // Force a stable compositor layer. A `position: fixed` element behind
        // scrolling content gets promoted and demoted repeatedly on Android
        // Chrome, and each change can present a partially painted frame.
        "transform:translateZ(0)",
        "backface-visibility:hidden",
        "-webkit-backface-visibility:hidden",
        `z-index:${t.background.z_index}`
      ].join(";")
    );
  }
  applyGlobalStyles(t) {
    if (!t.background.transparent_lovelace && !t.background.transparent_header) {
      const r = Je(t);
      this.writeStyle(r ? `:root{${r}}` : "");
      return;
    }
    const e = [], i = [];
    t.background.transparent_lovelace && (i.push("--lovelace-background:transparent !important"), i.push("--view-background:transparent !important"), i.push("--ha-view-background:transparent !important"), e.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), t.background.transparent_header && (i.push("--app-header-background-color:transparent !important"), i.push("--header-height-background:transparent !important"));
    const s = Je(t);
    s && i.push(s), i.length > 0 && e.unshift(`:root{${i.join(";")}}`), this.writeStyle(e.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(Ze)?.remove();
      const e = document.createElement("style");
      e.id = Ze, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function Je(n) {
  const t = Object.entries(n.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, i]) => `${e}:${i} !important`).join(";");
}
const wt = new Is(), zs = Et`
  :host {
    display: block;
    position: relative;
  }

  /* Background mode: the card itself takes no space in the view. */
  :host([data-mode='background']) {
    display: block;
    height: 0;
    min-height: 0;
    margin: 0;
    padding: 0;
    overflow: visible;
    pointer-events: none;
  }

  /* While the dashboard is in edit mode the chip needs real space again. */
  :host([data-mode='background'][data-editing='true']) {
    height: auto;
    min-height: 0;
    pointer-events: auto;
  }

  .surface {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 12px);
    background: #05070f;
    box-shadow: var(--ha-card-box-shadow, none);
    border: var(--ha-card-border-width, 1px) solid
      var(--ha-card-border-color, var(--divider-color, rgba(255, 255, 255, 0.12)));
  }

  /* The placeholder shown while editing a dashboard, so the card is selectable. */
  .placeholder {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    color: var(--primary-text-color, #fff);
    font-family: var(--paper-font-body1_-_font-family, inherit);
    font-size: 14px;
    line-height: 1.4;
    pointer-events: auto;
    border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
  }

  .placeholder .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex: 0 0 auto;
    background: linear-gradient(135deg, #7a5cff, #34c6ff 55%, #ffb26b);
    box-shadow: 0 0 10px rgba(122, 92, 255, 0.7);
  }

  .placeholder .meta {
    opacity: 0.65;
    font-size: 12px;
  }

  .error {
    padding: 14px 16px;
    border-radius: var(--ha-card-border-radius, 12px);
    background: var(--error-color, #db4437);
    color: #fff;
    font-size: 14px;
    pointer-events: auto;
  }
`, bi = Et`
  :host {
    display: block;
  }

  .hint {
    margin: 0 0 12px;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--secondary-background-color, rgba(255, 255, 255, 0.06));
    color: var(--secondary-text-color, inherit);
    font-size: 13px;
    line-height: 1.45;
  }

  .fallback {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 12px;
    white-space: pre-wrap;
  }
`;
var Fs = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, vi = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Ns(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(t, e, s) : a(s)) || s);
  return i && s && Fs(t, e, s), s;
};
const Hs = {
  weather_entity: "Weather entity",
  sun_entity: "Sun entity",
  mode: "Mode",
  quality: "Quality",
  debug: "Debug overlay",
  height: "Height (card mode)",
  effects: "Effects",
  appearance: "Appearance",
  performance: "Performance",
  background: "Dashboard background",
  sun: "Sun",
  moon: "Moon",
  stars: "Stars",
  shooting_stars: "Shooting stars",
  constellations: "Real constellations",
  clouds: "Clouds",
  rain: "Rain",
  snow: "Snow",
  fog: "Fog",
  lightning: "Lightning",
  season: "Seasonal tint",
  parallax: "Parallax",
  intensity: "Intensity",
  saturation: "Saturation",
  brightness: "Brightness",
  blur: "Blur (px)",
  ambient_glow: "Ambient glow",
  opacity: "Opacity",
  max_fps: "Max FPS",
  auto_quality: "Automatic quality",
  pause_when_hidden: "Pause when hidden",
  transparent_lovelace: "Make dashboard transparent",
  transparent_header: "Make header transparent",
  ambient_variables: "Publish --aurora-* colours",
  z_index: "z-index",
  glass: "Aurora Glass (card styling)",
  enabled: "Enable glass cards",
  saturate: "Backdrop saturation",
  radius: "Corner radius (px)",
  adaptive_text: "Adaptive text colour"
};
function M(n) {
  return { name: n, selector: { boolean: {} } };
}
function z(n, t, e, i) {
  return { name: n, selector: { number: { min: t, max: e, step: i, mode: "slider" } } };
}
const Us = [
  { name: "weather_entity", selector: { entity: { domain: "weather" } } },
  { name: "sun_entity", selector: { entity: { domain: "sun" } } },
  {
    name: "",
    type: "grid",
    schema: [
      {
        name: "mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "background", label: "Dashboard background" },
              { value: "card", label: "Normal card" }
            ]
          }
        }
      },
      {
        name: "quality",
        selector: {
          select: {
            mode: "dropdown",
            options: ["auto", "low", "medium", "high", "ultra"]
          }
        }
      }
    ]
  },
  M("debug"),
  {
    name: "effects",
    type: "expandable",
    icon: "mdi:weather-partly-cloudy",
    schema: [
      {
        name: "",
        type: "grid",
        schema: [
          M("sun"),
          M("moon"),
          M("stars"),
          M("shooting_stars"),
          M("constellations"),
          M("clouds"),
          M("fog"),
          M("rain"),
          M("snow"),
          M("lightning"),
          M("season"),
          M("parallax")
        ]
      }
    ]
  },
  {
    name: "appearance",
    type: "expandable",
    icon: "mdi:palette",
    schema: [
      z("intensity", 0, 2, 0.05),
      z("saturation", 0, 2, 0.05),
      z("brightness", 0.2, 2, 0.05),
      z("ambient_glow", 0, 2, 0.05),
      z("opacity", 0, 1, 0.05),
      z("blur", 0, 40, 1)
    ]
  },
  {
    name: "performance",
    type: "expandable",
    icon: "mdi:speedometer",
    schema: [
      z("max_fps", 10, 120, 1),
      M("auto_quality"),
      M("pause_when_hidden")
    ]
  },
  {
    name: "glass",
    type: "expandable",
    icon: "mdi:card-outline",
    schema: [
      M("enabled"),
      z("blur", 0, 40, 1),
      z("opacity", 0, 1, 0.05),
      z("saturate", 1, 3, 0.05),
      z("glow", 0, 2, 0.05),
      { name: "radius", selector: { number: { min: -1, max: 60, step: 1, mode: "box" } } },
      M("border"),
      M("adaptive_text")
    ]
  },
  {
    name: "background",
    type: "expandable",
    icon: "mdi:layers-outline",
    schema: [
      M("transparent_lovelace"),
      M("transparent_header"),
      M("ambient_variables"),
      { name: "z_index", selector: { number: { min: -10, max: 10, step: 1, mode: "box" } } }
    ]
  }
];
class Wt extends q {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => Hs[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = ei(this.config);
    return {
      weather_entity: this.config.weather_entity ?? "",
      sun_entity: t.sun_entity ?? "",
      mode: t.mode,
      quality: t.quality,
      debug: t.debug,
      effects: { ...t.effects },
      appearance: { ...t.appearance },
      performance: { ...t.performance },
      glass: { ...t.glass },
      background: {
        transparent_lovelace: t.background.transparent_lovelace,
        transparent_header: t.background.transparent_header,
        ambient_variables: t.background.ambient_variables,
        z_index: t.background.z_index
      }
    };
  }
  render() {
    return customElements.get("ha-form") ? P`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${Us}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : P`
        <div class="hint fallback">
Aurora Background: this Home Assistant build does not provide "ha-form".
Please configure the card in YAML – see the repository README.
        </div>
      `;
  }
  onValueChanged(t) {
    t.stopPropagation();
    const e = t.detail?.value;
    if (!e)
      return;
    const i = {
      ...this.config,
      type: this.config.type ?? `custom:${lt}`,
      mode: e.mode,
      quality: e.quality,
      debug: !!e.debug,
      effects: e.effects,
      appearance: e.appearance,
      performance: e.performance,
      glass: e.glass,
      background: {
        ...this.config.background ?? {},
        ...e.background
      }
    };
    typeof e.weather_entity == "string" && e.weather_entity.length > 0 ? i.weather_entity = e.weather_entity : delete i.weather_entity, typeof e.sun_entity == "string" && e.sun_entity.length > 0 ? i.sun_entity = e.sun_entity : delete i.sun_entity, this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
Wt.styles = bi;
vi([
  ut({ attribute: !1 })
], Wt.prototype, "hass", 2);
vi([
  F()
], Wt.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", Wt);
var Gs = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, Yt = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Bs(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(t, e, s) : a(s)) || s);
  return i && s && Gs(t, e, s), s;
};
const qs = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function Vs(n, t = 30) {
  let e = n;
  for (let i = 0; i < t && e; i++) {
    if (e instanceof HTMLElement && qs.includes(e.tagName))
      return !0;
    const s = e.parentNode;
    if (!s)
      break;
    e = s instanceof ShadowRoot ? s.host : s;
  }
  return !1;
}
class gt extends q {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = ei(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = oe(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, i = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && i === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = i, this.config.mode === "background" ? wt.updateHass(this, t) : this.cardLayer?.updateHass(t));
  }
  get hass() {
    return this._hass;
  }
  getCardSize() {
    if (!this.config || this.config.mode === "background")
      return 1;
    const t = Number.parseInt(this.config.height, 10);
    return Number.isFinite(t) ? Math.max(1, Math.round(t / 50)) : 6;
  }
  /** Sections view (Home Assistant 2024.3+). */
  getGridOptions() {
    return !this.config || this.config.mode === "background" ? { rows: 1, columns: 3, min_rows: 1, min_columns: 1 } : { rows: 6, columns: "full", min_rows: 2 };
  }
  /** Legacy name used by 2024.2 and earlier. */
  getLayoutOptions() {
    return this.getGridOptions();
  }
  static getStubConfig(t) {
    return {
      type: `custom:${lt}`,
      weather_entity: oe(t),
      quality: "auto"
    };
  }
  static getConfigElement() {
    return document.createElement("aurora-background-editor");
  }
  /* ---------------------------------------------------------------- *
   * Lit lifecycle
   * ---------------------------------------------------------------- */
  connectedCallback() {
    super.connectedCallback(), this.syncLayer(), requestAnimationFrame(() => {
      this.isConnected && (this.editing = this.preview || Vs(this));
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.teardownLayer();
  }
  updated(t) {
    super.updated(t), t.has("editing") && (this.dataset.editing = this.editing ? "true" : "false"), (t.has("config") || t.has("editing")) && this.syncLayer();
  }
  /* ---------------------------------------------------------------- *
   * Layer management
   * ---------------------------------------------------------------- */
  syncLayer() {
    const t = this.config;
    if (!t || !this.isConnected)
      return;
    if (t.mode === "background") {
      this.destroyCardLayer(), this.mounted ? wt.update(this, t, this._hass) : (wt.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (wt.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new yi(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (wt.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? P`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? P`<div class="surface"></div>` : this.editing ? P`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${he} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : $ : $;
  }
}
gt.styles = zs;
Yt([
  ut({ type: Boolean })
], gt.prototype, "preview", 2);
Yt([
  F()
], gt.prototype, "config", 2);
Yt([
  F()
], gt.prototype, "editing", 2);
Yt([
  F()
], gt.prototype, "errorMessage", 2);
customElements.get(lt) || customElements.define(lt, gt);
var Ws = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, wi = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Ys(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (s = (i ? a(t, e, s) : a(s)) || s);
  return i && s && Ws(t, e, s), s;
};
const js = {
  entity: "Entity",
  name: "Name",
  icon: "Icon",
  slider: "Drag to adjust",
  use_light_color: "Tint with the light colour",
  show_modes: "Show mode buttons"
};
class Pt extends q {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => js[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    return customElements.get("ha-form") ? P`
      <div class="hint">${this.hint}</div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData(this.config)}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : P`
        <div class="hint fallback">
This Home Assistant build does not provide "ha-form".
Please configure this card in YAML - see the repository README.
        </div>
      `;
  }
  onValueChanged(t) {
    t.stopPropagation();
    const e = t.detail?.value;
    if (!e)
      return;
    const i = {
      ...this.config,
      ...e,
      type: this.config.type ?? `custom:${this.cardType}`
    };
    for (const s of ["name", "icon"]) {
      const r = i;
      typeof r[s] == "string" && r[s].length === 0 && delete r[s];
    }
    this.config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
Pt.styles = bi;
wi([
  ut({ attribute: !1 })
], Pt.prototype, "hass", 2);
wi([
  F()
], Pt.prototype, "config", 2);
const Xs = [
  { name: "entity", required: !0, selector: { entity: { domain: "light" } } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } }
    ]
  },
  { name: "slider", selector: { boolean: {} } },
  { name: "use_light_color", selector: { boolean: {} } }
];
class Qs extends Pt {
  get schema() {
    return Xs;
  }
  get cardType() {
    return dt;
  }
  get hint() {
    return "Drag across the card to set brightness, tap to toggle, hold for more info.";
  }
  formData(t) {
    return {
      entity: t.entity ?? "",
      name: t.name ?? "",
      icon: t.icon ?? "",
      slider: t.slider !== !1,
      use_light_color: t.use_light_color !== !1
    };
  }
}
const Ks = [
  { name: "entity", required: !0, selector: { entity: { domain: "climate" } } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } }
    ]
  },
  { name: "show_modes", selector: { boolean: {} } },
  { name: "slider", selector: { boolean: {} } }
];
class Zs extends Pt {
  get schema() {
    return Ks;
  }
  get cardType() {
    return ct;
  }
  get hint() {
    return "Use the buttons or drag across the temperature row. Hold the icon for more info.";
  }
  formData(t) {
    return {
      entity: t.entity ?? "",
      name: t.name ?? "",
      icon: t.icon ?? "",
      show_modes: t.show_modes !== !1,
      slider: t.slider !== !1
    };
  }
}
customElements.get("aurora-light-editor") || customElements.define("aurora-light-editor", Qs);
customElements.get("aurora-climate-editor") || customElements.define("aurora-climate-editor", Zs);
const re = "https://github.com/iiNoNoNoii/Aurora-UI", Js = [
  {
    type: lt,
    name: Si,
    description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
    preview: !1,
    documentationURL: re
  },
  {
    type: dt,
    name: "Aurora Light",
    description: "Light tile that takes the bulb’s own colour. Drag for brightness, tap to toggle.",
    preview: !1,
    documentationURL: re
  },
  {
    type: ct,
    name: "Aurora Climate",
    description: "Thermostat with a large target temperature and a surface that warms with it.",
    preview: !1,
    documentationURL: re
  }
], ti = window.customCards = window.customCards || [];
for (const n of Js)
  ti.some((t) => t.type === n.type) || ti.push(n);
console.info(
  `%c AURORA UI %c v${he} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  gt as AuroraBackgroundCard,
  Wt as AuroraBackgroundEditor,
  pt as AuroraClimateCard,
  ft as AuroraLightCard
};
