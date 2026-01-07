import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Clock, Layers, Lock, Unlock, RefreshCw } from 'lucide-react';

const ProjectTriangleSim = () => {
  // Estado inicial: valores del 0 al 100
  const [scope, setScope] = useState(70);
  const [time, setTime] = useState(70);
  const [cost, setCost] = useState(70);
  
  // Estado de calidad y alertas
  const [quality, setQuality] = useState(100);
  const [status, setStatus] = useState('Equilibrado');
  const [statusColor, setStatusColor] = useState('text-green-400');
  const [isBroken, setIsBroken] = useState(false);
  
  // Modos de gestión: 'Manual', 'FixedScope' (Alcance Fijo), 'FixedDeadline' (Fecha Fija)
  const [mode, setMode] = useState('Manual');

  // Constante de equilibrio (Area ideal)
  const IDEAL_FACTOR = 70 * 70 * 70; 

  // Cálculo de la Calidad y estado del triángulo
  useEffect(() => {
    // La "Física" del proyecto:
    // La capacidad de ejecución (Time * Cost) debe ser suficiente para soportar el Alcance (Scope)
    // Usamos una fórmula simplificada para la simulación visual
    
    const capacity = (time * cost);
    const requiredEffort = scope * 60; // Factor de peso del alcance
    
    // Nivel de estrés del proyecto (Ratio entre lo requerido y lo disponible)
    const stress = requiredEffort / (capacity + 1); // +1 para evitar división por cero

    // Determinar si se rompe
    if (stress > 1.2) { // Margen de tolerancia del 20%
      setIsBroken(true);
      setStatus('¡PROYECTO INVIABLE! CALIDAD COMPROMETIDA');
      setStatusColor('text-red-500');
      setQuality(0);
    } else {
      setIsBroken(false);
      // La calidad es del 100% si estamos en equilibrio, baja si hay holgura excesiva (desperdicio)
      // o si estamos muy cerca del límite (estrés).
      // Para simplificar: Calidad visual basada en el área del triángulo formado
      setQuality(Math.min(100, (1 / stress) * 80));
      
      if (stress > 1.0) {
        setStatus('Riesgo Alto: Calidad en peligro');
        setStatusColor('text-orange-400');
      } else if (stress < 0.6) {
        setStatus('Ineficiente: Recursos desperdiciados');
        setStatusColor('text-yellow-300');
      } else {
        setStatus('Proyecto Equilibrado');
        setStatusColor('text-green-400');
      }
    }
  }, [scope, time, cost]);

  // Manejadores de cambio con lógica de restricciones
  const handleScopeChange = (val) => {
    const newVal = parseInt(val);
    setScope(newVal);
    
    if (mode === 'FixedDeadline') {
      // Si la fecha es fija, y aumento alcance, el coste debe subir
      // Coste aumenta proporcionalmente
      setCost(Math.min(100, Math.max(10, cost + (newVal - scope))));
    }
    // Si modo es FixedBudget (Coste fijo), no implementado en botones pero lógica similar:
    // Tiempo debería subir.
  };

  const handleTimeChange = (val) => {
    const newVal = parseInt(val);
    setTime(newVal);

    if (mode === 'FixedScope') {
      // Si el alcance es fijo y reduzco tiempo, el coste debe subir drásticamente (Crashing)
      if (newVal < time) {
        setCost(Math.min(100, cost + (time - newVal) * 1.5));
      }
    }
  };

  const handleCostChange = (val) => {
    const newCost = parseInt(val);
    const delta = cost - newCost; // Positivo si estamos reduciendo coste
    setCost(newCost);

    // Lógica principal solicitada: "Al reducir coste..."
    if (delta > 0) { // Estamos reduciendo presupuesto
      if (mode === 'FixedScope') {
        // "...el Tiempo se alarga"
        setTime(Math.min(100, time + delta * 1.5));
      } else if (mode === 'FixedDeadline') {
         // "...el Alcance se encoge"
         setScope(Math.max(10, scope - delta));
      }
    }
  };

  const resetSim = () => {
    setScope(70);
    setTime(70);
    setCost(70);
    setMode('Manual');
    setIsBroken(false);
  };

  // Coordenadas para el triángulo SVG (Sistema de coordenadas polar simulado)
  // Centro (150, 150)
  // Top: Alcance, Right: Tiempo, Left: Coste
  const center = 150;
  const scale = 1.2;
  
  // Coordenadas calculadas
  const pScope = { x: center, y: center - scope * scale };
  const pTime = { 
    x: center + (time * scale) * Math.cos(Math.PI / 6), 
    y: center + (time * scale) * Math.sin(Math.PI / 6) 
  };
  const pCost = { 
    x: center - (cost * scale) * Math.cos(Math.PI / 6), 
    y: center + (cost * scale) * Math.sin(Math.PI / 6) 
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl p-6 bg-slate-900 rounded-xl shadow-2xl text-white font-sans">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 text-blue-400">Simulador de la Triple Restricción</h2>
        <p className="text-slate-400">"El Triángulo de Hierro": Visualiza el impacto de tus decisiones de gestión.</p>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8">
        
        {/* Panel Visual (Izquierda) */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-800 rounded-lg p-4 relative min-h-[400px]">
          
          {/* Etiquetas Flotantes */}
          <div className="absolute top-4 font-bold text-blue-400 flex items-center gap-2">
            <Layers size={18} /> ALCANCE (Scope)
          </div>
          <div className="absolute bottom-10 right-4 font-bold text-orange-400 flex items-center gap-2">
            TIEMPO <Clock size={18} />
          </div>
          <div className="absolute bottom-10 left-4 font-bold text-green-400 flex items-center gap-2">
            <DollarSign size={18} /> COSTE
          </div>

          {/* SVG Container */}
          <svg width="300" height="300" className="overflow-visible transition-all duration-500 ease-out">
            {/* Triángulo Base (Referencia) */}
            <polygon 
              points={`150,${150-70*1.2} ${150+70*1.2*0.866},${150+70*1.2*0.5} ${150-70*1.2*0.866},${150+70*1.2*0.5}`}
              fill="none" 
              stroke="#334155" 
              strokeWidth="2" 
              strokeDasharray="5,5"
            />

            {/* Triángulo Dinámico */}
            <polygon 
              points={`${pScope.x},${pScope.y} ${pTime.x},${pTime.y} ${pCost.x},${pCost.y}`}
              fill={isBroken ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)"}
              stroke={isBroken ? "#EF4444" : "#60A5FA"}
              strokeWidth="4"
              className="transition-all duration-300"
            />
            
            {/* Conectores al centro */}
            <line x1="150" y1="150" x2={pScope.x} y2={pScope.y} stroke="#334155" strokeWidth="1" />
            <line x1="150" y1="150" x2={pTime.x} y2={pTime.y} stroke="#334155" strokeWidth="1" />
            <line x1="150" y1="150" x2={pCost.x} y2={pCost.y} stroke="#334155" strokeWidth="1" />

            {/* Núcleo de Calidad */}
            {!isBroken ? (
              <circle cx="150" cy="150" r={quality / 4} fill="white" className="blur-sm animate-pulse opacity-50" />
            ) : (
              <text x="150" y="155" textAnchor="middle" fontSize="40" fill="red">⚠️</text>
            )}
          </svg>

          {/* Estado Final */}
          <div className={`mt-4 font-bold text-lg ${statusColor} transition-colors duration-300 text-center`}>
            {status}
          </div>
          {isBroken && (
            <div className="text-xs text-red-300 mt-1 max-w-xs text-center">
              Has intentado hacer demasiado (Alcance), demasiado rápido (Tiempo) y demasiado barato (Coste). Eso es imposible.
            </div>
          )}
        </div>

        {/* Panel de Control (Derecha) */}
        <div className="flex-1 flex flex-col justify-center space-y-6 bg-slate-800 p-6 rounded-lg">
          
          {/* Selector de Modo */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button 
              onClick={() => setMode('Manual')}
              className={`p-2 text-xs rounded border transition-colors ${mode === 'Manual' ? 'bg-red-900 border-red-500 text-white' : 'border-slate-600 text-slate-400 hover:bg-slate-700'}`}
            >
              <div className="flex flex-col items-center">
                <Unlock size={16} className="mb-1"/>
                <span>MANUAL</span>
                <span className="text-[9px] opacity-70">(Riesgoso)</span>
              </div>
            </button>
            <button 
              onClick={() => setMode('FixedScope')}
              className={`p-2 text-xs rounded border transition-colors ${mode === 'FixedScope' ? 'bg-blue-900 border-blue-500 text-white' : 'border-slate-600 text-slate-400 hover:bg-slate-700'}`}
            >
              <div className="flex flex-col items-center">
                <Lock size={16} className="mb-1"/>
                <span>ALCANCE FIJO</span>
                <span className="text-[9px] opacity-70">(Calidad)</span>
              </div>
            </button>
            <button 
              onClick={() => setMode('FixedDeadline')}
              className={`p-2 text-xs rounded border transition-colors ${mode === 'FixedDeadline' ? 'bg-orange-900 border-orange-500 text-white' : 'border-slate-600 text-slate-400 hover:bg-slate-700'}`}
            >
              <div className="flex flex-col items-center">
                <Lock size={16} className="mb-1"/>
                <span>FECHA FIJA</span>
                <span className="text-[9px] opacity-70">(Entrega)</span>
              </div>
            </button>
          </div>

          <div className="space-y-6">
            {/* Slider Alcance */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="flex items-center gap-2 text-blue-400 font-bold">
                  <Layers size={16} /> ALCANCE (Funcionalidades)
                </label>
                <span className="text-sm font-mono">{scope}%</span>
              </div>
              <input 
                type="range" min="10" max="100" value={scope} onChange={(e) => handleScopeChange(e.target.value)}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50"
                disabled={mode === 'FixedScope'}
              />
            </div>

            {/* Slider Tiempo */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="flex items-center gap-2 text-orange-400 font-bold">
                  <Clock size={16} /> TIEMPO (Cronograma)
                </label>
                <span className="text-sm font-mono">{time}%</span>
              </div>
              <input 
                type="range" min="10" max="100" value={time} onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50"
                disabled={mode === 'FixedDeadline'}
              />
            </div>

            {/* Slider Coste */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="flex items-center gap-2 text-green-400 font-bold">
                  <DollarSign size={16} /> COSTE (Presupuesto)
                </label>
                <span className="text-sm font-mono">{cost}%</span>
              </div>
              <input 
                type="range" min="10" max="100" value={cost} onChange={(e) => handleCostChange(e.target.value)}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <p className="text-xs text-slate-500 mt-2 italic">
                *Prueba a reducir el coste drásticamente en diferentes modos.
              </p>
            </div>
          </div>

          <button 
            onClick={resetSim}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
          >
            <RefreshCw size={14} /> Reiniciar Simulación
          </button>

        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700 w-full text-sm text-slate-300">
        <h3 className="font-bold text-white mb-2 flex items-center gap-2"><AlertTriangle size={16} className="text-yellow-500"/> Lección PMP:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Si el Alcance es fijo (Fixed Scope):</strong> Reducir el Presupuesto obliga a aumentar el Tiempo (recursos más baratos tardan más) o el proyecto fallará.</li>
          <li><strong>Si el Tiempo es fijo (Fixed Deadline):</strong> Reducir el Presupuesto obliga a reducir el Alcance (hacer menos cosas) para llegar a tiempo.</li>
          <li><strong>Lo imposible:</strong> Alto Alcance + Tiempo Corto + Bajo Presupuesto = <strong>Ruptura de Calidad</strong>.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectTriangleSim;