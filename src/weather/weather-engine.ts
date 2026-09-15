import type {
  AuroraBackgroundConfig,
  HomeAssistant,
  WeatherCondition,
  WeatherProfile,
} from '../core/types';
import { clamp01, damp, lerp } from '../core/math';
import { computeSunPosition } from '../core/solar';
import { conditionToProfile, normalizeCondition } from './weather-mapping';

/** Raw, un-smoothed reading of the world at one point in time. */
export interface EnvironmentSnapshot {
  condition: WeatherCondition;
  /** 0..1, from the `cloud_coverage` attribute when the integration provides it. */
  cloudCoverage: number | null;
  /** 0..1 relative wind strength. */
  wind: number | null;
  sunElevation: number;
  sunAzimuth: number;
  sunRising: boolean;
  latitude: number;
  longitude: number;
  /** Where the values came from – shown in the debug overlay. */
  sunSource: 'sun.sun' | 'computed';
  weatherEntity: string | null;
  weatherAvailable: boolean;
}

const WIND_UNIT_TO_KMH: Record<string, number> = {
  'km/h': 1,
  kmh: 1,
  'm/s': 3.6,
  ms: 3.6,
  mph: 1.60934,
  'mi/h': 1.60934,
  kn: 1.852,
  kt: 1.852,
};

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const n = Number.parseFloat(value);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

/** First `weather.*` entity, used when the user did not configure one. */
export function findWeatherEntity(hass: HomeAssistant | undefined): string | undefined {
  if (!hass) return undefined;
  for (const entityId of Object.keys(hass.states)) {
    if (entityId.startsWith('weather.')) return entityId;
  }
  return undefined;
}

export function readEnvironment(
  hass: HomeAssistant | undefined,
  config: AuroraBackgroundConfig,
  now: Date = new Date()
): EnvironmentSnapshot {
  const latitude = hass?.config?.latitude ?? 51.2;
  const longitude = hass?.config?.longitude ?? 6.8;

  /* ---- sun ---- */
  let sunElevation: number | null = null;
  let sunAzimuth: number | null = null;
  let sunRising: boolean | null = null;
  let sunSource: EnvironmentSnapshot['sunSource'] = 'computed';

  const sunEntityId = config.sun_entity;
  const sunEntity = sunEntityId ? hass?.states?.[sunEntityId] : undefined;
  if (sunEntity) {
    const elevation = toNumber(sunEntity.attributes.elevation);
    const azimuth = toNumber(sunEntity.attributes.azimuth);
    if (elevation !== null) {
      sunElevation = elevation;
      sunAzimuth = azimuth;
      sunRising =
        typeof sunEntity.attributes.rising === 'boolean'
          ? (sunEntity.attributes.rising as boolean)
          : null;
      sunSource = 'sun.sun';
    }
  }

  if (sunElevation === null || sunAzimuth === null || sunRising === null) {
    const computed = computeSunPosition(now, latitude, longitude);
    if (sunElevation === null) sunElevation = computed.elevation;
    if (sunAzimuth === null) sunAzimuth = computed.azimuth;
    if (sunRising === null) sunRising = computed.rising;
    if (sunSource !== 'sun.sun') sunSource = 'computed';
  }

  /* ---- weather ---- */
  const weatherEntityId = config.weather_entity ?? findWeatherEntity(hass);
  const weatherEntity = weatherEntityId ? hass?.states?.[weatherEntityId] : undefined;

  let condition: WeatherCondition = 'unknown';
  let cloudCoverage: number | null = null;
  let wind: number | null = null;
  let weatherAvailable = false;

  if (weatherEntity && weatherEntity.state !== 'unavailable' && weatherEntity.state !== 'unknown') {
    condition = normalizeCondition(weatherEntity.state);
    weatherAvailable = true;

    const coverage = toNumber(weatherEntity.attributes.cloud_coverage);
    if (coverage !== null) cloudCoverage = clamp01(coverage / 100);

    const speed = toNumber(weatherEntity.attributes.wind_speed);
    if (speed !== null) {
      const unit = String(
        weatherEntity.attributes.wind_speed_unit ?? hass?.config?.unit_system?.wind_speed ?? 'km/h'
      ).toLowerCase();
      const kmh = speed * (WIND_UNIT_TO_KMH[unit] ?? 1);
      wind = clamp01(kmh / 70);
    }
  } else if (!weatherEntityId) {
    // No weather entity at all: fall back to a clean sky driven purely by the sun.
    condition = sunElevation > -6 ? 'sunny' : 'clear-night';
  }

  // HA reports `sunny` at night for some integrations; keep the sky honest.
  if (condition === 'sunny' && sunElevation < -4) condition = 'clear-night';
  if (condition === 'clear-night' && sunElevation > 2) condition = 'sunny';

  return {
    condition,
    cloudCoverage,
    wind,
    sunElevation,
    sunAzimuth,
    sunRising,
    latitude,
    longitude,
    sunSource,
    weatherEntity: weatherEntityId ?? null,
    weatherAvailable,
  };
}

/** Build the target profile, folding in live attributes where available. */
export function snapshotToProfile(snapshot: EnvironmentSnapshot): WeatherProfile {
  const profile = conditionToProfile(snapshot.condition);

  if (snapshot.cloudCoverage !== null) {
    // When the integration reports an actual percentage, that is the sky the
    // user is looking at – let it dominate and keep only a trace of the
    // condition's own character.
    profile.cloudCover = lerp(profile.cloudCover, snapshot.cloudCoverage, 0.85);
    profile.sunVisibility = Math.min(profile.sunVisibility, 1 - snapshot.cloudCoverage * 0.85);
  }
  if (snapshot.wind !== null) {
    profile.wind = lerp(profile.wind, snapshot.wind, 0.7);
  }

  return profile;
}

const NUMERIC_KEYS = [
  'cloudCover',
  'cloudDarkness',
  'skyDarkness',
  'desaturation',
  'fog',
  'rain',
  'snow',
  'lightning',
  'wind',
  'sunVisibility',
] as const;

/**
 * Cross-fades between weather profiles so a state change never snaps.
 * Half-life is ~4 s, which reads as "the weather is changing" rather than a cut.
 */
export class WeatherBlender {
  private current: WeatherProfile;
  private target: WeatherProfile;

  constructor(initial: WeatherProfile) {
    this.current = { ...initial };
    this.target = { ...initial };
  }

  setTarget(profile: WeatherProfile): void {
    this.target = { ...profile };
  }

  /** Jump straight to the target (used on first paint and after a config change). */
  snapTo(profile: WeatherProfile): void {
    this.current = { ...profile };
    this.target = { ...profile };
  }

  update(dt: number, halfLife = 4): WeatherProfile {
    for (const key of NUMERIC_KEYS) {
      this.current[key] = damp(this.current[key], this.target[key], halfLife, dt);
    }
    this.current.condition = this.target.condition;
    return this.current;
  }

  get value(): WeatherProfile {
    return this.current;
  }
}
