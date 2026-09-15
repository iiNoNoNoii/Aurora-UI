import type {
  AuroraBackgroundConfig,
  QualityProfile,
  Renderer,
  SceneState,
  SeasonProfile,
  SkyPalette,
  WeatherProfile,
} from './types';
import { clamp01, damp } from './math';
import { computePalette, dampPalette, daylightFactors } from './palette';
import { computeSeason } from './season';
import { computeMoonPhase, computeMoonPosition } from './solar';
import type { EnvironmentSnapshot } from '../weather/weather-engine';
import { WeatherBlender, snapshotToProfile } from '../weather/weather-engine';
import { conditionToProfile } from '../weather/weather-mapping';
import { SkyRenderer } from '../renderers/sky-renderer';
import { StarRenderer } from '../renderers/star-renderer';
import { MoonRenderer } from '../renderers/moon-renderer';
import { SunRenderer } from '../renderers/sun-renderer';
import { CloudRenderer } from '../renderers/cloud-renderer';
import { ConstellationRenderer } from '../renderers/constellation-renderer';
import { clampProjectedX, projectAltAz } from './projection';
import { FogRenderer } from '../renderers/fog-renderer';
import { RainRenderer } from '../renderers/rain-renderer';
import { SnowRenderer } from '../renderers/snow-renderer';
import { LightningRenderer } from '../renderers/lightning-renderer';

/**
 * Owns the renderer stack and turns Home Assistant state into a `SceneState`.
 *
 * The manager never touches the DOM – that is the layer's job – which keeps it
 * trivially testable and makes the render order explicit in one place.
 */
export class SceneManager {
  private readonly sky = new SkyRenderer();
  private readonly stars = new StarRenderer();
  private readonly constellations = new ConstellationRenderer();
  private readonly moon = new MoonRenderer();
  private readonly sun = new SunRenderer();
  private readonly clouds = new CloudRenderer();
  private readonly fog = new FogRenderer();
  private readonly rain = new RainRenderer();
  private readonly snow = new SnowRenderer();
  private readonly lightning = new LightningRenderer();

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
  private season: SeasonProfile;
  private reducedMotion = false;

  /** Raw parallax target set from outside; the scene smooths its way there. */
  private parallaxTargetX = 0;
  private parallaxTargetY = 0;
  private parallaxX = 0;
  private parallaxY = 0;

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

    this.renderers = [
      this.sky,
      this.stars,
      this.constellations,
      this.moon,
      this.sun,
      this.clouds,
      this.fog,
      this.rain,
      this.snow,
      this.lightning,
    ];

    this.season = computeSeason(new Date(), snapshot.latitude);

    this.blender = new WeatherBlender(conditionToProfile(snapshot.condition));
    this.blender.snapTo(this.targetProfile());

    this.elevation = snapshot.sunElevation;
    this.azimuth = snapshot.sunAzimuth;

