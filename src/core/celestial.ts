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

/* ------------------------------------------------------------------ *
 * Galactic → equatorial
 *
 * Built from two measured directions rather than from a memorised set of
 * trigonometric identities: the galactic centre and the galactic north pole,
 * both J2000. Everything else falls out of a rotation matrix, which is much
 * harder to get subtly wrong than the closed-form version.
 * ------------------------------------------------------------------ */

type Vec3 = [number, number, number];

function direction(raDeg: number, decDeg: number): Vec3 {
  const ra = toRadians(raDeg);
  const dec = toRadians(decDeg);
  return [Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec)];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

/** Galactic centre, l = 0 b = 0. */
const GALACTIC_X = direction(266.405, -28.936);
/** Galactic north pole, b = +90. */
const GALACTIC_Z = direction(192.85948, 27.12825);
const GALACTIC_Y = cross(GALACTIC_Z, GALACTIC_X);

export interface EquatorialPosition {
  /** Right ascension in hours. */
  ra: number;
  /** Declination in degrees. */
  dec: number;
}

/** Galactic longitude and latitude in degrees → equatorial. */
export function galacticToEquatorial(l: number, b: number): EquatorialPosition {
  const lr = toRadians(l);
  const br = toRadians(b);
  const gx = Math.cos(br) * Math.cos(lr);
  const gy = Math.cos(br) * Math.sin(lr);
  const gz = Math.sin(br);

  const x = gx * GALACTIC_X[0] + gy * GALACTIC_Y[0] + gz * GALACTIC_Z[0];
  const y = gx * GALACTIC_X[1] + gy * GALACTIC_Y[1] + gz * GALACTIC_Z[1];
  const z = gx * GALACTIC_X[2] + gy * GALACTIC_Y[2] + gz * GALACTIC_Z[2];

  return {
    ra: wrap(toDegrees(Math.atan2(y, x)), 360) / 15,
    dec: toDegrees(Math.asin(Math.max(-1, Math.min(1, z)))),
  };
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
