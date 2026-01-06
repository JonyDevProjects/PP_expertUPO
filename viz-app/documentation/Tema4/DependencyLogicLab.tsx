import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, AlertTriangle, RefreshCw, Clock, Info, CheckCircle2, Lock } from 'lucide-react';

/**
 * DependencyLogicLab
 * Herramienta educativa para experimentar con el Método de Diagramación por Precedencia (PDM).
 * Permite conectar nodos, visualizar diagramas de red y Gantt, y validar lógica constructiva.
 */

// --- Datos Iniciales ---
const INITIAL_TASKS = [
  { id: 't1', name: 'Construir Muros', duration: 4, type: 'construction' },
  { id: 't2', name: 'Instalar Ventanas', duration: 2, type: 'installation' },
  { id: 't3', name: 'Pintar Paredes', duration: 3, type: 'finish' },
];

const DEPENDENCY_TYPES = [
  { id: 'FS', name: 'Fin-Inicio (FS)', desc: 'B no empieza hasta que A termine (Estándar).' },
  { id: 'SS', name: 'Inicio-Inicio (SS)', desc: 'B empieza a la vez que A.' },
  { id: 'FF', name: 'Fin-Fin (FF)', desc: 'B no puede terminar hasta que A termine.' },
];

// --- Componentes UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = "" }) => {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-slate-300",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
  };
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default function DependencyLogicLab() {
  const [dependencies, setDependencies] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedType, setSelectedType] = useState('FS');
  const [lag, setLag] = useState(0);
  const [error, setError] = useState(null);
  const [schedule, setSchedule] = useState({});

  // --- Lógica de Programación (Mini Motor de Cronograma) ---

  useEffect(() => {
    calculateSchedule();
  }, [dependencies]);

  const calculateSchedule = () => {
    // Inicializar fechas
    let dates = {};
    INITIAL_TASKS.forEach(t => {
      dates[t.id] = { start: 0, end: t.duration };
    });

    let changed = true;
    let iterations = 0;

    // Iterar para propagar fechas (Método simplificado de paso hacia adelante)
    while (changed && iterations < 20) { // Límite para evitar bucles infinitos
      changed = false;
      iterations++;

      dependencies.forEach(dep => {
        const pred = dates[dep.source];
        const succ = dates[dep.target];
        const taskSucc = INITIAL_TASKS.find(t => t.id === dep.target);

        let newStart = succ.start;

        // Lógica PDM
        if (dep.type === 'FS') {
          // Finish-to-Start: El inicio del sucesor >= Fin del predecesor + Lag
          if (pred.end + dep.lag > newStart) {
            newStart = pred.end + dep.lag;
          }
        } else if (dep.type === 'SS') {
          // Start-to-Start: El inicio del sucesor >= Inicio del predecesor + Lag
          if (pred.start + dep.lag > newStart) {
            newStart = pred.start + dep.lag;
          }
        } else if (dep.type === 'FF') {
          // Finish-to-Finish: El fin del sucesor >= Fin del predecesor + Lag
          // Por tanto, Inicio Sucesor >= (Fin Pred + Lag) - Duración Sucesor
          const minFinish = pred.end + dep.lag;
          const derivedStart = minFinish - taskSucc.duration;
          if (derivedStart > newStart) {
            newStart = derivedStart;
          }
        }

        if (newStart !== succ.start) {
          dates[dep.target] = {
            start: newStart,
            end: newStart + taskSucc.duration
          };
          changed = true;
        }
      });
    }

    if (iterations >= 20) {
      setError("¡Error de Bucle! Se ha detectado una referencia circular.");
      setDependencies(prev => prev.slice(0, -1)); // Deshacer último cambio
    } else {
      setSchedule(dates);
    }
  };

  // --- Manejadores ---

  const handleAddDependency = () => {
    setError(null);
    if (!selectedSource || !selectedTarget) return;

    // 1. Validación: No conectar consigo mismo
    if (selectedSource === selectedTarget) {
      setError("No puedes conectar una tarea consigo misma.");
      return;
    }

    // 2. Validación: Evitar duplicados
    const exists = dependencies.find(d => d.source === selectedSource && d.target === selectedTarget);
    if (exists) {
      setError("Ya existe una relación entre estas dos tareas.");
      return;
    }

    // 3. Validación: Lógica Constructiva (Regla Pedagógica)
    // Regla: No se puede Pintar (t3) antes de Construir (t1)
    if (selectedSource === 't3' && selectedTarget === 't1') {
      setError("❌ ERROR LÓGICO: ¡No puedes 'Construir Muros' DESPUÉS de 'Pintarlos'! La física no funciona así.");
      return;
    }
    
    // Regla: No se puede Instalar Ventanas (t2) antes de Muros (t1)
    if (selectedSource === 't2' && selectedTarget === 't1') {
       setError("❌ ERROR LÓGICO: Necesitas los muros para instalar las ventanas.");
       return;
    }

    const newDep = {
      id: Date.now(),
      source: selectedSource,
      target: selectedTarget,
      type: selectedType,
      lag: parseInt(lag)
    };

    setDependencies([...dependencies, newDep]);
    // Reset inputs
    setSelectedSource(null);
    setSelectedTarget(null);
    setLag(0);
  };

  const removeDependency = (id) => {
    setDependencies(dependencies.filter(d => d.id !== id));
    setError(null);
  };

  const resetLab = () => {
    setDependencies([]);
    setError(null);
    setSchedule({});
    calculateSchedule(); // Reset dates
  };

  // --- Renderizado Gráfico ---

  const maxDuration = Math.max(
    ...Object.values(schedule).map(d => d.end || 0), 
    10 // Mínimo ancho
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Clock className="w-8 h-8 text-indigo-600" />
            Laboratorio de Dependencias (PDM)
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Conecta las tareas y ajusta el <strong>Lag</strong> para ver cómo cambia el cronograma.
            ¡Cuidado con la lógica imposible!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Panel Izquierdo: Controles */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-indigo-500" /> Nueva Conexión
              </h3>

              {/* Selector Fuente */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tarea Predecesora (A)</label>
                <div className="space-y-2">
                  {INITIAL_TASKS.map(task => (
                    <button
                      key={`src-${task.id}`}
                      onClick={() => setSelectedSource(task.id)}
                      className={`w-full text-left px-3 py-2 rounded border transition-all ${
                        selectedSource === task.id 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium ring-1 ring-indigo-500' 
                          : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {task.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector Destino */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tarea Sucesora (B)</label>
                <div className="space-y-2">
                  {INITIAL_TASKS.map(task => (
                    <button
                      key={`tgt-${task.id}`}
                      onClick={() => setSelectedTarget(task.id)}
                      disabled={selectedSource === task.id}
                      className={`w-full text-left px-3 py-2 rounded border transition-all ${
                        selectedTarget === task.id 
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium ring-1 ring-indigo-500' 
                          : selectedSource === task.id 
                            ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-100'
                            : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {task.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipo y Lag */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Tipo</label>
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 bg-white text-sm"
                  >
                    {DEPENDENCY_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Lag (Días)</label>
                  <input 
                    type="number" 
                    value={lag}
                    onChange={(e) => setLag(e.target.value)}
                    className="w-full p-2 rounded border border-slate-300 text-sm"
                  />
                </div>
              </div>

              {/* Mensaje de Error */}
              {error && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded text-sm text-rose-700 flex items-start gap-2 animate-pulse">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              <Button onClick={handleAddDependency} className="w-full" disabled={!selectedSource || !selectedTarget}>
                Conectar Tareas
              </Button>
            </Card>

            {/* Lista de Conexiones */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Dependencias Activas</h3>
                <button onClick={resetLab} className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>
              
              {dependencies.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-4">Sin conexiones definidas.</p>
              ) : (
                <div className="space-y-2">
                  {dependencies.map(dep => {
                     const srcName = INITIAL_TASKS.find(t => t.id === dep.source)?.name;
                     const tgtName = INITIAL_TASKS.find(t => t.id === dep.target)?.name;
                     return (
                      <div key={dep.id} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 text-sm">
                        <div className="flex flex-col">
                           <span className="font-medium text-slate-700">{srcName} <ArrowRight className="inline w-3 h-3 mx-1"/> {tgtName}</span>
                           <span className="text-xs text-slate-500 font-mono">
                             {dep.type} {dep.lag > 0 ? `+ ${dep.lag}d` : dep.lag < 0 ? `- ${Math.abs(dep.lag)}d` : ''}
                           </span>
                        </div>
                        <button onClick={() => removeDependency(dep.id)} className="text-slate-400 hover:text-rose-500 p-1">
                          <AlertTriangle className="w-4 h-4 rotate-45" /> {/* Use X icon if imported, using Alert rotated as makeshift delete */}
                        </button>
                      </div>
                     );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Panel Derecho: Visualización */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Visualizador Gantt */}
            <Card className="p-6 overflow-hidden">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" /> Línea de Tiempo (Resultado)
              </h3>
              
              <div className="relative">
                {/* Ejes de Tiempo */}
                <div className="flex mb-2 ml-32 border-b border-slate-200 pb-2">
                  {Array.from({ length: maxDuration + 2 }).map((_, i) => (
                    <div key={i} className="flex-1 text-center text-xs text-slate-400 border-l border-slate-100 h-2">
                      {i}
                    </div>
                  ))}
                </div>

                {/* Tareas */}
                <div className="space-y-6 relative">
                  {/* Grid de fondo */}
                  <div className="absolute top-0 bottom-0 left-32 right-0 flex pointer-events-none">
                     {Array.from({ length: maxDuration + 2 }).map((_, i) => (
                        <div key={i} className="flex-1 border-l border-dashed border-slate-100"></div>
                     ))}
                  </div>

                  {INITIAL_TASKS.map(task => {
                    const sched = schedule[task.id] || { start: 0, end: task.duration };
                    // Calcular posición porcentual
                    // Asumimos un ancho total basado en maxDuration + 2
                    const totalUnits = maxDuration + 2;
                    const leftPct = (sched.start / totalUnits) * 100;
                    const widthPct = (task.duration / totalUnits) * 100;
                    
                    // Colores por tipo
                    const colors = {
                      construction: 'bg-blue-500 border-blue-600',
                      installation: 'bg-amber-500 border-amber-600',
                      finish: 'bg-emerald-500 border-emerald-600',
                    };

                    return (
                      <div key={task.id} className="flex items-center relative z-10">
                        <div className="w-32 text-sm font-medium text-slate-700 truncate pr-4 text-right">
                          {task.name}
                        </div>
                        <div className="flex-1 h-8 bg-slate-50 relative rounded bg-opacity-50">
                          <div 
                            className={`absolute top-0 h-8 rounded shadow-sm border text-white text-xs flex items-center justify-center font-bold transition-all duration-500 ease-in-out ${colors[task.type]}`}
                            style={{ 
                              left: `${leftPct}%`, 
                              width: `${widthPct}%` 
                            }}
                          >
                            {task.duration}d
                          </div>
                          
                          {/* Mostrar Lag visualmente si hay dependencia entrante */}
                          {dependencies.filter(d => d.target === task.id).map(dep => {
                             // Esto es una simplificación visual para mostrar de dónde viene la fuerza
                             return null;
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
                <p className="font-semibold mb-1 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Guía de Lectura:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1 text-xs">
                  <li>Las barras se mueven automáticamente a la derecha según las restricciones.</li>
                  <li>Si usas <strong>Lag Negativo</strong> (Adelanto), las tareas se superpondrán.</li>
                  <li>Si usas <strong>Lag Positivo</strong> (Retraso), verás un espacio vacío entre tareas.</li>
                </ul>
              </div>
            </Card>

            {/* Diagrama de Red Simplificado */}
            <Card className="p-6">
               <h3 className="font-bold text-slate-800 mb-4">Diagrama de Lógica de Red</h3>
               <div className="flex justify-around items-center h-32 relative">
                  {/* Conectores SVG Absolutos */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                      </marker>
                    </defs>
                    {dependencies.map(dep => {
                       // Posiciones hardcoded para la demo por simplicidad (en app real calcularía layout)
                       // Asumiendo orden visual T1 -> T2 -> T3
                       const positions = {
                         t1: 15, // % left
                         t2: 50,
                         t3: 85
                       };
                       
                       const x1 = positions[dep.source];
                       const x2 = positions[dep.target];
                       
                       // Si va hacia adelante
                       if (x2 > x1) {
                         return (
                           <path 
                             key={dep.id} 
                             d={`M ${x1+5}% 50 C ${x1+20}% 10, ${x2-20}% 10, ${x2-5}% 50`} 
                             fill="none" 
                             stroke="#94a3b8" 
                             strokeWidth="2" 
                             markerEnd="url(#arrowhead)"
                             strokeDasharray={dep.type === 'FS' ? '0' : '5,5'}
                           />
                         );
                       }
                       // Si va hacia atrás (raro en esta demo simple)
                       return null;
                    })}
                  </svg>

                  {INITIAL_TASKS.map(task => (
                    <div key={task.id} className="z-10 bg-white border-2 border-slate-300 p-3 rounded-lg shadow-sm w-32 text-center">
                      <div className="text-xs font-bold text-slate-400 mb-1">{task.id.toUpperCase()}</div>
                      <div className="font-semibold text-slate-800 text-sm leading-tight">{task.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{task.duration} días</div>
                    </div>
                  ))}
               </div>
               <p className="text-center text-xs text-slate-400 mt-2">
                 Las líneas sólidas son FS, las punteadas otras relaciones.
               </p>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}