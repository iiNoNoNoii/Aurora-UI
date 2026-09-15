/**
 * Surface presets — the single definition of what "glass" or "frosted" mean.
 *
 * Aurora Glass (the whole dashboard) and Aurora Style (one wrapped card) share
 * this table, so `style: frosted` on a card and `preset: frosted` on the
 * dashboard produce exactly the same surface. Adding a preset here adds it to
 * both at once.
 */

export type SurfacePreset = 'glass' | 'frosted' | 'tinted' | 'outline' | 'minimal' | 'plain';

export interface SurfaceOptions {
  /** Backdrop blur in px behind the card. 0 disables the blur. */
  blur: number;
  /** Card surface opacity, 0..1. */
  opacity: number;
  /** Backdrop saturation, 1 = unchanged. */
  saturate: number;
  /** Ambient glow around cards, 0..2. */
  glow: number;
  /** Corner radius in px; negative keeps the theme's own value. */
  radius: number;
  border: boolean;
}

export const SURFACE_PRESET_NAMES: SurfacePreset[] = [
  'glass',
  'frosted',
  'tinted',
  'outline',
  'minimal',
  'plain',
];

export const SURFACE_PRESETS: Record<SurfacePreset, SurfaceOptions> = {
  /** Translucent and blurred – the Aurora default. */
  glass: { blur: 14, opacity: 0.45, saturate: 1.4, glow: 0.8, radius: 18, border: true },
  /** Heavier blur, more opaque. Easier to read over a busy or bright sky. */
  frosted: { blur: 26, opacity: 0.72, saturate: 1.15, glow: 0.3, radius: 20, border: true },
  /** Solid, but still takes the sky's colour. No blur cost. */
  tinted: { blur: 0, opacity: 0.88, saturate: 1, glow: 0.5, radius: 16, border: false },
  /** Almost no surface: a hairline and a whisper of blur. */
  outline: { blur: 6, opacity: 0.1, saturate: 1.1, glow: 0.25, radius: 16, border: true },
  /** Flat, borderless, no glow. Quiet. */
  minimal: { blur: 10, opacity: 0.55, saturate: 1, glow: 0, radius: 14, border: false },
  /** Hand everything back to the user's theme. */
  plain: { blur: 0, opacity: 1, saturate: 1, glow: 0, radius: -1, border: true },
};

/**
 * Accepts a preset name in any casing, and the German names too — a preset is
 * most useful when it can be driven from an `input_select`, and people name
 * those in their own language.
 */
const ALIASES: Record<string, SurfacePreset> = {
  glass: 'glass',
  glas: 'glass',
  frosted: 'frosted',
  frost: 'frosted',
  milchglas: 'frosted',
  tinted: 'tinted',
  tint: 'tinted',
  getoent: 'tinted',
  outline: 'outline',
  umriss: 'outline',
  minimal: 'minimal',
  schlicht: 'minimal',
  plain: 'plain',
  none: 'plain',
  off: 'plain',
  aus: 'plain',
  standard: 'plain',
};

export function normalizePresetName(value: unknown): SurfacePreset | null {
  if (typeof value !== 'string') return null;
  const key = value
    .trim()
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss');
  return ALIASES[key] ?? null;
}
