
/**
 * Main application configuration for Angular standalone app.
 *
 * - Configures global providers: routing, HTTP, i18n (ngx-translate).
 * - Sets up translation loader, default language, and fallback language.
 *
 * TODO (future):
 *   - Integrate authentication provider (e.g., Firebase Auth, Auth0, etc.)
 *   - Integrate Firestore or other cloud database for user/app data
 *   - Add any additional global providers here as needed
 */

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTranslateService, provideTranslateLoader } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
};
