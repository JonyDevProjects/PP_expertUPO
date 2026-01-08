import { useState, useEffect } from 'react';
import { Play, RotateCcw, Award, AlertCircle, TrendingUp, ArrowRight } from 'lucide-react';

const NODES = [
    { id: 'start', label: 'Inicio', duration: 0, x: 50, y: 200 },
    { id: 'A', label: 'A', duration: 3, x: 180, y: 100, desc: 'Diseño' },
    { id: 'B', label: 'B', duration: 4, x: 180, y: 300, desc: 'Backend' },
    { id: 'C', label: 'C', duration: 2, x: 350, y: 100, desc: 'Frontend' },
    { id: 'D', label: 'D', duration: 5, x: 350, y: 300, desc: 'Base Datos' },
    { id: 'E', label: 'E', duration: 3, x: 520, y: 200, desc: 'Integración' },
    { id: 'end', label: 'Fin', duration: 0, x: 650, y: 200 },
];

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

const EDGES = [
    { from: 'start', to: 'A' },
    { from: 'start', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'A', to: 'D' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' },
    { from: 'E', to: 'end' },
];

interface CriticalPathFinderProps {
    simulationStep?: number;
}

export default function CriticalPathFinder({ simulationStep }: CriticalPathFinderProps) {
    const [hoveredPath, setHoveredPath] = useState<number | null>(null);
    const [selectedPath, setSelectedPath] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Simulation Effect
    useEffect(() => {
        if (typeof simulationStep === 'undefined') return;

        if (simulationStep === 0) {
            handleReset();
        }
        if (simulationStep === 1) { // Highlight Path 1 (Superior)
            setHoveredPath(1);
            setSelectedPath(null);
            setShowFeedback(false);
        }
        if (simulationStep === 2) { // Highlight Path 3 (Inferior - Critical) - Let's verify standard sequence
            setHoveredPath(3);
            setSelectedPath(null);
            setShowFeedback(false);
        }
        if (simulationStep === 3) { // Select Path 3 (Correct)
            setSelectedPath(3);
            setShowFeedback(true);
            setHoveredPath(null);
        }
    }, [simulationStep]);

    const calculatePathDuration = (sequence: string[]) => {
        return sequence.reduce((total, nodeId) => {
            const node = NODES.find(n => n.id === nodeId);
            return total + (node?.duration || 0);
        }, 0);
    };

    const pathsWithMetrics = PATHS.map(path => {
        const duration = calculatePathDuration(path.sequence);
        return { ...path, duration };
    });

    const maxDuration = Math.max(...pathsWithMetrics.map(p => p.duration));

    const handlePathClick = (pathId: number) => {
        if (showFeedback) return;
        setSelectedPath(pathId);
        setShowFeedback(true);
    };

    const handleReset = () => {
        setSelectedPath(null);
        setHoveredPath(null);
        setShowFeedback(false);
    };

    const getPathStatus = (pathId: number) => {
        const path = pathsWithMetrics.find(p => p.id === pathId);
        const isCritical = path?.duration === maxDuration;
        const isSelected = selectedPath === pathId;

        if (!showFeedback) return 'neutral';
        if (isSelected && isCritical) return 'correct';
        if (isSelected && !isCritical) return 'incorrect';
        if (!isSelected && isCritical) return 'missed';
        return 'dimmed';
    };

    const getEdgeColor = (from: string, to: string) => {
        const activePathId = showFeedback ? selectedPath : hoveredPath;
        const pathCriticalId = pathsWithMetrics.find(p => p.duration === maxDuration)?.id;

        let isCriticalReal = false;
        if (showFeedback && selectedPath !== pathCriticalId) {
            const critSeq = pathsWithMetrics.find(p => p.id === pathCriticalId)?.sequence || [];
            const fromIdx = critSeq.indexOf(from);
            const toIdx = critSeq.indexOf(to);
            isCriticalReal = fromIdx >= 0 && toIdx === fromIdx + 1;
        }

        if (activePathId) {
            const seq = PATHS.find(p => p.id === activePathId)?.sequence || [];
            const fromIdx = seq.indexOf(from);
            const toIdx = seq.indexOf(to);
            const isPart = fromIdx >= 0 && toIdx === fromIdx + 1;

            if (isPart) {
                if (showFeedback) {
                    const status = getPathStatus(activePathId);
                    return status === 'correct' ? '#ef4444' : '#f59e0b';
                }
                return '#3b82f6';
            }
        }

        if (isCriticalReal) return '#ef4444';

        return '#64748b';
    };

    const getNodeStyle = (nodeId: string) => {
        const activePathId = showFeedback ? selectedPath : hoveredPath;
        const pathCriticalId = pathsWithMetrics.find(p => p.duration === maxDuration)?.id;

        let isCriticalReal = false;
        if (showFeedback && selectedPath !== pathCriticalId) {
            const critPath = pathsWithMetrics.find(p => p.id === pathCriticalId);
            isCriticalReal = critPath ? critPath.sequence.includes(nodeId) : false;
        }

        if (activePathId) {
            const seq = PATHS.find(p => p.id === activePathId)?.sequence;
            if (seq && seq.includes(nodeId)) {
                if (showFeedback) {
                    const status = getPathStatus(activePathId);
                    return status === 'correct'
                        ? 'bg-rose-500 border-rose-600 text-white shadow-rose-200 dark:shadow-rose-900/40' // Added dark shadow
                        : 'bg-amber-500 border-amber-600 text-white shadow-amber-200 dark:shadow-amber-900/40'; // Added dark shadow
                }
                return 'bg-blue-500 border-blue-600 text-white shadow-blue-200 dark:shadow-blue-900/40'; // Added dark shadow
            }
        }

        if (isCriticalReal) return 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 border-dashed';

        return 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300';
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8 font-sans text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-rose-600 dark:text-rose-500" />
                            Buscador de la Ruta Crítica
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
                            Analiza la red y encuentra la secuencia que determina la duración total del proyecto.
                        </p>
                    </div>
                    {showFeedback && (
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-full hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 shadow-lg dark:shadow-slate-900/50 text-sm"
                        >
                            <RotateCcw className="w-4 h-4" /> Reiniciar
                        </button>
                    )}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden min-h-[400px]">
                        <div className="absolute top-4 left-4 bg-slate-50 dark:bg-slate-700 px-3 py-1 rounded text-xs font-mono text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm">
                            Vista: Diagrama PERT/CPM
                        </div>

                        <svg className="w-full h-full" viewBox="0 0 700 400">
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
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

                            {EDGES.map((edge) => {
                                const start = NODES.find(n => n.id === edge.from);
                                const end = NODES.find(n => n.id === edge.to);
                                const color = getEdgeColor(edge.from, edge.to);

                                let marker = "url(#arrowhead)";
                                if (color === '#3b82f6') marker = "url(#arrowhead-active)";
                                if (color === '#ef4444') marker = "url(#arrowhead-critical)";
                                if (color === '#f59e0b') marker = "url(#arrowhead-warning)";

                                if (!start || !end) return null;

                                return (
                                    <g key={`${edge.from}-${edge.to}`}>
                                        <line
                                            x1={start.x} y1={start.y}
                                            x2={end.x} y2={end.y}
                                            stroke={color}
                                            strokeWidth={color === '#64748b' ? 2 : 4}
                                            markerEnd={marker}
                                            className="transition-colors duration-300"
                                        />
                                    </g>
                                );
                            })}

                            {NODES.map(node => (
                                <g key={node.id} className="transition-all duration-300" style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
                                    <circle
                                        cx={node.x} cy={node.y} r="25"
                                        className={`transition-all duration-300 stroke-2 shadow-sm ${getNodeStyle(node.id)}`}
                                    />

                                    <text
                                        x={node.x} y={node.y} dy=".3em" textAnchor="middle"
                                        className={`font-bold pointer-events-none text-sm ${getNodeStyle(node.id).includes('text-white') ? 'fill-white' : 'fill-slate-700 dark:fill-slate-200'
                                            }`}
                                    >
                                        {node.label}
                                    </text>

                                    <g transform={`translate(${node.x + 18}, ${node.y - 25})`}>
                                        <rect x="0" y="0" width="24" height="16" rx="4" className="fill-slate-800 dark:fill-slate-900" />
                                        <text x="12" y="11" textAnchor="middle" className="fill-white text-[10px] font-bold">
                                            {node.duration}d
                                        </text>
                                    </g>

                                    {node.desc && (
                                        <text x={node.x} y={node.y + 45} textAnchor="middle" className="fill-slate-400 dark:fill-slate-500 text-[10px] uppercase font-semibold tracking-wider">
                                            {node.desc}
                                        </text>
                                    )}
                                </g>
                            ))}

                        </svg>

                        <div className="absolute bottom-4 left-4 flex gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-800/90 p-2 rounded-lg border dark:border-slate-600 backdrop-blur-sm shadow-sm">
                            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-600 border border-slate-400 dark:border-slate-500"></div> Normal</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500 dark:bg-rose-600"></div> Crítico</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-600"></div> Seleccionado</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-white p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold flex items-center gap-2 mb-1 text-sm">
                                <Play className="w-4 h-4 text-rose-500" /> Rutas Detectadas
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
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
                      ${status === 'dimmed' ? 'opacity-50 grayscale border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800' : ''}
                      ${status === 'neutral' ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/10' : ''}
                      ${status === 'correct' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 dark:border-rose-400 shadow-rose-100 dark:shadow-rose-900/20 ring-2 ring-rose-200 dark:ring-rose-900/30' : ''}
                      ${status === 'incorrect' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 dark:border-amber-400 shadow-amber-100 dark:shadow-amber-900/20' : ''}
                      ${status === 'missed' ? 'bg-white dark:bg-slate-800 border-dashed border-rose-300 dark:border-rose-700' : ''}
                    `}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`font-bold text-sm ${status === 'correct' ? 'text-rose-700 dark:text-rose-300' : 'text-slate-700 dark:text-slate-200'}`}>
                                                {path.label}
                                            </span>
                                            {showFeedback && (
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                           ${status === 'correct' ? 'bg-rose-600 dark:bg-rose-500/80 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}
                         `}>
                                                    {path.duration} días
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                                            {path.sequence.join(' → ')}
                                        </div>

                                        {showFeedback && selectedPath === path.id && (
                                            <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5">
                                                {status === 'correct' ? (
                                                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
                                                        <Award className="w-5 h-5" />
                                                        <span>¡Correcto! Holgura = 0</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                                                        <AlertCircle className="w-5 h-5" />
                                                        <span>Incorrecto. Holgura = {slack} días</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {!showFeedback && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-blue-500 dark:text-blue-400">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {showFeedback && (
                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                <strong className="block mb-1 text-slate-700 dark:text-slate-300">Nota Pedagógica:</strong>
                                La ruta crítica no siempre es la que tiene "más nodos", sino la que suma mayor duración.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
