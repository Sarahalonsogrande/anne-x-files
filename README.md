# Annes X Files

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```# Anne X Files

A small Angular learning project about playful data browsing, personal lists, theming, and visual experimentation.

## What is Anne X Files?

Anne X Files is a front-end playground built around lists and collections. It started as a way to experiment with Angular, signals, forms, and local persistence, and gradually became a space for exploring UI architecture and theming.

The app currently includes a large collection of phobia names, alongside a small demo collection of cats.

It is intentionally playful and experimental rather than a finished product.

## What you can do

* Browse different lists and collections
* Open list items as cards
* Mark items as favorites
* Create new lists
* Create and edit items
* Switch between light and dark modes
* Change the visual mood of the interface
* Switch between English, Spanish, and German
* Persist preferences and list data locally in the browser

## Tech stack

* Angular 21
* TypeScript
* SCSS
* Angular Signals
* RxJS
* Standalone components
* Angular Router
* ngx-translate
* `localStorage`

## Architecture

The project uses a relatively lightweight front-end architecture focused on experimentation rather than large-scale application structure.

Some of the main ideas are:

* Standalone Angular components
* Route-level lazy loading with `loadComponent`
* Signal-based state management
* Services for language, theme, mood, and storage
* Centralized UI configuration
* Browser storage for persistent preferences and list data

The goal was to keep the application simple enough to experiment with while learning how different pieces of an Angular application interact.

## Theming

The theming system became one of the main experiments in the project.

It separates two different visual concepts:

* **Mode** — light or dark
* **Mood** — the color identity of the interface

This allows the same interface to change its visual personality without coupling components to specific colors.

The system uses:

* CSS custom properties
* Semantic design tokens
* `data-mode` and `data-mood` attributes
* Separate mode and mood layers
* Persistent user preferences

The intention is to keep components consuming semantic values rather than owning concrete color decisions.

## Early theme and language initialization

One of the more deliberate pieces of the project happens before Angular bootstraps.

A small defensive script in `src/index.html` reads the saved or system-preferred theme and language and applies them directly to the document before the application starts.

This helps avoid a flash of the wrong theme on the first render and ensures that the document language is available early.

The script also guards access to `localStorage`, `matchMedia`, and `navigator` so that initialization remains safe in restricted environments.

Because this logic runs outside Angular, the corresponding storage keys and supported values need to remain consistent with the theme and language services.

## CSS and design experiments

The styling architecture is based on CSS custom properties and semantic tokens rather than relying heavily on hardcoded component colors.

The project also contains several smaller experiments, including:

* signal-based forms and validation
* interactive list editing
* a custom carousel using `IntersectionObserver`
* visual composition experiments on the welcome screen
* theme initialization before the Angular application starts

Some of these experiments are intentionally unfinished. They document the process of learning rather than pretending to be final implementations.

## Current status

Anne X Files is a **learning and experimentation project**, not a production application.

It currently has:

* Angular routing and lazy-loaded screens
* signal-driven state
* local persistence
* theming and mood switching
* multilingual UI
* list and item editing flows

It does not currently have:

* a backend or API
* authentication
* a database
* production data
* a finished product flow
* comprehensive application-specific test coverage

The project is useful as a record of learning Angular and as the starting point for deeper experiments in frontend architecture, theming, and component-driven UI.

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Then open:

```text
http://localhost:4200/
```

The application reloads automatically when source files change.

## Useful commands

```bash
npm start       # development server
npm run build   # production build
npm test        # unit tests
```

## A note about the project

Anne X Files was built to learn by making things.

Some parts are deliberately more polished than others; some exist mainly because I wanted to understand how a particular Angular or CSS idea worked.

That is part of the project.

It is less a finished application than a snapshot of the questions I was exploring while learning frontend development.


Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Early theme & language initialization

This project includes a small defensive script in `src/index.html` that runs before Angular bootstraps. Its purpose is:

- Apply the saved or system-preferred theme (dark/light) to the document root (`<html>`) to reduce flash-of-unstyled-theme on first paint.
- Set `document.documentElement.lang` early (from `localStorage.lang` or `navigator.language`) so assistive technologies see the correct language on initial render.

Notes:

- The script is defensive: it guards `localStorage`, `window.matchMedia` and `navigator` calls with try/catch so it is safe during SSR or in restricted environments.
- Keep the class application target (currently `<html>`) consistent with `ThemeService.setTheme()` to avoid visual discrepancies.
- If you change supported themes or language storage keys, update both the inline script and the corresponding services (`src/app/core/services/theme/theme.service.ts` and `src/app/core/services/language/language.service.ts`).
