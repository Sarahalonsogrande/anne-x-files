/**
 * ItemsService – Manages all list and item state using Angular signals.
 *
 * - Provides CRUD operations for lists and items
 * - Exposes reactive selectors for components
 * - Persists state using StorageService
 * - Demo data loaded from constants for initial state
 *
 * @example
 * const allLists = itemsService.allLists();
 * const item = itemsService.getItem(listId, itemId);
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { List, Item } from '@app/features/lists-items/models/item.model';
import { StorageService } from '../../../core/services/storage/storage.service';
import { ANNES_PHOBIAS } from '@app/features/lists-items/constants/annes-phobias.constants';
import { GATETES } from '@app/features/lists-items/constants/gatetes.constants';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  // Storage service for persisting lists
  private storage = inject(StorageService);

  // Internal signal holding all lists (not exposed directly).
  private readonly _lists = signal<List[]>([]);

  // Computed signal for all lists.
  private readonly lists = computed(() => this._lists());

  /**
   * Initializes the service with static demo lists.
   * Loads from storage if available, otherwise uses demo data.
   */
  constructor() {
    // Initialize lists from storage only when the storage key exists.
    // Use `getRaw` to distinguish "no data" (first run) from an existing
    // saved empty array. When the key is present we trust the stored value
    // (even if it's an empty array). Only when the key is missing do we
    // populate the demo lists and persist them.
    const raw = this.storage.getRaw('lists');
    if (raw !== null) {
      const storedLists = this.storage.loadList<List>('lists');
      this._lists.set(storedLists);
    } else {
      this._lists.set([ANNES_PHOBIAS, GATETES]);
      this.storage.saveList('lists', [ANNES_PHOBIAS, GATETES]);
    }
  }

  /**
   * Returns a computed signal for a single list by id.
   * Reacts to changes in the underlying lists signal.
   */
  selectList(id: string) {
    return computed(() =>
      this._lists().find(list => list.id === id) ?? null
    );
  }

  // Exposes all lists as a readonly computed signal for components
  get allLists() {
    return this.lists;
  }

  /**
   * Returns a single item by list and item id.
   * Useful for detail views or editing a specific item.
   * Returns null if not found.
   */
  getItem(listId: string, itemId: string): Item | null {
    const list = this.lists().find(l => l.id === listId);
    return list?.items.find(i => i.id === itemId) ?? null;
  }

  /**
   * Returns a computed signal for all items in a given list.
   */
  selectItemsByList(listId: string) {
    return computed<Item[]>(() => {
      const list = this._lists().find(l => l.id === listId);
      return list?.items ?? [];
    });
  }

  /**
   * LIST CRUD
   */

  /**
   * Adds a new list and persists state to localStorage.
   * Checks for duplicates.
   */
  addList(newList: List) {
    const exists = this._lists().some(
      l => l.id === newList.id || l.title.toLowerCase() === newList.title.toLowerCase()
    );

    if (exists) {
      console.warn(`List with id or title "${newList.title}" already exists`);
      return null;
    }

    this._lists.update(lists => {
      const updated = [...lists, newList];
      this.storage.saveList('lists', updated);
      return updated;
    });

    return newList.id;
  }

  /**
   * Removes a list by id and persists state to localStorage.
   * No-op if not found.
   */
  removeList(listId: string) {
    this._lists.update(lists => {
      const updated = lists.filter(list => list.id !== listId);
      this.storage.saveList('lists', updated);
      return updated;
    });
  }

  /**
   * ITEM CRUD
   */

  /**
   * Adds an item to a list by id if it doesn't already exist (by Item id) and persists state to localStorage .
   * Checks for duplicates.
   */
  addItem(listId: string, item: Item) {
    const list = this._lists().find(l => l.id === listId);
    if (!list) {
      console.warn(`List with id "${listId}" not found`);
      return;
    }

    const exists = list.items.some(i => i.id === item.id);
    if (exists) {
      console.warn(`Item with id "${item.id}" already exists in list "${list.title}"`);
      return;
    }

    this.updateList(listId, l => ({ ...l, items: [...l.items, item] }));
  }

  /**
   * Updates an existing item in a list by id and persists state to localStorage.
   * No-op if not found.
   */
  updateItem(listId: string, itemId: string, partial: Partial<Item>) {
    this.updateList(listId, list => ({
      ...list,
      items: list.items.map(item =>
        (item.id === itemId ? { ...item, ...partial } : item)
      ),
    }));
  }

  /**
   * Removes an item from a list by id and persists state to localStorage.
   * No-op if not found.
   */
  removeItem(listId: string, itemId: string) {
    this.updateList(listId, list => ({
      ...list,
      items: list.items.filter(item => item.id !== itemId),
    }));
  }

  /**
   * Helper to update a list by id using an updater function.
   * Ensures immutability, reactivity, and persists state to localStorage.
   */
  private updateList(
    listId: string,
    updater: (list: List) => List
  ) {
    this._lists.update(lists => {
      const updated = lists.map(list =>
        list.id === listId ? updater(list) : list
      );
      this.storage.saveList('lists', updated);
      return updated;
    });
  }
}
