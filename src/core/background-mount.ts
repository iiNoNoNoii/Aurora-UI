import type { AuroraBackgroundConfig, HomeAssistant } from './types';
import { AuroraLayer } from './aurora-layer';

/**
 * Mounts Aurora as a real, full-viewport dashboard background.
 *
 * ## Why it is done this way
 *
 * A Lovelace custom card is always rendered *inside* the view's card grid.
 * There is no supported API that lets a card paint behind the whole view, so
 * every "background card" has to leave the grid somehow. The options are:
 *
 *  1. Reach into Home Assistant's shadow DOM (`home-assistant` ->
 *     `home-assistant-main` -> `ha-drawer` -> ...) and inject an element.
 *     This is what most animated-background cards do, and it breaks on every
 *     frontend refactor.
 *  2. Append a `position: fixed` element to `document.body` and make the
 *     Lovelace surfaces transparent through *documented theme variables*.
 *
 * Aurora uses (2). The only assumptions are:
 *   - `document.body` exists and Home Assistant does not clear it (true),
 *   - CSS custom properties inherit into shadow roots (guaranteed by spec),
 *   - `--lovelace-background` is the theme variable for the dashboard surface
 *     (documented Home Assistant theming API).
 *
 * A `!important` declaration in a stylesheet outranks the inline custom
 * properties Home Assistant writes onto `<html>` when a theme is applied, so
 * theme switching cannot knock the background out.
 *
 * The layer is `pointer-events: none` and sits at a negative z-index, which
 * keeps scrolling, tapping and dragging on the dashboard completely untouched.
 */

const ROOT_ID = 'aurora-background-root';
const STYLE_ID = 'aurora-background-style';

interface Owner {
  config: AuroraBackgroundConfig;
  hass: HomeAssistant | undefined;
}

class BackgroundMount {
  private root: HTMLDivElement | null = null;
  private styleElement: HTMLStyleElement | null = null;
  private layer: AuroraLayer | null = null;
  private readonly owners = new Map<object, Owner>();
  /** The owner whose config is currently driving the shared layer. */
  private activeOwner: object | null = null;

  acquire(token: object, config: AuroraBackgroundConfig, hass: HomeAssistant | undefined): void {
    this.owners.set(token, { config, hass });
    this.activeOwner = token;
    this.ensureMounted(config);
    this.applyGlobalStyles(config);
    this.layer?.updateConfig(config);
    this.layer?.updateHass(hass);
  }

  update(token: object, config: AuroraBackgroundConfig, hass: HomeAssistant | undefined): void {
    if (!this.owners.has(token)) return;
    this.owners.set(token, { config, hass });
    if (this.activeOwner !== token) return;
    this.applyRootStyle(config);
    this.applyGlobalStyles(config);
    this.layer?.updateConfig(config);
    this.layer?.updateHass(hass);
  }

  updateHass(token: object, hass: HomeAssistant | undefined): void {
    const owner = this.owners.get(token);
    if (!owner) return;
    owner.hass = hass;
    if (this.activeOwner === token) this.layer?.updateHass(hass);
  }

  release(token: object): void {
    if (!this.owners.delete(token)) return;

    if (this.owners.size > 0) {
      // Another view still wants a background – hand over to any remaining owner.
      const [nextToken, nextOwner] = [...this.owners.entries()][0];
      this.activeOwner = nextToken;
      this.applyRootStyle(nextOwner.config);
      this.applyGlobalStyles(nextOwner.config);
      this.layer?.updateConfig(nextOwner.config);
      this.layer?.updateHass(nextOwner.hass);
      return;
    }

    this.activeOwner = null;
    this.layer?.destroy();
    this.layer = null;
    this.root?.remove();
    this.root = null;
    this.styleElement?.remove();
    this.styleElement = null;
  }

  private ensureMounted(config: AuroraBackgroundConfig): void {
    if (!this.root) {
      // Clean up a stale node from a hot-reloaded module.
      document.getElementById(ROOT_ID)?.remove();

      const root = document.createElement('div');
      root.id = ROOT_ID;
      this.root = root;
      this.applyRootStyle(config);
      document.body.insertBefore(root, document.body.firstChild);
    }

    if (!this.layer && this.root) {
      const owner = this.activeOwner ? this.owners.get(this.activeOwner) : undefined;
      // Only the shared dashboard layer publishes the `--aurora-*` properties.
      this.layer = new AuroraLayer(this.root, config, owner?.hass, true);
    }
  }

  private applyRootStyle(config: AuroraBackgroundConfig): void {
    if (!this.root) return;
    this.root.setAttribute(
      'style',
      [
        'position:fixed',
        'inset:0',
        'width:100%',
        'height:100%',
        'margin:0',
        'padding:0',
        'border:0',
        'overflow:hidden',
        'pointer-events:none',
        'user-select:none',
        '-webkit-user-select:none',
        'touch-action:none',
        'contain:layout paint style',
        // Force a stable compositor layer. A `position: fixed` element behind
        // scrolling content gets promoted and demoted repeatedly on Android
        // Chrome, and each change can present a partially painted frame.
        'transform:translateZ(0)',
        'backface-visibility:hidden',
        '-webkit-backface-visibility:hidden',
        `z-index:${config.background.z_index}`,
      ].join(';')
    );
  }

  private applyGlobalStyles(config: AuroraBackgroundConfig): void {
    if (!config.background.transparent_lovelace && !config.background.transparent_header) {
      const extra = buildCustomProperties(config);
      this.writeStyle(extra ? `:root{${extra}}` : '');
      return;
    }

    const rules: string[] = [];
    const rootProps: string[] = [];

    if (config.background.transparent_lovelace) {
      // Documented Lovelace surface variable – inherits into every shadow root.
      rootProps.push('--lovelace-background:transparent !important');
      // Older / alternative names still found in the frontend and in themes.
      rootProps.push('--view-background:transparent !important');
      rootProps.push('--ha-view-background:transparent !important');

      // Light-DOM elements we can style directly.
      rules.push(
        'html,body{background:transparent !important;}',
        'home-assistant{background:transparent !important;}'
      );
    }

    if (config.background.transparent_header) {
      rootProps.push('--app-header-background-color:transparent !important');
      rootProps.push('--header-height-background:transparent !important');
    }

    const extra = buildCustomProperties(config);
    if (extra) rootProps.push(extra);

    if (rootProps.length > 0) {
      rules.unshift(`:root{${rootProps.join(';')}}`);
    }

    this.writeStyle(rules.join('\n'));
  }

  private writeStyle(css: string): void {
    if (!this.styleElement) {
      document.getElementById(STYLE_ID)?.remove();
      const style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
      this.styleElement = style;
    }
    if (this.styleElement.textContent !== css) {
      this.styleElement.textContent = css;
    }
  }
}

function buildCustomProperties(config: AuroraBackgroundConfig): string {
  const entries = Object.entries(config.background.css_variables);
  if (entries.length === 0) return '';
  return entries.map(([name, value]) => `${name}:${value} !important`).join(';');
}

/**
 * Module-level singleton: several views (or a view being rebuilt) must never
 * end up with two canvases animating at once.
 */
export const backgroundMount = new BackgroundMount();
