import type { RGB, Renderer, SceneState } from '../core/types';
import { colorDistanceSq, rgbToCss } from '../core/color';
import { TAU, clamp01, createRandom, lerp, randomBetween, wrap } from '../core/math';

const CLOUD_SEED = 0xc10d5;
/**
 * Re-tint once the cloud colour drifted by ~2 per channel, at most five times a
 * second. A coarser threshold makes the clouds change colour in visible steps
 * while the sky behind them moves continuously, which reads as pulsing.
 */
const RETINT_THRESHOLD = 2 * 2 * 3;
const RETINT_MIN_INTERVAL_MS = 200;

/** Puffy heaps for the near layers, flat sheets for the far ones. */
type CloudStyle = 'cumulus' | 'stratus';

const STYLES: { style: CloudStyle; aspect: number; spanScale: number }[] = [
  { style: 'cumulus', aspect: 1.9, spanScale: 1 },
  { style: 'cumulus', aspect: 1.9, spanScale: 1 },
  { style: 'cumulus', aspect: 1.9, spanScale: 1 },
  { style: 'stratus', aspect: 3.2, spanScale: 1.45 },
  { style: 'stratus', aspect: 3.2, spanScale: 1.45 },
  { style: 'stratus', aspect: 3.2, spanScale: 1.45 },
];

/**
 * How wide a cloud is, as a fraction of the viewport width, for the furthest
 * and the nearest layer.
 *
 * Width rather than height is the anchor: what makes a cloud read as a cloud is
 * how much of the sky it spans. Deriving the width from a height reference
 * times the aspect ratio made a single stratus sheet wider than the screen.
 */
const MIN_CLOUD_SPAN = 0.22;
const MAX_CLOUD_SPAN = 0.5;
/** Ceiling on cloud height, so a short/wide viewport does not get slabs. */
const MAX_CLOUD_HEIGHT_FRACTION = 0.4;

interface CloudSprite {
  canvas: HTMLCanvasElement;
  aspect: number;
  spanScale: number;
}

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
 * Grayscale sprites are generated once, tinted whenever the sky colour changes
 * noticeably, and then only ever `drawImage`d – which keeps the per-frame cost
 * flat no matter how detailed the sprites are.
 *
 * Two families are generated: flat stratus sheets, used for the distant layers
 * where clouds compress toward the horizon, and puffy cumulus heaps for the
 * near ones.
 */
export class CloudRenderer implements Renderer {
  readonly name = 'clouds';

  private base: CloudSprite[] = [];
  private tinted: CloudSprite[] = [];
  private tintColor: RGB = [0, 0, 0];
  private tintValid = false;
  private lastTintAt = 0;
  private clouds: Cloud[] = [];

