/*! Aurora UI v0.6.1-alpha | AGPL-3.0-or-later | Source: https://github.com/iiNoNoNoii/Aurora-UI */
const k = Math.PI * 2;
function M(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function m(s) {
  return M(s, 0, 1);
}
function _(s, t, e) {
  return s + (t - s) * e;
}
function Vi(s, t, e) {
  return s === t ? e < s ? 0 : 1 : m((e - s) / (t - s));
}
function Pt(s, t, e) {
  const i = Vi(s, t, e);
  return i * i * (3 - 2 * i);
}
function jt(s, t, e, i) {
  if (e <= 0)
    return t;
  const n = 1 - Math.pow(2, -i / e);
  return s + (t - s) * n;
}
function B(s) {
  let t = s >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let i = t;
    return i = Math.imul(i ^ i >>> 15, i | 1), i ^= i + Math.imul(i ^ i >>> 7, i | 61), ((i ^ i >>> 14) >>> 0) / 4294967296;
  };
}
function y(s, t, e) {
  return t + s() * (e - t);
}
function H(s, t) {
  const e = s % t;
  return e < 0 ? e + t : e;
}
function O(s) {
  return s * Math.PI / 180;
}
function ut(s) {
  return s * 180 / Math.PI;
}
const $e = {
  /** Translucent and blurred – the Aurora default. */
  glass: { blur: 14, opacity: 0.45, saturate: 1.4, glow: 0.8, radius: 18, border: !0 },
  /** Heavier blur, more opaque. Easier to read over a busy or bright sky. */
  frosted: { blur: 26, opacity: 0.72, saturate: 1.15, glow: 0.3, radius: 20, border: !0 },
  /** Solid, but still takes the sky's colour. No blur cost. */
  tinted: { blur: 0, opacity: 0.88, saturate: 1, glow: 0.5, radius: 16, border: !1 },
  /** Almost no surface: a hairline and a whisper of blur. */
  outline: { blur: 6, opacity: 0.1, saturate: 1.1, glow: 0.25, radius: 16, border: !0 },
  /** Flat, borderless, no glow. Quiet. */
  minimal: { blur: 10, opacity: 0.55, saturate: 1, glow: 0, radius: 14, border: !1 },
  /** Hand everything back to the user's theme. */
  plain: { blur: 0, opacity: 1, saturate: 1, glow: 0, radius: -1, border: !0 }
}, qi = {
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
function dt(s) {
  if (typeof s != "string")
    return null;
  const t = s.trim().toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
  return qi[t] ?? null;
}
const pt = "aurora-background", ji = "Aurora Background", Ae = "0.6.1-alpha", de = ["low", "medium", "high", "ultra"], Xi = ["background", "card"], Qi = {
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
function Ct(s) {
  return { ...Qi[s] };
}
function Le(s, t) {
  const e = de.indexOf(s);
  return de[M(e + t, 0, de.length - 1)];
}
function Ki() {
  if (typeof window > "u")
    return "medium";
  const s = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), i = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return s <= 2 || t <= 2 ? "low" : i && e <= 480 ? "medium" : i ? s >= 6 ? "high" : "medium" : s >= 8 && t >= 8 ? "high" : "medium";
}
function A(s, t) {
  return typeof s == "boolean" ? s : s === "true" ? !0 : s === "false" ? !1 : t;
}
function D(s, t, e, i) {
  const n = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(n) ? M(n, e, i) : t;
}
function De(s, t) {
  return typeof s == "string" && s.length > 0 ? s : t;
}
function ue(s, t, e) {
  return t.includes(s) ? s : e;
}
function Zi(s) {
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
const Ji = "sun.sun";
function _i(s) {
  const t = s ?? {}, e = t.effects ?? {}, i = t.appearance ?? {}, n = t.performance ?? {}, r = t.background ?? {}, a = typeof t.glass == "boolean" ? { enabled: t.glass } : typeof t.glass == "string" ? {
    enabled: dt(t.glass) !== "plain",
    preset: dt(t.glass) ?? "glass"
  } : t.glass ?? {}, o = dt(a.preset) ?? dt(a.style) ?? "glass", l = $e[o], c = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : Ji, h = ue(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: De(t.type, `custom:${pt}`),
    mode: ue(t.mode, Xi, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: c,
    quality: h,
    debug: A(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : De(t.height, "320px"),
    effects: {
      sun: A(e.sun, !0),
      moon: A(e.moon, !0),
      stars: A(e.stars, !0),
      shooting_stars: A(e.shooting_stars, !0),
      constellations: A(e.constellations, !0),
      milky_way: A(e.milky_way, !0),
      sun_rays: A(e.sun_rays, !0),
      clouds: A(e.clouds, !0),
      rain: A(e.rain, !0),
      snow: A(e.snow, !0),
      fog: A(e.fog, !0),
      lightning: A(e.lightning, !0),
      season: A(e.season, !0),
      parallax: A(e.parallax, !0)
    },
    appearance: {
      intensity: D(i.intensity, 1, 0, 2),
      saturation: D(i.saturation, 1, 0, 2),
      brightness: D(i.brightness, 1, 0.2, 2),
      blur: D(i.blur, 0, 0, 40),
      ambient_glow: D(i.ambient_glow, 1, 0, 2),
      opacity: D(i.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: D(n.max_fps, 60, 10, 120),
      auto_quality: A(n.auto_quality, !0),
      pause_when_hidden: A(n.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: A(r.transparent_lovelace, !0),
      // `transparent_header: true/false` from before 0.6.1 still works.
      header: ue(
        r.header,
        ["auto", "glass", "transparent", "keep"],
        r.transparent_header === !1 ? "keep" : "auto"
      ),
      css_variables: Zi(r.css_variables),
      z_index: D(r.z_index, -1, -100, 100),
      ambient_variables: A(r.ambient_variables, !0)
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: A(a.enabled, !1),
      preset: o,
      preset_entity: typeof a.preset_entity == "string" && a.preset_entity.length > 0 ? a.preset_entity : void 0,
      // An explicit number still beats the preset it came from.
      blur: D(a.blur, l.blur, 0, 60),
      opacity: D(a.opacity, l.opacity, 0, 1),
      saturate: D(a.saturate, l.saturate, 1, 3),
      border: A(a.border, l.border),
      glow: D(a.glow, l.glow, 0, 2),
      radius: D(a.radius, l.radius, -1, 80),
      adaptive_text: A(a.adaptive_text, !1)
    }
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = globalThis, Ee = Xt.ShadowRoot && (Xt.ShadyCSS === void 0 || Xt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Te = Symbol(), Ie = /* @__PURE__ */ new WeakMap();
let Si = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Te)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ee && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Ie.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ie.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ts = (s) => new Si(typeof s == "string" ? s : s + "", void 0, Te), ot = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((a) => {
    if (a._$cssResult$ === !0)
      return a.cssText;
    if (typeof a == "number")
      return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new Si(e, s, Te);
}, es = (s, t) => {
  if (Ee)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), n = Xt.litNonce;
      n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
    }
}, ze = Ee ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ts(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is, defineProperty: ss, getOwnPropertyDescriptor: ns, getOwnPropertyNames: rs, getOwnPropertySymbols: as, getPrototypeOf: os } = Object, Z = globalThis, Ne = Z.trustedTypes, ls = Ne ? Ne.emptyScript : "", hs = Z.reactiveElementPolyfillSupport, Rt = (s, t) => s, Zt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ls : null;
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
} }, ke = (s, t) => !is(s, t), Fe = { attribute: !0, type: String, converter: Zt, reflect: !1, useDefault: !1, hasChanged: ke };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ct = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Fe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && ss(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = ns(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: n, set(a) {
      const o = n?.call(this);
      r?.call(this, a), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Fe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Rt("elementProperties")))
      return;
    const t = os(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Rt("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Rt("properties"))) {
      const e = this.properties, i = [...rs(e), ...as(e)];
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
        e.unshift(ze(n));
    } else
      t !== void 0 && e.push(ze(t));
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
    return es(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Zt).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Zt;
      this._$Em = n;
      const o = a.fromAttribute(e, r.type);
      this[n] = o ?? this._$Ej?.get(n) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (r = this[t]), i ?? (i = a.getPropertyOptions(t)), !((i.hasChanged ?? ke)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, i))))
        return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: n, wrapped: r }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
          const { wrapped: a } = r, o = this[n];
          a !== !0 || this._$AL.has(n) || o === void 0 || this.C(n, void 0, r, o);
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
ct.elementStyles = [], ct.shadowRootOptions = { mode: "open" }, ct[Rt("elementProperties")] = /* @__PURE__ */ new Map(), ct[Rt("finalized")] = /* @__PURE__ */ new Map(), hs?.({ ReactiveElement: ct }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = globalThis, He = (s) => s, Jt = Ot.trustedTypes, Ge = Jt ? Jt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Ci = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, Mi = "?" + Q, cs = `<${Mi}>`, rt = document, Dt = () => rt.createComment(""), It = (s) => s === null || typeof s != "object" && typeof s != "function", Pe = Array.isArray, ds = (s) => Pe(s) || typeof s?.[Symbol.iterator] == "function", pe = `[ 	
\f\r]`, Mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ue = /-->/g, Be = />/g, it = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), We = /'/g, Ye = /"/g, xi = /^(?:script|style|textarea|title)$/i, us = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), T = us(1), at = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Ve = /* @__PURE__ */ new WeakMap(), nt = rt.createTreeWalker(rt, 129);
function $i(s, t) {
  if (!Pe(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ge !== void 0 ? Ge.createHTML(t) : t;
}
const ps = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Mt;
  for (let o = 0; o < e; o++) {
    const l = s[o];
    let c, h, d = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, h = a.exec(l), h !== null); )
      u = a.lastIndex, a === Mt ? h[1] === "!--" ? a = Ue : h[1] !== void 0 ? a = Be : h[2] !== void 0 ? (xi.test(h[2]) && (n = RegExp("</" + h[2], "g")), a = it) : h[3] !== void 0 && (a = it) : a === it ? h[0] === ">" ? (a = n ?? Mt, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? it : h[3] === '"' ? Ye : We) : a === Ye || a === We ? a = it : a === Ue || a === Be ? a = Mt : (a = it, n = void 0);
    const f = a === it && s[o + 1].startsWith("/>") ? " " : "";
    r += a === Mt ? l + cs : d >= 0 ? (i.push(c), l.slice(0, d) + Ci + l.slice(d) + Q + f) : l + Q + (d === -2 ? o : f);
  }
  return [$i(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class zt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, a = 0;
    const o = t.length - 1, l = this.parts, [c, h] = ps(t, e);
    if (this.el = zt.createElement(c, i), nt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = nt.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(Ci)) {
              const u = h[a++], f = n.getAttribute(d).split(Q), p = /([.?@])?(.*)/.exec(u);
              l.push({ type: 1, index: r, name: p[2], strings: f, ctor: p[1] === "." ? gs : p[1] === "?" ? ms : p[1] === "@" ? ys : ie }), n.removeAttribute(d);
            } else
              d.startsWith(Q) && (l.push({ type: 6, index: r }), n.removeAttribute(d));
        if (xi.test(n.tagName)) {
          const d = n.textContent.split(Q), u = d.length - 1;
          if (u > 0) {
            n.textContent = Jt ? Jt.emptyScript : "";
            for (let f = 0; f < u; f++)
              n.append(d[f], Dt()), nt.nextNode(), l.push({ type: 2, index: ++r });
            n.append(d[u], Dt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Mi)
          l.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(Q, d + 1)) !== -1; )
            l.push({ type: 7, index: r }), d += Q.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = rt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function ft(s, t, e = s, i) {
  if (t === at)
    return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = It(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = ft(s, n._$AS(s, t.values), n, i)), t;
}
class fs {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? rt).importNode(e, !0);
    nt.currentNode = n;
    let r = nt.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let c;
        l.type === 2 ? c = new Ft(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new bs(r, this, t)), this._$AV.push(c), l = i[++o];
      }
      a !== l?.index && (r = nt.nextNode(), a++);
    }
    return nt.currentNode = rt, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Ft {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = ft(this, t, e), It(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== at && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ds(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && It(this._$AH) ? this._$AA.nextSibling.data = t : this.T(rt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = zt.createElement($i(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n)
      this._$AH.p(e);
    else {
      const r = new fs(n, this), a = r.u(this.options);
      r.p(e), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ve.get(t.strings);
    return e === void 0 && Ve.set(t.strings, e = new zt(t)), e;
  }
  k(t) {
    Pe(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t)
      n === e.length ? e.push(i = new Ft(this.O(Dt()), this.O(Dt()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = He(t).nextSibling;
      He(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = C;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let a = !1;
    if (r === void 0)
      t = ft(this, t, e, 0), a = !It(t) || t !== this._$AH && t !== at, a && (this._$AH = t);
    else {
      const o = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        c = ft(this, o[i + l], e, l), c === at && (c = this._$AH[l]), a || (a = !It(c) || c !== this._$AH[l]), c === C ? t = C : t !== C && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class gs extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class ms extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class ys extends ie {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ft(this, t, e, 0) ?? C) === at)
      return;
    const i = this._$AH, n = t === C && i !== C || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== C && (i === C || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class bs {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ft(this, t);
  }
}
const vs = Ot.litHtmlPolyfillSupport;
vs?.(zt, Ft), (Ot.litHtmlVersions ?? (Ot.litHtmlVersions = [])).push("3.3.3");
const ws = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new Ft(t.insertBefore(Dt(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = globalThis;
let F = class extends ct {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ws(e, this.renderRoot, this.renderOptions);
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
F._$litElement$ = !0, F.finalized = !0, Lt.litElementHydrateSupport?.({ LitElement: F });
const _s = Lt.litElementPolyfillSupport;
_s?.({ LitElement: F });
(Lt.litElementVersions ?? (Lt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ss = { attribute: !0, type: String, converter: Zt, reflect: !1, hasChanged: ke }, Cs = (s = Ss, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(o) {
      const l = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(a, l, s, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, s, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(o) {
      const l = this[a];
      t.call(this, o), this.requestUpdate(a, l, s, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function tt(s) {
  return (t, e) => typeof e == "object" ? Cs(s, t, e) : ((i, n, r) => {
    const a = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), a ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(s) {
  return tt({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ms = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, xs = (s) => (...t) => ({ _$litDirective$: s, values: t });
let $s = class {
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
const Ai = "important", As = " !" + Ai, J = xs(class extends $s {
  constructor(s) {
    if (super(s), s.type !== Ms.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2)
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
        const r = typeof n == "string" && n.endsWith(As);
        i.includes("-") || r ? e.setProperty(i, r ? n.slice(0, -11) : n, r ? Ai : "") : e[i] = n;
      }
    }
    return at;
  }
});
function Y(s) {
  let t = s.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function S(s, t = 1) {
  const e = Math.round(M(s[0], 0, 255)), i = Math.round(M(s[1], 0, 255)), n = Math.round(M(s[2], 0, 255));
  return t >= 1 ? `rgb(${e},${i},${n})` : `rgba(${e},${i},${n},${M(t, 0, 1).toFixed(3)})`;
}
function I(s, t, e) {
  return [_(s[0], t[0], e), _(s[1], t[1], e), _(s[2], t[2], e)];
}
function se(s) {
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}
function Es(s, t) {
  const e = se(s);
  return I(s, [e, e, e], M(t, 0, 1));
}
function fe(s, t) {
  return [M(s[0] * t, 0, 255), M(s[1] * t, 0, 255), M(s[2] * t, 0, 255)];
}
function Ts(s, t) {
  const e = se(s);
  return [
    M(e + (s[0] - e) * t, 0, 255),
    M(e + (s[1] - e) * t, 0, 255),
    M(e + (s[2] - e) * t, 0, 255)
  ];
}
const Ei = new Float32Array(256);
for (let s = 0; s < 256; s++) {
  const t = s / 255;
  Ei[s] = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
function ge(s) {
  const t = Math.round(M(s, 0, 255));
  return Ei[t];
}
function me(s) {
  const t = M(s, 0, 1);
  return (t <= 31308e-7 ? t * 12.92 : 1.055 * Math.pow(t, 1 / 2.4) - 0.055) * 255;
}
function ks(s) {
  return [ge(s[0]), ge(s[1]), ge(s[2])];
}
function Ps(s) {
  return [me(s[0]), me(s[1]), me(s[2])];
}
function K(s, t) {
  const e = s[0] - t[0], i = s[1] - t[1], n = s[2] - t[2];
  return e * e + i * i + n * n;
}
const Ti = ot`
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
`, Rs = 6;
class ki {
  constructor(t) {
    this.options = t, this.element = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.dragging = !1, this.holdTimer = null, this.holdFired = !1, this.onPointerDown = (e) => {
      this.options.isDisabled?.() || !this.element || e.button !== 0 || (this.pointerId = e.pointerId, this.startX = e.clientX, this.startY = e.clientY, this.dragging = !1, this.holdFired = !1, this.element.addEventListener("pointermove", this.onPointerMove), this.element.addEventListener("pointerup", this.onPointerUp), this.element.addEventListener("pointercancel", this.onPointerUp), this.options.onHold && (this.holdTimer = window.setTimeout(() => {
        this.holdTimer = null, !this.dragging && (this.holdFired = !0, this.options.onHold?.());
      }, this.options.holdDelay ?? 500)));
    }, this.onPointerMove = (e) => {
      if (!(e.pointerId !== this.pointerId || !this.element)) {
        if (!this.dragging) {
          if ((this.options.axis === "x" ? Math.abs(e.clientX - this.startX) : Math.abs(e.clientY - this.startY)) < Rs)
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
function Os(s, t, e) {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function Pi(s, t) {
  Os(s, "hass-more-info", { entityId: t });
}
function Ri(s, t) {
  if (!(!s || !t))
    return s.states[t];
}
function U(s) {
  return !s || s.state === "unavailable" || s.state === "unknown";
}
function V(s, t) {
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
function Me(s, t) {
  const e = s?.attributes?.[t];
  return typeof e == "string" ? e : null;
}
function Oi(s, t) {
  const e = s?.attributes?.[t];
  return Array.isArray(e) ? e.filter((i) => typeof i == "string") : [];
}
function Li(s, t) {
  const e = Me(s, "friendly_name");
  if (e)
    return e;
  const i = s?.entity_id ?? t ?? "";
  return (i.split(".")[1] ?? i).replace(/_/g, " ").replace(/\b\w/g, (r) => r.toUpperCase());
}
function qe(s, t) {
  const e = t < 1 ? 1 : 0, i = s.toFixed(e);
  return e > 0 && i.endsWith(".0") ? i.slice(0, -2) : i;
}
function te(s, t, e, i) {
  s?.callService?.(t, e, i);
}
function je(s) {
  const t = Math.max(1e3, Math.min(4e4, s)) / 100;
  let e, i, n;
  t <= 66 ? (e = 255, i = 99.4708025861 * Math.log(t) - 161.1195681661) : (e = 329.698727446 * Math.pow(t - 60, -0.1332047592), i = 288.1221695283 * Math.pow(t - 60, -0.0755148492)), t >= 66 ? n = 255 : t <= 19 ? n = 0 : n = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const r = (a) => Math.max(0, Math.min(255, a));
  return [r(e), r(i), r(n)];
}
var Ls = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, ne = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ds(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Ls(t, e, n), n;
};
const gt = "aurora-climate", Is = [86, 158, 232], ye = [150, 176, 200], zs = [246, 152, 74], Ns = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, be = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan running",
  idle: "Idle",
  off: "Off",
  preheating: "Preheating"
};
class bt extends F {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingTarget = null, this.drag = new ki({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragMove(t, !0),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || U(this.entity) || !this.config.slider
    }), this.sendTimer = null, this.clearPendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-climate: you need to set an "entity"');
    if (!t.entity.startsWith("climate."))
      throw this.errorMessage = `"${t.entity}" is not a climate entity.`, new Error(`aurora-climate: "${t.entity}" is not a climate entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${gt}`,
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
    return { type: `custom:${gt}`, entity: e ?? "climate.example" };
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
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(U(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return Ri(this.hass, this.config?.entity);
  }
  get minTemp() {
    return V(this.entity, "min_temp") ?? 7;
  }
  get maxTemp() {
    return V(this.entity, "max_temp") ?? 35;
  }
  get step() {
    return V(this.entity, "target_temp_step") ?? 0.5;
  }
  get unit() {
    return Me(this.entity, "temperature_unit") ?? this.hass?.config?.unit_system?.temperature ?? "°C";
  }
  get currentTemp() {
    return V(this.entity, "current_temperature");
  }
  get target() {
    return this.pendingTarget !== null ? this.pendingTarget : V(this.entity, "temperature");
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
    if (this.entity?.state === "off" || U(this.entity))
      return ye;
    const t = this.targetFraction;
    return t < 0.5 ? I(Is, ye, t * 2) : I(ye, zs, (t - 0.5) * 2);
  }
  get hvacModes() {
    return Oi(this.entity, "hvac_modes");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  roundToStep(t) {
    const e = this.step, i = Math.round(t / e) * e, n = e < 1 ? 1 : 0;
    return Number(M(i, this.minTemp, this.maxTemp).toFixed(n));
  }
  onDragMove(t, e = !1) {
    const i = this.roundToStep(_(this.minTemp, this.maxTemp, t));
    this.pendingTarget = i, e ? this.sendTarget(i, 0) : this.sendTarget(i, 400);
  }
  adjust(t) {
    if (!this.config || U(this.entity))
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
      this.sendTimer = null, te(this.hass, "climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: t
      }), this.clearPendingTimer !== null && window.clearTimeout(this.clearPendingTimer), this.clearPendingTimer = window.setTimeout(() => {
        this.pendingTarget = null, this.clearPendingTimer = null;
      }, 2e3);
    };
    e <= 0 ? i() : this.sendTimer = window.setTimeout(i, e);
  }
  setHvacMode(t) {
    this.config && te(this.hass, "climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: t
    });
  }
  openMoreInfo() {
    this.config && Pi(this, this.config.entity);
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
    if (U(t))
      return "Unavailable";
    const e = Me(t, "hvac_action");
    return e && be[e] ? be[e] : be[t.state] ?? t.state.replace(/_/g, " ");
  }
  render() {
    if (this.errorMessage)
      return T`<div class="error">Aurora Climate: ${this.errorMessage}</div>`;
    if (!this.config)
      return C;
    const t = this.entity, e = U(t), i = this.accent, n = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.target, a = this.currentTemp, o = this.unit, l = this.hvacModes, c = J({
      "--aurora-climate-rgb": n
    });
    return T`
      <ha-card style=${c}>
        <div class="fill"></div>
        <div class="content">
          <div class="header">
            <button
              class="icon-button"
              type="button"
              aria-label="More information"
              style=${J({ color: S(i) })}
              @click=${this.openMoreInfo}
            >
              <ha-icon .icon=${this.config.icon ?? "mdi:thermostat"}></ha-icon>
            </button>
            <div class="labels">
              <div class="name">${this.config.name ?? Li(t, this.config.entity)}</div>
              <div class="state">
                ${a !== null ? `Currently ${qe(a, 0.1)} ${o}` : "No sensor reading"}
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
              ${r !== null ? T`
                    <span class="number">${qe(r, this.step)}</span
                    ><span class="unit">${o}</span>
                  ` : T`<span class="number">--</span>`}
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

          ${this.config.show_modes && l.length > 0 ? T`
                <div class="modes">
                  ${l.map(
      (h) => T`
                      <button
                        class="mode"
                        type="button"
                        aria-pressed=${String(t?.state === h)}
                        aria-label=${h.replace(/_/g, " ")}
                        title=${h.replace(/_/g, " ")}
                        ?disabled=${e}
                        @click=${() => this.setHvacMode(h)}
                      >
                        <ha-icon .icon=${Ns[h] ?? "mdi:tune"}></ha-icon>
                      </button>
                    `
    )}
                </div>
              ` : C}
        </div>
      </ha-card>
    `;
  }
}
bt.styles = [
  Ti,
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
ne([
  tt({ attribute: !1 })
], bt.prototype, "hass", 2);
ne([
  P()
], bt.prototype, "config", 2);
ne([
  P()
], bt.prototype, "errorMessage", 2);
ne([
  P()
], bt.prototype, "pendingTarget", 2);
customElements.get(gt) || customElements.define(gt, bt);
var Fs = Object.defineProperty, Hs = Object.getOwnPropertyDescriptor, re = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Hs(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Fs(t, e, n), n;
};
const mt = "aurora-light", Xe = [255, 197, 122], Qe = 1;
class vt extends F {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingBrightness = null, this.drag = new ki({
      axis: "x",
      onMove: (t) => this.onDragMove(t),
      onCommit: (t) => this.onDragCommit(t),
      onTap: () => this.toggle(),
      onHold: () => this.openMoreInfo(),
      isDisabled: () => !this.config || U(this.entity)
    }), this.pendingTimer = null;
  }
  setConfig(t) {
    if (!t?.entity)
      throw this.errorMessage = 'You need to set an "entity".', new Error('aurora-light: you need to set an "entity"');
    if (!t.entity.startsWith("light."))
      throw this.errorMessage = `"${t.entity}" is not a light entity.`, new Error(`aurora-light: "${t.entity}" is not a light entity`);
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${mt}`,
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
    return { type: `custom:${mt}`, entity: e ?? "light.example" };
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
    e && this.config?.slider ? this.drag.attach(e) : this.drag.detach(), this.dataset.unavailable = String(U(this.entity));
  }
  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */
  get entity() {
    return Ri(this.hass, this.config?.entity);
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
    const t = V(this.entity, "brightness");
    return t === null ? 100 : M(Math.round(t / 255 * 100), 0, 100);
  }
  /** The light's real colour, or a warm white when it has none. */
  get lightColor() {
    if (!this.config?.use_light_color)
      return Xe;
    const t = this.entity?.attributes?.rgb_color;
    if (Array.isArray(t) && t.length >= 3) {
      const [n, r, a] = t;
      if ([n, r, a].every((o) => typeof o == "number" && Number.isFinite(o)))
        return [n, r, a];
    }
    const e = V(this.entity, "color_temp_kelvin");
    if (e !== null)
      return je(e);
    const i = V(this.entity, "color_temp");
    return i !== null && i > 0 ? je(1e6 / i) : Xe;
  }
  get supportsBrightness() {
    const t = Oi(this.entity, "supported_color_modes");
    return t.length === 0 ? V(this.entity, "brightness") !== null : !(t.length === 1 && t[0] === "onoff");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  onDragMove(t) {
    this.supportsBrightness && (this.pendingBrightness = M(
      Math.round(t * 100),
      Qe,
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
    const e = M(Math.round(t * 100), Qe, 100);
    this.pendingBrightness = e, te(this.hass, "light", "turn_on", {
      entity_id: this.config.entity,
      brightness_pct: e
    }), this.clearPendingTimer(), this.pendingTimer = window.setTimeout(() => {
      this.pendingBrightness = null, this.pendingTimer = null;
    }, 1500);
  }
  toggle() {
    !this.config || U(this.entity) || (te(this.hass, "light", "toggle", { entity_id: this.config.entity }), this.pendingBrightness = null, this.clearPendingTimer());
  }
  openMoreInfo() {
    this.config && Pi(this, this.config.entity);
  }
  clearPendingTimer() {
    this.pendingTimer !== null && (window.clearTimeout(this.pendingTimer), this.pendingTimer = null);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  stateText() {
    const t = this.entity;
    return t ? U(t) ? "Unavailable" : this.isOn ? this.supportsBrightness ? `${this.brightnessPercent}%` : "On" : "Off" : "Entity not found";
  }
  render() {
    if (this.errorMessage)
      return T`<div class="error">Aurora Light: ${this.errorMessage}</div>`;
    if (!this.config)
      return C;
    const t = this.entity, e = !t, i = this.lightColor, n = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.brightnessPercent, a = this.isOn && !e, o = this.config.icon ?? (a ? "mdi:lightbulb" : "mdi:lightbulb-outline"), l = J({
      "--aurora-light-rgb": n,
      "--aurora-light-glow": a ? String(m(0.25 + r / 100 * 0.55)) : "0",
      "--aurora-icon-alpha": a ? "0.3" : "0.12",
      "--aurora-icon-color": a ? S(i) : "inherit"
    }), c = a && this.supportsBrightness && this.config.slider;
    return T`
      <ha-card style=${l}>
        <div class="glow"></div>
        ${c ? T`
              <div
                class="fill"
                style=${J({ transform: `scaleX(${(r / 100).toFixed(4)})` })}
              ></div>
              <div class="edge" style=${J({ left: `${r}%` })}></div>
            ` : C}
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
            <div class="name">${this.config.name ?? Li(t, this.config.entity)}</div>
            <div class="state">${this.stateText()}</div>
          </div>
          ${a && this.supportsBrightness ? T`<div class="value">${r}%</div>` : C}
        </div>
      </ha-card>
    `;
  }
  onIconClick(t) {
    t.stopPropagation(), this.toggle();
  }
}
vt.styles = [
  Ti,
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
re([
  tt({ attribute: !1 })
], vt.prototype, "hass", 2);
re([
  P()
], vt.prototype, "config", 2);
re([
  P()
], vt.prototype, "errorMessage", 2);
re([
  P()
], vt.prototype, "pendingBrightness", 2);
customElements.get(mt) || customElements.define(mt, vt);
let ve = null;
function Gs() {
  return ve || (ve = typeof window.loadCardHelpers == "function" ? window.loadCardHelpers().catch(() => null) : Promise.resolve(null)), ve;
}
function Bt(s) {
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
  ), t.textContent = s, t.setConfig = () => {
  }, t;
}
async function Di(s, t) {
  const e = typeof s?.type == "string" ? s.type : "";
  if (!e)
    return Bt('Aurora: a card needs a "type".');
  const i = await Gs();
  try {
    if (i) {
      const n = await i.createCardElement(s);
      return t && (n.hass = t), n;
    }
    if (e.startsWith("custom:")) {
      const n = e.slice(7), r = document.createElement(n);
      return typeof r.setConfig != "function" ? Bt(`Aurora: custom element "${n}" is not loaded.`) : (r.setConfig(s), t && (r.hass = t), r);
    }
    return Bt(`Aurora: cannot create "${e}" on this Home Assistant version.`);
  } catch (n) {
    const r = n instanceof Error ? n.message : String(n);
    if (i?.createErrorCardElement)
      try {
        return i.createErrorCardElement(r, s);
      } catch {
      }
    return Bt(`Aurora: ${r}`);
  }
}
async function Ii(s) {
  try {
    const t = await s.getCardSize?.();
    return typeof t == "number" && Number.isFinite(t) ? t : 1;
  } catch {
    return 1;
  }
}
var Us = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, ae = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Bs(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Us(t, e, n), n;
};
const yt = "aurora-style";
class wt extends F {
  constructor() {
    super(...arguments), this.errorMessage = null, this.childConfigKey = "";
  }
  setConfig(t) {
    if (!t?.card || typeof t.card != "object")
      throw this.errorMessage = 'You need to set a "card".', new Error('aurora-style: you need to set a "card"');
    const e = dt(t.style) ?? "glass", i = $e[e];
    this.errorMessage = null, this.config = {
      type: t.type ?? `custom:${yt}`,
      style: e,
      card: t.card,
      blur: xt(t.blur, i.blur, 0, 60),
      opacity: xt(t.opacity, i.opacity, 0, 1),
      saturate: xt(t.saturate, i.saturate, 1, 3),
      glow: xt(t.glow, i.glow, 0, 2),
      radius: xt(t.radius, i.radius, -1, 80),
      border: typeof t.border == "boolean" ? t.border : i.border
    };
    const n = JSON.stringify(t.card);
    n !== this.childConfigKey && (this.childConfigKey = n, this.buildChild());
  }
  async getCardSize() {
    return this.child ? Ii(this.child) : 1;
  }
  getGridOptions() {
    return this.child?.getGridOptions?.() ?? { rows: "auto", columns: "full" };
  }
  static getStubConfig() {
    return {
      type: `custom:${yt}`,
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
    const e = await Di(t.card, this.hass);
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
    const e = `rgba(var(--aurora-surface-rgb, 22, 26, 36), ${t.opacity})`, i = t.glow > 0.01 ? `0 6px 22px rgba(0,0,0,0.22), 0 0 34px rgba(var(--aurora-accent-rgb, 255,255,255), ${(t.glow * 0.14).toFixed(3)})` : "0 6px 22px rgba(0,0,0,0.22)", n = {
      "--ha-card-background": e,
      "--card-background-color": e,
      "--ha-card-backdrop-filter": t.blur > 0 ? `blur(${t.blur}px) saturate(${t.saturate})` : "none",
      "--ha-card-box-shadow": i,
      "--ha-card-border-width": t.border ? "1px" : "0px",
      "--ha-card-border-color": t.border ? "var(--aurora-card-border, rgba(255,255,255,0.16))" : "transparent"
    };
    return t.radius >= 0 && (n["--ha-card-border-radius"] = `${t.radius}px`), n;
  }
  render() {
    return this.errorMessage ? T`<div class="error">Aurora Style: ${this.errorMessage}</div>` : this.config ? T`
      <div class="wrapper" style=${J(this.surfaceStyles())}>${this.child ?? C}</div>
    ` : C;
  }
}
wt.styles = ot`
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
ae([
  tt({ attribute: !1 })
], wt.prototype, "hass", 2);
ae([
  P()
], wt.prototype, "config", 2);
ae([
  P()
], wt.prototype, "child", 2);
ae([
  P()
], wt.prototype, "errorMessage", 2);
function xt(s, t, e, i) {
  const n = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(n) ? M(n, e, i) : t;
}
customElements.get(yt) || customElements.define(yt, wt);
var Ws = Object.defineProperty, Ys = Object.getOwnPropertyDescriptor, Ht = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ys(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Ws(t, e, n), n;
};
const Nt = "aurora-layout", Ke = ["mobile", "tablet", "desktop", "wide"], Wt = { mobile: 600, tablet: 1e3, desktop: 1600 }, Vs = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  wide: 4
};
class lt extends F {
  constructor() {
    super(...arguments), this.device = "desktop", this.childCards = [], this.errorMessage = null, this.resizeObserver = null, this.measuredWidth = 0, this.builtKey = "", this.buildToken = 0, this.onResize = () => {
      this.measure();
    };
  }
  setConfig(t) {
    const e = Array.isArray(t?.cards) ? t.cards : [], i = t?.layouts ?? {};
    if (!(e.length > 0 || Ke.some((o) => (i[o]?.cards?.length ?? 0) > 0)))
      throw this.errorMessage = 'You need "cards", or cards inside at least one layout.', new Error('aurora-layout: you need "cards", or cards inside a layout');
    const r = {
      mobile: $t(t?.breakpoints?.mobile, Wt.mobile, 200, 4e3),
      tablet: $t(t?.breakpoints?.tablet, Wt.tablet, 200, 5e3),
      desktop: $t(t?.breakpoints?.desktop, Wt.desktop, 200, 8e3)
    }, a = {};
    for (const o of Ke) {
      const l = i[o] ?? {};
      a[o] = {
        columns: Math.round($t(l.columns, Vs[o], 1, 12)),
        cards: Array.isArray(l.cards) ? l.cards : void 0,
        gap: typeof l.gap == "number" ? M(l.gap, 0, 64) : void 0
      };
    }
    this.errorMessage = null, this.config = {
      type: t?.type ?? `custom:${Nt}`,
      cards: e,
      gap: $t(t?.gap, 12, 0, 64),
      breakpoints: r,
      layouts: a
    }, this.builtKey = "", this.rebuildIfNeeded();
  }
  async getCardSize() {
    if (this.childCards.length === 0)
      return 1;
    const t = await Promise.all(this.childCards.map((n) => Ii(n))), e = this.activeLayout?.columns ?? 1, i = t.reduce((n, r) => n + r, 0);
    return Math.max(1, Math.ceil(i / Math.max(1, e)));
  }
  getGridOptions() {
    return { rows: "auto", columns: "full" };
  }
  static getStubConfig() {
    return {
      type: `custom:${Nt}`,
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
    const e = this.config?.breakpoints ?? Wt, i = t < e.mobile ? "mobile" : t < e.tablet ? "tablet" : t < e.desktop ? "desktop" : "wide";
    i !== this.device && (this.device = i);
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
    const i = t.layouts[this.device].cards ?? t.cards, n = JSON.stringify(i);
    if (n === this.builtKey)
      return;
    this.builtKey = n;
    const r = ++this.buildToken, a = await Promise.all(i.map((o) => Di(o, this.hass)));
    r === this.buildToken && (this.childCards = a);
  }
  render() {
    if (this.errorMessage)
      return T`<div class="error">Aurora Layout: ${this.errorMessage}</div>`;
    if (!this.config)
      return C;
    const t = this.config.layouts[this.device], e = t.gap ?? this.config.gap;
    return this.childCards.length === 0 ? T`
        <div class="empty">
          Aurora Layout (${this.device}) — no cards for this device class.
        </div>
      ` : T`
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
Ht([
  tt({ attribute: !1 })
], lt.prototype, "hass", 2);
Ht([
  P()
], lt.prototype, "config", 2);
Ht([
  P()
], lt.prototype, "device", 2);
Ht([
  P()
], lt.prototype, "childCards", 2);
Ht([
  P()
], lt.prototype, "errorMessage", 2);
function $t(s, t, e, i) {
  const n = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(n) ? M(n, e, i) : t;
}
customElements.get(Nt) || customElements.define(Nt, lt);
class qs {
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
const js = ["low", "medium", "high", "ultra"];
function Ze(s) {
  return js.indexOf(s);
}
class Xs {
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
    const n = [...this.frameTimes].sort((o, l) => o - l), r = n[Math.floor(n.length / 2)], a = 1e3 / this.targetFps;
    if (r > a * 0.55) {
      const o = Le(this.level, -1);
      if (o !== this.level)
        return this.level = o, this.ceiling = o, this.frameTimes.length = 0, o;
    } else if (r < a * 0.18) {
      const o = Le(this.level, 1);
      if (o !== this.level && Ze(o) <= Ze(this.ceiling))
        return this.level = o, this.frameTimes.length = 0, o;
    }
    return null;
  }
}
function X(s, t) {
  return {
    elevation: s,
    palette: {
      zenith: Y(t.zenith),
      upper: Y(t.upper),
      middle: Y(t.middle),
      lower: Y(t.lower),
      horizon: Y(t.horizon),
      sunCore: Y(t.sunCore),
      sunGlow: Y(t.sunGlow),
      ambient: Y(t.ambient),
      cloud: Y(t.cloud)
    }
  };
}
const st = [
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
], Re = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], Qs = [255, 118, 162], Ks = [255, 138, 56];
function Zs(s, t, e) {
  const i = {};
  for (const n of Re)
    i[n] = I(s[n], t[n], e);
  return i;
}
function Js(s) {
  if (s <= st[0].elevation)
    return { ...st[0].palette };
  const t = st[st.length - 1];
  if (s >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < st.length - 1; e++) {
    const i = st[e], n = st[e + 1];
    if (s >= i.elevation && s <= n.elevation) {
      const r = Pt(i.elevation, n.elevation, s);
      return Zs(i.palette, n.palette, r);
    }
  }
  return { ...t.palette };
}
function zi(s) {
  const t = Pt(-4, 8, s), e = 1 - Pt(-14, -2, s), i = Pt(-16, -3, s) * (1 - Pt(0, 10, s));
  return { dayFactor: t, nightFactor: e, twilightFactor: i };
}
const tn = {
  zenith: 0.15,
  upper: 0.3,
  middle: 0.55,
  lower: 0.85,
  horizon: 1,
  sunCore: 0.2,
  sunGlow: 0.6,
  ambient: 0.8,
  cloud: 0.5
}, en = 0.1;
function we(s) {
  const { elevation: t, rising: e, weather: i, appearance: n, season: r } = s, a = Js(t), { twilightFactor: o, dayFactor: l } = zi(t), c = e ? Qs : Ks, h = o * 0.3, d = {}, u = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, f = m(i.desaturation) * 0.8, p = 1 - m(i.skyDarkness) * 0.75, g = r ? en * (0.35 + 0.65 * l) : 0, v = r ? r.saturation : 1;
  for (const b of Re) {
    let w = I(a[b], c, h * u[b]);
    r && g > 0 && (w = I(w, r.tint, g * tn[b])), w = Es(w, f), w = fe(w, p), w = Ts(w, n.saturation * v), w = fe(w, n.brightness), d[b] = w;
  }
  return d.cloud = fe(d.cloud, _(1, 0.32, m(i.cloudDarkness))), d;
}
function sn(s, t, e, i) {
  const n = e <= 0 ? 1 : 1 - Math.pow(2, -i / e), r = {};
  for (const a of Re)
    r[a] = I(s[a], t[a], n);
  return r;
}
const Je = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: 3 * Math.PI / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1 }
}, ti = ["summer", "autumn", "winter", "spring"];
function nn(s) {
  const t = new Date(s.getFullYear(), 0, 0);
  return Math.floor((s.getTime() - t.getTime()) / 864e5);
}
function ei(s, t) {
  const e = (nn(s) - 172) / 365.25 * k, i = t < 0 ? e + Math.PI : e;
  let n = 0;
  const r = { summer: 0, autumn: 0, winter: 0, spring: 0 };
  for (const f of ti) {
    const p = Math.max(0, Math.cos(i - Je[f].centre)), g = p * p;
    r[f] = g, n += g;
  }
  n <= 0 && (n = 1);
  let a = 0, o = 0, l = 0, c = 0, h = 0, d = "summer", u = -1;
  for (const f of ti) {
    const p = r[f] / n, g = Je[f];
    a += g.tint[0] * p, o += g.tint[1] * p, l += g.tint[2] * p, c += g.haze * p, h += g.saturation * p, p > u && (u = p, d = f);
  }
  return {
    name: d,
    /** −1 at midwinter, +1 at midsummer. */
    warmth: Math.cos(i),
    tint: [a, o, l],
    haze: m(c),
    saturation: h
  };
}
function rn(s) {
  return s.getTime() / 864e5 - 10957.5;
}
function an(s, t, e) {
  const i = rn(s), n = O(357.5291 + 0.98560028 * i), r = O(280.459 + 0.98564736 * i) + O(1.9148) * Math.sin(n) + O(0.02) * Math.sin(2 * n), a = O(23.4393 - 3563e-10 * i), o = Math.asin(Math.sin(a) * Math.sin(r)), l = Math.atan2(
    Math.cos(a) * Math.sin(r),
    Math.cos(r)
  ), h = O(280.16 + 360.9856235 * i) + O(e) - l, d = O(t), u = Math.sin(d) * Math.sin(o) + Math.cos(d) * Math.cos(o) * Math.cos(h), f = Math.asin(Math.max(-1, Math.min(1, u))), p = Math.atan2(
    Math.sin(h),
    Math.cos(h) * Math.sin(d) - Math.tan(o) * Math.cos(d)
  ), g = h + O(360.9856235 * (10 / 1440)), v = Math.sin(d) * Math.sin(o) + Math.cos(d) * Math.cos(o) * Math.cos(g);
  return {
    elevation: ut(f),
    azimuth: H(ut(p) + 180, 360),
    rising: v > u
  };
}
function on(s) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, i = s.getTime() / 864e5 - e;
  return H(i / t, 1);
}
function ln(s, t, e) {
  const r = (s.getHours() + s.getMinutes() / 60 + s.getSeconds() / 3600 - 12) / 24 * k - e * k, a = 70 - Math.min(55, Math.abs(t) * 0.55), o = Math.cos(r) * a, l = (Math.sin(r) + 1) / 2;
  return { altitude: o, azimuthFraction: l };
}
const hn = [
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
], cn = {
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
function dn(s) {
  if (!s)
    return "unknown";
  const t = s.toLowerCase().trim();
  return hn.includes(t) ? t : cn[t] ?? "unknown";
}
const un = {
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
}, pn = {
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
function Ni(s) {
  return { condition: s, ...un, ...pn[s] };
}
const fn = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function Yt(s) {
  if (typeof s == "number" && Number.isFinite(s))
    return s;
  if (typeof s == "string") {
    const t = Number.parseFloat(s);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function xe(s) {
  if (s) {
    for (const t of Object.keys(s.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function ii(s, t, e = /* @__PURE__ */ new Date()) {
  const i = s?.config?.latitude ?? 51.2, n = s?.config?.longitude ?? 6.8;
  let r = null, a = null, o = null, l = "computed";
  const c = t.sun_entity, h = c ? s?.states?.[c] : void 0;
  if (h) {
    const b = Yt(h.attributes.elevation), w = Yt(h.attributes.azimuth);
    b !== null && (r = b, a = w, o = typeof h.attributes.rising == "boolean" ? h.attributes.rising : null, l = "sun.sun");
  }
  if (r === null || a === null || o === null) {
    const b = an(e, i, n);
    r === null && (r = b.elevation), a === null && (a = b.azimuth), o === null && (o = b.rising), l !== "sun.sun" && (l = "computed");
  }
  const d = t.weather_entity ?? xe(s), u = d ? s?.states?.[d] : void 0;
  let f = "unknown", p = null, g = null, v = !1;
  if (u && u.state !== "unavailable" && u.state !== "unknown") {
    f = dn(u.state), v = !0;
    const b = Yt(u.attributes.cloud_coverage);
    b !== null && (p = m(b / 100));
    const w = Yt(u.attributes.wind_speed);
    if (w !== null) {
      const x = String(
        u.attributes.wind_speed_unit ?? s?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), R = w * (fn[x] ?? 1);
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
    longitude: n,
    sunSource: l,
    weatherEntity: d ?? null,
    weatherAvailable: v
  };
}
function gn(s) {
  const t = Ni(s.condition);
  return s.cloudCoverage !== null && (t.cloudCover = _(t.cloudCover, s.cloudCoverage, 0.85), t.sunVisibility = Math.min(t.sunVisibility, 1 - s.cloudCoverage * 0.85)), s.wind !== null && (t.wind = _(t.wind, s.wind, 0.7)), t;
}
const mn = [
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
class yn {
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
    for (const i of mn)
      this.current[i] = jt(this.current[i], this.target[i], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
const si = 24, bn = [0, 0.28, 0.55, 0.82, 1];
class vn {
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
    const { palette: i, width: n, height: r } = e, a = [
      Math.round(r),
      i.zenith.join(),
      i.upper.join(),
      i.middle.join(),
      i.lower.join(),
      i.horizon.join()
    ].join("|");
    (!this.gradient || a !== this.cacheKey) && (this.gradient = this.buildGradient(t, i, r), this.cacheKey = a), t.fillStyle = this.gradient, t.fillRect(0, 0, n, r);
    const o = t.createLinearGradient(0, 0, 0, r * 0.45), l = m(0.12 + e.weather.skyDarkness * 0.2);
    o.addColorStop(0, `rgba(0,0,0,${l.toFixed(3)})`), o.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = o, t.fillRect(0, 0, n, r * 0.45);
  }
  buildGradient(t, e, i) {
    const n = [
      e.zenith,
      e.upper,
      e.middle,
      e.lower,
      e.horizon
    ].map(ks), r = t.createLinearGradient(0, 0, 0, i);
    for (let a = 0; a < si; a++) {
      const o = a / (si - 1);
      r.addColorStop(o, S(Ps(wn(n, bn, o))));
    }
    return r;
  }
  destroy() {
    this.gradient = null;
  }
}
function wn(s, t, e) {
  const i = s.length - 1;
  if (e <= t[0])
    return s[0];
  if (e >= t[i])
    return s[i];
  let n = 0;
  for (; n < i - 1 && e > t[n + 1]; )
    n++;
  const r = t[n], a = t[n + 1], o = a - r || 1, l = (e - r) / o, c = [0, 0, 0];
  for (let h = 0; h < 3; h++) {
    const d = s[n][h], u = s[n + 1][h], f = s[Math.max(0, n - 1)][h], p = s[Math.min(i, n + 2)][h], g = t[Math.max(0, n - 1)], v = t[Math.min(i, n + 2)], b = (u - f) / (a - g || 1) * o, w = (p - d) / (v - r || 1) * o, x = l * l, R = x * l;
    c[h] = (2 * R - 3 * x + 1) * d + (R - 2 * x + l) * b + (-2 * R + 3 * x) * u + (R - x) * w;
  }
  return [c[0], c[1], c[2]];
}
const _n = 6221137;
class Sn {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = B(_n), i = t.quality.starCount;
    this.stars = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = Math.pow(e(), 1.6) * 0.82;
      this.stars[n] = {
        nx: e(),
        ny: r,
        radius: y(e, 0.4, 1.5),
        baseAlpha: y(e, 0.35, 1),
        twinkleSpeed: y(e, 0.4, 2.2),
        twinklePhase: e() * k,
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
    const { width: n, height: r } = e, a = !e.reducedMotion, o = e.parallaxX * 0.15, l = e.parallaxY * 0.15;
    t.save();
    for (let c = 0; c < this.stars.length; c++) {
      const h = this.stars[c], d = h.nx * n + o, u = h.ny * r + l;
      let f = h.baseAlpha * i;
      if (a) {
        const b = Math.sin(e.time * h.twinkleSpeed + h.twinklePhase);
        f *= 0.62 + 0.38 * b;
      }
      if (f <= 0.02)
        continue;
      const p = 255, g = 245 + Math.round(h.tint * 8), v = 225 + Math.round((1 - h.tint) * 30);
      t.fillStyle = `rgba(${p},${g},${v},${f.toFixed(3)})`, h.radius <= 0.7 ? t.fillRect(d, u, 1, 1) : (t.beginPath(), t.arc(d, u, h.radius, 0, k), t.fill());
    }
    t.restore(), e.effects.shooting_stars && e.quality.shootingStars && !e.reducedMotion && this.updateShootingStars(t, e, i);
  }
  updateShootingStars(t, e, i) {
    const { width: n, height: r, dt: a } = e;
    if (this.nextShootingStar -= a, this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const o = 380 + Math.random() * 320, l = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * n * 0.8,
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
      const c = l.life / l.maxLife, h = Math.sin(c * Math.PI) * i, d = l.vx === 0 && l.vy === 0 ? 0 : l.vx, u = Math.hypot(d, l.vy) || 1, f = l.x - d / u * l.length, p = l.y - l.vy / u * l.length, g = t.createLinearGradient(l.x, l.y, f, p);
      g.addColorStop(0, `rgba(255,255,255,${h.toFixed(3)})`), g.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = g, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(f, p), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class Cn {
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
    const n = Math.min(e.width, e.height), r = Math.max(12, n * 0.035), a = Math.ceil(r * 2 + 4), o = this.ensureBuffer(a);
    if (!o || !this.buffer)
      return;
    const l = Math.round(e.moonPhase * 200) / 200;
    l !== this.drawnPhase && (this.drawMoon(o, a, r, l), this.drawnPhase = l);
    const c = e.moonX * e.width + e.parallaxX * 0.12, h = e.moonY * e.height + e.parallaxY * 0.12;
    t.save(), t.globalCompositeOperation = "lighter";
    const d = r * 5, u = 0.14 * i * e.appearance.ambient_glow, f = t.createRadialGradient(c, h, r * 0.6, c, h, d);
    f.addColorStop(0, `rgba(200,220,255,${u.toFixed(3)})`), f.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = f, t.beginPath(), t.arc(c, h, d, 0, k), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = i, t.drawImage(this.buffer, c - a / 2, h - a / 2), t.restore();
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
    o.addColorStop(0, "#fffdf3"), o.addColorStop(0.75, "#eceadd"), o.addColorStop(1, "#cfd3cc"), t.fillStyle = o, t.beginPath(), t.arc(r, a, i, 0, k), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const l = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, u, f] of l)
      t.beginPath(), t.arc(r + d * i, a + u * i, f * i, 0, k), t.fill();
    const c = (1 - Math.cos(n * k)) / 2;
    if (c < 0.99) {
      const u = n < 0.5, f = Math.abs(1 - c * 2) * i;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(r, a, i + 1, -Math.PI / 2, Math.PI / 2, u);
      const p = u ? c < 0.5 : c >= 0.5;
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
    const h = t.createRadialGradient(r, a, i * 0.88, r, a, i);
    h.addColorStop(0, "rgba(0,0,0,1)"), h.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = h, t.fillRect(0, 0, e, e), t.restore();
  }
  destroy() {
    this.buffer = null, this.bufferCtx = null, this.bufferSize = 0;
  }
}
class Mn {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: i, width: n, height: r, appearance: a } = e, o = m(e.dayFactor * 0.35 + e.twilightFactor) * a.ambient_glow * _(0.45, 1, m(e.weather.sunVisibility));
    if (o > 0.01) {
      const g = m(e.sunX) * n, v = r * _(1.02, 0.55, m(e.dayFactor)), b = Math.max(n, r) * _(0.55, 0.95, e.twilightFactor), w = t.createRadialGradient(g, v, 0, g, v, b);
      w.addColorStop(0, S(i.sunGlow, 0.5 * o)), w.addColorStop(0.35, S(i.sunGlow, 0.22 * o)), w.addColorStop(1, S(i.sunGlow, 0)), t.fillStyle = w, t.fillRect(0, 0, n, r);
    }
    const l = m((e.sunElevation + 1.5) / 4) * m(e.weather.sunVisibility);
    if (l <= 0.02)
      return;
    const c = e.sunX * n + e.parallaxX * 0.12, h = e.sunY * r + e.parallaxY * 0.12, d = Math.min(n, r), u = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const f = e.quality.sunGlowPasses;
    for (let g = f; g >= 1; g--) {
      const v = g / f, b = u * (2.2 + v * 9), w = 0.1 * l * a.ambient_glow * (1 - v * 0.55), x = t.createRadialGradient(c, h, u * 0.4, c, h, b);
      x.addColorStop(0, S(i.sunGlow, w)), x.addColorStop(1, S(i.sunGlow, 0)), t.fillStyle = x, t.beginPath(), t.arc(c, h, b, 0, k), t.fill();
    }
    const p = t.createRadialGradient(c, h, 0, c, h, u);
    p.addColorStop(0, S(i.sunCore, l)), p.addColorStop(0.7, S(i.sunCore, 0.85 * l)), p.addColorStop(1, S(i.sunGlow, 0)), t.fillStyle = p, t.beginPath(), t.arc(c, h, u, 0, k), t.fill(), t.restore();
  }
  destroy() {
  }
}
const xn = 790741, $n = 2 * 2 * 3, An = 200, En = [
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 }
], Tn = 0.22, kn = 0.5, Pn = 0.4;
class Rn {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.lastTintAt = 0, this.clouds = [];
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: i, cloudLayers: n } = t.quality, r = B(xn), a = this.clouds;
    this.base = En.map(({ style: o, aspect: l, spanScale: c }) => {
      const h = Math.round(e), d = Math.round(h / l);
      return {
        canvas: Dn(h, d, r, o),
        aspect: l,
        spanScale: c
      };
    }), this.tinted = [], this.tintValid = !1, this.clouds = new Array(i);
    for (let o = 0; o < i; o++) {
      const l = o % n, c = n <= 1 ? 1 : l / (n - 1), h = c < 0.45 ? 3 : 0;
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
    const i = m(e.weather.cloudCover) * m(e.appearance.intensity);
    if (i <= 0.01 || this.clouds.length === 0 || (this.ensureTint(e.palette.cloud), this.tinted.length === 0))
      return;
    const { width: n, height: r, dt: a } = e, o = _(0.82, 1.35, i), l = i * this.clouds.length, c = Math.floor(l), h = l - c, d = _(0.25, 2.6, m(e.weather.wind)), u = e.reducedMotion ? 0.08 : 1, f = m((i - 0.55) / 0.45) * _(0.35, 0.85, m(e.weather.cloudDarkness));
    if (f > 0.01) {
      const p = t.createLinearGradient(0, 0, 0, r);
      p.addColorStop(0, S(e.palette.cloud, f * 0.55)), p.addColorStop(0.55, S(e.palette.cloud, f * 0.4)), p.addColorStop(1, S(e.palette.cloud, f * 0.18)), t.fillStyle = p, t.fillRect(0, 0, n, r);
    }
    t.save();
    for (let p = 0; p < this.clouds.length; p++) {
      const g = this.clouds[p], v = this.tinted[g.variant];
      let b = n * _(Tn, kn, g.layer) * g.scale * v.spanScale * o, w = b / v.aspect;
      const x = r * Pn;
      w > x && (w = x, b = w * v.aspect);
      const R = n + b * 1.1, $ = n * _(6e-3, 0.028, g.layer) * d * u;
      if (g.nx = H(g.nx + $ * a / R, 1), p > c)
        continue;
      const q = p === c ? h : 1;
      if (q <= 0.01)
        continue;
      const Gt = _(0.3, 1, g.layer), ht = g.nx * R - b + e.parallaxX * Gt, he = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + g.bobPhase) * g.bobAmount * r, et = g.ny * r + he + e.parallaxY * Gt;
      if (ht + b < 0 || ht > n)
        continue;
      const L = g.alpha * q * _(0.42, 0.92, i) * _(0.75, 1, g.layer) * _(1, 1.15, m(e.weather.cloudDarkness));
      t.globalAlpha = m(L), t.drawImage(v.canvas, ht, et, b, w);
    }
    t.restore();
  }
  ensureTint(t) {
    if (this.tintValid) {
      if (K(t, this.tintColor) < $n)
        return;
      const e = performance.now();
      if (e - this.lastTintAt < An)
        return;
      this.lastTintAt = e;
    } else
      this.lastTintAt = performance.now();
    this.tinted = this.base.map((e) => ({
      canvas: In(e.canvas, t),
      aspect: e.aspect,
      spanScale: e.spanScale
    })), this.tintColor = t, this.tintValid = !0;
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
let Vt = null;
function On() {
  if (Vt !== null)
    return Vt;
  const s = document.createElement("canvas").getContext("2d");
  return Vt = !!s && typeof s.filter == "string", Vt;
}
function Ln(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  if (!i)
    return s;
  if (On())
    return i.filter = `blur(${t.toFixed(2)}px)`, i.drawImage(s, 0, 0), i.filter = "none", e;
  const n = s.width * 3;
  return i.shadowColor = "rgba(255,255,255,1)", i.shadowBlur = t * 2, i.shadowOffsetX = n, i.drawImage(s, -n, 0), e;
}
function Dn(s, t, e, i) {
  const n = document.createElement("canvas");
  n.width = s, n.height = t;
  const r = n.getContext("2d");
  if (!r)
    return n;
  const a = i === "cumulus", o = t * (a ? 0.055 : 0.045), l = o * 2.2, c = t - l - t * (a ? 0.04 : 0.06), h = l, d = s - l * 2;
  r.fillStyle = "#ffffff";
  const u = a ? 9 : 14, f = d / (u * 0.85), p = Math.max(d * 0.2, d - f * 2.6), g = l + (d - p) / 2, v = p / Math.max(1, u - 1), b = (c - h) * (a ? 0.3 : 0.4), w = (L, z, G, W) => {
    r.beginPath(), r.ellipse(L, z, G, W, 0, 0, k), r.fill();
  };
  for (let L = 0; L < u; L++) {
    const z = L / (u - 1), G = g + z * p + (e() - 0.5) * v * 0.5, W = 0.34 + 0.66 * Math.pow(Math.sin(Math.PI * m(z)), a ? 0.55 : 0.4), Ut = (c - h) * (a ? 1 : 0.74) * W * y(e, 0.6, 1), ce = f * y(e, 0.85, 1.25), Oe = Math.min(ce * y(e, 1, 1.45), Math.max(3, Ut * 0.7));
    w(G, c - Ut + Oe, ce, Oe), w(
      G,
      c - b * y(e, 0.1, 0.4),
      ce * y(e, 0.95, 1.2),
      b * W * y(e, 0.8, 1.2)
    );
  }
  const x = a ? 7 : 9;
  for (let L = 0; L < x; L++) {
    const z = (L + y(e, 0.2, 0.8)) / x, G = g + m(z) * p, W = 0.4 + 0.6 * Math.sin(Math.PI * m(z)), j = f * y(e, 0.32, 0.6), Ut = c - (c - h) * W * y(e, 0.35, 0.85) + j * 0.4;
    w(G, Ut, j * y(e, 1, 1.35), j);
  }
  const R = Ln(n, o), $ = R.getContext("2d");
  if (!$)
    return R;
  $.globalCompositeOperation = "source-atop";
  const q = $.createLinearGradient(0, h, 0, c);
  q.addColorStop(0, "rgb(255,255,255)"), q.addColorStop(0.42, "rgb(238,240,244)"), q.addColorStop(0.78, "rgb(196,201,211)"), q.addColorStop(1, "rgb(152,159,174)"), $.fillStyle = q, $.fillRect(0, 0, s, t);
  const Gt = a ? 3 : 2;
  for (let L = 0; L < Gt; L++) {
    const z = l + d * y(e, 0.22, 0.78), G = c - (c - h) * y(e, 0.45, 0.85), W = t * y(e, 0.18, 0.32), j = $.createRadialGradient(z, G, 0, z, G, W);
    j.addColorStop(0, "rgba(255,255,255,0.55)"), j.addColorStop(1, "rgba(255,255,255,0)"), $.fillStyle = j, $.beginPath(), $.arc(z, G, W, 0, k), $.fill();
  }
  $.globalCompositeOperation = "destination-in";
  const ht = m((c - o * 1.5) / t), he = m((c + o * 1.2) / t), et = $.createLinearGradient(0, 0, 0, t);
  return et.addColorStop(0, "rgba(0,0,0,1)"), et.addColorStop(ht, "rgba(0,0,0,1)"), et.addColorStop(Math.max(he, ht + 1e-3), "rgba(0,0,0,0)"), et.addColorStop(1, "rgba(0,0,0,0)"), $.fillStyle = et, $.fillRect(0, 0, s, t), $.globalCompositeOperation = "source-over", R;
}
function In(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = S(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
function Fi(s, t) {
  const e = O(s), i = O(t);
  return [Math.cos(i) * Math.cos(e), Math.cos(i) * Math.sin(e), Math.sin(i)];
}
function zn(s, t) {
  return [
    s[1] * t[2] - s[2] * t[1],
    s[2] * t[0] - s[0] * t[2],
    s[0] * t[1] - s[1] * t[0]
  ];
}
const Qt = Fi(266.405, -28.936), Kt = Fi(192.85948, 27.12825), _e = zn(Kt, Qt);
function Nn(s, t) {
  const e = O(s), i = O(t), n = Math.cos(i) * Math.cos(e), r = Math.cos(i) * Math.sin(e), a = Math.sin(i), o = n * Qt[0] + r * _e[0] + a * Kt[0], l = n * Qt[1] + r * _e[1] + a * Kt[1], c = n * Qt[2] + r * _e[2] + a * Kt[2];
  return {
    ra: H(ut(Math.atan2(l, o)), 360) / 15,
    dec: ut(Math.asin(Math.max(-1, Math.min(1, c))))
  };
}
function Fn(s) {
  return s.getTime() / 864e5 + 24405875e-1;
}
function Hn(s) {
  const t = Fn(s) - 2451545;
  return H(280.46061837 + 360.98564736629 * t, 360);
}
function Hi(s, t, e, i, n) {
  const r = Hn(n) + i, a = O(H(r - s * 15, 360)), o = O(t), l = O(e), c = Math.sin(o) * Math.sin(l) + Math.cos(o) * Math.cos(l) * Math.cos(a), h = Math.asin(Math.max(-1, Math.min(1, c))), d = Math.atan2(
    Math.sin(a),
    Math.cos(a) * Math.sin(l) - Math.tan(o) * Math.cos(l)
  );
  return {
    altitude: ut(h),
    // atan2 above measures from south, increasing westward.
    azimuth: H(ut(d) + 180, 360)
  };
}
const Gn = 60, Un = 240;
function ee(s, t) {
  const e = (t - Gn) / Un, i = s >= 0 ? 0.94 - Math.pow(m(s / 90), 0.7) * 0.84 : M(0.94 + -s / 20 * 0.18, 0.94, 1.2);
  return { x: e, y: i, inView: e >= -0.05 && e <= 1.05 };
}
function ni(s) {
  return m(s.x);
}
const Se = [
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
], Bn = [
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
], Wn = 20;
class Yn {
  constructor() {
    this.name = "constellations", this.placed = [], this.sinceRecompute = Number.POSITIVE_INFINITY, this.lastLatitude = Number.NaN, this.lastLongitude = Number.NaN, this.visibleCount = 0;
  }
  setup() {
    this.placed = Se.map((t, e) => ({
      x: 0,
      y: 0,
      visible: !1,
      // Magnitude 6 is the naked-eye limit, −1.5 is Sirius. Perceived
      // brightness is logarithmic, so map it as a curve rather than linearly.
      brightness: m((6 - t.mag) / 7.5) ** 1.6,
      radius: _(0.7, 2.3, m((4.5 - t.mag) / 6)),
      twinklePhase: e * 2.399 % k
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
    this.sinceRecompute += e.dt, (this.sinceRecompute >= Wn || e.latitude !== this.lastLatitude || e.longitude !== this.lastLongitude) && this.recompute(e);
    const { width: n, height: r } = e;
    t.save(), t.lineWidth = Math.max(0.7, Math.min(n, r) * 12e-4), t.lineCap = "round", t.strokeStyle = `rgba(150,185,255,${(0.24 * i).toFixed(3)})`, t.beginPath();
    for (const o of Bn)
      for (const [l, c] of o.lines) {
        const h = this.placed[l], d = this.placed[c];
        !h?.visible || !d?.visible || Math.abs(h.x - d.x) > 0.45 || (t.moveTo(h.x * n, h.y * r), t.lineTo(d.x * n, d.y * r));
      }
    t.stroke(), t.restore();
    let a = 0;
    t.save();
    for (const o of this.placed) {
      if (!o.visible)
        continue;
      a++;
      const l = e.reducedMotion ? 1 : 0.78 + 0.22 * Math.sin(e.time * 1.7 + o.twinklePhase), c = m(o.brightness * i * l);
      if (c <= 0.02)
        continue;
      const h = o.x * n + e.parallaxX * 0.15, d = o.y * r + e.parallaxY * 0.15;
      if (o.radius > 1.5) {
        const u = t.createRadialGradient(h, d, 0, h, d, o.radius * 5);
        u.addColorStop(0, `rgba(198,220,255,${(c * 0.55).toFixed(3)})`), u.addColorStop(1, "rgba(198,220,255,0)"), t.fillStyle = u, t.beginPath(), t.arc(h, d, o.radius * 5, 0, k), t.fill();
      }
      t.fillStyle = `rgba(255,252,246,${c.toFixed(3)})`, t.beginPath(), t.arc(h, d, o.radius, 0, k), t.fill();
    }
    t.restore(), this.visibleCount = a;
  }
  recompute(t) {
    this.sinceRecompute = 0, this.lastLatitude = t.latitude, this.lastLongitude = t.longitude;
    const e = /* @__PURE__ */ new Date();
    for (let i = 0; i < Se.length; i++) {
      const n = Se[i], r = this.placed[i];
      if (!r)
        continue;
      const { altitude: a, azimuth: o } = Hi(
        n.ra,
        n.dec,
        t.latitude,
        t.longitude,
        e
      ), l = ee(a, o);
      r.x = l.x, r.y = l.y, r.visible = a > 2 && l.inView;
    }
  }
  destroy() {
    this.placed = [], this.visibleCount = 0;
  }
}
const Vn = 27162, Ce = 460, qn = 20;
class jn {
  constructor() {
    this.name = "milkyway", this.patches = [], this.sinceRecompute = Number.POSITIVE_INFINITY, this.lastLatitude = Number.NaN, this.lastLongitude = Number.NaN, this.visibleCount = 0;
  }
  setup() {
    const t = B(Vn);
    this.patches = new Array(Ce);
    for (let e = 0; e < Ce; e++) {
      const i = e / Ce * 360 + y(t, -1.5, 1.5), n = Gi(i), r = _(4.5, 13, n), a = y(t, -r, r) * y(t, 0.5, 1), o = 1 - m(Math.abs(a) / (r + 2)) ** 1.4, l = Xn(i), h = Qn(i) && Math.abs(a) < 5.5 && t() < 0.55;
      this.patches[e] = {
        l: i,
        b: a,
        brightness: m(l * o * y(t, 0.55, 1)),
        // Small and numerous. Large patches read as separate discs, exactly
        // the way the old cloud blobs did.
        radius: y(t, 0.02, 0.046) * _(0.8, 1.25, n),
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
    const i = e.moonVisible ? 0.45 : 0, n = m(e.nightFactor) ** 1.6 * (1 - m(e.weather.cloudCover) * 0.95) * (1 - i) * m(e.appearance.intensity);
    if (n <= 0.03) {
      this.visibleCount = 0;
      return;
    }
    this.sinceRecompute += e.dt, (this.sinceRecompute >= qn || e.latitude !== this.lastLatitude || e.longitude !== this.lastLongitude) && this.recompute(e);
    const { width: r, height: a } = e, o = Math.min(r, a);
    let l = 0;
    t.save(), t.globalCompositeOperation = "lighter";
    for (const c of this.patches) {
      if (!c.visible || c.rift)
        continue;
      const h = c.brightness * n * 0.085;
      if (h <= 4e-3)
        continue;
      l++;
      const d = c.x * r + e.parallaxX * 0.15, u = c.y * a + e.parallaxY * 0.15, f = c.radius * o, p = t.createRadialGradient(d, u, 0, d, u, f);
      p.addColorStop(0, `rgba(203,214,242,${h.toFixed(4)})`), p.addColorStop(0.5, `rgba(178,192,229,${(h * 0.45).toFixed(4)})`), p.addColorStop(1, "rgba(160,176,220,0)"), t.fillStyle = p, t.beginPath(), t.arc(d, u, f, 0, k), t.fill();
    }
    t.globalCompositeOperation = "destination-out";
    for (const c of this.patches) {
      if (!c.visible || !c.rift)
        continue;
      const h = c.brightness * n * 0.055;
      if (h <= 4e-3)
        continue;
      const d = c.x * r + e.parallaxX * 0.15, u = c.y * a + e.parallaxY * 0.15, f = c.radius * o * 0.8, p = t.createRadialGradient(d, u, 0, d, u, f);
      p.addColorStop(0, `rgba(0,0,0,${h.toFixed(4)})`), p.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = p, t.beginPath(), t.arc(d, u, f, 0, k), t.fill();
    }
    t.restore(), this.visibleCount = l;
  }
  recompute(t) {
    this.sinceRecompute = 0, this.lastLatitude = t.latitude, this.lastLongitude = t.longitude;
    const e = /* @__PURE__ */ new Date();
    for (const i of this.patches) {
      const { ra: n, dec: r } = Nn(i.l, i.b), { altitude: a, azimuth: o } = Hi(
        n,
        r,
        t.latitude,
        t.longitude,
        e
      ), l = ee(a, o);
      i.x = l.x, i.y = l.y, i.visible = a > 4 && l.inView;
    }
  }
  destroy() {
    this.patches = [], this.visibleCount = 0;
  }
}
function Gi(s) {
  const t = Math.abs((H(s, 360) + 180) % 360 - 180);
  return m(1 - t / 110);
}
function Xn(s) {
  const t = Gi(s), e = Math.abs((H(s - 80, 360) + 180) % 360 - 180), i = m(1 - e / 45) * 0.55;
  return m(0.22 + t * 0.85 + i);
}
function Qn(s) {
  const t = H(s, 360);
  return t > 10 && t < 80;
}
const Kn = 31301, ri = 9, ai = 3;
class Zn {
  constructor() {
    this.name = "sunrays", this.rays = [];
  }
  setup() {
    const t = B(Kn);
    this.rays = new Array(ri);
    for (let e = 0; e < ri; e++)
      this.rays[e] = {
        angle: y(t, -1.25, 1.25),
        halfWidth: y(t, 0.018, 0.075),
        strength: y(t, 0.45, 1),
        driftSpeed: y(t, 0.012, 0.04),
        driftPhase: t() * k
      };
  }
  resize() {
  }
  particleCount() {
    return this.rays.length;
  }
  render(t, e) {
    const i = m(e.weather.cloudCover), n = m(Math.sin(Math.PI * m((i - 0.12) / 0.78))), r = 1 - m((e.sunElevation - 2) / 36), a = m((e.sunElevation + 1) / 5), o = n * _(0.35, 1, r) * a * m(e.weather.sunVisibility * 1.6) * m(e.appearance.intensity) * m(e.appearance.ambient_glow);
    if (o <= 0.01)
      return;
    const { width: l, height: c } = e, h = e.sunX * l, d = e.sunY * c, u = Math.hypot(l, c) * 1.4, f = e.palette.sunGlow;
    t.save(), t.globalCompositeOperation = "lighter", t.translate(h, d);
    for (const p of this.rays) {
      const g = e.reducedMotion ? 0 : Math.sin(e.time * p.driftSpeed + p.driftPhase) * 0.09, v = Math.PI / 2 + p.angle + g;
      for (let b = 0; b < ai; b++) {
        const w = (b + 1) / ai, x = p.halfWidth * _(0.45, 1.6, w), R = o * p.strength * 0.05 * (1 - w * 0.55);
        if (R <= 2e-3)
          continue;
        const $ = t.createLinearGradient(
          0,
          0,
          Math.cos(v) * u,
          Math.sin(v) * u
        );
        $.addColorStop(0, S(f, R)), $.addColorStop(0.35, S(f, R * 0.55)), $.addColorStop(1, S(f, 0)), t.fillStyle = $, t.beginPath(), t.moveTo(0, 0), t.lineTo(Math.cos(v - x) * u, Math.sin(v - x) * u), t.lineTo(Math.cos(v + x) * u, Math.sin(v + x) * u), t.closePath(), t.fill();
      }
    }
    t.restore();
  }
  destroy() {
    this.rays = [];
  }
}
const Jn = 3846, oi = 3, li = 512, hi = 128, tr = 6 * 6 * 3;
class er {
  constructor() {
    this.name = "fog", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.bands = [];
  }
  setup(t) {
    const e = B(Jn);
    this.base = [];
    for (let n = 0; n < oi; n++)
      this.base.push(ir(li, hi, e));
    this.tinted = [], this.tintValid = !1;
    const i = t.quality.fogLayers;
    this.bands = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = i <= 1 ? 1 : n / (i - 1);
      this.bands[n] = {
        variant: n % oi,
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
    const n = e.palette.ambient;
    if (this.ensureTint(n), this.tinted.length === 0)
      return;
    const { width: r, height: a, dt: o } = e, l = e.reducedMotion ? 0.1 : 1;
    t.save();
    for (const d of this.bands) {
      d.nx = H(d.nx + d.speed * l * o, 1);
      const u = this.tinted[d.variant], f = d.thickness * a, p = Math.max(r * 1.6, f * (li / hi)), g = e.reducedMotion ? 0 : Math.sin(e.time * 0.07 + d.bobPhase) * a * 0.012, v = d.ny * a - f / 2 + g + e.parallaxY * 1.4, b = -d.nx * p + e.parallaxX * 1.4;
      t.globalAlpha = m(d.alpha * i * 0.55), t.drawImage(u, b, v, p, f), t.drawImage(u, b + p, v, p, f);
    }
    t.restore();
    const c = a * 0.55, h = t.createLinearGradient(0, c, 0, a);
    h.addColorStop(0, S(n, 0)), h.addColorStop(1, S(n, 0.32 * i)), t.fillStyle = h, t.fillRect(0, c, r, a - c);
  }
  ensureTint(t) {
    this.tintValid && K(t, this.tintColor) < tr || (this.tinted = this.base.map((e) => sr(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.bands = [], this.tintValid = !1;
  }
}
function ir(s, t, e) {
  const i = document.createElement("canvas");
  i.width = s, i.height = t;
  const n = i.getContext("2d");
  if (!n)
    return i;
  const r = 14 + Math.floor(e() * 8);
  for (let o = 0; o < r; o++) {
    const l = e() * s, c = t * y(e, 0.3, 0.7), h = s * y(e, 0.08, 0.22), d = t * y(e, 0.3, 0.6), u = y(e, 0.1, 0.28), f = [0];
    l < h ? f.push(s) : l > s - h && f.push(-s);
    for (const p of f) {
      const g = l + p, v = n.createRadialGradient(g, c, 0, g, c, Math.max(h, d));
      v.addColorStop(0, `rgba(255,255,255,${u.toFixed(3)})`), v.addColorStop(0.6, `rgba(255,255,255,${(u * 0.4).toFixed(3)})`), v.addColorStop(1, "rgba(255,255,255,0)"), n.fillStyle = v, n.beginPath(), n.ellipse(g, c, h, d, 0, 0, Math.PI * 2), n.fill();
    }
  }
  n.globalCompositeOperation = "destination-in";
  const a = n.createLinearGradient(0, 0, 0, t);
  return a.addColorStop(0, "rgba(0,0,0,0)"), a.addColorStop(0.35, "rgba(0,0,0,1)"), a.addColorStop(0.7, "rgba(0,0,0,1)"), a.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = a, n.fillRect(0, 0, s, t), n.globalCompositeOperation = "source-over", i;
}
function sr(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = S(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
const nr = 10783, At = 3;
class rr {
  constructor() {
    this.name = "rain", this.drops = [], this.active = 0;
  }
  setup(t) {
    const e = B(nr), i = t.quality.rainParticles;
    this.drops = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = n % At, a = r / (At - 1);
      this.drops[n] = {
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
    const { width: n, height: r, dt: a } = e, o = Math.round(this.drops.length * i);
    this.active = o;
    const l = _(0.06, 0.5, m(e.weather.wind)) * (e.reducedMotion ? 0.3 : 1), c = e.reducedMotion ? 0.25 : 1, h = I(e.palette.ambient, [225, 238, 255], 0.62);
    for (let d = 0; d < At; d++) {
      const u = d / (At - 1);
      t.strokeStyle = S(h, _(0.11, 0.3, u) * i), t.lineWidth = _(0.7, 1.4, u), t.lineCap = "round", t.beginPath();
      for (let f = d; f < o; f += At) {
        const p = this.drops[f];
        p.ny += p.speed * c * a, p.nx += p.speed * l * c * a * (r / Math.max(1, n)), p.ny > 1.05 && (p.ny -= 1.1, p.nx = Math.random()), p.nx > 1.05 ? p.nx -= 1.1 : p.nx < -0.05 && (p.nx += 1.1);
        const g = p.nx * n, v = p.ny * r, b = p.length * r;
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
    const { width: n, height: r } = e, a = r * 0.82, o = (i - 0.35) / 0.65, l = t.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, S(e.palette.ambient, 0)), l.addColorStop(1, S(e.palette.ambient, 0.3 * o)), t.fillStyle = l, t.fillRect(0, a, n, r - a);
  }
  destroy() {
    this.drops.length = 0, this.active = 0;
  }
}
const ar = 6230212, Et = 3;
class or {
  constructor() {
    this.name = "snow", this.flakes = [], this.active = 0;
  }
  setup(t) {
    const e = B(ar), i = t.quality.snowParticles;
    this.flakes = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = n % Et, a = r / (Et - 1);
      this.flakes[n] = {
        nx: e(),
        ny: e(),
        speed: _(0.035, 0.14, a) * y(e, 0.8, 1.25),
        radius: _(16e-4, 5e-3, a) * y(e, 0.8, 1.3),
        driftAmplitude: y(e, 8e-3, 0.035) * _(0.6, 1.4, a),
        driftFrequency: y(e, 0.25, 0.8),
        driftPhase: e() * k,
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
    const { width: n, height: r, dt: a } = e, o = Math.min(n, r), l = Math.round(this.flakes.length * i);
    this.active = l;
    const c = e.reducedMotion ? 0.2 : 1, h = _(4e-3, 0.05, m(e.weather.wind)) * c, d = I(e.palette.ambient, [255, 255, 255], 0.85);
    for (let u = 0; u < Et; u++) {
      const f = u / (Et - 1);
      t.fillStyle = S(d, _(0.4, 0.85, f) * i), t.beginPath();
      for (let p = u; p < l; p += Et) {
        const g = this.flakes[p];
        g.ny += g.speed * c * a, g.nx += h * a, g.ny > 1.05 && (g.ny -= 1.1, g.nx = Math.random()), g.nx > 1.05 ? g.nx -= 1.1 : g.nx < -0.05 && (g.nx += 1.1);
        const v = e.reducedMotion ? 0 : Math.sin(e.time * g.driftFrequency + g.driftPhase) * g.driftAmplitude, b = (g.nx + v) * n, w = g.ny * r, x = g.radius * o;
        t.moveTo(b + x, w), t.arc(b, w, x, 0, k);
      }
      t.fill();
    }
  }
  destroy() {
    this.flakes.length = 0, this.active = 0;
  }
}
const ci = 45079;
class lr {
  constructor() {
    this.name = "lightning", this.rng = B(ci), this.strike = null, this.cooldown = 6;
  }
  setup() {
    this.rng = B(ci), this.strike = null, this.cooldown = y(this.rng, 4, 12);
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
    const { dt: n, width: r, height: a } = e;
    if (!this.strike) {
      if (this.cooldown -= n * i, this.cooldown > 0)
        return;
      this.strike = this.createStrike(e), this.cooldown = _(26, 3, i) * y(this.rng, 0.7, 1.4);
    }
    const o = this.strike;
    if (o.elapsed += n, o.elapsed > o.total) {
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
    const c = o.x * r, h = o.y * a, d = Math.max(r, a) * 1.15;
    t.save(), t.globalCompositeOperation = "lighter";
    const u = t.createRadialGradient(c, h, 0, c, h, d);
    u.addColorStop(0, `rgba(214,228,255,${(l * 0.85).toFixed(4)})`), u.addColorStop(0.45, `rgba(188,206,246,${(l * 0.35).toFixed(4)})`), u.addColorStop(1, "rgba(170,190,240,0)"), t.fillStyle = u, t.fillRect(0, 0, r, a), o.bolt && e.quality.lightningBolts && o.elapsed <= o.boltVisibleUntil && l > 0.05 && this.drawBolt(t, e, o, l), t.restore();
  }
  createStrike(t) {
    const e = this.rng, i = 2 + Math.floor(e() * 3), n = [];
    let r = 0;
    for (let d = 0; d < i; d++) {
      const u = y(e, 0.09, 0.22);
      n.push({
        at: r,
        duration: u,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: d === 0 ? y(e, 0.18, 0.3) : y(e, 0.06, 0.14)
      }), r += u + y(e, 0.04, 0.16);
    }
    const a = y(e, 0.12, 0.88), o = y(e, 0.05, 0.3), c = t.quality.lightningBolts && e() < 0.55 ? di(e, a, o, y(e, 0.55, 0.85)) : null, h = [];
    if (c) {
      const d = Math.floor(e() * 3);
      for (let u = 0; u < d; u++) {
        const f = c[1 + Math.floor(e() * (c.length - 2))];
        h.push(
          di(e, f.x, f.y, f.y + y(e, 0.08, 0.22), 0.45)
        );
      }
    }
    return {
      elapsed: 0,
      total: r + 0.3,
      flashes: n,
      x: a,
      y: o,
      bolt: c,
      branches: h,
      boltVisibleUntil: n[0].duration * 1.6
    };
  }
  drawBolt(t, e, i, n) {
    const { width: r, height: a } = e, o = m(n * 4), l = (h) => {
      t.beginPath(), t.moveTo(h[0].x * r, h[0].y * a);
      for (let d = 1; d < h.length; d++)
        t.lineTo(h[d].x * r, h[d].y * a);
      t.stroke();
    }, c = Math.min(r, a);
    t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = `rgba(150,180,255,${(o * 0.28).toFixed(4)})`, t.lineWidth = Math.max(4, c * 0.012), i.bolt && l(i.bolt), t.strokeStyle = `rgba(240,246,255,${(o * 0.9).toFixed(4)})`, t.lineWidth = Math.max(1.2, c * 22e-4), i.bolt && l(i.bolt), t.strokeStyle = `rgba(225,235,255,${(o * 0.55).toFixed(4)})`, t.lineWidth = Math.max(1, c * 15e-4);
    for (const h of i.branches)
      l(h);
  }
  destroy() {
    this.strike = null;
  }
}
function di(s, t, e, i, n = 1) {
  let r = [
    { x: t, y: e },
    { x: t + y(s, -0.06, 0.06) * n, y: i }
  ];
  for (let a = 0; a < 5; a++) {
    const o = [r[0]], l = 0.045 * n * Math.pow(0.62, a);
    for (let c = 1; c < r.length; c++) {
      const h = r[c - 1], d = r[c];
      o.push({
        x: (h.x + d.x) / 2 + y(s, -l, l),
        y: (h.y + d.y) / 2
      }), o.push(d);
    }
    r = o;
  }
  return r;
}
const hr = 128, cr = 13729298;
class dr {
  constructor() {
    this.name = "dither", this.pattern = null, this.tile = null;
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    !this.pattern && (this.tile = ur(hr), this.pattern = t.createPattern(this.tile, "repeat"), !this.pattern) || (t.save(), t.setTransform(1, 0, 0, 1, 0, 0), t.globalAlpha = 0.5, t.fillStyle = this.pattern, t.fillRect(0, 0, e.width * e.pixelRatio, e.height * e.pixelRatio), t.restore());
  }
  destroy() {
    this.pattern = null, this.tile = null;
  }
}
function ur(s) {
  const t = document.createElement("canvas");
  t.width = s, t.height = s;
  const e = t.getContext("2d");
  if (!e)
    return t;
  const i = e.createImageData(s, s), n = i.data, r = B(cr);
  for (let a = 0; a < n.length; a += 4) {
    const o = r() < 0.5 ? 255 : 0;
    n[a] = o, n[a + 1] = o, n[a + 2] = o, n[a + 3] = Math.round(r() * 3);
  }
  return e.putImageData(i, 0, 0), t;
}
class pr {
  constructor(t, e, i) {
    this.sky = new vn(), this.stars = new Sn(), this.milkyWay = new jn(), this.constellations = new Yn(), this.sunRays = new Zn(), this.moon = new Cn(), this.sun = new Mn(), this.clouds = new Rn(), this.fog = new er(), this.rain = new rr(), this.snow = new or(), this.lightning = new lr(), this.dither = new dr(), this.reducedMotion = !1, this.parallaxTargetX = 0, this.parallaxTargetY = 0, this.parallaxX = 0, this.parallaxY = 0, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = i, this.renderers = [
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
    ], this.season = ei(/* @__PURE__ */ new Date(), i.latitude), this.blender = new yn(Ni(i.condition)), this.blender.snapTo(this.targetProfile()), this.elevation = i.sunElevation, this.azimuth = i.sunAzimuth, this.palette = we({
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
    this.snapshot = t, this.season = ei(/* @__PURE__ */ new Date(), t.latitude), this.state.season = this.season, this.blender.setTarget(this.targetProfile());
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
    const t = gn(this.snapshot);
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
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.parallaxX = this.parallaxTargetX, this.parallaxY = this.parallaxTargetY, this.blender.snapTo(this.targetProfile()), this.palette = we({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
  }
  update(t, e) {
    const i = this.state;
    i.dt = t, i.time = e, this.elevation = jt(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = fr(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const n = this.blender.update(t), r = we({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: n,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
    this.palette = sn(this.palette, r, 0.6, t), this.config.effects.parallax && !this.reducedMotion ? (this.parallaxX = jt(this.parallaxX, this.parallaxTargetX, 0.25, t), this.parallaxY = jt(this.parallaxY, this.parallaxTargetY, 0.25, t)) : (this.parallaxX = 0, this.parallaxY = 0), i.parallaxX = this.parallaxX, i.parallaxY = this.parallaxY;
    const { dayFactor: a, nightFactor: o, twilightFactor: l } = zi(this.elevation);
    i.sunElevation = this.elevation, i.sunAzimuth = this.azimuth, i.sunRising = this.snapshot.sunRising, i.dayFactor = a, i.nightFactor = o, i.twilightFactor = l, i.palette = this.palette, i.weather = n, i.latitude = this.snapshot.latitude, i.longitude = this.snapshot.longitude;
    const c = ee(this.elevation, this.azimuth);
    i.sunX = ni(c), i.sunY = c.y;
    const h = /* @__PURE__ */ new Date(), d = on(h), u = ln(h, this.snapshot.latitude, d), f = ee(
      u.altitude,
      // The moon model yields a position along the arc rather than a true
      // azimuth; feed it through the same 240° panorama.
      60 + m(u.azimuthFraction) * 240
    );
    i.moonPhase = d, i.moonX = ni(f), i.moonY = f.y, i.moonVisible = this.config.effects.moon && u.altitude > 2 && o > 0.08 && d > 0.03 && d < 0.97;
  }
  render(t) {
    const e = this.state, i = this.config.effects;
    this.sky.render(t, e), i.milky_way && this.milkyWay.render(t, e), i.stars && this.stars.render(t, e), i.constellations && this.constellations.render(t, e), i.moon && this.moon.render(t, e), i.sun && this.sun.render(t, e), i.clouds && this.clouds.render(t, e), i.sun_rays && this.sunRays.render(t, e), i.fog && this.fog.render(t, e), i.rain && this.rain.render(t, e), i.snow && this.snow.render(t, e), i.lightning && this.lightning.render(t, e), this.dither.render(t, e);
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
function fr(s, t, e, i) {
  let n = (t - s + 540) % 360 - 180;
  const r = e <= 0 ? 1 : 1 - Math.pow(2, -i / e);
  return n *= r, (s + n + 360) % 360;
}
const gr = 400, qt = 4 * 4 * 3, mr = [
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
class yr {
  constructor() {
    this.last = null, this.lastWrite = 0, this.active = !1;
  }
  /** True while properties are on the document. */
  get isActive() {
    return this.active;
  }
  update(t, e = !1) {
    const i = performance.now();
    if (!e && i - this.lastWrite < gr)
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
    const r = document.documentElement.style, a = (c) => `${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}`;
    r.setProperty("--aurora-ambient-color", S(n.ambient)), r.setProperty("--aurora-ambient-rgb", a(n.ambient)), r.setProperty("--aurora-sky-color", S(n.sky)), r.setProperty("--aurora-horizon-color", S(n.horizon)), r.setProperty("--aurora-accent-color", S(n.accent)), r.setProperty("--aurora-accent-rgb", a(n.accent)), r.setProperty("--aurora-glow-strength", n.glow.toFixed(3)), r.setProperty("--aurora-night", n.night.toFixed(3)), r.setProperty("--aurora-day", (1 - n.night).toFixed(3));
    const o = se(n.sky) > 140;
    r.setProperty("--aurora-contrast-color", o ? "#10151f" : "#f2f6ff");
    const l = I(n.ambient, o ? [12, 16, 24] : [235, 243, 255], 0.72);
    r.setProperty("--aurora-card-tint", S(l, o ? 0.5 : 0.14)), r.setProperty("--aurora-surface-rgb", a(l)), r.setProperty(
      "--aurora-card-border",
      S(o ? [255, 255, 255] : [255, 255, 255], o ? 0.28 : 0.16)
    ), r.setProperty("--aurora-season", t.season.name), r.setProperty("--aurora-condition", t.weather.condition);
  }
  changed(t, e) {
    return K(t.ambient, e.ambient) > qt || K(t.sky, e.sky) > qt || K(t.horizon, e.horizon) > qt || K(t.accent, e.accent) > qt || Math.abs(t.glow - e.glow) > 0.02 || Math.abs(t.night - e.night) > 0.02;
  }
  /** Remove every property again – called when the last Aurora card unmounts. */
  clear() {
    if (!this.active)
      return;
    const t = document.documentElement.style;
    for (const e of mr)
      t.removeProperty(e);
    this.active = !1, this.last = null;
  }
}
const br = 500, ui = 5 * 5 * 3, vr = [
  "--ha-card-background",
  "--card-background-color",
  "--ha-card-backdrop-filter",
  "--ha-card-border-color",
  "--ha-card-border-width",
  "--ha-card-box-shadow",
  "--ha-card-border-radius",
  "--aurora-glass-surface"
], pi = ["--primary-text-color", "--secondary-text-color"];
class wr {
  constructor() {
    this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastOptions = "", this.lastWrite = 0, this.active = !1, this.textActive = !1;
  }
  update(t, e, i = !1) {
    if (!e.enabled) {
      this.clear();
      return;
    }
    const n = performance.now();
    if (!i && n - this.lastWrite < br)
      return;
    const r = se(t.palette.middle) > 145, a = I(
      t.palette.ambient,
      r ? [14, 18, 27] : [226, 236, 252],
      0.7
    ), o = t.palette.sunGlow, l = m(t.dayFactor * 0.5 + t.twilightFactor * 0.9 + t.nightFactor * 0.25) * e.glow, c = [
      e.blur,
      e.opacity,
      e.saturate,
      e.glow,
      e.radius,
      e.border,
      e.adaptive_text
    ].join("|");
    if (!i && this.lastSurface && this.lastAccent && c === this.lastOptions && K(this.lastSurface, a) < ui && K(this.lastAccent, o) < ui && Math.abs(this.lastGlow - l) < 0.03) {
      this.lastWrite = n;
      return;
    }
    this.lastWrite = n, this.lastSurface = a, this.lastAccent = o, this.lastGlow = l, this.lastOptions = c, this.active = !0;
    const h = document.documentElement.style, d = m(e.opacity * (r ? 1.15 : 1)), u = S(a, d);
    h.setProperty("--aurora-glass-surface", u), h.setProperty("--ha-card-background", u), h.setProperty("--card-background-color", u), h.setProperty(
      "--ha-card-backdrop-filter",
      e.blur > 0 ? `blur(${e.blur}px) saturate(${e.saturate})` : "none"
    ), e.border ? (h.setProperty("--ha-card-border-width", "1px"), h.setProperty(
      "--ha-card-border-color",
      S(r ? [255, 255, 255] : [255, 255, 255], r ? 0.3 : 0.16)
    )) : (h.setProperty("--ha-card-border-width", "0px"), h.setProperty("--ha-card-border-color", "transparent"));
    const f = `0 6px 24px rgba(0,0,0,${(0.18 + (r ? 0.06 : 0.14)).toFixed(3)})`, p = l > 0.01 ? `, 0 0 36px ${S(o, m(l * 0.16))}` : "";
    if (h.setProperty("--ha-card-box-shadow", f + p), e.radius >= 0 ? h.setProperty("--ha-card-border-radius", `${e.radius}px`) : h.removeProperty("--ha-card-border-radius"), e.adaptive_text) {
      const g = r ? [16, 21, 31] : [240, 245, 255];
      h.setProperty("--primary-text-color", S(g)), h.setProperty(
        "--secondary-text-color",
        S(I(g, a, 0.35), _(0.75, 0.85, m(l)))
      ), this.textActive = !0;
    } else if (this.textActive) {
      for (const g of pi)
        h.removeProperty(g);
      this.textActive = !1;
    }
  }
  /** Hand every managed property back to the user's theme. */
  clear() {
    if (!this.active && !this.textActive)
      return;
    const t = document.documentElement.style;
    for (const e of vr)
      t.removeProperty(e);
    if (this.textActive) {
      for (const e of pi)
        t.removeProperty(e);
      this.textActive = !1;
    }
    this.active = !1, this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastOptions = "";
  }
}
const _r = (s) => `
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
class fi {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", _r(e)), t.appendChild(this.element);
  }
  update(t, e, i, n, r) {
    const a = performance.now();
    if (a - this.lastUpdate < 250)
      return;
    this.lastUpdate = a;
    const o = [
      `AURORA BACKGROUND  v${Ae}`,
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
    this.element.textContent = o.join(`
`);
  }
  destroy() {
    this.element.remove();
  }
}
const gi = 42e5, Sr = 0.06, mi = 0.012;
class Ui {
  /**
   * `exportsAmbient` is true only for the shared dashboard layer – two layers
   * writing `--aurora-*` on the document would fight each other.
   */
  constructor(t, e, i, n = !1) {
    this.host = t, this.debugOverlay = null, this.resizeObserver = null, this.intersectionObserver = null, this.motionQuery = null, this.cssWidth = 0, this.cssHeight = 0, this.pixelRatio = 1, this.resizePending = !1, this.visible = !0, this.documentVisible = !0, this.destroyed = !1, this.firstFrame = !0, this.environmentTimer = null, this.resolvedGlass = null, this.glassDirty = !1, this.scrollOffset = 0, this.pointerX = 0, this.pointerY = 0, this.onMotionPreferenceChange = (a) => {
      this.scene.setReducedMotion(a.matches), this.applyFrameCap();
    }, this.onDocumentScroll = (a) => {
      const o = a.target, l = o instanceof Element ? o.scrollTop : document.scrollingElement?.scrollTop ?? window.scrollY;
      this.scrollOffset = Math.min(1, l / Math.max(1, this.cssHeight)), this.pushParallax();
    }, this.onPointerMove = (a) => {
      this.pointerX = M(a.clientX / Math.max(1, window.innerWidth) * 2 - 1, -1, 1), this.pointerY = M(a.clientY / Math.max(1, window.innerHeight) * 2 - 1, -1, 1), this.pushParallax();
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
      this.destroyed || (this.scene.setEnvironment(ii(this.hass, this.config)), this.resolveGlass(), this.engine.isRunning || this.renderOnce());
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
        !1
      );
    }, this.config = e, this.hass = i, this.ambient = n ? new yr() : null, this.glass = n ? new wr() : null, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1 });
    const r = this.resolveQuality();
    this.performance = new Xs(
      r,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, Ct(r).maxFps)
    ), this.scene = new pr(
      e,
      Ct(r),
      ii(i, e)
    ), this.engine = new qs(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new fi(this.host, this.debugTopOffset())), this.updateRunState();
  }
  /* ---------------------------------------------------------------- *
   * Public API
   * ---------------------------------------------------------------- */
  updateConfig(t) {
    if (this.destroyed)
      return;
    const e = t.quality !== this.config.quality, i = t.debug !== this.config.debug, n = t.appearance.blur !== this.config.appearance.blur, r = t.appearance.opacity !== this.config.appearance.opacity;
    if (this.config = t, this.scene.setConfig(t), e) {
      const a = this.resolveQuality();
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.performance.setQuality(a), this.applyQuality(a);
    } else
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.applyFrameCap();
    (n || r) && this.applyCanvasFilter(), i && (t.debug && !this.debugOverlay ? this.debugOverlay = new fi(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.ambient && !t.background.ambient_variables && this.ambient.clear(), this.resolveGlass(), this.glass && !this.activeGlass.enabled && this.glass.clear(), this.pushParallax(), this.refreshEnvironment(), this.updateRunState();
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
    return this.config.quality === "auto" ? Ki() : this.config.quality;
  }
  applyQuality(t) {
    const e = Ct(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = Ct(this.performance.quality);
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
      this.pointerX * t * mi,
      this.scrollOffset * t * Sr + this.pointerY * t * mi * 0.6
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
    const i = dt(this.hass?.states?.[e]?.state);
    if (!i) {
      this.resolvedGlass && (this.glassDirty = !0), this.resolvedGlass = null;
      return;
    }
    this.resolvedGlass?.preset !== i && (this.glassDirty = !0), this.resolvedGlass = {
      ...t,
      ...$e[i],
      preset: i,
      // `plain` is how the user turns the whole thing off from the dropdown.
      enabled: t.enabled && i !== "plain"
    };
  }
  get activeGlass() {
    return this.resolvedGlass ?? this.config.glass;
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  /** Returns true when the backing store was reallocated. */
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), i = Math.max(1, Math.round(t.height)), n = Ct(this.performance.quality);
    let a = Math.min(window.devicePixelRatio || 1, n.maxDpr) * n.renderScale;
    const o = e * i * a * a;
    o > gi && (a *= Math.sqrt(gi / o));
    const l = Math.max(1, Math.round(e * a)), c = Math.max(1, Math.round(i * a)), h = this.canvas.width !== l || this.canvas.height !== c || this.cssWidth !== e || this.cssHeight !== i;
    return this.cssWidth = e, this.cssHeight = i, this.pixelRatio = a, h && (this.canvas.width = l, this.canvas.height = c, this.scene.resize(e, i, a)), this.updateRunState(), h;
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
      !0
    ));
  }
}
const yi = "aurora-background-root", bi = "aurora-background-style";
class Cr {
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
      document.getElementById(yi)?.remove();
      const e = document.createElement("div");
      e.id = yi, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new Ui(this.root, t, e?.hass, !0);
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
    const e = Mr(t);
    if (!t.background.transparent_lovelace && e === "keep") {
      const a = vi(t);
      this.writeStyle(a ? `:root{${a}}` : "");
      return;
    }
    const i = [], n = [];
    t.background.transparent_lovelace && (n.push("--lovelace-background:transparent !important"), n.push("--view-background:transparent !important"), n.push("--ha-view-background:transparent !important"), i.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), e === "transparent" ? (n.push("--app-header-background-color:transparent !important"), n.push("--app-header-border-bottom:none !important"), n.push("--app-header-box-shadow:none !important")) : e === "glass" && (n.push(
      "--app-header-background-color:rgba(var(--aurora-surface-rgb,22,26,36),0.55) !important"
    ), n.push(
      "--app-header-text-color:var(--aurora-contrast-color,#f2f6ff) !important"
    ), n.push("--app-header-border-bottom:none !important"), n.push("--app-header-box-shadow:none !important"), n.push(
      "--sidebar-background-color:rgba(var(--aurora-surface-rgb,22,26,36),0.82) !important"
    ));
    const r = vi(t);
    r && n.push(r), n.length > 0 && i.unshift(`:root{${n.join(";")}}`), this.writeStyle(i.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(bi)?.remove();
      const e = document.createElement("style");
      e.id = bi, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function Mr(s) {
  return s.background.header !== "auto" ? s.background.header : s.glass.enabled ? "glass" : "transparent";
}
function vi(s) {
  const t = Object.entries(s.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, i]) => `${e}:${i} !important`).join(";");
}
const Tt = new Cr(), xr = ot`
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
`, Bi = ot`
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
var $r = Object.defineProperty, Ar = Object.getOwnPropertyDescriptor, Wi = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ar(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && $r(t, e, n), n;
};
const Er = {
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
function E(s) {
  return { name: s, selector: { boolean: {} } };
}
function N(s, t, e, i) {
  return { name: s, selector: { number: { min: t, max: e, step: i, mode: "slider" } } };
}
const Tr = [
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
  E("debug"),
  {
    name: "effects",
    type: "expandable",
    icon: "mdi:weather-partly-cloudy",
    schema: [
      {
        name: "",
        type: "grid",
        schema: [
          E("sun"),
          E("moon"),
          E("stars"),
          E("shooting_stars"),
          E("constellations"),
          E("milky_way"),
          E("sun_rays"),
          E("clouds"),
          E("fog"),
          E("rain"),
          E("snow"),
          E("lightning"),
          E("season"),
          E("parallax")
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
      E("auto_quality"),
      E("pause_when_hidden")
    ]
  },
  {
    name: "glass",
    type: "expandable",
    icon: "mdi:card-outline",
    schema: [
      E("enabled"),
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
      E("border"),
      E("adaptive_text")
    ]
  },
  {
    name: "background",
    type: "expandable",
    icon: "mdi:layers-outline",
    schema: [
      E("transparent_lovelace"),
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
      E("ambient_variables"),
      { name: "z_index", selector: { number: { min: -10, max: 10, step: 1, mode: "box" } } }
    ]
  }
];
class oe extends F {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => Er[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = _i(this.config);
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
    return customElements.get("ha-form") ? T`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${Tr}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : T`
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
      type: this.config.type ?? `custom:${pt}`,
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
oe.styles = Bi;
Wi([
  tt({ attribute: !1 })
], oe.prototype, "hass", 2);
Wi([
  P()
], oe.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", oe);
var kr = Object.defineProperty, Pr = Object.getOwnPropertyDescriptor, le = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Pr(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && kr(t, e, n), n;
};
const Rr = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function Or(s, t = 30) {
  let e = s;
  for (let i = 0; i < t && e; i++) {
    if (e instanceof HTMLElement && Rr.includes(e.tagName))
      return !0;
    const n = e.parentNode;
    if (!n)
      break;
    e = n instanceof ShadowRoot ? n.host : n;
  }
  return !1;
}
class _t extends F {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = _i(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = xe(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, i = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && i === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = i, this.config.mode === "background" ? Tt.updateHass(this, t) : this.cardLayer?.updateHass(t));
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
      type: `custom:${pt}`,
      weather_entity: xe(t),
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
      this.isConnected && (this.editing = this.preview || Or(this));
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
      this.destroyCardLayer(), this.mounted ? Tt.update(this, t, this._hass) : (Tt.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (Tt.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new Ui(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (Tt.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? T`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? T`<div class="surface"></div>` : this.editing ? T`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${Ae} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : C : C;
  }
}
_t.styles = xr;
le([
  tt({ type: Boolean })
], _t.prototype, "preview", 2);
le([
  P()
], _t.prototype, "config", 2);
le([
  P()
], _t.prototype, "editing", 2);
le([
  P()
], _t.prototype, "errorMessage", 2);
customElements.get(pt) || customElements.define(pt, _t);
var Lr = Object.defineProperty, Dr = Object.getOwnPropertyDescriptor, Yi = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Dr(t, e) : t, r = s.length - 1, a; r >= 0; r--)
    (a = s[r]) && (n = (i ? a(t, e, n) : a(n)) || n);
  return i && n && Lr(t, e, n), n;
};
const Ir = {
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
class St extends F {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => Ir[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    return customElements.get("ha-form") ? T`
      <div class="hint">${this.hint}</div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData(this.config)}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : T`
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
St.styles = Bi;
Yi([
  tt({ attribute: !1 })
], St.prototype, "hass", 2);
Yi([
  P()
], St.prototype, "config", 2);
const zr = [
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
class Nr extends St {
  get schema() {
    return zr;
  }
  get cardType() {
    return mt;
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
const Fr = [
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
class Hr extends St {
  get schema() {
    return Fr;
  }
  get cardType() {
    return gt;
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
const Gr = [
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
class Ur extends St {
  get schema() {
    return Gr;
  }
  get cardType() {
    return yt;
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
customElements.get("aurora-style-editor") || customElements.define("aurora-style-editor", Ur);
customElements.get("aurora-light-editor") || customElements.define("aurora-light-editor", Nr);
customElements.get("aurora-climate-editor") || customElements.define("aurora-climate-editor", Hr);
const kt = "https://github.com/iiNoNoNoii/Aurora-UI", Br = [
  {
    type: pt,
    name: ji,
    description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
    preview: !1,
    documentationURL: kt
  },
  {
    type: mt,
    name: "Aurora Light",
    description: "Light tile that takes the bulb’s own colour. Drag for brightness, tap to toggle.",
    preview: !1,
    documentationURL: kt
  },
  {
    type: gt,
    name: "Aurora Climate",
    description: "Thermostat with a large target temperature and a surface that warms with it.",
    preview: !1,
    documentationURL: kt
  },
  {
    type: yt,
    name: "Aurora Style",
    description: "Wrap any existing card in an Aurora surface: glass, frosted, tinted or outline.",
    preview: !1,
    documentationURL: kt
  },
  {
    type: Nt,
    name: "Aurora Layout",
    description: "Different cards and column counts for phone, tablet, desktop and wallpanel.",
    preview: !1,
    documentationURL: kt
  }
], wi = window.customCards = window.customCards || [];
for (const s of Br)
  wi.some((t) => t.type === s.type) || wi.push(s);
console.info(
  `%c AURORA UI %c v${Ae} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  _t as AuroraBackgroundCard,
  oe as AuroraBackgroundEditor,
  bt as AuroraClimateCard,
  lt as AuroraLayoutCard,
  vt as AuroraLightCard,
  wt as AuroraStyleCard
};
