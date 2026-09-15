import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { HomeAssistant, LovelaceCard } from '../core/types';
import { clamp } from '../core/math';
import { childCardSize, createChildCard } from '../shared/card-factory';
import {
  SURFACE_PRESETS,
  normalizePresetName,
  type SurfaceOptions,
  type SurfacePreset,
} from '../core/surface-presets';

export const STYLE_CARD_TYPE = 'aurora-style';

/** Aurora Style and Aurora Glass share one preset table – see core/surface-presets.ts. */
export type AuroraStyleName = SurfacePreset;

export interface AuroraStyleConfigInput {
  type?: string;
  style?: AuroraStyleName;
  card?: Record<string, unknown>;
  blur?: number;
  opacity?: number;
  saturate?: number;
  glow?: number;
  radius?: number;
  border?: boolean;
}

interface AuroraStyleConfig extends SurfaceOptions {
  type: string;
  style: AuroraStyleName;
  card: Record<string, unknown>;
}

/**
 * Aurora Style — put any existing card into an Aurora surface.
 *
 * It wraps the card and sets Home Assistant's own `--ha-card-*` properties on
 * the wrapper. Custom properties inherit into shadow roots, so the child's
 * `ha-card` picks them up without Aurora touching the child at all: it works
 * with built-in cards, third-party cards, and anything released tomorrow.
 *
 * The surface colour prefers `--aurora-surface-rgb`, which Aurora Background
 * publishes from the live sky, and falls back to a neutral dark panel when the
 * background is not running. `style: plain` resets every property to the
 * guaranteed-invalid value, which makes `var()` fall through to the theme —
 * that is how you exclude one card from a dashboard-wide Aurora Glass.
 */
export class AuroraStyleCard extends LitElement implements LovelaceCard {
  static override styles = css`
    :host {
      display: block;
    }

    .wrapper {
      display: block;
      position: relative;
    }

    /* The child renders its own ha-card; we only supply the variables. */
    ::slotted(*) {
      display: block;
    }

    .error {
      padding: 14px 16px;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--error-color, #db4437);
      color: #fff;
      font-size: 14px;
    }
  `;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: AuroraStyleConfig;
  @state() private child?: LovelaceCard;
  @state() private errorMessage: string | null = null;

  private childConfigKey = '';

  setConfig(config: AuroraStyleConfigInput): void {
    if (!config?.card || typeof config.card !== 'object') {
      this.errorMessage = 'You need to set a "card".';
      throw new Error('aurora-style: you need to set a "card"');
    }

    const style: AuroraStyleName = normalizePresetName(config.style) ?? 'glass';
    const preset = SURFACE_PRESETS[style];

    this.errorMessage = null;
    this.config = {
      type: config.type ?? `custom:${STYLE_CARD_TYPE}`,
      style,
      card: config.card,
      blur: pick(config.blur, preset.blur, 0, 60),
      opacity: pick(config.opacity, preset.opacity, 0, 1),
      saturate: pick(config.saturate, preset.saturate, 1, 3),
      glow: pick(config.glow, preset.glow, 0, 2),
      radius: pick(config.radius, preset.radius, -1, 80),
      border: typeof config.border === 'boolean' ? config.border : preset.border,
    };

    const key = JSON.stringify(config.card);
    if (key !== this.childConfigKey) {
      this.childConfigKey = key;
      void this.buildChild();
    }
  }

  async getCardSize(): Promise<number> {
    return this.child ? childCardSize(this.child) : 1;
  }

  getGridOptions(): Record<string, unknown> {
    const child = this.child as (LovelaceCard & { getGridOptions?: () => unknown }) | undefined;
    const inherited = child?.getGridOptions?.();
    return (inherited as Record<string, unknown>) ?? { rows: 'auto', columns: 'full' };
  }

  static getStubConfig(): AuroraStyleConfigInput {
    return {
      type: `custom:${STYLE_CARD_TYPE}`,
      style: 'glass',
      card: { type: 'entities', entities: [] },
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('aurora-style-editor');
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('hass') && this.child && this.hass) {
      this.child.hass = this.hass;
    }
  }

  private async buildChild(): Promise<void> {
    const config = this.config;
    if (!config) return;
    const card = await createChildCard(config.card, this.hass);
    this.child = card;
  }

  /** The `--ha-card-*` overrides the wrapped card inherits. */
  private surfaceStyles(): Record<string, string> {
    const config = this.config;
    if (!config) return {};

    // `initial` is the guaranteed-invalid value for a custom property, so every
    // `var(--ha-card-…, fallback)` in the child falls through to the theme.
    if (config.style === 'plain') {
      return {
        '--ha-card-background': 'initial',
        '--card-background-color': 'initial',
        '--ha-card-backdrop-filter': 'initial',
        '--ha-card-border-color': 'initial',
        '--ha-card-border-width': 'initial',
        '--ha-card-box-shadow': 'initial',
        '--ha-card-border-radius': 'initial',
      };
    }

    const surface = `rgba(var(--aurora-surface-rgb, 22, 26, 36), ${config.opacity})`;
    const shadow =
      config.glow > 0.01
        ? `0 6px 22px rgba(0,0,0,0.22), 0 0 34px rgba(var(--aurora-accent-rgb, 255,255,255), ${(
            config.glow * 0.14
          ).toFixed(3)})`
        : '0 6px 22px rgba(0,0,0,0.22)';

    const styles: Record<string, string> = {
      '--ha-card-background': surface,
      '--card-background-color': surface,
      '--ha-card-backdrop-filter':
        config.blur > 0 ? `blur(${config.blur}px) saturate(${config.saturate})` : 'none',
      '--ha-card-box-shadow': shadow,
      '--ha-card-border-width': config.border ? '1px' : '0px',
      '--ha-card-border-color': config.border
        ? 'var(--aurora-card-border, rgba(255,255,255,0.16))'
        : 'transparent',
    };

    if (config.radius >= 0) styles['--ha-card-border-radius'] = `${config.radius}px`;
    return styles;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (this.errorMessage) {
      return html`<div class="error">Aurora Style: ${this.errorMessage}</div>`;
    }
    if (!this.config) return nothing;

    return html`
      <div class="wrapper" style=${styleMap(this.surfaceStyles())}>${this.child ?? nothing}</div>
    `;
  }
}

function pick(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  return Number.isFinite(n) ? clamp(n, min, max) : fallback;
}

if (!customElements.get(STYLE_CARD_TYPE)) {
  customElements.define(STYLE_CARD_TYPE, AuroraStyleCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-style': AuroraStyleCard;
  }
}
