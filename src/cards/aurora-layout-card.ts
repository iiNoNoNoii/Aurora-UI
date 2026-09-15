import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { HomeAssistant, LovelaceCard } from '../core/types';
import { clamp } from '../core/math';
import { childCardSize, createChildCard } from '../shared/card-factory';

export const LAYOUT_CARD_TYPE = 'aurora-layout';

export type DeviceClass = 'mobile' | 'tablet' | 'desktop' | 'wide';

const DEVICE_ORDER: DeviceClass[] = ['mobile', 'tablet', 'desktop', 'wide'];

/** Upper width bound, in CSS pixels, for each class except the last. */
interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

const DEFAULT_BREAKPOINTS: Breakpoints = { mobile: 600, tablet: 1000, desktop: 1600 };

interface LayoutDefinition {
  columns: number;
  cards?: Record<string, unknown>[];
  /** Per-class gap override, in px. */
  gap?: number;
}

export interface AuroraLayoutConfigInput {
  type?: string;
  cards?: Record<string, unknown>[];
  gap?: number;
  breakpoints?: Partial<Breakpoints>;
  layouts?: Partial<Record<DeviceClass, Partial<LayoutDefinition>>>;
}

interface AuroraLayoutConfig {
  type: string;
  cards: Record<string, unknown>[];
  gap: number;
  breakpoints: Breakpoints;
  layouts: Record<DeviceClass, LayoutDefinition>;
}

const DEFAULT_COLUMNS: Record<DeviceClass, number> = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
  wide: 4,
};

/**
 * Aurora Layout.
 *
 * A phone is not a small desktop. This card lets a view carry a *different set
 * of cards*, not just a narrower arrangement of the same ones: each device
 * class can override both the column count and the cards themselves, so a
 * wallpanel can show six tiles the phone deliberately leaves out.
 *
 * The breakpoints are measured against **this card's own width**, not the
 * viewport. That matters inside Home Assistant, where a card can sit in a
 * narrow sections column on a wide screen — the layout should follow the space
 * it actually has.
 */
