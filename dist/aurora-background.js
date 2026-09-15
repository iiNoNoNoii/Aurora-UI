const M = Math.PI * 2;
function $(s, t, e) {
  return s < t ? t : s > e ? e : s;
}
function g(s) {
  return $(s, 0, 1);
}
function v(s, t, e) {
  return s + (t - s) * e;
}
function be(s, t, e) {
  return s === t ? e < s ? 0 : 1 : g((e - s) / (t - s));
}
function Y(s, t, e) {
  const i = be(s, t, e);
  return i * i * (3 - 2 * i);
}
function ee(s, t, e, i) {
  if (e <= 0)
    return t;
  const n = 1 - Math.pow(2, -i / e);
  return s + (t - s) * n;
}
function ie(s) {
  let t = s >>> 0;
  return function() {
    t = t + 1831565813 >>> 0;
    let i = t;
    return i = Math.imul(i ^ i >>> 15, i | 1), i ^= i + Math.imul(i ^ i >>> 7, i | 61), ((i ^ i >>> 14) >>> 0) / 4294967296;
  };
}
function x(s, t, e) {
  return t + s() * (e - t);
}
function _t(s, t) {
  const e = s % t;
  return e < 0 ? e + t : e;
}
function E(s) {
  return s * Math.PI / 180;
}
function Rt(s) {
  return s * 180 / Math.PI;
}
const N = "aurora-background", we = "Aurora Background", $t = "0.1.0-alpha", gt = ["low", "medium", "high", "ultra"], ve = ["background", "card"], _e = {
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
    maxFps: 60
  }
};
function B(s) {
  return { ..._e[s] };
}
function Ot(s, t) {
  const e = gt.indexOf(s);
  return gt[$(e + t, 0, gt.length - 1)];
}
function $e() {
  if (typeof window > "u")
    return "medium";
  const s = navigator.hardwareConcurrency ?? 4, t = navigator.deviceMemory ?? 4, e = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800), i = typeof window.matchMedia == "function" && window.matchMedia("(pointer: coarse)").matches;
  return s <= 2 || t <= 2 ? "low" : i && e <= 480 ? "medium" : i ? s >= 6 ? "high" : "medium" : s >= 8 && t >= 8 ? "high" : "medium";
}
function S(s, t) {
  return typeof s == "boolean" ? s : s === "true" ? !0 : s === "false" ? !1 : t;
}
function R(s, t, e, i) {
  const n = typeof s == "number" ? s : Number.parseFloat(String(s));
  return Number.isFinite(n) ? $(n, e, i) : t;
}
function zt(s, t) {
  return typeof s == "string" && s.length > 0 ? s : t;
}
function Tt(s, t, e) {
  return t.includes(s) ? s : e;
}
function Se(s) {
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
const Ce = "sun.sun";
function se(s) {
  const t = s ?? {}, e = t.effects ?? {}, i = t.appearance ?? {}, n = t.performance ?? {}, r = t.background ?? {}, o = t.sun_entity === null ? void 0 : typeof t.sun_entity == "string" && t.sun_entity.length > 0 ? t.sun_entity : Ce, h = Tt(
    t.quality,
    ["auto", "low", "medium", "high", "ultra"],
    "auto"
  );
  return {
    type: zt(t.type, `custom:${N}`),
    mode: Tt(t.mode, ve, "background"),
    weather_entity: typeof t.weather_entity == "string" && t.weather_entity.length > 0 ? t.weather_entity : void 0,
    sun_entity: o,
    quality: h,
    debug: S(t.debug, !1),
    height: typeof t.height == "number" ? `${t.height}px` : zt(t.height, "320px"),
    effects: {
      sun: S(e.sun, !0),
      moon: S(e.moon, !0),
      stars: S(e.stars, !0),
      shooting_stars: S(e.shooting_stars, !0),
      clouds: S(e.clouds, !0),
      rain: S(e.rain, !0),
      snow: S(e.snow, !0),
      fog: S(e.fog, !0),
      lightning: S(e.lightning, !0)
    },
    appearance: {
      intensity: R(i.intensity, 1, 0, 2),
      saturation: R(i.saturation, 1, 0, 2),
      brightness: R(i.brightness, 1, 0.2, 2),
      blur: R(i.blur, 0, 0, 40),
      ambient_glow: R(i.ambient_glow, 1, 0, 2),
      opacity: R(i.opacity, 1, 0, 1)
    },
    performance: {
      max_fps: R(n.max_fps, 60, 10, 120),
      auto_quality: S(n.auto_quality, !0),
      pause_when_hidden: S(n.pause_when_hidden, !0)
    },
    background: {
      transparent_lovelace: S(r.transparent_lovelace, !0),
      transparent_header: S(r.transparent_header, !0),
      css_variables: Se(r.css_variables),
      z_index: R(r.z_index, -1, -100, 100)
    }
  };
}
const rt = globalThis, St = rt.ShadowRoot && (rt.ShadyCSS === void 0 || rt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ct = Symbol(), Dt = /* @__PURE__ */ new WeakMap();
let ne = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Ct)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (St && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ae = (s) => new ne(typeof s == "string" ? s : s + "", void 0, Ct), re = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, r) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[r + 1], s[0]);
  return new ne(e, s, Ct);
}, Me = (s, t) => {
  if (St)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), n = rt.litNonce;
      n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
    }
}, Ft = St ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Ae(e);
})(s) : s;
const { is: Ee, defineProperty: ke, getOwnPropertyDescriptor: xe, getOwnPropertyNames: Pe, getOwnPropertySymbols: Re, getPrototypeOf: Oe } = Object, T = globalThis, Lt = T.trustedTypes, ze = Lt ? Lt.emptyScript : "", Te = T.reactiveElementPolyfillSupport, K = (s, t) => s, ot = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ze : null;
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
} }, At = (s, t) => !Ee(s, t), It = { attribute: !0, type: String, converter: ot, reflect: !1, useDefault: !1, hasChanged: At };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), T.litPropertyMetadata ?? (T.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = It) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && ke(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: r } = xe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const h = n?.call(this);
      r?.call(this, o), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? It;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties")))
      return;
    const t = Oe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const e = this.properties, i = [...Pe(e), ...Re(e)];
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
        e.unshift(Ft(n));
    } else
      t !== void 0 && e.push(Ft(t));
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
    return Me(t, this.constructor.elementStyles), t;
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
      const r = (i.converter?.toAttribute !== void 0 ? i.converter : ot).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : ot;
      this._$Em = n;
      const h = o.fromAttribute(e, r.type);
      this[n] = h ?? this._$Ej?.get(n) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, n = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (r = this[t]), i ?? (i = o.getPropertyOptions(t)), !((i.hasChanged ?? At)(r, e) || i.useDefault && i.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, i))))
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
          const { wrapped: o } = r, h = this[n];
          o !== !0 || this._$AL.has(n) || h === void 0 || this.C(n, void 0, r, h);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[K("elementProperties")] = /* @__PURE__ */ new Map(), U[K("finalized")] = /* @__PURE__ */ new Map(), Te?.({ ReactiveElement: U }), (T.reactiveElementVersions ?? (T.reactiveElementVersions = [])).push("2.1.2");