    this.palette = computePalette({
      elevation: this.elevation,
      rising: snapshot.sunRising,
      weather: this.blender.value,
      appearance: config.appearance,
      season: config.effects.season ? this.season : null,
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
      latitude: this.snapshot.latitude,
      longitude: this.snapshot.longitude,
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
      season: this.season,
      parallaxX: 0,
      parallaxY: 0,
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
    const seasonToggled = config.effects.season !== this.config.effects.season;
    this.config = config;
    this.state.appearance = config.appearance;
    this.state.effects = config.effects;
    // The season contributes haze to the weather target, so a toggle has to
    // re-derive it instead of waiting for the next environment refresh.
    if (seasonToggled) this.blender.setTarget(this.targetProfile());
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
    this.season = computeSeason(new Date(), snapshot.latitude);
    this.state.season = this.season;
    this.blender.setTarget(this.targetProfile());
  }

  /**
   * Parallax offset in CSS pixels, supplied by the layer from scroll and
   * pointer input. The scene smooths it so a flicked scroll does not snap.
   */
  setParallaxTarget(x: number, y: number): void {
    this.parallaxTargetX = x;
    this.parallaxTargetY = y;
  }

  /**
   * The weather target with the season's haze folded in. Season changes over
   * weeks, so treating it as part of the weather target and letting the normal
   * cross-fade carry it is both correct and free.
   */
  private targetProfile(): WeatherProfile {
    const profile = snapshotToProfile(this.snapshot);
    if (this.config.effects.season) {
      profile.fog = clamp01(profile.fog + this.season.haze * 0.5);
    }
    return profile;
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
    this.parallaxX = this.parallaxTargetX;
    this.parallaxY = this.parallaxTargetY;
    this.blender.snapTo(this.targetProfile());
    this.palette = computePalette({
      elevation: this.elevation,
      rising: this.snapshot.sunRising,
      weather: this.blender.value,
      appearance: this.config.appearance,
      season: this.config.effects.season ? this.season : null,
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
      season: this.config.effects.season ? this.season : null,
    });
    this.palette = dampPalette(this.palette, targetPalette, 0.6, dt);

    // Parallax lags the input a little, which is what makes it read as depth
    // rather than as the background being dragged around.
    if (this.config.effects.parallax && !this.reducedMotion) {
      this.parallaxX = damp(this.parallaxX, this.parallaxTargetX, 0.25, dt);
      this.parallaxY = damp(this.parallaxY, this.parallaxTargetY, 0.25, dt);
    } else {
      this.parallaxX = 0;
      this.parallaxY = 0;
    }
    state.parallaxX = this.parallaxX;
    state.parallaxY = this.parallaxY;

    const { dayFactor, nightFactor, twilightFactor } = daylightFactors(this.elevation);

    state.sunElevation = this.elevation;
    state.sunAzimuth = this.azimuth;
    state.sunRising = this.snapshot.sunRising;
    state.dayFactor = dayFactor;
    state.nightFactor = nightFactor;
    state.twilightFactor = twilightFactor;
    state.palette = this.palette;
    state.weather = weather;

    state.latitude = this.snapshot.latitude;
    state.longitude = this.snapshot.longitude;

    // Sun, moon and stars all go through the same projection, so the moon
    // really does sit among the constellations.
    // The sun and moon are clamped so their glow stays on screen even when the
    // body itself has wandered outside the drawn azimuth range.
    const sun = projectAltAz(this.elevation, this.azimuth);
    state.sunX = clampProjectedX(sun);
    state.sunY = sun.y;

    const now = new Date();
    const phase = computeMoonPhase(now);
    const moon = computeMoonPosition(now, this.snapshot.latitude, phase);
    const moonPoint = projectAltAz(
      moon.altitude,
      // The moon model yields a position along the arc rather than a true
      // azimuth; feed it through the same 240° panorama.
      60 + clamp01(moon.azimuthFraction) * 240
    );
    state.moonPhase = phase;
    state.moonX = clampProjectedX(moonPoint);
    state.moonY = moonPoint.y;
    state.moonVisible =
      this.config.effects.moon && moon.altitude > 2 && nightFactor > 0.08 && phase > 0.03 && phase < 0.97;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const state = this.state;
    const effects = this.config.effects;

    // The sky always paints first and covers the full canvas, so no clearRect.
    // Order is back to front: sky, celestial bodies, clouds, then the weather
    // that happens between the clouds and the viewer.
    this.sky.render(ctx, state);
    if (effects.stars) this.stars.render(ctx, state);
    if (effects.constellations) this.constellations.render(ctx, state);
    if (effects.moon) this.moon.render(ctx, state);
    if (effects.sun) this.sun.render(ctx, state);
    if (effects.clouds) this.clouds.render(ctx, state);
    if (effects.fog) this.fog.render(ctx, state);
    if (effects.rain) this.rain.render(ctx, state);
    if (effects.snow) this.snow.render(ctx, state);
    if (effects.lightning) this.lightning.render(ctx, state);
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
