import { useState, useEffect } from 'react';
import { Layers, Clock, DollarSign, Unlock, Lock, RefreshCw, Info } from 'lucide-react';
import { Card } from '../../ui/Card';

const SlideTripleConstraint = () => {
    // Estado inicial: valores del 0 al 100
    const [scope, setScope] = useState(70);
    const [time, setTime] = useState(70);
    const [cost, setCost] = useState(70);

    // Estado de calidad y alertas
    const [quality, setQuality] = useState(100);
    const [status, setStatus] = useState('Equilibrado');
    const [statusColor, setStatusColor] = useState('text-emerald-500');
    const [isBroken, setIsBroken] = useState(false);

    // Modos de gestión: 'Manual', 'FixedScope' (Alcance Fijo), 'FixedDeadline' (Fecha Fija)
    const [mode, setMode] = useState('Manual');

    // Cálculo de la Calidad y estado del triángulo
    useEffect(() => {
        // La "Física" del proyecto:
        // La capacidad de ejecución (Time * Cost) debe ser suficiente para soportar el Alcance (Scope)
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
            setQuality(Math.min(100, (1 / stress) * 80));

            if (stress > 1.0) {
                setStatus('Riesgo Alto: Calidad en peligro');
                setStatusColor('text-orange-500');
            } else if (stress < 0.6) {
                setStatus('Ineficiente: Recursos desperdiciados');
                setStatusColor('text-yellow-500');
            } else {
                setStatus('Proyecto Equilibrado');
                setStatusColor('text-emerald-500');
            }
        }
    }, [scope, time, cost]);

    // Manejadores de cambio con lógica de restricciones
    const handleScopeChange = (val: string) => {
        const newVal = parseInt(val);
        setScope(newVal);

        if (mode === 'FixedDeadline') {
            // Si la fecha es fija, y aumento alcance, el coste debe subir
            setCost(Math.min(100, Math.max(10, cost + (newVal - scope))));
        }
    };

    const handleTimeChange = (val: string) => {
        const newVal = parseInt(val);
        setTime(newVal);

        if (mode === 'FixedScope') {
            // Si el alcance es fijo y reduzco tiempo, el coste debe subir drásticamente (Crashing)
            if (newVal < time) {
                setCost(Math.min(100, cost + (time - newVal) * 1.5));
            }
        }
    };

    const handleCostChange = (val: string) => {
        const newCost = parseInt(val);
        const delta = cost - newCost; // Positivo si estamos reduciendo coste
        setCost(newCost);

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

    // Coordenadas para el triángulo SVG
    const center = 150;
    const scale = 1.2;

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
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-blue-400">
                            <Layers className="w-8 h-8" />
                            La Triple Restricción
                        </h2>
                        <p className="text-slate-300 mt-1">El "Triángulo de Hierro": Visualiza el impacto de tus decisiones.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Panel Visual (Izquierda) */}
                <Card className="flex flex-col items-center justify-center p-4 relative min-h-[400px] overflow-hidden">
                    <div className="absolute top-4 font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 text-sm">
                        <Layers size={16} /> ALCANCE
                    </div>
                    <div className="absolute bottom-10 right-4 font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2 text-sm">
                        TIEMPO <Clock size={16} />
                    </div>
                    <div className="absolute bottom-10 left-4 font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 text-sm">
                        <DollarSign size={16} /> COSTE
                    </div>

                    <svg width="300" height="300" className="overflow-visible transition-all duration-500 ease-out z-10">
                        {/* Triángulo Base */}
                        <polygon
                            points={`150,${150 - 70 * 1.2} ${150 + 70 * 1.2 * 0.866},${150 + 70 * 1.2 * 0.5} ${150 - 70 * 1.2 * 0.866},${150 + 70 * 1.2 * 0.5}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            className="text-slate-300 dark:text-slate-600"
                        />

                        {/* Triángulo Dinámico */}
                        <polygon
                            points={`${pScope.x},${pScope.y} ${pTime.x},${pTime.y} ${pCost.x},${pCost.y}`}
                            fill={isBroken ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)"}
                            stroke={isBroken ? "#EF4444" : "#3B82F6"}
                            strokeWidth="4"
                            className="transition-all duration-300"
                        />

                        {/* Núcleo de Calidad */}
                        {!isBroken ? (
                            <circle cx="150" cy="150" r={quality / 4} fill="currentColor" className="text-white blur-sm animate-pulse opacity-50" />
                        ) : (
                            <text x="150" y="155" textAnchor="middle" fontSize="40">⚠️</text>
                        )}
                    </svg>

                    <div className={`mt-4 font-bold text-lg ${statusColor} transition-colors duration-300 text-center z-10`}>
                        {status}
                    </div>
                </Card>

                {/* Panel de Control (Derecha) */}
                <div className="flex flex-col justify-center space-y-6">
                    {/* Selector de Modo */}
                    <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                            onClick={() => setMode('Manual')}
                            className={`p-2 text-xs rounded-md transition-all ${mode === 'Manual'
                                ? 'bg-white dark:bg-slate-700 shadow text-red-600 dark:text-red-400 font-bold'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Unlock size={14} />
                                <span>MANUAL</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setMode('FixedScope')}
                            className={`p-2 text-xs rounded-md transition-all ${mode === 'FixedScope'
                                ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400 font-bold'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Lock size={14} />
                                <span>ALCANCE FIJO</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setMode('FixedDeadline')}
                            className={`p-2 text-xs rounded-md transition-all ${mode === 'FixedDeadline'
                                ? 'bg-white dark:bg-slate-700 shadow text-orange-600 dark:text-orange-400 font-bold'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <Lock size={14} />
                                <span>FECHA FIJA</span>
                            </div>
                        </button>
                    </div>

                    <Card className="p-6 space-y-6">
                        {/* Scope Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                                    <Layers size={14} /> ALCANCE
                                </label>
                                <span className="text-sm font-mono font-bold">{scope}%</span>
                            </div>
                            <input
                                type="range" min="10" max="100" value={scope} onChange={(e) => handleScopeChange(e.target.value)}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                disabled={mode === 'FixedScope'}
                            />
                        </div>

                        {/* Time Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm">
                                    <Clock size={14} /> TIEMPO
                                </label>
                                <span className="text-sm font-mono font-bold">{time}%</span>
                            </div>
                            <input
                                type="range" min="10" max="100" value={time} onChange={(e) => handleTimeChange(e.target.value)}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                                disabled={mode === 'FixedDeadline'}
                            />
                        </div>

                        {/* Cost Slider */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                                    <DollarSign size={14} /> COSTE
                                </label>
                                <span className="text-sm font-mono font-bold">{cost}%</span>
                            </div>
                            <input
                                type="range" min="10" max="100" value={cost} onChange={(e) => handleCostChange(e.target.value)}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                            />
                        </div>

                        <button
                            onClick={resetSim}
                            className="flex items-center justify-center gap-2 w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm transition-colors text-slate-600 dark:text-slate-300 font-medium"
                        >
                            <RefreshCw size={14} /> Reiniciar Simulación
                        </button>
                    </Card>

                    {/* Lección Contextual */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 text-sm">
                        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                            <Info size={16} /> Lección PMP:
                        </h3>
                        <p className="text-blue-700 dark:text-blue-400 leading-relaxed">
                            {mode === 'FixedScope' && "Si el Alcance es fijo, reducir el Presupuesto obliga a aumentar el Tiempo (recursos más baratos tardan más) o el proyecto fallará."}
                            {mode === 'FixedDeadline' && "Si el Tiempo es fijo (Deadline), reducir el Presupuesto obliga a reducir el Alcance (hacer menos cosas) para llegar a tiempo."}
                            {mode === 'Manual' && "El modo manual permite romper el triángulo. Intenta maximizar Alcance con mínimo Tiempo y Coste para ver el fallo de calidad."}
                        </p>
                    </div>
                </div>
            </div>

            {/* SECCIÓN DE TEORÍA Y GUÍA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                {/* Teoría */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                        Fundamentos Teóricos
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                        <p>
                            Este componente visualiza la <strong>Triple Restricción</strong>, un concepto fundamental que marca la transición de la planificación del tiempo a la económica.
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>
                                <strong>Esfuerzo vs Duración:</strong> Es vital distinguirlos. El <em>Esfuerzo</em> es la cantidad de trabajo (horas-hombre), mientras que la <em>Duración</em> es el tiempo calendario.
                            </li>
                            <li>
                                <strong>Ley de Parkinson:</strong> "El trabajo se expande hasta llenar el tiempo disponible".
                            </li>
                            <li>
                                <strong>Síndrome del Estudiante:</strong> Tendencia a empezar la tarea en el último momento posible, desperdiciando las holguras.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Guía de Uso */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
                        Guía de la Herramienta
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                        <p><strong>Objetivo:</strong> Entender cómo la estimación afecta al equilibrio de calidad del proyecto.</p>
                        <ol className="list-decimal pl-4 space-y-2">
                            <li>
                                Selecciona un <strong>Modo de Gestión</strong> (Manual, Alcance Fijo, o Fecha Fija).
                            </li>
                            <li>
                                Intenta reducir el lado <strong>Coste</strong> moviendo el slider.
                            </li>
                            <li>
                                Observa el efecto:
                                <ul className="list-disc pl-4 mt-1 opacity-80">
                                    <li>Automáticamente, el <strong>Tiempo</strong> se alarga (se tarda más con menos recursos).</li>
                                    <li>O el <strong>Alcance</strong> se encoge (se hace menos).</li>
                                </ul>
                            </li>
                            <li>
                                Si fuerzas demasiado el triángulo (ej: mucho alcance, poco tiempo y dinero), observarás cómo se <strong>rompe la Calidad</strong>.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideTripleConstraint;
