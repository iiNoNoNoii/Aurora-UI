import type { AppearanceConfig, RGB, SkyPalette, WeatherProfile } from './types';
import { clamp01, lerp, smoothstep } from './math';
import { desaturate, hexToRgb, mixRgb, scaleBrightness, scaleSaturation } from './color';

/**
 * The sky is defined as a handful of key elevations and interpolated in
 * between. Because we interpolate on the *continuous* sun elevation, the
 * dawn/dusk transition is inherently smooth – there is no discrete
 * "day"/"night" switch anywhere in Aurora.
 */
interface PaletteStop {
  elevation: number;
  palette: SkyPalette;
}

function stop(elevation: number, hex: Record<keyof SkyPalette, string>): PaletteStop {
  return {
    elevation,
    palette: {
      zenith: hexToRgb(hex.zenith),
      upper: hexToRgb(hex.upper),
      middle: hexToRgb(hex.middle),
      lower: hexToRgb(hex.lower),
      horizon: hexToRgb(hex.horizon),
      sunCore: hexToRgb(hex.sunCore),
      sunGlow: hexToRgb(hex.sunGlow),
      ambient: hexToRgb(hex.ambient),
      cloud: hexToRgb(hex.cloud),
    },
  };
}

const STOPS: PaletteStop[] = [
  // Deep night – never pure black: OLED friendly but still "a sky".
  stop(-90, {
    zenith: '#020610',
    upper: '#040a1c',
    middle: '#07122e',
    lower: '#0a193c',
    horizon: '#0e2048',
    sunCore: '#0e2048',
    sunGlow: '#12264f',
    ambient: '#16294f',
    cloud: '#1b2a48',
  }),
  // Astronomical / nautical twilight.
  stop(-12, {
    zenith: '#03081a',
    upper: '#061029',
    middle: '#0e1e44',
    lower: '#1b2c58',
    horizon: '#2e3a6b',
    sunCore: '#4a4a80',
    sunGlow: '#3c3f74',
    ambient: '#2a3663',
    cloud: '#28365c',
  }),
  // Civil twilight – the "blue hour".
  stop(-6, {
    zenith: '#061026',
    upper: '#0d1c3f',
    middle: '#222f5e',
    lower: '#4a3a70',
    horizon: '#7d4573',
    sunCore: '#c96a6a',
    sunGlow: '#8f4a73',
    ambient: '#4d3c6a',
    cloud: '#4a3f66',
  }),
  // Sun just under the horizon – violet into rose.
  stop(-2, {
    zenith: '#0c1b3d',
    upper: '#1d2f5c',
    middle: '#4a3f78',
    lower: '#9c4f77',
    horizon: '#e07a5f',
    sunCore: '#ffd9a0',
    sunGlow: '#ff9d63',
    ambient: '#a4587a',
    cloud: '#8d5f7e',
  }),
  // Golden hour.
  stop(3, {
    zenith: '#123468',
    upper: '#2c568f',
    middle: '#6f7ba6',
    lower: '#d99a72',
    horizon: '#ffc182',
    sunCore: '#fff3cf',
    sunGlow: '#ffb267',
    ambient: '#e3a684',
    cloud: '#d8a58f',
  }),
  // Morning / late afternoon.
  stop(12, {
    zenith: '#1a4f9c',
    upper: '#3576bd',
    middle: '#79a6d6',
    lower: '#c3d9ee',
    horizon: '#e9dcc8',
    sunCore: '#fffbe8',
    sunGlow: '#ffe6b0',
    ambient: '#cfe0f2',
    cloud: '#f2f5fa',
  }),
  // Full day.
  stop(35, {
    zenith: '#0f5fc4',
    upper: '#2b86dd',
    middle: '#71bcef',
    lower: '#bcdcf7',
    horizon: '#e3f0fb',
    sunCore: '#ffffff',
    sunGlow: '#fff6d8',
    ambient: '#dcecfb',
    cloud: '#ffffff',
  }),
  // Overhead sun.
  stop(70, {
    zenith: '#0b57bd',
    upper: '#2382e0',
    middle: '#6cbcf2',
    lower: '#bfe2fa',
    horizon: '#eaf6ff',
    sunCore: '#ffffff',
    sunGlow: '#fffbe8',
    ambient: '#e6f3ff',
    cloud: '#ffffff',
  }),
];

