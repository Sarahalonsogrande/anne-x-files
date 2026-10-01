/**
 * GenericCardComponent – Flexible, reusable card for displaying item details.
 *
 * - Shows skeleton loader while loading
 * - Displays item level, image, title, description
 * - Optional cardFooter for extra actions/stats
 * - Accessibility: alt text for images, semantic HTML
 *
 * @example
 * <app-generic-card [item]="item" [cardIndex]="i" [cardFooter]="true" />
 */

import { Component, input, output } from '@angular/core';
import { Item } from '@app/features/lists-items/models/item.model';
import { ITEM_LEVEL_COLOR_MAP, COLOR_MAP } from '@app/core/constants/ui/ui-config.constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-generic-card',
  imports: [TranslateModule],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss',
})

export class GenericCardComponent<T extends Item> {
  // Item to display in the card.
  item = input<T | null>(null);

  // Index of the card in the list.
  cardIndex = input<number>(0);

  // Whether this item is marked as favorite
  isFavorite = input<boolean>(false);
  // If true, show skeleton loader.
  skeleton = input(false);

  // If true, show the card footer with actions/stats.
  readonly cardFooter = input(true);

  // Centralized color map for item levels.
  readonly ITEM_LEVEL_COLOR_MAP = ITEM_LEVEL_COLOR_MAP;

  // Outputs for actions
  onFav = output<void>();
  onEdit = output<T>();

  /**
   * Returns the CSS variable for the item's level color.
   */
  getLevelColor(level: keyof typeof ITEM_LEVEL_COLOR_MAP | undefined): string {
    return level ? ITEM_LEVEL_COLOR_MAP[level] : 'var(--color-neutral)';
  }

  /**
   * Returns the hex color for the item's level.
   */
  getLevelHex(level: keyof typeof ITEM_LEVEL_COLOR_MAP | undefined): string {
    const cssVar = this.getLevelColor(level);
    return COLOR_MAP[cssVar as keyof typeof COLOR_MAP]?.hex ?? '#90a4ae';
  }

  /**
   * Emits the item to be edited if it is not null.
   */
  emitEdit() {
    const value = this.item();
    if (value) this.onEdit.emit(value);
  }
}
