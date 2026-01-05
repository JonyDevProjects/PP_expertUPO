import { useState, useEffect } from 'react';
import {
    Calculator,
    Users,
    Brain,
    Scale
} from 'lucide-react';

const SlideEstimation = () => {
    // State for PERT Calculator
    const [optimistic, setOptimistic] = useState(5);
    const [likely, setLikely] = useState(10);
    const [pessimistic, setPessimistic] = useState(20);
    const [expected, setExpected] = useState(0);
    const [stdDev, setStdDev] = useState(0);

    // Calculate PERT values whenever inputs change
    useEffect(() => {
        // Enforce logic: O <= M <= P
        let o = Math.min(optimistic, likely);
        let p = Math.max(pessimistic, likely);
        let m = likely;

        // Calculate Formula: (O + 4M + P) / 6
        const te = (o + 4 * m + p) / 6;
        const sigma = (p - o) / 6;

        setExpected(parseFloat(te.toFixed(2)));
        setStdDev(parseFloat(sigma.toFixed(2)));
    }, [optimistic, likely, pessimistic]);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg text-lg">E</div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Estimación de Duración</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. PERT Laboratory */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border-t-4 border-blue-500 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Calculator className="w-6 h-6 text-blue-500" />
                            Laboratorio PERT (3 Valores)
                        </h3>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full font-semibold border border-blue-200 dark:border-blue-800">
                            Gestión de Incertidumbre
                        </span>
                    </div>

                    <div className="space-y-6">
                        {/* Sliders */}
                        <div className="space-y-4 bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Optimista (O): {optimistic} días</label>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={optimistic}
                                    onChange={(e) => setOptimistic(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm font-medium text-blue-600 dark:text-blue-400">Más Probable (M): {likely} días</label>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={likely}
                                    onChange={(e) => setLikely(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <label className="text-sm font-medium text-red-600 dark:text-red-400">Pesimista (P): {pessimistic} días</label>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={pessimistic}
                                    onChange={(e) => setPessimistic(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                                />
                            </div>
                        </div>

                        {/* Result Display */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg text-center border-2 border-slate-200 dark:border-slate-700">
                                <span className="block text-xs uppercase text-slate-500 dark:text-slate-400 font-bold mb-1">Estimación Esperada (t_e)</span>
                                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{expected}</span>
                                <span className="text-xs text-slate-400 ml-1">días</span>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg text-center border-2 border-slate-200 dark:border-slate-700">
                                <span className="block text-xs uppercase text-slate-500 dark:text-slate-400 font-bold mb-1">Desviación (σ)</span>
                                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">±{stdDev}</span>
                                <span className="text-xs text-slate-400 ml-1">días</span>
                            </div>
                        </div>

                        <div className="text-xs text-center text-slate-500 dark:text-slate-400 italic">
                            * Rango probable de duración: {parseFloat((expected - stdDev).toFixed(2))} a {parseFloat((expected + stdDev).toFixed(2))} días (68% confianza).
                        </div>
                    </div>
                </div>

                {/* 2. Other Techniques */}
                <div className="space-y-4">
                    {/* Expert Judgment */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border-l-4 border-emerald-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                                <Brain className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white">Juicio de Expertos</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                    Consultar a personas con experiencia o conocimientos especializados. Es el método más común y se usa en combinación con otros.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Analogous */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full text-orange-600 dark:text-orange-400">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white">Estimación Análoga</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                    "Top-Down". Usa valores históricos de proyectos similares. Es <strong>rápida y barata</strong> pero <strong>menos precisa</strong>. Útil al inicio (Fase de Iniciación).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Parametric */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full text-purple-600 dark:text-purple-400">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white">Estimación Paramétrica</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                    Usa algoritmos y datos estadísticos. <em>Ejemplo: "Si pintar 1m² toma 1h, pintar 100m² tomará 100h".</em> <strong>Alta precisión</strong> si los datos subyacentes son buenos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* THEORY & GUIDE SECTION */}
            <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                    Fundamentos Teóricos: Fórmulas PERT
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                        <p className="mb-2 font-semibold text-slate-800 dark:text-white">Estimación Esperada ($t_e$):</p>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-700 font-mono text-center text-blue-600 dark:text-blue-400 mb-4">
                            t_e = (O + 4M + P) / 6
                        </div>
                        <p>
                            El método PERT (Program Evaluation and Review Technique) utiliza 3 estimaciones para definir un rango aproximado de duración de una actividad, ponderando más el valor "Más Probable" (M).
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 font-semibold text-slate-800 dark:text-white">Desviación Estándar ($\sigma$):</p>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-700 font-mono text-center text-purple-600 dark:text-purple-400 mb-4">
                            σ = (P - O) / 6
                        </div>
                        <p>
                            Mide la incertidumbre o riesgo. A mayor distancia entre el Optimista y el Pesimista, mayor desviación y por tanto mayor riesgo en esa estimación.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SlideEstimation;
