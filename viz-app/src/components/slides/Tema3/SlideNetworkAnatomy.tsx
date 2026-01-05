
import { useState } from 'react';
import {
    Play,
    ChevronRight,
    Lock,
    Check,
    PlayCircle,
    AlertTriangle,
    Zap,
    Hourglass,
    Clock,
    Network
} from 'lucide-react';
import { Card } from '../../ui/Card';

const SlideNetworkAnatomy = () => {
    // Estados para las animaciones
    const [fsState, setFsState] = useState({ step: 0, text: "Dale al play para ver la secuencia." });
    const [ssState, setSsState] = useState({ active: false });
    const [ffState, setFfState] = useState({ active: false });
    const [leadState, setLeadState] = useState({ active: false });
    const [lagState, setLagState] = useState({ step: 0 });

    // FS Simulation
    const playFs = () => {
        setFsState({ step: 1, text: "Paso 1: Ejecutando Tarea A..." });

        setTimeout(() => {
            setFsState({ step: 2, text: "Paso 2: A terminada. Liberando dependencia..." });
        }, 1000);

        setTimeout(() => {
            setFsState({ step: 3, text: "Paso 3: Iniciando Tarea B..." });
        }, 2000);

        setTimeout(() => {
            setFsState({ step: 4, text: "¡Secuencia Completada!" });
        }, 3000);
    };

    // SS Simulation
    const playSs = () => {
        setSsState({ active: false });
        setTimeout(() => setSsState({ active: true }), 100);
    };

    // FF Simulation
    const playFf = () => {
        setFfState({ active: false });
        setTimeout(() => setFfState({ active: true }), 100);
    };

    // Lead Simulation
    const playLead = () => {
        setLeadState({ active: false });
        setTimeout(() => setLeadState({ active: true }), 100);
    };

    // Lag Simulation
    const playLag = () => {
        setLagState({ step: 0 });
        setTimeout(() => setLagState({ step: 1 }), 100); // Start A
        setTimeout(() => setLagState({ step: 2 }), 1100); // Start Wait
        setTimeout(() => setLagState({ step: 3 }), 2600); // Start B
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-blue-400">
                            <Network className="w-8 h-8" />
                            Anatomía de la Red (PDM)
                        </h2>
                        <p className="text-slate-300 mt-1">Método de Diagramación por Precedencia: Dependencias y Ajustes</p>
                    </div>
                    <div className="text-right text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded border border-slate-700">
                        <p>Estándar PMI / PMBOK®</p>
                    </div>
                </div>
            </div>

            {/* SECTION 1: RELACIONES */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Las 4 Relaciones Lógicas</h2>
                </div>

                {/* FS: FIN-INICIO (Main Card) */}
                <Card className="border-l-8 border-l-emerald-500 overflow-hidden">
                    <div className="p-2">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                    Fin-Inicio (FS)
                                    <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2.5 py-0.5 rounded-full">
                                        Estándar (95%)
                                    </span>
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
                                    La actividad B no puede comenzar hasta que A termine.
                                </p>
                            </div>
                            <button
                                onClick={playFs}
                                disabled={fsState.step > 0 && fsState.step < 4}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Play className="w-4 h-4 fill-current" /> Simular
                            </button>
                        </div>

                        {/* Simulation Area */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 min-h-[200px] relative">

                            {/* Task A */}
                            <div className="w-40 relative group">
                                <div className="h-20 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center shadow-sm z-10 relative overflow-hidden transition-colors duration-300">
                                    <span className="font-bold text-slate-700 dark:text-slate-200 z-10 relative">Excavar (A)</span>
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-1000 ease-linear"
                                        style={{ width: fsState.step >= 1 ? '100%' : '0%' }}
                                    />
                                    <div
                                        className="absolute inset-0 bg-emerald-100/20 dark:bg-emerald-900/20 transition-opacity duration-300"
                                        style={{ opacity: fsState.step >= 1 ? 1 : 0 }}
                                    />
                                </div>
                            </div>

                            {/* Arrow Connector */}
                            <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-600 w-full md:w-auto relative min-w-[50px]">
                                <div
                                    className="absolute top-0 left-0 h-full bg-slate-400 dark:bg-slate-400 transition-all duration-1000 ease-linear"
                                    style={{ width: fsState.step >= 2 ? '100%' : '0%' }}
                                />
                                <ChevronRight className="absolute right-0 -top-2.5 text-slate-400 dark:text-slate-400 w-6 h-6" />
                            </div>

                            {/* Task B */}
                            <div className="w-40 relative">
                                <div
                                    className={`h-20 bg-white dark:bg-slate-700 border-2 rounded-lg flex items-center justify-center shadow-sm z-10 relative overflow-hidden transition-all duration-500 ${fsState.step >= 3 ? 'opacity-100 border-emerald-500 dark:border-emerald-500' : 'opacity-50 border-slate-300 dark:border-slate-600'
                                        }`}
                                >
                                    <span className="font-bold text-slate-700 dark:text-slate-200 z-10 relative">Cimientos (B)</span>
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-1000 ease-linear"
                                        style={{ width: fsState.step >= 3 ? '100%' : '0%' }}
                                    />
                                </div>

                                {/* Lock Icon */}
                                <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-lg z-20 transition-all duration-500 ${fsState.step >= 2 ? 'bg-emerald-500 text-white scale-110' : 'bg-red-500 text-white scale-100'
                                    }`}>
                                    {fsState.step >= 2 ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                </div>
                            </div>

                        </div>
                        <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 mt-3 min-h-[24px]">
                            {fsState.text}
                        </p>
                    </div>
                </Card>

                {/* SS & FF Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* SS: INICIO-INICIO */}
                    <Card className="border-l-4 border-l-blue-500 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                Inicio-Inicio (SS)
                            </h3>
                            <button onClick={playSs} className="text-blue-500 hover:text-blue-600 transition-colors">
                                <PlayCircle className="w-8 h-8" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            B comienza al mismo tiempo que A.
                        </p>

                        <div className="relative h-32 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-700 p-4">
                            <div className="absolute top-4 left-4 w-32 h-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-xs shadow-sm overflow-hidden">
                                <span className="z-10 relative dark:text-slate-200">Nivelar (A)</span>
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[2000ms] ease-linear"
                                    style={{ width: ssState.active ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Connector SS */}
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                                <path d="M 36 34 L 36 64 L 60 64" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
                                <path d="M 55 64 L 60 64" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            </svg>

                            <div
                                className={`absolute top-20 left-16 w-32 h-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-xs shadow-sm transition-opacity duration-500 overflow-hidden ${ssState.active ? 'opacity-100' : 'opacity-50'
                                    }`}
                            >
                                <span className="z-10 relative dark:text-slate-200">Verter (B)</span>
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[2000ms] ease-linear"
                                    style={{ width: ssState.active ? '100%' : '0%', transitionDelay: '500ms' }}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* FF: FIN-FIN */}
                    <Card className="border-l-4 border-l-blue-500 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                                Fin-Fin (FF)
                            </h3>
                            <button onClick={playFf} className="text-blue-500 hover:text-blue-600 transition-colors">
                                <PlayCircle className="w-8 h-8" />
                            </button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            B termina cuando termina A.
                        </p>

                        <div className="relative h-32 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-700 p-4">
                            <div className="absolute top-4 left-4 w-32 h-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-xs shadow-sm overflow-hidden">
                                <span className="z-10 relative dark:text-slate-200">Escribir (A)</span>
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[2000ms] ease-linear"
                                    style={{ width: ffState.active ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Connector FF */}
                            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                                <path d="M 132 34 L 132 54 L 148 54 L 148 70" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
                            </svg>

                            <div className="absolute top-20 left-20 w-32 h-10 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-xs shadow-sm overflow-hidden">
                                <span className="z-10 relative dark:text-slate-200">Editar (B)</span>
                                <div
                                    className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-[2000ms] ease-linear"
                                    style={{ width: ffState.active ? '100%' : '0%' }}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* SF: Start-Finish */}
                <div className="bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-300 dark:border-slate-600 border-dashed p-4 opacity-75">
                    <div className="flex items-start md:items-center gap-4">
                        <div className="bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400 w-10 h-10 rounded flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">Inicio-Fin (SF)</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Muy rara. B no puede terminar hasta que A comience. Ejemplo: Turno nuevo (A) empieza para que turno viejo (B) termine.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="border-t border-slate-200 dark:border-slate-700 mx-8" />

            {/* SECTION 2: LEAD Vs LAG */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Ajustes de Tiempo</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* LEAD */}
                    <Card className="border-t-4 border-t-purple-500 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                                <Zap className="w-5 h-5" /> LEAD (Adelanto)
                            </h3>
                            <span className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded">
                                Aceleración
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                            Superposición. Empezar B antes de que A termine.
                        </p>

                        <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-48 overflow-hidden group">
                            <div className="absolute top-6 left-6 w-48 h-10 bg-purple-100 dark:bg-purple-900/40 border border-purple-300 dark:border-purple-700 rounded flex items-center pl-4 text-sm font-semibold text-purple-900 dark:text-purple-200 z-10 overflow-hidden">
                                <span className="z-10 relative">Diseñar (A)</span>
                                <div
                                    className="absolute top-0 left-0 h-full bg-purple-200 dark:bg-purple-800/50 transition-all duration-[2000ms] ease-linear"
                                    style={{ width: leadState.active ? '100%' : '0%' }}
                                />
                            </div>

                            {/* Overlapping B */}
                            <div className="absolute top-14 left-32 w-48 h-10 bg-white dark:bg-slate-700 border-2 border-dashed border-purple-400 rounded flex items-center pl-4 text-sm font-semibold text-purple-600 dark:text-purple-300 z-0 overflow-hidden">
                                <span className="z-10 relative">Programar (B)</span>
                                <div
                                    className="absolute top-0 left-0 h-full bg-purple-100 dark:bg-purple-900/30 transition-all duration-[2000ms] ease-linear"
                                    style={{ width: leadState.active ? '100%' : '0%', transitionDelay: '1000ms' }}
                                />
                            </div>

                            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                                <button
                                    onClick={playLead}
                                    className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded shadow transition-colors"
                                >
                                    Simular Solapamiento
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* LAG */}
                    <Card className="border-t-4 border-t-orange-500 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                                <Hourglass className="w-5 h-5" /> LAG (Retraso)
                            </h3>
                            <span className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 px-2 py-1 rounded">
                                Espera Obligada
                            </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                            Tiempo de espera entre tareas (ej. secado).
                        </p>

                        <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 h-48">
                            <div className="flex items-center space-x-2 relative top-2">

                                {/* A */}
                                <div className="w-1/3 h-12 bg-orange-100 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-700 rounded flex items-center justify-center text-sm font-semibold text-orange-900 dark:text-orange-200 relative overflow-hidden">
                                    <span className="z-10 relative">Suelo (A)</span>
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-1000 ease-linear"
                                        style={{ width: lagState.step >= 1 ? '100%' : '0%' }}
                                    />
                                </div>

                                {/* Wait */}
                                <div className="w-1/4 flex flex-col items-center justify-center text-orange-400 dark:text-orange-500">
                                    <Clock
                                        className={`w-8 h-8 transition-transform duration-1000 ${lagState.step === 2 ? 'animate-spin text-orange-600 dark:text-orange-400' : ''}`}
                                    />
                                    <span className="text-[10px] font-mono mt-1 opacity-70">3 días</span>
                                </div>

                                {/* B */}
                                <div className={`w-1/3 h-12 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded flex items-center justify-center text-sm font-semibold text-slate-500 dark:text-slate-300 relative overflow-hidden transition-opacity ${lagState.step >= 3 ? 'opacity-100' : 'opacity-50'
                                    }`}>
                                    <span className="z-10 relative">Pulir (B)</span>
                                    <div
                                        className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-1000 ease-linear"
                                        style={{ width: lagState.step >= 3 ? '100%' : '0%' }}
                                    />
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                                <button
                                    onClick={playLag}
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded shadow transition-colors"
                                >
                                    Simular Espera
                                </button>
                            </div>
                        </div>
                    </Card>

                </div>
            </section>

            {/* THEORY & GUIDE SECTION */}
            <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                    Fundamentos Teóricos: Diagramación por Precedencia (PDM)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>FS (Fin-Inicio):</strong> La más común (95%). Una tarea debe terminar para que la siguiente empiece. Ej: "Terminar código" &rarr; "Empezar test".
                            </li>
                            <li>
                                <strong>SS (Inicio-Inicio):</strong> Dos tareas arrancan a la vez. Ej: "Escribir capítulo" y "Corregir ortografía" (en tiempo real).
                            </li>
                            <li>
                                <strong>FF (Fin-Fin):</strong> Dos tareas deben terminar juntas. Ej: "Documentación" no se puede cerrar hasta que "Desarrollo" finalice.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>SF (Inicio-Fin):</strong> Muy rara. Una tarea no puede terminar hasta que la nueva empiece (relevo de seguridad).
                            </li>
                            <li>
                                <strong>Lead (Adelanto):</strong> Aceleración del cronograma solapando tareas. Aumenta riesgo de retrabajo.
                            </li>
                            <li>
                                <strong>Lag (Retraso):</strong> Tiempo de espera obligatorio que no requiere trabajo ni recursos (ej: fraguado, secado).
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Guía de Uso Interactivo</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Usa los botones <span className="inline-block bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[10px]">Simular</span> para ver cómo fluye el trabajo en cada tipo de relación. Observa cómo las barras de progreso se bloquean (candado) o se habilitan según la regla de dependencia.
                    </p>
                </div>
            </section>

            {/* SVG Definitions */}
            <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                </defs>
            </svg>
        </div>
    );
};

export default SlideNetworkAnatomy;
