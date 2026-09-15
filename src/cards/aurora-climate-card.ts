import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { HassEntity, HomeAssistant, LovelaceCard, RGB } from '../core/types';
import { clamp, clamp01, lerp } from '../core/math';
import { mixRgb, rgbToCss } from '../core/color';
import { auroraCardStyles } from '../shared/card-styles';
import { DragControl } from '../shared/drag-control';
import {
  attrList,
  attrNumber,
  attrString,
  callService,
  entityName,
  formatTemperature,
  getEntity,
  isUnavailable,
  showMoreInfo,
} from '../shared/ha-helpers';

export const CLIMATE_CARD_TYPE = 'aurora-climate';

export interface AuroraClimateConfigInput {
  type?: string;
  entity?: string;
  name?: string;
  icon?: string;
  /** Show the HVAC mode buttons. */
  show_modes?: boolean;
  /** Allow dragging across the card to set the target temperature. */
  slider?: boolean;
}

interface AuroraClimateConfig {
  type: string;
  entity: string;
  name?: string;
  icon?: string;
  show_modes: boolean;
  slider: boolean;
}

const COLD: RGB = [86, 158, 232];
const NEUTRAL: RGB = [150, 176, 200];
const WARM: RGB = [246, 152, 74];

const MODE_ICONS: Record<string, string> = {
  off: 'mdi:power',
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:sun-snowflake-variant',
  auto: 'mdi:thermostat-auto',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
};

const ACTION_LABELS: Record<string, string> = {
  heating: 'Heating',
  cooling: 'Cooling',
  drying: 'Drying',
  fan: 'Fan running',
  idle: 'Idle',
  off: 'Off',
  preheating: 'Preheating',
};

/**
 * Aurora Climate.
 *
 * The target temperature is the hero: large, adjustable with two big buttons or
 * by dragging across the card, with the surface shifting from blue to amber as
 * it moves through the thermostat's own range. Service calls are debounced, so
 * a drag from 18 to 24 sends one command rather than twelve.
 */
export class AuroraClimateCard extends LitElement implements LovelaceCard {
  static override styles = [
    auroraCardStyles,
    css`
      :host {
        --aurora-card-padding: 16px;
      }

      ha-card {
        user-select: none;
        -webkit-user-select: none;
      }

      .fill {
        background: linear-gradient(
          160deg,
          rgba(var(--aurora-climate-rgb), 0.38),
          rgba(var(--aurora-climate-rgb), 0.08) 65%,
          rgba(var(--aurora-climate-rgb), 0) 100%
        );
      }

      .content {
        flex-direction: column;
        align-items: stretch;
        gap: 12px;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header .labels {
        flex: 1 1 auto;
      }

      .action {
        flex: 0 0 auto;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.02em;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(var(--aurora-climate-rgb), 0.28);
        white-space: nowrap;
      }

      .dial {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 2px 0 4px;
      }

      .step {
        flex: 0 0 auto;
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: inherit;
        background: rgba(255, 255, 255, 0.14);
        transition:
          background-color 0.2s ease,
          transform 0.12s ease;
        -webkit-tap-highlight-color: transparent;
      }

      .step:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.24);
      }

      .step:active:not(:disabled) {
        transform: scale(0.92);
      }

      .step:disabled {
        opacity: 0.3;
        cursor: default;
      }

      .step:focus-visible {
        outline: 2px solid var(--aurora-accent-color, #7ab8ff);
        outline-offset: 2px;
      }

      .target {
        flex: 1 1 auto;
        text-align: center;
        line-height: 1;
      }

      .target .number {
        font-size: 46px;
        font-weight: 300;
        letter-spacing: -0.02em;
        font-variant-numeric: tabular-nums;
      }

      .target .unit {
        font-size: 20px;
        font-weight: 400;
        opacity: 0.7;
        vertical-align: super;
        margin-left: 2px;
      }

      .target .current {
        margin-top: 6px;
        font-size: 13px;
        opacity: 0.72;
        font-variant-numeric: tabular-nums;
      }

      .track {
        position: relative;
        height: 6px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.16);
        overflow: hidden;
      }

      .track .level {
        position: absolute;
        inset: 0 auto 0 0;
        border-radius: 999px;
        background: rgba(var(--aurora-climate-rgb), 0.95);
        transition: width 0.2s ease;
      }

      .modes {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .mode {
        flex: 0 0 auto;
        display: grid;
        place-items: center;
        width: 40px;
        height: 36px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        background: rgba(255, 255, 255, 0.1);
        transition:
          background-color 0.2s ease,
          opacity 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }

      .mode:hover {
        opacity: 0.85;
      }

      .mode[aria-pressed='true'] {
        opacity: 1;
        background: rgba(var(--aurora-climate-rgb), 0.45);
      }

      .mode:focus-visible {
        outline: 2px solid var(--aurora-accent-color, #7ab8ff);
        outline-offset: 2px;
      }

      .mode ha-icon {
        --mdc-icon-size: 20px;
      }

      @media (prefers-reduced-motion: reduce) {
        .step,
        .mode,
        .track .level {
          transition: none;
        }
      }
    `,
  ];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: AuroraClimateConfig;
  @state() private errorMessage: string | null = null;
  /** Target shown while the user is adjusting, before HA confirms. */
  @state() private pendingTarget: number | null = null;

