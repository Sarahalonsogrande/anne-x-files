/**
 * SpinButtonComponent – Reusable floating action button with a spin animation.
 *
 * - Direction-aware spin animation
 * - Uses signals, computed and output for reactive inputs/outputs
 * - Accessible: accepts an `ariaLabel` for screen readers
 * - Internationalization-friendly (labels come from constants/i18n keys)
 *
 * Example usage:
 * <app-spin-button
 *   [values]="MoodOptions"
 *   [ariaLabel]="'aria.selectMood' | translate"
 *   (optionChange)="setMood($event)"
 *   [value]="currentMoodOption()">
 * </app-spin-button>
 */

import { Component, input, signal, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { SwitcherOption, RotationDirection } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-spin-button',
  standalone: true,
  imports: [],
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinButtonComponent {
  route = input<string | any[]>('');

  // The currently selected option.
  value = input<SwitcherOption | null>(null);

  // The list of available options to switch between.
  values = input<readonly SwitcherOption[]>([]);

  // Accessible label for the button (for screen readers).
  ariaLabel = input<string>('');

  // Optional default icon (emoji or text) to show when no option img/icon exists.
  defaultIcon = input<string | null>(null);

  // Controls whether the spin animation is active
  isRotating = signal(false);
  // Internal timeout id used as a safety net when animationend doesn't fire
  private _rotationTimeout: any = null;

  // Emits the next option when the user toggles the button.
  optionChange = output<SwitcherOption>();

  // Direction of the spin animation
  rotationDirection = signal<RotationDirection>('next');

  /**
 * Computes the next option to display based on the current value
 * and the current rotation direction (next/prev).
 * Pure computation, it does not modify any signals.
   */
  readonly next = computed<SwitcherOption | null>(() => {
    const vals = this.values();
    if (!vals.length) return null;
    if (vals.length === 1) return vals[0];

    const current = this.value();
    // If no current, use first element as baseline
    if (current === null) return vals[0];

    let idx = vals.findIndex(v => v.value === current.value);
    if (idx === -1) idx = 0;

    const direction = this.rotationDirection();
    let nextIdx = idx;
    if (direction === 'next') {
      nextIdx = idx === vals.length - 1 ? idx - 1 : idx + 1; // bounce back
    } else {
      nextIdx = idx === 0 ? idx + 1 : idx - 1; // bounce forward
    }

    // Clamp to valid range as a safety net
    nextIdx = Math.max(0, Math.min(vals.length - 1, nextIdx));
    return vals[nextIdx];
  });

  /**
   * Handles user click on the switcher button:
   * Prevents multiple clicks during animation.
   * Updates rotationDirection if end/start is reached
   * Emits the next option and triggers the spin animation.
   */
  onSwitch(): void {
    // Prevents triggering a new switch while an animation is ongoing.
    if (this.isRotating()) return;
    const vals = this.values();

    // No values: just animate
    if (!vals.length) {
      this.isRotating.set(true);
      this.scheduleRotationClear();
      return;
    }

    // If there's a single option, animate but do not emit
    if (vals.length === 1) {
      this.isRotating.set(true);
      this.scheduleRotationClear();
      return;
    }

    const current = this.value();
    let idx = current == null ? 0 : vals.findIndex(v => v.value === current.value);
    if (idx === -1) idx = 0;

    // Update direction if at bounds
    let direction: RotationDirection = this.rotationDirection();
    if (direction === 'next' && idx === vals.length - 1) direction = 'prev';
    else if (direction === 'prev' && idx === 0) direction = 'next';
    this.rotationDirection.set(direction);

    const next = this.next();
    if (!next) {
      this.isRotating.set(true);
      this.scheduleRotationClear();
      return;
    }

    this.isRotating.set(true);
    this.optionChange.emit(next);
    this.scheduleRotationClear();
  }

  /**
   * Schedule a safety timeout to clear `isRotating` in case `animationend`
   * doesn't fire (reduced-motion, environment restrictions, etc.).
   */
  private scheduleRotationClear(): void {
    try {
      if (this._rotationTimeout) {
        clearTimeout(this._rotationTimeout);
        this._rotationTimeout = null;
      }
      const prefersReduced = typeof window !== 'undefined' && !!(window as any).matchMedia && (window as any).matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        this._rotationTimeout = setTimeout(() => {
          this.isRotating.set(false);
          this._rotationTimeout = null;
        }, 10);
      } else {
        // Safety net slightly longer than CSS animation duration
        this._rotationTimeout = setTimeout(() => {
          this.isRotating.set(false);
          this._rotationTimeout = null;
        }, 1200);
      }
    } catch (e) {
      // Defensive
    }
  }

  /**
   * Indicates whether the button is in a "pressed" state
   * for assistive technologies (screen readers).
   */
  readonly ariaPressed = computed<boolean>(() => {
    return this.value() !== null;
  });

  /**
   * Text to announce via an `aria-live` region when the selected option changes.
   * Falls back to `value` if no human-readable `label` exists on the option.
   */
  readonly announcerText = computed<string>(() => {
    const v = this.value();
    if (!v) return '';
    // Try common label fields, otherwise use the option value as fallback
    return (v as any).label ?? (v as any).text ?? (v as any).value ?? '';
  });

  // Called from template when the CSS animation ends. Clears safety timeout.
  onAnimationEnd(): void {
    this.isRotating.set(false);
    if (this._rotationTimeout) {
      clearTimeout(this._rotationTimeout);
      this._rotationTimeout = null;
    }
  }
}
