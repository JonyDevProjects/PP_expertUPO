
import { useState } from 'react';
import {
    Users,
    TrendingUp,
    Activity,
    AlertTriangle,
    CheckCircle,
    BarChart3,
    RefreshCw,
    ShieldCheck
} from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlideExecution = () => {
    // --- STATE 1: RESOURCE LEVELING ---
    const [isLeveled, setIsLeveled] = useState(false);

    // Datos simulados: [Día 1, Día 2, Día 3, Día 4, Día 5]
    // Sin nivelar: Día 2 y 3 tienen sobrecarga (12h y 14h)
    const unleveledData = [8, 14, 12, 6, 0];
    // Nivelado: Máximo 8h, pero el proyecto se alarga un día más
    const leveledData = [8, 8, 8, 8, 8];

    const currentResourceData = isLeveled ? leveledData : unleveledData;

    // --- STATE 2: TUCKMAN LADDER ---
    const [tuckmanStage, setTuckmanStage] = useState(0);
    const stages = [
        { name: "Forming (Formación)", perf: 40, desc: "El equipo se conoce. Roles ambiguos. Dependencia del líder.", color: "bg-blue-400" },
        { name: "Storming (Turbulencia)", perf: 20, desc: "Conflictos por poder y enfoque. La productividad baja. ¡Peligro!", color: "bg-red-400" },
        { name: "Norming (Normalización)", perf: 70, desc: "Se resuelven diferencias. Empieza la cohesión y confianza.", color: "bg-yellow-400" },
        { name: "Performing (Desempeño)", perf: 100, desc: "Equipo de alto rendimiento. Autonomía y sinergia total.", color: "bg-emerald-500" },
        { name: "Adjourning (Disolución)", perf: 80, desc: "Cierre del trabajo. Sensación de pérdida o celebración.", color: "bg-slate-400" }
    ];

    // --- STATE 3: QUALITY FLOW ---
    const [qualityStep, setQualityStep] = useState(0);

    return (
        <SlideContainer title="Ejecución: El Motor del Proyecto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full pb-4">

                {/* WIDGET 1: GESTIÓN DE RECURSOS (Nivelación) */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-l-4 border-blue-500 overflow-hidden flex flex-col">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            Gestión de Recursos
                        </h3>
                        <button
                            onClick={() => setIsLeveled(!isLeveled)}
                            className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${isLeveled
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-300'
                                }`}
                        >
                            {isLeveled ? 'Resetear' : 'Aplicar Nivelación'}
                        </button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-center">
                        <div className="flex items-end justify-between h-40 gap-2 mb-2">
                            {currentResourceData.map((hours, index) => {
                                const isOverloaded = hours > 8;
                                const heightPercent = (hours / 16) * 100; // 16h es el max visual
                                return (
                                    <div key={index} className="w-full flex flex-col justify-end items-center group">
                                        <div className="text-xs font-bold mb-1 text-slate-500 dark:text-slate-400">{hours}h</div>
                                        <div
                                            className={`w-full rounded-t-md transition-all duration-500 relative ${isOverloaded ? 'bg-red-500' : 'bg-blue-500'}`}
                                            style={{ height: `${heightPercent}%` }}
                                        >
                                            {isOverloaded && (
                                                <div className="absolute top-1 left-1/2 -translate-x-1/2 text-white">
                                                    <AlertTriangle className="w-4 h-4 animate-pulse" />
                                                </div>
                                            )}
                                            {/* Línea de capacidad 8h */}
                                            {heightPercent > 50 && (
                                                <div className="absolute bottom-[50%] w-full h-0.5 bg-white/50 border-t border-dashed border-white/80" title="Capacidad Máx (8h)"></div>
                                            )}
                                        </div>
                                        <div className="mt-2 text-xs text-slate-400">Día {index + 1}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 text-sm text-center">
                            {isLeveled ? (
                                <p className="text-blue-600 dark:text-blue-400 font-semibold animate-in fade-in">
                                    <CheckCircle className="w-4 h-4 inline mr-1" />
                                    Recursos Nivelados: Nadie trabaja más de 8h, pero el proyecto se alargó 1 día.
                                </p>
                            ) : (
                                <p className="text-red-600 dark:text-red-400 font-semibold animate-in fade-in">
                                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                                    Sobrecarga Detectada: Días 2 y 3 superan la capacidad. Riesgo de burnout.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* WIDGET 2: DESARROLLO DEL EQUIPO (Tuckman) */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-l-4 border-emerald-500 overflow-hidden flex flex-col">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                            Modelo de Tuckman (Productividad)
                        </h3>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        {/* Graph Representation */}
                        <div className="relative h-32 border-b border-l border-slate-300 dark:border-slate-600 mb-4 flex items-end px-4 gap-4">
                            {stages.map((stage, idx) => (
                                <div
                                    key={idx}
                                    className={`flex-1 transition-all duration-500 rounded-t-lg opacity-80 hover:opacity-100 cursor-pointer ${stage.color} ${tuckmanStage === idx ? 'ring-2 ring-offset-2 ring-slate-400 opacity-100' : 'grayscale-[0.5]'}`}
                                    style={{ height: `${stage.perf}%` }}
                                    onClick={() => setTuckmanStage(idx)}
                                ></div>
                            ))}
                        </div>

                        {/* Slider Control */}
                        <input
                            type="range"
                            min="0"
                            max="4"
                            step="1"
                            value={tuckmanStage}
                            onChange={(e) => setTuckmanStage(parseInt(e.target.value))}
                            className="w-full accent-emerald-500 mb-4 cursor-pointer"
                        />

                        {/* Info Text */}
                        <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg transition-all">
                            <h4 className="font-bold text-slate-800 dark:text-white text-lg flex justify-between">
                                {stages[tuckmanStage].name}
                                <span className="text-xs bg-slate-200 dark:bg-slate-600 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                                    Prod: {stages[tuckmanStage].perf}%
                                </span>
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                {stages[tuckmanStage].desc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* WIDGET 3: CALIDAD (Inspection Flow) */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border-l-4 border-purple-500 overflow-hidden lg:col-span-2">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700 flex justify-between">
                        <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-purple-500" />
                            Flujo de Calidad: Entregables
                        </h3>
                        <button
                            onClick={() => setQualityStep((prev) => (prev + 1) % 4)}
                            className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold hover:bg-purple-200 transition flex items-center"
                        >
                            <RefreshCw className="w-3 h-3 inline mr-1" />
                            Siguiente Paso
                        </button>
                    </div>

                    <div className="p-6 relative">
                        {/* Progress Steps */}
                        <div className="flex items-center justify-between mb-8 relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-0"></div>
                            <div
                                className="absolute top-1/2 left-0 h-1 bg-purple-500 transition-all duration-700 -z-0"
                                style={{ width: `${(qualityStep / 3) * 100}%` }}
                            ></div>

                            {/* Step 1 */}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${qualityStep >= 0 ? 'bg-purple-500 text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                                1
                                <span className="absolute -bottom-8 w-32 text-center text-xs text-slate-500 font-normal leading-tight">Ejecución</span>
                            </div>

                            {/* Step 2 */}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${qualityStep >= 1 ? 'bg-purple-500 text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                                2
                                <span className="absolute -bottom-8 w-32 text-center text-xs text-slate-500 font-normal leading-tight">Entregable</span>
                            </div>

                            {/* Step 3 */}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${qualityStep >= 2 ? 'bg-orange-500 text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                                3
                                <span className="absolute -bottom-8 w-32 text-center text-xs text-slate-500 font-normal leading-tight">Control</span>
                            </div>

                            {/* Step 4 */}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${qualityStep >= 3 ? 'bg-green-500 text-white scale-110 shadow-lg' : 'bg-slate-200 text-slate-400'}`}>
                                4
                                <span className="absolute -bottom-8 w-32 text-center text-xs text-slate-500 font-normal leading-tight">Verificado</span>
                            </div>
                        </div>

                        {/* Dynamic Description Box */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mt-6 min-h-[80px] flex items-center">
                            {qualityStep === 0 && (
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    <Activity className="w-4 h-4 inline mr-2 text-purple-500" />
                                    El equipo está trabajando. Se generan "Datos de Desempeño" y el producto físico o software en bruto.
                                </p>
                            )}
                            {qualityStep === 1 && (
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    <BarChart3 className="w-4 h-4 inline mr-2 text-purple-500" />
                                    Se ha completado una parte. Tenemos un <b>Entregable</b>. ¿Es correcto? Aún no lo sabemos oficialmente.
                                </p>
                            )}
                            {qualityStep === 2 && (
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    <RefreshCw className="w-4 h-4 inline mr-2 text-orange-500 animate-spin" />
                                    <b>Inspección (Control de Calidad):</b> Medimos el entregable contra los requisitos y métricas definidos en la planificación.
                                </p>
                            )}
                            {qualityStep === 3 && (
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                                    ¡Éxito! El entregable cumple los estándares. Ahora es un <b>Entregable Verificado</b> listo para que el cliente lo valide (Alcance).
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* THEORY & GUIDE SECTION */}
            <section className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mt-8">
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <span className="bg-slate-700 text-white w-6 h-6 rounded flex items-center justify-center text-xs">i</span>
                    Fundamentos Teóricos: Procesos de Ejecución
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                        <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">Recursos y Equipo</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Nivelación de Recursos:</strong> Técnica para resolver la sobreasignación (ej. una persona no puede trabajar 14h). A menudo alarga el cronograma.
                            </li>
                            <li>
                                <strong>Escalera de Tuckman:</strong> Fases inevitables de un equipo. El líder debe adaptar su estilo (Directivo &rarr; Coaching &rarr; Participativo &rarr; Delegativo).
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2 text-purple-600 dark:text-purple-400">Calidad</h4>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Gestionar Calidad (Ejecución):</strong> Asegurar que se siguen los procesos correctos (Auditorías).
                            </li>
                            <li>
                                <strong>Controlar Calidad (Monitoreo):</strong> Inspeccionar el producto final. Salida: <em>Entregable Verificado</em>.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm mb-2">💡 Guía de Uso Interactivo</h4>
                    <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        <li><strong>Recursos:</strong> Pulsa "Aplicar Nivelación" para distribuir la carga de trabajo automáticamente.</li>
                        <li><strong>Tuckman:</strong> Usa el deslizador para ver cómo cambia el rendimiento y la descripción en cada fase del equipo.</li>
                        <li><strong>Calidad:</strong> Pulsa "Siguiente Paso" para avanzar el entregable por la tubería de inspección.</li>
                    </ul>
                </div>
            </section>
        </SlideContainer>
    );
};

export default SlideExecution;
