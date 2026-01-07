---
description: Workflow de Estandarización y Escalado (Refactoring)
---

**Objetivo:** Actualizar módulos antiguos (ej. Tema 1, Tema 2) para que coincidan con la estructura y estilo de un módulo "Gold Standard" (ej. Tema 3).

**Pasos:**

1. **Identificación del Patrón de Referencia:**
* El usuario indica: "Toma como referencia Tema 3".
* Acción: Leer `Tema3_Infografic.tsx` y analizar su estructura (Layout, Navigation Tabs, uso de `ThemeProvider`).


2. **Análisis del Objetivo (Legacy):**
* Leer el archivo objetivo (ej. `Tema2_Infografic.tsx`).
* Identificar discrepancias (navegación `sticky` vs `relative`, falta de `backdrop-blur`, estructura de imports).


3. **Refactorización Estructural:**
* Reorganizar el componente objetivo para igualar el layout del referente.
* Asegurar que las *props* y componentes compartidos (como el Header o Navigation) sean idénticos.


4. **Alineación de Contenido:**
* Ajustar el índice y los títulos de las slides en el código para que coincidan con el índice del PDF/Markdown de teoría correspondiente.


5. **Validación Visual y de Compilación:**
* Ejecutar `npm run build`.
