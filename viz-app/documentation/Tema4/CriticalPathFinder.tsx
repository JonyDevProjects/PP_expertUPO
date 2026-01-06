import React, { useState } from 'react';
import { Play, RotateCcw, Award, AlertCircle, TrendingUp, Clock, ArrowRight } from 'lucide-react';

/**
 * CriticalPathFinder
 * Infografía interactiva para enseñar el Método de la Ruta Crítica (CPM).
 * El usuario debe identificar visual y matemáticamente cuál es la secuencia más larga.
 */

// --- Configuración de la Red (Datos del Problema) ---

const NODES = [
  { id: 'start', label: 'Inicio', duration: 0, x: 50, y: 200 },
  { id: 'A', label: 'A', duration: 3, x: 180, y: 100, desc: 'Diseño' },
  { id: 'B', label: 'B', duration: 4, x: 180, y: 300, desc: 'Backend' },
  { id: 'C', label: 'C', duration: 2, x: 350, y: 100, desc: 'Frontend' },
  { id: 'D', label: 'D', duration: 5, x: 350, y: 300, desc: 'Base Datos' },
  { id: 'E', label: 'E', duration: 3, x: 520, y: 200, desc: 'Integración' },
  { id: 'end', label: 'Fin', duration: 0, x: 650, y: 200 },
];

// Definición manual de rutas para control pedagógico (Start -> End implícitos)
const PATHS = [
  { 
    id: 1, 
    sequence: ['start', 'A', 'C', 'E', 'end'], 
    label: 'Ruta Superior' 
  },
  { 
    id: 2, 
    sequence: ['start', 'A', 'D', 'E', 'end'], 
    label: 'Ruta Cruzada' 
  },
  { 
    id: 3, 
    sequence: ['start', 'B', 'D', 'E', 'end'], 
    label: 'Ruta Inferior' 
  },
];

// Definición de conexiones para dibujar las flechas
const EDGES = [
  { from: 'start', to: 'A' },
  { from: 'start', to: 'B' },
  { from: 'A', to: 'C' },
  { from: 'A', to: 'D' }, // Cruzada
  { from: 'B', to: 'D' },
  { from: 'C', to: 'E' },
  { from: 'D', to: 'E' },
  { from: 'E', to: 'end' },
];

