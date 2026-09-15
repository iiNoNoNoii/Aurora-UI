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
  private lastWrite = 0;
  private active = false;
  private textActive = false;

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

    if (
      !force &&
      this.lastSurface &&
      this.lastAccent &&
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
    this.active = true;

    const root = document.documentElement.style;

    // A brighter sky needs a more opaque card to stay readable.
    const opacity = clamp01(glass.opacity * (skyIsBright ? 1.15 : 1));
    const surfaceCss = rgbToCss(surface, opacity);

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

  /** Hand every managed property back to the user's theme. */
  clear(): void {
    if (!this.active && !this.textActive) return;
    const root = document.documentElement.style;
    for (const name of MANAGED) root.removeProperty(name);
    if (this.textActive) {
      for (const name of TEXT_MANAGED) root.removeProperty(name);
      this.textActive = false;
    }
    this.active = false;
    this.lastSurface = null;
    this.lastAccent = null;
    this.lastGlow = -1;
  }
}