export class AuroraLayoutCard extends LitElement implements LovelaceCard {
  static override styles = css`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      align-items: start;
    }

    .empty {
      padding: 16px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px dashed var(--divider-color, rgba(255, 255, 255, 0.2));
      color: var(--secondary-text-color, inherit);
      font-size: 14px;
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
  @state() private config?: AuroraLayoutConfig;
  @state() private device: DeviceClass = 'desktop';
  @state() private childCards: LovelaceCard[] = [];
  @state() private errorMessage: string | null = null;

  private resizeObserver: ResizeObserver | null = null;
  private measuredWidth = 0;
  /** Identifies the card set currently built, so we only rebuild on change. */
  private builtKey = '';
  private buildToken = 0;

  setConfig(config: AuroraLayoutConfigInput): void {
    const cards = Array.isArray(config?.cards) ? config.cards : [];
    const layouts = config?.layouts ?? {};

    const hasAnyCards =
      cards.length > 0 ||
      DEVICE_ORDER.some((device) => (layouts[device]?.cards?.length ?? 0) > 0);

    if (!hasAnyCards) {
      this.errorMessage = 'You need "cards", or cards inside at least one layout.';
      throw new Error('aurora-layout: you need "cards", or cards inside a layout');
    }

    const breakpoints: Breakpoints = {
      mobile: pick(config?.breakpoints?.mobile, DEFAULT_BREAKPOINTS.mobile, 200, 4000),
      tablet: pick(config?.breakpoints?.tablet, DEFAULT_BREAKPOINTS.tablet, 200, 5000),
      desktop: pick(config?.breakpoints?.desktop, DEFAULT_BREAKPOINTS.desktop, 200, 8000),
    };

    const resolved = {} as Record<DeviceClass, LayoutDefinition>;
    for (const device of DEVICE_ORDER) {
      const layout = layouts[device] ?? {};
      resolved[device] = {
        columns: Math.round(pick(layout.columns, DEFAULT_COLUMNS[device], 1, 12)),
        cards: Array.isArray(layout.cards) ? layout.cards : undefined,
        gap: typeof layout.gap === 'number' ? clamp(layout.gap, 0, 64) : undefined,
      };
    }

    this.errorMessage = null;
    this.config = {
      type: config?.type ?? `custom:${LAYOUT_CARD_TYPE}`,
      cards,
      gap: pick(config?.gap, 12, 0, 64),
      breakpoints,
      layouts: resolved,
    };

    this.builtKey = '';
    void this.rebuildIfNeeded();
  }

  async getCardSize(): Promise<number> {
    if (this.childCards.length === 0) return 1;
    const sizes = await Promise.all(this.childCards.map((card) => childCardSize(card)));
    const columns = this.activeLayout?.columns ?? 1;
    const total = sizes.reduce((sum, size) => sum + size, 0);
    return Math.max(1, Math.ceil(total / Math.max(1, columns)));
  }

  getGridOptions(): Record<string, unknown> {
    return { rows: 'auto', columns: 'full' };
  }

  static getStubConfig(): AuroraLayoutConfigInput {
    return {
      type: `custom:${LAYOUT_CARD_TYPE}`,
      cards: [],
      layouts: { mobile: { columns: 1 }, tablet: { columns: 2 }, desktop: { columns: 3 } },
    };
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof ResizeObserver !== 'undefined' && !this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this);
    }
    this.measure();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('hass') && this.hass) {
      for (const card of this.childCards) card.hass = this.hass;
    }
    if (changed.has('device')) void this.rebuildIfNeeded();
  }

  private get activeLayout(): LayoutDefinition | undefined {
    return this.config?.layouts[this.device];
  }

  private readonly onResize = (): void => {
    this.measure();
  };

  private measure(): void {
    const width = Math.round(this.getBoundingClientRect().width);
    if (width === 0 || width === this.measuredWidth) return;
    this.measuredWidth = width;

    const breakpoints = this.config?.breakpoints ?? DEFAULT_BREAKPOINTS;
    const device: DeviceClass =
      width < breakpoints.mobile
        ? 'mobile'
        : width < breakpoints.tablet
          ? 'tablet'
          : width < breakpoints.desktop
            ? 'desktop'
            : 'wide';

    if (device !== this.device) this.device = device;
  }

  /**
   * Cards are only rebuilt when the *set* changes, not on every resize —
   * crossing a breakpoint that both classes share must not tear down and
   * recreate everything.
   */
  private async rebuildIfNeeded(): Promise<void> {
    const config = this.config;
    if (!config) return;

    const layout = config.layouts[this.device];
    const cards = layout.cards ?? config.cards;
    const key = JSON.stringify(cards);
    if (key === this.builtKey) return;
    this.builtKey = key;

    const token = ++this.buildToken;
    const built = await Promise.all(cards.map((card) => createChildCard(card, this.hass)));
    // A newer rebuild may have started while we were awaiting.
    if (token !== this.buildToken) return;
    this.childCards = built;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (this.errorMessage) {
      return html`<div class="error">Aurora Layout: ${this.errorMessage}</div>`;
    }
    if (!this.config) return nothing;

    const layout = this.config.layouts[this.device];
    const gap = layout.gap ?? this.config.gap;

    if (this.childCards.length === 0) {
      return html`
        <div class="empty">
          Aurora Layout (${this.device}) — no cards for this device class.
        </div>
      `;
    }

    return html`
      <div
        class="grid"
        style=${styleMap({
          gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
          gap: `${gap}px`,
        })}
      >
        ${this.childCards}
      </div>
    `;
  }
}

function pick(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  return Number.isFinite(n) ? clamp(n, min, max) : fallback;
}

if (!customElements.get(LAYOUT_CARD_TYPE)) {
  customElements.define(LAYOUT_CARD_TYPE, AuroraLayoutCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'aurora-layout': AuroraLayoutCard;
  }
}
