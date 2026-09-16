import type { GlassConfig, RGB, SceneState } from './types';
import { colorDistanceSq, hexToRgb, luminance, mixRgb, rgbToCss } from './color';
import { clamp01 } from './math';

/**
 * Aurora Glass.
 *
 * Turns every Lovelace card into a translucent surface that picks up the
 * current sky, using nothing but Home Assistant's documented `--ha-card-*`
 * theme variables:
 *
 *   --ha-card-background        the surface itself
 *   --ha-card-backdrop-filter   the blur behind it
 *   --ha-card-border-color      / --ha-card-border-width
 *   --ha-card-box-shadow        used here for the ambient glow
 *   --ha-card-border-radius
 *
 * Because these are plain custom properties on `<html>`, they inherit into
 * every shadow root without Aurora touching a single internal element, and a
 * user who turns Glass off gets their theme back untouched.
 *
 * Like the ambient properties, writes are throttled and skipped when nothing
 * moved: restyling every card in a dashboard 60 times a second would undo all
 * the work the renderer does to stay cheap.
 */

const MIN_INTERVAL_MS = 500;
const COLOR_THRESHOLD = 5 * 5 * 3;

const MANAGED = [
  '--ha-card-background',
  '--card-background-color',
  '--ha-card-backdrop-filter',
  '--ha-card-border-color',
  '--ha-card-border-width',
  '--ha-card-box-shadow',
  '--ha-card-border-radius',
  '--aurora-glass-surface',
  '--mdc-theme-surface',
] as const;

/**
 * `--card-background-color` is not card-specific. Home Assistant's own base
 * styles commonly alias the Material `--mdc-theme-surface` token to it, and
 * every Material dialog and dropdown menu — the more-info dialog, this card's
 * own edit dialog, the three-dot overflow menu — takes its surface from that
 * token. Handing it the same near-transparent value as `--ha-card-background`
 * made every one of those overlays unreadable: the dashboard behind them
 * showed straight through. Overlays get a solid variant of the same colour
 * instead, at this opacity — still on-brand, never see-through. A modal
 * surface has no business being glass in the first place.
 */
const OVERLAY_OPACITY = 0.96;

const TEXT_MANAGED = ['--primary-text-color', '--secondary-text-color'] as const;

export class GlassStyles {
  private lastSurface: RGB | null = null;
  private lastAccent: RGB | null = null;
  private lastGlow = -1;
  /**
   * The options themselves are part of the gate, not just the colours.
   * Without this, switching preset from `frosted` to `minimal` changed only
   * blur and opacity — the sky colour was identical, so the gate short-circuited
   * and the new preset never reached the document.
   */
  private lastOptions = '';
  private lastWrite = 0;
  private active = false;
  private textActive = false;

  /** The surface value we last wrote, for the verification pass. */
  private writtenSurface = '';
  /**
   * An element inside the Lovelace view — the Aurora card itself. Used to see
   * what the cards in that view *actually* resolve, which is not necessarily
   * what we wrote on the document.
   */
  private probe: HTMLElement | null = null;
  /**
   * The element that was shadowing us, once found.
   *
   * A theme applied to a Lovelace *view* lands on the view element, which sits
   * between `<html>` and every card in it — closer wins, and no `!important`
   * changes that, because the cascade only arbitrates between declarations on
   * the same element. So Aurora stops arguing from the document and writes
   * there as well. The element is located by walking up from Aurora's own card
   * until we find whoever declares the property inline; no tag names, no
   * assumptions about the frontend's structure.
   */
  private scopeHost: HTMLElement | null = null;
  /**
   * What the scope host declared before Aurora wrote over it. Escalating means
   * overwriting part of the user's own theme; `clear()` has to put it back
   * rather than leave the view with nothing.
   */
  private scopeHostOriginal = new Map<string, string>();
  private warned = false;

  /** `hass.themes.darkMode`, used only when the text colour cannot be read. */
  private darkModeHint: boolean | undefined;

  setProbe(element: HTMLElement | null): void {
    this.probe = element;
  }

  setDarkModeHint(value: boolean | undefined): void {
    this.darkModeHint = value;
  }

  /**
   * Is the surrounding theme dark?
   *
   * Read from the theme's own primary text colour rather than from
   * `hass.themes.darkMode`, because a custom theme can be dark while Home
   * Assistant still reports light mode — and it is the text Aurora has to stay
   * readable against. Light text means a dark theme.
   */
  private isDarkTheme(): boolean {
    const element = this.probe ?? document.documentElement;
    const declared = getComputedStyle(element).getPropertyValue('--primary-text-color');
    const parsed = parseCssColor(declared);
    if (parsed) return luminance(parsed) > 128;
    if (typeof this.darkModeHint === 'boolean') return this.darkModeHint;
    return true;
  }

