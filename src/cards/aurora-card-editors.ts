import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { HomeAssistant } from '../core/types';
import { editorStyles } from '../styles/styles';
import { CLIMATE_CARD_TYPE, type AuroraClimateConfigInput } from './aurora-climate-card';
import { LIGHT_CARD_TYPE, type AuroraLightConfigInput } from './aurora-light-card';

/**
 * Visual editors for the Aurora cards.
 *
 * Both are the same shape, so one small base class carries the `ha-form`
 * plumbing and each subclass only supplies its schema and card type.
 */

const LABELS: Record<string, string> = {
  entity: 'Entity',
  name: 'Name',
  icon: 'Icon',
  slider: 'Drag to adjust',
  use_light_color: 'Tint with the light colour',
  show_modes: 'Show mode buttons',
};

abstract class AuroraCardEditorBase<TConfig extends { type?: string }> extends LitElement {
  static override styles = editorStyles;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() protected config: TConfig = {} as TConfig;

  protected abstract get schema(): unknown[];
  protected abstract get cardType(): string;
  protected abstract get hint(): string;
  /** Defaults merged in so switches show their real starting position. */
  protected abstract formData(config: TConfig): Record<string, unknown>;

  setConfig(config: TConfig): void {
    this.config = { ...config };
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!customElements.get('ha-form')) {
      return html`
        <div class="hint fallback">
This Home Assistant build does not provide "ha-form".
Please configure this card in YAML - see the repository README.
        </div>
      `;
    }

    return html`
      <div class="hint">${this.hint}</div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData(this.config)}
        .schema=${this.schema}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.onValueChanged}
      ></ha-form>
    `;
  }

  private readonly computeLabel = (schema: { name: string }): string =>
    LABELS[schema.name] ?? schema.name;

  private onValueChanged(event: CustomEvent): void {
    event.stopPropagation();
    const value = event.detail?.value as Record<string, unknown> | undefined;
    if (!value) return;

    const next = {
      ...this.config,
      ...value,
      type: this.config.type ?? `custom:${this.cardType}`,
    } as TConfig;

    // Empty optional strings belong out of the YAML, not in it as "".
    for (const key of ['name', 'icon'] as const) {
      const record = next as Record<string, unknown>;
      if (typeof record[key] === 'string' && (record[key] as string).length === 0) {
        delete record[key];
      }
    }

    this.config = next;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: next },
        bubbles: true,
        composed: true,
      })
    );
  }
}

/* ------------------------------------------------------------------ *
 * Light
 * ------------------------------------------------------------------ */

const LIGHT_SCHEMA = [
  { name: 'entity', required: true, selector: { entity: { domain: 'light' } } },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
    ],
  },
  { name: 'slider', selector: { boolean: {} } },
  { name: 'use_light_color', selector: { boolean: {} } },
];

export class AuroraLightEditor extends AuroraCardEditorBase<AuroraLightConfigInput> {
  protected get schema(): unknown[] {
    return LIGHT_SCHEMA;
  }

  protected get cardType(): string {
    return LIGHT_CARD_TYPE;
  }

  protected get hint(): string {
    return 'Drag across the card to set brightness, tap to toggle, hold for more info.';
  }

  protected formData(config: AuroraLightConfigInput): Record<string, unknown> {
    return {
      entity: config.entity ?? '',
      name: config.name ?? '',
      icon: config.icon ?? '',
      slider: config.slider !== false,
      use_light_color: config.use_light_color !== false,
    };
  }
}

/* ------------------------------------------------------------------ *
 * Climate
 * ------------------------------------------------------------------ */

const CLIMATE_SCHEMA = [
  { name: 'entity', required: true, selector: { entity: { domain: 'climate' } } },
  {
    name: '',
    type: 'grid',
    schema: [
      { name: 'name', selector: { text: {} } },
      { name: 'icon', selector: { icon: {} } },
    ],
  },
  { name: 'show_modes', selector: { boolean: {} } },
  { name: 'slider', selector: { boolean: {} } },
];

export class AuroraClimateEditor extends AuroraCardEditorBase<AuroraClimateConfigInput> {
  protected get schema(): unknown[] {
    return CLIMATE_SCHEMA;
  }

  protected get cardType(): string {
    return CLIMATE_CARD_TYPE;
  }

  protected get hint(): string {
    return 'Use the buttons or drag across the temperature row. Hold the icon for more info.';
  }

  protected formData(config: AuroraClimateConfigInput): Record<string, unknown> {
    return {
      entity: config.entity ?? '',
      name: config.name ?? '',
      icon: config.icon ?? '',
      show_modes: config.show_modes !== false,
      slider: config.slider !== false,
    };
  }
}

if (!customElements.get('aurora-light-editor')) {
  customElements.define('aurora-light-editor', AuroraLightEditor);
}
if (!customElements.get('aurora-climate-editor')) {
  customElements.define('aurora-climate-editor', AuroraClimateEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-light-editor': AuroraLightEditor;
    'aurora-climate-editor': AuroraClimateEditor;
  }
}
