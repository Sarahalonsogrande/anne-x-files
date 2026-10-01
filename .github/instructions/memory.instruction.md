---
applyTo: '**'
---

- userPreferredLanguage: es
- reminder: "Build MVP for theming (data-mode + data-mood + variables + pre-bootstrap + services + docs)"
- startWhen: "on request (scheduled for tomorrow)"
- tasks:
  - Create MVP branch with minimal theming implementation
  - Ensure `index.html` pre-bootstrap script writes `data-mode`/`data-mood`
  - Include `UiModeService` and `UiMoodService` with signals and persistence
  - Fix and consolidate `variables.scss` tokens and mood blocks
  - Add `docs/THEMING.md` and reference it from services
  - Run quick local checks (no auto commits/push without confirmation)
