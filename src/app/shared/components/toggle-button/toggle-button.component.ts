import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { SwitcherOption } from '@app/core/constants/ui/ui-config.constants';

@Component({
  selector: 'app-toggle-button',
  imports: [],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent {
  // The list of available options (should be 2 for toggle).
  values = input<readonly SwitcherOption[]>([]);

  // The currently selected option.
  value = input<SwitcherOption | null>(null);

  // Accessible label for the toggle.
  ariaLabel = input<string>('');

  // Emits the toggled option.
  optionChange = output<SwitcherOption>();

  // Computed: true if the second option is selected (assuming first is off, second is on).
  readonly isChecked = computed(() => {
    const vals = this.values();
    const current = this.value();
    return vals.length === 2 && current?.value === vals[0].value;
  });

  // Computed: the two options for template.
  readonly option1 = computed(() => this.values()[0] || null);
  readonly option2 = computed(() => this.values()[1] || null);

  onToggle(event: Event) {
    const vals = this.values();
    if (vals.length !== 2) return;

    const current = this.value();
    const newOption = current?.value === vals[0].value ? vals[1] : vals[0];
    this.optionChange.emit(newOption);
  }
}
