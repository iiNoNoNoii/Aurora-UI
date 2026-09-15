/*! Aurora UI v0.5.0-alpha | AGPL-3.0-or-later | Source: https://github.com/iiNoNoNoii/Aurora-UI */
const P = Math.PI * 2;
function x(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function m(s) {
  return x(s, 0, 1);
}
function v(s, t, e) {
  return s + (t - s) * e;
}
function oi(s, t, e) {
  return s === t ? e < s ? 0 : 1 : m((e - s) / (t - s));
}
function dt(s, t, e) {
  const i = oi(s, t, e);
  return i * i * (3 - 2 * i);
}
function $t(s, t, e, i) {
  if (e <= 0)
    return t;
  const n = 1 - Math.pow(2, -i / e);
  return s + (t - s) * n;
}
function Y(s) {
  let t = s >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let i = t;
    return i = Math.imul(i ^ i >>> 15, i | 1), i ^= i + Math.imul(i ^ i >>> 7, i | 61), ((i ^ i >>> 14) >>> 0) / 4294967296;
  };
}
function _(s, t, e) {
  return t + s() * (e - t);
}
function Et(s, t) {
  const e = s % t;
  return e < 0 ? e + t : e;
}
function z(s) {
  return s * Math.PI / 180;
}
function Jt(s) {
  return s * 180 / Math.PI;
}
const Z = "aurora-background", ai = "Aurora Background", Vt = "0.5.0-alpha", zt = ["low", "medium", "high", "ultra"], li = ["background", "card"], hi = {
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
function ot(s) {
  return { ...hi[s] };
}
function te(s, t) {
  const e = zt.indexOf(s);
  return zt[x(e + t, 0, zt.length - 1)];
}
function ci() {
  if (typeof window > "u")
    return "medium";
  const s = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), i = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return s <= 2 || t <= 2 ? "low" : i && e <= 480 ? "medium" : i ? s >= 6 ? "high" : "medium" : s >= 8 && t >= 8 ? "high" : "medium";
}
function M(s, t) {
  return typeof s == "boolean" ? s : s === "true" ? !0 : s === "false" ? !1 : t;
}
function T(s, t, e, i) {
  const n = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(n) ? x(n, e, i) : t;
}
function ee(s, t) {
  return typeof s == "string" && s.length > 0 ? s : t;
}
function ie(s, t, e) {
  return t.includes(s) ? s : e;
}
function di(s) {
  const t = {};
  if (s && typeof s == "object" && !Array.isArray(s))
    for (const [e, i] of Object.entries(s)) {
      if (typeof i != "string" && typeof i != "number")
        continue;
      const n = e.startsWith("--") ? e : `--${e}`;
      t[n] = String(i);
    }
  return t;
}
const ui = "sun.sun";
function Fe(s) {
  const t = s ?? {}, e = t.effects ?? {}, i = t.appearance ?? {}, n = t.performance ?? {}, r = t.background ?? {}, o = typeof t.glass == "boolean" ? { enabled: t.glass } : t.glass ?? {}, a = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : ui, l = ie(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: ee(t.type, `custom:${Z}`),
    mode: ie(t.mode, li, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: a,
    quality: l,
    debug: M(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : ee(t.height, "320px"),
    effects: {
      sun: M(e.sun, !0),
      moon: M(e.moon, !0),
      stars: M(e.stars, !0),
      shooting_stars: M(e.shooting_stars, !0),
      clouds: M(e.clouds, !0),
      rain: M(e.rain, !0),
      snow: M(e.snow, !0),
      fog: M(e.fog, !0),
      lightning: M(e.lightning, !0),
      season: M(e.season, !0),
      parallax: M(e.parallax, !0)
    },
    appearance: {
      intensity: T(i.intensity, 1, 0, 2),
      saturation: T(i.saturation, 1, 0, 2),
      brightness: T(i.brightness, 1, 0.2, 2),
      blur: T(i.blur, 0, 0, 40),
      ambient_glow: T(i.ambient_glow, 1, 0, 2),
      opacity: T(i.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: T(n.max_fps, 60, 10, 120),
      auto_quality: M(n.auto_quality, !0),
      pause_when_hidden: M(n.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: M(r.transparent_lovelace, !0),
      transparent_header: M(r.transparent_header, !0),
      css_variables: di(r.css_variables),
      z_index: T(r.z_index, -1, -100, 100),
      ambient_variables: M(r.ambient_variables, !0)
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: M(o.enabled, !1),
      blur: T(o.blur, 14, 0, 40),
      opacity: T(o.opacity, 0.5, 0, 1),
      saturate: T(o.saturate, 1.4, 1, 3),
      border: M(o.border, !0),
      glow: T(o.glow, 1, 0, 2),
      radius: T(o.radius, 18, -1, 60),
      adaptive_text: M(o.adaptive_text, !1)
    }
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, Wt = xt.ShadowRoot && (xt.ShadyCSS === void 0 || xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yt = Symbol(), se = /* @__PURE__ */ new WeakMap();
let Ie = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Yt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Wt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = se.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && se.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const pi = (s) => new Ie(typeof s == "string" ? s : s + "", void 0, Yt), bt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new Ie(e, s, Yt);
}, fi = (s, t) => {
  if (Wt)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), n = xt.litNonce;
      n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
    }
}, ne = Wt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return pi(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: gi, defineProperty: mi, getOwnPropertyDescriptor: yi, getOwnPropertyNames: bi, getOwnPropertySymbols: vi, getPrototypeOf: wi } = Object, G = globalThis, re = G.trustedTypes, _i = re ? re.emptyScript : "", Si = G.reactiveElementPolyfillSupport, ut = (s, t) => s, Ct = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? _i : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, jt = (s, t) => !gi(s, t), oe = { attribute: !0, type: String, converter: Ct, reflect: !1, useDefault: !1, hasChanged: jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), G.litPropertyMetadata ?? (G.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Q = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = oe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && mi(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = yi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const a = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties")))
      return;
    const t = wi(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const e = this.properties, i = [...bi(e), ...vi(e)];
      for (const n of i)
        this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, n] of e)
          this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i)
        e.unshift(ne(n));
    } else
      t !== void 0 && e.push(ne(t));
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
    return fi(t, this.constructor.elementStyles), t;
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
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Ct).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Ct;
      this._$Em = n;
      const a = o.fromAttribute(e, r.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? jt)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i))))
        return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [n, r] of this._$Ep)
          this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [n, r] of i) {
          const { wrapped: o } = r, a = this[n];
          o !== !0 || this._$AL.has(n) || a === void 0 || this.C(n, void 0, r, a);
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
Q.elementStyles = [], Q.shadowRootOptions = { mode: "open" }, Q[ut("elementProperties")] = /* @__PURE__ */ new Map(), Q[ut("finalized")] = /* @__PURE__ */ new Map(), Si?.({ ReactiveElement: Q }), (G.reactiveElementVersions ?? (G.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, ae = (s) => s, Mt = pt.trustedTypes, le = Mt ? Mt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ne = "$lit$", U = `lit$${Math.random().toFixed(9).slice(2)}$`, He = "?" + U, $i = `<${He}>`, j = document, gt = () => j.createComment(""), mt = (s) => s === null || typeof s != "object" && typeof s != "function", Xt = Array.isArray, xi = (s) => Xt(s) || typeof s?.[Symbol.iterator] == "function", Ft = `[ 	
\f\r]`, at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ce = />/g, q = RegExp(`>|${Ft}(?:([^\\s"'>=/]+)(${Ft}*=${Ft}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ue = /"/g, Ue = /^(?:script|style|textarea|title)$/i, Ci = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), E = Ci(1), X = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), W = j.createTreeWalker(j, 129);
function Be(s, t) {
  if (!Xt(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(t) : t;
}
const Mi = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = at;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, c, d = -1, p = 0;
    for (; p < l.length && (o.lastIndex = p, c = o.exec(l), c !== null); )
      p = o.lastIndex, o === at ? c[1] === "!--" ? o = he : c[1] !== void 0 ? o = ce : c[2] !== void 0 ? (Ue.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = q) : c[3] !== void 0 && (o = q) : o === q ? c[0] === ">" ? (o = n ?? at, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? q : c[3] === '"' ? ue : de) : o === ue || o === de ? o = q : o === he || o === ce ? o = at : (o = q, n = void 0);
    const u = o === q && s[a + 1].startsWith("/>") ? " " : "";
    r += o === at ? l + $i : d >= 0 ? (i.push(h), l.slice(0, d) + Ne + l.slice(d) + U + u) : l + U + (d === -2 ? a : u);
  }
  return [Be(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class yt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, c] = Mi(t, e);
    if (this.el = yt.createElement(h, i), W.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = W.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(Ne)) {
              const p = c[o++], u = n.getAttribute(d).split(U), f = /([.?@])?(.*)/.exec(p);
              l.push({ type: 1, index: r, name: f[2], strings: u, ctor: f[1] === "." ? Ei : f[1] === "?" ? Ti : f[1] === "@" ? Pi : Tt }), n.removeAttribute(d);
            } else
              d.startsWith(U) && (l.push({ type: 6, index: r }), n.removeAttribute(d));
        if (Ue.test(n.tagName)) {
          const d = n.textContent.split(U), p = d.length - 1;
          if (p > 0) {
            n.textContent = Mt ? Mt.emptyScript : "";
            for (let u = 0; u < p; u++)
              n.append(d[u], gt()), W.nextNode(), l.push({ type: 2, index: ++r });
            n.append(d[p], gt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === He)
          l.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(U, d + 1)) !== -1; )
            l.push({ type: 7, index: r }), d += U.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = j.createElement("template");
    return i.innerHTML = t, i;
  }
}
function J(s, t, e = s, i) {
  if (t === X)
    return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = mt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = J(s, n._$AS(s, t.values), n, i)), t;
}
class Ai {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? j).importNode(e, !0);
    W.currentNode = n;
    let r = W.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new vt(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new ki(r, this, t)), this._$AV.push(h), l = i[++a];
      }
      o !== l?.index && (r = W.nextNode(), o++);
    }
    return W.currentNode = j, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class vt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = J(this, t, e), mt(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== X && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : xi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && mt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(j.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = yt.createElement(Be(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n)
      this._$AH.p(e);
    else {
      const r = new Ai(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = pe.get(t.strings);
    return e === void 0 && pe.set(t.strings, e = new yt(t)), e;
  }
  k(t) {
    Xt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t)
      n === e.length ? e.push(i = new vt(this.O(gt()), this.O(gt()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = ae(t).nextSibling;
      ae(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Tt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = $;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = J(this, t, e, 0), o = !mt(t) || t !== this._$AH && t !== X, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = J(this, a[i + l], e, l), h === X && (h = this._$AH[l]), o || (o = !mt(h) || h !== this._$AH[l]), h === $ ? t = $ : t !== $ && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ei extends Tt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Ti extends Tt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Pi extends Tt {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = J(this, t, e, 0) ?? $) === X)
      return;
    const i = this._$AH, n = t === $ && i !== $ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== $ && (i === $ || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ki {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    J(this, t);
  }
}
const Oi = pt.litHtmlPolyfillSupport;
Oi?.(yt, vt), (pt.litHtmlVersions ?? (pt.litHtmlVersions = [])).push("3.3.3");
const Ri = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new vt(t.insertBefore(gt(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis;
let N = class extends Q {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ri(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return X;
  }
};
N._$litElement$ = !0, N.finalized = !0, ft.litElementHydrateSupport?.({ LitElement: N });
const Li = ft.litElementPolyfillSupport;
Li?.({ LitElement: N });
(ft.litElementVersions ?? (ft.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Di = { attribute: !0, type: String, converter: Ct, reflect: !1, hasChanged: jt }, zi = (s = Di, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, s, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, s, a), a;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, s, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function it(s) {
  return (t, e) => typeof e == "object" ? zi(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function R(s) {
  return it({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fi = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ii = (s) => (...t) => ({ _$litDirective$: s, values: t });
let Ni = class {
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
const Ge = "important", Hi = " !" + Ge, K = Ii(class extends Ni {
  constructor(s) {
    if (super(s), s.type !== Fi.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((t, e) => {
      const i = s[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [t]) {
    const { style: e } = s.element;
    if (this.ft === void 0)
      return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft)
      t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const n = t[i];
      if (n != null) {
        this.ft.add(i);
        const r = typeof n == "string" && n.endsWith(Hi);
        i.includes("-") || r ? e.setProperty(i, r ? n.slice(0, -11) : n, r ? Ge : "") : e[i] = n;
      }
    }
    return X;
  }
});
function F(s) {
  let t = s.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function w(s, t = 1) {
  const e = Math.round(x(s[0], 0, 255)), i = Math.round(x(s[1], 0, 255)), n = Math.round(x(s[2], 0, 255));
  return t >= 1 ? `rgb(${e},${i},${n})` : `rgba(${e},${i},${n},${x(t, 0, 1).toFixed(3)})`;
}
function k(s, t, e) {
  return [v(s[0], t[0], e), v(s[1], t[1], e), v(s[2], t[2], e)];
}
function Pt(s) {
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}
function Ui(s, t) {
  const e = Pt(s);
  return k(s, [e, e, e], x(t, 0, 1));
}
function It(s, t) {
  return [x(s[0] * t, 0, 255), x(s[1] * t, 0, 255), x(s[2] * t, 0, 255)];
}
function Bi(s, t) {
  const e = Pt(s);
  return [
    x(e + (s[0] - e) * t, 0, 255),
    x(e + (s[1] - e) * t, 0, 255),
    x(e + (s[2] - e) * t, 0, 255)
  ];
}
function B(s, t) {
  const e = s[0] - t[0], i = s[1] - t[1], n = s[2] - t[2];
  return e * e + i * i + n * n;
}
const qe = bt`
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
`, Gi = 6;
class Ve {
  constructor(t) {
    this.options = t, this.element = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.dragging = !1, this.holdTimer = null, this.holdFired = !1, this.onPointerDown = (e) => {
      this.options.isDisabled?.() || !this.element || e.button !== 0 || (this.pointerId = e.pointerId, this.startX = e.clientX, this.startY = e.clientY, this.dragging = !1, this.holdFired = !1, this.element.addEventListener("pointermove", this.onPointerMove), this.element.addEventListener("pointerup", this.onPointerUp), this.element.addEventListener("pointercancel", this.onPointerUp), this.options.onHold && (this.holdTimer = window.setTimeout(() => {
        this.holdTimer = null, !this.dragging && (this.holdFired = !0, this.options.onHold?.());
      }, this.options.holdDelay ?? 500)));
    }, this.onPointerMove = (e) => {
      if (!(e.pointerId !== this.pointerId || !this.element)) {
        if (!this.dragging) {
          if ((this.options.axis === "x" ? Math.abs(e.clientX - this.startX) : Math.abs(e.clientY - this.startY)) < Gi)
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
function qi(s, t, e) {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function We(s, t) {
  qi(s, "hass-more-info", { entityId: t });
}
function Ye(s, t) {
  if (!(!s || !t))
    return s.states[t];
}
function D(s) {
  return !s || s.state === "unavailable" || s.state === "unknown";
}
function I(s, t) {
  const e = s?.attributes?.[t];
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string") {
    const i = Number.parseFloat(e);
    if (Number.isFinite(i))
      return i;
  }
  return null;
}
function Gt(s, t) {
  const e = s?.attributes?.[t];
  return typeof e == "string" ? e : null;
}
function je(s, t) {
  const e = s?.attributes?.[t];
  return Array.isArray(e) ? e.filter((i) => typeof i == "string") : [];
}
function Xe(s, t) {
  const e = Gt(s, "friendly_name");
  if (e)
    return e;
  const i = s?.entity_id ?? t ?? "";
  return (i.split(".")[1] ?? i).replace(/_/g, " ").replace(/\b\w/g, (r) => r.toUpperCase());
}
function fe(s, t) {
  const e = t < 1 ? 1 : 0, i = s.toFixed(e);
  return e > 0 && i.endsWith(".0") ? i.slice(0, -2) : i;
}
function At(s, t, e, i) {
  s?.callService?.(t, e, i);
}
function ge(s) {
  const t = Math.max(1e3, Math.min(4e4, s)) / 100;
  let e, i, n;
  t <= 66 ? (e = 255, i = 99.4708025861 * Math.log(t) - 161.1195681661) : (e = 329.698727446 * Math.pow(t - 60, -0.1332047592), i = 288.1221695283 * Math.pow(t - 60, -0.0755148492)), t >= 66 ? n = 255 : t <= 19 ? n = 0 : n = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const r = (o) => Math.max(0, Math.min(255, o));
  return [r(e), r(i), r(n)];
}
var Vi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, kt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Wi(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && Vi(t, e, n), n;
};
const tt = "aurora-climate", Yi = [86, 158, 232], Nt = [150, 176, 200], ji = [246, 152, 74], Xi = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, Ht = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan running",
  idle: "Idle",
  off: "Off",
  preheating: "Preheating"
};
class st extends N {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingTarget = null, this.drag = new Ve({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragMove(t, !0),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || D(this.entity) || !this.config.slider
    }), this.sendTimer = null, this.clearPendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-climate: you need to set an "entity"');
    if (!t.entity.startsWith("climate."))
      throw this.errorMessage = `"${t.entity}" is not a climate entity.`, new Error(`aurora-climate: "${t.entity}" is not a climate entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${tt}`,
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
    return { type: `custom:${tt}`, entity: e ?? "climate.example" };
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
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(D(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return Ye(this.hass, this.config?.entity);
  }
  get minTemp() {
    return I(this.entity, "min_temp") ?? 7;
  }
  get maxTemp() {
    return I(this.entity, "max_temp") ?? 35;
  }
  get step() {
    return I(this.entity, "target_temp_step") ?? 0.5;
  }
  get unit() {
    return Gt(this.entity, "temperature_unit") ?? this.hass?.config?.unit_system?.temperature ?? "°C";
  }
  get currentTemp() {
    return I(this.entity, "current_temperature");
  }
  get target() {
    return this.pendingTarget !== null ? this.pendingTarget : I(this.entity, "temperature");
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
    if (this.entity?.state === "off" || D(this.entity))
      return Nt;
    const t = this.targetFraction;
    return t < 0.5 ? k(Yi, Nt, t * 2) : k(Nt, ji, (t - 0.5) * 2);
  }
  get hvacModes() {
    return je(this.entity, "hvac_modes");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  roundToStep(t) {
    const e = this.step, i = Math.round(t / e) * e, n = e < 1 ? 1 : 0;
    return Number(x(i, this.minTemp, this.maxTemp).toFixed(n));
  }
  onDragMove(t, e = !1) {
    const i = this.roundToStep(v(this.minTemp, this.maxTemp, t));
    this.pendingTarget = i, e ? this.sendTarget(i, 0) : this.sendTarget(i, 400);
  }
  adjust(t) {
    if (!this.config || D(this.entity))
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
      this.sendTimer = null, At(this.hass, "climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: t
      }), this.clearPendingTimer !== null && window.clearTimeout(this.clearPendingTimer), this.clearPendingTimer = window.setTimeout(() => {
        this.pendingTarget = null, this.clearPendingTimer = null;
      }, 2e3);
    };
    e <= 0 ? i() : this.sendTimer = window.setTimeout(i, e);
  }
  setHvacMode(t) {
    this.config && At(this.hass, "climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: t
    });
  }
  openMoreInfo() {
    this.config && We(this, this.config.entity);
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
    if (D(t))
      return "Unavailable";
    const e = Gt(t, "hvac_action");
    return e && Ht[e] ? Ht[e] : Ht[t.state] ?? t.state.replace(/_/g, " ");
  }
  render() {
    if (this.errorMessage)
      return E`<div class="error">Aurora Climate: ${this.errorMessage}</div>`;
    if (!this.config)
      return $;
    const t = this.entity, e = D(t), i = this.accent, n = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.target, o = this.currentTemp, a = this.unit, l = this.hvacModes, h = K({
      "--aurora-climate-rgb": n
    });
    return E`
      <ha-card style=${h}>
        <div class="fill"></div>
        <div class="content">
          <div class="header">
            <button
              class="icon-button"
              type="button"
              aria-label="More information"
              style=${K({ color: w(i) })}
              @click=${this.openMoreInfo}
            >
              <ha-icon .icon=${this.config.icon ?? "mdi:thermostat"}></ha-icon>
            </button>
            <div class="labels">
              <div class="name">${this.config.name ?? Xe(t, this.config.entity)}</div>
              <div class="state">
                ${o !== null ? `Currently ${fe(o, 0.1)} ${a}` : "No sensor reading"}
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
              ${r !== null ? E`
                    <span class="number">${fe(r, this.step)}</span
                    ><span class="unit">${a}</span>
                  ` : E`<span class="number">--</span>`}
              <div class="current">
                ${r !== null ? `Target · ${this.minTemp}–${this.maxTemp} ${a}` : ""}
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
              style=${K({ width: `${(this.targetFraction * 100).toFixed(2)}%` })}
            ></div>
          </div>

          ${this.config.show_modes && l.length > 0 ? E`
                <div class="modes">
                  ${l.map(
      (c) => E`
                      <button
                        class="mode"
                        type="button"
                        aria-pressed=${String(t?.state === c)}
                        aria-label=${c.replace(/_/g, " ")}
                        title=${c.replace(/_/g, " ")}
                        ?disabled=${e}
                        @click=${() => this.setHvacMode(c)}
                      >
                        <ha-icon .icon=${Xi[c] ?? "mdi:tune"}></ha-icon>
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
st.styles = [
  qe,
  bt`
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
kt([
  it({ attribute: !1 })
], st.prototype, "hass", 2);
kt([
  R()
], st.prototype, "config", 2);
kt([
  R()
], st.prototype, "errorMessage", 2);
kt([
  R()
], st.prototype, "pendingTarget", 2);
customElements.get(tt) || customElements.define(tt, st);
var Qi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, Ot = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ki(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && Qi(t, e, n), n;
};
const et = "aurora-light", me = [255, 197, 122], ye = 1;
class nt extends N {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingBrightness = null, this.drag = new Ve({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragCommit(t),
      onTap: () => this.toggle(),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || D(this.entity)
    }), this.pendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-light: you need to set an "entity"');
    if (!t.entity.startsWith("light."))
      throw this.errorMessage = `"${t.entity}" is not a light entity.`, new Error(`aurora-light: "${t.entity}" is not a light entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${et}`,
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
    return { type: `custom:${et}`, entity: e ?? "light.example" };
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
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(D(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return Ye(this.hass, this.config?.entity);
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
    const t = I(this.entity, "brightness");
    return t === null ? 100 : x(Math.round(t / 255 * 100), 0, 100);
  }
  /** The light's real colour, or a warm white when it has none. */
  get lightColor() {
    if (!this.config?.use_light_color)
      return me;
    const t = this.entity?.attributes?.rgb_color;
    if (Array.isArray(t) && t.length >= 3) {
      const [n, r, o] = t;
      if ([n, r, o].every((a) => typeof a == "number" && Number.isFinite(a)))
        return [n, r, o];
    }
    const e = I(this.entity, "color_temp_kelvin");
    if (e !== null)
      return ge(e);
    const i = I(this.entity, "color_temp");
    return i !== null && i > 0 ? ge(1e6 / i) : me;
  }
  get supportsBrightness() {
    const t = je(this.entity, "supported_color_modes");
    return t.length === 0 ? I(this.entity, "brightness") !== null : !(t.length === 1 && t[0] === "onoff");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  onDragMove(t) {
    this.supportsBrightness && (this.pendingBrightness = x(
      Math.round(t * 100),
      ye,
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
    const e = x(Math.round(t * 100), ye, 100);
    this.pendingBrightness = e, At(this.hass, "light", "turn_on", {
      entity_id: this.config.entity,
      brightness_pct: e
    }), this.clearPendingTimer(), this.pendingTimer = window.setTimeout(() => {
      this.pendingBrightness = null, this.pendingTimer = null;
    }, 1500);
  }
  toggle() {
    !this.config || D(this.entity) || (At(this.hass, "light", "toggle", { entity_id: this.config.entity }), this.pendingBrightness = null, this.clearPendingTimer());
  }
  openMoreInfo() {
    this.config && We(this, this.config.entity);
  }
  clearPendingTimer() {
    this.pendingTimer !== null && (window.clearTimeout(this.pendingTimer), this.pendingTimer = null);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  stateText() {
    const t = this.entity;
    return t ? D(t) ? "Unavailable" : this.isOn ? this.supportsBrightness ? `${this.brightnessPercent}%` : "On" : "Off" : "Entity not found";
  }
  render() {
    if (this.errorMessage)
      return E`<div class="error">Aurora Light: ${this.errorMessage}</div>`;
    if (!this.config)
      return $;
    const t = this.entity, e = !t, i = this.lightColor, n = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.brightnessPercent, o = this.isOn && !e, a = this.config.icon ?? (o ? "mdi:lightbulb" : "mdi:lightbulb-outline"), l = K({
      "--aurora-light-rgb": n,
      "--aurora-light-glow": o ? String(m(0.25 + r / 100 * 0.55)) : "0",
      "--aurora-icon-alpha": o ? "0.3" : "0.12",
      "--aurora-icon-color": o ? w(i) : "inherit"
    }), h = o && this.supportsBrightness && this.config.slider;
    return E`
      <ha-card style=${l}>
        <div class="glow"></div>
        ${h ? E`
              <div
                class="fill"
                style=${K({ transform: `scaleX(${(r / 100).toFixed(4)})` })}
              ></div>
              <div class="edge" style=${K({ left: `${r}%` })}></div>
            ` : $}
        <div class="content">
          <button
            class="icon-button"
            type="button"
            aria-label=${o ? "Turn off" : "Turn on"}
            @click=${this.onIconClick}
          >
            <ha-icon .icon=${a}></ha-icon>
          </button>
          <div class="labels">
            <div class="name">${this.config.name ?? Xe(t, this.config.entity)}</div>
            <div class="state">${this.stateText()}</div>
          </div>
          ${o && this.supportsBrightness ? E`<div class="value">${r}%</div>` : $}
        </div>
      </ha-card>
    `;
  }
  onIconClick(t) {
    t.stopPropagation(), this.toggle();
  }
}
nt.styles = [
  qe,
  bt`
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
Ot([
  it({ attribute: !1 })
], nt.prototype, "hass", 2);
Ot([
  R()
], nt.prototype, "config", 2);
Ot([
  R()
], nt.prototype, "errorMessage", 2);
Ot([
  R()
], nt.prototype, "pendingBrightness", 2);
customElements.get(et) || customElements.define(et, nt);
class Zi {
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
      const n = Math.min(i, 100) / 1e3;
      this.elapsed += n, this.callback(n, this.elapsed);
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
const Ji = ["low", "medium", "high", "ultra"];
function be(s) {
  return Ji.indexOf(s);
}
class ts {
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
    const n = [...this.frameTimes].sort((a, l) => a - l), r = n[Math.floor(n.length / 2)], o = 1e3 / this.targetFps;
    if (r > o * 0.55) {
      const a = te(this.level, -1);
      if (a !== this.level)
        return this.level = a, this.ceiling = a, this.frameTimes.length = 0, a;
    } else if (r < o * 0.18) {
      const a = te(this.level, 1);
      if (a !== this.level && be(a) <= be(this.ceiling))
        return this.level = a, this.frameTimes.length = 0, a;
    }
    return null;
  }
}
function H(s, t) {
  return {
    elevation: s,
    palette: {
      zenith: F(t.zenith),
      upper: F(t.upper),
      middle: F(t.middle),
      lower: F(t.lower),
      horizon: F(t.horizon),
      sunCore: F(t.sunCore),
      sunGlow: F(t.sunGlow),
      ambient: F(t.ambient),
      cloud: F(t.cloud)
    }
  };
}
const V = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  H(-90, {
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
  H(-12, {
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
  H(-6, {
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
  H(-2, {
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
  H(3, {
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
  H(12, {
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
  H(35, {
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
  H(70, {
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
], Qt = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], es = [255, 118, 162], is = [255, 138, 56];
function ss(s, t, e) {
  const i = {};
  for (const n of Qt)
    i[n] = k(s[n], t[n], e);
  return i;
}
function ns(s) {
  if (s <= V[0].elevation)
    return { ...V[0].palette };
  const t = V[V.length - 1];
  if (s >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < V.length - 1; e++) {
    const i = V[e], n = V[e + 1];
    if (s >= i.elevation && s <= n.elevation) {
      const r = dt(i.elevation, n.elevation, s);
      return ss(i.palette, n.palette, r);
    }
  }
  return { ...t.palette };
}
function Qe(s) {
  const t = dt(-4, 8, s), e = 1 - dt(-14, -2, s), i = dt(-16, -3, s) * (1 - dt(0, 10, s));
  return { dayFactor: t, nightFactor: e, twilightFactor: i };
}
const rs = {
  zenith: 0.15,
  upper: 0.3,
  middle: 0.55,
  lower: 0.85,
  horizon: 1,
  sunCore: 0.2,
  sunGlow: 0.6,
  ambient: 0.8,
  cloud: 0.5
}, os = 0.1;
function Ut(s) {
  const { elevation: t, rising: e, weather: i, appearance: n, season: r } = s, o = ns(t), { twilightFactor: a, dayFactor: l } = Qe(t), h = e ? es : is, c = a * 0.3, d = {}, p = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, u = m(i.desaturation) * 0.8, f = 1 - m(i.skyDarkness) * 0.75, g = r ? os * (0.35 + 0.65 * l) : 0, b = r ? r.saturation : 1;
  for (const y of Qt) {
    let S = k(o[y], h, c * p[y]);
    r && g > 0 && (S = k(S, r.tint, g * rs[y])), S = Ui(S, u), S = It(S, f), S = Bi(S, n.saturation * b), S = It(S, n.brightness), d[y] = S;
  }
  return d.cloud = It(d.cloud, v(1, 0.32, m(i.cloudDarkness))), d;
}
function as(s, t, e, i) {
  const n = e <= 0 ? 1 : 1 - Math.pow(2, -i / e), r = {};
  for (const o of Qt)
    r[o] = k(s[o], t[o], n);
  return r;
}
const ve = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: 3 * Math.PI / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1 }
}, we = ["summer", "autumn", "winter", "spring"];
function ls(s) {
  const t = new Date(s.getFullYear(), 0, 0);
  return Math.floor((s.getTime() - t.getTime()) / 864e5);
}
function _e(s, t) {
  const e = (ls(s) - 172) / 365.25 * P, i = t < 0 ? e + Math.PI : e;
  let n = 0;
  const r = { summer: 0, autumn: 0, winter: 0, spring: 0 };
  for (const u of we) {
    const f = Math.max(0, Math.cos(i - ve[u].centre)), g = f * f;
    r[u] = g, n += g;
  }
  n <= 0 && (n = 1);
  let o = 0, a = 0, l = 0, h = 0, c = 0, d = "summer", p = -1;
  for (const u of we) {
    const f = r[u] / n, g = ve[u];
    o += g.tint[0] * f, a += g.tint[1] * f, l += g.tint[2] * f, h += g.haze * f, c += g.saturation * f, f > p && (p = f, d = u);
  }
  return {
    name: d,
    /** −1 at midwinter, +1 at midsummer. */
    warmth: Math.cos(i),
    tint: [o, a, l],
    haze: m(h),
    saturation: c
  };
}
function hs(s) {
  return s.getTime() / 864e5 - 10957.5;
}
function cs(s, t, e) {
  const i = hs(s), n = z(357.5291 + 0.98560028 * i), r = z(280.459 + 0.98564736 * i) + z(1.9148) * Math.sin(n) + z(0.02) * Math.sin(2 * n), o = z(23.4393 - 3563e-10 * i), a = Math.asin(Math.sin(o) * Math.sin(r)), l = Math.atan2(
    Math.cos(o) * Math.sin(r),
    Math.cos(r)
  ), c = z(280.16 + 360.9856235 * i) + z(e) - l, d = z(t), p = Math.sin(d) * Math.sin(a) + Math.cos(d) * Math.cos(a) * Math.cos(c), u = Math.asin(Math.max(-1, Math.min(1, p))), f = Math.atan2(
    Math.sin(c),
    Math.cos(c) * Math.sin(d) - Math.tan(a) * Math.cos(d)
  ), g = c + z(360.9856235 * (10 / 1440)), b = Math.sin(d) * Math.sin(a) + Math.cos(d) * Math.cos(a) * Math.cos(g);
  return {
    elevation: Jt(u),
    azimuth: Et(Jt(f) + 180, 360),
    rising: b > p
  };
}
function ds(s) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, i = s.getTime() / 864e5 - e;
  return Et(i / t, 1);
}
function us(s, t, e) {
  const r = (s.getHours() + s.getMinutes() / 60 + s.getSeconds() / 3600 - 12) / 24 * P - e * P, o = 70 - Math.min(55, Math.abs(t) * 0.55), a = Math.cos(r) * o, l = (Math.sin(r) + 1) / 2;
  return { altitude: a, azimuthFraction: l };
}
const ps = [
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
], fs = {
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
function gs(s) {
  if (!s)
    return "unknown";
  const t = s.toLowerCase().trim();
  return ps.includes(t) ? t : fs[t] ?? "unknown";
}
const ms = {
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
}, ys = {
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
function Ke(s) {
  return { condition: s, ...ms, ...ys[s] };
}
const bs = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function _t(s) {
  if (typeof s == "number" && Number.isFinite(s))
    return s;
  if (typeof s == "string") {
    const t = Number.parseFloat(s);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function qt(s) {
  if (s) {
    for (const t of Object.keys(s.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function Se(s, t, e = /* @__PURE__ */ new Date()) {
  const i = s?.config?.latitude ?? 51.2, n = s?.config?.longitude ?? 6.8;
  let r = null, o = null, a = null, l = "computed";
  const h = t.sun_entity, c = h ? s?.states?.[h] : void 0;
  if (c) {
    const y = _t(c.attributes.elevation), S = _t(c.attributes.azimuth);
    y !== null && (r = y, o = S, a = typeof c.attributes.rising == "boolean" ? c.attributes.rising : null, l = "sun.sun");
  }
  if (r === null || o === null || a === null) {
    const y = cs(e, i, n);
    r === null && (r = y.elevation), o === null && (o = y.azimuth), a === null && (a = y.rising), l !== "sun.sun" && (l = "computed");
  }
  const d = t.weather_entity ?? qt(s), p = d ? s?.states?.[d] : void 0;
  let u = "unknown", f = null, g = null, b = !1;
  if (p && p.state !== "unavailable" && p.state !== "unknown") {
    u = gs(p.state), b = !0;
    const y = _t(p.attributes.cloud_coverage);
    y !== null && (f = m(y / 100));
    const S = _t(p.attributes.wind_speed);
    if (S !== null) {
      const C = String(
        p.attributes.wind_speed_unit ?? s?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), L = S * (bs[C] ?? 1);
      g = m(L / 70);
    }
  } else
    d || (u = r > -6 ? "sunny" : "clear-night");
  return u === "sunny" && r < -4 && (u = "clear-night"), u === "clear-night" && r > 2 && (u = "sunny"), {
    condition: u,
    cloudCoverage: f,
    wind: g,
    sunElevation: r,
    sunAzimuth: o,
    sunRising: a,
    latitude: i,
    longitude: n,
    sunSource: l,
    weatherEntity: d ?? null,
    weatherAvailable: b
  };
}
function vs(s) {
  const t = Ke(s.condition);
  return s.cloudCoverage !== null && (t.cloudCover = v(t.cloudCover, s.cloudCoverage, 0.65), t.sunVisibility = Math.min(t.sunVisibility, 1 - s.cloudCoverage * 0.85)), s.wind !== null && (t.wind = v(t.wind, s.wind, 0.7)), t;
}
const ws = [
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
class _s {
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
    for (const i of ws)
      this.current[i] = $t(this.current[i], this.target[i], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
class Ss {
  constructor() {
    this.name = "sky", this.gradient = null, this.cacheKey = "";
  }
  setup() {
    this.gradient = null, this.cacheKey = "";
  }
  resize() {
    this.gradient = null, this.cacheKey = "";
  }
  render(t, e) {
    const { palette: i, width: n, height: r } = e, o = [
      Math.round(r),
      i.zenith.join(),
      i.upper.join(),
      i.middle.join(),
      i.lower.join(),
      i.horizon.join()
    ].join("|");
    if (!this.gradient || o !== this.cacheKey) {
      const h = t.createLinearGradient(0, 0, 0, r);
      h.addColorStop(0, w(i.zenith)), h.addColorStop(0.28, w(i.upper)), h.addColorStop(0.55, w(i.middle)), h.addColorStop(0.82, w(i.lower)), h.addColorStop(1, w(i.horizon)), this.gradient = h, this.cacheKey = o;
    }
    t.fillStyle = this.gradient, t.fillRect(0, 0, n, r);
    const a = t.createLinearGradient(0, 0, 0, r * 0.45), l = m(0.12 + e.weather.skyDarkness * 0.2);
    a.addColorStop(0, `rgba(0,0,0,${l.toFixed(3)})`), a.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = a, t.fillRect(0, 0, n, r * 0.45);
  }
  destroy() {
    this.gradient = null;
  }
}
const $s = 6221137;
class xs {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = Y($s), i = t.quality.starCount;
    this.stars = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = Math.pow(e(), 1.6) * 0.82;
      this.stars[n] = {
        nx: e(),
        ny: r,
        radius: _(e, 0.4, 1.5),
        baseAlpha: _(e, 0.35, 1),
        twinkleSpeed: _(e, 0.4, 2.2),
        twinklePhase: e() * P,
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
    const { width: n, height: r } = e, o = !e.reducedMotion, a = e.parallaxX * 0.15, l = e.parallaxY * 0.15;
    t.save();
    for (let h = 0; h < this.stars.length; h++) {
      const c = this.stars[h], d = c.nx * n + a, p = c.ny * r + l;
      let u = c.baseAlpha * i;
      if (o) {
        const y = Math.sin(e.time * c.twinkleSpeed + c.twinklePhase);
        u *= 0.62 + 0.38 * y;
      }
      if (u <= 0.02)
        continue;
      const f = 255, g = 245 + Math.round(c.tint * 8), b = 225 + Math.round((1 - c.tint) * 30);
      t.fillStyle = `rgba(${f},${g},${b},${u.toFixed(3)})`, c.radius <= 0.7 ? t.fillRect(d, p, 1, 1) : (t.beginPath(), t.arc(d, p, c.radius, 0, P), t.fill());
    }
    t.restore(), e.effects.shooting_stars && e.quality.shootingStars && !e.reducedMotion && this.updateShootingStars(t, e, i);
  }
  updateShootingStars(t, e, i) {
    const { width: n, height: r, dt: o } = e;
    if (this.nextShootingStar -= o, this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const a = 380 + Math.random() * 320, l = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * n * 0.8,
        y: Math.random() * r * 0.35,
        vx: Math.cos(l) * a,
        vy: Math.sin(l) * a,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.5,
        length: 60 + Math.random() * 90
      });
    }
    for (let a = this.shooting.length - 1; a >= 0; a--) {
      const l = this.shooting[a];
      if (l.life += o, l.life >= l.maxLife) {
        this.shooting.splice(a, 1);
        continue;
      }
      l.x += l.vx * o, l.y += l.vy * o;
      const h = l.life / l.maxLife, c = Math.sin(h * Math.PI) * i, d = l.vx === 0 && l.vy === 0 ? 0 : l.vx, p = Math.hypot(d, l.vy) || 1, u = l.x - d / p * l.length, f = l.y - l.vy / p * l.length, g = t.createLinearGradient(l.x, l.y, u, f);
      g.addColorStop(0, `rgba(255,255,255,${c.toFixed(3)})`), g.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = g, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(u, f), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class Cs {
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
    const n = Math.min(e.width, e.height), r = Math.max(12, n * 0.035), o = Math.ceil(r * 2 + 4), a = this.ensureBuffer(o);
    if (!a || !this.buffer)
      return;
    const l = Math.round(e.moonPhase * 200) / 200;
    l !== this.drawnPhase && (this.drawMoon(a, o, r, l), this.drawnPhase = l);
    const h = e.moonX * e.width + e.parallaxX * 0.12, c = e.moonY * e.height + e.parallaxY * 0.12;
    t.save(), t.globalCompositeOperation = "lighter";
    const d = r * 5, p = 0.14 * i * e.appearance.ambient_glow, u = t.createRadialGradient(h, c, r * 0.6, h, c, d);
    u.addColorStop(0, `rgba(200,220,255,${p.toFixed(3)})`), u.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = u, t.beginPath(), t.arc(h, c, d, 0, P), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = i, t.drawImage(this.buffer, h - o / 2, c - o / 2), t.restore();
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
  drawMoon(t, e, i, n) {
    const r = e / 2, o = e / 2;
    t.clearRect(0, 0, e, e);
    const a = t.createRadialGradient(
      r - i * 0.25,
      o - i * 0.25,
      i * 0.1,
      r,
      o,
      i
    );
    a.addColorStop(0, "#fffdf3"), a.addColorStop(0.75, "#eceadd"), a.addColorStop(1, "#cfd3cc"), t.fillStyle = a, t.beginPath(), t.arc(r, o, i, 0, P), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const l = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, p, u] of l)
      t.beginPath(), t.arc(r + d * i, o + p * i, u * i, 0, P), t.fill();
    const h = (1 - Math.cos(n * P)) / 2;
    if (h < 0.99) {
      const p = n < 0.5, u = Math.abs(1 - h * 2) * i;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(r, o, i + 1, -Math.PI / 2, Math.PI / 2, p);
      const f = p ? h < 0.5 : h >= 0.5;
      t.ellipse(
        r,
        o,
        u,
        i + 1,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        f
      ), t.closePath(), t.fill(), t.restore();
    }
    t.save(), t.globalCompositeOperation = "destination-in";
    const c = t.createRadialGradient(r, o, i * 0.88, r, o, i);
    c.addColorStop(0, "rgba(0,0,0,1)"), c.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = c, t.fillRect(0, 0, e, e), t.restore();
  }
  destroy() {
    this.buffer = null, this.bufferCtx = null, this.bufferSize = 0;
  }
}
class Ms {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: i, width: n, height: r, appearance: o } = e, a = m(e.dayFactor * 0.35 + e.twilightFactor) * o.ambient_glow * v(0.45, 1, m(e.weather.sunVisibility));
    if (a > 0.01) {
      const g = m(e.sunX) * n, b = r * v(1.02, 0.55, m(e.dayFactor)), y = Math.max(n, r) * v(0.55, 0.95, e.twilightFactor), S = t.createRadialGradient(g, b, 0, g, b, y);
      S.addColorStop(0, w(i.sunGlow, 0.5 * a)), S.addColorStop(0.35, w(i.sunGlow, 0.22 * a)), S.addColorStop(1, w(i.sunGlow, 0)), t.fillStyle = S, t.fillRect(0, 0, n, r);
    }
    const l = m((e.sunElevation + 1.5) / 4) * m(e.weather.sunVisibility);
    if (l <= 0.02)
      return;
    const h = e.sunX * n + e.parallaxX * 0.12, c = e.sunY * r + e.parallaxY * 0.12, d = Math.min(n, r), p = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const u = e.quality.sunGlowPasses;
    for (let g = u; g >= 1; g--) {
      const b = g / u, y = p * (2.2 + b * 9), S = 0.1 * l * o.ambient_glow * (1 - b * 0.55), C = t.createRadialGradient(h, c, p * 0.4, h, c, y);
      C.addColorStop(0, w(i.sunGlow, S)), C.addColorStop(1, w(i.sunGlow, 0)), t.fillStyle = C, t.beginPath(), t.arc(h, c, y, 0, P), t.fill();
    }
    const f = t.createRadialGradient(h, c, 0, h, c, p);
    f.addColorStop(0, w(i.sunCore, l)), f.addColorStop(0.7, w(i.sunCore, 0.85 * l)), f.addColorStop(1, w(i.sunGlow, 0)), t.fillStyle = f, t.beginPath(), t.arc(h, c, p, 0, P), t.fill(), t.restore();
  }
  destroy() {
  }
}
const As = 790741, Es = 6 * 6 * 3, Ts = [
  { style: "cumulus", aspect: 1.82, heightScale: 1 },
  { style: "cumulus", aspect: 1.82, heightScale: 1 },
  { style: "cumulus", aspect: 1.82, heightScale: 1 },
  { style: "stratus", aspect: 3.55, heightScale: 0.6 },
  { style: "stratus", aspect: 3.55, heightScale: 0.6 },
  { style: "stratus", aspect: 3.55, heightScale: 0.6 }
], Ps = 3.55;
class ks {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.clouds = [];
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: i, cloudLayers: n } = t.quality, r = Y(As);
    this.base = Ts.map(({ style: o, aspect: a, heightScale: l }) => {
      const h = Math.round(e * 0.55), c = Math.round(h * a);
      return {
        canvas: Os(c, h, r, o),
        aspect: a,
        heightScale: l
      };
    }), this.tinted = [], this.tintValid = !1, this.clouds = new Array(i);
    for (let o = 0; o < i; o++) {
      const a = o % n, l = n <= 1 ? 1 : a / (n - 1), h = l < 0.45 ? 3 : 0;
      this.clouds[o] = {
        variant: h + Math.floor(r() * 3),
        nx: r(),
        ny: _(r, -0.04, 0.46) - l * 0.06,
        scale: _(r, 0.82, 1.22),
        layer: l,
        alpha: _(r, 0.6, 1),
        bobPhase: r() * Math.PI * 2,
        bobAmount: _(r, 4e-3, 0.014)
      };
    }
    this.clouds.sort((o, a) => o.layer - a.layer);
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
    const { width: n, height: r, dt: o } = e, a = Math.max(r, n * 0.42), l = a * 0.42 * Ps * 1.22, h = n + l * 2.2, c = i * this.clouds.length, d = Math.floor(c), p = c - d, u = v(0.25, 2.6, m(e.weather.wind)), f = e.reducedMotion ? 0.08 : 1, g = m((i - 0.55) / 0.45) * v(0.35, 0.85, m(e.weather.cloudDarkness));
    if (g > 0.01) {
      const b = t.createLinearGradient(0, 0, 0, r);
      b.addColorStop(0, w(e.palette.cloud, g * 0.55)), b.addColorStop(0.55, w(e.palette.cloud, g * 0.4)), b.addColorStop(1, w(e.palette.cloud, g * 0.18)), t.fillStyle = b, t.fillRect(0, 0, n, r);
    }
    t.save();
    for (let b = 0; b < this.clouds.length; b++) {
      const y = this.clouds[b], S = n * v(6e-3, 0.028, y.layer) * u * f;
      if (y.nx = Et(y.nx + S * o / h, 1), b > d)
        continue;
      const C = b === d ? p : 1;
      if (C <= 0.01)
        continue;
      const L = this.tinted[y.variant], Kt = a * v(0.13, 0.42, y.layer) * y.scale * L.heightScale, Zt = Kt * L.aspect, Dt = y.nx * h - l * 1.1 + e.parallaxX * v(0.3, 1, y.layer), ii = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + y.bobPhase) * y.bobAmount * r, si = v(0.3, 1, y.layer), ni = y.ny * r + ii + e.parallaxY * si;
      if (Dt + Zt < 0 || Dt > n)
        continue;
      const ri = y.alpha * C * v(0.42, 0.92, i) * v(0.75, 1, y.layer) * v(1, 1.15, m(e.weather.cloudDarkness));
      t.globalAlpha = m(ri), t.drawImage(L.canvas, Dt, ni, Zt, Kt);
    }
    t.restore();
  }
  ensureTint(t) {
    this.tintValid && B(t, this.tintColor) < Es || (this.tinted = this.base.map((e) => ({
      canvas: Rs(e.canvas, t),
      aspect: e.aspect,
      heightScale: e.heightScale
    })), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
function Os(s, t, e, i) {
  const n = document.createElement("canvas");
  n.width = s, n.height = t;
  const r = n.getContext("2d");
  if (!r)
    return n;
  const o = i === "cumulus", a = t * (o ? 0.68 : 0.6), l = o ? 12 + Math.floor(e() * 8) : 22 + Math.floor(e() * 12), h = o ? 0.5 : 0.24, c = o ? 0.16 : 0.1, d = o ? 0.3 : 0.19;
  for (let f = 0; f < l; f++) {
    const g = s * _(e, 0.1, 0.9), b = 1 - Math.abs(g / s - 0.5) * (o ? 1.5 : 1.15);
    if (b <= 0.05)
      continue;
    const y = a - Math.pow(e(), 1.5) * t * h, S = t * _(e, c, d) * Math.max(0.35, b), C = Math.round(v(150, 255, m(1 - y / t + 0.12))), L = r.createRadialGradient(g, y, S * 0.05, g, y, S);
    L.addColorStop(0, `rgba(${C},${C},${C},0.85)`), L.addColorStop(0.55, `rgba(${C},${C},${C},0.38)`), L.addColorStop(1, `rgba(${C},${C},${C},0)`), r.fillStyle = L, r.beginPath(), r.ellipse(g, y, S * (o ? 1.35 : 1.9), S, 0, 0, Math.PI * 2), r.fill();
  }
  r.globalCompositeOperation = "destination-in";
  const p = r.createLinearGradient(0, 0, 0, t);
  p.addColorStop(0, "rgba(0,0,0,1)"), p.addColorStop(a / t, "rgba(0,0,0,1)"), p.addColorStop(Math.min(1, a / t + 0.18), "rgba(0,0,0,0)"), p.addColorStop(1, "rgba(0,0,0,0)"), r.fillStyle = p, r.fillRect(0, 0, s, t);
  const u = r.createLinearGradient(0, 0, s, 0);
  return u.addColorStop(0, "rgba(0,0,0,0)"), u.addColorStop(o ? 0.12 : 0.08, "rgba(0,0,0,1)"), u.addColorStop(o ? 0.88 : 0.92, "rgba(0,0,0,1)"), u.addColorStop(1, "rgba(0,0,0,0)"), r.fillStyle = u, r.fillRect(0, 0, s, t), r.globalCompositeOperation = "source-over", n;
}
function Rs(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = w(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
const Ls = 3846, $e = 3, xe = 512, Ce = 128, Ds = 6 * 6 * 3;
class zs {
  constructor() {
    this.name = "fog", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.bands = [];
  }
  setup(t) {
    const e = Y(Ls);
    this.base = [];
    for (let n = 0; n < $e; n++)
      this.base.push(Fs(xe, Ce, e));
    this.tinted = [], this.tintValid = !1;
    const i = t.quality.fogLayers;
    this.bands = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = i <= 1 ? 1 : n / (i - 1);
      this.bands[n] = {
        variant: n % $e,
        nx: e(),
        ny: v(0.5, 1.02, r) + _(e, -0.05, 0.05),
        thickness: v(0.18, 0.42, r) * _(e, 0.85, 1.2),
        speed: v(4e-3, 0.016, r) * _(e, 0.7, 1.4),
        alpha: v(0.5, 1, r) * _(e, 0.8, 1.1),
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
    const n = e.palette.ambient;
    if (this.ensureTint(n), this.tinted.length === 0)
      return;
    const { width: r, height: o, dt: a } = e, l = e.reducedMotion ? 0.1 : 1;
    t.save();
    for (const d of this.bands) {
      d.nx = Et(d.nx + d.speed * l * a, 1);
      const p = this.tinted[d.variant], u = d.thickness * o, f = Math.max(r * 1.6, u * (xe / Ce)), g = e.reducedMotion ? 0 : Math.sin(e.time * 0.07 + d.bobPhase) * o * 0.012, b = d.ny * o - u / 2 + g + e.parallaxY * 1.4, y = -d.nx * f + e.parallaxX * 1.4;
      t.globalAlpha = m(d.alpha * i * 0.55), t.drawImage(p, y, b, f, u), t.drawImage(p, y + f, b, f, u);
    }
    t.restore();
    const h = o * 0.55, c = t.createLinearGradient(0, h, 0, o);
    c.addColorStop(0, w(n, 0)), c.addColorStop(1, w(n, 0.32 * i)), t.fillStyle = c, t.fillRect(0, h, r, o - h);
  }
  ensureTint(t) {
    this.tintValid && B(t, this.tintColor) < Ds || (this.tinted = this.base.map((e) => Is(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.bands = [], this.tintValid = !1;
  }
}
function Fs(s, t, e) {
  const i = document.createElement("canvas");
  i.width = s, i.height = t;
  const n = i.getContext("2d");
  if (!n)
    return i;
  const r = 14 + Math.floor(e() * 8);
  for (let a = 0; a < r; a++) {
    const l = e() * s, h = t * _(e, 0.3, 0.7), c = s * _(e, 0.08, 0.22), d = t * _(e, 0.3, 0.6), p = _(e, 0.1, 0.28), u = [0];
    l < c ? u.push(s) : l > s - c && u.push(-s);
    for (const f of u) {
      const g = l + f, b = n.createRadialGradient(g, h, 0, g, h, Math.max(c, d));
      b.addColorStop(0, `rgba(255,255,255,${p.toFixed(3)})`), b.addColorStop(0.6, `rgba(255,255,255,${(p * 0.4).toFixed(3)})`), b.addColorStop(1, "rgba(255,255,255,0)"), n.fillStyle = b, n.beginPath(), n.ellipse(g, h, c, d, 0, 0, Math.PI * 2), n.fill();
    }
  }
  n.globalCompositeOperation = "destination-in";
  const o = n.createLinearGradient(0, 0, 0, t);
  return o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(0.35, "rgba(0,0,0,1)"), o.addColorStop(0.7, "rgba(0,0,0,1)"), o.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = o, n.fillRect(0, 0, s, t), n.globalCompositeOperation = "source-over", i;
}
function Is(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = w(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
const Ns = 10783, lt = 3;
class Hs {
  constructor() {
    this.name = "rain", this.drops = [], this.active = 0;
  }
  setup(t) {
    const e = Y(Ns), i = t.quality.rainParticles;
    this.drops = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = n % lt, o = r / (lt - 1);
      this.drops[n] = {
        nx: e(),
        ny: e(),
        speed: v(0.75, 1.7, o) * _(e, 0.85, 1.15),
        length: v(0.02, 0.058, o) * _(e, 0.8, 1.3),
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
    const { width: n, height: r, dt: o } = e, a = Math.round(this.drops.length * i);
    this.active = a;
    const l = v(0.06, 0.5, m(e.weather.wind)) * (e.reducedMotion ? 0.3 : 1), h = e.reducedMotion ? 0.25 : 1, c = k(e.palette.ambient, [225, 238, 255], 0.62);
    for (let d = 0; d < lt; d++) {
      const p = d / (lt - 1);
      t.strokeStyle = w(c, v(0.11, 0.3, p) * i), t.lineWidth = v(0.7, 1.4, p), t.lineCap = "round", t.beginPath();
      for (let u = d; u < a; u += lt) {
        const f = this.drops[u];
        f.ny += f.speed * h * o, f.nx += f.speed * l * h * o * (r / Math.max(1, n)), f.ny > 1.05 && (f.ny -= 1.1, f.nx = Math.random()), f.nx > 1.05 ? f.nx -= 1.1 : f.nx < -0.05 && (f.nx += 1.1);
        const g = f.nx * n, b = f.ny * r, y = f.length * r;
        t.moveTo(g, b), t.lineTo(g - y * l, b - y);
      }
      t.stroke();
    }
    this.renderGroundMist(t, e, i);
  }
  /** Spray hanging over the bottom edge – cheap, and it sells heavy rain. */
  renderGroundMist(t, e, i) {
    if (i < 0.35)
      return;
    const { width: n, height: r } = e, o = r * 0.82, a = (i - 0.35) / 0.65, l = t.createLinearGradient(0, o, 0, r);
    l.addColorStop(0, w(e.palette.ambient, 0)), l.addColorStop(1, w(e.palette.ambient, 0.3 * a)), t.fillStyle = l, t.fillRect(0, o, n, r - o);
  }
  destroy() {
    this.drops.length = 0, this.active = 0;
  }
}
const Us = 6230212, ht = 3;
class Bs {
  constructor() {
    this.name = "snow", this.flakes = [], this.active = 0;
  }
  setup(t) {
    const e = Y(Us), i = t.quality.snowParticles;
    this.flakes = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = n % ht, o = r / (ht - 1);
      this.flakes[n] = {
        nx: e(),
        ny: e(),
        speed: v(0.035, 0.14, o) * _(e, 0.8, 1.25),
        radius: v(16e-4, 5e-3, o) * _(e, 0.8, 1.3),
        driftAmplitude: _(e, 8e-3, 0.035) * v(0.6, 1.4, o),
        driftFrequency: _(e, 0.25, 0.8),
        driftPhase: e() * P,
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
    const { width: n, height: r, dt: o } = e, a = Math.min(n, r), l = Math.round(this.flakes.length * i);
    this.active = l;
    const h = e.reducedMotion ? 0.2 : 1, c = v(4e-3, 0.05, m(e.weather.wind)) * h, d = k(e.palette.ambient, [255, 255, 255], 0.85);
    for (let p = 0; p < ht; p++) {
      const u = p / (ht - 1);
      t.fillStyle = w(d, v(0.4, 0.85, u) * i), t.beginPath();
      for (let f = p; f < l; f += ht) {
        const g = this.flakes[f];
        g.ny += g.speed * h * o, g.nx += c * o, g.ny > 1.05 && (g.ny -= 1.1, g.nx = Math.random()), g.nx > 1.05 ? g.nx -= 1.1 : g.nx < -0.05 && (g.nx += 1.1);
        const b = e.reducedMotion ? 0 : Math.sin(e.time * g.driftFrequency + g.driftPhase) * g.driftAmplitude, y = (g.nx + b) * n, S = g.ny * r, C = g.radius * a;
        t.moveTo(y + C, S), t.arc(y, S, C, 0, P);
      }
      t.fill();
    }
  }
  destroy() {
    this.flakes.length = 0, this.active = 0;
  }
}
const Me = 45079;
class Gs {
  constructor() {
    this.name = "lightning", this.rng = Y(Me), this.strike = null, this.cooldown = 6;
  }
  setup() {
    this.rng = Y(Me), this.strike = null, this.cooldown = _(this.rng, 4, 12);
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
    const { dt: n, width: r, height: o } = e;
    if (!this.strike) {
      if (this.cooldown -= n * i, this.cooldown > 0)
        return;
      this.strike = this.createStrike(e), this.cooldown = v(26, 3, i) * _(this.rng, 0.7, 1.4);
    }
    const a = this.strike;
    if (a.elapsed += n, a.elapsed > a.total) {
      this.strike = null;
      return;
    }
    let l = 0;
    for (const u of a.flashes) {
      const f = a.elapsed - u.at;
      if (f < 0 || f > u.duration)
        continue;
      const g = f / u.duration, b = g < 0.18 ? g / 0.18 : Math.pow(1 - (g - 0.18) / 0.82, 2);
      l = Math.max(l, u.peak * b);
    }
    if (l <= 4e-3)
      return;
    const h = a.x * r, c = a.y * o, d = Math.max(r, o) * 1.15;
    t.save(), t.globalCompositeOperation = "lighter";
    const p = t.createRadialGradient(h, c, 0, h, c, d);
    p.addColorStop(0, `rgba(214,228,255,${(l * 0.85).toFixed(4)})`), p.addColorStop(0.45, `rgba(188,206,246,${(l * 0.35).toFixed(4)})`), p.addColorStop(1, "rgba(170,190,240,0)"), t.fillStyle = p, t.fillRect(0, 0, r, o), a.bolt && e.quality.lightningBolts && a.elapsed <= a.boltVisibleUntil && l > 0.05 && this.drawBolt(t, e, a, l), t.restore();
  }
  createStrike(t) {
    const e = this.rng, i = 2 + Math.floor(e() * 3), n = [];
    let r = 0;
    for (let d = 0; d < i; d++) {
      const p = _(e, 0.09, 0.22);
      n.push({
        at: r,
        duration: p,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: d === 0 ? _(e, 0.18, 0.3) : _(e, 0.06, 0.14)
      }), r += p + _(e, 0.04, 0.16);
    }
    const o = _(e, 0.12, 0.88), a = _(e, 0.05, 0.3), h = t.quality.lightningBolts && e() < 0.55 ? Ae(e, o, a, _(e, 0.55, 0.85)) : null, c = [];
    if (h) {
      const d = Math.floor(e() * 3);
      for (let p = 0; p < d; p++) {
        const u = h[1 + Math.floor(e() * (h.length - 2))];
        c.push(
          Ae(e, u.x, u.y, u.y + _(e, 0.08, 0.22), 0.45)
        );
      }
    }
    return {
      elapsed: 0,
      total: r + 0.3,
      flashes: n,
      x: o,
      y: a,
      bolt: h,
      branches: c,
      boltVisibleUntil: n[0].duration * 1.6
    };
  }
  drawBolt(t, e, i, n) {
    const { width: r, height: o } = e, a = m(n * 4), l = (c) => {
      t.beginPath(), t.moveTo(c[0].x * r, c[0].y * o);
      for (let d = 1; d < c.length; d++)
        t.lineTo(c[d].x * r, c[d].y * o);
      t.stroke();
    }, h = Math.min(r, o);
    t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = `rgba(150,180,255,${(a * 0.28).toFixed(4)})`, t.lineWidth = Math.max(4, h * 0.012), i.bolt && l(i.bolt), t.strokeStyle = `rgba(240,246,255,${(a * 0.9).toFixed(4)})`, t.lineWidth = Math.max(1.2, h * 22e-4), i.bolt && l(i.bolt), t.strokeStyle = `rgba(225,235,255,${(a * 0.55).toFixed(4)})`, t.lineWidth = Math.max(1, h * 15e-4);
    for (const c of i.branches)
      l(c);
  }
  destroy() {
    this.strike = null;
  }
}
function Ae(s, t, e, i, n = 1) {
  let r = [
    { x: t, y: e },
    { x: t + _(s, -0.06, 0.06) * n, y: i }
  ];
  for (let o = 0; o < 5; o++) {
    const a = [r[0]], l = 0.045 * n * Math.pow(0.62, o);
    for (let h = 1; h < r.length; h++) {
      const c = r[h - 1], d = r[h];
      a.push({
        x: (c.x + d.x) / 2 + _(s, -l, l),
        y: (c.y + d.y) / 2
      }), a.push(d);
    }
    r = a;
  }
  return r;
}
class qs {
  constructor(t, e, i) {
    this.sky = new Ss(), this.stars = new xs(), this.moon = new Cs(), this.sun = new Ms(), this.clouds = new ks(), this.fog = new zs(), this.rain = new Hs(), this.snow = new Bs(), this.lightning = new Gs(), this.reducedMotion = !1, this.parallaxTargetX = 0, this.parallaxTargetY = 0, this.parallaxX = 0, this.parallaxY = 0, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = i, this.renderers = [
      this.sky,
      this.stars,
      this.moon,
      this.sun,
      this.clouds,
      this.fog,
      this.rain,
      this.snow,
      this.lightning
    ], this.season = _e(/* @__PURE__ */ new Date(), i.latitude), this.blender = new _s(Ke(i.condition)), this.blender.snapTo(this.targetProfile()), this.elevation = i.sunElevation, this.azimuth = i.sunAzimuth, this.palette = Ut({
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
    this.snapshot = t, this.season = _e(/* @__PURE__ */ new Date(), t.latitude), this.state.season = this.season, this.blender.setTarget(this.targetProfile());
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
    const t = vs(this.snapshot);
    return this.config.effects.season && (t.fog = m(t.fog + this.season.haze * 0.5)), t;
  }
  resize(t, e, i) {
    if (this.state.width = t, this.state.height = e, this.state.pixelRatio = i, !this.initialised) {
      for (const n of this.renderers)
        n.setup(this.state);
      this.initialised = !0;
    }
    for (const n of this.renderers)
      n.resize(this.state);
  }
  /** Skip the smoothing – used on the very first frame. */
  snapToTargets() {
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.parallaxX = this.parallaxTargetX, this.parallaxY = this.parallaxTargetY, this.blender.snapTo(this.targetProfile()), this.palette = Ut({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
  }
  update(t, e) {
    const i = this.state;
    i.dt = t, i.time = e, this.elevation = $t(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = Vs(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const n = this.blender.update(t), r = Ut({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: n,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
    this.palette = as(this.palette, r, 0.6, t), this.config.effects.parallax && !this.reducedMotion ? (this.parallaxX = $t(this.parallaxX, this.parallaxTargetX, 0.25, t), this.parallaxY = $t(this.parallaxY, this.parallaxTargetY, 0.25, t)) : (this.parallaxX = 0, this.parallaxY = 0), i.parallaxX = this.parallaxX, i.parallaxY = this.parallaxY;
    const { dayFactor: o, nightFactor: a, twilightFactor: l } = Qe(this.elevation);
    i.sunElevation = this.elevation, i.sunAzimuth = this.azimuth, i.sunRising = this.snapshot.sunRising, i.dayFactor = o, i.nightFactor = a, i.twilightFactor = l, i.palette = this.palette, i.weather = n, i.sunX = m((this.azimuth - 60) / 240), i.sunY = this.elevation >= 0 ? 0.94 - Math.pow(m(this.elevation / 60), 0.7) * 0.84 : x(0.94 + -this.elevation / 20 * 0.18, 0.94, 1.2);
    const h = /* @__PURE__ */ new Date(), c = ds(h), d = us(h, this.snapshot.latitude, c);
    i.moonPhase = c, i.moonX = v(0.08, 0.92, m(d.azimuthFraction)), i.moonY = x(1.02 - m(d.altitude / 70) * 0.88, 0.08, 1.1), i.moonVisible = this.config.effects.moon && d.altitude > 2 && a > 0.08 && c > 0.03 && c < 0.97;
  }
  render(t) {
    const e = this.state, i = this.config.effects;
    this.sky.render(t, e), i.stars && this.stars.render(t, e), i.moon && this.moon.render(t, e), i.sun && this.sun.render(t, e), i.clouds && this.clouds.render(t, e), i.fog && this.fog.render(t, e), i.rain && this.rain.render(t, e), i.snow && this.snow.render(t, e), i.lightning && this.lightning.render(t, e);
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
function Vs(s, t, e, i) {
  let n = (t - s + 540) % 360 - 180;
  const r = e <= 0 ? 1 : 1 - Math.pow(2, -i / e);
  return n *= r, (s + n + 360) % 360;
}
const Ws = 400, St = 4 * 4 * 3, Ys = [
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
class js {
  constructor() {
    this.last = null, this.lastWrite = 0, this.active = !1;
  }
  /** True while properties are on the document. */
  get isActive() {
    return this.active;
  }
  update(t, e = !1) {
    const i = performance.now();
    if (!e && i - this.lastWrite < Ws)
      return;
    const n = {
      ambient: t.palette.ambient,
      sky: t.palette.middle,
      horizon: t.palette.horizon,
      accent: t.palette.sunGlow,
      glow: m(t.dayFactor * 0.6 + t.twilightFactor * 0.8),
      night: m(t.nightFactor)
    };
    if (!e && this.last && !this.changed(this.last, n)) {
      this.lastWrite = i;
      return;
    }
    this.lastWrite = i, this.last = n, this.active = !0;
    const r = document.documentElement.style, o = (h) => `${Math.round(h[0])}, ${Math.round(h[1])}, ${Math.round(h[2])}`;
    r.setProperty("--aurora-ambient-color", w(n.ambient)), r.setProperty("--aurora-ambient-rgb", o(n.ambient)), r.setProperty("--aurora-sky-color", w(n.sky)), r.setProperty("--aurora-horizon-color", w(n.horizon)), r.setProperty("--aurora-accent-color", w(n.accent)), r.setProperty("--aurora-accent-rgb", o(n.accent)), r.setProperty("--aurora-glow-strength", n.glow.toFixed(3)), r.setProperty("--aurora-night", n.night.toFixed(3)), r.setProperty("--aurora-day", (1 - n.night).toFixed(3));
    const a = Pt(n.sky) > 140;
    r.setProperty("--aurora-contrast-color", a ? "#10151f" : "#f2f6ff");
    const l = k(n.ambient, a ? [12, 16, 24] : [235, 243, 255], 0.72);
    r.setProperty("--aurora-card-tint", w(l, a ? 0.5 : 0.14)), r.setProperty(
      "--aurora-card-border",
      w(a ? [255, 255, 255] : [255, 255, 255], a ? 0.28 : 0.16)
    ), r.setProperty("--aurora-season", t.season.name), r.setProperty("--aurora-condition", t.weather.condition);
  }
  changed(t, e) {
    return B(t.ambient, e.ambient) > St || B(t.sky, e.sky) > St || B(t.horizon, e.horizon) > St || B(t.accent, e.accent) > St || Math.abs(t.glow - e.glow) > 0.02 || Math.abs(t.night - e.night) > 0.02;
  }
  /** Remove every property again – called when the last Aurora card unmounts. */
  clear() {
    if (!this.active)
      return;
    const t = document.documentElement.style;
    for (const e of Ys)
      t.removeProperty(e);
    this.active = !1, this.last = null;
  }
}
const Xs = 500, Ee = 5 * 5 * 3, Qs = [
  "--ha-card-background",
  "--card-background-color",
  "--ha-card-backdrop-filter",
  "--ha-card-border-color",
  "--ha-card-border-width",
  "--ha-card-box-shadow",
  "--ha-card-border-radius",
  "--aurora-glass-surface"
], Te = ["--primary-text-color", "--secondary-text-color"];
class Ks {
  constructor() {
    this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastWrite = 0, this.active = !1, this.textActive = !1;
  }
  update(t, e, i = !1) {
    if (!e.enabled) {
      this.clear();
      return;
    }
    const n = performance.now();
    if (!i && n - this.lastWrite < Xs)
      return;
    const r = Pt(t.palette.middle) > 145, o = k(
      t.palette.ambient,
      r ? [14, 18, 27] : [226, 236, 252],
      0.7
    ), a = t.palette.sunGlow, l = m(t.dayFactor * 0.5 + t.twilightFactor * 0.9 + t.nightFactor * 0.25) * e.glow;
    if (!i && this.lastSurface && this.lastAccent && B(this.lastSurface, o) < Ee && B(this.lastAccent, a) < Ee && Math.abs(this.lastGlow - l) < 0.03) {
      this.lastWrite = n;
      return;
    }
    this.lastWrite = n, this.lastSurface = o, this.lastAccent = a, this.lastGlow = l, this.active = !0;
    const h = document.documentElement.style, c = m(e.opacity * (r ? 1.15 : 1)), d = w(o, c);
    h.setProperty("--aurora-glass-surface", d), h.setProperty("--ha-card-background", d), h.setProperty("--card-background-color", d), h.setProperty(
      "--ha-card-backdrop-filter",
      e.blur > 0 ? `blur(${e.blur}px) saturate(${e.saturate})` : "none"
    ), e.border ? (h.setProperty("--ha-card-border-width", "1px"), h.setProperty(
      "--ha-card-border-color",
      w(r ? [255, 255, 255] : [255, 255, 255], r ? 0.3 : 0.16)
    )) : (h.setProperty("--ha-card-border-width", "0px"), h.setProperty("--ha-card-border-color", "transparent"));
    const p = `0 6px 24px rgba(0,0,0,${(0.18 + (r ? 0.06 : 0.14)).toFixed(3)})`, u = l > 0.01 ? `, 0 0 36px ${w(a, m(l * 0.16))}` : "";
    if (h.setProperty("--ha-card-box-shadow", p + u), e.radius >= 0 ? h.setProperty("--ha-card-border-radius", `${e.radius}px`) : h.removeProperty("--ha-card-border-radius"), e.adaptive_text) {
      const f = r ? [16, 21, 31] : [240, 245, 255];
      h.setProperty("--primary-text-color", w(f)), h.setProperty(
        "--secondary-text-color",
        w(k(f, o, 0.35), v(0.75, 0.85, m(l)))
      ), this.textActive = !0;
    } else if (this.textActive) {
      for (const f of Te)
        h.removeProperty(f);
      this.textActive = !1;
    }
  }
  /** Hand every managed property back to the user's theme. */
  clear() {
    if (!this.active && !this.textActive)
      return;
    const t = document.documentElement.style;
    for (const e of Qs)
      t.removeProperty(e);
    if (this.textActive) {
      for (const e of Te)
        t.removeProperty(e);
      this.textActive = !1;
    }
    this.active = !1, this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1;
  }
}
const Zs = (s) => `
  position: absolute;
  top: ${s}px;
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
class Pe {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", Zs(e)), t.appendChild(this.element);
  }
  update(t, e, i, n, r) {
    const o = performance.now();
    if (o - this.lastUpdate < 250)
      return;
    this.lastUpdate = o;
    const a = [
      `AURORA BACKGROUND  v${Vt}`,
      `fps          ${i.toFixed(0).padStart(3)}${r ? "  (paused)" : ""}`,
      `quality      ${t.quality.level}  ×${t.quality.renderScale} @dpr ${t.pixelRatio.toFixed(2)}`,
      `canvas       ${Math.round(t.width)}×${Math.round(t.height)}`,
      `particles    ${n}`,
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
    this.element.textContent = a.join(`
`);
  }
  destroy() {
    this.element.remove();
  }
}
const ke = 42e5, Js = 0.06, Oe = 0.012;
class Ze {
  /**
   * `exportsAmbient` is true only for the shared dashboard layer – two layers
   * writing `--aurora-*` on the document would fight each other.
   */
  constructor(t, e, i, n = !1) {
    this.host = t, this.debugOverlay = null, this.resizeObserver = null, this.intersectionObserver = null, this.motionQuery = null, this.cssWidth = 0, this.cssHeight = 0, this.pixelRatio = 1, this.resizePending = !1, this.visible = !0, this.documentVisible = !0, this.destroyed = !1, this.firstFrame = !0, this.environmentTimer = null, this.scrollOffset = 0, this.pointerX = 0, this.pointerY = 0, this.onMotionPreferenceChange = (o) => {
      this.scene.setReducedMotion(o.matches), this.applyFrameCap();
    }, this.onDocumentScroll = (o) => {
      const a = o.target, l = a instanceof Element ? a.scrollTop : document.scrollingElement?.scrollTop ?? window.scrollY;
      this.scrollOffset = Math.min(1, l / Math.max(1, this.cssHeight)), this.pushParallax();
    }, this.onPointerMove = (o) => {
      this.pointerX = x(o.clientX / Math.max(1, window.innerWidth) * 2 - 1, -1, 1), this.pointerY = x(o.clientY / Math.max(1, window.innerHeight) * 2 - 1, -1, 1), this.pushParallax();
    }, this.onVisibilityChange = () => {
      this.documentVisible = document.visibilityState !== "hidden", this.updateRunState();
    }, this.onIntersect = (o) => {
      for (const a of o)
        a.target === this.host && (this.visible = a.isIntersecting);
      this.updateRunState();
    }, this.onResize = () => {
      this.resizePending || this.destroyed || (this.resizePending = !0, requestAnimationFrame(() => {
        this.resizePending = !1, !this.destroyed && (this.measure(), this.engine.isRunning || this.renderOnce());
      }));
    }, this.refreshEnvironment = () => {
      this.destroyed || (this.scene.setEnvironment(Se(this.hass, this.config)), this.engine.isRunning || this.renderOnce());
    }, this.frame = (o, a) => {
      if (this.destroyed || !this.ctx)
        return;
      const l = performance.now();
      this.firstFrame && (this.scene.snapToTargets(), this.firstFrame = !1), this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.update(o, a), this.scene.render(this.ctx);
      const h = performance.now() - l, c = this.performance.sample(o, h);
      c && this.applyQuality(c), this.ambient && this.config.background.ambient_variables && this.ambient.update(this.scene.sceneState), this.glass?.update(this.scene.sceneState, this.config.glass), this.debugOverlay && this.debugOverlay.update(
        this.scene.sceneState,
        this.scene.environment,
        this.performance.fps,
        this.scene.particleCount(),
        !1
      );
    }, this.config = e, this.hass = i, this.ambient = n ? new js() : null, this.glass = n ? new Ks() : null, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1, desynchronized: !0 });
    const r = this.resolveQuality();
    this.performance = new ts(
      r,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, ot(r).maxFps)
    ), this.scene = new qs(
      e,
      ot(r),
      Se(i, e)
    ), this.engine = new Zi(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new Pe(this.host, this.debugTopOffset())), this.updateRunState();
  }
  /* ---------------------------------------------------------------- *
   * Public API
   * ---------------------------------------------------------------- */
  updateConfig(t) {
    if (this.destroyed)
      return;
    const e = t.quality !== this.config.quality, i = t.debug !== this.config.debug, n = t.appearance.blur !== this.config.appearance.blur, r = t.appearance.opacity !== this.config.appearance.opacity;
    if (this.config = t, this.scene.setConfig(t), e) {
      const o = this.resolveQuality();
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.performance.setQuality(o), this.applyQuality(o);
    } else
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.applyFrameCap();
    (n || r) && this.applyCanvasFilter(), i && (t.debug && !this.debugOverlay ? this.debugOverlay = new Pe(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.ambient && !t.background.ambient_variables && this.ambient.clear(), this.glass && !t.glass.enabled && this.glass.clear(), this.pushParallax(), this.refreshEnvironment(), this.updateRunState();
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
    return this.config.quality === "auto" ? ci() : this.config.quality;
  }
  applyQuality(t) {
    const e = ot(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = ot(this.performance.quality);
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
      this.pointerX * t * Oe,
      this.scrollOffset * t * Js + this.pointerY * t * Oe * 0.6
    );
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), i = Math.max(1, Math.round(t.height)), n = ot(this.performance.quality);
    let o = Math.min(window.devicePixelRatio || 1, n.maxDpr) * n.renderScale;
    const a = e * i * o * o;
    a > ke && (o *= Math.sqrt(ke / a));
    const l = Math.max(1, Math.round(e * o)), h = Math.max(1, Math.round(i * o)), c = this.canvas.width !== l || this.canvas.height !== h || this.cssWidth !== e || this.cssHeight !== i;
    this.cssWidth = e, this.cssHeight = i, this.pixelRatio = o, c && (this.canvas.width = l, this.canvas.height = h, this.scene.resize(e, i, o)), this.updateRunState();
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
const Re = "aurora-background-root", Le = "aurora-background-style";
class tn {
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
      document.getElementById(Re)?.remove();
      const e = document.createElement("div");
      e.id = Re, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new Ze(this.root, t, e?.hass, !0);
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
        `z-index:${t.background.z_index}`
      ].join(";")
    );
  }
  applyGlobalStyles(t) {
    if (!t.background.transparent_lovelace && !t.background.transparent_header) {
      const r = De(t);
      this.writeStyle(r ? `:root{${r}}` : "");
      return;
    }
    const e = [], i = [];
    t.background.transparent_lovelace && (i.push("--lovelace-background:transparent !important"), i.push("--view-background:transparent !important"), i.push("--ha-view-background:transparent !important"), e.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), t.background.transparent_header && (i.push("--app-header-background-color:transparent !important"), i.push("--header-height-background:transparent !important"));
    const n = De(t);
    n && i.push(n), i.length > 0 && e.unshift(`:root{${i.join(";")}}`), this.writeStyle(e.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(Le)?.remove();
      const e = document.createElement("style");
      e.id = Le, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function De(s) {
  const t = Object.entries(s.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, i]) => `${e}:${i} !important`).join(";");
}
const ct = new tn(), en = bt`
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
`, Je = bt`
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
var sn = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, ti = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? nn(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && sn(t, e, n), n;
};
const rn = {
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
function A(s) {
  return { name: s, selector: { boolean: {} } };
}
function O(s, t, e, i) {
  return { name: s, selector: { number: { min: t, max: e, step: i, mode: "slider" } } };
}
const on = [
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
  A("debug"),
  {
    name: "effects",
    type: "expandable",
    icon: "mdi:weather-partly-cloudy",
    schema: [
      {
        name: "",
        type: "grid",
        schema: [
          A("sun"),
          A("moon"),
          A("stars"),
          A("shooting_stars"),
          A("clouds"),
          A("fog"),
          A("rain"),
          A("snow"),
          A("lightning"),
          A("season"),
          A("parallax")
        ]
      }
    ]
  },
  {
    name: "appearance",
    type: "expandable",
    icon: "mdi:palette",
    schema: [
      O("intensity", 0, 2, 0.05),
      O("saturation", 0, 2, 0.05),
      O("brightness", 0.2, 2, 0.05),
      O("ambient_glow", 0, 2, 0.05),
      O("opacity", 0, 1, 0.05),
      O("blur", 0, 40, 1)
    ]
  },
  {
    name: "performance",
    type: "expandable",
    icon: "mdi:speedometer",
    schema: [
      O("max_fps", 10, 120, 1),
      A("auto_quality"),
      A("pause_when_hidden")
    ]
  },
  {
    name: "glass",
    type: "expandable",
    icon: "mdi:card-outline",
    schema: [
      A("enabled"),
      O("blur", 0, 40, 1),
      O("opacity", 0, 1, 0.05),
      O("saturate", 1, 3, 0.05),
      O("glow", 0, 2, 0.05),
      { name: "radius", selector: { number: { min: -1, max: 60, step: 1, mode: "box" } } },
      A("border"),
      A("adaptive_text")
    ]
  },
  {
    name: "background",
    type: "expandable",
    icon: "mdi:layers-outline",
    schema: [
      A("transparent_lovelace"),
      A("transparent_header"),
      A("ambient_variables"),
      { name: "z_index", selector: { number: { min: -10, max: 10, step: 1, mode: "box" } } }
    ]
  }
];
class Rt extends N {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => rn[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = Fe(this.config);
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
    return customElements.get("ha-form") ? E`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${on}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : E`
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
      type: this.config.type ?? `custom:${Z}`,
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
Rt.styles = Je;
ti([
  it({ attribute: !1 })
], Rt.prototype, "hass", 2);
ti([
  R()
], Rt.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", Rt);
var an = Object.defineProperty, ln = Object.getOwnPropertyDescriptor, Lt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? ln(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && an(t, e, n), n;
};
const hn = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function cn(s, t = 30) {
  let e = s;
  for (let i = 0; i < t && e; i++) {
    if (e instanceof HTMLElement && hn.includes(e.tagName))
      return !0;
    const n = e.parentNode;
    if (!n)
      break;
    e = n instanceof ShadowRoot ? n.host : n;
  }
  return !1;
}
class rt extends N {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = Fe(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = qt(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, i = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && i === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = i, this.config.mode === "background" ? ct.updateHass(this, t) : this.cardLayer?.updateHass(t));
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
      type: `custom:${Z}`,
      weather_entity: qt(t),
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
      this.isConnected && (this.editing = this.preview || cn(this));
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
      this.destroyCardLayer(), this.mounted ? ct.update(this, t, this._hass) : (ct.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (ct.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new Ze(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (ct.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? E`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? E`<div class="surface"></div>` : this.editing ? E`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${Vt} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : $ : $;
  }
}
rt.styles = en;
Lt([
  it({ type: Boolean })
], rt.prototype, "preview", 2);
Lt([
  R()
], rt.prototype, "config", 2);
Lt([
  R()
], rt.prototype, "editing", 2);
Lt([
  R()
], rt.prototype, "errorMessage", 2);
customElements.get(Z) || customElements.define(Z, rt);
var dn = Object.defineProperty, un = Object.getOwnPropertyDescriptor, ei = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? un(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && dn(t, e, n), n;
};
const pn = {
  entity: "Entity",
  name: "Name",
  icon: "Icon",
  slider: "Drag to adjust",
  use_light_color: "Tint with the light colour",
  show_modes: "Show mode buttons"
};
class wt extends N {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => pn[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    return customElements.get("ha-form") ? E`
      <div class="hint">${this.hint}</div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData(this.config)}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : E`
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
    for (const n of ["name", "icon"]) {
      const r = i;
      typeof r[n] == "string" && r[n].length === 0 && delete r[n];
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
wt.styles = Je;
ei([
  it({ attribute: !1 })
], wt.prototype, "hass", 2);
ei([
  R()
], wt.prototype, "config", 2);
const fn = [
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
class gn extends wt {
  get schema() {
    return fn;
  }
  get cardType() {
    return et;
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
const mn = [
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
class yn extends wt {
  get schema() {
    return mn;
  }
  get cardType() {
    return tt;
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
customElements.get("aurora-light-editor") || customElements.define("aurora-light-editor", gn);
customElements.get("aurora-climate-editor") || customElements.define("aurora-climate-editor", yn);
const Bt = "https://github.com/iiNoNoNoii/Aurora-UI", bn = [
  {
    type: Z,
    name: ai,
    description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
    preview: !1,
    documentationURL: Bt
  },
  {
    type: et,
    name: "Aurora Light",
    description: "Light tile that takes the bulb’s own colour. Drag for brightness, tap to toggle.",
    preview: !1,
    documentationURL: Bt
  },
  {
    type: tt,
    name: "Aurora Climate",
    description: "Thermostat with a large target temperature and a surface that warms with it.",
    preview: !1,
    documentationURL: Bt
  }
], ze = window.customCards = window.customCards || [];
for (const s of bn)
  ze.some((t) => t.type === s.type) || ze.push(s);
console.info(
  `%c AURORA UI %c v${Vt} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  rt as AuroraBackgroundCard,
  Rt as AuroraBackgroundEditor,
  st as AuroraClimateCard,
  nt as AuroraLightCard
};