  private readonly drag = new DragControl({
    axis: 'x',
    onMove: (value) => this.onDragMove(value),
    onCommit: (value) => this.onDragMove(value, true),
    onHold: () => this.openMoreInfo(),
    isDisabled: () => !this.config || isUnavailable(this.entity) || !this.config.slider,
  });

  private sendTimer: number | null = null;
  private clearPendingTimer: number | null = null;

  setConfig(config: AuroraClimateConfigInput): void {
    if (!config?.entity) {
      this.errorMessage = 'You need to set an "entity".';
      throw new Error('aurora-climate: you need to set an "entity"');
    }
    if (!config.entity.startsWith('climate.')) {
      this.errorMessage = `"${config.entity}" is not a climate entity.`;
      throw new Error(`aurora-climate: "${config.entity}" is not a climate entity`);
    }

    this.errorMessage = null;
    this.config = {
      type: config.type ?? `custom:${CLIMATE_CARD_TYPE}`,
      entity: config.entity,
      name: config.name,
      icon: config.icon,
      show_modes: config.show_modes !== false,
      slider: config.slider !== false,
    };
  }

  getCardSize(): number {
    return this.config?.show_modes ? 4 : 3;
  }

  getGridOptions(): Record<string, unknown> {
    return {
      rows: this.config?.show_modes ? 4 : 3,
      columns: 6,
      min_rows: 3,
      min_columns: 4,
    };
  }

  getLayoutOptions(): Record<string, unknown> {
    return this.getGridOptions();
  }

  static getStubConfig(hass: HomeAssistant | undefined): AuroraClimateConfigInput {
    const entity = hass
      ? Object.keys(hass.states).find((id) => id.startsWith('climate.'))
      : undefined;
    return { type: `custom:${CLIMATE_CARD_TYPE}`, entity: entity ?? 'climate.example' };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('aurora-climate-editor');
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.drag.detach();
    this.cancelTimers();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    const track = this.renderRoot?.querySelector<HTMLElement>('.dial');
    if (track && this.config?.slider) this.drag.attach(track);
    else this.drag.detach();

    this.dataset.unavailable = String(isUnavailable(this.entity));
  }

  /* ---------------------------------------------------------------- *
   * State
   * ---------------------------------------------------------------- */

  private get entity(): HassEntity | undefined {
    return getEntity(this.hass, this.config?.entity);
  }

  private get minTemp(): number {
    return attrNumber(this.entity, 'min_temp') ?? 7;
  }

  private get maxTemp(): number {
    return attrNumber(this.entity, 'max_temp') ?? 35;
  }

  private get step(): number {
    return attrNumber(this.entity, 'target_temp_step') ?? 0.5;
  }

  private get unit(): string {
    return attrString(this.entity, 'temperature_unit') ?? this.hass?.config?.unit_system?.temperature ?? '°C';
  }

  private get currentTemp(): number | null {
    return attrNumber(this.entity, 'current_temperature');
  }

  private get target(): number | null {
    if (this.pendingTarget !== null) return this.pendingTarget;
    return attrNumber(this.entity, 'temperature');
  }

  /** Where the target sits in the thermostat's own range, 0..1. */
  private get targetFraction(): number {
    const target = this.target;
    if (target === null) return 0.5;
    const span = this.maxTemp - this.minTemp;
    return span <= 0 ? 0.5 : clamp01((target - this.minTemp) / span);
  }

  /** Blue when cold, amber when warm, muted when the thermostat is off. */
  private get accent(): RGB {
    if (this.entity?.state === 'off' || isUnavailable(this.entity)) return NEUTRAL;
    const f = this.targetFraction;
    return f < 0.5 ? mixRgb(COLD, NEUTRAL, f * 2) : mixRgb(NEUTRAL, WARM, (f - 0.5) * 2);
  }

  private get hvacModes(): string[] {
    return attrList(this.entity, 'hvac_modes');
  }

  /* ---------------------------------------------------------------- *
   * Interaction
   * ---------------------------------------------------------------- */

  private roundToStep(value: number): number {
    const step = this.step;
    const snapped = Math.round(value / step) * step;
    // Floating point: 0.1 steps otherwise produce 21.400000000000002.
    const decimals = step < 1 ? 1 : 0;
    return Number(clamp(snapped, this.minTemp, this.maxTemp).toFixed(decimals));
  }

  private onDragMove(value: number, commit = false): void {
    const next = this.roundToStep(lerp(this.minTemp, this.maxTemp, value));
    this.pendingTarget = next;
    if (commit) this.sendTarget(next, 0);
    else this.sendTarget(next, 400);
  }

  private adjust(direction: number): void {
    if (!this.config || isUnavailable(this.entity)) return;
    const base = this.target ?? this.currentTemp ?? this.minTemp;
    const next = this.roundToStep(base + direction * this.step);
    if (next === this.target) return;
    this.pendingTarget = next;
    this.sendTarget(next, 500);
  }

