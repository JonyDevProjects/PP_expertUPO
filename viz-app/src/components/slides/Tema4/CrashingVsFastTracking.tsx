import { useState } from 'react';
import { FastForward, DollarSign, AlertOctagon, Gauge, Info, ArrowDown, Users, ArrowRight } from 'lucide-react';

const Card = ({ children, className = "" }: any) => (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 ${className}`}>
        {children}
    </div>
);

export default function CrashingVsFastTracking() {
    const [method, setMethod] = useState<'none' | 'crashing' | 'fast-tracking'>('none');

    const getMetrics = () => {
        switch (method) {
            case 'crashing':
                return { duration: '12 sem', cost: '120k (+20%)', risk: 'Bajo', quality: 'Alto' };
            case 'fast-tracking':
                return { duration: '12 sem', cost: '100k (+0%)', risk: 'Alto', quality: 'Medio' };
            default:
                return { duration: '16 sem', cost: '100k', risk: 'Bajo', quality: 'Alto' };
        }
    };

    const metrics = getMetrics();

    return (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8 font-sans text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 h-full transition-colors duration-300">
            <div className="max-w-6xl mx-auto h-full flex flex-col">
                <div className="mb-6 flex items-center gap-3">
                    <Gauge className="w-8 h-8 text-amber-500" />
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Simulador de Compresión</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">¿Cómo recuperar el tiempo perdido? Elige una estrategia.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                    {/* Controls */}
                    <div className="flex flex-col gap-4">
                        {/* Option 1: Normal */}
                        <button
                            onClick={() => setMethod('none')}
                            className={`relative p-5 rounded-xl border-2 text-left transition-all ${method === 'none'
                                ? 'border-slate-500 bg-white dark:bg-slate-800 ring-1 ring-slate-500 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-slate-700 dark:text-slate-200">1. Plan Original (Secuencial)</h4>
                                {method === 'none' && <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">Activo</span>}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 pr-8">
                                A termina, luego empieza B. Es seguro pero lento.
                            </p>
                        </button>

                        {/* Option 2: Crashing */}
                        <button
                            onClick={() => setMethod('crashing')}
                            className={`relative p-5 rounded-xl border-2 text-left transition-all ${method === 'crashing'
                                ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 ring-1 ring-rose-500 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-rose-50/50 dark:hover:bg-rose-900/10 hover:border-rose-200 dark:hover:border-rose-800'
                                }`}
                        >
                            <div className="bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 p-2 rounded-lg inline-block mb-3">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">2. Crashing (Intensificación)</h4>
                                {method === 'crashing' && <span className="text-xs bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-200 px-2 py-1 rounded font-bold">Activo</span>}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                Añadir recursos (dinero/gente) a las tareas críticas.
                            </p>
                            <div className="text-[10px] grid grid-cols-2 gap-2 text-rose-700 dark:text-rose-300 font-medium">
                                <span className="flex items-center gap-1"><ArrowDown className="w-3 h-3" /> Menor Duración</span>
                                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> Más Coste</span>
                            </div>
                        </button>

                        {/* Option 3: Fast Tracking */}
                        <button
                            onClick={() => setMethod('fast-tracking')}
                            className={`relative p-5 rounded-xl border-2 text-left transition-all ${method === 'fast-tracking'
                                ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-500 shadow-md'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 hover:border-amber-200 dark:hover:border-amber-800'
                                }`}
                        >
                            <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 p-2 rounded-lg inline-block mb-3">
                                <FastForward className="w-5 h-5" />
                            </div>
                            <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">3. Fast Tracking (Ejecución Rápida)</h4>
                                {method === 'fast-tracking' && <span className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 px-2 py-1 rounded font-bold">Activo</span>}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                Paralelizar tareas que normalmente irían en secuencia.
                            </p>
                            <div className="text-[10px] grid grid-cols-2 gap-2 text-amber-700 dark:text-amber-300 font-medium">
                                <span className="flex items-center gap-1"><ArrowDown className="w-3 h-3" /> Menor Duración</span>
                                <span className="flex items-center gap-1"><AlertOctagon className="w-3 h-3" /> Mayor Riesgo/Retrabajo</span>
                            </div>
                        </button>
                    </div>

                    {/* Visualization */}
                    <div className="space-y-6">

                        {/* Logic Diagram */}
                        <Card className="p-6 min-h-[220px] flex items-center justify-center relative bg-slate-100/50 dark:bg-slate-800/50 overflow-hidden">
                            <div className="absolute top-2 left-3 text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Visualización Cronograma</div>

                            <div className="flex items-center gap-4 transition-all duration-700 pt-6">
                                {/* Task A */}
                                <div className={`
                    w-24 h-16 rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-all relative z-10
                    ${method === 'crashing' ? 'bg-rose-500 shadow-lg ring-2 ring-rose-300 dark:ring-rose-700' : 'bg-slate-400 dark:bg-slate-600'}
                  `}>
                                    A
                                    {method === 'crashing' && (
                                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] px-1.5 rounded-full font-bold shadow-sm flex items-center">
                                            $$$
                                        </div>
                                    )}
                                </div>

                                {/* Connector */}
                                {method === 'fast-tracking' ? (
                                    <div className="flex flex-col gap-1 items-center animate-pulse">
                                        <span className="text-amber-500 font-bold text-xs">Paralelo</span>
                                        <div className="w-8 h-8 border-l-2 border-t-2 border-amber-400 -ml-4 mt-2 rotate-45 transform origin-center"></div>
                                    </div>
                                ) : (
                                    <ArrowRight className="text-slate-400 dark:text-slate-600 w-8 h-8" />
                                )}

                                {/* Task B */}
                                <div className={`
                    w-24 h-16 rounded-lg flex items-center justify-center font-bold text-white shadow-sm transition-all z-10
                    ${method === 'fast-tracking' ? '-ml-12 mt-12 bg-amber-500 shadow-lg opacity-90' : 'bg-slate-400 dark:bg-slate-600'}
                    ${method === 'crashing' ? 'bg-rose-500 shadow-lg ring-2 ring-rose-300 dark:ring-rose-700' : ''}
                  `}>
                                    B
                                </div>
                            </div>
                        </Card>

                        {/* Metrics Dashboard */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Duración Total</div>
                                <div className={`text-2xl font-bold font-mono ${method === 'none' ? 'text-slate-700 dark:text-slate-200' : 'text-emerald-500'}`}>
                                    {metrics.duration}
                                </div>
                            </Card>
                            <Card className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Coste Estimado</div>
                                <div className={`text-2xl font-bold font-mono ${method === 'crashing' ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'}`}>
                                    {metrics.cost}
                                </div>
                            </Card>
                            <Card className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Nivel de Riesgo</div>
                                <div className={`text-xl font-bold flex items-center gap-2 ${metrics.risk === 'Alto' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                                    }`}>
                                    {metrics.risk === 'Alto' && <AlertOctagon className="w-5 h-5" />}
                                    {metrics.risk}
                                </div>
                            </Card>
                            <Card className="p-4 bg-slate-50 dark:bg-slate-800/50">
                                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Calidad</div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                                    <div className={`h-full ${metrics.quality === 'Alto' ? 'bg-emerald-500 w-full' : 'bg-amber-400 w-2/3'} transition-all duration-500`}></div>
                                </div>
                                <div className="text-right text-xs mt-1 font-bold text-slate-600 dark:text-slate-300">{metrics.quality}</div>
                            </Card>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-start gap-3 border border-blue-100 dark:border-blue-800">
                            <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                                {method === 'none' && "El modo estándar minimiza riesgos y costes, pero no optimiza tiempo."}
                                {method === 'crashing' && "Crashing es ideal cuando el coste no es la prioridad principal, pero sí la fecha de entrega."}
                                {method === 'fast-tracking' && "Fast Tracking es 'gratis' en dinero, pero cuesta en riesgo de retrabajo por solapar tareas no terminadas."}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
