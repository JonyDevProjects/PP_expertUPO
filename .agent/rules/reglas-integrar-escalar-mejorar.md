---
trigger: always_on
---

### Reglas Generales para el Agente (System Prompt Guidelines)

Para implementar estos workflows eficientemente, el agente debe seguir estas reglas implícitas derivadas del chat:

1. **Regla de Coherencia de Rutas:** Siempre verificar la estructura de directorios (`ls src/components/...`) antes de crear archivos nuevos para evitar duplicados o rutas incorrectas.
2. **Regla de "Build" Temprano:** Ejecutar `npm run build` tras cambios estructurales grandes o ediciones masivas para capturar errores antes de seguir avanzando.
3. **Regla de Referencia Cruzada:** Nunca inventar teoría. Siempre citar o extraer la información de los archivos `.md` o `.pdf` proporcionados en el contexto (`documentation/`).
4. **Regla de Accesibilidad (Dark Mode First):** Al crear componentes visuales, incluir siempre las clases de `dark:` para asegurar legibilidad en ambos modos, prestando especial atención a bordes y textos sobre fondos de colores.
5. **Regla de LaTeX:** Al mover fórmulas del Markdown al código, asegurarse de que el componente React pueda renderizarlas o convertirlas a una notación legible por el navegador.