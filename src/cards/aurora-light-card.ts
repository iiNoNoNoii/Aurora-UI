import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { HassEntity, HomeAssistant, LovelaceCard, RGB } from '../core/types';
import { clamp, clamp01 } from '../core/math';
import { rgbToCss } from '../core/color';
import { auroraCardStyles } from '../shared/card-styles';
import { DragControl } from '../shared/drag-control';
import {
  attrList,
  attrNumber,
  callService,
  entityName,
  getEntity,
  isUnavailable,
  kelvinToRgb,
  showMoreInfo,
} from '../shared/ha-helpers';

export const LIGHT_CARD_TYPE = 'aurora-light';

export interface AuroraLightConfigInput {
  type?: string;
  entity?: string;
  name?: string;
  icon?: string;
  /** Show the brightness slider. Off makes the card a plain toggle. */
  slider?: boolean;
  /** Tint the card with the light's own colour. */
  use_light_color?: boolean;
}

interface AuroraLightConfig {
  type: string;
  entity: string;
  name?: string;
  icon?: string;
  slider: boolean;
  use_light_color: boolean;
}

/** Warm white, used when a light reports no colour information at all. */
const DEFAULT_LIGHT_COLOR: RGB = [255, 197, 122];
const MIN_BRIGHTNESS_PERCENT = 1;

/**
 * Aurora Light.
 *
 * One large tile: drag across it to set brightness, tap to toggle, hold for
 * more-info. The fill and the icon take the light's actual colour — its RGB
 * value, or its colour temperature converted to RGB — so a dashboard of lights
 * reads at a glance.
 */
export class AuroraLightCard extends LitElement implements LovelaceCard {
  static override styles = [
    auroraCardStyles,
    css`
      ha-card {
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
      }

      .fill {
        transform-origin: left center;
        background: linear-gradient(
          90deg,
          rgba(var(--aurora-light-rgb), 0.42),
          rgba(var(--aurora-light-rgb), 0.24)
        );
      }

      .glow {
        position: absolute;
        inset: -40% -10%;
        pointer-events: none;
        background: radial-gradient(
          60% 120% at 12% 50%,
          rgba(var(--aurora-light-rgb), 0.5),
          rgba(var(--aurora-light-rgb), 0) 70%
        );
        opacity: var(--aurora-light-glow, 0);
        transition: opacity 0.35s ease;
      }

      .icon-button {
        background: rgba(var(--aurora-light-rgb), var(--aurora-icon-alpha, 0.16));
        color: var(--aurora-icon-color, inherit);
      }

      .icon-button:hover {
        background: rgba(var(--aurora-light-rgb), calc(var(--aurora-icon-alpha, 0.16) + 0.1));
      }

      .value {
        flex: 0 0 auto;
        font-size: 16px;
        font-weight: 600;
        font-variant-numeric: tabular-nums;
        opacity: 0.9;
        padding-left: 4px;
      }

      /* A hairline that makes the exact brightness readable, which a soft
         gradient alone does not. */
      .edge {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        pointer-events: none;
        background: rgba(var(--aurora-light-rgb), 0.9);
        opacity: 0.55;
      }
    `,
  ];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: AuroraLightConfig;
  @state() private errorMessage: string | null = null;
  /** Brightness shown while dragging, before Home Assistant confirms it. */
  @state() private pendingBrightness: number | null = null;

  private readonly drag = new DragControl({
    axis: 'x',
    onMove: (value) => this.onDragMove(value),
    onCommit: (value) => this.onDragCommit(value),
    onTap: () => this.toggle(),
    onHold: () => this.openMoreInfo(),
    isDisabled: () => !this.config || isUnavailable(this.entity),
  });

  private pendingTimer: number | null = null;

  setConfig(config: AuroraLightConfigInput): void {
    if (!config?.entity) {
      this.errorMessage = 'You need to set an "entity".';
      throw new Error('aurora-light: you need to set an "entity"');
    }
    if (!config.entity.startsWith('light.')) {
      this.errorMessage = `"${config.entity}" is not a light entity.`;
      throw new Error(`aurora-light: "${config.entity}" is not a light entity`);
    }

    this.errorMessage = null;
    this.config = {
      type: config.type ?? `custom:${LIGHT_CARD_TYPE}`,
      entity: config.entity,
      name: config.name,
      icon: config.icon,
      slider: config.slider !== false,
      use_light_color: config.use_light_color !== false,
    };
  }

  getCardSize(): number {
    return 1;
  }

  getGridOptions(): Record<string, unknown> {
    return { rows: 1, columns: 6, min_rows: 1, min_columns: 3 };
  }

  getLayoutOptions(): Record<string, unknown> {
    return this.getGridOptions();
  }

  static getStubConfig(hass: HomeAssistant | undefined): AuroraLightConfigInput {
    const entity = hass ? Object.keys(hass.states).find((id) => id.startsWith('light.')) : undefined;
    return { type: `custom:${LIGHT_CARD_TYPE}`, entity: entity ?? 'light.example' };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('aurora-light-editor');
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.drag.detach();
    this.clearPendingTimer();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    const card = this.renderRoot?.querySelector<HTMLElement>('ha-card');
    if (card && this.config?.slider) this.drag.attach(card);
    else this.drag.detach();

    this.dataset.unavailable = String(isUnavailable(this.entity));
  }

  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */

  private get entity(): HassEntity | undefined {
    return getEntity(this.hass, this.config?.entity);
  }

  private get isOn(): boolean {
    return this.entity?.state === 'on';
  }

