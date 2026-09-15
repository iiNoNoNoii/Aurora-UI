import { clamp01 } from '../core/math';

export interface DragControlOptions {
  /** Which axis the value runs along. */
  axis: 'x' | 'y';
  /** Live value while dragging, 0..1. */
  onMove?: (value: number) => void;
  /** Final value when the drag ends, 0..1. */
  onCommit?: (value: number) => void;
  /** Fired instead of a drag when the pointer barely moved. */
  onTap?: () => void;
  /** Fired when the pointer is held still for `holdDelay` ms. */
  onHold?: () => void;
  /** Return true to ignore input entirely. */
  isDisabled?: () => boolean;
  holdDelay?: number;
}

/** Movement in px before a press is treated as a drag rather than a tap. */
const DRAG_THRESHOLD = 6;

/**
 * Pointer handling for the slider surfaces in Aurora's cards.
 *
 * The important detail for a dashboard is `touch-action`: a horizontal slider
 * declares `pan-y`, so the browser still owns vertical scrolling and the user
 * can flick past the card without ever fighting it. Only the axis the control
 * actually uses is claimed.
 */
export class DragControl {
  private element: HTMLElement | null = null;
  private pointerId: number | null = null;
  private startX = 0;
  private startY = 0;
  private dragging = false;
  private holdTimer: number | null = null;
  private holdFired = false;

  constructor(private readonly options: DragControlOptions) {}

  /** CSS value the host element must use for `touch-action`. */
  get touchAction(): string {
    return this.options.axis === 'x' ? 'pan-y' : 'pan-x';
  }

  attach(element: HTMLElement): void {
    if (this.element === element) return;
    this.detach();
    this.element = element;
    element.style.touchAction = this.touchAction;
    element.addEventListener('pointerdown', this.onPointerDown);
  }

  detach(): void {
    this.cancelHold();
    if (this.element) {
      this.element.removeEventListener('pointerdown', this.onPointerDown);
      this.element.removeEventListener('pointermove', this.onPointerMove);
      this.element.removeEventListener('pointerup', this.onPointerUp);
      this.element.removeEventListener('pointercancel', this.onPointerUp);
      this.element = null;
    }
    this.pointerId = null;
    this.dragging = false;
  }

  private fraction(event: PointerEvent): number {
    const element = this.element;
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    if (this.options.axis === 'x') {
      return clamp01((event.clientX - rect.left) / Math.max(1, rect.width));
    }
    // Vertical sliders read bottom-up, which is how people expect them to fill.
    return clamp01(1 - (event.clientY - rect.top) / Math.max(1, rect.height));
  }

  private readonly onPointerDown = (event: PointerEvent): void => {
    if (this.options.isDisabled?.()) return;
    if (!this.element || event.button !== 0) return;

    this.pointerId = event.pointerId;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dragging = false;
    this.holdFired = false;

    this.element.addEventListener('pointermove', this.onPointerMove);
    this.element.addEventListener('pointerup', this.onPointerUp);
    this.element.addEventListener('pointercancel', this.onPointerUp);

    if (this.options.onHold) {
      this.holdTimer = window.setTimeout(() => {
        this.holdTimer = null;
        if (this.dragging) return;
        this.holdFired = true;
        this.options.onHold?.();
      }, this.options.holdDelay ?? 500);
    }
  };

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (event.pointerId !== this.pointerId || !this.element) return;

    if (!this.dragging) {
      const moved =
        this.options.axis === 'x'
          ? Math.abs(event.clientX - this.startX)
          : Math.abs(event.clientY - this.startY);
      if (moved < DRAG_THRESHOLD) return;

      this.dragging = true;
      this.cancelHold();
      // Capture only once we are sure this is a drag, so a tap that turns into
      // a page scroll is never stolen from the browser. Capture can be refused
      // if the pointer is already gone; the drag still works without it.
      try {
        this.element.setPointerCapture(event.pointerId);
      } catch {
        /* no capture available – fall back to plain move events */
      }
    }

    this.options.onMove?.(this.fraction(event));
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    if (event.pointerId !== this.pointerId) return;
    const element = this.element;

    this.cancelHold();
    if (element) {
      element.removeEventListener('pointermove', this.onPointerMove);
      element.removeEventListener('pointerup', this.onPointerUp);
      element.removeEventListener('pointercancel', this.onPointerUp);
      try {
        if (element.hasPointerCapture(event.pointerId)) {
          element.releasePointerCapture(event.pointerId);
        }
      } catch {
        /* nothing to release */
      }
    }
    this.pointerId = null;

    if (event.type === 'pointercancel') {
      this.dragging = false;
      return;
    }

    if (this.dragging) {
      this.options.onCommit?.(this.fraction(event));
    } else if (!this.holdFired) {
      this.options.onTap?.();
    }
    this.dragging = false;
  };

  private cancelHold(): void {
    if (this.holdTimer !== null) {
      window.clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
  }
}
