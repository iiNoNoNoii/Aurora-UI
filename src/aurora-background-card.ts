import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import type {
  AuroraBackgroundConfig,
  AuroraBackgroundConfigInput,
  HomeAssistant,
  LovelaceCard,
} from './core/types';
import { AURORA_VERSION, CARD_TYPE, normalizeConfig } from './core/config';
import { backgroundMount } from './core/background-mount';
import { AuroraLayer } from './core/aurora-layer';
import { findWeatherEntity } from './weather/weather-engine';
import { cardStyles } from './styles/styles';
// Statically imported: the whole card ships as a single bundle anyway, and a
// synchronous `getConfigElement()` works on every Home Assistant version.
import './editor/aurora-background-editor';

/** Tag names that only exist while a dashboard is being edited. */
const EDITOR_ANCESTORS = ['HUI-CARD-OPTIONS', 'HUI-DIALOG-EDIT-CARD', 'HUI-CARD-PREVIEW'];

/** `closest()` does not cross shadow boundaries – this does. */
function hasEditorAncestor(start: HTMLElement, maxDepth = 30): boolean {
  let current: Node | null = start;
  for (let i = 0; i < maxDepth && current; i++) {
    if (current instanceof HTMLElement && EDITOR_ANCESTORS.includes(current.tagName)) return true;
    const parent: Node | null = current.parentNode;
    if (!parent) break;
    current = parent instanceof ShadowRoot ? parent.host : parent;
  }
  return false;
}

export class AuroraBackgroundCard extends LitElement implements LovelaceCard {
  static override styles = cardStyles;

  /** Set by Home Assistant when the card is shown in the card picker. */
  @property({ type: Boolean }) preview = false;

  @state() private config?: AuroraBackgroundConfig;
  @state() private editing = false;
  @state() private errorMessage: string | null = null;

  private _hass?: HomeAssistant;
  private cardLayer: AuroraLayer | null = null;
  private mounted = false;

  /** Last state objects we reacted to – Home Assistant swaps them on change. */
  private lastWeatherState: unknown = undefined;
  private lastSunState: unknown = undefined;
  private resolvedWeatherEntity: string | undefined;

  /* ---------------------------------------------------------------- *
   * Lovelace contract
   * ---------------------------------------------------------------- */

  setConfig(config: AuroraBackgroundConfigInput): void {
    try {
      this.config = normalizeConfig(config);
      this.errorMessage = null;
      this.resolvedWeatherEntity = this.config.weather_entity;
      this.lastWeatherState = undefined;
      this.lastSunState = undefined;
      this.dataset.mode = this.config.mode;
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : String(error);
      throw error;
    }

    if (this.isConnected) this.syncLayer();
  }

  set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
    if (!hass || !this.config) return;

    if (!this.resolvedWeatherEntity) {
      this.resolvedWeatherEntity = findWeatherEntity(hass);
    }

    const weatherState = this.resolvedWeatherEntity
      ? hass.states[this.resolvedWeatherEntity]
      : undefined;
    const sunState = this.config.sun_entity ? hass.states[this.config.sun_entity] : undefined;

    // Home Assistant pushes a new `hass` object on *every* state change in the
    // whole system. Only forward the ones that can actually change the sky.
    if (weatherState === this.lastWeatherState && sunState === this.lastSunState) return;

    this.lastWeatherState = weatherState;
    this.lastSunState = sunState;

    if (this.config.mode === 'background') {
      backgroundMount.updateHass(this, hass);
    } else {
      this.cardLayer?.updateHass(hass);
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  getCardSize(): number {
    if (!this.config || this.config.mode === 'background') return 1;
    const px = Number.parseInt(this.config.height, 10);
    return Number.isFinite(px) ? Math.max(1, Math.round(px / 50)) : 6;
  }

  /** Sections view (Home Assistant 2024.3+). */
  getGridOptions(): Record<string, unknown> {
    if (!this.config || this.config.mode === 'background') {
      return { rows: 1, columns: 3, min_rows: 1, min_columns: 1 };
    }
    return { rows: 6, columns: 'full', min_rows: 2 };
  }

  /** Legacy name used by 2024.2 and earlier. */
  getLayoutOptions(): Record<string, unknown> {
    return this.getGridOptions();
  }

  static getStubConfig(hass: HomeAssistant | undefined): AuroraBackgroundConfigInput {
    return {
      type: `custom:${CARD_TYPE}`,
      weather_entity: findWeatherEntity(hass),
      quality: 'auto',
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('aurora-background-editor');
  }

  /* ---------------------------------------------------------------- *
   * Lit lifecycle
   * ---------------------------------------------------------------- */

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncLayer();
    // The parent chain is only complete after the first paint.
    requestAnimationFrame(() => {
      if (this.isConnected) this.editing = this.preview || hasEditorAncestor(this);
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.teardownLayer();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('editing')) this.dataset.editing = this.editing ? 'true' : 'false';
    if (changed.has('config') || changed.has('editing')) this.syncLayer();
  }

  /* ---------------------------------------------------------------- *
   * Layer management
   * ---------------------------------------------------------------- */

  private syncLayer(): void {
    const config = this.config;
    if (!config || !this.isConnected) return;

    if (config.mode === 'background') {
      // A card-mode layer may be left over from a config change.
      this.destroyCardLayer();
      if (this.mounted) {
        backgroundMount.update(this, config, this._hass);
      } else {
        backgroundMount.acquire(this, config, this._hass);
        this.mounted = true;
      }
      return;
    }

    if (this.mounted) {
      backgroundMount.release(this);
      this.mounted = false;
    }

    const surface = this.renderRoot?.querySelector<HTMLElement>('.surface');
    if (!surface) {
      // The template has not rendered yet – retry after this update cycle.
      void this.updateComplete.then(() => {
        if (this.isConnected && this.config?.mode === 'card') this.syncLayer();
      });
      return;
    }

    surface.style.height = config.height;

    if (this.cardLayer) {
      this.cardLayer.updateConfig(config);
      this.cardLayer.updateHass(this._hass);
    } else {
      this.cardLayer = new AuroraLayer(surface, config, this._hass);
    }
  }

  private destroyCardLayer(): void {
    this.cardLayer?.destroy();
    this.cardLayer = null;
  }

  private teardownLayer(): void {
    this.destroyCardLayer();
    if (this.mounted) {
      backgroundMount.release(this);
      this.mounted = false;
    }
  }

  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */

  protected override render(): TemplateResult | typeof nothing {
    if (this.errorMessage) {
      return html`<div class="error">Aurora Background: ${this.errorMessage}</div>`;
    }
    if (!this.config) return nothing;

    if (this.config.mode === 'card') {
      return html`<div class="surface"></div>`;
    }

    // Background mode renders nothing on the dashboard itself; while editing we
    // show a small chip so the card can be found, moved and deleted.
    if (this.editing) {
      return html`
        <div class="placeholder">
          <span class="dot"></span>
          <span>
            Aurora Background
            <span class="meta"
              >· v${AURORA_VERSION} · ${this.config.quality} ·
              ${this.config.weather_entity ?? this.resolvedWeatherEntity ?? 'auto'}</span
            >
          </span>
        </div>
      `;
    }

    return nothing;
  }
}

// Guarded registration: a dashboard can end up loading the resource twice
// (e.g. an old cached URL plus a fresh one) and `define()` would throw.
if (!customElements.get(CARD_TYPE)) {
  customElements.define(CARD_TYPE, AuroraBackgroundCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-background': AuroraBackgroundCard;
  }
}
