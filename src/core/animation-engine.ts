/**
 * A single requestAnimationFrame loop with an optional frame cap.
 *
 * Everything about it is designed to be safely torn down: `stop()` cancels the
 * pending frame and the engine holds no listeners of its own – the owner
 * (AuroraLayer) decides when to pause.
 */
export type FrameCallback = (dtSeconds: number, timeSeconds: number) => void;

export class AnimationEngine {
  private frameHandle: number | null = null;
  private running = false;
  private lastFrame = 0;
  private startTime = 0;
  /** Accumulated "virtual" time – does not advance while paused. */
  private elapsed = 0;
  private minFrameMs = 0;
  private accumulator = 0;

  constructor(private readonly callback: FrameCallback) {}

  get isRunning(): boolean {
    return this.running;
  }

  setMaxFps(fps: number): void {
    // A little headroom: capping at exactly 16.67 ms drops every other frame
    // on 60 Hz displays because of rAF jitter.
    this.minFrameMs = fps > 0 && fps < 120 ? 1000 / fps - 1.5 : 0;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrame = 0;
    this.startTime = 0;
    this.accumulator = 0;
    this.frameHandle = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    if (this.frameHandle !== null) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  private readonly tick = (now: number): void => {
    if (!this.running) return;
    this.frameHandle = requestAnimationFrame(this.tick);

    if (this.startTime === 0) {
      this.startTime = now;
      this.lastFrame = now;
      return;
    }

    const rawDelta = now - this.lastFrame;

    if (this.minFrameMs > 0) {
      this.accumulator += rawDelta;
      this.lastFrame = now;
      if (this.accumulator < this.minFrameMs) return;
      // Never let a long pause turn into a giant time step.
      const dt = Math.min(this.accumulator, 100) / 1000;
      this.accumulator = 0;
      this.elapsed += dt;
      this.callback(dt, this.elapsed);
      return;
    }

    this.lastFrame = now;
    const dt = Math.min(rawDelta, 100) / 1000;
    this.elapsed += dt;
    this.callback(dt, this.elapsed);
  };
}
