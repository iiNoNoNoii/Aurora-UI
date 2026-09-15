import type { RGB, Renderer, SceneState, SkyPalette } from '../core/types';
import { linearToRgb, rgbToCss, rgbToLinear } from '../core/color';
import { clamp01, createRandom } from '../core/math';

/**
 * The base gradient. Everything else is painted on top of this.
 *
 * Three things separate a sky that looks expensive from one that looks like a
 * CSS gradient, and all three live in this file:
 *
 *  1. **Interpolation in linear light.** Mixing gamma-encoded sRGB darkens the
 *     midpoint of every blend, so the band between two stops goes grey.
 *  2. **A smooth curve through the stops.** A `CanvasGradient` interpolates
 *     linearly between the stops it is given, which puts a visible kink at
 *     every one of them. Sampling a cubic through the five palette colours and
 *     handing the gradient many more stops removes them.
 *  3. **Dithering.** A full-screen 8-bit gradient bands, badly, especially in
 *     the deep blues of twilight. A pixel of noise hides it completely – this
 *     is the trick every high-end gradient uses.
 */

/** How many stops to hand the CanvasGradient. Cheap; only rebuilt on change. */
const GRADIENT_STOPS = 24;
/** Positions of the five palette colours from zenith to horizon. */
const KNOTS = [0, 0.28, 0.55, 0.82, 1];
const NOISE_TILE = 128;
const NOISE_SEED = 0xd17e12;

export class SkyRenderer implements Renderer {
  readonly name = 'sky';

  private gradient: CanvasGradient | null = null;
  private cacheKey = '';
  private noise: CanvasPattern | null = null;
  private noiseCanvas: HTMLCanvasElement | null = null;

  setup(): void {
    this.gradient = null;
    this.cacheKey = '';
  }

  resize(): void {
    this.gradient = null;
    this.cacheKey = '';
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const { palette, width, height } = scene;

    const key = [
      Math.round(height),
      palette.zenith.join(),
      palette.upper.join(),
      palette.middle.join(),
      palette.lower.join(),
      palette.horizon.join(),
    ].join('|');

    if (!this.gradient || key !== this.cacheKey) {
      this.gradient = this.buildGradient(ctx, palette, height);
      this.cacheKey = key;
    }

    ctx.fillStyle = this.gradient;
    ctx.fillRect(0, 0, width, height);

    // A very soft top vignette gives the sky depth and keeps white cards
    // readable at the top of the dashboard.
    const vignette = ctx.createLinearGradient(0, 0, 0, height * 0.45);
    const strength = clamp01(0.12 + scene.weather.skyDarkness * 0.2);
    vignette.addColorStop(0, `rgba(0,0,0,${strength.toFixed(3)})`);
    vignette.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height * 0.45);

    this.renderDither(ctx, scene);
  }

  private buildGradient(
    ctx: CanvasRenderingContext2D,
    palette: SkyPalette,
    height: number
  ): CanvasGradient {
    const colors: RGB[] = [
      palette.zenith,
      palette.upper,
      palette.middle,
      palette.lower,
      palette.horizon,
    ].map(rgbToLinear);

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    for (let i = 0; i < GRADIENT_STOPS; i++) {
      const t = i / (GRADIENT_STOPS - 1);
      gradient.addColorStop(t, rgbToCss(linearToRgb(sampleCurve(colors, KNOTS, t))));
    }
    return gradient;
  }

  /**
   * One pixel of static noise over the whole sky.
   *
   * Drawn with the transform reset, so the tile lands on device pixels rather
   * than being scaled up with everything else – dither only works at 1:1.
   */
  private renderDither(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    if (!this.noise) {
      this.noiseCanvas = createNoiseTile(NOISE_TILE);
      this.noise = ctx.createPattern(this.noiseCanvas, 'repeat');
      if (!this.noise) return;
    }

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.noise;
    ctx.fillRect(0, 0, scene.width * scene.pixelRatio, scene.height * scene.pixelRatio);
    ctx.restore();
  }

  destroy(): void {
    this.gradient = null;
    this.noise = null;
    this.noiseCanvas = null;
  }
}

/**
 * Piecewise cubic Hermite through `colors` at `knots`, with tangents from
 * central differences. Passes through every control colour and has no kink at
 * the joins, which is what a plain multi-stop CanvasGradient cannot do.
 */
function sampleCurve(colors: RGB[], knots: number[], t: number): RGB {
  const last = colors.length - 1;
  if (t <= knots[0]) return colors[0];
  if (t >= knots[last]) return colors[last];

  let i = 0;
  while (i < last - 1 && t > knots[i + 1]) i++;

  const t0 = knots[i];
  const t1 = knots[i + 1];
  const span = t1 - t0 || 1;
  const s = (t - t0) / span;

  const out: number[] = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const p0 = colors[i][c];
    const p1 = colors[i + 1][c];

    // Central-difference tangents, scaled into this segment's parameter space.
    const prev = colors[Math.max(0, i - 1)][c];
    const next = colors[Math.min(last, i + 2)][c];
    const tPrev = knots[Math.max(0, i - 1)];
    const tNext = knots[Math.min(last, i + 2)];
    const m0 = ((p1 - prev) / (t1 - tPrev || 1)) * span;
    const m1 = ((next - p0) / (tNext - t0 || 1)) * span;

    const s2 = s * s;
    const s3 = s2 * s;
    out[c] =
      (2 * s3 - 3 * s2 + 1) * p0 +
      (s3 - 2 * s2 + s) * m0 +
      (-2 * s3 + 3 * s2) * p1 +
      (s3 - s2) * m1;
  }

  return [out[0], out[1], out[2]];
}

/**
 * A tile of low-amplitude noise. Half the pixels lighten, half darken, by about
 * one 8-bit step – enough to dissolve a band, far too little to see as grain.
 */
function createNoiseTile(size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const image = ctx.createImageData(size, size);
  const data = image.data;
  const rng = createRandom(NOISE_SEED);

  for (let i = 0; i < data.length; i += 4) {
    const up = rng() < 0.5;
    const value = up ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    // ~1.5/255 effective amplitude once the 0.5 global alpha is applied.
    data[i + 3] = Math.round(rng() * 3);
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}
