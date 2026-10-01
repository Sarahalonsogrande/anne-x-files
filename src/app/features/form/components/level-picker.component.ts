/**
 * LevelPicker – Renders a set of selectable levels, each with a color.
 *
 * - Integrates with Angular forms using signals and model
 * - Emits the selected level for form binding
 * - Fully internationalized (i18n, via ngx-translate).
 * - Accessible: button roles, color contrast
 *
 * @example
 * <app-level-picker [field]="itemForm.level" />
 */

import { Component, model, signal } from '@angular/core';
import { ITEM_LEVEL_COLOR_MAP, ItemLevel } from '@app/core/constants/ui/ui-config.constants';
import { FormValueControl } from '@angular/forms/signals';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-level-picker',
  imports: [TranslateModule],
  // Inline template: renders a button for each level with its color
  template: `
    <div class="level-picker">
      @for (level of levels(); track $index) {
        <button
          type="button"
          class="level-btn"
          [class.selected]="isSelected(level)"
          [style.backgroundColor]="getLevelColor(level)"
          (click)="select(level)">
          {{ 'item.levels.' + level | translate }}
        </button>
      }
    </div>
  `,
  // Inline styles: layout and button appearance
  styles: `
    .level-picker {
      display: flex;
      justify-content: space-around;
      gap: 0.6rem;

      .level-btn {
        border: none;
        border-radius: 1.5rem;
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
        color: #fff;
        cursor: pointer;
        opacity: 0.7;

        &.selected {
          outline: 1.3px solid #fff;
          opacity: 1;
        }
      }
    }
  `
})
export class LevelPicker implements FormValueControl<ItemLevel | null> {
  // List of available levels (reactive)
  levels = signal<ItemLevel[]>(Object.keys(ITEM_LEVEL_COLOR_MAP) as ItemLevel[]);
  readonly ITEM_LEVEL_COLOR_MAP = ITEM_LEVEL_COLOR_MAP;

  // Model for the selected value (for form integration)
  readonly value = model<ItemLevel | null>(null);

  /**
   * Set the selected level
   */
  select(level: ItemLevel) {
    this.value.set(level);
  }

  /**
   * Get the color for a given level
   */
  getLevelColor(level: keyof typeof ITEM_LEVEL_COLOR_MAP | undefined): string {
    return level ? ITEM_LEVEL_COLOR_MAP[level] : 'var(--color-neutral)';
  }

  /**
   * Check if a level is currently selected
   */
  isSelected(level: ItemLevel) {
    return this.value() === level;
  }
}
