import type { QualityLevel } from './types';
import { stepQuality } from './config';

const ORDER: QualityLevel[] = ['low', 'medium', 'high', 'ultra'];

function qualityIndex(level: QualityLevel): number {
  return ORDER.indexOf(level);
}

/**
 * Watches the real frame cost and nudges the quality level up or down.
 *
 * It is intentionally slow to react: a wallpanel that briefly stutters while a
 * dashboard loads should not permanently drop to `low`.
 */
export class PerformanceManager {
  private frameTimes: number[] = [];
  private lastDecision = 0;
  private fpsSamples = 0;
  private fpsAccum = 0;
  private fpsWindowStart = 0;
  /**
   * Once we had to drop a level we never climb back past it, otherwise the
   * manager oscillates between two levels forever.
   */
  private ceiling: QualityLevel;

  /** Smoothed frames per second, for the debug overlay. */
  fps = 0;

  constructor(
    private level: QualityLevel,
    private enabled: boolean,
    private readonly targetFps: number
  ) {
    // Start generous: the manager may climb up to `ultra` on a strong machine,
    // but the ceiling drops permanently the first time we have to scale back.
    this.ceiling = 'ultra';
  }

  get quality(): QualityLevel {
    return this.level;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /** Force a level (config change / user override) and reset the history. */
  setQuality(level: QualityLevel): void {
    this.level = level;
    this.ceiling = 'ultra';
    this.reset();
  }

  reset(): void {
    this.frameTimes.length = 0;
    this.lastDecision = performance.now();
    this.fpsSamples = 0;
    this.fpsAccum = 0;
    this.fpsWindowStart = performance.now();
  }

  /**
   * Feed one frame. Returns the new quality level when it changed, else null.
   * `frameCost` is the time spent inside our own render call, in ms.
   */
  sample(dt: number, frameCost: number): QualityLevel | null {
    const now = performance.now();

    if (dt > 0) {
      this.fpsAccum += 1 / dt;
      this.fpsSamples++;
    }
    if (now - this.fpsWindowStart >= 500) {
      this.fps = this.fpsSamples > 0 ? this.fpsAccum / this.fpsSamples : 0;
      this.fpsAccum = 0;
      this.fpsSamples = 0;
      this.fpsWindowStart = now;
    }

    if (!this.enabled) return null;

    this.frameTimes.push(frameCost);
    if (this.frameTimes.length > 180) this.frameTimes.shift();

    // Decide at most every 5 seconds, and only with a full-ish window.
    if (now - this.lastDecision < 5000 || this.frameTimes.length < 60) return null;
    this.lastDecision = now;

    const sorted = [...this.frameTimes].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const budget = 1000 / this.targetFps;

    // Spending more than 55 % of the frame budget on the background is too much.
    if (median > budget * 0.55) {
      const next = stepQuality(this.level, -1);
      if (next !== this.level) {
        this.level = next;
        this.ceiling = next;
        this.frameTimes.length = 0;
        return next;
      }
    } else if (median < budget * 0.18) {
      const next = stepQuality(this.level, 1);
      if (next !== this.level && qualityIndex(next) <= qualityIndex(this.ceiling)) {
        this.level = next;
        this.frameTimes.length = 0;
        return next;
      }
    }

    return null;
  }
}
