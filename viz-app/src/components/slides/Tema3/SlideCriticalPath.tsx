import { useState } from 'react';
import { SlidersHorizontal, AlertTriangle } from 'lucide-react';
import { Card } from '../../ui/Card';
import SlideContainer from '../../shared/SlideContainer';

const SlideCriticalPath = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    // State for variable durations
    const [durationTaskA, setDurationTaskA] = useState(5); // Red path task 1
    const [durationTaskD, setDurationTaskD] = useState(3); // Blue path task 2
    const [highlightedPath, setHighlightedPath] = useState<'red' | 'blue' | null>(null);

    // Fixed durations
    const durationTaskB = 5; // Red path task 2
    const durationTaskC = 2; // Blue path task 1

    // Calculations
    const pathRedLength = durationTaskA + durationTaskB;
    const pathBlueLength = durationTaskC + durationTaskD;

    const totalDuration = Math.max(pathRedLength, pathBlueLength);
    const isBlueCritical = pathBlueLength >= pathRedLength;
    const float = Math.abs(pathRedLength - pathBlueLength);

    // Visual Scales
    const maxDaysScale = 15;
    const dayUnit = 100 / maxDaysScale; // Each day is X% width

    // Render Logic helpers
    const getWidthPercent = (days: number) => `${days * dayUnit}%`;
    const getLeftPercent = (days: number) => `${days * dayUnit}%`;

    const ttsSteps = [
        {
            id: "intro",
            text: "Ruta Crítica y Holgura. La Ruta Crítica es el camino más largo del diagrama y determina la fecha final del proyecto."
        },
        {
            id: "critical",
            text: "El Camino Rojo. Observa que las tareas rojas suman la mayor duración. No tienen holgura. Si una se retrasa, todo el proyecto se retrasa."
        },
        {
            id: "float",
            text: "Holgura. El camino azul es más corto, lo que genera un 'colchón' o espacio libre al final. Esto nos da flexibilidad para gestionar recursos."
        },
        {
            id: "simulation",
            text: "Simulación. Experimenta aumentando la duración de la tarea azul para ver cómo se consume la holgura hasta convertirla en crítica."
        }
    ];

    return (
        <SlideContainer
            title="Ruta Crítica (CPM) vs. Holgura"
            rate={1.2}
            ttsSteps={ttsSteps}
            autoPlay={autoPlay}
            onStepChange={(id) => {
                setHighlightedPath(null);
                if (!id) {
                    onAudioComplete?.();
                    return;
                }
                if (id === 'critical') setHighlightedPath('red');
                if (id === 'float') setHighlightedPath('blue');
                if (id === 'simulation') {
                    setDurationTaskD(6); // Simulate eating up float
                }
            }}
        >
            <div className="space-y-8 animate-in fade-in duration-500">

                {/* Concept Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className={`border-l-4 border-l-red-500 p-4 transition-all duration-500 ${highlightedPath === 'red' ? 'ring-2 ring-red-400 bg-red-50 dark:bg-red-900/10' : ''}`}>
                        <h3 className="font-bold text-red-600 dark:text-red-400 text-lg mb-1">🔥 Ruta Crítica (Camino Rojo)</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Determina la duración total. <b>Sin espacios vacíos</b>. Cualquier retraso aquí retrasa la entrega final.
                        </p>
                    </Card>
                    <Card className={`border-l-4 border-blue-500 p-4 transition-all duration-500 ${highlightedPath === 'blue' ? 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                        <h3 className="font-bold text-blue-600 dark:text-blue-400 text-lg mb-1">❄️ Holgura (Camino Azul)</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Tiempo extra. Visualmente es un <b>hueco al final</b>. Si te retrasas dentro del margen, ok.
                        </p>
                    </Card>
                </div>

                {/* Interactive Chart Area */}
                <Card className="p-2 md:p-8 overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Diagrama de Red Cronológico</h2>
                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg text-sm font-mono font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            Duración Proyecto: <span className="text-red-600 dark:text-red-400 text-lg">{totalDuration}</span> días
                        </div>
                    </div>

                    {/* Timeline Ruler */}
                    <div className="relative h-8 w-full border-b border-slate-300 dark:border-slate-600 mb-6 flex text-xs text-slate-400 font-mono">
                        {Array.from({ length: maxDaysScale + 1 }).map((_, i) => (
                            <div key={i} className="flex-1 border-l border-slate-200 dark:border-slate-700 h-full relative group">
                                {i > 0 && <span className="absolute -bottom-4 -left-1 text-[10px] opacity-50 group-hover:opacity-100">{i}</span>}
                            </div>
                        ))}
                    </div>

                    {/* Network Diagram Container */}
                    <div className="relative h-[300px] w-full bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4">

                        {/* ROW 1: RED PATH (Default Critical) */}
                        <div className={`absolute top-10 left-0 w-full flex items-center px-4 transition-opacity duration-500 ${highlightedPath === 'blue' ? 'opacity-30' : 'opacity-100'}`}>
                            <div className="w-8 text-xs font-bold text-red-400 transform -rotate-90 hidden md:block">CRÍTICO</div>
                            <div className="flex-1 relative h-16 w-full">
                                {/* Task A */}
                                <div
                                    className="h-12 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold shadow-md absolute top-2 border-2 border-red-600 z-10 transition-all duration-300 hover:scale-105"
                                    style={{ width: getWidthPercent(durationTaskA), left: 0 }}
                                >
                                    Tarea A ({durationTaskA}d)
                                </div>
                                {/* Task B */}
                                <div
                                    className="h-12 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold shadow-md absolute top-2 border-2 border-red-600 z-10 transition-all duration-300 hover:scale-105"
                                    style={{ width: getWidthPercent(durationTaskB), left: getLeftPercent(durationTaskA) }}
                                >
                                    Tarea B ({durationTaskB}d)
                                </div>

                                {/* Float display for Red Path if Blue becomes critical */}
                                {isBlueCritical && (
                                    <div
                                        className="h-12 border-2 border-dashed border-red-300 bg-red-50 dark:bg-red-900/10 rounded flex items-center justify-center text-[10px] text-red-400 font-mono absolute top-2 transition-all duration-300"
                                        style={{
                                            width: getWidthPercent(float),
                                            left: getLeftPercent(pathRedLength)
                                        }}
                                    >
                                        Holgura
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ROW 2: BLUE PATH (Default Float) */}
                        <div className={`absolute top-40 left-0 w-full flex items-center px-4 transition-opacity duration-500 ${highlightedPath === 'red' ? 'opacity-30' : 'opacity-100'}`}>
                            <div className="w-8 text-xs font-bold text-blue-400 transform -rotate-90 hidden md:block">HOLGURA</div>
                            <div className="flex-1 relative h-16 w-full">
                                {/* Task C */}
                                <div
                                    className={`h-12 rounded text-white flex items-center justify-center text-xs font-bold shadow-md absolute top-2 border-2 z-10 transition-all duration-300 hover:scale-105 ${isBlueCritical ? 'bg-red-500 border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-blue-500 border-blue-600'
                                        }`}
                                    style={{ width: getWidthPercent(durationTaskC), left: 0 }}
                                >
                                    Tarea C ({durationTaskC}d)
                                </div>
                                {/* Task D */}
                                <div
                                    className={`h-12 rounded text-white flex items-center justify-center text-xs font-bold shadow-md absolute top-2 border-2 z-10 transition-all duration-300 hover:scale-105 ${isBlueCritical ? 'bg-red-500 border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'bg-blue-500 border-blue-600'
                                        }`}
                                    style={{ width: getWidthPercent(durationTaskD), left: getLeftPercent(durationTaskC) }}
                                >
                                    Tarea D ({durationTaskD}d)
                                </div>

                                {/* Float display for Blue Path (Standard) */}
                                {!isBlueCritical && (
                                    <>
                                        <div
                                            className="h-12 border-2 border-dashed border-blue-300 bg-blue-50 dark:bg-blue-900/10 rounded flex items-center justify-center text-[10px] text-blue-400 font-mono absolute top-2 transition-all duration-300 z-0"
                                            style={{
                                                width: getWidthPercent(float),
                                                left: getLeftPercent(pathBlueLength)
                                            }}
                                        >
                                            <span className="bg-white dark:bg-slate-800 px-1 rounded shadow-sm opacity-90">{float} días libres</span>
                                        </div>
                                        {/* Virtual Limit Line */}
                                        <div
                                            className="absolute top-0 bottom-0 w-0.5 bg-red-400/50 border-l border-dashed border-red-500 z-20 transition-all duration-300"
                                            style={{
                                                left: getLeftPercent(pathBlueLength + float),
                                                height: '200px',
                                                top: '-100px'
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Controls */}
                    <div className="mt-8 bg-slate-100 dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5" /> Simulador de Incidencias
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Control Blue Path (Task D) */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-sm font-bold text-blue-700 dark:text-blue-400">Duración Tarea D (Camino Azul)</label>
                                    <span className="text-sm font-mono bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 rounded">{durationTaskD} días</span>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="8"
                                    value={durationTaskD}
                                    onChange={(e) => setDurationTaskD(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Aumenta la duración para ver cómo se "comen" la holgura.
                                </p>
                            </div>

                            {/* Control Red Path (Task A) */}
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <label className="text-sm font-bold text-red-700 dark:text-red-400">Duración Tarea A (Camino Rojo)</label>
                                    <span className="text-sm font-mono bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 rounded">{durationTaskA} días</span>
                                </div>
                                <input
                                    type="range"
                                    min="2" max="8"
                                    value={durationTaskA}
                                    onChange={(e) => setDurationTaskA(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Cualquier cambio aquí afecta al fin del proyecto.
                                </p>
                            </div>
                        </div>

                        {/* Status Message */}
                        <div className={`mt-6 p-4 rounded-lg text-center text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${isBlueCritical && float === 0
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 animate-pulse border border-orange-200'
                            : isBlueCritical
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200'
                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200'
                            }`}>
                            {isBlueCritical && float === 0 && <AlertTriangle className="w-4 h-4" />}
                            {isBlueCritical && float === 0
                                ? "¡Ruta Crítica Cambiada! El camino Azul ahora es Crítico."
                                : isBlueCritical
                                    ? `¡RETRASO! El proyecto se ha alargado ${float} días por culpa del camino Azul.`
                                    : `Situación Estable: Tienes ${float} días de holgura en el camino azul.`
                            }
                        </div>
                    </div>

                </Card>

                <div className="mt-4 text-xs text-slate-500 italic text-center">
                    * Nota: Diagrama simplificado. Todas las rutas comienzan el día 0.
                </div>

                {/* THEORY & GUIDE SECTION */}
                <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                        Fundamentos Teóricos: La Ruta Crítica (CPM)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
                        <div>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <strong>Ruta Crítica:</strong> Es la secuencia de actividades más larga que determina la <em>duración mínima</em> del proyecto. Si una tarea crítica se retrasa, todo el proyecto se retrasa.
                                </li>
                                <li>
                                    <strong>Holgura (Float):</strong> El tiempo que una tarea puede retrasarse sin afectar la fecha final (Holgura Total) o el inicio de la siguiente tarea (Holgura Libre).
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className="list-disc list-inside space-y-2">
                                <li>
                                    <strong>Compresión (Crashing):</strong> Añadir recursos para acortar la duración. Coste: $$$ (Sube).
                                </li>
                                <li>
                                    <strong>Compresión (Fast Tracking):</strong> Ejecutar tareas en paralelo que deberían ir en serie. Riesgo: Alto (Posible retrabajo).
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Guía de Uso Interactivo</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Ajusta los deslizadores para cambiar la duración de las tareas A y D.
                            Observa cómo al aumentar la duración de la Tarea D (azul), la <strong>holgura</strong> disminuye hasta llegar a cero. Si sigues aumentando, la ruta azul se convierte en la nueva <strong>Ruta Crítica</strong> (roja).
                        </p>
                    </div>
                </section>
            </div>
        </SlideContainer>
    );
};

export default SlideCriticalPath;
