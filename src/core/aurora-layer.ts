import type { AuroraBackgroundConfig, HomeAssistant, QualityLevel } from './types';
import { detectQuality, getQualityProfile } from './config';
import { AnimationEngine } from './animation-engine';
import { PerformanceManager } from './performance-manager';
import { SceneManager } from './scene-manager';
import { DebugOverlay } from '../ui/debug-overlay';
import { readEnvironment } from '../weather/weather-engine';

/** Hard ceiling on backing-store pixels, so 4K wallpanels stay smooth. */
const MAX_BACKING_PIXELS = 4_200_000;

/**
 * One animated canvas inside a host element.
 *
 * Owns every listener it registers and tears all of them down in `destroy()`.
 * The card never talks to the canvas directly.
 */
export class AuroraLayer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D | null;
  private readonly engine: AnimationEngine;
  private readonly performance: PerformanceManager;
  private scene: SceneManager;
  private debugOverlay: DebugOverlay | null = null;

  private config: AuroraBackgroundConfig;
  private hass: HomeAssistant | undefined;

  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private motionQuery: MediaQueryList | null = null;

  private cssWidth = 0;
  private cssHeight = 0;
  private pixelRatio = 1;
  private resizePending = false;
  private visible = true;
  private documentVisible = true;
  private destroyed = false;
  private firstFrame = true;
  /** Wall-clock timer that refreshes the computed sun position without HA. */
  private environmentTimer: number | null = null;

  constructor(
    private readonly host: HTMLElement,
    config: AuroraBackgroundConfig,
    hass: HomeAssistant | undefined
  ) {
    this.config = config;
    this.hass = hass;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'aurora-canvas';
    this.canvas.setAttribute(
      'style',
      'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;'
    );
    this.host.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true });

    const level = this.resolveQuality();
    this.performance = new PerformanceManager(
      level,
      config.quality === 'auto' && config.performance.auto_quality,
      Math.min(config.performance.max_fps, getQualityProfile(level).maxFps)
    );

    this.scene = new SceneManager(
      config,
      getQualityProfile(level),
      readEnvironment(hass, config)
    );

    this.engine = new AnimationEngine(this.frame);
    this.applyFrameCap();
    this.applyCanvasFilter();

    this.attachListeners();
    this.measure();
    this.scene.snapToTargets();

    if (config.debug) this.debugOverlay = new DebugOverlay(this.host, this.debugTopOffset());

    this.updateRunState();
  }

  /* ---------------------------------------------------------------- *
   * Public API
   * ---------------------------------------------------------------- */

  updateConfig(config: AuroraBackgroundConfig): void {
    if (this.destroyed) return;
    const qualityChanged = config.quality !== this.config.quality;
    const debugChanged = config.debug !== this.config.debug;
    const blurChanged = config.appearance.blur !== this.config.appearance.blur;
    const opacityChanged = config.appearance.opacity !== this.config.appearance.opacity;

    this.config = config;
    this.scene.setConfig(config);

    if (qualityChanged) {
      const level = this.resolveQuality();
      this.performance.setEnabled(config.quality === 'auto' && config.performance.auto_quality);
      this.performance.setQuality(level);
      this.applyQuality(level);
    } else {
      this.performance.setEnabled(config.quality === 'auto' && config.performance.auto_quality);
      this.applyFrameCap();
    }

    if (blurChanged || opacityChanged) this.applyCanvasFilter();

    if (debugChanged) {
      if (config.debug && !this.debugOverlay) {
        this.debugOverlay = new DebugOverlay(this.host, this.debugTopOffset());
      } else if (!config.debug && this.debugOverlay) {
        this.debugOverlay.destroy();
        this.debugOverlay = null;
      }
    }

    this.refreshEnvironment();
    this.updateRunState();
  }

  updateHass(hass: HomeAssistant | undefined): void {
    if (this.destroyed) return;
    this.hass = hass;
    this.refreshEnvironment();
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;

    this.engine.stop();
    this.detachListeners();

    this.debugOverlay?.destroy();
    this.debugOverlay = null;

    this.scene.destroy();
    this.canvas.remove();
  }

  /* ---------------------------------------------------------------- *
   * Internals
   * ---------------------------------------------------------------- */

  /** Keep the overlay clear of the Home Assistant toolbar in background mode. */
  private debugTopOffset(): number {
    return this.config.mode === 'background' ? 76 : 12;
  }

  private resolveQuality(): QualityLevel {
    return this.config.quality === 'auto' ? detectQuality() : this.config.quality;
  }

  private applyQuality(level: QualityLevel): void {
    const profile = getQualityProfile(level);
    this.scene.setQuality(profile);
    this.applyFrameCap();
    this.measure();
  }

  private applyFrameCap(): void {
    const profile = getQualityProfile(this.performance.quality);
    let fps = Math.min(this.config.performance.max_fps, profile.maxFps);
    if (this.scene.sceneState.reducedMotion) fps = Math.min(fps, 20);
    this.engine.setMaxFps(fps);
  }

  private applyCanvasFilter(): void {
    const { blur, opacity } = this.config.appearance;
    this.canvas.style.filter = blur > 0 ? `blur(${blur}px)` : '';
    // A blurred canvas would show its own transparent edges; scale it up a bit.
    this.canvas.style.transform = blur > 0 ? `scale(${1 + blur / 120})` : '';
    this.canvas.style.opacity = opacity >= 1 ? '' : String(opacity);
  }

  private attachListeners(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.host);
    } else {
      window.addEventListener('resize', this.onResize, { passive: true });
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(this.onIntersect, { threshold: 0 });
      this.intersectionObserver.observe(this.host);
    }

    document.addEventListener('visibilitychange', this.onVisibilityChange);

    if (typeof window.matchMedia === 'function') {
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.scene.setReducedMotion(this.motionQuery.matches);
      if (typeof this.motionQuery.addEventListener === 'function') {
        this.motionQuery.addEventListener('change', this.onMotionPreferenceChange);
      } else if (typeof this.motionQuery.addListener === 'function') {
        // Safari < 14.
        this.motionQuery.addListener(this.onMotionPreferenceChange);
      }
    }

    // `sun.sun` only updates every ~30 s, and without the sun integration we
    // compute the position ourselves – refresh once a minute either way.
    this.environmentTimer = window.setInterval(this.refreshEnvironment, 60_000);
  }

  private detachListeners(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    window.removeEventListener('resize', this.onResize);

    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;

    document.removeEventListener('visibilitychange', this.onVisibilityChange);

    if (this.motionQuery) {
      if (typeof this.motionQuery.removeEventListener === 'function') {
        this.motionQuery.removeEventListener('change', this.onMotionPreferenceChange);
      } else if (typeof this.motionQuery.removeListener === 'function') {
        this.motionQuery.removeListener(this.onMotionPreferenceChange);
      }
      this.motionQuery = null;
    }

    if (this.environmentTimer !== null) {
      window.clearInterval(this.environmentTimer);
      this.environmentTimer = null;
    }
  }

  private readonly onMotionPreferenceChange = (event: MediaQueryListEvent): void => {
    this.scene.setReducedMotion(event.matches);
    this.applyFrameCap();
  };

  private readonly onVisibilityChange = (): void => {
    this.documentVisible = document.visibilityState !== 'hidden';
    this.updateRunState();
  };

  private readonly onIntersect = (entries: IntersectionObserverEntry[]): void => {
    for (const entry of entries) {
      if (entry.target === this.host) this.visible = entry.isIntersecting;
    }
    this.updateRunState();
  };

  private readonly onResize = (): void => {
    if (this.resizePending || this.destroyed) return;
    this.resizePending = true;
    requestAnimationFrame(() => {
      this.resizePending = false;
      if (this.destroyed) return;
      this.measure();
      if (!this.engine.isRunning) this.renderOnce();
    });
  };

  private readonly refreshEnvironment = (): void => {
    if (this.destroyed) return;
    this.scene.setEnvironment(readEnvironment(this.hass, this.config));
    if (!this.engine.isRunning) this.renderOnce();
  };

  private updateRunState(): void {
    const shouldRun =
      !this.destroyed &&
      this.cssWidth > 0 &&
      this.cssHeight > 0 &&
      this.visible &&
      (this.documentVisible || !this.config.performance.pause_when_hidden);

    if (shouldRun) {
      this.engine.start();
    } else {
      this.engine.stop();
    }
  }

  private measure(): void {
    const rect = this.host.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));

    const profile = getQualityProfile(this.performance.quality);
    const dpr = Math.min(window.devicePixelRatio || 1, profile.maxDpr);
    let ratio = dpr * profile.renderScale;

    // Never exceed the pixel budget – protects 4K wallpanels and old tablets.
    const pixels = width * height * ratio * ratio;
    if (pixels > MAX_BACKING_PIXELS) {
      ratio *= Math.sqrt(MAX_BACKING_PIXELS / pixels);
    }

    const backingWidth = Math.max(1, Math.round(width * ratio));
    const backingHeight = Math.max(1, Math.round(height * ratio));

    const changed =
      this.canvas.width !== backingWidth ||
      this.canvas.height !== backingHeight ||
      this.cssWidth !== width ||
      this.cssHeight !== height;

    this.cssWidth = width;
    this.cssHeight = height;
    this.pixelRatio = ratio;

    if (changed) {
      this.canvas.width = backingWidth;
      this.canvas.height = backingHeight;
      this.scene.resize(width, height, ratio);
    }

    this.updateRunState();
  }

  private readonly frame = (dt: number, time: number): void => {
    if (this.destroyed || !this.ctx) return;

    const start = performance.now();

    // Home Assistant usually hands us `hass` a tick after the card is created,
    // so the very first animated frame snaps instead of fading in from the
    // placeholder state built in the constructor.
    if (this.firstFrame) {
      this.scene.snapToTargets();
      this.firstFrame = false;
    }

    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.scene.update(dt, time);
    this.scene.render(this.ctx);

    const cost = performance.now() - start;
    const nextQuality = this.performance.sample(dt, cost);
    if (nextQuality) this.applyQuality(nextQuality);

    if (this.debugOverlay) {
      this.debugOverlay.update(
        this.scene.sceneState,
        this.scene.environment,
        this.performance.fps,
        this.scene.particleCount(),
        false
      );
    }
  };

  /**
   * Paint a single frame while the loop is stopped (resize, or new Home
   * Assistant state while the dashboard is hidden).
   *
   * There is no time passing here, so the usual damping would never converge –
   * a still frame always snaps straight to the current sun and weather.
   */
  private renderOnce(): void {
    if (this.destroyed || !this.ctx || this.cssWidth === 0) return;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.scene.snapToTargets();
    this.scene.update(0, this.scene.sceneState.time);
    this.scene.render(this.ctx);
    this.firstFrame = false;

    this.debugOverlay?.update(
      this.scene.sceneState,
      this.scene.environment,
      this.performance.fps,
      this.scene.particleCount(),
      true
    );
  }
}
