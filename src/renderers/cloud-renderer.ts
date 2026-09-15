import type { RGB, Renderer, SceneState } from '../core/types';
import { colorDistanceSq, rgbToCss } from '../core/color';
import { clamp01, createRandom, lerp, randomBetween, wrap } from '../core/math';

const CLOUD_SEED = 0xc10d5;
const SPRITE_VARIANTS = 5;
/** Re-tint when the cloud colour drifted by more than ~6 per channel. */
const RETINT_THRESHOLD = 6 * 6 * 3;

interface Cloud {
  variant: number;
  /** Position along the wrap span, 0..1. */
  nx: number;
  /** Vertical position, 0..1 of the canvas height. */
  ny: number;
  /** Random size jitter on top of the layer's base size. */
  scale: number;
  layer: number;
  alpha: number;
  /** Slow vertical bobbing so layers do not look like a flat slideshow. */
  bobPhase: number;
  bobAmount: number;
}

/**
 * Procedural clouds.
 *
 * A handful of grayscale sprites are generated once, tinted whenever the sky
 * colour changes noticeably, and then only ever `drawImage`d – which keeps the
 * per-frame cost flat no matter how detailed the sprites are.
 */
export class CloudRenderer implements Renderer {
  readonly name = 'clouds';

  private base: HTMLCanvasElement[] = [];
  private tinted: HTMLCanvasElement[] = [];
  private tintColor: RGB = [0, 0, 0];
  private tintValid = false;
  private clouds: Cloud[] = [];
  private spriteWidth = 0;
  private spriteHeight = 0;

  setup(scene: SceneState): void {
    const { cloudSpriteSize, cloudCount, cloudLayers } = scene.quality;
    this.spriteWidth = cloudSpriteSize;
    this.spriteHeight = Math.round(cloudSpriteSize * 0.55);

    const rng = createRandom(CLOUD_SEED);
    this.base = [];
    for (let i = 0; i < SPRITE_VARIANTS; i++) {
      this.base.push(createCloudSprite(this.spriteWidth, this.spriteHeight, rng));
    }
    this.tinted = [];
    this.tintValid = false;

    this.clouds = new Array(cloudCount);
    for (let i = 0; i < cloudCount; i++) {
      const layer = i % cloudLayers;
      const depth = cloudLayers <= 1 ? 1 : layer / (cloudLayers - 1); // 0 far .. 1 near
      this.clouds[i] = {
        variant: Math.floor(rng() * SPRITE_VARIANTS),
        nx: rng(),
        ny: randomBetween(rng, -0.04, 0.46) - depth * 0.06,
        scale: randomBetween(rng, 0.82, 1.22),
        layer: depth,
        alpha: randomBetween(rng, 0.6, 1),
        bobPhase: rng() * Math.PI * 2,
        bobAmount: randomBetween(rng, 0.004, 0.014),
      };
    }

    // Draw the near layers last.
    this.clouds.sort((a, b) => a.layer - b.layer);
  }

  resize(): void {
    /* positions are normalised */
  }

  particleCount(): number {
    return this.clouds.length;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const coverage = clamp01(scene.weather.cloudCover) * clamp01(scene.appearance.intensity);
    if (coverage <= 0.01 || this.clouds.length === 0) return;

    this.ensureTint(scene.palette.cloud);
    if (this.tinted.length === 0) return;

    const { width, height, dt } = scene;

    // Clouds are sized relative to the viewport, never to the sprite's pixel
    // size: the same scene has to read correctly in a 220 px card and on a
    // 2160 px wallpanel, and an ultrawide must not end up with tiny specks.
    const reference = Math.max(height, width * 0.42);
    const aspect = this.spriteWidth / this.spriteHeight;
    const maxCloudWidth = reference * 0.42 * aspect * 1.22;
    const wrapSpan = width + maxCloudWidth * 2.2;

    // How many clouds are on stage right now – the tail fades in gradually so a
    // weather change does not pop clouds into existence.
    const exact = coverage * this.clouds.length;
    const fullCount = Math.floor(exact);
    const partial = exact - fullCount;

    const windSpeed = lerp(0.25, 2.6, clamp01(scene.weather.wind));
    const motion = scene.reducedMotion ? 0.08 : 1;

    ctx.save();
    for (let i = 0; i < this.clouds.length; i++) {
      const cloud = this.clouds[i];

      // Advance every cloud, even the invisible ones: otherwise they all appear
      // stacked at their starting position when coverage increases.
      // Speed is a fraction of the viewport width, so a cloud takes about the
      // same time to cross a phone and a wallpanel.
      const pxPerSecond = width * lerp(0.006, 0.028, cloud.layer) * windSpeed * motion;
      cloud.nx = wrap(cloud.nx + (pxPerSecond * dt) / wrapSpan, 1);

      if (i > fullCount) continue;
      const fade = i === fullCount ? partial : 1;
      if (fade <= 0.01) continue;

      const sprite = this.tinted[cloud.variant];
      const h = reference * lerp(0.13, 0.42, cloud.layer) * cloud.scale;
      const w = h * aspect;
      const x = cloud.nx * wrapSpan - maxCloudWidth * 1.1;
      const bob = scene.reducedMotion
        ? 0
        : Math.sin(scene.time * 0.12 + cloud.bobPhase) * cloud.bobAmount * height;
      const y = cloud.ny * height + bob;

      if (x + w < 0 || x > width) continue;

      const alpha =
        cloud.alpha *
        fade *
        lerp(0.42, 0.92, coverage) *
        lerp(0.75, 1, cloud.layer) *
        lerp(1, 1.15, clamp01(scene.weather.cloudDarkness));

      ctx.globalAlpha = clamp01(alpha);
      ctx.drawImage(sprite, x, y, w, h);
    }
    ctx.restore();

    this.renderFogBand(ctx, scene);
  }

