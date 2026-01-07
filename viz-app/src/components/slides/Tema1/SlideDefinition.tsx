import { useState } from 'react';
import { Target, Clock, Users, BookOpen } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const steps = [
    {
        id: 'definition',
        text: "Un proyecto es un esfuerzo TEMPORAL emprendido para crear un producto, servicio o resultado ÚNICO."
    },
    {
        id: 'characteristics',
        text: "Sus cuatro características son: Temporalidad (tiene inicio y fin), Unicidad (el entregable es único), Recursos Limitados (restricciones de dinero y tiempo) y Objetivos Claros, definidos mediante metas SMART."
    },
    {
        id: 'comparison',
        text: "Diferencia entre Proyecto y Operaciones: El Proyecto es único (como una web personalizada), temporal (como por ejemplo, 6 meses) y con equipo dinámico. Las Operaciones son repetitivas (como una cadena de montaje), continuas (sin fin) y con equipo estático."
    },
    {
        id: 'types',
        text: "Tipos de Organización: Producción en masa (busca economías de escala), Producción por lotes (sistemas flexibles que se adaptan) y Proyectos (tareas específicas y únicas)."
    }
];

const SlideDefinition = ({ autoPlay }: { autoPlay?: boolean }) => {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    // Helper class for focus mode
    const getFocusClass = (stepId: string) => {
        if (!activeStep) return "transition-all duration-500 opacity-100"; // Normal state
        return activeStep === stepId
            ? "transition-all duration-500 opacity-100 scale-[1.02] ring-4 ring-amber-400/50 rounded-xl shadow-xl z-20 bg-surface" // Active Highlight
            : "transition-all duration-500 opacity-20 blur-[1px] grayscale"; // Dimmed
    };

    return (
        <div className="animate-fade-in space-y-8">
            <SlideContainer
                title="¿Qué es un Proyecto?"
                rate={1.2}
                ttsSteps={steps}
                onStepChange={setActiveStep}
                autoPlay={autoPlay}
            >
                <div className="flex flex-col gap-8 h-full">

                    {/* Barra de herramientas superior de la diapositiva */}
                    <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-300 text-sm">
                            <BookOpen size={18} className="text-blue-500 dark:text-blue-400" />
                            <span>Definición PMBOK® Guide</span>
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-2 gap-8 items-start">
                        {/* Left: Definition & Characteristics */}
                        <div className="space-y-6">
                            <div className={`bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg ${getFocusClass('definition')}`}>
                                <p className="text-xl font-medium text-primary dark:text-indigo-300">
                                    "Un esfuerzo <span className="text-amber-600 dark:text-amber-400 font-bold">TEMPORAL</span> emprendido para crear un producto, servicio o resultado <span className="text-amber-600 dark:text-amber-400 font-bold">ÚNICO</span>."
                                </p>
                                <p className="text-sm text-indigo-400 mt-2 text-right">- Definición PMBOK</p>
                            </div>
                            <div className={getFocusClass('characteristics')}>
                                <h3 className="font-bold text-text-main mb-3">Características:</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                        <Clock className="text-blue-500" />
                                        <span className="text-text-main"><strong>Temporalidad:</strong> Tiene un inicio y un fin definidos.</span>
                                    </li>
                                    <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                        <Target className="text-amber-500" />
                                        <span className="text-text-main"><strong>Unicidad:</strong> El entregable es único.</span>
                                    </li>
                                    <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                        <Users className="text-green-500" />
                                        <span className="text-text-main"><strong>Recursos Limitados:</strong> Restricciones de dinero y tiempo.</span>
                                    </li>
                                    <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                        <Target className="text-red-500" />
                                        <span className="text-text-main"><strong>Objetivos Claros:</strong> Metas SMART definidas.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: Comparison Card */}
                        <div className={`bg-surface dark:bg-slate-800 text-text-main dark:text-white p-6 rounded-xl w-full border border-border shadow-sm transition-colors duration-300 h-full ${getFocusClass('comparison')}`}>
                            <h3 className="text-lg font-bold text-primary dark:text-amber-400 mb-4 border-b border-border dark:border-slate-600 pb-2">Proyecto VS Operaciones</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm h-fit">
                                <div className="space-y-2">
                                    <p className="font-bold text-primary dark:text-indigo-300">PROYECTO</p>
                                    <div className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">Único (Web personalizada)</div>
                                    <div className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">Temporal (6 meses)</div>
                                    <div className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">Equipo Dinámico</div>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-bold text-primary dark:text-indigo-300">OPERACIONES</p>
                                    <div className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">Repetitivo (Cadena montaje)</div>
                                    <div className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">Continuo (Sin fin)</div>
                                    <div className="bg-background dark:bg-slate-700 p-2 rounded border border-border dark:border-slate-600 shadow-sm transition-colors duration-300">Equipo Estático</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Organization Types */}
                    <div className={getFocusClass('types')}>
                        <h3 className="font-bold text-text-main mb-4">Tipos de Organización del Trabajo:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-text-main mb-2">Producción en masa</h4>
                                <p className="text-sm text-text-muted">Ensamblar productos o servicios especializados buscando economías de escala.</p>
                            </div>
                            <div className="p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-text-main mb-2">Producción por lotes</h4>
                                <p className="text-sm text-text-muted">Sistemas flexibles para productos similares donde la producción se adapta.</p>
                            </div>
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-primary">Proyectos</h4>
                                <p className="text-sm text-primary dark:text-indigo-300">Productos o resultados que se realizan una sola vez con tareas específicas y únicas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SlideContainer>
        </div >
    );
};

export default SlideDefinition;
