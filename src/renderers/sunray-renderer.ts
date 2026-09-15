import type { Renderer, SceneState } from '../core/types';
import { TAU, clamp01, createRandom, lerp, randomBetween } from '../core/math';
import { rgbToCss } from '../core/color';

const RAY_SEED = 0x7a45;
const RAY_COUNT = 9;
/** Soft edges are faked by stacking a few widths – see `render`. */
const SUBRAYS = 3;

interface Ray {
  /** Offset from straight down, in radians. */
  angle: number;
  halfWidth: number;
  strength: number;
  /** Slow drift, so the fan breathes instead of sitting still. */
  driftSpeed: number;
  driftPhase: number;
}

/**
 * Crepuscular rays – sunbeams through gaps in the cloud.
 *
 * Volumetric shafts would mean rendering the cloud layer to a buffer and radial
 * blurring it from the sun every frame. That is the textbook method and far too
 * expensive for a dashboard background, so these are drawn directly: a fan of
 * long, very faint wedges with a gradient along their length, composited
 * additively.
 *
 * Two things keep it from looking like a sunburst clipart. The effect only
 * appears when there is actually something for the light to break through, so
 * it peaks around half cloud cover and fades out on both a clear and a fully
 * overcast sky. And each ray is stacked from a few widths at low alpha, which
 * softens its edges without a blur pass.
 */
export class SunRayRenderer implements Renderer {
  readonly name = 'sunrays';

  private rays: Ray[] = [];

  setup(): void {
    const rng = createRandom(RAY_SEED);
    this.rays = new Array(RAY_COUNT);
    for (let i = 0; i < RAY_COUNT; i++) {
      this.rays[i] = {
        angle: randomBetween(rng, -1.25, 1.25),
        halfWidth: randomBetween(rng, 0.018, 0.075),
        strength: randomBetween(rng, 0.45, 1),
        driftSpeed: randomBetween(rng, 0.012, 0.04),
        driftPhase: rng() * TAU,
      };
    }
  }

  resize(): void {
    /* angles are resolution independent */
  }

  particleCount(): number {
    return this.rays.length;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const cover = clamp01(scene.weather.cloudCover);
    // Nothing to break through on a clear sky; nothing gets through an
    // overcast one. The window in between is where rays actually happen.
    const gapFactor = clamp01(Math.sin(Math.PI * clamp01((cover - 0.12) / 0.78)));

    // Strongest when the sun is low, gone once it is down.
    const lowSun = 1 - clamp01((scene.sunElevation - 2) / 36);
    const aboveHorizon = clamp01((scene.sunElevation + 1) / 5);

    const strength =
      gapFactor *
      lerp(0.35, 1, lowSun) *
      aboveHorizon *
      clamp01(scene.weather.sunVisibility * 1.6) *
      clamp01(scene.appearance.intensity) *
      clamp01(scene.appearance.ambient_glow);

    if (strength <= 0.01) return;

    const { width, height } = scene;
    const originX = scene.sunX * width;
    const originY = scene.sunY * height;
    // Long enough to always leave the viewport, whatever the aspect ratio.
    const reach = Math.hypot(width, height) * 1.4;
    const colour = scene.palette.sunGlow;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(originX, originY);

    for (const ray of this.rays) {
      const drift = scene.reducedMotion
        ? 0
        : Math.sin(scene.time * ray.driftSpeed + ray.driftPhase) * 0.09;
      // Rays point away from the sun and downward – that is where the
      // atmosphere they light up actually is.
      const angle = Math.PI / 2 + ray.angle + drift;

      for (let s = 0; s < SUBRAYS; s++) {
        const spread = (s + 1) / SUBRAYS;
        const halfWidth = ray.halfWidth * lerp(0.45, 1.6, spread);
        const alpha = strength * ray.strength * 0.05 * (1 - spread * 0.55);
        if (alpha <= 0.002) continue;

        const gradient = ctx.createLinearGradient(
          0,
          0,
          Math.cos(angle) * reach,
          Math.sin(angle) * reach
        );
        gradient.addColorStop(0, rgbToCss(colour, alpha));
        gradient.addColorStop(0.35, rgbToCss(colour, alpha * 0.55));
        gradient.addColorStop(1, rgbToCss(colour, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle - halfWidth) * reach, Math.sin(angle - halfWidth) * reach);
        ctx.lineTo(Math.cos(angle + halfWidth) * reach, Math.sin(angle + halfWidth) * reach);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }

  destroy(): void {
    this.rays = [];
  }
}
