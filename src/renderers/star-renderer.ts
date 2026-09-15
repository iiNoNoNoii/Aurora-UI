import type { Renderer, SceneState } from '../core/types';
import { TAU, clamp01, createRandom, randomBetween } from '../core/math';

interface Star {
  /** Normalised position so a resize never re-rolls the star field. */
  nx: number;
  ny: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  /** 0 = white, 1 = warm/cool tinted. */
  tint: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
}

const STAR_SEED = 0x5eed51;

export class StarRenderer implements Renderer {
  readonly name = 'stars';

  private stars: Star[] = [];
  private shooting: ShootingStar[] = [];
  private nextShootingStar = 12;

  setup(scene: SceneState): void {
    const rng = createRandom(STAR_SEED);
    const count = scene.quality.starCount;
    this.stars = new Array(count);

    for (let i = 0; i < count; i++) {
      // Bias toward the upper part of the sky – stars near the horizon are
      // washed out by ambient light anyway.
      const ny = Math.pow(rng(), 1.6) * 0.82;
      this.stars[i] = {
        nx: rng(),
        ny,
        radius: randomBetween(rng, 0.4, 1.5),
        baseAlpha: randomBetween(rng, 0.35, 1),
        twinkleSpeed: randomBetween(rng, 0.4, 2.2),
        twinklePhase: rng() * TAU,
        tint: rng(),
      };
    }
  }

  resize(): void {
    // Positions are normalised – nothing to do.
  }

  particleCount(): number {
    return this.stars.length + this.shooting.length;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    const visibility =
      clamp01(scene.nightFactor) * (1 - clamp01(scene.weather.cloudCover) * 0.85) *
      clamp01(scene.appearance.intensity);

    if (visibility <= 0.01) {
      this.shooting.length = 0;
      return;
    }

    const { width, height } = scene;
    const twinkleEnabled = !scene.reducedMotion;
    // Stars are the furthest thing in the scene, so they barely move.
    const offsetX = scene.parallaxX * 0.15;
    const offsetY = scene.parallaxY * 0.15;

    ctx.save();
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const x = star.nx * width + offsetX;
      const y = star.ny * height + offsetY;

      let alpha = star.baseAlpha * visibility;
      if (twinkleEnabled) {
        const t = Math.sin(scene.time * star.twinkleSpeed + star.twinklePhase);
        alpha *= 0.62 + 0.38 * t;
      }
      if (alpha <= 0.02) continue;

      // Subtle colour variation keeps the field from looking like noise.
      const r = 255;
      const g = 245 + Math.round(star.tint * 8);
      const b = 225 + Math.round((1 - star.tint) * 30);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;

      if (star.radius <= 0.7) {
        // fillRect is measurably cheaper than arc() for 1 px stars.
        ctx.fillRect(x, y, 1, 1);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, star.radius, 0, TAU);
        ctx.fill();
      }
    }
    ctx.restore();

    if (scene.effects.shooting_stars && scene.quality.shootingStars && !scene.reducedMotion) {
      this.updateShootingStars(ctx, scene, visibility);
    }
  }

  private updateShootingStars(
    ctx: CanvasRenderingContext2D,
    scene: SceneState,
    visibility: number
  ): void {
    const { width, height, dt } = scene;

    this.nextShootingStar -= dt;
    if (this.nextShootingStar <= 0 && this.shooting.length < 2) {
      this.nextShootingStar = 14 + Math.random() * 40;
      const speed = 380 + Math.random() * 320;
      const angle = 0.35 + Math.random() * 0.35;
      this.shooting.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.5,
        length: 60 + Math.random() * 90,
      });
    }

    for (let i = this.shooting.length - 1; i >= 0; i--) {
      const s = this.shooting[i];
      s.life += dt;
      if (s.life >= s.maxLife) {
        this.shooting.splice(i, 1);
        continue;
      }
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      const progress = s.life / s.maxLife;
      const alpha = Math.sin(progress * Math.PI) * visibility;
      const dirX = s.vx === 0 && s.vy === 0 ? 0 : s.vx;
      const norm = Math.hypot(dirX, s.vy) || 1;
      const tailX = s.x - (dirX / norm) * s.length;
      const tailY = s.y - (s.vy / norm) * s.length;

      const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255,255,255,${alpha.toFixed(3)})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
    }
  }

  destroy(): void {
    this.stars.length = 0;
    this.shooting.length = 0;
  }
}
