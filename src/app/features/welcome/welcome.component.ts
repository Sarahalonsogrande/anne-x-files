import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemsService } from '@app/features/lists-items/services/items.service';
import { TranslateModule } from '@ngx-translate/core';
import { SpinButtonComponent } from "@app/shared/components/spin-button/spin-button.component";

@Component({
  selector: 'app-welcome',
  imports: [RouterLink, TranslateModule, SpinButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {

  private itemsService = inject(ItemsService);

  /**
   * Signal for all available lists (reactive, updates automatically).
   */
  lists = this.itemsService.allLists;

  // Signal para el término de búsqueda
  searchTerm = signal('');

  // Computed para filtrar listas por título
  filteredLists = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.lists();
    return this.lists().filter(list => list.title.toLowerCase().includes(term));
  });
}
