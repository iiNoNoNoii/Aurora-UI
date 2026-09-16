/*! Aurora UI v0.7.0-beta | AGPL-3.0-or-later | Source: https://github.com/iiNoNoNoii/Aurora-UI */
const P = Math.PI * 2;
function x(n, t, e) {
  return n < t ? t : n > e ? e : n;
}
function g(n) {
  return x(n, 0, 1);
}
function S(n, t, e) {
  return n + (t - n) * e;
}
function Ks(n, t, e) {
  return n === t ? e < n ? 0 : 1 : g((e - n) / (t - n));
}
function Rt(n, t, e) {
  const s = Ks(n, t, e);
  return s * s * (3 - 2 * s);
}
function Kt(n, t, e, s) {
  if (e <= 0)
    return t;
  const i = 1 - Math.pow(2, -s / e);
  return n + (t - n) * i;
}
function B(n) {
  let t = n >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let s = t;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
function y(n, t, e) {
  return t + n() * (e - t);
}
function G(n, t) {
  const e = n % t;
  return e < 0 ? e + t : e;
}
function R(n) {
  return n * Math.PI / 180;
}
function pt(n) {
  return n * 180 / Math.PI;
}
const Te = {
  /** Translucent and blurred – the Aurora default. */
  glass: { blur: 16, opacity: 0.38, saturate: 1.5, glow: 0.8, radius: 18, border: !0 },
  /** Heavier blur, more opaque. Easier to read over a busy or bright sky. */
  frosted: { blur: 30, opacity: 0.58, saturate: 1.2, glow: 0.3, radius: 20, border: !0 },
  /** Solid, but still takes the sky's colour. No blur cost. */
  tinted: { blur: 0, opacity: 0.82, saturate: 1, glow: 0.5, radius: 16, border: !1 },
  /** Almost no surface: a hairline and a whisper of blur. */
  outline: { blur: 6, opacity: 0.1, saturate: 1.1, glow: 0.25, radius: 16, border: !0 },
  /** Flat, borderless, no glow. Quiet. */
  minimal: { blur: 12, opacity: 0.42, saturate: 1, glow: 0, radius: 14, border: !1 },
  /** Hand everything back to the user's theme. */
  plain: { blur: 0, opacity: 1, saturate: 1, glow: 0, radius: -1, border: !0 }
}, Zs = {
  glass: "glass",
  glas: "glass",
  frosted: "frosted",
  frost: "frosted",
  milchglas: "frosted",
  tinted: "tinted",
  tint: "tinted",
  getoent: "tinted",
  outline: "outline",
  umriss: "outline",
  minimal: "minimal",
  schlicht: "minimal",
  plain: "plain",
  none: "plain",
  off: "plain",
  aus: "plain",
  standard: "plain"
};
function ut(n) {
  if (typeof n != "string")
    return null;
  const t = n.trim().toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  return Zs[t] ?? null;
}
const ft = "aurora-background", Js = "Aurora Background", ke = "0.7.0-beta", pe = ["low", "medium", "high", "ultra"], ti = ["background", "card"], ei = {
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
function xt(n) {
  return { ...ei[n] };
}
function ze(n, t) {
  const e = pe.indexOf(n);
  return pe[x(e + t, 0, pe.length - 1)];
}
function si() {
  if (typeof window > "u")
    return "medium";
  const n = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), s = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return n <= 2 || t <= 2 ? "low" : s && e <= 480 ? "medium" : s ? n >= 6 ? "high" : "medium" : n >= 8 && t >= 8 ? "high" : "medium";
}
function E(n, t) {
  return typeof n == "boolean" ? n : n === "true" ? !0 : n === "false" ? !1 : t;
}
function D(n, t, e, s) {
  const i = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(i) ? x(i, e, s) : t;
}
function Fe(n, t) {
  return typeof n == "string" && n.length > 0 ? n : t;
}
function fe(n, t, e) {
  return t.includes(n) ? n : e;
}
function ii(n) {
  const t = {};
  if (n && typeof n == "object" && !Array.isArray(n))
    for (const [e, s] of Object.entries(n)) {
      if (typeof s != "string" && typeof s != "number")
        continue;
      const i = e.startsWith("--") ? e : `--${e}`;
      t[i] = String(s);
    }
  return t;
}
const ni = "sun.sun";
function $s(n) {
  const t = n ?? {}, e = t.effects ?? {}, s = t.appearance ?? {}, i = t.performance ?? {}, r = t.background ?? {}, a = typeof t.glass == "boolean" ? { enabled: t.glass } : typeof t.glass == "string" ? {
    enabled: ut(t.glass) !== "plain",
    preset: ut(t.glass) ?? "glass"
  } : t.glass ?? {}, o = ut(a.preset) ?? ut(a.style) ?? "glass", l = Te[o], c = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : ni, h = fe(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: Fe(t.type, `custom:${ft}`),
    mode: fe(t.mode, ti, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: c,
    quality: h,
    debug: E(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : Fe(t.height, "320px"),
    effects: {
      sun: E(e.sun, !0),
      moon: E(e.moon, !0),
      stars: E(e.stars, !0),
      shooting_stars: E(e.shooting_stars, !0),
      constellations: E(e.constellations, !0),
      milky_way: E(e.milky_way, !0),
      sun_rays: E(e.sun_rays, !0),
      clouds: E(e.clouds, !0),
      rain: E(e.rain, !0),
      snow: E(e.snow, !0),
      fog: E(e.fog, !0),
      lightning: E(e.lightning, !0),
      season: E(e.season, !0),
      parallax: E(e.parallax, !0)
    },
    appearance: {
      intensity: D(s.intensity, 1, 0, 2),
      saturation: D(s.saturation, 1, 0, 2),
      brightness: D(s.brightness, 1, 0.2, 2),
      blur: D(s.blur, 0, 0, 40),
      ambient_glow: D(s.ambient_glow, 1, 0, 2),
      opacity: D(s.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: D(i.max_fps, 60, 10, 120),
      auto_quality: E(i.auto_quality, !0),
      pause_when_hidden: E(i.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: E(r.transparent_lovelace, !0),
      // `transparent_header: true/false` from before 0.6.1 still works.
      header: fe(
        r.header,
        ["auto", "glass", "transparent", "keep"],
        r.transparent_header === !1 ? "keep" : "auto"
      ),
      css_variables: ii(r.css_variables),
      z_index: D(r.z_index, -1, -100, 100),
      ambient_variables: E(r.ambient_variables, !0)
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: E(a.enabled, !1),
      preset: o,
      preset_entity: typeof a.preset_entity == "string" && a.preset_entity.length > 0 ? a.preset_entity : void 0,
      // An explicit number still beats the preset it came from.
      blur: D(a.blur, l.blur, 0, 60),
      opacity: D(a.opacity, l.opacity, 0, 1),
      saturate: D(a.saturate, l.saturate, 1, 3),
      border: E(a.border, l.border),
      glow: D(a.glow, l.glow, 0, 2),
      radius: D(a.radius, l.radius, -1, 80),
      contrast: D(a.contrast, 4.5, 0, 21),
      adaptive_text: E(a.adaptive_text, !0)
    }
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Zt = globalThis, Pe = Zt.ShadowRoot && (Zt.ShadyCSS === void 0 || Zt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Oe = Symbol(), Ne = /* @__PURE__ */ new WeakMap();
let As = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Oe)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Pe && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Ne.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ne.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ri = (n) => new As(typeof n == "string" ? n : n + "", void 0, Oe), ot = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new As(e, n, Oe);
}, ai = (n, t) => {
  if (Pe)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = Zt.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
    }
}, He = Pe ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return ri(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oi, defineProperty: li, getOwnPropertyDescriptor: hi, getOwnPropertyNames: ci, getOwnPropertySymbols: di, getPrototypeOf: ui } = Object, Z = globalThis, Ge = Z.trustedTypes, pi = Ge ? Ge.emptyScript : "", fi = Z.reactiveElementPolyfillSupport, Lt = (n, t) => n, ee = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? pi : null;
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
} }, Re = (n, t) => !oi(n, t), Ue = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: Re };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let dt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ue) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && li(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = hi(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: i, set(a) {
      const o = i?.call(this);
      r?.call(this, a), this.requestUpdate(t, o, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Lt("elementProperties")))
      return;
    const t = ui(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Lt("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Lt("properties"))) {
      const e = this.properties, s = [...ci(e), ...di(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, i] of e)
          this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(He(i));
    } else
      t !== void 0 && e.push(He(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ai(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : ee).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : ee;
      this._$Em = i;
      const o = a.fromAttribute(e, r.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (r = this[t]), s ?? (s = a.getPropertyOptions(t)), !((s.hasChanged ?? Re)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, s))))
        return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [i, r] of this._$Ep)
          this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0)
        for (const [i, r] of s) {
          const { wrapped: a } = r, o = this[i];
          a !== !0 || this._$AL.has(i) || o === void 0 || this.C(i, void 0, r, o);
        }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
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
dt.elementStyles = [], dt.shadowRootOptions = { mode: "open" }, dt[Lt("elementProperties")] = /* @__PURE__ */ new Map(), dt[Lt("finalized")] = /* @__PURE__ */ new Map(), fi?.({ ReactiveElement: dt }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, We = (n) => n, se = Dt.trustedTypes, Ve = se ? se.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, Es = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, Ts = "?" + Q, mi = `<${Ts}>`, rt = document, zt = () => rt.createComment(""), Ft = (n) => n === null || typeof n != "object" && typeof n != "function", Le = Array.isArray, gi = (n) => Le(n) || typeof n?.[Symbol.iterator] == "function", me = `[ 	
\f\r]`, $t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Be = /-->/g, Ye = />/g, st = RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qe = /'/g, je = /"/g, ks = /^(?:script|style|textarea|title)$/i, yi = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), k = yi(1), at = Symbol.for("lit-noChange"), M = Symbol.for("lit-nothing"), Xe = /* @__PURE__ */ new WeakMap(), nt = rt.createTreeWalker(rt, 129);
function Ps(n, t) {
  if (!Le(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ve !== void 0 ? Ve.createHTML(t) : t;
}
const bi = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = $t;
  for (let o = 0; o < e; o++) {
    const l = n[o];
    let c, h, d = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, h = a.exec(l), h !== null); )
      u = a.lastIndex, a === $t ? h[1] === "!--" ? a = Be : h[1] !== void 0 ? a = Ye : h[2] !== void 0 ? (ks.test(h[2]) && (i = RegExp("</" + h[2], "g")), a = st) : h[3] !== void 0 && (a = st) : a === st ? h[0] === ">" ? (a = i ?? $t, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? st : h[3] === '"' ? je : qe) : a === je || a === qe ? a = st : a === Be || a === Ye ? a = $t : (a = st, i = void 0);
    const f = a === st && n[o + 1].startsWith("/>") ? " " : "";
    r += a === $t ? l + mi : d >= 0 ? (s.push(c), l.slice(0, d) + Es + l.slice(d) + Q + f) : l + Q + (d === -2 ? o : f);
  }
  return [Ps(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Nt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [c, h] = bi(t, e);
    if (this.el = Nt.createElement(c, s), nt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = nt.nextNode()) !== null && l.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const d of i.getAttributeNames())
            if (d.endsWith(Es)) {
              const u = h[a++], f = i.getAttribute(d).split(Q), p = /([.?@])?(.*)/.exec(u);
              l.push({ type: 1, index: r, name: p[2], strings: f, ctor: p[1] === "." ? wi : p[1] === "?" ? Si : p[1] === "@" ? _i : re }), i.removeAttribute(d);
            } else
              d.startsWith(Q) && (l.push({ type: 6, index: r }), i.removeAttribute(d));
        if (ks.test(i.tagName)) {
          const d = i.textContent.split(Q), u = d.length - 1;
          if (u > 0) {
            i.textContent = se ? se.emptyScript : "";
            for (let f = 0; f < u; f++)
              i.append(d[f], zt()), nt.nextNode(), l.push({ type: 2, index: ++r });
            i.append(d[u], zt());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Ts)
          l.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = i.data.indexOf(Q, d + 1)) !== -1; )
            l.push({ type: 7, index: r }), d += Q.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = rt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function mt(n, t, e = n, s) {
  if (t === at)
    return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = Ft(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = mt(n, i._$AS(n, t.values), i, s)), t;
}
class vi {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? rt).importNode(e, !0);
    nt.currentNode = i;
    let r = nt.nextNode(), a = 0, o = 0, l = s[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Gt(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Ci(r, this, t)), this._$AV.push(c), l = s[++o];
      }
      a !== l?.index && (r = nt.nextNode(), a++);
    }
    return nt.currentNode = rt, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Gt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = M, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = mt(this, t, e), Ft(t) ? t === M || t == null || t === "" ? (this._$AH !== M && this._$AR(), this._$AH = M) : t !== this._$AH && t !== at && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : gi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== M && Ft(this._$AH) ? this._$AA.nextSibling.data = t : this.T(rt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Nt.createElement(Ps(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i)
      this._$AH.p(e);
    else {
      const r = new vi(i, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Xe.get(t.strings);
    return e === void 0 && Xe.set(t.strings, e = new Nt(t)), e;
  }
  k(t) {
    Le(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t)
      i === e.length ? e.push(s = new Gt(this.O(zt()), this.O(zt()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = We(t).nextSibling;
      We(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class re {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = M, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = M;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let a = !1;
    if (r === void 0)
      t = mt(this, t, e, 0), a = !Ft(t) || t !== this._$AH && t !== at, a && (this._$AH = t);
    else {
      const o = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        c = mt(this, o[s + l], e, l), c === at && (c = this._$AH[l]), a || (a = !Ft(c) || c !== this._$AH[l]), c === M ? t = M : t !== M && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    a && !i && this.j(t);
  }
  j(t) {
    t === M ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wi extends re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === M ? void 0 : t;
  }
}
class Si extends re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== M);
  }
}
class _i extends re {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = mt(this, t, e, 0) ?? M) === at)
      return;
    const s = this._$AH, i = t === M && s !== M || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== M && (s === M || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ci {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    mt(this, t);
  }
}
const Mi = Dt.litHtmlPolyfillSupport;
Mi?.(Nt, Gt), (Dt.litHtmlVersions ?? (Dt.litHtmlVersions = [])).push("3.3.3");
const xi = (n, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new Gt(t.insertBefore(zt(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = globalThis;
let H = class extends dt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return at;
  }
};
H._$litElement$ = !0, H.finalized = !0, It.litElementHydrateSupport?.({ LitElement: H });
const $i = It.litElementPolyfillSupport;
$i?.({ LitElement: H });
(It.litElementVersions ?? (It.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ai = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: Re }, Ei = (n = Ai, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), s === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, n, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, n, o), o;
    } };
  }
  if (s === "setter") {
    const { name: a } = e;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, n, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function tt(n) {
  return (t, e) => typeof e == "object" ? Ei(n, t, e) : ((s, i, r) => {
    const a = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), a ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(n) {
  return tt({ ...n, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ti = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ki = (n) => (...t) => ({ _$litDirective$: n, values: t });
let Pi = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
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
const Os = "important", Oi = " !" + Os, J = ki(class extends Pi {
  constructor(n) {
    if (super(n), n.type !== Ti.ATTRIBUTE || n.name !== "style" || n.strings?.length > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(n) {
    return Object.keys(n).reduce((t, e) => {
      const s = n[e];
      return s == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(n, [t]) {
    const { style: e } = n.element;
    if (this.ft === void 0)
      return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const s of this.ft)
      t[s] == null && (this.ft.delete(s), s.includes("-") ? e.removeProperty(s) : e[s] = null);
    for (const s in t) {
      const i = t[s];
      if (i != null) {
        this.ft.add(s);
        const r = typeof i == "string" && i.endsWith(Oi);
        s.includes("-") || r ? e.setProperty(s, r ? i.slice(0, -11) : i, r ? Os : "") : e[s] = i;
      }
    }
    return at;
  }
});
function W(n) {
  let t = n.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function _(n, t = 1) {
  const e = Math.round(x(n[0], 0, 255)), s = Math.round(x(n[1], 0, 255)), i = Math.round(x(n[2], 0, 255));
  return t >= 1 ? `rgb(${e},${s},${i})` : `rgba(${e},${s},${i},${x(t, 0, 1).toFixed(3)})`;
}
function I(n, t, e) {
  return [S(n[0], t[0], e), S(n[1], t[1], e), S(n[2], t[2], e)];
}
function gt(n) {
  return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
}
function Ri(n, t) {
  const e = gt(n);
  return I(n, [e, e, e], x(t, 0, 1));
}
function ge(n, t) {
  return [x(n[0] * t, 0, 255), x(n[1] * t, 0, 255), x(n[2] * t, 0, 255)];
}
function Li(n, t) {
  const e = gt(n);
  return [
    x(e + (n[0] - e) * t, 0, 255),
    x(e + (n[1] - e) * t, 0, 255),
    x(e + (n[2] - e) * t, 0, 255)
  ];
}
const Rs = new Float32Array(256);
for (let n = 0; n < 256; n++) {
  const t = n / 255;
  Rs[n] = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function ye(n) {
  const t = Math.round(x(n, 0, 255));
  return Rs[t];
}
function be(n) {
  const t = x(n, 0, 1);
  return (t <= 31308e-7 ? t * 12.92 : 1.055 * Math.pow(t, 1 / 2.4) - 0.055) * 255;
}
function Di(n) {
  return [ye(n[0]), ye(n[1]), ye(n[2])];
}
function Ii(n) {
  return [be(n[0]), be(n[1]), be(n[2])];
}
function K(n, t) {
  const e = n[0] - t[0], s = n[1] - t[1], i = n[2] - t[2];
  return e * e + s * s + i * i;
}
const Ls = ot`
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
`, zi = 6;
class Ds {
  constructor(t) {
    this.options = t, this.element = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.dragging = !1, this.holdTimer = null, this.holdFired = !1, this.onPointerDown = (e) => {
      this.options.isDisabled?.() || !this.element || e.button !== 0 || (this.pointerId = e.pointerId, this.startX = e.clientX, this.startY = e.clientY, this.dragging = !1, this.holdFired = !1, this.element.addEventListener("pointermove", this.onPointerMove), this.element.addEventListener("pointerup", this.onPointerUp), this.element.addEventListener("pointercancel", this.onPointerUp), this.options.onHold && (this.holdTimer = window.setTimeout(() => {
        this.holdTimer = null, !this.dragging && (this.holdFired = !0, this.options.onHold?.());
      }, this.options.holdDelay ?? 500)));
    }, this.onPointerMove = (e) => {
      if (!(e.pointerId !== this.pointerId || !this.element)) {
        if (!this.dragging) {
          if ((this.options.axis === "x" ? Math.abs(e.clientX - this.startX) : Math.abs(e.clientY - this.startY)) < zi)
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
      const s = this.element;
      if (this.cancelHold(), s) {
        s.removeEventListener("pointermove", this.onPointerMove), s.removeEventListener("pointerup", this.onPointerUp), s.removeEventListener("pointercancel", this.onPointerUp);
        try {
          s.hasPointerCapture(e.pointerId) && s.releasePointerCapture(e.pointerId);
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
    const s = e.getBoundingClientRect();
    return this.options.axis === "x" ? g((t.clientX - s.left) / Math.max(1, s.width)) : g(1 - (t.clientY - s.top) / Math.max(1, s.height));
  }
  cancelHold() {
    this.holdTimer !== null && (window.clearTimeout(this.holdTimer), this.holdTimer = null);
  }
}
function Fi(n, t, e) {
  n.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function Is(n, t) {
  Fi(n, "hass-more-info", { entityId: t });
}
function zs(n, t) {
  if (!(!n || !t))
    return n.states[t];
}
function V(n) {
  return !n || n.state === "unavailable" || n.state === "unknown";
}
function q(n, t) {
  const e = n?.attributes?.[t];
  if (typeof e == "number" && Number.isFinite(e))
    return e;
  if (typeof e == "string") {
    const s = Number.parseFloat(e);
    if (Number.isFinite(s))
      return s;
  }
  return null;
}
function Ae(n, t) {
  const e = n?.attributes?.[t];
  return typeof e == "string" ? e : null;
}
function Fs(n, t) {
  const e = n?.attributes?.[t];
  return Array.isArray(e) ? e.filter((s) => typeof s == "string") : [];
}
function Ns(n, t) {
  const e = Ae(n, "friendly_name");
  if (e)
    return e;
  const s = n?.entity_id ?? t ?? "";
  return (s.split(".")[1] ?? s).replace(/_/g, " ").replace(/\b\w/g, (r) => r.toUpperCase());
}
function Qe(n, t) {
  const e = t < 1 ? 1 : 0, s = n.toFixed(e);
  return e > 0 && s.endsWith(".0") ? s.slice(0, -2) : s;
}
function ie(n, t, e, s) {
  n?.callService?.(t, e, s);
}
function Ke(n) {
  const t = Math.max(1e3, Math.min(4e4, n)) / 100;
  let e, s, i;
  t <= 66 ? (e = 255, s = 99.4708025861 * Math.log(t) - 161.1195681661) : (e = 329.698727446 * Math.pow(t - 60, -0.1332047592), s = 288.1221695283 * Math.pow(t - 60, -0.0755148492)), t >= 66 ? i = 255 : t <= 19 ? i = 0 : i = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const r = (a) => Math.max(0, Math.min(255, a));
  return [r(e), r(s), r(i)];
}
var Ni = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, ae = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Hi(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && Ni(t, e, i), i;
};
const yt = "aurora-climate", Gi = [86, 158, 232], ve = [150, 176, 200], Ui = [246, 152, 74], Wi = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, we = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan running",
  idle: "Idle",
  off: "Off",
  preheating: "Preheating"
};
class wt extends H {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingTarget = null, this.drag = new Ds({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragMove(t, !0),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || V(this.entity) || !this.config.slider
    }), this.sendTimer = null, this.clearPendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-climate: you need to set an "entity"');
    if (!t.entity.startsWith("climate."))
      throw this.errorMessage = `"${t.entity}" is not a climate entity.`, new Error(`aurora-climate: "${t.entity}" is not a climate entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${yt}`,
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
    const e = t ? Object.keys(t.states).find((s) => s.startsWith("climate.")) : void 0;
    return { type: `custom:${yt}`, entity: e ?? "climate.example" };
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
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(V(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return zs(this.hass, this.config?.entity);
  }
  get minTemp() {
    return q(this.entity, "min_temp") ?? 7;
  }
  get maxTemp() {
    return q(this.entity, "max_temp") ?? 35;
  }
  get step() {
    return q(this.entity, "target_temp_step") ?? 0.5;
  }
  get unit() {
    return Ae(this.entity, "temperature_unit") ?? this.hass?.config?.unit_system?.temperature ?? "°C";
  }
  get currentTemp() {
    return q(this.entity, "current_temperature");
  }
  get target() {
    return this.pendingTarget !== null ? this.pendingTarget : q(this.entity, "temperature");
  }
  /** Where the target sits in the thermostat's own range, 0..1. */
  get targetFraction() {
    const t = this.target;
    if (t === null)
      return 0.5;
    const e = this.maxTemp - this.minTemp;
    return e <= 0 ? 0.5 : g((t - this.minTemp) / e);
  }
  /** Blue when cold, amber when warm, muted when the thermostat is off. */
  get accent() {
    if (this.entity?.state === "off" || V(this.entity))
      return ve;
    const t = this.targetFraction;
    return t < 0.5 ? I(Gi, ve, t * 2) : I(ve, Ui, (t - 0.5) * 2);
  }
  get hvacModes() {
    return Fs(this.entity, "hvac_modes");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  roundToStep(t) {
    const e = this.step, s = Math.round(t / e) * e, i = e < 1 ? 1 : 0;
    return Number(x(s, this.minTemp, this.maxTemp).toFixed(i));
  }
  onDragMove(t, e = !1) {
    const s = this.roundToStep(S(this.minTemp, this.maxTemp, t));
    this.pendingTarget = s, e ? this.sendTarget(s, 0) : this.sendTarget(s, 400);
  }
  adjust(t) {
    if (!this.config || V(this.entity))
      return;
    const e = this.target ?? this.currentTemp ?? this.minTemp, s = this.roundToStep(e + t * this.step);
    s !== this.target && (this.pendingTarget = s, this.sendTarget(s, 500));
  }
  /**
   * Debounced so a drag or a burst of taps produces one service call.
   * `delay: 0` sends immediately, which is what a released drag wants.
   */
  sendTarget(t, e) {
    if (!this.config)
      return;
    this.sendTimer !== null && window.clearTimeout(this.sendTimer);
    const s = () => {
      this.sendTimer = null, ie(this.hass, "climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: t
      }), this.clearPendingTimer !== null && window.clearTimeout(this.clearPendingTimer), this.clearPendingTimer = window.setTimeout(() => {
        this.pendingTarget = null, this.clearPendingTimer = null;
      }, 2e3);
    };
    e <= 0 ? s() : this.sendTimer = window.setTimeout(s, e);
  }
  setHvacMode(t) {
    this.config && ie(this.hass, "climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: t
    });
  }
  openMoreInfo() {
    this.config && Is(this, this.config.entity);
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
    if (V(t))
      return "Unavailable";
    const e = Ae(t, "hvac_action");
    return e && we[e] ? we[e] : we[t.state] ?? t.state.replace(/_/g, " ");
  }
  render() {
    if (this.errorMessage)
      return k`<div class="error">Aurora Climate: ${this.errorMessage}</div>`;
    if (!this.config)
      return M;
    const t = this.entity, e = V(t), s = this.accent, i = `${Math.round(s[0])}, ${Math.round(s[1])}, ${Math.round(s[2])}`, r = this.target, a = this.currentTemp, o = this.unit, l = this.hvacModes, c = J({
      "--aurora-climate-rgb": i
    });
    return k`
      <ha-card style=${c}>
        <div class="fill"></div>
        <div class="content">
          <div class="header">
            <button
              class="icon-button"
              type="button"
              aria-label="More information"
              style=${J({ color: _(s) })}
              @click=${this.openMoreInfo}
            >
              <ha-icon .icon=${this.config.icon ?? "mdi:thermostat"}></ha-icon>
            </button>
            <div class="labels">
              <div class="name">${this.config.name ?? Ns(t, this.config.entity)}</div>
              <div class="state">
                ${a !== null ? `Currently ${Qe(a, 0.1)} ${o}` : "No sensor reading"}
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
              ${r !== null ? k`
                    <span class="number">${Qe(r, this.step)}</span
                    ><span class="unit">${o}</span>
                  ` : k`<span class="number">--</span>`}
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
              style=${J({ width: `${(this.targetFraction * 100).toFixed(2)}%` })}
            ></div>
          </div>

          ${this.config.show_modes && l.length > 0 ? k`
                <div class="modes">
                  ${l.map(
      (h) => k`
                      <button
                        class="mode"
                        type="button"
                        aria-pressed=${String(t?.state === h)}
                        aria-label=${h.replace(/_/g, " ")}
                        title=${h.replace(/_/g, " ")}
                        ?disabled=${e}
                        @click=${() => this.setHvacMode(h)}
                      >
                        <ha-icon .icon=${Wi[h] ?? "mdi:tune"}></ha-icon>
                      </button>
                    `
    )}
                </div>
              ` : M}
        </div>
      </ha-card>
    `;
  }
}
wt.styles = [
  Ls,
  ot`
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
ae([
  tt({ attribute: !1 })
], wt.prototype, "hass", 2);
ae([
  O()
], wt.prototype, "config", 2);
ae([
  O()
], wt.prototype, "errorMessage", 2);
ae([
  O()
], wt.prototype, "pendingTarget", 2);
customElements.get(yt) || customElements.define(yt, wt);
var Vi = Object.defineProperty, Bi = Object.getOwnPropertyDescriptor, oe = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Bi(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && Vi(t, e, i), i;
};
const bt = "aurora-light", Ze = [255, 197, 122], Je = 1;
class St extends H {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingBrightness = null, this.drag = new Ds({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragCommit(t),
      onTap: () => this.toggle(),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || V(this.entity)
    }), this.pendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-light: you need to set an "entity"');
    if (!t.entity.startsWith("light."))
      throw this.errorMessage = `"${t.entity}" is not a light entity.`, new Error(`aurora-light: "${t.entity}" is not a light entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${bt}`,
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
    const e = t ? Object.keys(t.states).find((s) => s.startsWith("light.")) : void 0;
    return { type: `custom:${bt}`, entity: e ?? "light.example" };
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
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(V(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return zs(this.hass, this.config?.entity);
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
    const t = q(this.entity, "brightness");
    return t === null ? 100 : x(Math.round(t / 255 * 100), 0, 100);
  }
  /** The light's real colour, or a warm white when it has none. */
  get lightColor() {
    if (!this.config?.use_light_color)
      return Ze;
    const t = this.entity?.attributes?.rgb_color;
    if (Array.isArray(t) && t.length >= 3) {
      const [i, r, a] = t;
      if ([i, r, a].every((o) => typeof o == "number" && Number.isFinite(o)))
        return [i, r, a];
    }
    const e = q(this.entity, "color_temp_kelvin");
    if (e !== null)
      return Ke(e);
    const s = q(this.entity, "color_temp");
    return s !== null && s > 0 ? Ke(1e6 / s) : Ze;
  }
  get supportsBrightness() {
    const t = Fs(this.entity, "supported_color_modes");
    return t.length === 0 ? q(this.entity, "brightness") !== null : !(t.length === 1 && t[0] === "onoff");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  onDragMove(t) {
    this.supportsBrightness && (this.pendingBrightness = x(
      Math.round(t * 100),
      Je,
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
    const e = x(Math.round(t * 100), Je, 100);
    this.pendingBrightness = e, ie(this.hass, "light", "turn_on", {
      entity_id: this.config.entity,
      brightness_pct: e
    }), this.clearPendingTimer(), this.pendingTimer = window.setTimeout(() => {
      this.pendingBrightness = null, this.pendingTimer = null;
    }, 1500);
  }
  toggle() {
    !this.config || V(this.entity) || (ie(this.hass, "light", "toggle", { entity_id: this.config.entity }), this.pendingBrightness = null, this.clearPendingTimer());
  }
  openMoreInfo() {
    this.config && Is(this, this.config.entity);
  }
  clearPendingTimer() {
    this.pendingTimer !== null && (window.clearTimeout(this.pendingTimer), this.pendingTimer = null);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  stateText() {
    const t = this.entity;
    return t ? V(t) ? "Unavailable" : this.isOn ? this.supportsBrightness ? `${this.brightnessPercent}%` : "On" : "Off" : "Entity not found";
  }
  render() {
    if (this.errorMessage)
      return k`<div class="error">Aurora Light: ${this.errorMessage}</div>`;
    if (!this.config)
      return M;
    const t = this.entity, e = !t, s = this.lightColor, i = `${Math.round(s[0])}, ${Math.round(s[1])}, ${Math.round(s[2])}`, r = this.brightnessPercent, a = this.isOn && !e, o = this.config.icon ?? (a ? "mdi:lightbulb" : "mdi:lightbulb-outline"), l = J({
      "--aurora-light-rgb": i,
      "--aurora-light-glow": a ? String(g(0.25 + r / 100 * 0.55)) : "0",
      "--aurora-icon-alpha": a ? "0.3" : "0.12",
      "--aurora-icon-color": a ? _(s) : "inherit"
    }), c = a && this.supportsBrightness && this.config.slider;
    return k`
      <ha-card style=${l}>
        <div class="glow"></div>
        ${c ? k`
              <div
                class="fill"
                style=${J({ transform: `scaleX(${(r / 100).toFixed(4)})` })}
              ></div>
              <div class="edge" style=${J({ left: `${r}%` })}></div>
            ` : M}
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
            <div class="name">${this.config.name ?? Ns(t, this.config.entity)}</div>
            <div class="state">${this.stateText()}</div>
          </div>
          ${a && this.supportsBrightness ? k`<div class="value">${r}%</div>` : M}
        </div>
      </ha-card>
    `;
  }
  onIconClick(t) {
    t.stopPropagation(), this.toggle();
  }
}
St.styles = [
  Ls,
  ot`
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
oe([
  tt({ attribute: !1 })
], St.prototype, "hass", 2);
oe([
  O()
], St.prototype, "config", 2);
oe([
  O()
], St.prototype, "errorMessage", 2);
oe([
  O()
], St.prototype, "pendingBrightness", 2);
customElements.get(bt) || customElements.define(bt, St);
let Se = null;
function Yi() {
  return Se || (Se = typeof window.loadCardHelpers == "function" ? window.loadCardHelpers().catch(() => null) : Promise.resolve(null)), Se;
}
function Bt(n) {
  const t = document.createElement("div");
  return t.setAttribute(
    "style",
    [
      "padding:14px 16px",
      "border-radius:var(--ha-card-border-radius,12px)",
      "background:var(--error-color,#db4437)",
      "color:#fff",
      "font:14px/1.4 system-ui,sans-serif"
    ].join(";")
  ), t.textContent = n, t.setConfig = () => {
  }, t;
}
async function Hs(n, t) {
  const e = typeof n?.type == "string" ? n.type : "";
  if (!e)
    return Bt('Aurora: a card needs a "type".');
  const s = await Yi();
  try {
    if (s) {
      const i = await s.createCardElement(n);
      return t && (i.hass = t), i;
    }
    if (e.startsWith("custom:")) {
      const i = e.slice(7), r = document.createElement(i);
      return typeof r.setConfig != "function" ? Bt(`Aurora: custom element "${i}" is not loaded.`) : (r.setConfig(n), t && (r.hass = t), r);
    }
    return Bt(`Aurora: cannot create "${e}" on this Home Assistant version.`);
  } catch (i) {
    const r = i instanceof Error ? i.message : String(i);
    if (s?.createErrorCardElement)
      try {
        return s.createErrorCardElement(r, n);
      } catch {
      }
    return Bt(`Aurora: ${r}`);
  }
}
async function Gs(n) {
  try {
    const t = await n.getCardSize?.();
    return typeof t == "number" && Number.isFinite(t) ? t : 1;
  } catch {
    return 1;
  }
}
var qi = Object.defineProperty, ji = Object.getOwnPropertyDescriptor, le = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ji(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && qi(t, e, i), i;
};
const vt = "aurora-style";
class _t extends H {
  constructor() {
    super(...arguments), this.errorMessage = null, this.childConfigKey = "";
  }
  setConfig(t) {
    if (!t?.card || typeof t.card != "object")
      throw this.errorMessage = 'You need to set a "card".', new Error('aurora-style: you need to set a "card"');
    const e = ut(t.style) ?? "glass", s = Te[e];
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${vt}`,
      style: e,
      card: t.card,
      blur: At(t.blur, s.blur, 0, 60),
      opacity: At(t.opacity, s.opacity, 0, 1),
      saturate: At(t.saturate, s.saturate, 1, 3),
      glow: At(t.glow, s.glow, 0, 2),
      radius: At(t.radius, s.radius, -1, 80),
      border: typeof t.border == "boolean" ? t.border : s.border
    };
    const i = JSON.stringify(t.card);
    i !== this.childConfigKey && (this.childConfigKey = i, this.buildChild());
  }
  async getCardSize() {
    return this.child ? Gs(this.child) : 1;
  }
  getGridOptions() {
    return this.child?.getGridOptions?.() ?? { rows: "auto", columns: "full" };
  }
  static getStubConfig() {
    return {
      type: `custom:${vt}`,
      style: "glass",
      card: { type: "entities", entities: [] }
    };
  }
  static getConfigElement() {
    return document.createElement("aurora-style-editor");
  }
  updated(t) {
    super.updated(t), t.has("hass") && this.child && this.hass && (this.child.hass = this.hass);
  }
  async buildChild() {
    const t = this.config;
    if (!t)
      return;
    const e = await Hs(t.card, this.hass);
    this.child = e;
  }
  /** The `--ha-card-*` overrides the wrapped card inherits. */
  surfaceStyles() {
    const t = this.config;
    if (!t)
      return {};
    if (t.style === "plain")
      return {
        "--ha-card-background": "initial",
        "--card-background-color": "initial",
        "--ha-card-backdrop-filter": "initial",
        "--ha-card-border-color": "initial",
        "--ha-card-border-width": "initial",
        "--ha-card-box-shadow": "initial",
        "--ha-card-border-radius": "initial"
      };
    const e = `rgba(var(--aurora-surface-rgb, 22, 26, 36), ${t.opacity})`, s = t.glow > 0.01 ? `0 6px 22px rgba(0,0,0,0.22), 0 0 34px rgba(var(--aurora-accent-rgb, 255,255,255), ${(t.glow * 0.14).toFixed(3)})` : "0 6px 22px rgba(0,0,0,0.22)", i = {
      "--ha-card-background": e,
      "--card-background-color": e,
      "--ha-card-backdrop-filter": t.blur > 0 ? `blur(${t.blur}px) saturate(${t.saturate})` : "none",
      "--ha-card-box-shadow": s,
      "--ha-card-border-width": t.border ? "1px" : "0px",
      "--ha-card-border-color": t.border ? "var(--aurora-card-border, rgba(255,255,255,0.16))" : "transparent"
    };
    return t.radius >= 0 && (i["--ha-card-border-radius"] = `${t.radius}px`), i;
  }
  render() {
    return this.errorMessage ? k`<div class="error">Aurora Style: ${this.errorMessage}</div>` : this.config ? k`
      <div class="wrapper" style=${J(this.surfaceStyles())}>${this.child ?? M}</div>
    ` : M;
  }
}
_t.styles = ot`
    :host {
      display: block;
    }

    .wrapper {
      display: block;
      position: relative;
    }

    /* The child renders its own ha-card; we only supply the variables. */
    ::slotted(*) {
      display: block;
    }

    .error {
      padding: 14px 16px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--error-color, #db4437);
      color: #fff;
      font-size: 14px;
    }
  `;
le([
  tt({ attribute: !1 })
], _t.prototype, "hass", 2);
le([
  O()
], _t.prototype, "config", 2);
le([
  O()
], _t.prototype, "child", 2);
le([
  O()
], _t.prototype, "errorMessage", 2);
function At(n, t, e, s) {
  const i = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(i) ? x(i, e, s) : t;
}
customElements.get(vt) || customElements.define(vt, _t);
var Xi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, Ut = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Qi(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && Xi(t, e, i), i;
};
const Ht = "aurora-layout", ts = ["mobile", "tablet", "desktop", "wide"], Yt = { mobile: 600, tablet: 1e3, desktop: 1600 }, Ki = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  wide: 4
};
class lt extends H {
  constructor() {
    super(...arguments), this.device = "desktop", this.childCards = [], this.errorMessage = null, this.resizeObserver = null, this.measuredWidth = 0, this.builtKey = "", this.buildToken = 0, this.onResize = () => {
      this.measure();
    };
  }
  setConfig(t) {
    const e = Array.isArray(t?.cards) ? t.cards : [], s = t?.layouts ?? {};
    if (!(e.length > 0 || ts.some((o) => (s[o]?.cards?.length ?? 0) > 0)))
      throw this.errorMessage = 'You need "cards", or cards inside at least one layout.', new Error('aurora-layout: you need "cards", or cards inside a layout');
    const r = {
      mobile: Et(t?.breakpoints?.mobile, Yt.mobile, 200, 4e3),
      tablet: Et(t?.breakpoints?.tablet, Yt.tablet, 200, 5e3),
      desktop: Et(t?.breakpoints?.desktop, Yt.desktop, 200, 8e3)
    }, a = {};
    for (const o of ts) {
      const l = s[o] ?? {};
      a[o] = {
        columns: Math.round(Et(l.columns, Ki[o], 1, 12)),
        cards: Array.isArray(l.cards) ? l.cards : void 0,
        gap: typeof l.gap == "number" ? x(l.gap, 0, 64) : void 0
      };
    }
    this.errorMessage = null, this.config = {
      type: t?.type ?? `custom:${Ht}`,
      cards: e,
      gap: Et(t?.gap, 12, 0, 64),
      breakpoints: r,
      layouts: a
    }, this.builtKey = "", this.rebuildIfNeeded();
  }
  async getCardSize() {
    if (this.childCards.length === 0)
      return 1;
    const t = await Promise.all(this.childCards.map((i) => Gs(i))), e = this.activeLayout?.columns ?? 1, s = t.reduce((i, r) => i + r, 0);
    return Math.max(1, Math.ceil(s / Math.max(1, e)));
  }
  getGridOptions() {
    return { rows: "auto", columns: "full" };
  }
  static getStubConfig() {
    return {
      type: `custom:${Ht}`,
      cards: [],
      layouts: { mobile: { columns: 1 }, tablet: { columns: 2 }, desktop: { columns: 3 } }
    };
  }
  connectedCallback() {
    super.connectedCallback(), typeof ResizeObserver < "u" && !this.resizeObserver && (this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this)), this.measure();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = null;
  }
  updated(t) {
    if (super.updated(t), t.has("hass") && this.hass)
      for (const e of this.childCards)
        e.hass = this.hass;
    t.has("device") && this.rebuildIfNeeded();
  }
  get activeLayout() {
    return this.config?.layouts[this.device];
  }
  measure() {
    const t = Math.round(this.getBoundingClientRect().width);
    if (t === 0 || t === this.measuredWidth)
      return;
    this.measuredWidth = t;
    const e = this.config?.breakpoints ?? Yt, s = t < e.mobile ? "mobile" : t < e.tablet ? "tablet" : t < e.desktop ? "desktop" : "wide";
    s !== this.device && (this.device = s);
  }
  /**
   * Cards are only rebuilt when the *set* changes, not on every resize —
   * crossing a breakpoint that both classes share must not tear down and
   * recreate everything.
   */
  async rebuildIfNeeded() {
    const t = this.config;
    if (!t)
      return;
    const s = t.layouts[this.device].cards ?? t.cards, i = JSON.stringify(s);
    if (i === this.builtKey)
      return;
    this.builtKey = i;
    const r = ++this.buildToken, a = await Promise.all(s.map((o) => Hs(o, this.hass)));
    r === this.buildToken && (this.childCards = a);
  }
  render() {
    if (this.errorMessage)
      return k`<div class="error">Aurora Layout: ${this.errorMessage}</div>`;
    if (!this.config)
      return M;
    const t = this.config.layouts[this.device], e = t.gap ?? this.config.gap;
    return this.childCards.length === 0 ? k`
        <div class="empty">
          Aurora Layout (${this.device}) — no cards for this device class.
        </div>
      ` : k`
      <div
        class="grid"
        style=${J({
      gridTemplateColumns: `repeat(${t.columns}, minmax(0, 1fr))`,
      gap: `${e}px`
    })}
      >
        ${this.childCards}
      </div>
    `;
  }
}
lt.styles = ot`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      align-items: start;
    }

    .empty {
      padding: 16px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
      color: var(--secondary-text-color, inherit);
      font-size: 14px;
    }

    .error {
      padding: 14px 16px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--error-color, #db4437);
      color: #fff;
      font-size: 14px;
    }
  `;
Ut([
  tt({ attribute: !1 })
], lt.prototype, "hass", 2);
Ut([
  O()
], lt.prototype, "config", 2);
Ut([
  O()
], lt.prototype, "device", 2);
Ut([
  O()
], lt.prototype, "childCards", 2);
Ut([
  O()
], lt.prototype, "errorMessage", 2);
function Et(n, t, e, s) {
  const i = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(i) ? x(i, e, s) : t;
}
customElements.get(Ht) || customElements.define(Ht, lt);
class Zi {
  constructor(t) {
    this.callback = t, this.frameHandle = null, this.running = !1, this.lastFrame = 0, this.startTime = 0, this.elapsed = 0, this.minFrameMs = 0, this.accumulator = 0, this.tick = (e) => {
      if (!this.running)
        return;
      if (this.frameHandle = requestAnimationFrame(this.tick), this.startTime === 0) {
        this.startTime = e, this.lastFrame = e;
        return;
      }
      const s = e - this.lastFrame;
      if (this.minFrameMs > 0) {
        if (this.accumulator += s, this.lastFrame = e, this.accumulator < this.minFrameMs)
          return;
        const r = Math.min(this.accumulator, 100) / 1e3;
        this.accumulator = 0, this.elapsed += r, this.callback(r, this.elapsed);
        return;
      }
      this.lastFrame = e;
      const i = Math.min(s, 100) / 1e3;
      this.elapsed += i, this.callback(i, this.elapsed);
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
function es(n) {
  return Ji.indexOf(n);
}
class tn {
  constructor(t, e, s) {
    this.level = t, this.enabled = e, this.targetFps = s, this.frameTimes = [], this.lastDecision = 0, this.fpsSamples = 0, this.fpsAccum = 0, this.fpsWindowStart = 0, this.fps = 0, this.ceiling = "ultra";
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
    const s = performance.now();
    if (t > 0 && (this.fpsAccum += 1 / t, this.fpsSamples++), s - this.fpsWindowStart >= 500 && (this.fps = this.fpsSamples > 0 ? this.fpsAccum / this.fpsSamples : 0, this.fpsAccum = 0, this.fpsSamples = 0, this.fpsWindowStart = s), !this.enabled || (this.frameTimes.push(e), this.frameTimes.length > 180 && this.frameTimes.shift(), s - this.lastDecision < 5e3 || this.frameTimes.length < 60))
      return null;
    this.lastDecision = s;
    const i = [...this.frameTimes].sort((o, l) => o - l), r = i[Math.floor(i.length / 2)], a = 1e3 / this.targetFps;
    if (r > a * 0.55) {
      const o = ze(this.level, -1);
      if (o !== this.level)
        return this.level = o, this.ceiling = o, this.frameTimes.length = 0, o;
    } else if (r < a * 0.18) {
      const o = ze(this.level, 1);
      if (o !== this.level && es(o) <= es(this.ceiling))
        return this.level = o, this.frameTimes.length = 0, o;
    }
    return null;
  }
}
function X(n, t) {
  return {
    elevation: n,
    palette: {
      zenith: W(t.zenith),
      upper: W(t.upper),
      middle: W(t.middle),
      lower: W(t.lower),
      horizon: W(t.horizon),
      sunCore: W(t.sunCore),
      sunGlow: W(t.sunGlow),
      ambient: W(t.ambient),
      cloud: W(t.cloud)
    }
  };
}
const it = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  X(-90, {
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
  X(-12, {
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
  X(-6, {
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
  X(-2, {
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
  X(3, {
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
  X(12, {
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
  X(35, {
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
  X(70, {
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
], De = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], en = [255, 118, 162], sn = [255, 138, 56];
function nn(n, t, e) {
  const s = {};
  for (const i of De)
    s[i] = I(n[i], t[i], e);
  return s;
}
function rn(n) {
  if (n <= it[0].elevation)
    return { ...it[0].palette };
  const t = it[it.length - 1];
  if (n >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < it.length - 1; e++) {
    const s = it[e], i = it[e + 1];
    if (n >= s.elevation && n <= i.elevation) {
      const r = Rt(s.elevation, i.elevation, n);
      return nn(s.palette, i.palette, r);
    }
  }
  return { ...t.palette };
}
function Us(n) {
  const t = Rt(-4, 8, n), e = 1 - Rt(-14, -2, n), s = Rt(-16, -3, n) * (1 - Rt(0, 10, n));
  return { dayFactor: t, nightFactor: e, twilightFactor: s };
}
const an = {
  zenith: 0.15,
  upper: 0.3,
  middle: 0.55,
  lower: 0.85,
  horizon: 1,
  sunCore: 0.2,
  sunGlow: 0.6,
  ambient: 0.8,
  cloud: 0.5
}, on = 0.1;
function _e(n) {
  const { elevation: t, rising: e, weather: s, appearance: i, season: r } = n, a = rn(t), { twilightFactor: o, dayFactor: l } = Us(t), c = e ? en : sn, h = o * 0.3, d = {}, u = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, f = g(s.desaturation) * 0.8, p = 1 - g(s.skyDarkness) * 0.75, m = r ? on * (0.35 + 0.65 * l) : 0, b = r ? r.saturation : 1;
  for (const v of De) {
    let w = I(a[v], c, h * u[v]);
    r && m > 0 && (w = I(w, r.tint, m * an[v])), w = Ri(w, f), w = ge(w, p), w = Li(w, i.saturation * b), w = ge(w, i.brightness), d[v] = w;
  }
  return d.cloud = ge(d.cloud, S(1, 0.32, g(s.cloudDarkness))), d;
}
function ln(n, t, e, s) {
  const i = e <= 0 ? 1 : 1 - Math.pow(2, -s / e), r = {};
  for (const a of De)
    r[a] = I(n[a], t[a], i);
  return r;
}
const ss = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: 3 * Math.PI / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1 }
}, is = ["summer", "autumn", "winter", "spring"];
function hn(n) {
  const t = new Date(n.getFullYear(), 0, 0);
  return Math.floor((n.getTime() - t.getTime()) / 864e5);
}
function ns(n, t) {
  const e = (hn(n) - 172) / 365.25 * P, s = t < 0 ? e + Math.PI : e;
  let i = 0;
  const r = { summer: 0, autumn: 0, winter: 0, spring: 0 };
  for (const f of is) {
    const p = Math.max(0, Math.cos(s - ss[f].centre)), m = p * p;
    r[f] = m, i += m;
  }
  i <= 0 && (i = 1);
  let a = 0, o = 0, l = 0, c = 0, h = 0, d = "summer", u = -1;
  for (const f of is) {
    const p = r[f] / i, m = ss[f];
    a += m.tint[0] * p, o += m.tint[1] * p, l += m.tint[2] * p, c += m.haze * p, h += m.saturation * p, p > u && (u = p, d = f);
  }
  return {
    name: d,
    /** −1 at midwinter, +1 at midsummer. */
    warmth: Math.cos(s),
    tint: [a, o, l],
    haze: g(c),
    saturation: h
  };
}
function cn(n) {
  return n.getTime() / 864e5 - 10957.5;
}
function dn(n, t, e) {
  const s = cn(n), i = R(357.5291 + 0.98560028 * s), r = R(280.459 + 0.98564736 * s) + R(1.9148) * Math.sin(i) + R(0.02) * Math.sin(2 * i), a = R(23.4393 - 3563e-10 * s), o = Math.asin(Math.sin(a) * Math.sin(r)), l = Math.atan2(
    Math.cos(a) * Math.sin(r),
    Math.cos(r)
  ), h = R(280.16 + 360.9856235 * s) + R(e) - l, d = R(t), u = Math.sin(d) * Math.sin(o) + Math.cos(d) * Math.cos(o) * Math.cos(h), f = Math.asin(Math.max(-1, Math.min(1, u))), p = Math.atan2(
    Math.sin(h),
    Math.cos(h) * Math.sin(d) - Math.tan(o) * Math.cos(d)
  ), m = h + R(360.9856235 * (10 / 1440)), b = Math.sin(d) * Math.sin(o) + Math.cos(d) * Math.cos(o) * Math.cos(m);
  return {
    elevation: pt(f),
    azimuth: G(pt(p) + 180, 360),
    rising: b > u
  };
}
function un(n) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, s = n.getTime() / 864e5 - e;
  return G(s / t, 1);
}
function pn(n, t, e) {
  const r = (n.getHours() + n.getMinutes() / 60 + n.getSeconds() / 3600 - 12) / 24 * P - e * P, a = 70 - Math.min(55, Math.abs(t) * 0.55), o = Math.cos(r) * a, l = (Math.sin(r) + 1) / 2;
  return { altitude: o, azimuthFraction: l };
}
const fn = [
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
], mn = {
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
function gn(n) {
  if (!n)
    return "unknown";
  const t = n.toLowerCase().trim();
  return fn.includes(t) ? t : mn[t] ?? "unknown";
}
const yn = {
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
}, bn = {
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
function Ws(n) {
  return { condition: n, ...yn, ...bn[n] };
}
const vn = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function qt(n) {
  if (typeof n == "number" && Number.isFinite(n))
    return n;
  if (typeof n == "string") {
    const t = Number.parseFloat(n);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function Ee(n) {
  if (n) {
    for (const t of Object.keys(n.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function rs(n, t, e = /* @__PURE__ */ new Date()) {
  const s = n?.config?.latitude ?? 51.2, i = n?.config?.longitude ?? 6.8;
  let r = null, a = null, o = null, l = "computed";
  const c = t.sun_entity, h = c ? n?.states?.[c] : void 0;
  if (h) {
    const v = qt(h.attributes.elevation), w = qt(h.attributes.azimuth);
    v !== null && (r = v, a = w, o = typeof h.attributes.rising == "boolean" ? h.attributes.rising : null, l = "sun.sun");
  }
  if (r === null || a === null || o === null) {
    const v = dn(e, s, i);
    r === null && (r = v.elevation), a === null && (a = v.azimuth), o === null && (o = v.rising), l !== "sun.sun" && (l = "computed");
  }
  const d = t.weather_entity ?? Ee(n), u = d ? n?.states?.[d] : void 0;
  let f = "unknown", p = null, m = null, b = !1;
  if (u && u.state !== "unavailable" && u.state !== "unknown") {
    f = gn(u.state), b = !0;
    const v = qt(u.attributes.cloud_coverage);
    v !== null && (p = g(v / 100));
    const w = qt(u.attributes.wind_speed);
    if (w !== null) {
      const C = String(
        u.attributes.wind_speed_unit ?? n?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), A = w * (vn[C] ?? 1);
      m = g(A / 70);
    }
  } else
    d || (f = r > -6 ? "sunny" : "clear-night");
  return f === "sunny" && r < -4 && (f = "clear-night"), f === "clear-night" && r > 2 && (f = "sunny"), {
    condition: f,
    cloudCoverage: p,
    wind: m,
    sunElevation: r,
    sunAzimuth: a,
    sunRising: o,
    latitude: s,
    longitude: i,
    sunSource: l,
    weatherEntity: d ?? null,
    weatherAvailable: b
  };
}
function wn(n) {
  const t = Ws(n.condition);
  return n.cloudCoverage !== null && (t.cloudCover = S(t.cloudCover, n.cloudCoverage, 0.85), t.sunVisibility = Math.min(t.sunVisibility, 1 - n.cloudCoverage * 0.85)), n.wind !== null && (t.wind = S(t.wind, n.wind, 0.7)), t;
}
const Sn = [
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
class _n {
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
    for (const s of Sn)
      this.current[s] = Kt(this.current[s], this.target[s], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
const as = 24, Cn = [0, 0.28, 0.55, 0.82, 1];
class Mn {
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
    const { palette: s, width: i, height: r } = e, a = [
      Math.round(r),
      s.zenith.join(),
      s.upper.join(),
      s.middle.join(),
      s.lower.join(),
      s.horizon.join()
    ].join("|");
    (!this.gradient || a !== this.cacheKey) && (this.gradient = this.buildGradient(t, s, r), this.cacheKey = a), t.fillStyle = this.gradient, t.fillRect(0, 0, i, r);
    const o = t.createLinearGradient(0, 0, 0, r * 0.45), l = g(0.12 + e.weather.skyDarkness * 0.2);
    o.addColorStop(0, `rgba(0,0,0,${l.toFixed(3)})`), o.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = o, t.fillRect(0, 0, i, r * 0.45);
  }
  buildGradient(t, e, s) {
    const i = [
      e.zenith,
      e.upper,
      e.middle,
      e.lower,
      e.horizon
    ].map(Di), r = t.createLinearGradient(0, 0, 0, s);
    for (let a = 0; a < as; a++) {
      const o = a / (as - 1);
      r.addColorStop(o, _(Ii(xn(i, Cn, o))));
    }
    return r;
  }
  destroy() {
    this.gradient = null;
  }
}
function xn(n, t, e) {
  const s = n.length - 1;
  if (e <= t[0])
    return n[0];
  if (e >= t[s])
    return n[s];
  let i = 0;
  for (; i < s - 1 && e > t[i + 1]; )
    i++;
  const r = t[i], a = t[i + 1], o = a - r || 1, l = (e - r) / o, c = [0, 0, 0];
  for (let h = 0; h < 3; h++) {
    const d = n[i][h], u = n[i + 1][h], f = n[Math.max(0, i - 1)][h], p = n[Math.min(s, i + 2)][h], m = t[Math.max(0, i - 1)], b = t[Math.min(s, i + 2)], v = (u - f) / (a - m || 1) * o, w = (p - d) / (b - r || 1) * o, C = l * l, A = C * l;
    c[h] = (2 * A - 3 * C + 1) * d + (A - 2 * C + l) * v + (-2 * A + 3 * C) * u + (A - C) * w;
  }
  return [c[0], c[1], c[2]];
}
const $n = 6221137;
class An {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = B($n), s = t.quality.starCount;
    this.stars = new Array(s);
    for (let i = 0; i < s; i++) {
      const r = Math.pow(e(), 1.6) * 0.82;
      this.stars[i] = {
        nx: e(),
        ny: r,
        radius: y(e, 0.4, 1.5),
        baseAlpha: y(e, 0.35, 1),
        twinkleSpeed: y(e, 0.4, 2.2),
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
    const s = g(e.nightFactor) * (1 - g(e.weather.cloudCover) * 0.85) * g(e.appearance.intensity);
    if (s <= 0.01) {
      this.shooting.length = 0;
      return;
    }
    const { width: i, height: r } = e, a = !e.reducedMotion, o = e.parallaxX * 0.15, l = e.parallaxY * 0.15;
    t.save();
    for (let c = 0; c < this.stars.length; c++) {
      const h = this.stars[c], d = h.nx * i + o, u = h.ny * r + l;
      let f = h.baseAlpha * s;
      if (a) {
        const v = Math.sin(e.time * h.twinkleSpeed + h.twinklePhase);
        f *= 0.62 + 0.38 * v;
      }
      if (f <= 0.02)
        continue;
      const p = 255, m = 245 + Math.round(h.tint * 8), b = 225 + Math.round((1 - h.tint) * 30);
      t.fillStyle = `rgba(${p},${m},${b},${f.toFixed(3)})`, h.radius <= 0.7 ? t.fillRect(d, u, 1, 1) : (t.beginPath(), t.arc(d, u, h.radius, 0, P), t.fill());
    }
    t.restore(), e.effects.shooting_stars && e.quality.shootingStars && !e.reducedMotion && this.updateShootingStars(t, e, s);
  }
  updateShootingStars(t, e, s) {
    const { width: i, height: r, dt: a } = e;
    if (this.nextShootingStar -= a, this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const o = 380 + Math.random() * 320, l = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * i * 0.8,
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
      const c = l.life / l.maxLife, h = Math.sin(c * Math.PI) * s, d = l.vx === 0 && l.vy === 0 ? 0 : l.vx, u = Math.hypot(d, l.vy) || 1, f = l.x - d / u * l.length, p = l.y - l.vy / u * l.length, m = t.createLinearGradient(l.x, l.y, f, p);
      m.addColorStop(0, `rgba(255,255,255,${h.toFixed(3)})`), m.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = m, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(f, p), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class En {
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
    const s = g(e.nightFactor) * (1 - g(e.weather.cloudCover) * 0.8);
    if (s <= 0.03)
      return;
    const i = Math.min(e.width, e.height), r = Math.max(12, i * 0.035), a = Math.ceil(r * 2 + 4), o = this.ensureBuffer(a);
    if (!o || !this.buffer)
      return;
    const l = Math.round(e.moonPhase * 200) / 200;
    l !== this.drawnPhase && (this.drawMoon(o, a, r, l), this.drawnPhase = l);
    const c = e.moonX * e.width + e.parallaxX * 0.12, h = e.moonY * e.height + e.parallaxY * 0.12;
    t.save(), t.globalCompositeOperation = "lighter";
    const d = r * 5, u = 0.14 * s * e.appearance.ambient_glow, f = t.createRadialGradient(c, h, r * 0.6, c, h, d);
    f.addColorStop(0, `rgba(200,220,255,${u.toFixed(3)})`), f.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = f, t.beginPath(), t.arc(c, h, d, 0, P), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = s, t.drawImage(this.buffer, c - a / 2, h - a / 2), t.restore();
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
  drawMoon(t, e, s, i) {
    const r = e / 2, a = e / 2;
    t.clearRect(0, 0, e, e);
    const o = t.createRadialGradient(
      r - s * 0.25,
      a - s * 0.25,
      s * 0.1,
      r,
      a,
      s
    );
    o.addColorStop(0, "#fffdf3"), o.addColorStop(0.75, "#eceadd"), o.addColorStop(1, "#cfd3cc"), t.fillStyle = o, t.beginPath(), t.arc(r, a, s, 0, P), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const l = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, u, f] of l)
      t.beginPath(), t.arc(r + d * s, a + u * s, f * s, 0, P), t.fill();
    const c = (1 - Math.cos(i * P)) / 2;
    if (c < 0.99) {
      const u = i < 0.5, f = Math.abs(1 - c * 2) * s;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(r, a, s + 1, -Math.PI / 2, Math.PI / 2, u);
      const p = u ? c < 0.5 : c >= 0.5;
      t.ellipse(
        r,
        a,
        f,
        s + 1,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        p
      ), t.closePath(), t.fill(), t.restore();
    }
    t.save(), t.globalCompositeOperation = "destination-in";
    const h = t.createRadialGradient(r, a, s * 0.88, r, a, s);
    h.addColorStop(0, "rgba(0,0,0,1)"), h.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = h, t.fillRect(0, 0, e, e), t.restore();
  }
  destroy() {
    this.buffer = null, this.bufferCtx = null, this.bufferSize = 0;
  }
}
class Tn {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: s, width: i, height: r, appearance: a } = e, o = g(e.dayFactor * 0.35 + e.twilightFactor) * a.ambient_glow * S(0.45, 1, g(e.weather.sunVisibility));
    if (o > 0.01) {
      const m = g(e.sunX) * i, b = r * S(1.02, 0.55, g(e.dayFactor)), v = Math.max(i, r) * S(0.55, 0.95, e.twilightFactor), w = t.createRadialGradient(m, b, 0, m, b, v);
      w.addColorStop(0, _(s.sunGlow, 0.5 * o)), w.addColorStop(0.35, _(s.sunGlow, 0.22 * o)), w.addColorStop(1, _(s.sunGlow, 0)), t.fillStyle = w, t.fillRect(0, 0, i, r);
    }
    const l = g((e.sunElevation + 1.5) / 4) * g(e.weather.sunVisibility);
    if (l <= 0.02)
      return;
    const c = e.sunX * i + e.parallaxX * 0.12, h = e.sunY * r + e.parallaxY * 0.12, d = Math.min(i, r), u = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const f = e.quality.sunGlowPasses;
    for (let m = f; m >= 1; m--) {
      const b = m / f, v = u * (2.2 + b * 9), w = 0.1 * l * a.ambient_glow * (1 - b * 0.55), C = t.createRadialGradient(c, h, u * 0.4, c, h, v);
      C.addColorStop(0, _(s.sunGlow, w)), C.addColorStop(1, _(s.sunGlow, 0)), t.fillStyle = C, t.beginPath(), t.arc(c, h, v, 0, P), t.fill();
    }
    const p = t.createRadialGradient(c, h, 0, c, h, u);
    p.addColorStop(0, _(s.sunCore, l)), p.addColorStop(0.7, _(s.sunCore, 0.85 * l)), p.addColorStop(1, _(s.sunGlow, 0)), t.fillStyle = p, t.beginPath(), t.arc(c, h, u, 0, P), t.fill(), t.restore();
  }
  destroy() {
  }
}
const kn = 790741, Pn = 2 * 2 * 3, On = 200, Rn = [
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 }
], Ln = 0.22, Dn = 0.5, In = 0.4;
class zn {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.lastTintAt = 0, this.clouds = [];
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: s, cloudLayers: i } = t.quality, r = B(kn), a = this.clouds;
    this.base = Rn.map(({ style: o, aspect: l, spanScale: c }) => {
      const h = Math.round(e), d = Math.round(h / l);
      return {
        canvas: Hn(h, d, r, o),
        aspect: l,
        spanScale: c
      };
    }), this.tinted = [], this.tintValid = !1, this.clouds = new Array(s);
    for (let o = 0; o < s; o++) {
      const l = o % i, c = i <= 1 ? 1 : l / (i - 1), h = c < 0.45 ? 3 : 0;
      this.clouds[o] = {
        variant: h + Math.floor(r() * 3),
        nx: r(),
        ny: y(r, -0.04, 0.46) - c * 0.06,
        scale: y(r, 0.82, 1.22),
        layer: c,
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
    const s = g(e.weather.cloudCover) * g(e.appearance.intensity);
    if (s <= 0.01 || this.clouds.length === 0 || (this.ensureTint(e.palette.cloud), this.tinted.length === 0))
      return;
    const { width: i, height: r, dt: a } = e, o = S(0.82, 1.35, s), l = s * this.clouds.length, c = Math.floor(l), h = l - c, d = S(0.25, 2.6, g(e.weather.wind)), u = e.reducedMotion ? 0.08 : 1, f = g((s - 0.55) / 0.45) * S(0.35, 0.85, g(e.weather.cloudDarkness));
    if (f > 0.01) {
      const p = t.createLinearGradient(0, 0, 0, r);
      p.addColorStop(0, _(e.palette.cloud, f * 0.55)), p.addColorStop(0.55, _(e.palette.cloud, f * 0.4)), p.addColorStop(1, _(e.palette.cloud, f * 0.18)), t.fillStyle = p, t.fillRect(0, 0, i, r);
    }
    t.save();
    for (let p = 0; p < this.clouds.length; p++) {
      const m = this.clouds[p], b = this.tinted[m.variant];
      let v = i * S(Ln, Dn, m.layer) * m.scale * b.spanScale * o, w = v / b.aspect;
      const C = r * In;
      w > C && (w = C, v = w * b.aspect);
      const A = i + v * 1.1, $ = i * S(6e-3, 0.028, m.layer) * d * u;
      if (m.nx = G(m.nx + $ * a / A, 1), p > c)
        continue;
      const z = p === c ? h : 1;
      if (z <= 0.01)
        continue;
      const Wt = S(0.3, 1, m.layer), ht = m.nx * A - v + e.parallaxX * Wt, de = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + m.bobPhase) * m.bobAmount * r, et = m.ny * r + de + e.parallaxY * Wt;
      if (ht + v < 0 || ht > i)
        continue;
      const L = m.alpha * z * S(0.42, 0.92, s) * S(0.75, 1, m.layer) * S(1, 1.15, g(e.weather.cloudDarkness));
      t.globalAlpha = g(L), t.drawImage(b.canvas, ht, et, v, w);
    }
    t.restore();
  }
  ensureTint(t) {
    if (this.tintValid) {
      if (K(t, this.tintColor) < Pn)
        return;
      const e = performance.now();
      if (e - this.lastTintAt < On)
        return;
      this.lastTintAt = e;
    } else
      this.lastTintAt = performance.now();
    this.tinted = this.base.map((e) => ({
      canvas: Gn(e.canvas, t),
      aspect: e.aspect,
      spanScale: e.spanScale
    })), this.tintColor = t, this.tintValid = !0;
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
let jt = null;
function Fn() {
  if (jt !== null)
    return jt;
  const n = document.createElement("canvas").getContext("2d");
  return jt = !!n && typeof n.filter == "string", jt;
}
function Nn(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const s = e.getContext("2d");
  if (!s)
    return n;
  if (Fn())
    return s.filter = `blur(${t.toFixed(2)}px)`, s.drawImage(n, 0, 0), s.filter = "none", e;
  const i = n.width * 3;
  return s.shadowColor = "rgba(255,255,255,1)", s.shadowBlur = t * 2, s.shadowOffsetX = i, s.drawImage(n, -i, 0), e;
}
function Hn(n, t, e, s) {
  const i = document.createElement("canvas");
  i.width = n, i.height = t;
  const r = i.getContext("2d");
  if (!r)
    return i;
  const a = s === "cumulus", o = t * (a ? 0.055 : 0.045), l = o * 2.2, c = t - l - t * (a ? 0.04 : 0.06), h = l, d = n - l * 2;
  r.fillStyle = "#ffffff";
  const u = a ? 9 : 14, f = d / (u * 0.85), p = Math.max(d * 0.2, d - f * 2.6), m = l + (d - p) / 2, b = p / Math.max(1, u - 1), v = (c - h) * (a ? 0.3 : 0.4), w = (L, F, U, Y) => {
    r.beginPath(), r.ellipse(L, F, U, Y, 0, 0, P), r.fill();
  };
  for (let L = 0; L < u; L++) {
    const F = L / (u - 1), U = m + F * p + (e() - 0.5) * b * 0.5, Y = 0.34 + 0.66 * Math.pow(Math.sin(Math.PI * g(F)), a ? 0.55 : 0.4), Vt = (c - h) * (a ? 1 : 0.74) * Y * y(e, 0.6, 1), ue = f * y(e, 0.85, 1.25), Ie = Math.min(ue * y(e, 1, 1.45), Math.max(3, Vt * 0.7));
    w(U, c - Vt + Ie, ue, Ie), w(
      U,
      c - v * y(e, 0.1, 0.4),
      ue * y(e, 0.95, 1.2),
      v * Y * y(e, 0.8, 1.2)
    );
  }
  const C = a ? 7 : 9;
  for (let L = 0; L < C; L++) {
    const F = (L + y(e, 0.2, 0.8)) / C, U = m + g(F) * p, Y = 0.4 + 0.6 * Math.sin(Math.PI * g(F)), j = f * y(e, 0.32, 0.6), Vt = c - (c - h) * Y * y(e, 0.35, 0.85) + j * 0.4;
    w(U, Vt, j * y(e, 1, 1.35), j);
  }
  const A = Nn(i, o), $ = A.getContext("2d");
  if (!$)
    return A;
  $.globalCompositeOperation = "source-atop";
  const z = $.createLinearGradient(0, h, 0, c);
  z.addColorStop(0, "rgb(255,255,255)"), z.addColorStop(0.42, "rgb(238,240,244)"), z.addColorStop(0.78, "rgb(196,201,211)"), z.addColorStop(1, "rgb(152,159,174)"), $.fillStyle = z, $.fillRect(0, 0, n, t);
  const Wt = a ? 3 : 2;
  for (let L = 0; L < Wt; L++) {
    const F = l + d * y(e, 0.22, 0.78), U = c - (c - h) * y(e, 0.45, 0.85), Y = t * y(e, 0.18, 0.32), j = $.createRadialGradient(F, U, 0, F, U, Y);
    j.addColorStop(0, "rgba(255,255,255,0.55)"), j.addColorStop(1, "rgba(255,255,255,0)"), $.fillStyle = j, $.beginPath(), $.arc(F, U, Y, 0, P), $.fill();
  }
  $.globalCompositeOperation = "destination-in";
  const ht = g((c - o * 1.5) / t), de = g((c + o * 1.2) / t), et = $.createLinearGradient(0, 0, 0, t);
  return et.addColorStop(0, "rgba(0,0,0,1)"), et.addColorStop(ht, "rgba(0,0,0,1)"), et.addColorStop(Math.max(de, ht + 1e-3), "rgba(0,0,0,0)"), et.addColorStop(1, "rgba(0,0,0,0)"), $.fillStyle = et, $.fillRect(0, 0, n, t), $.globalCompositeOperation = "source-over", A;
}
function Gn(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const s = e.getContext("2d");
  return s && (s.drawImage(n, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = _(t), s.fillRect(0, 0, e.width, e.height), s.globalCompositeOperation = "destination-in", s.drawImage(n, 0, 0), s.globalCompositeOperation = "source-over"), e;
}
function Vs(n, t) {
  const e = R(n), s = R(t);
  return [Math.cos(s) * Math.cos(e), Math.cos(s) * Math.sin(e), Math.sin(s)];
}
function Un(n, t) {
  return [
    n[1] * t[2] - n[2] * t[1],
    n[2] * t[0] - n[0] * t[2],
    n[0] * t[1] - n[1] * t[0]
  ];
}
const Jt = Vs(266.405, -28.936), te = Vs(192.85948, 27.12825), Ce = Un(te, Jt);
function Wn(n, t) {
  const e = R(n), s = R(t), i = Math.cos(s) * Math.cos(e), r = Math.cos(s) * Math.sin(e), a = Math.sin(s), o = i * Jt[0] + r * Ce[0] + a * te[0], l = i * Jt[1] + r * Ce[1] + a * te[1], c = i * Jt[2] + r * Ce[2] + a * te[2];
  return {
    ra: G(pt(Math.atan2(l, o)), 360) / 15,
    dec: pt(Math.asin(Math.max(-1, Math.min(1, c))))
  };
}
function Vn(n) {
  return n.getTime() / 864e5 + 24405875e-1;
}
function Bn(n) {
  const t = Vn(n) - 2451545;
  return G(280.46061837 + 360.98564736629 * t, 360);
}
function Bs(n, t, e, s, i) {
  const r = Bn(i) + s, a = R(G(r - n * 15, 360)), o = R(t), l = R(e), c = Math.sin(o) * Math.sin(l) + Math.cos(o) * Math.cos(l) * Math.cos(a), h = Math.asin(Math.max(-1, Math.min(1, c))), d = Math.atan2(
    Math.sin(a),
    Math.cos(a) * Math.sin(l) - Math.tan(o) * Math.cos(l)
  );
  return {
    altitude: pt(h),
    // atan2 above measures from south, increasing westward.
    azimuth: G(pt(d) + 180, 360)
  };
}
const Yn = 60, qn = 240;
function ne(n, t) {
  const e = (t - Yn) / qn, s = n >= 0 ? 0.94 - Math.pow(g(n / 90), 0.7) * 0.84 : x(0.94 + -n / 20 * 0.18, 0.94, 1.2);
  return { x: e, y: s, inView: e >= -0.05 && e <= 1.05 };
}
function os(n) {
  return g(n.x);
}
const Me = [
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
], jn = [
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
], Xn = 20;
class Qn {
  constructor() {
    this.name = "constellations", this.placed = [], this.sinceRecompute = Number.POSITIVE_INFINITY, this.lastLatitude = Number.NaN, this.lastLongitude = Number.NaN, this.visibleCount = 0;
  }
  setup() {
    this.placed = Me.map((t, e) => ({
      x: 0,
      y: 0,
      visible: !1,
      // Magnitude 6 is the naked-eye limit, −1.5 is Sirius. Perceived
      // brightness is logarithmic, so map it as a curve rather than linearly.
      brightness: g((6 - t.mag) / 7.5) ** 1.6,
      radius: S(0.7, 2.3, g((4.5 - t.mag) / 6)),
      twinklePhase: e * 2.399 % P
    })), this.sinceRecompute = Number.POSITIVE_INFINITY;
  }
  resize() {
  }
  particleCount() {
    return this.visibleCount;
  }
  render(t, e) {
    const s = g(e.nightFactor) * (1 - g(e.weather.cloudCover) * 0.9) * g(e.appearance.intensity);
    if (s <= 0.02) {
      this.visibleCount = 0;
      return;
    }
    this.sinceRecompute += e.dt, (this.sinceRecompute >= Xn || e.latitude !== this.lastLatitude || e.longitude !== this.lastLongitude) && this.recompute(e);
    const { width: i, height: r } = e;
    t.save(), t.lineWidth = Math.max(0.7, Math.min(i, r) * 12e-4), t.lineCap = "round", t.strokeStyle = `rgba(150,185,255,${(0.24 * s).toFixed(3)})`, t.beginPath();
    for (const o of jn)
      for (const [l, c] of o.lines) {
        const h = this.placed[l], d = this.placed[c];
        !h?.visible || !d?.visible || Math.abs(h.x - d.x) > 0.45 || (t.moveTo(h.x * i, h.y * r), t.lineTo(d.x * i, d.y * r));
      }
    t.stroke(), t.restore();
    let a = 0;
    t.save();
    for (const o of this.placed) {
      if (!o.visible)
        continue;
      a++;
      const l = e.reducedMotion ? 1 : 0.78 + 0.22 * Math.sin(e.time * 1.7 + o.twinklePhase), c = g(o.brightness * s * l);
      if (c <= 0.02)
        continue;
      const h = o.x * i + e.parallaxX * 0.15, d = o.y * r + e.parallaxY * 0.15;
      if (o.radius > 1.5) {
        const u = t.createRadialGradient(h, d, 0, h, d, o.radius * 5);
        u.addColorStop(0, `rgba(198,220,255,${(c * 0.55).toFixed(3)})`), u.addColorStop(1, "rgba(198,220,255,0)"), t.fillStyle = u, t.beginPath(), t.arc(h, d, o.radius * 5, 0, P), t.fill();
      }
      t.fillStyle = `rgba(255,252,246,${c.toFixed(3)})`, t.beginPath(), t.arc(h, d, o.radius, 0, P), t.fill();
    }
    t.restore(), this.visibleCount = a;
  }
  recompute(t) {
    this.sinceRecompute = 0, this.lastLatitude = t.latitude, this.lastLongitude = t.longitude;
    const e = /* @__PURE__ */ new Date();
    for (let s = 0; s < Me.length; s++) {
      const i = Me[s], r = this.placed[s];
      if (!r)
        continue;
      const { altitude: a, azimuth: o } = Bs(
        i.ra,
        i.dec,
        t.latitude,
        t.longitude,
        e
      ), l = ne(a, o);
      r.x = l.x, r.y = l.y, r.visible = a > 2 && l.inView;
    }
  }
  destroy() {
    this.placed = [], this.visibleCount = 0;
  }
}
const Kn = 27162, xe = 460, Zn = 20;
class Jn {
  constructor() {
    this.name = "milkyway", this.patches = [], this.sinceRecompute = Number.POSITIVE_INFINITY, this.lastLatitude = Number.NaN, this.lastLongitude = Number.NaN, this.visibleCount = 0;
  }
  setup() {
    const t = B(Kn);
    this.patches = new Array(xe);
    for (let e = 0; e < xe; e++) {
      const s = e / xe * 360 + y(t, -1.5, 1.5), i = Ys(s), r = S(4.5, 13, i), a = y(t, -r, r) * y(t, 0.5, 1), o = 1 - g(Math.abs(a) / (r + 2)) ** 1.4, l = tr(s), h = er(s) && Math.abs(a) < 5.5 && t() < 0.55;
      this.patches[e] = {
        l: s,
        b: a,
        brightness: g(l * o * y(t, 0.55, 1)),
        // Small and numerous. Large patches read as separate discs, exactly
        // the way the old cloud blobs did.
        radius: y(t, 0.02, 0.046) * S(0.8, 1.25, i),
        rift: h,
        x: 0,
        y: 0,
        visible: !1
      };
    }
    this.sinceRecompute = Number.POSITIVE_INFINITY;
  }
  resize() {
  }
  particleCount() {
    return this.visibleCount;
  }
  render(t, e) {
    const s = e.moonVisible ? 0.45 : 0, i = g(e.nightFactor) ** 1.6 * (1 - g(e.weather.cloudCover) * 0.95) * (1 - s) * g(e.appearance.intensity);
    if (i <= 0.03) {
      this.visibleCount = 0;
      return;
    }
    this.sinceRecompute += e.dt, (this.sinceRecompute >= Zn || e.latitude !== this.lastLatitude || e.longitude !== this.lastLongitude) && this.recompute(e);
    const { width: r, height: a } = e, o = Math.min(r, a);
    let l = 0;
    t.save(), t.globalCompositeOperation = "lighter";
    for (const c of this.patches) {
      if (!c.visible || c.rift)
        continue;
      const h = c.brightness * i * 0.085;
      if (h <= 4e-3)
        continue;
      l++;
      const d = c.x * r + e.parallaxX * 0.15, u = c.y * a + e.parallaxY * 0.15, f = c.radius * o, p = t.createRadialGradient(d, u, 0, d, u, f);
      p.addColorStop(0, `rgba(203,214,242,${h.toFixed(4)})`), p.addColorStop(0.5, `rgba(178,192,229,${(h * 0.45).toFixed(4)})`), p.addColorStop(1, "rgba(160,176,220,0)"), t.fillStyle = p, t.beginPath(), t.arc(d, u, f, 0, P), t.fill();
    }
    t.globalCompositeOperation = "destination-out";
    for (const c of this.patches) {
      if (!c.visible || !c.rift)
        continue;
      const h = c.brightness * i * 0.055;
      if (h <= 4e-3)
        continue;
      const d = c.x * r + e.parallaxX * 0.15, u = c.y * a + e.parallaxY * 0.15, f = c.radius * o * 0.8, p = t.createRadialGradient(d, u, 0, d, u, f);
      p.addColorStop(0, `rgba(0,0,0,${h.toFixed(4)})`), p.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = p, t.beginPath(), t.arc(d, u, f, 0, P), t.fill();
    }
    t.restore(), this.visibleCount = l;
  }
  recompute(t) {
    this.sinceRecompute = 0, this.lastLatitude = t.latitude, this.lastLongitude = t.longitude;
    const e = /* @__PURE__ */ new Date();
    for (const s of this.patches) {
      const { ra: i, dec: r } = Wn(s.l, s.b), { altitude: a, azimuth: o } = Bs(
        i,
        r,
        t.latitude,
        t.longitude,
        e
      ), l = ne(a, o);
      s.x = l.x, s.y = l.y, s.visible = a > 4 && l.inView;
    }
  }
  destroy() {
    this.patches = [], this.visibleCount = 0;
  }
}
function Ys(n) {
  const t = Math.abs((G(n, 360) + 180) % 360 - 180);
  return g(1 - t / 110);
}
function tr(n) {
  const t = Ys(n), e = Math.abs((G(n - 80, 360) + 180) % 360 - 180), s = g(1 - e / 45) * 0.55;
  return g(0.22 + t * 0.85 + s);
}
function er(n) {
  const t = G(n, 360);
  return t > 10 && t < 80;
}
const sr = 31301, ls = 9, hs = 3;
class ir {
  constructor() {
    this.name = "sunrays", this.rays = [];
  }
  setup() {
    const t = B(sr);
    this.rays = new Array(ls);
    for (let e = 0; e < ls; e++)
      this.rays[e] = {
        angle: y(t, -1.25, 1.25),
        halfWidth: y(t, 0.018, 0.075),
        strength: y(t, 0.45, 1),
        driftSpeed: y(t, 0.012, 0.04),
        driftPhase: t() * P
      };
  }
  resize() {
  }
  particleCount() {
    return this.rays.length;
  }
  render(t, e) {
    const s = g(e.weather.cloudCover), i = g(Math.sin(Math.PI * g((s - 0.12) / 0.78))), r = 1 - g((e.sunElevation - 2) / 36), a = g((e.sunElevation + 1) / 5), o = i * S(0.35, 1, r) * a * g(e.weather.sunVisibility * 1.6) * g(e.appearance.intensity) * g(e.appearance.ambient_glow);
    if (o <= 0.01)
      return;
    const { width: l, height: c } = e, h = e.sunX * l, d = e.sunY * c, u = Math.hypot(l, c) * 1.4, f = e.palette.sunGlow;
    t.save(), t.globalCompositeOperation = "lighter", t.translate(h, d);
    for (const p of this.rays) {
      const m = e.reducedMotion ? 0 : Math.sin(e.time * p.driftSpeed + p.driftPhase) * 0.09, b = Math.PI / 2 + p.angle + m;
      for (let v = 0; v < hs; v++) {
        const w = (v + 1) / hs, C = p.halfWidth * S(0.45, 1.6, w), A = o * p.strength * 0.05 * (1 - w * 0.55);
        if (A <= 2e-3)
          continue;
        const $ = t.createLinearGradient(
          0,
          0,
          Math.cos(b) * u,
          Math.sin(b) * u
        );
        $.addColorStop(0, _(f, A)), $.addColorStop(0.35, _(f, A * 0.55)), $.addColorStop(1, _(f, 0)), t.fillStyle = $, t.beginPath(), t.moveTo(0, 0), t.lineTo(Math.cos(b - C) * u, Math.sin(b - C) * u), t.lineTo(Math.cos(b + C) * u, Math.sin(b + C) * u), t.closePath(), t.fill();
      }
    }
    t.restore();
  }
  destroy() {
    this.rays = [];
  }
}
const nr = 3846, cs = 3, ds = 512, us = 128, rr = 6 * 6 * 3;
class ar {
  constructor() {
    this.name = "fog", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.bands = [];
  }
  setup(t) {
    const e = B(nr);
    this.base = [];
    for (let i = 0; i < cs; i++)
      this.base.push(or(ds, us, e));
    this.tinted = [], this.tintValid = !1;
    const s = t.quality.fogLayers;
    this.bands = new Array(s);
    for (let i = 0; i < s; i++) {
      const r = s <= 1 ? 1 : i / (s - 1);
      this.bands[i] = {
        variant: i % cs,
        nx: e(),
        ny: S(0.5, 1.02, r) + y(e, -0.05, 0.05),
        thickness: S(0.18, 0.42, r) * y(e, 0.85, 1.2),
        speed: S(4e-3, 0.016, r) * y(e, 0.7, 1.4),
        alpha: S(0.5, 1, r) * y(e, 0.8, 1.1),
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
    const s = g(e.weather.fog) * g(e.appearance.intensity);
    if (s <= 0.02 || this.bands.length === 0)
      return;
    const i = e.palette.ambient;
    if (this.ensureTint(i), this.tinted.length === 0)
      return;
    const { width: r, height: a, dt: o } = e, l = e.reducedMotion ? 0.1 : 1;
    t.save();
    for (const d of this.bands) {
      d.nx = G(d.nx + d.speed * l * o, 1);
      const u = this.tinted[d.variant], f = d.thickness * a, p = Math.max(r * 1.6, f * (ds / us)), m = e.reducedMotion ? 0 : Math.sin(e.time * 0.07 + d.bobPhase) * a * 0.012, b = d.ny * a - f / 2 + m + e.parallaxY * 1.4, v = -d.nx * p + e.parallaxX * 1.4;
      t.globalAlpha = g(d.alpha * s * 0.55), t.drawImage(u, v, b, p, f), t.drawImage(u, v + p, b, p, f);
    }
    t.restore();
    const c = a * 0.55, h = t.createLinearGradient(0, c, 0, a);
    h.addColorStop(0, _(i, 0)), h.addColorStop(1, _(i, 0.32 * s)), t.fillStyle = h, t.fillRect(0, c, r, a - c);
  }
  ensureTint(t) {
    this.tintValid && K(t, this.tintColor) < rr || (this.tinted = this.base.map((e) => lr(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.bands = [], this.tintValid = !1;
  }
}
function or(n, t, e) {
  const s = document.createElement("canvas");
  s.width = n, s.height = t;
  const i = s.getContext("2d");
  if (!i)
    return s;
  const r = 14 + Math.floor(e() * 8);
  for (let o = 0; o < r; o++) {
    const l = e() * n, c = t * y(e, 0.3, 0.7), h = n * y(e, 0.08, 0.22), d = t * y(e, 0.3, 0.6), u = y(e, 0.1, 0.28), f = [0];
    l < h ? f.push(n) : l > n - h && f.push(-n);
    for (const p of f) {
      const m = l + p, b = i.createRadialGradient(m, c, 0, m, c, Math.max(h, d));
      b.addColorStop(0, `rgba(255,255,255,${u.toFixed(3)})`), b.addColorStop(0.6, `rgba(255,255,255,${(u * 0.4).toFixed(3)})`), b.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = b, i.beginPath(), i.ellipse(m, c, h, d, 0, 0, Math.PI * 2), i.fill();
    }
  }
  i.globalCompositeOperation = "destination-in";
  const a = i.createLinearGradient(0, 0, 0, t);
  return a.addColorStop(0, "rgba(0,0,0,0)"), a.addColorStop(0.35, "rgba(0,0,0,1)"), a.addColorStop(0.7, "rgba(0,0,0,1)"), a.addColorStop(1, "rgba(0,0,0,0)"), i.fillStyle = a, i.fillRect(0, 0, n, t), i.globalCompositeOperation = "source-over", s;
}
function lr(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const s = e.getContext("2d");
  return s && (s.drawImage(n, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = _(t), s.fillRect(0, 0, e.width, e.height), s.globalCompositeOperation = "destination-in", s.drawImage(n, 0, 0), s.globalCompositeOperation = "source-over"), e;
}
const hr = 10783, Tt = 3;
class cr {
  constructor() {
    this.name = "rain", this.drops = [], this.active = 0;
  }
  setup(t) {
    const e = B(hr), s = t.quality.rainParticles;
    this.drops = new Array(s);
    for (let i = 0; i < s; i++) {
      const r = i % Tt, a = r / (Tt - 1);
      this.drops[i] = {
        nx: e(),
        ny: e(),
        speed: S(0.75, 1.7, a) * y(e, 0.85, 1.15),
        length: S(0.02, 0.058, a) * y(e, 0.8, 1.3),
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
    const s = g(e.weather.rain) * g(e.appearance.intensity);
    if (s <= 0.01 || this.drops.length === 0) {
      this.active = 0;
      return;
    }
    const { width: i, height: r, dt: a } = e, o = Math.round(this.drops.length * s);
    this.active = o;
    const l = S(0.06, 0.5, g(e.weather.wind)) * (e.reducedMotion ? 0.3 : 1), c = e.reducedMotion ? 0.25 : 1, h = I(e.palette.ambient, [225, 238, 255], 0.62);
    for (let d = 0; d < Tt; d++) {
      const u = d / (Tt - 1);
      t.strokeStyle = _(h, S(0.11, 0.3, u) * s), t.lineWidth = S(0.7, 1.4, u), t.lineCap = "round", t.beginPath();
      for (let f = d; f < o; f += Tt) {
        const p = this.drops[f];
        p.ny += p.speed * c * a, p.nx += p.speed * l * c * a * (r / Math.max(1, i)), p.ny > 1.05 && (p.ny -= 1.1, p.nx = Math.random()), p.nx > 1.05 ? p.nx -= 1.1 : p.nx < -0.05 && (p.nx += 1.1);
        const m = p.nx * i, b = p.ny * r, v = p.length * r;
        t.moveTo(m, b), t.lineTo(m - v * l, b - v);
      }
      t.stroke();
    }
    this.renderGroundMist(t, e, s);
  }
  /** Spray hanging over the bottom edge – cheap, and it sells heavy rain. */
  renderGroundMist(t, e, s) {
    if (s < 0.35)
      return;
    const { width: i, height: r } = e, a = r * 0.82, o = (s - 0.35) / 0.65, l = t.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, _(e.palette.ambient, 0)), l.addColorStop(1, _(e.palette.ambient, 0.3 * o)), t.fillStyle = l, t.fillRect(0, a, i, r - a);
  }
  destroy() {
    this.drops.length = 0, this.active = 0;
  }
}
const dr = 6230212, kt = 3;
class ur {
  constructor() {
    this.name = "snow", this.flakes = [], this.active = 0;
  }
  setup(t) {
    const e = B(dr), s = t.quality.snowParticles;
    this.flakes = new Array(s);
    for (let i = 0; i < s; i++) {
      const r = i % kt, a = r / (kt - 1);
      this.flakes[i] = {
        nx: e(),
        ny: e(),
        speed: S(0.035, 0.14, a) * y(e, 0.8, 1.25),
        radius: S(16e-4, 5e-3, a) * y(e, 0.8, 1.3),
        driftAmplitude: y(e, 8e-3, 0.035) * S(0.6, 1.4, a),
        driftFrequency: y(e, 0.25, 0.8),
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
    const s = g(e.weather.snow) * g(e.appearance.intensity);
    if (s <= 0.01 || this.flakes.length === 0) {
      this.active = 0;
      return;
    }
    const { width: i, height: r, dt: a } = e, o = Math.min(i, r), l = Math.round(this.flakes.length * s);
    this.active = l;
    const c = e.reducedMotion ? 0.2 : 1, h = S(4e-3, 0.05, g(e.weather.wind)) * c, d = I(e.palette.ambient, [255, 255, 255], 0.85);
    for (let u = 0; u < kt; u++) {
      const f = u / (kt - 1);
      t.fillStyle = _(d, S(0.4, 0.85, f) * s), t.beginPath();
      for (let p = u; p < l; p += kt) {
        const m = this.flakes[p];
        m.ny += m.speed * c * a, m.nx += h * a, m.ny > 1.05 && (m.ny -= 1.1, m.nx = Math.random()), m.nx > 1.05 ? m.nx -= 1.1 : m.nx < -0.05 && (m.nx += 1.1);
        const b = e.reducedMotion ? 0 : Math.sin(e.time * m.driftFrequency + m.driftPhase) * m.driftAmplitude, v = (m.nx + b) * i, w = m.ny * r, C = m.radius * o;
        t.moveTo(v + C, w), t.arc(v, w, C, 0, P);
      }
      t.fill();
    }
  }
  destroy() {
    this.flakes.length = 0, this.active = 0;
  }
}
const ps = 45079;
class pr {
  constructor() {
    this.name = "lightning", this.rng = B(ps), this.strike = null, this.cooldown = 6;
  }
  setup() {
    this.rng = B(ps), this.strike = null, this.cooldown = y(this.rng, 4, 12);
  }
  resize() {
  }
  particleCount() {
    return this.strike ? 1 : 0;
  }
  render(t, e) {
    const s = g(e.weather.lightning) * g(e.appearance.intensity);
    if (s <= 0.02 || e.reducedMotion) {
      this.strike = null;
      return;
    }
    const { dt: i, width: r, height: a } = e;
    if (!this.strike) {
      if (this.cooldown -= i * s, this.cooldown > 0)
        return;
      this.strike = this.createStrike(e), this.cooldown = S(26, 3, s) * y(this.rng, 0.7, 1.4);
    }
    const o = this.strike;
    if (o.elapsed += i, o.elapsed > o.total) {
      this.strike = null;
      return;
    }
    let l = 0;
    for (const f of o.flashes) {
      const p = o.elapsed - f.at;
      if (p < 0 || p > f.duration)
        continue;
      const m = p / f.duration, b = m < 0.18 ? m / 0.18 : Math.pow(1 - (m - 0.18) / 0.82, 2);
      l = Math.max(l, f.peak * b);
    }
    if (l <= 4e-3)
      return;
    const c = o.x * r, h = o.y * a, d = Math.max(r, a) * 1.15;
    t.save(), t.globalCompositeOperation = "lighter";
    const u = t.createRadialGradient(c, h, 0, c, h, d);
    u.addColorStop(0, `rgba(214,228,255,${(l * 0.85).toFixed(4)})`), u.addColorStop(0.45, `rgba(188,206,246,${(l * 0.35).toFixed(4)})`), u.addColorStop(1, "rgba(170,190,240,0)"), t.fillStyle = u, t.fillRect(0, 0, r, a), o.bolt && e.quality.lightningBolts && o.elapsed <= o.boltVisibleUntil && l > 0.05 && this.drawBolt(t, e, o, l), t.restore();
  }
  createStrike(t) {
    const e = this.rng, s = 2 + Math.floor(e() * 3), i = [];
    let r = 0;
    for (let d = 0; d < s; d++) {
      const u = y(e, 0.09, 0.22);
      i.push({
        at: r,
        duration: u,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: d === 0 ? y(e, 0.18, 0.3) : y(e, 0.06, 0.14)
      }), r += u + y(e, 0.04, 0.16);
    }
    const a = y(e, 0.12, 0.88), o = y(e, 0.05, 0.3), c = t.quality.lightningBolts && e() < 0.55 ? fs(e, a, o, y(e, 0.55, 0.85)) : null, h = [];
    if (c) {
      const d = Math.floor(e() * 3);
      for (let u = 0; u < d; u++) {
        const f = c[1 + Math.floor(e() * (c.length - 2))];
        h.push(
          fs(e, f.x, f.y, f.y + y(e, 0.08, 0.22), 0.45)
        );
      }
    }
    return {
      elapsed: 0,
      total: r + 0.3,
      flashes: i,
      x: a,
      y: o,
      bolt: c,
      branches: h,
      boltVisibleUntil: i[0].duration * 1.6
    };
  }
  drawBolt(t, e, s, i) {
    const { width: r, height: a } = e, o = g(i * 4), l = (h) => {
      t.beginPath(), t.moveTo(h[0].x * r, h[0].y * a);
      for (let d = 1; d < h.length; d++)
        t.lineTo(h[d].x * r, h[d].y * a);
      t.stroke();
    }, c = Math.min(r, a);
    t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = `rgba(150,180,255,${(o * 0.28).toFixed(4)})`, t.lineWidth = Math.max(4, c * 0.012), s.bolt && l(s.bolt), t.strokeStyle = `rgba(240,246,255,${(o * 0.9).toFixed(4)})`, t.lineWidth = Math.max(1.2, c * 22e-4), s.bolt && l(s.bolt), t.strokeStyle = `rgba(225,235,255,${(o * 0.55).toFixed(4)})`, t.lineWidth = Math.max(1, c * 15e-4);
    for (const h of s.branches)
      l(h);
  }
  destroy() {
    this.strike = null;
  }
}
function fs(n, t, e, s, i = 1) {
  let r = [
    { x: t, y: e },
    { x: t + y(n, -0.06, 0.06) * i, y: s }
  ];
  for (let a = 0; a < 5; a++) {
    const o = [r[0]], l = 0.045 * i * Math.pow(0.62, a);
    for (let c = 1; c < r.length; c++) {
      const h = r[c - 1], d = r[c];
      o.push({
        x: (h.x + d.x) / 2 + y(n, -l, l),
        y: (h.y + d.y) / 2
      }), o.push(d);
    }
    r = o;
  }
  return r;
}
const fr = 128, mr = 13729298;
class gr {
  constructor() {
    this.name = "dither", this.pattern = null, this.tile = null;
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    !this.pattern && (this.tile = yr(fr), this.pattern = t.createPattern(this.tile, "repeat"), !this.pattern) || (t.save(), t.setTransform(1, 0, 0, 1, 0, 0), t.globalAlpha = 0.5, t.fillStyle = this.pattern, t.fillRect(0, 0, e.width * e.pixelRatio, e.height * e.pixelRatio), t.restore());
  }
  destroy() {
    this.pattern = null, this.tile = null;
  }
}
function yr(n) {
  const t = document.createElement("canvas");
  t.width = n, t.height = n;
  const e = t.getContext("2d");
  if (!e)
    return t;
  const s = e.createImageData(n, n), i = s.data, r = B(mr);
  for (let a = 0; a < i.length; a += 4) {
    const o = r() < 0.5 ? 255 : 0;
    i[a] = o, i[a + 1] = o, i[a + 2] = o, i[a + 3] = Math.round(r() * 3);
  }
  return e.putImageData(s, 0, 0), t;
}
class br {
  constructor(t, e, s) {
    this.sky = new Mn(), this.stars = new An(), this.milkyWay = new Jn(), this.constellations = new Qn(), this.sunRays = new ir(), this.moon = new En(), this.sun = new Tn(), this.clouds = new zn(), this.fog = new ar(), this.rain = new cr(), this.snow = new ur(), this.lightning = new pr(), this.dither = new gr(), this.reducedMotion = !1, this.parallaxTargetX = 0, this.parallaxTargetY = 0, this.parallaxX = 0, this.parallaxY = 0, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = s, this.renderers = [
      this.sky,
      this.milkyWay,
      this.stars,
      this.constellations,
      this.moon,
      this.sunRays,
      this.sun,
      this.clouds,
      this.fog,
      this.rain,
      this.snow,
      this.lightning,
      this.dither
    ], this.season = ns(/* @__PURE__ */ new Date(), s.latitude), this.blender = new _n(Ws(s.condition)), this.blender.snapTo(this.targetProfile()), this.elevation = s.sunElevation, this.azimuth = s.sunAzimuth, this.palette = _e({
      elevation: this.elevation,
      rising: s.sunRising,
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
    this.snapshot = t, this.season = ns(/* @__PURE__ */ new Date(), t.latitude), this.state.season = this.season, this.blender.setTarget(this.targetProfile());
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
    const t = wn(this.snapshot);
    return this.config.effects.season && (t.fog = g(t.fog + this.season.haze * 0.5)), t;
  }
  resize(t, e, s) {
    if (this.state.width = t, this.state.height = e, this.state.pixelRatio = s, !this.initialised) {
      for (const i of this.renderers)
        i.setup(this.state);
      this.initialised = !0;
    }
    for (const i of this.renderers)
      i.resize(this.state);
  }
  /** Skip the smoothing – used on the very first frame. */
  snapToTargets() {
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.parallaxX = this.parallaxTargetX, this.parallaxY = this.parallaxTargetY, this.blender.snapTo(this.targetProfile()), this.palette = _e({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
  }
  update(t, e) {
    const s = this.state;
    s.dt = t, s.time = e, this.elevation = Kt(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = vr(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const i = this.blender.update(t), r = _e({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: i,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
    this.palette = ln(this.palette, r, 0.6, t), this.config.effects.parallax && !this.reducedMotion ? (this.parallaxX = Kt(this.parallaxX, this.parallaxTargetX, 0.25, t), this.parallaxY = Kt(this.parallaxY, this.parallaxTargetY, 0.25, t)) : (this.parallaxX = 0, this.parallaxY = 0), s.parallaxX = this.parallaxX, s.parallaxY = this.parallaxY;
    const { dayFactor: a, nightFactor: o, twilightFactor: l } = Us(this.elevation);
    s.sunElevation = this.elevation, s.sunAzimuth = this.azimuth, s.sunRising = this.snapshot.sunRising, s.dayFactor = a, s.nightFactor = o, s.twilightFactor = l, s.palette = this.palette, s.weather = i, s.latitude = this.snapshot.latitude, s.longitude = this.snapshot.longitude;
    const c = ne(this.elevation, this.azimuth);
    s.sunX = os(c), s.sunY = c.y;
    const h = /* @__PURE__ */ new Date(), d = un(h), u = pn(h, this.snapshot.latitude, d), f = ne(
      u.altitude,
      // The moon model yields a position along the arc rather than a true
      // azimuth; feed it through the same 240° panorama.
      60 + g(u.azimuthFraction) * 240
    );
    s.moonPhase = d, s.moonX = os(f), s.moonY = f.y, s.moonVisible = this.config.effects.moon && u.altitude > 2 && o > 0.08 && d > 0.03 && d < 0.97;
  }
  render(t) {
    const e = this.state, s = this.config.effects;
    this.sky.render(t, e), s.milky_way && this.milkyWay.render(t, e), s.stars && this.stars.render(t, e), s.constellations && this.constellations.render(t, e), s.moon && this.moon.render(t, e), s.sun && this.sun.render(t, e), s.clouds && this.clouds.render(t, e), s.sun_rays && this.sunRays.render(t, e), s.fog && this.fog.render(t, e), s.rain && this.rain.render(t, e), s.snow && this.snow.render(t, e), s.lightning && this.lightning.render(t, e), this.dither.render(t, e);
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
function vr(n, t, e, s) {
  let i = (t - n + 540) % 360 - 180;
  const r = e <= 0 ? 1 : 1 - Math.pow(2, -s / e);
  return i *= r, (n + i + 360) % 360;
}
const wr = 400, Xt = 4 * 4 * 3, Sr = [
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
  "--aurora-surface-rgb",
  "--aurora-season",
  "--aurora-condition"
];
class _r {
  constructor() {
    this.last = null, this.lastWrite = 0, this.active = !1;
  }
  /** True while properties are on the document. */
  get isActive() {
    return this.active;
  }
  update(t, e = !1) {
    const s = performance.now();
    if (!e && s - this.lastWrite < wr)
      return;
    const i = {
      ambient: t.palette.ambient,
      sky: t.palette.middle,
      horizon: t.palette.horizon,
      accent: t.palette.sunGlow,
      glow: g(t.dayFactor * 0.6 + t.twilightFactor * 0.8),
      night: g(t.nightFactor)
    };
    if (!e && this.last && !this.changed(this.last, i)) {
      this.lastWrite = s;
      return;
    }
    this.lastWrite = s, this.last = i, this.active = !0;
    const r = document.documentElement.style, a = (c) => `${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}`;
    r.setProperty("--aurora-ambient-color", _(i.ambient)), r.setProperty("--aurora-ambient-rgb", a(i.ambient)), r.setProperty("--aurora-sky-color", _(i.sky)), r.setProperty("--aurora-horizon-color", _(i.horizon)), r.setProperty("--aurora-accent-color", _(i.accent)), r.setProperty("--aurora-accent-rgb", a(i.accent)), r.setProperty("--aurora-glow-strength", i.glow.toFixed(3)), r.setProperty("--aurora-night", i.night.toFixed(3)), r.setProperty("--aurora-day", (1 - i.night).toFixed(3));
    const o = gt(i.sky) > 140;
    r.setProperty("--aurora-contrast-color", o ? "#10151f" : "#f2f6ff");
    const l = I(i.ambient, o ? [12, 16, 24] : [235, 243, 255], 0.72);
    r.setProperty("--aurora-card-tint", _(l, o ? 0.5 : 0.14)), r.setProperty("--aurora-surface-rgb", a(l)), r.setProperty(
      "--aurora-card-border",
      _(o ? [255, 255, 255] : [255, 255, 255], o ? 0.28 : 0.16)
    ), r.setProperty("--aurora-season", t.season.name), r.setProperty("--aurora-condition", t.weather.condition);
  }
  changed(t, e) {
    return K(t.ambient, e.ambient) > Xt || K(t.sky, e.sky) > Xt || K(t.horizon, e.horizon) > Xt || K(t.accent, e.accent) > Xt || Math.abs(t.glow - e.glow) > 0.02 || Math.abs(t.night - e.night) > 0.02;
  }
  /** Remove every property again – called when the last Aurora card unmounts. */
  clear() {
    if (!this.active)
      return;
    const t = document.documentElement.style;
    for (const e of Sr)
      t.removeProperty(e);
    this.active = !1, this.last = null;
  }
}
const Cr = 500, ms = 5 * 5 * 3, gs = [
  "--ha-card-background",
  "--card-background-color",
  "--ha-card-backdrop-filter",
  "--ha-card-border-color",
  "--ha-card-border-width",
  "--ha-card-box-shadow",
  "--ha-card-border-radius",
  "--aurora-glass-surface",
  "--mdc-theme-surface"
], Mr = 0.96, Qt = ["--primary-text-color", "--secondary-text-color"];
class xr {
  constructor() {
    this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastOptions = "", this.lastWrite = 0, this.active = !1, this.textActive = !1, this.writtenSurface = "", this.lastWritten = /* @__PURE__ */ new Map(), this.observer = null, this.observedHosts = /* @__PURE__ */ new WeakSet(), this.probe = null, this.scopeHosts = /* @__PURE__ */ new Map(), this.warned = !1;
  }
  /**
   * Returns true when the active view actually changed (a view switch). Any
   * escalation found so far belonged to whatever view was active *then* and
   * may say nothing about this one — on `true`, the caller (AuroraLayer)
   * re-verifies immediately rather than waiting for the next poll, which is
   * exactly the wait that showed up as "briefly the wrong colour" after
   * switching to a view Aurora had not already escalated to.
   */
  setProbe(t) {
    return t === this.probe ? !1 : (this.probe = t, !0);
  }
  setDarkModeHint(t) {
    this.darkModeHint = t;
  }
  /**
   * Is the surrounding theme dark?
   *
   * Read from the theme's own primary text colour rather than from
   * `hass.themes.darkMode`, because a custom theme can be dark while Home
   * Assistant still reports light mode — and it is the text Aurora has to stay
   * readable against. Light text means a dark theme.
   *
   * Returns `null` when neither signal is available yet — the very first
   * calls on a cold dashboard load, before the theme has painted the probe
   * element and before `hass` has arrived with `themes.darkMode`. Guessing
   * dark here used to be the fallback, and it is wrong roughly half the time:
   * on a light theme, that produced one real paint with the wrong polarity —
   * a dark, translucent card, "like sunglasses" — immediately followed by the
   * correct light one a frame or two later once real data resolved. Reporting
   * "unknown" instead lets the caller skip writing anything until it has a
   * real answer, so there is only ever one paint, with the right polarity.
   */
  isDarkTheme() {
    const t = this.probe ?? document.documentElement, e = getComputedStyle(t).getPropertyValue("--primary-text-color"), s = kr(e);
    return s ? gt(s) > 128 : typeof this.darkModeHint == "boolean" ? this.darkModeHint : null;
  }
  /** `document` normally; `view` once Aurora had to escalate to beat a theme. */
  get scope() {
    return this.scopeHosts.size > 0 ? "view" : "document";
  }
  update(t, e, s = !1) {
    if (!e.enabled) {
      this.clear();
      return;
    }
    const i = performance.now();
    if (!s && i - this.lastWrite < Cr)
      return;
    const r = this.isDarkTheme();
    if (r === null)
      return;
    const a = I(
      t.palette.ambient,
      r ? [10, 13, 20] : [240, 245, 252],
      0.78
    ), o = t.palette.sunGlow, l = g(t.dayFactor * 0.5 + t.twilightFactor * 0.9 + t.nightFactor * 0.25) * e.glow, c = [
      e.blur,
      e.opacity,
      e.saturate,
      e.glow,
      e.radius,
      e.border,
      e.adaptive_text,
      e.contrast
    ].join("|");
    if (!s && this.lastSurface && this.lastAccent && c === this.lastOptions && K(this.lastSurface, a) < ms && K(this.lastAccent, o) < ms && Math.abs(this.lastGlow - l) < 0.03) {
      this.lastWrite = i;
      return;
    }
    this.lastWrite = i, this.lastSurface = a, this.lastAccent = o, this.lastGlow = l, this.lastOptions = c, this.active = !0, this.observe(document.documentElement);
    const h = this.targets(), d = $r(t.palette.middle, t.palette.lower), u = r ? [244, 248, 255] : [14, 19, 28], f = r ? 0.78 : 0.72, p = Tr(
      e.opacity,
      a,
      d,
      u,
      f,
      e.contrast
    ), m = _(a, p);
    this.writtenSurface = m, h.setProperty("--aurora-glass-surface", m), h.setProperty("--ha-card-background", m);
    const b = _(a, Mr);
    h.setProperty("--card-background-color", b), document.documentElement.style.setProperty(
      "--mdc-theme-surface",
      b,
      "important"
    ), this.lastWritten.set("--mdc-theme-surface", b), h.setProperty(
      "--ha-card-backdrop-filter",
      e.blur > 0 ? `blur(${e.blur}px) saturate(${e.saturate})` : "none"
    ), e.border ? (h.setProperty("--ha-card-border-width", "1px"), h.setProperty(
      "--ha-card-border-color",
      _(r ? [255, 255, 255] : [20, 26, 38], r ? 0.16 : 0.12)
    )) : (h.setProperty("--ha-card-border-width", "0px"), h.setProperty("--ha-card-border-color", "transparent"));
    const v = `0 6px 24px rgba(0,0,0,${(r ? 0.3 : 0.18).toFixed(3)})`, w = l > 0.01 ? `, 0 0 36px ${_(o, g(l * 0.16))}` : "";
    if (h.setProperty("--ha-card-box-shadow", v + w), e.radius >= 0 ? h.setProperty("--ha-card-border-radius", `${e.radius}px`) : h.removeProperty("--ha-card-border-radius"), e.adaptive_text) {
      const C = r ? [244, 248, 255] : [14, 19, 28], A = _(C), $ = _(C, r ? 0.78 : 0.72);
      for (const z of this.textTargets())
        z.setProperty("--primary-text-color", A), z.setProperty("--secondary-text-color", $);
      this.lastWritten.set("--primary-text-color", A), this.lastWritten.set("--secondary-text-color", $), this.textActive = !0;
    } else if (this.textActive) {
      for (const C of this.textTargets())
        for (const A of Qt)
          C.removeProperty(A);
      for (const C of Qt)
        this.lastWritten.delete(C);
      this.textActive = !1;
    }
  }
  /**
   * Where the text colours go.
   *
   * Preferably only the views Aurora escalated to — because `--primary-text-color`
   * reaches beyond cards into dialogs and the sidebar, and there is no
   * card-scoped equivalent. Scoping it to those views keeps the rest of Home
   * Assistant on the user's own theme. Without any scope host there is
   * nowhere narrower than the document to write.
   */
  textTargets() {
    const t = this.connectedScopeHosts();
    return t.length > 0 ? t.map((e) => e.style) : [document.documentElement.style];
  }
  connectedScopeHosts() {
    const t = [];
    for (const e of this.scopeHosts.keys())
      e.isConnected ? t.push(e) : this.scopeHosts.delete(e);
    return t;
  }
  /**
   * Every place the properties have to be written.
   *
   * Normally just `<html>`. Every view a theme was found shadowing Aurora on
   * joins the list — writing to all of them keeps cards in every such view
   * styled, not only whichever one happens to be visible right now.
   */
  targets() {
    const t = [
      document.documentElement.style,
      ...this.connectedScopeHosts().map((s) => s.style)
    ], e = this.lastWritten;
    return {
      setProperty(s, i) {
        e.set(s, i);
        for (const r of t)
          r.setProperty(s, i);
      },
      removeProperty(s) {
        e.delete(s);
        for (const i of t)
          i.removeProperty(s);
        return "";
      }
    };
  }
  /**
   * Starts watching `host`'s `style` attribute, if it isn't already. See the
   * `observer` field for why this exists.
   */
  observe(t) {
    this.observedHosts.has(t) || (this.observer || (this.observer = new MutationObserver(() => this.reassert())), this.observer.observe(t, { attributes: !0, attributeFilter: ["style"] }), this.observedHosts.add(t));
  }
  /**
   * Puts every property Aurora currently owns back to its last-written value,
   * on every host that's supposed to have it — but only where something has
   * actually drifted, so this is a no-op (one cheap read per property) on the
   * mutation events Aurora's own writes generate. See the `observer` field.
   */
  reassert() {
    if (!this.active || this.lastWritten.size === 0)
      return;
    const t = [document.documentElement, ...this.connectedScopeHosts()];
    let e = !1;
    t:
      for (const i of t)
        for (const [r, a] of this.lastWritten)
          if (ct(i.style.getPropertyValue(r)) !== ct(a)) {
            e = !0;
            break t;
          }
    if (!e)
      return;
    const s = this.targets();
    for (const [i, r] of this.lastWritten)
      s.setProperty(i, r);
  }
  /**
   * Check that what we wrote is what the cards actually see.
   *
   * Two different things can go wrong, and they need opposite responses:
   *
   *  - **Home Assistant overwrote us.** Applying a theme rewrites the same
   *    properties on the same element, and our change gate would happily skip
   *    the next write because *our* inputs did not change. Re-assert.
   *  - **Something closer to the cards wins.** A view-level theme is applied to
   *    the view element, which sits between `<html>` and every card in it, so
   *    its value shadows ours no matter how important our declaration is. That
   *    is not a fight we can win from the document, so Aurora finds that
   *    element and writes there as well.
   *
   * Returns true when either case fired, so the caller can force the *next*
   * `update()` call through immediately. Clearing the comparison cache alone
   * is not enough: `update()` also throttles on elapsed time regardless of
   * whether anything changed, so without an explicit force the correction
   * would only land once that clock — up to `MIN_INTERVAL_MS` after the last
   * write, unrelated to when this was detected — happened to run out. That
   * gap is exactly what showed up as cards sitting in the wrong colour for a
   * moment after every navigation.
   */
  verify() {
    if (!this.active || !this.writtenSurface)
      return !1;
    const t = document.documentElement.style;
    if (ct(t.getPropertyValue("--ha-card-background")) !== ct(this.writtenSurface))
      return this.lastOptions = "", this.lastSurface = null, !0;
    if (this.connectedScopeHosts(), !this.probe)
      return !1;
    const e = ct(
      getComputedStyle(this.probe).getPropertyValue("--ha-card-background")
    );
    if (e.length === 0 || e === ct(this.writtenSurface))
      return !1;
    const s = Pr(this.probe, "--ha-card-background");
    if (!s)
      return !1;
    if (this.scopeHosts.has(s))
      return this.lastOptions = "", this.lastSurface = null, !0;
    const i = /* @__PURE__ */ new Map();
    for (const r of [...gs, ...Qt]) {
      const a = s.style.getPropertyValue(r);
      a.length > 0 && i.set(r, a);
    }
    return this.scopeHosts.set(s, i), this.observe(s), this.lastOptions = "", this.lastSurface = null, this.warned || (this.warned = !0, console.info(
      '[Aurora UI] A theme on this view was overriding Aurora Glass — a view theme is applied closer to the cards than the document is. Aurora is now writing to that element as well. Set glass.enabled to false, or the preset to "plain", to hand the cards back to your theme.'
    )), !0;
  }
  /** Hand every managed property back to the user's theme. */
  clear() {
    if (!this.active && !this.textActive)
      return;
    const t = this.targets();
    for (const e of gs)
      t.removeProperty(e);
    if (this.textActive) {
      for (const e of this.textTargets())
        for (const s of Qt)
          e.removeProperty(s);
      this.textActive = !1;
    }
    for (const [e, s] of this.scopeHosts)
      if (e.isConnected)
        for (const [i, r] of s)
          e.style.setProperty(i, r);
    this.scopeHosts.clear(), this.observer?.disconnect(), this.observer = null, this.observedHosts = /* @__PURE__ */ new WeakSet(), this.lastWritten.clear(), this.active = !1, this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastOptions = "", this.writtenSurface = "";
  }
}
function ct(n) {
  return n.replace(/\s+/g, "").trim();
}
function $r(n, t) {
  return gt(n) >= gt(t) ? n : t;
}
function ys(n) {
  const t = (e) => {
    const s = g(e / 255);
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * t(n[0]) + 0.7152 * t(n[1]) + 0.0722 * t(n[2]);
}
function Ar(n, t) {
  const e = ys(n), s = ys(t), [i, r] = e > s ? [e, s] : [s, e];
  return (i + 0.05) / (r + 0.05);
}
const Er = 0.94;
function Tr(n, t, e, s, i, r) {
  if (r <= 0)
    return g(n);
  const a = (c) => {
    const h = I(e, t, c), d = I(h, s, i);
    return Ar(d, h) >= r;
  };
  let o = g(n);
  if (a(o))
    return o;
  let l = Er;
  if (!a(l))
    return l;
  for (let c = 0; c < 14; c++) {
    const h = (o + l) / 2;
    a(h) ? l = h : o = h;
  }
  return l;
}
let $e;
function kr(n) {
  const t = n.trim();
  if (!t)
    return null;
  $e === void 0 && ($e = document.createElement("canvas").getContext("2d"));
  const e = $e;
  if (!e)
    return null;
  e.fillStyle = "#000000", e.fillStyle = t;
  const s = e.fillStyle;
  if (e.fillStyle = "#ffffff", e.fillStyle = t, s !== e.fillStyle)
    return null;
  const i = String(s);
  if (i.startsWith("#"))
    return W(i);
  const r = i.match(/rgba?\(([^)]+)\)/);
  if (!r)
    return null;
  const a = r[1].split(",").map((o) => Number.parseFloat(o));
  return a.length < 3 || a.some((o) => !Number.isFinite(o)) ? null : [a[0], a[1], a[2]];
}
function Pr(n, t) {
  let e = n;
  for (let s = 0; s < 40 && e; s++) {
    if (e instanceof HTMLElement && e !== document.documentElement && e.style.getPropertyValue(t).trim().length > 0)
      return e;
    const i = e.parentNode;
    e = i instanceof ShadowRoot ? i.host : i;
  }
  return null;
}
const Or = (n) => `
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
class bs {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", Or(e)), t.appendChild(this.element);
  }
  update(t, e, s, i, r, a = "off") {
    const o = performance.now();
    if (o - this.lastUpdate < 250)
      return;
    this.lastUpdate = o;
    const l = [
      `AURORA BACKGROUND  v${ke}`,
      `fps          ${s.toFixed(0).padStart(3)}${r ? "  (paused)" : ""}`,
      `quality      ${t.quality.level}  ×${t.quality.renderScale} @dpr ${t.pixelRatio.toFixed(2)}`,
      `canvas       ${Math.round(t.width)}×${Math.round(t.height)}`,
      `particles    ${i}`,
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
      `glass        ${a}`,
      `reduced mo.  ${t.reducedMotion ? "yes" : "no"}`
    ];
    this.element.textContent = l.join(`
`);
  }
  destroy() {
    this.element.remove();
  }
}
const vs = 42e5, Rr = 0.06, ws = 0.012, Lr = 6e3, Ss = 120, Dr = 2e3;
class qs {
  /**
   * `exportsAmbient` is true only for the shared dashboard layer – two layers
   * writing `--aurora-*` on the document would fight each other.
   */
  constructor(t, e, s, i = !1) {
    this.host = t, this.debugOverlay = null, this.resizeObserver = null, this.intersectionObserver = null, this.motionQuery = null, this.cssWidth = 0, this.cssHeight = 0, this.pixelRatio = 1, this.resizePending = !1, this.visible = !0, this.documentVisible = !0, this.destroyed = !1, this.firstFrame = !0, this.environmentTimer = null, this.verifyTimer = null, this.glassVerifySettleUntil = 0, this.resolvedGlass = null, this.glassDirty = !1, this.scrollOffset = 0, this.pointerX = 0, this.pointerY = 0, this.onMotionPreferenceChange = (a) => {
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
      this.destroyed || (this.scene.setEnvironment(rs(this.hass, this.config)), this.resolveGlass(), this.engine.isRunning || this.renderOnce());
    }, this.frame = (a, o) => {
      if (this.destroyed || !this.ctx)
        return;
      const l = performance.now();
      this.firstFrame && (this.scene.snapToTargets(), this.firstFrame = !1), this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.update(a, o), this.scene.render(this.ctx);
      const c = performance.now() - l, h = this.performance.sample(a, c);
      h && this.applyQuality(h), this.ambient && this.config.background.ambient_variables && this.ambient.update(this.scene.sceneState), this.glass?.update(this.scene.sceneState, this.activeGlass, this.glassDirty), this.glassDirty = !1, this.debugOverlay && this.debugOverlay.update(
        this.scene.sceneState,
        this.scene.environment,
        this.performance.fps,
        this.scene.particleCount(),
        !1,
        this.glassStatus()
      );
    }, this.config = e, this.hass = s, this.ambient = i ? new _r() : null, this.glass = i ? new xr() : null, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1 });
    const r = this.resolveQuality();
    this.performance = new tn(
      r,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, xt(r).maxFps)
    ), this.scene = new br(
      e,
      xt(r),
      rs(s, e)
    ), this.engine = new Zi(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new bs(this.host, this.debugTopOffset())), this.updateRunState();
  }
  /* ---------------------------------------------------------------- *
   * Public API
   * ---------------------------------------------------------------- */
  updateConfig(t) {
    if (this.destroyed)
      return;
    const e = t.quality !== this.config.quality, s = t.debug !== this.config.debug, i = t.appearance.blur !== this.config.appearance.blur, r = t.appearance.opacity !== this.config.appearance.opacity;
    if (this.config = t, this.scene.setConfig(t), e) {
      const a = this.resolveQuality();
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.performance.setQuality(a), this.applyQuality(a);
    } else
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.applyFrameCap();
    (i || r) && this.applyCanvasFilter(), s && (t.debug && !this.debugOverlay ? this.debugOverlay = new bs(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.ambient && !t.background.ambient_variables && this.ambient.clear(), this.resolveGlass(), this.glass && !this.activeGlass.enabled && this.glass.clear(), this.pushParallax(), this.refreshEnvironment(), this.updateRunState();
  }
  /**
   * An element inside the Lovelace view, used to detect a view-level theme
   * winning over Aurora Glass. The card passes itself, and this is called
   * again on every view switch with that view's own card.
   *
   * A changed probe means a different view just became active, which may have
   * a theme Aurora has not seen before (or may need to reassert an escalation
   * from a view it saw earlier but has since fallen off the fast-polling
   * window). Checking immediately, rather than waiting for however much of
   * the poll interval happens to be left, is what keeps a view switch itself
   * from being the moment cards sit in the wrong colour.
   */
  setGlassProbe(t) {
    this.glass?.setProbe(t) && (this.restartGlassVerification(), this.glass.verify() && (this.glassDirty = !0, this.engine.isRunning || this.renderOnce()));
  }
  updateHass(t) {
    this.destroyed || (this.hass = t, this.glass?.setDarkModeHint(t?.themes?.darkMode), this.refreshEnvironment());
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
    return this.config.quality === "auto" ? si() : this.config.quality;
  }
  applyQuality(t) {
    const e = xt(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = xt(this.performance.quality);
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
    }), (typeof window.matchMedia != "function" || window.matchMedia("(pointer: fine)").matches) && window.addEventListener("pointermove", this.onPointerMove, { passive: !0 }), typeof window.matchMedia == "function" && (this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.scene.setReducedMotion(this.motionQuery.matches), typeof this.motionQuery.addEventListener == "function" ? this.motionQuery.addEventListener("change", this.onMotionPreferenceChange) : typeof this.motionQuery.addListener == "function" && this.motionQuery.addListener(this.onMotionPreferenceChange)), this.environmentTimer = window.setInterval(this.refreshEnvironment, 6e4), this.restartGlassVerification();
  }
  /**
   * (Re-)opens the fast polling window – see GLASS_VERIFY_*. Called once when
   * the layer is built, and again on every view switch (from `setGlassProbe`),
   * since a newly active view deserves the same fast attention a fresh page
   * load gets: it may have a theme Aurora has not dealt with yet.
   *
   * Discards whatever wait is currently pending — including a slow-cadence
   * one with up to `GLASS_VERIFY_SLOW_MS` left on it — and starts a fresh fast
   * chain immediately. `setGlassProbe` already checks synchronously the
   * moment a switch happens, which covers a theme that was already applied;
   * this covers one that lands moments later, which a stale pending wait
   * would otherwise have delayed by however long it had left.
   */
  restartGlassVerification() {
    if (!this.glass)
      return;
    this.glassVerifySettleUntil = performance.now() + Lr, this.verifyTimer !== null && (window.clearTimeout(this.verifyTimer), this.verifyTimer = null);
    const t = () => {
      if (this.destroyed)
        return;
      this.glass?.verify() && (this.glassDirty = !0, this.engine.isRunning || this.renderOnce());
      const e = performance.now() < this.glassVerifySettleUntil;
      this.verifyTimer = window.setTimeout(
        t,
        e ? Ss : Dr
      );
    };
    this.verifyTimer = window.setTimeout(t, Ss);
  }
  detachListeners() {
    this.resizeObserver?.disconnect(), this.resizeObserver = null, window.removeEventListener("resize", this.onResize), this.intersectionObserver?.disconnect(), this.intersectionObserver = null, document.removeEventListener("visibilitychange", this.onVisibilityChange), document.removeEventListener("scroll", this.onDocumentScroll, { capture: !0 }), window.removeEventListener("pointermove", this.onPointerMove), this.motionQuery && (typeof this.motionQuery.removeEventListener == "function" ? this.motionQuery.removeEventListener("change", this.onMotionPreferenceChange) : typeof this.motionQuery.removeListener == "function" && this.motionQuery.removeListener(this.onMotionPreferenceChange), this.motionQuery = null), this.environmentTimer !== null && (window.clearInterval(this.environmentTimer), this.environmentTimer = null), this.verifyTimer !== null && (window.clearTimeout(this.verifyTimer), this.verifyTimer = null);
  }
  pushParallax() {
    if (!this.config.effects.parallax) {
      this.scene.setParallaxTarget(0, 0);
      return;
    }
    const t = Math.max(1, Math.min(this.cssWidth, this.cssHeight));
    this.scene.setParallaxTarget(
      this.pointerX * t * ws,
      this.scrollOffset * t * Rr + this.pointerY * t * ws * 0.6
    );
  }
  /**
   * Apply an entity-driven surface preset, if one is configured.
   *
   * Resolved here rather than per frame: this allocates an object, and the
   * entity changes when somebody flips a dropdown, not sixty times a second.
   * When `preset_entity` names a valid preset it wins over the individual
   * numbers — switching a preset that then could not change the blur would be
   * a confusing control.
   */
  resolveGlass() {
    const t = this.config.glass, e = t.preset_entity;
    if (!e) {
      this.resolvedGlass = null;
      return;
    }
    const s = ut(this.hass?.states?.[e]?.state);
    if (!s) {
      this.resolvedGlass && (this.glassDirty = !0), this.resolvedGlass = null;
      return;
    }
    this.resolvedGlass?.preset !== s && (this.glassDirty = !0), this.resolvedGlass = {
      ...t,
      ...Te[s],
      preset: s,
      // `plain` is how the user turns the whole thing off from the dropdown.
      enabled: t.enabled && s !== "plain"
    };
  }
  /** One word for the debug overlay. */
  glassStatus() {
    if (!this.glass || !this.activeGlass.enabled)
      return "off";
    const t = this.activeGlass.preset;
    return this.glass.scope === "view" ? `${t} (view scope)` : t;
  }
  get activeGlass() {
    return this.resolvedGlass ?? this.config.glass;
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  /** Returns true when the backing store was reallocated. */
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), s = Math.max(1, Math.round(t.height)), i = xt(this.performance.quality);
    let a = Math.min(window.devicePixelRatio || 1, i.maxDpr) * i.renderScale;
    const o = e * s * a * a;
    o > vs && (a *= Math.sqrt(vs / o));
    const l = Math.max(1, Math.round(e * a)), c = Math.max(1, Math.round(s * a)), h = this.canvas.width !== l || this.canvas.height !== c || this.cssWidth !== e || this.cssHeight !== s;
    return this.cssWidth = e, this.cssHeight = s, this.pixelRatio = a, h && (this.canvas.width = l, this.canvas.height = c, this.scene.resize(e, s, a)), this.updateRunState(), h;
  }
  /**
   * Paint a single frame while the loop is stopped (resize, or new Home
   * Assistant state while the dashboard is hidden).
   *
   * There is no time passing here, so the usual damping would never converge –
   * a still frame always snaps straight to the current sun and weather.
   */
  renderOnce() {
    this.destroyed || !this.ctx || this.cssWidth === 0 || (this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.snapToTargets(), this.scene.update(0, this.scene.sceneState.time), this.scene.render(this.ctx), this.firstFrame = !1, this.ambient && this.config.background.ambient_variables && this.ambient.update(this.scene.sceneState, !0), this.glass?.update(this.scene.sceneState, this.activeGlass, !0), this.glassDirty = !1, this.debugOverlay?.update(
      this.scene.sceneState,
      this.scene.environment,
      this.performance.fps,
      this.scene.particleCount(),
      !0,
      this.glassStatus()
    ));
  }
}
const _s = "aurora-background-root", Cs = "aurora-background-style", Ir = 2500;
class zr {
  constructor() {
    this.root = null, this.styleElement = null, this.layer = null, this.owners = /* @__PURE__ */ new Map(), this.activeOwner = null, this.teardownTimer = null;
  }
  acquire(t, e, s) {
    this.teardownTimer !== null && (window.clearTimeout(this.teardownTimer), this.teardownTimer = null), this.owners.set(t, { config: e, hass: s }), this.activeOwner = t, this.ensureMounted(e), this.applyGlobalStyles(e), this.layer?.setGlassProbe(t instanceof HTMLElement ? t : null), this.layer?.updateConfig(e), this.layer?.updateHass(s);
  }
  update(t, e, s) {
    this.owners.has(t) && (this.owners.set(t, { config: e, hass: s }), this.activeOwner === t && (this.applyRootStyle(e), this.applyGlobalStyles(e), this.layer?.updateConfig(e), this.layer?.updateHass(s)));
  }
  updateHass(t, e) {
    const s = this.owners.get(t);
    s && (s.hass = e, this.activeOwner === t && this.layer?.updateHass(e));
  }
  release(t) {
    if (this.owners.delete(t)) {
      if (this.owners.size > 0) {
        const [e, s] = [...this.owners.entries()][0];
        this.activeOwner = e, this.applyRootStyle(s.config), this.applyGlobalStyles(s.config), this.layer?.updateConfig(s.config), this.layer?.updateHass(s.hass);
        return;
      }
      this.activeOwner = null, this.teardownTimer !== null && window.clearTimeout(this.teardownTimer), this.teardownTimer = window.setTimeout(() => {
        this.teardownTimer = null, this.teardown();
      }, Ir);
    }
  }
  teardown() {
    this.layer?.destroy(), this.layer = null, this.root?.remove(), this.root = null, this.styleElement?.remove(), this.styleElement = null;
  }
  ensureMounted(t) {
    if (!this.root) {
      document.getElementById(_s)?.remove();
      const e = document.createElement("div");
      e.id = _s, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new qs(this.root, t, e?.hass, !0);
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
    const e = Fr(t);
    if (!t.background.transparent_lovelace && e === "keep") {
      const a = Ms(t);
      this.writeStyle(a ? `:root{${a}}` : "");
      return;
    }
    const s = [], i = [];
    t.background.transparent_lovelace && (i.push("--lovelace-background:transparent !important"), i.push("--view-background:transparent !important"), i.push("--ha-view-background:transparent !important"), s.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), e === "transparent" ? (i.push("--app-header-background-color:transparent !important"), i.push("--app-header-border-bottom:none !important"), i.push("--app-header-box-shadow:none !important")) : e === "glass" && (i.push(
      "--app-header-background-color:rgba(var(--aurora-surface-rgb,22,26,36),0.55) !important"
    ), i.push(
      "--app-header-text-color:var(--aurora-contrast-color,#f2f6ff) !important"
    ), i.push("--app-header-border-bottom:none !important"), i.push("--app-header-box-shadow:none !important"), i.push(
      "--sidebar-background-color:rgba(var(--aurora-surface-rgb,22,26,36),0.82) !important"
    ));
    const r = Ms(t);
    r && i.push(r), i.length > 0 && s.unshift(`:root{${i.join(";")}}`), this.writeStyle(s.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(Cs)?.remove();
      const e = document.createElement("style");
      e.id = Cs, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function Fr(n) {
  return n.background.header !== "auto" ? n.background.header : n.glass.enabled ? "glass" : "transparent";
}
function Ms(n) {
  const t = Object.entries(n.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, s]) => `${e}:${s} !important`).join(";");
}
const Pt = new zr(), Nr = ot`
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
`, js = ot`
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
var Hr = Object.defineProperty, Gr = Object.getOwnPropertyDescriptor, Xs = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Gr(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && Hr(t, e, i), i;
};
const Ur = {
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
  milky_way: "Milky Way",
  sun_rays: "Sun rays",
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
  header: "Toolbar",
  ambient_variables: "Publish --aurora-* colours",
  z_index: "z-index",
  glass: "Aurora Glass (card styling)",
  enabled: "Enable glass cards",
  preset: "Preset",
  preset_entity: "Follow entity (live switching)",
  saturate: "Backdrop saturation",
  radius: "Corner radius (px)",
  adaptive_text: "Adaptive text colour"
};
function T(n) {
  return { name: n, selector: { boolean: {} } };
}
function N(n, t, e, s) {
  return { name: n, selector: { number: { min: t, max: e, step: s, mode: "slider" } } };
}
const Wr = [
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
  T("debug"),
  {
    name: "effects",
    type: "expandable",
    icon: "mdi:weather-partly-cloudy",
    schema: [
      {
        name: "",
        type: "grid",
        schema: [
          T("sun"),
          T("moon"),
          T("stars"),
          T("shooting_stars"),
          T("constellations"),
          T("milky_way"),
          T("sun_rays"),
          T("clouds"),
          T("fog"),
          T("rain"),
          T("snow"),
          T("lightning"),
          T("season"),
          T("parallax")
        ]
      }
    ]
  },
  {
    name: "appearance",
    type: "expandable",
    icon: "mdi:palette",
    schema: [
      N("intensity", 0, 2, 0.05),
      N("saturation", 0, 2, 0.05),
      N("brightness", 0.2, 2, 0.05),
      N("ambient_glow", 0, 2, 0.05),
      N("opacity", 0, 1, 0.05),
      N("blur", 0, 40, 1)
    ]
  },
  {
    name: "performance",
    type: "expandable",
    icon: "mdi:speedometer",
    schema: [
      N("max_fps", 10, 120, 1),
      T("auto_quality"),
      T("pause_when_hidden")
    ]
  },
  {
    name: "glass",
    type: "expandable",
    icon: "mdi:card-outline",
    schema: [
      T("enabled"),
      {
        name: "preset",
        selector: {
          select: {
            mode: "dropdown",
            options: ["glass", "frosted", "tinted", "outline", "minimal", "plain"]
          }
        }
      },
      { name: "preset_entity", selector: { entity: {} } },
      N("blur", 0, 60, 1),
      N("opacity", 0, 1, 0.05),
      N("saturate", 1, 3, 0.05),
      N("glow", 0, 2, 0.05),
      { name: "radius", selector: { number: { min: -1, max: 60, step: 1, mode: "box" } } },
      T("border"),
      T("adaptive_text")
    ]
  },
  {
    name: "background",
    type: "expandable",
    icon: "mdi:layers-outline",
    schema: [
      T("transparent_lovelace"),
      {
        name: "header",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Auto - follows Aurora Glass" },
              { value: "glass", label: "Glass - translucent, readable" },
              { value: "transparent", label: "Transparent" },
              { value: "keep", label: "Keep my theme" }
            ]
          }
        }
      },
      T("ambient_variables"),
      { name: "z_index", selector: { number: { min: -10, max: 10, step: 1, mode: "box" } } }
    ]
  }
];
class he extends H {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => Ur[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = $s(this.config);
    return {
      weather_entity: this.config.weather_entity ?? "",
      sun_entity: t.sun_entity ?? "",
      mode: t.mode,
      quality: t.quality,
      debug: t.debug,
      effects: { ...t.effects },
      appearance: { ...t.appearance },
      performance: { ...t.performance },
      glass: { ...t.glass, preset_entity: t.glass.preset_entity ?? "" },
      background: {
        transparent_lovelace: t.background.transparent_lovelace,
        header: t.background.header,
        ambient_variables: t.background.ambient_variables,
        z_index: t.background.z_index
      }
    };
  }
  render() {
    return customElements.get("ha-form") ? k`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${Wr}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : k`
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
    const s = {
      ...this.config,
      type: this.config.type ?? `custom:${ft}`,
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
    typeof e.weather_entity == "string" && e.weather_entity.length > 0 ? s.weather_entity = e.weather_entity : delete s.weather_entity, typeof e.sun_entity == "string" && e.sun_entity.length > 0 ? s.sun_entity = e.sun_entity : delete s.sun_entity, this.config = s, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
he.styles = js;
Xs([
  tt({ attribute: !1 })
], he.prototype, "hass", 2);
Xs([
  O()
], he.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", he);
var Vr = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, ce = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Br(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && Vr(t, e, i), i;
};
const Yr = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function qr(n, t = 30) {
  let e = n;
  for (let s = 0; s < t && e; s++) {
    if (e instanceof HTMLElement && Yr.includes(e.tagName))
      return !0;
    const i = e.parentNode;
    if (!i)
      break;
    e = i instanceof ShadowRoot ? i.host : i;
  }
  return !1;
}
class Ct extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = $s(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = Ee(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, s = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && s === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = s, this.config.mode === "background" ? Pt.updateHass(this, t) : this.cardLayer?.updateHass(t));
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
      type: `custom:${ft}`,
      weather_entity: Ee(t),
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
      this.isConnected && (this.editing = this.preview || qr(this));
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
      this.destroyCardLayer(), this.mounted ? Pt.update(this, t, this._hass) : (Pt.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (Pt.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new qs(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (Pt.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? k`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? k`<div class="surface"></div>` : this.editing ? k`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${ke} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : M : M;
  }
}
Ct.styles = Nr;
ce([
  tt({ type: Boolean })
], Ct.prototype, "preview", 2);
ce([
  O()
], Ct.prototype, "config", 2);
ce([
  O()
], Ct.prototype, "editing", 2);
ce([
  O()
], Ct.prototype, "errorMessage", 2);
customElements.get(ft) || customElements.define(ft, Ct);
var jr = Object.defineProperty, Xr = Object.getOwnPropertyDescriptor, Qs = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Xr(t, e) : t, r = n.length - 1, a; r >= 0; r--)
    (a = n[r]) && (i = (s ? a(t, e, i) : a(i)) || i);
  return s && i && jr(t, e, i), i;
};
const Qr = {
  entity: "Entity",
  name: "Name",
  icon: "Icon",
  slider: "Drag to adjust",
  use_light_color: "Tint with the light colour",
  show_modes: "Show mode buttons",
  style: "Surface style",
  blur: "Backdrop blur (px)",
  opacity: "Surface opacity",
  saturate: "Backdrop saturation",
  glow: "Ambient glow",
  radius: "Corner radius (px)",
  border: "Border"
};
class Mt extends H {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => Qr[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    return customElements.get("ha-form") ? k`
      <div class="hint">${this.hint}</div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData(this.config)}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : k`
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
    const s = {
      ...this.config,
      ...e,
      type: this.config.type ?? `custom:${this.cardType}`
    };
    for (const i of ["name", "icon"]) {
      const r = s;
      typeof r[i] == "string" && r[i].length === 0 && delete r[i];
    }
    this.config = s, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
}
Mt.styles = js;
Qs([
  tt({ attribute: !1 })
], Mt.prototype, "hass", 2);
Qs([
  O()
], Mt.prototype, "config", 2);
const Kr = [
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
class Zr extends Mt {
  get schema() {
    return Kr;
  }
  get cardType() {
    return bt;
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
const Jr = [
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
class ta extends Mt {
  get schema() {
    return Jr;
  }
  get cardType() {
    return yt;
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
const ea = [
  {
    name: "style",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "glass", label: "Glass — translucent, blurred" },
          { value: "frosted", label: "Frosted — heavier blur, more opaque" },
          { value: "tinted", label: "Tinted — solid, sky-coloured" },
          { value: "outline", label: "Outline — almost invisible surface" },
          { value: "minimal", label: "Minimal — flat, borderless, no glow" },
          { value: "plain", label: "Plain — hand back to the theme" }
        ]
      }
    }
  },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "blur", selector: { number: { min: 0, max: 60, step: 1, mode: "slider" } } },
      { name: "opacity", selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } } },
      { name: "saturate", selector: { number: { min: 1, max: 3, step: 0.05, mode: "slider" } } },
      { name: "glow", selector: { number: { min: 0, max: 2, step: 0.05, mode: "slider" } } }
    ]
  },
  { name: "radius", selector: { number: { min: -1, max: 80, step: 1, mode: "box" } } },
  { name: "border", selector: { boolean: {} } }
];
class sa extends Mt {
  get schema() {
    return ea;
  }
  get cardType() {
    return vt;
  }
  get hint() {
    return "Wraps another card in an Aurora surface. Set the wrapped card itself on the YAML tab.";
  }
  formData(t) {
    return {
      style: t.style ?? "glass",
      blur: t.blur ?? 14,
      opacity: t.opacity ?? 0.45,
      saturate: t.saturate ?? 1.4,
      glow: t.glow ?? 0.8,
      radius: t.radius ?? 18,
      border: t.border !== !1
    };
  }
}
customElements.get("aurora-style-editor") || customElements.define("aurora-style-editor", sa);
customElements.get("aurora-light-editor") || customElements.define("aurora-light-editor", Zr);
customElements.get("aurora-climate-editor") || customElements.define("aurora-climate-editor", ta);
const Ot = "https://github.com/iiNoNoNoii/Aurora-UI", ia = [
  {
    type: ft,
    name: Js,
    description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
    preview: !1,
    documentationURL: Ot
  },
  {
    type: bt,
    name: "Aurora Light",
    description: "Light tile that takes the bulb’s own colour. Drag for brightness, tap to toggle.",
    preview: !1,
    documentationURL: Ot
  },
  {
    type: yt,
    name: "Aurora Climate",
    description: "Thermostat with a large target temperature and a surface that warms with it.",
    preview: !1,
    documentationURL: Ot
  },
  {
    type: vt,
    name: "Aurora Style",
    description: "Wrap any existing card in an Aurora surface: glass, frosted, tinted or outline.",
    preview: !1,
    documentationURL: Ot
  },
  {
    type: Ht,
    name: "Aurora Layout",
    description: "Different cards and column counts for phone, tablet, desktop and wallpanel.",
    preview: !1,
    documentationURL: Ot
  }
], xs = window.customCards = window.customCards || [];
for (const n of ia)
  xs.some((t) => t.type === n.type) || xs.push(n);
console.info(
  `%c AURORA UI %c v${ke} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  Ct as AuroraBackgroundCard,
  he as AuroraBackgroundEditor,
  wt as AuroraClimateCard,
  lt as AuroraLayoutCard,
  St as AuroraLightCard,
  _t as AuroraStyleCard
};
