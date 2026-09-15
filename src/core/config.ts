import type {
  AuroraBackgroundConfig,
  AuroraBackgroundConfigInput,
  AuroraMode,
  QualityLevel,
  QualityProfile,
  QualitySetting,
} from './types';
import { clamp } from './math';

export const CARD_TYPE = 'aurora-background';
export const CARD_NAME = 'Aurora Background';
export const AURORA_VERSION =
  typeof __AURORA_VERSION__ === 'string' ? __AURORA_VERSION__ : '0.0.0-dev';

const QUALITY_LEVELS: QualityLevel[] = ['low', 'medium', 'high', 'ultra'];
const MODES: AuroraMode[] = ['background', 'card'];

/* ------------------------------------------------------------------ *
 * Quality profiles
 * ------------------------------------------------------------------ */

const QUALITY_PROFILES: Record<QualityLevel, QualityProfile> = {
  low: {
    level: 'low',
    renderScale: 0.6,
    maxDpr: 1,
    starCount: 70,
    cloudCount: 8,
    cloudLayers: 2,
    cloudSpriteSize: 192,
    sunGlowPasses: 1,
    shootingStars: false,
    rainParticles: 100,
    snowParticles: 50,
    fogLayers: 2,
    lightningBolts: false,
    maxFps: 30,
  },
  medium: {
    level: 'medium',
    renderScale: 0.8,
    maxDpr: 1.5,
    starCount: 140,
    cloudCount: 14,
    cloudLayers: 3,
    cloudSpriteSize: 256,
    sunGlowPasses: 2,
    shootingStars: false,
    rainParticles: 220,
    snowParticles: 110,
    fogLayers: 3,
    lightningBolts: true,
    maxFps: 45,
  },
  high: {
    level: 'high',
    renderScale: 1,
    maxDpr: 2,
    starCount: 240,
    cloudCount: 22,
    cloudLayers: 3,
    cloudSpriteSize: 320,
    sunGlowPasses: 3,
    shootingStars: true,
    rainParticles: 400,
    snowParticles: 200,
    fogLayers: 4,
    lightningBolts: true,
    maxFps: 60,
  },
  ultra: {
    level: 'ultra',
    renderScale: 1,
    maxDpr: 2.5,
    starCount: 380,
    cloudCount: 32,
    cloudLayers: 4,
    cloudSpriteSize: 384,
    sunGlowPasses: 4,
    shootingStars: true,
    rainParticles: 650,
    snowParticles: 320,
    fogLayers: 5,
    lightningBolts: true,
    maxFps: 60,
  },
};

export function getQualityProfile(level: QualityLevel): QualityProfile {
  return { ...QUALITY_PROFILES[level] };
}

export function stepQuality(level: QualityLevel, delta: number): QualityLevel {
  const index = QUALITY_LEVELS.indexOf(level);
  return QUALITY_LEVELS[clamp(index + delta, 0, QUALITY_LEVELS.length - 1)];
}

/**
 * Best-effort device guess used when `quality: auto`.
 * Deliberately conservative – the performance manager can still upgrade later.
 */
export function detectQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'medium';

  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const shortSide = Math.min(window.screen?.width ?? 1280, window.screen?.height ?? 800);
  const coarsePointer =
    typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;

  if (cores <= 2 || memory <= 2) return 'low';
  if (coarsePointer && shortSide <= 480) return 'medium';
  if (coarsePointer) return cores >= 6 ? 'high' : 'medium';
  if (cores >= 8 && memory >= 8) return 'high';
  return 'medium';
}

/* ------------------------------------------------------------------ *
 * Config normalisation
 * ------------------------------------------------------------------ */

