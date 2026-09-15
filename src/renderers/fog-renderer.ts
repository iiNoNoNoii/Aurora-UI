import type { RGB, Renderer, SceneState } from '../core/types';
import { colorDistanceSq, rgbToCss } from '../core/color';
import { clamp01, createRandom, lerp, randomBetween, wrap } from '../core/math';

const FOG_SEED = 0xf06;
const SPRITE_VARIANTS = 3;
const SPRITE_WIDTH = 512;
const SPRITE_HEIGHT = 128;
const RETINT_THRESHOLD = 6 * 6 * 3;

interface FogBand {
  variant: number;
  /** Position along the wrap span, 0..1. */
  nx: number;
  /** Vertical centre, 0..1 of the canvas height. */
  ny: number;
  /** Band thickness as a fraction of the canvas height. */
  thickness: number;
  speed: number;
  alpha: number;
  bobPhase: number;
}

/**
 * Ground fog and haze.
 *
 * Wide, very soft sprites drifting at different speeds and heights. They are
 * concentrated in the lower half of the view, which is where fog reads as fog
 * rather than as a dirty lens.
 */
export class FogRenderer implements Renderer {
  readonly name = 'fog';

  private base: HTMLCanvasElement[] = [];
  private tinted: HTMLCanvasElement[] = [];
  private tintColor: RGB = [0, 0, 0];
  private tintValid = false;
  private bands: FogBand[] = [];

  setup(scene: SceneState): void {
    const rng = createRandom(FOG_SEED);

    this.base = [];
    for (let i = 0; i < SPRITE_VARIANTS; i++) {
      this.base.push(createFogSprite(SPRITE_WIDTH, SPRITE_HEIGHT, rng));
    }
    this.tinted = [];
    this.tintValid = false;

    const count = scene.quality.fogLayers;
    this.bands = new Array(count);
    for (let i = 0; i < count; i++) {
      const depth = count <= 1 ? 1 : i / (count - 1); // 0 high/far .. 1 low/near
      this.bands[i] = {
        variant: i % SPRITE_VARIANTS,
        nx: rng(),
        ny: lerp(0.5, 1.02, depth) + randomBetween(rng, -0.05, 0.05),
        thickness: lerp(0.18, 0.42, depth) * randomBetween(rng, 0.85, 1.2),
        speed: lerp(0.004, 0.016, depth) * randomBetween(rng, 0.7, 1.4),
        alpha: lerp(0.5, 1, depth) * randomBetween(rng, 0.8, 1.1),
        bobPhase: rng() * Math.PI * 2,
      };
    }
  }

  resize(): void {
    /* positions are normalised */
  }

  particleCount(): number {
    return this.bands.length;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const amount = clamp01(scene.weather.fog) * clamp01(scene.appearance.intensity);
    if (amount <= 0.02 || this.bands.length === 0) return;

    // Fog takes the ambient sky colour, pulled toward a neutral haze.
    const color = scene.palette.ambient;
    this.ensureTint(color);
    if (this.tinted.length === 0) return;

    const { width, height, dt } = scene;
    const motion = scene.reducedMotion ? 0.1 : 1;

    ctx.save();
    for (const band of this.bands) {
      band.nx = wrap(band.nx + band.speed * motion * dt, 1);

      const sprite = this.tinted[band.variant];
      const h = band.thickness * height;
      // Always at least two viewports wide so one sprite plus its wrap copy
      // covers the screen at any aspect ratio.
      const w = Math.max(width * 1.6, h * (SPRITE_WIDTH / SPRITE_HEIGHT));
      const bob = scene.reducedMotion
        ? 0
        : Math.sin(scene.time * 0.07 + band.bobPhase) * height * 0.012;
      // Fog is the nearest thing in the scene, so it moves most.
      const y = band.ny * height - h / 2 + bob + scene.parallaxY * 1.4;
      const x = -band.nx * w + scene.parallaxX * 1.4;

      ctx.globalAlpha = clamp01(band.alpha * amount * 0.55);
      ctx.drawImage(sprite, x, y, w, h);
      ctx.drawImage(sprite, x + w, y, w, h);
    }
    ctx.restore();

    // A flat wash underneath holds the whole thing together at high fog values.
    const top = height * 0.55;
    const wash = ctx.createLinearGradient(0, top, 0, height);
    wash.addColorStop(0, rgbToCss(color, 0));
    wash.addColorStop(1, rgbToCss(color, 0.32 * amount));
    ctx.fillStyle = wash;
    ctx.fillRect(0, top, width, height - top);
  }

  private ensureTint(color: RGB): void {
    if (this.tintValid && colorDistanceSq(color, this.tintColor) < RETINT_THRESHOLD) return;
    this.tinted = this.base.map((sprite) => tintSprite(sprite, color));
    this.tintColor = color;
    this.tintValid = true;
  }

  destroy(): void {
    this.base = [];
    this.tinted = [];
    this.bands = [];
    this.tintValid = false;
  }
}

/**
 * One horizontally seamless haze band: overlapping soft ellipses, with the
 * left and right edges mirrored so a sprite tiles against its own copy.
 */
function createFogSprite(width: number, height: number, rng: () => number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const blobs = 14 + Math.floor(rng() * 8);
  for (let i = 0; i < blobs; i++) {
    const px = rng() * width;
    const py = height * randomBetween(rng, 0.3, 0.7);
    const rx = width * randomBetween(rng, 0.08, 0.22);
    const ry = height * randomBetween(rng, 0.3, 0.6);
    const alpha = randomBetween(rng, 0.1, 0.28);

    // A blob that hangs over an edge is drawn again on the opposite side, so
    // the sprite tiles seamlessly against its own copy.
    const offsets = [0];
    if (px < rx) offsets.push(width);
    else if (px > width - rx) offsets.push(-width);

    for (const offset of offsets) {
      const cx = px + offset;
      const gradient = ctx.createRadialGradient(cx, py, 0, cx, py, Math.max(rx, ry));
      gradient.addColorStop(0, `rgba(255,255,255,${alpha.toFixed(3)})`);
      gradient.addColorStop(0.6, `rgba(255,255,255,${(alpha * 0.4).toFixed(3)})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(cx, py, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Feather top and bottom so the band has no hard edge.
  ctx.globalCompositeOperation = 'destination-in';
  const mask = ctx.createLinearGradient(0, 0, 0, height);
  mask.addColorStop(0, 'rgba(0,0,0,0)');
  mask.addColorStop(0.35, 'rgba(0,0,0,1)');
  mask.addColorStop(0.7, 'rgba(0,0,0,1)');
  mask.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'source-over';

  return canvas;
}

/** Multiply the white sprite with `color`, keeping its alpha. */
function tintSprite(sprite: HTMLCanvasElement, color: RGB): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = sprite.width;
  canvas.height = sprite.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(sprite, 0, 0);
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = rgbToCss(color);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(sprite, 0, 0);
  ctx.globalCompositeOperation = 'source-over';

  return canvas;
}
