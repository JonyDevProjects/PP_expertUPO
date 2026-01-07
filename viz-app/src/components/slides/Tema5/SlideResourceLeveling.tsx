import { useState } from 'react';
import { BarChart2, Calendar, Users, AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import { Card } from '../../ui/Card';

interface Task {
    id: string;
    name: string;
    start: number;
    duration: number;
    load: number;
    type: 'critical' | 'slack';
}

interface Scenario {
    tasks: Task[];
    description: string;
    endDate: number;
    status: 'danger' | 'success' | 'warning';
}

const SlideResourceLeveling = () => {
    const [mode, setMode] = useState<'original' | 'leveling' | 'smoothing'>('original');

    // Configuración del escenario
    const maxCapacity = 2; // 2 Personas máximo
    // const projectDeadline = 6; // Fecha fin original (unused constant)

    // Datos de las Tareas para cada escenario
    const scenarios: Record<string, Scenario> = {
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
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-400">
                            <BarChart2 className="w-8 h-8" />
                            Nivelador de Recursos
                        </h2>
                        <p className="text-slate-300 mt-1">Simula técnicas de optimización y su impacto en el cronograma.</p>
                    </div>

                    {/* Controles */}
                    <div className="flex gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setMode('original')}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${mode === 'original' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            Original
                        </button>
                        <button
                            onClick={() => setMode('leveling')}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${mode === 'leveling' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            <Calendar size={14} /> Nivelar
                        </button>
                        <button
                            onClick={() => setMode('smoothing')}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${mode === 'smoothing' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            <Clock size={14} /> Alisar
                        </button>
                    </div>
                </div>
            </div>

            {/* Panel de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`p-4 border-l-4 flex flex-col items-center justify-center transition-colors duration-500
          ${currentScenario.status === 'danger' ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10' :
                        currentScenario.status === 'success' ? 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-l-orange-500 bg-orange-50 dark:bg-orange-900/10'}`}>
                    <div className="text-xs uppercase font-bold opacity-70 mb-1">Estado de Recursos</div>
                    <div className="flex items-center gap-2 font-bold text-lg">
                        {currentScenario.status === 'danger' && <><AlertTriangle className="text-red-500" /> Sobrecarga</>}
                        {currentScenario.status === 'success' && <><CheckCircle className="text-emerald-500" /> Equilibrado</>}
                        {currentScenario.status === 'warning' && <><AlertTriangle className="text-orange-500" /> Parcial</>}
                    </div>
                </Card>

                <Card className="p-4 flex flex-col items-center justify-center border-l-4 border-l-slate-400">
                    <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 mb-1">Fecha Fin</div>
                    <div className={`text-2xl font-mono font-bold transition-all duration-500 ${currentScenario.endDate > 6 ? 'text-red-500 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        Día {currentScenario.endDate}
                        {currentScenario.endDate > 6 && <span className="text-xs ml-2 text-red-500 font-normal">(-2 días)</span>}
                    </div>
                </Card>

                <Card className="p-4 flex items-center justify-center text-center text-sm px-6 border-l-4 border-l-indigo-400">
                    <p className="text-slate-600 dark:text-slate-300 italic">{currentScenario.description}</p>
                </Card>
            </div>

            {/* Visualización GANTT y Recursos */}
            <Card className="p-6 relative overflow-hidden bg-slate-900 border-slate-800 text-slate-300">

                {/* Grid de Fondo */}
                <div className="absolute inset-0 flex pl-32 pointer-events-none opacity-20 z-0">
                    {[...Array(totalDays)].map((_, i) => (
                        <div key={i} className={`flex-1 border-r border-slate-600 ${i === 5 ? 'border-red-500 border-r-2' : ''} flex flex-col justify-end pb-2`}>
                            <span className="text-[10px] text-center block w-full text-slate-500">Día {i + 1}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 bottom-0 left-[calc(8rem+((100%-8rem)/9)*6)] border-l-2 border-dashed border-red-500 opacity-50 pl-1 pt-2 text-xs text-red-400 font-bold pointer-events-none z-0">
                    Deadline
                </div>

                {/* Diagrama de Gantt */}
                <div className="space-y-4 mb-12 relative z-10 pl-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Calendar size={12} /> Cronograma (Gantt)
                    </h3>
                    {currentScenario.tasks.map((task) => (
                        <div key={task.id} className="flex items-center h-8 group">
                            <div className="w-28 text-xs font-bold text-slate-400 pr-4 text-right flex-shrink-0">{task.name}</div>
                            <div className="flex-1 relative h-full bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50">
                                <div
                                    className={`
                                        absolute top-1 bottom-1 rounded shadow-md transition-all duration-700 ease-in-out flex items-center justify-center text-[10px] font-bold text-white cursor-help
                                        ${task.type === 'critical' ? 'bg-blue-600' : 'bg-teal-600'}
                                        ${task.start + task.duration > 6 ? 'opacity-100 ring-2 ring-red-500/50' : 'opacity-90'}
                                    `}
                                    style={{
                                        left: `${(task.start / totalDays) * 100}%`,
                                        width: `${(task.duration / totalDays) * 100}%`
                                    }}
                                    title={`${task.name}: ${task.duration} días`}
                                >
                                    {task.type === 'critical' ? 'Crítica' : 'Holgura'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Histograma de Recursos */}
                <div className="relative z-10 mt-8 pt-6 border-t border-slate-800 pl-2">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex justify-between items-center">
                        <span className="flex items-center gap-2"><Users size={12} /> Uso de Recursos</span>
                        <span className="text-red-400 text-[10px] bg-red-900/20 px-2 py-1 rounded border border-red-900/30">Línea Roja = Capacidad Máxima (2)</span>
                    </h3>

                    <div className="flex pl-32 h-32 items-end gap-2">
                        {histogram.map((load, i) => {
                            const isOverload = load > maxCapacity;
                            const heightPercentage = Math.min(100, (load / 3) * 100);

                            return (
                                <div key={i} className="flex-1 flex flex-col justify-end items-center relative group">

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs p-1 rounded transition-opacity pointer-events-none whitespace-nowrap z-20">
                                        Día {i + 1}: {load} Personas
                                    </div>

                                    {/* Barra */}
                                    <div
                                        className={`w-full max-w-[40px] rounded-t-sm transition-all duration-500 relative ${isOverload ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-600'}`}
                                        style={{ height: `${heightPercentage}%` }}
                                    >
                                        <span className={`absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-bold ${isOverload ? 'text-red-400' : 'text-slate-500'}`}>
                                            {load > 0 ? load : ''}
                                        </span>
                                    </div>

                                    {/* Línea de Capacidad */}
                                    <div className="absolute w-full border-t-2 border-red-500/40 z-0" style={{ bottom: '66%' }}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </Card>

            {/* Leyenda y Explicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                        <Info size={16} /> Nivelación (Leveling)
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">Se usa cuando los recursos son limitados y críticos. <strong>Se permite cambiar la fecha fin</strong> del proyecto para asegurar que nadie trabaje más del 100%.</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-2 flex items-center gap-2">
                        <Info size={16} /> Alisado (Smoothing)
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs">Se usa cuando la fecha de entrega es inamovible. Solo se mueven tareas con holgura. <strong>Puede dejar sobrecargas residuales</strong>.</p>
                </div>
            </div>

            {/* SECCIÓN DE TEORÍA Y GUÍA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                {/* Teoría */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                        Fundamentos Teóricos: Gestión de Personal
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                        <p>
                            El <strong>Plan de Gestión de Personal</strong> define cómo adquirir y gestionar los recursos. Una herramienta clave es el <strong>Histograma de Recursos</strong> para visualizar sobrecargas.
                        </p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>
                                <strong>Nivelación (Leveling):</strong> Se usa cuando los recursos son limitados (escasez). Resuelve sobreasignaciones retrasando tareas, lo que a menudo <strong>afecta la ruta crítica y retrasa el proyecto</strong>.
                            </li>
                            <li>
                                <strong>Alisado (Smoothing):</strong> Se usa cuando la fecha fin es fija. Ajusta recursos solo dentro de las holguras disponibles. <strong>No cambia la fecha fin</strong>, pero puede no resolver todas las sobrecargas.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Guía de Uso */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className="bg-indigo-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
                        Guía de la Herramienta
                    </h3>
                    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                        <p><strong>Objetivo:</strong> Comparar el impacto de la Nivelación vs el Alisado.</p>
                        <ol className="list-decimal pl-4 space-y-2">
                            <li>
                                Observa el escenario <strong>Original</strong>: Hay barras rojas en el Histograma (Sobrecarga &gt; 2 personas).
                            </li>
                            <li>
                                Pulsa <strong>Nivelar (Leveling)</strong>:
                                <ul className="list-disc pl-4 mt-1 opacity-80">
                                    <li>Las sobrecargas desaparecen (todo verde).</li>
                                    <li>PERO la fecha fin se retrasa (observa el "Deadline").</li>
                                </ul>
                            </li>
                            <li>
                                Pulsa <strong>Alisar (Smoothing)</strong>:
                                <ul className="list-disc pl-4 mt-1 opacity-80">
                                    <li>La fecha fin se respeta.</li>
                                    <li>Algunas sobrecargas persisten si no había suficiente holgura para mover las tareas.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SlideResourceLeveling;
