# Tema 4: Alcance del Proyecto y Secuencia de Actividades

Este tema aborda la transición crítica desde la planificación del **Alcance**, centrándose en la descomposición del trabajo mediante la **EDT/WBS**, hacia la gestión del **Tiempo**. Se detalla el proceso de definición y **secuenciación de actividades** utilizando el **Método de Diagramación por Precedencia (PDM)**, fundamental para construir el cronograma. Finalmente, se profundiza en el cálculo de la **Ruta Crítica (CPM)** para determinar la duración del proyecto y se exploran **técnicas** de optimización y compresión del cronograma como el **Crashing (intensificación) y el Fast Tracking (ejecución rápida).**

## 1. ¿Qué es el Alcance del Proyecto?
El alcance define los límites del proyecto. Es la suma de todos los productos, servicios y resultados a ser proporcionados.

*   **Concepto:** Determina qué trabajo se realizará y, igual de importante, qué trabajo **no** se realizará (exclusiones).
*   **Relación con la Triple Restricción:** Cualquier cambio en el alcance afecta inevitablemente al tiempo y al coste.

## 2. Punto de Partida. Objetivos
El proyecto nace para cumplir unos objetivos estratégicos. La definición del alcance debe estar alineada para transformar esas ideas y objetivos abstractos en entregables tangibles.

## 3. Procesos de Gestión del Alcance del Proyecto
La gestión del alcance incluye los procesos necesarios para garantizar que el proyecto incluya todo el trabajo requerido y únicamente el trabajo requerido.

### 3.1. Proceso de Planificación del Alcance
Define cómo el alcance será definido, validado y controlado. Crea el "Plan de Gestión del Alcance".

### 3.2. Proceso de Recopilación de Requisitos
Es el proceso de determinar, documentar y gestionar las necesidades y requisitos de los interesados (stakeholders) para cumplir con los objetivos. Gestionar las expectativas de los interesados desde el inicio es vital.

### 3.3. Proceso de Definición del Alcance
Desarrolla una descripción detallada del proyecto y del producto. Aquí se seleccionan los requisitos finales y se establecen los límites exactos.

### 3.4. Proceso de Creación del EDT/WBS
La Estructura de Desglose del Trabajo (WBS/EDT) es la descomposición jerárquica del alcance total en partes más pequeñas y manejables llamadas "Paquetes de Trabajo".
Es la base para la estimación de costes y cronograma.

### 3.5. Alcance en Seguimiento y Control
Durante la ejecución, el alcance debe monitorearse constantemente para evitar la "corrupción del alcance" (scope creep).

*   **Validar el Alcance:** Es el proceso de formalizar la aceptación de los entregables completados por parte del cliente.
*   **Controlar el Alcance:** Es el proceso de monitorear el estado del alcance y gestionar cambios en la línea base.

## 4. Traducción de la WBS en el calendario
Para pasar del "qué" (Alcance) al "cuándo" (Tiempo), se deben descomponer los paquetes de trabajo de la WBS en actividades concretas. Esta es la conexión crítica entre la gestión del alcance y la gestión del cronograma.

## 5. Procesos de Gestión del Tiempo del Proyecto
Implica los procesos necesarios para gestionar la terminación a tiempo del proyecto. Para controlar el tiempo, primero debemos haber definido una red sólida.

### 5.1. Proceso de Definición de Actividades
Identificar y documentar las acciones específicas que se deben realizar para producir los entregables del proyecto.

### 5.2. Proceso de Secuenciamiento de las tareas
Consiste en identificar y documentar las relaciones entre las actividades del proyecto usando el Método de Diagramación por Precedencia (PDM).

**Tipos de Dependencia:**
*   **FS (Fin-Inicio):** La tarea B no puede empezar hasta que A termine (Estándar).
*   **SS (Inicio-Inicio):** Ambas comienzan simultáneamente.
*   **FF (Fin-Fin):** Deben terminar juntas.
*   **SF (Inicio-Fin):** Poco frecuente.

**Ajustes:** Se aplican Adelantos (Lead) para acelerar y Retrasos (Lag) para esperas obligatorias.

### 5.3. Procesos de Estimación de Recursos y Duración
Se debe estimar el tipo y cantidad de materiales, personas y equipos (Recursos) y la cantidad de períodos de trabajo necesarios (Duración).

**Técnicas de Estimación:**
*   **Juicio de Expertos:** Basado en experiencia histórica.
*   **Estimación Análoga:** Uso de proyectos anteriores similares (rápida pero menos precisa).
*   **Estimación Paramétrica:** Uso de datos estadísticos y algoritmos.
*   **Estimación PERT (Tres valores):** Utiliza una media ponderada para gestionar la incertidumbre.
    *   **Fórmula:** $t_e = \frac{O + 4M + P}{6}$ (Donde O=Optimista, M=Más probable, P=Pesimista).
    *   **Desviación:** $\sigma = \frac{P - O}{6}$

