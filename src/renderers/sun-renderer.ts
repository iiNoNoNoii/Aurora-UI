import type { Renderer, SceneState } from '../core/types';
import { rgbToCss } from '../core/color';
import { TAU, clamp01, lerp } from '../core/math';

/**
 * Sun disc + halo + the warm glow that spills along the horizon.
 *
 * The glow is drawn even when the disc itself is hidden behind clouds – that is
 * what makes an overcast sunset still read as a sunset.
 */
export class SunRenderer implements Renderer {
  readonly name = 'sun';

  setup(): void {
    /* stateless */
  }

  resize(): void {
    /* stateless */
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const { palette, width, height, appearance } = scene;

    const horizonGlow =
      clamp01(scene.dayFactor * 0.35 + scene.twilightFactor) *
      appearance.ambient_glow *
      lerp(0.45, 1, clamp01(scene.weather.sunVisibility));

    if (horizonGlow > 0.01) {
      const glowX = clamp01(scene.sunX) * width;
      const glowY = height * lerp(1.02, 0.55, clamp01(scene.dayFactor));
      const radius = Math.max(width, height) * lerp(0.55, 0.95, scene.twilightFactor);

      const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius);
      gradient.addColorStop(0, rgbToCss(palette.sunGlow, 0.5 * horizonGlow));
      gradient.addColorStop(0.35, rgbToCss(palette.sunGlow, 0.22 * horizonGlow));
      gradient.addColorStop(1, rgbToCss(palette.sunGlow, 0));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // The disc only exists once the sun is actually up.
    const discVisibility =
      clamp01((scene.sunElevation + 1.5) / 4) * clamp01(scene.weather.sunVisibility);
    if (discVisibility <= 0.02) return;

    // Effectively at infinity: the sun barely reacts to parallax.
    const x = scene.sunX * width + scene.parallaxX * 0.12;
    const y = scene.sunY * height + scene.parallaxY * 0.12;
    const shortSide = Math.min(width, height);
    const discRadius = Math.max(14, shortSide * 0.045);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    // Layered halo: more passes = softer falloff, and it is the first thing we
    // give up on low-end hardware.
    const passes = scene.quality.sunGlowPasses;
    for (let i = passes; i >= 1; i--) {
      const factor = i / passes;
      const radius = discRadius * (2.2 + factor * 9);
      const alpha = 0.1 * discVisibility * appearance.ambient_glow * (1 - factor * 0.55);
      const gradient = ctx.createRadialGradient(x, y, discRadius * 0.4, x, y, radius);
      gradient.addColorStop(0, rgbToCss(palette.sunGlow, alpha));
      gradient.addColorStop(1, rgbToCss(palette.sunGlow, 0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
    }

    const core = ctx.createRadialGradient(x, y, 0, x, y, discRadius);
    core.addColorStop(0, rgbToCss(palette.sunCore, discVisibility));
    core.addColorStop(0.7, rgbToCss(palette.sunCore, 0.85 * discVisibility));
    core.addColorStop(1, rgbToCss(palette.sunGlow, 0));
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(x, y, discRadius, 0, TAU);
    ctx.fill();

    ctx.restore();
  }

  destroy(): void {
    /* stateless */
  }
}
