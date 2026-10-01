import { Component, computed, input, output, signal } from '@angular/core';
import { Item } from '@app/features/lists-items/models/item.model';

@Component({
  selector: 'app-item-search',
  imports: [],
  templateUrl: './item-search.component.html',
  styleUrl: './item-search.component.scss',
})
export class ItemSearchComponent {
  // Input signal for the search term
  searchTerm = input<string>('');

  // Output for search event
  search = output<string>();

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }
}
