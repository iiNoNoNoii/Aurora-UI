/**
 * Aurora Background – shared types.
 *
 * Kept dependency-free on purpose: the card ships as a single ES module and we
 * do not want to pull in `custom-card-helpers` just for a handful of interfaces.
 */

/* ------------------------------------------------------------------ *
 * Minimal Home Assistant surface we actually rely on.
 * Everything here is public, documented frontend API that has been
 * stable for years (hass.states / hass.config / hass.themes).
 * ------------------------------------------------------------------ */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  config: {
    latitude?: number;
    longitude?: number;
    time_zone?: string;
    unit_system?: Record<string, string>;
  };
  themes?: { darkMode?: boolean };
  locale?: unknown;
  language?: string;
  callService?: (domain: string, service: string, data?: unknown) => Promise<unknown>;
}

/** Lovelace card contract (the subset every custom card must implement). */
export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: unknown): void;
  getCardSize?(): number | Promise<number>;
}

/* ------------------------------------------------------------------ *
 * Quality / configuration
 * ------------------------------------------------------------------ */

export type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';
export type QualitySetting = QualityLevel | 'auto';

export type AuroraMode = 'background' | 'card';

export interface EffectsConfig {
  sun: boolean;
  moon: boolean;
  stars: boolean;
  shooting_stars: boolean;
  clouds: boolean;
  /** Reserved for v0.2 – accepted in YAML today, rendered later. */
  rain: boolean;
  snow: boolean;
  fog: boolean;
  lightning: boolean;
}

export interface AppearanceConfig {
  /** Global effect strength (particles / cloud alpha). 0..2, default 1. */
  intensity: number;
  /** Colour saturation multiplier. 0..2, default 1. */
  saturation: number;
  /** Brightness multiplier. 0..2, default 1. */
  brightness: number;
  /** CSS blur applied to the whole canvas, in px. Default 0. */
  blur: number;
  /** Extra ambient glow near the horizon. 0..2, default 1. */
  ambient_glow: number;
  /** Opacity of the whole background layer. 0..1, default 1. */
  opacity: number;
}

export interface PerformanceConfig {
  /** Hard frame cap. Default 60 (30 on `low`). */
  max_fps: number;
  /** Downgrade quality automatically when frames get expensive. */
  auto_quality: boolean;
  /** Pause rendering while the document is hidden. */
  pause_when_hidden: boolean;
}

export interface BackgroundLayerConfig {
  /** Make Lovelace/HA surfaces transparent so the layer is actually visible. */
  transparent_lovelace: boolean;
  /** Also clear the dashboard header background. */
  transparent_header: boolean;
  /** Extra CSS custom properties to force on :root (escape hatch for themes). */
  css_variables: Record<string, string>;
  /** z-index of the fixed layer. Negative keeps it behind all dashboard content. */
  z_index: number;
}

export interface AuroraBackgroundConfig {
  type: string;
  mode: AuroraMode;
  weather_entity?: string;
  sun_entity?: string;
  quality: QualitySetting;
  debug: boolean;
  /** Only used in `mode: card`. Any CSS length. */
  height: string;
  effects: EffectsConfig;
  appearance: AppearanceConfig;
  performance: PerformanceConfig;
  background: BackgroundLayerConfig;
}

/** What a user may write in YAML – everything optional / partial. */
export type AuroraBackgroundConfigInput = {
  type?: string;
  mode?: AuroraMode;
  weather_entity?: string;
  sun_entity?: string | null;
  quality?: QualitySetting;
  debug?: boolean;
  height?: string | number;
  effects?: Partial<EffectsConfig>;
  appearance?: Partial<AppearanceConfig>;
  performance?: Partial<PerformanceConfig>;
  background?: Partial<BackgroundLayerConfig>;
};

/** Resolved, quality-dependent budgets handed to the renderers. */
export interface QualityProfile {
  level: QualityLevel;
  /** Multiplier applied to the canvas backing store (0..1). */
  renderScale: number;
  /** Upper bound for devicePixelRatio. */
  maxDpr: number;
  starCount: number;
  cloudCount: number;
  cloudLayers: number;
  cloudSpriteSize: number;
  /** Extra soft glow passes around the sun. */
  sunGlowPasses: number;
  shootingStars: boolean;
  maxFps: number;
}

