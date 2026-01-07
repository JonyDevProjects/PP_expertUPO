# Tema 5: Estimación del Esfuerzo, Recursos y Costes

Este bloque temático marca la transición de la planificación del tiempo a la planificación económica. El objetivo final es obtener la **Línea Base de Costes**, el estándar contra el cual mediremos el éxito financiero del proyecto.

## 1. Estimación de la duración. Esfuerzo y Duración

Es vital distinguir ambos conceptos para evitar cronogramas irreales.

* **Esfuerzo (Trabajo):** Cantidad de unidades laborales necesarias para completar una actividad (ej. 40 horas-hombre).
* **Duración:** Periodo de tiempo calendario (ej. 5 días o 1 semana) necesario para completar la actividad, considerando la disponibilidad de los recursos.
* **Ley de Parkinson:** "El trabajo se expande hasta llenar el tiempo disponible".
* **Síndrome del Estudiante:** Tendencia a empezar la tarea en el último momento posible, desperdiciando las holguras de seguridad.

## 2. Estimación de recursos

No se puede presupuestar sin saber *qué* o *quién* se necesita.

* **Objetivo:** Determinar el tipo y cantidad de recursos (materiales, personas, equipos) para cada actividad de la EDT.
* **Salida:** Requisitos de recursos de la actividad y la **Estructura de Desglose de Recursos (RBS)**.

## 3. Estimación de costes

Conceptos financieros básicos aplicados a proyectos.

* **Tipos de Costes:**
* **Directos:** Atribuibles al proyecto (ej. viajes, salarios del equipo).
* **Indirectos:** Gastos generales compartidos (ej. luz, alquiler oficina).
* **Fijos vs. Variables:** Según si cambian con la producción.


* **Coste de Oportunidad:** El valor de la alternativa renunciada.
* **Costes Irrecuperables (Sunk Costs):** Dinero ya gastado que no debe afectar decisiones futuras.

## 4. Técnicas de estimación

Herramientas para predecir el coste y el esfuerzo con distintos grados de precisión.

* **Juicio de Expertos:** Basado en experiencia histórica.
* **Estimación Análoga (Top-Down):** Rápida, menos precisa. Usa proyectos anteriores similares.
* **Estimación Paramétrica:** Usa datos estadísticos (ej. coste por metro cuadrado).
* **Estimación Ascendente (Bottom-Up):** Suma detallada de cada paquete de trabajo. Alta precisión, alto coste de realización.
* **Estimación por Tres Valores (PERT):**  Pondera la incertidumbre ().

## 5. Planificación de los Recursos Humanos

Definición de roles para asegurar que el proyecto cuenta con el personal adecuado.

* **Matriz de Asignación de Responsabilidades (RAM/RACI):** Conecta la EDT con los recursos, definiendo quién es Responsable (R), quién Aprueba (A), a quién se Consulta (C) y a quién se Informa (I).

## 6. Organigrama del proyecto

* **OBS (Organizational Breakdown Structure):** Representación jerárquica de la organización del proyecto, alineada con los departamentos existentes. Ayuda a visualizar las interfaces entre el equipo del proyecto y las unidades funcionales.

## 7. Plan de Gestión de Personal

Estrategia para adquirir, gestionar y liberar recursos.

* **Histograma de Recursos:** Gráfico para visualizar la asignación de horas y detectar sobrecargas.
* **Nivelación (Leveling):** Resolver sobreasignaciones retrasando tareas (afecta la ruta crítica).
* **Alisado (Smoothing):** Ajustar recursos dentro de las holguras (no afecta la fecha fin).

## 8. Presupuesto del proyecto

Este punto consolida la gestión económica en tres procesos secuenciales clave:

### 8.1. Proceso Estimación de Costes

Consiste en desarrollar una aproximación de los recursos monetarios necesarios para completar las actividades del proyecto.

