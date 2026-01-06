
# Tema 3: Ejecución, Monitorización y Control del Proyecto

Este tema aborda la fase de **realización del trabajo** y la **vigilancia del desempeño** del proyecto. Se analiza cómo transformar **la planificación en entregables tangibles** mediante la *coordinación de recursos, equipos y stakeholders*. Simultáneamente, se profundiza en los procesos de **Monitorización y Control** para medir la salud del proyecto utilizando técnicas avanzadas como el **Método de la Ruta Crítica** y la **Gestión del Valor Ganado (EVM)**, asegurando que las variaciones en la **triple restricción (Alcance, Tiempo, Coste)** se gestionen mediante un **Control Integrado de Cambios** formal.

## 1. Procesos de Gestión de Proyectos
La gestión de proyectos no es lineal, sino iterativa. Los procesos se superponen e interactúan a lo largo del ciclo de vida.
*   **Inicio:** Autorizar el proyecto.
*   **Planificación:** Definir y refinar los objetivos y el curso de acción.
*   **Ejecución:** Integrar a la gente y otros recursos para llevar a cabo el plan.
*   **Monitorización y Control:** Medir el progreso regularmente para identificar variaciones y corregirlas.
*   **Cierre:** Formalizar la aceptación y terminar el proyecto.

## 2. Desarrollo de un Proyecto
El desarrollo implica la transformación progresiva de ideas en entregables tangibles. Requiere coordinación entre las áreas de conocimiento (Alcance, Cronograma, Coste, Calidad, Recursos, etc.) y una adaptación continua a los cambios del entorno.

## 3. Procesos de Ejecución
### 3.1. Definición
Consiste en coordinar personas y recursos, gestionar las expectativas de los interesados e integrar y realizar las actividades del proyecto conforme al Plan para la Dirección del Proyecto. Es donde se gasta la mayor parte del presupuesto.

### 3.2. Retos
*   Gestionar conflictos de recursos.
*   Mantener el compromiso del equipo.
*   Asegurar la calidad mientras se cumple el cronograma.
*   Gestionar las comunicaciones y expectativas de los stakeholders.

### 3.3. Procesos
*   Dirigir y gestionar el trabajo del proyecto.
*   Gestionar el conocimiento del proyecto.
*   Gestionar la calidad.
*   Adquirir recursos, desarrollar el equipo y dirigir al equipo.
*   Gestionar las comunicaciones.
*   Implementar la respuesta a los riesgos.
*   Efectuar las adquisiciones.
*   Gestionar la participación de los interesados.

## 4. Procesos de Ejecución en las Fases del Proyecto
La ejecución ocurre en cada fase, no solo al final de la planificación. En proyectos grandes, cada fase (ej. Diseño, Construcción) pasa por su propio ciclo de inicio, planificación, ejecución y cierre.

## 5. Cuestiones Durante la Ejecución
*   **Solicitudes de Cambio:** Inevitables. Deben gestionarse formalmente.
*   **Defectos:** Tienen que repararse (retrabajo).
*   **Actualizaciones del Plan:** La realidad rara vez coincide exactamente con el plan inicial; se requieren ajustes constantes.

## 6. Procesos de Seguimiento y Control
### 6.1. Definición
Procesos necesarios para realizar el seguimiento, analizar y regular el progreso y el desempeño del proyecto, identificar áreas en las que el plan requiera cambios y proponerlos.

### 6.2. Motivos
*   Comprobar la salud del proyecto.
*   Identificar áreas que requieren atención especial.
*   Identificar variaciones respecto al plan.
*   Influir en los factores que podrían eludir el control de cambios.

### 6.3. Procesos
*   Monitorizar y controlar el trabajo del proyecto.
*   Realizar el control integrado de cambios.
*   Validar y controlar el alcance.
*   Controlar el cronograma y los costes.
*   Controlar la calidad, recursos, comunicaciones, riesgos, adquisiciones e involucramiento de interesados.

### 6.4. Herramientas y Técnicas para Evaluación del Alcance, Tiempo y el coste

#### A. Gestión del Cronograma (Tiempo)
Para controlar el tiempo, primero debemos haber definido una red sólida.

