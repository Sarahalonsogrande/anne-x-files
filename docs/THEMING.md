# Theming: modes and moods (color identity)

## Summary

This document describes the theming solution used by the application:
How luminosity (`mode`, e.g. `light` / `dark`) and color identity (`mood`, e.g.`honey`, `flowery`) are managed,
the storage keys, the pre-bootstrap script, the Angular services API, and CSS/variable conventions.
It should act as the single source of truth for developers extending theming behavior.

## Key concepts

- `mode` (luminosity): controls UI contrast/brightness (`light` / `dark`).
- `mood` (color identity): controls the palette hue (e.g. `honey`).
- `data-mode` and `data-mood`: attributes applied on `html`/`body` used by CSS to apply token overrides.
- Primary mechanism for token overrides: Attribute selectors (`:root[data-mode='dark']`).
- Retained for legacy compatibility: Classes (`.dark`, `.honey`).

## Storage keys

- `ui-mode` — persisted mode value :
  e.g. `'light'`, `'dark'`, or `'system'` if the app supports a system-following option.
- `ui-mood` — persisted mood value:
  enumeration defined in `MOOD_OPTIONS`. Default mood is 'honey', defined in `ui-config.constants.ts` as `DEFAULT_MOOD`.
- `lang` — persisted language code:
  e.g. `en`, `es`, `de`.

## Pre-bootstrap (index.html)

A small inline script in `index.html` runs before Angular boots to reduce FOUC (flash of unstyled content).

Responsibilities:

- Read `localStorage['ui-mode']`, `localStorage['ui-mood']` and `localStorage['lang']` defensively (try/catch).
- Validate values against `allowedModes` and `allowedMoods`.
- If `ui-mode` exists and is valid → apply it; otherwise consult `matchMedia('(prefers-color-scheme: dark)')`.
- Apply both `data-*` attributes and corresponding classes on `<html>` and `<body>`
  so CSS authoring can target either attribute- or class-based rules.

Example (pre-bootstrap):

```html
<script>
  (function () {
    var allowedModes = ['light', 'dark'];
    var allowedMoods = ['honey', 'flowery', 'leafy', 'birthday', 'ocean'];
    try {
      var storedMode = null;
      try {
        storedMode = localStorage.getItem('ui-mode');
      } catch (e) {
        storedMode = null;
      }
      var prefersDark = !!(
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      );
      var mode = allowedModes.includes(storedMode) ? storedMode : prefersDark ? 'dark' : 'light';
      if (mode && document && document.documentElement) {
        document.documentElement.setAttribute('data-mode', mode);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(mode);
        try {
          document.body.classList.remove('light', 'dark');
          document.body.classList.add(mode);
        } catch (e) {}
        try {
          document.body.setAttribute('data-mode', mode);
        } catch (e) {}
      }
      var storedMood = null;
      try {
        storedMood = localStorage.getItem('ui-mood');
      } catch (e) {
        storedMood = null;
      }
      var mood = allowedMoods.includes(storedMood) ? storedMood : 'honey';
      if (mood && document && document.documentElement) {
        document.documentElement.setAttribute('data-mood', mood);
        try {
          document.body.setAttribute('data-mood', mood);
        } catch (e) {}
      }
      // LANGUAGE: Initialize from localStorage or navigator.
      var storedLang = null;
      try {
        storedLang = localStorage.getItem('lang');
      } catch (e) {
        storedLang = null;
      }

      var navLang = null;
      try {
        navLang =
          typeof navigator !== 'undefined' && navigator.language
            ? navigator.language.split('-')[0]
            : null;
      } catch (e) {
        navLang = null;
      }

      var lang = storedLang || navLang || 'en';
      // Set lang attribute on html element.
      if (typeof document !== 'undefined' && document.documentElement && lang) {
        if (lang && document && document.documentElement) document.documentElement.lang = lang;
      }
    } catch (e) {}
  })();
</script>
```

## Angular services (API and behavior)

Two services implement theming behavior in the app:

- `UiModeService` (src/app/core/services/ui-modes/ui-mode.service.ts)
  - `init()` — called at app startup.
    Behavior:
    if `localStorage['ui-mode']` contains a valid value, apply it; otherwise fall back to `matchMedia`.
  - `setMode(mode: ModeMode)` — validate, apply class and `data-mode` on `<html>`/`<body>`,
    persist in `ui-mode`, and update the internal signal.
  - `toggleMode()` — swap between `light` and `dark`.
  - `mode` — a readonly signal exposing current mode.

- `UiMoodService` (src/app/core/services/ui-moods/ui-mood.service.ts)
  - `init()` — read `ui-mood` and apply; if none exists apply a default (e.g. `'honey'`).
  - `setMood(mood: MoodMode)` — validate, set `data-mood` and mood class on `<html>`/`<body>`,
    persist to `ui-mood`, and update the internal signal.
  - `mood` — a readonly signal exposing current mood.

## CSS/variable conventions

- Prefer attribute selectors for token overrides:

  ```css
  :root[data-mode='dark'] {
    --background: #0b0b0b;
  }

  :root[data-mood='honey'] {
    --primary-h: 45;
    --primary-s: 100%;
  }
  ```

- Keep class selectors (`html.dark`, `.honey`) only for legacy compatibility.

Moods use HSL (Hue/Saturation/Lightness) to change color identity. H changes the base color, S adjusts vibrancy, L controls brightness. This allows moods to vary without conflicting with mode (light/dark).

Example:

```scss
// Base HSL values for moods
:root {
  --primary-h: 45; // Hue for honey
  --primary-s: 100%; // Saturation
  --primary-l: 50%; // Lightness
}

// Override for flowery mood
:root[data-mood='flowery'] {
  --primary-h: 120; // Green hue
  --primary-s: 80%;
  --primary-l: 60%;
}

// Derived RGB for compatibility
--primary-rgb: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
--color-primary-rgb: var(--primary-rgb);
--card-bg-accent: rgba(var(--color-primary-rgb) / var(--alpha-medium));
```

## Best practices / recommendations

- Maintain a single source of truth for storage keys (`ui-mode`, `ui-mood`).
- Always validate values read from `localStorage` before applying them to the DOM.
- Prefer `data-*` attributes for token-based styling; use classes only for backwards compatibility.
- If supporting a "follow system" option, store `'system'` in `ui-mode` and subscribe to `matchMedia`
  from the service only when the user has selected that option (or when there is no persisted choice).
- Document in `variables.scss` which tokens are public (for components) and which are private helpers.

## Usage examples (components)

```ts
// In app.ts or app.config.ts (root)
ngOnInit() {
  this.modeService.init();
  this.moodService.init();
}

// Change mode from UI
this.modeService.setMode('dark');

// Change mood
this.moodService.setMood('flowery');
```

## Current status

- Services sync both `data-*` attributes and classes on `html` and `body`.
- `variables.scss` is organized around `data-mode`/`data-mood` token overrides
  and components should consume only semantic tokens.

## FAQ
