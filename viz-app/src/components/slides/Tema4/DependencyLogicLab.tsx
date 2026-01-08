import { useState, useEffect } from 'react';
import { ArrowRight, AlertTriangle, RefreshCw, Clock, Info } from 'lucide-react';

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

const Card = ({ children, className = "" }: any) => (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, onClick, variant = 'primary', disabled = false, className = "" }: any) => {
    const styles: any = {
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

interface DependencyLogicLabProps {
    simulationStep?: number;
}

export default function DependencyLogicLab({ simulationStep }: DependencyLogicLabProps) {
    const [dependencies, setDependencies] = useState<any[]>([]);
    const [selectedSource, setSelectedSource] = useState<string | null>(null);
    const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState('FS');
    const [lag, setLag] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [schedule, setSchedule] = useState<any>({});

    // Simulation Effect
    useEffect(() => {
        if (typeof simulationStep === 'undefined') return;

        if (simulationStep === 0) {
            setDependencies([]);
            setLag(0);
        }
        if (simulationStep === 1) { // FS: Muros -> Ventanas
            setDependencies([{ id: 1, source: 't1', target: 't2', type: 'FS', lag: 0 }]);
        }
        if (simulationStep === 2) { // FS: Ventanas -> Pintar
            setDependencies([
                { id: 1, source: 't1', target: 't2', type: 'FS', lag: 0 },
                { id: 2, source: 't2', target: 't3', type: 'FS', lag: 0 }
            ]);
        }
        if (simulationStep === 3) { // Lag: Esperar 2 días
            setDependencies([
                { id: 1, source: 't1', target: 't2', type: 'FS', lag: 2 },
                { id: 2, source: 't2', target: 't3', type: 'FS', lag: 0 }
            ]);
            setLag(2);
        }
        if (simulationStep === 4) { // Lead: Adelanto (Fast Tracking)
            setDependencies([
                { id: 1, source: 't1', target: 't2', type: 'FS', lag: -1 },
                { id: 2, source: 't2', target: 't3', type: 'FS', lag: 0 }
            ]);
            setLag(-1);
        }

    }, [simulationStep]);

    useEffect(() => {
        calculateSchedule();
    }, [dependencies]);

    const calculateSchedule = () => {
        let dates: any = {};
        INITIAL_TASKS.forEach(t => {
            dates[t.id] = { start: 0, end: t.duration };
        });

        let changed = true;
        let iterations = 0;

        while (changed && iterations < 20) {
            changed = false;
            iterations++;

            dependencies.forEach(dep => {
                const pred = dates[dep.source];
                const succ = dates[dep.target];
                const taskSucc = INITIAL_TASKS.find(t => t.id === dep.target);

                if (!pred || !succ || !taskSucc) return;

                let newStart = succ.start;

                if (dep.type === 'FS') {
                    if (pred.end + dep.lag > newStart) {
                        newStart = pred.end + dep.lag;
                    }
                } else if (dep.type === 'SS') {
                    if (pred.start + dep.lag > newStart) {
                        newStart = pred.start + dep.lag;
                    }
                } else if (dep.type === 'FF') {
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
            setDependencies(prev => prev.slice(0, -1));
        } else {
            setSchedule(dates);
        }
    };

    const handleAddDependency = () => {
        setError(null);
        if (!selectedSource || !selectedTarget) return;

        if (selectedSource === selectedTarget) {
            setError("No puedes conectar una tarea consigo misma.");
            return;
        }

        const exists = dependencies.find(d => d.source === selectedSource && d.target === selectedTarget);
        if (exists) {
            setError("Ya existe una relación entre estas dos tareas.");
            return;
        }

        if (selectedSource === 't3' && selectedTarget === 't1') {
            setError("❌ ERROR LÓGICO: ¡No puedes 'Construir Muros' DESPUÉS de 'Pintarlos'! La física no funciona así.");
            return;
        }

        if (selectedSource === 't2' && selectedTarget === 't1') {
            setError("❌ ERROR LÓGICO: Necesitas los muros para instalar las ventanas.");
            return;
        }

        const newDep = {
            id: Date.now(),
            source: selectedSource,
            target: selectedTarget,
            type: selectedType,
            lag: parseInt(lag.toString())
        };

        setDependencies([...dependencies, newDep]);
        setSelectedSource(null);
        setSelectedTarget(null);
        setLag(0);
    };

    const removeDependency = (id: number) => {
        setDependencies(dependencies.filter(d => d.id !== id));
        setError(null);
    };

    const resetLab = () => {
        setDependencies([]);
        setError(null);
        setSchedule({});
        // calculateSchedule triggered by useEffect
    };

    const maxDuration = Math.max(
        ...Object.values(schedule).map((d: any) => d.end || 0),
        10
    );

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8 font-sans text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        Laboratorio de Dependencias (PDM)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                        Conecta las tareas y ajusta el <strong>Lag</strong> para ver cómo cambia el cronograma.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Card className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-sm">
                                <ArrowRight className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Nueva Conexión
                            </h4>

                            <div className="mb-3">
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Tarea Predecesora (A)</label>
                                <div className="space-y-1">
                                    {INITIAL_TASKS.map(task => (
                                        <button
                                            key={`src-${task.id}`}
                                            onClick={() => setSelectedSource(task.id)}
                                            className={`w-full text-left px-3 py-1.5 rounded border text-sm transition-all ${selectedSource === task.id
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium ring-1 ring-indigo-500'
                                                : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 dark:text-slate-300'
                                                }`}
                                        >
                                            {task.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Tarea Sucesora (B)</label>
                                <div className="space-y-1">
                                    {INITIAL_TASKS.map(task => (
                                        <button
                                            key={`tgt-${task.id}`}
                                            onClick={() => setSelectedTarget(task.id)}
                                            disabled={selectedSource === task.id}
                                            className={`w-full text-left px-3 py-1.5 rounded border text-sm transition-all ${selectedTarget === task.id
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium ring-1 ring-indigo-500'
                                                : selectedSource === task.id
                                                    ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 dark:text-slate-500'
                                                    : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 dark:text-slate-300'
                                                }`}
                                        >
                                            {task.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Tipo</label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full p-1.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs text-slate-800 dark:text-slate-200"
                                    >
                                        {DEPENDENCY_TYPES.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Lag (Días)</label>
                                    <input
                                        type="number"
                                        value={lag}
                                        onChange={(e) => setLag(parseInt(e.target.value) || 0)}
                                        className="w-full p-1.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs text-slate-800 dark:text-slate-200"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="mb-3 p-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2 animate-pulse">
                                    <AlertTriangle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <Button onClick={handleAddDependency} className="w-full text-sm py-1.5" disabled={!selectedSource || !selectedTarget}>
                                Conectar Tareas
                            </Button>
                        </Card>

                        <Card className="p-4 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Dependencias Activas</h4>
                                <button onClick={resetLab} className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3" /> Reset
                                </button>
                            </div>

                            {dependencies.length === 0 ? (
                                <p className="text-xs text-slate-500 dark:text-slate-500 italic text-center py-2">Sin conexiones definidas.</p>
                            ) : (
                                <div className="space-y-2">
                                    {dependencies.map(dep => {
                                        const srcName = INITIAL_TASKS.find(t => t.id === dep.source)?.name;
                                        const tgtName = INITIAL_TASKS.find(t => t.id === dep.target)?.name;
                                        return (
                                            <div key={dep.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600 text-xs">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-700 dark:text-slate-200">{srcName} <ArrowRight className="inline w-3 h-3 mx-1" /> {tgtName}</span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                                        {dep.type} {dep.lag > 0 ? `+ ${dep.lag}d` : dep.lag < 0 ? `- ${Math.abs(dep.lag)}d` : ''}
                                                    </span>
                                                </div>
                                                <button onClick={() => removeDependency(dep.id)} className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1">
                                                    <AlertTriangle className="w-3 h-3 rotate-45" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6 overflow-hidden bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Línea de Tiempo (Resultado)
                            </h4>

                            <div className="relative">
                                <div className="flex mb-2 ml-32 border-b border-slate-200 dark:border-slate-600 pb-2">
                                    {Array.from({ length: maxDuration + 5 }).map((_, i) => (
                                        <div key={i} className="flex-1 text-center text-[10px] text-slate-400 dark:text-slate-500 border-l border-slate-100 dark:border-slate-700 h-2">
                                            {i}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 relative">
                                    <div className="absolute top-0 bottom-0 left-32 right-0 flex pointer-events-none">
                                        {Array.from({ length: maxDuration + 5 }).map((_, i) => (
                                            <div key={i} className="flex-1 border-l border-dashed border-slate-100 dark:border-slate-600"></div>
                                        ))}
                                    </div>

                                    {INITIAL_TASKS.map(task => {
                                        const sched = schedule[task.id] || { start: 0, end: task.duration };
                                        const totalUnits = maxDuration + 5;
                                        const leftPct = (sched.start / totalUnits) * 100;
                                        const widthPct = (task.duration / totalUnits) * 100;

                                        const colors: any = {
                                            construction: 'bg-blue-500 border-blue-600 dark:bg-blue-600 dark:border-blue-700',
                                            installation: 'bg-amber-500 border-amber-600 dark:bg-amber-600 dark:border-amber-700',
                                            finish: 'bg-emerald-500 border-emerald-600 dark:bg-emerald-600 dark:border-emerald-700',
                                        };

                                        return (
                                            <div key={task.id} className="flex items-center relative z-10">
                                                <div className="w-32 text-xs font-medium text-slate-700 dark:text-slate-300 truncate pr-4 text-right">
                                                    {task.name}
                                                </div>
                                                <div className="flex-1 h-6 bg-slate-50 dark:bg-slate-700/50 relative rounded bg-opacity-50">
                                                    <div
                                                        className={`absolute top-0 h-6 rounded shadow-sm border text-white text-[10px] flex items-center justify-center font-bold transition-all duration-500 ease-in-out ${colors[task.type]}`}
                                                        style={{
                                                            left: `${leftPct}%`,
                                                            width: `${widthPct}%`
                                                        }}
                                                    >
                                                        {task.duration}d
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg text-xs text-slate-700 dark:text-slate-300">
                                <p className="font-semibold mb-1 flex items-center gap-2">
                                    <Info className="w-3 h-3" /> Guía de Lectura:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-1 text-[10px]">
                                    <li>Las barras se mueven automáticamente a la derecha según las restricciones.</li>
                                    <li>Si usas <strong>Lag Negativo</strong> (Adelanto), las tareas se superpondrán.</li>
                                </ul>
                            </div>
                        </Card>

                        <Card className="p-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm">Diagrama de Lógica de Red</h4>
                            <div className="flex justify-around items-center h-24 relative">
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                                        </marker>
                                    </defs>
                                    {dependencies.map(dep => {
                                        const positions: any = {
                                            t1: 15,
                                            t2: 50,
                                            t3: 85
                                        };

                                        const x1 = positions[dep.source];
                                        const x2 = positions[dep.target];

                                        if (x2 > x1) {
                                            return (
                                                <path
                                                    key={dep.id}
                                                    d={`M ${x1 + 5}% 50 C ${x1 + 20}% 10, ${x2 - 20}% 10, ${x2 - 5}% 50`}
                                                    fill="none"
                                                    stroke="#94a3b8"
                                                    strokeWidth="2"
                                                    markerEnd="url(#arrowhead)"
                                                    strokeDasharray={dep.type === 'FS' ? '0' : '5,5'}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                </svg>

                                {INITIAL_TASKS.map(task => (
                                    <div key={task.id} className="z-10 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 p-2 rounded-lg shadow-sm w-28 text-center">
                                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-0.5">{task.id.toUpperCase()}</div>
                                        <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs leading-tight">{task.name}</div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{task.duration} días</div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