**Técnicas de Estimación de Duración:**
*   **Juicio de Expertos:** Experiencia histórica.
*   **Estimación Análoga:** Proyectos similares anteriores (rápida, menos precisa).
*   **Estimación Paramétrica:** Datos estadísticos (ej. horas/m²).
*   **Estimación PERT (3 Valores):**
    *   $t_e = \frac{O + 4M + P}{6}$
    *   $\sigma = \frac{P - O}{6}$

**Anatomía de la Red (PDM - Precedence Diagramming Method):**
*   **FS (Fin-Inicio):** Estándar. B empieza cuando A termina.
*   **SS (Inicio-Inicio):** Paralelas.
*   **FF (Fin-Fin):** Terminan juntas.
*   **SF (Inicio-Fin):** Rara.
*   *Ajustes:* **Lead** (Adelanto) y **Lag** (Retraso).

**La Ruta Crítica (CPM):**
*   Secuencia que determina la duración mínima del proyecto. Holgura = 0.
*   **Holgura Total (Float):** Retraso permitido sin afectar fecha fin.
*   *Compresión:* **Crashing** (más recursos, más coste) y **Fast Tracking** (paralelizar, más riesgo).

**Gestión de Recursos (Vinculado a Cronograma):**
*   **Nivelación (Leveling):** Ajustar fechas por limitación de recursos (cambia ruta crítica).
*   **Equilibrio (Smoothing):** Ajustar dentro de holguras (no cambia fecha fin).

#### B. Gestión del Coste
*   **Costes Directos / Indirectos.**
*   **Línea Base de Coste (Curva S):** Presupuesto acumulado.

### 6.5. Valoración del estado del proyecto
El estándar es la **Gestión del Valor Ganado (EVM)**. Integración de Alcance, Tiempo y Coste.

**Variables Clave:**
*   **PV (Valor Planificado):** Lo que deberíamos haber hecho.
*   **EV (Valor Ganado):** % **Trabajo realizado** x **BAC** 
*   **AC (Coste Real):** Lo que gastamos.
*   **BAC (Presupuesto a la Conclusión)**

**Análisis de Variación:**
*   **CV (Variación de Coste) = EV - AC.** (Negativo = Sobrepresupuesto)
*   **SV (Variación de Cronograma) = EV - PV.** (Negativo = Retraso)

**Índices de Eficiencia:**
*   **CPI = EV / AC.** (< 1 Ineficiente)
*   **SPI = EV / PV.** (< 1 Lento)

**Proyecciones:**
*   **EAC (Estimación a la Conclusión) = BAC / CPI.**
*   **ETC (Estimación Trabajo Restante) = EAC - AC.** 
*   **VAC (Variación a la Conclusión) = BAC - EAC.**

### 6.6. Control de Cambios
Proceso formal (CCB - Change Control Board) para revisar todas las solicitudes de cambio, aprobarlas y gestionarlas.
*   Regla de Oro: Evaluar impacto en la Triple Restricción (Alcance, Tiempo, Coste) ANTES de aprobar.

### 6.7. Gestión de los Interesados
Monitorizar las relaciones generales de los interesados y ajustar estrategias para involucrarlos.
*   Mantener a los interesados informados y satisfechos es clave para el éxito.

### 6.8. Informe de Seguimiento, Avance o Progreso
Documentos físicos o electrónicos (WPR - Work Performance Reports) generados para comunicar el desempeño.
*   *Flujo DIKW:* Datos (WPD) -> Información (WPI) -> Informes (WPR).

### 6.9. Gestionar el Equipo de Proyecto
Hacer seguimiento del desempeño de los miembros del equipo, proporcionar retroalimentación, resolver problemas y gestionar cambios en el equipo.
*   **Modelo de Tuckman:** Formación, Turbulencia, Normalización, Desempeño, Disolución.

### 6.10. Control de calidad
*   **Controlar la Calidad (Interno):** Verificar que los entregables cumplen los requisitos de calidad (Salida: Entregables Verificados).
*   **Validar el Alcance (Externo):** Conseguir la aceptación formal del cliente (Salida: Entregables Aceptados).

### 6.11. Seguimiento y Control de riesgos
Implementar los planes de respuesta a los riesgos, rastrear los riesgos identificados, monitorear los riesgos residuales, identificar nuevos riesgos y evaluar la efectividad del proceso.

### 6.12. Gestión de contratos
(Control de Adquisiciones). Administrar las relaciones de adquisiciones, monitorear el desempeño del contrato y efectuar cambios y correcciones según sea necesario. Cerrar contratos finalizados.