  /** `document` normally; `view` once Aurora had to escalate to beat a theme. */
  get scope(): 'document' | 'view' {
    return this.scopeHost ? 'view' : 'document';
  }

  update(scene: SceneState, glass: GlassConfig, force = false): void {
    if (!glass.enabled) {
      this.clear();
      return;
    }

    const now = performance.now();
    if (!force && now - this.lastWrite < MIN_INTERVAL_MS) return;

    // The surface follows the THEME's polarity, not the sky's.
    //
    // Inverting against the sky — a light card over a dark sky — was the
    // original design, on contrast grounds. It looks milky: a pale panel at any
    // useful opacity hides the thing it is supposed to be floating over, and
    // that is the whole point of the effect. Every dark interface that does
    // this well uses a *dark* translucent surface with a light hairline; the
    // contrast comes from the border and the text, not from flipping the panel.
    const darkTheme = this.isDarkTheme();
    const surface = mixRgb(
      scene.palette.ambient,
      darkTheme ? [10, 13, 20] : [240, 245, 252],
      0.78
    );
    const accent = scene.palette.sunGlow;
    const glowStrength =
      clamp01(scene.dayFactor * 0.5 + scene.twilightFactor * 0.9 + scene.nightFactor * 0.25) *
      glass.glow;

    const options = [
      glass.blur,
      glass.opacity,
      glass.saturate,
      glass.glow,
      glass.radius,
      glass.border,
      glass.adaptive_text,
      glass.contrast,
    ].join('|');

    if (
      !force &&
      this.lastSurface &&
      this.lastAccent &&
      options === this.lastOptions &&
      colorDistanceSq(this.lastSurface, surface) < COLOR_THRESHOLD &&
      colorDistanceSq(this.lastAccent, accent) < COLOR_THRESHOLD &&
      Math.abs(this.lastGlow - glowStrength) < 0.03
    ) {
      this.lastWrite = now;
      return;
    }

    this.lastWrite = now;
    this.lastSurface = surface;
    this.lastAccent = accent;
    this.lastGlow = glowStrength;
    this.lastOptions = options;
    this.active = true;

    const root = this.targets();

    // Opacity is *solved for*, not guessed.
    //
    // A translucent card over a bright midday sky composites to a mid-tone, and
    // mid-tone is where text of either polarity loses. Measured on a noon sky,
    // a fixed opacity gave 3.3:1 for the primary text and 2.6:1 for the
    // secondary — both under the 4.5:1 that WCAG AA asks for normal text, and
    // exactly the "hard to read" that gets reported.
    //
    // So Aurora composites the surface over the sky behind it, composites the
    // text over that, and raises the opacity until the *secondary* text — the
    // faintest thing on the card, and the one carrying every reading — clears
    // the contrast target. On a dark night sky the configured value already
    // passes and nothing is added.
    const behind = brighterOf(scene.palette.middle, scene.palette.lower);
    const textColour: RGB = darkTheme ? [244, 248, 255] : [14, 19, 28];
    const secondaryAlpha = darkTheme ? 0.78 : 0.72;
    const opacity = solveOpacity(
      glass.opacity,
      surface,
      behind,
      textColour,
      secondaryAlpha,
      glass.contrast
    );
    const surfaceCss = rgbToCss(surface, opacity);

    this.writtenSurface = surfaceCss;
    root.setProperty('--aurora-glass-surface', surfaceCss);
    root.setProperty('--ha-card-background', surfaceCss);

    // See OVERLAY_OPACITY: --card-background-color feeds dialogs and menus as
    // well as cards, so it gets a solid surface rather than the glass one.
    const overlaySurface = rgbToCss(surface, OVERLAY_OPACITY);
    root.setProperty('--card-background-color', overlaySurface);
    // Written to the document only, never scoped to a view: a dialog is not
    // necessarily a descendant of whichever view Aurora escalated to, since
    // Home Assistant renders dialogs high in the DOM rather than inside it.
    document.documentElement.style.setProperty(
      '--mdc-theme-surface',
      overlaySurface,
      'important'
    );

    root.setProperty(
      '--ha-card-backdrop-filter',
      glass.blur > 0 ? `blur(${glass.blur}px) saturate(${glass.saturate})` : 'none'
    );

    if (glass.border) {
      root.setProperty('--ha-card-border-width', '1px');
      // On a dark surface the hairline is what separates the card from the sky,
      // so it carries more weight than it does on a light one.
      root.setProperty(
        '--ha-card-border-color',
        rgbToCss(darkTheme ? [255, 255, 255] : [20, 26, 38], darkTheme ? 0.16 : 0.12)
      );
    } else {
      root.setProperty('--ha-card-border-width', '0px');
      root.setProperty('--ha-card-border-color', 'transparent');
    }

    // A dark card needs a deeper drop shadow to lift off the sky than a light
    // one does.
    const depth = `0 6px 24px rgba(0,0,0,${(darkTheme ? 0.3 : 0.18).toFixed(3)})`;
    const glow =
      glowStrength > 0.01
        ? `, 0 0 36px ${rgbToCss(accent, clamp01(glowStrength * 0.16))}`
        : '';
    root.setProperty('--ha-card-box-shadow', depth + glow);

    if (glass.radius >= 0) {
      root.setProperty('--ha-card-border-radius', `${glass.radius}px`);
    } else {
      root.removeProperty('--ha-card-border-radius');
    }

    // Text.
    //
    // A theme picks its text colours against its own solid cards. Once the card
    // is translucent and a sky is showing through, the secondary colour in
    // particular — the one carrying every temperature and "in 6 days" — often
    // no longer has the contrast it was chosen for. So Aurora keeps the theme's
    // polarity and raises the contrast rather than inventing a colour.
    if (glass.adaptive_text) {
      const text: RGB = darkTheme ? [244, 248, 255] : [14, 19, 28];
      const textTarget = this.textTargets();
      textTarget.setProperty('--primary-text-color', rgbToCss(text));
      // Deliberately strong: a dim secondary is the single most common
      // readability complaint on a glass card.
      textTarget.setProperty('--secondary-text-color', rgbToCss(text, darkTheme ? 0.78 : 0.72));
      this.textActive = true;
    } else if (this.textActive) {
      for (const name of TEXT_MANAGED) this.textTargets().removeProperty(name);
      this.textActive = false;
    }
  }

