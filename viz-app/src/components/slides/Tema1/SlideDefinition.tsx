
import { Target, Clock, Users } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlideDefinition = () => (
    <div className="animate-fade-in space-y-8">
        <SlideContainer title="¿Qué es un Proyecto?">
            <div className="flex flex-col gap-8">
                {/* Top Section: Definition & Comparison */}
                <div className="grid xl:grid-cols-2 gap-8 items-start">
                    {/* Left: Definition & Characteristics */}
                    <div className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-lg">
                            <p className="text-xl font-medium text-primary dark:text-indigo-300">
                                "Un esfuerzo <span className="text-amber-600 dark:text-amber-400 font-bold">TEMPORAL</span> emprendido para crear un producto, servicio o resultado <span className="text-amber-600 dark:text-amber-400 font-bold">ÚNICO</span>."
                            </p>
                            <p className="text-sm text-indigo-400 mt-2 text-right">- Definición PMBOK</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-main mb-3">Características:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                    <Target className="text-red-500" />
                                    <span className="text-text-main"><strong>Objetivos Claros:</strong> Metas SMART definidas.</span>
                                </li>
                                <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                    <Clock className="text-blue-500" />
                                    <span className="text-text-main"><strong>Temporalidad:</strong> Tiene un inicio y un fin definidos.</span>
                                </li>
                                <li className="flex items-center gap-3 bg-surface border border-border p-3 rounded shadow-sm">
                                    <Users className="text-green-500" />
                                    <span className="text-text-main"><strong>Elaboración Progresiva:</strong> Se define por pasos.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Comparison Card */}
                    <div className="bg-surface dark:bg-slate-800 text-text-main dark:text-white p-6 rounded-xl w-full border border-border shadow-sm transition-colors duration-300 h-full">
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
                <div>
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

export default SlideDefinition;
