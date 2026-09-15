import type { Renderer, SceneState } from '../core/types';
import { mixRgb, rgbToCss } from '../core/color';
import { clamp01, createRandom, lerp, randomBetween } from '../core/math';

const RAIN_SEED = 0x2a1f;
/** Depth bands, from far/faint to near/bright. Batched into one path each. */
const BANDS = 3;

interface Drop {
  nx: number;
  ny: number;
  /** Fall speed as a fraction of the canvas height per second. */
  speed: number;
  /** Streak length as a fraction of the canvas height. */
  length: number;
  band: number;
}

/**
 * Rain.
 *
 * Every drop of a depth band shares one stroke style, so the whole band is a
 * single `beginPath()` / `stroke()` pair. That keeps 650 drops at roughly the
 * cost of three draw calls instead of six hundred.
 */
export class RainRenderer implements Renderer {
  readonly name = 'rain';

  private drops: Drop[] = [];
  private active = 0;

  setup(scene: SceneState): void {
    const rng = createRandom(RAIN_SEED);
    const count = scene.quality.rainParticles;
    this.drops = new Array(count);

    for (let i = 0; i < count; i++) {
      const band = i % BANDS;
      const depth = BANDS <= 1 ? 1 : band / (BANDS - 1);
      this.drops[i] = {
        nx: rng(),
        ny: rng(),
        speed: lerp(0.75, 1.7, depth) * randomBetween(rng, 0.85, 1.15),
        length: lerp(0.02, 0.058, depth) * randomBetween(rng, 0.8, 1.3),
        band,
      };
    }
  }

  resize(): void {
    /* positions are normalised */
  }

  particleCount(): number {
    return this.active;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const amount = clamp01(scene.weather.rain) * clamp01(scene.appearance.intensity);
    if (amount <= 0.01 || this.drops.length === 0) {
      this.active = 0;
      return;
    }

    const { width, height, dt } = scene;
    const visible = Math.round(this.drops.length * amount);
    this.active = visible;

    // Wind tilts the streaks; the same ratio drives horizontal drift so the
    // motion matches the angle the drops are drawn at.
    const slant = lerp(0.06, 0.5, clamp01(scene.weather.wind)) * (scene.reducedMotion ? 0.3 : 1);
    const speedScale = scene.reducedMotion ? 0.25 : 1;

    // Rain picks up the sky's colour: pale in daylight, deep blue at night.
    const tint = mixRgb(scene.palette.ambient, [225, 238, 255], 0.62);

    for (let band = 0; band < BANDS; band++) {
      const depth = BANDS <= 1 ? 1 : band / (BANDS - 1);
      ctx.strokeStyle = rgbToCss(tint, lerp(0.11, 0.3, depth) * amount);
      ctx.lineWidth = lerp(0.7, 1.4, depth);
      ctx.lineCap = 'round';
      ctx.beginPath();

      for (let i = band; i < visible; i += BANDS) {
        const drop = this.drops[i];

        drop.ny += drop.speed * speedScale * dt;
        drop.nx += drop.speed * slant * speedScale * dt * (height / Math.max(1, width));

        if (drop.ny > 1.05) {
          drop.ny -= 1.1;
          drop.nx = Math.random();
        }
        if (drop.nx > 1.05) drop.nx -= 1.1;
        else if (drop.nx < -0.05) drop.nx += 1.1;

        const x = drop.nx * width;
        const y = drop.ny * height;
        const len = drop.length * height;

        ctx.moveTo(x, y);
        ctx.lineTo(x - len * slant, y - len);
      }

      ctx.stroke();
    }

    this.renderGroundMist(ctx, scene, amount);
  }

  /** Spray hanging over the bottom edge – cheap, and it sells heavy rain. */
  private renderGroundMist(
    ctx: CanvasRenderingContext2D,
    scene: SceneState,
    amount: number
  ): void {
    if (amount < 0.35) return;
    const { width, height } = scene;
    const top = height * 0.82;
    const strength = (amount - 0.35) / 0.65;

    const gradient = ctx.createLinearGradient(0, top, 0, height);
    gradient.addColorStop(0, rgbToCss(scene.palette.ambient, 0));
    gradient.addColorStop(1, rgbToCss(scene.palette.ambient, 0.3 * strength));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, top, width, height - top);
  }

  destroy(): void {
    this.drops.length = 0;
    this.active = 0;
  }
}
