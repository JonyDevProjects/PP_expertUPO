---
description: Workflow de Sincronización Teoría-Práctica (Bidireccional)
---

**Objetivo:** Asegurar que el código refleje la teoría y que la documentación explique el código.

**Sub-flujo A: Teoría  Código**

1. **Extracción:** Leer `TemaX.md` (especialmente fórmulas matemáticas LaTeX y definiciones).
2. **Inyección:** Insertar estos conceptos en los componentes React (`slides`).
* *Uso:* Tooltips, modales de información o texto explicativo junto a las gráficas interactivas.


3. **Validación:** Verificar que las fórmulas matemáticas se rendericen correctamente en la UI (usando librerías como KaTeX si es necesario, o formato simple).

**Sub-flujo B: Código  Documentación**

1. **Análisis de Funcionalidad:** El agente lee el código de una slide interactiva (ej. `InteractiveWBSBuilder.tsx`).
2. **Redacción de Guía:** Generar un apartado en el Markdown llamado `### Guía Visual para Infografías`.
3. **Descripción:** Explicar:
* Qué hace el componente.
* Cómo interactuar con él (drag & drop, inputs).
* Qué concepto teórico refuerza.