  /**
   * Debounced so a drag or a burst of taps produces one service call.
   * `delay: 0` sends immediately, which is what a released drag wants.
   */
  private sendTarget(value: number, delay: number): void {
    if (!this.config) return;
    if (this.sendTimer !== null) window.clearTimeout(this.sendTimer);

    const send = (): void => {
      this.sendTimer = null;
      callService(this.hass, 'climate', 'set_temperature', {
        entity_id: this.config!.entity,
        temperature: value,
      });
      // Let Home Assistant catch up before we trust its value again.
      if (this.clearPendingTimer !== null) window.clearTimeout(this.clearPendingTimer);
      this.clearPendingTimer = window.setTimeout(() => {
        this.pendingTarget = null;
        this.clearPendingTimer = null;
      }, 2000);
    };

    if (delay <= 0) send();
    else this.sendTimer = window.setTimeout(send, delay);
  }

  private setHvacMode(mode: string): void {
    if (!this.config) return;
    callService(this.hass, 'climate', 'set_hvac_mode', {
      entity_id: this.config.entity,
      hvac_mode: mode,
    });
  }

  private openMoreInfo(): void {
    if (this.config) showMoreInfo(this, this.config.entity);
  }

  private cancelTimers(): void {
    if (this.sendTimer !== null) {
      window.clearTimeout(this.sendTimer);
      this.sendTimer = null;
    }
    if (this.clearPendingTimer !== null) {
      window.clearTimeout(this.clearPendingTimer);
      this.clearPendingTimer = null;
    }
  }

  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */

  private actionText(): string {
    const entity = this.entity;
    if (!entity) return 'Not found';
    if (isUnavailable(entity)) return 'Unavailable';
    const action = attrString(entity, 'hvac_action');
    if (action && ACTION_LABELS[action]) return ACTION_LABELS[action];
    return ACTION_LABELS[entity.state] ?? entity.state.replace(/_/g, ' ');
  }

  protected override render(): TemplateResult | typeof nothing {
    if (this.errorMessage) {
      return html`<div class="error">Aurora Climate: ${this.errorMessage}</div>`;
    }
    if (!this.config) return nothing;

    const entity = this.entity;
    const disabled = isUnavailable(entity);
    const accent = this.accent;
    const rgbList = `${Math.round(accent[0])}, ${Math.round(accent[1])}, ${Math.round(accent[2])}`;
    const target = this.target;
    const current = this.currentTemp;
    const unit = this.unit;
    const modes = this.hvacModes;

    const hostStyle = styleMap({
      '--aurora-climate-rgb': rgbList,
    });

    return html`
      <ha-card style=${hostStyle}>
        <div class="fill"></div>
        <div class="content">
          <div class="header">
            <button
              class="icon-button"
              type="button"
              aria-label="More information"
              style=${styleMap({ color: rgbToCss(accent) })}
              @click=${this.openMoreInfo}
            >
              <ha-icon .icon=${this.config.icon ?? 'mdi:thermostat'}></ha-icon>
            </button>
            <div class="labels">
              <div class="name">${this.config.name ?? entityName(entity, this.config.entity)}</div>
              <div class="state">
                ${current !== null
                  ? `Currently ${formatTemperature(current, 0.1)} ${unit}`
                  : 'No sensor reading'}
              </div>
            </div>
            <div class="action">${this.actionText()}</div>
          </div>

          <div class="dial">
            <button
              class="step"
              type="button"
              aria-label="Decrease target temperature"
              ?disabled=${disabled || target === null}
              @click=${() => this.adjust(-1)}
            >
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>

            <div class="target">
              ${target !== null
                ? html`
                    <span class="number">${formatTemperature(target, this.step)}</span
                    ><span class="unit">${unit}</span>
                  `
                : html`<span class="number">--</span>`}
              <div class="current">
                ${target !== null ? `Target · ${this.minTemp}–${this.maxTemp} ${unit}` : ''}
              </div>
            </div>

            <button
              class="step"
              type="button"
              aria-label="Increase target temperature"
              ?disabled=${disabled || target === null}
              @click=${() => this.adjust(1)}
            >
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>

          <div class="track">
            <div
              class="level"
              style=${styleMap({ width: `${(this.targetFraction * 100).toFixed(2)}%` })}
            ></div>
          </div>

          ${this.config.show_modes && modes.length > 0
            ? html`
                <div class="modes">
                  ${modes.map(
                    (mode) => html`
                      <button
                        class="mode"
                        type="button"
                        aria-pressed=${String(entity?.state === mode)}
                        aria-label=${mode.replace(/_/g, ' ')}
                        title=${mode.replace(/_/g, ' ')}
                        ?disabled=${disabled}
                        @click=${() => this.setHvacMode(mode)}
                      >
                        <ha-icon .icon=${MODE_ICONS[mode] ?? 'mdi:tune'}></ha-icon>
                      </button>
                    `
                  )}
                </div>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get(CLIMATE_CARD_TYPE)) {
  customElements.define(CLIMATE_CARD_TYPE, AuroraClimateCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-climate': AuroraClimateCard;
  }
}
