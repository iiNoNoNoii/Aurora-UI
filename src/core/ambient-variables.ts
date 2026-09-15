import type { RGB, SceneState } from './types';
import { colorDistanceSq, luminance, mixRgb, rgbToCss } from './color';
import { clamp01 } from './math';

/**
 * Publishes the live sky as CSS custom properties on `<html>`.
 *
 * This is what "ambient weather lighting" means in practice: a theme or a card
 * can write `background: var(--aurora-card-tint)` and get a surface that drifts
 * with the sky, without knowing anything about Aurora's internals. Aurora Glass
 * (v0.4) is built entirely on top of these.
 *
 * Writing custom properties on the root element invalidates style for the whole
 * document, so this is throttled twice: at most a few times per second, and
 * only when a colour actually moved far enough to be visible.
 */

const MIN_INTERVAL_MS = 400;
/** ~4 per channel – below this nobody can see the difference. */
const COLOR_THRESHOLD = 4 * 4 * 3;

interface Published {
  ambient: RGB;
  sky: RGB;
  horizon: RGB;
  accent: RGB;
  glow: number;
  night: number;
}

const VARIABLES = [
  '--aurora-ambient-color',
  '--aurora-ambient-rgb',
  '--aurora-sky-color',
  '--aurora-horizon-color',
  '--aurora-accent-color',
  '--aurora-accent-rgb',
  '--aurora-glow-strength',
  '--aurora-night',
  '--aurora-day',
  '--aurora-contrast-color',
  '--aurora-card-tint',
  '--aurora-card-border',
  '--aurora-season',
  '--aurora-condition',
] as const;

export class AmbientVariables {
  private last: Published | null = null;
  private lastWrite = 0;
  private active = false;

  /** True while properties are on the document. */
  get isActive(): boolean {
    return this.active;
  }

  update(scene: SceneState, force = false): void {
    const now = performance.now();
    if (!force && now - this.lastWrite < MIN_INTERVAL_MS) return;

    const next: Published = {
      ambient: scene.palette.ambient,
      sky: scene.palette.middle,
      horizon: scene.palette.horizon,
      accent: scene.palette.sunGlow,
      glow: clamp01(scene.dayFactor * 0.6 + scene.twilightFactor * 0.8),
      night: clamp01(scene.nightFactor),
    };

    if (!force && this.last && !this.changed(this.last, next)) {
      this.lastWrite = now;
      return;
    }

    this.lastWrite = now;
    this.last = next;
    this.active = true;

    const root = document.documentElement.style;
    const rgbList = (c: RGB): string =>
      `${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}`;

    root.setProperty('--aurora-ambient-color', rgbToCss(next.ambient));
    root.setProperty('--aurora-ambient-rgb', rgbList(next.ambient));
    root.setProperty('--aurora-sky-color', rgbToCss(next.sky));
    root.setProperty('--aurora-horizon-color', rgbToCss(next.horizon));
    root.setProperty('--aurora-accent-color', rgbToCss(next.accent));
    root.setProperty('--aurora-accent-rgb', rgbList(next.accent));
    root.setProperty('--aurora-glow-strength', next.glow.toFixed(3));
    root.setProperty('--aurora-night', next.night.toFixed(3));
    root.setProperty('--aurora-day', (1 - next.night).toFixed(3));

    // Text colour that stays readable against the current sky.
    const bright = luminance(next.sky) > 140;
    root.setProperty('--aurora-contrast-color', bright ? '#10151f' : '#f2f6ff');

    // A ready-made glass surface: the sky, pulled toward black or white so it
    // still separates cards from the background.
    const tintBase = mixRgb(next.ambient, bright ? [12, 16, 24] : [235, 243, 255], 0.72);
    root.setProperty('--aurora-card-tint', rgbToCss(tintBase, bright ? 0.5 : 0.14));
    root.setProperty(
      '--aurora-card-border',
      rgbToCss(bright ? [255, 255, 255] : [255, 255, 255], bright ? 0.28 : 0.16)
    );

    root.setProperty('--aurora-season', scene.season.name);
    root.setProperty('--aurora-condition', scene.weather.condition);
  }

  private changed(a: Published, b: Published): boolean {
    return (
      colorDistanceSq(a.ambient, b.ambient) > COLOR_THRESHOLD ||
      colorDistanceSq(a.sky, b.sky) > COLOR_THRESHOLD ||
      colorDistanceSq(a.horizon, b.horizon) > COLOR_THRESHOLD ||
      colorDistanceSq(a.accent, b.accent) > COLOR_THRESHOLD ||
      Math.abs(a.glow - b.glow) > 0.02 ||
      Math.abs(a.night - b.night) > 0.02
    );
  }

  /** Remove every property again – called when the last Aurora card unmounts. */
  clear(): void {
    if (!this.active) return;
    const root = document.documentElement.style;
    for (const name of VARIABLES) root.removeProperty(name);
    this.active = false;
    this.last = null;
  }
}
