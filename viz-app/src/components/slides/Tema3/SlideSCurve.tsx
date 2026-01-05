
import { useState, useMemo } from 'react';
import { AreaChart, Wallet, Trophy, Map, Info } from 'lucide-react';
import { Card } from '../../ui/Card';

const SlideSCurve = () => {
    const [timeIndex, setTimeIndex] = useState(25); // Default start at 25%

    // --- DATA GENERATION (Memoized) ---
    const data = useMemo(() => {
        const totalPoints = 100;
        const pvData: number[] = [];
        const evData: number[] = [];
        const acData: number[] = [];

        // Generate Sigmoid-like curves
        for (let i = 0; i <= totalPoints; i++) {
            const progress = i / totalPoints;

            // PV: Perfect S-Curve (Logistic function)
            // L / (1 + e^-k(x-x0))
            const sigmoid = (x: number) => 1 / (1 + Math.exp(-10 * (x - 0.5)));
            // Normalize slightly to fit 0-100 better (approx 1000 max)
            let valPV = sigmoid(progress) * 1000;
            if (i === 0) valPV = 0;

            // EV: Lagging behind PV (starts similar, drops off)
            let valEV = valPV * (0.8 + 0.1 * Math.sin(progress * Math.PI));
            if (i > 80) valEV = valEV * 0.95;
            if (i === 0) valEV = 0;

            // AC: Spending more than planned
            let valAC = valPV * (1.1 + (progress * 0.3));
            if (i === 0) valAC = 0;

            pvData.push(valPV);
            evData.push(valEV);
            acData.push(valAC);
        }
        return { pv: pvData, ev: evData, ac: acData };
    }, []);

    // --- CHART SCALING ---
    const svgWidth = 1000;
    const svgHeight = 400;
    const chartHeight = 380;
    const maxY = 1400;

    const getX = (index: number) => (index / 100) * svgWidth;
    const getY = (value: number) => svgHeight - (value / maxY * chartHeight);

    // Create Path String
    const createPath = (dataArray: number[]) => {
        return dataArray.map((val, i) =>
            `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`
        ).join(' ');
    };

    // --- CURRENT VALUES ---
    const curPV = data.pv[timeIndex];
    const curEV = data.ev[timeIndex];
    const curAC = data.ac[timeIndex];
    const cv = curEV - curAC;
    const sv = curEV - curPV;

    // --- RENDER HELPERS ---
    const xPos = getX(timeIndex);
    const yPV = getY(curPV);
    const yEV = getY(curEV);
    const yAC = getY(curAC);

    // Variance Lines Logic
    const showCV = Math.abs(yAC - yEV) > 10;
    const showSV = Math.abs(yPV - yEV) > 10;
    const midY_CV = (yAC + yEV) / 2;
    const midY_SV = (yPV + yEV) / 2;

    const getStatusText = () => {
        if (timeIndex === 0) return { text: "Proyecto Iniciado", color: "text-slate-500" };
        if (cv < 0 && sv < 0) return { text: "⚠️ CRÍTICO: Retrasado y Sobrecoste", color: "text-red-600 animate-pulse font-bold" };
        if (cv < 0) return { text: "Sobre Presupuesto", color: "text-orange-600 font-bold" };
        if (sv < 0) return { text: "Retrasado", color: "text-orange-600 font-bold" };
        return { text: "Buen desempeño", color: "text-emerald-600 font-bold" };
    };

    const status = getStatusText();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-3 text-emerald-400">
                            <AreaChart className="w-8 h-8" />
                            La Curva S (EVM)
                        </h2>
                        <p className="text-slate-300 mt-1">Análisis de Desempeño y Variaciones</p>
                    </div>
                    <div className="flex gap-4 text-xs font-mono bg-slate-800 p-2 rounded border border-slate-700">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span>PV</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span>EV</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full"></span>AC</div>
                    </div>
                </div>
            </div>

            {/* Main Interactive Chart */}
            <Card className="p-2 md:p-6 overflow-hidden">
                <div className="flex justify-between items-end mb-4 px-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Evolución del Proyecto</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Arrastra el control deslizante para ver las variaciones.</p>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Día del Proyecto</span>
                        <span className="text-3xl font-black text-slate-800 dark:text-slate-200">{timeIndex}</span>
                    </div>
                </div>

                {/* SVG Chart Area */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border-b border-l border-slate-300 dark:border-slate-700 mb-6 relative overflow-hidden h-[300px] md:h-[400px]">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        preserveAspectRatio="none"
                        className="overflow-visible"
                    >
                        {/* Grid Pattern */}
                        <defs>
                            <pattern id="grid" width="100" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 100 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-200 dark:text-slate-800" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />

                        {/* Line Paths */}
                        <path d={createPath(data.pv)} fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" />
                        <path d={createPath(data.ac)} fill="none" stroke="#ef4444" strokeWidth="3" />
                        <path d={createPath(data.ev)} fill="none" stroke="#10b981" strokeWidth="4" />

                        {/* Scrubber Line */}
                        <line x1={xPos} y1="0" x2={xPos} y2={svgHeight} stroke="currentColor" strokeWidth="2" className="text-slate-800 dark:text-slate-200 opacity-50" />

                        {/* Variance Lines (Vertical) */}
                        {showCV && <line x1={xPos} y1={yAC} x2={xPos} y2={yEV} stroke="#ef4444" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}
                        {showSV && <line x1={xPos} y1={yPV} x2={xPos} y2={yEV} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />}

                        {/* Dots */}
                        <circle cx={xPos} cy={yPV} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                        <circle cx={xPos} cy={yAC} r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                        <circle cx={xPos} cy={yEV} r="6" fill="#10b981" stroke="white" strokeWidth="2" />
                    </svg>

                    {/* HTML Tooltips overlaying SVG */}
                    {showCV && (
                        <div
                            className="absolute bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold border border-red-200 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-10"
                            style={{ left: `${timeIndex}%`, top: `${(midY_CV / svgHeight) * 100}%` }}
                        >
                            CV
                        </div>
                    )}
                    {showSV && (
                        <div
                            className="absolute bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-bold border border-orange-200 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-10"
                            style={{ left: `${timeIndex}%`, top: `${(midY_SV / svgHeight) * 100}%` }}
                        >
                            SV
                        </div>
                    )}
                </div>

                {/* Slider Control */}
                <div className="px-4 pb-4">
                    <input
                        type="range" min="0" max="100" step="1"
                        value={timeIndex}
                        onChange={(e) => setTimeIndex(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono uppercase tracking-wide">
                        <span>Inicio</span>
                        <span>Progreso</span>
                        <span>Cierre</span>
                    </div>
                </div>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* AC Card */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow border-t-4 border-red-500">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-red-600 dark:text-red-400">Coste Real (AC)</h3>
                        <Wallet className="text-red-200 w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">
                        ${Math.round(curAC)}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Gasto ejecutado hasta la fecha.</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">CV (Var. Coste):</span>
                            <span className={`text-sm font-bold ${cv < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                ${Math.round(cv)}
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Diferencia vertical entre AC y EV.</p>
                    </div>
                </div>

                {/* EV Card */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow border-t-4 border-emerald-500 transform lg:scale-105 ring-2 ring-emerald-500/10 z-10">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-emerald-600 dark:text-emerald-400">Valor Ganado (EV)</h3>
                        <Trophy className="text-emerald-200 w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">
                        ${Math.round(curEV)}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Trabajo realmente completado.</p>
                    <div className={`mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 bg-emerald-50 dark:bg-emerald-900/10 -mx-5 -mb-5 p-4 rounded-b-xl`}>
                        <p className={`text-center text-sm ${status.color}`}>
                            {status.text}
                        </p>
                    </div>
                </div>

                {/* PV Card */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow border-t-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-blue-600 dark:text-blue-400">Valor Planificado</h3>
                        <Map className="text-blue-200 w-6 h-6" />
                    </div>
                    <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">
                        ${Math.round(curPV)}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Línea Base (Plan).</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">SV (Var. Crono):</span>
                            <span className={`text-sm font-bold ${sv < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                ${Math.round(sv)}
                            </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Diferencia vertical entre EV y PV.</p>
                    </div>
                </div>

            </div>

            <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-lg text-sm text-slate-600 dark:text-slate-300 flex items-start gap-4">
                <div className="bg-white dark:bg-slate-600 p-2 rounded-full shadow-sm text-blue-500 dark:text-blue-300">
                    <Info className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-bold text-slate-800 dark:text-white mb-1">¿Cómo leer este gráfico?</p>
                    <ul className="list-disc list-inside space-y-1 text-xs md:text-sm">
                        <li>La línea <b>Azul (PV)</b> es tu plan ideal ("La Promesa").</li>
                        <li>Si la línea <b>Verde (EV)</b> está <i>debajo</i> de la azul, vas con retraso.</li>
                        <li>Si la línea <b>Roja (AC)</b> está <i>encima</i> de la verde, estás perdiendo dinero (sobrecoste).</li>
                    </ul>
                </div>
            </div>

            {/* THEORY & GUIDE SECTION */}
            <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                    Fundamentos Teóricos: La Curva S
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>La Forma "S":</strong> Los proyectos comienzan lentos (planificación), aceleran en la ejecución (pendiente pronunciada) y se frenan al cierre.
                            </li>
                            <li>
                                <strong>Línea Base de Coste:</strong> Es la versión aprobada del presupuesto faseado en el tiempo (la curva azul PV). Se usa para comparar con la realidad.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>EAC (Estimación a la Conclusión):</strong> Si las variaciones actuales son típicas, podemos proyectar un nuevo coste final usando <code>BAC / CPI</code>.
                            </li>
                            <li>
                                <strong>VAC (Variación a la Conclusión):</strong> La diferencia final prevista entre el presupuesto original y el nuevo estimado.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Guía de Uso Interactivo</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Arrastra el control deslizante <strong>"Progreso"</strong> de izquierda a derecha para viajar en el tiempo del proyecto.
                        Fíjate en las líneas punteadas verticales: <strong>CV</strong> (roja) muestra cuánto dinero pierdes/ganas, y <strong>SV</strong> (naranja) muestra el retraso temporal.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default SlideSCurve;
