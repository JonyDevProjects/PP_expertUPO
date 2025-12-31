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
│   ├── data/            # Datos estáticos y configuraciones
│   ├── utils/           # Funciones de utilidad (ej. drawingUtils)
│   ├── App.tsx          # Componente principal (Punto de entrada)
│   ├── main.tsx         # Montaje de React en el DOM
│   ├── index.css        # Estilos globales (Tailwind CSS)
│   └── Tema1_Infografic.tsx # Orquestador principal
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

## 4. Próximos Pasos
- **Optimización de Interacciones**: Refinar las micro-interacciones y animaciones para una experiencia más fluida.
- **Cobertura de Pruebas**: Implementar tests unitarios para las utilidades críticas y tests E2E para los flujos principales.
- **Accesibilidad**: Auditoría completa de contraste y navegación por teclado.