* **Enfoque:** Se realiza a nivel de actividad individual.
* **Salidas:** Estimaciones de costos de las actividades y base de las estimaciones (documentación de cómo se llegó a la cifra).
* **Consideración:** Debe incluir una valoración de riesgos para determinar el coste de mitigarlos.

### 8.2. Proceso Preparación del Presupuesto

Consiste en sumar los costes estimados de actividades individuales o paquetes de trabajo para establecer una **Línea Base de Costos** autorizada.

* **Agregación de Costos:** Actividad  Paquete de Trabajo  Cuenta de Control  Proyecto.
* **Reservas de Contingencia:** Presupuesto para los "conocidos-desconocidos" (Riesgos identificados). **Forma parte de la Línea Base.**
* **Reservas de Gestión:** Presupuesto para los "desconocidos-desconocidos" (Imprevistos totales). **NO forma parte de la Línea Base**, se suma para obtener el Presupuesto Total.
* **Salida Clave:** La Línea Base de Costos (Curva S).

### 8.3. Proceso Control del Coste

Consiste en monitorear la situación del proyecto para actualizar el presupuesto y gestionar cambios a la línea base de costos.

* **Herramienta Principal:** Gestión del Valor Ganado (EVM). Compara el Valor Planificado (PV), el Coste Real (AC) y el Valor Ganado (EV).
* **Objetivo:** Detectar desviaciones temprano para tomar acciones correctivas y asegurar que el gasto no exceda la financiación autorizada.

---

## Guía Visual para Infografías

*(Componentes interactivos para reforzar los conceptos de costes y recursos)*

### 1. El Simulador de "La Triple Restricción"

* **Componente:** `TripleRestriccionPro`
* **Concepto:** Visualizar cómo la estimación afecta al triángulo de hierro.
* **Interacción:** Un triángulo equilátero (Alcance, Tiempo, Coste).
* **Dinámica:** El usuario intenta reducir el lado "Coste".
* **Efecto:** Automáticamente, el lado "Tiempo" se alarga (se tarda más con menos recursos) o el lado "Alcance" se encoge (se hace menos). Si fuerza el triángulo, este se rompe con una alerta: "Calidad Comprometida".

### 2. Constructor de la Línea Base (Drag & Drop)

* **Componente:** `BaselineBuilder`
* **Concepto:** Diferenciar entre Coste, Contingencia y Gestión.
* **Interacción:**
* Zona de "Línea Base" (Área protegida).
* Zona de "Presupuesto Total".
* **Piezas:** Bloques de costes de actividad, Bloque de "Riesgo de Lluvia" (Contingencia), Bloque de "Pandemia Global" (Gestión).


* **Feedback:** El usuario debe arrastrar los bloques a la zona correcta. Si coloca la reserva de gestión dentro de la línea base, el sistema lo expulsa: "Error: El PM no tiene autoridad directa sobre esta reserva".

### 3. El Nivelador de Recursos

* **Componente:** `ResouceLevel`
* **Concepto:** Diferencia entre Nivelar (Leveling) y Alisar (Smoothing).
* **Visualización:** Un diagrama de Gantt con recursos sobrecargados (en rojo).
* **Opciones:** Botón A "Nivelar" vs Botón B "Alisar".
* **Resultado:**
* Al pulsar "Nivelar", las barras rojas se vuelven verdes, pero la fecha final del proyecto se desplaza a la derecha.
* Al pulsar "Alisar", algunas barras bajan, pero otras siguen rojas si no había holgura, manteniendo la fecha final intacta.

### 4. Tablero de Control EVM (Gestión del Valor Ganado)

* **Componente:** `simuladorEVM`
* **Concepto:** Visualizar la "salud" del proyecto cruzando Tiempo y Coste.
* **Interacción:** Sliders para controlar el paso del tiempo, el trabajo real completado (%) y el dinero gastado.
* **Feedback Visual:**
* Generación de las 3 curvas famosas (PV, AC, EV).
* Semáforos automáticos para SPI (Cronograma) y CPI (Coste).
* Proyección a futuro: ¿Cuánto costará terminar si seguimos así? (EAC).