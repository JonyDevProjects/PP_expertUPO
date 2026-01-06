import React, { useState, useEffect } from 'react';
import { Play, TrendingUp, DollarSign, Zap, AlertTriangle, Clock, RotateCcw, ShieldAlert, BarChart3, ArrowRight } from 'lucide-react';

/**
 * CrashingVsFastTracking
 * Simulador interactivo para enseñar técnicas de compresión del cronograma.
 * Demuestra los trade-offs: 
 * - Crashing (Intensificación) -> Aumenta Coste
 * - Fast Tracking (Ejecución Rápida) -> Aumenta Riesgo
 */

// --- Configuración Inicial ---
const INITIAL_STATE = {
  deadline: 10,     // Día objetivo
  currentDay: 15,   // Día proyectado actual (5 días de retraso)
  budget: 10000,    // Presupuesto base
  cost: 10000,      // Coste actual
  risk: 5,          // Riesgo base (0-100%)
  tasks: [
    { id: 'A', name: 'Diseño Arquitectura', start: 0, duration: 7, originalDuration: 7, type: 'normal' },
    { id: 'B', name: 'Desarrollo Core', start: 7, duration: 8, originalDuration: 8, type: 'normal', lag: 0 }
  ]
};

export default function CrashingVsFastTracking() {
  const [gameState, setGameState] = useState(INITIAL_STATE);
  const [history, setHistory] = useState([]); // Log de acciones
  const [feedback, setFeedback] = useState(null); // Mensajes temporales

  // --- Acciones de Compresión ---

  // 1. CRASHING: Añadir recursos (Dinero por Tiempo)
  const handleCrashing = () => {
    // Solo podemos comprimir si la duración es mayor a un mínimo razonable
    const targetTask = gameState.tasks[0]; // Simplificación: atacamos la tarea A
    if (targetTask.duration <= 4) {
      showFeedback("¡Límite físico alcanzado! No puedes añadir más gente a esta tarea (Ley de Brooks).", "warning");
      return;
    }

    setGameState(prev => {
      const newDuration = prev.tasks[0].duration - 1;
      const addedCost = 3000; // Crashing es caro
      
      return {
        ...prev,
        cost: prev.cost + addedCost,
        currentDay: prev.currentDay - 1,
        tasks: [
          { ...prev.tasks[0], duration: newDuration, type: 'crashed' },
          { ...prev.tasks[1], start: newDuration } // Recalcular inicio de B
        ]
      };
    });
    
    addHistoryEntry("Crashing", "-1 día", "+$3,000", "Bajo");
    showFeedback("Recursos añadidos. El cronograma mejora, pero el presupuesto sufre.", "info");
  };

  // 2. FAST TRACKING: Paralelizar (Riesgo por Tiempo)
  const handleFastTracking = () => {
    // Solo podemos solapar hasta cierto punto
    const currentLag = gameState.tasks[1].lag;
    if (currentLag <= -3) {
      showFeedback("¡Riesgo Máximo! Demasiado solapamiento causará caos total.", "error");
      return;
    }

    setGameState(prev => {
      const newLag = prev.tasks[1].lag - 1; // Lag negativo = solapamiento
      const addedRisk = 25; // El riesgo se dispara
      
      // Recalcular inicio de B basado en el nuevo lag
      const taskA = prev.tasks[0];
      const newStartB = taskA.duration + newLag;

      return {
        ...prev,
        risk: prev.risk + addedRisk,
        currentDay: prev.currentDay - 1,
        tasks: [
          prev.tasks[0],
          { ...prev.tasks[1], start: newStartB, lag: newLag, type: 'overlapped' }
        ]
      };
    });

    addHistoryEntry("Fast Tracking", "-1 día", "$0", "Alto (+25%)");
    showFeedback("Tareas solapadas. Ahorras tiempo y dinero, pero el riesgo de retrabajo se dispara.", "warning");
  };

  const addHistoryEntry = (action, timeEffect, costEffect, riskEffect) => {
    setHistory(prev => [{
      id: Date.now(),
      action,
      time: timeEffect,
      cost: costEffect,
      risk: riskEffect
    }, ...prev]);
  };

  const showFeedback = (msg, type) => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const resetSim = () => {
    setGameState(INITIAL_STATE);
    setHistory([]);
    setFeedback(null);
  };

  // --- Cálculos para UI ---
  const delay = gameState.currentDay - gameState.deadline;
  const isOnTime = delay <= 0;
  const costVariance = gameState.cost - gameState.budget;
  
  // Colores dinámicos
  const getRiskColor = (r) => {
    if (r < 20) return 'text-emerald-600';
    if (r < 50) return 'text-amber-600';
    return 'text-rose-600 animate-pulse';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header de Crisis */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <RotateCcw className="w-8 h-8 text-indigo-600" />
              Simulador de Compresión
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Objetivo: Reduce el retraso a 0 días sin quebrar el proyecto.
            </p>
          </div>
          
          <div className="flex gap-6 text-center">
            <div className="px-4 py-2 bg-slate-100 rounded-lg">
               <div className="text-xs text-slate-500 uppercase font-bold">Retraso Actual</div>
               <div className={`text-2xl font-black ${isOnTime ? 'text-emerald-500' : 'text-rose-500'}`}>
                 {delay > 0 ? `+${delay} días` : 'A TIEMPO'}
               </div>
            </div>
             <button 
              onClick={resetSim}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reiniciar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Panel de Mando (Manager's Desk) */}
          <div className="space-y-6">
            
            {/* Tarjeta de Control */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
                <h3 className="font-bold flex items-center gap-2">
                   <BarChart3 className="w-5 h-5" /> Panel de Decisiones
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                
                {/* Botón Crashing */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" /> Opción A: Crashing
                    </h4>
                    <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-1 rounded font-mono font-bold">-$3k</span>
                  </div>
                  <p className="text-xs text-emerald-700 mb-4">
                    "Contratar un experto externo para ayudar con el Diseño."
                    <br/><span className="italic opacity-75">Impacto: Reduce duración, Aumenta coste.</span>
                  </p>
                  <button 
                    onClick={handleCrashing}
                    disabled={isOnTime}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Aplicar Crashing (-1 día)
                  </button>
                </div>

                {/* Botón Fast Tracking */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 transition-all hover:shadow-md">
                   <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-amber-900 flex items-center gap-2">
                      <Zap className="w-5 h-5" /> Opción B: Fast Tracking
                    </h4>
                    <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-mono font-bold">Riesgo++</span>
                  </div>
                  <p className="text-xs text-amber-800 mb-4">
                    "Empezar el Desarrollo antes de terminar el Diseño."
                    <br/><span className="italic opacity-75">Impacto: Reduce duración, Aumenta Riesgo de Rework.</span>
                  </p>
                  <button 
                    onClick={handleFastTracking}
                    disabled={isOnTime}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-bold shadow-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Aplicar Fast Tracking (-1 día)
                  </button>
                </div>

              </div>
            </div>

            {/* Log de Acciones */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 min-h-[200px]">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Log de Acciones</h4>
              {history.length === 0 ? (
                <p className="text-sm text-slate-400 italic text-center py-4">Esperando decisiones del PM...</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((entry) => (
                    <li key={entry.id} className="text-xs p-2 bg-slate-50 rounded border border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-700">{entry.action}</span>
                      <div className="flex gap-2 text-slate-500 font-mono">
                        <span>{entry.time}</span>
                        <span className={entry.cost === "$0" ? "text-slate-400" : "text-emerald-600"}>{entry.cost}</span>
                        <span className={entry.risk.includes("Bajo") ? "text-emerald-500" : "text-amber-600"}>{entry.risk}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          {/* Columna Derecha: Visualización (Gantt & Métricas) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Métricas Principales */}
            <div className="grid grid-cols-3 gap-4">
              {/* Coste */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
                <span className="text-xs text-slate-500 uppercase font-bold mb-1">Coste Real (AC)</span>
                <div className="text-xl font-bold text-slate-800">${gameState.cost.toLocaleString()}</div>
                <div className={`text-xs font-mono mt-1 ${costVariance > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {costVariance > 0 ? `+$${costVariance} (Sobrecoste)` : 'En Presupuesto'}
                </div>
              </div>

              {/* Duración */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
                 <span className="text-xs text-slate-500 uppercase font-bold mb-1">Duración Total</span>
                 <div className="text-xl font-bold text-slate-800">{gameState.currentDay} días</div>
                 <div className="text-xs text-slate-400 mt-1">Meta: {gameState.deadline} días</div>
              </div>

              {/* Riesgo */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center relative overflow-hidden">
                 <span className="text-xs text-slate-500 uppercase font-bold mb-1">Nivel de Riesgo</span>
                 <div className={`text-xl font-black flex items-center gap-1 ${getRiskColor(gameState.risk)}`}>
                   <ShieldAlert className="w-5 h-5" /> {gameState.risk}%
                 </div>
                 {/* Barra de progreso de riesgo */}
                 <div className="w-full h-1 bg-slate-100 mt-2 rounded-full overflow-hidden">
                   <div 
                    className={`h-full transition-all duration-500 ${gameState.risk > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${gameState.risk}%` }}
                   ></div>
                 </div>
              </div>
            </div>

            {/* Visualización Gantt */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 min-h-[300px] relative">
               <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-500" /> Cronograma en Tiempo Real
               </h3>
               
               {/* Feedback Flotante */}
               {feedback && (
                 <div className={`absolute top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-20 flex items-center gap-2 animate-bounce
                   ${feedback.type === 'warning' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 
                     feedback.type === 'error' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 
                     'bg-blue-100 text-blue-800 border border-blue-300'}
                 `}>
                   {feedback.type === 'warning' && <AlertTriangle className="w-4 h-4"/>}
                   {feedback.msg}
                 </div>
               )}

               <div className="relative pt-6 pb-2">
                  {/* Línea de Meta (Deadline) */}
                  <div className="absolute top-0 bottom-0 border-r-2 border-dashed border-slate-300 z-0 flex flex-col items-end"
                       style={{ left: `${(gameState.deadline / 20) * 100}%` }}>
                      <span className="text-xs font-bold text-slate-400 -mt-6 uppercase">Deadline ({gameState.deadline}d)</span>
                  </div>

                  {/* Línea de Proyección Actual */}
                  <div className={`absolute top-0 bottom-0 border-r-4 z-0 flex flex-col items-end transition-all duration-500
                       ${isOnTime ? 'border-emerald-400' : 'border-rose-400'}`}
                       style={{ left: `${(gameState.currentDay / 20) * 100}%` }}>
                      <span className={`text-xs font-bold -mt-6 uppercase px-2 py-0.5 rounded text-white
                        ${isOnTime ? 'bg-emerald-500' : 'bg-rose-500'}
                      `}>Fin ({gameState.currentDay}d)</span>
                  </div>

                  {/* Tareas */}
                  <div className="space-y-6 relative z-10 mt-4">
                    {gameState.tasks.map((task, index) => {
                      const widthPct = (task.duration / 20) * 100;
                      const leftPct = (task.start / 20) * 100;
                      
                      return (
                        <div key={task.id} className="relative h-12">
                          {/* Etiqueta */}
                          <div className="absolute -top-5 left-0 text-xs font-bold text-slate-500 w-full truncate">
                            {task.name} ({task.duration} días)
                          </div>
                          
                          {/* Barra Gantt */}
                          <div 
                            className={`absolute h-8 rounded-lg shadow-sm flex items-center justify-center text-xs font-bold text-white transition-all duration-500
                              ${task.type === 'crashed' ? 'bg-emerald-500 ring-2 ring-emerald-200' : 
                                task.type === 'overlapped' ? 'bg-amber-500 ring-2 ring-amber-200' : 'bg-blue-500'}
                            `}
                            style={{ 
                              left: `${leftPct}%`, 
                              width: `${widthPct}%` 
                            }}
                          >
                            {task.type === 'crashed' && <DollarSign className="w-3 h-3 mr-1" />}
                            {task.type === 'overlapped' && <Zap className="w-3 h-3 mr-1" />}
                            Tarea {task.id}
                          </div>

                          {/* Flecha de dependencia (Solo para B) */}
                          {index === 1 && (
                            <div className="absolute top-4 -translate-y-1/2 text-slate-300"
                                 style={{ left: `${leftPct - 2}%` }}>
                               <ArrowRight className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Eje X */}
                  <div className="border-t border-slate-200 mt-8 pt-2 flex justify-between text-xs text-slate-400 font-mono">
                    <span>Día 0</span>
                    <span>Día 5</span>
                    <span>Día 10</span>
                    <span>Día 15</span>
                    <span>Día 20</span>
                  </div>
               </div>
            </div>

            {/* Nota Pedagógica */}
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-sm text-indigo-800 flex gap-3">
              <TrendingUp className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Concepto Clave: El "Trade-off" (Intercambio)</strong>
                En gestión de proyectos, casi nunca puedes ganar tiempo gratis.
                <ul className="list-disc list-inside mt-1 ml-1 space-y-1 text-indigo-700">
                  <li><strong>Crashing:</strong> Cambias <span className="font-bold">Dinero</span> por Tiempo. (Ej. Horas extra).</li>
                  <li><strong>Fast Tracking:</strong> Cambias <span className="font-bold">Riesgo</span> por Tiempo. (Ej. Construir sin planos finales).</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}