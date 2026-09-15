import type { Renderer, SceneState } from '../core/types';
import { TAU, clamp01, lerp } from '../core/math';
import { equatorialToHorizontal } from '../core/celestial';
import { projectAltAz } from '../core/projection';
import { BRIGHT_STARS, CONSTELLATIONS } from '../core/star-catalog';

interface PlacedStar {
  x: number;
  y: number;
  /** Above the horizon and inside the drawn azimuth range. */
  visible: boolean;
  /** 0..1, derived from apparent magnitude. */
  brightness: number;
  radius: number;
  twinklePhase: number;
}

/**
 * The real sky: named stars at their actual positions for the viewer's
 * latitude, longitude and clock, joined into the traditional figures.
 *
 * Positions change by 15° an hour, so they are recomputed on a timer rather
 * than per frame; between recomputes the renderer only draws.
 */
const RECOMPUTE_INTERVAL_SECONDS = 20;

export class ConstellationRenderer implements Renderer {
  readonly name = 'constellations';

  private placed: PlacedStar[] = [];
  private sinceRecompute = Number.POSITIVE_INFINITY;
  private lastLatitude = Number.NaN;
  private lastLongitude = Number.NaN;
  private visibleCount = 0;

  setup(): void {
    this.placed = BRIGHT_STARS.map((star, index) => ({
      x: 0,
      y: 0,
      visible: false,
      // Magnitude 6 is the naked-eye limit, −1.5 is Sirius. Perceived
      // brightness is logarithmic, so map it as a curve rather than linearly.
      brightness: clamp01((6 - star.mag) / 7.5) ** 1.6,
      radius: lerp(0.7, 2.3, clamp01((4.5 - star.mag) / 6)),
      twinklePhase: (index * 2.399) % TAU,
    }));
    this.sinceRecompute = Number.POSITIVE_INFINITY;
  }

  resize(): void {
    /* positions are normalised */
  }

  particleCount(): number {
    return this.visibleCount;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const visibility =
      clamp01(scene.nightFactor) *
      (1 - clamp01(scene.weather.cloudCover) * 0.9) *
      clamp01(scene.appearance.intensity);

    if (visibility <= 0.02) {
      this.visibleCount = 0;
      return;
    }

    this.sinceRecompute += scene.dt;
    if (
      this.sinceRecompute >= RECOMPUTE_INTERVAL_SECONDS ||
      scene.latitude !== this.lastLatitude ||
      scene.longitude !== this.lastLongitude
    ) {
      this.recompute(scene);
    }

    const { width, height } = scene;

    // Figures first, so the stars sit on top of their own lines.
    ctx.save();
    ctx.lineWidth = Math.max(0.7, Math.min(width, height) * 0.0012);
    ctx.lineCap = 'round';
    ctx.strokeStyle = `rgba(150,185,255,${(0.24 * visibility).toFixed(3)})`;
    ctx.beginPath();

    for (const constellation of CONSTELLATIONS) {
      for (const [from, to] of constellation.lines) {
        const a = this.placed[from];
        const b = this.placed[to];
        if (!a?.visible || !b?.visible) continue;
        // A pair that wrapped around the panorama would draw a line straight
        // across the whole sky.
        if (Math.abs(a.x - b.x) > 0.45) continue;
        ctx.moveTo(a.x * width, a.y * height);
        ctx.lineTo(b.x * width, b.y * height);
      }
    }
    ctx.stroke();
    ctx.restore();

    let visible = 0;
    ctx.save();
    for (const star of this.placed) {
      if (!star.visible) continue;
      visible++;

      const twinkle = scene.reducedMotion
        ? 1
        : 0.78 + 0.22 * Math.sin(scene.time * 1.7 + star.twinklePhase);
      const alpha = clamp01(star.brightness * visibility * twinkle);
      if (alpha <= 0.02) continue;

      const x = star.x * width + scene.parallaxX * 0.15;
      const y = star.y * height + scene.parallaxY * 0.15;

      // The brightest few get a halo – that is what makes Sirius read as
      // Sirius rather than as one more dot.
      if (star.radius > 1.5) {
        const halo = ctx.createRadialGradient(x, y, 0, x, y, star.radius * 5);
        halo.addColorStop(0, `rgba(198,220,255,${(alpha * 0.55).toFixed(3)})`);
        halo.addColorStop(1, 'rgba(198,220,255,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, star.radius * 5, 0, TAU);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(255,252,246,${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, TAU);
      ctx.fill();
    }
    ctx.restore();

    this.visibleCount = visible;
  }

  private recompute(scene: SceneState): void {
    this.sinceRecompute = 0;
    this.lastLatitude = scene.latitude;
    this.lastLongitude = scene.longitude;

    const now = new Date();
    for (let i = 0; i < BRIGHT_STARS.length; i++) {
      const star = BRIGHT_STARS[i];
      const placed = this.placed[i];
      if (!placed) continue;

      const { altitude, azimuth } = equatorialToHorizontal(
        star.ra,
        star.dec,
        scene.latitude,
        scene.longitude,
        now
      );
      const point = projectAltAz(altitude, azimuth);
      placed.x = point.x;
      placed.y = point.y;
      // A star right on the horizon is lost in haze; give it a couple of
      // degrees before it appears. `inView` culls the part of the sky behind
      // the viewer rather than smearing it against the screen edge.
      placed.visible = altitude > 2 && point.inView;
    }
  }

  destroy(): void {
    this.placed = [];
    this.visibleCount = 0;
  }
}
