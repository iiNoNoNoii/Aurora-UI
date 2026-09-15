import type { SceneState } from '../core/types';
import type { EnvironmentSnapshot } from '../weather/weather-engine';
import { AURORA_VERSION } from '../core/config';

const STYLE = (topPx: number) => `
  position: absolute;
  top: ${topPx}px;
  left: 12px;
  z-index: 2;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(6, 10, 20, 0.62);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #e8f0ff;
  font: 500 11px/1.5 ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
  letter-spacing: 0.02em;
  white-space: pre;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  max-width: calc(100vw - 24px);
  overflow: hidden;
`;

/** Small always-on-top readout. Only created when `debug: true`. */
export class DebugOverlay {
  private readonly element: HTMLDivElement;
  private lastUpdate = 0;

  /**
   * `topOffset` clears the Home Assistant toolbar when the layer covers the
   * whole viewport; inside a card the overlay sits in the corner.
   */
  constructor(parent: HTMLElement, topOffset = 12) {
    this.element = document.createElement('div');
    this.element.className = 'aurora-debug';
    this.element.setAttribute('style', STYLE(topOffset));
    parent.appendChild(this.element);
  }

  update(
    scene: SceneState,
    environment: EnvironmentSnapshot,
    fps: number,
    particles: number,
    paused: boolean,
    glass = 'off'
  ): void {
    const now = performance.now();
    if (now - this.lastUpdate < 250) return;
    this.lastUpdate = now;

    const lines = [
      `AURORA BACKGROUND  v${AURORA_VERSION}`,
      `fps          ${fps.toFixed(0).padStart(3)}${paused ? '  (paused)' : ''}`,
      `quality      ${scene.quality.level}  ×${scene.quality.renderScale} @dpr ${scene.pixelRatio.toFixed(2)}`,
      `canvas       ${Math.round(scene.width)}×${Math.round(scene.height)}`,
      `particles    ${particles}`,
      `weather      ${environment.condition}${environment.weatherAvailable ? '' : '  (no entity)'}`,
      `entity       ${environment.weatherEntity ?? '—'}`,
      `sun          ${scene.sunElevation.toFixed(2)}° az ${scene.sunAzimuth.toFixed(1)}° (${environment.sunSource})`,
      `phase        ${scene.sunRising ? 'rising' : 'setting'}`,
      `day/night    ${scene.dayFactor.toFixed(2)} / ${scene.nightFactor.toFixed(2)}  twilight ${scene.twilightFactor.toFixed(2)}`,
      `cloud cover  ${scene.weather.cloudCover.toFixed(2)}  wind ${scene.weather.wind.toFixed(2)}`,
      `precip       rain ${scene.weather.rain.toFixed(2)}  snow ${scene.weather.snow.toFixed(2)}  fog ${scene.weather.fog.toFixed(2)}  lgt ${scene.weather.lightning.toFixed(2)}`,
      `moon         ${scene.moonVisible ? 'visible' : 'hidden'}  phase ${scene.moonPhase.toFixed(2)}`,
      `season       ${scene.season.name}  warmth ${scene.season.warmth.toFixed(2)}`,
      `parallax     ${scene.parallaxX.toFixed(1)} / ${scene.parallaxY.toFixed(1)} px`,
      `glass        ${glass}`,
      `reduced mo.  ${scene.reducedMotion ? 'yes' : 'no'}`,
    ];

    this.element.textContent = lines.join('\n');
  }

  destroy(): void {
    this.element.remove();
  }
}
