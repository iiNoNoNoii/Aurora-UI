const k = Math.PI * 2;
function A(n, t, e) {
  return n < t ? t : n > e ? e : n;
}
function y(n) {
  return A(n, 0, 1);
}
function w(n, t, e) {
  return n + (t - n) * e;
}
function Te(n, t, e) {
  return n === t ? e < n ? 0 : 1 : y((e - n) / (t - n));
}
function et(n, t, e) {
  const s = Te(n, t, e);
  return s * s * (3 - 2 * s);
}
function ut(n, t, e, s) {
  if (e <= 0)
    return t;
  const i = 1 - Math.pow(2, -s / e);
  return n + (t - n) * i;
}
function U(n) {
  let t = n >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let s = t;
    return s = Math.imul(s ^ s >>> 15, s | 1), s ^= s + Math.imul(s ^ s >>> 7, s | 61), ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
function v(n, t, e) {
  return t + n() * (e - t);
}
function mt(n, t) {
  const e = n % t;
  return e < 0 ? e + t : e;
}
function O(n) {
  return n * Math.PI / 180;
}
function Dt(n) {
  return n * 180 / Math.PI;
}
const q = "aurora-background", Oe = "Aurora Background", Et = "0.4.0-alpha", $t = ["low", "medium", "high", "ultra"], ze = ["background", "card"], Fe = {
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
function Q(n) {
  return { ...Fe[n] };
}
function It(n, t) {
  const e = $t.indexOf(n);
  return $t[A(e + t, 0, $t.length - 1)];
}
function Le() {
  if (typeof window > "u")
    return "medium";
  const n = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), s = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return n <= 2 || t <= 2 ? "low" : s && e <= 480 ? "medium" : s ? n >= 6 ? "high" : "medium" : n >= 8 && t >= 8 ? "high" : "medium";
}
function C(n, t) {
  return typeof n == "boolean" ? n : n === "true" ? !0 : n === "false" ? !1 : t;
}
function E(n, t, e, s) {
  const i = typeof n == "number" ? n : Number.parseFloat(String(n));
  return Number.isFinite(i) ? A(i, e, s) : t;
}
function Nt(n, t) {
  return typeof n == "string" && n.length > 0 ? n : t;
}
function Ht(n, t, e) {
  return t.includes(n) ? n : e;
}
function De(n) {
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
const Ie = "sun.sun";
function ye(n) {
  const t = n ?? {}, e = t.effects ?? {}, s = t.appearance ?? {}, i = t.performance ?? {}, o = t.background ?? {}, r = typeof t.glass == "boolean" ? { enabled: t.glass } : t.glass ?? {}, a = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : Ie, l = Ht(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: Nt(t.type, `custom:${q}`),
    mode: Ht(t.mode, ze, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: a,
    quality: l,
    debug: C(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : Nt(t.height, "320px"),
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
      intensity: E(s.intensity, 1, 0, 2),
      saturation: E(s.saturation, 1, 0, 2),
      brightness: E(s.brightness, 1, 0.2, 2),
      blur: E(s.blur, 0, 0, 40),
      ambient_glow: E(s.ambient_glow, 1, 0, 2),
      opacity: E(s.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: E(i.max_fps, 60, 10, 120),
      auto_quality: C(i.auto_quality, !0),
      pause_when_hidden: C(i.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: C(o.transparent_lovelace, !0),
      transparent_header: C(o.transparent_header, !0),
      css_variables: De(o.css_variables),
      z_index: E(o.z_index, -1, -100, 100),
      ambient_variables: C(o.ambient_variables, !0)
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: C(r.enabled, !1),
      blur: E(r.blur, 14, 0, 40),
      opacity: E(r.opacity, 0.5, 0, 1),
      saturate: E(r.saturate, 1.4, 1, 3),
      border: C(r.border, !0),
      glow: E(r.glow, 1, 0, 2),
      radius: E(r.radius, 18, -1, 60),
      adaptive_text: C(r.adaptive_text, !1)
    }
  };
}
const pt = globalThis, kt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pt = Symbol(), Gt = /* @__PURE__ */ new WeakMap();
let be = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Pt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (kt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Gt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Gt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ne = (n) => new be(typeof n == "string" ? n : n + "", void 0, Pt), we = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, o) => s + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[o + 1], n[0]);
  return new be(e, n, Pt);
}, He = (n, t) => {
  if (kt)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = pt.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
    }
}, Ut = kt ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return Ne(e);
})(n) : n;
const { is: Ge, defineProperty: Ue, getOwnPropertyDescriptor: qe, getOwnPropertyNames: Ve, getOwnPropertySymbols: We, getPrototypeOf: Be } = Object, I = globalThis, qt = I.trustedTypes, Ye = qt ? qt.emptyScript : "", Xe = I.reactiveElementPolyfillSupport, st = (n, t) => n, ft = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Ye : null;
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
} }, Rt = (n, t) => !Ge(n, t), Vt = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: Rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), I.litPropertyMetadata ?? (I.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let W = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Vt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Ue(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = qe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const a = i?.call(this);
      o?.call(this, r), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Vt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(st("elementProperties")))
      return;
    const t = Be(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(st("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(st("properties"))) {
      const e = this.properties, s = [...Ve(e), ...We(e)];
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
        e.unshift(Ut(i));
    } else
      t !== void 0 && e.push(Ut(t));
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
    return He(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : ft).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), r = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : ft;
      this._$Em = i;
      const a = r.fromAttribute(e, o.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    if (t !== void 0) {
      const r = this.constructor;
      if (i === !1 && (o = this[t]), s ?? (s = r.getPropertyOptions(t)), !((s.hasChanged ?? Rt)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s))))
        return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [i, o] of this._$Ep)
          this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0)
        for (const [i, o] of s) {
          const { wrapped: r } = o, a = this[i];
          r !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, o, a);
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
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[st("elementProperties")] = /* @__PURE__ */ new Map(), W[st("finalized")] = /* @__PURE__ */ new Map(), Xe?.({ ReactiveElement: W }), (I.reactiveElementVersions ?? (I.reactiveElementVersions = [])).push("2.1.2");
const it = globalThis, Wt = (n) => n, gt = it.trustedTypes, Bt = gt ? gt.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ve = "$lit$", L = `lit$${Math.random().toFixed(9).slice(2)}$`, Se = "?" + L, je = `<${Se}>`, V = document, rt = () => V.createComment(""), at = (n) => n === null || typeof n != "object" && typeof n != "function", Tt = Array.isArray, Qe = (n) => Tt(n) || typeof n?.[Symbol.iterator] == "function", Ct = `[ 	
\f\r]`, K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Yt = /-->/g, Xt = />/g, N = RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), jt = /'/g, Qt = /"/g, _e = /^(?:script|style|textarea|title)$/i, Ke = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), nt = Ke(1), Y = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Kt = /* @__PURE__ */ new WeakMap(), G = V.createTreeWalker(V, 129);
function $e(n, t) {
  if (!Tt(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(t) : t;
}
const Je = (n, t) => {
  const e = n.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = K;
  for (let a = 0; a < e; a++) {
    const l = n[a];
    let h, c, d = -1, p = 0;
    for (; p < l.length && (r.lastIndex = p, c = r.exec(l), c !== null); )
      p = r.lastIndex, r === K ? c[1] === "!--" ? r = Yt : c[1] !== void 0 ? r = Xt : c[2] !== void 0 ? (_e.test(c[2]) && (i = RegExp("</" + c[2], "g")), r = N) : c[3] !== void 0 && (r = N) : r === N ? c[0] === ">" ? (r = i ?? K, d = -1) : c[1] === void 0 ? d = -2 : (d = r.lastIndex - c[2].length, h = c[1], r = c[3] === void 0 ? N : c[3] === '"' ? Qt : jt) : r === Qt || r === jt ? r = N : r === Yt || r === Xt ? r = K : (r = N, i = void 0);
    const u = r === N && n[a + 1].startsWith("/>") ? " " : "";
    o += r === K ? l + je : d >= 0 ? (s.push(h), l.slice(0, d) + ve + l.slice(d) + L + u) : l + L + (d === -2 ? a : u);
  }
  return [$e(n, o + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class lt {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, l = this.parts, [h, c] = Je(t, e);
    if (this.el = lt.createElement(h, s), G.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = G.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const d of i.getAttributeNames())
            if (d.endsWith(ve)) {
              const p = c[r++], u = i.getAttribute(d).split(L), f = /([.?@])?(.*)/.exec(p);
              l.push({ type: 1, index: o, name: f[2], strings: u, ctor: f[1] === "." ? ts : f[1] === "?" ? es : f[1] === "@" ? ss : yt }), i.removeAttribute(d);
            } else
              d.startsWith(L) && (l.push({ type: 6, index: o }), i.removeAttribute(d));
        if (_e.test(i.tagName)) {
          const d = i.textContent.split(L), p = d.length - 1;
          if (p > 0) {
            i.textContent = gt ? gt.emptyScript : "";
            for (let u = 0; u < p; u++)
              i.append(d[u], rt()), G.nextNode(), l.push({ type: 2, index: ++o });
            i.append(d[p], rt());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Se)
          l.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = i.data.indexOf(L, d + 1)) !== -1; )
            l.push({ type: 7, index: o }), d += L.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = V.createElement("template");
    return s.innerHTML = t, s;
  }
}
function X(n, t, e = n, s) {
  if (t === Y)
    return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = at(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = X(n, i._$AS(n, t.values), i, s)), t;
}
class Ze {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? V).importNode(e, !0);
    G.currentNode = i;
    let o = G.nextNode(), r = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let h;
        l.type === 2 ? h = new ht(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new is(o, this, t)), this._$AV.push(h), l = s[++a];
      }
      r !== l?.index && (o = G.nextNode(), r++);
    }
    return G.currentNode = V, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class ht {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = X(this, t, e), at(t) ? t === x || t == null || t === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== Y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== x && at(this._$AH) ? this._$AA.nextSibling.data = t : this.T(V.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = lt.createElement($e(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i)
      this._$AH.p(e);
    else {
      const o = new Ze(i, this), r = o.u(this.options);
      o.p(e), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Kt.get(t.strings);
    return e === void 0 && Kt.set(t.strings, e = new lt(t)), e;
  }
  k(t) {
    Tt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t)
      i === e.length ? e.push(s = new ht(this.O(rt()), this.O(rt()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Wt(t).nextSibling;
      Wt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class yt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = x;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = X(this, t, e, 0), r = !at(t) || t !== this._$AH && t !== Y, r && (this._$AH = t);
    else {
      const a = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        h = X(this, a[s + l], e, l), h === Y && (h = this._$AH[l]), r || (r = !at(h) || h !== this._$AH[l]), h === x ? t = x : t !== x && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ts extends yt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }
}
class es extends yt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== x);
  }
}
class ss extends yt {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = X(this, t, e, 0) ?? x) === Y)
      return;
    const s = this._$AH, i = t === x && s !== x || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== x && (s === x || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class is {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    X(this, t);
  }
}
const ns = it.litHtmlPolyfillSupport;
ns?.(lt, ht), (it.litHtmlVersions ?? (it.litHtmlVersions = [])).push("3.3.3");
const os = (n, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new ht(t.insertBefore(rt(), o), o, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
const ot = globalThis;
class B extends W {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = os(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Y;
  }
}
B._$litElement$ = !0, B.finalized = !0, ot.litElementHydrateSupport?.({ LitElement: B });
const rs = ot.litElementPolyfillSupport;
rs?.({ LitElement: B });
(ot.litElementVersions ?? (ot.litElementVersions = [])).push("4.2.2");
const as = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: Rt }, ls = (n = as, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), o.set(e.name, n), s === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, n, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, n, a), a;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, n, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Ot(n) {
  return (t, e) => typeof e == "object" ? ls(n, t, e) : ((s, i, o) => {
    const r = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), r ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(n, t, e);
}
function bt(n) {
  return Ot({ ...n, state: !0, attribute: !1 });
}
class hs {
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
        const o = Math.min(this.accumulator, 100) / 1e3;
        this.accumulator = 0, this.elapsed += o, this.callback(o, this.elapsed);
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
const cs = ["low", "medium", "high", "ultra"];
function Jt(n) {
  return cs.indexOf(n);
}
class ds {
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
    const i = [...this.frameTimes].sort((a, l) => a - l), o = i[Math.floor(i.length / 2)], r = 1e3 / this.targetFps;
    if (o > r * 0.55) {
      const a = It(this.level, -1);
      if (a !== this.level)
        return this.level = a, this.ceiling = a, this.frameTimes.length = 0, a;
    } else if (o < r * 0.18) {
      const a = It(this.level, 1);
      if (a !== this.level && Jt(a) <= Jt(this.ceiling))
        return this.level = a, this.frameTimes.length = 0, a;
    }
    return null;
  }
}
function z(n) {
  let t = n.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function S(n, t = 1) {
  const e = Math.round(A(n[0], 0, 255)), s = Math.round(A(n[1], 0, 255)), i = Math.round(A(n[2], 0, 255));
  return t >= 1 ? `rgb(${e},${s},${i})` : `rgba(${e},${s},${i},${A(t, 0, 1).toFixed(3)})`;
}
function T(n, t, e) {
  return [w(n[0], t[0], e), w(n[1], t[1], e), w(n[2], t[2], e)];
}
function wt(n) {
  return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
}
function us(n, t) {
  const e = wt(n);
  return T(n, [e, e, e], A(t, 0, 1));
}
function Mt(n, t) {
  return [A(n[0] * t, 0, 255), A(n[1] * t, 0, 255), A(n[2] * t, 0, 255)];
}
function ps(n, t) {
  const e = wt(n);
  return [
    A(e + (n[0] - e) * t, 0, 255),
    A(e + (n[1] - e) * t, 0, 255),
    A(e + (n[2] - e) * t, 0, 255)
  ];
}
function D(n, t) {
  const e = n[0] - t[0], s = n[1] - t[1], i = n[2] - t[2];
  return e * e + s * s + i * i;
}
function F(n, t) {
  return {
    elevation: n,
    palette: {
      zenith: z(t.zenith),
      upper: z(t.upper),
      middle: z(t.middle),
      lower: z(t.lower),
      horizon: z(t.horizon),
      sunCore: z(t.sunCore),
      sunGlow: z(t.sunGlow),
      ambient: z(t.ambient),
      cloud: z(t.cloud)
    }
  };
}
const H = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  F(-90, {
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
  F(-12, {
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
  F(-6, {
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
  F(-2, {
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
  F(3, {
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
  F(12, {
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
  F(35, {
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
  F(70, {
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
], zt = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], fs = [255, 118, 162], gs = [255, 138, 56];
function ms(n, t, e) {
  const s = {};
  for (const i of zt)
    s[i] = T(n[i], t[i], e);
  return s;
}
function ys(n) {
  if (n <= H[0].elevation)
    return { ...H[0].palette };
  const t = H[H.length - 1];
  if (n >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < H.length - 1; e++) {
    const s = H[e], i = H[e + 1];
    if (n >= s.elevation && n <= i.elevation) {
      const o = et(s.elevation, i.elevation, n);
      return ms(s.palette, i.palette, o);
    }
  }
  return { ...t.palette };
}
function Ce(n) {
  const t = et(-4, 8, n), e = 1 - et(-14, -2, n), s = et(-16, -3, n) * (1 - et(0, 10, n));
  return { dayFactor: t, nightFactor: e, twilightFactor: s };
}
const bs = {
  zenith: 0.15,
  upper: 0.3,
  middle: 0.55,
  lower: 0.85,
  horizon: 1,
  sunCore: 0.2,
  sunGlow: 0.6,
  ambient: 0.8,
  cloud: 0.5
}, ws = 0.1;
function xt(n) {
  const { elevation: t, rising: e, weather: s, appearance: i, season: o } = n, r = ys(t), { twilightFactor: a, dayFactor: l } = Ce(t), h = e ? fs : gs, c = a * 0.3, d = {}, p = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, u = y(s.desaturation) * 0.8, f = 1 - y(s.skyDarkness) * 0.75, g = o ? ws * (0.35 + 0.65 * l) : 0, b = o ? o.saturation : 1;
  for (const m of zt) {
    let _ = T(r[m], h, c * p[m]);
    o && g > 0 && (_ = T(_, o.tint, g * bs[m])), _ = us(_, u), _ = Mt(_, f), _ = ps(_, i.saturation * b), _ = Mt(_, i.brightness), d[m] = _;
  }
  return d.cloud = Mt(d.cloud, w(1, 0.32, y(s.cloudDarkness))), d;
}
function vs(n, t, e, s) {
  const i = e <= 0 ? 1 : 1 - Math.pow(2, -s / e), o = {};
  for (const r of zt)
    o[r] = T(n[r], t[r], i);
  return o;
}
const Zt = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: 3 * Math.PI / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1 }
}, te = ["summer", "autumn", "winter", "spring"];
function Ss(n) {
  const t = new Date(n.getFullYear(), 0, 0);
  return Math.floor((n.getTime() - t.getTime()) / 864e5);
}
function ee(n, t) {
  const e = (Ss(n) - 172) / 365.25 * k, s = t < 0 ? e + Math.PI : e;
  let i = 0;
  const o = { summer: 0, autumn: 0, winter: 0, spring: 0 };
  for (const u of te) {
    const f = Math.max(0, Math.cos(s - Zt[u].centre)), g = f * f;
    o[u] = g, i += g;
  }
  i <= 0 && (i = 1);
  let r = 0, a = 0, l = 0, h = 0, c = 0, d = "summer", p = -1;
  for (const u of te) {
    const f = o[u] / i, g = Zt[u];
    r += g.tint[0] * f, a += g.tint[1] * f, l += g.tint[2] * f, h += g.haze * f, c += g.saturation * f, f > p && (p = f, d = u);
  }
  return {
    name: d,
    /** −1 at midwinter, +1 at midsummer. */
    warmth: Math.cos(s),
    tint: [r, a, l],
    haze: y(h),
    saturation: c
  };
}
function _s(n) {
  return n.getTime() / 864e5 - 10957.5;
}
function $s(n, t, e) {
  const s = _s(n), i = O(357.5291 + 0.98560028 * s), o = O(280.459 + 0.98564736 * s) + O(1.9148) * Math.sin(i) + O(0.02) * Math.sin(2 * i), r = O(23.4393 - 3563e-10 * s), a = Math.asin(Math.sin(r) * Math.sin(o)), l = Math.atan2(
    Math.cos(r) * Math.sin(o),
    Math.cos(o)
  ), c = O(280.16 + 360.9856235 * s) + O(e) - l, d = O(t), p = Math.sin(d) * Math.sin(a) + Math.cos(d) * Math.cos(a) * Math.cos(c), u = Math.asin(Math.max(-1, Math.min(1, p))), f = Math.atan2(
    Math.sin(c),
    Math.cos(c) * Math.sin(d) - Math.tan(a) * Math.cos(d)
  ), g = c + O(360.9856235 * (10 / 1440)), b = Math.sin(d) * Math.sin(a) + Math.cos(d) * Math.cos(a) * Math.cos(g);
  return {
    elevation: Dt(u),
    azimuth: mt(Dt(f) + 180, 360),
    rising: b > p
  };
}
function Cs(n) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, s = n.getTime() / 864e5 - e;
  return mt(s / t, 1);
}
function Ms(n, t, e) {
  const o = (n.getHours() + n.getMinutes() / 60 + n.getSeconds() / 3600 - 12) / 24 * k - e * k, r = 70 - Math.min(55, Math.abs(t) * 0.55), a = Math.cos(o) * r, l = (Math.sin(o) + 1) / 2;
  return { altitude: a, azimuthFraction: l };
}
const xs = [
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
], As = {
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
function Es(n) {
  if (!n)
    return "unknown";
  const t = n.toLowerCase().trim();
  return xs.includes(t) ? t : As[t] ?? "unknown";
}
const ks = {
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
}, Ps = {
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
function Me(n) {
  return { condition: n, ...ks, ...Ps[n] };
}
const Rs = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function ct(n) {
  if (typeof n == "number" && Number.isFinite(n))
    return n;
  if (typeof n == "string") {
    const t = Number.parseFloat(n);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function At(n) {
  if (n) {
    for (const t of Object.keys(n.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function se(n, t, e = /* @__PURE__ */ new Date()) {
  const s = n?.config?.latitude ?? 51.2, i = n?.config?.longitude ?? 6.8;
  let o = null, r = null, a = null, l = "computed";
  const h = t.sun_entity, c = h ? n?.states?.[h] : void 0;
  if (c) {
    const m = ct(c.attributes.elevation), _ = ct(c.attributes.azimuth);
    m !== null && (o = m, r = _, a = typeof c.attributes.rising == "boolean" ? c.attributes.rising : null, l = "sun.sun");
  }
  if (o === null || r === null || a === null) {
    const m = $s(e, s, i);
    o === null && (o = m.elevation), r === null && (r = m.azimuth), a === null && (a = m.rising), l !== "sun.sun" && (l = "computed");
  }
  const d = t.weather_entity ?? At(n), p = d ? n?.states?.[d] : void 0;
  let u = "unknown", f = null, g = null, b = !1;
  if (p && p.state !== "unavailable" && p.state !== "unknown") {
    u = Es(p.state), b = !0;
    const m = ct(p.attributes.cloud_coverage);
    m !== null && (f = y(m / 100));
    const _ = ct(p.attributes.wind_speed);
    if (_ !== null) {
      const $ = String(
        p.attributes.wind_speed_unit ?? n?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), R = _ * (Rs[$] ?? 1);
      g = y(R / 70);
    }
  } else
    d || (u = o > -6 ? "sunny" : "clear-night");
  return u === "sunny" && o < -4 && (u = "clear-night"), u === "clear-night" && o > 2 && (u = "sunny"), {
    condition: u,
    cloudCoverage: f,
    wind: g,
    sunElevation: o,
    sunAzimuth: r,
    sunRising: a,
    latitude: s,
    longitude: i,
    sunSource: l,
    weatherEntity: d ?? null,
    weatherAvailable: b
  };
}
function Ts(n) {
  const t = Me(n.condition);
  return n.cloudCoverage !== null && (t.cloudCover = w(t.cloudCover, n.cloudCoverage, 0.65), t.sunVisibility = Math.min(t.sunVisibility, 1 - n.cloudCoverage * 0.85)), n.wind !== null && (t.wind = w(t.wind, n.wind, 0.7)), t;
}
const Os = [
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
class zs {
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
    for (const s of Os)
      this.current[s] = ut(this.current[s], this.target[s], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
class Fs {
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
    const { palette: s, width: i, height: o } = e, r = [
      Math.round(o),
      s.zenith.join(),
      s.upper.join(),
      s.middle.join(),
      s.lower.join(),
      s.horizon.join()
    ].join("|");
    if (!this.gradient || r !== this.cacheKey) {
      const h = t.createLinearGradient(0, 0, 0, o);
      h.addColorStop(0, S(s.zenith)), h.addColorStop(0.28, S(s.upper)), h.addColorStop(0.55, S(s.middle)), h.addColorStop(0.82, S(s.lower)), h.addColorStop(1, S(s.horizon)), this.gradient = h, this.cacheKey = r;
    }
    t.fillStyle = this.gradient, t.fillRect(0, 0, i, o);
    const a = t.createLinearGradient(0, 0, 0, o * 0.45), l = y(0.12 + e.weather.skyDarkness * 0.2);
    a.addColorStop(0, `rgba(0,0,0,${l.toFixed(3)})`), a.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = a, t.fillRect(0, 0, i, o * 0.45);
  }
  destroy() {
    this.gradient = null;
  }
}
const Ls = 6221137;
class Ds {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = U(Ls), s = t.quality.starCount;
    this.stars = new Array(s);
    for (let i = 0; i < s; i++) {
      const o = Math.pow(e(), 1.6) * 0.82;
      this.stars[i] = {
        nx: e(),
        ny: o,
        radius: v(e, 0.4, 1.5),
        baseAlpha: v(e, 0.35, 1),
        twinkleSpeed: v(e, 0.4, 2.2),
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
    const s = y(e.nightFactor) * (1 - y(e.weather.cloudCover) * 0.85) * y(e.appearance.intensity);
    if (s <= 0.01) {
      this.shooting.length = 0;
      return;
    }
    const { width: i, height: o } = e, r = !e.reducedMotion, a = e.parallaxX * 0.15, l = e.parallaxY * 0.15;
    t.save();
    for (let h = 0; h < this.stars.length; h++) {
      const c = this.stars[h], d = c.nx * i + a, p = c.ny * o + l;
      let u = c.baseAlpha * s;
      if (r) {
        const m = Math.sin(e.time * c.twinkleSpeed + c.twinklePhase);
        u *= 0.62 + 0.38 * m;
      }
      if (u <= 0.02)
        continue;
      const f = 255, g = 245 + Math.round(c.tint * 8), b = 225 + Math.round((1 - c.tint) * 30);
      t.fillStyle = `rgba(${f},${g},${b},${u.toFixed(3)})`, c.radius <= 0.7 ? t.fillRect(d, p, 1, 1) : (t.beginPath(), t.arc(d, p, c.radius, 0, k), t.fill());
    }
    t.restore(), e.effects.shooting_stars && e.quality.shootingStars && !e.reducedMotion && this.updateShootingStars(t, e, s);
  }
  updateShootingStars(t, e, s) {
    const { width: i, height: o, dt: r } = e;
    if (this.nextShootingStar -= r, this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const a = 380 + Math.random() * 320, l = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * i * 0.8,
        y: Math.random() * o * 0.35,
        vx: Math.cos(l) * a,
        vy: Math.sin(l) * a,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.5,
        length: 60 + Math.random() * 90
      });
    }
    for (let a = this.shooting.length - 1; a >= 0; a--) {
      const l = this.shooting[a];
      if (l.life += r, l.life >= l.maxLife) {
        this.shooting.splice(a, 1);
        continue;
      }
      l.x += l.vx * r, l.y += l.vy * r;
      const h = l.life / l.maxLife, c = Math.sin(h * Math.PI) * s, d = l.vx === 0 && l.vy === 0 ? 0 : l.vx, p = Math.hypot(d, l.vy) || 1, u = l.x - d / p * l.length, f = l.y - l.vy / p * l.length, g = t.createLinearGradient(l.x, l.y, u, f);
      g.addColorStop(0, `rgba(255,255,255,${c.toFixed(3)})`), g.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = g, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(u, f), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class Is {
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
    const s = y(e.nightFactor) * (1 - y(e.weather.cloudCover) * 0.8);
    if (s <= 0.03)
      return;
    const i = Math.min(e.width, e.height), o = Math.max(12, i * 0.035), r = Math.ceil(o * 2 + 4), a = this.ensureBuffer(r);
    if (!a || !this.buffer)
      return;
    const l = Math.round(e.moonPhase * 200) / 200;
    l !== this.drawnPhase && (this.drawMoon(a, r, o, l), this.drawnPhase = l);
    const h = e.moonX * e.width + e.parallaxX * 0.12, c = e.moonY * e.height + e.parallaxY * 0.12;
    t.save(), t.globalCompositeOperation = "lighter";
    const d = o * 5, p = 0.14 * s * e.appearance.ambient_glow, u = t.createRadialGradient(h, c, o * 0.6, h, c, d);
    u.addColorStop(0, `rgba(200,220,255,${p.toFixed(3)})`), u.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = u, t.beginPath(), t.arc(h, c, d, 0, k), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = s, t.drawImage(this.buffer, h - r / 2, c - r / 2), t.restore();
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
    const o = e / 2, r = e / 2;
    t.clearRect(0, 0, e, e);
    const a = t.createRadialGradient(
      o - s * 0.25,
      r - s * 0.25,
      s * 0.1,
      o,
      r,
      s
    );
    a.addColorStop(0, "#fffdf3"), a.addColorStop(0.75, "#eceadd"), a.addColorStop(1, "#cfd3cc"), t.fillStyle = a, t.beginPath(), t.arc(o, r, s, 0, k), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const l = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, p, u] of l)
      t.beginPath(), t.arc(o + d * s, r + p * s, u * s, 0, k), t.fill();
    const h = (1 - Math.cos(i * k)) / 2;
    if (h < 0.99) {
      const p = i < 0.5, u = Math.abs(1 - h * 2) * s;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(o, r, s + 1, -Math.PI / 2, Math.PI / 2, p);
      const f = p ? h < 0.5 : h >= 0.5;
      t.ellipse(
        o,
        r,
        u,
        s + 1,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        f
      ), t.closePath(), t.fill(), t.restore();
    }
    t.save(), t.globalCompositeOperation = "destination-in";
    const c = t.createRadialGradient(o, r, s * 0.88, o, r, s);
    c.addColorStop(0, "rgba(0,0,0,1)"), c.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = c, t.fillRect(0, 0, e, e), t.restore();
  }
  destroy() {
    this.buffer = null, this.bufferCtx = null, this.bufferSize = 0;
  }
}
class Ns {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: s, width: i, height: o, appearance: r } = e, a = y(e.dayFactor * 0.35 + e.twilightFactor) * r.ambient_glow * w(0.45, 1, y(e.weather.sunVisibility));
    if (a > 0.01) {
      const g = y(e.sunX) * i, b = o * w(1.02, 0.55, y(e.dayFactor)), m = Math.max(i, o) * w(0.55, 0.95, e.twilightFactor), _ = t.createRadialGradient(g, b, 0, g, b, m);
      _.addColorStop(0, S(s.sunGlow, 0.5 * a)), _.addColorStop(0.35, S(s.sunGlow, 0.22 * a)), _.addColorStop(1, S(s.sunGlow, 0)), t.fillStyle = _, t.fillRect(0, 0, i, o);
    }
    const l = y((e.sunElevation + 1.5) / 4) * y(e.weather.sunVisibility);
    if (l <= 0.02)
      return;
    const h = e.sunX * i + e.parallaxX * 0.12, c = e.sunY * o + e.parallaxY * 0.12, d = Math.min(i, o), p = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const u = e.quality.sunGlowPasses;
    for (let g = u; g >= 1; g--) {
      const b = g / u, m = p * (2.2 + b * 9), _ = 0.1 * l * r.ambient_glow * (1 - b * 0.55), $ = t.createRadialGradient(h, c, p * 0.4, h, c, m);
      $.addColorStop(0, S(s.sunGlow, _)), $.addColorStop(1, S(s.sunGlow, 0)), t.fillStyle = $, t.beginPath(), t.arc(h, c, m, 0, k), t.fill();
    }
    const f = t.createRadialGradient(h, c, 0, h, c, p);
    f.addColorStop(0, S(s.sunCore, l)), f.addColorStop(0.7, S(s.sunCore, 0.85 * l)), f.addColorStop(1, S(s.sunGlow, 0)), t.fillStyle = f, t.beginPath(), t.arc(h, c, p, 0, k), t.fill(), t.restore();
  }
  destroy() {
  }
}
const Hs = 790741, Gs = 6 * 6 * 3, Us = [
  { style: "cumulus", aspect: 1.82, heightScale: 1 },
  { style: "cumulus", aspect: 1.82, heightScale: 1 },
  { style: "cumulus", aspect: 1.82, heightScale: 1 },
  { style: "stratus", aspect: 3.55, heightScale: 0.6 },
  { style: "stratus", aspect: 3.55, heightScale: 0.6 },
  { style: "stratus", aspect: 3.55, heightScale: 0.6 }
], qs = 3.55;
class Vs {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.clouds = [];
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: s, cloudLayers: i } = t.quality, o = U(Hs);
    this.base = Us.map(({ style: r, aspect: a, heightScale: l }) => {
      const h = Math.round(e * 0.55), c = Math.round(h * a);
      return {
        canvas: Ws(c, h, o, r),
        aspect: a,
        heightScale: l
      };
    }), this.tinted = [], this.tintValid = !1, this.clouds = new Array(s);
    for (let r = 0; r < s; r++) {
      const a = r % i, l = i <= 1 ? 1 : a / (i - 1), h = l < 0.45 ? 3 : 0;
      this.clouds[r] = {
        variant: h + Math.floor(o() * 3),
        nx: o(),
        ny: v(o, -0.04, 0.46) - l * 0.06,
        scale: v(o, 0.82, 1.22),
        layer: l,
        alpha: v(o, 0.6, 1),
        bobPhase: o() * Math.PI * 2,
        bobAmount: v(o, 4e-3, 0.014)
      };
    }
    this.clouds.sort((r, a) => r.layer - a.layer);
  }
  resize() {
  }
  particleCount() {
    return this.clouds.length;
  }
  render(t, e) {
    const s = y(e.weather.cloudCover) * y(e.appearance.intensity);
    if (s <= 0.01 || this.clouds.length === 0 || (this.ensureTint(e.palette.cloud), this.tinted.length === 0))
      return;
    const { width: i, height: o, dt: r } = e, a = Math.max(o, i * 0.42), l = a * 0.42 * qs * 1.22, h = i + l * 2.2, c = s * this.clouds.length, d = Math.floor(c), p = c - d, u = w(0.25, 2.6, y(e.weather.wind)), f = e.reducedMotion ? 0.08 : 1, g = y((s - 0.55) / 0.45) * w(0.35, 0.85, y(e.weather.cloudDarkness));
    if (g > 0.01) {
      const b = t.createLinearGradient(0, 0, 0, o);
      b.addColorStop(0, S(e.palette.cloud, g * 0.55)), b.addColorStop(0.55, S(e.palette.cloud, g * 0.4)), b.addColorStop(1, S(e.palette.cloud, g * 0.18)), t.fillStyle = b, t.fillRect(0, 0, i, o);
    }
    t.save();
    for (let b = 0; b < this.clouds.length; b++) {
      const m = this.clouds[b], _ = i * w(6e-3, 0.028, m.layer) * u * f;
      if (m.nx = mt(m.nx + _ * r / h, 1), b > d)
        continue;
      const $ = b === d ? p : 1;
      if ($ <= 0.01)
        continue;
      const R = this.tinted[m.variant], Ft = a * w(0.13, 0.42, m.layer) * m.scale * R.heightScale, Lt = Ft * R.aspect, _t = m.nx * h - l * 1.1 + e.parallaxX * w(0.3, 1, m.layer), Ee = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + m.bobPhase) * m.bobAmount * o, ke = w(0.3, 1, m.layer), Pe = m.ny * o + Ee + e.parallaxY * ke;
      if (_t + Lt < 0 || _t > i)
        continue;
      const Re = m.alpha * $ * w(0.42, 0.92, s) * w(0.75, 1, m.layer) * w(1, 1.15, y(e.weather.cloudDarkness));
      t.globalAlpha = y(Re), t.drawImage(R.canvas, _t, Pe, Lt, Ft);
    }
    t.restore();
  }
  ensureTint(t) {
    this.tintValid && D(t, this.tintColor) < Gs || (this.tinted = this.base.map((e) => ({
      canvas: Bs(e.canvas, t),
      aspect: e.aspect,
      heightScale: e.heightScale
    })), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
function Ws(n, t, e, s) {
  const i = document.createElement("canvas");
  i.width = n, i.height = t;
  const o = i.getContext("2d");
  if (!o)
    return i;
  const r = s === "cumulus", a = t * (r ? 0.68 : 0.6), l = r ? 12 + Math.floor(e() * 8) : 22 + Math.floor(e() * 12), h = r ? 0.5 : 0.24, c = r ? 0.16 : 0.1, d = r ? 0.3 : 0.19;
  for (let f = 0; f < l; f++) {
    const g = n * v(e, 0.1, 0.9), b = 1 - Math.abs(g / n - 0.5) * (r ? 1.5 : 1.15);
    if (b <= 0.05)
      continue;
    const m = a - Math.pow(e(), 1.5) * t * h, _ = t * v(e, c, d) * Math.max(0.35, b), $ = Math.round(w(150, 255, y(1 - m / t + 0.12))), R = o.createRadialGradient(g, m, _ * 0.05, g, m, _);
    R.addColorStop(0, `rgba(${$},${$},${$},0.85)`), R.addColorStop(0.55, `rgba(${$},${$},${$},0.38)`), R.addColorStop(1, `rgba(${$},${$},${$},0)`), o.fillStyle = R, o.beginPath(), o.ellipse(g, m, _ * (r ? 1.35 : 1.9), _, 0, 0, Math.PI * 2), o.fill();
  }
  o.globalCompositeOperation = "destination-in";
  const p = o.createLinearGradient(0, 0, 0, t);
  p.addColorStop(0, "rgba(0,0,0,1)"), p.addColorStop(a / t, "rgba(0,0,0,1)"), p.addColorStop(Math.min(1, a / t + 0.18), "rgba(0,0,0,0)"), p.addColorStop(1, "rgba(0,0,0,0)"), o.fillStyle = p, o.fillRect(0, 0, n, t);
  const u = o.createLinearGradient(0, 0, n, 0);
  return u.addColorStop(0, "rgba(0,0,0,0)"), u.addColorStop(r ? 0.12 : 0.08, "rgba(0,0,0,1)"), u.addColorStop(r ? 0.88 : 0.92, "rgba(0,0,0,1)"), u.addColorStop(1, "rgba(0,0,0,0)"), o.fillStyle = u, o.fillRect(0, 0, n, t), o.globalCompositeOperation = "source-over", i;
}
function Bs(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const s = e.getContext("2d");
  return s && (s.drawImage(n, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = S(t), s.fillRect(0, 0, e.width, e.height), s.globalCompositeOperation = "destination-in", s.drawImage(n, 0, 0), s.globalCompositeOperation = "source-over"), e;
}
const Ys = 3846, ie = 3, ne = 512, oe = 128, Xs = 6 * 6 * 3;
class js {
  constructor() {
    this.name = "fog", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.bands = [];
  }
  setup(t) {
    const e = U(Ys);
    this.base = [];
    for (let i = 0; i < ie; i++)
      this.base.push(Qs(ne, oe, e));
    this.tinted = [], this.tintValid = !1;
    const s = t.quality.fogLayers;
    this.bands = new Array(s);
    for (let i = 0; i < s; i++) {
      const o = s <= 1 ? 1 : i / (s - 1);
      this.bands[i] = {
        variant: i % ie,
        nx: e(),
        ny: w(0.5, 1.02, o) + v(e, -0.05, 0.05),
        thickness: w(0.18, 0.42, o) * v(e, 0.85, 1.2),
        speed: w(4e-3, 0.016, o) * v(e, 0.7, 1.4),
        alpha: w(0.5, 1, o) * v(e, 0.8, 1.1),
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
    const s = y(e.weather.fog) * y(e.appearance.intensity);
    if (s <= 0.02 || this.bands.length === 0)
      return;
    const i = e.palette.ambient;
    if (this.ensureTint(i), this.tinted.length === 0)
      return;
    const { width: o, height: r, dt: a } = e, l = e.reducedMotion ? 0.1 : 1;
    t.save();
    for (const d of this.bands) {
      d.nx = mt(d.nx + d.speed * l * a, 1);
      const p = this.tinted[d.variant], u = d.thickness * r, f = Math.max(o * 1.6, u * (ne / oe)), g = e.reducedMotion ? 0 : Math.sin(e.time * 0.07 + d.bobPhase) * r * 0.012, b = d.ny * r - u / 2 + g + e.parallaxY * 1.4, m = -d.nx * f + e.parallaxX * 1.4;
      t.globalAlpha = y(d.alpha * s * 0.55), t.drawImage(p, m, b, f, u), t.drawImage(p, m + f, b, f, u);
    }
    t.restore();
    const h = r * 0.55, c = t.createLinearGradient(0, h, 0, r);
    c.addColorStop(0, S(i, 0)), c.addColorStop(1, S(i, 0.32 * s)), t.fillStyle = c, t.fillRect(0, h, o, r - h);
  }
  ensureTint(t) {
    this.tintValid && D(t, this.tintColor) < Xs || (this.tinted = this.base.map((e) => Ks(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.bands = [], this.tintValid = !1;
  }
}
function Qs(n, t, e) {
  const s = document.createElement("canvas");
  s.width = n, s.height = t;
  const i = s.getContext("2d");
  if (!i)
    return s;
  const o = 14 + Math.floor(e() * 8);
  for (let a = 0; a < o; a++) {
    const l = e() * n, h = t * v(e, 0.3, 0.7), c = n * v(e, 0.08, 0.22), d = t * v(e, 0.3, 0.6), p = v(e, 0.1, 0.28), u = [0];
    l < c ? u.push(n) : l > n - c && u.push(-n);
    for (const f of u) {
      const g = l + f, b = i.createRadialGradient(g, h, 0, g, h, Math.max(c, d));
      b.addColorStop(0, `rgba(255,255,255,${p.toFixed(3)})`), b.addColorStop(0.6, `rgba(255,255,255,${(p * 0.4).toFixed(3)})`), b.addColorStop(1, "rgba(255,255,255,0)"), i.fillStyle = b, i.beginPath(), i.ellipse(g, h, c, d, 0, 0, Math.PI * 2), i.fill();
    }
  }
  i.globalCompositeOperation = "destination-in";
  const r = i.createLinearGradient(0, 0, 0, t);
  return r.addColorStop(0, "rgba(0,0,0,0)"), r.addColorStop(0.35, "rgba(0,0,0,1)"), r.addColorStop(0.7, "rgba(0,0,0,1)"), r.addColorStop(1, "rgba(0,0,0,0)"), i.fillStyle = r, i.fillRect(0, 0, n, t), i.globalCompositeOperation = "source-over", s;
}
function Ks(n, t) {
  const e = document.createElement("canvas");
  e.width = n.width, e.height = n.height;
  const s = e.getContext("2d");
  return s && (s.drawImage(n, 0, 0), s.globalCompositeOperation = "multiply", s.fillStyle = S(t), s.fillRect(0, 0, e.width, e.height), s.globalCompositeOperation = "destination-in", s.drawImage(n, 0, 0), s.globalCompositeOperation = "source-over"), e;
}
const Js = 10783, J = 3;
class Zs {
  constructor() {
    this.name = "rain", this.drops = [], this.active = 0;
  }
  setup(t) {
    const e = U(Js), s = t.quality.rainParticles;
    this.drops = new Array(s);
    for (let i = 0; i < s; i++) {
      const o = i % J, r = o / (J - 1);
      this.drops[i] = {
        nx: e(),
        ny: e(),
        speed: w(0.75, 1.7, r) * v(e, 0.85, 1.15),
        length: w(0.02, 0.058, r) * v(e, 0.8, 1.3),
        band: o
      };
    }
  }
  resize() {
  }
  particleCount() {
    return this.active;
  }
  render(t, e) {
    const s = y(e.weather.rain) * y(e.appearance.intensity);
    if (s <= 0.01 || this.drops.length === 0) {
      this.active = 0;
      return;
    }
    const { width: i, height: o, dt: r } = e, a = Math.round(this.drops.length * s);
    this.active = a;
    const l = w(0.06, 0.5, y(e.weather.wind)) * (e.reducedMotion ? 0.3 : 1), h = e.reducedMotion ? 0.25 : 1, c = T(e.palette.ambient, [225, 238, 255], 0.62);
    for (let d = 0; d < J; d++) {
      const p = d / (J - 1);
      t.strokeStyle = S(c, w(0.11, 0.3, p) * s), t.lineWidth = w(0.7, 1.4, p), t.lineCap = "round", t.beginPath();
      for (let u = d; u < a; u += J) {
        const f = this.drops[u];
        f.ny += f.speed * h * r, f.nx += f.speed * l * h * r * (o / Math.max(1, i)), f.ny > 1.05 && (f.ny -= 1.1, f.nx = Math.random()), f.nx > 1.05 ? f.nx -= 1.1 : f.nx < -0.05 && (f.nx += 1.1);
        const g = f.nx * i, b = f.ny * o, m = f.length * o;
        t.moveTo(g, b), t.lineTo(g - m * l, b - m);
      }
      t.stroke();
    }
    this.renderGroundMist(t, e, s);
  }
  /** Spray hanging over the bottom edge – cheap, and it sells heavy rain. */
  renderGroundMist(t, e, s) {
    if (s < 0.35)
      return;
    const { width: i, height: o } = e, r = o * 0.82, a = (s - 0.35) / 0.65, l = t.createLinearGradient(0, r, 0, o);
    l.addColorStop(0, S(e.palette.ambient, 0)), l.addColorStop(1, S(e.palette.ambient, 0.3 * a)), t.fillStyle = l, t.fillRect(0, r, i, o - r);
  }
  destroy() {
    this.drops.length = 0, this.active = 0;
  }
}
const ti = 6230212, Z = 3;
class ei {
  constructor() {
    this.name = "snow", this.flakes = [], this.active = 0;
  }
  setup(t) {
    const e = U(ti), s = t.quality.snowParticles;
    this.flakes = new Array(s);
    for (let i = 0; i < s; i++) {
      const o = i % Z, r = o / (Z - 1);
      this.flakes[i] = {
        nx: e(),
        ny: e(),
        speed: w(0.035, 0.14, r) * v(e, 0.8, 1.25),
        radius: w(16e-4, 5e-3, r) * v(e, 0.8, 1.3),
        driftAmplitude: v(e, 8e-3, 0.035) * w(0.6, 1.4, r),
        driftFrequency: v(e, 0.25, 0.8),
        driftPhase: e() * k,
        band: o
      };
    }
  }
  resize() {
  }
  particleCount() {
    return this.active;
  }
  render(t, e) {
    const s = y(e.weather.snow) * y(e.appearance.intensity);
    if (s <= 0.01 || this.flakes.length === 0) {
      this.active = 0;
      return;
    }
    const { width: i, height: o, dt: r } = e, a = Math.min(i, o), l = Math.round(this.flakes.length * s);
    this.active = l;
    const h = e.reducedMotion ? 0.2 : 1, c = w(4e-3, 0.05, y(e.weather.wind)) * h, d = T(e.palette.ambient, [255, 255, 255], 0.85);
    for (let p = 0; p < Z; p++) {
      const u = p / (Z - 1);
      t.fillStyle = S(d, w(0.4, 0.85, u) * s), t.beginPath();
      for (let f = p; f < l; f += Z) {
        const g = this.flakes[f];
        g.ny += g.speed * h * r, g.nx += c * r, g.ny > 1.05 && (g.ny -= 1.1, g.nx = Math.random()), g.nx > 1.05 ? g.nx -= 1.1 : g.nx < -0.05 && (g.nx += 1.1);
        const b = e.reducedMotion ? 0 : Math.sin(e.time * g.driftFrequency + g.driftPhase) * g.driftAmplitude, m = (g.nx + b) * i, _ = g.ny * o, $ = g.radius * a;
        t.moveTo(m + $, _), t.arc(m, _, $, 0, k);
      }
      t.fill();
    }
  }
  destroy() {
    this.flakes.length = 0, this.active = 0;
  }
}
const re = 45079;
class si {
  constructor() {
    this.name = "lightning", this.rng = U(re), this.strike = null, this.cooldown = 6;
  }
  setup() {
    this.rng = U(re), this.strike = null, this.cooldown = v(this.rng, 4, 12);
  }
  resize() {
  }
  particleCount() {
    return this.strike ? 1 : 0;
  }
  render(t, e) {
    const s = y(e.weather.lightning) * y(e.appearance.intensity);
    if (s <= 0.02 || e.reducedMotion) {
      this.strike = null;
      return;
    }
    const { dt: i, width: o, height: r } = e;
    if (!this.strike) {
      if (this.cooldown -= i * s, this.cooldown > 0)
        return;
      this.strike = this.createStrike(e), this.cooldown = w(26, 3, s) * v(this.rng, 0.7, 1.4);
    }
    const a = this.strike;
    if (a.elapsed += i, a.elapsed > a.total) {
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
    const h = a.x * o, c = a.y * r, d = Math.max(o, r) * 1.15;
    t.save(), t.globalCompositeOperation = "lighter";
    const p = t.createRadialGradient(h, c, 0, h, c, d);
    p.addColorStop(0, `rgba(214,228,255,${(l * 0.85).toFixed(4)})`), p.addColorStop(0.45, `rgba(188,206,246,${(l * 0.35).toFixed(4)})`), p.addColorStop(1, "rgba(170,190,240,0)"), t.fillStyle = p, t.fillRect(0, 0, o, r), a.bolt && e.quality.lightningBolts && a.elapsed <= a.boltVisibleUntil && l > 0.05 && this.drawBolt(t, e, a, l), t.restore();
  }
  createStrike(t) {
    const e = this.rng, s = 2 + Math.floor(e() * 3), i = [];
    let o = 0;
    for (let d = 0; d < s; d++) {
      const p = v(e, 0.09, 0.22);
      i.push({
        at: o,
        duration: p,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: d === 0 ? v(e, 0.18, 0.3) : v(e, 0.06, 0.14)
      }), o += p + v(e, 0.04, 0.16);
    }
    const r = v(e, 0.12, 0.88), a = v(e, 0.05, 0.3), h = t.quality.lightningBolts && e() < 0.55 ? ae(e, r, a, v(e, 0.55, 0.85)) : null, c = [];
    if (h) {
      const d = Math.floor(e() * 3);
      for (let p = 0; p < d; p++) {
        const u = h[1 + Math.floor(e() * (h.length - 2))];
        c.push(
          ae(e, u.x, u.y, u.y + v(e, 0.08, 0.22), 0.45)
        );
      }
    }
    return {
      elapsed: 0,
      total: o + 0.3,
      flashes: i,
      x: r,
      y: a,
      bolt: h,
      branches: c,
      boltVisibleUntil: i[0].duration * 1.6
    };
  }
  drawBolt(t, e, s, i) {
    const { width: o, height: r } = e, a = y(i * 4), l = (c) => {
      t.beginPath(), t.moveTo(c[0].x * o, c[0].y * r);
      for (let d = 1; d < c.length; d++)
        t.lineTo(c[d].x * o, c[d].y * r);
      t.stroke();
    }, h = Math.min(o, r);
    t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = `rgba(150,180,255,${(a * 0.28).toFixed(4)})`, t.lineWidth = Math.max(4, h * 0.012), s.bolt && l(s.bolt), t.strokeStyle = `rgba(240,246,255,${(a * 0.9).toFixed(4)})`, t.lineWidth = Math.max(1.2, h * 22e-4), s.bolt && l(s.bolt), t.strokeStyle = `rgba(225,235,255,${(a * 0.55).toFixed(4)})`, t.lineWidth = Math.max(1, h * 15e-4);
    for (const c of s.branches)
      l(c);
  }
  destroy() {
    this.strike = null;
  }
}
function ae(n, t, e, s, i = 1) {
  let o = [
    { x: t, y: e },
    { x: t + v(n, -0.06, 0.06) * i, y: s }
  ];
  for (let r = 0; r < 5; r++) {
    const a = [o[0]], l = 0.045 * i * Math.pow(0.62, r);
    for (let h = 1; h < o.length; h++) {
      const c = o[h - 1], d = o[h];
      a.push({
        x: (c.x + d.x) / 2 + v(n, -l, l),
        y: (c.y + d.y) / 2
      }), a.push(d);
    }
    o = a;
  }
  return o;
}
class ii {
  constructor(t, e, s) {
    this.sky = new Fs(), this.stars = new Ds(), this.moon = new Is(), this.sun = new Ns(), this.clouds = new Vs(), this.fog = new js(), this.rain = new Zs(), this.snow = new ei(), this.lightning = new si(), this.reducedMotion = !1, this.parallaxTargetX = 0, this.parallaxTargetY = 0, this.parallaxX = 0, this.parallaxY = 0, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = s, this.renderers = [
      this.sky,
      this.stars,
      this.moon,
      this.sun,
      this.clouds,
      this.fog,
      this.rain,
      this.snow,
      this.lightning
    ], this.season = ee(/* @__PURE__ */ new Date(), s.latitude), this.blender = new zs(Me(s.condition)), this.blender.snapTo(this.targetProfile()), this.elevation = s.sunElevation, this.azimuth = s.sunAzimuth, this.palette = xt({
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
    this.snapshot = t, this.season = ee(/* @__PURE__ */ new Date(), t.latitude), this.state.season = this.season, this.blender.setTarget(this.targetProfile());
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
    const t = Ts(this.snapshot);
    return this.config.effects.season && (t.fog = y(t.fog + this.season.haze * 0.5)), t;
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
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.parallaxX = this.parallaxTargetX, this.parallaxY = this.parallaxTargetY, this.blender.snapTo(this.targetProfile()), this.palette = xt({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
  }
  update(t, e) {
    const s = this.state;
    s.dt = t, s.time = e, this.elevation = ut(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = ni(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const i = this.blender.update(t), o = xt({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: i,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null
    });
    this.palette = vs(this.palette, o, 0.6, t), this.config.effects.parallax && !this.reducedMotion ? (this.parallaxX = ut(this.parallaxX, this.parallaxTargetX, 0.25, t), this.parallaxY = ut(this.parallaxY, this.parallaxTargetY, 0.25, t)) : (this.parallaxX = 0, this.parallaxY = 0), s.parallaxX = this.parallaxX, s.parallaxY = this.parallaxY;
    const { dayFactor: r, nightFactor: a, twilightFactor: l } = Ce(this.elevation);
    s.sunElevation = this.elevation, s.sunAzimuth = this.azimuth, s.sunRising = this.snapshot.sunRising, s.dayFactor = r, s.nightFactor = a, s.twilightFactor = l, s.palette = this.palette, s.weather = i, s.sunX = y((this.azimuth - 60) / 240), s.sunY = this.elevation >= 0 ? 0.94 - Math.pow(y(this.elevation / 60), 0.7) * 0.84 : A(0.94 + -this.elevation / 20 * 0.18, 0.94, 1.2);
    const h = /* @__PURE__ */ new Date(), c = Cs(h), d = Ms(h, this.snapshot.latitude, c);
    s.moonPhase = c, s.moonX = w(0.08, 0.92, y(d.azimuthFraction)), s.moonY = A(1.02 - y(d.altitude / 70) * 0.88, 0.08, 1.1), s.moonVisible = this.config.effects.moon && d.altitude > 2 && a > 0.08 && c > 0.03 && c < 0.97;
  }
  render(t) {
    const e = this.state, s = this.config.effects;
    this.sky.render(t, e), s.stars && this.stars.render(t, e), s.moon && this.moon.render(t, e), s.sun && this.sun.render(t, e), s.clouds && this.clouds.render(t, e), s.fog && this.fog.render(t, e), s.rain && this.rain.render(t, e), s.snow && this.snow.render(t, e), s.lightning && this.lightning.render(t, e);
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
function ni(n, t, e, s) {
  let i = (t - n + 540) % 360 - 180;
  const o = e <= 0 ? 1 : 1 - Math.pow(2, -s / e);
  return i *= o, (n + i + 360) % 360;
}
const oi = 400, dt = 4 * 4 * 3, ri = [
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
class ai {
  constructor() {
    this.last = null, this.lastWrite = 0, this.active = !1;
  }
  /** True while properties are on the document. */
  get isActive() {
    return this.active;
  }
  update(t, e = !1) {
    const s = performance.now();
    if (!e && s - this.lastWrite < oi)
      return;
    const i = {
      ambient: t.palette.ambient,
      sky: t.palette.middle,
      horizon: t.palette.horizon,
      accent: t.palette.sunGlow,
      glow: y(t.dayFactor * 0.6 + t.twilightFactor * 0.8),
      night: y(t.nightFactor)
    };
    if (!e && this.last && !this.changed(this.last, i)) {
      this.lastWrite = s;
      return;
    }
    this.lastWrite = s, this.last = i, this.active = !0;
    const o = document.documentElement.style, r = (h) => `${Math.round(h[0])}, ${Math.round(h[1])}, ${Math.round(h[2])}`;
    o.setProperty("--aurora-ambient-color", S(i.ambient)), o.setProperty("--aurora-ambient-rgb", r(i.ambient)), o.setProperty("--aurora-sky-color", S(i.sky)), o.setProperty("--aurora-horizon-color", S(i.horizon)), o.setProperty("--aurora-accent-color", S(i.accent)), o.setProperty("--aurora-accent-rgb", r(i.accent)), o.setProperty("--aurora-glow-strength", i.glow.toFixed(3)), o.setProperty("--aurora-night", i.night.toFixed(3)), o.setProperty("--aurora-day", (1 - i.night).toFixed(3));
    const a = wt(i.sky) > 140;
    o.setProperty("--aurora-contrast-color", a ? "#10151f" : "#f2f6ff");
    const l = T(i.ambient, a ? [12, 16, 24] : [235, 243, 255], 0.72);
    o.setProperty("--aurora-card-tint", S(l, a ? 0.5 : 0.14)), o.setProperty(
      "--aurora-card-border",
      S(a ? [255, 255, 255] : [255, 255, 255], a ? 0.28 : 0.16)
    ), o.setProperty("--aurora-season", t.season.name), o.setProperty("--aurora-condition", t.weather.condition);
  }
  changed(t, e) {
    return D(t.ambient, e.ambient) > dt || D(t.sky, e.sky) > dt || D(t.horizon, e.horizon) > dt || D(t.accent, e.accent) > dt || Math.abs(t.glow - e.glow) > 0.02 || Math.abs(t.night - e.night) > 0.02;
  }
  /** Remove every property again – called when the last Aurora card unmounts. */
  clear() {
    if (!this.active)
      return;
    const t = document.documentElement.style;
    for (const e of ri)
      t.removeProperty(e);
    this.active = !1, this.last = null;
  }
}
const li = 500, le = 5 * 5 * 3, hi = [
  "--ha-card-background",
  "--card-background-color",
  "--ha-card-backdrop-filter",
  "--ha-card-border-color",
  "--ha-card-border-width",
  "--ha-card-box-shadow",
  "--ha-card-border-radius",
  "--aurora-glass-surface"
], he = ["--primary-text-color", "--secondary-text-color"];
class ci {
  constructor() {
    this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1, this.lastWrite = 0, this.active = !1, this.textActive = !1;
  }
  update(t, e, s = !1) {
    if (!e.enabled) {
      this.clear();
      return;
    }
    const i = performance.now();
    if (!s && i - this.lastWrite < li)
      return;
    const o = wt(t.palette.middle) > 145, r = T(
      t.palette.ambient,
      o ? [14, 18, 27] : [226, 236, 252],
      0.7
    ), a = t.palette.sunGlow, l = y(t.dayFactor * 0.5 + t.twilightFactor * 0.9 + t.nightFactor * 0.25) * e.glow;
    if (!s && this.lastSurface && this.lastAccent && D(this.lastSurface, r) < le && D(this.lastAccent, a) < le && Math.abs(this.lastGlow - l) < 0.03) {
      this.lastWrite = i;
      return;
    }
    this.lastWrite = i, this.lastSurface = r, this.lastAccent = a, this.lastGlow = l, this.active = !0;
    const h = document.documentElement.style, c = y(e.opacity * (o ? 1.15 : 1)), d = S(r, c);
    h.setProperty("--aurora-glass-surface", d), h.setProperty("--ha-card-background", d), h.setProperty("--card-background-color", d), h.setProperty(
      "--ha-card-backdrop-filter",
      e.blur > 0 ? `blur(${e.blur}px) saturate(${e.saturate})` : "none"
    ), e.border ? (h.setProperty("--ha-card-border-width", "1px"), h.setProperty(
      "--ha-card-border-color",
      S(o ? [255, 255, 255] : [255, 255, 255], o ? 0.3 : 0.16)
    )) : (h.setProperty("--ha-card-border-width", "0px"), h.setProperty("--ha-card-border-color", "transparent"));
    const p = `0 6px 24px rgba(0,0,0,${(0.18 + (o ? 0.06 : 0.14)).toFixed(3)})`, u = l > 0.01 ? `, 0 0 36px ${S(a, y(l * 0.16))}` : "";
    if (h.setProperty("--ha-card-box-shadow", p + u), e.radius >= 0 ? h.setProperty("--ha-card-border-radius", `${e.radius}px`) : h.removeProperty("--ha-card-border-radius"), e.adaptive_text) {
      const f = o ? [16, 21, 31] : [240, 245, 255];
      h.setProperty("--primary-text-color", S(f)), h.setProperty(
        "--secondary-text-color",
        S(T(f, r, 0.35), w(0.75, 0.85, y(l)))
      ), this.textActive = !0;
    } else if (this.textActive) {
      for (const f of he)
        h.removeProperty(f);
      this.textActive = !1;
    }
  }
  /** Hand every managed property back to the user's theme. */
  clear() {
    if (!this.active && !this.textActive)
      return;
    const t = document.documentElement.style;
    for (const e of hi)
      t.removeProperty(e);
    if (this.textActive) {
      for (const e of he)
        t.removeProperty(e);
      this.textActive = !1;
    }
    this.active = !1, this.lastSurface = null, this.lastAccent = null, this.lastGlow = -1;
  }
}
const di = (n) => `
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
class ce {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", di(e)), t.appendChild(this.element);
  }
  update(t, e, s, i, o) {
    const r = performance.now();
    if (r - this.lastUpdate < 250)
      return;
    this.lastUpdate = r;
    const a = [
      `AURORA BACKGROUND  v${Et}`,
      `fps          ${s.toFixed(0).padStart(3)}${o ? "  (paused)" : ""}`,
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
      `reduced mo.  ${t.reducedMotion ? "yes" : "no"}`
    ];
    this.element.textContent = a.join(`
`);
  }
  destroy() {
    this.element.remove();
  }
}
const de = 42e5, ui = 0.06, ue = 0.012;
class xe {
  /**
   * `exportsAmbient` is true only for the shared dashboard layer – two layers
   * writing `--aurora-*` on the document would fight each other.
   */
  constructor(t, e, s, i = !1) {
    this.host = t, this.debugOverlay = null, this.resizeObserver = null, this.intersectionObserver = null, this.motionQuery = null, this.cssWidth = 0, this.cssHeight = 0, this.pixelRatio = 1, this.resizePending = !1, this.visible = !0, this.documentVisible = !0, this.destroyed = !1, this.firstFrame = !0, this.environmentTimer = null, this.scrollOffset = 0, this.pointerX = 0, this.pointerY = 0, this.onMotionPreferenceChange = (r) => {
      this.scene.setReducedMotion(r.matches), this.applyFrameCap();
    }, this.onDocumentScroll = (r) => {
      const a = r.target, l = a instanceof Element ? a.scrollTop : document.scrollingElement?.scrollTop ?? window.scrollY;
      this.scrollOffset = Math.min(1, l / Math.max(1, this.cssHeight)), this.pushParallax();
    }, this.onPointerMove = (r) => {
      this.pointerX = A(r.clientX / Math.max(1, window.innerWidth) * 2 - 1, -1, 1), this.pointerY = A(r.clientY / Math.max(1, window.innerHeight) * 2 - 1, -1, 1), this.pushParallax();
    }, this.onVisibilityChange = () => {
      this.documentVisible = document.visibilityState !== "hidden", this.updateRunState();
    }, this.onIntersect = (r) => {
      for (const a of r)
        a.target === this.host && (this.visible = a.isIntersecting);
      this.updateRunState();
    }, this.onResize = () => {
      this.resizePending || this.destroyed || (this.resizePending = !0, requestAnimationFrame(() => {
        this.resizePending = !1, !this.destroyed && (this.measure(), this.engine.isRunning || this.renderOnce());
      }));
    }, this.refreshEnvironment = () => {
      this.destroyed || (this.scene.setEnvironment(se(this.hass, this.config)), this.engine.isRunning || this.renderOnce());
    }, this.frame = (r, a) => {
      if (this.destroyed || !this.ctx)
        return;
      const l = performance.now();
      this.firstFrame && (this.scene.snapToTargets(), this.firstFrame = !1), this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.update(r, a), this.scene.render(this.ctx);
      const h = performance.now() - l, c = this.performance.sample(r, h);
      c && this.applyQuality(c), this.ambient && this.config.background.ambient_variables && this.ambient.update(this.scene.sceneState), this.glass?.update(this.scene.sceneState, this.config.glass), this.debugOverlay && this.debugOverlay.update(
        this.scene.sceneState,
        this.scene.environment,
        this.performance.fps,
        this.scene.particleCount(),
        !1
      );
    }, this.config = e, this.hass = s, this.ambient = i ? new ai() : null, this.glass = i ? new ci() : null, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1, desynchronized: !0 });
    const o = this.resolveQuality();
    this.performance = new ds(
      o,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, Q(o).maxFps)
    ), this.scene = new ii(
      e,
      Q(o),
      se(s, e)
    ), this.engine = new hs(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new ce(this.host, this.debugTopOffset())), this.updateRunState();
  }
  /* ---------------------------------------------------------------- *
   * Public API
   * ---------------------------------------------------------------- */
  updateConfig(t) {
    if (this.destroyed)
      return;
    const e = t.quality !== this.config.quality, s = t.debug !== this.config.debug, i = t.appearance.blur !== this.config.appearance.blur, o = t.appearance.opacity !== this.config.appearance.opacity;
    if (this.config = t, this.scene.setConfig(t), e) {
      const r = this.resolveQuality();
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.performance.setQuality(r), this.applyQuality(r);
    } else
      this.performance.setEnabled(t.quality === "auto" && t.performance.auto_quality), this.applyFrameCap();
    (i || o) && this.applyCanvasFilter(), s && (t.debug && !this.debugOverlay ? this.debugOverlay = new ce(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.ambient && !t.background.ambient_variables && this.ambient.clear(), this.glass && !t.glass.enabled && this.glass.clear(), this.pushParallax(), this.refreshEnvironment(), this.updateRunState();
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
    return this.config.quality === "auto" ? Le() : this.config.quality;
  }
  applyQuality(t) {
    const e = Q(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = Q(this.performance.quality);
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
      this.pointerX * t * ue,
      this.scrollOffset * t * ui + this.pointerY * t * ue * 0.6
    );
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), s = Math.max(1, Math.round(t.height)), i = Q(this.performance.quality);
    let r = Math.min(window.devicePixelRatio || 1, i.maxDpr) * i.renderScale;
    const a = e * s * r * r;
    a > de && (r *= Math.sqrt(de / a));
    const l = Math.max(1, Math.round(e * r)), h = Math.max(1, Math.round(s * r)), c = this.canvas.width !== l || this.canvas.height !== h || this.cssWidth !== e || this.cssHeight !== s;
    this.cssWidth = e, this.cssHeight = s, this.pixelRatio = r, c && (this.canvas.width = l, this.canvas.height = h, this.scene.resize(e, s, r)), this.updateRunState();
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
const pe = "aurora-background-root", fe = "aurora-background-style";
class pi {
  constructor() {
    this.root = null, this.styleElement = null, this.layer = null, this.owners = /* @__PURE__ */ new Map(), this.activeOwner = null;
  }
  acquire(t, e, s) {
    this.owners.set(t, { config: e, hass: s }), this.activeOwner = t, this.ensureMounted(e), this.applyGlobalStyles(e), this.layer?.updateConfig(e), this.layer?.updateHass(s);
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
      this.activeOwner = null, this.layer?.destroy(), this.layer = null, this.root?.remove(), this.root = null, this.styleElement?.remove(), this.styleElement = null;
    }
  }
  ensureMounted(t) {
    if (!this.root) {
      document.getElementById(pe)?.remove();
      const e = document.createElement("div");
      e.id = pe, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new xe(this.root, t, e?.hass, !0);
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
      const o = ge(t);
      this.writeStyle(o ? `:root{${o}}` : "");
      return;
    }
    const e = [], s = [];
    t.background.transparent_lovelace && (s.push("--lovelace-background:transparent !important"), s.push("--view-background:transparent !important"), s.push("--ha-view-background:transparent !important"), e.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), t.background.transparent_header && (s.push("--app-header-background-color:transparent !important"), s.push("--header-height-background:transparent !important"));
    const i = ge(t);
    i && s.push(i), s.length > 0 && e.unshift(`:root{${s.join(";")}}`), this.writeStyle(e.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(fe)?.remove();
      const e = document.createElement("style");
      e.id = fe, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function ge(n) {
  const t = Object.entries(n.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, s]) => `${e}:${s} !important`).join(";");
}
const tt = new pi(), fi = we`
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
`, gi = we`
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
var mi = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, Ae = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? yi(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && mi(t, e, i), i;
};
const bi = {
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
function M(n) {
  return { name: n, selector: { boolean: {} } };
}
function P(n, t, e, s) {
  return { name: n, selector: { number: { min: t, max: e, step: s, mode: "slider" } } };
}
const wi = [
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
      P("intensity", 0, 2, 0.05),
      P("saturation", 0, 2, 0.05),
      P("brightness", 0.2, 2, 0.05),
      P("ambient_glow", 0, 2, 0.05),
      P("opacity", 0, 1, 0.05),
      P("blur", 0, 40, 1)
    ]
  },
  {
    name: "performance",
    type: "expandable",
    icon: "mdi:speedometer",
    schema: [
      P("max_fps", 10, 120, 1),
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
      P("blur", 0, 40, 1),
      P("opacity", 0, 1, 0.05),
      P("saturate", 1, 3, 0.05),
      P("glow", 0, 2, 0.05),
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
class vt extends B {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => bi[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = ye(this.config);
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
    return customElements.get("ha-form") ? nt`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${wi}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : nt`
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
      type: this.config.type ?? `custom:${q}`,
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
vt.styles = gi;
Ae([
  Ot({ attribute: !1 })
], vt.prototype, "hass", 2);
Ae([
  bt()
], vt.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", vt);
var vi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, St = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Si(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && vi(t, e, i), i;
};
const _i = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function $i(n, t = 30) {
  let e = n;
  for (let s = 0; s < t && e; s++) {
    if (e instanceof HTMLElement && _i.includes(e.tagName))
      return !0;
    const i = e.parentNode;
    if (!i)
      break;
    e = i instanceof ShadowRoot ? i.host : i;
  }
  return !1;
}
class j extends B {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = ye(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = At(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, s = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && s === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = s, this.config.mode === "background" ? tt.updateHass(this, t) : this.cardLayer?.updateHass(t));
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
      type: `custom:${q}`,
      weather_entity: At(t),
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
      this.isConnected && (this.editing = this.preview || $i(this));
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
      this.destroyCardLayer(), this.mounted ? tt.update(this, t, this._hass) : (tt.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (tt.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new xe(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (tt.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? nt`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? nt`<div class="surface"></div>` : this.editing ? nt`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${Et} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : x : x;
  }
}
j.styles = fi;
St([
  Ot({ type: Boolean })
], j.prototype, "preview", 2);
St([
  bt()
], j.prototype, "config", 2);
St([
  bt()
], j.prototype, "editing", 2);
St([
  bt()
], j.prototype, "errorMessage", 2);
customElements.get(q) || customElements.define(q, j);
const me = window.customCards = window.customCards || [];
me.some((n) => n.type === q) || me.push({
  type: q,
  name: Oe,
  description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
  preview: !1,
  documentationURL: "https://github.com/iinononoii/aurora-background"
});
console.info(
  `%c AURORA BACKGROUND %c v${Et} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  j as AuroraBackgroundCard,
  vt as AuroraBackgroundEditor
};
