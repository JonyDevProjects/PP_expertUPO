
import { Users, CheckCircle, XCircle } from 'lucide-react';
import SlideContainer from '../../shared/SlideContainer';

const SlideSuccessAndRoles = () => (
    <div className="animate-fade-in space-y-8">
        <SlideContainer title="El Factor Humano">
            <div className="flex flex-col xl:flex-row gap-8">
                {/* The PM Profile */}
                <div className="flex-1 bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                            <Users size={40} />
                        </div>
                    </div>
                    <h3 className="text-center font-bold text-primary text-lg">El Director de Proyecto</h3>
                    <p className="text-center text-sm text-primary dark:text-indigo-400 mb-6">Equilibrista entre técnica y personas</p>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-sm text-text-main uppercase mb-2">Hard Skills (Técnicas)</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-surface dark:bg-slate-700 border border-border rounded text-xs">Presupuestos</span>
                                <span className="px-2 py-1 bg-surface dark:bg-slate-700 border border-border rounded text-xs">Planificación</span>
                                <span className="px-2 py-1 bg-surface dark:bg-slate-700 border border-border rounded text-xs">Análisis de Riesgos</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-text-main uppercase mb-2">Soft Skills (Blandas)</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-amber-100 border border-amber-200 text-amber-900 rounded text-xs font-bold">Liderazgo</span>
                                <span className="px-2 py-1 bg-amber-100 border border-amber-200 text-amber-900 rounded text-xs font-bold">Negociación</span>
                                <span className="px-2 py-1 bg-amber-100 border border-amber-200 text-amber-900 rounded text-xs font-bold">Comunicación (90%)</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Roles clave del Director de Proyecto*/}
                <div className="flex-1 bg-surface p-6 rounded-xl border border-border flex flex-col justify-between">
                    <div>
                        <h3 className="text-center font-bold text-text-main text-lg mb-4">Roles Clave</h3>
                        <ul className="space-y-2 text-sm text-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Definir el alcance
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Liderar el equipo
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Identificar a los interesados
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Desarrollar el plan de proyecto
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Gestionar riesgos y el cambio
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Manejar la triple restricción
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500 font-bold">›</span> Comunicar el progreso
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 p-3 rounded text-xs text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-800 italic">
                        <strong>Nota de experto:</strong> A menudo se dice que un gestor de proyectos pasa el 90% de su tiempo comunicando. Las habilidades blandas son vitales.
                    </div>
                </div>
                {/* Success vs Failure */}
                <div className="flex-1 space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-green-800 dark:text-green-300 flex items-center gap-2"><CheckCircle size={18} /> Causas de Éxito</h4>
                        <ul className="mt-2 text-sm text-green-900 dark:text-green-200 space-y-1 list-disc list-inside">
                            <li>Procesos de gestión sólidos.</li>
                            <li>Objetivos alineados a la estrategia.</li>
                            <li>Gestión proactiva del cambio.</li>
                            <li>Roles y responsabilidades claros (RACI).</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-bold text-red-800 dark:text-red-300 flex items-center gap-2"><XCircle size={18} /> Causas de Fracaso</h4>
                        <ul className="mt-2 text-sm text-red-900 dark:text-red-200 space-y-1 list-disc list-inside">
                            <li>Estudio de negocio débil.</li>
                            <li>Falta de patrocinio (Sponsor) de la Dirección.</li>
                            <li>Poca implicación de los usuarios.</li>
                            <li>Planificación irrealista.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </SlideContainer>
    </div>
);

export default SlideSuccessAndRoles;
