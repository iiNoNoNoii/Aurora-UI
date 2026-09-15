import type { HomeAssistant, LovelaceCard } from '../core/types';

/**
 * Creating child cards.
 *
 * `window.loadCardHelpers()` is the route every container card in the ecosystem
 * uses (stack-in-card, layout-card, mushroom). It hands back Home Assistant's
 * own factory, so a child gets built exactly as the dashboard would build it,
 * including the error card for a broken config.
 */

interface CardHelpers {
  createCardElement(config: Record<string, unknown>): Promise<LovelaceCard> | LovelaceCard;
  createErrorCardElement?(error: string, config: unknown): LovelaceCard;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<CardHelpers>;
  }
}

let helpersPromise: Promise<CardHelpers | null> | null = null;

function getHelpers(): Promise<CardHelpers | null> {
  if (!helpersPromise) {
    helpersPromise =
      typeof window.loadCardHelpers === 'function'
        ? window.loadCardHelpers().catch(() => null)
        : Promise.resolve(null);
  }
  return helpersPromise;
}

/** A self-contained fallback so a broken child never blanks the dashboard. */
function buildErrorCard(message: string): LovelaceCard {
  const element = document.createElement('div') as unknown as LovelaceCard;
  element.setAttribute(
    'style',
    [
      'padding:14px 16px',
      'border-radius:var(--ha-card-border-radius,12px)',
      'background:var(--error-color,#db4437)',
      'color:#fff',
      'font:14px/1.4 system-ui,sans-serif',
    ].join(';')
  );
  element.textContent = message;
  element.setConfig = (): void => {
    /* nothing to configure */
  };
  return element;
}

export async function createChildCard(
  config: Record<string, unknown>,
  hass: HomeAssistant | undefined
): Promise<LovelaceCard> {
  const type = typeof config?.type === 'string' ? config.type : '';
  if (!type) return buildErrorCard('Aurora: a card needs a "type".');

  const helpers = await getHelpers();

  try {
    if (helpers) {
      const card = await helpers.createCardElement(config);
      if (hass) card.hass = hass;
      return card;
    }

    // Home Assistant without `loadCardHelpers` is very old, but a custom card
    // is just a custom element – we can still build those ourselves.
    if (type.startsWith('custom:')) {
      const tag = type.slice('custom:'.length);
      const card = document.createElement(tag) as LovelaceCard;
      if (typeof card.setConfig !== 'function') {
        return buildErrorCard(`Aurora: custom element "${tag}" is not loaded.`);
      }
      card.setConfig(config);
      if (hass) card.hass = hass;
      return card;
    }

    return buildErrorCard(`Aurora: cannot create "${type}" on this Home Assistant version.`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (helpers?.createErrorCardElement) {
      try {
        return helpers.createErrorCardElement(message, config);
      } catch {
        /* fall through to our own */
      }
    }
    return buildErrorCard(`Aurora: ${message}`);
  }
}

/** `getCardSize` is optional and may be async; normalise it. */
export async function childCardSize(card: LovelaceCard): Promise<number> {
  try {
    const size = await card.getCardSize?.();
    return typeof size === 'number' && Number.isFinite(size) ? size : 1;
  } catch {
    return 1;
  }
}
