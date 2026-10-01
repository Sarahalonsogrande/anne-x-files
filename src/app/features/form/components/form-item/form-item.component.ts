/**
 * FormItemComponent – Renders a form for editing or creating an item.
 *
 * - Uses reusable form-field and level-picker components
 * - Receives a reactive itemForm for binding fields
 * - All labels and placeholders are translated (i18n, via ngx-translate).
 *
 * @example
 * <app-form-item [itemForm]="itemForm" />
 */

import { Component, Input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldComponent } from "../form-field/form-field.component";
import { LevelPicker } from "../level-picker.component";
import { HeaderSeparatorComponent } from "@app/shared/components/header-separator/header-separator.component";

@Component({
  selector: 'app-form-item',
  imports: [FormFieldComponent, LevelPicker, Field, TranslateModule, HeaderSeparatorComponent],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.scss',
})
export class FormItemComponent {
  // Reactive form group or signal for the item fields.
  @Input({ required: true }) itemForm!: any;
}
