import type { Renderer, SceneState } from '../core/types';
import { TAU, clamp01 } from '../core/math';

/**
 * The moon is rendered into a small offscreen canvas so the phase shadow can be
 * cut out with `destination-out` without punching a hole into the sky behind it.
 * The buffer is only redrawn when the phase actually changes – in practice a
 * handful of times per night.
 */
export class MoonRenderer implements Renderer {
  readonly name = 'moon';

  private buffer: HTMLCanvasElement | null = null;
  private bufferCtx: CanvasRenderingContext2D | null = null;
  private bufferSize = 0;
  private drawnPhase = -1;

  setup(): void {
    this.drawnPhase = -1;
  }

  resize(): void {
    this.drawnPhase = -1;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    if (!scene.moonVisible) return;

    const visibility = clamp01(scene.nightFactor) * (1 - clamp01(scene.weather.cloudCover) * 0.8);
    if (visibility <= 0.03) return;

    const shortSide = Math.min(scene.width, scene.height);
    const radius = Math.max(12, shortSide * 0.035);
    const size = Math.ceil(radius * 2 + 4);

    const bufferCtx = this.ensureBuffer(size);
    if (!bufferCtx || !this.buffer) return;

    const quantisedPhase = Math.round(scene.moonPhase * 200) / 200;
    if (quantisedPhase !== this.drawnPhase) {
      this.drawMoon(bufferCtx, size, radius, quantisedPhase);
      this.drawnPhase = quantisedPhase;
    }

    const x = scene.moonX * scene.width;
    const y = scene.moonY * scene.height;

    ctx.save();

    // Halo first, additively, so it blends into the night sky.
    ctx.globalCompositeOperation = 'lighter';
    const haloRadius = radius * 5;
    const haloAlpha = 0.14 * visibility * scene.appearance.ambient_glow;
    const halo = ctx.createRadialGradient(x, y, radius * 0.6, x, y, haloRadius);
    halo.addColorStop(0, `rgba(200,220,255,${haloAlpha.toFixed(3)})`);
    halo.addColorStop(1, 'rgba(200,220,255,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, haloRadius, 0, TAU);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = visibility;
    ctx.drawImage(this.buffer, x - size / 2, y - size / 2);

    ctx.restore();
  }

  private ensureBuffer(size: number): CanvasRenderingContext2D | null {
    if (this.buffer && this.bufferSize === size) return this.bufferCtx;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    this.buffer = canvas;
    this.bufferCtx = canvas.getContext('2d');
    this.bufferSize = size;
    this.drawnPhase = -1;
    return this.bufferCtx;
  }

  /**
   * Draws the lit part of the moon for `phase`
   * (0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter).
   */
  private drawMoon(
    ctx: CanvasRenderingContext2D,
    size: number,
    radius: number,
    phase: number
  ): void {
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Full disc with limb darkening.
    const disc = ctx.createRadialGradient(
      cx - radius * 0.25,
      cy - radius * 0.25,
      radius * 0.1,
      cx,
      cy,
      radius
    );
    disc.addColorStop(0, '#fffdf3');
    disc.addColorStop(0.75, '#eceadd');
    disc.addColorStop(1, '#cfd3cc');
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, TAU);
    ctx.fill();

    // A few maria so it does not read as a plain circle.
    ctx.fillStyle = 'rgba(148,153,150,0.22)';
    const maria: [number, number, number][] = [
      [-0.28, -0.2, 0.3],
      [0.22, -0.32, 0.18],
      [0.12, 0.28, 0.26],
      [-0.35, 0.3, 0.16],
    ];
    for (const [mx, my, mr] of maria) {
      ctx.beginPath();
      ctx.arc(cx + mx * radius, cy + my * radius, mr * radius, 0, TAU);
      ctx.fill();
    }

    // Illuminated fraction, 0 (new) .. 1 (full).
    const illumination = (1 - Math.cos(phase * TAU)) / 2;

    if (illumination < 0.99) {
      // Northern-hemisphere convention: a waxing moon is lit on the right.
      const waxing = phase < 0.5;
      const darkOnLeft = waxing;
      // Half-width of the terminator ellipse: 0 at half moon, r at new/full.
      const terminatorWidth = Math.abs(1 - illumination * 2) * radius;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      // `destination-out` erases by the *source alpha*, so this has to be fully
      // opaque – inheriting the translucent maria fill would only dim the
      // shadow instead of cutting it away.
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.beginPath();
      // Half circle on the dark limb (top -> bottom).
      ctx.arc(cx, cy, radius + 1, -Math.PI / 2, Math.PI / 2, darkOnLeft);
      // Terminator ellipse back from bottom to top. Which half it sweeps
      // decides whether the shadow bulges into the lit side (crescent) or
      // retreats from the dark limb (gibbous).
      const ellipseCounterClockwise = darkOnLeft ? illumination < 0.5 : illumination >= 0.5;
      ctx.ellipse(
        cx,
        cy,
        terminatorWidth,
        radius + 1,
        0,
        Math.PI / 2,
        -Math.PI / 2,
        ellipseCounterClockwise
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Feather the outer edge so the disc does not look stamped on.
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    const mask = ctx.createRadialGradient(cx, cy, radius * 0.88, cx, cy, radius);
    mask.addColorStop(0, 'rgba(0,0,0,1)');
    mask.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = mask;
    ctx.fillRect(0, 0, size, size);
    ctx.restore();
  }

  destroy(): void {
    this.buffer = null;
    this.bufferCtx = null;
    this.bufferSize = 0;
  }
}
