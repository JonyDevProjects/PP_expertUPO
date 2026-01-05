
## Tema 3: Ejecucion, Monitorización y Control del Proyecto (EVM)

Este resumen cubre los aspectos técnicos de la ejecución y el control del proyecto, centrándose en cómo gestionar el cronograma, el presupuesto y medir el rendimiento real frente al planificado.

### 3.1. Gestión del Cronograma (Secuenciación)

Para pasar de una lista de tareas (EDT) a un calendario real, necesitamos definir las relaciones lógicas entre actividades.

#### Método de Diagramación por Precedencia (PDM)
Es la técnica estándar para visualizar dependencias.

* **FS (Fin-Inicio):** La actividad B no puede empezar hasta que A termina. (Estándar: 95% de los casos).
* **SS (Inicio-Inicio):** B empieza cuando empieza A (ej. vaciar hormigón y empezar a nivelarlo simultáneamente).
* **FF (Fin-Fin):** B termina cuando termina A (ej. escribir un documento y terminar de editarlo).
* **SF (Inicio-Fin):** B termina cuando A empieza (Muy poco común, ej. relevos de guardia).

#### Ajustes de Tiempo
* **Adelantos (Lead):** Acelerar la actividad sucesora (superposición de tareas).
* **Retrasos (Lag):** Tiempo de espera obligado (ej. esperar el fraguado del cemento antes de pintar).

#### Técnicas de Estimación de Duración
* **Juicio de Expertos:** Basado en experiencia histórica del equipo.
* **Estimación Análoga:** Rápida pero menos precisa (basada en proyectos anteriores similares).
* **Estimación Paramétrica:** Basada en datos estadísticos y algoritmos (ej. horas de trabajo por m²).
* **Estimación PERT (3 Valores):** Ponderación para gestionar la incertidumbre.

**Fórmulas PERT:**

* Estimación Esperada ($t_e$):
$$t_e = \frac{Optimista + 4(Más Probable) + Pesimista}{6}$$

* Desviación Estándar ($\sigma$):
$$\sigma = \frac{P - O}{6}$$

### 3.2. La Ruta Crítica (CPM)

El concepto más importante para el control de plazos.

* **Definición:** Es la secuencia de actividades que determina la duración mínima del proyecto. Es el camino más largo a través del diagrama de red.
* **Holgura Total (Float):** Tiempo que se puede retrasar una actividad sin retrasar la fecha fin del proyecto. En la Ruta Crítica, la holgura es cero.
* **Holgura Libre:** Tiempo que se puede retrasar una actividad sin afectar el inicio temprano de la siguiente.

#### Compresión del Cronograma
Técnicas para recuperar tiempo cuando vamos retrasados:

1. **Crashing (Intensificación):** Añadir recursos (dinero/personas) a las actividades críticas.
    * *Consecuencia:* Aumenta el Coste.
2. **Fast Tracking (Ejecución Rápida):** Paralelizar actividades que normalmente irían en secuencia.
    * *Consecuencia:* Aumenta el Riesgo (posibles retrabajos).

### 3.3. Gestión de Recursos

* **Histograma de Recursos:** Gráfico de barras que muestra la carga de trabajo por persona/equipo en el tiempo.

#### Técnicas de Optimización
* **Nivelación (Resource Leveling):** Ajustar fechas para no sobrecargar recursos limitados. Generalmente alarga la ruta crítica (fecha fin).
* **Equilibrio (Smoothing):** Ajustar actividades solo dentro de sus holguras. No cambia la fecha fin.

### 3.4. Gestión de Costes y Presupuesto

#### Tipos de Costes
* **Directos:** Exclusivos del proyecto (ej. salarios del equipo, materiales, licencias).
* **Indirectos:** Compartidos por la organización (ej. alquiler oficina central, luz, personal administrativo).

#### La Línea Base de Coste (Curva S)
* **Definición:** Representación gráfica del presupuesto acumulado a lo largo del tiempo.
* **Forma:** Tiene forma de "S": Inicio lento, aceleración durante la ejecución, aplanamiento al cierre.

### 3.5. Seguimiento y Control: Gestión del Valor Ganado (EVM)

El estándar del PMI para medir el rendimiento integrando Alcance, Tiempo y Coste.

#### 1. Las Variables Clave (Datos)
* **PV (Planned Value) - Valor Planificado:** ¿Cuánto trabajo deberíamos haber completado según el plan?
* **EV (Earned Value) - Valor Ganado:** ¿Cuánto trabajo hemos completado realmente (valorado al coste presupuestado)? Es la métrica más importante.
* **AC (Actual Cost) - Coste Real:** ¿Cuánto dinero hemos gastado realmente?

#### 2. Análisis de Variación (Estado Actual)
* **Variación de Coste (CV):**
$$CV = EV - AC$$
* *Negativo:* Sobrepresupuesto (Gastando más de lo previsto).

* **Variación de Cronograma (SV):**
$$SV = EV - PV$$
* *Negativo:* Retraso (Menos trabajo hecho del planeado).

#### 3. Índices de Rendimiento (Eficiencia)
* **CPI (Cost Performance Index):**
$$CPI = \frac{EV}{AC}$$
* *CPI < 1:* Ineficiente (ej. 0.8 significa que por cada 1€ gastado, generamos 0.80€ de valor).

* **SPI (Schedule Performance Index):**
$$SPI = \frac{EV}{PV}$$
* *SPI < 1:* Vamos más lentos de lo planificado.

#### 4. Proyecciones (Forecasting)
* **BAC:** Presupuesto hasta la conclusión (Total original).
* **EAC (Estimate At Completion):** Estimación del coste total al finalizar el proyecto si la tendencia continúa.
    * *Fórmula básica:*
    $$EAC = \frac{BAC}{CPI}$$

* **VAC (Variance At Completion):** Desviación final esperada.
    $$VAC = BAC - EAC$$

### Guía Visual para Infografías (Tema 3)

#### Infografía 1: Anatomía de la Red (Dependencias)
* **Concepto:** Visualizar los 4 tipos de relaciones lógicas.
* **Elementos:** Bloques conectados con flechas. Destacar FS (Fin-Inicio) como la más común.
* **Detalle:** Diferenciar visualmente "Lead" (acelerar/solapar) vs "Lag" (esperar).

#### Infografía 2: El Semáforo del Valor Ganado (EVM)
* **Concepto:** Dashboard de control de salud del proyecto.
* **Elementos:**
    * **Zona Verde:** SPI/CPI > 1 (Adelantado / Ahorrando).
    * **Zona Roja:** SPI/CPI < 1 (Retrasado / Gastando de más).
* **Iconografía:** Usar billetes para Coste (CV, CPI) y relojes para Tiempo (SV, SPI).

#### Infografía 3: La Curva S
* **Concepto:** Comparativa visual de rendimiento.
* **Gráfico:** Plano cartesiano (Eje X: Tiempo, Eje Y: Coste Acumulado).
* **Línea Base (PV):** La referencia.
* **Línea Real (AC):** Suele ir por encima si hay sobrecoste.
* **Línea Valor (EV):** Si va por debajo de la PV, hay retraso.
* **Highlight:** Marcar la distancia vertical entre líneas como las "Variaciones".

#### Infografía 4: Ruta Crítica vs. Holgura
* **Concepto:** Gestión de prioridades.
* **Gráfico:** Diagrama de red (PERT).
* **Camino Rojo (Crítico):** Tareas pegadas sin espacio.
* **Camino Azul (No Crítico):** Tareas con huecos al final (Holgura).