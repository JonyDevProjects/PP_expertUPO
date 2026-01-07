---
description: Workflow de Refinamiento UI/UX (Ciclo de Pulido)
---

**Objetivo:** Corregir errores visuales, problemas de contraste (Dark Mode) y comportamiento de elementos.

**Pasos:**

1. **Diagnóstico:**
* El usuario reporta: "No se ve en modo oscuro" o "El elemento se solapa".
* El agente revisa las clases CSS (Tailwind) del componente afectado.


2. **Corrección de Estilos (Tailwind):**
* **Para Posicionamiento:** Revisar `sticky`, `fixed`, `relative` y `z-index`. (Ejemplo del chat: cambiar `sticky` a `relative` en la navegación para evitar solapamientos).
* **Para Dark Mode:** Asegurar que cada color de texto/fondo tenga su contraparte `dark:`.
* *Mal:* `text-gray-900`
* *Bien:* `text-gray-900 dark:text-gray-100`
* *Específico:* Revisar colores de stroke y fill en gráficos SVG.


3. **Verificación:**
* Ejecutar `npm run build` para asegurar que los estilos no rompan la sintaxis.

