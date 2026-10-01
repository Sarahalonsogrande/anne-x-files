/**
 * CreateFormComponent – Handles creation of new items and lists.
 *
 * - Allows selecting an existing list or creating a new one
 * - Uses Angular signals and computed for reactive state
 * - Reactive form validation for item fields
 * - Persists changes via ItemsService
 * - Fully internationalized (i18n, via ngx-translate) and accessible
 *
 * @example
 * <app-create-form />
 */

import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { form, required, minLength } from '@angular/forms/signals';
import { Item } from '@app/features/lists-items/models/item.model';
import { ItemsService } from '@app/features/lists-items/services/items.service';
import { FormShellComponent } from "../components/form-shell/form-shell.component";
import { FormFieldComponent } from "../components/form-field/form-field.component";
import { HeaderSeparatorComponent } from "@app/shared/components/header-separator/header-separator.component";
import { FormItemComponent } from "../components/form-item/form-item.component";

@Component({
  selector: 'app-create-form',
  imports: [TranslateModule, FormShellComponent, FormFieldComponent, HeaderSeparatorComponent, FormItemComponent],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFormComponent {
  private readonly itemsService = inject(ItemsService);

  /**
   * Signal holding the current item form state (for binding and validation)
   */
  itemModel = signal<Item>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    level: 'medium',
    image: ''
  });

  // Signal for the currently selected list id
  selectedListId = signal<string>('');

  // Signal for the new list title input
  newListTitle = signal<string>('');

  // Signal for all available lists (reactive)
  lists = this.itemsService.allLists;

  /**
   * Computed signal for items in the selected list.
   * Updates automatically when selectedListId changes.
   */
  items = computed(() => {
    const listId = this.selectedListId();
    if (!listId) return [];
    return this.itemsService.selectItemsByList(listId)();
  });

  /**
   * Computed signal for the title of the currently selected list.
   */
  selectedListTitle = computed(() => {
    const id = this.selectedListId();
    if (!id) return '';
    const list = this.lists().find(l => l.id === id);
    return list?.title ?? '';
  });

  /**
   * Handles list selection changes from the dropdown.
   */
  onListChange(target: EventTarget | null) {
    if (!(target instanceof HTMLSelectElement)) return;
    this.selectedListId.set(target.value);
  }

  /**
   * Handles input changes for the new list title field.
   */
  onNewListTitleInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    this.newListTitle.set(input?.value ?? '');
  }

  /**
   * Creates a new list with the given title and selects it.
   * Resets the newListTitle input after creation.
   */
  addNewList() {
    const title = this.newListTitle();
    if (!title) return;
    const newListId = crypto.randomUUID();
    this.itemsService.addList({
      id: newListId,
      title,
      items: []
    });
    this.selectedListId.set(newListId);
    this.newListTitle.set('');
  }

  /**
   * Handles form submission to create a new item in the selected list.
   * Resets the form after successful creation.
   */
  onSubmit() {
    const listId = this.selectedListId();
    if (!listId) return;
    const item = this.itemModel();
    this.itemsService.addItem(this.selectedListId(), {
      ...this.itemModel(),
      id: crypto.randomUUID()
    });
    this.resetForm();
  }

  /**
   * Resets the form fields and signals to their initial state.
   */
  resetForm() {
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

  /**
   * Signal-based form group for validation and field binding.
   * Requires a title (min 4 characters).
   */
  itemForm = form(this.itemModel, (schemaPath) => {
    required(schemaPath.title, { message: 'A title for the Item is required' });
    minLength(schemaPath.title, 4, { message: 'Minimum 4 characters' });
  });

  // Empty constructor (required for Angular DI)
  constructor() { }

}