  /**
   * Overcast / foggy skies get a soft haze band near the horizon. This is the
   * hook the dedicated fog renderer will extend in v0.2.
   */
  private renderFogBand(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const fog = clamp01(scene.weather.fog) * clamp01(scene.appearance.intensity);
    if (fog <= 0.02 || !scene.effects.fog) return;

    const { width, height } = scene;
    const drift = scene.reducedMotion ? 0 : Math.sin(scene.time * 0.05) * 0.02;
    const top = height * (0.62 + drift);

    const gradient = ctx.createLinearGradient(0, top, 0, height);
    gradient.addColorStop(0, rgbToCss(scene.palette.ambient, 0));
    gradient.addColorStop(1, rgbToCss(scene.palette.ambient, 0.38 * fog));
    ctx.fillStyle = gradient;
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
    this.clouds = [];
    this.tintValid = false;
  }
}

/**
 * Builds one grayscale cloud out of overlapping soft blobs, then flattens the
 * base and feathers the edges. Grayscale (rather than white) keeps the internal
 * shading intact through the tinting step.
 */
function createCloudSprite(width: number, height: number, rng: () => number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const baseY = height * 0.66;
  const puffs = 12 + Math.floor(rng() * 8);

  for (let i = 0; i < puffs; i++) {
    const px = width * randomBetween(rng, 0.14, 0.86);
    // Puffs cluster toward the middle and thin out at the edges.
    const edgeFalloff = 1 - Math.abs(px / width - 0.5) * 1.5;
    if (edgeFalloff <= 0.05) continue;

    const rise = Math.pow(rng(), 1.5);
    const py = baseY - rise * height * 0.5;
    const radius = height * randomBetween(rng, 0.16, 0.3) * Math.max(0.35, edgeFalloff);

    // Higher puffs catch more light.
    const shade = Math.round(lerp(178, 255, clamp01(1 - py / height + 0.15)));
    const gradient = ctx.createRadialGradient(px, py, radius * 0.05, px, py, radius);
    gradient.addColorStop(0, `rgba(${shade},${shade},${shade},0.85)`);
    gradient.addColorStop(0.55, `rgba(${shade},${shade},${shade},0.38)`);
    gradient.addColorStop(1, `rgba(${shade},${shade},${shade},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(px, py, radius * 1.35, radius, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Flat-ish base: fade everything below the cloud base away.
  ctx.globalCompositeOperation = 'destination-in';
  const baseMask = ctx.createLinearGradient(0, 0, 0, height);
  baseMask.addColorStop(0, 'rgba(0,0,0,1)');
  baseMask.addColorStop(baseY / height, 'rgba(0,0,0,1)');
  baseMask.addColorStop(Math.min(1, baseY / height + 0.16), 'rgba(0,0,0,0)');
  baseMask.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = baseMask;
  ctx.fillRect(0, 0, width, height);

  // Feather left/right so clouds never show a hard sprite edge.
  const sideMask = ctx.createLinearGradient(0, 0, width, 0);
  sideMask.addColorStop(0, 'rgba(0,0,0,0)');
  sideMask.addColorStop(0.12, 'rgba(0,0,0,1)');
  sideMask.addColorStop(0.88, 'rgba(0,0,0,1)');
  sideMask.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sideMask;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

/** Multiply the grayscale sprite with `color`, keeping its original alpha. */
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
  // `multiply` also painted the fully transparent pixels – restore the mask.
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(sprite, 0, 0);
  ctx.globalCompositeOperation = 'source-over';

  return canvas;
}
