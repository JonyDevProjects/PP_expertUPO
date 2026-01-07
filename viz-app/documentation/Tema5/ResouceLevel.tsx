import React, { useState } from 'react';
import { BarChart2, Calendar, Users, AlertTriangle, ArrowRight, CheckCircle, Clock } from 'lucide-react';

const ResourceLeveler = () => {
  const [mode, setMode] = useState('original'); // 'original', 'leveling', 'smoothing'

  // Configuración del escenario
  const maxCapacity = 2; // 2 Personas máximo
  const projectDeadline = 6; // Fecha fin original

  // Datos de las Tareas para cada escenario
  // Start: Día de inicio (0-indexed para cálculos, visualmente 1-indexed)
  // Duration: Días
  // Load: Personas requeridas
  const scenarios = {
    original: {
      tasks: [
        { id: 't1', name: 'Tarea A (Crítica)', start: 0, duration: 4, load: 1, type: 'critical' },
        { id: 't2', name: 'Tarea B (Holgura)', start: 1, duration: 2, load: 1, type: 'slack' },
        { id: 't3', name: 'Tarea C (Crítica)', start: 2, duration: 4, load: 1, type: 'critical' },
      ],
      description: "Sobrecarga crítica en los días 3 y 4. Se requieren 3 personas, pero solo tienes 2.",
      endDate: 6,
      status: 'danger'
    },
    leveling: {
      tasks: [
        { id: 't1', name: 'Tarea A (Crítica)', start: 0, duration: 4, load: 1, type: 'critical' },
        { id: 't2', name: 'Tarea B (Holgura)', start: 4, duration: 2, load: 1, type: 'slack' }, // Moved
        { id: 't3', name: 'Tarea C (Crítica)', start: 4, duration: 4, load: 1, type: 'critical' }, // Moved
      ],
      description: "NIVELACIÓN: Se han retrasado tareas para eliminar TODA sobrecarga. La fecha fin se ha extendido.",
      endDate: 8,
      status: 'success'
    },
    smoothing: {
      tasks: [
        { id: 't1', name: 'Tarea A (Crítica)', start: 0, duration: 4, load: 1, type: 'critical' },
        { id: 't2', name: 'Tarea B (Holgura)', start: 3, duration: 2, load: 1, type: 'slack' }, // Moved within slack
        { id: 't3', name: 'Tarea C (Crítica)', start: 2, duration: 4, load: 1, type: 'critical' }, // Can't move (Critical)
      ],
      description: "ALISADO: Se usó la holgura de la Tarea B. La Tarea C no se pudo mover sin retrasar el proyecto. Persiste sobrecarga leve.",
      endDate: 6,
      status: 'warning'
    }
  };

  const currentScenario = scenarios[mode];
  const totalDays = 9; // Grid width

  // Cálculo del Histograma de Recursos
  const calculateHistogram = () => {
    const usage = new Array(totalDays).fill(0);
    currentScenario.tasks.forEach(task => {
      for (let i = task.start; i < task.start + task.duration; i++) {
        if (i < totalDays) usage[i] += task.load;
      }
    });
    return usage;
  };

  const histogram = calculateHistogram();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900 rounded-xl shadow-2xl font-sans text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="text-blue-400"/> El Nivelador de Recursos
          </h2>
          <p className="text-sm text-slate-400">Compara el impacto de las técnicas de optimización en el cronograma.</p>
        </div>
        
        {/* Controles */}
        <div className="flex gap-2 mt-4 md:mt-0 bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setMode('original')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all ${mode === 'original' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            Original
          </button>
          <button 
            onClick={() => setMode('leveling')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all flex items-center gap-2 ${mode === 'leveling' ? 'bg-green-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Calendar size={14}/> Nivelar (Leveling)
          </button>
          <button 
            onClick={() => setMode('smoothing')}
            className={`px-4 py-2 rounded text-sm font-bold transition-all flex items-center gap-2 ${mode === 'smoothing' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
          >
            <Clock size={14}/> Alisar (Smoothing)
          </button>
        </div>
      </div>

      {/* Panel de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-colors duration-500
          ${currentScenario.status === 'danger' ? 'bg-red-900/20 border-red-500/50' : 
            currentScenario.status === 'success' ? 'bg-green-900/20 border-green-500/50' : 'bg-orange-900/20 border-orange-500/50'}`}>
          <div className="text-xs uppercase font-bold opacity-70 mb-1">Estado de Recursos</div>
          <div className="flex items-center gap-2 font-bold text-lg">
            {currentScenario.status === 'danger' && <><AlertTriangle className="text-red-500"/> Sobrecarga Crítica</>}
            {currentScenario.status === 'success' && <><CheckCircle className="text-green-500"/> Equilibrado</>}
            {currentScenario.status === 'warning' && <><AlertTriangle className="text-orange-500"/> Sobrecarga Parcial</>}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-center">
          <div className="text-xs uppercase font-bold text-slate-400 mb-1">Fecha Fin de Proyecto</div>
          <div className={`text-2xl font-mono font-bold transition-all duration-500 ${currentScenario.endDate > 6 ? 'text-red-400' : 'text-blue-400'}`}>
            Día {currentScenario.endDate}
            {currentScenario.endDate > 6 && <span className="text-xs ml-2 text-red-400">(+2 días retraso)</span>}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-center text-sm px-6">
           <p className="text-slate-300 italic">{currentScenario.description}</p>
        </div>
      </div>

      {/* Visualización GANTT y Recursos */}
      <div className="bg-slate-800 rounded-lg p-6 relative overflow-hidden">
        
        {/* Grid de Fondo */}
        <div className="absolute inset-0 flex pl-32 pointer-events-none opacity-20">
          {[...Array(totalDays)].map((_, i) => (
            <div key={i} className={`flex-1 border-r border-slate-400 ${i === 5 ? 'border-red-500 border-r-2' : ''} flex flex-col justify-end pb-2`}>
              <span className="text-xs text-center block w-full">Día {i + 1}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-0 bottom-0 left-[calc(8rem+((100%-8rem)/9)*6)] border-l-2 border-dashed border-red-500 opacity-50 pl-1 pt-2 text-xs text-red-400 font-bold pointer-events-none">
          Deadline
        </div>

        {/* Diagrama de Gantt */}
        <div className="space-y-4 mb-12 relative z-10">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Cronograma (Gantt)</h3>
          {currentScenario.tasks.map((task) => (
            <div key={task.id} className="flex items-center h-8 group">
              <div className="w-32 text-xs font-bold text-slate-300 pr-4 text-right flex-shrink-0">{task.name}</div>
              <div className="flex-1 relative h-full bg-slate-700/30 rounded">
                <div 
                  className={`
                    absolute top-1 bottom-1 rounded shadow-md transition-all duration-700 ease-in-out flex items-center justify-center text-[10px] font-bold text-white
                    ${task.type === 'critical' ? 'bg-blue-500' : 'bg-teal-500'}
                    ${task.start + task.duration > 6 ? 'opacity-100' : 'opacity-90'}
                  `}
                  style={{
                    left: `${(task.start / totalDays) * 100}%`,
                    width: `${(task.duration / totalDays) * 100}%`
                  }}
                >
                  {task.type === 'critical' ? 'Crítica' : 'Holgura'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Histograma de Recursos */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex justify-between">
            <span>Uso de Recursos (Personas)</span>
            <span className="text-red-400 text-[10px]">Línea Roja = Capacidad Máxima (2)</span>
          </h3>
          
          <div className="flex pl-32 h-32 items-end gap-1">
            {histogram.map((load, i) => {
              const isOverload = load > maxCapacity;
              const heightPercentage = Math.min(100, (load / 3) * 100); // 3 es el max load en este ejemplo
              
              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center relative group">
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs p-1 rounded transition-opacity pointer-events-none whitespace-nowrap z-20">
                    Día {i + 1}: {load} Personas
                  </div>

                  {/* Barra */}
                  <div 
                    className={`w-full max-w-[30px] rounded-t transition-all duration-500 relative ${isOverload ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ height: `${heightPercentage}%` }}
                  >
                     <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                       {load > 0 ? load : ''}
                     </span>
                  </div>

                  {/* Línea de Capacidad */}
                  <div className="absolute w-full border-t-2 border-red-500/50 z-0" style={{ bottom: '66%' }}></div> 
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Leyenda y Explicación */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400">
        <div className="bg-slate-800 p-3 rounded">
          <h4 className="font-bold text-green-400 mb-1">Nivelación (Leveling)</h4>
          <p>Se usa cuando los recursos son limitados y críticos. <strong>Se permite cambiar la fecha fin</strong> del proyecto para asegurar que nadie trabaje más del 100%.</p>
        </div>
        <div className="bg-slate-800 p-3 rounded">
          <h4 className="font-bold text-orange-400 mb-1">Alisado (Smoothing)</h4>
          <p>Se usa cuando la fecha de entrega es inamovible. Solo se mueven tareas con holgura. <strong>Puede dejar sobrecargas residuales</strong>.</p>
        </div>
      </div>

    </div>
  );
};

export default ResourceLeveler;