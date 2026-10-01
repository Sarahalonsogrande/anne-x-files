/**
 * FormFieldComponent – Flexible wrapper for form controls with optional label.
 *
 * - Supports projected content and full-width styling
 * - Ready for future error handling
 *
 * @example
 * <app-form-field [label]="'Name'" [field]="nameField" [fullWidth]="true">
 *   <input ... />
 * </app-form-field>
 */

import { Component, Input } from '@angular/core';
import { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  // Optional label for the form field.
  @Input() label = '';

  // Field instance for validation and error handling.
  @Input() field?: Field<any>;

  // If true, field spans the full width.
  @Input() fullWidth = false;
}
