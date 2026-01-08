# Evolución del Proyecto: De Componente Único a Web App Escalable

## 1. Estado Inicial
El proyecto comenzó con archivos sueltos en el directorio raíz:
- `Tema1_Infografic.tsx`: Contenía toda la lógica en un bloque monolítico (>500 líneas).
- `EBs-PP-Tema(1-7)-compressed.pdf`: Material de referencia teórico.

### Limitaciones Originales:
- **Dificultad de Mantenimiento**: Código espagueti difícil de extender.
- **Sin Entorno de Ejecución**: No se podía visualizar directamente en el navegador.
- **Arquitectura Dispersa**: Archivos fuente mezclados con documentación en la raíz.

## 2. Proceso de Transformación y Estructura Actual

Se ha encapsulado todo el proyecto dentro del directorio **`viz-app/`**, convirtiéndolo en una unidad autónoma y profesional.

### Estructura de Directorios (`viz-app/`)

```
viz-app/                 # Raíz del proyecto Web (Vite + React)
├── public/              # Activos estáticos públicos
├── src/                 # Código Fuente
│   ├── components/      # Componentes de la UI
│   │   ├── shared/      # Componentes reutilizables (ej. SlideContainer)
│   │   └── slides/      # Componentes específicos de cada diapositiva
│   │       ├── Tema2/   # [NUEVO] Componentes específicos del Tema 2
│   ├── data/            # Datos estáticos y configuraciones
│   ├── utils/           # Funciones de utilidad (ej. drawingUtils)
│   ├── App.tsx          # Componente principal (Gestor de Temas)
│   ├── main.tsx         # Montaje de React en el DOM
│   ├── index.css        # Estilos globales (Tailwind CSS)
│   ├── Tema1_Infografic.tsx # Orquestador Tema 1
│   └── Tema2_Infografic.tsx # [NUEVO] Orquestador Tema 2
├── documentation/       # Documentación y Referencias
│   ├── EVOLUCION_DEL_PROYECTO.md # (Este archivo)
│   └── EBs-PP-Tema(1-7)-compressed.pdf # Material teórico base
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración TypeScript
└── vite.config.ts       # Configuración del Bundler
```

> **Decisión de Arquitectura**: Se decidió mover la carpeta `documentation` **dentro** de `viz-app`. Esto permite que la aplicación sea **auto-contenida**. Si un desarrollador descarga la carpeta `viz-app`, tendrá tanto el código funcional como la documentación y referencias necesarias para entenderlo, sin depender de archivos externos en directorios superiores.

## 3. Mejoras Técnicas Implementadas

### A. Infraestructura (Vite + TypeScript)
- Se inicializó un entorno profesional con **Vite**.
- Uso estricto de **TypeScript** para evitar errores en tiempo de ejecución.
- Configuración de linter (ESLint) para mantener la calidad del código.

### B. Diseño y Estilos (Tailwind CSS)
- Instalación y configuración de **Tailwind CSS**.
- Sistema de diseño "Utility-first" para una apariencia moderna y consistente.
- Estilos responsivos integrados directamente en los componentes.

### C. Refactorización de Código (`Tema1_Infografic.tsx`)
El archivo original fue transformado radicalmente:
1.  **Modularización**: División en sub-componentes (`SlideDefinition`, `SlideLifecycle`, etc.).
2.  **Accesibilidad**: Implementación de roles ARIA (`tablist`, `tabpanel`) para compatibilidad con lectores de pantalla.
3.  **Tipado**: Definición de interfaces claras (`interface SlideItem`) para los datos.

### D. Arquitectura Modular y Escalable (Actualización Reciente)
Se profundizó la refactorización para garantizar mantenibilidad a largo plazo:
1.  **Separación de Responsabilidades**:
    - **`src/components/slides/`**: Cada diapositiva es ahora un componente independiente (ej. `SlideTripleConstraint.tsx`, `SlideManagementVsBusiness.tsx`).
    - **`src/data/`**: Los datos estáticos (mensajes, flujos, grafos) se separaron de la lógica de presentación.
    - **`src/utils/`**: Lógica compleja (como el dibujo de curvas SVG) movida a funciones puras reutilizables (`drawingUtils.ts`).
2.  **Patrón Orquestador**: `Tema1_Infografic.tsx` se limpió para actuar solo como gestor de estado y navegación, delegando la renderización a los componentes hijos.
3.  **Componentes Compartidos**: Creación de `SlideContainer` para estandarizar el layout y los títulos de todas las diapositivas.

### E. Verificación y Estabilidad
- **Validación de Build**: El proyecto compila limpiamente (`npm run build`) asegurando que no existen dependencias circulares ni errores de tipos en la nueva estructura modular.
- **Limpieza de Código**: Se han eliminado definiciones duplicadas y código muerto que residía en el archivo monolítico original.

## 4. Ampliación del Alcance: Integración del Tema 2 (Planificación)

Para demostrar la escalabilidad de la arquitectura propuesta, se integró un segundo módulo temático completo.

### A. Componentes del Tema 2
Se migraron y adaptaron visualizaciones que antes residían en documentación al árbol de código fuente:
- **`SlidePrePlanning.tsx`**: Cubre la fase de Génesis y Valoración previa al plan.
- **`SlidePlanning.tsx`**: Detalla las áreas de conocimiento (Alcance, Tiempo, Coste, etc.) en una interfaz de pestañas verticales.
- **`SlidePlanAndBaseline.tsx`**: Muestra la estructura del Plan Maestro y las Líneas Base.

### B. Navegación Multi-Tema
- **Selector de Temas**: Se modificó `App.tsx` para incluir una navegación de nivel superior que permite alternar entre "Tema 1" y "Tema 2".
- **Consistencia Visual**: Se mantuvo el lenguaje de diseño pero variando la paleta de colores (Índigo para Tema 1, Verde Azulado/Teal para Tema 2) para dar identidad visual a cada módulo.