export default function CriticalPathFinder() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // --- Lógica de Cálculo CPM ---

  // 1. Calcular duración de cada ruta
  const calculatePathDuration = (sequence) => {
    return sequence.reduce((total, nodeId) => {
      const node = NODES.find(n => n.id === nodeId);
      return total + node.duration;
    }, 0);
  };

  // 2. Determinar la duración máxima (Ruta Crítica)
  const pathsWithMetrics = PATHS.map(path => {
    const duration = calculatePathDuration(path.sequence);
    return { ...path, duration };
  });

  const maxDuration = Math.max(...pathsWithMetrics.map(p => p.duration));

  // --- Manejadores de Eventos ---

  const handlePathClick = (pathId) => {
    if (showFeedback) return; // Bloquear si ya contestó
    setSelectedPath(pathId);
    setShowFeedback(true);
  };

  const handleReset = () => {
    setSelectedPath(null);
    setHoveredPath(null);
    setShowFeedback(false);
  };

  // --- Helpers Visuales ---

  const getPathStatus = (pathId) => {
    const path = pathsWithMetrics.find(p => p.id === pathId);
    const isCritical = path.duration === maxDuration;
    const isSelected = selectedPath === pathId;

    if (!showFeedback) return 'neutral';
    if (isSelected && isCritical) return 'correct';
    if (isSelected && !isCritical) return 'incorrect';
    if (!isSelected && isCritical) return 'missed'; // Mostrar cuál era la correcta
    return 'dimmed';
  };

  const getEdgeColor = (from, to) => {
    // Determinar si esta arista es parte del camino hovereado o seleccionado
    const activePathId = showFeedback ? selectedPath : hoveredPath;
    const pathCriticalId = pathsWithMetrics.find(p => p.duration === maxDuration)?.id;
    
    // Si estamos mostrando feedback, priorizamos mostrar la ruta crítica real en otro color si falló
    let isCriticalReal = false;
    if (showFeedback && selectedPath !== pathCriticalId) {
       const critSeq = pathsWithMetrics.find(p => p.id === pathCriticalId).sequence;
       const fromIdx = critSeq.indexOf(from);
       const toIdx = critSeq.indexOf(to);
       isCriticalReal = fromIdx >= 0 && toIdx === fromIdx + 1;
    }

    if (activePathId) {
      const seq = PATHS.find(p => p.id === activePathId).sequence;
      const fromIdx = seq.indexOf(from);
      const toIdx = seq.indexOf(to);
      const isPart = fromIdx >= 0 && toIdx === fromIdx + 1;
      
      if (isPart) {
        if (showFeedback) {
          const status = getPathStatus(activePathId);
          return status === 'correct' ? '#ef4444' : '#f59e0b'; // Rojo si acertó, Ámbar si falló (su selección)
        }
        return '#3b82f6'; // Azul hover
      }
    }
    
    if (isCriticalReal) return '#ef4444'; // Revelar la crítica en rojo si falló

    return '#cbd5e1'; // Grid default
  };

  const getNodeStyle = (nodeId) => {
    const activePathId = showFeedback ? selectedPath : hoveredPath;
    const pathCriticalId = pathsWithMetrics.find(p => p.duration === maxDuration)?.id;
    
    let isCriticalReal = false;
    if (showFeedback && selectedPath !== pathCriticalId) {
        isCriticalReal = pathsWithMetrics.find(p => p.id === pathCriticalId).sequence.includes(nodeId);
    }

    if (activePathId) {
      const seq = PATHS.find(p => p.id === activePathId).sequence;
      if (seq.includes(nodeId)) {
        if (showFeedback) {
          const status = getPathStatus(activePathId);
          return status === 'correct' 
            ? 'bg-rose-500 border-rose-600 text-white shadow-rose-200' 
            : 'bg-amber-500 border-amber-600 text-white shadow-amber-200';
        }
        return 'bg-blue-500 border-blue-600 text-white shadow-blue-200 scale-110';
      }
    }

    if (isCriticalReal) return 'bg-rose-100 border-rose-300 text-rose-800 border-dashed';

    return 'bg-white border-slate-300 text-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-rose-600" />
              Buscador de la Ruta Crítica
            </h1>
            <p className="text-slate-600 mt-2">
              Analiza la red y encuentra la secuencia que determina la duración total del proyecto.
              <br/><span className="text-sm text-slate-500">Recuerda: La Ruta Crítica es el camino <strong>más largo</strong> (Holgura = 0).</span>
            </p>
          </div>
          {showFeedback && (
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors flex items-center gap-2 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" /> Reiniciar Análisis
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Panel Principal: Diagrama de Red SVG */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative overflow-hidden min-h-[500px]">
            <div className="absolute top-4 left-4 bg-slate-50 px-3 py-1 rounded text-xs font-mono text-slate-400 border">
              Vista: Diagrama PERT/CPM
            </div>

            <svg className="w-full h-full" viewBox="0 0 700 400">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
                <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
                <marker id="arrowhead-critical" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
                 <marker id="arrowhead-warning" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                </marker>
              </defs>

              {/* Dibujar Conexiones (Edges) */}
              {EDGES.map((edge, idx) => {
                const start = NODES.find(n => n.id === edge.from);
                const end = NODES.find(n => n.id === edge.to);
                const color = getEdgeColor(edge.from, edge.to);
                
                let marker = "url(#arrowhead)";
                if (color === '#3b82f6') marker = "url(#arrowhead-active)";
                if (color === '#ef4444') marker = "url(#arrowhead-critical)";
                if (color === '#f59e0b') marker = "url(#arrowhead-warning)";

                return (
                  <g key={`${edge.from}-${edge.to}`}>
                     {/* Línea visible */}
                    <line 
                      x1={start.x} y1={start.y} 
                      x2={end.x} y2={end.y} 
                      stroke={color} 
                      strokeWidth={color === '#cbd5e1' ? 2 : 4}
                      markerEnd={marker}
                      className="transition-colors duration-300"
                    />
                  </g>
                );
              })}

              {/* Dibujar Nodos */}
              {NODES.map(node => (
                <g key={node.id} className="transition-all duration-300" style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
                  {/* Círculo base */}
                  <circle 
                    cx={node.x} cy={node.y} r="25" 
                    className={`transition-all duration-300 stroke-2 shadow-sm ${getNodeStyle(node.id)}`}
                  />
                  
                  {/* Texto ID */}
                  <text 
                    x={node.x} y={node.y} dy=".3em" textAnchor="middle" 
                    className={`font-bold pointer-events-none text-sm ${
                      getNodeStyle(node.id).includes('text-white') ? 'fill-white' : 'fill-slate-700'
                    }`}
                  >
                    {node.label}
                  </text>

                  {/* Badge de Duración */}
                  <g transform={`translate(${node.x + 18}, ${node.y - 25})`}>
                    <rect x="0" y="0" width="24" height="16" rx="4" className="fill-slate-800" />
                    <text x="12" y="11" textAnchor="middle" className="fill-white text-[10px] font-bold">
                      {node.duration}d
                    </text>
                  </g>
                  
                  {/* Descripción flotante (solo para nodos intermedios) */}
                  {node.desc && (
                    <text x={node.x} y={node.y + 45} textAnchor="middle" className="fill-slate-400 text-[10px] uppercase font-semibold tracking-wider">
                      {node.desc}
                    </text>
                  )}
                </g>
              ))}

            </svg>
            
            {/* Leyenda flotante */}
            <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-medium text-slate-500 bg-white/90 p-2 rounded-lg border backdrop-blur-sm">
               <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400"></div> Normal</div>
               <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Crítico</div>
               <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Seleccionado</div>
            </div>
          </div>

          {/* Panel Lateral: Selector de Rutas y Feedback */}
          <div className="space-y-4">
            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg">
              <h3 className="font-bold flex items-center gap-2 mb-1">
                <Play className="w-4 h-4 text-rose-400" /> Rutas Detectadas
              </h3>
              <p className="text-xs text-slate-400">
                Pasa el mouse para resaltar. Haz clic en la que creas que determina la fecha final del proyecto.
              </p>
            </div>

            <div className="space-y-3">
              {pathsWithMetrics.map(path => {
                const status = getPathStatus(path.id);
                const slack = maxDuration - path.duration;
                
                return (
                  <button
                    key={path.id}
                    onMouseEnter={() => !showFeedback && setHoveredPath(path.id)}
                    onMouseLeave={() => !showFeedback && setHoveredPath(null)}
                    onClick={() => handlePathClick(path.id)}
                    disabled={showFeedback}
                    className={`
                      w-full p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group
                      ${status === 'dimmed' ? 'opacity-50 grayscale border-slate-200 bg-slate-50' : ''}
                      ${status === 'neutral' ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md' : ''}
                      ${status === 'correct' ? 'bg-rose-50 border-rose-500 shadow-rose-100 ring-2 ring-rose-200' : ''}
                      ${status === 'incorrect' ? 'bg-amber-50 border-amber-500 shadow-amber-100' : ''}
                      ${status === 'missed' ? 'bg-white border-dashed border-rose-300' : ''}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`font-bold text-sm ${status === 'correct' ? 'text-rose-700' : 'text-slate-700'}`}>
                        {path.label}
                      </span>
                      {showFeedback && (
                         <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                           ${status === 'correct' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'}
                         `}>
                           {path.duration} días
                         </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                       {path.sequence.join(' → ')}
                    </div>

                    {/* Feedback Overlay */}
                    {showFeedback && selectedPath === path.id && (
                      <div className="mt-3 pt-3 border-t border-black/5">
                        {status === 'correct' ? (
                          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                            <Award className="w-5 h-5" />
                            <span>¡Correcto! Holgura = 0</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                            <AlertCircle className="w-5 h-5" />
                            <span>Incorrecto. Holgura = {slack} días</span>
                          </div>
                        )}
                        <p className="text-xs mt-1 leading-snug text-slate-600">
                          {status === 'correct' 
                            ? "Esta es la ruta más larga. Determina la duración total del proyecto. Cualquier retraso aquí retrasa la entrega."
                            : "Esta ruta tiene holgura. Puedes retrasarte hasta " + slack + " días sin afectar la fecha final."}
                        </p>
                      </div>
                    )}
                    
                    {/* Hover Indicator */}
                    {!showFeedback && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-blue-500">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
               <div className="p-4 bg-slate-100 rounded-lg text-xs text-slate-500 border border-slate-200">
                  <strong className="block mb-1 text-slate-700">Nota Pedagógica:</strong>
                  La ruta crítica no siempre es la que tiene "más nodos", sino la que suma mayor duración. En este ejemplo, la Ruta Inferior (B-D-E) suma 12 días, superando a las otras aunque tenga el mismo número de pasos que la superior.
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}