  /** 0..100. Home Assistant reports 0..255, which nobody wants to read. */
  private get brightnessPercent(): number {
    if (this.pendingBrightness !== null) return this.pendingBrightness;
    if (!this.isOn) return 0;
    const raw = attrNumber(this.entity, 'brightness');
    if (raw === null) return 100;
    return clamp(Math.round((raw / 255) * 100), 0, 100);
  }

  /** The light's real colour, or a warm white when it has none. */
  private get lightColor(): RGB {
    if (!this.config?.use_light_color) return DEFAULT_LIGHT_COLOR;

    const rgb = this.entity?.attributes?.rgb_color;
    if (Array.isArray(rgb) && rgb.length >= 3) {
      const [r, g, b] = rgb as number[];
      if ([r, g, b].every((v) => typeof v === 'number' && Number.isFinite(v))) {
        return [r, g, b];
      }
    }

    const kelvin = attrNumber(this.entity, 'color_temp_kelvin');
    if (kelvin !== null) return kelvinToRgb(kelvin);

    // Older integrations only expose mireds.
    const mireds = attrNumber(this.entity, 'color_temp');
    if (mireds !== null && mireds > 0) return kelvinToRgb(1e6 / mireds);

    return DEFAULT_LIGHT_COLOR;
  }

  private get supportsBrightness(): boolean {
    const modes = attrList(this.entity, 'supported_color_modes');
    if (modes.length === 0) return attrNumber(this.entity, 'brightness') !== null;
    return !(modes.length === 1 && modes[0] === 'onoff');
  }

  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */

  private onDragMove(value: number): void {
    if (!this.supportsBrightness) return;
    this.pendingBrightness = clamp(
      Math.round(value * 100),
      MIN_BRIGHTNESS_PERCENT,
      100
    );
  }

  private onDragCommit(value: number): void {
    if (!this.config) return;
    if (!this.supportsBrightness) {
      this.toggle();
      return;
    }

    const percent = clamp(Math.round(value * 100), MIN_BRIGHTNESS_PERCENT, 100);
    this.pendingBrightness = percent;

    callService(this.hass, 'light', 'turn_on', {
      entity_id: this.config.entity,
      brightness_pct: percent,
    });

    // Hold the optimistic value until Home Assistant echoes the new state, so
    // the slider does not snap back for a moment on a slow connection.
    this.clearPendingTimer();
    this.pendingTimer = window.setTimeout(() => {
      this.pendingBrightness = null;
      this.pendingTimer = null;
    }, 1500);
  }

  private toggle(): void {
    if (!this.config || isUnavailable(this.entity)) return;
    callService(this.hass, 'light', 'toggle', { entity_id: this.config.entity });
    this.pendingBrightness = null;
    this.clearPendingTimer();
  }

  private openMoreInfo(): void {
    if (this.config) showMoreInfo(this, this.config.entity);
  }

  private clearPendingTimer(): void {
    if (this.pendingTimer !== null) {
      window.clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
    }
  }

  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */

  private stateText(): string {
    const entity = this.entity;
    if (!entity) return 'Entity not found';
    if (isUnavailable(entity)) return 'Unavailable';
    if (!this.isOn) return 'Off';
    if (!this.supportsBrightness) return 'On';
    return `${this.brightnessPercent}%`;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (this.errorMessage) {
      return html`<div class="error">Aurora Light: ${this.errorMessage}</div>`;
    }
    if (!this.config) return nothing;

    const entity = this.entity;
    const missing = !entity;
    const color = this.lightColor;
    const rgbList = `${Math.round(color[0])}, ${Math.round(color[1])}, ${Math.round(color[2])}`;
    const percent = this.brightnessPercent;
    const on = this.isOn && !missing;

    const icon =
      this.config.icon ?? (on ? 'mdi:lightbulb' : 'mdi:lightbulb-outline');

    const hostStyle = styleMap({
      '--aurora-light-rgb': rgbList,
      '--aurora-light-glow': on ? String(clamp01(0.25 + (percent / 100) * 0.55)) : '0',
      '--aurora-icon-alpha': on ? '0.3' : '0.12',
      '--aurora-icon-color': on ? rgbToCss(color) : 'inherit',
    });

    const showFill = on && this.supportsBrightness && this.config.slider;

    return html`
      <ha-card style=${hostStyle}>
        <div class="glow"></div>
        ${showFill
          ? html`
              <div
                class="fill"
                style=${styleMap({ transform: `scaleX(${(percent / 100).toFixed(4)})` })}
              ></div>
              <div class="edge" style=${styleMap({ left: `${percent}%` })}></div>
            `
          : nothing}
        <div class="content">
          <button
            class="icon-button"
            type="button"
            aria-label=${on ? 'Turn off' : 'Turn on'}
            @click=${this.onIconClick}
          >
            <ha-icon .icon=${icon}></ha-icon>
          </button>
          <div class="labels">
            <div class="name">${this.config.name ?? entityName(entity, this.config.entity)}</div>
            <div class="state">${this.stateText()}</div>
          </div>
          ${on && this.supportsBrightness
            ? html`<div class="value">${percent}%</div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  private onIconClick(event: Event): void {
    // The whole card is a slider; the icon is the explicit toggle, so its click
    // must not also register as a tap on the surface behind it.
    event.stopPropagation();
    this.toggle();
  }
}

if (!customElements.get(LIGHT_CARD_TYPE)) {
  customElements.define(LIGHT_CARD_TYPE, AuroraLightCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-light': AuroraLightCard;
  }
}
