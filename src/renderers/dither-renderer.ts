import type { Renderer, SceneState } from '../core/types';
import { createRandom } from '../core/math';

const NOISE_TILE = 128;
const NOISE_SEED = 0xd17e12;

/**
 * One pixel of static noise over the finished frame.
 *
 * An 8-bit gradient across a whole screen bands, badly, and every soft glow in
 * the scene has the same problem: a radial gradient at very low alpha quantises
 * into visible rings and blocks. Dithering the *composited* result fixes all of
 * them at once — the sky, the Milky Way, the sun halo, the ray fan — which is
 * why this runs last rather than being part of the sky.
 *
 * Drawn with the transform reset so the tile lands on device pixels. Dither
 * only works at 1:1; scaled up it becomes visible grain.
 */
export class DitherRenderer implements Renderer {
  readonly name = 'dither';

  private pattern: CanvasPattern | null = null;
  private tile: HTMLCanvasElement | null = null;

  setup(): void {
    /* the tile is built lazily, once */
  }

  resize(): void {
    /* the pattern repeats; nothing depends on size */
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    if (!this.pattern) {
      this.tile = createNoiseTile(NOISE_TILE);
      this.pattern = ctx.createPattern(this.tile, 'repeat');
      if (!this.pattern) return;
    }

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.pattern;
    ctx.fillRect(0, 0, scene.width * scene.pixelRatio, scene.height * scene.pixelRatio);
    ctx.restore();
  }

  destroy(): void {
    this.pattern = null;
    this.tile = null;
  }
}

/**
 * Half the pixels lighten, half darken, by about one 8-bit step – enough to
 * dissolve a band, far too little to read as grain.
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
    const value = rng() < 0.5 ? 255 : 0;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = Math.round(rng() * 3);
  }

  ctx.putImageData(image, 0, 0);
  return canvas;
}
