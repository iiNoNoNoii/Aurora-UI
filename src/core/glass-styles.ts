import type { GlassConfig, RGB, SceneState } from './types';
import { colorDistanceSq, luminance, mixRgb, rgbToCss } from './color';
import { clamp01, lerp } from './math';

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
] as const;

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

  setProbe(element: HTMLElement | null): void {
    this.probe = element;
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

    // The surface is the sky's ambient colour pushed toward the near-black or
    // near-white end, so cards keep separating from the background at noon and
    // at midnight alike.
    const skyIsBright = luminance(scene.palette.middle) > 145;
    const surface = mixRgb(
      scene.palette.ambient,
      skyIsBright ? [14, 18, 27] : [226, 236, 252],
      0.7
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

    // A brighter sky needs a more opaque card to stay readable.
    const opacity = clamp01(glass.opacity * (skyIsBright ? 1.15 : 1));
    const surfaceCss = rgbToCss(surface, opacity);

    this.writtenSurface = surfaceCss;
    root.setProperty('--aurora-glass-surface', surfaceCss);
    root.setProperty('--ha-card-background', surfaceCss);
    // Some cards read `--card-background-color` directly instead.
    root.setProperty('--card-background-color', surfaceCss);

    root.setProperty(
      '--ha-card-backdrop-filter',
      glass.blur > 0 ? `blur(${glass.blur}px) saturate(${glass.saturate})` : 'none'
    );

    if (glass.border) {
      root.setProperty('--ha-card-border-width', '1px');
      root.setProperty(
        '--ha-card-border-color',
        rgbToCss(skyIsBright ? [255, 255, 255] : [255, 255, 255], skyIsBright ? 0.3 : 0.16)
      );
    } else {
      root.setProperty('--ha-card-border-width', '0px');
      root.setProperty('--ha-card-border-color', 'transparent');
    }

    const depth = `0 6px 24px rgba(0,0,0,${(0.18 + (skyIsBright ? 0.06 : 0.14)).toFixed(3)})`;
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

    // Opt-in, because it reaches beyond cards into dialogs and the sidebar.
    if (glass.adaptive_text) {
      const text: RGB = skyIsBright ? [16, 21, 31] : [240, 245, 255];
      root.setProperty('--primary-text-color', rgbToCss(text));
      root.setProperty(
        '--secondary-text-color',
        rgbToCss(mixRgb(text, surface, 0.35), lerp(0.75, 0.85, clamp01(glowStrength)))
      );
      this.textActive = true;
    } else if (this.textActive) {
      for (const name of TEXT_MANAGED) root.removeProperty(name);
      this.textActive = false;
    }
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
   */
  verify(): void {
    if (!this.active || !this.writtenSurface) return;

    const root = document.documentElement.style;
    if (normalise(root.getPropertyValue('--ha-card-background')) !== normalise(this.writtenSurface)) {
      // Someone rewrote the document properties. Force the next update through.
      this.lastOptions = '';
      this.lastSurface = null;
      return;
    }

    if (!this.probe) return;
    const seen = normalise(
      getComputedStyle(this.probe).getPropertyValue('--ha-card-background')
    );
    if (seen.length === 0 || seen === normalise(this.writtenSurface)) return;

    // Something closer to the cards is winning. Find it and write there too.
    const host = findInlineDeclarer(this.probe, '--ha-card-background');
    if (!host || host === this.scopeHost) return;

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