const PALETTE_KEYS: (keyof SkyPalette)[] = [
  'zenith',
  'upper',
  'middle',
  'lower',
  'horizon',
  'sunCore',
  'sunGlow',
  'ambient',
  'cloud',
];

/** Sunrise leans pink/magenta, sunset leans amber/orange. */
const SUNRISE_TINT: RGB = [255, 118, 162];
const SUNSET_TINT: RGB = [255, 138, 56];

function mixPalette(a: SkyPalette, b: SkyPalette, t: number): SkyPalette {
  const out = {} as Record<keyof SkyPalette, RGB>;
  for (const key of PALETTE_KEYS) {
    out[key] = mixRgb(a[key], b[key], t);
  }
  return out as SkyPalette;
}

/** Raw sky colours for a given solar elevation, before weather and user tweaks. */
export function basePaletteForElevation(elevation: number): SkyPalette {
  if (elevation <= STOPS[0].elevation) return { ...STOPS[0].palette };
  const last = STOPS[STOPS.length - 1];
  if (elevation >= last.elevation) return { ...last.palette };

  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (elevation >= a.elevation && elevation <= b.elevation) {
      const t = smoothstep(a.elevation, b.elevation, elevation);
      return mixPalette(a.palette, b.palette, t);
    }
  }
  return { ...last.palette };
}

export interface DaylightFactors {
  dayFactor: number;
  nightFactor: number;
  twilightFactor: number;
}

export function daylightFactors(elevation: number): DaylightFactors {
  const dayFactor = smoothstep(-4, 8, elevation);
  const nightFactor = 1 - smoothstep(-14, -2, elevation);
  // Peaks around the horizon, gone by full day and by astronomical night.
  const twilightFactor = smoothstep(-16, -3, elevation) * (1 - smoothstep(0, 10, elevation));
  return { dayFactor, nightFactor, twilightFactor };
}

export interface PaletteOptions {
  elevation: number;
  rising: boolean;
  weather: WeatherProfile;
  appearance: AppearanceConfig;
}

/**
 * Final palette handed to the renderers: elevation gradient + sunrise/sunset
 * tint + weather modifiers + the user's appearance settings.
 */
export function computePalette(options: PaletteOptions): SkyPalette {
  const { elevation, rising, weather, appearance } = options;
  const base = basePaletteForElevation(elevation);
  const { twilightFactor } = daylightFactors(elevation);

  const tint = rising ? SUNRISE_TINT : SUNSET_TINT;
  const tintStrength = twilightFactor * 0.3;

  const out = {} as Record<keyof SkyPalette, RGB>;

  // Only the lower half of the sky picks up the sunrise/sunset colour cast.
  const tintWeights: Record<keyof SkyPalette, number> = {
    zenith: 0.02,
    upper: 0.08,
    middle: 0.22,
    lower: 0.5,
    horizon: 0.8,
    sunCore: 0.15,
    sunGlow: 0.55,
    ambient: 0.5,
    cloud: 0.45,
  };

  const grey = clamp01(weather.desaturation) * 0.8;
  const dark = 1 - clamp01(weather.skyDarkness) * 0.75;

  for (const key of PALETTE_KEYS) {
    let c = mixRgb(base[key], tint, tintStrength * tintWeights[key]);
    c = desaturate(c, grey);
    c = scaleBrightness(c, dark);
    c = scaleSaturation(c, appearance.saturation);
    c = scaleBrightness(c, appearance.brightness);
    out[key] = c;
  }

  // Clouds get their own darkening on top, so an overcast sky reads as heavy
  // without turning the whole gradient to mud.
  out.cloud = scaleBrightness(out.cloud, lerp(1, 0.32, clamp01(weather.cloudDarkness)));

  return out as SkyPalette;
}

/** Smoothly move `current` toward `target`; used to hide state-update jumps. */
export function dampPalette(
  current: SkyPalette,
  target: SkyPalette,
  halfLife: number,
  dt: number
): SkyPalette {
  const t = halfLife <= 0 ? 1 : 1 - Math.pow(2, -dt / halfLife);
  const out = {} as Record<keyof SkyPalette, RGB>;
  for (const key of PALETTE_KEYS) {
    out[key] = mixRgb(current[key], target[key], t);
  }
  return out as SkyPalette;
}
