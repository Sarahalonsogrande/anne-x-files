/**
 * FormShellComponent – Provides a flexible shell for forms with projected content.
 *
 * - Renders a generic card for the current item
 * - Emits submit, reset, click, and create events
 * - Accessibility: semantic form, translated button labels (i18n, via ngx-translate).
 *
 * @example
 * <app-form-shell [itemModel]="itemSignal" (onSubmit)="save()" />
 */

import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { Item } from '@app/features/lists-items/models/item.model';
import { GenericCardComponent } from "@app/shared/components/generic-card/generic-card.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-shell',
  imports: [GenericCardComponent, TranslateModule],
  templateUrl: './form-shell.component.html',
  styleUrl: './form-shell.component.scss',
})
export class FormShellComponent {
  // Signal for the current item model.
  @Input() itemModel!: Signal<Item>;

  // Output events: submit, reset, click, and create actions.
  @Output() onSubmit = new EventEmitter<void>();
  @Output() onReset = new EventEmitter<void>();
  @Output() onClick = new EventEmitter<void>();
  @Output() onCreate = new EventEmitter<void>();
}
