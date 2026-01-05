import { useState } from 'react';
import {
    Activity
} from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const EvmCalculator = () => {
    const [bac, setBac] = useState(100000); // Budget at Completion
    const [percentComplete, setPercentComplete] = useState(50);
    const [ac, setAc] = useState(60000); // Actual Cost

    // Cálculos
    const ev = (percentComplete / 100) * bac; // Earned Value
    // const pv = (percentComplete / 100) * bac; // Planned Value (Simplificación) - Not actively used in this simulation logic as per original code

    // Nota: En realidad PV depende del plan, aquí lo simulamos igual al EV para enfocarnos en Coste, 
    // o podríamos añadir un slider de "Tiempo Planificado" para ser más exactos.
    // Para hacerlo más didáctico, vamos a asumir que debíamos llevar el 50% (PV) pero el usuario controla el % real.

    const plannedPercent = 50;
    const pvFixed = (plannedPercent / 100) * bac;

    // const cv = ev - ac; // Not displayed
    // const sv = ev - pvFixed; // Not displayed
    const cpi = ev / (ac || 1);
    const spi = ev / (pvFixed || 1);

    const getStatusColor = (val: number) => {
        if (val >= 1) return 'text-green-600 dark:text-green-400';
        if (val >= 0.9) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="bg-slate-800 text-white p-6 rounded-xl shadow-2xl">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="text-cyan-400" />
                Laboratorio EVM (Gestión del Valor Ganado)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase">Presupuesto (BAC)</label>
                    <input
                        type="number"
                        value={bac}
                        onChange={(e) => setBac(Number(e.target.value))}
                        className="w-full bg-slate-700 p-2 rounded text-sm text-white border border-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase">% Completado Real</label>
                    <input
                        type="range"
                        min="0" max="100"
                        value={percentComplete}
                        onChange={(e) => setPercentComplete(Number(e.target.value))}
                        className="w-full accent-cyan-500"
                    />
                    <div className="text-right text-cyan-400 font-mono">{percentComplete}%</div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase">Gasto Real (AC)</label>
                    <input
                        type="number"
                        value={ac}
                        onChange={(e) => setAc(Number(e.target.value))}
                        className="w-full bg-slate-700 p-2 rounded text-sm text-white border border-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-700/50 p-4 rounded-lg">
                <div className="text-center p-2 bg-slate-800 rounded">
                    <div className="text-xs text-slate-400">EV (Valor Ganado)</div>
                    <div className="font-mono text-lg font-bold text-white">€{ev.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">% Real * BAC</div>
                </div>
                <div className="text-center p-2 bg-slate-800 rounded">
                    <div className="text-xs text-slate-400">PV (Valor Plan.)</div>
                    <div className="font-mono text-lg font-bold text-white">€{pvFixed.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-500">Asumido al 50%</div>
                </div>
                <div className="text-center p-2 bg-slate-800 rounded">
                    <div className="text-xs text-slate-400">CPI (Eficiencia Coste)</div>
                    <div className={`font-mono text-xl font-bold ${getStatusColor(cpi)}`}>{cpi.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500">EV / AC</div>
                </div>
                <div className="text-center p-2 bg-slate-800 rounded">
                    <div className="text-xs text-slate-400">SPI (Eficiencia Crono)</div>
                    <div className={`font-mono text-xl font-bold ${getStatusColor(spi)}`}>{spi.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-500">EV / PV</div>
                </div>
            </div>

            <div className="mt-4 text-sm italic text-slate-300 bg-slate-700 p-3 rounded border-l-4 border-cyan-500">
                {cpi < 1 && spi < 1 ? "⚠️ Proyecto en CRISIS: Gastando más de lo previsto y retrasado." :
                    cpi < 1 && spi >= 1 ? "⚠️ Sobrecosto: Vas rápido, pero es caro (¿Crashing?)." :
                        cpi >= 1 && spi < 1 ? "⚠️ Retraso: Ahorras dinero pero no cumples fechas." :
                            "✅ Proyecto Saludable: En coste y tiempo."}
            </div>
        </div>
    );
};

const SlideEVM = () => {
    return (
        <SlideContainer title="Gestión del Valor Ganado (EVM)" className="animate-fade-in">
            <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-600 p-6 mb-8 rounded-r-lg">
                <p className="text-teal-800 dark:text-teal-200">
                    La metodología que integra alcance, cronograma y recursos para medir el desempeño y el progreso del proyecto de manera objetiva.
                </p>
            </div>

            {/* Definitions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow border-l-4 border-gray-400 dark:border-gray-500">
                    <h4 className="font-bold text-gray-700 dark:text-gray-200">PV (Valor Planificado)</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lo que DEBERÍAS haber hecho.</p>
                    <div className="mt-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded text-gray-800 dark:text-gray-200">Presupuesto asignado al trabajo programado.</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow border-l-4 border-teal-500">
                    <h4 className="font-bold text-teal-700 dark:text-teal-400">EV (Valor Ganado)</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lo que REALMENTE hiciste (en valor monetario).</p>
                    <div className="mt-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded text-gray-800 dark:text-gray-200">Trabajo realizado expresado en presupuesto.</div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded shadow border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-400">AC (Costo Actual)</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Lo que te COSTÓ hacerlo.</p>
                    <div className="mt-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded text-gray-800 dark:text-gray-200">Gasto real incurrido por el trabajo realizado.</div>
                </div>
            </div>

            {/* Interactive Calculator */}
            <div className="mb-10">
                <EvmCalculator />
            </div>

            {/* Formulas Reference */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-slate-700 pb-2">Chuleta de Fórmulas PMP</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-2 transition">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Variación del Costo (CV)</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">EV - AC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-2 transition">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Variación Cronograma (SV)</span>
                        <span className="font-mono text-blue-600 dark:text-blue-400">EV - PV</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-2 transition">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Índice Desempeño Costo (CPI)</span>
                        <span className="font-mono text-purple-600 dark:text-purple-400">EV / AC</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-2 transition">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Índice Desempeño Crono (SPI)</span>
                        <span className="font-mono text-purple-600 dark:text-purple-400">EV / PV</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-2 transition">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Estimación a la Conclusión (EAC)</span>
                        <span className="font-mono text-green-600 dark:text-green-400">BAC / CPI</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 px-2 transition">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Variación a la Conclusión (VAC)</span>
                        <span className="font-mono text-green-600 dark:text-green-400">BAC - EAC</span>
                    </div>
                </div>
            </div>
        </SlideContainer>
    );
};

export default SlideEVM;
