/**
 * StorageService – lightweight wrapper around `localStorage`.
 *
 * Responsibilities:
 * - Serialize/deserialize values (JSON).
 * - Provide safe no-op behavior when storage is unavailable (SSR/private mode).
 *
 * TODO: consider injecting a `STORAGE` token to improve testability.
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class StorageService {
    // Returns true when localStorage is available in the environment.
    private isBrowser(): boolean {
        return typeof window !== 'undefined' && typeof (window as any).localStorage !== 'undefined';
    }

    /**
     * Returns the platform storage object or null when unavailable (SSR or
     * restricted environments). Centralizing access makes this service easier
     * to test and more defensive.
     */
    private getStorage(): Storage | null {
        return this.isBrowser() ? localStorage : null;
    }

    /** Serialize and save a value under `key`. No-op if storage unavailable. */
    save<T>(key: string, value: T): void {
        try {
            const s = this.getStorage();
            if (!s) return;
            s.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    /** Load and parse a value; return `defaultValue` on missing key or error. */
    load<T>(key: string, defaultValue?: T): T | undefined {
        try {
            const s = this.getStorage();
            if (!s) return defaultValue;
            const raw = s.getItem(key);
            if (raw == null) return defaultValue;
            return JSON.parse(raw) as T;
        } catch (error) {
            console.error('Error loading from storage:', error);
            return defaultValue;
        }
    }

    /** Convenience: save an array under `key`. */
    saveList<T>(key: string, list: T[]): void {
        this.save<T[]>(key, list);
    }

    /** Load an array; returns empty array when missing or on error. */
    loadList<T>(key: string): T[] {
        const value = this.load<T[]>(key, []);
        return value ?? [];
    }

    /** Remove a key from storage; no-op if unavailable. */
    clearList(key: string): void {
        try {
            const s = this.getStorage();
            if (!s) return;
            s.removeItem(key);
        } catch (error) {
            console.error('Error clearing list from storage:', error);
        }
    }

    /** Return the raw string value for `key` or null. */
    getRaw(key: string): string | null {
        try {
            const s = this.getStorage();
            if (!s) return null;
            return s.getItem(key);
        } catch (error) {
            console.error('Error reading raw value from storage:', error);
            return null;
        }
    }

}