  setup(scene: SceneState): void {
    const { cloudSpriteSize, cloudCount, cloudLayers } = scene.quality;
    const rng = createRandom(CLOUD_SEED);
    // `setup()` also runs when the quality level changes mid-flight. Rebuilding
    // from the seed would teleport every cloud back to its starting position,
    // so carry the drift across.
    const previous = this.clouds;

    this.base = STYLES.map(({ style, aspect, spanScale }) => {
      const width = Math.round(cloudSpriteSize);
      const height = Math.round(width / aspect);
      return {
        canvas: createCloudSprite(width, height, rng, style),
        aspect,
        spanScale,
      };
    });
    this.tinted = [];
    this.tintValid = false;

    this.clouds = new Array(cloudCount);
    for (let i = 0; i < cloudCount; i++) {
      const layer = i % cloudLayers;
      const depth = cloudLayers <= 1 ? 1 : layer / (cloudLayers - 1); // 0 far .. 1 near
      // Far layers get sheets, near layers get heaps.
      const family = depth < 0.45 ? 3 : 0;
      this.clouds[i] = {
        variant: family + Math.floor(rng() * 3),
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

    if (previous.length > 0) {
      for (let i = 0; i < this.clouds.length; i++) {
        this.clouds[i].nx = previous[i % previous.length].nx;
      }
    }
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
    // Cloudiness drives BOTH size and count: an overcast sky is not a clear sky
    // with more small clouds in it, it is bigger clouds that run into each
    // other. Count comes from `fullCount` below, size from here.
    const sizeBoost = lerp(0.82, 1.35, coverage);

    // How many clouds are on stage right now – the tail fades in gradually so a
    // weather change does not pop clouds into existence.
    const exact = coverage * this.clouds.length;
    const fullCount = Math.floor(exact);
    const partial = exact - fullCount;

    const windSpeed = lerp(0.25, 2.6, clamp01(scene.weather.wind));
    const motion = scene.reducedMotion ? 0.08 : 1;

    // Individual sprites cluster in the upper sky, which leaves an overcast day
    // looking bright along the horizon. A flat sheet underneath them closes
    // that gap, and the sprites still supply the texture on top of it.
    const overcast =
      clamp01((coverage - 0.55) / 0.45) * lerp(0.35, 0.85, clamp01(scene.weather.cloudDarkness));
    if (overcast > 0.01) {
      const sheet = ctx.createLinearGradient(0, 0, 0, height);
      sheet.addColorStop(0, rgbToCss(scene.palette.cloud, overcast * 0.55));
      sheet.addColorStop(0.55, rgbToCss(scene.palette.cloud, overcast * 0.4));
      sheet.addColorStop(1, rgbToCss(scene.palette.cloud, overcast * 0.18));
      ctx.fillStyle = sheet;
      ctx.fillRect(0, 0, width, height);
    }

    ctx.save();
    for (let i = 0; i < this.clouds.length; i++) {
      const cloud = this.clouds[i];

      const sprite = this.tinted[cloud.variant];
      let w =
        width *
        lerp(MIN_CLOUD_SPAN, MAX_CLOUD_SPAN, cloud.layer) *
        cloud.scale *
        sprite.spanScale *
        sizeBoost;
      let h = w / sprite.aspect;
      // Short, wide viewports would otherwise get clouds taller than the sky.
      const maxHeight = height * MAX_CLOUD_HEIGHT_FRACTION;
      if (h > maxHeight) {
        h = maxHeight;
        w = h * sprite.aspect;
      }
      // Each cloud wraps over its own width, not over one span sized for the
      // biggest possible cloud. A shared span parks most of the field
      // off-screen: with it, barely a quarter of the clouds were ever visible,
      // which is why an overcast sky looked like three lonely puffs.
      const span = width + w * 1.1;

      // Advance every cloud, even the invisible ones: otherwise they all appear
      // stacked at their starting position when coverage increases.
      // Speed is a fraction of the viewport width, so a cloud takes about the
      // same time to cross a phone and a wallpanel.
      const pxPerSecond = width * lerp(0.006, 0.028, cloud.layer) * windSpeed * motion;
      cloud.nx = wrap(cloud.nx + (pxPerSecond * dt) / span, 1);

      if (i > fullCount) continue;
      const fade = i === fullCount ? partial : 1;
      if (fade <= 0.01) continue;

      // Near layers travel further than far ones – that difference is the
      // entire parallax effect.
      const depthShift = lerp(0.3, 1, cloud.layer);
      const x = cloud.nx * span - w + scene.parallaxX * depthShift;
      const bob = scene.reducedMotion
        ? 0
        : Math.sin(scene.time * 0.12 + cloud.bobPhase) * cloud.bobAmount * height;
      const y = cloud.ny * height + bob + scene.parallaxY * depthShift;

      if (x + w < 0 || x > width) continue;

      const alpha =
        cloud.alpha *
        fade *
        lerp(0.42, 0.92, coverage) *
        lerp(0.75, 1, cloud.layer) *
        lerp(1, 1.15, clamp01(scene.weather.cloudDarkness));

      ctx.globalAlpha = clamp01(alpha);
      ctx.drawImage(sprite.canvas, x, y, w, h);
    }
    ctx.restore();
  }

  private ensureTint(color: RGB): void {
    if (this.tintValid) {
      if (colorDistanceSq(color, this.tintColor) < RETINT_THRESHOLD) return;
      // Cheap, but not free: six sprites × three composite passes. Cap the rate
      // so a fast sunset cannot turn re-tinting into the frame's biggest cost.
      const now = performance.now();
      if (now - this.lastTintAt < RETINT_MIN_INTERVAL_MS) return;
      this.lastTintAt = now;
    } else {
      this.lastTintAt = performance.now();
    }

    this.tinted = this.base.map((sprite) => ({
      canvas: tintSprite(sprite.canvas, color),
      aspect: sprite.aspect,
      spanScale: sprite.spanScale,
    }));
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

/** Canvas 2D filters are not universal (older Safari); detect once. */
let canvasFilterSupport: boolean | null = null;

function supportsCanvasFilter(): boolean {
  if (canvasFilterSupport !== null) return canvasFilterSupport;
  const probe = document.createElement('canvas').getContext('2d');
  canvasFilterSupport = !!probe && typeof probe.filter === 'string';
  return canvasFilterSupport;
}

/**
 * Blur a whole canvas in one pass.
 *
 * Blurring the finished silhouette – rather than drawing each lobe with a soft
 * gradient – is the entire trick. Soft translucent lobes never merge: they stay
 * legible as separate discs, and where two of them drift across each other the
 * overlap brightens and dims. That is what the clouds used to do.
 */
function blurCanvas(source: HTMLCanvasElement, radius: number): HTMLCanvasElement {
  const out = document.createElement('canvas');
  out.width = source.width;
  out.height = source.height;
  const ctx = out.getContext('2d');
  if (!ctx) return source;

  if (supportsCanvasFilter()) {
    ctx.filter = `blur(${radius.toFixed(2)}px)`;
    ctx.drawImage(source, 0, 0);
    ctx.filter = 'none';
    return out;
  }

  // Fallback: draw the image far off-canvas and keep only its shadow, which is
  // a blurred copy. Supported everywhere canvas is.
  const offset = source.width * 3;
  ctx.shadowColor = 'rgba(255,255,255,1)';
  ctx.shadowBlur = radius * 2;
  ctx.shadowOffsetX = offset;
  ctx.drawImage(source, -offset, 0);
  return out;
}

/**
 * Builds one grayscale cloud.
 *
 *   1. an opaque silhouette of overlapping lobes – opaque so they union into a
 *      single shape instead of reading as separate discs
 *   2. one blur pass over that silhouette, which is what makes it look like
 *      vapour rather than geometry
 *   3. vertical shading painted back on with `source-atop`, so the base is
 *      heavy and the crown catches light
 *   4. a soft, flat-ish base
 *
 * The result is grayscale, which keeps the internal shading intact when the
 * sprite is later tinted with the sky colour.
 */
function createCloudSprite(
  width: number,
  height: number,
  rng: () => number,
  style: CloudStyle
): HTMLCanvasElement {
  const solid = document.createElement('canvas');
  solid.width = width;
  solid.height = height;
  const sctx = solid.getContext('2d');
  if (!sctx) return solid;

  const cumulus = style === 'cumulus';
  const blur = height * (cumulus ? 0.055 : 0.045);
  // Leave room for the blur to spread without clipping at the sprite edge.
  const margin = blur * 2.2;
  const baseY = height - margin - height * (cumulus ? 0.04 : 0.06);
  const ceiling = margin;
  const usable = width - margin * 2;

  sctx.fillStyle = '#ffffff';

  // Lobes sit at regular intervals with jitter. Purely random placement leaves
  // gaps, and a gap in a cloud silhouette reads as a row of separate dots –
  // which is exactly how the old thin stratus sprites looked.
  const lobes = cumulus ? 10 : 16;
  const spacing = usable / (lobes - 1);
  let maxLift = 0;

  for (let i = 0; i < lobes; i++) {
    const t = i / (lobes - 1);
    const cx = margin + t * usable + (rng() - 0.5) * spacing * 0.6;

    // Tallest in the middle, tapering to the sides.
    const taper = Math.pow(Math.sin(Math.PI * clamp01(t)), cumulus ? 0.5 : 0.35);
    const headroom = (baseY - ceiling) * (cumulus ? 1 : 0.78);
    const lift = headroom * taper * randomBetween(rng, 0.62, 1);
    maxLift = Math.max(maxLift, lift);

    const ry = Math.max(2, lift * randomBetween(rng, 0.46, 0.66));
    const rx = ry * randomBetween(rng, cumulus ? 1.1 : 1.9, cumulus ? 1.75 : 3);
    const cy = baseY - lift + ry;

    sctx.beginPath();
    sctx.ellipse(cx, cy, rx, ry, 0, 0, TAU);
    sctx.fill();
  }

  // A slab across the bottom turns the row of scalloped lobe undersides into
  // the flat base a real cloud has.
  const slabTop = baseY - maxLift * (cumulus ? 0.34 : 0.42);
  sctx.fillRect(margin + usable * 0.04, slabTop, usable * 0.92, baseY - slabTop);

  const soft = blurCanvas(solid, blur);
  const ctx = soft.getContext('2d');
  if (!ctx) return soft;

  // Vertical shading. `source-atop` replaces colour and keeps the silhouette's
  // alpha, so the shape stays exactly as blurred.
  ctx.globalCompositeOperation = 'source-atop';
  const shade = ctx.createLinearGradient(0, ceiling, 0, baseY);
  shade.addColorStop(0, 'rgb(255,255,255)');
  shade.addColorStop(0.42, 'rgb(238,240,244)');
  shade.addColorStop(0.78, 'rgb(196,201,211)');
  shade.addColorStop(1, 'rgb(152,159,174)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, width, height);

  // A couple of lit crowns so the cloud is not a flat gradient.
  const highlights = cumulus ? 3 : 2;
  for (let i = 0; i < highlights; i++) {
    const hx = margin + usable * randomBetween(rng, 0.22, 0.78);
    const hy = baseY - maxLift * randomBetween(rng, 0.55, 0.95);
    const hr = height * randomBetween(rng, 0.18, 0.32);
    const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
    glow.addColorStop(0, 'rgba(255,255,255,0.55)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(hx, hy, hr, 0, TAU);
    ctx.fill();
  }

  // Soften the base so the slab does not end in a straight cut.
  //
  // The mask has to span the whole canvas: `destination-in` erases wherever the
  // source is transparent, so filling only the bottom strip would wipe the
  // entire cloud above it.
  ctx.globalCompositeOperation = 'destination-in';
  const fadeStart = clamp01((baseY - blur * 1.5) / height);
  const fadeEnd = clamp01((baseY + blur * 1.2) / height);
  const baseMask = ctx.createLinearGradient(0, 0, 0, height);
  baseMask.addColorStop(0, 'rgba(0,0,0,1)');
  baseMask.addColorStop(fadeStart, 'rgba(0,0,0,1)');
  baseMask.addColorStop(Math.max(fadeEnd, fadeStart + 0.001), 'rgba(0,0,0,0)');
  baseMask.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = baseMask;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'source-over';
  return soft;
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
