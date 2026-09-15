import type { Renderer, SceneState } from '../core/types';
import { clamp01, createRandom, lerp, randomBetween } from '../core/math';

const BOLT_SEED = 0xb017;

/** One flash inside a strike: when it happens and how bright it gets. */
interface Flash {
  at: number;
  peak: number;
  duration: number;
}

interface Strike {
  elapsed: number;
  total: number;
  flashes: Flash[];
  /** Horizontal centre of the illumination, 0..1. */
  x: number;
  /** How far down the sky the light comes from, 0..1. */
  y: number;
  bolt: { x: number; y: number }[] | null;
  branches: { x: number; y: number }[][];
  boltVisibleUntil: number;
}

/**
 * Lightning.
 *
 * Deliberately restrained: a strike is two to four short flashes with a soft
 * falloff, capped well below full white, plus an optional thin bolt. No
 * stroboscopic flicker – this sits behind a dashboard people read.
 */
export class LightningRenderer implements Renderer {
  readonly name = 'lightning';

  private rng = createRandom(BOLT_SEED);
  private strike: Strike | null = null;
  private cooldown = 6;

  setup(): void {
    this.rng = createRandom(BOLT_SEED);
    this.strike = null;
    this.cooldown = randomBetween(this.rng, 4, 12);
  }

  resize(): void {
    // A strike in flight is expressed in normalised coordinates; nothing to do.
  }

  particleCount(): number {
    return this.strike ? 1 : 0;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const amount = clamp01(scene.weather.lightning) * clamp01(scene.appearance.intensity);

    // Reduced motion means no flashing at all – this is the one effect where
    // that preference is a genuine accessibility concern.
    if (amount <= 0.02 || scene.reducedMotion) {
      this.strike = null;
      return;
    }

    const { dt, width, height } = scene;

    if (!this.strike) {
      this.cooldown -= dt * amount;
      if (this.cooldown > 0) return;
      this.strike = this.createStrike(scene);
      // Heavier storms strike more often, but never faster than ~3 s apart.
      this.cooldown = lerp(26, 3, amount) * randomBetween(this.rng, 0.7, 1.4);
    }

    const strike = this.strike;
    strike.elapsed += dt;
    if (strike.elapsed > strike.total) {
      this.strike = null;
      return;
    }

    let brightness = 0;
    for (const flash of strike.flashes) {
      const t = strike.elapsed - flash.at;
      if (t < 0 || t > flash.duration) continue;
      // Fast attack, slower decay – the shape of a real flash.
      const progress = t / flash.duration;
      const envelope = progress < 0.18 ? progress / 0.18 : Math.pow(1 - (progress - 0.18) / 0.82, 2);
      brightness = Math.max(brightness, flash.peak * envelope);
    }
    if (brightness <= 0.004) return;

    const glowX = strike.x * width;
    const glowY = strike.y * height;
    const radius = Math.max(width, height) * 1.15;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const gradient = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, radius);
    gradient.addColorStop(0, `rgba(214,228,255,${(brightness * 0.85).toFixed(4)})`);
    gradient.addColorStop(0.45, `rgba(188,206,246,${(brightness * 0.35).toFixed(4)})`);
    gradient.addColorStop(1, 'rgba(170,190,240,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    if (
      strike.bolt &&
      scene.quality.lightningBolts &&
      strike.elapsed <= strike.boltVisibleUntil &&
      brightness > 0.05
    ) {
      this.drawBolt(ctx, scene, strike, brightness);
    }

    ctx.restore();
  }

  private createStrike(scene: SceneState): Strike {
    const rng = this.rng;
    const flashCount = 2 + Math.floor(rng() * 3);
    const flashes: Flash[] = [];

    let at = 0;
    for (let i = 0; i < flashCount; i++) {
      const duration = randomBetween(rng, 0.09, 0.22);
      flashes.push({
        at,
        duration,
        // The first flash is the strongest; the rest are afterglow. The ceiling
        // is deliberately low – this reads as distant sheet lightning, not as a
        // strobe going off behind someone's dashboard.
        peak: i === 0 ? randomBetween(rng, 0.18, 0.3) : randomBetween(rng, 0.06, 0.14),
      });
      at += duration + randomBetween(rng, 0.04, 0.16);
    }

    const x = randomBetween(rng, 0.12, 0.88);
    const y = randomBetween(rng, 0.05, 0.3);

    // Only some strikes show a visible bolt; distant ones are just sky glow.
    const showBolt = scene.quality.lightningBolts && rng() < 0.55;
    const bolt = showBolt ? buildBolt(rng, x, y, randomBetween(rng, 0.55, 0.85)) : null;
    const branches: { x: number; y: number }[][] = [];

    if (bolt) {
      const branchCount = Math.floor(rng() * 3);
      for (let i = 0; i < branchCount; i++) {
        const from = bolt[1 + Math.floor(rng() * (bolt.length - 2))];
        branches.push(
          buildBolt(rng, from.x, from.y, from.y + randomBetween(rng, 0.08, 0.22), 0.45)
        );
      }
    }

    return {
      elapsed: 0,
      total: at + 0.3,
      flashes,
      x,
      y,
      bolt,
      branches,
      boltVisibleUntil: flashes[0].duration * 1.6,
    };
  }

  private drawBolt(
    ctx: CanvasRenderingContext2D,
    scene: SceneState,
    strike: Strike,
    brightness: number
  ): void {
    const { width, height } = scene;
    const alpha = clamp01(brightness * 4);

    const trace = (points: { x: number; y: number }[]): void => {
      ctx.beginPath();
      ctx.moveTo(points[0].x * width, points[0].y * height);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x * width, points[i].y * height);
      }
      ctx.stroke();
    };

    const shortSide = Math.min(width, height);

    // Wide, soft glow pass.
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = `rgba(150,180,255,${(alpha * 0.28).toFixed(4)})`;
    ctx.lineWidth = Math.max(4, shortSide * 0.012);
    if (strike.bolt) trace(strike.bolt);

    // Bright core.
    ctx.strokeStyle = `rgba(240,246,255,${(alpha * 0.9).toFixed(4)})`;
    ctx.lineWidth = Math.max(1.2, shortSide * 0.0022);
    if (strike.bolt) trace(strike.bolt);

    ctx.strokeStyle = `rgba(225,235,255,${(alpha * 0.55).toFixed(4)})`;
    ctx.lineWidth = Math.max(1, shortSide * 0.0015);
    for (const branch of strike.branches) trace(branch);
  }

  destroy(): void {
    this.strike = null;
  }
}

/**
 * Midpoint displacement between a start and an end height. Returns points in
 * normalised (0..1) canvas coordinates.
 */
function buildBolt(
  rng: () => number,
  startX: number,
  startY: number,
  endY: number,
  jaggedness = 1
): { x: number; y: number }[] {
  let points = [
    { x: startX, y: startY },
    { x: startX + randomBetween(rng, -0.06, 0.06) * jaggedness, y: endY },
  ];

  for (let pass = 0; pass < 5; pass++) {
    const next: { x: number; y: number }[] = [points[0]];
    const displacement = 0.045 * jaggedness * Math.pow(0.62, pass);

    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      next.push({
        x: (a.x + b.x) / 2 + randomBetween(rng, -displacement, displacement),
        y: (a.y + b.y) / 2,
      });
      next.push(b);
    }
    points = next;
  }

  return points;
}
