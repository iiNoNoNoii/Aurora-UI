/*! Aurora UI v0.5.1-alpha | AGPL-3.0-or-later | Source: https://github.com/iiNoNoNoii/Aurora-UI */
const E = Math.PI * 2;
function x(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function m(s) {
  return x(s, 0, 1);
}
function S(s, t, e) {
  return s + (t - s) * e;
}
function di(s, t, e) {
  return s === t ? e < s ? 0 : 1 : m((e - s) / (t - s));
}
function yt(s, t, e) {
  const i = di(s, t, e);
  return i * i * (3 - 2 * i);
}
function Pt(s, t, e, i) {
  if (e <= 0)
    return t;
  const n = 1 - Math.pow(2, -i / e);
  return s + (t - s) * n;
}
function K(s) {
  let t = s >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let i = t;
    return i = Math.imul(i ^ i >>> 15, i | 1), i ^= i + Math.imul(i ^ i >>> 7, i | 61), ((i ^ i >>> 14) >>> 0) / 4294967296;
  };
}
function b(s, t, e) {
  return t + s() * (e - t);
}
function Dt(s, t) {
  const e = s % t;
  return e < 0 ? e + t : e;
}
function F(s) {
  return s * Math.PI / 180;
}
function oe(s) {
  return s * 180 / Math.PI;
}
const nt = "aurora-background", ui = "Aurora Background", te = "0.5.1-alpha", Vt = ["low", "medium", "high", "ultra"], pi = ["background", "card"], fi = {
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
function ut(s) {
  return { ...fi[s] };
}
function ae(s, t) {
  const e = Vt.indexOf(s);
  return Vt[x(e + t, 0, Vt.length - 1)];
}
function gi() {
  if (typeof window > "u")
    return "medium";
  const s = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), i = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return s <= 2 || t <= 2 ? "low" : i && e <= 480 ? "medium" : i ? s >= 6 ? "high" : "medium" : s >= 8 && t >= 8 ? "high" : "medium";
}
function C(s, t) {
  return typeof s == "boolean" ? s : s === "true" ? !0 : s === "false" ? !1 : t;
}
function P(s, t, e, i) {
  const n = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(n) ? x(n, e, i) : t;
}
function le(s, t) {
  return typeof s == "string" && s.length > 0 ? s : t;
}
function he(s, t, e) {
  return t.includes(s) ? s : e;
}
function mi(s) {
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
const yi = "sun.sun";
function qe(s) {
  const t = s ?? {}, e = t.effects ?? {}, i = t.appearance ?? {}, n = t.performance ?? {}, r = t.background ?? {}, o = typeof t.glass == "boolean" ? { enabled: t.glass } : t.glass ?? {}, a = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : yi, l = he(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: le(t.type, `custom:${nt}`),
    mode: he(t.mode, pi, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: a,
    quality: l,
    debug: C(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : le(t.height, "320px"),
    effects: {
      sun: C(e.sun, !0),
      moon: C(e.moon, !0),
      stars: C(e.stars, !0),
      shooting_stars: C(e.shooting_stars, !0),
      clouds: C(e.clouds, !0),
      rain: C(e.rain, !0),
      snow: C(e.snow, !0),
      fog: C(e.fog, !0),
      lightning: C(e.lightning, !0),
      season: C(e.season, !0),
      parallax: C(e.parallax, !0)
    },
    appearance: {
      intensity: P(i.intensity, 1, 0, 2),
      saturation: P(i.saturation, 1, 0, 2),
      brightness: P(i.brightness, 1, 0.2, 2),
      blur: P(i.blur, 0, 0, 40),
      ambient_glow: P(i.ambient_glow, 1, 0, 2),
      opacity: P(i.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: P(n.max_fps, 60, 10, 120),
      auto_quality: C(n.auto_quality, !0),
      pause_when_hidden: C(n.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: C(r.transparent_lovelace, !0),
      transparent_header: C(r.transparent_header, !0),
      css_variables: mi(r.css_variables),
      z_index: P(r.z_index, -1, -100, 100),
      ambient_variables: C(r.ambient_variables, !0)
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: C(o.enabled, !1),
      blur: P(o.blur, 14, 0, 40),
      opacity: P(o.opacity, 0.5, 0, 1),
      saturate: P(o.saturate, 1.4, 1, 3),
      border: C(o.border, !0),
      glow: P(o.glow, 1, 0, 2),
      radius: P(o.radius, 18, -1, 60),
      adaptive_text: C(o.adaptive_text, !1)
    }
  };
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = globalThis, ee = kt.ShadowRoot && (kt.ShadyCSS === void 0 || kt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), ce = /* @__PURE__ */ new WeakMap();
let Ve = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== ie)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ee && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ce.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ce.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bi = (s) => new Ve(typeof s == "string" ? s : s + "", void 0, ie), xt = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new Ve(e, s, ie);
}, vi = (s, t) => {
  if (ee)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), n = kt.litNonce;
      n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
    }
}, de = ee ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return bi(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wi, defineProperty: _i, getOwnPropertyDescriptor: Si, getOwnPropertyNames: $i, getOwnPropertySymbols: xi, getPrototypeOf: Ci } = Object, V = globalThis, ue = V.trustedTypes, Mi = ue ? ue.emptyScript : "", Ai = V.reactiveElementPolyfillSupport, bt = (s, t) => s, Ot = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Mi : null;
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
} }, se = (s, t) => !wi(s, t), pe = { attribute: !0, type: String, converter: Ot, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), V.litPropertyMetadata ?? (V.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let it = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = pe) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && _i(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = Si(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(bt("elementProperties")))
      return;
    const t = Ci(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(bt("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(bt("properties"))) {
      const e = this.properties, i = [...$i(e), ...xi(e)];
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
        e.unshift(de(n));
    } else
      t !== void 0 && e.push(de(t));
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
    return vi(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : Ot).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Ot;
      this._$Em = n;
      const a = o.fromAttribute(e, r.type);
      this[n] = a ?? this._$Ej?.get(n) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? se)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i))))
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
it.elementStyles = [], it.shadowRootOptions = { mode: "open" }, it[bt("elementProperties")] = /* @__PURE__ */ new Map(), it[bt("finalized")] = /* @__PURE__ */ new Map(), Ai?.({ ReactiveElement: it }), (V.reactiveElementVersions ?? (V.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = globalThis, fe = (s) => s, Rt = vt.trustedTypes, ge = Rt ? Rt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, We = "$lit$", G = `lit$${Math.random().toFixed(9).slice(2)}$`, Ye = "?" + G, Ei = `<${Ye}>`, Z = document, _t = () => Z.createComment(""), St = (s) => s === null || typeof s != "object" && typeof s != "function", ne = Array.isArray, Ti = (s) => ne(s) || typeof s?.[Symbol.iterator] == "function", Wt = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, ye = />/g, j = RegExp(`>|${Wt}(?:([^\\s"'>=/]+)(${Wt}*=${Wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), be = /'/g, ve = /"/g, je = /^(?:script|style|textarea|title)$/i, Pi = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), A = Pi(1), J = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), Q = Z.createTreeWalker(Z, 129);
function Xe(s, t) {
  if (!ne(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return ge !== void 0 ? ge.createHTML(t) : t;
}
const ki = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = pt;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let h, c, d = -1, f = 0;
    for (; f < l.length && (o.lastIndex = f, c = o.exec(l), c !== null); )
      f = o.lastIndex, o === pt ? c[1] === "!--" ? o = me : c[1] !== void 0 ? o = ye : c[2] !== void 0 ? (je.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = j) : c[3] !== void 0 && (o = j) : o === j ? c[0] === ">" ? (o = n ?? pt, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, h = c[1], o = c[3] === void 0 ? j : c[3] === '"' ? ve : be) : o === ve || o === be ? o = j : o === me || o === ye ? o = pt : (o = j, n = void 0);
    const p = o === j && s[a + 1].startsWith("/>") ? " " : "";
    r += o === pt ? l + Ei : d >= 0 ? (i.push(h), l.slice(0, d) + We + l.slice(d) + G + p) : l + G + (d === -2 ? a : p);
  }
  return [Xe(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class $t {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [h, c] = ki(t, e);
    if (this.el = $t.createElement(h, i), Q.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Q.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(We)) {
              const f = c[o++], p = n.getAttribute(d).split(G), u = /([.?@])?(.*)/.exec(f);
              l.push({ type: 1, index: r, name: u[2], strings: p, ctor: u[1] === "." ? Ri : u[1] === "?" ? Li : u[1] === "@" ? Di : zt }), n.removeAttribute(d);
            } else
              d.startsWith(G) && (l.push({ type: 6, index: r }), n.removeAttribute(d));
        if (je.test(n.tagName)) {
          const d = n.textContent.split(G), f = d.length - 1;
          if (f > 0) {
            n.textContent = Rt ? Rt.emptyScript : "";
            for (let p = 0; p < f; p++)
              n.append(d[p], _t()), Q.nextNode(), l.push({ type: 2, index: ++r });
            n.append(d[f], _t());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Ye)
          l.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(G, d + 1)) !== -1; )
            l.push({ type: 7, index: r }), d += G.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = Z.createElement("template");
    return i.innerHTML = t, i;
  }
}
function rt(s, t, e = s, i) {
  if (t === J)
    return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = St(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = rt(s, n._$AS(s, t.values), n, i)), t;
}
class Oi {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? Z).importNode(e, !0);
    Q.currentNode = n;
    let r = Q.nextNode(), o = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new Ct(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new zi(r, this, t)), this._$AV.push(h), l = i[++a];
      }
      o !== l?.index && (r = Q.nextNode(), o++);
    }
    return Q.currentNode = Z, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Ct {
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
    t = rt(this, t, e), St(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== J && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ti(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && St(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = $t.createElement(Xe(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n)
      this._$AH.p(e);
    else {
      const r = new Oi(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = we.get(t.strings);
    return e === void 0 && we.set(t.strings, e = new $t(t)), e;
  }
  k(t) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t)
      n === e.length ? e.push(i = new Ct(this.O(_t()), this.O(_t()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = fe(t).nextSibling;
      fe(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class zt {
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
      t = rt(this, t, e, 0), o = !St(t) || t !== this._$AH && t !== J, o && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = rt(this, a[i + l], e, l), h === J && (h = this._$AH[l]), o || (o = !St(h) || h !== this._$AH[l]), h === $ ? t = $ : t !== $ && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ri extends zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Li extends zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Di extends zt {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = rt(this, t, e, 0) ?? $) === J)
      return;
    const i = this._$AH, n = t === $ && i !== $ || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== $ && (i === $ || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class zi {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    rt(this, t);
  }
}
const Fi = vt.litHtmlPolyfillSupport;
Fi?.($t, Ct), (vt.litHtmlVersions ?? (vt.litHtmlVersions = [])).push("3.3.3");
const Ii = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new Ct(t.insertBefore(_t(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = globalThis;
let H = class extends it {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ii(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return J;
  }
};
H._$litElement$ = !0, H.finalized = !0, wt.litElementHydrateSupport?.({ LitElement: H });
const Ni = wt.litElementPolyfillSupport;
Ni?.({ LitElement: H });
(wt.litElementVersions ?? (wt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hi = { attribute: !0, type: String, converter: Ot, reflect: !1, hasChanged: se }, Ui = (s = Hi, t, e) => {
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
function lt(s) {
  return (t, e) => typeof e == "object" ? Ui(s, t, e) : ((i, n, r) => {
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
  return lt({ ...s, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bi = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Gi = (s) => (...t) => ({ _$litDirective$: s, values: t });
let qi = class {
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
const Qe = "important", Vi = " !" + Qe, st = Gi(class extends qi {
  constructor(s) {
    if (super(s), s.type !== Bi.ATTRIBUTE || s.name !== "style" || s.strings?.length > 2)
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
        const r = typeof n == "string" && n.endsWith(Vi);
        i.includes("-") || r ? e.setProperty(i, r ? n.slice(0, -11) : n, r ? Qe : "") : e[i] = n;
      }
    }
    return J;
  }
});
function I(s) {
  let t = s.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function _(s, t = 1) {
  const e = Math.round(x(s[0], 0, 255)), i = Math.round(x(s[1], 0, 255)), n = Math.round(x(s[2], 0, 255));
  return t >= 1 ? `rgb(${e},${i},${n})` : `rgba(${e},${i},${n},${x(t, 0, 1).toFixed(3)})`;
}
function k(s, t, e) {
  return [S(s[0], t[0], e), S(s[1], t[1], e), S(s[2], t[2], e)];
}
function Ft(s) {
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}
function Wi(s, t) {
  const e = Ft(s);
  return k(s, [e, e, e], x(t, 0, 1));
}
function Yt(s, t) {
  return [x(s[0] * t, 0, 255), x(s[1] * t, 0, 255), x(s[2] * t, 0, 255)];
}
function Yi(s, t) {
  const e = Ft(s);
  return [
    x(e + (s[0] - e) * t, 0, 255),
    x(e + (s[1] - e) * t, 0, 255),
    x(e + (s[2] - e) * t, 0, 255)
  ];
}
function q(s, t) {
  const e = s[0] - t[0], i = s[1] - t[1], n = s[2] - t[2];
  return e * e + i * i + n * n;
}
const Ke = xt`
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
`, ji = 6;
class Ze {
  constructor(t) {
    this.options = t, this.element = null, this.pointerId = null, this.startX = 0, this.startY = 0, this.dragging = !1, this.holdTimer = null, this.holdFired = !1, this.onPointerDown = (e) => {
      this.options.isDisabled?.() || !this.element || e.button !== 0 || (this.pointerId = e.pointerId, this.startX = e.clientX, this.startY = e.clientY, this.dragging = !1, this.holdFired = !1, this.element.addEventListener("pointermove", this.onPointerMove), this.element.addEventListener("pointerup", this.onPointerUp), this.element.addEventListener("pointercancel", this.onPointerUp), this.options.onHold && (this.holdTimer = window.setTimeout(() => {
        this.holdTimer = null, !this.dragging && (this.holdFired = !0, this.options.onHold?.());
      }, this.options.holdDelay ?? 500)));
    }, this.onPointerMove = (e) => {
      if (!(e.pointerId !== this.pointerId || !this.element)) {
        if (!this.dragging) {
          if ((this.options.axis === "x" ? Math.abs(e.clientX - this.startX) : Math.abs(e.clientY - this.startY)) < ji)
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
function Xi(s, t, e) {
  s.dispatchEvent(
    new CustomEvent(t, {
      detail: e,
      bubbles: !0,
      composed: !0
    })
  );
}
function Je(s, t) {
  Xi(s, "hass-more-info", { entityId: t });
}
function ti(s, t) {
  if (!(!s || !t))
    return s.states[t];
}
function D(s) {
  return !s || s.state === "unavailable" || s.state === "unknown";
}
function N(s, t) {
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
function Zt(s, t) {
  const e = s?.attributes?.[t];
  return typeof e == "string" ? e : null;
}
function ei(s, t) {
  const e = s?.attributes?.[t];
  return Array.isArray(e) ? e.filter((i) => typeof i == "string") : [];
}
function ii(s, t) {
  const e = Zt(s, "friendly_name");
  if (e)
    return e;
  const i = s?.entity_id ?? t ?? "";
  return (i.split(".")[1] ?? i).replace(/_/g, " ").replace(/\b\w/g, (r) => r.toUpperCase());
}
function _e(s, t) {
  const e = t < 1 ? 1 : 0, i = s.toFixed(e);
  return e > 0 && i.endsWith(".0") ? i.slice(0, -2) : i;
}
function Lt(s, t, e, i) {
  s?.callService?.(t, e, i);
}
function Se(s) {
  const t = Math.max(1e3, Math.min(4e4, s)) / 100;
  let e, i, n;
  t <= 66 ? (e = 255, i = 99.4708025861 * Math.log(t) - 161.1195681661) : (e = 329.698727446 * Math.pow(t - 60, -0.1332047592), i = 288.1221695283 * Math.pow(t - 60, -0.0755148492)), t >= 66 ? n = 255 : t <= 19 ? n = 0 : n = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const r = (o) => Math.max(0, Math.min(255, o));
  return [r(e), r(i), r(n)];
}
var Qi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, It = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ki(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && Qi(t, e, n), n;
};
const ot = "aurora-climate", Zi = [86, 158, 232], jt = [150, 176, 200], Ji = [246, 152, 74], ts = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, Xt = {
  heating: "Heating",
  cooling: "Cooling",
  drying: "Drying",
  fan: "Fan running",
  idle: "Idle",
  off: "Off",
  preheating: "Preheating"
};
class ht extends H {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingTarget = null, this.drag = new Ze({
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
      type: t.type ?? `custom:${ot}`,
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
    return { type: `custom:${ot}`, entity: e ?? "climate.example" };
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
    return ti(this.hass, this.config?.entity);
  }
  get minTemp() {
    return N(this.entity, "min_temp") ?? 7;
  }
  get maxTemp() {
    return N(this.entity, "max_temp") ?? 35;
  }
  get step() {
    return N(this.entity, "target_temp_step") ?? 0.5;
  }
  get unit() {
    return Zt(this.entity, "temperature_unit") ?? this.hass?.config?.unit_system?.temperature ?? "°C";
  }
  get currentTemp() {
    return N(this.entity, "current_temperature");
  }
  get target() {
    return this.pendingTarget !== null ? this.pendingTarget : N(this.entity, "temperature");
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
      return jt;
    const t = this.targetFraction;
    return t < 0.5 ? k(Zi, jt, t * 2) : k(jt, Ji, (t - 0.5) * 2);
  }
  get hvacModes() {
    return ei(this.entity, "hvac_modes");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  roundToStep(t) {
    const e = this.step, i = Math.round(t / e) * e, n = e < 1 ? 1 : 0;
    return Number(x(i, this.minTemp, this.maxTemp).toFixed(n));
  }
  onDragMove(t, e = !1) {
    const i = this.roundToStep(S(this.minTemp, this.maxTemp, t));
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
      this.sendTimer = null, Lt(this.hass, "climate", "set_temperature", {
        entity_id: this.config.entity,
        temperature: t
      }), this.clearPendingTimer !== null && window.clearTimeout(this.clearPendingTimer), this.clearPendingTimer = window.setTimeout(() => {
        this.pendingTarget = null, this.clearPendingTimer = null;
      }, 2e3);
    };
    e <= 0 ? i() : this.sendTimer = window.setTimeout(i, e);
  }
  setHvacMode(t) {
    this.config && Lt(this.hass, "climate", "set_hvac_mode", {
      entity_id: this.config.entity,
      hvac_mode: t
    });
  }
  openMoreInfo() {
    this.config && Je(this, this.config.entity);
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
    const e = Zt(t, "hvac_action");
    return e && Xt[e] ? Xt[e] : Xt[t.state] ?? t.state.replace(/_/g, " ");
  }
  render() {
    if (this.errorMessage)
      return A`<div class="error">Aurora Climate: ${this.errorMessage}</div>`;
    if (!this.config)
      return $;
    const t = this.entity, e = D(t), i = this.accent, n = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.target, o = this.currentTemp, a = this.unit, l = this.hvacModes, h = st({
      "--aurora-climate-rgb": n
    });
    return A`
      <ha-card style=${h}>
        <div class="fill"></div>
        <div class="content">
          <div class="header">
            <button
              class="icon-button"
              type="button"
              aria-label="More information"
              style=${st({ color: _(i) })}
              @click=${this.openMoreInfo}
            >
              <ha-icon .icon=${this.config.icon ?? "mdi:thermostat"}></ha-icon>
            </button>
            <div class="labels">
              <div class="name">${this.config.name ?? ii(t, this.config.entity)}</div>
              <div class="state">
                ${o !== null ? `Currently ${_e(o, 0.1)} ${a}` : "No sensor reading"}
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
              ${r !== null ? A`
                    <span class="number">${_e(r, this.step)}</span
                    ><span class="unit">${a}</span>
                  ` : A`<span class="number">--</span>`}
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
              style=${st({ width: `${(this.targetFraction * 100).toFixed(2)}%` })}
            ></div>
          </div>

          ${this.config.show_modes && l.length > 0 ? A`
                <div class="modes">
                  ${l.map(
      (c) => A`
                      <button
                        class="mode"
                        type="button"
                        aria-pressed=${String(t?.state === c)}
                        aria-label=${c.replace(/_/g, " ")}
                        title=${c.replace(/_/g, " ")}
                        ?disabled=${e}
                        @click=${() => this.setHvacMode(c)}
                      >
                        <ha-icon .icon=${ts[c] ?? "mdi:tune"}></ha-icon>
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
ht.styles = [
  Ke,
  xt`
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
It([
  lt({ attribute: !1 })
], ht.prototype, "hass", 2);
It([
  R()
], ht.prototype, "config", 2);
It([
  R()
], ht.prototype, "errorMessage", 2);
It([
  R()
], ht.prototype, "pendingTarget", 2);
customElements.get(ot) || customElements.define(ot, ht);
var es = Object.defineProperty, is = Object.getOwnPropertyDescriptor, Nt = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? is(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && es(t, e, n), n;
};
const at = "aurora-light", $e = [255, 197, 122], xe = 1;
class ct extends H {
  constructor() {
    super(...arguments), this.errorMessage = null, this.pendingBrightness = null, this.drag = new Ze({
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
      type: t.type ?? `custom:${at}`,
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
    return { type: `custom:${at}`, entity: e ?? "light.example" };
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
    return ti(this.hass, this.config?.entity);
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
    const t = N(this.entity, "brightness");
    return t === null ? 100 : x(Math.round(t / 255 * 100), 0, 100);
  }
  /** The light's real colour, or a warm white when it has none. */
  get lightColor() {
    if (!this.config?.use_light_color)
      return $e;
    const t = this.entity?.attributes?.rgb_color;
    if (Array.isArray(t) && t.length >= 3) {
      const [n, r, o] = t;
      if ([n, r, o].every((a) => typeof a == "number" && Number.isFinite(a)))
        return [n, r, o];
    }
    const e = N(this.entity, "color_temp_kelvin");
    if (e !== null)
      return Se(e);
    const i = N(this.entity, "color_temp");
    return i !== null && i > 0 ? Se(1e6 / i) : $e;
  }
  get supportsBrightness() {
    const t = ei(this.entity, "supported_color_modes");
    return t.length === 0 ? N(this.entity, "brightness") !== null : !(t.length === 1 && t[0] === "onoff");
  }
  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */
  onDragMove(t) {
    this.supportsBrightness && (this.pendingBrightness = x(
      Math.round(t * 100),
      xe,
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
    const e = x(Math.round(t * 100), xe, 100);
    this.pendingBrightness = e, Lt(this.hass, "light", "turn_on", {
      entity_id: this.config.entity,
      brightness_pct: e
    }), this.clearPendingTimer(), this.pendingTimer = window.setTimeout(() => {
      this.pendingBrightness = null, this.pendingTimer = null;
    }, 1500);
  }
  toggle() {
    !this.config || D(this.entity) || (Lt(this.hass, "light", "toggle", { entity_id: this.config.entity }), this.pendingBrightness = null, this.clearPendingTimer());
  }
  openMoreInfo() {
    this.config && Je(this, this.config.entity);
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
      return A`<div class="error">Aurora Light: ${this.errorMessage}</div>`;
    if (!this.config)
      return $;
    const t = this.entity, e = !t, i = this.lightColor, n = `${Math.round(i[0])}, ${Math.round(i[1])}, ${Math.round(i[2])}`, r = this.brightnessPercent, o = this.isOn && !e, a = this.config.icon ?? (o ? "mdi:lightbulb" : "mdi:lightbulb-outline"), l = st({
      "--aurora-light-rgb": n,
      "--aurora-light-glow": o ? String(m(0.25 + r / 100 * 0.55)) : "0",
      "--aurora-icon-alpha": o ? "0.3" : "0.12",
      "--aurora-icon-color": o ? _(i) : "inherit"
    }), h = o && this.supportsBrightness && this.config.slider;
    return A`
      <ha-card style=${l}>
        <div class="glow"></div>
        ${h ? A`
              <div
                class="fill"
                style=${st({ transform: `scaleX(${(r / 100).toFixed(4)})` })}
              ></div>
              <div class="edge" style=${st({ left: `${r}%` })}></div>
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
            <div class="name">${this.config.name ?? ii(t, this.config.entity)}</div>
            <div class="state">${this.stateText()}</div>
          </div>
          ${o && this.supportsBrightness ? A`<div class="value">${r}%</div>` : $}
        </div>
      </ha-card>
    `;
  }
  onIconClick(t) {
    t.stopPropagation(), this.toggle();
  }
}
ct.styles = [
  Ke,
  xt`
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
Nt([
  lt({ attribute: !1 })
], ct.prototype, "hass", 2);
Nt([
  R()
], ct.prototype, "config", 2);
Nt([
  R()
], ct.prototype, "errorMessage", 2);
Nt([
  R()
], ct.prototype, "pendingBrightness", 2);
customElements.get(at) || customElements.define(at, ct);
class ss {
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
const ns = ["low", "medium", "high", "ultra"];
function Ce(s) {
  return ns.indexOf(s);
}
class rs {
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
      const a = ae(this.level, -1);
      if (a !== this.level)
        return this.level = a, this.ceiling = a, this.frameTimes.length = 0, a;
    } else if (r < o * 0.18) {
      const a = ae(this.level, 1);
      if (a !== this.level && Ce(a) <= Ce(this.ceiling))
        return this.level = a, this.frameTimes.length = 0, a;
    }
    return null;
  }
}
function B(s, t) {
  return {
    elevation: s,
    palette: {
      zenith: I(t.zenith),
      upper: I(t.upper),
      middle: I(t.middle),
      lower: I(t.lower),
      horizon: I(t.horizon),
      sunCore: I(t.sunCore),
      sunGlow: I(t.sunGlow),
      ambient: I(t.ambient),
      cloud: I(t.cloud)
    }
  };
}
const X = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  B(-90, {
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
  B(-12, {
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
  B(-6, {
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
  B(-2, {
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
  B(3, {
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
  B(12, {
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
  B(35, {
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
  B(70, {
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
], re = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], os = [255, 118, 162], as = [255, 138, 56];
function ls(s, t, e) {
  const i = {};
  for (const n of re)
    i[n] = k(s[n], t[n], e);
  return i;
}
function hs(s) {
  if (s <= X[0].elevation)
    return { ...X[0].palette };
  const t = X[X.length - 1];
  if (s >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < X.length - 1; e++) {
    const i = X[e], n = X[e + 1];
    if (s >= i.elevation && s <= n.elevation) {
      const r = yt(i.elevation, n.elevation, s);
      return ls(i.palette, n.palette, r);
    }
  }
  return { ...t.palette };
}
function si(s) {
  const t = yt(-4, 8, s), e = 1 - yt(-14, -2, s), i = yt(-16, -3, s) * (1 - yt(0, 10, s));
  return { dayFactor: t, nightFactor: e, twilightFactor: i };
}
const cs = {
  zenith: 0.15,
  upper: 0.3,
  middle: 0.55,
  lower: 0.85,
  horizon: 1,
  sunCore: 0.2,
  sunGlow: 0.6,
  ambient: 0.8,
  cloud: 0.5
}, ds = 0.1;
function Qt(s) {
  const { elevation: t, rising: e, weather: i, appearance: n, season: r } = s, o = hs(t), { twilightFactor: a, dayFactor: l } = si(t), h = e ? os : as, c = a * 0.3, d = {}, f = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, p = m(i.desaturation) * 0.8, u = 1 - m(i.skyDarkness) * 0.75, g = r ? ds * (0.35 + 0.65 * l) : 0, v = r ? r.saturation : 1;
  for (const y of re) {
    let w = k(o[y], h, c * f[y]);
    r && g > 0 && (w = k(w, r.tint, g * cs[y])), w = Wi(w, p), w = Yt(w, u), w = Yi(w, n.saturation * v), w = Yt(w, n.brightness), d[y] = w;
  }
  return d.cloud = Yt(d.cloud, S(1, 0.32, m(i.cloudDarkness))), d;
}
function us(s, t, e, i) {
  const n = e <= 0 ? 1 : 1 - Math.pow(2, -i / e), r = {};
  for (const o of re)
    r[o] = k(s[o], t[o], n);
  return r;
}
const Me = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: 3 * Math.PI / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1 }
}, Ae = ["summer", "autumn", "winter", "spring"];
function ps(s) {
  const t = new Date(s.getFullYear(), 0, 0);
  return Math.floor((s.getTime() - t.getTime()) / 864e5);
}
function Ee(s, t) {
  const e = (ps(s) - 172) / 365.25 * E, i = t < 0 ? e + Math.PI : e;
  let n = 0;
  const r = { summer: 0, autumn: 0, winter: 0, spring: 0 };
  for (const p of Ae) {
    const u = Math.max(0, Math.cos(i - Me[p].centre)), g = u * u;
    r[p] = g, n += g;
  }
  n <= 0 && (n = 1);
  let o = 0, a = 0, l = 0, h = 0, c = 0, d = "summer", f = -1;
  for (const p of Ae) {
    const u = r[p] / n, g = Me[p];
    o += g.tint[0] * u, a += g.tint[1] * u, l += g.tint[2] * u, h += g.haze * u, c += g.saturation * u, u > f && (f = u, d = p);
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
function fs(s) {
  return s.getTime() / 864e5 - 10957.5;
}
function gs(s, t, e) {
  const i = fs(s), n = F(357.5291 + 0.98560028 * i), r = F(280.459 + 0.98564736 * i) + F(1.9148) * Math.sin(n) + F(0.02) * Math.sin(2 * n), o = F(23.4393 - 3563e-10 * i), a = Math.asin(Math.sin(o) * Math.sin(r)), l = Math.atan2(
    Math.cos(o) * Math.sin(r),
    Math.cos(r)
  ), c = F(280.16 + 360.9856235 * i) + F(e) - l, d = F(t), f = Math.sin(d) * Math.sin(a) + Math.cos(d) * Math.cos(a) * Math.cos(c), p = Math.asin(Math.max(-1, Math.min(1, f))), u = Math.atan2(
    Math.sin(c),
    Math.cos(c) * Math.sin(d) - Math.tan(a) * Math.cos(d)
  ), g = c + F(360.9856235 * (10 / 1440)), v = Math.sin(d) * Math.sin(a) + Math.cos(d) * Math.cos(a) * Math.cos(g);
  return {
    elevation: oe(p),
    azimuth: Dt(oe(u) + 180, 360),
    rising: v > f
  };
}
function ms(s) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, i = s.getTime() / 864e5 - e;
  return Dt(i / t, 1);
}
function ys(s, t, e) {
  const r = (s.getHours() + s.getMinutes() / 60 + s.getSeconds() / 3600 - 12) / 24 * E - e * E, o = 70 - Math.min(55, Math.abs(t) * 0.55), a = Math.cos(r) * o, l = (Math.sin(r) + 1) / 2;
  return { altitude: a, azimuthFraction: l };
}
const bs = [
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
], vs = {
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
function ws(s) {
  if (!s)
    return "unknown";
  const t = s.toLowerCase().trim();
  return bs.includes(t) ? t : vs[t] ?? "unknown";
}
const _s = {
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
}, Ss = {
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
function ni(s) {
  return { condition: s, ..._s, ...Ss[s] };
}
const $s = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function At(s) {
  if (typeof s == "number" && Number.isFinite(s))
    return s;
  if (typeof s == "string") {
    const t = Number.parseFloat(s);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function Jt(s) {
  if (s) {
    for (const t of Object.keys(s.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function Te(s, t, e = /* @__PURE__ */ new Date()) {
  const i = s?.config?.latitude ?? 51.2, n = s?.config?.longitude ?? 6.8;
  let r = null, o = null, a = null, l = "computed";
  const h = t.sun_entity, c = h ? s?.states?.[h] : void 0;
  if (c) {
    const y = At(c.attributes.elevation), w = At(c.attributes.azimuth);
    y !== null && (r = y, o = w, a = typeof c.attributes.rising == "boolean" ? c.attributes.rising : null, l = "sun.sun");
  }
  if (r === null || o === null || a === null) {
    const y = gs(e, i, n);
    r === null && (r = y.elevation), o === null && (o = y.azimuth), a === null && (a = y.rising), l !== "sun.sun" && (l = "computed");
  }
  const d = t.weather_entity ?? Jt(s), f = d ? s?.states?.[d] : void 0;
  let p = "unknown", u = null, g = null, v = !1;
  if (f && f.state !== "unavailable" && f.state !== "unknown") {
    p = ws(f.state), v = !0;
    const y = At(f.attributes.cloud_coverage);
    y !== null && (u = m(y / 100));
    const w = At(f.attributes.wind_speed);
    if (w !== null) {
      const T = String(
        f.attributes.wind_speed_unit ?? s?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), W = w * ($s[T] ?? 1);
      g = m(W / 70);
    }
  } else
    d || (p = r > -6 ? "sunny" : "clear-night");
  return p === "sunny" && r < -4 && (p = "clear-night"), p === "clear-night" && r > 2 && (p = "sunny"), {
    condition: p,
    cloudCoverage: u,
    wind: g,
    sunElevation: r,
    sunAzimuth: o,
    sunRising: a,
    latitude: i,
    longitude: n,
    sunSource: l,
    weatherEntity: d ?? null,
    weatherAvailable: v
  };
}
function xs(s) {
  const t = ni(s.condition);
  return s.cloudCoverage !== null && (t.cloudCover = S(t.cloudCover, s.cloudCoverage, 0.65), t.sunVisibility = Math.min(t.sunVisibility, 1 - s.cloudCoverage * 0.85)), s.wind !== null && (t.wind = S(t.wind, s.wind, 0.7)), t;
}
const Cs = [
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
class Ms {
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
    for (const i of Cs)
      this.current[i] = Pt(this.current[i], this.target[i], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
class As {
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
      h.addColorStop(0, _(i.zenith)), h.addColorStop(0.28, _(i.upper)), h.addColorStop(0.55, _(i.middle)), h.addColorStop(0.82, _(i.lower)), h.addColorStop(1, _(i.horizon)), this.gradient = h, this.cacheKey = o;
    }
    t.fillStyle = this.gradient, t.fillRect(0, 0, n, r);
    const a = t.createLinearGradient(0, 0, 0, r * 0.45), l = m(0.12 + e.weather.skyDarkness * 0.2);
    a.addColorStop(0, `rgba(0,0,0,${l.toFixed(3)})`), a.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = a, t.fillRect(0, 0, n, r * 0.45);
  }
  destroy() {
    this.gradient = null;
  }
}
const Es = 6221137;
class Ts {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = K(Es), i = t.quality.starCount;
    this.stars = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = Math.pow(e(), 1.6) * 0.82;
      this.stars[n] = {
        nx: e(),
        ny: r,
        radius: b(e, 0.4, 1.5),
        baseAlpha: b(e, 0.35, 1),
        twinkleSpeed: b(e, 0.4, 2.2),
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
    const { width: n, height: r } = e, o = !e.reducedMotion, a = e.parallaxX * 0.15, l = e.parallaxY * 0.15;
    t.save();
    for (let h = 0; h < this.stars.length; h++) {
      const c = this.stars[h], d = c.nx * n + a, f = c.ny * r + l;
      let p = c.baseAlpha * i;
      if (o) {
        const y = Math.sin(e.time * c.twinkleSpeed + c.twinklePhase);
        p *= 0.62 + 0.38 * y;
      }
      if (p <= 0.02)
        continue;
      const u = 255, g = 245 + Math.round(c.tint * 8), v = 225 + Math.round((1 - c.tint) * 30);
      t.fillStyle = `rgba(${u},${g},${v},${p.toFixed(3)})`, c.radius <= 0.7 ? t.fillRect(d, f, 1, 1) : (t.beginPath(), t.arc(d, f, c.radius, 0, E), t.fill());
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
      const h = l.life / l.maxLife, c = Math.sin(h * Math.PI) * i, d = l.vx === 0 && l.vy === 0 ? 0 : l.vx, f = Math.hypot(d, l.vy) || 1, p = l.x - d / f * l.length, u = l.y - l.vy / f * l.length, g = t.createLinearGradient(l.x, l.y, p, u);
      g.addColorStop(0, `rgba(255,255,255,${c.toFixed(3)})`), g.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = g, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(p, u), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class Ps {
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
    const d = r * 5, f = 0.14 * i * e.appearance.ambient_glow, p = t.createRadialGradient(h, c, r * 0.6, h, c, d);
    p.addColorStop(0, `rgba(200,220,255,${f.toFixed(3)})`), p.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = p, t.beginPath(), t.arc(h, c, d, 0, E), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = i, t.drawImage(this.buffer, h - o / 2, c - o / 2), t.restore();
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
    a.addColorStop(0, "#fffdf3"), a.addColorStop(0.75, "#eceadd"), a.addColorStop(1, "#cfd3cc"), t.fillStyle = a, t.beginPath(), t.arc(r, o, i, 0, E), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const l = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, f, p] of l)
      t.beginPath(), t.arc(r + d * i, o + f * i, p * i, 0, E), t.fill();
    const h = (1 - Math.cos(n * E)) / 2;
    if (h < 0.99) {
      const f = n < 0.5, p = Math.abs(1 - h * 2) * i;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(r, o, i + 1, -Math.PI / 2, Math.PI / 2, f);
      const u = f ? h < 0.5 : h >= 0.5;
      t.ellipse(
        r,
        o,
        p,
        i + 1,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        u
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
class ks {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: i, width: n, height: r, appearance: o } = e, a = m(e.dayFactor * 0.35 + e.twilightFactor) * o.ambient_glow * S(0.45, 1, m(e.weather.sunVisibility));
    if (a > 0.01) {
      const g = m(e.sunX) * n, v = r * S(1.02, 0.55, m(e.dayFactor)), y = Math.max(n, r) * S(0.55, 0.95, e.twilightFactor), w = t.createRadialGradient(g, v, 0, g, v, y);
      w.addColorStop(0, _(i.sunGlow, 0.5 * a)), w.addColorStop(0.35, _(i.sunGlow, 0.22 * a)), w.addColorStop(1, _(i.sunGlow, 0)), t.fillStyle = w, t.fillRect(0, 0, n, r);
    }
    const l = m((e.sunElevation + 1.5) / 4) * m(e.weather.sunVisibility);
    if (l <= 0.02)
      return;
    const h = e.sunX * n + e.parallaxX * 0.12, c = e.sunY * r + e.parallaxY * 0.12, d = Math.min(n, r), f = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const p = e.quality.sunGlowPasses;
    for (let g = p; g >= 1; g--) {
      const v = g / p, y = f * (2.2 + v * 9), w = 0.1 * l * o.ambient_glow * (1 - v * 0.55), T = t.createRadialGradient(h, c, f * 0.4, h, c, y);
      T.addColorStop(0, _(i.sunGlow, w)), T.addColorStop(1, _(i.sunGlow, 0)), t.fillStyle = T, t.beginPath(), t.arc(h, c, y, 0, E), t.fill();
    }
    const u = t.createRadialGradient(h, c, 0, h, c, f);
    u.addColorStop(0, _(i.sunCore, l)), u.addColorStop(0.7, _(i.sunCore, 0.85 * l)), u.addColorStop(1, _(i.sunGlow, 0)), t.fillStyle = u, t.beginPath(), t.arc(h, c, f, 0, E), t.fill(), t.restore();
  }
  destroy() {
  }
}
const Os = 790741, Rs = 2 * 2 * 3, Ls = 200, Ds = [
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "cumulus", aspect: 1.9, spanScale: 1 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 },
  { style: "stratus", aspect: 3.2, spanScale: 1.45 }
], zs = 0.22, Fs = 0.5, Is = 0.4;
class Ns {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.lastTintAt = 0, this.clouds = [];
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: i, cloudLayers: n } = t.quality, r = K(Os), o = this.clouds;
    this.base = Ds.map(({ style: a, aspect: l, spanScale: h }) => {
      const c = Math.round(e), d = Math.round(c / l);
      return {
        canvas: Bs(c, d, r, a),
        aspect: l,
        spanScale: h
      };
    }), this.tinted = [], this.tintValid = !1, this.clouds = new Array(i);
    for (let a = 0; a < i; a++) {
      const l = a % n, h = n <= 1 ? 1 : l / (n - 1), c = h < 0.45 ? 3 : 0;
      this.clouds[a] = {
        variant: c + Math.floor(r() * 3),
        nx: r(),
        ny: b(r, -0.04, 0.46) - h * 0.06,
        scale: b(r, 0.82, 1.22),
        layer: h,
        alpha: b(r, 0.6, 1),
        bobPhase: r() * Math.PI * 2,
        bobAmount: b(r, 4e-3, 0.014)
      };
    }
    if (this.clouds.sort((a, l) => a.layer - l.layer), o.length > 0)
      for (let a = 0; a < this.clouds.length; a++)
        this.clouds[a].nx = o[a % o.length].nx;
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
    const { width: n, height: r, dt: o } = e, a = S(0.82, 1.35, i), l = i * this.clouds.length, h = Math.floor(l), c = l - h, d = S(0.25, 2.6, m(e.weather.wind)), f = e.reducedMotion ? 0.08 : 1, p = m((i - 0.55) / 0.45) * S(0.35, 0.85, m(e.weather.cloudDarkness));
    if (p > 0.01) {
      const u = t.createLinearGradient(0, 0, 0, r);
      u.addColorStop(0, _(e.palette.cloud, p * 0.55)), u.addColorStop(0.55, _(e.palette.cloud, p * 0.4)), u.addColorStop(1, _(e.palette.cloud, p * 0.18)), t.fillStyle = u, t.fillRect(0, 0, n, r);
    }
    t.save();
    for (let u = 0; u < this.clouds.length; u++) {
      const g = this.clouds[u], v = this.tinted[g.variant];
      let y = n * S(zs, Fs, g.layer) * g.scale * v.spanScale * a, w = y / v.aspect;
      const T = r * Is;
      w > T && (w = T, y = w * v.aspect);
      const W = n + y * 1.1, Bt = n * S(6e-3, 0.028, g.layer) * d * f;
      if (g.nx = Dt(g.nx + Bt * o / W, 1), u > h)
        continue;
      const U = u === h ? c : 1;
      if (U <= 0.01)
        continue;
      const z = S(0.3, 1, g.layer), L = g.nx * W - y + e.parallaxX * z, Y = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + g.bobPhase) * g.bobAmount * r, tt = g.ny * r + Y + e.parallaxY * z;
      if (L + y < 0 || L > n)
        continue;
      const et = g.alpha * U * S(0.42, 0.92, i) * S(0.75, 1, g.layer) * S(1, 1.15, m(e.weather.cloudDarkness));
      t.globalAlpha = m(et), t.drawImage(v.canvas, L, tt, y, w);
    }
    t.restore();
  }
  ensureTint(t) {
    if (this.tintValid) {
      if (q(t, this.tintColor) < Rs)
        return;
      const e = performance.now();
      if (e - this.lastTintAt < Ls)
        return;
      this.lastTintAt = e;
    } else
      this.lastTintAt = performance.now();
    this.tinted = this.base.map((e) => ({
      canvas: Gs(e.canvas, t),
      aspect: e.aspect,
      spanScale: e.spanScale
    })), this.tintColor = t, this.tintValid = !0;
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
let Et = null;
function Hs() {
  if (Et !== null)
    return Et;
  const s = document.createElement("canvas").getContext("2d");
  return Et = !!s && typeof s.filter == "string", Et;
}
function Us(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  if (!i)
    return s;
  if (Hs())
    return i.filter = `blur(${t.toFixed(2)}px)`, i.drawImage(s, 0, 0), i.filter = "none", e;
  const n = s.width * 3;
  return i.shadowColor = "rgba(255,255,255,1)", i.shadowBlur = t * 2, i.shadowOffsetX = n, i.drawImage(s, -n, 0), e;
}
function Bs(s, t, e, i) {
  const n = document.createElement("canvas");
  n.width = s, n.height = t;
  const r = n.getContext("2d");
  if (!r)
    return n;
  const o = i === "cumulus", a = t * (o ? 0.055 : 0.045), l = a * 2.2, h = t - l - t * (o ? 0.04 : 0.06), c = l, d = s - l * 2;
  r.fillStyle = "#ffffff";
  const f = o ? 10 : 16, p = d / (f - 1);
  let u = 0;
  for (let z = 0; z < f; z++) {
    const L = z / (f - 1), Y = l + L * d + (e() - 0.5) * p * 0.6, tt = Math.pow(Math.sin(Math.PI * m(L)), o ? 0.5 : 0.35), Gt = (h - c) * (o ? 1 : 0.78) * tt * b(e, 0.62, 1);
    u = Math.max(u, Gt);
    const qt = Math.max(2, Gt * b(e, 0.46, 0.66)), hi = qt * b(e, o ? 1.1 : 1.9, o ? 1.75 : 3), ci = h - Gt + qt;
    r.beginPath(), r.ellipse(Y, ci, hi, qt, 0, 0, E), r.fill();
  }
  const g = h - u * (o ? 0.34 : 0.42);
  r.fillRect(l + d * 0.04, g, d * 0.92, h - g);
  const v = Us(n, a), y = v.getContext("2d");
  if (!y)
    return v;
  y.globalCompositeOperation = "source-atop";
  const w = y.createLinearGradient(0, c, 0, h);
  w.addColorStop(0, "rgb(255,255,255)"), w.addColorStop(0.42, "rgb(238,240,244)"), w.addColorStop(0.78, "rgb(196,201,211)"), w.addColorStop(1, "rgb(152,159,174)"), y.fillStyle = w, y.fillRect(0, 0, s, t);
  const T = o ? 3 : 2;
  for (let z = 0; z < T; z++) {
    const L = l + d * b(e, 0.22, 0.78), Y = h - u * b(e, 0.55, 0.95), tt = t * b(e, 0.18, 0.32), et = y.createRadialGradient(L, Y, 0, L, Y, tt);
    et.addColorStop(0, "rgba(255,255,255,0.55)"), et.addColorStop(1, "rgba(255,255,255,0)"), y.fillStyle = et, y.beginPath(), y.arc(L, Y, tt, 0, E), y.fill();
  }
  y.globalCompositeOperation = "destination-in";
  const W = m((h - a * 1.5) / t), Bt = m((h + a * 1.2) / t), U = y.createLinearGradient(0, 0, 0, t);
  return U.addColorStop(0, "rgba(0,0,0,1)"), U.addColorStop(W, "rgba(0,0,0,1)"), U.addColorStop(Math.max(Bt, W + 1e-3), "rgba(0,0,0,0)"), U.addColorStop(1, "rgba(0,0,0,0)"), y.fillStyle = U, y.fillRect(0, 0, s, t), y.globalCompositeOperation = "source-over", v;
}
function Gs(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = _(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
const qs = 3846, Pe = 3, ke = 512, Oe = 128, Vs = 6 * 6 * 3;
class Ws {
  constructor() {
    this.name = "fog", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.bands = [];
  }
  setup(t) {
    const e = K(qs);
    this.base = [];
    for (let n = 0; n < Pe; n++)
      this.base.push(Ys(ke, Oe, e));
    this.tinted = [], this.tintValid = !1;
    const i = t.quality.fogLayers;
    this.bands = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = i <= 1 ? 1 : n / (i - 1);
      this.bands[n] = {
        variant: n % Pe,
        nx: e(),
        ny: S(0.5, 1.02, r) + b(e, -0.05, 0.05),
        thickness: S(0.18, 0.42, r) * b(e, 0.85, 1.2),
        speed: S(4e-3, 0.016, r) * b(e, 0.7, 1.4),
        alpha: S(0.5, 1, r) * b(e, 0.8, 1.1),
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
      d.nx = Dt(d.nx + d.speed * l * a, 1);
      const f = this.tinted[d.variant], p = d.thickness * o, u = Math.max(r * 1.6, p * (ke / Oe)), g = e.reducedMotion ? 0 : Math.sin(e.time * 0.07 + d.bobPhase) * o * 0.012, v = d.ny * o - p / 2 + g + e.parallaxY * 1.4, y = -d.nx * u + e.parallaxX * 1.4;
      t.globalAlpha = m(d.alpha * i * 0.55), t.drawImage(f, y, v, u, p), t.drawImage(f, y + u, v, u, p);
    }
    t.restore();
    const h = o * 0.55, c = t.createLinearGradient(0, h, 0, o);
    c.addColorStop(0, _(n, 0)), c.addColorStop(1, _(n, 0.32 * i)), t.fillStyle = c, t.fillRect(0, h, r, o - h);
  }
  ensureTint(t) {
    this.tintValid && q(t, this.tintColor) < Vs || (this.tinted = this.base.map((e) => js(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.bands = [], this.tintValid = !1;
  }
}
function Ys(s, t, e) {
  const i = document.createElement("canvas");
  i.width = s, i.height = t;
  const n = i.getContext("2d");
  if (!n)
    return i;
  const r = 14 + Math.floor(e() * 8);
  for (let a = 0; a < r; a++) {
    const l = e() * s, h = t * b(e, 0.3, 0.7), c = s * b(e, 0.08, 0.22), d = t * b(e, 0.3, 0.6), f = b(e, 0.1, 0.28), p = [0];
    l < c ? p.push(s) : l > s - c && p.push(-s);
    for (const u of p) {
      const g = l + u, v = n.createRadialGradient(g, h, 0, g, h, Math.max(c, d));
      v.addColorStop(0, `rgba(255,255,255,${f.toFixed(3)})`), v.addColorStop(0.6, `rgba(255,255,255,${(f * 0.4).toFixed(3)})`), v.addColorStop(1, "rgba(255,255,255,0)"), n.fillStyle = v, n.beginPath(), n.ellipse(g, h, c, d, 0, 0, Math.PI * 2), n.fill();
    }
  }
  n.globalCompositeOperation = "destination-in";
  const o = n.createLinearGradient(0, 0, 0, t);
  return o.addColorStop(0, "rgba(0,0,0,0)"), o.addColorStop(0.35, "rgba(0,0,0,1)"), o.addColorStop(0.7, "rgba(0,0,0,1)"), o.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = o, n.fillRect(0, 0, s, t), n.globalCompositeOperation = "source-over", i;
}
function js(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = _(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
const Xs = 10783, ft = 3;
class Qs {
  constructor() {
    this.name = "rain", this.drops = [], this.active = 0;
  }
  setup(t) {
    const e = K(Xs), i = t.quality.rainParticles;
    this.drops = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = n % ft, o = r / (ft - 1);
      this.drops[n] = {
        nx: e(),
        ny: e(),
        speed: S(0.75, 1.7, o) * b(e, 0.85, 1.15),
        length: S(0.02, 0.058, o) * b(e, 0.8, 1.3),
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
    const l = S(0.06, 0.5, m(e.weather.wind)) * (e.reducedMotion ? 0.3 : 1), h = e.reducedMotion ? 0.25 : 1, c = k(e.palette.ambient, [225, 238, 255], 0.62);
    for (let d = 0; d < ft; d++) {
      const f = d / (ft - 1);
      t.strokeStyle = _(c, S(0.11, 0.3, f) * i), t.lineWidth = S(0.7, 1.4, f), t.lineCap = "round", t.beginPath();
      for (let p = d; p < a; p += ft) {
        const u = this.drops[p];
        u.ny += u.speed * h * o, u.nx += u.speed * l * h * o * (r / Math.max(1, n)), u.ny > 1.05 && (u.ny -= 1.1, u.nx = Math.random()), u.nx > 1.05 ? u.nx -= 1.1 : u.nx < -0.05 && (u.nx += 1.1);
        const g = u.nx * n, v = u.ny * r, y = u.length * r;
        t.moveTo(g, v), t.lineTo(g - y * l, v - y);
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
    l.addColorStop(0, _(e.palette.ambient, 0)), l.addColorStop(1, _(e.palette.ambient, 0.3 * a)), t.fillStyle = l, t.fillRect(0, o, n, r - o);
  }
  destroy() {
    this.drops.length = 0, this.active = 0;
  }
}
const Ks = 6230212, gt = 3;
class Zs {
  constructor() {
    this.name = "snow", this.flakes = [], this.active = 0;
  }
  setup(t) {
    const e = K(Ks), i = t.quality.snowParticles;
    this.flakes = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = n % gt, o = r / (gt - 1);
      this.flakes[n] = {
        nx: e(),
        ny: e(),
        speed: S(0.035, 0.14, o) * b(e, 0.8, 1.25),
        radius: S(16e-4, 5e-3, o) * b(e, 0.8, 1.3),
        driftAmplitude: b(e, 8e-3, 0.035) * S(0.6, 1.4, o),
        driftFrequency: b(e, 0.25, 0.8),
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
    const { width: n, height: r, dt: o } = e, a = Math.min(n, r), l = Math.round(this.flakes.length * i);
    this.active = l;
    const h = e.reducedMotion ? 0.2 : 1, c = S(4e-3, 0.05, m(e.weather.wind)) * h, d = k(e.palette.ambient, [255, 255, 255], 0.85);
    for (let f = 0; f < gt; f++) {
      const p = f / (gt - 1);
      t.fillStyle = _(d, S(0.4, 0.85, p) * i), t.beginPath();
      for (let u = f; u < l; u += gt) {
        const g = this.flakes[u];
        g.ny += g.speed * h * o, g.nx += c * o, g.ny > 1.05 && (g.ny -= 1.1, g.nx = Math.random()), g.nx > 1.05 ? g.nx -= 1.1 : g.nx < -0.05 && (g.nx += 1.1);
        const v = e.reducedMotion ? 0 : Math.sin(e.time * g.driftFrequency + g.driftPhase) * g.driftAmplitude, y = (g.nx + v) * n, w = g.ny * r, T = g.radius * a;
        t.moveTo(y + T, w), t.arc(y, w, T, 0, E);
      }
      t.fill();
    }
  }
  destroy() {
    this.flakes.length = 0, this.active = 0;
  }
}
const Re = 45079;
class Js {
  constructor() {
    this.name = "lightning", this.rng = K(Re), this.strike = null, this.cooldown = 6;
  }
  setup() {
    this.rng = K(Re), this.strike = null, this.cooldown = b(this.rng, 4, 12);
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
      this.strike = this.createStrike(e), this.cooldown = S(26, 3, i) * b(this.rng, 0.7, 1.4);
    }
    const a = this.strike;
    if (a.elapsed += n, a.elapsed > a.total) {
      this.strike = null;
      return;
    }
    let l = 0;
    for (const p of a.flashes) {
      const u = a.elapsed - p.at;
      if (u < 0 || u > p.duration)
        continue;
      const g = u / p.duration, v = g < 0.18 ? g / 0.18 : Math.pow(1 - (g - 0.18) / 0.82, 2);
      l = Math.max(l, p.peak * v);
    }
    if (l <= 4e-3)
      return;
    const h = a.x * r, c = a.y * o, d = Math.max(r, o) * 1.15;
    t.save(), t.globalCompositeOperation = "lighter";
    const f = t.createRadialGradient(h, c, 0, h, c, d);
    f.addColorStop(0, `rgba(214,228,255,${(l * 0.85).toFixed(4)})`), f.addColorStop(0.45, `rgba(188,206,246,${(l * 0.35).toFixed(4)})`), f.addColorStop(1, "rgba(170,190,240,0)"), t.fillStyle = f, t.fillRect(0, 0, r, o), a.bolt && e.quality.lightningBolts && a.elapsed <= a.boltVisibleUntil && l > 0.05 && this.drawBolt(t, e, a, l), t.restore();
  }
  createStrike(t) {
    const e = this.rng, i = 2 + Math.floor(e() * 3), n = [];
    let r = 0;
    for (let d = 0; d < i; d++) {
      const f = b(e, 0.09, 0.22);
      n.push({
        at: r,
        duration: f,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: d === 0 ? b(e, 0.18, 0.3) : b(e, 0.06, 0.14)
      }), r += f + b(e, 0.04, 0.16);
    }
    const o = b(e, 0.12, 0.88), a = b(e, 0.05, 0.3), h = t.quality.lightningBolts && e() < 0.55 ? Le(e, o, a, b(e, 0.55, 0.85)) : null, c = [];
    if (h) {
      const d = Math.floor(e() * 3);
      for (let f = 0; f < d; f++) {
        const p = h[1 + Math.floor(e() * (h.length - 2))];
        c.push(
          Le(e, p.x, p.y, p.y + b(e, 0.08, 0.22), 0.45)
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
function Le(s, t, e, i, n = 1) {
  let r = [
    { x: t, y: e },
    { x: t + b(s, -0.06, 0.06) * n, y: i }
  ];
  for (let o = 0; o < 5; o++) {
    const a = [r[0]], l = 0.045 * n * Math.pow(0.62, o);
    for (let h = 1; h < r.length; h++) {
      const c = r[h - 1], d = r[h];
      a.push({
        x: (c.x + d.x) / 2 + b(s, -l, l),
        y: (c.y + d.y) / 2
      }), a.push(d);
    }
    r = a;
  }
  return r;
}
class tn {
  constructor(t, e, i) {
    this.sky = new As(), this.stars = new Ts(), this.moon = new Ps(), this.sun = new ks(), this.clouds = new Ns(), this.fog = new Ws(), this.rain = new Qs(), this.snow = new Zs(), this.lightning = new Js(), this.reducedMotion = !1, this.parallaxTargetX = 0, this.parallaxTargetY = 0, this.parallaxX = 0, this.parallaxY = 0, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = i, this.renderers = [
      this.sky,
      this.stars,
      this.moon,
      this.sun,
      this.clouds,
      this.fog,
      this.rain,
      this.snow,
      this.lightning
    ], this.season = Ee(/* @__PURE__ */ new Date(), i.latitude), this.blender = new Ms(ni(i.condition)), this.blender.snapTo(this.targetProfile()), this.elevation = i.sunElevation, this.azimuth = i.sunAzimuth, this.palette = Qt({
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
    this.snapshot = t, this.season = Ee(/* @__PURE__ */ new Date(), t.latitude), this.state.season = this.season, this.blender.setTarget(this.targetProfile());
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
    const t = xs(this.snapshot);
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
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.parallaxX = this.parallaxTargetX, this.parallaxY = this.parallaxTargetY, this.blender.snapTo(this.targetProfile()), this.palette = Qt({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
  }
  update(t, e) {
    const i = this.state;
    i.dt = t, i.time = e, this.elevation = Pt(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = en(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const n = this.blender.update(t), r = Qt({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: n,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
    this.palette = us(this.palette, r, 0.6, t), this.config.effects.parallax && !this.reducedMotion ? (this.parallaxX = Pt(this.parallaxX, this.parallaxTargetX, 0.25, t), this.parallaxY = Pt(this.parallaxY, this.parallaxTargetY, 0.25, t)) : (this.parallaxX = 0, this.parallaxY = 0), i.parallaxX = this.parallaxX, i.parallaxY = this.parallaxY;
    const { dayFactor: o, nightFactor: a, twilightFactor: l } = si(this.elevation);
    i.sunElevation = this.elevation, i.sunAzimuth = this.azimuth, i.sunRising = this.snapshot.sunRising, i.dayFactor = o, i.nightFactor = a, i.twilightFactor = l, i.palette = this.palette, i.weather = n, i.sunX = m((this.azimuth - 60) / 240), i.sunY = this.elevation >= 0 ? 0.94 - Math.pow(m(this.elevation / 60), 0.7) * 0.84 : x(0.94 + -this.elevation / 20 * 0.18, 0.94, 1.2);
    const h = /* @__PURE__ */ new Date(), c = ms(h), d = ys(h, this.snapshot.latitude, c);
    i.moonPhase = c, i.moonX = S(0.08, 0.92, m(d.azimuthFraction)), i.moonY = x(1.02 - m(d.altitude / 70) * 0.88, 0.08, 1.1), i.moonVisible = this.config.effects.moon && d.altitude > 2 && a > 0.08 && c > 0.03 && c < 0.97;
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
function en(s, t, e, i) {
  let n = (t - s + 540) % 360 - 180;
  const r = e <= 0 ? 1 : 1 - Math.pow(2, -i / e);
  return n *= r, (s + n + 360) % 360;
}
const sn = 400, Tt = 4 * 4 * 3, nn = [
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
class rn {
  constructor() {
    this.last = null, this.lastWrite = 0, this.active = !1;
  }
  /** True while properties are on the document. */
  get isActive() {
    return this.active;
  }
  update(t, e = !1) {
    const i = performance.now();
    if (!e && i - this.lastWrite < sn)
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
    r.setProperty("--aurora-ambient-color", _(n.ambient)), r.setProperty("--aurora-ambient-rgb", o(n.ambient)), r.setProperty("--aurora-sky-color", _(n.sky)), r.setProperty("--aurora-horizon-color", _(n.horizon)), r.setProperty("--aurora-accent-color", _(n.accent)), r.setProperty("--aurora-accent-rgb", o(n.accent)), r.setProperty("--aurora-glow-strength", n.glow.toFixed(3)), r.setProperty("--aurora-night", n.night.toFixed(3)), r.setProperty("--aurora-day", (1 - n.night).toFixed(3));
    const a = Ft(n.sky) > 140;
    r.setProperty("--aurora-contrast-color", a ? "#10151f" : "#f2f6ff");
    const l = k(n.ambient, a ? [12, 16, 24] : [235, 243, 255], 0.72);
    r.setProperty("--aurora-card-tint", _(l, a ? 0.5 : 0.14)), r.setProperty(
      "--aurora-card-border",
      _(a ? [255, 255, 255] : [255, 255, 255], a ? 0.28 : 0.16)
    ), r.setProperty("--aurora-season", t.season.name), r.setProperty("--aurora-condition", t.weather.condition);
  }
  changed(t, e) {
    return q(t.ambient, e.ambient) > Tt || q(t.sky, e.sky) > Tt || q(t.horizon, e.horizon) > Tt || q(t.accent, e.accent) > Tt || Math.abs(t.glow - e.glow) > 0.02 || Math.abs(t.night - e.night) > 0.02;
  }
  /** Remove every property again – called when the last Aurora card unmounts. */
  clear() {
    if (!this.active)
      return;
    const t = document.documentElement.style;
    for (const e of nn)
      t.removeProperty(e);
    this.active = !1, this.last = null;
  }
}
const on = 500, De = 5 * 5 * 3, an = [
  "--ha-card-background",
  "--card-background-color",
  "--ha-card-backdrop-filter",
  "--ha-card-border-color",
  "--ha-card-border-width",
  "--ha-card-box-shadow",
  "--ha-card-border-radius",
  "--aurora-glass-surface"
], ze = ["--primary-text-color", "--secondary-text-color"];
class ln {
  constructor() {
    this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastWrite = 0, this.active = !1, this.textActive = !1;
  }
  update(t, e, i = !1) {
    if (!e.enabled) {
      this.clear();
      return;
    }
    const n = performance.now();
    if (!i && n - this.lastWrite < on)
      return;
    const r = Ft(t.palette.middle) > 145, o = k(
      t.palette.ambient,
      r ? [14, 18, 27] : [226, 236, 252],
      0.7
    ), a = t.palette.sunGlow, l = m(t.dayFactor * 0.5 + t.twilightFactor * 0.9 + t.nightFactor * 0.25) * e.glow;
    if (!i && this.lastSurface && this.lastAccent && q(this.lastSurface, o) < De && q(this.lastAccent, a) < De && Math.abs(this.lastGlow - l) < 0.03) {
      this.lastWrite = n;
      return;
    }
    this.lastWrite = n, this.lastSurface = o, this.lastAccent = a, this.lastGlow = l, this.active = !0;
    const h = document.documentElement.style, c = m(e.opacity * (r ? 1.15 : 1)), d = _(o, c);
    h.setProperty("--aurora-glass-surface", d), h.setProperty("--ha-card-background", d), h.setProperty("--card-background-color", d), h.setProperty(
      "--ha-card-backdrop-filter",
      e.blur > 0 ? `blur(${e.blur}px) saturate(${e.saturate})` : "none"
    ), e.border ? (h.setProperty("--ha-card-border-width", "1px"), h.setProperty(
      "--ha-card-border-color",
      _(r ? [255, 255, 255] : [255, 255, 255], r ? 0.3 : 0.16)
    )) : (h.setProperty("--ha-card-border-width", "0px"), h.setProperty("--ha-card-border-color", "transparent"));
    const f = `0 6px 24px rgba(0,0,0,${(0.18 + (r ? 0.06 : 0.14)).toFixed(3)})`, p = l > 0.01 ? `, 0 0 36px ${_(a, m(l * 0.16))}` : "";
    if (h.setProperty("--ha-card-box-shadow", f + p), e.radius >= 0 ? h.setProperty("--ha-card-border-radius", `${e.radius}px`) : h.removeProperty("--ha-card-border-radius"), e.adaptive_text) {
      const u = r ? [16, 21, 31] : [240, 245, 255];
      h.setProperty("--primary-text-color", _(u)), h.setProperty(
        "--secondary-text-color",
        _(k(u, o, 0.35), S(0.75, 0.85, m(l)))
      ), this.textActive = !0;
    } else if (this.textActive) {
      for (const u of ze)
        h.removeProperty(u);
      this.textActive = !1;
    }
  }
  /** Hand every managed property back to the user's theme. */
  clear() {
    if (!this.active && !this.textActive)
      return;
    const t = document.documentElement.style;
    for (const e of an)
      t.removeProperty(e);
    if (this.textActive) {
      for (const e of ze)
        t.removeProperty(e);
      this.textActive = !1;
    }
    this.active = !1, this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1;
  }
}
const hn = (s) => `
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
class Fe {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", hn(e)), t.appendChild(this.element);
  }
  update(t, e, i, n, r) {
    const o = performance.now();
    if (o - this.lastUpdate < 250)
      return;
    this.lastUpdate = o;
    const a = [
      `AURORA BACKGROUND  v${te}`,
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
const Ie = 42e5, cn = 0.06, Ne = 0.012;
class ri {
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
      this.destroyed || (this.scene.setEnvironment(Te(this.hass, this.config)), this.engine.isRunning || this.renderOnce());
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
    }, this.config = e, this.hass = i, this.ambient = n ? new rn() : null, this.glass = n ? new ln() : null, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1, desynchronized: !0 });
    const r = this.resolveQuality();
    this.performance = new rs(
      r,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, ut(r).maxFps)
    ), this.scene = new tn(
      e,
      ut(r),
      Te(i, e)
    ), this.engine = new ss(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new Fe(this.host, this.debugTopOffset())), this.updateRunState();
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
    (n || r) && this.applyCanvasFilter(), i && (t.debug && !this.debugOverlay ? this.debugOverlay = new Fe(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.ambient && !t.background.ambient_variables && this.ambient.clear(), this.glass && !t.glass.enabled && this.glass.clear(), this.pushParallax(), this.refreshEnvironment(), this.updateRunState();
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
    return this.config.quality === "auto" ? gi() : this.config.quality;
  }
  applyQuality(t) {
    const e = ut(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = ut(this.performance.quality);
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
      this.pointerX * t * Ne,
      this.scrollOffset * t * cn + this.pointerY * t * Ne * 0.6
    );
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), i = Math.max(1, Math.round(t.height)), n = ut(this.performance.quality);
    let o = Math.min(window.devicePixelRatio || 1, n.maxDpr) * n.renderScale;
    const a = e * i * o * o;
    a > Ie && (o *= Math.sqrt(Ie / a));
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
const He = "aurora-background-root", Ue = "aurora-background-style";
class dn {
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
      document.getElementById(He)?.remove();
      const e = document.createElement("div");
      e.id = He, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new ri(this.root, t, e?.hass, !0);
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
      const r = Be(t);
      this.writeStyle(r ? `:root{${r}}` : "");
      return;
    }
    const e = [], i = [];
    t.background.transparent_lovelace && (i.push("--lovelace-background:transparent !important"), i.push("--view-background:transparent !important"), i.push("--ha-view-background:transparent !important"), e.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), t.background.transparent_header && (i.push("--app-header-background-color:transparent !important"), i.push("--header-height-background:transparent !important"));
    const n = Be(t);
    n && i.push(n), i.length > 0 && e.unshift(`:root{${i.join(";")}}`), this.writeStyle(e.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(Ue)?.remove();
      const e = document.createElement("style");
      e.id = Ue, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function Be(s) {
  const t = Object.entries(s.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, i]) => `${e}:${i} !important`).join(";");
}
const mt = new dn(), un = xt`
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
`, oi = xt`
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
var pn = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, ai = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? fn(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && pn(t, e, n), n;
};
const gn = {
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
function M(s) {
  return { name: s, selector: { boolean: {} } };
}
function O(s, t, e, i) {
  return { name: s, selector: { number: { min: t, max: e, step: i, mode: "slider" } } };
}
const mn = [
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
      O("blur", 0, 40, 1),
      O("opacity", 0, 1, 0.05),
      O("saturate", 1, 3, 0.05),
      O("glow", 0, 2, 0.05),
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
class Ht extends H {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => gn[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = qe(this.config);
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
    return customElements.get("ha-form") ? A`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${mn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : A`
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
      type: this.config.type ?? `custom:${nt}`,
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
Ht.styles = oi;
ai([
  lt({ attribute: !1 })
], Ht.prototype, "hass", 2);
ai([
  R()
], Ht.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", Ht);
var yn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, Ut = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? bn(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && yn(t, e, n), n;
};
const vn = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function wn(s, t = 30) {
  let e = s;
  for (let i = 0; i < t && e; i++) {
    if (e instanceof HTMLElement && vn.includes(e.tagName))
      return !0;
    const n = e.parentNode;
    if (!n)
      break;
    e = n instanceof ShadowRoot ? n.host : n;
  }
  return !1;
}
class dt extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = qe(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = Jt(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, i = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && i === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = i, this.config.mode === "background" ? mt.updateHass(this, t) : this.cardLayer?.updateHass(t));
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
      type: `custom:${nt}`,
      weather_entity: Jt(t),
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
      this.isConnected && (this.editing = this.preview || wn(this));
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
      this.destroyCardLayer(), this.mounted ? mt.update(this, t, this._hass) : (mt.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (mt.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new ri(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (mt.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? A`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? A`<div class="surface"></div>` : this.editing ? A`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${te} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : $ : $;
  }
}
dt.styles = un;
Ut([
  lt({ type: Boolean })
], dt.prototype, "preview", 2);
Ut([
  R()
], dt.prototype, "config", 2);
Ut([
  R()
], dt.prototype, "editing", 2);
Ut([
  R()
], dt.prototype, "errorMessage", 2);
customElements.get(nt) || customElements.define(nt, dt);
var _n = Object.defineProperty, Sn = Object.getOwnPropertyDescriptor, li = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Sn(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && _n(t, e, n), n;
};
const $n = {
  entity: "Entity",
  name: "Name",
  icon: "Icon",
  slider: "Drag to adjust",
  use_light_color: "Tint with the light colour",
  show_modes: "Show mode buttons"
};
class Mt extends H {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => $n[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  render() {
    return customElements.get("ha-form") ? A`
      <div class="hint">${this.hint}</div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData(this.config)}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : A`
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
Mt.styles = oi;
li([
  lt({ attribute: !1 })
], Mt.prototype, "hass", 2);
li([
  R()
], Mt.prototype, "config", 2);
const xn = [
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
class Cn extends Mt {
  get schema() {
    return xn;
  }
  get cardType() {
    return at;
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
const Mn = [
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
class An extends Mt {
  get schema() {
    return Mn;
  }
  get cardType() {
    return ot;
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
customElements.get("aurora-light-editor") || customElements.define("aurora-light-editor", Cn);
customElements.get("aurora-climate-editor") || customElements.define("aurora-climate-editor", An);
const Kt = "https://github.com/iiNoNoNoii/Aurora-UI", En = [
  {
    type: nt,
    name: ui,
    description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
    preview: !1,
    documentationURL: Kt
  },
  {
    type: at,
    name: "Aurora Light",
    description: "Light tile that takes the bulb’s own colour. Drag for brightness, tap to toggle.",
    preview: !1,
    documentationURL: Kt
  },
  {
    type: ot,
    name: "Aurora Climate",
    description: "Thermostat with a large target temperature and a surface that warms with it.",
    preview: !1,
    documentationURL: Kt
  }
], Ge = window.customCards = window.customCards || [];
for (const s of En)
  Ge.some((t) => t.type === s.type) || Ge.push(s);
console.info(
  `%c AURORA UI %c v${te} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  dt as AuroraBackgroundCard,
  Ht as AuroraBackgroundEditor,
  ht as AuroraClimateCard,
  ct as AuroraLightCard
};
