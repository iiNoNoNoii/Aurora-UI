import type { Renderer, SceneState } from '../core/types';
import { TAU, clamp01, createRandom, lerp, randomBetween, wrap } from '../core/math';
import { equatorialToHorizontal, galacticToEquatorial } from '../core/celestial';
import { projectAltAz } from '../core/projection';

const MILKYWAY_SEED = 0x6a1a; // "gala"
/** Patches sampled along the galactic plane. */
const PATCH_COUNT = 460;
const RECOMPUTE_INTERVAL_SECONDS = 20;

interface Patch {
  /** Galactic longitude and latitude, degrees. */
  l: number;
  b: number;
  /** 0..1 before the sky's own visibility is applied. */
  brightness: number;
  /** Radius as a fraction of the viewport's short side. */
  radius: number;
  /** Dark nebula rather than glowing gas. */
  rift: boolean;
  x: number;
  y: number;
  visible: boolean;
}

/**
 * The Milky Way.
 *
 * Sampled as a few hundred soft patches scattered along the galactic plane and
 * projected exactly like the stars, so the band rises, arcs over and sets with
 * the rest of the sky rather than being a decal pinned to the screen.
 *
 * Brightness follows the real structure in broad strokes: the bulge towards
 * Sagittarius, the long bright run through Cygnus, the thin anticentre, and
 * the Great Rift cutting the band in two between them.
 */
export class MilkyWayRenderer implements Renderer {
  readonly name = 'milkyway';

  private patches: Patch[] = [];
  private sinceRecompute = Number.POSITIVE_INFINITY;
  private lastLatitude = Number.NaN;
  private lastLongitude = Number.NaN;
  private visibleCount = 0;

  setup(): void {
    const rng = createRandom(MILKYWAY_SEED);
    this.patches = new Array(PATCH_COUNT);

    for (let i = 0; i < PATCH_COUNT; i++) {
      const l = (i / PATCH_COUNT) * 360 + randomBetween(rng, -1.5, 1.5);
      // The band is thick towards the centre and thin towards the anticentre.
      const centreness = bulgeWeight(l);
      const spread = lerp(4.5, 13, centreness);
      const b = randomBetween(rng, -spread, spread) * randomBetween(rng, 0.5, 1);

      // Patches away from the plane are fainter.
      const heightFade = 1 - clamp01(Math.abs(b) / (spread + 2)) ** 1.4;
      const structure = brightnessAt(l);

      // The Great Rift: dust lanes in front of the bright inner arm.
      const inRift = isRift(l) && Math.abs(b) < 5.5;
      const rift = inRift && rng() < 0.55;

      this.patches[i] = {
        l,
        b,
        brightness: clamp01(structure * heightFade * randomBetween(rng, 0.55, 1)),
        // Small and numerous. Large patches read as separate discs, exactly
        // the way the old cloud blobs did.
        radius: randomBetween(rng, 0.02, 0.046) * lerp(0.8, 1.25, centreness),
        rift,
        x: 0,
        y: 0,
        visible: false,
      };
    }

    this.sinceRecompute = Number.POSITIVE_INFINITY;
  }

  resize(): void {
    /* positions are normalised */
  }

  particleCount(): number {
    return this.visibleCount;
  }

  render(ctx: CanvasRenderingContext2D, scene: SceneState): void {
    // Only on a properly dark, clear night – the real thing disappears under
    // any moon, cloud or twilight, and so should this.
    const moonWash = scene.moonVisible ? 0.45 : 0;
    const visibility =
      clamp01(scene.nightFactor) ** 1.6 *
      (1 - clamp01(scene.weather.cloudCover) * 0.95) *
      (1 - moonWash) *
      clamp01(scene.appearance.intensity);

    if (visibility <= 0.03) {
      this.visibleCount = 0;
      return;
    }

    this.sinceRecompute += scene.dt;
    if (
      this.sinceRecompute >= RECOMPUTE_INTERVAL_SECONDS ||
      scene.latitude !== this.lastLatitude ||
      scene.longitude !== this.lastLongitude
    ) {
      this.recompute(scene);
    }

    const { width, height } = scene;
    const shortSide = Math.min(width, height);

    let visible = 0;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const patch of this.patches) {
      if (!patch.visible || patch.rift) continue;
      const alpha = patch.brightness * visibility * 0.085;
      if (alpha <= 0.004) continue;
      visible++;

      const x = patch.x * width + scene.parallaxX * 0.15;
      const y = patch.y * height + scene.parallaxY * 0.15;
      const r = patch.radius * shortSide;

      const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
      glow.addColorStop(0, `rgba(203,214,242,${alpha.toFixed(4)})`);
      glow.addColorStop(0.5, `rgba(178,192,229,${(alpha * 0.45).toFixed(4)})`);
      glow.addColorStop(1, 'rgba(160,176,220,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    }

    // Dust lanes are drawn after the glow, and subtract from it.
    ctx.globalCompositeOperation = 'destination-out';
    for (const patch of this.patches) {
      if (!patch.visible || !patch.rift) continue;
      const alpha = patch.brightness * visibility * 0.055;
      if (alpha <= 0.004) continue;

      const x = patch.x * width + scene.parallaxX * 0.15;
      const y = patch.y * height + scene.parallaxY * 0.15;
      const r = patch.radius * shortSide * 0.8;

      const lane = ctx.createRadialGradient(x, y, 0, x, y, r);
      lane.addColorStop(0, `rgba(0,0,0,${alpha.toFixed(4)})`);
      lane.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lane;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU);
      ctx.fill();
    }

    ctx.restore();
    this.visibleCount = visible;
  }

  private recompute(scene: SceneState): void {
    this.sinceRecompute = 0;
    this.lastLatitude = scene.latitude;
    this.lastLongitude = scene.longitude;

    const now = new Date();
    for (const patch of this.patches) {
      const { ra, dec } = galacticToEquatorial(patch.l, patch.b);
      const { altitude, azimuth } = equatorialToHorizontal(
        ra,
        dec,
        scene.latitude,
        scene.longitude,
        now
      );
      const point = projectAltAz(altitude, azimuth);
      patch.x = point.x;
      patch.y = point.y;
      patch.visible = altitude > 4 && point.inView;
    }
  }

  destroy(): void {
    this.patches = [];
    this.visibleCount = 0;
  }
}

/** How close a galactic longitude is to the bright inner galaxy. 0..1. */
function bulgeWeight(l: number): number {
  const fromCentre = Math.abs(((wrap(l, 360) + 180) % 360) - 180);
  return clamp01(1 - fromCentre / 110);
}

/**
 * Broad-strokes surface brightness along the plane: a bulge around Sagittarius
 * at l = 0, a second rise through Cygnus near l = 80, and a thin anticentre.
 */
function brightnessAt(l: number): number {
  const centre = bulgeWeight(l);
  const cygnusDistance = Math.abs(((wrap(l - 80, 360) + 180) % 360) - 180);
  const cygnus = clamp01(1 - cygnusDistance / 45) * 0.55;
  return clamp01(0.22 + centre * 0.85 + cygnus);
}

/** The Great Rift runs roughly from Cygnus down to Sagittarius. */
function isRift(l: number): boolean {
  const x = wrap(l, 360);
  return x > 10 && x < 80;
}