/* ------------------------------------------------------------------ *
 * Weather
 * ------------------------------------------------------------------ */

export type WeatherCondition =
  | 'clear-night'
  | 'cloudy'
  | 'exceptional'
  | 'fog'
  | 'hail'
  | 'lightning'
  | 'lightning-rainy'
  | 'partlycloudy'
  | 'pouring'
  | 'rainy'
  | 'snowy'
  | 'snowy-rainy'
  | 'sunny'
  | 'windy'
  | 'windy-variant'
  | 'unknown';

/**
 * Normalised, renderer-facing description of the weather.
 * All values are 0..1 unless noted, so they can be cross-faded smoothly.
 */
export interface WeatherProfile {
  condition: WeatherCondition;
  /** How much of the sky is covered by clouds. */
  cloudCover: number;
  /** How dark/heavy the clouds look. */
  cloudDarkness: number;
  /** Overall sky darkening (storms). */
  skyDarkness: number;
  /** Desaturation of the sky (haze, overcast). */
  desaturation: number;
  /** Ground fog / haze amount. */
  fog: number;
  /** Rain intensity (v0.2 renderer). */
  rain: number;
  /** Snow intensity (v0.2 renderer). */
  snow: number;
  /** Lightning frequency (v0.2 renderer). */
  lightning: number;
  /** Wind, drives cloud speed. 0..1 (relative), 1 ≈ storm. */
  wind: number;
  /** Whether the condition implies the sun should be hidden. */
  sunVisibility: number;
}

/* ------------------------------------------------------------------ *
 * Scene
 * ------------------------------------------------------------------ */

export type RGB = readonly [number, number, number];

export interface SkyPalette {
  /** Top of the sky (zenith). */
  zenith: RGB;
  upper: RGB;
  middle: RGB;
  lower: RGB;
  /** Horizon line. */
  horizon: RGB;
  /** Sun disc colour. */
  sunCore: RGB;
  /** Sun halo colour. */
  sunGlow: RGB;
  /** Ambient light tint used by clouds and glow. */
  ambient: RGB;
  /** Base cloud colour (before darkening). */
  cloud: RGB;
}

/** Everything the renderers need for one frame. */
export interface SceneState {
  /** Monotonic time in seconds since the engine started. */
  time: number;
  /** Delta since previous frame, in seconds (clamped). */
  dt: number;

  width: number;
  height: number;
  /** Backing-store scale actually in use (dpr * renderScale). */
  pixelRatio: number;

  sunElevation: number;
  sunAzimuth: number;
  sunRising: boolean;

  /** 1 = full daylight, 0 = sun below the horizon. */
  dayFactor: number;
  /** 1 = astronomical night, 0 = day. */
  nightFactor: number;
  /** Peaks during civil twilight. */
  twilightFactor: number;

  /** Normalised sun position on screen, 0..1 (may be outside for below-horizon). */
  sunX: number;
  sunY: number;

  moonVisible: boolean;
  moonX: number;
  moonY: number;
  /** 0 = new moon, 0.5 = full moon, 1 = new moon again. */
  moonPhase: number;

  palette: SkyPalette;
  weather: WeatherProfile;

  quality: QualityProfile;
  appearance: AppearanceConfig;
  effects: EffectsConfig;

  /** True when the user asked the OS for reduced motion. */
  reducedMotion: boolean;
}

/** A drawable module. Renderers own their own state and clean up after themselves. */
export interface Renderer {
  readonly name: string;
  /** Called once, and again whenever the quality profile changes. */
  setup(scene: SceneState): void;
  /** Called on every resize (canvas size in CSS pixels). */
  resize(scene: SceneState): void;
  render(ctx: CanvasRenderingContext2D, scene: SceneState): void;
  /** Optional cheap stat for the debug overlay. */
  particleCount?(): number;
  destroy(): void;
}
