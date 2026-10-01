src/
yaml

# 🏛️ ARCHITECTURE.md – Arquitectura del Proyecto

**Framework:** Angular 21
**Estructura:** Standalone Components (sin NgModules)
**Estado:** ACTIVO

Este documento define cómo está organizado el proyecto, qué va en cada carpeta y qué reglas estructurales deben respetarse.

---

## 🧩 1. Estructura del Proyecto

├─ app/
│ ├─ core/ → Sistemas globales sin UI
│ ├─ shared/ → Cosas pequeñas, reusables y sin estado
│ ├─ features/ → Funcionalidades completas y aisladas
│ ├─ pages/ → Vistas principales (opcional, para organización)
│ └─ app.config.ts → Configuración de Angular
├─ assets/
└─ theme/

---

## 🧱 2. Propósito de Cada Carpeta

### 📦 core/ (solo lógica global)

Incluye:

- Servicios globales
- Interceptores
- Guards
- Configuración de routing
- Providers compartidos
- Utilidades de nivel aplicación

🚫 Prohibido en core/:

- Componentes UI
- Estilos de componentes
- Lógica de features

---

### 🧩 shared/ (UI pequeña y sin lógica)

Incluye:

- Componentes de UI puros
- Pipes
- Directivas pequeñas
- Tipos
- Helper functions

Reglas clave:

- Sin estado
- Sin lógica de negocio
- Sin conocimiento del dominio
- Ultra-reusables
- No dependen de features

Ejemplos válidos:

- ButtonComponent
- AvatarComponent
- TextHighlightPipe

---

### 🚀 features/ (funcionalidades completas)

Cada feature tiene sus propios:

- Servicios
- Estado (signals)
- Componentes
- Datos
- Helpers
- Subpáginas

Regla: Un feature debe poder copiarse entero a otro proyecto y funcionar.

---

### 📄 pages/ (vistas principales)

- Cada página puede cargarse con lazy loading (loadComponent)
- Contienen layout + subcomponentes
- No contienen lógica de negocio
- Orquestan servicios de features

---

## 🧭 3. Routing & Navigation

- Se usa provideRouter() en app.config.ts
- Todas las páginas son standalone
- Uso obligatorio de:
  - route titles
  - route data
  - signals para extracción de parámetros

Ejemplo:

```ts
{
  path: 'profile',
  loadComponent: () => import('./pages/profile/profile.page'),
  title: 'Profile'
}
```

---

## 🔌 4. Estado de la Aplicación (Signals)

Reglas:

- No usar NgRx, Akita o Redux
- Usar signals y computed para el estado local y derivado

---

## 🎨 5. Estilos

- Un componente = un archivo SCSS
- Estilos encapsulados siempre

---

## 🌐 6. Path Aliases

Definidos en tsconfig.json:

```jsonc
"@core/*":      ["src/app/core/*"],
"@shared/*":    ["src/app/shared/*"],
"@features/*":  ["src/app/features/*"],
"@pages/*":     ["src/app/pages/*"]
```

No usar rutas relativas largas tipo ../../../../../service.ts.

---

## 🧪 7. Testing

- Unit tests en componentes UI importantes
- Tests de servicios en features
- No testear código trivial, rutas ni decoradores

---

## 📦 8. Dependencias Permitidas

✔ Angular core + common + router
✔ RxJS (mínimo uso, signals first)
✔ Ngx-translate
✔ Librerías MIT sin dependencias pesadas

---

## 🚫 9. Prohibiciones Arquitectónicas

❌ NgModules (proyecto standalone)
❌ Barrel files (index.ts)
❌ Servicios dentro de shared/
❌ Lógica de negocio en componentes
❌ Estado dentro de shared/ components
❌ UI dentro de core/
❌ Expander el root state sin motivo
❌ Router dentro de servicios
❌ CSS global innecesario

---

## 🧩 10. Flujo de Desarrollo

- Crear feature → carpeta en features/
- Añadir estado → signals
- Añadir servicios → en la misma carpeta
- Crear componentes → dentro del feature
- Añadir página → carpeta en pages/
- Conectar todo vía inyección
- Documentar según CODE_GUIDE.md
