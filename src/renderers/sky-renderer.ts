import type { Renderer, SceneState } from '../core/types';
import { rgbToCss } from '../core/color';
import { clamp01 } from '../core/math';

/**
 * The base gradient. Everything else is painted on top of this.
 *
 * A `CanvasGradient` is recreated whenever the size or the colours change –
 * building one is cheap, but doing it 60× per second for no reason is not.
 */
export class SkyRenderer implements Renderer {
  readonly name = 'sky';

  private gradient: CanvasGradient | null = null;
  private cacheKey = '';

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
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, rgbToCss(palette.zenith));
      gradient.addColorStop(0.28, rgbToCss(palette.upper));
      gradient.addColorStop(0.55, rgbToCss(palette.middle));
      gradient.addColorStop(0.82, rgbToCss(palette.lower));
      gradient.addColorStop(1, rgbToCss(palette.horizon));
      this.gradient = gradient;
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
  }

  destroy(): void {
    this.gradient = null;
  }
}
