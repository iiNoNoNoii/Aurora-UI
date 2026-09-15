import type { WeatherCondition, WeatherProfile } from '../core/types';

/**
 * Every condition Home Assistant's `weather` domain can report.
 * Anything else is mapped onto `unknown` (which behaves like a mild
 * partly-cloudy day) so a new HA release can never blank the background.
 */
export const KNOWN_CONDITIONS: WeatherCondition[] = [
  'clear-night',
  'cloudy',
  'exceptional',
  'fog',
  'hail',
  'lightning',
  'lightning-rainy',
  'partlycloudy',
  'pouring',
  'rainy',
  'snowy',
  'snowy-rainy',
  'sunny',
  'windy',
  'windy-variant',
];

/** Aliases seen in the wild (older integrations, template weather entities). */
const ALIASES: Record<string, WeatherCondition> = {
  clear: 'sunny',
  'clear-day': 'sunny',
  'clear_night': 'clear-night',
  'partly-cloudy': 'partlycloudy',
  'partly_cloudy': 'partlycloudy',
  'partlycloudy-night': 'partlycloudy',
  mostlycloudy: 'cloudy',
  overcast: 'cloudy',
  drizzle: 'rainy',
  rain: 'rainy',
  showers: 'rainy',
  thunderstorm: 'lightning-rainy',
  'thunderstorm-rainy': 'lightning-rainy',
  storm: 'lightning-rainy',
  snow: 'snowy',
  sleet: 'snowy-rainy',
  mist: 'fog',
  haze: 'fog',
  wind: 'windy',
};

export function normalizeCondition(state: string | undefined | null): WeatherCondition {
  if (!state) return 'unknown';
  const key = state.toLowerCase().trim();
  if ((KNOWN_CONDITIONS as string[]).includes(key)) return key as WeatherCondition;
  return ALIASES[key] ?? 'unknown';
}

type ProfileSeed = Omit<WeatherProfile, 'condition'>;

const BASE: ProfileSeed = {
  cloudCover: 0.25,
  cloudDarkness: 0.05,
  skyDarkness: 0,
  desaturation: 0,
  fog: 0,
  rain: 0,
  snow: 0,
  lightning: 0,
  wind: 0.25,
  sunVisibility: 1,
};

const PROFILES: Record<WeatherCondition, Partial<ProfileSeed>> = {
  sunny: { cloudCover: 0.1, cloudDarkness: 0, skyDarkness: 0, wind: 0.2, sunVisibility: 1 },
  'clear-night': { cloudCover: 0.06, cloudDarkness: 0, wind: 0.15, sunVisibility: 1 },
  partlycloudy: { cloudCover: 0.45, cloudDarkness: 0.1, wind: 0.3, sunVisibility: 0.8 },
  cloudy: {
    cloudCover: 0.85,
    cloudDarkness: 0.35,
    skyDarkness: 0.18,
    desaturation: 0.3,
    wind: 0.35,
    sunVisibility: 0.25,
  },
  fog: {
    cloudCover: 0.5,
    cloudDarkness: 0.15,
    skyDarkness: 0.15,
    desaturation: 0.6,
    fog: 0.85,
    wind: 0.12,
    sunVisibility: 0.2,
  },
  rainy: {
    cloudCover: 0.9,
    cloudDarkness: 0.45,
    skyDarkness: 0.3,
    desaturation: 0.45,
    fog: 0.15,
    rain: 0.45,
    wind: 0.4,
    sunVisibility: 0.1,
  },
  pouring: {
    cloudCover: 1,
    cloudDarkness: 0.6,
    skyDarkness: 0.45,
    desaturation: 0.55,
    fog: 0.25,
    rain: 1,
    wind: 0.6,
    sunVisibility: 0.03,
  },
  lightning: {
    cloudCover: 0.9,
    cloudDarkness: 0.55,
    skyDarkness: 0.4,
    desaturation: 0.4,
    lightning: 0.6,
    wind: 0.55,
    sunVisibility: 0.08,
  },
  'lightning-rainy': {
    cloudCover: 1,
    cloudDarkness: 0.65,
    skyDarkness: 0.5,
    desaturation: 0.5,
    fog: 0.2,
    rain: 0.9,
    lightning: 1,
    wind: 0.7,
    sunVisibility: 0.03,
  },
  hail: {
    cloudCover: 1,
    cloudDarkness: 0.6,
    skyDarkness: 0.42,
    desaturation: 0.5,
    rain: 0.7,
    lightning: 0.3,
    wind: 0.65,
    sunVisibility: 0.05,
  },
  snowy: {
    cloudCover: 0.9,
    cloudDarkness: 0.25,
    skyDarkness: 0.2,
    desaturation: 0.55,
    fog: 0.25,
    snow: 0.8,
    wind: 0.3,
    sunVisibility: 0.15,
  },
  'snowy-rainy': {
    cloudCover: 0.95,
    cloudDarkness: 0.4,
    skyDarkness: 0.3,
    desaturation: 0.55,
    fog: 0.25,
    rain: 0.5,
    snow: 0.5,
    wind: 0.4,
    sunVisibility: 0.08,
  },
  windy: { cloudCover: 0.35, cloudDarkness: 0.1, wind: 0.85, sunVisibility: 0.85 },
  'windy-variant': {
    cloudCover: 0.6,
    cloudDarkness: 0.25,
    skyDarkness: 0.1,
    desaturation: 0.2,
    wind: 1,
    sunVisibility: 0.5,
  },
  exceptional: {
    cloudCover: 0.7,
    cloudDarkness: 0.4,
    skyDarkness: 0.25,
    desaturation: 0.35,
    wind: 0.7,
    sunVisibility: 0.4,
  },
  unknown: {},
};

/** Build the renderer-facing profile for a condition. */
export function conditionToProfile(condition: WeatherCondition): WeatherProfile {
  return { condition, ...BASE, ...PROFILES[condition] };
}