const X = globalThis, Nt = (s) => s, at = X.trustedTypes, Ht = at ? at.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, oe = "$lit$", z = `lit$${Math.random().toFixed(9).slice(2)}$`, ae = "?" + z, De = `<${ae}>`, H = document, tt = () => H.createComment(""), et = (s) => s === null || typeof s != "object" && typeof s != "function", Mt = Array.isArray, Fe = (s) => Mt(s) || typeof s?.[Symbol.iterator] == "function", mt = `[ 	
\f\r]`, j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ut = /-->/g, qt = />/g, D = RegExp(`>|${mt}(?:([^\\s"'>=/]+)(${mt}*=${mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Vt = /'/g, Gt = /"/g, he = /^(?:script|style|textarea|title)$/i, Le = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), Z = Le(1), V = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), Wt = /* @__PURE__ */ new WeakMap(), I = H.createTreeWalker(H, 129);
function le(s, t) {
  if (!Mt(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ht !== void 0 ? Ht.createHTML(t) : t;
}
const Ie = (s, t) => {
  const e = s.length - 1, i = [];
  let n, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = j;
  for (let h = 0; h < e; h++) {
    const a = s[h];
    let l, c, d = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, c = o.exec(a), c !== null); )
      u = o.lastIndex, o === j ? c[1] === "!--" ? o = Ut : c[1] !== void 0 ? o = qt : c[2] !== void 0 ? (he.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = D) : c[3] !== void 0 && (o = D) : o === D ? c[0] === ">" ? (o = n ?? j, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? D : c[3] === '"' ? Gt : Vt) : o === Gt || o === Vt ? o = D : o === Ut || o === qt ? o = j : (o = D, n = void 0);
    const p = o === D && s[h + 1].startsWith("/>") ? " " : "";
    r += o === j ? a + De : d >= 0 ? (i.push(l), a.slice(0, d) + oe + a.slice(d) + z + p) : a + z + (d === -2 ? h : p);
  }
  return [le(s, r + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class it {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let r = 0, o = 0;
    const h = t.length - 1, a = this.parts, [l, c] = Ie(t, e);
    if (this.el = it.createElement(l, i), I.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = I.nextNode()) !== null && a.length < h; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(oe)) {
              const u = c[o++], p = n.getAttribute(d).split(z), f = /([.?@])?(.*)/.exec(u);
              a.push({ type: 1, index: r, name: f[2], strings: p, ctor: f[1] === "." ? He : f[1] === "?" ? Ue : f[1] === "@" ? qe : ht }), n.removeAttribute(d);
            } else
              d.startsWith(z) && (a.push({ type: 6, index: r }), n.removeAttribute(d));
        if (he.test(n.tagName)) {
          const d = n.textContent.split(z), u = d.length - 1;
          if (u > 0) {
            n.textContent = at ? at.emptyScript : "";
            for (let p = 0; p < u; p++)
              n.append(d[p], tt()), I.nextNode(), a.push({ type: 2, index: ++r });
            n.append(d[u], tt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === ae)
          a.push({ type: 2, index: r });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(z, d + 1)) !== -1; )
            a.push({ type: 7, index: r }), d += z.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = H.createElement("template");
    return i.innerHTML = t, i;
  }
}
function G(s, t, e = s, i) {
  if (t === V)
    return t;
  let n = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const r = et(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== r && (n?._$AO?.(!1), r === void 0 ? n = void 0 : (n = new r(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = G(s, n._$AS(s, t.values), n, i)), t;
}
class Ne {
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
    const { el: { content: e }, parts: i } = this._$AD, n = (t?.creationScope ?? H).importNode(e, !0);
    I.currentNode = n;
    let r = I.nextNode(), o = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new st(r, r.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (l = new Ve(r, this, t)), this._$AV.push(l), a = i[++h];
      }
      o !== a?.index && (r = I.nextNode(), o++);
    }
    return I.currentNode = H, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class st {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = G(this, t, e), et(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== V && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Fe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && et(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = it.createElement(le(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === n)
      this._$AH.p(e);
    else {
      const r = new Ne(n, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Wt.get(t.strings);
    return e === void 0 && Wt.set(t.strings, e = new it(t)), e;
  }
  k(t) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const r of t)
      n === e.length ? e.push(i = new st(this.O(tt()), this.O(tt()), this, this.options)) : i = e[n], i._$AI(r), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = Nt(t).nextSibling;
      Nt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ht {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, r) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = w;
  }
  _$AI(t, e = this, i, n) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = G(this, t, e, 0), o = !et(t) || t !== this._$AH && t !== V, o && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = r[0], a = 0; a < r.length - 1; a++)
        l = G(this, h[i + a], e, a), l === V && (l = this._$AH[a]), o || (o = !et(l) || l !== this._$AH[a]), l === w ? t = w : t !== w && (t += (l ?? "") + r[a + 1]), this._$AH[a] = l;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class He extends ht {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Ue extends ht {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class qe extends ht {
  constructor(t, e, i, n, r) {
    super(t, e, i, n, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = G(this, t, e, 0) ?? w) === V)
      return;
    const i = this._$AH, n = t === w && i !== w || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, r = t !== w && (i === w || n);
    n && this.element.removeEventListener(this.name, this, i), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ve {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    G(this, t);
  }
}
const Ge = X.litHtmlPolyfillSupport;
Ge?.(it, st), (X.litHtmlVersions ?? (X.litHtmlVersions = [])).push("3.3.3");
const We = (s, t, e) => {
  const i = e?.renderBefore ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const r = e?.renderBefore ?? null;
    i._$litPart$ = n = new st(t.insertBefore(tt(), r), r, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
const J = globalThis;
class q extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = We(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return V;
  }
}
q._$litElement$ = !0, q.finalized = !0, J.litElementHydrateSupport?.({ LitElement: q });
const Be = J.litElementPolyfillSupport;
Be?.({ LitElement: q });
(J.litElementVersions ?? (J.litElementVersions = [])).push("4.2.2");
const je = { attribute: !0, type: String, converter: ot, reflect: !1, hasChanged: At }, Qe = (s = je, t, e) => {
  const { kind: i, metadata: n } = e;
  let r = globalThis.litPropertyMetadata.get(n);
  if (r === void 0 && globalThis.litPropertyMetadata.set(n, r = /* @__PURE__ */ new Map()), i === "setter" && ((s = Object.create(s)).wrapped = !0), r.set(e.name, s), i === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, s, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, s, h), h;
    } };
  }
  if (i === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, s, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Et(s) {
  return (t, e) => typeof e == "object" ? Qe(s, t, e) : ((i, n, r) => {
    const o = n.hasOwnProperty(r);
    return n.constructor.createProperty(r, i), o ? Object.getOwnPropertyDescriptor(n, r) : void 0;
  })(s, t, e);
}
function lt(s) {
  return Et({ ...s, state: !0, attribute: !1 });
}
class Ye {
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
const Ke = ["low", "medium", "high", "ultra"];
function Bt(s) {
  return Ke.indexOf(s);
}
class Xe {
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
    const n = [...this.frameTimes].sort((h, a) => h - a), r = n[Math.floor(n.length / 2)], o = 1e3 / this.targetFps;
    if (r > o * 0.55) {
      const h = Ot(this.level, -1);
      if (h !== this.level)
        return this.level = h, this.ceiling = h, this.frameTimes.length = 0, h;
    } else if (r < o * 0.18) {
      const h = Ot(this.level, 1);
      if (h !== this.level && Bt(h) <= Bt(this.ceiling))
        return this.level = h, this.frameTimes.length = 0, h;
    }
    return null;
  }
}
function k(s) {
  let t = s.trim().replace("#", "");
  if (t.length === 3 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), t.length !== 6)
    return [0, 0, 0];
  const e = Number.parseInt(t, 16);
  return Number.isNaN(e) ? [0, 0, 0] : [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function _(s, t = 1) {
  const e = Math.round($(s[0], 0, 255)), i = Math.round($(s[1], 0, 255)), n = Math.round($(s[2], 0, 255));
  return t >= 1 ? `rgb(${e},${i},${n})` : `rgba(${e},${i},${n},${$(t, 0, 1)})`;
}
function ct(s, t, e) {
  return [v(s[0], t[0], e), v(s[1], t[1], e), v(s[2], t[2], e)];
}
function ce(s) {
  return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
}
function Ze(s, t) {
  const e = ce(s);
  return ct(s, [e, e, e], $(t, 0, 1));
}
function yt(s, t) {
  return [$(s[0] * t, 0, 255), $(s[1] * t, 0, 255), $(s[2] * t, 0, 255)];
}
function Je(s, t) {
  const e = ce(s);
  return [
    $(e + (s[0] - e) * t, 0, 255),
    $(e + (s[1] - e) * t, 0, 255),
    $(e + (s[2] - e) * t, 0, 255)
  ];
}
function ti(s, t) {
  const e = s[0] - t[0], i = s[1] - t[1], n = s[2] - t[2];
  return e * e + i * i + n * n;
}
function O(s, t) {
  return {
    elevation: s,
    palette: {
      zenith: k(t.zenith),
      upper: k(t.upper),
      middle: k(t.middle),
      lower: k(t.lower),
      horizon: k(t.horizon),
      sunCore: k(t.sunCore),
      sunGlow: k(t.sunGlow),
      ambient: k(t.ambient),
      cloud: k(t.cloud)
    }
  };
}
const F = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  O(-90, {
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
  O(-12, {
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
  O(-6, {
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
  O(-2, {
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
  O(3, {
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
  O(12, {
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
  O(35, {
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
  O(70, {
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
], kt = [
  "zenith",
  "upper",
  "middle",
  "lower",
  "horizon",
  "sunCore",
  "sunGlow",
  "ambient",
  "cloud"
], ei = [255, 118, 162], ii = [255, 138, 56];
function si(s, t, e) {
  const i = {};
  for (const n of kt)
    i[n] = ct(s[n], t[n], e);
  return i;
}
function ni(s) {
  if (s <= F[0].elevation)
    return { ...F[0].palette };
  const t = F[F.length - 1];
  if (s >= t.elevation)
    return { ...t.palette };
  for (let e = 0; e < F.length - 1; e++) {
    const i = F[e], n = F[e + 1];
    if (s >= i.elevation && s <= n.elevation) {
      const r = Y(i.elevation, n.elevation, s);
      return si(i.palette, n.palette, r);
    }
  }
  return { ...t.palette };
}
function de(s) {
  const t = Y(-4, 8, s), e = 1 - Y(-14, -2, s), i = Y(-16, -3, s) * (1 - Y(0, 10, s));
  return { dayFactor: t, nightFactor: e, twilightFactor: i };
}
function bt(s) {
  const { elevation: t, rising: e, weather: i, appearance: n } = s, r = ni(t), { twilightFactor: o } = de(t), h = e ? ei : ii, a = o * 0.3, l = {}, c = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45
  }, d = g(i.desaturation) * 0.8, u = 1 - g(i.skyDarkness) * 0.75;
  for (const p of kt) {
    let f = ct(r[p], h, a * c[p]);
    f = Ze(f, d), f = yt(f, u), f = Je(f, n.saturation), f = yt(f, n.brightness), l[p] = f;
  }
  return l.cloud = yt(l.cloud, v(1, 0.32, g(i.cloudDarkness))), l;
}
function ri(s, t, e, i) {
  const n = e <= 0 ? 1 : 1 - Math.pow(2, -i / e), r = {};
  for (const o of kt)
    r[o] = ct(s[o], t[o], n);
  return r;
}
function oi(s) {
  return s.getTime() / 864e5 - 10957.5;
}
function ai(s, t, e) {
  const i = oi(s), n = E(357.5291 + 0.98560028 * i), r = E(280.459 + 0.98564736 * i) + E(1.9148) * Math.sin(n) + E(0.02) * Math.sin(2 * n), o = E(23.4393 - 3563e-10 * i), h = Math.asin(Math.sin(o) * Math.sin(r)), a = Math.atan2(
    Math.cos(o) * Math.sin(r),
    Math.cos(r)
  ), c = E(280.16 + 360.9856235 * i) + E(e) - a, d = E(t), u = Math.sin(d) * Math.sin(h) + Math.cos(d) * Math.cos(h) * Math.cos(c), p = Math.asin(Math.max(-1, Math.min(1, u))), f = Math.atan2(
    Math.sin(c),
    Math.cos(c) * Math.sin(d) - Math.tan(h) * Math.cos(d)
  ), m = c + E(360.9856235 * (10 / 1440)), b = Math.sin(d) * Math.sin(h) + Math.cos(d) * Math.cos(h) * Math.cos(m);
  return {
    elevation: Rt(p),
    azimuth: _t(Rt(f) + 180, 360),
    rising: b > u
  };
}
function hi(s) {
  const t = 29.530588853, e = Date.UTC(2e3, 0, 6, 18, 14) / 864e5, i = s.getTime() / 864e5 - e;
  return _t(i / t, 1);
}
function li(s, t, e) {
  const r = (s.getHours() + s.getMinutes() / 60 + s.getSeconds() / 3600 - 12) / 24 * M - e * M, o = 70 - Math.min(55, Math.abs(t) * 0.55), h = Math.cos(r) * o, a = (Math.sin(r) + 1) / 2;
  return { altitude: h, azimuthFraction: a };
}
const ci = [
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
], di = {
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
function ui(s) {
  if (!s)
    return "unknown";
  const t = s.toLowerCase().trim();
  return ci.includes(t) ? t : di[t] ?? "unknown";
}
const pi = {
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
}, fi = {
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
function ue(s) {
  return { condition: s, ...pi, ...fi[s] };
}
const gi = {
  "km/h": 1,
  kmh: 1,
  "m/s": 3.6,
  ms: 3.6,
  mph: 1.60934,
  "mi/h": 1.60934,
  kn: 1.852,
  kt: 1.852
};
function nt(s) {
  if (typeof s == "number" && Number.isFinite(s))
    return s;
  if (typeof s == "string") {
    const t = Number.parseFloat(s);
    if (Number.isFinite(t))
      return t;
  }
  return null;
}
function vt(s) {
  if (s) {
    for (const t of Object.keys(s.states))
      if (t.startsWith("weather."))
        return t;
  }
}
function jt(s, t, e = /* @__PURE__ */ new Date()) {
  const i = s?.config?.latitude ?? 51.2, n = s?.config?.longitude ?? 6.8;
  let r = null, o = null, h = null, a = "computed";
  const l = t.sun_entity, c = l ? s?.states?.[l] : void 0;
  if (c) {
    const y = nt(c.attributes.elevation), A = nt(c.attributes.azimuth);
    y !== null && (r = y, o = A, h = typeof c.attributes.rising == "boolean" ? c.attributes.rising : null, a = "sun.sun");
  }
  if (r === null || o === null || h === null) {
    const y = ai(e, i, n);
    r === null && (r = y.elevation), o === null && (o = y.azimuth), h === null && (h = y.rising), a !== "sun.sun" && (a = "computed");
  }
  const d = t.weather_entity ?? vt(s), u = d ? s?.states?.[d] : void 0;
  let p = "unknown", f = null, m = null, b = !1;
  if (u && u.state !== "unavailable" && u.state !== "unknown") {
    p = ui(u.state), b = !0;
    const y = nt(u.attributes.cloud_coverage);
    y !== null && (f = g(y / 100));
    const A = nt(u.attributes.wind_speed);
    if (A !== null) {
      const P = String(
        u.attributes.wind_speed_unit ?? s?.config?.unit_system?.wind_speed ?? "km/h"
      ).toLowerCase(), pt = A * (gi[P] ?? 1);
      m = g(pt / 70);
    }
  } else
    d || (p = r > -6 ? "sunny" : "clear-night");
  return p === "sunny" && r < -4 && (p = "clear-night"), p === "clear-night" && r > 2 && (p = "sunny"), {
    condition: p,
    cloudCoverage: f,
    wind: m,
    sunElevation: r,
    sunAzimuth: o,
    sunRising: h,
    latitude: i,
    longitude: n,
    sunSource: a,
    weatherEntity: d ?? null,
    weatherAvailable: b
  };
}
function wt(s) {
  const t = ue(s.condition);
  return s.cloudCoverage !== null && (t.cloudCover = v(t.cloudCover, s.cloudCoverage, 0.65), t.sunVisibility = Math.min(t.sunVisibility, 1 - s.cloudCoverage * 0.85)), s.wind !== null && (t.wind = v(t.wind, s.wind, 0.7)), t;
}
const mi = [
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
class yi {
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
    for (const i of mi)
      this.current[i] = ee(this.current[i], this.target[i], e, t);
    return this.current.condition = this.target.condition, this.current;
  }
  get value() {
    return this.current;
  }
}
class bi {
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
      const l = t.createLinearGradient(0, 0, 0, r);
      l.addColorStop(0, _(i.zenith)), l.addColorStop(0.28, _(i.upper)), l.addColorStop(0.55, _(i.middle)), l.addColorStop(0.82, _(i.lower)), l.addColorStop(1, _(i.horizon)), this.gradient = l, this.cacheKey = o;
    }
    t.fillStyle = this.gradient, t.fillRect(0, 0, n, r);
    const h = t.createLinearGradient(0, 0, 0, r * 0.45), a = g(0.12 + e.weather.skyDarkness * 0.2);
    h.addColorStop(0, `rgba(0,0,0,${a.toFixed(3)})`), h.addColorStop(1, "rgba(0,0,0,0)"), t.fillStyle = h, t.fillRect(0, 0, n, r * 0.45);
  }
  destroy() {
    this.gradient = null;
  }
}
const wi = 6221137;
class vi {
  constructor() {
    this.name = "stars", this.stars = [], this.shooting = [], this.nextShootingStar = 12;
  }
  setup(t) {
    const e = ie(wi), i = t.quality.starCount;
    this.stars = new Array(i);
    for (let n = 0; n < i; n++) {
      const r = Math.pow(e(), 1.6) * 0.82;
      this.stars[n] = {
        nx: e(),
        ny: r,
        radius: x(e, 0.4, 1.5),
        baseAlpha: x(e, 0.35, 1),
        twinkleSpeed: x(e, 0.4, 2.2),
        twinklePhase: e() * M,
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
    const i = g(e.nightFactor) * (1 - g(e.weather.cloudCover) * 0.85) * g(e.appearance.intensity);
    if (i <= 0.01) {
      this.shooting.length = 0;
      return;
    }
    const { width: n, height: r } = e, o = !e.reducedMotion;
    t.save();
    for (let h = 0; h < this.stars.length; h++) {
      const a = this.stars[h], l = a.nx * n, c = a.ny * r;
      let d = a.baseAlpha * i;
      if (o) {
        const m = Math.sin(e.time * a.twinkleSpeed + a.twinklePhase);
        d *= 0.62 + 0.38 * m;
      }
      if (d <= 0.02)
        continue;
      const u = 255, p = 245 + Math.round(a.tint * 8), f = 225 + Math.round((1 - a.tint) * 30);
      t.fillStyle = `rgba(${u},${p},${f},${d.toFixed(3)})`, a.radius <= 0.7 ? t.fillRect(l, c, 1, 1) : (t.beginPath(), t.arc(l, c, a.radius, 0, M), t.fill());
    }
    t.restore(), e.effects.shooting_stars && e.quality.shootingStars && !e.reducedMotion && this.updateShootingStars(t, e, i);
  }
  updateShootingStars(t, e, i) {
    const { width: n, height: r, dt: o } = e;
    if (this.nextShootingStar -= o, this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const h = 380 + Math.random() * 320, a = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * n * 0.8,
        y: Math.random() * r * 0.35,
        vx: Math.cos(a) * h,
        vy: Math.sin(a) * h,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.5,
        length: 60 + Math.random() * 90
      });
    }
    for (let h = this.shooting.length - 1; h >= 0; h--) {
      const a = this.shooting[h];
      if (a.life += o, a.life >= a.maxLife) {
        this.shooting.splice(h, 1);
        continue;
      }
      a.x += a.vx * o, a.y += a.vy * o;
      const l = a.life / a.maxLife, c = Math.sin(l * Math.PI) * i, d = a.vx === 0 && a.vy === 0 ? 0 : a.vx, u = Math.hypot(d, a.vy) || 1, p = a.x - d / u * a.length, f = a.y - a.vy / u * a.length, m = t.createLinearGradient(a.x, a.y, p, f);
      m.addColorStop(0, `rgba(255,255,255,${c.toFixed(3)})`), m.addColorStop(1, "rgba(255,255,255,0)"), t.strokeStyle = m, t.lineWidth = 1.6, t.lineCap = "round", t.beginPath(), t.moveTo(a.x, a.y), t.lineTo(p, f), t.stroke();
    }
  }
  destroy() {
    this.stars.length = 0, this.shooting.length = 0;
  }
}
class _i {
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
    const i = g(e.nightFactor) * (1 - g(e.weather.cloudCover) * 0.8);
    if (i <= 0.03)
      return;
    const n = Math.min(e.width, e.height), r = Math.max(12, n * 0.035), o = Math.ceil(r * 2 + 4), h = this.ensureBuffer(o);
    if (!h || !this.buffer)
      return;
    const a = Math.round(e.moonPhase * 200) / 200;
    a !== this.drawnPhase && (this.drawMoon(h, o, r, a), this.drawnPhase = a);
    const l = e.moonX * e.width, c = e.moonY * e.height;
    t.save(), t.globalCompositeOperation = "lighter";
    const d = r * 5, u = 0.14 * i * e.appearance.ambient_glow, p = t.createRadialGradient(l, c, r * 0.6, l, c, d);
    p.addColorStop(0, `rgba(200,220,255,${u.toFixed(3)})`), p.addColorStop(1, "rgba(200,220,255,0)"), t.fillStyle = p, t.beginPath(), t.arc(l, c, d, 0, M), t.fill(), t.globalCompositeOperation = "source-over", t.globalAlpha = i, t.drawImage(this.buffer, l - o / 2, c - o / 2), t.restore();
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
    const h = t.createRadialGradient(
      r - i * 0.25,
      o - i * 0.25,
      i * 0.1,
      r,
      o,
      i
    );
    h.addColorStop(0, "#fffdf3"), h.addColorStop(0.75, "#eceadd"), h.addColorStop(1, "#cfd3cc"), t.fillStyle = h, t.beginPath(), t.arc(r, o, i, 0, M), t.fill(), t.fillStyle = "rgba(148,153,150,0.22)";
    const a = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16]
    ];
    for (const [d, u, p] of a)
      t.beginPath(), t.arc(r + d * i, o + u * i, p * i, 0, M), t.fill();
    const l = (1 - Math.cos(n * M)) / 2;
    if (l < 0.99) {
      const u = n < 0.5, p = Math.abs(1 - l * 2) * i;
      t.save(), t.globalCompositeOperation = "destination-out", t.fillStyle = "rgba(0,0,0,1)", t.beginPath(), t.arc(r, o, i + 1, -Math.PI / 2, Math.PI / 2, u);
      const f = u ? l < 0.5 : l >= 0.5;
      t.ellipse(
        r,
        o,
        p,
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
class $i {
  constructor() {
    this.name = "sun";
  }
  setup() {
  }
  resize() {
  }
  render(t, e) {
    const { palette: i, width: n, height: r, appearance: o } = e, h = g(e.dayFactor * 0.35 + e.twilightFactor) * o.ambient_glow * v(0.45, 1, g(e.weather.sunVisibility));
    if (h > 0.01) {
      const m = g(e.sunX) * n, b = r * v(1.02, 0.55, g(e.dayFactor)), y = Math.max(n, r) * v(0.55, 0.95, e.twilightFactor), A = t.createRadialGradient(m, b, 0, m, b, y);
      A.addColorStop(0, _(i.sunGlow, 0.5 * h)), A.addColorStop(0.35, _(i.sunGlow, 0.22 * h)), A.addColorStop(1, _(i.sunGlow, 0)), t.fillStyle = A, t.fillRect(0, 0, n, r);
    }
    const a = g((e.sunElevation + 1.5) / 4) * g(e.weather.sunVisibility);
    if (a <= 0.02)
      return;
    const l = e.sunX * n, c = e.sunY * r, d = Math.min(n, r), u = Math.max(14, d * 0.045);
    t.save(), t.globalCompositeOperation = "lighter";
    const p = e.quality.sunGlowPasses;
    for (let m = p; m >= 1; m--) {
      const b = m / p, y = u * (2.2 + b * 9), A = 0.1 * a * o.ambient_glow * (1 - b * 0.55), P = t.createRadialGradient(l, c, u * 0.4, l, c, y);
      P.addColorStop(0, _(i.sunGlow, A)), P.addColorStop(1, _(i.sunGlow, 0)), t.fillStyle = P, t.beginPath(), t.arc(l, c, y, 0, M), t.fill();
    }
    const f = t.createRadialGradient(l, c, 0, l, c, u);
    f.addColorStop(0, _(i.sunCore, a)), f.addColorStop(0.7, _(i.sunCore, 0.85 * a)), f.addColorStop(1, _(i.sunGlow, 0)), t.fillStyle = f, t.beginPath(), t.arc(l, c, u, 0, M), t.fill(), t.restore();
  }
  destroy() {
  }
}
const Si = 790741, Qt = 5, Ci = 6 * 6 * 3;
class Ai {
  constructor() {
    this.name = "clouds", this.base = [], this.tinted = [], this.tintColor = [0, 0, 0], this.tintValid = !1, this.clouds = [], this.spriteWidth = 0, this.spriteHeight = 0;
  }
  setup(t) {
    const { cloudSpriteSize: e, cloudCount: i, cloudLayers: n } = t.quality;
    this.spriteWidth = e, this.spriteHeight = Math.round(e * 0.55);
    const r = ie(Si);
    this.base = [];
    for (let o = 0; o < Qt; o++)
      this.base.push(Mi(this.spriteWidth, this.spriteHeight, r));
    this.tinted = [], this.tintValid = !1, this.clouds = new Array(i);
    for (let o = 0; o < i; o++) {
      const h = o % n, a = n <= 1 ? 1 : h / (n - 1);
      this.clouds[o] = {
        variant: Math.floor(r() * Qt),
        nx: r(),
        ny: x(r, -0.04, 0.46) - a * 0.06,
        scale: x(r, 0.82, 1.22),
        layer: a,
        alpha: x(r, 0.6, 1),
        bobPhase: r() * Math.PI * 2,
        bobAmount: x(r, 4e-3, 0.014)
      };
    }
    this.clouds.sort((o, h) => o.layer - h.layer);
  }
  resize() {
  }
  particleCount() {
    return this.clouds.length;
  }
  render(t, e) {
    const i = g(e.weather.cloudCover) * g(e.appearance.intensity);
    if (i <= 0.01 || this.clouds.length === 0 || (this.ensureTint(e.palette.cloud), this.tinted.length === 0))
      return;
    const { width: n, height: r, dt: o } = e, h = Math.max(r, n * 0.42), a = this.spriteWidth / this.spriteHeight, l = h * 0.42 * a * 1.22, c = n + l * 2.2, d = i * this.clouds.length, u = Math.floor(d), p = d - u, f = v(0.25, 2.6, g(e.weather.wind)), m = e.reducedMotion ? 0.08 : 1;
    t.save();
    for (let b = 0; b < this.clouds.length; b++) {
      const y = this.clouds[b], A = n * v(6e-3, 0.028, y.layer) * f * m;
      if (y.nx = _t(y.nx + A * o / c, 1), b > u)
        continue;
      const P = b === u ? p : 1;
      if (P <= 0.01)
        continue;
      const pt = this.tinted[y.variant], xt = h * v(0.13, 0.42, y.layer) * y.scale, Pt = xt * a, ft = y.nx * c - l * 1.1, ge = e.reducedMotion ? 0 : Math.sin(e.time * 0.12 + y.bobPhase) * y.bobAmount * r, me = y.ny * r + ge;
      if (ft + Pt < 0 || ft > n)
        continue;
      const ye = y.alpha * P * v(0.42, 0.92, i) * v(0.75, 1, y.layer) * v(1, 1.15, g(e.weather.cloudDarkness));
      t.globalAlpha = g(ye), t.drawImage(pt, ft, me, Pt, xt);
    }
    t.restore(), this.renderFogBand(t, e);
  }
  /**
   * Overcast / foggy skies get a soft haze band near the horizon. This is the
   * hook the dedicated fog renderer will extend in v0.2.
   */
  renderFogBand(t, e) {
    const i = g(e.weather.fog) * g(e.appearance.intensity);
    if (i <= 0.02 || !e.effects.fog)
      return;
    const { width: n, height: r } = e, o = e.reducedMotion ? 0 : Math.sin(e.time * 0.05) * 0.02, h = r * (0.62 + o), a = t.createLinearGradient(0, h, 0, r);
    a.addColorStop(0, _(e.palette.ambient, 0)), a.addColorStop(1, _(e.palette.ambient, 0.38 * i)), t.fillStyle = a, t.fillRect(0, h, n, r - h);
  }
  ensureTint(t) {
    this.tintValid && ti(t, this.tintColor) < Ci || (this.tinted = this.base.map((e) => Ei(e, t)), this.tintColor = t, this.tintValid = !0);
  }
  destroy() {
    this.base = [], this.tinted = [], this.clouds = [], this.tintValid = !1;
  }
}
function Mi(s, t, e) {
  const i = document.createElement("canvas");
  i.width = s, i.height = t;
  const n = i.getContext("2d");
  if (!n)
    return i;
  const r = t * 0.66, o = 12 + Math.floor(e() * 8);
  for (let l = 0; l < o; l++) {
    const c = s * x(e, 0.14, 0.86), d = 1 - Math.abs(c / s - 0.5) * 1.5;
    if (d <= 0.05)
      continue;
    const u = Math.pow(e(), 1.5), p = r - u * t * 0.5, f = t * x(e, 0.16, 0.3) * Math.max(0.35, d), m = Math.round(v(178, 255, g(1 - p / t + 0.15))), b = n.createRadialGradient(c, p, f * 0.05, c, p, f);
    b.addColorStop(0, `rgba(${m},${m},${m},0.85)`), b.addColorStop(0.55, `rgba(${m},${m},${m},0.38)`), b.addColorStop(1, `rgba(${m},${m},${m},0)`), n.fillStyle = b, n.beginPath(), n.ellipse(c, p, f * 1.35, f, 0, 0, Math.PI * 2), n.fill();
  }
  n.globalCompositeOperation = "destination-in";
  const h = n.createLinearGradient(0, 0, 0, t);
  h.addColorStop(0, "rgba(0,0,0,1)"), h.addColorStop(r / t, "rgba(0,0,0,1)"), h.addColorStop(Math.min(1, r / t + 0.16), "rgba(0,0,0,0)"), h.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = h, n.fillRect(0, 0, s, t);
  const a = n.createLinearGradient(0, 0, s, 0);
  return a.addColorStop(0, "rgba(0,0,0,0)"), a.addColorStop(0.12, "rgba(0,0,0,1)"), a.addColorStop(0.88, "rgba(0,0,0,1)"), a.addColorStop(1, "rgba(0,0,0,0)"), n.fillStyle = a, n.fillRect(0, 0, s, t), n.globalCompositeOperation = "source-over", i;
}
function Ei(s, t) {
  const e = document.createElement("canvas");
  e.width = s.width, e.height = s.height;
  const i = e.getContext("2d");
  return i && (i.drawImage(s, 0, 0), i.globalCompositeOperation = "multiply", i.fillStyle = _(t), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-in", i.drawImage(s, 0, 0), i.globalCompositeOperation = "source-over"), e;
}
class ki {
  constructor(t, e, i) {
    this.sky = new bi(), this.stars = new vi(), this.moon = new _i(), this.sun = new $i(), this.clouds = new Ai(), this.reducedMotion = !1, this.initialised = !1, this.config = t, this.quality = e, this.snapshot = i, this.renderers = [this.sky, this.stars, this.moon, this.sun, this.clouds], this.blender = new yi(ue(i.condition)), this.blender.snapTo(wt(i)), this.elevation = i.sunElevation, this.azimuth = i.sunAzimuth, this.palette = bt({
      elevation: this.elevation,
      rising: i.sunRising,
      weather: this.blender.value,
      appearance: t.appearance
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
    this.config = t, this.state.appearance = t.appearance, this.state.effects = t.effects;
  }
  /** Called when the quality level changed – renderers rebuild their buffers. */
  setQuality(t) {
    this.quality = t, this.state.quality = t;
    for (const e of this.renderers)
      e.setup(this.state);
  }
  /** New Home Assistant data. Cheap – the blending happens per frame. */
  setEnvironment(t) {
    this.snapshot = t, this.blender.setTarget(wt(t));
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
    this.elevation = this.snapshot.sunElevation, this.azimuth = this.snapshot.sunAzimuth, this.blender.snapTo(wt(this.snapshot)), this.palette = bt({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance
    });
  }
  update(t, e) {
    const i = this.state;
    i.dt = t, i.time = e, this.elevation = ee(this.elevation, this.snapshot.sunElevation, 1.5, t), this.azimuth = xi(this.azimuth, this.snapshot.sunAzimuth, 1.5, t);
    const n = this.blender.update(t), r = bt({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: n,
      appearance: this.config.appearance
    });
    this.palette = ri(this.palette, r, 0.6, t);
    const { dayFactor: o, nightFactor: h, twilightFactor: a } = de(this.elevation);
    i.sunElevation = this.elevation, i.sunAzimuth = this.azimuth, i.sunRising = this.snapshot.sunRising, i.dayFactor = o, i.nightFactor = h, i.twilightFactor = a, i.palette = this.palette, i.weather = n, i.sunX = g((this.azimuth - 60) / 240), i.sunY = this.elevation >= 0 ? 0.94 - Math.pow(g(this.elevation / 60), 0.7) * 0.84 : $(0.94 + -this.elevation / 20 * 0.18, 0.94, 1.2);
    const l = /* @__PURE__ */ new Date(), c = hi(l), d = li(l, this.snapshot.latitude, c);
    i.moonPhase = c, i.moonX = v(0.08, 0.92, g(d.azimuthFraction)), i.moonY = $(1.02 - g(d.altitude / 70) * 0.88, 0.08, 1.1), i.moonVisible = this.config.effects.moon && d.altitude > 2 && h > 0.08 && c > 0.03 && c < 0.97;
  }
  render(t) {
    const e = this.state, i = this.config.effects;
    this.sky.render(t, e), i.stars && this.stars.render(t, e), i.moon && this.moon.render(t, e), i.sun && this.sun.render(t, e), i.clouds && this.clouds.render(t, e);
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
function xi(s, t, e, i) {
  let n = (t - s + 540) % 360 - 180;
  const r = e <= 0 ? 1 : 1 - Math.pow(2, -i / e);
  return n *= r, (s + n + 360) % 360;
}
const Pi = (s) => `
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
class Yt {
  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(t, e = 12) {
    this.lastUpdate = 0, this.element = document.createElement("div"), this.element.className = "aurora-debug", this.element.setAttribute("style", Pi(e)), t.appendChild(this.element);
  }
  update(t, e, i, n, r) {
    const o = performance.now();
    if (o - this.lastUpdate < 250)
      return;
    this.lastUpdate = o;
    const h = [
      `AURORA BACKGROUND  v${$t}`,
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
      `moon         ${t.moonVisible ? "visible" : "hidden"}  phase ${t.moonPhase.toFixed(2)}`,
      `reduced mo.  ${t.reducedMotion ? "yes" : "no"}`
    ];
    this.element.textContent = h.join(`
`);
  }
  destroy() {
    this.element.remove();
  }
}
const Kt = 42e5;
class pe {
  constructor(t, e, i) {
    this.host = t, this.debugOverlay = null, this.resizeObserver = null, this.intersectionObserver = null, this.motionQuery = null, this.cssWidth = 0, this.cssHeight = 0, this.pixelRatio = 1, this.resizePending = !1, this.visible = !0, this.documentVisible = !0, this.destroyed = !1, this.firstFrame = !0, this.environmentTimer = null, this.onMotionPreferenceChange = (r) => {
      this.scene.setReducedMotion(r.matches), this.applyFrameCap();
    }, this.onVisibilityChange = () => {
      this.documentVisible = document.visibilityState !== "hidden", this.updateRunState();
    }, this.onIntersect = (r) => {
      for (const o of r)
        o.target === this.host && (this.visible = o.isIntersecting);
      this.updateRunState();
    }, this.onResize = () => {
      this.resizePending || this.destroyed || (this.resizePending = !0, requestAnimationFrame(() => {
        this.resizePending = !1, !this.destroyed && (this.measure(), this.engine.isRunning || this.renderOnce());
      }));
    }, this.refreshEnvironment = () => {
      this.destroyed || (this.scene.setEnvironment(jt(this.hass, this.config)), this.engine.isRunning || this.renderOnce());
    }, this.frame = (r, o) => {
      if (this.destroyed || !this.ctx)
        return;
      const h = performance.now();
      this.firstFrame && (this.scene.snapToTargets(), this.firstFrame = !1), this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.update(r, o), this.scene.render(this.ctx);
      const a = performance.now() - h, l = this.performance.sample(r, a);
      l && this.applyQuality(l), this.debugOverlay && this.debugOverlay.update(
        this.scene.sceneState,
        this.scene.environment,
        this.performance.fps,
        this.scene.particleCount(),
        !1
      );
    }, this.config = e, this.hass = i, this.canvas = document.createElement("canvas"), this.canvas.className = "aurora-canvas", this.canvas.setAttribute(
      "style",
      "position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;"
    ), this.host.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d", { alpha: !1, desynchronized: !0 });
    const n = this.resolveQuality();
    this.performance = new Xe(
      n,
      e.quality === "auto" && e.performance.auto_quality,
      Math.min(e.performance.max_fps, B(n).maxFps)
    ), this.scene = new ki(
      e,
      B(n),
      jt(i, e)
    ), this.engine = new Ye(this.frame), this.applyFrameCap(), this.applyCanvasFilter(), this.attachListeners(), this.measure(), this.scene.snapToTargets(), e.debug && (this.debugOverlay = new Yt(this.host, this.debugTopOffset())), this.updateRunState();
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
    (n || r) && this.applyCanvasFilter(), i && (t.debug && !this.debugOverlay ? this.debugOverlay = new Yt(this.host, this.debugTopOffset()) : !t.debug && this.debugOverlay && (this.debugOverlay.destroy(), this.debugOverlay = null)), this.refreshEnvironment(), this.updateRunState();
  }
  updateHass(t) {
    this.destroyed || (this.hass = t, this.refreshEnvironment());
  }
  destroy() {
    this.destroyed || (this.destroyed = !0, this.engine.stop(), this.detachListeners(), this.debugOverlay?.destroy(), this.debugOverlay = null, this.scene.destroy(), this.canvas.remove());
  }
  /* ---------------------------------------------------------------- *
   * Internals
   * ---------------------------------------------------------------- */
  /** Keep the overlay clear of the Home Assistant toolbar in background mode. */
  debugTopOffset() {
    return this.config.mode === "background" ? 76 : 12;
  }
  resolveQuality() {
    return this.config.quality === "auto" ? $e() : this.config.quality;
  }
  applyQuality(t) {
    const e = B(t);
    this.scene.setQuality(e), this.applyFrameCap(), this.measure();
  }
  applyFrameCap() {
    const t = B(this.performance.quality);
    let e = Math.min(this.config.performance.max_fps, t.maxFps);
    this.scene.sceneState.reducedMotion && (e = Math.min(e, 20)), this.engine.setMaxFps(e);
  }
  applyCanvasFilter() {
    const { blur: t, opacity: e } = this.config.appearance;
    this.canvas.style.filter = t > 0 ? `blur(${t}px)` : "", this.canvas.style.transform = t > 0 ? `scale(${1 + t / 120})` : "", this.canvas.style.opacity = e >= 1 ? "" : String(e);
  }
  attachListeners() {
    typeof ResizeObserver < "u" ? (this.resizeObserver = new ResizeObserver(this.onResize), this.resizeObserver.observe(this.host)) : window.addEventListener("resize", this.onResize, { passive: !0 }), typeof IntersectionObserver < "u" && (this.intersectionObserver = new IntersectionObserver(this.onIntersect, { threshold: 0 }), this.intersectionObserver.observe(this.host)), document.addEventListener("visibilitychange", this.onVisibilityChange), typeof window.matchMedia == "function" && (this.motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)"), this.scene.setReducedMotion(this.motionQuery.matches), typeof this.motionQuery.addEventListener == "function" ? this.motionQuery.addEventListener("change", this.onMotionPreferenceChange) : typeof this.motionQuery.addListener == "function" && this.motionQuery.addListener(this.onMotionPreferenceChange)), this.environmentTimer = window.setInterval(this.refreshEnvironment, 6e4);
  }
  detachListeners() {
    this.resizeObserver?.disconnect(), this.resizeObserver = null, window.removeEventListener("resize", this.onResize), this.intersectionObserver?.disconnect(), this.intersectionObserver = null, document.removeEventListener("visibilitychange", this.onVisibilityChange), this.motionQuery && (typeof this.motionQuery.removeEventListener == "function" ? this.motionQuery.removeEventListener("change", this.onMotionPreferenceChange) : typeof this.motionQuery.removeListener == "function" && this.motionQuery.removeListener(this.onMotionPreferenceChange), this.motionQuery = null), this.environmentTimer !== null && (window.clearInterval(this.environmentTimer), this.environmentTimer = null);
  }
  updateRunState() {
    !this.destroyed && this.cssWidth > 0 && this.cssHeight > 0 && this.visible && (this.documentVisible || !this.config.performance.pause_when_hidden) ? this.engine.start() : this.engine.stop();
  }
  measure() {
    const t = this.host.getBoundingClientRect(), e = Math.max(1, Math.round(t.width)), i = Math.max(1, Math.round(t.height)), n = B(this.performance.quality);
    let o = Math.min(window.devicePixelRatio || 1, n.maxDpr) * n.renderScale;
    const h = e * i * o * o;
    h > Kt && (o *= Math.sqrt(Kt / h));
    const a = Math.max(1, Math.round(e * o)), l = Math.max(1, Math.round(i * o)), c = this.canvas.width !== a || this.canvas.height !== l || this.cssWidth !== e || this.cssHeight !== i;
    this.cssWidth = e, this.cssHeight = i, this.pixelRatio = o, c && (this.canvas.width = a, this.canvas.height = l, this.scene.resize(e, i, o)), this.updateRunState();
  }
  /**
   * Paint a single frame while the loop is stopped (resize, or new Home
   * Assistant state while the dashboard is hidden).
   *
   * There is no time passing here, so the usual damping would never converge –
   * a still frame always snaps straight to the current sun and weather.
   */
  renderOnce() {
    this.destroyed || !this.ctx || this.cssWidth === 0 || (this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0), this.scene.snapToTargets(), this.scene.update(0, this.scene.sceneState.time), this.scene.render(this.ctx), this.firstFrame = !1, this.debugOverlay?.update(
      this.scene.sceneState,
      this.scene.environment,
      this.performance.fps,
      this.scene.particleCount(),
      !0
    ));
  }
}
const Xt = "aurora-background-root", Zt = "aurora-background-style";
class Ri {
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
      document.getElementById(Xt)?.remove();
      const e = document.createElement("div");
      e.id = Xt, this.root = e, this.applyRootStyle(t), document.body.insertBefore(e, document.body.firstChild);
    }
    if (!this.layer && this.root) {
      const e = this.activeOwner ? this.owners.get(this.activeOwner) : void 0;
      this.layer = new pe(this.root, t, e?.hass);
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
      const r = Jt(t);
      this.writeStyle(r ? `:root{${r}}` : "");
      return;
    }
    const e = [], i = [];
    t.background.transparent_lovelace && (i.push("--lovelace-background:transparent !important"), i.push("--view-background:transparent !important"), i.push("--ha-view-background:transparent !important"), e.push(
      "html,body{background:transparent !important;}",
      "home-assistant{background:transparent !important;}"
    )), t.background.transparent_header && (i.push("--app-header-background-color:transparent !important"), i.push("--header-height-background:transparent !important"));
    const n = Jt(t);
    n && i.push(n), i.length > 0 && e.unshift(`:root{${i.join(";")}}`), this.writeStyle(e.join(`
`));
  }
  writeStyle(t) {
    if (!this.styleElement) {
      document.getElementById(Zt)?.remove();
      const e = document.createElement("style");
      e.id = Zt, document.head.appendChild(e), this.styleElement = e;
    }
    this.styleElement.textContent !== t && (this.styleElement.textContent = t);
  }
}
function Jt(s) {
  const t = Object.entries(s.background.css_variables);
  return t.length === 0 ? "" : t.map(([e, i]) => `${e}:${i} !important`).join(";");
}
const Q = new Ri(), Oi = re`
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
`, zi = re`
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
var Ti = Object.defineProperty, Di = Object.getOwnPropertyDescriptor, fe = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Di(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && Ti(t, e, n), n;
};
const Fi = {
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
  rain: "Rain (v0.2)",
  snow: "Snow (v0.2)",
  fog: "Fog (v0.2)",
  lightning: "Lightning (v0.2)",
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
  z_index: "z-index"
};
function C(s) {
  return { name: s, selector: { boolean: {} } };
}
function L(s, t, e, i) {
  return { name: s, selector: { number: { min: t, max: e, step: i, mode: "slider" } } };
}
const Li = [
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
  C("debug"),
  {
    name: "effects",
    type: "expandable",
    icon: "mdi:weather-partly-cloudy",
    schema: [
      {
        name: "",
        type: "grid",
        schema: [
          C("sun"),
          C("moon"),
          C("stars"),
          C("shooting_stars"),
          C("clouds"),
          C("fog"),
          C("rain"),
          C("snow"),
          C("lightning")
        ]
      }
    ]
  },
  {
    name: "appearance",
    type: "expandable",
    icon: "mdi:palette",
    schema: [
      L("intensity", 0, 2, 0.05),
      L("saturation", 0, 2, 0.05),
      L("brightness", 0.2, 2, 0.05),
      L("ambient_glow", 0, 2, 0.05),
      L("opacity", 0, 1, 0.05),
      L("blur", 0, 40, 1)
    ]
  },
  {
    name: "performance",
    type: "expandable",
    icon: "mdi:speedometer",
    schema: [
      L("max_fps", 10, 120, 1),
      C("auto_quality"),
      C("pause_when_hidden")
    ]
  },
  {
    name: "background",
    type: "expandable",
    icon: "mdi:layers-outline",
    schema: [
      C("transparent_lovelace"),
      C("transparent_header"),
      { name: "z_index", selector: { number: { min: -10, max: 10, step: 1, mode: "box" } } }
    ]
  }
];
class dt extends q {
  constructor() {
    super(...arguments), this.config = {}, this.computeLabel = (t) => Fi[t.name] ?? t.name;
  }
  setConfig(t) {
    this.config = { ...t };
  }
  get formData() {
    const t = se(this.config);
    return {
      weather_entity: this.config.weather_entity ?? "",
      sun_entity: t.sun_entity ?? "",
      mode: t.mode,
      quality: t.quality,
      debug: t.debug,
      effects: { ...t.effects },
      appearance: { ...t.appearance },
      performance: { ...t.performance },
      background: {
        transparent_lovelace: t.background.transparent_lovelace,
        transparent_header: t.background.transparent_header,
        z_index: t.background.z_index
      }
    };
  }
  render() {
    return customElements.get("ha-form") ? Z`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${Li}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    ` : Z`
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
      type: this.config.type ?? `custom:${N}`,
      mode: e.mode,
      quality: e.quality,
      debug: !!e.debug,
      effects: e.effects,
      appearance: e.appearance,
      performance: e.performance,
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
dt.styles = zi;
fe([
  Et({ attribute: !1 })
], dt.prototype, "hass", 2);
fe([
  lt()
], dt.prototype, "config", 2);
customElements.get("aurora-background-editor") || customElements.define("aurora-background-editor", dt);
var Ii = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, ut = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Ni(t, e) : t, r = s.length - 1, o; r >= 0; r--)
    (o = s[r]) && (n = (i ? o(t, e, n) : o(n)) || n);
  return i && n && Ii(t, e, n), n;
};
const Hi = ["HUI-CARD-OPTIONS", "HUI-DIALOG-EDIT-CARD", "HUI-CARD-PREVIEW"];
function Ui(s, t = 30) {
  let e = s;
  for (let i = 0; i < t && e; i++) {
    if (e instanceof HTMLElement && Hi.includes(e.tagName))
      return !0;
    const n = e.parentNode;
    if (!n)
      break;
    e = n instanceof ShadowRoot ? n.host : n;
  }
  return !1;
}
class W extends q {
  constructor() {
    super(...arguments), this.preview = !1, this.editing = !1, this.errorMessage = null, this.cardLayer = null, this.mounted = !1, this.lastWeatherState = void 0, this.lastSunState = void 0;
  }
  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */
  setConfig(t) {
    try {
      this.config = se(t), this.errorMessage = null, this.resolvedWeatherEntity = this.config.weather_entity, this.lastWeatherState = void 0, this.lastSunState = void 0, this.dataset.mode = this.config.mode;
    } catch (e) {
      throw this.errorMessage = e instanceof Error ? e.message : String(e), e;
    }
    this.isConnected && this.syncLayer();
  }
  set hass(t) {
    if (this._hass = t, !t || !this.config)
      return;
    this.resolvedWeatherEntity || (this.resolvedWeatherEntity = vt(t));
    const e = this.resolvedWeatherEntity ? t.states[this.resolvedWeatherEntity] : void 0, i = this.config.sun_entity ? t.states[this.config.sun_entity] : void 0;
    e === this.lastWeatherState && i === this.lastSunState || (this.lastWeatherState = e, this.lastSunState = i, this.config.mode === "background" ? Q.updateHass(this, t) : this.cardLayer?.updateHass(t));
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
      type: `custom:${N}`,
      weather_entity: vt(t),
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
      this.isConnected && (this.editing = this.preview || Ui(this));
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
      this.destroyCardLayer(), this.mounted ? Q.update(this, t, this._hass) : (Q.acquire(this, t, this._hass), this.mounted = !0);
      return;
    }
    this.mounted && (Q.release(this), this.mounted = !1);
    const e = this.renderRoot?.querySelector(".surface");
    if (!e) {
      this.updateComplete.then(() => {
        this.isConnected && this.config?.mode === "card" && this.syncLayer();
      });
      return;
    }
    e.style.height = t.height, this.cardLayer ? (this.cardLayer.updateConfig(t), this.cardLayer.updateHass(this._hass)) : this.cardLayer = new pe(e, t, this._hass);
  }
  destroyCardLayer() {
    this.cardLayer?.destroy(), this.cardLayer = null;
  }
  teardownLayer() {
    this.destroyCardLayer(), this.mounted && (Q.release(this), this.mounted = !1);
  }
  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  render() {
    return this.errorMessage ? Z`<div class="error">Aurora Background: ${this.errorMessage}</div>` : this.config ? this.config.mode === "card" ? Z`<div class="surface"></div>` : this.editing ? Z`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${$t} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? "auto"}</span
            >
          </span>
        </div>
      ` : w : w;
  }
}
W.styles = Oi;
ut([
  Et({ type: Boolean })
], W.prototype, "preview", 2);
ut([
  lt()
], W.prototype, "config", 2);
ut([
  lt()
], W.prototype, "editing", 2);
ut([
  lt()
], W.prototype, "errorMessage", 2);
customElements.get(N) || customElements.define(N, W);
const te = window.customCards = window.customCards || [];
te.some((s) => s.type === N) || te.push({
  type: N,
  name: we,
  description: "Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.",
  preview: !1,
  documentationURL: "https://github.com/aurora-ui/aurora-background"
});
console.info(
  `%c AURORA BACKGROUND %c v${$t} `,
  "background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px",
  "background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px"
);
export {
  W as AuroraBackgroundCard,
  dt as AuroraBackgroundEditor
};
