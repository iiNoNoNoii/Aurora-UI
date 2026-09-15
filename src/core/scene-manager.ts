import type {
  AuroraBackgroundConfig,
  QualityProfile,
  Renderer,
  SceneState,
  SkyPalette,
} from './types';
import { clamp, clamp01, damp, lerp } from './math';
import { computePalette, dampPalette, daylightFactors } from './palette';
import { computeMoonPhase, computeMoonPosition } from './solar';
import type { EnvironmentSnapshot } from '../weather/weather-engine';
import { WeatherBlender, snapshotToProfile } from '../weather/weather-engine';
import { conditionToProfile } from '../weather/weather-mapping';
import { SkyRenderer } from '../renderers/sky-renderer';
import { StarRenderer } from '../renderers/star-renderer';
import { MoonRenderer } from '../renderers/moon-renderer';
import { SunRenderer } from '../renderers/sun-renderer';
import { CloudRenderer } from '../renderers/cloud-renderer';

/**
 * Owns the renderer stack and turns Home Assistant state into a `SceneState`.
 *
 * The manager never touches the DOM – that is the layer's job – which keeps it
 * trivially testable and makes the render order explicit in one place.
 */
export class SceneManager {
  private readonly sky = new SkyRenderer();
  private readonly stars = new StarRenderer();
  private readonly moon = new MoonRenderer();
  private readonly sun = new SunRenderer();
  private readonly clouds = new CloudRenderer();

  /** Painter's order, back to front. */
  private readonly renderers: Renderer[];

  private readonly blender: WeatherBlender;
  private palette: SkyPalette;

  /** Smoothed sun elevation – HA can jump by a degree between updates. */
  private elevation: number;
  private azimuth: number;

  private snapshot: EnvironmentSnapshot;
  private config: AuroraBackgroundConfig;
  private quality: QualityProfile;
  private reducedMotion = false;

  private state: SceneState;
  private initialised = false;

  constructor(
    config: AuroraBackgroundConfig,
    quality: QualityProfile,
    snapshot: EnvironmentSnapshot
  ) {
    this.config = config;
    this.quality = quality;
    this.snapshot = snapshot;

    this.renderers = [this.sky, this.stars, this.moon, this.sun, this.clouds];

    this.blender = new WeatherBlender(conditionToProfile(snapshot.condition));
    this.blender.snapTo(snapshotToProfile(snapshot));

    this.elevation = snapshot.sunElevation;
    this.azimuth = snapshot.sunAzimuth;

    this.palette = computePalette({
      elevation: this.elevation,
      rising: snapshot.sunRising,
      weather: this.blender.value,
      appearance: config.appearance,
    });

    this.state = this.createState();
  }

  private createState(): SceneState {
    return {
      time: 0,
      dt: 0,
      width: 1,
      height: 1,
      pixelRatio: 1,
      sunElevation: this.elevation,
      sunAzimuth: this.azimuth,
      sunRising: this.snapshot.sunRising,
      dayFactor: 0,
      nightFactor: 0,
      twilightFactor: 0,
      sunX: 0.5,
      sunY: 0.5,
      moonVisible: false,
      moonX: 0.5,
      moonY: 0.3,
      moonPhase: 0.5,
      palette: this.palette,
      weather: this.blender.value,
      quality: this.quality,
      appearance: this.config.appearance,
      effects: this.config.effects,
      reducedMotion: this.reducedMotion,
    };
  }

  get sceneState(): SceneState {
    return this.state;
  }

  get environment(): EnvironmentSnapshot {
    return this.snapshot;
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value;
    this.state.reducedMotion = value;
  }

  setConfig(config: AuroraBackgroundConfig): void {
    this.config = config;
    this.state.appearance = config.appearance;
    this.state.effects = config.effects;
  }

  /** Called when the quality level changed – renderers rebuild their buffers. */
  setQuality(quality: QualityProfile): void {
    this.quality = quality;
    this.state.quality = quality;
    for (const renderer of this.renderers) {
      renderer.setup(this.state);
    }
  }