  /**
   * Where the text colours go.
   *
   * Preferably only the element Aurora escalated to — normally the Lovelace
   * view — because `--primary-text-color` reaches beyond cards into dialogs and
   * the sidebar, and there is no card-scoped equivalent. Scoping it to the view
   * keeps the rest of Home Assistant on the user's own theme. Without a scope
   * host there is nowhere narrower than the document to write.
   */
  private textTargets(): CSSStyleDeclaration {
    return this.scopeHost ? this.scopeHost.style : document.documentElement.style;
  }

  /**
   * Every place the properties have to be written.
   *
   * Normally just `<html>`. When a view theme was found shadowing us, the view
   * element joins the list — writing to both keeps cards outside that view
   * styled too.
   */
  private targets(): CSSStyleDeclaration & { setProperty(name: string, value: string): void } {
    const hosts: CSSStyleDeclaration[] = [document.documentElement.style];
    if (this.scopeHost) hosts.push(this.scopeHost.style);

    // A tiny façade so the write path below stays a straight list of
    // setProperty calls rather than a loop around every line.
    return {
      setProperty(name: string, value: string): void {
        for (const host of hosts) host.setProperty(name, value);
      },
      removeProperty(name: string): string {
        for (const host of hosts) host.removeProperty(name);
        return '';
      },
    } as CSSStyleDeclaration;
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
  verify(): boolean {
    if (!this.active || !this.writtenSurface) return false;

    const root = document.documentElement.style;
    if (normalise(root.getPropertyValue('--ha-card-background')) !== normalise(this.writtenSurface)) {
      // Someone rewrote the document properties. Force the next update through.
      this.lastOptions = '';
      this.lastSurface = null;
      return true;
    }

    if (!this.probe) return false;
    const seen = normalise(
      getComputedStyle(this.probe).getPropertyValue('--ha-card-background')
    );
    if (seen.length === 0 || seen === normalise(this.writtenSurface)) return false;

    // Something closer to the cards is winning. Find it and write there too.
    const host = findInlineDeclarer(this.probe, '--ha-card-background');
    if (!host || host === this.scopeHost) return false;

    this.scopeHost = host;
    // Remember the theme's own values before overwriting them.
    this.scopeHostOriginal.clear();
    for (const name of [...MANAGED, ...TEXT_MANAGED]) {
      const existing = host.style.getPropertyValue(name);
      if (existing.length > 0) this.scopeHostOriginal.set(name, existing);
    }

    // Force the next update through: our own inputs did not change, only where
    // they need to land.
    this.lastOptions = '';
    this.lastSurface = null;

    if (!this.warned) {
      this.warned = true;
      // Worth a console line: the symptom is "Aurora Glass does nothing", and
      // nobody would guess the view's own theme is the reason.
      console.info(
        '[Aurora UI] A theme on this view was overriding Aurora Glass — a view ' +
          'theme is applied closer to the cards than the document is. Aurora is ' +
          'now writing to that element as well. Set glass.enabled to false, or ' +
          'the preset to "plain", to hand the cards back to your theme.'
      );
    }

    return true;
  }

  /** Hand every managed property back to the user's theme. */
  clear(): void {
    if (!this.active && !this.textActive) return;
    const root = this.targets();
    for (const name of MANAGED) root.removeProperty(name);
    if (this.textActive) {
      for (const name of TEXT_MANAGED) root.removeProperty(name);
      this.textActive = false;
    }
    // Escalating overwrote part of the user's own theme on the view element.
    // Removing the property would leave the view with nothing until Home
    // Assistant happened to re-apply; put the original declarations back.
    if (this.scopeHost) {
      for (const [name, value] of this.scopeHostOriginal) {
        this.scopeHost.style.setProperty(name, value);
      }
      this.scopeHostOriginal.clear();
    }

    this.active = false;
    this.lastSurface = null;
    this.lastAccent = null;
    this.lastGlow = -1;
    this.lastOptions = '';
    this.writtenSurface = '';
    this.scopeHost = null;
  }
}

/** Custom-property values keep their source whitespace; compare without it. */
function normalise(value: string): string {
  return value.replace(/\s+/g, '').trim();
}

function brighterOf(a: RGB, b: RGB): RGB {
  return luminance(a) >= luminance(b) ? a : b;
}

/** WCAG relative luminance, 0..1, from sRGB 0..255. */
function relativeLuminance(c: RGB): number {
  const channel = (v: number): number => {
    const s = clamp01(v / 255);
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(c[0]) + 0.7152 * channel(c[1]) + 0.0722 * channel(c[2]);
}

function contrastRatio(a: RGB, b: RGB): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Never fully opaque: past this it has stopped being glass. */
const MAX_SOLVED_OPACITY = 0.94;

/**
 * The lowest opacity at or above `wanted` that still clears `target` contrast
 * between the card and the secondary text on it.
 *
 * Compositing happens in sRGB (that is what the browser does) while contrast is
 * defined on linearised luminance, so there is no tidy closed form. A dozen
 * bisection steps cost nothing at a few writes per second and are exact to
 * well under one part in a thousand.
 */
function solveOpacity(
  wanted: number,
  surface: RGB,
  behind: RGB,
  text: RGB,
  textAlpha: number,
  target: number
): number {
  if (target <= 0) return clamp01(wanted);

  const passes = (alpha: number): boolean => {
    const card = mixRgb(behind, surface, alpha);
    const secondary = mixRgb(card, text, textAlpha);
    return contrastRatio(secondary, card) >= target;
  };

  let lo = clamp01(wanted);
  if (passes(lo)) return lo;

  let hi = MAX_SOLVED_OPACITY;
  // Even a nearly solid card cannot always reach the target; take the best.
  if (!passes(hi)) return hi;

  for (let i = 0; i < 14; i++) {
    const mid = (lo + hi) / 2;
    if (passes(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
}

/**
 * Resolve any CSS colour — hex, `rgb()`, `hsl()`, a named colour — to RGB.
 *
 * A 2D context normalises whatever it is handed into `#rrggbb` or
 * `rgba(...)`, and rejects anything invalid by leaving the previous value in
 * place. That makes it a complete, spec-accurate parser for free.
 */
let colorProbeCtx: CanvasRenderingContext2D | null | undefined;

function parseCssColor(value: string): RGB | null {
  const text = value.trim();
  if (!text) return null;

  if (colorProbeCtx === undefined) {
    colorProbeCtx = document.createElement('canvas').getContext('2d');
  }
  const ctx = colorProbeCtx;
  if (!ctx) return null;

  // A known-good sentinel: if the assignment is rejected, this survives and we
  // can tell the difference between "parsed to black" and "not a colour".
  ctx.fillStyle = '#000000';
  ctx.fillStyle = text;
  const first = ctx.fillStyle;
  ctx.fillStyle = '#ffffff';
  ctx.fillStyle = text;
  if (first !== ctx.fillStyle) return null;

  const resolved = String(first);
  if (resolved.startsWith('#')) return hexToRgb(resolved);

  const match = resolved.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(',').map((p) => Number.parseFloat(p));
  if (parts.length < 3 || parts.some((n) => !Number.isFinite(n))) return null;
  return [parts[0], parts[1], parts[2]];
}

/**
 * Nearest ancestor of `start` that declares `property` in its own inline style,
 * crossing shadow boundaries on the way up.
 *
 * Deliberately generic: it finds whoever is actually shadowing us rather than
 * looking for `hui-view` by name, so it keeps working when the frontend
 * restructures — and it finds nothing when nothing is in the way.
 */
function findInlineDeclarer(start: HTMLElement, property: string): HTMLElement | null {
  let node: Node | null = start;
  for (let depth = 0; depth < 40 && node; depth++) {
    if (
      node instanceof HTMLElement &&
      node !== document.documentElement &&
      node.style.getPropertyValue(property).trim().length > 0
    ) {
      return node;
    }
    const parent: Node | null = node.parentNode;
    node = parent instanceof ShadowRoot ? parent.host : parent;
  }
  return null;
}
