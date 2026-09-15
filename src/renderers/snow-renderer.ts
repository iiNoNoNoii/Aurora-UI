import type { Renderer, SceneState } from '../core/types';
import { mixRgb, rgbToCss } from '../core/color';
import { TAU, clamp01, createRandom, lerp, randomBetween } from '../core/math';

const SNOW_SEED = 0x5f10c4;
/** Size bands, batched into one fill each. */
const BANDS = 3;

interface Flake {
  nx: number;
  ny: number;
  /** Fall speed as a fraction of the canvas height per second. */
  speed: number;
  /** Radius as a fraction of the canvas short side. */
  radius: number;
  driftAmplitude: number;
  driftFrequency: number;
  driftPhase: number;
  band: number;
}

/**
 * Snow.
 *
 * Flakes differ in size, fall speed and the width of their horizontal sway, so
 * the field reads as depth rather than as one sheet of dots. Like the rain,
 * each size band is a single batched path.
 */
export class SnowRenderer implements Renderer {
  readonly name = 'snow';

  private flakes: Flake[] = [];
  private active = 0;

  setup(scene: SceneState): void {
    const rng = createRandom(SNOW_SEED);
    const count = scene.quality.snowParticles;
    this.flakes = new Array(count);

    for (let i = 0; i < count; i++) {
      const band = i % BANDS;
      const depth = BANDS <= 1 ? 1 : band / (BANDS - 1);
      this.flakes[i] = {
        nx: rng(),
        ny: rng(),
        speed: lerp(0.035, 0.14, depth) * randomBetween(rng, 0.8, 1.25),
        radius: lerp(0.0016, 0.005, depth) * randomBetween(rng, 0.8, 1.3),
        driftAmplitude: randomBetween(rng, 0.008, 0.035) * lerp(0.6, 1.4, depth),
        driftFrequency: randomBetween(rng, 0.25, 0.8),
        driftPhase: rng() * TAU,
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
    const amount = clamp01(scene.weather.snow) * clamp01(scene.appearance.intensity);
    if (amount <= 0.01 || this.flakes.length === 0) {
      this.active = 0;
      return;
    }

    const { width, height, dt } = scene;
    const shortSide = Math.min(width, height);
    const visible = Math.round(this.flakes.length * amount);
    this.active = visible;

    const speedScale = scene.reducedMotion ? 0.2 : 1;
    const windPush = lerp(0.004, 0.05, clamp01(scene.weather.wind)) * speedScale;
    const tint = mixRgb(scene.palette.ambient, [255, 255, 255], 0.85);

    for (let band = 0; band < BANDS; band++) {
      const depth = BANDS <= 1 ? 1 : band / (BANDS - 1);
      ctx.fillStyle = rgbToCss(tint, lerp(0.4, 0.85, depth) * amount);
      ctx.beginPath();

      for (let i = band; i < visible; i += BANDS) {
        const flake = this.flakes[i];

        flake.ny += flake.speed * speedScale * dt;
        flake.nx += windPush * dt;

        if (flake.ny > 1.05) {
          flake.ny -= 1.1;
          flake.nx = Math.random();
        }
        if (flake.nx > 1.05) flake.nx -= 1.1;
        else if (flake.nx < -0.05) flake.nx += 1.1;

        const sway = scene.reducedMotion
          ? 0
          : Math.sin(scene.time * flake.driftFrequency + flake.driftPhase) * flake.driftAmplitude;

        const x = (flake.nx + sway) * width;
        const y = flake.ny * height;
        const r = flake.radius * shortSide;

        ctx.moveTo(x + r, y);
        ctx.arc(x, y, r, 0, TAU);
      }

      ctx.fill();
    }
  }

  destroy(): void {
    this.flakes.length = 0;
    this.active = 0;
  }
}
