import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { AuroraBackgroundConfigInput, HomeAssistant } from '../core/types';
import { CARD_TYPE, normalizeConfig } from '../core/config';
import { editorStyles } from '../styles/styles';

/**
 * Visual editor.
 *
 * Built on `ha-form`, the same component Home Assistant uses for its own card
 * editors. If a future frontend drops it, the editor degrades to a hint telling
 * the user to switch to YAML rather than throwing.
 */

const LABELS: Record<string, string> = {
  weather_entity: 'Weather entity',
  sun_entity: 'Sun entity',
  mode: 'Mode',
  quality: 'Quality',
  debug: 'Debug overlay',
  height: 'Height (card mode)',
  effects: 'Effects',
  appearance: 'Appearance',
  performance: 'Performance',
  background: 'Dashboard background',
  sun: 'Sun',
  moon: 'Moon',
  stars: 'Stars',
  shooting_stars: 'Shooting stars',
  clouds: 'Clouds',
  rain: 'Rain (v0.2)',
  snow: 'Snow (v0.2)',
  fog: 'Fog (v0.2)',
  lightning: 'Lightning (v0.2)',
  intensity: 'Intensity',
  saturation: 'Saturation',
  brightness: 'Brightness',
  blur: 'Blur (px)',
  ambient_glow: 'Ambient glow',
  opacity: 'Opacity',
  max_fps: 'Max FPS',
  auto_quality: 'Automatic quality',
  pause_when_hidden: 'Pause when hidden',
  transparent_lovelace: 'Make dashboard transparent',
  transparent_header: 'Make header transparent',
  z_index: 'z-index',
};

function boolRow(name: string) {
  return { name, selector: { boolean: {} } };
}

function numberRow(name: string, min: number, max: number, step: number) {
  return { name, selector: { number: { min, max, step, mode: 'slider' } } };
}

const SCHEMA = [
  { name: 'weather_entity', selector: { entity: { domain: 'weather' } } },
  { name: 'sun_entity', selector: { entity: { domain: 'sun' } } },
  {
    name: '',
    type: 'grid',
    schema: [
      {
        name: 'mode',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'background', label: 'Dashboard background' },
              { value: 'card', label: 'Normal card' },
            ],
          },
        },
      },
      {
        name: 'quality',
        selector: {
          select: {
            mode: 'dropdown',
            options: ['auto', 'low', 'medium', 'high', 'ultra'],
          },
        },
      },
    ],
  },
  boolRow('debug'),
  {
    name: 'effects',
    type: 'expandable',
    icon: 'mdi:weather-partly-cloudy',
    schema: [
      {
        name: '',
        type: 'grid',
        schema: [
          boolRow('sun'),
          boolRow('moon'),
          boolRow('stars'),
          boolRow('shooting_stars'),
          boolRow('clouds'),
          boolRow('fog'),
          boolRow('rain'),
          boolRow('snow'),
          boolRow('lightning'),
        ],
      },
    ],
  },
  {
    name: 'appearance',
    type: 'expandable',
    icon: 'mdi:palette',
    schema: [
      numberRow('intensity', 0, 2, 0.05),
      numberRow('saturation', 0, 2, 0.05),
      numberRow('brightness', 0.2, 2, 0.05),
      numberRow('ambient_glow', 0, 2, 0.05),
      numberRow('opacity', 0, 1, 0.05),
      numberRow('blur', 0, 40, 1),
    ],
  },
  {
    name: 'performance',
    type: 'expandable',
    icon: 'mdi:speedometer',
    schema: [
      numberRow('max_fps', 10, 120, 1),
      boolRow('auto_quality'),
      boolRow('pause_when_hidden'),
    ],
  },
  {
    name: 'background',
    type: 'expandable',
    icon: 'mdi:layers-outline',
    schema: [
      boolRow('transparent_lovelace'),
      boolRow('transparent_header'),
      { name: 'z_index', selector: { number: { min: -10, max: 10, step: 1, mode: 'box' } } },
    ],
  },
];

export class AuroraBackgroundEditor extends LitElement {
  static override styles = editorStyles;

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config: AuroraBackgroundConfigInput = {};

  setConfig(config: AuroraBackgroundConfigInput): void {
    this.config = { ...config };
  }

  private get formData(): Record<string, unknown> {
    // Show the effective values (defaults included) so sliders start sensibly.
    const resolved = normalizeConfig(this.config);
    return {
      weather_entity: this.config.weather_entity ?? '',
      sun_entity: resolved.sun_entity ?? '',
      mode: resolved.mode,
      quality: resolved.quality,
      debug: resolved.debug,
      effects: { ...resolved.effects },
      appearance: { ...resolved.appearance },
      performance: { ...resolved.performance },
      background: {
        transparent_lovelace: resolved.background.transparent_lovelace,
        transparent_header: resolved.background.transparent_header,
        z_index: resolved.background.z_index,
      },
    };
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!customElements.get('ha-form')) {
      return html`
        <div class="hint fallback">
Aurora Background: this Home Assistant build does not provide "ha-form".
Please configure the card in YAML – see the repository README.
        </div>
      `;
    }

    return html`
      <div class="hint">
        <b>Background mode</b> paints behind the whole dashboard. Add the card once per view.
        Leave <i>Weather entity</i> empty to auto-detect the first <code>weather.*</code> entity.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this.formData}
        .schema=${SCHEMA}
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

    const next: AuroraBackgroundConfigInput = {
      ...this.config,
      type: this.config.type ?? `custom:${CARD_TYPE}`,
      mode: value.mode as AuroraBackgroundConfigInput['mode'],
      quality: value.quality as AuroraBackgroundConfigInput['quality'],
      debug: Boolean(value.debug),
      effects: value.effects as AuroraBackgroundConfigInput['effects'],
      appearance: value.appearance as AuroraBackgroundConfigInput['appearance'],
      performance: value.performance as AuroraBackgroundConfigInput['performance'],
      background: {
        ...(this.config.background ?? {}),
        ...(value.background as Record<string, never>),
      },
    };

    if (typeof value.weather_entity === 'string' && value.weather_entity.length > 0) {
      next.weather_entity = value.weather_entity;
    } else {
      delete next.weather_entity;
    }

    if (typeof value.sun_entity === 'string' && value.sun_entity.length > 0) {
      next.sun_entity = value.sun_entity;
    } else {
      delete next.sun_entity;
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

if (!customElements.get('aurora-background-editor')) {
  customElements.define('aurora-background-editor', AuroraBackgroundEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-background-editor': AuroraBackgroundEditor;
  }
}
