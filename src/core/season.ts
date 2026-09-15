import type { RGB, SeasonName, SeasonProfile } from './types';
import { TAU, clamp01 } from './math';

/**
 * Seasonal character of the sky.
 *
 * This is deliberately a *whisper*, not a filter: a July sky is a little warmer
 * and hazier than a January one, and October carries some amber. Anything
 * stronger fights the sun-elevation model, which is what actually carries the
 * scene.
 *
 * Everything is continuous. The four seasons are blended with cosine lobes
 * around their solstice/equinox centres, so 20 March looks like 21 March.
 */

interface SeasonTraits {
  /** Angle of the season's centre on the yearly circle. */
  centre: number;
  tint: RGB;
  /** Extra horizon haze, added to the weather's own fog value. */
  haze: number;
  /** Multiplier on colour saturation. */
  saturation: number;
}

/**
 * The yearly angle is measured from the northern summer solstice, so
 * 0 = midsummer, π/2 = autumn equinox, π = midwinter, 3π/2 = spring equinox.
 */
const TRAITS: Record<SeasonName, SeasonTraits> = {
  summer: { centre: 0, tint: [255, 214, 150], haze: 0.16, saturation: 1.06 },
  autumn: { centre: Math.PI / 2, tint: [255, 176, 96], haze: 0.12, saturation: 1.02 },
  winter: { centre: Math.PI, tint: [204, 224, 255], haze: 0.04, saturation: 0.92 },
  spring: { centre: (3 * Math.PI) / 2, tint: [208, 240, 228], haze: 0.07, saturation: 1.0 },
};

const NAMES: SeasonName[] = ['summer', 'autumn', 'winter', 'spring'];

/** Day of the year, 1..366. */
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

/**
 * `latitude` decides the hemisphere: south of the equator the whole year is
 * shifted by half a turn, so December is midsummer.
 */
export function computeSeason(date: Date, latitude: number): SeasonProfile {
  // 21 June is day 172 in a common year – close enough for a colour tint.
  const theta = ((dayOfYear(date) - 172) / 365.25) * TAU;
  const angle = latitude < 0 ? theta + Math.PI : theta;

  let total = 0;
  const weights: Record<SeasonName, number> = { summer: 0, autumn: 0, winter: 0, spring: 0 };

  for (const name of NAMES) {
    // A squared cosine lobe: 1 at the centre, 0 a quarter-turn away.
    const lobe = Math.max(0, Math.cos(angle - TRAITS[name].centre));
    const weight = lobe * lobe;
    weights[name] = weight;
    total += weight;
  }

  if (total <= 0) total = 1;

  let r = 0;
  let g = 0;
  let b = 0;
  let haze = 0;
  let saturation = 0;
  let dominant: SeasonName = 'summer';
  let best = -1;

  for (const name of NAMES) {
    const weight = weights[name] / total;
    const traits = TRAITS[name];
    r += traits.tint[0] * weight;
    g += traits.tint[1] * weight;
    b += traits.tint[2] * weight;
    haze += traits.haze * weight;
    saturation += traits.saturation * weight;
    if (weight > best) {
      best = weight;
      dominant = name;
    }
  }

  return {
    name: dominant,
    /** −1 at midwinter, +1 at midsummer. */
    warmth: Math.cos(angle),
    tint: [r, g, b],
    haze: clamp01(haze),
    saturation,
  };
}
