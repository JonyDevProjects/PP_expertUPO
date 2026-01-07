---
description: Workflow de Integración de Nuevo Módulo (Tema X).
---

**Objetivo:** Crear e integrar un nuevo tema (ej. Tema 3, Tema 4) asegurando que todos los archivos necesarios existan y estén enlazados.

**Pasos:**

1. **Análisis de Contexto:**
* Leer el archivo de documentación origen (ej. `TemaX.md`) para entender el alcance.
* Listar los directorios existentes en `src/components/slides` para verificar la convención de nombres.


2. **Creación de Estructura de Archivos:**
* Crear directorio específico: `mkdir -p src/components/slides/TemaX`.
* Crear archivo contenedor principal: `src/TemaX_Infografic.tsx`.


3. **Desarrollo de Componentes (Slides):**
* Crear componentes individuales dentro de la carpeta del tema (ej. `SlideExecution.tsx`, `SlideControl.tsx`).
* *Regla:* Cada slide debe seguir la interfaz definida en `SlideDefinition.tsx` o `SlideContainer.tsx`.


4. **Integración en la App:**
* Importar y añadir la ruta o componente en `App.tsx`.


5. **Verificación de Compilación:**
* Ejecutar `npm run build` inmediatamente después de la creación de archivos para detectar errores de importación o sintaxis.