## 5. Próximos Pasos
- **Optimización de Interacciones**: Refinar las micro-interacciones y animaciones para una experiencia más fluida.
- **Cobertura de Pruebas**: Implementar tests unitarios para las utilidades críticas y tests E2E para los flujos principales.
- **Accesibilidad**: Auditoría completa de contraste y navegación por teclado.

## 6. Análisis del Estado Actual (Enero 2026)
*Auditoría realizada bajo el workflow `/a-main-intregation`*

### A. Salud del Código
- **Puntos Fuertes**: 
    - La arquitectura modular establecida está madura y permite la integración de nuevos temas (como se demostró con el Tema 2) sin fricción.
    - El uso de **TypeScript** es consistente y evita errores de tipo comunes.
    - La separación de `shared/SlideContainer` ha unificado la UX.
- **Puntos de Dolor (Code Smells & Hotspots)**:
    - **`SlideTripleConstraint.tsx` (Complejidad)**: Este componente actúa como un mini-monolito. Gestiona demasiados estados concurrentes (navegación de tabs, TTS activo, resaltado de funciones, fases de workflow, celdas de matriz). Debería refactorizarse extrayendo la lógica de estado a un Hook personalizado (`useTripleConstraintState`) o usando un Reducer.
    - **Hardcoded Data**: Las cadenas de texto para la narración (arrays `steps`) y contenidos de diapositivas (como en `SlideDefinition`) están "quemados" dentro de los componentes. Esto viola el principio de separación de intereses (Contenido vs Presentación) y dificulta la internacionalización.

### B. Deuda Técnica Crítica
- **Ausencia Total de Tests**: No existe configuración de pruebas (`vitest` o `jest`) ni scripts en `package.json`. Cualquier refactorización actual es de alto riesgo ("High Wire Walk").
- **Acoplamiento de Datos**: Visualizaciones complejas dependen de la estructura exacta de datos en `src/data`. Se recomienda validar estos datos con esquemas (ej. Zod) al consumirlos.

### C. Hoja de Ruta Recomendada (Next Steps)
1.  **Prioridad 0 (Seguridad)**: Instalar `Vitest` y crear el primer test de humo ("Smoke Test") para asegurar que la App renderiza.
2.  **Prioridad 1 (Limpieza)**: Extraer todos los textos "hardcoded" de `Search`, `Definition` y `TripleConstraint` a archivos JSON en `src/data/locales/`.
3.  **Prioridad 2 (Escalabilidad)**: Refactorizar `SlideTripleConstraint` para desacoplar la máquina de estados de la vista.

## 7. Avances de Enero 2026: Testing, Limpieza y Escalado
*Implementación de la Hoja de Ruta (Puntos 6.C.1, 6.C.2, 6.C.3)*

Se completó con éxito el ciclo de mejora propuesto, estableciendo una base más sólida para el crecimiento futuro de la aplicación.

### A. Prioridad 0: Red de Seguridad (Testing)
Se instaló e integró **Vitest** junto con `React Testing Library`.
- **Desafíos Encontrados**:
    - **Compatibilidad con Node 16**: El proyecto corre en Node 16.20.2, lo que causó conflictos con las versiones más recientes de Vitest y Testing Library que exigen Node 18+. Se resolvió anclando versiones específicas (`vitest@0.34.6`, `jsdom@22.1.0`).
    - **Dependencias Peer**: Conflicto entre `react@19` (instalado) y `@testing-library/react@14` (que espera react 18). Se mitigó usando versiones compatibles y overrides.
    - **Mocks Globales**: Componentes dependientes de `window.matchMedia` fallaban en JSDOM. Se creó `src/test/setup.ts` para mockear estas APIs del navegador.
- **Resultado**: Test de humo funcional (`npm test`) que verifica el renderizado de la App sin fallos.

### B. Prioridad 1: Extracción de Textos (Limpieza)
Se eliminó el "Hardcoded Text" de los componentes principales del Tema 1.
- **Arquitectura de Datos**: Se creó el directorio `src/data/locales/Tema1/` con archivos JSON (`definition.json`, `originViability.json`, `tripleConstraint.json`).
- **Adaptación TypeScript**: TypeScript inicialmente no permitía importar JSONs en modo `ESNext` sin configuración extra. Se añadió `src/declarations.d.ts` y se ajustó `tsconfig.app.json` (`resolveJsonModule: true`).
- **Beneficio**: Los componentes `SlideDefinition`, `SlideOriginAndViability` y `SlideTripleConstraint` ya no mezclan contenido con lógica, siendo este el primer paso hacia la internacionalización (i18n).

### C. Prioridad 2: Refactorización Triple Constraint (Escalabilidad)
Se abordó la complejidad ciclomática de `SlideTripleConstraint`.
- **Problema**: El componente manejaba manualmente 6 estados discretos y efectos secundarios complejos para sincronizar la narración (TTS) con la UI.
- **Solución (Custom Hook)**: Se extrajo toda la lógica de estado a `src/components/slides/Tema1/hooks/useTripleConstraintState.ts`.
- **Resultado**: `SlideTripleConstraint.tsx` redujo su tamaño y complejidad drásticamente, convirtiéndose en un componente puramente presentacional (Dumb Component) que recibe datos y handlers de su "cerebro" (Smart Hook).

### Conclusión del Ciclo
El proyecto ha pasado de ser un prototipo frágil a una aplicación con infraestructura de tests, separación clara de conceptos (Datos/Lógica/Vista) y una arquitectura preparada para escalar al Tema 2 y más allá.
