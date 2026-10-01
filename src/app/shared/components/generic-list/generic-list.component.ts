/**
 * GenericListComponent – Renders a list of items as cards with a header separator.
 *
 * - Uses signals and computed for reactive state
 * - Efficient rendering with @for and skeleton placeholders
 * - Accessibility: semantic HTML, translated titles (i18n, via ngx-translate).
 *
 * @example
 * <app-generic-list />
 */

import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from '../generic-card/generic-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '@app/features/lists-items/services/items.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { HeaderSeparatorComponent } from "../header-separator/header-separator.component";
import { TranslateModule } from '@ngx-translate/core';
import { List, Item } from '@app/features/lists-items/models/item.model';

const FAVORITES_LIST_ID = 'favorites';

@Component({
    selector: 'app-generic-list',
    imports: [CommonModule, GenericCardComponent, HeaderSeparatorComponent, TranslateModule],
    templateUrl: './generic-list.component.html',
    styleUrls: ['./generic-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GenericListComponent {
    // ActivatedRoute for reading route params.
    private route = inject(ActivatedRoute);

    private router = inject(Router);

    // ItemsService for accessing lists and items.
    private itemsService = inject(ItemsService);

    // Signal with the current listId from the route.
    listId = toSignal(this.route.paramMap.pipe(
        map(params => params.get('listId'))
    ));

    // Computed signal for the current list's title, or empty string if not found.
    listTitle = computed(() => this.list()?.title ?? '');

    // Computed signal for the current list, or null if not found.
    list = computed(() => {
        const id = this.listId();
        return id ? this.itemsService.selectList(id)() : null;
    });

    // True if the list exists and has items.
    get hasItems() {
        return !!this.list()?.items?.length;
    }

    ensureFavoritesList() {
        const exists = this.itemsService.allLists().some(list => list.id === FAVORITES_LIST_ID);
        if (!exists) {
        const newList: List = {
            id: FAVORITES_LIST_ID,
            title: 'Favoritos',
            items: []
        };

        this.itemsService.addList(newList);
        }
    }

    handleFav(item: Item) {
        this.ensureFavoritesList();

        if(this.isFavorite(item)) {
            this.itemsService.removeItem(FAVORITES_LIST_ID, item.id);
        } else {
            this.itemsService.addItem(FAVORITES_LIST_ID, item);
        }
    }

    isFavorite(item: Item): boolean {
        const favList = this.itemsService.allLists().find(list => list.id === FAVORITES_LIST_ID);
        return !!favList?.items.some(fav => fav.id === item.id);
    }

    editItem(item: Item) {
        this.router.navigate(['/edit-form', item.id], { queryParams: { listId: this.listId() } });
    }
}