---

### Guía Visual para Infografías
(Descripción funcional de los componentes interactivos)

Esta guía describe el funcionamiento y la utilidad pedagógica de las infografías interactivas integradas en la aplicación para reforzar los conceptos teóricos.

#### 1. Tablero de Ejecución (Pestaña 1)
*   **Componente:** `SlideExecution`
*   **Funcionamiento:** Presenta tarjetas interactivas sobre los procesos clave de ejecución.
    *   **Nivelación de Recursos:** Un widget visual que permite "activar" la nivelación para distribuir la carga de trabajo de un recurso sobreasignado.
    *   **Modelo Tuckman:** Una escalera interactiva que muestra la evolución de los equipos (Formación -> Disolución) al hacer clic en cada peldaño.
*   **Utilidad:** Ayuda a visualizar conceptos abstractos de gestión de recursos humanos y desarrollo de equipos.

#### 2. Herramientas de Cronograma (Pestaña 2)
*   **Estimación de Duración (`SlideEstimation`):**
    *   **Laboratorio PERT:** Calculadora interactiva donde el alumno ajusta los valores Optimista, Más Probable y Pesimista con deslizadores. Calcula en tiempo real la Duración Esperada ($t_e$) y la Desviación Estándar ($\sigma$), mostrando visualmente la incertidumbre.
    *   **Tarjetas de Técnicas:** Explica visualmente la diferencia entre Juicio de Expertos, Análoga (rápida/barata) y Paramétrica (estadística/precisa).

*   **Anatomía de la Red (`SlideNetworkAnatomy`):**
    *   **Simulador de Dependencias:** Permite reproducir animaciones para cada tipo de relación lógica (FS, SS, FF). Visualiza cómo las barras de progreso se bloquean (candado) hasta que se cumple la condición de su predecesora.
    *   **Lead vs Lag:** Demuestra interactivamente cómo un "Lead" (Adelanto) solapa tareas para ganar tiempo, y cómo un "Lag" (Retraso) introduce tiempos de espera obligatorios (como el secado de cemento).

*   **Ruta Crítica (`SlideCriticalPath`):**
    *   **Diagrama Dinámico:** Un diagrama de red con dos caminos (Rojo/Crítico y Azul/Holgura).
    *   **Simulador de Incidencias:** Controles deslizantes permiten aumentar la duración de las tareas.
    *   **Concepto Clave:** Muestra cómo al consumir la holgura del camino azul, este puede convertirse en la nueva Ruta Crítica, cambiando la dinámica del proyecto.

#### 3. Coste y Estado (Pestaña 3)
*   **Semáforo EVM (`SlideEVMSemaphore`):**
    *   **Calculadora Inversa:** El usuario introduce PV, EV y AC mediante sliders.
    *   **Dashboard de Salud:** Calcula automáticamente las variaciones (CV, SV) y los índices (CPI, SPI).
    *   **Visualización:** Un gráfico de "semáforo" y medidores tipo velocímetro indican si el proyecto está en "Zona Verde" (Eficiente/Adelantado) o "Zona Roja" (Ineficiente/Retrasado).

*   **La Curva S (`SlideSCurve`):**
    *   **Gráfico Evolutivo:** Muestra la evolución temporal de las líneas de Valor Planificado (PV), Coste Real (AC) y Valor Ganado (EV).
    *   **Scrubber Temporal:** Permite arrastrar un cursor a lo largo del tiempo del proyecto para visualizar instantáneamente la magnitud de la Variación de Coste (distancia vertical AC-EV) y de Cronograma (distancia vertical PV-EV) en cualquier punto.

#### 4. Torre de Control (Pestaña 4)
*   **Control y Soporte (`SlideControl`):**
    *   **Simulador CCB (Control de Cambios):** Un juego de rol donde el usuario actúa como el Comité de Control de Cambios, analizando el impacto de una solicitud en la Triple Restricción antes de aprobarla o rechazarla.
    *   **Flujo de Validación:** Un diagrama de pasos interactivo que distingue claramente entre "Controlar Calidad" (Verificación Interna) y "Validar Alcance" (Aceptación Externa del Cliente).
    *   **Refinería DIKW:** Esquema interactivo que transforma Datos (WPD) en Información (WPI) y finalmente en Informes (WPR) para la toma de decisiones.