import { useState } from 'react';
import { TrendingUp, DollarSign, Clock, ArrowRight, Calculator } from 'lucide-react';
import { Card } from '../../ui/Card';

const SlideEVM = () => {
    // Estado para entradas manuales
    const [pv, setPv] = useState(1000); // Planned Value
    const [ev, setEv] = useState(900);  // Earned Value
    const [ac, setAc] = useState(1100); // Actual Cost

    // Cálculos automáticos
    const cv = ev - ac; // Cost Variance
    const sv = ev - pv; // Schedule Variance
    const cpi = ac > 0 ? ev / ac : 0; // Cost Performance Index
    const spi = pv > 0 ? ev / pv : 0; // Schedule Performance Index

    // Helper para colores
    const getStatusColor = (val: number) => {
        if (val >= 1) return 'text-emerald-500';
        return 'text-red-500';
    };

    const getBgColor = (val: number) => {
        if (val >= 1) return 'bg-emerald-100 dark:bg-emerald-900/30';
        return 'bg-red-100 dark:bg-red-900/30';
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-purple-400">
                            <Calculator className="w-8 h-8" />
                            Calculadora EVM
                        </h2>
                        <p className="text-slate-300 mt-1">Gestión del Valor Ganado: Introduce tus datos y diagnostica el proyecto.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel de Inputs */}
                <Card className="p-6 space-y-6 lg:col-span-1 border-l-4 border-l-slate-400">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                        Introduce Datos ($)
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-1">Valor Planificado (PV)</label>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-slate-400" />
                                <input
                                    type="number"
                                    value={pv}
                                    onChange={(e) => setPv(Number(e.target.value))}
                                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded bg-slate-50 dark:bg-slate-800"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">¿Cuánto deberíamos haber completado?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-purple-600 dark:text-purple-400 mb-1">Valor Ganado (EV)</label>
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-purple-500" />
                                <input
                                    type="number"
                                    value={ev}
                                    onChange={(e) => setEv(Number(e.target.value))}
                                    className="w-full p-2 border-2 border-purple-200 dark:border-purple-800 rounded bg-purple-50 dark:bg-purple-900/10 focus:border-purple-500 outline-none font-bold"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">¿Cuánto hemos completado realmente?</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">Coste Real (AC)</label>
                            <div className="flex items-center gap-2">
                                <DollarSign size={16} className="text-emerald-500" />
                                <input
                                    type="number"
                                    value={ac}
                                    onChange={(e) => setAc(Number(e.target.value))}
                                    className="w-full p-2 border border-emerald-200 dark:border-emerald-800 rounded bg-emerald-50 dark:bg-emerald-900/10"
                                />
                            </div>
                            <p className="text-xs text-slate-400 mt-1">¿Cuánto hemos gastado?</p>
                        </div>
                    </div>
                </Card>

                {/* Panel de Resultados */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                        Análisis de Rendimiento
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tarjeta de Costes */}
                        <Card className={`p-6 border-l-8 ${cpi >= 1 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-slate-500 uppercase font-bold text-xs tracking-wider">Eficiencia de Costes</h4>
                                <DollarSign className={cpi >= 1 ? 'text-emerald-500' : 'text-red-500'} />
                            </div>

                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-black">{cpi.toFixed(2)}</span>
                                <span className="text-sm font-bold text-slate-400 mb-1">CPI</span>
                            </div>

                            <div className={`p-2 rounded text-xs font-bold mb-4 inline-block ${getBgColor(cpi)} ${getStatusColor(cpi)}`}>
                                {cpi >= 1 ? 'BAJO PRESUPUESTO (Eficiente)' : 'SOBRE PRESUPUESTO (Ineficiente)'}
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between text-sm">
                                <span className="text-slate-500">Variación (CV)</span>
                                <span className={`font-mono font-bold ${cv >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {cv >= 0 ? '+' : ''}{cv.toFixed(0)} $
                                </span>
                            </div>
                        </Card>

                        {/* Tarjeta de Cronograma */}
                        <Card className={`p-6 border-l-8 ${spi >= 1 ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="text-slate-500 uppercase font-bold text-xs tracking-wider">Eficiencia de Cronograma</h4>
                                <Clock className={spi >= 1 ? 'text-emerald-500' : 'text-red-500'} />
                            </div>

                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-black">{spi.toFixed(2)}</span>
                                <span className="text-sm font-bold text-slate-400 mb-1">SPI</span>
                            </div>

                            <div className={`p-2 rounded text-xs font-bold mb-4 inline-block ${getBgColor(spi)} ${getStatusColor(spi)}`}>
                                {spi >= 1 ? 'ADELANTADO' : 'RETRASADO'}
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between text-sm">
                                <span className="text-slate-500">Variación (SV)</span>
                                <span className={`font-mono font-bold ${sv >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {sv >= 0 ? '+' : ''}{sv.toFixed(0)} $
                                </span>
                            </div>
                        </Card>
                    </div>

                    {/* Explicación Contextual */}
                    <Card className="p-4 bg-slate-50 dark:bg-slate-800/50">
                        <div className="flex gap-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg h-fit text-blue-600">
                                <ArrowRight size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Interpretación</h4>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {cpi < 1 && spi < 1 && "Situación Crítica: El proyecto gasta más de lo previsto y avanza más lento. Se requiere intervención urgente."}
                                    {cpi >= 1 && spi >= 1 && "Situación Ideal: El proyecto es eficiente en costes y cumple o supera el cronograma."}
                                    {cpi < 1 && spi >= 1 && "Estás comprando tiempo: Avanzas rápido (SPI > 1) pero a un coste elevado (CPI < 1)."}
                                    {cpi >= 1 && spi < 1 && "Ahorro peligroso: Gastas poco, pero el trabajo no avanza al ritmo esperado."}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* SECCIÓN DE TEORÍA Y GUÍA */}
            <div className="grid grid-cols-1 gap-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">

                {/* Nota: La teoría EVM ya estaba integrada en las tarjetas, agregamos la referencia formal y la guía detallada */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Teoría Formal */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                            <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                            Fundamentos Teóricos: Control de Costes
                        </h3>
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                            <p>
                                El proceso de <strong>Control del Coste</strong> utiliza la Gestión del Valor Ganado (EVM) para integrar alcance, coste y cronograma.
                            </p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li><strong>PV (Valor Planificado):</strong> El presupuesto autorizado asignado al trabajo que <em>debería</em> haberse ejecutado.</li>
                                <li><strong>EV (Valor Ganado):</strong> El valor del trabajo <em>realmente</em> ejecutado.</li>
                                <li><strong>AC (Coste Real):</strong> El coste total incurrido.</li>
                                <li><strong>Objetivo:</strong> Detectar desviaciones temprano para tomar acciones correctivas.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Guía de Uso */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                            <span className="bg-purple-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">?</span>
                            Guía de la Herramienta
                        </h3>
                        <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-800/30 text-sm space-y-4 text-slate-600 dark:text-slate-400">
                            <p><strong>Objetivo:</strong> Diagnosticar la salud del proyecto mediante índices.</p>
                            <ol className="list-decimal pl-4 space-y-2">
                                <li>
                                    Introduce los datos numéricos en el <strong>Panel 1</strong>.
                                </li>
                                <li>
                                    Observa los semáforos en el <strong>Panel 2</strong>:
                                    <ul className="list-disc pl-4 mt-1 opacity-80">
                                        <li><strong>CPI (Coste):</strong> Si es &lt; 1, estás gastando más de la cuenta (ROJO).</li>
                                        <li><strong>SPI (Cronograma):</strong> Si es &lt; 1, vas retrasado (ROJO).</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Prueba este escenario:</strong> Pon un EV alto (mucho trabajo hecho) pero un AC muy alto (costo excesivo). Verás que aunque el SPI es bueno (verde), el CPI es malo (rojo). ¡Estás comprando velocidad con dinero!
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlideEVM;
