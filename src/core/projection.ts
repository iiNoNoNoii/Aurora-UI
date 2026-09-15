import { clamp, clamp01 } from './math';

/**
 * The one projection every celestial object in Aurora shares.
 *
 * A dashboard background is wide and short, so the sky is drawn as a panorama:
 * 240° of azimuth across the width, centred on due south. That is a lot of sky
 * in a little space, but the sun has to stay on screen from an easterly
 * midsummer sunrise to a westerly midsummer sunset.
 *
 * Vertically the curve is steep near the horizon and flattens toward the
 * zenith, so a sunrise puts the disc just above the bottom edge rather than
 * below it. The two scales work out to roughly 6 px per degree horizontally
 * against 9 px per degree vertically on a typical dashboard — about 1.5×
 * anisotropy, which stretches constellations slightly but keeps them
 * recognisable.
 *
 * Everything goes through here so that the moon really does sit among the
 * stars, and the stars really do turn around the pole together with it.
 */

/** Azimuth in degrees at the left edge of the view. */
const AZIMUTH_START = 60;
/** Degrees of azimuth spanned by the full width. */
const AZIMUTH_SPAN = 240;

export interface ProjectedPoint {
  /**
   * Across the width. NOT clamped: an object outside the drawn azimuth range
   * returns a value below 0 or above 1, so callers can cull it. Clamping here
   * would pile every out-of-range star onto the screen edge.
   */
  x: number;
  /** 0..1 down the height; above 1 means below the horizon. */
  y: number;
  /** False when the object is outside the drawn azimuth range. */
  inView: boolean;
}

export function projectAltAz(altitude: number, azimuth: number): ProjectedPoint {
  const x = (azimuth - AZIMUTH_START) / AZIMUTH_SPAN;

  // The ceiling is the zenith, not 60°. Capping lower flattened everything
  // overhead onto a single line — Vega, Deneb and Delta Cygni all landed on
  // exactly the same y.
  const y =
    altitude >= 0
      ? 0.94 - Math.pow(clamp01(altitude / 90), 0.7) * 0.84
      : clamp(0.94 + (-altitude / 20) * 0.18, 0.94, 1.2);

  return { x, y, inView: x >= -0.05 && x <= 1.05 };
}

/** Clamped horizontal position, for objects that should stay on screen. */
export function clampProjectedX(point: ProjectedPoint): number {
  return clamp01(point.x);
}
