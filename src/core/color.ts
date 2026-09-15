import type { RGB } from './types';
import { clamp, lerp } from './math';

/** Parse `#rgb` / `#rrggbb` into an RGB tuple. Falls back to black. */
export function hexToRgb(hex: string): RGB {
  let h = hex.trim().replace('#', '');
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  if (h.length !== 6) return [0, 0, 0];
  const num = Number.parseInt(h, 16);
  if (Number.isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function rgbToCss(c: RGB, alpha = 1): string {
  const r = Math.round(clamp(c[0], 0, 255));
  const g = Math.round(clamp(c[1], 0, 255));
  const b = Math.round(clamp(c[2], 0, 255));
  if (alpha >= 1) return `rgb(${r},${g},${b})`;
  // Three decimals is well past what a display can show, and it keeps float
  // noise like 0.09497599999999999 out of the CSS we hand to the browser.
  return `rgba(${r},${g},${b},${clamp(alpha, 0, 1).toFixed(3)})`;
}

export function mixRgb(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Rec.709 luminance, 0..255. */
export function luminance(c: RGB): number {
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}

/** `amount` 0 keeps the colour, 1 turns it fully grey. */
export function desaturate(c: RGB, amount: number): RGB {
  const l = luminance(c);
  return mixRgb(c, [l, l, l], clamp(amount, 0, 1));
}

/** `factor` 1 = unchanged, <1 darker, >1 brighter (saturating at 255). */
export function scaleBrightness(c: RGB, factor: number): RGB {
  return [clamp(c[0] * factor, 0, 255), clamp(c[1] * factor, 0, 255), clamp(c[2] * factor, 0, 255)];
}

/** Push colour away from (or toward) grey. `factor` 1 = unchanged. */
export function scaleSaturation(c: RGB, factor: number): RGB {
  const l = luminance(c);
  return [
    clamp(l + (c[0] - l) * factor, 0, 255),
    clamp(l + (c[1] - l) * factor, 0, 255),
    clamp(l + (c[2] - l) * factor, 0, 255),
  ];
}

/** Squared distance – cheap "did this colour change enough to re-tint sprites?" test. */
export function colorDistanceSq(a: RGB, b: RGB): number {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}
