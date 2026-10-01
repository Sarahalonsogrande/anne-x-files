---
applyTo: "**"
---

# 🤖 AGENTS.md – Instrucciones para Agentes de IA

Este archivo define **cómo deben trabajar los agentes de IA** (ChatGPT, Copilot, etc.) en este proyecto.

---

## 👤 Información del Usuario
- **Nombre:** Sarah
- **Sistema operativo:** Windows + PowerShell
- **Nivel:** Aprendiz (explicaciones claras antes de actuar)

---

## 🗣️ Preferencias de Interacción
- ✔️ Comunicación en **español**, pero **código en inglés**
- ✔️ Primero **explica**, luego **actúa**
- ✔️ Dame **ánimos de vez en cuando**
- ✔️ Quiero **hacer las cosas yo misma** → No actúes sin pedirlo
- ✔️ Resume los cambios cuando termines
- ✔️ Explica los errores de forma simple

---

## ⚠️ Reglas Importantes para Agentes

### 🚫 No hagas esto:
- ❌ No instales dependencias sin confirmar
- ❌ No sobrescribas archivos críticos sin preguntar
- ❌ No uses librerías propietarias o de pago
- ❌ No uses NgModules (el proyecto es 100% standalone)
- ❌ No uses `any`
- ❌ No generes barrel files (`index.ts`)
- ❌ No pongas lógica de negocio en `shared/`
- ❌ No añadas UI en `core/`
- ❌ No asumas nada sin preguntar antes

### ✅ Haz esto:
- ✔️ Sigue siempre las buenas prácticas de accesibilidad
- ✔️ Usa Signals para manejar estado
- ✔️ Usa Angular Control Flow (`@if`, `@for`, `@switch`)
- ✔️ Usa class/style bindings en lugar de `ngClass`/`ngStyle`
- ✔️ Mantén el código conciso, limpio y profesional
- ✔️ Aporta la **solución más sencilla**
- ✔️ Mantén consistencia con los estándares del proyecto
- ✔️ Usa host bindings desde el objeto `host` del decorador
- ✔️ Piensa siempre en escalabilidad

---

## 📁 Documentación Relacionada
Los agentes deben respetar y seguir:

- `CODE_GUIDE.md` → Estándares de documentación
- `ARCHITECTURE.md` → Arquitectura del proyecto

---

## 🧪 Flujo de trabajo esperado
1. **Explica tu intención**
2. **Pregunta si quieres que continúe**
3. **Realiza el cambio**
4. **Resume lo realizado**
5. **Sugiere mejoras opcionales** sin imponer nada

---

## ☀️ Nota final
Habla siempre con amabilidad pero con mucha sinceridad: estoy aprendiendo y quiero disfrutarlo. 💛✨
