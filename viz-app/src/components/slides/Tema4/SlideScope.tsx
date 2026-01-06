
import SlideContainer from '../../shared/SlideContainer';
import InteractiveWBSBuilder from './InteractiveWBSBuilder';
import { ListTree, Target } from 'lucide-react';

const SlideScope = () => {
    return (
        <SlideContainer title="1. Definición del Alcance: La WBS">
            <InteractiveWBSBuilder />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <ListTree className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        Fundamentos de la WBS (EDT)
                    </h3>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <li className="flex gap-2">
                            <div className="min-w-[4px] h-4 bg-blue-400 dark:bg-blue-500 rounded-full mt-1"></div>
                            <p><strong>Descomposición Jerárquica:</strong> Divide el proyecto en componentes más pequeños y manejables (Paquetes de Trabajo).</p>
                        </li>
                        <li className="flex gap-2">
                            <div className="min-w-[4px] h-4 bg-blue-400 dark:bg-blue-500 rounded-full mt-1"></div>
                            <p><strong>Orientada a Entregables:</strong> No es una lista de tareas, sino de resultados tangibles o "cosas" a producir.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        La Regola del 100%
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        Regla de oro crítica en gestión de alcance:
                    </p>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800">
                        <p className="text-sm italic text-emerald-800 dark:text-emerald-200">
                            "La WBS debe incluir el 100% del trabajo definido por el alcance del proyecto y capturar todos los entregables (internos, externos, intermedios)."
                        </p>
                    </div>
                </div>
            </div>
        </SlideContainer>
    );
};

export default SlideScope;
