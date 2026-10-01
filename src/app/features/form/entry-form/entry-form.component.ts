import { Component, ChangeDetectionStrategy, signal, effect, inject, computed } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { form, Field, required, minLength } from '@angular/forms/signals';
import { Item, List } from '@app/features/lists-items/models/item.model';
import { ItemsService } from '@app/features/lists-items/services/items.service';
import { LevelPicker } from "../components/level-picker.component";
import { GenericCardComponent } from "@app/shared/components/generic-card/generic-card.component";

@Component({
  selector: 'app-entry-form',
  imports: [Field, TranslateModule, LevelPicker, GenericCardComponent],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EntryFormComponent {

  private readonly itemsService = inject(ItemsService);

  itemModel = signal<Item>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    level: 'medium',
    image: ''
  });

  // listModel = signal<List>({
  //   id: '',
  //   title: '',
  // });

  selectedListId = signal<string>('');

  newListTitle = signal<string>('');

  lists = this.itemsService.allLists();

  items = computed(() => {
    const listId = this.selectedListId();
    if (!listId) return [];
    return this.itemsService.selectItemsByList(listId)();
  });

  selectedItemId = signal<string>('');

  selectedItem = computed(() => {
    const listId = this.selectedListId();
    const itemId = this.selectedItemId();

    if (!listId || !itemId) return null;
    return this.itemsService.getItem(listId, itemId);
  });

  isEditMode = computed(() => !!this.selectedItemId());

  constructor() {
    effect(() => {
      const item = this.selectedItem();

      if (!item) return;
      if (this.itemModel().id === item.id) return;

      this.itemModel.set({ ...item });
    });
  }

  onListChange(target: EventTarget | null) {
    if (!(target instanceof HTMLSelectElement)) return;
    // const select = event.target as HTMLSelectElement | null;
    // if (!select) return;

    this.selectedListId.set(target.value);
  }

  onItemChange(event: Event) {
    const select = event.target as HTMLSelectElement | null;
    if (!select) return;

    this.selectedItemId.set(select.value);
  }

  onNewListTitleInput(event: Event) {
    const input = event.target as HTMLInputElement | null;

    this.newListTitle();
  }

  onSubmit() {
    const listId = this.selectedListId();
    if (!listId) return;

    const item = this.itemModel();

    if (this.isEditMode()) {
      this.itemsService.updateItem(
        listId,
        item.id,
        item
      );
      console.log('After update:', this.itemsService.selectItemsByList(listId)());
    } else {
      this.itemsService.addItem(listId, {
        ...item,
        id: crypto.randomUUID()
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.selectedItemId.set('');
    this.newListTitle.set('');
    this.itemModel.set({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      level: 'medium',
      image: ''
    });
  }

  // Validators
  itemForm = form(this.itemModel, (schemaPath) => {
    required(schemaPath.title, { message: 'A title for the Item is required' });
    minLength(schemaPath.title, 4, { message: 'Minimum 4 chraracteres' });
  });

}