function bool(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

function num(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  if (!Number.isFinite(n)) return fallback;
  return clamp(n, min, max);
}

function str(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

function oneOf<T extends string>(value: unknown, allowed: T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function cssVars(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
      if (typeof raw !== 'string' && typeof raw !== 'number') continue;
      const name = key.startsWith('--') ? key : `--${key}`;
      out[name] = String(raw);
    }
  }
  return out;
}

export const DEFAULT_SUN_ENTITY = 'sun.sun';

/**
 * Turn whatever the user wrote in YAML into a fully populated config.
 * Never throws for unknown keys – forward compatibility matters more than strictness.
 */
export function normalizeConfig(input: AuroraBackgroundConfigInput | undefined): AuroraBackgroundConfig {
  const raw = (input ?? {}) as AuroraBackgroundConfigInput;
  const effects = raw.effects ?? {};
  const appearance = raw.appearance ?? {};
  const performance = raw.performance ?? {};
  const background = raw.background ?? {};
  // `glass: true` is shorthand for "on, with the defaults".
  const glass = typeof raw.glass === 'boolean' ? { enabled: raw.glass } : (raw.glass ?? {});

  // `sun_entity: null` is an explicit "no sun entity, use the built-in solar model".
  const sunEntity =
    raw.sun_entity === null
      ? undefined
      : typeof raw.sun_entity === 'string' && raw.sun_entity.length > 0
        ? raw.sun_entity
        : DEFAULT_SUN_ENTITY;

  const quality = oneOf<QualitySetting>(
    raw.quality,
    ['auto', 'low', 'medium', 'high', 'ultra'],
    'auto'
  );

  return {
    type: str(raw.type, `custom:${CARD_TYPE}`),
    mode: oneOf<AuroraMode>(raw.mode, MODES, 'background'),
    weather_entity:
      typeof raw.weather_entity === 'string' && raw.weather_entity.length > 0
        ? raw.weather_entity
        : undefined,
    sun_entity: sunEntity,
    quality,
    debug: bool(raw.debug, false),
    height: typeof raw.height === 'number' ? `${raw.height}px` : str(raw.height, '320px'),
    effects: {
      sun: bool(effects.sun, true),
      moon: bool(effects.moon, true),
      stars: bool(effects.stars, true),
      shooting_stars: bool(effects.shooting_stars, true),
      constellations: bool(effects.constellations, true),
      milky_way: bool(effects.milky_way, true),
      sun_rays: bool(effects.sun_rays, true),
      clouds: bool(effects.clouds, true),
      rain: bool(effects.rain, true),
      snow: bool(effects.snow, true),
      fog: bool(effects.fog, true),
      lightning: bool(effects.lightning, true),
      season: bool(effects.season, true),
      parallax: bool(effects.parallax, true),
    },
    appearance: {
      intensity: num(appearance.intensity, 1, 0, 2),
      saturation: num(appearance.saturation, 1, 0, 2),
      brightness: num(appearance.brightness, 1, 0.2, 2),
      blur: num(appearance.blur, 0, 0, 40),
      ambient_glow: num(appearance.ambient_glow, 1, 0, 2),
      opacity: num(appearance.opacity, 1, 0, 1),
    },
    performance: {
      max_fps: num(performance.max_fps, 60, 10, 120),
      auto_quality: bool(performance.auto_quality, true),
      pause_when_hidden: bool(performance.pause_when_hidden, true),
    },
    background: {
      transparent_lovelace: bool(background.transparent_lovelace, true),
      transparent_header: bool(background.transparent_header, true),
      css_variables: cssVars(background.css_variables),
      z_index: num(background.z_index, -1, -100, 100),
      ambient_variables: bool(background.ambient_variables, true),
    },
    glass: {
      // Off by default: it restyles every card on the dashboard, which is a
      // decision the user should make rather than inherit.
      enabled: bool(glass.enabled, false),
      blur: num(glass.blur, 14, 0, 40),
      opacity: num(glass.opacity, 0.5, 0, 1),
      saturate: num(glass.saturate, 1.4, 1, 3),
      border: bool(glass.border, true),
      glow: num(glass.glow, 1, 0, 2),
      radius: num(glass.radius, 18, -1, 60),
      adaptive_text: bool(glass.adaptive_text, false),
    },
  };
}
