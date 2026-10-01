/**
 * LanguageService – Manages application language (ngx-translate) and persistence.
 *
 * Responsibilities:
 * - Configure ngx-translate fallback/default language.
 * - Load and persist the user's language preference to `localStorage` when
 *   available (defensive try/catch to remain functional in restricted
 *   environments and during SSR).
 * - Expose the current language as a readonly signal and convenience accessors
 *   for the primitive value.
 * - Keep constructor free of browser-only side effects; call `init()` from a
 *   browser runtime entry (e.g. `AppComponent.ngOnInit()` or `main.ts`).
 *
 * Example:
 * // Change language
 * languageService.changeLang('es');
 * // Get current language signal
 * const langSignal = languageService.getCurrentLang();
 * // Get primitive value
 * const lang = languageService.getCurrentLangValue();
 */

import { inject, Injectable, signal, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LANG_OPTIONS, LangCode } from '@app/core/constants/ui/ui-config.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly translateService: TranslateService | null = null;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly langKey = 'lang';
  private readonly supportedLangs: readonly LangCode[] = LANG_OPTIONS.map(option => option.value);
  private readonly _lang = signal<LangCode>('en');
  readonly lang = this._lang.asReadonly();
  private readonly defaultLang: LangCode = 'en';

  /**
   * Initializes language settings and sets the fallback language.
   * Loads the saved language from localStorage or uses the default.
   */
  constructor(@Optional() translateService?: TranslateService | null) {
    this.translateService = translateService ?? null;
  }

  /**
   * Initialize runtime-only language settings.
   *
   * - Must be invoked from a browser-only context (e.g. `AppComponent.ngOnInit`).
    * - Sets ngx-translate fallback language and attempts to load any saved value
    *   from `localStorage` (protected with try/catch).
    * - IMPORTANT: Call `init()` before performing runtime language changes so
    *   `TranslateService` is configured and persisted preferences are loaded.
   */
  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Set the fallback language and load any saved value from localStorage
    if (this.translateService) {
      this.translateService.setFallbackLang(this.defaultLang);
    }
    this.loadSavedLang();
  }

  /**
   * Load saved language (defensive): attempts to read from `localStorage` and
   * falls back to `defaultLang` when unavailable or invalid.
   */
  private loadSavedLang() {
    let stored: LangCode | null = null;
    try {
      stored = localStorage.getItem(this.langKey) as LangCode | null;
    } catch (e) {
      // localStorage may be unavailable (private mode, SSR, blocked); ignore and fallback
      stored = null;
    }
    const lang = stored && this.supportedLangs.includes(stored) ? stored : this.defaultLang;
    this.setLang(lang);
  }

  /**
   * Changes the app language if supported and saves it to localStorage.
   */
  changeLang(lang: LangCode) {
    if (this.supportedLangs.includes(lang)) {
      this.setLang(lang);
    } else {
      console.warn(`[LanguageService] Unsupported language: ${lang}`);
    }
  }

  /**
   * Apply a language: instruct ngx-translate to use it, persist it when possible,
   * and update the internal signal.
    *
    * Note: `translateService.use(lang)` starts loading translation files; callers
    * that need to react after translations are loaded should use `TranslateService`
    * events/promises (e.g. `onLangChange` / returned observables) instead of
    * assuming immediate availability.
   */
  private setLang(lang: LangCode) {
    this.translateService?.use(lang);
    try {
      localStorage.setItem(this.langKey, lang);
    } catch (e) {
      // ignore storage errors
    }
    this._lang.set(lang);
  }

  /**
   * Returns the current language as a readonly signal.
   * Use `getCurrentLangValue()` to obtain the primitive current value.
   *
   * Example:
   * // Get the signal and read current value immediately
   * const langSignal = languageService.getCurrentLang();
   * const current = langSignal(); // e.g. 'en'
   */
  getCurrentLang(): typeof this.lang {
    return this.lang;
  }

  /**
   * Returns the current language value (primitive) instead of the signal.
   */
  getCurrentLangValue(): LangCode {
    return this.lang();
  }

  /**
   * Returns the list of supported language codes.
   */
  getSupportedLangs(): readonly LangCode[] {
    return this.supportedLangs;
  }

  /**
   * Returns the fallback language code.
   */
  getFallbackLang(): string | null {
    return this.translateService ? this.translateService.getFallbackLang() : null;
  }

  /**
   * Returns the list of available languages loaded by ngx-translate.
   */
  getLangs(): readonly string[] {
    return this.translateService ? this.translateService.getLangs() : [];
  }

  /**
   * Resets the app language to the default value.
   */
  resetToDefault() {
    this.changeLang(this.defaultLang);
  }
}
