import { Component, ChangeDetectionStrategy, signal, inject, computed, effect } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { form, Field, required, minLength } from '@angular/forms/signals';
import { Item } from '@app/features/lists-items/models/item.model';
import { ItemsService } from '@app/features/lists-items/services/items.service';
import { FormShellComponent } from "@app/features/form/components/form-shell/form-shell.component";
import { FormFieldComponent } from "@app/features/form/components/form-field/form-field.component";
import { LevelPicker } from "@app/features/form/components/level-picker.component";
import { HeaderSeparatorComponent } from "@app/shared/components/header-separator/header-separator.component";

@Component({
  selector: 'app-edit-form',
  imports: [Field, TranslateModule, FormShellComponent, FormFieldComponent, LevelPicker, HeaderSeparatorComponent],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * CreateFormComponent
 *
 * Handles the creation of new items and lists.
 * - Allows selecting an existing list or creating a new one.
 * - Uses Angular signals for state management.
 * - Persists all changes via ItemsService (which handles storage).
 */
export class EditFormComponent {

  private readonly itemsService = inject(ItemsService);

  private route = inject(ActivatedRoute);

  /**
   * Signal holding the current item form state.
   * Used for both form binding and validation.
   */
  itemModel = signal<Item>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    level: 'medium',
    image: ''
  });

  /**
   * Signal for the currently selected list id.
   * Used to determine which list to add the item to.
   */
  selectedListId = signal<string>('');

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
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.selectedItemId.set(id);
      }
    });

    this.route.queryParamMap.subscribe(params => {
      const listId = params.get('listId');

      if (listId) {
        this.selectedListId.set(listId);
      }
    });

    effect(() => {
      const item = this.selectedItem();

      if (!item) return;
      if (this.itemModel().id === item.id) return;

      this.itemModel.set({ ...item });
    });
  }

  onListChange(target: EventTarget | null) {
    if (!(target instanceof HTMLSelectElement)) return;

    this.selectedListId.set(target.value);
  }

  onItemChange(target: EventTarget | null) {
    if (!(target instanceof HTMLSelectElement)) return;

    this.selectedItemId.set(target.value);
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