  /** New Home Assistant data. Cheap – the blending happens per frame. */
  setEnvironment(snapshot: EnvironmentSnapshot): void {
    this.snapshot = snapshot;
    this.blender.setTarget(snapshotToProfile(snapshot));
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this.state.width = width;
    this.state.height = height;
    this.state.pixelRatio = pixelRatio;
    if (!this.initialised) {
      for (const renderer of this.renderers) renderer.setup(this.state);
      this.initialised = true;
    }
    for (const renderer of this.renderers) renderer.resize(this.state);
  }

  /** Skip the smoothing – used on the very first frame. */
  snapToTargets(): void {
    this.elevation = this.snapshot.sunElevation;
    this.azimuth = this.snapshot.sunAzimuth;
    this.blender.snapTo(snapshotToProfile(this.snapshot));
    this.palette = computePalette({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
    });
  }

  update(dt: number, time: number): void {
    const state = this.state;
    state.dt = dt;
    state.time = time;

    // Smooth the astronomical inputs so a state update never snaps the sky.
    this.elevation = damp(this.elevation, this.snapshot.sunElevation, 1.5, dt);
    this.azimuth = dampAngle(this.azimuth, this.snapshot.sunAzimuth, 1.5, dt);

    const weather = this.blender.update(dt);
    const targetPalette = computePalette({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather,
      appearance: this.config.appearance,
    });
    this.palette = dampPalette(this.palette, targetPalette, 0.6, dt);

    const { dayFactor, nightFactor, twilightFactor } = daylightFactors(this.elevation);

    state.sunElevation = this.elevation;
    state.sunAzimuth = this.azimuth;
    state.sunRising = this.snapshot.sunRising;
    state.dayFactor = dayFactor;
    state.nightFactor = nightFactor;
    state.twilightFactor = twilightFactor;
    state.palette = this.palette;
    state.weather = weather;

    // Screen position of the sun: east on the left, west on the right.
    state.sunX = clamp01((this.azimuth - 60) / 240);
    // Sunrise must put the disc *just* above the bottom edge, so the curve is
    // steep near the horizon and flattens out toward the zenith.
    state.sunY =
      this.elevation >= 0
        ? 0.94 - Math.pow(clamp01(this.elevation / 60), 0.7) * 0.84
        : clamp(0.94 + (-this.elevation / 20) * 0.18, 0.94, 1.2);

    // Moon.
    const now = new Date();
    const phase = computeMoonPhase(now);
    const moon = computeMoonPosition(now, this.snapshot.latitude, phase);
    state.moonPhase = phase;
    state.moonX = lerp(0.08, 0.92, clamp01(moon.azimuthFraction));
    state.moonY = clamp(1.02 - clamp01(moon.altitude / 70) * 0.88, 0.08, 1.1);
    state.moonVisible =
      this.config.effects.moon && moon.altitude > 2 && nightFactor > 0.08 && phase > 0.03 && phase < 0.97;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const state = this.state;
    const effects = this.config.effects;

    // The sky always paints first and covers the full canvas, so no clearRect.
    this.sky.render(ctx, state);
    if (effects.stars) this.stars.render(ctx, state);
    if (effects.moon) this.moon.render(ctx, state);
    if (effects.sun) this.sun.render(ctx, state);
    if (effects.clouds) this.clouds.render(ctx, state);
  }

  /** Rough particle count for the debug overlay. */
  particleCount(): number {
    let total = 0;
    for (const renderer of this.renderers) {
      total += renderer.particleCount?.() ?? 0;
    }
    return total;
  }

  destroy(): void {
    for (const renderer of this.renderers) renderer.destroy();
    this.initialised = false;
  }
}

/** Damp across the 0/360 wrap-around without spinning the long way round. */
function dampAngle(current: number, target: number, halfLife: number, dt: number): number {
  let delta = ((target - current + 540) % 360) - 180;
  const t = halfLife <= 0 ? 1 : 1 - Math.pow(2, -dt / halfLife);
  delta *= t;
  return (current + delta + 360) % 360;
}
