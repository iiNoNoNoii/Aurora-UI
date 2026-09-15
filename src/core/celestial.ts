import { toDegrees, toRadians, wrap } from './math';

/**
 * Equatorial → horizontal coordinates.
 *
 * Same conventions as `solar.ts`: azimuth 0 = north, 90 = east, and altitude in
 * degrees above the horizon. Precession is ignored — J2000 positions are off by
 * roughly a third of a degree by 2026, which is a fraction of a star's drawn
 * size.
 */

export interface HorizontalPosition {
  altitude: number;
  azimuth: number;
}

/** Julian date from a JS Date. */
export function julianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

/** Greenwich mean sidereal time, in degrees. */
export function greenwichMeanSiderealTime(date: Date): number {
  const d = julianDate(date) - 2451545.0;
  return wrap(280.46061837 + 360.98564736629 * d, 360);
}

/**
 * `rightAscension` in hours, everything else in degrees.
 * `longitude` is positive east, as Home Assistant reports it.
 */
export function equatorialToHorizontal(
  rightAscension: number,
  declination: number,
  latitude: number,
  longitude: number,
  date: Date
): HorizontalPosition {
  const localSiderealTime = greenwichMeanSiderealTime(date) + longitude;
  const hourAngle = toRadians(wrap(localSiderealTime - rightAscension * 15, 360));

  const dec = toRadians(declination);
  const lat = toRadians(latitude);

  const sinAltitude =
    Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(hourAngle);
  const altitude = Math.asin(Math.max(-1, Math.min(1, sinAltitude)));

  const azimuth = Math.atan2(
    Math.sin(hourAngle),
    Math.cos(hourAngle) * Math.sin(lat) - Math.tan(dec) * Math.cos(lat)
  );

  return {
    altitude: toDegrees(altitude),
    // atan2 above measures from south, increasing westward.
    azimuth: wrap(toDegrees(azimuth) + 180, 360),
  };
}
