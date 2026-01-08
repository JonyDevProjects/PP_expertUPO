import { useState } from 'react';
import { DollarSign, Clock, AlertTriangle, CheckCircle, ArrowDown, ArrowUp, History, Zap } from 'lucide-react';
import { Card } from '../../ui/Card';
import SlideContainer from '../../shared/SlideContainer';

const SlideEVMSemaphore = ({ autoPlay, onAudioComplete }: { autoPlay?: boolean; onAudioComplete?: () => void }) => {
    // Inputs
    const [pv, setPv] = useState(1000); // Planned Value
    const [ev, setEv] = useState(1000); // Earned Value
    const [ac, setAc] = useState(1000); // Actual Cost
    const [highlightedSection, setHighlightedSection] = useState<'controls' | 'metrics' | null>(null);

    // Calculations
    const cv = ev - ac;
    const sv = ev - pv;

    const cpi = ac === 0 ? (ev > 0 ? 2 : 1) : (ev / ac);
    const spi = pv === 0 ? (ev > 0 ? 2 : 1) : (ev / pv);

    // Helper to get bar position (0-2 range mapped to 0-100%)
    const getMarkerPosition = (val: number) => {
        let percent = (val / 2) * 100;
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        return `${percent}%`;
    };

    const cpiPos = getMarkerPosition(cpi);
    const spiPos = getMarkerPosition(spi);

    // Helpers for styling
    const getStatusColor = (val: number) => {
        if (val < 1) return 'text-red-600 dark:text-red-400';
        if (val > 1) return 'text-emerald-600 dark:text-emerald-400';
        return 'text-slate-800 dark:text-slate-200';
    };

    const getCardBorder = (val: number) => {
        if (val < 1) return 'border-l-red-500';
        if (val > 1) return 'border-l-emerald-500';
        return 'border-l-slate-300 dark:border-l-slate-600';
    };

    const ttsSteps = [
        {
            id: "intro",
            text: "Gestión del Valor Ganado o EVM. Es la herramienta definitiva para medir la salud del proyecto integrando alcance, cronograma y costes."
        },
        {
            id: "basics",
            text: "Variables Clave. PV es lo planeado. EV es lo logrado. AC es el coste real. Con estas tres variables calculamos todo."
        },
        {
            id: "bad_scenario",
            text: "Escenario Negativo. Si gastamos más de lo planeado y avanzamos menos, entramos en zona roja. CPI y SPI menores a 1 indican problemas."
        },
        {
            id: "good_scenario",
            text: "Escenario Positivo. Si somos eficientes, gastamos menos y avanzamos más. CPI y SPI mayores a 1 indican éxito."
        }
    ];

    return (
        <SlideContainer
            title="Semáforo EVM"
            rate={1.2}
            ttsSteps={ttsSteps}
            autoPlay={autoPlay}
            onStepChange={(id) => {
                setHighlightedSection(null);
                if (!id) {
                    onAudioComplete?.();
                    return;
                }
                if (id === 'intro') {
                    setPv(1000); setEv(1000); setAc(1000);
                }
                if (id === 'basics') {
                    setHighlightedSection('controls');
                }
                if (id === 'bad_scenario') {
                    setHighlightedSection('metrics');
                    setPv(1000); setEv(800); setAc(1200); // Behind schedule, over budget
                }
                if (id === 'good_scenario') {
                    setHighlightedSection('metrics');
                    setPv(1000); setEv(1200); setAc(900); // Ahead of schedule, under budget
                }
            }}
        >
            <div className="space-y-8 animate-in fade-in duration-500">

                {/* Control Panel */}
                <Card className={`border-l-4 border-l-blue-500 p-6 transition-all duration-500 ${highlightedSection === 'controls' ? 'ring-2 ring-blue-400 bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                    <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">1</span>
                        Panel de Control
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* PV Input */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="font-bold text-slate-600 dark:text-slate-300">Valor Planificado (PV)</label>
                                <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">${pv}</span>
                            </div>
                            <input
                                type="range" min="100" max="2000" value={pv}
                                onChange={(e) => setPv(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <p className="text-xs text-slate-400">¿Cuánto trabajo <b>deberías</b> haber hecho?</p>
                        </div>

                        {/* EV Input */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="font-bold text-slate-600 dark:text-slate-300">Valor Ganado (EV)</label>
                                <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">${ev}</span>
                            </div>
                            <input
                                type="range" min="100" max="2000" value={ev}
                                onChange={(e) => setEv(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                            <p className="text-xs text-slate-400">¿Cuánto trabajo <b>has hecho realmente</b>?</p>
                        </div>

                        {/* AC Input */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <label className="font-bold text-slate-600 dark:text-slate-300">Coste Real (AC)</label>
                                <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">${ac}</span>
                            </div>
                            <input
                                type="range" min="100" max="2000" value={ac}
                                onChange={(e) => setAc(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                            <p className="text-xs text-slate-400">¿Cuánto <b>has gastado</b>?</p>
                        </div>
                    </div>
                </Card>

                {/* Diagnosis Section */}
                <section className={`transition-all duration-500 ${highlightedSection === 'metrics' ? 'p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50' : ''}`}>
                    <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md">2</span>
                        Diagnóstico de Salud
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* COST CARD */}
                        <Card className={`p-6 border-l-8 transition-colors duration-300 relative overflow-hidden ${getCardBorder(cpi)}`}>
                            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
                                <DollarSign className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <DollarSign className="w-5 h-5" /> Eficiencia de Coste
                                </h3>

                                <div className="flex items-end justify-between mb-4">
                                    <div>
                                        <span className="text-sm text-slate-400 block">CPI (Índice)</span>
                                        <span className={`text-5xl font-black ${getStatusColor(cpi)}`}>{cpi.toFixed(2)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-slate-400 block">CV (Variación)</span>
                                        <span className={`text-2xl font-bold ${getStatusColor(cpi)}`}>${cv}</span>
                                    </div>
                                </div>

                                {/* Gauge Bar */}
                                <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden relative">
                                    <div className="absolute w-1/2 h-full bg-red-400 left-0" />
                                    <div className="absolute w-1/2 h-full bg-emerald-400 right-0" />
                                    <div
                                        className="absolute h-6 w-1 bg-slate-900 dark:bg-white top-[-4px] transition-all duration-500 shadow-md"
                                        style={{ left: cpiPos }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                                    <span>Gastando de más (&lt;1)</span>
                                    <span>Ahorrando (&gt;1)</span>
                                </div>

                                {/* Message */}
                                <div className={`mt-6 p-3 rounded-lg text-center font-bold flex items-center justify-center gap-2 ${cpi < 1 ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                                    cpi > 1 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                    }`}>
                                    {cpi < 1 ? <><ArrowDown className="w-4 h-4" /> SOBRE PRESUPUESTO</> :
                                        cpi > 1 ? <><ArrowUp className="w-4 h-4" /> BAJO PRESUPUESTO</> :
                                            "En Presupuesto"}
                                </div>
                            </div>
                        </Card>

                        {/* TIME CARD */}
                        <Card className={`p-6 border-l-8 transition-colors duration-300 relative overflow-hidden ${getCardBorder(spi)}`}>
                            <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
                                <Clock className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5" /> Eficiencia de Cronograma
                                </h3>

                                <div className="flex items-end justify-between mb-4">
                                    <div>
                                        <span className="text-sm text-slate-400 block">SPI (Índice)</span>
                                        <span className={`text-5xl font-black ${getStatusColor(spi)}`}>{spi.toFixed(2)}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm text-slate-400 block">SV (Variación)</span>
                                        <span className={`text-2xl font-bold ${getStatusColor(spi)}`}>${sv}</span>
                                    </div>
                                </div>

                                {/* Gauge Bar */}
                                <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden relative">
                                    <div className="absolute w-1/2 h-full bg-red-400 left-0" />
                                    <div className="absolute w-1/2 h-full bg-emerald-400 right-0" />
                                    <div
                                        className="absolute h-6 w-1 bg-slate-900 dark:bg-white top-[-4px] transition-all duration-500 shadow-md"
                                        style={{ left: spiPos }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                                    <span>Retrasado (&lt;1)</span>
                                    <span>Adelantado (&gt;1)</span>
                                </div>

                                {/* Message */}
                                <div className={`mt-6 p-3 rounded-lg text-center font-bold flex items-center justify-center gap-2 ${spi < 1 ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                                    spi > 1 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' :
                                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                    }`}>
                                    {spi < 1 ? <><History className="w-4 h-4" /> RETRASADO</> :
                                        spi > 1 ? <><Zap className="w-4 h-4" /> ADELANTADO</> :
                                            "En Cronograma"}
                                </div>
                            </div>
                        </Card>

                    </div>
                </section>

                {/* Cheat Sheet */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Zona Verde ({'>'} 1.0)
                        </h4>
                        <ul className="list-disc list-inside text-emerald-700 dark:text-emerald-500 space-y-1 ml-1">
                            <li><b>CPI {'>'} 1:</b> El proyecto cuesta menos de lo planeado. Ahorro.</li>
                            <li><b>SPI {'>'} 1:</b> El trabajo avanza más rápido de lo planeado. Adelanto.</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Zona Roja ({'<'} 1.0)
                        </h4>
                        <ul className="list-disc list-inside text-red-700 dark:text-red-500 space-y-1 ml-1">
                            <li><b>CPI {'<'} 1:</b> Estamos gastando más de lo producido. Sobrecoste.</li>
                            <li><b>SPI {'<'} 1:</b> El trabajo va más lento de lo planeado. Retraso.</li>
                        </ul>
                    </div>
                </section>

                {/* THEORY & GUIDE SECTION */}
                <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                        <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                        Fundamentos Teóricos: Gestión del Valor Ganado (EVM)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600 dark:text-slate-400">
                        <div>
                            <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">Variables Clave</h4>
                            <ul className="space-y-1">
                                <li><strong>PV:</strong> Valor Planificado. Lo que deberías haber hecho.</li>
                                <li><strong>EV:</strong> Valor Ganado. Lo que realmente has conseguido.</li>
                                <li><strong>AC:</strong> Coste Real. Lo que has gastado.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2 text-purple-600 dark:text-purple-400">Variaciones</h4>
                            <ul className="space-y-1">
                                <li><strong>CV = EV - AC</strong> (Positivo es bueno).</li>
                                <li><strong>SV = EV - PV</strong> (Positivo es bueno).</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2 text-emerald-600 dark:text-emerald-400">Índices</h4>
                            <ul className="space-y-1">
                                <li><strong>CPI = EV / AC</strong> (Eficiencia de Coste).</li>
                                <li><strong>SPI = EV / PV</strong> (Eficiencia de Cronograma).</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Guía de Uso Interactivo</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Mueve los controles deslizantes del <strong>Panel de Control</strong> para simular diferentes escenarios.
                            Observa cómo se actualizan los indicadores de salud (CPI/SPI) automáticamente.
                            Intenta crear un escenario de "Sobrepresupuesto pero Adelantado" (AC alto, EV alto, pero PV medio).
                        </p>
                    </div>
                </section>
            </div>
        </SlideContainer>
    );
};

export default SlideEVMSemaphore;
