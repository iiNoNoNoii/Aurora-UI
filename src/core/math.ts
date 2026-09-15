/** Small math helpers shared by the scene and the renderers. */

export const TAU = Math.PI * 2;

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Linear 0..1 ramp between `edge0` and `edge1`. */
export function linstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x < edge0 ? 0 : 1;
  return clamp01((x - edge0) / (edge1 - edge0));
}

/** Hermite 0..1 ramp – the workhorse for smooth sky transitions. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = linstep(edge0, edge1, x);
  return t * t * (3 - 2 * t);
}

/**
 * Frame-rate independent exponential approach.
 * `halfLife` is the time in seconds it takes to cover half the remaining distance.
 */
export function damp(current: number, target: number, halfLife: number, dt: number): number {
  if (halfLife <= 0) return target;
  const t = 1 - Math.pow(2, -dt / halfLife);
  return current + (target - current) * t;
}

/** Deterministic 32-bit PRNG (mulberry32) so scenes look identical across reloads. */
export function createRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function random(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomBetween(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

/** Wrap `value` into [0, range). */
export function wrap(value: number, range: number): number {
  const r = value % range;
  return r < 0 ? r + range : r;
}

export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}
