/**
 * HeaderSeparatorComponent – Simple, reusable separator for headers or sections.
 * - Displays an optional title and supports full-width styling.
 *
 * @example
 * <app-header-separator title="Section" [fullWidth]="false" />
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-separator',
  imports: [],
  templateUrl: './header-separator.component.html',
  styleUrl: './header-separator.component.scss',
})
export class HeaderSeparatorComponent {
  // Optional title to display in the separator.
  @Input() title = "";

  // If true, separator spans the full width.
  @Input() fullWidth = true;
}
