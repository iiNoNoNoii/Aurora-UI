/**
 * Lightweight astronomy.
 *
 * Home Assistant's `sun.sun` already gives us elevation + azimuth, so this is
 * only the fallback for setups without the `sun` integration (and the source of
 * the moon phase, which `sun.sun` does not provide).
 *
 * Accuracy is roughly ±0.5° for the sun and "good enough to look right" for the
 * moon – no ephemeris tables, no network access.
 */

import { TAU, toDegrees, toRadians, wrap } from './math';

export interface SunPosition {
  /** Degrees above the horizon (negative = below). */
  elevation: number;
  /** Degrees, 0 = north, 90 = east, 180 = south. */
  azimuth: number;
  /** True while the sun is climbing. */
  rising: boolean;
}

/** Days since the J2000.0 epoch. */
function julianDays(date: Date): number {
  return date.getTime() / 86400000 - 10957.5;
}

/**
 * NOAA "low accuracy" solar position algorithm.
 */
export function computeSunPosition(date: Date, latitude: number, longitude: number): SunPosition {
  const d = julianDays(date);

  // Mean anomaly and ecliptic longitude of the sun.
  const meanAnomaly = toRadians(357.5291 + 0.98560028 * d);
  const eclipticLongitude =
    toRadians(280.459 + 0.98564736 * d) +
    toRadians(1.9148) * Math.sin(meanAnomaly) +
    toRadians(0.02) * Math.sin(2 * meanAnomaly);

  const obliquity = toRadians(23.4393 - 3.563e-7 * d);

  const declination = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLongitude));
  const rightAscension = Math.atan2(
    Math.cos(obliquity) * Math.sin(eclipticLongitude),
    Math.cos(eclipticLongitude)
  );

  // Greenwich mean sidereal time -> local hour angle.
  const gmst = toRadians(280.16 + 360.9856235 * d);
  const hourAngle = gmst + toRadians(longitude) - rightAscension;

  const lat = toRadians(latitude);
  const sinElevation =
    Math.sin(lat) * Math.sin(declination) +
    Math.cos(lat) * Math.cos(declination) * Math.cos(hourAngle);
  const elevation = Math.asin(Math.max(-1, Math.min(1, sinElevation)));

  const azimuth = Math.atan2(
    Math.sin(hourAngle),
    Math.cos(hourAngle) * Math.sin(lat) - Math.tan(declination) * Math.cos(lat)
  );

  // Ten minutes later tells us whether we are before or after solar noon.
  const laterHourAngle = hourAngle + toRadians(360.9856235 * (10 / 1440));
  const laterSin =
    Math.sin(lat) * Math.sin(declination) +
    Math.cos(lat) * Math.cos(declination) * Math.cos(laterHourAngle);

  return {
    elevation: toDegrees(elevation),
    azimuth: wrap(toDegrees(azimuth) + 180, 360),
    rising: laterSin > sinElevation,
  };
}

/**
 * Moon phase as a 0..1 fraction of the synodic month.
 * 0 = new moon, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter.
 */
export function computeMoonPhase(date: Date): number {
  const synodicMonth = 29.530588853;
  // 2000-01-06 18:14 UTC was a new moon.
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14) / 86400000;
  const days = date.getTime() / 86400000 - knownNewMoon;
  return wrap(days / synodicMonth, 1);
}

/**
 * Very small moon-position model: the moon trails the sun by exactly one phase
 * of the synodic cycle. That is not astronomically exact, but it reproduces the
 * behaviour people actually notice – a full moon rises at sunset and sits high
 * at midnight, a waxing crescent hangs in the western evening sky.
 */
export function computeMoonPosition(
  date: Date,
  latitude: number,
  phase: number
): { altitude: number; azimuthFraction: number } {
  const hours = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  // Sun hour angle: 0 at local noon, ±π at midnight.
  const sunAngle = ((hours - 12) / 24) * TAU;
  const moonAngle = sunAngle - phase * TAU;

  // Seasonal-ish maximum altitude, kept in a plausible range for any latitude.
  const maxAltitude = 70 - Math.min(55, Math.abs(latitude) * 0.55);
  const altitude = Math.cos(moonAngle) * maxAltitude;

  // -1 (east) .. +1 (west) -> 0..1 across the screen.
  const azimuthFraction = (Math.sin(moonAngle) + 1) / 2;

  return { altitude, azimuthFraction };
}