### 5.4. Proceso de Desarrollo del Cronograma
Integra actividades, secuencias, duraciones y recursos para crear el modelo de programación.

#### a) Cálculo de Fechas. Camino Crítico
Se utiliza el Método de la Ruta Crítica (CPM) para calcular las fechas de inicio y fin tempranas y tardías.
*   **Ruta Crítica:** Es la secuencia de actividades que determina la duración mínima posible del proyecto. Su holgura es cero.
*   **Holgura Total (Float):** Tiempo que una actividad se puede retrasar sin afectar la fecha fin del proyecto.

#### b) Revisión y Ajuste del Cronograma
Si el cronograma inicial no es viable, se aplican técnicas de optimización:
*   **Compresión:**
    *   **Crashing:** Añadir recursos para acortar tiempo (aumenta coste).
    *   **Fast Tracking:** Ejecutar actividades en paralelo (aumenta riesgo).
*   **Optimización de Recursos:**
    *   **Nivelación (Leveling):** Ajustar fechas por escasez de recursos (puede cambiar la ruta crítica).
    *   **Equilibrio (Smoothing):** Ajustar recursos solo dentro de las holguras (no cambia la fecha fin).

### 5.5. Control del Cronograma
Es el proceso de monitorear el estado de las actividades, actualizar el avance y gestionar cambios en la línea base del cronograma.
Se utilizan técnicas de Valor Ganado (EVM) como la Variación del Cronograma ($SV = EV - PV$) y el Índice de Desempeño del Cronograma ($SPI = EV / PV$) para medir la eficiencia.

---

## 6. Guía Visual para Infografías
*(Descripción funcional de los componentes interactivos)*

Estas herramientas interactivas están diseñadas para que el alumno experimente la construcción del alcance y la lógica de la red del cronograma.

### 1. El Constructor de WBS (Pestaña Alcance)
*   **Componente:** `InteractiveWBSBuilder`
*   **Funcionamiento:**
    *   **Árbol de Descomposición:** El alumno comienza con un bloque "Proyecto" y debe arrastrar "Paquetes de Trabajo" para descomponerlos en niveles inferiores.
    *   **Regla del 100%:** Un indicador visual muestra si la suma de los hijos equivale al 100% del padre. Si falta alcance, el bloque padre se muestra en rojo.
*   **Objetivo Pedagógico:** Entender que la WBS no es una lista de tareas, sino una descomposición jerárquica de entregables.

### 2. Laboratorio de Dependencias (Pestaña Secuenciación)
*   **Componente:** `DependencyLogicLab`
*   **Funcionamiento:**
    *   **Conector de Nodos:** El usuario debe conectar diferentes actividades (Nodos A, B, C) utilizando "cables" que representan FS, SS, FF.
    *   **Simulación de Error:** Si el usuario intenta conectar una lógica imposible (bucle) o ilógica para el contexto (ej. pintar antes de construir pared), el sistema alerta del error lógico.
    *   **Visualizador de Lag:** Un control deslizante permite añadir "Lag" (+2 días) entre dos tareas conectadas y ver cómo se separan visualmente en la línea de tiempo.
*   **Objetivo Pedagógico:** Dominar el diagrama de precedencias (PDM) y los tipos de vínculos lógicos.

### 3. Buscador de la Ruta Crítica (Pestaña Cronograma)
*   **Componente:** `CriticalPathFinder`
*   **Funcionamiento:**
    *   **Red Interactiva:** Se presenta un diagrama de red complejo con duraciones asignadas a cada nodo.
    *   **Calculadora de Holgura:** Al pasar el mouse por cada ruta, se iluminan los caminos y se calcula la duración total. El alumno debe hacer clic en la secuencia que cree que es la "Crítica".
    *   **Feedback Inmediato:** Si acierta, la ruta se vuelve roja y muestra "Holgura = 0". Si falla, muestra la holgura positiva del camino elegido (ej. "Holgura = 5 días, No es crítica").
*   **Objetivo Pedagógico:** Identificar visual y matemáticamente la ruta crítica y entender el concepto de holgura.

### 4. Simulador de Compresión (Pestaña Optimización)
*   **Componente:** `CrashingVsFastTracking`
*   **Funcionamiento:**
    *   **Escenario de Retraso:** Un proyecto se muestra retrasado 5 días.
    *   **Botón "Crashing":** Al pulsarlo, el alumno añade "dinero" (recursos) a una tarea crítica. La barra de tiempo se reduce, pero el gráfico de "Presupuesto" se dispara.
    *   **Botón "Fast Tracking":** Al pulsarlo, el alumno superpone dos tareas secuenciales. El tiempo se reduce, pero aparece un icono de "Riesgo de Retrabajo" que parpadea.
*   **Objetivo Pedagógico:** Comprender el "trade-off" (intercambio) entre Tiempo, Coste y Riesgo al intentar acelerar un cronograma.