import type { HassEntity, HomeAssistant } from '../core/types';

/** Dispatch a Home Assistant style event (bubbling, composed). */
export function fireEvent<T>(node: HTMLElement, type: string, detail?: T): void {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true,
    })
  );
}

/** Open the standard more-info dialog for an entity. */
export function showMoreInfo(node: HTMLElement, entityId: string): void {
  fireEvent(node, 'hass-more-info', { entityId });
}

export function getEntity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): HassEntity | undefined {
  if (!hass || !entityId) return undefined;
  return hass.states[entityId];
}

export function isUnavailable(entity: HassEntity | undefined): boolean {
  return !entity || entity.state === 'unavailable' || entity.state === 'unknown';
}

export function attrNumber(entity: HassEntity | undefined, name: string): number | null {
  const raw = entity?.attributes?.[name];
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (typeof raw === 'string') {
    const parsed = Number.parseFloat(raw);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function attrString(entity: HassEntity | undefined, name: string): string | null {
  const raw = entity?.attributes?.[name];
  return typeof raw === 'string' ? raw : null;
}

export function attrList(entity: HassEntity | undefined, name: string): string[] {
  const raw = entity?.attributes?.[name];
  return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === 'string') : [];
}

/** Friendly name, falling back to a de-slugified entity id. */
export function entityName(entity: HassEntity | undefined, entityId?: string): string {
  const friendly = attrString(entity, 'friendly_name');
  if (friendly) return friendly;
  const id = entity?.entity_id ?? entityId ?? '';
  const object = id.split('.')[1] ?? id;
  return object.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Trim a trailing `.0` so 21.0 reads as 21 but 21.5 stays 21.5. */
export function formatTemperature(value: number, step: number): string {
  const digits = step < 1 ? 1 : 0;
  const text = value.toFixed(digits);
  return digits > 0 && text.endsWith('.0') ? text.slice(0, -2) : text;
}

export function callService(
  hass: HomeAssistant | undefined,
  domain: string,
  service: string,
  data: Record<string, unknown>
): void {
  // `callService` has been on the hass object for as long as custom cards have
  // existed, but guard anyway – a card must never throw inside a dashboard.
  void hass?.callService?.(domain, service, data);
}

/**
 * Approximate sRGB for a colour temperature in kelvin.
 * Based on Tanner Helland's widely used curve fit; accurate enough to make a
 * 2700 K bulb look warm and a 6500 K one look cold.
 */
export function kelvinToRgb(kelvin: number): [number, number, number] {
  const t = Math.max(1000, Math.min(40000, kelvin)) / 100;

  let r: number;
  let g: number;
  let b: number;

  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  }

  if (t >= 66) {
    b = 255;
  } else if (t <= 19) {
    b = 0;
  } else {
    b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  }

  const clamp255 = (v: number): number => Math.max(0, Math.min(255, v));
  return [clamp255(r), clamp255(g), clamp255(b)];
}
